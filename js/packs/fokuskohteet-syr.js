/*
 * FOKUSKOHTEET — SYYRIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-egy.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Syyriassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026, neljätoista uutta
 * ihmettä). Syyrialla ei ollut vielä yhtään fokuskohdetta, joten
 * Palmyran Belin temppeli olisi jäänyt kokonaan pois — mutta maan
 * fokuslehti on jo olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.SYR,
 * tiedosto SYR.webp), joten merkillä on lehti, jonka päälle asettua.
 * Se oli lisäyksen ainoa tekninen ehto, sama kuin Egyptillä, Irakilla,
 * Ranskalla ja Britannialla aiemmissa erissä. Tiedosto on
 * tarkoituksella yhden kohteen mittainen ja odottaa ensimmäistä
 * varsinaista Syyria-erää.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Palmyra ei ole Euroopan laudan kaavan sisällä (kaava kattaa
 * −11°…41°, js/packs/europe.js), joten rivillä on vain
 * `maailmankartta`. Lauta, jota rivillä ei ole, ei saa kohdetta
 * kartalle lainkaan — ja se on parempi kuin väärään paikkaan
 * piirretty merkki.
 *
 * Kaava on maailmankartan oma Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio), sama kuin muissa tämän erän tiedostoissa. Kaava
 * validoitiin ennen käyttöä jo kirjatuilla kohteilla — Delfoi
 * (laskettu 6583,4 / 1862,2 vastasi kirjattua täsmälleen) ja Ateena —
 * ja piste osuu SYR-lehden rajaukseen (x 6984–7286, y 1872–2129).
 *
 * ── AIHE ON RAJATTU NEUTRAALIKSI ───────────────────────────────────
 *
 * Temppeli tuhottiin räjähteillä elokuussa 2015. Peli kertoo sen
 * tapahtumana ja päivämääränä ja nimeää tekijän niin kuin
 * lähdeartikkeli sen nimeää, muttei kuvaile tuhoa eikä sen tekijöiden
 * muuta toimintaa. Perustuslain ikäsopivuuskohta koskee juuri tätä:
 * kohde kerrotaan, ei sotaa. Sama rajaus kuin Turkin tiedoston
 * İzmirillä ja Trabzonilla.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli "Temple
 * of Bel" 27.8.2026 — ei työaineistoa, joten lähderivi osoittaa
 * suoraan artikkeliin.
 */
export const FOKUSKOHTEET_SYR = [
  {
    /*
     * BELIN TEMPPELI. 38,274 E / 34,547 N — en-Wikipedia "Temple of
     * Bel" (tietolaatikon coordinates). Piste on temppelipiha Palmyran
     * raunioalueen itäpäässä, suuren pylväskadun päätteenä.
     *
     * ESITYSTAPA ON "KADONNUT" (`kadonnut: true`). Temppelirakennus —
     * cella podiumeineen ja pylväikköineen, se mistä ihmekuva kertoo —
     * tuhoutui 30.8.2015. Pihan ulkomuurit ja kaareva pääportti ovat
     * yhä pystyssä, ja selite sanoo sen: kartalla on tähti, mutta
     * teksti ei väitä paikkaa tyhjäksi.
     */
    id: 'belin-temppeli',
    nimi: 'Belin temppeli',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi temppelin piha oli näin suuri?',
      'Mitä Palmyra oli aikanaan?',
    ],
    korostukset: ['Bel|Belille', 'cella|cella'],
    nappi: 'Temppeli, jonka pihalla asuttiin tuhat vuotta',
    laudat: {
      maailmankartta: { x: 7109.1, y: 2012.5 },
    },
    teksti: 'Palmyran Belin temppeli vihittiin vuonna 32 jaa. ja se oli '
      + 'keitaankaupungin uskonnollinen keskus. Se oli omistettu '
      + 'mesopotamialaiselle Belille, jota palvottiin Palmyrassa '
      + 'kolmikossa kuunjumala Aglibolin ja auringonjumala Yarhibolin '
      + 'kanssa. Rakennus seisoi noin 200 × 200 metrin pihalla, jota '
      + 'kiersi 205 metriä pitkä muuri ja porttirakennus; keskellä '
      + 'podiumilla oli itse temppeli eli cella, jota ympäröi '
      + 'korinttilainen pylväikkö. Cellassa oli poikkeuksellisesti '
      + 'kaksi sisempää pyhäkköä, ja pohjoisen katossa on kaiverrus '
      + 'seitsemästä tunnetusta taivaankappaleesta eläinradan merkkien '
      + 'ympäröimänä. Bysantin aikana rakennus muutettiin kirkoksi ja '
      + 'vuonna 1132 moskeijaksi; pihalla oli savitiilitaloja ja '
      + 'kyläyhteisö aina 1920-luvulle asti.',
    lahde: 'en-Wikipedia "Temple of Bel", johdanto, tietolaatikko sekä '
      + 'osiot "History" ja "Architecture" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Kortissa on vain tämä kuva.
     *
     * SELITE ON KIRJOITETTU TAPAHTUMANA EIKÄ KUVAUKSENA. Se sanoo mikä
     * temppeli oli, milloin se tuhoutui ja mitä paikalla on nyt — ei
     * enempää. Lähdeartikkeli nimeää tekijän, joten sekin sanotaan,
     * mutta yhtenä lauseenosana.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-palmyra.webp',
      kadonnut: true,
      selite: 'Belin temppeli oli Palmyran uskonnollinen keskus lähes '
        + 'kaksituhatta vuotta: pylväikön ympäröimä temppelirakennus '
        + 'keskellä 200 metrin levyistä pihaa, ensin pyhäkkönä, sitten '
        + 'kirkkona ja vuodesta 1132 moskeijana. Sen rauniot olivat '
        + 'Palmyran parhaiten säilyneitä, kunnes Isis-järjestö tuhosi '
        + 'rakennuksen räjähteillä 30. elokuuta 2015. Pihan ulkomuurit '
        + 'ja kaareva pääportti ovat yhä pystyssä keskellä keidasta.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
