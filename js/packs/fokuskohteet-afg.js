/*
 * FOKUSKOHTEET — AFGANISTAN. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-irn.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Afganistanissa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Afganistanilla ei
 * ollut vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo
 * olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.AFG, tiedosto
 * AFG.webp), joten merkillä on lehti, jonka päälle asettua. Se oli
 * lisäyksen ainoa tekninen ehto. Tiedosto on tarkoituksella yhden
 * kohteen mittainen ja odottaa ensimmäistä varsinaista
 * Afganistan-erää.
 *
 * ── ESITYSTAPA: TÄHTI, VAIKKA PAIKKA ON OLEMASSA ───────────────────
 *
 * Tämä oli erän vaikein valinta, joten se kirjoitetaan auki.
 *
 * Kallio, syvennykset ja niitä ympäröivät luolat ovat paikallaan, ja
 * Bamiyanin laakso on Unescon maailmanperintökohde. Jos kohde olisi
 * "Bamiyanin laakso", esitystapa olisi `kadonnut: false` ja kortissa
 * olisi valokuva.
 *
 * KOHDE EI KUITENKAAN OLE LAAKSO VAAN PATSAAT. Ne tuhottiin
 * maaliskuussa 2001, eikä niitä ole. Raamatun sääntö sanoo: kokonaan
 * kadonnut kohde saa tähden ja kortin kuva aukeaa suoraan ihmekuvaan.
 * Patsaat ovat kokonaan kadonneet, joten `kadonnut: true`.
 *
 * VALOKUVAKAAN EI TOIMISI. Olemassa olevan kohteen pääkuva on sääntöjen
 * mukaan valokuva siitä, mitä paikalla NYT on — tässä siis kuva
 * tyhjästä syvennyksestä. Se ei olisi kuva kohteesta vaan kuva sen
 * puuttumisesta, ja tuhon kuvaaminen on nimenomaan se, mitä tämä peli
 * ei tee. Tähti ja yksi kuva siitä, mitä siinä oli, kertoo saman asian
 * rehellisemmin — ja selite sanoo suoraan sekä sen, milloin patsaat
 * tuhottiin, että sen, että kallio ja syvennykset ovat yhä paikallaan.
 *
 * ── AIHE ON RAJATTU NEUTRAALIKSI ───────────────────────────────────
 *
 * Peli kertoo tuhon tapahtumana ja päivämääränä ja nimeää tekijän niin
 * kuin lähdeartikkeli sen nimeää, muttei kuvaile tuhoa eikä sen
 * tekijöiden muuta toimintaa. Sama rajaus kuin Syyrian tiedostossa
 * (js/packs/fokuskohteet-syr.js) ja Perustuslain ikäsopivuuskohdan
 * mukainen.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`. Kaava on maailmankartan Millerin
 * lieriö (LEVEYS 12000 / LON0 −175 / POHJOINEN 76,
 * tools/tee-fokuskartta.mjs laudanProjektio), validoitu ennen käyttöä
 * jo kirjatuilla kohteilla. Piste osuu AFG-lehden rajaukseen
 * (x 7763–8416, y 1799–2262), ja Kabulin laatta on 47 lautayksikköä
 * kaakossa — merkit eivät osu päällekkäin.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli
 * "Buddhas of Bamiyan" 27.8.2026 — ei työaineistoa, joten lähderivi
 * osoittaa suoraan artikkeliin.
 */
export const FOKUSKOHTEET_AFG = [
  {
    /*
     * BAMIYANIN BUDDHAT. 67,8267 E / 34,8320 N — en-Wikipedia "Buddhas
     * of Bamiyan" (tietolaatikon coordinates). Piste on laakson
     * pohjoisseinämä, jossa molemmat syvennykset ovat.
     */
    id: 'bamiyanin-buddhat',
    nimi: 'Bamiyanin buddhat',
    tyyppi: 'muu',
    symboli: 'kulttuuri',
    kysymykset: [
      'Miksi patsaat veistettiin juuri tähän laaksoon?',
      'Mitä laakson luolissa on?',
    ],
    korostukset: ['Silkkitie|Silkkitien', 'stukko|stukolla'],
    nappi: 'Kaksi jättiläistä kalliossa',
    laudat: {
      maailmankartta: { x: 8094.2, y: 2001.7 },
    },
    teksti: 'Bamiyanin laaksossa, 130 kilometriä Kabulista '
      + 'luoteeseen ja 2 500 metrin korkeudessa, seisoi kalliossa '
      + 'kaksi jättiläismäistä buddhaa. Pienempi, 38-metrinen '
      + '"itäinen buddha" veistettiin noin vuonna 570 ja suurempi, '
      + '55-metrinen "läntinen buddha" noin 618. Kummankin runko '
      + 'hakattiin suoraan hiekkakiveen, mutta yksityiskohdat — '
      + 'kasvot, kädet ja viitan laskokset — muotoiltiin oljensekaisesta '
      + 'savesta, päällystettiin stukolla ja maalattiin; suurempi oli '
      + 'karmiininpunainen, pienempi monivärinen. Laakso oli '
      + 'buddhalainen pyhiinvaelluspaikka Silkkitien varrella 100-luvulta '
      + 'alkaen, ja patsaiden ympärillä on satoja luolia, joiden seiniä '
      + 'koristavat 500–700-luvuilla maalatut kuvat. Tšingis-kaanin '
      + 'joukot valtasivat laakson 1221 mutta jättivät patsaat '
      + 'koskematta. Taleban räjäytti molemmat patsaat maaliskuussa 2001; '
      + 'kallio, tyhjät syvennykset ja maalatut luolat ovat yhä '
      + 'paikallaan, ja laakso on vuodesta 2003 ollut Unescon '
      + 'maailmanperintökohde.',
    lahde: 'en-Wikipedia "Buddhas of Bamiyan", johdanto sekä osiot '
      + '"History" ja "Artworks" (tarkistettu 27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa; esitystavan perustelu tämän tiedoston
     * alussa. Kortissa on vain tämä kuva.
     *
     * SELITTEEN ON SANOTTAVA MOLEMMAT ASIAT: patsaita ei ole, ja
     * kallio syvennyksineen on. Muuten kuva joko väittäisi patsaiden
     * olevan paikallaan tai jättäisi pelaajan luulemaan, ettei
     * Bamiyaniin voi enää mennä.
     *
     * Loistoaika-v2 (kuvaputki, omistaja hyväksynyt 5.9.2026): kohde
     * omana aikanaan, ei nykyajan elementtejä.
     */
    ihme: {
      osoite: 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/ihmeet/ihme-bamiyan-loistoaika-v2.jpg',
      kadonnut: true,
      selite: 'Silkkitien matkalainen saapuu laaksoon päiviä kestäneen '
        + 'vuoristotaipaleen jälkeen ja näkee kallioon maalatut jättiläiset '
        + 'ensimmäistä kertaa. Luolissa elävät munkit, kauppakaravaanit ja '
        + 'pyhiinvaeltajat tekevät paikasta enemmän kuin kaksi patsasta: se '
        + 'on levähdyspaikka, jossa kielet, tavarat ja uskonnot kohtaavat.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana '
        + 'aikanaan. Faktat: UNESCO World Heritage Centre — Bamiyan Valley, '
        + 'tarkistettu 5.9.2026.',
      url: 'https://whc.unesco.org/en/list/208/',
    },
  },
];
