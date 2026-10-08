/*
 * OPPAAN STAATTISTEN AINEISTOJEN INDEKSI (6.10.2026; Linssiseppä ja Siirtoseppä): GET /opas/aineistot kertoo, minkä
 * kaupunkien tiedostot ovat jo ämpärissä. Ämpärin objektit ovat muuttumattomia ja CDN välimuistittaa myös 404:n,
 * joten natiivi hakee tiedoston vain listatuille id:ille.
 *   tiet:       media.matkakirja.app/kartta/tiet-v1/<id>.json tai tiet_polut[id] (yövalot, Linssiseppä)
 *   esittely:   media.matkakirja.app/opas/esittely-v1/<id>.json tai esittely_polut[id] (esigeneroitu kerronta; worker tarjoaa
 *               valmiin, natiivi lukee avauksen)
 *   aanikartta: media.matkakirja.app/aanet/aanikartta-v1/<id>.json (kaupunkiäänimaisema, Siirtoseppä; lisätään vasta,
 *               kun kaupungin silmukat ovat ämpärissä)
 * Id: kaupungin nimi pienaakkosin, ä/å → a, ö/ø → o, é → e, välit ja muut merkit → "-" (pariisi, koopenhamina).
 * Lista päivitetään tähän jokaisen viennin jälkeen (Pelikoodari).
 */
export const OPAS_AINEISTOT = Object.freeze({
  tiet: [
    'pariisi', 'venetsia', 'koopenhamina', 'ateena', 'rooma', 'lontoo', 'amsterdam',   // vienti 6.10. (kartta-tiet-vienti-20261006)
    'barcelona', 'bergen', 'berliini', 'bryssel', 'budapest', 'bukarest', 'dublin', 'edinburgh', 'firenze', 'granada',
    'helsinki', 'islanti', 'kosice', 'krakova', 'kreeta', 'lissabon', 'ljubljana', 'luxemburg', 'madrid', 'marseille',
    'oslo', 'praha', 'sevilla', 'sisilia', 'sofia', 'tampere', 'tukholma', 'valletta', 'varsova', 'vilna',
    'wien',   // 7.10. 05.29: sallitut 3D-kaupungit (kartta-tiet-vienti-20261007)
  ],
  // Poikkeavat polut (ämpäri on muuttumaton): 6 km:n säde isoille kaupungeille (Linssiseppä 6.10.), paketti
  // kartta-tiet-vienti-20261006b. Natiivi käyttää tätä polkua, jos id on tässä, muuten kartta/tiet-v1/<id>.json.
  tiet_polut: { pariisi: 'kartta/tiet-v2/pariisi.json', lontoo: 'kartta/tiet-v2/lontoo.json', rooma: 'kartta/tiet-v2/rooma.json' },
  aanikartta: ['pariisi', 'venetsia', 'koopenhamina'],   // pariisi 7.10. 00.30 (-20261006); venetsia + koopenhamina 03.30 (-20261007b); silmukat aanimaisema-v1
  // Esigeneroitu oppaan esittely (opas/esittely-v1/<id>.json, worker lukee itse; opas-esittely.js). 7.10.: pilotti; erä 2 (Rooma, Lontoo, Kööpenhamina) omistajan kuuntelun jälkeen.
  esittely: [
    'pariisi', 'praha', 'wien', 'rooma', 'lontoo', 'koopenhamina',
    // Äänettömät testattavaksi (omistaja 7.10. 18.2x; aaneton: true → ei generointia). v3 8.10.: avaukseen pallovirke (pallosanasto, fysiikka korjattu).
    'amsterdam', 'ateena', 'barcelona', 'bergen', 'berliini', 'bryssel', 'budapest', 'bukarest', 'dublin',
    'edinburgh', 'firenze', 'granada', 'helsinki', 'islanti', 'kosice', 'krakova', 'kreeta', 'lissabon',
    'ljubljana', 'luxemburg', 'madrid', 'marseille', 'oslo', 'sevilla', 'sisilia', 'sofia', 'tampere', 'tukholma',
    'valletta', 'venetsia', 'vilna',
  ],
  // Poikkeavat esittelypolut (ämpäri muuttumaton): Praha ja Wien avauksen ja kierros-kentän kanssa 7.10. (-20261007c).
  // Worker ja natiivi käyttävät tätä polkua, jos id on tässä, muuten opas/esittely-v1/<id>.json.
  esittely_polut: {
    praha: 'opas/esittely-v1b/praha.json', wien: 'opas/esittely-v1b/wien.json',
    amsterdam: 'opas/esittely-aaneton-v3/amsterdam.json',
    ateena: 'opas/esittely-aaneton-v3/ateena.json',
    barcelona: 'opas/esittely-aaneton-v3/barcelona.json',
    bergen: 'opas/esittely-aaneton-v3/bergen.json',
    berliini: 'opas/esittely-aaneton-v3/berliini.json',
    bryssel: 'opas/esittely-aaneton-v3/bryssel.json',
    budapest: 'opas/esittely-aaneton-v3/budapest.json',
    bukarest: 'opas/esittely-aaneton-v3/bukarest.json',
    dublin: 'opas/esittely-aaneton-v3/dublin.json',
    edinburgh: 'opas/esittely-aaneton-v3/edinburgh.json',
    firenze: 'opas/esittely-aaneton-v3/firenze.json',
    granada: 'opas/esittely-aaneton-v3/granada.json',
    helsinki: 'opas/esittely-aaneton-v3/helsinki.json',
    islanti: 'opas/esittely-aaneton-v3/islanti.json',
    kosice: 'opas/esittely-aaneton-v3/kosice.json',
    krakova: 'opas/esittely-aaneton-v3/krakova.json',
    kreeta: 'opas/esittely-aaneton-v3/kreeta.json',
    lissabon: 'opas/esittely-aaneton-v3/lissabon.json',
    ljubljana: 'opas/esittely-aaneton-v3/ljubljana.json',
    luxemburg: 'opas/esittely-aaneton-v3/luxemburg.json',
    madrid: 'opas/esittely-aaneton-v3/madrid.json',
    marseille: 'opas/esittely-aaneton-v3/marseille.json',
    oslo: 'opas/esittely-aaneton-v3/oslo.json',
    sevilla: 'opas/esittely-aaneton-v3/sevilla.json',
    sisilia: 'opas/esittely-aaneton-v3/sisilia.json',
    sofia: 'opas/esittely-aaneton-v3/sofia.json',
    tampere: 'opas/esittely-aaneton-v3/tampere.json',
    tukholma: 'opas/esittely-aaneton-v3/tukholma.json',
    valletta: 'opas/esittely-aaneton-v3/valletta.json',
    venetsia: 'opas/esittely-aaneton-v3/venetsia.json',
    vilna: 'opas/esittely-aaneton-v3/vilna.json',
  },
  // Yksityiskohtakuvat (Sisältökirjuri 7.10.; natiivi lentää kuvan sivuun ankkurisanan kohdalla): luettelo media-juuresta.
  yksityiskohdat_polut: {
    pariisi: 'esittely/pariisi-v2/pariisi-yksityiskohdat.json',
    praha: 'esittely/praha-v1/praha-yksityiskohdat.json', wien: 'esittely/wien-v1/wien-yksityiskohdat.json',
    rooma: 'esittely/rooma-v5/rooma-yksityiskohdat.json', lontoo: 'esittely/lontoo-v2/lontoo-yksityiskohdat.json',
    koopenhamina: 'esittely/koopenhamina-v3/koopenhamina-yksityiskohdat.json',
    // 31 äänetöntä (Sisältökirjuri 8.10., erät 1–2; ankkurit tarkistettu esittely-aaneton-v3:sta).
    venetsia: 'esittely/venetsia-v1/venetsia-yksityiskohdat.json', barcelona: 'esittely/barcelona-v1/barcelona-yksityiskohdat.json',
    berliini: 'esittely/berliini-v2/berliini-yksityiskohdat.json', amsterdam: 'esittely/amsterdam-v1/amsterdam-yksityiskohdat.json',
    madrid: 'esittely/madrid-v1/madrid-yksityiskohdat.json', ateena: 'esittely/ateena-v1/ateena-yksityiskohdat.json',
    firenze: 'esittely/firenze-v1/firenze-yksityiskohdat.json',
    // erät 3–4 (8.10.)
    lissabon: 'esittely/lissabon-v1/lissabon-yksityiskohdat.json', tukholma: 'esittely/tukholma-v1/tukholma-yksityiskohdat.json',
    helsinki: 'esittely/helsinki-v2/helsinki-yksityiskohdat.json', budapest: 'esittely/budapest-v1/budapest-yksityiskohdat.json',
    // erät 5–6 (8.10.)
    edinburgh: 'esittely/edinburgh-v1/edinburgh-yksityiskohdat.json', dublin: 'esittely/dublin-v1/dublin-yksityiskohdat.json',
    krakova: 'esittely/krakova-v1/krakova-yksityiskohdat.json', sevilla: 'esittely/sevilla-v1/sevilla-yksityiskohdat.json',
    oslo: 'esittely/oslo-v1/oslo-yksityiskohdat.json',
    // erät 7–8 (8.10.)
    bryssel: 'esittely/bryssel-v1/bryssel-yksityiskohdat.json', marseille: 'esittely/marseille-v1/marseille-yksityiskohdat.json',
    bergen: 'esittely/bergen-v1/bergen-yksityiskohdat.json', granada: 'esittely/granada-v1/granada-yksityiskohdat.json',
    // erät 9–10 (8.10.)
    tampere: 'esittely/tampere-v1/tampere-yksityiskohdat.json', vilna: 'esittely/vilna-v1/vilna-yksityiskohdat.json',
    ljubljana: 'esittely/ljubljana-v1/ljubljana-yksityiskohdat.json', valletta: 'esittely/valletta-v1/valletta-yksityiskohdat.json',
    // erät 11–13 (8.10.): kaikki 31 äänetöntä valmiina
    sofia: 'esittely/sofia-v1/sofia-yksityiskohdat.json', bukarest: 'esittely/bukarest-v1/bukarest-yksityiskohdat.json',
    luxemburg: 'esittely/luxemburg-v1/luxemburg-yksityiskohdat.json', kosice: 'esittely/kosice-v1/kosice-yksityiskohdat.json',
    islanti: 'esittely/islanti-v1/islanti-yksityiskohdat.json', kreeta: 'esittely/kreeta-v1/kreeta-yksityiskohdat.json',
    sisilia: 'esittely/sisilia-v1/sisilia-yksityiskohdat.json',
  },
});
