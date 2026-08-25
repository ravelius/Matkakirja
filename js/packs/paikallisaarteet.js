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
 * `name` korvaa laattatyypin varanimen ja `fakta` on löytötekstin tosi
 * puolisko (Raamattu: *"Löytöteksti: lyhyt tosi fakta aarteesta +
 * onnentoivotus"*). Rivi saa antaa myös `kuva`-kentän samassa muodossa
 * kuin laudan omat aarrekuvat. Puuttuva kenttä palaa varanimeen, joten
 * taulun saa täyttää maa kerrallaan ilman että peli hajoaa välissä.
 */

export const PAIKALLISAARTEET = {};

/*
 * Varanimet: YKSI yleisnimi kummallekin kokoluokalle, aikakauden
 * henkinen mutta paikaton. Näin pelaaja saa kätköstä aina jotain
 * uskottavaa, vaikka maan omaa paria ei vielä olisi kirjoitettu — eikä
 * peli väitä mitään sellaista, mitä kukaan ei ole tarkistanut.
 */
export const VARA_PARI = {
  pieniAarre: { name: 'Kourallinen hopeakolikoita' },
  isoAarre: { name: 'Kätketty matka-arkku' },
};

/**
 * Maan oma paikallisaarre tai varanimi. Palauttaa null muille kuin
 * paikallisaarteille (pääaarre ja mantereen aarre ovat laudan omia).
 */
export function paikallisaarre(type, maaIso) {
  if (type !== 'pieniAarre' && type !== 'isoAarre') return null;
  return PAIKALLISAARTEET[maaIso]?.[type] ?? VARA_PARI[type] ?? null;
}
