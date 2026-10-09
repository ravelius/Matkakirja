/*
 * OPPAAN STAATTISTEN AINEISTOJEN INDEKSI (6.10.2026; Linssiseppä ja Siirtoseppä): GET /opas/aineistot kertoo, minkä
 * kaupunkien tiedostot ovat jo ämpärissä. Ämpärin objektit ovat muuttumattomia ja CDN välimuistittaa myös 404:n,
 * joten natiivi hakee tiedoston vain listatuille id:ille.
 *   tiet:       media.matkakirja.app/kartta/tiet-v1/<id>.json tai tiet_polut[id] (yövalot, Linssiseppä)
 *   esittely:   media.matkakirja.app/opas/esittely-v1/<id>.json tai esittely_polut[id] (esigeneroitu kerronta; worker tarjoaa
 *               valmiin, natiivi lukee avauksen)
 *   historia:   historia_polut[id] (historia- ja arkiosiot lentojen ajaksi, kehityskaupungit 9.10.)
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
  // 9.10. (omistaja 8.10. 22.49 + 9.10. 08.2x "Käyttöön + Edinburgh"): 30 entistä äänetöntä kertojan äänin, opas/esittely-v2 (avaus.aani; aaneton: true pysyy → vain R2:n ääni).
  esittely_polut: {
    pariisi: 'opas/esittely-v1d/pariisi.json',   // v1d 9.10.: Concorden aukio ja Champs-Élysées katse_suunta 295 (LS1/PT kulma-arkki); v1c Concorden 5. kysymys "… kesällä 2024?" (Sisältökirjuri, PT), muuten v1
    praha: 'opas/esittely-v1b/praha.json', wien: 'opas/esittely-v1b/wien.json',
    amsterdam: 'opas/esittely-v2/amsterdam.json',
    ateena: 'opas/esittely-v2/ateena.json',
    barcelona: 'opas/esittely-v2/barcelona.json',
    bergen: 'opas/esittely-v2/bergen.json',
    berliini: 'opas/esittely-v2/berliini.json',
    bryssel: 'opas/esittely-v2/bryssel.json',
    budapest: 'opas/esittely-v2/budapest.json',
    bukarest: 'opas/esittely-v2/bukarest.json',
    dublin: 'opas/esittely-v2/dublin.json',
    edinburgh: 'opas/esittely-v2/edinburgh.json',
    firenze: 'opas/esittely-v2/firenze.json',
    granada: 'opas/esittely-v2/granada.json',
    helsinki: 'opas/esittely-v2/helsinki.json',
    islanti: 'opas/esittely-v2/islanti.json',
    kosice: 'opas/esittely-v2/kosice.json',
    krakova: 'opas/esittely-v2/krakova.json',
    kreeta: 'opas/esittely-v2/kreeta.json',
    lissabon: 'opas/esittely-v2/lissabon.json',
    ljubljana: 'opas/esittely-v2/ljubljana.json',
    luxemburg: 'opas/esittely-v2/luxemburg.json',
    madrid: 'opas/esittely-v2/madrid.json',
    marseille: 'opas/esittely-v2/marseille.json',
    oslo: 'opas/esittely-v2/oslo.json',
    sevilla: 'opas/esittely-v2/sevilla.json',
    sisilia: 'opas/esittely-v2/sisilia.json',
    sofia: 'opas/esittely-v2/sofia.json',
    tampere: 'opas/esittely-v2/tampere.json',
    tukholma: 'opas/esittely-v3b/tukholma.json',   // v3b 9.10.: Vasa-museo katse_suunta 40 (veden puolelta, LS1/PT, juna 174). v3 9.10. omistaja: kohteita lähempää; v2 + 5 lähikohdetta, kierros 14 kohdetta lyhimpänä reittinä (v2: avaus + 14 kohdetta), aaneton: true pysyy (vain R2:n ääni)
    valletta: 'opas/esittely-v2/valletta.json',
    venetsia: 'opas/esittely-v2/venetsia.json',
    vilna: 'opas/esittely-v2/vilna.json',
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
    firenze: 'esittely/firenze-v2/firenze-yksityiskohdat.json',
    // erät 3–4 (8.10.)
    lissabon: 'esittely/lissabon-v1/lissabon-yksityiskohdat.json', tukholma: 'esittely/tukholma-v5/tukholma-yksityiskohdat.json',   // v5 9.10.: + Kuninkaanlinnan aarrekammio ja Erik XIV:n kruunu
    helsinki: 'esittely/helsinki-v2/helsinki-yksityiskohdat.json', budapest: 'esittely/budapest-v1/budapest-yksityiskohdat.json',
    // erät 5–6 (8.10.)
    edinburgh: 'esittely/edinburgh-v1/edinburgh-yksityiskohdat.json', dublin: 'esittely/dublin-v1/dublin-yksityiskohdat.json',
    krakova: 'esittely/krakova-v1/krakova-yksityiskohdat.json', sevilla: 'esittely/sevilla-v1/sevilla-yksityiskohdat.json',
    oslo: 'esittely/oslo-v1/oslo-yksityiskohdat.json',
    // erät 7–8 (8.10.)
    bryssel: 'esittely/bryssel-v1/bryssel-yksityiskohdat.json', marseille: 'esittely/marseille-v1/marseille-yksityiskohdat.json',
    bergen: 'esittely/bergen-v2/bergen-yksityiskohdat.json', granada: 'esittely/granada-v2/granada-yksityiskohdat.json',
    // erät 9–10 (8.10.)
    tampere: 'esittely/tampere-v3/tampere-yksityiskohdat.json', vilna: 'esittely/vilna-v3/vilna-yksityiskohdat.json',
    ljubljana: 'esittely/ljubljana-v2/ljubljana-yksityiskohdat.json', valletta: 'esittely/valletta-v2/valletta-yksityiskohdat.json',
    // erät 11–13 (8.10.): kaikki 31 äänetöntä valmiina
    sofia: 'esittely/sofia-v2/sofia-yksityiskohdat.json', bukarest: 'esittely/bukarest-v2/bukarest-yksityiskohdat.json',
    luxemburg: 'esittely/luxemburg-v2/luxemburg-yksityiskohdat.json', kosice: 'esittely/kosice-v2/kosice-yksityiskohdat.json',
    islanti: 'esittely/islanti-v2/islanti-yksityiskohdat.json', kreeta: 'esittely/kreeta-v2/kreeta-yksityiskohdat.json',
    sisilia: 'esittely/sisilia-v4/sisilia-yksityiskohdat.json',
  },
  // Klikattavat lisäkuvat ilman ankkuria (Sisältökirjuri 9.10.; NUI näyttää lisäkuvina):
  // [{ kohde_id, nimi, kuvat: [{ kuvateksti, url, lisenssi, tekija, media_url, paketti_leveys, paketti_korkeus, jarjestys }] }].
  lisakuvat_polut: {
    tukholma: 'esittely/tukholma-lisakuvat-v2/tukholma-lisakuvat.json',
  },
  // Historia- ja arkiosiot lentojen ajaksi (omistaja 9.10.: vähemmän taukoja ja pelkkiä siirtymiä; kehityskaupungit):
  // { kaupunki, versio, osiot: [{ tunnus, otsikko, teksti, sha, kesto_s, lahteet }] }, ääni R2 opas/<sha>.mp3|pcm|ajat.json.
  historia_polut: {
    tukholma: 'opas/historia-v1/tukholma.json', pariisi: 'opas/historia-v1/pariisi.json',
  },
  // Historiaosioiden yksityiskohtakuvat (Sisältökirjuri 9.10.): kohde_id = osion tunnus, ankkuri osion tekstissä.
  historia_yksityiskohdat_polut: {
    tukholma: 'esittely/tukholma-historia-v1/tukholma-historia-yksityiskohdat.json',
    pariisi: 'esittely/pariisi-historia-v1/pariisi-historia-yksityiskohdat.json',
  },
});
