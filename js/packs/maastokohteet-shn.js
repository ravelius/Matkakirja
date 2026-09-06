/*
 * MAASTOKOHTEET JA KOHTEET — SHN (Saint Helena). Erä M16, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Saint Helenalla ei ollut ennen tätä erää yhtäkään karttamerkkiä
 * (docs/moduulit/karttanostot-kattavuus.md, Afrikan taulukko).
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-shn.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M11: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * ── MIKSI KOHTEITA ON VAIN VIISI ───────────────────────────────────
 *
 * Tavoite on 8 kohdetta ja 3 maastokohdetta, mutta Saint Helena on
 * 16 × 8 kilometrin saari. Maailmankartan mitassa (Millerin lieriö,
 * LEVEYS 12000) koko saari mahtuu noin neljän lautayksikön ruutuun
 * (piirretty saari on x 5640,6…5644,7 ja y 3746,1…3749,5), kun taas
 * yhden merkin nimiölaatikko on parikymmentä yksikköä leveä. Merkit
 * eivät siis ole toistensa vieressä vaan päällä, ja ladonnan
 * erottelupassi (js/fokuskohteet.js eritteleKohdeRyhmat) joutuu
 * levittämään ne saaren ympärille.
 *
 * Enimmäismäärä haettiin koneellisesti: kokeiltiin kaikki
 * yhdistelmät kahdeksasta ehdokkaasta ja mitattiin tulos
 * tools/tarkista-nimiolimitys.mjs:llä. Viisi kohdetta + kaksi
 * skandaalia (js/packs/skandaalit.js) on suurin joukko, jolla
 * "NIMIÖ NIMIÖN PÄÄLLÄ" pysyy nollassa eikä yksikään nimiö jää
 * väistön piilottamaksi. Kuudes kohde tuottaa aina vähintään yhden
 * limityksen. Vaje (kohteita −5, maastoa −1) on kirjattu
 * docs/moduulit/karttanostot-kattavuus.md:n erälohkoon.
 *
 * POIS JÄIVÄT tällä mitalla Jaakobin tikkaat (Jacob's Ladder, 1829
 * rakennettu köysirata Jamestownin ja Ladder Hillin välillä) ja
 * Longwood House. Longwoodin tarina kerrotaan silti — se on tämän erän
 * skandaali "Longwood House" (js/packs/skandaalit.js).
 *
 * ── EI PELIKAUPUNGIN KOHDALLA ──────────────────────────────────────
 *
 * Laudan St. Helena -kaupunki on tyylitellyllä paikalla saaren
 * koillispuolella (x 5679,2 / y 3673, js/packs/maailmankartta.js
 * CITIES), kun taas saaren oikea projektio on x ≈ 5643 / y ≈ 3748.
 * Jokainen uusi merkki on siis 82–84 lautayksikön päässä
 * kaupunkilaatasta, ja raja KAUPUNGIN_KOHDALLA_SADE on 7. Etäisyys
 * mitattiin jokaiseen laudan kaupunkiin ja on kirjattu jokaisen
 * koordinaattirivin viereen.
 *
 * Kaikki viisi pistettä osuvat SHN-lehden rajaukseen (js/packs/
 * fokus-grc.js FOKUS_POHJAT.SHN: x 5620,4…5665,0 ja y 3725,5…3770,4).
 *
 * ── ELÄINTÄKY PUUTTUU, JA SYY ON MITTA ─────────────────────────────
 *
 * Saint Helenan tikkuri (wirebird) olisi maan luonteva eläintäky,
 * mutta tests/elaintakyt.test.mjs vaatii, että täyn piste osuu laudan
 * MAA-ALUEELLE (js/mapart.js isOnLand, map.outlines). Maailmankartan
 * outlines-taulussa ei ole Saint Helenan saarta lainkaan — saari on
 * vain countryShapes-renkaana — joten yksikään saaren piste ei läpäise
 * testiä. Vartiota ei kierretty eikä poikkeuslistaa lisätty; vaje on
 * kirjattu raporttiin ja kattavuusdokumenttiin Fablen ratkaistavaksi.
 *
 * KUVATON ERÄ. Faktat en-Wikipedian raakatekstistä 6.9.2026.
 */
export const MAASTOKOHTEET_SHN = [
  /* ─────────────────────────── KOHTEET (3) ─────────────────────── */
  {
    id: 'high-knoll-fort',
    nimi: 'High Knoll Fort',
    // Kartalle lyhyt asu: koko nimi ei mahdu nimiöön.
    nimio: 'High Knoll',
    tyyppi: 'historia',
    kysymykset: [
      'Ketä vastaan linnake rakennettiin?',
      'Mitä linnakkeessa tehtiin myöhemmin?',
    ],
    korostukset: ['redutti|redutti'],
    nappi: 'Saaren suurin linnoitus',
    // 5.7168 W / 15.9440 S — en-Wikipedia "High Knoll Fort".
    // Lähin kaupunki St. Helena 82,8 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 5642.8, y: 3747.4 },
    },
    teksti: 'High Knoll Fort on Itä-Intian kauppakomppanian rakentama redutti 584 metrin '
      + 'korkeudessa noin puolentoista kilometrin päässä Jamestownin vanhasta osasta. Se '
      + 'kohoaa kaupungin yllä, ja se rakennettiin puolustautumaan ranskalaisten '
      + 'maihinnousua vastaan ja suojapaikaksi saarelaisille. Alkuperäinen rakennus oli '
      + 'vuonna 1799 pystytetty pyöreä torni, jota joskus kutsutaan Martello-torniksi ja '
      + 'jonka tehtävänä oli suojata Ladder Hillin patteriston takaosaa; torni jäi osaksi '
      + 'nykyistä rakennusta, jonka kuninkaalliset insinöörit rakensivat 1874. Ennen '
      + 'uudistusta linnake tunnettiin nimellä Citadel, ja se on saaren suurin ja täydellisin '
      + 'sotilaskohde. Myöhemmin siinä pidettiin karanteenissa tuotuja kanoja, lampaita ja '
      + 'nautoja, ja 1980-luvun puolivälissä NASAlla oli siellä pieni seuranta-asema. '
      + 'Linnake avattiin yleisölle uudelleen 18. joulukuuta 2010.',
    lahde: 'en-Wikipedia "High Knoll Fort", johdanto ja artikkelin runko (tarkistettu '
      + '6.9.2026).',
  },
  {
    id: 'plantation-house',
    nimi: 'Plantation House',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi kuvernöörin talo on sisämaassa?',
      'Kuka on Jonathan?',
    ],
    korostukset: ['jättiläiskilpikonna|jättiläiskilpikonnaa'],
    nappi: 'Kuvernöörin talo ja sen kilpikonnat',
    // 5.7208 W / 15.9555 S — en-Wikipedia "Plantation House, Saint Helena".
    // Lähin kaupunki St. Helena 83,3 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 5642.6, y: 3747.8 },
    },
    teksti: 'Plantation House on Saint Helenan kuvernöörin virka-asunto 3,6 kilometriä '
      + 'pääkaupungista Jamestownista etelään. Itä-Intian kauppakomppania rakensi sen '
      + 'vuosina 1791–1792 kuvernöörin maaseutu- eli kesäasunnoksi, ja komppania hallitsi '
      + 'saarta vuoteen 1834, jolloin siitä tuli kruununsiirtomaa; kuvernöörit ovat käyttäneet '
      + 'taloa siitä lähtien. Selitys sisämaan sijainnille on ilmasto: James Valley on '
      + 'kuivempi ja karumpi kuin saaren sisäosa. Taloa laajennettiin voimakkaimmin 1816, ja '
      + 'ulkopuolta muutettiin 1960; katto oli alun perin liuskekiveä, mutta se on saaren '
      + 'tapaan vaihdettu peltiin. Puutarhassa asuu ainakin viisi jättiläiskilpikonnaa, '
      + 'joista Jonathan on mahdollisesti maailman vanhin elossa oleva kilpikonna, ja alue on '
      + 'avoinna kävijöille milloin tahansa.',
    lahde: 'en-Wikipedia "Plantation House, Saint Helena", johdanto sekä osiot "History" ja '
      + '"Tortoises" (tarkistettu 6.9.2026).',
  },
  {
    id: 'shn-lentoasema',
    nimi: 'Saint Helenan lentoasema',
    // Kartalle lyhyt asu: koko nimi ei mahdu nimiöön.
    nimio: 'Lentoasema',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi ensimmäinen reittilento myöhästyi puolitoista vuotta?',
      'Miten saarelle päästiin ennen lentokenttää?',
    ],
    korostukset: ['tuulikerroksen leikkaus|tuulikerroksen leikkaus'],
    nappi: 'Kiitorata rotkon päällä',
    // 5.645833 W / 15.959167 S — en-Wikipedia "Saint Helena Airport".
    // Lähin kaupunki St. Helena 82,3 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 5645.1, y: 3747.9 },
    },
    teksti: 'Saint Helena on yli 2 000 kilometrin päässä lähimmästä suuresta mantereesta, ja '
      + 'ennen lentoaseman avaamista sinne pääsi vain meritse: matka Kapkaupungista kesti '
      + 'viisi vuorokautta ja laiva lähti kolmen viikon välein. Lentokenttää harkittiin '
      + 'ensimmäisen kerran 1943, kun Etelä-Afrikan ilmavoimat tutki Prosperous Bay Plainin '
      + 'tasankoa ja totesi hankkeen teknisesti mahdolliseksi mutta epäkäytännölliseksi. '
      + 'Rakentaminen alkoi 2012, ja kiitorataa varten oli täytettävä Dry Gutin rotko lähes '
      + 'sadan metrin korkeuteen: kesäkuussa 2013 rotkoon oli ajettu satatuhatta kuormallista '
      + 'täytemaata, mikä oli vasta noin 19 prosenttia tarvittavasta kahdeksasta miljoonasta '
      + 'kuutiometristä. Kiitorata valmistui 2015 ja asema avattiin 2016, mutta ensimmäinen '
      + 'aikataulutettu lento viivästyi noin puolitoista vuotta ja lennettiin lopulta '
      + 'pienemmällä koneella, koska tuulikerroksen leikkaus haittasi laskeutumista. '
      + 'Säännöllinen viikkovuoro Johannesburgista Walvis Bayn kautta alkoi 14. lokakuuta '
      + '2017. Hankkeen hinnaksi ilmoitettiin huhtikuussa 2016 285,5 miljoonaa puntaa.',
    lahde: 'en-Wikipedia "Saint Helena Airport", johdanto sekä osiot "Background" ja "Airport '
      + 'design and construction" (tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (2) ─────────────────────── */
  {
    id: 'dianas-peak',
    nimi: "Diana's Peak",
    tyyppi: 'vuori',
    kysymykset: [
      'Kuinka korkea saaren huippu on?',
      'Mitä kansallispuisto suojelee?',
    ],
    korostukset: ['kotoperäinen|kotoperäisiä'],
    nappi: 'Saaren korkein kohta',
    // 5.691389 W / 15.959722 S — en-Wikipedia "Diana's Peak".
    // Lähin kaupunki St. Helena 82,9 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 5643.6, y: 3747.9 },
    },
    teksti: 'Diana\'s Peak on Saint Helenan korkein kohta, 818 metriä, ja se on syntynyt '
      + 'tulivuoritoiminnassa. Vuori ympäristöineen, yhteensä 81 hehtaaria, julistettiin '
      + 'maaliskuussa 1996 kansallispuistoksi, saaren ensimmäiseksi. Puisto suojelee useita '
      + 'uhanalaisia kotoperäisiä lajeja, muun muassa puusaniaista sekä kaalipuiksi '
      + 'kutsuttuja lajeja ja valkopuuta. Polut yhdistävät kolme huippua: Mount Actaeonin '
      + '(814 m), Diana\'s Peakin ja Cuckold\'s Pointin (815 m); kahdella matalammalla '
      + 'kasvaa latvassa suuria norfolkinaraukarioita. Pohjoisrinteellä on kotoperäisten '
      + 'lajien taimitarha. Huippu on kolmen piirikunnan — Sandy Bayn, Levelwoodin ja '
      + 'Longwoodin — rajapiste.',
    lahde: 'en-Wikipedia "Diana\'s Peak", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'sandy-bay-shn',
    nimi: 'Sandy Bay',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi rannikkopatteri jouduttiin rakentamaan uudelleen?',
      'Mitä ovat Lot\'s Wife\'s Ponds?',
    ],
    korostukset: ['merikeko|merikekojen'],
    nappi: 'Saaren suurimmat rannat',
    // 5.718 W / 15.983 S — en-Wikipedia "Sandy Bay, Saint Helena".
    // Lähin kaupunki St. Helena 84,0 lautayksikköä (raja 7).
    laudat: {
      maailmankartta: { x: 5642.7, y: 3748.7 },
    },
    teksti: 'Sandy Bay on Saint Helenan kaakkoisrannikon lahti ja yksi saaren kahdeksasta '
      + 'piirikunnasta. Maasto on tulivuorisaarelle tyypillisen vaihtelevaa: jyrkkiä '
      + 'harjanteita ja vähän tasamaata, alaosa kuivaa ja yläosa rehevää, ja siellä kasvaa '
      + 'suurin osa saaren kahvista ja banaaneista. Rannat ovat saaren suurimmat, mutta ne '
      + 'ovat auki kaakkoispasaatille ja kuluvat kovassa merenkäynnissä. Ensimmäiset '
      + 'linnoitukset rakennettiin vuoden 1708 jälkeen, kun läheltä löytyi kalkkikiveä ja '
      + 'paikalle tehtiin uuni laastin polttoa varten; patteri rakennettiin liian lähelle '
      + 'merta ja myrsky vei sen mennessään vuonna 1734. Lahden länsipuolelle vievä '
      + 'postilaatikkopolku päättyy merikekojen ja vuorovesialtaiden ryhmään, jonka nimi on '
      + 'Lot\'s Wife\'s Ponds ja jossa käydään uimassa ja kalassa.',
    lahde: 'en-Wikipedia "Sandy Bay, Saint Helena", johdanto sekä osiot "Description" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
];
