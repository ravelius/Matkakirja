/*
 * TÄKYNOSTO — kartan kohdemerkistä aukeava lunastuskortti.
 *
 * Raamatun osio "Fokusmoodi", kohta KEVYT KULKU -KOKEILU (omistaja
 * 25.8.2026): täkynosto on *"lyhyt KELTAISTEN LEHTIEN
 * KLIKKIOTSIKKOTASOINEN lause (henkilöskandaali tai uskomaton
 * tositarina, lupaus lunastetaan faktalla)"*.
 *
 * ── YHTENÄINEN KOHDEMALLI (omistaja 29.8.2026 ilta) ────────────────
 *
 * Raamattu: *"fokuskohteet, täkynostot, eläintäyt ja syvennystarinat
 * YHDISTETÄÄN yhdeksi lajiksi: KOHDE … Tuikkiva piste ja yksi
 * kerrallaan -nostopooli POISTUVAT — löytäminen tapahtuu selitevalikon
 * aihevaloilla, jotka pelaaja itse sytyttää."*
 *
 * Tämän tiedoston kartta-osuus KUTISTUI sen mukana: tuikkiva keltainen
 * piste, nostopoolin vuorottelu, Livian kertahuomautus, alalaidan
 * varapolkuliuska ja pisteen oma karttakerros
 * (js/fokusnosto-symbolit.js) purettiin. Nostot ovat nyt kartan
 * TAVALLISIA KOHDEMERKKEJÄ kohteiden omassa kerroksessa
 * (js/fokuskohteet.js): sama viivamerkki, sama nimiöväistö, sama
 * kasauspassi ja sama aihevalo kuin kaikilla muillakin kohteilla.
 * Merkin symboli on noston aihesymboli (`symboli`-kenttä, oletus
 * huutomerkki — skandaali on poolin peruslaji), ja napautus avaa
 * noston OMAN lunastuskortin. Kytkentä tapahtuu rekisteröintinä
 * (kytkeFokusnosto → rekisteroiLisakohteet), koska tämä moduuli on
 * niputusjärjestyksessä kohteiden jälkeen.
 *
 * ── NOSTO JOLLA ON KOHDE EI LUO OMAA MERKKIÄ ───────────────────────
 *
 * Nosto, joka nimeää kartan kohteen (`kohde`-kenttä: Kastrin kylä →
 * Delfoi, Antikytheran kone → Antikythera), EI piirrä omaa merkkiä —
 * kaksi merkkiä samassa pisteessä olisi tuplamerkki, jota vanha
 * "piste ratsastaa symbolin päällä ja astuu luettuna sivuun" -sääntö
 * yritti paikata. Tarina aukeaa kohteen omasta tietoruudusta Livian
 * leikekirjan nappina (js/fokuskohteet.js piirraKohteenNosto,
 * rekisteröinti asetaKohdeNostot).
 *
 * ── LUPAUS LUNASTETAAN, TAI OTSIKKO ON HUIJAUS ─────────────────────
 *
 * Aineiston ensimmäinen sääntö: jokaisen otsikon takana on lähteestä
 * tarkistettu tositarina, joka vastaa nimenomaan siihen, mitä otsikko
 * lupaa. Siksi nosto avaa OMAN korttinsa, jossa lunastus on, eikä
 * pelkkää kartan tietoruutua: Delfoin tietoruutu kertoo Omfaloksesta ja
 * Pythiasta, ei kylästä joka istui oraakkelin päällä — se otsikko jäisi
 * lunastamatta ja Perustuslain totuudellisuuspilari kaatuisi. Kun
 * kohteella on oma karttamerkki (`kohde`), kortissa on nappi sinne:
 * nosto houkuttelee kohteen auki, mutta lupaus maksetaan ensin.
 *
 * ── MERKKI SIIHEN KOHTAAN KARTTAA, JOTA JUTTU KOSKEE ───────────────
 *
 * Omistaja 25.8.2026: *"täkyn pitäisi tulla … siihen kohtaan karttaa
 * jota tapahtuma koskee."* Merkki piirtyy täyn omiin koordinaatteihin
 * (`paikka`), ja ilman niitä paikaksi otetaan kaupunki, jossa pelaaja
 * on (nostonPaikka) — kaupungin päälle osuvat merkit siirtää sivuun
 * sama kasauspassi kuin muillakin kohteilla (js/fokusniput.js).
 *
 * ── LUETUT LAITTEEN MUISTIIN ───────────────────────────────────────
 *
 * Luettu nosto merkitään laitteen muistiin (localStorage) — sama
 * try/catch-kaava kuin lehtivinkin ruksilla (js/ui-apurit.js
 * lehtivinkkiPiilotettu). Merkki EI muutu siitä: kohde pysyy kartalla
 * ja kortin saa auki uudelleen, kuten muillakin kohteilla. Muisti jää
 * dataksi mahdollista myöhempää käyttöä varten (esim. Livian
 * satunnainen vinkki lukemattomasta sisällöstä — Raamattu, YHTENÄINEN
 * KOHDEMALLI: mahdollinen kevyt lisä, ei mekaniikkaa).
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten kaikki top-level-nimet alkavat
 * NOSTO_/nosto-etuliitteellä.
 */
import {
  fokusmoodiPaalla, html, jaaKappaleiksi, nielaiseSulkevaNapautus, polloNimilappu,
} from './ui-apurit.js';
import { asetaKuva } from './media.js';
import { valokuvaUrl, valokuvaVara } from './packs/africa-valokuvat.js';
import {
  asetaKohdeNostot, avaaFokuskohde, avaaKohdeSuurennos, rekisteroiLisakohteet,
  suljeFokuskohde, suljeKohdeSuurennos,
} from './fokuskohteet.js';
import { NOSTOSYM_TYYPIT, nostosymKortinYlarivi } from './fokusnosto-symbolit.js';
import { fokuskohteet } from './packs/fokuskohteet-grc.js';
/*
 * NELJÄN MAAN POOLIT ASUVAT NYT KAUPUNKIEN OMISSA PAKETEISSA (v1301).
 * Tuonnit ovat tässä siksi, että maapooli osoittaa samaan taulukkoon
 * eikä sen kopioon — ks. NOSTO_MAAT.
 */
import { FOKUSVIRTA_BERLIINI } from './packs/fokusvirta-berliini.js';
import { FOKUSVIRTA_MADRID } from './packs/fokusvirta-madrid.js';
import { FOKUSVIRTA_PARIISI } from './packs/fokusvirta-pariisi.js';
import { FOKUSVIRTA_WIEN } from './packs/fokusvirta-wien.js';
/*
 * LOPUTKIN TÄKYNOSTOPOOLIT MAAPOOLEIKSI (aalto 4B, 29.8.2026). Sama
 * syy kuin neljällä yllä: taulu osoittaa samaan taulukkoon kuin
 * kaupungin paketti, eikä nostoja kopioida tiedostosta toiseen.
 */
import { FOKUSVIRTA_AMSTERDAM } from './packs/fokusvirta-amsterdam.js';
import { FOKUSVIRTA_BERGEN } from './packs/fokusvirta-bergen.js';
import { FOKUSVIRTA_BUDAPEST } from './packs/fokusvirta-budapest.js';
import { FOKUSVIRTA_BUKAREST } from './packs/fokusvirta-bukarest.js';
import { FOKUSVIRTA_DUBLIN } from './packs/fokusvirta-dublin.js';
import { FOKUSVIRTA_DUBROVNIK } from './packs/fokusvirta-dubrovnik.js';
import { FOKUSVIRTA_HELSINKI } from './packs/fokusvirta-helsinki.js';
import { FOKUSVIRTA_ISTANBUL } from './packs/fokusvirta-istanbul.js';
import { FOKUSVIRTA_KOBENHAVN } from './packs/fokusvirta-kobenhavn.js';
import { FOKUSVIRTA_LISSABON } from './packs/fokusvirta-lissabon.js';
import { FOKUSVIRTA_LONTOO } from './packs/fokusvirta-lontoo.js';
import { FOKUSVIRTA_PRAHA } from './packs/fokusvirta-praha.js';
import { FOKUSVIRTA_RIIKA } from './packs/fokusvirta-riika.js';
import { FOKUSVIRTA_ROOMA } from './packs/fokusvirta-rooma.js';
import { FOKUSVIRTA_SARAJEVO } from './packs/fokusvirta-sarajevo.js';
import { FOKUSVIRTA_SOFIA } from './packs/fokusvirta-sofia.js';
import { FOKUSVIRTA_TALLINNA } from './packs/fokusvirta-tallinna.js';
import { FOKUSVIRTA_TUKHOLMA } from './packs/fokusvirta-tukholma.js';
import { FOKUSVIRTA_VILNA } from './packs/fokusvirta-vilna.js';
/*
 * KOLME UUTTA MAATA TAULUUN (aalto 4C, 30.8.2026). Sama syy ja sama
 * sääntö kuin yllä: rivi osoittaa samaan taulukkoon kuin kaupungin
 * paketti, eikä yhtäkään nostoa kopioida tiedostosta toiseen.
 */
import { FOKUSVIRTA_KIOVA } from './packs/fokusvirta-kiova.js';
import { FOKUSVIRTA_KRAKOVA } from './packs/fokusvirta-krakova.js';
import { FOKUSVIRTA_PIETARI } from './packs/fokusvirta-pietari.js';
import { fokusvirtaSisalto } from './fokusvirta.js';
import { polloKysy } from './pollo.js';
import { sfx } from './sound.js';

/* ==================== POOLI ==================== */

/*
 * KREIKAN TÄKYNOSTOT (omistajan valinta 25.8.2026).
 *
 * NELJÄ NOSTOA, EI YKSI (omistajan pelitestipalaute v1234: *"sitten kun
 * sen kävi lukemassa, ei ilmestynyt enää uutta vilkkuvaa pistettä"*).
 *
 * Poolissa oli 26.8.2026 alkaen tasan YKSI nosto, koska silloin täky oli
 * PUHEKUPLA ja omistaja rajasi: *"Täkyjä josta tulee puhekupla pitää olla
 * vain yksi per maa."* Kupla poistui 27.8.2026 (tuikkiva piste), ja
 * yhtenäinen kohdemalli 29.8.2026 teki pooleista kartan pysyviä
 * kohteita — pituusrajoja ei ole kummassakaan suunnassa.
 *
 * Kaksi lisättyä nostoa ovat samasta tarkistetusta aineistosta kuin
 * ensimmäinen (docs/mantereet-tyoaineisto/takynostot-kreikka.md,
 * ehdokkaat 10 ja 12, molemmat merkitty VARMOIKSI) ja niiden faktat on
 * tarkistettu uudelleen lähdeartikkeleista 28.8.2026. Kummallakin on
 * `kohde`, joten nosto EI piirrä omaa merkkiä vaan aukeaa kohteensa
 * tietoruudusta, ja kortin nappi vie kohteen omaan tietoruutuun — täky
 * *"houkuttelee kohteen auki"* kuten alkuperäisessä tilauksessa.
 *
 * NELJÄS NOSTO on Antikytheran kone (päätoimittajan kaanonteksti
 * 28.8.2026): sama kaava kuin kahdella edellisellä — oma `kohde`, oma
 * loistoaikakuva ja nykytilan valokuva kakkosena. Poolissa on siis
 * Ateena, Delfoi, Olympos ja Antikythera, neljä eri kolkkaa laudasta,
 * eikä kaksi pistettä osu samaan paikkaan.
 *
 * KUVAT OVAT NYT KAIKILLA. Kolme viimeistä saivat pääkuvakseen repon
 * oman generoidun loistoaikakuvan (assets/kartat/nostot/), ja
 * kaikkien Commons-kuvien lisenssi- ja tekijätiedot on kysytty
 * imageinfo-rajapinnalta ennen käyttöä (omistajan sääntö: ei arvattuja
 * tiedostonimiä). Kuvaton nosto olisi korttina yhä täysin ehjä —
 * otsikko ja lunastus kantavat sen.
 *
 * Lunastus on aineiston omaa, lähteestä tarkistettua tekstiä
 * (docs/mantereet-tyoaineisto/takynostot-kreikka.md, ehdokas 2) —
 * siitä on paikoin lyhennetty, muttei lisätty eikä muutettu yhtään
 * faktaväitettä. Lähderivi on kortissa näkyvissä.
 *
 * KUVA on kysytty Commonsin imageinfo-rajapinnalta 25.8.2026 (koko,
 * lisenssi, tekijä, päiväys) — nimeä ei ole arvattu:
 *   - Sophia Schliemann wearing gold jewelry.jpg — 1093×1273, public
 *     domain, n. 1873. Kuva on JO PELISSÄ (js/packs/fokusvirta-ateena.js
 *     matkakirja.kuva), ja miniatyyri on tarkoituksella sama: pelaaja
 *     tunnistaa sen isoisän merkinnästä, ja juuri se tekee otsikosta
 *     koukun.
 *
 * IKÄSOPIVUUS (13+, Perustuslaki): Sofian tarinasta on jätetty pois
 * aineistossa erikseen hylätty avioliittokulma.
 *
 * ── PAIKKA LAUDALLA (omistaja 25.8.2026: täky siihen kohtaan) ──────
 *
 * Koordinaatit on laskettu SAMALLA MENETELMÄLLÄ kuin kohtaamispisteillä
 * (js/packs/fokusvirta-ateena.js) ja kartan kohteilla
 * (js/packs/fokuskohteet-grc.js): pelissä EI ole projektiokoodia, vaan
 * asteet on muunnettu laudan yksiköiksi valmiiksi ja asteet jätetty
 * kommenttiin, jotta luvut voi laskea uudelleen jos lauta vaihtaa
 * projektiota.
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 -175 /
 *     POHJOINEN 76 (tools/fokuskartta/piirto.js laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3
 *     (js/packs/europe.js).
 *
 * Lauta, jota rivillä ei ole, saa pisteensä kaupunkiin (nostonPaikka):
 * väärään paikkaan ankkuroitu merkki olisi pahempi kuin maan osoite.
 */
const NOSTO_MAAT = {
  GRC: [
    {
      id: 'sofia-korut',
      // Kartan nimiö: lyhyt pelaajateksti pisteen kylkeen (omistajan
      // lisätilaus 28.8.2026 ilta). Otsikko on lause, nimiö on nimi.
      nimio: 'Helenan korut',
      otsikko: 'Valokuva paljasti aarrevarkauden — rouva poseerasi Troijan koruissa',
      teksti: 'Heinrich Schliemann salakuljetti Priamoksen aarteen ulos '
        + 'Ottomaanien valtakunnasta. Viranomaisille asia paljastui vasta, kun '
        + 'hänen vaimonsa Sofia esiintyi julkisesti yllään "Helenan korut" — '
        + 'kultainen otsapanta ja kaulakorut.\n\n'
        + 'Kaivausta valvomaan määrätty ottomaanivirkamies Amin Effendi sai '
        + 'vankeustuomion, Schliemannin kaivauslupa peruttiin ja Ottomaanien '
        + 'hallitus haastoi hänet oikeuteen osuudestaan kultaan.',
      lahde: 'en-Wikipedia "Priam\'s Treasure", osio "Art collection" '
        + '(tarkistettu 25.8.2026).',
      /*
       * Iliou Melathron, Schliemannin oma talo Ateenassa (23,7342 E /
       * 37,9814 N — en-Wikipedia "Iliou Melathron"). Juuri siitä talosta
       * Sofia lähti korut yllään, ja se on kadun päässä siitä
       * kansallismuseosta, jonne Troijan löydöt lopulta päätyivät.
       */
      paikka: {
        nimi: 'Ateena',
        laudat: {
          maailmankartta: { x: 6624.5, y: 1881.6 },
          europe: { x: 666.9, y: 894.7 },
        },
      },
      kuva: {
        tiedosto: 'Sophia Schliemann wearing gold jewelry.jpg',
        selite: 'Sofia Schliemann "Helenan koruissa". Juuri tämä kuva '
          + 'kertoi viranomaisille, missä Troijan kulta oli.',
        lahde: 'Tuntematon kuvaaja n. 1873, Wikimedia Commons (public domain)',
      },
    },
    {
      /*
       * Aineiston ehdokas 10. Paikka ja kohde ovat kartan oma Delfoi
       * (js/packs/fokuskohteet-grc.js `delfoi`), joten nosto ei piirrä
       * omaa merkkiä vaan aukeaa Delfoin tietoruudusta (yhtenäisen
       * kohdemallin sääntö, ks. tiedoston alku).
       *
       * LUPAUS LUNASTETAAN OMASSA KORTISSA eikä Delfoin tietoruudussa:
       * tietoruutu kertoo Omfaloksesta ja Pythiasta, ei kylästä joka
       * istui oraakkelin päällä. Kortin nappi vie sinne vasta sitten,
       * kun otsikon lupaus on maksettu.
       */
      id: 'kastrin-kyla',
      nimio: 'Kastrin kylä',
      kohde: 'delfoi',
      otsikko: 'Kokonainen kylä istui oraakkelin päällä — eikä lähtenyt '
        + 'ennen kuin maa järisi',
      teksti: 'Kun ranskalaiset halusivat kaivaa Delfoin pyhäkön esiin, '
        + 'sen päällä seisoi Kastrin kylä: noin sata taloa ja 200 asukasta, '
        + 'jotka olivat louhineet antiikin kiviä omiin seiniinsä siitä '
        + 'asti kun paikka tuhottiin 300-luvulla.\n\n'
        + 'Kylä olisi pitänyt siirtää ennen kaivauksia, mutta asukkaat '
        + 'kieltäytyivät. Tilaisuus tuli vasta kun maanjäristys vaurioitti '
        + 'kylää pahoin: asukkaille tarjottiin kokonaan uusi kylä vanhan '
        + 'paikan tilalle, ja 1893 Ranskan arkeologinen koulu kuori pois '
        + 'maanvyöryjen massat ja paljasti Apollonin pyhäkön.',
      lahde: 'en-Wikipedia "Delphi", osio "Archaeology of the precinct" '
        + '(tarkistettu 28.8.2026).',
      /*
       * LOISTOAIKAKUVA PÄÄKUVAKSI (28.8.2026, sama malli kuin Sofian
       * areenalla): repon oma generoitu havainnekuva, jolla ei ole
       * Commons-nimeä eikä varareittiä, joten kenttä on `osoite` eikä
       * `tiedosto` (js/fokusnosto.js asetaNostonKuva).
       */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-kastrin-kyla-loistoaika.webp',
        selite: 'Kastrin kylä pyhäkön päällä: kivitalot rinteessä, antiikin '
          + 'pylväänpaloja pihojen välissä ja laakso alapuolella.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      paikka: {
        nimi: 'Delfoi',
        laudat: {
          maailmankartta: { x: 6583.4, y: 1862.2 },
          europe: { x: 643.2, y: 881.5 },
        },
      },
    },
    {
      /*
       * Aineiston ehdokas 12. Aineiston oma varoitus noudatettu: lähde
       * puhuu ensimmäisestä KIRJATUSTA noususta, joten teksti sanoo
       * "tiettävästi ensimmäinen" eikä väitä, ettei kukaan olisi
       * koskaan käynyt huipulla.
       */
      id: 'olympoksen-huippu',
      nimio: 'Vuohenmetsästäjä',
      kohde: 'olympos',
      otsikko: 'Jumalten vuorelle noustiin vasta 1913 — ja huipulla oli '
        + 'ensimmäisenä vuohenmetsästäjä',
      teksti: 'Olympos oli koko antiikin ajan jumalten koti, mutta sen '
        + 'korkeimmalle huipulle Mytikakselle noustiin tiettävästi '
        + 'ensimmäisen kerran vasta 2. elokuuta 1913 — vuosi sen jälkeen, '
        + 'kun Pohjois-Kreikka vapautui ottomaanivallasta.\n\n'
        + 'Retken maksoivat sveitsiläiset Frédéric Boissonnas ja Daniel '
        + 'Baud-Bovy, mutta kolmikosta huipulle astui ensimmäisenä heidän '
        + 'oppaansa Christos Kakkalos, villivuohien metsästäjä Litohoron '
        + 'kylästä. Hän toimi Olympoksen virallisena oppaana kuolemaansa '
        + 'eli vuoteen 1976 asti.',
      lahde: 'en-Wikipedia "Mount Olympus", osio "History" '
        + '(tarkistettu 28.8.2026).',
      /* Sama kuvalaji ja sama kenttä kuin Kastrin kylällä yllä. */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-olympoksen-huippu-loistoaika.webp',
        selite: 'Vuoden 1913 nousu Mytikakselle: kolme miestä ajan '
          + 'vaatteissa kiipeää kalliota, pilvet jäävät alapuolelle.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      paikka: {
        nimi: 'Ólympos',
        laudat: {
          maailmankartta: { x: 6578.6, y: 1799.5 },
          europe: { x: 640.5, y: 839.3 },
        },
      },
    },
    {
      /*
       * ANTIKYTHERAN KONE (päätoimittajan kaanonteksti 28.8.2026).
       * Otsikko, nimiö, molemmat lunastuskappaleet ja kolme kysymystä
       * ovat päätoimittajan omaa tekstiä sanatarkasti — tässä
       * tiedostossa niistä ei muuteta sanaakaan.
       *
       * TAVALLINEN TÄKYPISTE, EI KUPLATÄKY. Raamattu merkitsee Kreikan
       * kuplatäkyehdokkaaksi Antikytheran, mutta maan kuplatäky on jo
       * Sofia Schliemann -aihe (tämän taulukon ensimmäinen rivi), eikä
       * maalle tehdä toista. Kupla-aika on muutenkin ohi: kartalla on
       * vain piste, ja tämä on poolin neljäs.
       *
       * KOHDE ON KARTAN OMA ANTIKYTHERA (js/packs/fokuskohteet-grc.js
       * `antikythera`), samalla kaavalla kuin Kastrin kylä osoittaa
       * Delfoihin ja Olympoksen huippu Olympokseen: nosto aukeaa
       * kohteensa tietoruudusta, ja kortin nappi vie kohteen omaan
       * tietoruutuun VASTA kun otsikon lupaus on maksettu. Lupaus ja
       * tietoruutu eivät ole sama juttu — tietoruutu kertoo koneesta ja
       * saaresta, tämä kortti siitä hetkestä, jona möykky nousi
       * pinnalle.
       */
      id: 'antikythera-kone',
      nimio: 'Kone ennen aikaansa',
      kohde: 'antikythera',
      otsikko: 'Sienisukeltajat nostivat merenpohjasta koneen, joka '
        + 'ennusti taivaan liikkeet',
      lunastus: [
        'Vuonna 1901 sienisukeltajat tutkivat haaksirikkoa Antikytheran '
          + 'saaren edustalla ja nostivat pintaan pronssimöykyn, jota kukaan '
          + 'ei osannut selittää. Vasta röntgenkuvat paljastivat sen sisältä '
          + 'kymmenien hammasrattaiden koneiston — yli kaksituhatta vuotta '
          + 'vanhan laskukoneen, joka ennusti auringon- ja kuunpimennykset '
          + 'ja planeettojen liikkeet.',
        'Mitään yhtä monimutkaista ei tunneta muualta yli tuhanteen vuoteen '
          + 'sen jälkeen. Koneen palaset ovat esillä Ateenan kansallisessa '
          + 'arkeologisessa museossa — ja tutkijat kiistelevät yhä siitä, '
          + 'mihin kaikkeen se pystyi ja kuka sen rakensi.',
      ],
      lahde: 'en-Wikipedia "Antikythera mechanism", johdanto ja osio '
        + '"Discovery" (tarkistettu 28.8.2026).',
      /* Sama kuvalaji ja sama kenttä kuin kahdella nostolla yllä. */
      kuva: {
        osoite: 'assets/kartat/nostot/nosto-antikythera-kone-loistoaika.webp',
        selite: 'Antikytheran kone uutena: puurasia auki, pronssiset '
          + 'hammasrattaat ja kaiverretut kehät esillä pajan pöydällä.',
        lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa',
      },
      /*
       * KAKKOSKUVA on nykytila — se, mitä koneesta on jäljellä.
       * Commonsin imageinfo 28.8.2026: 1036×924, CC BY 2.5, tekijä
       * Marsyas, Restrictions tyhjä, kuvaus "Main Antikythera mechanism
       * fragment (fragment A)". Katsottu silmin: korrodoitunut
       * pronssikappale vitriinissä, iso hammasratas selvästi näkyvissä,
       * ei ihmisiä eikä vesileimaa.
       *
       * EI SAMA KUVA KUIN KARTAN KOHTEELLA (fokuskohteet-grc.js käyttää
       * Zden vitriinikuvaa): kortin nappi vie kohteeseen, ja sama kuva
       * kahdesti peräkkäin näyttäisi siltä, ettei mitään uutta tullut.
       * Fragmentti A näyttää lisäksi juuri sen, mistä lunastus puhuu —
       * hammasrattaat möykyn sisällä.
       */
      valokuva: {
        tiedosto: 'NAMA Machine d\'Anticythère 1.jpg',
        selite: 'Näin se säilyi: mekanismin pääkappale eli fragmentti A, '
          + 'jonka pinnan läpi iso hammasratas erottuu.',
        lahde: 'Marsyas, Wikimedia Commons (CC BY 2.5)',
      },
      kysymykset: [
        'Miten kone löytyi?',
        'Mihin konetta käytettiin?',
        'Miksi mitään vastaavaa ei tunneta tuhanteen vuoteen?',
      ],
      /*
       * PAIKKA ON HYLYN SAARI, EI MUSEO. Juttu tapahtui merenpohjassa
       * Antikytheran edustalla, ja piste kuuluu sinne (osio PISTE SIIHEN
       * KOHTAAN KARTTAA). Museo on lunastuksen toinen kappale, ei jutun
       * tapahtumapaikka — ja Ateenassa on jo tämän poolin Sofia-piste.
       *
       * Luvut ovat SAMAT kuin kartan kohteella `antikythera`
       * (js/packs/fokuskohteet-grc.js): 23,3 E / 35,86667 N,
       * en-Wikipedia "Antikythera" (35°52′N 23°18′E). Sama ankkuri kuin
       * Kastrin kylällä ja Olympoksen huipulla — kohteen ja sen täyn
       * koordinaatit eivät saa ajautua erilleen.
       */
      paikka: {
        nimi: 'Antikythera',
        laudat: {
          maailmankartta: { x: 6610.0, y: 1962.6 },
          europe: { x: 658.6, y: 950.3 },
        },
      },
    },
  ],

  /*
   * ── NELJÄN MAAN POOLIT ASUVAT KAUPUNKIEN PAKETEISSA (v1301) ───────
   *
   * v1297 toi tähän tauluun kymmenen täkynostoa neljään maahan
   * (ESP 3, AUT 2, FRA 2, DEU 3). Kun Madrid, Wien, Pariisi ja
   * Berliini saivat v1301:ssä oman fokusvirtansa, nostot SIIRRETTIIN
   * niiden paketteihin `takynostot`-kentäksi — samalle paikalle, jossa
   * Sofian oma pooli on asunut alusta asti (js/packs/
   * fokusvirta-sofia.js). Sisältö on bitilleen sama: yhtään otsikkoa,
   * lunastusta, lähdettä, kuvaa, kysymystä tai koordinaattia ei
   * muutettu, vain sijainti vaihtui.
   *
   * MIKSI MAAPOOLISSA ON YHÄ RIVI. Kaupungin oma pooli palvelee vain
   * sitä kaupunkia (nostoMaanPooli lukee `fokusvirtaSisalto`), mutta
   * täkypisteet kuuluvat KOKO MAALLE: Espanjassa on laudalla neljä
   * kaupunkia ja Ranskassa kaksi, ja Barcelonan, Sevillan, Granadan ja
   * Marseillen kartalta pisteet katoaisivat, jos taulu vain
   * tyhjennettäisiin. Rivi osoittaa siksi SAMAAN TAULUKKOON eikä sen
   * kopioon — kaksi kopiota ajautuisi erilleen ensimmäisellä
   * korjauksella, yksi jaettu taulukko ei voi ajautua mihinkään.
   *
   * GRC JÄÄ TÄHÄN TIEDOSTOON: Ateenan paketissa ei ole `takynostot`-
   * kenttää, joten Kreikan pooli on yhä maan omaa aineistoa (ks. yllä).
   */
  ESP: FOKUSVIRTA_MADRID.takynostot,
  AUT: FOKUSVIRTA_WIEN.takynostot,
  FRA: FOKUSVIRTA_PARIISI.takynostot,
  DEU: FOKUSVIRTA_BERLIINI.takynostot,
  /*
   * ---------- LOPUTKIN MAAT TAULUUN (aalto 4B, 29.8.2026) ----------
   *
   * Taulussa oli tähän asti viisi maata, vaikka `takynostot`-kenttä oli
   * ehtinyt kertyä kahteenkymmeneenneljään kaupunkipakettiin aalloissa
   * 1–4A. Seuraus näkyi pelaajalle: nostot olivat maan AARREKAUPUNGISSA
   * mutta katosivat heti, kun hän siirtyi saman maan toiseen kaupunkiin
   * — Rooman täky ei näkynyt Firenzessä, Helsingin ei Tampereella,
   * Bergenin ei Oslossa. Rivi per maa korjaa sen, ja Edinburghin
   * paketti pyysi juuri tätä ("jos GBR halutaan joskus yhdeksi
   * pooliksi, se tehdään NOSTO_MAAT-rivillä, ei kopioimalla nostoja").
   *
   * SAMA SÄÄNTÖ KUIN NELJÄLLÄ YLLÄ: rivi osoittaa samaan taulukkoon
   * kuin kaupungin paketti, ei kopioon.
   *
   * KUMPI KAUPUNKI ON MAAN LÄHDE, KUN NIITÄ ON KAKSI: maan
   * AARREKAUPUNKI, kuten neljällä ensimmäiselläkin rivillä. Siksi
   * GBR osoittaa Lontooseen eikä Edinburghiin ja ESP Madridiin eikä
   * Sevillaan. Kaupungin oma pooli voittaa maapoolin joka tapauksessa
   * (nostoMaanPooli lukee `takynostot`-kentän ENSIN), joten Edinburghissa
   * näkyvät yhä Edinburghin neljä ja Sevillassa Sevillan viisi — rivi
   * lisää nostot vain niihin maan kaupunkeihin, joilla ei ole omia.
   *
   * LTU ON UUSI MAA (aalto 4B): Vilna on Liettuan ainoa fokuskaupunki
   * ja sen paketti maan ainoa täkynostojen lähde.
   */
  BGR: FOKUSVIRTA_SOFIA.takynostot,
  BIH: FOKUSVIRTA_SARAJEVO.takynostot,
  CZE: FOKUSVIRTA_PRAHA.takynostot,
  DNK: FOKUSVIRTA_KOBENHAVN.takynostot,
  EST: FOKUSVIRTA_TALLINNA.takynostot,
  FIN: FOKUSVIRTA_HELSINKI.takynostot,
  GBR: FOKUSVIRTA_LONTOO.takynostot,
  HRV: FOKUSVIRTA_DUBROVNIK.takynostot,
  HUN: FOKUSVIRTA_BUDAPEST.takynostot,
  IRL: FOKUSVIRTA_DUBLIN.takynostot,
  ITA: FOKUSVIRTA_ROOMA.takynostot,
  LTU: FOKUSVIRTA_VILNA.takynostot,
  LVA: FOKUSVIRTA_RIIKA.takynostot,
  NLD: FOKUSVIRTA_AMSTERDAM.takynostot,
  NOR: FOKUSVIRTA_BERGEN.takynostot,
  PRT: FOKUSVIRTA_LISSABON.takynostot,
  ROU: FOKUSVIRTA_BUKAREST.takynostot,
  SWE: FOKUSVIRTA_TUKHOLMA.takynostot,
  TUR: FOKUSVIRTA_ISTANBUL.takynostot,
  /*
   * ---------- KOLME UUTTA MAATA (aalto 4C, 30.8.2026) ----------
   *
   * Ukraina, Puola ja Venäjä tulivat peliin vasta tässä aallossa, ja
   * kussakin maassa on kaksi fokuskaupunkia. Täkynostopoolin kirjoitti
   * kummastakin parista TOINEN — Kiova, Krakova ja Pietari — ja nämä
   * kolme riviä tekevät niistä koko maan poolin. Ilman rivejä nostot
   * näkyisivät vain poolin kirjoittaneessa kaupungissa ja katoaisivat
   * heti, kun pelaaja siirtyy Odessaan, Varsovaan tai Moskovaan; juuri
   * se vika korjattiin aallossa 4B lopuilta mailta.
   *
   * KAUPUNGIN OMA POOLI VOITTAA MAAPOOLIN, eikä sääntö riko mitään
   * täällä: nostoMaanPooli lukee kaupungin `takynostot`-kentän ENSIN,
   * ja aallon 4C kuudesta muusta kaupungista yhdelläkään ei ole omaa
   * kenttää (Granada, Moskova, Odessa ja Varsova nojaavat maapooliin).
   * Granadan maa ESP osoittaa yhä Madridiin, kuten ennenkin.
   *
   * TUNNUSTEN TÖRMÄYSTÄ EI OLE: kolmen uuden poolin yhdeksän nostoa
   * tarkistettiin tunnuksittain koko taulua vasten integroinnissa.
   */
  UKR: FOKUSVIRTA_KIOVA.takynostot,
  POL: FOKUSVIRTA_KRAKOVA.takynostot,
  RUS: FOKUSVIRTA_PIETARI.takynostot,
};

/* ==================== LUETUT LAITTEEN MUISTIIN ==================== */

const NOSTO_AVAIN = 'matkakirja-takynostot-luetut';

/** Luettujen nostojen tunnukset. Rikki mennyt muisti on tyhjä muisti. */
function nostoLuetut() {
  try {
    const raaka = localStorage.getItem(NOSTO_AVAIN);
    const lista = raaka ? JSON.parse(raaka) : [];
    return new Set(Array.isArray(lista) ? lista.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

/** Merkitsee noston luetuksi. Epäonnistunut kirjoitus ei kaada mitään. */
function nostoMerkitseLuetuksi(id) {
  try {
    const luetut = nostoLuetut();
    if (luetut.has(id)) return;
    luetut.add(id);
    localStorage.setItem(NOSTO_AVAIN, JSON.stringify([...luetut]));
  } catch {
    /* Yksityinen selaus tai täysi kiintiö: nosto nousee uudestaan. */
  }
}

/* ==================== TYYLI ==================== */

const NOSTO_TYYLIN_TUNNUS = 'fokusnosto-tyyli';

/**
 * Oma tyylitiedosto sivulle, jos sitä ei vielä ole. Sama kaava ja sama
 * syy kuin fokusvirralla ja fokuskohteilla: css/styles.css on toisen
 * työvaiheen hallussa. Yhden tiedoston versiossa erillistä linkkiä ei
 * ole, koska tyylit ovat jo sivun <style>-lohkossa.
 */
function nostoLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTO_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTO_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('fokusnosto.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/* ==================== MIKÄ NOSTO NOUSEE ==================== */

/** Miniatyyrin ja kortin kuvan pyyntöleveydet pikseleinä. */
const NOSTO_MINI_PX = 160;
const NOSTO_KUVA_PX = 800;

/**
 * MINKÄ MAAN POOLI ON JUURI NYT VOIMASSA?
 *
 * Maa luetaan laudan omasta taulusta, samalla päättelyllä kuin kartan
 * kohteilla (js/fokuskohteet.js nykyisenMaanKohteet) — yksi totuus,
 * ei toista tulkintaa siitä, minkä maan sisältöä ruudulla on.
 */
/**
 * Lunastus yhdeksi tekstiksi: merkkijono kelpaa sellaisenaan, taulukko
 * liitetään kappalerajalla (tyhjä rivi), jonka ladonta tunnistaa.
 */
function nostonLunastusteksti(lunastus) {
  if (Array.isArray(lunastus)) {
    return lunastus.map((k) => String(k ?? '').trim()).filter(Boolean).join('\n\n');
  }
  return lunastus;
}

function nostoMaanPooli(ui, city) {
  /*
   * Kaupungin oma pooli packista ensin (Sofia 25.8.2026: kenttä
   * `takynostot` js/packs/fokusvirta-sofia.js:ssä käyttää lunastus-
   * nimeä tekstille) — näin uusi maa ei vaadi riviä tähän tiedostoon.
   * NOSTO_MAAT on sen MAAKOHTAINEN vastine: pooli, joka näkyy maan
   * KAIKISSA kaupungeissa. Kreikan pooli on siellä omana aineistonaan;
   * Espanja, Itävalta, Ranska ja Saksa osoittavat v1301:stä lähtien
   * samaan taulukkoon kuin aarrekaupunkinsa paketti, joten pelaaja
   * näkee samat täyt riippumatta siitä, kummasta lähteestä ne luetaan.
   *
   * PACKIN POOLI SAA SAMAT KENTÄT: valinnainen `paikka` (pisteen
   * paikka kartalla) kulkee levityksen mukana sellaisenaan, joten
   * kentän lisääminen pakettiin ei vaadi riviä tänne. Vanha
   * `symboli`-kenttä säilyy datassa, mutta kartalla sitä ei enää lueta
   * (ks. nostonMerkinta).
   *
   * LUNASTUS SAA OLLA KAPPALEIDEN TAULUKKO (omistajan päätös
   * 28.8.2026: *"Lisäksi vähän enemmän juttua"*). Kortin ladonta jakaa
   * tekstin kappaleiksi tyhjän rivin kohdalta (jaaKappaleiksi), joten
   * taulukko liitetään yhteen juuri sillä erottimella — yksi muoto
   * eteenpäin, ei toista haaraa ladontaan.
   */
  const oma = fokusvirtaSisalto(ui, city)?.takynostot;
  if (Array.isArray(oma) && oma.length) return nostoLevitaLunastus(oma);
  const taulu = ui?.game?.pack?.map?.cityCountry;
  const iso = (taulu && city && taulu[city.id]) || null;
  const pooli = iso ? NOSTO_MAAT[iso] : null;
  return (Array.isArray(pooli) && pooli.length) ? nostoLevitaLunastus(pooli) : null;
}

/**
 * SAMA MUOTO MOLEMMISTA LÄHTEISTÄ: `lunastus` (merkkijono tai
 * kappaleiden taulukko) puretaan `teksti`-kentäksi, jonka ladonta
 * osaa jakaa kappaleiksi.
 *
 * Levitys koski 28.8.2026 asti vain pakettien poolia, koska maapooli
 * (NOSTO_MAAT) oli pelkkää Kreikkaa ja kirjoitettu suoraan
 * `teksti`-kenttään. Espanjan, Itävallan, Ranskan ja Saksan pooleissa
 * lunastus on Sofian pilotin mukaisesti KAHTENA KAPPALEENA, ja kahta
 * eri datamuotoa samalle asialle ei kannata pitää yllä: sama levitys
 * ajetaan siksi kummallekin lähteelle. Valmis `teksti` voittaa yhä,
 * joten Kreikan rivit kulkevat läpi koskemattomina.
 */
function nostoLevitaLunastus(pooli) {
  return pooli.map((n) => (n.teksti ? n : { ...n, teksti: nostonLunastusteksti(n.lunastus) }));
}

/**
 * MAAN POOLI, KUN NOSTOT SAAVAT NÄKYÄ.
 *
 * Kaksi ehtoa (samat kuin ennen yhtenäistä kohdemallia): fokusmoodi on
 * päällä ja pelaaja on ihminen. Aarre, lehtilukko tai lukeminen eivät
 * vaikuta — nostot ovat kartan pysyviä kohteita, jotka aukeavat heti
 * ja uudelleen, kuten muutkin kohteet (omistajan linjaus 28.8.2026:
 * *"Täkyt voisi olla aina näkyvissä"* — ja luetut pysyvät kartalla).
 */
function nostoPooli(ui) {
  if (typeof document === 'undefined') return [];
  if (!ui || ui.dead || ui.katselu) return [];
  const city = ui.game?.cityOf?.();
  if (!city || !ui.game || ui.game.player?.isBot) return [];
  if (!fokusmoodiPaalla()) return [];
  return nostoMaanPooli(ui, city) ?? [];
}

/* ==================== PAIKKA LAUDALLA ==================== */

/**
 * NOSTON PAIKKA TÄLLÄ LAUDALLA, tai null.
 *
 * Kenttä on valinnainen ja se annetaan kahdessa muodossa: `paikka.laudat`
 * (eri koordinaatit maailmankartalle ja maanosalaudalle, kuten
 * kohtaamispisteellä ja kartan kohteilla) tai suoraan `{x, y}`, jos
 * paketti palvelee vain yhtä lautaa.
 *
 * VARAPAIKKA ON KAUPUNKI (27.8.2026 ilta): kaupunki on maan oikea
 * osoite silloinkin, kun jutun tarkkoja koordinaatteja ei ole
 * laskettu. PÄÄLLEKKÄISYYS EI JÄÄ TÄHÄN: kaupungin laatan päälle
 * osuvat merkit siirtää katkoviivan päähän sama kasauspassi kuin
 * muillakin kohdemerkeillä (js/fokusniput.js).
 *
 * Ilman kaupunkiakin (katselutila, laudan vaihto) palautuu null, ja
 * silloin nosto jää tältä laudalta pois.
 */
function nostonPaikka(ui, nosto) {
  const paikka = nosto?.paikka;
  const lauta = ui?.game?.pack?.id;
  const koordit = paikka ? (paikka.laudat ? paikka.laudat[lauta] : paikka) : null;
  if (Number.isFinite(koordit?.x) && Number.isFinite(koordit?.y)) {
    return { x: koordit.x, y: koordit.y, nimi: paikka.nimi ?? null };
  }
  const city = ui?.game?.cityOf?.();
  if (Number.isFinite(city?.x) && Number.isFinite(city?.y)) {
    return { x: city.x, y: city.y, nimi: city.name ?? null };
  }
  return null;
}

/* ==================== NOSTOT KARTAN KOHTEINA ==================== */

/**
 * NOSTOT KOHDEKERROKSEN LISÄKOHTEIKSI (YHTENÄINEN KOHDEMALLI, ks.
 * tiedoston alku). Kutsutaan kohteiden piirrosta rekisteröitynä
 * lähteenä (js/fokuskohteet.js nykyisenMaanKohteet), joten nostot
 * saavat saman erottelun, kasauspassin, nimiöväistön ja aihevalon
 * kuin kaikki muutkin kohteet — eikä js/ui.js:ään tarvita riviä.
 *
 * NOSTO JOLLA ON KOHDE EI LUO OMAA MERKKIÄ (Raamatun sääntö): sen
 * tarina aukeaa kohteen tietoruudusta (nostoKohteelle alla).
 *
 * AIHESYMBOLI on noston oma `symboli`-kenttä; ilman kelvollista
 * kenttää merkki on huutomerkki — skandaali ja uskomaton tositarina
 * on poolin peruslaji (Raamattu, KEVYT KULKU -KOKEILU).
 */
function nostoLisakohteet(ui) {
  const rivit = [];
  for (const nosto of nostoPooli(ui)) {
    if (nosto.kohde) continue;
    const paikka = nostonPaikka(ui, nosto);
    if (!paikka) continue;
    rivit.push({
      kohde: {
        id: `nosto-${nosto.id}`,
        nimi: nosto.nimio ?? paikka.nimi ?? nosto.otsikko,
        nimio: nosto.nimio ?? paikka.nimi ?? null,
        tyyppi: 'nosto',
        symboli: NOSTOSYM_TYYPIT.has(nosto.symboli) ? nosto.symboli : 'huuto',
        avaa: (kaytto) => avaaNosto(kaytto ?? ui, nosto),
      },
      paikka: { x: paikka.x, y: paikka.y },
    });
  }
  return rivit;
}

/**
 * KOHTEESEEN KIINNITETTY NOSTO — kohteen tietoruudun Livian
 * leikekirja -nappia varten (js/fokuskohteet.js piirraKohteenNosto).
 */
function nostoKohteelle(ui, kohdeId) {
  const nosto = nostoPooli(ui).find((n) => n.kohde === kohdeId) ?? null;
  if (!nosto) return null;
  return { otsikko: nosto.otsikko, avaa: (kaytto) => avaaNosto(kaytto ?? ui, nosto) };
}

/**
 * NOSTO AUKI — sama työ tultiinpa kartan merkistä tai kohteen
 * tietoruudun napista. Luetuksi merkintä on laitteen muistia (ks.
 * tiedoston alku); kortti aukeaa aina, myös luettuna.
 */
function avaaNosto(ui, nosto) {
  if (!nosto) return;
  sfx.play('paper');
  nostoMerkitseLuetuksi(nosto.id);
  avaaNostonKortti(ui, nosto);
}

/* ==================== LUNASTUSKORTTI ==================== */

/**
 * NOSTON OMA KORTTI — tässä otsikon lupaus lunastetaan.
 *
 * Kortti on kartan päällä kelluva paperi, ei koko ruudun modaali: sama
 * sääntö kuin fokusvirran kortilla — kartta on näkymä, teksti on annos
 * sen päällä. Napautus kortin ulkopuolelle tai Esc sulkee, ja
 * sulkemisen jälkeen poolin seuraava nosto saa nousta.
 */
function avaaNostonKortti(ui, nosto) {
  nostoLataaTyyli();
  suljeNostonKortti(ui);

  const kerros = html('div', 'fokusnosto-kerros');
  const kortti = html('div', 'fokusnosto-kortti');
  kortti.setAttribute('role', 'dialog');
  kortti.setAttribute('aria-modal', 'false');
  kortti.setAttribute('aria-label', nosto.otsikko);

  const sulje = html('button', 'fokusnosto-kortti-sulje', '✕');
  sulje.type = 'button';
  sulje.title = 'Sulje';
  sulje.setAttribute('aria-label', 'Sulje');
  kortti.appendChild(sulje);

  const sisalto = html('div', 'fokusnosto-sisalto');
  // Ylärivi on kohdemallin yhteinen: aihesymboli ja luokan nimi —
  // sama rivi kuin kartan kohdekortissa ja eläintäyllä (YHTENÄINEN
  // KOHDEMALLI: erot ovat sisällön laajuus ja aihesymboli).
  sisalto.appendChild(nostosymKortinYlarivi(
    NOSTOSYM_TYYPIT.has(nosto.symboli) ? nosto.symboli : 'huuto', 'fokusnosto-ylarivi',
  ));
  sisalto.appendChild(html('h3', 'fokusnosto-kortti-otsikko', nosto.otsikko));
  if (nosto.kuva) piirraNostonKuva(ui, sisalto, nosto.kuva);
  const teksti = html('div', 'fokusnosto-teksti');
  for (const kappale of jaaKappaleiksi(nosto.teksti)) {
    teksti.appendChild(html('p', '', kappale));
  }
  sisalto.appendChild(teksti);
  if (nosto.valokuva) piirraNostonValokuva(ui, sisalto, nosto.valokuva);
  if (nosto.lahde) sisalto.appendChild(html('p', 'fokusnosto-lahde', nosto.lahde));
  // Karttaliite tulee jutun JÄLKEEN, myös lähderivin jälkeen: se ei ole
  // jutun kuvitusta vaan erillinen arkki jutun välissä (ks.
  // piirraNostonKarttaliite).
  if (nosto.kartta) piirraNostonKarttaliite(ui, sisalto, nosto.kartta);

  /*
   * KOHDENAPPI, KUN KARTALLA ON SAMA PAIKKA. Nosto *"houkuttelee
   * kohteen auki"* (omistajan tilaus), ja kun kohteella on jo oma
   * karttamerkki, sinne mennään pelin omalla tietoruudulla eikä uudella
   * pinnalla. Kortti sulkeutuu samalla: kaksi korttia päällekkäin olisi
   * juuri sitä raskautta, jota kevyt kulku purkaa.
   */
  const kohde = nostonKarttakohde(ui, nosto);
  if (kohde) {
    const nappi = html('button', 'fokusnosto-kohdenappi', `Katso ${kohde.nimi} kartalla`);
    nappi.type = 'button';
    nappi.addEventListener('click', () => {
      suljeNostonKortti(ui);
      avaaFokuskohde(ui, kohde);
    });
    sisalto.appendChild(nappi);
  }

  piirraNostonKysymykset(ui, sisalto, nosto);

  kortti.appendChild(sisalto);
  kerros.appendChild(kortti);
  document.body.appendChild(kerros);

  const kiinni = () => {
    sfx.play('paper');
    suljeNostonKortti(ui);
  };
  sulje.addEventListener('click', kiinni);
  /*
   * Napautus kortin ULKOPUOLELLE sulkee; kortin päällä se ei tee mitään,
   * jotta tekstiä voi valita ja nappeja painaa.
   *
   * Sulkeva napautus jää tähän kerrokseen: kerros katoaa jo
   * pointerdownissa, ja ilman nielua selain etsisi saman napautuksen
   * click-kohteen vasta sormen noustessa — kartalta kerroksen alta
   * (sama vuoto kuin pöllön kuplissa, ks. ui-apurit
   * nielaiseSulkevaNapautus).
   */
  kerros.addEventListener('pointerdown', (tapahtuma) => {
    if (tapahtuma.target?.closest?.('.fokusnosto-kortti')) return;
    nielaiseSulkevaNapautus(tapahtuma);
    kiinni();
  });
  const nappain = (tapahtuma) => {
    if (tapahtuma.key !== 'Escape') return;
    /*
     * KARTTALIITTEEN SUURENNOS SULKEUTUU ENSIN. Kortin kuuntelija on
     * rekisteröity ennen suurennoksen omaa (js/fokuskohteet.js
     * avaaKohdeSuurennos) ja ehtisi siis ensin — ja Escape sulkisi koko
     * kortin suurennoksen alta. Sama väistösääntö on kartan
     * tietoruudulla (kuunteleKohdetta).
     */
    if (ui?.fokusnostoZoom) return;
    tapahtuma.stopPropagation();
    suljeNostonKortti(ui);
  };
  document.addEventListener('keydown', nappain, true);

  ui.fokusnostoKortti = {
    kerros,
    purku: () => document.removeEventListener('keydown', nappain, true),
  };
  void kerros.offsetWidth;
  kerros.classList.add('fokusnosto-kortti-auki');
  sfx.play('paper');
}

/**
 * KOHDE KARTALLA — vain jos sinne oikeasti pääsee juuri nyt.
 *
 * Tietoruutu asemoidaan kohteen karttamerkin viereen (js/fokuskohteet.js
 * asetaKohteenPaikka), joten ilman merkkiä se jäisi ruudun nurkkaan
 * ilman ankkuria. Merkit myös SAMMUVAT, kun fokuslehti ei täytä riittävää
 * osaa näkymästä, ja silloin niiden kerros sulkee avatun ruudun heti.
 * Kummassakin tapauksessa nappi jää pois eikä lupaa mitään, mitä
 * napautus ei tekisi.
 *
 * VAIN DATAN OMA `kohde` (omistajan päätös 28.8.2026). Nappi luki
 * tuikkivan pisteen aikaan myös sitä kohdemerkkiä, jonka päällä piste
 * sattui olemaan — ja lähin naapuri oli usein aivan toinen asia:
 * Sofian areenakortti tarjosi *"Katso Sofian moskeijat kartalla"*.
 * Nappi lupasi jutun kohteen ja vei muualle, mikä on juuri se
 * klikkihuijaus, jota tämän kortin ensimmäinen sääntö kieltää.
 */
function nostonKarttakohde(ui, nosto) {
  const tunnus = nosto?.kohde ?? null;
  if (!tunnus) return null;
  if (!ui?.fokuskohdeMerkit?.get(tunnus)?.length) return null;
  if (ui.fokuskohdeKerros?.classList?.contains('fokuskohteet-piilossa')) return null;
  // Nykyisen maan taulu ensin (js/fokuskohteet.js): se palvelee kaikkia
  // maita, kun taas suora tuonti tuntee vain Kreikan kohteet.
  return ui.fokuskohdeTiedot?.get(tunnus) ?? fokuskohteet([tunnus])[0] ?? null;
}

/** Kortti pois ja kuuntelijat puretaan. */
export function suljeNostonKortti(ui) {
  const auki = ui?.fokusnostoKortti;
  if (ui) ui.fokusnostoKortti = null;
  auki?.purku?.();
  // Karttaliitteen suurennos on kortin oma jatke (ks.
  // piirraNostonKarttaliite): ilman tätä se jäisi kellumaan tyhjän
  // kartan päälle, kun kortti sen alta katoaa.
  suljeKohdeSuurennos(ui, 'fokusnostoZoom');
  if (typeof document !== 'undefined') {
    for (const vanha of document.querySelectorAll('.fokusnosto-kerros')) vanha.remove();
  }
}

/**
 * KAKSI KUVALÄHDETTÄ, KAKSI PORRASTA (sama jako kuin kartan kohteilla,
 * js/fokuskohteet.js asetaKohdeKuva).
 *
 * `tiedosto` on Commons-nimi ja kulkee median asettajan läpi, joka
 * uusii pyynnön ennen kuin luovuttaa — oikea sääntö yskähtävälle
 * palvelimelle. `osoite` on repon oma generoitu havainnekuva
 * (assets/kartat/nostot/), jolla ei ole varareittiä: se joko on tai ei
 * ole, joten uusinta vain jättäisi kortille tyhjän kehyksen.
 */
function asetaNostonKuva(img, kuva, leveys, onVirhe) {
  if (kuva.osoite) {
    img.addEventListener('error', () => onVirhe(), { once: true });
    img.src = kuva.osoite;
    return;
  }
  asetaKuva(img, valokuvaUrl(kuva.tiedosto, leveys),
    valokuvaVara(kuva.tiedosto, leveys), onVirhe);
}

/**
 * Kortin kuva selitteineen ja lähteineen (CC BY vaatii tekijän).
 *
 * NAPAUTUS SUURENTAA (omistajan raportti 30.8.2026: *"kaikkia popup
 * kuvia ei saa klikattua koko näytölle, korjaa"*). Sama suurennos kuin
 * karttaliitteellä (js/fokuskohteet.js avaaKohdeSuurennos) ja sama
 * ui-avain `fokusnostoZoom`: kortin Esc-väistö (avaaNostonKortti) ja
 * sulkusiivous (suljeNostonKortti) kattavat sen valmiiksi, eikä
 * uutta elinkaarta synny.
 */
export function piirraNostonKuva(
  ui, kohde, kuva, luokka = 'fokusnosto-kuva', leveys = NOSTO_KUVA_PX,
  zoomAvain = 'fokusnostoZoom',
) {
  const kehys = html('figure', luokka);
  const nappi = html('button', 'fokusnosto-kuvanappi');
  nappi.type = 'button';
  nappi.title = 'Katso kuva suurempana';
  nappi.setAttribute('aria-label', `${kuva.selite ?? 'Kuva'} — avaa suurena`);
  const img = document.createElement('img');
  img.alt = kuva.selite ?? '';
  img.decoding = 'async';
  img.draggable = false;
  const piilota = () => { kehys.hidden = true; };
  asetaNostonKuva(img, kuva, leveys, piilota);
  nappi.appendChild(img);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    // Suurennoksen ui-avain on kutsujan (syvennystarinan kortti antaa
    // omansa), jotta kunkin kortin sulkusiivous osuu omaan kuvaansa.
    avaaKohdeSuurennos(ui, kuva, () => nappi, zoomAvain);
  });
  kehys.appendChild(nappi);
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.append(
    html('span', 'fokusnosto-kuvaselite', kuva.selite ?? ''),
    html('span', 'fokusnosto-kuvalahde', kuva.lahde ?? ''),
  );
  kehys.appendChild(teksti);
  kohde.appendChild(kehys);
}

/**
 * KAKKOSKUVA TEKSTIN ALLE — "näin se löytyi" (omistajan päätös
 * 28.8.2026).
 *
 * Pääkuva on nyt loistoaikahavainnekuva, joka kertoo mitä paikassa
 * TAPAHTUI; nykytilan valokuva on todiste siitä, mitä siitä on jäljellä,
 * ja se kuuluu vasta jutun jälkeen ja pienempänä. Sama kehys ja sama
 * kuvateksti kuin pääkuvalla, joten CC-attribuutio kulkee mukana
 * sellaisenaan — lisenssiehto ei jousta koon mukaan.
 */
function piirraNostonValokuva(ui, kohde, kuva) {
  piirraNostonKuva(ui, kohde, kuva, 'fokusnosto-kuva fokusnosto-valokuva', NOSTO_MINI_PX * 3);
}

/**
 * ISOISÄN KARTTALIITE — KOLMAS KUVA, JOKA EI OLE KUVITUSTA.
 *
 * Raamattu (osio "Fokusmoodi", ISOISÄN KARTTALIITE, omistajan linjaus
 * 29.8.2026) antaa kolmelle kuvatyypille eri roolin: valokuva on
 * nykyhetki, loistoaikakuva on mennyt elävänä ja KAIVERRUSKARTTA on
 * paikka sellaisena kuin isoisä sen tunsi. Liite on siis oma
 * sisältölajinsa, ja siksi se saa oman otsakkeensa ja oman kehyksensä
 * eikä latoudu kolmanneksi kuvaksi jutun sekaan: fiktio on, että arkki
 * on TAITETTU MATKAKIRJAN VÄLIIN, ja se luetaan jutun jälkeen kuten
 * liite luetaan.
 *
 * NAPAUTUS SUURENTAA. Kartta on ainoa kortin kuvista, jota oikeasti
 * LUETAAN: 1400 pikselin arkki kortin leveydellä on harmaa laatta,
 * kunnes sen avaa isoksi. Suurennos on kartan kohteiden oma
 * (js/fokuskohteet.js avaaKohdeSuurennos) eikä uusi kopio — se osaa jo
 * repon oman `osoite`-kuvan, kasvaa ankkuristaan ja kantaa selitteen ja
 * lähderivin mukanaan.
 *
 * VIRHE VIE KOKO LIITTEEN. Puuttuva tiedosto jättäisi muuten otsakkeen
 * ja tyhjän kehyksen lupaamaan liitettä, jota ei ole.
 */
function piirraNostonKarttaliite(ui, kohde, kartta) {
  const liite = html('div', 'fokusnosto-liite');
  liite.appendChild(html('p', 'fokusnosto-liite-otsake', 'Isoisän matkakirjan liite'));
  const kehys = html('figure', 'fokusnosto-liitekehys');
  const nappi = html('button', 'fokusnosto-liitenappi');
  nappi.type = 'button';
  nappi.title = 'Avaa kartta suurena';
  nappi.setAttribute('aria-label', `${kartta.selite ?? 'Kartta'} — avaa suurena`);
  const img = document.createElement('img');
  img.className = 'fokusnosto-liitekuva';
  img.alt = kartta.selite ?? '';
  img.decoding = 'async';
  img.draggable = false;
  asetaNostonKuva(img, kartta, NOSTO_KUVA_PX, () => liite.remove());
  nappi.appendChild(img);
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    /*
     * OMA UI-KENTTÄ, EI TIETORUUDUN. Kohdekerroksen näkyvyysvahti
     * sulkee `ui.fokuskohdeZoom`-suurennoksen joka piirrossa, kun
     * kerros on piilossa — ja täkynoston kortti on auki juuri silloin.
     * Ks. js/fokuskohteet.js avaaKohdeSuurennos, kohta ELINKAARI.
     */
    avaaKohdeSuurennos(ui, kartta, () => nappi, 'fokusnostoZoom');
  });
  kehys.appendChild(nappi);
  // Sama kuvatekstipari kuin muillakin kortin kuvilla: selite ja lähde
  // samalla rivillä (v1040), jotta PD/CC-merkintä kulkee aina mukana.
  const teksti = html('figcaption', 'fokusnosto-kuvateksti');
  teksti.append(
    html('span', 'fokusnosto-kuvaselite', kartta.selite ?? ''),
    html('span', 'fokusnosto-kuvalahde', kartta.lahde ?? ''),
  );
  kehys.appendChild(teksti);
  liite.appendChild(kehys);
  kohde.appendChild(liite);
}

/**
 * VALMIIT KYSYMYKSET PULULLE kortin alaosaan (omistajan päätös
 * 28.8.2026: *"muutama valmis kysymys Pululle jatko jutustelua
 * varten"*).
 *
 * NAPAUTUS SULKEE KORTIN. Kartan kohdetietoruutu jättää itsensä auki
 * chatin viereen (js/fokuskohteet.js kysyKohteesta), mutta täkynoston
 * kortti on kartan keskellä kelluva paperi eikä väistä paneelia —
 * lukeminen on tässä kohtaa jo tehty, ja keskustelu jatkuu chatissa.
 *
 * KYSYMYS MENEE UUTENA AIHEENA (js/pollo.js polloKysy) eikä
 * jatkokysymyksenä: pelaaja aloittaa uuden puheenaiheen, ei jatka
 * edellistä vastausta. Reitti on sama kuin pelaajan itse
 * kirjoittamalla kysymyksellä, eikä se riipu chatin omien
 * avausvalmiskysymysten lipusta.
 */
function piirraNostonKysymykset(ui, sisalto, nosto) {
  const kysymykset = (Array.isArray(nosto.kysymykset) ? nosto.kysymykset : [])
    .map((k) => String(k ?? '').trim()).filter(Boolean).slice(0, 3);
  if (!kysymykset.length) return;
  // Sama nimilappuvitsi kuin kartan kohdekortissa (omistaja 27.8.2026):
  // "Kysy pöllöltä pululta:", pöllöltä yli vedettynä.
  sisalto.appendChild(polloNimilappu(html('p', 'fokusnosto-kysy-otsikko'), {
    ennen: 'Kysy ', yli: 'pöllöltä', tilalle: 'pululta', jalkeen: ':',
  }));
  const rivi = html('div', 'fokusnosto-kysymykset');
  rivi.setAttribute('role', 'group');
  rivi.setAttribute('aria-label', `Kysy pululta: ${nosto.otsikko}`);
  for (const kysymys of kysymykset) {
    const nappi = html('button', 'fokusnosto-kysymys', kysymys);
    nappi.type = 'button';
    nappi.addEventListener('click', (tapahtuma) => {
      tapahtuma.stopPropagation();
      suljeNostonKortti(ui);
      polloKysy(kysymys);
    });
    rivi.appendChild(nappi);
  }
  sisalto.appendChild(rivi);
}

/* ==================== KYTKENTÄ ==================== */

/**
 * KYTKENTÄKOHTA js/main.js:ssä.
 *
 * Kutsu rekisteröi nostot kohdekerroksen lisäkohteiksi ja kohteisiin
 * kiinnitetyt nostot tietoruudun napiksi (js/fokuskohteet.js) — siitä
 * eteenpäin nostot elävät kohteiden piirtotahdissa ilman uutta riviä
 * js/ui.js:ssä.
 *
 * MIKSI ERILLINEN KUTSU EIKÄ SIVUVAIKUTUS MODUULIN LATAUKSESSA:
 * niputuksen vartija (tools/tarkista-niputus.mjs) vaatii, että jokainen
 * listattu moduuli on jonkin toisen listatun moduulin STAATTISESTI
 * tuoma — pelkkä `import './fokusnosto.js';` ei näy sille tuontina.
 * Nimetty kutsu on samalla luettava: käynnistystiedostosta näkee, että
 * täkynosto on osa peliä.
 */
export function kytkeFokusnosto() {
  rekisteroiLisakohteet(nostoLisakohteet);
  asetaKohdeNostot(nostoKohteelle);
}

/**
 * Laudan vaihto tai uusi peli: kortti pois.
 *
 * Kartan tietoruutu suljetaan samalla, koska nosto on voinut avata sen:
 * uuden laudan päälle jäänyt Delfoin kortti olisi merkintä kartasta,
 * jota ei enää ole. Merkit siivoaa kohdekerros itse
 * (js/fokuskohteet.js nollaaFokuskohteet).
 */
export function nollaaFokusnosto(ui) {
  if (ui) {
    ui.fokusnostoKortti?.purku?.();
    ui.fokusnostoKortti = null;
  }
  suljeNostonKortti(ui);
  suljeFokuskohde(ui);
}
