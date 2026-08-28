/*
 * FOKUSKOHTEET — LIBYA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-syr.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Libyassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden VÄLIMEREN ERÄ (27.8.2026, kahdeksan uutta
 * ihmettä). Libyalla ei ollut vielä yhtään fokuskohdetta, joten
 * Leptis Magna olisi jäänyt kokonaan pois — mutta maan fokuslehti on
 * jo olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.LBY, tiedosto
 * LBY.webp, tarkistettu ämpäristä 27.8.2026), joten merkillä on
 * lehti, jonka päälle asettua. Se oli lisäyksen ainoa tekninen ehto,
 * sama kuin Egyptillä, Irakilla, Ranskalla, Britannialla ja edellisen
 * erän seitsemällä maalla. Tiedosto on tarkoituksella yhden kohteen
 * mittainen ja odottaa ensimmäistä varsinaista Libya-erää.
 *
 * ── ESITYSTAPA ON "YHÄ OLEMASSA" ───────────────────────────────────
 *
 * `kadonnut: false`. Leptis Magnan rauniot ovat pystyssä ja ne ovat
 * Välimeren parhaiten säilyneitä roomalaiskaupunkeja — riemukaari,
 * Severuksen forum, basilika ja teatteri seisovat paikoillaan.
 * Kadonnut on KAUPUNKI eli se, että paikassa asuttiin ja käytiin
 * kauppaa: ihmekuva näyttää torin täynnä ihmisiä ja sataman täynnä
 * laivoja, valokuva saman kaupungin tyhjänä raunioalueena. Kartalla
 * säilyy siis kohteen oma merkki, pääkuvana on Commons-valokuva
 * nykytilasta ja ihmekuva aukeaa sen alta "Koe ihme" -napista.
 * Tähti kuuluu vain kohteille, joita ei ole enää lainkaan.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`. Leptis Magna on 32,64 N eli
 * Euroopan laudan kaavan ETELÄPUOLELLA (kaava kattaa 34°…72°,
 * js/packs/europe.js): Euroopan laudalla piste putoaisi laudan
 * alareunan ali. Lauta, jota rivillä ei ole, ei saa kohdetta kartalle
 * lainkaan — ja se on parempi kuin laudan ulkopuolelle piirretty
 * merkki.
 *
 * Kaava on maailmankartan oma Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio). Kaava validoitiin ennen käyttöä jo kirjatuilla
 * kohteilla — Ateena (laskettu 6624,3 / 1881,5 vastasi kirjattua
 * täsmälleen) ja Delfoi (6583,4 / 1862,2, sama) — ja piste osuu
 * LBY-lehden rajaukseen (x 6048–6767, y 1971–2638).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli "Leptis
 * Magna" 27.8.2026 — ei työaineistoa, joten lähderivi osoittaa
 * suoraan artikkeliin.
 */
export const FOKUSKOHTEET_LBY = [
  {
    /*
     * LEPTIS MAGNA. 14,29056 E / 32,63917 N — en-Wikipedia "Leptis
     * Magna" (tietolaatikon coordinates, 32°38′21″N 14°17′26″E).
     * Piste on raunioalue Wadi Lebdan suulla nykyisen Al-Khumsin
     * kohdalla, noin 130 kilometriä Tripolista itään.
     */
    id: 'leptis-magna',
    nimi: 'Leptis Magna',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi Septimius Severus panosti juuri kotikaupunkiinsa?',
      'Mitä Leptis Magnan raunioita vietiin Englantiin?',
    ],
    korostukset: ['basilika|basilikan', 'Septimius Severus'],
    nappi: 'Kaupunki, joka nukkui vuosisadat hiekan alla',
    laudat: {
      maailmankartta: { x: 6309.7, y: 2083.8 },
    },
    teksti: 'Leptis Magna oli foinikialaisten perustama kaupunki Wadi '
      + 'Lebdan suulla nykyisen Al-Khumsin kohdalla. Puunilainen asutus '
      + 'syntyi 600-luvulla eaa., ja Karthagon tappion myötä kaupunki '
      + 'siirtyi Rooman piiriin. Vuoteen 46 eaa. mennessä sen '
      + 'oliiviöljyn tuotanto oli niin suuri, että kaupunki maksoi '
      + 'Julius Caesarille veroa kolme miljoonaa naulaa öljyä vuodessa. '
      + 'Suuruudenaika alkoi vuonna 193, kun kaupungissa syntynyt '
      + 'Septimius Severus nousi keisariksi: hän rakennutti uuden '
      + 'forumin, valtavan basilikan ja uudet satamalaiturit. Silloin '
      + 'kaupungissa asui arviolta satatuhatta ihmistä, ja Saharan '
      + 'halki tuli norsunluuta, kultahiekkaa, mustapuuta ja '
      + 'strutsinsulkia. Kolmannen vuosisadan kriisi vei kaupan '
      + 'mukanaan, vandaalit purkivat kaupungin muurit vuonna 439, ja '
      + 'arabivalloituksen aikaan noin vuonna 647 paikka oli jo lähes '
      + 'autio.',
    lahde: 'en-Wikipedia "Leptis Magna", johdanto sekä osiot "Punics", '
      + '"Roman Republic", "Roman Empire", "Vandal Kingdom", "Islamic '
      + 'conquest" ja "Excavation" (tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (3447×2277, public domain, Daviegunn, kuvattu 2006) ja
     * katsottu silmin: korkealta otettu näkymä teatterin katsomon yli
     * kaupungin raunioihin ja Välimerelle, ei ihmisiä. Sama teatteri
     * näkyy ihmekuvan oikeassa laidassa ja sama meri sen takana, joten
     * pari katsoo samaa kaupunkia kahdessa ajassa.
     */
    kuva: {
      tiedosto: 'Leptis Magna Theatre.jpg',
      selite: 'Leptis Magnan teatteri, sen takana kaupungin rauniot ja '
        + 'Välimeri.',
      lahde: 'Daviegunn, Wikimedia Commons (PD)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`,
     * joten "Koe ihme" -nappi tulee yllä olevan valokuvan alle.
     *
     * ISOISÄN KYTKÖS ON AITO EIKÄ KEKSITTY: artikkelin mukaan kaupunki
     * säilyi hiekkadyynien alla, ja italialaiset kaivoivat sen esiin
     * vasta 1920-luvulla. Vuonna 1873 paikalla oli siis dyynejä eikä
     * raunioita, ja selite sanoo juuri sen.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-leptis-magna.webp',
      kadonnut: false,
      selite: 'Leptis Magna oli Rooman Afrikan komeimpia kaupunkeja: '
        + 'marmorista rakennettu Severuksen forum, pylväskatu satamaan '
        + 'ja teatteri meren äärellä. Kaupunki eli oliiviöljystä: Caesar '
        + 'määräsi sen maksamaan veronsa öljynä, kolme miljoonaa naulaa '
        + 'vuodessa, ja amforat lastattiin satamasta Roomaan. Torilla '
        + 'kaupat tehtiin kivipöydän ääressä, johon oli hakattu '
        + 'rinnakkain puunilainen kyynärä, roomalainen jalka ja '
        + 'ptolemaiolainen kyynärä. Kun kaupunki '
        + 'hylättiin 600-luvulla, hiekkadyynit peittivät sen — ja juuri '
        + 'siksi se säilyi. Italialaiset arkeologit kaivoivat kaupungin '
        + 'esiin 1920- ja 1930-luvuilla, ja rauniot ovat nyt Välimeren '
        + 'parhaiten säilyneitä roomalaiskaupunkeja. Isoisän matkan '
        + 'aikaan vuonna 1873 kokonainen kaupunki nukkui vielä dyynien '
        + 'alla.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
