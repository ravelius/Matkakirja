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
   * Kuva on kuvaputken toimitus 5.9.2026 illalla
   * (isoisa-bombay-aged-r20260905-v1): isoisä astuu veneeseen selin
   * kameraan Bombayn satamassa — hän on kuvassa, mutta ei hahmotu
   * (Raamattu: ISOISA JAA ARVOITUKSEKSI).
   */
  lento: {
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bombay-aged-r20260905-v1.jpg`,
    selite: 'Bombayn satama 1873: isoisä astuu veneeseen selin kameraan, '
      + 'taustalla höyrylaivoja ja rantakatu. Valokuva löytyi matkakirjan '
      + 'välistä.',
    lahde: 'Kuvaputken generoitu valokuva',
    kuvateksti: 'Isoisä, Bombay, 1873',
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
