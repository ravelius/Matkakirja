/*
 * MAASTOKOHTEET — NZL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs NZL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/NZL.json. Työkalu laskee laudan
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
 * Uuden-Seelannin maastokohteet. Faktat en-Wikipediasta 30.8.2026; suomalaiset nimiasut fi-Wikipediasta (Eteläiset Alpit, Tasmaninmeri). Eteläisten Alppien merkki on vuoriston pohjoispuoliskossa eikä artikkelin keskipisteessä 170,5 / −43,5, joka osuisi lähes Aorakin merkin päälle. Tasmaninmeren merkki on ulapalla Eteläsaaren luoteispuolella — artikkelin oma keskipiste 160 / −40 jää lehden ikkunan länsipuolelle.
 */
export const MAASTOKOHTEET_NZL = [
  {
    id: 'aorakimountcook',
    nimi: 'Aoraki / Mount Cook',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuori madaltui neljäkymmentä metriä?',
      'Millaista on nousta Uuden-Seelannin korkeimmalle huipulle?',
    ],
    korostukset: ['maorin kieli|maorin kielellä'],
    nappi: 'Pilvien lävistäjä',
    // 170.1419 E / -43.595 N — en-Wikipedia "Aoraki / Mount Cook" (43°35′42″S 170°08′31″E)
    laudat: {
      maailmankartta: { x: 11504.7, y: 4763.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Aoraki / Mount Cook on Uuden-Seelannin korkein vuori, 3 724 metriä. Se kohoaa '
      + 'Eteläisillä Alpeilla Eteläsaaren keskiosassa ja on topografiselta eristyneisyydeltään '
      + 'maailman kymmenes. Vuonna 1991 laelta romahti kymmenen metriä kalliota ja jäätä, ja '
      + 'paljastuneen jäähatun kuluminen vei kahdessa vuosikymmenessä vielä kolmekymmentä '
      + 'metriä lisää: vanha lukema 3 764 metriä on nyt 3 724. Maorin kielellä Aoraki '
      + 'tarkoittaa pilvien lävistäjää. Englanninkielinen nimi annettiin 1851 James Cookin '
      + 'muistoksi, vaikka Cook ei koskaan nähnyt vuorta; kaksoisnimi vahvistettiin '
      + 'sopimuksella 1998.',
    lahde: 'en-Wikipedia "Aoraki / Mount Cook", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'etelaisetalpit',
    nimi: 'Eteläiset Alpit',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Alpine Fault?',
      'Miksi vuoriston länsipuolella sataa niin paljon?',
    ],
    korostukset: ['jäätikkö|jäätikköä'],
    nappi: 'Viidensadan kilometrin selkäranka',
    // 171.5 E / -42.95 N — merkki vuoriston pohjoispuoliskossa; en-Wikipedia "Southern Alps" antaa keskipisteeksi 170,5 / −43,5, joka osuisi Aorakin merkin päälle
    laudat: {
      maailmankartta: { x: 11550, y: 4737.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Eteläiset Alpit on noin 500 kilometriä pitkä vuorijono, joka kulkee Eteläsaaren halki '
      + 'koillisesta lounaaseen. Korkein huippu on Aoraki / Mount Cook, ja kolmen kilometrin '
      + 'korkeuden ylittää vielä seitsemäntoista muuta huippua. Vuoristo on syntynyt '
      + 'Tyynenmeren ja Indoaustralialaisen laatan törmäyksessä Alpine Fault -siirroksen '
      + 'varrella, ja kohoaminen on ollut nopeinta viimeisten viiden miljoonan vuoden aikana. '
      + 'Päävedenjakajan tuntumassa sataa jopa 15 000 millimetriä vuodessa, kolmekymmentä '
      + 'kilometriä idempänä vain tuhat. Vuoristossa on yli 3 000 jäätikköä; pisin niistä, '
      + 'Tasman, on 23,5 kilometriä.',
    lahde: 'en-Wikipedia "Southern Alps", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'tasmaninmeri',
    nimi: 'Tasmaninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuka oli Abel Tasman?',
      'Miksi merta kutsutaan leikillään Ojaksi?',
    ],
    korostukset: ['lennätin|lennätinkaapeli'],
    nappi: 'Kaksituhatta kilometriä Australiaan',
    // 168.5 E / -40.8 N — ulappa Eteläsaaren luoteispuolella; en-Wikipedia "Tasman Sea" antaa keskipisteeksi 160 / −40, joka jää lehden ikkunan ulkopuolelle
    laudat: {
      maailmankartta: { x: 11450, y: 4651.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Tasmaninmeri erottaa Uuden-Seelannin Australiasta. Leveyttä on noin 2 000 kilometriä, '
      + 'pituutta pohjoisesta etelään noin 2 800 ja pinta-alaa 2,3 miljoonaa neliökilometriä; '
      + 'syvimmillään meri on 5 943 metriä. Nimi tulee hollantilaiselta Abel Janszoon '
      + 'Tasmanilta, joka ylitti sen ensimmäisenä tunnettuna eurooppalaisena vuonna 1642, ja '
      + 'James Cook purjehti samoilla vesillä 1770-luvulla. Maoriksi meri on Te Moana-a-Rehua. '
      + 'Ensimmäinen lennätinkaapeli maiden välille laskettiin 1876 ja ensimmäinen lento '
      + 'onnistui 1928.',
    lahde: 'en-Wikipedia "Tasman Sea", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

