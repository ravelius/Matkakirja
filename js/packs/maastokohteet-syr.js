/*
 * MAASTOKOHTEET — SYR. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SYR --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SYR.json. Työkalu laskee laudan
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
 * Syyrian maastokohteet. Faktat en-Wikipediasta 30.8.2026. Maalla on jo fokuskohteet-syr.js (Belin temppeli) — maastoa siinä ei ole, joten päällekkäisyyksiä ei synny. Eufratin merkki on Raqqan ja Dayr az Zawrin välissä, jottei se osu lehteen poltetun Dayr az Zawrin nimen päälle.
 */
export const MAASTOKOHTEET_SYR = [
  {
    id: 'hermonvuori',
    nimi: 'Hermonvuori',
    tyyppi: 'vuori',
    kysymykset: [
      'Voiko Lähi-idässä hiihtää?',
      'Miksi vuoren laella on YK:n vartioasema?',
    ],
    korostukset: ['Anti-Libanon|Anti-Libanonin'],
    nappi: 'Syyrian lumihuippu',
    // 35.8575 E / 33.4161 N — en-Wikipedia "Mount Hermon"
    laudat: {
      maailmankartta: { x: 7028.6, y: 2054.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Hermonvuori on Anti-Libanonin vuoriston eteläinen pääte, ja sen 2 814-metrinen laki '
      + 'Syyrian ja Libanonin rajalla on Syyrian korkein kohta. Huipulla, YK:n valvomalla '
      + 'puskurivyöhykkeellä, on maailman korkein pysyvästi miehitetty YK-asema, lempinimeltään '
      + 'Hermon-hotelli. Etelärinteillä Golanin puolella toimii hiihtokeskus — lunta siis '
      + 'riittää keskellä Lähi-itää.',
    lahde: 'en-Wikipedia "Mount Hermon", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Syyrian rannikkoa kutsutaan Levantiksi?',
    ],
    korostukset: ['Levantti|Levantiksi'],
    nappi: 'Meri kolmen maanosan välissä',
    // 35.35 E / 35.3 N — ulappa Latakian edustalla; artikkelin oma keskipiste on 18 / 35
    laudat: {
      maailmankartta: { x: 7011.7, y: 1984.1 },
      europe: { x: 889.9, y: 965.2 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Syyrian rannikko on sen itäisintä reunaa, jota kutsutaan '
      + 'Levantiksi. Lännessä meri yhtyy Atlanttiin Gibraltarinsalmen kautta ja kaakossa Suezin '
      + 'kanava vie Punaisellemerelle.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'eufrat',
    nimi: 'Eufrat',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Mesopotamia oli?',
      'Missä Eufrat ja Tigris yhtyvät?',
    ],
    korostukset: ['Mesopotamia|Mesopotamian'],
    nappi: 'Mesopotamian synnyttäjä',
    // 39.55 E / 35.65 N — joen laakso Raqqan ja Dayr az Zawrin välissä; artikkelin koordinaatti 47,442 / 31,005 on Shatt al-Arabissa Irakissa
    laudat: {
      maailmankartta: { x: 7151.7, y: 1970.8 },
      europe: { x: 970.6, y: 956 },
    },
    teksti: 'Eufrat on Länsi-Aasian pisin joki ja yhdessä Tigriksen kanssa toinen Mesopotamian '
      + 'kahdesta määrittävästä virrasta. Se saa alkunsa Turkista, virtaa koko Syyrian halki '
      + 'kaakkoon ja jatkaa Irakiin, missä se yhtyy Tigrikseen Shatt al-Arabiksi ja laskee '
      + 'Persianlahteen. Kuivassa maassa joen laakso on vihreä nauha, jonka varrella Syyrian '
      + 'viljelykset ja kaupungit ovat aina olleet.',
    lahde: 'en-Wikipedia "Euphrates", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

