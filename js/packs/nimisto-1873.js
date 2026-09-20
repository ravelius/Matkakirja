// NIMISTÖ 1873 — atlastyyliset nimiöt uusintapolttoon (omistajan
// päätös 20.9.2026): vuoden 1873 tilanteen mukaiset historialliset
// maakunnat ja Euroopan meret/lahdet/salmet, harvennetuin kapiteelein
// poltettavaksi kartalle samaan tapaan kuin nykyiset maastonimet.
//
// KAANONTARKKUUS: nimet ja rajat ovat isoisän matkan ajalta (1873),
// EIVÄT nykyisiä — esim. Elsass-Lothringen on Saksan puolella
// (Frankfurtin rauha 1871, osa Saksan keisarikuntaa vuoteen 1918
// asti), Savoiji on Ranskan puolella (liitetty 1860, siis jo Ranskaa
// 1873), eikä nykyisiä valtioita kuten Itävalta-Unkari tai Osmanien
// Balkan ole vielä eritelty tähän erään (tulossa myöhemmässä erässä
// muun Euroopan mukana).
//
// NIMET OVAT SUOMALAISITTAIN VAKIINTUNEITA (Fablen korjaus
// 20.9.2026), kuten pelin muu nimistö: Korsika (ei Corse), Burgundi
// (Bourgogne), Flanderi (Flandre), Normandia (Normandie), Savoiji
// (Savoie), Nizzan kreivikunta (Comté de Nice). Elsass-Lothringen
// jää saksalaisittain, koska se OLI Saksaa 1873 — ei suomenneta
// ranskalaisittain (Alsace-Lothringen) eikä nykyranskaksi.
//
// KOORDINAATIT ovat NIMIÖN KESKIPISTE (lon/lat), ei aluerajaus:
// maakunnilla suunnilleen alueen painopiste, merillä/lahdilla/
// salmilla avoveden kohta niin, ettei nimiö osu rantaviivan tai
// naapurinimiön päälle. Ei tarkistettu tietokoneellisesti kartalta —
// Karttaseppä tarkistaa visuaalisesti koelaatalla ja siirtää
// tarvittaessa (sama vapaus kuin muillakin nimiöillä).
//
// KOKOLUOKKA (`koko`, Fablen tilaus 20.9.2026 ilta): 'suuri' näkyy jo
// kaukozoomilla (z5–z6), 'pieni' vasta lähempänä (z7+). Vain
// maakunnilla — merillä ei kokoluokkaa (ne näkyvät aina, koko
// laskettu erikseen tarvittaessa). Omistajan nimeämät esimerkit
// (Bretagne, Normandia, Provence, Languedoc, Burgundi, Gascogne,
// Auvergne, Champagne, Elsass-Lothringen, Korsika = suuri; Aunis,
// Foix, Béarn, Roussillon, Nivernais, Artois, Touraine, Saintonge,
// Nizzan kreivikunta = pieni) on merkitty sellaisenaan; loput on
// luokiteltu tämän kirjoittajan arviolla maakunnan todellisesta
// pinta-alasta — Karttaseppä/Fable voi siirtää tarvittaessa.
//
// LÄHTEET: Ranskan maakuntajako ja Elsass-Lothringenin asema
// en-Wikipedia "Provinces of France" ja "Alsace-Lorraine" (johdanto-
// osat); Euroopan merten/lahtien/salmien nimet ja suomenkieliset
// vastineet en-/fi-Wikipedian omilta artikkeleiltaan (Vienanmeri:
// fi-Wikipedia "Vienanmeri" — sama vesialue kuin en-Wikipedian
// "White Sea", suomeksi ei käytetä suoraa käännöstä). Tarkistettu
// 20.9.2026.
//
// MUOTO sovittu Karttasepän kanssa (pilottilista lähetetty viestinä
// 20.9.2026): { teksti, luokka, lon, lat, iso, koko?, kulma? }.
// `luokka` on 'maakunta' historiallisille alueille ja 'meri' kaikille
// vesille (meri/lahti/salmi eivät eriydy omiksi luokikseen tässä
// koneellisessa muodossa — sanallinen jako docs/sisalto/
// nimisto-1873.md:n taulukoissa). `iso` on maakunnan omistaja vuonna
// 1873 (FRA/DEU/...), tai null merille. `koko` on 'suuri'/'pieni'
// maakunnille (ks. yllä), puuttuu meriltä. `kulma` (asteina) on
// valinnainen kiertoparametri — ei käytetty tässä erässä.

export const NIMISTO_1873 = [
  // ── RANSKAN HISTORIALLISET MAAKUNNAT 1873 ────────────────────────
  {
    teksti: 'BRETAGNE', luokka: 'maakunta', lon: -3.0, lat: 48.2, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'NORMANDIA', luokka: 'maakunta', lon: 0.5, lat: 49.1, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'PICARDIE', luokka: 'maakunta', lon: 2.6, lat: 49.8, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'ARTOIS', luokka: 'maakunta', lon: 2.3, lat: 50.4, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'FLANDERI', luokka: 'maakunta', lon: 2.7, lat: 50.8, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'ÎLE-DE-FRANCE', luokka: 'maakunta', lon: 2.5, lat: 48.9, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'CHAMPAGNE', luokka: 'maakunta', lon: 4.5, lat: 48.9, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'LORRAINE', luokka: 'maakunta', lon: 6.0, lat: 48.9, iso: 'FRA', koko: 'suuri',
  },
  /*
   * ELSASS-LOTHRINGEN ON SAKSAA 1873: Frankfurtin rauha (10.5.1871)
   * luovutti Alsacen ja Itä-Lothringenin Saksan keisarikunnalle
   * omana Reichslandina (ei osavaltiona) vuoteen 1918 asti. Iso on
   * siis DEU, ei FRA — kaanontarkkuuden ydinkohta tässä erässä.
   * Nimi pysyy saksalaisittain, koska alue OLI Saksaa 1873.
   */
  {
    teksti: 'ELSASS-LOTHRINGEN', luokka: 'maakunta', lon: 7.3, lat: 48.5, iso: 'DEU', koko: 'suuri',
  },
  {
    teksti: 'BURGUNDI', luokka: 'maakunta', lon: 4.6, lat: 47.2, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'FRANCHE-COMTÉ', luokka: 'maakunta', lon: 6.1, lat: 47.1, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'ORLÉANAIS', luokka: 'maakunta', lon: 1.9, lat: 47.9, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'ANJOU', luokka: 'maakunta', lon: -0.5, lat: 47.4, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'TOURAINE', luokka: 'maakunta', lon: 0.8, lat: 47.3, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'POITOU', luokka: 'maakunta', lon: -0.5, lat: 46.6, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'AUNIS', luokka: 'maakunta', lon: -1.1, lat: 46.1, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'SAINTONGE', luokka: 'maakunta', lon: -0.6, lat: 45.7, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'BERRY', luokka: 'maakunta', lon: 2.1, lat: 46.8, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'NIVERNAIS', luokka: 'maakunta', lon: 3.4, lat: 47.1, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'AUVERGNE', luokka: 'maakunta', lon: 3.0, lat: 45.5, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'LIMOUSIN', luokka: 'maakunta', lon: 1.5, lat: 45.8, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'GUYENNE', luokka: 'maakunta', lon: -0.2, lat: 44.7, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'GASCOGNE', luokka: 'maakunta', lon: 0.2, lat: 43.7, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'BÉARN', luokka: 'maakunta', lon: -0.4, lat: 43.3, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'FOIX', luokka: 'maakunta', lon: 1.6, lat: 42.9, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'ROUSSILLON', luokka: 'maakunta', lon: 2.7, lat: 42.6, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'LANGUEDOC', luokka: 'maakunta', lon: 2.6, lat: 43.7, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'PROVENCE', luokka: 'maakunta', lon: 6.1, lat: 43.7, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'NIZZAN KREIVIKUNTA', luokka: 'maakunta', lon: 7.3, lat: 43.9, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'DAUPHINÉ', luokka: 'maakunta', lon: 5.7, lat: 45.0, iso: 'FRA', koko: 'suuri',
  },
  {
    teksti: 'SAVOIJI', luokka: 'maakunta', lon: 6.5, lat: 45.6, iso: 'FRA', koko: 'pieni',
  },
  {
    teksti: 'KORSIKA', luokka: 'maakunta', lon: 9.1, lat: 42.2, iso: 'FRA', koko: 'suuri',
  },

  // ── ESPANJAN HISTORIALLISET MAAKUNNAT/KUNINGASKUNNAT 1873 ──────────
  //
  // LUONNOS (ei vielä liitetty NIMISTO_1873-taulukkoon) — liitetään
  // Ranskan lohkon jälkeen samalla schemalla: { teksti, luokka, lon,
  // lat, iso, koko }.
  //
  // LÄHDE JA KAANONTARKKUUS: 1800-luvun historialliset alue-/
  // kuningaskuntanimet (ei vuoden 1833 Javier de Burgosin 49
  // provinssia, ei nykyisiä 17 itsehallintoaluetta). en-Wikipedia
  // "Old Castile", "New Castile", "Kingdom of León", "Kingdom of
  // Asturias", "Basque Provinces" ja "Provinces of Spain" (johdanto-
  // osat); Finnish-nimet tarkistettu fi-Wikipediasta (Vanha-Kastilia,
  // Kantabria, Baleaarit, Asturia, Baskimaa) 21.9.2026.
  //
  // KOLME HARKINNANVARAISTA PÄÄTÖSTÄ (Karttaseppä/Fable, tarkistakaa):
  // 1) BASKIMAA on yksi nimiö kolmen baskimaakunnan (Vizcaya,
  //    Guipúzcoa, Álava — "Provincias Vascongadas") sijaan, samaan
  //    tapaan kuin Ranskan erässä isommat kulttuurialueet saivat yhden
  //    nimiön pienempien seutujen sijaan. Jos Karttaseppä haluaa kolme
  //    erillistä pientä nimiötä, ne on helppo pilkkoa tästä.
  // 2) KANTABRIA (Santander) on ERILLINEN nimiö Vanha-Kastiliasta,
  //    vaikka vuoden 1833 hallinnollinen jako laski Santanderin
  //    maakunnan osaksi Vanha-Kastiliaa (näin myös fi-Wikipedian
  //    "Vanha-Kastilia"-artikkeli). Perustelu: Kantabria oli omana
  //    rantaviivan seutunaan ("La Montaña") kulttuurisesti erottuva jo
  //    ennen 1833-jakoa, ja atlastyylisessä nimistössä rannikkokaistale
  //    ansaitsee oman nimiönsä kuten Ranskan Bretagne/Normandia. TÄMÄ
  //    ON TULKINTA — vaihtoehto olisi jättää Kantabria pois ja laajentaa
  //    Vanha-Kastilian aluetta rannikolle asti.
  // 3) LEÓN on ERILLINEN nimiö Vanha-Kastiliasta (oma kuningaskunta
  //    ennen v. 1230 liittoa Kastiliaan, ja seutu tunnettiin omana
  //    kulttuurialueenaan yhä 1800-luvulla) — ei sulautettu Vanha-
  //    Kastiliaan.
  //
  // KOKOLUOKKA (koko): suuret (Galicia, Aragonia, Katalonia, Valencia,
  // Vanha-Kastilia, Uusi-Kastilia, León, Extremadura, Andalusia) ovat
  // pinta-alaltaan selvästi suurempia kuin pienet (Asturia, Kantabria,
  // Baskimaa, Navarra, Murcia, Baleaarit, Kanariansaaret) — arvio tämän
  // kirjoittajan, ei koneellisesti mitattu, samaan tapaan kuin Ranskan
  // erässä.
  //
  // KOORDINAATIT ovat karkeita painopisteitä (ei aluerajausta), samalla
  // tarkkuudella kuin Ranskan erässä — Karttaseppä siirtää tarvittaessa
  // koelaatan perusteella.

    {
      teksti: 'GALICIA', luokka: 'maakunta', lon: -8.0, lat: 42.8, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'ASTURIA', luokka: 'maakunta', lon: -6.0, lat: 43.2, iso: 'ESP', koko: 'pieni',
    },
    {
      teksti: 'KANTABRIA', luokka: 'maakunta', lon: -4.0, lat: 43.2, iso: 'ESP', koko: 'pieni',
    },
    /*
     * BASKIMAA = "Provincias Vascongadas" (Vizcaya, Guipúzcoa, Álava)
     * yhtenä nimiönä — ks. tiedoston yläreunan perustelu (1).
     */
    {
      teksti: 'BASKIMAA', luokka: 'maakunta', lon: -2.6, lat: 43.0, iso: 'ESP', koko: 'pieni',
    },
    {
      teksti: 'NAVARRA', luokka: 'maakunta', lon: -1.6, lat: 42.7, iso: 'ESP', koko: 'pieni',
    },
    {
      teksti: 'ARAGONIA', luokka: 'maakunta', lon: -0.5, lat: 41.5, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'KATALONIA', luokka: 'maakunta', lon: 1.5, lat: 41.8, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'VALENCIA', luokka: 'maakunta', lon: -0.4, lat: 39.5, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'MURCIA', luokka: 'maakunta', lon: -1.5, lat: 38.0, iso: 'ESP', koko: 'pieni',
    },
    {
      teksti: 'VANHA-KASTILIA', luokka: 'maakunta', lon: -4.0, lat: 41.8, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'UUSI-KASTILIA', luokka: 'maakunta', lon: -3.5, lat: 39.8, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'LEÓN', luokka: 'maakunta', lon: -5.8, lat: 41.8, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'EXTREMADURA', luokka: 'maakunta', lon: -6.2, lat: 39.2, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'ANDALUSIA', luokka: 'maakunta', lon: -4.5, lat: 37.5, iso: 'ESP', koko: 'suuri',
    },
    {
      teksti: 'BALEAARIT', luokka: 'maakunta', lon: 2.9, lat: 39.5, iso: 'ESP', koko: 'pieni',
    },
    {
      teksti: 'KANARIANSAARET', luokka: 'maakunta', lon: -15.6, lat: 28.3, iso: 'ESP', koko: 'pieni',
    },

  // ── EUROOPAN MERET, LAHDET JA SALMET ─────────────────────────────
  { teksti: 'VÄLIMERI', luokka: 'meri', lon: 15.0, lat: 38.0, iso: null },
  { teksti: 'ITÄMERI', luokka: 'meri', lon: 19.0, lat: 58.0, iso: null },
  { teksti: 'POHJANMERI', luokka: 'meri', lon: 3.0, lat: 56.0, iso: null },
  { teksti: 'NORJANMERI', luokka: 'meri', lon: 2.0, lat: 68.0, iso: null },
  { teksti: 'BARENTSINMERI', luokka: 'meri', lon: 40.0, lat: 74.0, iso: null },
  /* Fablen korjaus: en-Wikipedian "White Sea" on suomeksi Vienanmeri, ei Valkoinenmeri. */
  { teksti: 'VIENANMERI', luokka: 'meri', lon: 38.0, lat: 65.5, iso: null },
  { teksti: 'MUSTAMERI', luokka: 'meri', lon: 34.0, lat: 43.5, iso: null },
  { teksti: 'ASOVANMERI', luokka: 'meri', lon: 37.0, lat: 46.5, iso: null },
  { teksti: 'EGEANMERI', luokka: 'meri', lon: 25.0, lat: 38.5, iso: null },
  { teksti: 'MARMARANMERI', luokka: 'meri', lon: 28.0, lat: 40.7, iso: null },
  { teksti: 'JOONIANMERI', luokka: 'meri', lon: 19.0, lat: 38.0, iso: null },
  { teksti: 'TYRRHENANMERI', luokka: 'meri', lon: 12.0, lat: 40.0, iso: null },
  { teksti: 'ADRIANMERI', luokka: 'meri', lon: 15.5, lat: 43.0, iso: null },
  { teksti: 'LIGURIANMERI', luokka: 'meri', lon: 8.7, lat: 43.4, iso: null },
  { teksti: 'KELTIENMERI', luokka: 'meri', lon: -8.0, lat: 50.0, iso: null },
  { teksti: 'IRLANNINMERI', luokka: 'meri', lon: -5.0, lat: 53.5, iso: null },
  { teksti: 'BISKAJANLAHTI', luokka: 'meri', lon: -4.5, lat: 45.5, iso: null },
  { teksti: 'LIONINLAHTI', luokka: 'meri', lon: 4.0, lat: 42.8, iso: null },
  { teksti: 'POHJANLAHTI', luokka: 'meri', lon: 20.0, lat: 63.0, iso: null },
  { teksti: 'SUOMENLAHTI', luokka: 'meri', lon: 26.0, lat: 59.8, iso: null },
  { teksti: 'RIIANLAHTI', luokka: 'meri', lon: 23.5, lat: 57.5, iso: null },
  { teksti: 'ENGLANNIN KANAALI', luokka: 'meri', lon: -2.0, lat: 49.8, iso: null },
  { teksti: 'SKAGERRAK', luokka: 'meri', lon: 8.5, lat: 57.8, iso: null },
  { teksti: 'GIBRALTARINSALMI', luokka: 'meri', lon: -5.6, lat: 35.95, iso: null },
  { teksti: 'BOSPORINSALMI', luokka: 'meri', lon: 29.0, lat: 41.1, iso: null },
  { teksti: 'DARDANELLIT', luokka: 'meri', lon: 26.4, lat: 40.2, iso: null },
  { teksti: 'JUUTINRAUMA', luokka: 'meri', lon: 12.7, lat: 55.7, iso: null },
  { teksti: 'KATTEGAT', luokka: 'meri', lon: 11.5, lat: 57.0, iso: null },
  { teksti: 'MESSINANSALMI', luokka: 'meri', lon: 15.6, lat: 38.2, iso: null },
];
