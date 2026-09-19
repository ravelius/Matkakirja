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

/*
 * === TOINEN KUVA JOKAISELLE NOSTOLLE (19.9.2026) =====================
 *
 * Omistaja 18.9.2026 (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 44 kohta 2):
 * *"commonsista voisi etsiä vähintään kaksi kuvaa joka juttuun"*. Lehden
 * nosto kantaa yhden kuvan (`kuva`, luetaan maa-kategoriat.js:n
 * FRA-taulusta Commons-tiedostonimenä), joten jokainen kartan nosto sai
 * tässä erässä TOISEN kuvan — kahdeksantoista uutta Commons-kuvaa.
 *
 * MIKSI `galleria` EIKÄ `kuvat`. Maalehtinostot ovat NOSTOJA, ja noston
 * kortin kuvalista on `galleria` (js/fokusnosto.js nostonKuvat: `kuva`
 * ensin, `galleria` perään). Kenttä `kuvat` on KOHTEEN lista
 * (js/fokuskohteet.js kohteenKuvat) eikä sitä lueta nostolta lainkaan,
 * joten `kuvat`-listaan kirjattu kuva ei näkyisi kortilla. Sama muoto
 * molemmissa, joten kuvatietueet ovat merkilleen samanlaiset kuin
 * js/packs/maastokohteet-fra.js:ssä. Renderöijään EI tarvinnut koskea:
 * kahden kuvan nosto piirtyy valmiilla selailunuolilla
 * (piirraNostonKuvasarja), ja `osoite` kulkee assetOsoiten läpi
 * sellaisenaan kuten maastokohteilla.
 *
 * MIKSI OMA TAULU EIKÄ JAKO-RIVIN KENTTÄ. `JAKO` on jakosuunnitelma:
 * mistä lehden sivusta kortti syntyy ja mihin se ankkuroidaan. Kuvat
 * eivät ole jakosuunnitelmaa vaan kartan omaa kuvitusta, ja omassa
 * taulussaan ne eivät hukkaa ankkuririvien luettavuutta.
 *
 * LISENSSIT. Vain Public domain, CC0, CC BY ja CC BY-SA kelpasivat;
 * NC-, ND-, GFDL- ja FAL-ehtoiset hylättiin. Jokaisen tekijä, lisenssi
 * ja lähdesivu on luettu Commonsin omasta API:sta (extmetadata) ennen
 * latausta, ja jokainen tiedosto on katsottu silmällä.
 *
 * PARI ON MIELUITEN HISTORIA + NYKYPÄIVÄ, ja kymmenellä nostolla toinen
 * kuva on 1800-luvun tai varhaisen 1900-luvun kuva.
 *
 * KUVAT EIVÄT OLE VIELÄ ÄMPÄRISSÄ. Osoitteet osoittavat kansioon
 * karttanostot/20260919/, jonne Fable vie tiedostot; ennen vientiä ne
 * vastaavat 404:llä. Puuttuva kuva pudotetaan sarjasta eikä kortille jää
 * tyhjää kehystä (js/fokusnosto.js piirraNostonKuvasarja).
 */
const OSOITE = 'https://media.matkakirja.app/karttanostot/20260919/';

const KUVAT = {
  'maalehti-peilisali': [{
    osoite: `${OSOITE}fra-maalehti-peilisali-a22fa9d8.jpg`,
    lyhyt: 'Rauhansopimus allekirjoitetaan peilisalissa kesäkuussa 1919.',
    selite: 'Peilisali täyttyi valtuuskunnista 28. kesäkuuta 1919, kun Versailles’n rauhansopimus allekirjoitettiin; katselijat seisovat peilien ja ikkunoiden välissä.',
    lahde: 'Valokuva: Helen Johns Kirtland ja Lucian Swift Kirtland, Wikimedia Commons (public domain).',
    tekija: 'Helen Johns Kirtland ja Lucian Swift Kirtland',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Treaty_of_Versailles_Signing,_Hall_of_Mirrors.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-roquefort': [{
    osoite: `${OSOITE}fra-maalehti-roquefort-28df3754.jpg`,
    lyhyt: 'Juustohyllyt Combalou-vuoren luonnonluolassa Roquefort-sur-Soulzonissa.',
    selite: 'Roquefort-sur-Soulzonin suuri kypsytysluola: tammihyllyt nousevat kerroksittain vuoren sisään kaiverretussa holvissa.',
    lahde: 'Valokuva: Daniel Villafruela, Wikimedia Commons (CC BY-SA 3.0).',
    tekija: 'Daniel Villafruela',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Roquefort_sur_Soulzon-Grande_cave-20140628.jpg',
    lisenssi: 'CC BY-SA 3.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  }],
  'maalehti-michelin-opas': [{
    osoite: `${OSOITE}fra-maalehti-michelin-opas-707cb9ef.jpg`,
    lyhyt: 'Ensimmäisen Michelin-oppaan punainen kansi vuodelta 1900.',
    selite: 'Vuoden 1900 Michelin-oppaan kansi: rengas ja lupaus "Offert gracieusement aux Chauffeurs" — opas jaettiin autoilijoille ilmaiseksi.',
    lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
    tekija: 'Tekijä tuntematon',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Guidem_michelin_1900.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-chandeleur': [{
    osoite: `${OSOITE}fra-maalehti-chandeleur-5eb70599.jpg`,
    lyhyt: 'Ohukaisia paistetaan kynttilänpäivänä 2. helmikuuta 1934.',
    selite: 'Lehtikuva kynttilänpäivältä 2. helmikuuta 1934: taikina kaadetaan pannulle ja valmiit ohukaiset pinotaan viereen.',
    lahde: 'Valokuva: Agence Rol, Wikimedia Commons (public domain).',
    tekija: 'Agence Rol',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2-2-34,_Chandeleur_(fabrication_de_cr%C3%AApes)_-_btv1b532912784.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-montgolfier': [{
    osoite: `${OSOITE}fra-maalehti-montgolfier-84c01965.jpg`,
    lyhyt: 'Montgolfierin veljesten muistomerkki Annonayssa.',
    selite: 'Annonayn muistomerkki: veljekset pitelevät pallon kuvaa, jonka he ensi kerran nostivat ilmaan kotikaupungissaan.',
    lahde: 'Valokuva: Jacques Forêt (Sequajectrof), Wikimedia Commons (CC BY-SA 3.0).',
    tekija: 'Jacques Forêt (Sequajectrof)',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Annonay_Montgolfier_2011-08-01-032.jpg',
    lisenssi: 'CC BY-SA 3.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  }],
  'maalehti-braille': [{
    osoite: `${OSOITE}fra-maalehti-braille-ac1fa422.jpg`,
    lyhyt: 'Kaksi sormea lukee pistekirjoitussivua.',
    selite: 'Lukija kulkee kahdella sormella pistekirjoitusrivistöä pitkin; kohopisteet erottuvat sivulta varjoina.',
    lahde: 'Valokuva: Antonio X. Alonso, Wikimedia Commons (CC BY 2.0).',
    tekija: 'Antonio X. Alonso',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:A_person_reading_a_braille_book.jpg',
    lisenssi: 'CC BY 2.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
  }],
  'maalehti-pasteur-meister': [{
    osoite: `${OSOITE}fra-maalehti-pasteur-meister-219fe1ca.jpg`,
    lyhyt: 'Rabiesrokotus Pasteurin vastaanotolla Pariisissa, litografia.',
    selite: 'Litografia Pasteurin vastaanotolta: lääkäri Grancher pistää rokotteen, potilaat odottavat vuoroaan ja Pasteur itse seisoo seuraamassa.',
    lahde: 'Litografia: F. Pirodon L.-L. Gsellin mukaan, Wellcome Collection / Wikimedia Commons (CC BY 4.0).',
    tekija: 'F. Pirodon L.-L. Gsellin mukaan (Wellcome Collection)',
    lahdeUrl: "https://commons.wikimedia.org/wiki/File:Rabies_vaccination_in_Pasteur's_clinic_in_Paris._Lithograph_Wellcome_L0003730.jpg",
    lisenssi: 'CC BY 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
  }],
  'maalehti-cinematographe': [{
    osoite: `${OSOITE}fra-maalehti-cinematographe-e35af7e5.jpg`,
    lyhyt: 'Lumièren cinématographe, puinen laatikko kammella.',
    selite: 'Cinématographe Institut Lumièren kokoelmassa: sama puulaatikko oli vuoroin kamera, kopiokone ja projektori.',
    lahde: 'Valokuva: Victor Grigas, Wikimedia Commons (CC BY-SA 4.0).',
    tekija: 'Victor Grigas',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Institut_Lumi%C3%A8re_-_CINEMATOGRAPHE_Camera.jpg',
    lisenssi: 'CC BY-SA 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  }],
  'maalehti-dune-du-pilat': [{
    osoite: `${OSOITE}fra-maalehti-dune-du-pilat-cb0307f3.jpg`,
    lyhyt: 'Dyynin itärinne ja La Teste-de-Buchin mäntymetsä.',
    selite: 'Dune du Pilat’n itärinne laskeutuu suoraan La Teste-de-Buchin mäntymetsään — juuri sille puolelle hiekka vaeltaa.',
    lahde: 'Valokuva: Rundvald, Wikimedia Commons (CC BY-SA 4.0).',
    tekija: 'Rundvald',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Dune-du-Pilat%2Bpinede-byMmeRundvald.jpg',
    lisenssi: 'CC BY-SA 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  }],
  'maalehti-camarguen-hevoset': [{
    osoite: `${OSOITE}fra-maalehti-camarguen-hevoset-de271f45.jpg`,
    lyhyt: 'Valkoinen tamma ja sen tummanruskea varsa Camarguessa.',
    selite: 'Camarguelainen tamma on valkoinen, mutta sen varsa syntyy tummanruskeana ja vaalenee vasta vuosien myötä.',
    lahde: 'Valokuva: Elliott Brown, Wikimedia Commons (CC BY 2.0).',
    tekija: 'Elliott Brown',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Camargue_Jument_et_son_poulain.jpg',
    lisenssi: 'CC BY 2.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
  }],
  'maalehti-chaine-des-puys': [{
    osoite: `${OSOITE}fra-maalehti-chaine-des-puys-0401261b.jpg`,
    lyhyt: 'Tulivuoriketju Puy de Dômen laelta nähtynä.',
    selite: 'Puy de Dômen laelta ketju erottuu sellaisena kuin se on: rivi pyöreitä kraatterikukkuloita peltojen ja metsien seassa.',
    lahde: 'Valokuva: Tangopaso, Wikimedia Commons (public domain).',
    tekija: 'Tangopaso',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cha%C3%AEne_des_Puys_from_Puy_de_Dome.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-couesnonin-vuorovesi': [{
    osoite: `${OSOITE}fra-maalehti-couesnonin-vuorovesi-62337764.jpg`,
    lyhyt: 'Vuosisadan vuorovesi ympäröi Mont-Saint-Michelin maaliskuussa 2015.',
    selite: 'Maaliskuun 2015 päiväntasauksen "vuosisadan vuorovesi": vesi on noussut saaren muurien juureen ja lahti on yhtä ulappaa.',
    lahde: 'Valokuva: Édouard Hue, Wikimedia Commons (CC BY-SA 4.0).',
    tekija: 'Édouard Hue',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:March_2015_equinox_spring_tide_at_Mont_Saint-Michel-2.jpg',
    lisenssi: 'CC BY-SA 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  }],
  'maalehti-tour-de-france-1903': [{
    osoite: `${OSOITE}fra-maalehti-tour-de-france-1903-56fde3f3.jpg`,
    lyhyt: 'Ensimmäisen Tour de Francen reittikartta heinäkuulta 1903.',
    selite: 'L’Auto-vélo -lehden kartta heinäkuulta 1903: kuuden etapin silmukka Pariisista Lyoniin, Marseilleen, Toulouseen, Bordeaux’hon, Nantesiin ja takaisin.',
    lahde: 'Kartta: L’Auto-vélo, Wikimedia Commons (public domain).',
    tekija: 'L’Auto-vélo',
    lahdeUrl: "https://commons.wikimedia.org/wiki/File:L'itin%C3%A9raire_du_premier_Tour_de_France_cycliste,_en_juillet_1903.jpg",
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-petanque': [{
    osoite: `${OSOITE}fra-maalehti-petanque-933799cc.jpg`,
    lyhyt: 'Jeu provençalia pelataan Avignonin puistokujalla.',
    selite: 'Jeu provençal eli "la longue" on pétanquen edeltäjä: heittäjä ottaa vauhtia juosten, ja juuri siksi paikallaan pysyvä pétanque keksittiin.',
    lahde: 'Valokuva: Fif’, Wikimedia Commons (CC BY-SA 2.0).',
    tekija: 'Fif’',
    lahdeUrl: "https://commons.wikimedia.org/wiki/File:Jeu_proven%C3%A7al_all%C3%A9es_de_l'Oulle_Avignon.jpg",
    lisenssi: 'CC BY-SA 2.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
  }],
  'maalehti-roland-garros': [{
    osoite: `${OSOITE}fra-maalehti-roland-garros-96be9593.jpg`,
    lyhyt: 'Lentäjä Roland Garros Demoiselle-koneensa edessä vuonna 1910.',
    selite: 'Roland Garros seisoo Demoiselle-koneensa edessä vuonna 1910 — kolme vuotta ennen ensimmäistä Välimeren ylitystä ja kahdeksantoista vuotta ennen kuin stadion sai hänen nimensä.',
    lahde: 'Valokuva: Agence Meurisse, Wikimedia Commons (public domain).',
    tekija: 'Agence Meurisse',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Roland_Garros_1910.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-le-mans': [{
    osoite: `${OSOITE}fra-maalehti-le-mans-d9fc444d.jpg`,
    lyhyt: 'Brasier-autot varikolla ensimmäisen 24 tunnin kisan jälkeen 1923.',
    selite: 'Lehtikuva 27. toukokuuta 1923: Brasier-autot seisovat varikolla heti ensimmäisen Le Mansin 24 tunnin kisan maalin jälkeen.',
    lahde: 'Valokuva: Agence Rol, Wikimedia Commons (public domain).',
    tekija: 'Agence Rol',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:27-5-23,_Le_Mans,_les_Brasier_apr%C3%A8s_la_course_(automobile_des_24_heures)_-_btv1b531077586.jpg',
    lisenssi: 'Public domain',
    lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  }],
  'maalehti-marseillen-saippua': [{
    osoite: `${OSOITE}fra-maalehti-marseillen-saippua-d96c8915.jpg`,
    lyhyt: 'Saippuamassa leikataan paloiksi veitsellä, puupiirros vuodelta 1873.',
    selite: 'Puupiirros Louis Figuier’n teoksesta 1873: jäähtynyt saippuamassa leikataan lattialla veitsellä paloiksi, jotka vasta sitten leimataan.',
    lahde: 'Puupiirros: Louis Figuier ja Jules Férat, Wikimedia Commons (CC BY 2.0).',
    tekija: 'Louis Figuier ja Jules Férat',
    lahdeUrl: "https://commons.wikimedia.org/wiki/File:Les_merveilles_de_l'industrie,_1873_%22Coupage_du_savon_de_Marseille_en_pains,_au_moyen_du_couteau%22._(4618578904).jpg",
    lisenssi: 'CC BY 2.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0/',
  }],
  'maalehti-bouquinistit': [{
    osoite: `${OSOITE}fra-maalehti-bouquinistit-11d8e477.jpg`,
    lyhyt: 'Kirjalaatikot Quai Saint-Michelillä Notre-Damen edessä vuonna 1967.',
    selite: 'Quai Saint-Michel vuonna 1967: kirjamyyjän laatikot ja painokuvat levällään rantakaiteella, Notre-Dame taustalla.',
    lahde: 'Valokuva: Daniel Villafruela, Wikimedia Commons (CC BY-SA 4.0).',
    tekija: 'Daniel Villafruela',
    lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Paris_75005_Quai_Saint-Michel_towards_Notre-Dame_Bouquinistes_1967.jpg',
    lisenssi: 'CC BY-SA 4.0',
    lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  }],
};

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
    // Kartan oma toinen kuva lehden kuvan pariksi (ks. KUVAT yllä).
    // Noston kuvalista on `galleria`, ei `kuvat` — js/fokusnosto.js
    // nostonKuvat lukee vain sen.
    ...(KUVAT[rivi.id]?.length ? { galleria: KUVAT[rivi.id] } : {}),
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
