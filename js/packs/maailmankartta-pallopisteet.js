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
 * Vartio: tools/tarkista-laudan-pisteet.mjs lukee tämän kentän ja
 * vaatii, että yli 15 km:n poikkeamia jää vain alueille.
 */

/** Kaupungin id → { lat, lon } asteina (Wikidata P625, 7.9.2026). */
export const PALLON_KAUPUNKIPISTEET = {
  adelaide: { lat: -34.928, lon: 138.6 },       // Adelaide, 36,4 km
  antofagasta: { lat: -23.646, lon: -70.398 },  // Antofagasta, 40,9 km
  barcelona: { lat: 41.388, lon: 2.17 },        // Barcelona, 44 km
  brisbane: { lat: -27.468, lon: 153.028 },     // Brisbane, 42,9 km
  broome: { lat: -17.962, lon: 122.236 },       // Broome, 18,5 km
  budapest: { lat: 47.492, lon: 19.051 },       // Budapest, 79,1 km
  buenosaires: { lat: -34.608, lon: -58.373 },  // Buenos Aires, 34,5 km
  cairns: { lat: -16.926, lon: 145.775 },       // Cairns, 18,8 km
  caracas: { lat: 10.496, lon: -66.898 },       // Caracas, 32,8 km
  cayenne: { lat: 4.939, lon: -52.332 },        // Cayenne, 48,6 km
  chennai: { lat: 13.084, lon: 80.27 },         // Chennai, 53,2 km
  christchurch: { lat: -43.531, lon: 172.636 }, // Christchurch, 65,4 km
  churchill: { lat: 58.767, lon: -94.167 },     // Churchill, 15,7 km
  colombo: { lat: 6.934, lon: 79.843 },         // Colombo, 96,1 km
  dakar: { lat: 14.683, lon: -17.433 },         // Dakar, 88,2 km
  darwin: { lat: -12.438, lon: 130.841 },       // Darwin, 26,6 km
  delhi: { lat: 28.61, lon: 77.23 },            // Delhi, 71,4 km
  dili: { lat: -8.554, lon: 125.578 },          // Dili, 27,6 km
  dubai: { lat: 25.25, lon: 55.283 },           // Dubai, 51,9 km
  geraldton: { lat: -28.779, lon: 114.614 },    // Geraldton, 120,2 km
  guatemala: { lat: 14.623, lon: -90.531 },     // Guatemala, 31 km
  halifax: { lat: 44.646, lon: -63.574 },       // Halifax, 31,4 km
  havanna: { lat: 23.133, lon: -82.367 },       // Havanna, 276,4 km
  helsinki: { lat: 60.171, lon: 24.938 },       // Helsinki, 34,7 km
  hobart: { lat: -42.883, lon: 147.317 },       // Hobart, 32,9 km
  hongkong: { lat: 22.278, lon: 114.159 },      // Hongkong, 60,4 km
  houston: { lat: 29.763, lon: -95.383 },       // Houston, 36,2 km
  iqaluit: { lat: 63.749, lon: -68.52 },        // Iqaluit, 338,9 km
  jakarta: { lat: -6.21, lon: 106.845 },        // Jakarta, 27,2 km
  jerusalem: { lat: 31.783, lon: 35.217 },      // Jerusalem, 50,3 km
  joaopessoa: { lat: -7.12, lon: -34.88 },      // João Pessoa, 36,4 km
  kano: { lat: 12, lon: 8.517 },                // Kano, 167,6 km
  kanton: { lat: 23.109, lon: 113.265 },        // Kanton, 473,3 km
  kapkaupunki: { lat: -33.925, lon: 18.425 },   // Kapkaupunki, 119,4 km
  karachi: { lat: 24.86, lon: 67.01 },          // Karachi, 18 km
  karthago: { lat: 36.887, lon: 10.315 },       // Karthago, 184,3 km
  kathmandu: { lat: 27.7, lon: 85.333 },        // Kathmandu, 74,3 km
  kioto: { lat: 35.012, lon: 135.768 },         // Kioto, 187,9 km
  kumasi: { lat: 6.683, lon: -1.617 },          // Kumasi, 127 km
  lagos: { lat: 6.441, lon: 3.418 },            // Lagos, 411,6 km
  lhasa: { lat: 29.654, lon: 91.117 },          // Lhasa, 139,3 km
  lima: { lat: -12.06, lon: -77.037 },          // Lima, 60,7 km
  losangeles: { lat: 34.05, lon: -118.25 },     // Los Angeles, 17,3 km
  macapa: { lat: 0.034, lon: -51.066 },         // Macapá, 32 km
  machupicchu: { lat: -13.163, lon: -72.546 },  // Machu Picchu, 27 km
  managua: { lat: 12.136, lon: -86.251 },       // Managua, 29,7 km
  manila: { lat: 14.583, lon: 120.967 },        // Manila, 102,1 km
  marrakech: { lat: 31.635, lon: -8 },          // Marrakech, 282,5 km
  marseille: { lat: 43.297, lon: 5.381 },       // Marseille, 47,3 km
  melbourne: { lat: -37.814, lon: 144.963 },    // Melbourne, 46,2 km
  merida: { lat: 20.97, lon: -89.62 },          // Mérida, 109,9 km
  mexico: { lat: 19.411, lon: -99.131 },        // Mexico City, 21,5 km
  miami: { lat: 25.788, lon: -80.224 },         // Miami, 66,1 km
  montevideo: { lat: -34.906, lon: -56.191 },   // Montevideo, 17,8 km
  montreal: { lat: 45.546, lon: -73.639 },      // Montreal, 75,2 km
  mumbai: { lat: 18.975, lon: 72.826 },         // Mumbai, 16 km
  murzuk: { lat: 25.916, lon: 13.918 },         // Murzuk, 241,9 km
  nairobi: { lat: -1.283, lon: 36.817 },        // Nairobi, 418,7 km
  neworleans: { lat: 29.95, lon: -90.067 },     // New Orleans, 46,4 km
  newyork: { lat: 40.67, lon: -73.94 },         // New York, 33,6 km
  nome: { lat: 64.504, lon: -165.399 },         // Nome, 39,7 km
  nuuk: { lat: 64.167, lon: -51.733 },          // Nuuk, 56,8 km
  ouropreto: { lat: -20.385, lon: -43.504 },    // Ouro Preto, 168,7 km
  panama: { lat: 8.988, lon: -79.519 },         // Panama, 30,7 km
  perth: { lat: -31.956, lon: 115.86 },         // Perth, 45,1 km
  petra: { lat: 30.329, lon: 35.442 },          // Petra, 86,4 km
  portmoresby: { lat: -9.479, lon: 147.149 },   // Port Moresby, 35,2 km
  portoalegre: { lat: -30.033, lon: -51.23 },   // Porto Alegre, 44,1 km
  puertomontt: { lat: -41.472, lon: -72.94 },   // Puerto Montt, 29,3 km
  puntaarenas: { lat: -53.163, lon: -70.908 },  // Punta Arenas, 80,9 km
  riika: { lat: 56.947, lon: 24.105 },          // Riika, 236,1 km
  rio: { lat: -22.911, lon: -43.206 },          // Rio de Janeiro, 30,6 km
  salvador: { lat: -12.983, lon: -38.493 },     // Salvador, 38,9 km
  sanfrancisco: { lat: 37.779, lon: -122.419 }, // San Francisco, 23,5 km
  sanjuan: { lat: 18.465, lon: -66.117 },       // San Juan, 42 km
  santafe: { lat: 35.667, lon: -105.967 },      // Santa Fe, 120,6 km
  saoluis: { lat: -2.53, lon: -44.303 },        // São Luís, 66 km
  saopaulo: { lat: -23.55, lon: -46.634 },      // São Paulo, 183,6 km
  sarajevo: { lat: 43.867, lon: 18.417 },       // Sarajevo, 127,5 km
  shanghai: { lat: 31.224, lon: 121.476 },      // Shanghai, 93,1 km
  singapore: { lat: 1.3, lon: 103.8 },          // Singapore, 59,8 km
  sitka: { lat: 57.052, lon: -135.339 },        // Sitka, 89,4 km
  stjohns: { lat: 47.577, lon: -52.701 },       // St. John’s, 156,3 km
  suva: { lat: -18.133, lon: 178.433 },         // Suva, 64,1 km
  sydney: { lat: -33.868, lon: 151.21 },        // Sydney, 35,5 km
  taipei: { lat: 25.033, lon: 121.633 },        // Taipei, 131,5 km
  tallinna: { lat: 59.439, lon: 24.754 },       // Tallinna, 184,7 km
  timbuktu: { lat: 16.773, lon: -2.999 },       // Timbuktu, 126,2 km
  townsville: { lat: -19.262, lon: 146.816 },   // Townsville, 150,8 km
  tromssa: { lat: 69.683, lon: 18.943 },        // Tromssa, 21,8 km
  ulanbator: { lat: 47.917, lon: 106.917 },     // Ulan Bator, 113 km
  valparaiso: { lat: -33.046, lon: -71.62 },    // Valparaíso, 39,5 km
  vancouver: { lat: 49.264, lon: -123.139 },    // Vancouver, 31,4 km
  varanasi: { lat: 25.317, lon: 83 },           // Varanasi, 258,1 km
  vilna: { lat: 54.689, lon: 25.28 },           // Vilna, 66 km
  vladivostok: { lat: 43.115, lon: 131.884 },   // Vladivostok, 44,3 km
  wellington: { lat: -41.289, lon: 174.777 },   // Wellington, 21,2 km
};
