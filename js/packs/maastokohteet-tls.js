/*
 * MAASTOKOHTEET JA KOHTEET — TLS (Itä-Timor). Erä M8, Aasia 2, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Itä-Timorilla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-tls.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI. Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista. Maan fokuslehden
 * rajaus on ahdas — x 9947,7…10097,1 ja y 3463,1…3549,3, eli noin
 * 149 × 86 lautayksikköä — ja kaikki merkit osuvat siihen
 * (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a). Oecussen
 * eksklaavi mahtuu ikkunaan, joten Lifaun merkki on kartalla.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/TLS.json-tiedostoa
 * ei ole): Matebian, Ataúro ja Timorinmeri — vuori, saari ja meri.
 * TATAMAILAU JÄI POIS, VAIKKA SE ON MAAN KORKEIN VUORI: se on 5,1
 * lautayksikön päässä Dili-laatasta eli kaupungin kohdalla
 * (KAUPUNGIN_KOHDALLA_SADE 7). Samasta syystä pudotettiin Maubisse
 * (6,7 yksikköä) ja Ermeran kahviseutu.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
 * Cristo Rei 9,4 lautayksikön päässä Dilistä. Dilillä ei ole
 * kohdekarttaa (js/packs/maakartat.js), joten kohdekartan rajaus ei
 * karsi tästä maasta yhtään nostoa.
 *
 * HERKÄT AIHEET (docs/aasia-tyoaineisto/spec-asia.md, SITOVA).
 * Itä-Timorin miehityksestä kerrotaan vain siinä mitassa kuin
 * en-Wikipedian artikkeli sen kertoo ja ilman nykypolitiikkaa:
 * Balibon kortti mainitsee vuoden 1975 tapahtumat toteavasti, ja
 * molemmat skandaalit ovat Portugalin siirtomaakaudelta (1769 ja
 * 1911–1912).
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_TLS = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'cristo-rei',
    nimi: 'Cristo Rei',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuinka korkea patsas on?',
      'Kuka patsaan suunnitteli?',
    ],
    korostukset: ['Fatucaman|Fatucaman'],
    nappi: 'Maapallon päällä seisova patsas',
    // 125.608322 E / -8.520527 N — en-Wikipedia "Cristo Rei of Dili"
    laudat: {
      maailmankartta: { x: 10020.3, y: 3496.2 },
    },
    teksti: 'Cristo Rei de Dili on 27 metriä korkea Jeesus-patsas, joka '
      + 'seisoo maapallon päällä Fatucaman niemellä Dilin itäpuolella. Se on '
      + 'yksi maan tärkeimmistä matkailukohteista. Patsaan suunnitteli ja sen '
      + 'rakentamista valvoi Mochamad Syailillah, joka tunnetaan paremmin '
      + 'lempinimellä Bolil. Patsas paljastettiin virallisesti 1996, ja '
      + 'paljastajana oli Indonesian presidentti Suharto: se oli Indonesian '
      + 'hallituksen lahja silloisen Timor Timurin maakunnan asukkaille. '
      + 'Patsaalle nousee pitkiä portaita niemen kärkeen.',
    lahde: 'en-Wikipedia "Cristo Rei of Dili", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'maubara',
    nimi: 'Maubara',
    tyyppi: 'historia',
    kysymykset: [
      'Ketkä linnakkeen rakensivat ja milloin?',
      'Mitä Portugali antoi siitä vaihdossa?',
    ],
    korostukset: ['Flores|Flores'],
    nappi: 'Linnake, joka vaihdettiin saareen',
    // 125.2 E / -8.61667 N — en-Wikipedia "Maubara"
    laudat: {
      maailmankartta: { x: 10006.7, y: 3499.4 },
    },
    teksti: 'Maubara on kylä Liquiçán kunnassa Timorin pohjoisrannikolla, ja '
      + 'sen asukkaat puhuvat enimmäkseen tokodeden kieltä. Kylän portilla '
      + 'meren puolella on hollantilaisten noin 1756 rakentama linnake, joka '
      + 'valvoo lahtea. Portugalin siirtomaakauden alussa hollantilaiset '
      + 'ottivat paikan haltuunsa, ja Portugali sai sen takaisin 1851 '
      + 'neuvotteluissa, joissa se luovutti vastineeksi silloin hallitsemansa '
      + 'Flores. Linnake on hyvin säilynyt: siinä on kaksi porttia ja '
      + 'alkuperäinen tykki tallella. Kylässä on myös 1877–1897 Timorin '
      + 'lähetystä johtaneen isä Medeirosin järjestämä uusklassinen '
      + 'seurakuntakirkko sekä 1920 rakennettu tullitalo, joka toimii '
      + 'nykyään kulttuurikeskuksena ja kirjastona.',
    lahde: 'en-Wikipedia "Maubara", johdanto sekä osiot "History" ja '
      + '"Buildings" (tarkistettu 6.9.2026).',
  },
  {
    id: 'balibo',
    nimi: 'Balibo',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanha linnake on?',
      'Mikä linnakkeesta on tullut 2016?',
    ],
    korostukset: ['linnake|linnake'],
    nappi: 'Neljäsataavuotias raja-linnake',
    // 125.03333 E / -8.96667 N — en-Wikipedia "Balibo"
    laudat: {
      maailmankartta: { x: 10001.1, y: 3511.2 },
    },
    teksti: 'Balibo on Bobonaron piirikunnan kaupunki noin kymmenen '
      + 'kilometrin päässä Indonesian rajasta. Kaupungissa on 400 vuotta '
      + 'vanha linnake, joka oli useiden taistelujen näyttämö Indonesian '
      + 'hyökkäyksen aikana 1975. Balibo tunnetaan kansainvälisesti paikkana, '
      + 'jossa Indonesian erikoisjoukot surmasivat 16. lokakuuta 1975 viisi '
      + 'Australiasta tullutta toimittajaa, jotka olivat kuvaamassa '
      + 'linnakkeelta hyökkäystä silloiseen Portugalin Timoriin. Human Rights '
      + 'Watch on arvioinut, että 70 prosenttia kaupungista tuhoutui '
      + 'väkivaltaisuuksissa ennen itsenäisyysäänestystä. Balibo House Trust '
      + 'muutti linnakkeen hotelliksi vuonna 2016.',
    lahde: 'en-Wikipedia "Balibo", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'laili',
    nimi: 'Lailin luola',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka vanhoja löydöt ovat?',
      'Mitä löydöt kertovat muuttoreitistä?',
    ],
    korostukset: ['Wallacean|Wallacean'],
    nappi: 'Neljäkymmentäneljä tuhatta vuotta',
    // 126.1632 E / -8.5409 N — en-Wikipedia "Laili (cave)"
    laudat: {
      maailmankartta: { x: 10038.8, y: 3496.9 },
    },
    teksti: 'Laili on kalkkikiviluola lähellä Laleian kaupunkia Manatuton '
      + 'piirikunnassa. Sen kerrostumista tehdyt arkeologiset löydöt '
      + 'osoittavat, että nykyihminen asui luolassa 44 600 vuotta sitten, ja '
      + 'se on siten Wallacean toiseksi vanhin tunnettu asuinpaikka heti '
      + 'Pohjois-Australian mantereella olevan Madjedbeben jälkeen. Löytöjen '
      + 'ikä tukee käsitystä, jonka mukaan ihminen levisi Aasiasta '
      + 'Australiaan eteläistä reittiä Jaavan ja Pienten Sundasaarten kautta. '
      + 'Timorilla on muitakin saman ikäluokan luolia: Jerimalai ja Lene Hara '
      + 'saaren itäkärjessä.',
    lahde: 'en-Wikipedia "Laili (cave)", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'baucau',
    nimi: 'Baucau',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaupunkia kutsuttiin Vila Salazariksi?',
      'Kuinka kaukana Dili on?',
    ],
    korostukset: ['Vila Salazar|Vila Salazar'],
    nappi: 'Maan toiseksi suurin kaupunki',
    // 126.45361 E / -8.46278 N — en-Wikipedia "Baucau"
    laudat: {
      maailmankartta: { x: 10048.5, y: 3494.2 },
    },
    teksti: 'Baucau on Itä-Timorin toiseksi suurin kaupunki pääkaupunki Dilin '
      + 'jälkeen, ja Dili on 122 kilometriä siitä länteen. Asukkaita on noin '
      + '16 000, ja kaupunki on maan itäosassa sijaitsevan Baucaun kunnan '
      + 'pääpaikka. Portugalin Timorin aikaan Baucau oli vähän muuta kuin '
      + 'kasvanut kylä, ja osan siitä ajasta se kantoi nimeä Vila Salazar '
      + 'Portugalin diktaattorin António de Oliveira Salazarin mukaan.',
    lahde: 'en-Wikipedia "Baucau", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'baguia',
    nimi: 'Baguia',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linnake rakennettiin?',
      'Kenelle appelsiinipuut kuuluivat?',
    ],
    korostukset: ['appelsiinipuita|appelsiinipuita'],
    nappi: 'Kaksikymmentä linnaketta kapinan jälkeen',
    // 126.6553 E / -8.6281 N — en-Wikipedia "Baguia Fort"
    laudat: {
      maailmankartta: { x: 10055.2, y: 3499.8 },
    },
    teksti: 'Baguian linnake rakennettiin 1900-luvun alussa samannimiseen '
      + 'kaupunkiin Matebianin rinteille. Vuosien 1911–1912 kapinan jälkeen '
      + 'portugalilaiset rakensivat kaksikymmentä linnaketta vuoteen 1918 '
      + 'mennessä, ja Baguia oli yksi niistä: se sijaitsi strategisesti '
      + 'reitillä, joka yhdisti pohjoisen Baucaun eteläiseen Viquequeen ja '
      + 'vuoristoisen sisämaan rannikkotasangoille. Linnakkeessa oli kolme '
      + 'rakennusta — vartiotupa, hallintotoimisto ja hallintomiehen asunto — '
      + 'ja sen edustalla kasvoi jonkin aikaa appelsiinipuita, jotka oli '
      + 'varattu yksinomaan portugalilaisten käyttöön. Torneja käytettiin '
      + 'vankiloina ja muurien ulkopuolella pidettiin viikkomarkkinat. '
      + 'Linnake kunnostettiin 2014 alkaneessa hankkeessa matkailijoiden '
      + 'majapaikaksi.',
    lahde: 'en-Wikipedia "Baguia Fort", osiot "Location and structure" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'viqueque',
    nimi: 'Viqueque',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Kuinka kaukana Dili on?',
      'Mitä kaupungissa tapahtui 1959?',
    ],
    korostukset: ['Uato-Lari|Uato-Lari'],
    nappi: 'Etelärannikon hallintokaupunki',
    // 126.36472 E / -8.8575 N — en-Wikipedia "Viqueque"
    laudat: {
      maailmankartta: { x: 10045.5, y: 3507.5 },
    },
    teksti: 'Viqueque on Itä-Timorin kaakkoisosan kaupunki 183 kilometrin '
      + 'päässä pääkaupungista Dilistä. Se on Viquequen kunnan pääpaikka, ja '
      + 'kunnan alaisuudessa on viisi hallintopiiriä: Uato-Lari, Uatu-Carbau, '
      + 'Viqueque, Lacluta ja Ossu. Kaupungissa asui vuonna 2015 noin 6 900 '
      + 'ihmistä, hallintopiirissä runsaat 20 000 ja koko kunnassa yli '
      + '65 000. Vuonna 1959 seudulla nousi kapina Portugalin hallintoa '
      + 'vastaan.',
    lahde: 'en-Wikipedia "Viqueque", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'nino-konis-santana',
    nimi: 'Nino Konis Santana',
    tyyppi: 'muu',
    kysymykset: [
      'Kenen mukaan puisto on nimetty?',
      'Mikä on Korallikolmio?',
    ],
    korostukset: ['Korallikolmiosta|Korallikolmiosta'],
    nappi: 'Maan ensimmäinen kansallispuisto',
    // 127.33333 E / -8.45 N — en-Wikipedia "Nino Konis Santana National Park"
    laudat: {
      maailmankartta: { x: 10077.8, y: 3493.8 },
    },
    teksti: 'Nino Konis Santanan kansallispuisto on Itä-Timorin ensimmäinen '
      + 'kansallispuisto. Se perustettiin 15. elokuuta 2007, ja sen pinta-ala '
      + 'on 1 236 neliökilometriä. Puisto yhdistää useita tärkeitä '
      + 'lintualueita — Loren, Paitchau-vuoren, Ira Lalaro -järven ja Jacon '
      + 'saaren — ja siihen kuuluu 556 neliökilometriä Korallikolmiosta, '
      + 'vedenalaisesta alueesta, jolla arvellaan olevan maailman suurin '
      + 'korallien ja koralliriuttakalojen lajirunsaus. Puisto suojelee muun '
      + 'muassa äärimmäisen uhanalaista keltatöyhtökakadua sekä kotoperäistä '
      + 'timorinviherkyyhkyä. Nimi tulee itsenäisyystaistelun johtohahmosta '
      + 'Nino Konis Santanasta, joka syntyi puiston alueella olevassa '
      + 'Tutualan kylässä.',
    lahde: 'en-Wikipedia "Nino Konis Santana National Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'matebian',
    nimi: 'Matebian',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea vuori on?',
      'Mitä huipulla on?',
    ],
    korostukset: ['huipulla|huipulla'],
    nappi: 'Maan kolmanneksi korkein',
    // 126.5969 E / -8.6406 N — en-Wikipedia "Matebian"
    laudat: {
      maailmankartta: { x: 10053.2, y: 3500.2 },
    },
    teksti: 'Matebian eli Matebean on Itä-Timorin kolmanneksi korkein vuori '
      + 'Ramelaun eli Tatamailaun jälkeen. Se kohoaa Baucaun piirikunnassa '
      + 'saaren itäosassa, ja sen korkeus on 2 372 metriä. Vuori on yksi '
      + 'Malaijien saariston niin sanotuista ultraprominenteista huipuista, '
      + 'eli se nousee ympäristöstään poikkeuksellisen korkealle. Huipulla on '
      + 'Jeesus-patsas.',
    lahde: 'en-Wikipedia "Matebian", johdanto ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'atauro',
    nimi: 'Ataúro',
    tyyppi: 'saari',
    kysymykset: [
      'Mitä saaren nimi tarkoittaa?',
      'Kuinka syvä salmi saaren ja Timorin välissä on?',
    ],
    korostukset: ['vuohta|vuohta'],
    nappi: 'Vuohisaari kolmen kilometrin syvänteen takana',
    // 125.58 E / -8.24 N — en-Wikipedia "Atauro"
    laudat: {
      maailmankartta: { x: 10019.3, y: 3486.8 },
    },
    teksti: 'Ataúro on saari ja kunta Itä-Timorissa, 23,5 kilometriä Dilistä '
      + 'pohjoiseen. Nimi tarkoittaa paikallisella kielellä vuohta, ja '
      + 'indonesiaksi saari tunnetaan nimellä Pulau Kambing, sekin vuohisaari: '
      + 'nimi tuli saarella pidettyjen vuohien suuresta määrästä. Saari on '
      + '22 kilometriä pitkä, 5–10 kilometriä leveä ja pinta-alaltaan 150 '
      + 'neliökilometriä, ja se kohoaa sammuneen Wetarin tulivuorikaaren '
      + 'jaksolla. Korkein kohta on 999 metrin Manucoco. Saaren ja Timorin '
      + 'välinen salmi laskeutuu 3 500 metrin syvyyteen, kun taas Wetaria '
      + 'kohti kulkeva harjanne on paljon matalampi. Vuoden 2015 laskennassa '
      + 'saarella asui 9 274 ihmistä, ja vuoden 2022 alusta se on ollut oma '
      + 'kuntansa.',
    lahde: 'en-Wikipedia "Atauro", johdanto sekä osiot "Toponymy" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
  {
    id: 'timorinmeri',
    nimi: 'Timorinmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka syvä Sundan hauta on?',
      'Miksi meri on altis maanjäristyksille?',
    ],
    korostukset: ['Sundan hauta|Sundan hauta'],
    nappi: 'Matala meri Australian ja Timorin välissä',
    // 126.5 E / -9.7 N — en-Wikipedia "Timor Sea"
    laudat: {
      maailmankartta: { x: 10050, y: 3535.8 },
    },
    teksti: 'Timorinmeri on suhteellisen matala Intian valtameren osa. Sitä '
      + 'rajaavat pohjoisessa Timorin saari, luoteessa Indonesia, idässä '
      + 'Arafuranmeri ja etelässä Australia. Sen syvin kohta on Sundan hauta, '
      + 'jossa vettä on yli 3 300 metriä; hauta erottaa Oseanian mantereen '
      + 'kaakossa Aasiasta luoteessa ja pohjoisessa. Sijainti Tyynenmeren '
      + 'tulirenkaalla ja alueen tulivuoritoiminta tekevät haudan '
      + 'pohjoispuolisesta merestä alttiin maanjäristyksille ja tsunameille, '
      + 'ja päiväntasaajan läheisyys tuo sinne suuria pyörremyrskyjä. '
      + 'Meressä on riuttoja, asumattomia saaria ja merkittäviä '
      + 'hiilivetyvaroja. On mahdollista, että Australian ensimmäiset '
      + 'asukkaat ylittivät Timorinmeren Malaijien saaristosta aikana, '
      + 'jolloin merenpinta oli nykyistä alempana.',
    lahde: 'en-Wikipedia "Timor Sea", johdanto-osa (tarkistettu 6.9.2026).',
  },
];
