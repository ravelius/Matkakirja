/*
 * RANSKAN NOSTOJEN LUKITUT KARTTA-ANKKURIT (Raamattu KARTTAUUDISTUKSEN
 * PAATOKSET 33 TARKENNUS 2 kohta 5 — "Ranskan nostot poltetaan
 * nostotasolle paikkauksena" — ja PAATOKSET 32 kohdat 1, 2 ja 5).
 * ══════════════════════════════════════════════════════════════════
 *
 * MIKSI TÄMÄ TIEDOSTO ON OLEMASSA. Poltettu piste on laatassa YHDESSÄ
 * paikassa. Elävä ankkuri (js/pallolauta/nostoankkurit.js) lasketaan
 * saapumiskehyksessä, jonka mitat tulevat RUUTUKOOSTA
 * (`ankkurivarasto.tunnus` = "<leveys>x<korkeus>"): 390 px puhelin ja
 * 1400 px työpöytä antavat eri levityksen ja siis eri ankkurin. Jos
 * poltto käyttäisi laskentaa, poltettu muste ja elävä nimiö/osuma
 * osuisivat yhteen vain sillä yhdellä ruudulla, jolla poltto ajettiin.
 *
 * RATKAISU: ankkuri EI OLE enää näkymän tila vaan DATAA. Tämä taulu
 * ajetaan kerran PUHELIMEN saapumiskehyksessä (390 × 844, dpr 2 —
 * omistajan pääalusta) työkalulla `tools/vie-nostoankkurit.mjs`, ja
 * peli lukee sen sellaisenaan: jos nostolla on lukittu ankkuri,
 * levitystä ei ajeta, vaan merkki on TÄSMÄLLEEN siinä lat/lng-
 * pisteessä, johon se poltettiin — kaikilla ruutukooilla ja kaikilla
 * zoomeilla. Vain nimiö ja osumapinta ovat eläviä; pistettä ei piirretä
 * päälle (`poltettu`-luettelo, js/laattapyramidi.js nostoOnPoltettu).
 *
 * AVAIN on nostokerroksen oma rivin avain (js/pallolauta/nostot.js):
 * `nosto:<id>`, `naapuri:<ISO>:<id>`. Aihenostoa EI lukita: sen
 * jäsenyys on kaupungin nostojoukon funktio ja se syntyy vasta
 * ryhmityksessä — sen paikan määräävät jäsenten lukitut ankkurit.
 *
 * TAULUN PÄIVITYS: aja `node tools/vie-nostoankkurit.mjs` (Playwright,
 * 390 px) ja polta laatat samasta taulusta — kaksi lukua, yksi lähde.
 * Käsin ei muokata.
 */

/** Nostokerroksen rivin avain → kartta-ankkuri (asteina). */
export const NOSTOANKKURIT_FRA = {
  'nosto:avignonin-paavinpalatsi': { lat: 43.947819, lng: 4.900965 },
  'nosto:bayeux-seinavaate': { lat: 49.277217, lng: -0.700000 },
  'nosto:carcassonnen-linnoituskaupunki': { lat: 43.206973, lng: 2.363000 },
  'nosto:chartresin-katedraali': { lat: 48.448295, lng: 1.487000 },
  'nosto:douaumont': { lat: 49.209984, lng: 5.420000 },
  'nosto:hahmotelma-ajaccio': { lat: 41.926951, lng: 8.738000 },
  'nosto:hahmotelma-beaune': { lat: 47.021783, lng: 4.838000 },
  'nosto:hahmotelma-canigou': { lat: 42.517930, lng: 2.456000 },
  'nosto:hahmotelma-etretat': { lat: 49.574894, lng: 0.216325 },
  'nosto:hahmotelma-lourdes': { lat: 43.315242, lng: -0.052128 },
  'nosto:hahmotelma-pic-du-midi': { lat: 43.052770, lng: 0.140148 },
  'nosto:hahmotelma-place-stanislas': { lat: 48.693591, lng: 6.182000 },
  'nosto:hahmotelma-reims': { lat: 49.263311, lng: 4.034000 },
  'nosto:hahmotelma-verdon': { lat: 43.868344, lng: 6.366893 },
  'nosto:hahmotelma-vezelay': { lat: 47.443765, lng: 3.748304 },
  'nosto:lascaux': { lat: 45.052884, lng: 1.169000 },
  'nosto:loire': { lat: 47.924806, lng: 1.878072 },
  'nosto:millaun-silta': { lat: 44.235548, lng: 3.029284 },
  'nosto:mont-saint-michel': { lat: 48.502711, lng: -1.504295 },
  'nosto:montblanc': { lat: 45.833275, lng: 6.866000 },
  'nosto:nosto-maalehti-braille': { lat: 48.187553, lng: 2.052713 },
  'nosto:nosto-maalehti-camarguen-hevoset': { lat: 43.198032, lng: 4.383113 },
  'nosto:nosto-maalehti-chaine-des-puys': { lat: 45.771443, lng: 2.836038 },
  'nosto:nosto-maalehti-couesnonin-vuorovesi': { lat: 48.767829, lng: -1.515787 },
  'nosto:nosto-maalehti-dune-du-pilat': { lat: 44.538899, lng: -1.210284 },
  'nosto:nosto-maalehti-michelin-opas': { lat: 45.555163, lng: 3.206958 },
  'nosto:nosto-maalehti-pasteur-meister': { lat: 49.796762, lng: 2.791253 },
  'nosto:nosto-maalehti-petanque': { lat: 42.969934, lng: 5.620013 },
  'nosto:nosto-maalehti-roquefort': { lat: 43.709534, lng: 2.786116 },
  'nosto:pont-du-gard': { lat: 43.947907, lng: 4.535000 },
  'nosto:rhone': { lat: 44.929093, lng: 4.829000 },
  'nosto:skandaali-kaulanauhajuttu-1785': { lat: 47.838494, lng: 2.614690 },
  'nosto:syvennys-marseille-cosquer': { lat: 43.244118, lng: 5.454061 },
  'nosto:syvennys-marseille-roquefavour': { lat: 43.516200, lng: 5.312500 },
  'nosto:valimeri': { lat: 42.576336, lng: 5.500204 },
  'nosto:vignemale': { lat: 42.776231, lng: -0.142000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_FRA_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-18' };
