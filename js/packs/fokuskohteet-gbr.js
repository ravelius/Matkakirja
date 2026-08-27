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
 * Paul's Cathedral" ja "St Paul's Cathedral" 27.8.2026 — ei
 * työaineistoa, joten lähderivi osoittaa suoraan artikkeleihin.
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
];
