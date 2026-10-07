/*
 * OPPAAN STAATTISTEN AINEISTOJEN INDEKSI (6.10.2026; Linssiseppä ja Siirtoseppä): GET /opas/aineistot kertoo, minkä
 * kaupunkien tiedostot ovat jo ämpärissä. Ämpärin objektit ovat muuttumattomia ja CDN välimuistittaa myös 404:n,
 * joten natiivi hakee tiedoston vain listatuille id:ille.
 *   tiet:       media.matkakirja.app/kartta/tiet-v1/<id>.json tai tiet_polut[id] (yövalot, Linssiseppä)
 *   esittely:   media.matkakirja.app/opas/esittely-v1/<id>.json (esigeneroitu kerronta; worker tarjoaa valmiin, natiivi ei hae)
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
  esittely: ['pariisi', 'praha', 'wien', 'rooma', 'lontoo', 'koopenhamina'],
});
