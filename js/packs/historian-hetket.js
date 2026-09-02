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
 * Tämä on H1-pilotti: kymmenen hetkeä meren ja löytöretkien piiristä.
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
 * paikka. Aamun sääntö kertoi, MILLOIN hetki ei saa omaa merkkiä
 * kaupungin laatan päälle; se ei tarkoittanut, että hetki katoaisi
 * kartalta kokonaan. Kymmenestä hetkestä kahdeksan oli jäänyt v1453:ssa
 * pelkkään lehteen, ja tarkennus palauttaa niistä kuusi kartalle —
 * kartalla on siis kahdeksan kymmenestä ja poikkeuksia kaksi.
 * Nykyinen jako:
 *
 *   `kartalla: true`   Hetki saa OMAN KOHDEMERKIN (tiimalasi)
 *                      tapahtumapaikkaan JA oman sivun lehteen. Tämä on
 *                      OLETUS: hetki on kartalla, ellei sitä voi
 *                      projisoida laudalle lainkaan.
 *   `kattoVapaa: true` Lisä `kartalla`-lipulle silloin, kun paikka on
 *                      alle kahdeksan yksikön päässä kohdekaupungista.
 *                      Kaupunkinostojen katto (js/fokuskohteet.js
 *                      karsiKaupunkiruuhka) pudottaisi merkin muuten
 *                      kaupungin kolmen noston joukosta. Merkki ei jää
 *                      laatan päälle: kasauspassi (js/fokusniput.js)
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
 * MINIVISA ON KARTAN HETKEN OSA, mutta kuudelta kartalle
 * palanneelta se puuttuu: visakysymykset kirjoittaa päätoimittaja
 * (docs/roolitus.md), eikä niitä keksitä koodierässä. Kortti toimii
 * ilman visaa (js/historian-hetket.js hetkiVisa palaa heti), ja
 * tests/historian-hetket.test.mjs pitää kirjaa siitä, keneltä visa
 * vielä puuttuu — lista tyhjenee itsestään, kun visa saapuu.
 *
 * `lehti`-kenttä kertoo, MIHIN lehteen sivu on kirjoitettu:
 * `{ laji: 'kaupunki', avain: <city.id> }` on kaupunkilehti
 * (js/packs/kulttuuri-kategoriat.js) ja `{ laji: 'maa', avain: <ISO3> }`
 * maalehti (js/packs/maa-kategoriat.js). Sivun tunnus on kummassakin
 * `hetki-<id>`, ja tests/historian-hetket.test.mjs tarkistaa, että
 * sivu on oikeasti olemassa ja että sen kuvat ja lähderivit ovat samat
 * kuin täällä.
 *
 * ── KAKSI KUVAA PER HETKI (omistaja 2.9.2026, klo 11 UTC) ──────────
 *
 * Jokaisesta kohtauksesta tulee KAKSI havainnekuvaa: LÄHIKUVA ihmisistä
 * tapahtuma taustalla (`rooli: 'lahi'`, tiedosto
 * `hetki-<id>-lahi.jpg`) ja KAUKOKUVA koko kohtauksesta
 * (`rooli: 'kauko'`, `hetki-<id>-kauko.jpg`). Siksi kuva ei ole yksi
 * kenttä vaan LISTA: `kuvat[0]` on sivun ja kortin pääkuva ja loput
 * selataan nuolilla sen perässä (sama malli kuin lehden noston
 * kuvagalleriassa, docs/moduulit/kaupunkilehti.md).
 *
 * ERÄ H1 (2.9.2026) oli tehty ennen linjausta: kymmenen tiedostoa
 * nimellä `hetki-<id>.jpg`, kaikki kaukokuvia, joten niiden rooli on
 * `kauko`. ERÄ H2 (2.9.2026 ilta) toi yhdeksän hyväksyttyä kuvaa, ja
 * ne kytkettiin kahdella tavalla:
 *
 *   KAUKO KORVATTIIN neljältä hetkeltä (Kolumbus, Magalhães, Cook,
 *   Amundsen): `tiedosto` osoittaa nyt uuteen `-kauko.jpg`-kuvaan, ja
 *   kuvateksti kirjoitettiin uusiksi sen mukaan, mitä uudessa kuvassa
 *   oikeasti näkyy. H1:n vanhat tiedostot jäävät ämpäriin, mutta
 *   niihin ei enää viitata.
 *   LÄHIKUVA LISÄTTIIN listan KÄRKEEN viidelle hetkelle (Darwin,
 *   Nansen, Trafalgar, Vasco da Gama, Amundsen) — lähikuva on
 *   omistajan nimeämä pääkuva, eikä koodiin tarvinnut koskea: kortti
 *   ja lehtisivu näyttävät aina listan ensimmäisen isona ja loput
 *   selattavina.
 *
 * Loput hetket odottavat yhä pariaan; niiden lista on yhden mittainen.
 *
 * ── KUVAT OVAT MATKAKIRJAN HAVAINNEKUVIA ───────────────────────────
 *
 * Kuvat eivät ole valokuvia vaan Matkakirjan itse koostamia
 * havainnekuvia, ja jokaisen kuvan `lahde` sanoo sen ääneen —
 * lähderivistä kasvaa pelissä painettava selite (js/havainnekuva.js).
 * Rivin loppuosa nimeää sen en-Wikipedian artikkelin, jota vasten
 * hetken faktat (päivämäärä, alukset, henkilöt, luvut) on tarkistettu.
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

/** Sallitut kuvaroolit: lähikuva ihmisistä ja kaukokuva kohtauksesta. */
export const HETKI_KUVAROOLIT = new Set(['lahi', 'kauko']);

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
   * 1. PALOS DE LA FRONTERA 3.8.1492.
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
    teksti: 'Aamu on juuri valjennut, ja Río Tinton suistossa vesi laskee — '
      + 'sitä on odotettu, sillä laskuvesi vie laivat merelle ilman soutua. '
      + 'Ankkurissa on kolme alusta: Santa María, pyöreärunkoinen nao, jonka '
      + 'omistaa Juan de la Cosa ja jota Kolumbus itse komentaa, sekä '
      + 'karavellit Pinta ja Niña. Niitä luotsaavat paikkakunnan omat '
      + 'merenkulkijat, veljekset Martín Alonso ja Vicente Yáñez Pinzón, '
      + 'jotka värväsivät miehistön naapureistaan Palosista ja Moguerista — '
      + 'laiturilla seisova väki tuntee lähtijät nimeltä. Kolme päivää '
      + 'myöhemmin Pintan peräsin murtuu, ja se korjataan Kanariansaarilla; '
      + 'vasta 6. syyskuuta laivat kääntyvät La Gomeralta länteen viiden '
      + 'viikon merimatkalle. Kukaan täällä ei tiedä, että Kolumbuksen '
      + 'laskelma maapallon koosta on rajusti pielessä ja että lännessä '
      + 'odottaa manner, jota kukaan ei osaa odottaa.',
    kuvat: [
      {
        rooli: 'kauko',
        tiedosto: 'hetki-kolumbus-palos-1492-kauko.jpg',
        kuvateksti: 'Kolme alusta odottaa ankkurissa Río Tinton suistossa '
          + 'aamuhämärässä: oikealla pyöreärunkoinen nao purjeet auki, kauempana '
          + 'kaksi pienempää karavellia. Soutuveneet kulkevat laivojen ja rannan '
          + 'väliä, ja vasemmalla mutarannalla seisoo kaupunkilaisia katsomassa '
          + 'lähtöä.',
        lahde: 'Matkakirjan havainnekuva: Kolumbuksen laivue lähdössä Palosista '
          + '3. elokuuta 1492. Faktat: en-Wikipedia "Voyages of Christopher '
          + 'Columbus", tarkistettu 2.9.2026.',
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
  },
  /*
   * 2. SANLÚCAR DE BARRAMEDA 20.9.1519.
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
    teksti: 'Laivasto tuli Sevillasta 10. elokuuta Guadalquivirjokea alas ja on '
      + 'maannut tässä jokisuussa yli viisi viikkoa: vettä, viiniä ja '
      + 'suolalihaa on lastattu viimeiseen asti. Nyt ankkurissa on viisi '
      + 'alusta — lippulaiva Trinidad, San Antonio, Concepción, Victoria ja '
      + 'Santiago — ja miehiä on noin 270. Rannalla liikkuu ontuen '
      + 'portugalilainen Fernão de Magalhães, jonka jalka jäi vialle '
      + 'Azemmourin taistelussa Marokossa 1513 ja joka purjehtii nyt Espanjan '
      + 'kuninkaan lipun alla; espanjalaiset kapteenit epäilevät häntä jo '
      + 'ennen lähtöä. Kukaan ei tiedä, että matka kestää kolme vuotta ja '
      + 'että Magalhães itse kaatuu Filippiineillä huhtikuussa 1521 eikä näe '
      + 'paluuta. Tähän samaan jokisuuhun palaa 6. syyskuuta 1522 yksi laiva, '
      + 'Victoria, ja sen kannella kahdeksantoista miestä — ensimmäiset, '
      + 'jotka ovat purjehtineet maapallon ympäri.',
    kuvat: [
      {
        rooli: 'kauko',
        tiedosto: 'hetki-magalhaes-sanlucar-1519-kauko.jpg',
        kuvateksti: 'Laivue laskee Guadalquivirin suuta kohti merta, kärjessä '
          + 'suuri nao purjeet auki ja soutuvene köysi kireällä sen keulan '
          + 'edessä. Oikealla rannalla seisoo kyläläisiä katsomassa, hiekalla '
          + 'lojuu köysikiekko, ja taustalla häämöttää valkoinen kaupunki.',
        lahde: 'Matkakirjan havainnekuva: Magalhãesin laivue Sanlúcar de '
          + 'Barramedassa 20. syyskuuta 1519. Faktat: en-Wikipedia "Magellan '
          + 'expedition", tarkistettu 2.9.2026.',
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
  },
  /*
   * 3. LISSABON, RESTELON RANTA 8.7.1497.
   * Lissabon 3 yksikön päässä, joten kaupunkikatto pudottaisi merkin →
   * `kattoVapaa`. Kaupunkilehden kohdekartta ei kelpaa: Belém on 5,5
   * kilometriä kartan länsipuolella (rajaus −9,1505…−9,118), eikä
   * rajausta voi venyttää sinne ilman että Lissabonin kartasta tulee
   * seitsemän kilometrin levyinen ja lukukelvoton.
   * Lähde: en.wikipedia.org: Vasco da Gama, Jerónimos Monastery
   */
  {
    id: 'vasco-da-gama-restelo-1497',
    otsikko: 'Restelon ranta 1497 — yö rukouksessa, aamu Intian tiellä',
    nimio: 'Restelo 1497',
    paivays: '8.7.1497',
    paikka: 'Restelon ranta, Lissabon',
    iso: 'PRT',
    lat: 38.6960, lon: -9.2050,
    teksti: 'Yö on vietetty polvillaan: Restelon kappelissa, jonka Henrik '
      + 'Purjehtija rakennutti merimiehiä varten ja joka on jo pahasti '
      + 'rapistunut, Vasco da Gama ja hänen miehensä ovat rukoilleet aamuun '
      + 'asti. Tejon suulla odottaa neljä alusta — da Gaman São Gabriel, '
      + 'hänen veljensä Paulon São Rafael, karavelli Bérrio ja nimetön '
      + 'varastolaiva, joka on määrä hylätä matkan varrella. Miehiä on noin '
      + '170, ja heistä palaa noin 55. Kukkulalla ei vielä ole luostaria: '
      + 'Jerónimos alkaa nousta vasta vuonna 1501, tämän matkan mausteilla '
      + 'ansaituilla tuloilla. Purjehdus, joka alkaa tästä rannasta, sisältää '
      + 'siihen mennessä pisimmän maihinnousuttoman avomerietapin: yli kolme '
      + 'kuukautta ja yli kymmenentuhatta kilometriä Etelä-Atlantin yli, '
      + 'ennen kuin Afrikan rannikko näkyy jälleen 4. marraskuuta.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-vasco-da-gama-restelo-1497-lahi.jpg',
        kuvateksti: 'Miehet polvistuvat rukoilemaan rantahiekalle, ja etualan '
          + 'mies puristaa rukousnauhaa pää painuksissa. Takana kohoaa valkoinen '
          + 'kappeli kellotorneineen, ja tyynellä lahdella odottaa ankkurissa '
          + 'laivue purjeet käärittyinä.',
        lahde: 'Matkakirjan havainnekuva: Vasco da Gaman laivue lähdössä '
          + 'Restelon rannalta 8. heinäkuuta 1497. Faktat: en-Wikipedia "Vasco '
          + 'da Gama" ja "Jerónimos Monastery", tarkistettu 2.9.2026.',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-vasco-da-gama-restelo-1497.jpg',
        kuvateksti: 'Miehet polvistuvat rantahiekalle valkoisen kappelin edessä, '
          + 'ja lastia soudetaan veneillä odottaville laivoille. Etualalla '
          + 'seisova viittaan pukeutunut mies katsoo merelle.',
        lahde: 'Matkakirjan havainnekuva: Vasco da Gaman laivue lähdössä '
          + 'Restelon rannalta 8. heinäkuuta 1497. Faktat: en-Wikipedia "Vasco '
          + 'da Gama" ja "Jerónimos Monastery", tarkistettu 2.9.2026.',
      },
    ],
    kartalla: true,
    kattoVapaa: true,
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
  },
  /*
   * 4. PLYMOUTH 26.8.1768 — KARTALLE.
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
    teksti: 'Laiturilla on laatikoita, joita sotalaivaan ei yleensä kanneta: '
      + 'kasvipuristimia, lasipurkkeja, verkkohäkkejä ja eläviä taimia '
      + 'ruukuissa. Ne kuuluvat 25-vuotiaalle Joseph Banksille, joka kustansi '
      + 'omasta pussistaan seitsemän seuralaisensa paikat — mukana ovat '
      + 'ruotsalainen Daniel Solander ja turkulaissyntyinen Herman Spöring. '
      + 'Alus on entinen Whitbyn hiililaiva Earl of Pembroke: laivasto osti '
      + 'sen keväällä, nimesi His Majesty’s Bark Endeavouriksi ja rakensi '
      + 'ruumaan kolmannen kannen hyteiksi ja ruutivarastoksi. Luutnantti '
      + 'James Cook, 39-vuotias, vie mukanaan kahdeksantoista kuukauden '
      + 'muonat 94 hengelle, kymmenen neljän naulan tykkiä, sikoja, kanoja, '
      + 'kaksi vinttikoiraa ja lypsyvuohen. Virallinen tehtävä on mitata '
      + 'Venuksen ylikulku Tahitilla; hytissä on lisäksi sinetöity kirje, '
      + 'jonka Cook saa avata vasta mittauksen jälkeen — käsky etsiä '
      + 'eteläiseltä Tyyneltämereltä tuntematonta mannerta.',
    kuvat: [
      {
        rooli: 'kauko',
        tiedosto: 'hetki-cook-endeavour-plymouth-1768-kauko.jpg',
        kuvateksti: 'Endeavour on jo irti laiturista ja kulkee ulos Plymouthin '
          + 'satamasta keulapurje auki. Kivilaiturilla seisoo kaupunkilaisia '
          + 'kolmikolkkahatuissa ja valkoisissa myssyissä, pikkuveneet saattavat '
          + 'laivaa, ja taustalla näkyy sataman matala talorivi.',
        lahde: 'Matkakirjan havainnekuva: HM Bark Endeavour lähdössä '
          + 'Plymouthista 26. elokuuta 1768. Faktat: en-Wikipedia "HMS '
          + 'Endeavour" ja "First voyage of James Cook", tarkistettu 2.9.2026.',
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
  },
  /*
   * 5. TRAFALGARIN NIEMEN EDUSTA 21.10.1805.
   * Lähin kohdekaupunki Tanger 18 yksikön päässä — oma merkki merelle
   * ja sivu Espanjan maalehteen.
   * Tapahtumapaikka on Espanjan rannikolla, joten sivu on Espanjan
   * maalehdessä (Tangerilla ei ole omaa kaupunkilehteä).
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
    teksti: 'Kello on hieman yli kaksitoista. Neljännestä vaille kaksitoista '
      + 'Nelson lähetti lippuviestin "England expects that every man will do '
      + 'his duty", ja puolelta päivin ranskalainen Fougueux ampui '
      + 'ensimmäisen laukauksensa. Victory on ajanut liittouman linjan läpi '
      + 'ja takertunut mastoistaan kiinni ranskalaiseen Redoutableen, jonka '
      + 'kannelle kokoontuu jalkaväkeä valtaamaan britti. Kansi on '
      + 'hiekoitettu, jottei veri tekisi lankuista liukkaita, ja tykkimiehet '
      + 'työskentelevät paitasillaan; peräkannella kävelee kaksi miestä '
      + 'edestakaisin kuten joka aamu, viceamiraali Horatio Nelson ja '
      + 'lippulaivan päällikkö Thomas Hardy. Hetken kuluttua Redoutablen '
      + 'mesaanimarsista ammuttu muskettiluoti osuu Nelsonia vasempaan '
      + 'olkapäähän ja läpäisee selkärangan; hän kuolee puoli viideltä, kolme '
      + 'tuntia myöhemmin, kun brittien 27 linjalaivaa ovat jo murtaneet '
      + 'liittouman 33 laivan rivin.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-trafalgar-victory-1805-lahi.jpg',
        kuvateksti: 'Nelson ja Hardy seisovat kasvokkain Victoryn kannella kesken '
          + 'keskustelun kaksikolkkahatut päässä. Nelsonin sinisessä takissa '
          + 'loistavat kunniamerkit ja rintatähti, ja taustalla miehistö '
          + 'työskentelee köysien ja kaiteen ääressä avomeren edessä.',
        lahde: 'Matkakirjan havainnekuva: Victoryn peräkansi Trafalgarin '
          + 'taistelussa 21. lokakuuta 1805 hetkeä ennen Nelsonin '
          + 'haavoittumista. Faktat: en-Wikipedia "Battle of Trafalgar", '
          + 'tarkistettu 2.9.2026.',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-trafalgar-victory-1805.jpg',
        kuvateksti: 'Nelson ja Hardy kävelevät Victoryn peräkannella savupilven '
          + 'alla, ja miehistö ahertaa tykkien ääressä heidän ympärillään. '
          + 'Oikealla kohoaa toisen laivan kylki tykkiportteineen aivan '
          + 'kiinni Victoryssa.',
        lahde: 'Matkakirjan havainnekuva: Victoryn peräkansi Trafalgarin '
          + 'taistelussa 21. lokakuuta 1805 hetkeä ennen Nelsonin '
          + 'haavoittumista. Faktat: en-Wikipedia "Battle of Trafalgar", '
          + 'tarkistettu 2.9.2026.',
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
  },
  /*
   * 6. SAN CRISTÓBAL (CHATHAM), GALÁPAGOS, SYYSKUU 1835.
   * TOINEN DOKUMENTOITU POIKKEUS (ks. `kartanUlkopuolella` alla):
   * saaristo on Ecuadorin fokuslehden ikkunan LÄNSIPUOLELLA, eikä
   * kohdekerros piirrä ikkunan ulkopuolelle mitään — merkki jäisi
   * laudan omaan grafiikkaan kiinni. Galápagosilla ei ole omaa
   * kaupunkilehteä eikä kohdekarttaa, joten sivu
   * avaa Ecuadorin maalehden (uusi maalehtiavain ECU).
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
    teksti: 'HMS Beagle saapui Galápagosille 15. syyskuuta 1835, ja seuraavana '
      + 'päivänä kapteeni FitzRoy laski ankkurin Chathamin saaren rantaan — '
      + 'sinne, missä nykyään on Puerto Baquerizo Morenon kaupunki. '
      + 'Ensimmäisen tuntinsa maissa Charles Darwin viettää Cerro '
      + 'Tijeretasin kalliolla: allaan mustaa laavaa, joka polttaa '
      + 'auringossa, ja ympärillään punaisia rapuja ja pensaikkoa, jota hän '
      + 'kutsuu muistiinpanoissaan surkeannäköiseksi. Darwin on 26-vuotias '
      + 'eikä kirjoita vielä sanaakaan lajien synnystä: hän merkitsee '
      + 'muistiin tulivuorenkartioita, jotka muistuttavat häntä '
      + 'Staffordshiren masuunien piipuista, kutsuu merileguaaneja pimeyden '
      + 'pikkupiruiksi ja pitää jättiläiskilpikonnia vedenpaisumusta '
      + 'vanhempina. Ratkaiseva havainto ei ole peippo vaan pilkkalintu: kun '
      + 'hän huomaa Charlesin saarelta saamansa linnun eroavan Chathamin '
      + 'yksilöstä, hän alkaa merkitä muistiin, miltä saarelta kukin lintu on '
      + 'pyydystetty. Beagle purjehtii Tahitille 20. lokakuuta, ja vasta '
      + 'merellä muistiinpanojaan lukiessaan Darwin hämmästyy: jokainen saari '
      + 'on oma muunnelmansa.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-darwin-galapagos-1835-lahi.jpg',
        kuvateksti: 'Darwin kyykistyy laavakivelle kasvotusten '
          + 'jättiläiskilpikonnan kanssa, ja eläin kurottaa kaulansa häntä kohti. '
          + 'Kädenmitan päässä kivellä lepää nahkakantinen muistikirja, ja '
          + 'lahdella HMS Beagle on ankkurissa kuivien pensaiden takana.',
        lahde: 'Matkakirjan havainnekuva: Charles Darwin Chathamin saarella '
          + 'Galápagosilla syyskuussa 1835. Faktat: en-Wikipedia "Second '
          + 'voyage of HMS Beagle", tarkistettu 2.9.2026.',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-darwin-galapagos-1835.jpg',
        kuvateksti: 'Darwin kyykistyy laavakivikolle vastapäätä '
          + 'jättiläiskilpikonnaa, ja etualan kivillä liikkuu punaisia rapuja. '
          + 'Lahdella HMS Beagle on ankkurissa, ja miehiä soutaa veneellä '
          + 'rantaan.',
        lahde: 'Matkakirjan havainnekuva: Charles Darwin Chathamin saarella '
          + 'Galápagosilla syyskuussa 1835. Faktat: en-Wikipedia "Second '
          + 'voyage of HMS Beagle", tarkistettu 2.9.2026.',
      },
    ],
    kartalla: false,
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'piste x = 2846 on Ecuadorin fokuslehden ikkunan '
      + '(x 2925–3533) länsipuolella, eikä kohdekerros piirrä ikkunan '
      + 'ulkopuolelle',
    lehti: { laji: 'maa', avain: 'ECU' },
  },
  /*
   * 7. KRISTIANIA (OSLO) 24.6.1893.
   * Oslo 1 yksikön päässä eli sama paikka, joten kaupunkikatto
   * pudottaisi merkin → `kattoVapaa`; kasauspassi latoo tiimalasin
   * kaupungin viereen siirtoviivan päähän. Piste osuisi myös Oslon
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
    teksti: 'Rantakadut ovat mustanaan väkeä, linnoitukselta ammutaan '
      + 'kunnialaukaukset, ja vuonolle liukuu alus, joka näyttää väärin '
      + 'rakennetulta. Fram on matala ja pyöreäpohjainen: Colin Archer '
      + 'suunnitteli sen niin, ettei jäällä ole mistään otetta, ja laivan on '
      + 'Nansenin omin sanoin määrä livahtaa jään syleilystä kuin ankerias. '
      + 'Runko on kolmea puukerrosta paksu — kuudestakymmenestä '
      + 'seitsemäänkymmeneen senttiä, keulassa runsaan metrin — ja '
      + 'päällystetty eteläamerikkalaisella greenheart-puulla, kovimmalla '
      + 'mitä on saatavissa. Kannella on kolmetoista miestä, heidän '
      + 'joukossaan 31-vuotias Fridtjof Nansen, ja suunnitelma on se, jota '
      + 'moni tutkija on julkisesti kutsunut itsemurhaksi: ajaa laiva '
      + 'tahallaan kiinni Siperian pohjoispuoliseen ahtojäähän ja antaa '
      + 'virran kuljettaa se kohti pohjoisnapaa. Fram palaa tähän samaan '
      + 'satamaan 9. syyskuuta 1896, eikä yhtään miestä ole menetetty.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-nansen-fram-1893-lahi.jpg',
        kuvateksti: 'Nansen nostaa hatun päänsä yläpuolelle Framin kannella ja '
          + 'katsoo rantaan, jossa väkijoukko täyttää laiturit ja veneet reunoja '
          + 'myöten. Vieressä mies kumartuu köysien ääreen, ja takana kohoaa '
          + 'aluksen savupiippu.',
        lahde: 'Matkakirjan havainnekuva: Fram lähdössä Kristianiasta '
          + '24. kesäkuuta 1893. Faktat: en-Wikipedia "Nansen\'s Fram '
          + 'expedition", tarkistettu 2.9.2026.',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-nansen-fram-1893.jpg',
        kuvateksti: 'Fram irtoaa laiturista Kristianiassa, ja rannalla seisova '
          + 'väkijoukko heiluttaa hattuja ja nenäliinoja. Nansen seisoo keulan '
          + 'puolella kannella käsi ylhäällä.',
        lahde: 'Matkakirjan havainnekuva: Fram lähdössä Kristianiasta '
          + '24. kesäkuuta 1893. Faktat: en-Wikipedia "Nansen\'s Fram '
          + 'expedition", tarkistettu 2.9.2026.',
      },
    ],
    kartalla: true,
    kattoVapaa: true,
    lehti: { laji: 'kaupunki', avain: 'oslo' },
    visa: {
      kysymys: 'Miksi Colin Archer suunnitteli Framin matalaksi ja pyöreäpohjaiseksi?',
      vaihtoehdot: [
        'Jotta se kulkisi Siperian jokisuistoissa',
        'Jotta ahtojää nostaisi sen ylös eikä murskaisi',
        'Jotta se olisi nopeampi purjeilla',
      ],
      oikea: 1,
    },
  },
  /*
   * 8. ETELÄNAPA 14.12.1911.
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
    teksti: 'Edellinen leiri oli 89°45′ eteläistä leveyttä, viidentoista '
      + 'meripeninkulman päässä maalista. Nyt kello on noin kolme '
      + 'iltapäivällä, mittaukset sanovat että tämä on paikka, ja viisi '
      + 'miestä tarttuu yhdessä lipputankoon: Roald Amundsen, Olav Bjaaland, '
      + 'Helmer Hanssen, Sverre Hassel ja Oscar Wisting. Ylätasangon he '
      + 'nimeävät kuningas Haakon VII:n tasangoksi. Seuraavat kolme päivää '
      + 'kuluvat sekstantin ääressä ja hiihtäen navan ympäri ristiin rastiin, '
      + 'jotta paikka olisi todistettavasti oikea — Cookin ja Pearyn riitaiset '
      + 'pohjoisnapaväitteet ovat tuoreessa muistissa, eikä Amundsen aio '
      + 'jättää itsestään samanlaista epäselvyyttä. Telttaan, jolle he '
      + 'antavat nimen Polheim, jää varusteita ja kirje Norjan kuninkaalle, '
      + 'ja sen viejäksi pyydetään Robert Scottia, joka saapuu paikalle 34 '
      + 'päivää myöhemmin. Koirat ovat syy siihen, että he ovat täällä '
      + 'ensimmäisinä: kahdeksantoista niistä nousi ylätasangolle, ja loput '
      + 'lopetettiin ruoaksi paikassa, jonka miehet nimesivät Teurastamoksi.',
    kuvat: [
      {
        rooli: 'lahi',
        tiedosto: 'hetki-amundsen-etelanapa-1911-lahi.jpg',
        kuvateksti: 'Kolme miestä pitää yhdessä kiinni lipputangosta, ja Norjan '
          + 'lippu sekä miesten turkislakit ovat huurteen peitossa. Kaksi toveria '
          + 'katsoo takaa olan yli, ja oikealla odottavat koirat reen vieressä.',
        lahde: 'Matkakirjan havainnekuva: Amundsenin retkikunta etelänavalla '
          + '14. joulukuuta 1911. Faktat: en-Wikipedia "Amundsen\'s South Pole '
          + 'expedition", tarkistettu 2.9.2026.',
      },
      {
        rooli: 'kauko',
        tiedosto: 'hetki-amundsen-etelanapa-1911-kauko.jpg',
        kuvateksti: 'Viisi turkisasuista miestä seisoo Norjan lipun ympärillä '
          + 'loputtomalla lumitasangolla. Koirat lepäävät lumessa kahden '
          + 'kuormatun reen välissä, ja horisontti häviää valkoiseen usvaan ilman '
          + 'ainuttakaan maamerkkiä.',
        lahde: 'Matkakirjan havainnekuva: Amundsenin retkikunta etelänavalla '
          + '14. joulukuuta 1911. Faktat: en-Wikipedia "Amundsen\'s South Pole '
          + 'expedition", tarkistettu 2.9.2026.',
      },
    ],
    kartalla: false,
    /*
     * AINOA DOKUMENTOITU POIKKEUS SÄÄNTÖÖN "nosto on aina jollain
     * kartalla" (tools/tarkista-nostopaikat.mjs). Piste on laudan
     * eteläreunan takana, eikä Norjaan sijoitettu tiimalasi olisi
     * hetken tapahtumapaikka vaan retkikunnan lähtömaa — väärä lupaus
     * kartalla. Sivu on Norjan maalehdessä.
     */
    kartanUlkopuolella: true,
    kartanUlkopuolellaSyy: 'etelänapa projisoituisi riville 7611, kun laudan '
      + 'korkeus on 5399 — Etelämannerta ei ole piirretty',
    lehti: { laji: 'maa', avain: 'NOR' },
  },
  /*
   * 9. SOUTHAMPTON 10.4.1912 — KARTALLE.
   * Lähin kohdekaupunki Lontoo 51 yksikön päässä (> 35).
   * Lähde: en.wikipedia.org: Titanic
   */
  {
    id: 'titanic-southampton-1912',
    otsikko: 'Southampton 1912 — metri törmäyksestä',
    nimio: 'Titanic 1912',
    paivays: '10.4.1912',
    paikka: 'Southampton, Englanti',
    iso: 'GBR',
    lat: 50.8998, lon: -1.4166,
    teksti: 'Matkustajat alkoivat saapua puoli kymmeneltä aamulla, kun Lontoon '
      + 'Waterloosta tullut laivajuna pysähtyi laiturille aivan Titanicin '
      + 'kylkeen. Southamptonista nousee kyytiin 920 matkustajaa: 179 '
      + 'ensimmäiseen luokkaan, 247 toiseen ja 494 kolmanteen. Neitsytmatka '
      + 'alkaa keskipäivällä aikataulun mukaan — ja muutamaa minuuttia '
      + 'myöhemmin melkein päättyy, kun Titanicin syrjäyttämä vesi nostaa '
      + 'kiinnitettynä makaavan New Yorkin ja pudottaa sen niin, että köydet '
      + 'katkeavat pamahdellen ja pienempi laiva kääntyy perä edellä '
      + 'Titanicia kohti. Kapteeni Smith käskee koneet täydelle taakse, '
      + 'hinaaja Vulcan saa köyden kiinni, ja alukset ohittavat toisensa '
      + 'noin metrin päästä; lähtö viivästyy tunnin. Neljästä savupiipusta '
      + 'vain kolme savuaa: takimmainen on koriste, jota käytetään keittiön '
      + 'ja tupakkasalonkien ilmanvaihtoon.',
    kuvat: [
      {
        rooli: 'kauko',
        tiedosto: 'hetki-titanic-southampton-1912.jpg',
        kuvateksti: 'Titanic irtoaa Southamptonin laiturista hinaajien '
          + 'avustamana, ja laiturille jääneet heiluttavat hattujaan. '
          + 'Etualalla odottavat matkatavaravaunut, hevonen ja auto.',
        lahde: 'Matkakirjan havainnekuva: Titanic lähdössä Southamptonista '
          + '10. huhtikuuta 1912. Faktat: en-Wikipedia "Titanic", tarkistettu '
          + '2.9.2026.',
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
  },
  /*
   * 10. ROSKILDENVUONO NOIN VUONNA 1000.
   * Kööpenhamina 18 yksikön päässä — oma merkki vuonolle ja sivu
   * Kööpenhaminan kaupunkilehteen.
   * Lähde: en.wikipedia.org: Skuldelev ships, Horned helmet
   */
  {
    id: 'viikinkilaiva-roskilde-1000',
    otsikko: 'Roskildenvuono noin 1000 — kuusikymmentä airoa',
    nimio: 'Roskilde 1000',
    paivays: 'n. 1000',
    paikka: 'Roskildenvuono, Tanska',
    iso: 'DNK',
    lat: 55.7500, lon: 12.0200,
    teksti: 'Vuono on matala ja mutkitteleva, ja miehet työntävät keulaa irti '
      + 'rantamudasta; airot ovat jo ulkona ja kilvet ripustettu laidalle '
      + 'matkan ajaksi. Purje on raidallista villaa, ja päähineet ovat '
      + 'huopaa ja nahkaa — sarvikypärä on 1800-luvun oopperalavojen keksintö '
      + 'eikä esiinny yhdessäkään viikinkiajan tekstissä tai löydössä. Juuri '
      + 'tällaisia laivoja tunnetaan tarkasti, koska viisi niistä upotettiin '
      + '1000-luvulla tähän samaan vuonoon sulkemaan Peberrendenin väylä, ja '
      + 'Tanskan kansallismuseo nosti ne pohjasta vuosina 1957–1962. Suurin, '
      + 'Skuldelev 2, on tammesta rakennettu kolmikymmenmetrinen sotalaiva: '
      + 'kuusikymmentä soutajaa, 112 neliömetrin purje, tilaa 70–80 miehelle '
      + 'ja vuosilustojen mukaan rakennuspaikka Dublinin seudulla noin vuonna '
      + '1042. Vuonna 2007 sen tarkka jäljennös Havhingsten fra Glendalough '
      + 'purjehti Roskildesta Dubliniin ja seuraavana kesänä takaisin.',
    kuvat: [
      {
        rooli: 'kauko',
        tiedosto: 'hetki-viikinkilaiva-roskilde-1000.jpg',
        kuvateksti: 'Miehet työntävät pitkälaivan keulaa irti rantamudasta, ja '
          + 'airot ovat jo ulkona molemmin puolin raidallisen villapurjeen '
          + 'alla. Rannalla näkyy turvekattoisia rakennuksia ja toinen laiva '
          + 'vedessä.',
        lahde: 'Matkakirjan havainnekuva: viikinkiajan pitkälaiva lähdössä '
          + 'Roskildenvuonolta noin vuonna 1000. Faktat: en-Wikipedia '
          + '"Skuldelev ships" ja "Horned helmet", tarkistettu 2.9.2026.',
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
  },
];

/** Hetket tunnuksen mukaan — kortti ja testit lukevat samasta paikasta. */
export const HISTORIAN_HETKET_ID = new Map(HISTORIAN_HETKET.map((h) => [h.id, h]));

/** Vain kartalle merkityt hetket, maakoodin mukaan ryhmiteltynä. */
export function hetketMaassa(iso) {
  return HISTORIAN_HETKET.filter((h) => h.kartalla && h.iso === iso);
}
