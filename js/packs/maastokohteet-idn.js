/*
 * MAASTOKOHTEET JA KOHTEET — IDN (Indonesia). Erä M3, Aasia, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Indonesialla ei ollut yhtäkään karttamerkkiä ennen tätä erää
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA, ja tässä
 * ne ovat.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-idn.js:ssä — sama syy kuin
 * K2-erissä 1–4: kohdepakki vaatisi rivin js/fokuskohteet.js:n
 * KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon (js/packs/fokus-grc.js),
 * jonka lähtöaineisto on ämpärissä eikä repossa. Maastokohteiden
 * hakemisto (js/packs/maastokohteet.js) liittää listan peliin
 * sellaisenaan.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * TÄLLE MAALLE EI OLE tools/maastoaineisto/IDN.json-tiedostoa, joten
 * maastokohteet on valittu käsin: Krakatau, Tobajärvi ja Komodo. Ne
 * ovat maan tunnetuimmat ja jokainen on eri tyyppiä (vuori, järvi,
 * saari). Kaikki kolme osuvat maan fokuslehden rajaukseen
 * (tools/savukkeet/savuke-maastokohteet.mjs vartio 7a), joka on
 * Indonesialla poikkeuksellisen laaja: lon 86,7…149,3, lat −14,5…9,5.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin (Sumatra, Borneo,
 * Jakarta, Bali ja muut). Lähin uusi merkki on Besakih 12,4
 * lautayksikön päässä Bali-laatasta; raja KAUPUNGIN_KOHDALLA_SADE on 7
 * ja kaupunkikaton säde 8. Kaikki yksitoista ovat siis pääkartan
 * merkkejä, eikä js/packs/maakartat.js:ään ole koskettu.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_IDN = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'borobudur',
    nimi: 'Borobudur',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta reliefipaneelia temppelissä on?',
      'Kuka toi temppelin länsimaiseen tietoon 1814?',
    ],
    korostukset: ['stupan|stupan'],
    nappi: 'Maailman suurin buddhalaistemppeli',
    // 110.204 E / -7.608 N — en-Wikipedia "Borobudur"
    laudat: {
      maailmankartta: { x: 9506.8, y: 3465.6 },
    },
    teksti: 'Borobudur on 800-luvulla rakennettu mahayanabuddhalainen temppeli '
      + 'Magelangin seudulla Keski-Jaavalla. Harmaasta andesiitista muurattu '
      + 'rakennelma on yhdeksän päällekkäistä tasannetta — kuusi neliötä ja kolme '
      + 'ympyrää — ja niiden päällä keskuskupoli, jota ympäröi 72 rei\'itetyn '
      + 'stupan sisällä istuvaa Buddhaa. Reliefipaneeleita on 2 672 ja '
      + 'Buddha-patsaita alun perin 504, mikä tekee kokoelmasta yhden maailman '
      + 'laajimmista. Temppeli hylättiin, kun Jaava kääntyi islamiin, ja se tuli '
      + 'maailman tietoon vasta 1814 Sir Thomas Stamford Rafflesin kautta, jolle '
      + 'paikalliset kertoivat paikan.',
    lahde: 'en-Wikipedia "Borobudur", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'prambanan',
    nimi: 'Prambanan',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä kolme jumalaa Trimurti on?',
      'Mikä oli temppelin alkuperäinen nimi?',
    ],
    korostukset: ['Trimurtille|Trimurtille'],
    nappi: 'Jaavan suurin hindutemppeli',
    // 110.49167 E / -7.75222 N — en-Wikipedia "Prambanan"
    laudat: {
      maailmankartta: { x: 9516.4, y: 3470.4 },
    },
    teksti: 'Prambanan on 800-luvun hindutemppelialue Yogyakartan koillispuolella '
      + 'ja Indonesian suurin hindupyhäkkö. Se on omistettu Trimurtille eli '
      + 'Brahmalle luojana, Vishnulle ylläpitäjänä ja Shivalle hävittäjänä, ja sen '
      + 'keskusrakennus kohoaa 47 metriin. Alue käsitti alun perin 240 '
      + 'temppelirakennusta. Vuoden 856 Shivagrha-piirtokirjoitus kertoo Shivan '
      + 'temppelin vihkimisestä 12. marraskuuta 856 ja nimeää sen Shiva-grhaksi '
      + 'eli Shivan taloksi.',
    lahde: 'en-Wikipedia "Prambanan", johdanto ja osio "Construction" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'trowulan',
    nimi: 'Trowulan',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä valtakunnan pääkaupunki täällä oli?',
      'Mistä runosta kaupungin kuvaus tunnetaan?',
    ],
    korostukset: ['Majapahitin|Majapahitin'],
    nappi: 'Kadonneen suurvallan pääkaupunki',
    // 112.39098 E / -7.54189 N — en-Wikipedia "Trowulan"
    laudat: {
      maailmankartta: { x: 9579.7, y: 3463.4 },
    },
    teksti: 'Trowulan on noin sadan neliökilometrin arkeologinen alue '
      + 'Mojokerton alueella Itä-Jaavalla, ja sitä pidetään Majapahitin '
      + 'valtakunnan pääkaupungin paikkana. Kaupunkia kuvaa 1300-luvun runo '
      + 'Nagarakretagama, jonka kirjoitti hovirunoilija Mpu Prapanca; kuvaus on '
      + 'paikoin niin epämääräinen, että tutkijat ovat päätyneet erilaisiin '
      + 'karttoihin. Vanhempi tutkimus keskittyi temppeleihin, hautoihin ja '
      + 'kylpypaikkoihin, mutta uudet kaivaukset ovat paljastaneet myös '
      + 'käsityö- ja kauppakortteleita, asuinalueita, vesihuoltoa ja kanavia. '
      + 'Kaupunki tuhottiin 1478, ja pääkaupunki siirtyi Dahaan eli Kediriin.',
    lahde: 'en-Wikipedia "Trowulan", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'sangiran',
    nimi: 'Sangiran',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi juuri täältä löytyy fossiileja?',
      'Kuka löysi ensimmäiset ihmisfossiilit 1930-luvulla?',
    ],
    korostukset: ['Homo erectus|Homo erectuksen'],
    nappi: 'Jaavan ihmisen kaivauskenttä',
    // 110.83333 E / -7.45 N — en-Wikipedia "Sangiran"
    laudat: {
      maailmankartta: { x: 9527.8, y: 3460.3 },
    },
    teksti: 'Sangiran on noin 56 neliökilometrin kaivausalue Solo-joen laaksossa '
      + 'Keski-Jaavalla, ja Unescon 1995 raportin mukaan tiedemiehet pitävät sitä '
      + 'yhtenä maailman tärkeimmistä fossiili-ihmisen tutkimuspaikoista '
      + 'Zhoukoudianin, Olduvain ja Sterkfonteinin rinnalla. Syy on geologiassa: '
      + 'alue kohosi miljoonia vuosia sitten kummuksi, joka sitten kului ja '
      + 'paljasti fossiilikerrokset. Eugène Dubois teki alustavia kaivauksia 1883, '
      + 'mutta löysi vähän ja siirtyi Triniliin. Gustav Heinrich Ralph von '
      + 'Koenigswald aloitti työn 1934, ja seuraavina vuosina löytyi Homo '
      + 'erectuksen fossiileja; sittemmin ihmisfossiileja on löydetty noin '
      + 'kuusikymmentä lisää.',
    lahde: 'en-Wikipedia "Sangiran", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'sawahlunto',
    nimi: 'Sawahlunto',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuka löysi seudun hiilen?',
      'Miksi kaupunki autioitui välillä?',
    ],
    korostukset: ['kivihiilikaivos|kivihiilikaivos'],
    nappi: 'Kaakkois-Aasian vanhin hiilikaivos',
    // 100.78333 E / -0.66667 N — en-Wikipedia "Sawahlunto"
    laudat: {
      maailmankartta: { x: 9192.8, y: 3233.7 },
    },
    teksti: 'Sawahlunto on kaupunki Länsi-Sumatralla kapeassa laaksossa Bukit '
      + 'Barisanin vuoriston kupeessa, ja siellä on Kaakkois-Aasian vanhin '
      + 'kivihiilikaivos. Hiilen löysi 1800-luvun puolivälissä insinööri de Greve, '
      + 'ja hollantilaiset aloittivat louhinnan 1876; kaupunki perustettiin '
      + 'kaivostyön ympärille 1882. Kun parhaat vuodet olivat ohi ja kaivokset '
      + 'suljettiin, Sawahluntosta tuli aavekaupunki ja väkiluku romahti. Vuonna '
      + '2004 kaupunki päätti muuttua matkailukohteeksi, ja Ombilinin '
      + 'kaivosalue hyväksyttiin maailmanperintöluetteloon 2019.',
    lahde: 'en-Wikipedia "Sawahlunto", johdanto ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tana-toraja',
    nimi: 'Tana Toraja',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Missä on toradžakulttuurin perinteinen keskus?',
      'Milloin alueen rajat vedettiin?',
    ],
    korostukset: ['toradžojen|toradžojen'],
    nappi: 'Sulawesin ylängön oma maailma',
    // 119.85 E / -3.05 N — en-Wikipedia "Tana Toraja Regency"
    laudat: {
      maailmankartta: { x: 9828.3, y: 3313.2 },
    },
    teksti: 'Tana Toraja on sisämaan hallintoalue Etelä-Sulawesissa ja '
      + 'toradžojen kotiseutu. Hallinnon istuin on Makalen kaupungissa, mutta '
      + 'kulttuurin perinteinen keskus on Rantepao. Alueen rajat määritti '
      + 'Alankomaiden Itä-Intian hallinto 1909, ja vuonna 2008 vanha Tana Toraja '
      + 'jaettiin kahtia Tana Torajaksi ja Pohjois-Torajaksi. Vuodesta 1984 '
      + 'matkailuministeriö on nimennyt alueen Balin jälkeen maan toiseksi '
      + 'matkailukohteeksi, ja sinne on tullut myös lukuisia antropologeja '
      + 'tutkimaan toradžojen kulttuuria.',
    lahde: 'en-Wikipedia "Tana Toraja Regency", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'bandasaaret',
    nimi: 'Bandasaaret',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä muskottipähkinä ja muskottikukka ovat?',
      'Miten saariryhmä on syntynyt?',
    ],
    korostukset: ['muskottipähkinän|muskottipähkinän'],
    nappi: 'Maailman ainoa muskottisaaristo',
    // 129.91667 E / -4.58333 N — en-Wikipedia "Banda Islands"
    laudat: {
      maailmankartta: { x: 10163.9, y: 3364.4 },
    },
    teksti: 'Bandasaaret ovat kymmenen pienen saaren tulivuoriryhmä Bandanmerellä, '
      + 'noin 140 kilometriä Seramista etelään ja 2 000 kilometriä Jaavasta itään. '
      + 'Saaret nousevat 4–6 kilometrin syvyisestä merestä, ja niiden yhteinen '
      + 'maapinta-ala on vain noin 172 neliökilometriä. 1800-luvun puoliväliin '
      + 'saakka Bandasaaret olivat maailman ainoa muskottipähkinän ja '
      + 'muskottikukan lähde. Pääsaariryhmä on hukkuneen tulivuoren kaldera: '
      + 'keskellä ovat Banda Neira ja yhä savuava Gunung Api, ja kaaren muotoiset '
      + 'Lonthoir ja Pulau Pisang ovat kraatterin reunan vedenpäällisiä osia.',
    lahde: 'en-Wikipedia "Banda Islands", johdanto ja osio "Geography" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'besakih',
    nimi: 'Besakih',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi temppeli on rakennettu rinteeseen?',
      'Mitä tapahtui vuoden 1963 purkauksessa?',
    ],
    korostukset: ['padmasana|padmasana'],
    nappi: 'Balin äititemppeli',
    // 115.450936 E / -8.374368 N — en-Wikipedia "Besakih Temple"
    laudat: {
      maailmankartta: { x: 9681.7, y: 3491.3 },
    },
    teksti: 'Besakih on balilaisen hindulaisuuden tärkein, suurin ja pyhin '
      + 'temppeli Agung-tulivuoren rinteellä lähes tuhannen metrin korkeudessa. '
      + 'Se ei ole yksi rakennus vaan 23 erillisen mutta toisiinsa liittyvän '
      + 'temppelin kokonaisuus, jonka tärkein osa on Pura Penataran Agung. '
      + 'Rakennukset nousevat kuudella terassilla rinnettä ylös yhtä akselia '
      + 'pitkin niin, että kulkija lähestyy pyhänä pidettyä vuorta; keskuksena on '
      + 'lootosvaltaistuin padmasana 1600-luvulta. Vuoden 1963 purkauksessa laavat '
      + 'pysähtyivät metrien päähän temppelistä, mitä balilaiset pitivät ihmeenä.',
    lahde: 'en-Wikipedia "Besakih Temple", johdanto sekä osiot "Architecture" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'krakatau',
    nimi: 'Krakatau',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka kauas vuoden 1883 räjähdys kuului?',
      'Mikä Anak Krakatau on?',
    ],
    korostukset: ['kaldera|kaldera'],
    nappi: 'Räjähdys, joka kuului Australiaan',
    // 105.423 E / -6.102 N — en-Wikipedia "Krakatoa"
    laudat: {
      maailmankartta: { x: 9347.4, y: 3415.1 },
    },
    teksti: 'Krakatau on kaldera Sundansalmessa Jaavan ja Sumatran välissä, ja '
      + 'siihen kuuluu neljän saaren ryhmä. Rakata on ainoa jäänne siitä '
      + 'saaresta, jonka vuoden 1883 purkaus enimmäkseen tuhosi ja jonka tilalle '
      + 'jäi kaldera. Elokuun 26.–27. päivän 1883 räjähdyssarja oli '
      + 'purkausvoimakkuudeltaan luokkaa 6 ja sinkosi noin 25 kuutiokilometriä '
      + 'kiveä; pamaus kuultiin 3 600 kilometrin päässä Alice Springsissä '
      + 'Australiassa ja 4 780 kilometrin päässä Rodriguesin saarella. Vuonna '
      + '1927 kalderasta nousi uusi saari, Anak Krakatau eli Krakataun lapsi.',
    lahde: 'en-Wikipedia "Krakatoa", johdanto ja osio "Historical significance" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'tobajarvi',
    nimi: 'Tobajärvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Mikä supertulivuori on?',
      'Mitä Toban katastrofiteoria väittää?',
    ],
    korostukset: ['supertulivuoren|supertulivuoren'],
    nappi: 'Maailman suurin tulivuorijärvi',
    // 98.88 E / 2.68 N — en-Wikipedia "Lake Toba"
    laudat: {
      maailmankartta: { x: 9129.3, y: 3122.1 },
    },
    teksti: 'Tobajärvi on Toban supertulivuoren valtava kaldera Pohjois-Sumatran '
      + 'keskiosassa noin 900 metrin korkeudessa. Järvi on noin sata kilometriä '
      + 'pitkä, kolmekymmentä leveä ja jopa 505 metriä syvä — Indonesian suurin '
      + 'järvi ja maailman suurin tulivuorijärvi. Sen synnytti purkaus noin '
      + '74 000 vuotta sitten, viimeisten 25 miljoonan vuoden voimakkain tunnettu '
      + 'räjähdyspurkaus. Toban katastrofiteorian mukaan purkaus kuristi '
      + 'ihmiskunnan väkiluvun hetkeksi hyvin pieneksi, mutta uudempi tutkimus on '
      + 'kyseenalaistanut väitteen: pysyvästä romahduksesta ei ole löytynyt '
      + 'todisteita.',
    lahde: 'en-Wikipedia "Lake Toba", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'komodo',
    nimi: 'Komodo',
    tyyppi: 'saari',
    kysymykset: [
      'Kumpi sai nimensä ensin, saari vai lisko?',
      'Mikä Korallikolmio on?',
    ],
    korostukset: ['Korallikolmioon|Korallikolmioon'],
    nappi: 'Liskon nimikkosaari',
    // 119.45 E / -8.55 N — en-Wikipedia "Komodo (island)"
    laudat: {
      maailmankartta: { x: 9815, y: 3497.2 },
    },
    teksti: 'Komodo on 291 neliökilometrin saari Pienten Sundasaarten ketjussa '
      + 'Sumbawan ja Floresin välissä, ja sillä asui vuonna 2020 noin 1 800 '
      + 'ihmistä. Saari tunnetaan komodonvaraanin elinympäristönä: maailman suurin '
      + 'lisko on saanut nimensä saaren mukaan eikä toisin päin. Komodo liitettiin '
      + '1991 Komodon kansallispuistoon, ja siitä tuli maailmanperintökohde ja '
      + 'biosfäärialue. Ympäröivät vedet kuuluvat Korallikolmioon, joka on yksi '
      + 'maapallon lajirikkaimmista merialueista.',
    lahde: 'en-Wikipedia "Komodo (island)", johdanto ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
];
