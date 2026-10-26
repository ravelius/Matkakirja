/*
 * MAIDEN HINTATASO PÄIVÄKULUIHIN (talouden vaihe 1, omistaja 27.9.2026 klo
 * 10.3x: päiväkulu 12 / 20 / 32 £; docs/raportit/talous-suunnitelma-20260927.md).
 *
 * Kolme porrasta: 'edullinen' (× 0,6), 'keski' (× 1,0, oletus) ja 'kallis'
 * (× 1,6). Avain on maailmankartan maatunnus (ISO3, pack.map.cityCountry).
 * Taulussa ovat vain poikkeukset — puuttuva maa on keskitasoa. Porras on
 * karkea arvio elinkustannuksista matkailijan näkökulmasta (ruoka + majoitus),
 * ei tarkka indeksi; Sisältökirjuri voi tarkentaa.
 *
 * TARKENNUS 27.9.2026 (Sisältökirjuri): laajennettu kattamaan kaikki pelin
 * kaupunkien maat (js/packs/*-countries.js, 122 ISO3-koodia). Menetelmä:
 * 1) BKT/asukas js/packs/linssi-maaluvut.js:stä (Maailmanpankki) karkeana
 *    kynnyksenä, kalibroituna nykyiseen tauluun (kallis-porras alkaa noin
 *    32 000 $:sta, KWT:n tasolta; edullinen-porras ulottuu noin 18 600 $:iin,
 *    TUR:n tasolle) — väliin jäävä BKT jätetään keskitasoksi.
 * 2) Kynnystä korjattu matkaoppaan 7 kaupungin "Hinnat"-tähtiarvion mukaan
 *    (js/packs/kulttuuri-kategoriat.js, matkailu.parasta[].mita==='Hinnat'):
 *    Sofia/BGR, Bukarest/ROU, Sarajevo/BIH, Riika/LVA ja Vilna/LTU ovat
 *    kaikki 3/3 tähteä (edullisin) vaikka BKT olisi kynnyksen rajoilla —
 *    näistä Viro/EST on lisätty samaan ryhmään Baltian naapurimaana, koska
 *    sen BKT vastaa Liettuan ennen-kalibrointia-arvoa eikä sille ole omaa
 *    poikkeavaa signaalia. Oslo/NOR oli jo kallis-taulussa (1/3 tähteä).
 * 3) Espanja ja Portugali jätetty keskitasoksi BKT-kynnyksestä huolimatta,
 *    koska molemmat toistuvat matkaoppaissa Länsi-Euroopan edullisimpina
 *    (mm. Granadan kohtaaminen: "hintataso selvästi matalampi kuin
 *    rannikon lomakohteissa" — Espanjan sisäinen hajonta on suurta, joten
 *    keskitaso on turvallisempi arvio kuin kallis). Sama koskee Keski-/
 *    Kaakkois-Euroopan BKT-rajatapauksia (CZE, SVN, HRV, HUN, POL, SVK),
 *    joita ei nosteta kallis-tasolle yksin BKT:n perusteella.
 * Data ei kata alueita joilta puuttuu BKT-luku (esim. FLK, GUF, NFK, TWN)
 * — ne jäävät keskitasoksi kunnes tarkempaa tietoa on.
 */
export const HINTATASOT = {
  // Kallis
  ARE: 'kallis', AUS: 'kallis', AUT: 'kallis', BEL: 'kallis', BMU: 'kallis', CAN: 'kallis',
  CHE: 'kallis', CYP: 'kallis', DEU: 'kallis', DNK: 'kallis', FIN: 'kallis', FRA: 'kallis',
  GBR: 'kallis', GRL: 'kallis', HKG: 'kallis', IRL: 'kallis', ISL: 'kallis', ITA: 'kallis',
  JPN: 'kallis', KOR: 'kallis', KWT: 'kallis', LUX: 'kallis', MLT: 'kallis', NLD: 'kallis',
  NOR: 'kallis', NZL: 'kallis', PRI: 'kallis', QAT: 'kallis', SAU: 'kallis', SGP: 'kallis',
  SWE: 'kallis', USA: 'kallis',
  // Edullinen
  AFG: 'edullinen', AGO: 'edullinen', ARG: 'edullinen', BGR: 'edullinen', BIH: 'edullinen', BOL: 'edullinen',
  BRA: 'edullinen', CHL: 'edullinen', CHN: 'edullinen', CMR: 'edullinen', COD: 'edullinen', COL: 'edullinen',
  CUB: 'edullinen', DZA: 'edullinen', ECU: 'edullinen', EGY: 'edullinen', EST: 'edullinen', ETH: 'edullinen',
  FJI: 'edullinen', GHA: 'edullinen', GTM: 'edullinen', IDN: 'edullinen', IND: 'edullinen', IRN: 'edullinen',
  IRQ: 'edullinen', JOR: 'edullinen', KAZ: 'edullinen', KEN: 'edullinen', LBR: 'edullinen', LBY: 'edullinen',
  LKA: 'edullinen', LTU: 'edullinen', LVA: 'edullinen', MAR: 'edullinen', MDG: 'edullinen', MEX: 'edullinen',
  MLI: 'edullinen', MMR: 'edullinen', MNG: 'edullinen', MOZ: 'edullinen', NAM: 'edullinen', NGA: 'edullinen',
  NIC: 'edullinen', NPL: 'edullinen', PAK: 'edullinen', PER: 'edullinen', PHL: 'edullinen', PNG: 'edullinen',
  PRY: 'edullinen', ROU: 'edullinen', RUS: 'edullinen', SDN: 'edullinen', SDS: 'edullinen', SEN: 'edullinen',
  SLB: 'edullinen', SLE: 'edullinen', SOM: 'edullinen', SYR: 'edullinen', TCD: 'edullinen', THA: 'edullinen',
  TLS: 'edullinen', TUN: 'edullinen', TUR: 'edullinen', TZA: 'edullinen', UGA: 'edullinen', UKR: 'edullinen',
  UZB: 'edullinen', VEN: 'edullinen', VNM: 'edullinen', VUT: 'edullinen', YEM: 'edullinen', ZAF: 'edullinen',
  ZWE: 'edullinen',
};
