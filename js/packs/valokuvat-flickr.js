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
 *
 * POIKKEUS KOKOSÄÄNTÖÖN (18.8.2026): flickr-48753082278.jpg on
 * alkuperäisenä 22 579 x 3 909 pikselin jättipanoraama, jonka `_b` on
 * 1022 x 177 — liian litteä lehden kuvapaikkaan. Sen repokopio on
 * rajattu `_6k`-koosta tavalliseksi vaakakuvaksi (1024 x 453), ja
 * kuvateksti on kirjoitettu rajatun kuvan mukaan. Rivillä on siksi
 * lippu `rajattu: true`: se kertoo kuvamallille, ettei suurennosta saa
 * hakea Flickristä, koska siellä oleva kuva on eri rajaus kuin se, jonka
 * pelaaja näki ja jonka kuvateksti selittää (africa-valokuvat.js:
 * valokuvaSuurennos). Varareittinä koko panoraama kelpaa yhä — se on
 * silloin ainoa vaihtoehto tyhjälle kuvapaikalle.
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
  // Tokio (18.8.2026)
  ['flickr-10626604003.jpg', { osoite: 'https://live.staticflickr.com/3725/10626604003_91de73b5b2', sivu: 'https://www.flickr.com/photos/zengame/10626604003', tekija: 'Zengame', lisenssi: 'CC BY 2.0' }],
  ['flickr-15047197338.jpg', { osoite: 'https://live.staticflickr.com/5564/15047197338_ff5da458d2', sivu: 'https://www.flickr.com/photos/yoshikazut/15047197338', tekija: 'Yoshikazu TAKADA', lisenssi: 'CC BY 2.0' }],
  ['flickr-15204166021.jpg', { osoite: 'https://live.staticflickr.com/3858/15204166021_63ff624460', sivu: 'https://www.flickr.com/photos/yoshikazut/15204166021', tekija: 'Yoshikazu TAKADA', lisenssi: 'CC BY 2.0' }],
  ['flickr-16200454374.jpg', { osoite: 'https://live.staticflickr.com/7639/16200454374_bb0fb4957b', sivu: 'https://www.flickr.com/photos/zengame/16200454374', tekija: 'Zengame', lisenssi: 'CC BY 2.0' }],
  ['flickr-16339556998.jpg', { osoite: 'https://live.staticflickr.com/8677/16339556998_df151f6cb4', sivu: 'https://www.flickr.com/photos/yoshikazut/16339556998', tekija: 'Yoshikazu TAKADA', lisenssi: 'CC BY 2.0' }],
  ['flickr-24537021080.jpg', { osoite: 'https://live.staticflickr.com/1572/24537021080_279c7d9ae3', sivu: 'https://www.flickr.com/photos/yoshikazut/24537021080', tekija: 'Yoshikazu TAKADA', lisenssi: 'CC BY 2.0' }],
  ['flickr-24802871038.jpg', { osoite: 'https://live.staticflickr.com/4520/24802871038_98e68a3113', sivu: 'https://www.flickr.com/photos/56218409@N03/24802871038', tekija: 'Dr. Matthias Ripp', lisenssi: 'CC BY 2.0' }],
  ['flickr-25880389523.jpg', { osoite: 'https://live.staticflickr.com/1451/25880389523_5da26dee34', sivu: 'https://www.flickr.com/photos/ciamabue/25880389523', tekija: 'Jon Connell', lisenssi: 'CC BY 2.0' }],
  ['flickr-40579744563.jpg', { osoite: 'https://live.staticflickr.com/7847/40579744563_da03ab9521', sivu: 'https://www.flickr.com/photos/kanesue/40579744563', tekija: 'Kanesue', lisenssi: 'CC BY 2.0' }],
  ['flickr-47492986562.jpg', { osoite: 'https://live.staticflickr.com/7826/47492986562_1114d46acf', sivu: 'https://www.flickr.com/photos/kanesue/47492986562', tekija: 'Kanesue', lisenssi: 'CC BY 2.0' }],
  ['flickr-51334303085.jpg', { osoite: 'https://live.staticflickr.com/65535/51334303085_60847642f9', sivu: 'https://www.flickr.com/photos/volvob12b/51334303085', tekija: 'Bernard Spragg. NZ', lisenssi: 'PDM' }],
  ['flickr-54125112487.jpg', { osoite: 'https://live.staticflickr.com/65535/54125112487_d194c4c92c', sivu: 'https://www.flickr.com/photos/pom-angers/54125112487', tekija: "Pom'", lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-54184684642.jpg', { osoite: 'https://live.staticflickr.com/65535/54184684642_3127776acb', sivu: 'https://www.flickr.com/photos/pom-angers/54184684642', tekija: "Pom'", lisenssi: 'CC BY-SA 2.0' }],
  // Soul (18.8.2026)
  ['flickr-14775785519.jpg', { osoite: 'https://live.staticflickr.com/3886/14775785519_33763412d3', sivu: 'https://www.flickr.com/photos/kristoffer-trolle/14775785519', tekija: 'Kristoffer Trolle', lisenssi: 'CC BY 2.0' }],
  ['flickr-23010178486.jpg', { osoite: 'https://live.staticflickr.com/5707/23010178486_6d0f646cff', sivu: 'https://www.flickr.com/photos/xingty/23010178486', tekija: 'Carmine.shot', lisenssi: 'CC BY 2.0' }],
  ['flickr-30596173403.jpg', { osoite: 'https://live.staticflickr.com/5619/30596173403_918953e8de', sivu: 'https://www.flickr.com/photos/zuk0/30596173403', tekija: 'Tony', lisenssi: 'CC BY 2.0' }],
  ['flickr-41646399301.jpg', { osoite: 'https://live.staticflickr.com/910/41646399301_9227219b1d', sivu: 'https://www.flickr.com/photos/marc-dupuy/41646399301', tekija: 'Marc DUPUY', lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-45979304321.jpg', { osoite: 'https://live.staticflickr.com/4809/45979304321_bc64fd1ff2', sivu: 'https://www.flickr.com/photos/frank_schulenburg/45979304321', tekija: 'wikiphotographer', lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-48753082278.jpg', { osoite: 'https://live.staticflickr.com/65535/48753082278_d295ba59b5', sivu: 'https://www.flickr.com/photos/cafuego/48753082278', tekija: 'cafuego', lisenssi: 'CC BY-SA 2.0', rajattu: true }],
  ['flickr-48966437893.jpg', { osoite: 'https://live.staticflickr.com/65535/48966437893_9959ce3791', sivu: 'https://www.flickr.com/photos/dalbera/48966437893', tekija: 'Jean-Pierre Dalbéra', lisenssi: 'CC BY 2.0' }],
  ['flickr-48968719746.jpg', { osoite: 'https://live.staticflickr.com/65535/48968719746_21e1098100', sivu: 'https://www.flickr.com/photos/dalbera/48968719746', tekija: 'Jean-Pierre Dalbéra', lisenssi: 'CC BY 2.0' }],
  ['flickr-48977306141.jpg', { osoite: 'https://live.staticflickr.com/65535/48977306141_792f9de853', sivu: 'https://www.flickr.com/photos/dalbera/48977306141', tekija: 'Jean-Pierre Dalbéra', lisenssi: 'CC BY 2.0' }],
  // Shanghai (18.8.2026)
  ['flickr-30366279333.jpg', { osoite: 'https://live.staticflickr.com/5629/30366279333_724c65b911', sivu: 'https://www.flickr.com/photos/37195641@N03/30366279333', tekija: 'lwtt93', lisenssi: 'CC BY 2.0' }],
  ['flickr-32354797618.jpg', { osoite: 'https://live.staticflickr.com/4810/32354797618_1d3a018ba4', sivu: 'https://www.flickr.com/photos/franckmichel/32354797618', tekija: 'Franck Michel', lisenssi: 'CC BY 2.0' }],
  ['flickr-42164576345.jpg', { osoite: 'https://live.staticflickr.com/836/42164576345_cd39882180', sivu: 'https://www.flickr.com/photos/franckmichel/42164576345', tekija: 'Franck Michel', lisenssi: 'CC BY 2.0' }],
  ['flickr-44705397404.jpg', { osoite: 'https://live.staticflickr.com/1907/44705397404_3f7d44f894', sivu: 'https://www.flickr.com/photos/franckmichel/44705397404', tekija: 'Franck Michel', lisenssi: 'CC BY 2.0' }],
  ['flickr-44774108052.jpg', { osoite: 'https://live.staticflickr.com/1855/44774108052_269059b34c', sivu: 'https://www.flickr.com/photos/franckmichel/44774108052', tekija: 'Franck Michel', lisenssi: 'CC BY 2.0' }],
  ['flickr-45493688424.jpg', { osoite: 'https://live.staticflickr.com/4867/45493688424_42f5547742', sivu: 'https://www.flickr.com/photos/franckmichel/45493688424', tekija: 'Franck Michel', lisenssi: 'CC BY 2.0' }],
  ['flickr-50101388983.jpg', { osoite: 'https://live.staticflickr.com/65535/50101388983_82b6d65c5f', sivu: 'https://www.flickr.com/photos/stevehfung/50101388983', tekija: 'Steve FUNG', lisenssi: 'CC BY-SA 2.0' }],
  // Lissabon (19.8.2026): Commonsissa ei ole yhtään ratikkakuvaa ilman
  // tunnistettavia ihmisiä, joten kuva on haettu Flickristä
  // (docs/tuotantosuunnitelma.md 11.3: Flickr = nykykatukuvat).
  ['flickr-45028823084.jpg', { osoite: 'https://live.staticflickr.com/1950/45028823084_1a7f979d51', sivu: 'https://www.flickr.com/photos/31176607@N05/45028823084', tekija: 'Michael Kuhn', lisenssi: 'CC BY 2.0' }],
  // Amsterdam (19.8.2026): pyöräkuva ja kanavasilta Flickristä, koska
  // Commonsin Amsterdam-katukuvissa on lähes aina tunnistettavia ihmisiä.
  ['flickr-12620536334.jpg', { osoite: 'https://live.staticflickr.com/7447/12620536334_151903393c', sivu: 'https://www.flickr.com/photos/spillokr/12620536334', tekija: 'Mario Oreste', lisenssi: 'CC BY-SA 2.0' }],
  ['flickr-3864446500.jpg', { osoite: 'https://live.staticflickr.com/3442/3864446500_819afa0423', sivu: 'https://www.flickr.com/photos/joiseyshowaa/3864446500', tekija: 'joiseyshowaa', lisenssi: 'CC BY-SA 2.0' }],
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
