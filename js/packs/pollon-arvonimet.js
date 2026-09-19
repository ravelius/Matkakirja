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
 * Joka avauksella arvotaan uusi nimi (omistaja 19.9.2026: "tulee aina
 * eri vaihtoehto"). Pitkät nimet tiivistetään
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
  // — 1873-henkiset (höyryn, lennättimen ja maailmannäyttelyjen aika) —
  'Höyrykoneen Aikakauden Pöllöltä',
  'Lennätinlinjan Kuuntelijalta',
  'Maailmannäyttelyn Kunniavieraalta',
  'Suezin Kanavan Luotsipöllöltä',
  'Jules Vernen Neuvonantajalta',
  'Kaasulyhdyn Tietäjältä',
  'Kahdeksankymmenen Päivän Matkatoverilta',
  'Höyrylaivan Kansiluennoitsijalta',
  'Rautatieaikataulun Ulkoa Osaavalta',
  'Valokuvaajan Hiljaiselta Mallilta',
  'Sanomalehtien Yöpainoksen Lukijalta',
  'Vuoden 1873 Pörssiromahduksen Ennustajalta',
  'Kuningatar Victorian Hovin Yölinnulta',
  'Kaikkien Postivaunujen Kyydissä Olleelta',
  // — akateemiset —
  'Professori Emeritukselta',
  'Tiedeakatemian Kunniajäseneltä',
  'Kunniatohtorilta, honoris causa',
  'Dosentti Bubolta',
  'Filosofian Maisteripöllöltä',
  'Kaikkien Tiedekuntien Dekaanilta',
  'Latinaa Lukevalta Pöllöltä',
  'Tähtitornin Vahtimestarilta',
  'Väitöskirjan Vastaväittäjältä',
  'Alaviitteiden Aatelilta',
  'Sivistyssanakirjan Sisällysluettelolta',
  'Luentosalin Takarivin Viisaalta',
  'Kirjastonhoitajien Kirjastonhoitajalta',
  'Museon Yövartijalta, Joka Luki Kaikki Kyltit',
  'Kolmen Tutkinnon Pöllöltä',
  // — kansantarut ja myytit —
  'Athenen Olkapään Pöllöltä',
  'Kalevalan Pöllöltä',
  'Väinämöisen Kuiskaajalta',
  'Louhen Neuvonantajalta',
  'Merlinin Höyhenkirjurilta',
  'Metsänhaltijan Sanansaattajalta',
  'Tapion Pöydän Pöllöltä',
  'Yön Tietäjältä, Joka Kuuli Hiiren Askeleet',
  'Seitsemän Veljeksen Kuuntelijalta',
  'Tuonelan Joen Tähystäjältä',
  'Sammon Vartijalta',
  'Aleksis Kiven Metsäpöllöltä',
  // — huolella yliampuvat —
  'Ainoalta Oikealta ja Alkuperäiseltä Viisaalta Pöllöltä',
  'Pöllöltä, Jonka Nimeä Ei Sovi Lausua Ääneen',
  'Kaikkien Kysymysten Ennalta Arvaajalta',
  'Vastausten Valtiaalta',
  'Universumin Vanhimmalta Uhuulta',
  'Pöllöltä, Joka Tiesi Sen Jo Ennen Kuin Kysyit',
  'Kolmesti Kruunatulta Huuhkajakuninkaalta',
  'Ikuisuuden Ylikirjastonhoitajalta',
  'Yön Suurmestarilta ja Aamun Kunniavieraalta',
  'Pöllöltä, Jolla On Kaksi Tutkintoa Enemmän Kuin Sinulla',
  'Viisaudesta Vastaavalta Ministeriltä',
  'Höyhenten Herralta ja Hämärän Hallitsijalta',
  // — lämpimät ja pienet —
  'Puunkolon Naapurilta',
  'Yökahvin Ystävältä',
  'Hiljaiselta Kuuntelijalta',
  'Sulkia Pöyhivältä Tietäjältä',
  'Aina Hereillä Olevalta',
  'Pöllöltä, Joka Muistaa Kaiken Lukemansa',
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
    'Reinin Linnojen Yöpöllöltä',
    'Venetsian Kirjapainojen Pöllöltä',
    'Böömin Metsien Huuhkajalta',
    'Pohjolan Huuhkajalta',
    'Balkanin Vuoristo-oraakkelilta',
    'Skotlannin Ylämaan Yöpöllöltä',
  ],
  africa: [
    'Savannin Yövartijalta',
    'Baobabin Vanhimmalta',
    'Niilin Oraakkelilta',
    'Karavaanien Oppaalta',
    'Saharan Tähtienlukijalta',
    'Kilimandžaron Lumipöllöltä',
    'Timbuktun Käsikirjoitusten Vartijalta',
    'Sansibarin Maustekauppiaiden Neuvonantajalta',
    'Hyväntoivonniemen Tähystäjältä',
    'Kongon Sademetsän Kuiskaajalta',
  ],
  asia: [
    'Mandariinipöllöltä',
    'Himalajan Erakkopöllöltä',
    'Bambulehdon Mestarilta',
    'Tuhannen Sutran Pöllöltä',
    'Silkkitien Kirjurilta',
    'Riisipeltojen Yövahdilta',
    'Monsuunin Ennustajalta',
    'Suuren Muurin Yövartijalta',
    'Maharadžan Hovipöllöltä',
    'Fuji-vuoren Erakkopöllöltä',
    'Basaarin Kuulijalta',
    'Mekongin Yökalastajalta',
  ],
  americas: [
    'Preerian Huhuilijalta',
    'Andien Kondoripöllöltä',
    'Uuden Maailman Kirjastonhoitajalta',
    'Amazonin Yökuiskaajalta',
    'Sähkölennättimen Pöllöltä',
    'Kultakuumeen Kirjanpitäjältä',
    'Inkojen Tähtiportaiden Vartijalta',
    'Mississipin Siipirataslaivan Pöllöltä',
    'Rocky Mountainsin Huuhkajalta',
    'Patagonian Tuulen Lukijalta',
    'Karibian Merirosvokarttojen Tuntijalta',
  ],
  oceania: [
    'Eukalyptuksen Viisaalta',
    'Etelän Ristin Tähtitieteilijältä',
    'Korallimeren Majakanvartijalta',
    'Vastarannan Pöllöltä',
    'Kengurujen Yöpaimenelta',
    'Tyynenmeren Saarikartan Piirtäjältä',
    'Maorien Tarinoiden Kuuntelijalta',
  ],
  polar: [
    'Napajään Lumipöllöltä',
    'Revontulten Lukijalta',
    'Ikiroudan Erakolta',
    'Jäänmurtajan Keulapöllöltä',
    'Kaamoksen Kuninkaalta',
  ],
  meri: [
    'Seitsemän Meren Luotsipöllöltä',
    'Kompassin Kärjeltä',
    'Mastonhuipun Tähystäjältä',
    'Laivanlokin Pitäjältä',
    'Myrskyn Silmän Pöllöltä',
  ],
};


/**
 * MAAKOHTAISET KUNNIANIMET (omistaja 19.9.2026 klo 21.56: "Myös maan omat
 * paikat ja historialliset henkilöt jne sopisivat tähän hyvin. Voisi olla
 * siis maa spesifejä nimiä"). Avain ISO-3, arvo lista ablatiivissa. Maan
 * omat paikat, kansantarut ja historialliset henkilöt (1873 tai sitä
 * vanhemmat; elossa 1873 kelpaa), leikkisästi. Sonnet-sessiot täyttävät
 * maa kerrallaan Fablen speksillä; muutama malli tässä.
 */
export const POLLON_ARVONIMET_MAITTAIN = {
  FRA: [
    'Notre-Damen Kellotornin Pöllöltä',
    'Voltairen Kirjeenvaihtajalta',
    'Louvren Yökierroksen Oppaalta',
    'Pyreneiden Huuhkajalta',
    'Jules Vernen Pöytäkirjurilta',
    'Montmartren Tuulimyllyn Vahdilta',
  ],
  FIN: [
    'Kolin Huuhkajalta',
    'Runebergin Tortun Vartijalta',
    'Lönnrotin Muistiinpanojen Lukijalta',
    'Saimaan Rannan Yölinnulta',
    'Tuonelan Joutsenen Naapurilta',
    'Snellmanin Sanakirjan Syöjältä',
  ],
  DEU: [
    'Grimmin Veljesten Satupöllöltä',
    'Reinin Loreleyn Kuuntelijalta',
    'Goethen Puutarhan Yölinnulta',
    'Schwarzwaldin Käkikellon Kilpailijalta',
  ],
  GBR: [
    'Big Benin Yövahdilta',
    'Sherlock Holmesin Konsultilta',
    'Shakespearen Kuiskaajalta',
    'Tower of Londonin Korppien Kilpailijalta',
  ],
  ITA: [
    'Colosseumin Kaarien Pöllöltä',
    'Danten Kommentaattorilta',
    'Vesuviuksen Rinteen Tähystäjältä',
    'Galilein Kaukoputken Vartijalta',
  ],
  GRC: [
    'Athenen Olkapään Pöllöltä',
    'Delfoin Oraakkelin Sijaiselta',
    'Olympoksen Yökokouksen Puheenjohtajalta',
    'Sokrateen Kysymysten Kuulijalta',
  ],
  EGY: [
    'Sfinksin Arvoitusten Ratkojalta',
    'Aleksandrian Kirjaston Viimeiseltä Lukijalta',
    'Niilin Tulvien Ennustajalta',
  ],
  USA: [
    'Mark Twainin Jokilaivan Pöllöltä',
    'Vapaudenpatsaan Telineiden Yövahdilta',
    'Preerian Postiratsastajan Oppaalta',
  ],
};

/**
 * Arvonta: OMISTAJA 19.9.2026 klo 21.52 ("Parempi mitä enemmän
 * vaihtoehtoja niin tulee aina eri vaihtoehto") — joka avauksella uusi
 * satunnainen arvonimi, ei siemenestä. Maanosan lista noin joka
 * kolmannella kerralla, jos maanosa tunnetaan; maan oma lista noin 40 %
 * ajasta, jos pelaajan maalle on kunnianimiä. Sama nimi ei toistu
 * heti peräkkäin (edellinen muistetaan).
 */
let edellinenArvonimi = null;
export function pollonArvonimi(maanosa = null, iso = null) {
  const maa = POLLON_ARVONIMET_MAITTAIN[iso] ?? null;
  const oma = POLLON_ARVONIMET_MAANOSITTAIN[maanosa] ?? null;
  const r = Math.random();
  const lista = (maa && maa.length && r < 0.4) ? maa
    : (oma && oma.length && r < 0.65) ? oma
    : POLLON_ARVONIMET_YLEISET;
  let nimi = lista[Math.floor(Math.random() * lista.length)];
  if (nimi === edellinenArvonimi && lista.length > 1) {
    nimi = lista[(lista.indexOf(nimi) + 1) % lista.length];
  }
  edellinenArvonimi = nimi;
  return nimi;
}
