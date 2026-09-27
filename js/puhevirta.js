/**
 * PROGRESSIIVINEN PUHE: mp3-virta dekoodataan paloina sitä mukaa kuin
 * tavuja tulee (omistaja 27.9.2026 klo 07.5x: pala alkaa soida heti kun
 * ensimmäiset tavut tulevat, myös 2 400 merkin palalla).
 *
 * MIKSI NÄIN EIKÄ MediaSourcella. Puhesoitin (js/puhe.js luoPuheSoitin)
 * on WebAudio-puskurisoitin: se leikkaa hiljaisuudet, liittää palat
 * saumattomasti aikajanalle ja pysäyttää koko piirin tauolla. MSE
 * toisi tilalle audioelementin ilman näitä, eikä iPhonen Safarissa ole
 * MSE:tä lainkaan. Sen sijaan mp3 pilkotaan KEHYSRAJOILTA ja jokainen
 * segmentti dekoodataan omalla decodeAudioData-kutsullaan.
 *
 * SAUMA ON BITTITARKKA, kun (mitattu 27.9.2026 xAI:n mp3:lla, MPEG-2
 * Layer III 24 kHz, Chromium ja WebKit):
 *   - segmentin eteen otetaan ESIRULLA = 3 kehystä, joiden ääni
 *     hylätään (bittisäiliö ja MDCT:n päällekkäisyys tarvitsevat
 *     edeltävät kehykset; 2 riitti WebKitille, Chromium tarvitsi 3),
 *   - perään JÄLKIRULLA = 1 kehys, jonka ääni hylätään (WebKitin
 *     dekooderi antaa viimeisen kehyksen vajaana),
 *   - ja dekoodaus tapahtuu mp3:n omalla näytetaajuudella. 44,1/48 kHz
 *     piirissä decodeAudioData näytteistää jokaisen segmentin erikseen,
 *     ja rajoille jäi mitattuna 0,04–0,13:n hyppy (naksahdus). Siksi
 *     puhepiiri ajetaan 24 kHz:llä (js/puhe.js PUHEPIIRIN_TAAJUUS), ja
 *     jos selain ei suostu siihen, pala dekoodataan kokonaisena kuten
 *     ennen.
 *
 * Moduuli on puhdas: dekooderi (decodeAudioData) annetaan sisään, joten
 * logiikka testataan Nodessa (tests/puhevirta.test.mjs).
 */

/** Hylättäviä kehyksiä segmentin edessä. */
export const MP3_ESIRULLA = 3;
/** Hylättäviä kehyksiä segmentin perässä (ei virran viimeisessä). */
export const MP3_JALKIRULLA = 1;
/*
 * Segmenttien koot kehyksinä: ensimmäinen pieni, jotta ääni alkaa heti
 * (8 × 576 näytettä = 0,19 s 24 kHz:llä), sitten kasvava, jotta
 * pitkässä palassa dekoodauskutsuja on kymmeniä eikä satoja.
 */
export const VIRTAPORTAAT = [8, 8, 16, 32, 64, 128];

const BITTINOPEUDET = {
  1: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  2: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
};
const TAAJUUDET = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] };

/** ID3v2-otsakkeen pituus tavuina (0, jos otsaketta ei ole tai se on vielä kesken). */
export function id3Pituus(t) {
  if (t.length < 10 || t[0] !== 0x49 || t[1] !== 0x44 || t[2] !== 0x33) return 0;
  return 10 + ((t[6] << 21) | (t[7] << 14) | (t[8] << 7) | t[9]) + ((t[5] & 0x10) ? 10 : 0);
}

/**
 * Jäsentää kokonaiset Layer III -kehykset kohdasta `alku` alkaen.
 * Palauttaa kehykset ja kohdan, josta seuraava jäsennys jatkaa
 * (vajaa kehys jää odottamaan lisää tavuja).
 *
 * @returns {{ kehykset: {alku: number, pituus: number, naytteita: number, taajuus: number}[], seuraava: number }}
 */
export function mp3Kehykset(t, alku = 0, pituus = t.length) {
  const kehykset = [];
  let i = alku;
  while (i + 4 <= pituus) {
    if (t[i] !== 0xff || (t[i + 1] & 0xe0) !== 0xe0) { i += 1; continue; }
    const versio = (t[i + 1] >> 3) & 3;
    const kerros = (t[i + 1] >> 1) & 3;
    const bi = t[i + 2] >> 4;
    const ti = (t[i + 2] >> 2) & 3;
    const tayte = (t[i + 2] >> 1) & 1;
    if (kerros !== 1 || versio === 1 || bi === 0 || bi === 15 || ti === 3) { i += 1; continue; }
    const kbps = (versio === 3 ? BITTINOPEUDET[1] : BITTINOPEUDET[2])[bi];
    const taajuus = TAAJUUDET[versio][ti];
    const koko = Math.floor(((versio === 3 ? 144 : 72) * kbps * 1000) / taajuus) + tayte;
    if (i + koko > pituus) break;
    kehykset.push({ alku: i, pituus: koko, naytteita: versio === 3 ? 1152 : 576, taajuus });
    i += koko;
  }
  return { kehykset, seuraava: i };
}

/**
 * Luo virtadekooderin.
 *
 * `lisaa(tavut)` ottaa vastaan virran palan, `loppu()` kertoo ettei
 * enempää tule ja odottaa viimeisen dekoodauksen. Jokainen valmis
 * segmentti annetaan `osa(puskuri, alku, pituus)`-kutsulla: puskuri on
 * dekooderin AudioBuffer ja alku/pituus näytteinä se osa, joka kuuluu
 * soittaa (esi- ja jälkirulla pois). Osat tulevat järjestyksessä.
 *
 * Jos tavuista ei löydy mp3-kehyksiä (tuntematon muoto) tai segmentin
 * dekoodaus pettää, loput dekoodataan loppu()-kutsussa yhtenä kappaleena
 * — ääni tulee silloin myöhässä mutta ehjänä, kuten ennen tätä.
 *
 * @param {{ dekoodaa: (ArrayBuffer) => Promise<AudioBuffer>,
 *   osa: (puskuri: AudioBuffer, alku: number, pituus: number) => void,
 *   portaat?: number[], kokonaan?: boolean }} asetukset
 */
export function luoMp3Virta({ dekoodaa, osa, portaat = VIRTAPORTAAT, kokonaan = false }) {
  let tavut = new Uint8Array(64 * 1024);
  let pituus = 0;
  let jasennetty = -1; // -1 = ID3 vielä tarkistamatta
  const kehykset = [];
  let dekoodattu = 0; // kehyksiä annettu dekooderille
  let segmentteja = 0;
  let rikki = false;
  let rikkiKohta = 0;
  let ketju = Promise.resolve();

  const kasvata = (lisa) => {
    if (pituus + lisa <= tavut.length) return;
    let koko = tavut.length;
    while (koko < pituus + lisa) koko *= 2;
    const uusi = new Uint8Array(koko);
    uusi.set(tavut.subarray(0, pituus));
    tavut = uusi;
  };

  /** Segmentti [a, b) dekooderille; `viimeinen` = ei jälkirullaa. */
  const dekoodaaSegmentti = (a, b, viimeinen) => {
    const r = Math.max(0, a - MP3_ESIRULLA);
    const e = viimeinen ? b : Math.min(kehykset.length, b + MP3_JALKIRULLA);
    const alkuTavu = kehykset[r].alku;
    const loppuTavu = kehykset[e - 1].alku + kehykset[e - 1].pituus;
    const kopio = tavut.slice(alkuTavu, loppuTavu);
    const n = kehykset[a].naytteita;
    const taajuus = kehykset[a].taajuus;
    /*
     * Dekoodaus alkaa HETI (selain dekoodaa pääsäikeen ulkopuolella, ja
     * rinnakkaiset kutsut lyhentävät alun jonoa); vain osien luovutus
     * kulkee ketjussa, jotta järjestys säilyy.
     */
    const dekoodaus = rikki ? null : dekoodaa(kopio.buffer);
    dekoodaus?.catch(() => {});
    ketju = ketju.then(async () => {
      if (rikki || !dekoodaus) return;
      try {
        const puskuri = await dekoodaus;
        const suhde = puskuri.sampleRate / taajuus;
        const alku = Math.round((a - r) * n * suhde);
        const maara = viimeinen
          ? Math.max(0, puskuri.length - alku)
          : Math.min(puskuri.length - alku, Math.round((b - a) * n * suhde));
        if (maara > 0) osa(puskuri, alku, maara);
      } catch {
        rikki = true;
        rikkiKohta = a;
      }
    });
  };

  const jasenna = () => {
    if (jasennetty < 0) {
      if (pituus < 10) return;
      jasennetty = id3Pituus(tavut.subarray(0, pituus));
    }
    if (jasennetty > pituus) return;
    const { kehykset: uudet, seuraava } = mp3Kehykset(tavut, jasennetty, pituus);
    kehykset.push(...uudet);
    jasennetty = seuraava;
  };

  const koko = (k) => portaat[Math.min(k, portaat.length - 1)];

  return {
    lisaa(pala) {
      if (!pala?.length) return;
      kasvata(pala.length);
      tavut.set(pala, pituus);
      pituus += pala.length;
      if (kokonaan) return;
      jasenna();
      while (!rikki && kehykset.length >= dekoodattu + koko(segmentteja) + MP3_JALKIRULLA) {
        const a = dekoodattu;
        const b = a + koko(segmentteja);
        dekoodaaSegmentti(a, b, false);
        dekoodattu = b;
        segmentteja += 1;
      }
    },
    async loppu() {
      if (!kokonaan) jasenna();
      await ketju;
      // Tuntematon muoto tai kokonaan-tila: koko virta yhtenä.
      if (kokonaan || (!kehykset.length && pituus)) {
        if (!pituus) return;
        const puskuri = await dekoodaa(tavut.slice(0, pituus).buffer);
        osa(puskuri, 0, puskuri.length);
        return;
      }
      if (rikki) {
        // Loput yhtenä segmenttinä rikkikohdasta (esirullalla).
        const r = Math.max(0, rikkiKohta - MP3_ESIRULLA);
        const puskuri = await dekoodaa(tavut.slice(kehykset[r].alku, pituus).buffer);
        const alku = Math.round((rikkiKohta - r) * kehykset[r].naytteita * (puskuri.sampleRate / kehykset[r].taajuus));
        if (puskuri.length > alku) osa(puskuri, alku, puskuri.length - alku);
        return;
      }
      if (dekoodattu < kehykset.length) dekoodaaSegmentti(dekoodattu, kehykset.length, true);
      dekoodattu = kehykset.length;
      await ketju;
    },
    /** Montako tavua on vastaanotettu (0 = virta ei alkanut). */
    tavuja: () => pituus,
    /** Mp3:n näytetaajuus ensimmäisestä kehyksestä, tai null. */
    taajuus: () => kehykset[0]?.taajuus ?? null,
  };
}
