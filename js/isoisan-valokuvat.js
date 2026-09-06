/*
 * ISOISÄN VALOKUVAT 1873 (omistajan tilaus 3.9.2026, Raamattu: ISOISAN
 * VALOKUVAT). Kuvaputken generoimat albumiinivedokset. Kuvat ovat pelin
 * R2-mediämpärissä (kuvaputki varmensi 3.9.2026 19:42 UTC), ja niihin
 * viitataan valmiina osoitteina.
 *
 * ── ISOISÄ JÄÄ ARVOITUKSEKSI (Raamattu, omistaja 5.9.2026 ilta) ────
 *
 * Sanatarkasti: *"isoisän on hyvä jäädä vähän arvoitukseksi, miltä hän
 * näytti jotta jokainen pelaaja voi itse muodostaa näkemyksensä
 * mielikuvituksessa. hän vain kävi mielenkiintoisissa paikoissa ja aika
 * vauhdilla."* Pelin kuvat ovat siis joko hänen itse ottamiaan näkymiä
 * tai kuvia, joissa hän ei hahmotu täysin — eikä kuvateksti kuvaile
 * hänen ulkonäköään. Kuvateksti on siksi muotoa "Isoisän kuva:
 * <paikka>, 1873".
 *
 * Kuvaputki toimittaa uudet, tälle säännölle tehdyt kuvat lähiaikoina;
 * ne KORVAAVAT nämä (omistaja 5.9.2026 klo 23.15: *"kohta pitäisi tulla
 * isoisän uusia kuvia, niin käytä niitä ennemmin"*). Vaihto tapahtuu
 * yhden taulun rivin sisällä, ks. `lento` alempana.
 *
 * Kytkentä: ensimmäisessä lentokohtauksessa (js/ui.js
 * aloituslentoSisalla) `lento`-kuva "löytyy matkakirjan välistä" kartan
 * päälle kuvatekstinsä kanssa; napautus suurentaa. Aloitussivun
 * Kanton-kuva oli mukana v1509–v1510, omistaja jätti sen pois 3.9.2026
 * ("jätetään isoisän kuva pois etusivulta"); tiedot säilyvät tässä.
 */
import { AANI_JUURI } from './media.js';

export const ISOISAN_KUVAJUURI = `${AANI_JUURI}kohtaamiset/isoisa/`;

/*
 * KORTTI IRTI VALKOISESTA TAUSTASTA (omistaja 3.9.2026: *"tuo isoisän kuva
 * pitää leikata irti valkoisesta taustasta"*). JPG:ssä cabinet card on
 * valkoisella pohjalla; rajaus on kortin reunat kuvan mittojen osuuksina
 * (mitattu Chromiumin kanvaasilla, kynnys min(r,g,b) < 238, pieni vara).
 * CSS leikkaa clip-pathilla ja skaalaa kortin täyteen (rajausTyyli).
 */
export const ISOISAN_VALOKUVAT = {
  kanton: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kanton-1873-kulunut-v1.jpg`,
    // Rajaus kortin pahvireunan SISÄPUOLELLE (omistaja 4.9.2026 ilta:
    // "isoisän kuvassa näkyy reunoilla vielä valkoista"): pahvin vaalea
    // kehys ja pyöristetyt kulmat jäivät näkyviin, kun leikattiin vain
    // valkoinen tausta pois. Mitattu kuvasta (1536 × 1024).
    rajaus: { x0: 0.13, y0: 0.115, x1: 0.873, y1: 0.866 },
    selite: 'Isoisä teehuoneen pöydässä Kantonissa 1873. Kulunut cabinet card '
      + 'isoisän matkalaukusta.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Kanton, 1873',
  },
  bombay: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bombay-1873-kulunut-v1.jpg`,
    // Sama sisärajaus kuin Kantonissa (4.9.2026): valokuva ilman pahvia.
    rajaus: { x0: 0.125, y0: 0.13, x1: 0.875, y1: 0.873 },
    selite: 'Isoisä Bombayn satamalaiturilla matka-arkkunsa vieressä 1873. '
      + 'Valokuva löytyi matkakirjan välistä.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Bombay, 1873',
  },
  /*
   * ══════════════════════════════════════════════════════════════
   * AVAUSLENNON KUVA — YKSI VAIHDETTAVA PAIKKA
   * ══════════════════════════════════════════════════════════════
   *
   * Omistaja 5.9.2026 klo 23.10 (työpöytäkaappaus avauslennosta):
   * *"tähän pitää vaihtaa uusi kuva jossa isoisää ei tunnista."*
   * Sama ilta klo 23.15: *"kohta pitäisi tulla isoisän uusia kuvia,
   * niin käytä niitä ennemmin."*
   *
   * Lento lukee VAIN tätä avainta (js/ui.js aloituslentoSisalla), joten
   * kuvaputken seuraava kuva vaihdetaan tähän yhdellä rivillä —
   * `osoite`, `kuvateksti`, `selite` ja `lahde`, ei muita
   * koodimuutoksia. `rajaus` on VALINNAINEN eikä tässä kuvassa ole
   * sitä: vaalea vinjetti ja paperin reunat ovat jo kuvassa, eikä
   * pahvireunusta ole leikattavaksi.
   *
   * ── MAHDOLLISIMMAN VAALEA KUVA (omistaja 6.9.2026 aamu) ──────────
   *
   * Sanatarkasti: *"Käytä Ateena lennossa mahdollisimman vaalea isoisän
   * kuvaa."* Avauslento päättyy Ateenaan Välimeren yli, joten kuva on
   * valittu Kairo–Giza–Aleksandria-linjalta (päätoimittajan tarkennus
   * samana aamuna), sikäli kuin se on vaaleimpien joukossa.
   *
   * MITTAUS 6.9.2026: kaikki isoisän kuvat (tämä taulu + pakin 27
   * kuvaa) ladattiin ämpäristä ja niiden keskiluminanssi mitattiin
   * Chromiumin kanvaasilla (Rec. 709: 0,2126R + 0,7152G + 0,0722B,
   * kuva skaalattuna 200 px leveäksi). Kärki, keskiluminanssi 0–255
   * (mediaani suluissa):
   *
   *   199,8 (219) isoisa-rio-aged-r20260905-v1        Rio de Janeiro
   *   199,5 (210) isoisa-ballarat-aged-r20260905-v1   Melbourne/Ballarat
   *   198,4 (218) isoisa-singapore-aged-r20260905-v2  Singapore
   *   185,8 (205) isoisa-yokohama-aged-r20260905-v1   Jokohama
   *   184,4 (201) isoisa-giza-aged-r20260905-v1       Giza      ← valittu
   *   178,9 (209) isoisa-railway-aged-r20260905-v1    Yhdysvaltain länsi
   *   175,4 (197) isoisa-sanfrancisco-aged-r20260905-v1
   *   174,0 (186) isoisa-bombay-aged-r20260905-v1     (edellinen lennon kuva)
   *   164,9 (169) isoisa-cairo-aged-r20260905-v1      Kairo
   *   160,0 (163) isoisa-alexandria-harbor-more-r20260905-v2 Aleksandria
   *
   * Giza on koko joukon viidenneksi vaalein (27 kuvasta) ja Välimeren
   * linjan selvästi vaalein — kolme vaaleampaa (Rio, Ballarat,
   * Singapore) ovat toisella puolen maapalloa, eivätkä ne sovi
   * Ateenaan päättyvän lennon kuvaksi. Kuva on kuvaputken 5.9.2026
   * toimitus: pieni hahmo Gizan aavikolla, ei tunnistettavia kasvoja
   * (Raamattu: ISOISA JAA ARVOITUKSEKSI).
   *
   * Kuva on jo lähteessään vinjetoitu VAALEAAN (paperin sävyyn), joten
   * sen päälle ei lisätä tummennusta — kortin oma reunahäivytys
   * (css .lento-valokuva img, maski) riittää.
   */
  lento: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-giza-aged-r20260905-v1.jpg`,
    selite: 'Pieni hahmo Gizan aavikolla 1873, pyramidien juurella. '
      + 'Valokuva löytyi matkakirjan välistä.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Giza, 1873',
  },
};

/**
 * Kortin alle lyöty pieni lappu (omistaja 3.9.2026: "Isoisä,
 * paikkakunta, 1873"). Kelpaa vain ISOISAN_VALOKUVAT-muodossa.
 */
export function valokuvanKuvateksti(kuva) {
  return String(kuva?.kuvateksti ?? '').trim();
}

/** Lennolla valokuva nousee esiin vasta, kun repliikki on ehtinyt alkaa. */
export const LENNON_VALOKUVAN_VIIVE_MS = 2600;

/**
 * Rajaus CSS-muuttujina (css .isoisa-rajattu): clip-path leikkaa kortin
 * reunoihin ja skaala täyttää elementin leikatulla kortilla. Rajaus on
 * valinnainen — uusissa kuvaputken kuvissa ei ole pahvireunusta, jolloin
 * tyyliä ei tarvita lainkaan.
 */
export function rajausTyyli(kuva) {
  const r = kuva?.rajaus;
  if (!r) return '';
  const leveys = r.x1 - r.x0;
  const korkeus = r.y1 - r.y0;
  const skaala = 1 / Math.max(leveys, korkeus);
  return `--rx0:${r.x0};--ry0:${r.y0};--rx1:${r.x1};--ry1:${r.y1};--rskaala:${skaala.toFixed(4)}`;
}
