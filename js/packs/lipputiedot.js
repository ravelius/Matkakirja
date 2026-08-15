/*
 * Lippuikkunan sisällöt (omistajan tilaus 15.8.2026: "Tee lipusta
 * klikattava jolloin lippu aukeaa isompana omaan ikkunaan otsikkona
 * maan nimi. Lipun alla tietoja ja selitys lipun historiasta ja sen
 * merkityksistä. Alle pienempiä lippuja jos on historiallisia tai eri
 * versioita nykyisestä lipusta (puolustusvoimat yms). Tee pilotti
 * ensin Berliiniin ja Helsinkiin").
 *
 * Avain on sama Commons-tiedostonimi kuin kategoria.maaLippu — lehden
 * lippu muuttuu napautettavaksi vain, jos maalle on rivi tässä
 * taulussa. Tekstit kirjoittaa Fable ja faktat on tarkistettu;
 * versioliput on ladattu Commonsista repoon (assets/liput/versiot/,
 * viralliset liput ovat vapaita). Uusi maa = uusi rivi tähän + kuvat
 * samaan kansioon + sw.js:n SHELL.
 *
 * symboliikka (omistajan tilaus 15.8.2026: "Voisi olla boldattuna
 * otsikot: sininen =, valkoinen =, ja niin edelleen, riippuen mitä
 * elementtejä kussakin lipussa on") — lipun elementit boldatuin
 * otsikoin. tunnukset (sama tilaus: "Maan vaakuna olisi kiva lisätä
 * myös sekä mikäli maalla on joitain muitakin mielenkiintoisia
 * vastaavia") — vaakunat assets/liput/tunnukset/-kansiosta, lisenssit
 * tarkistettu Commonsista (kaikki PD).
 */

export const LIPPUTIEDOT = {
  'Flag of Finland.svg': {
    maa: 'Suomi',
    symboliikka: [
      { osa: 'Sininen', selite: 'järvien ja taivaan väri.' },
      { osa: 'Valkoinen', selite: 'lumen väri.' },
      {
        osa: 'Risti',
        selite: 'pohjoismainen ristilippu — sama ristin muoto kuin '
          + 'Tanskalla, Ruotsilla, Norjalla ja Islannilla.',
      },
    ],
    kappaleet: [
      'Siniristilippu vahvistettiin Suomen lipuksi toukokuussa 1918, '
        + 'puoli vuotta itsenäistymisen jälkeen. Ristin muoto on sama '
        + 'kuin muissa Pohjoismaissa — se kertoo, mihin joukkoon maa '
        + 'katsoi kuuluvansa.',
      'Sinivalkoisia värejä oli ehdotettu jo 1860-luvulla, ja Zachris '
        + 'Topelius oli ajatuksen tunnetuimpia puolestapuhujia. Värit '
        + 'on totuttu lukemaan niin, että sininen on järvien ja '
        + 'taivaan väri ja valkoinen lumen.',
      'Valinta ei ollut itsestään selvä: kilpailijana oli vaakunan '
        + 'punakeltainen leijonalippu, joka ehti keväällä 1918 olla '
        + 'muutaman kuukauden itsenäisen Suomen ensimmäinen '
        + 'valtiolippu.',
    ],
    versiot: [
      {
        nimi: 'Valtiolippu',
        polku: 'assets/liput/versiot/fin-valtiolippu.png',
        selite: 'Vaakunallinen valtiolippu: ristin keskellä Suomen '
          + 'leijonavaakuna. Valtion virastojen ja laitosten lippu.',
      },
      {
        nimi: 'Sotalippu',
        polku: 'assets/liput/versiot/fin-sotalippu.png',
        selite: 'Kolmikielekkeinen sotalippu — puolustusvoimien '
          + 'käyttämä valtiolipun asu.',
      },
      {
        nimi: 'Presidentin lippu',
        polku: 'assets/liput/versiot/fin-presidentinlippu.png',
        selite: 'Tasavallan presidentin lippu: kielekkeinen sotalippu, '
          + 'jonka yläkulmassa on sinivalkoinen vapaudenristi.',
      },
      {
        nimi: 'Leijonalippu 1918',
        polku: 'assets/liput/versiot/fin-leijonalippu-1918.png',
        selite: 'Itsenäisen Suomen ensimmäinen valtiolippu keväällä '
          + '1918: vaakunan punakeltaiset värit. Jäi käyttöön vain '
          + 'muutamaksi kuukaudeksi.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Suomen vaakuna',
        polku: 'assets/liput/tunnukset/fin-vaakuna.png',
        selite: 'Kruunupäinen leijona punaisella kentällä yhdeksän '
          + 'hopearuusun keskellä; haarniskoitu käsi kohottaa miekkaa '
          + 'ja jalat tallaavat käyrää sapelia. Kuva on totuttu '
          + 'lukemaan idän ja lännen väliin jääneen maan tunnukseksi. '
          + 'Leijona piirrettiin jo 1580-luvulla Kustaa Vaasan '
          + 'hautamuistomerkkiin Uppsalaan.',
      },
      {
        nimi: 'Helsingin vaakuna',
        polku: 'assets/liput/tunnukset/fin-helsinki-vaakuna.png',
        selite: 'Kultainen vene ja sen yllä kruunu sinisellä kentällä, '
          + 'alla hopeinen aallokko. Vene kertoo merikaupungista, '
          + 'kruunu kaupungin perustamisesta kuninkaan käskyllä 1550.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
  'Flag of Germany.svg': {
    maa: 'Saksa',
    symboliikka: [
      {
        osa: 'Musta',
        selite: 'Lützowin vapaajoukon mustat univormutakit 1810-luvun '
          + 'vapaussodista.',
      },
      { osa: 'Punainen', selite: 'takkien punaiset käänteet.' },
      { osa: 'Kulta', selite: 'takkien kullanväriset messinkinapit.' },
      {
        osa: 'Yhdessä',
        selite: 'yhtenäisyyden ja vapauden värit vuoden 1848 '
          + 'vallankumouksesta asti.',
      },
    ],
    kappaleet: [
      'Musta-puna-kultaisen trikolorin juuret ovat 1810-luvun '
        + 'vapaussodissa: Lützowin vapaajoukon univormut olivat '
        + 'mustat, käänteet punaiset ja napit kullanväriset. Vuoden '
        + '1848 vallankumouksessa Frankfurtin parlamentti otti värit '
        + 'yhtenäisen Saksan tunnukseksi.',
      'Keisarikunta 1871–1918 käytti musta-valko-punaista lippua, ja '
        + 'trikolori palasi vasta Weimarin tasavallan mukana 1919. '
        + 'Natsihallinto poisti sen käytöstä 1933.',
      'Vuonna 1949 sekä Länsi- että Itä-Saksa valitsivat saman '
        + 'trikolorin. Itä-Saksa lisäsi 1959 keskelle oman '
        + 'tunnuksensa — vasaran, harpin ja tähkäseppeleen — ja '
        + 'yhdistymisestä 1990 lähtien koko maan lippu on taas ollut '
        + 'puhdas trikolori.',
    ],
    versiot: [
      {
        nimi: 'Virastolippu',
        polku: 'assets/liput/versiot/deu-virastolippu.png',
        selite: 'Liittovaltion virastolippu (Bundesdienstflagge): '
          + 'trikolori liittokotkan kilvellä. Vain viranomaiskäytössä.',
      },
      {
        nimi: 'Keisarikunta 1871–1918',
        polku: 'assets/liput/versiot/deu-keisarikunta.png',
        selite: 'Saksan keisarikunnan musta-valko-punainen lippu — '
          + 'Preussin ja hansakaupunkien värit.',
      },
      {
        nimi: 'DDR 1959–1990',
        polku: 'assets/liput/versiot/deu-ddr.png',
        selite: 'Itä-Saksan lippu: trikolori, jonka keskellä työn ja '
          + 'talonpoikien tunnus — vasara, harppi ja tähkäseppele.',
      },
    ],
    tunnukset: [
      {
        nimi: 'Saksan liittokotka',
        polku: 'assets/liput/tunnukset/deu-vaakuna.png',
        selite: 'Musta kotka kultaisella kentällä, nokka ja jalat '
          + 'punaiset. Yksi Euroopan vanhimmista valtiotunnuksista — '
          + 'juuret keskiajan keisarien kotkassa.',
      },
      {
        nimi: 'Berliinin karhu',
        polku: 'assets/liput/tunnukset/deu-berliini-vaakuna.png',
        selite: 'Musta karhu hopeakentällä, kilven päällä kultainen '
          + 'kruunu. Karhu on kulkenut Berliinin sineteissä '
          + '1200-luvulta asti, ja kaupungin nimi ja Bär-sana ovat '
          + 'kietoutuneet kansan mielessä yhteen.',
      },
    ],
    lahde: 'Liput ja vaakunat: Wikimedia Commons (PD)',
  },
};
