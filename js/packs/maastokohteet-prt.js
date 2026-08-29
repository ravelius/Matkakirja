/*
 * MAASTOKOHTEET — PRT. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs PRT --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/PRT.json. Työkalu laskee laudan
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
 * Portugalin maastokohteet. Faktat en-Wikipediasta 29.8.2026. HUOM: Pico (2 351 m) on Portugalin korkein, mutta se on Azoreilla (lon -28) eikä mahdu maan fokuslehden ikkunaan. Listalla on siksi Torre, jonka artikkeli itse nimeää mannermaisen Portugalin korkeimmaksi pisteeksi.
 */
export const MAASTOKOHTEET_PRT = [
  {
    id: 'torre',
    nimi: 'Torre',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi Torre ei ole tavallinen huippu?',
      'Sataako Serra da Estrelalla lunta?',
    ],
    korostukset: ['Serra da Estrela|Serra da Estrela'],
    nappi: 'Huippu, jolle pääsee autolla',
    // -7.613 E / 40.3219 N — en-Wikipedia "Serra da Estrela"
    laudat: {
      maailmankartta: { x: 5579.6, y: 1790.2 },
      europe: { x: 65, y: 833.1 },
    },
    teksti: 'Serra da Estrela on mannermaisen Portugalin korkein vuoristo ja Sistema Centralin '
      + 'läntisin osa. Sen korkein kohta, 1 993 metriä, ei ole erillinen huippu vaan '
      + 'ylätasangon korkein piste, ja sitä kutsutaan nimellä Torre. Se on epätavallinen huippu '
      + 'siinäkin, että sinne pääsee päällystettyä tietä pitkin.',
    lahde: 'en-Wikipedia "Serra da Estrela", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'atlantti',
    nimi: 'Atlantti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi juuri portugalilaiset lähtivät Atlantille ensimmäisinä?',
      'Kuinka syvä Atlantti on?',
    ],
    nappi: 'Valtameri, jonka takaa löytyi uusi maailma',
    // -9.95 E / 39.6 N — ulappa Portugalin rannikon edustalla, lehden ikkunan länsireunassa; artikkelin oma keskipiste on -25 / 0
    laudat: {
      maailmankartta: { x: 5501.7, y: 1818.6 },
      europe: { x: 20.2, y: 852.1 },
    },
    teksti: 'Atlantti on maailman valtamerista toiseksi suurin: pinta-alaa noin 85 133 000 '
      + 'neliökilometriä eli noin 17 prosenttia maapallon pinnasta ja lähes neljännes sen '
      + 'vesialasta. Löytöretkien aikaan se tunnettiin merenä, joka erotti Amerikan uuden '
      + 'maailman Afro-Euraasian vanhasta. Portugalin koko rannikko on tätä merta.',
    lahde: 'en-Wikipedia "Atlantic Ocean", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'tejo',
    nimi: 'Tejo',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Lissabon rakennettiin juuri joen suulle?',
      'Millä nimellä joki tunnetaan Espanjassa?',
    ],
    nappi: 'Iberian pisin joki',
    // -8.68 E / 39.24 N — Santarém joen alajuoksulla Portugalin puolella; artikkelilla ei ole koordinaattia
    laudat: {
      maailmankartta: { x: 5544, y: 1832.7 },
      europe: { x: 44.5, y: 861.6 },
    },
    teksti: 'Tejo on Iberian niemimaan pisin joki. Se saa alkunsa Montes Universales -vuoristosta '
      + 'Keski-Espanjasta, virtaa 1 007 kilometriä pääosin länteen ja laskee Atlanttiin '
      + 'Lissabonin kohdalla. Espanjan puolella sen nimi on Tajo.',
    lahde: 'en-Wikipedia "Tagus", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'douro',
    nimi: 'Douro',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Douron laakso on kuuluisa viinistään?',
      'Mistä joki saa alkunsa?',
    ],
    nappi: 'Iberian vesirikkain joki',
    // -7.79 E / 41.16 N — Peso da Régua viinilaaksossa; artikkelin koordinaatti -8,669 / 41,143 on suistossa Portossa
    laudat: {
      maailmankartta: { x: 5573.7, y: 1757.1 },
      europe: { x: 61.6, y: 811.1 },
    },
    teksti: 'Douro on virtaamaltaan Iberian niemimaan suurin joki. Se nousee Pico de Urbiónilta '
      + 'Espanjan Sorian maakunnassa, virtaa länteen Kastilia ja Leónin pohjoisosan halki ja '
      + 'jatkaa Pohjois-Portugaliin, missä se laskee Atlanttiin Portossa, maan toiseksi '
      + 'suurimmassa kaupungissa. Sen suurin sivujoki on oikealta tuleva Esla.',
    lahde: 'en-Wikipedia "Douro", johdanto-osa (tarkistettu 29.8.2026).',
  },
];

