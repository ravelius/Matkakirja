/*
 * RANSKAN MAALEHDEN SIVUT KARTTANOSTOIKSI — pilotti.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 13) ====
 *
 * Sanatarkasti: *"maalehden sivut voi siirtaa nostoiksi vaikka kaikki.
 * pida kuitenkin kopio nykyisesta maalehdesta olemassa. testataan
 * ensin miten toimii. … mutta testataan tassa ranskan pilotissa
 * ensin."* (Väliin jätetty virke sanoo, että mitä vähemmän asioita on
 * sivujen takana, sitä todennäköisemmin parempi.)
 *
 * Ja KARTTAUUDISTUS: *"palastella kaikki materiaali mahdollisimman
 * pieniksi klikattaviksi paloiksi … keskimaarin joka kolmanteen pieni
 * kysymys loppuun, josta voi voittaa rahaa."*
 *
 * === MAALEHTI EI MUUTU ============================================
 *
 * Tämä tiedosto EI kopioi yhtään merkkiä lehden tekstistä. Se on
 * pelkkä JAKOSUUNNITELMA: kunkin rivin `sivu` ja `nosto` osoittavat
 * js/packs/maa-kategoriat.js:n FRA-taulun omaan nostoon, ja kortin
 * otsikko, leipäteksti, kuva ja kuvatekstit LUETAAN SIELTÄ ajon
 * aikana. Lehden data on siis yhä ainoa lähde, eikä kahta kopiota voi
 * ajautua erilleen — sama rakenteellinen tae, jonka erä 10 sai
 * generaattorilla (docs/raportit/viesti-fable-karttauudistus-era10-
 * 20260913.md luku 1), mutta ilman generoitua kopiota.
 *
 * Lehden sivut, Lisää-valikko ja sivujen omat tehtävät (`tehtava`)
 * jäävät ennalleen: js/maalehti.js:ään ja maa-kategoriat.js:n
 * FRA-tauluun ei ole koskettu.
 *
 * === MITÄ JÄI SIIRTÄMÄTTÄ JA MIKSI =================================
 *
 * Kuusi lehden kahdestakymmenestäneljästä nostosta jätettiin
 * siirtämättä. Viisi on KAKSOISKAPPALE: sama asia on jo kartalla
 * omana nostonaan, ja jokainen väite on tarkistettu rinnakkain
 * (docs/raportit/viesti-fable-ranska-sisalto-20260914.md luku 3).
 *
 *   historia[0] "Neljä poikaa ja koira löysivät luolan"
 *       → kohde `lascaux` (js/packs/maastokohteet-fra.js) kertoo
 *         löytöpäivän, koiran, maalausten määrän, iän ja sulkemisen
 *         1963 laajempana.
 *   historia[1] "Seitsemänkymmentä metriä sarjakuvaa pellavalle"
 *       → kohde `bayeux-seinavaate`: sama mitta, sama kirjontatapa,
 *         sama vuosi 1066, lisäksi kohtausten ja hahmojen määrät.
 *   historia[2] "Linnoituksessa oli vain seitsemän vankia"
 *       → kohde `bastilji` (js/packs/fokuskohteet-fra.js): sama
 *         seitsemän vankia, sama päivä, sama purku.
 *   arki[0] "Laivat roikkuvat katossa"
 *       → täkynosto `exvotot` (js/packs/fokusvirta-marseille.js) on
 *         KIRJOITETTU tästä lehden nostosta; sen oma lähderivi sanoo
 *         sen ääneen.
 *   tavat[0] "Patongista kilpaillaan joka vuosi"
 *       → täkynosto `nosto-pariisin-patonki` (fokusvirta-pariisi.js).
 *
 * Kuudes, ruoka[1] "Kakussa on jotain kovaa" (galette des rois), jäi
 * siirtämättä toisesta syystä: sen tekstissä EI OLE PAIKKAA. Ankkurin
 * keksiminen olisi ollut uusi faktaväite, ja se on kielletty. Nosto on
 * yhä lehdessä.
 *
 * === ANKKURIT ======================================================
 *
 * Jokainen `paikka` on aiheen todellinen paikka, ja jokaisen lähde on
 * kirjattu rivin viereen. Laudan koordinaatit on laskettu asteista
 * pelin omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`, sama
 * Millerin lieriö kuin maastokohteilla), eikä yhtäkään lukua ole
 * arvattu tai luettu kartalta silmällä.
 *
 * === LÄHIZOOMIPORTTI `lahi` ========================================
 *
 * Omistaja (KARTTAUUDISTUS): *"Nostot voisivat tulla paremmin nakyviin
 * vasta kun pelaaja zoomaa tarpeeksi lahelle."* Pääkartan 21 merkin
 * raja (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO) pysyy, joten
 * tämän erän uudet nostot on merkitty `lahi: true` -portin taakse:
 * saapumisnäkymässä Ranskassa näkyvät yhä kaupungit, aarre ja
 * tärkeimmät vanhat merkit, ja nämä tulevat esiin zoomatessa.
 *
 * Kaupungin kohdalle osuvat nostot (Pariisi, Marseille) ovat samalla
 * portilla, ja portti on myös se, joka päästää ne kaupunkinostojen
 * katon ohi: katto suojaa saapumisnäkymää, jossa nämä eivät ole
 * (js/fokuskohteet.js karsiKaupunkiruuhka).
 *
 * === MINIKYSYMYKSET ================================================
 *
 * Kuusi kahdeksastatoista eli keskimäärin joka kolmas, kiintiö
 * `floor(18/3) = 6` (sama mitta kuin erässä 5, savuke-nostovisa).
 * Palkkio on kerroksen oma 25 puntaa (js/fokusnosto.js
 * NOSTON_VISA_PALKKIO). SPOILERISÄÄNTÖ: vastaus luetaan noston OMASTA
 * tekstistä, eikä yksikään kysymys toista lehden sivun omaa tehtävää —
 * muuten sivun tehtävä paljastaisi kartan kysymyksen tai päinvastoin.
 */

import { MAA_KATEGORIAT } from './maa-kategoriat.js';

/*
 * JAKOSUUNNITELMA. `sivu` + `nosto` osoittaa lehden nostoon,
 * loput ovat kartan omaa aineistoa: tunnus, nimiö, symboli, ankkuri ja
 * mahdollinen minikysymys.
 */
const JAKO = [
  {
    sivu: 'historia',
    nosto: 3,
    id: 'maalehti-peilisali',
    nimio: 'Versaillesin peilisali',
    symboli: 'kulttuuri',
    lahi: true,
    // 2,1203 E / 48,8047 N — en-Wikipedia "Palace of Versailles",
    // prop=coordinates (haettu 14.9.2026)
    paikka: {
      nimi: 'Versailles',
      laudat: {
        maailmankartta: { x: 5904, y: 1441.8 },
        europe: { x: 251.9, y: 610 },
      },
    },
    visa: {
      kysymys: 'Kuinka pitkä Versaillesin peilisali on?',
      vaihtoehdot: ['73 metriä', '357 metriä', '17 metriä'],
      oikea: 0,
      fakta: 'Ikkunoita ja peilejä on yhtä monta, ja peilejä on 357.',
    },
  },
  {
    sivu: 'ruoka',
    nosto: 0,
    id: 'maalehti-roquefort',
    nimio: 'Roquefort',
    symboli: 'ruoka',
    lahi: true,
    // 2,991993 E / 43,974912 N — en-Wikipedia "Roquefort-sur-Soulzon",
    // prop=coordinates (haettu 14.9.2026)
    paikka: {
      nimi: 'Roquefort-sur-Soulzon',
      laudat: {
        maailmankartta: { x: 5933.1, y: 1643.8 },
        europe: { x: 268.6, y: 737.1 },
      },
    },
    visa: {
      kysymys: 'Minkä vuoren luonnonluolissa roquefort on kypsytettävä?',
      vaihtoehdot: ['Combalou', 'Puy de Dôme', 'Mont Blanc'],
      oikea: 0,
      fakta: 'Halkeamia, jotka puhaltavat luoliin kosteaa ilmaa, '
        + 'kutsutaan fleurineiksi.',
    },
  },
  {
    sivu: 'ruoka',
    nosto: 2,
    id: 'maalehti-michelin-opas',
    nimio: 'Michelinin opas',
    symboli: 'kauppa',
    lahi: true,
    /*
     * 3,0824 E / 45,7831 N — en-Wikipedia "Clermont-Ferrand",
     * prop=coordinates (haettu 14.9.2026). Kaupunki on Michelinin
     * kotipaikka ja pääkonttori (en-Wikipedia "Michelin", infobox
     * "Headquarters"); lehden teksti nimeää veljekset muttei
     * kaupunkia, joten ankkuri on tässä lähteessä eikä tekstissä.
     */
    paikka: {
      nimi: 'Clermont-Ferrand',
      laudat: {
        maailmankartta: { x: 5936.1, y: 1569.4 },
        europe: { x: 270.4, y: 689.5 },
      },
    },
  },
  {
    sivu: 'ruoka',
    nosto: 3,
    id: 'maalehti-chandeleur',
    nimio: 'Chandeleur',
    symboli: 'ruoka',
    lahi: true,
    /*
     * -1,67 E / 48,1 N — Rennes, js/packs/fokus-grc.js FOKUS_LISANIMET
     * FRA (pelin omaa tarkistettua aineistoa). Lehden teksti nimeää
     * paikaksi Bretagnen, ja Rennes on maakunnan pääkaupunki ja
     * pelidatan ainoa bretagnelainen piste.
     */
    paikka: {
      nimi: 'Bretagne',
      laudat: {
        maailmankartta: { x: 5777.7, y: 1472 },
        europe: { x: 179.1, y: 628.6 },
      },
    },
  },
  {
    sivu: 'keksinnot',
    nosto: 0,
    id: 'maalehti-montgolfier',
    nimio: 'Montgolfierin pallo',
    symboli: 'tekniikka',
    lahi: true,
    // 4,6714 E / 45,2408 N — en-Wikipedia "Annonay", prop=coordinates
    // (haettu 14.9.2026). Kaupunki on tekstissä: veljekset tekivät
    // siellä paperia ja rakensivat siellä pallonsa.
    paikka: {
      nimi: 'Annonay',
      laudat: {
        maailmankartta: { x: 5989, y: 1591.8 },
        europe: { x: 300.9, y: 703.8 },
      },
    },
  },
  {
    sivu: 'keksinnot',
    nosto: 1,
    id: 'maalehti-braille',
    nimio: 'Braillen pisteet',
    symboli: 'sana',
    lahi: true,
    /*
     * 2,351 E / 48,857 N — Pariisi, js/packs/maakartat.js FRA
     * (pelin omaa tarkistettua aineistoa). Lehden teksti nimeää
     * paikaksi Pariisin sokeainkoulun.
     */
    paikka: {
      nimi: 'Pariisi',
      laudat: {
        maailmankartta: { x: 5911.7, y: 1439.6 },
        europe: { x: 256.3, y: 608.7 },
      },
    },
  },
  {
    sivu: 'keksinnot',
    nosto: 2,
    id: 'maalehti-pasteur-meister',
    nimio: 'Joseph Meister',
    symboli: 'historia',
    lahi: true,
    /*
     * 2,31166667 E / 48,84 N — en-Wikipedia "Pasteur Institute",
     * prop=coordinates (haettu 14.9.2026). Teksti ei nimeä paikkaa;
     * ankkuri on instituutti, jossa Meister aikuisena työskenteli ja
     * jonka teksti mainitsee.
     */
    paikka: {
      nimi: 'Pasteur-instituutti',
      laudat: {
        maailmankartta: { x: 5910.4, y: 1440.3 },
        europe: { x: 255.6, y: 609.1 },
      },
    },
  },
  {
    sivu: 'keksinnot',
    nosto: 3,
    id: 'maalehti-cinematographe',
    nimio: 'Cinématographe',
    symboli: 'tekniikka',
    lahi: true,
    // 4,835 E / 45,7675 N — en-Wikipedia "Lyon", prop=coordinates
    // (haettu 14.9.2026). Kaupunki on tekstissä: veljekset tekivät
    // siellä valokuvaustarvikkeita.
    paikka: {
      nimi: 'Lyon',
      laudat: {
        maailmankartta: { x: 5994.5, y: 1570 },
        europe: { x: 304, y: 689.9 },
      },
    },
    visa: {
      kysymys: 'Kuinka monta elokuvaa ensimmäisessä maksullisessa '
        + 'näytöksessä esitettiin?',
      vaihtoehdot: ['Kymmenen', 'Yksi', 'Sata'],
      oikea: 0,
      fakta: 'Jokainen niistä kesti alle minuutin, ja yleisöä oli noin '
        + 'neljäkymmentä.',
    },
  },
  {
    sivu: 'luonto',
    nosto: 0,
    id: 'maalehti-dune-du-pilat',
    nimio: 'Dune du Pilat',
    symboli: 'luonto',
    lahi: true,
    // -1,21166667 E / 44,59 N — en-Wikipedia "Dune of Pilat",
    // prop=coordinates (haettu 14.9.2026). Dyyni on tekstissä nimeltä.
    paikka: {
      nimi: 'Dune du Pilat',
      laudat: {
        maailmankartta: { x: 5792.9, y: 1618.6 },
        europe: { x: 187.9, y: 720.9 },
      },
    },
    visa: {
      kysymys: 'Millä nimellä dyyniä kutsuttiin vielä 1930-luvulla?',
      vaihtoehdot: ['Les Sabloneys', 'Le Grand Pilat', 'Les Landes'],
      oikea: 0,
      fakta: 'Nimi tarkoittaa uusia hiekkoja.',
    },
  },
  {
    sivu: 'luonto',
    nosto: 1,
    id: 'maalehti-camarguen-hevoset',
    nimio: 'Camarguen hevoset',
    symboli: 'elain',
    lahi: true,
    // 4,5 E / 43,53333333 N — en-Wikipedia "Camargue",
    // prop=coordinates (haettu 14.9.2026). Alue on tekstissä nimeltä.
    paikka: {
      nimi: 'Camargue',
      laudat: {
        maailmankartta: { x: 5983.3, y: 1661.8 },
        europe: { x: 297.6, y: 748.7 },
      },
    },
  },
  {
    sivu: 'luonto',
    nosto: 2,
    id: 'maalehti-chaine-des-puys',
    nimio: 'Chaîne des Puys',
    symboli: 'luonto',
    lahi: true,
    // 2,9625 E / 45,77194444 N — en-Wikipedia "Puy de Dôme",
    // prop=coordinates (haettu 14.9.2026). Huippu on tekstissä
    // nimeltä ja on ketjun korkein.
    paikka: {
      nimi: 'Puy de Dôme',
      laudat: {
        maailmankartta: { x: 5932.1, y: 1569.8 },
        europe: { x: 268.1, y: 689.8 },
      },
    },
  },
  {
    sivu: 'luonto',
    nosto: 3,
    id: 'maalehti-couesnonin-vuorovesi',
    nimio: 'Vuorovesi 2015',
    symboli: 'luonto',
    lahi: true,
    // -1,511 E / 48,636 N — en-Wikipedia "Mont-Saint-Michel",
    // prop=coordinates (haettu 14.9.2026). Sama piste kuin kohteella
    // `mont-saint-michel`: nostot kertovat samasta lahdesta eri
    // asiat, ja ladonta erottaa merkit toisistaan (js/fokusniput.js).
    paikka: {
      nimi: 'Mont-Saint-Michelin lahti',
      laudat: {
        maailmankartta: { x: 5783, y: 1449.1 },
        europe: { x: 182.2, y: 614.5 },
      },
    },
  },
  {
    sivu: 'urheilu',
    nosto: 0,
    id: 'maalehti-tour-de-france-1903',
    nimio: 'Tour 1903',
    symboli: 'urheilu',
    lahi: true,
    /*
     * 2,351 E / 48,857 N — Pariisi, js/packs/maakartat.js FRA. Kisan
     * keksi L'Auto-lehti, joka ilmestyi Pariisissa, ja ensimmäinen
     * Tour sekä lähti että päättyi Pariisiin (en-Wikipedia "1903 Tour
     * de France", osio "Route"). Reitti kiersi koko maan, joten yhtä
     * osuuden paikkaa ei ole.
     */
    paikka: {
      nimi: 'Pariisi',
      laudat: {
        maailmankartta: { x: 5911.7, y: 1439.6 },
        europe: { x: 256.3, y: 608.7 },
      },
    },
  },
  {
    sivu: 'urheilu',
    nosto: 1,
    id: 'maalehti-petanque',
    nimio: 'Pétanque',
    symboli: 'urheilu',
    lahi: true,
    // 5,6086 E / 43,1769 N — en-Wikipedia "La Ciotat",
    // prop=coordinates (haettu 14.9.2026). Kaupunki on tekstissä:
    // siellä asui Jules Lenoir ja siellä pelattiin ensimmäinen turnaus.
    paikka: {
      nimi: 'La Ciotat',
      laudat: {
        maailmankartta: { x: 6020.3, y: 1676.2 },
        europe: { x: 318.9, y: 758 },
      },
    },
    visa: {
      kysymys: 'Mitä provensaalin pè tancat tarkoittaa?',
      vaihtoehdot: ['Jalat kiinni maassa', 'Pieni porsas', 'Puolitettu rata'],
      oikea: 0,
      fakta: 'Maalina oleva pieni puupallo on cochonnet eli porsas.',
    },
  },
  {
    sivu: 'urheilu',
    nosto: 2,
    id: 'maalehti-roland-garros',
    nimio: 'Roland Garros',
    symboli: 'urheilu',
    lahi: true,
    // 2,24638889 E / 48,84722222 N — en-Wikipedia "Stade Roland
    // Garros", prop=coordinates (haettu 14.9.2026). Stadion on
    // tekstissä: se rakennettiin Pariisiin 1928 Davis Cupia varten.
    paikka: {
      nimi: 'Stade Roland Garros',
      laudat: {
        maailmankartta: { x: 5908.2, y: 1440 },
        europe: { x: 254.3, y: 608.9 },
      },
    },
  },
  {
    sivu: 'urheilu',
    nosto: 3,
    id: 'maalehti-le-mans',
    nimio: 'Le Mansin 24 tuntia',
    symboli: 'urheilu',
    lahi: true,
    // 0,1984 E / 48,0077 N — en-Wikipedia "Le Mans", prop=coordinates
    // (haettu 14.9.2026). Kaupunki on tekstissä: kisa ajetaan sen
    // liepeillä.
    paikka: {
      nimi: 'Le Mans',
      laudat: {
        maailmankartta: { x: 5839.9, y: 1475.9 },
        europe: { x: 215, y: 631 },
      },
    },
  },
  {
    sivu: 'arki',
    nosto: 1,
    id: 'maalehti-marseillen-saippua',
    nimio: 'Marseillen saippua',
    symboli: 'kauppa',
    lahi: true,
    // 5,37 E / 43,2964 N — en-Wikipedia "Marseille", prop=coordinates
    // (haettu 14.9.2026). Kaupunki on tekstissä: saippua on sen omaa
    // ja kuution kylkeen leimataan valmistajan nimi.
    paikka: {
      nimi: 'Marseille',
      laudat: {
        maailmankartta: { x: 6012.3, y: 1671.4 },
        europe: { x: 314.3, y: 754.9 },
      },
    },
  },
  {
    sivu: 'tavat',
    nosto: 1,
    id: 'maalehti-bouquinistit',
    nimio: 'Seinen kirjalaatikot',
    symboli: 'kulttuuri',
    lahi: true,
    // 2,34728 E / 48,85296 N — en-Wikipedia "Bouquinistes",
    // prop=coordinates (haettu 14.9.2026). Paikka on tekstissä:
    // Seinen kaiteet kolmen kilometrin matkalla.
    paikka: {
      nimi: 'Seinen rantakaiteet',
      laudat: {
        maailmankartta: { x: 5911.6, y: 1439.8 },
        europe: { x: 256.3, y: 608.8 },
      },
    },
    visa: {
      kysymys: 'Kuinka monta laatikkoa yksi kirjamyyjä saa enintään?',
      vaihtoehdot: ['Neljä', 'Kaksikymmentä', 'Kolmesataa'],
      oikea: 0,
      fakta: 'Maali on aina sama vaunuvihreä kuin ensimmäisen metron '
        + 'kylteissä.',
    },
  },
];

/** Lehden nosto tunnuksilla, tai null jos jako osoittaa harhaan. */
function lehdenNosto(sivu, indeksi) {
  const kategoria = (MAA_KATEGORIAT.FRA ?? []).find((k) => k.id === sivu);
  return kategoria?.nostot?.[indeksi] ?? null;
}

/**
 * KORTTI LEHDEN NOSTOSTA — teksti, kuva ja kuvatekstit sellaisinaan.
 *
 * Mitään ei kirjoiteta uudelleen eikä lyhennetä: `lunastus` on lehden
 * oma `teksti` yhtenä kappaleena, ja kuvan neljä kenttää ovat lehden
 * omat. Ainoa lisäys on lähderivi, joka kertoo mistä sivulta ja mistä
 * nostosta kortti on.
 */
function korttiLehdesta(rivi) {
  const lahde = lehdenNosto(rivi.sivu, rivi.nosto);
  if (!lahde) return null;
  const kuva = lahde.tiedosto
    ? {
      tiedosto: lahde.tiedosto,
      ...(lahde.lyhyt ? { lyhyt: lahde.lyhyt } : {}),
      ...(lahde.selite ? { selite: lahde.selite } : {}),
      ...(lahde.lahde ? { lahde: lahde.lahde } : {}),
    }
    : null;
  return {
    id: rivi.id,
    nimio: rivi.nimio,
    otsikko: lahde.otsikko,
    lunastus: [lahde.teksti],
    ...(kuva ? { kuva } : {}),
    symboli: rivi.symboli,
    ...(rivi.lahi ? { lahi: true } : {}),
    ...(rivi.visa ? { visa: rivi.visa } : {}),
    paikka: rivi.paikka,
    lahde: `Maalehden sivu "${rivi.sivu}", nosto "${lahde.otsikko}" `
      + '(js/packs/maa-kategoriat.js FRA, pelin omaa tarkistettua '
      + 'aineistoa). Teksti ja kuva luetaan lehdestä ajon aikana, joten '
      + 'ne ovat sanatarkasti samat.',
  };
}

/** Ranskan maalehden sivuista palasteltu nostojoukko. */
export const MAALEHTINOSTOT_FRA = JAKO.map(korttiLehdesta).filter(Boolean);

/** Jakosuunnitelma sellaisenaan — testit ja raportit lukevat tästä. */
export const MAALEHTIJAKO_FRA = JAKO;
