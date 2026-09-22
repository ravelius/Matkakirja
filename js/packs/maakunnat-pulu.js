/*
 * MAAKUNTIEN PULU — nykymaakunnan kortin valmiit pöllön kysymykset.
 *
 * Karttatyökalun Maakunnat-tilan kortti (js/karttatyokalu-maakunnat.js)
 * näyttää nostokortin tapaan pari valmista kysymystä, joita napauttamalla
 * vastaus ilmestyy napin alle puhekuplana — sama malli kuin Ihmisen
 * matka -linssin pulukeskustelussa (js/linssit/linssi-muuttoliike.js).
 *
 * RAKENNE ON SAMA KUIN js/packs/maakunnat-luonnehdinnat.js:ssä ja AVAIMET
 * OVAT TÄSMÄLLEEN SAMAT (docs/raportit/kaappaukset/maakuntavedos-20260921/
 * vedos4/avaimet.md): <ISO>: { <tunnus>: [...] }, jossa tunnus on Natural
 * Earthin admin-1-kentän kirjainkanta (FRA/ITA/ESP `region`, GBR
 * `geonunit`, muut `name`) — EI kartalle poltettu suomenkielinen nimi.
 *
 * ERÄ 3 (tuleva, Sisältökirjuri täyttää): tämä tiedosto on tyhjä runko
 * ensimmäisessä erässä. Kun kysymyksiä kirjoitetaan, jokainen alue saa
 * taulukon:
 *
 *   ISO: {
 *     tunnus: [
 *       { q: "Kysymys pöllölle?", a: "Vastaus 2–4 virkkeenä." },
 *       ...
 *     ],
 *   },
 *
 * SÄÄNNÖT KYSYMYKSILLE:
 *   - 2–3 kysymystä per alue, ei enempää — kortti ei ole tenttipatteri.
 *   - `q` on lyhyt, luonnollinen kysymys (kuten pelaaja kysyisi itse).
 *   - `a` on 2–4 virkettä Livian äänellä (nykyaika, docs/tarina.md):
 *     sama ääni kuin luonnehdinnan `lyhyt`/`pitka`-kentissä, ei
 *     oppikirjamainen luettelo.
 *   - Alue ilman kysymyksiä jätetään KOKONAAN POIS taulukosta (ei
 *     tyhjää listaa) — js/karttatyokalu-maakunnat.js jättää Pulu-lohkon
 *     kortilta pois, jos dataa ei ole.
 *   - Avaimet TÄSMÄÄVÄT MAAKUNTIEN_NIMET- ja MAAKUNTIEN_LUONNEHDINNAT
 *     -tauluihin (js/karttatyokalu-maakunnat.js, js/packs/
 *     maakunnat-luonnehdinnat.js) — testi (tests/karttatyokalu-
 *     maakunnat.test.mjs) tarkistaa tämän tiedoston muodon.
 */
export const MAAKUNTIEN_PULU = {};
