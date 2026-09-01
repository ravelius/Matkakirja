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
];

