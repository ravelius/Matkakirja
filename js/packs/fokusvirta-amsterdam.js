/*
 * AMSTERDAMIN FOKUSVIRTA — annostelun sisältö dataksi. AALTO 4A.
 *
 * Sisartiedosto js/packs/fokusvirta-dubrovnik.js:lle ja
 * js/packs/fokusvirta-tukholma.js:lle: samat kentät, sama järjestys,
 * sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 29.8.2026, aallon 4A kaanontekstit):
 * matkakirjan paikkarivi, matkakirjan teksti, LIVIAN HUOMIO
 * (`pollo.teksti`) ja aarremerkinnän teksti ovat SANATARKASTI hänen
 * kirjoittamansa — sanajärjestystä ei ole muutettu eikä tekstiä
 * lyhennetty. Luenta on sama teksti tunnetagein; yksikään sana ei
 * vaihdu. Kaikki muu tässä tiedostossa on tämän paketin omaa työtä.
 *
 * ISO AARRE: VOC-kauppalaivan hopealasti. PIENI AARRE: kori
 * tulppaanisipuleita (js/packs/paikallisaarteet.js, NLD) — molemmat
 * saavat tässä paketissa oman vastineensa: hopealastin täky
 * 'voc-hylky' ja tulppaanisipulien täkynosto 'tulppaanimania'.
 *
 * FAKTAPOHJA. Aallon 4A maille EI ole valmista takynostot-työaineistoa,
 * joten täyt, oppitunti, lehtitehtävät ja täkynostot on rakennettu
 * kahdesta lähteestä ja vain niistä:
 *
 *   1. PELIN OMA KURATOITU AINEISTO. Amsterdamin kaupunkilehti
 *      (js/packs/kulttuuri-kategoriat.js, amsterdam: osiot 'kaupunki'
 *      ja 'taide' sekä avauskuvat) ja Alankomaiden maalehti
 *      (js/packs/maa-kategoriat.js, NLD: historia, luonto, keksinnöt,
 *      arki). Nämä on jo kertaalleen tarkistettu ja hyväksytty peliin
 *      — myös niiden KUVAT, joita tämä paketti lainaa sellaisinaan.
 *   2. TARKISTETUT LISÄTIEDOT. Jokainen väite, jota pelidatassa ei ole,
 *      on haettu Wikipedian rajapinnasta 29.8.2026 ja katsottu
 *      KAHDESTA riippumattomasta lähteestä. Ne on nimetty kunkin
 *      kohdan omassa kommentissa. Mitään ei ole päätelty eikä
 *      pyöristetty.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Livian kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, amsterdam/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KOHDENOSTOT PUUTTUVAT, JA SE ON TIETOINEN ──────────────────────
 *
 * `kohteet`-kenttä lukee maan fokuskohdelistan (esim. js/packs/
 * fokuskohteet-hrv.js). Alankomaille sellaista tiedostoa ei ole, eikä
 * tämä paketti luo sitä — rajaus on yhden tiedoston kokoinen. Kun
 * NLD-lista joskus syntyy, kohdenostot ovat tänne yhden rivin lisäys.
 *
 * ── KOHTAAMINEN ON LUONNOS ─────────────────────────────────────────
 *
 * Kohtaamisen teksti on EHDOTUS päätoimittajalle (ks. FABLE KATSELMOI
 * alempana), ei kaanonia. Kuvaa siinä ei ole. Hahmo ja laattakysymys
 * tulevat tarinakaaren paketista (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, 'amsterdam'): muuttotyöntekijä Yara ja kysymys
 * kanavatalojen päädyissä olevasta koukusta (henkilö vaihdettu
 * 5.9.2026, ks. KOHTAAMINEN alempana).
 *
 * ── ÄÄNITE ─────────────────────────────────────────────────────────
 *
 * `matkakirja.luenta` on valmis ja `matkakirja.aanite` osoittaa
 * polkuun assets/audio/puhe-fokus-matkakirja-amsterdam.mp3. Luenta on
 * generoitu 29.8.2026 (tools/generoi-luennat.mjs) ja tiedosto on sekä
 * repossa että ämpärissä, joten kaiutin soi. Teksti ja luenta ovat
 * sanasta sanaan samat: tekstin muutos vaatii uuden generoinnin.
 *
 * ── REKISTERÖINTI ──────────────────────────────────────────────────
 *
 * Tätä tiedostoa EI ole kytketty rekisteriin (js/packs/fokusvirrat.js);
 * kytkentä on integroijan yhden rivin työ, ja se tehdään vasta kun
 * kohtaamisen sanamuoto on katselmoitu.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 29.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions-kenttä) — ei arvattuja nimiä. Kaikki ovat PD, CC0,
 * CC BY tai CC BY-SA, ja tekijä on `lahde`-rivillä. Ihmisiä
 * sisältävät kuvat on katsottu silmin.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Yövartio-kysymys on Amsterdamin lehden sivun
 * 2 ("Taide") oman noston "Yövartiosta sahattiin palat pois" tekstiä ja
 * paalukysymys sivun 1 ("Amsterdam") oman noston "Koko kaupunki seisoo
 * puutukkien päällä" tekstiä (js/packs/kulttuuri-kategoriat.js). Uusia
 * faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI NOSTOKOUKKUKYSYMYSTÄ: kaupungin laattakysymys koskee
 * kanavatalon päädyssä olevaa koukkua (ks. KOHTAAMINEN alempana). Jos
 * lehden aarteen avaava tehtävä kysyisi samasta koukusta, aarrekysymys
 * olisi ratkaistu ennen kuin Yaraa on tavattu.
 *
 * HUOM. SIVUN 1 KULTTUURIVISA on Amsterdamin oma kysymys kapeista
 * kanavataloista (js/packs/europe-kulttuuri.js), ja js/fokustehtavat.js
 * pukee sen samaksi AARTEEN AVAUS -laatikoksi ilman omaa riviään
 * täällä. Se sivuaa oppitunnin aihetta muttei vastaa laattakysymykseen:
 * kapeuden syy on vero, koukun syy on portaat.
 */
const YOVARTIO_VISA = {
  kysymys: 'Rembrandtin Yövartiota leikattiin vuonna 1715 joka '
    + 'reunalta. Miksi?',
  vaihtoehdot: [
    'Reunat olivat vaurioituneet kosteudessa',
    'Taulu ei mahtunut sille varatulle seinälle',
    'Tilaajat maksoivat vain kuvassa näkyvistä miehistä',
  ],
  oikea: 1,
  fakta: 'Eniten katosi vasemmalta, eikä palasia ole koskaan löydetty. '
    + 'Gerrit Lundensin pieni 1600-luvun kopio näyttää, miltä koko '
    + 'taulu näytti.',
};

const PAALU_VISA = {
  kysymys: 'Damin aukion kaupungintalon, nykyisen kuninkaanpalatsin, '
    + 'ensimmäinen kivi laskettiin 28. lokakuuta 1648. Kuinka monen '
    + 'puupaalun varaan se pystytettiin?',
  vaihtoehdot: [
    '13 659 paalun',
    '54 300 paalun',
    '2 137 paalun',
  ],
  oikea: 0,
  fakta: 'Veden alla paalu säilyy pitkään. Jos pohjavesi laskee, happi pääsee puuhun ja sienet alkavat lahottaa sitä.',
};

export const FOKUSVIRTA_AMSTERDAM = {
  kaupunki: 'amsterdam',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* Hyväksytty kuva; kuvatoimitus tarina14 14.9.2026, manifesti posti/kuvatoimitus-tarina14-20260914.json */
    luentakuva: {
      osoite: 'https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-amsterdam-i1-r20260914-tarina-v1.jpg',
      lyhyt: 'Amsterdam, 1873. Kanavatalon ullakolle mahtui kokonainen kirkko.',
      selite: 'Pappi seisoo kapean ullakkokirkon alttarin vierellä puuparvien alla. Kirkko rakennettiin kolmen kanavatalon ullakoille 1660-luvulla, kun katolinen jumalanpalvelus oli julkisesti kielletty.',
      lahde: 'Matkakirjan havainnekuva',
      lahteet: [
        'https://opsolder.nl/en/the-monument/',
      ],
    },
    /* Isoisällä yksi kuva (omistaja 12.11.): ullakkokirkon i1 jää; urkukuva (i2) pois (SK 16.11.2026, KK 01.08). */
    /* KAANON (Fable) — paikkarivi sellaisenaan; toinen virke on kortin
       tunnelmarivi (Fablen kaanon 8.9.2026). */
    paikkarivi: 'Amsterdam, toukokuussa 1873. Tuulista; kanavat väreilevät; '
      + 'puntari putoaa.',
    /* KAANON: lyhennetty nykyinen teksti (KK 16.11.2026 klo 01.08; SK:n luonnos docs/raportit/amsterdam-isoisa-pulu-luonnos-20261116.md, PR 6830). Sanasta sanaan. 253 merkkiä. */
    teksti: "Kanavatalon ullakolta löysin kokonaisen kirkon urkuineen. Se rakennettiin aikana, jolloin katoliset eivät saaneet pitää messua julkisesti. Kysyin papilta kuiskaten, tiesivätkö viranomaiset. Olivat tienneet jo kauan. Sitten urut soivat, ja penkki värisi.",
    /*
     * LUENTA = sama teksti tunnetagein (Raamattu, luentaprosessi):
     * neljä tagia, alku ja loppu eri sävyssä, yksikään sana ei vaihdu.
     */
    /*
     * TEKSTIN SISÄISET REAKTIOT (omistaja 11.9.2026, Raamattu PULU REAGOI
     * TEKSTIN SISALLA; docs/pulu-reaktiot.md "Luentareaktiot"; Marseillen
     * pilotin laajennus). Ankkuri on katkelma luentatekstistä sanasta
     * sanaan ja osuu tekstiin tasan kerran; hetki lasketaan äänitteen
     * sanakohtaisista aikaleimoista (forced alignment), ei merkkimäärästä.
     * Tarkoitus: myotailee | epailee | torjuu | huvittuu | hammastyy |
     * vakavoituu. siirtyma = ms ankkurin viimeisen sanan lopusta; 0, koska
     * reaktio kuuluu juuri ankkurinsa kohtaan eikä viimeiselle sanalle saa
     * antaa positiivista siirtymää (luonnollinen loppu hoitaa sen).
     * Hiljaiset osuudet: "Se riippui katon koukusta" (tekninen selitys).
     */
    reaktiot: [
  {
    "id": "amsterdam.r1",
    "ankkuri": "ullakolta löysin kokonaisen kirkon urkuineen",
    "tarkoitus": "hammastyy",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "amsterdam.r2",
    "ankkuri": "katoliset eivät saaneet pitää messua julkisesti",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "amsterdam.r3",
    "ankkuri": "Kysyin papilta kuiskaten",
    "tarkoitus": "epailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "amsterdam.r4",
    "ankkuri": "Olivat tienneet jo kauan",
    "tarkoitus": "huvittuu",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "amsterdam.r5",
    "ankkuri": "urut soivat, ja penkki värisi",
    "tarkoitus": "hammastyy",
    "voimakkuus": 0.45,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: isoisän uusi ääni (kaupunki-intro-v3, ÄÄ otto, teksti ilman tageja, 18,55 s; JU vienyt 16.11.2026 11.49), ämpärin täysi osoite kuten Pariisissa, Lontoossa, Wienissä ja Roomassa. */
    luenta: "[curious] Kanavatalon ullakolta löysin kokonaisen kirkon urkuineen. Se rakennettiin aikana, jolloin katoliset eivät saaneet pitää messua julkisesti. Kysyin papilta kuiskaten, tiesivätkö viranomaiset. Olivat tienneet jo kauan. [warmly] Sitten urut soivat, ja penkki värisi.",
    aanite: 'https://media.matkakirja.app/aanet/kaupunki-intro-v3/isoisa-amsterdam.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era01; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Hyväksytty kuva; kuvatoimitus tarina14 14.9.2026, manifesti posti/kuvatoimitus-tarina14-20260914.json
     */
    /*
     * PULUN KUVA (omistaja 16.11.2026 klo 08.44 "Tämä kuva (Recommended)"; KK 08.44): Codexin havainnekuva Stationsplein-pyörähallista,
     * tehtävä #2349 (22b5804e2e); vanhat havainnekuvat p1/p2 ja Hay Kranenin Commons-valokuva (hylätty 08.16) pois.
     * Lähde: /Users/Shared/Claude/pulu-kuvaesikatselut/amsterdam-pyorahalli-codex-v2.jpg (neliö 1254 px; rajaus = koko neliö ympyrään, KK katsoi).
     * Kuva viedään ämpäriin (JU/PT) osoitteeseen alla ennen yhdistämistä. Lähderivi: Codex-havainnekuva, ei valokuvaajaa.
     * `lyhyt` ja `selite` ovat SK:n luonnos (faktat: Stationsplein-halli avattiin tammikuussa 2023, tilaa 7 000 pyörälle;
     * cities-today.com, bicyclenetwork.com.au, iamexpat.nl), KK tarkistaa.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-amsterdam-pyorahalli-codex-v2.jpg',
        lyhyt: 'Amsterdam: pyörähalli aseman edessä veden alla.',
        selite: 'Stationsplein-pyörähalli on rakennettu Amsterdamin keskusaseman edustan satama-altaan alle. Se avattiin tammikuussa 2023, ja siihen mahtuu 7 000 pyörää.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://cities-today.com/?p=57219',
          'https://bicyclenetwork.com.au/newsroom/2023/01/31/amsterdams-underwater-bike-garage-opens-with-7000-spaces/',
        ],
      },
    ],
    /* Maadoitus poistettu 8.9.2026 (omistaja: yksi kupla per kaupunki); kupla alla. */
    /* KUPLA: lyhennetty nykyinen teksti (KK 16.11.2026 klo 01.08). Sanasta sanaan. 152 merkkiä. */
    kommentti: ["Aseman edessä on pyörähalli veden alla, seitsemälletuhannelle pyörälle! Kurkistin sisään. Ankka ui yllä tietämättä, että kävelin sen alla kuivin jaloin."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'ylpea', voimakkuus: 0.5 },
    /* KAANON (Fable) — Livian huomio sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Amsterdamissa on enemmän siltoja kuin Venetsiassa, mut '
      + 'siitä ei pidetä täällä isoa ääntä.. Ne kanavakehät näkyvät '
      + 'lentokoneesta kuin vuosirenkaat, ihan niin kuin isoisäsi '
      + 'kirjoitti — hän vaan ei tiennyt, että joku joskus näkisi ne '
      + 'ylhäältä. Kompanian laivoista osa makaa yhä merenpohjassa. '
      + 'Muista se kohta.',
    /*
     * HEROKUVA on kaupunkilehden oman avauskarusellin generoitu kuva
     * (js/packs/kulttuuri-kategoriat.js, amsterdam/avauskuvat) — sama
     * kuva, jonka pelaaja näkee lehden kannessa. Se on juuri
     * kanaalikehä, josta Livian huomio puhuu. Selite on lyhennetty
     * saman kuvan omasta selitteestä; yhtään uutta lukua ei ole
     * lisätty.
     */
    kuva: {
      ampari: 'herokoe/hero-amsterdam-kanaalikeha.jpg',
      lyhyt: 'Amsterdamin kanaalikehä alkoi 1613; 1600-luvun kehä on Unescon maailmanperintöä vuodesta 2010.',
      selite: 'Kanaalikehän kaivaminen alkoi 1613 kaupungin '
        + 'suunniteltuna laajennuksena, ja 1600-luvun kehä pääsi '
        + 'Unescon maailmanperintöluetteloon 2010.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  /*
   * KORJAUKSET 16.11.2026 (SK, KK:n päätös; sääntö lahteet-ja-tarkistus 11).
   * Lähteet ja perustelut: docs/raportit/amsterdam-tekstivirheet-korjaus-20261116.md.
   * Timantit: höyry 1800-luvun puolivälin tienoilta (korjattu 17.11.; DM + PIE14 + nl-WP), ei 1848/1860-lukuja, ei
   * Kimberleyä 1870, ei Euroopan suurinta, ei 1875, ei 10 000 eikä 70 %.
   * Amsterdam-laiva: yli 330 ihmistä, yli 20 arkkua, runsas kuukausi,
   * satoja vapaaehtoisia. Yövartio: lakka poistettiin osittain 1946–47 ja loput 1975–76 (korjattu 17.11., KK 18.55).
   * Kapein talo: viisi metriä syvä; julkisivuvero kerrottu legendana.
   * Alla olevat FAKTAT-kommentit ovat alkuperäisiltä ajoilta (1.9.2026).
   */
  takyt: [
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän kolmas virke on timanttihiomoista.
       * Isoisä osui kaupunkiin keskellä sen timanttialan suurinta
       * nousukautta eikä tiennyt sitä — täky kertoo, mihin hän oli
       * kävellyt sisään toukokuussa 1873.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - nl-Wikipedia "Algemene Nederlandse Diamantbewerkersbond",
       *     osio "De Amsterdamse diamantindustrie": Amsterdam oli
       *     1800-luvun lopulla ja 1900-luvun alussa maailman tärkein
       *     timanttikeskus; juuret ovat 1500-luvulla, kun Portugalista
       *     tulleet sefardijuutalaiset asettuivat kaupunkiin; hionta
       *     tehtiin aluksi kotona; ala oli yksi harvoista, joihin ei
       *     tarvinnut kuulua kiltaan, eikä juutalaisia päästetty
       *     kiltoihin; noin vuodesta 1820 hiomapyöriä pyöritettiin
       *     hevosvoimalla ja noin 1850 alkaen höyryllä; työntekijöitä
       *     oli 1 000 vuonna 1848 ja 1 400 vuonna 1860; vuosina
       *     1870–1873 Etelä-Afrikan löydöt ("Kaapse tijd") nostivat
       *     alan jyrkkään kasvuun, ja vuodesta 1875 kehitys pysähtyi
       *     lännen talouskriisiin; huippuvuosina alalla oli yli 10 000
       *     työntekijää, joista noin 70 prosenttia juutalaisia;
       *     työpäivä oli vähintään kaksitoista tuntia ilman taukoja
       *     hämärissä huoneissa, ja silmät ja keuhkot kärsivät;
       *     ammattikunta oli tarkasti porrastettu, ylimpänä halkojat
       *     ja hiojat; ANDB perustettiin 1894 Henri Polakin ja Jan van
       *     Zutphenin johdolla, ja se oli Alankomaiden ensimmäinen
       *     suuri hyvin järjestäytynyt ammattiliitto.
       *   - nl-Wikipedia "Diamantslijperij Boas" (johdanto ja osio
       *     "Geschiedenis"): veljekset Israël, Marcus ja Hartog Boas
       *     perustivat hiomon 1870 Nieuwe Keizersgracht 16:een, jossa
       *     hiomapyöriä pyörittivät hevoset; "Kaapse tijd" (1870–1876)
       *     seurasi Kimberleyn löydöistä Etelä-Afrikassa; kasvun takia
       *     veljekset päättivät 1878 rakentaa höyrykäyttöisen tehtaan
       *     Uilenburgerstraatille, ja se valmistui 1879; avatessaan se
       *     oli Amsterdamin ja Euroopan suurin timanttihiomo, joidenkin
       *     lähteiden mukaan koko maailman; rakennus on ollut
       *     rijksmonument vuodesta 1996, ja siinä toimii vuodesta 1990
       *     Gassan Diamonds.
       *
       * MITÄ EI KERROTA FAKTANA: "Kaapin ajan" päättymisvuosi. Lähteet
       * antavat eri luvun (1873 / 1876), joten teksti sanoo vain, mistä
       * nousu alkoi ja milloin se pysähtyi kriisiin.
       */
      id: 'timantit',
      nappi: 'Kivet, jotka lähtivät täältä kruunuihin',
      otsikko: 'Timanttikaupunki juuri sinä keväänä',
      teksti: 'Amsterdam oli 1600-luvun lopulta maailman timanttikaupunki. Hionta ei '
        + 'kuulunut kiltoihin, eikä juutalaisia olisi kiltoihin otettukaan; työ '
        + 'tehtiin aluksi kotona. Hiomapyöriä pyörittivät ensin naiset, 1820-luvulta hevoset ja 1800-luvun puolivälin tienoilta höyry.'
        + '\n\n'
        + 'Vuonna 1870 Etelä-Afrikasta saapui Amsterdamiin ensimmäinen '
        + 'raakatimanttien erä, ja alkoi Kaapin aika: nousukausi, jota kesti '
        + '1870-luvun puoliväliin. Työ oli raskasta ja vahingoitti työläisten keuhkoja. Vuonna 1894 timanttityöläiset perustivat oman '
        + 'ammattiliittonsa, Algemene Nederlandse Diamantbewerkersbondin.'
        + '\n\n'
        + 'Isoisäsi matkavuonna 1873 elettiin Kaapin aikaa. Boasin höyryhiomo Nieuwe Uilenburgerstraatilla valmistui vasta 1879; '
        + 'nykyään talossa on Gassanin timanttitehdas.',
      lahde: 'Matkakirjan oma teksti · lähteinä Diamantmuseum Amsterdam, Bronseman PIE-raportti 14 (1994), '
        + 'Algemene Nederlandse Diamantbewerkersbond, J. Kokin tutkimus ja Gassan',
      /*
       * Commons 29.8.2026: 2629×2029, CC0, Willem van de Poll, kuvattu
       * 1.1.1932, kuvaus "Slijpen van de diamant bij Van Moppes in
       * Amsterdam" (Fotocollectie Van de Poll, reportaasi
       * "Diamanthandel, slijperijen, -beurs"). Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on hioja työpöytänsä ääressä,
       * edessä vaakatasossa pyörivä hiomatahko; taustalla toinen
       * työntekijä. Arkistokuva työn ääressä, ei yksityishenkilön
       * kuvaa.
       *
       * KUVA ON VUODELTA 1932 EIKÄ 1873, ja selite sanoo sen ääneen —
       * kuva ei saa väittää olevansa isoisän ajalta.
       */
      kuva: {
        tiedosto: 'Slijpen van de diamant bij Van Moppes in Amsterdam, Bestanddeelnr 252-0343.jpg',
        lyhyt: 'Timantin hionta amsterdamilaisessa hiomossa 1932: kivi painetaan pyörivää timanttipölytahkoa vasten.',
        selite: 'Timantin hionta amsterdamilaisessa hiomossa vuonna '
          + '1932: kivi painetaan vaakatasossa pyörivää tahkoa vasten, '
          + 'ja tahkoon on hierottu timanttipölyä.',
        lahde: 'Willem van de Poll, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Miksi timanttien hionta oli Amsterdamissa '
          + 'vuosisatojen ajan erityisen usein juutalaisten työtä?',
        /*
         * PITUUSJAKAUMA (Raamattu, kysymyssääntö 2): oikea vaihtoehto
         * ei ole lyhin eikä pisin, ja väärillä on omat sivulauseensa.
         */
        vaihtoehdot: [
          'Kaupunki myönsi hiojille erioikeuden',
          'Raakatimantteja sai tuoda vain Portugalista',
          'Kiltajäsenyys ei ollut alalla pakollinen',
        ],
        oikea: 2,
        fakta: 'Hionta ei kuulunut kiltoihin, eikä juutalaisia olisi '
          + 'kiltoihin otettukaan. Työ tehtiin aluksi kotona.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja).
       *
       * MIKSI TÄMÄ TÄKY: merkintä ja Livian huomio ovat molemmat
       * vedestä ja kanavista. Tämä on saman veden nykyinen asukas —
       * ja tarina siitä, miten sata vuotta muutti linnun ja ihmisen
       * välimatkan.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - en-Wikipedia "Grey heron", osio "City life": harmaahaikara
       *     kykenee elämään kaupungeissa, joissa on sopivaa
       *     elinympäristöä ja pesäpaikkoja; Alankomaissa laji on
       *     asettunut viime vuosikymmeninä kaupunkeihin suurin määrin;
       *     Amsterdamin kaltaisissa kaupungeissa haikarat ovat
       *     jatkuvasti läsnä ja sopeutuneet nykyiseen kaupunkielämään;
       *     ne saalistavat tavalliseen tapaan mutta käyvät myös
       *     katutoreilla ja pikaruokakojuilla, jotkut yksilöt käyttävät
       *     hyväkseen ihmisiä, jotka ruokkivat niitä kotonaan, tai
       *     jakavat vapaa-ajankalastajien saalista; vastaavaa on
       *     havaittu pienemmässä mitassa Irlannissa.
       *   - nl-Wikipedia "Blauwe reiger", osiot "Blauwe reiger en de
       *     mens" ja "Bescherming": 2000-luvun alun Amsterdamissa osa
       *     harmaahaikaroista on täysin sopeutunut kaupunkielämään,
       *     niillä on vakituinen kojunsa, jolla ne ruokailevat, tai
       *     niitä ruokitaan säännöllisinä aikoina; laji rauhoitettiin
       *     Alankomaissa täysin vuonna 1963, mikä johti sopeutumiseen
       *     ihmiseen; ruokinnan takia linnut kestävät kovia talvia
       *     paremmin ja pesivät yhä aikaisemmin — kaupungeissa joskus
       *     jo tammikuun lopussa; ennen rauhoitusta, Jac. P. Thijssen
       *     aikaan noin 1900, haikarat pysyttelivät aina etäällä,
       *     näkivät jokaisessa liikkuvassa olennossa vihollisen,
       *     pesivät korkeimpien puiden latvoissa tai luoksepääsemättömien
       *     soiden ruovikoissa ja lensivät saalistusmailleen satojen
       *     metrien korkeudessa poissa laukausten ulottuvilta; pesät
       *     ovat suuria ja litteitä oksarakennelmia.
       */
      id: 'haikarat',
      nappi: 'Lintu, joka jonottaa kalakojulla',
      otsikko: 'Amsterdamin harmaahaikarat',
      teksti: 'Jos seisot kanavan sillalla tarpeeksi kauan, huomaat '
        + 'seuralaisen: harmaahaikaran, joka seisoo kaiteella kädenmitan '
        + 'päässä eikä ole tietääkseenkään. Sata vuotta sitten se olisi '
        + 'ollut mahdotonta. Lintutieteilijä Jac. P. Thijsse kirjoitti '
        + 'noin vuonna 1900, että haikara pitää aina etäisyyttä ja näkee '
        + 'jokaisessa liikkuvassa olennossa vihollisen: se pesii '
        + 'korkeimpien puiden latvoissa tai soiden ruovikoissa, lentää '
        + 'saalistusmailleen satojen metrien korkeudessa ja jähmettyy '
        + 'liikkumattomaksi puoleksi tunniksi, jos jokin epäilyttää. '
        + 'Alankomaissa laji rauhoitettiin täysin vuonna 1963, ja '
        + 'muutamassa sukupolvessa lintu vaihtoi mielensä. Nykyään '
        + 'Amsterdamin haikarat ovat kaupunkilaisia siinä missä muutkin: '
        + 'ne saalistavat kanavissa tavalliseen tapaan, mutta käyvät '
        + 'myös torikojuilla ja pikaruokapaikoilla, tuntevat omat '
        + 'ruokkijansa kellonaikoineen ja odottavat vapaa-ajankalastajan '
        + 'vieressä osuuttaan. Ruoan varmuus näkyy myös kalenterissa: '
        + 'kaupungissa haikarat aloittavat pesinnän joskus jo tammikuun '
        + 'lopussa, kun luonnossa on vielä talvi. Pesä on iso ja litteä '
        + 'risukasa puun latvassa, ja se on siellä koko vuoden — sama '
        + 'lintu, joka isoisäsi aikaan väisti ihmistä puolen '
        + 'peninkulman päähän, katsoo nyt hänen jälkeläistään silmiin '
        + 'sillankaiteelta.',
      lahde: 'en-Wikipedia "Grey heron" ja nl-Wikipedia "Blauwe reiger". '
        + 'Tarkistettu 1.9.2026.',
      /*
       * Commons 29.8.2026: 2048×1536, CC BY-SA 3.0, Apus apus, kuvattu
       * 21.11.2010, kuvaus "Grey heron (Ardea cinerea) on an Amsterdam
       * bridge". Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * haikara kaiteella jäätyvän kanavan rannassa, taustalla taloja,
       * asuntolaivoja ja raitiovaunu — ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Ardea cinerea - Amsterdam.jpg',
        lyhyt: 'Harmaahaikara kanavan sillan kaiteella Amsterdamissa; kaupungin haikarat elävät ihmisten seassa.',
        selite: 'Harmaahaikara seisoo sillan kaiteella amsterdamilaisen '
          + 'kanavan yllä; kaupungin haikarat elävät ihmisten seassa '
          + 'ympäri vuoden.',
        lahde: 'Apus apus, Wikimedia Commons (CC BY-SA 3.0)',
      },
      // Kysymykset kirjoitettu nykyisen tekstin faktoista (SK 17.11.2026, yhdistämisen vaihe A); Pulun vastaukset kirjoitettu 17.11.2026 (teksti Claudella ei vaadi lupaa), faktat kortin tekstistä ja lähteistä.
      kysymykset: [
        'Millainen harmaahaikara oli vielä noin vuonna 1900?',
        'Miksi kaupungin haikarat pesivät joskus jo tammikuun lopussa?',
      ],
      visa: {
        kysymys: 'Mikä muutti harmaahaikaran ja ihmisen välimatkan '
          + 'Alankomaissa vuonna 1963?',
        vaihtoehdot: [
          'Kaupungit alkoivat maksaa palkkiota pesistä',
          'Laji rauhoitettiin Alankomaissa täysin',
          'Kanavat puhdistettiin, ja kalat palasivat',
        ],
        oikea: 1,
        fakta: 'Rauhoituksen jälkeen linnut alkoivat myös hyötyä '
          + 'ruokinnasta: ne kestävät kovat talvet paremmin ja pesivät '
          + 'kaupungeissa joskus jo tammikuun lopussa.',
      },
    },
    {
      /*
       * MIKSI TÄMÄ TÄKY: merkinnän viimeinen virke on Kompanian
       * laivoista, jotka eivät palanneet, ja Livia sanoo suoraan, että
       * osa niistä makaa yhä merenpohjassa. Tämä on yksi niistä
       * laivoista — se, joka ei päässyt edes Kanaalin yli.
       *
       * TÄKY EI PALJASTA AARRETTA. Aarremerkintä (tiedoston lopussa)
       * aukeaa vasta löydön jälkeen, ja se puhuu satamakonttorin
       * listasta eikä tästä hylystä. Pohjustus on tarkoituksellinen ja
       * hiljainen, samaan tapaan kuin Dubrovnikin Sponza-täky.
       *
       * FAKTAT (EI PELIDATASSA — tarkistettu 29.8.2026 kahdesta
       * riippumattomasta lähteestä):
       *   - nl-Wikipedia "Amsterdam (schip, 1748)" (johdanto sekä osiot
       *     "Eerste reis", "Ondergang", "Archeologisch erfgoed" ja
       *     "Replica"): VOC:n spiegelretourschip, rakennettu 1748
       *     yhtiön omalla telakalla Amsterdamissa; lähti Texelin
       *     redeltä ensimmäiselle matkalleen 8.1.1749 kohti Bataviaa;
       *     mukana 203 miehistön jäsentä, kapteenina Willem
       *     Klump, 127 sotilasta ja 5 matkustajaa; lastina
       *     kauppatavaraa (kangasta ja viiniä), painolastia
       *     (rakennuskiveä ja tykkejä), yhtiön omaan käyttöön menevää
       *     tavaraa (paperia, kyniä, työkaluja) ja muonaa sekä 27
       *     arkkua hopeaa, arvoltaan noin 300 000 guldenia; lounaismyrsky
       *     esti Atlantille pääsyn, laiva osui hiekkasärkkään ja menetti
       *     peräsimensä Hastingsin edustalla, ja 26. tammikuuta kapteeni
       *     ajoi sen rantaan pelastaakseen laivan ja miehistön;
       *     miehistö pääsi maihin ja sai suurimman osan hopeasta
       *     mukaansa, minkä jälkeen ryöstelijät kävivät laivaan käsiksi,
       *     kunnes englantilaiset joukot palauttivat järjestyksen; VOC
       *     yritti kolme viikkoa pelastaa laivaa mutta luopui
       *     11.3.1749, ja laiva vajosi saveen, jossa se on yhä;
       *     hylky löytyi uudelleen, kun se paljastui poikkeuksellisen
       *     matalan veden aikaan vuonna 1969; osa esineistä on
       *     Hastingsin haaksirikkomuseossa; replika rakennettiin
       *     1982–1990 neljänsadan vapaaehtoisen voimin, ja se on ollut
       *     vuodesta 1990 merimuseon laiturissa Amsterdamissa.
       *   - en-Wikipedia "Amsterdam (1748 ship)" (johdanto ja osiot
       *     "Ship", "Maiden voyage"): samat luvut miehistöstä,
       *     sotilaista, matkustajista ja 27 hopea-arkusta; hylky
       *     löydettiin 1969 Bulverhythen lahdelta Hastingsin luota ja
       *     se näkyy toisinaan matalan veden aikaan; kohde on Historic
       *     Englandin suojelema hylky; menomatkalla nämä laivat veivät
       *     tykkejä ja tiiliä sekä hopea- ja kultarahaa, joilla
       *     aasialainen tavara maksettiin, ja paluumatkalla mausteita,
       *     kankaita ja posliinia.
       */
      id: 'voc-hylky',
      nappi: 'Laiva, joka ei päässyt edes Kanaalin yli',
      otsikko: 'Amsterdam makaa Englannin hiekassa',
      teksti: 'Vuoden 1749 tammikuussa VOC:n laiva Amsterdam lähti ensimmäiselle '
        + 'matkalleen Bataviaan. Laivaa johti kapteeni Willem Klump, ja laivassa oli yli 330 ihmistä. Jo ennen rantaa noin viisikymmentä miehistön '
        + 'jäsentä oli kuollut tautiin. Myrsky ja hiekkasärkkä veivät laivalta '
        + 'peräsimen, ja 26. tammikuuta 1749 laiva ajettiin rantaan Hastingsin '
        + 'lähellä Englannissa.'
        + '\n\n'
        + 'Laiva vajosi rannan saveen, eikä sitä saatu pelastettua. Noin kaksi kolmasosaa laivasta on tallella: hylky '
        + 'tuli näkyviin 1969 ja on suojeltu 1970-luvulta.'
        + '\n\n'
        + 'Isoisäsi matkavuonna 1873 hylky oli maannut Englannin rannalla jo 124 '
        + 'vuotta. Amsterdamissa seisova laiva on nykyaikainen kopio, joka valmistui vuonna 1990.',
      lahde: 'Matkakirjan oma teksti · lähteinä Shipwreck Museum Hastings, Het Scheepvaartmuseum, The Past, '
        + 'Hastings Independent Press ja Sussex Smuggler',
      /*
       * Commons 29.8.2026: 5027×3352, CC BY-SA 2.0, Adrian Diack
       * (geograph.org.uk), kuvaus "The wreck of the Amsterdam in the
       * fossil forest at Bulverhythe". Restrictions tyhjä.
       * SILMÄTARKISTUS tehty: kuvassa on laskuveden paljastama rannan
       * hiekka, hylyn tummat kaaret ja etualalla muinaismetsän kantoja;
       * hylyn ympärillä seisoo kaukainen ryhmä katsojia, joista ketään
       * ei voi tunnistaa.
       */
      kuva: {
        tiedosto: 'The wreck of the Amsterdam in the fossil forest at Bulverhythe - geograph.org.uk - 8295766.jpg',
        lyhyt: 'Amsterdam-laivan runko paljastuu Bulverhythen rannalla vain poikkeuksellisen matalalla vedellä.',
        selite: 'Amsterdam-laivan runko paljastuu Bulverhythen rannalla '
          + 'vain poikkeuksellisen matalan veden aikaan; etualalla '
          + 'näkyy muinaismetsän kantoja.',
        lahde: 'Adrian Diack, Wikimedia Commons (CC BY-SA 2.0)',
      },
      visa: {
        kysymys: 'Mitä VOC:n laiva Amsterdam kohtasi tammikuussa 1749?',
        vaihtoehdot: [
          'Se purjehti perille Bataviaan',
          'Se ajettiin rantaan Hastingsin lähellä Englannissa',
          'Se paloi heti lähdettyään Amsterdamin satamasta ja upposi',
        ],
        oikea: 1,
        fakta: 'Myrsky ja hiekkasärkkä veivät laivalta peräsimen, ja '
          + '26. tammikuuta 1749 laiva ajettiin rantaan Hastingsin '
          + 'lähellä. Noin kaksi kolmasosaa laivasta on tallella.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa kohtaamisen laattakysymyksen (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, amsterdam: *"Amsterdamin vanhojen talojen päädyssä
   * on melkein aina koukku katonrajassa. Mitä varten?"*). Visasääntö
   * täyttyy: vastaus on tekstissä, mutta kysymyksen sanamuoto ei toistu
   * siinä sellaisenaan — teksti puhuu verosta, ullakoista ja
   * nostoluukuista eikä lausu vastausriviä ääneen.
   *
   * KORJAUS 16.11.2026 (SK, KK:n päätös; docs/raportit/amsterdam-virheet-
   * muualla-20261116.md): verolegenda (julkisivun leveyden mukaan peritty
   * vero) on poistettu oppitunnin tekstistä, koska mikään lähde ei yhdistä
   * Oude Hoogstraat 22:n kapeutta veroon (dokumentti
   * amsterdam-9-tarinapaikkaa-dataluonnos-20261116.md, kohta 7). Alla
   * olevat FAKTAT-rivit ovat alkuperäisiltä ajoilta (29.8.2026); nosto
   * "Verotettiinko julkisivun leveydestä?" on nyt "Kapein koko talo
   * Amsterdamissa".
   *
   * FAKTAT:
   *   - js/packs/kulttuuri-kategoriat.js, amsterdam-osion nostot
   *     "Verotettiinko julkisivun leveydestä?" ja "Koko kaupunki seisoo
   *     puutukkien päällä" (pelin omaa tarkistettua aineistoa):
   *     1600-luvulla kiinteistövero laskettiin julkisivun leveydestä;
   *     kapein talo Oude Hoogstraat 22 on 2,02 metriä leveä ja viisi
   *     metriä syvä; portaat ovat jyrkät kuin tikkaat; päätykolmion
   *     alta työntyy nostopuu, hijsbalk, jonka koukusta huonekalut
   *     vedetään köydellä ikkunasta sisään; [väite talojen kallistamisesta poistettu 17.11.2026: vain yksi lähde]
   *   - nl-Wikipedia "Hijsbalk" ja "Grachtenpand" (tarkistettu
   *     29.8.2026): nostopuu on palkki, joka työntyy rakennuksen
   *     päätykolmion läpi ja jolla tavaraa nostetaan köydellä ja
   *     taljalla; tekniikka syntyi tarpeesta varastoida kauppatavaraa
   *     ullakoille, koska Amsterdam oli 1600-luvulla maan tärkein
   *     tavaranvälitysmarkkina; ensin varastoitiin kellareihin ja
   *     asuintalojen kerroksiin, ja useimmissa kauppiaiden
   *     kanavataloissa on yksi tai kaksi tavaraullakkoa, jotka
   *     tunnistaa suuremmasta keskimmäisestä ikkunasta, jossa on ollut
   *     nostoluukut, ja usein sen yläpuolella on yhä nostorulla;
   *     nostopuu jäi asuintaloihin senkin jälkeen kun kauppatavara
   *     siirtyi makasiineihin, ja siellä sitä käytetään enää
   *     muutoissa; kanavatalot ovat korkeita, kapeita ja syviä juuri
   *     siksi, että vero perittiin julkisivun leveydestä, ja tulvien
   *     takia ulko-ovi on usein korotetulla kerroksella.
   *
   * TÄMÄ EI TOISTA LEHTEÄ VAAN SELITTÄÄ SEN. Sivun 1 nosto kertoo
   * verosta ja kapeudesta; oppitunti kertoo, mitä kapeus tarkoitti
   * talon sisällä ja miksi tavara kulki ikkunasta.
   */
  oppitunti: {
    otsikko: 'Miksi tavara kulkee ikkunasta',
    teksti: 'Isoisäsi kirjoitti paaluista, mutta yhtä hyvin hän olisi '
      + 'voinut kirjoittaa kanavatalojen ullakoista. Kanavien varren '
      + 'talot ovat kapeita ja syviä. Kapein koko talo, Oude Hoogstraat '
      + '22, on kaksi metriä kaksi senttiä leveä ja viisi metriä syvä. '
      + 'Kapea talo tarkoittaa kapeaa porrasta, ja '
      + 'amsterdamilainen porras on jyrkkä kuin tikkaat — sitä pitkin '
      + 'nousee ihminen, ei arkku. Ja arkkuja oli. Kaupunki oli '
      + '1600-luvulla koko maan tavaranvälitysmarkkina, ja tavara '
      + 'varastoitiin kellareihin ja ullakoille: useimmissa kauppiaiden '
      + 'kanavataloissa on yksi tai kaksi tavaraullakkoa. Ne tunnistaa '
      + 'yhä ulkoa, sillä ullakon keskimmäinen ikkuna on muita suurempi '
      + '— siinä on ollut leveät luukut, ja niiden yläpuolella on usein '
      + 'vieläkin pieni rulla, jonka yli köysi kulki. Köyden toinen pää '
      + 'kulki päätykolmion alta ulos työntyvän puisen palkin nokassa '
      + 'olevan koukun kautta. Palkkia sanotaan nostopuuksi, hijsbalk. Kun kauppatavara aikanaan siirtyi omiin makasiineihinsa, palkki '
      + 'jäi asuintaloihin. Se ei ole koriste. Sitä käytetään yhä, ja '
      + 'jokainen muuttopäivä kertoo miksi.',
    /*
     * KUVA ON PELIN OMASTA AINEISTOSTA (sama tiedosto kaupunkilehden
     * nostossa "Kapein koko talo Amsterdamissa", js/packs/
     * kulttuuri-kategoriat.js) — siis jo kertaalleen tarkistettu ja
     * hyväksytty. TOISTO ON TIETOINEN: oppitunti selittää täsmälleen
     * sen esineen, jonka pelaaja on juuri nähnyt lehdessä, ja kuva on
     * ainoa hyväksytyssä aineistossa oleva, jossa nostopuu näkyy
     * lähietäisyydeltä.
     *
     * Commons 29.8.2026: 3543×2372, CC BY-SA 4.0, René Gerritsen
     * (Rijksdienst voor het Cultureel Erfgoed), kuvaus "Hijsbalk:
     * Detail van de top van de voorgevel, een klokgevel, met hijsbalk".
     * Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on julkisivun
     * yläosa ja nostopuu, ei ihmisiä.
     */
    kuva: {
      tiedosto: 'Detail van de top van de voorgevel, een klokgevel, met hijsbalk - Amsterdam - 20528909 - RCE.jpg',
      lyhyt: 'Kellopäädyn hijsbalk-nostopuu on yhä käytössä.',
      selite: 'Kellopäädyn alta työntyvä hijsbalk-nostopuu on yhä käytössä.',
      lahde: 'René Gerritsen, Wikimedia Commons (CC BY-SA 4.0)',
    },
  },

  /* FABLE KATSELMOI: kohtaamisluonnos */

  /*
   * ---------- 5. Kohtaaminen ----------
   *
   * Kirjoitettu 5.9.2026 (Opus-luonnos); Fable tarkistanut.
   *
   * HAHMO VAIHDETTU: siltavahti Willem → muuttotyöntekijä Yara
   * (kuvaputken tarinaehdotus 5.9.2026, Fablen päätös klo 20:05 UTC).
   * Willemin kirja merkitsi isoisän veneen ja suku avasi siltaa
   * sukupolvien ajan — molemmat ovat kaanonrikkeitä, ja koko henkilö
   * poistuu pelistä. Hahmo, laattakysymys ja kohtaamisen oma repliikki
   * ovat tarinakaaren paketissa (js/tyohuone-kehitys-data.js
   * KAARI_PAKETIT, 'amsterdam'): Yara keskeyttää kanavatalon muuton ja
   * tunnistaa kirjan piirroksesta oman työmaansa kulman.
   *
   * EI SUKUSALAISUUTTA: Yara ei tunne Horatiota eikä odota perillistä.
   * Tunnistus syntyy ammattisilmästä — hän mittaa kaappeja ja tietää
   * talojen mittasuhteet ulkoa.
   *
   * MITÄ LUONNOS EI TEE: se ei kertaa Yaran repliikkiä eikä paljasta
   * laattakysymyksen vastausta. Viimeinen virke on sama kehotus katsoa
   * ylös kuin ennenkin — vihje, ei vastaus, ja se lunastuu visassa.
   *
   * KUVAA EI OLE (omistajan rajaus aallolle 4A). Vanha Willem-kuva on
   * arkistoitu myös kohtaamiskuvakatalogista (js/kohtaamiskuvat-data.js,
   * `amsterdam-koysityontekija`), jottei pelissä näy eri ihminen kuin se,
   * joka kysymyksen esittää.
   */
  kohtaaminen: {
    hahmo: 'Muuttotyöntekijä Yara',
    nappi: 'Tapaa Yara',
    /*
     * VARMISTUSKYSYMYS (omistajan pelitestipalaute v1119): lause on
     * datassa, koska suomen genetiivi ei taivu koneellisesti jokaisesta
     * nimestä.
     */
    varmistus: 'Haluatko varmasti tavata Yaran juuri nyt?',
    /*
     * VIHJELINKIN OSIO on kaupunkilehden osion id (js/packs/
     * kulttuuri-kategoriat.js): Amsterdamin lehdessä on kaksi osiota,
     * 'kaupunki' ("Amsterdam") ja 'taide' ("Taide"). Yaran kysymys koskee
     * kanavatalon päätyä, ja lähin tuki sille on Amsterdam-osion nosto
     * "Kapein koko talo Amsterdamissa" (ent. "Verotettiinko julkisivun
     * leveydestä?"). Se ei anna vastausta, vaan
     * nyökkää siihen suuntaan.
     */
    vihjeOsio: 'kaupunki',
    teksti: 'Yara vetää muuttokuormat kanavatalojen läpi ja tietää tunnissa, '
      + 'mikä menee ovesta ja mikä ei. Hän mittaa jokaisen kaapin ennen '
      + 'kuin siihen kosketaan, ja työpari yläkerrassa odottaa hänen '
      + 'merkkiään eikä toisin päin. Vieraita hän ei karta: hän puhuu '
      + 'mielellään ja nopeasti, ja kesken lauseen hän saattaa kadota '
      + 'nostamaan jotain raskasta. Ennen kuin hän neuvoo tulijaa '
      + 'eteenpäin, hän haluaa tietää, onko tämä katsonut kertaakaan '
      + 'ylös — sinne, missä kanavatalojen päädyt ovat.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA SIIRRETTY 5.9.2026 (Fable tarkistanut 5.9.2026):
   * MAGERE BRUG → HERENGRACHTIN KANAVATALOT. Vanha piste oli
   * siltavahti Willemin työpaikka, ja Willem poistui kaaresta. Fablen
   * päätös klo 20:05 UTC: *"Fokusvirran kohtaamispiste siirtyy Magere
   * Brugilta kanavataloille."* Yara tekee muuttoa kanavatalon edessä,
   * joten piste ankkuroidaan Herengrachtin kanavatalojaksoon, jonka
   * hollantilainen nimi on Gouden Bocht.
   *
   * PAIKKA ON JAKSO, EI OSOITE: yhtäkään taloa ei nimetä eikä
   * yhteenkään taloon väitetä kätköä tai pääsyoikeutta. Kaaren kätkö on
   * kanavan reunan kivilaiturissa, siis yleisellä paikalla (Fablen
   * päätös: *"kätkö on kaupungin kätkö, ei yksityisasunnon ullakko"*).
   *
   * 52,36555556 N / 4,89 E — nl-Wikipedia "Gouden Bocht",
   * prop=coordinates (haettu 5.9.2026). Muunnos on sama kaava ja samat
   * vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU (ajettu laudanProjektion omalla kaavalla):
   *   maailmankartta  x = ((4,89 − (−175)) mod 360) × (12000/360)
   *                     = 179,89 × 33,3333… = 5996,3
   *                   y = (millerY(76) − millerY(52,36555556)) × 12000/2π
   *                     = 1285,8
   *   europe          x = (4,89 + 11) × 19,2 = 305,1
   *                   y = (72 − 52,36555556) × 26,3 = 516,4
   *
   * TARKISTUS LAATTAA VASTEN: Amsterdamin laatta on Euroopan laudalla
   * 305 / 516 (js/packs/europe.js) ja maailmankartalla 5996,8 / 1285,7,
   * eli piste osuu käytännössä laatan päälle — kuten ennenkin. Niin
   * pitääkin: kanavakehä on keskustassa alle kilometrin päässä Damista,
   * ja laudan yksikkö on maailmankartalla noin kolme kilometriä.
   * Piirtopuoli hoitaa erotuksen itse: alle 14 yksikön päässä laatasta
   * piste siirretään koilliseen (js/fokuspiste.js PISTE_ERO_MIN).
   */
  kohtaamispiste: {
    nimi: 'Herengrachtin kanavatalot',
    laudat: {
      maailmankartta: { x: 5996.3, y: 1285.8 },
      europe: { x: 305.1, y: 516.4 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Amsterdamin sivupino (js/lehti.js
   * rakennaSivut) on Dubrovnikin mittainen, koska kaupungilla on kaksi
   * kulttuurikategoriaa ja maalla Menovinkit-sivu: 0 = etusivu,
   * 1 = kaupunkisivu "Amsterdam", 2 = Taide, 3 = Menovinkit.
   *
   * Sivun 2 oma tehtävä (Vermeerin peittämät esineet) väistyy nimetyn
   * tieltä, joten sivulla on Raamatun vaatima yksi minitehtävä eikä
   * kahta. Sivun 1 kysymys on Amsterdamin kulttuurivisa (js/packs/
   * europe-kulttuuri.js), jonka js/fokustehtavat.js pukee samaksi
   * AARTEEN AVAUS -laatikoksi ilman omaa riviään täällä.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: YOVARTIO_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: PAALU_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Alankomaat) ----------
   *
   * UUSI POOLI, EI SIIRTO. Alankomaat ei ole js/fokusnosto.js:n
   * NOSTO_MAAT-taulussa, joten maalla ei ole ollut yhtään täkynostoa.
   * js/fokusnosto.js nostoMaanPooli lukee kaupungin oman
   * `takynostot`-kentän ENNEN maapoolia, joten uusi maa ei vaadi riviä
   * moottoriin — pooli syntyy tästä kentästä.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen katsomattomaan.
   * Kärjeksi on valittu tulppaanimania, koska se on maan PIENEN AARTEEN
   * (kori tulppaanisipuleita) oma tarina.
   *
   * NELJÄ NOSTOA, KOSKA MAA ON SISÄLTÖRIKAS: raha, vesi, tiede ja yksi
   * pako. Aiheet on valittu niin, ettei kaksi peräkkäistä ole samasta
   * maailmasta.
   *
   * PISTEET OVAT LÄHELLÄ TOISIAAN, ja se on maantiedettä eikä
   * huolimattomuutta: Alankomaat mahtuu Euroopan laudalla noin
   * kahdenkymmenen yksikön ruutuun. Kaukaisin (Afsluitdijk) on
   * kaupungista noin 17 yksikköä pohjoiseen, lähin (Alkmaar) noin 7.
   *
   * LOISTOAIKAKUVIA EI VIELÄ OLE. Aallon 2 ja 3 nostoilla pääkuva on
   * repon oma generoitu havainnekuva (`kuva.osoite`); tämän erän kuvat
   * eivät ole vielä generoituja, joten pääkuvaksi jää valokuva tai
   * aikalaisteos kunnes generointi on ajettu. Aihe on kirjattu
   * raporttiin.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/historia, nosto "Yhdestä
       *     kukkasipulista maksettiin talon hinta" (jo hyväksyttyä
       *     pelidataa): tulppaani tuotiin 1500-luvulla Osmanien
       *     valtakunnasta; kalleimpia olivat sipulit, joiden kukkiin
       *     ilmestyi valkoista ja punaista raitaa; raidat olivat
       *     virustaudin jälkiä, mikä selvisi vasta 1928; talvella
       *     1636–37 sipuleilla käytiin kauppaa kapakoissa ja ne myytiin
       *     vielä maan alla kasvavina; Alkmaarin huutokaupassa
       *     5.2.1637 yhdestä sipulista tarjottiin 4 200 guldenia, ja
       *     samalla rahalla sai kanavatalon; kaksi päivää aiemmin
       *     kauppa oli Haarlemissa jo pysähtynyt.
       *   - en-Wikipedia "Tulip mania" (johdanto ja osio romahduksesta,
       *     tarkistettu 29.8.2026): kiihtyminen alkoi 1634 ja romahdus
       *     tuli helmikuussa 1637; huipulla eräistä sipuleista
       *     maksettiin yli kymmenkertaisesti ammattitaitoisen
       *     käsityöläisen vuositulot; kalleimmasta lajikkeesta Semper
       *     Augustuksesta maksettiin huipulla 10 000 guldenia;
       *     kauppaa sanottiin nimellä windhandel, tuulikauppa, koska
       *     yksikään sipuli ei vaihtanut omistajaa; aikalaissatiirin
       *     mukaan romahdus alkoi 3. helmikuuta 1637 Haarlemissa, kun
       *     huutokauppias ei löytänyt ostajaa vaikka laski pyyntihintaa
       *     useaan kertaan; 7. helmikuuta kasvattajat kokoontuivat
       *     Utrechtissa valitsemaan edustajia Amsterdamin
       *     kokoukseen; tapausta pidetään ensimmäisenä kirjattuna
       *     hintakuplana.
       */
      id: 'tulppaanimania',
      symboli: 'kauppa',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen.
      nimio: 'Alkmaar',
      otsikko: 'Yhdestä sipulista maksettiin kanavatalon hinta, ja '
        + 'kaksi päivää myöhemmin siitä ei maksettu mitään',
      visa: {
        kysymys: 'Mikä aiheutti tulppaanien kalliin liekkikuvion?',
        vaihtoehdot: [
          'Kasvitauti, joka tunnistettiin virukseksi',
          'Erityinen lannoite',
          'Ristiinpölytys turkkilaisten lajikkeiden kanssa',
        ],
        oikea: 0,
        fakta: 'Liekkikuvio, josta koko maailma maksoi, oli kasvitauti. Aiheuttaja tunnistettiin virukseksi vuonna 1928.',
      },
      lunastus: [
        'Tulppaani tuli Alankomaihin 1500-luvulla Osmanien '
          + 'valtakunnasta, ja pian sitä haluttiin joka puutarhaan. '
          + 'Kalleimpia olivat sipulit, joiden kukkiin ilmestyi '
          + 'valkoista ja punaista liekkikuviota — kukaan ei tiennyt '
          + 'miksi, ja sitä pidettiin lajikkeen ansiona. Talvella '
          + '1636–37 sipuleilla käytiin kauppaa kapakoissa, ja ne '
          + 'myytiin vielä maan alla kasvavina: ostaja ei ollut nähnyt '
          + 'kukkaa eikä saanut sipulia käteensä. Hollantilaiset '
          + 'sanoivat sitä tuulikaupaksi. Huipulla eräistä sipuleista '
          + 'maksettiin yli kymmenkertaisesti se, minkä taitava '
          + 'käsityöläinen ansaitsi vuodessa, ja kalleimmasta '
          + 'lajikkeesta Semper Augustuksesta jopa kymmenentuhatta '
          + 'guldenia. Alkmaarin huutokaupassa 5. helmikuuta 1637 '
          + 'yhdestä sipulista tarjottiin 4 200 guldenia — samalla '
          + 'rahalla sai kanavatalon.',
        'Kaksi päivää ennen sitä huutokauppaa kauppa oli jo pysähtynyt. '
          + 'Aikalaissatiirin mukaan romahdus alkoi 3. helmikuuta '
          + 'Haarlemissa, kun huutokauppias laski pyyntihintaa kerta '
          + 'toisensa jälkeen eikä yksikään käsi noussut. Viikossa '
          + 'sopimushinnat romahtivat, ja seitsemäntenä päivänä '
          + 'kasvattajat kokoontuivat Utrechtiin valitsemaan edustajia '
          + 'Amsterdamin kokoukseen — riita koski sopimuksia, joita '
          + 'kukaan ei enää halunnut kunnioittaa ja joita ei voinut '
          + 'panna täytäntöön. Yhtään sipulia ei koskaan toimitettu. '
          + 'Tapausta pidetään ensimmäisenä kirjattuna hintakuplana, ja '
          + 'sen kaunein yksityiskohta selvisi vasta kolmesataa vuotta '
          + 'myöhemmin: liekkikuvio, josta koko maailma maksoi, oli '
          + 'kasvitauti. Aiheuttaja tunnistettiin virukseksi vuonna '
          + '1928.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/historia, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Tulip mania", '
        + 'johdanto ja osio romahduksesta; tarkistettu 29.8.2026.',
      /*
       * Commons 29.8.2026: 1182×1829, public domain, tuntematon tekijä,
       * ajoitus "before 1640". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: aikalaisakvarelli yhdestä tulppaanista, ei ihmisiä.
       *
       * MIKSI TÄMÄ EIKÄ LEHDEN KUKKA-ASETELMA: maalehden nostossa on
       * jo Bollongierin asetelma, ja tässä on nimenomaan se lajike,
       * josta maksettiin eniten.
       */
      kuva: {
        tiedosto: 'Semper Augustus Tulip 17th century.jpg',
        lyhyt: 'Semper Augustus oli tulppaanimanian kallein lajike; sen liekkikuvio oli kasvitaudin merkki.',
        selite: 'Semper Augustus oli tulppaanimanian kallein lajike, ja '
          + 'sen valko-punainen liekkikuvio oli kasvitaudin merkki.',
        lahde: 'Tuntematon tekijä ennen vuotta 1640, Wikimedia Commons '
          + '(public domain)',
      },
      kysymykset: [
        'Mistä tulppaanin liekkikuviot johtuivat?',
        'Miksi sipuleilla kaupattiin maan alla kasvavina?',
        'Mitä sopimuksille tehtiin romahduksen jälkeen?',
      ],
      /*
       * 52,632 N / 4,751 E — nl-Wikipedia "Alkmaar", prop=coordinates
       * (haettu 29.8.2026). Sama kaava kuin kohtaamispisteellä yllä.
       */
      paikka: {
        nimi: 'Alkmaar',
        laudat: {
          maailmankartta: { x: 5991.7, y: 1273.8 },
          europe: { x: 302.4, y: 509.4 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/luonto, nosto "Meri
       *     suljettiin, ja se lakkasi olemasta meri" (jo hyväksyttyä
       *     pelidataa): Zuiderzee oli matala merenlahti, joka tulvi
       *     rantakyliin; insinööri Cornelis Lely piirsi suunnitelman
       *     sen sulkemisesta jo 1891; työ alkoi tammikuussa 1927; patoa
       *     rakennettiin neljästä suunnasta yhtä aikaa, ja perustaksi
       *     upotettiin pajunoksista punottuja mattoja, joiden päälle
       *     ladottiin kiveä.
       *   - nl-Wikipedia "Afsluitdijk" (johdanto ja osio "Aanleg
       *     Amsteldiepdijk en Afsluitdijk", tarkistettu 29.8.2026):
       *     pato on 32,5 kilometriä pitkä, josta vettä pidättävää osaa
       *     30 kilometriä; työ alkoi tammikuussa 1927 ja sitä tehtiin
       *     neljästä paikasta — molemmilta rannoilta ja kahdelta
       *     varta vasten rakennetulta työsaarelta (Breezand ja
       *     Kornwerderzand); ensimmäistä kertaa käytettiin
       *     rakennusaineena moreenisavea, joka osoittautui sitkeämmäksi
       *     kuin hiekka tai savi ja jota saatiin ruopattua padon
       *     läheltä; viimeinen sulkuaukko, Vlieter, suljettiin vuonna
       *     1932 ja sen kohdalle pystytettiin muistomerkki; vuotta
       *     myöhemmin pato avattiin autoliikenteelle; molemmissa päissä
       *     on sulut (Stevinsluizen Pohjois-Hollannin puolella,
       *     Lorentzsluizen Kornwerderzandissa); vuoden 1937 myrsky
       *     osoitti harjan liian matalaksi, ja se nostettiin 7,4
       *     metriin.
       */
      id: 'afsluitdijk',
      nimio: 'Afsluitdijk',
      otsikko: 'Meri suljettiin kuin ovi, ja siitä tuli järvi',
      symboli: 'tekniikka',
      visa: {
        kysymys: 'Mitä Afsluitdijkin pohjaksi upotettiin ennen kiveä?',
        vaihtoehdot: [
          'Köysistä punottuja mattoja',
          'Pajunoksista punottuja mattoja',
          'Teräsverkkoja',
        ],
        oikea: 1,
        fakta: 'Pohjaksi upotettiin pajunoksista punottuja mattoja, joiden päälle ladottiin kiveä.',
      },
      lunastus: [
        'Zuiderzee oli matala merenlahti, joka nousi tulvina '
          + 'rantakyliin niin kauan kuin kukaan muisti. Insinööri '
          + 'Cornelis Lely piirsi sen sulkemisesta suunnitelman jo '
          + 'vuonna 1891, ja työ alkoi tammikuussa 1927. Patoa '
          + 'rakennettiin neljästä suunnasta yhtä aikaa: molemmilta '
          + 'rannoilta ja kahdelta varta vasten kasatulta työsaarelta. '
          + 'Pohjaksi upotettiin pajunoksista punottuja mattoja, joiden '
          + 'päälle ladottiin kiveä, ja rakennusaineena kokeiltiin '
          + 'ensimmäistä kertaa moreenisavea — se osoittautui '
          + 'sitkeämmäksi kuin hiekka tai savi, ja sitä sattui olemaan '
          + 'juuri siinä missä patoa tarvittiin.',
        'Viimeinen aukko, jota sanottiin Vlieteriksi, suljettiin vuonna '
          + '1932. Sen kohdalle pystytettiin muistomerkki, ja seuraavana '
          + 'vuonna padon yli avattiin maantie. Valmis pato on 32,5 '
          + 'kilometriä pitkä, ja siitä vettä pidättää kolmekymmentä; '
          + 'molemmissa päissä on sulut, joista laivat pääsevät läpi ja '
          + 'joista ylimääräinen vesi lasketaan ulos. Suolainen '
          + 'merenlahti muuttui makeaksi järveksi, ja rannikkokylistä '
          + 'tuli sisämaata. Työ ei ollut sillä valmis: vuoden 1937 '
          + 'myrsky osoitti harjan liian matalaksi, ja se nostettiin '
          + 'yli seitsemään metriin. Meren kanssa ei tehdä sopimusta '
          + 'kerran.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/luonto, pelin omaa '
        + 'tarkistettua aineistoa) sekä nl-Wikipedia "Afsluitdijk", '
        + 'johdanto ja rakentamista käsittelevä osio; tarkistettu '
        + '29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/luonto,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 4591×3310, CC BY-SA 4.0, C messier, kuvattu
       * 26.8.2016. Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * pato, tie ja vettä molemmin puolin, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Afsluitdijk 1031.jpg',
        lyhyt: 'Afsluitdijk erottaa Vattimeren ja makean IJsselmeerin; pato on 32,5 km pitkä ja sen yli kulkee tie.',
        selite: 'Afsluitdijk erottaa Vattimeren ja makean IJsselmeerin: '
          + 'pato on 32,5 kilometriä pitkä ja sen yli kulkee maantie.',
        lahde: 'C messier, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Zuiderzee haluttiin sulkea?',
        'Miten patoa rakennettiin keskelle merta?',
        'Mitä suljetulle merelle tapahtui sen jälkeen?',
      ],
      /*
       * 53,0 N / 5,16666667 E — nl-Wikipedia "Afsluitdijk",
       * prop=coordinates (haettu 29.8.2026); piste on padon puolivälissä.
       */
      paikka: {
        nimi: 'Afsluitdijk',
        laudat: {
          maailmankartta: { x: 6005.6, y: 1257.3 },
          europe: { x: 310.4, y: 499.7 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/keksinnöt, nosto
       *     "Kangaskauppias näki eläimiä, joita kukaan ei uskonut" (jo
       *     hyväksyttyä pelidataa): Antoni van Leeuwenhoek myi
       *     Delftissä kangasta ja tarkasti langan tiheyttä
       *     suurennuslasilla; hän opetteli itse sulattamaan lasista
       *     pieniä pallolinssejä ja puristi yhden linssin kahden
       *     metallilevyn väliin; säilyneistä kappaleista tehokkain
       *     suurentaa 270-kertaisesti; vuodesta 1674 hän kirjoitti
       *     Lontooseen kirjeitä pikkuolennoista, joita ui sadevedessä;
       *     niitä ei uskottu, joten Lontoosta lähetettiin miehiä
       *     katsomaan; samanlaisia löytyi myös hänen omista
       *     hampaistaan; linssien hiontatavan hän vei mukanaan hautaan.
       *   - en-Wikipedia "Antonie van Leeuwenhoek" (johdanto sekä osiot
       *     varhaisvuosista ja mikroskoopeista, tarkistettu 29.8.2026):
       *     syntyi Delftissä 24.10.1632 ja kuoli 26.8.1723; toimi
       *     nuorena kankaankauppiaana ja perusti oman kauppansa 1654;
       *     kutsutaan mikrobiologian isäksi; ei kirjoittanut yhtään
       *     kirjaa vaan kuvasi löytönsä sekavissa kirjeissä Royal
       *     Societylle, joka julkaisi niistä monet; hän piti
       *     linssinvalmistuksen yksityiskohdat itsellään koko
       *     elämänsä; vuonna 1953 julkaistiin menetelmä toimivan
       *     jäljennöksen tekemiseksi, ja toukokuussa 2021 hollantilaiset
       *     tutkijat kuvasivat alkuperäisiä mikroskooppeja
       *     neutronitomografialla ja näkivät pallolinssin, jossa oli
       *     lyhyt varsi — jäänne siitä lasilangasta, josta linssi oli
       *     sulatettu.
       */
      id: 'leeuwenhoek',
      nimio: 'Delftin linssit',
      otsikko: 'Salaisuus, jonka hän vei hautaan, luettiin neutroneilla '
        + 'kolmesataa vuotta myöhemmin',
      symboli: 'tekniikka',
      visa: {
        kysymys: 'Minkä yhden asian Antoni van Leeuwenhoek jätti kertomatta?',
        vaihtoehdot: [
          'Missä hän piti kirjeensä',
          'Kuka maksoi hänen tutkimuksensa',
          'Miten hänen linssinsä tehtiin',
        ],
        oikea: 2,
        fakta: 'Leeuwenhoek sanoi pitävänsä linssien tekotavan itsellään. Neutronikuvaus paljasti sen vasta toukokuussa 2021.',
      },
      lunastus: [
        'Antoni van Leeuwenhoek myi Delftissä kangasta ja tarkasti '
          + 'langan tiheyttä suurennuslasilla — siitä kaikki alkoi. Hän '
          + 'ei ollut oppinut mies eikä kuulunut yliopistoon, mutta hän '
          + 'opetteli sulattamaan lasista pikkuruisia pallolinssejä ja '
          + 'puristamaan yhden niistä kahden metallilevyn väliin. Laite '
          + 'ei ollut putki vaan kämmenelle mahtuva levy, jota '
          + 'katsottiin silmä kiinni linssissä. Säilyneistä kappaleista '
          + 'tehokkain suurentaa 270-kertaisesti. Vuodesta 1674 hän '
          + 'kirjoitti Lontooseen kirjeitä olennoista, joita ui '
          + 'sadevedessä ja joita kukaan muu ei ollut nähnyt. Niitä ei '
          + 'uskottu, joten Lontoosta lähetettiin miehiä katsomaan '
          + 'omin silmin. Samanlaisia löytyi myös hänen omista '
          + 'hampaistaan.',
        'Kirjaa hän ei kirjoittanut yhtäkään; kaikki on sekavissa '
          + 'kirjeissä, joita Royal Society julkaisi vuosikymmenten '
          + 'ajan. Yhden asian hän jätti kertomatta: miten linssit '
          + 'tehtiin. Sen hän sanoi pitävänsä itsellään, ja niin hän '
          + 'teki. Vasta vuonna 1953 julkaistiin tapa rakentaa toimiva '
          + 'jäljennös, ja toukokuussa 2021 hollantilaiset tutkijat '
          + 'kuvasivat hänen alkuperäisiä mikroskooppejaan '
          + 'neutroneilla — säteillä, jotka läpäisevät metallin. '
          + 'Kuvassa näkyi pallolinssi, jonka kyljessä oli lyhyt varsi: '
          + 'jäänne siitä lasilangasta, jonka päästä linssi oli '
          + 'sulatettu. Kolmesataa vuotta vaiettu työtapa luettiin '
          + 'lopulta suoraan esineestä.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/keksinnöt, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Antonie van '
        + 'Leeuwenhoek", johdanto ja mikroskooppeja käsittelevä osio; '
        + 'tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/keksinnöt,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 2874×4728, CC BY-SA 4.0, Hnapel, kuvattu
       * 18.7.2015. Restrictions tyhjä. SILMÄTARKISTUS tehty: kuvassa on
       * museovitriinissä oleva pieni mikroskooppi, ei ihmisiä.
       */
      kuva: {
        tiedosto: 'Leiden Museum Boerhaave single lens microscope 071815 06.jpg',
        lyhyt: 'Leeuwenhoekin mikroskooppi on kämmenelle mahtuva levy yhdellä itse sulatetulla pallolinssillä.',
        selite: 'Leeuwenhoekin mikroskooppi on kämmenelle mahtuva levy, '
          + 'jonka sisään on puristettu yksi itse sulatettu pallolinssi.',
        lahde: 'Hnapel, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miten yhden linssin mikroskooppia käytettiin?',
        'Miksi Lontoossa ei uskottu Leeuwenhoekia?',
        'Mitä neutronikuvaus paljasti vuonna 2021?',
      ],
      /*
       * 52,01111111 N / 4,3575 E — nl-Wikipedia "Delft",
       * prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Delft',
        laudat: {
          maailmankartta: { x: 5978.6, y: 1301.6 },
          europe: { x: 294.9, y: 525.7 },
        },
      },
    },
    {
      /*
       * FAKTAT:
       *   - js/packs/maa-kategoriat.js, NLD/historia, nosto "Vanki
       *     kannettiin ulos kirja-arkussa" (jo hyväksyttyä pelidataa):
       *     oikeusoppinut Hugo de Groot istui elinkautista Loevesteinin
       *     linnassa; hän sai vankilassa lukea, ja kirjat tuotiin
       *     isossa arkussa, joka soudettiin joen yli; aluksi arkku
       *     tarkastettiin, mutta ajan mittaan vartijat kyllästyivät
       *     siihen; De Groot harjoitteli makaamaan liikkumatta kaksi
       *     tuntia — juuri niin kauan kuin venematka kesti;
       *     22.3.1621 palvelustyttö Elsje van Houweningen saatteli
       *     arkun ulos linnasta markkinapäivänä, eikä kukaan avannut
       *     sitä; toisella rannalla De Groot pukeutui muurariksi ja
       *     käveli tiehensä. Arkku on Rijksmuseumin kokoelmassa.
       *   - en-Wikipedia "Hugo Grotius" (johdanto, tarkistettu
       *     29.8.2026): syntyi Delftissä 10.4.1583 ja kuoli 28.8.1645;
       *     oli teini-ikäinen ihmelapsi ja opiskeli Leidenin
       *     yliopistossa; vangittiin Loevesteinin linnaan osallisuudesta
       *     tasavallan uskontopolitiikan kiistoihin; pakeni piiloutuneena
       *     kirja-arkkuun, jota hänelle tuotiin säännöllisesti, ja arkku
       *     kuljetettiin Gorinchemiin; kirjoitti pääteoksensa
       *     maanpaossa Ranskassa; kahdesta vaikutusvaltaisimmasta
       *     kirjasta toinen on Mare Liberum, vapaa meri, ja niiden takia
       *     häntä sanotaan kansainvälisen oikeuden isäksi.
       */
      id: 'kirja-arkku',
      nimio: 'Loevesteinin arkku',
      otsikko: 'Vanki harjoitteli makaamaan liikkumatta kaksi tuntia — '
        + 'juuri niin kauan kuin venematka kesti',
      symboli: 'historia',
      visa: {
        kysymys: 'Miten Hugo de Groot pakeni Loevesteinin linnasta vuonna 1621?',
        vaihtoehdot: [
          'Kirja-arkussa, jonka palvelustyttö saatteli ulos',
          'Köyttä pitkin linnan muurilta',
          'Vartijaksi pukeutuneena portista',
        ],
        oikea: 0,
        fakta: 'De Groot makasi kirja-arkussa, jonka palvelustyttö Elsje van Houweningen saatteli ulos linnasta. Kukaan ei avannut arkkua.',
      },
      lunastus: [
        'Oikeusoppinut Hugo de Groot tuomittiin elinkautiseen '
          + 'Loevesteinin linnaan tasavallan uskontokiistojen takia. '
          + 'Yksi oikeus hänelle jäi: hän sai lukea. Kirjat tuotiin '
          + 'isossa arkussa, joka soudettiin joen yli ja kannettiin '
          + 'portista sisään, ja aluksi vartijat avasivat arkun joka '
          + 'kerta. Vuosien mittaan he kyllästyivät. Sen huomasi myös '
          + 'vanki, ja hän alkoi harjoitella: maata liikkumatta kaksi '
          + 'tuntia, juuri niin kauan kuin venematka kesti.',
        'Maaliskuun 22. päivänä 1621, markkinapäivänä, palvelustyttö '
          + 'Elsje van Houweningen saatteli arkun ulos linnasta. Kukaan '
          + 'ei avannut sitä. Toisella rannalla De Groot nousi arkusta, '
          + 'pukeutui muurariksi ja käveli tiehensä. Hän pakeni '
          + 'Ranskaan ja kirjoitti siellä pääteoksensa; toinen niistä, '
          + 'Mare Liberum, esitti ettei meri voi kuulua kenellekään, ja '
          + 'niiden takia häntä sanotaan yhä kansainvälisen oikeuden '
          + 'isäksi. Arkku on Rijksmuseumin kokoelmassa, ja se on '
          + 'yllättävän tavallisen näköinen — juuri niin kuin parhaan '
          + 'piilon kuuluukin.',
      ],
      lahde: 'js/packs/maa-kategoriat.js (NLD/historia, pelin omaa '
        + 'tarkistettua aineistoa) sekä en-Wikipedia "Hugo Grotius", '
        + 'johdanto; tarkistettu 29.8.2026.',
      /*
       * Kuva on pelin omasta aineistosta (sama tiedosto NLD/historia,
       * js/packs/maa-kategoriat.js) — jo tarkistettu ja hyväksytty.
       * Commons 29.8.2026: 8176×6132, CC0, Rijksmuseum, esineen ajoitus
       * "ca. 1600 – ca. 1615". Restrictions tyhjä. SILMÄTARKISTUS
       * tehty: kuvassa on puinen arkku valkoista taustaa vasten, ei
       * ihmisiä.
       */
      kuva: {
        tiedosto: 'Boekenkist van Hugo de Groot, NG-KOG-1208.jpg',
        lyhyt: 'Kirja-arkku, jollaisessa Hugo de Groot kannettiin ulos Loevesteinin linnasta vuonna 1621.',
        selite: 'Kirja-arkku Rijksmuseumin kokoelmassa: tällaisessa '
          + 'arkussa Hugo de Groot kannettiin ulos Loevesteinin '
          + 'linnasta vuonna 1621.',
        lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
      },
      kysymykset: [
        'Miksi Hugo de Groot oli vankina?',
        'Miten arkku pääsi ulos linnasta tarkastamatta?',
        'Mitä hän kirjoitti paettuaan?',
      ],
      /*
       * 51,81638889 N / 5,02138889 E — nl-Wikipedia "Slot Loevestein",
       * prop=coordinates (haettu 29.8.2026).
       */
      paikka: {
        nimi: 'Loevesteinin linna',
        laudat: {
          maailmankartta: { x: 6000.7, y: 1310.3 },
          europe: { x: 307.6, y: 530.8 },
        },
      },
    },
    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTAUUDISTUS, ERÄ 10 (13.9.2026): AMSTERDAMIN KAUPUNKILEHDEN SIVUT
     * NOSTOIKSI.
     *
     * Sama jako kuin Pariisissa erässä 5
     * (docs/raportit/viesti-fable-karttauudistus-era5-20260913.md,
     * suunnitelman luku 4.7): lehden aihesivujen nostot ovat nyt
     * klikattavia karttapaloja kaupungin kohdekartalla. Kaikki tämän erän
     * nostot ovat KOHDEKARTALLA, eivät pääkartalla — omistajan sääntö
     * 2.9.2026 (tests/nostot-kartalla.test.mjs).
     *
     * TEKSTIÄ EI OLE KIRJOITETTU UUDESTAAN. Jokainen `lunastus`-kappale on
     * lehden oman noston `teksti` SANATARKASTI
     * (js/packs/kulttuuri-kategoriat.js, kaupunki `amsterdam`), ja `kuva`
     * on lehden oma kuvarivi kenttineen. Siirto on tehty ohjelmallisesti ja
     * todennettu ===-vertailulla
     * (tools/savukkeet/savuke-kaupunkien-nostot.mjs vartio 4b avaa jokaisen
     * kortin selaimessa ja vertaa merkki merkiltä).
     *
     * POIKKEUS 16.11.2026 (KK: Amsterdamin 9 tarinapaikkaa): viiden kortin
     * (Kapein talo, Maitotyttö, Kissalaiva, Herengracht 537 eli
     * `amsterdamin-puupaalut`, Yövartio) lunastus on kirjoitettu
     * uudelleen dokumentin docs/raportit/amsterdam-9-tarinapaikkaa-
     * dataluonnos-20261116.md mukaan, koska kohteista tuli tarinapaikkoja
     * ja vanhoissa teksteissä oli kahden lähteen vaatimusta täyttämättömiä
     * väitteitä. Lehden omat nostot (js/packs/kulttuuri-kategoriat.js)
     * jäivät ennalleen. Samassa erässä kaksi uutta korttia lopussa
     * (Portugalilainen synagoga, Montelbaanstoren).
     *
     * MINIKYSYMYKSET (erän 6 datamalli, kiintiö joka kolmas nosto):
     * `amsterdamin-kapein-talo`, `amsterdamin-kissalaiva`,
     * `amsterdamin-yovartio`.
     * ══════════════════════════════════════════════════════════════
     */
    {
      id: 'amsterdamin-kapein-talo',
      nimio: 'Kapein talo',
      otsikko: 'Kapein koko talo Amsterdamissa',
      symboli: 'historia',
      lunastus: [
        'Oude Hoogstraat 22 on Amsterdamin kapein koko talo: julkisivu on 2,02 '
          + 'metriä leveä ja talo viisi metriä syvä. Kanavien varren talot ovat '
          + 'kapeita ja syviä, ja niissä on usein katonrajassa nostopuu, hijsbalk, '
          + 'jonka avulla huonekalut nostetaan köydellä ikkunasta sisään, sillä '
          + 'portaat ovat jyrkät ja kapeat.',
        'Singel 7:n talon takajulkisivu on vain noin metrin levyinen, mutta '
          + 'etuosa on selvästi leveämpi, joten kapein koko talo on silti Oude '
          + 'Hoogstraatilla.',
        'Isoisäsi matkavuonna 1873 talo oli jo seissyt paikallaan yli sata '
          + 'vuotta: talon ensimmäinen arkistomaininta on vuodelta 1738. Nykyään siinä on teekauppa.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä iAmsterdam, Het Kleinste Huis, DutchReview, Amsterdam Oude Stad, '
        + 'Amsterdamian ja Wikipedia',
      kuva: {
        tiedosto: 'Detail van de top van de voorgevel, een klokgevel, met hijsbalk - Amsterdam - 20528909 - RCE.jpg',
        lyhyt: 'Kellopäätyjen hijsbalk-nostopuut ovat yhä käytössä.',
        selite: 'Kellopäädyn alta työntyvä hijsbalk-nostopuu on yhä käytössä.',
        lahde: 'René Gerritsen, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi Amsterdamin kanavatalot ovat niin kapeita ja syviä?',
        'Millaista on asua kahden metrin levyisessä talossa?',
        'Käytetäänkö nostopuita yhä, vai ovatko ne pelkkää koristetta?',
      ],
      visa: {
        kysymys: 'Amsterdamin kapeissa kanavataloissa portaat ovat jyrkät ja '
          + 'kapeat. Miten huonekalut saadaan yläkertaan?',
        vaihtoehdot: [
          'Päätykolmion nostopuusta köydellä ikkunasta sisään',
          'Ne kootaan vasta paikan päällä osista',
          'Ne nostetaan kanavasta veneellä takapihan kautta',
        ],
        oikea: 0,
        fakta: 'Oude Hoogstraat 22 on Amsterdamin kapein koko talo: julkisivu on '
          + '2,02 metriä leveä ja talo viisi metriä syvä.',
      },
      paikka: {
        nimi: 'Kapein talo',
        laudat: {
          maailmankartta: { x: 5996.6, y: 1285.5 },
          europe: { x: 305.2, y: 516.2 },
        },
      },
    },
    {
      id: 'amsterdamin-maitotytto',
      wiki: 'Maitotyttö',
      nimio: 'Maitotyttö',
      otsikko: 'Vermeer peitti omat esineensä maalilla',
      symboli: 'kulttuuri',
      visa: {
        kysymys: 'Mitä Rijksmuseumin tutkimus paljasti Maitotytön maalin alta?',
        vaihtoehdot: [
          'Toisen henkilön hahmon',
          'Kannuhyllyn ja tulikorin, jotka Vermeer peitti',
          'Taiteilijan nimikirjoituksen',
        ],
        oikea: 1,
        fakta: 'Rijksmuseum tutki taulua vuonna 2022 röntgen- ja infrapunatekniikoilla. Maalin alta paljastui kannuhylly ja tulikori, jotka Vermeer oli peittänyt pois.',
      },
      lunastus: [
        'Maitotyttö on pienempi kuin useimmat kuvittelevat: 45,5 senttiä korkea '
          + 'ja 41 leveä. Rijksmuseumin mukaan Johannes Vermeer maalasi sen noin vuonna 1660, ja hänen '
          + 'tuotannostaan tunnetaan vain noin 35 maalausta.',
        'Rijksmuseum tutki taulua vuonna 2022 röntgen- ja infrapunatekniikoilla. '
          + 'Maalin alta paljastui, että Vermeer oli suunnitellut seinälle '
          + 'kannuhyllyn ja lattialle tulikorin ja peittänyt ne sitten pois.',
        'Isoisäsi matkavuonna 1873 taulua ei vielä ollut Rijksmuseumissa. Se kuului '
          + 'Six-suvun yksityiskokoelmaan, ja museo osti sen vasta 1908 Vereniging '
          + 'Rembrandtin tuella. Rijksmuseum toimi tuolloin Trippenhuisissa; nykyinen '
          + 'rakennus avattiin 1885.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Rijksmuseum, Essential Vermeer ja DutchNews',
      kuva: {
        tiedosto: 'Johannes Vermeer - Het melkmeisje - Google Art Project.jpg',
        lyhyt: 'Johannes Vermeerin Maitotyttö, Rijksmuseumin mukaan maalattu noin vuonna 1660.',
        selite: 'Johannes Vermeerin Maitotyttö, jonka hän Rijksmuseumin mukaan maalasi noin vuonna 1660.',
        lahde: 'Johannes Vermeer, Wikimedia Commons (PD)',
      },
      kysymykset: [
        'Miksi Vermeer peitti jo maalaamansa kannuhyllyn ja tulikorin?',
        'Mitä muuta röntgen- ja infrapunakuvaus on paljastanut vanhoista '
          + 'maalauksista?',
        'Miksi Vermeerin tuotannosta tunnetaan vain noin 35 maalausta?',
      ],
      paikka: {
        nimi: 'Maitotyttö',
        laudat: {
          maailmankartta: { x: 5996.2, y: 1286 },
          europe: { x: 305, y: 516.5 },
        },
      },
    },
    {
      id: 'amsterdamin-kissalaiva',
      nimio: 'Kissalaiva',
      otsikko: 'Kanavalla asuu laivallinen kissoja',
      symboli: 'historia',
      lunastus: [
        'Vuonna 1966 Henriëtte van Weelde alkoi ottaa kotiinsa Herengrachtille '
          + 'kulkukissoja, ensimmäisenä emokissan pentuineen. Kun kissoja tuli lisää, '
          + 'hän hankki vuonna 1968 ensimmäisen laivan kissoille. Siitä tuli turvakoti: osa kissoista saa uuden kodin, ja laivalla vierailee kerrallaan '
          + 'vain kuusi ihmistä.',
        'Sisäänpääsy laivalle on ilmainen. Kissat ovat turvakodin asukkaita, '
          + 'eivät nähtävyys.',
        'Isoisäsi matkavuonna 1873 Kissalaivaa ei vielä ollut: ensimmäinen laiva hankittiin vasta 1968, 95 vuotta myöhemmin. Singel-kanavassa on nykyään '
          + 'uusi laiva, joka tuotiin paikalleen vuonna 2023.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Stichting De Poezenboot, Holland Times, DutchReview ja Mental Floss',
      kuva: {
        tiedosto: 'De Poezenboot (Exterior), Amsterdam (2168146135).jpg',
        lyhyt: 'Poezenboot Singel-kanavassa vuonna 2006; kuvan laiva on vanha, nykyinen tuotiin paikalleen 2023.',
        selite: 'Poezenboot Singel-kanavassa vuonna 2006. Kuvan laiva on vanha '
          + 'asuntolaiva; nykyinen laiva tuotiin paikalleen vuonna 2023.',
        lahde: 'Antony Stanley, Wikimedia Commons (CC BY-SA 2.0)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Lehden noston
       * `galleria`-kuvat kulkivat erässä 10 kiertotietä kohdekartan jutun
       * `kuvat`-listaan, koska nostokortti ei tuntenut kenttää. Nyt
       * tuntee (js/fokusnosto.js piirraNostonKuvasarja), joten kuvat ovat
       * siellä missä noston muutkin kuvat — selitteineen ja lähteineen,
       * merkki merkiltä samoina. Kohdekartan jutun oma kuvalista jäi
       * ennalleen: sama sisältö kahdella pinnalla, kuten `kuva` jo oli.
       */
      galleria: [
        {
          tiedosto: 'Mevrouw H. van Weelde en enkele medewerksters openen kooien op Poezenboot op S, Bestanddeelnr 933-5755.jpg',
          lyhyt: 'Henriëtte van Weelde hoiti Kissalaivaa yhä 1986, kahdeksantoista vuotta sen avaamisesta.',
          selite: 'Henriëtte van Weelde hoiti Kissalaivaa avustajineen yhä '
            + 'helmikuussa 1986, kahdeksantoista vuotta laivan avaamisen '
            + 'jälkeen.',
          lahde: 'Roland Gerrits / Anefo, Wikimedia Commons (CC0)',
        },
        {
          tiedosto: 'Three bikes on the canal bridge in Amsterdam (3798069610).jpg',
          selite: 'Vesilaitos Waternetin mukaan kanavista nostetaan vuosittain yli kymmenentuhatta polkupyörää.',
          lahde: 'joiseyshowaa, Wikimedia Commons (CC BY-SA 2.0)',
        },
      ],
      kysymykset: [
        'Millaista on asua asuntolaivalla Amsterdamin kanavassa?',
        'Kuka hoitaa Kissalaivan kissat nykyään?',
        'Mitä kulkukissoille tehtiin ennen vuotta 1966?',
      ],
      visa: {
        kysymys: 'Henriëtte van Weelden kotiin tuli kulkukissoja lisää ja '
          + 'lisää. Mitä hän teki?',
        vaihtoehdot: [
          'Muutti itse pienempään asuntoon naapurikadulle',
          'Hankki kissoille oman laivan',
          'Jakoi kissat ystävien koteihin ympäri kaupunkia',
        ],
        oikea: 1,
        fakta: 'Hän hankki vuonna 1968 ensimmäisen laivan kissoille, ja siitä tuli turvakoti.',
      },
      paikka: {
        nimi: 'Kissalaiva',
        laudat: {
          maailmankartta: { x: 5996.4, y: 1285.2 },
          europe: { x: 305.1, y: 516.1 },
        },
      },
    },
    {
      id: 'amsterdamin-puupaalut',
      nimio: 'Puupaalut',
      otsikko: 'Keskusta seisoo puutukkien päällä',
      symboli: 'historia',
      visa: {
        kysymys: 'Mistä maasta Amsterdamin kaupungintalon puupaalut tuotiin?',
        vaihtoehdot: [
          'Ruotsista',
          'Saksasta',
          'Norjasta',
        ],
        oikea: 2,
        fakta: 'Dam-torin kaupungintalon, nykyisen kuninkaanpalatsin, alle lyötiin 13 659 Norjasta tuotua puupaalua.',
      },
      lunastus: [
        'Amsterdamin keskusta on rakennettu pehmeälle, vetiselle maalle, joten '
          + 'vanhojen talojen alla on maahan lyötyjä puupaaluja. Dam-torin '
          + 'kaupungintalon, nykyisen kuninkaanpalatsin, alle lyötiin 13 659 Norjasta tuotua puupaalua; ensimmäinen kivi laskettiin 28. lokakuuta 1648.',
        'Veden alla paalu säilyy pitkään. Jos pohjavesi laskee, happi pääsee puuhun ja sienet alkavat lahottaa sitä. '
          + 'Maaliskuussa 1961 Herengracht 537:n eteen pystytettiin tukipaaluja, ja '
          + 'kuvan otti valokuvaaja Harry Pot.',
        'Isoisäsi matkavuonna 1873 Dam-torin rakennus oli jo kuninkaan palatsi, '
          + 'mutta sen alla olivat yhä samat 13 659 paalua.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Paleis Amsterdam, Alankomaiden kuningashuone, M for Amsterdam, RVO, '
        + 'Rotterdamin kaupungin esite ja Nationaal Archief',
      kuva: {
        tiedosto: 'Amsterdam stut zijn huizen met palen Perceel Herengracht 537 achter palenbos, Bestanddeelnr 912-2174.jpg',
        lyhyt: 'Herengracht 537:n eteen pystytettiin tukipaaluja maaliskuussa 1961.',
        selite: 'Herengracht 537:n eteen pystytettiin tukipaaluja maaliskuussa '
          + '1961. Kuvan otti valokuvaaja Harry Pot.',
        lahde: 'Harry Pot / Nationaal Archief / Anefo, Wikimedia Commons (CC0)',
      },
      kysymykset: [
        'Miten puupaalu lyödään pehmeään maahan?',
        'Mitä tehdään talolle, jonka paalut ovat päässeet lahoamaan?',
        'Miksi kaupungin pohjavesi pääsee laskemaan?',
      ],
      paikka: {
        nimi: 'Herengracht 537',
        laudat: {
          maailmankartta: { x: 5996.5, y: 1285.8 },
          europe: { x: 305.2, y: 516.4 },
        },
      },
    },
    {
      id: 'amsterdamin-yovartio',
      wiki: 'Yövartio (maalaus)',
      nimio: 'Yövartio',
      otsikko: 'Yövartiosta sahattiin palat pois',
      symboli: 'kulttuuri',
      lunastus: [
        'Rembrandt valmisti kaartin ryhmäkuvan vuonna 1642. Teoksella ei alun '
          + 'perin ollut nimeä, ja nimi Yövartio on tallessa asiakirjasta vasta '
          + '1700-luvun lopulta. Rijksmuseumin mukaan kuva esittää päiväsaikaan '
          + 'kulkevaa joukkoa, vaikka sävyt ovat tummat.',
        'Vuonna 1715 taulu siirrettiin kaupungintaloon Dam-torille, ja koska se '
          + 'oli liian suuri uudelle paikalle, siitä leikattiin kaistale joka '
          + 'reunalta. Eniten katosi vasemmalta, ja palasia ei ole koskaan löydetty. '
          + 'Gerrit Lundensin pieni 1600-luvun kopio näyttää, miltä koko taulu '
          + 'näytti.',
        'Isoisäsi matkavuonna 1873 taulu oli Trippenhuisissa '
          + 'Kloveniersburgwalilla, sillä nykyinen Rijksmuseum avattiin vasta 1885; '
          + 'nykyään taulu on siellä. Pinnalla oli paksu, tummunut lakka; osa siitä poistettiin vasta 1946–47 ja loput 1975–76.',
      ],
      lahde: 'Matkakirjan oma teksti · lähteinä Rijksmuseum (objektisivu, lehdistötiedote ja Bulletin 1976) ja National Gallery',
      kuva: {
        tiedosto: 'The Night Watch - cropped.jpg',
        lyhyt: 'Teos oli alun perin nimetön, ja nimi Yövartio tunnetaan vasta 1700-luvun lopulta.',
        selite: 'Rijksmuseumin mukaan teoksella ei alun perin ollut nimeä, ja '
          + 'nimi Yövartio tunnetaan asiakirjasta vasta 1700-luvun lopulta.',
        lahde: 'Rembrandt, Wikimedia Commons (PD)',
      },
      /*
       * GALLERIA KORTILLE (avoin kohta 11.1, 14.9.2026). Lehden noston
       * `galleria`-kuvat kulkivat erässä 10 kiertotietä kohdekartan jutun
       * `kuvat`-listaan, koska nostokortti ei tuntenut kenttää. Nyt
       * tuntee (js/fokusnosto.js piirraNostonKuvasarja), joten kuvat ovat
       * siellä missä noston muutkin kuvat — selitteineen ja lähteineen,
       * merkki merkiltä samoina. Kohdekartan jutun oma kuvalista jäi
       * ennalleen: sama sisältö kahdella pinnalla, kuten `kuva` jo oli.
       */
      galleria: [
        {
          otsikko: 'Näin taulu näytti ennen leikkausta',
          tiedosto: 'Lundens - Nachtwache-Kopie.jpg',
          lyhyt: 'Gerrit Lundensin pieni kopio näyttää, miltä Yövartio näytti ennen leikkausta 1715.',
          selite: 'Gerrit Lundensin 1600-luvulla maalaama pieni kopio näyttää, miltä koko Yövartio näytti ennen vuoden '
            + '1715 leikkausta.',
          lahde: 'Gerrit Lundens, Wikimedia Commons (PD)',
        },
      ],
      kysymykset: [
        'Mihin taulusta leikatut palaset joutuivat?',
        'Miksi taulu ylipäätään siirrettiin kaupungintaloon vuonna 1715?',
        'Mistä tiedetään, mitä taulusta puuttuu?',
      ],
      visa: {
        kysymys: 'Mitä Yövartiolle tehtiin vuonna 1715, kun se siirrettiin '
          + 'kaupungintaloon?',
        vaihtoehdot: [
          'Se maalattiin kokonaan uudelleen',
          'Siitä leikattiin kaistale joka reunalta',
          'Se jaettiin kahteen osaan ja ripustettiin eri seinille',
        ],
        oikea: 1,
        fakta: 'Taulu oli liian suuri uudelle paikalle. Eniten katosi '
          + 'vasemmalta, eikä palasia ole koskaan löydetty.',
      },
      paikka: {
        nimi: 'Yövartio',
        laudat: {
          maailmankartta: { x: 5996.6, y: 1285.5 },
          europe: { x: 305.3, y: 516.2 },
        },
      },
    },
    {
      /*
       * TARINAPAIKKA 'Portugalilainen synagoga' (KK 16.11.2026: Amsterdamin 9 tarinapaikkaa, korvaa Rembrandtin talon;
       * SK:n data-luonnos). Lunastus on sama teksti kuin js/packs/nahtavyysjutut.js 'Portugalilainen synagoga'. Vain
       * kahden itsenäisen lähteen väitteet (docs/raportit/amsterdam-9-tarinapaikkaa-dataluonnos-20261116.md kohta 8,
       * haara origin/sk/amsterdam-tarinapaikat); tarkistaja ja KK lukevat ennen junaa.
       * KOORDINAATTI: 1 lähde, tarkistettava kuvasta (52,3675 / 4,9053; Wikidata Q1853707 ja en-Wikipedia eivät ole
       * itsenäisiä). KK 16.11.: yksi lähde riittää yksiselitteiselle rakennukselle.
       */
      id: 'amsterdamin-portugalilainen-synagoga',
      nimio: 'Portugalilainen synagoga',
      otsikko: 'Synagoga, jossa päähallia valaisevat kynttilät',
      symboli: 'historia',
      visa: {
        kysymys: 'Mikä valaisee Portugalilaisen synagogan päähallia?',
        vaihtoehdot: [
          'Sähkölamput, jotka asennettiin 1900-luvun alkupuolella',
          'Kynttilät; päähalli ei ole koskaan saanut sähkövaloa',
          'Kaasulamput, jotka asennettiin 1800-luvun lopulla',
        ],
        oikea: 1,
        fakta: 'Päähalli ei ole koskaan saanut sähkövaloa eikä lämmitystä, ja sisätila on säilynyt lähes sellaisena '
          + 'kuin se 1600-luvulla tehtiin.',
      },
      lunastus: [
        'Portugalilainen synagoga vihittiin käyttöön 2. elokuuta 1675. Arkkitehti '
          + 'Elias Bouman oli suunnitellut sen, ja tontti oli ostettu joulukuussa '
          + '1670. Peruskivi laskettiin 17. huhtikuuta 1671.',
        'Synagogan päähalli ei ole koskaan saanut sähkövaloa eikä lämmitystä. '
          + 'Valona ovat kynttilät, ja sisätila on säilynyt lähes sellaisena kuin se '
          + '1600-luvulla tehtiin. Vuosina 1852–1854 päähallin ikkunat uusittiin.',
        'Isoisäsi matkavuonna 1873 synagoga oli seissyt nykyisellä Mr. Visserpleinillä 198 vuotta, ja kaksi vuotta myöhemmin se täytti kaksisataa vuotta.',
      ],
      // Lähdemuistiinpano (SK 16.11.2026, dataluonnos kohta 8): vihkiminen 2.8.1675, tontti joulukuussa 1670 ja peruskivet
      // 17.4.1671 = RCE:n monografia (2013) + Joods Amsterdam + en-Wikipedia; sähkövalo ja lämmitys: ei koskaan (RCE + Joods Amsterdam);
      // ikkunat 1852–1854 = RCE; kaksisataavuotisjuhla 1875 = RCE. Pois: kynttilöiden määrä (lähteet eroavat), "maailman suurin
      // synagoga", kustannus 186 000 guldenia (yksi lähde), 1872–75 kokoushuonehankkeet (vain RCE). Nimi Bouman kuten RCE ja en-WP.
      lahde: 'Matkakirjan oma teksti · lähteinä Rijksdienst voor het Cultureel Erfgoedin monografia (2013), Joods Amsterdam ja Wikipedia',
      // Kuva: Commons-tiedosto, CC BY-SA 4.0; EI VIELÄ PELIN MEDIASSA (docs/raportit/amsterdam-9-mediapyynto-20261116.md).
      kuva: {
        tiedosto: 'Exterieur OVERZICHT VOORGEVEL - Amsterdam - 20311779 - RCE.jpg',
        lyhyt: 'Portugalilaisen synagogan julkisivu vuonna 1997.',
        selite: 'Portugalilaisen synagogan julkisivu Rijksdienst voor het Cultureel Erfgoedin kuvassa vuodelta 1997.',
        lahde: 'A. J. van der Wal / RCE, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi synagogan päähallia ei ole koskaan lämmitetty?',
        'Kuka oli arkkitehti Elias Bouman?',
        'Miten synagogan kaksisataavuotisjuhlaa 1875 vietettiin?',
      ],
      // Mr. Visserplein 3. Laudat: Miller-kaava, sovitettu Amsterdamin viiteen korttiin (tarkkuus 0,05).
      paikka: {
        nimi: 'Portugalilainen synagoga',
        laudat: {
          maailmankartta: { x: 5996.8, y: 1285.7 },
          europe: { x: 305.4, y: 516.3 },
        },
      },
    },
    {
      /*
       * TARINAPAIKKA 'Montelbaanstoren' (KK 16.11.2026: Amsterdamin 9 tarinapaikkaa, korvaa Anne Frankin talon;
       * SK:n data-luonnos). Lunastus on sama teksti kuin js/packs/nahtavyysjutut.js 'Montelbaanstoren'. Vain kahden
       * itsenäisen lähteen väitteet (dataluonnos kohta 9); tarkistaja ja KK lukevat ennen junaa.
       * KOORDINAATTI: 1 lähde, tarkistettava kuvasta (52,3720 / 4,9056; Wikidata Q1946061, nl- ja en-Wikipedia).
       */
      id: 'amsterdamin-montelbaanstoren',
      nimio: 'Montelbaanstoren',
      otsikko: 'Torni, joka kallistui ja vedettiin suoraksi',
      symboli: 'historia',
      visa: {
        kysymys: 'Mitä Montelbaanstorenille tapahtui vuonna 1610?',
        vaihtoehdot: [
          'Torni paloi ja siihen rakennettiin uusi huippu',
          'Torni kallistui ja se vedettiin takaisin suoraksi',
          'Torni purettiin ja pystytettiin uudelleen toiselle rannalle',
        ],
        oikea: 1,
        fakta: 'Luultavasti Hendrick de Keyser suunnitteli tornille vuonna 1606 kahdeksankulmaisen tiiliosan ja renessanssihuipun. '
          + 'Vuonna 1610 torni kallistui ja se vedettiin suoraksi.',
      },
      lunastus: [
        'Montelbaanstoren on vanha puolustustorni Oudeschansin varrella. Luultavasti Hendrick de Keyser suunnitteli sille vuonna 1606 kahdeksankulmaisen tiiliosan ja renessanssihuipun, johon tuli kello ja soittokelloja. Vuonna 1610 '
          + 'torni kallistui ja se vedettiin suoraksi. Se on noin 48 metriä korkea.',
        'Isoisäsi matkavuonna 1873 torni oli seissyt Oudeschansin varrella jo yli kolmesataa vuotta. Vuonna 1852 tornia uhkasi purkaminen, mutta '
          + 'se säästyi. Torniin tuli Stadswaterkantoor, kaupungin vesikonttori, '
          + 'vasta 1878.',
      ],
      // Lähdemuistiinpano (SK 16.11.2026, dataluonnos kohta 9): De Keyser 1606, kallistuminen 1610, korkeus noin 48 m ja kellot =
      // ONH + ARCAM + jordaanweb + nl-/en-Wikipedia; 1852 purkuuhka ja pelastus "pelastui" (mekanismi yksi lähde, pois);
      // Stadswaterkantoor 1878 = ONH + ARCAM + jordaanweb + nl-WP (kaupungin vesikonttori; literaalikäännös, ei lisäväitteitä).
      // Pois: valmistumisvuosi (1515/1516/1517 ristiriita), tornin käyttö 1873, nimen alkuperä, minuuttiviisarit 1890, poliisipiste 1906.
      lahde: 'Matkakirjan oma teksti · lähteinä Open Nederlands Heritage (ONH), ARCAM, Geschiedenis Extra, Jordaanweb ja Wikipedia',
      // Kuva: Commons-tiedosto, CC0 (Rijksmuseum); EI VIELÄ PELIN MEDIASSA (docs/raportit/amsterdam-9-mediapyynto-20261116.md).
      kuva: {
        tiedosto: 'Gezicht op de Montelbaanstoren in Amsterdam, RP-F-F11686.jpg',
        lyhyt: 'Montelbaanstoren Rijksmuseumin stereokuvassa 1860–1885.',
        selite: 'Rijksmuseumin kokoelman stereokuva Montelbaanstorenista, otettu vuosien 1860 ja 1885 välillä, isoisän matkan aikoihin.',
        lahde: 'Rijksmuseum, Wikimedia Commons (CC0)',
      },
      kysymykset: [
        'Miten kallistunut torni vedettiin suoraksi?',
        'Miksi tornia uhkasi purkaminen vuonna 1852?',
        'Mitä tekemistä tornilla oli kaupungin vesikonttorin kanssa?',
      ],
      // Oudeschans 2. Laudat: Miller-kaava, sovitettu Amsterdamin viiteen korttiin (tarkkuus 0,05).
      paikka: {
        nimi: 'Montelbaanstoren',
        laudat: {
          maailmankartta: { x: 5996.9, y: 1285.5 },
          europe: { x: 305.4, y: 516.2 },
        },
      },
    },
  ],
};
