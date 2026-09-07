/*
 * IHMISEN MATKA — AIDOT ÄÄNIMAISEMAT JAKSOITTAIN.
 *
 * Omistajan tilaus 7.9.2026 ilta, sanatarkasti: *"olisi todella makeaa,
 * jos saataisiin myös joitain ääniefektejä, siis aitoja, jossain
 * nauhoitettuja, missä voisi olla eri paikkojen äänimaisemaa. Lähinnähän
 * ne ovat varmaan jotain tuulta ja sademetsän sirkutusta, mutta jos
 * saadaan joitain pieniä eroja, niin se tekisi todella ison säväytyksen.
 * Kun meillä on taustamusiikki kaksi eri kertojaa ja sitten vielä
 * muutamia tarkkaan valittuja atmosfäärin ääniä, niin silloin esitys
 * alkaa saamaan paljon vaikuttavamman ilmentymän."*
 * (Raamattu: LINSSIEN AIDOT AANIMAISEMAT.)
 *
 * ── MITÄ TÄMÄ ON ────────────────────────────────────────────────────
 *
 * Kevyt soitin, joka pitää yhtä äänimaisemaa soimassa kertojan alla ja
 * vaihtaa sen ristihäivytyksellä, kun kertomuksen jakso vaihtuu.
 * Maisematyyppi tulee kertomuksen teknisestä kentästä `maisema`
 * (js/linssit/ihmisen-matka-kertomus.js), tiedostot ämpäristä polusta
 * aanet/tehosteet/ihmisen-matka/<tyyppi>.mp3 manifestin mukaan — sama
 * putki kuin pulun tehosteilla (tools/hae-freesound.mjs --maisemat).
 *
 * ── KAKSI KÄSKYÄ, EI ENEMPÄÄ ────────────────────────────────────────
 *
 *   asetaAanimaisema(tyyppi)   soita tätä tyyppiä; null = hiljaisuus
 *   lopetaAanimaisema()        häivytä pois ja unohda
 *
 * Esitysmoottori (js/linssit/ihmisen-matka.js) kutsuu ensimmäistä
 * jokaisen jakson alussa arvolla `jakso.maisema` ja jälkimmäistä, kun
 * linssi suljetaan. Sama tyyppi peräkkäin ei tee mitään: kolme savannia
 * peräkkäin on YKSI katkeamaton savanni, ei kolme aloitusta.
 *
 * ── MIKSI OSOITETTA EI KIRJOITETA TÄHÄN ─────────────────────────────
 *
 * Sama syy kuin pulun tehosteilla (js/sound.js PULUN_TEHOSTEET): kun
 * huono osuma vaihdetaan parempaan, uusi ääni tulee samalle tunnukselle
 * mutta on eri tiedosto eri tekijältä eri lisenssillä. Tässä on siis
 * vain TUNNUS, ja tiedostonimi, tekijä ja lisenssi luetaan ajossa
 * manifestista, jonka hakuajo kirjoittaa ämpäriin äänten viereen.
 *
 * PUUTTUVA TIEDOSTO ON HILJAISUUS EIKÄ VIRHE. Ennen hakuajoa manifestia
 * ei ole lainkaan, ja se on normaali tila: esitys kulkee samalla tavalla,
 * vain ilman maisemaa. Yhden tunnuksen puuttuminen ei vie muita mukanaan.
 *
 * ── SAUMATON SILMUKKA ───────────────────────────────────────────────
 *
 * Kenttä-äänite ei ole silmukaksi tehty: sen alku ja loppu eivät osu
 * yhteen, ja `audio.loop = true` kuuluisi napsahduksena tai kuoppana
 * joka kierroksella. Siksi silmukka tehdään SAMALLA koneistolla kuin
 * jakson vaihto: kun kierroksesta on jäljellä ristihäivytyksen verran,
 * samasta tiedostosta aloitetaan uusi kierros ja vanha häivytetään sen
 * alta pois. Kaksi kappaletta samaa tuulta päällekkäin kuulostaa
 * tuulelta; leikkaus kuulostaa leikkaukselta.
 */
import { AANI_JUURI } from '../media.js';
import { AANIVALINTA_TAPAHTUMA, sfx } from '../sound.js';
import { kehittajanKerroin, kuunteleKehittajanKerrointa } from '../kehittajan-voimat.js';
import { lisaaVaistaja } from '../ambience-stream.js';
import { lisaaTaustaVaimennus } from '../aani-tausta.js';
// Linssin oma hiljennyssyy: linssi vaientaa muut taustaäänet tällä
// syyllä, eikä sen oma maisema saa väistyä omaa hiljennystään.
import { LINSSIN_HILJENNYS } from '../siirtymamusiikki.js';

/** Ämpärin kansio ja manifesti (tools/tehosteet/ihmisen-matka-maisemat.json). */
export const MAISEMAJUURI = `${AANI_JUURI}aanet/tehosteet/ihmisen-matka/`;
const MAISEMAN_MANIFESTI = `${MAISEMAJUURI}manifesti.json`;

/*
 * TASO. Tiedostot on normalisoitu −30 LUFSiin, mikä on jo selvästi
 * puheen alla; tämä kerroin on kuulokokeen nuppi sen päällä. Lähtöarvo
 * on johdettu nauhoitetun kaupunkiambienssin omasta kertoimesta
 * (js/ambience-stream.js VOIMA 0,14): maisema soi linssin oman musiikin
 * JA kertojan alla, joten se saa olla sitä hiljaisempi.
 *
 * OMISTAJA SÄÄTÄÄ TÄMÄN KORVALLA. Luku on arvio siitä, mikä kuuluu
 * läppärin kaiuttimista tunnelmana muttei vie huomiota kertojalta.
 */
const MAISEMAN_VOIMA = 0.1;

/*
 * RISTIHÄIVYTYS 2,5 s (omistajan tilaus: 2–3 s). Sama mitta kolmeen
 * asiaan, koska ne ovat sama asia: jakson vaihto, silmukan sauma ja
 * maiseman sammutus. Lyhyempi kuuluisi leikkauksena, pidempi jättäisi
 * kaksi maisemaa päällekkäin niin pitkäksi aikaa, että sekaannus
 * kuuluisi.
 */
const RISTI_MS = 2500;
const RISTI_S = RISTI_MS / 1000;

/** Manifestin rivit tunnuksittain; tyhjä kartta = hakua ei ole ajettu. */
let rivit = new Map();
/** Manifestin lataus kerran istunnossa (null = ei vielä yritetty). */
let manifestiLupaus = null;
/** Tunnukset, joiden tiedosto on todettu puuttuvaksi tällä istunnolla. */
const puuttuvat = new Set();

/** Se tyyppi, jonka PITÄISI soida — myös mykistettynä ja latauksen aikana. */
let haluttu = null;
/** Soiva maisema: { tyyppi, url, karki } tai null. `karki` on soiva kierros. */
let soiva = null;

/* Väistö (kertoja, pöllö, lukija, lukunäkymä) — sama totuus kuin taustalla. */
let maisemanVaisto = 1;
/** Onko peli taustalla? Silloin kierrokset ovat tauolla. */
let taustalla = false;

/** Tavoitetaso juuri nyt. */
const taso = () => MAISEMAN_VOIMA * maisemanVaisto * kehittajanKerroin('tausta');

/**
 * Pehmeä tason liuku suoraan elementin volumella. Sama ratkaisu ja sama
 * syy kuin siirtymämusiikilla (js/siirtymamusiikki.js siirtymanLiuku):
 * Web Audio -ketjuun reititetty elementti voi WebKitissä jäädä täysin
 * mykäksi ilman virhettä.
 */
function liuku(audio, kohde, kesto = RISTI_MS, done) {
  if (!audio) return;
  const oma = (audio.liukuId = (audio.liukuId ?? 0) + 1);
  const alku = audio.volume;
  const aika = Math.max(1, kesto);
  const rajaa = (x) => Math.min(1, Math.max(0, x));
  if (typeof requestAnimationFrame !== 'function') {
    audio.volume = rajaa(kohde);
    done?.();
    return;
  }
  let t0 = null;
  const askel = (nyt) => {
    if (audio.liukuId !== oma) return;
    if (t0 === null) t0 = nyt;
    const t = Math.min(1, Math.max(0, (nyt - t0) / aika));
    audio.volume = rajaa(alku + (kohde - alku) * t);
    if (t < 1) requestAnimationFrame(askel);
    else done?.();
  };
  requestAnimationFrame(askel);
}

/** Sammuttaa yhden kierroksen lopullisesti. */
function vapauta(audio) {
  if (!audio) return;
  audio.liukuId = (audio.liukuId ?? 0) + 1;
  try {
    audio.pause();
    audio.removeAttribute('src');
  } catch {
    /* elementti oli jo purettu */
  }
}

/** Häivyttää kierroksen pois ja vapauttaa sen. */
function paasta(audio, kesto = RISTI_MS) {
  if (!audio) return;
  liuku(audio, 0, kesto, () => vapauta(audio));
}

/**
 * Manifesti kerran istunnossa. Epäonnistuminen (ei verkkoa, ei vielä
 * ajettua hakua) EI ole virhe: kartta jää tyhjäksi ja esitys kulkee
 * hiljaisena.
 */
function lataaManifesti() {
  if (manifestiLupaus) return manifestiLupaus;
  manifestiLupaus = fetch(MAISEMAN_MANIFESTI, { mode: 'cors' })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error('http'))))
    .then((manifesti) => {
      const lista = Array.isArray(manifesti?.tehosteet) ? manifesti.tehosteet : [];
      rivit = new Map(lista.filter((r) => r?.tunnus && r?.tiedosto).map((r) => [r.tunnus, r]));
    })
    .catch(() => {
      /* manifestia ei ole vielä ajettu — linssi on maisematta */
      rivit = new Map();
    });
  return manifestiLupaus;
}

/**
 * Yksi kierros soimaan. `tila` on soivan maiseman olio; kierros
 * kiinnittyy siihen kentässä `karki`, ja vanhentunut kierros tunnistaa
 * itsensä juuri siitä (tila.karki !== audio).
 */
function kaynnistaKierros(tila) {
  const audio = new Audio(tila.url);
  audio.preload = 'auto';
  audio.loop = false;
  audio.volume = 0;
  tila.karki = audio;

  const vanhentunut = () => soiva !== tila || tila.karki !== audio;
  let saumaAloitettu = false;

  /*
   * SILMUKAN SAUMA. Kun jäljellä on ristihäivytyksen verran, samasta
   * tiedostosta aloitetaan uusi kierros ja tämä häivytetään sen alta.
   * Lyhyt äänite (alle kolme ristihäivytystä) saa lyhyemmän sauman,
   * ettei koko kierros olisi ristihäivytystä.
   */
  const vahdi = () => {
    if (vanhentunut() || saumaAloitettu) return;
    const kesto = audio.duration;
    if (!Number.isFinite(kesto) || kesto <= 0) return;
    const risti = Math.min(RISTI_S, kesto / 3);
    if (kesto - audio.currentTime > risti) return;
    saumaAloitettu = true;
    kaynnistaKierros(tila);
    paasta(audio, risti * 1000);
  };
  audio.addEventListener('timeupdate', vahdi);
  /*
   * Loppuun asti päässyt kierros tarkoittaa, ettei timeupdate ehtinyt
   * saumaan (harva päivitystahti, kelattu ääni). Silmukka jatkuu silti:
   * uusi kierros alkaa heti, kuuluva kuoppa on parempi kuin hiljaisuus.
   */
  audio.addEventListener('ended', () => {
    if (vanhentunut() || saumaAloitettu) return;
    saumaAloitettu = true;
    kaynnistaKierros(tila);
    vapauta(audio);
  });
  /*
   * TIEDOSTOA EI OLE. Tunnus merkitään puuttuvaksi tälle istunnolle:
   * ilman lippua jokainen jakso rakentaisi uuden epäonnistuvan
   * soittimen ja tuottaisi uuden 404:n.
   */
  audio.addEventListener('error', () => {
    if (vanhentunut()) {
      vapauta(audio);
      return;
    }
    puuttuvat.add(tila.tyyppi);
    soiva = null;
    vapauta(audio);
  });

  audio.play().then(() => {
    if (vanhentunut()) {
      vapauta(audio);
      return;
    }
    liuku(audio, taso(), RISTI_MS);
  }).catch(() => {
    /*
     * Ele puuttui tai laite kieltäytyi. TÄMÄ EI OLE PUUTTUVA TIEDOSTO:
     * `puuttuvat`-lippua ei nosteta, ja seuraava jakso yrittää uudestaan
     * — sama sääntö kuin siirtymämusiikilla ja pohjavireellä.
     */
    if (!vanhentunut()) {
      tila.karki = null;
      soiva = null;
    }
    vapauta(audio);
  });
  return audio;
}

/** Vaihtaa maiseman ristihäivytyksellä. Kutsutaan vasta manifestin jälkeen. */
function vaihda(tyyppi) {
  if (soiva?.tyyppi === tyyppi) return;
  if (puuttuvat.has(tyyppi)) return;
  const rivi = rivit.get(tyyppi);
  if (!rivi?.tiedosto) return;
  const vanha = soiva;
  soiva = { tyyppi, url: `${MAISEMAJUURI}${rivi.tiedosto}`, karki: null };
  kaynnistaKierros(soiva);
  if (vanha) paasta(vanha.karki);
}

/** Häivyttää soivan maiseman pois. */
function sammuta() {
  const vanha = soiva;
  soiva = null;
  if (vanha) paasta(vanha.karki);
}

/**
 * Asettaa jakson äänimaiseman.
 *
 * @param {string|null} tyyppi maisematunnus (kertomuksen `maisema`-kenttä)
 *   tai null/tyhjä, jos jakso on hiljainen (avausjakso on pimeä ruutu).
 *
 * Turvallinen kutsua milloin tahansa ja kuinka usein tahansa: sama
 * tyyppi peräkkäin ei aloita mitään uudestaan, tuntematon tunnus ja
 * puuttuva tiedosto jäävät hiljaisuudeksi ilman virhettä.
 */
export function asetaAanimaisema(tyyppi) {
  const uusi = tyyppi || null;
  if (haluttu === uusi) return;
  haluttu = uusi;
  if (!uusi) {
    sammuta();
    return;
  }
  // Mykistys ei unohda toivetta: se jää `haluttu`-kenttään ja alkaa
  // soida, jos pelaaja palauttaa äänet kesken esityksen.
  if (!sfx.enabled) return;
  lataaManifesti().then(() => {
    if (haluttu === uusi) vaihda(uusi);
  });
}

/** Häivyttää maiseman pois ja unohtaa toiveen. Linssin sulkeminen. */
export function lopetaAanimaisema() {
  haluttu = null;
  sammuta();
}

/** Soiva maisematyyppi tai null. Savukkeita ja kehittäjänäkymää varten. */
export function aanimaisemaSoi() {
  return soiva?.tyyppi ?? null;
}

/*
 * VÄISTÖ. Pöllön puhe, kertoja ja lukunäkymä hiljentävät taustan
 * (js/ambience-stream.js), ja maisema on taustaa siinä missä
 * kaupunkiambienssikin.
 *
 * YKSI POIKKEUS: linssin OMA hiljennys. Linssi vaientaa muut taustaäänet
 * syyllä LINSSIN_HILJENNYS ja soittaa niiden tilalla omaa musiikkiaan ja
 * tätä maisemaa; ilman poikkeusta maisema väistyisi omaa hiljennystään
 * ja jäisi puoleen tasoon koko esityksen ajaksi. Muut syyt (pöllö, lehti)
 * pätevät normaalisti, ja silloin käytetään voimassa olevaa kerrointa
 * kattoineen — ei siis omaa vakiota, joka voisi eriytyä taustan omasta.
 */
lisaaVaistaja((kerroin, kesto, tiedot) => {
  const syyt = tiedot?.syyt ?? [];
  const muut = syyt.filter((syy) => syy !== LINSSIN_HILJENNYS);
  maisemanVaisto = muut.length ? kerroin : (tiedot?.pohja ?? kerroin);
  if (soiva?.karki) liuku(soiva.karki, taso(), kesto || RISTI_MS);
});

// Kehittäjän säädin (js/kehittajan-voimat.js): soiva maisema seuraa heti.
kuunteleKehittajanKerrointa('tausta', () => {
  if (soiva?.karki) liuku(soiva.karki, taso(), 200);
});

/*
 * TAUSTALLE MENNYT PELI ON TÄYSIN HILJAA (js/aani-tausta.js). Maisema on
 * tilaa eikä tapahtuma, joten se jatkaa itsestään palatessa — sama
 * paluusääntö kuin kaupunkiambienssilla.
 */
lisaaTaustaVaimennus({
  hiljenna: () => {
    taustalla = true;
    try {
      soiva?.karki?.pause();
    } catch {
      /* soitin oli jo purettu */
    }
  },
  palauta: () => {
    taustalla = false;
    soiva?.karki?.play?.()?.catch?.(() => { /* seuraava ele yrittää */ });
  },
});

/*
 * ÄÄNIVALIKON MYKISTYS (js/sound.js setEnabled). Mykistys sammuttaa
 * maiseman heti; äänten palautus käynnistää sen tyypin, jonka esitys on
 * viimeksi pyytänyt. Ilman tätä mykistys kesken esityksen jättäisi
 * maiseman soimaan ja palautus jättäisi sen pysyvästi hiljaiseksi.
 */
if (typeof document !== 'undefined' && typeof document.addEventListener === 'function') {
  document.addEventListener(AANIVALINTA_TAPAHTUMA, (tapahtuma) => {
    const paalla = tapahtuma?.detail?.enabled;
    if (!paalla) {
      sammuta();
      return;
    }
    if (!haluttu || taustalla) return;
    lataaManifesti().then(() => {
      if (haluttu) vaihda(haluttu);
    });
  });
}
