/*
 * VIISAAN PÖLLÖN ARVONIMET — nimilappuvitsin yliviivattu osa.
 *
 * Omistaja 19.9.2026 klo 21.45 Suomen aikaa (sanatarkasti Raamatussa,
 * osio VIISAAN POLLON ARVONIMET): "Keksisitkö viisaalle pöllölle
 * synonyymejä yliviivauksiin niin vitsi ei vanhenisi niin nopeasti?
 * Mieluiten aika paljon, noin 30kpl tai jopa paljon enemmän. Voi olla
 * huolella yliampuvia tai muuten kekseliäitä. Ja jos on pidempi loru
 * niin tiivistetään kirjaimia vaakasuunnassa yliviivatun osalta, jotta
 * mahtuu. Voisi olla jopa erilaisia kunnia nimiä eri maanosissa."
 *
 * KÄYTTÖ: "Kysy <YLIVIIVATTU ARVONIMI> pululta:". Arvonimi on
 * ablatiivissa, koska pulu tuuraa pöllöä ("kysy pöllöltä" → "pululta").
 * Kortti arpoo arvonimen: ensin maanosan listasta (jos pelaajan
 * maanosa tunnetaan), muuten tai puolet ajasta yleisestä listasta.
 * Sama kortti näyttää saman arvonimen uudelleen avattaessa (siemen
 * noston tunnuksesta), jotta vitsi ei vilku. Pitkät nimet tiivistetään
 * vaakasuunnassa (font-stretch / letter-spacing / scaleX) vain
 * yliviivatun osan verran — "pululta" pysyy normaalina.
 *
 * Fable kirjoittaa tämän listan (tarina); Opus kytkee (js/pollo.js
 * polloNimilappu). Lisää vapaasti, älä poista vanhoja — vanhat kortit
 * pysyvät samoina.
 */

/** Kaikkialla käyvät arvonimet. */
export const POLLON_ARVONIMET_YLEISET = [
  'Viisaalta Pöllöltä',
  'Kaikkitietävältä Pöllöltä',
  'Ylioppineelta Pöllöltä',
  'Metsän Oraakkelilta',
  'Suurelta Huhuilijalta',
  'Yön Professorilta',
  'Sulkapukuiselta Tietäjältä',
  'Höyhenpeitteiseltä Tohtorilta',
  'Kirjaston Yövahdilta',
  'Pöllö-Paroonilta',
  'Hänen Höyhenisyydeltään',
  'Ikuisesti Valvovalta',
  'Pyöreäsilmäiseltä Viisaudelta',
  'Tiedon Kynsijältä',
  'Puunkolon Filosofilta',
  'Sanakirjan Syöjältä',
  'Kaikkien Tietosanakirjojen Isältä',
  'Arvoisalta Uhuulta',
  'Silmälasipäältä Viisaalta',
  'Yön Kuninkaalta',
  'Hiljaisen Lennon Mestarilta',
  'Kuunvalon Kirjurilta',
  'Kaksisataa astetta Kääntyvältä Päältä',
  'Pöllöjen Pöllöltä, Viisauden Viisaudelta',
  'Kaikkien Aikojen Kaikkitietävältä',
  'Ylhäiseltä, Korkeimmalta ja Kaikkein Pöllöisimmältä',
  'Huuhkajien Huuhkajalta',
  'Sulkien Sulttaanilta',
  'Ylimmältä Uhuilijalta',
  'Vanhalta Viisaalta, joka ei koskaan räpäytä silmäänsä',
];

/**
 * Maanosakohtaiset kunnianimet. Avaimet ovat pelin maanosatunnuksia
 * (js/packs/*.js: europe, africa, asia, americas, oceania) ja lisäksi
 * 'polar' napa-alueille ja 'meri' laivamatkoille.
 */
export const POLLON_ARVONIMET_MAANOSITTAIN = {
  europe: [
    'Ateenan Pöllöltä',
    'Akatemian Kunniapöllöltä',
    'Pariisin Salonkien Pöllöltä',
    'Wienin Hovipöllöltä',
    'Sorbonnen Tohtoripöllöltä',
    'Oxfordin Rehtoripöllöltä',
    'Alppien Huuhkajalta',
    'Vanhan Mantereen Kirjastonhoitajalta',
  ],
  africa: [
    'Savannin Yövartijalta',
    'Baobabin Vanhimmalta',
    'Niilin Oraakkelilta',
    'Karavaanien Oppaalta',
    'Saharan Tähtienlukijalta',
    'Kilimandžaron Lumipöllöltä',
  ],
  asia: [
    'Mandariinipöllöltä',
    'Himalajan Erakkopöllöltä',
    'Bambulehdon Mestarilta',
    'Tuhannen Sutran Pöllöltä',
    'Silkkitien Kirjurilta',
    'Riisipeltojen Yövahdilta',
    'Monsuunin Ennustajalta',
  ],
  americas: [
    'Preerian Huhuilijalta',
    'Andien Kondoripöllöltä',
    'Uuden Maailman Kirjastonhoitajalta',
    'Amazonin Yökuiskaajalta',
    'Sähkölennättimen Pöllöltä',
    'Kultakuumeen Kirjanpitäjältä',
  ],
  oceania: [
    'Eukalyptuksen Viisaalta',
    'Etelän Ristin Tähtitieteilijältä',
    'Korallimeren Majakanvartijalta',
    'Vastarannan Pöllöltä',
  ],
  polar: [
    'Napajään Lumipöllöltä',
    'Revontulten Lukijalta',
    'Ikiroudan Erakolta',
  ],
  meri: [
    'Seitsemän Meren Luotsipöllöltä',
    'Kompassin Kärjeltä',
    'Mastonhuipun Tähystäjältä',
  ],
};

/**
 * Deterministinen arvonta: sama siemen (esim. noston tunnus) antaa aina
 * saman arvonimen. Maanosan lista puolet ajasta, jos se tunnetaan.
 */
export function pollonArvonimi(siemen = '', maanosa = null) {
  let h = 2166136261;
  for (const c of String(siemen)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const oma = POLLON_ARVONIMET_MAANOSITTAIN[maanosa] ?? null;
  const lista = (oma && oma.length && (h & 1)) ? oma : POLLON_ARVONIMET_YLEISET;
  return lista[(h >>> 1) % lista.length];
}
