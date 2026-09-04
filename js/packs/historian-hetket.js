/*
 * HISTORIAN HETKET — kuuluisa hetki silmien korkeudelta.
 *
 * Omistajan tilaus 1.9.2026 (sanatarkasti): *"peliin voisi tehdä
 * havainnekuvina myös historiallisia hetkiä, esim. kolumbus lähdössä
 * ensimmäiselle amerikan purjehdukselle tai trafalgarin taistelut …
 * kaikki mitä olen nähnyt historian kirjoissa on ollut suht etäisiä
 * piirroksia jotka eivät ole vieneet mielikuvitusta siihen hetkeen"*.
 * Sarjan mitta on juuri tuo: KATSOJA ON PAIKALLA, silmien korkeudella,
 * siinä sekunnissa jolloin jotain on tapahtumassa.
 *
 * Hetkiä on viisitoista: H1-pilotin kymmenen meren ja löytöretkien
 * hetkeä sekä kuvaputken photo-v3-erän mukana saapunut viisikko —
 * Kolumbuksen kaksi rahoitushetkeä ja kolme tiedehistorian hetkeä
 * (Röntgen, Wrightin veljekset, Einstein).
 *
 * ── TEKSTIN SÄÄNTÖ: IHMINEN EDELLÄ ─────────────────────────────────
 *
 * Jokainen `teksti` alkaa siitä, mitä kuvan ihminen kokee, pelkää tai
 * ajattelee juuri tässä sekunnissa; suuri kaari kerrotaan vasta sen
 * jälkeen ja lyhyesti. Aloitustapa vaihtelee (lähikuva, ääni, esine,
 * kysymys, ohikulkeva hetki) eikä sama tapa toistu peräkkäisissä
 * hetkissä. Mitta on 120–170 sanaa. Keksitty minitarina on sallittu
 * vain merkittynä ("ehkä", "kerrotaan"); päivämäärät, nimet ja luvut
 * ovat en-Wikipediasta, ja artikkeli nimetään jokaisen hetken
 * yläpuolella olevassa lähdekommentissa.
 *
 * ── MISSÄ HETKI NÄKYY ──────────────────────────────────────────────
 *
 * Omistajan sijoituspäätös 2.9.2026 aamulla (sanatarkasti): *"Tee tuon
 * suosituksesi mukaisesti kumpaankin, jos vain paikka kartalla on joku
 * muu kuin pelissä olevat kohdekaupungit. Muutoin laita pelkästään maa-
 * tai kaupunkilehdelle, Omalle sivulleen."*
 *
 * SÄÄNTÖ TARKENTUI SAMANA PÄIVÄNÄ (omistaja, sanatarkasti): *"lisää
 * kaikki historian hetket ja muut karttanostot myös joko
 * pääkarttanäkymään tai sitten kaupunkilehden kaupunkikartalle, ellei
 * näin ole jo tehty."* Lehtisivu ei siis ole koskaan hetken AINOA
 * paikka. Nykyinen jako:
 *
 *   `kartalla: true`   Hetki saa OMAN KOHDEMERKIN (tiimalasi)
 *                      tapahtumapaikkaan JA oman sivun lehteen. Tämä on
 *                      OLETUS: hetki on kartalla, ellei sitä voi
 *                      projisoida laudalle lainkaan.
 *   `kattoVapaa: true` Lisä `kartalla`-lipulle silloin, kun paikka on
 *                      alle kahdeksan yksikön päässä kohdekaupungista.
 *                      Kaupunkinostojen katto (js/fokuskohteet.js
 *                      karsiKaupunkiruuhka) pudottaisi merkin muuten
 *                      kaupungin kolmen noston joukosta. OMISTAJA
 *                      3.9.2026: hetkeä EI enää ladota kaupungin
 *                      viereen siirtoviivan päähän — kaupungin laatan
 *                      päälle osuva hetki (Lissabon 1484, Fram 1893)
 *                      on vain kaupunkilehdessä ja sen kohdekartalla,
 *                      ja lähelle osuva hetki (Santa Fé 1492, Restelo
 *                      1497) on siirretty datassa sen verran irti
 *                      kaupungista (≥ 9 yksikköä), että piste mahtuu
 *                      kartalle omalla paikallaan ilman lippua ja ilman
 *                      viivaa; sijainnin ei tarvitse olla tarkka.
 *                      Lippu jää varalle. Vanha malli: kasauspassi
 *                      (js/fokusniput.js)
 *                      latoo sen kaupungin viereen sarakkeeseen ja
 *                      vetää siirtoviivan tapahtumapaikkaan, kuten
 *                      kaikille muillekin lähelle osuville nostoille.
 *   `kartanUlkopuolella: true`  Poikkeus: pistettä ei voi näyttää
 *                      kartalla lainkaan. Näitä on kaksi — etelänapa
 *                      (laudan eteläreunan takana) ja Galápagos
 *                      (maan fokuslehden ikkunan ulkopuolella). Hetki
 *                      asuu vain lehdessä, ja syy on kirjattu kentässä
 *                      `kartanUlkopuolellaSyy`. Poikkeukset tarkistaa
 *                      tests/nostot-kartalla.test.mjs, eikä uutta saa
 *                      lisätä ilman syytä.
 *
 * `lehti`-kenttä kertoo, MIHIN lehteen sivu on kirjoitettu:
 * `{ laji: 'kaupunki', avain: <city.id> }` on kaupunkilehti
 * (js/packs/kulttuuri-kategoriat.js) ja `{ laji: 'maa', avain: <ISO3> }`
 * maalehti (js/packs/maa-kategoriat.js). Sivun tunnus on kummassakin
 * `hetki-<id>`.
 *
 * ── LEHTISIVU EI OLE ENÄÄ KÄSITYÖTÄ ────────────────────────────────
 *
 * Sama teksti ja samat kuvat asuivat aiemmin kahdessa tiedostossa
 * käsin kopioituina, ja juuri se eriytyy hiljaa. Nyt lehtisivu
 * GENEROIDAAN tästä pakasta: kentät `lehtiJohdanto` ja `lehtiTehtava`
 * ovat sivun ainoa oma sisältö, ja `node tools/paivita-hetkisivut.mjs`
 * kirjoittaa sivulohkon kulttuuri-/maa-kategorioihin. Vastaavuuden
 * tarkistaa tests/historian-hetket.test.mjs.
 *
 * ── KOLME KUVAKULMAA PER HETKI ─────────────────────────────────────
 *
 * Omistaja 2.9.2026 (klo 11 UTC): jokaisesta kohtauksesta LÄHIKUVA
 * ihmisistä tapahtuma taustalla (`rooli: 'lahi'`) ja KAUKOKUVA koko
 * kohtauksesta (`rooli: 'kauko'`). Lähikuva on pääkuva, joten se on
 * listan ensimmäinen; kortti ja lehtisivu näyttävät ensimmäisen isona
 * ja loput selailunuolilla.
 *
 * KOLMAS ROOLI `lehti` (3.9.2026) on aikakauden lehtisivun
 * rekonstruktio — PYSTYKUVA 1024 × 1536 — ja sellainen tehtiin
 * neljälle hetkelle: Titanicille (The Daily Graphic), Nansenille
 * (Verdens Gang), Amundsenille (Tidens Tegn) ja Trafalgarille (The
 * Times). Tiedostonimi ei ole `hetki-<id>-lehti-…` vaan lehden oma
 * (`hetki-titanic-daily-graphic-1912-lehti-photo-v3.jpg`), koska kuva
 * on nimetty julkaisunsa eikä hetken mukaan; testi lukitsee neljän
 * tiedoston listan.
 *
 * ERÄ photo-v3 (3.9.2026) korvasi KAIKKI aiemmat kuvat. Omistajan
 * linjaus (Raamattu, "KAIKKI GENEROIDUT KUVAT MAHDOLLISIMMAN
 * VALOKUVAMAISIA"): H1- ja H2-erien kuvat lukivat maalauksina ja
 * tilattiin uusiksi valokuvaajan sanastolla. Vanhat tiedostot jäävät
 * ämpäriin, mutta niihin ei enää viitata, eivätkä niiden kuvatekstit
 * kelpaa uusien kuvien kanssa: jokainen `kuvateksti` ja `lahde` on
 * kuvaputken toimittama ja omistajan hyväksymä sanasta sanaan
 * (posti/kuvatoimitus.md 3.9.2026 01:02 UTC).
 *
 * LÄHDERIVIN OSOITTEET ASUVAT `url`-KENTÄSSÄ. Toimitetut lähderivit
 * päättyivät pitkiin http-osoitteisiin, ja lähderivi ladotaan pelissä
 * tekstinä kuvan alle (js/tekijakortti.js taytaLahderivi) — osoite
 * täyttäisi kuvatekstin alta puolet rivistä. Osoite ei silti katoa:
 * se on omassa kentässään samassa kuvassa.
 *
 * ── KUVAT OVAT MATKAKIRJAN HAVAINNEKUVIA ───────────────────────────
 *
 * Kuvat eivät ole valokuvia vaan Matkakirjan itse koostamia
 * havainnekuvia, ja jokaisen kuvan `lahde` sanoo sen ääneen —
 * lähderivistä kasvaa pelissä painettava selite (js/havainnekuva.js).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * HETKI-etuliitteellä.
 */

/**
 * Kuvien juuri pelin julkisessa R2-ämpärissä.
 *
 * Sama ämpäri ja sama `kohtaamiset/`-juuri kuin kohtaamiskuvilla
 * (js/kohtaamiskuvat-data.js KOHTAAMIS_R2_JUURI), oma alikansio.
 * Osoite kirjoitetaan tässä eikä tuoda kohtaamiskuvista, koska
 * niputusjärjestyksessä tämä pakka on ennen sitä moduulia.
 */
export const HETKI_KUVAJUURI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/kohtaamiset/historian-hetket';

/** Kuvan täysi osoite ämpärissä. */
export const hetkenKuvaOsoite = (tiedosto) => `${HETKI_KUVAJUURI}/${tiedosto}`;

/**
 * Sallitut kuvaroolit: lähikuva ihmisistä, kaukokuva kohtauksesta ja
 * aikakauden lehtisivu (pystykuva, vain kuudella hetkellä).
 *
 * KUVAERÄN VERSIO: H1–H3 36–44 ovat `-photo-v3`, ja H3 45–48 (4.9.2026)
 * `-photo-v4` — hetken `kuvaversio`-kenttä (oletus 3) kertoo tiedoston
 * päätteen, ja testi johtaa nimen siitä.
 */
export const HETKI_KUVAROOLIT = new Set(['lahi', 'kauko', 'lehti']);

/**
 * Hetket, joille kuvaputki teki aikakauden lehtisivun — ja sen kuvan
 * tiedostonimi. Nimi ei johdu hetken tunnuksesta, joten se ei ole
 * pääteltävissä: lista on tässä, ja testi vartioi sen.
 */
export const HETKI_LEHTIKUVAT = {
  'trafalgar-victory-1805': 'hetki-trafalgar-the-times-1805-lehti-photo-v3.jpg',
  'nansen-fram-1893': 'hetki-nansen-verdens-gang-1893-lehti-photo-v3.jpg',
  'amundsen-etelanapa-1911': 'hetki-amundsen-tidens-tegn-1912-lehti-photo-v3.jpg',
  'titanic-southampton-1912': 'hetki-titanic-daily-graphic-1912-lehti-photo-v3.jpg',
  // H3 45–48 (photo-v4, 4.9.2026): The Illustrated London News ja Courier de l'Égypte.
  'tutankhamon-carter-1922': 'hetki-tutankhamon-carter-1922-lehti-photo-v4.jpg',
  'rosettan-kivi-1799': 'hetki-rosettan-kivi-1799-lehti-photo-v4.jpg',
};

/**
 * Hetken kuvat valmiine osoitteineen — yksi paikka, josta sekä kortti
 * (js/historian-hetket.js) että testit lukevat saman listan.
 */
export function hetkenKuvat(hetki) {
  return (hetki?.kuvat ?? []).map((kuva) => ({
    ...kuva,
    osoite: hetkenKuvaOsoite(kuva.tiedosto),
    selite: kuva.kuvateksti,
  }));
}

export const HISTORIAN_HETKET = [
  /*
   * 1. LISSABON 1484 — HYLKÄYS JUHANA II:N HOVISSA.
   * Piste on Lissabonin laatan päällä (1 laudan yksikkö). Omistaja
   * 3.9.2026: laatan päälle osuva hetki EI ole pääkartalla — sivu on
   * Lissabonin kaupunkilehdessä ja piste sen kohdekartalla
   * (js/packs/maakartat.js "Kolumbus 1484" → tämä hetki).
   * Lähde: en.wikipedia.org: Christopher Columbus, John II of Portugal
   */
  {
    id: 'kolumbus-portugali-1484',
    otsikko: 'Lissabon 1484 — kartta, jota kukaan ei osta',
    nimio: 'Lissabon 1484',
    paivays: '1484',
    paikka: 'Lissabon, Portugali',
    iso: 'PRT',
    lat: 38.7075, lon: -9.1355,
    teksti: 'Pöydällä on kartta, jota Kolumbus on kantanut ovelta ovelle jo '
      + 'vuosia. Siihen on merkitty lyhyt meri ja sen takana Aasia. Hän '
      + 'katsoo, kuinka kuninkaan asiantuntijat kumartuvat kartan ylle ja '
      + 'pudistavat päätään — taas kerran. Loukkaus on tuttu eikä siksi '
      + 'yhtään helpompi. Epäilijät osuvat siihen, mikä on olennaista: '
      + 'Kolumbus on laskenut maapallon liian pieneksi ja Aasian aivan liian '
      + 'lähelle, ja purjehdus, jonka hän lupaa, olisi todellisuudessa '
      + 'moninkertainen. Juhana II:n hovi ei silti hylkää suunnitelmaa vain '
      + 'laskuvirheen takia. Portugalin laivat etenevät jo Afrikan rannikkoa '
      + 'etelään, ja se tie Intiaan näyttää varmalta — miksi maksaa '
      + 'arvauksesta? Lissabonista lähtee mies, jolla ei ole laivaa eikä '
      + 'rahoittajaa. Seuraavat kahdeksan vuotta hän vie saman kartan '
      + 'Kastilian hoviin, sitten uudelleen ja uudelleen, kunnes joku '
      + 'vihdoin sanoo kyllä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-kolumbus-portugali-1484-lahi-photo-v3.jpg',
        kuvateksti: 'Kolumbus on kantanut samoja karttoja ja laskelmia ovelta '
          + 'toiselle jo vuosia, kun Portugalin hovin asiantuntijat sanovat '
          + 'jälleen ei. Heidän epäilynsä osuu olennaiseen: Kolumbus kuvittelee '
          + 'Aasian paljon lähemmäksi kuin se on.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja asiakirjareferenssit: '
          + 'Library of Congress, näyttely *1492: An Ongoing Voyage* ja Henry '
          + 'Harrisse Collection; tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/exhibits/1492/columbus.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-kolumbus-portugali-1484-kauko-photo-v3.jpg',
        kuvateksti: 'Kuningas Juhana II:n pöydällä Kolumbuksen suuri unelma '
          + 'näyttää tarpeettomalta riskiltä, sillä Portugali etenee jo Afrikan '
          + 'rannikkoa etelään. Hylätty suunnittelija lähtee Lissabonista '
          + 'loukattuna mutta ei luovuta — seuraavaksi hän yrittää Kastilian '
          + 'hovissa.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja asiakirjareferenssit: '
          + 'Library of Congress, näyttely *1492: An Ongoing Voyage* ja Henry '
          + 'Harrisse Collection; tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/exhibits/1492/columbus.html',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lissabonin laatan päällä (1 yksikkö): '
      + 'kaupungin laatan päälle osuva hetki ei ole pääkartalla (omistaja '
      + '3.9.2026) vaan Lissabonin kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lissabon' },
    lehtiJohdanto: 'Kolumbus asui Lissabonissa toistakymmentä vuotta ja esitti '
      + 'suunnitelmansa ensin Portugalin kuninkaalle — joka sanoi ei, ja oli '
      + 'laskuopin puolesta oikeassa.',
    lehtiTehtava: {
      kysymys: 'Missä Kolumbus haki rahoitusta ennen Espanjaa?',
      vaihtoehdot: [
        'Genovan tasavallasta',
        'Portugalin kuninkaalta Juhana II:lta',
        'Englannin kuninkaalta Henrik VII:ltä',
        'Venetsian dogelta',
      ],
      oikea: 1,
      fakta: 'Portugalin hovi hylkäsi suunnitelman 1484; Kastilian kyllä tuli '
        + 'vasta kahdeksan vuotta myöhemmin.',
    },
  },
  /*
   * 2. SANTA FÉ, GRANADA 17.4.1492 — KAPITULAATIOT.
   * Santa Fé on 11 km Granadasta länteen eli 4 laudan yksikköä —
   * kaupunkikaton ja kasauspassin sisällä. Omistaja 3.9.2026: piste
   * siirretään datassa sen verran irti kaupungista, että se mahtuu
   * kartalle omalla paikallaan ilman kattoVapaa-lippua ja ilman
   * siirtoviivaa (lon −3,72 → −3,87, noin 9 yksikköä Granadasta;
   * "ei haittaa vaikka ei ole täysin tarkka sijainti"). Sivu on
   * Granadan kaupunkilehdessä.
   * Lähde: en.wikipedia.org: Capitulations of Santa Fe, Christopher
   * Columbus, Isabella I of Castile
   */
  {
    id: 'kolumbus-santa-fe-1492',
    otsikko: 'Santa Fé 1492 — sanansaattaja tavoittaa tiellä',
    nimio: 'Santa Fé 1492',
    paivays: '17.4.1492',
    paikka: 'Santa Fé, Granada, Espanja',
    iso: 'ESP',
    lat: 37.19, lon: -3.87,
    teksti: 'Kavioiden kapse tavoittaa hänet vasta tiellä. Kolumbus on lähtenyt '
      + 'Santa Fésta jälleen kerran torjuttuna, kun kuninkaallinen '
      + 'sanansaattaja saa hänet kiinni ja käskee kääntyä takaisin: hovi on '
      + 'muuttanut mielensä. Miehellä, joka ratsastaa takaisin leirikaupunkiin, '
      + 'ei ole enää mitään hävittävää, ja juuri siksi hän uskaltaa vaatia. Hän '
      + 'ei pyydä pelkkiä laivoja vaan amiraalin arvon, kuvernöörin aseman '
      + 'löytämissään maissa ja kymmenyksen kaikesta, mitä lännestä tulee. '
      + 'Odotusta on takana seitsemän vuotta: Kastilian hovi on kuunnellut, '
      + 'lykännyt ja torjunut, ja koko ajan on ollut sota. Santa Fé on '
      + 'rakennettu Granadan piiritystä varten, ja kaupunki antautui vasta '
      + 'tammikuun toisena päivänä; nyt kruunulla on vihdoin aikaa kuunnella. '
      + 'Sopimus allekirjoitetaan 17. huhtikuuta 1492. Tarina, jonka mukaan '
      + 'Isabella pantitsi jalokivensä, on myöhempää perua — rahat tulivat '
      + 'kruunun varoista ja hovin neuvotteluista, ja niitä ajoi eteenpäin '
      + 'kuninkaan taloudenhoitaja Luis de Santángel. Kolumbus ei aavista, että '
      + 'samat pykälät, jotka nyt tekevät hänestä amiraalin, riitautetaan hänen '
      + 'kuolemansa jälkeen vuosikymmeniksi.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-kolumbus-santa-fe-1492-lahi-photo-v3.jpg',
        kuvateksti: 'Kuninkaallinen sanansaattaja tavoittaa jo pois lähteneen '
          + 'Kolumbuksen ja kutsuu hänet takaisin Santa Fehen: vuosien torjunnat '
          + 'vaihtuvat viimein suostumukseksi. Hän ei saa vain laivoja, vaan '
          + 'vaatii itselleen amiraalin arvon, kuvernöörin aseman ja osuuden '
          + 'mahdollisista rikkauksista.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja sopimusreferenssi: Library '
          + 'of Congress, Santa Fén 17.4.1492 kapitulaatiot ja Columbus, *Book '
          + 'of Privileges*; tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/exhibits/1492/columbus.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-kolumbus-santa-fe-1492-kauko-photo-v3.jpg',
        kuvateksti: 'Isabella ei tarinan vastaisesti panttaa jalokiviään; '
          + 'rahoitus syntyy hovin neuvotteluista ja kruunun varoista. Huhtikuun '
          + '1492 sopimuksen äärellä Kolumbukselle ratkaisevaa ei ole vain matka '
          + 'vaan se, mitä hänestä tulee, jos lännessä todella odottaa Aasia.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja sopimusreferenssi: Library '
          + 'of Congress, Santa Fén 17.4.1492 kapitulaatiot ja Columbus, *Book '
          + 'of Privileges*; tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/exhibits/1492/columbus.html',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'granada' },
    visa: {
      kysymys: 'Mistä Kolumbuksen ensimmäisen matkan rahoitus tuli?',
      vaihtoehdot: [
        'Kuningatar Isabella pantitsi jalokivensä',
        'Kruunun varoista ja hovin neuvotteluista',
        'Genovalaiset pankkiirit maksoivat koko retken',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Granadan viereen piiritystä varten rakennettu leirikaupunki '
      + 'Santa Fé näki 17. huhtikuuta 1492 sopimuksen, joka teki genovalaisesta '
      + 'purjehtijasta amiraalin ennen kuin hän oli löytänyt mitään.',
    lehtiTehtava: {
      kysymys: 'Mitä Kolumbus vaati Santa Fén sopimuksessa laivojen lisäksi?',
      vaihtoehdot: [
        'Aateliskirjan koko suvulleen',
        'Vapautuksen kaikista veroista',
        'Amiraalin arvon ja kymmenyksen löydöistä',
        'Oman sataman Cádizista',
      ],
      oikea: 2,
      fakta: 'Sopimus lupasi hänelle myös kuvernöörin aseman löytämissään '
        + 'maissa — pykälistä riideltiin oikeudessa vuosikymmeniä hänen '
        + 'kuolemansa jälkeen.',
    },
  },
  /*
   * 3. PALOS DE LA FRONTERA 3.8.1492.
   * Lähin kohdekaupunki Sevilla 31 laudan yksikön päässä — oma merkki
   * kartalle (kaupunkikaton kahdeksan yksikön säde ei yllä tänne) ja
   * sivu Sevillan kaupunkilehteen.
   * Lähde: en.wikipedia.org: Voyages of Christopher Columbus
   */
  {
    id: 'kolumbus-palos-1492',
    otsikko: 'Palos de la Frontera 1492 — kolme laivaa laskuveden mukana',
    nimio: 'Palos 1492',
    paivays: '3.8.1492',
    paikka: 'Palos de la Frontera, Espanja',
    iso: 'ESP',
    lat: 37.2306, lon: -6.8944,
    teksti: 'Santa Marían nuori laivapoika kuuntelee Palosin kirkonkelloja ja '
      + 'yrittää olla näyttämättä, ettei ole koskaan ollut avomerellä. Hänen '
      + 'ympärillään kaikki tuntevat toisensa: karavelleja Pintaa ja Niñaa '
      + 'luotsaavat paikkakunnan omat merenkulkijat, veljekset Martín Alonso ja '
      + 'Vicente Yáñez Pinzón, ja miehistö on värvätty naapureista Palosista ja '
      + 'Moguerista. Laiturilla seisova väki tuntee lähtijät nimeltä, ja se on '
      + 'pojan onni ja pelko yhtä aikaa. Aamu on juuri valjennut. Río Tinton '
      + 'suistossa vesi laskee, ja juuri sitä on odotettu: laskuvesi vie laivat '
      + 'merelle ilman soutua. Suurin aluksista '
      + 'on Santa María, pyöreärunkoinen nao, jonka omistaa Juan de la Cosa ja '
      + 'jota Kolumbus itse komentaa. Kolme päivää myöhemmin Pintan peräsin '
      + 'murtuu ja korjataan Kanariansaarilla; vasta 6. syyskuuta laivat '
      + 'kääntyvät La Gomeralta länteen viiden viikon merimatkalle. Poika '
      + 'luulee purjehtivansa Aasiaan, kuten Kolumbuskin. Matka päätyy '
      + 'toisaalle, ja siitä kohtaamisesta tulee käänne sekä Euroopalle että '
      + 'Amerikan alkuperäiskansoille.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-kolumbus-palos-1492-lahi-photo-v3.jpg',
        kuvateksti: 'Santa Marían nuori laivapoika kuuntelee Palosin kelloja ja '
          + 'yrittää olla näyttämättä, ettei ole koskaan ollut avomerellä. '
          + 'Kolumbus uskoo purjehtivansa Aasiaan; pojan tuntematon matka päätyy '
          + 'osaksi kohtaamista, joka mullistaa sekä Euroopan että Amerikan '
          + 'alkuperäiskansojen elämän.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Library of Congress, '
          + '*Writings of Christopher Columbus* ja Henry Harrisse Collection; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/resource/gdcmassbookdig.writingsofchrist01colu/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-kolumbus-palos-1492-kauko-photo-v3.jpg',
        kuvateksti: 'Rannalle jäävä perhe näkee kolmen pienen laivan katoavan '
          + 'Río Tinton suulle tietämättä, maksetaanko luvattu palkka tai '
          + 'palaako oma mies koskaan. Kolumbuksen retkikunta etsii Aasiaa mutta '
          + 'avaa pysyvän ja pian väkivaltaisen yhteyden Atlantin yli.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Library of Congress, '
          + '*Writings of Christopher Columbus* ja Henry Harrisse Collection; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.loc.gov/resource/gdcmassbookdig.writingsofchrist01colu/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'sevilla' },
    visa: {
      kysymys: 'Miksi Kolumbuksen laivat odottivat Palosin suistossa juuri aamun laskuvettä?',
      vaihtoehdot: [
        'Laskuvesi vei laivat merelle ilman soutua',
        'La Rábidan munkit siunasivat matkan vasta auringonnousussa',
        'Pintan peräsin oli vielä korjattavana',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Kahdeksankymmentä kilometriä Sevillasta länteen, Río Tinton '
      + 'suistossa, kolme laivaa odotti laskuvettä 3. elokuuta 1492 — ja '
      + 'lähtijät olivat tämän saman jokisuun omia merenkulkijoita.',
    lehtiTehtava: {
      kysymys: 'Mikä kolmesta aluksesta oli Kolumbuksen laivueen suurin?',
      vaihtoehdot: [
        'Pinta',
        'Niña',
        'Santa María',
        'Bérrio',
      ],
      oikea: 2,
      fakta: 'Santa María oli pyöreärunkoinen nao; Pinta ja Niña olivat '
        + 'pienempiä karavelleja.',
    },
  },
  /*
   * 4. SANLÚCAR DE BARRAMEDA 20.9.1519.
   * Sevilla 27 yksikön päässä — oma merkki kartalle ja sivu Sevillaan.
   * Lähde: en.wikipedia.org: Magellan expedition, Ferdinand Magellan
   */
  {
    id: 'magalhaes-sanlucar-1519',
    otsikko: 'Sanlúcar de Barrameda 1519 — viisi laivaa, joista yksi palaa',
    nimio: 'Sanlúcar 1519',
    paivays: '20.9.1519',
    paikka: 'Sanlúcar de Barrameda, Espanja',
    iso: 'ESP',
    lat: 36.7726, lon: -6.3530,
    teksti: 'Kuka teistä palaa? Sitä ei jokisuussa kysy kukaan ääneen. Köyttä '
      + 'kiristävä merimies on yksi noin 270 lähtijästä, ja kolmen vuoden '
      + 'kuluttua kotiin pääsee heistä kahdeksantoista. Laivasto tuli '
      + 'Sevillasta 10. elokuuta Guadalquivirjokea alas ja on maannut tässä '
      + 'jokisuussa yli viisi viikkoa: vettä, viiniä ja suolalihaa on lastattu '
      + 'viimeiseen asti. Ankkurissa on viisi alusta — lippulaiva Trinidad, San '
      + 'Antonio, Concepción, Victoria ja Santiago. Rannalla liikkuu ontuen '
      + 'portugalilainen Fernão de Magalhães, jonka jalka jäi vialle '
      + 'Azemmourin taistelussa Marokossa 1513 ja joka purjehtii nyt Espanjan '
      + 'kuninkaan lipun alla; espanjalaiset kapteenit epäilevät häntä jo ennen '
      + 'lähtöä. Hän itse kaatuu Filippiineillä huhtikuussa 1521. Tähän samaan '
      + 'jokisuuhun palaa 6. syyskuuta 1522 yksi laiva, Victoria, Juan '
      + 'Sebastián Elcanon komennossa — ensimmäiset maapallon ympäri '
      + 'purjehtineet ihmiset. Useimmat toverit jäivät nimettömiin hautoihin '
      + 'matkan varrelle.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-magalhaes-sanlucar-1519-lahi-photo-v3.jpg',
        kuvateksti: 'Köyttä kiristävä merimies on yksi noin 270 lähtijästä; '
          + 'kotiin palaa alkuperäisestä joukosta vain 18. Magalhães itse kuolee '
          + 'Filippiineillä, ja Juan Sebastián Elcano tuo viimeisen laivan '
          + 'Espanjaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Espanjan merivoimien '
          + 'Instituto de Historia y Cultura Naval, *Expedición de Juan '
          + 'Sebastián de Elcano y Fernando de Magallanes (1519–1522)*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/cienciaorgano/prefLang-es/02cienciaihcn--10navegaciones--21expvueltalmundo',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-magalhaes-sanlucar-1519-kauko-photo-v3.jpg',
        kuvateksti: 'Viisi laivaa lähtee, mutta Sanlúcar näkee kahden vuoden ja '
          + 'yhdentoista kuukauden kuluttua palaavan vain Victorian. Sen '
          + 'uupuneet miehet ovat ensimmäiset, jotka ovat kiertäneet maapallon — '
          + 'useimmat toverit jäävät nimettömiin hautoihin matkan varrelle.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Espanjan merivoimien '
          + 'Instituto de Historia y Cultura Naval, *Expedición de Juan '
          + 'Sebastián de Elcano y Fernando de Magallanes (1519–1522)*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/cienciaorgano/prefLang-es/02cienciaihcn--10navegaciones--21expvueltalmundo',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'sevilla' },
    visa: {
      kysymys: 'Kuinka moni Magalhãesin viidestä laivasta palasi Sanlúcariin syyskuussa 1522?',
      vaihtoehdot: [
        'Kolme',
        'Yksi, Victoria, ja sen kannella 18 miestä',
        'Kaksi, Trinidad ja Victoria',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Sevillasta lähdettiin 10. elokuuta 1519 Guadalquivirjokea '
      + 'alas, ja jokisuussa Sanlúcar de Barramedassa viisi laivaa odotti vielä '
      + 'yli viisi viikkoa ennen kuin ne katosivat länteen.',
    lehtiTehtava: {
      kysymys: 'Montako Magalhãesin viidestä laivasta palasi Sanlúcariin '
        + 'vuonna 1522?',
      vaihtoehdot: [
        'Ei yhtään',
        'Yksi',
        'Kolme',
        'Kaikki viisi',
      ],
      oikea: 1,
      fakta: 'Victoria palasi 6. syyskuuta 1522, kannellaan kahdeksantoista '
        + 'miestä.',
    },
  },
  /*
   * 5. LISSABON, RESTELON RANTA 8.7.1497.
   * Belém on 6 km Lissabonin keskustasta länteen eli 3 laudan yksikköä
   * — kaupunkikaton ja kasauspassin sisällä. Kaupunkilehden kohdekartta
   * ei kelpaa: Belém on 5,5 kilometriä kartan länsipuolella (rajaus
   * −9,1505…−9,118), eikä rajausta voi venyttää sinne ilman että
   * Lissabonin kartasta tulee seitsemän kilometrin levyinen ja
   * lukukelvoton. Omistaja 3.9.2026: piste siirretään datassa Tejon
   * suulle sen verran irti kaupungista, että se mahtuu kartalle omalla
   * paikallaan ilman kattoVapaa-lippua ja ilman siirtoviivaa (lon
   * −9,205 → −9,415, lat 38,696 → 38,700, noin 10 yksikköä
   * Lissabonista; "ei haittaa vaikka ei ole täysin tarkka sijainti").
   * Lähde: en.wikipedia.org: Vasco da Gama, Jerónimos Monastery
   */
  {
    id: 'vasco-da-gama-restelo-1497',
    otsikko: 'Restelon ranta 1497 — yö rukouksessa, aamu Intian tiellä',
    nimio: 'Restelo 1497',
    paivays: '8.7.1497',
    paikka: 'Restelon ranta, Lissabon',
    iso: 'PRT',
    lat: 38.7000, lon: -9.4150,
    teksti: 'Polvet painuvat rantahiekkaan, ja yön viimeinen tunti kuluu näin. '
      + 'Restelon kappelissa, jonka Henrik Purjehtija rakennutti merimiehiä '
      + 'varten ja joka on jo pahasti rapistunut, Vasco da Gama ja hänen '
      + 'miehensä ovat rukoilleet aamuun asti — moni heistä rukoilee ehkä '
      + 'vähemmän Intian rikkauksia kuin sitä, että näkisi vielä kotinsa. Moni '
      + 'ei näe: miehiä on noin 170, ja heistä palaa noin 55. Tejon suulla '
      + 'odottaa neljä alusta, da Gaman São Gabriel, hänen veljensä Paulon São '
      + 'Rafael, karavelli Bérrio ja nimetön varastolaiva, joka on määrä hylätä '
      + 'matkan varrella. Kukkulalla ei vielä ole luostaria: Jerónimos alkaa '
      + 'nousta vasta vuonna 1501, tämän matkan mausteilla ansaituilla '
      + 'tuloilla. Edessä on siihen mennessä pisin maihinnousuton '
      + 'avomerietappi, yli kolme kuukautta ja yli kymmenentuhatta kilometriä '
      + 'Etelä-Atlantin yli — ja sen päässä meritie Intiaan, jonka varaan '
      + 'kasvaa väkivaltainen kauppaimperiumi.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-vasco-da-gama-restelo-1497-lahi-photo-v3.jpg',
        kuvateksti: 'Restelossa polvistuva merimies rukoilee ehkä vähemmän '
          + 'Intian rikkauksia kuin sitä, että näkisi vielä kotinsa. Moni ei '
          + 'näe: da Gaman reitti avaa kaupalle uuden tien, mutta matka maksaa '
          + 'miehistölle nälkää, sairautta ja kuolemia.',
        lahde: 'Matkakirjan havainnekuva. Faktat: UNESCO Memory of the World, '
          + '*Journal of the first voyage of Vasco da Gama to India, 1497–1499*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.unesco.org/en/memory-world/journal-first-voyage-vasco-da-gama-india-1497-1499',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-vasco-da-gama-restelo-1497-kauko-photo-v3.jpg',
        kuvateksti: 'Rannalle jääville lähtö on lupaus vauraudesta ja '
          + 'mahdollinen viimeinen hyvästijättö samassa hetkessä. Kun da Gama '
          + 'palaa, Portugalilla on meritietä Intiaan koskeva vastaus — ja alku '
          + 'väkivaltaiselle kauppaimperiumille.',
        lahde: 'Matkakirjan havainnekuva. Faktat: UNESCO Memory of the World, '
          + '*Journal of the first voyage of Vasco da Gama to India, 1497–1499*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.unesco.org/en/memory-world/journal-first-voyage-vasco-da-gama-india-1497-1499',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'lissabon' },
    visa: {
      kysymys: 'Mitä Vasco da Gama miehineen teki Restelon rannalla lähtöä edeltävänä yönä?',
      vaihtoehdot: [
        'Lastasi mausteita ja viiniä laivoihin',
        'Juhli Manuel I:n hovissa',
        'Rukoili Henrik Purjehtijan kappelissa aamuun asti',
      ],
      oikea: 2,
    },
    lehtiJohdanto: 'Belémin rannalla seisoi vuonna 1497 pieni merimiesten '
      + 'kappeli, ei vielä luostaria; siellä Vasco da Gaman miehet valvoivat '
      + 'viimeisen yönsä Euroopassa.',
    lehtiTehtava: {
      kysymys: 'Mikä seisoi Restelon rannalla, kun Vasco da Gama lähti '
        + 'vuonna 1497?',
      vaihtoehdot: [
        'Jerónimosin luostari',
        'Belémin torni',
        'Merimiesten kappeli',
        'Kuninkaan telakkahalli',
      ],
      oikea: 2,
      fakta: 'Jerónimos alkoi nousta vasta 1501 ja Belémin torni 1514 — '
        + 'kappeli oli rannalla ensin.',
    },
  },
  /*
   * 6. PLYMOUTH 26.8.1768 — KARTALLE.
   * Lähin kohdekaupunki Lontoo 143 yksikön päässä (> 35).
   * Lähde: en.wikipedia.org: HMS Endeavour, First voyage of James Cook
   */
  {
    id: 'cook-endeavour-plymouth-1768',
    otsikko: 'Plymouth 1768 — hiililaiva lähtee Tyynellemerelle',
    nimio: 'Endeavour 1768',
    paivays: '26.8.1768',
    paikka: 'Plymouth, Englanti',
    iso: 'GBR',
    lat: 50.3660, lon: -4.1430,
    teksti: 'Laiturilla seisoo ruukku, jossa kasvaa elävä taimi. Sen vieressä '
      + 'on kasvipuristimia, lasipurkkeja ja verkkohäkkejä — laatikoita, joita '
      + 'sotalaivaan ei yleensä kanneta. Ne kuuluvat 25-vuotiaalle Joseph '
      + 'Banksille, joka kustansi omasta pussistaan seitsemän seuralaisensa '
      + 'paikat; mukana ovat ruotsalainen Daniel Solander ja turkulaissyntyinen '
      + 'Herman Spöring. Kansimies ottaa viimeisen katseen Plymouthiin ennen '
      + 'matkaa, jonka pituutta kukaan ei osaa luvata. Alus on entinen Whitbyn '
      + 'hiililaiva Earl of Pembroke: laivasto osti sen keväällä, nimesi His '
      + 'Majesty’s Bark Endeavouriksi ja rakensi ruumaan kolmannen kannen. '
      + 'Luutnantti James Cook, 39-vuotias, vie kahdeksantoista kuukauden '
      + 'muonat 94 hengelle, kymmenen tykkiä, sikoja, kanoja, kaksi '
      + 'vinttikoiraa ja lypsyvuohen. Virallinen tehtävä on mitata Venuksen '
      + 'ylikulku Tahitilla; hytissä on sinetöity kirje, jonka saa avata vasta '
      + 'sen jälkeen — käsky etsiä tuntematonta eteläistä mannerta. '
      + 'Kolmivuotinen matka tuottaa tiedettä ja karttoja sekä kohtaamisia, '
      + 'joiden seuraukset Tyynenmeren kansoille ovat kaikkea muuta kuin '
      + 'viattomia.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-cook-endeavour-plymouth-1768-lahi-photo-v3.jpg',
        kuvateksti: 'Endeavourin kansimies ottaa viimeisen katseen Plymouthiin '
          + 'ennen matkaa, jonka pituutta kukaan ei osaa luvata. Cook ja Joseph '
          + 'Banks tavoittelevat Venuksen ylikulkua ja uusia kasveja, mutta '
          + 'miehistö kantaa samalla imperiumin Euroopan ulkopuolisiin '
          + 'yhteisöihin.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alusreferenssi: Royal '
          + 'Museums Greenwich, James Cookin ja Joseph Banksin '
          + 'Endeavour-päiväkirjat sekä Endeavour 1768 -kokoelma; tarkistettu '
          + '3.9.2026.',
        url: 'https://www.rmg.co.uk/collections/search/endeavour%201768',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-cook-endeavour-plymouth-1768-kauko-photo-v3.jpg',
        kuvateksti: 'Hiililaivaksi rakennettuun Endeavouriin pakkautuu '
          + 'merimiesten lisäksi tähtitieteilijöitä, luonnontutkijoita, '
          + 'taiteilijoita ja heidän toiveitaan. Heidän kolmivuotinen matkansa '
          + 'tuottaa tiedettä, karttoja ja kohtaamisia, joiden seuraukset '
          + 'Tyynenmeren kansoille ovat kaikkea muuta kuin viattomia.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alusreferenssi: Royal '
          + 'Museums Greenwich, James Cookin ja Joseph Banksin '
          + 'Endeavour-päiväkirjat sekä Endeavour 1768 -kokoelma; tarkistettu '
          + '3.9.2026.',
        url: 'https://www.rmg.co.uk/collections/search/endeavour%201768',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'GBR' },
    visa: {
      kysymys: 'Mikä Endeavour oli ennen kuin laivasto osti sen?',
      vaihtoehdot: [
        'Itä-Intian komppanian kauppafregatti',
        'Whitbyn hiililaiva nimeltä Earl of Pembroke',
        'Kuninkaallisen laivaston vanha tykkivene',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Plymouthin laiturilla oli 26. elokuuta 1768 laatikoita, '
      + 'joita sotalaivaan ei yleensä kanneta: kasvipuristimia, lasipurkkeja ja '
      + 'eläviä taimia ruukuissa.',
    lehtiTehtava: {
      kysymys: 'Mikä oli Cookin ensimmäisen matkan virallinen tehtävä?',
      vaihtoehdot: [
        'Etsiä Luoteisväylä Kanadan pohjoispuolelta',
        'Mitata Venuksen ylikulku Tahitilla',
        'Kartoittaa Uuden-Seelannin rannikko',
        'Kuljettaa vangit Australiaan',
      ],
      oikea: 1,
      fakta: 'Sinetöity toinen käsky — etsiä eteläistä mannerta — sai avata '
        + 'vasta mittauksen jälkeen.',
    },
  },
  /*
   * 7. TRAFALGARIN NIEMEN EDUSTA 21.10.1805.
   * Lähin kohdekaupunki Tanger 18 yksikön päässä — oma merkki merelle
   * ja sivu Espanjan maalehteen (Tangerilla ei ole omaa lehteä).
   * Lähde: en.wikipedia.org: Battle of Trafalgar
   */
  {
    id: 'trafalgar-victory-1805',
    otsikko: 'Victoryn peräkansi 1805 — hetki ennen laukausta',
    nimio: 'Trafalgar 1805',
    paivays: '21.10.1805',
    paikka: 'Trafalgarin niemen edusta, Espanja',
    iso: 'ESP',
    lat: 36.1811, lon: -6.0339,
    teksti: 'Kuinka kaukana vihollislinja vielä on? Nelson kysyy sitä kapteeni '
      + 'Hardylta vielä kerran, ja kumpikin tietää, mitä vastaus tarkoittaa: '
      + 'Victory ajetaan suoraan lähitulitukseen. Kello on hieman yli '
      + 'kaksitoista. Neljännestä vaille kaksitoista Nelson lähetti '
      + 'lippuviestin "England expects that every man will do his duty", ja '
      + 'puolelta päivin ranskalainen Fougueux ampui ensimmäisen laukauksensa. '
      + 'Kansi on hiekoitettu, jottei veri tekisi lankuista liukkaita, ja '
      + 'tykkimiehet työskentelevät paitasillaan; ensimmäistä taisteluaan '
      + 'odottava ruutipoika yrittää lukea vanhempien merimiesten kasvoista, '
      + 'kuinka lähellä laukaus on. Victory on ajanut liittouman linjan läpi ja '
      + 'takertunut mastoistaan kiinni ranskalaiseen Redoutableen, jonka '
      + 'kannelle kokoontuu jalkaväkeä valtaamaan britti. Pian sen '
      + 'mesaanimarsista ammuttu muskettiluoti osuu Nelsonia vasempaan '
      + 'olkapäähän ja läpäisee selkärangan. Hänet kannetaan ruumaan, ja hän '
      + 'kuolee puoli viideltä, kolme tuntia myöhemmin; Hardy selviää päivästä. '
      + 'Brittien 27 linjalaivaa murtavat liittouman 33 laivan rivin, mutta '
      + 'kannella voitto tarkoittaa ensin savua, melua ja tovereiden '
      + 'menettämistä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-trafalgar-victory-1805-lahi-photo-v3.jpg',
        kuvateksti: 'Nelson kysyy kapteeni Hardylta vielä kerran vihollislinjan '
          + 'etäisyyttä; kumpikin tietää, että suunnitelma vie Victoryn suoraan '
          + 'lähitulitukseen. Hardy selviää päivästä, Nelson ei — heidän '
          + 'viimeisestä keskustelustaan tulee osa brittiläistä muistikuvaa '
          + 'Trafalgarista.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Royal Museums Greenwich, '
          + '*Battle of Trafalgar Timeline* ja National Maritime Museumin HMS '
          + 'Victory -kokoelma; tarkistettu 3.9.2026.',
        url: 'https://www.rmg.co.uk/stories/maritime-history/battle-trafalgar-timeline',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-trafalgar-victory-1805-kauko-photo-v3.jpg',
        kuvateksti: 'Ensimmäistä taisteluaan odottava nuori ruutipoika yrittää '
          + 'lukea vanhempien merimiesten kasvoista, kuinka lähellä ensimmäinen '
          + 'laukaus jo on. Nelsonin 27 alusta käyvät suuremman laivaston '
          + 'kimppuun, mutta kannella voitto tarkoittaa ensin savua, melua ja '
          + 'tovereiden menettämistä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Royal Museums Greenwich, '
          + '*Battle of Trafalgar Timeline* ja National Maritime Museumin HMS '
          + 'Victory -kokoelma; tarkistettu 3.9.2026.',
        url: 'https://www.rmg.co.uk/stories/maritime-history/battle-trafalgar-timeline',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-trafalgar-the-times-1805-lehti-photo-v3.jpg',
        kuvateksti: 'Lontoolaiset lukevat samasta uutisesta voiton ja '
          + 'menetyksen: Napoleonin laivasto on lyöty, mutta Nelson on kuollut '
          + 'Victoryllä. Merimiesten perheille Collingwoodin lähetys ei ole '
          + 'vielä juhla, vaan alku piinaavalle kysymykselle siitä, kenen nimi '
          + 'seuraavassa luettelossa on.',
        lahde: 'Matkakirjan havainnekuva: historiallinen rekonstruktio The '
          + 'Timesin 7.11.1805 julkaisemasta Trafalgar-uutisesta. Faktat: Royal '
          + 'Museums Greenwich, *Battle of Trafalgar Timeline*; tarkistettu '
          + '3.9.2026.',
        url: 'https://www.rmg.co.uk/stories/maritime-history/battle-trafalgar-timeline',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'ESP' },
    visa: {
      kysymys: 'Mistä Nelsonin kuolettava muskettilaukaus ammuttiin?',
      vaihtoehdot: [
        'Ranskalaisen Redoutablen mesaanimarsista',
        'Espanjalaiselta rannikkopatterilta',
        'Victoryn omalta kannelta vahingossa',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Trafalgarin niemen edustalla kohtasivat 21. lokakuuta 1805 '
      + 'brittien 27 linjalaivaa ja Ranskan ja Espanjan yhteinen 33 laivan '
      + 'rivi.',
    lehtiTehtava: {
      kysymys: 'Mistä ammuttiin luoti, joka haavoitti Nelsonia kuolettavasti?',
      vaihtoehdot: [
        'Espanjalaisen Santísima Trinidadin kannelta',
        'Trafalgarin niemen rannikkopatterista',
        'Ranskalaisen Redoutablen mesaanimarsista',
        'Oman laivan tykistä vahingossa',
      ],
      oikea: 2,
      fakta: 'Nelson kuoli puoli viideltä, kolme tuntia osuman jälkeen, kun '
        + 'taistelu oli jo voitettu.',
    },
  },
  /*
   * 8. SAN CRISTÓBAL (CHATHAM), GALÁPAGOS, SYYSKUU 1835.
   * DOKUMENTOITU POIKKEUS (ks. `kartanUlkopuolella` alla): saaristo on
   * Ecuadorin fokuslehden ikkunan LÄNSIPUOLELLA, eikä kohdekerros
   * piirrä ikkunan ulkopuolelle mitään — merkki jäisi laudan omaan
   * grafiikkaan kiinni. Galápagosilla ei ole omaa kaupunkilehteä eikä
   * kohdekarttaa, joten sivu avaa Ecuadorin maalehden.
   * Lähde: en.wikipedia.org: Second voyage of HMS Beagle
   */
  {
    id: 'darwin-galapagos-1835',
    otsikko: 'Chathamin saari 1835 — kilpikonna ja 26-vuotias mies',
    nimio: 'Galápagos 1835',
    paivays: 'syyskuu 1835',
    paikka: 'San Cristóbal (Chatham), Galápagos',
    iso: 'ECU',
    lat: -0.9017, lon: -89.6100,
    teksti: 'Kilpikonna kurottaa kaulaansa, ja 26-vuotias mies kyykistyy sitä '
      + 'vastaan katsomaan silmiin. Charles Darwin ei ole tässä hetkessä '
      + 'teorian isä vaan utelias keräilijä: hän istuu Cerro Tijeretasin '
      + 'kalliolla, merkitsee muistiin tulivuorenkartioita, jotka muistuttavat '
      + 'häntä Staffordshiren masuunien piipuista, kutsuu merileguaaneja '
      + 'pimeyden pikkupiruiksi ja pitää jättiläiskilpikonnia vedenpaisumusta '
      + 'vanhempina. HMS Beagle saapui Galápagosille 15. syyskuuta 1835, ja '
      + 'seuraavana päivänä kapteeni FitzRoy laski ankkurin Chathamin saaren '
      + 'rantaan. Miehistölle saaristo on lyhyt pysähdys veden, ruoan ja '
      + 'näytteiden vuoksi. Ratkaiseva havainto ei ole peippo vaan '
      + 'pilkkalintu: kun Darwin huomaa Charlesin saaren linnun eroavan '
      + 'Chathamin yksilöstä, hän alkaa merkitä muistiin, miltä saarelta kukin '
      + 'lintu on pyydystetty — osaa näytteistään hän ei ole merkinnyt '
      + 'lainkaan. Beagle purjehtii Tahitille 20. lokakuuta, ja teoria syntyy '
      + 'vasta vuosien vertailusta ja pitkästä epäröinnistä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-darwin-galapagos-1835-lahi-photo-v3.jpg',
        kuvateksti: '26-vuotias Darwin katsoo kilpikonnaa vielä uteliaana '
          + 'keräilijänä, ei valmiin teorian isänä. Hän ymmärtää saarten '
          + 'havaintojen merkityksen vasta myöhemmin — osin siksi, ettei aluksi '
          + 'merkitse kaikkien näytteidensä tarkkaa alkuperäsaarta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Darwin Correspondence '
          + 'Project, Darwinin vuoden 1835 kirjeet ja Galápagos-oleskelun '
          + 'toimitukselliset viitteet; tarkistettu 3.9.2026.',
        url: 'https://www.darwinproject.ac.uk/letter/?docId=letters/DCP-LETT-282.xml',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-darwin-galapagos-1835-kauko-photo-v3.jpg',
        kuvateksti: 'Beaglen miehistölle Galápagos on lyhyt pysähdys veden, '
          + 'ruoan ja näytteiden vuoksi; Darwinille sen viidestä viikosta tulee '
          + 'vuosikymmenten ajatuskumppani. Evoluutioteoria ei synny yhtenä '
          + 'välähdyksenä rannalla vaan epävarmoista muistiinpanoista, '
          + 'vertailusta ja pitkästä epäröinnistä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Darwin Correspondence '
          + 'Project, Darwinin vuoden 1835 kirjeet ja Galápagos-oleskelun '
          + 'toimitukselliset viitteet; tarkistettu 3.9.2026.',
        url: 'https://www.darwinproject.ac.uk/letter/?docId=letters/DCP-LETT-282.xml',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste x = 2846 on Ecuadorin fokuslehden ikkunan '
      + '(x 2925–3533) länsipuolella, eikä kohdekerros piirrä ikkunan '
      + 'ulkopuolelle',
    lehti: { laji: 'maa', avain: 'ECU' },
    lehtiJohdanto: 'HMS Beagle laski ankkurin Chathamin saarelle 16. syyskuuta '
      + '1835, ja laivan 26-vuotias luonnontutkija astui ensimmäistä kertaa '
      + 'Galápagosin laavarannalle.',
    lehtiTehtava: {
      kysymys: 'Mikä lintu sai Darwinin merkitsemään muistiin, miltä saarelta '
        + 'kukin yksilö oli pyydystetty?',
      vaihtoehdot: [
        'Peippo',
        'Pilkkalintu',
        'Fregattilintu',
        'Sinijalkasuula',
      ],
      oikea: 1,
      fakta: 'Peippoja Darwin ei vaivautunut merkitsemään saarittain; '
        + 'pilkkalinnut hän huomasi erilaisiksi jo paikan päällä.',
    },
  },
  /*
   * 9. KRISTIANIA (OSLO) 24.6.1893.
   * Oslo 1 yksikön päässä eli sama paikka. Omistaja 3.9.2026: laatan
   * päälle osuva hetki EI ole pääkartalla — sivu on Oslon
   * kaupunkilehdessä ja piste sen kohdekartalla (js/packs/maakartat.js
   * "Fram 1893" → tämä hetki). Piste osuisi myös Oslon
   * kohdekartan rajaukseen, mutta hetki ei ole nähtävyys: sen kortti
   * on havainnekuvineen ja tiimalasimerkkeineen oma lajinsa, ja vain
   * pääkartta osaa näyttää sen sellaisena.
   * Lähde: en.wikipedia.org: Nansen's Fram expedition
   */
  {
    id: 'nansen-fram-1893',
    otsikko: 'Kristiania 1893 — laiva, jonka jää nostaa',
    nimio: 'Fram 1893',
    paivays: '24.6.1893',
    paikka: 'Kristiania (Oslo), Norja',
    iso: 'NOR',
    lat: 59.9050, lon: 10.7500,
    teksti: 'Milloin isä tulee takaisin? Sitä ei laiturilla osaa sanoa kukaan. '
      + '31-vuotias Fridtjof Nansen jättää rantaan Eva-vaimonsa ja muutaman '
      + 'kuukauden ikäisen Liv-tyttärensä eikä lupaa paluupäivää. Rantakadut '
      + 'ovat mustanaan väkeä, linnoitukselta ammutaan kunnialaukaukset, ja '
      + 'vuonolle liukuu alus, joka näyttää väärin rakennetulta. Fram on matala '
      + 'ja pyöreäpohjainen: Colin Archer suunnitteli sen niin, ettei jäällä ole '
      + 'mistään otetta, vaan ahtojää nostaa laivan ylös eikä murskaa sitä. '
      + 'Runko on kolmea puukerrosta paksu — kuudestakymmenestä '
      + 'seitsemäänkymmeneen senttiä, keulassa runsaan metrin — ja päällystetty '
      + 'greenheart-puulla. Kannella on kolmetoista miestä, ja suunnitelma on '
      + 'se, jota moni tutkija on julkisesti kutsunut itsemurhaksi: ajaa laiva '
      + 'tahallaan kiinni Siperian pohjoispuoliseen ahtojäähän ja antaa virran '
      + 'kuljettaa se kohti pohjoisnapaa. Rannalla vilkuttavat odottavat '
      + 'uutisia lähes kolme vuotta. Fram palaa tähän satamaan 9. syyskuuta '
      + '1896, eikä yhtään miestä ole menetetty.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-nansen-fram-1893-lahi-photo-v3.jpg',
        kuvateksti: 'Nansen jättää Kristianiaan Eva-vaimonsa ja vasta muutaman '
          + 'kuukauden ikäisen Liv-tyttärensä eikä voi luvata paluupäivää. Hänen '
          + 'suunnitelmansa on tarkoituksella jäädyttää Fram ahtojäihin — juuri '
          + 'siihen, mitä merimiehet tavallisesti pelkäävät eniten.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Frammuseet, *The First Fram '
          + 'Expedition (1893–1896)*; tarkistettu 3.9.2026.',
        url: 'https://frammuseum.no/polar-history/expeditions/the-first-fram-expedition-1893-1896/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-nansen-fram-1893-kauko-photo-v3.jpg',
        kuvateksti: 'Rannalla vilkuttavat omaiset joutuvat odottamaan uutisia '
          + 'lähes kolme vuotta. Framin runko kestää jään puristuksen ja koko '
          + 'miehistö palaa, mutta lähdön hetkellä kukaan ei vielä tiedä, onko '
          + 'Nansenin uhkapeli nerokas vai kohtalokas.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Frammuseet, *The First Fram '
          + 'Expedition (1893–1896)*; tarkistettu 3.9.2026.',
        url: 'https://frammuseum.no/polar-history/expeditions/the-first-fram-expedition-1893-1896/',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-nansen-verdens-gang-1893-lehti-photo-v3.jpg',
        kuvateksti: 'Eva Nansen jää puolen vuoden ikäisen Livin kanssa '
          + 'odottamaan miestä, joka aikoo kadota tarkoituksella Jäämeren '
          + 'ahtojäihin. Lehden lukijalle suunnitelma näyttää lähes '
          + 'itsetuhoiselta; kolme vuotta myöhemmin Fram palaa ja koko miehistö '
          + 'astuu maihin.',
        lahde: 'Matkakirjan havainnekuva: historiallinen rekonstruktio Verdens '
          + 'Gangin 24.6.1893 ilmestyneestä lähtönumerosta. Faktat: Frammuseet, '
          + '*The First Fram Expedition (1893–1896)*; tarkistettu 3.9.2026.',
        url: 'https://frammuseum.no/polar-history/expeditions/the-first-fram-expedition-1893-1896/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Oslon laatan päällä (1 yksikkö): '
      + 'kaupungin laatan päälle osuva hetki ei ole pääkartalla (omistaja '
      + '3.9.2026) vaan Oslon kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'oslo' },
    lehtiJohdanto: 'Kristianian rannat olivat mustanaan väkeä 24. kesäkuuta '
      + '1893, kun vuonolle liukui pyöreäpohjainen laiva, jonka oli tarkoitus '
      + 'jäätyä kiinni tahallaan.',
    lehtiTehtava: {
      kysymys: 'Miksi Framin runko rakennettiin pyöreäksi?',
      vaihtoehdot: [
        'Jotta laiva kulkisi nopeammin myötätuulessa',
        'Jottei jäällä olisi mistään otetta',
        'Jotta ruumaan mahtuisi enemmän lastia',
        'Jotta laiva kestäisi tykkitulen',
      ],
      oikea: 1,
      fakta: 'Colin Archerin muotoilema runko nousi jään puristuksessa ylös sen '
        + 'sijaan että olisi murskaantunut.',
    },
  },
  /*
   * 10. ETELÄNAPA 14.12.1911.
   * Piste ei osu laudalle lainkaan: maailmankartan korkeus on 5399
   * yksikköä ja etelänapa projisoituisi riville 7611 — Etelämannerta ei
   * ole piirretty. Siksi hetki ei voi saada karttamerkkiä, ja sivu on
   * Norjan maalehdessä (omistajan ohje).
   * Lähde: en.wikipedia.org: Amundsen's South Pole expedition
   */
  {
    id: 'amundsen-etelanapa-1911',
    otsikko: 'Etelänapa 1911 — viisi miestä ja lipputanko',
    nimio: 'Etelänapa 1911',
    paivays: '14.12.1911',
    paikka: 'Etelänapa',
    iso: 'NOR',
    lat: -90, lon: 0,
    teksti: 'Telttaan jää kirje. Se on osoitettu Norjan kuninkaalle, ja sen '
      + 'viejäksi pyydetään Robert Scottia — siltä varalta, että Scott saapuu '
      + 'perille mutta viisi norjalaista ei pääse kotiin. Kello on noin kolme '
      + 'iltapäivällä, mittaukset sanovat että tämä on paikka, ja lipputankoon '
      + 'tarttuvat yhdessä Roald Amundsen, Olav Bjaaland, Helmer Hanssen, '
      + 'Sverre Hassel ja Oscar Wisting. Ylätasangon he nimeävät kuningas '
      + 'Haakon VII:n tasangoksi ja teltan Polheimiksi. Seuraavat kolme päivää '
      + 'kuluvat sekstantin ääressä ja hiihtäen navan ympäri ristiin rastiin, '
      + 'jotta paikka olisi todistettavasti oikea: Cookin ja Pearyn riitaiset '
      + 'pohjoisnapaväitteet ovat tuoreessa muistissa. Lipunnosto kestää '
      + 'hetken, ja kotiin on vielä lähes 1 300 kilometriä. Koirat ovat syy '
      + 'siihen, että he ovat täällä ensimmäisinä: kahdeksantoista nousi '
      + 'ylätasangolle, loput lopetettiin ruoaksi paikassa, jonka miehet '
      + 'nimesivät Teurastamoksi. Kaikki viisi palaavat; Scottin ryhmä ei.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-amundsen-etelanapa-1911-lahi-photo-v3.jpg',
        kuvateksti: 'Roald Amundsen, Olav Bjaaland, Helmer Hanssen, Sverre '
          + 'Hassel ja Oscar Wisting tietävät olevansa ensimmäisiä — mutta '
          + 'kotiin on vielä lähes 1 300 kilometriä. He jättävät teltalle '
          + 'kirjeen Norjan kuninkaalle siltä varalta, että Scott saapuu perille '
          + 'mutta he eivät.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja Fram-alusreferenssi: '
          + 'Frammuseet, Roald Amundsenin etelänaparetki 1910–1912; tarkistettu '
          + '3.9.2026.',
        url: 'https://frammuseum.no/polar-history/vessels/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-amundsen-etelanapa-1911-kauko-photo-v3.jpg',
        kuvateksti: 'Lipunnosto kestää hetken; selviytyminen on vaatinut '
          + 'viikkojen kylmyyden ja suunnitelman, jossa osa koirista uhrataan '
          + 'muiden ravinnoksi. Kaikki viisi norjalaista palaavat, kun taas 34 '
          + 'päivää myöhemmin navalle ehtivä Scottin ryhmä menehtyy '
          + 'paluumatkalla.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja Fram-alusreferenssi: '
          + 'Frammuseet, Roald Amundsenin etelänaparetki 1910–1912; tarkistettu '
          + '3.9.2026.',
        url: 'https://frammuseum.no/polar-history/vessels/',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-amundsen-tidens-tegn-1912-lehti-photo-v3.jpg',
        kuvateksti: 'Lyhyt sähke tekee Roald Amundsenista kansallissankarin, '
          + 'mutta retkikunnan miehille tärkein sana on paluu: kaikki viisi ovat '
          + 'hengissä. Samaan aikaan Robert Scott vetäytyy navalta kohti '
          + 'rannikkoa tietämättä vielä, ettei hänen ryhmänsä pääse kotiin.',
        lahde: 'Matkakirjan havainnekuva: historiallinen rekonstruktio Tidens '
          + 'Tegnin 9.3.1912 julkaisemasta Amundsen-numerosta. Faktat ja '
          + 'Fram-alusreferenssi: Frammuseet; tarkistettu 3.9.2026.',
        url: 'https://frammuseum.no/polar-history/vessels/',
      },
    ],
    kartalla: false,
    /*
     * DOKUMENTOITU POIKKEUS SÄÄNTÖÖN "nosto on aina jollain kartalla"
     * (tools/tarkista-nostopaikat.mjs). Piste on laudan eteläreunan
     * takana, eikä Norjaan sijoitettu tiimalasi olisi hetken
     * tapahtumapaikka vaan retkikunnan lähtömaa — väärä lupaus
     * kartalla. Sivu on Norjan maalehdessä.
     */
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'etelänapa projisoituisi riville 7611, kun laudan '
      + 'korkeus on 5399 — Etelämannerta ei ole piirretty',
    lehti: { laji: 'maa', avain: 'NOR' },
    lehtiJohdanto: 'Etelänavalla oli 14. joulukuuta 1911 kello noin kolme '
      + 'iltapäivällä viisi miestä, kahdeksantoista koiraa ja yksi lipputanko.',
    lehtiTehtava: {
      kysymys: 'Minkä nimen retkikunta antoi etelänavalle jättämälleen '
        + 'teltalle?',
      vaihtoehdot: [
        'Framheim',
        'Polheim',
        'Haakonsheim',
        'Nordheim',
      ],
      oikea: 1,
      fakta: 'Framheim oli retkikunnan talvehtimispaikka Rossin jäähyllyllä; '
        + 'navalle jäi Polheim.',
    },
  },
  /*
   * 11. SOUTHAMPTON 10.4.1912 — KARTALLE.
   * Lähin kohdekaupunki Lontoo 51 yksikön päässä (> 35).
   * Lähde: en.wikipedia.org: Titanic, Eva Hart, Michel Marcel Navratil
   */
  {
    id: 'titanic-southampton-1912',
    otsikko: 'Southampton 1912 — metri törmäyksestä',
    nimio: 'Titanic 1912',
    paivays: '10.4.1912',
    paikka: 'Southampton, Englanti',
    iso: 'GBR',
    lat: 50.8998, lon: -1.4166,
    teksti: 'Seitsemänvuotias Eva Hart nousee laivaan vanhempiensa kanssa, '
      + 'mutta hänen äitinsä Esther pelkää alusta niin paljon, ettei aio nukkua '
      + 'öisin koko matkan aikana. Matkustajat alkoivat saapua puoli '
      + 'kymmeneltä, kun Lontoon Waterloosta tullut laivajuna pysähtyi '
      + 'laiturille aivan Titanicin kylkeen; Southamptonista nousee kyytiin 920 '
      + 'matkustajaa, heistä 179 ensimmäiseen luokkaan, 247 toiseen ja 494 '
      + 'kolmanteen. Neitsytmatka alkaa keskipäivällä aikataulun mukaan — ja '
      + 'melkein päättyy heti, kun Titanicin syrjäyttämä vesi katkaisee '
      + 'kiinnitettynä makaavan New Yorkin köydet ja pienempi laiva kääntyy '
      + 'perä edellä sitä kohti. Kapteeni Smith käskee koneet täydelle taakse, '
      + 'hinaaja Vulcan saa köyden kiinni, ja alukset ohittavat toisensa noin '
      + 'metrin päästä; lähtö viivästyy tunnin. Neljästä savupiipusta vain '
      + 'kolme savuaa. Eva ja äiti pelastuvat; isä Benjamin jää niiden yli '
      + '1 500 joukkoon, jotka eivät palaa.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-titanic-southampton-1912-lahi-photo-v3.jpg',
        kuvateksti: 'Seitsemänvuotias Eva Hart nousee Titaniciin vanhempiensa '
          + 'kanssa, mutta hänen äitinsä Esther pelkää laivaa niin paljon, ettei '
          + 'suostu nukkumaan öisin. Eva ja äiti pelastuvat; isä Benjamin jää '
          + 'niiden yli 1 500 ihmisen joukkoon, jotka eivät palaa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Titanic Belfastin Eva Hart '
          + '-aineisto ja Encyclopedia Titanican matkustajatiedot Eva Hartista '
          + 'sekä Michel ja Edmond Navratilista; tarkistettu 3.9.2026.',
        url: 'https://www.encyclopedia-titanica.org/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-titanic-southampton-1912-kauko-photo-v3.jpg',
        kuvateksti: 'Kolmivuotias Michel ja kaksivuotias Edmond matkustavat '
          + 'isänsä kanssa väärällä sukunimellä, äidiltä salaa vietyinä. '
          + 'Haaksirikon jälkeen isä kuolee ja pojat tunnetaan viikkoja vain '
          + '’Titanicin orpoina’, kunnes heidän äitinsä tunnistaa '
          + 'heidät lehtikuvista.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Titanic Belfastin Eva Hart '
          + '-aineisto ja Encyclopedia Titanican matkustajatiedot Eva Hartista '
          + 'sekä Michel ja Edmond Navratilista; tarkistettu 3.9.2026.',
        url: 'https://www.encyclopedia-titanica.org/',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-titanic-daily-graphic-1912-lehti-photo-v3.jpg',
        kuvateksti: 'Jack Phillips jatkaa hätäkutsujen lähettämistä, vaikka '
          + 'vesi nousee Titanicin radiohyttiin; Harold Bride vetää pelastusliivin '
          + 'hänen ylleen. Bride selviää kaatuneen pelastusveneen päällä, '
          + 'Phillips kuolee — ja vain toinen heistä ehtii nähdä, kuinka lehdet '
          + 'tekevät radiomiehistä yön sankareita.',
        lahde: 'Matkakirjan havainnekuva: historiallinen rekonstruktio The '
          + 'Daily Graphicin 20.4.1912 julkaisemasta Titanic-muistonumerosta. '
          + 'Henkilöfaktat: Encyclopedia Titanica, Jack Phillips ja Harold '
          + 'Bride; tarkistettu 3.9.2026.',
        url: 'https://www.encyclopedia-titanica.org/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'GBR' },
    visa: {
      kysymys: 'Miksi Titanicin lähtö Southamptonista viivästyi tunnin?',
      vaihtoehdot: [
        'Sumu esti hinaajia työskentelemästä satamassa',
        'Hiilten lastaus keskeytyi lakon takia',
        'Sen syrjäyttämä vesi katkaisi New York -laivan kiinnitysköydet',
      ],
      oikea: 2,
    },
    lehtiJohdanto: 'Titanicin neitsytmatka alkoi Southamptonista täsmälleen '
      + 'keskipäivällä 10. huhtikuuta 1912, ja muutamaa minuuttia myöhemmin se '
      + 'melkein päättyi laiturin päähän.',
    lehtiTehtava: {
      kysymys: 'Montako Titanicin neljästä savupiipusta savusi?',
      vaihtoehdot: [
        'Yksi',
        'Kaksi',
        'Kolme',
        'Kaikki neljä',
      ],
      oikea: 2,
      fakta: 'Takimmainen piippu oli koriste, jota käytettiin keittiön ja '
        + 'tupakkasalonkien ilmanvaihtoon.',
    },
  },
  /*
   * 12. ROSKILDENVUONO NOIN 1040.
   * Kööpenhamina 18 yksikön päässä — oma merkki vuonolle ja sivu
   * Kööpenhaminan kaupunkilehteen. Vuosiluku 1040 on kuvaputken
   * tunnuksen ja arkeologisen referenssin mukainen: Skuldelev 2
   * rakennettiin vuosilustojen perusteella Dublinin seudulla noin
   * 1042–1043.
   * Lähde: en.wikipedia.org: Skuldelev ships, Horned helmet
   */
  {
    id: 'viikinkilaiva-roskilde-1040',
    otsikko: 'Roskildenvuono noin 1040 — kuusikymmentä airoa',
    nimio: 'Roskilde 1040',
    paivays: 'n. 1040',
    paikka: 'Roskildenvuono, Tanska',
    iso: 'DNK',
    lat: 55.7500, lon: 12.0200,
    teksti: 'Ensimmäinen ääni on airon kolahdus hankaimeen, ja se toistuu '
      + 'kuusikymmentä kertaa yhtä aikaa. Nuori soutaja lähtee ensimmäiselle '
      + 'pitkälle matkalleen eikä tiedä, palaako miehistö kaupankävijöinä, '
      + 'sotureina vai ei lainkaan. Vuono on matala ja mutkitteleva, ja sen '
      + 'takana on koko maailma: Atlantti lännessä, idässä jokireitit '
      + 'Mustallemerelle. Miehet työntävät keulaa irti rantamudasta, '
      + 'kilvet on ripustettu laidalle matkan ajaksi, purje on raidallista '
      + 'villaa ja päähineet huopaa ja nahkaa — sarvikypärä on 1800-luvun '
      + 'oopperalavojen keksintö eikä esiinny yhdessäkään viikinkiajan '
      + 'löydössä. Juuri tällaisia laivoja tunnetaan tarkasti, koska viisi '
      + 'niistä upotettiin 1000-luvulla tähän samaan vuonoon sulkemaan '
      + 'Peberrendenin väylä, ja Tanskan kansallismuseo nosti ne pohjasta '
      + 'vuosina 1957–1962. Suurin, Skuldelev 2, on tammesta rakennettu '
      + 'kolmikymmenmetrinen sotalaiva: kuusikymmentä soutajaa, 112 '
      + 'neliömetrin purje ja tilaa 70–80 miehelle. Sen tarkka jäljennös '
      + 'Havhingsten fra Glendalough purjehti vuonna 2007 Roskildesta Dubliniin '
      + 'ja seuraavana kesänä takaisin — sama matka, samat airot, tuhat vuotta '
      + 'myöhemmin.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-viikinkilaiva-roskilde-1040-lahi-photo-v3.jpg',
        kuvateksti: 'Kuvan nuori soutaja lähtee ensimmäiselle pitkälle '
          + 'matkalleen eikä tiedä, palaako miehistö kaupankävijöinä, sotureina '
          + 'vai ei lainkaan. Kapea pitkälaiva tekee saman aluksen kaikista '
          + 'kolmesta mahdollisen ja kuljettaa pohjoismaisia ihmisiä Atlantille '
          + 'sekä idän jokireiteille.',
        lahde: 'Matkakirjan havainnekuva. Alusreferenssi: Vikingeskibsmuseet, '
          + 'Skuldelev 2, Irlannissa noin 1042–1043 rakennettu pitkälaiva; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.vikingeskibsmuseet.dk/frontend/Dokumenter/Skuldelev2_b.pdf',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-viikinkilaiva-roskilde-1040-kauko-photo-v3.jpg',
        kuvateksti: 'Vuonon rannalle jäävät eivät näe pelkkää sotalaivaa vaan '
          + 'kokonaisen liikkuvan yhteisön: sukulaisia, velallisia, vapaita '
          + 'miehiä ja ehkä pakotettuja soutajia. Noin 60 airoa antaa alukselle '
          + 'nopeuden, mutta jokainen meripeninkulma syntyy yksittäisten käsien '
          + 'työstä.',
        lahde: 'Matkakirjan havainnekuva. Alusreferenssi: Vikingeskibsmuseet, '
          + 'Skuldelev 2, Irlannissa noin 1042–1043 rakennettu pitkälaiva; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://www.vikingeskibsmuseet.dk/frontend/Dokumenter/Skuldelev2_b.pdf',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'kobenhavn' },
    visa: {
      kysymys: 'Miksi viisi viikinkilaivaa upotettiin Roskildenvuonoon 1000-luvulla?',
      vaihtoehdot: [
        'Sulkemaan Peberrendenin väylä vihollislaivastolta',
        'Uhrilahjaksi merenjumalille',
        'Ne olivat lahonneet ja hylättiin',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Roskildenvuonon pohjasta nostettiin vuosina 1957–1962 viisi '
      + 'viikinkilaivaa, jotka oli aikanaan upotettu sulkemaan väylä — ja juuri '
      + 'niiden ansiosta tiedetään tarkasti, miltä tuhat vuotta sitten lähtenyt '
      + 'pitkälaiva näytti.',
    lehtiTehtava: {
      kysymys: 'Missä Skuldelev 2 -pitkälaiva rakennettiin?',
      vaihtoehdot: [
        'Roskildessa',
        'Bergenissä',
        'Dublinin seudulla',
        'Haithabussa',
      ],
      oikea: 2,
      fakta: 'Vuosilustot ajoittavat rakentamisen Dublinin seudulle noin '
        + 'vuoteen 1042.',
    },
  },
  /*
   * 13. WÜRZBURG 22.12.1895 — ENSIMMÄINEN RÖNTGENKUVA IHMISESTÄ.
   * Lähin kohdekaupunki on Alppien laatta 126 laudan yksikön päässä,
   * joten merkki menee kartalle sellaisenaan. Würzburgilla ei ole omaa
   * kaupunkilehteä, joten sivu on Saksan maalehdessä.
   * Lähde: en.wikipedia.org: Wilhelm Röntgen, X-ray
   */
  {
    id: 'rontgen-kasi-1895',
    otsikko: 'Würzburg 1895 — käsi, joka ei saa liikkua',
    nimio: 'Würzburg 1895',
    paivays: '22.12.1895',
    paikka: 'Würzburg, Saksa',
    iso: 'DEU',
    lat: 49.7969, lon: 9.9333,
    teksti: 'Käsi ei saa liikkua. Anna Bertha Röntgen pitää sitä paikallaan '
      + 'minuutti toisensa jälkeen tietämättä, näkyykö levylle mitään. Kun kuva '
      + 'kehittyy, siinä ovat hänen sormiensa luut ja vihkisormuksen tumma '
      + 'rengas: aviopari katsoo ensimmäistä kertaa elävän ihmisen sisään ilman '
      + 'veistä. Kerrotaan, että vaimo katsoi kuvaa ja sanoi nähneensä oman '
      + 'kuolemansa. Wilhelm Conrad Röntgen oli huomannut oudon säteilyn '
      + 'marraskuun kahdeksantena päivänä ja kertonut siitä viikkoihin tuskin '
      + 'kenellekään; hän söi usein laboratoriossaan ja toisti kokeitaan, '
      + 'kunnes tulos kesti hänen oman epäilynsä. Säteet hän nimesi '
      + 'X-säteiksi, koska ei tiennyt mitä ne olivat. Vasta 22. joulukuuta 1895 '
      + 'hän pyysi Anna Berthaa valotukseen, ja kuusi päivää myöhemmin hän '
      + 'jätti tuloksensa Würzburgin fyysis-lääketieteellisen seuran '
      + 'julkaistavaksi. Muutamassa kuukaudessa sairaalat ympäri maailmaa '
      + 'kuvasivat murtumia ja luodinsirpaleita, ja vuonna 1901 Röntgen sai '
      + 'ensimmäisen fysiikan Nobelin. Keksinnölleen hän ei ottanut patenttia: '
      + 'hän katsoi sen kuuluvan kaikille.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-rontgen-kasi-1895-lahi-photo-v3.jpg',
        kuvateksti: 'Anna Bertha Röntgen pitää kättään liikkumatta pitkän '
          + 'valotuksen ajan tietämättä, näkyykö levylle mitään. Kun luiden ja '
          + 'vihkisormuksen tumma hahmo ilmestyy, aviopari katsoo ensimmäistä '
          + 'kertaa elävän ihmisen sisään ilman veistä.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alkuperäisen käsikuvan '
          + 'referenssi: NobelPrize.org, Wilhelm Conrad Röntgenin elämäkerta ja '
          + 'kuvagalleria; tarkistettu 3.9.2026.',
        url: 'https://www.nobelprize.org/prizes/physics/1901/rontgen/biographical/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-rontgen-kasi-1895-kauko-photo-v3.jpg',
        kuvateksti: 'Röntgen kertoo kokeistaan viikkoihin tuskin kenellekään ja '
          + 'syökin usein laboratoriossa, kunnes tulos kestää hänen oman '
          + 'epäilynsä. Vasta sitten hän pyytää Anna Berthaa valotukseen, josta '
          + 'tulee sekä lääketieteellisen kuvantamisen alku että pelottavan '
          + 'henkilökohtainen perhekuva.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alkuperäisen käsikuvan '
          + 'referenssi: NobelPrize.org, Wilhelm Conrad Röntgenin elämäkerta ja '
          + 'kuvagalleria; tarkistettu 3.9.2026.',
        url: 'https://www.nobelprize.org/prizes/physics/1901/rontgen/photo-gallery/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'DEU' },
    visa: {
      kysymys: 'Kenen käsi näkyy Röntgenin 22. joulukuuta 1895 ottamassa kuvassa?',
      vaihtoehdot: [
        'Röntgenin oma käsi',
        'Hänen vaimonsa Anna Berthan käsi',
        'Yliopiston vahtimestarin käsi',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Würzburgin yliopiston laboratoriossa otettiin 22. joulukuuta '
      + '1895 valokuva, jossa näkyi elävän ihmisen käden luut ja sormessa '
      + 'vihkisormus — ja lääketiede sai uuden silmän.',
    lehtiTehtava: {
      kysymys: 'Miksi Röntgen ei koskaan patentoinut keksintöään?',
      vaihtoehdot: [
        'Yliopisto omisti kaikki hänen tuloksensa',
        'Patentti oli jo myönnetty toiselle tutkijalle',
        'Hän katsoi keksinnön kuuluvan kaikille',
        'Hän ei uskonut löydön olevan hyödyllinen',
      ],
      oikea: 2,
      fakta: 'Röntgen sai ensimmäisen fysiikan Nobelin vuonna 1901 ja lahjoitti '
        + 'palkintorahansa yliopistolleen.',
    },
  },
  /*
   * 14. KILL DEVIL HILLS, KITTY HAWK 17.12.1903.
   * Lähin kohdekaupunki on Appalakkien laatta 171 laudan yksikön
   * päässä, joten merkki menee kartalle sellaisenaan. Sivu on
   * Yhdysvaltain maalehdessä.
   * Lähde: en.wikipedia.org: Wright brothers, Wright Flyer
   */
  {
    id: 'wright-kitty-hawk-1903',
    otsikko: 'Kill Devil Hills 1903 — kaksitoista sekuntia ilmassa',
    nimio: 'Kitty Hawk 1903',
    paivays: '17.12.1903',
    paikka: 'Kill Devil Hills, Kitty Hawk, Yhdysvallat',
    iso: 'USA',
    lat: 36.0200, lon: -75.6700,
    teksti: 'Orville makaa vatsallaan Flyerin ohjaimissa, lantiollaan kehto, '
      + 'joka kiertää siipien kärkiä. Wilbur juoksee siiven rinnalla niin '
      + 'pitkään kuin pystyy. Kahdentoista sekunnin kuluttua kone osuu '
      + 'hiekkaan 36 metrin päässä lähtökohdasta — ja siinä on kaikki, mitä '
      + 'maailman ensimmäiseltä moottorilennolta jää nähtäväksi. Kill Devil '
      + 'Hillsin pelastusasemalla työskentelevä John T. Daniels ei ole koskaan '
      + 'ennen ottanut valokuvaa. Hän puristaa kameran laukaisupalloa juuri '
      + 'oikealla hetkellä, ja hänen levylleen jää kuva, joka on nyt jokaisessa '
      + 'oppikirjassa. Aamu on kylmä ja tuuli kova, ja koneen on rakentanut '
      + 'kaksi polkupyöräkauppiasta Daytonista: siivet ovat kangasta ja '
      + 'kuusipuuta, moottori heidän oma, noin kaksitoista hevosvoimaa. '
      + 'Lentoja tehdään sinä päivänä neljä, ja viimeisellä Wilbur pysyy '
      + 'ilmassa 59 sekuntia ja 260 metriä. Sen jälkeen tuulenpuuska kaataa '
      + 'koneen, eikä se lennä enää koskaan. Veljekset lähettävät kotiin '
      + 'sähkeen ja pyytävät kertomaan asiasta lehdistölle.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-wright-kitty-hawk-1903-lahi-photo-v3.jpg',
        kuvateksti: 'Orville makaa Flyerin ohjaimissa ja Wilbur juoksee siiven '
          + 'rinnalla niin pitkään kuin pystyy. Kahdentoista sekunnin kuluttua '
          + 'kone osuu hiekkaan, mutta veljekset tietävät jo onnistuneensa '
          + 'siinä, mitä moni piti mahdottomana.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alkuperäisen valokuvan '
          + 'referenssi: U.S. National Park Service, Wright Brothers National '
          + 'Memorial, *The First Flight*; tarkistettu 3.9.2026.',
        url: 'https://www.nps.gov/wrbr/learn/historyculture/thefirstflight.htm',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-wright-kitty-hawk-1903-kauko-photo-v3.jpg',
        kuvateksti: 'Pelastusasemalla työskentelevä John T. Daniels ei ole '
          + 'koskaan ennen ottanut valokuvaa, kun hän puristaa kameran '
          + 'laukaisupalloa juuri oikealla hetkellä. Hänen levylleen jää '
          + 'Orvillen 36 metrin lento — ensimmäinen neljästä yrityksestä sinä '
          + 'kylmänä aamuna.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja alkuperäisen valokuvan '
          + 'referenssi: U.S. National Park Service, Wright Brothers National '
          + 'Memorial, *The First Flight*; tarkistettu 3.9.2026.',
        url: 'https://www.nps.gov/wrbr/learn/historyculture/thefirstflight.htm',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'USA' },
    visa: {
      kysymys: 'Kuinka kauan Orville Wrightin ensimmäinen lento kesti 17. joulukuuta 1903?',
      vaihtoehdot: [
        'Kaksitoista sekuntia',
        'Viisikymmentäyhdeksän sekuntia',
        'Kolme ja puoli minuuttia',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Pohjois-Carolinan hiekkasärkillä nousi 17. joulukuuta 1903 '
      + 'ilmaan kone, jonka lento kesti kaksitoista sekuntia — ja jonka kuvan '
      + 'otti mies, joka ei ollut koskaan ennen käyttänyt kameraa.',
    lehtiTehtava: {
      kysymys: 'Kuka otti valokuvan Wrightin veljesten ensimmäisestä lennosta?',
      vaihtoehdot: [
        'Wilbur Wright',
        'Paikallislehden kuvaaja',
        'Pelastusaseman mies John T. Daniels',
        'Kukaan — kuva on myöhempi piirros',
      ],
      oikea: 2,
      fakta: 'Daniels ei ollut koskaan ennen ottanut valokuvaa; hän puristi '
        + 'laukaisupalloa juuri kun kone irtosi kiskosta.',
    },
  },
  /*
   * 15. BERN 1905 — PATENTTITOIMISTON IHMEVUOSI.
   * Lähin kohdekaupunki on Alppien laatta 31 laudan yksikön päässä,
   * joten merkki menee kartalle sellaisenaan. Bernillä ei ole omaa
   * kaupunkilehteä, joten sivu on Sveitsin maalehdessä.
   * Lähde: en.wikipedia.org: Albert Einstein, Annus Mirabilis papers
   */
  {
    id: 'einstein-patenttitoimisto-1905',
    otsikko: 'Bern 1905 — patenttipino ja valonsäde',
    nimio: 'Bern 1905',
    paivays: '1905',
    paikka: 'Bern, Sveitsi',
    iso: 'CHE',
    lat: 46.9480, lon: 7.4474,
    teksti: 'Pöydän kulmalla kasvaa pino patenttihakemuksia, ja jokainen uusi '
      + 'tulokas työntää fysiikan muistiinpanot laatikon pohjalle. Bernin '
      + 'patenttiviraston kolmannen luokan tekninen asiantuntija Albert '
      + 'Einstein on 26-vuotias, ja hänen palkkansa elättää Mileva-vaimon ja '
      + 'pienen Hans Albertin. Iltaisin hän palaa kysymykseen, jota on kantanut '
      + 'teini-ikäisestä asti: miltä valo näyttäisi, jos sen voisi ajaa kiinni? '
      + 'Ajatella ääneen hän voi harvojen kanssa: ystävän ja työtoverin Michele '
      + 'Besson kanssa kotimatkalla, ja iltaisin muutaman tuttavan kesken, '
      + 'jotka kutsuvat itseään pilaillen Olympia-akatemiaksi. Virastoon hän '
      + 'päätyi siksi, ettei yksikään haettu opettajanpaikka auennut. Vuonna '
      + '1905 Einstein lähettää Annalen der '
      + 'Physik -lehteen neljä tutkimusta: valosähköinen ilmiö, Brownin liike, '
      + 'erityinen suhteellisuusteoria sekä energian ja massan yhteys. Vuotta '
      + 'kutsutaan myöhemmin ihmevuodeksi, annus mirabilisiksi. Virastossa se '
      + 'ei näy mitenkään: Einstein arvioi hakemuksia vielä vuosia, ja '
      + 'yliopiston virkaan hän pääsee vasta 1909.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-einstein-patenttitoimisto-1905-lahi-photo-v3.jpg',
        kuvateksti: 'Patenttiviraston kolmannen luokan tekninen asiantuntija '
          + 'Albert Einstein joutuu siirtämään fysiikan muistiinpanot syrjään '
          + 'aina uuden hakemuksen saapuessa. Iltaisin hän palaa kysymykseen, '
          + 'miltä valo näyttäisi, jos sitä voisi ajaa kiinni.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja työhuonereferenssi: Albert '
          + 'Einstein Archives / einstein-website.de, *Patent Office*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://einstein-website.de/en/patent-office/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-einstein-patenttitoimisto-1905-kauko-photo-v3.jpg',
        kuvateksti: 'Kotona odottavat Mileva-vaimo, pieni Hans Albert ja niukka '
          + 'palkka; toimistossa odottaa pino patentteja. Tämän arkisen paineen '
          + 'keskellä 26-vuotias Einstein kirjoittaa neljä tutkimusta, mutta '
          + 'läheinen ystävä Michele Besso on niitä harvoja, joiden kanssa hän '
          + 'voi ajatella ääneen.',
        lahde: 'Matkakirjan havainnekuva. Faktat ja työhuonereferenssi: Albert '
          + 'Einstein Archives / einstein-website.de, *Patent Office*; '
          + 'tarkistettu 3.9.2026.',
        url: 'https://einstein-website.de/en/patent-office/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'CHE' },
    visa: {
      kysymys: 'Mikä oli Albert Einsteinin virka Bernin patenttitoimistossa vuonna 1905?',
      vaihtoehdot: [
        'Viraston johtaja',
        'Kirjaaja ja arkistonhoitaja',
        'Kolmannen luokan tekninen asiantuntija',
      ],
      oikea: 2,
    },
    lehtiJohdanto: 'Bernin patenttivirastossa istui vuonna 1905 kolmannen '
      + 'luokan tekninen asiantuntija, joka kirjoitti samana vuonna neljä '
      + 'tutkimusta ja muutti fysiikan.',
    lehtiTehtava: {
      kysymys: 'Montako mullistavaa tutkimusta Einstein julkaisi vuonna 1905?',
      vaihtoehdot: [
        'Yhden',
        'Kaksi',
        'Neljä',
        'Kaksitoista',
      ],
      oikea: 2,
      fakta: 'Vuotta kutsutaan siksi ihmevuodeksi, annus mirabilisiksi; '
        + 'yliopiston virkaan Einstein pääsi vasta 1909.',
    },
  },
  /*
   * 16. KUNINKAIDEN LAAKSO 26.11.1922 — REIKÄ HAUDAN OVEEN.
   * Piste on Luxorin laatan vieressä (2 laudan yksikköä), Niilin
   * länsirannalla ja Luxorin kohdekartan rajauksen ulkopuolella, joten
   * hetki on pääkartalla kattoVapaa-lipulla (tests/nostot-kartalla:
   * hetki ei ole nähtävyys, ja sen kortti aukeaa vain pääkartalta).
   * Sivu on Luxorin kaupunkilehdessä. Kuvat photo-v4 (H3 45–48).
   * Lähde: en.wikipedia.org: Tomb of Tutankhamun, Howard Carter
   */
  {
    id: 'tutankhamon-carter-1922',
    otsikko: 'Kuninkaiden laakso 1922 — "Näen ihmeellisiä asioita"',
    nimio: 'Luxor 1922',
    paivays: '26.11.1922',
    paikka: 'Kuninkaiden laakso, Egypti',
    iso: 'EGY',
    lat: 25.7402, lon: 32.6014,
    kuvaversio: 4,
    teksti: 'Kynttilän liekki lepattaa, kun sitä työnnetään reiästä, jonka '
      + 'Howard Carter on juuri kaivertanut muurattuun oveen. Kuuma ilma '
      + 'virtaa vastaan kammiosta, joka on ollut suljettuna yli kolme tuhatta '
      + 'vuotta. Carterin takana käytävässä seisovat kaivauksen rahoittaja '
      + 'lordi Carnarvon, hänen tyttärensä Evelyn Herbert ja apulainen Arthur '
      + 'Callender. Ensin ei näy mitään; sitten silmät tottuvat, ja pimeydestä '
      + 'nousee kullan hohdetta — eläinhahmoisia vuoteita, vaunuja, '
      + 'patsaita. "Näkyykö mitään?" Carnarvon kysyy. "Näkyy, ihmeellisiä '
      + 'asioita", Carter vastaa. Viikkoa aiemmin, 4. marraskuuta, työmiehet '
      + 'olivat löytäneet kallioon hakatun portaikon ensimmäisen askelman '
      + 'työmiesmajojen alta; Carnarvon oli rahoittanut Carterin kaivauksia '
      + 'vuodesta 1907 ja suostunut vielä yhteen, viimeiseen kauteen. '
      + 'Tämän oven takana on esikammio ja sen takana hautakammio, jonka '
      + 'sinetti murretaan vasta helmikuussa 1923. Hauta on ainoa lähes '
      + 'koskemattomana löydetty faaraonhauta, ja sen tyhjentäminen '
      + 'kestää kymmenen vuotta: esineitä on yli viisituhatta. Carnarvon ei '
      + 'näe niistä kuin alun — hän kuolee Kairossa huhtikuussa 1923 '
      + 'tulehtuneen hyttysenpureman jälkeen, ja lehdet keksivät faaraon '
      + 'kirouksen.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-tutankhamon-carter-1922-lahi-photo-v4.jpg',
        kuvateksti: 'Howard Carter jää hetkeksi liikkumatta kynttilä kädessään, kun lordi '
          + 'Carnarvon kysyy näkeekö hän mitään. Pienen oviaukon takana on '
          + 'eteiskammio — varsinainen hautakammio avataan vasta kolme kuukautta '
          + 'myöhemmin.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Griffith Institute — Tutankhamun '
          + 'excavation archive; tarkistettu 4.9.2026.',
        url: 'https://tutankhamun.griffith.ox.ac.uk/miscellaneous/taa-i12/taa-i1207',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-tutankhamon-carter-1922-kauko-photo-v4.jpg',
        kuvateksti: 'Lady Evelyn Herbert puristaa kättään rintaansa vasten ja yrittää nähdä '
          + 'isänsä olkapään yli. Carterin kynttilä on ainoa merkki siitä, että yli '
          + 'kolmentuhannen vuoden hiljaisuus on juuri rikkoutumassa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Griffith Institute — Tutankhamun '
          + 'excavation archive; tarkistettu 4.9.2026.',
        url: 'https://tutankhamun.griffith.ox.ac.uk/miscellaneous/taa-i12/taa-i1207',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-tutankhamon-carter-1922-lehti-photo-v4.jpg',
        kuvateksti: 'Brittiyleisö näki Carterin kurkistuksen ensin taiteilijan silmin: The '
          + 'Illustrated London News rakensi kuvan Carnarvonin kertomuksesta ja '
          + 'ilmoitti rehellisesti, että kyse oli piirroksesta. Juuri tämä '
          + 'välivaihe teki löydöstä yhteisen mielikuvan jo ennen kuin haudan '
          + 'valokuvat levisivät.',
        lahde: 'Matkakirjan havainnekuva. Lehtireferenssi: The Illustrated London News '
          + '1922–1923; faktat: Griffith Institute — Tutankhamun excavation '
          + 'archive; tarkistettu 4.9.2026.',
        url: 'https://tutankhamun.griffith.ox.ac.uk/miscellaneous/taa-i12/taa-i1207',
      },
    ],
    kartalla: true,
    kattoVapaa: true,
    lehti: { laji: 'kaupunki', avain: 'luxor' },
    visa: {
      kysymys: 'Mitä Howard Carter vastasi, kun häneltä kysyttiin, näkyykö reiästä mitään?',
      vaihtoehdot: [
        '"Ei mitään — hauta on ryöstetty"',
        '"Näkyy, ihmeellisiä asioita"',
        '"Kultaa, pelkkää kultaa"',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Marraskuussa 1922 Howard Carter työnsi kynttilän reiästä '
      + 'oveen, joka oli ollut muurattuna yli kolme tuhatta vuotta — ja '
      + 'Kuninkaiden laaksosta löytyi ainoa lähes koskematon faaraonhauta.',
    lehtiTehtava: {
      kysymys: 'Kuinka kauan Tutankhamonin haudan tyhjentäminen kesti?',
      vaihtoehdot: [
        'Yhden talven',
        'Kolme vuotta',
        'Kymmenen vuotta',
        'Sen tyhjentäminen on yhä kesken',
      ],
      oikea: 2,
      fakta: 'Yli viisituhatta esinettä luetteloitiin ja pakattiin '
        + 'yksitellen; työ valmistui 1932.',
    },
  },
  /*
   * 17. HISARLIK, TOUKOKUUN LOPPU 1873 — "PRIAMOKSEN AARRE".
   * Sama kumpu kuin Turkin fokuskohde Troija (js/packs/fokuskohteet-tur.js),
   * 67 laudan yksikköä Izmiristä, joten hetki on pääkartalla omalla
   * merkillään. Sivu on Turkin maalehdessä. Kuvat photo-v4 (H3 45–48).
   * Sofia Schliemannin muotokuva koruissa on jo Kreikan skandaalinosto
   * (Mykene), joten kuvassa ja tekstissä ollaan Hisarlıkissa.
   * Lähde: en.wikipedia.org: Priam's Treasure, Heinrich Schliemann
   */
  {
    id: 'schliemann-troija-1873',
    otsikko: 'Hisarlık 1873 — kulta kaivannon seinämässä',
    nimio: 'Troija 1873',
    paivays: 'toukokuu 1873',
    paikka: 'Hisarlık, Turkki',
    iso: 'TUR',
    lat: 39.9575, lon: 26.2389,
    kuvaversio: 4,
    teksti: 'Kaivannon seinämän juuresta, muurin alta, on tullut esiin '
      + 'kuparinen astia, ja sen sisältä alkaa nousta kultaa: diadeemeja, '
      + 'korvakoruja, nappeja, tuhansia pieniä kultaesineitä sekä hopeaa ja '
      + 'pronssia. Heinrich Schliemann on 51-vuotias, rikastunut kauppias, '
      + 'joka on tullut kummulle todistaakseen, että Homeroksen Troija oli '
      + 'totta, ja hän nimeää löydön saman tien Priamoksen aarteeksi. Oman '
      + 'kertomuksensa mukaan hän lähetti työmiehet tauolle ja kaivoi kullan '
      + 'esiin itse veitsellä, jottei kukaan näkisi; tutkijat ovat sittemmin '
      + 'epäilleet kertomusta, ja ne kaivajat, joiden käsien kautta löydöt '
      + 'kulkivat, jäivät hänen sankaritarinansa ulkopuolelle. Päiväkirjaan '
      + 'hän kirjoitti myös, että vaimo Sophia oli vieressä kääntämässä koruja '
      + 'huiviinsa — todellisuudessa Sophia oli Ateenassa, minkä hän myönsi '
      + 'myöhemmin itsekin. Aarre salakuljetetaan Kreikkaan, ottomaanien '
      + 'kaivausvalvoja Amin Efendi saa vankeustuomion, ja Schliemann sopii '
      + 'Ottomaanien valtion kanteen maksamalla korvauksen. Vuonna 1881 hän '
      + 'lahjoittaa aarteen Berliinille, josta puna-armeija vie sen 1945; '
      + 'Moskova myöntää sen olemassaolon vasta 1993. Se on lisäksi väärä '
      + 'Troija: kerros, josta kulta nousi, on noin tuhat vuotta Homeroksen '
      + 'sotaa vanhempi.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-schliemann-troija-1873-lahi-photo-v4.jpg',
        kuvateksti: 'Kaivaja ojentaa löydön Heinrich Schliemannille, mutta miehet eivät '
          + 'katso esinettä samalla tavalla: toiselle se on päivän työ, toiselle '
          + 'avain maineeseen. Se, kuka saa päättää aarteen kohtalosta, on jo tässä '
          + 'katseessa ratkaisematta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Staatliche Museen zu Berlin — 150 '
          + 'years since the Treasure of Priam; tarkistettu 4.9.2026.',
        url: 'https://www.smb.museum/en/whats-new/detail/150-years-since-heinrich-schliemann-uncovered-the-treasure-of-priamos-in-troy/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-schliemann-troija-1873-kauko-photo-v4.jpg',
        kuvateksti: 'Hisarlıkin kaivajat jatkavat lapiointia, kun Schliemann kokoaa '
          + 'esineitä peitteen alle. Työmiehet, joiden käsistä löydöt kulkivat, '
          + 'jäävät pian sivuun kertomuksesta, jonka Schliemann kirjoittaa omaksi '
          + 'sankaritarinakseen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Staatliche Museen zu Berlin — 150 '
          + 'years since the Treasure of Priam; tarkistettu 4.9.2026.',
        url: 'https://www.smb.museum/en/whats-new/detail/150-years-since-heinrich-schliemann-uncovered-the-treasure-of-priamos-in-troy/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'TUR' },
    visa: {
      kysymys: 'Mitä Priamoksen aarteen löytökerroksesta tiedetään nykyään?',
      vaihtoehdot: [
        'Se on Homeroksen Troijan sodan aikainen',
        'Se on noin tuhat vuotta Homeroksen sotaa vanhempi',
        'Se on roomalaisajalta',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Toukokuun lopulla 1873 Hisarlıkin kaivannon seinämästä '
      + 'nousi kuparinen astia täynnä kultaa, ja Heinrich Schliemann nimesi '
      + 'sen Priamoksen aarteeksi — väärästä kerroksesta.',
    lehtiTehtava: {
      kysymys: 'Missä Priamoksen aarre on nykyään?',
      vaihtoehdot: [
        'Istanbulin arkeologisessa museossa',
        'Berliinissä, jonne Schliemann lahjoitti sen',
        'Moskovassa, jonne puna-armeija vei sen 1945',
        'Ateenassa Schliemannin kotitalossa',
      ],
      oikea: 2,
      fakta: 'Venäjä myönsi vasta 1993, että aarre on Puškin-museossa; '
        + 'Berliini pyytää sitä yhä takaisin.',
    },
  },
  /*
   * 18. RASHID (ROSETTA), HEINÄKUU 1799 — KIVI LINNOITUKSEN MUURISTA.
   * Piste on Fort Julienin kohdalla Niilin Rosettan suuhaaran rannalla,
   * 58 laudan yksikköä Kairosta: pääkartalla omalla merkillään, sivu
   * Egyptin maalehdessä. Kuvat photo-v4 (H3 45–48); lehtisivu on
   * Courier de l'Égypte, joka kertoi löydöstä syyskuussa 1799.
   * Lähde: en.wikipedia.org: Rosetta Stone
   */
  {
    id: 'rosettan-kivi-1799',
    otsikko: 'Rosetta 1799 — musta kivi muurin sisästä',
    nimio: 'Rosetta 1799',
    paivays: 'heinäkuu 1799',
    paikka: 'Rashid (Rosetta), Egypti',
    iso: 'EGY',
    lat: 31.4044, lon: 30.4194,
    kuvaversio: 4,
    teksti: 'Ranskalaiset sotilaat purkavat vanhaa muuria Fort Julienin '
      + 'linnoituksessa Niilin suistossa, kun lapio kolahtaa kiveen, joka ei '
      + 'ole tavallinen. Se on musta, sileäksi hiottu paasi, ja sen pintaan '
      + 'on kaiverrettu kolme erilaista kirjoitusta päällekkäin: ylinnä '
      + 'hieroglyfejä, keskellä tuntemattomia kursiivimerkkejä, alinna '
      + 'kreikkaa. Pioneeriupseeri Pierre-François Bouchard ymmärtää heti, '
      + 'että kreikkalainen teksti voi olla avain kahteen muuhun, ja kivi '
      + 'lähetetään Napoleonin tutkijoille Kairoon. Egyptin retkikunnan oma '
      + 'lehti Courier de l\'Égypte kertoo löydöstä syyskuussa 1799. Kivi ei '
      + 'jää ranskalaisille: kun Britannia voittaa vuonna 1801, se '
      + 'siirtyy antautumissopimuksen ehtona Lontooseen ja on ollut British '
      + 'Museumissa vuodesta 1802. Teksti osoittautuu papiston päätökseksi '
      + 'vuodelta 196 eaa. nuoren kuninkaan Ptolemaios V:n kunniaksi — sama '
      + 'sisältö kolmella kirjoituksella. Sen avulla Thomas Young ja lopulta '
      + 'Jean-François Champollion vuonna 1822 murtavat hieroglyfit, joita '
      + 'kukaan ei ollut osannut lukea lähes puoleentoista vuosituhanteen. '
      + 'Sotilaat eivät sitä vielä tiedä: he näkevät vain painavan kiven, '
      + 'joka on kannettava pois muurin tieltä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-rosettan-kivi-1799-lahi-photo-v4.jpg',
        kuvateksti: 'Nuori sapööri pyyhkii rakennuspölyn pois, ja Pierre-François Bouchard '
          + 'tajuaa kolmen tekstivyöhykkeen kertovan saman asian eri merkein. '
          + 'Kumpikaan ei vielä osaa lukea hieroglyfejä, mutta he ymmärtävät '
          + 'pitelevänsä mahdollista avainta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: British Museum — The Rosetta Stone; '
          + 'tarkistettu 4.9.2026.',
        url: 'https://www.britishmuseum.org/collection/object/Y_EA24',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-rosettan-kivi-1799-kauko-photo-v4.jpg',
        kuvateksti: 'Fort Julienin korjaajat pysäyttävät työn ja kampeavat raskaan kiven '
          + 'päivänvaloon köysillä ja puulla. Löytö syntyy linnoituksen arkisesta '
          + 'purkutyöstä — ei suunnitellusta aarteenetsinnästä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: British Museum — The Rosetta Stone; '
          + 'tarkistettu 4.9.2026.',
        url: 'https://www.britishmuseum.org/collection/object/Y_EA24',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-rosettan-kivi-1799-lehti-photo-v4.jpg',
        kuvateksti: 'Courier de l’Égypte raportoi löydöstä syyskuussa 1799 ilman '
          + 'sensaatio-otsikkoa: kolme kirjoitusjärjestelmää, sama kivipinta ja '
          + 'varovainen toivo avaimesta. Lukijalle ratkaiseva lause piiloutui '
          + 'kahden tiheän palstan keskelle.',
        lahde: 'Matkakirjan havainnekuva. Lehtireferenssi: Courier de l’Égypte, '
          + 'syyskuu 1799; faktat: British Museum — The Rosetta Stone; tarkistettu '
          + '4.9.2026.',
        url: 'https://www.britishmuseum.org/collection/object/Y_EA24',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'EGY' },
    visa: {
      kysymys: 'Miksi Rosettan kivi oli niin tärkeä?',
      vaihtoehdot: [
        'Se oli ainoa säilynyt kuva Ptolemaios V:stä',
        'Sama teksti oli kaiverrettu siihen kolmella kirjoituksella, joista yksi oli kreikkaa',
        'Se paljasti, missä Aleksanterin hauta oli',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Heinäkuussa 1799 ranskalaiset sotilaat kaivoivat Rosettan '
      + 'linnoituksen muurista mustan kiven, jonka kolme kirjoitusta avasivat '
      + 'parikymmentä vuotta myöhemmin hieroglyfit.',
    lehtiTehtava: {
      kysymys: 'Missä Rosettan kivi on ollut vuodesta 1802?',
      vaihtoehdot: [
        'Louvressa Pariisissa',
        'Egyptin museossa Kairossa',
        'British Museumissa Lontoossa',
        'Institut d\'Égyptessä Aleksandriassa',
      ],
      oikea: 2,
      fakta: 'Britannia sai kiven vuoden 1801 antautumissopimuksen ehtona; '
        + 'Egypti on pyytänyt sitä takaisin.',
    },
  },
];

/** Hetket tunnuksen mukaan — kortti ja testit lukevat samasta paikasta. */
export const HISTORIAN_HETKET_ID = new Map(HISTORIAN_HETKET.map((h) => [h.id, h]));

/** Vain kartalle merkityt hetket, maakoodin mukaan ryhmiteltynä. */
export function hetketMaassa(iso) {
  return HISTORIAN_HETKET.filter((h) => h.kartalla && h.iso === iso);
}
