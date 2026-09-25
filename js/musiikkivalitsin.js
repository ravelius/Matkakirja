/*
 * ══════════════════════════════════════════════════════════════════
 * POHJARAIDAN VALITSIN — mikä musiikki soi juuri nyt
 * ══════════════════════════════════════════════════════════════════
 *
 * Omistajan tilaus 5.9.2026 yöllä, sanatarkasti: *"generoi musiikkeja
 * kaikkiin kohtiin peliä, ne tuovat paljon lisää tunnelmaa."*
 *
 * Pelissä on YKSI pohjaraidan paikka sekoituksessa — ambienssiäänten
 * alla, saman väistön (pöllö, kertoja, lukija) ja saman
 * kehittäjäkertoimen ('musiikki') takana. Siihen paikkaan on nyt monta
 * ehdokasta: etusivu, kaupungin oma kappale, kaupungin alueen raita,
 * lehti, matkalaukku ja pohjavire. TÄMÄ MODUULI PÄÄTTÄÄ, KUKA VOITTAA;
 * soittaminen, ristihäivytys ja puuttuvan raidan sietäminen ovat yhä
 * js/ambience-stream.js:n pohjavirekoneistossa.
 *
 * Työnjako on sama kuin kaupunkiraidoilla alun perin: taulukot ja
 * säännöt ovat omassa pienessä moduulissaan, soitin siellä missä
 * kaikki muukin ääni. Kaksi soitinta samalle paikalle sekoituksessa
 * olisi kaksi paikkaa, joissa väistö ja taustatauko pitäisi muistaa.
 *
 * ------------------------------------------------------------------
 * KETJU, EI VALINTA
 * ------------------------------------------------------------------
 *
 * Valitsin ei palauta yhtä raitaa vaan KETJUN parhaasta alkaen:
 *
 *   tila (lehti, matkalaukku) → paikan raita (etusivu)
 *   → kaupungin oma kappale → kaupungin alueen raita → pohjavire
 *
 * Soittimen tehtävä on ottaa ensimmäinen, joka ei ole todettu
 * puuttuvaksi. Juuri siksi ketju eikä valinta: raidat generoidaan
 * yksi kerrallaan ja kytkentä on pelissä ennen kuin mp3 on olemassa
 * (sama etukäteisnimeäminen kuin luennoilla), joten puuttuva raita on
 * NORMAALI TILA — ja silloin seuraava taso ottaa sen paikan
 * automaattisesti. Peli ei ole hetkeäkään hiljainen.
 *
 * ------------------------------------------------------------------
 * TILA TULEE KAHDESTA PAIKASTA
 * ------------------------------------------------------------------
 *
 * 1. PAIKKA (`asetaMusiikkipaikka`) tulee playPlaceAmbiencesta —
 *    samasta kohdasta, josta koko peli pyytää taustaääntä. Mukana on
 *    kaupungin maa (pakan `map.cityCountry`), josta alue johdetaan.
 * 2. TILAT (`asetaMusiikkitila`) ovat päällekkäisiä syitä joukossa,
 *    kuten ambienssin hiljennykset: lehti voi avautua matkalaukun
 *    päälle, ja kummankin sulkeutuminen saa vaikuttaa vain omaan
 *    tilaansa. Järjestys TILARAIDAT-taulussa ratkaisee, kumpi voittaa.
 *
 * Lehden tila tulee ambienssin omasta hiljennyssyystä ('lehti'), jonka
 * lehden kaikki kolme avauskohtaa ja yksi sulkukohta jo kutsuvat —
 * uutta koukkua ei tarvittu. Matkalaukku ei hiljennä ambienssia (se ei
 * ole lukunäkymä), joten se kertoo tilansa suoraan js/ui.js:stä.
 */
import { musaPolku } from './media.js';
import { kaupunginRaidat } from './kaupunkimusiikki.js';

/** Pohjavire: viimeinen taso, joka soi kun mikään muu ei sovi. */
export const POHJARAITA = 'musa-pohja';

/**
 * TILARAIDAT — näkymä, joka vie musiikin mukanaan. JÄRJESTYS ON
 * PRIORITEETTI: ylin päällä oleva tila voittaa.
 *
 * Lehti ennen matkalaukkua, koska lehti on iso lukunäkymä ja
 * matkalaukku pieni väline: jos molemmat ovat auki, pelaaja lukee.
 */
export const TILARAIDAT = {
  lehti: {
    tunnus: 'musa-lehti',
    kuvaus: 'Lehden lukurauha: paperi ja kirjasto, harmonium ja kitara hyvin hiljaa.',
  },
  matkalaukku: {
    tunnus: 'musa-matkalaukku',
    kuvaus: 'Matkalaukku auki: nahka ja messinki, lyhyt ja hyvin hiljainen kierto.',
  },
};

/**
 * PAIKKARAIDAT — virtuaalipaikat, joilla on oma kappale. 'etusivu' on
 * pelin ainoa: se kattaa portin ("Aloita seikkailu"), avaustekstin,
 * pallon vapaan selailun ja lähtökaupungin valinnan, koska ne ovat
 * kaikki samaa vaihetta (game.phase === 'pickstart', js/ui.js
 * syncAmbience) ja samaa tunnelmaa — kartta auki, matka edessä.
 *
 * OMISTAJAN KYSYMYS (5.9.2026 yö) oli, tarvitseeko pallon vapaa
 * selailu oman raitansa etusivun rinnalle. EI TARVITSE: pelaaja ei
 * poistu mihinkään pallon ja avaustekstin välillä, ja raidan vaihto
 * kesken saman näkymän kuulostaisi virheeltä. Yksi raita, yksi vaihe.
 */
export const PAIKKARAIDAT = {
  etusivu: {
    tunnus: 'musa-etusivu',
    kuvaus: 'Etusivu ja lähtökaupungin valinta: avara ja odottava, kartan tunnelma.',
  },
};

/* ── tila ────────────────────────────────────────────────────────── */

let paikka = null;
let paikanMaa = null;
const tilat = new Set();
const musiikkiKuuntelijat = new Set();
/*
 * Musiikin TASON kuuntelijat (kuunteleMusiikinKerrointa). Eri joukko
 * kuin musiikkiKuuntelijat: nuo kysyvät "mikä raita soi", nämä "millä
 * tasolla" — ja soivan raidan pitää seurata säädintä ilman että raita
 * vaihtuu (omistajan vaatimus 8.9.2026).
 */
const kerroinKuuntelijat = new Set();

/**
 * Missä ollaan. Kutsutaan js/ambience-stream.js:n pohjavirekoneistosta
 * joka renderöinnillä — arvo talletetaan, jotta tilan vaihtuminen
 * (lehti auki) osaa palata samaan paikkaan ilman erillistä muistia.
 *
 * @param {?string} cityId laudan kaupungin id tai virtuaalipaikka
 * @param {?string} maa kaupungin ISO-3-maakoodi (pakan cityCountry)
 */
export function asetaMusiikkipaikka(cityId = null, maa = null) {
  paikka = cityId ?? null;
  paikanMaa = maa ?? null;
}

/** Viimeksi kerrottu paikka (js/ambience-stream.js oletusparametri). */
export const musiikinPaikka = () => paikka;

/** Viimeksi kerrottu maa. */
export const musiikinMaa = () => paikanMaa;

/**
 * Näkymä auki tai kiinni. Tuntematon nimi on sallittu eikä tee mitään
 * — sama sietokyky kuin ambienssin hiljennyssyillä, joita kaikkia ei
 * ole nimetty raidaksi.
 *
 * @param {string} nimi TILARAIDAT-taulun avain
 * @param {boolean} paalla
 */
export function asetaMusiikkitila(nimi, paalla) {
  if (!Object.hasOwn(TILARAIDAT, nimi)) return;
  const ennen = tilat.has(nimi);
  if (paalla) tilat.add(nimi);
  else tilat.delete(nimi);
  if (tilat.has(nimi) === ennen) return;
  for (const fn of musiikkiKuuntelijat) fn();
}

/** Päällä olevat tilat prioriteettijärjestyksessä (testit ja lehti). */
export const musiikkitilat = () => Object.keys(TILARAIDAT).filter((n) => tilat.has(n));

/**
 * Ilmoita minulle, kun soivan raidan pitää vaihtua. Kuuntelija on
 * js/ambience-stream.js: se päättää itse, soittaako se mitään
 * (taustaäänten kytkin, radiotila).
 */
export function kuunteleMusiikkitilaa(fn) {
  musiikkiKuuntelijat.add(fn);
  return () => musiikkiKuuntelijat.delete(fn);
}

/* ── musiikin oma kytkin ─────────────────────────────────────────── */

/*
 * ══════════════════════════════════════════════════════════════════
 * MUSIIKKI JA ÄÄNIMAISEMA OVAT ERI ASIOITA (omistaja 7.9.2026 illalla,
 * sanatarkasti: *"striimilukija ei mene päälle, jos taustamusiikki on
 * kytketty pois. Ne ovat kaksia irrallista asiaa, joten striimi-ääni
 * pitäisi kuulua, vaikka taustamusiikki on kytketty pois."* —
 * Raamattu, VIAT v1672)
 * ══════════════════════════════════════════════════════════════════
 *
 * MITÄ ENNEN OLI. Äänivalikossa oli yksi kytkin nimeltä TAUSTAÄÄNET
 * (js/sound.js `enabled`), ja sen takana oli KAIKKI: paikkojen
 * äänimaisema, tehosteet, pohjaraita, kaupunkien kappaleet,
 * siirtymämusiikki ja visamusiikki. Pelaaja, joka halusi vain
 * musiikin pois, menetti samalla kenttä-äänitykset — juuri se, mistä
 * omistaja kirjoitti.
 *
 * MIKSI KYTKIN ASUU TÄÄLLÄ. Tämä moduuli on musiikin oma alin kerros
 * (pohjaraidan valitsin) eikä tuo mitään soittimista, joten sekä
 * js/ambience-stream.js (pohjaraita, visamusiikki), js/
 * siirtymamusiikki.js (matkan ja linssin raidat) että js/ui.js
 * (aarteen paljastusaihe) voivat kysyä siltä samaa asiaa ilman kehää.
 * Sama kaava kuin äänivalinnalla: valinta on pysyvä (localStorage),
 * oletus on PÄÄLLÄ, ja muutos kertoo kuuntelijoille — samoille, jotka
 * kuulevat tilanvaihdon, koska teko on molemmissa sama: katso mitä
 * pitäisi soida, ja soita se (tai vaikene).
 *
 * TYÖNJAKO: musiikin kytkin vaientaa VAIN musiikin. Äänimaisema
 * vaikenee omasta kytkimestään (äänivalikon Äänimaisema = sound.js
 * enabled) tai koko pelin mykistyksestä (js/aani-tausta.js, kun peli
 * ei ole päällimmäisenä).
 */
const MUSIIKIN_AVAIN = 'matkakirja-musiikki';

/** Luetaan kerran: valinta on pysyvä, oletus päällä. */
let musiikkiSallittu = (() => {
  try {
    return localStorage.getItem(MUSIIKIN_AVAIN) !== 'off';
  } catch {
    return true;
  }
})();

/** Soiko pelin musiikki (pohjaraita, siirtymä, visa, aarre, linssi)? */
export const musiikkiPaalla = () => musiikkiSallittu;

/**
 * Musiikki päälle tai pois. Kuuntelijat (js/ambience-stream.js) saavat
 * saman herätteen kuin tilanvaihdosta: pois → soiva raita vaikenee,
 * päälle → oikea raita palaa samaan paikkaan.
 */
export function asetaMusiikkiPaalla(paalla) {
  const uusi = Boolean(paalla);
  if (uusi === musiikkiSallittu) return uusi;
  musiikkiSallittu = uusi;
  try {
    localStorage.setItem(MUSIIKIN_AVAIN, uusi ? 'on' : 'off');
  } catch {
    /* tallennus ei ole välttämätöntä */
  }
  for (const fn of musiikkiKuuntelijat) fn();
  return uusi;
}

/* ── musiikin taso: yksi perustaso, yksi kerroin ─────────────────── */

/*
 * ══════════════════════════════════════════════════════════════════
 * TAUSTAMUSIIKKI HILJEMMALLE JA YKSI KERROIN KAIKELLE MUSIIKILLE
 * (omistajan vika 8.9.2026 klo 18.39, iPhone, Vilnan kaupunkikartta,
 * maailma-pakki, kehittäjätila päällä, sanatarkasti: *"Taustamusiikki
 * on aivan liian kovalla, eikä rattaan säädin vaikuta sen tasoon
 * ollenkaan."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * MIKSI MUSIIKKI OLI LIIAN KOVALLA. Pohjaraidan taso (ennen
 * js/ambience-stream.js POHJA_VOIMA 0,019) laskettiin aikanaan
 * ElevenLabsin raidasta `musa-pohja.mp3`, jonka mitattu taso on
 * RMS −31,3 dBFS. Kun paletti vaihdettiin Lyriaan (js/media.js
 * MUSIIKIN_PAATE '-lyria', v1628), TIEDOSTOT VAIHTUIVAT MUTTA
 * KERTOIMET EIVÄT: jokainen `musa-*-lyria.mp3` on masteroitu tasolle
 * RMS −14,5 dBFS eli 16,8 dB kovemmaksi (mitattu:
 * `node tools/mittaa-musiikin-tasot.mjs`). Sama raita samalla
 * kertoimella siis soi yhtäkkiä 16,8 dB kovempaa kuin se taso, jonka
 * omistaja oli 5.9. kuullut ja hyväksynyt. Siirtymä- ja linssiraidat
 * eivät kärsineet: ne on masteroitu dokumentoituun tavoitteeseen
 * (−33 dBFS, docs/moduulit/aanet.md), joten vika koskee juuri
 * musiikkipalettia.
 *
 * PERUSTASO ON SIKSI YKSI VAKIO JA SE ON TÄSSÄ. Aiemmin sama luku oli
 * kirjoitettu auki kolmeen paikkaan (pohjavire, visamusiikki,
 * aarreaihe), ja juuri siksi paletin vaihto ehti muuttaa kaikkien
 * kuuluvan tason kenenkään huomaamatta. Nyt jokainen musiikkireitti
 * lausuu tasonsa TÄMÄN kertoimena, joten palettia vaihdettaessa
 * korjataan yksi luku.
 *
 * LUKU. 0,034 on se taso, jonka omistaja itse hyväksyi 5.9. kuultuaan
 * Lyria-raidat (POHJA_VOIMA 0,019 × VOLUME_POLUN_KORVAUS 1,8), MIINUS
 * se kaksinkertaistus, jonka Fable käski 8.9. purkaa. Kaksi asiaa
 * korjautuu yhdellä luvulla: hyväksytty taso on nyt kirjoitettu
 * perustasoon eikä säätimen oletukseen, ja kuuluva taso laskee 6 dB.
 *
 * MITATTU (musa-kaupunki-ita-eurooppa-lyria.mp3, Vilna, Chromium):
 * 0,034 × −14,5 dBFS ≈ −43,9 dBFS. Kertoja soi samassa hetkessä
 * lukemalla −18,0 dBFS (puhe-fokus-matkakirja-vilna.mp3 −17,1 dBFS ×
 * puheVoima 0,9), joten musiikki on noin 26 dB kertojan alla — ja pulu
 * on kertojan tasolla kertoimella 0,8, joten senkin alle jäädään
 * selvästi. LOPULLINEN LUKEMA ON KUULOKOKEEN NUPPI kuten kaikki muutkin
 * äänitasot; rattaan säädin liikuttaa sitä ilman koodimuutosta (liuku
 * 0–100, ks. seuraava luku).
 */
export const MUSIIKIN_PERUSTASO = 0.034;

/**
 * KAIKEN MUSIIKIN KERROIN — pohjaraita, kaupunki- ja aluekappaleet,
 * tila- ja paikkaraidat, siirtymä- ja linssiraidat, visamusiikki ja
 * aarreaihe. Kerroin tulee YHDESTÄ paikasta: musiikin omasta liu'usta
 * (ks. seuraava luku). Ei rinnakkaisia kertoimia.
 *
 * KEHITTÄJÄN VANHA 'musiikki'-KERROIN ON POISTETTU KAAVASTA
 * (9.9.2026). Se oli hammasrattaan ×0,25…×3,0 -askellin, ja sen arvo
 * jäi laitteen muistiin: omistajan puhelimessa saattoi olla yhä 5.9.
 * linjattu ×2,0, joka olisi hiljaisuutta tavoittelevan uuden liu'un
 * päällä kaksinkertaistanut kaiken kenenkään huomaamatta. Kaksi
 * säädintä samalle asialle oli myös se, mistä koko vika alkoi.
 */
export function musiikinKerroin() {
  return musiikinVahvistus(musiikinLiukuArvo) * MUSIIKIN_KATTO;
}

/**
 * Ilmoita minulle heti, kun musiikin kerroin muuttuu. Soittimen on
 * ajettava SOIVAN raidan taso uudestaan — säädön pitää kuulua ilman
 * että raita vaihtuu tai peli etenee.
 */
export function kuunteleMusiikinKerrointa(fn) {
  kerroinKuuntelijat.add(fn);
  return () => kerroinKuuntelijat.delete(fn);
}

/* ── musiikin oma säädin: liuku 0–100 ja korvan mukainen käyrä ───── */

/*
 * ══════════════════════════════════════════════════════════════════
 * SÄÄDIN TOIMII OIKEASTI JA LAAJALLA VÄLILLÄ, MYÖS IPHONELLA
 * (omistaja 9.9.2026 klo 16.30, sanatarkasti: *"Taustamusiikki on
 * ainakin iPhonilla vielä aivan liian kovalla. Saisiko säätimen niin,
 * että se oikeasti toimisi ja sen pystyisi säätämään todella isolla
 * välillä, niin, että musiikin saisi oikeasti säädettyä oikealle
 * tasolle?"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * KAKSI VIKAA, JOTKA NÄYTTIVÄT YHDELTÄ.
 *
 * 1. SÄÄDIN OLI VÄÄRÄN MUOTOINEN. Rattaan musiikkirivi oli
 *    kerroinaskellin (js/kehittajan-voimat.js, ×0,25…×3,0, askel 0,1).
 *    Alaraja ×0,25 on vain −12 dB eikä hiljaisuus, ja väli on
 *    LINEAARINEN — korva kuulee desibelejä, joten lineaarisen säätimen
 *    alapäässä tapahtuu kaikki ja yläpäässä ei mitään. Omistaja ei
 *    päässyt "oikealle tasolle" millään napautusmäärällä.
 *
 * 2. SÄÄDIN EI MENNYT PERILLE PUHELIMESSA. Ks. js/musiikkivahvistin.js:
 *    iOS:n WebKit ei anna JavaScriptin asettaa `<audio>`-elementin
 *    `volumea`, joten volume-polulla oleva raita soi tiedoston omalla
 *    tasolla riippumatta siitä, mitä säädin sanoo.
 *
 * KÄYRÄ ON VAKIO, EI MAKUASIA. Liuku on 0–100 ja vahvistus lasketaan
 *
 *     vahvistus(x) = (x / 100) ^ MUSIIKIN_KAYRA        (MUSIIKIN_KAYRA = 2,5)
 *
 * eli x = 0 on aito hiljaisuus, x = 100 on käyrän täysi arvo 1 ja väli
 * on korvan mukainen (potenssikäyrä ≈ logaritminen säädin):
 *
 *   | liuku | vahvistus | dB käyrän täydestä |
 *   | ---   | ---       | ---                |
 *   |   0   | 0         | hiljaisuus         |
 *   |   5   | 0,00056   | −65,1 dB           |
 *   |  10   | 0,0032    | −50,0 dB           |
 *   |  20   | 0,0179    | −35,0 dB           |
 *   |  35   | 0,0725    | −22,8 dB  (OLETUS) |
 *   |  50   | 0,1768    | −15,1 dB           |
 *   |  75   | 0,4871    |  −6,2 dB           |
 *   | 100   | 1         |    0 dB            |
 *
 * Alaspäin väli on siis rajaton (hiljaisuuteen asti) ja 65 dB kuluu jo
 * säätimen viidellä ensimmäisellä pykälällä — juuri se "todella iso
 * väli", jota omistaja pyysi. Samalla pykälän kokoinen muutos kuuluu
 * suunnilleen samanlaisena kaikkialla säätimen matkalla, mikä on koko
 * potenssikäyrän tarkoitus.
 *
 * MITÄ VAHVISTUS TARKOITTAA PELISSÄ. Musiikkireitit lausuvat tasonsa
 * omina vakioinaan (POHJA_VOIMA, MUSIIKKI_VOIMA, AARRE_MUSIIKIN_VOIMA,
 * RAIDAT[laji].voima), ja ne ovat KESKENÄÄN sovitettu sekoitus. Säädin
 * ei saa rikkoa sekoitusta, joten se on niiden yhteinen kerroin:
 *
 *     musiikinKerroin() = vahvistus(liuku) × MUSIIKIN_KATTO × kehittäjän kerroin
 *
 * MUSIIKIN_KATTO = 8 sitoo käyrän peliin: se on kerroin liu'un
 * täydessä päässä. Silloin
 *
 *   liuku 43,5 → kerroin 1,0   = 8.9.2026 hyväksytty taso
 *   liuku 35   → kerroin 0,58  = 4,7 dB sen alle   ← OLETUS
 *   liuku 100  → kerroin 8,0   = 18 dB sen yli
 *
 * eli oletus on omistajan pyytämällä tavalla HILJAISEMPI kuin ennen, ja
 * säätimessä on silti varaa 18 dB ylöspäin (hiljainen laite, huono
 * kaiutin) ja hiljaisuuteen asti alaspäin.
 *
 * OMA AVAIN, EI MIGRAATIOTA. Kehittäjän vanha avain
 * (`matkakirja-dev-voima-musiikki`) jää paikalleen omana kertoimenaan;
 * liu'ulla on oma avain, koska se on eri asia eri asteikolla. Vanhan
 * avaimen arvo ei kelpaisi liu'un lähtöarvoksi (×2,0 tarkoittaisi
 * liukuna 55, ei 200), joten migraatiota ei tehdä — laite aloittaa
 * uuden säätimen oletuksesta, joka on nimenomaan haluttu hiljaisempi.
 */
export const MUSIIKIN_KAYRA = 2.5;
export const MUSIIKIN_KATTO = 8;
export const MUSIIKIN_LIUKU_MIN = 0;
export const MUSIIKIN_LIUKU_MAX = 100;
export const MUSIIKIN_LIUKU_ASKEL = 1;
export const MUSIIKIN_LIUKU_OLETUS = 35;
export const MUSIIKIN_LIUKU_AVAIN = 'matkakirja-musiikin-taso';

/**
 * PUHDAS KÄYRÄ: liuku 0–100 → vahvistus 0–1. Rajojen ulkopuolinen ja
 * kelvoton arvo rajataan, jottei säädin voi koskaan syöttää
 * negatiivista tai NaN-vahvistusta äänigraafiin (GainNode ottaa NaN:in
 * vastaan ja vaientaa koko ketjun ilman virhettä).
 *
 * @param {number} liuku 0–100
 * @returns {number} 0–1
 */
export function musiikinVahvistus(liuku) {
  const x = Number(liuku);
  if (!Number.isFinite(x)) return (MUSIIKIN_LIUKU_OLETUS / MUSIIKIN_LIUKU_MAX) ** MUSIIKIN_KAYRA;
  const rajattu = Math.min(MUSIIKIN_LIUKU_MAX, Math.max(MUSIIKIN_LIUKU_MIN, x));
  return (rajattu / MUSIIKIN_LIUKU_MAX) ** MUSIIKIN_KAYRA;
}

/** Liu'un arvo rajoihin ja kokonaisluvuksi. */
function rajaaLiuku(arvo) {
  const luku = Number(arvo);
  if (!Number.isFinite(luku)) return MUSIIKIN_LIUKU_OLETUS;
  return Math.round(Math.min(MUSIIKIN_LIUKU_MAX, Math.max(MUSIIKIN_LIUKU_MIN, luku)));
}

/** Luetaan kerran: valinta on pysyvä, oletus MUSIIKIN_LIUKU_OLETUS. */
let musiikinLiukuArvo = (() => {
  try {
    const t = localStorage.getItem(MUSIIKIN_LIUKU_AVAIN);
    return t == null ? MUSIIKIN_LIUKU_OLETUS : rajaaLiuku(t);
  } catch {
    return MUSIIKIN_LIUKU_OLETUS;
  }
})();

/** Säätimen nykyinen lukema 0–100. */
export const musiikinLiuku = () => musiikinLiukuArvo;

/**
 * Säätimen uusi lukema. Tallentaa laitteelle ja herättää kertoimen
 * kuuntelijat, jotta SOIVA raita seuraa säätöä heti (omistajan vaatimus
 * 8.9.2026: säädön pitää vaikuttaa siihen, mikä juuri nyt soi).
 *
 * @returns {number} rajattu lukema
 */
export function asetaMusiikinLiuku(arvo) {
  const uusi = rajaaLiuku(arvo);
  if (uusi === musiikinLiukuArvo) return uusi;
  musiikinLiukuArvo = uusi;
  try {
    if (uusi === MUSIIKIN_LIUKU_OLETUS) localStorage.removeItem(MUSIIKIN_LIUKU_AVAIN);
    else localStorage.setItem(MUSIIKIN_LIUKU_AVAIN, String(uusi));
  } catch {
    /* yksityinen selaus: säätö elää istunnon */
  }
  const kerroin = musiikinKerroin();
  for (const fn of kerroinKuuntelijat) {
    try { fn(kerroin); } catch { /* yksi kuuntelija ei kaada muita */ }
  }
  return uusi;
}

/**
 * Näyttöasu säätimen viereen: lukema ja desibeliero käyrän täydestä.
 * Desibeli on se, mitä korva kuulee, ja juuri siksi se näytetään —
 * kuulokokeen tulos on helpompi kertoa eteenpäin lukuna kuin muistikuvana.
 */
export function musiikinLiuunTeksti(liuku = musiikinLiukuArvo) {
  const arvo = rajaaLiuku(liuku);
  const v = musiikinVahvistus(arvo);
  if (v <= 0) return '0 · vaiti';
  // Typografinen miinus (−) eikä yhdysmerkki: sama kuin muualla pelissä.
  return `${arvo} · ${String(Math.round(20 * Math.log10(v))).replace('-', '−')} dB`;
}

/* ── ketju ───────────────────────────────────────────────────────── */

/**
 * Raitojen polut parhaasta alkaen. Sama polku ei esiinny kahdesti.
 *
 * @param {?string} cityId oletuksena viimeksi kerrottu paikka
 * @param {?string} maa oletuksena viimeksi kerrottu maa
 * @returns {string[]} polut muodossa assets/audio/…
 */
export function musiikkiketju(cityId = paikka, maa = paikanMaa) {
  const polut = [];
  for (const nimi of Object.keys(TILARAIDAT)) {
    if (tilat.has(nimi)) polut.push(musaPolku(TILARAIDAT[nimi].tunnus));
  }
  if (cityId && Object.hasOwn(PAIKKARAIDAT, cityId)) {
    polut.push(musaPolku(PAIKKARAIDAT[cityId].tunnus));
  }
  polut.push(...kaupunginRaidat(cityId, maa));
  polut.push(musaPolku(POHJARAITA));
  return [...new Set(polut)];
}

/**
 * Ensimmäinen ketjun raita, jota ei ole todettu puuttuvaksi — tai
 * null, jos kaikki puuttuvat (silloin peli on tämän raidan osalta
 * hiljainen, eikä sitä yritetä uudestaan joka renderöinnillä).
 *
 * @param {Set<string>} puuttuvat js/ambience-stream.js:n muisti 404:istä
 */
export function valitseMusiikki(puuttuvat = new Set(), cityId = paikka, maa = paikanMaa) {
  return musiikkiketju(cityId, maa).find((polku) => !puuttuvat.has(polku)) ?? null;
}

/**
 * Vain testejä varten: unohtaa paikan, tilat JA kuuntelijat.
 *
 * Kuuntelijat kuuluvat nollaukseen, koska testi lataa soittimesta
 * (js/ambience-stream.js) tuoreen kopion joka kerta ja jokainen kopio
 * rekisteröi oman kuuntelijansa tähän jaettuun moduuliin. Ilman
 * nollausta vanhat kopiot heräisivät seuraavan testin tilanvaihdosta
 * ja rakentaisivat soittimia sen kirjanpitoon. Kutsu siis ENNEN uuden
 * kopion tuontia.
 */
export function nollaaMusiikkivalitsin() {
  paikka = null;
  paikanMaa = null;
  tilat.clear();
  musiikkiKuuntelijat.clear();
  kerroinKuuntelijat.clear();
}
