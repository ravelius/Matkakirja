/*
 * LAUSEJAKO — yksi sääntö sille, mistä virke loppuu.
 *
 * Raamattu: SAAPUMISEN UUSI JARJESTYS: KAUPUNGIN MINITRAILERI, ISOT
 * KUVAT KESKELLA, LYHENNETTY MERKINTA (omistaja 11.9.2026 klo 12.40,
 * sanatarkasti: *"Tee vaiaikainen muutos ja lyhenna tilapaisesti
 * matkakirjojen tekstista ja luennasta kaksi viimeista lausetta
 * pois."*).
 *
 * MIKSI OMA MODUULI. Lyhennystä tarvitsee kaksi eri puolta taloa:
 * kortin teksti (js/fokusvirta.js) ja luennan pysäytyskohta
 * (js/luenta.js → js/luentareaktiot.js). Jos sääntö asuisi
 * fokusvirrassa, luentapuoli joutuisi tuomaan sen kehää pitkin
 * (fokusvirta → luenta → luentareaktiot → fokusvirta) — ja yhden
 * tiedoston versiossa kehän lukujärjestys ei ole enää turvallinen
 * (tools/tarkista-niputus.mjs sääntö 3). Tämä moduuli ei tuo mitään.
 *
 * SÄÄNTÖ ON SAMA KUIN LUENTAGENERAATTORILLA (tools/generoi-
 * linssiluennat.mjs LAUSEEN_LOPPU): lauseen loppu on piste, huuto,
 * kysymys tai kolme pistettä, mahdollinen sulkeva lainausmerkki ja
 * sitä seuraava välilyönti tai tekstin loppu. Lyhenteitä ei
 * tunnisteta erikseen — mutta koska VÄLI on pakollinen, desimaaliluku
 * ("3.5") ja kellonaika ("klo 10.30") eivät katkea, ja juuri se on
 * tämän säännön syy olla välilyöntiin sidottu.
 */

/** Lauseen loppu: piste, huuto, kysymys tai kolme pistettä + väli/loppu. */
const LAUSEEN_LOPPU = /[.!?…]["'»”)]*(?:\s|$)/gu;

/**
 * MONTAKO LAUSETTA POISTETAAN MATKAKIRJASTA — NYT NOLLA.
 *
 * Omistaja tilasi 11.9.2026 tilapäisen kokeilun ("lyhenna tilapaisesti
 * matkakirjojen tekstista ja luennasta kaksi viimeista lausetta pois")
 * ja otti sen pois 13.9.2026 sanatarkasti: *"Ota isoisän tekstin
 * lyhennys pois päältä."* Kytkin on siksi 0: isoisän merkintä näkyy ja
 * kuullaan kokonaan, eikä luentaa pysäytetä lauserajaan.
 *
 * Kytkin jää paikalleen, koska koneisto sen ympärillä on koeteltu ja
 * kokeilu voidaan haluta uudestaan. Pakkien tekstejä, luentareaktioiden
 * ankkureita tai äänitteitä ei ole tässä kosketettu — ne lukevat pakista
 * suoraan, joten nollaus palauttaa alkuperäisen ilman uutta äänitystä.
 */
export const MATKAKIRJAN_LYHENNYS_LAUSEITA = 0;

/**
 * Teksti lauseiksi yllä kuvatulla säännöllä.
 *
 * Viimeinen pala otetaan mukaan silloinkin, kun siitä puuttuu
 * loppumerkki: keskeneräinen virke on silti virke, eikä sitä saa
 * kadottaa laskennasta.
 *
 * @param {string} teksti
 * @returns {string[]} lauseet alkuperäisine väleineen (ei trimmattu)
 */
export function jaaLauseiksi(teksti) {
  const koko = String(teksti ?? '');
  const lauseet = [];
  let alku = 0;
  const haku = new RegExp(LAUSEEN_LOPPU.source, 'gu');
  let osuma = haku.exec(koko);
  while (osuma) {
    const loppu = osuma.index + osuma[0].length;
    if (koko.slice(alku, loppu).trim()) lauseet.push(koko.slice(alku, loppu));
    alku = loppu;
    // Nollan mittainen osuma (tekstin loppu) pysäyttäisi silmukan.
    if (haku.lastIndex <= osuma.index) haku.lastIndex = osuma.index + 1;
    osuma = haku.exec(koko);
  }
  if (koko.slice(alku).trim()) lauseet.push(koko.slice(alku));
  return lauseet;
}

/**
 * Tekstin `n` viimeistä lausetta pois.
 *
 * YKSI LAUSE JÄÄ AINA: jos lauseita on enintään n+1, teksti palautuu
 * ennallaan. Lyhennys on kokeilu eikä sensuuri — tyhjä kortti olisi
 * pahempi vika kuin lyhentämätön merkintä.
 *
 * @param {string} teksti
 * @param {number} n poistettavien lauseiden määrä
 * @returns {string} jäljelle jäävä teksti trimmattuna (tai alkuperäinen)
 */
export function lyhennaLauseita(teksti, n) {
  const koko = String(teksti ?? '');
  if (!Number.isFinite(n) || n <= 0) return koko;
  const lauseet = jaaLauseiksi(koko);
  if (lauseet.length <= n + 1) return koko;
  return lauseet.slice(0, lauseet.length - n).join('').trim();
}

/**
 * Montako KOKONAISTA lausetta mahtuu tekstin `merkkeja` ensimmäiseen
 * merkkiin. Luentapuoli kysyy tämän, kun se muuntaa lyhennetyn tekstin
 * merkkiosuuden lauseindeksiksi (js/luentareaktiot.js
 * luennanLauserajat → js/luenta.js lopetaOsuuteen).
 *
 * @param {string} teksti koko teksti
 * @param {number} merkkeja jäljelle jäävien merkkien määrä
 * @returns {number} kokonaisten lauseiden määrä
 */
export function lauseitaMerkkeihin(teksti, merkkeja) {
  const lauseet = jaaLauseiksi(teksti);
  let kertyma = 0;
  let maara = 0;
  for (const lause of lauseet) {
    kertyma += lause.length;
    // Loppuväli ei kuulu lyhennettyyn tekstiin (se on trimmattu pois).
    if (kertyma - lause.length + lause.trimEnd().length > merkkeja) break;
    maara += 1;
  }
  return maara;
}
