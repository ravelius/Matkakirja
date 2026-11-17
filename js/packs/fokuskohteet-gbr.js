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
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'St Paulin kirkko',
    tyyppi: 'historia',
    symboli: 'historia',
    kysymykset: [
      'Miksi torninhuippua ei rakennettu takaisin?',
      'Mitä kirkon sisällä tehtiin muuta kuin rukoiltiin?',
      // Kolmas kysymys uusi (nostolla tasan kolme; SK 17.11.2026): syy lähteessä (Leicesterin erikoiskokoelmat: rakennustelineet levittivät tulen).
      'Miten Lontoon suuri palo levisi vanhaan St Pauliin?',
    ],
    korostukset: ['Ludgate Hill|Ludgate Hillillä',
      'Lontoon suuri palo',
      'Christopher Wren|Christopher Wrenin'],
    // Nappi ei paljasta tehtävän vastausta (St Paulin nosto uudella tavalla, SK 17.11.2026).
    nappi: 'Kirkko, johon salama iski',
    laudat: {
      maailmankartta: { x: 5830.1, y: 1323.7 },
      europe: { x: 209.3, y: 538.8 },
    },
    // teksti lasketaan jaksoista tiedoston lopussa.
    lahde: 'Matkakirjan oma teksti · lähteinä Tudor Society, The History of London, Leicesterin yliopiston erikoiskokoelmat, '
      + 'The Freelance History Writer ja St Paulin katedraalin oma aikajana (tarkistettu 17.11.2026).',
    /*
     * ST PAUL, NOSTO UUDELLA TAVALLA (SK 17.11.2026; P-261117-96; malli Tuileries ja Eiffel-torni). Luonnos ja lähdetaulukko:
     * docs/raportit/trevi-stpauls-tarinaluonnos-20261117.md (luku 2; KK 15.36 korjaukset: torninhuippu, "vain raunion").
     * Koukku on kertojan (ei isoisän lausetta: kaanonissa ei ole St Paulin hetkeä). Vuosi 1710 ei ole vuosirivillä (KK 15.36).
     * Kohdekartan piste (maakartat.js, `nosto: 'st-paulin-katedraali'`) avaa tämän. Vanha St Paul (kadonnut ihme, L5) on erikseen.
     */
    otsikko: 'St Paul 1561 — huippu, jonka salama sytytti',
    jaksot: [
      // Noston alku: kertojan nimi ennen koukkua (omistaja 19.23 F). Isoisän lausetta ei ole, joten esittelyä ei tarvita.
      { osa: 'nimi', teksti: 'St Paulin katedraali.' },
      {
        osa: 'koukku',
        teksti: 'Kesäkuussa 1561 Lontoon yllä jylisee ukkonen. Iltapäivällä salama iskee St Paulin kirkon tornin '
          + 'huippuun. Huippu on puuta ja katettu lyijyllä, ja se syttyy palamaan.',
        kuva: 'huipulla',
        vuodet: [{ vuosi: '1561', selite: 'huipun tulipalo', kohta: 'Kesäkuussa 1561' }],
      },
      {
        // Ei kuvaa: havainnekuvaa (salama ja palava huippu) ei tilata (P-261117-96); edellinen kuva jää näkyviin.
        osa: 'tapahtuma',
        teksti: 'Sulanut lyijy valuu kirkon katoille, ja kirkon kellot sulavat. Palava huippu romahtaa '
          + 'kirkkosalin katon läpi.',
      },
      {
        osa: 'kaanne',
        teksti: 'Kuningatar Elisabet lahjoittaa korjaukseen rahaa ja puutavaraa, ja kirkon katot uusitaan. '
          + 'Huippua ei rakenneta koskaan uudelleen. Tornin runko jää pystyyn ilman sitä.',
        kuva: 'longview',
      },
      {
        // Hollarin palokuva (Yale, CC0) jäi pois: viimeisen jakson pääkuvan pitää olla valokuva (tests/noston-jaksot.test.mjs).
        osa: 'tanaan',
        teksti: 'Vuonna 1666 Lontoon suuri palo jättää vanhasta kirkosta vain raunion. Tilalle nousee Christopher '
          + 'Wrenin kupolikirkko, joka seisoo Ludgate Hillillä yhä. Sen yllä kohoaa kupoli, ei torninhuippua.',
        kuva: 'kupoli',
        vuodet: [
          { vuosi: '1666', selite: 'Lontoon suuri palo', kohta: 'Vuonna 1666' },
          { vuosi: '1675', selite: 'Wrenin kirkko alkaa', kohta: 'nousee' },
        ],
      },
    ],
    jaksokuvat: {
      huipulla: {
        tiedosto: 'Wenceslas Hollar Old St Paul\'s Cathedral with spire.jpg',
        laji: 'piirros',
        lyhyt: 'Vanha St Paul torninhuippuineen',
        lahde: 'Wenceslaus Hollar (jälkikäsittely Bob Castle), Wikimedia Commons (PD); kaiverrus 1600-luvulta',
      },
      longview: {
        tiedosto: '1647 Long view of London From Bankside - Wenceslaus Hollar (cropped).jpg',
        laji: 'piirros',
        lyhyt: 'St Paul Hollarin kaiverruksessa 1647',
        lahde: 'Wenceslaus Hollar, Wikimedia Commons (PD)',
      },
      kupoli: {
        tiedosto: 'St Paul\'s Cathedral Dome 2020 Exterior Ground.jpg',
        laji: 'valokuva',
        lyhyt: 'Wrenin kupolikirkko Ludgate Hillillä',
        lahde: 'Julian Herzog, Wikimedia Commons (CC BY 4.0)',
      },
    },
    // Yksi kysymys (uusi; kohteella ei ollut tehtävää): vastaus on jaksossa 3, eikä kuvateksti tai vuosirivi paljasta sitä.
    visa: {
      kysymys: 'Mitä St Paulin palaneelle torninhuipulle lopulta tehtiin?',
      vaihtoehdot: [
        'Sitä ei rakennettu uudelleen',
        'Se rakennettiin heti uudelleen entistä korkeammaksi',
        'Se rakennettiin uudelleen kivestä',
      ],
      oikea: 0,
      fakta: 'Salama sytytti St Paulin puisen torninhuipun vuonna 1561, eikä sitä koskaan rakennettu uudelleen; '
        + 'tornin runko jäi pystyyn ilman huippua.',
    },
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
      lyhyt: 'Christopher Wrenin kupolikirkko Ludgate Hillillä valmistui 1710 palaneen edeltäjänsä paikalle.',
      selite: 'Christopher Wrenin kupolikirkko Ludgate Hillillä. Se '
        + 'valmistui 1710 palaneen keskiaikaisen edeltäjänsä paikalle.',
      lahde: 'Julian Herzog, Wikimedia Commons (CC BY 4.0)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:St_Paul\'s_Cathedral_Dome_2020_Exterior_Ground.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`:
     * kartalla säilyy historian pylväs ja valokuvan alle tulee "Koe
     * ihme" -nappi.
     *
     * KUVATEKSTIN VIERESSÄ SANOTAAN, ETTÄ KUVAN KIRKKO ON EDELTÄJÄ.
     * Tämä on erän ainoa ihme, jossa kuvan rakennus ja pääkuvan
     * rakennus ovat eri rakennuksia, joten pelaajalle on kerrottava se
     * ennen kuin hän ehtii luulla muuta. 4.9.2026 selite vaihtui
     * kuvaputken sanatarkkaan kuvatekstiin, joka ei sano sitä — siksi
     * edeltäjämaininta on nyt LÄHDERIVILLÄ, jonka kortti piirtää heti
     * selitteen perään (js/fokuskohteet.js piirraKohdeKuva). Vartio
     * lukee molemmat (tests/fokusvirta.test.mjs).
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-vanha-st-paul.webp',
      kadonnut: false,
      lyhyt: 'Kirjapainon oppipoika kuiskaa uutisen toritytölle; sana kulkee nopeammin kuin painokone.',
      selite: 'Kirjapainon oppipoika kuiskaa tuoreen uutisarkin sisällön '
        + 'toritytölle, joka ei osaa lukea mutta tietää heti, kenelle '
        + 'tieto kannattaa myydä. Katedraalin varjossa uutinen kulkee '
        + 'suusta suuhun nopeammin kuin painokone ehtii tehdä seuraavan '
        + 'arkin.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'omana aikanaan. Kuvan kirkko on nykyisen katedraalin '
        + 'EDELTÄJÄ: keskiaikainen St Paul, joka tuhoutui Lontoon '
        + 'suuressa palossa 1666. Faktat: St Paul’s Cathedral — Our '
        + 'timeline.',
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
    tyyppi: 'tekniikka',
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
     *
     * Loistoaika-v2 (kuvaputki, omistaja hyväksynyt 5.9.2026): kohde
     * omana aikanaan, ei nykyajan elementtejä.
     */
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-crystal-palace-loistoaika-v2.jpg',
      kadonnut: true,
      lyhyt: 'Lapsi näkee Crystal Palacen valosta tehtynä rakennuksena, jonka sisällä on koko maailmannäyttely.',
      selite: 'Kuvan perheen nuorin näkee mäen laelta rakennuksen, joka '
        + 'näyttää olevan tehty lähes kokonaan valosta. Vanhemmille päivä '
        + 'Crystal Palacessa maksaa aikaa ja rahaa, mutta sisällä odottavat '
        + 'Egypti, Assyria, Alhambra ja kokonainen maailmannäyttely samojen '
        + 'lasiseinien alla — juuri sellainen ihme, jonka isoisäkin olisi '
        + 'vuonna 1873 voinut kokea.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana '
        + 'aikanaan. Faktat: Victoria and Albert Museum — Philip Henry '
        + 'Delamotte and Crystal Palace, tarkistettu 5.9.2026.',
      url: 'https://www.vam.ac.uk/info/collection-selection-boxes-photography-processes-and-techniques',
    },
  },
  {
    /*
     * VANHA LONDON BRIDGE. −0,08702 E / 51,50808 N — keskiaikaisen sillan
     * keskikohta (siirretty 15.11.2026: en-Wikipedian tietolaatikon piste
     * −0,08778 / 51,50806 on nykyisen sillan paikka). Vanha silta seisoi
     * keskiviivalta mitaten 43 m nykyisestä alavirtaan (itään); piste on sama
     * kuin hologrammin kehyksen origo. Laudan mittakaavassa ero on alle
     * sadasosa yksiköstä, joten laudan x/y ei muutu. Yksi merkki riittää.
     */
    id: 'vanha-london-bridge',
    nimi: 'Vanha London Bridge',
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'London Bridge',
    tyyppi: 'tekniikka',
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
      lyhyt: 'Vesimiehen oppipoika ohjaa venettä sillan alitse, jonka päällä ihmiset asuvat ja käyvät kauppaa.',
      selite: 'Vesimiehen oppipoika huomaa virran vetävän venettä kohti '
        + 'liian kapeaa kaarta ja yrittää jäljitellä mestarinsa '
        + 'airoliikettä puoli tahtia myöhässä. Heidän yläpuolellaan '
        + 'ihmiset asuvat, käyvät kauppaa ja syövät päivällistä '
        + 'keskellä siltaa — mutta joella yksi väärä veto voi päättää '
        + 'työpäivän.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'omana aikanaan. Faktat: London Museum — London Bridge.',
    },
  },
];

/*
 * ST PAUL (nosto uudella tavalla): kohteen `teksti` = jaksot kappaleina ilman nimiosaa, kuten fokuskohteet-fra.js:ssä.
 * Vanha esitys, lehti ja Pulun konteksti lukevat saman tekstin kuin jaksoesitys.
 */
for (const kohde of FOKUSKOHTEET_GBR) {
  if (Array.isArray(kohde.jaksot) && kohde.teksti == null) {
    kohde.teksti = kohde.jaksot.filter((j) => j.osa !== 'nimi').map((j) => j.teksti).join('\n\n');
  }
}
