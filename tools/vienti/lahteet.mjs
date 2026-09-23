/*
 * VIENNIN LÄHTEET js/packs/-kansion ULKOPUOLELTA (inventaario 23.9.2026,
 * docs/raportit/sisallon-siirtoputki-20260923.md).
 *
 * js/packs/*.js viedään aina kokonaan: vie-sisalto.mjs listaa kansion,
 * joten uusi pack tulee mukaan ilman muutosta tähän.
 *
 * Muualta viedään vain NIMETYT exportit: niissä moduuleissa sisältö asuu
 * piirto- ja pelikoodin vieressä, ja koko nimiavaruus toisi mukaan satoja
 * funktioita. Jokainen rivi on inventaariossa todettu sisältödataksi, ja
 * kaikki latautuvat Nodessa samassa prosessissa ilman selainta.
 *
 * luokka:
 *   peli      pelin sisältöä tai sääntödataa
 *   linssi    linssien sisältö; LINSSI-olioissa on myös funktioita, jotka
 *             kulkevat { $funktio }-merkintöinä
 *   johdettu  ajon aikana packeista koottu näkymä (toistoa, mutta valmiina
 *             hakemistona tuojalle helpompi)
 *   kehittaja työhuoneen data; KAARI_PAKETIT on silti tarinakaaren
 *             kaanoninen lähde (69 kohdetta, TARINAKAARI suodattaa 42)
 *
 * Sisältö, joka asuu moduulin SISÄISESSÄ muuttujassa (ei exporttia), ei
 * näy tälle työkalulle — raportin "ei mekaaniset" -lista.
 */
const m = (moduuli, exportit, luokka = 'peli') => ({ moduuli, exportit, luokka });

export const LISAMODUULIT = [
  m('js/kohtaamiskuvat-data.js', ['kohtaamiskuvat', 'KOHTAAMIS_R2_JUURI']),
  m('js/isoisan-valokuvat.js', ['ISOISAN_VALOKUVAT', 'ISOISAN_KUVAJUURI']),
  m('js/tietajatasot.js', ['TIETAJATASOT']),
  m('js/etusivupallo.js', ['ETUSIVUN_KUVAKIERTO', 'ETUSIVUN_REITTI']),
  m('js/livia.js', ['LIVIAN_AVAUS']),
  m('js/pollo.js', ['LIVIAN_MIETINNAT', 'POLLO_AARRE']),
  m('js/game.js', ['ASKERS', 'MANNER_NIMET', 'FORM_WEIGHTS']),
  m('js/tokens.js', ['TOKEN_TYPES']),
  // Matkustuksen hinnat (laiva, lento, bussi); skeema 1.4 kokoaa ne ja
  // game.js:n vakiot kokoelmaan saannot (tools/vienti/kokoelmat.mjs).
  m('js/rules.js', ['SEA_FEE', 'FLIGHT_PRICE', 'BUS_FARE']),
  m('js/sisaltotaulut.js', ['SAAPUMISLUENNAT', 'HAVAINTOLUENNAT', 'LAUTA_TUNNUSLUVUT', 'EI_VALOKUVAKYSYMYKSEEN']),
  m('js/livia-tilanteet.js', ['LIVIAN_TUNTEET', 'LIVIAN_PUHEMERKITYKSET']),
  m('js/livia-pilotti-cuet.js', ['LIVIAN_LUENTA_CUET', 'LIVIAN_LUENTAKAUPUNGIT']),
  m('js/liviapuhe.js', ['LIVIAN_AANIJUURI', 'LIVIAN_AANILAHTEET', 'LIVIAN_KAUPUNKILAHTEET', 'LIVIAN_AANITETYT',
    'LIVIAN_AANIERAT', 'LIVIAN_KESTOT', 'LIVIAN_VERSIOIDUT_AANET', 'LIVIAN_AANITETTY_PALJASTUS']),
  m('js/media.js', ['AANI_JUURI', 'ASSET_KANSIOT', 'R2_ASSETIT', 'HORATIO_TUOTANTO', 'VERSIOIDUT_HORATIO_AANET', 'UUSITUT_AANET']),
  m('js/fokusnosto-symbolit.js', ['NOSTOSYM_LUOKAT', 'NOSTOSYM_PAAKATEGORIAT', 'NOSTOSYM_TYYPIT', 'NOSTOSYM_PISTE_VARIT']),
  m('js/karttaselite.js', ['KARTTASELITE_JARJESTYS', 'KARTTASELITE_KOKONIMET']),
  m('js/kaupunkimusiikki.js', ['ALUERAIDAT', 'ALUEEN_MAAT']),
  m('js/aani-ehdokkaat.js', ['EHDOKKAAT', 'TYYPPI_EHDOKKAAT', 'KAUPUNKI_EHDOKKAAT', 'TYYPPI_NIMET', 'KAUPUNGIT_TYYPEITTAIN', 'HUUDAHDUKSET']),
  m('js/viitekuva-herot.js', ['VIITEKUVA_HEROT']),
  m('js/lahteet.js', ['LAHTEET', 'PELI']),
  m('js/karttatyokalu-maakunnat.js', ['MAAKUNTIEN_NIMET', 'MAAKUNTIEN_MAAT']),
  m('js/tyohuone-musiikki.js', ['MUSIIKKISIVUN_RAIDAT', 'SFX_NIMET']),
  m('js/fokuskohteet.js', ['KOHDE_MAAT'], 'johdettu'),
  m('js/linssit/astronaut-kysymykset.js', ['ASTRONAUTIN_KYSYMYKSET'], 'linssi'),
  m('js/linssit/ihmisen-matka-data.js', ['IHMISEN_MATKA', 'IHMISEN_MATKA_LISANOSTOT', 'IHMISEN_MATKA_KYSYMYKSET'], 'linssi'),
  m('js/linssit/ihmisen-matka-kertomus.js', ['IHMISEN_MATKA_KERTOMUS'], 'linssi'),
  m('js/linssit/ihmisen-matka-kysymykset.js', ['IHMISEN_MATKAN_KYSYMYKSET'], 'linssi'),
  m('js/linssit/ihmisen-matka-virrat.js', ['IHMISEN_MATKA_VIRRAT', 'IHMISEN_MATKA_RETKI', 'IHMISEN_MATKA_VANHA', 'IHMISEN_MATKA_VANAT'], 'linssi'),
  m('js/linssit/ihmisen-matka.js', ['LINSSI', 'ESITYKSEN_KUVAT', 'ALOITUKSEN_TAUSTAKUVAT'], 'linssi'),
  m('js/linssit/keksinnot.js', ['KEKSINNOT', 'LINSSI'], 'linssi'),
  m('js/linssit/satelliitti-data.js', ['SATELLIITTI_KOHTEET', 'SATELLIITTI_LAHDE'], 'linssi'),
  m('js/linssit/satelliitti.js', ['LINSSI'], 'linssi'),
  m('js/linssit/pallo.js', ['LINSSI'], 'linssi'),
  m('js/linssit/radio.js', ['LINSSI'], 'linssi'),
  m('js/linssit/topografia.js', ['LINSSI'], 'linssi'),
  m('js/linssit/vertailu.js', ['LINSSI'], 'linssi'),
  m('js/linssit/maatiedot.js', ['LINSSI'], 'linssi'),
  m('js/linssit/vesistot.js', ['LINSSI'], 'linssi'),
  m('js/tyohuone-kehitys-data.js', ['KAARI_PAKETIT'], 'kehittaja'),
];

/** Valmiit JSON-aineistot, jotka kopioidaan vientiin sellaisenaan. */
export const LISATIEDOSTOT = [
  'assets/data/maakayrat.json',
  'assets/data/maapolygonit.json',
];
