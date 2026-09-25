/*
 * Hakee ääniehdokkaita Freesoundista.
 *
 *   FREESOUND_API=… node tools/hae-freesound.mjs --kori meri --maara 12
 *   FREESOUND_API=… node tools/hae-freesound.mjs --haku "bazaar market" --ulos ehdokkaat.json
 *
 * MIKSI TÄMÄ AJETAAN GITHUB ACTIONSISSA EIKÄ TÄÄLLÄ:
 *
 * Freesoundin avain on repon salaisuuksissa, eikä GitHub näytä
 * salaisuuden arvoa kenellekään sen tallentamisen jälkeen — ei
 * käyttöliittymässä eikä rajapinnassa. Arvo on luettavissa vain
 * työnkulun ajon sisällä, ympäristömuuttujana.
 *
 * Se on tarkoituksellista ja hyvä niin: omistajan sääntö on, ettei
 * avaimia liitetä keskusteluun, koska ne päätyisivät lokeihin.
 * Työkalu on siis kirjoitettu niin, että avain ei koskaan poistu
 * ajoympäristöstä — tulokseen kirjoitetaan vain julkisia osoitteita,
 * lisenssejä ja tekijöiden nimiä.
 *
 * Sama malli kuin tools/hae-kaupunkikuvat.mjs + kuvahaku.yml.
 *
 * LISENSSIRAJAUS. Mukaan otetaan vain CC0 ja CC BY. Freesoundissa on
 * paljon myös CC BY-NC -aineistoa, jota ei voi käyttää, ja
 * "Sampling+"-lisenssiä, jonka ehdot ovat monimutkaiset. Rajaus
 * tehdään palvelimen puolella filter-parametrilla eikä jälkikäteen:
 * jälkikäteen suodattava haku palauttaisi kymmenen osumaa, joista
 * kaksi kelpaa, ja näyttäisi siltä että aineistoa ei ole.
 *
 * ------------------------------------------------------------------
 * KAKSI AJOTAPAA
 * ------------------------------------------------------------------
 *
 * 1. EHDOKASHAKU (--kori / --haku). Vanha käyttö: tulostaa listan
 *    ehdokkaita kuunneltavaksi eikä tee muuta. Ääni valitaan
 *    kuuntelemalla, äänistudion kautta.
 *
 * 2. TEHOSTELISTAN AJO (--lista). Omistajan tilaus 6.9.2026:
 *    *"Pululle ja muuallekin tarvitaan ääniefektejä … Näitä ei
 *    generoida."* Tässä tavassa kuuntelupäätöstä ei ole: lista
 *    (tools/tehosteet/pulu-tehosteet.json) kertoo tunnukset,
 *    hakusanat, kestorajat ja lisenssit, ja ajo valitsee jokaiselle
 *    yhden osuman mitattavista luvuista (arvosana, lataukset, kesto —
 *    tools/tehostelista.mjs pisteytaOsuma), lataa esikatselu-mp3:n,
 *    normalisoi sen ffmpegillä ja vie ämpäriin manifestin kanssa.
 *
 *    Kuuntelu tehdään ajon JÄLKEEN. Lopputulos on kaksitoista tiedostoa
 *    ja manifesti, joka kertoo mistä kukin tuli — huono osuma
 *    vaihdetaan ajamalla yksi tunnus uudestaan (--tunnus).
 *
 * MIKSI SAMASSA TIEDOSTOSSA. Avain, sen etsintä, uudelleenyritykset ja
 * lisenssirajaus ovat samat molemmissa tavoissa. Toinen työkalu
 * tarkoittaisi toista kopiota niistä — ja kaksi paikkaa, joissa
 * lisenssirajaus voi rapistua eri tahtiin.
 */
import { spawnSync } from 'node:child_process';
import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { leikkaaHiljaisuusSuodatin, viimeistelySuodatin } from './generoi-tehosteet.mjs';
import { julkinenJuuri, tulkitseLoudnorm } from './generoi-siirtymamusiikki.mjs';
import {
  AANILAHTEET, AVAIMETTOMAT_LAHTEET, ehdokkaanPaate, haeEhdokkaat, jarjestaEhdokkaat,
  KAIKKI_LAHTEET, noudaEhdokas, tehosteenLahteet,
} from './aanilahteet.mjs';
import {
  hakusuodatin, listanKansiot, lueTehostelista, MAISEMALISTA, manifestirivi,
  PULULISTA,
} from './tehostelista.mjs';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Noden fetch ei lue HTTPS_PROXYa; ks. tools/hae-radiot.mjs.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

/*
 * Avain luetaan useasta nimestä.
 *
 * Salaisuuden nimeä ei voi tarkistaa täältä käsin, ja väärä arvaus
 * näyttäisi täsmälleen samalta kuin puuttuva avain — työkalu kaatuisi
 * sanoen "avainta ei ole", vaikka se olisi repossa toisella nimellä.
 * Siksi kokeillaan kaikkia tavallisia kirjoitusasuja ja kerrotaan
 * lopuksi, mitä etsittiin.
 */
const AVAIN_NIMET = ['FREESOUND_API', 'FREESOUND_API_KEY', 'FREESOUND_AVAIN', 'FREESOUND_TOKEN', 'FREESOUND'];
const avainNimi = AVAIN_NIMET.find((n) => (process.env[n] ?? '').trim());
const AVAIN = avainNimi ? process.env[avainNimi].trim() : '';

if (!AVAIN) {
  /*
   * AVAIMETON AJO EI ENÄÄ KAADU (omistajan päätös 11.9.2026: *"Lisää
   * ilmaisia lähteitä rinnalle"*). Wikimedia Commons ja Kenneyn
   * CC0-paketit toimivat ilman mitään avainta, joten puuttuva
   * Freesound-avain pudottaa yhden lähteen — se ei ole syy jättää
   * kahta muuta hakematta. Ajo kertoo sen selvästi, koska hiljaa
   * kutistunut hakujoukko olisi juuri se vika, jota ei huomaa.
   */
  console.error('Freesoundin avainta ei löytynyt ympäristöstä — Freesound jää pois.');
  console.error(`Etsittiin nimillä: ${AVAIN_NIMET.join(', ')}`);
  console.error(`Käytettävissä ilman avainta: ${AVAIMETTOMAT_LAHTEET.join(', ')}.`);
  console.error('');
  console.error('Avain asetetaan repon salaisuuksiin (Settings > Secrets and');
  console.error('variables > Actions) ja välitetään työnkulussa env-lohkossa.');
  console.error('Älä koskaan aja tätä niin, että avain näkyy komentorivillä —');
  console.error('komentorivit päätyvät lokeihin.');
  console.error('');
}

// --- valitsimet ----------------------------------------------------------------

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : oletus;
};

/*
 * Valmiit korit vastaavat pelin omia arvontakoreja (js/aani-ehdokkaat.js).
 * Hakusanat ovat englanniksi, koska Freesoundin aineisto on merkitty
 * englanniksi — suomenkielinen haku löytää muutaman kymmenen tiedostoa
 * koko palvelusta.
 */
const KORIT = {
  meri: 'ocean waves shore surf ambience',
  basaari: 'bazaar market street crowd ambience',
  aavikko: 'desert wind sand ambience',
  sademetsa: 'rainforest jungle birds ambience',
  savanni: 'savanna grassland wind insects',
  ylanko: 'mountain highland wind ambience',
  kaupunki: 'city street traffic distant ambience',
  satama: 'harbour port ships dock ambience',
  juna: 'steam train railway station',
  tori: 'market stall vendors chatter',
  sade: 'rain on roof ambience',
  yo: 'night crickets quiet ambience',
};

const lippu = (nimi) => argv.includes(`--${nimi}`);

const kori = valitsin('kori');
const haku = valitsin('haku') ?? (kori ? KORIT[kori] : null);
const maara = Number(valitsin('maara', '12'));
const ulos = valitsin('ulos');
const minKesto = Number(valitsin('min-kesto', '20'));
const maxKesto = Number(valitsin('max-kesto', '600'));

/*
 * LÄHTEET (omistajan päätös 11.9.2026: *"Lisää ilmaisia lähteitä
 * rinnalle"*). Oletus on kaikki, joihin on pääsy: ilman
 * Freesound-avainta jäljelle jäävät Commons ja Kenney. `--lahteet`
 * ottaa pilkkulistan, ja tuntematon nimi kaataa ajon heti eikä
 * kutistu hiljaa pois hakujoukosta.
 */
const kaytettavissa = KAIKKI_LAHTEET.filter((l) => !AANILAHTEET[l].avain || AVAIN);
const pyydetytLahteet = (valitsin('lahteet') ?? '').split(',').map((x) => x.trim()).filter(Boolean);
for (const l of pyydetytLahteet) {
  if (!KAIKKI_LAHTEET.includes(l)) {
    console.error(`Tuntematon lähde "${l}". Tunnetut: ${KAIKKI_LAHTEET.join(', ')}.`);
    process.exit(1);
  }
}
const SALLITUT = pyydetytLahteet.length
  ? pyydetytLahteet.filter((l) => kaytettavissa.includes(l))
  : kaytettavissa;
if (!SALLITUT.length) {
  console.error('Yhtään lähdettä ei ole käytettävissä — Freesound vaatii avaimen.');
  process.exit(1);
}

/*
 * Listan ajon vakiot ovat TÄSSÄ eivätkä tiedoston lopussa oman
 * osionsa kanssa, koska haara alla kutsuu ajoa heti: moduulitason
 * `const` ei ole vielä olemassa, jos se on kutsun alapuolella.
 * Funktiot saavat asua lopussa — ne nostetaan.
 *
 * LEVYKANSIOT JOHDETAAN LISTASTA (tools/tehostelista.mjs
 * listanKansiot): pulun tehosteet saavat entiset polkunsa
 * media/tehosteet-pulu ja -raaka, äänimaisemat omansa. Kaksi
 * kovakoodattua vakioparia olisi eriytynyt ensimmäisellä muutoksella.
 */
/** Häivytykset päihin: naksahdukseton alku ja loppu (listan oletus). */
const PULU_HAIVYTYS_S = 0.02;

/*
 * TEHOSTELISTAN AJO. Oma haaransa, joka poistuu ennen ehdokashakua:
 * lista tuo omat hakusanansa ja omat kestorajansa, eikä yhtäkään
 * yllä olevaa oletusta (20–600 s taustaääni) käytetä sen kanssa.
 *
 * KAKSI LISTAA, YKSI KONEISTO: `--pulu` on Livian ääniefektit ja
 * `--maisemat` Ihmisen matka -linssin äänimaisemat. Erot (kesto, taso,
 * hiljaisuuden leikkaus, häivytys, poissuljetut tagit) asuvat listassa
 * eivätkä tässä.
 */
if (lippu('lista') || lippu('pulu') || lippu('maisemat')) {
  let listapolku = valitsin('lista') ?? PULULISTA;
  if (lippu('pulu')) listapolku = PULULISTA;
  if (lippu('maisemat')) listapolku = MAISEMALISTA;
  const koodi = await ajaLista({
    listapolku,
    tunnus: valitsin('tunnus'),
    vienti: !lippu('ei-vientia') && !lippu('kuiva'),
    kuiva: lippu('kuiva'),
    ulos,
  });
  process.exit(koodi);
}

if (!haku) {
  console.error('käyttö: node tools/hae-freesound.mjs --kori <nimi> | --haku "<sanat>"');
  console.error('        [--lahteet freesound,commons,kenney] [--salli-musiikki]');
  console.error('        node tools/hae-freesound.mjs --pulu [--tunnus <tunnus>] [--kuiva]');
  console.error('        node tools/hae-freesound.mjs --maisemat [--tunnus <tunnus>] [--kuiva]');
  console.error(`korit: ${Object.keys(KORIT).join(', ')}`);
  process.exit(1);
}

// --- ehdokashaku (kaikista sallituista lähteistä) ------------------------------

/*
 * EHDOKASTILA HAKEE KAIKISTA SALLITUISTA LÄHTEISTÄ (omistajan päätös
 * 11.9.2026). Tämä on se tila, jossa IHMINEN valitsee kuuntelemalla —
 * ja juuri siksi sen on tarjottava koko valikoima eikä yhden palvelun
 * osuutta siitä. Lisenssirajaus ja pisteytys ovat samat kuin listan
 * ajossa (tools/aanilahteet.mjs), joten ehdokas, jota ei voi käyttää,
 * ei päädy kuunneltavaksi lainkaan.
 */
const ehdokasTehoste = {
  tunnus: 'ehdokkaat',
  kuvaus: haku,
  hakusanat: [haku],
  kestoMin: minKesto,
  kestoMax: maxKesto,
  /*
   * MUSIIKKI POIS OLETUKSENA. Korit ovat äänimaisemia, ja Commonsin
   * ääniaineistosta iso osa on vapaasti lisensoitua MUSIIKKIA: haku
   * "ocean waves shore surf" palauttaa sieltä ensimmäisenä viisi
   * surf rock -kappaletta. Kuunneltavaksi tarjottu kappale on
   * hukkaan mennyt ehdokaspaikka. `--salli-musiikki` ottaa rajauksen
   * pois, jos musiikkia nimenomaan haetaan.
   */
  poisTagit: lippu('salli-musiikki') ? [] : ['music', 'song', 'speech', 'voice', 'isrc'],
};

console.log(`Haku: ${haku}`);
console.log(`Lähteet: ${SALLITUT.map((l) => AANILAHTEET[l].nimi).join(', ')}`);
if (AVAIN) console.log(`Freesoundin avain löytyi muuttujasta ${avainNimi} (arvoa ei tulosteta).`);
console.log(`Rajaus: kaupalliseen käyttöön kelpaava lisenssi (CC0, PD tai CC BY), `
  + `kesto ${minKesto}–${maxKesto} s.\n`);

const loydetyt = await haeEhdokkaat(ehdokasTehoste, {
  lahteet: SALLITUT, avain: AVAIN, loki: (rivi) => console.error(rivi),
});
const parhaat = jarjestaEhdokkaat(loydetyt, ehdokasTehoste).slice(0, maara);

const ehdokkaat = parhaat.map(({ ehdokas, pisteet }) => ({
  lahde: ehdokas.lahde,
  url: ehdokas.latausUrl,
  nimi: `${ehdokas.nimi} — ${ehdokas.tekija}, ${ehdokas.lisenssi}`,
  kesto: Math.round(ehdokas.kesto ?? 0),
  arvio: ehdokas.arvioita >= 3 ? Number(ehdokas.arvio.toFixed(1)) : null,
  sivu: ehdokas.sivu,
  pisteet,
}));

console.log(`${loydetyt.length} osumaa, ${ehdokkaat.length} ehdokasta:\n`);
for (const e of ehdokkaat) {
  const arvio = e.arvio === null ? 'ei arvioita' : `${e.arvio}/5`;
  console.log(`  ${String(e.kesto).padStart(4)} s  ${arvio.padEnd(11)} `
    + `${e.lahde.padEnd(10)} ${e.nimi}`);
  console.log(`            ${e.url ?? e.sivu}`);
}

if (ulos) {
  writeFileSync(ulos, `${JSON.stringify({
    haku, kori, lahteet: SALLITUT, ehdokkaat,
  }, null, 2)}\n`);
  console.log(`\nKirjoitettu ${ulos}.`);
}

if (!ehdokkaat.length) {
  console.log('\nEi yhtään kelvollista ehdokasta. Kokeile toisia hakusanoja tai');
  console.log('väljennä kestorajoja --min-kesto ja --max-kesto.');
}

/* ================================================================== *
 * TEHOSTELISTAN AJO (--lista / --pulu)
 *
 * Ketju yhdelle tunnukselle:
 *   haku (n hakusanaa) → paras osuma pisteillä → esikatselu-mp3 levylle
 *   → hiljaisuus pois päistä → taso mitataan ja korjataan → häivytykset
 *   → ämpäriin aanet/tehosteet/pulu/<tunnus>.mp3 → rivi manifestiin.
 *
 * TASO −14 LUFS (listan `tavoiteLufs`). Se on selvästi kovempi kuin
 * generoitujen tehosteiden −30 LUFS, ja tarkoituksella: nämä ovat
 * lyhyitä iskuja eivätkä taustaa, ja lopullisen kuuluvuuden asettaa
 * peli (js/sound.js PULUN_TASO, −8 dB luentaan nähden). Tiedoston taso
 * on siis vertailukelpoinen lähtökohta, ei lopullinen voimakkuus.
 *
 * MITÄÄN EI JÄÄ REPOON. Tiedostot kirjoitetaan media/-puolelle
 * (.gitignoressa, tarkistetaan koneellisesti) ja viedään sieltä
 * ämpäriin — sama sopimus kuin tools/generoi-tehosteet.mjs:llä.
 * ================================================================== */

function ajaKomento(komento, argumentit, { salliVirhe = false } = {}) {
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

function komentoOlemassa(komento) {
  return spawnSync('which', [komento], { encoding: 'utf8' }).status === 0;
}

function aanenKesto(polku) {
  const { loki } = ajaKomento('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', polku,
  ]);
  const arvo = Number(loki.trim());
  if (!Number.isFinite(arvo) || arvo <= 0) throw new Error(`kestoa ei saatu: ${polku}`);
  return arvo;
}

/** Kaatuu, jos polku ei ole .gitignoressa — media ei mene repoon. */
function vaadiGitignore(polku) {
  const ajo = spawnSync('git', ['-C', JUURI, 'check-ignore', '-q', polku], { encoding: 'utf8' });
  if (ajo.status !== 0) {
    throw new Error(`${polku} EI ole .gitignoressa — valmis tehoste menisi repoon. `
      + 'Media kuuluu ämpäriin (Raamattu: "kaikki aina ämpäriin").');
  }
}

/*
 * HAKU JA LATAUS ASUVAT tools/aanilahteet.mjs:SSÄ.
 *
 * Ennen 11.9.2026 täällä oli oma Freesound-kutsu, omat
 * uudelleenyritykset ja oma esikatselulataus. Nyt lähteitä on kolme
 * (Freesound, Wikimedia Commons, Kenneyn CC0-paketit), ja jokainen
 * niistä palauttaa saman muotoisen ehdokkaan — jos haku asuisi täällä,
 * jokainen uusi lähde tarkoittaisi uutta haaraa myös latauksessa,
 * pisteytyksessä ja manifestirivissä.
 *
 * Se, mitä TÄMÄ tiedosto yhä tekee, on ketjun loppupää: valitun äänen
 * leikkaus, tason mittaus ja korjaus, vienti ämpäriin ja manifesti.
 */

/** Ehdokkaan tiedosto levylle; Kenneyllä se puretaan jo muistissa olevasta paketista. */
async function lataaEhdokas(ehdokas, kohde) {
  return noudaEhdokas(ehdokas, kohde, { kirjoita: writeFileSync });
}

/**
 * Hiljaisuus pois päistä, taso mitataan ja korjataan yhdellä
 * lineaarisella vahvistuksella, häivytykset päihin. Sama kaksivaiheinen
 * malli kuin generoi-tehosteet.mjs:llä: dynaaminen loudnorm muuttaisi
 * äänen sisäisiä suhteita, ja tömähdyksessä juuri isku ja sen laskeuma
 * ovat se, mikä tekee siitä tömähdyksen.
 *
 * HILJAISUUDEN LEIKKAUS ON LISTAN VALINTA. Iskulla se on oikein: mykkä
 * alku olisi viive napautuksen ja äänen välissä. TAUSTAMAISEMALLA SE ON
 * VÄÄRIN: tuulen hiljaisin kohta on osa tuulta, ja `silenceremove`
 * söisi juuri sen kohdan, joka tekee äänestä maiseman eikä efektin.
 * Samasta syystä maisemalla on pidempi häivytys (listan `haivytysS`):
 * soitin ristihäivyttää silmukan sauman itse, ja pitkä häivytys jää
 * ristihäivytyksen sisään kuulumattomiin.
 */
function normalisoi(lahde, kohde, tyokansio, { tavoiteLufs, haivytys, leikkaa }) {
  const wav = join(tyokansio, 'leikattu.wav');
  const muoto = 'aformat=sample_fmts=fltp:sample_rates=44100:channel_layouts=mono';
  ajaKomento('ffmpeg', [
    '-y', '-v', 'error', '-i', lahde,
    '-af', leikkaa ? `${muoto},${leikkaaHiljaisuusSuodatin()}` : muoto,
    '-c:a', 'pcm_s16le', wav,
  ]);
  const leikattu = aanenKesto(wav);

  const mittausLoki = ajaKomento('ffmpeg', [
    '-hide_banner', '-v', 'info', '-i', wav,
    '-af', `loudnorm=I=${tavoiteLufs}:TP=-1:LRA=11:print_format=json`,
    '-f', 'null', '-',
  ]).loki;
  let mitattu = tulkitseLoudnorm(mittausLoki);
  let korjaus;
  if (mitattu) {
    korjaus = tavoiteLufs - mitattu.taso;
  } else {
    /*
     * HYVIN LYHYT ISKU EI ANNA INTEGROITUA TASOA. EBU R128 porttaa
     * hiljaisuuden pois ja mittaa 400 ms lohkoissa; alle puolen
     * sekunnin kameran klik (11.9.2026, "Nice Camera click" 0,75 s →
     * leikattuna vähemmän) palautti input_i = -inf ja ajo kaatui.
     * Silloin taso asetetaan huipun mukaan: max_volume nostetaan
     * −1 dBFS:ään. Iskulla huippu on se, mikä kuuluu, joten tulos on
     * käytännössä sama kuin muilla iskuilla.
     */
    const huippuLoki = ajaKomento('ffmpeg', [
      '-hide_banner', '-v', 'info', '-i', wav, '-af', 'volumedetect', '-f', 'null', '-',
    ]).loki;
    const osuma = huippuLoki.match(/max_volume:\s*(-?[\d.]+) dB/);
    if (!osuma) {
      throw new Error(`loudnormin mittaus ei tuottanut lukua eikä huippua löytynyt:\n${mittausLoki.slice(-800)}`);
    }
    const huippu = Number(osuma[1]);
    korjaus = -1 - huippu;
    mitattu = { taso: null, huippu, kirjo: 0, huipunMukaan: true };
  }

  ajaKomento('ffmpeg', [
    '-y', '-v', 'error', '-i', wav,
    '-af', viimeistelySuodatin({
      kesto: leikattu, korjausDb: korjaus, haivytys,
    }),
    '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', kohde,
  ]);
  return {
    leikattu, mitattu, korjaus, valmis: aanenKesto(kohde),
  };
}

/** Vie tiedosto ämpäriin (sama aws s3 cp kuin muissakin ääniajoissa). */
function vieAmpariin(polku, avain, tyyppi) {
  const tili = process.env.R2_ACCOUNT_ID;
  const ampari = process.env.R2_BUCKET;
  const paasy = process.env.AWS_ACCESS_KEY_ID ?? process.env.R2_ACCESS_KEY_ID;
  const salaisuus = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  const puuttuu = [
    !tili && 'R2_ACCOUNT_ID', !ampari && 'R2_BUCKET',
    !paasy && 'R2_ACCESS_KEY_ID', !salaisuus && 'R2_SECRET_ACCESS_KEY',
  ].filter(Boolean);
  if (puuttuu.length) throw new Error(`vienti ei onnistu, puuttuu: ${puuttuu.join(', ')}`);
  if (!komentoOlemassa('aws')) throw new Error('aws-cli puuttuu — vienti tarvitsee sen.');
  ajaKomento('aws', [
    's3', 'cp', polku, `s3://${ampari}/${avain}`,
    '--endpoint-url', `https://${tili}.r2.cloudflarestorage.com`,
    '--no-progress',
    '--content-type', tyyppi,
    // Manifesti saa lyhyen välimuistin: yhden tunnuksen korjaus näkyy
    // pelissä tunnissa eikä kuukaudessa. Äänitiedostot ovat pysyviä.
    '--cache-control', tyyppi === 'application/json'
      ? 'public, max-age=3600' : 'public, max-age=2592000',
  ]);
}

/** Jo julkaistu manifesti, jotta yhden tunnuksen korjaus ei pyyhi muita. */
async function haeVanhaManifesti(osoite) {
  try {
    const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(20000) });
    if (!vastaus.ok) return null;
    const data = await vastaus.json();
    return Array.isArray(data?.tehosteet) ? data : null;
  } catch {
    return null;
  }
}

/** Koko listan ajo. Palauttaa prosessin paluukoodin. */
async function ajaLista({
  listapolku, tunnus, vienti, kuiva, ulos: ulosPolku,
}) {
  const lista = lueTehostelista(listapolku);
  const tehosteet = tunnus
    ? lista.tehosteet.filter((t) => t.tunnus === tunnus)
    : lista.tehosteet;
  if (!tehosteet.length) {
    console.error(`Tunnusta "${tunnus}" ei ole listassa ${listapolku}.`);
    console.error(`Listassa on: ${lista.tehosteet.map((t) => t.tunnus).join(', ')}`);
    return 1;
  }

  const manifestiAvain = `${lista.amparinKansio}/${lista.manifesti}`;
  const julkinenManifesti = `${julkinenJuuri()}${manifestiAvain}`;

  console.log(`Tehostelista: ${listapolku}`);
  console.log(`Lähteet: ${SALLITUT.map((l) => AANILAHTEET[l].nimi).join(', ')}`);
  if (AVAIN) console.log(`Freesoundin avain löytyi muuttujasta ${avainNimi} (arvoa ei tulosteta).`);
  else console.log('Freesoundin avainta ei ole — haku tehdään avaimettomista lähteistä.');
  console.log(`Ämpärin kansio: ${lista.amparinKansio}/  taso ${lista.tavoiteLufs} LUFS`);
  console.log(`Levylle: ${listanKansiot(lista).kohdekansio}/  hiljaisuuden leikkaus: `
    + `${lista.leikkaaHiljaisuus === false ? 'ei' : 'kyllä'}`);
  console.log(`Tehosteita ajossa: ${tehosteet.length}/${lista.tehosteet.length}`);
  if (kuiva) console.log('KUIVA AJO (--kuiva): vain haku ja valinta, ei latausta eikä vientiä.');
  else if (!vienti) console.log('EI VIENTIÄ (--ei-vientia): tiedostot jäävät levylle.');
  console.log('');

  if (!kuiva) {
    for (const komento of ['ffmpeg', 'ffprobe']) {
      if (!komentoOlemassa(komento)) {
        console.error(`${komento} puuttuu polusta — normalisointi tarvitsee sen.`);
        console.error('Asennus: apt-get install -y ffmpeg (ajossa tämä tehdään automaattisesti).');
        return 1;
      }
    }
  }

  const kansiot = listanKansiot(lista);
  const tyokansio = mkdtempSync(join(tmpdir(), 'tehostehaku-'));
  const kohdekansio = resolve(JUURI, kansiot.kohdekansio);
  const raakakansio = resolve(JUURI, kansiot.raakakansio);
  const viimeistely = {
    tavoiteLufs: lista.tavoiteLufs,
    haivytys: Number.isFinite(lista.haivytysS) ? lista.haivytysS : PULU_HAIVYTYS_S,
    leikkaa: lista.leikkaaHiljaisuus !== false,
  };
  if (!kuiva) {
    vaadiGitignore(kohdekansio);
    vaadiGitignore(raakakansio);
    mkdirSync(kohdekansio, { recursive: true });
    mkdirSync(raakakansio, { recursive: true });
  }

  const rivit = [];
  let virheita = 0;
  try {
    for (const tehoste of tehosteet) {
      const lahteet = tehosteenLahteet(tehoste, { sallitut: SALLITUT, lista });
      console.log(`── ${tehoste.tunnus}  (${tehoste.kuvaus})`);
      console.log(`   haku: ${tehoste.hakusanat.join(' | ')}`);
      console.log(`   lähteet: ${lahteet.join(', ') || '(ei yhtään)'}`);
      console.log(`   rajaus (Freesound): ${hakusuodatin(tehoste)}`);

      // eslint-disable-next-line no-await-in-loop
      const osumat = await haeEhdokkaat(tehoste, {
        lahteet, avain: AVAIN, loki: (rivi) => console.error(rivi),
      });
      const kelpaavat = jarjestaEhdokkaat(osumat, tehoste);
      const valinta = kelpaavat[0];
      if (!valinta) {
        console.error(`   VIRHE: ei yhtään kelvollista osumaa (${osumat.length} haettua).`);
        virheita += 1;
        continue;
      }
      const e = valinta.ehdokas;
      const laskut = osumat.reduce((k, x) => ({ ...k, [x.lahde]: (k[x.lahde] ?? 0) + 1 }), {});
      console.log(`   osumia lähteittäin: ${JSON.stringify(laskut)} → `
        + `${kelpaavat.length} kelvollista`);
      console.log(`   valinta: "${e.nimi}" — ${e.tekija}, ${e.lisenssi} `
        + `[${AANILAHTEET[e.lahde]?.nimi ?? e.lahde}]`);
      console.log(`   ${(e.kesto ?? 0).toFixed(2)} s, pisteet ${valinta.pisteet} `
        + `(${JSON.stringify(valinta.osat)})`);
      console.log(`   ${e.sivu}`);
      /*
       * KAKSI SEURAAVAKSI PARASTA LOKIIN. Kone valitsi kärjen luvuista
       * eikä korvalla, ja kuuntelija haluaa tietää, mitä se hylkäsi —
       * ilman tätä huonon osuman korjaus on uusi arvaus hakusanoista.
       */
      for (const muu of kelpaavat.slice(1, 3)) {
        console.log(`   seuraava: ${muu.pisteet}  "${muu.ehdokas.nimi}" [${muu.ehdokas.lahde}]`);
      }

      if (kuiva) {
        rivit.push(manifestirivi(tehoste, valinta, { kesto: e.kesto ?? 0 }));
        console.log('');
        continue;
      }

      const raaka = join(raakakansio, `raaka-${tehoste.tunnus}.${ehdokkaanPaate(e)}`);
      const kohde = join(kohdekansio, `${tehoste.tunnus}.mp3`);
      // eslint-disable-next-line no-await-in-loop
      const tavut = await lataaEhdokas(e, raaka);
      const tulos = normalisoi(raaka, kohde, tyokansio, viimeistely);
      console.log(`   lataus ${(tavut / 1024).toFixed(0)} kt → leikkaus `
        + `${tulos.leikattu.toFixed(2)} s, taso ${tulos.mitattu.taso == null ? `huippu ${tulos.mitattu.huippu.toFixed(1)} dBFS` : `${tulos.mitattu.taso.toFixed(1)} LUFS`}, `
        + `korjaus ${tulos.korjaus.toFixed(2)} dB → ${tulos.valmis.toFixed(2)} s`);

      if (tulos.valmis < tehoste.kestoMin * 0.5) {
        console.error(`   VIRHE: leikattu ääni ${tulos.valmis.toFixed(2)} s on liian lyhyt `
          + `(kestoMin ${tehoste.kestoMin} s) — osuma oli luultavasti pelkkää hiljaisuutta.`);
        virheita += 1;
        continue;
      }

      if (vienti) {
        vieAmpariin(kohde, `${lista.amparinKansio}/${tehoste.tunnus}.mp3`, 'audio/mpeg');
        console.log(`   ämpäriin: ${lista.amparinKansio}/${tehoste.tunnus}.mp3`);
      }
      rivit.push(manifestirivi(tehoste, valinta, { kesto: tulos.valmis }));
      console.log('');
    }

    /*
     * MANIFESTI. Yhden tunnuksen korjausajo ei saa pyyhkiä muita
     * rivejä, joten jo julkaistu manifesti luetaan ja päälle
     * kirjoitetaan vain tässä ajossa syntyneet tunnukset.
     */
    const vanha = tunnus ? await haeVanhaManifesti(julkinenManifesti) : null;
    const kaikki = new Map((vanha?.tehosteet ?? []).map((r) => [r.tunnus, r]));
    for (const rivi of rivit) kaikki.set(rivi.tunnus, rivi);
    const jarjestys = lista.tehosteet.map((t) => t.tunnus);
    const manifesti = {
      kuvaus: lista.kuvaus,
      paivitetty: new Date().toISOString().slice(0, 10),
      juuri: `${lista.amparinKansio}/`,
      tavoiteLufs: lista.tavoiteLufs,
      tehosteet: [...kaikki.values()]
        .sort((a, b) => jarjestys.indexOf(a.tunnus) - jarjestys.indexOf(b.tunnus)),
    };
    const manifestiTeksti = `${JSON.stringify(manifesti, null, 2)}\n`;

    if (ulosPolku) {
      writeFileSync(ulosPolku, manifestiTeksti);
      console.log(`Manifesti kirjoitettu myös tiedostoon ${ulosPolku}.`);
    }
    if (!kuiva) {
      const manifestiPolku = join(kohdekansio, lista.manifesti);
      writeFileSync(manifestiPolku, manifestiTeksti);
      if (vienti) {
        vieAmpariin(manifestiPolku, manifestiAvain, 'application/json');
        console.log(`Manifesti ämpäriin: ${manifestiAvain}`);
      } else {
        console.log(`Manifesti levylle: ${manifestiPolku}`);
      }
    }

    console.log('');
    console.log('ATTRIBUUTIOT (CC BY vaatii nimeämisen; CC0 ei vaadi):');
    let byta = 0;
    for (const rivi of manifesti.tehosteet) {
      if (!rivi.attribuutio) continue;
      byta += 1;
      console.log(`  ${rivi.tunnus}: ${rivi.attribuutio}`);
    }
    if (!byta) console.log('  ei yhtään — kaikki valitut ovat CC0.');
  } finally {
    rmSync(tyokansio, { recursive: true, force: true });
  }

  console.log('');
  if (kuiva) {
    console.log(`Kuiva ajo valmis: ${rivit.length}/${tehosteet.length} tunnukselle löytyi osuma.`);
    console.log('Mitään ei ladattu eikä viety ämpäriin.');
  } else if (vienti) {
    console.log(`Valmista: ${rivit.length}/${tehosteet.length} tehostetta ämpärissä.`);
    console.log(`Manifesti: ${julkinenManifesti}`);
    console.log('');
    console.log('KUUNTELE tehosteet ennen kuin ne jäävät peliin — kone valitsi ne');
    console.log('arvosanan, latausten ja keston perusteella, ei korvalla. Huonon');
    console.log('osuman vaihtaa ajamalla saman ajon uudestaan --tunnus <tunnus>.');
  } else {
    console.log(`Valmista: ${rivit.length}/${tehosteet.length} tehostetta kansiossa `
      + `${kansiot.kohdekansio}/.`);
  }
  return virheita ? 1 : 0;
}
