/*
 * ══════════════════════════════════════════════════════════════════
 * SIIRTYMÄMUSIIKKI — oma pieni raita matkan ajaksi
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 2.9.2026, sanatarkasti: *"Tähän voisi taustalle
 * kehittää oman pienen musiikin, joka tulisi aina siirtymän taustalle.
 * Ja se voisi olla hieman eri kävellessä laivalla ja lentäen."*
 *
 * Kolme raitaa, yksi matkustustapaa kohti: `jalan`, `laiva`, `lento`.
 * Musiikki on SIIRTYMÄN oma ääni eikä paikan — se alkaa siirron
 * alkaessa ja loppuu perillä, eikä se tiedä mistään kaupungista
 * mitään. Siksi tämä on oma moduulinsa eikä kerros
 * js/ambience-stream.js:n maisemakoneistoon: se koneisto on
 * rakennettu YHDELLE soivalle paikalle (arvontakori, aloituskohdan
 * arvonta, ristihäivytetty silmukka, hiljaisuusvahti), ja siirtymä ei
 * tarvitse niistä yhtäkään. Sama perustelu kuin pohjavireellä, ks.
 * ambience-stream.js "POHJAVIRE".
 *
 * ------------------------------------------------------------------
 * MITÄ TÄMÄ LUPAA KUTSUJALLE
 * ------------------------------------------------------------------
 *
 *   aloitaSiirtymamusiikki('jalan')   siirron alussa
 *   lopetaSiirtymamusiikki()          perillä (tai kun matka katkeaa)
 *   himmennaSiirtymamusiikki(0.5)     soiva raita puoleen (tauko)
 *
 * Kaikki ovat turvallisia kutsua milloin tahansa ja niin monta
 * kertaa kuin haluaa: sama laji uudelleen ei käynnistä raitaa
 * alusta, ja lopetus ilman soivaa raitaa ei tee mitään. YKSIKÄÄN EI
 * KOSKAAN VIIVYTÄ KUTSUJAA — ne palaavat heti, eivätkä ne palauta
 * lupausta, jota siirtoanimaatio voisi vahingossa jäädä odottamaan.
 *
 * ------------------------------------------------------------------
 * MYÖS LINSSIN MUSIIKKI (omistajan tilaus 2.9.2026 ilta:
 * *"Generoi linssille oma musiikki"*)
 * ------------------------------------------------------------------
 *
 * Aikajanalinssi (js/aikajana.js) soittaa omaa raitaansa koko ajon
 * ajan. Se on tämän moduulin neljäs laji (`keksinnot`) eikä oma
 * moduulinsa: koneisto on sama rivi riviltä — kaksi polkua ämpäriin,
 * optimistinen soitto, puuttuva raita hiljaisena normaalitilana,
 * väistö pöllön ja kertojan alta, kehittäjävalikon mittari.
 * Yleistys on tarkoituksella pieni: LAJITAULUKKO sai kolme uutta
 * kenttää (`ryhma`, `nousuMs`, `laskuMs`) ja siirtymien käytös on
 * kenttien oletuksissa ennallaan.
 *
 * Ero on kestossa ja siksi feidauksissa. Siirtymä kestää sekunteja,
 * joten musiikki nousee 300 ms:ssä; linssin ajo kestää minuutteja,
 * joten sen raita saa nousta rauhassa (600 ms) ja laskea vielä
 * rauhallisemmin (800 ms). Linssi myös HIMMENTÄÄ raidan puoleen, kun
 * pelaaja pysäyttää kellon — siirtymässä tälle ei ole käyttöä, koska
 * siirtymää ei voi pysäyttää.
 *
 * ------------------------------------------------------------------
 * PUUTTUVA RAITA ON NORMAALI TILA (omistajan tilaus 2.9.2026)
 * ------------------------------------------------------------------
 *
 * Raidat EIVÄT ole vielä olemassa — omistaja päättää, kuka ne
 * säveltää — ja kytkentä on pelissä ennen niitä. Sama etukäteis-
 * nimeäminen kuin pohjavireellä (assets/audio/musa-pohja.mp3) ja
 * luentojen `aanite`-kentässä. Siksi puuttuva tiedosto ei saa
 * aiheuttaa virhettä eikä viivettä:
 *
 *   - Soitin rakennetaan ja `play()` kutsutaan HETI. Lataus on
 *     asynkroninen eikä pysäytä animaatiota; 404 tulee omaa tahtiaan
 *     ja päätyy `error`-käsittelijään.
 *   - Kaksi porrasta, kuten pelin muillakin omilla äänitteillä:
 *     ämpärin `aanet/`-kansio ensin, `audio/`-kansio (vie-aanet.yml)
 *     perään. Jos kumpikaan ei vastaa, laji merkitään PUUTTUVAKSI
 *     PYSYVÄSTI — seuraava siirto ei enää yritä, eikä peli kuluta
 *     verkkoa 404-sarjaan joka heitolla.
 *   - `peiliPetti()`-katkaisijaa EI kutsuta: puuttuva oma äänite ei
 *     ole peilin vika (sama perustelu kuin ambience-stream.js:n
 *     startQuizMusicissa).
 *
 * ------------------------------------------------------------------
 * TUOTANTO-OHJE SÄVELTÄJÄLLE (Fablelle: tämä kuuluu docs/moduulit/
 * aanet.md:hen heti kun se on Raamatun ohjedokumenttikartalla —
 * työsessio ei kirjoita Raamattuun, ks. CLAUDE.md)
 * ------------------------------------------------------------------
 *
 *   KESTO          10–20 s per siirtymäraita (linssin raita 45–60 s,
 *                  ks. alla). Lyhyempi kuulostaa silmukalta,
 *                  pidempi ei ehdi kertaakaan ympäri: pisin siirto
 *                  (kuutonen jalan + kameran saatto) on noin 5,7 s ja
 *                  lyhin noin 1,4 s, joten pelaaja kuulee raidasta
 *                  aina vain palan — ja eri palan joka kerta vain jos
 *                  raita on selvästi matkaa pidempi.
 *   LOOPPISAUMA    Saumaton: raita alkaa ja päättyy samaan
 *                  soinnilliseen lepoon, ei häntää eikä hiljaisuutta
 *                  päihin. Selaimen oma `loop` katkaisee nauhan pään
 *                  alkuun kuin veitsellä (ks. ambience-stream.js
 *                  SILMUKKA_RISTI_MS) — tässä ristihäivytystä EI ole,
 *                  koska raita on lyhyt ja sauma osuu harvoin
 *                  siirtymän sisään. Sauman on siis oltava
 *                  äänitteessä itsessään.
 *   TASO           −33 LUFS, sama kuin taustaäänillä. Mittaus:
 *                  `node tools/mittaa-aanet.mjs` (K-painotettu, sama
 *                  polku kuin pelin soitossa). Pelin oma kerroin
 *                  (SIIRTYMA_VOIMA alla) hienosäädetään kuulokokeella
 *                  omistajan laitteella — ei mittarilla.
 *   FORMAATTI      mp3, mono riittää, 128 kbps, 44,1 kHz. Tiedostot
 *                  ovat pieniä eikä niitä esiladata.
 *   LUONNE         jalan  = kävelyn rytmi, kevyt ja etenevä
 *                  laiva  = aallokon huojunta, hitaampi ja leveämpi
 *                  lento  = ilmava ja liikkumaton; soi kabiiniäänen
 *                           ALLA (v1097), joten sen oma taso on
 *                           matalin kolmesta.
 *                  keksinnot = linssin ajo: pohjalla levossa olevan
 *                           SYDÄMEN SYKE (n. 60 bpm, omistajan
 *                           tarkennus 3.9.2026) ja sen päällä hillitty
 *                           1800-luvun kellokoneisto; EI tunnelmapala,
 *                           koska kello ja filminauha liikkuvat sen
 *                           päällä. Looppi 45–60 s, koska ajo kestää
 *                           minuutteja.
 *   NIMET          siirtyma-jalan.mp3, siirtyma-laiva.mp3,
 *                  siirtyma-lento.mp3, linssi-keksinnot.mp3.
 *   VIENTI         Generoitu raita menee `assets/audio/`-kansioon,
 *                  jolloin .github/workflows/vie-aanet.yml vie sen
 *                  ämpärin `audio/`-kansioon automaattisesti pushissa.
 *                  Peli osaa MOLEMMAT polut (ks. RAIDAT alla), joten
 *                  käsin ämpärin `aanet/`-kansioon viety raita kelpaa
 *                  myös — ja se on nopeampi tie, jos raita tulee
 *                  ulkopuoliselta säveltäjältä eikä repoon haluta
 *                  mediaa (Raamatun linjaus "kaikki aina ämpäriin").
 *   EI REPOON      Tämä moduuli EI generoi äänidataa eikä sisällä
 *                  sitä. Kehittäjän varamusiikki (alla) on
 *                  syntetisoitu ajossa eikä tiedosto.
 */
import { AANI_JUURI, aaniUrl } from './media.js';
import { sfx } from './sound.js';
import { lisaaVaistaja } from './ambience-stream.js';

/*
 * YKSI TAULUKKO KAIKILLE LAJEILLE, KAKSI POLKUA KUHUNKIN.
 *
 * `ampari` on omistajan tilauksessa nimetty polku: R2-juuri +
 * aanet/<tiedosto>. `oma` on repon oma polku, josta vie-aanet.yml
 * tekee ämpärin audio/-osoitteen (js/media.js aaniUrl). Järjestys on
 * tilauksen mukainen: aanet/ ensin.
 *
 * `ryhma` kertoo, mihin raita on tehty: `siirtyma` on matkan lyhyt
 * raita ja `linssi` linssin ajon pitkä raita. Ero näkyy pelissä vain
 * feidauksissa ja kestovaatimuksessa (docs/moduulit/aanet.md); koko
 * muu koneisto on sama, ja siksi lajeja on yksi taulukko eikä kaksi.
 *
 * `nousuMs`/`laskuMs` ovat lajin omat feidaukset. Jos ne puuttuvat,
 * käytetään siirtymän oletuksia (NOUSU_MS 300, LASKU_MS 500), joten
 * siirtymäraitojen käytös on tässä yleistyksessä muuttumaton.
 *
 * VOIMA on kuulokokeen nuppi, kuten ETUSIVUN_VOIMA ja LENNON_VOIMA
 * aikanaan. Lähtöarvo on johdettu pohjavireestä (POHJA_VOIMA 0,019,
 * ≈ −19 dB ambienssiin nähden): siirtymämusiikki on kohtausmusiikkia
 * eikä pohjaväriä, joten se saa olla selvästi sitä kuuluvampi mutta
 * yhä maiseman alla. Lento on matalin, koska sen päällä soi
 * matkustamoäänite omalla korotetulla kertoimellaan (LENNON_VOIMA
 * 2,6) — musiikki kuuluu sen ALLA, ei rinnalla. Linssin raita saa
 * saman voiman kuin laiva (0,11): sen päällä ei soi äänite vaan
 * pelaajan oma napautusääni, ja ajo kestää minuutteja.
 */
const RAIDAT = {
  jalan: {
    ryhma: 'siirtyma',
    ampari: `${AANI_JUURI}aanet/siirtyma-jalan.mp3`,
    oma: 'assets/audio/siirtyma-jalan.mp3',
    voima: 0.11,
  },
  laiva: {
    ryhma: 'siirtyma',
    ampari: `${AANI_JUURI}aanet/siirtyma-laiva.mp3`,
    oma: 'assets/audio/siirtyma-laiva.mp3',
    voima: 0.11,
  },
  lento: {
    ryhma: 'siirtyma',
    ampari: `${AANI_JUURI}aanet/siirtyma-lento.mp3`,
    oma: 'assets/audio/siirtyma-lento.mp3',
    voima: 0.06,
  },
  /*
   * AIKAJANALINSSIN RAITA (omistajan tilaus 2.9.2026 ilta). Soi koko
   * ajon ajan js/aikajana.js:n käskystä. Feidaukset ovat siirtymää
   * rauhallisemmat, koska mikään ei ole kiirettä: linssi avataan
   * kerran ja se kestää minuutteja.
   */
  keksinnot: {
    ryhma: 'linssi',
    ampari: `${AANI_JUURI}aanet/linssi-keksinnot.mp3`,
    oma: 'assets/audio/linssi-keksinnot.mp3',
    voima: 0.11,
    nousuMs: 600,
    laskuMs: 800,
  },
};

/** Siirtymän lajit siinä järjestyksessä kuin ne matkassa esiintyvät. */
export const SIIRTYMALAJIT = ['jalan', 'laiva', 'lento'];

/**
 * Kaikki musiikkilajit — sekä siirtymät että linssit — siinä
 * järjestyksessä, jossa ne näytetään kehittäjävalikon rivillä.
 */
export const MUSIIKKILAJIT = Object.keys(RAIDAT);

/*
 * SISÄÄN 300 ms, ULOS 500 ms (omistajan tilaus). Sisääntulo on nopea,
 * koska siirto on lyhyt eikä musiikki saa olla vasta puolivälissä kun
 * nappula jo laskeutuu; ulostulo on hitaampi, jotta saapumisen
 * äänimaisema ehtii nousta sen alta esiin ilman leikkausta.
 *
 * Nämä ovat OLETUKSET: laji saa antaa omansa (RAIDAT.nousuMs/laskuMs).
 */
const NOUSU_MS = 300;
const LASKU_MS = 500;

/** Lajin feidaukset oletuksineen. */
const nousuMs = (laji) => RAIDAT[laji]?.nousuMs ?? NOUSU_MS;
const laskuMs = (laji) => RAIDAT[laji]?.laskuMs ?? LASKU_MS;

/** Soiva raita: { laji, audio } tai null. */
let soiva = null;
/*
 * Lajit, joiden molemmat polut ovat pettäneet. Lippu on PYSYVÄ tälle
 * istunnolle: ilman sitä jokainen heitto rakentaisi uuden
 * epäonnistuvan soittimen ja tuottaisi kaksi 404:ää.
 */
const puuttuvatRaidat = new Set();
/*
 * LINSSIN HILJENNYSSYY (omistajan tilaus 3.9.2026: *"Kun linssitila
 * menee päälle, niin kaikki muut äänet saisi vaieta taustalta ja oma
 * linssin generoitu musiikki saisi alkaa toistua taustalla."*).
 *
 * Aikajanalinssi hiljentää maiseman tällä syyllä
 * (js/ambience-stream.js hiljennaAmbienssi) ja soittaa sen alla omaa
 * raitaansa. Nimi on TÄSSÄ eikä linssissä, koska sitä tarvitaan
 * kahdessa paikassa: linssi asettaa hiljennyksen, ja tämä moduuli
 * jättää sen huomiotta oman raitansa kohdalla (ks. lajinVaisto).
 */
export const LINSSIN_HILJENNYS = 'linssi';

/* Väistökerroin (kertoja, pöllö, lukija) — sama totuus kuin taustalla. */
let siirtymanVaisto = 1;
/*
 * Väistön syyt ja pohjakerroin (js/ambience-stream.js vaistonTiedot).
 * Näiden varassa linssin raita EI väisty omaa hiljennystään: muuten
 * linssi vaimentaisi itsensä puoleen tasoon koko ajon ajaksi.
 */
let vaistonSyyt = [];
let vaistonPohja = 1;
/*
 * AJON OMA HIMMENNYS (0…1). Väistö tulee muualta pelistä, tämä
 * soivan raidan omistajalta: aikajanalinssi puolittaa raidan, kun
 * pelaaja pysäyttää kellon. Nollautuu joka käynnistyksessä, jottei
 * unohtunut himmennys jää vaivaamaan seuraavaa raitaa.
 */
let ajonHimmennys = 1;

/**
 * Pehmeä tason liuku. Oma pieni toteutus tarkoituksella: raita soi
 * suoraan `<audio>`-elementin volumella eikä Web Audio -ketjussa.
 * Reititetty elementti voi WebKitissä jäädä täysin mykäksi ilman
 * virhettä (ks. ambience-stream.js HILJAISUUSVAHTI), ja siirtymä on
 * niin lyhyt, ettei mykkyyttä ehtisi mitata eikä korjata.
 */
function siirtymanLiuku(audio, kohde, kesto, done) {
  const oma = (audio.liukuId = (audio.liukuId ?? 0) + 1);
  const alku = audio.volume;
  const aika = Math.max(1, kesto);
  let t0 = null;
  const askel = (nyt) => {
    if (audio.liukuId !== oma) return;
    if (t0 === null) t0 = nyt;
    const t = Math.min(1, Math.max(0, (nyt - t0) / aika));
    audio.volume = Math.min(1, Math.max(0, alku + (kohde - alku) * t));
    if (t < 1) requestAnimationFrame(askel);
    else done?.();
  };
  requestAnimationFrame(askel);
}

/**
 * Lajin väistökerroin. Sama kuin taustan kaikilla muilla — paitsi
 * linssiraidalla silloin, kun väistön syynä on linssin OMA hiljennys:
 * silloin käytetään pohjakerrointa, eli sitä väistöä joka jäisi
 * voimaan ilman hiljennystä. Pöllö, kertoja ja lukija vaimentavat
 * linssiraidan yhä (pohja seuraa niitä).
 */
function lajinVaisto(laji) {
  if (RAIDAT[laji]?.ryhma === 'linssi' && vaistonSyyt.includes(LINSSIN_HILJENNYS)) {
    return vaistonPohja;
  }
  return siirtymanVaisto;
}

/** Lajin tavoitetaso juuri nyt: oma kerroin kertaa väistö kertaa himmennys. */
const raidanTaso = (laji) => (RAIDAT[laji]?.voima ?? 0) * lajinVaisto(laji) * ajonHimmennys;

/** Sammuttaa soittimen lopullisesti ja vapauttaa sen. */
function vapautaRaita(audio) {
  audio.liukuId = (audio.liukuId ?? 0) + 1;
  audio.pause();
  audio.removeAttribute('src');
}

/**
 * Käynnistää siirtymän oman raidan.
 *
 * `laji` on 'jalan', 'laiva' tai 'lento'. Palaa heti; puuttuva raita
 * jää hiljaiseksi eikä ilmoita mitään. Kutsu on turvallinen myös
 * silloin kun sama laji jo soi (matka jatkuu automaattiheitolla) —
 * raita jatkaa silloin siitä mihin jäi, eikä pompi alkuun joka
 * askelpisteessä.
 */
export function aloitaSiirtymamusiikki(laji) {
  const raita = RAIDAT[laji];
  if (!raita || !sfx.enabled || puuttuvatRaidat.has(laji)) return;
  if (soiva?.laji === laji) return;
  // Toinen laji soimassa (esim. lento kesken maamatkan): pois pehmeästi.
  if (soiva) lopetaSiirtymamusiikki();

  ajonHimmennys = 1;
  const audio = new Audio(raita.ampari);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0;
  const oma = { laji, audio };
  soiva = oma;

  let variKokeiltu = false;
  const luovuta = () => {
    if (soiva === oma) soiva = null;
    vapautaRaita(audio);
  };
  const soi = () => audio.play().then(() => {
    if (soiva !== oma) {
      audio.pause();
      return;
    }
    siirtymanLiuku(audio, raidanTaso(laji), nousuMs(laji));
  }).catch(() => {
    /*
     * Ele puuttui tai laite kieltäytyi. TÄMÄ EI OLE PUUTTUVA RAITA:
     * lippua ei nosteta, ja seuraava siirto yrittää uudestaan — sama
     * sääntö kuin pohjavireellä.
     */
    luovuta();
  });
  const petti = () => {
    if (variKokeiltu) {
      // Molemmat polut pettivät: laji on hiljaa loppukäynnin ajan.
      puuttuvatRaidat.add(laji);
      luovuta();
      return;
    }
    variKokeiltu = true;
    if (soiva !== oma) return;
    audio.src = aaniUrl(raita.oma);
    audio.load();
    soi();
  };
  audio.addEventListener('error', petti);
  soi();
}

/**
 * Häivyttää soivan raidan pois ja vapauttaa sen. Turvallinen kutsua
 * vaikkei mikään soi.
 */
export function lopetaSiirtymamusiikki() {
  const vanha = soiva;
  soiva = null;
  ajonHimmennys = 1;
  if (!vanha) return;
  siirtymanLiuku(vanha.audio, 0, laskuMs(vanha.laji), () => vapautaRaita(vanha.audio));
}

/**
 * Himmentää soivan raidan omistajansa käskystä: 1 = täysi taso,
 * 0,5 = puolet. Aikajanalinssi kutsuu tätä, kun pelaaja pysäyttää
 * kellon — musiikki jatkuu tauon yli mutta antaa tilaa.
 *
 * Turvallinen kutsua ilman soivaa raitaa: kerroin jää voimaan ja
 * vaikuttaa siihen raitaan, joka on soimassa. Uusi käynnistys
 * nollaa sen, joten unohtunut himmennys ei voi jäädä päälle.
 */
export function himmennaSiirtymamusiikki(kerroin, kesto) {
  const arvo = Math.min(1, Math.max(0, Number(kerroin)));
  ajonHimmennys = Number.isFinite(arvo) ? arvo : 1;
  if (!soiva) return;
  siirtymanLiuku(soiva.audio, raidanTaso(soiva.laji), kesto ?? nousuMs(soiva.laji));
}

/** Soiko juuri nyt siirtymämusiikki, ja mikä laji? Savukkeita varten. */
export function siirtymamusiikkiSoi() {
  return soiva?.laji ?? null;
}

/*
 * VÄISTÖ. Pöllön puhe, kertoja ja lukunäkymä hiljentävät taustan
 * (js/ambience-stream.js), ja siirtymämusiikki on taustaa siinä missä
 * maisemakin. Rekisteröinti tehdään moduulin latauksessa, jolloin
 * kerroin on oikea heti ensimmäisestä siirrosta lähtien.
 */
lisaaVaistaja((kerroin, kesto, tiedot) => {
  siirtymanVaisto = kerroin;
  vaistonSyyt = tiedot?.syyt ?? [];
  vaistonPohja = tiedot?.pohja ?? kerroin;
  if (soiva) siirtymanLiuku(soiva.audio, raidanTaso(soiva.laji), kesto || nousuMs(soiva.laji));
});

/* ══════════════════════════════════════════════════════════════════
 * RAITOJEN OLEMASSAOLO — kehittäjävalikon rivi
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 2.9.2026: kehittäjävalikosta on nähtävä
 * *"siirtymämusiikki: jalan ✓/–, laiva ✓/–, lento ✓/–"* eli löytyykö
 * raita ämpäristä. Kysely on metatietolataus eikä koko raita — se
 * kertoo olemassaolon kuluttamatta kaistaa — ja se tehdään VAIN kun valikko
 * avataan. Peli itse ei koskaan odota tätä: soitto lähtee optimistina
 * ja hiljenee itsestään (ks. yllä).
 */

/** Viimeisin tulos lajeittain: true = löytyi, false = ei, null = ei tiedetä. */
const raitaLoytyi = Object.fromEntries(MUSIIKKILAJIT.map((laji) => [laji, null]));

/** Nykyinen tieto ilman uutta kyselyä. */
export function siirtymamusiikinTila() {
  return { ...raitaLoytyi };
}

/*
 * Kyselyn oma aikakatkaisu. Vastaamaton palvelin ei ole harvinainen
 * tila vaan arkipäivää: kontissa ja lentokoneessa ämpäriin ei ole
 * reittiä lainkaan, ja ilman katkaisua kehittäjärivi jäisi pysyvästi
 * lukemaan "?" eikä vihje koskaan vaihtuisi. 4 s on selvästi enemmän
 * kuin toimiva HEAD tarvitsee ja selvästi vähemmän kuin valikon
 * avaaja jaksaa katsoa.
 */
const KYSELYN_KATKAISU_MS = 4000;

/*
 * OLEMASSAOLO KYSYTÄÄN ÄÄNIELEMENTILLÄ, EI HEAD-PYYNNÖLLÄ (3.9.2026,
 * omistajan havainto: kehittäjärivi väitti kaikkia neljää raitaa
 * puuttuviksi, vaikka ne olivat ämpärissä). Juurisyy mitattuna:
 * ämpärin julkinen osoite vastaa HEAD-pyyntöön 200 mutta ILMAN
 * Access-Control-Allow-Origin-otsaketta (GET saa sen), joten selaimen
 * fetch kaatui CORS-virheeseen ja "virhe = puuttuu". Soittoon tämä ei
 * vaikuttanut — <audio> ei ole CORS-alainen ja soitto on optimistinen —
 * mutta mittari valehteli. Nyt kysely tehdään samalla välineellä kuin
 * soitto: <audio preload=metadata> lataa vain otsakkeet, ja
 * loadedmetadata = löytyi, error = puuttuu. Ilman Audio-rajapintaa
 * (testien tynkäselain, Node) vastaus on "ei tiedetä" = false, kuten
 * ennenkin verkottomana.
 */
function onOlemassaAani(url) {
  return new Promise((valmis) => {
    if (typeof Audio === 'undefined') { valmis(false); return; }
    let tehty = false;
    const soitin = new Audio();
    const ohi = (on) => {
      if (tehty) return;
      tehty = true;
      clearTimeout(ajastin);
      // Lataus poikki: elementti ei jää vetämään dataa taustalla.
      soitin.removeAttribute('src');
      try { soitin.load(); } catch { /* tynkäselain */ }
      valmis(on);
    };
    const ajastin = setTimeout(() => ohi(false), KYSELYN_KATKAISU_MS);
    soitin.preload = 'metadata';
    soitin.addEventListener('loadedmetadata', () => ohi(true), { once: true });
    soitin.addEventListener('error', () => ohi(false), { once: true });
    soitin.src = url;
    try { soitin.load(); } catch { ohi(false); }
  });
}

/**
 * Kysyy jokaisen raidan olemassaolon (ämpärin aanet/, sitten audio/)
 * ja palauttaa saman muodon kuin siirtymamusiikinTila. Mukana ovat
 * myös linssien raidat: kehittäjävalikon rivi näyttää nekin.
 */
export async function tarkistaSiirtymaraidat() {
  await Promise.all(MUSIIKKILAJIT.map(async (laji) => {
    const raita = RAIDAT[laji];
    const on = await onOlemassaAani(raita.ampari) || await onOlemassaAani(aaniUrl(raita.oma));
    raitaLoytyi[laji] = on;
    // Löytynyt raita saa uuden tilaisuuden, vaikka aiempi soitto olisi
    // pettänyt: tiedosto on voitu viedä ämpäriin kesken istunnon.
    if (on) puuttuvatRaidat.delete(laji);
  }));
  return siirtymamusiikinTila();
}

/** Rivi kehittäjävalikkoon: "jalan ✓  laiva –  lento ?  keksinnot ✓". */
export function siirtymamusiikinRivi() {
  return MUSIIKKILAJIT
    .map((laji) => `${laji} ${raitaLoytyi[laji] === null ? '?' : (raitaLoytyi[laji] ? '✓' : '–')}`)
    .join('  ');
}

/* ══════════════════════════════════════════════════════════════════
 * VARAMUSIIKKI — kehittäjän kytkin, OLETUS POIS
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 2.9.2026: *"jos haluat esittää väliaikaisen Web
 * Audio -syntetisoidun kevyen kuvion, tee se erillisenä valinnaisena
 * varamusiikki-kytkimenä kehittäjävalikossa, oletus POIS."*
 *
 * Tämä EI ole musiikkia vaan mittatikku: sen tehtävä on antaa
 * koreografian ajoituksesta kuuluva vaste silloin kun oikeita raitoja
 * ei vielä ole. Kuvio on kolme sävelluokkaa ja yksi suodatin, ja se
 * soi vain jos (1) kytkin on päällä JA (2) lajin raita puuttuu.
 * Oikea raita voittaa aina.
 *
 * Kytkin on laitekohtainen asetus samalla kaavalla kuin kehittäjän
 * muut kytkimet (js/ui-apurit.js kehittajaTummennusPaalla).
 */
const VARA_AVAIN = 'matkakirja-varamusiikki';
let varaKytkinMuisti = null;

export function varamusiikkiPaalla() {
  if (varaKytkinMuisti !== null) return varaKytkinMuisti;
  try {
    varaKytkinMuisti = localStorage.getItem(VARA_AVAIN) === '1';
  } catch {
    varaKytkinMuisti = false; // yksityinen selaus: oletus pois
  }
  return varaKytkinMuisti;
}

export function asetaVaramusiikki(paalla) {
  varaKytkinMuisti = Boolean(paalla);
  try {
    if (paalla) localStorage.setItem(VARA_AVAIN, '1');
    else localStorage.removeItem(VARA_AVAIN);
  } catch {
    /* yksityinen selaus: tila jää tälle istunnolle */
  }
}

/*
 * Kolmen lajin kuviot. `puls` on askelten tiheys sekunteina, `saveet`
 * kuvion sävelet hertseinä ja `kesto` yhden sävelen soiva aika.
 * Kaikki ovat siniaaltoja alipäästön läpi — pehmeitä, ei soittimia.
 */
const VARAKUVIOT = {
  jalan: { puls: 0.43, saveet: [196, 262, 196, 233], kesto: 0.30, taso: 0.055 },
  laiva: { puls: 0.86, saveet: [147, 175, 131, 165], kesto: 0.70, taso: 0.050 },
  lento: { puls: 1.20, saveet: [294, 349, 330, 262], kesto: 1.10, taso: 0.035 },
};

let varaKuvio = null; // { ajastin, solmut: Set, gain }

/** Sammuttaa syntetisoidun kuvion, jos se on päällä. */
export function lopetaVaramusiikki() {
  if (!varaKuvio) return;
  clearInterval(varaKuvio.ajastin);
  try {
    varaKuvio.gain.gain.cancelScheduledValues(0);
    varaKuvio.gain.disconnect();
  } catch {
    /* konteksti jo kiinni */
  }
  varaKuvio = null;
}

/**
 * Käynnistää varamusiikin, jos kytkin on päällä ja lajin oikea raita
 * puuttuu. Kutsutaan aloitaSiirtymamusiikin rinnalta (js/ui.js), ei
 * sen sisältä: näin oikea raita ja varamusiikki ovat toisistaan
 * riippumattomia eikä puuttuva tiedosto voi estää kumpaakaan.
 */
export function aloitaVaramusiikki(laji) {
  if (!varamusiikkiPaalla() || !sfx.enabled) return;
  const kuvio = VARAKUVIOT[laji];
  if (!kuvio || raitaLoytyi[laji] === true) return;
  lopetaVaramusiikki();
  const ctx = sfx.ensureContext?.();
  if (!ctx || !sfx.bus) return;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(sfx.bus);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(kuvio.taso * siirtymanVaisto, ctx.currentTime + NOUSU_MS / 1000);
  let i = 0;
  const soita = () => {
    const nyt = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = kuvio.saveet[i % kuvio.saveet.length];
    i += 1;
    // Pehmeä isku ja pitkä häntä: kuvio ei saa naksua tehosteiden seassa.
    g.gain.setValueAtTime(0, nyt);
    g.gain.linearRampToValueAtTime(1, nyt + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, nyt + kuvio.kesto);
    osc.connect(g).connect(gain);
    osc.start(nyt);
    osc.stop(nyt + kuvio.kesto + 0.05);
  };
  soita();
  varaKuvio = { ajastin: setInterval(soita, kuvio.puls * 1000), gain };
}

/** Vain testejä varten: unohtaa istunnon liput ja soivan raidan. */
export function nollaaSiirtymamusiikki() {
  puuttuvatRaidat.clear();
  for (const laji of MUSIIKKILAJIT) raitaLoytyi[laji] = null;
  if (soiva) vapautaRaita(soiva.audio);
  soiva = null;
  lopetaVaramusiikki();
  varaKytkinMuisti = null;
  siirtymanVaisto = 1;
  vaistonSyyt = [];
  vaistonPohja = 1;
  ajonHimmennys = 1;
}
