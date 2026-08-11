/*
 * NÄYTTEET: uusiksi kirjoitettuja matkakirjamerkintöjä työhuoneen
 * Näytteet-välilehdelle (omistajan tilaus 11.8.2026: "voisit jo
 * näiden pohjalta kirjoittaa muutamia kaupunkeja uusiksi ja laittaa
 * ne uudelle välilehdellä näkyviin").
 *
 * Nämä EIVÄT ole pelissä: ne ovat keskustelupohja, jolla Tekstien
 * vetovoima -keinot (ks. js/tyohuone-raamattu.js) kokeillaan
 * oikeassa tekstimuodossa ja -pituudessa (kuvaus ~150–170 merkkiä,
 * nosto ~110–160). Vanha merkintä näytetään rinnalla vertailua
 * varten. Luennat generoidaan vasta, kun malli on yhdessä
 * hyväksytty ja koko Eurooppa kirjoitetaan uusiksi. VAIN FABLE
 * kirjoittaa tähän tiedostoon.
 */

export const NAYTTEET = {
  paivitetty: '11.8.2026',
  johdanto: 'Neljä kaupunkia kirjoitettuna uusiksi Tekstien '
    + 'vetovoima -keinoilla. Jokainen näyte kokeilee eri keinoja — '
    + 'tarkoitus ei ole, että kaikki neljä korvaavat vanhat '
    + 'sellaisenaan, vaan että näistä nähdään, mitkä keinot '
    + 'toimivat ja mitkä eivät. Faktat tarkistettu.',
  kaupungit: [
    {
      id: 'wien',
      nimi: 'Wien',
      keinot: ['skandaali (pörssiromahdus 1873)', 'aikakontrasti',
        'mittaajan persoona'],
      nykyinen: {
        kuvaus: 'Kahvilassa kaakao tuli hopeatarjottimella ja '
          + 'vierellä lasi vettä, jota en ollut pyytänyt. Kukaan ei '
          + 'hoputtanut, vaikka istuin kaksi tuntia.',
        nosto: 'Isoisä kirjoitti: "Keisari avasi tänään vesijohdon, '
          + 'joka tuo veden vuorilta ilman ainuttakaan pumppua." '
          + 'Join siitä hanasta tänään.',
      },
      uusi: {
        kuvaus: 'Kahvilan lehtitelineessä talouslehti huusi kurssien '
          + 'syöksyä. Vanha herra viereisestä pöydästä kohautti '
          + 'olkiaan: "Wien on nähnyt pahempaa — kysykää vuodelta '
          + '1873."',
        nosto: 'Isoisä kirjoitti: "Pörssi romahti kesken '
          + 'maailmannäyttelyn. Eilen herrat ostivat samppanjaa, '
          + 'tänään he myyvät kellojaan. Pidin rahani taskussa."',
      },
      perustelu: 'Skandaali on koukku, ja vuoden 1873 Wien on '
        + 'niitä täynnä: maailmannäyttely avattiin toukokuun '
        + 'alussa ja pörssi romahti 9.5.1873 ("musta perjantai") '
        + 'kesken juhlien. Vanhan herran repliikki sitoo skandaalin '
        + 'nykypäivään ilman, että teksti vanhenee. Horatio saa '
        + 'olla varovainen mittaaja, joka ei lähde kuplaan mukaan. '
        + 'Vanhan merkinnän vesijohtofakta (Hochquellenleitung '
        + '1873) on hyvä — se voi siirtyä lehteen tai kohtaamiseen.',
    },
    {
      id: 'helsinki',
      nimi: 'Helsinki',
      keinot: ['pienestä suureen (mustikka → jokamiehenoikeus)',
        'kommellus', 'huumori'],
      nykyinen: {
        kuvaus: 'Laiva pujotteli Suomenlinnan saarten välistä '
          + 'satamaan, ja Tuomiokirkko nousi valkoisena kaiken '
          + 'ylle. Kauppatorilla lokit väijyivät saalistaan.',
        nosto: 'Isoisä kirjoitti: "Helsingfors näyttää mereltä '
          + 'suuremmalta kuin maalta. Valkoinen kirkko seisoo kuin '
          + 'keisarin allekirjoitus." Keisari on poissa — kirkko ei.',
      },
      uusi: {
        kuvaus: 'Ostin Kauppatorilta rasian mustikoita. Myyjä '
          + 'nauroi: "Metsässä näitä saa ilmaiseksi — jokamiehen'
          + 'oikeus. Kenenkään metsä ei ole marjastajalta kiinni."',
        nosto: 'Isoisä kirjoitti: "Täällä herrasmies katoaa metsään '
          + 'ämpäri kädessä, eikä kukaan ihmettele. Kokeilin. '
          + 'Ämpäri täyttyi, housut menivät pilalle."',
      },
      perustelu: 'Pienestä suureen: yksi marjarasia avaa '
        + 'jokamiehenoikeuden — asian, joka erottaa Pohjolan '
        + 'melkein koko muusta maailmasta. Oivallus tulee myyjän '
        + 'naurun ja Horation pilalle menneiden housujen kautta, '
        + 'ei luentona. Sama mustikka on ehdolla Suomen pieneksi '
        + 'paikallisaarteeksi — teksti ja aarre tukevat toisiaan.',
    },
    {
      id: 'lissabon',
      nimi: 'Lissabon',
      keinot: ['historian oikku (maanjäristys 1755)',
        'henkilö liikkeellä (ratikka)'],
      nykyinen: {
        kuvaus: 'Keltainen ratikka kiipesi Alfaman kujaa niin '
          + 'ahdasta, että olisin yltänyt seiniin ikkunasta. '
          + 'Ylhäällä koko kaupunki aukesi kerralla — ja joki oli '
          + 'leveä kuin meri.',
        nosto: 'Isoisä kirjoitti: "Seitsemän kukkulaa, ja '
          + 'jokaiselta näkyy meri. Täältä lähdettiin aikoinaan '
          + 'etsimään maailman toista laitaa." Ymmärsin lähtijöitä.',
      },
      uusi: {
        kuvaus: 'Ratikankuljettaja osoitti risteystä: "Suorat kadut '
          + 'rakennettiin vuoden 1755 järistyksen jälkeen. Vinot '
          + 'ovat vanhempia." Koko kaupunki on kartta siitä '
          + 'aamusta.',
        nosto: 'Isoisä kirjoitti: "Alfaman kujat kestivät '
          + 'järistyksen, joka kaatoi palatsit alhaalla. Köyhien '
          + 'kivet seisoivat, mahtavien eivät. Siinä miettimistä."',
      },
      perustelu: 'Historian oikku: yksi aamu (1.11.1755) muovasi '
        + 'kaupungin, ja jälki näkyy yhä katukuvassa — vino katu '
        + 'on vanha, suora uusi. Tieto tulee liikkeessä olevalta '
        + 'ihmiseltä, ei kyltistä. Alfama tosiaan säästyi '
        + 'pahimmalta, kun ala-kaupunki sortui; Baixa rakennettiin '
        + 'ruutuun. Vanhan merkinnän ratikkakuva säilyy pohjana.',
    },
    {
      id: 'rooma',
      nimi: 'Rooma',
      keinot: ['elokuvallinen avaus + etikettivirhe',
        'aikakontrasti (sama kömmähdys 150 v välein)'],
      nykyinen: {
        kuvaus: 'Trevin lähteen pohjalla, kolikoiden seassa, '
          + 'välkkyi yksi jota vesi ei ollut tummentanut: vanha '
          + 'englantilainen punta. Se oli heitetty tänä aamuna.',
        nosto: 'Isoisä kirjoitti: "Heitin kolikon Treviin, kuten '
          + 'tapa vaatii — ja toisen, jotta näkisin vedestä, kuka '
          + 'seisoo takanani." Heitin omani samaan kohtaan.',
      },
      uusi: {
        kuvaus: 'Baari kiilsi: kone paineessa, barista tarkka kuin '
          + 'kelloseppä, jono paikallisia espressolla. Tilasin '
          + 'cappuccinon. Kello oli neljä. Jono hiljeni kuin '
          + 'kirkossa.',
        nosto: 'Isoisä kirjoitti: "Caffè Grecossa taiteilijat '
          + 'istuvat päivän yhdellä kupilla. Tilasin heti toisen, '
          + 'ja tarjoilija katsoi minua kuin tuhlaajapoikaa."',
      },
      perustelu: 'Elokuvallinen avaus: kohtaus rakennetaan kolmella '
        + 'kuvalla (kone, barista, jono) ja Reginald astuu kuvaan '
        + 'väärällä tilauksella — cappuccino iltapäivällä on '
        + 'Italiassa turistin tuntomerkki. Isoisä teki saman '
        + 'kömmähdyksen eri muodossa 1873 (Caffè Greco on ollut '
        + 'taiteilijoiden kahvila 1760-luvulta). Kaksi herraa, '
        + 'sama nolous, 150 vuotta väliä — piikki osoittaa '
        + 'herroihin, ei paikallisiin. HUOM: nykyinen Trevi-'
        + 'merkintä on dekkarina vahva — tämä näyte on rinnalle '
        + 'punnittavaksi, ei itsestäänselvä korvaaja.',
    },
  ],
};
