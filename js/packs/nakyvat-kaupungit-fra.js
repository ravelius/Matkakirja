/*
 * NÄKYVÄT KAUPUNGIT — RANSKA (pilotti).
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 13) ====
 *
 * Sanatarkasti: *"kartalle olisi lisaksi hyva tuoda lisaa kaupunkeja
 * nakyviin, ainakin tarkeimmat ja sitten niita piirroksia
 * mahdollisesti myos."*
 *
 * Ranskan kartalla on tähän asti näkynyt kaksi kaupunkia: pelattavat
 * Pariisi ja Marseille. Tässä ovat seitsemän seuraavaksi suurinta
 * nimeä.
 *
 * === NÄMÄ EIVÄT OLE MATKAKOHTEITA ==================================
 *
 * Rivit EIVÄT ole laudan kaupunkeja (js/packs/maailmankartta.js
 * CITIES) eivätkä koske reitteihin, noppaan, bussiin tai Liiku-valikon
 * tarjontaan millään tavalla — pelin kulku on täsmälleen entisensä.
 * Ne ovat maan kohdemerkkejä (js/fokuskohteet.js KOHDE_MAAT), kuten
 * 135 muun maan ei-pelattavat kaupungit jo ovat.
 *
 * === KAUPUNKIKORTTI (PAATOKSET 16) =================================
 *
 * Edellinen erä merkitsi nämä rivit `vainNimi: true` -lipulla, koska
 * korttiin ei ollut tekstiä. Omistaja päätti 14.9.2026 (Raamattu,
 * KARTTAUUDISTUKSEN PAATOKSET 16), että kukin kaupunki saa kortin:
 * kuvaputkelta tilataan herokuva, sen jälkeen tulee esittely, ja
 * esittelyn perään yksi nosto — loput nostot jäävät kartalle omiksi
 * nostoikseen.
 *
 * PÄÄTÖS ON SANATARKASTI js/kaupunkinosto.js:n
 * `latoLisakaupunginKortti`-kommentissa ja raportissa
 * docs/raportit/viesti-fable-kaupunkikortit-20260914.md luvussa 1.
 * Sitä ei toisteta tässä tiedostossa, koska omistaja kirjoittaa ilman
 * umlautteja ja js/packs/ on sen portin alla, joka etsii suomen
 * sanoja ilman ä:tä ja ö:tä (tests/vanha-maailma.test.mjs). Portti on
 * oikeassa — kirjoitusvirhe ja sitaatti näyttävät siinä samalta —
 * joten sitaatti asuu siellä, missä se ei voi sekoittua virheeseen.
 *
 * Lippu on siis poissa ja merkki ottaa napautuksen. Kortti on kolme
 * lohkoa, samassa lehden kehyksessä kuin tiivis kaupunkietusivu
 * (js/kaupunkinosto.js latoLisakaupunginKortti):
 *
 *   1. `herokuva` — kuvaputken toimittama hero. Kuvaputki toimitti
 *      seitsemän Commons-alkuperäistä 14.9.2026 (manifesti
 *      posti/kuvatoimitus-ranska7-20260914.json), ja jokainen rivi
 *      osoittaa nyt omaan kuvaansa: `osoite`, `lyhyt` (kortin
 *      kuvateksti), `selite` (pitkä), `tekija`, `ajoitus`, `lahde`,
 *      `lahdeUrl`, `lisenssi` ja `lisenssiUrl`. KENTÄT OVAT
 *      MANIFESTISTA SANASTA SANAAN, eikä yhtäkään kuvaa esitetä
 *      vuoden 1873 tai isoisän ottamana — ajoitus lukee kortissa.
 *      Kuva sovitetaan CONTAIN-tavalla (alkuperäiset kuvasuhteet
 *      1,34–1,56:1), ei rajata. Tyhjä kenttä (`null`) on yhä
 *      kelvollinen: silloin kortti piirtää oman paikkamerkkinsä
 *      (kartan seepiaruutu ja kaupungin nimi) EIKÄ HAE ULKOISTA
 *      KUVAA.
 *   2. `esittely` — 2–3 lauseen esittely. **Fable hyväksyi kaikki
 *      seitsemän sellaisinaan 14.9.2026 klo 21.25 UTC**, ja ne ovat
 *      tässä sanasta sanaan siinä muodossa, jossa ne olivat
 *      hyväksyttävänä (docs/raportit/viesti-fable-kaupunkikortit-
 *      20260914.md luku 3). Jokaisen väitteen lähde on rivin vieressä
 *      kentässä `esittelynLahteet`; kortti ei lue sitä, vaan se on
 *      tarkistusketju kirjoittajalle ja QA:lle.
 *
 *      SÄÄNNÖT, JOITA VASTEN NÄMÄ ON KIRJOITETTU: jokainen fakta
 *      lähteellä, 1873/nyt-kontrasti, lyhyt ja konkreettinen, ei
 *      keksittyjä anekdootteja, ei eläviä yksityishenkilöitä, ei
 *      spoilereita kartan minikysymyksiin, 180–260 merkkiä. Kortti
 *      osaa yhä jättää lohkon pois, jos kenttä on tyhjä — se on
 *      vartio, ei tämän hetken tila.
 *   3. `korttiNosto` — YKSI kaupunkiin ankkuroitu maalehden nosto,
 *      viite samaan olioon jonka kartta piirtää (ei kopio). Loput
 *      jäävät kartalle omiksi nostoikseen, kuten omistaja sanoi.
 *
 * === MILLÄ KAUPUNGILLA ON NOSTO — MITATTU, EI ARVATTU ==============
 *
 * Jokaisen lisäkaupungin laudan piste mitattiin jokaista kahdeksaatoista
 * maalehtinoston ankkuria vastaan (js/packs/maalehtinostot-fra.js,
 * lauta `maailmankartta`). Vain YKSI osuu kaupunkiin:
 *
 *   Lyon        maalehti-cinematographe   0,3 yksikköä  → KORTILLE
 *   Bordeaux    maalehti-dune-du-pilat   23,1
 *   Nantes      maalehti-chandeleur      37,5
 *   Toulouse    maalehti-roquefort       53,5
 *   Nizza       maalehti-petanque        59,3
 *   Lille       maalehti-braille         81,6
 *   Strasbourg  maalehti-cinematographe 153,3
 *
 * Kuuden lähin nosto on eri paikan nosto (Dune du Pilat, Bretagne,
 * Roquefort-sur-Soulzon, La Ciotat, Pariisi), jolla on kartalla oma
 * merkkinsä. Sen siirtäminen kaupungin korttiin olisi uusi, keksitty
 * ankkuri — kielletty. Näillä kuudella kortti on siis kuva + esittely,
 * ja lohko puuttuu ilman tyhjää kehystä.
 *
 * === KOORDINAATIT ==================================================
 *
 * Kuusi seitsemästä on luettu pelin OMASTA tarkistetusta aineistosta
 * (js/packs/fokus-grc.js FOKUS_LISANIMET.FRA, jossa laudan luvut ja
 * asteet ovat rinnakkain). Nantes puuttui siitä listasta, ja sen
 * asteet on haettu en-Wikipediasta; laudan luvut on laskettu pelin
 * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`).
 */

import { MAALEHTINOSTOT_FRA } from './maalehtinostot-fra.js';

/**
 * Maalehden nosto tunnuksella — SAMA OLIO, EI KOPIO. Kortti lukee siis
 * otsikon ja tekstin samasta paikasta kuin kartan nostokortti, eikä
 * kahta versiota voi ajautua erilleen (sama rakenteellinen tae kuin
 * js/packs/maalehtinostot-fra.js:llä lehteen).
 */
const nosto = (id) => MAALEHTINOSTOT_FRA.find((n) => n.id === id) ?? null;

/*
 * HEROKUVIEN MEDIAJUURI. Kuvat ovat kuvaputken 14.9.2026 toimittamia
 * Commons-alkuperaisia (manifesti posti/kuvatoimitus-ranska7-20260914
 * .json, SHA256 045ea28e…): kuusi photochrom-vedosta ja yksi
 * postikortti, kaikki 1890-luvulta tai sen tienoilta. Jokaisen rivin
 * `ajoitus`, `tekija` ja `lahde` ovat manifestista sanasta sanaan,
 * eika yhtakaan kuvaa esiteta vuoden 1873 tai isoisan ottamana.
 */
const RANSKAN_HEROT = 'https://media.matkakirja.app/matkakirja/'
  + 'kaupunkilehdet/ranska/';

/** Ranskan kartalle tuodut ei-pelattavat kaupungit. */
export const NAKYVAT_KAUPUNGIT_FRA = [
  {
    id: 'nakyva-kaupunki-lyon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-lyon-6dab640e.jpg',
      lyhyt: 'Panoraama Lyonista Fourvièren kukkulalta katsottuna.',
      selite: 'Punakattoinen kaupunki levittyy Saône- ja Rhône-jokien välille, ja taivaalla on ohuita pilviä.',
      lahde: 'Valokuva: Otourly, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Otourly',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:01._Panorama_de_Lyon_pris_depuis_le_toit_de_la_Basilique_de_Fourvière.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-lyon-86b79922.jpg',
        lyhyt: 'Fourvièren basilika valaistuna yöllä Saône-joen yllä Lyonissa.',
        selite: 'Kukkulan laella kohoava basilika ja radiotorni loistavat pimeydessä, ja valot heijastuvat joen pintaan.',
        lahde: 'Kuva: Alexmar983, Wikimedia Commons (public domain).',
        tekija: 'Alexmar983',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fourvière_StJean_Panorama_bynight_Lyon.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Lyon',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-lyon-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Lyonin kaupungintalo kohoaa Place des Terreaux’n laidalla.',
      selite: 'Hevosvaunut ja jalankulkijat liikkuvat Lyonin Place des '
        + 'Terreaux’lla. Photochrom-vedos on ajoitettu vuosien 1890–1905 '
        + 'välille.',
      tekija: 'Unknown author',
      ajoitus: 'between 1890 and 1905',
      lahde: 'Place des Terreaux, Lyons, France, unknown author, 1890-1905, '
        + 'Library of Congress Prints and Photographs Division '
        + '(ppmsc.05083), via Wikimedia Commons. Public domain.',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lyon_placeterreaux_congres.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    },
    esittely: 'Vuonna 1873 Fourvièren kukkulalla seisoi '
      + 'rakennustelineitä: basilikan muuraus oli alkanut '
      + 'edellisvuonna ja jatkui 1884 asti. Alarinteillä kalisivat '
      + 'silkkikutomoiden kangaspuut. Nykyään vanha Lyon on Unescon '
      + 'maailmanperintöluettelossa.',
    esittelynLahteet: [
      'Basilikan muuraus 1872-1884: en-Wikipedia "Basilica of '
        + 'Notre-Dame de Fourvière" ("built with private funds '
        + 'between 1872 and 1896", rakennustyö 1872-1884), luettu '
        + '14.9.2026.',
      'Silkkikutomot ja kutojat (canut) 1800-luvun Lyonissa: '
        + 'en-Wikipedia "Lyon", silkkityöläisten kapinat 1831 ja '
        + '1834.',
      'Vanha Lyon Unescon listalla: en-Wikipedia "Lyon" ("Old '
        + 'Lyon, the Fourvière hill, the Presqu\'île ... inscribed on '
        + 'the UNESCO World Heritage List"). Vuosilukua ei väitetä, '
        + 'koska lähde ei sitä anna.',
      'Elokuvaa ei mainita tarkoituksella: kortin nosto '
        + '`maalehti-cinematographe` kertoo sen.',
    ],
    korttiNosto: nosto('maalehti-cinematographe'),
    // 4,8281 E / 45,772 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5994.3, y: 1569.8 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-bordeaux',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-bordeaux-36339e38.jpg',
      lyhyt: 'Place de la Bourse ja Miroir d\'eau -vesipeili Bordeaux\'ssa.',
      selite: 'Kultaiset 1700-luvun julkisivut kaartuvat aukion ympärillä, ja niiden heijastus näkyy matalassa vesipeilissä; keskellä ratikka.',
      lahde: 'Valokuva: Patrick Despoix, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Patrick Despoix',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:139_-_Place_de_la_Bourse_et_le_miroir_d\'eau_-_Bordeaux.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-bordeaux-0f666e90.jpg',
        lyhyt: 'Place de la Bourse Garonne-joen rannalta nähtynä.',
        selite: 'Bordeaux\'n klassistiset rantajulkisivut kohoavat joen ruskeaa vettä vasten kirkkaana päivänä.',
        lahde: 'Valokuva: Coyau, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Coyau',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bordeaux_-_Place_de_la_Bourse_2009-06-29.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Bordeaux',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-bordeaux-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Bordeaux’n katedraali ja Pey-Berlandin torni hallitsevat aukiota.',
      selite: 'Kivetty aukio avautuu Saint-Andrén katedraalin ja erillisen '
        + 'Pey-Berlandin tornin edessä. Photochrom-vedos on ajoitettu '
        + 'vuoteen 1890.',
      tekija: 'Unknown photographer',
      ajoitus: '1890',
      lahde: 'Bordeaux. Place Pey-Berland et Cathedrale, unknown photographer, '
        + 'published by Photoglob Co., 1890, Library of Congress (LCCN '
        + '2017659772 / ppmsca.52461), via Wikimedia Commons. Public domain.',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bordeaux._Place_Pey_-_Berland_et_Cath%C3%A9drale_LCCN2017659772.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/File:Bordeaux._Place_Pey_-_Berland_et_Cath%C3%A9drale_LCCN2017659772.jpg#Licensing',
    },
    esittely: 'Garonnen yli pääsi 1873 vain yhtä tietä: kivisiltaa, jonka '
      + 'seitsemäntoista kaarta valmistuivat 1822. Se jäi kaupungin '
      + 'ainoaksi ajosillaksi vuoteen 1965. Nykyään sen kupeessa '
      + 'kahden sentin vesikalvo peilaa Bourse-aukion julkisivut.',
    esittelynLahteet: [
      'Kivisilta: fr-Wikipedia "Pont de pierre (Bordeaux)" - '
        + 'rakennettu 1810-1822, avattu liikenteelle 1.5.1822, 17 '
        + 'kaarta 16 pilarilla; luettu 14.9.2026.',
      'Ainoa ajosilta vuoteen 1965: sama sivu ("jusqu\'à la '
        + 'construction du pont Saint-Jean en 1965").',
      'Kahden sentin vesikalvo: en-Wikipedia "Miroir d\'eau" - 3 '
        + '450 m², "granite slabs covered by 2 cm of water", '
        + 'rakennettu 2006, Place de la Bourse.',
    ],
    korttiNosto: null,
    // -0,597 E / 44,852 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5813.4, y: 1607.9 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-lille',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-lille-e9d9ada7.jpg',
      lyhyt: 'Lillen Grand Place: Vieille Bourse ja kauppakamarin kellotorni.',
      selite: 'Aukion keskellä kohoaa patsaspylväs, oikealla on Vieille Bourse ja taustalla Kauppakamarin kellotorni Lillessä.',
      lahde: 'Valokuva: Velvet, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Velvet',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lille_vue_gd_place.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-lille-bbcb4f3f.jpg',
        lyhyt: 'Lillen Vieille Bourse -rakennuksen flaamilaistyylinen julkisivu.',
        selite: 'Runsaasti koristeltu tiili- ja kivijulkisivu, jonka keskellä on pieni torni ja alla kahvilaterassi.',
        lahde: 'Valokuva: Pymouss, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pymouss',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lille_-_Vieille_bourse_01.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Lille',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-lille-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Lillen Grande Placella kohtaavat raitiovaunut ja hevoskärryt.',
      selite: 'Jumalattaren pylväs kohoaa Grande Placen keskellä liikenteen ja '
        + 'jalankulkijoiden yllä. Léon & Lévyn postikorttikuva on ajalta '
        + 'ennen ensimmäistä maailmansotaa.',
      tekija: 'Unknown photographer',
      ajoitus: 'before World War I; surviving card postmarked 7 July 1925',
      lahde: 'Lille, La Grande Place, unknown photographer, published by Leon & '
        + 'Levy (LL), before World War I; postcard via Wikimedia Commons. '
        + 'Public domain in France and the United States.',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lille_La_Grande_Place_LL_postcard.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/File:Lille_La_Grande_Place_LL_postcard.jpg#Licensing',
    },
    esittely: 'Lille oli 1873 puuvillan kaupunki: kivihiili ja '
      + 'höyrykoneet pitivät kutomot käynnissä, ja Vaubanin '
      + 'linnoitus oli vartioinut niitä jo vuodesta 1670. Nykyään '
      + 'samasta kaupungista lähtee Eurostar, joka alkoi kulkea '
      + 'kanaalitunnelin auettua 1994.',
    esittelynLahteet: [
      'Puuvilla, kivihiili ja höyrykone: en-Wikipedia "Lille" '
        + '("known for its cotton"; alue vaurastui "coal and the '
        + 'steam engine"), luettu 14.9.2026.',
      'Vaubanin sitadelli 1667-1670: sama sivu.',
      'Eurostar ja kanaalitunneli 1994: sama sivu.',
    ],
    korttiNosto: null,
    // 3,0781 E / 50,6519 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5935.9, y: 1361.7 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-strasbourg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-strasbourg-b4a65274.jpg',
      lyhyt: 'Petite France -kaupunginosan kanavanäkymä Strasbourgissa.',
      selite: 'Kanavan varrella on ristikkotalojen ja moderneja rakennuksia, taustalla kohoaa punatiilinen kirkontorni.',
      lahde: 'Valokuva: Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Dietmar Rabich',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Straßburg_(Frankreich),_Petite_France_--_2011_--_1759.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-strasbourg-733af76c.jpg',
        lyhyt: 'Vanha mustavalkoinen valokuva Petite Francen kanavasta Strasbourgissa vuodelta 1898.',
        selite: 'Kanava kulkee vanhojen ristikkotalojen välissä, ja rakennukset heijastuvat tyyneen veteen.',
        lahde: 'Valokuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'tekijä tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Strasbourg-Quai_de_la_Petite_France_(1898).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Strasbourg',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-strasbourg-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Strasbourgin kattojen yllä kohoaa katedraalin torni.',
      selite: 'Kaupungin katot levittäytyvät katedraalin ja Saint-Thomasin '
        + 'kirkon ympärille. Photochrom-vedos on ajoitettu vuosien '
        + '1890–1905 välille.',
      tekija: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma',
      ajoitus: '1890–1905',
      lahde: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma / '
        + 'Library of Congress / Wikimedia Commons, Public domain',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stra%C3%9Fburg_(1890-1900).jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    },
    esittely: 'Vuonna 1873 Strasbourg ei ollut Ranskaa: kaupunki oli '
      + 'liitetty Saksaan 1871, ja tuomiokirkon katto oli palanut '
      + 'piirityksessä. Sen 142-metrinen torni oli yhä maailman '
      + 'korkein rakennus — vielä vuoden. Nykyään täällä istuu '
      + 'Euroopan parlamentti.',
    esittelynLahteet: [
      'Liitos Saksan keisarikuntaan 1871: en-Wikipedia '
        + '"Strasbourg" ("as part of the Imperial Territory of '
        + 'Alsace-Lorraine, became German again, until 1918"), luettu '
        + '14.9.2026.',
      'Katto paloi piirityksessä 1870: en-Wikipedia "Strasbourg '
        + 'Cathedral" ("The roof was set afire and the cross at the '
        + 'top of the spire was bent by a German artillery shell").',
      '142 m ja maailman korkein rakennus 1647-1874: sama sivu.',
      'Euroopan parlamentti Strasbourgissa: en-Wikipedia '
        + '"Strasbourg".',
    ],
    korttiNosto: null,
    // 7,75 E / 48,58 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 6091.7, y: 1451.5 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-nizza',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-nizza-0b975c00.jpg',
      lyhyt: 'Nizzan Baie des Anges ja rantabulevardi linnakukkulalta katsottuna.',
      selite: 'Turkoosi Välimeri kaartuu pitkän kivikkorannan ja Promenade des Anglais\'n reunustaman kaupungin edessä.',
      lahde: 'Valokuva: Cayambe, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Cayambe',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nice_Baie_des_anges_02.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-nizza-6f05f860.jpg',
        lyhyt: 'Nizzan ranta ja Promenade des Anglais ylhäältä.',
        selite: 'Kaupungin katot, ranta ja rantatie näkyvät Baie des Anges\'n reunalla Välimeren rannalla.',
        lahde: 'Kuva: Lspigon, Wikimedia Commons (public domain).',
        tekija: 'Lspigon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nice,_Quai_des_États-Unis_and_Promenade_des_Anglais_FRANCE.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    // Suomenkielinen nimi, jota pelin oma teksti käyttää
    // (js/packs/saatiedot.js, js/packs/maastokohteet-nzl.js).
    nimi: 'Nizza',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-nizza-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Nizzan Cours Saleyan torilla käy kuhina.',
      selite: 'Torikojujen varjot täyttävät Cours Saleyan rakennusten välissä. '
        + 'Photochrom-vedos on ajoitettu vuosien 1890–1905 välille.',
      tekija: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma',
      ajoitus: '1890–1905',
      lahde: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma / '
        + 'Library of Congress / Wikimedia Commons, Public domain',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cours_Saleya_-_Nice.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    },
    esittely: 'Nizza oli ollut Ranskaa vasta kolmetoista vuotta, kun '
      + 'isoisä kulki ohi 1873. Rantabulevardin olivat kustantaneet '
      + 'englantilaiset talvivieraat 1820-luvulta alkaen, ja '
      + 'paikalliset sanoivat sitä Camin deis Anglésiksi. Nyt sitä '
      + 'riittää seitsemän kilometriä.',
    esittelynLahteet: [
      'Liitos Ranskaan 1860: en-Wikipedia "Promenade des Anglais" '
        + '("After Nice\'s annexation by France in 1860"), luettu '
        + '14.9.2026.',
      'Englantilaiset talvivieraat kustansivat bulevardin '
        + '1820-luvulta: sama sivu ("funded by the Reverend Lewis Way '
        + 'and members of Holy Trinity, the Anglican church in '
        + 'Nice").',
      'Paikallinen nimi Camin deis Anglés ja pituus noin 7 km: '
        + 'sama sivu.',
    ],
    korttiNosto: null,
    // 7,2631 E / 43,717 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 6075.4, y: 1654.3 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-toulouse',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-toulouse-72d46522.jpg',
      lyhyt: 'Toulousen Capitole valaistuna hämärässä.',
      selite: 'Vaaleaa kiveä ja punatiiltä yhdistävä 1700-luvun julkisivu hohtaa Place du Capitolen yllä sinisenä hetkenä.',
      lahde: 'Valokuva: Benh LIEU SONG, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Benh LIEU SONG',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Toulouse_Capitole_Night_Wikimedia_Commons.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-toulouse-fd20c881.jpg',
        lyhyt: 'Capitolen kaupungintalon pitkä julkisivu Toulousessa.',
        selite: 'Punaraidallinen tiili- ja kivijulkisivu ulottuu koko aukion leveydeltä pilvisen taivaan alla.',
        lahde: 'Valokuva: Velvet, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Velvet',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Toulouse_capitole_R.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Toulouse',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-toulouse-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Hevosvaunut odottavat Toulousen Place du Capitolella.',
      selite: 'Aukiolla kulkevat hevosvaunut ja jalankulkijat Capitolen '
        + 'edustalla. Photochrom-vedos on ajoitettu vuosien 1890–1905 '
        + 'välille.',
      tekija: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma',
      ajoitus: '1890–1905',
      lahde: 'Tuntematon kuvaaja; Photoglob/Detroit-photochrom-kokoelma / '
        + 'Library of Congress / Wikimedia Commons, Public domain',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Capitol_Place,_Toulouse,_France,_ca._1895.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    },
    esittely: 'Toulousen tiilet ovat vaaleanpunaisia, ja siitä tuli nimi '
      + 'Ville rose. Vuonna 1873 kaupungin läpi kulki jo Canal du '
      + 'Midi, 1681 valmistunut vesitie Välimerelle. Nykyään täällä '
      + 'kootaan Airbusin koneet.',
    esittelynLahteet: [
      'Vaaleanpunaiset tiilet ja nimi la Ville rose: en-Wikipedia '
        + '"Toulouse" ("pinkish terracotta bricks has earned Toulouse '
        + 'the nickname La Ville rose"), luettu 14.9.2026.',
      'Canal du Midi aloitettiin 1666 ja valmistui 1681, yhdistää '
        + 'Toulousen Välimereen: sama sivu.',
      'Airbus Toulousessa: sama sivu.',
    ],
    korttiNosto: null,
    // 1,448 E / 43,6219 N — js/packs/fokus-grc.js FOKUS_LISANIMET.FRA
    laudat: { maailmankartta: { x: 5881.6, y: 1658.2 } },
    lahde: 'js/packs/fokus-grc.js FOKUS_LISANIMET.FRA (pelin omaa '
      + 'tarkistettua aineistoa, Wikipedia / Natural Earth 10m).',
  },
  {
    id: 'nakyva-kaupunki-nantes',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-nantes-c1efd60c.jpg',
      lyhyt: 'Nantesin Bretagnen herttuoiden linnan sisäpiha.',
      selite: 'Valkoiset renessanssirakennukset ja liuskekatot reunustavat hiekkaista linnanpihaa.',
      lahde: 'Valokuva: Selbymay, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Selbymay',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:NantesChateau_08.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fra-nosto-nakyva-kaupunki-nantes-34f41209.jpg',
        lyhyt: 'Nantesin linnan vallihauta ja koristeellinen julkisivu.',
        selite: 'Kalkkikiviset ikkunakoristeet ja linnan muuri kohoavat vallihaudan yllä, taustalla kaupunkikatu.',
        lahde: 'Valokuva: Eusebius, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Eusebius',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nantes_-_rempart_sud_du_château.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Nantes',
    tyyppi: 'kaupunki',
    kaupunkikortti: true,
    herokuva: {
      osoite: `${RANSKAN_HEROT}hero-nantes-historiallinen-r20260914-v1.jpg`,
      lyhyt: 'Veneet lepäävät Nantesin vanhassa Loire-satamassa.',
      selite: 'Quai de la Fossen rantatalot ja veneet reunustavat Loirea '
        + 'Nantesissa. Photochrom-vedos on ajoitettu 1890-luvulle.',
      tekija: 'Commons states that the underlying Swiss photochrom\'s author is '
        + 'unknown; Detroit Publishing Co. is credited under license from '
        + 'Photoglob Zurich; digital restoration by trialsanderrors',
      ajoitus: '1890–1900',
      lahde: 'La greve, Nantes, France, ca. 1897; underlying photochrom author '
        + 'unknown as documented by Wikimedia Commons; Detroit Publishing '
        + 'Co. under license from Photoglob Zurich; Library of Congress '
        + 'ppmsc.05143; digital restoration by trialsanderrors. Public '
        + 'domain in Switzerland and the United States.',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:La_gr%C3%A8ve,_Nantes,_France,_ca._1897.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/File:La_gr%C3%A8ve,_Nantes,_France,_ca._1897.jpg#Licensing',
    },
    esittely: 'Nantesissa syntyi 1828 Jules Verne, jonka Maailman ympäri '
      + '80 päivässä ilmestyi lehdessä 1872 — vuotta ennen isoisän '
      + 'matkaa. Loiren rannassa kolisivat telakat. Nykyään samalla '
      + 'saarella kävelee kaksitoistametrinen mekaaninen norsu.',
    esittelynLahteet: [
      'Jules Verne syntyi Nantesissa 8.2.1828: en-Wikipedia '
        + '"Jules Verne", luettu 14.9.2026.',
      '"Maailman ympäri 80 päivässä" ilmestyi Le Temps -lehdessä '
        + '1872: sama sivu ("first appeared in Le Temps in 1872").',
      'Telakat Loiren rannassa: en-Wikipedia "Nantes" (1900-luvun '
        + 'alussa "three shipyards which were among the largest in '
        + 'France").',
      'Kaksitoistametrinen mekaaninen norsu: Les Machines de '
        + 'l\'île (avattu 2007), Grand Éléphant 12 m korkea, 49 '
        + 'matkustajaa - lesmachines-nantes.fr ja levoyageanantes.fr, '
        + 'luettu 14.9.2026.',
    ],
    korttiNosto: null,
    // -1,5528 E / 47,2181 N — en-Wikipedia "Nantes", prop=coordinates
    // (haettu 14.9.2026); laudan luvut tools/johda-maastokohteet.mjs
    laudat: { maailmankartta: { x: 5781.6, y: 1509.3 } },
    lahde: 'en-Wikipedia "Nantes", prop=coordinates (tarkistettu '
      + '14.9.2026).',
  },
];
