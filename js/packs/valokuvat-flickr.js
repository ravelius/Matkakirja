/*
 * FLICKR-VALOKUVIEN LÄHDETAULU.
 *
 * Pelin kuvamalli lepää Commonsin tiedostonimen varassa: `tiedosto:`
 * on avain, josta lasketaan sekä peilin polku että alkuperäinen
 * osoite (js/packs/africa-valokuvat.js: valokuvaUrl). Flickr-kuvaa ei
 * ole Commonsissa, joten sille ei voi laskea kumpaakaan — ilman tätä
 * taulua peili ja varareitti osoittaisivat 404:ään ja peilaustyökalu
 * hakisi joka ajolla kuvaa, jota ei ole olemassa.
 *
 * Siksi Flickr-kuvat kulkevat eri reittiä kuin Commons-kuvat:
 *
 *   1. Repon oma kopio (assets/valokuvat, 1024 px) on ENSISIJAINEN
 *      lähde — ei siis vain nopeutta varten kuten Commons-kuvilla.
 *      Kuva on repossa ja Pagesissa, joten se on saatavilla silloinkin
 *      kun Flickr ei vastaa (omistajan vaatimus: peli ei saa mennä
 *      rikki, jos ulkopuolinen palvelin kaatuu). Näitä EI peilata
 *      ämpäriin: peili on ulkopuolisen aineiston kopio, ja tämä
 *      aineisto on jo talon sisällä.
 *   2. Flickrin oma kokoversio jää varareitiksi ja suurennokseksi
 *      (`_b` = 1024 px, `_h` = 1600 px). Alkuperäinen `_o` voi olla
 *      6000 px ja useita megatavuja — sitä ei pyydetä koskaan.
 *
 * Tekijä ja lisenssi näkyvät pelaajalle noston `lahde`-rivillä
 * muodossa `Tekijä, Flickr (LISENSSI)`. Ne ja kuvan Flickr-sivu ovat
 * tässä taulussa toistamiseen samasta syystä kuin peilin manifestissa:
 * lähdemaininta ei saa jäädä yhden tiedoston varaan.
 *
 * Lisenssi on varmistettu kuvakohtaisesti flickr.photos.getInfo-
 * kutsulla (tools/hae-flickr.mjs) ennen latausta, ja jokainen kuva on
 * katsottu silmin ennen lehteen liittämistä.
 */
export const VALOKUVAT_FLICKR = new Map([
  // Tampere (18.8.2026)
  ['flickr-16744724023.jpg', { osoite: 'https://live.staticflickr.com/65535/16744724023_1c21fb54dc', sivu: 'https://www.flickr.com/photos/franganillo/16744724023', tekija: 'Jorge Franganillo', lisenssi: 'CC BY 2.0' }],
  ['flickr-17157572177.jpg', { osoite: 'https://live.staticflickr.com/65535/17157572177_f415b88da2', sivu: 'https://www.flickr.com/photos/franganillo/17157572177', tekija: 'Jorge Franganillo', lisenssi: 'CC BY 2.0' }],
  ['flickr-17339041906.jpg', { osoite: 'https://live.staticflickr.com/8871/17339041906_45b4c3c3a3', sivu: 'https://www.flickr.com/photos/franganillo/17339041906', tekija: 'Jorge Franganillo', lisenssi: 'CC BY 2.0' }],
  ['flickr-52302493222.jpg', { osoite: 'https://live.staticflickr.com/65535/52302493222_ec8cf93cf6', sivu: 'https://www.flickr.com/photos/ninara/52302493222', tekija: 'Ninara', lisenssi: 'CC BY 2.0' }],
  ['flickr-52303472931.jpg', { osoite: 'https://live.staticflickr.com/65535/52303472931_cbf0fa07e1', sivu: 'https://www.flickr.com/photos/ninara/52303472931', tekija: 'Ninara', lisenssi: 'CC BY 2.0' }],
  ['flickr-53403719824.jpg', { osoite: 'https://live.staticflickr.com/65535/53403719824_4f95dbdcfb', sivu: 'https://www.flickr.com/photos/vickyb/53403719824', tekija: 'Vicky Brock', lisenssi: 'CC BY-SA 2.0' }],
  // Firenze (18.8.2026)
  ['flickr-25581301577.jpg', { osoite: 'https://live.staticflickr.com/4750/25581301577_37a5ac1c72', sivu: 'https://www.flickr.com/photos/rayinmanila/25581301577', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-27155711546.jpg', { osoite: 'https://live.staticflickr.com/7245/27155711546_20d5ea19ea', sivu: 'https://www.flickr.com/photos/rayinmanila/27155711546', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-27407894606.jpg', { osoite: 'https://live.staticflickr.com/7376/27407894606_ce502e35a7', sivu: 'https://www.flickr.com/photos/fran001/27407894606', tekija: 'Francisco Anzola', lisenssi: 'CC BY 2.0' }],
  ['flickr-27613279050.jpg', { osoite: 'https://live.staticflickr.com/7281/27613279050_91a5ac4f01', sivu: 'https://www.flickr.com/photos/rayinmanila/27613279050', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-28331684403.jpg', { osoite: 'https://live.staticflickr.com/8883/28331684403_e8aae9223e', sivu: 'https://www.flickr.com/photos/rayinmanila/28331684403', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-31789483887.jpg', { osoite: 'https://live.staticflickr.com/7823/31789483887_2efb3fd1ae', sivu: 'https://www.flickr.com/photos/pom-angers/31789483887', tekija: "Pom'", lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-34464102352.jpg', { osoite: 'https://live.staticflickr.com/4159/34464102352_09974d8c3f', sivu: 'https://www.flickr.com/photos/rayinmanila/34464102352', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-45822744735.jpg', { osoite: 'https://live.staticflickr.com/7845/45822744735_ffd2350f19', sivu: 'https://www.flickr.com/photos/pom-angers/45822744735', tekija: "Pom'", lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-51418890656.jpg', { osoite: 'https://live.staticflickr.com/65535/51418890656_4c27b2af8d', sivu: 'https://www.flickr.com/photos/pom-angers/51418890656', tekija: "Pom'", lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-51960599162.jpg', { osoite: 'https://live.staticflickr.com/65535/51960599162_1d2b7ddfe8', sivu: 'https://www.flickr.com/photos/rayinmanila/51960599162', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
  ['flickr-52034728756.jpg', { osoite: 'https://live.staticflickr.com/65535/52034728756_eca2903901', sivu: 'https://www.flickr.com/photos/sorin_popovich/52034728756', tekija: 'Sorin Popovich', lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-52090914588.jpg', { osoite: 'https://live.staticflickr.com/65535/52090914588_8642a7c748', sivu: 'https://www.flickr.com/photos/jocelyn777/52090914588', tekija: 'Jocelyn Erskine-Kellie', lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-52104490496.jpg', { osoite: 'https://live.staticflickr.com/65535/52104490496_c5bd35c316', sivu: 'https://www.flickr.com/photos/rayinmanila/52104490496', tekija: '. Ray in Manila', lisenssi: 'CC BY 2.0' }],
]);

/**
 * Flickr-kuvan osoite pyydetyllä koolla, tai null jos tiedosto ei ole
 * Flickristä. Koot ovat Flickrin omia päätteitä: `b` = 1024 px pitkä
 * sivu, `h` = 1600 px. Suurempaa ei pyydetä, koska alkuperäinen on
 * usein monta megatavua.
 */
export function flickrOsoite(tiedosto, koko = 'b') {
  const tieto = VALOKUVAT_FLICKR.get(tiedosto);
  return tieto ? `${tieto.osoite}_${koko}.jpg` : null;
}
