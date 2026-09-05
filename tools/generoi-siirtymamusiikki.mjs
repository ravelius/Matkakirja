/*
 * SIIRTYMÄMUSIIKKI JA LINSSIEN MUSIIKKI — saumattomia looppeja
 * ElevenLabs Music -APIlla.
 *
 * Omistajan tilaus 2.9.2026: siirtymän taustalle oma pieni musiikki,
 * hieman eri kävellen, laivalla ja lentäen. Pelin puoli on valmis
 * (js/siirtymamusiikki.js) ja odottaa kolmea tiedostoa; vaatimukset
 * ovat docs/moduulit/aanet.md:n taulukossa. Tämä työkalu tekee ne.
 *
 * Omistajan jatkotilaus 2.9.2026 ilta: *"Generoi linssille oma
 * musiikki"* — aikajanalinssi (js/aikajana.js) soittaa omaa raitaansa
 * koko ajon ajan. Se on sama ketju mutta PITKÄ looppi (45–60 s):
 * linssi kestää minuutteja, ei sekunteja, ja lyhyt kierto alkaisi
 * kuulua silmukaksi. Siksi lajilla on omat mittansa (`lahdeMs`,
 * `kestoMin`, `kestoMax`) eikä yhteisiä vakioita ole enää kuin
 * oletuksina.
 *
 *   node tools/generoi-siirtymamusiikki.mjs --laji kaikki
 *   node tools/generoi-siirtymamusiikki.mjs --laji laiva --ei-vientia
 *   node tools/generoi-siirtymamusiikki.mjs --laji keksinnot --kuiva
 *
 *   --laji jalan|laiva|lento|keksinnot|kaikki   pakollinen.
 *                                     "kaikki" on VAIN kolme
 *                                     siirtymäraitaa: linssiraita on
 *                                     pyydettävä nimeltä, jottei
 *                                     valmiita raitoja generoida
 *                                     vahingossa uudestaan (jokainen
 *                                     kutsu maksaa).
 *   --kuiva                           ei APIa eikä vientiä: tulostaa
 *                                     suunnitelman ja ajaa koko
 *                                     ffmpeg-ketjun syntetisoidulla
 *                                     siniäänellä läpi
 *   --ei-vientia                      generoi ja leikkaa, mutta jätä
 *                                     tiedosto vain levylle
 *
 * ------------------------------------------------------------------
 * MIKSI OMA TYÖKALU EIKÄ RAITA LISÄÄ generoi-musiikki.mjs:ÄÄN
 * ------------------------------------------------------------------
 *
 * Musiikkipaletin neljä raitaa (pohja, visa, aarre, paaaarre) menevät
 * APIsta suoraan repoon sellaisenaan. Siirtymäraidat eivät: ne ovat
 * 10–20 s LOOPPEJA, joiden sauman on oltava äänitteessä itsessään —
 * peli soittaa ne selaimen omalla `loop`-lipulla eikä ristihäivytä
 * (js/siirtymamusiikki.js "LOOPPISAUMA"). Generatiivinen malli ei
 * osaa päättää raitaa samaan lepoon, josta se alkoi, joten sauma
 * tehdään jälkikäteen ffmpegillä. Sen ketjun (leikkaus, tason mittaus,
 * hiljaisuustarkistus, vienti ämpäriin) paikka ei ole palettityökalun
 * sisällä if-haarana vaan omassa tiedostossaan.
 *
 * LYRIAN KUTSU ON YHTEINEN tools/generoi-musiikki.mjs:n kanssa:
 * molemmat tuovat sen moduulista tools/lyria.mjs (osoite, malli,
 * kehotteen muoto, `-lyria`-pääte, avaimen luku). Aiemmin ElevenLabsin
 * kutsu oli kopioitu molempiin, koska palettityökalu suoritti
 * pääohjelmansa moduulitasolla eikä sitä voinut tuoda kutsumatta sitä
 * samalla; se este poistui, kun palettityökalu sai oman `main()`:insa
 * (omistajan linjaus 5.9.2026: *"kaikki musiikki lyrialla"*).
 * ElevenLabsin kutsu on yhä paikallinen — se on vertailumoottori, ja
 * sen runko eroaa lajikohtaisissa kentissä.
 *
 * ------------------------------------------------------------------
 * MITEN SAUMA TEHDÄÄN
 * ------------------------------------------------------------------
 *
 * Mallilta tilataan pitkä pätkä (GENEROITAVA_MS) ja siitä leikataan
 * keskeltä looppi. Lähde S alkaa kohdasta `alku`, ja siitä käytetään
 * pituus L + R (L = loopin kesto, R = ristihäivytys):
 *
 *   pää    = S[0 … R]        loopin ensimmäiset R sekuntia
 *   keski  = S[R … L]        loopin loppuosa sellaisenaan
 *   häntä  = S[L … L+R]      se, mitä lähteessä seurasi keskeä
 *
 *   looppi = ristihäivytys(häntä, pää) + keski
 *
 * Kun looppi kiertää, keskin loppu (kohta S[L]) jatkuu hännän alkuun
 * (sama kohta S[L]) ja häivytys päättyy pään loppuun (S[R]), josta
 * keski alkaa. Molemmat liitokset ovat siis lähteen omia jatkumoita
 * eikä kummassakaan kohtaa leikkausta. Pituus on tasan L.
 *
 * Ristihäivytys tehdään käsin (afade+amix) eikä acrossfadella:
 * acrossfade tuottaa TYHJÄN raidan, kun sen ensimmäinen syöte on
 * tasan häivytyksen mittainen (todettu 2.9.2026, ffmpeg 6.1.1) —
 * juuri se tapaus, joka tässä osuu kohdalle. Käyrä on qsin
 * (vakioteho): kaksi eri kohtaa raidasta ovat korreloimattomia, ja
 * lineaarinen häivytys tekisi sauman keskelle kuuluvan tehokuopan.
 *
 * MP3:N OMA HÄNTÄ. Koodaaja lisää alkuun ~25 ms viiveen ja loppuun
 * täytteen, ja kertoo ne LAME/Xing-otsakkeessa. Selaimet ottavat
 * otsakkeen huomioon, joten sauma pysyy kasassa — mutta tiedoston
 * mitattu kesto on siksi aina kymmenesosia yli leikatun. Formaatti on
 * omistajan valinta (docs/moduulit/aanet.md), joten tätä ei kierretä
 * vaan siedetään: KESTO_MAX jättää sille varaa ja hiljaisuusvahdin
 * HILJAISUUS_KESTO on pidempi kuin alkuviive.
 *
 * ------------------------------------------------------------------
 * TASO
 * ------------------------------------------------------------------
 *
 * Kaksivaiheinen loudnorm: ensin MITATAAN (print_format=json), sitten
 * korjataan tasoero yhdellä `volume=…dB`-vahvistuksella. Toista
 * vaihetta EI ajeta loudnormin oman normalisoinnin läpi, koska se on
 * oletuksena dynaaminen: se säätäisi vahvistusta raidan sisällä ja
 * jättäisi loopin alkuun ja loppuun eri tason — eli rikkoisi juuri
 * sen sauman, jota tässä ollaan tekemässä. Lineaarinen vahvistus ei
 * muuta raidan sisäisiä suhteita lainkaan, ja integroitu LUFS seuraa
 * sitä desibelilleen. Tulos tarkistetaan ebur128:lla.
 *
 * Tavoite −33 LUFS on sama kuin taustaäänillä (tools/mittaa-aanet.mjs
 * TAVOITE). Pelin oma kerroin (RAIDAT-taulukon `voima`
 * js/siirtymamusiikki.js:ssä) on erikseen, kuulokokeen nuppi.
 *
 * ------------------------------------------------------------------
 * VIENTI JA REPO
 * ------------------------------------------------------------------
 *
 * Valmis raita EI mene repoon. Se kirjoitetaan media/-puolelle (joka
 * on .gitignoressa, ks. tarkistus alla) ja viedään sieltä ämpärin
 * `aanet/`-kansioon — Raamatun linjaus "kaikki aina ämpäriin", ja
 * juuri se polku, jonka peli kokeilee ensimmäisenä. Vienti on sama
 * aws s3 cp -komento ja samat neljä salaisuutta kuin
 * .github/workflows/vie-aanet.yml:ssä ja peilaa.yml:ssä.
 *
 * API-avain luetaan vain ympäristöstä (GOOGLE_API_KEY Lyrialle,
 * ELEVEN_API_KEY vertailumoottorille) eikä sitä
 * tulosteta koskaan. HUOM konttiympäristössä: Noden fetch ei käytä
 * ympäristön proxyä ilman NODE_USE_ENV_PROXY=1 (sama pätkä kuin
 * tools/mittaa-aanet.mjs:ssä).
 */

import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  LYRIA_MALLI, MOOTTORIT, avaimenNimi, haeLyriasta, moottorinAvain, raidanTiedosto,
} from './lyria.mjs';

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Sama vartija kuin mittaa-aanet.mjs:ssä: ilman lippua Noden fetch ei
 * lue HTTPS_PROXYa, ja API-kutsu kaatuu kontissa "Host not in
 * allowlist" -virheeseen vaikka verkko on auki. Ohitetaan testiajossa
 * (tiedosto tuodaan moduulina) — vain suoraan ajettu prosessi
 * käynnistetään uudelleen.
 */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

// ── rajapinta ──────────────────────────────────────────────────────

const OSOITE = 'https://api.elevenlabs.io/v1/music';
const MALLI = 'music_v2';
const MUOTO = 'mp3_44100_128';
/*
 * TOINEN MOOTTORI: LYRIA 3.5 (omistaja 4.9.2026 ilta Googlen julkaisusta:
 * "Tätä voisi kokeilla kun pallo saatu valmiiksi" / "Tee se lyyria nyt kun
 * odottelet"). Gemini API:n Interactions-rajapinta, malli lyria-3.5,
 * avain GOOGLE_API_KEY. Lyria-raidat viedään OMALLA NIMELLÄ (pääte
 * -lyria ennen .mp3); omistaja kuunteli molemmat rinnakkain ja valitsi
 * Lyrian (5.9.2026 ilta: "ota lyra musiikit käyttöön peliin ja poista
 * vanha"), joten peli soittaa -lyria-nimiset raidat ja Lyria on
 * työkalun oletusmoottori. ElevenLabs jää vertailumoottoriksi
 * (--moottori eleven, paljas nimi, ei soi pelissä).
 *
 * LYRIAN HAKU ON YHTEINEN MOLEMMILLE MUSIIKKITYÖKALUILLE
 * (tools/lyria.mjs), koska omistajan linjaus 5.9.2026 illalla on
 * *"kaikki musiikki lyrialla"* — myös musiikkipaletti. Vastaus on JSON,
 * jonka sisältä äänilohko etsitään; sitä etsintää ei ole syytä pitää
 * kahtena kopiona. Nimet viedään täältä eteenpäin, jotta kutsujat ja
 * testit näkevät ne tutusta paikasta.
 */
export { MOOTTORIT, raidanTiedosto };

/*
 * Mallilta tilataan reilusti pidempi pätkä kuin looppi: leikkaus
 * otetaan keskeltä, jotta mallin oma sisäänajo ja lopetus jäävät
 * pois. 24 s riittää kaikkiin kolmeen siirtymäraitaan (pisin looppi
 * 16 s + 2 s ristiä = 18 s) ja jättää molempiin päihin kolme
 * sekuntia varaa. Pidempi looppi tilaa omansa (`lahdeMs`).
 */
export const GENEROITAVA_MS = 24000;

/** Lajin oma tilaus, jos se on annettu; muuten yhteinen oletus. */
export const lahdeMs = (raita) => raita.lahdeMs ?? GENEROITAVA_MS;

/** Ämpärin kansio ja pelin ensisijainen hakupolku (aanet/, ei audio/). */
const AMPARIN_KANSIO = 'aanet';
const KOHDE_KANSIO = 'media/aanet';
/*
 * Mallin raaka tuotos talteen erikseen: jos sauma ei kelpaa
 * kuuntelussa, loopin voi leikata uudelleen ilman uutta maksullista
 * kutsua. EI media/aanet-kansioon, jottei peilaus (peilaa.yml, joka
 * synkkaa media/aanet → ämpärin aanet/) veisi raakoja ämpäriin.
 */
const RAAKA_KANSIO = 'media/siirtymamusiikki-raaka';

// ── vaatimukset (docs/moduulit/aanet.md) ───────────────────────────

const TAVOITE_LUFS = -33;
/** Mp3-koodaus ja purku siirtävät mitattua tasoa vajaan puoli LU. */
const LUFS_TOLERANSSI = 1;
/*
 * Valmiin raidan kestohaarukka. Nämä ovat OLETUKSET (siirtymäraidat,
 * aanet.md:n taulukko); laji saa antaa omansa `kestoMin`/`kestoMax`.
 */
const KESTO_MIN = 10;
const KESTO_MAX = 20;

/** Lajin kestorajat oletuksineen. */
export const kestoRajat = (raita) => ({
  min: raita.kestoMin ?? KESTO_MIN,
  max: raita.kestoMax ?? KESTO_MAX,
});
/** Hiljaisuusvahti: näin hiljainen ja näin pitkä jakso on hiljaisuutta. */
const HILJAISUUS_DB = -50;
const HILJAISUUS_KESTO = 0.2;
/*
 * Näin lähellä päätä oleva hiljaisuus on loopin päässä. Mp3-koodaajan
 * oma alkuviive (~25 ms) jää tämän alle eikä silencedetect edes
 * raportoi sitä, koska se on lyhyempi kuin HILJAISUUS_KESTO.
 */
const REUNA = 0.35;

// ── raidat ─────────────────────────────────────────────────────────

/*
 * TYYLI ON YHTEINEN KAIKILLE KOLMELLE, samasta syystä kuin
 * musiikkipaletissa: yksittäin uusiksi generoitu raita saa saman
 * kokoonpanon ja aikakauden automaattisesti eikä muistin varassa.
 * Promptit ovat englanniksi, koska malli on koulutettu englanniksi.
 */
const TYYLI = 'Style: 1873 travel-diary adventure, acoustic and hand played. '
  + 'A small chamber ensemble: piano, soft strings, light woodwind, gentle '
  + 'plucked guitar or harp. No modern synths, no drum kit, no electronic '
  + 'percussion, no vocals, no speech, no sound effects. Warm, curious and '
  + 'unhurried; never childish, never comedic, never epic.';

/** Loopin sauman ohje mallille — sama lause joka raidassa. */
const SAUMA = 'Even and unchanging from beginning to end: no intro, no build, '
  + 'no climax, no ending, no fade in and no fade out. Begin and end on the '
  + 'same chord so the track can repeat forever.';

/*
 * Tiedostonimi on kytkentä: peli hakee tasan nämä nimet ämpärin
 * aanet/-kansiosta (js/siirtymamusiikki.js RAIDAT). Nimeäminen on
 * tässä yhdessä paikassa; tests/siirtymaraidat.test.mjs vartioi, että
 * työkalu ja peli puhuvat samoista tiedostoista.
 *
 * `looppi` on loopin kesto sekunteina ja `risti` sauman
 * ristihäivytys. Kävely saa lyhimmän loopin, koska sen kuvio toistuu
 * muutenkin tiuhaan; laiva ja lento ovat hitaita ja tarvitsevat
 * pidemmän kierroksen, ennen kuin ne palaavat alkuun.
 *
 * `ryhma` erottaa kaksi käyttöä toisistaan: `siirtyma` on matkan
 * lyhyt raita ja `linssi` linssin ajon pitkä raita. Vain
 * siirtymäryhmä kuuluu "kaikki"-valintaan (ks. valitseLajit).
 */
export const LAJIT = {
  jalan: {
    ryhma: 'siirtyma',
    tiedosto: 'siirtyma-jalan.mp3',
    /*
     * Omistaja 3.9.2026: *"jalankulukumusiikki saisi olla rymikäs ja
     * melkein laukkaava rytmi"*. Aiempi prompti (kevyt kävely, ei
     * rumpuja) korvattiin: nyt tiukka, lähes laukkaava 1870-luvun
     * matkasvengi — hevoskyytiä ja reipasta astuntaa, ei marssia.
     */
    kuvaus: 'Rytmikäs, lähes laukkaava matkasvengi',
    looppi: 12,
    risti: 1.5,
    prompt: 'A rhythmic, driving travel underscore for a journey overland in the '
      + '1870s, with an almost galloping feel. A tight, lively pulse from '
      + 'strummed guitar, plucked double bass and light hand percussion like '
      + 'a horse\'s hooves clip-clopping on a road, a bright fiddle or clarinet '
      + 'melody bouncing along above it, a piano adding cheerful accents. '
      + 'Brisk and eager, always moving forward, but never a military march '
      + 'and never heavy drums. '
      + `${SAUMA} ${TYYLI}`,
  },
  laiva: {
    ryhma: 'siirtyma',
    tiedosto: 'siirtyma-laiva.mp3',
    kuvaus: 'Aallokon huojunta, hitaampi ja leveämpi',
    looppi: 16,
    risti: 2,
    prompt: 'A slow and wide underscore for a sea crossing. Long strings swell '
      + 'and settle like a gentle ocean swell, a piano rocks slowly between two '
      + 'chords, a distant woodwind line drifts above. Broader and slower than '
      + 'walking pace, calm and spacious, a ship carried by water. No drums, no '
      + 'fanfare, no storm and no drama. '
      + `${SAUMA} ${TYYLI}`,
  },
  lento: {
    ryhma: 'siirtyma',
    tiedosto: 'siirtyma-lento.mp3',
    kuvaus: 'Ilmava ja liikkumaton; soi kabiiniäänen alla',
    looppi: 16,
    risti: 2,
    prompt: 'An airy, almost motionless underscore that sits far beneath other '
      + 'sounds. Sustained high strings and one soft held chord, a single quiet '
      + 'piano note every few bars, no pulse and no rhythm at all. Weightless '
      + 'and still, suspended, floating. It must never pull attention: another '
      + 'recording plays on top of it. No drums, no melody to follow. '
      + `${SAUMA} ${TYYLI}`,
  },
  /*
   * LINSSIN OMA RAITA (omistajan tilaus 2.9.2026 ilta). Aikajanalinssi
   * soi minuutteja ja pysähtyy 25 kertaa, joten looppi on kolme kertaa
   * pisin siirtymäraita: 50 s kiertää niin harvoin, ettei pelaaja
   * tunnista kierrosta, ja mahtuu silti yhteen kutsuun. Lähde 66 s
   * jättää molempiin päihin ~6 s varaa mallin sisäänajolle ja
   * lopetukselle.
   *
   * Raita ei ole tunnelmapala vaan pohja: sen päällä liikkuvat kello,
   * filminauha ja ilmiöpaneeli, ja niiden on saatava huomio.
   *
   * SYDÄMEN SYKE POHJALLE (omistajan tarkennus 3.9.2026, sanatarkasti:
   * *"Tähän sopisi taustaääneksi myös ehkä jopa sydämen syke, mutta sen
   * lisäksi voisi olla jotain muutakin musiikkia tai musiikki, joka
   * olisi inspiroitunut sydämen sykkeen äänestä."*). Prompti pyytää nyt
   * kaksiosaisen matalan pulssin levossa olevan sydämen tahdissa
   * (n. 60 bpm) ja sen päälle saman hillityn 1800-luvun teeman kuin
   * ennen. Mitat ovat ennallaan, joten vanhat raidat voi korvata
   * ajamalla `--laji keksinnot` uudelleen — tiedostonimi ei muutu.
   */
  keksinnot: {
    ryhma: 'linssi',
    tiedosto: 'linssi-keksinnot.mp3',
    kuvaus: 'Sydämen sykkeen tahti ja 1800-luvun kellokoneisto',
    looppi: 50,
    risti: 2.5,
    lahdeMs: 66000,
    kestoMin: 45,
    kestoMax: 60,
    prompt: 'A patient underscore for an age of invention and engineering in '
      + 'the 1800s, built on a heartbeat. Underneath everything a slow, even '
      + 'two part pulse at about 60 beats per minute — a calm resting '
      + 'heartbeat, low and soft, played by muted low strings, a soft mallet '
      + 'or a quiet hand drum with no attack, felt more than heard. It never '
      + 'speeds up and never gets louder. Above that pulse a restrained '
      + 'nineteenth century clockwork theme: a simple rising figure on light '
      + 'hammered piano or harpsichord, a small ticking figure like a workshop '
      + 'regulator, answered by strings and a woodwind line, always calm and '
      + 'always returning to the same place. Acoustic only: strings, '
      + 'woodwinds, plucked notes, piano. No drum kit, no electronic sounds, '
      + 'no synthesiser, no vocals. Keep it plain and unobtrusive, not dreamy '
      + 'and not sentimental: a clock and pictures move on top of this music '
      + 'and must stay the main thing. '
      + `${SAUMA} ${TYYLI}`,
  },
  /*
   * IHMISEN MATKA (omistajan tilaus 5.9.2026, linssin oma raita).
   * Kaari on 300 000 vuotta pitkä ja kello etenee hitaasti pysäkiltä
   * toiselle, joten raita on keksintöjä hitaampi ja syvempi: pohjalla
   * rumpu kuin sydämen syke ja sen yllä kaukainen ihmisääni ILMAN
   * SANOJA — ei melodiaa, joka veisi huomion kartalta. Mitat ovat
   * samat kuin keksinnöillä (50 s looppi 66 s lähteestä), koska ajo
   * kestää yhtä lailla minuutteja.
   *
   * Tiedostonimessä on väliviiva (linssi-ihmisen-matka.mp3), koska
   * lajin nimi on linssin tunnus — sama merkkijono pelin RAIDAT-
   * taulussa ja kaaren `musiikki`-kentässä.
   */
  'ihmisen-matka': {
    ryhma: 'linssi',
    tiedosto: 'linssi-ihmisen-matka.mp3',
    kuvaus: 'Syvä ja hidas: sydämen syke ja kaukainen ihmisääni',
    looppi: 50,
    risti: 2.5,
    lahdeMs: 66000,
    kestoMin: 45,
    kestoMax: 60,
    prompt: 'A deep, slow underscore for the story of humankind spreading across '
      + 'the whole earth over hundreds of thousands of years. Underneath '
      + 'everything a low drum like a resting heartbeat, soft and unhurried, '
      + 'played with a padded mallet on a large frame drum. Above it a distant '
      + 'human voice humming wordlessly, far away and slightly veiled, joined '
      + 'now and then by a low bowed string or a breathy wooden flute holding '
      + 'one long note. No melody to follow and no chord progression: the music '
      + 'stays in one place and simply breathes. Ancient, spacious and patient, '
      + 'never sad and never triumphant. Acoustic only: skin drum, low strings, '
      + 'wooden flute, wordless voice. No drum kit, no electronic sounds, no '
      + 'synthesiser, no vocals with words, no lyrics. A map and a clock move '
      + 'on top of this music and must stay the main thing. '
      + `${SAUMA} ${TYYLI}`,
  },
};

// ── argumentit ─────────────────────────────────────────────────────

/** Komentoriviliput. Palauttaa `{ virhe }`, jos syöte ei kelpaa. */
export function tulkitseArgumentit(argumentit) {
  const liput = { laji: null, kuiva: false, vienti: true, moottori: 'lyria' };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--laji') {
      liput.laji = argumentit[i + 1] ?? null;
      i += 1;
      if (!liput.laji) return { ...liput, virhe: '--laji ilman arvoa' };
    } else if (arg === '--moottori') {
      liput.moottori = argumentit[i + 1] ?? null;
      i += 1;
      if (!MOOTTORIT.includes(liput.moottori)) return { ...liput, virhe: `--moottori: ${MOOTTORIT.join('|')}` };
    } else if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--ei-vientia') {
      liput.vienti = false;
    } else {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    }
  }
  if (!liput.laji) return { ...liput, virhe: '--laji puuttuu' };
  return liput;
}

/**
 * Lajilista argumentista; null jos nimeä ei tunneta.
 *
 * "kaikki" on TARKOITUKSELLA vain siirtymäryhmä. Linssiraita on
 * pyydettävä nimeltä: se on jo olemassa eikä sitä pidä generoida
 * uudestaan silloin, kun ajetaan siirtymäraidat — jokainen kutsu
 * maksaa (workflow'n `laji`-valikko on sama lista).
 */
export function valitseLajit(laji) {
  if (laji === 'kaikki') {
    return Object.keys(LAJIT).filter((nimi) => LAJIT[nimi].ryhma === 'siirtyma');
  }
  return LAJIT[laji] ? [laji] : null;
}

// ── loopin leikkaus (puhtaat funktiot) ─────────────────────────────

/**
 * Leikkauskohdat lähteen todellisesta kestosta. Malli ei tuota tasan
 * tilattua pituutta, joten mitat lasketaan aina mitatusta kestosta
 * eikä tilauksesta.
 *
 * Palauttaa `{ alku, looppi, risti }` sekunteina: `alku` on kohta,
 * josta leikkaus alkaa (keskeltä lähdettä), `looppi` valmiin raidan
 * kesto ja `risti` sauman ristihäivytys.
 */
export function looppiLeikkaus({
  lahde, looppi, risti, vahin = KESTO_MIN,
}) {
  if (!(lahde > 0)) throw new Error('lähteen kesto puuttuu');
  if (!(looppi > risti)) throw new Error('looppi on lyhyempi kuin ristihäivytys');
  // Käytettävissä oleva pala: koko lähde, jos se on tilattua lyhyempi.
  const kaytto = Math.min(looppi + risti, lahde);
  let r = risti;
  let l = kaytto - r;
  if (l < vahin) {
    // Lyhyt lähde: kavennetaan ensin ristiä, loopin vähimmäiskesto voittaa.
    l = Math.min(vahin, kaytto - 0.5);
    r = kaytto - l;
  }
  if (l < vahin || r < 0.5) {
    throw new Error(`lähde on liian lyhyt (${lahde.toFixed(2)} s) `
      + `vähintään ${vahin} s:n looppiin`);
  }
  return { alku: (lahde - (l + r)) / 2, looppi: l, risti: r };
}

/**
 * ffmpegin filter_complex, joka leikkaa loopin ja ompelee sauman.
 * Ulostulo on nimellä [ulos], mono 44,1 kHz.
 */
export function looppiSuodatin({ alku, looppi, risti }) {
  const s = (x) => x.toFixed(3);
  const paaLoppu = alku + risti;
  const keskiLoppu = alku + looppi;
  const hantaLoppu = alku + looppi + risti;
  return [
    '[0:a]aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono,'
      + 'asplit=3[s1][s2][s3]',
    `[s1]atrim=start=${s(alku)}:end=${s(paaLoppu)},asetpts=N/SR/TB,`
      + `afade=t=in:st=0:d=${s(risti)}:curve=qsin[paa]`,
    `[s2]atrim=start=${s(keskiLoppu)}:end=${s(hantaLoppu)},asetpts=N/SR/TB,`
      + `afade=t=out:st=0:d=${s(risti)}:curve=qsin[hanta]`,
    `[s3]atrim=start=${s(paaLoppu)}:end=${s(keskiLoppu)},asetpts=N/SR/TB[keski]`,
    '[hanta][paa]amix=inputs=2:duration=shortest:normalize=0[sauma]',
    '[sauma][keski]concat=n=2:v=0:a=1[ulos]',
  ].join(';');
}

// ── lokien tulkinta (puhtaat funktiot) ─────────────────────────────

/** loudnormin JSON-lohko lokista → mitattu taso. */
export function tulkitseLoudnorm(loki) {
  const alku = loki.lastIndexOf('{');
  const loppu = loki.lastIndexOf('}');
  if (alku < 0 || loppu < alku) return null;
  let data;
  try {
    data = JSON.parse(loki.slice(alku, loppu + 1));
  } catch {
    return null;
  }
  const taso = Number(data.input_i);
  if (!Number.isFinite(taso)) return null;
  return { taso, huippu: Number(data.input_tp), kirjo: Number(data.input_lra) };
}

/** ebur128:n yhteenvedon integroitu taso (LUFS) lokista. */
export function tulkitseEbur128(loki) {
  const osumat = [...loki.matchAll(/\bI:\s*(-?\d+(?:\.\d+)?)\s*LUFS/g)];
  if (!osumat.length) return null;
  return Number(osumat.at(-1)[1]);
}

/**
 * silencedetectin loki → hiljaiset jaksot päissä ja keskellä.
 * Päässä oleva hiljaisuus on virhe (looppi katkeaisi kuuluvasti),
 * keskellä oleva vain huomautus.
 */
export function hiljaisuusVirheet(loki, kokonaiskesto, { reuna = REUNA } = {}) {
  const alut = [...loki.matchAll(/silence_start:\s*(-?[\d.]+)/g)].map((m) => Number(m[1]));
  const loput = [...loki.matchAll(/silence_end:\s*(-?[\d.]+)/g)].map((m) => Number(m[1]));
  const paissa = [];
  const keskella = [];
  alut.forEach((alku, i) => {
    // Viimeinen jakso voi jäädä ilman loppua: se jatkuu tiedoston loppuun.
    const loppu = Number.isFinite(loput[i]) ? loput[i] : kokonaiskesto;
    const jakso = { alku, loppu };
    if (alku <= reuna || loppu >= kokonaiskesto - reuna) paissa.push(jakso);
    else keskella.push(jakso);
  });
  return { paissa, keskella };
}

// ── apurit ─────────────────────────────────────────────────────────

function aja(komento, argumentit, { salliVirhe = false } = {}) {
  const ajo = spawnSync(komento, argumentit, {
    encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  });
  const loki = `${ajo.stdout ?? ''}${ajo.stderr ?? ''}`;
  if (!salliVirhe && (ajo.error || ajo.status !== 0)) {
    throw new Error(`${komento} epäonnistui (${ajo.error?.message ?? ajo.status}):\n`
      + loki.slice(-2000));
  }
  return { koodi: ajo.status ?? 1, loki };
}

function onOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

/** Äänitiedoston kesto sekunteina. */
function kestoSekunteina(polku) {
  const { loki } = aja('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ]);
  const arvo = Number(loki.trim());
  if (!Number.isFinite(arvo) || arvo <= 0) throw new Error(`kestoa ei saatu: ${polku}`);
  return arvo;
}

/** Ämpärin julkinen juuri suoraan pelin omasta lähteestä. */
export function julkinenJuuri() {
  const media = readFileSync(resolve(JUURI, 'js/media.js'), 'utf8');
  const osuma = media.match(/const R2_JUURI = '([^']+)'/);
  if (!osuma) throw new Error('js/media.js: R2_JUURI ei löytynyt — päivitä tämä työkalu.');
  return osuma[1];
}

/** Kaatuu, jos polku ei ole .gitignoressa — mediaa ei viedä repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], {
    encoding: 'utf8',
  });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis raita menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

// ── ketjun vaiheet ─────────────────────────────────────────────────

/** Kuivan ajon lähde: sävel, jolla ffmpeg-ketju testataan ilman APIa. */
function syntetisoiLahde(kohde, sekunnit) {
  aja('ffmpeg', [
    '-y', '-v', 'error',
    '-f', 'lavfi',
    '-i', `sine=frequency=220:duration=${sekunnit}:sample_rate=44100,`
      + 'tremolo=f=0.4:d=0.7',
    '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
}

/** Yksi maksullinen kutsu: mallilta pitkä pätkä levylle. */
async function haeApista(raita, avain, kohde) {
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: raita.prompt,
      music_length_ms: lahdeMs(raita),
      model_id: MALLI,
      output_format: MUOTO,
      // Siirtymämusiikki soi kertojan ja kaupunkiäänten alla: laulu
      // veisi huomion niiltä.
      force_instrumental: true,
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) {
    // Virherunko näkyviin (avain ei ole siinä): 401/403 kertoo, ettei
    // musiikkirajapinta ole auki tällä avaimella.
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  writeFileSync(kohde, data);
  return data.length;
}

/** Leikkaa looppi, normalisoi taso ja kirjoita mp3. */
function leikkaaLooppi(lahde, kohde, raita, tyokansio) {
  const lahteenKesto = kestoSekunteina(lahde);
  const leikkaus = looppiLeikkaus({
    lahde: lahteenKesto,
    looppi: raita.looppi,
    risti: raita.risti,
    vahin: kestoRajat(raita).min,
  });
  const wav = join(tyokansio, 'looppi.wav');
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-filter_complex', looppiSuodatin(leikkaus),
    '-map', '[ulos]', '-c:a', 'pcm_s16le', wav,
  ]);

  // Vaihe 1: mittaus. Vaihe 2: yksi lineaarinen vahvistus (ks. otsikko).
  const mittausLoki = aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', wav,
    '-af', `loudnorm=I=${TAVOITE_LUFS}:TP=-2:LRA=11:print_format=json`,
    '-f', 'null', '-',
  ]).loki;
  const mitattu = tulkitseLoudnorm(mittausLoki);
  if (!mitattu) {
    throw new Error(`loudnormin mittaus ei tuottanut lukua:\n${mittausLoki.slice(-800)}`);
  }
  const korjaus = TAVOITE_LUFS - mitattu.taso;
  aja('ffmpeg', [
    '-y', '-v', 'error', '-i', wav,
    '-af', `volume=${korjaus.toFixed(2)}dB`,
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return {
    leikkaus, lahteenKesto, mitattu, korjaus,
  };
}

/** Valmiin raidan tarkistukset: kesto (lajin rajoissa), taso, hiljaisuus päissä. */
function tarkista(kohde, raita) {
  const pituus = kestoSekunteina(kohde);
  const taso = tulkitseEbur128(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde, '-af', 'ebur128=peak=true',
    '-f', 'null', '-',
  ]).loki);
  const hiljaisuus = hiljaisuusVirheet(aja('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', kohde,
    '-af', `silencedetect=n=${HILJAISUUS_DB}dB:d=${HILJAISUUS_KESTO}`,
    '-f', 'null', '-',
  ]).loki, pituus);

  const virheet = [];
  const varoitukset = [];
  const rajat = kestoRajat(raita);
  if (pituus < rajat.min || pituus > rajat.max) {
    virheet.push(`kesto ${pituus.toFixed(2)} s ei ole välillä ${rajat.min}–${rajat.max} s`);
  }
  if (taso === null) {
    virheet.push('tasoa ei saatu mitattua (ebur128)');
  } else if (Math.abs(taso - TAVOITE_LUFS) > LUFS_TOLERANSSI) {
    virheet.push(`taso ${taso.toFixed(1)} LUFS, tavoite ${TAVOITE_LUFS} `
      + `(±${LUFS_TOLERANSSI})`);
  }
  for (const jakso of hiljaisuus.paissa) {
    virheet.push(`hiljaisuutta loopin päässä ${jakso.alku.toFixed(2)}–`
      + `${jakso.loppu.toFixed(2)} s — sauma kuuluisi`);
  }
  for (const jakso of hiljaisuus.keskella) {
    varoitukset.push(`hiljainen jakso ${jakso.alku.toFixed(2)}–${jakso.loppu.toFixed(2)} s`);
  }
  return {
    pituus, taso, virheet, varoitukset,
  };
}

/** Vie valmis raita ämpärin aanet/-kansioon (sama komento kuin vie-aanet.yml). */
function vieAmpariin(kohde, nimi) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const avain = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !avain && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!onOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');

  aja('aws', [
    's3', 'cp', kohde, `s3://${ampari}/${AMPARIN_KANSIO}/${nimi}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', 'audio/mpeg',
    '--cache-control', 'public, max-age=2592000',
  ]);
}

/** HEAD julkiseen osoitteeseen: näkyykö raita oikeasti ämpäristä. */
function tarkistaJulkinen(nimi) {
  const url = `${julkinenJuuri()}${AMPARIN_KANSIO}/${nimi}`;
  if (!onOlemassa('curl')) return { url, koodi: null, pituus: null };
  const { loki } = aja('curl', ['-sS', '-I', '--max-time', '30', url], { salliVirhe: true });
  const koodi = loki.match(/HTTP\/[\d.]+ (\d{3})/)?.[1] ?? null;
  const pituus = loki.match(/content-length:\s*(\d+)/i)?.[1] ?? null;
  return { url, koodi, pituus };
}

// ── pääohjelma ─────────────────────────────────────────────────────

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-siirtymamusiikki.mjs --laji '
      + `${Object.keys(LAJIT).join('|')}|kaikki [--kuiva] [--ei-vientia]`);
    process.exit(1);
  }
  const lajit = valitseLajit(liput.laji);
  if (!lajit) {
    console.error(`Tuntematon laji: ${liput.laji} — tunnetut: `
      + `${Object.keys(LAJIT).join(', ')}, kaikki.`);
    process.exit(1);
  }

  for (const komento of ['ffmpeg', 'ffprobe']) {
    if (!onOlemassa(komento)) {
      console.error(`${komento} puuttuu polusta — loopin leikkaus tarvitsee sen.`);
      console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
      process.exit(1);
    }
  }

  const avain = moottorinAvain(liput.moottori);
  if (!liput.kuiva && !avain) {
    console.error(`${avaimenNimi(liput.moottori)} puuttuu ympäristöstä — musiikkia ei voi generoida.`);
    console.error('Kuivan ajon saa ilman avainta: --laji kaikki --kuiva');
    process.exit(1);
  }

  const tyokansio = mkdtempSync(join(tmpdir(), 'siirtymamusiikki-'));
  let kohdekansio = tyokansio;
  let raakakansio = tyokansio;
  if (liput.kuiva) {
    console.log('KUIVA AJO (--kuiva) — APIa ei kutsuta, ämpäriin ei viedä.');
    console.log('ffmpeg-ketju ajetaan syntetisoidulla siniäänellä.');
  } else {
    // Ennen ensimmäistäkään maksullista kutsua: kohde ei saa olla repossa.
    kohdekansio = resolve(JUURI, KOHDE_KANSIO);
    raakakansio = resolve(JUURI, RAAKA_KANSIO);
    vaadiGitignore(kohdekansio);
    vaadiGitignore(raakakansio);
    mkdirSync(kohdekansio, { recursive: true });
    mkdirSync(raakakansio, { recursive: true });
  }

  const valmiit = [];
  let virheita = 0;
  try {
    for (const nimi of lajit) {
      const raita = { ...LAJIT[nimi], tiedosto: raidanTiedosto(LAJIT[nimi], liput.moottori) };
      const kohde = join(kohdekansio, raita.tiedosto);
      const lahde = join(raakakansio, `raaka-${raita.tiedosto}`);
      console.log(`\n── ${nimi} → ${AMPARIN_KANSIO}/${raita.tiedosto} (${raita.kuvaus})`);
      console.log(`   looppi ${raita.looppi} s, sauma ${raita.risti} s, `
        + `lähde ${(lahdeMs(raita) / 1000).toFixed(0)} s, `
        + `kesto ${kestoRajat(raita).min}–${kestoRajat(raita).max} s, `
        + (liput.moottori === 'lyria' ? `moottori Lyria (${LYRIA_MALLI})` : `malli ${MALLI}, muoto ${MUOTO}, force_instrumental`));
      console.log(`   prompti: ${raita.prompt}`);

      if (liput.kuiva) {
        syntetisoiLahde(lahde, lahdeMs(raita) / 1000);
      } else {
        // eslint-disable-next-line no-await-in-loop
        const tavut = liput.moottori === 'lyria'
          // Siirtymä- ja linssiraidat ovat kaikki looppeja, joten sauma
          // pyydetään myös Lyrialta — leikkaus vain varmistaa sen.
          ? await haeLyriasta({ prompt: raita.prompt, kestoMs: lahdeMs(raita) }, avain, lahde)
          : await haeApista(raita, avain, lahde);
        console.log(`   API: ${(tavut / 1024).toFixed(0)} kt → ${lahde}`);
      }

      const {
        leikkaus, lahteenKesto, mitattu, korjaus,
      } = leikkaaLooppi(lahde, kohde, raita, tyokansio);
      console.log(`   leikkaus: lähde ${lahteenKesto.toFixed(2)} s, `
        + `alku ${leikkaus.alku.toFixed(2)} s, looppi ${leikkaus.looppi.toFixed(2)} s, `
        + `risti ${leikkaus.risti.toFixed(2)} s`);
      console.log(`   taso: mitattu ${mitattu.taso.toFixed(1)} LUFS, `
        + `korjaus ${korjaus.toFixed(2)} dB`);

      const tulos = tarkista(kohde, raita);
      console.log(`   valmis: ${tulos.pituus.toFixed(2)} s, `
        + `${tulos.taso === null ? '?' : tulos.taso.toFixed(1)} LUFS → ${kohde}`);
      for (const varoitus of tulos.varoitukset) console.log(`   huom: ${varoitus}`);
      if (tulos.virheet.length) {
        for (const virhe of tulos.virheet) console.error(`   VIRHE: ${virhe}`);
        virheita += 1;
        // Kelvotonta raitaa ei viedä ämpäriin, mutta tiedosto jää
        // levylle kuunneltavaksi — kutsu on jo maksettu.
        continue;
      }
      valmiit.push({ nimi, raita });
    }

    if (!liput.kuiva && liput.vienti) {
      for (const { raita } of valmiit) {
        vieAmpariin(join(kohdekansio, raita.tiedosto), raita.tiedosto);
      }
    }
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (liput.kuiva) {
    console.log(`Kuiva ajo valmis: ffmpeg-ketju läpi ${valmiit.length}/${lajit.length} lajilla.`);
    console.log('Mitään ei kutsuttu APIsta eikä viety ämpäriin.');
  } else if (!liput.vienti) {
    console.log('Vienti ohitettiin (--ei-vientia). Tiedostot:');
    for (const { raita } of valmiit) console.log(`  ${join(kohdekansio, raita.tiedosto)}`);
  } else {
    console.log('Julkiset osoitteet:');
    for (const { raita } of valmiit) {
      const { url, koodi, pituus } = tarkistaJulkinen(raita.tiedosto);
      const kunnossa = koodi === '200';
      if (!kunnossa) virheita += 1;
      console.log(`  ${url} → HTTP ${koodi ?? '?'}`
        + `${pituus ? `, ${(Number(pituus) / 1024).toFixed(0)} kt` : ''}`
        + `${kunnossa ? '' : '  ← EI VASTAA'}`);
    }
    console.log('');
    console.log('KUUNTELE raidat ennen kuin ne jäävät peliin: sauman on '
      + 'oltava kuulumaton, kun raita kiertää.');
  }
  process.exit(virheita ? 1 : 0);
}

if (process.argv[1] === TAMA) await main();
