// Äänivaihtoehdot: jokaiselle Afrikan kaupungille, tehosteelle ja
// musiikille ehdokkaita Freesoundista (vain CC-lisenssit, osoitteet
// varmistettu). Paras valitaan /aanet.html-sivulla; valinta tallentuu
// selaimeen ja peli käyttää sitä oletuksen sijaan heti seuraavasta
// latauksesta. Kun omistaja on valinnut, voittajat kovakoodataan
// oletuksiksi kaikille.
//
// Kaupungit saavat ehdokkaansa äänimaisematyypin mukaan; osalla on
// lisäksi juuri siitä paikasta tehtyjä äänityksiä. `oletus: null`
// tarkoittaa, että ilman valintaa soi syntetisoitu ambienssi.

import { PACKS } from './pack.js';

const AVAIN = 'matkakirja-aanivalinnat';


/*
 * Nuoren herran huudahdukset aarteen paljastukseen — sama repliikki
 * kirjoitettuna ja luettuna (tiedostot assets/audio/huudahdus-
 * <avain>-<n>.mp3, generointi tools/generoi-hihkaisut.mjs).
 * Asuu täällä eikä ui.js:ssä, jotta työhuoneen äänistudio saa
 * saman listan ilman koko pelin tuontia.
 */
export const HUUDAHDUKSET = {
  300: [
    'Hei — löytyi sittenkin!',
    'Pieni, mutta aito!',
    'Kelpaa tämäkin!',
    'Taskuun ja eteenpäin!',
  ],
  600: [
    'Mahtavaa!',
    'Sepä vasta löytö!',
    'Isoisä olisi hykerrellyt!',
    'Tämä merkitään päiväkirjaan!',
  ],
  1000: [
    'Uskomatonta!',
    'Jes! Katsokaa nyt tätä!',
    'Sydän hakkaa — mikä löytö!',
    'Juuri tällaisesta isoisä kirjoitti!',
  ],
  star: [
    'Se on totta... se on oikeasti totta!',
    'Aarni oli oikeassa — se on olemassa!',
    'Isoisä... minä löysin sen.',
  ],
};

// Tyyppiehdokkaat: käyvät kaikille saman maiseman kaupungeille.
export const TYYPPI_EHDOKKAAT = {
  // Lentoasema on etusivun oma maisema (omistajan toive 10.8.2026:
  // Lontoon lentokentän lähtöaulan häly ainoaksi taustaääneksi).
  lentoasema: [
    { url: 'https://cdn.freesound.org/previews/731/731249_10924423-lq.mp3#voima=3.04', nimi: 'Gatwickin lähtöaula aamulla (Lontoo) — soundandmelodies, CC0' },
    { url: 'https://cdn.freesound.org/previews/731/731247_10924423-lq.mp3#voima=2.84', nimi: 'Gatwickin lähtöaula iltapäivällä (Lontoo) — soundandmelodies, CC0' },
    { url: 'https://cdn.freesound.org/previews/340/340276_2669559-lq.mp3#voima=0.23', nimi: 'Gatwickin odotusaula ja kuulutus (Lontoo) — andriiperevodchyk, CC0' },
  ],
  // Avauslennon kalvo: äänimaisema lentokoneen sisältä (omistajan
  // toive 10.8.2026). Voimat kalibroitu RMS-mittauksella aulan äänen
  // tasoon: matkustamo saa olla selvästi läsnä muttei kertojan päällä.
  // Voimat: striimin kokonaiskerroin (ambience-stream VOIMA 0.14)
  // painaa tasoja rajusti — ensimmäinen kalibrointi (0.07) jäi siksi
  // kuulumattomiin (omistajan palaute 10.8.2026 ilta). Oletuksena
  // äänite, jossa on moottorin lisäksi matkustajien puheensorinaa ja
  // kuulutus (omistajan toive: "pitäisi löytää puheääntä taustalle").
  lentokone: [
    { url: 'https://cdn.freesound.org/previews/433/433002_138-lq.mp3#voima=2.69', nimi: 'Matkustamo, puheensorinaa ja kuulutus — drewhalasz, CC0' },
    { url: 'https://cdn.freesound.org/previews/456/456092_3025911-lq.mp3#voima=0.18', nimi: 'Matkustamo lennolla, A330 — FillSoko, CC0' },
    { url: 'https://cdn.freesound.org/previews/245/245691_2047664-lq.mp3#voima=0.15', nimi: 'Matkustamon tasainen humina — TicAshfield, CC0' },
  ],
  basaari: [
    { url: 'https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23', nimi: 'Basaarin hälinä (Khan el-Khalili) — 3bagbrew, CC0' },
    { url: 'https://cdn.freesound.org/previews/677/677253_9756914-lq.mp3#voima=0.47', nimi: 'Ouakamin piha illalla (Dakar) — LaureC, CC0' },
    { url: 'https://cdn.freesound.org/previews/677/677252_9756914-lq.mp3#voima=2.9', nimi: 'Ouakamin piha aamulla (Dakar) — LaureC, CC0' },
    { url: 'https://cdn.freesound.org/previews/683/683118_8105512-lq.mp3#voima=0.21', nimi: 'Katukauppiaat (Kairo) — AhmadAiuby, CC0' },
    { url: 'https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55', nimi: 'Kaupungin yö (Kairo) — rucisko, CC BY-NC' },
  ],
  aavikko: [
    { url: 'https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#voima=0.98', nimi: 'Aavikon äänimaisema — Metris, CC BY' },
    { url: 'https://cdn.freesound.org/previews/411/411774_1910728-lq.mp3#voima=5.85', nimi: 'Aavikon yön hiljaisuus — Diegolar, CC BY' },
    { url: 'https://cdn.freesound.org/previews/565/565015_12186594-lq.mp3#voima=0.16', nimi: 'Hiekkamyrsky — blackatomproductions, CC0' },
    { url: 'https://cdn.freesound.org/previews/438/438877_2524442-lq.mp3#voima=0.52', nimi: 'Hiekkamyrskyn tuuli — craigsmith, CC0' },
    { url: 'https://cdn.freesound.org/previews/635/635912_2247456-lq.mp3#voima=4.31', nimi: 'Kiuruja tuulisten dyynien yllä — Kinoton, CC0' },
    { url: 'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27', nimi: 'Tuuli puissa — Danjocross, CC0' },
  ],
  meri: [
    { url: 'https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15', nimi: 'Tyyni aallokko — Eatyourburger, CC0' },
    { url: 'https://cdn.freesound.org/previews/848/848927_17398983-lq.mp3#voima=0.82', nimi: 'Rantatyrsky — Benson_Arizona, CC BY-NC' },
    { url: 'https://archive.org/download/aporee_8703_10524/CityCountryMeSassnitzFischereihafenFender.mp3#voima=0.33', nimi: 'Kalasatama (Sassnitz) — henrik schröder, CC BY-SA' },
    { url: 'https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15', nimi: 'Aallot lyövät kallioihin — felix.blume, CC0' },
    { url: 'https://cdn.freesound.org/previews/573/573187_97550-lq.mp3#voima=0.54', nimi: 'Kirkas rantahyöky — TRP, CC0' },
    { url: 'https://cdn.freesound.org/previews/543/543819_6667441-lq.mp3#voima=0.73', nimi: 'Isot aallot kivikkorannalla — Profispiesser, CC0' },
    { url: 'https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75', nimi: 'Laivan kansi merellä — bruno.auzet, CC0' },
  ],
  sademetsa: [
    { url: 'https://cdn.freesound.org/previews/818/818589_15983207-lq.mp3#voima=0.25', nimi: 'Viidakko ja apinat — AlaskanMariner, CC BY' },
    { url: 'https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36', nimi: 'Linnut metsässä (Thuin) — Vincent Duseigne, CC BY' },
    { url: 'https://cdn.freesound.org/previews/410/410078_1661766-lq.mp3#voima=0.22', nimi: 'Yösade ja ukkonen sademetsässä — felix.blume, CC0' },
    { url: 'https://cdn.freesound.org/previews/407/407583_1661766-lq.mp3#voima=0.26', nimi: 'Sademetsän linnut — felix.blume, CC0' },
    { url: 'https://cdn.freesound.org/previews/253/253301_2409224-lq.mp3#voima=0.48', nimi: 'Viidakon yö (Borneo) — RTB45, CC BY' },
    { url: 'https://cdn.freesound.org/previews/486/486437_7266967-lq.mp3#voima=1.14', nimi: 'Yösirkat viidakossa — FreeToUseSounds, CC BY' },
  ],
  savanni: [
    { url: 'https://cdn.freesound.org/previews/202/202876_1934171-lq.mp3#voima=2.48', nimi: 'Savannin yösirkat — AugustSandberg, CC0' },
    // Omistajan huomio: klipin alku on vaimea — esitäytetty alkukohta 20 s.
    { url: 'https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#voima=0.98', nimi: 'Kuiva tuulinen maisema — Metris, CC BY', alku: 20 },
    { url: 'https://cdn.freesound.org/previews/504/504694_778707-lq.mp3#voima=2.4', nimi: 'Masai-leirin luontoäänet — selcukartut, CC0' },
    { url: 'https://cdn.freesound.org/previews/612/612318_13563349-lq.mp3#voima=0.3', nimi: 'Virtahevot joella (Kruger) — noisymichael, CC BY' },
    { url: 'https://cdn.freesound.org/previews/764/764981_15688695-lq.mp3#voima=0.86', nimi: 'Sirkat yöllä (Etelä-Afrikka) — Christian.Combrinck, CC0' },
    { url: 'https://cdn.freesound.org/previews/411/411996_7037-lq.mp3#voima=0.92', nimi: 'Ukkosmyrsky Etelä-Afrikassa — tim.kahn, CC BY-NC' },
  ],
  ylanko: [
    { url: 'https://archive.org/download/aporee_68991_80056/almaporeejochbergalm12uhr30.mp3#voima=0.5', nimi: 'Alppilaidun (Reit im Winkl, Baijeri) — sam auinger, CC BY-SA' },
    { url: 'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22', nimi: 'Ulvova tuuli — Kostas17, CC BY' },
  ],

  /*
   * Euroopan maisemat. Nämä korit on koottu jo varmennetuista
   * äänitteistä, koska Freesoundin haku vaatii avaimen eikä sitä ole
   * käytettävissä. Ne toimivat ja ovat oikeaa maisemaa, mutta ovat
   * väliaikaisia: omistaja voi vaihtaa parempia tilalle /aanet.html
   * -studiossa, ja voittajat kovakoodataan tänne.
   *
   * Nämä ovat nyt varareitti: kaikilla 41 Euroopan kaupungilla on oma
   * kenttä-äänitys (KAUPUNKI_EHDOKKAAT alempana), ja siellä ovat myös
   * aiemmin puuttuneet raitiovaunu, kirkonkellot ja katusoittaja.
   */
  kaupunki: [
    { url: 'https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55', nimi: 'Kaupungin yö — rucisko, CC BY-NC' },
    { url: 'https://cdn.freesound.org/previews/677/677253_9756914-lq.mp3#voima=0.47', nimi: 'Piha illalla — LaureC, CC0' },
    { url: 'https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23', nimi: 'Kaupungin hälinä — 3bagbrew, CC0' },
  ],
  satama: [
    { url: 'https://archive.org/download/aporee_8703_10524/CityCountryMeSassnitzFischereihafenFender.mp3#voima=0.33', nimi: 'Kalasatama (Sassnitz) — henrik schröder, CC BY-SA' },
    { url: 'https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75', nimi: 'Laivan kansi merellä — bruno.auzet, CC0' },
    { url: 'https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15', nimi: 'Tyyni aallokko — Eatyourburger, CC0' },
  ],
  vuoristo: [
    { url: 'https://archive.org/download/aporee_68991_80056/almaporeejochbergalm12uhr30.mp3#voima=0.5', nimi: 'Alppilaidun (Reit im Winkl, Baijeri) — sam auinger, CC BY-SA' },
    { url: 'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22', nimi: 'Ulvova tuuli — Kostas17, CC BY' },
  ],
  metsa: [
    { url: 'https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36', nimi: 'Linnut metsässä (Thuin) — Vincent Duseigne, CC BY' },
    { url: 'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27', nimi: 'Tuuli puissa — Danjocross, CC0' },
  ],
  pohjoinen: [
    { url: 'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22', nimi: 'Ulvova tuuli — Kostas17, CC BY' },
    { url: 'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27', nimi: 'Tuuli puissa — Danjocross, CC0' },
    { url: 'https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15', nimi: 'Aallot lyövät kallioihin — felix.blume, CC0' },
  ],
};

export const TYYPPI_NIMET = {
  basaari: 'basaari',
  kaupunki: 'kaupunki',
  satama: 'satama',
  vuoristo: 'vuoristo',
  metsa: 'metsä',
  pohjoinen: 'pohjoinen',
  aavikko: 'aavikko',
  meri: 'meri',
  sademetsa: 'sademetsä',
  savanni: 'savanni',
  ylanko: 'ylänkö',
};


export const EHDOKKAAT = {
  // Tietovisan musiikki jaotellaan maanosittain (Muut äänet → Tietovisat):
  // yleinen valinta soi kaikkialla, ellei maanosalla ole omaansa.
  'musiikki:tietovisa': {
    otsikko: 'Yleinen — soi ellei maanosalla ole omaa valintaa',
    // Omistajan valinta (31.7.) kirjattu oletukseksi kaksinkertaisella
    // voimalla — näin se soi myös kotivalikon sovelluksessa.
    oletus: 'https://cdn.freesound.org/previews/176/176134_334810-lq.mp3#voima=0.32',
    ehdokkaat: [
      { url: 'https://cdn.freesound.org/previews/176/176134_334810-lq.mp3#voima=0.32', nimi: '6_drums_luangprabang.WAV — LukeIRL, CC BY' },
      { url: 'https://cdn.freesound.org/previews/713/713120_14632469-lq.mp3#voima=0.27', nimi: 'Arabialainen huilu — DYEKHO, CC0' },
      { url: 'https://cdn.freesound.org/previews/466/466570_197130-lq.mp3#voima=0.46', nimi: 'Kalimba-luuppi — CarlosCarty, CC BY' },
      { url: 'https://cdn.freesound.org/previews/843/843466_15636277-lq.mp3#voima=0.15', nimi: 'Rumpu ja kalimba -luuppi — bassimat, CC0' },
      { url: 'https://cdn.freesound.org/previews/666/666866_5737443-lq.mp3#voima=0.15', nimi: 'Hang drum (Dancing Spirit) — MrJmix, CC BY' },
      { url: 'https://cdn.freesound.org/previews/557/557122_2282212-lq.mp3#voima=0.19', nimi: 'Tumma ambient-pinta — szegvari, CC0' },
    ],
  },
  'musiikki:tietovisa:africa': {
    otsikko: 'Afrikka',
    // Omistajan valinta (30.7.) kirjattu oletukseksi: näin se soi myös
    // kotivalikkoon asennetussa pelissä, jonka tallennustila on eri kuin
    // Safarin, jossa studio pyörii.
    oletus: 'assets/audio/musiikki-visa-afrikka-3.mp3',
    ehdokkaat: [
      { url: 'assets/audio/musiikki-visa-afrikka-1.mp3', nimi: 'Kalimba-mietiskely — ElevenLabs-luuppi' },
      { url: 'assets/audio/musiikki-visa-afrikka-2.mp3', nimi: 'Kora-harppu — ElevenLabs-luuppi' },
      { url: 'assets/audio/musiikki-visa-afrikka-3.mp3', nimi: 'Mbira ja helistin — ElevenLabs-luuppi' },
      { url: 'https://cdn.freesound.org/previews/466/466570_197130-lq.mp3#voima=0.46', nimi: 'Kalimba-luuppi — CarlosCarty, CC BY' },
      { url: 'https://cdn.freesound.org/previews/843/843466_15636277-lq.mp3#voima=0.15', nimi: 'Rumpu ja kalimba -luuppi — bassimat, CC0' },
    ],
  },
  'tehoste:dice': {
    otsikko: 'Noppa',
    oletus: 'https://cdn.freesound.org/previews/94/94031_1554038-lq.mp3#voima=0.27',
    ehdokkaat: [
      { url: 'https://cdn.freesound.org/previews/94/94031_1554038-lq.mp3#voima=0.27', nimi: 'Dice Roll — LoafDV, CC0' },
      { url: 'https://cdn.freesound.org/previews/535/535816_9613218-lq.mp3#voima=0.72', nimi: 'Dés — Lendewell, CC0' },
    ],
  },
  'tehoste:pen': {
    otsikko: 'Kirjoituskone (alkuteksti)',
    oletus: 'https://cdn.freesound.org/previews/856/856165_18901108-lq.mp3#voima=0.72',
    ehdokkaat: [
      { url: 'https://cdn.freesound.org/previews/856/856165_18901108-lq.mp3#voima=0.72', nimi: 'Yksittäinen näppäinlyönti — brktkrgll, CC0' },
      { url: 'https://cdn.freesound.org/previews/271/271525_4415905-lq.mp3#voima=1.05', nimi: 'Ylen arkiston Triumph Matura 1970-l. — YleArkisto, CC BY' },
      { url: 'https://cdn.freesound.org/previews/650/650986_3066717-lq.mp3#voima=0.53', nimi: 'Olympia 1956 — AchimEngels, CC0' },
      { url: 'https://cdn.freesound.org/previews/844/844137_2309965-lq.mp3#voima=4.67', nimi: 'Mekaaninen naputus — Alex_hears_things, CC0' },
      { url: 'https://cdn.freesound.org/previews/862/862556_12084000-lq.mp3#voima=0.86', nimi: 'L C Speed 1946 (naputus alkaa ~20 s) — ColinMWJones, CC0' },
    ],
  },
  'tehoste:jet': {
    otsikko: 'Lentokohtauksen moottori',
    // Omistajan valinta (31.7.): sama kuin sound.js:n REAL_SAMPLES.jet.
    oletus: 'https://cdn.freesound.org/previews/315/315660_2506497-lq.mp3#voima=0.23',
    ehdokkaat: [
      { url: 'https://cdn.freesound.org/previews/416/416891_2456794-lq.mp3#voima=0.18', nimi: 'Lentoonlähtö matkustamosta — Apheo, CC0' },
      { url: 'https://cdn.freesound.org/previews/845/845957_14269391-lq.mp3#voima=0.15', nimi: 'Nousu, matkustamo — ElevatorFan2020, CC0' },
      { url: 'https://cdn.freesound.org/previews/577/577480_97550-lq.mp3#voima=0.27', nimi: 'Pienkoneen jyrinä sisältä — TRP, CC0' },
      { url: 'https://cdn.freesound.org/previews/436/436942_843915-lq.mp3#voima=0.15', nimi: 'Matkalento sisältä — Filmscore, CC0' },
      { url: 'https://cdn.freesound.org/previews/315/315660_2506497-lq.mp3#voima=0.23', nimi: 'Potkurikoneen ylilento (ATR 72) — Hoscalegeek, CC0' },
      { url: 'https://cdn.freesound.org/previews/586/586106_11576705-lq.mp3#voima=0.58', nimi: 'Pienen potkurikoneen ohilento — LarsErikErtzgaardRingen, CC0' },
    ],
  },
  'tehoste:quizOpen': {
    otsikko: 'Kysymyksen avaus',
    oletus: 'https://cdn.freesound.org/previews/842/842183_13307919-lq.mp3#voima=4.33',
    ehdokkaat: [
      { url: 'https://cdn.freesound.org/previews/842/842183_13307919-lq.mp3#voima=4.33', nimi: 'Sivunkääntö — AardsReal, CC0' },
      { url: 'https://cdn.freesound.org/previews/165/165464_1956076-lq.mp3#voima=0.33', nimi: 'Harppukuvio — Puniho, CC BY' },
    ],
  },
  // ElevenLabs-efektipilotit: oletus on syntetisoitu ääni, generoitu
  // vaihtoehto otetaan käyttöön valitsemalla se täältä.
  'tehoste:click': {
    otsikko: 'Napin klikkaus',
    oletus: 'assets/audio/efekti-klik.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-klik.mp3', nimi: 'Messinkisalvan naksaus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:paper': {
    otsikko: 'Paperin avaus (kortit)',
    oletus: 'assets/audio/efekti-paperi.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-paperi.mp3', nimi: 'Vanhan kirjan sivu — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:coin': {
    otsikko: 'Kolikot',
    oletus: 'assets/audio/efekti-kolikot.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-kolikot.mp3', nimi: 'Kolikot nahkakukkaroon — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:correct': {
    otsikko: 'Oikea vastaus',
    oletus: 'assets/audio/efekti-oikein.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-oikein.mp3', nimi: 'Messinkikellon helähdys — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:wrong': {
    otsikko: 'Väärä vastaus',
    oletus: 'assets/audio/efekti-vaarin.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-vaarin.mp3', nimi: 'Kirja tömähtää kiinni — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:swipe': {
    otsikko: 'Kortin pyyhkäisy',
    oletus: 'assets/audio/efekti-pyyhkaisy.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-pyyhkaisy.mp3', nimi: 'Paperin viuhaus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:step': {
    otsikko: 'Askel kartalla (väliaskeleen kopina)',
    oletus: 'assets/audio/efekti-naksu.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-naksu.mp3', nimi: 'Nappulan kopina (matala tok) — ElevenLabs SFX' },
      { url: 'assets/audio/efekti-askel.mp3', nimi: 'Saappaan askel polulla — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:arrive': {
    otsikko: 'Saapuminen kaupunkiin (viimeinen kolaus)',
    oletus: 'assets/audio/efekti-naksu.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-naksu.mp3', nimi: 'Nappulan kolaus (korkea tik) — ElevenLabs SFX' },
      { url: 'assets/audio/efekti-saapuminen.mp3', nimi: 'Marimban kaksi nousevaa säveltä — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:ferry': {
    otsikko: 'Laivamatka',
    oletus: 'assets/audio/efekti-laiva.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-laiva.mp3', nimi: 'Höyrylaivan törähdys — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:flight': {
    otsikko: 'Lento (ilmoitus)',
    oletus: 'assets/audio/efekti-lento.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-lento.mp3', nimi: 'Potkurikoneen ohilento — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:hint': {
    otsikko: 'Vihjeen osto',
    oletus: 'assets/audio/efekti-vihje.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-vihje.mp3', nimi: 'Sulkakynän rapsutus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:tick': {
    otsikko: 'Tiimalasin tikitys',
    oletus: 'assets/audio/efekti-tikitys.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-tikitys.mp3', nimi: 'Puukellon tikahdus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:timeout': {
    otsikko: 'Aika loppui',
    oletus: 'assets/audio/efekti-aikaloppui.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-aikaloppui.mp3', nimi: 'Hiekka valuu ja puinen kopsahdus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:flip': {
    otsikko: 'Laatan kääntö',
    oletus: 'assets/audio/efekti-kaanto.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-kaanto.mp3', nimi: 'Puulaatan käännähdys — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:clack': {
    otsikko: 'Nappulan naksu',
    oletus: 'assets/audio/efekti-naksu.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-naksu.mp3', nimi: 'Pelinappula puulaudalle — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:star': {
    otsikko: 'Aarteen paljastus',
    oletus: 'assets/audio/efekti-tahti.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-tahti.mp3', nimi: 'Celestan nouseva kimallus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:gem': {
    otsikko: 'Jalokiven paljastus',
    oletus: 'assets/audio/efekti-jalokivi.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-jalokivi.mp3', nimi: 'Lasinen kimallushelähdys — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:horseshoe': {
    otsikko: 'Hevosenkengän paljastus',
    oletus: 'assets/audio/efekti-kenka.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-kenka.mp3', nimi: 'Metallinen kilahdus puuta vasten — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:robber': {
    otsikko: 'Rosvon paljastus',
    oletus: 'assets/audio/efekti-rosvo.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-rosvo.mp3', nimi: 'Matala rumpuisku ja kalina — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:empty': {
    otsikko: 'Tyhjä laatta',
    oletus: 'assets/audio/efekti-tyhja.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-tyhja.mp3', nimi: 'Pölähdys ja pettynyt kopsahdus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:stuck': {
    otsikko: 'Ei pääse liikkumaan',
    oletus: 'assets/audio/efekti-jumissa.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-jumissa.mp3', nimi: 'Tömähdys ja narahdus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:turn': {
    otsikko: 'Vuoron vaihto',
    oletus: 'assets/audio/efekti-vuoro.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-vuoro.mp3', nimi: 'Sivunkääntö ja kevyt kopsahdus — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
  'tehoste:win': {
    otsikko: 'Voittofanfaari',
    oletus: 'assets/audio/efekti-voitto.mp3',
    ehdokkaat: [
      { url: 'assets/audio/efekti-voitto.mp3', nimi: 'Lyhyt messinkifanfaari — ElevenLabs SFX' },
      { url: null, nimi: 'Syntetisoitu' },
    ],
  },
};

// Kaupungit tyypeittäin ja maanosittain: äänityyppi on yläkategoria,
// sen alla maanosat (laudat) ja niiden alla kaupungit. Uusi maanosa
// ilmestyy studioon heti, kun sen kaupungeille merkitään tyypit —
// jokainen maanosa saa oman arvontakorinsa (omistajan päätös:
// maanosia tulee lisää, eikä Aasian savanni soi Afrikan korista).
// Tyyppikori on nykyään varareitti: kaupungin oma kenttä-äänitys
// (KAUPUNKI_EHDOKKAAT alempana) soi sen edellä, jos sellainen on.
export const KAUPUNGIT_TYYPEITTAIN = {};
for (const pack of PACKS) {
  for (const city of pack.cities) {
    if (!city.ambience) continue;
    const laudat = KAUPUNGIT_TYYPEITTAIN[city.ambience] ??= [];
    let lauta = laudat.find((l) => l.lauta === pack.id);
    if (!lauta) {
      lauta = {
        lauta: pack.id, maanosa: pack.boardLabel ?? pack.name, kaupungit: [], maat: [],
      };
      laudat.push(lauta);
    }
    if (!lauta.kaupungit.includes(city.name)) lauta.kaupungit.push(city.name);
    // Kaupungit ryhmitellään maittain (omistajan päätös: tyyppi →
    // maanosa → maat). Ilman maakytkentää kaupunki jää nimettömään
    // ryhmään, joka listataan pelkin kaupunkinimin.
    const iso = pack.map?.cityCountry?.[city.id] ?? null;
    const maaNimi = iso ? pack.map?.countryShapes?.[iso]?.nimi ?? iso : null;
    let maa = lauta.maat.find((m) => m.nimi === maaNimi);
    if (!maa) {
      maa = { nimi: maaNimi, kaupungit: [] };
      lauta.maat.push(maa);
    }
    if (!maa.kaupungit.includes(city.name)) maa.kaupungit.push(city.name);
  }
}

// Etusivun lähtöaula: oma virtuaalipaikka lentoasema-korille
// (etusivun taustaääni vaihtui satamasta lähtöaulaan 10.8.2026).
{
  const kentta = KAUPUNGIT_TYYPEITTAIN.lentoasema ??= [];
  if (!kentta.some((l) => l.lauta === 'maailma')) {
    const maailma = PACKS.find((p) => p.id === 'maailma');
    const paikat = ['Etusivun lähtöaula'];
    kentta.unshift({
      lauta: 'maailma',
      maanosa: maailma?.boardLabel ?? 'Maailma',
      kaupungit: paikat,
      maat: [{ nimi: null, kaupungit: paikat }],
    });
  }
}

// Avauslennon matkustamo: oma virtuaalipaikka lentokone-korille
// (kalvon taustaääni vaihtui syntetisoidusta moottorista matkustamon
// äänimaisemaan 10.8.2026).
{
  const kone = KAUPUNGIT_TYYPEITTAIN.lentokone ??= [];
  if (!kone.some((l) => l.lauta === 'maailma')) {
    const maailma = PACKS.find((p) => p.id === 'maailma');
    const paikat = ['Avauslennon matkustamo'];
    kone.unshift({
      lauta: 'maailma',
      maanosa: maailma?.boardLabel ?? 'Maailma',
      kaupungit: paikat,
      maat: [{ nimi: null, kaupungit: paikat }],
    });
  }
}

// Virtuaalipaikat kuuluvat Maailma-laudalle: etusivun satama ja
// maailmankartan merimatkat saavat meri-äänensä sen korista. Muilla
// laudoilla merimatka käyttää oman maanosansa koria.
{
  const meri = KAUPUNGIT_TYYPEITTAIN.meri ??= [];
  if (!meri.some((l) => l.lauta === 'maailma')) {
    const maailma = PACKS.find((p) => p.id === 'maailma');
    const paikat = ['Etusivun satama', 'Merimatkat maailmankartalla'];
    meri.unshift({
      lauta: 'maailma',
      maanosa: maailma?.boardLabel ?? 'Maailma',
      kaupungit: paikat,
      maat: [{ nimi: null, kaupungit: paikat }],
    });
  }
}

/**
 * Valinta voi sisältää säätöjä: 'osoite#alku=20&voima=1.5' aloittaa
 * äänitteen 20 sekunnin kohdalta puolitoistakertaisella voimakkuudella.
 * Tämä purkaa muodon soittimia varten. Vanha muoto ('#alku=20') toimii.
 */
/*
 * ÄÄNITE SOI VAIN, KUN TEKSTI TÄSMÄÄ (omistajan linjaus 15.8.2026:
 * "Palauta ElevenLabs-äänet matkakirjoihin joissa ääni ja teksti ajan
 * tasalla. Mutta kun muutoksia tulee niin niihin nykyinen striimausääni.
 * Ei generoida uusia lukuääniä kuin vasta myöhemmin.")
 *
 * Merkinnän luenta-kenttä on täsmälleen se teksti, josta äänite
 * generoitiin — vertaamalla sitä nykyiseen näyttötekstiin tiedetään
 * koneellisesti, onko äänite ajan tasalla. Vertailu ohittaa kaiken,
 * mikä ei kuulu puheessa: tunnetagit [curious], taukotagit <break>,
 * luennan taukopisteet (…), lainausmerkkien kirjon ja kirjainkoon
 * (sähkeet ovat näytössä KAPITEELEIN, puheessa eroa ei ole).
 * Sanamuutos sen sijaan pudottaa äänitteen heti pois käytöstä ja
 * merkintä striimataan lukijaäänellä — uusia äänitteitä EI generoida
 * ennen kuin matkakirjatekstit uudistetaan Raamattu 2.0:n valmistuttua.
 */
export function luentaVastaaTekstia(merkinta) {
  if (!merkinta?.luenta || !merkinta?.kuvaus) return false;
  const puheeksi = (s) => String(s ?? '')
    .replace(/\[[^\]]+\]/g, ' ')
    .replace(/<break[^>]*\/?>/g, ' ')
    .replace(/\.{3}|…/g, ' ')
    .replace(/[„“”"']/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const luettu = puheeksi(merkinta.luenta);
  if (!luettu) return false;
  return luettu === puheeksi(merkinta.kuvaus)
    || luettu === puheeksi([merkinta.kuvaus, merkinta.nosto].filter(Boolean).join(' '));
}

export function jaaAlku(arvo) {
  const teksti = arvo ?? '';
  const risu = teksti.indexOf('#');
  if (risu < 0) return { url: arvo ?? null, alku: 0, voima: 1 };
  const url = teksti.slice(0, risu);
  const osat = Object.fromEntries(
    teksti.slice(risu + 1).split('&').map((p) => p.split('=')).filter((p) => p.length === 2),
  );
  return {
    url,
    alku: Math.max(0, Number(osat.alku) || 0),
    voima: Math.max(0.1, Number(osat.voima) || 1),
  };
}

/** Valittu osoite paikalle, tai null jos oletus kelpaa. */
// Poistetut ehdokkaat: väärin nimetty tai lisenssiä ei voi enää varmistaa
// (esim. lataaja poistanut tilinsä). Vanha tallennettu valinta ohjataan
// takaisin oletukseen, ettei peli jää soittamaan tuntematonta raitaa.
const POISTETUT = new Set([
  'https://cdn.freesound.org/previews/160/160461_1-lq.mp3#voima=0.17',
]);

// Kategoriakohtaiset arvontakorit maanosittain: maisematyypille voi
// valita studiossa jokaiselle maanosalle omat äänensä, joista peli arpoo
// yhden joka käynnillä. Talletusmuoto on { tyyppi: { lauta: [urlit] } };
// vanha muoto { tyyppi: [urlit] } koski kaikkia maanosia ja luetaan yhä.
const TYYPPIKORI_AVAIN = 'matkakirja-tyyppivalinnat';

// Oletuskori: yksi varmistettu ääni per maisematyyppi, kunnes omistaja
// rastii omat valintansa maanosalle. Tyhjäksi tallennettu kori
// tarkoittaa synteesiä.
// Omistajan studiovalinnat (31.7.) kirjattu oletuskoreiksi säätöineen:
// näin sama arvonta soi myös kotivalikon sovelluksessa. Uusi maanosa
// perii nämä, kunnes omistaja rastii sille omat äänensä.
const OLETUSKORIT = {
  lentoasema: [
    'https://cdn.freesound.org/previews/731/731249_10924423-lq.mp3#voima=3.04',
  ],
  lentokone: [
    'https://cdn.freesound.org/previews/433/433002_138-lq.mp3#voima=2.69',
  ],
  basaari: [
    'https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55',
    'https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23',
  ],
  aavikko: [
    'https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#voima=0.98',
    'https://cdn.freesound.org/previews/411/411774_1910728-lq.mp3#voima=5.85',
    'https://cdn.freesound.org/previews/565/565015_12186594-lq.mp3#voima=0.16',
    'https://cdn.freesound.org/previews/635/635912_2247456-lq.mp3#voima=4.31',
    'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27',
  ],
  meri: [
    'https://cdn.freesound.org/previews/848/848927_17398983-lq.mp3#voima=0.82',
    'https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15',
    'https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15',
    'https://cdn.freesound.org/previews/573/573187_97550-lq.mp3#voima=0.54',
    'https://cdn.freesound.org/previews/543/543819_6667441-lq.mp3#alku=22&voima=0.73',
    'https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75',
  ],
  sademetsa: [
    'https://cdn.freesound.org/previews/818/818589_15983207-lq.mp3#voima=0.25',
    'https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36',
    'https://cdn.freesound.org/previews/410/410078_1661766-lq.mp3#voima=0.22',
    'https://cdn.freesound.org/previews/407/407583_1661766-lq.mp3#voima=0.26',
    'https://cdn.freesound.org/previews/253/253301_2409224-lq.mp3#voima=0.48',
  ],
  savanni: [
    'https://cdn.freesound.org/previews/202/202876_1934171-lq.mp3#voima=2.48',
    'https://cdn.freesound.org/previews/714/714271_14696146-lq.mp3#alku=20&voima=0.98',
    'https://cdn.freesound.org/previews/504/504694_778707-lq.mp3#voima=2.4',
    'https://cdn.freesound.org/previews/612/612318_13563349-lq.mp3#voima=0.3',
    'https://cdn.freesound.org/previews/764/764981_15688695-lq.mp3#voima=0.86',
    'https://cdn.freesound.org/previews/411/411996_7037-lq.mp3#alku=52&voima=0.92',
  ],
  ylanko: [
    'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22',
  ],
  kaupunki: [
    'https://cdn.freesound.org/previews/723/723081_2978883-lq.mp3#voima=0.55',
    'https://cdn.freesound.org/previews/677/677253_9756914-lq.mp3#voima=0.47',
    'https://cdn.freesound.org/previews/511/511005_571436-lq.mp3#voima=1.23',
  ],
  satama: [
    'https://archive.org/download/aporee_8703_10524/CityCountryMeSassnitzFischereihafenFender.mp3#voima=0.33',
    'https://cdn.freesound.org/previews/570/570907_11519060-lq.mp3#voima=0.75',
    'https://cdn.freesound.org/previews/635/635103_10065335-lq.mp3#voima=0.15',
  ],
  vuoristo: [
    'https://archive.org/download/aporee_68991_80056/almaporeejochbergalm12uhr30.mp3#voima=0.5',
    'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22',
  ],
  metsa: [
    'https://archive.org/download/aporee_40377_46111/rs12.mp3#voima=0.36',
    'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27',
  ],
  pohjoinen: [
    'https://cdn.freesound.org/previews/543/543449_3377875-lq.mp3#voima=0.22',
    'https://cdn.freesound.org/previews/579/579250_2977885-lq.mp3#voima=0.27',
    'https://cdn.freesound.org/previews/411/411509_1661766-lq.mp3#voima=0.15',
  ],
};

export function tyyppiKori(tyyppi, lauta) {
  try {
    const kaikki = JSON.parse(localStorage.getItem(TYYPPIKORI_AVAIN) ?? '{}');
    const merkinta = kaikki[tyyppi];
    const lista = Array.isArray(merkinta) ? merkinta : merkinta?.[lauta];
    if (Array.isArray(lista)) return lista.filter(Boolean);
  } catch {
    /* yksityinen selaustila — oletuskori kelpaa */
  }
  return OLETUSKORIT[tyyppi] ?? [];
}

/** Tallentaa tyypin arvontakorin yhdelle maanosalle (laudalle). */
export function valitseTyyppiKori(tyyppi, lauta, lista) {
  try {
    const kaikki = JSON.parse(localStorage.getItem(TYYPPIKORI_AVAIN) ?? '{}');
    const vanha = kaikki[tyyppi];
    // Vanhan muodon lista koski kaikkia maanosia: se siirretään jokaiselle
    // tyypin nykyiselle laudalle, ettei yhden maanosan muokkaus hukkaa
    // muiden perimää valintaa.
    const merkinta = Array.isArray(vanha)
      ? Object.fromEntries((KAUPUNGIT_TYYPEITTAIN[tyyppi] ?? []).map((l) => [l.lauta, vanha]))
      : { ...(vanha ?? {}) };
    // Tyhjäkin lista tallennetaan: se tarkoittaa syntetisoitua ääntä,
    // eikä oletuskori saa palata sen tilalle.
    merkinta[lauta] = lista ?? [];
    kaikki[tyyppi] = merkinta;
    localStorage.setItem(TYYPPIKORI_AVAIN, JSON.stringify(kaikki));
  } catch {
    /* yksityinen selaustila — kori ei säily */
  }
}

/*
 * Kaupunkien omat kenttä-äänitykset.
 *
 * Tyyppikori antaa saman äänen kaikille saman maiseman kaupungeille:
 * Euroopassa 22 kaupunkia jakoi kolme "kaupunki"-ääntä, joten Praha ja
 * Lissabon kuulostivat samalta. Nämä äänitteet on tehty juuri siinä
 * kaupungissa. Ne on haettu radio aporeesta koordinaattien perusteella
 * (tools/hae-kaupunkiaanet.mjs), ei nimen perusteella arvaten, ja
 * jokainen on kuunneltu läpi: yleinen äänimaisema kelpaa, tapahtuma tai
 * sisätila ei.
 *
 * Muoto on sama kuin tyyppikorilla — lista osoitteita, joista peli arpoo
 * yhden kaupunkiin saavuttaessa. Osoite voi kantaa aloituskohdan ja
 * voimakkuuden (#alku=20&voima=1.5). Ilman merkintää kaupunki putoaa
 * tyyppikoriin kuten ennen.
 */
export const KAUPUNKI_EHDOKKAAT = {
  europe: {
    lontoo: [
      { url: 'https://archive.org/download/aporee_5304_6751/AutumnDayStJamesparkLondon.mp3#voima=0.56',
        nimi: 'St James\'s Parkin syysiltapäivä — john grzinich, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_37194_42604/20170721StJamessParkOpprearofDowningSt.mp3#voima=0.66',
        nimi: 'St James\'s Park Downing Streetin takana — Toby Cottrell, public domain' },
    ],
    istanbul: [
      { url: 'https://archive.org/download/aporee_8127_9900/tierebeiyenicami.mp3#voima=0.24',
        nimi: 'Lintutori — Adi W, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_6217_7744/SundaysoundscapeTunel1640.mp3#voima=0.43',
        nimi: 'Tünelin äänimaisema sunnuntaina — john grzinich, CC BY-SA' },
    ],
    dublin: [
      { url: 'https://archive.org/download/aporee_18838_21851/StStephensGreenWorldListeningDay180713.mp3#voima=1.96',
        nimi: 'Kesäiltapäivä St Stephen\'s Greenissä — billy k, public domain' },
      { url: 'https://archive.org/download/aporee_11063_13080/18thJuly2011WorldListeningDayMiddayBellsEarlStreetSouth.MP3',
        nimi: 'Keskipäivän kellot Earl Streetillä — billy k, CC BY-SA' },
    ],
    edinburgh: [
      { url: 'https://archive.org/download/aporee_31551_36245/22032016104pmhartstreetgardenschogarth.mp3#voima=1.48',
        nimi: 'Puutarhojen kastelua Hart Streetin takana — Felicity Ford, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_31550_36244/220320161210pmgeorgeivparkblackbird.mp3#voima=0.72',
        nimi: 'Mustarastas George IV -puistossa — Felicity Ford, CC BY-SA' },
    ],
    pariisi: [
      { url: 'https://archive.org/download/aporee_8974_10822/parisruemontorgueil.mp3#voima=0.96',
        nimi: 'Rue Montorgueil — Adi W, CC BY-SA' },
    ],
    marseille: [
      { url: 'https://archive.org/download/aporee_40436_46176/201855QuaiduPortseafluxboatmurmur1737.mp3#voima=0.25',
        nimi: 'Vanha satama: veneiden narinaa ja puheensorinaa — OR poiesis, CC BY-NC-ND' },
    ],
    lissabon: [
      { url: 'https://archive.org/download/aporee_60580_69616/20160705004glisedeSantaLuisaPCMD100.mp3#voima=0.51',
        nimi: 'Praça Júlio de Castilho — Flavien Gillié, public domain' },
    ],
    madrid: [
      { url: 'https://archive.org/download/aporee_23518_27342/2014052405CentroCvicoTallerBrandonLabellePlazaCorralaPaseosonoroporinstalacinsillasdiariosoutwav.mp3#voima=0.34',
        nimi: 'Plaza de la Corrala, Lavapiés — Kamen Nedev, public domain' },
    ],
    barcelona: [
      { url: 'https://archive.org/download/aporee_41792_47644/MD220006RD01.mp3#voima=0.15',
        nimi: 'La Rambla ja lintutori — Andrzej Maciejewski, CC BY-NC-SA' },
    ],
    granada: [
      { url: 'https://archive.org/download/aporee_61524_70763/230214020BPlazaNuevaPilardelToro.mp3#voima=0.49',
        nimi: 'Plaza de Santa Ana — Paz Tornero, CC BY-NC-ND' },
      { url: 'https://archive.org/download/aporee_61541_70780/230516002CatedralfrentealtarmasvolumenFadeAadido.mp3#voima=4.78',
        nimi: 'Plaza de las Pasiegas tuomiokirkon vieressä — Paz Tornero, CC BY-NC-ND' },
    ],
    amsterdam: [
      { url: 'https://archive.org/download/aporee_9337_11221/BInterieurtramAdam.mp3#voima=0.67',
        nimi: 'Raitiovaunu linjalla 1 — Thijs Geritz, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_70257_81862/AmsterdamMarkenpleinWaterloopleinlopendBinaural.mp3#voima=2.15',
        nimi: 'Sadepäivä Waterloopleinille — Jillis Molenaar, public domain' },
    ],
    berliini: [
      { url: 'https://archive.org/download/aporee_54966_62839/Gitschnerstr.mp3#voima=0.28',
        nimi: 'Arkea Gitschiner Straßella — sam auinger, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_2104_67340/berlinBuerkner9Hhof29102022.mp3#voima=1.34',
        nimi: 'Aamu takapihan ikkunasta, Bürknerstraße — udo noll, CC BY-SA' },
    ],
    praha: [
      { url: 'https://archive.org/download/aporee_5354_6805/karluvmost.mp3#voima=0.22',
        nimi: 'Kaarlensilta — milos, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_14029_16351/svantonin.mp3#voima=0.37',
        nimi: 'Pyhän Antoniuksen kirkko Strossmayerin aukiolla — milos, public domain' },
    ],
    wien: [
      { url: 'https://archive.org/download/aporee_60623_69666/WienJosefStraussParkAmbient.mp3#voima=1.36',
        nimi: 'Josef-Straußin puiston ambienssi — chr_friess, public domain' },
      { url: 'https://archive.org/download/aporee_34815_40020/17012201Vienna1830.mp3#voima=3.09',
        nimi: 'Katusoittajia Stefaninkirkon edessä — damir.kustic, public domain' },
    ],
    budapest: [
      { url: 'https://archive.org/download/aporee_54374_62197/81BIBUDAPESZTTramtripFromArenatoKonyvesKalmankorut170122163550.mp3#voima=0.31',
        nimi: 'Raitiovaunumatka — Piotrek Zyla, public domain' },
    ],
    varsova: [
      { url: 'https://archive.org/download/aporee_71588_83518/2503101259.mp3#voima=0.43',
        nimi: 'Plac Zbawiciela, raitiovaunut ohittavat — Andrzej Maciejewski, CC BY-NC' },
      { url: 'https://archive.org/download/aporee_71577_83505/2503081558.mp3#voima=0.34',
        nimi: 'Leikkipuisto ja katu — Andrzej Maciejewski, CC BY-NC' },
    ],
    krakova: [
      { url: 'https://archive.org/download/aporee_71560_83484/2502221312.mp3#voima=0.35',
        nimi: 'Kahvila vanhassakaupungissa — Andrzej Maciejewski, CC BY-NC' },
      { url: 'https://archive.org/download/aporee_11573_13626/hejnal.mp3#voima=1.85',
        nimi: 'Suuri tori (Rynek Główny) — Anna Nacher, CC BY-SA' },
    ],
    alpit: [
      { url: 'https://archive.org/download/aporee_38136_43618/GlockenderKircheSanMaternoOrasso.mp3#voima=0.21',
        nimi: 'Orasson kirkonkellot — Fido, public domain' },
      { url: 'https://archive.org/download/aporee_10342_12318/06caviano.mp3#voima=2.62',
        nimi: 'Cavianon kujat, Ticino — maboart ja ursula bohren, CC BY-SA' },
    ],
    venetsia: [
      { url: 'https://archive.org/download/aporee_52547_60044/20180524PlaceSazintMarcr1session20210316.mp3#voima=0.68',
        nimi: 'Piazza San Marco: väkeä ja kelloja — Flavien Gillié, CC BY-NC-SA' },
      { url: 'https://archive.org/download/aporee_27844_32090/201556veniceNightWalk2246.mp3#voima=0.31',
        nimi: 'Yökävely Venetsian kujilla — OR poiesis, CC BY-SA' },
    ],
    rooma: [
      { url: 'https://archive.org/download/aporee_60994_70119/AMBUrbnStereoTreviFountainTuristsdifferentlangauagesaccordion.mp3#voima=0.28',
        nimi: 'Trevin lähde — Josue Amador, public domain' },
    ],
    sisilia: [
      { url: 'https://archive.org/download/aporee_13977_16297/bambino.mp3#voima=0.36',
        nimi: 'Vuohilauma ja paimenten huudot, Geraci Siculo — hatoriyumi, public domain' },
      { url: 'https://archive.org/download/aporee_61268_70466/AMBRoccazzelleSicilybeachpeoplewavesaugust.mp3#voima=3.23',
        nimi: 'Roccazzellen ranta — Andrea Gianessi, CC BY-NC-SA' },
    ],
    ateena: [
      { url: 'https://archive.org/download/aporee_30592_35195/hackny.mp3#voima=0.46',
        nimi: 'Lapsia ja hevosvaunu Dionysiou Areopagitoulla — maciej janasik, CC BY' },
      { url: 'https://archive.org/download/aporee_52826_60346/515ORTFATHENScityambientwithmusicfromFilopappouhillwestside190308001.mp3#voima=0.4',
        nimi: 'Kaupungin ääni Filopappoksen kukkulalta — Piotrek Zyla, public domain' },
    ],
    kreeta: [
      { url: 'https://archive.org/download/aporee_14962_17435/back.mp3#voima=0.53',
        nimi: 'Iraklionin sivukatu turistireitin ulkopuolella — maciej janasik, public domain' },
      { url: 'https://archive.org/download/aporee_14954_17425/wav.mp3#voima=0.47',
        nimi: 'Aallot Iraklionin venesataman laiturilla — maciej janasik, public domain' },
    ],
    dubrovnik: [
      { url: 'https://archive.org/download/aporee_69938_81439/AMBextclosecavewaterseamerwavemouvementbasseauCroatieDubrovnikdancebeachMAUMUS.mp3#voima=3.28',
        nimi: 'Aallot luolassa — maumus.nico, public domain' },
      { url: 'https://archive.org/download/aporee_59836_68692/wallsofdubrovnik.mp3#voima=2.42',
        nimi: 'Dubrovnikin muurit — Roberto Vodanović Čopor, public domain' },
    ],
    sarajevo: [
      { url: 'https://archive.org/download/aporee_72320_84455/stjosephchurchsarajevo.mp3#voima=0.33',
        nimi: 'Baščaršijan äänimaisema — Haris Sahačić, public domain' },
    ],
    sofia: [
      { url: 'https://archive.org/download/aporee_15487_18036/LS111000kopor.mp3#voima=0.17',
        nimi: 'Naistentori — Jüang Ren, public domain' },
      { url: 'https://archive.org/download/aporee_15484_18033/LS110795.mp3#voima=0.15',
        nimi: 'Bitakan kirpputori — Jüang Ren, public domain' },
    ],
    bukarest: [
      { url: 'https://archive.org/download/aporee_63552_73145/992BIBUCHARESTchildrenplayinginIcoaneipark230505at1055.mp3#voima=0.6',
        nimi: 'Lapsia Icoanein puistossa — Piotrek Zyla, public domain' },
    ],
    kiova: [
      { url: 'https://archive.org/download/aporee_41361_47183/upload20180928140034.mp3#voima=1.97',
        nimi: 'Lintuja ja katua puistossa — soundkovalsky, public domain' },
      { url: 'https://archive.org/download/aporee_41362_47184/upload20180928142313.mp3#voima=1.24',
        nimi: 'Olena Telihan katu: linnut ja liikenne — soundkovalsky, public domain' },
    ],
    odessa: [
      { url: 'https://archive.org/download/aporee_33457_38490/LS112245.mp3#voima=0.15',
        nimi: 'Raitiovaunumatka kaupungin halki — Jüang Ren, public domain' },
    ],
    moskova: [
      { url: 'https://archive.org/download/aporee_2952_4003/RoterPlatz.mp3#voima=0.22',
        nimi: 'Punainen tori — botsch, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_47375_53831/200127004.mp3#voima=1.08',
        nimi: 'Donskajan aukio — val.trubin, public domain' },
    ],
    pietari: [
      { url: 'https://archive.org/download/aporee_69929_81429/ambienceatmosphereofeveningcitystreetnearnoisyavenue.mp3#voima=0.52',
        nimi: 'Iltakatu keskustassa — albert.mail, public domain' },
      { url: 'https://archive.org/download/aporee_39420_45057/B1.mp3#voima=0.19',
        nimi: 'Sennajan aukio — yakovlurie, public domain' },
    ],
    helsinki: [
      { url: 'https://archive.org/download/aporee_13153_15385/11081005HelsinkiKauppatori171216bit224.mp3#voima=2.22',
        nimi: 'Kauppatori — damir.kustic, public domain' },
    ],
    tallinna: [
      { url: 'https://archive.org/download/aporee_46851_53197/AsonicwalkanddeeplisteningtoKalamaja1.mp3#voima=5.75',
        nimi: 'Kalamajan puisto, hidas kävely — bruno.quast, public domain' },
      { url: 'https://archive.org/download/aporee_10868_12873/tallinnKopliMaratiPark110707b.mp3#voima=0.91',
        nimi: 'Koplin puisto — udo noll, CC BY-SA' },
    ],
    riika: [
      { url: 'https://archive.org/download/aporee_57929_66350/rigachanelunderwater.mp3#voima=1.72',
        nimi: 'Kanaali — alas23/sala, public domain' },
      { url: 'https://archive.org/download/aporee_57927_66348/rigacenterwalk2030.mp3#voima=1.19',
        nimi: 'Iltakävely — alas23/sala, public domain' },
    ],
    vilna: [
      { url: 'https://archive.org/download/aporee_53389_61000/SokantisFontanas.mp3#voima=0.19',
        nimi: 'Tanssiva suihkulähde puistossa — Marius Paulikas, public domain' },
      { url: 'https://archive.org/download/aporee_9230_11102/vilnius1.mp3#voima=0.41',
        nimi: 'Linnut kaupungin melussa — alas23/sala, CC BY-SA' },
    ],
    /*
     * Omistajan valinta 7.8.2026 (työhuoneen Todo Samille -välilehti,
     * v322): "Penkki Saltsjön rannalla on paras."
     *
     * Aiemmat kaksi (Norrmalmin liikenne ja kukkatori) korvattiin
     * kokonaan eikä jätetty koriin rinnalle: ne olivat liikennettä ja
     * toria, ja lehden Tukholma on vettä ja saaristoa — arvonta olisi
     * palauttanut vanhan tunnelman joka toinen käynti. Kori saa olla
     * yhden mittainen, kuten Kööpenhaminalla ja Lapilla.
     *
     * voima=0.66 on mitattu, ei arvattu: -29,4 LUFS tavoitteeseen -33
     * (tools/mittaa-aanet.mjs, sama mittari kuin muillakin).
     */
    tukholma: [
      { url: 'https://archive.org/download/aporee_61439_75490/ModernaMuseet88231745editedstockholm.mp3#voima=0.66',
        nimi: 'Penkki Saltsjön rannalla — kylekristopherberry, public domain' },
    ],
    oslo: [
      { url: 'https://archive.org/download/aporee_45891_52120/carillondiOslo.mp3#voima=0.52',
        nimi: 'Kaupungintalon kellopeli — saveriodecian, public domain' },
      { url: 'https://archive.org/download/aporee_19365_22488/LS111550park.mp3#voima=1.78',
        nimi: 'Kävely Vigelandin puistossa — alas23/sala, public domain' },
    ],
    kobenhavn: [
      { url: 'https://archive.org/download/aporee_6346_7890/verkehrboulevard.MP3',
        nimi: 'Åboulevardin liikenne myöhään illalla — Adi W, CC BY-SA' },
    ],
    lappi: [
      { url: 'https://archive.org/download/aporee_32161_36945/patrickmcginley20160505kemijokibridge.mp3#voima=0.22',
        nimi: 'Kemijoen ranta sillan alla, Rovaniemi — patrick mcginley, CC BY-NC-SA' },
    ],
    tromssa: [
      { url: 'https://archive.org/download/aporee_65563_75724/Harbour20241014174716.mp3#voima=0.82',
        nimi: 'Sataman ponttoni narisee — anguscarlyle, public domain' },
      { url: 'https://archive.org/download/aporee_65153_75248/AmundsenPark.mp3#voima=0.92',
        nimi: 'Roald Amundsenin aukion puisto — anguscarlyle, public domain' },
    ],
    islanti: [
      { url: 'https://archive.org/download/aporee_1475_2022/neoscenes0924074birdstreet2is.mp3#voima=0.24',
        nimi: 'Lintu kadun varrella — John Hopkins, CC BY-SA' },
      { url: 'https://archive.org/download/aporee_61946_71274/231021Trollafoss.mp3#voima=0.18',
        nimi: 'Tröllafossin vesiputous — john grzinich, CC BY-NC-ND' },
    ],
  },
};

/** Omat äänitykset saaneet kaupungit laudoittain — äänistudiota varten. */
export const KAUPUNKI_LISTA = PACKS
  .map((pack) => ({
    lauta: pack.id,
    maanosa: pack.boardLabel ?? pack.name,
    kaupungit: pack.cities
      .filter((c) => (KAUPUNKI_EHDOKKAAT[pack.id] ?? {})[c.id]?.length)
      .map((c) => ({
        id: c.id, nimi: c.name, ehdokkaat: KAUPUNKI_EHDOKKAAT[pack.id][c.id],
      })),
  }))
  .filter((l) => l.kaupungit.length);

const KAUPUNKIKORI_AVAIN = 'matkakirja-kaupunkivalinnat';

/** Kaupungin arvontakori: studiovalinta, muuten kaikki sen äänitykset. */
/*
 * Yhdistetty lauta perii mannerlautojen kaupunkiäänet.
 *
 * KAUPUNKI_EHDOKKAAT on avainnettu lautatunnuksella, ja se on tässä
 * projektissa toistuva ansa: yhdistetty lauta ei ole minkään
 * mannerlaudan tunnus, joten se putoaa jokaisesta tällaisesta
 * hausta läpi hiljaa. Euroopan 41 kaupunkiäänitystä olivat siis
 * olemassa mutta eivät soineet lainkaan sillä laudalla, jota
 * oikeasti pelataan — kaikki 143 kaupunkia soittivat yleiskoria.
 *
 * Vika ei näy mistään: ääntä kuuluu, se on oikean maiseman ääni,
 * eikä mikään kaadu. Se vain ei ole sen kaupungin ääni.
 *
 * Periytyminen kirjoitetaan tähän eikä kutsupaikkaan, jotta uusi
 * kutsuja ei voi unohtaa sitä.
 */
const YHDISTETYT = {
  maailmankartta: ['europe', 'africa', 'middleeast', 'asia', 'oceania', 'northamerica', 'southamerica'],
  maailma: ['europe', 'africa', 'middleeast', 'asia', 'oceania', 'northamerica', 'southamerica'],
};

/** Laudan omat kaupunkiäänet, yhdistetyillä laudoilla osalautojen omat. */
function laudanKaupungit(lauta) {
  const osat = YHDISTETYT[lauta];
  if (!osat) return KAUPUNKI_EHDOKKAAT[lauta] ?? {};
  // Ensimmäinen osuma voittaa: sama kaupunkitunnus voi olla kahdella
  // mannerlaudalla (Istanbul on sekä Euroopassa että Lähi-idässä).
  const ulos = {};
  for (const osa of osat) {
    for (const [id, lista] of Object.entries(KAUPUNKI_EHDOKKAAT[osa] ?? {})) {
      if (!ulos[id]) ulos[id] = lista;
    }
  }
  return ulos;
}

export function kaupunkiKori(lauta, cityId) {
  try {
    const kaikki = JSON.parse(localStorage.getItem(KAUPUNKIKORI_AVAIN) ?? '{}');
    const lista = kaikki[lauta]?.[cityId];
    if (Array.isArray(lista)) return lista.filter(Boolean);
  } catch {
    /* yksityinen selaustila — oletus kelpaa */
  }
  return (laudanKaupungit(lauta)[cityId] ?? [])
    .map((e) => (e.alku ? `${e.url}#alku=${e.alku}` : e.url));
}

/**
 * Maan arvontakori: saman maan muiden kaupunkien äänitykset.
 *
 * Periaate 2b (paikka ennen lajia): ääni haetaan niin läheltä kuin
 * mahdollista. Jos kaupungista itsestään ei ole nauhoitusta, saman maan
 * toinen kaupunki on lähempänä kuin lajikohtainen varamies — Fesin tori
 * kuulostaa enemmän Marrakechilta kuin geneerinen basaarinauha.
 *
 * Lajikohtainen kori jää viimeiseksi varamieheksi. Sama basaarinauha
 * kolmessa kaupungissa kertoisi pelaajalle, että paikat ovat
 * vaihtokelpoisia, ja se on vastoin periaatetta 3.
 */
export function maaKori(lauta, cityId, cityCountry) {
  const iso = cityCountry?.[cityId];
  if (!iso) return [];
  const omat = laudanKaupungit(lauta);
  const ulos = [];
  for (const [muu, lista] of Object.entries(omat)) {
    if (muu === cityId || cityCountry[muu] !== iso) continue;
    for (const e of lista) ulos.push(e.alku ? `${e.url}#alku=${e.alku}` : e.url);
  }
  return ulos;
}

/** Tallentaa yhden kaupungin arvontakorin. Tyhjä lista = tyyppikoriin. */
export function valitseKaupunkiKori(lauta, cityId, lista) {
  try {
    const kaikki = JSON.parse(localStorage.getItem(KAUPUNKIKORI_AVAIN) ?? '{}');
    kaikki[lauta] = { ...(kaikki[lauta] ?? {}), [cityId]: lista ?? [] };
    localStorage.setItem(KAUPUNKIKORI_AVAIN, JSON.stringify(kaikki));
  } catch {
    /* yksityinen selaustila — kori ei säily */
  }
}

export function valittuAani(slot) {
  try {
    const arvo = JSON.parse(localStorage.getItem(AVAIN) ?? '{}')[slot] ?? null;
    if (arvo && POISTETUT.has(jaaAlku(arvo).url ?? '')) return null;
    return arvo;
  } catch {
    return null;
  }
}

/**
 * Tallentaa valinnan. `url` null tarkoittaa "syntetisoitu": se
 * tallennetaan tyhjänä merkkijonona, jotta se eroaa poistetusta
 * valinnasta (oletus).
 */
/**
 * Valinta tai slotin oletus: selaimeen tallennettu valinta voittaa, mutta
 * ilman sitä palataan EHDOKKAAT-oletukseen. Tärkeä erityisesti
 * kotivalikkoon asennetussa pelissä, jonka tallennustila on eri kuin
 * Safarin — sinne studio-valinnat eivät kulje, oletukset kulkevat.
 * Tyhjä merkkijono ('' = ääni valittu pois) kunnioitetaan sellaisenaan.
 */
export function valittuTaiOletus(slot) {
  const arvo = valittuAani(slot);
  if (arvo !== null) return arvo;
  return EHDOKKAAT[slot]?.oletus ?? null;
}

export function valitseAani(slot, url) {
  try {
    const valinnat = JSON.parse(localStorage.getItem(AVAIN) ?? '{}');
    if (url === undefined) delete valinnat[slot];
    else valinnat[slot] = url ?? '';
    localStorage.setItem(AVAIN, JSON.stringify(valinnat));
  } catch {
    /* yksityinen selaustila — valinta ei säily */
  }
}

// Kertojan tila (omistajan toive, yläpalkin valikko): 'pitka' lukee
// kaiken kuten ennenkin, 'lyhyt' vain matkakirjan nuoren herran
// osuuden, 'ei' mykistää kertojan mutta jättää muut äänet soimaan
// (matkakirjan kaiutinnappi yliajaa hetkellisesti). Täysi mykistys on
// erikseen sound.js:n enabled-tilassa.
const KERTOJA_AVAIN = 'matkakirja-kertoja';

export function kertojaTila() {
  try {
    const t = localStorage.getItem(KERTOJA_AVAIN);
    return ['ei', 'lyhyt', 'pitka'].includes(t) ? t : 'pitka';
  } catch {
    return 'pitka';
  }
}

export function asetaKertojaTila(tila) {
  try {
    localStorage.setItem(KERTOJA_AVAIN, tila);
  } catch {
    /* yksityinen selaustila — valinta ei säily */
  }
}

// Puheen voimakkuus: yksi yleinen säätö kaikkiin luentoihin (intro,
// saapumiset, kuuntele-napit) — luentoja ei eritellä (omistajan päätös).
const PUHEVOIMA_AVAIN = 'matkakirja-puhevoima';

export function puheVoima() {
  try {
    const arvo = Number(localStorage.getItem(PUHEVOIMA_AVAIN));
    if (Number.isFinite(arvo) && arvo > 0) return Math.min(1, Math.max(0.1, arvo));
  } catch {
    /* yksityinen selaustila — oletus kelpaa */
  }
  return 0.9;
}

export function asetaPuheVoima(arvo) {
  try {
    localStorage.setItem(PUHEVOIMA_AVAIN, String(arvo));
  } catch {
    /* ei säily */
  }
}

/** Kaikki valinnat kerralla (Kopioi valinnat -nappia varten). */
export function kaikkiValinnat() {
  try {
    return JSON.parse(localStorage.getItem(AVAIN) ?? '{}');
  } catch {
    return {};
  }
}
