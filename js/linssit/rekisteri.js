// Linssien rekisteri: yksi rivi per linssi, aakkosjärjestyksessä.
//
// Rivillä on vain kolme asiaa: tunnus, manner jonka laatan alta linssi
// löytyy, ja laiska tuonti. Kaikki muu (nimi, kuvake, kuvaus, lähde)
// asuu linssimoduulissa itsessään. Näin uuden linssin lisääminen on
// yhden rivin muutos yhteen tiedostoon, eivätkä kaksi samaan aikaan
// tehtyä linssiä osu samoihin riveihin.
//
// manner: null tarkoittaa, että linssi ansaitaan tietäjäpisteillä eikä
// laatan alta (ks. docs/moduulit/linssit.md luku 4).

/*
 * OHJE LINSSIN TEKIJÄLLE — LUE TÄMÄ ENNEN KUIN MUOKKAAT
 *
 * Kaikki yksitoista riviä ovat jo paikoillaan kommentoituna pois.
 * Kun oma linssisi on valmis, tee tähän tiedostoon TASAN YKSI muutos:
 *
 *     poista oman rivisi edestä kommenttimerkki `// `.
 *
 * ÄLÄ lisää rivejä, älä poista rivejä, älä järjestä uudelleen äläkä
 * koske taulukon alku- tai loppuriviin. Syy on käytännöllinen: noin
 * kymmenen tekijää muokkaa tätä tiedostoa yhtä aikaa, ja tämä on ainoa
 * tiedosto, johon he kaikki koskevat. Kun rivit ovat valmiiksi
 * paikoillaan omilla riveillään, kaksi rinnakkaista muutosta ei voi
 * osua samalle riville eikä yhdistämisristiriitaa synny.
 *
 * Kommentoitu rivi tarkoittaa "linssiä ei ole vielä olemassa". Moottori
 * (kerros.js) lukee vain tätä taulukkoa: se ei etsi tiedostoja levyltä,
 * joten kommentoitu rivi ei riko mitään eikä näy pelaajalle.
 *
 * Rivin avaamisen jälkeen tiedoston `js/linssit/<tunnus>.js` on
 * OLTAVA olemassa ja vietävä `LINSSI`-vakio, jossa on vähintään
 * tunnus, nimi, lyhyt, ikoni, laudat ja lahde — sekä piirra, jos
 * kerros ei ole false. Moottori tarkistaa sen ja heittää selkeän
 * virheen, jos jokin puuttuu.
 *
 * HIOMASSA (omistaja 21.9.2026, Raamatun loki "HIOMASSA-LINSSI JA
 * OPTIKON HYVITYS"): linssi voi olla pelissä palkkiona ENNEN kuin se
 * toimii. Silloin rivi on muotoa
 *
 *     { tunnus: 'yokartta', manner: null, tila: 'hiomassa',
 *       nimi: 'Yökartta', ikoni: 'assets/linssit/yokartta.png' },
 *
 * ilman `tuo`-tuontia: moottori (kerros.js haeLinssi) jättää sen pois
 * valikoimasta, mutta omistus (omistus.js) tuntee sen — laukku näyttää
 * sen harmaana "hiomassa optikolla" -ikonina, ja löytäjä saa
 * OPTIKON_HYVITYS puntaa. Kun linssi valmistuu, rivi vaihdetaan
 * tavalliseksi (tila pois, tuo mukaan): omistus on jo tallessa
 * (player.linssit + passileima), joten linssi herää käyttöön itsestään
 * — kerran nähtyä maailmaa ei oteta pois. `ikoni` on paikkavaraus
 * Codexin piirtämälle kuvakkeelle; ennen sitä laukku käyttää yhteistä
 * hiomassa-kuvaa (js/ui.js linssiLiuska).
 */
const IKONIKANSIO = 'assets/linssit/ikonit';
/** Hiomassa-rivi: tunnus, nimi ja ikoni (jos Codexin kuva on jo kansiossa). */
const hiomassa = (tunnus, nimi, ikoni = true) => ({
  tunnus, manner: null, tila: 'hiomassa', nimi,
  ...(ikoni ? { ikoni: `${IKONIKANSIO}/linssi-${tunnus}.webp` } : {}),
});
/** A. Tarinalinssit, aikajana (Codexin erä A, 20 − keksinnöt = 19). */
export const HIOMASSA_A = [
  hiomassa('kristinusko', 'Kristinusko leviää Eurooppaan'),
  hiomassa('uskonpuhdistus', 'Uskonpuhdistus'),
  hiomassa('tiede-ennen-hoyrya', 'Tiede ennen höyryä'),
  hiomassa('laaketiede', 'Lääketieteen läpimurrot'),
  hiomassa('vallankumoukset', 'Vallankumousten Eurooppa'),
  hiomassa('renessanssi', 'Renessanssi'),
  hiomassa('saveltajat', 'Säveltäjien Eurooppa'),
  hiomassa('kirjallisuus', 'Kirjallisuuden kaupungit'),
  hiomassa('hansa', 'Hansa'),
  hiomassa('kansallisvaltiot', 'Kansallisvaltiot syntyvät'),
  hiomassa('ilmailu', 'Ilmailun synty'),
  hiomassa('sahko-viestinta', 'Sähkö ja viestintä'),
  hiomassa('kartografia', 'Kartografia ja mittaaminen'),
  hiomassa('museot-kirjastot', 'Museot ja kirjastot'),
  hiomassa('raha-pankit', 'Raha ja pankit'),
  hiomassa('ruoka-juoma', 'Ruoan ja juoman historia'),
  hiomassa('urheilu', 'Urheilun synty'),
  hiomassa('posti', 'Posti ja sähkösanoma'),
  hiomassa('luostarit', 'Luostarit ja kirjat'),
];
/** B. Tarinalinssit, alueet (Codexin erä B, 17). */
export const HIOMASSA_B = [
  hiomassa('isoisan-linssi', 'Isoisän linssi 1873'),
  hiomassa('atlaslehti', 'Atlaslehti (Stieler 1875)'),
  hiomassa('napoleon', 'Napoleonin Eurooppa'),
  hiomassa('ensimmainen-maailmansota', 'Ensimmäinen maailmansota'),
  hiomassa('rooma', 'Rooman nousu ja tuho'),
  hiomassa('toinen-maailmansota', 'Toinen maailmansota'),
  hiomassa('kartta-uusiksi', 'Euroopan kartta uusiksi 1815–1923'),
  hiomassa('bysantti', 'Bysantti'),
  hiomassa('reconquista', 'Reconquista'),
  hiomassa('viikingit', 'Viikinkien maailma'),
  hiomassa('ruotsin-suurvalta', 'Ruotsin suurvalta ja Suomi'),
  hiomassa('balkanin-sodat', 'Balkanin sodat'),
  hiomassa('krimin-sota', 'Krimin sota'),
  hiomassa('kolmikymmenvuotinen-sota', 'Kolmikymmenvuotinen sota'),
  hiomassa('musta-surma', 'Musta surma'),
  hiomassa('rautatiet', 'Rautatieverkon kasvu'),
  hiomassa('kirjapaino', 'Kirjapainon leviäminen'),
];
/** C. Leikkilinssit (Codexin erä C, 6; Kellot ja Lippuarvaus valmistuivat → tavalliset rivit yllä). */
export const HIOMASSA_C = [
  hiomassa('yokartta', 'Yökartta'),
  hiomassa('tahdet', 'Tähtitaivas'),
  hiomassa('muuttolinnut', 'Muuttolinnut'),
  hiomassa('vuodenajat', 'Vuodenajat'),
];
/** D. Katselulinssit (Codexin erä D, 4). */
export const HIOMASSA_D = [
  hiomassa('ruoat', 'Maailman ruoat'),
  hiomassa('musiikki', 'Maailman musiikki'),
  hiomassa('elaimet', 'Maailman eläimet'),
  hiomassa('suurimmat-kaupungit', 'Suurimmat kaupungit'),
];
/** Koko hiomassa-sarja rekisteriin (44 riviä; keksinnöt, kellot ja lippuarvaus ovat valmiita). */
export const HIOMASSA_SARJA = [...HIOMASSA_A, ...HIOMASSA_B, ...HIOMASSA_C, ...HIOMASSA_D];

export const LINSSIT = [
  // { tunnus: 'historia',     manner: 'middleeast',    tuo: () => import('./historia.js') },
  { tunnus: 'ihmisen-matka', manner: null,           tuo: () => import('./ihmisen-matka.js') },
  // { tunnus: 'ilmasto',      manner: 'oceania',       tuo: () => import('./ilmasto.js') },
  // { tunnus: 'kielet',       manner: 'europe',        tuo: () => import('./kielet.js') },
  { tunnus: 'keksinnot',    manner: null,            tuo: () => import('./keksinnot.js') },
  // Kellot: linssisarjan ensimmäinen valmistunut leikkilinssi (21.9.2026).
  // `ikoni` jää riville, jotta laukku näyttää Codexin kuvan (js/ui.js linssiLiuska).
  { tunnus: 'kellot',       manner: null,            ikoni: 'assets/linssit/ikonit/linssi-kellot.webp', tuo: () => import('./kellot.js') },
  // Lippuarvaus: toinen leikkilinssi (21.9.2026).
  { tunnus: 'lippuarvaus',  manner: null,            ikoni: 'assets/linssit/ikonit/linssi-lippuarvaus.webp', tuo: () => import('./lippuarvaus.js') },
  { tunnus: 'pallo',        manner: null,            tuo: () => import('./pallo.js') },
  // { tunnus: 'leviaminen',   manner: 'africa',        tuo: () => import('./leviaminen.js') },
  // { tunnus: 'maaluvut',     manner: null,            tuo: () => import('./maaluvut.js') },
  // { tunnus: 'muuttoliike',  manner: null,            tuo: () => import('./muuttoliike.js') },
  { tunnus: 'radio',        manner: null,            tuo: () => import('./radio.js') },
  { tunnus: 'satelliitti',  manner: null,            tuo: () => import('./satelliitti.js') },
  // { tunnus: 'tahdet',       manner: null,            tuo: () => import('./tahdet.js') }, // hiomassa-rivi alla (C)
  { tunnus: 'topografia',   manner: 'southamerica',  tuo: () => import('./topografia.js') },
  // { tunnus: 'tuulet',       manner: 'asia',          tuo: () => import('./tuulet.js') },
  { tunnus: 'vertailu',     manner: null,            tuo: () => import('./vertailu.js') },
  { tunnus: 'maatiedot',    manner: null,            tuo: () => import('./maatiedot.js') },
  { tunnus: 'vesistot',     manner: null,            tuo: () => import('./vesistot.js') },
  // { tunnus: 'yokartta',     manner: 'northamerica',  tuo: () => import('./yokartta.js') }, // hiomassa-rivi alla (C)
  /*
   * LINSSISARJA HIOMASSA (omistaja 21.9.2026; Fablen tilaus Codexille
   * posti/fable-codexille-linssi-ikonit-20260921.md, kartoitus
   * docs/raportit/linssit-eurooppa-kartoitus-20260921.md). 47 linssiä
   * tulee peliin kaupunkien aarrepalkkioiksi ENNEN kuin ne toimivat:
   * laukku näyttää ne harmaana hiomassa-ikonina (css grayscale), löytäjä
   * saa optikon hyvityksen, ja linssi herää kun rivi vaihdetaan
   * tavalliseksi. Tunnus = Codexin tiedostonimi ilman linssi-etuliitettä;
   * ikoni assets/linssit/ikonit/linssi-<tunnus>.webp (Fablen päätös
   * 21.9.2026: repoon vain webp ≤ 192 px, laatu 85 — 96 px:n kortti
   * @2; Codexin 512 px:n PNG-alkuperäiset jäävät toimituskansioon
   * ~/Documents/Codex/<pvm>/linssi-ikonit/, eivät repoon; yhteinen
   * messinkikehys linssi-kehys.webp).
   * Keksinnöt (B1), Kellot ja Lippuarvaus (C) ovat valmiita linssejä
   * (rivit yllä) eivätkä toistu tässä.
   * Kaupunki → tunnus -kytkentä on aarreluettelossa (Sisältökirjuri,
   * js/linssit/aarteet.js LINSSIAARTEET), ei tässä.
   */
  ...HIOMASSA_SARJA,
];

