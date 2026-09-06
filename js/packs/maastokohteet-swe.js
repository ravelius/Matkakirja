/*
 * MAASTOKOHTEET — SWE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SWE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SWE.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Ruotsin maastokohteet. Faktat en-Wikipediasta 29.8.2026.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Ruotsi oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja yksitoista
 * karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md). Tavoite on
 * kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat — sama
 * malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-swe.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Birka) on
 * 17,2 lautayksikön päässä Tukholmasta, eli reilusti yli kaupungin
 * kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7, js/fokuskohteet.js).
 * Yksikään ei siis kuulu kohdekartalle, vaan kaikki ovat pääkartan
 * merkkejä. Drottningholm jätettiin tästä syystä pois: se on kuuden
 * yksikön päässä Tukholmasta eli kaupungin kohdalla.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti kantaa
 * tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto olisi
 * huonompi kuin kuvaton kortti (Perustuslaki, faktakuri). Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_SWE = [
  {
    id: 'kebnekaise',
    nimi: 'Kebnekaise',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi eteläinen huippu on kutistunut?',
      'Mitä nimi Giebmegáisi tarkoittaa?',
    ],
    korostukset: ['Kungsleden|Kungsledenin'],
    nappi: 'Vuori, joka on kutistunut',
    // 18.5283 E / 67.9044 N — en-Wikipedia "Kebnekaise"
    laudat: {
      maailmankartta: { x: 6450.9, y: 504.7 },
      europe: { x: 566.9, y: 107.7 },
    },
    teksti: 'Kebnekaise on Ruotsin korkein vuori, ja sen massiivissa on kaksi päähuippua. Jäätikön '
      + 'peittämä eteläinen huippu oli ennen korkein 2 120 metrissä, mutta se on kutistunut '
      + 'viidessäkymmenessä vuodessa 24 metriä, joten korkein on nyt jäätön pohjoinen huippu 2 '
      + '096,8 metrissä. Vuori on Ruotsin Lapissa noin 150 kilometriä napapiiristä pohjoiseen, '
      + 'Kirunasta länteen Kungsledenin vaellusreitin varrella.',
    lahde: 'en-Wikipedia "Kebnekaise", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'itameri',
    nimi: 'Itämeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Itämeren vesi on murtovettä?',
      'Miksi Gotlanti oli kauppareittien risteys?',
    ],
    korostukset: ['murtovesi|murtovesiallas'],
    nappi: 'Maailman suurin murtovesiallas',
    // 18.6 E / 57.4 N — ulappa Gotlannin eteläpuolella; artikkelin oma keskipiste on 20 / 58
    laudat: {
      maailmankartta: { x: 6453.3, y: 1052.7 },
      europe: { x: 568.3, y: 384 },
    },
    teksti: 'Itämeren pohjassa lepää laivoja, jotka eivät ole lahonneet. Vesi on kylmää ja '
      + 'niin vähäsuolaista, ettei laivamato viihdy siinä, ja siksi vanhat puuhylyt säilyvät '
      + 'täällä toisin kuin valtamerissä. Kuuluisin niistä on ruotsalainen sotalaiva Vasa: se '
      + 'kaatui neitsytmatkallaan 10. elokuuta 1628 reilun kilometrin purjehdittuaan, ja se '
      + 'nostettiin pohjasta 333 vuotta myöhemmin lähes ehjin rungoin. Meri on Atlantin haara, '
      + 'jonka ympäröivät Tanska, Viro, Suomi, Saksa, Latvia, Liettua, Puola, Venäjä ja '
      + 'Ruotsi, ja se on maailman suurin murtovesiallas. Gotlanti keskellä merta oli niin '
      + 'arvokas paikka, että merirosvojoukko Vitaaliveljet piti sitä 1300-luvulla hallussaan; '
      + 'merirosvous oli Itämerellä arkea 700-luvulta 1300-luvulle. Ruotsi vei merta myöten '
      + 'varhaiskeskiajalta asti rautaa ja hopeaa.',
    lahde: 'en-Wikipedia "Baltic Sea", johdanto-osa sekä osiot "Storms and storm floods", '
      + '"Middle Ages"; laivan osalta "Vasa (ship)", johdanto-osa (tarkistettu 1.9.2026).',
  },
  {
    id: 'pohjanlahti',
    nimi: 'Pohjanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Merenkurkku on?',
      'Miksi Pohjanlahden rannat nousevat?',
    ],
    korostukset: ['Merenkurkku|Merenkurkussa'],
    nappi: 'Itämeren pohjoisin haara',
    // 19.6 E / 62.6 N — ulappa Selkämeren pohjoisosassa; artikkelin oma keskipiste on 20 / 63
    laudat: {
      maailmankartta: { x: 6486.7, y: 793.5 },
      europe: { x: 587.5, y: 247.2 },
    },
    teksti: 'Pohjanlahti on katoamassa. Maa nousee yhä siitä, minkä jääkauden mannerjää painoi '
      + 'sen alle — lähes kilometrin verran — ja kohoaa 80 senttiä vuosisadassa, Merenkurkussa '
      + 'melkein sentin vuodessa. Noin kahdentuhannen vuoden kuluttua kynnys nousee pinnan '
      + 'yläpuolelle ja Perämeri irtoaa omaksi makean veden järvekseen. Sitä kohti se on jo '
      + 'pitkällä: pohjoisimmillaan vesi on niin vähäsuolaista, että hauki, siika ja ahven '
      + 'viihtyvät siinä. Lahti on Itämeren pohjoisin haara Suomen länsirannikon ja '
      + 'Pohjois-Ruotsin itärannikon välissä, ja se jakautuu Perämereen, Merenkurkkuun ja '
      + 'Selkämereen. Ruotsin puolella Luleå lastaa laivoihin rautamalmipellettejä ja Gävle on '
      + 'maan kolmanneksi suurin konttisatama; muita satamia ovat Skellefteå, Umeå ja '
      + 'Sundsvall.',
    lahde: 'en-Wikipedia "Gulf of Bothnia", johdanto-osa sekä osiot "Geography" ja "Economy" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'gotaalv',
    nimi: 'Göta älv',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä oli Itämeren jääkausijärvi?',
      'Mikä on Trollhätten kanava?',
    ],
    korostukset: ['Vänern|Vänernin'],
    nappi: 'Vänernin lasku mereen',
    // 12.29 E / 58.28 N — Trollhättan joen putousten kohdalla; artikkelin koordinaatti 11,908 / 57,693 on suistossa Göteborgissa
    laudat: {
      maailmankartta: { x: 6243, y: 1010.3 },
      europe: { x: 447.2, y: 360.8 },
    },
    teksti: 'Göta älv syntyi jääkauden lopulla laskukanavaksi: sitä pitkin Itämeren jääjärvi '
      + 'purkautui Atlanttiin. Nykyään se laskee Vänernin vedet Kattegatiin Göteborgin '
      + 'kohdalla, ja sillä on Skandinavian suurin valuma-alue, vaikka pituutta on vain 93 '
      + 'kilometriä. Kungälvissä, Bohusin linnoituksen kohdalla, joki jakautuu kahtia ja sulkee '
      + 'Hisingenin saaren väliinsä. Trollhättanissa on pato, sulkuja ja voimalaitos — '
      + 'Trollhätte kanal — ja sulkujen ansiosta jokea pääsee nousemaan jopa 88 metriä pitkillä '
      + 'rahtialuksilla. Voimalaitoksen sähkö nosti kosken partaalle raskaan terästeollisuuden. '
      + 'Kesäisin padon tulvaluukut avataan muutamaksi minuutiksi päivässä, ja väki kerääntyy '
      + 'katsomaan, kun vesi ryöppyää alas.',
    lahde: 'en-Wikipedia "Göta älv", johdanto-osa (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'visby',
    nimi: 'Visby',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Mistä nimi Visby tulee?',
      'Miksi keskiaikaiset kivitalot säilyivät?',
    ],
    korostukset: ['Hansaliitto|Hansaliiton'],
    nappi: 'Ruusujen ja raunioiden kaupunki',
    // 18.2992 E / 57.6347 N — en-Wikipedia "Visby"
    laudat: {
      maailmankartta: { x: 6443.3, y: 1041.4 },
      europe: { x: 562.5, y: 377.8 },
    },
    teksti: 'Visby on Gotlannin pääkaupunki, ja siellä asuu noin 24 000 ihmistä. '
      + 'Hansakaupunki Visby on yksi Skandinavian parhaiten säilyneistä keskiaikaisista '
      + 'kaupungeista, ja se on ollut maailmanperintökohde vuodesta 1995.\n\n'
      + 'Näkyvin muistomerkki on 3,4 kilometriä pitkä kaupunginmuuri, joka kiertää '
      + 'keskustan. Muurin rakentaminen alkoi todennäköisesti 1100-luvulla, ja noin '
      + 'vuonna 1300 se rakennettiin nykyiseen korkeuteensa ja sai luonteenomaiset '
      + 'torninsa; osa torneista valmistui vasta 1400-luvulla. Muuri on yhä lähes '
      + 'ehjä.\n\n'
      + 'Kaupunki oli kauppapaikka jo noin vuonna 900, ja se kukoisti saksalaisen '
      + 'Hansaliiton ansiosta. Juuri taantuma myöhäiskeskiajalla säilytti kaupungin '
      + 'sellaisena kuin se on: kun rahaa uuteen rakentamiseen ei ollut, kivitalot '
      + 'jäivät alkuperäiseen keskiaikaiseen asuunsa.\n\n'
      + 'Nimi tulee muinaisnorjan sanoista vis, uhripaikka, ja by, kylä. Visbytä '
      + 'kutsutaan joskus ruusujen kaupungiksi ja joskus raunioiden kaupungiksi — '
      + 'kirkkoraunioita on keskustassa useita.',
    lahde: 'en-Wikipedia "Visby", johdanto-osa sekä osiot "Etymology" ja "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'gamla-uppsala',
    nimi: 'Gamla Uppsala',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä kuningas julisti Uppsalan käräjillä?',
      'Mikä Disting oli?',
    ],
    korostukset: ['Dísablót|Dísablót'],
    nappi: 'Kaikkien svealaisten käräjät',
    // 17.629 E / 59.897 N — en-Wikipedia "Gamla Uppsala"
    laudat: {
      maailmankartta: { x: 6421, y: 930.8 },
      europe: { x: 549.7, y: 318.3 },
    },
    teksti: 'Gamla Uppsala on kylä ja pitäjä Uppsalan ulkopuolella. Jo 200- ja 300-luvuilta '
      + 'alkaen se oli tärkeä uskonnollinen, taloudellinen ja poliittinen keskus.\n\n'
      + 'Varhaiset kirjalliset lähteet kertovat, että paikka tunnettiin laajalti '
      + 'Pohjois-Euroopassa jo esihistoriallisella ajalla legendaarisen Ynglinga-suvun '
      + 'kuninkaiden asuinpaikkana. Vanhimmat skandinaaviset lähteet — Ynglingatal, '
      + 'Länsi-Götanmaan laki ja Gutasaga — puhuvat svealaisten kuninkaasta '
      + '"Uppsalan kuninkaana".\n\n'
      + 'Täällä pidettiin kaikkien svealaisten käräjät, yleiskokous, joka kokoontui '
      + 'esihistoriasta keskiajalle helmikuun lopussa tai maaliskuun alussa. Käräjät '
      + 'pidettiin yhdessä suurten Disting-markkinoiden ja Dísablót-nimisen '
      + 'uhrijuhlan kanssa. Upplannin lain mukaan juuri näillä käräjillä kuningas '
      + 'julisti, että laivasto kutsutaan kesän sotaretkelle, ja siellä päätettiin '
      + 'miehistöt, soutajat, päälliköt ja laivat.\n\n'
      + 'Gamla Uppsala ei ollut vain pohjoismaisen uskonnon keskus: siitä tuli vuonna '
      + '1164 myös Ruotsin arkkipiispanistuin.',
    lahde: 'en-Wikipedia "Gamla Uppsala", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'birka',
    nimi: 'Birka',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mihin asti Birkan kauppareitti ulottui?',
      'Milloin Birka hylättiin?',
    ],
    korostukset: ['Ansgar|Ansgar'],
    nappi: 'Kiinalaista silkkiä Mälarenin saarella',
    // 17.5453 E / 59.3361 N — en-Wikipedia "Birka"
    laudat: {
      maailmankartta: { x: 6418.2, y: 958.6 },
      europe: { x: 548.1, y: 333.1 },
    },
    teksti: 'Birka oli viikinkiajan tärkeä kauppapaikka Björkön saarella Mälarenissa, '
      + 'kolmisenkymmentä kilometriä nykyisestä Tukholmasta länteen. Se perustettiin noin '
      + 'vuonna 750 ja kukoisti yli kahdensadan vuoden ajan; hylätyksi se jäi noin 975, '
      + 'suunnilleen samaan aikaan kun Sigtuna perustettiin kristityksi kaupungiksi. '
      + 'Asukkaita arvioidaan olleen 500–1 000.\n\n'
      + 'Birka oli Itämeren pää Dneprin kauppareitillä, joka kulki Laatokan ja Novgorodin '
      + 'kautta Bysantin valtakuntaan ja Abbasidien kalifaattiin. Kauppatavaraa olivat '
      + 'turkikset, rautaesineet ja käsityötuotteet — karhun, ketun, näädän, saukon ja '
      + 'majavan nahkoja saatiin saamelaisilta, suomalaisilta ja Luoteis-Venäjän '
      + 'asukkailta. Myös poronsarvet, mursunhampaat, meripihka ja hunaja kulkivat '
      + 'kauppaa.\n\n'
      + 'Haudoista on löytynyt lasia ja metalliesineitä, Reininmaan keramiikkaa, '
      + 'kiinalaista silkkiä, bysanttilaista kultalankakirjontaa ja korkealaatuisia '
      + 'punoksia.\n\n'
      + 'Birkassa perustettiin myös Ruotsin ensimmäinen tunnettu kristillinen seurakunta: '
      + 'pyhä Ansgar teki sen vuonna 831. Yhdessä naapurisaaren Hovgårdenin kanssa Birka '
      + 'on ollut maailmanperintökohde vuodesta 1993.',
    lahde: 'en-Wikipedia "Birka", johdanto-osa ja osio "History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'falunin-kaivos',
    nimi: 'Falunin kaivos',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä tulittaminen kaivoksessa tarkoitti?',
      'Kuinka suuri osa Euroopan kuparista tuli Falunista?',
    ],
    korostukset: ['tulittaminen|tulittaminen'],
    nappi: 'Kaivos, joka maksoi Ruotsin sodat',
    // 15.6122 E / 60.5989 N — en-Wikipedia "Falun Mine"
    laudat: {
      maailmankartta: { x: 6353.7, y: 895.7 },
      europe: { x: 511, y: 299.8 },
    },
    teksti: 'Falunin kaivos toimi vuosituhannen ajan: arviolta 900-luvulta vuoteen 1992. '
      + 'Parhaimmillaan se tuotti kaksi kolmasosaa koko Euroopan kuparintarpeesta ja '
      + 'rahoitti monta Ruotsin 1600-luvun sotaa. Kaivoksessa kehitetyt menetelmät '
      + 'vaikuttivat kaivostoimintaan maailmanlaajuisesti kahden vuosisadan ajan.\n\n'
      + 'Alussa toiminta oli pientä: paikalliset talonpojat keräsivät malmia, sulattivat '
      + 'sen ja käyttivät metallin kotitarpeisiin. Maunu Ladonlukon aikaan 1200-luvun '
      + 'lopulla aatelisto ja lyypekkiläiset kauppiaat ottivat toiminnan haltuunsa. '
      + 'Ensimmäinen kirjallinen maininta on vuodelta 1288: Västeråsin piispa sai '
      + 'kartanoa vastaan 12,5 prosentin osuuden kaivoksesta.\n\n'
      + 'Kuparia irrotettiin tulittamalla. Kalliota kuumennettiin suurilla nuotioilla, ja '
      + 'kun kivi jäähtyi, se haurastui ja halkeili niin että kiilat ja moukarit purivat '
      + 'siihen. Tulittaminen oli päämenetelmä satojen vuosien ajan.\n\n'
      + 'Malmi pasutettiin avotulella rikin poistamiseksi. Paksu, myrkyllinen savu oli '
      + 'Falunin tuntomerkki vuosisatojen ajan. Kaivos on nykyään museo ja vuodesta 2001 '
      + 'maailmanperintökohde.',
    lahde: 'en-Wikipedia "Falun Mine", johdanto-osa sekä osiot "History" ja "Methods" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'gota-kanava',
    nimi: 'Göta-kanava',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuka piirsi kanavan ensimmäiset suunnitelmat?',
      'Kuinka kauan kanavan kaivaminen kesti?',
    ],
    korostukset: ['Thomas Telford|Thomas Telford'],
    nappi: 'Ruotsin sininen nauha',
    // 16.1733 E / 58.4983 N — en-Wikipedia "Göta Canal"
    laudat: {
      maailmankartta: { x: 6372.4, y: 999.7 },
      europe: { x: 521.7, y: 355.1 },
    },
    teksti: 'Göta-kanava on 1800-luvun alussa rakennettu kanava. Se on 190 kilometriä '
      + 'pitkä, ja siitä 87 kilometriä on kaivettu tai louhittu; leveys vaihtelee '
      + 'seitsemästä neljääntoista metriin ja suurin syvyys on noin kolme metriä.\n\n'
      + 'Kanava on osa 390 kilometrin vesitietä, joka yhdistää järviä ja jokia niin, että '
      + 'reitti kulkee Göteborgista länsirannikolta Söderköpingiin Itämerelle '
      + 'Trollhätte-kanavan ja Göta älvin kautta sekä suurten Vänernin ja Vätternin '
      + 'läpi. Vesitietä on kutsuttu Ruotsin siniseksi nauhaksi.\n\n'
      + 'Ajatuksen esitti jo vuonna 1516 Linköpingin piispa Hans Brask, mutta työhön '
      + 'ryhtyi vasta 1800-luvun alussa Baltzar von Platen. Hanke aloitettiin 11. '
      + 'huhtikuuta 1810, ja se oli ylivoimaisesti suurin rakennusurakka, jota Ruotsissa '
      + 'oli siihen mennessä yritetty: 22 vuotta työtä ja yli 58 000 työntekijää.\n\n'
      + 'Osaaminen ja välineet piti hankkia ulkomailta. Skotlantilainen insinööri Thomas '
      + 'Telford, joka oli suunnitellut Kaledonian kanavan, laati ensimmäiset '
      + 'suunnitelmat ja matkusti Ruotsiin 1810 valvomaan alkutöitä. Britanniasta '
      + 'tuotiin myös hakkuja, lapioita ja kottikärryjä. Kanava avattiin virallisesti '
      + '26. syyskuuta 1832 — von Platen oli kuollut vähän ennen sitä.',
    lahde: 'en-Wikipedia "Göta Canal", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'vadstenan-luostari',
    nimi: 'Vadstenan luostari',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka luostarin perusti?',
      'Miksi kirkko on niin koruton?',
    ],
    korostukset: ['birgittalaiset|birgittalaisen'],
    nappi: 'Pyhän Birgitan emoluostari',
    // 14.8914 E / 58.4506 N — en-Wikipedia "Vadstena Abbey"
    laudat: {
      maailmankartta: { x: 6329.7, y: 1002 },
      europe: { x: 497.1, y: 356.4 },
    },
    teksti: 'Vadstenan luostari on rakennusryhmä Vätternin rannalla. Pyhä Birgitta perusti '
      + 'sen vuonna 1346 kuningas Maunu Eerikinpojan ja kuningatar Blankan avulla: '
      + 'kuningaspari lahjoitti testamentillaan luostarille kymmenen tilaa, niiden joukossa '
      + 'Vadstenan.\n\n'
      + 'Luostarikirkko alkoi puukirkkona, joka paloi vuonna 1388. Se rakennettiin '
      + 'uudelleen 1300-luvun lopulla Birgitan ohjeiden mukaan; hän kertoi saaneensa ohjeet '
      + 'Jeesukselta ja tahtoi, että kirkko olisi varustukseltaan yksinkertainen. Kirkko '
      + 'vihittiin 16. helmikuuta 1430.\n\n'
      + 'Birgitan tytär, pyhä Katariina, saapui luostariin 1374 äitinsä jäännösten kanssa '
      + 'ja löysi sieltä vain muutaman noviisin; hänet valittiin abbedissaksi. Birgitan '
      + 'pyhäksi julistaminen 1391 ja hänen jäännöstensä siirto luostarikirkkoon 1394 '
      + 'toivat yhteisölle mainetta ja rikkautta.\n\n'
      + 'Luostari toimi birgittalaisten nunnien luostarina vuodesta 1346 vuoteen 1605, '
      + 'jolloin sen viimeinen ruotsalainen nunna kuoli. Vuosina 1346–1595 se oli koko '
      + 'birgittalaisen sääntökunnan emoluostari, ja Vadstenan kaupunki kasvoi sen '
      + 'ympärille.',
    lahde: 'en-Wikipedia "Vadstena Abbey", johdanto-osa ja osio "Foundation and duration" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kiruna',
    nimi: 'Kiruna',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi malmi jäi pitkään louhimatta?',
      'Mikä Esrange on?',
    ],
    korostukset: ['Kiirunavaara|Kiirunavaarassa'],
    nappi: 'Kaupunki, joka syntyi rautamalmista',
    // 20.3028 E / 67.8489 N — en-Wikipedia "Kiruna"
    laudat: {
      maailmankartta: { x: 6510.1, y: 507.9 },
      europe: { x: 601, y: 109.2 },
    },
    teksti: 'Kiruna on Ruotsin pohjoisin kaupunki Lapin maakunnassa. Se rakennettiin '
      + '1890-luvulla Kirunan kaivosta varten ja perustettiin vuonna 1900.\n\n'
      + 'Rautamalmi Kiirunavaarassa ja Luossavaarassa oli paikallisten saamelaisten '
      + 'tiedossa vuosisatoja aiemmin. Vuonna 1696 Kengiksen ruukin kirjanpitäjä Samuel '
      + 'Mört kirjoitti huhuista, ja vuonna 1736 Mangi-niminen saamelainen ilmoitti '
      + 'löydöstä Ruotsin viranomaisille Jukkasjärven kirkolla.\n\n'
      + 'Kaivostoimintaa ei silti aloitettu: paikka oli syrjäinen ja ilmasto ankara. '
      + '1800-luvulla malmia louhittiin vähän kerrallaan — kesällä irrotettiin ja talvella '
      + 'kuljetettiin porien ja hevosten vetämillä reillä. Kustannukset olivat korkeat ja '
      + 'fosforipitoisen malmin laatu huono, kunnes Sidney Gilchrist Thomasin ja Percy '
      + 'Gilchristin vuonna 1878 keksimä menetelmä erotti fosforin malmista.\n\n'
      + 'Rautatie ratkaisi kuljetuksen: rata Luulajasta Narvikiin sai luvan 1884, ja '
      + 'väliaikainen osuus Luulajasta Malmbergetiin valmistui 1888. Kirunassa on nykyään '
      + 'myös Esrangen avaruuskeskus, joka perustettiin 1960-luvulla, sekä avaruusfysiikan '
      + 'tutkimuslaitos.',
    lahde: 'en-Wikipedia "Kiruna", johdanto-osa ja osio "Origins" (tarkistettu 6.9.2026).',
  },
  {
    id: 'ales-stenar',
    nimi: 'Ales stenar',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä kivilaiva on?',
      'Miksi kivien ikä on kiistanalainen?',
    ],
    korostukset: ['kivilaiva|kivilaiva'],
    nappi: '59 lohkaretta laivan muotoon',
    // 14.0544 E / 55.3827 N — en-Wikipedia "Ale's Stones"
    laudat: {
      maailmankartta: { x: 6301.8, y: 1148 },
      europe: { x: 481, y: 437 },
    },
    teksti: 'Ales stenar on megaliittinen muistomerkki Skoonessa Etelä-Ruotsissa. Se on '
      + 'kivilaiva: soikea muodostelma, jonka päädyissä olevat kivet ovat muita selvästi '
      + 'suurempia. Laiva on 67 metriä pitkä, ja siihen kuuluu 59 suurta lohkaretta, joista '
      + 'raskaimmat painavat viisi tonnia.\n\n'
      + 'Radiohiiliajoitus on antanut paikalta seitsemän tulosta. Yksi viittaa noin 5 500 '
      + 'vuoden ikään, kuusi noin 1 400 vuoteen. Jälkimmäistä pidetään todennäköisimpänä '
      + 'rakennusajankohtana, mikä sijoittaa muistomerkin pohjoismaisen rautakauden '
      + 'loppuun. Poikkeava näyte on nokisista kivistä, joiden uskotaan olevan vanhemman '
      + 'tulisijan jäänteitä.\n\n'
      + 'Tarkoituksesta kiistellään. Yleensä muodostelmaa pidetään hautamonumenttina tai '
      + 'kulttipaikkana, mutta on esitetty myös, että se olisi aurinkokalenteri, joka on '
      + 'suunnattu kesäpäivänseisauksen auringonlaskuun.\n\n'
      + 'Vuoden 1989 ensimmäisissä arkeologisissa kaivauksissa laivan sisältä löytyi '
      + 'koristeltu saviastia, jossa oli poltettuja ihmisen luita. Luiden arvellaan '
      + 'tulleen roviolta ja päätyneen astiaan vasta myöhemmin.',
    lahde: 'en-Wikipedia "Ale\'s Stones", johdanto-osa sekä osiot "Function" ja '
      + '"Excavations" (tarkistettu 6.9.2026).',
  },
];
