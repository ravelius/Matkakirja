/*
 * OPPAAN STAATTISTEN AINEISTOJEN INDEKSI (6.10.2026; Linssiseppä ja Siirtoseppä): GET /opas/aineistot kertoo, minkä
 * kaupunkien tiedostot ovat jo ämpärissä. Ämpärin objektit ovat muuttumattomia ja CDN välimuistittaa myös 404:n,
 * joten natiivi hakee tiedoston vain listatuille id:ille.
 *   tiet:       media.matkakirja.app/kartta/tiet-v1/<id>.json     (yövalot, Linssiseppä)
 *   aanikartta: media.matkakirja.app/aanet/aanikartta-v1/<id>.json (kaupunkiäänimaisema, Siirtoseppä; lisätään vasta,
 *               kun kaupungin silmukat ovat ämpärissä)
 * Id: kaupungin nimi pienaakkosin, ä/å → a, ö/ø → o, é → e, välit ja muut merkit → "-" (pariisi, koopenhamina).
 * Lista päivitetään tähän jokaisen viennin jälkeen (Pelikoodari).
 */
export const OPAS_AINEISTOT = Object.freeze({
  tiet: ['pariisi', 'venetsia', 'koopenhamina', 'ateena', 'rooma', 'lontoo', 'amsterdam'],   // vienti 6.10. (kartta-tiet-vienti-20261006)
  aanikartta: [],
});
