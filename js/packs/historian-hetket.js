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
 * Hetkiä on 49: H1-pilotin kymmenen meren ja löytöretkien hetkeä,
 * kuvaputken photo-v3-erän mukana saapunut viisikko (Kolumbuksen kaksi
 * rahoitushetkeä ja kolme tiedehistorian hetkeä: Röntgen, Wrightin
 * veljekset, Einstein), H3 45–48:n viisi arkeologian ja tähtitieteen
 * hetkeä sekä kuvaputken 5.9.2026 toimittama 29 hetken erä (H3 51–81:
 * tiede, tekniikka, kaupungit, taide ja politiikka Pompejista Berliinin
 * muuriin). Sama erä uusi Röntgenin ja Einsteinin kuvat photo-v4:ksi.
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
 * on nimetty julkaisunsa eikä hetken mukaan; testi lukitsee listan.
 * H3 45–48 toi kaksi lisää (Tutankhamon, Rosetta) ja 5.9.2026:n erä
 * viisi: Suez (The Illustrated London News), Brooklyn (Brooklyn Daily
 * Eagle), Lontoon palo (The London Gazette), Berliinin muuri (BILD) ja
 * Lumière (Le Radical — ainoa uusista, joka on nimetty lehden mukaan:
 * `hetki-lumiere-le-radical-1895-lehti-photo-v4.jpg`). Lehtikuvia on
 * yhteensä yhdellätoista hetkellä.
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
 * aikakauden lehtisivu (pystykuva, vain yhdellätoista hetkellä).
 *
 * KUVAERÄN VERSIO: H1–H3 36–44 ovat `-photo-v3`, ja H3 45–48 (4.9.2026)
 * sekä H3 51–81 (5.9.2026) `-photo-v4` — hetken `kuvaversio`-kenttä
 * (oletus 3) kertoo tiedoston päätteen, ja testi johtaa nimen siitä.
 * Yksittäinen uusittu kuva saa oman `versio`-kentän (Machu Picchu: lähi
 * v4, kauko v5; Galilei v5). Röntgen ja Einstein saivat 5.9.2026:n erässä
 * uudet v4-kuvat ja -kuvatekstit; vanhat v3-tiedostot jäävät ämpäriin.
 *
 * FRANKLIN 1752 ON YKSIKUVAINEN: kuvaputki toimitti leijakokeesta vain
 * lähikuvan (paketti 5.9.2026), ja testi sallii sen tälle hetkelle.
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
  // H3 51–81 (photo-v4, 5.9.2026): The Illustrated London News, Brooklyn
  // Daily Eagle, The London Gazette, BILD ja Le Radical.
  'suezin-kanava-avajaiset-1869': 'hetki-suezin-kanava-avajaiset-1869-lehti-photo-v4.jpg',
  'brooklyn-bridge-1883': 'hetki-brooklyn-bridge-1883-lehti-photo-v4.jpg',
  'lontoon-palo-1666': 'hetki-lontoon-palo-1666-lehti-photo-v4.jpg',
  'berliinin-muuri-1961': 'hetki-berliinin-muuri-1961-lehti-photo-v4.jpg',
  'lumiere-elokuva-1895': 'hetki-lumiere-le-radical-1895-lehti-photo-v4.jpg',
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
   * kaupunkilehteä, joten sivu on Saksan maalehdessä. Kuvat ja
   * kuvatekstit uusittiin photo-v4:ksi 5.9.2026:n paketissa; teksti,
   * visa ja lehtisivun oma sisältö säilyivät.
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
    kuvaversio: 4,
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
        tiedosto: 'hetki-rontgen-kasi-1895-lahi-photo-v4.jpg',
        kuvateksti: 'Anna Bertha Röntgen pitää vasenta kättään liikkumatta '
          + 'valokuvalevyllä, vaikka pöydän takana rätisevän laitteen '
          + 'vaikutusta ei voi nähdä eikä tuntea. Arjessa tutut sormukset '
          + 'jäävät kuvaan intiimeiksi merkeiksi: uusi säteily erottaa metallin '
          + 'ja luut elävän käden sisältä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Deutsches Röntgen-Museum — '
          + 'UNESCO dossier, tarkistettu 5.9.2026.',
        url: 'https://roentgenmuseum.de/wp-content/uploads/2025/05/2025_DRM_DRG_UNESCO_Broschuere_A5.pdf',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-rontgen-kasi-1895-kauko-photo-v4.jpg',
        kuvateksti: 'Röntgen on pitänyt löytönsä lähes kokonaan omana tietonaan '
          + 'ennen kuin pyytää vaimonsa pimeään laboratorioon. Anna Bertha ei '
          + 'voi tietää näkymättömän säteilyn riskejä; hänen osakseen jää '
          + 'luottaa mieheensä ja odottaa, kun perheenjäsenestä tulee '
          + 'uudenlaisen ihmiskuvan ensimmäinen kohde.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Deutsches Röntgen-Museum — '
          + 'UNESCO dossier, tarkistettu 5.9.2026.',
        url: 'https://roentgenmuseum.de/wp-content/uploads/2025/05/2025_DRM_DRG_UNESCO_Broschuere_A5.pdf',
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
   * kaupunkilehteä, joten sivu on Sveitsin maalehdessä. Kuvat ja
   * kuvatekstit uusittiin photo-v4:ksi 5.9.2026:n paketissa; teksti,
   * visa ja lehtisivun oma sisältö säilyivät.
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
    kuvaversio: 4,
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
        tiedosto: 'hetki-einstein-patenttitoimisto-1905-lahi-photo-v4.jpg',
        kuvateksti: 'Michele Besso kuuntelee, kun työtoveri yrittää purkaa valoa '
          + 'ja samanaikaisuutta koskevan pulman arkiseksi ajatuskokeeksi. '
          + 'Patenttivirasto maksaa Einsteinin vuokran; Besso on yksi harvoista, '
          + 'joiden kanssa 26-vuotias tekninen asiantuntija voi ajatella ääneen '
          + 'ennen kuin vuoden 1905 paperit lähtevät maailmalle.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Einstein Haus Bern — Einstein '
          + 'and Bern, tarkistettu 5.9.2026.',
        url: 'https://www.einstein-bern.ch/einstein-and-bern/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-einstein-patenttitoimisto-1905-kauko-photo-v4.jpg',
        kuvateksti: 'Viraston hakemukset on käsiteltävä ennen kuin oma fysiikka '
          + 'saa tilaa, ja kotona odottavat Mileva sekä vuoden ikäinen Hans '
          + 'Albert. Einstein ei näytä toimiston nerolta vaan yhdeltä '
          + 'kiireiseltä virkailijalta — juuri siksi pöydän alle jäävä pieni '
          + 'muistiinpanoliuska tuntuu niin epätodennäköiseltä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Einstein Haus Bern — Einstein '
          + 'and Bern, tarkistettu 5.9.2026.',
        url: 'https://www.einstein-bern.ch/einstein-and-bern/',
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
  /*
   * 19. PADOVA, TAMMIKUU 1610 — JUPITERIN KUUT.
   * Galilei oli Padovan yliopiston professori (Venetsian tasavalta) ja
   * havaitsi kuut kotoaan Padovasta; piste on 19 laudan yksikköä
   * Venetsiasta, joten hetki on pääkartalla omalla merkillään ja sivu
   * Venetsian kaupunkilehdessä. Kuvat photo-v5 (omistaja hylkäsi v4:n
   * kaukoputken asennon). Lähde: en.wikipedia.org: Galilean moons,
   * Sidereus Nuncius, Galileo Galilei
   */
  {
    id: 'galilei-kaukoputki-1610',
    otsikko: 'Padova 1610 — neljä valopistettä Jupiterin vieressä',
    nimio: 'Padova 1610',
    paivays: 'tammikuu 1610',
    paikka: 'Padova, Venetsian tasavalta',
    iso: 'ITA',
    lat: 45.4064, lon: 11.8768,
    kuvaversio: 5,
    teksti: 'Tammikuun 7. päivän iltana 1610 Galileo Galilei suuntaa itse '
      + 'rakentamansa, noin kaksikymmentä kertaa suurentavan kaukoputken '
      + 'Jupiteriin ja näkee planeetan vieressä kolme pientä valopistettä '
      + 'suorassa rivissä. Hän pitää niitä tähtinä. Seuraavana iltana ne '
      + 'ovat vaihtaneet paikkaa, ja 13. tammikuuta niitä on neljä. Ilta '
      + 'illan jälkeen hän piirtää pisteiden asemat muistiin, apulainen '
      + 'kirjaa ja kynttilä hyytyy tammikuun kylmässä, kunnes selitys ei '
      + 'enää voi olla muu: pisteet kiertävät Jupiteria. Se on ensimmäinen '
      + 'kerta, kun jonkin nähdään kiertävän muuta kuin Maata — ja '
      + 'Ptolemaioksen maailma, jossa kaikki kiertää Maata, saa ensimmäisen '
      + 'näkyvän kolhunsa. Galilei on 45-vuotias matematiikan professori '
      + 'Padovan yliopistossa Venetsian tasavallassa, ja hän on hionut '
      + 'linssinsä itse edellisestä syksystä alkaen. Maaliskuussa 1610 hän '
      + 'julkaisee Venetsiassa ohuen kirjan Sidereus nuncius, Tähtien '
      + 'sanansaattaja, jossa ovat Kuun vuoret, Linnunradan lukemattomat '
      + 'tähdet ja neljä "Medicin tähteä", jotka hän nimeää Toscanan '
      + 'suurherttuan suvulle päästäkseen tämän hoviin. Kuut tunnetaan nyt '
      + 'Galilein kuina: Io, Europa, Ganymedes ja Kallisto. Kirja tekee '
      + 'hänestä Euroopan kuuluisimman luonnontutkijan — ja aloittaa tien, '
      + 'joka päättyy inkvisition eteen vuonna 1633.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-galilei-kaukoputki-1610-lahi-photo-v5.jpg',
        kuvateksti: 'Galileo painaa silmänsä kapeaan okulaariin ja yrittää '
          + 'pitää Jupiterin näkökentässä paljain käsin tammikuun kylmyydessä. '
          + 'Valopisteet ovat jälleen vaihtaneet paikkaa: havainto on hiljainen, '
          + 'mutta hänen ilmeestään näkee, ettei vanha taivaanjärjestys enää '
          + 'riitä selitykseksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: dramatisoitu fotorealistinen '
          + 'rekonstruktio Padovan tammikuun 1610 havainnoista; kaukoputken '
          + 'rakenne ja havaintojakso perustuvat Museo Galileon säilyneeseen '
          + 'instrumenttiin ja Sidereus nuncius -aineistoon; tarkistettu '
          + '4.9.2026.',
        url: 'https://catalogue.museogalileo.it/object/GalileosTelescope.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-galilei-kaukoputki-1610-kauko-photo-v5.jpg',
        kuvateksti: 'Apulainen yrittää saada Galileon sanelemat pisteet '
          + 'paperille ennen kuin kynttilä tai sormet hyytyvät kylmään. Kun '
          + 'sama työ toistuu yö toisensa jälkeen, valojen liike alkaa näyttää '
          + 'siltä mitä se on: neljä kuuta kiertää Jupiteria.',
        lahde: 'Matkakirjan havainnekuva. Faktat: dramatisoitu fotorealistinen '
          + 'rekonstruktio 7.1.–2.3.1610 tehdyistä toistuvista havainnoista; '
          + 'kaukoputki perustuu Museo Galileon säilyneeseen noin 1610 '
          + 'instrumenttiin; tarkistettu 4.9.2026.',
        url: 'https://catalogue.museogalileo.it/object/GalileosTelescope.html',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'venetsia' },
    visa: {
      kysymys: 'Mitä Galilei näki tammikuussa 1610 Jupiterin vieressä?',
      vaihtoehdot: [
        'Neljä kuuta, jotka kiertävät planeettaa',
        'Saturnuksen renkaat',
        'Pyrstötähden',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Tammikuussa 1610 Padovan yliopiston professori suuntasi '
      + 'itse rakentamansa kaukoputken Jupiteriin ja näki neljä valopistettä, '
      + 'jotka ilta illalta vaihtoivat paikkaa — ensimmäiset kappaleet, joiden '
      + 'nähtiin kiertävän muuta kuin Maata.',
    lehtiTehtava: {
      kysymys: 'Miksi Galilei nimesi kuut "Medicin tähdiksi"?',
      vaihtoehdot: [
        'Ne löytyivät Medicien palatsin katolta',
        'Hän halusi Toscanan suurherttuan hoviin',
        'Medicit rahoittivat kaukoputken',
        'Paavi määräsi nimen',
      ],
      oikea: 1,
      fakta: 'Omistus toimi: samana vuonna 1610 Galilei sai hovimatemaatikon '
        + 'viran Firenzestä.',
    },
  },
  /*
   * 20. MACHU PICCHU 24.7.1911 — POIKA NÄYTTÄÄ TIEN.
   * Piste on Andeilla, 8 laudan yksikköä laudan omasta Machu Picchu
   * -kohteesta (yli katon säteen, ei kattoVapaata), joten hetki on
   * pääkartalla omalla merkillään. Perulla ei ole maalehteä, joten
   * sivu on Liman kaupunkilehdessä (Binghamin retkikunta lähti Limasta).
   * Lähikuva on photo-v4, kaukokuva photo-v5 (omistaja hylkäsi
   * ensimmäisen kaukokuvan): versio kuvakohtaisesti.
   * Lähde: en.wikipedia.org: Hiram Bingham III, Machu Picchu
   */
  {
    id: 'machu-picchu-1911',
    otsikko: 'Machu Picchu 1911 — poika, joka näytti tien',
    nimio: 'Machu Picchu 1911',
    paivays: '24.7.1911',
    paikka: 'Machu Picchu, Peru',
    iso: 'PER',
    lat: -13.1631, lon: -72.5450,
    teksti: 'Polku on märkä ja jyrkkä, ja edellä kulkee yksitoistavuotias '
      + 'Pablito Richarte, joka on kulkenut sen sata kertaa. Hänen perässään '
      + 'hengästyy Yalen yliopiston historianlehtori Hiram Bingham, 35, joka '
      + 'on maksanut Urubamban laaksossa asuvalle Melchor Arteagalle yhden '
      + 'solin oppaan palkkiona ja saanut kuulla, että vuoren harjanteella '
      + 'on vanhoja raunioita. Harjanteella asuu kaksi perhettä, Richarte '
      + 'ja Álvarez; he viljelevät inkojen terasseja, ja lapset leikkivät '
      + 'köynnösten peittämien muurien välissä. Bingham näkee sinä päivänä '
      + 'graniittiseinät, jotka on hakattu niin tarkasti, ettei saumaan '
      + 'mahdu veistä, ja kirjoittaa päiväkirjaansa, että paikka on '
      + 'ihmeellinen. Hän uskoo löytäneensä inkojen viimeisen pakolinnan '
      + 'Vilcabamban — se oli toisaalla — ja National Geographicin vuoden '
      + '1913 numero tekee hänestä kadonneen kaupungin löytäjän. '
      + 'Löytäjäksi hänet nimeävät lehdet, eivät ne, jotka asuivat '
      + 'paikalla: yhteen muuriin oli jo vuonna 1902 kaivertanut nimensä '
      + 'paikallinen Agustín Lizárraga. Kaupungin rakensi inkakuningas '
      + 'Pachacútec 1400-luvun puolivälissä, ja espanjalaiset eivät '
      + 'löytäneet sitä koskaan — siksi se on säilynyt.',
    kuvat: [
      {
        rooli: 'lahi',
        versio: 4,
        tiedosto: 'hetki-machu-picchu-1911-lahi-photo-v4.jpg',
        kuvateksti: 'Pablito vilkaisee olkansa yli varmistaakseen, pysyykö '
          + 'hengästynyt Hiram Bingham perässä. Pojalle märkä polku ja '
          + 'köynnösten alta nouseva kiviseinä ovat tuttuja; vasta vieras '
          + 'kutsuu kulkuaan löydöksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: National Geographic — Machu '
          + 'Picchu and Hiram Bingham; tarkistettu 4.9.2026.',
        url: 'https://www.nationalgeographic.com/magazine/article/machu-picchu-peru-inca-hiram-bingham-discovery',
      },
      {
        rooli: 'kauko',
        versio: 5,
        tiedosto: 'hetki-machu-picchu-1911-kauko-photo-v5.jpg',
        kuvateksti: 'Pablito vilkaisee mutaiselta polulta, pysyykö hengästynyt '
          + 'Bingham perässä, samalla kun Richarten ja Álvarezin perheiden '
          + 'päivä jatkuu maissipellolla. Heille kiviseinät eivät ole löytö vaan '
          + 'tuttu ympäristö, jota ulkopuolinen alkaa vasta kutsua '
          + 'maailmansensaatioksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: dramatisoitu fotorealistinen '
          + 'rekonstruktio Machu Picchusta heinäkuussa 1911 ennen vuoden 1912 '
          + 'laajaa raivausta; paikalliset asukkaat ja viljely nostetaan '
          + 'tarkoituksella Binghamin rinnalle; National Geographic — Machu '
          + 'Picchu and Hiram Bingham; tarkistettu 4.9.2026.',
        url: 'https://www.nationalgeographic.com/magazine/article/machu-picchu-peru-inca-hiram-bingham-discovery',
      },
    ],
    kartalla: true,
    lehti: { laji: 'kaupunki', avain: 'lima' },
    visa: {
      kysymys: 'Kuka johdatti Hiram Binghamin Machu Picchun raunioille 1911?',
      vaihtoehdot: [
        'Perun armeijan kartoitusosasto',
        'Paikallinen viljelijä Melchor Arteaga ja Richarten perheen poika',
        'Vanha inkakartta Cuscon arkistosta',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Heinäkuussa 1911 yalelainen Hiram Bingham kiipesi paikallisen '
      + 'viljelijän ja yksitoistavuotiaan pojan perässä harjanteelle, jolla '
      + 'kaksi perhettä viljeli inkojen terasseja — ja lehdet tekivät hänestä '
      + 'kadonneen kaupungin löytäjän.',
    lehtiTehtava: {
      kysymys: 'Miksi Machu Picchu säilyi niin hyvin?',
      vaihtoehdot: [
        'Inkat purkivat sen itse ja rakensivat uudelleen',
        'Espanjalaiset valloittajat eivät koskaan löytäneet sitä',
        'Se oli koko ajan Perun valtion suojelussa',
        'Se rakennettiin vasta 1800-luvulla',
      ],
      oikea: 1,
      fakta: 'Pachacútecin 1400-luvulla rakennuttama kaupunki hylättiin '
        + 'valloituksen aikoihin ja jäi köynnösten alle.',
    },
  },
  /*
   * 21. PARIISI 1898 — RADIUM EROTETAAN PIHAVAJASSA.
   * Piste on Pariisin laatan päällä (0,5 laudan yksikköä) ja Pariisin
   * kohdekartan rajauksessa (ESPCI:n piha, rue Lhomond). Omistaja
   * 3.9.2026: laatan päälle osuva hetki ei ole pääkartalla — sivu on
   * Pariisin kaupunkilehdessä ja piste sen kohdekartalla
   * (js/packs/maakartat.js "Curie 1898"). Kuvat photo-v4 (H3 51–81).
   * Lähde: en.wikipedia.org: Marie Curie, ESPCI Paris
   */
  {
    id: 'marie-curie-hangaari-1898',
    otsikko: 'Pariisi 1898 — tonni malmia, kymmenesosagramma radiumia',
    nimio: 'Curie 1898',
    paivays: '1898',
    paikka: 'Pariisi, Ranska',
    iso: 'FRA',
    lat: 48.8420, lon: 2.3476,
    kuvaversio: 4,
    teksti: 'Olkapäät ovat puutuneet jo aamupäivällä, mutta tankoa ei voi '
      + 'laskea. Marie Curie sekoittaa kiehuvaa pikivälkeliuosta '
      + 'rautakattilassa, ja vaja, joka oli ennen lääketieteellisen koulun '
      + 'ruumiinavaussali, vuotaa sateella katosta. Pierre mittaa vieressä '
      + 'säteilyä; luku on se, joka kertoo työn kannattavan. Curiet olivat '
      + 'ilmoittaneet poloniumin heinäkuussa 1898 ja radiumin 26. joulukuuta '
      + 'samana vuonna, mutta ilmoitus ei riitä kemisteille — uusi alkuaine '
      + 'on saatava käteen puhtaana. Se tarkoittaa tonneittain kaivosten '
      + 'pikivälkejätettä, joka keitetään, suodatetaan ja '
      + 'kiteytetään yhä uudelleen. Työ vie vuoteen 1902, jolloin tonnista '
      + 'malmia on eristetty kymmenesosagramma radiumkloridia. Aviopari ei '
      + 'tiedä, mitä näkymätön säteily tekee käsille ja verelle; Marie '
      + 'kantaa koeputkia taskussaan ja ihailee niiden hohdetta pimeässä. '
      + 'Vuonna 1903 hän jakaa fysiikan Nobelin Pierren ja Henri Becquerelin '
      + 'kanssa, ensimmäisenä naisena, ja vuonna 1911 saa kemian palkinnon '
      + 'yksin.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-marie-curie-hangaari-1898-lahi-photo-v4.jpg',
        kuvateksti: 'Jokainen tankoa kiertävä liike nostaa padasta happamia '
          + 'höyryjä, mutta Marie Curie jatkaa, koska mittari kertoo '
          + 'jäännöksessä olevan jotakin uraania voimakkaampaa. Tuhansien '
          + 'kilojen käsittely kuluttaa ruumista ennen kuin radiumia saadaan '
          + 'näkyviin edes suolanjyvän verran.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Musée Curie — '
          + 'näyttelyaineisto, tarkistettu 5.9.2026.',
        url: 'https://musee.curie.fr/.uploads/2022-10/5257_curie-expo-10-ans_ok_ok-rvb-ce9c3f83.pdf',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-marie-curie-hangaari-1898-kauko-photo-v4.jpg',
        kuvateksti: 'Marie ja Pierre Curien laboratorio ei ole loistokas '
          + 'tiedepalatsi vaan kylmä pihavaja, jossa säkit, padat ja '
          + 'mittaukset täyttävät päivän. Kumpikaan ei vielä tiedä, kuinka '
          + 'kalliin hinnan jatkuva säteilyaltistus heidän terveydeltään '
          + 'perii.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Musée Curie — '
          + 'näyttelyaineisto, tarkistettu 5.9.2026.',
        url: 'https://musee.curie.fr/.uploads/2022-10/5257_curie-expo-10-ans_ok_ok-rvb-ce9c3f83.pdf',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (0,5 yksikköä) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Rue Lhomondin pihalla seisoi vuosisadan vaihteessa vuotava '
      + 'vaja, jossa aviopari keitti tonneittain kaivosjätettä saadakseen '
      + 'siitä esiin suolanjyvän verran uutta alkuainetta.',
    lehtiTehtava: {
      kysymys: 'Paljonko radiumkloridia Curiet saivat eristettyä tonnista '
        + 'pikivälkettä vuoteen 1902 mennessä?',
      vaihtoehdot: [
        'Kymmenesosagramman',
        'Kilon',
        'Sata grammaa',
        'Kymmenen grammaa',
      ],
      oikea: 0,
      fakta: 'Puhtaan radiummetallin Marie Curie eristi vasta 1910; '
        + 'poloniumia hän ei saanut koskaan puhtaana talteen.',
    },
  },
  /*
   * 22. WOOLSTHORPE 1666 — PRISMA JA RUTTOVUOSI.
   * Lähin kohdekaupunki Lontoo 61 laudan yksikön päässä — oma merkki
   * kartalle. Woolsthorpella ei ole kaupunkilehteä, joten sivu on
   * Britannian maalehdessä.
   * Lähde: en.wikipedia.org: Isaac Newton, Woolsthorpe Manor
   */
  {
    id: 'newton-prisma-1666',
    otsikko: 'Woolsthorpe 1666 — valo, joka kantaa värit mukanaan',
    nimio: 'Newton 1666',
    paivays: '1666',
    paikka: 'Woolsthorpe Manor, Lincolnshire, Englanti',
    iso: 'GBR',
    lat: 52.8092, lon: -0.6306,
    kuvaversio: 4,
    teksti: 'Mistä värit tulevat — lasista vai valosta? Kysymys on tuttu '
      + 'jokaiselle, joka on nähnyt auringon prisman läpi, ja vastaus on '
      + 'ollut vuosisatoja sama: lasi värjää valon. Kaksikymmentäkolmevuotias '
      + 'Isaac Newton ei usko sitä. Hän istuu äitinsä talossa Woolsthorpessa, '
      + 'koska rutto sulki Cambridgen yliopiston kesällä 1665, ja hänellä on '
      + 'aikaa, hiljaisuutta ja kaksi prismaa. Ensimmäinen taittaa '
      + 'ikkunaluukun reiästä tulevan säteen seinälle värinauhaksi, joka on '
      + 'pitkulainen eikä pyöreä, vaikka reikä on pyöreä. Toinen prisma '
      + 'näyttää ratkaisevan: punainen jää punaiseksi, sininen siniseksi. '
      + 'Värit eivät siis synny lasissa, vaan valkoinen valo on niiden seos, '
      + 'jonka prisma vain hajottaa. Samojen ruttovuosien aikana hän kehittää '
      + 'differentiaalilaskennan alkeet ja miettii, miksi omena putoaa ja kuu '
      + 'ei. Näitä kahta vuotta on kutsuttu tieteen historian '
      + 'tuottoisimmiksi. Kirjaksi asti työ ehtii vasta 1704, teoksessa '
      + 'Opticks — Newton ei pitänyt kiirettä eikä riitelystä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-newton-prisma-1666-lahi-photo-v4.jpg',
        kuvateksti: 'Newton peittää ikkunan lähes kokonaan ja päästää sisään '
          + 'vain yhden valonsäteen, jotta pieni prisma saa vastata. Seinälle '
          + 'venyvä värijono osoittaa, etteivät värit synny lasissa: valkoinen '
          + 'valo kantaa ne jo mukanaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: National Trust — Woolsthorpe '
          + 'Manor, tarkistettu 5.9.2026.',
        url: 'https://www.nationaltrust.org.uk/visit/nottinghamshire-lincolnshire/woolsthorpe-manor/things-to-do-at-woolsthorpe-manor',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-newton-prisma-1666-kauko-photo-v4.jpg',
        kuvateksti: 'Rutto on sulkenut Cambridgen, ja 23-vuotias Newton on '
          + 'palannut lapsuudenkotiinsa vailla professoreita tai '
          + 'laboratoriota. Pimennetty huone, ikkunaluukun reikä ja prisma '
          + 'riittävät kokeeseen, joka pakottaa ajattelemaan valon uudelleen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: National Trust — Woolsthorpe '
          + 'Manor, tarkistettu 5.9.2026.',
        url: 'https://www.nationaltrust.org.uk/visit/nottinghamshire-lincolnshire/woolsthorpe-manor/things-to-do-at-woolsthorpe-manor',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'GBR' },
    visa: {
      kysymys: 'Miksi Newton teki prismakokeensa kotitilallaan Woolsthorpessa eikä Cambridgessa?',
      vaihtoehdot: [
        'Cambridgen yliopisto oli erottanut hänet',
        'Rutto oli sulkenut yliopiston',
        'Woolsthorpessa oli Englannin ainoa prisma',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Lincolnshiren maalaistalossa nuori mies pimensi huoneen ja '
      + 'päästi luukun reiästä sisään yhden säteen — ja päätteli, että '
      + 'valkoinen valo on värien seos eikä lasi värjää mitään.',
    lehtiTehtava: {
      kysymys: 'Mitä Newtonin toinen prisma osoitti?',
      vaihtoehdot: [
        'Että lasi lisää valoon uusia värejä',
        'Että värit ovat silmän harhaa',
        'Että kerran erotettu väri ei enää hajoa uusiksi väreiksi',
        'Että auringonvalo on vihreää',
      ],
      oikea: 2,
      fakta: 'Newton julkaisi valo-opin tuloksensa kirjana vasta 1704 '
        + 'teoksessa Opticks — lähes neljäkymmentä vuotta kokeiden jälkeen.',
    },
  },
  /*
   * 23. PHILADELPHIA, KESÄKUU 1752 — LEIJA UKKOSPILVEN ALLA.
   * Lähin kohdekaupunki New York 49 laudan yksikön päässä — oma merkki
   * kartalle. Philadelphialla ei ole kaupunkilehteä, joten sivu on
   * Yhdysvaltain maalehdessä. Paketissa on vain lähikuva (kuvaputki
   * toimitti yhden kuvan), ja testi sallii sen tälle hetkelle.
   * Lähde: en.wikipedia.org: Kite experiment, Benjamin Franklin
   */
  {
    id: 'franklin-leija-1752',
    otsikko: 'Philadelphia 1752 — kipinä avaimesta rystyseen',
    nimio: 'Franklin 1752',
    paivays: 'kesäkuu 1752',
    paikka: 'Philadelphia, Pennsylvania',
    iso: 'USA',
    lat: 39.9528, lon: -75.1636,
    kuvaversio: 4,
    teksti: 'Pilvi tulee Philadelphian yli kesäkuussa 1752, ja kaksi miestä '
      + 'odottaa sitä pellolla vajan suojassa. Benjamin Franklin on 46, ja '
      + 'hänen poikansa William hieman yli kaksikymmentä. Silkkileija nousee, '
      + 'sen kärjessä on teräväkärkinen lanka, ja hamppunaru kastuu sateessa. '
      + 'Naru johtaa varauksen alas; kuivan silkkinauhan ja avaimen kohdalla '
      + 'se pysähtyy. Franklin ei kerro leijakokeesta itse kuin lyhyesti '
      + 'Pennsylvania Gazette -lehdessä 19. lokakuuta 1752, ilman päivää tai '
      + 'paikkaa, ja tarkin kuvaus on Joseph Priestleyn vuonna 1767 '
      + 'kirjoittama. Sen mukaan naru alkoi pörhistää säikeitään, ja '
      + 'rystysestä avaimeen hyppäsi kipinä — ei salama, joka olisi '
      + 'tappanut. Ranskassa Thomas-François Dalibard oli jo toukokuussa '
      + 'kerännyt ukkosen sähköä Franklinin ohjeiden mukaan rautatangolla; '
      + 'Pietarissa Georg Wilhelm Richmann kuoli seuraavana vuonna '
      + 'yrittäessään samaa. Kokeesta kasvoi ukkosenjohdatin ja siitä '
      + 'Franklinin maine Euroopassa — sama maine, jolla hän myöhemmin '
      + 'neuvotteli Ranskan Amerikan siirtokuntien liittolaiseksi.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-franklin-leija-1752-lahi-photo-v4.jpg',
        kuvateksti: 'Franklin ei odota salaman osuvan leijaan; hän odottaa '
          + 'märkää narua pitkin kulkevan varauksen kokoontuvan avaimeen. '
          + 'William näkee pienen kipinän isän rystysellä — juuri tarpeeksi '
          + 'osoittamaan, että ukkospilven sähkö on samaa lajia kuin '
          + 'laboratoriossa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Smithsonian National Postal '
          + 'Museum — Benjamin Franklin\'s kite experiment, tarkistettu '
          + '5.9.2026.',
        url: 'https://postalmuseum.si.edu/benjamin-franklin-his-famous-kite-celebrate-anniversary',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'USA' },
    visa: {
      kysymys: 'Osuiko salama Franklinin leijaan?',
      vaihtoehdot: [
        'Osui, ja leija paloi',
        'Osui, mutta silkki eristi iskun',
        'Ei — leijaan kertyi pilven varausta, ja avaimesta lähti kipinä',
      ],
      oikea: 2,
    },
    lehtiJohdanto: 'Philadelphian pellolla nousi kesäkuussa 1752 silkkileija '
      + 'ukkospilven alle, ja narun päässä roikkuva avain kertoi, että '
      + 'salama on samaa sähköä kuin laboratorion kipinä.',
    lehtiTehtava: {
      kysymys: 'Kuka kirjoitti tarkimman kuvauksen Franklinin leijakokeesta?',
      vaihtoehdot: [
        'Franklin itse Pennsylvania Gazetteen',
        'William Franklin muistelmissaan',
        'Thomas-François Dalibard Pariisissa',
        'Joseph Priestley vuonna 1767',
      ],
      oikea: 3,
      fakta: 'Franklinin oma lehtikirjoitus lokakuulta 1752 ei kerro päivää '
        + 'eikä paikkaa; Priestley sai tiedot Franklinilta Lontoossa.',
    },
  },
  /*
   * 24. PARIISI, ARSENAALI 1780 — VAAKA JA MUISTIKIRJA.
   * Piste on Pariisin laatan päällä (1 laudan yksikkö) ja kohdekartan
   * rajauksessa (Arsenaali). Vain Pariisin kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Lavoisier 1780").
   * Lähde: en.wikipedia.org: Antoine Lavoisier, Marie-Anne Paulze
   * Lavoisier
   */
  {
    id: 'lavoisier-laboratorio-1780',
    otsikko: 'Arsenaali 1780 — mitään ei katoa, kaikki punnitaan',
    nimio: 'Lavoisier 1780',
    paivays: 'noin 1780',
    paikka: 'Arsenaali, Pariisi',
    iso: 'FRA',
    lat: 48.8503, lon: 2.3635,
    kuvaversio: 4,
    teksti: 'Vaaka on huoneen kallein esine, ja se on tarkempi kuin mikään, '
      + 'mitä Pariisin kello- tai kultasepät myyvät. Antoine Lavoisier on '
      + 'tilannut sen varta vasten, sillä koko hänen kemiansa lepää yhden '
      + 'vaatimuksen varassa: kaikki punnitaan ennen koetta ja sen jälkeen. '
      + 'Arsenaalin laboratoriossa, jossa hän on asunut ruutikomission '
      + 'jäsenenä vuodesta 1775, hän polttaa metalleja suljetuissa astioissa '
      + 'ja osoittaa, ettei mikään katoa eikä synny tyhjästä — palaminen on '
      + 'yhtymistä ilman osaan, jonka hän nimeää hapeksi. Vastapäätä istuu '
      + 'Marie-Anne Paulze Lavoisier, joka naitettiin hänelle '
      + 'kolmetoistavuotiaana vuonna 1771. Hän on oppinut englannin '
      + 'kääntääkseen Priestleyn ja Kirwanin kirjoitukset, ja Jacques-Louis '
      + 'Davidin oppilaana hän piirtää laitteet niin tarkasti, että muutkin '
      + 'voivat toistaa kokeet. Vuonna 1789 ilmestyy Traité élémentaire de '
      + 'chimie, ensimmäinen moderni kemian oppikirja, kolmellatoista '
      + 'Marie-Annen piirroksella. Viisi vuotta myöhemmin, 8. toukokuuta '
      + '1794, vallankumous mestaa veronkantajana rikastuneen Lavoisierin.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-lavoisier-laboratorio-1780-lahi-photo-v4.jpg',
        kuvateksti: 'Kun vaa\'an neula pysähtyy, Marie-Anne merkitsee luvun '
          + 'ennen seuraavaa vaihetta. Lavoisierien läpimurto ei synny '
          + 'näyttävästä reaktiosta vaan uskosta siihen, että aineet voidaan '
          + 'punnita ennen ja jälkeen — eikä kadonnut massa ole selitys.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Science History Institute — '
          + 'Lavoisier\'s instruments, tarkistettu 5.9.2026.',
        url: 'https://www.sciencehistory.org/stories/magazine/revolutionary-instruments-lavoisiers-tools-as-objets-dart/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-lavoisier-laboratorio-1780-kauko-photo-v4.jpg',
        kuvateksti: 'Marie-Anne ei ole vain tarkkailija: hän pitää '
          + 'koepäiväkirjoja, kuvaa laitteet mittakaavaan ja tekee työn '
          + 'ymmärrettäväksi muille. Antoine mittaa kaasuja, mutta heidän '
          + 'yhteinen laboratoriokielensä auttaa muuttamaan kemian '
          + 'alkemistisista arvoituksista tarkaksi tieteeksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Science History Institute — '
          + 'Lavoisier\'s instruments, tarkistettu 5.9.2026.',
        url: 'https://www.sciencehistory.org/stories/magazine/revolutionary-instruments-lavoisiers-tools-as-objets-dart/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (1 yksikkö) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Arsenaalin laboratoriossa aviopari punnitsi kaiken ennen '
      + 'koetta ja sen jälkeen — ja kemia lakkasi olemasta alkemiaa, '
      + 'vaikka vallankumous ei antanut sitä heille anteeksi.',
    lehtiTehtava: {
      kysymys: 'Mikä oli Marie-Anne Paulze Lavoisierin osuus kemian '
        + 'vallankumouksessa?',
      vaihtoehdot: [
        'Hän rahoitti laboratorion perintörahoillaan',
        'Hän keksi happi-sanan',
        'Hän käänsi englantilaiset tutkimukset ja piirsi laitteet',
        'Hän johti ruutikomissiota',
      ],
      oikea: 2,
      fakta: 'Traité élémentaire de chimie (1789) sisältää kolmetoista '
        + 'Marie-Annen piirrosta; Antoine mestattiin 8. toukokuuta 1794.',
    },
  },
  /*
   * 25. BERKELEY, GLOUCESTERSHIRE 14.5.1796 — NAARMU POJAN KÄSIVARTEEN.
   * Lähin kohdekaupunki Lontoo 79 laudan yksikön päässä — oma merkki
   * kartalle, sivu Britannian maalehdessä.
   * Lähde: en.wikipedia.org: Edward Jenner
   */
  {
    id: 'jenner-rokotus-1796',
    otsikko: 'Berkeley 1796 — lypsäjän rakkula ja puutarhurin poika',
    nimio: 'Jenner 1796',
    paivays: '14.5.1796',
    paikka: 'Berkeley, Gloucestershire, Englanti',
    iso: 'GBR',
    lat: 51.6910, lon: -2.4590,
    kuvaversio: 4,
    teksti: 'Kahdeksanvuotiaan pojan silmät kiertävät huonetta, kun lansetti '
      + 'lähestyy. James Phipps on Edward Jennerin puutarhurin poika, ja '
      + 'hänelle ei ole selitetty enempää kuin että lääkäri tekee pienen '
      + 'naarmun. Berkeleyn kylässä Gloucestershiressä on 14. toukokuuta '
      + '1796. Naarmuun Jenner hieroo nestettä, jonka hän on ottanut lypsäjä '
      + 'Sarah Nelmesin käden rakkuloista; Sarah sai lehmärokon '
      + 'Blossom-nimisestä lehmästä. Maalaislääkäri on kuullut vuosia '
      + 'lypsäjien uskomuksen: lehmärokon sairastanut ei saa isorokkoa, '
      + 'tautia, joka tappaa suuren osan sairastuneista ja arpeuttaa loput. '
      + 'Poika saa kuumetta ja on muutaman päivän levoton, sitten hän '
      + 'tervehtyy. Heinäkuun ensimmäisenä päivänä Jenner tekee vaarallisen '
      + 'osan: hän istuttaa Jamesiin oikeaa isorokkoa. Tautia ei tule. '
      + 'Jenner nimeää menetelmän lehmän mukaan — vacca, rokotus — ja '
      + 'julkaisee sen 1798. Lähes kaksi vuosisataa myöhemmin, vuonna 1980, '
      + 'Maailman terveysjärjestö julistaa isorokon hävitetyksi; se on ainoa '
      + 'ihmisen tauti, jolle on käynyt niin.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-jenner-rokotus-1796-lahi-photo-v4.jpg',
        kuvateksti: 'Kahdeksanvuotias James Phipps yrittää pitää käsivartensa '
          + 'liikkumatta, kun Jenner tekee siihen pienen naarmun. Poika ei '
          + 'voi antaa nykyisen kaltaista tietoon perustuvaa suostumusta; '
          + 'heinäkuussa häntä odottaa vielä tarkoituksellinen '
          + 'isorokkoaltistus, jolla lääkäri koettelee vaarallista '
          + 'ajatustaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Dr Jenner\'s House — Phipps '
          + 'Cottage, tarkistettu 5.9.2026.',
        url: 'https://jennermuseum.com/phipps-cottage',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-jenner-rokotus-1796-kauko-photo-v4.jpg',
        kuvateksti: 'Puutarhuri Christopher Phipps seisoo poikansa takana, ja '
          + 'Sarah Nelmesin kädestä saatu lehmänrokkoaine odottaa pöydällä. '
          + 'Toukokuun 1796 hiljainen huone on samalla lääketieteellinen '
          + 'läpimurto ja muistutus siitä, kuinka usein historian edistys on '
          + 'nojannut niihin, joilla oli vähiten valtaa kieltäytyä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Dr Jenner\'s House — Phipps '
          + 'Cottage, tarkistettu 5.9.2026.',
        url: 'https://jennermuseum.com/phipps-cottage',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'GBR' },
    visa: {
      kysymys: 'Mistä Jenner otti aineen, jonka hän hieroi James Phippsin naarmuun?',
      vaihtoehdot: [
        'Lypsäjä Sarah Nelmesin lehmärokkorakkuloista',
        'Isorokkopotilaan rupista',
        'Blossom-lehmän maidosta',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Gloucestershiren maalaislääkäri otti toukokuussa 1796 '
      + 'lypsäjän kädestä lehmärokkoa ja hieroi sen puutarhurinsa '
      + 'kahdeksanvuotiaan pojan käsivarteen — ja rokotus sai nimensä '
      + 'lehmästä.',
    lehtiTehtava: {
      kysymys: 'Mitä Jenner teki James Phippsille 1. heinäkuuta 1796?',
      vaihtoehdot: [
        'Antoi toisen lehmärokkoannoksen',
        'Lähetti hänet Lontooseen tutkittavaksi',
        'Rokotti hänen sisaruksensa',
        'Altisti hänet tahallaan oikealle isorokolle',
      ],
      oikea: 3,
      fakta: 'Tautia ei tullut. Isorokko julistettiin hävitetyksi 1980 — '
        + 'ainoana ihmisen tautina.',
    },
  },
  /*
   * 26. LONTOO, ROYAL INSTITUTION 29.8.1831 — NEULA VÄRÄHTÄÄ.
   * Piste on Lontoon laatan päällä (0,9 laudan yksikköä) ja kohdekartan
   * rajauksessa (Albemarle Street). Vain Lontoon kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Faraday 1831").
   * Lähde: en.wikipedia.org: Michael Faraday, Electromagnetic induction
   */
  {
    id: 'faraday-luento-1831',
    otsikko: 'Royal Institution 1831 — muutos synnyttää sähköä',
    nimio: 'Faraday 1831',
    paivays: '29.8.1831',
    paikka: 'Royal Institution, Lontoo',
    iso: 'GBR',
    lat: 51.5098, lon: -0.1425,
    kuvaversio: 4,
    teksti: 'Mitään ei kuulu, ja juuri se hämää. Michael Faraday on kytkenyt '
      + 'pariston toiseen käämiin ja odottaa, että toisessa käämissä, '
      + 'rautarenkaan vastakkaisella puolella, syntyisi pysyvä virta. Ei '
      + 'synny. Galvanometrin neula värähtää vain sillä hetkellä, kun virta '
      + 'kytketään, ja uudelleen kun se katkaistaan; siinä välissä se lepää '
      + 'nollassa. Royal Institutionin kellarilaboratoriossa on 29. elokuuta '
      + '1831, ja 39-vuotias entinen kirjansitojan oppipoika on juuri '
      + 'nähnyt, että muutos — ei magneetti sinänsä — synnyttää sähköä. '
      + 'Kymmenen vuotta aiemmin hän oli pannut virtajohtimen kiertämään '
      + 'magneettia, ensimmäisen sähkömoottorin, ja sen jälkeen häntä oli '
      + 'syytetty tulosten varastamisesta ja työnnetty kemian töihin. Nyt '
      + 'hän toistaa kokeen viikkoja: magneettitanko työnnetään kelaan, '
      + 'neula heilahtaa; vedetään ulos, neula heilahtaa toiseen suuntaan. '
      + 'Lokakuussa hän pyörittää kuparikiekkoa magneetin napojen välissä ja '
      + 'saa tasaista virtaa, ensimmäisen generaattorin. Faraday ei osaa '
      + 'matematiikkaa juuri lainkaan; hänen kenttäviivansa muuttaa James '
      + 'Clerk Maxwell yhtälöiksi vasta 1860-luvulla.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-faraday-luento-1831-lahi-photo-v4.jpg',
        kuvateksti: 'Galvanometrin neula nytkähtää vain silloin, kun Faraday '
          + 'kytkee tai katkaisee virran ensimmäisestä käämistä. Hän on '
          + 'etsinyt vuosia tapaa tehdä magnetismista sähköä; ratkaisu '
          + 'ilmoittaa itsestään silmänräpäyksenä, jonka voisi helposti '
          + 'jättää huomaamatta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Royal Institution — '
          + 'Faraday\'s ring-coil apparatus, tarkistettu 5.9.2026.',
        url: 'https://www.rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-faraday-luento-1831-kauko-photo-v4.jpg',
        kuvateksti: 'Avustajan on ehdittävä merkitä neulan lyhyt liike, ennen '
          + 'kuin se palaa nollaan. Faradayn rautarengas on vain 17 '
          + 'senttimetriä leveä, mutta sen kahden käämin välinen hetkellinen '
          + 'virta avaa periaatteen, jolla muuntajat ja sähköverkot myöhemmin '
          + 'toimivat.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Royal Institution — '
          + 'Faraday\'s ring-coil apparatus, tarkistettu 5.9.2026.',
        url: 'https://www.rigb.org/explore-science/explore/collection/michael-faradays-ring-coil-apparatus',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lontoon laatan päällä (0,9 yksikköä) ja '
      + 'Lontoon kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Lontoon '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lontoo' },
    lehtiJohdanto: 'Albemarle Streetin kellarissa entinen kirjansitojan '
      + 'oppipoika näki elokuussa 1831 neulan värähtävän vain hetken — ja '
      + 'siitä hetkestä kasvoivat generaattori, muuntaja ja sähköverkko.',
    lehtiTehtava: {
      kysymys: 'Milloin galvanometrin neula liikkui Faradayn rengaskokeessa?',
      vaihtoehdot: [
        'Koko ajan, kun virta kulki ensimmäisessä käämissä',
        'Vain kun virta kytkettiin tai katkaistiin',
        'Vasta kun rengas kuumeni',
        'Ei koskaan — koe epäonnistui',
      ],
      oikea: 1,
      fakta: 'Lokakuussa 1831 Faraday pyöritti kuparikiekkoa magneetin '
        + 'välissä ja sai tasaista virtaa: ensimmäisen generaattorin.',
    },
  },
  /*
   * 27. PARIISI, ÉCOLE NORMALE SUPÉRIEURE 1862 — JOUTSENKAULAPULLOT.
   * Piste on Pariisin laatan päällä (0,4 laudan yksikköä) ja kohdekartan
   * rajauksessa (rue d'Ulm). Vain Pariisin kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Pasteur 1862").
   * Lähde: en.wikipedia.org: Louis Pasteur
   */
  {
    id: 'pasteur-pullot-1862',
    otsikko: 'Rue d\'Ulm 1862 — liemi, joka pysyy kirkkaana',
    nimio: 'Pasteur 1862',
    paivays: '1862',
    paikka: 'École normale supérieure, Pariisi',
    iso: 'FRA',
    lat: 48.8419, lon: 2.3444,
    kuvaversio: 4,
    teksti: 'Kalenterissa on kulunut jo viikkoja, ja pullo on yhä kirkas. '
      + 'Louis Pasteur nostaa sen valoa vasten École normale supérieuren '
      + 'laboratoriossa rue d\'Ulmilla: keitetty lihaliemi, jonka '
      + 'joutsenkaulan muotoinen lasikaula päästää ilman sisään mutta '
      + 'pysäyttää pölyn mutkaansa. Naapuripullo, jonka kaulan hän katkaisi, '
      + 'on sameana ja haisee. Kysymys, jota Pasteur ratkoo, on vanha ja '
      + 'kiihkeä: syntyykö elämä itsestään mätänevästä aineesta? Rouenin '
      + 'museonjohtaja Félix Pouchet vakuuttaa, että ilma itsessään riittää '
      + 'synnyttämään sen. Tiedeakatemia on luvannut 2 500 frangin '
      + 'Alhumbert-palkinnon sille, joka ratkaisee kiistan kokeellisesti. '
      + 'Pasteur vie pullojaan vuorille ja avaa niitä ohuessa ilmassa, jossa '
      + 'pölyä on vähemmän: useimmat pysyvät kirkkaina. Palkinto myönnetään '
      + 'hänelle 1862. Samaan aikaan hän on osoittanut, että käyminen on '
      + 'elävien mikrobien työtä, ja vuonna 1865 hän patentoi viinin '
      + 'kuumennuksen, jota nyt kutsutaan pastöroinniksi. Ajatus, että '
      + 'näkymätön elämä tulee ulkoa eikä synny itsestään, muuttaa '
      + 'myöhemmin kirurgian ja rokotukset.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-pasteur-pullot-1862-lahi-photo-v4.jpg',
        kuvateksti: 'Ehjässä joutsenkaulapullossa liemi pysyy kirkkaana, '
          + 'vaikka ilma pääsee sisään; katkaistussa se samenee. Pasteur ei '
          + 'näe mikrobeja paljain silmin, mutta pölyviiva lasin mutkassa '
          + 'kertoo, mistä elämä liemeen tulee.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Institut Pasteur — The '
          + 'middle years 1862–1877, tarkistettu 5.9.2026.',
        url: 'https://www.pasteur.fr/en/about-us/middle-years-1862-1877',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-pasteur-pullot-1862-kauko-photo-v4.jpg',
        kuvateksti: 'Nuori avustaja on kirjoittanut samoihin pulloihin '
          + 'päivämääriä viikkojen ajan ja odottanut muutosta, jota ei tule. '
          + 'Juuri odottaminen tekee kokeesta vakuuttavan: keitetty liemi ei '
          + 'synnytä elämää itsestään, ellei ilman pöly pääse siihen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Institut Pasteur — The '
          + 'middle years 1862–1877, tarkistettu 5.9.2026.',
        url: 'https://www.pasteur.fr/en/about-us/middle-years-1862-1877',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (0,4 yksikköä) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Rue d\'Ulmin laboratoriossa rivi keitettyjä liemipulloja '
      + 'odotti viikkoja samenemista, joka ei tullut — ja vanha usko '
      + 'itsestään syntyvään elämään menetti palkintokilpailun.',
    lehtiTehtava: {
      kysymys: 'Miksi joutsenkaulapullon liemi pysyi kirkkaana, vaikka ilma '
        + 'pääsi sisään?',
      vaihtoehdot: [
        'Lasin mutka pysäytti ilman mukana kulkevan pölyn ja mikrobit',
        'Liemi oli suolattu',
        'Pullo oli tiiviisti suljettu',
        'Ilma ei ollut vielä keksitty koeaineeksi',
      ],
      oikea: 0,
      fakta: 'Tiedeakatemian 2 500 frangin Alhumbert-palkinto myönnettiin '
        + 'Pasteurille 1862; viinin kuumennuksen hän patentoi 1865.',
    },
  },
  /*
   * 28. PIETARI, YLIOPISTO 6.3.1869 — AUKOT TAULUKOSSA.
   * Piste on Pietarin laatan päällä (0,2 laudan yksikköä) ja kohdekartan
   * rajauksessa (Vasilinsaari). Vain Pietarin kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Mendelejev 1869").
   * Lähde: en.wikipedia.org: Dmitri Mendeleev, Periodic table
   */
  {
    id: 'mendelejev-kortit-1869',
    otsikko: 'Pietari 1869 — tyhjät paikat, joihin uskalletaan luottaa',
    nimio: 'Mendelejev 1869',
    paivays: '6.3.1869',
    paikka: 'Pietarin yliopisto, Venäjä',
    iso: 'RUS',
    lat: 59.9420, lon: 30.2990,
    kuvaversio: 4,
    teksti: 'Paperilapulla lukee alkuaineen nimi, atomipaino ja muutama '
      + 'ominaisuus, ja pöydällä on kuusikymmentäkolme sellaista lappua. '
      + 'Dmitri Mendelejev, 35, kirjoittaa Pietarin yliopistossa kemian '
      + 'oppikirjaa ja tarvitsee järjestyksen, jossa alkuaineet voisi '
      + 'esittää opiskelijoille. Hän lajittelee niitä painon mukaan ja '
      + 'huomaa, että ominaisuudet toistuvat säännöllisin välein. Myöhemmin '
      + 'hän kertoo nähneensä valmiin taulukon unessa ja kirjoittaneensa sen '
      + 'herättyään paperille; arkistossa on kuitenkin luonnoksia, joissa '
      + 'rivejä on siirretty ja yliviivattu. Taulukko painetaan ja '
      + 'lähetetään kemisteille, ja 6. maaliskuuta 1869 Venäjän kemian seura '
      + 'kuulee esitelmän alkuaineiden ominaisuuksien riippuvuudesta '
      + 'atomipainosta. Rohkeinta ovat aukot: Mendelejev jättää tyhjiä '
      + 'paikkoja ja ennustaa niihin alkuaineet, joita kukaan ei ole nähnyt, '
      + 'painoineen ja tiheyksineen. Gallium löytyy 1875, skandium 1879 ja '
      + 'germanium 1886, ja ne sopivat aukkoihin. Saksalainen Lothar Meyer '
      + 'julkaisee lähes saman taulukon muutamaa kuukautta myöhemmin — '
      + 'mutta ilman ennusteita.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-mendelejev-kortit-1869-lahi-photo-v4.jpg',
        kuvateksti: 'Mendelejev siirtää yhtä merkintää ja jättää viereen tyhjän '
          + 'paikan — ei siksi, että työ olisi kesken, vaan koska '
          + 'järjestyksen pitäisi ennustaa vielä tuntematon alkuaine. Rohkein '
          + 'osa vuoden 1869 taulukossa ovatkin aukot, joihin hän uskaltaa '
          + 'luottaa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: American Chemical Society — '
          + 'Assembling the periodic table, tarkistettu 5.9.2026.',
        url: 'https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-mendelejev-kortit-1869-kauko-photo-v4.jpg',
        kuvateksti: 'Tunnettu kertomus alkuainepasianssista on todennäköisesti '
          + 'myöhempi legenda; arkistoon jäivät yliviivatut ryhmittelyt ja '
          + 'jatkuvasti korjatut luonnokset. Kuvan nuori painoapulainen '
          + 'odottaa viimeistä versiota, kun 35-vuotias Mendelejev päättää '
          + 'lähettää 200 painosta kollegoilleen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: American Chemical Society — '
          + 'Assembling the periodic table, tarkistettu 5.9.2026.',
        url: 'https://inchemistry.acs.org/atomic-news/assembling-the-periodic-table.html',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pietarin laatan päällä (0,2 yksikköä) ja '
      + 'Pietarin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pietarin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pietari' },
    lehtiJohdanto: 'Vasilinsaaren yliopistossa kemian professori järjesti '
      + 'keväällä 1869 kuusikymmentäkolme alkuainetta painon mukaan ja '
      + 'jätti taulukkoon aukkoja aineille, joita kukaan ei ollut nähnyt.',
    lehtiTehtava: {
      kysymys: 'Mikä teki Mendelejevin taulukosta rohkeamman kuin '
        + 'kilpailijoiden?',
      vaihtoehdot: [
        'Se oli painettu värillisenä',
        'Se sisälsi myös jalokaasut',
        'Siinä oli tyhjiä paikkoja ja ennusteet niihin sopivista aineista',
        'Se järjesti aineet aakkosjärjestykseen',
      ],
      oikea: 2,
      fakta: 'Gallium (1875), skandium (1879) ja germanium (1886) löytyivät '
        + 'ja sopivat Mendelejevin jättämiin aukkoihin.',
    },
  },
  /*
   * 29. MENLO PARK, NEW JERSEY 22.10.1879 — LANKA PALAA KOLMETOISTA TUNTIA.
   * Lähin kohdekaupunki New York 14 laudan yksikön päässä (yli
   * kaupunkikaton säteen) ja New Yorkin kohdekartan ulkopuolella — oma
   * merkki kartalle ilman lippua. Sivu Yhdysvaltain maalehdessä.
   * Lähde: en.wikipedia.org: Thomas Edison, Incandescent light bulb
   */
  {
    id: 'edison-lamppu-1879',
    otsikko: 'Menlo Park 1879 — kolmetoista ja puoli tuntia valoa',
    nimio: 'Edison 1879',
    paivays: '22.10.1879',
    paikka: 'Menlo Park, New Jersey',
    iso: 'USA',
    lat: 40.5650, lon: -74.3375,
    kuvaversio: 4,
    teksti: 'Kello on jo pitkällä yössä, ja lasikuvun sisällä hehkuu '
      + 'ompelulangan pätkä. Menlo Parkin laboratoriossa New Jerseyssä on '
      + '22. lokakuuta 1879. Thomas Edison, 32, on kokeillut hehkulangaksi '
      + 'platinaa, pahvia ja monenlaista kasvikuitua, ja ne kaikki palavat '
      + 'hetkessä poikki. Nyt hiilletty puuvillalanka hehkuu hapettomassa '
      + 'lasissa tunnin, toisen, ja Charles Batchelor kirjaa jokaisen tunnin '
      + 'vihkoon. Lamppu sammuu vasta kolmentoista ja puolen tunnin jälkeen. '
      + 'Hehkulamppu ei ole Edisonin keksintö — englantilainen Joseph Swan on '
      + 'tehnyt omansa — mutta Edisonin lamppu on ensimmäinen, jossa lanka, '
      + 'korkea tyhjiö ja suuri vastus toimivat yhdessä ja jonka ympärille '
      + 'voi rakentaa koko sähköjärjestelmän. Patenttihakemus jätetään 4. '
      + 'marraskuuta. Talven mittaan laboratorion ympärille vedetään johtoja '
      + 'ja lamppuja, ja helmikuuhun 1880 mennessä katsojia saapuu junalla '
      + 'katsomaan valojen kylää. Vasta seuraavana vuonna löytyy lanka, joka '
      + 'kestää yli 1 200 tuntia: hiilletty japanilainen bambu. Patentissa '
      + 'on Edisonin nimi, mutta yön valvoi kokonainen työryhmä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-edison-lamppu-1879-lahi-photo-v4.jpg',
        kuvateksti: 'Charles Batchelor merkitsee vihkoon uuden tunnin, ja '
          + 'Edison uskaltaa viimein nojata lähemmäs haurasta lasia. Hiilletty '
          + 'ompelulanka palaa lopulta 13,5 tuntia — tarpeeksi kauan, että '
          + 'työryhmä voi uskoa löytäneensä muutakin kuin uuden lyhyen '
          + 'välähdyksen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: U.S. National Park Service — '
          + 'Edison biography, tarkistettu 5.9.2026.',
        url: 'https://home.nps.gov/edis/learn/historyculture/edison-biography.htm',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-edison-lamppu-1879-kauko-photo-v4.jpg',
        kuvateksti: 'Menlo Parkin valo syntyy monen käsissä: Ludwig Boehm '
          + 'puhaltaa lasin, John Kruesi tekee läpiviennit ja Batchelor '
          + 'käsittelee hiuksenohutta hiililankaa. Edison johtaa koetta, mutta '
          + 'yön valvoneelle työryhmälle onnistuminen on yhteinen, uupunut '
          + 'helpotus.',
        lahde: 'Matkakirjan havainnekuva. Faktat: U.S. National Park Service — '
          + 'Edison biography, tarkistettu 5.9.2026.',
        url: 'https://home.nps.gov/edis/learn/historyculture/edison-biography.htm',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'USA' },
    visa: {
      kysymys: 'Mistä Edisonin 22. lokakuuta 1879 testaama hehkulanka oli tehty?',
      vaihtoehdot: [
        'Platinasta',
        'Hiilletystä puuvillalangasta',
        'Volframista',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'New Jerseyn maalaislaboratoriossa hiilletty ompelulanka '
      + 'hehkui lokakuussa 1879 kolmetoista ja puoli tuntia — ja sen '
      + 'ympärille rakennettiin kokonainen sähköjärjestelmä.',
    lehtiTehtava: {
      kysymys: 'Mikä hehkulanka kesti Edisonin kokeissa yli 1 200 tuntia?',
      vaihtoehdot: [
        'Hiilletty japanilainen bambu',
        'Hiilletty puuvillalanka',
        'Platinalanka',
        'Hamppukuitu',
      ],
      oikea: 0,
      fakta: 'Bambulanka löytyi vasta 1880; englantilainen Joseph Swan oli '
        + 'tehnyt oman hehkulamppunsa jo ennen Edisonia.',
    },
  },
  /*
   * 30. LONTOO, ST MARY'S 3.9.1928 — HOMEPILKKU MALJASSA.
   * Piste on Lontoon laatan päällä (2 laudan yksikköä) ja kohdekartan
   * rajauksen länsireunassa (Praed Street, Paddington). Vain Lontoon
   * kaupunkilehdessä ja sen kohdekartalla (js/packs/maakartat.js
   * "Fleming 1928").
   * Lähde: en.wikipedia.org: Alexander Fleming, Penicillin
   */
  {
    id: 'fleming-malja-1928',
    otsikko: 'St Mary\'s 1928 — malja, jota ei heitetty pois',
    nimio: 'Fleming 1928',
    paivays: '3.9.1928',
    paikka: 'St Mary\'s Hospital, Paddington, Lontoo',
    iso: 'GBR',
    lat: 51.5174, lon: -0.1720,
    kuvaversio: 4,
    teksti: '”Sepä hassua”, Alexander Fleming sanoo, ja se on koko juhla. St '
      + 'Mary\'sin sairaalan bakteriologian laboratoriossa Paddingtonissa on '
      + '3. syyskuuta 1928, ja Fleming on juuri palannut perheensä kanssa '
      + 'vietetyltä lomalta. Ennen lähtöään hän jätti stafylokokkiviljelmiä '
      + 'maljoille penkin nurkkaan, ja nyt hän käy niitä läpi heittääkseen '
      + 'ne pois. Yhdessä maljassa kasvaa homepilkku, ja sen ympärillä '
      + 'bakteerit ovat kuolleet. Fleming näyttää maljan entiselle '
      + 'apulaiselleen Merlin Prycelle, joka muistuttaa: juuri niin sinä '
      + 'löysit lysotsyyminkin. Homeen hän tunnistaa Penicillium-sukuun, ja '
      + 'seuraavat kuukaudet hän kutsuu sen erittämää ainetta homemehuksi, '
      + 'kunnes antaa sille 7. maaliskuuta 1929 nimen penisilliini. Hän '
      + 'osoittaa, että se tappaa monia bakteereja ja on vaaraton eläimille, '
      + 'mutta aineen puhdistaminen ja säilyttäminen ei onnistu hänen '
      + 'keinoillaan. Vasta Howard Floreyn ja Ernst Chainin ryhmä Oxfordissa '
      + 'tekee siitä lääkkeen 1940-luvun alussa, ja kolmikko jakaa '
      + 'lääketieteen Nobelin 1945.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-fleming-malja-1928-lahi-photo-v4.jpg',
        kuvateksti: 'Fleming on vähällä siirtää sotkuisen viljelymaljan '
          + 'syrjään, kun homepesäkkeen ympärillä oleva kirkas kehä pysäyttää '
          + 'hänet. Kukaan ei hurraa: hänen edessään ei ole vielä lääke vaan '
          + 'outo paikka, jossa stafylokokit eivät kasva.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Imperial College London — '
          + 'Facing Infection Together, tarkistettu 5.9.2026.',
        url: 'https://www.imperial.ac.uk/media/imperial-college/giving/public/Facing-Infection-Together_Institute-of-Infection.pdf',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-fleming-malja-1928-kauko-photo-v4.jpg',
        kuvateksti: 'St Mary\'sin epäjärjestys auttaa sattumaa, mutta havainnon '
          + 'ymmärtäminen vaatii Flemingin pysähtymään sen ääreen. Hän osaa '
          + 'osoittaa homeen tuhoavan bakteereita, muttei tehdä siitä vakaata '
          + 'hoitoa; vasta Floreyn ja Chainin myöhempi työryhmä muuttaa '
          + 'pienen kehän penisilliiniksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Imperial College London — '
          + 'Facing Infection Together, tarkistettu 5.9.2026.',
        url: 'https://www.imperial.ac.uk/media/imperial-college/giving/public/Facing-Infection-Together_Institute-of-Infection.pdf',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lontoon laatan päällä (2 yksikköä) ja '
      + 'Lontoon kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Lontoon '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lontoo' },
    lehtiJohdanto: 'Paddingtonin sairaalan sotkuisessa laboratoriossa yksi '
      + 'homeinen viljelymalja jäi syyskuussa 1928 heittämättä pois — ja '
      + 'siitä alkoi antibioottien aika, vaikka lääkkeeksi asti kului '
      + 'toistakymmentä vuotta.',
    lehtiTehtava: {
      kysymys: 'Miksi Fleming ei itse saanut penisilliinistä lääkettä?',
      vaihtoehdot: [
        'Hän ei uskonut aineen tehoavan ihmisiin',
        'Sairaala kielsi jatkotutkimukset',
        'Hän ei saanut ainetta puhdistettua ja säilymään',
        'Hän myi keksinnön amerikkalaiselle yhtiölle',
      ],
      oikea: 2,
      fakta: 'Howard Floreyn ja Ernst Chainin ryhmä Oxfordissa teki '
        + 'penisilliinistä lääkkeen; kolmikko jakoi Nobelin 1945.',
    },
  },
  /*
   * 31. MAINZ 1454 — RAAMATTU PAINOSSA.
   * Lähin kohdekaupunki Alppien laatta 105 laudan yksikön päässä — oma
   * merkki kartalle. Mainzilla ei ole kaupunkilehteä, joten sivu on
   * Saksan maalehdessä.
   * Lähde: en.wikipedia.org: Johannes Gutenberg, Gutenberg Bible
   */
  {
    id: 'gutenberg-paino-1454',
    otsikko: 'Mainz 1454 — sivu syntyy metallista',
    nimio: 'Gutenberg 1454',
    paivays: '1454',
    paikka: 'Mainz, Pyhä saksalais-roomalainen keisarikunta',
    iso: 'DEU',
    lat: 49.9994, lon: 8.2736,
    kuvaversio: 4,
    teksti: 'Sormenpäät ovat mustat ja pysyvät sellaisina. Latoja poimii '
      + 'kirjasimen kerrallaan lokerikosta ja asettaa sen riville nurinpäin '
      + 'ja peilikuvana; sivu on valmis vasta, kun rivejä on '
      + 'neljäkymmentäkaksi ja jokainen niistä yhtä leveä. Mainzin '
      + 'Humbrechthofissa painetaan latinankielistä Raamattua, ja työtä on '
      + 'tehty vuodesta 1452. Johannes Gutenberg on lainannut siihen '
      + 'rahanlainaaja Johann Fustilta kahdesti 800 guldenia, ja hänen '
      + 'pajassaan on jo painettu kirkolle tuhansia anekirjeitä. Kostutettu '
      + 'paperi painetaan viinipuristimesta muokatussa ruuviprässissä, ja '
      + 'yhden sivun latomiseen kuluu ehkä puoli päivää. Maaliskuussa 1455 '
      + 'tuleva paavi Pius II kirjoittaa nähneensä Frankfurtissa valmiita '
      + 'arkkeja ja ostajien jo varanneen kappaleensa. Painos on noin 180 '
      + 'kappaletta, neljännes pergamentille. Gutenberg ei ehdi nauttia '
      + 'siitä: Fust haastaa hänet oikeuteen 1455 ja saa pajan haltuunsa, '
      + 'ja ensimmäisen kirjan, jossa painajan nimi ja vuosi on merkitty, '
      + 'julkaisevat Fust ja Peter Schöffer 1457. Keksijä kuolee 1468 '
      + 'arkkipiispan eläkkeellä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-gutenberg-paino-1454-lahi-photo-v4.jpg',
        kuvateksti: 'Latoja-apulainen nostaa yhden käänteisen kirjaimen '
          + 'kerrallaan ja tietää, että virhe voi pakottaa avaamaan koko '
          + 'ladelman. Hänen sormiinsa jäävä muste on osa uutta käsityötä, '
          + 'jossa Raamatun sivu syntyy metallista — mutta värilliset '
          + 'alkukirjaimet lisätään yhä myöhemmin käsin.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Gutenberg-Museum Mainz — '
          + 'Gutenberg Bibles, tarkistettu 5.9.2026.',
        url: 'https://www.mainz.de/en/microsite/gutenberg-museum/Forschung_Sammlung_/Gutenberg_Bibeln',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-gutenberg-paino-1454-kauko-photo-v4.jpg',
        kuvateksti: 'Gutenbergin Raamattu ei synny yhdestä nerokkaasta '
          + 'painalluksesta: kostea paperi, mustepallot, ruuviprässi ja '
          + 'kuivuvat arkit kulkevat monen työntekijän käsien kautta vuosien '
          + 'ajan. Noin 180 kappaleen painos on valtava lupaus siitä, että '
          + 'sama teksti voidaan valmistaa yhä uudelleen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Gutenberg-Museum Mainz — '
          + 'Gutenberg Bibles, tarkistettu 5.9.2026.',
        url: 'https://www.mainz.de/en/microsite/gutenberg-museum/Forschung_Sammlung_/Gutenberg_Bibeln',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'DEU' },
    visa: {
      kysymys: 'Kuka sai Gutenbergin painopajan haltuunsa oikeudenkäynnin jälkeen 1455?',
      vaihtoehdot: [
        'Mainzin arkkipiispa',
        'Rahanlainaaja Johann Fust',
        'Tuleva paavi Pius II',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Reinin rannan kauppakaupungissa latojat asettivat '
      + '1450-luvulla kirjaimen kerrallaan peilikuvaksi riveille, ja '
      + 'ensimmäinen painettu Raamattu syntyi — velaksi, jonka rahoittaja '
      + 'peri pajan mukana.',
    lehtiTehtava: {
      kysymys: 'Montako kappaletta Gutenbergin Raamattua arvioidaan '
        + 'painetun?',
      vaihtoehdot: [
        'Noin kaksikymmentä',
        'Noin 180',
        'Noin tuhat',
        'Noin kymmenentuhatta',
      ],
      oikea: 1,
      fakta: 'Neljännes painoksesta tehtiin pergamentille; kappaleita on '
        + 'säilynyt 49, niistä 21 täydellisinä.',
    },
  },
  /*
   * 32. PARIISI, ELOKUU 1888 — TOINEN KERROS KOOSSA.
   * Piste on Pariisin laatan päällä (1,4 laudan yksikköä) ja kohdekartan
   * rajauksessa (Champ de Mars; sama piste kuin kohde "Eiffel-torni").
   * Vain Pariisin kaupunkilehdessä ja sen kohdekartalla
   * (js/packs/maakartat.js "Torni 1888").
   * Lähde: en.wikipedia.org: Eiffel Tower
   */
  {
    id: 'eiffel-torni-1888',
    otsikko: 'Champ de Mars 1888 — niitti kerrallaan taivaalle',
    nimio: 'Torni 1888',
    paivays: 'elokuu 1888',
    paikka: 'Champ de Mars, Pariisi',
    iso: 'FRA',
    lat: 48.8582, lon: 2.2945,
    kuvaversio: 4,
    teksti: 'Tuuli tuntuu 115 metrin korkeudessa aivan toiselta kuin maassa, '
      + 'ja niittaajan on osattava seistä siinä koko päivä. Elokuussa 1888 '
      + 'Eiffel-tornin toinen kerros on saatu koottua, ja rautaristikko '
      + 'jatkuu yläpuolella tyhjään. Työ on toistoa: pajassa kuumennettu '
      + 'niitti lennätetään pihdeillä, painetaan reikään, ja kaksi miestä '
      + 'takoo sen kannan kiinni ennen kuin se jäähtyy. Niittejä tulee '
      + 'tornin valmistuessa 2,5 miljoonaa. Yhtään reikää ei porata paikan '
      + 'päällä: jokainen 18 038 osasta on piirretty Levallois-Perret\'n '
      + 'konepajalla kymmenesosamillin tarkkuudella, ja jos osa ei sovi, se '
      + 'lähetetään takaisin. Rakentajia on kolmisensataa, ja työn aikana '
      + 'kuolee yksi. Suunnittelijat ovat Gustave Eiffelin insinöörit '
      + 'Maurice Koechlin ja Émile Nouguier; Eiffel osti heidän '
      + 'patenttinsa. Pariisin taiteilijat, Maupassant ja Garnier mukana, '
      + 'ovat vastustaneet tornia julkisella vetoomuksella, ja sen luvattiin '
      + 'seisovan vain kaksikymmentä vuotta. Torni valmistuu 31. maaliskuuta '
      + '1889 maailmannäyttelyyn — ja jää, koska sen huipulle sopii '
      + 'radioantenni.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-eiffel-torni-1888-lahi-photo-v4.jpg',
        kuvateksti: 'Kuuma niitti ehtii jäähtyä nopeasti, joten neljän miehen '
          + 'työketju ei saa katketa: yksi lämmittää, toinen pitää '
          + 'paikoillaan, kolmas muotoilee kannan ja neljäs lyö liitoksen '
          + 'kiinni. Korkealla ei ole suojakaiteita; jokainen vasaranisku '
          + 'riippuu siitä, että työtoveri tekee oman osuutensa oikein.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Eiffel Tower official site — '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://www.toureiffel.paris/en/the-monument/history',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-eiffel-torni-1888-kauko-photo-v4.jpg',
        kuvateksti: 'Elokuussa 1888 toinen taso on viimein koossa, mutta torni '
          + 'jatkuu vielä avonaisena rautaristikkona taivaalle. Alhaalla '
          + 'hevoskuormat tuovat Levallois’ssa millintarkasti esivalmistettuja '
          + 'osia, ylhäällä höyrynosturi kiipeää rakenteen mukana — ja 150–300 '
          + 'työntekijää muuttaa 18 038 piirustettua kappaletta yhdeksi '
          + 'torniksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Eiffel Tower official site — '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://www.toureiffel.paris/en/the-monument/history',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (1,4 yksikköä) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Champ de Marsilla niittaajat seisoivat kesällä 1888 yli '
      + 'sadan metrin korkeudessa ilman kaiteita ja takoivat kuumia '
      + 'niittejä rautaan, jonka piti seisoa vain kaksikymmentä vuotta.',
    lehtiTehtava: {
      kysymys: 'Miksi Eiffel-tornin osiin ei porattu yhtään reikää '
        + 'työmaalla?',
      vaihtoehdot: [
        'Porat eivät toimineet korkeudessa',
        'Torni koottiin pulteilla ilman reikiä',
        'Reiät porattiin vasta valmistumisen jälkeen',
        'Osat oli valmistettu konepajalla niin tarkasti, että sopimaton osa '
          + 'lähetettiin takaisin',
      ],
      oikea: 3,
      fakta: 'Tornissa on 18 038 osaa ja 2,5 miljoonaa niittiä; se valmistui '
        + '31. maaliskuuta 1889 maailmannäyttelyyn.',
    },
  },
  /*
   * 33. ROTHERHITHE, TOUKOKUU 1827 — KILPI THAMESIN ALLA.
   * Piste on Lontoon laatan päällä (2 laudan yksikköä) ja kohdekartan
   * rajauksessa (Rotherhithen kuilu). Vain Lontoon kaupunkilehdessä ja
   * sen kohdekartalla (js/packs/maakartat.js "Tunneli 1827").
   * Lähde: en.wikipedia.org: Thames Tunnel
   */
  {
    id: 'brunel-thames-tunnel-1827',
    otsikko: 'Rotherhithe 1827 — 36 lokeroa joen alla',
    nimio: 'Tunneli 1827',
    paivays: 'toukokuu 1827',
    paikka: 'Rotherhithe, Lontoo',
    iso: 'GBR',
    lat: 51.5031, lon: -0.0544,
    kuvaversio: 4,
    teksti: 'Tihkuvan veden ääni ei lakkaa koskaan. Se tulee yläpuolelta, '
      + 'missä Thames virtaa ohuen savikerroksen takana, ja jokainen kaivaja '
      + 'kuuntelee, muuttuuko tihku suihkuksi. Rotherhithen kuilussa '
      + 'toukokuussa 1827 työskentelee Marc Brunelin keksimä tunnelikilpi: '
      + 'kaksitoista valurautaista kehystä kolmessa kerroksessa, 36 lokeroa, '
      + 'joissa kukin mies kaivaa oman tukilautansa takaa. Kun koko kilpi on '
      + 'kaivettu tyhjäksi, ruuvitunkit työntävät sitä eteenpäin ja muurarit '
      + 'muuraavat perässä. Työmaata johtaa Marcin poika Isambard Kingdom '
      + 'Brunel, 21, joka otti vastuun edellisen insinöörin sairastuttua. '
      + 'Lontoolaiset maksavat shillingin nähdäkseen kilven työssä. Joen '
      + 'jätevesi tihkuu tunneliin, sen metaani syttyy lampuista, ja miehet '
      + 'sairastuvat. 18. toukokuuta joki murtautuu sisään, kun tunnelia on '
      + 'kaivettu 167 metriä; Isambard laskeutuu sukelluskellolla tukkimaan '
      + 'reiän savisäkeillä ja pitää korjatussa tunnelissa juhlaillallisen. '
      + 'Tammikuussa 1828 tulva tappaa kuusi miestä. Tunneli avataan vasta '
      + '25. maaliskuuta 1843, ensimmäisenä purjehduskelpoisen joen '
      + 'alittajana.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-brunel-thames-tunnel-1827-lahi-photo-v4.jpg',
        kuvateksti: 'Kaivaja näkee vain oman valurautaisen lokeronsa, '
          + 'irrotettavan tukilaudan ja märkää savea muutaman kymmenen sentin '
          + 'päässä kasvoistaan. Hän saa ottaa maata pois vain noin neljän '
          + 'tuuman kaistaleen kerrallaan; Thames virtaa yläpuolella, eikä '
          + 'kukaan tiedä, milloin tihkuminen muuttuu tulvaksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Brunel Museum — Thames '
          + 'Tunnel archive, tarkistettu 5.9.2026.',
        url: 'https://thebrunelmuseum.com/online/thames-tunnel-archive/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-brunel-thames-tunnel-1827-kauko-photo-v4.jpg',
        kuvateksti: '21-vuotias Isambard Kingdom Brunel kuuntelee puun, '
          + 'ruuvitunkkien ja veden ääniä, kun kaksitoista kolmikerroksista '
          + 'kehystä siirtyy tuuma tuumalta eteenpäin. Kilven 36 kaivajaa ja '
          + 'heidän takanaan muuraavat miehet rakentavat maailman ensimmäistä '
          + 'tunnelia purjehduskelpoisen joen alle — toukokuun 1827 tulva '
          + 'osoittaa, kuinka ohut turva todella on.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Brunel Museum — Thames '
          + 'Tunnel archive, tarkistettu 5.9.2026.',
        url: 'https://thebrunelmuseum.com/online/thames-tunnel-archive/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lontoon laatan päällä (2 yksikköä) ja '
      + 'Lontoon kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Lontoon '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lontoo' },
    lehtiJohdanto: 'Rotherhithen kuilussa 36 miestä kaivoi 1820-luvulla '
      + 'valurautaisen kilven lokeroista savea Thamesin alla, ja uteliaat '
      + 'maksoivat shillingin nähdäkseen, miten joen alitse mennään.',
    lehtiTehtava: {
      kysymys: 'Mitä Isambard Brunel teki, kun Thames murtautui tunneliin '
        + 'toukokuussa 1827?',
      vaihtoehdot: [
        'Laskeutui sukelluskellolla tukkimaan reiän savisäkeillä',
        'Hylkäsi hankkeen ja muutti Bristoliin',
        'Räjäytti tunnelin suun umpeen',
        'Pumppasi joen kuivaksi',
      ],
      oikea: 0,
      fakta: 'Tunneli avattiin vasta 25. maaliskuuta 1843; vuodesta 1869 '
        + 'siinä on kulkenut juna.',
    },
  },
  /*
   * 34. PORT SAID 17.11.1869 — KANAVA AVATAAN.
   * Lähin kohdekaupunki Kairo 59 laudan yksikön päässä — oma merkki
   * kartalle. Port Saidilla ei ole kaupunkilehteä, joten sivu on Egyptin
   * maalehdessä. Kolmas kuva on The Illustrated London Newsin
   * puukaiverrussivu (HETKI_LEHTIKUVAT).
   * Lähde: en.wikipedia.org: Suez Canal, Port Said
   */
  {
    id: 'suezin-kanava-avajaiset-1869',
    otsikko: 'Port Said 1869 — keulan edessä vain kaivettua vettä',
    nimio: 'Suez 1869',
    paivays: '17.11.1869',
    paikka: 'Port Said, Egypti',
    iso: 'EGY',
    lat: 31.2625, lon: 32.3061,
    kuvaversio: 4,
    teksti: 'Keulan edessä ei ole enää mitään paitsi kaivettua vettä. '
      + 'Keisarillinen huvijahti L\'Aigle kääntyy Port Saidista kanavaan 17. '
      + 'marraskuuta 1869 ensimmäisenä, ja sen perässä jonoon asettuu '
      + 'kymmeniä laivoja: Itävallan keisari Frans Joosef, Preussin '
      + 'kruununprinssi, ruhtinaita ja lähettiläitä. Kannella seisoo '
      + 'keisarinna Eugénie, jonka serkku Ferdinand de Lesseps on ajanut '
      + 'hanketta viisitoista vuotta. Kaupunki, josta lähdetään, on itse '
      + 'kanavan lapsi: Port Said perustettiin hiekkasärkälle huhtikuussa '
      + '1859, kun kaivaminen alkoi. Kymmenen vuoden työ tehtiin aluksi '
      + 'Egyptin talonpoikien pakkotyönä, corvéena, kunnes se kiellettiin '
      + '1864 ja tilalle tuotiin ruoppaajia ja kauhakoneita. Työntekijöitä '
      + 'oli yhteensä yli miljoona; kuolleiden määrästä kiistellään yhä. '
      + 'Kanava lyhentää matkan Arabianmereltä Lontooseen lähes 9 000 '
      + 'kilometriä, ja juuri siksi Britannia, joka vastusti sitä loppuun '
      + 'asti, ostaa Egyptin osakkeet 1875 ja miehittää maan 1882. Rannalla '
      + 'juhlavieraat näkevät lippuja ja savua; egyptiläisten kaivajien '
      + 'vuosikymmen ei mahdu ohjelmaan.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-suezin-kanava-avajaiset-1869-lahi-photo-v4.jpg',
        kuvateksti: 'Nuoren egyptiläisen köysimiehen tehtävä on arkinen: pitää '
          + 'L’Aiglen kiinnitysköysi poissa vedestä, vaikka kannella seisoo '
          + 'Ranskan keisarinna Eugénie. Hänen ympärillään Port Said on '
          + 'muuttunut hetkeksi näyttämöksi, jolla tuhannet vieraat juhlivat '
          + 'väylää, jonka kaivamiseen tavalliset kädet olivat käyttäneet '
          + 'kymmenen vuotta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Suez Canal Authority — Canal '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-suezin-kanava-avajaiset-1869-kauko-photo-v4.jpg',
        kuvateksti: 'L’Aigle kääntyy kanavaan ensimmäisenä, ja sen takana '
          + 'odottaa 77 alusta. Hiekkarannalla lapsi laskee lippuja ja '
          + 'savupiippuja sormillaan; hänelle maailman merireittien muutos on '
          + 'tämä aamu, jolloin hiljainen ranta muuttuu kahden meren '
          + 'väyläksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Suez Canal Authority — Canal '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-suezin-kanava-avajaiset-1869-lehti-photo-v4.jpg',
        kuvateksti: 'Kuvittaja William Simpson lähetti Port Saidista '
          + 'kenttämuistiinpanot “kaikkien kansojen väkijoukosta”, ja '
          + 'Lontoossa ne muutettiin viikkoja myöhemmin puukaiverrukseksi. '
          + 'Lukija näki kuninkaalliset ja liput; tavallisten kaivajien '
          + 'kymmenen vuotta tiivistyivät yhteen juhlasivuun.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Suez Canal Authority — Canal '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://www.suezcanal.gov.eg/English/About/SuezCanal/Pages/CanalHistory.aspx',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'EGY' },
    visa: {
      kysymys: 'Mikä alus kääntyi Suezin kanavaan ensimmäisenä avajaispäivänä 1869?',
      vaihtoehdot: [
        'Brittiläinen panssarilaiva',
        'Kediivi Ismailin höyryjahti',
        'Keisarinna Eugénien huvijahti L\'Aigle',
      ],
      oikea: 2,
    },
    lehtiJohdanto: 'Välimeren hiekkasärkälle vuonna 1859 perustettu '
      + 'työmaakaupunki näki kymmenen vuotta myöhemmin keisarinnan jahdin '
      + 'kääntyvän kanavaan, jonka egyptiläiset talonpojat olivat '
      + 'kaivaneet alkuvuodet pakkotyönä.',
    lehtiTehtava: {
      kysymys: 'Miksi Britannia, joka vastusti kanavaa, osti Egyptin '
        + 'kanavaosakkeet 1875?',
      vaihtoehdot: [
        'Ranska pakotti sen kauppasopimuksella',
        'Osakkeet olivat arvottomia ja halpoja',
        'Kanava lyhensi Intian-reittiä tuhansia kilometrejä',
        'Kediivi lahjoitti ne kuningatar Victorialle',
      ],
      oikea: 2,
      fakta: 'Matka Arabianmereltä Lontooseen lyheni lähes 9 000 kilometriä; '
        + 'Britannia miehitti Egyptin 1882.',
    },
  },
  /*
   * 35. NEW YORK 24.5.1883 — SILTA AVATAAN.
   * Piste on 10 laudan yksikköä New Yorkin laatasta mutta New Yorkin
   * kohdekartan rajauksessa (East River). Raamattu: kohdekartan
   * rajauksen sisällä oleva nosto piirretään VAIN kohdekartalle — sivu on
   * New Yorkin kaupunkilehdessä ja piste sen kohdekartalla
   * (js/packs/maakartat.js "Brooklyn 1883"). Kolmas kuva on Brooklyn
   * Daily Eaglen erikoisnumero (HETKI_LEHTIKUVAT).
   * Lähde: en.wikipedia.org: Brooklyn Bridge, Emily Warren Roebling
   */
  {
    id: 'brooklyn-bridge-1883',
    otsikko: 'East River 1883 — kuka tämän sillan rakensi?',
    nimio: 'Brooklyn 1883',
    paivays: '24.5.1883',
    paikka: 'Brooklyn Bridge, New York',
    iso: 'USA',
    lat: 40.7057, lon: -73.9964,
    kuvaversio: 4,
    teksti: 'Kuka tämän sillan oikeastaan rakensi? Kysymys leijuu 24. '
      + 'toukokuuta 1883 avajaisten yllä, vaikka kukaan ei sano sitä ääneen. '
      + 'Suunnittelija John A. Roebling kuoli jalkavammaan jo 1869 ennen '
      + 'töiden alkua. Hänen poikansa Washington Roebling johti työtä, '
      + 'kunnes sukeltajantauti, joka syntyi kaivettaessa tornien '
      + 'perustuksia paineilmakaissoneissa, lamautti hänet 1870-luvun alussa; '
      + 'sen jälkeen hän seurasi työmaata kaukoputkella makuuhuoneestaan '
      + 'Columbia Heightsilta. Hänen vaimonsa Emily Warren Roebling opetteli '
      + 'lujuusopin ja köysikäyrien matematiikan, kuljetti ohjeet '
      + 'insinööreille ja vastasi viranomaisille yli kymmenen vuotta. '
      + 'Tänään hän ylittää sillan ensimmäisenä vaunuissa, ja presidentti '
      + 'Chester A. Arthur kävelee Manhattanilta Brooklyniin '
      + 'tykkilaukausten ja ilotulitusten saattamana. Silta on maailman '
      + 'pisin riippusilta, jänneväliltään 486 metriä ja kaapeleiltaan '
      + 'terästä, ja se on maksanut noin 27 työmiehen hengen. Ensimmäisenä '
      + 'päivänä yli 150 000 ihmistä kävelee sen yli. Kuusi päivää myöhemmin '
      + 'portaikossa syntyy tungos ja kaksitoista kuolee — silta on heti '
      + 'liian suosittu.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-brooklyn-bridge-1883-lahi-photo-v4.jpg',
        kuvateksti: 'Emily Roebling on vuosien ajan kuljettanut laskelmia ja '
          + 'ohjeita työmaan sekä sukeltajantaudin sairastuttaman '
          + 'Washingtonin välillä. Kun hän ylittää valmiin sillan '
          + 'ensimmäisenä, aikalaiskertomukset asettavat hänen syliinsä '
          + 'voittoa merkitsevän kukon — erikoisen yksityiskohdan vakavan '
          + 'kysymyksen vierelle: kuka todella piti työn liikkeessä?',
        lahde: 'Matkakirjan havainnekuva. Faktat: NYC DOT — Brooklyn Bridge, '
          + 'tarkistettu 5.9.2026.',
        url: 'https://www.nyc.gov/html/dot/html/pr2024/brooklyn-bridge-glow-up.shtml',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-brooklyn-bridge-1883-kauko-photo-v4.jpg',
        kuvateksti: 'Washington Roebling ei seiso arvovieraiden joukossa vaan '
          + 'seuraa juhlaa kodistaan Columbia Heightsilta. Presidentti, '
          + 'tykkisalva ja väkijoukko ottavat sillan haltuunsa; neljäntoista '
          + 'vuoden työ yhdistää kaksi kaupunkia lähes kaikkien muiden paitsi '
          + 'sen viimeisiä vuosia johtaneen insinöörin silmien edessä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: NYC DOT — Brooklyn Bridge, '
          + 'tarkistettu 5.9.2026.',
        url: 'https://www.nyc.gov/html/dot/html/pr2024/brooklyn-bridge-glow-up.shtml',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-brooklyn-bridge-1883-lehti-photo-v4.jpg',
        kuvateksti: 'Brooklyn Daily Eagle rikkoi avajaispäivänä '
          + 'levikkiennätyksensä erikoisnumerolla, joka julisti Brooklynin ja '
          + 'New Yorkin yhdistyneiksi. Lehden suurin uutinen oli silta; rivien '
          + 'väliin jäi Emily Roeblingin työ, vaikka hänen laskelmansa ja '
          + 'työmaatuntemuksensa olivat pitäneet hanketta liikkeessä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: NYC DOT — Brooklyn Bridge, '
          + 'tarkistettu 5.9.2026.',
        url: 'https://www.nyc.gov/html/dot/html/pr2024/brooklyn-bridge-glow-up.shtml',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on New Yorkin kohdekartan rajauksessa (East '
      + 'River, 10 yksikköä laatasta): kohdekartan rajauksen sisällä oleva '
      + 'nosto ei ole pääkartalla (Raamattu, omistaja 2.9.2026 ilta) vaan '
      + 'New Yorkin kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'newyork' },
    lehtiJohdanto: 'East Riverin yli avattiin toukokuussa 1883 maailman pisin '
      + 'riippusilta, jonka viimeiset vuodet johti sairasvuoteelta '
      + 'insinööri — ja hänen vaimonsa, jonka nimeä ei ollut missään '
      + 'piirustuksessa.',
    lehtiTehtava: {
      kysymys: 'Miten Washington Roebling seurasi sillan rakentamista sen '
        + 'viimeiset vuodet?',
      vaihtoehdot: [
        'Kaukoputkella makuuhuoneestaan Columbia Heightsilta',
        'Paineilmakaissonista sillan alta',
        'Höyrylaivasta East Riverillä',
        'Kirjeitse Euroopasta',
      ],
      oikea: 0,
      fakta: 'Emily Warren Roebling kuljetti hänen ohjeensa työmaalle ja '
        + 'ylitti valmiin sillan ensimmäisenä 24. toukokuuta 1883.',
    },
  },
  /*
   * 36. JÄNISSAARI 27.5.1703 — LINNOITUS SUOHON.
   * Piste on Pietarin laatan päällä (0,5 laudan yksikköä) ja kohdekartan
   * rajauksessa (Pietari-Paavalin linnoitus). Vain Pietarin
   * kaupunkilehdessä ja sen kohdekartalla (js/packs/maakartat.js
   * "Jänissaari 1703").
   * Lähde: en.wikipedia.org: Peter and Paul Fortress, Saint Petersburg
   */
  {
    id: 'pietari-perustus-1703',
    otsikko: 'Jänissaari 1703 — kuusi bastionia suohon',
    nimio: 'Jänissaari 1703',
    paivays: '27.5.1703',
    paikka: 'Jänissaari, Nevan suisto',
    iso: 'RUS',
    lat: 59.9500, lon: 30.3167,
    kuvaversio: 4,
    teksti: 'Mittakeppi ja kartta ovat ainoat kuivat esineet Jänissaarella. '
      + 'Vartiosotilas pitää kartan kulmasta kiinni, kun tsaari Pietari, '
      + 'yli kaksimetrinen mies, kävelee saaren märkää rantaa ja näyttää, '
      + 'mihin kuusi bastionia tulevat. On 27. toukokuuta 1703, ja kaksi '
      + 'viikkoa aiemmin venäläiset valtasivat ylempänä Nevalla '
      + 'ruotsalaisten Nyenskansin linnoituksen. Suuri Pohjan sota on '
      + 'käynnissä, ja Ruotsin laivasto voi ilmestyä Suomenlahdelle milloin '
      + 'tahansa; siksi linnake pitää saada saarelle jokisuuhun ennen '
      + 'talvea, ensin maasta ja puusta. Kivi tulee myöhemmin, Domenico '
      + 'Trezzinin piirustuksin vuodesta 1706. Sotilaille ja pakkotyöhön '
      + 'käsketyille talonpojille paikka on suo, jossa on hyttysiä ja '
      + 'kuolemaa; heille ei sanota, että tästä tehdään pääkaupunki. Pietari '
      + 'nimeää linnoituksen suojeluspyhimyksensä apostoli Pietarin mukaan '
      + 'ja siirtää hovin tänne 1712. Linnoituksesta ei koskaan ammuta '
      + 'vihollista kohti — sen kuuluisin osa on vankila, jossa istuvat '
      + 'myöhemmin Pietarin oma poika Aleksei, dekabristit ja Dostojevski.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-pietari-perustus-1703-lahi-photo-v4.jpg',
        kuvateksti: 'Sotilaan mittakeppi uppoaa märkään maahan, ja lapioita '
          + 'pitelevät miehet yrittävät nähdä kartasta saman kuusibastionisen '
          + 'linnoituksen kuin tsaari. Heille Jänissaari ei vielä ole '
          + 'pääkaupunki vaan kiireinen puolustustyö keskellä suurta Pohjan '
          + 'sotaa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Presidential Library — '
          + 'foundation of St Petersburg, tarkistettu 5.9.2026.',
        url: 'https://www.prlib.ru/node/619267',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-pietari-perustus-1703-kauko-photo-v4.jpg',
        kuvateksti: 'Pietarin suunnitelma lupaa kuusi bastionia, mutta '
          + 'toukokuussa 1703 paikalla on vasta soinen saari, mittanaruja ja '
          + 'märkiä maavalleja. Työryhmän on saatava puu- ja maalinnake '
          + 'valmiiksi ennen talvea; tuleva kaupunki on vielä ajatus, harmaa '
          + 'Neva ja Ruotsin laivaston uhka ovat todellisia.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Presidential Library — '
          + 'foundation of St Petersburg, tarkistettu 5.9.2026.',
        url: 'https://www.prlib.ru/node/619267',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pietarin laatan päällä (0,5 yksikköä) ja '
      + 'Pietarin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pietarin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pietari' },
    lehtiJohdanto: 'Nevan suiston soisella saarella mitattiin toukokuussa 1703 '
      + 'kuuden bastionin linnoitusta ruotsalaisia vastaan — kukaan '
      + 'lapiomiehistä ei tiennyt seisovansa tulevan pääkaupungin '
      + 'keskustassa.',
    lehtiTehtava: {
      kysymys: 'Miksi Pietari-Paavalin linnoitus rakennettiin juuri '
        + 'toukokuussa 1703?',
      vaihtoehdot: [
        'Tsaari halusi kesäpalatsin merelle',
        'Ruotsalaiset olivat luovuttaneet alueen rauhansopimuksessa',
        'Moskova oli palanut edellisenä talvena',
        'Ruotsin laivasto uhkasi juuri vallattua Nevan suuta',
      ],
      oikea: 3,
      fakta: 'Linnoitus ei koskaan ampunut vihollista; sen vankilassa '
        + 'istuivat Pietarin poika Aleksei, dekabristit ja Dostojevski.',
    },
  },
  /*
   * 37. POMPEJI 79 — HOHKAKIVISADE ALKAA.
   * Lähin kohdekaupunki Rooma 80 laudan yksikön päässä — oma merkki
   * kartalle. Napolilla ei ole laudalla kaupunkia, joten sivu on Italian
   * maalehdessä.
   * Lähde: en.wikipedia.org: Eruption of Mount Vesuvius in 79 AD, Pliny
   * the Younger
   */
  {
    id: 'vesuvius-pompeji-79',
    otsikko: 'Pompeji 79 — ropina katolla',
    nimio: 'Pompeji 79',
    paivays: '79 jaa.',
    paikka: 'Pompeji, Campania',
    iso: 'ITA',
    lat: 40.7500, lon: 14.4861,
    kuvaversio: 4,
    teksti: 'Ropina katolla kuulostaa ensin rakeilta. Sitten kadulle putoaa '
      + 'kevyitä, vaaleita kiviä, joita voi pitää kädessä — hohkakiveä — ja '
      + 'niitä sataa tunti tunnilta tiheämmin. Pompejin torilla on '
      + 'iltapäivä vuonna 79, ja vuoren päällä seisoo pilvi, jota nuorempi '
      + 'Plinius kuvaa myöhemmin kirjeessään Tacitukselle pinjapuuksi: '
      + 'pitkä runko ja levenevä latva. Hän katselee sitä lahden toiselta '
      + 'puolelta Misenumista, 29 kilometrin päästä, ja hänen enonsa Plinius '
      + 'vanhempi, laivaston komentaja, lähtee laivalla pelastamaan ihmisiä '
      + 'ja kuolee Stabiaen rannalla. Pompejissa kukaan ei kirjoita mitään. '
      + 'Ensimmäisen päivän valkoinen hohkakivi kasaa katoille lähes kolmen '
      + 'metrin kerroksen, ja katot romahtavat; se on viimeinen tilaisuus '
      + 'lähteä. Yöllä tai aamulla pilvi romahtaa, ja kuumat kaasu- ja '
      + 'tuhkavyöryt tulevat rinnettä alas kaupunkiin tappaen kaikki, jotka '
      + 'jäivät. Tuhkasta on löydetty yli 1 500 ihmisen jäännökset Pompejista '
      + 'ja Herculaneumista. Perinteinen päivä on 24. elokuuta, mutta '
      + 'löydöt — syksyn hedelmät, lämmin vaatetus — puhuvat lokakuun '
      + 'puolesta.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-vesuvius-pompeji-79-lahi-photo-v4.jpg',
        kuvateksti: 'Kuvituksen nimetön torikauppias yrittää vielä pelastaa '
          + 'vaa’an ja rahalippaan, kun hänen tyttärensä kuuntelee hohkakivien '
          + 'alkavaa ropinaa katoksella. He eivät tiedä, onko viisaampaa '
          + 'suojautua vai lähteä — juuri tämä epävarmuus jätti osan '
          + 'pompejilaisista koteihin, joiden katoille kertyi lopulta '
          + 'metreittäin lapilleja.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Archaeological Park of '
          + 'Pompeii — date of the eruption, tarkistettu 5.9.2026.',
        url: 'https://pompeiisites.org/e-journal-degli-scavi-di-pompei/la-data-della-distruzione-di-pompei-premesse-per-un-dibattito-aperto/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-vesuvius-pompeji-79-kauko-photo-v4.jpg',
        kuvateksti: 'Plinius vertasi Vesuviuksen päälle kohoavaa pilveä '
          + 'pinjapuuhun: kapea runko levisi korkealla oksistoksi. Forumilla '
          + 'vertaus ei vielä auta ketään. Yksi perhe kokoaa läheisiään, '
          + 'toinen lukitsee puotinsa ja kolmas jää katsomaan, koska vuori oli '
          + 'ollut hiljaa sukupolvien ajan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Archaeological Park of '
          + 'Pompeii — date of the eruption, tarkistettu 5.9.2026.',
        url: 'https://pompeiisites.org/e-journal-degli-scavi-di-pompei/la-data-della-distruzione-di-pompei-premesse-per-un-dibattito-aperto/',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'ITA' },
    visa: {
      kysymys: 'Mihin nuorempi Plinius vertasi Vesuviuksen purkauspilveä kirjeessään Tacitukselle?',
      vaihtoehdot: [
        'Pinjapuuhun',
        'Ukkospilveen',
        'Purjeeseen',
      ],
      oikea: 0,
    },
    lehtiJohdanto: 'Napolinlahden kaupungissa satoi vuonna 79 ensin kevyttä '
      + 'hohkakiveä, ja se oli viimeinen tilaisuus lähteä — kuumat '
      + 'tuhkavyöryt tulivat yöllä, ja Plinius kirjoitti pilvestä, joka '
      + 'näytti pinjapuulta.',
    lehtiTehtava: {
      kysymys: 'Miksi Vesuviuksen purkauksen päivämäärästä kiistellään?',
      vaihtoehdot: [
        'Pliniuksen kirjeet on kadotettu',
        'Löydöt — syksyn hedelmät ja lämpimät vaatteet — sopivat huonosti '
          + 'elokuuhun',
        'Roomalaisilla ei ollut kalenteria',
        'Purkauksia oli samana vuonna kaksi',
      ],
      oikea: 1,
      fakta: 'Perinteinen päivä on 24. elokuuta, mutta moni tutkija pitää '
        + 'lokakuuta todennäköisempänä.',
    },
  },
  /*
   * 38. KONSTANTINOPOLI 29.5.1453 — VIIMEINEN AAMU MUURILLA.
   * Piste on Istanbulin laatan päällä (1,5 laudan yksikköä). Viimeinen
   * hyökkäys kohdistui Theodosiuksen muurin Mesoteichioniin, joka on
   * Istanbulin kohdekartan rajauksen länsipuolella; kohdekartan piste
   * on siksi Hagia Sofialla, johon sama aamu päättyi
   * (js/packs/maakartat.js "Konstantinopoli 1453"). Sivu on Istanbulin
   * kaupunkilehdessä.
   * Lähde: en.wikipedia.org: Fall of Constantinople
   */
  {
    id: 'konstantinopoli-1453',
    otsikko: 'Konstantinopoli 1453 — aamu tulee rumpujen mukana',
    nimio: 'Konstantinopoli',
    paivays: '29.5.1453',
    paikka: 'Theodosiuksen muuri, Konstantinopoli',
    iso: 'TUR',
    lat: 41.0189, lon: 28.9226,
    kuvaversio: 4,
    teksti: 'Yö on lyhyt, ja aamu tulee rumpujen ja huutojen mukana. '
      + 'Mesoteichionilla, Lykosjoen laakson muurinpätkällä, on 29. '
      + 'toukokuuta 1453. Sulttaani Mehmed II, 21-vuotias, on piirittänyt '
      + 'kaupunkia 6. huhtikuuta lähtien — 53 päivää — ja unkarilaisen '
      + 'Orbanin valama jättiläistykki on murtanut muuria viikkokausia niin, '
      + 'että puolustajat täyttävät aukkoja öisin. Kaupungissa on alle 50 000 '
      + 'asukasta ja vain noin 7 000–8 000 aseellista miestä kahdentoista '
      + 'mailin muureille; ulkopuolella on 50 000–80 000 osmania. Edellisenä '
      + 'iltana keisari Konstantinos XI kävi Hagia Sofiassa viimeisessä '
      + 'vesperissä, jossa latinalaiset ja kreikkalaiset rukoilivat samassa '
      + 'kirkossa. Hyökkäys tulee aalloittain: ensin palkkasoturit, sitten '
      + 'Anatolian väki, viimeisenä janitsaarit. Puolustusta johtava '
      + 'genovalainen Giovanni Giustiniani haavoittuu ja kannetaan muurilta, '
      + 'ja hänen miestensä perääntyminen aiheuttaa paniikin. Konstantinos '
      + 'katoaa taistelun melskeeseen; ruumista ei tunnisteta varmasti. '
      + 'Aamupäivällä osmanit murtavat Hagia Sofian ovet, joiden taakse '
      + 'tuhannet olivat paenneet. Tuhat vuotta vanha keisarikunta päättyy, '
      + 'ja Mehmed tekee kaupungista pääkaupunkinsa.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-konstantinopoli-1453-lahi-photo-v4.jpg',
        kuvateksti: 'Yön aikana puolustajat ovat täyttäneet kanuunoiden '
          + 'murtamaa aukkoa kivillä, tynnyreillä ja puulla. Nuori apumies ei '
          + 'tiedä, kestääkö hänen tukemansa palkki seuraavan laukauksen; '
          + 'rumpujen lähestyessä hän tietää vain, ettei vanhempaa uupunutta '
          + 'toveria jätetä yksin.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Constantinople 1453 — '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://constantinople1453.org/en/history/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-konstantinopoli-1453-kauko-photo-v4.jpg',
        kuvateksti: 'Viimeinen hyökkäys tulee kolmessa aallossa. Ensimmäiset '
          + 'väsyttävät puolustajia, toiset kasvattavat painetta ja '
          + 'janitsaarit etenevät viimeisinä. Muurin harjalla kuuden viikon '
          + 'piiritys on kutistunut yhden sotilaan kysymykseksi: yltääkö '
          + 'seuraava hyökkääjä tikkaiden päästä hänen eteensä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Constantinople 1453 — '
          + 'history, tarkistettu 5.9.2026.',
        url: 'https://constantinople1453.org/en/history/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Istanbulin laatan päällä (1,5 yksikköä): '
      + 'kaupungin laatan päälle osuva hetki ei ole pääkartalla (omistaja '
      + '3.9.2026) vaan Istanbulin kohdekartan piste (Hagia Sofia, johon '
      + 'aamu päättyi; muuri on kartan rajauksen ulkopuolella)',
    lehti: { laji: 'kaupunki', avain: 'istanbul' },
    lehtiJohdanto: 'Toukokuun 29. päivän aamuna 1453 kahdeksantuhatta '
      + 'puolustajaa seisoi kahdentoista mailin muurilla, ja sama aamu '
      + 'päättyi Hagia Sofian ovien murtumiseen — tuhatvuotinen '
      + 'keisarikunta loppui yhdessä päivässä.',
    lehtiTehtava: {
      kysymys: 'Kuinka kauan Konstantinopolin piiritys kesti vuonna 1453?',
      vaihtoehdot: [
        'Kolme päivää',
        'Kolme viikkoa',
        '53 päivää',
        'Kaksi vuotta',
      ],
      oikea: 2,
      fakta: 'Piiritys alkoi 6. huhtikuuta; 21-vuotias Mehmed II teki '
        + 'kaupungista valtakuntansa pääkaupungin.',
    },
  },
  /*
   * 39. LONTOO 2.9.1666 — PUDDING LANE JA THAMES.
   * Piste on Lontoon laatan päällä (1 laudan yksikkö) ja kohdekartan
   * rajauksessa (Pudding Lane). Vain Lontoon kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Palo 1666"). Kolmas kuva on
   * The London Gazetten numero 85 (HETKI_LEHTIKUVAT).
   * Lähde: en.wikipedia.org: Great Fire of London
   */
  {
    id: 'lontoon-palo-1666',
    otsikko: 'Lontoo 1666 — soitin veneessä, kaupunki tulessa',
    nimio: 'Palo 1666',
    paivays: '2.–5.9.1666',
    paikka: 'Pudding Lane, Lontoo',
    iso: 'GBR',
    lat: 51.5102, lon: -0.0853,
    kuvaversio: 4,
    teksti: 'Kädet pitävät kiinni soittimen kannesta, koska se on ainoa, mitä '
      + 'veneeseen mahtui. Thamesilla on sunnuntai 2. syyskuuta 1666, ja '
      + 'Samuel Pepys, laivaston virkamies, kirjoittaa iltapäivällä '
      + 'päiväkirjaansa ihmisistä, jotka jäivät koteihinsa, kunnes tuli '
      + 'kosketti niitä, ja pakenivat sitten veneisiin. Tulipalo alkoi yöllä '
      + 'Thomas Farrinerin leipomosta Pudding Lanella; talon piika, joka ei '
      + 'uskaltanut kiivetä ikkunasta naapurin katolle, oli ensimmäinen '
      + 'kuollut. Pormestari Thomas Bloodworth ei purattanut taloja tulen '
      + 'tieltä, ja itätuuli teki lopun: kesä oli ollut kuiva, ja '
      + 'puukaupungin kadut olivat kapeita. Pepys itse kaivaa '
      + 'parmesaanijuustonsa ja viininsä puutarhaan maahan. Tiistaina tuli '
      + 'tavoittaa Pyhän Paavalin katedraalin, jonka korjaustelineet '
      + 'syttyvät; lyijykatto sulaa ja valuu kaduille, ja kryptaan '
      + 'varastoidut kirjakauppiaiden varastot palavat. Keskiviikkona tuuli '
      + 'laantuu. Palo tuhosi 13 200 taloa ja 87 kirkkoa, mutta kirjattuja '
      + 'kuolleita on vain kourallinen — luku, jota epäillään yhä.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-lontoon-palo-1666-lahi-photo-v4.jpg',
        kuvateksti: 'Samuel Pepys huomasi Thamesilla jotain oudon arkista: '
          + 'lähes joka kolmannessa kotinsa tavaroita kuljettavassa veneessä '
          + 'oli virginal-soitin. Kuvituksen nuori nainen pitää oman '
          + 'soittimensa kantta kiinni kipinäsateessa — koti saattaa palaa, '
          + 'mutta perhe ei vielä suostu jättämään kaikkia entisen elämän '
          + 'ääniä rannalle.',
        lahde: 'Matkakirjan havainnekuva. Faktat: The National Archives — '
          + 'Samuel Pepys and the Great Fire, tarkistettu 5.9.2026.',
        url: 'https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/extracts-from-samuel-pepys-diary/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-lontoon-palo-1666-kauko-photo-v4.jpg',
        kuvateksti: 'Thames täyttyi veneistä, vuoteista, arkuista ja vedessä '
          + 'kelluvista tavaroista. Pepys kirjoitti kipinöiden polttaneen '
          + 'kasvoja joen toiselle puolelle asti; veneessä jokainen joutui '
          + 'silti ratkaisemaan, auttaako vielä yhtä naapuria vai soutaako '
          + 'oman perheensä turvaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: The National Archives — '
          + 'Samuel Pepys and the Great Fire, tarkistettu 5.9.2026.',
        url: 'https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/extracts-from-samuel-pepys-diary/',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-lontoon-palo-1666-lehti-photo-v4.jpg',
        kuvateksti: 'Palo tuhosi myös The London Gazetten painopaikan, ja '
          + 'numero 85 ilmestyi viikon keskeytyksen jälkeen Savoyssa. '
          + 'Virallinen selostus lupasi lukijoille “lyhyen mutta '
          + 'totuudenmukaisen” kertomuksen; kadulle jääneille tuhansille se '
          + 'oli ensimmäinen painettu yritys tehdä käsittämätön menetys '
          + 'ymmärrettäväksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: The National Archives — '
          + 'Samuel Pepys and the Great Fire, tarkistettu 5.9.2026.',
        url: 'https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/extracts-from-samuel-pepys-diary/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lontoon laatan päällä (1 yksikkö) ja '
      + 'Lontoon kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Lontoon '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lontoo' },
    lehtiJohdanto: 'Pudding Lanen leipomosta syyskuun 1666 yönä lähtenyt tuli '
      + 'poltti neljässä päivässä 13 200 taloa, ja Thames täyttyi veneistä, '
      + 'joihin ihmiset pakkasivat sen, mitä ehtivät.',
    lehtiTehtava: {
      kysymys: 'Mitä Samuel Pepys hautasi puutarhaansa palon uhatessa?',
      vaihtoehdot: [
        'Parmesaanijuuston ja viininsä',
        'Päiväkirjansa',
        'Laivaston asiakirjat',
        'Vaimonsa korut',
      ],
      oikea: 0,
      fakta: 'Palo alkoi Thomas Farrinerin leipomosta sunnuntaina 2. '
        + 'syyskuuta; keskiviikkona tuuli laantui ja palo sammui.',
    },
  },
  /*
   * 40. BERNAUER STRASSE 13.8.1961 — PIIKKILANKA KADUN POIKKI.
   * Piste on Berliinin laatan päällä (0,6 laudan yksikköä) ja kohdekartan
   * rajauksessa (Bernauer Straße). Vain Berliinin kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Muuri 1961"). Kolmas kuva on
   * BILD-lehden etusivu 14.8.1961 (HETKI_LEHTIKUVAT).
   * Lähde: en.wikipedia.org: Berlin Wall
   */
  {
    id: 'berliinin-muuri-1961',
    otsikko: 'Bernauer Straße 1961 — piikkilanka kadun poikki',
    nimio: 'Muuri 1961',
    paivays: '13.8.1961',
    paikka: 'Bernauer Straße, Berliini',
    iso: 'DEU',
    lat: 52.5375, lon: 13.3933,
    kuvaversio: 4,
    teksti: 'Ilmavasaroiden ääni herättää Bernauer Straßen ennen aamunkoittoa. '
      + 'On sunnuntai 13. elokuuta 1961, ja keskiyöllä Itä-Saksan poliisi, '
      + 'armeija ja tehtaiden taisteluryhmät ovat alkaneet sulkea rajaa '
      + 'Länsi-Berliiniin: katukiveys revitään, betonipylväät nostetaan '
      + 'pystyyn, piikkilanka vedetään väliin 43 kilometrin matkalle '
      + 'kaupungin halki. Kadulla, jolla talot ovat itää ja jalkakäytävä '
      + 'länttä, ihmiset seisovat yöpuvuissaan ja katselevat. Kaksi '
      + 'kuukautta aiemmin Walter Ulbricht oli sanonut '
      + 'lehdistötilaisuudessa, ettei kenelläkään ole aikomusta rakentaa '
      + 'muuria; edellisenä iltana hän allekirjoitti käskyn hallituksen '
      + 'vierastalossa Döllnseellä. Sulkemisen syy on yksinkertainen: '
      + 'DDR:stä on lähtenyt vuoden 1949 jälkeen noin 3,5 miljoonaa '
      + 'ihmistä, nuoria ja koulutettuja. Länsi ei tee mitään — Kennedy saa '
      + 'tiedon huvijahdillaan vasta puoliltapäivin. Seuraavina viikkoina '
      + 'Bernauer Straßen talojen ovet ja ikkunat muurataan umpeen; 22. '
      + 'elokuuta Ida Siekmann hyppää kolmannesta kerroksesta ja kuolee, '
      + 'muurin ensimmäinen uhri. Betonimuuri seuraa piikkilankaa, ja se '
      + 'seisoo 28 vuotta.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-berliinin-muuri-1961-lahi-photo-v4.jpg',
        kuvateksti: 'Bernauer Straßella talon seinä kuului itään mutta '
          + 'jalkakäytävä länteen. Kuvituksen sisarukset ovat yhä '
          + 'huutoetäisyydellä, kun nuori poliisi kiristää lankaa heidän '
          + 'väliinsä; kukaan heistä ei vielä tiedä, että ovet ja ikkunat '
          + 'muurataan tulevina päivinä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Chronik der Mauer — 13 '
          + 'August 1961, tarkistettu 5.9.2026.',
        url: 'https://www.chronik-der-mauer.de/180100/mauerbau-13-august-1961',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-berliinin-muuri-1961-kauko-photo-v4.jpg',
        kuvateksti: 'Opiskelijan pyörä on samalla kadulla kuin eilen, mutta '
          + 'tie isän luo katkeaa betonipylväisiin ja piikkilankaan. Yli '
          + '10 000 poliisia, sotilasta ja taisteluryhmäläistä sulkee '
          + 'kaupungin rajan; nuorelle kaikki tiivistyy siihen, tunnistaako '
          + 'isä hänet väkijoukon toiselta puolelta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Chronik der Mauer — 13 '
          + 'August 1961, tarkistettu 5.9.2026.',
        url: 'https://www.chronik-der-mauer.de/180100/mauerbau-13-august-1961',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-berliinin-muuri-1961-lehti-photo-v4.jpg',
        kuvateksti: 'BILD tiivisti 14.8.1961 yön tapahtumat otsikkoon “Berlin — '
          + 'Panzer im Ostsektor”. Panssarit olivat totta, mutta Bernauer '
          + 'Straßella uutisen mitta oli pienempi: tuttu ikkuna, naapurin '
          + 'ääni ja perheenjäsen, jonka luo ei enää saanut ylittää katua.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Chronik der Mauer — 13 '
          + 'August 1961, tarkistettu 5.9.2026.',
        url: 'https://www.chronik-der-mauer.de/180100/mauerbau-13-august-1961',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Berliinin laatan päällä (0,6 yksikköä) ja '
      + 'Berliinin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Berliinin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'berliini' },
    lehtiJohdanto: 'Elokuun 1961 sunnuntaiaamuna berliiniläiset heräsivät '
      + 'ilmavasaroihin: kadun poikki vedettiin piikkilanka, ja Bernauer '
      + 'Straßella talon ovi ja sen edustan jalkakäytävä jäivät eri '
      + 'valtioihin.',
    lehtiTehtava: {
      kysymys: 'Mitä Walter Ulbricht oli sanonut kaksi kuukautta ennen rajan '
        + 'sulkemista?',
      vaihtoehdot: [
        'Että muuri rakennetaan syksyllä',
        'Että Länsi-Berliini liitetään DDR:ään',
        'Ettei kenelläkään ole aikomusta rakentaa muuria',
        'Että raja avataan kokonaan',
      ],
      oikea: 2,
      fakta: 'Ida Siekmann kuoli 22. elokuuta 1961 hypättyään kotinsa '
        + 'ikkunasta Bernauer Straßella — muurin ensimmäinen uhri.',
    },
  },
  /*
   * 41. SIKSTUKSEN KAPPELI 1510 — TELINEELLÄ, PÄÄ TAAKSEPÄIN.
   * Piste on Rooman laatan päällä (1,4 laudan yksikköä) ja kohdekartan
   * rajauksessa (Vatikaani). Vain Rooman kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Sikstus 1510").
   * Lähde: en.wikipedia.org: Sistine Chapel ceiling
   */
  {
    id: 'michelangelo-sikstus-1510',
    otsikko: 'Sikstuksen kappeli 1510 — giornata kerrallaan',
    nimio: 'Sikstus 1510',
    paivays: '1510',
    paikka: 'Sikstuksen kappeli, Vatikaani',
    iso: 'ITA',
    lat: 41.9031, lon: 12.4544,
    kuvaversio: 4,
    teksti: 'Niska ei enää suoristu illalla, ja maali tippuu silmille. '
      + 'Michelangelo Buonarroti seisoo — ei makaa, vaikka niin kerrotaan — '
      + 'telineellä pää taaksepäin taivutettuna ja maalaa Sikstuksen '
      + 'kappelin holvia. Paavi Julius II pakotti hänet työhön 1508, vaikka '
      + 'hän on kuvanveistäjä eikä freskomaalari; sopimus lupaa 3 000 '
      + 'dukaattia. Freskoa tehdään tuoreelle kalkkirappaukselle, giornata '
      + 'kerrallaan: apulainen levittää aamulla sen verran laastia kuin '
      + 'päivässä ehtii maalata, ja mikä ei ehdi, hakataan pois. Rappauksen '
      + 'kosteus tuo homeen, ja ensimmäiset kuukaudet joudutaan tekemään '
      + 'uudelleen. Syyskuussa 1510 holvin ensimmäinen puolisko, Nooan '
      + 'juopumuksesta Eevan luomiseen, on valmis, ja työ katkeaa: paavi on '
      + 'lähtenyt sotaan Bolognaan eikä maksa, eikä uutta telinettä ole. '
      + 'Puolisko paljastetaan yleisölle 15. elokuuta 1511. Toinen puoli, '
      + 'Aadamin luominen mukaan lukien, syntyy nopeammin ja suuremmin '
      + 'hahmoin, ja koko katto — yli 300 hahmoa — avataan pyhäinpäiväksi '
      + '1512. Michelangelo on 37.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-michelangelo-sikstus-1510-lahi-photo-v4.jpg',
        kuvateksti: 'Freskomaalarilla on vain märän rappauksen verran aikaa. '
          + 'Michelangelo kurottaa päivän uutta giornataa kohti, kun apulainen '
          + 'odottaa värikupin kanssa ja tarkkailee pinnan kuivumista; jos '
          + 'kalkki ehtii sitoutua, sävy ei enää uppoa seinään eikä virhettä '
          + 'voi peittää seuraavana aamuna.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Vatican Museums — Sistine '
          + 'Chapel ceiling, tarkistettu 5.9.2026.',
        url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/volta.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-michelangelo-sikstus-1510-kauko-photo-v4.jpg',
        kuvateksti: 'Vuonna 1510 vasta katon ensimmäinen puolisko on '
          + 'valmistumassa. Telineellä yksi mies levittää tuoretta '
          + 'pintalaastia, toinen nostaa vettä ja Michelangelo työskentelee '
          + 'pienellä alueella kerrallaan — valtava kertomus syntyy '
          + 'käytännössä ämpäri, sivellin ja niskaa jäytävä tunti kerrallaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Vatican Museums — Sistine '
          + 'Chapel ceiling, tarkistettu 5.9.2026.',
        url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina/volta.html',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Rooman laatan päällä (1,4 yksikköä) ja '
      + 'Rooman kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Rooman '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'rooma' },
    lehtiJohdanto: 'Vatikaanin kappelin holvin alla seisoi vuonna 1510 '
      + 'kuvanveistäjä, joka ei halunnut maalata, ja teki sen silti '
      + 'päivän laastiannos kerrallaan — neljä vuotta ja yli 300 hahmoa.',
    lehtiTehtava: {
      kysymys: 'Missä asennossa Michelangelo maalasi Sikstuksen kappelin '
        + 'kattoa?',
      vaihtoehdot: [
        'Selällään telineellä maaten',
        'Riippuen köysissä katosta',
        'Istuen tikkailla',
        'Seisten pää taaksepäin taivutettuna',
      ],
      oikea: 3,
      fakta: 'Katon ensimmäinen puolisko näytettiin 15. elokuuta 1511 ja '
        + 'koko holvi pyhäinpäivänä 1512; Michelangelo oli 37.',
    },
  },
  /*
   * 42. WIEN, KÄRNTNERTOR-TEATTERI 7.5.1824 — SÄVELTÄJÄ KÄÄNNETÄÄN.
   * Piste on Wienin laatan päällä (0,9 laudan yksikköä) ja kohdekartan
   * rajauksessa (Valtionoopperan vieressä). Vain Wienin kaupunkilehdessä
   * ja sen kohdekartalla (js/packs/maakartat.js "Yhdeksäs 1824").
   * Lähde: en.wikipedia.org: Symphony No. 9 (Beethoven)
   */
  {
    id: 'beethoven-yhdeksas-1824',
    otsikko: 'Kärntnertor 1824 — suosionosoitukset, joita ei kuule',
    nimio: 'Yhdeksäs 1824',
    paivays: '7.5.1824',
    paikka: 'Theater am Kärntnertor, Wien',
    iso: 'AUT',
    lat: 48.2033, lon: 16.3708,
    kuvaversio: 4,
    teksti: '”Kääntäkää hänet.” Kukaan ei tiedä, kuka sen sanoo, mutta Caroline '
      + 'Unger tekee sen. Wienin Kärntnertor-teatterissa on 7. toukokuuta '
      + '1824, ja yhdeksännen sinfonian viimeinen sointu on juuri vaiennut. '
      + 'Ludwig van Beethoven, 53, seisoo orkesterin edessä selin saliin ja '
      + 'lyö tahtia, sillä hän on lähes täysin kuuro eikä kuule, että teos '
      + 'on ohi. Kapellimestari Michael Umlauf on neuvonut soittajia '
      + 'seuraamaan häntä eikä säveltäjää; kaksi vuotta aiemmin hän näki '
      + 'Beethovenin Fidelio-harjoituksen romahtavan. Kaksikymmentävuotias '
      + 'alttolaulaja Unger ottaa säveltäjää hihasta ja kääntää hänet kohti '
      + 'yleisöä. Sali on jaloillaan: ihmiset heiluttavat hattuja ja '
      + 'nenäliinoja, jotta kuuro mies näkisi, mitä ei kuule. Ovaatioita '
      + 'tulee viisi. Yleisössä ovat Schubert, Czerny ja kansleri '
      + 'Metternich. Sinfonia on ensimmäinen, jossa suuri orkesteri saa '
      + 'rinnalleen kuoron ja solistit — Schillerin Oodi ilolle, tekstinä, '
      + 'jota Beethoven on kantanut mukanaan nuoruudestaan. Samassa '
      + 'konsertissa kuullaan Missa solemniksen kolme osaa. Sävel on nyt '
      + 'Euroopan hymni.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-beethoven-yhdeksas-1824-lahi-photo-v4.jpg',
        kuvateksti: 'Caroline Unger koskettaa Beethovenin hihaa ja kääntää '
          + 'hänet kohti salia. Säveltäjä ei kuule suosionosoituksia; hetken '
          + 'ajan hän joutuu lukemaan oman teoksensa vastaanoton kasvoista, '
          + 'kohoavista käsistä ja lattian värinästä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Beethoven-Haus Bonn — Ninth '
          + 'Symphony, tarkistettu 5.9.2026.',
        url: 'https://www.beethoven.de/en/g/bthvn2024',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-beethoven-yhdeksas-1824-kauko-photo-v4.jpg',
        kuvateksti: 'Orkesterin alttoviulisti pitää katseensa Umlaufin '
          + 'tahtipuikossa, vaikka Beethoven merkitsee vieressä tempoja koko '
          + 'kehollaan. Muusikot ovat sopineet seuraavansa varsinaista '
          + 'kapellimestaria — raskas mutta välttämätön ratkaisu, jotta kuuron '
          + 'säveltäjän valtava partituuri pysyy koossa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Beethoven-Haus Bonn — Ninth '
          + 'Symphony, tarkistettu 5.9.2026.',
        url: 'https://www.beethoven.de/en/g/bthvn2024',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Wienin laatan päällä (0,9 yksikköä) ja '
      + 'Wienin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Wienin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'wien' },
    lehtiJohdanto: 'Kärntnertor-teatterissa nousi toukokuussa 1824 sali '
      + 'seisomaan viisi kertaa, ja kuuro säveltäjä näki sen vasta, kun '
      + 'nuori alttolaulaja käänsi hänet yleisöön päin.',
    lehtiTehtava: {
      kysymys: 'Kuka johti yhdeksännen sinfonian kantaesityksen '
        + 'virallisesti?',
      vaihtoehdot: [
        'Beethoven itse',
        'Franz Schubert',
        'Kapellimestari Michael Umlauf',
        'Caroline Unger',
      ],
      oikea: 2,
      fakta: 'Umlauf oli neuvonut soittajia seuraamaan häntä eikä lähes '
        + 'kuuroa säveltäjää, joka löi tahtia lavan reunassa.',
    },
  },
  /*
   * 43. SOUTHWARK, SYYSKUU 1599 — JULIUS CAESAR GLOBESSA.
   * Piste on Lontoon laatan päällä (0,7 laudan yksikköä) ja kohdekartan
   * rajauksessa (Bankside). Vain Lontoon kaupunkilehdessä ja sen
   * kohdekartalla (js/packs/maakartat.js "Globe 1599").
   * Lähde: en.wikipedia.org: Globe Theatre
   */
  {
    id: 'shakespeare-globe-1599',
    otsikko: 'Globe 1599 — pihalla ei ole koskaan hiljaista',
    nimio: 'Globe 1599',
    paivays: '21.9.1599',
    paikka: 'Globe-teatteri, Southwark, Lontoo',
    iso: 'GBR',
    lat: 51.5067, lon: -0.0947,
    kuvaversio: 4,
    teksti: 'Pihalla ei ole koskaan hiljaista. Penniyleisö seisoo katsomon '
      + 'keskellä taivasalla, syö pähkinöitä, juo olutta ja huutaa '
      + 'näyttelijöille, ja näyttämön reunalla seisova poika, joka esittää '
      + 'Caesarin vaimoa, tietää, että hänen on puhuttava sen yli. '
      + 'Southwarkissa Thamesin etelärannalla on syyskuu 1599. Globe on '
      + 'rakennettu samana vuonna puusta, joka purettiin talvella '
      + 'Shoreditchin vanhasta The Theatre -näyttämöstä, kun vuokraisäntä '
      + 'yritti pitää rakennuksen itsellään; Burbagen veljekset omistavat '
      + 'siitä puolet ja William Shakespeare kahdeksasosan. Katsojia mahtuu '
      + 'noin 3 000. Baselilainen Thomas Platter kirjoittaa 21. syyskuuta '
      + 'nähneensä täällä Julius Caesarin ja lopuksi tanssin; se on '
      + 'ensimmäinen varma tieto Globen esityksestä. Naisia ei näyttämöllä '
      + 'ole — Portian, Calpurnian ja Kleopatran roolit puhuvat '
      + 'äänenmurroksen kynnyksellä olevat pojat. Teatteri palaa 29. '
      + 'kesäkuuta 1613, kun tykki sytyttää olkikaton kesken Henrik VIII:n; '
      + 'ainoa vahinko on mies, jonka palavat housut sammutetaan oluella.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-shakespeare-globe-1599-lahi-photo-v4.jpg',
        kuvateksti: 'Nuori poikanäyttelijä astuu Calpurniana näyttämölle, vain '
          + 'käsivarren mitan päähän äänekkäistä pihakatsojista. Hänen on '
          + 'saatava Caesarin paha uni kuuluviin ilman mikrofonia, kulisseja '
          + 'tai naamiota; yhdellä väärällä hengityksellä penniyleisö ehtii jo '
          + 'vastata takaisin.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Shakespeare\'s Globe — '
          + 'history of the Globe Theatre, tarkistettu 5.9.2026.',
        url: 'https://www.shakespearesglobe.com/discover/about-us/globe-theatre/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-shakespeare-globe-1599-kauko-photo-v4.jpg',
        kuvateksti: 'Sveitsiläinen Thomas Platter kertoi ylittäneensä Thamesin '
          + 'noin kahdelta ja nähneensä Julius Caesarin viidentoista '
          + 'näyttelijän voimin. Pihalla tarina ei ollut hiljainen pyhä '
          + 'toimitus: katsojat söivät, kommentoivat ja väistelivät toisiaan '
          + 'samalla kun näyttelijät yrittivät pitää koko avoimen talon '
          + 'otteessaan.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Shakespeare\'s Globe — '
          + 'history of the Globe Theatre, tarkistettu 5.9.2026.',
        url: 'https://www.shakespearesglobe.com/discover/about-us/globe-theatre/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Lontoon laatan päällä (0,7 yksikköä) ja '
      + 'Lontoon kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Lontoon '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'lontoo' },
    lehtiJohdanto: 'Thamesin etelärannalle nousi 1599 vanhan teatterin '
      + 'hirsistä pyöreä puutalo, jossa penniyleisö seisoi taivasalla ja '
      + 'pojat näyttelivät naisia — ja sveitsiläinen matkailija kirjoitti '
      + 'nähneensä siellä Julius Caesarin.',
    lehtiTehtava: {
      kysymys: 'Mistä Globe-teatterin rakennuspuu oli peräisin?',
      vaihtoehdot: [
        'Kuninkaan laivastotelakalta',
        'Shoreditchin vanhasta The Theatre -näyttämöstä',
        'Norjasta tuoduista tukeista',
        'Puretusta Southwarkin luostarista',
      ],
      oikea: 1,
      fakta: 'Globe paloi 29. kesäkuuta 1613, kun näytelmän tykki sytytti '
        + 'olkikaton; se rakennettiin uudelleen seuraavana vuonna.',
    },
  },
  /*
   * 44. WIEN, BURGTHEATER 1.5.1786 — FIGARON HÄÄT.
   * Piste on Wienin laatan päällä (1,1 laudan yksikköä) ja kohdekartan
   * rajauksessa (vanha Burgtheater Michaelerplatzilla, Hofburgin
   * vieressä). Vain Wienin kaupunkilehdessä ja sen kohdekartalla
   * (js/packs/maakartat.js "Figaro 1786").
   * Lähde: en.wikipedia.org: The Marriage of Figaro
   */
  {
    id: 'mozart-wien-1786',
    otsikko: 'Burgtheater 1786 — palvelijat nolaavat isäntänsä',
    nimio: 'Figaro 1786',
    paivays: '1.5.1786',
    paikka: 'Burgtheater, Wien',
    iso: 'AUT',
    lat: 48.2078, lon: 16.3665,
    kuvaversio: 4,
    teksti: 'Partituurin muste on tuskin kuivunut, kun cembalo aloittaa. '
      + 'Wienin Burgtheaterissa on 1. toukokuuta 1786, ja Wolfgang Amadeus '
      + 'Mozart, 30, johtaa Figaron häitä soittimensa äärestä, kuten tapa '
      + 'on. Ooppera perustuu Beaumarchais\'n näytelmään, jonka keisari '
      + 'Joosef II on kieltänyt Wienin näyttämöiltä, koska siinä palvelija '
      + 'nolaa isäntänsä; Lorenzo Da Ponte kirjoitti libreton kuudessa '
      + 'viikossa, poisti poliittiset puheet ja sai keisarilta luvan '
      + 'oopperalle. Susannaa laulaa englantilainen Nancy Storace, Figaroa '
      + 'Francesco Benucci. Yleisö vaatii ensi-iltana viisi numeroa '
      + 'uudelleen ja toisessa esityksessä seitsemän, kunnes keisari '
      + 'määrää, ettei useamman laulajan numeroita saa toistaa — esitys '
      + 'venyy muuten yöhön. Mozart on saanut työstä 450 floriinia, kolme '
      + 'kertaa Salzburgin hovimuusikon vuosipalkan. Esityksiä tulee '
      + 'Wienissä yhdeksän, eikä menestys ole valtava. Prahassa ooppera '
      + 'villitsee talvella koko kaupungin, ja sen ihailijat maksavat '
      + 'Mozartin matkan sinne tammikuussa 1787. Siitä syntyy tilaus Don '
      + 'Giovannille.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-mozart-wien-1786-lahi-photo-v4.jpg',
        kuvateksti: 'Anna Storace odottaa Susannan seuraavaa repliikkiä ja '
          + 'etsii Mozartin katseesta sisääntulon. Cembalon äärestä johtava '
          + 'säveltäjä voi auttaa vain pienellä nyökkäyksellä — näyttämöllä '
          + 'laulajan on muutettava kuukausien hovijuorut, peruutukset ja '
          + 'harjoitukset yhdeksi vaivattomalta kuulostavaksi lauseeksi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Mozarteum — Le nozze di '
          + 'Figaro critical edition, tarkistettu 5.9.2026.',
        url: 'https://dme.mozarteum.at/DME/objs/pdf/nma_305_-30_-3_eng.pdf',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-mozart-wien-1786-kauko-photo-v4.jpg',
        kuvateksti: 'Mozart johtaa Figaron kahta ensimmäistä esitystä '
          + 'cembalosta, keskellä laulajia, soittajia ja pienen hoviteatterin '
          + 'tiivistä yleisöä. Parterren nuori nuotinkääntäjä kuulee salin '
          + 'naurun siirtyvän kohtauksesta toiseen ja tajuaa ennen '
          + 'arvostelijoita, että yleisö seuraa palvelijoiden juonta yhtä '
          + 'tarkasti kuin aatelisia.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Mozarteum — Le nozze di '
          + 'Figaro critical edition, tarkistettu 5.9.2026.',
        url: 'https://dme.mozarteum.at/DME/objs/pdf/nma_305_-30_-3_eng.pdf',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Wienin laatan päällä (1,1 yksikköä) ja '
      + 'Wienin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Wienin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'wien' },
    lehtiJohdanto: 'Hofburgin vieressä sijainneessa hoviteatterissa '
      + 'kantaesitettiin toukokuussa 1786 ooppera kielletystä näytelmästä, '
      + 'ja yleisö vaati numeroita uusiksi niin, että keisarin oli '
      + 'puututtava asiaan.',
    lehtiTehtava: {
      kysymys: 'Miksi keisari Joosef II rajoitti Figaron häiden '
        + 'uusintapyyntöjä?',
      vaihtoehdot: [
        'Esitys venyi toistojen takia liian pitkäksi',
        'Hän piti oopperaa kumouksellisena',
        'Laulajat vaativat lisäpalkkaa',
        'Da Ponte oli loukannut häntä',
      ],
      oikea: 0,
      fakta: 'Mozart johti kaksi ensimmäistä esitystä cembalon äärestä ja sai '
        + 'työstä 450 floriinia.',
    },
  },
  /*
   * 45. WITTENBERG 31.10.1517 — KIRJE ARKKIPIISPALLE.
   * Lähin kohdekaupunki Berliini 39 laudan yksikön päässä — oma merkki
   * kartalle. Wittenbergillä ei ole kaupunkilehteä, joten sivu on Saksan
   * maalehdessä.
   * Lähde: en.wikipedia.org: Ninety-five Theses, Martin Luther
   */
  {
    id: 'luther-wittenberg-1517',
    otsikko: 'Wittenberg 1517 — kuka tämän oikein lukee?',
    nimio: 'Luther 1517',
    paivays: '31.10.1517',
    paikka: 'Wittenberg, Saksi',
    iso: 'DEU',
    lat: 51.8664, lon: 12.6378,
    kuvaversio: 4,
    teksti: 'Kuka tämän oikein lukee? Martti Luther, 33, Wittenbergin '
      + 'yliopiston teologian professori, taittaa 31. lokakuuta 1517 '
      + 'kirjeen Mainzin arkkipiispa Albrechtille ja liittää mukaan 95 '
      + 'väitettä — teesiä — anekaupasta. Johann Tetzel myy lähikaupungeissa '
      + 'aneita, joilla rahoitetaan Rooman Pietarinkirkkoa ja Albrechtin omaa '
      + 'virkavelkaa, ja Lutherin seurakuntalaiset palaavat ostoksilta '
      + 'uskoen, ettei heidän tarvitse enää katua. Kirje on kohtelias; se '
      + 'olettaa arkkipiispan olevan tietämätön saarnaajiensa puheista. '
      + 'Teesit on kirjoitettu latinaksi, oppineiden väittelyä varten. Se, '
      + 'naulasiko Luther ne samana päivänä linnankirkon oveen, on Philipp '
      + 'Melanchthonin myöhempi kertomus, ja Luther itse sanoi aina '
      + 'edenneensä virkatietä. Ratkaisevaa on painokone: teesit painetaan '
      + 'Baselissa, Leipzigissä ja Nürnbergissä vielä samana vuonna, ja '
      + 'saksannos kiertää käsin kopioituna. Albrecht lähettää ne Roomaan. '
      + 'Vuonna 1521 paavi julistaa Lutherin pannaan, ja samana keväänä hän '
      + 'seisoo Wormsin valtiopäivillä keisarin edessä kieltäytyen '
      + 'perumasta. Kysymykseen vastaa lopulta koko Eurooppa.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-luther-wittenberg-1517-lahi-photo-v4.jpg',
        kuvateksti: 'Luther sinetöi teesinsä arkkipiispa Albrechtille, ja nuori '
          + 'yliopiston lähetti odottaa oven luona. Kumpikaan ei vielä kanna '
          + '“uskonpuhdistajan” roolia: pöydällä on professorin kutsu '
          + 'väittelyyn ja käytävällä mies, jonka tehtävä on vain saada kirje '
          + 'perille.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Luther.de — the posting of '
          + 'the theses, tarkistettu 5.9.2026.',
        url: 'https://www.luther.de/en/legenden/tanschl.html',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-luther-wittenberg-1517-kauko-photo-v4.jpg',
        kuvateksti: 'Linnankirkon ovi toimi yliopiston ilmoitustauluna, joten '
          + 'avustajan kiinnittämä väittelykutsu ei välttämättä pysäytä montaa '
          + 'ohikulkijaa. Emme tiedä varmasti, kiinnitettiinkö juuri nämä '
          + 'teesit oveen 31. lokakuuta — niiden nopean leviämisen ratkaisi '
          + 'joka tapauksessa kirjapaino, ei vasaran ääni.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Luther.de — the posting of '
          + 'the theses, tarkistettu 5.9.2026.',
        url: 'https://www.luther.de/en/legenden/tanschl.html',
      },
    ],
    kartalla: true,
    lehti: { laji: 'maa', avain: 'DEU' },
    visa: {
      kysymys: 'Kenelle Luther lähetti 95 teesinsä 31. lokakuuta 1517?',
      vaihtoehdot: [
        'Paavi Leo X:lle Roomaan',
        'Mainzin arkkipiispa Albrechtille',
        'Keisari Kaarle V:lle',
      ],
      oikea: 1,
    },
    lehtiJohdanto: 'Elben rannan yliopistokaupungista lähti lokakuussa 1517 '
      + 'kohtelias kirje arkkipiispalle, ja sen liitteenä olleet 95 '
      + 'latinankielistä väitettä levisivät painettuina nopeammin kuin '
      + 'kukaan osasi odottaa.',
    lehtiTehtava: {
      kysymys: 'Mikä ratkaisi teesien nopean leviämisen?',
      vaihtoehdot: [
        'Linnankirkon oveen naulaaminen',
        'Arkkipiispan julkinen vastaus',
        'Keisarin kiertokirje',
        'Painokoneet Baselissa, Leipzigissä ja Nürnbergissä',
      ],
      oikea: 3,
      fakta: 'Naulaamisesta kertoi vasta Melanchthon myöhemmin; Luther itse '
        + 'sanoi edenneensä virkatietä.',
    },
  },
  /*
   * 46. PARIISI 14.7.1789 — BASTILJIN PORTTI AUKEAA.
   * Piste on Pariisin laatan päällä (1,3 laudan yksikköä) ja kohdekartan
   * rajauksessa (Place de la Bastille; sama piste kuin kohde "Bastilji").
   * Vain Pariisin kaupunkilehdessä ja sen kohdekartalla
   * (js/packs/maakartat.js "Bastilji 1789").
   * Lähde: en.wikipedia.org: Storming of the Bastille
   */
  {
    id: 'ranskan-vallankumous-bastilji-1789',
    otsikko: 'Bastilji 1789 — musketti ilman ruutia',
    nimio: 'Bastilji 1789',
    paivays: '14.7.1789',
    paikka: 'Bastilji, Pariisi',
    iso: 'FRA',
    lat: 48.8533, lon: 2.3692,
    kuvaversio: 4,
    teksti: 'Musketti painaa olkapäällä, mutta siihen ei ole ruutia. '
      + 'Pariisissa on 14. heinäkuuta 1789, ja aamulla väkijoukko on '
      + 'tyhjentänyt Invalidien sotilaskodin asevaraston: lähes 30 000 '
      + 'kivääriä, ei panoksia. Ruuti — 250 tynnyriä — on siirretty muutama '
      + 'päivä sitten Bastiljiin, keskiaikaiseen linnoitukseen '
      + 'Saint-Antoinen esikaupungin reunalle. Siksi kansa on siellä. '
      + 'Kuningas on erottanut suositun rahaministeri Neckerin, ja kaupungin '
      + 'ympärille on koottu joukkoja; Camille Desmoulins on huutanut '
      + 'Palais-Royalissa pöydältä, että verilöyly on tulossa. Bastiljissa '
      + 'on kuvernööri de Launay, 82 invalidisotilasta, 32 sveitsiläistä '
      + 'krenatööriä ja seitsemän vankia, joista neljä on väärentäjiä. '
      + 'Neuvottelut kestävät koko päivän. Iltapäivällä joukko pääsee '
      + 'ulkopihalle, varuskunta ampuu, ja lähes sata hyökkääjää kuolee. '
      + 'Kello viiden jälkeen de Launay antautuu; hänet raahataan '
      + 'kaupungintalolle ja surmataan matkalla. Linnoitus puretaan '
      + 'seuraavina kuukausina. Kolme päivää myöhemmin Ludvig XVI tulee '
      + 'Versailles\'sta Pariisin kaupungintalolle ja kiinnittää hattuunsa '
      + 'kaupungin sinipunaisen kokardin; Lafayette lisää siihen valkoisen, ja '
      + 'siitä tulee trikolori.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-ranskan-vallankumous-bastilji-1789-lahi-photo-v4.jpg',
        kuvateksti: 'Kuvituksen pariisilainen metallityöläinen on kantanut '
          + 'Invalidikirkolta hakemaansa muskettia tuntikausia, mutta ruutia '
          + 'hän etsii yhä. Kun Bastiljin portti viimein avautuu, voitonriemu '
          + 'sekoittuu pelkoon: savun takana odottaa piha, jolta äsken '
          + 'ammuttiin väkijoukkoon.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Musée Carnavalet — Taking of '
          + 'the Bastille, tarkistettu 5.9.2026.',
        url: 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/prise-de-la-bastille-le-14-juillet-1789-1',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-ranskan-vallankumous-bastilji-1789-kauko-photo-v4.jpg',
        kuvateksti: 'Vankilan sveitsiläinen sotilas laskee aseensa ja yrittää '
          + 'kadota sisäpihan reunaan ennen kuin virta saavuttaa hänet. '
          + 'Portista tuleville pariisilaisille Bastilji on sortovallan linna; '
          + 'hänelle se on paikka, jossa univormu voi yhtäkkiä tehdä ihmisestä '
          + 'vihollisen.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Musée Carnavalet — Taking of '
          + 'the Bastille, tarkistettu 5.9.2026.',
        url: 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/prise-de-la-bastille-le-14-juillet-1789-1',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (1,3 yksikköä) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Saint-Antoinen esikaupungin reunalla seisoi heinäkuussa '
      + '1789 linnoitus, jossa oli seitsemän vankia ja 250 tynnyriä '
      + 'ruutia — ja juuri ruudin takia väkijoukko tuli sen porteille.',
    lehtiTehtava: {
      kysymys: 'Miksi pariisilaiset marssivat Bastiljiin 14. heinäkuuta '
        + '1789?',
      vaihtoehdot: [
        'Vapauttamaan satoja poliittisia vankeja',
        'Hakemaan ruutia Invalidien musketteihin',
        'Vangitsemaan kuninkaan',
        'Polttamaan verokirjat',
      ],
      oikea: 1,
      fakta: 'Vankeja oli seitsemän; kuvernööri de Launay antautui kello '
        + 'viiden jälkeen ja surmattiin matkalla kaupungintalolle.',
    },
  },
  /*
   * 47. ATEENA, PANATHINAIKO 10.4.1896 — MARATONIN VOITTAJA SAAPUU.
   * Piste on Ateenan laatan päällä (0,1 laudan yksikköä) ja kohdekartan
   * rajauksessa (Kallimarmaro-stadion). Vain Ateenan kaupunkilehdessä ja
   * sen kohdekartalla (js/packs/maakartat.js "Louis 1896").
   * Lähde: en.wikipedia.org: 1896 Summer Olympics, Spyridon Louis
   */
  {
    id: 'olympia-ateena-1896',
    otsikko: 'Panathinaiko 1896 — jalat jatkavat, kun pää ei tiedä',
    nimio: 'Louis 1896',
    paivays: '10.4.1896',
    paikka: 'Panathinaiko-stadion, Ateena',
    iso: 'GRC',
    lat: 37.9683, lon: 23.7411,
    kuvaversio: 4,
    teksti: 'Jalat ovat pölyn peitossa, ja ne jatkavat, vaikka pää ei enää '
      + 'tiedä, missä on. Spyridon Louis, 23-vuotias vedenkantaja Marousin '
      + 'kylästä Ateenan pohjoispuolelta, on juossut noin 40 kilometriä '
      + 'Marathonin kylästä ja saapuu 10. huhtikuuta 1896 '
      + 'Panathinaiko-stadionin marmoriportista sisään ensimmäisenä. '
      + 'Katsomossa on kymmeniätuhansia — enemmän kuin missään '
      + 'urheilutapahtumassa koskaan —, ja kuningas Yrjö I nousee '
      + 'seisomaan. Kruununprinssi Konstantin ja prinssi Yrjö juoksevat '
      + 'viimeisen kierroksen hänen vierellään. Aika on 2.58.50. Maratonia '
      + 'ei ole koskaan aiemmin juostu: ranskalainen kielitieteilijä Michel '
      + 'Bréal ehdotti kilpailua Feidippideen tarinan mukaan ja lahjoitti '
      + 'voittajalle hopeamaljan. Kreikka on hävinnyt ensimmäisten '
      + 'nykyaikaisten olympialaisten juoksulajit amerikkalaisille, ja tämä '
      + 'yksi voitto on se, jota koko kaupunki odotti. Louis ei enää '
      + 'kilpaile; kerrotaan, että hän pyysi palkinnoksi hevosen ja kärryt '
      + 'vesikuljetuksiinsa. Kolmanneksi tullut Spyridon Belokas todetaan '
      + 'pian huijariksi — hän oli matkustanut osan matkaa vaunuissa.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-olympia-ateena-1896-lahi-photo-v4.jpg',
        kuvateksti: 'Spyridon Louis kuulee stadionin huudon ennen kuin ehtii '
          + 'nähdä marmorikatsomot. Kruununprinssi Konstantin ja prinssi Yrjö '
          + 'juoksevat hänen rinnalleen; 23-vuotiaan vedenkantajan on enää '
          + 'pysyttävä jaloillaan kierros, jonka jokainen askel näyttää koko '
          + 'Ateenan yhteiseltä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Olympic World Library — '
          + 'Athens 1896 report, tarkistettu 5.9.2026.',
        url: 'https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=2435580&parentDocumentId=2435579&skipCopyright=true&skipWatermark=true',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-olympia-ateena-1896-kauko-photo-v4.jpg',
        kuvateksti: 'Louisin isä murtautuu radan reunalle ja etsii poikansa '
          + 'pölyisiä kasvoja kahden prinssin välistä. Kuusikymmentätuhantinen '
          + 'stadion juhlii Kreikan voittoa, mutta isälle väkijoukon keskellä '
          + 'on vain yksi tärkeä kysymys: hengittääkö Spyros vielä '
          + 'tasaisesti.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Olympic World Library — '
          + 'Athens 1896 report, tarkistettu 5.9.2026.',
        url: 'https://library.olympics.com/digitalCollection/DigitalCollectionAttachmentDownloadHandler.ashx?documentId=2435580&parentDocumentId=2435579&skipCopyright=true&skipWatermark=true',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Ateenan laatan päällä (0,1 yksikköä) ja '
      + 'Ateenan kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Ateenan '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'ateena' },
    lehtiJohdanto: 'Marmoristadionille juoksi huhtikuussa 1896 Marousin '
      + 'vedenkantaja kahden prinssin saattamana, ja ensimmäisten '
      + 'nykyaikaisten olympialaisten isäntämaa sai voiton, jota se oli '
      + 'odottanut koko kisojen ajan.',
    lehtiTehtava: {
      kysymys: 'Kuka ehdotti maratonjuoksua vuoden 1896 olympialaisiin?',
      vaihtoehdot: [
        'Pierre de Coubertin',
        'Kruununprinssi Konstantin',
        'Kielitieteilijä Michel Bréal',
        'Spyridon Louis itse',
      ],
      oikea: 2,
      fakta: 'Bréal lahjoitti voittajalle hopeamaljan; Louisin aika oli '
        + '2.58.50, eikä hän kilpaillut enää koskaan.',
    },
  },
  /*
   * 48. HELSINKI, RUOTSALAINEN TEATTERI 4.11.1899 — SUOMI HERÄÄ.
   * Piste on Helsingin kohdekartan rajauksessa (Erottaja; 16 laudan
   * yksikköä Helsingin laatasta, joka on laudalla siirretty keskustasta).
   * Raamattu: kohdekartan rajauksen sisällä oleva nosto piirretään VAIN
   * kohdekartalle — sivu on Helsingin kaupunkilehdessä ja piste sen
   * kohdekartalla (js/packs/maakartat.js "Suomi herää 1899").
   * Lähde: en.wikipedia.org: Finlandia, Jean Sibelius
   */
  {
    id: 'sibelius-finlandia-1899',
    otsikko: 'Ruotsalainen teatteri 1899 — protesti, jota ei sanota ääneen',
    nimio: 'Suomi herää 1899',
    paivays: '4.11.1899',
    paikka: 'Ruotsalainen teatteri, Helsinki',
    iso: 'FIN',
    lat: 60.1672, lon: 24.9433,
    kuvaversio: 4,
    teksti: 'Kello lähestyy iltaa Ruotsalaisessa teatterissa Helsingissä 4. '
      + 'marraskuuta 1899, ja salissa istuvat ne, joiden lehtiä keisarillinen '
      + 'sensuuri on juuri lakkauttanut. Lehdistön päivien juhlaa vietetään '
      + 'virallisesti sanomalehtimiesten eläkekassan hyväksi; oikeasti se on '
      + 'protesti helmikuun manifestia vastaan, jolla Nikolai II on alkanut '
      + 'supistaa Suomen autonomiaa. Ohjelmassa on kuusi historiallista '
      + 'kuvaelmaa Väinämöisestä isoonvihaan, ja jokaiseen niistä Jean '
      + 'Sibelius, 33, on kirjoittanut musiikin. Viimeinen on nimeltään '
      + 'Suomi herää. Sen loppuun hän on säveltänyt rauhoittuvan hymnin, '
      + 'jota yleisö luulee vanhaksi kansansävelmäksi; se on hänen omansa. '
      + 'Sensori istuu salissa eikä voi kieltää kuvaelmaa, joka ei sano '
      + 'mitään suoraan. Seuraavana vuonna Sibelius muokkaa kaksi viimeistä '
      + 'osaa itsenäiseksi sävelrunoksi, joka esitetään heinäkuussa 1900 '
      + 'Helsingissä ja viedään Robert Kajanuksen orkesterin kanssa Pariisin '
      + 'maailmannäyttelyyn nimellä Finlandia. Venäjän vallan alla sitä '
      + 'soitetaan peitenimillä, kuten Iloisia tunnelmia Suomen kevään '
      + 'heräämisestä. Sanat hymniin kirjoittaa V. A. Koskenniemi vasta 1941.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-sibelius-finlandia-1899-lahi-photo-v4.jpg',
        kuvateksti: 'Jean Sibelius nostaa tahtipuikon viimeiseen kuvaelmaan, '
          + 'mutta eturivin nuori toimittaja kuuntelee myös salin '
          + 'hiljaisuutta. Hänen lehtensä voidaan lakkauttaa seuraavaksi; '
          + 'siksi “Suomi herää” tuntuu enemmän tunnussanalta kuin pelkältä '
          + 'ohjelmanumerolta.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Sibelius.fi — Finlandia, '
          + 'tarkistettu 5.9.2026.',
        url: 'https://sibelius.fi/de/die-musik/orchesterwerke/finlandia/',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-sibelius-finlandia-1899-kauko-photo-v4.jpg',
        kuvateksti: 'Orkesterin nuotinkääntäjä tietää, ettei illan protestia '
          + 'lausuta suoraan. Se piilotetaan kuuteen historialliseen '
          + 'kuvaelmaan, näyttämön eleisiin ja Sibeliuksen musiikkiin — niin, '
          + 'että täysi sali ymmärtää ja sensuurin edustaja joutuu '
          + 'teeskentelemään, ettei ymmärrä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Sibelius.fi — Finlandia, '
          + 'tarkistettu 5.9.2026.',
        url: 'https://sibelius.fi/de/die-musik/orchesterwerke/finlandia/',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Helsingin kohdekartan rajauksessa '
      + '(Erottaja; 16 yksikköä laatasta, joka on laudalla siirretty '
      + 'keskustasta): kohdekartan rajauksen sisällä oleva nosto ei ole '
      + 'pääkartalla (Raamattu, omistaja 2.9.2026 ilta) vaan Helsingin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'helsinki' },
    lehtiJohdanto: 'Erottajan teatterissa esitettiin marraskuussa 1899 kuusi '
      + 'historiallista kuvaelmaa sanomalehtimiesten eläkekassan hyväksi — '
      + 'ja sensori joutui kuuntelemaan protestia, jota kukaan ei sanonut '
      + 'ääneen.',
    lehtiTehtava: {
      kysymys: 'Millä nimellä Finlandiaa soitettiin Venäjän vallan aikana '
        + 'sensuurin välttämiseksi?',
      vaihtoehdot: [
        'Karjalan sarja',
        'Keisarin marssi',
        'Iloisia tunnelmia Suomen kevään heräämisestä',
        'Väinämöisen laulu',
      ],
      oikea: 2,
      fakta: 'Sävelruno kantaesitettiin itsenäisenä teoksena heinäkuussa '
        + '1900; hymnin sanat V. A. Koskenniemi kirjoitti 1941.',
    },
  },
  /*
   * 49. PARIISI, GRAND CAFÉ 28.12.1895 — SEINÄ MUUTTUU IKKUNAKSI.
   * Piste on Pariisin laatan päällä (1,1 laudan yksikköä) ja kohdekartan
   * rajauksessa (Boulevard des Capucines). Vain Pariisin
   * kaupunkilehdessä ja sen kohdekartalla (js/packs/maakartat.js
   * "Lumière 1895"). Kolmas kuva on Le Radical -lehden sivu
   * (HETKI_LEHTIKUVAT; nimetty lehden mukaan).
   * Lähde: en.wikipedia.org: Salon Indien du Grand Café, Lumière
   * brothers
   */
  {
    id: 'lumiere-elokuva-1895',
    otsikko: 'Grand Café 1895 — miten seinä voi liikkua?',
    nimio: 'Lumière 1895',
    paivays: '28.12.1895',
    paikka: 'Salon Indien du Grand Café, Pariisi',
    iso: 'FRA',
    lat: 48.8703, lon: 2.3294,
    kuvaversio: 4,
    teksti: 'Miten seinä voi liikkua? Grand Cafén kellarisalissa Boulevard '
      + 'des Capucines\'illa, Pariisissa, on 28. joulukuuta 1895, ja muutama '
      + 'kymmenen ihmistä on maksanut frangin nähdäkseen jotakin, jota '
      + 'mainoksessa kutsutaan Cinématographeksi. Valkokankaalla Lumièren '
      + 'tehtaan portti Lyonissa aukeaa, ja työläiset kävelevät ulos, naiset '
      + 'hameissaan, pyörä, koira. Kuva on 46 sekuntia pitkä. Kymmenen '
      + 'filmiä kestää yhteensä noin kaksikymmentä minuuttia, ja niiden '
      + 'joukossa on puutarhuri, joka kastelee itsensä letkulla — '
      + 'ensimmäinen elokuvavitsi. Auguste ja Louis Lumière ovat '
      + 'valokuvalevytehtailijoita Lyonista; heidän laitteensa, patentoitu '
      + 'helmikuussa 1895, sekä kuvaa, kopioi että heijastaa, ja sitä '
      + 'pyöritetään käsin. He olivat esittäneet filmejä jo maaliskuussa '
      + 'tiedeyleisölle, mutta tämä on ensimmäinen maksullinen näytös. '
      + 'Yleisössä istuu taikuri Georges Méliès, joka yrittää heti ostaa '
      + 'laitteen; Lumièret kieltäytyvät ja sanovat, ettei keksinnöllä ole '
      + 'tulevaisuutta. Méliès rakentaa omansa ja keksii temppuelokuvan. '
      + 'Viikon päästä ovella jonottaa satoja, ja lehdet, Le Radical '
      + 'yhtenä, yrittävät selittää lukijoille, mitä liikkuva valokuva on.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-lumiere-elokuva-1895-lahi-photo-v4.jpg',
        kuvateksti: 'Georges Méliès nojautuu eteenpäin, kun valkokankaan '
          + 'tehdasportti aukeaa ja ihmiset kävelevät ulos kuin seinä olisi '
          + 'muuttunut ikkunaksi. Taikuri tietää katsovansa uutta temppua, '
          + 'mutta ei vielä sitä, että laite pakottaa hänet pian keksimään '
          + 'koko oman elokuvallisen maailmansa.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Institut Lumière — Musée '
          + 'Lumière, tarkistettu 5.9.2026.',
        url: 'https://www.institut-lumiere.org/musee-lumiere-fr',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-lumiere-elokuva-1895-kauko-photo-v4.jpg',
        kuvateksti: 'Koneen takana nuori avustaja pitää kammen tasaisena, '
          + 'vaikka 33 katsojan jokainen naurahdus ja henkäys kuuluu pimeässä '
          + 'kellarissa. Jos käsi nykäisee, kuva värisee; jos se pysyy '
          + 'rytmissä, valokuvan ihmiset jatkavat kävelemistä vielä senkin '
          + 'jälkeen, kun oikea hetki on jo ohi.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Institut Lumière — Musée '
          + 'Lumière, tarkistettu 5.9.2026.',
        url: 'https://www.institut-lumiere.org/musee-lumiere-fr',
      },
      {
        rooli: 'lehti',
        tiedosto: 'hetki-lumiere-le-radical-1895-lehti-photo-v4.jpg',
        kuvateksti: 'Lehden nimetön toimittaja yrittää selittää liikkuvaa kuvaa '
          + 'lukijoille, jotka eivät ole koskaan nähneet sellaista. Hän kutsuu '
          + 'laitetta valokuvauksen ihmeeksi ja takertuu yhteen lähes '
          + 'mahdottomalta tuntuvaan ajatukseen: kuolleen läheisen voisi '
          + 'jonain päivänä nähdä jälleen liikkeessä.',
        lahde: 'Matkakirjan havainnekuva. Faktat: Institut Lumière — Musée '
          + 'Lumière, tarkistettu 5.9.2026.',
        url: 'https://www.institut-lumiere.org/musee-lumiere-fr',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste on Pariisin laatan päällä (1,1 yksikköä) ja '
      + 'Pariisin kohdekartan rajauksessa: kaupungin laatan päälle osuva '
      + 'hetki ei ole pääkartalla (omistaja 3.9.2026) vaan Pariisin '
      + 'kohdekartan piste',
    lehti: { laji: 'kaupunki', avain: 'pariisi' },
    lehtiJohdanto: 'Boulevard des Capucines\'in kahvilan kellarissa muutama '
      + 'kymmenen ihmistä maksoi joulukuussa 1895 frangin ja näki tehtaan '
      + 'portin aukeavan valkokankaalla — yleisön joukossa taikuri, joka '
      + 'halusi heti ostaa koneen.',
    lehtiTehtava: {
      kysymys: 'Mitä Lumièren veljekset vastasivat Georges Mélièsille, kun '
        + 'tämä halusi ostaa Cinématographen?',
      vaihtoehdot: [
        'He myivät sen kaksinkertaiseen hintaan',
        'He kieltäytyivät ja sanoivat, ettei keksinnöllä ole tulevaisuutta',
        'He palkkasivat Mélièsin kuvaajakseen',
        'He lahjoittivat koneen Ranskan tiedeakatemialle',
      ],
      oikea: 1,
      fakta: 'Méliès rakensi oman laitteensa ja keksi temppuelokuvan; '
        + 'Lumièret keskittyivät myöhemmin värivalokuvaukseen.',
    },
  },
];

/** Hetket tunnuksen mukaan — kortti ja testit lukevat samasta paikasta. */
export const HISTORIAN_HETKET_ID = new Map(HISTORIAN_HETKET.map((h) => [h.id, h]));

/** Vain kartalle merkityt hetket, maakoodin mukaan ryhmiteltynä. */
export function hetketMaassa(iso) {
  return HISTORIAN_HETKET.filter((h) => h.kartalla && h.iso === iso);
}
