/*
 * PALLON RELIEFIKUVA — KAKSI TARKKUUTTA, YKSI VALINTA.
 *
 * Kaksi linssiä piirtää saman reliefin pallon pinnalle: Astronautin
 * kamera (js/linssit/satelliitti-avaruus.js, avaruusnäkymän Maa) ja
 * topografialinssi (js/linssit/topografia.js, kartan oma kalvo).
 * Molemmat tarvitsevat SAMAN vastauksen kysymykseen "kumpi kuva tälle
 * ruudulle" — ja se vastaus on tässä yhtenä totuutena, ei kahtena
 * kopiona.
 *
 * Vakiot ja mittaukset ovat Astronautin kameran erästä 16.9.2026
 * (docs/raportit/viesti-fable-astro-pallo-20260916.md); ne siirrettiin
 * tänne sellaisinaan, kun topografialinssi otti saman valinnan
 * käyttöön (docs/raportit/viesti-fable-topografialinssi-20260916.md
 * luku 9). Satelliittilinssi vie nimet edelleen ulos omasta
 * moduulistaan, joten sen rajapinta ei muuttunut.
 *
 * TOPOGRAFIALINSSILLÄ ON TÄMÄN LISÄKSI TARKENNUSLAASTARI
 * (js/linssit/topografia-tarkennus.js): pohjakuva on koko pallolle,
 * laastari näkyvälle ikkunalle. Ne eivät kilpaile — pohja kertoo
 * yleiskuvan, laastari lähikuvan.
 */

/** Reliefikuvan osoite (js/packs/linssi-topografia-kuva.js). */
export const RELIEFIN_OSOITE = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-20260915.webp';

/**
 * Yhdistetyn tekstuurin mitat — LÄHDEKUVAN OMA TARKKUUS.
 *
 * MITATTU 12.9.2026 (kaappaus puhelimelta lähimmässä zoomissa):
 * 2048 px:n tekstuurilla Italia ja Etna olivat selvästi sumeat. Syy on
 * suoraa laskentaa: lähimmällä sallitulla korkeudella pallon halkaisija
 * on 1 518 px, joten sen kehä ruudulla on π · 1 518 ≈ 4 770 px 360
 * asteelle. 2048 px:n tekstuuri venyy siinä 2,3-kertaiseksi; 4096 px:n
 * venymä on 1,16 eli käytännössä pikselintarkka. Lähdekuva on juuri
 * 4096 × 2048, joten tätä suuremmasta ei saisi lisää tietoa.
 */
export const RELIEFIN_LEVEYS = 4096;
export const RELIEFIN_KORKEUS = 2048;

/*
 * ── TERÄVÄMPI RELIEFI, KAKSI VAKIOTA (16.9.2026) ──────────────────
 *
 * Macilla renderöitiin sama ETOPO1-reliefi kaksinkertaisella
 * tarkkuudella (topografia-pallo-8k-20260916.webp, 8192 × 4096,
 * 2,3 Mt). MITATTU 16.9.2026 (HEAD-kysely ja WebP-otsikko): kuva on
 * olemassa ämpärissä ja sen mitat ovat 8192 × 4096 — eivät 8192 × 2048,
 * joten se on TÄYSI kaksinkertaistus molempiin suuntiin.
 *
 * SE ON PUHELIMELLE LIIKAA, EIKÄ SE OLE MIELIPIDE VAAN LASKU:
 * 8192 × 4096 purkautuu 134 Mt:n RGBA-puskuriksi, ja tekstuurin
 * ladonta tarvitsee niitä KOLME (pohja, apukangas, tuloskangas) plus
 * PNG-pakkauksen 33,5 megapikselistä. iOS Safarin kangaskatto on
 * käytännössä 384 Mt eikä välilehti saa itse kuluttaa siitä kuin osan
 * — 4k-ketju on jo 100 Mt. Siksi kaksi vakiota ja valinta ruudun
 * koosta: 8k vain leveillä ruuduilla, 4k puhelimella.
 *
 * VALINTA ON CSS-LEVEYS × PIKSELISUHDE. Pelkkä laitepikselien määrä
 * ei kelpaa (kolminkertaisella pikselisuhteella puhelimen 430 px on
 * 1 290 laitepikseliä), joten kynnys on kaksiosainen: CSS-leveys
 * vähintään 1 024 (työpöytä tai iPad vaakatasossa) JA laitepikseleitä
 * vähintään 1 024. Puhelin putoaa aina ensimmäiseen ehtoon.
 */
/** Terävämpi reliefi (vain leveille ruuduille — ks. valitseReliefi). */
export const RELIEFIN_OSOITE_8K = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-8k-20260916.webp';
export const RELIEFIN_8K_LEVEYS = 8192;
export const RELIEFIN_8K_KORKEUS = 4096;
/** Kynnykset: CSS-leveys ja laitepikselit, molemmat täytyttävä. */
export const RELIEFIN_8K_RAJA_CSS = 1024;
export const RELIEFIN_8K_RAJA_LAITEPX = 1024;
/**
 * PÄÄKYTKIN. `false` pitää kaikki ruudut 4k:ssa; yhden luvun vaihto
 * ottaa terävämmän kuvan käyttöön leveillä ruuduilla. Mittaukset ja
 * päätös: docs/raportit/viesti-fable-astro-pallo-20260916.md.
 */
export const RELIEFIN_8K_KAYTOSSA = true;

/**
 * Kumpi reliefi tälle ruudulle? Puhdas funktio
 * (tests/satelliitti-avaruus.test.mjs).
 *
 * @param {{ leveys?: number, dpr?: number, salli8k?: boolean }} ruutu
 */
export function valitseReliefi({ leveys = 0, dpr = 1, salli8k = RELIEFIN_8K_KAYTOSSA } = {}) {
  const L = Number(leveys) || 0;
  const p = Number(dpr) > 0 ? Number(dpr) : 1;
  if (salli8k && L >= RELIEFIN_8K_RAJA_CSS && L * p >= RELIEFIN_8K_RAJA_LAITEPX) {
    return {
      tunnus: '8k', osoite: RELIEFIN_OSOITE_8K,
      leveys: RELIEFIN_8K_LEVEYS, korkeus: RELIEFIN_8K_KORKEUS,
    };
  }
  return {
    tunnus: '4k', osoite: RELIEFIN_OSOITE, leveys: RELIEFIN_LEVEYS, korkeus: RELIEFIN_KORKEUS,
  };
}
