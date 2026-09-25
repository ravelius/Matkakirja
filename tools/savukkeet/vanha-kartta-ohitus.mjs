/*
 * VANHAN KARTAN SAVUKKEET OHITUKSESSA — väliaikaisesti (7.9.2026)
 * ================================================================
 *
 * OMISTAJA 7.9.2026 aamu, sanatarkasti: *"Voisiko vanhan kartan ottaa
 * pelistä ainakin väliaikaisesti kokonaan pois, eli että se ei lataisi
 * sitä millään lailla, eikä se olisi myöskään kytkettävissä päälle?"*
 *
 * MIKÄ MUUTTUI. `?lauta=kartta` ei enää vaihda lautaa: se on nyt yhtä
 * tuntematon arvo kuin mikä tahansa muu (js/ui-apurit.js LAUDAT), eikä
 * tasokartan moduulia haeta millään polulla (js/kartta-lataus.js
 * lataaTasokartta, portti VANHA_KARTTA_KAYTOSSA). Peli avautuu siis
 * PALLOLLE riippumatta siitä, mitä savuke pyytää.
 *
 * MIKSI OHITUS EIKÄ KÄÄNNÖS PALLOLLE. Nämä savukkeet on kirjoitettu
 * tasokartan varaan: ne odottavat svg#board-kerroksia, kartan
 * lähikuvaa, panorointia ja laattapyramidin pyyntöjä. Kääntäminen
 * pallolle on jokaisen kohdalla oma harkintansa (mitä vartio oikeasti
 * mittaa ja onko sillä pallolla vastinetta) — sitä ei tehdä
 * yhteisajolla, koska hiljaa vääräksi kääntynyt vartio on pahempi kuin
 * ohitettu vartio. Ohitus on siis TIETOINEN ja NÄKYVÄ: savuke tulostaa
 * yhden rivin ja päättyy koodilla 0, joten ajojono ei katkea eikä
 * kukaan luule vartion menneen läpi.
 *
 * MITÄ TÄMÄ EI KOSKE. tools/tarkista-savukkeet.mjs lukee savukkeet
 * TEKSTINÄ eikä aja niitä, joten se toimii ennallaan — ohitus ei
 * piilota yhtään ui-viittausta sen katseelta.
 *
 * PALUU. Kun vanha kartta palaa käyttöön (js/ui-apurit.js
 * VANHA_KARTTA_KAYTOSSA = true), poista kolme riviä jokaisesta
 * ohituksessa olevasta savukkeesta — ne on merkitty samalla
 * kommenttirivillä, joten ne löytyvät haulla `VANHA KARTTA POIS`.
 */

/** Yksi rivi ohituksesta ja siisti loppu (koodi 0). */
export function ohitaVanhanKartanSavuke(moduulinOsoite) {
  const nimi = String(moduulinOsoite).split('/').pop() ?? 'savuke';
  console.log(`OHITUS  ${nimi}`);
  console.log('        Vanha kartta on väliaikaisesti pois käytöstä (omistaja 7.9.2026):');
  console.log('        tämä savuke ajaa ?lauta=kartta, eikä peli enää vaihda lautaa.');
  console.log('        Käännä savuke pallolle tai palauta VANHA_KARTTA_KAYTOSSA');
  console.log('        (js/ui-apurit.js) — ks. tools/savukkeet/vanha-kartta-ohitus.mjs.');
  process.exit(0);
}

/**
 * `--lauta`-vipua käyttävälle savukkeelle: 'kartta' ei enää kelpaa, ja
 * ajo jatkuu pallolla. Palauttaa laudan, jolla savuke oikeasti ajetaan.
 */
export function vainPallo(pyydetty) {
  if (pyydetty === 'pallo') return 'pallo';
  console.log(`HUOM    --lauta ${pyydetty}: vanha kartta on väliaikaisesti pois käytöstä`);
  console.log('        (omistaja 7.9.2026) — ajetaan pallolla.');
  return 'pallo';
}
