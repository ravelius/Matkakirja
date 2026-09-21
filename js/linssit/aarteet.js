/*
 * LINSSIT KAUPUNKIEN AARREPALKKIOIKSI (omistaja 21.9.2026; Raamatun loki
 * "HIOMASSA-LINSSI JA OPTIKON HYVITYS: MEKANIIKKA HYVAKSYTTY" ja
 * "LINSSIT AARREPALKKIOIKSI: RENGAS 1 JA IKONITILAUS").
 *
 * Historialinssi voi olla kaupungin ISON paikallisaarteen kylkiäinen:
 * aarteen raha maksetaan kuten ennenkin, ja lisäksi pelaaja saa
 * linssin (js/linssit/omistus.js myonna). Pieni aarre ei koskaan anna
 * linssiä. Toisella pelikerralla linssi on jo passissa, ja aarre on
 * tavallinen iso aarre.
 *
 * RENGAS 1: 21 KAUPUNKI→LINSSI-MAPPAUSTA (21.9.2026). Omistajan
 * päätös: 22 linssiä ensimmäiseen sarjaan (kartoituksen renkaan 1
 * kaksitoista tarinalinssiä + 6 leikkilinssiä + 4 katselulinssiä),
 * mutta Isoisän linssi 1873 (Q1) EI ole aarre — se on tarinan lahja
 * isoisän matkakirjan mukana (Pelikoodarin erä, avautuu muualla), joten
 * tässä taulussa on 21 riviä. Lähde: docs/raportit/
 * linssit-eurooppa-kartoitus-20260921.md (ankkurikaupungit). Avain on
 * pelilaudan kaupunki-id (js/packs/europe.js EU_CITIES, sama kuin
 * EUROPE_CITY_COUNTRY-taulun avaimet).
 *
 * KOLME KAUPUNKIA (Pariisi, Berliini, Rooma) KANTOI KARTOITUKSESSA
 * KAKSI RENKAAN 1 TARINALINSSIÄ, mutta taulu on yksi linssi per
 * kaupunki (iso aarre paljastuu kaupungissa kerran). Pelikoodarin
 * ohje 21.9.2026: ylimääräinen linssi toiselle kaupungille, mikä
 * tahansa jako kelpaa mekaniikalle. Ratkaisu: Rooma pitää
 * kristinuskon (alkuperäisin ankkuri), "Rooman nousu ja tuho" siirtyi
 * Venetsiaan; Pariisi pitää vallankumoukset, Napoleon siirtyi
 * Marseilleen; Berliini pitää uskonpuhdistuksen (Wittenberg, DEU-
 * laudalla eikä oma kaupunki-id), Atlaslehti (Stieler 1875, Gotha)
 * siirtyi Amsterdamiin — perusteltu valinta, koska Amsterdam oli itse
 * 1600-luvun kulta-ajan karttakustantamisen (Blaeu) keskus.
 *
 * LOPUT 10 KAUPUNKIA (6 leikki + 4 katselu) valittu vapaasti muista
 * Euroopan-laudan kaupungeista, löyhällä aihevalinnalla siellä missä
 * luontevaa (Tromssa/Tähtitaivas, Praha/Kellot — kaupungin oma
 * tähtitieteellinen kello, Sevilla/Muuttolinnut — lähellä Doñanan
 * kosteikkoa). Rivien JÄRJESTYS objektissa vuorottelee raskaan
 * (tarinalinssi) ja kevyen (leikki/katselu) välillä, kuten omistaja
 * pyysi aarreluettelolle — järjestyksellä ei ole merkitystä
 * mekaniikalle, vain dokumentoi tarkoituksen.
 *
 * Jokainen tunnus on rekisterissä (js/linssit/rekisteri.js LINSSIT)
 * joko valmiina ('keksinnot') tai `tila: 'hiomassa'` -rivinä; testit ja
 * savuke voivat yhä antaa oman taulunsa parametrina.
 */

/** Ankkurikaupunki → linssin tunnus. */
export const LINSSIAARTEET = {
  lontoo: 'keksinnot',
  istanbul: 'yokartta',
  rooma: 'kristinusko',
  tromssa: 'tahdet',
  berliini: 'uskonpuhdistus',
  sevilla: 'muuttolinnut',
  krakova: 'tiede-ennen-hoyrya',
  praha: 'kellot',
  budapest: 'laaketiede',
  bryssel: 'lippuarvaus',
  pariisi: 'vallankumoukset',
  tallinna: 'vuodenajat',
  firenze: 'renessanssi',
  barcelona: 'ruoat',
  amsterdam: 'atlaslehti',
  wien: 'musiikki',
  marseille: 'napoleon',
  kreeta: 'elaimet',
  sarajevo: 'ensimmainen-maailmansota',
  moskova: 'suurimmat-kaupungit',
  venetsia: 'rooma',
};

/**
 * Mikä linssi kuuluu tämän kaupungin aarteeseen. Vain iso
 * paikallisaarre antaa linssin.
 *
 * @param {string} cityId
 * @param {string} type   laattatyyppi (js/tokens.js)
 * @param {object} [taulu] testeille
 * @returns {string|null}
 */
export function linssiAarteesta(cityId, type, taulu = LINSSIAARTEET) {
  if (type !== 'isoAarre' || !cityId) return null;
  return taulu?.[cityId] ?? null;
}
