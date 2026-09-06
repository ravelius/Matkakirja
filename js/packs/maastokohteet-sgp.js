/*
 * MAASTOKOHTEET JA KOHTEET — SGP (Singapore). Erä M8, Aasia 2, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Singaporella ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko).
 *
 * PIENEN MAAN KIINTIÖ (maailman erän ohje): tavoite 8 + 3 ei mahdu
 * Singaporeen, joten tehdään niin monta kuin nimiölimitys sallii ja
 * vaje kirjataan. Sama oppi kuin Hongkongissa erässä M3: koko maa
 * mahtuu maailmankartalla noin 10 × 10 lautayksikön ruutuun, ja yhden
 * nostomerkin nimiölaatikko on leveämpi kuin koko maa. Kartalle
 * kirjoitettiin siksi KAHDEKSAN merkkiä — viisi kohdetta, yksi
 * maastokohde ja kaksi skandaalia — täsmälleen sama määrä kuin
 * Hongkongissa. Yhdeksäs toi ensimmäisen nimiö–nimiö-limityksen.
 *
 * ELÄINTÄKY ON MAHDOTON, JA SYY ON MITATTU. Merkin on oltava vähintään
 * 35 lautayksikön päässä jokaisesta kaupunkimerkistä
 * (tests/elaintakyt.test.mjs VAHIN_ETAISYYS_KAUPUNKIIN), mutta jokainen
 * piste Singaporen alueella on 12,6–21,6 yksikön päässä omasta
 * Singapore-laatastaan. Yksikään piste maan rajojen sisällä ei siis
 * kelpaa. Ehdokas odottaa valmiina: sarvinokkalintu (Anthracoceros
 * albirostris), joka katosi Singaporesta 1800-luvulla ja palasi Pulau
 * Ubinille 1990-luvulla.
 *
 * MIKÄ JÄI KOHDEKARTALLE. Singaporen kaupunkilehden kohdekartta
 * (js/packs/maakartat.js singapore) rajautuu ruutuun lat 1,276–1,308 ja
 * lon 103,836–103,874, ja sen ruutuun osuva nosto kuuluu kohdekartan
 * pisteelle eikä pääkartalle (tests/nostot-kartalla.test.mjs). Sinne
 * jäävät siis Fort Canningin kukkula, Raffles Hotel, Empress Place,
 * Boat Quay ja Sri Mariamman -temppeli — ne ovat jo kohdekartan
 * pisteinä. Pääkartalle kirjoitettiin vain ruudun ulkopuolelle jäävät
 * kohteet.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-sgp.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI. Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista. Kaikki merkit
 * osuvat maan fokuslehden rajaukseen (x 9268,0…9320,1, y 3143,2…3189,3;
 * tools/savukkeet/savuke-maastokohteet.mjs vartio 7a).
 *
 * EI PELIKAUPUNGIN KOHDALLA — MUTTA VAIN LAATAN SIJAINNIN ANSIOSTA.
 * Laudan Singapore-laatta on kohdassa 9286,7 / 3151,5 eli saaren
 * luoteispuolella, joten lähin uusi merkki (Johorin salmen rannan
 * Kranji) on 13,7 lautayksikön päässä ja kaukaisin (Rafflesin majakka)
 * 21,6 — kaikki yli KAUPUNGIN_KOHDALLA_SADE-rajan, joka on 7.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_SGP = [
  /* ─────────────────────────── KOHTEET (5) ─────────────────────── */
  {
    id: 'sgp-kasvitieteellinen-puutarha',
    nimi: 'Kasvitieteellinen puutarha',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miten puutarha vaikutti kumibuumiin?',
      'Kuinka suuri orkideakokoelma on?',
    ],
    korostukset: ['Ridley|Ridley'],
    nappi: 'Puutarha, joka teki kumin',
    // 103.8162 E / 1.3151 N — en-Wikipedia "Singapore Botanic Gardens"
    laudat: {
      maailmankartta: { x: 9293.9, y: 3167.7 },
    },
    teksti: 'Singaporen kasvitieteellinen puutarha on trooppinen puutarha '
      + 'Orchard Roadin kauppakadun laidalla, ja se on maailman kolmesta '
      + 'maailmanperintöluetteloon otetusta puutarhasta ainoa trooppinen. '
      + 'Nykyiselle paikalleen sen perusti 1859 Agri-horticultural Society. '
      + 'Puutarhalla oli ratkaiseva osa alueen kumibuumissa 1900-luvun alussa: '
      + 'sen ensimmäinen tieteellinen johtaja Henry Nicholas Ridley kehitti '
      + 'kumin keräysmenetelmän, joka on yhä käytössä, ja markkinoi lajin '
      + 'taloudellista arvoa istutusten omistajille. Parhaimmillaan 1920-luvulla '
      + 'Malaijan niemimaa tuotti puolet maailman lateksista. Puutarhan '
      + 'kansallisessa orkideatarhassa on 1 200 lajia ja 2 000 risteytystä eli '
      + 'maailman suurin orkideakokoelma.',
    lahde: 'en-Wikipedia "Singapore Botanic Gardens", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'pulau-ubin',
    nimi: 'Pulau Ubin',
    tyyppi: 'muu',
    kysymykset: [
      'Mitä saaren nimi tarkoittaa?',
      'Mihin saaren graniittia käytettiin?',
    ],
    korostukset: ['graniitti|graniitti'],
    nappi: 'Graniittisaari, jolta väki lähti',
    // 103.96 E / 1.40944 N — en-Wikipedia "Pulau Ubin"
    laudat: {
      maailmankartta: { x: 9298.7, y: 3164.5 },
    },
    teksti: 'Pulau Ubin on saari Singaporen koillispuolella, ja nimi '
      + 'tarkoittaa malaijiksi graniittisaarta: ubin on jaavaksi neliöity kivi, '
      + 'ja saaren kivestä tehtiin ennen lattialaattoja. Saari näkyy kartoissa '
      + 'jo vuoden 1828 luonnoksessa nimellä Pulo Obin. Sen louhosten '
      + 'graniitti kuljetettiin tongkang-veneillä muun muassa Horsburghin '
      + 'majakalle 1850–1851 ja myöhemmin Johorin pengertien rakentamiseen. '
      + 'Kun louhokset suljettiin 1970-luvulla ja työt loppuivat, asukkaat '
      + 'alkoivat lähteä: 1960-luvulla saarella asui muutama tuhat ihmistä, '
      + 'vuonna 2012 enää noin neljäkymmentä. Saari on yksi Singaporen '
      + 'viimeisistä maaseutumaisista alueista ja osa Ubin–Khatibin '
      + 'kansainvälisesti tärkeää lintualuetta.',
    lahde: 'en-Wikipedia "Pulau Ubin", johdanto sekä osiot "Etymology" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'kranji',
    nimi: 'Kranji',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä muistomerkin muodot esittävät?',
      'Kuinka monta nimeä muureihin on kaiverrettu?',
    ],
    korostukset: ['muistomerkki|muistomerkki'],
    nappi: 'Kolme puolustushaaraa kivessä',
    // 103.7573 E / 1.419 N — en-Wikipedia "Kranji War Memorial"
    laudat: {
      maailmankartta: { x: 9291.9, y: 3164.2 },
    },
    teksti: 'Kranjin sotamuistomerkki on Woodlands Roadin varrella Pohjois-'
      + 'Singaporessa. Se on omistettu niille Britannian, Australian, Kanadan, '
      + 'Sri Lankan, Intian, Malaijan, Alankomaiden ja Uuden-Seelannin miehille '
      + 'ja naisille, jotka kuolivat puolustaessaan Singaporea ja Malaijaa '
      + 'toisessa maailmansodassa. Muistomerkki kuvaa kolmea puolustushaaraa: '
      + 'pylväät esittävät armeijaa, joka marssii kolonnissa, pylväiden päällä '
      + 'oleva katos on muotoiltu lentokoneen siiviksi ja ylin osa muistuttaa '
      + 'sukellusveneen tornia. Muureihin on kaiverrettu yli 24 000 nimeä niistä '
      + 'liittoutuneiden sotilaista, joiden ruumiita ei koskaan löydetty. '
      + 'Aluetta hoitaa Commonwealth War Graves Commission.',
    lahde: 'en-Wikipedia "Kranji War Memorial", johdanto ja osio "Overview" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'rafflesin-majakka',
    nimi: 'Rafflesin majakka',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä majakan kivet tuotiin?',
      'Mitä saaren nimi tarkoittaa?',
    ],
    korostukset: ['Pulau Satumu|Pulau Satumu'],
    nappi: 'Yhden puun saari',
    // 103.74089 E / 1.16006 N — en-Wikipedia "Raffles Lighthouse"
    laudat: {
      maailmankartta: { x: 9291.4, y: 3172.8 },
    },
    teksti: 'Rafflesin majakka seisoo Pulau Satumun kalliosaarella '
      + 'Singaporen salmessa noin neljätoista kilometriä pääsaaresta etelään. '
      + 'Majakkaa esitettiin jo 1833, mutta peruskivi laskettiin vasta 1854 '
      + 'kuvernööri William John Butterworthin aikana, ja se nimettiin '
      + 'nykyisen Singaporen 1819 perustaneen Stamford Rafflesin mukaan. '
      + 'Perustuksen kivet louhittiin Pulau Ubinilta. Saaren nimi tarkoittaa '
      + 'yhden puun saarta: sa on satu eli yksi ja tumu on malaijiksi suuri '
      + 'mangrovepuu. Alkuperäinen sydänliekki korvattiin 1905 paineistetulla '
      + 'petrolihehkuvalolla, ja pyörivä linssi lepäsi rullavaunulla, jonka '
      + 'painomekanismi piti kelata käsin joka tunti; majakan miehistöön '
      + 'kuului seitsemän miestä.',
    lahde: 'en-Wikipedia "Raffles Lighthouse", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'haw-par-villa',
    nimi: 'Haw Par Villa',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä puiston rakennuttivat?',
      'Miksi paikka valittiin?',
    ],
    korostukset: ['dioraamaa|dioraamaa'],
    nappi: 'Tiikeribalsamin puutarha',
    // 103.78222 E / 1.28417 N — en-Wikipedia "Haw Par Villa"
    laudat: {
      maailmankartta: { x: 9292.7, y: 3168.7 },
    },
    teksti: 'Haw Par Villa eli Tiger Balm Gardens on puisto Pasir Panjang '
      + 'Roadin varrella Queenstownissa. Siellä on yli tuhat patsasta ja 150 '
      + 'jättimäistä dioraamaa, jotka esittävät kiinalaisen kirjallisuuden, '
      + 'kansanperinteen ja historian kohtauksia sekä taolaisuuden, '
      + 'buddhalaisuuden ja kungfutselaisuuden aiheita. Burmankiinalaiset '
      + 'veljekset Aw Boon Haw ja Aw Boon Par, tiikeribalsamin kehittäjät, '
      + 'siirsivät liiketoimintansa Singaporeen 1926 ja ostivat tontin 1935; '
      + 'paikka valittiin feng shuin perusteella, koska sen takana on pieni '
      + 'kukkula ja edessä Singaporen salmi. Huvila tuhoutui sodassa, mutta '
      + 'Boon Haw teetti puutarhaan patsaita ja dioraamoja vuodesta 1937 '
      + 'kuolemaansa 1954 asti opettaakseen kiinalaisia perinteisiä arvoja. '
      + '1970- ja 1980-luvuilla puistossa arvioidaan käyneen ainakin miljoona '
      + 'kävijää vuodessa.',
    lahde: 'en-Wikipedia "Haw Par Villa", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (1) ────────────────────── */
  {
    id: 'bukit-timah',
    nimi: 'Bukit Timah',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea kukkula on?',
      'Mikä on Singaporen korkein kohta?',
    ],
    korostukset: ['luonnonsuojelualueen|luonnonsuojelualueen'],
    nappi: 'Saaren korkein kukkula',
    // 103.77639 E / 1.35472 N — en-Wikipedia "Bukit Timah Hill"
    laudat: {
      maailmankartta: { x: 9292.5, y: 3166.3 },
    },
    teksti: 'Bukit Timah on Singaporen korkein luonnollinen huippu, 164 '
      + 'metriä merenpinnasta. Koko maan korkein kohta ei kuitenkaan ole se '
      + 'vaan 284-metrinen Guoco Tower — kukkulaa korkeampia rakennuksia on '
      + 'kymmeniä. Kukkula on nimestään huolimatta Bukit Panjangin '
      + 'luonnonsuojelualueen osassa eikä samannimisessä kaupunginosassa, '
      + 'lähellä saaren maantieteellistä keskipistettä. Se kuuluu Bukit '
      + 'Timahin luonnonsuojelualueeseen, joka on luokiteltu ASEANin '
      + 'perintöpuistoksi. Rinteet ovat jyrkkiä, paikoin 40–50 asteen '
      + 'kaltevuudessa, ja huipulle pääsee vain kävelypolkuja pitkin: '
      + 'huoltotie 1960-luvulla rakennetuille radiomastoille ei ole yleisölle '
      + 'avoin.',
    lahde: 'en-Wikipedia "Bukit Timah Hill", johdanto sekä osiot "Altitude" ja '
      + '"Location and accessibility" (tarkistettu 6.9.2026).',
  },
];
