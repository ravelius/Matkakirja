/*
 * FOKUSKOHTEET — ISO-BRITANNIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-fra.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Britanniassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden EUROOPAN ERÄ (27.8.2026). Britannialla ei ollut
 * vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.GBR, tiedosto GBR.webp), joten
 * merkillä on lehti, jonka päälle asettua — sama ainoa tekninen ehto
 * kuin Egyptillä, Irakilla ja Ranskalla. Tiedosto on tarkoituksella
 * yhden kohteen mittainen ja odottaa ensimmäistä varsinaista
 * Britannia-erää.
 *
 * MAAILMAN ERÄ (27.8.2026, neljätoista uutta ihmettä) toi listalle
 * kaksi kadonnutta lisää: Crystal Palacen ja vanhan London Bridgen.
 * Lista on siis kolmen mittainen, mutta yhä pelkkä ihme-erien jalusta
 * — varsinainen Britannia-erä on tekemättä.
 *
 * ── TÄMÄ ON ERÄN AINOA "KOE IHME" -KOHDE, JA SE ON TIETOINEN VALINTA ─
 *
 * Raamatun kaksi esitystapaa: kokonaan kadonnut kohde saa kartalle
 * tähden ja kortin kuva aukeaa suoraan ihmekuvaan; YHÄ OLEMASSA OLEVA
 * kohde pitää oman merkkinsä, ja pääkuvana on nykytilan valokuva,
 * jonka ALLE tulee "Koe ihme" -nappi.
 *
 * Ludgate Hillin kirkko on olemassa — mutta se ei ole sama kirkko.
 * Nykyinen on Christopher Wrenin kupolikirkko (valmis 1710); ihmekuva
 * näyttää sen EDELTÄJÄN, keskiaikaisen St Paulin, joka tuhoutui
 * Lontoon suuressa palossa 1666. Kohde on siis `kadonnut: false`,
 * koska katedraali on paikallaan ja siitä on valokuva, mutta sekä
 * kortin teksti että ihmeen selite sanovat SUORAAN, että ihmekuvan
 * kirkko on edeltäjä eikä se, mitä Ludgate Hillillä tänään näkee.
 * Ilman tuota lausetta kuva väittäisi valehtelematta väärin — ja se on
 * ainoa asia, jota Matkakirjan ihme ei saa tehdä.
 *
 * ── KOORDINAATIT: MOLEMMAT LAUDAT ──────────────────────────────────
 *
 * Lontoo on Euroopan laudan kaavan sisällä (kaava kattaa −11°…41°,
 * js/packs/europe.js), joten rivillä on molemmat laudat:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 −175 /
 *     POHJOINEN 76 (tools/tee-fokuskartta.mjs laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
 *
 * Kaavat validoitiin ennen käyttöä jo kirjatulla kohteella (Ateena:
 * laskettu 6624,2 / 1881,9 ja 666,7 / 894,9 vastasi kirjattuja 0,1
 * yksikön tarkkuudella). Piste osuu GBR-lehden rajaukseen
 * (x 5484–5955, y 782–1479).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkelit "Old St
 * Paul's Cathedral", "St Paul's Cathedral", "The Crystal Palace" ja
 * "London Bridge" 27.8.2026 — ei työaineistoa, joten lähderivit
 * osoittavat suoraan artikkeleihin.
 *
 * MITÄ TEKSTI EI VÄITÄ: artikkeli merkitsee itse, että keskiaikaisen
 * huipun korkeus (perinteinen luku 489 jalkaa eli noin 149 metriä) ja
 * sen vertailu muihin keskiajan huippuihin on asiantuntijoiden kesken
 * kiistanalainen. Teksti kertoo luvun juuri niin kuin artikkeli sen
 * kertoo — perinteisenä mittana — eikä esitä sitä mitattuna faktana.
 */
export const FOKUSKOHTEET_GBR = [
  {
    /*
     * ST PAULIN KATEDRAALI, Ludgate Hill. −0,0983 E / 51,5138 N —
     * en-Wikipedia "St Paul's Cathedral". Sama kukkula ja sama tontti
     * kuin edeltäjällä: Old St Paul's -artikkelin oma koordinaatti
     * (51°30′49″N 0°5′54″W) osuu samaan pisteeseen kolmen desimaalin
     * tarkkuudella, joten kartalle riittää yksi merkki.
     */
    id: 'st-paulin-katedraali',
    nimi: 'St Paulin katedraali',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi torninhuippua ei rakennettu takaisin?',
      'Mitä kirkon sisällä tehtiin muuta kuin rukoiltiin?',
    ],
    korostukset: ['Ludgate Hill|Ludgate Hillin',
      'Lontoon suuri palo',
      'Christopher Wren|Christopher Wrenin'],
    nappi: 'Kirkko, joka oli aikanaan maailman korkein',
    laudat: {
      maailmankartta: { x: 5830.1, y: 1323.7 },
      europe: { x: 209.3, y: 538.8 },
    },
    teksti: 'Ludgate Hillin laella on ollut Paavalille omistettu kirkko '
      + 'vuodesta 604, ja nykyinen katedraali on paikan viides. Sitä '
      + 'edeltänyt keskiaikainen St Paul aloitettiin vuoden 1087 '
      + 'tulipalon jälkeen, vihittiin 1240 ja valmistui vasta '
      + '1300-luvun puolivälissä — silloin se oli maailman pisimpiä '
      + 'kirkkoja, 178 metriä, ja sen puinen torninhuippu kohosi '
      + 'perinteisen mitan mukaan noin 149 metriin. Kirkon pääkäytävä '
      + 'oli lontoolaisille kauppapaikka ja juorujen vaihtopaikka, '
      + 'jolla oli oma nimikin: Paul\'s walk. Huippu syttyi palamaan 4. '
      + 'kesäkuuta 1561 ja romahti kirkkosalin katon läpi; aikalaisen '
      + 'uutislehtinen kertoi syyksi salamaniskun, eikä huippua '
      + 'rakennettu takaisin. Lontoon suuri palo tuhosi kirkon 1666, ja '
      + 'paikalle nousi Christopher Wrenin kupolikirkko, joka valmistui '
      + '1710 ja seisoo siellä yhä.',
    lahde: 'en-Wikipedia "Old St Paul\'s Cathedral", johdanto, '
      + 'tietolaatikko ja osio "Spire collapse (1561)"; nykyisen kirkon '
      + 'tiedot ja koordinaatit en-Wikipedia "St Paul\'s Cathedral" '
      + '(kumpikin tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA (omistajan täsmennys 27.8.2026 ilta):
     * olemassa olevan kohteen pääkuva on Commons-valokuva siitä, mitä
     * paikalla NYT on — generoitu ihmekuva aukeaa vasta "Koe ihme"
     * -napista tämän alta. Tiedosto tarkistettu Commonsin
     * imageinfo-rajapinnalla 27.8.2026 (5539×3978, CC BY 4.0, Julian
     * Herzog); sama kuva on jo käytössä nähtävyysjutuissa.
     */
    kuva: {
      tiedosto: 'St Paul\'s Cathedral Dome 2020 Exterior Ground.jpg',
      selite: 'Christopher Wrenin kupolikirkko Ludgate Hillillä. Se '
        + 'valmistui 1710 palaneen keskiaikaisen edeltäjänsä paikalle.',
      lahde: 'Julian Herzog, Wikimedia Commons (CC BY 4.0)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`:
     * kartalla säilyy historian pylväs ja valokuvan alle tulee "Koe
     * ihme" -nappi.
     *
     * SELITE SANOO ENSIMMÄISESSÄ VIRKKEESSÄÄN, ETTÄ KUVAN KIRKKO ON
     * EDELTÄJÄ. Tämä on erän ainoa ihme, jossa kuvan rakennus ja
     * pääkuvan rakennus ovat eri rakennuksia, joten pelaajalle on
     * kerrottava se ennen kuin hän ehtii luulla muuta.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-vanha-st-paul.webp',
      kadonnut: false,
      selite: 'Kuvan kirkko on nykyisen katedraalin EDELTÄJÄ: '
        + 'keskiaikainen St Paul, joka tuhoutui Lontoon suuressa '
        + 'palossa 1666. Sen torninhuippu oli keskiajan Euroopan '
        + 'korkeimpia — perinteisen mitan mukaan noin 149 metriä — ja '
        + 'huippu paloi salamaniskussa jo 1561 eikä sitä rakennettu '
        + 'takaisin. Samalla Ludgate Hillin tontilla seisoo nyt '
        + 'Christopher Wrenin kupolikirkko.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN MAAILMAN ERÄ (27.8.2026) ────────────────
   *
   * Kaksi kadonnutta lontoolaista St Paulin perässä. Kumpikin on
   * NIMETTY PAIKKA LONTOON SISÄLLÄ eikä toinen Lontoo — sama
   * pelilaattasääntö ja sama ratkaisu kuin Forum Romanumilla Roomassa
   * (js/packs/fokuskohteet-ita.js). Sillan ja St Paulin merkit osuvat
   * lähes päällekkäin kaupunkimerkin kanssa, ja niputuspassi
   * (js/fokusniput.js) kasaa ne siistiksi sarakkeeksi kaupungin
   * oikealle puolelle katkoviivoineen — juuri sitä varten se on.
   *
   * KUMPIKIN ON `kadonnut: true` ERI SYYSTÄ, JA SE ON KIRJOITETTU AUKI
   * SELITTEISIIN:
   *
   *   Crystal Palace paloi maan tasalle 30.11.1936. Puisto ja sen
   *   pengerrykset ovat yhä paikallaan, mutta rakennusta ei ole.
   *
   *   Vanha London Bridge purettiin 1831, kun Rennien uusi silta
   *   avattiin sen vierestä. Thamesin yli menee yhä silta samassa
   *   kohdassa — mutta se ei ole tämä silta, ja selite sanoo sen
   *   suoraan samasta syystä kuin vanhan St Paulin selite yllä.
   */
  {
    /*
     * CRYSTAL PALACE. −0,0756 E / 51,4226 N — en-Wikipedia "The Crystal
     * Palace" (tietolaatikon coordinates). Piste on Sydenham Hillin
     * paikka, jonne rakennus siirrettiin 1854 — ei Hyde Park, jossa se
     * seisoi vain vuoden 1851 näyttelyn ajan. Ihmekuva katsoo samaa
     * mäkeä nykyisestä Crystal Palace Parkista.
     */
    id: 'crystal-palace',
    nimi: 'Crystal Palace',
    tyyppi: 'muu',
    symboli: 'tekniikka',
    kysymykset: [
      'Miten näin suuri lasirakennus saatiin pystyyn 39 viikossa?',
      'Miksi rakennusta ei koskaan rakennettu uudelleen?',
    ],
    korostukset: ['maailmannäyttely|maailmannäyttelyä',
      'Joseph Paxton|Joseph Paxtonin'],
    nappi: 'Lasipalatsi, joka nousi 39 viikossa',
    laudat: {
      maailmankartta: { x: 5830.8, y: 1327.8 },
      europe: { x: 209.7, y: 541.2 },
    },
    teksti: 'Crystal Palace oli valuraudasta ja tasolasista tehty '
      + 'rakennus, joka pystytettiin Hyde Parkiin vuoden 1851 suurta '
      + 'maailmannäyttelyä varten. Puutarhuri Joseph Paxtonin '
      + 'suunnittelema halli oli 564 metriä pitkä ja sisältä 39 metriä '
      + 'korkea, ja sen 293 000 lasiruutua saatiin paikoilleen 39 '
      + 'viikossa. Seinät ja katto olivat läpinäkyvät, joten sisällä ei '
      + 'tarvittu lamppuja lainkaan. Näyttelyn jälkeen rakennus '
      + 'purettiin ja koottiin uudelleen Sydenham Hillille Etelä-'
      + 'Lontooseen, missä se avattiin kesäkuussa 1854 entistä '
      + 'suurempana: 490 metriä pitkänä ja tynnyriholvikattoisena. '
      + 'Siellä se palveli konserttitalona ja näyttelyhallina '
      + 'kahdeksankymmentä vuotta.',
    lahde: 'en-Wikipedia "The Crystal Palace", johdanto, tietolaatikko '
      + 'ja osio "Sydenham Hill" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Rakennus paloi 1936, joten
     * `kadonnut: true` ja kortissa on vain tämä kuva.
     *
     * TÄMÄ KOHDE OSUU PÄIVÄKIRJAN AIKAAN SUORAAN, ja toisin kuin
     * Tuileries se osuu siihen ONNEKKAASTI: Sydenhamin lasipalatsi
     * seisoi 1854–1936, joten isoisä olisi vuonna 1873 voinut kävellä
     * sen sisään. Selite sanoo sen ääneen.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-crystal-palace.webp',
      kadonnut: true,
      selite: 'Crystal Palace oli aikansa suurin lasirakennus: vuoden '
        + '1851 maailmannäyttelyn halli, joka koottiin näyttelyn '
        + 'jälkeen uudelleen Sydenham Hillin laelle Etelä-Lontooseen. '
        + 'Siellä se seisoi kesäkuusta 1854 aina 30. marraskuuta 1936 '
        + 'asti, jolloin tulipalo tuhosi sen — isoisä ehti siis nähdä '
        + 'sen matkallaan 1873. Mäellä on nyt Crystal Palace Park, '
        + 'jonka pengerrykset ja vuoden 1854 dinosauruspatsaat ovat '
        + 'edelleen paikallaan.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  {
    /*
     * VANHA LONDON BRIDGE. −0,08778 E / 51,50806 N — en-Wikipedia
     * "London Bridge" (tietolaatikon coordinates). Piste on nykyisen
     * sillan paikka; keskiaikainen silta seisoi noin 30 metriä siitä
     * itään, mikä on laudan mittakaavassa alle sadasosa yksiköstä eikä
     * siis erotu omaksi pisteekseen. Yksi merkki riittää, ja se on
     * oikeassa paikassa.
     */
    id: 'vanha-london-bridge',
    nimi: 'Vanha London Bridge',
    tyyppi: 'muu',
    symboli: 'tekniikka',
    kysymykset: [
      'Millaista oli asua sillalla?',
      'Miksi sillan alitse oli vaarallista soutaa?',
    ],
    korostukset: ['Peter de Colechurch',
      'Nonsuch House|Nonsuch Housella'],
    nappi: 'Silta, jolla oli oma katu ja 140 taloa',
    laudat: {
      maailmankartta: { x: 5830.4, y: 1324.0 },
      europe: { x: 209.5, y: 538.9 },
    },
    teksti: 'Thamesin ylitse rakennettiin 1176 alkaen kivisilta, joka '
      + 'valmistui 1209. Sen aloitti pappi Peter de Colechurch, ja '
      + 'lopputulos oli noin 282 metriä pitkä: yhdeksäntoista pilaria '
      + 'ja yhdeksäntoista kaarta sekä nostosilta. Sillalla oli taloja '
      + 'alusta asti, koska niiden vuokrat maksoivat sillan '
      + 'kunnossapidon — 1300-luvun lopulla niitä oli 140, ja '
      + '1600-luvulla lähes kaikissa oli neljä tai viisi kerrosta. '
      + 'Jokainen talo oli myös kauppa, ja silta oli yksi Lontoon '
      + 'tärkeimmistä ostoskaduista. Vuosina 1577–1579 nostosillan '
      + 'torni korvattiin Nonsuch Housella, kaksoistalolla, joka oli '
      + 'aikanaan Lontoon toinen klassisin julkisivu. Talot purettiin '
      + '1758–1761 ja koko silta 1831.',
    lahde: 'en-Wikipedia "London Bridge", osio "Old London Bridge '
      + '(1209–1831)" ja tietolaatikko (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt fokuskohteet-grc.js:ssä.
     * `kadonnut: true`, ja selite tekee saman työn kuin vanhan St
     * Paulin selite: samassa kohdassa jokea on yhä silta, joten
     * pelaajalle on sanottava suoraan, ettei se ole tämä silta.
     *
     * ISOISÄN AIKA: keskiaikainen silta purettiin 1831, joten 1873
     * hänen alleen jäi Rennien graniittisilta — ja sekin on nyt
     * muualla, Arizonassa. Selite kertoo ketjun loppuun asti.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-vanha-london-bridge.webp',
      kadonnut: true,
      selite: 'Keskiaikainen London Bridge valmistui 1209 ja kantoi '
        + 'yli kuudensadan vuoden ajan kokonaista katua: parhaimmillaan '
        + '140 taloa, joista jokainen oli myös kauppa. Talot purettiin '
        + '1761 ja itse silta 1831. Samassa kohdassa jokea menee yhä '
        + 'silta, mutta se on eri silta: isoisä kulki 1873 John '
        + 'Rennien graniittisillan yli, joka myytiin 1968 ja pystytettiin '
        + 'uudelleen Arizonaan, ja nykyinen betonisilta on vuodelta 1973.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
