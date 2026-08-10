// Oikeat kenttä-äänitykset paikoista. Äänite striimataan <audio>-
// elementillä suoraan verkosta — peli ei silti ole striimin varassa:
// ilman verkkoa, ennen ensimmäistä napautusta tai merkinnän puuttuessa
// palataan syntetisoituun ambienssiin (js/sound.js), joka on varmistus.
//
// Osoitteet ovat Freesoundin esikuunteluversioita (mp3, vakaat osoitteet)
// ja ne arvotaan maisematyypin korista (aani-ehdokkaat.js). Vain
// CC-lisensoituja äänitteitä.

import { sfx } from './sound.js';
import {
  valittuTaiOletus, jaaAlku, tyyppiKori, kaupunkiKori, maaKori,
} from './aani-ehdokkaat.js';
import { aaniOsoite, onPeilista, peiliPetti } from './media.js';

// Arvottu ääni pysyy samana koko käynnin ajan: syncAmbience kutsuu
// playPlaceAmbiencea jokaisella piirrolla, eikä ääni saa vaihtua tai
// katkeilla kesken kaupungissa olon.
let arvottu = null; // { cityId, url }

/*
 * Paikat, joiden ääni ei saa arpoutua: etusivu on pelin ensimmäinen
 * vaikutelma ja sen kuuluu kuulostaa aina samalta (omistajan toive).
 * Muille paikoille ääni arvotaan korista.
 */
const VAKIOPAIKAT = new Set(['etusivu']);

/**
 * Kaupungin äänimaisema: oma kenttä-äänitys ensin, maisematyypin
 * arvontakori varalle.
 *
 * Aiemmin ääni tuli aina tyyppikorista, jolloin 22 Euroopan kaupunkia
 * jakoi kolme "kaupunki"-ääntä ja Praha kuulosti Lissabonilta.
 * Kaupungille kerätyt äänitykset on haettu koordinaattien perusteella
 * (tools/hae-kaupunkiaanet.mjs), joten ne ovat varmasti siitä
 * kaupungista — ne menevät korin edelle (omistajan toive). Ilman omaa
 * äänitystä tyyppikori toimii kuten ennen.
 */
function arvoAani(cityId, tyyppi, lauta, cityCountry = null) {
  if (!cityId) return null;
  if (arvottu?.cityId === cityId) return arvottu.url;
  /*
   * Kolme porrasta, periaate 2b: kaupunki, maa, laji.
   *
   * Aiemmin portaita oli kaksi, ja lajikohtainen kori oli oletus heti
   * kun kaupungilta puuttui oma nauhoitus. Silloin sama basaariääni soi
   * Marrakechissa, Isfahanissa ja Bagdadissa — ja se kertoo pelaajalle,
   * että paikat ovat vaihtokelpoisia. Saman maan toinen kaupunki on
   * lähempänä kuin geneerinen laji.
   */
  const oma = kaupunkiKori(lauta, cityId);
  const maa = oma.length ? [] : maaKori(lauta, cityId, cityCountry);
  const kori = oma.length ? oma
    : (maa.length ? maa : (tyyppi ? tyyppiKori(tyyppi, lauta) : []));
  if (!kori.length) return null;
  const url = VAKIOPAIKAT.has(cityId)
    ? kori[0]
    : kori[Math.floor(Math.random() * kori.length)];
  arvottu = { cityId, url };
  return url;
}

// Striimi on taustaa, ei etualaa — hiljaisempi kuin tehosteäänet.
const VOIMA = 0.14;
// Etusivu on pelin ensimmäinen vaikutelma, ja siinä ääni soi ilman
// mitään muuta: sama taso kuin matkalla kuulosti liian kovalta
// (omistajan havainto). Puolet siitä riittää tunnelmaksi.
const ETUSIVUN_VOIMA = 0.5;
const HAIVYTYS_MS = 1800;
// Sama äänite alkaa joka kerta eri kohdasta, jottei paikka kuulosta
// itseään toistavalta kun sinne palaa. Loppuun jätetään varaa, ettei
// silmukka pyörähdy heti alkuun.
const LOPPUVARA_S = 45;
/*
 * Silmukan sauma ristihäivytyksellä (omistajan toive). Selaimen oma
 * `loop` katkaisee nauhan pään alkuun kuin veitsellä, ja kolmen minuutin
 * äänitteessä sen kuulee. Siksi uusi kierros käynnistetään omana
 * soittimenaan hieman ennen kuin edellinen ehtii loppua, ja ne
 * ristihäivytetään: vanha vaimenee samaa tahtia kuin uusi voimistuu.
 */
const SILMUKKA_RISTI_MS = 2600;

let nykyinen = null; // { audio, cityId, url, tavoite, vaimennus }

/** Soiva taso: kohdevoimakkuus kerrottuna mahdollisella väistöllä. */
const taso = (oma) => (oma ? oma.tavoite * (oma.vaimennus ?? 1) : 0);

/*
 * --- kompressointi (omistajan toive) ---
 *
 * Omistaja: "Eihän näihin voi tehdä kompressointia?" — voi, ja se on
 * oikea työkalu. Äänitteiden VÄLINEN tasaus (tools/mittaa-aanet.mjs)
 * korjasi sen, että toiset olivat kauttaaltaan kovempia kuin toiset.
 * Se ei korjaa SISÄISTÄ vaihtelua: mitattuna 1,6…18,7 dB, eli osa
 * äänitteistä hyppää lähes 19 dB yli omien hiljaisten kohtiensa. Juuri
 * se peittää puheen, vaikka keskitaso on oikea.
 *
 * KOMPRESSORI ON ENNEN VOIMAKKUUSSÄÄTÖÄ. Jos se olisi jälkeen, kynnys
 * osuisi eri kohtaan joka äänitteellä: kertoimet vaihtelevat 0,15:n ja
 * 6:n välillä eli 32 dB, ja kiinteä kynnys puristaisi toisia rajusti ja
 * toisia ei lainkaan. Siksi soittimen oma volume jätetään ykköseen ja
 * taso hoidetaan vahvistinsolmulla kompressorin jälkeen.
 *
 * Sivuhyöty: vahvistinsolmu voi ylittää ykkösen, toisin kuin
 * HTML-soittimen volume. Kertoimen katto ei siis enää leikkaa.
 *
 * VARAREITTI ON PAKOLLINEN. Web Audioon reititetty elementti ei enää soi
 * suoraan kaiuttimeen: jos konteksti ei ole käynnissä (iOS ennen
 * kosketusta) tai lähde ei salli CORSia, tuloksena olisi täysi
 * hiljaisuus — eikä siitä tule virhettä, jonka voisi napata. Siksi
 * reititys tehdään VAIN kun konteksti on varmasti käynnissä, ja
 * crossOrigin asetetaan niin että CORS-ongelma näkyy latausvirheenä
 * (jonka olemassa oleva varareitti jo hoitaa).
 */
const KOMPRESSORI = {
  threshold: -24, // äänitteet ovat täydellä tasollaan tässä kohtaa ketjua
  knee: 18,       // pehmeä polvi: puristus ei kuulu kytkeytyvän päälle
  ratio: 4,
  attack: 0.01,
  release: 0.35,
};

/**
 * Reitittää soittimen kompressorin läpi ja palauttaa vahvistinsolmun,
 * jolla taso säädetään. Palauttaa null, jos reititys ei ole turvallista
 * — silloin soitin jää tavalliseksi <audio>-elementiksi.
 */
function liitaKompressori(audio) {
  const ctx = sfx.ensureContext?.();
  // Suspended-tilassa reititys veisi äänen kokonaan: elementti ei enää
  // soi suoraan, eikä pysähtynyt konteksti soita mitään.
  if (!ctx || ctx.state !== 'running' || !ctx.createMediaElementSource) return null;
  try {
    const lahde = ctx.createMediaElementSource(audio);
    const komp = ctx.createDynamicsCompressor();
    for (const [avain, arvo] of Object.entries(KOMPRESSORI)) komp[avain].value = arvo;
    const vahvistin = ctx.createGain();
    vahvistin.gain.value = 0;
    lahde.connect(komp).connect(vahvistin).connect(ctx.destination);
    // Solmut talteen purkua varten (ks. vapautaSoitin). Ilman tätä
    // ketju jää kiinni destinationiin soittimen kuoltua, ja jokainen
    // kaupunki kasvattaa äänigraafia pysyvästi.
    audio.aaniSolmut = [lahde, komp, vahvistin];
    return vahvistin;
  } catch {
    // createMediaElementSource heittää, jos elementti on jo reititetty.
    return null;
  }
}

/**
 * Vapauttaa soittimen kokonaan: pysäyttää sen, päästää irti äänitteestä
 * ja purkaa sen Web Audio -solmut.
 *
 * Solmujen purku on se osa, joka aiemmin puuttui. Pysäytetty ja
 * src:tön elementti näyttää siivotulta, mutta createMediaElementSource
 * on pysyvä reititys: lähde, kompressori ja vahvistin jäivät kiinni
 * destinationiin, eikä elementti voinut vapautua muistista niin kauan
 * kuin lähdesolmu viittasi siihen. Mitattuna 40 kaupunkia kartalla
 * hyppien synnytti 40 lähdesolmua, joista yhtäkään ei irrotettu.
 *
 * Vain kuolleelle soittimelle. Reititys on yksisuuntainen: purun
 * jälkeen elementti EI enää soi, vaikka sille antaisi uuden src:n.
 * Siksi tätä ei saa kutsua varareittipolulla, joka jatkaa samalla
 * elementillä (ks. petti) — vain silloin, kun soitin on lopullisesti
 * väistynyt tai uusi elementti on ottanut sen paikan.
 */
function vapautaSoitin(audio) {
  if (!audio) return;
  audio.pause();
  audio.removeAttribute('src');
  for (const solmu of audio.aaniSolmut ?? []) {
    try {
      solmu.disconnect();
    } catch {
      /* jo purettu — purku saa tapahtua kahdesti */
    }
  }
  audio.aaniSolmut = null;
  audio.aaniVahvistin = null;
}

/** Soittimen nykyinen taso riippumatta siitä, kumpi reitti on käytössä. */
const lueTaso = (audio) => (audio.aaniVahvistin
  ? audio.aaniVahvistin.gain.value
  : audio.volume);

/** Asettaa tason oikeaan paikkaan. Vahvistin sallii yli ykkösen. */
function asetaTaso(audio, arvo) {
  if (audio.aaniVahvistin) {
    audio.aaniVahvistin.gain.value = Math.max(0, arvo);
  } else {
    audio.volume = Math.min(1, Math.max(0, arvo));
  }
}

function haivyta(audio, kohde, done, kesto = HAIVYTYS_MS) {
  // Uusi häivytys keskeyttää saman äänen edellisen, etteivät kaksi
  // silmukkaa vedä voimakkuutta eri suuntiin.
  const oma = (audio.haivytysId = (audio.haivytysId ?? 0) + 1);
  /*
   * Web Audio -reitillä häivytys ajastetaan ÄÄNISÄIKEELLE gain-
   * ramppina. rAF-askellus jäätyy, kun pääsäie on varattu — juuri
   * lentokalvon rakentamisen aikana — ja aikaan sidottu askel hyppäsi
   * jäätymisen jälkeen suoraan loppuarvoon (omistajan havainto
   * 10.8.2026: lähtöaulan ääni leikkautui äkillisesti kaupunkia
   * klikatessa; mitattu ~5 s pääsäiejumi). Ramppi soi tasaisesti
   * pääsäikeestä riippumatta; done-kutsu saa myöhästyä, koska se vain
   * vapauttaa solmut äänen jo vaiettua.
   */
  const ctx = sfx.ctx;
  if (audio.aaniVahvistin && ctx) {
    try {
      const gain = audio.aaniVahvistin.gain;
      gain.cancelScheduledValues(ctx.currentTime);
      gain.setValueAtTime(Math.max(0, lueTaso(audio)), ctx.currentTime);
      gain.linearRampToValueAtTime(Math.max(0, kohde), ctx.currentTime + kesto / 1000);
      setTimeout(() => {
        if (audio.haivytysId === oma) done?.();
      }, kesto + 60);
      return;
    } catch {
      /* konteksti kiinni tms. — pudotaan rAF-reitille */
    }
  }
  const alku = lueTaso(audio);
  const t0 = performance.now();
  const askel = (nyt) => {
    if (audio.haivytysId !== oma) return;
    // rAF:n aikaleima voi olla ennen t0:aa — ilman alarajaa volume
    // painui negatiiviseksi ja koko ääniketju kaatui poikkeukseen.
    const t = Math.min(1, Math.max(0, (nyt - t0) / kesto));
    asetaTaso(audio, alku + (kohde - alku) * t);
    if (t < 1) requestAnimationFrame(askel);
    else done?.();
  };
  requestAnimationFrame(askel);
}

/** Sammuttaa yhden soittimen pehmeästi ja vapauttaa sen. */
function paasta(audio, kesto = HAIVYTYS_MS) {
  haivyta(audio, 0, () => vapautaSoitin(audio), kesto);
}

export function stopPlaceStream() {
  const vanha = nykyinen;
  nykyinen = null;
  if (!vanha) return;
  // Myös kesken olevan ristihäivytyksen väistyvä puoli pitää sammuttaa,
  // muuten se jäisi soimaan omilleen kaupungin vaihtuessa.
  if (vanha.vaistyva) paasta(vanha.vaistyva);
  paasta(vanha.audio);
}

/**
 * Paikan äänimaisema: oikea äänite, jos kaupungille on merkitty sellainen,
 * muuten syntetisoitu tyyppi. Striimin epäonnistuminen — offline, estetty
 * automaattitoisto tai poistunut tiedosto — palauttaa synteesin itsestään,
 * ja seuraava renderöinti yrittää striimiä uudelleen.
 */
export function playPlaceAmbience(cityId, fallbackType, lauta, cityCountry = null) {
  // Kaupungin oma äänitys ensin, maisematyypin maanosakohtainen
  // arvontakori varalle. Tyhjä kori tarkoittaa syntetisoitua ambienssia.
  const url = arvoAani(cityId, fallbackType, lauta, cityCountry);
  if (!sfx.enabled || !url) {
    stopPlaceStream();
    sfx.setAmbience(sfx.enabled ? fallbackType ?? null : null);
    return;
  }
  if (nykyinen?.cityId === cityId && nykyinen?.url === url) return;

  stopPlaceStream();
  // Valinta voi kantaa aloituskohdan ja voimakkuuden (#alku=20&voima=1.5):
  // hypätään äänitteen vaimean alun yli ja soitetaan halutulla tasolla.
  const { url: osoite, alku, voima } = jaaAlku(url);
  const paikanVoima = VAKIOPAIKAT.has(cityId) ? ETUSIVUN_VOIMA : 1;
  const oma = {
    cityId,
    url,
    osoite,
    alku: alku ?? 0,
    audio: null,
    vaistyva: null,
    vaimennus: 1,
    tavoite: Math.min(1, VOIMA * voima * paikanVoima),
    // Etusivu alkaa aina samasta kohdasta, koska sen kuuluu kuulostaa
    // joka avauksella samalta.
    arvoAlku: !VAKIOPAIKAT.has(cityId),
    fallbackType: fallbackType ?? null,
  };
  nykyinen = oma;
  oma.audio = luoSoitin(oma, { arvottuAlku: oma.arvoAlku, nouse: HAIVYTYS_MS });
}

/**
 * Yksi soitin äänimaisemalle: hakee äänitteen peilistä, hyppää oikeaan
 * kohtaan ja nousee kuuluviin. Sama funktio luo sekä paikkaan
 * saavuttaessa alkavan soittimen että silmukan seuraavan kierroksen,
 * jotta varareitti ja aloituskohta käyttäytyvät molemmissa samoin.
 */
function luoSoitin(oma, { arvottuAlku, nouse }) {
  const audio = new Audio();
  // crossOrigin ENNEN srciä: Web Audio lukee elementin ääntä, ja ilman
  // CORS-lupaa tuloksena olisi hiljaisuus ilman virhettä. Näin puuttuva
  // lupa näkyy latausvirheenä, jonka varareitti alempana hoitaa.
  // Molemmat lähteet sallivat GETin (ämpäri pelin osoitteelle,
  // archive.org kaikille), joten tämä ei normaalisti laukea.
  if (!oma.ilmanKompressoria) audio.crossOrigin = 'anonymous';
  audio.src = aaniOsoite(oma.osoite);
  // Selaimen oma silmukka katkaistaisiin veitsellä; kierrokset
  // ristihäivytetään itse (ks. vahdiSilmukka).
  audio.loop = false;
  audio.preload = 'auto';
  audio.volume = 1;
  audio.aaniVahvistin = oma.ilmanKompressoria ? null : liitaKompressori(audio);
  // Ilman reititystä taso on elementin omassa volumessa, ja sen pitää
  // alkaa nollasta kuten ennenkin.
  if (!audio.aaniVahvistin) audio.volume = 0;
  let hypatty = false;
  const hyppaa = () => {
    if (hypatty) return;
    const pohja = oma.alku;
    // Kesto ei ole aina tiedossa vielä loadedmetadata-hetkellä: osalla
    // äänitteistä se selviää vasta myöhemmin. Siksi kuunnellaan myös
    // durationchange — muuten arvonta jäisi tekemättä hiljaisesti.
    if (!Number.isFinite(audio.duration)) return;
    const yla = audio.duration - LOPPUVARA_S;
    const kohta = arvottuAlku && yla > pohja + 5
      ? pohja + Math.random() * (yla - pohja)
      : pohja;
    hypatty = true;
    if (!kohta) return;
    try {
      audio.currentTime = kohta;
    } catch {
      /* selain ei salli hyppyä ennen dataa — soi alusta */
    }
  };
  audio.addEventListener('loadedmetadata', hyppaa);
  audio.addEventListener('durationchange', hyppaa);
  audio.addEventListener('canplay', hyppaa);

  // Kaksi porrasta ennen synteesiä: jos peili ei vastaa, sama äänite
  // löytyy yhä alkuperäisestä lähteestä. Vasta kun sekin pettää,
  // palataan syntetisoituun ambienssiin.
  let varareittiKokeiltu = false;
  const varalle = () => {
    if (nykyinen === oma && oma.audio === audio) {
      nykyinen = null;
      sfx.setAmbience(oma.fallbackType);
    }
    // Viimeinen porras: tästä elementistä ei enää yritetä mitään, joten
    // se puretaan kokonaan. Varareitit, jotka jatkavat SAMALLA
    // elementillä, ovat jo takanapäin (ks. petti).
    vapautaSoitin(audio);
  };
  // Soitto ja onnistumisen käsittely ovat omassa funktiossaan, jotta
  // varareitti käy täsmälleen saman polun: ilman sitä äänite jäisi
  // vaihdon jälkeen soimaan nollavoimakkuudella.
  const soi = () => audio.play().then(() => {
    if (nykyinen !== oma) {
      // Kaupunki ehti vaihtua kesken latauksen: tämä soitin ei ehtinyt
      // koskaan kuuluviin eikä sitä enää tarvita.
      vapautaSoitin(audio);
      return;
    }
    sfx.setAmbience(null); // synteesi väistyy, kun oikea äänite soi
    haivyta(audio, taso(oma), null, nouse);
    vahdiSilmukka(oma, audio);
  }).catch(petti);
  /*
   * VAHTIAJASTIN: peilin 404 voi jäädä pelkäksi stalled-tapahtumaksi
   * ilman erroria (mitattu 10.8.2026: peilistä puuttunut
   * matkustamoäänite ei koskaan lauennut varareittiä ja avauslento
   * jäi hiljaiseksi). Jos ääni ei ole soittokunnossa kohtuuajassa
   * eikä virhettäkään ole tullut, mennään samaan petti-polkuun kuin
   * error-tapahtumasta.
   */
  let vahti = null;
  const viritaVahti = () => {
    clearTimeout(vahti);
    vahti = setTimeout(() => {
      if (audio.readyState < 3 && nykyinen === oma) petti();
    }, 6000);
  };
  audio.addEventListener('canplay', () => clearTimeout(vahti));
  const petti = () => {
    clearTimeout(vahti);
    if (!varareittiKokeiltu && onPeilista(audio.getAttribute('src'))) {
      varareittiKokeiltu = true;
      peiliPetti('aanet');
      if (nykyinen !== oma) return;
      audio.src = oma.osoite;
      audio.load();
      viritaVahti();
      soi();
      return;
    }
    // Viimeinen porras ennen synteesiä: sama äänite ilman CORS-vaatimusta
    // ja ilman kompressoria. Jos lähde ei jostain syystä salli CORSia,
    // tausta soi silti — vain puristamattomana. Tämä on parempi kuin
    // pudota synteesiin, ja crossOrigin on ainoa asia, jonka tämä
    // yritys muuttaa.
    if (!oma.ilmanKompressoria && audio.crossOrigin) {
      oma.ilmanKompressoria = true;
      if (nykyinen !== oma) return;
      // Tämä elementti jää lopullisesti sivuun: uusi soitin ottaa sen
      // paikan, joten sen ketju puretaan eikä jätetä roikkumaan.
      vapautaSoitin(audio);
      const uusi = luoSoitin(oma, { arvottuAlku: oma.arvoAlku, nouse });
      oma.audio = uusi;
      return;
    }
    varalle();
  };
  audio.addEventListener('error', petti);
  viritaVahti();
  soi();
  return audio;
}

/**
 * Käynnistää seuraavan kierroksen hieman ennen kuin nauha loppuu ja
 * ristihäivyttää kierrokset päällekkäin. Ilman tätä silmukan sauma
 * kuuluu naksahduksena keskellä äänimaisemaa.
 */
function vahdiSilmukka(oma, audio) {
  const risti = SILMUKKA_RISTI_MS / 1000;
  const vaihda = () => {
    if (nykyinen !== oma || oma.audio !== audio) return;
    // Uusi kierros alkaa aina äänitteen alusta (`alku` on vain vaimean
    // alun ylitys) — sauma kuuluu sitä vähemmän, mitä samankaltaisempi
    // kohta on, ja alku on ainoa kohta joka on varmasti käytettävissä.
    oma.vaistyva = audio;
    oma.audio = luoSoitin(oma, { arvottuAlku: false, nouse: SILMUKKA_RISTI_MS });
    haivyta(audio, 0, () => {
      // Silmukan väistyvä kierros on kuollut soitin siinä missä muutkin:
      // uusi kierros on jo ottanut sen paikan omalla elementillään.
      vapautaSoitin(audio);
      if (oma.vaistyva === audio) oma.vaistyva = null;
    }, SILMUKKA_RISTI_MS);
  };
  audio.addEventListener('timeupdate', () => {
    if (nykyinen !== oma || oma.audio !== audio) return;
    if (!Number.isFinite(audio.duration)) return;
    if (audio.duration - audio.currentTime > risti) return;
    vaihda();
  });
  // Varareitti: jos timeupdate ei ehtinyt laukaista vaihtoa (hidas
  // laite, taustavälilehti), kierros alkaa heti nauhan loputtua.
  audio.addEventListener('ended', vaihda);
}

// Tietovisan taustamusiikki: hiljainen huililuuppi kysymyksen ajaksi.
// Aina sama — tunnistettava "nyt mietitään" -sävy. Ilman verkkoa
// kysymys on hiljainen, mikä on myös ihan hyvä.
const QUIZ_MUSIC = {
  url: 'https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3',
  credit: '"Arabic Flute 04" — DYEKHO, Freesound (CC0)',
};
const MUSIIKKI_VOIMA = 0.09;

let musiikki = null;

export function startQuizMusic(lauta) {
  // Kaupungin ääni väistyy reilusti kysymyksen ajaksi — kaksi ääntä
  // päällekkäin täydellä voimalla oli puuroa.
  saadaVaistoa(0.15);
  if (!sfx.enabled || musiikki) return;
  // Maanosan oma valinta tai oletus voittaa; ilman kumpaakaan soi
  // yleinen. Oletukset kulkevat koodin mukana, joten ne toimivat myös
  // kotivalikkoon asennetussa pelissä, jonne selainvalinnat eivät yllä.
  let valinta = lauta ? valittuTaiOletus(`musiikki:tietovisa:${lauta}`) : null;
  if (valinta == null) valinta = valittuTaiOletus('musiikki:tietovisa');
  if (valinta === '') return; // musiikki valittu pois
  const asetus = jaaAlku(valinta);
  const alkuperainen = asetus.url ?? QUIZ_MUSIC.url;
  const audio = new Audio(aaniOsoite(alkuperainen));
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;
  if (asetus.alku) {
    audio.addEventListener('loadedmetadata', () => {
      try {
        audio.currentTime = asetus.alku;
      } catch {
        /* soi alusta */
      }
    }, { once: true });
  }
  musiikki = audio;
  // Sama kahden portaan varareitti kuin paikan ambienssilla: peilin
  // pettäessä kokeillaan alkuperäistä lähdettä, ja vasta sitten
  // kysymys jää hiljaiseksi.
  let varareittiKokeiltu = false;
  const luovuta = () => { if (musiikki === audio) musiikki = null; };
  const soi = () => audio.play().then(() => {
    if (musiikki !== audio) {
      audio.pause();
      return;
    }
    haivyta(audio, Math.min(1, MUSIIKKI_VOIMA * asetus.voima));
  }).catch(petti);
  const petti = () => {
    if (varareittiKokeiltu || !onPeilista(audio.getAttribute('src'))) { luovuta(); return; }
    varareittiKokeiltu = true;
    peiliPetti('aanet');
    if (musiikki !== audio) return;
    audio.src = alkuperainen;
    audio.load();
    soi();
  };
  audio.addEventListener('error', petti);
  soi();
}

/**
 * Taustaäänen väistö muun äänen (esim. kulttuurinoston ääninäytteen)
 * ajaksi — sama kevennys kuin tietovisan aikana. Palautus nostaa
 * taustan takaisin täyteen voimaansa.
 *
 * Väistö talletetaan kertoimena, ei pelkkänä häivytyksenä: kesken
 * väistön alkava silmukan kierros nousisi muuten täyteen voimaan ja
 * puhe hukkuisi sen alle.
 */
/*
 * Väistön syvyys riippuu siitä, mikä väistää.
 *
 * Ääninäyte ja zoomausääni ovat lyhyitä: tausta voi mennä lähes pois,
 * ja se kuulostaa tarkoitukselliselta. Kertoja sen sijaan lukee minuutteja
 * kerrallaan, ja jos tausta katoaa koko ajaksi, tunnelma katoaa mukana.
 * Siksi kertojan alla tausta jää kuuluviin mutta selvästi puheen alle.
 */
const VAISTO_NAYTE = 0.15;
const VAISTO_PUHE = 0.25;

export function vaimennaTausta(kerroin = VAISTO_NAYTE) {
  saadaVaistoa(kerroin);
}

export function palautaTausta() {
  saadaVaistoa(1);
}

/*
 * Kertojan väistö erikseen, laskurilla.
 *
 * Omistajan havainto: "Vieläkin on vaikea kuulla puhetta." Syy oli, ettei
 * KERTOJA väistänyt taustaa lainkaan — vain ääninäyte ja zoomausääni
 * tekivät niin. Tausta soi siis täydellä voimalla juuri silloin kun sen
 * pitäisi väistyä eniten.
 *
 * Laskuri tarvitaan, koska luentoja voi olla päällekkäin (saapumisteksti
 * ja päiväkirja). Ilman sitä ensimmäisen loppuminen palauttaisi taustan
 * täyteen voimaan kesken toisen.
 */
let puhujia = 0;

export function puheAlkoi() {
  puhujia += 1;
  if (puhujia === 1) saadaVaistoa(VAISTO_PUHE);
}

export function puheLoppui() {
  puhujia = Math.max(0, puhujia - 1);
  if (puhujia === 0) saadaVaistoa(1);
}

/** Vain testejä varten: nollaa puhujalaskurin. */
export function nollaaPuhujat() {
  puhujia = 0;
}

/** Asettaa väistökertoimen ja ajaa kaikki soivat kierrokset sen mukaiseksi. */
function saadaVaistoa(kerroin) {
  // Syntetisoitu äänimaisema väistyy samalla. Aiemmin väistö koski vain
  // nauhoitettua taustaa, ja pelin oma maisema jäi soimaan täydellä
  // voimalla näytteen ja kertojan päälle (omistajan havainto).
  sfx.vaimennaAmbienssi?.(kerroin);
  // Tietovisan musiikki on oma raitansa: se ei saa jäädä jyräämään
  // ääninäytettä, mutta ei myöskään kokonaan vaieta kysymyksen ajaksi.
  if (musiikki && kerroin < 1) haivyta(musiikki, MUSIIKKI_VOIMA * kerroin);
  if (!nykyinen) return;
  nykyinen.vaimennus = kerroin;
  const kohde = taso(nykyinen);
  if (nykyinen.audio) haivyta(nykyinen.audio, kohde);
  // Ristihäivytyksen väistyvä puoli on jo matkalla nollaan — sitä ei
  // nosteta takaisin, muuten sauma kuuluisi uudestaan.
  if (nykyinen.vaistyva && kerroin < 1) haivyta(nykyinen.vaistyva, 0);
}

export function stopQuizMusic() {
  // Kaupungin ääni palaa täyteen voimaansa.
  saadaVaistoa(1);
  const vanha = musiikki;
  musiikki = null;
  if (!vanha) return;
  haivyta(vanha, 0, () => vapautaSoitin(vanha));
}

