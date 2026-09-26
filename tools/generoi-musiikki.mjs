/*
 * Pelin oma MUSIIKKIPALETTI (omistajan tilaus 29.8.2026: "generoi ääniä
 * ja musiikkeja ja laita suoraan peliin").
 *
 * MOOTTORI ON LYRIA 3.5 (omistajan linjaus 5.9.2026 illalla,
 * sanatarkasti: *"kaikki musiikki lyrialla"*). Siirtymä- ja
 * linssiraidat siirtyivät Lyriaan jo aiemmin samana päivänä ("ota lyra
 * musiikit käyttöön peliin ja poista vanha"); tämä työkalu tekee saman
 * paletille. ElevenLabs Music jää vertailumoottoriksi
 * (`--moottori eleven`), jotta raidat voi kuunnella rinnakkain.
 *
 * NELJÄ RAITAA, KAKSI PARIA. Paletti ei ole neljä irrallista kappaletta
 * vaan kaksi paria, ja juuri se tekee siitä paletin:
 *
 *   musa-pohja.mp3     hyvin harva pohjavire, joka soi ambienssin ALLA
 *                      koko matkan ajan (looppi).
 *   musa-visa-2.mp3    kysymyksen tikittävä uteliaisuus (looppi).
 *   musa-aarre.mp3     tavallisen aarteen lämmin aihe (ei looppi).
 *   musa-paaaarre.mp3  SAMA AIHE juhlavampana pääaarteelle (ei looppi).
 *
 * Lyrian raidat saavat päätteen `-lyria` (musa-pohja-lyria.mp3 jne.),
 * ElevenLabsin paljaan nimen — sama sääntö kuin siirtymäraidoilla, ja
 * samasta paikasta (tools/lyria.mjs `raidanTiedosto`). Näin molemmat
 * moottorit voi generoida ylikirjoittamatta toisiaan, ja pelin puoli
 * kääntyy yhdellä kytkimellä (js/media.js MUSIIKIN_PAATE).
 *
 * Kahdella viimeisellä on sama sävelaihe kahdessa asussa: kun pelaaja
 * lopulta löytää Aarnin luettelon pääaarteen, hän on kuullut aiheen jo
 * kymmeniä kertoja pienempänä. Siksi promptit alla EIVÄT ole toisistaan
 * riippumattomia — pääaarteen prompti kuvaa nimenomaan saman teeman
 * laajennusta. Jos toinen generoidaan uusiksi, KUMPIKIN kannattaa
 * generoida uusiksi, muuten sukulaisuus katoaa.
 *
 * KAUPUNKIRAIDAT OVAT VIIDES LAJI, EIVÄT VIIDES PALETTIRAITA
 * (omistaja 5.9.2026 klo 00.35: *"ateenaan saavuttaessa voisi vaihtua
 * kappale. generoi sinne oma musiikki."*). Kaupungin oma kappale
 * (musa-kaupunki-<id>.mp3) korvaa pohjavireen niin kauan kuin pelaaja
 * on siinä kaupungissa. Ne generoidaan nimeltä tai ryhmänä
 * `kaupungit`; `kaikki` on yhä paletin neljä raitaa, jottei valmista
 * kaupunkiraitaa generoida vahingossa uudestaan. Peli: KAUPUNKIRAIDAT
 * js/kaupunkimusiikki.js, soitto js/ambience-stream.js.
 *
 * ALUERAIDAT JA TILARAIDAT (omistajan tilaus 5.9.2026 yöllä,
 * sanatarkasti: *"generoi musiikkeja kaikkiin kohtiin peliä, ne tuovat
 * paljon lisää tunnelmaa."*). Kaupunkiraidan rinnalle tuli kaksi lajia
 * lisää, ja kaikki kolme soivat samassa paikassa sekoituksessa —
 * pohjavireen sijaisina:
 *
 *   laji 'alue'  musa-kaupunki-<alue>.mp3   kaupungille, jolla ei ole
 *                                           omaa kappaletta (Välimeri,
 *                                           Pohjola, Keski-Eurooppa,
 *                                           Balkan, Itä-Eurooppa,
 *                                           Britteinsaaret)
 *   laji 'tila'  musa-lehti.mp3             lehden lukurauha
 *                musa-matkalaukku.mp3       laukku auki
 *                musa-etusivu.mp3           etusivu ja pallon selailu
 *
 * Ryhmät: `kaikki` = paletin neljä, `kaupungit` = kaupungit JA alueet,
 * `alueet` = pelkät alueraidat, `tilat` = kolme tilaraitaa. Kaikki
 * pyydetään erikseen samasta syystä kuin ennenkin: jokainen kutsu
 * maksaa, eikä valmista raitaa generoida vahingossa uudestaan. Peli:
 * js/musiikkivalitsin.js (ketju kaupunki → alue → pohja ja tilat sen
 * päällä), js/kaupunkimusiikki.js (taulut), js/ambience-stream.js
 * (soitin).
 *
 * MIKSI musa-visa-2 EIKÄ musa-visa: vanhaa visamusiikkia ei
 * ylikirjoiteta. Pelin viittaus vaihdetaan (js/aani-ehdokkaat.js,
 * 'musiikki:tietovisa' → oletus), ja vanha valinta jää ehdokaslistaan.
 * Paluu on siis yhden rivin vaihto eikä tiedoston palautus — sama
 * periaate kuin js/sound.js:n SALLITUT_TEHOSTEET-historiassa.
 *
 * ------------------------------------------------------------------
 * EI LOOPIN LEIKKAUSTA — JA MIKSI EI
 * ------------------------------------------------------------------
 *
 * Siirtymäraidat leikataan ffmpegillä saumattomaksi silmukaksi
 * (tools/generoi-siirtymamusiikki.mjs "MITEN SAUMA TEHDÄÄN"). Paletti
 * EI kulje sen koneiston läpi, vaan mallin tuotos menee levylle
 * sellaisenaan — kuten ennenkin, ja tarkoituksella:
 *
 *   - Kaksi neljästä raidasta ei ole looppi lainkaan. Aarreaiheilla on
 *     alku ja loppu, ja ne soivat kerran paljastuskortin päällä.
 *   - Kaksi looppiraitaa soivat pelin hiljaisimmalla tasolla
 *     (pohjavire −19 dB ambienssiin, visamusiikki kortin alla). Sauma
 *     pyydetään promptissa ("begin and end on the same quiet sustained
 *     chord"), ja se on kelvannut kuuntelussa.
 *   - Leikkuri kaataisi kelvottoman raidan, ja tässä ketjussa kelvoton
 *     raita on kuuntelijan päätös eikä mittarin: paletti kuunnellaan
 *     PR:ssä ennen julkaisua.
 *
 * Jos looppisauma joskus kuuluu naksahduksena, oikea korjaus on ajaa
 * raita saman leikkurin läpi — ei rakentaa tänne toista.
 *
 * ------------------------------------------------------------------
 * VIENTI: PAIKALLISEEN KANSIOON, SIITÄ ÄMPÄRIIN
 * ------------------------------------------------------------------
 *
 * Paletin raita kirjoitetaan paikalliseen `assets/audio/`-kansioon,
 * joka EI ole repossa (omistajan linjaus 11.9.2026: äänet vain
 * ämpärissä; kansio on .gitignoressa). Sieltä
 * .github/workflows/generoi-musiikki.yml vie raidat ämpärin
 * `audio/`-kansioon — ja juuri sitä polkua peli hakee (js/media.js
 * `aaniUrl`: assets/audio/x.mp3 → <ämpäri>/audio/x.mp3).
 * Siirtymäraidat menevät ämpärin `aanet/`-kansioon, koska peli
 * kokeilee niille ensin sitä polkua; paletille aanet/ olisi umpikuja,
 * koska yksikään paletin soittokohta ei kysy sitä.
 *
 * Ero on siis pelin polussa eikä maun asia. Paletti KUUNNELLAAN ennen
 * julkaisua ajon artefaktista, ei PR:stä — mp3:ia ei committoida.
 *
 * RAJAPINNAT
 *   Lyria (oletus):  tools/lyria.mjs — Gemini API, malli lyria-3.5,
 *                    avain GOOGLE_API_KEY.
 *   ElevenLabs:      POST https://api.elevenlabs.io/v1/music
 *                    otsakkeet: xi-api-key, Content-Type: application/json
 *                    runko: { prompt, music_length_ms (3000…600000),
 *                             model_id, output_format, force_instrumental }
 *                    vastaus: mp3-tavut sellaisenaan (ei JSONia).
 *                    Avain ELEVEN_API_KEY.
 *
 * Käyttö:  GOOGLE_API_KEY=... node tools/generoi-musiikki.mjs pohja visa
 *          GOOGLE_API_KEY=... node tools/generoi-musiikki.mjs kaikki
 *          ELEVEN_API_KEY=... node tools/generoi-musiikki.mjs kaikki --moottori eleven
 * Kuiva testiajo ilman avainta ja ilman API-kutsuja (mitä ajo tekisi):
 *          node tools/generoi-musiikki.mjs kaikki --kuiva
 *          ELEVEN_KUIVA=1 node tools/generoi-musiikki.mjs kaikki
 * Avaimet ovat repon Actions-secreteissä (Raamattu → "Äänet ja
 * luennat"); niitä ei tallenneta minnekään, ei edes lokiin.
 *
 * HUOM konttiympäristössä: Noden fetch ei käytä ympäristön proxyä
 * ilman lippua — tämä työkalu käynnistää itsensä uudelleen
 * NODE_USE_ENV_PROXY=1:llä, muuten "Host not in allowlist" -virhe
 * tulisi omasta putkesta vaikka verkko on auki.
 */

import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  eratunnus, kokoaRaakakuitti, lahdeCommit, raakaAmpariKansio, sha256 as raakaSha256,
  vaadiRaakavienti, vieKuitti, vieRaaka,
} from './raakavienti.mjs';

import {
  LYRIA_MALLI, MOOTTORIT, avaimenNimi, haeLyriasta, moottorinAvain, raidanTiedosto,
} from './lyria.mjs';

export { MOOTTORIT, raidanTiedosto };

const TAMA = fileURLToPath(import.meta.url);
const JUURI = resolve(dirname(TAMA), '..');

/*
 * Sama vartija kuin generoi-siirtymamusiikki.mjs:ssä ja
 * mittaa-aanet.mjs:ssä: ilman lippua Noden fetch ei lue HTTPS_PROXYa.
 * Ohitetaan testiajossa (tiedosto tuodaan moduulina) — vain suoraan
 * ajettu prosessi käynnistetään uudelleen.
 */
if (process.argv[1] === TAMA && !process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const OSOITE = 'https://api.elevenlabs.io/v1/music';
const MALLI = 'music_v2';
/*
 * Sama muoto kuin luennoilla ja tehosteilla (mp3_44100_128). Musiikin
 * oletus olisi mp3_48000_192, mutta paletti soi pelissä ambienssin alla
 * ja väistöjen läpi — 128 kbps riittää siihen kuuluvasti, ja tiedostot
 * pysyvät kevyinä, koska ne haetaan ämpäristä joka avauksella.
 * Koskee vain ElevenLabsia: Lyria ei ota muotoa parametrina.
 */
const MUOTO = 'mp3_44100_128';

/*
 * TYYLI ON YHTEINEN KAIKILLE NELJÄLLE. Se on erillinen vakio eikä
 * kopioitu jokaiseen promptiin, koska juuri tämä lause tekee raidoista
 * saman pelin musiikkia: sama kokoonpano, sama aikakausi, sama sävy.
 * Jos yksi raita generoidaan uusiksi kuukauden päästä, se saa saman
 * tyylin automaattisesti eikä muistin varassa.
 *
 * Promptit ovat englanniksi, koska malli on koulutettu englanniksi —
 * sama linjaus kuin tehosteiden ja aarrekuvien promptikielessä.
 */
const TYYLI = 'Style: 1873 travel-diary adventure. Warm chamber orchestra: '
  + 'piano, soft strings, light woodwind, a faint hint of music box. '
  + 'No modern synths, no drum kit, no electronic percussion, no vocals. '
  + 'Elegant, curious, never childish, never comedic.';

/*
 * RAIDAT. Tiedostonimi on kytkentä samalla tavalla kuin luennoissa:
 * peli hakee juuri tämän nimen (js/ambience-stream.js POHJA_MUSIIKKI,
 * js/aani-ehdokkaat.js 'musiikki:tietovisa', js/ui.js AARRE_MUSIIKKI —
 * kaikki neljä js/media.js:n `musaPolku`-apurin kautta), joten
 * nimeäminen on tässä yhdessä paikassa eikä kutsujan muistin varassa.
 *
 * `looppi: true` on kaksi asiaa yhdessä: muistutus kuuntelijalle siitä,
 * mitä raidalta pitää tarkistaa ennen julkaisua (sauma), ja Lyrian
 * kehotteen valinta — looppiraidalta pyydetään saumaa, aarreaiheelta
 * ei (ks. tools/lyria.mjs `lyriaKehote`).
 *
 * Kuvaukset ja promptit ovat sanatarkasti samat kuin ElevenLabsin
 * aikana: moottorin vaihto ei ole tilaisuus muuttaa sitä, mitä
 * raidoilta on tilattu. Lyrian oma muoto (instrumentaali, kesto,
 * looppi) lisätään kehotteeseen tools/lyria.mjs:ssä.
 */
export const RAIDAT = {
  pohja: {
    tiedosto: 'musa-pohja.mp3',
    kesto: 80000,
    looppi: true,
    kuvaus: 'Pohjavire, soi ambienssin alla',
    prompt: 'A very simple, sparse, slow ambient underscore that sits far '
      + 'beneath other sounds. Long sustained low strings and a single soft '
      + 'piano note every few bars. Almost no melody, no build, no climax, '
      + 'no percussion. It should be barely noticeable and never pull '
      + 'attention. Seamless loop: begin and end on the same quiet sustained '
      + 'chord so the track can repeat forever without a seam. '
      + `${TYYLI}`,
  },
  visa: {
    tiedosto: 'musa-visa-2.mp3',
    kesto: 45000,
    looppi: true,
    kuvaus: 'Tietovisan kysymysmusiikki (korvaa nykyisen viittauksen)',
    prompt: 'A light, ticking underscore for a moment of curiosity: someone '
      + 'is thinking hard over an open notebook. Gentle staccato piano and '
      + 'pizzicato strings keep a soft clock-like pulse, a faint music box '
      + 'figure answers it. Tension of wondering, never threat or danger; '
      + 'no stingers, no rising alarm. Quiet and steady throughout. '
      + 'Seamless loop: begin and end on the same pulse so the track can '
      + 'repeat without a seam. '
      + `${TYYLI}`,
  },
  aarre: {
    tiedosto: 'musa-aarre.mp3',
    kesto: 10000,
    looppi: false,
    kuvaus: 'Tavallisen aarteen paljastus (lyhyt lämmin aihe)',
    prompt: 'A short warm reveal: a small, beautiful object comes into the '
      + 'light. A simple rising four-note theme on piano, answered by soft '
      + 'strings and one clear music box chime, resolving warmly. Intimate '
      + 'and modest in scale, a quiet delight rather than a fanfare. Starts '
      + 'immediately with no silent lead-in and settles into a clean ending. '
      + `${TYYLI}`,
  },
  paaaarre: {
    tiedosto: 'musa-paaaarre.mp3',
    kesto: 13000,
    looppi: false,
    kuvaus: 'Pääaarteen fanfaari (sama aihe juhlavampana)',
    prompt: 'The same simple rising four-note theme as a small warm reveal '
      + 'cue, now returning in full: the theme is stated grandly by the whole '
      + 'chamber orchestra, strings singing it out with horn support, piano '
      + 'underneath, and the music box chime crowning the final chord. A '
      + 'proper but tasteful fanfare for the greatest find of the journey — '
      + 'triumphant and moved, never bombastic. Same key and same melody as '
      + 'the smaller cue so the two are clearly related. Starts immediately '
      + 'with no silent lead-in and ends on a full sustained chord. '
      + `${TYYLI}`,
  },
  /*
   * ----------------------------------------------------------------
   * KAUPUNKIRAIDAT (omistajan tilaus 5.9.2026 klo 00.35, sanatarkasti:
   * *"ateenaan saavuttaessa voisi vaihtua kappale. generoi sinne oma
   * musiikki."*)
   * ----------------------------------------------------------------
   *
   * Kaupunkiraita EI ole viides palettiraita vaan oma lajinsa
   * (`laji: 'kaupunki'`), ja ero on rahassa: `kaikki` tarkoittaa yhä
   * paletin neljää raitaa, ja kaupunkiraidat pyydetään nimeltä tai
   * ryhmänä `kaupungit`. Sama varovaisuus kuin linssiraidalla
   * siirtymätyökalussa — valmista raitaa ei generoida vahingossa
   * uudestaan, ja jokainen kutsu maksaa.
   *
   * TIEDOSTONIMI ON KYTKENTÄ PELIIN. Se lasketaan kaupungin id:stä
   * samalla säännöllä kuin pelissä (js/kaupunkimusiikki.js
   * `kaupunkiraidanTunnus`): 'ateena' → musa-kaupunki-ateena.mp3, ja
   * Lyrian pääte tulee perään samasta paikasta kuin muillakin
   * (tools/lyria.mjs `raidanTiedosto`). Pelin soittokohta on
   * js/ambience-stream.js:n pohjavire, joka vaihtaa raitaa saavuttaessa
   * — vartijana tests/kaupunkimusiikki.test.mjs.
   *
   * Prompti on omistajan tilaus Fablen sanoin. Kesto 75 s on paletin
   * pohjavireen (80 s) mitta: raita soi niin kauan kuin pelaaja viipyy
   * kaupungissa, joten lyhyt kierto alkaisi kuulua silmukaksi.
   */
  ateena: {
    laji: 'kaupunki',
    kaupunki: 'ateena',
    tiedosto: 'musa-kaupunki-ateena.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Ateenan oma kappale pohjavireen tilalla',
    prompt: 'Arriving in Athens in the afternoon: a light, bright and warm '
      + 'instrumental. A bouzouki and a guitar play sparingly over a slow '
      + 'rhythm, the Mediterranean evening coming on. No singing, no tourist '
      + 'clichés; it plays UNDER the ambient soundscape of the city and must '
      + 'never pull attention from it. Seamless loop: begin and end on the '
      + 'same quiet sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  /*
   * ----------------------------------------------------------------
   * ALUERAIDAT (omistaja 5.9.2026 yö: *"generoi musiikkeja kaikkiin
   * kohtiin peliä, ne tuovat paljon lisää tunnelmaa."*)
   * ----------------------------------------------------------------
   *
   * Euroopan laudalla on 44 kaupunkia. Oma kappale tehdään niistä
   * niille, jotka omistaja nimeää (Ateena ensimmäisenä); MUUT SAAVAT
   * ALUEENSA RAIDAN, ja alue johdetaan pelin omasta maatiedosta
   * (js/kaupunkimusiikki.js ALUEEN_MAAT). Kuusi raitaa kattaa koko
   * laudan, ja uusi kaupunki saa musiikkinsa ilman uutta kutsua.
   *
   * Avain on alueen tunnus ja tiedostonimi sama kuin kaupungeilla
   * (musa-kaupunki-<tunnus>.mp3), koska pelille ne ovat sama asia:
   * pohjavireen paikallinen sijainen. Kesto on kaupunkiraidan mitta
   * (75 s) — pelaaja viipyy alueella kymmeniä minuutteja, joten lyhyt
   * kierto alkaisi kuulua silmukaksi.
   *
   * PAIKALLINEN SOITINVÄRI HILLITYSTI, EI KANSALLISPUKUA. Raita soi
   * kaupungin äänimaiseman ALLA eikä saa esittää maata: yksi tai kaksi
   * soitinta riittää kertomaan, missä ollaan.
   */
  britteinsaaret: {
    laji: 'alue',
    alue: 'britteinsaaret',
    tiedosto: 'musa-kaupunki-britteinsaaret.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Britteinsaarten alueraita (Lontoo, Edinburgh, Dublin)',
    prompt: 'Travelling through the British Isles in 1873: a quiet instrumental '
      + 'with a single unhurried fiddle line and a small harp answering it, '
      + 'mist and drizzle over wet stone streets, lamps just lit. Restrained '
      + 'and a little melancholy, never a jig or a reel, no marching rhythm, '
      + 'no bagpipes, no folk-postcard clichés; it plays UNDER the ambient '
      + 'soundscape of the city and must never pull attention from it. '
      + 'Seamless loop: begin and end on the same quiet sustained chord so the '
      + 'track can repeat without a seam. '
      + `${TYYLI}`,
  },
  pohjola: {
    laji: 'alue',
    alue: 'pohjola',
    tiedosto: 'musa-kaupunki-pohjola.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Pohjolan alueraita (Tukholma, Oslo, Helsinki, Rovaniemi, Islanti)',
    prompt: 'The northern lands in 1873: slow, spacious and clear, a plucked '
      + 'kantele-like zither and long low strings, pale night light over water '
      + 'and forest, cold air and great distance. Calm and unsentimental, no '
      + 'drama, no heroic horns, no Nordic-saga clichés; it plays UNDER the '
      + 'ambient soundscape of the place and must never pull attention from it. '
      + 'Seamless loop: begin and end on the same quiet sustained chord so the '
      + 'track can repeat without a seam. '
      + `${TYYLI}`,
  },
  'keski-eurooppa': {
    laji: 'alue',
    alue: 'keski-eurooppa',
    tiedosto: 'musa-kaupunki-keski-eurooppa.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Keski-Euroopan alueraita (Pariisi, Wien, Berliini, Praha, Budapest)',
    prompt: 'Central Europe in 1873: the polite colour of a small chamber '
      + 'ensemble heard from three streets away, piano and soft strings, a '
      + 'gentle triple lilt that never becomes a waltz to dance to. Elegant, '
      + 'unhurried, faintly formal, no oompah band, no operetta clichés; it '
      + 'plays UNDER the ambient soundscape of the city and must never pull '
      + 'attention from it. Seamless loop: begin and end on the same quiet '
      + 'sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  valimeri: {
    laji: 'alue',
    alue: 'valimeri',
    tiedosto: 'musa-kaupunki-valimeri.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Välimeren alueraita (Rooma, Madrid, Lissabon, Marseille, Kreeta)',
    prompt: 'The Mediterranean coast in the late afternoon: a warm nylon-string '
      + 'guitar and a mandolin playing sparingly over a slow, easy pulse, sun '
      + 'on old plaster, salt in the air. Light and unhurried, no flamenco '
      + 'flourishes, no tarantella, no tourist clichés; it plays UNDER the '
      + 'ambient soundscape of the city and must never pull attention from it. '
      + 'Seamless loop: begin and end on the same quiet sustained chord so the '
      + 'track can repeat without a seam. '
      + `${TYYLI}`,
  },
  balkan: {
    laji: 'alue',
    alue: 'balkan',
    tiedosto: 'musa-kaupunki-balkan.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Balkanin alueraita (Sarajevo, Sofia, Bukarest, Dubrovnik, Istanbul)',
    prompt: 'The Balkans in 1873, where mountain roads meet the bazaar: a '
      + 'breathy end-blown flute holds a long line while a plucked tambura '
      + 'answers it sparsely, warm stone, evening. Modal and calm, in simple '
      + 'even time, no fast asymmetric dance rhythms, no brass band, no '
      + 'clichés; it plays UNDER the ambient soundscape of the city and must '
      + 'never pull attention from it. Seamless loop: begin and end on the same '
      + 'quiet sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  'ita-eurooppa': {
    laji: 'alue',
    alue: 'ita-eurooppa',
    tiedosto: 'musa-kaupunki-ita-eurooppa.mp3',
    kesto: 75000,
    looppi: true,
    kuvaus: 'Itä-Euroopan alueraita (Moskova, Pietari, Kiova, Riika, Vilna)',
    prompt: 'The eastern plains in 1873: low sustained strings and a distant '
      + 'hammered dulcimer figure, wide flat land under a grey sky, church '
      + 'bells far away but never struck here. Broad, patient and a little '
      + 'solemn, no balalaika trembling, no dance, no clichés; it plays UNDER '
      + 'the ambient soundscape of the city and must never pull attention from '
      + 'it. Seamless loop: begin and end on the same quiet sustained chord so '
      + 'the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  /*
   * ----------------------------------------------------------------
   * TILARAIDAT — näkymä, joka vie musiikin mukanaan
   * ----------------------------------------------------------------
   *
   * Sama tilaus, sama koneisto: kun lehti tai matkalaukku avataan, sen
   * oma raita ottaa pohjavireen (tai kaupungin kappaleen) paikan
   * ristihäivytyksellä ja palauttaa sen sulkeutuessaan. Etusivu on
   * paikka eikä näkymä (game.phase === 'pickstart'), mutta soittaa
   * samalla tavalla. Taulut: js/musiikkivalitsin.js TILARAIDAT ja
   * PAIKKARAIDAT.
   *
   * NÄMÄ OVAT PELIN HILJAISIMPIA RAITOJA. Lehden ja laukun päällä
   * pelaaja lukee, ja etusivulla kertoja aloittaa heti — musiikin
   * tehtävä on antaa huoneelle sävy, ei kertoa tarinaa.
   */
  lehti: {
    laji: 'tila',
    tila: 'lehti',
    tiedosto: 'musa-lehti.mp3',
    kesto: 90000,
    looppi: true,
    kuvaus: 'Lehden lukurauha (kaupunki- ja maalehti auki)',
    prompt: 'Reading a newspaper alone in a quiet library: paper, lamplight and '
      + 'a slow afternoon. A small harmonium breathes long soft chords while a '
      + 'guitar is plucked very sparingly above it, almost no melody and no '
      + 'development at all. Extremely quiet and still, nothing that asks to be '
      + 'followed, no percussion; it plays UNDER a reading voice and must never '
      + 'pull attention from the page. Seamless loop: begin and end on the same '
      + 'quiet sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  matkalaukku: {
    laji: 'tila',
    tila: 'matkalaukku',
    tiedosto: 'musa-matkalaukku.mp3',
    kesto: 45000,
    looppi: true,
    kuvaus: 'Matkalaukku auki (tavarat, Aarnin luettelo, varusteet)',
    prompt: 'An old leather travelling case opened on a bed: brass catches, '
      + 'worn straps, small treasures laid out one by one. A few soft piano '
      + 'notes and a single warm sustained string chord, with one faint music '
      + 'box tone far back. Very quiet, small and private, no melody to speak '
      + 'of, no build, no percussion; it plays UNDER the room and must never '
      + 'pull attention. Seamless loop: begin and end on the same quiet '
      + 'sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  etusivu: {
    laji: 'tila',
    tila: 'etusivu',
    tiedosto: 'musa-etusivu.mp3',
    kesto: 90000,
    looppi: true,
    kuvaus: 'Etusivu, avausteksti ja lähtökaupungin valinta pallolla',
    prompt: 'Before the journey begins: an open map on a desk, a finger moving '
      + 'from city to city, nothing decided yet. Wide and waiting — long quiet '
      + 'strings, a few slow piano notes and one distant music box tone — with '
      + 'a sense of a door about to open but no departure yet. Patient, never '
      + 'triumphant, no fanfare, no rising build, no percussion; it plays UNDER '
      + 'the sound of the departure hall and the narrator. Seamless loop: begin '
      + 'and end on the same quiet sustained chord so the track can repeat '
      + 'without a seam. '
      + `${TYYLI}`,
  },

  /*
   * ----------------------------------------------------------------
   * MUSIIKKI- JA ÄÄNISUUNNITELMA, VAIHE 1 (docs/raportit/musiikki-ja-aanisuunnitelma-20260926.md; omistaja hyväksyi 26.9.
   * klo 05.0x kaikki 8 suositusta). Johtoaihe ja kolme koeraitaa; omistaja kuuntelee erän ennen seuraavaa. Raidat EIVÄT
   * soi pelissä ennen kuin pelidata viittaa niihin (kuuntelusääntö), joten vienti ämpäriin on turvallinen.
   * Johtoaihe Lyrian likimääräisenä (päätös 1): D–G–F–E–D–C–D, nouseva kvartti ja laskeva askelkulku.
   * ----------------------------------------------------------------
   */
  johtoaihe: {
    laji: 'suunnitelma',
    vaihe: 1,
    tiedosto: 'musa-johtoaihe.mp3',
    kesto: 25000,
    looppi: false,
    kuvaus: 'Isoisän johtoaihe täytenä (vaihe 1, kuunneltava)',
    prompt: 'The grandfather\'s theme, stated once, simply and completely: a short singable melody of seven notes, '
      + 'D–G–F–E–D–C–D in D minor turning to F major — a rising fourth like a question, then a stepwise descent home '
      + 'like an answer. Solo piano states it first, then soft strings repeat it with a clarinet counter-line. Wistful '
      + 'but warm, a family memory opening. Tempo about 70 BPM. Starts immediately and ends on a soft sustained chord. '
      + `${TYYLI}`,
  },
  aloituslento: {
    laji: 'suunnitelma',
    vaihe: 1,
    tiedosto: 'musa-aloituslento.mp3',
    kesto: 25000,
    looppi: false,
    kuvaus: 'Aloituslento Lontoosta kohteeseen (vaihe 1)',
    prompt: 'Departure: an old propeller plane lifts off from London and turns towards the first destination; the '
      + 'journey begins. The grandfather\'s theme (D–G–F–E–D–C–D, rising fourth then stepwise descent) sounds in full, '
      + 'rising and widening as the plane climbs, strings and piano with a light woodwind lift, then settles into a calm, '
      + 'hopeful descent for the landing. About 80 BPM. Leaves space for a narrator voice; no sudden peaks. Starts '
      + 'immediately and ends softly. '
      + `${TYYLI}`,
  },
  'saapuminen-valimeri': {
    laji: 'suunnitelma',
    vaihe: 1,
    tiedosto: 'musa-saapuminen-valimeri.mp3',
    kesto: 10000,
    looppi: false,
    kuvaus: 'Saapumistunnus Välimeren kaupunkiin (vaihe 1, maanosaversioiden malli)',
    prompt: 'A short arrival signature for a Mediterranean city: the first two bars of the grandfather\'s theme '
      + '(D–G–F–E, a rising fourth then a step down) played by a classical guitar with mandolin tremolo, a light '
      + 'tambourine touch and a clarinet answer, warm Mediterranean sunlight. About 90 BPM. Starts immediately with no '
      + 'lead-in and ends cleanly on an open chord. '
      + `${TYYLI}`,
  },
  loppu: {
    laji: 'suunnitelma',
    vaihe: 1,
    tiedosto: 'musa-loppu.mp3',
    kesto: 75000,
    looppi: false,
    kuvaus: 'Matkan loppu, kaikki aarteet löydetty (vaihe 1)',
    prompt: 'The journey\'s end: every forgotten treasure has been found and the grandfather\'s diary is complete. '
      + 'The grandfather\'s theme (D–G–F–E–D–C–D) returns in full, first alone on piano, then carried by the whole '
      + 'chamber orchestra — strings singing it, horn support, clarinet and flute weaving around it — moved and grateful '
      + 'rather than triumphant. Gradual build to one warm climax at about two thirds, then a long, quiet close on solo '
      + 'piano and a final sustained chord. About 66 BPM. No drum kit. '
      + `${TYYLI}`,
  },
  /*
   * ----------------------------------------------------------------
   * VAIHE 2 (suunnitelman §5 kohta 2, Fable 26.9. klo 08.3x: sanatarkasti §5): pelin kulun kolme raitaa, saapumistunnukset
   * lopuille maanosille (taulukko 1.2; Välimeri tehtiin vaiheessa 1) ja maanosaraidat Välimeri sekä Pohjois- ja
   * Länsi-Eurooppa. Omistaja kuuntelee erän ennen vaihetta 3. Kestot ja taso: tools/viimeistele-musiikki.mjs.
   * Saapumistunnus on aina johtoaiheen kaksi ensimmäistä tahtia (D–G–F–E) maanosan pääsoittimella ja värillä.
   * Kulttuurilaina: soittimet ja moodit, ei pyhiä lauluja eikä tunnistettavia kansansävelmiä (1.2).
   * ----------------------------------------------------------------
   */
  kohtaaminen: {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: 'musa-kohtaaminen.mp3',
    kesto: 70000,
    looppi: true,
    kuvaus: 'Kohtaaminen: henkilön tapaaminen ja tehtävä (vaihe 2, looppi)',
    prompt: 'Meeting a stranger in a foreign city who has a task for the traveller: curious and a little playful, '
      + 'attentive rather than tense. A light pizzicato pulse in the strings, a clarinet asking short questions and a '
      + 'piano answering, like a conversation across a café table. About 94 BPM, even dynamics. It plays UNDER a '
      + 'narrator voice and dialogue text and must never pull attention. No grandfather\'s theme. Seamless loop: begin '
      + 'and end on the same quiet pulse so the track can repeat without a seam. '
      + `${TYYLI}`,
  },
  ratkaisu: {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: 'musa-ratkaisu.mp3',
    kesto: 6000,
    looppi: false,
    kuvaus: 'Oikea ratkaisu, vihreä piste syttyy (vaihe 2, one-shot 4–6 s)',
    prompt: 'A very short cue for solving a riddle correctly and a green dot lighting on the map: the answering half '
      + 'of the grandfather\'s theme (E–D–C–D, a stepwise descent home) on piano with a warm string chord under it and '
      + 'a single music box sparkle at the end. Satisfied and warm, not a fanfare. About 90 BPM. Starts immediately with '
      + 'no lead-in and ends cleanly on a major chord. '
      + `${TYYLI}`,
  },
  epaonnistuminen: {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: 'musa-epaonnistuminen.mp3',
    kesto: 4000,
    looppi: false,
    kuvaus: 'Väärä vastaus tai aika loppui (vaihe 2, one-shot 3–4 s)',
    prompt: 'A very short, gentle cue for a wrong answer or time running out: two soft descending notes on clarinet '
      + 'over a quiet unresolved string chord, like a shrug and "not this time". Kind, never mocking, never a '
      + 'punishment, no comedic trombone. About 80 BPM. Starts immediately and fades out quickly. '
      + `${TYYLI}`,
  },
  // Saapumistunnukset: pääsoitin + väri taulukosta 1.2.
  ...Object.fromEntries([
    ['lansi-eurooppa', 'Northern or Western European city', 'solo piano with a cello line, a harmonium chord and a flute answer, grey northern light'],
    ['ita-eurooppa', 'Eastern European or Russian city', 'a balalaika tremolo and a violin, with a cimbalom shimmer, wide snowy plains'],
    // Lyria hylkäsi 26.9. muotoilun "Middle Eastern or North African city" (Input blocked: sensitive words).
    ['lahi-ita', 'harbour city of the Levant or the North African coast', 'an oud and a ney flute in a modal colour, a soft frame drum touch and a qanun ripple, warm dusk'],
    ['saharan-etelapuoli', 'city south of the Sahara', 'a kora and a balafon, soft hand drums and a wooden flute, open savanna light'],
    ['etela-aasia', 'South Asian city', 'a bansuri flute with a very quiet sitar drone and a soft tabla touch, humid evening air'],
    ['ita-aasia', 'East Asian city', 'a guzheng or koto and an erhu, with a breathy shakuhachi answer, early morning mist'],
    ['pohjois-amerikka', 'North American city of the 1870s', 'a fiddle and an 1870s banjo, with a harmonica answer, a wide river town'],
    ['etela-amerikka', 'South American city', 'a charango and a guitar, with a quena flute answer, high mountain air'],
    ['oseania', 'city in Oceania', 'a classical guitar with soft strings, a harbour at the far side of the world'],
  ].map(([id, paikka, soittimet]) => [`saapuminen-${id}`, {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: `musa-saapuminen-${id}.mp3`,
    kesto: 10000,
    looppi: false,
    kuvaus: `Saapumistunnus: ${id} (vaihe 2, one-shot 8–10 s)`,
    prompt: `A short arrival signature for a ${paikka}: the first two bars of the grandfather's theme `
      + `(D–G–F–E, a rising fourth then a step down) played by ${soittimet}. Instruments and mode only, no sacred `
      + 'song and no recognisable folk tune. About 88 BPM. Starts immediately with no lead-in and ends cleanly on an '
      + 'open chord. '
      + `${TYYLI}`,
  }])),
  // Maanosaraidat (looppeja 60–70 s): alueraitojen varareitti, johtoaihe sisäänrakennettuna.
  'maanosa-valimeri': {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: 'musa-maanosa-valimeri.mp3',
    kesto: 70000,
    looppi: true,
    kuvaus: 'Maanosaraita Välimeri ja Balkan (vaihe 2, looppi)',
    // Lyria hylkäsi 26.9. muotoilun "around the Mediterranean and the Balkans in 1873" (Input blocked: sensitive words).
    prompt: 'A slow journey along sunny southern European sea coasts and islands in the 1870s: a classical guitar and '
      + 'a mandolin play unhurriedly over soft strings, a light hand percussion touch now and then and a clarinet line that '
      + 'quietly hints at the grandfather\'s theme (D–G–F–E–D–C–D) once, woven in, never stated loudly. Sunlit '
      + 'stone, sea wind, afternoon. About 72 BPM, even dynamics. It plays UNDER the ambient soundscape of the city '
      + 'and must never pull attention from it. Seamless loop: begin and end on the same quiet sustained chord so the '
      + 'track can repeat without a seam. '
      + `${TYYLI}`,
  },
  'maanosa-lansi-eurooppa': {
    laji: 'suunnitelma',
    vaihe: 2,
    tiedosto: 'musa-maanosa-lansi-eurooppa.mp3',
    kesto: 70000,
    looppi: true,
    kuvaus: 'Maanosaraita Pohjois- ja Länsi-Eurooppa (vaihe 2, looppi)',
    prompt: 'Travelling through Northern and Western Europe in 1873: a soft 1870s piano and a singing cello over '
      + 'quiet strings, a harmonium holding the harmony and a flute that quietly hints at the grandfather\'s theme '
      + '(D–G–F–E–D–C–D) once, woven in, never stated loudly. Rain on windows, gas lamps, railway stations, a library. '
      + 'About 68 BPM, even dynamics. It plays UNDER the ambient soundscape of the city and must never pull attention '
      + 'from it. Seamless loop: begin and end on the same quiet sustained chord so the track can repeat without a '
      + 'seam. '
      + `${TYYLI}`,
  },
  // Vaihe 3 (§5 kohta 3): loput maanosaraidat. Sama muotti kuin vaiheen 2 maanosilla; Lyrian suodatin hylkäsi 26.9.
  // muotoilut "Middle Eastern", "the Balkans" → paikat kuvataan maisemana ja soittimina, ei kansoina eikä uskontoina.
  ...Object.fromEntries([
    ['ita-eurooppa', 'Travelling across the wide plains of Eastern Europe and Russia in the 1870s',
      'a balalaika tremolo and a warm cello over soft strings, a gentle cimbalom shimmer now and then and a clarinet line',
      'Snow light on birch forests, a sleigh road, a samovar by the window', 70],
    ['lahi-ita', 'A slow journey along warm desert coasts and old harbour towns of the Levant and North Africa in the 1870s',
      'an oud and a ney flute in a modal colour over soft strings, a quiet frame drum touch now and then and a qanun ripple',
      'Dusk over flat roofs, a caravan road, palm shade by a harbour', 72],
    ['saharan-etelapuoli', 'Travelling through the savanna and river lands south of the Sahara in the 1870s',
      'a kora and a balafon over soft strings, gentle hand drums now and then and a wooden flute line',
      'Wide open savanna light, a slow river, evening birds', 76],
    ['etela-aasia', 'A slow journey through the river towns and hill country of South Asia in the 1870s',
      'a bansuri flute over a very quiet sitar drone and soft strings, a light tabla touch now and then and a harmonium',
      'Humid evening air, a river ghat at dusk, tea gardens on the hills', 70],
    ['ita-aasia', 'Travelling through the harbour cities and misty mountains of East Asia in the 1870s',
      'a guzheng or koto and an erhu over soft strings, a breathy shakuhachi answer now and then and a quiet piano',
      'Early morning mist, a lantern-lit harbour, a garden with stone paths', 66],
    ['pohjois-amerikka', 'Travelling across North America in the 1870s by riverboat and railway',
      'a fiddle and an 1870s banjo over soft strings, a harmonica answer now and then and a parlour piano',
      'A wide river town, a railway station on the prairie, a painted steamboat', 80],
    ['etela-amerikka', 'A slow journey through the harbour cities and high mountains of South America in the 1870s',
      'a charango and a guitar over soft strings, a quena flute answer now and then and a light hand percussion touch',
      'High mountain air, a colonial plaza at siesta, a harbour on the Pacific', 76],
    ['oseania', 'Travelling around the islands and far harbours of Oceania in the 1870s',
      'a classical guitar and a warm ukulele-like strum over soft strings, a gentle slide guitar line now and then and a quiet flute',
      'A harbour at the far side of the world, trade winds, a long white beach', 70],
  ].map(([id, matka, soittimet, kuva, bpm]) => [`maanosa-${id}`, {
    laji: 'suunnitelma',
    vaihe: 3,
    tiedosto: `musa-maanosa-${id}.mp3`,
    kesto: 70000,
    looppi: true,
    kuvaus: `Maanosaraita ${id} (vaihe 3, looppi)`,
    prompt: `${matka}: ${soittimet} that quietly hints at the grandfather's theme (D–G–F–E–D–C–D) once, woven in, `
      + `never stated loudly. ${kuva}. About ${bpm} BPM, even dynamics. It plays UNDER the ambient soundscape of the `
      + 'city and must never pull attention from it. Instruments and mode only, no recognisable folk tune. Seamless loop: '
      + 'begin and end on the same quiet sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  }])),
  // Vaihe 3: tunnuskaupungit (suunnitelma 2.2, "johtoaihe paikallisella soittimella", matkan pääkaupungit). Tiedosto on
  // kaupunkiraidan nimisäännöllä (js/kaupunkimusiikki.js kaupunkiraidanTunnus), jotta hyväksytty raita kytketään
  // KAUPUNKIRAIDAT-riviksi; laji on suunnitelma, kunnes omistaja on kuunnellut (vartija: tests/kaupunkimusiikki.test.mjs).
  ...Object.fromEntries([
    ['pariisi', 'Paris in the 1870s: boulevards, cafés and gas lamps after rain',
      'a salon piano and a violin carry the theme, soft strings and a musette accordion colour underneath', 84],
    ['lontoo', 'London in the 1870s: fog on the river, cab horses, a busy railway terminus',
      'a cello and a clarinet carry the theme over soft strings, a church-bell-like celesta touch now and then', 76],
    ['rooma', 'Rome in the 1870s: warm stone, fountains in a piazza, late afternoon light',
      'a mandolin and a guitar carry the theme, a warm oboe answers over soft strings', 80],
    // Lyria hylkäsi 26.9. muotoilun "Istanbul in the 1870s … seagulls over domes" (Input blocked: sensitive words).
    ['istanbul', 'A great harbour city on a strait between two continents in the 1870s: ferries crossing, a covered market, seagulls',
      'a kanun and a ney flute carry the theme in a modal colour, a soft oud and strings underneath', 72],
    ['kairo', 'A great river city at the edge of the desert in the 1870s: the Nile at dusk, sailing boats, a lively market street',
      'an oud and a ney flute carry the theme over soft strings, a quiet riq tambourine touch now and then', 74],
    ['pietari', 'Saint Petersburg in the 1870s: wide frozen canals, palace façades, white-night light',
      'a balalaika tremolo and a solo piano carry the theme, a warm cello and strings underneath', 68],
  ].map(([id, kuva, soittimet, bpm]) => [`kaupunki-${id}`, {
    laji: 'suunnitelma',
    vaihe: 3,
    tiedosto: `musa-kaupunki-${id}.mp3`,
    kesto: 75000,
    looppi: true,
    kuvaus: `Tunnuskaupunki ${id} (vaihe 3, looppi)`,
    prompt: `${kuva}. The grandfather's theme (D–G–F–E–D–C–D) played gently by local instruments: ${soittimet}. `
      + `About ${bpm} BPM, even dynamics. It plays UNDER the ambient soundscape of the city and must never pull `
      + 'attention from it. Instruments and mode only, no recognisable folk tune, no singing. Seamless loop: begin and end '
      + 'on the same quiet sustained chord so the track can repeat without a seam. '
      + `${TYYLI}`,
  }])),
};

/** Onko raita kaupungin oma kappale vai paletin raita? */
const onKaupunki = (raita) => raita?.laji === 'kaupunki';

/** Onko raita alueen raita (kaupungin oman kappaleen varamies)? */
const onAlue = (raita) => raita?.laji === 'alue';

/** Onko raita näkymän tai virtuaalipaikan oma raita? */
const onTila = (raita) => raita?.laji === 'tila';

/** Onko raita musiikkisuunnitelman erän raita (vaihe 1 …)? */
const onSuunnitelma = (raita) => raita?.laji === 'suunnitelma';

/** Paletin neljä raitaa — `kaikki` tarkoittaa näitä. */
export const PALETIN_RAIDAT = Object.keys(RAIDAT).filter((id) => !RAIDAT[id].laji);

/** Kaupunkien omat kappaleet. */
export const KAUPUNKIEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onKaupunki(RAIDAT[id]));

/** Alueraidat — `alueet` tarkoittaa näitä. */
export const ALUEIDEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onAlue(RAIDAT[id]));

/** Tilaraidat (lehti, matkalaukku, etusivu) — `tilat` tarkoittaa näitä. */
export const TILOJEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onTila(RAIDAT[id]));

/** Musiikkisuunnitelman vaihe n (`vaihe1`, `vaihe2` …): erä, jonka omistaja kuuntelee kerralla. */
const vaiheenRaidat = (n) => Object.keys(RAIDAT).filter((id) => onSuunnitelma(RAIDAT[id]) && RAIDAT[id].vaihe === n);
export const VAIHE1_RAIDAT = vaiheenRaidat(1);
export const VAIHE2_RAIDAT = vaiheenRaidat(2);
export const VAIHE3_RAIDAT = vaiheenRaidat(3);

/**
 * Raitalista argumenteista.
 *
 * `kaikki` on PALETTI eikä koko taulukko: kaupunkiraidat ovat oma
 * ryhmänsä (`kaupungit`), jottei valmista kaupunkiraitaa generoida
 * vahingossa uudestaan paletin mukana. Sama sääntö kuin
 * siirtymätyökalussa, jossa `kaikki` ei sisällä linssiraitaa.
 */
export const RYHMAT = {
  kaikki: () => [...PALETIN_RAIDAT],
  // `kaupungit` on kaupunkien omat kappaleet JA alueraidat: molemmat
  // soivat samassa paikassa sekoituksessa, ja pelin kannalta ne ovat
  // sama asia (pohjavireen sijainen).
  kaupungit: () => [...KAUPUNKIEN_RAIDAT, ...ALUEIDEN_RAIDAT],
  alueet: () => [...ALUEIDEN_RAIDAT],
  tilat: () => [...TILOJEN_RAIDAT],
  vaihe1: () => [...VAIHE1_RAIDAT],
  vaihe2: () => [...VAIHE2_RAIDAT],
  vaihe3: () => [...VAIHE3_RAIDAT],
};

export function valitseRaidat(argumentit) {
  if (!argumentit.length) return null;
  if (argumentit.length === 1 && Object.hasOwn(RYHMAT, argumentit[0])) {
    return RYHMAT[argumentit[0]]();
  }
  return argumentit;
}

/**
 * Komentoriviliput. Raitojen nimet ovat paljaita argumentteja, koska
 * niin niitä on aina annettu (`… kaikki`, `… pohja visa`); liput ovat
 * `--`-alkuisia, kuten siirtymätyökalussa.
 *
 * `moottori` on OLETUKSENA lyria (omistaja 5.9.2026: "kaikki musiikki
 * lyrialla"). `kuiva` luetaan tässä vain lipusta; ympäristömuuttuja
 * ELEVEN_KUIVA=1 tekee saman, ja se yhdistetään vasta pääohjelmassa,
 * jotta tämä funktio pysyy puhtaana ja testattavana.
 */
export function tulkitseArgumentit(argumentit) {
  const liput = { raidat: [], moottori: 'lyria', kuiva: false, vienti: true };
  for (let i = 0; i < argumentit.length; i += 1) {
    const arg = argumentit[i];
    if (arg === '--moottori') {
      liput.moottori = argumentit[i + 1] ?? null;
      i += 1;
      if (!MOOTTORIT.includes(liput.moottori)) {
        return { ...liput, virhe: `--moottori: ${MOOTTORIT.join('|')}` };
      }
    } else if (arg === '--kuiva') {
      liput.kuiva = true;
    } else if (arg === '--ei-vientia') {
      // VAIN kuivaan ajoon: maksullinen generointi kieltäytyy tästä
      // (raakavientiEste), koska alkuperäinen katoaisi ajon mukana.
      liput.vienti = false;
    } else if (arg.startsWith('--')) {
      return { ...liput, virhe: `tuntematon argumentti: ${arg}` };
    } else {
      liput.raidat.push(arg);
    }
  }
  return liput;
}

/** Yksi maksullinen kutsu ElevenLabsille (vertailumoottori). */
async function haeElevenLabsista(raita, avain, kohde) {
  const vastaus = await fetch(OSOITE, {
    method: 'POST',
    headers: { 'xi-api-key': avain, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: raita.prompt,
      music_length_ms: raita.kesto,
      model_id: MALLI,
      output_format: MUOTO,
      // Paletti on soitinmusiikkia: laulu veisi huomion pelin omalta
      // kertojalta ja kaupunkien äänimaisemalta.
      force_instrumental: true,
    }),
    signal: AbortSignal.timeout(300000),
  });
  if (!vastaus.ok) {
    /*
     * Virherunko näkyviin (ilman avainta) — juuri tästä selviää myös se
     * ainoa tapaus, jota ei voi tietää etukäteen: onko musiikkirajapinta
     * lainkaan auki tällä avaimella. 401/403 kertoo ettei ole, ja
     * silloin paletin generointi jää odottamaan käyttöoikeutta —
     * pelikytkennät ovat jo paikallaan ja hiljenevät siististi.
     */
    throw new Error(`HTTP ${vastaus.status}: ${(await vastaus.text()).slice(0, 400)}`);
  }
  const data = Buffer.from(await vastaus.arrayBuffer());
  // assets/audio ei ole enää repossa (omistajan linjaus 11.9.2026:
  // äänet vain ämpärissä), joten kansio voi puuttua tyhjästä
  // checkoutista — luodaan se ennen kirjoitusta.
  mkdirSync(dirname(kohde), { recursive: true });
  writeFileSync(kohde, data);
  return data.length;
}

async function main() {
  const liput = tulkitseArgumentit(process.argv.slice(2));
  if (liput.virhe) {
    console.error(`${liput.virhe}.`);
    console.error('Käyttö: node tools/generoi-musiikki.mjs '
      + `${Object.keys(RAIDAT).join('|')}|${Object.keys(RYHMAT).join('|')} `
      + `[--moottori ${MOOTTORIT.join('|')}] [--kuiva]`);
    process.exit(1);
  }
  const pyydetyt = valitseRaidat(liput.raidat);
  if (!pyydetyt) {
    console.error('Anna raidat: node tools/generoi-musiikki.mjs pohja visa aarre paaaarre');
    console.error(`Koko paletti: node tools/generoi-musiikki.mjs kaikki (${PALETIN_RAIDAT.join(', ')})`);
    console.error('Kaupunkiraidat: node tools/generoi-musiikki.mjs kaupungit '
      + `(${[...KAUPUNKIEN_RAIDAT, ...ALUEIDEN_RAIDAT].join(', ')})`);
    console.error(`Tilaraidat: node tools/generoi-musiikki.mjs tilat (${TILOJEN_RAIDAT.join(', ')})`);
    process.exit(1);
  }

  /*
   * KUIVA AJO: tulostaa mitä generoitaisiin eikä kutsu APIa. Sama
   * tarkoitus kuin luennoissa: raidan avain, kohdetiedosto, kesto ja
   * prompti näkee vain ajamalla, ja väärä avain huomattaisiin muuten
   * vasta siitä, ettei tiedostoa synny. Avainta ei tarvita.
   *
   * ELEVEN_KUIVA=1 kelpaa yhä: työnkulku on käyttänyt sitä siitä asti
   * kun moottoreita oli yksi.
   */
  const kuiva = liput.kuiva || process.env.ELEVEN_KUIVA === '1';

  /*
   * RAAKAVIENTI ON PAKOLLINEN (omistajan sääntö 14.9.2026, Raamattu:
   * ALKUPERÄISET ÄÄNITIEDOSTOT SÄILYTETÄÄN AINA). Tarkistus ennen
   * ensimmäistäkään maksullista kutsua.
   *
   * Tässä putkessa looppi pyydetään mallilta eikä ommella jälkikäteen,
   * joten raaka ja valmis ovat sama tavujono. Raaka saa silti oman
   * eräkohtaisen avaimensa: se on se, mistä on maksettu, ja tiedostot
   * kirjoitetaan assets/audio-kansioon, joka katoaa Actions-ajon
   * mukana heti kun työnkulku on vienyt ne.
   */
  vaadiRaakavienti({ kuiva, vienti: liput.vienti });

  const avain = moottorinAvain(liput.moottori);
  if (!avain && !kuiva) {
    console.error(`${avaimenNimi(liput.moottori)} puuttuu ympäristöstä — musiikkia ei voi generoida.`);
    console.error('Kuivan testiajon saa ilman avainta: node tools/generoi-musiikki.mjs kaikki --kuiva');
    process.exit(1);
  }

  if (kuiva) console.log('KUIVA AJO — APIa ei kutsuta, tiedostoja ei kirjoiteta.');
  console.log(liput.moottori === 'lyria'
    ? `Moottori: Lyria 3.5 (${LYRIA_MALLI}), raidat päätteellä -lyria — pelin moottori.`
    : `Moottori: ElevenLabs Music (${MALLI}, ${MUOTO}), paljaat nimet — vertailu, ei soi pelissä.`);

  const AMPARIN_JUURI = 'audio';
  const sourceCommit = lahdeCommit();
  const era = eratunnus('musiikki', {
    sourceCommit, raidat: pyydetyt, moottori: liput.moottori,
    malli: liput.moottori === 'lyria' ? LYRIA_MALLI : MALLI,
    muoto: liput.moottori === 'lyria' ? 'lyria' : MUOTO,
  });
  const raakaKansioAmpari = raakaAmpariKansio(AMPARIN_JUURI, era);
  const kuittirivit = [];
  if (!kuiva) {
    console.log(`Erä ${era}; raakatuotokset avaimeen ${raakaKansioAmpari}/`);
  }

  let virheita = 0;
  for (const nimi of pyydetyt) {
    const raita = RAIDAT[nimi];
    if (!raita) {
      console.error(`${nimi}: tuntematon raita — tunnetut: ${Object.keys(RAIDAT).join(', ')}.`);
      virheita += 1;
      continue;
    }
    const polku = `assets/audio/${raidanTiedosto(raita, liput.moottori)}`;
    if (kuiva) {
      console.log(`${nimi}: ${polku} — ${(raita.kesto / 1000).toFixed(0)} s`
        + `${raita.looppi ? ', saumaton looppi' : ''} (${raita.kuvaus})`);
      console.log(`  prompti: ${raita.prompt}`);
      continue;
    }
    console.log(`${nimi}: generoidaan ${polku} (${(raita.kesto / 1000).toFixed(0)} s)…`);
    const kohde = resolve(JUURI, polku);
    // eslint-disable-next-line no-await-in-loop
    const tavut = liput.moottori === 'lyria'
      ? await haeLyriasta(
        { prompt: raita.prompt, kestoMs: raita.kesto, looppi: raita.looppi }, avain, kohde,
      )
      : await haeElevenLabsista(raita, avain, kohde);
    console.log(`${nimi}: ${(tavut / 1024).toFixed(0)} kt → ${kohde}`);

    // RAAKA ÄMPÄRIIN heti generoinnin jälkeen, ennen mitään muuta.
    const tiedostonimi = polku.split('/').at(-1);
    const data = readFileSync(kohde);
    const raaka = vieRaaka(data, {
      nimi: `raaka-${tiedostonimi}`, kansio: raakaKansioAmpari,
    });
    console.log(`${nimi}: raaka talteen → ${raaka.url}`);
    kuittirivit.push({
      fileName: tiedostonimi,
      outputPath: polku,
      rawArtifact: raaka,
      finalArtifact: { fileName: tiedostonimi, sha256: raakaSha256(data), bytes: data.length },
    });
  }

  if (!kuiva && kuittirivit.length) {
    const kuitti = vieKuitti(kokoaRaakakuitti({
      putki: 'musiikki',
      batchId: era,
      sourceCommit,
      resepti: {
        raidat: pyydetyt, moottori: liput.moottori,
        malli: liput.moottori === 'lyria' ? LYRIA_MALLI : MALLI,
      },
      rivit: kuittirivit,
      status: virheita ? 'completed-with-errors' : 'completed',
    }), AMPARIN_JUURI);
    console.log(`Kuitti: ${kuitti.objectKey}`);
  }

  if (kuiva) {
    console.log(virheita
      ? `Kuiva ajo valmis — ${virheita} tuntematonta raitaa.`
      : 'Kuiva ajo valmis — kaikille pyydetyille raidoille löytyi prompti ja kohdetiedosto.');
    process.exit(virheita ? 1 : 0);
  }
  if (virheita) process.exit(1);
  console.log('Valmis. Tiedostot ovat paikallisessa assets/audio-kansiossa (ei repoon) —');
  console.log('KUUNTELE ne ennen julkaisua: looppiraidoilta sauma, aarreraidoilta se');
  console.log('että aihe on kuultavasti sama. Actions-ajo vie ne ämpäriin.');
  if (liput.moottori === 'lyria') {
    console.log('Kun raidat ovat ämpärissä (audio/musa-*-lyria.mp3),');
    console.log("käännä js/media.js MUSIIKIN_PAATE = '-lyria'.");
  }
}

if (process.argv[1] === TAMA) await main();
