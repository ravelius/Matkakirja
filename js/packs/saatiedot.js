/*
 * Säätiedot lehtikaupungeille (omistajan toive 5.8.2026): lehden
 * etusivulla näkyy päivän sääennuste, ja sitä napauttamalla aukeaa
 * koko vuoden keskilämpö ja sademäärä graafina.
 *
 * Rakenne per kaupunki (avain = kaupunki-id, sama kuin
 * KULTTUURI_KATEGORIAT):
 *
 *   lat, lon  — ennustehaku (Open-Meteo, avaimeton ja CORS-avoin)
 *   keskilampo[12] — kuukauden keskilämpö °C, tammikuusta joulukuuhun
 *   ylin[12], alin[12] — kuukauden tyypillinen ylin ja alin
 *                  päivälämpö °C kokonaislukuina (omistajan toive
 *                  18.8.2026). Näistä piirtyy vuosigraafin
 *                  vaihteluvyöhyke keskilämpökäyrän taakse. Rivit
 *                  ovat KONEEN kirjoittamat:
 *                    NODE_USE_ENV_PROXY=1 node tools/hae-saanormaalit.mjs
 *                  Työkalu kertoo omassa alkukommentissaan, miksi
 *                  luvut lasketaan otoksesta ja miten ne asetetaan
 *                  keskilämmön ympärille. Kentät ovat VALINNAISIA:
 *                  ilman niitä graafi piirtyy ilman kaistaa.
 *   sade[12]  — kuukauden sademäärä mm
 *   luonnehdinta — VALINNAINEN 2–3 lauseen kuvaus vuodenkierrosta
 *                  (omistajan toive 17.8.2026). Se näkyy vuosigraafin
 *                  alla lehden vuosiennustekortissa. Väitteet nousevat
 *                  saman rivin omista normaaleista; jos mukana on
 *                  tunnettu ilmastopiirre (monsuuni, kaamos), lähde
 *                  kirjataan rivin viereen kommenttiin. Ilman kenttää
 *                  kortti näkyy ennallaan.
 *
 * Normaalit ovat staattista dataa TARKOITUKSELLA: vuosigraafi ja
 * ennusteen varateksti toimivat myös ilman verkkoa (lentokoneessa).
 * Ne on laskettu Open-Meteon arkistosta (ERA5) jaksolta 1991–2020 —
 * sama jakso kuin virallisissa ilmastonormaaleissa. Lähderivi
 * graafissa: "Open-Meteo (ERA5), 1991–2020".
 *
 * Uusi lehtikaupunki tarvitsee vain oman rivinsä tähän — koodia ei
 * tarvitse muuttaa. Ilman riviä lehti näkyy ilman säätä.
 */
export const SAATIEDOT = {
  lontoo: {
    lat: 51.51,
    lon: -0.13,
    keskilampo: [4.7, 4.9, 6.8, 9.2, 12.5, 15.5, 17.7, 17.4, 14.8, 11.4, 7.7, 5.2],
    ylin: [7, 8, 10, 14, 17, 20, 21, 22, 19, 14, 11, 8],
    alin: [2, 2, 3, 5, 8, 11, 14, 13, 11, 9, 4, 3],
    sade: [55, 47, 43, 49, 52, 56, 55, 61, 48, 60, 64, 59],
    luonnehdinta: 'Lontoon vuodessa on vähän dramatiikkaa: tammikuun '
      + 'vajaasta viidestä asteesta noustaan heinäkuun vajaaseen '
      + 'kahdeksaantoista, eikä kumpikaan pää tunnu erityisen kylmältä '
      + 'tai kuumalta. Sade jakautuu kahdelletoista kuukaudelle niin '
      + 'tasaisesti, että kuivimman ja sateisimman kuukauden ero on '
      + 'parikymmentä millimetriä. Syksy on silti hitusen märempi kuin '
      + 'kevät.',
  },
  kairo: {
    lat: 30.05,
    lon: 31.23,
    keskilampo: [13.6, 14.7, 17.5, 21.3, 25.2, 27.9, 29.0, 29.1, 27.4, 24.2, 19.5, 15.2],
    ylin: [19, 20, 24, 28, 33, 36, 37, 37, 34, 31, 25, 21],
    alin: [9, 9, 11, 14, 18, 20, 21, 22, 21, 17, 14, 10],
    sade: [4, 4, 4, 1, 0, 0, 0, 0, 0, 1, 2, 2],
    luonnehdinta: 'Kairossa vuosi jakautuu kuumaan ja lämpimään, ei '
      + 'sateiseen ja kuivaan: touko–syyskuussa sadetta ei kirjaudu '
      + 'lainkaan, ja sateisinkin talvikuukausi jää neljään '
      + 'millimetriin. Heinä- ja elokuussa keskilämpö on lähes '
      + 'kolmekymmentä astetta, eli päivällä selvästi enemmän. Talvi '
      + 'on se aika, jolloin keskipäivälläkin voi kävellä — tammikuun '
      + 'keskilämpö on neljäntoista tienoilla.',
  },
  // Madrid on 650 metrin korkeudessa keskellä ylätasankoa: kesä on
  // kuumempi ja talvi kylmempi kuin rannikon Espanjassa, ja heinäkuun
  // sade on lähes olematon.
  madrid: {
    lat: 40.42,
    lon: -3.70,
    keskilampo: [4.7, 6.1, 9.5, 12.1, 16.5, 22.1, 25.8, 25.3, 20.4, 14.5, 8.7, 5.5],
    ylin: [9, 12, 16, 17, 23, 28, 33, 32, 27, 20, 13, 9],
    alin: [0, 0, 3, 7, 10, 16, 19, 18, 13, 9, 4, 2],
    sade: [39, 32, 39, 46, 38, 15, 6, 8, 21, 58, 54, 44],
    luonnehdinta: 'Madridissa vuodenajat erottuvat toisistaan jyrkemmin '
      + 'kuin muualla Espanjassa: tammikuu jää alle viiden asteen ja '
      + 'heinäkuu nousee lähes kahteenkymmeneenkuuteen. Kesä on samalla '
      + 'lähes sateeton — heinäkuussa vettä tulee kuusi millimetriä ja '
      + 'elokuussa kahdeksan. Vuoden sade painottuu syksyyn ja '
      + 'kevääseen, ja koko summa jää neljäänsataan millimetriin.',
  },
  // Tukholma on 59. leveyspiirillä mutta meren keskellä: talvi on
  // leudompi kuin sisämaassa samalla korkeudella, ja sade jakautuu
  // tasaisesti vuoteen — kesä on silti sateisin aika.
  tukholma: {
    lat: 59.33,
    lon: 18.07,
    keskilampo: [-1.4, -1.6, 0.8, 5.2, 10.3, 14.8, 17.8, 17.1, 12.8, 7.4, 3.2, 0.1],
    ylin: [1, 1, 3, 9, 14, 19, 22, 21, 16, 10, 5, 1],
    alin: [-3, -4, -2, 2, 6, 10, 14, 13, 10, 5, 1, -1],
    sade: [37, 31, 32, 33, 43, 64, 65, 69, 50, 50, 48, 46],
    luonnehdinta: 'Talvi käy pakkasen puolella vain tammi- ja '
      + 'helmikuussa, ja silloinkin vain asteen verran. Kesä on lyhyt '
      + 'mutta oikea kesä: heinäkuussa keskimäärin lähes kahdeksantoista '
      + 'astetta. Vettä tulee eniten elokuussa, lähes seitsemänkymmentä '
      + 'millimetriä, ja vähiten helmikuussa, runsaat kolmekymmentä — '
      + 'märkä pää vuodesta on siis lämmin pää.',
  },
  venetsia: {
    lat: 45.44,
    lon: 12.32,
    keskilampo: [4.3, 5.3, 8.8, 12.8, 17.5, 21.5, 23.9, 24.0, 19.5, 14.9, 9.8, 5.2],
    ylin: [8, 9, 12, 17, 21, 25, 28, 28, 23, 18, 13, 8],
    alin: [1, 2, 5, 9, 14, 18, 20, 20, 16, 12, 7, 3],
    sade: [60, 62, 69, 82, 93, 77, 60, 82, 120, 118, 125, 79],
    luonnehdinta: 'Venetsian kesä on lämmin ja kostea — elokuussa '
      + 'keskimäärin kaksikymmentäneljä astetta — mutta vuoden märin '
      + 'jakso alkaa vasta syyskuussa. Syys-, loka- ja marraskuussa '
      + 'vettä tulee kussakin toistakymmentä senttimetriä, kaksi kertaa '
      + 'niin paljon kuin heinäkuussa. Talvi on lauhkea: tammikuun '
      + 'keskilämpö on runsaat neljä astetta.',
  },
  // Berliini on mannerilmastoa tasangolla: talvi käy pakkasen puolella
  // ja sade jakautuu tasaisesti ympäri vuoden — heinäkuun kuurot ovat
  // vuoden märin kuukausi.
  berliini: {
    lat: 52.52,
    lon: 13.41,
    keskilampo: [0.7, 1.6, 4.5, 9.4, 14.1, 17.5, 19.6, 19.5, 15.1, 10.1, 5.2, 1.9],
    ylin: [3, 4, 8, 14, 19, 23, 24, 24, 19, 13, 8, 4],
    alin: [-2, -1, 1, 4, 9, 12, 15, 15, 11, 7, 3, 0],
    sade: [50, 37, 48, 37, 56, 59, 77, 56, 52, 46, 42, 46],
    luonnehdinta: 'Berliinissä talvi jää nollan tuntumaan eikä oikein '
      + 'pakkaselle: tammikuu jää alle asteen plussalle. Kesä yltää '
      + 'heinäkuussa vajaaseen kahteenkymmeneen asteeseen ja on samalla '
      + 'vuoden sateisin aika, lähes kahdeksankymmentä millimetriä. '
      + 'Kuivimmat kuukaudet ovat helmi- ja huhtikuu, molemmat alle '
      + 'neljänkymmenen millimetrin.',
  },
  // Doha on Persianlahden rannalla mutta aavikkomaassa: kesäkuusta
  // syyskuuhun sataa nolla millimetriä ja keskilämpö pysyy yli 33
  // asteessa, kun taas talvella lämpötila on Välimeren kevään luokkaa.
  // Koko vuoden sade, noin 60 mm, tulee marraskuun ja huhtikuun
  // välillä lyhyinä ryöppyinä.
  doha: {
    lat: 25.29,
    lon: 51.53,
    keskilampo: [17.6, 18.6, 21.7, 26.6, 31.8, 34.2, 35.3, 35.2, 33.1, 29.7, 24.7, 19.8],
    ylin: [21, 22, 27, 31, 37, 41, 41, 41, 38, 35, 29, 23],
    alin: [14, 15, 17, 22, 27, 28, 30, 30, 28, 25, 20, 16],
    sade: [11, 12, 12, 4, 0, 0, 0, 0, 0, 0, 7, 14],
    luonnehdinta: 'Dohassa vuosi mitataan sillä, milloin ulkona voi '
      + 'olla: touko–lokakuussa sadetta ei kirjaudu ainuttakaan '
      + 'millimetriä, ja touko–syyskuussa keskilämpö on yli '
      + 'kolmenkymmenen asteen. Talvikuukaudet ovat Välimeren kevään '
      + 'luokkaa, tammikuussa vajaat kahdeksantoista astetta. Koko '
      + 'vuoden vesi, kuutisenkymmentä millimetriä, mahtuu marraskuun ja '
      + 'huhtikuun väliin.',
  },
  // Nikosia on sisämaassa tasangolla, ei rannikolla: kesä on siksi
  // kuumempi ja talvi viileämpi kuin Kyproksen rantakaupungeissa.
  // Heinä- ja elokuussa sataa käytännössä ei lainkaan, ja koko vuoden
  // sade tulee marraskuun ja maaliskuun välillä.
  nikosia: {
    lat: 35.17,
    lon: 33.36,
    keskilampo: [10.7, 11.2, 13.6, 17.5, 22.2, 26.8, 29.7, 29.6, 26.3, 21.9, 16.6, 12.5],
    ylin: [14, 15, 18, 23, 28, 33, 36, 36, 33, 28, 21, 16],
    alin: [7, 8, 9, 12, 16, 20, 23, 23, 20, 16, 12, 9],
    sade: [54, 47, 35, 30, 29, 9, 2, 3, 11, 35, 37, 53],
    luonnehdinta: 'Kesä on Nikosiassa pitkä ja käytännössä sateeton: '
      + 'heinäkuussa vettä tulee kaksi millimetriä ja elokuussa kolme, '
      + 'kun keskilämpö on molemmissa lähes kolmekymmentä astetta. Talvi '
      + 'on leuto mutta märkä sikäli kuin Kyproksella märkää on — '
      + 'tammikuussa runsaat viisikymmentä millimetriä ja yksitoista '
      + 'astetta. Vuoden sade jää alle neljänsadan millimetrin.',
  },
  // Kuwait on Persianlahden pohjukassa ja kaukana avomerestä, joten
  // kesä on koko lahden alueen kuumin: heinäkuun keskilämpö ylittää 37
  // astetta eikä kesä-syyskuussa sada lainkaan. Sade tulee talvella
  // lyhyinä ryöppyinä.
  kuwait: {
    lat: 29.38,
    lon: 47.99,
    keskilampo: [13.5, 15.4, 19.7, 25.4, 31.7, 36.1, 37.6, 37.4, 34.1, 28.7, 21, 15.4],
    ylin: [17, 19, 25, 30, 37, 42, 44, 43, 40, 35, 25, 19],
    alin: [10, 11, 15, 20, 26, 30, 32, 32, 28, 23, 17, 12],
    sade: [30, 13, 17, 6, 2, 0, 0, 0, 0, 2, 30, 26],
    luonnehdinta: 'Heinäkuun keskilämpö on lähes kolmekymmentäkahdeksan '
      + 'astetta, ja kesäkuusta syyskuuhun sadetta ei kirjaudu lainkaan. '
      + 'Talvi on lyhyt ja siedettävä, tammikuussa runsaat kolmetoista '
      + 'astetta. Sadetta kertyy vuodessa vain runsaat sata millimetriä, '
      + 'ja se tulee marras–maaliskuussa muutamana ryöppynä.',
  },
  // Masqat on meren rannalla vuorten juurella: talvi on lämpimämpi
  // kuin Kuwaitissa ja kesä hieman viileämpi, koska meri tasaa. Sade
  // on vähäistä ympäri vuoden, ja kesäkuun piikki tulee harvinaisista
  // trooppisista matalapaineista.
  masqat: {
    lat: 23.615,
    lon: 58.593,
    keskilampo: [20.7, 21.9, 24.4, 28.6, 32.5, 33.5, 33, 31.9, 30.8, 29, 25.3, 22.2],
    ylin: [24, 25, 28, 32, 36, 37, 36, 34, 34, 32, 29, 25],
    alin: [18, 19, 21, 25, 29, 30, 30, 30, 28, 26, 22, 19],
    sade: [18, 11, 18, 7, 1, 10, 4, 1, 0, 1, 12, 14],
    luonnehdinta: 'Masqatissa vuosi on kapea mutta kuuma: kylmimmän ja '
      + 'lämpimimmän kuukauden ero on vain kolmetoista astetta, ja '
      + 'pohjalukemakin on runsaat kaksikymmentä. Meri pitää kesän '
      + 'lahden pohjukkaa viileämpänä, ja kesäkuun kolmenkymmenenkolmen '
      + 'ja puolen asteen jälkeen käyrä kääntyy alaspäin. Sadetta tulee '
      + 'alle sata millimetriä vuodessa, eikä yksikään kuukausi ole '
      + 'varsinaisesti sateinen.',
  },
  // Bagdad on nipun kuivin ja kuumin: heinä-elokuun keskilämpö on yli
  // 38 astetta, ja kesäkuusta lokakuuhun sadetta ei tule lainkaan.
  bagdad: {
    lat: 33.315,
    lon: 44.366,
    keskilampo: [10.8, 13.1, 18.3, 24.6, 31.1, 35.9, 38.3, 38.1, 34, 27.7, 18.1, 12.5],
    ylin: [16, 18, 25, 31, 38, 43, 45, 45, 42, 35, 23, 18],
    alin: [6, 8, 12, 18, 24, 29, 31, 31, 26, 20, 13, 7],
    sade: [25, 21, 19, 13, 4, 0, 0, 0, 0, 8, 21, 23],
    luonnehdinta: 'Bagdadissa kesä ja talvi ovat kuin kaksi eri '
      + 'ilmastoa: heinä- ja elokuussa keskilämpö on yli '
      + 'kolmenkymmenenkahdeksan asteen eikä kesäkuusta syyskuuhun sada '
      + 'lainkaan. Tammikuussa mittari näyttää runsasta kymmentä astetta '
      + 'ja vettä tulee pari senttimetriä kuussa. Koko vuoden sade, '
      + 'runsaat sata kolmekymmentä millimetriä, mahtuu lokakuun ja '
      + 'huhtikuun väliin.',
  },
  // İzmir on ainoa Välimeren rannalla: sade painottuu talveen ja on
  // moninkertainen muihin nipun kaupunkeihin verrattuna, heinäkuussa
  // sitä ei käytännössä tule.
  izmir: {
    lat: 38.419,
    lon: 27.128,
    keskilampo: [7.5, 8.5, 11.1, 15.2, 20.5, 25.6, 28.7, 28.6, 24, 18.7, 13.2, 9],
    ylin: [11, 13, 16, 20, 26, 31, 35, 35, 30, 24, 18, 13],
    alin: [4, 4, 6, 10, 15, 20, 22, 22, 18, 13, 9, 5],
    sade: [108, 100, 83, 62, 40, 15, 3, 4, 24, 63, 94, 109],
    luonnehdinta: 'İzmirissä sade ja lämpö ovat toistensa vastakohdat: '
      + 'joulukuussa vettä tulee yli sata millimetriä ja keskilämpö on '
      + 'yhdeksän astetta, heinäkuussa vettä kolme millimetriä ja lämpöä '
      + 'lähes kaksikymmentäyhdeksän. Kesä on siis pitkä, kuuma ja '
      + 'kuiva, talvi leuto ja märkä. Vettä kertyy vuodessa runsaat '
      + 'seitsemänsataa millimetriä, ja lähes kaikki siitä '
      + 'loka–huhtikuussa.',
  },
  // Ankara on Anatolian ylängöllä noin 900 metrissä, ja se näkyy
  // suoraan käyrässä: tammikuun keskilämpö on nollan tuntumassa, kun
  // rannikon İzmirissä se on 7,5 astetta.
  ankara: {
    lat: 39.942,
    lon: 32.86,
    keskilampo: [1, 2.5, 6.4, 11.5, 16.7, 20.8, 24.4, 24.6, 20.2, 14.5, 7.6, 2.9],
    ylin: [5, 7, 12, 17, 23, 27, 31, 32, 27, 20, 13, 7],
    alin: [-3, -2, 1, 6, 11, 14, 18, 17, 14, 9, 3, -1],
    sade: [50, 44, 53, 46, 44, 31, 9, 10, 13, 28, 39, 54],
    luonnehdinta: 'Ylängön korkeus näkyy molemmissa päissä: tammikuun '
      + 'keskilämpö on yksi aste ja elokuun vajaat kaksikymmentäviisi. '
      + 'Kesä on kuiva — heinä- ja elokuussa vettä tulee kymmenkunta '
      + 'millimetriä — muttei Lähi-idän tapaan paahtava. Sateisimmat '
      + 'kuukaudet ovat joulukuu ja maaliskuu, kumpikin runsaan '
      + 'viidenkymmenen millimetrin luokkaa.',
  },
  // Aleppo ja Damaskos ovat molemmat kuivan ja kostean rajalla: sade
  // tulee marraskuun ja maaliskuun välissä, ja kesä on täysin kuiva.
  halab: {
    lat: 36.2,
    lon: 37.157,
    keskilampo: [6.5, 7.9, 11.8, 16.7, 21.9, 26.2, 28.6, 28.7, 25.8, 20.8, 13, 7.9],
    ylin: [10, 12, 17, 22, 28, 34, 36, 36, 34, 28, 18, 12],
    alin: [3, 4, 6, 11, 15, 19, 21, 22, 18, 14, 8, 3],
    sade: [55, 49, 39, 25, 18, 3, 1, 1, 3, 19, 33, 54],
    luonnehdinta: 'Kuiva ja kostea vuodenaika vaihtuvat Aleppossa '
      + 'jyrkästi: kesä–syyskuussa vettä tulee yhdestä kolmeen '
      + 'millimetriä kuukaudessa, joulu–helmikuussa viisikymmentä. '
      + 'Elokuu on lämpimin, lähes kaksikymmentäyhdeksän astetta, ja '
      + 'tammikuu viilein, runsaat kuusi. Koko vuoden sade on kolmesataa '
      + 'millimetriä eli alle puolet Lontoon vastaavasta.',
  },
  // Damaskos on Aleppoa hieman lämpimämpi ja selvästi kuivempi:
  // vuoret pysäyttävät mereltä tulevan sateen, ja kaupunki elää
  // keitaan varassa.
  damaskos: {
    lat: 33.511,
    lon: 36.306,
    keskilampo: [5.9, 7.3, 11, 15.8, 20.9, 24.8, 27.1, 27, 24.4, 19.6, 12.4, 7.7],
    ylin: [10, 12, 17, 22, 29, 33, 36, 36, 33, 27, 18, 13],
    alin: [1, 3, 5, 9, 13, 16, 19, 18, 16, 12, 7, 3],
    sade: [40, 35, 25, 11, 7, 0, 0, 0, 1, 7, 23, 31],
    luonnehdinta: 'Damaskoksessa sataa vielä vähemmän kuin Aleppossa: '
      + 'vuosisumma on sata kahdeksankymmentä millimetriä, ja kesäkuusta '
      + 'elokuuhun normaali on tasan nolla. Kesä on silti selvästi '
      + 'viileämpi kuin Bagdadissa, heinäkuussa kaksikymmentäseitsemän '
      + 'astetta. Talvella lämpötila laskee kuuteen asteeseen, ja '
      + 'silloin tulee lähes kaikki vuoden vesi.',
  },
  // Luxor on koko pelin kuivin kaupunki: ERA5:n normaaleissa sadetta
  // tulee tammikuussa ja joulukuussa yksi millimetri, ja kymmenenä
  // kuukautena kahdestatoista ei lainkaan. Kesä on Bagdadin luokkaa.
  luxor: {
    lat: 25.699,
    lon: 32.639,
    keskilampo: [14.4, 16.6, 20.8, 26, 30.6, 32.8, 33.5, 33.4, 31.1, 27.2, 20.9, 15.9],
    ylin: [21, 24, 29, 34, 39, 42, 41, 41, 39, 36, 28, 23],
    alin: [8, 9, 13, 18, 22, 24, 26, 25, 23, 19, 14, 9],
    sade: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    luonnehdinta: 'Luxorissa sadetta ei käytännössä ole: kymmenenä '
      + 'kuukautena kahdestatoista normaali on nolla millimetriä, ja '
      + 'tammi- ja joulukuussa yksi. Kesä on paahtava, heinäkuussa lähes '
      + 'kolmekymmentäneljä astetta, ja talvi lämmin kuin Välimeren '
      + 'kevät. Vuodenkierron ainoa oikea muuttuja on lämpötila — vesi '
      + 'tulee joesta eikä taivaalta.',
  },
  // Riadissa sade on talven asia ja kesällä sitä ei tule lainkaan:
  // kesäkuusta syyskuuhun normaali on nolla millimetriä. Huhtikuu on
  // sateisin kuukausi, ja silloinkin vettä tulee 14 millimetriä.
  riad: {
    lat: 24.633,
    lon: 46.716,
    keskilampo: [14, 16.8, 21.1, 26.8, 32.4, 35, 36.1, 36, 32.8, 27.6, 20.5, 15.4],
    ylin: [20, 23, 28, 34, 39, 43, 44, 43, 40, 35, 27, 21],
    alin: [8, 11, 14, 20, 26, 27, 29, 29, 25, 20, 14, 10],
    sade: [11, 7, 12, 14, 2, 0, 0, 0, 0, 1, 12, 9],
    luonnehdinta: 'Riadissa vuoden sade mahtuu seitsemäänkymmeneen '
      + 'millimetriin, ja kesäkuusta syyskuuhun sitä ei tule lainkaan. '
      + 'Sateisin kuukausi on huhtikuu neljällätoista millimetrillä, ja '
      + 'sekin on tuskin havaittava kuuro. Heinäkuun kolmekymmentäkuusi '
      + 'astetta ja tammikuun neljätoista ovat saman aavikon kaksi '
      + 'puolta.',
  },
  // Tabriz on lehtikaupungeista ainoa, jonka normaali menee pakkaselle:
  // tammikuu on −1,5 astetta. ERA5:n ruutu ottaa mukaan ympäröivät
  // vuoret, joten se on kaupungin oman sääaseman lukuja viileämpi ja
  // sateisempi — lehden tekstissä siteeratut aseman luvut (vuoden
  // keskilämpö 13,1 °C) on siksi merkitty sääaseman luvuiksi.
  tabriz: {
    lat: 38.08,
    lon: 46.29,
    keskilampo: [-1.5, 0.1, 4.7, 10.4, 15.8, 21, 23.9, 23.9, 19.6, 13.4, 5.3, 0.1],
    ylin: [2, 4, 10, 16, 22, 28, 31, 31, 27, 20, 10, 4],
    alin: [-5, -4, 0, 5, 10, 14, 17, 17, 12, 7, 0, -4],
    sade: [30, 41, 57, 66, 50, 21, 14, 8, 7, 22, 38, 33],
    luonnehdinta: 'Tabriz on Lähi-idän kaupungeista ainoa, jonka talvi '
      + 'menee pakkaselle: tammikuun keskilämpö on puolitoista astetta '
      + 'nollan alapuolella. Kevät on vuoden märin aika — huhtikuussa '
      + 'vettä tulee kuusikymmentäkuusi millimetriä, syyskuussa '
      + 'seitsemän. Kesä on kuiva ja lämmin muttei kuuma, heinäkuussa '
      + 'vajaat kaksikymmentäneljä astetta.',
  },
  // Teheranissa sade osuu talveen ja kevääseen: heinä-, elo- ja
  // syyskuussa normaali on yksi millimetri. Sama ERA5:n ja sääaseman
  // ero kuin Tabrizissa, joskin pienempi — ruutuun osuu Alborzin
  // rinnettä, joten se on asemaa hieman viileämpi ja sateisempi.
  teheran: {
    lat: 35.68,
    lon: 51.42,
    keskilampo: [0.4, 2.5, 8.1, 14.8, 21.4, 27.8, 31, 29.9, 25, 18, 9.1, 3.1],
    ylin: [5, 8, 14, 20, 27, 34, 36, 35, 31, 24, 14, 7],
    alin: [-5, -3, 2, 9, 16, 21, 26, 25, 19, 12, 4, -1],
    sade: [38, 40, 50, 37, 14, 2, 1, 1, 1, 14, 40, 40],
    luonnehdinta: 'Teheranissa lämpötila liikkuu enemmän kuin missään '
      + 'muussa Iranin kaupungissa: tammikuun nollan tuntumasta '
      + 'heinäkuun kolmeenkymmeneenyhteen asteeseen on kolmenkymmenen '
      + 'asteen matka. Sade tulee talvella ja keväällä, ja '
      + 'heinä–syyskuussa normaali on yksi millimetri kuussa. Kaupunki '
      + 'on siis kuivimmillaan juuri silloin kun se on kuumimmillaan.',
  },
  // Tokio on lehtikaupungeista sateisin: vuoden summa on noin 1 455 mm,
  // eli lähes viisitoista kertaa Isfahanin luku. Kuivinkin kuukausi
  // (joulukuu, 60 mm) on sateisempi kuin Bagdadin tai Riadin sateisin.
  tokio: {
    lat: 35.71,
    lon: 139.78,
    keskilampo: [4, 4.7, 8.2, 13.2, 17.9, 21.2, 25, 26.3, 23, 17.5, 12, 6.7],
    ylin: [8, 9, 12, 17, 22, 24, 28, 29, 26, 20, 16, 10],
    alin: [0, 0, 4, 9, 14, 18, 22, 23, 20, 15, 8, 3],
    sade: [67, 63, 115, 113, 130, 162, 150, 113, 183, 208, 91, 60],
    luonnehdinta: 'Tokiossa vettä tulee vuodessa lähes puolitoista '
      + 'tuhatta millimetriä, eikä kuivinkaan kuukausi jää '
      + 'kuudenkymmenen alle. Sateisin aika ei ole keskikesä vaan '
      + 'alkusyksy: syys- ja lokakuussa kertyy yhteensä lähes neljäsataa '
      + 'millimetriä. Talvi on leuto ja verrattain kuiva, tammikuussa '
      + 'neljä astetta, ja elokuun kaksikymmentäkuusi astetta on vuoden '
      + 'huippu.',
  },
  // Isfahan on Iranin kolmesta lehtikaupungista kuivin: heinä-, elo- ja
  // syyskuussa normaali sademäärä on nolla millimetriä, ja sateisinkin
  // kuukausi jää seitsemääntoista. Vuoden summa on noin 98 mm, eli alle
  // kolmasosa Tabrizin luvusta.
  isfahan: {
    lat: 32.65,
    lon: 51.67,
    keskilampo: [2.2, 5.1, 10.1, 16.2, 22, 27.6, 30.3, 28.9, 24.3, 17.6, 9.5, 4.2],
    ylin: [7, 12, 18, 24, 30, 35, 38, 36, 32, 25, 16, 9],
    alin: [-3, -2, 2, 9, 14, 20, 23, 21, 17, 10, 3, -1],
    sade: [17, 12, 17, 11, 7, 1, 0, 0, 0, 3, 16, 14],
    luonnehdinta: 'Isfahanissa koko vuoden sade on alle sata '
      + 'millimetriä, ja heinä–syyskuussa se on nolla. Talvi on kylmempi '
      + 'kuin aavikkokaupungeissa — tammikuussa vain runsaat kaksi '
      + 'astetta — ja kesä silti kolmenkymmenen asteen kuuma. '
      + 'Vuodenkierto on siis lämmön kierto: vesi on täällä rakennettu '
      + 'asia eikä säätila.',
  },
  // Jekaterinburg on Uralin itärinteellä, ja sen käyrä on pelin
  // ensimmäinen aito mannerilmasto: tammikuun ja heinäkuun ero on 32
  // astetta. Sade painottuu kesään, koska talvella Siperian
  // korkeapaine pitää kostean ilman poissa — heinäkuussa vettä tulee
  // 87 mm, tammikuussa 17.
  jekaterinburg: {
    lat: 56.84,
    lon: 60.61,
    keskilampo: [-14.1, -12.6, -5.3, 3, 10.8, 16.2, 18.1, 15.7, 9.9, 2.9, -6.3, -12],
    ylin: [-11, -10, -2, 7, 17, 22, 23, 19, 14, 6, -4, -10],
    alin: [-18, -15, -9, -1, 5, 11, 13, 12, 5, 0, -9, -14],
    sade: [17, 15, 25, 35, 57, 74, 87, 73, 52, 43, 29, 21],
    luonnehdinta: 'Tammikuun neljäntoista pakkasasteen ja heinäkuun '
      + 'kahdeksantoista lämpöasteen välillä on kolmekymmentäkaksi '
      + 'astetta — se on mannerilmaston mitta. Sade painottuu kesään: '
      + 'heinäkuussa kertyy lähes yhdeksänkymmentä millimetriä, '
      + 'helmikuussa viisitoista. Kevät ja syksy ovat lyhyitä '
      + 'välivaiheita, sillä huhtikuu on jo plussalla ja lokakuu vielä '
      + 'juuri ja juuri.',
  },
  // Novosibirsk on Länsi-Siperian tasangolla kaukana joka mereltä:
  // tammikuun keskilämpö on −17 astetta, kolme astetta kylmempi kuin
  // Uralin takana Jekaterinburgissa. Sade jakautuu tasaisemmin kuin
  // Irkutskissa, ja marras-tammikuun 114 mm tulee lumena.
  novosibirsk: {
    lat: 55.03,
    lon: 82.92,
    keskilampo: [-17, -14.1, -6.7, 2.5, 11, 17.3, 19.4, 17, 10.3, 2.7, -7.3, -13.9],
    ylin: [-14, -11, -3, 7, 17, 23, 24, 21, 14, 6, -4, -11],
    alin: [-20, -17, -10, -2, 5, 12, 15, 13, 6, 0, -10, -17],
    sade: [27, 20, 26, 32, 41, 55, 70, 55, 49, 48, 46, 41],
    luonnehdinta: 'Novosibirskissä talvi on kolme astetta Uralin '
      + 'takaista kylmempi: tammikuun keskilämpö on seitsemäntoista '
      + 'pakkasastetta. Kesä yltää silti heinäkuussa lähes '
      + 'kahteenkymmeneen asteeseen, joten vuoden vaihteluväli on '
      + 'runsaat kolmekymmentäkuusi astetta. Sade jakautuu tasaisemmin '
      + 'kuin idempänä, ja marras–tammikuun runsas sata millimetriä '
      + 'tulee lumena.',
  },
  // Irkutsk on nipun kuivin ja talvella lähes sateeton: tammi- ja
  // helmikuussa normaali on kuusi millimetriä, kun elokuussa se on
  // 102. Kesä-syyskuun neljä kuukautta tuovat 328 mm eli lähes kolme
  // neljäsosaa koko vuoden 457 millimetristä.
  irkutsk: {
    lat: 52.29,
    lon: 104.3,
    keskilampo: [-19.1, -15, -6.4, 3, 10, 16.7, 19.2, 17, 10.2, 1.9, -7.7, -15.9],
    ylin: [-15, -10, 0, 9, 16, 23, 25, 22, 15, 7, -4, -12],
    alin: [-23, -20, -13, -3, 4, 10, 14, 12, 6, -3, -11, -20],
    sade: [6, 6, 11, 22, 38, 67, 98, 102, 61, 23, 13, 10],
    luonnehdinta: 'Irkutskissa talvi on lähes sateeton: tammi- ja '
      + 'helmikuussa normaali on kuusi millimetriä, kun heinä- ja '
      + 'elokuussa se on sata. Pakkasta on marraskuusta maaliskuuhun, '
      + 'tammikuussa yhdeksäntoista astetta. Kolme neljäsosaa vuoden '
      + 'vedestä tulee kesäkuun ja syyskuun välillä, joten talvi on sekä '
      + 'kylmä että kuiva.',
  },
  // Jakutskin käyrä on koko pelin jyrkin: tammikuun −35,9 ja heinäkuun
  // +20,0 asteen välillä on 56 astetta. Sadetta tulee vain 230 mm
  // vuodessa, vähemmän kuin Madridissa — mutta ikirouta estää veden
  // imeytymisen, joten kuivuus ei näy maisemassa.
  jakutsk: {
    lat: 62.03,
    lon: 129.73,
    keskilampo: [-35.9, -31.3, -17.8, -4, 7.7, 16.9, 20, 16, 6.6, -6.3, -24.9, -36],
    ylin: [-33, -28, -12, 1, 13, 23, 25, 21, 10, -3, -21, -34],
    alin: [-39, -35, -23, -9, 2, 11, 15, 11, 3, -10, -29, -38],
    sade: [2, 3, 4, 10, 26, 32, 44, 43, 38, 17, 9, 2],
    luonnehdinta: 'Jakutskin vuosi venyy viidenkymmenenkuuden asteen '
      + 'mitalle: joulukuussa kolmekymmentäkuusi pakkasastetta, '
      + 'heinäkuussa kaksikymmentä lämpöastetta. Sadetta tulee vain '
      + 'kaksisataakolmekymmentä millimetriä vuodessa, vähemmän kuin '
      + 'Madridissa, ja talvikuukausina kertymä on pari millimetriä. '
      + 'Kesä on lyhyt, mutta se on oikea kesä.',
  },
  // Magadanissa meri näkyy käyrässä: Ohotanmeri pitää talven
  // Jakutskiin verrattuna lauhana (−19,5 vastaan −35,9) mutta jättää
  // kesän 13 asteeseen. Vuoden sade 538 mm on yli kaksinkertainen
  // Jakutskiin nähden, ja sateisin kuukausi on elokuu.
  magadan: {
    lat: 59.56,
    lon: 150.8,
    keskilampo: [-19.5, -19.1, -13.6, -5.9, 1.8, 8.4, 12.4, 12.8, 7.9, -1.2, -11.7, -17.9],
    ylin: [-17, -16, -10, -2, 4, 11, 15, 15, 10, 1, -9, -16],
    alin: [-22, -22, -17, -10, -1, 5, 10, 10, 5, -4, -14, -20],
    sade: [17, 14, 25, 30, 42, 51, 56, 87, 76, 64, 54, 22],
    luonnehdinta: 'Meri näkyy Magadanin käyrässä molempiin suuntiin: '
      + 'talvi jää kahdenkymmenen pakkasasteen tienoille, mutta kesäkään '
      + 'ei nouse kolmeatoista astetta ylemmäs. Vettä tulee yli '
      + 'viisisataa millimetriä vuodessa, ja märin aika on elo–syyskuu. '
      + 'Kevät on hidas: vielä huhtikuussa on kuusi astetta pakkasta.',
  },
  // Kamtšatka (Petropavlovsk) on koko pelin sateisin Siperia-kohde:
  // 1 231 mm vuodessa, yli viisi kertaa Jakutskin verran. Meri pitää
  // talven −10 asteessa mutta kesän 13:ssa, ja sateisin kuukausi on
  // lokakuu — talven osuus tulee lumena, jota kertyy metrikaupalla.
  kamtsatka: {
    lat: 53.02,
    lon: 158.65,
    keskilampo: [-10.3, -9.2, -5.7, -1.3, 3, 8.8, 13, 13.4, 9.9, 3.8, -3.5, -9.4],
    ylin: [-8, -6, -2, 1, 6, 12, 16, 17, 13, 7, -1, -7],
    alin: [-13, -12, -9, -4, 0, 5, 10, 10, 7, 1, -6, -12],
    sade: [116, 93, 115, 97, 68, 64, 72, 107, 107, 139, 135, 118],
    luonnehdinta: 'Kamtšatkassa sataa enemmän kuin missään muualla '
      + 'Siperiassa: vuosisumma on yli tuhat kaksisataa millimetriä, ja '
      + 'kuivinkin kuukausi ylittää kuusikymmentä. Meri pitää talven '
      + 'kymmenessä pakkasasteessa ja kesän kolmessatoista '
      + 'lämpöasteessa, joten vuodenajat ovat lähempänä toisiaan kuin '
      + 'mantereella. Sateisin kuukausi on lokakuu, ja talven osuus '
      + 'tulee lumena.',
  },
  // Sahalinia ympäröi meri joka suunnalta, mutta se ei lämmitä:
  // Ohotanmeri jäätyy talveksi, ja tammikuun −11,4 on kylmempi kuin
  // Kamtšatkan tai Vladivostokin. Kesä jää 18 asteeseen, ja elo-
  // syyskuun 207 mm tulee myöhäiskesän matalapaineista.
  sahalin: {
    lat: 46.96,
    lon: 142.74,
    keskilampo: [-11.4, -10.7, -5.1, 1.6, 7.8, 12.7, 16.6, 18, 14.5, 7.5, -0.8, -8.5],
    ylin: [-8, -7, -1, 5, 12, 16, 20, 21, 18, 12, 3, -5],
    alin: [-15, -15, -9, -2, 4, 9, 13, 15, 11, 3, -4, -12],
    sade: [55, 40, 64, 70, 69, 62, 81, 103, 104, 90, 73, 66],
    luonnehdinta: 'Saarta ympäröi meri joka suunnalta, mutta talvea se '
      + 'ei lämmitä: tammikuun keskilämpö on yksitoista pakkasastetta. '
      + 'Kesä on Siperian mittapuulla lämmin, elokuussa kahdeksantoista '
      + 'astetta, ja samalla vuoden märin — elo- ja syyskuussa vettä '
      + 'tulee kummassakin yli sata millimetriä. Kuivin kuukausi on '
      + 'helmikuu, jolloin kertymä jää neljäänkymmeneen millimetriin.',
  },
  // Vladivostokin käyrä on monsuunin käyrä: talvi on mantereen kylmää
  // ilmaa ja lähes sateeton (tammikuussa 11 mm), kesä merituulen
  // sumua ja kaatosadetta (elokuussa 150 mm). Kaupunki on samalla
  // leveysasteella kuin Sotši Mustallamerellä, mutta tammikuu on −11.
  vladivostok: {
    lat: 43.12,
    lon: 131.89,
    keskilampo: [-11, -7.8, -1.7, 3.8, 8.9, 14, 18.6, 20.6, 17.1, 10.1, 0.5, -8.2],
    ylin: [-8, -4, 2, 7, 12, 16, 21, 22, 19, 13, 3, -6],
    alin: [-14, -11, -5, 1, 5, 12, 17, 19, 15, 7, -2, -11],
    sade: [11, 15, 28, 43, 84, 70, 131, 150, 94, 70, 36, 18],
    luonnehdinta: 'Vladivostokin talvi on mantereen ilmaa: tammikuussa '
      + 'yksitoista pakkasastetta ja vain yksitoista millimetriä vettä. '
      + 'Kesällä kuva kääntyy päinvastaiseksi, ja elokuussa sataa '
      + 'sataviisikymmentä millimetriä eli lähes neljätoista kertaa '
      + 'tammikuun verran. Kaupunki on samalla leveydellä kuin Nizza, '
      + 'mutta sen vuosi ei muistuta Välimerta mitenkään.',
  },

  /*
   * EUROOPAN LEHTIKAUPUNGIT (Opus 16.8.2026, omistajan havainto:
   * "Pariisissa ja Helsingissä ainakin muuten puuttuu lehden
   * etusivulta sääennuste kokonaan"). Nämä rivit on laskettu samalla
   * menetelmällä kuin paketin vanhat: Open-Meteon arkiston (ERA5)
   * päivittäisistä arvoista jaksolta 1991-2020, keskilampo kuukauden
   * keskilampojen keskiarvona ja sade kuukauden sademaaran
   * vuosikeskiarvona. Menetelma tarkistettiin ajamalla se Lontoolle,
   * jonka rivi oli jo paketissa: tulos taysmasi kymmenyksen tarkkuudella.
   *
   * Koordinaatit ovat kaupungin oman kohdekartan rajojen keskipiste
   * (js/packs/maakartat.js) - ei arvattuja lukuja.
   */
  praha: {
    lat: 50.08,
    lon: 14.41,
    keskilampo: [0.3, 1.3, 4.9, 9.8, 14.5, 18, 20.1, 20, 15.3, 10.1, 5, 1.4],
    ylin: [3, 5, 9, 15, 20, 23, 25, 25, 20, 14, 8, 4],
    alin: [-2, -2, 1, 4, 9, 13, 15, 15, 10, 6, 2, -1],
    sade: [37, 33, 43, 38, 67, 77, 82, 73, 56, 44, 40, 40],
    luonnehdinta: 'Prahassa talvi asettuu nollan tuntumaan: tammikuun '
      + 'keskilämpö on kolme kymmenystä plussalla, eli kylmää mutta ei '
      + 'kovaa pakkasta. Kesä on lämmin ja samalla vuoden sateisin aika '
      + '— heinäkuussa vettä tulee runsaat kahdeksankymmentä '
      + 'millimetriä, helmikuussa runsaat kolmekymmentä. Kevät ja syksy '
      + 'ovat kuivia välivaiheita, ja koko vuoden sade jää runsaaseen '
      + 'kuuteensataan millimetriin.',
  },
  wien: {
    lat: 48.2,
    lon: 16.37,
    keskilampo: [0.1, 1.6, 5.6, 10.7, 15.4, 19.2, 21.2, 21, 16, 10.7, 5.6, 1],
    ylin: [3, 5, 10, 16, 21, 23, 26, 26, 21, 15, 9, 4],
    alin: [-3, -2, 1, 5, 10, 15, 16, 16, 11, 7, 2, -2],
    sade: [35, 32, 46, 45, 73, 76, 78, 70, 72, 48, 44, 39],
    luonnehdinta: 'Kaksikymmentäyksi astetta heinäkuussa ja nolla '
      + 'tammikuussa: Wienissä vuosi kulkee mantereen tahtiin muttei '
      + 'äärimmilleen. Kesäkuukaudet ovat myös märimmät, '
      + 'seitsemisenkymmentä millimetriä kuussa, ja helmikuu kuivin, '
      + 'runsaat kolmekymmentä. Syyskuu on poikkeus, joka pysyy '
      + 'sateisena vielä lämmön laskiessa.',
  },
  pariisi: {
    lat: 48.87,
    lon: 2.32,
    keskilampo: [4.3, 4.7, 7.5, 10.5, 14.1, 17.4, 19.6, 19.5, 16.1, 12.3, 7.8, 4.8],
    ylin: [7, 8, 11, 16, 19, 22, 24, 24, 21, 15, 11, 7],
    alin: [2, 2, 4, 5, 9, 12, 15, 15, 11, 9, 5, 2],
    sade: [52, 48, 51, 50, 65, 58, 54, 57, 47, 61, 59, 68],
    luonnehdinta: 'Pariisin vuosi on lauhkea molemmista päistään: '
      + 'kylmimmässäkin kuussa keskilämpö pysyy neljässä asteessa ja '
      + 'kuumimmassa se jää kahdenkymmenen alle. Sadetta tulee joka '
      + 'kuukausi jokseenkin saman verran — kuivaa kautta ei ole, ja '
      + 'sateisin kuukausi on joulukuu eikä mikään kesäkuukausi. Ero '
      + 'kesän ja talven välillä on siis enemmän valon kuin veden ero.',
  },
  ateena: {
    lat: 37.97,
    lon: 23.73,
    keskilampo: [8.5, 9.2, 11.5, 15.2, 20.3, 25.3, 27.7, 27.5, 23.5, 18.9, 14, 10],
    ylin: [12, 13, 15, 20, 25, 30, 32, 33, 28, 23, 18, 13],
    alin: [5, 6, 8, 11, 16, 20, 23, 22, 19, 15, 10, 7],
    sade: [55, 48, 50, 28, 23, 12, 7, 5, 17, 28, 50, 64],
    luonnehdinta: 'Ateenassa kesä on yhtä kuiva kuin Lähi-idässä: heinä- '
      + 'ja elokuussa vettä tulee viidestä seitsemään millimetriä, ja '
      + 'keskilämpö on lähes kaksikymmentäkahdeksan astetta. Talvi on '
      + 'leuto ja kostea, joulukuussa kymmenen astetta ja '
      + 'kuusikymmentäneljä millimetriä vettä. Vuoden sade jää alle '
      + 'neljänsadan millimetrin, ja se sataa lokakuun ja huhtikuun '
      + 'välillä.',
  },
  amsterdam: {
    lat: 52.37,
    lon: 4.89,
    keskilampo: [3.7, 3.9, 6.1, 9.3, 12.8, 15.5, 17.7, 17.7, 15.1, 11.4, 7.4, 4.5],
    ylin: [6, 6, 9, 13, 17, 19, 21, 21, 18, 14, 10, 6],
    alin: [2, 2, 4, 6, 9, 12, 15, 14, 12, 9, 5, 3],
    sade: [64, 54, 54, 51, 63, 68, 84, 84, 70, 70, 63, 71],
    luonnehdinta: 'Amsterdamin lämpötila liikkuu vuoden mittaan vain '
      + 'neljäntoista asteen verran: tammikuussa vajaat neljä astetta, '
      + 'keskikesällä vajaat kahdeksantoista. Sade sen sijaan on '
      + 'jatkuvaa — jokainen kuukausi ylittää viisikymmentä millimetriä '
      + 'ja vuosisumma nousee lähes kahdeksaansataan. Loppukesä ja syksy '
      + 'ovat märimpiä, mutta ero kevääseen on pieni.',
  },
  istanbul: {
    lat: 41.02,
    lon: 28.99,
    keskilampo: [6.2, 6.5, 8.3, 12.1, 17, 21.7, 24.2, 24.6, 21.1, 16.7, 12.1, 8.2],
    ylin: [8, 9, 11, 15, 20, 25, 27, 28, 24, 20, 14, 10],
    alin: [4, 4, 5, 9, 14, 18, 21, 21, 18, 14, 10, 6],
    sade: [85, 71, 73, 47, 37, 36, 20, 21, 46, 78, 72, 99],
    luonnehdinta: 'Istanbulissa vesi tulee talvella: joulukuussa sataa '
      + 'lähes sata millimetriä ja tammikuussa kahdeksankymmentäviisi, '
      + 'kun heinä- ja elokuussa kertymä on parikymmentä. Kesä on lämmin '
      + 'muttei polttava, elokuussa vajaat kaksikymmentäviisi astetta. '
      + 'Talvi pysyy plussalla, tammikuussa runsaassa kuudessa asteessa.',
  },
  dublin: {
    lat: 53.34,
    lon: -6.27,
    keskilampo: [5.6, 5.7, 6.9, 8.7, 11.4, 14.2, 15.8, 15.6, 13.7, 10.9, 7.9, 6],
    ylin: [8, 8, 10, 12, 15, 18, 19, 19, 17, 13, 10, 8],
    alin: [3, 3, 4, 5, 8, 11, 13, 13, 11, 9, 6, 4],
    sade: [70, 59, 60, 67, 67, 75, 76, 79, 70, 79, 86, 77],
    luonnehdinta: 'Dublinin vuosi on Euroopan kaupungeista kapein: '
      + 'kylmimmän ja lämpimimmän kuukauden ero on vain kymmenen '
      + 'astetta. Talvi ei mene pakkaselle eikä kesä nouse kuuttatoista '
      + 'astetta ylemmäs. Sadetta tulee joka kuukausi noin '
      + 'kuudestakymmenestä yhdeksäänkymmeneen millimetriä, yhteensä '
      + 'lähes yhdeksänsataa — ja märin kuukausi on marraskuu.',
  },
  edinburgh: {
    lat: 55.95,
    lon: -3.19,
    keskilampo: [3.9, 4.1, 5.3, 7.3, 10, 12.8, 14.7, 14.4, 12.4, 9.4, 6.3, 4.1],
    ylin: [6, 6, 8, 10, 14, 16, 18, 17, 15, 12, 9, 6],
    alin: [2, 2, 3, 4, 6, 9, 12, 12, 10, 7, 4, 2],
    sade: [74, 62, 60, 54, 57, 68, 73, 77, 61, 81, 73, 77],
    luonnehdinta: 'Edinburghissa kesä jää alle viidentoista asteen ja '
      + 'talvi juuri ja juuri plussalle: neljä astetta tammikuussa. Sade '
      + 'on tasaista muttei rankkaa, viidestäkymmenestä '
      + 'kahdeksaankymmeneen millimetriä kuussa, ja lokakuu on märin. '
      + 'Vuoden kokonaissumma, runsaat kahdeksansataa millimetriä, on '
      + 'pienempi kuin Dublinin, vaikka kaupunki on pohjoisempana.',
  },
  marseille: {
    lat: 43.29,
    lon: 5.37,
    keskilampo: [8, 8.1, 10.9, 13.5, 17.2, 21.2, 23.8, 23.9, 20.2, 16.5, 11.9, 8.8],
    ylin: [11, 11, 14, 18, 21, 24, 27, 28, 24, 19, 15, 11],
    alin: [5, 5, 8, 9, 14, 18, 20, 20, 17, 14, 9, 6],
    sade: [52, 41, 39, 66, 52, 31, 14, 22, 72, 83, 91, 54],
    luonnehdinta: 'Marseillessa heinäkuu on vuoden kuivin kuukausi '
      + 'neljälläätoista millimetrillä ja marraskuu märin '
      + 'yhdeksälläkymmenellä. Kesä on pitkä ja lämmin, elokuussa lähes '
      + 'kaksikymmentäneljä astetta, ja talvi pysyy kahdeksassa '
      + 'asteessa. Syys–marraskuu tuo yksin kaksi viidesosaa koko vuoden '
      + 'vedestä.',
  },
  lissabon: {
    lat: 38.72,
    lon: -9.13,
    keskilampo: [11.1, 11.4, 13.3, 14.7, 17.1, 19.7, 21.3, 21.9, 20.6, 17.9, 14.3, 12],
    ylin: [14, 15, 17, 17, 21, 23, 26, 26, 25, 21, 17, 14],
    alin: [8, 8, 10, 12, 14, 17, 17, 17, 16, 15, 12, 10],
    sade: [69, 52, 53, 53, 44, 11, 2, 4, 29, 78, 84, 79],
    luonnehdinta: 'Lissabonissa talvi ei ole kylmä vaan sateinen: '
      + 'tammikuussa yksitoista astetta ja seitsemänkymmentä millimetriä '
      + 'vettä. Kesä on päinvastainen — heinäkuussa kaksi millimetriä, '
      + 'elokuussa neljä — ja lämpötila jää silti kahdenkymmenenkahden '
      + 'asteen tienoille. Meri pitää vuoden kapeana: ero kylmimmän ja '
      + 'lämpimimmän kuukauden välillä on vajaat yksitoista astetta.',
  },
  barcelona: {
    lat: 41.39,
    lon: 2.17,
    keskilampo: [8.5, 9.1, 11.3, 13.5, 17.1, 21.1, 23.8, 24.1, 20.9, 17.3, 12.5, 9.3],
    ylin: [12, 13, 15, 17, 21, 25, 27, 27, 24, 20, 16, 13],
    alin: [5, 5, 7, 10, 14, 18, 20, 21, 18, 14, 9, 6],
    sade: [41, 35, 41, 54, 46, 36, 24, 40, 79, 92, 61, 42],
    luonnehdinta: 'Barcelonassa sateisin kuukausi on lokakuu eikä mikään '
      + 'talvikuukausi: silloin vettä tulee yli yhdeksänkymmentä '
      + 'millimetriä, kun tammikuussa neljäkymmentä. Kesä on lämmin ja '
      + 'verrattain kuiva, elokuussa kaksikymmentäneljä astetta ja '
      + 'neljäkymmentä millimetriä. Talvi on leuto — tammikuussa '
      + 'kahdeksan ja puoli astetta — eikä pakkasta ole normaaleissa '
      + 'lainkaan.',
  },
  granada: {
    lat: 37.18,
    lon: -3.59,
    keskilampo: [6.3, 7.6, 10.6, 13.1, 17.3, 22.7, 26.6, 26.3, 21.3, 16.2, 10.3, 7.4],
    ylin: [11, 14, 16, 18, 23, 28, 33, 33, 28, 22, 15, 11],
    alin: [1, 1, 5, 8, 11, 17, 20, 20, 15, 10, 5, 3],
    sade: [51, 49, 66, 58, 50, 27, 7, 13, 34, 52, 61, 62],
    luonnehdinta: 'Granadan talvi on rannikkoa viileämpi: tammikuun '
      + 'keskilämpö on kuusi astetta, kaksi vähemmän kuin Barcelonassa. '
      + 'Kesä sen sijaan on kuumempi, heinäkuussa lähes '
      + 'kaksikymmentäseitsemän astetta ja lähes sateeton. Maaliskuu ja '
      + 'joulukuu ovat märimmät kuukaudet, kumpikin runsaat '
      + 'kuusikymmentä millimetriä.',
  },
  budapest: {
    lat: 47.5,
    lon: 19.05,
    keskilampo: [-0.3, 1.3, 5.8, 11.6, 16.5, 20.3, 22.3, 22.1, 16.8, 11.3, 5.8, 0.6],
    ylin: [3, 5, 10, 17, 22, 25, 27, 27, 22, 16, 9, 3],
    alin: [-3, -3, 1, 6, 11, 16, 17, 17, 12, 7, 3, -2],
    sade: [36, 36, 41, 46, 67, 72, 72, 58, 57, 52, 52, 44],
    luonnehdinta: 'Budapestissa tammikuu jää niukasti pakkasen puolelle '
      + 'ja heinäkuu nousee kahteenkymmeneenkahteen asteeseen, joten '
      + 'vuoden vaihteluväli on runsaat kaksikymmentäkaksi astetta. Vesi '
      + 'tulee kesällä: kesä- ja heinäkuussa yli seitsemänkymmentä '
      + 'millimetriä, tammi- ja helmikuussa runsaat kolmekymmentä. Syksy '
      + 'pysyy tasaisen kosteana eikä kuivu ennen talvea.',
  },
  rooma: {
    lat: 41.9,
    lon: 12.47,
    keskilampo: [7.4, 8, 10.6, 13.5, 17.8, 22.2, 25.1, 25.4, 21, 16.9, 12.4, 8.5],
    ylin: [12, 13, 15, 19, 23, 27, 30, 31, 27, 21, 17, 12],
    alin: [3, 3, 6, 8, 12, 18, 20, 20, 15, 13, 8, 5],
    sade: [63, 72, 76, 79, 59, 35, 23, 23, 85, 121, 133, 95],
    luonnehdinta: 'Rooman kesä on kuiva ja kuuma: heinä- ja elokuussa '
      + 'reilut kaksikymmentä millimetriä vettä ja kaksikymmentäviisi '
      + 'astetta lämpöä. Syksyllä kuva vaihtuu kertaheitolla, sillä '
      + 'loka- ja marraskuussa sataa yhteensä yli '
      + 'kaksisataaviisikymmentä millimetriä. Talvi on leuto, '
      + 'tammikuussa runsaat seitsemän astetta, ja koko vuoden sade '
      + 'nousee lähes yhdeksäänsataan millimetriin.',
  },
  krakova: {
    lat: 50.06,
    lon: 19.94,
    keskilampo: [-1.9, -0.6, 3.3, 9, 13.9, 17.4, 19.4, 19.1, 14.3, 9.2, 4, -0.3],
    ylin: [1, 2, 7, 14, 19, 22, 24, 24, 19, 13, 7, 3],
    alin: [-5, -4, -1, 4, 9, 13, 15, 14, 10, 5, 1, -3],
    sade: [43, 44, 52, 58, 93, 90, 105, 77, 74, 58, 46, 42],
    luonnehdinta: 'Krakovassa kesä on vuoden sateisin aika ja selvästi '
      + 'märempi kuin Varsovassa: heinäkuussa yli sata millimetriä. '
      + 'Talvi käy pakkasella joulukuusta helmikuuhun, tammikuussa kaksi '
      + 'astetta nollan alapuolella. Kesäkuukaudet yltävät '
      + 'yhdeksääntoista asteeseen, joten vuoden vaihteluväli on runsaat '
      + 'kaksikymmentäyksi astetta.',
  },
  varsova: {
    lat: 52.24,
    lon: 21.02,
    keskilampo: [-1.6, -0.6, 2.9, 8.9, 14.2, 17.7, 19.7, 19.2, 14.3, 9, 4, 0],
    ylin: [1, 2, 7, 14, 19, 22, 25, 24, 18, 12, 6, 2],
    alin: [-4, -3, -1, 4, 9, 13, 15, 14, 10, 6, 2, -2],
    sade: [41, 38, 43, 46, 69, 70, 84, 66, 58, 46, 41, 43],
    luonnehdinta: 'Varsovan lämpötilakäyrä on lähes sama kuin Krakovan, '
      + 'mutta sadetta tulee reilut sata millimetriä vähemmän vuodessa. '
      + 'Heinäkuu on sekä lämpimin että sateisin, kahdeksankymmentäneljä '
      + 'millimetriä. Talvi pysyy lievällä pakkasella, ja kuivin '
      + 'kuukausi on helmikuu kolmellakymmenelläkahdeksalla '
      + 'millimetrillä.',
  },
  helsinki: {
    lat: 60.17,
    lon: 24.95,
    keskilampo: [-4, -4.9, -1.9, 3.6, 9.8, 14.3, 17.9, 16.8, 12.1, 6.2, 1.8, -1.5],
    ylin: [-2, -3, 0, 7, 14, 18, 21, 20, 15, 8, 4, 0],
    alin: [-6, -7, -4, 1, 6, 11, 15, 13, 10, 4, 0, -3],
    sade: [50, 42, 37, 37, 44, 71, 75, 76, 58, 63, 63, 57],
    luonnehdinta: 'Talvi on pitkä ja pakkasen puolella joulukuusta '
      + 'maaliskuuhun; helmikuu on kylmin, keskimäärin viisi astetta '
      + 'nollan alapuolella. Kesä on lyhyt ja lauhkea — heinäkuun '
      + 'kahdeksantoista astetta on jo vuoden huippu — mutta valoa '
      + 'riittää yöhön asti. Sateisinta ei ole kevät vaan loppukesä ja '
      + 'syksy, jolloin kuukausikertymä nousee reiluun seitsemäänkymmeneen '
      + 'millimetriin.',
  },
  // Tampere on sisämaassa 160 km Helsingistä pohjoiseen: talvi on
  // kylmempi ja kesä hetken lämpimämpi kuin rannikolla.
  tampere: {
    lat: 61.50,
    lon: 23.76,
    keskilampo: [-5.3, -6, -2.6, 2.9, 9.5, 14.6, 17.5, 16.1, 11.1, 5.1, 0.7, -2.8],
    ylin: [-3, -4, -1, 6, 14, 19, 21, 20, 14, 7, 2, -2],
    alin: [-7, -8, -5, 0, 5, 10, 14, 12, 8, 3, -1, -4],
    sade: [40, 31, 32, 34, 46, 76, 84, 75, 55, 61, 50, 47],
    luonnehdinta: 'Tampereen vuosi on jyrkkä: helmikuun keskilämpö on '
      + 'kuusi astetta pakkasen puolella ja heinäkuun seitsemäntoista '
      + 'lämpimän puolella, eli väliä on yli kaksikymmentä astetta. '
      + 'Marraskuusta maaliskuuhun keskilämpö pysyy nollan alapuolella, '
      + 'ja järvet jäätyvät joka talvi. Sadetta tulee eniten keskellä '
      + 'kesää — heinäkuussa 84 millimetriä, helmikuussa vain 31 — eli '
      + 'kuivin aika on lopputalvi eikä kesä.',
  },
  tallinna: {
    lat: 59.44,
    lon: 24.75,
    keskilampo: [-3.3, -4.1, -0.9, 4.8, 10.6, 15, 18.1, 17, 12.4, 6.7, 2.1, -1.1],
    ylin: [-2, -2, 2, 8, 15, 19, 22, 21, 15, 9, 4, 0],
    alin: [-5, -6, -3, 2, 6, 11, 14, 13, 10, 4, 0, -2],
    sade: [44, 36, 33, 37, 42, 69, 71, 78, 59, 64, 52, 48],
    luonnehdinta: 'Tallinnassa talvi on neljä kuukautta pakkasen '
      + 'puolella, kylmimmillään helmikuussa neljä astetta miinuksella. '
      + 'Kesä nousee heinäkuussa kahdeksaantoista asteeseen ja on '
      + 'samalla vuoden sateisin: elokuussa lähes kahdeksankymmentä '
      + 'millimetriä. Maaliskuu on kuivin kuukausi, joten kevät on '
      + 'täällä vuoden kuivin vuodenaika.',
  },
  kiova: {
    lat: 50.45,
    lon: 30.52,
    keskilampo: [-3.7, -3, 1.6, 9, 15.2, 19.1, 20.8, 20, 14.6, 8.4, 2.4, -2.1],
    ylin: [-2, 0, 5, 14, 20, 24, 25, 25, 19, 11, 5, -1],
    alin: [-6, -6, -2, 4, 10, 15, 16, 15, 10, 5, 0, -4],
    sade: [34, 34, 40, 44, 63, 69, 83, 53, 59, 45, 42, 44],
    luonnehdinta: 'Kiovassa kesä on lämpimämpi kuin Itämeren rannalla — '
      + 'heinäkuussa lähes kaksikymmentäyksi astetta — ja talvi '
      + 'vastaavasti kylmempi, tammikuussa neljä astetta pakkasta. Sade '
      + 'painottuu selvästi kesään: heinäkuussa yli kahdeksankymmentä '
      + 'millimetriä, tammikuussa kolmekymmentäneljä. Syksy kuivuu '
      + 'nopeasti, ja loka–helmikuu on vuoden vähäsateisin jakso.',
  },
  pietari: {
    lat: 59.94,
    lon: 30.32,
    keskilampo: [-5.7, -6.1, -2.5, 3.5, 10.3, 15.1, 18.1, 16.6, 11.7, 5.3, 0.1, -3.2],
    ylin: [-4, -4, 0, 6, 15, 19, 22, 20, 14, 7, 2, -2],
    alin: [-8, -8, -5, 1, 6, 11, 14, 13, 9, 3, -2, -4],
    sade: [42, 33, 36, 40, 51, 65, 67, 73, 55, 62, 57, 49],
    luonnehdinta: 'Pietarin talvi on pitkä ja kostea: joulukuusta '
      + 'maaliskuuhun keskilämpö on pakkasella, helmikuussa kuusi '
      + 'astetta miinuksella. Kesä on lyhyt ja lauhkea, heinäkuussa '
      + 'kahdeksantoista astetta, mutta sateisin kuukausi on vasta '
      + 'elokuu. Kuivinta on helmikuussa, jolloin kertymä jää '
      + 'kolmeenkymmeneenkolmeen millimetriin.',
  },
  moskova: {
    lat: 55.75,
    lon: 37.62,
    keskilampo: [-7.5, -7.4, -2.6, 5.4, 13, 17, 19.4, 17.5, 11.9, 5.5, -1.2, -5.3],
    ylin: [-5, -5, 0, 10, 18, 22, 24, 22, 15, 8, 1, -4],
    alin: [-10, -10, -6, 1, 8, 12, 14, 13, 8, 3, -3, -7],
    sade: [36, 32, 33, 36, 58, 71, 76, 66, 57, 58, 44, 38],
    luonnehdinta: 'Moskovassa vuosi on Pietaria jyrkempi molemmista '
      + 'päistä: tammikuussa seitsemän ja puoli astetta pakkasta, '
      + 'heinäkuussa yhdeksäntoista ja puoli lämmintä. Sade seuraa '
      + 'lämpöä — heinäkuussa seitsemänkymmentäkuusi millimetriä, '
      + 'helmikuussa kolmekymmentäkaksi. Marraskuu on jo pakkasella, '
      + 'joten talvea riittää viideksi kuukaudeksi.',
  },
  sofia: {
    lat: 42.69,
    lon: 23.33,
    keskilampo: [-0.7, 1.1, 5.2, 10.2, 15.2, 19.2, 21.2, 21.5, 16.9, 11.5, 5.8, 0.9],
    ylin: [3, 6, 10, 15, 21, 24, 26, 27, 23, 16, 10, 4],
    alin: [-4, -3, 0, 5, 10, 15, 17, 16, 11, 7, 2, -3],
    sade: [40, 39, 56, 60, 71, 62, 53, 36, 36, 49, 38, 46],
    luonnehdinta: 'Sofiassa sateisin kuukausi on toukokuu eikä kesä tai '
      + 'syksy: silloin vettä tulee yli seitsemänkymmentä millimetriä, '
      + 'kun elo- ja syyskuussa runsaat kolmekymmentä. Kesä on lämmin ja '
      + 'loppukesä kuiva, elokuussa runsaat kaksikymmentäyksi astetta. '
      + 'Talvi jää pakkasen puolelle vain tammikuussa.',
  },
  bukarest: {
    lat: 44.43,
    lon: 26.09,
    keskilampo: [-1.1, 1.3, 6.1, 11.9, 17.4, 21.5, 23.7, 23.7, 18.4, 12.3, 6.3, 0.6],
    ylin: [3, 6, 11, 18, 23, 26, 29, 29, 24, 17, 10, 4],
    alin: [-5, -3, 1, 6, 12, 17, 19, 18, 13, 8, 2, -2],
    sade: [39, 34, 47, 58, 71, 89, 79, 49, 61, 52, 46, 46],
    luonnehdinta: 'Bukarestin kesä on selvästi lämpimämpi kuin vuorten '
      + 'takana Sofiassa: heinä- ja elokuussa lähes kaksikymmentäneljä '
      + 'astetta, runsaat kaksi enemmän. Kesäkuu on vuoden sateisin '
      + 'kuukausi lähes yhdeksälläkymmenellä millimetrillä, ja elokuu jo '
      + 'selvästi kuivempi. Talvi on lyhyt mutta oikea: tammikuussa '
      + 'asteen verran pakkasta.',
  },
  sarajevo: {
    lat: 43.86,
    lon: 18.43,
    keskilampo: [0.1, 1, 4.8, 9.6, 14.3, 18.2, 20.3, 20.6, 15.9, 11.3, 6.2, 1.3],
    ylin: [4, 5, 9, 15, 20, 23, 25, 25, 22, 16, 11, 5],
    alin: [-4, -3, 0, 5, 9, 14, 16, 16, 10, 7, 2, -2],
    sade: [74, 85, 87, 105, 111, 105, 94, 74, 86, 89, 92, 98],
    luonnehdinta: 'Sarajevossa sataa joka kuukausi paljon: kuivinkin '
      + 'kuukausi ylittää seitsemänkymmentä millimetriä ja vuosisumma '
      + 'nousee tuhanteen sataan. Toukokuu on märin, satayksitoista '
      + 'millimetriä, eikä kesä juuri kuivu. Lämpötila liikkuu nollasta '
      + 'kahteenkymmeneen asteeseen, eli talvi on lauhkea ja kesä '
      + 'maltillinen.',
  },
  odessa: {
    lat: 46.48,
    lon: 30.75,
    keskilampo: [-0.2, 0.8, 4.4, 10.1, 16.5, 21.3, 23.9, 23.6, 18.1, 12.2, 6.6, 1.8],
    ylin: [2, 4, 7, 14, 21, 25, 28, 28, 22, 15, 9, 3],
    alin: [-2, -2, 1, 7, 12, 18, 20, 19, 14, 10, 4, 0],
    sade: [35, 29, 32, 31, 38, 43, 33, 37, 39, 36, 32, 30],
    luonnehdinta: 'Odessassa sataa vähän ja tasaisesti: yksikään '
      + 'kuukausi ei nouse yli neljänkymmenenviiden millimetrin, ja '
      + 'vuosisumma jää neljäänsataan. Kesä on kuuma, heinä- ja '
      + 'elokuussa lähes kaksikymmentäneljä astetta, ja meri pitää '
      + 'talven nollan tuntumassa. Kaupunki on siis Mustanmeren kuivaa '
      + 'puolta, vaikka vesi alkaa kadun päästä.',
  },
  dubai: {
    lat: 25.27,
    lon: 55.3,
    keskilampo: [19.2, 20.2, 22.8, 27, 31.2, 33.4, 35.1, 35.3, 32.9, 29.6, 25.2, 21.2],
    ylin: [24, 25, 28, 32, 37, 40, 41, 40, 39, 35, 31, 25],
    alin: [15, 15, 17, 22, 25, 26, 29, 30, 26, 24, 19, 17],
    sade: [19, 16, 19, 6, 0, 0, 2, 1, 0, 1, 4, 9],
    luonnehdinta: 'Dubaissa vuoden sade mahtuu kahdeksaankymmeneen '
      + 'millimetriin, ja toukokuusta lokakuuhun sitä ei käytännössä '
      + 'tule lainkaan. Elokuun kolmekymmentäviisi astetta on vuoden '
      + 'huippu, ja kolmenkymmenen asteen jakso venyy toukokuulta '
      + 'syyskuulle. Talvi on lämmin ja lyhyt: tammikuussa '
      + 'yhdeksäntoista astetta ja se vähä vesi, jonka vuosi antaa.',
  },
  /*
   * Kaamos ja yötön aurinko eivät erotu tämän rivin luvuista, joten
   * luonnehdinnan valo-osuus on lähteestä: en-Wikipedian
   * Tromsø-artikkeli (haettu 17.8.2026) kertoo, ettei aurinko nouse
   * 26.11.–15.1. eikä laske 18.5.–26.7.
   */
  tromssa: {
    lat: 69.65,
    lon: 18.98,
    keskilampo: [-8.1, -7.8, -4.7, 0, 4.7, 9.6, 13.6, 12.4, 8.2, 1.8, -3.6, -6.3],
    ylin: [-5, -6, -2, 3, 7, 13, 16, 16, 11, 4, -1, -4],
    alin: [-11, -10, -7, -3, 2, 6, 11, 9, 6, 0, -7, -8],
    sade: [108, 94, 103, 86, 91, 92, 91, 102, 124, 129, 96, 106],
    luonnehdinta: 'Tromssassa vettä tulee yli tuhat kaksisataa '
      + 'millimetriä vuodessa, eikä yksikään kuukausi jää alle '
      + 'kahdeksankymmenen. Talvi on meren pehmentämä — tammikuussa '
      + 'kahdeksan astetta pakkasta, vähemmän kuin Rovaniemellä — mutta '
      + 'aurinko on kaamoksen ajan kokonaan poissa. Kesä jää '
      + 'neljääntoista asteeseen, ja silloin aurinko ei puolestaan laske '
      + 'lainkaan.',
  },
  dubrovnik: {
    lat: 42.64,
    lon: 18.11,
    keskilampo: [7.6, 8.2, 10.5, 13.6, 18, 22.1, 24.7, 25, 20.8, 16.8, 12.8, 8.9],
    ylin: [11, 11, 14, 17, 22, 25, 28, 28, 25, 20, 16, 11],
    alin: [4, 5, 7, 10, 14, 19, 21, 22, 17, 14, 10, 7],
    sade: [152, 146, 135, 133, 89, 60, 40, 51, 137, 198, 240, 200],
    luonnehdinta: 'Dubrovnikissa on Välimeren kesä ja rankka syksy: '
      + 'heinäkuussa neljäkymmentä millimetriä vettä, marraskuussa '
      + 'kaksisataaneljäkymmentä. Vuosisumma nousee lähes puoleentoista '
      + 'tuhanteen millimetriin, enemmän kuin missään muussa pelin '
      + 'Välimeren kaupungissa. Lämpötila pysyy silti Välimeren mitassa: '
      + 'tammikuussa vajaat kahdeksan astetta ja elokuussa '
      + 'kaksikymmentäviisi.',
  },
  riika: {
    lat: 56.95,
    lon: 24.11,
    keskilampo: [-2.6, -2.7, 0.5, 6.3, 11.9, 16.1, 18.7, 18, 13.4, 7.6, 2.8, -0.6],
    ylin: [-1, -1, 3, 10, 16, 20, 23, 22, 16, 10, 5, 1],
    alin: [-4, -5, -2, 3, 8, 12, 15, 14, 11, 5, 1, -2],
    sade: [46, 39, 39, 42, 52, 73, 71, 80, 68, 80, 58, 49],
    luonnehdinta: 'Riiassa talvi on lyhyempi ja leudompi kuin Virossa: '
      + 'pakkasta on kolmena kuukautena, kylmimmillään helmikuussa '
      + 'vajaat kolme astetta miinuksella. Kesä yltää heinäkuussa lähes '
      + 'yhdeksääntoista asteeseen, ja sade painottuu elo- ja '
      + 'lokakuuhun, kumpaankin kahdeksankymmentä millimetriä. '
      + 'Kevättalvi on kuiva: helmi- ja maaliskuussa alle neljäkymmentä '
      + 'millimetriä.',
  },
  vilna: {
    lat: 54.68,
    lon: 25.29,
    keskilampo: [-3.7, -3.1, 0.6, 7.2, 13, 16.6, 18.7, 18, 13.1, 7.2, 2.3, -1.8],
    ylin: [-2, -1, 3, 12, 18, 21, 23, 22, 16, 10, 4, 0],
    alin: [-6, -5, -2, 3, 8, 12, 14, 14, 10, 5, 0, -3],
    sade: [46, 41, 43, 46, 67, 73, 89, 82, 56, 57, 45, 48],
    luonnehdinta: 'Vilnassa meri on jo kaukana, ja se näkyy talvessa: '
      + 'tammikuun keskilämpö on lähes neljä astetta pakkasella, astetta '
      + 'kylmempi kuin Riiassa. Kesä on silti sama, heinäkuussa lähes '
      + 'yhdeksäntoista astetta, mutta selvästi sateisempi — lähes '
      + 'yhdeksänkymmentä millimetriä. Kosteus pitää pintansa elokuulle '
      + 'asti, ja vasta syyskuussa kertymä putoaa.',
  },
  oslo: {
    lat: 59.91,
    lon: 10.74,
    keskilampo: [-4.1, -3.4, 0.3, 5.5, 11.2, 15.3, 17.8, 16.6, 12.4, 6.8, 2.1, -2.5],
    ylin: [-2, -1, 3, 9, 16, 21, 22, 20, 16, 9, 4, -1],
    alin: [-6, -6, -3, 2, 6, 10, 14, 13, 9, 5, 0, -4],
    sade: [71, 52, 53, 55, 77, 94, 100, 108, 87, 93, 90, 69],
    luonnehdinta: 'Oslossa vuoden sade nousee lähes tuhanteen '
      + 'millimetriin, ja märin aika on kesä ja alkusyksy: elokuussa yli '
      + 'sata millimetriä. Talvi on pakkasella joulukuusta helmikuuhun, '
      + 'tammikuussa neljä astetta miinuksella, eli vuonon pohjukka on '
      + 'selvästi kylmempi kuin Tanskan salmet. Kesä yltää heinäkuussa '
      + 'lähes kahdeksaantoista asteeseen.',
  },
  kobenhavn: {
    lat: 55.68,
    lon: 12.58,
    keskilampo: [1.3, 1.3, 3.1, 7.2, 11.7, 15.3, 17.7, 17.5, 14.1, 9.7, 5.6, 2.6],
    ylin: [3, 3, 6, 10, 15, 19, 21, 21, 17, 12, 7, 4],
    alin: [-1, -1, 1, 4, 8, 11, 14, 14, 11, 8, 4, 1],
    sade: [51, 42, 43, 41, 51, 73, 72, 76, 57, 61, 50, 53],
    luonnehdinta: 'Kööpenhaminassa talvi pysyy nollan yläpuolella koko '
      + 'kauden: kylmimmätkin kuukaudet, tammi- ja helmikuu, ovat '
      + 'runsaan asteen plussalla. Kesä on lauhkea eikä nouse '
      + 'kahdeksaatoista astetta ylemmäs, ja sateisin kuukausi on '
      + 'elokuu. Meri kaventaa vuoden kuudentoista asteen mittaiseksi, '
      + 'mikä on vähemmän kuin missään muualla Itämeren piirissä.',
  },
  // Firenze on Arnon laaksossa vuorten ympäröimänä eikä rannikolla,
  // ja se näkyy luvuissa: kesä on kuumempi ja talvi viileämpi kuin
  // saman leveyspiirin rannikkokaupungeissa. Ennustepiste on
  // kaupungin oma sijainti (43,77 N, 11,256 E) eikä laudan siirretty
  // karttapiste — sää haetaan oikeasta Firenzestä.
  firenze: {
    lat: 43.77,
    lon: 11.26,
    keskilampo: [5.3, 6.0, 9.4, 12.8, 17.1, 21.5, 24.4, 24.5, 19.7, 15.0, 10.2, 6.2],
    ylin: [9, 11, 14, 18, 23, 26, 30, 30, 26, 19, 14, 9],
    alin: [1, 1, 5, 7, 11, 17, 19, 19, 14, 11, 6, 3],
    sade: [67, 76, 72, 82, 74, 48, 29, 33, 86, 113, 128, 97],
    luonnehdinta: 'Firenzen vuosi on jyrkkä: heinä- ja elokuun '
      + 'keskilämpö kohoaa yli 24 asteen, ja päivälämpötila nousee '
      + 'silloin kolmeenkymmeneen. Samat kuukaudet ovat vuoden '
      + 'kuivimmat — heinäkuussa sadetta kertyy noin 29 millimetriä. '
      + 'Sateet tulevat syksyllä: loka- ja marraskuussa kertyy '
      + 'yhteensä yli kaksisataa millimetriä, enemmän kuin koko '
      + 'kesäkuukausina yhteensä. Talvi on leuto mutta kostea, ja '
      + 'tammikuun keskilämpö jää viiden asteen tienoille.',
  },

  /*
   * ALUEET JA LOPUT KAUPUNGIT (Opus 16.8.2026). Näiltä puuttuivat
   * koordinaatit, koska niillä ei ole omaa kohdekarttaa, josta rajojen
   * keskipisteen voisi laskea. Koordinaatit on nyt haettu
   * fi-Wikipedian artikkeleista (prop=coordinates) — samoista, joihin
   * pelin lauta jo viittaa.
   *
   * NELJÄ KOHDETTA ON ALUE EIKÄ PISTE (Islanti, Kreeta, Sisilia,
   * Alpit). Alueella ei ole yhtä säätä, joten jokaiselle on
   * valittu EDUSTAVA MITTAUSPISTE: alueen pääkaupunki tai suurin
   * kaupunki, joka on merkitty rivin yläpuolelle. Alppien piste on
   * Innsbruck; korkealla vuorilla on kylmempää kuin laaksossa, joten
   * luvut kertovat alppikaupungin eivätkä huippujen säästä.
   *
   * Normaalit on laskettu samalla menetelmällä kuin paketin muutkin
   * rivit: Open-Meteon arkisto (ERA5), jakso 1991-2020.
   */
  // Mittauspiste: Reykjavík.
  islanti: {
    lat: 64.14,
    lon: -21.9,
    keskilampo: [-1.1, -0.9, 0.1, 3, 6.5, 9.9, 11.6, 10.8, 8.1, 4, 1, -0.8],
    ylin: [2, 1, 3, 6, 10, 12, 14, 13, 10, 6, 3, 1],
    alin: [-4, -3, -2, 0, 3, 8, 9, 9, 6, 2, -1, -3],
    sade: [131, 131, 118, 104, 92, 80, 86, 104, 134, 121, 121, 133],
    luonnehdinta: 'Reykjavíkin vuosi on kapea: kylmimmän ja '
      + 'lämpimimmän kuukauden ero on runsaat kaksitoista astetta, kun '
      + 'mantereella se on moninkertainen. Talvi ei ole kylmä vaan märkä '
      + '— tammikuun keskilämpö on aivan nollan tuntumassa, mutta '
      + 'sadetta tulee puolitoista kertaa niin paljon kuin kesällä. Kesä '
      + 'ei puolestaan oikeastaan lämpene: heinäkuussa keskimäärin '
      + 'kaksitoista astetta, ja niitä paistetaan yöttömässä valossa.',
  },
  // Mittauspiste: Rovaniemi (laudan id on yhä 'lappi'; kohde on
  // 17.8.2026 alkaen kaupunki eikä alue, joten mittauspiste on kohde itse).
  /*
   * Luonnehdinnan viimeinen lause puhuu valosta eikä lämmöstä, joten
   * se on lähteestä: en-Wikipedian artikkeli "Arctic Circle" (haettu
   * 17.8.2026) määrittelee napapiirin juuri siksi rajaksi, jonka
   * pohjoispuolella aurinko ei nouse talvipäivänseisauksena eikä
   * laske kesäpäivänseisauksena. Rovaniemi on napapiirillä.
   */
  lappi: {
    lat: 66.5,
    lon: 25.73,
    keskilampo: [-10, -9.9, -5.4, 0, 6.4, 12.7, 15.9, 13.6, 8.2, 1.2, -3.8, -7.4],
    ylin: [-7, -7, -3, 3, 11, 17, 20, 18, 11, 3, -1, -6],
    alin: [-13, -13, -8, -3, 2, 8, 12, 10, 5, -1, -6, -9],
    sade: [36, 30, 33, 34, 51, 70, 81, 70, 55, 52, 48, 43],
    luonnehdinta: 'Rovaniemellä pakkanen kestää marraskuusta '
      + 'maaliskuuhun, ja tammi–helmikuussa keskilämpö on kymmenen '
      + 'astetta nollan alapuolella. Kesä on lyhyt mutta yllättävän '
      + 'lämmin: heinäkuussa lähes kuusitoista astetta, kaksi vähemmän '
      + 'kuin Helsingissä. Vuosi jakautuu myös valon mukaan, sillä '
      + 'napapiirillä aurinko ei jouluna nouse eikä juhannuksena laske.',
  },
  // Mittauspiste: Iraklion.
  kreeta: {
    lat: 35.33,
    lon: 25.13,
    keskilampo: [11.1, 11.4, 13.1, 16.2, 20.6, 24.7, 26.6, 26.5, 23.9, 20.2, 16.1, 12.6],
    ylin: [14, 15, 17, 20, 25, 30, 31, 31, 27, 25, 19, 16],
    alin: [8, 8, 9, 12, 16, 20, 23, 22, 20, 16, 13, 9],
    sade: [72, 71, 57, 38, 29, 10, 3, 5, 20, 38, 50, 70],
    luonnehdinta: 'Kreetalla kesä on käytännössä sateeton: heinäkuussa '
      + 'kolme millimetriä ja elokuussa viisi, ja lämpötila on '
      + 'kummassakin runsaat kaksikymmentäkuusi astetta. Talvi on lämmin '
      + 'ja märkä, tammikuussa yksitoista astetta ja seitsemänkymmentä '
      + 'millimetriä. Vuoden vaihteluväli on vain viisitoista astetta, '
      + 'eli saari elää meren tahdissa.',
  },
  // Mittauspiste: Palermo.
  sisilia: {
    lat: 38.12,
    lon: 13.36,
    keskilampo: [11.3, 11.2, 13, 15.3, 19.2, 23.4, 26.2, 26.8, 23.5, 20.2, 16.1, 12.8],
    ylin: [14, 14, 16, 19, 23, 27, 30, 30, 27, 23, 19, 15],
    alin: [8, 8, 10, 12, 15, 20, 23, 23, 20, 17, 13, 10],
    sade: [69, 72, 67, 59, 36, 15, 7, 19, 61, 81, 68, 72],
    luonnehdinta: 'Palermossa sataa enemmän kuin Kreetalla mutta samaan '
      + 'tahtiin: kuiva kesä, märkä talvi. Lokakuu on sateisin '
      + 'kahdeksallakymmenellä millimetrillä ja heinäkuu kuivin '
      + 'seitsemällä. Lämpötila liikkuu yhdestätoista asteesta '
      + 'kahteenkymmeneenseitsemään, joten talvi on lyhyt ja kesä pitkä.',
  },
  // Mittauspiste: Innsbruck.
  alpit: {
    lat: 47.27,
    lon: 11.39,
    keskilampo: [-1, 0.8, 4.6, 8.2, 12.9, 16.9, 18.7, 18.6, 14.6, 10.4, 4.5, 0],
    ylin: [4, 6, 9, 13, 18, 22, 24, 23, 20, 15, 9, 4],
    alin: [-6, -4, 0, 4, 8, 12, 14, 14, 9, 6, 0, -4],
    sade: [82, 77, 107, 113, 172, 194, 198, 201, 138, 117, 103, 91],
    luonnehdinta: 'Innsbruckin vuosisade, lähes tuhat kuusisataa '
      + 'millimetriä, on pelin Euroopan suurin. Touko–elokuussa jokainen '
      + 'kuukausi ylittää sataseitsemänkymmentä millimetriä. Vuoristo '
      + 'tekee siis märäksi kesän eikä talvea. Tammikuun keskilämpö on '
      + 'asteen pakkasella, ja huipuilla luvut ovat tätä selvästi '
      + 'kylmemmät.',
  },
  // Mittauspiste: Sanaa.
  sana: {
    lat: 15.4,
    lon: 44.21,
    keskilampo: [15.3, 16.8, 18, 19.5, 21.5, 22.7, 21.8, 21.3, 21.3, 17.8, 15.7, 14.9],
    ylin: [22, 23, 25, 26, 27, 29, 28, 26, 28, 24, 23, 21],
    alin: [9, 10, 11, 13, 16, 16, 16, 17, 15, 11, 9, 9],
    sade: [8, 7, 31, 47, 21, 2, 19, 34, 1, 7, 3, 2],
    luonnehdinta: 'Sanaassa lämpötila tuskin liikkuu: kylmimmän ja '
      + 'lämpimimmän kuukauden ero on kahdeksan astetta, ja koko vuosi '
      + 'pysyy viidentoista ja kahdenkymmenenkolmen asteen tuntumassa. '
      + 'Vuosi on siis lämmin muttei kuuma, ja sade tulee kahtena '
      + 'piikkinä, huhtikuussa ja elokuussa. Kuivinta on '
      + 'syys–helmikuussa, jolloin kuukausikertymä on muutama '
      + 'millimetri.',
  },
  // Mittauspiste: Aden.
  aden: {
    lat: 12.8,
    lon: 45.03,
    keskilampo: [24.2, 24.5, 26.1, 28.1, 30.3, 31.7, 32.1, 31.3, 30.8, 28.4, 26.4, 24.9],
    ylin: [27, 27, 29, 31, 33, 35, 35, 35, 34, 31, 29, 27],
    alin: [22, 22, 23, 25, 27, 29, 29, 28, 28, 25, 23, 23],
    sade: [5, 3, 4, 8, 7, 8, 15, 38, 21, 10, 3, 3],
    luonnehdinta: 'Adenissa on lämmintä ympäri vuoden: kylmimmässäkin '
      + 'kuussa keskilämpö on yli kahdenkymmenenneljän asteen ja '
      + 'lämpimimmässä kolmekymmentäkaksi. Sadetta tulee runsaat sata '
      + 'millimetriä vuodessa, ja siitä lähes kolmasosa elokuussa. '
      + 'Vuodenaikoja erottaa siis kosteus eikä lämpö — ja sekin erottuu '
      + 'vain hädin tuskin.',
  },
  // Mittauspiste: Salala.
  salalah: {
    lat: 17.02,
    lon: 54.08,
    keskilampo: [21.4, 22.5, 25, 27.5, 28.8, 28.4, 26.4, 25.4, 26, 27.3, 25.9, 23.1],
    ylin: [25, 26, 29, 31, 32, 31, 29, 28, 29, 31, 30, 27],
    alin: [18, 19, 21, 24, 25, 25, 24, 23, 23, 24, 22, 19],
    sade: [2, 1, 10, 4, 40, 13, 6, 5, 8, 11, 8, 2],
    /*
     * Khareef eli lounaismonsuuni kesä-syyskuussa on Dhofarin
     * tunnettu ilmastopiirre: en-Wikipedian Salalah-artikkelin
     * Climate-osio (haettu 17.8.2026) kertoo, että kesät ovat
     * viileämpiä kuin muualla Omanissa ja että heinä-elokuu ovat
     * hyvin pilvisiä ja sumuisia, vaikka varsinaista sadetta kertyy
     * vähän. Sama näkyy tämän rivin normaaleissa lämpötilakuoppana.
     */
    luonnehdinta: 'Vuoden kuumin aika ei ole keskikesä vaan touko–kesäkuu: '
      + 'elokuuhun mennessä keskilämpö on laskenut yli kolme astetta, kun '
      + 'lounaismonsuuni khareef vetää merestä pilven ja sumun '
      + 'rannikolle. Kesä on siis Salalassa se viileä vuodenaika, ja '
      + 'muu vuosi on paahtavaa aavikkoa. Talvi on lämmin ja kuiva — '
      + 'tammikuussa runsaat kaksikymmentä astetta ja sadetta pari '
      + 'millimetriä koko kuussa.',
  },
  // Mittauspiste: Mosul.
  mosul: {
    lat: 36.37,
    lon: 43.12,
    keskilampo: [7, 8.6, 12.8, 18.2, 24.9, 31.7, 35.4, 34.8, 29.7, 23, 14.3, 8.8],
    ylin: [11, 12, 19, 24, 31, 40, 43, 42, 38, 30, 19, 14],
    alin: [3, 5, 7, 12, 19, 24, 28, 27, 22, 16, 9, 4],
    sade: [70, 63, 64, 42, 16, 1, 0, 0, 1, 19, 50, 62],
    luonnehdinta: 'Mosulissa sataa lähes kolme kertaa niin paljon kuin '
      + 'Bagdadissa, vaikka kaupungit ovat samassa maassa: lähes '
      + 'neljäsataa millimetriä vastaan runsas sata kolmekymmentä. Vesi '
      + 'tulee marras–huhtikuussa, ja keskikesällä normaali on nolla. '
      + 'Kesä on silti Bagdadin luokkaa kuuma, heinäkuussa yli '
      + 'kolmekymmentäviisi astetta.',
  },

  /*
   * PAKETIN O6 KAUPUNGIT (Opus 17.8.2026). Näiltä kolmelta puuttui
   * säärivi kokonaan, vaikka lehti ja matkailijan opas olivat valmiit.
   * Normaalit on laskettu samalla menetelmällä kuin paketin muutkin
   * rivit: Open-Meteon arkisto (ERA5), jakso 1991–2020, lämpö
   * kuukauden keskiarvojen keskiarvona ja sade kuukausisumman
   * vuosikeskiarvona. Menetelmä tarkistettiin ennen ajoa uudelleen
   * Lontoolla, jonka rivi oli jo paketissa: kaikki kaksitoista
   * kuukautta osuivat kymmenyksen sisään (tammikuu 4,8 vastaan 4,7 ja
   * marraskuu 7,6 vastaan 7,7, muut tasan samat).
   *
   * Koordinaatit ovat kaupunkien keskustoista: Soul ja Tripoli
   * en-Wikipediasta (Seoul, "Tripoli, Libya"), Shanghai
   * fi-Wikipediasta — kaikki haettu 17.8.2026.
   */
  /*
   * Soulin ERA5-ruutu on kaupungin oman sääaseman lukuja noin asteen
   * viileämpi (tammikuu −3,1 vastaan aseman noin −2), kuten Tabrizissa
   * ja Teheranissa: ruutuun osuu myös kaupunkia ympäröiviä vuoria.
   * Luonnehdinnassa nimetty kesämonsuuni changma on Korean tunnettu
   * ilmastopiirre; lähde en-Wikipedian artikkeli "East Asian rainy
   * season" (haettu 17.8.2026), joka ajoittaa sen kesä–heinäkuulle.
   * Sama piikki on tämän rivin omissa luvuissa heinä- ja elokuussa.
   */
  soul: {
    lat: 37.56,
    lon: 126.99,
    keskilampo: [-3.1, -0.6, 4.5, 10.8, 16.5, 21.5, 24.3, 24.9, 20.3, 13.5, 5.9, -1.1],
    ylin: [1, 4, 10, 17, 22, 26, 28, 28, 24, 18, 11, 3],
    alin: [-7, -5, -1, 5, 11, 17, 21, 22, 17, 9, 1, -5],
    sade: [19, 27, 37, 70, 95, 134, 315, 263, 123, 54, 46, 23],
    luonnehdinta: 'Puolet vuoden vedestä sataa kahdessa kuukaudessa: '
      + 'heinä- ja elokuussa kertyy yhteensä lähes kuusisataa '
      + 'millimetriä, sillä kesämonsuuni changma osuu juuri näihin '
      + 'viikkoihin. Muu vuosi on kuiva: tammikuussa vettä tulee '
      + 'yhdeksäntoista millimetriä ja pakkasta kolme astetta. Kesä on '
      + 'kuuma ja kostea, elokuussa lähes kaksikymmentäviisi astetta.',
  },
  shanghai: {
    lat: 31.22,
    lon: 121.48,
    keskilampo: [4.8, 6.2, 9.8, 14.9, 20, 23.7, 27.9, 27.8, 23.9, 18.8, 13.5, 7.2],
    ylin: [8, 10, 14, 19, 24, 27, 31, 31, 27, 22, 18, 10],
    alin: [2, 2, 6, 11, 16, 20, 25, 25, 21, 16, 9, 4],
    sade: [65, 63, 96, 104, 128, 268, 160, 155, 106, 61, 58, 45],
    luonnehdinta: 'Shanghain sateisin kuukausi on kesäkuu eikä '
      + 'keskikesä: silloin vettä tulee lähes '
      + 'kaksisataaseitsemänkymmentä millimetriä, kun joulukuussa '
      + 'neljäkymmentäviisi. Kesä on pitkä ja kuuma — keskikesällä lähes '
      + 'kaksikymmentäkahdeksan astetta — ja talvi viileä muttei '
      + 'pakkanen, tammikuussa vajaat viisi astetta. Vuoden sade nousee '
      + 'yli tuhannen kolmensadan millimetrin.',
  },
  tripoli: {
    lat: 32.89,
    lon: 13.19,
    keskilampo: [13.2, 13.6, 15.8, 18.5, 21.6, 24.8, 26.8, 27.6, 26.5, 23.4, 18.7, 14.7],
    ylin: [16, 17, 19, 23, 26, 30, 31, 32, 30, 27, 22, 18],
    alin: [10, 10, 12, 14, 17, 20, 23, 23, 23, 20, 15, 12],
    sade: [36, 30, 20, 11, 5, 1, 0, 1, 10, 19, 24, 31],
    luonnehdinta: 'Tripolissa meri pitää vuoden kapeana: tammikuun '
      + 'kolmestatoista asteesta elokuun vajaaseen '
      + 'kahteenkymmeneenkahdeksaan on vain neljätoista astetta. Sade on '
      + 'Välimeren mallia mutta niukkaa — tammikuussa kolmekymmentäkuusi '
      + 'millimetriä, heinäkuussa ei lainkaan. Koko vuoden vesi jää alle '
      + 'kahdensadan millimetrin, ja siitä valtaosa tulee '
      + 'loka–maaliskuussa.',
  },

  /*
   * PAKETIN O7 KOHTEET (Opus 19.8.2026). Kolme uutta lehteä, joilla ei
   * ollut säärivin lisäksi mitään muutakaan pakettia — rivit tehtiin
   * ennen lehtiä, jotta vuosigraafi on valmiina heti ensimmäisessä
   * julkaisussa. Menetelmä on paketin oma: Open-Meteon arkisto (ERA5),
   * jakso 1991–2020, keskilämpö kuukauden päiväkeskiarvojen
   * keskiarvona ja sade kuukausisumman vuosikeskiarvona. Ylin ja alin
   * on laskettu tools/hae-saanormaalit.mjs:n kaavalla mutta koko
   * jaksolta eikä otoksesta: kuukauden päivittäisten ylimpien ja
   * alimpien keskiarvojen puoliväli asetettiin keskilämmön ympärille.
   *
   * Koordinaatit ovat kohteiden omista en-Wikipedian artikkeleista
   * (Petra, Göreme, Persepolis; haettu 19.8.2026). Kappadokia on niin
   * laaja alue, ettei sillä ole yhtä keskustaa — rivi on laskettu
   * Göremen kohdalta, koska matkailijan yöpaikat ja tuffikartio-
   * laakso ovat siinä.
   */
  petra: {
    lat: 30.33,
    lon: 35.44,
    keskilampo: [8.8, 10.2, 13.7, 18.1, 22.4, 25, 26.5, 26.6, 24.6, 21.1, 15.3, 10.7],
    ylin: [13, 15, 19, 24, 29, 31, 33, 33, 30, 26, 20, 15],
    alin: [4, 5, 8, 12, 16, 19, 20, 21, 19, 16, 10, 6],
    sade: [28, 22, 16, 5, 4, 0, 0, 0, 1, 5, 9, 12],
    luonnehdinta: 'Petran koko vuoden sade on runsaat sata millimetriä, '
      + 'ja kesäkuusta syyskuuhun normaali on nolla — silti juuri vesi '
      + 'teki paikasta kaupungin. Talvi on vuoristossa viileä, '
      + 'tammikuussa vajaat yhdeksän astetta, ja heinä–elokuun '
      + 'kahdenkymmenenkuuden asteen keskilämpö tarkoittaa päivällä yli '
      + 'kolmeakymmentä. Vuorokauden vaihtelu on kuivan ilman takia '
      + 'suuri: aamu on kymmenen astetta iltapäivää viileämpi.',
  },
  kapadokia: {
    lat: 38.64,
    lon: 34.83,
    keskilampo: [-0.5, 0.6, 5, 10.1, 15.1, 19.6, 23.2, 23.2, 18.8, 12.9, 5.9, 1.3],
    ylin: [4, 6, 11, 17, 22, 27, 31, 31, 26, 20, 12, 6],
    alin: [-5, -5, -1, 3, 8, 13, 16, 16, 11, 6, 0, -4],
    sade: [44, 38, 52, 54, 52, 27, 5, 4, 12, 26, 35, 44],
    luonnehdinta: 'Kappadokia on tuhannen metrin ylätasankoa, ja se '
      + 'näkyy: tammi- ja helmikuussa keskilämpö on pakkasen puolella '
      + 'tai nollassa, kun heinä- ja elokuussa se on yli kahdenkymmenen '
      + 'kolmen asteen. Sadetta tulee vajaat neljäsataa millimetriä, '
      + 'eniten huhti–toukokuussa ja tuskin lainkaan keskikesällä. '
      + 'Talvella tuffikartioiden päällä on usein lunta.',
  },
  persepolis: {
    lat: 29.94,
    lon: 52.89,
    keskilampo: [4.4, 6.8, 10.8, 16.1, 22.1, 27.3, 29.8, 28.7, 24.6, 18.7, 11.7, 6.7],
    ylin: [11, 13, 18, 24, 31, 36, 38, 37, 33, 27, 19, 13],
    alin: [-2, 0, 4, 8, 14, 18, 21, 20, 16, 10, 5, 0],
    sade: [59, 51, 55, 27, 6, 0, 0, 0, 0, 2, 24, 45],
    luonnehdinta: 'Persepolis on Iranin ylängöllä puolentoista '
      + 'kilometrin korkeudessa, ja vuosi jakautuu kahtia: touko–'
      + 'lokakuussa vettä ei käytännössä tule lainkaan, ja koko '
      + 'vuoden vajaat kaksisataaseitsemänkymmentä millimetriä sataa '
      + 'marras–huhtikuussa. Heinäkuun kolmenkymmenen asteen '
      + 'keskilämmöstä laskeudutaan tammikuun neljään, ja talviöinä '
      + 'raunioilla on pakkasta.',
  },
};
