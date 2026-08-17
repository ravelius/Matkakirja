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
    sade: [55, 47, 43, 49, 52, 56, 55, 61, 48, 60, 64, 59],
  },
  kairo: {
    lat: 30.05,
    lon: 31.23,
    keskilampo: [13.6, 14.7, 17.5, 21.3, 25.2, 27.9, 29.0, 29.1, 27.4, 24.2, 19.5, 15.2],
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
    sade: [39, 32, 39, 46, 38, 15, 6, 8, 21, 58, 54, 44],
  },
  // Tukholma on 59. leveyspiirillä mutta meren keskellä: talvi on
  // leudompi kuin sisämaassa samalla korkeudella, ja sade jakautuu
  // tasaisesti vuoteen — kesä on silti sateisin aika.
  tukholma: {
    lat: 59.33,
    lon: 18.07,
    keskilampo: [-1.4, -1.6, 0.8, 5.2, 10.3, 14.8, 17.8, 17.1, 12.8, 7.4, 3.2, 0.1],
    sade: [37, 31, 32, 33, 43, 64, 65, 69, 50, 50, 48, 46],
  },
  venetsia: {
    lat: 45.44,
    lon: 12.32,
    keskilampo: [4.3, 5.3, 8.8, 12.8, 17.5, 21.5, 23.9, 24.0, 19.5, 14.9, 9.8, 5.2],
    sade: [60, 62, 69, 82, 93, 77, 60, 82, 120, 118, 125, 79],
  },
  // Berliini on mannerilmastoa tasangolla: talvi käy pakkasen puolella
  // ja sade jakautuu tasaisesti ympäri vuoden — heinäkuun kuurot ovat
  // vuoden märin kuukausi.
  berliini: {
    lat: 52.52,
    lon: 13.41,
    keskilampo: [0.7, 1.6, 4.5, 9.4, 14.1, 17.5, 19.6, 19.5, 15.1, 10.1, 5.2, 1.9],
    sade: [50, 37, 48, 37, 56, 59, 77, 56, 52, 46, 42, 46],
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
    sade: [11, 12, 12, 4, 0, 0, 0, 0, 0, 0, 7, 14],
  },
  // Nikosia on sisämaassa tasangolla, ei rannikolla: kesä on siksi
  // kuumempi ja talvi viileämpi kuin Kyproksen rantakaupungeissa.
  // Heinä- ja elokuussa sataa käytännössä ei lainkaan, ja koko vuoden
  // sade tulee marraskuun ja maaliskuun välillä.
  nikosia: {
    lat: 35.17,
    lon: 33.36,
    keskilampo: [10.7, 11.2, 13.6, 17.5, 22.2, 26.8, 29.7, 29.6, 26.3, 21.9, 16.6, 12.5],
    sade: [54, 47, 35, 30, 29, 9, 2, 3, 11, 35, 37, 53],
  },
  // Kuwait on Persianlahden pohjukassa ja kaukana avomerestä, joten
  // kesä on koko lahden alueen kuumin: heinäkuun keskilämpö ylittää 37
  // astetta eikä kesä-syyskuussa sada lainkaan. Sade tulee talvella
  // lyhyinä ryöppyinä.
  kuwait: {
    lat: 29.38,
    lon: 47.99,
    keskilampo: [13.5, 15.4, 19.7, 25.4, 31.7, 36.1, 37.6, 37.4, 34.1, 28.7, 21, 15.4],
    sade: [30, 13, 17, 6, 2, 0, 0, 0, 0, 2, 30, 26],
  },
  // Masqat on meren rannalla vuorten juurella: talvi on lämpimämpi
  // kuin Kuwaitissa ja kesä hieman viileämpi, koska meri tasaa. Sade
  // on vähäistä ympäri vuoden, ja kesäkuun piikki tulee harvinaisista
  // trooppisista matalapaineista.
  masqat: {
    lat: 23.615,
    lon: 58.593,
    keskilampo: [20.7, 21.9, 24.4, 28.6, 32.5, 33.5, 33, 31.9, 30.8, 29, 25.3, 22.2],
    sade: [18, 11, 18, 7, 1, 10, 4, 1, 0, 1, 12, 14],
  },
  // Bagdad on nipun kuivin ja kuumin: heinä-elokuun keskilämpö on yli
  // 38 astetta, ja kesäkuusta lokakuuhun sadetta ei tule lainkaan.
  bagdad: {
    lat: 33.315,
    lon: 44.366,
    keskilampo: [10.8, 13.1, 18.3, 24.6, 31.1, 35.9, 38.3, 38.1, 34, 27.7, 18.1, 12.5],
    sade: [25, 21, 19, 13, 4, 0, 0, 0, 0, 8, 21, 23],
  },
  // İzmir on ainoa Välimeren rannalla: sade painottuu talveen ja on
  // moninkertainen muihin nipun kaupunkeihin verrattuna, heinäkuussa
  // sitä ei käytännössä tule.
  izmir: {
    lat: 38.419,
    lon: 27.128,
    keskilampo: [7.5, 8.5, 11.1, 15.2, 20.5, 25.6, 28.7, 28.6, 24, 18.7, 13.2, 9],
    sade: [108, 100, 83, 62, 40, 15, 3, 4, 24, 63, 94, 109],
  },
  // Ankara on Anatolian ylängöllä noin 900 metrissä, ja se näkyy
  // suoraan käyrässä: tammikuun keskilämpö on nollan tuntumassa, kun
  // rannikon İzmirissä se on 7,5 astetta.
  ankara: {
    lat: 39.942,
    lon: 32.86,
    keskilampo: [1, 2.5, 6.4, 11.5, 16.7, 20.8, 24.4, 24.6, 20.2, 14.5, 7.6, 2.9],
    sade: [50, 44, 53, 46, 44, 31, 9, 10, 13, 28, 39, 54],
  },
  // Aleppo ja Damaskos ovat molemmat kuivan ja kostean rajalla: sade
  // tulee marraskuun ja maaliskuun välissä, ja kesä on täysin kuiva.
  halab: {
    lat: 36.2,
    lon: 37.157,
    keskilampo: [6.5, 7.9, 11.8, 16.7, 21.9, 26.2, 28.6, 28.7, 25.8, 20.8, 13, 7.9],
    sade: [55, 49, 39, 25, 18, 3, 1, 1, 3, 19, 33, 54],
  },
  // Damaskos on Aleppoa hieman lämpimämpi ja selvästi kuivempi:
  // vuoret pysäyttävät mereltä tulevan sateen, ja kaupunki elää
  // keitaan varassa.
  damaskos: {
    lat: 33.511,
    lon: 36.306,
    keskilampo: [5.9, 7.3, 11, 15.8, 20.9, 24.8, 27.1, 27, 24.4, 19.6, 12.4, 7.7],
    sade: [40, 35, 25, 11, 7, 0, 0, 0, 1, 7, 23, 31],
  },
  // Luxor on koko pelin kuivin kaupunki: ERA5:n normaaleissa sadetta
  // tulee tammikuussa ja joulukuussa yksi millimetri, ja kymmenenä
  // kuukautena kahdestatoista ei lainkaan. Kesä on Bagdadin luokkaa.
  luxor: {
    lat: 25.699,
    lon: 32.639,
    keskilampo: [14.4, 16.6, 20.8, 26, 30.6, 32.8, 33.5, 33.4, 31.1, 27.2, 20.9, 15.9],
    sade: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  },
  // Riadissa sade on talven asia ja kesällä sitä ei tule lainkaan:
  // kesäkuusta syyskuuhun normaali on nolla millimetriä. Huhtikuu on
  // sateisin kuukausi, ja silloinkin vettä tulee 14 millimetriä.
  riad: {
    lat: 24.633,
    lon: 46.716,
    keskilampo: [14, 16.8, 21.1, 26.8, 32.4, 35, 36.1, 36, 32.8, 27.6, 20.5, 15.4],
    sade: [11, 7, 12, 14, 2, 0, 0, 0, 0, 1, 12, 9],
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
    sade: [30, 41, 57, 66, 50, 21, 14, 8, 7, 22, 38, 33],
  },
  // Teheranissa sade osuu talveen ja kevääseen: heinä-, elo- ja
  // syyskuussa normaali on yksi millimetri. Sama ERA5:n ja sääaseman
  // ero kuin Tabrizissa, joskin pienempi — ruutuun osuu Alborzin
  // rinnettä, joten se on asemaa hieman viileämpi ja sateisempi.
  teheran: {
    lat: 35.68,
    lon: 51.42,
    keskilampo: [0.4, 2.5, 8.1, 14.8, 21.4, 27.8, 31, 29.9, 25, 18, 9.1, 3.1],
    sade: [38, 40, 50, 37, 14, 2, 1, 1, 1, 14, 40, 40],
  },
  // Tokio on lehtikaupungeista sateisin: vuoden summa on noin 1 455 mm,
  // eli lähes viisitoista kertaa Isfahanin luku. Kuivinkin kuukausi
  // (joulukuu, 60 mm) on sateisempi kuin Bagdadin tai Riadin sateisin.
  tokio: {
    lat: 35.71,
    lon: 139.78,
    keskilampo: [4, 4.7, 8.2, 13.2, 17.9, 21.2, 25, 26.3, 23, 17.5, 12, 6.7],
    sade: [67, 63, 115, 113, 130, 162, 150, 113, 183, 208, 91, 60],
  },
  // Isfahan on Iranin kolmesta lehtikaupungista kuivin: heinä-, elo- ja
  // syyskuussa normaali sademäärä on nolla millimetriä, ja sateisinkin
  // kuukausi jää seitsemääntoista. Vuoden summa on noin 98 mm, eli alle
  // kolmasosa Tabrizin luvusta.
  isfahan: {
    lat: 32.65,
    lon: 51.67,
    keskilampo: [2.2, 5.1, 10.1, 16.2, 22, 27.6, 30.3, 28.9, 24.3, 17.6, 9.5, 4.2],
    sade: [17, 12, 17, 11, 7, 1, 0, 0, 0, 3, 16, 14],
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
    sade: [17, 15, 25, 35, 57, 74, 87, 73, 52, 43, 29, 21],
  },
  // Novosibirsk on Länsi-Siperian tasangolla kaukana joka mereltä:
  // tammikuun keskilämpö on −17 astetta, kolme astetta kylmempi kuin
  // Uralin takana Jekaterinburgissa. Sade jakautuu tasaisemmin kuin
  // Irkutskissa, ja marras-tammikuun 114 mm tulee lumena.
  novosibirsk: {
    lat: 55.03,
    lon: 82.92,
    keskilampo: [-17, -14.1, -6.7, 2.5, 11, 17.3, 19.4, 17, 10.3, 2.7, -7.3, -13.9],
    sade: [27, 20, 26, 32, 41, 55, 70, 55, 49, 48, 46, 41],
  },
  // Irkutsk on nipun kuivin ja talvella lähes sateeton: tammi- ja
  // helmikuussa normaali on kuusi millimetriä, kun elokuussa se on
  // 102. Kesä-syyskuun neljä kuukautta tuovat 328 mm eli lähes kolme
  // neljäsosaa koko vuoden 457 millimetristä.
  irkutsk: {
    lat: 52.29,
    lon: 104.3,
    keskilampo: [-19.1, -15, -6.4, 3, 10, 16.7, 19.2, 17, 10.2, 1.9, -7.7, -15.9],
    sade: [6, 6, 11, 22, 38, 67, 98, 102, 61, 23, 13, 10],
  },
  // Jakutskin käyrä on koko pelin jyrkin: tammikuun −35,9 ja heinäkuun
  // +20,0 asteen välillä on 56 astetta. Sadetta tulee vain 230 mm
  // vuodessa, vähemmän kuin Madridissa — mutta ikirouta estää veden
  // imeytymisen, joten kuivuus ei näy maisemassa.
  jakutsk: {
    lat: 62.03,
    lon: 129.73,
    keskilampo: [-35.9, -31.3, -17.8, -4, 7.7, 16.9, 20, 16, 6.6, -6.3, -24.9, -36],
    sade: [2, 3, 4, 10, 26, 32, 44, 43, 38, 17, 9, 2],
  },
  // Magadanissa meri näkyy käyrässä: Ohotanmeri pitää talven
  // Jakutskiin verrattuna lauhana (−19,5 vastaan −35,9) mutta jättää
  // kesän 13 asteeseen. Vuoden sade 538 mm on yli kaksinkertainen
  // Jakutskiin nähden, ja sateisin kuukausi on elokuu.
  magadan: {
    lat: 59.56,
    lon: 150.8,
    keskilampo: [-19.5, -19.1, -13.6, -5.9, 1.8, 8.4, 12.4, 12.8, 7.9, -1.2, -11.7, -17.9],
    sade: [17, 14, 25, 30, 42, 51, 56, 87, 76, 64, 54, 22],
  },
  // Kamtšatka (Petropavlovsk) on koko pelin sateisin Siperia-kohde:
  // 1 231 mm vuodessa, yli viisi kertaa Jakutskin verran. Meri pitää
  // talven −10 asteessa mutta kesän 13:ssa, ja sateisin kuukausi on
  // lokakuu — talven osuus tulee lumena, jota kertyy metrikaupalla.
  kamtsatka: {
    lat: 53.02,
    lon: 158.65,
    keskilampo: [-10.3, -9.2, -5.7, -1.3, 3, 8.8, 13, 13.4, 9.9, 3.8, -3.5, -9.4],
    sade: [116, 93, 115, 97, 68, 64, 72, 107, 107, 139, 135, 118],
  },
  // Sahalinia ympäröi meri joka suunnalta, mutta se ei lämmitä:
  // Ohotanmeri jäätyy talveksi, ja tammikuun −11,4 on kylmempi kuin
  // Kamtšatkan tai Vladivostokin. Kesä jää 18 asteeseen, ja elo-
  // syyskuun 207 mm tulee myöhäiskesän matalapaineista.
  sahalin: {
    lat: 46.96,
    lon: 142.74,
    keskilampo: [-11.4, -10.7, -5.1, 1.6, 7.8, 12.7, 16.6, 18, 14.5, 7.5, -0.8, -8.5],
    sade: [55, 40, 64, 70, 69, 62, 81, 103, 104, 90, 73, 66],
  },
  // Vladivostokin käyrä on monsuunin käyrä: talvi on mantereen kylmää
  // ilmaa ja lähes sateeton (tammikuussa 11 mm), kesä merituulen
  // sumua ja kaatosadetta (elokuussa 150 mm). Kaupunki on samalla
  // leveysasteella kuin Sotši Mustallamerellä, mutta tammikuu on −11.
  vladivostok: {
    lat: 43.12,
    lon: 131.89,
    keskilampo: [-11, -7.8, -1.7, 3.8, 8.9, 14, 18.6, 20.6, 17.1, 10.1, 0.5, -8.2],
    sade: [11, 15, 28, 43, 84, 70, 131, 150, 94, 70, 36, 18],
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
    sade: [37, 33, 43, 38, 67, 77, 82, 73, 56, 44, 40, 40],
  },
  wien: {
    lat: 48.2,
    lon: 16.37,
    keskilampo: [0.1, 1.6, 5.6, 10.7, 15.4, 19.2, 21.2, 21, 16, 10.7, 5.6, 1],
    sade: [35, 32, 46, 45, 73, 76, 78, 70, 72, 48, 44, 39],
  },
  pariisi: {
    lat: 48.87,
    lon: 2.32,
    keskilampo: [4.3, 4.7, 7.5, 10.5, 14.1, 17.4, 19.6, 19.5, 16.1, 12.3, 7.8, 4.8],
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
    sade: [55, 48, 50, 28, 23, 12, 7, 5, 17, 28, 50, 64],
  },
  amsterdam: {
    lat: 52.37,
    lon: 4.89,
    keskilampo: [3.7, 3.9, 6.1, 9.3, 12.8, 15.5, 17.7, 17.7, 15.1, 11.4, 7.4, 4.5],
    sade: [64, 54, 54, 51, 63, 68, 84, 84, 70, 70, 63, 71],
  },
  istanbul: {
    lat: 41.02,
    lon: 28.99,
    keskilampo: [6.2, 6.5, 8.3, 12.1, 17, 21.7, 24.2, 24.6, 21.1, 16.7, 12.1, 8.2],
    sade: [85, 71, 73, 47, 37, 36, 20, 21, 46, 78, 72, 99],
  },
  dublin: {
    lat: 53.34,
    lon: -6.27,
    keskilampo: [5.6, 5.7, 6.9, 8.7, 11.4, 14.2, 15.8, 15.6, 13.7, 10.9, 7.9, 6],
    sade: [70, 59, 60, 67, 67, 75, 76, 79, 70, 79, 86, 77],
  },
  edinburgh: {
    lat: 55.95,
    lon: -3.19,
    keskilampo: [3.9, 4.1, 5.3, 7.3, 10, 12.8, 14.7, 14.4, 12.4, 9.4, 6.3, 4.1],
    sade: [74, 62, 60, 54, 57, 68, 73, 77, 61, 81, 73, 77],
  },
  marseille: {
    lat: 43.29,
    lon: 5.37,
    keskilampo: [8, 8.1, 10.9, 13.5, 17.2, 21.2, 23.8, 23.9, 20.2, 16.5, 11.9, 8.8],
    sade: [52, 41, 39, 66, 52, 31, 14, 22, 72, 83, 91, 54],
  },
  lissabon: {
    lat: 38.72,
    lon: -9.13,
    keskilampo: [11.1, 11.4, 13.3, 14.7, 17.1, 19.7, 21.3, 21.9, 20.6, 17.9, 14.3, 12],
    sade: [69, 52, 53, 53, 44, 11, 2, 4, 29, 78, 84, 79],
  },
  barcelona: {
    lat: 41.39,
    lon: 2.17,
    keskilampo: [8.5, 9.1, 11.3, 13.5, 17.1, 21.1, 23.8, 24.1, 20.9, 17.3, 12.5, 9.3],
    sade: [41, 35, 41, 54, 46, 36, 24, 40, 79, 92, 61, 42],
  },
  granada: {
    lat: 37.18,
    lon: -3.59,
    keskilampo: [6.3, 7.6, 10.6, 13.1, 17.3, 22.7, 26.6, 26.3, 21.3, 16.2, 10.3, 7.4],
    sade: [51, 49, 66, 58, 50, 27, 7, 13, 34, 52, 61, 62],
  },
  budapest: {
    lat: 47.5,
    lon: 19.05,
    keskilampo: [-0.3, 1.3, 5.8, 11.6, 16.5, 20.3, 22.3, 22.1, 16.8, 11.3, 5.8, 0.6],
    sade: [36, 36, 41, 46, 67, 72, 72, 58, 57, 52, 52, 44],
  },
  rooma: {
    lat: 41.9,
    lon: 12.47,
    keskilampo: [7.4, 8, 10.6, 13.5, 17.8, 22.2, 25.1, 25.4, 21, 16.9, 12.4, 8.5],
    sade: [63, 72, 76, 79, 59, 35, 23, 23, 85, 121, 133, 95],
  },
  krakova: {
    lat: 50.06,
    lon: 19.94,
    keskilampo: [-1.9, -0.6, 3.3, 9, 13.9, 17.4, 19.4, 19.1, 14.3, 9.2, 4, -0.3],
    sade: [43, 44, 52, 58, 93, 90, 105, 77, 74, 58, 46, 42],
  },
  varsova: {
    lat: 52.24,
    lon: 21.02,
    keskilampo: [-1.6, -0.6, 2.9, 8.9, 14.2, 17.7, 19.7, 19.2, 14.3, 9, 4, 0],
    sade: [41, 38, 43, 46, 69, 70, 84, 66, 58, 46, 41, 43],
  },
  helsinki: {
    lat: 60.17,
    lon: 24.95,
    keskilampo: [-4, -4.9, -1.9, 3.6, 9.8, 14.3, 17.9, 16.8, 12.1, 6.2, 1.8, -1.5],
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
    sade: [44, 36, 33, 37, 42, 69, 71, 78, 59, 64, 52, 48],
  },
  kiova: {
    lat: 50.45,
    lon: 30.52,
    keskilampo: [-3.7, -3, 1.6, 9, 15.2, 19.1, 20.8, 20, 14.6, 8.4, 2.4, -2.1],
    sade: [34, 34, 40, 44, 63, 69, 83, 53, 59, 45, 42, 44],
  },
  pietari: {
    lat: 59.94,
    lon: 30.32,
    keskilampo: [-5.7, -6.1, -2.5, 3.5, 10.3, 15.1, 18.1, 16.6, 11.7, 5.3, 0.1, -3.2],
    sade: [42, 33, 36, 40, 51, 65, 67, 73, 55, 62, 57, 49],
  },
  moskova: {
    lat: 55.75,
    lon: 37.62,
    keskilampo: [-7.5, -7.4, -2.6, 5.4, 13, 17, 19.4, 17.5, 11.9, 5.5, -1.2, -5.3],
    sade: [36, 32, 33, 36, 58, 71, 76, 66, 57, 58, 44, 38],
  },
  sofia: {
    lat: 42.69,
    lon: 23.33,
    keskilampo: [-0.7, 1.1, 5.2, 10.2, 15.2, 19.2, 21.2, 21.5, 16.9, 11.5, 5.8, 0.9],
    sade: [40, 39, 56, 60, 71, 62, 53, 36, 36, 49, 38, 46],
  },
  bukarest: {
    lat: 44.43,
    lon: 26.09,
    keskilampo: [-1.1, 1.3, 6.1, 11.9, 17.4, 21.5, 23.7, 23.7, 18.4, 12.3, 6.3, 0.6],
    sade: [39, 34, 47, 58, 71, 89, 79, 49, 61, 52, 46, 46],
  },
  sarajevo: {
    lat: 43.86,
    lon: 18.43,
    keskilampo: [0.1, 1, 4.8, 9.6, 14.3, 18.2, 20.3, 20.6, 15.9, 11.3, 6.2, 1.3],
    sade: [74, 85, 87, 105, 111, 105, 94, 74, 86, 89, 92, 98],
  },
  odessa: {
    lat: 46.48,
    lon: 30.75,
    keskilampo: [-0.2, 0.8, 4.4, 10.1, 16.5, 21.3, 23.9, 23.6, 18.1, 12.2, 6.6, 1.8],
    sade: [35, 29, 32, 31, 38, 43, 33, 37, 39, 36, 32, 30],
  },
  dubai: {
    lat: 25.27,
    lon: 55.3,
    keskilampo: [19.2, 20.2, 22.8, 27, 31.2, 33.4, 35.1, 35.3, 32.9, 29.6, 25.2, 21.2],
    sade: [19, 16, 19, 6, 0, 0, 2, 1, 0, 1, 4, 9],
  },
  tromssa: {
    lat: 69.65,
    lon: 18.98,
    keskilampo: [-8.1, -7.8, -4.7, 0, 4.7, 9.6, 13.6, 12.4, 8.2, 1.8, -3.6, -6.3],
    sade: [108, 94, 103, 86, 91, 92, 91, 102, 124, 129, 96, 106],
  },
  dubrovnik: {
    lat: 42.64,
    lon: 18.11,
    keskilampo: [7.6, 8.2, 10.5, 13.6, 18, 22.1, 24.7, 25, 20.8, 16.8, 12.8, 8.9],
    sade: [152, 146, 135, 133, 89, 60, 40, 51, 137, 198, 240, 200],
  },
  riika: {
    lat: 56.95,
    lon: 24.11,
    keskilampo: [-2.6, -2.7, 0.5, 6.3, 11.9, 16.1, 18.7, 18, 13.4, 7.6, 2.8, -0.6],
    sade: [46, 39, 39, 42, 52, 73, 71, 80, 68, 80, 58, 49],
  },
  vilna: {
    lat: 54.68,
    lon: 25.29,
    keskilampo: [-3.7, -3.1, 0.6, 7.2, 13, 16.6, 18.7, 18, 13.1, 7.2, 2.3, -1.8],
    sade: [46, 41, 43, 46, 67, 73, 89, 82, 56, 57, 45, 48],
  },
  oslo: {
    lat: 59.91,
    lon: 10.74,
    keskilampo: [-4.1, -3.4, 0.3, 5.5, 11.2, 15.3, 17.8, 16.6, 12.4, 6.8, 2.1, -2.5],
    sade: [71, 52, 53, 55, 77, 94, 100, 108, 87, 93, 90, 69],
  },
  kobenhavn: {
    lat: 55.68,
    lon: 12.58,
    keskilampo: [1.3, 1.3, 3.1, 7.2, 11.7, 15.3, 17.7, 17.5, 14.1, 9.7, 5.6, 2.6],
    sade: [51, 42, 43, 41, 51, 73, 72, 76, 57, 61, 50, 53],
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
    sade: [131, 131, 118, 104, 92, 80, 86, 104, 134, 121, 121, 133],
    luonnehdinta: 'Reykjavíkin vuosi on kapea: kylmimmän ja '
      + 'lämpimimmän kuukauden ero on runsaat kaksitoista astetta, kun '
      + 'mantereella se on moninkertainen. Talvi ei ole kylmä vaan märkä '
      + '— tammikuun keskilämpö on aivan nollan tuntumassa, mutta '
      + 'sadetta tulee puolitoista kertaa niin paljon kuin kesällä. Kesä '
      + 'ei puolestaan oikeastaan lämpene: heinäkuussa keskimäärin '
      + 'kaksitoista astetta, ja niitä paistetaan yöttömässä valossa.',
  },
  // Rovaniemi (laudan id on yhä 'lappi'). Ei enää aluekohde vaan
  // kaupunki, joten mittauspiste on kohde itse.
  lappi: {
    lat: 66.5,
    lon: 25.73,
    keskilampo: [-10, -9.9, -5.4, 0, 6.4, 12.7, 15.9, 13.6, 8.2, 1.2, -3.8, -7.4],
    sade: [36, 30, 33, 34, 51, 70, 81, 70, 55, 52, 48, 43],
  },
  // Mittauspiste: Iraklion.
  kreeta: {
    lat: 35.33,
    lon: 25.13,
    keskilampo: [11.1, 11.4, 13.1, 16.2, 20.6, 24.7, 26.6, 26.5, 23.9, 20.2, 16.1, 12.6],
    sade: [72, 71, 57, 38, 29, 10, 3, 5, 20, 38, 50, 70],
  },
  // Mittauspiste: Palermo.
  sisilia: {
    lat: 38.12,
    lon: 13.36,
    keskilampo: [11.3, 11.2, 13, 15.3, 19.2, 23.4, 26.2, 26.8, 23.5, 20.2, 16.1, 12.8],
    sade: [69, 72, 67, 59, 36, 15, 7, 19, 61, 81, 68, 72],
  },
  // Mittauspiste: Innsbruck.
  alpit: {
    lat: 47.27,
    lon: 11.39,
    keskilampo: [-1, 0.8, 4.6, 8.2, 12.9, 16.9, 18.7, 18.6, 14.6, 10.4, 4.5, 0],
    sade: [82, 77, 107, 113, 172, 194, 198, 201, 138, 117, 103, 91],
  },
  // Mittauspiste: Sanaa.
  sana: {
    lat: 15.4,
    lon: 44.21,
    keskilampo: [15.3, 16.8, 18, 19.5, 21.5, 22.7, 21.8, 21.3, 21.3, 17.8, 15.7, 14.9],
    sade: [8, 7, 31, 47, 21, 2, 19, 34, 1, 7, 3, 2],
  },
  // Mittauspiste: Aden.
  aden: {
    lat: 12.8,
    lon: 45.03,
    keskilampo: [24.2, 24.5, 26.1, 28.1, 30.3, 31.7, 32.1, 31.3, 30.8, 28.4, 26.4, 24.9],
    sade: [5, 3, 4, 8, 7, 8, 15, 38, 21, 10, 3, 3],
  },
  // Mittauspiste: Salala.
  salalah: {
    lat: 17.02,
    lon: 54.08,
    keskilampo: [21.4, 22.5, 25, 27.5, 28.8, 28.4, 26.4, 25.4, 26, 27.3, 25.9, 23.1],
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
    sade: [70, 63, 64, 42, 16, 1, 0, 0, 1, 19, 50, 62],
  },
};
