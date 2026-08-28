/*
 * MAAKOHTAISET PAIKALLISAARTEET (Raamattu, osio "Aarteet ja
 * eteneminen": *"Paikallisaarteet: joka maalle oma pari (pieni + iso),
 * paikkaan sopivia, osa hauskan yllättäviä. ~220 paria."*).
 *
 * TAULU ON TARKOITUKSELLA TYHJÄ. Sisältöparit kirjoittaa päätoimittaja
 * — pelilogiikka ei keksi maakohtaisia nimiä eikä faktoja itse. Tämä
 * moduuli on se paikka, johon parit myöhemmin liitetään: mekaniikka on
 * jo valmis ottamaan ne vastaan, joten sisältötyö ei vaadi enää
 * yhtään muutosta pelin koodiin.
 *
 * AVAIN ON ISO3-MAAKOODI (sama kuin pack.map.cityCountry), koska pari
 * kuuluu MAALLE eikä mantereelle tai kaupungille: yksi pari kattaa maan
 * kaikki kaupungit. Rivin muoto:
 *
 *   FIN: {
 *     pieniAarre: { name: 'Tervatynnyrin pohjalta löytynyt …',
 *                   fakta: 'Lyhyt tosi fakta aarteesta.' },
 *     isoAarre:   { name: '…', fakta: '…' },
 *   },
 *
 * `name` korvaa laudan oman nimen ja `fakta` on löytötekstin tosi
 * puolisko (Raamattu: *"Löytöteksti: lyhyt tosi fakta aarteesta +
 * onnentoivotus"*). Rivi saa antaa myös `kuva`-kentän samassa muodossa
 * kuin laudan omat aarrekuvat. Puuttuva kenttä jää laudan omaksi, joten
 * taulun saa täyttää maa kerrallaan ilman että peli hajoaa välissä.
 *
 * NIMEN JÄRJESTYS ON NIMENOMAAN TÄMÄ (omistajan päätös 28.8.2026,
 * kysymyskortti "hopeakolikot vai meripihka"): maan oma pari → laudan
 * oma teema (nimi JA kuva samasta rivistä, js/packs/*.js
 * themedTokenTypes) → js/tokens.js yleinen varanimi. Yleinen varanimi
 * ei saa mennä laudan oman nimen edelle, koska AARREKUVA TULEE
 * LAUDALTA: jos varanimi voittaisi, Euroopan meripihkakuvan päällä
 * lukisi "Kourallinen hopeakolikoita" ja Afrikan kaurikotiloiden
 * päällä sama. Laudoilla, jotka eivät nimeä pariaan (maailma,
 * maailmankartta), ei ole kuvaakaan, joten yleisnimi on siellä
 * turvallinen.
 */

export const PAIKALLISAARTEET = {};

/**
 * Maan oma paikallisaarre tai null, jos maalle ei ole vielä kirjoitettu
 * paria — silloin näytetään laudan oma nimi ja kuva. Palauttaa null myös
 * muille kuin paikallisaarteille (pääaarre ja mantereen aarre ovat
 * laudan omia).
 */
export function paikallisaarre(type, maaIso) {
  if (type !== 'pieniAarre' && type !== 'isoAarre') return null;
  return PAIKALLISAARTEET[maaIso]?.[type] ?? null;
}
