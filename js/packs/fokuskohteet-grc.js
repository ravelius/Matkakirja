/*
 * FOKUSKOHTEET — KREIKKA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Omistajan tilaus 24.8.2026 (kohdekorostusidean henki, Raamatun osio
 * "Fokusmoodi", kohta KOHDEKOROSTUS): fokusnäkymän kartalla on
 * pelilaatan lisäksi muitakin paikkoja, ja niistä pitää voida kertoa.
 * KOHDENOSTO on tämän kevyin muoto: pöllö puhuu kuplasta jostakin
 * MUUSTA kuin kaupungista, ja kartalle kasvaa vinjettikuva KOHTEEN
 * OMAAN SIJAINTIIN — ei kaupungin viuhkaan.
 *
 * ── MIKSI OMA LISTA EIKÄ RIVI KAUPUNGIN VIRRASSA ───────────────────
 *
 * Kohde ei kuulu yhdelle kaupungille. Korintin kanava on Ateenan
 * naapurissa, mutta Thessaloniki tai Delfoi voi nousta kolmen eri
 * kaupungin virrassa, ja fokuskohteet-kreikka.md:n 15 kohdetta ovat
 * yhtä lailla koko maan omaisuutta. Lista asuu siis maakohtaisesti,
 * ja kaupungin virta poimii siitä tunnuksella (fokuskohteet):
 * uusi kohde on yksi olio tähän ja yksi id virran `kohteet`-riville.
 *
 * ── KOORDINAATIT ON LASKETTU KERRAN, LAUTAA KOHTI ──────────────────
 *
 * Sama ratkaisu kuin fokusnäkymän lisänimillä (js/packs/fokus-grc.js):
 * pelissä EI ole projektiokoodia, vaan asteet on muunnettu laudan
 * yksiköiksi valmiiksi ja asteet jätetty kommenttiin, jotta luvut voi
 * laskea uudelleen jos lauta vaihtaa projektiota. Erona on, että
 * kohteet on annettava KAHDELLE laudalle: Ateena on pelattavissa sekä
 * Euroopan laudalla että maailmankartalla, ja sama paikka on niillä
 * eri kohdassa.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/tee-fokuskartta.mjs, laudanProjektio).
 *     Tarkistus: Ateena 23,7275 E / 37,9838 N → 6624,3 / 1881,5,
 *     ja laudalla laatta on kohdassa 6624,7 / 1882 — 0,7 yksikön
 *     osumatarkkuus, sama kuin fokus-grc.js:llä.
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js). Tarkistus: Ateena → 666,8 / 894,6, laudalla
 *     667 / 895.
 *
 * Lauta, jota rivillä ei ole, ei saa kohdetta kartalle — kupla toimii
 * silti. Se on tarkoituksellinen porras: väärään paikkaan piirretty
 * vinjetti olisi pahempi kuin piirtämättä jäänyt.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md, jonka
 * pop-up-tekstit on varmennettu en-Wikipediasta 24.8.2026 artikkeli ja
 * alaotsikko kerrallaan. Teksti on sovitettu pöllön ääneen — LYHENNETTY
 * ja puhuteltu — mutta yhtään faktaa ei ole lisätty eikä muutettu.
 */

/**
 * Kreikan fokuskohteet. Pilottina yksi (Korintin kanava, aineiston
 * kohta 12); loput 14 lisätään tähän samalla kaavalla.
 */
export const FOKUSKOHTEET_GRC = [
  {
    id: 'korintin-kanava',
    nimi: 'Korintin kanava',
    /* Valintakuplan painike. Lupaus on 1873-kulma, ei maantiede. */
    nappi: 'Kanava, jota ei vielä ollut',
    // 22,98389 E / 37,93472 N — en-Wikipedia "Corinth Canal".
    laudat: {
      maailmankartta: { x: 6599.5, y: 1883.4 },
      europe: { x: 652.5, y: 895.9 },
    },
    /*
     * Pöllön repliikki. Aineiston varmennettu pop-up-teksti
     * (fokuskohteet-kreikka.md, kohta 12) sellaisenaan, paitsi että
     * koostajan "HUOM 1873:" -tunniste on kirjoitettu auki omaksi
     * lauseekseen — juuri niin kuin dokumentti itse ehdottaa — ja
     * pöllö puhuttelee herra Foggia. Faktat: Periandros 600-luvulla
     * eaa. ja vetotie, kolme roomalaishallitsijaa ja heidän loppunsa,
     * Neron kuokka 67 jaa., valmistuminen 1881–1893.
     */
    teksti: 'Katso Ateenasta länteen, Korintin kannakselle. Isoisäsi '
      + 'matkan aikaan siellä ei ollut kanavaa. Tyranni Periandros '
      + 'harkitsi sitä jo 600-luvulla eaa., mutta rakensi sen sijaan '
      + 'laivoille kivetyn vetotien. Kolme roomalaishallitsijaa halusi '
      + 'kanavan ja kuoli kaikki väkivaltaisesti: Caesar ja Caligula '
      + 'ennen kuin pääsivät edes alkuun, Nero pian sen jälkeen, kun oli '
      + '67 jaa. itse lyönyt kuokalla ensimmäisen kuopan. Kanava '
      + 'valmistui vasta 1881–1893, isoisäsi matkan jälkeen.',
    /*
     * Commonsin rajapinta 24.8.2026 (categorymembers + imageinfo,
     * Category:Corinth Canal — 60 tiedostoa, tarkistettu, ei arvattu):
     * 2560×1920, CC BY-SA 4.0, tekijä JTE Dimandix, kuvattu 13.4.2019,
     * kuvaus "The narrow waterway of Corinth and a bridge in the
     * middle." Vaakakuva, joten se istuu vinjetin kehykseen ilman
     * rajausta; selite ei väitä kuvasta enempää kuin lähde kertoo.
     */
    kuva: {
      tiedosto: 'Corinth Canal in 2019.jpg',
      selite: 'Korintin kanavan kapea vesitie ja sen yli kaartuva silta. '
        + 'Kannaksen läpi kaivettu ura on kuusi kilometriä pitkä.',
      lahde: 'JTE Dimandix, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },
];

const TUNNUKSITTAIN = new Map(FOKUSKOHTEET_GRC.map((k) => [k.id, k]));

/**
 * Poimii kohteet tunnuksilla siinä järjestyksessä kuin ne on pyydetty.
 * Tuntematon tunnus jätetään pois hiljaa — kirjoitusvirhe listassa ei
 * saa kaataa koko kaupungin virtaa.
 */
export function fokuskohteet(tunnukset) {
  return (tunnukset ?? []).map((id) => TUNNUKSITTAIN.get(id)).filter(Boolean);
}
