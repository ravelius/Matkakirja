/*
 * NOSTOJEN KOKOLUOKITUS (omistajan päätös 26.9.2026, ELÄVÄ KARTTA, Fablen
 * tilaus: docs/raportit/elava-kartta-suunnitelma-20260926.md kohta 2).
 *
 * Jokaiselle nostolle kolme luokkaa. Peruste on MERKITYS PELAAJALLE JA
 * TARINALLE, ei kuvan koko eikä artikkelin pituus:
 *
 *   paakohde — iso merkki + kevyt hehku. Maailmalla tunnistettu paikka,
 *              jolla on suoraa kytköstä pelin tarinaan (Aarnin unohdetut
 *              aarteet, isoisän reitin kaupunki, 1873-ajan tapahtuma) tai
 *              jonka pelaaja odottaa kartalta ensimmäisenä.
 *   kohde    — tavallinen merkki. Hyvä, oma tarinansa, mutta ei se, josta
 *              maata kuvataan ensimmäisenä.
 *   pieni    — pieni merkintä. Kiinnostava lisä, jonka löytäminen on
 *              palkinto: joet, sivukaupungit, kapea erikoisuus.
 *
 * SKANDAALIT: vain tyyli muuttuu, koko pysyy luokan mukaan (löydös 135) —
 * skandaalinosto luokitellaan samoin perustein kuin muutkin.
 *
 * Avain on nostoankkurin tunnus (nosto:<id>, js/packs/nostoankkurit-<iso>.js);
 * testi (tests/nostojen-kokoluokat.test.mjs) varmistaa, että jokaisella
 * maan ankkuroidulla nostolla on luokka eikä ylimääräisiä avaimia ole.
 * Skeeman kenttä (Siirtoseppä) ja piirto (Natiiviseppä) lukevat tämän
 * taulun. Maat lisätään tähän samaan tiedostoon yksi kerrallaan:
 * GRC ensin, sitten isoisän reitin maat.
 */
export const KOKOLUOKAT = ['paakohde', 'kohde', 'pieni'];

export const NOSTOJEN_KOKOLUOKAT = {
  GRC: {
    // PÄÄKOHTEET (12): Kreeta on pelikaupunki (Knossos, labyrintti); Delfoi,
    // Olympia, Marathon, Thermopylai ja Olympos ovat antiikin ja myyttien
    // kiintopisteet; Meteora ja Santorini maan tunnetuimmat maisemat;
    // Rodoksen kolossi, Antikythera ja Sofian korut (Mykene, Schliemann 1876)
    // kuuluvat suoraan unohdettujen aarteiden tarinaan; Thessaloniki on
    // maan toinen kaupunki.
    'nosto:knossos': 'paakohde',
    'nosto:delfoi': 'paakohde',
    'nosto:olympia': 'paakohde',
    'nosto:marathon': 'paakohde',
    'nosto:hahmotelma-thermopylae': 'paakohde',
    'nosto:olympos': 'paakohde',
    'nosto:hahmotelma-meteora': 'paakohde',
    'nosto:santorini': 'paakohde',
    'nosto:rodoksen-kolossi': 'paakohde',
    'nosto:antikythera': 'paakohde',
    'nosto:nosto-sofia-korut': 'paakohde',
    'nosto:thessaloniki': 'paakohde',

    // KOHTEET (31)
    'nosto:epidauros': 'kohde',
    'nosto:hahmotelma-delos': 'kohde',
    'nosto:hahmotelma-bassae': 'kohde',
    'nosto:hahmotelma-vergina': 'kohde',
    'nosto:hahmotelma-pella': 'kohde',
    'nosto:hahmotelma-philippi': 'kohde',
    'nosto:hahmotelma-samothrace': 'kohde',
    'nosto:hahmotelma-sounion': 'kohde',
    'nosto:hahmotelma-monemvasia': 'kohde',
    'nosto:hahmotelma-missolonghi': 'kohde',
    'nosto:hahmotelma-navarino': 'kohde',
    'nosto:hahmotelma-athos': 'kohde',
    'nosto:hahmotelma-milos': 'kohde',
    'nosto:hahmotelma-chios': 'kohde',
    'nosto:hahmotelma-korfu': 'kohde',
    'nosto:hahmotelma-navagio': 'kohde',
    'nosto:hahmotelma-pelion': 'kohde',
    'nosto:hahmotelma-samaria': 'kohde',
    'nosto:hahmotelma-vikos': 'kohde',
    'nosto:korintin-kanava': 'kohde',
    'nosto:parnassos': 'kohde',
    'nosto:pindos': 'kohde',
    'nosto:psiloritis': 'kohde',
    'nosto:taygetos': 'kohde',
    'nosto:egeanmeri': 'kohde',
    'nosto:kreetanmeri': 'kohde',
    'nosto:joonianmeri': 'kohde',
    'nosto:iraklion': 'kohde',
    'nosto:patras': 'kohde',
    'nosto:nafplio': 'kohde',
    'nosto:skandaali-simonides-kasikirjoitusvaarentaja': 'kohde',

    // PIENET MERKINNÄT (19): joet, sivukaupungit ja kapeat erikoisuudet.
    'nosto:aliakmonas': 'pieni',
    'nosto:evros': 'pieni',
    'nosto:strymonas': 'pieni',
    'nosto:traakianmeri': 'pieni',
    'nosto:hahmotelma-arta': 'pieni',
    'nosto:hahmotelma-kalavryta': 'pieni',
    'nosto:hahmotelma-kastoria': 'pieni',
    'nosto:hahmotelma-kerkini': 'pieni',
    'nosto:hahmotelma-lavrio': 'pieni',
    'nosto:hahmotelma-metsovo': 'pieni',
    'nosto:hahmotelma-naoussa': 'pieni',
    'nosto:hahmotelma-prespa': 'pieni',
    'nosto:hahmotelma-zagori': 'pieni',
    'nosto:smolikas': 'pieni',
    'nosto:pikkupollo': 'pieni',
    'nosto:reunuskilpikonna': 'pieni',
    'nosto:kalamata': 'pieni',
    'nosto:ermoupoli': 'pieni',
    'nosto:ioannina': 'pieni',
  },
};
