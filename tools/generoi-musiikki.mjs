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
 * VIENTI: REPON KAUTTA, EI SUORAAN ÄMPÄRIIN
 * ------------------------------------------------------------------
 *
 * Paletin raita kirjoitetaan `assets/audio/`-kansioon. Sieltä
 * .github/workflows/vie-aanet.yml vie sen ämpärin `audio/`-kansioon —
 * ja juuri sitä polkua peli hakee (js/media.js `aaniUrl`:
 * assets/audio/x.mp3 → <ämpäri>/audio/x.mp3). Siirtymäraidat menevät
 * ämpärin `aanet/`-kansioon, koska peli kokeilee niille ensin sitä
 * polkua; paletille aanet/ olisi umpikuja, koska yksikään paletin
 * soittokohta ei kysy sitä.
 *
 * Ero on siis pelin polussa eikä maun asia. Sivutuotteena paletti
 * KUUNNELLAAN ennen julkaisua: työnkulku jättää mp3:t omalle
 * haaralleen PR:ää varten.
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
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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
};

/** Onko raita kaupungin oma kappale vai paletin raita? */
const onKaupunki = (raita) => raita?.laji === 'kaupunki';

/** Onko raita alueen raita (kaupungin oman kappaleen varamies)? */
const onAlue = (raita) => raita?.laji === 'alue';

/** Onko raita näkymän tai virtuaalipaikan oma raita? */
const onTila = (raita) => raita?.laji === 'tila';

/** Paletin neljä raitaa — `kaikki` tarkoittaa näitä. */
export const PALETIN_RAIDAT = Object.keys(RAIDAT).filter((id) => !RAIDAT[id].laji);

/** Kaupunkien omat kappaleet. */
export const KAUPUNKIEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onKaupunki(RAIDAT[id]));

/** Alueraidat — `alueet` tarkoittaa näitä. */
export const ALUEIDEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onAlue(RAIDAT[id]));

/** Tilaraidat (lehti, matkalaukku, etusivu) — `tilat` tarkoittaa näitä. */
export const TILOJEN_RAIDAT = Object.keys(RAIDAT).filter((id) => onTila(RAIDAT[id]));

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
  const liput = { raidat: [], moottori: 'lyria', kuiva: false };
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
  }

  if (kuiva) {
    console.log(virheita
      ? `Kuiva ajo valmis — ${virheita} tuntematonta raitaa.`
      : 'Kuiva ajo valmis — kaikille pyydetyille raidoille löytyi prompti ja kohdetiedosto.');
    process.exit(virheita ? 1 : 0);
  }
  if (virheita) process.exit(1);
  console.log('Valmis. Muista: tiedostot repoon ja KUUNTELE ne ennen julkaisua —');
  console.log('looppiraidoilta sauma, aarreraidoilta se että aihe on kuultavasti sama.');
  if (liput.moottori === 'lyria') {
    console.log('Kun raidat ovat ämpärissä (vie-aanet.yml → audio/musa-*-lyria.mp3),');
    console.log("käännä js/media.js MUSIIKIN_PAATE = '-lyria'.");
  }
}

if (process.argv[1] === TAMA) await main();
