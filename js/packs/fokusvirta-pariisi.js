/*
 * PARIISIN FOKUSVIRTA — annostelun sisältö dataksi.
 *
 * Sisartiedosto js/packs/fokusvirta-madrid.js:lle ja -wien.js:lle:
 * samat kentät, sama järjestys, sama moottori (js/fokusvirta.js).
 *
 * ── MISTÄ TEKSTIT TULEVAT ──────────────────────────────────────────
 *
 * KAANON (päätoimittaja-Fable 28.8.2026): matkakirjan teksti ja
 * aarremerkinnän teksti ovat SANATARKASTI hänen kirjoittamansa.
 * Luenta on sama teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * ISO AARRE: kruununjalokivien safiiri (aarremerkintä).
 *
 * FAKTAPOHJA täyille: docs/mantereet-tyoaineisto/takyt-pariisi.md,
 * jonka jokainen väite on tarkistettu Wikipedian rajapinnasta
 * artikkeli ja osio kerrallaan (täyt 4, 8 ja 17). Oppitunti käyttää
 * pelin omaa, jo hyväksyttyä Pariisi-aineistoa (js/packs/
 * kulttuuri-kategoriat.js Seine-jakso ja js/packs/maa-kategoriat.js
 * FRA-nosto "Seinen vihreät kirjalaatikot") sekä tarinakaaren omaa
 * faktariviä sanan bouquin merkityksestä (js/tyohuone-kehitys-data.js
 * KAARI_PAKETIT, pariisi) — se on tarkoitus, koska oppitunnin tehtävä
 * on pohjustaa laattakysymys lehden omalla aineistolla.
 *
 * ── KOLME OMISTAJAN KORJAUSTA (28.8.2026) ──────────────────────────
 *
 *   1. Matkakirjaan ei tule kuvaa (kuvat kuuluvat kaupunkilehteen).
 *   2. Pöllön kuva on kaupunkilehden avauskarusellin generoitu hero
 *      (js/packs/kulttuuri-kategoriat.js, pariisi/avauskuvat).
 *   3. Valinta-askelta ei ole: `valinta`-kenttää ei kirjoiteta.
 *
 * ── KUVAT ──────────────────────────────────────────────────────────
 *
 * Jokainen Commons-tiedosto on kysytty imageinfo-rajapinnasta
 * 28.8.2026 (olemassaolo, koko, lisenssi, tekijä, kuvaus,
 * Restrictions) — ei arvattuja nimiä.
 */

/*
 * ---------- LEHDEN NIMETTYJEN TEHTÄVIEN VISAT ----------
 *
 * SISÄLTÖ ON LEHDEN OMAA. Piaf-kysymys on Pariisin lehden sivun 2
 * ("Musiikki") oman noston "Édith Piaf lauloi ensin kadulla" tekstiä
 * ja metrokysymys sivun 1 ("Pariisi") oman noston "Metron sisäänkäynti
 * koottiin palasista" tekstiä (js/packs/kulttuuri-kategoriat.js).
 * Uusia faktaväitteitä ei ole kummassakaan.
 *
 * MIKSI EI KIRJALAATIKKOKYSYMYSTÄ: Pariisin laattakysymys
 * (kohtaaminen, ks. alempana) kysyy, mistä Seinen kirjakauppiaiden
 * nimi tulee. Jos lehden aarteen avaava tehtävä kysyisi samoista
 * laatikoista, aarrekysymys olisi ratkaistu ennen kuin Colettea on
 * tavattu.
 */
const PIAF_VISA = {
  kysymys: 'Yökerhon omistaja kuuli Édith Piafin laulavan kadulla '
    + 'vuonna 1935 ja antoi hänelle lempinimen la Môme Piaf. Minkä '
    + 'linnun mukaan?',
  vaihtoehdot: [
    'Varpusen',
    'Kyyhkyn',
    'Satakielen',
  ],
  oikea: 0,
  fakta: 'Piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. '
    + 'Laulaja oli 142 senttiä pitkä, ja tunnetuimman laulunsa La Vie '
    + 'en rose sanat hän kirjoitti itse.',
};

const GUIMARD_VISA = {
  kysymys: 'Pariisin metron valurautaiset sisäänkäynnit suunnitteli '
    + 'Hector Guimard. Miten hän sai työn?',
  vaihtoehdot: [
    'Hän voitti arkkitehtikilpailun ylivoimaisesti',
    'Hän ei ollut edes osallistunut arkkitehtikilpailuun',
    'Hän oli kaupungin oma arkkitehti',
  ],
  oikea: 1,
  fakta: 'Kilpailun 21 ehdotuksesta yksikään ei kelvannut. Guimard '
    + 'piirsi vakio-osia, jotka sopivat yhteen kuin rakennussarja: '
    + 'sisäänkäyntejä tehtiin 167, ja jäljellä olevat 86 rauhoitettiin '
    + 'vuonna 1978.',
};

export const FOKUSVIRTA_PARIISI = {
  kaupunki: 'pariisi',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /*
     * Paikkarivi on kirjoittajan oma. Kuukausi on työaineiston
     * mukainen: docs/mantereet-tyoaineisto/takyt-pariisi.md, täky 8
     * ajoittaa isoisän Louvren ohi kulkemisen lokakuulle 1873.
     */
    paikkarivi: 'Pariisi, lokakuussa 1873. Sateen jälkeen kirkasta; puntari '
      + 'nousee.',
    /* KAANON: OMISTAJAN TEKSTI (postilaatikko 9.9.2026, EUROOPPA-MATKAKIRJA-1873-20260909). Sanasta sanaan. 352 merkkiä (yläraja 400). */
    teksti: "Tuileries’n keisarillinen palatsi oli poltettu Pariisin kapinan aikana kaksi vuotta sitten. Tyhjät ikkunat seisoivat yhä puutarhan laidalla. Asetin kameran puiden alle ja etsin kulmaa, josta rauniot eivät näkyisi. Halusin viedä kotiin kauniin Pariisin. Siirsin jalustaa kahdesti. Sitten käänsin kameran suoraan palatsiin: tämäkin oli kaupunki, jossa olin käynyt.",
    /*
     * Luenta on sama teksti tunnetagein. Äänite generoidaan tästä
     * kentästä työnkulussa .github/workflows/generoi-luennat.yml
     * (tools/generoi-luennat.mjs pariisi), joka kirjoittaa täsmälleen
     * alla nimetyn tiedoston. Nimi on kirjoitettu etukäteen: kenttä on
     * kytkentä, ja ennen ajoa puuttuva mp3 jättää kaiuttimen vaiti
     * kaatamatta mitään (js/luenta.js playDiaryVoice).
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
     * Hiljaiset osuudet: "Paluumatkalla seurasin kaksi korttelia miestä"
     * (kuljetus kohtaukseen).
     */
    reaktiot: [
  {
    "id": "pariisi.r1",
    "ankkuri": "palatsi oli poltettu Pariisin kapinan aikana kaksi vuotta sitten",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.5,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "pariisi.r2",
    "ankkuri": "Tyhjät ikkunat seisoivat yhä puutarhan laidalla",
    "tarkoitus": "vakavoituu",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "pariisi.r3",
    "ankkuri": "etsin kulmaa, josta rauniot eivät näkyisi",
    "tarkoitus": "epailee",
    "voimakkuus": 0.4,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "pariisi.r4",
    "ankkuri": "Halusin viedä kotiin kauniin Pariisin",
    "tarkoitus": "myotailee",
    "voimakkuus": 0.35,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  },
  {
    "id": "pariisi.r5",
    "ankkuri": "käänsin kameran suoraan palatsiin",
    "tarkoitus": "myotailee",
    "voimakkuus": 0.5,
    "siirtyma": 0,
    "perustelu": "Hyväksytyn 14.9.2026 tekstin sisältöön sidottu kuuntelureaktio."
  }
],
    /* ÄÄNITE: luenta generoitu 9.9.2026 tästä tekstistä (generoi-luennat.yml ajo 17). */
    luenta: "[softly] Tuileries’n keisarillinen palatsi oli poltettu Pariisin kapinan aikana kaksi vuotta sitten. Tyhjät ikkunat seisoivat yhä puutarhan laidalla. Asetin kameran puiden alle ja etsin kulmaa, josta rauniot eivät näkyisi. Halusin viedä kotiin kauniin Pariisin. Siirsin jalustaa kahdesti. [warmly] Sitten käänsin kameran suoraan palatsiin: tämäkin oli kaupunki, jossa olin käynyt.",
    aanite: 'assets/audio/puhe-fokus-matkakirja-pariisi.mp3',
    /*
     * LUENTAKUVA KARTAN PÄÄLLE (kuvatoimitus 10.9.2026, matkakirja-eurooppa-1873-pariisi-r20260909-paper-v4;
     * SHA-256 55a759868bf735bd36dde99d97298615766696004752ef6ad7aac45d197f2837;
     * omistaja: "Voit lähettää nämä kahdeksan versiota suoraan peliin").
     * Kuvatekstit toimituksesta sanasta sanaan: lyhyt kartalle, pitkä
     * suurennokseen. Lähde on pelin oma havainnekuvamerkintä; lahteet on
     * toimituksen tausta-aineisto (ei näy pelaajalle).
     */
    luentakuva: {
      osoite: 'https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-pariisi-r20260909-paper-v4.jpg',
      // Kuvatekstit tekstisessiolta (KOKO-EUROOPPA V1.2, omistaja 9.9.: hyväksyy
      // kaiken mitä se ehdottaa). Lyhyt kuvan alle, pitkä suurennokseen.
      lyhyt: 'Pariisi, 1873. Ooppera harjoitteli juhlapukuaan.',
      selite: 'Uusi oopperatalo seisoo jo juhlapuvussaan, vaikka telineet, kivilohkot ja mutainen työmaa paljastavat harjoitusten jatkuvan. Arki tekee vielä töitä, jotta yleisö voisi myöhemmin vain astua sisään.',
      lahde: 'Matkakirjan havainnekuva',
      lahteet: [
      'https://www.parismuseescollections.paris.fr/en/node/490866',
      'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/construction-du-palais-garnier-actuel-opera-national-de-paris-9eme',
      ],
    },
    luentakuva2: {
      osoite: "https://media.matkakirja.app/matkakirja/eurooppa-1873/matkakirja-eurooppa-1873-pariisi-r20260911-paper2-v1.jpg",
      lyhyt: "Pariisi, 1873. Leipä kainalossa kulki kadun paras esiintyjä.",
      selite: 'Sade kiillotti kadun, ja mies kulki edellä leipä kainalossa. Seurasin häntä kaksi korttelia kuulematta pääsymaksusta sanaakaan.',
      lahde: "Matkakirjan havainnekuva",
      lahteet: ["https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/construction-du-palais-garnier-actuel-opera-national-de-paris-9eme"],
    },
  },

  /* ---------- 2. Pöllön nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * PULUCAM (kuvatoimitus 9.9.2026, erat euv1-era04; tilaus
     * PULU-CAM-EUROOPPA-20260909, tekstisession kuvakohtaiset promptit;
     * omistaja: "ne voi hyvaksya sellaisenaan suoraan peliin").
     * Kuvatekstit sanasta sanaan: lyhyt kuvan alle, pitka karuselliin.
     * Lahteet on tausta-aineisto (ei nay pelaajalle). Tiedostot: pulu-cam-pariisi-01-r20260909-euv1-v1.jpg.
     */
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/matkakirja/pulu-cam/pulu-cam-pariisi-01-r20260909-euv1-v1.jpg',
        lyhyt: 'Pariisi: oopperan paras aitiopaikka jäi ilman samettia.',
        selite: 'Palais Garnierin katon reunalla kulta, saumat ja sadejäljet näkyvät samassa lähikuvassa. Juhla-asukin tarvitsee huoltoa, ja minun aitiopaikastani puuttui vain tuoli.',
        lahde: 'Matkakirjan havainnekuva',
        lahteet: [
          'https://www.operadeparis.fr/actualites/restauration-de-la-facade-principale-du-palais-garnier',
          'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/loggia-et-toit-de-l-opera-garnier-9eme-arrondissement-paris',
          'https://www.operadeparis.fr/en/enterprises/film-and-spaces-locations',
        ],
      },
    ],
    /* Maadoitus poistettu 8.9.2026 (omistaja: yksi kupla per kaupunki); kupla alla. */
    /* KUPLA: OMISTAJAN TEKSTI (postilaatikko 9.9.2026). Sanasta sanaan. */
    kommentti: ["Palatsia ei enää ole, mutta Tuileries’n puutarhassa voi siirtää vihreän tuolin juuri siihen, missä haluaa istua. Valitsin selkänojan auringosta. Tuolilla istuva nainen käänsi sen ystäväänsä kohti, ja minä sain uuden näkymän liikahtamatta. Jäin kuuntelemaan. He olivat tavanneet täällä jo koululaisina."],
    /* Pulun reaktiotagi (docs/pulu-reaktiot.md), ei näy tekstissä. */
    tunne: { tunne: 'ilo', voimakkuus: 0.55 },
    /*
     * Huomio viittaa herokuvan kohteeseen (Eiffel-torni). Faktat:
     * torni rakennettiin vuoden 1889 maailmannäyttelyyn väliaikaiseksi
     * (lehden oma avauskuvan selite), rauniot purettiin helmikuun ja
     * syyskuun välillä 1883 eli kymmenen vuotta isoisän käynnin
     * jälkeen (takyt-pariisi.md, täky 8).
     */
    teksti: 'Tuo torni tuolla nousi vuoden 1889 näyttelyyn ja se oli '
      + 'tarkoitettu väliaikaiseksi. Sitä ei purettu. Ne rauniot, jotka '
      + 'isoisäsi näki, purettiin sen sijaan kymmenen vuotta hänen '
      + 'käyntinsä jälkeen. Katso ensin tonne ylös.',
    kuva: {
      ampari: 'herokoe/hero-pariisi-eiffel.jpg',
      lyhyt: 'Eiffel-torni rakennettiin 1889 maailmannäyttelyyn väliaikaiseksi, maailman korkein vuosikymmeniksi.',
      selite: 'Eiffel-torni rakennettiin vuoden 1889 maailmannäyttelyyn '
        + 'väliaikaiseksi, ja siitä tuli maailman korkein rakennelma '
        + 'neljäksi vuosikymmeneksi.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },

  /* ---------- 3. Kolme täkypolkua ---------- */
  takyt: [
    {
      /*
       * Faktat: takyt-pariisi.md, täky 8 (VARMA, en-Wikipedia
       * "Tuileries Palace", osiot "Destruction" ja "Demolition").
       * IKÄSOPIVUUS (13+): sytyttäminen kerrotaan tapahtumana, ei
       * kuvauksena; uhreista lähde ei puhu eikä täky keksi niitä.
       *
       * ── AVAUS KIRJOITETTU UUSIKSI 1.9.2026 (nostojen sisältöaudit) ─
       *
       * Sama palatsi, sama vuoden 1871 palo ja sama piste kartalla oli
       * kahdessa kortissa: tässä ja fokuskohteessa `tuileries`
       * (js/packs/fokuskohteet-fra.js). Kumpaakaan ei poistettu, vaan
       * TYÖNJAKO SELVITETTIIN:
       *
       *   fokuskohde `tuileries` = PALATSI. Mikä se oli: Katariina de
       *     Medicin rakennuttama 1564, 266 metrin julkisivu,
       *     hallitsijoiden koti, ja miten se poltettiin. Ei muutettu —
       *     sen oma kysymysrivi ja kadonneen ihmeen kortti nojaavat
       *     siihen tekstiin.
       *   tämä syvennys = RAUNIO. Se yksitoista vuotta, jotka isoisä
       *     näki, ja se mihin palatsi lopulta hajosi. Palon reseptiä
       *     (petroli, terva, tärpätti, 48 tuntia) ei enää toisteta
       *     täällä, koska se on kohteen kortissa.
       *
       * UUTTA AINEISTOA EI HAETTU MUUALTA: kaikki lisätty on samasta
       * artikkelista, osiot vain luettiin loppuun asti (en-Wikipedia
       * "Tuileries Palace", osiot "Destruction during the Paris
       * Commune", "Demolition" ja "Proposed reconstruction"; haettu
       * 1.9.2026):
       *   - kommunardien polttamia muita muistomerkkejä, kuten
       *     kaupungintalo, rakennettiin uudelleen jo 1870-luvulla;
       *   - purkupäätöksen teki 1882 kolmas tasavalta, joka oli
       *     armahtanut maanpakoon lähteneet kommunardit; vastaan
       *     olivat Georges-Eugène Haussmann ja historioitsijat;
       *   - keskuspaviljongin päätykolmio on Pariisin Square Georges
       *     Cainissa, muita paloja Louvressa, Trocadéron puutarhassa,
       *     Berliinin Schwanenwerderissä, Italian Bordigherassa ja
       *     Quiton Palacio de Carondeletissa;
       *   - huonekalut ja maalaukset oli viety varastoon sodan
       *     alkaessa 1870, ja vuonna 2003 perustettiin komitea, joka
       *     esittää palatsin rakentamista takaisin.
       */
      id: 'tuileriat',
      nappi: 'Palatsi, joka jäi seisomaan poltettuna',
      otsikko: 'Tuileriain rauniot',
      teksti: 'Se rauniorivi, jonka ohi sinä kävelit, olisi voitu '
        + 'korjata. Palo oli vienyt katon ja koko sisustan, mutta '
        + 'kivimuurit seisoivat ehjinä — ja kaupungintalo, jonka '
        + 'kommunardit polttivat niin ikään, rakennettiin uudelleen jo '
        + '1870-luvulla. Tuileriat jäivät sen sijaan paikoilleen '
        + 'Louvren länsipäähän yksitoista vuotta, ja isoisäsi näki '
        + 'tyhjät ikkuna-aukot taivasta vasten. Purkupäätöksen teki '
        + '1882 kolmas tasavalta, sama joka oli armahtanut maanpakoon '
        + 'lähteneet kommunardit; vastaan olivat muun muassa '
        + 'Georges-Eugène Haussmann ja joukko historioitsijoita. Purku '
        + 'alkoi helmikuussa 1883 ja päättyi 30. syyskuuta samana '
        + 'vuonna. Sitten palatsi levisi ympäri maailman: yrittäjä '
        + 'Achille Picart myi kiviä ja marmoria matkamuistoina, ja '
        + 'osista rakennettiin Korsikalle Ajaccion lähelle kokonainen '
        + 'palatsi, Château de la Punta. Keskuspaviljongin päätykolmio '
        + 'seisoo Pariisissa Square Georges Cainissa, ja paloja on '
        + 'Louvressa, Trocadéron puutarhassa, Berliinissä, Italian '
        + 'Bordigherassa ja Quiton presidentinpalatsissa asti. '
        + 'Huonekalut ja maalaukset olivat koko ajan tallessa: ne oli '
        + 'viety varastoon, kun sota alkoi 1870. Vuonna 2003 '
        + 'perustettiin komitea, joka esittää palatsin rakentamista '
        + 'takaisin.',
      lahde: 'en-Wikipedia "Tuileries Palace". Tarkistettu 1.9.2026.',
      /*
       * PÄÄKUVAKSI HAVAINNEKUVA (29.8.2026, aalto 1). Sama malli kuin
       * täkynostoilla v1307:stä alkaen: repon oma generoitu kuva, jolla
       * ei ole Commons-nimeä eikä varareittiä, joten kenttä on `osoite`
       * eikä `tiedosto` (js/fokusvirta.js kuvanOsoite).
       *
       * LÄHDERIVI ON SOVITETTU, KOSKA KUVASSA EI OLE LOISTOAIKAA (sama
       * ratkaisu kuin v1307:n draculalla ja v1312:n Szegedillä):
       * palatsin loisto oli ohi 1871, ja koko täkyn juttu on nimenomaan
       * se, että raunio jäi seisomaan yksitoista vuotta. Kuva on siis
       * se, mitä isoisä näki: katoton kivirunko lauta-aidan takana ja
       * pariisilaisia jatkamassa elämäänsä sen edessä.
       *
       * SILMÄTARKISTUS 29.8.2026: ei tekstiä, ei nykyaikaa; raunio +
       * 1873 asuinen kävelijäjoukko on juuri oikein tähän täkyyn.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-tuileriat-loistoaika.webp',
        lyhyt: 'Tuileriain palatsin palanut runko puutarhan puolelta: katto poissa, kivimuurit ehjät.',
        selite: 'Tuileriain palatsin palanut runko puutarhan puolelta: '
          + 'katto poissa, kivimuurit ehjät, lauta-aita raunion edessä '
          + 'ja kaupunkilaisia altaan äärellä.',
        lahde: 'Matkakirjan havainnekuva: rauniot isoisän matkavuonna',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 28.8.2026: 3000×2285, CC0, Henri Emile Cimarosa
       * Godefroy, kuvattu 1871–1883, kuvaus "Vue des Tuileries après
       * l'incendie de 1871". Restrictions tyhjä. SILMÄTARKISTUS tehty:
       * kuvassa on raunio aidan takana, ei tunnistettavia ihmisiä.
       * Tämä on juuri se näkymä, jonka isoisä näki.
       */
      valokuva: {
        tiedosto: "Vue des Tuileries après l'incendie de 1871, PH83415.jpg",
        lyhyt: 'Tuileriain palatsi palon jälkeen; rauniot seisoivat vielä kaupungin keskellä samalta ajalta.',
        selite: 'Tuileriain palatsi palon jälkeen. Valokuva on samalta '
          + 'ajalta, jona rauniot seisoivat kaupungin keskellä.',
        // Tekijän nimi Commonsin omassa muodossa (tools/
        // tarkista-tekijat.mjs vertaa merkintää suoraan siihen).
        lahde: 'Godefroy, Henri Emile Cimarosa, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Mihin poltetun palatsin kivet päätyivät purkamisen '
          + 'jälkeen?',
        vaihtoehdot: [
          'Seinen rantamuureihin',
          'Uuden oopperatalon perustuksiin',
          'Matkamuistoiksi ja Korsikalle rakennettuun palatsiin',
        ],
        oikea: 2,
        /*
         * FAKTARIVI PÄIVITETTY 1.9.2026: vanha rivi ("rauniot seisoivat
         * yksitoista vuotta, kunnostaminen olisi ollut mahdollista")
         * toistaa nyt sanasta sanaan syvennystekstin avauksen, koska
         * teksti kirjoitettiin uusiksi juuri siitä näkökulmasta. Tilalla
         * on saman artikkelin osion "Proposed reconstruction" tieto,
         * jota teksti ei sano loppuun asti.
         */
        fakta: 'Uudelleenrakentamista esittävät vetoavat yhä siihen, '
          + 'että suuri osa palatsin alkuperäisistä huonekaluista ja '
          + 'maalauksista on tallella: ne vietiin varastoon, kun sota '
          + 'alkoi 1870, eivätkä ne olleet talossa palon aikaan.',
      },
    },
    {
      /*
       * ELÄINTÄKY (Raamatun linjaus: täkyihin myös eläinjuttuja) — ja
       * Livian oman suvun ammatti, joten pöllö saa tässä kuivan
       * ylpeyden hetken samaan tapaan kuin Sofian pöllöpatsaalla.
       * Faktat: takyt-pariisi.md, täky 4 (VARMA, en-Wikipedia "René
       * Dagron" ja "Pigeon post"). Aineiston kielto noudatettu: sama
       * lähde kumoaa väitteen haavoittuneiden kuljettamisesta
       * palloilla, eikä sitä sekoiteta tähän.
       */
      id: 'kyyhkyposti',
      nappi: 'Kyyhkyt, jotka kantoivat kokonaisen kaupungin postin',
      otsikko: 'Piiritetyn Pariisin kyyhkyposti',
      teksti: 'Sallitko, että kerron erään sukuni työsuorituksen. Kun '
        + 'preussilaiset sulkivat Pariisin syyskuussa 1870, viimeiset '
        + 'lennätinlangat katkaistiin 19. päivä ja Seinen pohjassa '
        + 'kulkenut salakaapeli löydettiin ja katkaistiin 27. päivä. '
        + 'Kaupunkiin päin ainoa toimiva reitti oli kirjekyyhky. Kyyhkyt '
        + 'vietiin ulos kuumailmapalloilla, ja valokuvaaja René Dagron '
        + '— mikrofilmin patentin haltija vuodesta 1859 — tarjoutui '
        + 'pienentämään viestit. Sopimus allekirjoitettiin 11. '
        + 'marraskuuta 1870: viisitoista frangia tuhatta merkkiä kohti. '
        + 'Dagron sai kuvat pienenemään yli nelikymmenkertaisesti; yksi '
        + 'filmi painoi noin viisi sadasosagrammaa, ja yksi kyyhky '
        + 'kantoi niitä jopa kaksikymmentä pyrstösulkiin sidotussa '
        + 'putkessa. Perillä filmi asetettiin kahden lasilevyn väliin ja '
        + 'heijastettiin taikalyhdyllä seinälle, josta viestit '
        + 'kirjoitettiin puhtaaksi. Saksalaiset kouluttivat haukkoja '
        + 'pysäyttämään kyyhkyjä. Minulla ei ole tähän mitään '
        + 'lisättävää.',
      lahde: 'en-Wikipedia "René Dagron". Tarkistettu 1.9.2026.',
      /*
       * Commons 28.8.2026: 5047×8008, CC0, René Dagron, kuvattu
       * 1870–1871, kuvaus "Pellicule montée" — Dagronin oma
       * mikrofilmi piiritysajalta. Restrictions tyhjä.
       */
      kuva: {
        tiedosto: 'Pellicule du Journal Pigeons Voyageurs, Souvenir du Siège de Paris, 1870-1871. PH20110 (15 of 20).jpg',
        selite: 'René Dagronin mikrofilmi piiritetystä Pariisista. '
          + 'Filmin koko on noin viisi senttiä kolme senttiä.',
        // Tekijän nimi Commonsin omassa muodossa (ks. yllä).
        lahde: 'Dagron, Prudent René-Patrice, Wikimedia Commons (CC0)',
      },
      visa: {
        kysymys: 'Miten kokonaisten sanomalehtien verran viestejä '
          + 'saatiin yhden kyyhkyn kannettavaksi?',
        vaihtoehdot: [
          'Ne kirjoitettiin silkkipaperille lyijykynällä',
          'Ne kuvattiin mikrofilmille',
          'Ne lyhennettiin salakielisiksi numeroiksi',
        ],
        oikea: 1,
        fakta: 'Perillä filmi heijastettiin taikalyhdyllä seinälle ja '
          + 'viestit kirjoitettiin puhtaaksi. Saksalaiset yrittivät '
          + 'pysäyttää kyyhkyt koulutetuilla haukoilla.',
      },
    },
    {
      /*
       * Faktat: takyt-pariisi.md, täky 17 (VARMA yhdistyksen
       * perustamisesta ja näyttelystä, en-Wikipedia "Impressionism").
       * Aineiston varaus noudatettu: Nadarin ateljeen KATUOSOITE ei ole
       * lähteessä, joten sitä ei kirjoiteta. Myöskään Nadarin
       * kuumailmapalloja ei yhdistetä tähän, koska sitä yhteyttä ei
       * vahvistettu.
       *
       * MIKSI TÄMÄ TÄKY: isoisän merkintä päättyy Louvren vartijaan, ja
       * juuri Louvren Salon oli se ovi, jonka nämä maalarit kiersivät.
       */
      id: 'impressionistit',
      nappi: 'Kolmekymmentä taiteilijaa, jotka perustivat oman näyttelynsä',
      otsikko: 'Nimi, joka oli alun perin pilkkaa',
      teksti: 'Kun sinä kävelit Pariisissa, ranskalaista taide-elämää '
        + 'hallitsi yhä Salon: sen valitsematta jäänyt maalari jäi '
        + 'näkymättömäksi. Omaa näyttelyä hylätyille oli anottu turhaan '
        + '1867 ja uudelleen 1872. Joulukuussa 1873 — kaksi kuukautta '
        + 'isoisäsi käynnin jälkeen — Monet, Renoir, Pissarro, Sisley, '
        + 'Cézanne, Berthe Morisot, Degas ja joukko muita perustivat '
        + 'oman yhdistyksen esittääkseen työnsä itse, ja jäseneksi '
        + 'liittyvän piti luopua Salonista kokonaan. Ensimmäinen '
        + 'näyttely pidettiin huhtikuussa 1874 valokuvaaja Nadarin '
        + 'ateljeessa, ja mukana oli kolmekymmentä taiteilijaa. '
        + 'Kriitikko Louis Leroy ivasi Monet’n maalausta Impression, '
        + 'soleil levant ja otsikoi juttunsa "Impressionistien '
        + 'näyttely". Pilkkanimi jäi — ja taiteilijat ottivat sen itse '
        + 'käyttöön.',
      lahde: 'en-Wikipedia "Impressionism". Tarkistettu 1.9.2026.',
      /*
       * Commons 28.8.2026: 5773×4478, public domain, Claude Monet,
       * päiväys 1872. Restrictions tyhjä. Maalaus on siis tehty ennen
       * isoisän matkaa ja asetettiin näytteille vasta sen jälkeen.
       */
      kuva: {
        tiedosto: 'Monet - Impression, Sunrise.jpg',
        lyhyt: 'Claude Monet\'n Impression, soleil levant vuodelta 1872 antoi pilkkanimen koko ryhmälle.',
        selite: 'Claude Monet’n Impression, soleil levant vuodelta '
          + '1872. Kriitikko teki sen nimestä pilkkanimen koko '
          + 'ryhmälle.',
        lahde: 'Claude Monet 1872, Wikimedia Commons (public domain)',
      },
      visa: {
        kysymys: 'Mistä impressionistit saivat nimensä?',
        vaihtoehdot: [
          'Nadarin ateljeen kyltistä',
          'Yhdistyksensä virallisesta nimestä',
          'Kriitikon pilkkaavasta otsikosta',
        ],
        oikea: 2,
        fakta: 'Yhdistyksen oikea nimi oli pitkä ja virallinen. '
          + 'Ensimmäiseen näyttelyyn huhtikuussa 1874 osallistui '
          + 'kolmekymmentä taiteilijaa, ja jokainen heistä oli luvannut '
          + 'pysyä poissa Salonista.',
      },
    },
  ],

  /*
   * ---------- 4. Oppitunti ----------
   * Pohjustaa laattakysymyksen, joka esitetään kohtaamisessa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, pariisi: *"Seinen
   * rannalla kirjoja on myyty laatikoista vuosisatoja. Mistä myyjien
   * nimi bukinisti tulee?"* → vanhaa kirjaa tarkoittavasta sanasta).
   *
   * Visasääntö täyttyy: vastaus löytyy tekstistä, mutta kysymyksen
   * sanamuoto ei toistu siinä sellaisenaan.
   *
   * FAKTAT ovat pelin omasta, jo hyväksytystä aineistosta:
   * ammattikunta 1500-luvulta, parisensataa kauppiasta ja laatikoiden
   * määrä (js/packs/kulttuuri-kategoriat.js, pariisin Seine-jakso),
   * kahdeksan metrin kaidepätkä, neljän laatikon katto, neljä päivää
   * viikossa, vaunuvihreä maali ja vuoden 2024 peruttu purkupäätös
   * (js/packs/maa-kategoriat.js, FRA "Seinen vihreät kirjalaatikot").
   * Sanan bouquin merkitys on tarinakaaren oma faktarivi.
   */
  oppitunti: {
    otsikko: 'Joki, joka virtaa kahden kirjahyllyn välissä',
    teksti: 'Seinen kaiteisiin on pultattu vihreitä peltilaatikoita, ja '
      + 'niistä myydään käytettyjä kirjoja, vanhoja lehtiä ja '
      + 'julisteita. Ammattikunta on ollut rannoilla 1500-luvulta asti. '
      + 'Kauppiaita on runsaat kaksisataa ja laatikoita lähes '
      + 'yhdeksänsataa kolmen kilometrin matkalla, ja kaupunki päättää '
      + 'säännöt: yksi myyjä saa kahdeksan metriä kaidetta ja enintään '
      + 'neljä laatikkoa, ne on avattava vähintään neljänä päivänä '
      + 'viikossa, ja maali on aina sama vaunuvihreä kuin ensimmäisen '
      + 'metron kylteissä. Kauppiaiden nimi on vanha ja se kertoo, mitä '
      + 'laatikoissa on: ranskan sana bouquin tarkoittaa vanhaa kirjaa. '
      + 'Kesällä 2024 laatikot piti purkaa olympialaisten avajaisten '
      + 'tieltä, mutta päätös peruttiin ja ne saivat jäädä. '
      + 'Myyntipaikat periytyvät jonossa, jota odotetaan vuosia.',
    /*
     * Kuva on pelin omasta Seine-jaksosta (js/packs/
     * kulttuuri-kategoriat.js) eikä uusi tuonti: Commons 28.8.2026
     * 5472×3648, CC BY 2.0, Guilhem Vellut, kuvattu 5.5.2016,
     * Restrictions tyhjä.
     */
    kuva: {
      tiedosto: 'Quai Saint-Michel, Paris 5 May 2016.jpg',
      lyhyt: 'Bukinistien vihreät laatikot Seinen rantamuurilla; ammattikunta joen varrella 1500-luvulta.',
      selite: 'Bukinistien vihreät laatikot Seinen rantamuurilla. '
        + 'Ammattikunta on ollut joen varrella 1500-luvulta asti.',
      lahde: 'Guilhem Vellut, Wikimedia Commons (CC BY 2.0)',
    },
  },

  /*
   * ---------- 5. Kohtaaminen ----------
   * Hahmo, kohtaamiskuva ja laattakysymys ovat tarinakaaren paketissa
   * (js/tyohuone-kehitys-data.js KAARI_PAKETIT, id 'pariisi'):
   * bukinisti Colette myy vanhoja kirjoja Seinen rannalla samasta
   * laatikosta kuin isoisoisänsä, ja game.actionQuiz esittää hänen
   * kysymyksensä laatalla. Tämä kortti ei kertaa Coletten omaa
   * repliikkiä eikä paljasta vastausta.
   */
  kohtaaminen: {
    hahmo: 'Bukinisti Colette',
    nappi: 'Tapaa bukinisti',
    teksti: 'Coletten laatikot ovat samassa kahdeksan metrin pätkässä '
      + 'kaidetta, jossa hänen sukunsa on seissyt neljä sukupolvea. Hän '
      + 'avaa ne säällä kuin säällä ja tuntee ostajan kädestä: '
      + 'selailija painaa peukalon selkämykseen, ostaja avaa kirjan '
      + 'keskeltä. Matkustajaa hän ei kiirehdi. Ennen kuin hän nostaa '
      + 'kannen kokonaan auki, hän haluaa tietää, tietääkö vieras, '
      + 'millaisia kirjoja hänen ammattinsa nimi lupaa.',
  },

  /*
   * ---------- KEVYT KULKU ----------
   *
   * KOHTAAMISPAIKKA: QUAI DE MONTEBELLON KIRJALAATIKOT — Seinen
   * vasemmalla rannalla vastapäätä Île de la Citéä, sama ranta, jonka
   * laatikot ovat pelin omissa kuvissa (js/packs/
   * kulttuuri-kategoriat.js, maa-kategoriat.js).
   *
   * 48,8518329 N / 2,3493746 E — fr-Wikipedia "Quai de Montebello",
   * prop=coordinates (haettu 28.8.2026). Muunnos on sama kaava ja
   * samat vakiot kuin fokuskohteilla: maailmankartalla Millerin lieriö
   * LEVEYS 12000 / LON0 −175 / POHJOINEN 76 (tools/fokuskartta/
   * piirto.js laudanProjektio), Euroopan laudalla x = (lon + 11) × 19,2
   * ja y = (72 − lat) × 26,3.
   *
   * LASKU:
   *   maailmankartta  x = ((2,3493746 − (−175)) mod 360) × (12000/360)
   *                     = 177,3493746 × 33,3333… = 5911,6
   *                   y = (millerY(48,8518329) − millerY(76)) × 12000/2π
   *                     = 1439,8
   *   europe          x = (2,3493746 + 11) × 19,2 = 256,3
   *                   y = (72 − 48,8518329) × 26,3 = 608,8
   *
   * TARKISTUS PARIISIN LAATTAA VASTEN: laatta on Euroopan laudalla
   * 256 / 609, eli piste on sen vieressä. Niin pitääkin — ranta on
   * kaupungin keskellä, ja laudan yksikkö on maailmankartalla noin
   * kolme kilometriä.
   */
  kohtaamispiste: {
    nimi: 'Quai de Montebellon kirjalaatikot',
    laudat: {
      maailmankartta: { x: 5911.6, y: 1439.8 },
      europe: { x: 256.3, y: 608.8 },
    },
  },

  /*
   * NIMETYT MINITEHTÄVÄT KAUPUNKILEHDEN SIVUILLE 2 JA 3.
   *
   * SIVU ON SIVUNUMERO, EI AIHETUNNUS. Pariisin sivupino (js/lehti.js
   * rakennaSivut) on Sofian mittainen: 0 = etusivu, 1 = kaupunkisivu
   * "Pariisi", 2 = Musiikki, 3 = Menovinkit. Sivun 2 oma tehtävä
   * (Djangon asuntovaunun palo) väistyy nimetyn tieltä, joten sivulla
   * on Raamatun vaatima yksi minitehtävä eikä kahta.
   */
  lehtitehtavat: [
    { id: 'aarre', sivu: 2, otsake: 'AARTEEN AVAUS', palkinto: 'piste', visa: PIAF_VISA },
    { id: 'juliste', sivu: 3, otsake: 'JULISTE', palkinto: 'juliste', visa: GUIMARD_VISA },
  ],

  /*
   * ---------- TÄKYNOSTOPOOLI (Ranska) ----------
   *
   * SIIRRETTY TÄNNE v1297:n maapoolista (js/fokusnosto.js NOSTO_MAAT,
   * avain FRA) sanasta sanaan: otsikot, lunastukset, lähteet, kuvat,
   * kysymykset ja koordinaatit ovat bitilleen samat, vain sijainti
   * vaihtui. Kahta kopiota ei ole — js/fokusnosto.js lukee FRA-poolin
   * tästä kentästä, jotta Ranskan muut kaupungit (Marseille) näkevät
   * samat täyt kuin ennenkin.
   *
   * MAAN KUPLATÄKY ON POOLIN KÄRKI: Livia huomauttaa tuikkivista
   * pisteistä kerran, ja huomio osuu poolin ensimmäiseen
   * katsomattomaan. Järjestys on siksi säilytetty muuttumattomana.
   *
   * TEKIJÄTARKISTIN HUOMAUTTAA KIRAHVIKUVASTA, EIKÄ SITÄ KORJATA:
   * tools/tarkista-tekijat.mjs vertaa merkintää Commonsin omaan
   * Artist-kenttään, ja siellä lukee "Nicolas Hüet, the Younger" kun
   * paketissa on suomennos "Nicolas Hüet nuorempi". Sama nimi, eri
   * kieli — ja rivi on siirretty maapoolista sanasta sanaan, joten
   * sitä ei muuteta täällä.
   */
  takynostot: [
    {
      /*
       * MAAN KUPLATÄKY (poolin kärki, ks. yllä).
       *
       * takynostot-ranska.md, ehdokas 2 (VARMA). Aineiston sanamuoto
       * noudatettu: lähde ei anna toiselle yritykselle kuukautta, joten
       * teksti sanoo "samana vuonna".
       *
       * VALOKUVAA EI OLE. Aineiston ainoa tarkistettu tiedosto on
       * Lustigin pidätyskuva, ja aineisto jättää sen käytön
       * nimenomaisesti päätoimittajan ratkaistavaksi (*"Fablen on
       * päätettävä, sopiiko poliisikuva pelin sävyyn"*). Sitä päätöstä
       * ei tehdä tässä — 28.8.2026 lisätty pääkuva on repon oma
       * havainnekuva eikä koske poliisikuvaan mitenkään, joten tämä
       * nosto jää ainoaksi ilman `valokuva`-kakkoskuvaa.
       */
      id: 'lustig-eiffel',
      nimio: 'Torni romuraudaksi',
      otsikko: 'Mies myi Eiffel-tornin romuraudaksi — ja palasi samana '
        + 'vuonna myymään sen uudelleen',
      lunastus: [
        'Huijari Victor Lustig luki Pariisissa 1925 lehtijutun siitä, kuinka '
          + 'kallista Eiffel-tornin kunnossapito on. Hän palkkasi '
          + 'väärentäjän tekemään valtion kirjelomakkeita, kutsui joukon '
          + 'romukauppiaita luottamukselliseen kokoukseen kalliiseen '
          + 'hotelliin ja esittäytyi posti- ja lennätinministeriön '
          + 'varapääjohtajana: valtio aikoo myydä tornin romuksi, mutta asia '
          + 'on arkaluontoinen eikä siitä saa puhua.',
        'Uhrikseen hän valitsi André Poissonin, joka halusi nousta Pariisin '
          + 'liike-elämän sisäpiiriin, ja sai tältä sekä lahjuksen että '
          + 'kauppasumman — noin 70 000 frangia. Sitten hän pakeni '
          + 'Itävaltaan ja luki lehtiä: Poisson ei ollut ilmoittanut '
          + 'poliisille, koska häpesi. Niinpä Lustig palasi Pariisiin saman '
          + 'vuoden puolella tekemään saman tempun uudestaan. Tällä kertaa '
          + 'joku ilmoitti, ja hän pakeni Yhdysvaltoihin.',
      ],
      lahde: 'en-Wikipedia "Victor Lustig", osio Eiffel-tornin huijauksesta '
        + '(tarkistettu 25.8.2026 työaineistoon docs/mantereet-tyoaineisto/'
        + 'takynostot-ranska.md, ehdokas 2).',
      /*
       * PÄÄKUVA (28.8.2026, sama malli kuin Sofian areenalla ja
       * v1307:n neljällä nostolla): repon oma generoitu havainnekuva,
       * jolla ei ole Commons-nimeä eikä varareittiä, joten kenttä on
       * `osoite` eikä `tiedosto` (js/fokusnosto.js asetaNostonKuva).
       *
       * Kuva ei esitä tornia vaan HETKEN, jossa se myytiin: hotellin
       * salonki, väärennetyt kirjelomakkeet pöydällä ja torni vain
       * ikkunan takana. Lähderivi sanoo sen itse, jottei kukaan lue
       * kuvaa valokuvaksi tapahtumasta.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-lustig-eiffel-loistoaika.webp',
        lyhyt: 'Hotellin salonki: väärennetyt asiakirjat pöydällä, romukauppiaat kuuntelemassa, torni takana.',
        selite: 'Hotellin salonki: väärennetyt asiakirjat pöydällä, '
          + 'romukauppiaat kuuntelemassa ja torni ikkunan takana.',
        lahde: 'Matkakirjan havainnekuva: hetki, jona torni myytiin',
      },
      kysymykset: [
        'Miten Eiffel-tornin romukauppa saatiin kuulostamaan uskottavalta?',
        'Miksi huijauksen uhri ei ilmoittanut poliisille?',
        'Oliko Eiffel-tornin purkamisesta oikeasti puhetta?',
      ],
      // 48,85822222 N / 2,2945 E — en-Wikipedia "Eiffel Tower".
      paikka: {
        nimi: 'Eiffel-torni',
        laudat: {
          maailmankartta: { x: 5909.8, y: 1439.5 },
          europe: { x: 255.3, y: 608.6 },
        },
      },
    },
    {
      /*
       * ELÄINNOSTO. takynostot-ranska.md, ehdokas 3 (VARMA). Aineiston
       * nimikielto noudatettu: nimeä "Zarafa" ei käytetä, koska se
       * annettiin vasta 1985 — aikalaisten nimi kerrotaan sen sijaan.
       *
       * LÄHETYSVUOTTA EI MAINITA. Aineistossa lukee sekä "lähetti 1827"
       * että "saapui Marseilleen 31.10.1826"; kumpaakaan ei ole
       * muutettu, vaan tekstiin on otettu vain se päivämäärä, jonka
       * lähde antaa täsmällisenä.
       */
      id: 'kirahvin-kavelymatka',
      nimio: 'Kirahvin kävelymatka',
      otsikko: 'Kirahvi käveli 900 kilometriä Marseillesta Pariisiin — '
        + 'takki päällä ja kengät jalassa',
      lunastus: [
        'Egyptin varakuningas lähetti kirahvin Ranskan kuninkaalle '
          + 'Kaarle X:lle. Eläin saapui laivalla Marseilleen 31. lokakuuta '
          + '1826 — kannessa oli sahattu reikä, josta kaula mahtui ulos. '
          + 'Merimatkaa Atlantin ympäri pidettiin liian vaarallisena, joten '
          + 'päätettiin, että kirahvi kävelee Pariisiin. Luonnontieteilijä '
          + 'Étienne Geoffroy Saint-Hilaire, 55, käveli mukana ja teetti '
          + 'eläimelle kaksiosaisen keltaisen takin ja kengät.',
        'Matka kesti 41 päivää. Lyonissa vastassa oli 30 000 ihmistä, ja '
          + 'Pariisissa kirahvia kävi katsomassa yli 100 000 — joka '
          + 'kahdeksas kaupunkilainen. Hiukset kammattiin torneiksi, '
          + 'kankaisiin ilmestyi täpliä ja väri nimeltä "kirahvin vatsa" myi '
          + 'kaiken. Aikalaiset kutsuivat eläintä nimellä la Belle '
          + 'Africaine, ja se eli Jardin des Plantes\'ssa 18 vuotta.',
      ],
      lahde: 'en-Wikipedia "Zarafa (giraffe)", osiot matkasta ja '
        + 'vastaanotosta (tarkistettu 25.8.2026 työaineistoon '
        + 'docs/mantereet-tyoaineisto/takynostot-ranska.md, ehdokas 3).',
      /*
       * PÄÄKUVAKSI HAVAINNEKUVA (28.8.2026, sama malli kuin yllä):
       * repon oma generoitu kuva, joten kenttä on `osoite` eikä
       * `tiedosto`.
       *
       * Kuva ei esitä paikkaa vaan MATKAA, josta nosto kertoo:
       * kirahvi takki päällä maantiellä, saattue mukana ja kyläläiset
       * tien vierellä. Lähderivi sanoo sen itse.
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-kirahvin-kavelymatka-loistoaika.webp',
        lyhyt: 'Kirahvi kävelee maantietä takki päällä, saattajat rinnalla ja kyläläiset katsomassa.',
        selite: 'Kirahvi kävelemässä maantietä takki päällä, saattajat '
          + 'rinnalla ja kyläläiset tien vierellä katsomassa.',
        lahde: 'Matkakirjan havainnekuva: hetki kirahvin kävelymatkalta',
      },
      /*
       * KAKKOSKUVA tekstin alle on entinen ainoa kuva. Tiedosto, selite
       * ja lähde ennallaan.
       *
       * Commons 25.8.2026: 4793×6392, public domain, Restrictions tyhjä.
       */
      valokuva: {
        tiedosto: 'Nicolas Hüet, the Younger - Study of the Giraffe Given to Charles X by the Viceroy of Egypt - Google Art Project.jpg',
        selite: 'Sama kirahvi Nicolas Hüet nuoremman tutkielmassa vuodelta '
          + '1827.',
        lahde: 'Nicolas Hüet nuorempi 1827, Wikimedia Commons (public domain)',
      },
      kysymykset: [
        'Miksi kirahvi käveli Marseillesta Pariisiin eikä matkustanut meritse?',
        'Miten eläin selvisi 900 kilometrin kävelystä?',
        'Mitä muuta Jardin des Plantes\'n eläintarhassa oli 1800-luvulla?',
      ],
      // 48,8447 N / 2,3597 E — en-Wikipedia "Ménagerie du Jardin des
      // plantes" (takyt-pariisi.md, täky 2).
      paikka: {
        nimi: 'Jardin des Plantes',
        laudat: {
          maailmankartta: { x: 5912, y: 1440.1 },
          europe: { x: 256.5, y: 609 },
        },
      },
    },
    {
      /*
       * ── SIIRRETTY ESPANJASTA (1.9.2026, nostojen sisältöaudit) ────
       *
       * Tämä nosto asui 29.8.2026 alkaen Sevillan paketissa
       * (js/packs/fokusvirta-sevilla.js) ja oli auditin ainoa
       * vahvistettu väärän maan tarina: jokainen kortin tapahtuma on
       * Pariisissa, ja Sevilla on vain se kaupunki, johon ooppera
       * sijoittuu. Tunnus, Commons-kuva ja aihe ovat samat; TEKSTI ON
       * KIRJOITETTU UUDELLEEN Ranska-kontekstiin, koska kortin
       * näkökulma vaihtui teoksen tapahtumapaikasta sen ensi-illan
       * taloon. Sevilla mainitaan yhä — siinä roolissa, joka sille
       * kuuluu.
       *
       * KOLMANTENA EIKÄ ENSIMMÄISENÄ: poolin kärki on maan kuplatäky
       * (ks. lohkon alku), eikä sitä siirretä uuden rivin takia.
       *
       * FAKTAT (haettu 1.9.2026 en-Wikipedian rajapinnasta artikkeli
       * ja osio kerrallaan):
       *   - "Carmen (opera)", johdanto: kantaesitys Opéra-Comiquessa
       *     Pariisissa 3.3.1875; sopimusten rikkominen järkytti
       *     ensiyleisöä; Bizet kuoli 33. esityksen jälkeen; Pariisissa
       *     teos otettiin uudelleen ohjelmistoon vasta 1883;
       *   - sama artikkeli, osio "Background": talon kaksi johtajaa
       *     riitautuivat teoksesta, ja Adolphe de Leuven vastusti
       *     jyrkästi *"niin uskaliaan tarinan"* esittämistä talossa,
       *     jota hän piti perheteatterina; hänelle luvattiin, että
       *     Carmenin luonnetta pehmennetään, romanihahmot esitetään
       *     koomisina ja lopun kuolema jää kulkueiden, balettien ja
       *     riemufanfaarien varjoon; de Leuven erosi silti
       *     alkuvuodesta 1874. Sävellystyö alkoi tammikuun tienoilla
       *     1873, ja ensimmäinen näytös oli valmis kesään mennessä;
       *   - osio nimiroolin etsimisestä: Marie Roze kieltäytyi
       *     roolista kuultuaan, että hänen olisi kuoltava lavalla;
       *     rooli meni Célestine Galli-Mariélle;
       *   - osio ensi-illasta ja vastaanotosta: salissa olivat mm.
       *     Massenet, Offenbach, Delibes ja Gounod; ensimmäinen näytös
       *     otettiin hyvin vastaan, toreadorin laulun jälkeen tuli
       *     libretisti Halévyn muistiinpanon mukaan "kylmyys" ja
       *     viimeinen näytös oli "jäinen ensimmäisestä viimeiseen";
       *     seuraavan päivän arviot vaihtelivat pettymyksestä raivoon,
       *     ja yksi kriitikko kutsui Galli-Marién tulkintaa "paheen
       *     ruumiillistumaksi"; taloa ei saatu täyteen edes jakamalla
       *     lippuja ilmaiseksi;
       *   - sama osio: Bizet kuoli 3. kesäkuuta 1875 sydäntautiin
       *     36-vuotiaana, hääpäivänsä vuosipäivänä, ja sen illan
       *     esitys peruttiin;
       *   - osio myöhemmästä esityshistoriasta: Wien 1875, Bryssel
       *     1876, Lontoo 1878, New York 23.10.1878 — maine syntyi
       *     Ranskan ulkopuolella;
       *   - "Salle Favart", osio "Background": ensi-illan talo oli
       *     toinen Salle Favart (avattu 16.5.1840), joka paloi
       *     25.5.1887; nykyinen kolmas talo rakennettiin 1893–1898
       *     samalle paikalle Place Boïeldieun varrelle.
       *
       * IKÄSOPIVUUS (13+): oopperan juonen väkivaltaa ei kuvata, vaan
       * kortti kertoo siitä, mitä lavalla tapahtuvasta kuolemasta
       * SANOTTIIN — se on koko skandaalin ydin.
       */
      id: 'carmenin-ensi-ilta',
      nimio: 'Carmenin ensi-ilta',
      otsikko: 'Teatterin johtaja vastusti oopperaa niin kiivaasti, '
        + 'että erosi — ja ensi-illan jälkeen näytti siltä, että hän '
        + 'oli ollut oikeassa',
      lunastus: [
        'Georges Bizet aloitti Carmenin säveltämisen tammikuun tienoilla '
          + '1873, ja ensimmäinen näytös oli valmis siihen kesään '
          + 'mennessä, jona isoisäsi oli matkalla. Sitten työ pysähtyi. '
          + 'Opéra-Comique oli valtion rahoittama talo, johon vietiin '
          + 'perhe, ja sen kahdesta johtajasta Adolphe de Leuven '
          + 'vastusti koko ajatusta: näin uskaliasta tarinaa ei esitetä '
          + 'täällä, yleisö pelästyy pois. Hänelle luvattiin, että '
          + 'nimihenkilön luonnetta pehmennetään, että romanihahmot '
          + 'esitetään koomisina ja että lopun kuolema jää kulkueiden, '
          + 'balettien ja riemufanfaarien varjoon. Lupaukset eivät '
          + 'riittäneet, ja de Leuven erosi teatterista alkuvuodesta '
          + '1874. Nimiroolikin oli vaikea täyttää: Marie Roze '
          + 'kieltäytyi kuultuaan, että hänen olisi kuoltava lavalla.',
        'Ensi-ilta oli 3. maaliskuuta 1875, ja salissa istui puoli '
          + 'musiikki-Pariisia — Massenet, Offenbach, Delibes, Gounod. '
          + 'Ensimmäinen näytös meni hyvin. Toreadorin laulun jälkeen '
          + 'tuli kylmyys, ja viimeinen näytös oli libretisti Halévyn '
          + 'sanoin jäinen ensimmäisestä viimeiseen. Seuraavan päivän '
          + 'arviot vaihtelivat pettymyksestä raivoon: nimihenkilö oli '
          + 'hyveellisen naisen sijaan moraaliton viettelijä, ja yksi '
          + 'kriitikko kutsui pääosan tulkintaa paheen '
          + 'ruumiillistumaksi. Taloa ei saatu täyteen edes jakamalla '
          + 'lippuja ilmaiseksi. Bizet kuoli 3. kesäkuuta 1875, '
          + 'kolmannenkymmenennenkolmannen esityksen jälkeen, '
          + '36-vuotiaana ja hääpäivänsä vuosipäivänä. Maine tuli '
          + 'muualta: Wien 1875, Bryssel 1876, Lontoo ja New York 1878 '
          + '— Pariisiin ooppera palasi vasta 1883. Se sijoittuu '
          + 'Sevillaan, mutta kaikki tämä tapahtui täällä, Place '
          + 'Boïeldieun varrella. Sekin sali paloi 1887; paikalla '
          + 'seisoo nyt kolmas samanniminen teatteri.',
      ],
      lahde: 'en-Wikipedia "Carmen (opera)" (johdanto sekä osiot '
        + 'taustasta, nimiroolin etsimisestä, ensi-illasta ja '
        + 'vastaanotosta sekä myöhemmästä esityshistoriasta), '
        + '"Georges Bizet" (osiot Carmenista sekä sairaudesta ja '
        + 'kuolemasta) ja "Salle Favart" (osio "Background"); '
        + 'tarkistettu 1.9.2026.',
      /*
       * Commons 29.8.2026: 6536×8944, public domain, Prudent-Louis Leray
       * (1820–1879), restaurointi Adam Cuerden, päiväys 1875, kuvaus
       * "1875 lithographic poster for the première of Georges Bizet's
       * Carmen". Restrictions tyhjä. SILMÄTARKISTUS tehty: litografoitu
       * juliste, ei valokuvattuja ihmisiä. Rivi on siirretty Sevillan
       * paketista sanasta sanaan.
       */
      kuva: {
        tiedosto: "Prudent-Louis Leray - Poster for the première of Georges Bizet's Carmen.jpg",
        lyhyt: 'Lerayn litografia on Carmenin ensi-illan juliste 1875, epäonnistuneeksi luullusta esityksestä.',
        selite: 'Prudent-Louis Lerayn litografia on Carmenin ensi-illan '
          + 'juliste vuodelta 1875 — samasta esityksestä, jonka '
          + 'säveltäjä uskoi epäonnistuneen.',
        lahde: 'Prudent-Louis Leray 1875, Wikimedia Commons (public domain)',
      },
      /*
       * CARMENIN LINKKI TAKAISIN (Fablen päätös 14.9.2026). Erän 5 jako
       * pudotti tämänkin linkin pelistä, koska nostokortti ei tuntenut
       * mediakenttiä. Osoite on merkki merkiltä sama kuin lehden
       * nostossa "Carmen kaatui ensi-illassaan" ennen erää 5
       * (git show 721efc3 -- js/packs/kulttuuri-kategoriat.js). Yksi
       * linkki riittää, joten kenttä on entisessä merkkijonomuodossaan.
       */
      musiikki: 'https://music.apple.com/fi/search?term=bizet%20carmen',
      musiikkiNimi: 'Bizet\u2019n Carmen Apple Musicissa',
      kysymykset: [
        'Miksi Opéra-Comiquen johto piti Carmenia sopimattomana?',
        'Miten ooppera nousi epäonnistumisesta maailmanmaineeseen?',
        'Millainen oopperatalo Opéra-Comique oli 1870-luvulla?',
      ],
      /*
       * ── MINIKYSYMYS (karttauudistuksen erä 6, 13.9.2026) ──────────
       *
       * PARIISIN POOLIN KOLMAS JA TOISTAISEKSI AINOA: kiintiö on "joka
       * kolmanteen nostoon" (suunnitelma, luku 5.1), ja tässä poolissa
       * on kolme nostoa — lustig-eiffel, kirahvin-kavelymatka ja tämä.
       *
       * VASTAUS ON YLLÄ OLEVASSA TEKSTISSÄ, ei lähteessä eikä
       * kommentissa: *"Marie Roze kieltäytyi kuultuaan, että hänen
       * olisi kuoltava lavalla."* Myös `fakta` pysyy saman kortin
       * sisällä (roolin sai toinen laulajatar; kriitikon sanat ovat
       * toisen kappaleen lopussa) — kysymys ei saa opettaa mitään,
       * mitä pelaaja ei ole juuri lukenut.
       *
       * VÄÄRÄT VAIHTOEHDOT EIVÄT OLE FAKTAVÄITTEITÄ vaan uskottavia
       * arvauksia, samoin kuin lehden visoissa (PIAF_VISA,
       * GUIMARD_VISA tiedoston alussa).
       */
      visa: {
        kysymys: 'Nimiroolia oli vaikea täyttää: laulajatar Marie Roze '
          + 'kieltäytyi siitä heti. Miksi?',
        vaihtoehdot: [
          'Hänen olisi pitänyt kuolla lavalla',
          'Ensi-ilta oli sovittu liian pian',
          'Ooppera sijoittui Espanjaan',
        ],
        oikea: 0,
        fakta: 'Rooli meni toiselle laulajattarelle, ja ensi-illan '
          + 'jälkeen yksi kriitikko kutsui pääosan tulkintaa paheen '
          + 'ruumiillistumaksi.',
      },
      /*
       * OMAT KOORDINAATIT, JOTTA MERKKI ON OIKEASSA MAASSA JA MAAN VOI
       * YHÄ POLTTAA. Espanjassa nostolla ei ollut `paikka`-kenttää
       * lainkaan, joten merkki seurasi pelaajaa kaupungista toiseen
       * (js/fokusnosto.js nostonPaikka) — juuri se vika, jonka audit
       * nosti esiin.
       *
       * 48,8709 N / 2,3378 E — en-Wikipedia "Salle Favart",
       * prop=coordinates (haettu 1.9.2026). Piste on TONTTI eikä
       * rakennus: ensi-illan talo paloi 1887, ja nykyinen kolmas
       * Salle Favart seisoo samalla paikalla, joten koordinaatti on
       * oikea kummallekin. Sama kaava ja samat vakiot kuin muillakin
       * nostoilla (js/fokusnosto.js, PAIKKA LAUDALLA): maailmankartta
       * Millerin lieriönä, europe tasavälinä.
       */
      paikka: {
        nimi: 'Opéra-Comique',
        laudat: {
          maailmankartta: { x: 5911.3, y: 1439 },
          europe: { x: 256.1, y: 608.3 },
        },
      },
    },
    /*
     * ══════════════════════════════════════════════════════════════
     * KARTTAUUDISTUS, ERÄ 5 (13.9.2026): KAUPUNKILEHDEN SIVUT
     * NOSTOIKSI.
     *
     * Suunnitelman luku 4.7 (docs/raportit/karttauudistus-suunnitelma-
     * 20260913.md, omistajan hyväksymä jakotaulukko) siirtää Pariisin
     * kaupunkilehden sivujen nostot kartalle klikattaviksi paloiksi.
     * Kuusi alla olevaa riviä ovat se siirto.
     *
     * TEKSTIÄ EI OLE KIRJOITETTU UUDESTAAN. Jokainen `lunastus`-
     * kappale on lehden oman noston `teksti` SANATARKASTI
     * (js/packs/kulttuuri-kategoriat.js, kaupunki `pariisi`), samoin
     * `otsikko` on lehden oma otsikko ja `kuva` lehden oma kuvarivi
     * kenttineen. Yhtään faktaa ei ole lisätty eikä muotoiltu
     * uudelleen; Fablen sisältöpistokoe (`node tools/
     * vertaa-sisaltodiff.mjs`) vertaa parit VANHA/UUSI.
     *
     * PUDOTETTU AINES ON SOMMITTELUA: osastojen `johdanto`-rivit
     * jäivät pois, koska ne eivät esitä yhtään faktaa, jota alla
     * olevissa korteissa tai näiden omissa kartta­korteissa ei jo
     * olisi (perustelu ja rivikohtainen vertailu erän raportissa).
     *
     * MINIKYSYMYKSET: erän 6 datamalli (`visa`), kiintiö joka kolmas
     * nosto. Pooli on tämän erän jälkeen yhdeksän nostoa, ja visat
     * ovat kolmannessa (`carmenin-ensi-ilta`, erä 6), kuudennessa
     * (`notre-damen-kukko`) ja yhdeksännessä (`pariisin-vuosisadat`).
     * Vastaus on aina SAMAN kortin tekstissä.
     * ══════════════════════════════════════════════════════════════
     */
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 1. Kohdekartalle Eiffel-tornin
       * pisteeseen, jossa on jo kolme merkkiä samassa osoitteessa
       * (Eiffel-torni, Torni romuraudaksi, Torni 1888) — talon tapa on
       * `nimiPuoli` ja `siirto`, ei uusi koordinaatti.
       */
      id: 'pariisin-72-nimea',
      nimio: '72 nimeä',
      otsikko: 'Tornissa on 72 nimeä kullalla',
      symboli: 'tekniikka',
      lunastus: [
        'Gustave Eiffel halusi, että hänen torninsa on tieteen '
          + 'muistomerkki. Ensimmäisen kerroksen ympäri kiertää 65 metrin '
          + 'korkeudella nimilista: 18 nimeä tornin jokaisella sivulla, '
          + 'yhteensä 72 ranskalaista tiedemiestä ja insinööriä. Kirjaimet ovat '
          + 'kullattuja ja 60 senttiä korkeita. Nimet peitettiin maalilla '
          + '1900-luvun alussa ja paljastettiin vasta 1986–1987. Yhtään naista '
          + 'listalla ei ole. Siksi tammikuussa 2026 julkistettiin toinen 72 '
          + 'nimen lista, pelkkiä naistutkijoita, jotka on tarkoitus kaivertaa '
          + 'miesten nimien yläpuolelle vuonna 2027.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Tornissa on 72 '
        + 'nimeä kullalla" (js/packs/kulttuuri-kategoriat.js). Teksti '
        + 'siirretty sanatarkasti karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: 'Chevreul, Flachat, Navier.001 - Torre Eiffel.jpg',
        lyhyt: 'Eiffel-tornin ensimmäistä kerrosta kiertää 72 ranskalaisen tiedemiehen nimi kullatuin kirjaimin.',
        selite: 'Eiffel-tornin ensimmäisen kerroksen ympäri kiertää 65 metrin '
          + 'korkeudella 72 ranskalaisen tiedemiehen ja insinöörin nimeä '
          + 'kullatuin, 60 senttiä korkein kirjaimin.',
        lahde: 'Fernando Losada Rodríguez, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Miksi nimet peitettiin maalilla 1900-luvun alussa?',
        'Ketkä ovat sen toisen, vuonna 2026 julkistetun listan nimet?',
        'Miten 72 nimeä valittiin tornin kylkeen?',
      ],
      // Eiffel-torni 48,85822 N / 2,2945 E — sama piste kuin nostolla
      // `lustig-eiffel` (en-Wikipedia "Eiffel Tower").
      paikka: {
        nimi: 'Eiffel-torni',
        laudat: {
          maailmankartta: { x: 5909.8, y: 1439.5 },
          europe: { x: 255.3, y: 608.6 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 2. Kohdekartalle Abbesses'n
       * metroaseman sisäänkäyntiin: se on yksi jäljellä olevista
       * Guimardin sisäänkäynneistä ja jo pelin omassa kuvapaketissa
       * (js/packs/europe-valokuvat.js, "6 Abbesses.jpg"). Piste on
       * PAIKKATIETO eikä kortin väite — teksti ei mainitse asemaa.
       * 48,8844 N / 2,3382 E.
       */
      id: 'guimardin-metro',
      nimio: 'Metron sisäänkäynti',
      otsikko: 'Metron sisäänkäynti koottiin palasista',
      symboli: 'tekniikka',
      lunastus: [
        'Pariisin metro avattiin 19. heinäkuuta 1900. Sisäänkäynneistä oli '
          + 'järjestetty arkkitehtikilpailu, mutta yksikään 21 ehdotuksesta ei '
          + 'kelvannut, ja työ annettiin Hector Guimardille, joka ei ollut edes '
          + 'osallistunut kilpailuun. Hän piirsi valurautaisia vakio-osia, '
          + 'jotka sopivat yhteen kuin rakennussarja: samoista paloista sai '
          + 'kasattua sopivan sisäänkäynnin mihin tahansa kadunkulmaan. Niitä '
          + 'tehtiin 167. Sitten tyyli meni pois muodista ja puolet purettiin. '
          + 'Jäljellä olevat 86 rauhoitettiin vuonna 1978.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Metron '
        + 'sisäänkäynti koottiin palasista" (js/packs/kulttuuri-kategoriat.js). '
        + 'Teksti siirretty sanatarkasti karttauudistuksen erässä 5, '
        + '13.9.2026.',
      kuva: {
        tiedosto: '01 Guimard\'s Métropolitain.jpg',
        selite: 'Guimardin metrosisäänkäyntejä tehtiin 167, ja jäljellä olevat '
          + '86 rauhoitettiin vuonna 1978.',
        lahde: 'Terrazzo (Flickr), Wikimedia Commons (CC BY 2.0)',
      },
      kysymykset: [
        'Miksi arkkitehtikilpailun 21 ehdotuksesta yksikään ei kelvannut?',
        'Mitä vakio-osista kasaaminen tarkoitti käytännössä?',
        'Miksi puolet sisäänkäynneistä purettiin?',
      ],
      paikka: {
        nimi: 'Metron sisäänkäynti',
        laudat: {
          maailmankartta: { x: 5911.3, y: 1438.4 },
          europe: { x: 256.1, y: 607.9 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 3. Kohdekartalle Notre-Damen
       * pisteeseen (48,853 N / 2,3499 E, sama koordinaatti kuin kartan
       * omalla Notre-Dame-kohteella).
       *
       * POOLIN KUUDES = MINIKYSYMYS (kiintiö joka kolmas, erä 6).
       * Vastaus on yllä olevassa tekstissä sanatarkasti: *"Ensin sitä
       * luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä
       * maasta lommoilla."* Myös `fakta` on saman kortin sisällä
       * (kuusitoista kuparipatsasta oli nostettu katolta neljä päivää
       * ennen paloa). Väärät vaihtoehdot eivät ole faktaväitteitä vaan
       * uskottavia arvauksia — sama kaava kuin PIAF_VISAssa.
       */
      id: 'notre-damen-kukko',
      nimio: 'Notre-Damen kukko',
      otsikko: 'Kukko putosi ja löytyi seuraavana päivänä',
      symboli: 'historia',
      lunastus: [
        'Notre-Damen ullakko syttyi 15. huhtikuuta 2019, ja keskitorni '
          + 'romahti kello 19.45. Katon alla paloi 1 300 tammirungosta tehty '
          + 'kattotuolisto, joka oli 1200-luvulta. Tornin huipulla seisoi '
          + 'kuparinen kukko, jonka sisään oli suljettu pyhäinjäännöksiä. Ensin '
          + 'sitä luultiin tuhoutuneeksi, mutta se löytyi seuraavana päivänä '
          + 'maasta lommoilla. Onnea oli muutenkin: kuusitoista kuparipatsasta '
          + 'oli nostettu katolta korjattavaksi neljä päivää ennen paloa. Uuden '
          + 'kullatun kukon sisään pantiin samat pyhäinjäännökset ja 2 000 '
          + 'jälleenrakentajan nimet.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Kukko putosi ja '
        + 'löytyi seuraavana päivänä" (js/packs/kulttuuri-kategoriat.js). '
        + 'Teksti siirretty sanatarkasti karttauudistuksen erässä 5, '
        + '13.9.2026.',
      kuva: {
        tiedosto: 'Coq de Notre-Dame de Paris 2020.jpg',
        lyhyt: 'Notre-Damen kuparinen kukko putosi tornin huipulta 2019 palossa ja löytyi lommoilla.',
        selite: 'Notre-Damen tornin huipulla seisonut kuparinen kukko putosi '
          + 'vuoden 2019 palossa ja löytyi seuraavana päivänä maasta '
          + 'lommoilla.',
        lahde: 'Siren-Com, Wikimedia Commons (CC BY-SA 4.0)',
      },
      kysymykset: [
        'Mitä tornin huipun kukon sisään oli suljettu?',
        'Miksi kuusitoista kuparipatsasta oli poissa katolta palon aikaan?',
        'Mitä uuden kukon sisään pantiin?',
      ],
      visa: {
        kysymys: 'Tornin huipulla seisonut kuparinen kukko luultiin ensin '
          + 'tuhoutuneeksi. Miten sille kävi?',
        vaihtoehdot: [
          'Se löytyi seuraavana päivänä maasta lommoilla',
          'Se sulaa löydettiin holvin raunioista',
          'Siitä jäi jäljelle vain pyhäinjäännökset',
        ],
        oikea: 0,
        fakta: 'Onnea oli muutenkin: kuusitoista kuparipatsasta oli nostettu '
          + 'katolta korjattavaksi neljä päivää ennen paloa.',
      },
      paikka: {
        nimi: 'Notre-Dame',
        laudat: {
          maailmankartta: { x: 5911.7, y: 1439.8 },
          europe: { x: 256.3, y: 608.8 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 1 ("Pariisi"), nosto 4.
       *
       * SUUNNITELMA SANOI PÄÄKARTTAA, KONE SANOI EI — ja kone on
       * omistajan oman säännön puolella. Luku 4.7 ehdotti tätä
       * pääkartalle kaupungin viereen, mutta omistajan sääntö
       * 2.9.2026 (*"nuo karttanostot jotka ovat kohdekaupunkien
       * kohdalla piti viedä pois pääkartalta"*) on koneellistettu
       * tests/nostot-kartalla.test.mjs:ään: kaupungin kohdalla
       * pääkartalle jäävien luku saa laskea muttei kasvaa. Nosto on
       * siksi kohdekartalla kuten viisi muutakin tämän erän nostoa.
       * Erän raportissa on täsmällinen yhden rivin muutos siltä
       * varalta, että omistaja haluaa sen sittenkin pääkartalle.
       *
       * PAIKKA ON ÉLYSÉE-PALATSI (48,8703 N / 2,3167 E), ei keksitty
       * leipomo: kortin oma teksti nimeää presidentinpalatsin leivät
       * kilpailun palkinnoksi, ja kilpailu on koko kaupungin eikä
       * yhden liikkeen. Piste on kohdekartan rajauksen sisällä.
       */
      id: 'pariisin-patonki',
      nimio: 'Paras patonki',
      otsikko: 'Paras patonki valitaan sokkona',
      symboli: 'ruoka',
      lunastus: [
        'Kaupunki on järjestänyt vuodesta 1994 kilpailun parhaasta '
          + 'perinteisestä patongista, ja säännöt ovat tarkat: leivän pitää '
          + 'olla 55–65 senttiä pitkä ja painaa 250–300 grammaa. Mitä '
          + 'patongissa saa olla, on määrätty laissa — käytännössä vain '
          + 'vehnäjauhoa, vettä, suolaa ja hiivaa, eikä taikinaa saa missään '
          + 'vaiheessa pakastaa. Leivät numeroidaan ennen maistamista, jottei '
          + 'raati tiedä kenen leipää se arvostelee, ja raadissa istuu kuusi '
          + 'arvottua tavallista pariisilaista. Voittaja saa rahapalkinnon ja '
          + 'yhden velvollisuuden: hän toimittaa presidentinpalatsin leivät '
          + 'seuraavan vuoden ajan.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Pariisi", nosto "Paras patonki '
        + 'valitaan sokkona" (js/packs/kulttuuri-kategoriat.js). Teksti '
        + 'siirretty sanatarkasti karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: '84 Boulevard de Port-Royal Bakery.jpg',
        lyhyt: 'Pariisi on järjestänyt vuodesta 1994 kilpailun parhaasta patongista presidentin leipojaksi.',
        selite: 'Pariisi on järjestänyt vuodesta 1994 kilpailun parhaasta '
          + 'perinteisestä patongista, ja voittaja toimittaa '
          + 'presidentinpalatsin leivät seuraavan vuoden ajan.',
        lahde: 'Lionel Allorge, Wikimedia Commons (CC BY-SA 3.0)',
      },
      kysymykset: [
        'Miksi leivät numeroidaan ennen maistamista?',
        'Mitä patongissa saa lain mukaan olla?',
        'Mikä velvollisuus voittajalle tulee?',
      ],
      paikka: {
        nimi: 'Paras patonki',
        laudat: {
          maailmankartta: { x: 5910.6, y: 1439.0 },
          europe: { x: 255.7, y: 608.3 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 2 ("Musiikki"), KOLME NOSTOA YHDEKSI
       * (suunnitelman luku 4.7: *"Yhdistetään yhdeksi nostoksi
       * 'Pariisi soi' → kohdekartta (Opéra)"*).
       *
       * KAPPALEITA ON KAKSI EIKÄ KOLME, ja se on sisältöpäätös, ei
       * unohdus: sivun kolmas nosto ("Carmen kaatui ensi-illassaan")
       * on tämän saman poolin nosto `carmenin-ensi-ilta`, jonka kortti
       * kertoo saman asian LAAJEMPANA ja jolla on oma piste
       * kohdekartalla. Sivuversion jokainen faktaväite on tuossa
       * kortissa (vertailu erän 5 raportissa), joten kappale on
       * pudotettu kaksoiskappaleena eikä asiatietona. Samasta syystä
       * osaston `johdanto` jäi pois: se ei esitä yhtään faktaa, jota
       * näissä kolmessa kortissa ei olisi.
       */
      id: 'pariisi-soi',
      nimio: 'Pariisi soi',
      otsikko: 'Pariisi soi — kadulta ja asuntovaunuleiriltä maineeseen',
      symboli: 'kulttuuri',
      lunastus: [
        'Édith Piaf syntyi Bellevillessä joulukuussa 1915. Tarinan mukaan '
          + 'hän syntyi kadulla talon portaille, vaikka syntymätodistuksessa '
          + 'lukee sairaala. Teininä hän lauloi kolikoista Pigallen kaduilla ja '
          + 'pihoissa sisarpuolensa kanssa. Yökerhon omistaja Louis Leplée '
          + 'kuuli hänet kadulta vuonna 1935 ja antoi lempinimen la Môme Piaf — '
          + 'piaf on pariisilaista puhekieltä ja tarkoittaa varpusta. Laulaja '
          + 'oli 142 senttiä pitkä. Tunnetuin laulu La Vie en rose ilmestyi '
          + '1946, ja sen sanat hän kirjoitti itse.',
        'Django Reinhardt kasvoi romaniperheen asuntovaunussa Pariisin '
          + 'porttien luona ja soitti banjoa pihoissa ja tanssipaikoissa jo '
          + 'lapsena. Lokakuussa 1928 vaunussa syttyi tulipalo: kynttilä kaatui '
          + 'selluloidikukkien päälle. Vasemman käden nimetön ja pikkurilli '
          + 'jäivät liikkumattomiksi, ja lääkärit sanoivat, ettei hän soita '
          + 'enää. Veli toi sairaalaan kitaran, ja Django opetteli soittamaan '
          + 'soolot kahdella sormella. Vuonna 1934 hän perusti Pariisissa '
          + 'yhtyeen Quintette du Hot Club de France.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Musiikki", nostot "Édith Piaf '
        + 'lauloi ensin kadulla" ja "Kaksi sormea riitti" '
        + '(js/packs/kulttuuri-kategoriat.js). Tekstit siirretty sanatarkasti '
        + 'karttauudistuksen erässä 5, 13.9.2026.',
      kuva: {
        tiedosto: 'Édith Piaf 914-6440.jpg',
        lyhyt: 'Édith Piaf esiintyi Rotterdamissa 1962, alle vuosi ennen kuolemaansa; lempinimi tarkoittaa varpusta.',
        selite: 'Édith Piaf esiintyi Rotterdamissa 13. joulukuuta 1962, alle '
          + 'vuosi ennen kuolemaansa; hänen lempinimensä la Môme Piaf '
          + 'tarkoittaa pariisilaisessa puhekielessä varpusta.',
        lahde: 'Eric Koch / Anefo, Wikimedia Commons (CC0)',
      },
      /*
       * KAKSI APPLE MUSIC -LINKKIÄ, YKSI NOSTO (Fablen päätös 14.9.2026).
       *
       * Erä 5 yhdisti Pariisin Musiikki-sivun kaksi nostoa tähän yhteen
       * korttiin, ja koska nostolla oli vain yksi `musiikki`-kenttä,
       * kumpikin linkki putosi pelistä hiljaa. Kenttä ottaa nyt vastaan
       * myös listan (js/ui.js nostonMusiikkilinkit), joten molemmat
       * palaavat SELLAISENAAN — osoitteet ovat merkki merkiltä samat
       * kuin ennen erää 5 (git show 721efc3 --
       * js/packs/kulttuuri-kategoriat.js).
       *
       * Nimi on jokaisella linkillä näkyvissä: kortilla on kaksi eri
       * muusikkoa, ja ilman nimeä listasta ei erottaisi kumpi on kumpi.
       */
      musiikki: [
        {
          nimi: 'Édith Piaf',
          url: 'https://music.apple.com/fi/search?term=edith%20piaf%20la%20vie%20en%20rose',
          otsake: 'Édith Piaf Apple Musicissa',
        },
        {
          nimi: 'Django Reinhardt',
          url: 'https://music.apple.com/fi/search?term=django%20reinhardt%20minor%20swing',
          otsake: 'Django Reinhardt Apple Musicissa',
        },
      ],
      kysymykset: [
        'Mistä lempinimi la Môme Piaf tuli?',
        'Miten Django Reinhardt opetteli soittamaan uudelleen?',
        'Millaista musiikkia Pariisin kaduilla kuultiin 1930-luvulla?',
      ],
      // Palais Garnier 48,8719 N / 2,3317 E — suunnitelman luku 4.7
      // ("kohdekartta (Opéra)"); sama koordinaatti kuin kartan omalla
      // Palais Garnier -kohteella.
      paikka: {
        nimi: 'Pariisi soi',
        laudat: {
          maailmankartta: { x: 5911.1, y: 1438.9 },
          europe: { x: 256.0, y: 608.3 },
        },
      },
    },
    {
      /*
       * LEHDEN SIVU 3 ("Historia"), SEITSEMÄSTÄ NOSTOSTA YKSI
       * (suunnitelman luku 4.7: *"Kolme parasta kohdekartan
       * pisteiksi, loput neljä yhdeksi nostoksi 'Pariisin
       * vuosisadat'"*).
       *
       * MITATTU LÄHTÖTILANNE: sivun kaikilla seitsemällä nostolla oli
       * jo karttapaikka — kuudella kohdekartalla ja yhdellä
       * pääkartalla. Kolme "parasta" ovat ne kolme, jotka osaston oma
       * johdanto nimeää (kyyhkyposti, Tuileriain rauniot ja
       * impressionistit); ne pysyvät omina karttapisteinään.
       *
       * KAPPALEITA ON KAKSI EIKÄ NELJÄ: neljästä jäljelle jääneestä
       * kaksi ("Kirahvi käveli Marseillesta Pariisiin" ja "Mies myi
       * Eiffel-tornin romuraudaksi") ovat tämän saman poolin nostoja
       * `kirahvin-kavelymatka` ja `lustig-eiffel`, joiden korteissa on
       * sivuversion jokainen faktaväite ja enemmänkin. Ne on siksi
       * pudotettu kaksoiskappaleina eikä asiatietona. Mukaan tulivat
       * ne kaksi, joiden sivuversiossa on faktoja, joita niiden omassa
       * karttakortissa EI ole (kaulanauhan 647 timanttia ja
       * ensimmäisen maksuerän erääntyminen; Vrain-Lucasin
       * lähettäjänimet sekä englantilaisten huomautus Newtonin iästä).
       * Rivikohtainen vertailu on erän 5 raportissa.
       *
       * POOLIN YHDEKSÄS = MINIKYSYMYS (kiintiö joka kolmas, erä 6).
       * Vastaus on yllä olevassa tekstissä sanatarkasti: *"Kaikki oli
       * kirjoitettu 1800-luvun ranskaksi."*
       */
      id: 'pariisin-vuosisadat',
      nimio: 'Pariisin vuosisadat',
      otsikko: 'Pariisin vuosisadat — kaulanauha, joka katosi, ja kirjeet, '
        + 'joita ei ollut',
      symboli: 'historia',
      lunastus: [
        'Hovin jalokivikauppiaat Boehmer ja Bassenge olivat koonneet 647 '
          + 'timantin kaulanauhan Ludvig XV:lle, mutta kuningas kuoli ennen '
          + 'kauppaa eikä Marie Antoinette huolinut sitä. Jeanne de la Motte '
          + '-niminen huijari sai kardinaali de Rohanin uskomaan, että '
          + 'kuningatar haluaa nauhan salaa ja tarvitsee välikäden. Todisteina '
          + 'olivat väärennetyt kirjeet ja yöllinen tapaaminen Versailles\'n '
          + 'puistossa, jossa kuningatarta esitti palkattu nuori nainen. Rohan '
          + 'osti nauhan tammikuussa 1785 kahdella miljoonalla livrellä ja '
          + 'luovutti sen huijarin lähetille; kivet pilkottiin ja myytiin '
          + 'Lontoossa ja Pariisissa. Kun ensimmäinen maksuerä erääntyi '
          + 'elokuussa, kauppiaat kääntyivät kuningattaren puoleen ja '
          + 'kardinaali pidätettiin Versailles\'ssa. Oikeus vapautti Rohanin '
          + '1786, mutta kuningattaren maine ei toipunut.',
        'Denis Vrain-Lucas myi 1860-luvulla matemaatikko Michel Chasles\'lle '
          + 'noin 27 000 käsin kirjoitettua kirjettä, joiden lähettäjiksi oli '
          + 'merkitty muun muassa Julius Caesar, Kleopatra, Aristoteles ja '
          + 'Kaarle Suuri. Kaikki oli kirjoitettu 1800-luvun ranskaksi. Chasles '
          + 'maksoi kokoelmasta noin 140 000 frangia ja esitteli 1867 '
          + 'tiedeakatemialle kirjeitä, joiden mukaan Blaise Pascal olisi '
          + 'keksinyt painovoimalain ennen Isaac Newtonia. Englantilaiset '
          + 'tutkijat huomauttivat, että Newton oli kirjeiden päiväyksen aikaan '
          + 'lapsi. Chasles piti kokoelmastaan kiinni vuosia, mutta väärentäjä '
          + 'tuomittiin helmikuussa 1870 kahdeksi vuodeksi vankeuteen.',
      ],
      lahde: 'Pariisin kaupunkilehden sivu "Historia", nostot "Kaulanauha, '
        + 'joka ei koskaan päätynyt kuningattarelle" ja "Kleopatra kirjoitti '
        + 'ranskaksi — ja akateemikko uskoi" '
        + '(js/packs/kulttuuri-kategoriat.js). Tekstit siirretty sanatarkasti '
        + 'karttauudistuksen erässä 5, 13.9.2026.',
      /*
       * KUVATON KORTTI, ja se on rajoite eikä valinta. Lehden kummankin
       * jutun kuva on R2-ämpärin kuvajonossa
       * (skandaali-kaulanauhajuttu-1785.jpg ja
       * skandaali-vrain-lucas-kirjevaarennokset.jpg), eikä nostokortin
       * kuvakenttä kelpuuta sitä: `osoite` on repon oma tiedosto
       * (tests/fokusvirta.test.mjs lukee levyn) ja `tiedosto` on
       * Commons-nimi (js/fokusnosto.js asetaNostonKuva). Kuvaton nosto
       * aukeaa suoraan tekstikorttina (js/fokusnosto.js:1062), ja samat
       * kuvat näkyvät yhä skandaalikorteissa. Kirjattu erän raporttiin;
       * kuvan lisääminen on kuvatyötä eikä tämän erän työtä.
       */
      kysymykset: [
        'Miksi kardinaali uskoi väärennetyt kirjeet?',
        'Mihin kaulanauhan timantit lopulta päätyivät?',
        'Miksi Chasles piti kokoelmastaan kiinni vuosia?',
      ],
      visa: {
        kysymys: 'Vrain-Lucas myi kirjeitä, joiden lähettäjiksi oli merkitty '
          + 'muun muassa Kleopatra ja Julius Caesar. Mikä niissä oli pielessä?',
        vaihtoehdot: [
          'Kaikki oli kirjoitettu 1800-luvun ranskaksi',
          'Ne oli päivätty samalle viikolle',
          'Paperissa ei ollut lainkaan vesileimaa',
        ],
        oikea: 0,
        fakta: 'Englantilaiset tutkijat huomauttivat lisäksi, että Newton oli '
          + 'kirjeiden päiväyksen aikaan lapsi. Väärentäjä tuomittiin '
          + 'helmikuussa 1870 kahdeksi vuodeksi vankeuteen.',
      },
      // Panthéon 48,8462 N / 2,3464 E. Kummankaan tarinan oma osoite ei
      // ollut vapaana: Vrain-Lucasilla on jo oma piste (Institut de
      // France) ja kaulanauhan Versailles on kohdekartan rajauksen
      // ulkopuolella. Panthéon on kartan oma historiakohde ja tämän
      // kortin ankkuri.
      paikka: {
        nimi: 'Pariisin vuosisadat',
        laudat: {
          maailmankartta: { x: 5911.5, y: 1440.1 },
          europe: { x: 256.3, y: 608.9 },
        },
      },
    },
  ],

  /*
   * ---------- AARREMERKINTÄ ----------
   * KAANON (Fable) — teksti sellaisenaan. Iso aarre: kruununjalokivien
   * safiiri.
   */
  aarremerkinta: {
    teksti: 'Näin kruunun safiirin lasin läpi ja piirsin sen ääriviivat '
      + 'luetteloon. Vartija katsoi minua niin pitkään, että jätin '
      + 'lyijykynänkin taskuun ja tulin ulos hitaasti kuin syytön mies.',
  },
};
