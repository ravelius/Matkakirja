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
