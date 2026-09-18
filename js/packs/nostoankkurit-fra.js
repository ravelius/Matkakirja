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
 *
 * MIKSI `nosto-maalehti-cinematographe` EI OLE TAULUSSA (tarkistettu
 * 18.9.2026, docs/raportit/viesti-fable-poltto-kohdemaa-20260918.md
 * avoin 1). Se on Ranskan ainoa nosto, jolta lukittu ankkuri puuttuu, ja
 * SE ON OIKEIN: noston oma paikka on **Lyon** (js/packs/maalehtinostot-
 * fra.js `paikka.nimi: 'Lyon'`, 45,7675 N / 4,835 E), ja Lyon on kartan
 * kaupunkipiste `nakyva-kaupunki-lyon` (45,773 N / 4,829 E, 0,6 km
 * päässä). `onKaupunginSisainen` sanoo sen sisäiseksi KAHTA tietä —
 * datan oma polku (paikkanimi = kaupungin nimi) ja säde — joten peli ei
 * piirrä sitä kartalle millään zoomilla (PAATOKSET 34 kohdat 2-3,
 * js/pallolauta/nostot.js `sisaisetAvaimet`); se avautuu Lyonin
 * kaupunkiliuskasta ja Lyonin kaupunkikortin nostolohkosta
 * (`NAKYVAT_KAUPUNGIT_FRA` kenttä `korttiNosto`). Lukittu ankkuri
 * polttaisi siis mustetta paikkaan, johon elävä kerros ei piirrä
 * merkkiä — kaupunki lakkaisi olemasta yksi piste. Vartio on
 * `tools/lukitse-nostoankkurit-maalle.mjs`, joka rajaa saman ehdon ja
 * jättää rivin lisäämättä (kuiva-ajo 18.9.2026: 62 ankkuria, 0 uutta).
 */

/** Nostokerroksen rivin avain → kartta-ankkuri (asteina). */
export const NOSTOANKKURIT_FRA = {
  'nosto:avignonin-paavinpalatsi': { lat: 43.947819, lng: 4.900965 },
  'nosto:bayeux-seinavaate': { lat: 49.277217, lng: -0.700000 },
  'nosto:biskajanlahti': { lat: 45.199962, lng: -1.142480 },
  'nosto:carcassonnen-linnoituskaupunki': { lat: 43.206973, lng: 2.363000 },
  'nosto:carnacin-kivirivit': { lat: 47.647431, lng: -3.064000 },
  'nosto:chambord': { lat: 47.616321, lng: 1.517000 },
  'nosto:chartresin-katedraali': { lat: 48.448295, lng: 1.487000 },
  'nosto:douaumont': { lat: 49.209984, lng: 5.420000 },
  'nosto:hahmotelma-ajaccio': { lat: 41.926951, lng: 8.738000 },
  'nosto:hahmotelma-amboise': { lat: 47.413047, lng: 0.986000 },
  'nosto:hahmotelma-amiens': { lat: 49.896085, lng: 2.303000 },
  'nosto:hahmotelma-beaune': { lat: 47.021783, lng: 4.838000 },
  'nosto:hahmotelma-biarritz': { lat: 43.480829, lng: -1.561000 },
  'nosto:hahmotelma-bonifacio': { lat: 41.438018, lng: 9.158000 },
  'nosto:hahmotelma-canal-du-midi': { lat: 43.350159, lng: 1.820000 },
  'nosto:hahmotelma-canigou': { lat: 42.517930, lng: 2.456000 },
  'nosto:hahmotelma-chenonceau': { lat: 47.325453, lng: 1.070000 },
  'nosto:hahmotelma-cognac': { lat: 45.700833, lng: -0.331000 },
  'nosto:hahmotelma-etretat': { lat: 49.574894, lng: 0.216325 },
  'nosto:hahmotelma-le-puy-en-velay': { lat: 45.045607, lng: 3.884000 },
  'nosto:hahmotelma-lourdes': { lat: 43.315242, lng: -0.052128 },
  'nosto:hahmotelma-mont-ventoux': { lat: 44.173304, lng: 5.279000 },
  'nosto:hahmotelma-nimesin-areena': { lat: 43.835020, lng: 4.361000 },
  'nosto:hahmotelma-pic-du-midi': { lat: 43.052770, lng: 0.140148 },
  'nosto:hahmotelma-place-stanislas': { lat: 48.693591, lng: 6.182000 },
  'nosto:hahmotelma-pointe-du-raz': { lat: 48.040317, lng: -4.666218 },
  'nosto:hahmotelma-puy-de-sancy': { lat: 45.527181, lng: 2.813000 },
  'nosto:hahmotelma-reims': { lat: 49.263311, lng: 4.034000 },
  'nosto:hahmotelma-rocamadour': { lat: 44.800283, lng: 1.619000 },
  'nosto:hahmotelma-rouen': { lat: 49.439289, lng: 1.094000 },
  'nosto:hahmotelma-saint-emilion': { lat: 44.892655, lng: -0.154000 },
  'nosto:hahmotelma-saint-malo': { lat: 48.599254, lng: -2.026000 },
  'nosto:hahmotelma-verdon': { lat: 43.868344, lng: 6.366893 },
  'nosto:hahmotelma-vezelay': { lat: 47.443765, lng: 3.748304 },
  'nosto:hahmotelma-vichy': { lat: 46.128803, lng: 3.428000 },
  'nosto:lascaux': { lat: 45.052884, lng: 1.169000 },
  'nosto:loire': { lat: 47.924806, lng: 1.878072 },
  'nosto:millaun-silta': { lat: 44.235548, lng: 3.029284 },
  'nosto:mont-saint-michel': { lat: 48.502711, lng: -1.504295 },
  'nosto:montblanc': { lat: 45.833275, lng: 6.866000 },
  'nosto:nosto-maalehti-braille': { lat: 48.187553, lng: 2.052713 },
  'nosto:nosto-maalehti-camarguen-hevoset': { lat: 43.432470, lng: 4.502218 },
  'nosto:nosto-maalehti-chaine-des-puys': { lat: 45.771443, lng: 2.836038 },
  'nosto:nosto-maalehti-chandeleur': { lat: 48.099049, lng: -1.669000 },
  'nosto:nosto-maalehti-couesnonin-vuorovesi': { lat: 48.767829, lng: -1.515787 },
  'nosto:nosto-maalehti-dune-du-pilat': { lat: 44.538899, lng: -1.210284 },
  'nosto:nosto-maalehti-le-mans': { lat: 48.007410, lng: 0.197000 },
  'nosto:nosto-maalehti-marseillen-saippua': { lat: 43.295871, lng: 5.369000 },
  'nosto:nosto-maalehti-michelin-opas': { lat: 45.555163, lng: 3.206958 },
  'nosto:nosto-maalehti-montgolfier': { lat: 45.241910, lng: 4.670000 },
  'nosto:nosto-maalehti-pasteur-meister': { lat: 49.796762, lng: 2.791253 },
  'nosto:nosto-maalehti-peilisali': { lat: 48.805500, lng: 2.120000 },
  'nosto:nosto-maalehti-petanque': { lat: 43.106843, lng: 5.819263 },
  'nosto:nosto-maalehti-roquefort': { lat: 43.709534, lng: 2.786116 },
  'nosto:pont-du-gard': { lat: 43.947907, lng: 4.535000 },
  'nosto:rhone': { lat: 44.929093, lng: 4.829000 },
  'nosto:skandaali-kaulanauhajuttu-1785': { lat: 47.838494, lng: 2.614690 },
  'nosto:syvennys-marseille-cosquer': { lat: 43.244118, lng: 5.454061 },
  'nosto:syvennys-marseille-exvotot': { lat: 43.283900, lng: 5.371200 },
  'nosto:syvennys-marseille-roquefavour': { lat: 43.516200, lng: 5.312500 },
  'nosto:valimeri': { lat: 43.108058, lng: 5.877698 },
  'nosto:vignemale': { lat: 42.776231, lng: -0.142000 },
};

/** Vientikehys, jotta raportti kertoo mistä luvut ovat. */
export const NOSTOANKKURIT_FRA_KEHYS = { ruutu: '390x844', dpr: 2, vietty: '2026-09-18' };
