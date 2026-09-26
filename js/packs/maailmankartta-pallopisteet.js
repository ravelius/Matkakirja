/*
 * KAUPUNGIN OMA PISTE PALLOLLA — todellinen lat/lon vain karttapalloa
 * varten.
 *
 * Omistajan vikailmoitus 7.9.2026 (iPad, sanatarkasti): *"Helsinki
 * näyttää, että se on aivan liian kaukana rannikosta."* Syy mitattiin
 * (docs/moduulit/karttapallo.md luku 12.2): laudan projektio ja sen
 * kalibrointi ovat oikein — 228 kaupungin jäännösten mediaani on
 * +0,008° leveyttä ja −0,002° pituutta — mutta KAUPUNGIN OMA x/y on
 * käsin sommiteltu. Euroopan laudalla Helsinki on x 688, y 303, ja
 * laudan kaava lukee siitä 60,479° N, kun todellinen on 60,171° N:
 * 34,7 km sisämaahan, ja juuri sen verran nappula seisoi Suomenlahden
 * rannan sisäpuolella.
 *
 * PÄÄTOIMITTAJAN PÄÄTÖS 7.9.2026: laudan x/y EI muutu. Reittien pituus
 * (`steps`), välipisteet (`via`), merireittien ranta
 * (tools/satamat-rannalle.mjs) ja vähimmäisväli (`minCityDistance`)
 * riippuvat siitä, eikä pelin geometriaa siirretä kuvavirheen takia.
 * Sen sijaan kaupunki saa OMAN pallokoordinaatin, jota vain pallolauta
 * lukee (js/pallo.js pallonOmatPisteet). Tasokartta, reitinhaku ja
 * tallennus näkevät laudan ennallaan.
 *
 * LÄHDE ON WIKIDATA (wdt:P625), haettu 7.9.2026 kaupungin oman
 * `wiki`-kentän (fi-Wikipedian artikkelin nimi) kautta työkalulla
 * tools/tarkista-laudan-pisteet.mjs. Koordinaatti on pyöristetty
 * kolmeen desimaaliin (~100 m), ja kommentissa on se etäisyys, jonka
 * piste siirtyy laudan omasta paikastaan.
 *
 * MUKANA VAIN ASUTUKSET. Työkalu lippuu yli 15 km:n poikkeamat, mutta
 * osa laudan pisteistä on ALUEITA, joiden Wikidata-koordinaatti on
 * alueen keskipiste eikä se kohta, jota lauta tarkoittaa: Borneo,
 * Kamtšatkan niemimaa, Ahaggar, Namib, Nullarbor, Victoria-järvi,
 * Tanganjikajärvi, Tšadjärvi, Sepik, Galápagossaaret, Falklandinsaaret,
 * Bali, Saint Helena, Bananal, Havaiji, Sierra Leone, Siinai, Uluru,
 * Mount Rushmore, Victorian putoukset, Milford Sound, Kap Palmas ja
 * Bahr el Ghazal. Niitä EI siirretä. Kaksi jäi tarkoituksella pois
 * epäselvinä: `mosambik` (laudan nimi on alue "Mosambik", wiki-sivu
 * kaupunki "Mosambikin saari", ja laudan piste on Beiran rannikolla —
 * 823 km) ja `orjarannikko` (laudan nimi on rannikkoalue
 * "Orjarannikko", wiki-sivu kaupunki "Ouidah" — 292 km). Kummankin
 * ratkaisu on tarinan asia, ei koneen.
 *
 * TOINEN KIERROS 7.9.2026 ILLALLA (omistaja: *"samalla tarkastaa onko
 * kaikki kaupungit oikealla paikalla"*). Sama ajo raja 15 km jätti
 * ensimmäisellä kierroksella neljä ASUTUSTA korjaamatta — ne ovat nyt
 * mukana: Hongkong 60,4 km, San Juan 42 km, Santa Fe 120,6 km ja
 * Singapore 59,8 km. Loput 40 yli rajan olevaa ovat ALUEITA (edellisen
 * kappaleen luettelo sekä Sumatra, Sisilia, Kreeta, Kappadokia,
 * Madagaskar, Sansibar, Darfur, Sahara, Sahalin, Kongo (wiki-sivu on
 * joki), Kamerun (wiki-sivu on Kamerunvuori), Angola, Sierra Leone,
 * Islanti, Alpit, Appalakit, Kilimandžaro, Labrador, Rub al-Khali,
 * Milford Sound, Galápagos, Falkland, Bali ja Bananal): niiden
 * Wikidata-piste on alueen keskipiste, ei se kohta jota lauta
 * tarkoittaa. Mosambik ja Orjarannikko jäävät yhä tarinan ratkaistaviksi.
 *
 * KOLMAS KIERROS 19.9.2026 (Fablen päätös klo 19.50, erä H, raportti
 * docs/raportit/viesti-fable-kaupunkisiirtymat-20260919.md): kuusi
 * PISTEMÄISTÄ kohdetta siirrettiin alueista asutusten joukkoon, koska
 * niissä laudan tarkoitus on juuri Wikidatan piste — Sansibar (Stone
 * Town; fi-sivun piste on saaren keskipiste, joten kaupungin piste
 * otettiin en-Wikipediasta), Victorian putoukset, Mount Rushmore,
 * Kilimandžaro (huippu), Uluru ja Milford Sound.
 *
 * NELJÄS KIERROS 23.9.2026 (Siirtosepän 163 kaupungin ehdotus,
 * docs/raportit/kaupunkien-latlon-20260923.md/.tsv; Fablen päätökset
 * samana päivänä): loput 163 kaupunkia saivat pisteen — 129 pistettä
 * Wikidatasta ja 34 aluetta laudan omalla pisteellä (sama linjaus kuin
 * 7.9.2026: alueita ei siirretä pallolla, mutta vienti tarvitsee silti
 * pisteen). Erikseen ratkaistiin viisi tapausta: Mosambik on Ilha de
 * Moçambique (kaupunkisaari, ei laudan alue-Mosambik), Orjarannikko on
 * alue (Ouidah–Lagosin rannikko, tarinateksti käsittelee nimenomaan
 * Ouidahia — vahvistettu docs/tarina.md ja js/packs/africa-saapumiset.js
 * ja -kulttuuri.js), Kamerun on Kamerun-joen suisto eli Douala
 * (Sisältökirjuri tarkisti: saapumistekstin "Kamerunvuori nousee
 * suoraan merestä" kuvaa juuri merenrantanäkymää), ja Kap Palmas sekä
 * Ras Hafun ovat niemien kärkiä (7.9. alue-sääntö ei koske niemiä).
 * Yhdeksän kaupunkia (gao, kappalmas, viktoria, bahrelghazal, rashafun,
 * sanambrosio, birdsville, exmouth, cooberpedy) mitattiin en-Wikipedian
 * kautta, koska fi-Wikipediasta ei löydy täsmäävää sivua tai kaupungin
 * `wiki`-kenttä osoittaa täsmennyssivulle. NÄIDEN `wiki`-KENTTIÄ EI OLE
 * VIELÄ KORJATTU js/packs/africa.js:ssä eikä koneen kirjoittamassa
 * js/packs/maailmankartta.js:ssä (vaatisi tools/tee-maailmankartta.mjs
 * -ajon NE_LAND-geodatalla): tools/tarkista-laudan-pisteet.mjs jatkaa
 * siis raportoimatta näitä yhdeksää, kunnes joku uusintaa laudan.
 *
 * Vartio: tools/tarkista-laudan-pisteet.mjs lukee tämän kentän ja
 * vaatii, että yli 15 km:n poikkeamia jää vain alueille.
 */

/** Kaupungin id → { lat, lon } asteina (Wikidata P625, 7.9.2026–23.9.2026). */
export const PALLON_KAUPUNKIPISTEET = {
  addisabeba: { lat: 9.036, lon: 38.752 },    // Addis Abeba, 3 km
  adelaide: { lat: -34.928, lon: 138.6 },     // Adelaide, 36,4 km
  aden: { lat: 12.8, lon: 45.033 },           // Aden, 1 km
  ahaggar: { lat: 21.44, lon: 3.401 },        // Ahaggar (alue, laudan oma piste — 7.9.2026 linjaus)
  alicesprings: { lat: -23.7, lon: 133.867 }, // Alice Springs, 3 km
  alkufra: { lat: 24.183, lon: 23.283 },      // Al Kufra, 6 km
  alpit: { lat: 47.666, lon: 7.334 },         // Alpit (alue, laudan oma piste — 7.9.2026 linjaus)
  amsterdam: { lat: 52.367, lon: 4.883 },     // Amsterdam, 2 km
  anchorage: { lat: 61.217, lon: -149.894 },  // Anchorage, 2 km
  angola: { lat: -12.001, lon: 16.001 },      // Angola (alue, laudan oma piste — 7.9.2026 linjaus)
  ankara: { lat: 39.936, lon: 32.839 },       // Ankara, 2 km
  antofagasta: { lat: -23.646, lon: -70.398 }, // Antofagasta, 40,9 km
  appalakit: { lat: 37.501, lon: -80.5 },     // Appalakit (alue, laudan oma piste — 7.9.2026 linjaus)
  astana: { lat: 51.133, lon: 71.433 },       // Astana, 8 km
  asuncion: { lat: -25.28, lon: -57.634 },    // Asunción, 2 km
  ateena: { lat: 37.984, lon: 23.728 },       // Ateena, 2 km
  auckland: { lat: -36.849, lon: 174.765 },   // Auckland, 6 km
  bagdad: { lat: 33.315, lon: 44.366 },       // Bagdad, 1 km
  bahrelghazal: { lat: 7.999, lon: 27.026 },  // Bahr el Ghazal (alue, laudan oma piste — 7.9.2026 linjaus)
  bali: { lat: -8.5, lon: 115.1 },            // Bali (alue, laudan oma piste — 7.9.2026 linjaus)
  bananal: { lat: -10.801, lon: -50.161 },    // Ilha do Bananal (alue, laudan oma piste — 7.9.2026 linjaus)
  bangkok: { lat: 13.75, lon: 100.517 },      // Bangkok, 6 km
  barcelona: { lat: 41.388, lon: 2.17 },      // Barcelona, 44 km
  bergen: { lat: 60.392, lon: 5.323 },        // Bergen, 0 km
  berliini: { lat: 52.517, lon: 13.383 },     // Berliini, 2 km
  bermuda: { lat: 32.32, lon: -64.74 },       // Bermuda, 3 km
  birdsville: { lat: -25.899, lon: 139.352 }, // Birdsville (en-Wikipedia), 5 km
  boavista: { lat: 2.82, lon: -60.672 },      // Boa Vista, 0 km
  bogota: { lat: 4.61, lon: -74.082 },        // Bogotá, 11 km
  borneo: { lat: 1.551, lon: 110.3 },         // Borneo (alue, laudan oma piste — 7.9.2026 linjaus)
  brisbane: { lat: -27.468, lon: 153.028 },   // Brisbane, 42,9 km
  broome: { lat: -17.962, lon: 122.236 },     // Broome, 18,5 km
  bryssel: { lat: 50.847, lon: 4.353 },       // Bryssel, 0 km
  budapest: { lat: 47.492, lon: 19.051 },     // Budapest, 79,1 km
  buenosaires: { lat: -34.608, lon: -58.373 }, // Buenos Aires, 34,5 km
  bukarest: { lat: 44.413, lon: 26.098 },     // Bukarest, 2 km
  cairns: { lat: -16.926, lon: 145.775 },     // Cairns, 18,8 km
  campogrande: { lat: -20.469, lon: -54.622 }, // Campo Grande, 2 km
  caphorn: { lat: -55.98, lon: -67.289 },     // Kap Horn, 9 km
  caracas: { lat: 10.496, lon: -66.898 },     // Caracas, 32,8 km
  cayenne: { lat: 4.939, lon: -52.332 },      // Cayenne, 48,6 km
  chennai: { lat: 13.084, lon: 80.27 },       // Chennai, 53,2 km
  chicago: { lat: 41.882, lon: -87.628 },     // Chicago, 3 km
  christchurch: { lat: -43.531, lon: 172.636 }, // Christchurch, 65,4 km
  churchill: { lat: 58.767, lon: -94.167 },   // Churchill, 15,7 km
  colombo: { lat: 6.934, lon: 79.843 },       // Colombo, 96,1 km
  cooberpedy: { lat: -29.014, lon: 134.755 }, // Coober Pedy (en-Wikipedia), 5 km
  dakar: { lat: 14.683, lon: -17.433 },       // Dakar, 88,2 km
  damaskos: { lat: 33.513, lon: 36.292 },     // Damaskos, 4 km
  darfur: { lat: 14.559, lon: 23.126 },       // Darfur (alue, laudan oma piste — 7.9.2026 linjaus)
  darwin: { lat: -12.438, lon: 130.841 },     // Darwin, 26,6 km
  delhi: { lat: 28.61, lon: 77.23 },          // Delhi, 71,4 km
  denver: { lat: 39.739, lon: -104.985 },     // Denver, 5 km
  dili: { lat: -8.554, lon: 125.578 },        // Dili, 27,6 km
  doha: { lat: 25.286, lon: 51.529 },         // Doha, 1 km
  dubai: { lat: 25.25, lon: 55.283 },         // Dubai, 51,9 km
  dublin: { lat: 53.35, lon: -6.26 },         // Dublin, 2 km
  dubrovnik: { lat: 42.64, lon: 18.108 },     // Dubrovnik, 10 km
  dunedin: { lat: -45.874, lon: 170.504 },    // Dunedin, 1 km
  edinburgh: { lat: 55.953, lon: -3.189 },    // Edinburgh, 0 km
  exmouth: { lat: -21.933, lon: 114.128 },    // Exmouth (en-Wikipedia), 89 km
  falkland: { lat: -51.879, lon: -59.083 },   // Falkland (alue, laudan oma piste — 7.9.2026 linjaus)
  fes: { lat: 34.043, lon: -5.003 },          // Fès, 3 km
  firenze: { lat: 43.771, lon: 11.254 },      // Firenze, 0 km
  galapagos: { lat: -0.741, lon: -90.301 },   // Galápagos (alue, laudan oma piste — 7.9.2026 linjaus)
  gao: { lat: 16.267, lon: -0.05 },           // Gao (en-Wikipedia), 374 km
  geraldton: { lat: -28.779, lon: 114.614 },  // Geraldton, 120,2 km
  granada: { lat: 37.175, lon: -3.6 },        // Granada, 1 km
  grandcanyon: { lat: 36.097, lon: -112.095 }, // Grand Canyon, 0 km
  guatemala: { lat: 14.623, lon: -90.531 },   // Guatemala, 31 km
  halab: { lat: 36.2, lon: 37.16 },           // Aleppo, 1 km
  halifax: { lat: 44.646, lon: -63.574 },     // Halifax, 31,4 km
  hanoi: { lat: 21.024, lon: 105.841 },       // Hanoi, 5 km
  havanna: { lat: 23.133, lon: -82.367 },     // Havanna, 276,4 km
  hawaii: { lat: 20, lon: -156.301 },         // Havaiji (alue, laudan oma piste — 7.9.2026 linjaus)
  helsinki: { lat: 60.171, lon: 24.938 },     // Helsinki, 34,7 km
  hobart: { lat: -42.883, lon: 147.317 },     // Hobart, 32,9 km
  hongkong: { lat: 22.278, lon: 114.159 },    // Hongkong, 60,4 km
  honiara: { lat: -9.433, lon: 159.95 },      // Honiara, 7 km
  houston: { lat: 29.763, lon: -95.383 },     // Houston, 36,2 km
  iguazu: { lat: -25.695, lon: -54.437 },     // Iguazú, 1 km
  iqaluit: { lat: 63.749, lon: -68.52 },      // Iqaluit, 338,9 km
  iquitos: { lat: -3.733, lon: -73.25 },      // Iquitos, 2 km
  irkutsk: { lat: 52.289, lon: 104.28 },      // Irkutsk, 2 km
  isfahan: { lat: 32.653, lon: 51.675 },      // Isfahan, 2 km
  islanti: { lat: 64.15, lon: -21.82 },       // Islanti (alue, laudan oma piste — 7.9.2026 linjaus)
  istanbul: { lat: 41.01, lon: 28.96 },       // Istanbul, 5 km
  izmir: { lat: 38.413, lon: 27.138 },        // Izmir, 2 km
  jakarta: { lat: -6.21, lon: 106.845 },      // Jakarta, 27,2 km
  jakutsk: { lat: 62.027, lon: 129.732 },     // Jakutsk, 3 km
  jekaterinburg: { lat: 56.836, lon: 60.613 }, // Jekaterinburg, 4 km
  jerusalem: { lat: 31.783, lon: 35.217 },    // Jerusalem, 50,3 km
  joaopessoa: { lat: -7.12, lon: -34.88 },    // João Pessoa, 36,4 km
  kabul: { lat: 34.533, lon: 69.166 },        // Kabul, 5 km
  kairo: { lat: 30.044, lon: 31.236 },        // Kairo, 5 km
  kalgoorlie: { lat: -30.749, lon: 121.466 }, // Kalgoorlie, 6 km
  kamerun: { lat: 4.05, lon: 9.7 },           // Kamerun (Kamerun-joen suisto / Douala — Fablen päätös 23.9.2026), 193 km
  kamtsatka: { lat: 52.999, lon: 158.72 },    // Kamtšatka (alue, laudan oma piste — 7.9.2026 linjaus)
  kano: { lat: 12, lon: 8.517 },              // Kano, 167,6 km
  kanton: { lat: 23.109, lon: 113.265 },      // Kanton, 473,3 km
  kapadokia: { lat: 38.355, lon: 35.039 },    // Kappadokia (alue, laudan oma piste — 7.9.2026 linjaus)
  kapkaupunki: { lat: -33.925, lon: 18.425 }, // Kapkaupunki, 119,4 km
  kappalmas: { lat: 4.376, lon: -7.717 },     // Kap Palmas (en-Wikipedia; niemen kärki — Fablen päätös 23.9.2026), 97 km
  karachi: { lat: 24.86, lon: 67.01 },        // Karachi, 18 km
  karthago: { lat: 36.887, lon: 10.315 },     // Karthago, 184,3 km
  kashgar: { lat: 39.45, lon: 75.983 },       // Kašgar, 9 km
  kathmandu: { lat: 27.7, lon: 85.333 },      // Kathmandu, 74,3 km
  kilimandzaro: { lat: -3.067, lon: 37.359 }, // Kilimanjaro (huippu), 139,8 km — 19.9.
  kimberley: { lat: -28.738, lon: 24.764 },   // Kimberley, 2 km
  kioto: { lat: 35.012, lon: 135.768 },       // Kioto, 187,9 km
  kiova: { lat: 50.45, lon: 30.524 },         // Kiova, 1 km
  kobenhavn: { lat: 55.676, lon: 12.569 },    // Kööpenhamina, 2 km
  kolkata: { lat: 22.567, lon: 88.37 },       // Kolkata, 5 km
  kongo: { lat: -4.8, lon: 13.001 },          // Kongo (alue, laudan oma piste — 7.9.2026 linjaus)
  kosice: { lat: 48.717, lon: 21.25 },        // Košice, 1 km
  krakova: { lat: 50.061, lon: 19.937 },      // Krakova, 0 km
  kreeta: { lat: 35.294, lon: 25.304 },       // Kreeta (alue, laudan oma piste — 7.9.2026 linjaus)
  kumasi: { lat: 6.683, lon: -1.617 },        // Kumasi, 127 km
  kuwait: { lat: 29.375, lon: 47.98 },        // Kuwait, 14 km
  labrador: { lat: 53.3, lon: -60.4 },        // Labrador (alue, laudan oma piste — 7.9.2026 linjaus)
  lagos: { lat: 6.441, lon: 3.418 },          // Lagos, 411,6 km
  lalibela: { lat: 12.036, lon: 39.046 },     // Lalibela, 1 km
  lappi: { lat: 66.503, lon: 25.728 },        // Rovaniemi, 2 km
  lhasa: { lat: 29.654, lon: 91.117 },        // Lhasa, 139,3 km
  lima: { lat: -12.06, lon: -77.037 },        // Lima, 60,7 km
  lissabon: { lat: 38.708, lon: -9.139 },     // Lissabon, 3 km
  ljubljana: { lat: 46.051, lon: 14.506 },    // Ljubljana, 1 km
  lontoo: { lat: 51.507, lon: -0.128 },       // Lontoo, 1 km
  losangeles: { lat: 34.05, lon: -118.25 },   // Los Angeles, 17,3 km
  luxemburg: { lat: 49.611, lon: 6.13 },      // Luxemburg, 0 km
  luxor: { lat: 25.697, lon: 32.644 },        // Luxor, 1 km
  macapa: { lat: 0.034, lon: -51.066 },       // Macapá, 32 km
  machupicchu: { lat: -13.163, lon: -72.546 }, // Machu Picchu, 27 km
  madagaskar: { lat: -19.426, lon: 48.902 },  // Madagaskar (alue, laudan oma piste — 7.9.2026 linjaus)
  madrid: { lat: 40.417, lon: -3.703 },       // Madrid, 2 km
  magadan: { lat: 59.567, lon: 150.8 },       // Magadan, 4 km
  managua: { lat: 12.136, lon: -86.251 },     // Managua, 29,7 km
  manaus: { lat: -3.119, lon: -60.022 },      // Manaus, 0 km
  mandalay: { lat: 21.983, lon: 96.084 },     // Mandalay, 4 km
  manila: { lat: 14.583, lon: 120.967 },      // Manila, 102,1 km
  marrakech: { lat: 31.635, lon: -8 },        // Marrakech, 282,5 km
  marseille: { lat: 43.297, lon: 5.381 },     // Marseille, 47,3 km
  masqat: { lat: 23.614, lon: 58.592 },       // Masqat, 4 km
  medina: { lat: 24.47, lon: 39.61 },         // Medina, 1 km
  mekka: { lat: 21.422, lon: 39.826 },        // Mekka, 3 km
  melbourne: { lat: -37.814, lon: 144.963 },  // Melbourne, 46,2 km
  merida: { lat: 20.97, lon: -89.62 },        // Mérida, 109,9 km
  mexico: { lat: 19.411, lon: -99.131 },      // Mexico City, 21,5 km
  miami: { lat: 25.788, lon: -80.224 },       // Miami, 66,1 km
  milfordsound: { lat: -44.617, lon: 167.867 }, // Milford Sound, 81,3 km — 19.9.
  monterrey: { lat: 25.684, lon: -100.318 },  // Monterrey, 3 km
  montevideo: { lat: -34.906, lon: -56.191 }, // Montevideo, 17,8 km
  montreal: { lat: 45.546, lon: -73.639 },    // Montreal, 75,2 km
  mosambik: { lat: -15.037, lon: 40.733 },    // Mosambik (Ilha de Moçambique — Fablen päätös 23.9.2026), 823 km
  moskova: { lat: 55.751, lon: 37.617 },      // Moskova, 2 km
  mosul: { lat: 36.342, lon: 43.129 },        // Mosul, 1 km
  mountisa: { lat: -20.725, lon: 139.495 },   // Mount Isa, 3 km
  mountrushmore: { lat: 43.879, lon: -103.459 }, // Mount Rushmore, 162,1 km — 19.9.
  mumbai: { lat: 18.975, lon: 72.826 },       // Mumbai, 16 km
  murzuk: { lat: 25.916, lon: 13.918 },       // Murzuk, 241,9 km
  nairobi: { lat: -1.283, lon: 36.817 },      // Nairobi, 418,7 km
  namib: { lat: -23.6, lon: 15.626 },         // Namib (alue, laudan oma piste — 7.9.2026 linjaus)
  neworleans: { lat: 29.95, lon: -90.067 },   // New Orleans, 46,4 km
  newyork: { lat: 40.67, lon: -73.94 },       // New York, 33,6 km
  nikosia: { lat: 35.172, lon: 33.365 },      // Nikosia, 2 km
  nome: { lat: 64.504, lon: -165.399 },       // Nome, 39,7 km
  norfolk: { lat: -29.033, lon: 167.95 },     // Norfolk, 2 km
  noumea: { lat: -22.267, lon: 166.45 },      // Nouméa, 9 km
  novosibirsk: { lat: 55.033, lon: 82.917 },  // Novosibirsk, 4 km
  nullarbor: { lat: -31.4, lon: 130.001 },    // Nullarbor (alue, laudan oma piste — 7.9.2026 linjaus)
  nuuk: { lat: 64.167, lon: -51.733 },        // Nuuk, 56,8 km
  odessa: { lat: 46.477, lon: 30.733 },       // Odessa, 11 km
  orjarannikko: { lat: 8.321, lon: 3.851 },   // Orjarannikko (alue, Ouidah–Lagosin rannikko — Fablen päätös 23.9.2026)
  oslo: { lat: 59.913, lon: 10.739 },         // Oslo, 2 km
  ouropreto: { lat: -20.385, lon: -43.504 },  // Ouro Preto, 168,7 km
  panama: { lat: 8.988, lon: -79.519 },       // Panama, 30,7 km
  pariisi: { lat: 48.857, lon: 2.352 },       // Pariisi, 2 km
  peking: { lat: 39.904, lon: 116.408 },      // Peking, 1 km
  persepolis: { lat: 29.935, lon: 52.89 },    // Persepolis, 2 km
  perth: { lat: -31.956, lon: 115.86 },       // Perth, 45,1 km
  petra: { lat: 30.329, lon: 35.442 },        // Petra, 86,4 km
  pietari: { lat: 59.95, lon: 30.317 },       // Pietari, 1 km
  portmoresby: { lat: -9.479, lon: 147.149 }, // Port Moresby, 35,2 km
  portoalegre: { lat: -30.033, lon: -51.23 }, // Porto Alegre, 44,1 km
  portovelho: { lat: -8.762, lon: -63.904 },  // Porto Velho, 0 km
  portvila: { lat: -17.733, lon: 168.317 },   // Port Vila, 4 km
  praha: { lat: 50.087, lon: 14.421 },        // Praha, 1 km
  puertomontt: { lat: -41.472, lon: -72.94 }, // Puerto Montt, 29,3 km
  puntaarenas: { lat: -53.163, lon: -70.908 }, // Punta Arenas, 80,9 km
  quito: { lat: -0.22, lon: -78.513 },        // Quito, 7 km
  rashafun: { lat: 10.419, lon: 51.275 },     // Ras Hafun (en-Wikipedia; niemen kärki — Fablen päätös 23.9.2026), 86 km
  riad: { lat: 24.65, lon: 46.71 },           // Riad, 4 km
  riika: { lat: 56.947, lon: 24.105 },        // Riika, 236,1 km
  rio: { lat: -22.911, lon: -43.206 },        // Rio de Janeiro, 30,6 km
  robinsoncrusoe: { lat: -33.641, lon: -78.841 }, // Robinson Crusoe, 7 km
  rooma: { lat: 41.893, lon: 12.483 },        // Rooma, 1 km
  rubalkhali: { lat: 20.495, lon: 50.999 },   // Rub al-Khali (alue, laudan oma piste — 7.9.2026 linjaus)
  sahalin: { lat: 50, lon: 142.7 },           // Sahalin (alue, laudan oma piste — 7.9.2026 linjaus)
  sahara: { lat: 26.561, lon: 8.501 },        // Sahara (alue, laudan oma piste — 7.9.2026 linjaus)
  salalah: { lat: 17.02, lon: 54.09 },        // Salalah, 15 km
  salta: { lat: -24.788, lon: -65.411 },      // Salta, 0 km
  salvador: { lat: -12.983, lon: -38.493 },   // Salvador, 38,9 km
  samarkand: { lat: 39.655, lon: 66.976 },    // Samarkand, 8 km
  sana: { lat: 15.35, lon: 44.2 },            // Sana, 1 km
  sanambrosio: { lat: -26.32, lon: -80 },     // San Ambrosio (en-Wikipedia), 10 km
  sanfrancisco: { lat: 37.779, lon: -122.419 }, // San Francisco, 23,5 km
  sanjuan: { lat: 18.465, lon: -66.117 },     // San Juan, 42 km
  sansibar: { lat: -6.162, lon: 39.191 },     // Stone Town (en-Wikipedia), 530,8 km laudan pisteestä — 19.9.
  santacruz: { lat: -17.789, lon: -63.197 },  // Santa Cruz, 2 km
  santafe: { lat: 35.667, lon: -105.967 },    // Santa Fe, 120,6 km
  santarem: { lat: -2.443, lon: -54.708 },    // Santarém, 0 km
  saoluis: { lat: -2.53, lon: -44.303 },      // São Luís, 66 km
  saopaulo: { lat: -23.55, lon: -46.634 },    // São Paulo, 183,6 km
  sarajevo: { lat: 43.867, lon: 18.417 },     // Sarajevo, 127,5 km
  sepik: { lat: -4.5, lon: 143.201 },         // Sepik (alue, laudan oma piste — 7.9.2026 linjaus)
  sevilla: { lat: 37.389, lon: -5.995 },      // Sevilla, 1 km
  shanghai: { lat: 31.224, lon: 121.476 },    // Shanghai, 93,1 km
  sierraleone: { lat: 8.64, lon: -12.874 },   // Sierra Leone (alue, laudan oma piste — 7.9.2026 linjaus)
  siinai: { lat: 28.558, lon: 33.959 },       // Siinai (alue, laudan oma piste — 7.9.2026 linjaus)
  singapore: { lat: 1.3, lon: 103.8 },        // Singapore, 59,8 km
  sisilia: { lat: 38.123, lon: 13.376 },      // Sisilia (alue, laudan oma piste — 7.9.2026 linjaus)
  sitka: { lat: 57.052, lon: -135.339 },      // Sitka, 89,4 km
  sofia: { lat: 42.698, lon: 23.322 },        // Sofia, 2 km
  soul: { lat: 37.56, lon: 126.99 },          // Soul, 4 km
  sthelena: { lat: -13.76, lon: -4.624 },     // St. Helena (alue, laudan oma piste — 7.9.2026 linjaus)
  stjohns: { lat: 47.577, lon: -52.701 },     // St. John’s, 156,3 km
  suakin: { lat: 19.102, lon: 37.33 },        // Suakin, 4 km
  sumatra: { lat: 4.2, lon: 97.601 },         // Sumatra (alue, laudan oma piste — 7.9.2026 linjaus)
  suva: { lat: -18.133, lon: 178.433 },       // Suva, 64,1 km
  sydney: { lat: -33.868, lon: 151.21 },      // Sydney, 35,5 km
  tabriz: { lat: 38.074, lon: 46.296 },       // Tabriz, 2 km
  taipei: { lat: 25.033, lon: 121.633 },      // Taipei, 131,5 km
  tallinna: { lat: 59.439, lon: 24.754 },     // Tallinna, 184,7 km
  tampere: { lat: 61.498, lon: 23.76 },       // Tampere, 0 km
  tanganjika: { lat: -7.361, lon: 29.126 },   // Tanganjika (alue, laudan oma piste — 7.9.2026 linjaus)
  tanger: { lat: 35.77, lon: -5.803 },        // Tanger, 10 km
  teheran: { lat: 35.689, lon: 51.39 },       // Teheran, 2 km
  timbuktu: { lat: 16.773, lon: -2.999 },     // Timbuktu, 126,2 km
  titicaca: { lat: -15.825, lon: -69.325 },   // Titicaca, 4 km
  tokio: { lat: 35.689, lon: 139.692 },       // Tokio, 1 km
  toronto: { lat: 43.67, lon: -79.387 },      // Toronto, 3 km
  townsville: { lat: -19.262, lon: 146.816 }, // Townsville, 150,8 km
  tripoli: { lat: 32.888, lon: 13.188 },      // Tripoli, 4 km
  tromssa: { lat: 69.683, lon: 18.943 },      // Tromssa, 21,8 km
  tshadjarvi: { lat: 13.6, lon: 15.251 },     // Tšad-järvi (alue, laudan oma piste — 7.9.2026 linjaus)
  tukholma: { lat: 59.329, lon: 18.069 },     // Tukholma, 1 km
  ulanbator: { lat: 47.917, lon: 106.917 },   // Ulan Bator, 113 km
  uluru: { lat: -25.345, lon: 131.036 },      // Uluru, 107,7 km — 19.9.
  valletta: { lat: 35.898, lon: 14.512 },     // Valletta, 0 km
  valparaiso: { lat: -33.046, lon: -71.62 },  // Valparaíso, 39,5 km
  vancouver: { lat: 49.264, lon: -123.139 },  // Vancouver, 31,4 km
  varanasi: { lat: 25.317, lon: 83 },         // Varanasi, 258,1 km
  varsova: { lat: 52.23, lon: 21.011 },       // Varsova, 1 km
  venetsia: { lat: 45.44, lon: 12.332 },      // Venetsia, 10 km
  viktoria: { lat: 0, lon: 31.751 },          // Viktoria Nyanza (alue, laudan oma piste — 7.9.2026 linjaus)
  viktorianputoukset: { lat: -17.925, lon: 25.858 }, // Victorian putoukset, 232,7 km — 19.9.
  vilna: { lat: 54.689, lon: 25.28 },         // Vilna, 66 km
  vladivostok: { lat: 43.115, lon: 131.884 }, // Vladivostok, 44,3 km
  wellington: { lat: -41.289, lon: 174.777 }, // Wellington, 21,2 km
  whitehorse: { lat: 60.717, lon: -135.056 }, // Whitehorse, 3 km
  wien: { lat: 48.208, lon: 16.372 },         // Wien, 2 km
  winnipeg: { lat: 49.896, lon: -97.139 },    // Winnipeg, 3 km
  xian: { lat: 34.261, lon: 108.942 },        // Xi’an, 6 km
  yangon: { lat: 16.805, lon: 96.156 },       // Yangon, 5 km
  yellowknife: { lat: 62.442, lon: -114.397 }, // Yellowknife, 6 km
  yellowstone: { lat: 44.6, lon: -110.5 },    // Yellowstone, 0 km

};
