/*
 * Kaupunkisivun kohdekartan piirtäjä (omistajan toive 7.8.2026):
 * "pelkkä ydinkeskusta ... niin että hahmottaa hieman katuja",
 * malliksi näytetty Mapiful-juliste — yksinkertaistettu, taiteellinen
 * katuverkko ilman nimiä.
 *
 * Mapiful piirtää julisteensa OpenStreetMap-aineistosta, ja sama
 * tehdään tässä itse: Overpass-rajapinnasta haetaan ydinkeskustan
 * kadut, vedet, puistot ja radat, ja niistä piirretään SVG pelin
 * paperi- ja mustesävyin. SVG rasteroidaan PNG:ksi pelin omalla
 * Chromiumilla (sama kuin Playwright-tarkistuksissa) ja tallennetaan
 * assets/kartat/-kansioon — kartta toimii siis myös ilman verkkoa
 * eikä riipu Commonsin tiedostoista.
 *
 * Käyttö:  node tools/piirra-kaupunkikartta.mjs berliini
 *          node tools/piirra-kaupunkikartta.mjs berliini --vari
 *            → pelin värinäkymä (maakartat.js: varikartta-kenttä,
 *              sw.js:n SHELL). Paletti hyväksytty 15.8.2026.
 * Tuloste: assets/kartat/<kaupunki>-keskusta.png ja rajat-lohko,
 *          joka liitetään js/packs/maakartat.js:n KAUPUNKIKARTAT-
 *          tauluun (pisteet asemoidaan siitä prosentteina).
 *
 * Uusi kaupunki: lisää KAUPUNGIT-tauluun rajaus, joka kattaa vain
 * ydinkeskustan kuuluisimmat kohteet (n. 5–8 km leveä alue — laajempi
 * muuttuu puuroksi). Aja työkalu ja KATSO kuva silmin ennen käyttöä.
 *
 * KARTTA JATKUU REUNOJEN YLI (omistajan tilaus 15.8.2026: "sitä voisi
 * lisätä piirroksessa että kartta jatkuisi pidemmälle"). Kaupungille
 * annetaan `laajennus`, ja työkalu piirtää sen verran laajemman alueen
 * samasta keskipisteestä. Lehti näyttää lepotilassa yhä pelkän
 * `rajat`-alueen; reunus paljastuu vasta zoomatessa ja panoroitaessa
 * (js/packs/maakartat.js: piirtoRajat ja ydinAla, ui.js: kartta-lava).
 *
 * KUVAN LEVEYS KASVAA SAMASSA SUHTEESSA (1600 → 1600 × laajennus), ja
 * se on tarkoituksellista eikä sattumaa. Ydinrajaus säilyy silloin
 * 1600 pikselinä, eli lepotilan terävyys ja viivojen paksuus ovat
 * täsmälleen entiset — muuten reunuksen hinta olisi suttuisempi
 * ydinkuva, ja zoomin yläraja (SUURIN = 3, ui.js) näyttäisi selaimen
 * venytystä kuvan omien pikselien sijaan.
 *
 * KATSO MYÖS VASEN ALAKULMA. Lehti piirtää sinne mittakaavajanan
 * (ui.js), eikä työkalu tiedä siitä mitään. Kööpenhaminassa Tivolin
 * numeroympyrä osui janan päälle, ja se korjattiin laskemalla
 * rajauksen eteläreunaa. Kuva kannattaa siis katsoa lehdessä eikä
 * vain tiedostona.
 *
 * TARKISTA PISTEET VIELÄ ERIKSEEN:
 *   node tools/tarkista-karttapisteet.mjs <kaupunki>
 * Se lukee valmiista PNG:stä pikselin värin jokaisesta kohteesta ja
 * kertoo, osuuko piste veteen. Silmällä sitä ei näe, koska
 * numeroympyrä peittää juuri sen kohdan: Dubain kartassa kaksi
 * kuudesta oli lahdelmassa. Sillat ja majakat saavat olla vedellä,
 * muut eivät.
 *
 * Lisenssi: OpenStreetMapin aineisto on ODbL — lähderiviksi peliin
 * "© OpenStreetMap-tekijät (ODbL)". Tyyli on pelin oma.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Ydinkeskustojen rajaukset. Rajat asteina (WGS84). */
const KAUPUNGIT = {
  berliini: {
    // Mitte Tiergartenista East Side Gallerylle; kaikki kuusi
    // kohdetta (valtiopäivätalo, portti, Museumsinsel, tv-torni,
    // Checkpoint Charlie, East Side Gallery) osuvat alueelle.
    //
    // RAJAUS LEVENI NELJÄNNEKSELLÄ 15.8.2026 (omistajan tilaus:
    // "voisi jatkua hieman nykyistä laajemmalle alueelle"). Vanha
    // rajaus oli 8,1 × 6,1 km, uusi on 10,2 × 7,7 km — keskipiste on
    // sama, joten kuvasuhde ja kohteiden keskinäiset paikat säilyvät.
    // Laajennus on mahdollinen vain siksi, että kohdekartta on nyt
    // zoomattava (ui.js, kartta-lava): ilman zoomia tämä olisi juuri
    // sitä katupuuroa, josta yllä varoitetaan.
    //
    // JA KARTTA JATKUU VIELÄ TÄMÄNKIN YLI (omistajan tilaus
    // 15.8.2026): piirretty alue on 1,6-kertainen eli 16,3 × 12,3 km,
    // mutta lepotilassa lehti näyttää yhä tarkalleen alla olevan
    // rajat-alueen. Reunuksella on Tiergartenin länsipää,
    // Prenzlauer Bergin eteläkulma ja Kreuzbergin katuverkko —
    // aluetta, jonne panorointi jatkuu, kun karttaa suurentaa.
    rajat: { pohjoinen: 52.547, etela: 52.478, lansi: 13.325, ita: 13.475 },
    laajennus: 1.6,
  },
  kairo: {
    // Niilin molemmat rannat Tahrir-aukiolta Islamilaiseen Kairoon:
    // Geziran saari lännessä, Khan el-Khalilin kujat ja sitadelli
    // idässä. Ensimmäinen rajaus jätti Niilin kuvan vasempaan reunaan
    // ja kohteet alalaitaan — tämä keskittää joen ja kohteet.
    // Pyramidit jäävät ulkopuolelle: ne ovat 15 km lännessä eivätkä
    // mahdu ydinkeskustaan ilman että kartta muuttuu puuroksi.
    rajat: { pohjoinen: 30.068, etela: 30.018, lansi: 31.198, ita: 31.278 },
  },
  madrid: {
    // Kuninkaanlinnalta Retiron puistoon, Gran Vían pohjoispuolelta
    // Atochan asemalle. Kaikki kuusi kohdetta (linna, Plaza Mayor,
    // Puerta del Sol, Cibeles, Prado, Alcalán portti) osuvat alueelle,
    // ja Retiron puisto tuo itälaitaan ison vihreän vastapainon
    // ruutukaavalle.
    rajat: { pohjoinen: 40.43, etela: 40.406, lansi: -3.72, ita: -3.675 },
  },
  tukholma: {
    // Kaupungintalolta Skansenille: Gamla stanin saari keskellä,
    // Riddarfjärden lännessä ja Djurgården idässä. Kaikki kuusi
    // kohdetta osuvat alueelle, ja vesi jakaa kuvan niin kuin se
    // jakaa kaupungin — Tukholmassa ranta on kartan pääpiirre.
    //
    // EI meri: true, ja se on mitattu päätös eikä unohdus.
    // Merentäyttö kokeiltiin 9.8.2026 ja se upotti Djurgårdenin:
    // Vasa-museo ja Skansen jäivät aallokkoon, koska Djurgårdenin
    // rantaviiva poistuu rajauksesta eikä sulkeudu saareksi (ks.
    // merenTaytto-funktion tunnettu puute). Ilman täyttöä Saltsjö jää
    // paperin väriseksi, mutta väärä meri on pahempi kuin vaalea meri.
    //
    // Riddarfjärden ja Saltsjön piirtyvät silti vetenä, koska ne ovat
    // OSM:ssä vesirelaatioita — ja niiden sisärenkaat (Kungsholmen,
    // Södermalm) tulevat vasta 9.8.2026 tehdyn reikäkorjauksen
    // jälkeen oikein. Ennen sitä puoli kaupunkia oli veden alla.
    rajat: { pohjoinen: 59.342, etela: 59.313, lansi: 18.03, ita: 18.11 },
    laajennus: 1.6,
  },
  venetsia: {
    /*
     * ÄLÄ LISÄÄ TÄHÄN meri: true. Kokeiltu 9.8.2026, ja tulos oli
     * kartta, jossa MERI PEITTI KOKO KAUPUNGIN: laguunissa rantaviiva
     * pilkkoutuu kymmeniksi pätkiksi, joista osa sulkeutuu väärin
     * päin, ja saaret jäivät veden alle. Venetsian kanavat piirtyvät
     * oikein rantanauhana, koska ne ovat kapeita — juuri siihen nauha
     * on tehty.
     */
    // Koko historiallinen keskusta rautatieasemalta Arsenaalille:
    // Canal Grande kaartaa kuvan halki S-kirjaimena, ja kaikki kuusi
    // kohdetta (asema, Ca' d'Oro, Rialto, Accademia, San Marco,
    // Arsenaali) osuvat alueelle. Muut Venetsian kartat ovat tästä
    // poikkeus siinä, että kohteiden väliset "kadut" ovat kujia ja
    // kanavia — ks. KADUT-taulun kommentti jalankulkuluokista.
    rajat: { pohjoinen: 45.445, etela: 45.4265, lansi: 12.3155, ita: 12.352 },
  },
  praha: {
    // Vltavan mutka: Petřínin kukkula ja Hradčany lännessä,
    // Vanhankaupungin sokkelo idässä, Václavin aukio oikeassa
    // alanurkassa. Joki tulee kuvaan alhaalta, kaartaa Kaarlensillan
    // kohdalla ja poistuu oikeasta ylänurkasta — loiva S kuvan halki.
    // Vyšehrad jää ulkopuolelle: se on 1,2 km etelämpänä, ja mukaan
    // ottaminen leventäisi kuvan niin ettei joen mutka enää erotu.
    rajat: { pohjoinen: 50.095, etela: 50.074, lansi: 14.382, ita: 14.446 },
    laajennus: 1.6,
  },
  wien: {
    // Ring on kuvan pääpiirre: purettu kaupunginmuuri jätti soikean
    // kehäkadun, jonka sisäpuolella katuverkko on sokkelo ja
    // ulkopuolella suoraviivainen. Koillisessa kaartaa Donaukanal ja
    // sen takana on Praterin vihreä.
    //
    // Schönbrunn on 4,3 km lounaaseen, ja päärajaukseen ottaminen
    // vaatisi 7,2 km leveän kuvan — silloin Ring, koko kuvan juoni,
    // kutistuisi täpläksi. Se palasi siksi KAINALOKARTTANA vasempaan
    // alanurkkaan, jossa ei ole yhtään numeroitua kohdetta.
    // Karl-Marx-Hof (4,3 km pohjoiseen) jää yhä ulkopuolelle: se on
    // lehden arkisivun nosto eikä kartan kohde.
    rajat: { pohjoinen: 48.22, etela: 48.188, lansi: 16.34, ita: 16.404 },
    laajennus: 1.6,
    kainalot: [
      {
        // LUVUT OVAT PROSENTTEJA PIIRRETYSTÄ KUVASTA, muunnos
        // lepotilan näkymästä kaavalla 18,75 + näkymä × 0,625 (ks.
        // helsinki). KAINALO KIINNI KULMASSA (omistajan linjaus
        // 15.8.2026: "mieluiten ainakin yhden reunan lähelle,
        // mieluiten kulmaan"): vasen alakulma, 2 % marginaalit kuten
        // Helsingin kainalossa — näkymässä x 2 %, alareuna 98 %
        // (yla = 98 − 35,44 = 62,56 → kuvassa y 57,85).
        rajat: { pohjoinen: 48.191, etela: 48.178, lansi: 16.303, ita: 16.325 },
        x: 20, y: 57.85, leveys: 18.75, suunta: '4 km lounaaseen',
      },
    ],
  },
  budapest: {
    // Kaksi kaupunkia yhdessä kuvassa: Budan kukkula lännessä, Pestin
    // tasanko idässä, ja Tonava vinosti niiden välissä (joen keskilinja
    // x 37 % ylhäällä, x 64 % alhaalla). Margitin sillalta
    // Vapaudensillalle eli neljä siltaa.
    //
    // Sankarien aukio on lehden kansikuva mutta 3 km koilliseen, ja
    // päärajaukseen ottaminen olisi työntänyt Tonavan kuvan laitaan —
    // eli hukannut sen, mitä kartta on tekemässä. Se palasi
    // KAINALOKARTTANA oikeaan ylänurkkaan, jossa ei ole numeroituja
    // kohteita. Kainalo ottaa mukaan myös Városligetin ja Széchenyin
    // kylpylän, eli lehden kolmas koillinen kohde näkyy sekin.
    rajat: { pohjoinen: 47.5125, etela: 47.4825, lansi: 19.019, ita: 19.079 },
    kainalot: [
      {
        rajat: { pohjoinen: 47.5215, etela: 47.5095, lansi: 19.07, ita: 19.092 },
        x: 70, y: 3, leveys: 28, suunta: '3 km koilliseen',
      },
    ],
  },
  pariisi: {
    // Eiffel-tornilta Notre-Damelle ja Montmartren laelle. Molemmat
    // mahtuvat (4,8 km toisistaan), eikä 6,6 km ole puuroa: Pariisin
    // korttelit ovat isoja, joten katutiheys on pienempi kuin
    // Lontoossa, jonka kartta on jo julkaistu.
    //
    // Hinta oli etelälaita: Panthéon ja Luxembourgin puutarha jäivät
    // ulos. Vaihtoehto oli tiukempi rajaus ilman Montmartrea, mutta
    // silloin lapsen kaksi tunnetuinta kohdetta eivät olisi samassa
    // kuvassa.
    //
    // RAJAUS LEVENI NELJÄNNEKSELLÄ 15.8.2026 (sama omistajan tilaus
    // kuin Berliinissä, ks. berliini yllä). Vanha rajaus oli
    // 6,6 × 5,0 km, uusi on 8,3 × 6,2 km — keskipiste on sama, joten
    // kuvasuhde ja kohteiden keskinäiset paikat säilyvät. Laajennus on
    // mahdollinen vain zoomattavan kohdekartan takia (ui.js,
    // kartta-lava).
    //
    // JA SE MAKSAA TAKAISIN YLLÄ MAINITUN HINNAN: eteläreuna 48.8414
    // on Panthéonin (48.8462) ja Luxembourgin puutarhan alapuolella,
    // eli molemmat ovat nyt kuvassa. Ne EIVÄT ole numeroituja kohteita
    // — kohteita on kuusi eikä listaa kasvateta ilman eri päätöstä.
    // Pariisi ei myöskään ole enää pelin laajin rajaus: Berliini on
    // 10,2 km.
    //
    // REUNUS 15.8.2026 (ks. berliini yllä): piirretty alue on
    // 1,6-kertainen eli 13,3 × 10,0 km, lepotila yhä alla oleva
    // rajat-alue. Reunukselle osuvat muun muassa Bois de Boulognen
    // itälaita, Père-Lachaise ja Butte-aux-Caillesin kortteli.
    rajat: { pohjoinen: 48.8976, etela: 48.8414, lansi: 2.2657, ita: 2.3788 },
    laajennus: 1.6,
  },
  amsterdam: {
    // Kanavakehä on hevosenkengän muotoinen, ei soikea, joten rajaus on
    // tarkoituksella lähes neliö: leveämpi kuva litistäisi kaaret ja
    // jättäisi sivut tyhjiksi. Pohjoisreuna ottaa mukaan IJ-lahden
    // avoveden — lahti on syy koko kaupungin olemassaoloon.
    //
    // Kanavat piirtyvät ilman lisäyksiä: ne ovat OSM:ssä
    // waterway=canal -viivoja, jotka kysely jo hakee (Prinsengracht,
    // Keizersgracht ja Herengracht yhteensä yli 90 polkua), ja IJ
    // tulee vesirelaationa, jonka Tukholmaa varten lisätty rivi
    // hoitaa. Vesiveto 14 px vastaa tällä mittakaavalla noin 32 metriä
    // eli kanavien todellista leveyttä; kaaret eivät sula yhteen.
    rajat: { pohjoinen: 52.3855, etela: 52.356, lansi: 4.868, ita: 4.922 },
    laajennus: 1.6,
  },
  dublin: {
    // Liffey kulkee vaakasuoraan kuvan halki ja jakaa sen. Ydinkeskusta
    // on todella pieni, joten 3,3 × 2,2 km riittää: koko keskiaikainen
    // Dublin — linna, katedraali ja se musta lammikko, josta kaupunki
    // sai nimensä — mahtuu kuvan alaosaan.
    //
    // Samuel Beckettin silta jää 173 metriä itärajan ulkopuolelle,
    // vaikka se on lehden kansikuva. Sisään ottaminen olisi työntänyt
    // Guinnessin kuvan reunaan. Croke Park on 634 m pohjoiseen.
    rajat: { pohjoinen: 53.355, etela: 53.335, lansi: -6.294, ita: -6.244 },
  },
  ateena: {
    // Ateenassa ei ole jokea eikä rantaa, joten kuvan selkäranka on
    // kukkularivi lounaasta koilliseen: Filopáppos, Akropolis,
    // Kansallispuutarha ja Lykavittós. Pireus on 8 km lounaaseen eikä
    // mahdu millään ydinkeskustarajauksella.
    rajat: { pohjoinen: 37.9855, etela: 37.9625, lansi: 23.707, ita: 23.758 },
  },
  helsinki: {
    // Kuvan pääpiirre on NIEMI: ydinkeskusta on kolmelta sivulta veden
    // ympäröimä kielike, ja rajaus on vedetty niin että koko kielike
    // mahtuu sisään. Idässä Katajanokka työntyy kokonaan mereen,
    // pohjoisessa Töölönlahti sulkeutuu ehjänä renkaana, etelässä
    // Kaivopuiston ranta sulkee alalaidan.
    //
    // Itäreunaa EI saa siirtää Korkeasaareen asti: silloin oikeasta
    // kolmanneksesta tulee lähes pelkkää avovettä.
    //
    // RAJAUS LEVENI NELJÄNNEKSELLÄ 15.8.2026 (sama omistajan tilaus
    // kuin Berliinissä, ks. berliini yllä). Vanha rajaus oli
    // 3,7 × 3,3 km, uusi on 4,7 × 4,1 km samasta keskipisteestä.
    //
    // POHJOISRAJASTA ERIKSEEN. Yllä oleva vanha huomautus sanoi, ettei
    // yksikään venytys saa kaikkia kolmea lähikohdetta sisään "ilman
    // että kuva paisuu yli neljän kilometrin" — ja juuri se paisuminen
    // on nyt sallittua, koska kartta on zoomattava (ui.js,
    // kartta-lava). Vaihtokauppa purkautui itsestään: SYMMETRINEN
    // laajennus nostaa pohjoisrajan 60.1877:ään, eli Kallion kirkko
    // (60.18425) ja Linnanmäki (60.1861) ovat nyt kuvassa ilman
    // epäsymmetriaa. Kumpikaan ei ole kartan numeroitu kohde — niitä
    // ei lisätä ilman eri päätöstä.
    //
    // Epäsymmetristä venytystä pohjoiseen HARKITTIIN ja se hylättiin:
    // se maksaisi juuri sen, mistä yllä varoitetaan. Niemen kärki
    // (Kaivopuiston ranta, n. 60.155) on nyt 88 %:n korkeudella; 300 m
    // lisää pohjoiseen painaisi sen 94 %:iin eli kiinni alalaitaan.
    // Sibelius-monumentti (lon 24.883) jää yhä lännessä ulkopuolelle.
    //
    // REUNUS 15.8.2026 (ks. berliini yllä): piirretty alue on
    // 1,6-kertainen eli 7,5 × 6,6 km, lepotila yhä alla oleva
    // rajat-alue. Reunukselle osuvat Seurasaari ja Meilahti lännessä,
    // Vallila ja Kumpula pohjoisessa sekä Korkeasaari idässä — juuri
    // se avovesi, jota yllä varotaan ottamasta ydinrajaukseen, on nyt
    // reunuksella, jossa se ei syö kuvan ydintä.
    rajat: { pohjoinen: 60.1877, etela: 60.1508, lansi: 24.9076, ita: 24.9919 },
    laajennus: 1.6,
    meri: true,
    kainalot: [
      {
        // Rajaus mitattu OSM:n rantaviivoista: eteläreuna 60.1368 on
        // valittu niin, ettei Kustaanmiekan kärki katkea.
        // Ruutu on KIINNI OIKEASSA ALANURKASSA (omistajan palaute
        // 9.8.2026: "nyt se on turhaan irti oikeasta reunasta").
        // Marginaali on 2 % kummallakin sivulla, sama kuin Budapestin
        // kainalossa — täysin reunaan asti vietynä ruudun oma
        // reunaviiva jäisi puoliksi kuvan ulkopuolelle.
        //
        // LUVUT OVAT PROSENTTEJA PIIRRETYSTÄ KUVASTA, ja reunus
        // 15.8.2026 muutti ne. Ruutu istuu edelleen tarkalleen samassa
        // kohdassa lepotilan näkymää: ydinrajaus alkaa laajennetussa
        // kuvassa kohdasta 18,75 % ja on 62,5 % leveä, joten vanhat
        // ydinprosentit muuntuivat kaavalla 18,75 + vanha × 0,625:
        // x 76 → 66.25, y 69.15 → 61.97, leveys 22 → 13.75. Ruudun
        // koko pikseleinä ei siis muutu (352 px), koska kuvakin
        // leveni samassa suhteessa.
        rajat: { pohjoinen: 60.152, etela: 60.1368, lansi: 24.969, ita: 24.9955 },
        x: 66.25, y: 61.97, leveys: 13.75, suunta: '3 km kaakkoon', meri: true,
      },
    ],
  },
  marseille: {
    // Kulho, joka aukeaa länteen: avomeri vasemmalla, Vanhasataman
    // suorakaide keskellä, Notre-Dame de la Garden kallio etelässä.
    // Rajaus on lähes neliö, koska kapeampi kuva työntäisi meren
    // laitaan — Marseillessa meri ON kuva.
    //
    // Tämä kaupunki pakotti työkaluun merentäytön. Ilman sitä koko
    // länsipuoli oli paperia ja Vanhasatama ontto suorakaide:
    // Välimeri on OSM:ssä pelkkää rantaviivaa (nolla vesimonikulmiota)
    // ja satama on relaatio 10793156, joka nauhana piirtyi laatikoksi.
    //
    // Länsireuna 5.345 ei ole sattumaa: se pitää rantaviivan kuvassa
    // koko korkeudeltaan (läntisin rantapiste on lon 5.3456). Kapeampi
    // rajaus jättää länsireunaan täyttämättömän kiilan.
    //
    // Ifin linna jää 1,6 km länsirajan taakse — se on lehden nosto,
    // mutta kainalo keskelle avomerta näyttäisi oudolta, ja saari on
    // niin pieni ettei siitä tulisi tunnistettavaa minikarttaa.
    rajat: { pohjoinen: 43.3065, etela: 43.2765, lansi: 5.345, ita: 5.393 },
    meri: true,
  },
  edinburgh: {
    // Kaksi kaupunkia yhdessä kuvassa: Uudenkaupungin ruutukaava
    // ylhäällä, vanhankaupungin harjanne alhaalla, ja niiden välissä
    // Princes Street Gardensin notko — entinen Nor Loch, jonka
    // pohjalla kulkee nyt rautatie. Charlotte Squarelta Holyroodiin.
    //
    // Arthur's Seat jää ulos: se osuisi 90 %:n kohdalle oikeaan
    // alanurkkaan, ja Holyrood Park veisi kolmanneksen kuvasta
    // tyhjänä vihreänä — työkalu ei piirrä korkeuskäyriä, joten
    // kukkulasta ei näkyisi mitään. Puiston länsireuna näkyy silti.
    //
    // Ei meri: true — rajaus ei ulotu Forthin lahdelle asti.
    rajat: { pohjoinen: 55.9615, etela: 55.9415, lansi: -3.214, ita: -3.162 },
  },
  lissabon: {
    // Baixan ruudukko keskellä, Alfama oikealla ja Bairro Alto
    // vasemmalla — kaksi kukkulaa ja niiden välissä 800 metriä leveä
    // ruutukaava, joka vedettiin vuoden 1755 maanjäristyksen jälkeen.
    // Tejo tulee kuvaan vasemmasta alanurkasta ja kääntyy oikeassa
    // laidassa pohjoiseen.
    //
    // Belém jää ulos: torni on 7,1 km ja luostari 6,2 km Kauppatorilta,
    // ja mukaan ottaminen vaatisi 9 km leveän kuvan. Kumpikin on
    // lehden kohde, joten se on kerrottava lehden puolella.
    rajat: { pohjoinen: 38.7265, etela: 38.7035, lansi: -9.1505, ita: -9.118 },
    meri: true,
  },
  barcelona: {
    // Pelin toiseksi laajin rajaus Pariisin jälkeen, ja syy on
    // ruudukko: Eixamplen korttelit ovat vain 113 metriä sivultaan,
    // joten 4,3 km:n kuvassa yksi kortteli on noin 42 px — tarpeeksi
    // iso että viistetyt kulmat näkyvät, tarpeeksi pieni että toisto
    // syntyy. Keskellä ruudukko katkeaa terävään reunaan (siinä kulki
    // purettu muuri) ja alkaa gotiikkakorttelin sokkelo.
    //
    // Rajaus on neliö, koska ruudukko on itse 45 asteen kulmassa.
    // Park Güell jää 630 m pohjoisrajan yläpuolelle: mukaan ottaminen
    // liimaisi sen ja Kolumbuksen patsaan kumpikin omaan laitaansa.
    rajat: { pohjoinen: 41.4085, etela: 41.37, lansi: 2.147, ita: 2.1984 },
    meri: true,
  },
  granada: {
    // Näistä pienin, 2,2 km neliö. Darro tulee oikeasta laidasta ja
    // laskeutuu vinosti keskelle — se on kuvan selkäranka ja se rako,
    // joka erottaa Albaicínin ja Alhambran kukkulat toisistaan. Genil
    // kulkee alalaidassa.
    //
    // Darron kaupunkiosuus on OSM:ssä tunnel=culvert mutta piirtyy
    // avoimena jokena. Se jätettiin tahallaan: se selittää miksi
    // Reyes Católicos kaartaa juuri noin, ja ilman sitä Granadalta
    // katoaisi yksi harvoista tunnistettavista piirteistä.
    //
    // Ei merta — Granada on 60 km sisämaassa.
    rajat: { pohjoinen: 37.1875, etela: 37.1675, lansi: -3.6045, ita: -3.5795 },
  },
  istanbul: {
    /*
     * Kaikki kolme kaupunginosaa samassa kuvassa: vanhakaupunki
     * niemellä vasemmalla, Galata ja Beyoğlu Kultaisen sarven
     * pohjoispuolella, ja Aasian puoli Bosporin takana oikealla. Se
     * maksaa leveyttä (5,5 km) ja kolmanneksen kuvasta vettä — mutta
     * salmi ei ole hinta vaan aihe. Tämä on pelin ainoa kartta, jolla
     * näkyy kaksi maanosaa.
     *
     * MERI ON 'maa' EIKÄ true. Tavallinen vesipuolen täyttö ei toimi
     * täällä, koska maata on veden MOLEMMIN PUOLIN: jokaisen rannan
     * vesipuoli sisältää muut maamassat, ja renkaiden unioni peittää
     * 160–255 % rajauksesta. Maapuolitapa maalaa koko ruudun mereksi
     * ja maamassat paperilla päälle (niemi 21 %, Beyoğlu 13 %, Aasia
     * 11 %). Älä vaihda tätä true:ksi — pinta-alavahti kyllä
     * pysäyttää sen, mutta silloin Bosporinsalmi jää paperiksi.
     *
     * Taksim jää 380 m ja Dolmabahçe 630 m pohjoisrajan taakse, Balat
     * 760 m länteen ja Kadıköy 800 m etelään — neljä eri suuntaan,
     * joten mikään venytys ei saa niitä sisään.
     */
    rajat: { pohjoinen: 41.0335, etela: 40.9975, lansi: 28.958, ita: 29.024 },
    meri: 'maa',
  },
  lontoo: {
    // Hyde Parkin itälaidalta Tower Bridgelle, Regent's Parkin
    // eteläpuolelta Thamesin etelärannalle. Kaikki kuusi kohdetta
    // (Buckinghamin palatsi, Trafalgar Square, Big Ben, Lontoon silmä,
    // Pyhän Paavalin katedraali, Tower Bridge) osuvat alueelle, ja
    // Thames kaartaa kuvan halki tunnistettavana.
    //
    // RAJAUS LEVENI NELJÄNNEKSELLÄ 15.8.2026 (sama omistajan tilaus
    // kuin Berliinissä, ks. berliini yllä). Vanha rajaus oli
    // 6,9 × 3,6 km, uusi on 8,7 × 4,5 km — keskipiste on sama, joten
    // kuvasuhde ja kohteiden keskinäiset paikat säilyvät. Laajennus on
    // mahdollinen vain zoomattavan kohdekartan takia (ui.js,
    // kartta-lava); Lontoon katutiheys on pelin suurin, ja ilman
    // zoomia tämä olisi juuri sitä puuroa, josta yllä varoitetaan.
    //
    // Levennys korjaa samalla vanhan vian: Tower Bridge oli itälaidassa
    // 85 %:n kohdalla ja sen numeroympyrä hipoi kuvan reunaa. Nyt se on
    // 78 %:ssa, eli silta piirtyy kokonaan ja ympyrälle jää tilaa.
    //
    // REUNUS 15.8.2026 (ks. berliini yllä): piirretty alue on
    // 1,6-kertainen eli 13,9 × 7,2 km, lepotila yhä alla oleva
    // rajat-alue. Reunukselle osuvat Regent's Park ja Kensington
    // Gardens pohjoisessa ja lännessä sekä Bermondsey idässä.
    rajat: { pohjoinen: 51.5291, etela: 51.4884, lansi: -0.1725, ita: -0.0475 },
    laajennus: 1.6,
  },
  rooma: {
    // Tiber tulee kuvaan alhaalta, kaartaa Vatikaanin ohi ja poistuu
    // ylhäältä — se jakaa kuvan niin että Pietarinkirkko ja Castel
    // Sant'Angelo ovat lännessä ja neljä muuta kohdetta idässä.
    // Antiikin Rooma (Pantheon, Trevi, Colosseum) on itälaidan
    // sokkelossa, ja Via del Corso vetää sen halki suorana viivana.
    //
    // Kokeiltu myös tiukempi rajaus + kainalo Vatikaanille: se oli
    // selvästi huonompi. Tiber kutistui nurkan siivuksi, ja ainoa
    // tyhjä nurkka oli sama johon kainalon suuntateksti olisi osunut.
    // 4,6 km on tässä oikea leveys, koska joen mutka on kuvan juoni.
    //
    // Ei merta — Ostia on 25 km lounaassa.
    rajat: { pohjoinen: 41.9135, etela: 41.8845, lansi: 12.4455, ita: 12.5005 },
    laajennus: 1.6,
  },
  firenze: {
    // Arno halkoo kuvan vaakasuoraan alakolmanneksesta, ja kaikki
    // kuusi kohdetta ovat sen molemmin puolin kävelymatkan päässä
    // toisistaan: Duomo, Palazzo Vecchio, Uffizi ja Santa Croce
    // pohjoisrannalla, Ponte Vecchio joen päällä ja Boboli
    // eteläpuolella Pitti-palatsin takana.
    //
    // Rajaus on tarkoituksella PIENI (2,2 × 1,9 km), ja se on mitattu
    // päätös. Ensimmäinen ajo 2,7 × 2,6 km:n ruudulla näytti
    // Firenzen keskiaikaisen ytimen pikkuruisena täplänä keskellä
    // 1800-luvun kehäkatuja, ja kaksi kohdetta kuudesta (Palazzo
    // Vecchio ja Uffizi, 180 m toisistaan) jäivät numeroympyröinä
    // päällekkäin. Tiukempi ruutu kasvattaa kohteiden välit ilman
    // että yksikään jää ulkopuolelle — ja se näyttää juuri sen, mikä
    // Firenzessä on katsomisen arvoista: kujaverkon Duomon ympärillä.
    // Piazzale Michelangelo (43.7629) jää etelärajan alle — se ei ole
    // kartan kohde vaan reunuksen maisemapiste.
    //
    // Ei merta: Ligurianmeri on 80 km lännessä.
    rajat: { pohjoinen: 43.778, etela: 43.7605, lansi: 11.243, ita: 11.27 },
    laajennus: 1.6,
  },
  krakova: {
    // Planty on kuvan juoni: purettu kaupunginmuuri jätti soikean
    // puistokehän, ja sen sisällä on keskiaikainen ruutukaava
    // Suurtorin ympärillä. Sama idea kuin Wienin Ring, mutta puistona
    // eikä katuna — ja tässä kehä mahtuu kuvaan kokonaan.
    //
    // Kehän pohjoisreunalla on Barbakaani, eteläpäässä Wawelin kukkula
    // Veikselin rannalla, ja siitä etelään Kazimierz. Vain 2,6 km
    // leveä, joten kortteleiden kujat erottuvat.
    //
    // Auschwitz on 65 km länteen eikä ole kaupunkikartan kohde.
    rajat: { pohjoinen: 50.069, etela: 50.047, lansi: 19.9225, ita: 19.9585 },
  },
  varsova: {
    // Veiksel tulee ylhäältä ja poistuu oikeasta alanurkasta vinona
    // nauhana. Itäranta (Praga) on mukana kapeana kaistana tahallaan:
    // ilman sitä joki olisi kuvan reuna eikä joki, ja pelaaja näkee nyt
    // että kaupunki on veden molemmin puolin.
    //
    // Rajaus on lähes neliö, koska Varsovan maamerkit ovat jonossa
    // pohjoisesta etelään — vanhastakaupungista Kulttuuri- ja
    // tiedepalatsille on 2 km. Leveämpi kuva olisi puristanut ne
    // kapeaan pystyraitaan.
    //
    // Ei meri-lippua. Varsovassa ei ole yhtään natural=coastline-viivaa,
    // ja Veiksel piirtyy oikein natural=water-monikulmiona.
    //
    // Kansallisstadion jää 190 m itärajan taakse. Sisään ottaminen
    // työntäisi sen 96 %:n kohdalle ja Kulttuuri- ja tiedepalatsin
    // vasemman reunan yli. Łazienki, POLIN ja kansannousun museo
    // osoittavat kolmeen muuhun suuntaan.
    rajat: { pohjoinen: 52.2535, etela: 52.2265, lansi: 20.9995, ita: 21.043 },
  },
  oslo: {
    // Vuonon peruka ja sen ympärille kiertyvä keskusta: kuninkaanlinna
    // ylhäällä, Karl Johans gate siitä alas kohti tuomiokirkkoa,
    // Akershusin linnoitus niemellä ja oopperatalo veden toisella
    // puolella idässä. Satama-altaat jäävät väliin, ja juuri ne
    // tekevät Oslosta Oslon.
    //
    // Bygdøyn laivamuseot (viikinkilaiva, Fram, Kon-Tiki) jäävät
    // tahallaan pois: ne ovat 3,5 km lännessä, ja mukaan ottaminen
    // kolminkertaistaisi rajauksen. Lehden laivaosasto kertoo niistä,
    // ja kartan esittely sanoo, mihin suuntaan ne jäävät.
    rajat: { pohjoinen: 59.918, etela: 59.901, lansi: 10.7135, ita: 10.761 },
    meri: true,
  },
  tampere: {
    /*
     * Kannas kahden järven välissä: Näsijärvi työntyy kuvan
     * yläreunaan luoteesta ja Pyhäjärvi alareunaan lounaasta, ja
     * niiden välissä kulkee Tammerkoski pohjoisesta etelään aivan
     * kuvan keskellä. Rajaus alkaa lännessä Pyynikinharjulta (jotta
     * näkötorni mahtuu mukaan) ja päättyy idässä rautatiehen, joka
     * piirtyy kuvaan pystysuorana viivana keskustan takana.
     *
     * Kuvasuhde on 1,63 (3,6 × 2,2 km) eli laudan levein rajaus
     * Dubrovnikin jälkeen. Syy on sama kuin Kööpenhaminassa: kaupunki
     * itse on kapea ja pitkä, ja pystysuunnassa on pelkkää vettä.
     */
    rajat: { pohjoinen: 61.509, etela: 61.489, lansi: 23.715, ita: 23.783 },
    laajennus: 1.6,
    /*
     * meri: 'maa' kuten Kööpenhaminassa — kuvassa on kaksi eri järveä
     * eikä yhtä avovettä, joten täyttö on käännettävä. Katso koeajon
     * varoitusprosentti ja käännä lippua, jos täyttö osuu väärin.
     */
    meri: 'maa',
  },
  kobenhavn: {
    // Satamakanava halkoo kuvan pohjois–eteläsuunnassa: vasemmalla
    // vanha kaupunki Tivolista Rundetårniin, oikealla Christianshavn
    // ja Amager. Pohjoisreuna on valittu niin, että Pieni merenneito
    // mahtuu mukaan — se on 1,5 km keskustasta pohjoiseen, ja ilman
    // sitä kartalta puuttuisi se, mitä pelaaja ensimmäisenä etsii.
    //
    // meri: 'maa' eikä true — koeajo tavallisella täytöllä varoitti
    // meren peittävän 113 % rajauksesta eli valinneen väärän puolen.
    // Kööpenhaminassa maata on kanavan molemmin puolin, joten täyttö
    // osuu oikein vasta käännettynä.
    // Eteläreuna 55.669 eikä 55.672: Tivolin numeroympyrä osui
    // muuten mittakaavajanan päälle kuvan vasemmassa alakulmassa
    // (mitattu selaimessa).
    rajat: { pohjoinen: 55.6945, etela: 55.669, lansi: 12.5555, ita: 12.6116 },
    laajennus: 1.6,
    meri: 'maa',
  },
  dubrovnik: {
    // Muurikaupunki kokonaan kuvassa: Pilen portti lännessä,
    // vanhasatama idässä, Minčetan torni pohjoisessa ja Adrianmeri
    // etelässä. Lovrijenacin linnake mahtuu vasempaan laitaan omalle
    // kalliolleen, ja juuri se kertoo, miksi kaupunki on tässä —
    // linnake vartioi lahden suuta.
    //
    // 1,8 × 1,3 km on koko kartaston tiukin rajaus, ja se on
    // tarkoitus: vanhakaupunki on vain 500 × 300 metriä. Dubain
    // kokoisella ruudulla se olisi peukalonpään kokoinen läiskä.
    //
    // Kujat piirtyvät, toisin kuin Tallinnassa: Dubrovnikin kujat ovat
    // OSM:ssä pääosin `pedestrian` (jonka työkalu piirtää) eivätkä
    // `footway` (jota ei). Stradun näkyy siksi kuvassa leveänä
    // suorana, ja siitä lähtevät portaikot kylkiluina.
    rajat: { pohjoinen: 42.6442, etela: 42.6388, lansi: 18.1035, ita: 18.1148 },
    meri: true,
  },
  riika: {
    // Vanhakaupunki Väinäjoen mutkassa: joki vasemmalla, keskiaikainen
    // rypäs keskellä ja Vapaudenpatsas puistovyöhykkeellä oikealla.
    // Alaspäin jatkuu keskustori, jonka viisi hallia näkyvät kuvassa
    // sormina — ne ovat lehden nostossa mainitut ilmalaivahallit.
    //
    // Jugend-kortteli (Alberta iela) jää tahallaan pois: se on 1,2 km
    // pohjoiseen, ja mukaan ottaminen kaksinkertaistaisi rajauksen,
    // jolloin vanhakaupungin kujat sulaisivat yhdeksi täpläksi.
    // Kartan juoni on vanhakaupunki, kuten lehdenkin.
    rajat: { pohjoinen: 56.956, etela: 56.941, lansi: 24.0908, ita: 24.1293 },
  },
  vilna: {
    // Vanhakaupunki kahden joen kainalossa: Neris ylhäällä, Vilnia
    // oikealla, ja niiden välissä Gediminaksen kukkula. Kuva ulottuu
    // pohjoisessa tuomiokirkon aukiolle ja etelässä Aamuportille,
    // eli koko sille matkalle, jonka vanhakaupunki vie.
    //
    // Užupis on mukana omana kolkkanaan Vilnia-joen takana — lehti
    // kertoo sen tasavallasta ja 41 pykälästä, ja kartalla näkee,
    // että se on oikeasti oma korttelinsa joen toisella puolella.
    //
    // palvelutiet: true — Vilnan vanhassakaupungissa kujat on merkitty
    // OSM:ään service-teiksi (1509 kpl vs. 189 tavallista katua), joten
    // ilman niitä vanhakaupunki jää tyhjäksi paperiksi. Mitattu
    // Overpassista ennen lipun lisäämistä.
    // Eteläreuna 54.6705 eikä 54.6725: Aamuportin numeroympyrä jäi
    // muuten kiinni kuvan alareunaan (mitattu selaimessa).
    rajat: { pohjoinen: 54.688, etela: 54.6705, lansi: 25.2695, ita: 25.307 },
    palvelutiet: true,
  },
  tromssa: {
    // Tromssan salmi keskellä: saarikaupunki lännessä, Tromsdalen ja
    // Jäämerenkatedraali idässä, ja niiden välissä silta. Rajaus on
    // valittu sillan ympärille, koska Tromssassa kuva on kahden
    // rannan kuva — pelkkä saari jättäisi katedraalin ja köysiradan
    // pois, ja pelkkä keskusta olisi kortteliruutu ilman merta.
    //
    // 3,0 × 2,3 km on työkalun ohjetta (5–8 km) pienempi, ja syy on
    // sama kuin Dubaissa: kaupunki itse on tämän kokoinen. Tromssan
    // keskusta mahtuu kilometrin matkalle Storgataa, ja laajempi
    // rajaus toisi kuvaan vain Tromsøyan metsäselännettä.
    //
    // meri: true — Norjan rannikko on OSM:ssä pelkkää rantaviivaa
    // eikä yhtään vesimonikulmiota, joten ilman lippua salmi jäisi
    // paperin väriseksi ja saarikaupunki näyttäisi mantereelta.
    // Tarkistettu vesitarkistimella (tools/tarkista-karttapisteet.mjs),
    // ettei täyttö valu kummankaan rannan päälle.
    rajat: { pohjoinen: 69.6575, etela: 69.6365, lansi: 18.937, ita: 19.013 },
    meri: 'maa',
  },
  tallinna: {
    // Kaksiosainen kuva: ylhäällä Suomenlahti ja satamaniemi
    // sormimaisine laitureineen, keskellä vanhankaupungin soikea
    // rengas — purettujen muurien tilalle jäänyt vallihautapuistojen
    // ja kehäkadun kehä. Pohjoisreuna on valittu niin, että merta jää
    // ylälaitaan noin 400 metriä; tiukemmalla rajauksella merestä jäi
    // pelkkä tilkku eikä kuva enää kertonut merenrantakaupungista.
    //
    // Vanhankaupungin kujat ovat OSM:ssä pääosin footway (805 kpl),
    // joita työkalu ei piirrä — sisus jää siis ilmavaksi eikä
    // sokkeloiseksi. Kartan juoni on muurirengas ja meri, ei kujaverkko.
    //
    // Muuri piirtyy 10.8.2026 alkaen (barrier=city_wall). Tallinnassa
    // se ei ole yhtenäinen rengas kuten Dubrovnikissa vaan sarja
    // pätkiä, mutta juuri ne pätkät ovat vanhankaupungin reuna.
    // Leveämmällä 2,55 km:n rajauksella rengas alkaa hukkua.
    //
    // meri: true eikä 'maa': maata on vain veden eteläpuolella, joten
    // tavallinen vesipuolen täyttö osuu oikein. Ilman lippua
    // Tallinnanlahti jäisi paperin väriseksi ja satama-altaat
    // näyttäisivät joelta.
    //
    // EI KAINALOA, ja se on mitattu päätös eikä unohdus. Lauluväljak
    // on lehden kärkinosto ja jää 1,6 km itärajan taakse, eli
    // kainalosääntö osoittaisi kainaloon. Kaksi ruutua piirrettiin ja
    // katsottiin:
    //   1) Kadriorg + Lauluväljak yhdessä (2,3 × 1,2 km, 30 % leveä)
    //      → yhtenäinen vihreä läntti, jossa erottuu vain laulukaaren
    //      viuhka. Palatsi ja barokkipuutarha eivät piirry.
    //   2) pelkkä Lauluväljak tiukasti (0,8 × 0,6 km, 26 % leveä)
    //      → täysin tyhjä vihreä ruutu. Laulukaari on rakennus, jota
    //      työkalu ei piirrä, ja katsomo on nurmea.
    // Sama vika kuin Suomenlinnan ensimmäisessä kainalossa: ruutu, jossa
    // ei ole katuverkkoa, on paperia. Jos laulukenttä halutaan kartalle,
    // se vaatii työkaluun rakennusten piirron — ei uutta rajausta.
    rajat: { pohjoinen: 59.4505, etela: 59.431, lansi: 24.7275, ita: 24.769 },
    meri: true,
  },
  sofia: {
    // Sofiassa ei ole jokea, rantaa eikä kehäkatua. Kuvan juoni on
    // SÄTEITTÄINEN BULEVARDIVIUHKA: leveät kadut lähtevät keskustasta
    // joka suuntaan kuin pyörän puolat, eikä mikään katkaise niitä.
    // Neljä muuta tunnistettavaa aihetta: Nevskin soikea aukio
    // keskellä, Perlovskan suora vesinauha alaoikealla, Borisovan
    // puutarha järvineen oikeassa alaneljänneksessä ja
    // Kansalliskulttuuripalatsin aukea vasemmassa alanurkassa.
    //
    // MITÄ TÄSTÄ EI NÄY, JA SE ON MITATTU: lehden kärkiaiheet —
    // Serdica, kylpylä, kirkkojen ja moskeijan kortteli — eivät piirry
    // lainkaan. Sveta Nedeljan aukio on pieni siksak (x 27, y 37), ja
    // siinä kaikki: rakennuksia ei piirretä ja Largon kävelyalueet ovat
    // footway. Tiukempi 2,05 km:n rajaus kokeiltiin — silloin viuhka
    // katosi eikä ydin silti tullut näkyviin. 2,7 km on oikea leveys.
    //
    // Ei meri-lippua: rantaviivoja nolla. Rajauksessa on kaksi jokea,
    // Vladajska ja Perlovska, ja kumpikin piirtyy oikein.
    //
    // Bojanan kirkko jää 5,5 km lounaaseen ja Tšerni Vrah 13,3 km
    // etelään. Kumpikaan ei sovi kainaloksi: niiden ympärillä ei ole
    // katuverkkoa, eli ruudusta tulisi tyhjä paperi kuten Tallinnan
    // laulukentästä.
    rajat: { pohjoinen: 42.705, etela: 42.681, lansi: 23.312, ita: 23.345 },
  },
  bukarest: {
    // Kaksi juonta samassa kuvassa. Dâmbovița kulkee halki
    // hämmästyttävän suorana nauhana — se kanavoitiin 1880-luvulla
    // eikä mutkittele metriäkään. Ja Ceaușescun akseli:
    // Parlamenttipalatsin tyhjä valtava kortteli alavasemmalla, siitä
    // itään suihkulähdeketjun reunustama bulevardi ja sen päässä
    // Unirii-aukion ympyrä. Lisäksi Cișmigiun vihreä mutkittelevine
    // järvineen ylävasemmalla ja vanhankaupungin kujasokkelo oikealla
    // — kuvan ainoa kohta, jossa kadut eivät ole suoria.
    //
    // Kokeiltu myös 3,2 × 3,4 km:n rajaus, joka olisi ottanut mukaan
    // Antipan museon ja Piața Victoriein. Se oli mitattavasti huonompi:
    // kujasokkelo, kuvan paras yksityiskohta, kutistui täpläksi eikä
    // Victoriei tuonut yhtään uutta muotoa. 2,3 km on oikea leveys.
    //
    // Ei meri-lippua. Dâmbovița piirtyy waterway-nauhana ja
    // Unirii-bulevardin suihkulähdealtaat natural=water-monikulmioina —
    // juuri ne tekevät bulevardista kuvassa katkoviivamaisen ketjun.
    rajat: { pohjoinen: 44.4445, etela: 44.4235, lansi: 26.08, ita: 26.109 },
    kainalot: [
      {
        rajat: { pohjoinen: 44.4565, etela: 44.4475, lansi: 26.081, ita: 26.094 },
        x: 3, y: 9, leveys: 26, suunta: '1 km pohjoiseen',
      },
    ],
  },
  sarajevo: {
    // Kapea laakso, joten kuva on leveä ja matala: 2,65 × 1,33 km eli
    // kuvasuhde melkein 2:1. Miljacka on selkäranka — se tulee
    // vasemmasta alanurkasta, kulkee koko kuvan halki ja tekee oikealla
    // suuren S-mutkan, jossa laakso kuroutuu rotkoksi.
    //
    // Pohjoisreuna on nostettu tahallaan 43.8655:een. Tiukempi rajaus
    // (43.863) piirtyi kelvollisesti, mutta silloin alaosan 40 % oli
    // Trebevićin tyhjää metsärinnettä ja pohjoisrinteen mahalat
    // leikkautuivat pois. Nyt kuva on kolmikerroksinen: ylhäällä
    // hiuksenohut rinnekatuverkko, keskellä laakson pohja ja basaari,
    // alhaalla jyrkkä tyhjä rinne muutamine serpentiineineen.
    //
    // Baščaršijan kujat piirtyvät, koska ne ovat OSM:ssä pedestrian
    // eivätkä footway — toisin kuin Tallinnan vanhassakaupungissa.
    //
    // EI KAINALOA, ja se on mitattu päätös. Kansallismuseo (Sarajevon
    // haggada) jää 0,75 km länteen ja on lehden nosto, joten
    // kainalosääntö osoittaisi kainaloon. Ruutu piirrettiin ja
    // katsottiin (Marijin Dvor, 24 % leveä, vasen alanurkka):
    //   - se EI ole tyhjä, katuverkkoa on — mutta sisältö on muutama
    //     yhdensuuntainen bulevardin viiva eikä siitä tunnista mitään;
    //   - ja se PEITTÄÄ kohdan, jossa Miljacka tulee kuvaan, eli
    //     katkaisee kartan ainoan juonen.
    // Tyhjää nurkkaa ei ole: laakso täyttää kehyksen. Vika on eri kuin
    // Tallinnan laulukentässä (tyhjä ruutu) — tässä ruutu on täysi
    // mutta hinta liian kova.
    //
    // Bobirata jää 1,47 km kaakkoon ja ylös vuorelle, Bijela tabija
    // 98,5 %:n kohdalle eli käytännössä ulos.
    rajat: { pohjoinen: 43.8655, etela: 43.8535, lansi: 18.412, ita: 18.445 },
  },
  kiova: {
    // Kaksikerroksinen kaupunki, ei joki: Kiovan maamerkit ovat jonossa
    // pohjoisesta etelään pitkin Dneprin törmää, joten kuva on pysty.
    // Ylhäällä Podilin ruudukko rannassa, keskellä rinne, alhaalla
    // yläkaupunki ja Hreštšatyk.
    //
    // DNEPR PIIRTYY PALJAINA RANTAVIIVOINA eikä täyttönä. Se on relaatio
    // 66398, jonka ulkorengas on 3,50e-3 ast² eli 2,9-kertainen tähän
    // rajaukseen — kokoaKerrokset() täyttää vain alle 0,3:n renkaat.
    // Rajan alle pääsisi vasta noin kymmenkertaisella laatikolla, joten
    // tätä ei korjata rajausta muuttamalla. Sama ilmiö kuin Budapestin
    // Tonavassa, joka on jo julkaistu. Siksi jokea on kuvassa vain
    // oikeassa yläkulmassa noin 15 % — leveämmällä rajauksella (kokeiltu
    // 3,5 ja 4,4 km) rinnakkaisia rantanauhoja tuli viisi ja kuva hajosi.
    //
    // TÄMÄ ON ERÄN HEIKOIN KARTTA, ja se sanotaan tässä ääneen. Oikean
    // laidan joki lukee kolmena vaaleana nauhana eikä vetenä, koska
    // niiden välissä on paperia ja ympärillä tyhjää. Vertailukohta on
    // julkaistu Budapest, jossa Tonava piirtyy täsmälleen samoin mutta
    // lukee jokena, koska molemmilla rannoilla on tiheä kaupunki.
    // Kokeiltu myös rajauksen siirtoa länteen (30.493–30.533): silloin
    // Podilin ruudukko katosi lähes kokonaan ja kuva oli selvästi
    // huonompi. Esittelyteksti selittää nauhat lapselle. Oikea korjaus
    // olisi työkalussa: isojen jokirelaatioiden täyttö.
    //
    // EI meri-lippua: rajauksessa on nolla natural=coastline-polkua.
    //
    // EI KAINALOA, ja se on mitattu. Arsenalna (1,3 km), luolaluostari
    // (3,1 km) ja Ukrainan äiti (4,1 km) jäävät kaikki kaakkoon, eli
    // kainalosääntö osoittaisi kainaloon. Ruutu 50.425–50.438 /
    // 30.549–30.567 ajettiin: 222 elementtiä ja lähes tyhjä paperi.
    // Lavran kujat ovat footway ja patsas seisoo museopuistossa.
    rajat: { pohjoinen: 50.47, etela: 50.44, lansi: 30.499, ita: 30.539 },
  },
  pietari: {
    // Kanavakaaret ovat kuvan juoni: Moika, Gribojedovin kanava ja
    // Fontanka piirtyvät kolmena sisäkkäisenä kaarena, ja Nevski
    // prospekt lävistää ne suorana. Eteläraja on valittu
    // Mariinski-teatterin mukaan (87,6 %).
    //
    // NEVA KÄYTTÄYTYY KAHDELLA TAVALLA, ja se on rajausta sitova.
    // Bolšaja Neva (relaatio 1114249, rengas 4,455e-4) ja Malaja Neva
    // (72500, 2,339e-4) mahtuvat 0,3:n rajan alle ja TÄYTTYVÄT oikein.
    // Pääuoma «Нева» (2599821, rengas 5,168e-3) ei mahdu ja piirtyy
    // kahtena rantaviivana; Talvipalatsin kohdalla väliin jää 690 metriä
    // paperia. Sitä ei saa korjatuksi rajauksella.
    // ÄLÄ KAVENNA: jos laatikon ala painuu alle 1,485e-3 ast², myös
    // Bolšaja Neva kaatuu viivoiksi. Nyt ala on 2,079e-3.
    //
    // EI meri-lippua: nolla rantaviivapolkua, Suomenlahti on 5 km länteen.
    //
    // EI KAINALOA. Smolnan katedraali on lehden kansikuva ja 2,9 km
    // itään, joten kainalosääntö osoittaisi kainaloon. Ruutu
    // 59.944–59.953 / 30.385–30.406 ajettiin: 242 elementtiä, Nevan
    // mutka ja pari katua, itse katedraali on rakennus jota ei piirretä.
    // Lisäksi Pietarissa ei ole tyhjää nurkkaa mihin ruutu sopisi.
    rajat: { pohjoinen: 59.9545, etela: 59.9215, lansi: 30.284, ita: 30.347 },
  },
  moskova: {
    // TÄMÄ RAJAUS ON TAHALLAAN ISOMPI KUIN PITÄISI, ja syy on mitattu.
    // Moskova-joki on relaatio 222973, jonka ulkorengas on 4,703e-4 ast².
    // Tiukemmalla 2,94 × 3,01 km:n rajauksella suhde laatikkoon oli
    // 0,371 eli yli 0,3 — joki hajosi kahdeksi rantanauhaksi, joiden
    // välissä oli paperia. Tällä 3,26 × 3,45 km:n rajauksella suhde on
    // 0,292 ja joki piirtyy yhtenäisenä täytettynä nauhana.
    // ÄLÄ PIENENNÄ RAJAUSTA. Isompi on tässä parempi kartta.
    //
    // Kremlin ympäri kiertävä vesijuova EI ole vallihauta vaan
    // Neglinnaja-joki, joka on OSM:ssä tunnel=culvert mutta piirtyy
    // avoimena kahtena haarana (läntinen Aleksanterin puutarhan
    // kohdalla, itäinen Kremlin itämuurin ohi Zarjadjeen eli vanhan
    // Alevizin vallihaudan reittiä). Jätetty tahallaan, sama ratkaisu
    // kuin Granadan Darrolla — se selittää Kremlin muodon.
    //
    // EI meri-lippua: nolla rantaviivapolkua.
    //
    // EI KAINALOA. Majakovskaja (1,4 km) on maanalainen metroasema,
    // yliopisto (8 km) ja VDNH (9 km) ovat liian kaukana ja puiston
    // keskellä. Kaikki kolme ovat lehden juttuja, ei kartan kohteita.
    rajat: { pohjoinen: 55.7655, etela: 55.7345, lansi: 37.5915, ita: 37.6435 },
  },
  odessa: {
    // Kolmiosainen kuva: oikea kolmannes merta, yläreunassa satama
    // sormimaisine laitureineen ja aallonmurtaja majakkoineen, vasen
    // kaksi kolmannesta yhtenäistä ruutukaavaa. 3,99 km on sääntörajalla,
    // mutta Odessan korttelit ovat pieniä ja kestävät sen — sama
    // perustelu kuin Barcelonassa.
    //
    // ITÄRAJA 30.776 EI OLE SATTUMA. Ensimmäinen rajaus päättyi
    // 30.762:een, ja silloin meri: true jätti itäreunaan ison
    // täyttämättömän paperikiilan (x 78–100 %, y 22–50 %): rantaviiva
    // poistui laatikosta ja palasi samalta reunalta, eli täsmälleen
    // merenTaytto()-kommentin tunnettu puute. Kun raja vietiin
    // avomerelle, rantaviiva kulkee kuvan halki yhtenä pätkänä ja täyttö
    // onnistuu. ÄLÄ KAVENNA ITÄRAJAA.
    //
    // meri: true eikä 'maa': maata on vain lännessä, joten tavallinen
    // vesipuolen täyttö osuu oikein. 'maa' ajettiin ja tuottaa lähes
    // saman kuvan, mutta se on Istanbulin sääntö (maata veden molemmin
    // puolin) eikä sitä pidä käyttää ilman sitä syytä. Ilman lippua
    // satama piirtyy nurinpäin: altaat täyttyvät ja laiturit jäävät
    // paperiksi. Pinta-alavaroitusta ei tule.
    rajat: { pohjoinen: 46.501, etela: 46.466, lansi: 30.724, ita: 30.776 },
    meri: true,
  },
  dubai: {
    // Khor Dubain suu: Bur Dubai etelärannalla, Deira pohjoisrannalla,
    // Al Shindaghan niemi lännessä. Vain vanha kaupunki — kaikki kuusi
    // kohdetta mahtuvat noin kahden kilometrin ruutuun, koska
    // helmenpyyntikylän mittakaava on juuri se.
    //
    // TORNIT JÄÄVÄT TAHALLAAN ULKOPUOLELLE. Burj Khalifa on 7,7 km
    // lounaassa ja Burj al Arab 14 km lännessä; kumpikin vaatisi
    // kymmenen kilometrin rajauksen, jolloin lahdelma kutistuisi
    // viivaksi eikä vanhasta kaupungista erottuisi mitään.
    rajat: { pohjoinen: 25.276, etela: 25.256, lansi: 55.284, ita: 55.312 },
  },
  doha: {
    // Dohan vanha ydin Corniche-rantakadun kaaressa: Souq Waqif ja
    // Msheirebin kortteli lännessä, Islamilaisen taiteen museo omalla
    // tekosaarellaan pohjoisessa ja kansallismuseo kaakossa. Noin 3,8 km
    // leveä ruutu — West Bayn pilvenpiirtäjät jäävät pohjoiseen kartan
    // ulkopuolelle, koska koko lahden mahduttaminen kutistaisi
    // Cornichen kaaren viivaksi eikä vanhasta keskustasta erottuisi
    // mitään. Al Bidda -puisto (25.308) jää samasta syystä ulos.
    //
    // Itäreuna 51.556 ei ole sattumaa: kansallismuseo on 51.5495, ja
    // 51.548:n rajaus jätti sen juuri ja juuri ulkopuolelle.
    //
    // meri: true — Dohanlahti on OSM:ssä pelkkää rantaviivaa eikä
    // yhtään vesimonikulmiota, joten ilman lippua koko kuvan
    // yläkolmannes jäi paperinvalkoiseksi ja Cornichen kaari näytti
    // pelkältä kadulta. Katsottu molemmin päin (12.8.2026).
    rajat: { pohjoinen: 25.302, etela: 25.278, lansi: 51.518, ita: 51.556 },
    meri: true,
  },
  masqat: {
    // VAIN VANHA MASQAT, EI MUTRAHIA — ja se on mitattu päätös.
    // Ensimmäinen rajaus (58,558–58,604) otti molemmat kylät mukaan,
    // koska ne ovat kaupungin todellinen muoto. Kuva oli kelvoton:
    // Mutrahin ja vanhan Masqatin välissä on paljasta vuorta ilman
    // yhtään katua, joten keskelle jäi valtava tyhjä paperiala ja
    // molemmat kylät kutistuivat pikkuruisiksi laitoihin. Nyt kuvassa
    // on muurien sisäinen vanhakaupunki: Al Alamin palatsi, Jalalin ja
    // Miranin linnakkeet, Bait Al Zubair ja Masqatin portti mahtuvat
    // alle kahden kilometrin ruutuun.
    //
    // meri: true — Omaninlahti on OSM:ssä rantaviivaa ilman
    // vesimonikulmiota, sama tilanne kuin Dohassa.
    // Eteläreuna 23,6085 eikä 23,610: Motishwar Mandir, Omanin vanhin
    // hindutemppeli, jäi ensimmäisessä rajauksessa 33 metriä kuvan
    // ulkopuolelle. Se on kuudes karttakohde ja ainoa, joka ei ole
    // linnake tai palatsi, joten sen takia kannatti siirtää reunaa.
    // Länsireuna 58,5805 kahdesta syystä. Ensin se siirrettiin 58,586:sta
    // 58,584:ään, koska Masqatin portti (58,5869) osui 5 %:n kohdalle ja
    // numeroympyrä olisi ollut kiinni kuvan reunassa. Sitten vielä
    // 58,5805:een, koska Motishwar Mandir osui vasempaan alakulmaan
    // mittakaavajanan päälle (tools/tarkista-karttapisteet.mjs).
    // Eteläreunaa kokeiltiin ensin janan väistämiseen, mutta se toi
    // kuvan alalaitaan puolikilometrisen kaistan tyhjää wadia; leveämpi
    // rajaus vie temppelin janan ohi ilman sitä hintaa.
    rajat: { pohjoinen: 23.6205, etela: 23.6085, lansi: 58.5805, ita: 58.602 },
    meri: true,
  },
  kuwait: {
    // Kuwait Cityn vanha ydin: Mubarakiyan tori ja kansallismuseo
    // lännessä, Seifin palatsi rannassa, Kuwait-tornit niemen kärjessä
    // koillisessa. Tornit ovat kaupungin tunnus, joten ne otetaan
    // mukaan, vaikka rajaus venyy sen takia n. 4,3 km:iin.
    // Itäreuna 48,010 eikä 48,006: ensimmäisessä ajossa Kuwait-tornit
    // osuivat 94 %:n kohdalle, jolloin numeroympyrä olisi ollut
    // kiinni kuvan reunassa.
    // Eteläreuna 29,366 eikä 29,370: Sadu House päätyi 80 %:n
    // korkeudelle vasempaan alakulmaan, jossa lehti piirtää
    // mittakaavajanan, ja numeroympyrä peitti janan tekstin
    // (tools/tarkista-karttapisteet.mjs). Etelässä on tiivistä
    // kaupunkia, joten reunan siirto ei tuota tyhjää paperia.
    rajat: { pohjoinen: 29.392, etela: 29.366, lansi: 47.962, ita: 48.010 },
    meri: true,
  },
  nikosia: {
    // Venetsialaisten muurien ympäröimä vanhakaupunki mahtuu lähes
    // kokonaan: Famagustan portti idässä, Kyproksen museo lännessä,
    // Faneromeni keskellä. Muurikehä on halkaisijaltaan vain noin
    // puolitoista kilometriä, joten rajaus on pieni (n. 2,6 km) —
    // laajempi hukuttaisi tähtimuotoisen muurin esikaupunkeihin.
    //
    // Ei meri-lippua: Nikosia on ainoa pääkaupunki tässä erässä, joka
    // ei ole meren rannalla.
    // Rajausta siirretty 0,003 astetta pohjoiseen ensimmäisen ajon
    // jälkeen: muurikehä istui kuvan yläkolmanneksessa ja alalaitaan
    // jäi pelkkää esikaupunkia. Nyt tähtimuoto on keskellä.
    rajat: { pohjoinen: 35.184, etela: 35.166, lansi: 33.350, ita: 33.378 },
  },
  damaskos: {
    // Damaskoksen muurien sisäinen vanhakaupunki: linnoitus ja
    // Hamidiyyan suuki lännessä, Umaijadien moskeija keskellä,
    // roomalaiset portit idässä ja etelässä. Rajaus on leveä ja matala,
    // koska vanhakaupunki on itä-länsi-suuntainen suorakaide.
    rajat: { pohjoinen: 33.516, etela: 33.5045, lansi: 36.299, ita: 36.32 },
  },
  tabriz: {
    // Tabrizin keskusta: basaari ja perustuslakitalo pohjoisessa, Arg
    // lounaassa, Saat-torni keskellä sekä Sininen moskeija ja
    // Azerbaidžanin museo idässä. Ruutu on lähes neliö (1,7 x 1,6 km).
    //
    // KOHTEET TARKISTETTIIN LÄHTEISTÄ ENNEN PIIRTOA (Riadin opetus):
    // jokaisella kuudella on englanninkielinen Wikipedia-artikkeli, ja
    // koordinaatit on otettu artikkelien coord-malleista ja
    // ristiintarkistettu Overpassista. Jameh-moskeija jätettiin pois,
    // koska se on 130 metrin päässä basaarista ja numeroympyrät
    // menisivät päällekkäin.
    rajat: { pohjoinen: 38.085, etela: 38.07, lansi: 46.286, ita: 46.304 },
  },
  teheran: {
    // Teheranin vanha ydin: basaari etelässä, Golestanin palatsi ja
    // Dar al-Fonun sen pohjoispuolella, kansallismuseo lännessä sekä
    // Masoudiehin talo ja Sepahsalarin moskeija idässä. Ruutu on lähes
    // neliö (2,6 x 2,4 km).
    //
    // KOHTEET TARKISTETTIIN LÄHTEISTÄ ENNEN PIIRTOA (Riadin opetus).
    // Koordinaatit ovat artikkelien coord-malleista:
    //   Grand Bazaar, Tehran      35,6750 / 51,4194
    //   Golestan Palace           35,6797 / 51,4203  (Unesco)
    //   Dar al-Fonun              35,6838 / 51,4219
    //   National Museum of Iran   35,6870 / 51,4146
    //   Masoudieh Mansion         35,6890 / 51,4281
    //   Sepahsalar Mosque         35,6888 / 51,4329
    // Shams-ol-Emareh jätettiin pois, koska se on Golestanin palatsin
    // sisällä. Abginehin lasimuseo, National Garden ja Park-e Shahr
    // ovat lähteellisiä varakohteita, jos jokin näistä osoittautuu
    // ongelmalliseksi.
    //
    // palvelutiet: true, ja syy on MITATTU Bagdadin ohjeen mukaan.
    // Ensimmäinen ajo (2,6 x 2,4 km ilman lippua) antoi 1 636
    // elementtiä, mutta juuri basaarin kortteli jäi tyhjäksi paperiksi.
    // Overpassin laskenta samalle ruudulle:
    //   highway=residential  1 307 way
    //   highway=service        262 way
    //   highway=footway        720 way
    //   building               447 way
    // Basaarin katetut kujat ovat service- ja footway-teitä, eivät
    // residentialia. Työkalu ei piirrä footwaytä lainkaan (sama
    // rajoitus kuin Tallinnassa), joten servicen mukaanotto on se osa,
    // joka on saatavissa. Rakennuksia työkalu ei piirrä millään
    // kaupungilla, joten niiden 447 ei ole tässä ratkaisevaa.
    // jalkakaydat: true — ja tämä on koko työkalun uusi taso, joka
    // lisättiin juuri Teheranin takia (13.8.2026). Palvelutiet yksin
    // eivät riittäneet: toisella ajolla basaarin kortteli oli yhä
    // tyhjää paperia, vaikka se on kartan tärkein kohde. Syy on sama
    // kuin Tallinnassa mitattiin, mutta Tallinnassa se hyväksyttiin,
    // koska kartan juoni oli muurirengas — täällä juoni on basaari.
    // Teheranin katetut kujat ovat OSM:ssä footway-teitä (720 kpl
    // ruudussa), eikä työkalu piirtänyt niitä millään kaupungilla.
    // Taso on lippujen takana kuten palvelutiet, joten yksikään vanha
    // kartta ei muutu.
    //
    // REUNUS 17.8.2026 (E00-viimeistely, sama kuin Tampere ja
    // Firenze): piirretty alue on 1,6-kertainen eli 3,6 × 3,7 km,
    // lepotila yhä alla oleva rajat-alue. Reunukselle osuvat
    // Baharestanin aukio idässä, Park-e Shahr etelässä ja
    // Enghelab-kadun linja pohjoisessa.
    rajat: { pohjoinen: 35.692, etela: 35.6715, lansi: 51.4115, ita: 51.4365 },
    laajennus: 1.6,
    palvelutiet: true,
    jalkakaydat: true,
  },
  tokio: {
    // Tokion vanha shitamachi: Asakusan temppelipiiri idässä ja Uenon
    // kukkula lännessä, väliin jää Kappabashi ja vanhan kaupungin
    // ruutukaava. Ruutu on leveä ja matala (3,1 x 2,1 km), koska nämä
    // kaksi ryhmää ovat itä-länsi-linjalla.
    //
    // MIKSI JUURI TÄMÄ NURKKA TOKIOSTA. Tokion maamerkit ovat
    // hajallaan kymmenien kilometrien alueella — keisarillinen
    // palatsi, Meiji-pyhäkkö, Tokyo Tower ja Skytree eivät mahdu
    // mihinkään yhteen kaupunkikartan ruutuun. Shitamachi on ainoa
    // nurkka, jossa kuusi lähteellistä kohdetta on kävelymatkan
    // päässä toisistaan, ja se on myös se Tokio, joka on vanhin.
    //
    // KOHTEET TARKISTETTIIN LÄHTEISTÄ ENNEN PIIRTOA. Artikkelinimien
    // makronit kaatoivat ensin haun (Sensō-ji, Ueno Tōshō-gū,
    // Yushima Tenmangū) — sama ansa kuin Riadissa ja Isfahanissa,
    // eli nimi on haettava hakukoneella eikä arvattava. Pisteet ovat
    // artikkelien coord-malleista:
    //   Kaminarimon        35,7111 / 139,7964
    //   Sensō-ji           35,7147 / 139,7968
    //   Kan'ei-ji          35,7214 / 139,7743
    //   Tokyo Nat. Museum  35,7191 / 139,7758  (Overpassista, ks. alla)
    //   Ueno Park          35,7122 / 139,7711
    //   Shitamachi Museum  35,7102 / 139,7726
    // Hōzōmon ja Asakusa Shrine ovat lähteellisiä varakohteita, mutta
    // molemmat ovat alle 200 metrin päässä Sensō-jistä, joten
    // numeroympyrät menisivät päällekkäin.
    //
    // KAKSI MITATTUA KORJAUSTA ENSIMMÄISEEN RAJAUKSEEN. Ensimmäinen
    // ruutu (35,7055-35,724 / 139,7655-139,7995) piirtyi hyvin, mutta
    // tarkista-karttapisteet löysi kaksi vikaa: Yushima Tenmangū
    // (8,2 % / 87,6 %) peitti mittakaavajanan, ja Asakusan pari oli
    // 91-92 %:n kohdalla eli kiinni oikeassa reunassa. Yushima
    // vaihdettiin kansallismuseoon ja ruutua levennettiin.
    //
    // Kansallismuseon piste EI ole artikkelin coord-mallista, koska
    // sitä ei ole: artikkelissa on {{Coord|format=dms|display=it}} ja
    // koordinaatti tulee Wikidatasta. Piste on siksi haettu
    // Overpassista (way 東京国立博物館 / Tokyo National Museum).
    //
    // REUNUS 17.8.2026 (E00-viimeistely, sama kuin Tampere ja
    // Firenze): piirretty alue on 1,6-kertainen eli 5,0 x 3,5 km,
    // mutta lepotilassa lehti näyttää yhä tarkalleen alla olevan
    // rajat-alueen. Reunukselle osuvat Yanakan temppelikortteli
    // luoteessa, Kappabashin keittiövälinekatu etelässä ja
    // Sumida-joen itäranta — juuri sitä shitamachia, jonne
    // panorointi jatkuu karttaa suurennettaessa.
    rajat: { pohjoinen: 35.7245, etela: 35.705, lansi: 139.7645, ita: 139.801 },
    laajennus: 1.6,
  },
  isfahan: {
    // Isfahanin vanha ydin: Jameh-moskeija pohjoisessa, basaari sen
    // eteläpuolella, Ali Qapu ja Shaahin moskeija Naqsh-e Jahanin
    // laidoilla ja etelässä Hasht Behesht ja Chahar Baghin koulu.
    // Ruutu on 2,7 x 2,2 km.
    //
    // KOHTEET TARKISTETTIIN LÄHTEISTÄ ENNEN PIIRTOA. Oikeat
    // artikkelinimet eivät olleet ne, joita ensin kokeilin — sama
    // ansa kuin Riadissa. Toimivat nimet ja coord-mallien pisteet:
    //   Jameh Mosque of Isfahan  32,6697 / 51,6853
    //   Grand Bazaar, Isfahan    32,6631 / 51,6753
    //   Ali Qapu                 32,6572 / 51,6767
    //   Shah Mosque (Isfahan)    32,6544 / 51,6775
    //   Hasht Behesht            32,6534 / 51,6702
    //   Chaharbagh School        32,6513 / 51,6693
    // Qeysarie Gate on lähteellinen varakohde. Khaju-silta, Vankin
    // katedraali ja Monar Jonban jäävät ulos: ne ovat 2,5–8 km
    // etelässä ja lännessä, ja mukaan ottaminen kaksinkertaistaisi
    // rajauksen. Naqsh-e Jahanin aukio itse on varattu IRN-maalehdelle.
    //
    // EI palvelutiet- eikä jalkakaydat-lippua, ja se on mitattu:
    // ruudussa on 1 754 residential-tietä mutta vain 68 service-tietä,
    // eli katuverkko on jo valmiiksi tiheä ilman lippuja.
    rajat: { pohjoinen: 32.6725, etela: 32.6485, lansi: 51.666, ita: 51.689 },
  },
  riad: {
    // Riad: vanhankaupungin ydin etelässä, Murabban hallintokortteli
    // pohjoisessa. Ruutu on lähes neliö (2,4 x 2,0 km).
    //
    // ENSIMMÄINEN RAJAUS OLI VÄÄRÄ, JA SYY EI OLLUT KARTASSA VAAN
    // LÄHTEISSÄ. Tiukka vanhankaupungin ruutu (24,6265-24,6345 /
    // 46,708-46,722) piirtyi hyvin ja kaikki kuusi pistettä osuivat
    // maalle, mutta kohteista neljällä EI OLE englanninkielistä
    // Wikipedia-artikkelia lainkaan: Souq al-Zal, Qasr al-Hukm,
    // Thumairin portti ja Deeran aukio palauttavat 404, eikä
    // Riad-artikkeli mainitse niitä. Peli kirjoitetaan en-Wikipediasta,
    // joten kohteiksi kelpaavat vain ne, joista on lähde.
    //
    // Tarkistetut ja lähteelliset kohteet (koordinaatit artikkelien
    // coord-malleista, ristiintarkistettu Overpassista):
    //   Al Masmak Palace              24,6311 / 46,7133  (8,7 kt)
    //   Imam Turki b. Abdullah Mosque 24,6307 / 46,7108  (9,0 kt)
    //   Al Hamra Palace (Punainen)    24,6425 / 46,7092
    //   Riyadh Water Tower            24,6450 / 46,7122  (9,8 kt)
    //   Murabba Palace                24,6465 / 46,7093  (16,9 kt)
    //   National Museum of Saudi Ar.  24,6472 / 46,7108  (14,1 kt)
    // Diriya ja At-Turaif ovat varattuja: ne ovat SAU-maalehdessä ja
    // kulttuurivisassa.
    rajat: { pohjoinen: 24.65, etela: 24.628, lansi: 46.7, ita: 46.722 },
  },
  luxor: {
    // Luxor: Niilin itäranta Luxorin temppeliltä Karnakille. Kohteiden
    // väli on poikkeuksellisen pitkä (2,3 km temppelistä temppelille),
    // mutta rajaus on silti perusteltu, koska sfinksikuja yhdistää ne
    // suorana linjana kartan halki — se on kaupungin selkäranka eikä
    // tyhjää väliä. Länsiranta ja Kuninkaiden laakso jäävät ulos: ne
    // ovat joen toisella puolella 5 km lännessä.
    //
    // Eteläreuna on laskettu 25,6930:een tarkoituksella. Luxorin
    // temppeli osuisi tiukemmassa rajauksessa 86 %:n korkeudelle
    // vasemmalle, eli suoraan mittakaavajanan päälle; nyt se on 78 %:ssa.
    //
    // VALMIS 20.8.2026 — KESKEN-merkintä 13.8.2026 on poistettu, ja
    // tässä on mitä sen aikana puuttui. Silloin kartta oli kelvollinen
    // mutta laiha, ja syy mitattiin: Luxorin ja Karnakin temppelialueet
    // EIVÄT ole OSM:ssä rakennuksia vaan historic=ruins /
    // archaeological_site -alueita, eikä piirtotyökalu pyytänyt niitä
    // lainkaan. Karnakin ulkomuuri näkyi vain siksi, että se on erikseen
    // way-viiva. Arkeologisten alueiden taso lisättiin kyselyyn
    // (way["historic"~"^(ruins|archaeological_site)$"], ks. haeOverpass)
    // ja rauniokaupunki-lippu v930:ssa, ja tässä ne otetaan käyttöön:
    // nyt molemmat temppelipiirit piirtyvät omina laikkuinaan reunoineen.
    //
    // EI jalkakaydat- eikä palvelutiet-lippua, ja se on mitattu
    // kuvasta eikä oletettu: pelkkä rauniokaupunki riitti. Luxorissa
    // vaiva oli päinvastainen kuin Petrassa ja Jerusalemissa — kaduista
    // ei ollut puutetta, koska temppelien ympärillä on nykyinen kaupunki
    // tiheine kortteleineen, vaan puuttuvat olivat itse temppelipiirit.
    // Sfinksikuja piirtyi jo ennen lippua omana viivanaan ja piirtyy yhä.
    rajat: { pohjoinen: 25.7225, etela: 25.693, lansi: 32.6335, ita: 32.6625 },
    rauniokaupunki: true,
  },
  halab: {
    // Aleppo. Avain on halab, koska laudan kaupunki-id on halab.
    // Aleppon muurien sisäinen vanhakaupunki: linnoitus idässä,
    // kaupunginportit lännessä ja etelässä, suukin khanit keskellä.
    // Rajaus on tiukka, koska vanhakaupunki on tiivis ja kujaverkko
    // tiheä — laajempi ruutu hukuttaisi sen esikaupunkeihin.
    rajat: { pohjoinen: 36.2075, etela: 36.193, lansi: 37.146, ita: 37.168 },
  },
  ankara: {
    // Ulus eli vanha Ankara: linnavuori idässä, Augustuksen temppeli ja
    // roomalainen kylpylä pohjoisessa, Anatolian sivilisaatioiden museo
    // etelässä. Kızılayn moderni keskusta jää tarkoituksella ulos —
    // kaupungin vanha kerros on kokonaan tässä ruudussa.
    // Rajaus kiristettiin ensimmäisen ajon jälkeen. Ensimmäinen ruutu
    // (39,935-39,949 / 32,848-32,870, n. 2,9 km²) näytti autiolta, ja
    // syy MITATTIIN ennen kuin sitä korjattiin: Overpass antoi ruudulle
    // 491 way pelin luokissa ja 693 kaikkiaan, eli 71 % kaduista oli jo
    // mukana. Kyse ei siis ollut Bagdadin tagausongelmasta vaan siitä,
    // että Ulusin korttelit ovat isoja ja linnavuorella on vähän läpi
    // kulkevia katuja. Pienempi ruutu nostaa tiheyden ilman lippuja.
    rajat: { pohjoinen: 39.948, etela: 39.936, lansi: 32.851, ita: 32.868 },
  },
  jerusalem: {
    /*
     * Muurien sisäinen vanhakaupunki kokonaan: Jaffan portti lännessä,
     * Damaskoksen portti pohjoisessa, ja itäreunalla temppelivuoren
     * laaja aukio. Ruutu on tiukka (n. 1,4 x 1,6 km), koska
     * vanhakaupunki on tiivis kujaverkko — laajempi rajaus hukuttaisi
     * sen ympäröiviin kaupunginosiin.
     *
     * Palvelutiet ja jalkakäytävät ovat päällä, koska vanhankaupungin
     * kujat ovat OSM:ssä pääosin footway- ja service-teitä; ilman
     * lippuja kortteleiden väliin jäisi tyhjää paperia.
     */
    rajat: { pohjoinen: 31.7865, etela: 31.772, lansi: 35.221, ita: 35.244 },
    jalkakaydat: true,
    palvelutiet: true,
    /*
     * RAUNIOKAUPUNKI-LIPPU EI OLE TÄSSÄ RAUNIOISTA vaan piirtotavasta:
     * se nostaa polut asuinkadun vahvuuteen. Vanhankaupungin kujat ovat
     * OSM:ssä footway- ja service-teitä aivan kuten Petran polut, ja
     * ilman lippua muurien sisäpuoli piirtyi lähes tyhjänä — kokeiltu
     * ja katsottu ensin ilman.
     */
    rauniokaupunki: true,
  },
  petra: {
    /*
     * Petra ei ole kaupunki vaan raunioalue vuoristolaaksossa.
     * Rajaus kattaa muinaiskaupungin kokonaan: idässä Siqin suu,
     * lännessä Ad Deir, ja niiden välissä laakso, jossa ovat teatteri,
     * kuninkaanhaudat, pylväskatu ja temppelit.
     *
     * ENSIMMÄINEN RAJAUS OTTI MUKAAN MYÖS WADI MUSAN, ja se katsottiin
     * silmin: porttikaupungin tiheä katuverkko täytti kuvan oikean
     * kolmanneksen ja muinaiskaupunki jäi tyhjäksi paperiksi sen
     * vieressä, vaikka kaikki kohteet ovat juuri siellä. Wadi Musa
     * kerrotaan siksi matkailijan oppaassa eikä kartalla.
     *
     * ITÄREUNA ON 35,4665 eikä 35,464, ja ero on kohteen mittainen:
     * Bab as-Siqin obeliskihauta osui tiukemmassa rajauksessa 1,8
     * prosenttiyksikön päähän reunasta, eli sen numeroympyrä olisi
     * mennyt kuvan laidan yli. Nyt se on 92 prosentissa.
     *
     * Jalkakäytävät ja polut ovat päällä, koska ne OVAT tämän kartan
     * kadut: Siq, hautojen katu ja Ad Deirin portaat ovat OSM:ssä
     * highway=path. Ilman lippua kuvassa olisi pelkkä maantie.
     */
    rajat: { pohjoinen: 30.341, etela: 30.3175, lansi: 35.427, ita: 35.4665 },
    jalkakaydat: true,
    palvelutiet: true,
    rauniokaupunki: true,
  },
  persepolis: {
    /*
     * Persepolis ei ole kaupunki vaan YKSI RAKENNUSRYHMÄ: kivinen
     * terassi Rahmat-vuoren kupeessa. Terassi itse on vain noin
     * 450 × 300 metriä, eli tämä on koko kartaston tiukin rajaus —
     * 770 × 520 metriä. Laveampi ruutu olisi tyhjää tasankoa, koska
     * lähin nykyinen asutus (Marvdasht) on kilometrien päässä.
     *
     * ENSIMMÄINEN RAJAUS OLI LEVEÄMPI (52,8865–52,8960) JA KATSOTTIIN.
     * Se otti mukaan myös Artakserkses II:n haudan, joka on 200 metriä
     * muita idempänä vuoren kyljessä — ja koska hauta on OSM:ssä
     * historic=tomb eikä ruins, piirtotyökalu ei hae sitä lainkaan:
     * kuvan oikea kolmannes jäi tyhjäksi paperiksi, jonka keskellä olisi
     * ollut yksi numeroympyrä ilman mitään ympärillään. Hauta jätettiin
     * siksi kartalta pois ja ruutu kiristettiin terassin ympärille.
     * Artakserkses III:n hauta on mukana: se on kiinni terassin
     * itäkyljessä ja osuu nyt 82 prosenttiin leveydestä.
     *
     * KOORDINAATIT OVAT OVERPASSISTA, EIVÄT WIKIPEDIASTA, ja ero on
     * kohteen mittainen. en-Wikipedian Gate of All Nations -artikkeli
     * antaa portille pisteen 29,934444 / 52,891389, mutta OSM:ssä portti
     * (way 95531813) on 29,93618 / 52,889078 — 250 metriä koillisempana.
     * Wikipedian piste osuu tällä kartalla suunnilleen aarrekammion
     * kohdalle. Terassi on niin pieni, että 250 metriä on neljännes
     * kuvan leveydestä, joten OSM voittaa (Tokion kansallismuseon
     * ennakkotapaus: piste haetaan Overpassista, kun artikkelin oma
     * koordinaatti ei kelpaa).
     *
     * jalkakaydat JA palvelutiet päällä ja rauniokaupunki: true kuten
     * Petrassa, ja tässä se on MITATTU eikä peritty. Overpass antaa
     * rajaukselle 149 highway-viivaa, ja ne jakautuvat näin: 118
     * footway, 19 steps, 9 path, 2 service ja 1 pedestrian. Tavallisia
     * katuja (residential, tertiary, secondary…) ei ole yhtäkään, eikä
     * steps ole KADUT-taulussa lainkaan. Ilman kahta lippua kartalle
     * piirtyisi siis TÄSMÄLLEEN YKSI viiva. Rakennukset puuttuisivat
     * niiden lisäksi kokonaan, koska palatsit ovat historic=ruins
     * -alueita eivätkä building-monikulmioita.
     */
    rajat: { pohjoinen: 29.9372, etela: 29.9325, lansi: 52.8858, ita: 52.8938 },
    jalkakaydat: true,
    palvelutiet: true,
    rauniokaupunki: true,
  },
  medina: {
    /*
     * Keskusta Profeetan moskeijan ympärillä: idässä Al-Baqin
     * hautausmaa, lännessä Qiblatayn-moskeija, luoteessa Ruman kaivo
     * ja etelässä Hidžaz-radan asema-alue. Ruutu on 5,4 × 4,8 km —
     * väljempi kuin Euroopan ytimet, koska varhaisislamin kohteet
     * ovat vanhan muurikaupungin ULKOPUOLELLA eri suunnissa; itse
     * muurikaupunki purettiin 1900-luvulla, joten tiivistä vanhaa
     * ydintä ei ole.
     *
     * Quba-moskeija on 3,5 km kaakkoon eikä mahdu samaan ruutuun
     * venyttämättä kuvaa pystypuuroksi — se on KAINALOKARTTANA
     * oikeassa alakulmassa, joka on suuntana oikea (Wienin ja
     * Budapestin malli). Uhud-vuori (4,5 km pohjoiseen) jää kartalta
     * kokonaan: se on vuori eikä katuverkon kohde, ja se kerrotaan
     * lehden teksteissä.
     */
    rajat: { pohjoinen: 24.499, etela: 24.456, lansi: 39.571, ita: 39.624 },
    /*
     * Jalkakäytävät ja palvelutiet päällä samasta syystä kuin
     * Jerusalemissa: Profeetan moskeijan ympäristö ja Quban aukio
     * ovat OSM:ssä jalankulkualueita ja huoltoteitä, ja ilman lippuja
     * juuri kartan pääkohteen ympärys piirtyi tyhjänä paperina —
     * kokeiltu ensin ilman ja katsottu.
     */
    jalkakaydat: true,
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 24.4455, etela: 24.433, lansi: 39.61, ita: 39.6245 },
        x: 78, y: 76.8, leveys: 20, suunta: '3,5 km kaakkoon',
      },
    ],
  },
  sana: {
    /*
     * TIIVIS RAJAUS UNESCON VANHANKAUPUNGIN YMPÄRILLE (erä 4,
     * 20.8.2026). Ruutu on 1,9 × 1,7 km ja siihen mahtuu koko
     * muurikaupunki: pohjoisessa Bab Sha'ub, etelässä Bab al-Yaman,
     * idässä Qasr al-Silah ja lännessä Wadi al-Sailahin toisella
     * puolella al-Mahdin moskeija. Rajaus on tarkoituksella pieni:
     * Sanaan koko kaupunkialue on kymmeniä kilometrejä pitkä laakso,
     * ja kaikki lehden kohteet ovat muurien sisällä tai niiden
     * vieressä — laajempi ruutu olisi tehnyt vanhastakaupungista
     * pienen läikän keskelle uutta kaupunkia.
     *
     * KAINALOA EI OLE. Toisin kuin Medinassa tai Mekassa, yhtään
     * lehden kohdetta ei jää ruudun ulkopuolelle: Jabal Nuqum on
     * vuori eikä katuverkon kohde, ja se kerrotaan oppaassa.
     *
     * JALKAKÄYTÄVÄT JA PALVELUTIET PÄÄLLÄ. Vanhankaupungin kujat
     * ovat OSM:ssä valtaosin highway=footway ja highway=service
     * eivätkä tavallisia katuja — ilman lippuja muurien sisus
     * piirtyi lähes tyhjänä paperina, jossa näkyi vain al-Sailahin
     * uomaa myötäilevä ajotie. Kokeiltu ensin ilman ja katsottu,
     * sama ratkaisu kuin Vilnassa, Jerusalemissa ja Medinassa.
     */
    rajat: { pohjoinen: 15.363, etela: 15.348, lansi: 44.206, ita: 44.224 },
    jalkakaydat: true,
    palvelutiet: true,
  },
  aden: {
    /*
     * KRAATTERIKAUPUNKI JA SATAMA (erä 4, 20.8.2026). Pääruutu on
     * Crater eli Seera, sammuneen tulivuoren pohja: 2,4 × 2,9 km,
     * pohjoisessa Adenin portti (Main Pass), idässä Siran saari ja
     * lounaassa Tawilan altaat. Ruudun etelä- ja länsireuna on
     * Jabal Shamsanin rinnettä, jolle ei ole rakennettu — tyhjyys
     * on siis aitoa maastoa eikä puuttuvaa aineistoa.
     *
     * KAINALOSSA TAWAHI eli entinen Steamer Point, runsaat kuusi
     * kilometriä länsiluoteeseen niemen toisella puolella. Sinne
     * höyrylaivat tulivat ja siellä on Big Ben Aden. Väli on
     * kapeaa kannasta ja satamavesiä, joten yhteen ruutuun
     * mahtuessaan kraatteri kutistuisi lukukelvottomaksi — sama
     * ratkaisu kuin Medinassa ja Mekassa. Kainalo on vasemmassa
     * ylänurkassa, joka on suuntana oikea.
     *
     * PALVELUTIET PÄÄLLÄ, JALKAKÄYTÄVÄT EIVÄT. Craterin korttelien
     * sisäkujat ovat OSM:ssä service-teitä, ja ilman niitä kuvaan
     * jäi vain muutama pääkatu. Jalkakäytäviä kokeiltiin myös,
     * mutta ne toivat lähinnä rantabulevardin kaksinkertaisena
     * viivana.
     */
    rajat: { pohjoinen: 12.791, etela: 12.769, lansi: 45.023, ita: 45.053 },
    palvelutiet: true,
    /*
     * meri: true. Adeninlahti on OSM:ssä pelkkää rantaviivaa eikä
     * vesimonikulmiota, ja ensimmäisessä koeajossa ilman lippua koko
     * satama ja Siran salmi jäivät paperin värisiksi — rantaviiva
     * piirtyi yksinäisenä nauhana, joka näytti tieltä. Katsottu ja
     * korjattu.
     */
    meri: true,
    kainalot: [
      {
        rajat: { pohjoinen: 12.7955, etela: 12.7845, lansi: 44.9755, ita: 44.9875 },
        /*
         * x: 14 eikä 2. Kahdella prosentilla suuntateksti keskittyy
         * kohtaan 12 % kuvan leveydestä, ja "6 km länsiluoteeseen"
         * on puolet leveämpi kuin se — teksti leikkautui kuvan
         * vasempaan reunaan. Sama Budapestin oppi kuin pystysuunnassa.
         */
        x: 14, y: 2, leveys: 20, suunta: '6 km länsiluoteeseen', meri: true,
      },
    ],
  },
  mekka: {
    /*
     * Ydin Suuren moskeijan ympärillä: Kaaba lännessä, kellotorni
     * etelässä, Jannat al-Mu'allan hautausmaa pohjoisessa ja Al-Adlin
     * hautausmaa itäreunalla. Ruutu on 3,8 × 3,1 km. Kaaba, Maqam
     * Ibrahim, Zamzamin kaivo ja Safa–Marwa ovat kaikki saman
     * moskeijan sisällä muutaman kymmenen metrin säteellä — ne ovat
     * YKSI kartan kohde (numeroympyrät menisivät täysin päällekkäin,
     * Petran oppi), ja loput kerrotaan sen jutussa.
     *
     * Jabal al-Nour (Hiran luola) on 5,3 km koilliseen eikä mahdu
     * ruutuun — se on KAINALOKARTTANA oikeassa ylänurkassa, joka on
     * suuntana oikea ja jossa on vain vuorenrinnettä.
     */
    /*
     * ENSIMMÄINEN RAJAUS ULOTTUI AL-ADLIN HAUTAUSMAALLE ITÄÄN
     * (ita 39.857) ja KATSOTTIIN: keskusta jäi vasempaan alakulmaan
     * ja kuvan itäinen kolmannes oli tyhjää vuorenrinnettä. Al-Adl
     * jäi siksi kartalta (kerrotaan teksteissä), ja ruutu tiivistyi
     * laakson ympärille: Suuren moskeijan kehä lounaassa, Jinnien
     * moskeija ja Jannat al-Mu'alla pohjoisessa.
     *
     * Jalkakäytävät ja palvelutiet päällä samasta syystä kuin
     * Medinassa: moskeijan ympäristö on jalankulkualuetta.
     */
    rajat: { pohjoinen: 21.4425, etela: 21.4145, lansi: 39.816, ita: 39.846 },
    jalkakaydat: true,
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 21.4645, etela: 21.4515, lansi: 39.8545, ita: 39.8685 },
        x: 78, y: 2, leveys: 20, suunta: '5,3 km koilliseen',
      },
    ],
  },
  salalah: {
    /*
     * Salalahin rantakaistale Sultan Qaboosin suurmoskeijalta
     * Al-Baleedin raunioille: moskeija ja Al-Husnin palatsi lännessä,
     * Al-Haffan basaari rannassa, Nabi Umranin hauta ja Burj
     * an-Nahdan kellotorni keskellä ja itäreunalla Al-Baleedin
     * arkeologinen puisto suitsukemuseoineen. Ruutu on noin
     * 5,9 × 4,6 km eli leveämpi kuin korkea, ja se on kaupungin oma
     * muoto: Salalah on nauha meren ja Dhofarin vuorten välissä,
     * eivätkä kohteet ole missään ytimessä vaan yhdessä rivissä
     * rannikon suuntaan.
     *
     * ENSIMMÄINEN RAJAUS ULOTTUI LÄNNESSÄ 54,080:aan, jotta
     * kulttuurikeskuksen Salalah Museum olisi mahtunut mukaan. Se
     * jätettiin pois kahdesta syystä: museosta ei ole Commonsissa
     * yhtään vapaata kuvaa, ja lisäkilometri teki ruudusta 6,7 km
     * leveän eli suhteettoman matalan. Nyt kohteita on seitsemän
     * kuten Medinassa.
     *
     * LENTOASEMA JÄI KARTALTA (17,0400 / 54,0906). Se on noin
     * kilometrin pohjoisreunan yläpuolella, ja sen ottaminen mukaan
     * olisi venyttänyt ruudun pohjoisosan pelkäksi kiitotieksi ja
     * aavikoksi. Lentoasema kerrotaan matkailijan oppaassa.
     *
     * ETELÄREUNA 16,9915 EIKÄ 16,995, ja se on mitattu korjaus.
     * Ensimmäisellä rajauksella Al-Husnin palatsi osui 88,7 %:n
     * korkeudelle eli tarkalleen mittakaavajanan päälle
     * (tools/tarkista-karttapisteet.mjs; sama vika kuin Masqatissa
     * ja Kööpenhaminassa). Reunaa vietiin 390 metriä etelämmäs, ja
     * piste nousi 81,2 %:iin. KOKEILTIIN ENSIN LEVEYDELLÄ: länsireuna
     * 54,082 nosti pisteen 24,3 %:iin sivusuunnassa, mutta samalla
     * jana vaihtui kilometristä kahteen ja levisi 17 %:sta 31 %:iin —
     * osuma vain paheni. Leveyttä ei siis kannata kasvattaa janan
     * takia, koska jana kasvaa mukana.
     *
     * meri: true — Arabianmeri on OSM:ssä Dohan ja Masqatin tapaan
     * pelkkää rantaviivaa ilman vesimonikulmiota, joten ilman lippua
     * kuvan alalaita jäisi paperinvalkoiseksi. Khawr Salalah ja muut
     * rannikon laguunit ovat sen sijaan omia vesialueitaan.
     */
    rajat: { pohjoinen: 17.033, etela: 16.9915, lansi: 54.088, ita: 54.143 },
    meri: true,
  },
  mosul: {
    /*
     * RAJAUS KATTAA MOLEMMAT RANNAT, ja se on harkittu ratkaisu eikä
     * laiskuus. Mosulin vanhakaupunki on Tigriin länsirannalla, mutta
     * kaupungin toinen puoli on kirjaimellisesti toisella rannalla:
     * Kuyunjikin ja Nabi Yunusin kummut eli antiikin Ninive nousevat
     * itäpuolella runsaan kilometrin päässä joesta. Pelkkä länsiranta
     * jättäisi Niniven kartan ulkopuolelle, ja pelkkä Ninive jättäisi
     * kaupungin. Ruutu on noin 5,2 × 4,0 km, ja Tigris kulkee sen
     * halki lounaasta koilliseen.
     *
     * Länsireuna 43,112 riittää Bash Tapian linnalle (43,1217) ja
     * Qara Saraylle (43,1257); itäreuna 43,170 vie Nabi Yunusin
     * kummun (43,1594) yli. Pohjoisreuna 36,368 kattaa Kuyunjikin
     * (36,3594) ja eteläreuna 36,332 Mosulin museon (36,3379).
     *
     * Jalkakäytävät ja palvelutiet päällä samasta syystä kuin
     * Medinassa ja Mekassa: vanhankaupungin kujat ovat OSM:ssä
     * jalankulkuväyliä ja huoltoteitä, ja ilman lippuja juuri se
     * korttelisto, jonka takia kartta piirretään, jää tyhjäksi.
     */
    rajat: { pohjoinen: 36.368, etela: 36.332, lansi: 43.112, ita: 43.17 },
    jalkakaydat: true,
    palvelutiet: true,
  },
  bangkok: {
    /*
     * RATTANAKOSININ SAARI JA SEN ITÄPUOLI (20.8.2026). Ruutu on noin
     * 4,8 × 3,4 km: lännessä Wat Arun Thonburin rannalla, keskellä
     * Rattanakosinin keinosaari (Suurpalatsi, Wat Phra Kaew, Wat Pho,
     * Sanam Luang), idässä Wat Saketin Kultainen vuori, Yaowarat-katu
     * ja kaakossa Hua Lamphongin rautatieasema. Chao Phraya kaartaa
     * kuvan halki S-kirjaimena, ja Rattanakosinin itäpuolella erottuu
     * kanavarengas (Khlong Rop Krung), joka teki saaresta saaren.
     *
     * Damnoen Saduakin kelluva tori EI ole kartalla: se on noin 63 km
     * lounaaseen (laskettu koordinaateista 13,5193/99,9592, ja
     * tarkistusraportti vahvisti luvun; Floating market -artikkelin
     * oma sanallinen arvio on "noin 100 km"). Se kerrotaan oppaassa
     * päiväretkenä — sama ratkaisu kuin Medinan Uhud-vuorella.
     *
     * Jalkakäytävät ja palvelutiet päällä samasta syystä kuin
     * Medinassa ja Mekassa: temppelien ja palatsin ympäristöt ovat
     * OSM:ssä jalankulkualueita ja huoltoteitä.
     */
    rajat: { pohjoinen: 13.7625, etela: 13.7315, lansi: 100.4805, ita: 100.5245 },
    jalkakaydat: true,
    palvelutiet: true,
  },
  peking: {
    /*
     * KEISARIKAUPUNGIN AKSELI (20.8.2026). Ruutu seuraa Pekingin
     * pohjois–etelä-pääakselia: pohjoisessa Yonghe-temppeli ja Rumpu-
     * ja kellotornit, keskellä Kielletty kaupunki, Jingshan ja
     * Tiananmen, etelässä Zhengyangmen ja Taivaan temppeli. Ruutu on
     * noin 7,7 × 9,3 km eli hieman korkeampi kuin leveä — se on
     * kaupungin oma muoto, sillä kaikki kahdeksan ydinkohdetta ovat
     * samalla akselilla tai parin kilometrin päässä siitä.
     *
     * TAIVAAN TEMPPELI MÄÄRÄÄ ETELÄREUNAN. Se on 3,1 km Tiananmenista
     * etelään, ja ilman sitä ruutu olisi tiiviimpi — mutta temppeli
     * on lehden pääkohteita eikä sitä voi jättää pois. Piste osuu
     * 88 %:n korkeudelle KUVAN OIKEASSA laidassa (x 68 %), joten se
     * ei osu vasemman alakulman mittakaavajanaan (Salalahin oppi
     * tarkistettu tools/tarkista-karttapisteet.mjs:llä).
     *
     * KAINALOSSA KESÄPALATSIT: Kesäpalatsi (Yiheyuan) ja Vanha
     * kesäpalatsi (Yuanmingyuan) ovat noin 14 km luoteeseen eivätkä
     * mahdu mihinkään järkevään pääruutuun — sama ratkaisu kuin
     * Medinassa ja Adenissa, ja x: 14 on Adenin oppi suuntatekstin
     * leikkautumisesta. Molemmat kohteet ovat samassa kainalossa,
     * koska niiden väli on vain puolitoista kilometriä.
     *
     * JALKAKÄYTÄVÄT JA PALVELUTIET PÄÄLLÄ: Kielletty kaupunki,
     * Jingshan ja Taivaan temppelin puisto ovat OSM:ssä
     * jalankulkualueita ja huoltoteitä, ja ilman lippuja juuri
     * kartan pääkohteet piirtyisivät tyhjinä kenttinä — sama syy
     * kuin Medinassa ja Mekassa.
     */
    rajat: { pohjoinen: 39.956, etela: 39.872, lansi: 116.345, ita: 116.435 },
    jalkakaydat: true,
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 40.014, etela: 39.99, lansi: 116.256, ita: 116.303 },
        x: 14, y: 2, leveys: 20, suunta: '14 km luoteeseen',
      },
    ],
  },
  delhi: {
    /*
     * VANHA DELHI ELI SHAHJAHANABAD (20.8.2026). Ruutu on noin
     * 3,3 × 2,3 km ja kattaa muurikaupungin ytimen: Punainen
     * linnoitus idässä Yamunan rantakaistaleeseen asti, Chandni
     * Chowkin katu keskellä länteen Fatehpuri-moskeijalle, Jama
     * Masjid etelässä ja Delhi Junctionin asema luoteessa. Kaikki
     * seitsemän pääkartan kohdetta ovat kävelymatkan päässä
     * toisistaan — sama tiivis muurikaupunkirajaus kuin Sanaassa.
     *
     * MIKSI TÄMÄ NURKKA DELHISTÄ. Delhi on megakaupunki, jonka
     * historialliset kohteet ovat "seitsemän kaupungin" perinnön
     * takia kymmenien kilometrien päässä toisistaan: Qutb Minar on
     * 15,6 km lounaaseen, Humayunin mausoleumi 7 km ja Purana Qila
     * 5 km etelään. Mikään yksi ruutu ei kata niitä muuttumatta
     * puuroksi (Soulin ja Shanghain oppi) — ja Vanha Delhi on juuri
     * se Delhi, jossa isoisä käveli vuonna 1873.
     *
     * KAINALOSSA HUMAYUNIN MAUSOLEUMI, 7 km etelään. Se on ainoa
     * kaukokohde, joka on lehdessä omana juttunaan; Qutb Minar ja
     * Purana Qila kerrotaan historiasivun nostoissa ilman
     * karttapistettä (Medinan Uhud-vuoren ratkaisu). Kainalon
     * prosentit ovat piirretystä kuvasta Helsingin kaavalla
     * (18,75 + ydin × 0,625).
     *
     * Jalkakäytävät ja palvelutiet päällä samasta syystä kuin
     * Medinassa ja Mosulissa: Vanhan Delhin kujat ovat OSM:ssä
     * valtaosin service- ja footway-luokkaa, ja ilman lippuja juuri
     * muurikaupungin korttelisto jäisi tyhjäksi paperiksi.
     */
    rajat: { pohjoinen: 28.6665, etela: 28.6455, lansi: 77.216, ita: 77.2495 },
    laajennus: 1.6,
    jalkakaydat: true,
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 28.5985, etela: 28.588, lansi: 77.244, ita: 77.258 },
        x: 67.5, y: 63.75, leveys: 12.5, suunta: '7 km etelään',
      },
    ],
  },
  jekaterinburg: {
    /*
     * SIPERIAN ERÄ (20.8.2026). Rajaus on Iset-joen ydinkeskusta:
     * pohjoisessa Kharitonovin kartano Nousemuksen kukkulalla,
     * etelässä Kolminaisuuden katedraali, lännessä Plotinkan pato ja
     * rahapajan portit, idässä Rosa Luxemburgin katu. Ruutu on noin
     * 2,9 × 2,9 km eli lähes neliö, ja se on tarkoituksella tiukka:
     * Jekaterinburgin kaupunkialue on Uralin itärinteellä kymmeniä
     * kilometrejä pitkä, mutta kaikki 1800-luvun kohteet ovat padon
     * ja Leninin valtakadun risteyksen ympärillä.
     *
     * VANHA RAUTATIEASEMA (1878) ON KAINALOSSA, koska se on 2,3 km
     * pohjoiseen: samaan ruutuun mahtuessaan ydin olisi kutistunut
     * niin, että Suuren Zlatoustin ja kuvataidemuseon numeroympyrät
     * (270 metriä toisistaan) olisivat menneet päällekkäin. Sama
     * ratkaisu kuin Medinassa ja Adenissa; kainalo on vasemmassa
     * ylänurkassa, joka on suuntana oikea.
     *
     * VALKOINEN TORNI (Uralmash, 6,5 km pohjoiseen) JÄI KARTALTA
     * KOKONAAN. Se on lehden oppaassa omalla kuvallaan: kaksi
     * kainaloa samaan reunaan olisi tehnyt kuvasta levottoman, ja
     * torni on tehdaskaupunginosan kohde eikä vanhan keskustan.
     *
     * palvelutiet: true. Historiallisen aukion ja padon ympärys on
     * OSM:ssä valtaosin service-teitä ja jalankulkuväyliä; ilman
     * lippua kartan länsilaita jäi lähes tyhjäksi paperiksi.
     */
    rajat: { pohjoinen: 56.849, etela: 56.8225, lansi: 60.585, ita: 60.633 },
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 56.8635, etela: 56.8545, lansi: 60.5955, ita: 60.6065 },
        x: 2.5, y: 2, leveys: 20, suunta: '2,3 km pohjoiseen',
      },
    ],
  },
  novosibirsk: {
    /*
     * SIPERIAN ERÄ (20.8.2026). Rajaus alkaa siitä, mistä kaupunkikin:
     * lounaisnurkassa on ensimmäisen Ob-sillan paikka, ja siitä
     * koilliseen nousee Punainen valtakatu Nikolauksen kappelin ja
     * kaupungin kauppatalon ohi Novosibirsk-Glavnyin asemalle.
     * Ruutu on noin 3,9 × 3,6 km. Obin uoma tulee mukaan koko
     * länsilaidalle, ja se on tarkoituksellista: joki on syy siihen,
     * että kaupunki on olemassa.
     *
     * KAINALOA EI OLE. Akademgorodok on kolmenkymmenen kilometrin
     * päässä etelässä eikä ole katuverkon kohde vaan oma kaupunkinsa
     * metsässä — se kerrotaan lehden nostossa ja oppaassa. Yhtään
     * kartan kohdetta ei jää ruudun ulkopuolelle.
     *
     * meri: true, koska Ob on OSM:ssä leveä vesimonikulmio, joka ei
     * sulkeudu rajauksen sisällä; ilman lippua joen länsipuoli jäi
     * paperin väriseksi.
     *
     * palvelutiet: true. Ensimmäinen ajo ilman lippua katsottiin:
     * Novosibirskin korttelit ovat isoja ja niiden sisukset ovat
     * OSM:ssä service-teitä, joten kartta jäi harvaksi verkoksi
     * pääkatuja ja Obin molemmat rannat lähes tyhjiksi. Lipun kanssa
     * korttelien sisus piirtyy ja kaupunki näyttää kaupungilta.
     */
    rajat: { pohjoinen: 55.04, etela: 55.005, lansi: 82.885, ita: 82.942 },
    meri: true,
    palvelutiet: true,
  },
  irkutsk: {
    /*
     * SIPERIAN ERÄ (20.8.2026). Rajaus on Angaran mutka: pohjoisessa
     * Znamenskin luostari Ušakovkan suulla, keskellä Kirovin aukio eli
     * vuoden 1661 linnoituksen paikka, etelässä 130. kortteli ja
     * lännessä joen toisella rannalla Glaskovon rautatieasema. Ruutu
     * on noin 4,0 × 3,9 km.
     *
     * BAIKAL EI OLE KARTALLA EIKÄ KAINALOSSA, ja se on päätös eikä
     * unohdus. Järvi alkaa 72 kilometrin päästä ylävirtaa (en-Wikipedia,
     * Irkutsk: "72 km below its outflow from Lake Baikal"), eli
     * kolmekymmentä kertaa kauempana kuin yksikään tähänastinen
     * kainalo — Medinan Quba on 3,5 km, Adenin Tawahi 6 km. Sen
     * kokoisessa hypyssä kainalon mittakaava olisi aivan toinen kuin
     * pääkartan, ja ruutuun mahtuisi vain nimetön pala rantaviivaa.
     * Baikal kerrotaan oppaan omassa jaksossa, ja sillä on jo
     * lehdessä kokonainen teemasivu. Yhteys näkyy silti kartalla:
     * Angara tulee kuvaan järvestä.
     *
     * JÄÄNMURTAJA ANGARA ON KAINALOSSA (6 km kaakkoon, Irkutskin
     * tekoaltaalla). Se on 1900-luvun alun Baikalin lauttalaiva ja
     * siksi juuri se kohde, joka sitoo kaupungin järveen.
     *
     * palvelutiet: true. 130. korttelin ja Kirovin aukion väliset
     * kujat ovat OSM:ssä service-teitä.
     */
    rajat: { pohjoinen: 52.306, etela: 52.27, lansi: 104.253, ita: 104.312 },
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 52.2555, etela: 52.245, lansi: 104.338, ita: 104.35 },
        x: 78, y: 76.8, leveys: 20, suunta: '6 km kaakkoon',
      },
    ],
  },
  jakutsk: {
    /*
     * RAJAUS ON KESKUSTA JA JOEN RANTA, 3,5 × 2,7 km. Jakutsk on
     * kokonaan Lenan länsirannalla, ja kaikki kohteet ovat runsaan
     * kahden kilometrin nauhassa Kirovin ja Leninin katujen välissä
     * (129,7116–129,7478). Pohjoisreuna 62,042 on valittu niin, että
     * Lenan uoma ja Moskovan rantakatu tulevat kuvaan: joki on
     * kaupungin ainoa yhteys ulos ennen lentokentän aikaa, ja ilman
     * sitä kartta olisi pelkkää ruutukaavaa.
     *
     * EI meri-lippua: Lena on OSM:ssä way «Лена», joka täyttyy
     * vesialueena normaalisti.
     *
     * KAUPUNGIN JÄRVET OVAT TAHALLAAN MUKANA. Talooje (62,0308 /
     * 129,7290), Solдatskoje (62,0376 / 129,7472), Gubinskoje
     * (62,0406 / 129,7469) ja Kaupunkikanava (62,0300 / 129,7192)
     * ovat termokarstipainanteita sulaneen ikiroudan päällä — ne
     * ovat kartan ainoa merkki siitä, mistä kaupungin maaperässä on
     * kyse, ja siksi rajaus on vedetty niiden yli eikä ohi.
     */
    rajat: { pohjoinen: 62.042, etela: 62.0178, lansi: 129.701, ita: 129.768 },
  },
  magadan: {
    /*
     * RAJAUS 3,8 × 2,9 km, ja se on vedetty lahdelta ylös kaupunkiin.
     * Magadan istuu kannaksella kahden lahden välissä: Nagajevanlahti
     * lounaassa ja Gertnerinlahti koillisessa. Kartta ottaa niistä
     * lounaisen, koska satama on siinä ja koska koko kaupungin syy
     * olla olemassa on tämä lahti.
     *
     * ENSIMMÄINEN RAJAUS OLI 2,9 × 2,3 km (lansi 150,770), ja se
     * hylättiin mitattuna: silloin lahti jäi vasempaan reunaan
     * kahdentoista prosentin kaistaleeksi ja kaikki muut kohteet
     * puristuivat 64–87 prosentin väliin. Nyt länsireuna on
     * 150,755, lahti täyttää vasemman kolmanneksen ja kohteet
     * asettuvat 31–90 prosentin välille.
     *
     * Pohjoisreuna 59,5764 ottaa mukaan Kolyman valtatien
     * nollakilometrin (59,5702) — kaupungin ainoan maayhteyden ulos —
     * ja eteläreuna 59,5502 aluemuseon (59,5585).
     *
     * meri: true, koska Nagajevanlahden rantaviiva kulkee kuvan
     * halki yhtenä pätkänä (Odessan tapaus) — ilman lippua lahti jää
     * paperin väriseksi.
     */
    rajat: { pohjoinen: 59.5764, etela: 59.5502, lansi: 150.755, ita: 150.822 },
    meri: true,
  },
  izmir: {
    // Konakin aukio, Kemeraltin basaari ja antiikin agora mahtuvat
    // samaan runsaan puolentoista kilometrin ruutuun, ja niiden väli on
    // yhtenäistä vanhaa kaupunkia — ei tyhjää kuten Masqatissa.
    // Kadifekale jää ulos: linnavuori on 1,5 km itään ja sen ja agoran
    // välissä on jyrkkä rinne, joka venyttäisi rajauksen kaksinkertaiseksi.
    rajat: { pohjoinen: 38.426, etela: 38.413, lansi: 27.124, ita: 27.142 },
  },
  soul: {
    /*
     * Soulin vanha ydin Jongnon kaupunginosassa, 2,6 x 2,4 km.
     * Ruutu alkaa pohjoisessa Bukchonin hanok-korttelista ja päättyy
     * etelässä Cheonggyecheon-puroon, joka juoksee kuvan alalaidassa
     * lännestä itään. Vasemmalla on Gyeongbokgungin palatsialue
     * isona suorakaiteena, oikealla Changdeokgung ja sen alapuolella
     * Jongmyon metsäinen esi-isien pyhäkkö — kolme suurta vihreää
     * saareketta muuten tiiviissä ruudukossa.
     *
     * MIKSI TÄMÄ NURKKA SOULISTA. Soul on megakaupunki, jonka
     * maamerkit ovat kymmenien kilometrien päässä toisistaan:
     * Namsanin torni, Gangnam, Han-joki ja Olympiapuisto eivät mahdu
     * mihinkään yhteen kaupunkikartan ruutuun. Jongno on ainoa
     * nurkka, jossa kuusi lähteellistä kohdetta on kävelymatkan
     * päässä toisistaan — ja se on myös se Soul, joka on vanhin:
     * Joseon-dynastia perusti pääkaupunkinsa juuri tähän vuonna 1394.
     * Han-joki jää 3 km etelään, Namsan 1,5 km, Sungnyemunin portti
     * 1 km lounaaseen. Mukaan ottaminen kolminkertaistaisi ruudun ja
     * muuttaisi vanhan ytimen täpläksi (Firenze-oppi).
     *
     * KOHTEIDEN PISTEET LÄHTEISTÄ, ei arvattuina. Viisi on
     * en-Wikipedian coord-malleista ja Jongmyo Wikidatan P625:stä,
     * koska artikkelissa ei ole koordinaattia:
     *   Gyeongbokgung   37,5799 / 126,9768
     *   Bukchon         37,5831 / 126,9836
     *   Changdeokgung   37,5794 / 126,9928
     *   Jongmyo         37,5747 / 126,9936  (Wikidata Q483948)
     *   Tapgol-puisto   37,5711 / 126,9885
     *   Bosingak        37,5699 / 126,9834
     *
     * palvelutiet: true — Bukchonin hanok-kujat ja Insadongin
     * sivukujat ovat OSM:ssä service-teitä, ja ilman niitä kartan
     * pohjoisosa jää tyhjäksi paperiksi juuri siinä kohdassa, jossa
     * kohde on. Sama ratkaisu kuin Vilnassa ja Bagdadissa.
     */
    rajat: { pohjoinen: 37.587, etela: 37.5655, lansi: 126.9695, ita: 126.9985 },
    laajennus: 1.6,
    palvelutiet: true,
  },
  shanghai: {
    /*
     * Huangpu-joki tulee kuvaan oikeasta alakulmasta, kaartaa
     * pohjoiseen ja poistuu oikeasta ylälaidasta; sen mutkan sisään
     * jää Bund eli Waitan, ja mutkan pohjoispäässä Suzhou-puro
     * yhtyy jokeen. Joki on kuvan juoni samalla tavalla kuin Tiber
     * Roomassa: kaikki kuusi kohdetta ovat sen länsipuolella,
     * rannasta 2,5 kilometrin päähän länteen.
     *
     * MIKSI TÄMÄ NURKKA SHANGHAISTA. Kaupungissa on 25 miljoonaa
     * asukasta ja sen tunnetut kohteet ovat kymmenien kilometrien
     * päässä toisistaan (Longhua etelässä, Jing'an lännessä,
     * Zhujiajiao 50 km länteen). Bundin ja vanhankaupungin välinen
     * kaistale on ainoa nurkka, jossa kuusi lähteellistä kohdetta on
     * kävelymatkan päässä toisistaan — ja se on se Shanghai, joka
     * kasvoi 1800-luvulla sopimussatamana eli isoisän aikaan.
     *
     * PUDONG JÄÄ TAHALLAAN REUNUKSELLE. Helmitorni on 121,4998 eli
     * 430 metriä itärajan takana. Sisään ottaminen leventäisi ruudun
     * 3,4 kilometriin ja litistäisi vanhankaupungin kujaverkon
     * kuvan alalaitaan — sama virhe kuin Firenzen ensimmäisessä
     * ajossa. Laajennus 1,6 näyttää Pudongin heti, kun karttaa
     * suurentaa, ja lehden esittely kertoo mihin suuntaan se jää.
     *
     * KOHTEIDEN PISTEET LÄHTEISTÄ. Viisi on en-Wikipedian
     * coord-mallista ja Shanghain museo Wikidatan P625:stä:
     *   Bund (Waitan)      31,2380 / 121,4861
     *   Waibaidun silta    31,2431 / 121,4900
     *   Rauhanhotelli      31,2411 / 121,4846
     *   Yu-puutarha        31,2292 / 121,4875
     *   Nanjing-katu       31,2347 / 121,4744
     *   Shanghain museo    31,2303 / 121,4706  (Wikidata)
     * Kaupunginjumalan temppeli on lähteellinen varakohde mutta vain
     * 165 metriä Yu-puutarhasta, joten numeroympyrät menisivät
     * päällekkäin — sama ratkaisu kuin Tokion Hōzōmonin kanssa.
     *
     * palvelutiet: true — vanhankaupungin kujat Yu-puutarhan
     * ympärillä ja Bundin takakorttelien sisäpihat ovat OSM:ssä
     * service-teitä. Ilman niitä kuvan itäosa on pelkkiä
     * pääkatuja.
     */
    rajat: { pohjoinen: 31.248, etela: 31.224, lansi: 121.4655, ita: 121.4955 },
    laajennus: 1.6,
    palvelutiet: true,
  },
  bagdad: {
    // Rusafan vanha puoli Tigrisin itärannalla: Mutanabbin kirjakatu,
    // abbasidipalatsi, Qishlan kellotorni ja Bagdadin museo ovat
    // kaikki noin kilometrin säteellä. Joki halkaisee kuvan, ja
    // länsirannalta otetaan mukaan sen verran, että sillat näkyvät.
    // Shahid-monumentti (5 km itään) ja Mustansiriyan yliopiston
    // nykykampus jäävät tarkoituksella ulos — keskiaikainen
    // Mustansiriya-koulu on rajauksen sisällä.
    //
    // palvelutiet: true, ja tämä oli aluksi VÄÄRIN DIAGNOSOITU.
    // Ensimmäisellä ajolla ruutu antoi 441 elementtiä (Nikosia 1457,
    // Doha 2387), ja siitä pääteltiin, että Bagdadin katuverkko on
    // OSM:ssä ohut ja kaupunki jätettiin erästä pois. Päätelmä oli
    // väärä. Overpassin laskenta samalle ruudulle:
    //   pelin vakioluokat   381 way
    //   kaikki highway     1096 way
    //   building           2682 way
    // Aineistoa on siis runsaasti, mutta Rusafan vanhan puolen kujat on
    // merkitty pääosin service- ja footway-teiksi eikä residentialiksi.
    // Vakiokysely jättää servicen pois (ks. haeOverpass), joten kaksi
    // kolmasosaa kaduista jäi hakematta. Sama korjaus kuin Vilnassa.
    //
    // OPETUS: pieni elementtimäärä ei todista, että kaupunki on
    // kartoittamatta — se voi tarkoittaa, että kadut on tagattu
    // luokkiin, joita vakiokysely ei pyydä. Laske ensin
    // `way["highway"]` ilman luokkasuodatinta ja vertaa.
    //
    // REUNUS 17.8.2026 (E00-viimeistely, sama kuin Tampere ja
    // Firenze): piirretty alue on 1,6-kertainen eli 3,6 × 2,8 km,
    // lepotila yhä alla oleva rajat-alue. Reunukselle osuvat Karkhin
    // puoli lännessä siltoineen, Bab al-Sheikh idässä ja Tigrisin
    // mutka etelässä.
    rajat: { pohjoinen: 33.348, etela: 33.332, lansi: 44.376, ita: 44.400 },
    laajennus: 1.6,
    palvelutiet: true,
  },
  tripoli: {
    /*
     * Tripolin medina on pieni: muurien sisäpuoli on noin 600 × 700
     * metriä, eli koko vanhakaupunki mahtuu Dubrovnikin kokoiseen
     * ruutuun. Rajaus on siksi tarkoituksella TIUKKA (0,77 × 0,75 km,
     * lähes neliö) — Firenzen oppi: laajempi ruutu tekisi ytimestä
     * täplän 1900-luvun ruutukaavan keskelle.
     *
     * Ensimmäinen ajo 1,3 × 1,0 km:n ruudulla mitattiin ja hylättiin:
     * medina jäi kuvan vasempaan puoliskoon ja kuuden kohteen väliin
     * jäi niin vähän pikseleitä, että an-Naqan ja Karamanlin
     * moskeijoiden numeroympyrät (75 m toisistaan) olisivat menneet
     * päällekkäin. Tiukempi ruutu kasvattaa välit eikä jätä yhtään
     * kohdetta ulkopuolelle.
     *
     * Kuvassa on koko se alue, jota matkailijan Tripoli tarkoittaa:
     * muurirengas, sen sisällä kujaverkko, pohjoisreunalla Marcus
     * Aureliuksen riemukaari ja kaakkoisnurkassa Punainen linna.
     * Meri tulee reunukseen ylhäältä ja oikealta: medina on
     * niemekkeellä, ja juuri siksi kaupunki on tässä.
     *
     * Kohteiden koordinaatit on ristiintarkistettu Overpassista ja
     * en-Wikipedian coord-malleista 17.8.2026.
     *
     * palvelutiet JA jalkakaydat: true. Medinan kujat ovat OSM:ssä
     * lähes kokonaan footway- ja service-teitä (mitattu ruudulle
     * 32.8858–32.9086 / 13.1678–13.1902), joten vakiokysely jättäisi
     * vanhankaupungin tyhjäksi paperiksi — sama vika kuin Vilnassa ja
     * Bagdadissa, mutta täällä vielä jyrkempänä.
     */
    rajat: { pohjoinen: 32.9009, etela: 32.8942, lansi: 13.174, ita: 13.1822 },
    laajennus: 1.6,
    palvelutiet: true,
    jalkakaydat: true,
    meri: true,
  },
  vladivostok: {
    /*
     * Niemen kärki kahden veden välissä: Amurinlahti jää kuvan
     * vasempaan laitaan ja Kultaisen sarven lahti työntyy kuvaan
     * oikeasta alakulmasta. Niiden välissä on ruutukaava, jonka kaksi
     * pääkatua ovat kuvan juoni — Svetlanskaja kulkee Kultaisen
     * sarven rantaa idän suuntaan ja Aleutskaja kohtisuoraan sitä
     * vastaan niemen mittaan, ja rautatieasema on niiden risteyksessä
     * (en-Wikipedia "Vladivostok", Urban layout). Ruutu on
     * 3,9 × 2,9 km ja kattaa kaikki yhdeksän kohdetta
     * Pokrovskin puistosta pohjoisessa Kultaisen sarven siltaan
     * etelässä.
     *
     * ETELÄRAJA 43,1035 EIKÄ tiukempi: Kultaisen sarven sillan
     * kohdepiste on sillan keskellä lahden yllä (43,1089), ja
     * tiukemmalla rajalla se putoaisi mittakaavajanan korkeudelle.
     * Nyt piste on 80 %:n korkeudella ja kaukana vasemman alakulman
     * janasta (x 67 %).
     *
     * TOKAREVIN MAJAKKA JÄI POIS (43,073 / 131,843): se on niemen
     * kärjessä 4,5 km lounaaseen, ja mukaan ottaminen olisi
     * kaksinkertaistanut ruudun ja tehnyt keskustasta täplän.
     * Kainaloa ei tehty, koska majakan ympärillä ei ole katuverkkoa —
     * ruutu olisi tyhjää paperia kuten Tallinnan laulukentästä.
     * Majakka mainitaan oppaassa. Russkin saaren silta jää samasta
     * syystä pois (5 km etelään).
     *
     * meri: true — Japaninmeri on OSM:ssä täällä pelkkää rantaviivaa
     * ilman vesimonikulmioita, ja ilman lippua sekä Amurinlahti että
     * Kultainen sarvi jäisivät paperin värisiksi. Tavallisella
     * rajauksella täyttö osuu oikein: molemmat lahdet vettä, niemi
     * kuivana, laiturit piirtyvät sormina.
     *
     * EI laajennusta, JA SE ON MITATTU PÄÄTÖS eikä unohdus. Reunus
     * kokeiltiin (laajennus 1.6, koeajot 20.8.2026): laajennetulla
     * alueella rantaviiva pilkkoutuu niin moneksi pätkäksi (Egeršeld,
     * Tšurkin, Kultaisen sarven pohjukka), että vesipuolten unioni
     * peittäisi 142 % rajauksesta ja työkalu putoaa rantanauhaan —
     * silloin KUMPIKAAN lahti ei täyty ja satamakaupungilta katoaa
     * vesi. Myös meri: 'maa' kokeiltiin laajennuksen kanssa: maan
     * renkaat sulkeutuvat väärin ja peittävät lahdetkin paperilla.
     * Ilman laajennusta täyttö toimii, ja vesi on tässä kuvassa
     * tärkeämpi kuin reunus.
     */
    rajat: { pohjoinen: 43.13, etela: 43.1035, lansi: 131.864, ita: 131.912 },
    meri: true,
  },
  singapore: {
    /*
     * JOEN SUU JA SEN KAUPUNGINOSAT (20.8.2026). Ruutu on
     * 4,2 × 3,6 km ja se kattaa kaikki kymmenen lehden kohdetta:
     * pohjoisessa Kampong Glamin Sultan-moskeija, keskellä
     * Singapore-joen suu siltoineen ja laitureineen, lännessä
     * Fort Canningin kukkula, etelässä Chinatownin kaksi temppeliä
     * ja idässä Marina Bayn takaa Gardens by the Bay.
     *
     * RUUTU ON VÄLJEMPI KUIN ITSE KLUSTERI, JA SE ON HARKITTU.
     * Kahdeksan kohdetta kymmenestä mahtuu 1,5 kilometrin
     * ympyrään joen suulla — tiukka rajaus olisi ollut kaunis,
     * mutta se olisi jättänyt pois sekä Kampong Glamin (2,4 km
     * koilliseen) että Gardens by the Bayn (2,2 km itään). Kumpikin
     * on lehden oma kohde ja kummankin ympärillä on katuverkkoa,
     * joten kainalokartta olisi ollut väärä ratkaisu: kainalo on
     * niitä varten, joiden ympärillä on tyhjää (Medinan Quba,
     * Adenin Tawahi). Nyt kaikki kymmenen ovat samassa ruudussa,
     * ja joen suun tihein rykelmä avautuu zoomaamalla.
     *
     * CAVENAGH-SILTA JÄI POIS KARTALTA, vaikka se on lehden
     * nostona: sen piste olisi runsaat sata metriä Empress Placen
     * pisteestä eli noin kaksi ja puoli prosenttia ruudun
     * leveydestä, ja numeroympyrät menisivät päällekkäin (Petran ja
     * Mekan oppi). Silta on Empress Placen jutussa ja omassa
     * nostossaan.
     *
     * PALVELUTIET PÄÄLLÄ, JALKAKÄYTÄVÄT EIVÄT. Boat Quayn ja Clarke
     * Quayn rantalaiturit sekä Chinatownin korttelien sisäkujat ovat
     * OSM:ssä service-teitä. Jalkakäytävät kokeiltiin myös, mutta
     * ne toivat rantabulevardit ja Marina Bayn kiertoreitin
     * kaksinkertaisina viivoina.
     *
     * meri: true. Marina Bay, Kallanginlahti ja sataman vedet ovat
     * täällä valtaosin rantaviivaa ilman vesimonikulmiota, ja ilman
     * lippua kartan koko itälaita jäi paperin väriseksi — joki
     * piirtyi silloin ainoana vetenä ja näytti kadulta.
     */
    rajat: { pohjoinen: 1.308, etela: 1.276, lansi: 103.836, ita: 103.874 },
    palvelutiet: true,
    meri: true,
  },
  samarkand: {
    /*
     * VANHA KAUPUNKI JA AFRASIYABIN KUMPU (21.8.2026). Ruutu on noin
     * 4,2 × 4,6 km ja se kattaa kaikki yhdeksän lehden kohdetta:
     * koillisessa Ulugbekin observatorio ja Khoja Doniyorin
     * mausoleumi, pohjoisessa Afrasiyabin rauniokumpu, keskellä
     * Shah-i-Zinda, Hazrat Khizr ja Bibi-Khanym, lounaassa Registan
     * ja Gur-e-Amir ja kaakossa Ishratkhana.
     *
     * RUUTU ON KOHTEIDEN RYKELMÄÄ VÄLJEMPI, ja se on harkittu.
     * Kohteet mahtuvat 3,1 × 3,5 kilometrin alueelle, mutta
     * Gur-e-Amir jäisi tiukassa rajauksessa vasempaan alakulmaan
     * mittakaavajanan päälle (Kööpenhaminan oppi: jana on kehyksen
     * vasemmassa alakulmassa, 3,2 % / 5 %). Eteläreunaa laskettiin
     * siksi runsaat kolmesataa metriä, ja länsireunaa vastaavasti.
     * Pohjoisreuna nousi vielä 170 metriä ensimmäisen piirroksen
     * jälkeen: observatorion numeroympyrä jäi lehdessä kartan oikean
     * ylänurkan opasteen alle, ja se näkyi vasta valmiissa lehdessä.
     *
     * CHORSUN KAUPPAKUPOLI JÄI KARTALTA POIS, vaikka se on lehden
     * kohde: se on runsaat sata metriä Registanin pisteestä eli noin
     * kolme prosenttia ruudun leveydestä, ja numeroympyrät menisivät
     * päällekkäin (Petran, Mekan ja Singaporen oppi). Kupoli
     * kerrotaan Registanin jutussa, jonka takapihalla se on.
     *
     * SIYOB-BASAARI JÄI POIS KAHDESTA SYYSTÄ. Sen ainoa
     * en-Wikipedian koordinaatti on kahden desimaalin tarkkuudella
     * (39,662 / 66,980), ja se osuu runsaan sadan metrin päähän
     * Bibi-Khanymin pisteestä — sama päällekkäisyys kuin Chorsulla.
     * Basaari kerrotaan Bibi-Khanymin jutussa ja oppaassa.
     *
     * Palvelutiet päällä: vanhan kaupungin kujat ja Registanin,
     * Shah-i-Zindan ja Afrasiyabin ympäristöt ovat OSM:ssä
     * service-teitä, ja ilman lippua kartan koko itäpuoli jäi
     * paperin väriseksi (kokeiltu ensin ilman ja katsottu).
     */
    rajat: { pohjoinen: 39.68, etela: 39.6385, lansi: 66.9615, ita: 67.011 },
    palvelutiet: true,
  },
  xian: {
    /*
     * MING-AJAN MUURIKAUPUNKI (21.8.2026). Ruutu on 5,4 × 4,1 km ja
     * sen sisällä on koko Xi'anin kaupunginmuuri: suorakaide, jonka
     * ulkomitat ovat Overpassin porttien mukaan noin 4,2 × 2,7 km ja
     * kehä 14 kilometriä (en-Wikipedia "Fortifications of Xi'an").
     * Rajaus on siis kaupungin oma vanha ääriviiva eikä piirtäjän
     * valitsema ikkuna — sama ratkaisu kuin Sanaassa ja Vanhassa
     * Delhissä, ja se on tässä poikkeuksellisen luonteva, koska
     * muuri on ehjä koko kierroksen.
     *
     * POHJOISREUNA ON VÄLJEMPI TARKOITUKSELLA. Xi'anin vanha
     * rautatieasema on 190 metriä muurin pohjoispuolella
     * (en-Wikipedia: "located just north of Xi'an's walled city"),
     * ja se on lehden kohde; ilman lisätilaa sen numeroympyrä
     * leikkautuisi yläreunaan. Nyt asema osuu 11 prosentin
     * korkeudelle.
     *
     * TERRAKOTTA-ARMEIJA JA QIN SHI HUANGIN HAUTAKUMPU EIVÄT OLE
     * KARTALLA. Ne ovat runsaat 30 kilometriä koilliseen
     * (en-Wikipedian koordinaateista laskien 33 ja 32 km), eli
     * kymmenkertaisesti kauempana kuin mikä tahansa kainalo tässä
     * kartastossa — Medinan Quba on 3,5 km ja Adenin Tawahi 6 km.
     * Kolmenkymmenen kilometrin hyppy tekisi kainalon mittakaavasta
     * aivan toisen kuin pääkartan, ja koko ruudun venyttäminen
     * sinne asti muuttaisi muurikaupungin pieneksi läiskäksi.
     * Armeija kerrotaan lehden nostossa ja kuvissa (Medinan
     * Uhud-vuoren ratkaisu).
     *
     * KAINALOSSA VILLIHANHIPAGODA JA SHAANXIN HISTORIALLINEN MUSEO,
     * noin 4,5 kilometriä etelään. Ne ovat Tang-kauden Chang'anin
     * alueella eteläpuolella muuria, ja niiden väli on vain
     * kilometri, joten sama kainalo riittää molemmille (Pekingin
     * kahden kesäpalatsin malli). Kainalo on oikeassa alakulmassa,
     * koska suunta on etelä-kaakko.
     *
     * JALKAKÄYTÄVÄT JA PALVELUTIET PÄÄLLÄ samasta syystä kuin
     * Pekingissä ja Medinassa: muslimikorttelin kujat Kellotornin ja
     * Rumpitornin välissä sekä moskeijan pihat ovat OSM:ssä
     * jalankulkualueita ja huoltoteitä, ja ilman lippuja juuri
     * kartan tihein kortteli jäisi tyhjäksi paperiksi.
     */
    rajat: { pohjoinen: 34.284, etela: 34.247, lansi: 108.9145, ita: 108.9735 },
    jalkakaydat: true,
    palvelutiet: true,
    kainalot: [
      {
        rajat: { pohjoinen: 34.229, etela: 34.216, lansi: 108.9465, ita: 108.9635 },
        x: 74, y: 60, leveys: 24, suunta: '4,5 km etelään',
      },
    ],
  },
  varanasi: {
    /*
     * VARANASI (21.8.2026). Ruutu on 6,1 × 6,1 km ja siihen mahtuu
     * koko lehden kaupunkipuoli: pohjoisessa Manikarnika Ghat ja
     * Kashi Vishwanath -temppeli, keskellä Dashashwamedh Ghat,
     * lännessä Durga Kundin allas, etelässä Assi Ghat ja joen
     * TOISELLA PUOLELLA idässä Ramnagarin linnoitus.
     *
     * RUUTU ON NELIÖ TAHALLAAN. Varanasin kohteet ovat luonnostaan
     * pohjois–eteläsuuntainen nauha jokirantaa pitkin: pelkkä nauha
     * (n. 4,6 × 2 km) olisi piirtynyt 1600 × 3600 pikselin
     * pystykaistaleeksi, korkeampana kuin yksikään paketin kartta
     * (korkein on Isfahan, 1600 × 1983). Rajausta levennettiin
     * itään ja länteen niin, että kuvasuhde on 1,00 ja korkeus
     * 1595 px — samalla ruutuun mahtuivat Durga Kund ja Ramnagar,
     * jotka olisivat muuten vaatineet oman kainalonsa.
     *
     * SARNATH ON KAINALOSSA oikeassa ylänurkassa. Dhamek- ja
     * Chaukhandi-stupat ovat runsaan seitsemän kilometrin päässä
     * pohjoisessa; samaan ruutuun otettuna kartta olisi venynyt
     * kaksitoista kilometriä korkeaksi ja kaupunki kutistunut
     * läikäksi (Medinan Quban ja Mekan Jabal al-Nourin ratkaisu).
     *
     * JALKAKÄYTÄVIÄ EI TARVITA, toisin kuin Vilnassa, Jerusalemissa
     * ja Sanaassa. Kokeiltu ennen piirtoa Overpassin out count
     * -kyselyllä: tässä ruudussa on 3 501 tavallista katua ja
     * jalkakäytävälippu toisi niiden lisäksi vain 202 polkua eli
     * viisi prosenttia. Vanhankaupungin kujat (gali) on siis merkitty
     * OSM:ään ajoteiksi, ei footwayksi, ja ne piirtyvät ilman lippua.
     */
    rajat: { pohjoinen: 25.318, etela: 25.263, lansi: 82.982, ita: 83.043 },
    kainalot: [
      {
        rajat: { pohjoinen: 25.385, etela: 25.37, lansi: 83.0155, ita: 83.0335 },
        x: 78, y: 2, leveys: 20, suunta: '7 km pohjoiseen',
      },
    ],
  },
  hanoi: {
    /*
     * VANHAKAUPUNKI, HOÀN KIẾM JA KEISARILINNA (21.8.2026). Ruutu on
     * noin 3,8 × 2,9 km, ja se kattaa lehden kaikki kahdeksan
     * kohdetta: koillisessa Long Biênin silta, pohjoisessa Đồng
     * Xuânin tori, lännessä keisarilinna, lippulinna ja Yhden pilarin
     * pagodi, keskellä Hoàn Kiếm ja Ngọc Sơnin temppeli, etelässä
     * Pyhän Joosefin katedraali ja Kirjallisuuden temppeli.
     *
     * RUUTU ON KOHTEIDEN RYKELMÄÄ VÄLJEMPI, ja se on harkittu.
     * Kohteet mahtuvat 2,6 × 1,6 kilometrin alueelle, mutta
     * Kirjallisuuden temppeli on niistä sekä läntisin että eteläisin
     * ja jäisi tiukassa rajauksessa suoraan vasempaan alakulmaan
     * mittakaavajanan päälle (Kööpenhaminan oppi: jana on kehyksen
     * vasemmassa alakulmassa, 3,2 % / 5 %). Länsi- ja eteläreunaa
     * väljennettiin siksi runsaat kuusisataa metriä kumpaakin, ja
     * itä- ja pohjoisreunaa saman verran, jotta kuvasuhde säilyy.
     * Temppeli asettuu näin viidennekseen leveydestä ja vajaaseen
     * neljännekseen korkeudesta — selvästi janan yläpuolelle.
     *
     * PUNAINENJOKI on ruudun koillisnurkassa, ja se on syy siihen,
     * että itäreuna on juuri tässä: Long Biênin silta on lehden
     * kohde, ja sillan pitää näkyä sekä joen ylittäjänä että
     * itärannan kanssa. Kauempana idässä on pelkkää hiekkasärkkää.
     *
     * Ô QUAN CHƯỞNGIN PORTTI JÄI KARTALTA POIS, vaikka se on
     * teemasivun noston aihe. Sillä ei ole omaa en-Wikipedian
     * artikkelia eikä siis infoboksikoordinaattia (ainoa löytynyt
     * piste on OpenStreetMapista), ja se on runsaat kaksisataa
     * metriä Đồng Xuânin torista eli noin kuusi prosenttia ruudun
     * leveydestä — numeroympyrät osuisivat päällekkäin (Petran,
     * Mekan, Singaporen ja Samarkandin oppi). Portti kerrotaan
     * noston H3 lisäksi Đồng Xuânin jutussa.
     *
     * OOPPERATALO JÄI POIS TOISESTA SYYSTÄ: sillä on koordinaatti
     * (21°01′27″N 105°51′28″E) ja se mahtuisi ruutuun, mutta
     * kahdeksan kohdetta oli täysi määrä ja ranskalaisajan
     * rakennuksista katedraali on lehden kannalta tärkeämpi (se on
     * matkaoppaan jakson 4 aihe). Oopperatalo mainitaan jaksossa 4.
     *
     * Palvelutiet päällä: Vanhankaupungin kujat ovat OSM:ssä
     * valtaosin service-teitä, ja ilman lippua juuri lehden tärkein
     * kortteli — Hoàn Kiếmin pohjoispuoli — jäi paperin väriseksi
     * (kokeiltu ensin ilman ja katsottu).
     */
    rajat: { pohjoinen: 21.049, etela: 21.0225, lansi: 105.828, ita: 105.865 },
    palvelutiet: true,
  },
  ulanbator: {
    /*
     * ULAN BATOR (21.8.2026). Ruutu on 5,5 × 5,4 km ja se kattaa
     * Tuulin laakson pohjoisrannan koko kaupunkiytimen: luoteessa
     * Gandantegchinlenin luostarikukkula, keskellä Sükhbaatarin
     * aukio ja kansallismuseo, lännessä rautatieasema, etelässä
     * kansallisstadion, Bogd Khanin talvipalatsi ja Zaisanin
     * muistomerkki Tuulin toisella puolella.
     *
     * RUUTU ON NELIÖ SAMASTA SYYSTÄ KUIN VARANASISSA. Kohteet ovat
     * 4,3 km korkealla ja vain 2,6 km leveällä nauhalla, koska
     * kaupunki kasvaa laaksoa pitkin; tiukka rajaus olisi piirtynyt
     * pystykaistaleeksi. Itä- ja länsireunaa levennettiin niin, että
     * kuvasuhde on 1,00 — samalla ruutuun tuli koko laakson
     * poikkileikkaus, joka on tämän kaupungin luettavin piirre:
     * jokilaakso, sen pohjoispuolinen ruutukaava ja etelässä
     * Bogd Khan -vuoren rinne.
     *
     * BOGD KHAN -VUORI JA MANJUSRIN LUOSTARIN RAUNIOT EIVÄT OLE
     * KARTALLA EIVÄTKÄ KAINALOSSA. Vuoren huippu on en-Wikipedian
     * koordinaatista laskien 13,8 km ja Manjusri 18 km keskustasta
     * eli kolmesta viiteen kertaa kauempana kuin yksikään kainalo
     * tässä kartastossa (Medinan Quba 3,5 km, Varanasin Sarnath
     * 7 km). Vuori kerrotaan lehden nostossa, oppaassa ja kuvissa —
     * Medinan Uhud-vuoren ratkaisu. Manjusri jää pois nimenomaan
     * etäisyyden takia, ei tiedon puutteen: sillä on oma artikkeli
     * ja infoboksin koordinaatti (ks. tarkistusraportti).
     *
     * ETELÄREUNA ON VÄLJÄ TARKOITUKSELLA. Zaisanin muistomerkki on
     * ruudun eteläisin kohde ja osuu 89 prosentin korkeudelle;
     * ilman lisätilaa sen numeroympyrä leikkautuisi alareunaan.
     * Mittakaavajana on vasemmassa alakulmassa eikä Zaisan ole sen
     * lähelläkään (jana 3,2 % / kohde 70 % leveydestä).
     *
     * PALVELUTIET PÄÄLLÄ, JA ERO ON MITATTU. Kartta piirrettiin ensin
     * ilman lippua: aineistoa tuli 2 982 elementtiä, ja kortteleiden
     * sisukset sekä jurtta-alueiden khashaa-kujat pohjois- ja
     * eteläreunalla jäivät tyhjäksi paperiksi. Lipun kanssa
     * elementtejä on 5 826 ja kaupunki näkyy kaupunkina. Ulan
     * Batorissa nimenomaan asuinalueiden pikkutiet on merkitty
     * OSM:ään service-teiksi, samoin luostarin ja talvipalatsin
     * pihatiet — sama tilanne kuin Pekingissä, Medinassa ja
     * Samarkandissa.
     */
    rajat: { pohjoinen: 47.928, etela: 47.879, lansi: 106.8646, ita: 106.9377 },
    palvelutiet: true,
  },
  kathmandu: {
    /*
     * KATHMANDUN LAAKSON YDIN (21.8.2026). Ruutu on noin 8,8 × 7,2 km,
     * ja siihen mahtuvat kaikki kahdeksan lehden kohdetta: lännessä
     * Swayambhunathin kukkula, keskellä vanha kaupunki Durbar-aukioineen
     * ja Rani Pokharin allas, idässä Bagmatin varrella Pashupatinath,
     * koillisessa Boudhanath ja etelässä joen toisella puolella Patanin
     * Durbar-aukio.
     *
     * RUUTU ON LEVEÄ MUTTA EI LEVEIN. Työkalun oma ohjenuora on 5–8 km
     * (ks. tiedoston alkukommentti), ja 15.8.2026 kaikkia rajauksia
     * levennettiin neljänneksellä — Berliini on nyt 10,2 × 7,7 km.
     * Kathmandun leveyden sanelevat kaksi kohdetta, joita ei voi jättää
     * pois: Swayambhunath 85,290 ja Boudhanath 85,362 ovat 7,1 km
     * päässä toisistaan, ja molemmat ovat laakson seitsemästä
     * maailmanperintökohteesta. Tiukempi ruutu vaatisi kainalon
     * kummallekin laidalle, mikä olisi huonompi kuin yksi väljä ruutu.
     *
     * REUNAT LEVENIVÄT VIELÄ ENSIMMÄISEN PIIRROKSEN JÄLKEEN.
     * Tiukemmalla rajauksella (7,9 × 6,2 km) Boudhanathin
     * numeroympyrä osui kohtaan 94,3 % / 7,3 % eli suoraan kartan
     * oikean ylänurkan opasteen alle (css: .kartta-opaste, top ja
     * right 0,35rem, enintään 17rem leveä ja kapealla ruudulla
     * kaksirivinen) — sama vika kuin Samarkandin observatoriolla,
     * joka näkyi vasta valmiissa lehdessä. Pohjois- ja itäreunaa
     * siirrettiin siksi runsaat kuusisataa metriä ulospäin, jolloin
     * piste on 88 % / 16 %. Samalla laskettiin eteläreunaa, jotta
     * Patanin Durbar-aukio ei jää alalaitaan (nyt 90 %).
     *
     * BHAKTAPUR JA CHANGU NARAYAN EIVÄT OLE KARTALLA EIVÄTKÄ
     * KAINALOSSA, vaikka ne ovat laakson kaksi muuta
     * maailmanperintökohdetta. Ne ovat kaupungin keskipisteestä 12,5 ja
     * 12,0 kilometriä itään eli oma kaupunkinsa ja kylänsä, eivät osa
     * Kathmandun tiivistä kaupunkikuvaa (docs/aasia-tyoaineisto/
     * tarkistus-kathmandu.md, kohta 3: sitova suositus A). Etäisyys on
     * lähempänä Kairon pyramideja kuin Medinan Uhud-vuorta. Bhaktapur
     * on lisäksi riittävän iso kohde omaksi lehdekseen myöhemmin.
     *
     * KAINALOA EI OLE, koska sille ei ole tarvetta: kaikki kohteet
     * mahtuvat pääruutuun. Tämä on sama ratkaisu kuin Samarkandissa.
     *
     * PALVELUTIET JA JALKAKÄYTÄVÄT PÄÄLLÄ: vanhankaupungin kujat
     * Durbar-aukion ympärillä, Asanin ja Indra Chowkin väliset kujat
     * sekä Swayambhunathin ja Boudhanathin pihat ovat OSM:ssä
     * jalankulkualueita ja huoltoteitä, ja ilman lippuja kartan tihein
     * kortteli jäisi tyhjäksi paperiksi (Pekingin, Medinan ja
     * Samarkandin oppi).
     */
    rajat: { pohjoinen: 27.7315, etela: 27.667, lansi: 85.2835, ita: 85.3725 },
    jalkakaydat: true,
    palvelutiet: true,
  },
  astana: {
    /*
     * ASTANA (21.8.2026). Ruutu on 6,1 × 4,4 km ja se kattaa Esilin
     * (Ishimin) molemmat rannat: eteläisellä Vasemmalla rannalla
     * uusi hallintokeskus Khan Shatyrista Hazrat Sultanin
     * moskeijalle, pohjoisella Oikealla rannalla vanha kaupunki.
     *
     * RUUTU ON LEVEÄ SUORAKAIDE, EI NELIÖ. Kahdeksan kohdetta ovat
     * en-Wikipedian koordinaateista laskien 4,8 kilometrin levyisellä
     * ja vain 2,0 kilometrin korkuisella nauhalla Nurjol-bulevardin
     * suunnassa, koska uusi keskusta rakennettiin yhden akselin
     * varteen. Neliörajaus (Varanasin ja Ulan Batorin ratkaisu) olisi
     * täyttänyt puolet kuvasta esikaupungilla; tässä tehtiin
     * päinvastoin ja pohjoisreunaa nostettiin vain sen verran, että
     * joki ja vanhan puolen ruutukaava mahtuvat mukaan. Ilman sitä
     * kartta kertoisi vain puolet kaupungista — koko lehden ydin on,
     * että Astana on kaksi kaupunkia joen kahta puolta.
     *
     * MOLEMMAT RAUTATIEASEMAT JÄIVÄT POIS EIVÄTKÄ KAINALOON. Vanha
     * Astana-1 on en-Wikipedian koordinaatista laskien 7,1 km
     * pohjoisluoteeseen ja Expo-vuoden Nurly Zhol 7,3 km itäkaakkoon;
     * ne ovat siis vastakkaisissa suunnissa ja kumpikin yhtä kaukana
     * kuin Varanasin Sarnath, joten kahden kainalon sijaan asemat
     * kerrotaan oppaan ensimmäisessä jaksossa (Medinan Uhud-vuoren
     * ratkaisu). Samasta syystä pois jäivät Expo 2017:n Nur Alem
     * (4,9 km etelälounaaseen) ja Suuri moskeija (6,9 km etelään).
     *
     * ITSENÄISYYSAUKIO JA ITSENÄISYYDEN PALATSI EIVÄT OLE ERILLISINÄ
     * PISTEINÄ, vaikka niillä on omat koordinaattinsa: ne ovat 370 ja
     * 480 metrin päässä Hazrat Sultanin moskeijasta ja 190 metrin
     * päässä toisistaan, joten kolme numeroympyrää menisi
     * päällekkäin (Petran, Mekan ja Singaporen oppi). Aukio kerrotaan
     * moskeijan jutussa.
     *
     * PALVELUTIET PÄÄLLÄ, JA ERO ON MITATTU. Kartta piirrettiin ensin
     * ilman lippua: aineistoa tuli 4 690 elementtiä, ja Vasemman
     * rannan korttelit — juuri se osa kaupunkia, jota lehti kertoo —
     * jäivät sisältä paperin värisiksi, koska hallintokortteleiden
     * pihatiet ja pysäköintikadut ovat OSM:ssä service-teitä. Lipun
     * kanssa elementtejä on 7 353 ja korttelit näkyvät kortteleina.
     * Sama tilanne kuin Pekingissä, Medinassa ja Samarkandissa.
     */
    rajat: { pohjoinen: 51.152, etela: 51.1125, lansi: 71.394, ita: 71.482 },
    palvelutiet: true,
  },
  kanton: {
    /*
     * VANHA MUURIKAUPUNKI JA HELMIJOEN RANTA (21.8.2026). Ruutu on
     * 6,1 × 6,1 km, ja siihen mahtuvat lehden kaikki kahdeksan
     * kohdetta: pohjoisessa Zhenhai-torni Yuexiun kukkulalla,
     * keskellä Guangxiao- ja Liurong-temppelit sekä
     * Huaisheng-moskeija, lännessä Chenin suvun sali, idässä
     * Pyhän sydämen katedraali ja etelässä joen rannassa
     * Kolmentoista faktorian paikka ja Shamianin saari.
     *
     * NELIÖRAJAUS ON HARKITTU, kuten Varanasissa. Kohteet ovat
     * luonnostaan 2,2 × 3,5 kilometrin nauha, joka kulkee kukkulalta
     * joelle; pelkkä nauha olisi piirtynyt kapeaksi pystykuvaksi.
     * Ruutua levennettiin itään ja länteen niin, että kuvasuhde on
     * 1,00 (1600 × 1595 px) — ja samalla mukaan tuli koko se
     * Helmijoen mutka, jonka varrella kaupungin koko kerrottava
     * historia tapahtui.
     *
     * ETELÄREUNA ON VÄLJÄ TARKOITUKSELLA. Shamian on kartan alalaidan
     * kohde (77 %), ja jos joki olisi jäänyt kuvan alareunaksi, saari
     * ei olisi näyttänyt saarelta. Nyt joen eteläpuolelta piirtyy
     * runsas kilometri Haizhun katuverkkoa, ja kanava saaren
     * pohjoispuolella erottuu. Samalla eteläreuna pysyy kaukana
     * lehden mittakaavajanasta vasemmassa alakulmassa (Kööpenhaminan
     * Tivoli-tapaus).
     *
     * WHAMPOAN ANKKURIPAIKKA (nyk. Pazhou) EI OLE KARTALLA EIKÄ
     * KAINALOSSA, vaikka se on lehden aihe. Se on en-Wikipedian
     * Pazhou-artikkelin koordinaatista (23,0992 / 113,3767) laskien
     * 12,6 kilometriä itäkaakkoon Shamianista — kauempana kuin yksikään
     * kainalo tässä kartastossa (Medinan Quba 3,5 km, Adenin Tawahi
     * 6 km) ja käytännössä sama etäisyys, jolla Bhaktapur jätettiin
     * pois Kathmandun kartalta. Artikkelin koordinaatti kattaa
     * lisäksi koko nykyisen Pazhoun kaupunginosan eikä osoita
     * historiallista ankkuripaikkaa täsmälleen. Ankkuripaikka
     * kerrotaan lehden teksteissä ja matkaoppaassa.
     *
     * JALKAKÄYTÄVÄT JA PALVELUTIET PÄÄLLÄ samasta syystä kuin
     * Xi'anissa ja Kathmandussa: Shamianin puistokadut, Xiguanin
     * kujat ja Beijing Lun kävelykatu ovat OSM:ssä jalankulkualueita
     * ja huoltoteitä, ja ilman lippuja kartan tihein kortteli jäisi
     * tyhjäksi paperiksi.
     */
    rajat: { pohjoinen: 23.152, etela: 23.097, lansi: 113.2205, ita: 113.2805 },
    jalkakaydat: true,
    palvelutiet: true,
  },
};

/*
 * Katuluokkien piirtojärjestys ja -tyyli (pienestä isoon).
 *
 * MIEDOMPI KONTRASTI (omistajan toive 7.8.2026: "kokeile tehdä
 * kaupungin kartta miedommalla kontrastilla"). Ensimmäinen versio veti
 * pääkadut lähes mustina (#322717) vaalealle paperille, ja kartta
 * hallitsi sivua enemmän kuin sen kohteet. Sävyt nostettiin
 * pergamentin puoleen niin, että ero pienimmän ja suurimman kadun
 * välillä säilyy — kartta on yhä luettava, mutta se on nyt tausta eikä
 * julistetta. Viivanleveyksiä hiukan ohennettiin samasta syystä.
 *
 * TOINEN KEVENNYS (omistajan palaute 8.8.2026: "viivat vaaleammiksi,
 * erityisesti tummimmat"). Kevennys ei ole tasainen, ja se on
 * tarkoituksellista: tummin pää nousi paljon (#7a6a4d → #a08e64,
 * kontrasti paperiin 4,0:1 → 2,7:1) ja ohuin pää vain vähän
 * (#bcae91 → #c8bb9e). Jos molempia olisi kevennetty yhtä paljon,
 * tiheimpien kaupunkien pikkukadut olisivat kadonneet kokonaan —
 * Madridin ydinkeskusta on pelkkää pikkukatua ilman jokea tai rantaa,
 * ja se on näistä kuudesta herkin. Nyt luokkien väliset erot ovat
 * kapeammat mutta kaikki viisi luokkaa erottuvat yhä toisistaan.
 */
const KADUT = [
  // Jalkakäytävät ja polut kaikkein ohuimpana ja haaleimpana. Ne
  // piirtyvät vain kaupungeissa, joilla on `jalkakaydat: true` —
  // useimmissa ne ovat suojateitä ja puistopolkuja, jotka siroittavat
  // kuvan. Teheranissa ne ovat basaarin katetut kujat.
  { luokat: ['footway', 'path'], vari: '#ded6c0', leveys: 0.7 },
  // Palvelutiet ohuimpana ja haaleimpana: ne ovat kujia eivätkä katuja,
  // ja ne piirtyvät vain kaupungeissa, joilla on `palvelutiet: true`.
  { luokat: ['service'], vari: '#d2c7ac', leveys: 0.9 },
  { luokat: ['residential', 'unclassified', 'living_street', 'pedestrian'], vari: '#c8bb9e', leveys: 1.4 },
  { luokat: ['tertiary', 'tertiary_link'], vari: '#c1b394', leveys: 2.2 },
  { luokat: ['secondary', 'secondary_link'], vari: '#b5a583', leveys: 2.9 },
  { luokat: ['primary', 'primary_link'], vari: '#ab9a73', leveys: 3.7 },
  { luokat: ['trunk', 'trunk_link', 'motorway', 'motorway_link'], vari: '#a08e64', leveys: 4.6 },
];

/*
 * Sävyt pääkartan pergamenttipaletista (omistajan tarkennus 7.8.2026:
 * "pääkartan sävyinen, eli siniset ja vihreät pois"): vesi on järvien
 * #ecd9ae-perhettä hieman tummempana, jotta se erottuu paperista, ja
 * vesireuna sama #b99a68 kuin pääkartan meriviivoissa (.sea-echo).
 * Puistot ovat pelkkä kuiskaus paperia tummempaa — ei vihreää.
 */
/*
 * VÄRIPALETTI ON NÄYTE EIKÄ KÄYTÖSSÄ (omistajan kysymys 15.8.2026:
 * satelliittinäkymä on suttuinen, koska s2cloudlessin pohjatarkkuus
 * on 10 m/px — "voisiko sen sijaan olla esim. väritetty kartta").
 *
 *   node tools/piirra-kaupunkikartta.mjs berliini --vari
 *   → assets/kartat/berliini-varikartta.png (pelin värinäkymä)
 *
 * Sama aineisto, sama rajaus ja samat viivat kuin julisteessa; vain
 * sävyt vaihtuvat. Väri tulee sinne, missä maastossa ON väriä — vesi
 * sävytettyyn siniseen ja puistot vihreään — ja kaikki muu pysyy
 * pelin pergamentissa: korttelit lämpimänä hiekkana, kadut samana
 * ruskeana musteperheenä hitusen tummempana, jotta ne erottuvat
 * syvemmästä pohjasta. Sävyt ovat harmaannutettuja (sininen kallistuu
 * teräksiseen, vihreä salvianvihreään), koska kirkas web-kartan
 * sini-vihreä ei kuulu tähän peliin.
 *
 * HUOM: työkalu EI piirrä rakennuksia (ks. KADUT ja kaupunkien
 * kommentit) — "korttelit" tarkoittaa siis katujen väliin jäävää
 * pohjaa. Rakennusten piirtäminen olisi oma työnsä, ei paletin.
 */
const PALETIT = {
  /*
   * Sävyt pääkartan pergamenttipaletista (omistajan tarkennus
   * 7.8.2026: "pääkartan sävyinen, eli siniset ja vihreät pois"):
   * vesi on järvien #ecd9ae-perhettä hieman tummempana, jotta se
   * erottuu paperista, ja vesireuna sama #b99a68 kuin pääkartan
   * meriviivoissa (.sea-echo). Puistot ovat pelkkä kuiskaus paperia
   * tummempaa — ei vihreää. TÄMÄ ON PELIN PALETTI.
   */
  paperi: {
    VESI: '#e8d5a9',
    VESIREUNA: '#b99a68',
    PUISTO: '#efe6ca',
    RATA: '#d5c9b0',
    PAPERI: '#f6eeda',
    // Muuri on kartan tummin viiva: pääkartan musteen sävy
    // (.city-label), jotta se erottuu vaaleista kaduista mutta pysyy
    // pergamentissa.
    MUURI: '#6f5a3c',
    /*
     * Arkeologiset alueet ovat paperia lämpimämpi laikku ja saavat
     * ohuen reunaviivan. Sävy on veden ja puiston välistä: kaivausalue
     * ei ole puisto eikä vesi, ja Luxorissa se on koko kartan aihe.
     *
     * MIKSI OMA TASO. Luxorin ja Karnakin temppelit EIVÄT ole OSM:ssä
     * rakennuksia vaan historic=ruins- ja historic=archaeological_site
     * -alueita. Ilman tätä tasoa kartalle jää pelkkä katuverkko ja
     * kohteiden kohdalla on tyhjää paperia — mitattiin Luxorissa
     * 13.8.2026 kahdella ajolla ennen kuin syy löytyi.
     */
    RAUNIO: '#ece0c2',
    RAUNIOREUNA: '#c4b189',
  },
  /*
   * Näyte, ks. yllä. Ei käytössä pelissä.
   *
   * KADUT PIDETÄÄN JULISTEEN SÄVYISSÄ (ei kadut-riviä), ja se on
   * mitattu valinta: ensimmäisessä versiossa myös katuja tummennettiin,
   * ja kuva alkoi näyttää tavalliselta verkkokartalta. Kun muste on
   * sama, ero julisteeseen on täsmälleen se, mitä omistaja kysyi —
   * vesi ja puistot saavat värin, muu pysyy paperina.
   *
   * Sävyt ovat harmaannutettuja: sini kallistuu teräksiseen ja vihreä
   * salviaan, eli molemmat ovat pergamentin päällä pölyisiä eivätkä
   * kirkkaita. Pohja on julisteen paperia hitusen syvempi hiekka,
   * jotta korttelit lukevat lämpiminä pintoina eivätkä tyhjänä.
   */
  vari: {
    VESI: '#c3d5da',
    VESIREUNA: '#95afb6',
    PUISTO: '#d6dcba',
    RATA: '#cec2a8',
    PAPERI: '#f3e8ce',
    MUURI: '#6f5a3c',
    RAUNIO: '#ead9b4',
    RAUNIOREUNA: '#c4ad82',
  },
};
const VARINAYTE = process.argv.includes('--vari');
const PALETTI = VARINAYTE ? PALETIT.vari : PALETIT.paperi;
const {
  VESI, VESIREUNA, PUISTO, RATA, PAPERI, MUURI, RAUNIO, RAUNIOREUNA,
} = PALETTI;
/*
 * Kaksi palvelinta samaan aineistoon: päälaitos overpass-api.de ja
 * Kumin ylläpitämä peili. 15.8.2026 päälaitos katkoi Kööpenhaminan
 * laajaa vastausta ECONNRESETillä viidesti peräkkäin — yksi palvelin
 * ei siis riitä, vaan uusintayritys kiertää listaa.
 */
/*
 * KOLMAS PALVELIN ANNETAAN YMPÄRISTÖMUUTTUJALLA, ei kovakoodattuna.
 * 20.8.2026 MOLEMMAT vakiopalvelimet olivat pitkään alhaalla samaan
 * aikaan (kymmenen yritystä: viisi ECONNRESETiä, kaksi 502:ta, kaksi
 * 500:aa), eikä Persepoliksen karttaa saanut piirrettyä lainkaan.
 * Julkisia peilejä on muitakin, mutta ne vaihtuvat ja niiden aineisto
 * voi olla rajattu — osa peileistä sisältää vain oman maansa (kokeiltu:
 * overpass.osm.ch vastaa 200:lla mutta palauttaa Iranista tyhjän
 * listan). Peiliä ei siksi kirjata pysyväksi riippuvuudeksi vaan
 * annetaan ajokohtaisesti:
 *
 *   OVERPASS_PALVELIMET=https://peili.example/api/interpreter \
 *     node tools/piirra-kaupunkikartta.mjs persepolis
 *
 * Useampi peili erotetaan pilkulla. Ilman muuttujaa lista on entinen.
 */
const OVERPASS_PALVELIMET = (process.env.OVERPASS_PALVELIMET || [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
].join(',')).split(',').map((s) => s.trim()).filter(Boolean);

async function haeOverpass(rajat, palvelutiet = false, jalkakaydat = false, palvelin = OVERPASS_PALVELIMET[0]) {
  const alue = `(${rajat.etela},${rajat.lansi},${rajat.pohjoinen},${rajat.ita})`;
  /*
   * PALVELUTIET VAIN PYYDETTÄESSÄ (`palvelutiet: true`).
   *
   * Useimmissa kaupungeissa `service` on pysäköintialueiden ja
   * pihojen ajolinjoja, ja niiden piirtäminen tekee kartasta
   * roskaisen. Vilnan vanhassakaupungissa se on päinvastoin: kujat
   * ON MERKITTY service-teiksi (1509 kpl), kun tavallisia katuja on
   * 189, joten ilman niitä koko vanhakaupunki jää tyhjäksi paperiksi.
   * Lippu on siksi kaupunkikohtainen eikä oletus.
   */
  /*
   * HUOM: KADUT on sekä KYSELYN että PIIRRON lähde. Kun palvelutie
   * lisättiin tauluun omaksi luokakseen, kysely alkoi hakea
   * service-teitä JOKAISEEN kaupunkiin, vaikka lippu oli tarkoitettu
   * valinnaiseksi — Tallinnan koeajossa se toi 1526 ylimääräistä
   * elementtiä ja siroitti kuvaan ohuita kujia kaikkialle. Luokka
   * suodatetaan siksi pois kyselystä, ellei kaupunki sitä pyydä;
   * silloin sen piirtokerros jää tyhjäksi eikä mitään piirry.
   */
  const JALKA = ['footway', 'path'];
  const luokat = KADUT
    .flatMap((k) => k.luokat)
    .filter((l) => l !== 'service' || palvelutiet)
    .filter((l) => !JALKA.includes(l) || jalkakaydat)
    .join('|');
  const kysely = `[out:json][timeout:120];(
    way["highway"~"^(${luokat})$"]${alue};
    way["waterway"~"^(river|canal)$"]${alue};
    way["natural"~"^(water|coastline)$"]${alue};
    /*
     * Metsäiset rinteet eivät ole OSM:ssä puistoja vaan luontoa, joten
     * ilman tätä riviä ne jäävät paperin värisiksi.
     *
     * TÄMÄ EI RIITÄ ISOILLE KUKKULOILLE. Ateenan Lykavittós on
     * relaatio (natural=wood + landuse=forest), ja kysely hakee
     * relaatioista vain vedet — kukkula jää siksi yhä piirtymättä.
     *
     * ÄLÄ KORJAA SITÄ LISÄÄMÄLLÄ metsärelaatioita tähän kyselyyn.
     * Relaatiohaara kokoaa jäsenpolut VESIMONIKULMIOKSI eikä katso
     * merkintöjä, koska se voi luottaa siihen että kysely hakee vain
     * vesirelaatioita. Metsärelaatio täyttyisi siis sinisenä. Jos
     * kukkulat halutaan, relaatiohaaraan pitää ensin lisätä
     * tagitarkistus. Ks. kokoaKerrokset().
     */
    way["natural"~"^(wood|scrub)$"]${alue};
    way["leisure"~"^(park|garden)$"]${alue};
    way["landuse"~"^(forest|grass|recreation_ground|cemetery)$"]${alue};
    way["railway"="rail"]${alue};
    /*
     * KAUPUNGINMUURI. Muurikaupungeissa muuri on kartan tärkein viiva
     * eikä koriste: Dubrovnikin vanhastakaupungista piirtyi ilman sitä
     * vain Stradun ja satama, koska kujat ovat OSM:ssä portaita eikä
     * katuja. Muurin kanssa kuvassa on se, mistä kaupunki tunnetaan.
     *
     * Piirretään omana ohuena viivanaan (ks. kerrokset.muurit), ei
     * katuna: muuri ei ole reitti, ja katuna se saisi kadun paksuuden
     * ja sekoittuisi katuverkkoon.
     */
    way["barrier"="city_wall"]${alue};
    way["historic"="citywalls"]${alue};
    /*
     * ARKEOLOGISET ALUEET. Antiikin kohteet ovat OSM:ssä omalla
     * merkinnällään eivätkä rakennuksina: Karnakin pylvässalit,
     * Luxorin temppelin piha ja agorat ovat historic=ruins tai
     * historic=archaeological_site. Ilman tätä riviä ne eivät ole
     * kartalla millään tavalla.
     */
    way["historic"~"^(ruins|archaeological_site)$"]${alue};
    /*
     * Isot järvet ja lahdet ovat OSM:ssä monikulmiorelaatioita, ja
     * niiden jäsenpoluilla ei ole omia merkintöjä — pelkkä
     * way["natural"="water"] ei siis löydä niitä lainkaan. Tukholmassa
     * se tarkoitti, että Riddarfjärden puuttui kartalta kokonaan.
     */
    relation["natural"="water"]${alue};
  );out geom;`;
  const vastaus = await fetch(palvelin, {
    method: 'POST',
    headers: { 'User-Agent': 'matkakirja/1.0 (opetuspeli)' },
    // Rivinvaihdot pois: Overpass vastaa monirivisille 406.
    body: new URLSearchParams({ data: kysely.replace(/\s+/g, ' ') }),
    signal: AbortSignal.timeout(180000),
  });
  if (!vastaus.ok) throw new Error(`Overpass ${vastaus.status}`);
  return (await vastaus.json()).elements ?? [];
}

/*
 * Overpass on julkinen ja ruuhkainen: se vastaa 429:llä liian tiheään
 * ajettuun kyselyyn ja 504:llä silloin kun se on itse kuormittunut.
 * Kumpikin on ohimenevä, mutta ilman uusintaa ne kaatavat koko ajon —
 * ja koska aineisto haetaan ennen piirtoa, hukkaan menee myös se
 * minuutti, jonka kysely ehti kestää. Kolme yritystä kasvavalla
 * odotuksella riitti kaikkiin tässä kohdattuihin katkoihin.
 *
 * VIISI YRITYSTÄ 15.8.2026 ALKAEN. Reunuksellisen kartan kysely
 * kattaa 2,6-kertaisen alan (laajennus 1,6 molempiin suuntiin), ja
 * Lontoon ajo katkesi kolmesti peräkkäin ECONNRESETiin kesken
 * vastauksen — ei siis 429:ään vaan pitkän vastauksen katkeamiseen.
 * Neljäs yritys meni läpi.
 */
/*
 * KYMMENEN YRITYSTÄ 20.8.2026 ALKAEN. Lehtityön apuskriptien oppi
 * (docs/arkisto/lehtityon-apuskriptit.md): kuusi yritystä ei riittänyt
 * konttiympäristön yhteyskatkoihin, kymmenen kasvavalla odotuksella
 * riitti kaikkiin. Medinan ajo kaatui viidellä yrityksellä kahdesti
 * peräkkäin (500 + ECONNRESET), kymmenellä meni läpi.
 */
async function haeOverpassSitkeasti(rajat, palvelutiet = false, jalkakaydat = false, yrityksia = 10) {
  for (let i = 1; ; i++) {
    const palvelin = OVERPASS_PALVELIMET[(i - 1) % OVERPASS_PALVELIMET.length];
    try {
      return await haeOverpass(rajat, palvelutiet, jalkakaydat, palvelin);
    } catch (virhe) {
      if (i >= yrityksia) throw virhe;
      const odotus = 15000 * i;
      console.log(`  ${virhe.message} — uusi yritys ${odotus / 1000} s kuluttua…`);
      await new Promise((r) => setTimeout(r, odotus));
    }
  }
}

const avain = (p) => `${p.lat.toFixed(7)},${p.lon.toFixed(7)}`;

/** Monikulmion pinta-ala asteneliöinä (kenkänauhakaava). */
function renkaanAla(rengas) {
  let a = 0;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    a += (rengas[j].lon * rengas[i].lat) - (rengas[i].lon * rengas[j].lat);
  }
  return Math.abs(a / 2);
}

/*
 * Monikulmion pinta-ala neliömetreinä. Asteneliö ei kelpaa vertailuun
 * kaupunkien välillä, koska pituuspiirit kapenevat pohjoiseen:
 * Tukholmassa asteneliö on puolet Kairon vastaavasta.
 */
function alaNelioMetreina(rengas) {
  if (!rengas?.length) return 0;
  const lat = rengas.reduce((s, p) => s + p.lat, 0) / rengas.length;
  const metriaAsteessa = 111320;
  return renkaanAla(rengas) * metriaAsteessa * metriaAsteessa * Math.cos((lat * Math.PI) / 180);
}

const lonLeikkaus = (a, b, lon) => ({
  lon, lat: a.lat + ((b.lat - a.lat) * (lon - a.lon)) / (b.lon - a.lon),
});
const latLeikkaus = (a, b, lat) => ({
  lat, lon: a.lon + ((b.lon - a.lon) * (lat - a.lat)) / (b.lat - a.lat),
});

/*
 * Leikkaa monikulmion rajauslaatikkoon (Sutherland–Hodgman; laatikko on
 * kupera, joten algoritmi riittää sellaisenaan).
 *
 * Tämä on isojen jokien täyttökorjauksen ydin. Ennen vesirelaatio
 * hylättiin, jos sen KOKO renkaan ala ylitti 0,3 × laatikko — ja joen
 * rengas on aina valtava, koska se jatkuu kymmeniä kilometrejä kuvan
 * ulkopuolelle molempiin suuntiin. Laatikon sisällä samasta joesta on
 * kuitenkin vain kapea nauha. Kun mitataan LEIKATTU ala, joki ja
 * ympäröivä vesistö erottuvat toisistaan: Venetsian laguuni peittää
 * laatikosta lähes kaiken, Dnepr vain kolmanneksen.
 *
 * Jakolaskut eivät jaa nollalla: leikkausfunktiota kutsutaan vain kun
 * janan päät ovat reunan eri puolilla, jolloin kyseinen koordinaatti
 * eroaa väistämättä.
 */
function leikkaaLaatikkoon(rengas, r) {
  const reunat = [
    [(p) => p.lon >= r.lansi, (a, b) => lonLeikkaus(a, b, r.lansi)],
    [(p) => p.lon <= r.ita, (a, b) => lonLeikkaus(a, b, r.ita)],
    [(p) => p.lat >= r.etela, (a, b) => latLeikkaus(a, b, r.etela)],
    [(p) => p.lat <= r.pohjoinen, (a, b) => latLeikkaus(a, b, r.pohjoinen)],
  ];
  let ulos = rengas;
  for (const [sisalla, leikkaa] of reunat) {
    const sisaan = ulos;
    ulos = [];
    for (let i = 0; i < sisaan.length; i += 1) {
      const a = sisaan[(i + sisaan.length - 1) % sisaan.length];
      const b = sisaan[i];
      if (sisalla(b)) {
        if (!sisalla(a)) ulos.push(leikkaa(a, b));
        ulos.push(b);
      } else if (sisalla(a)) {
        ulos.push(leikkaa(a, b));
      }
    }
    if (ulos.length < 3) return [];
  }
  return ulos;
}

/**
 * Ketjuttaa polkujoukon renkaiksi päätepisteitä yhdistellen. Polun
 * suunnalla ei ole väliä, joten polkuja saa kääntää — käytetään
 * vesirelaatioiden ulkorenkaisiin.
 */
function ketjuta(polut) {
  const jaljella = polut.map((g) => g.slice());
  const ketjut = [];
  while (jaljella.length) {
    let k = jaljella.pop();
    for (let muuttui = true; muuttui;) {
      muuttui = false;
      for (let i = 0; i < jaljella.length; i += 1) {
        const o = jaljella[i];
        const paa = avain(k[k.length - 1]);
        const alku = avain(k[0]);
        if (paa === avain(o[0])) k = k.concat(o.slice(1));
        else if (paa === avain(o[o.length - 1])) k = k.concat(o.slice().reverse().slice(1));
        else if (alku === avain(o[o.length - 1])) k = o.slice(0, -1).concat(k);
        else if (alku === avain(o[0])) k = o.slice().reverse().slice(0, -1).concat(k);
        else continue;
        jaljella.splice(i, 1);
        muuttui = true;
        break;
      }
    }
    ketjut.push(k);
  }
  return ketjut;
}

/*
 * Rantaviivalle OMA ketjutus: polkuja EI SAA KÄÄNTÄÄ. OSM piirtää
 * rantaviivan aina niin, että maa on kulkusuunnan vasemmalla ja vesi
 * oikealla, ja peräkkäiset polut liittyvät pää–häntä. Jos ketjutus
 * kääntää polun, suuntatieto katoaa ja meri täyttyy kaupungin päälle.
 */
function ketjutaSuunnassa(polut) {
  const alut = new Map();
  polut.forEach((g, i) => {
    const a = avain(g[0]);
    if (!alut.has(a)) alut.set(a, []);
    alut.get(a).push(i);
  });
  const paat = new Set(polut.map((g) => avain(g[g.length - 1])));
  const kaytetty = new Set();
  const ketjut = [];
  const kasvata = (i) => {
    kaytetty.add(i);
    let ketju = polut[i].slice();
    for (;;) {
      const seur = (alut.get(avain(ketju[ketju.length - 1])) ?? []).find((j) => !kaytetty.has(j));
      if (seur === undefined) break;
      kaytetty.add(seur);
      ketju = ketju.concat(polut[seur].slice(1));
    }
    ketjut.push(ketju);
  };
  // Ensin ketjut, joiden alkuun ei liity mitään; sitten loput (renkaat).
  polut.forEach((g, i) => { if (!kaytetty.has(i) && !paat.has(avain(g[0]))) kasvata(i); });
  polut.forEach((g, i) => { if (!kaytetty.has(i)) kasvata(i); });
  return ketjut;
}

/*
 * MEREN TÄYTTÖ RANTAVIIVASTA (Fablen päätös 9.8.2026, vaihtoehto a).
 *
 * Avomeri ei ole OSM:ssä monikulmio vaan pelkkä rantaviiva: maa on
 * viivan vasemmalla puolella ja vesi oikealla, eikä vettä ole
 * piirretty minkään muodon sisään. Tukholmassa tämä ei haitannut,
 * koska siellä vedet ovat kapeita salmia ja rantaa myötäilevä
 * vesiveto riitti. Marseillessa koko kuvan länsipuoli jäi paperin
 * väriseksi ja Istanbulissa Bosporin 1,2–2 km olisi jäänyt tyhjäksi.
 *
 * Ratkaisu: ketjuta rantaviivat suunnassa, leikkaa ne rajauslaatikkoon
 * ja sulje kukin pätkä laatikon reunaa pitkin vesipuolelle.
 *
 * Kolme sudenkuoppaa, jotka kaikki on kierretty tässä:
 *  1. Sulkusuunta valitaan KOEPISTEELLÄ eikä päättelemällä. Rannan
 *     keskikohdasta otetaan pieni askel kulkusuunnan oikealle eli
 *     veteen, ja valitaan se rengas, jonka sisään koepiste jää.
 *     Pelkkä orientaation päättely menee helposti väärin, koska
 *     ruutukoordinaatiston y-akseli osoittaa alas.
 *  2. Lähes koko laatikon peittävät renkaat hylätään. Pätkä, joka
 *     poikkeaa laatikkoon ja palaa samalta reunalta, sulkeutuisi
 *     muuten koko kehän ympäri ja täyttäisi kaupungin merellä.
 *  3. Suljetut ketjut ovat saaria, ja ne piirretään paperin värillä
 *     meren päälle.
 *
 * Tunnettu puute: jos rantaviiva poistuu laatikosta sivureunan kautta
 * ja palaa samalle reunalle, väliin jäävä reunapätkä jää täyttämättä.
 * Se näkyy paperinvärisenä kiilana reunassa. Rajaus kannattaa valita
 * niin, ettei näin käy — ja kuva pitää joka tapauksessa katsoa.
 */
function merenTaytto(ketjut, r, tapa = 'vesi') {
  const sisalla = (p) => p.lon >= r.lansi && p.lon <= r.ita && p.lat >= r.etela && p.lat <= r.pohjoinen;
  const W = r.ita - r.lansi;
  const H = r.pohjoinen - r.etela;
  // Myötäpäivään kiertävä reunaparametri 0..4, jotta reunaa pitkin
  // kävely osaa valita oikeat kulmat oikeassa järjestyksessä.
  const t = (p) => {
    const eL = Math.abs(p.lon - r.lansi);
    const eI = Math.abs(p.lon - r.ita);
    const eE = Math.abs(p.lat - r.etela);
    const eP = Math.abs(p.lat - r.pohjoinen);
    const m = Math.min(eL, eI, eE, eP);
    if (m === eL) return (p.lat - r.etela) / H;
    if (m === eP) return 1 + (p.lon - r.lansi) / W;
    if (m === eI) return 2 + (r.pohjoinen - p.lat) / H;
    return 3 + (r.ita - p.lon) / W;
  };
  const kulmat = [
    { t: 1, lon: r.lansi, lat: r.pohjoinen },
    { t: 2, lon: r.ita, lat: r.pohjoinen },
    { t: 3, lon: r.ita, lat: r.etela },
    { t: 0, lon: r.lansi, lat: r.etela },
  ];
  const leikkaa = (a, b) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i += 1) {
      const m = (lo + hi) / 2;
      const p = { lon: a.lon + (b.lon - a.lon) * m, lat: a.lat + (b.lat - a.lat) * m };
      if (sisalla(p)) lo = m; else hi = m;
    }
    return {
      lon: Math.min(r.ita, Math.max(r.lansi, a.lon + (b.lon - a.lon) * lo)),
      lat: Math.min(r.pohjoinen, Math.max(r.etela, a.lat + (b.lat - a.lat) * lo)),
    };
  };

  const palat = [];
  const saaret = [];
  for (const k of ketjut) {
    if (avain(k[0]) === avain(k[k.length - 1])) {
      if (k.some(sisalla)) saaret.push(k);
      continue;
    }
    let pala = null;
    for (let i = 0; i < k.length; i += 1) {
      const p = k[i];
      if (sisalla(p)) {
        if (!pala) {
          pala = [];
          if (i > 0) pala.push(leikkaa(p, k[i - 1]));
        }
        pala.push(p);
      } else if (pala) {
        pala.push(leikkaa(k[i - 1], p));
        palat.push(pala);
        pala = null;
      }
    }
    if (pala) palat.push(pala);
  }

  const kavele = (pala, eteen) => {
    const tA = t(pala[0]);
    const rengas = pala.slice();
    let kaynti = t(pala[pala.length - 1]);
    for (let kierros = 0; kierros < 8; kierros += 1) {
      const etaisyys = (c) => (eteen ? ((c.t - kaynti) + 4) % 4 : ((kaynti - c.t) + 4) % 4) || 4;
      const kohde = (eteen ? ((tA - kaynti) + 4) % 4 : ((kaynti - tA) + 4) % 4);
      const c = kulmat.map((k) => ({ ...k, d: etaisyys(k) })).sort((a, b) => a.d - b.d)[0];
      if (kohde === 0 || c.d >= kohde) break;
      rengas.push({ lat: c.lat, lon: c.lon });
      kaynti = c.t;
    }
    return rengas;
  };
  const sisassa = (rengas, p) => {
    let osuu = false;
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      const a = rengas[i];
      const b = rengas[j];
      if ((a.lat > p.lat) !== (b.lat > p.lat)
        && p.lon < ((b.lon - a.lon) * (p.lat - a.lat)) / (b.lat - a.lat) + a.lon) osuu = !osuu;
    }
    return osuu;
  };
  const ala = (rengas) => {
    let a = 0;
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
      a += (rengas[j].lon * rengas[i].lat) - (rengas[i].lon * rengas[j].lat);
    }
    return Math.abs(a / 2);
  };
  const renkaat = palat.flatMap((pala) => {
    const m = Math.max(1, Math.floor(pala.length / 2));
    const a = pala[m - 1];
    const b = pala[m];
    const dx = b.lon - a.lon;
    const dy = b.lat - a.lat;
    const pit = Math.hypot(dx, dy) || 1;
    const askel = 0.00025;
    // Oikea puoli kulkusuunnasta on vesi: (dy, −dx).
    const koe = {
      lon: (a.lon + b.lon) / 2 + (dy / pit) * askel,
      lat: (a.lat + b.lat) / 2 - (dx / pit) * askel,
    };
    if (!sisalla(koe) || pala.length < 6) return [];
    if (tapa === 'maa') {
      // Maapuoli = rengas, joka EI sisällä vesikoepistettä. Isoin
      // kelpaava on oikea: pienemmät ovat saman rannan lahtia.
      const maa = [kavele(pala, true), kavele(pala, false)]
        .filter((rg) => !sisassa(rg, koe))
        .sort((x, y) => ala(y) - ala(x));
      return maa.length ? [maa[0]] : [];
    }
    const ehdokkaat = [kavele(pala, true), kavele(pala, false)]
      .filter((rg) => sisassa(rg, koe) && ala(rg) < W * H * 0.9)
      .sort((x, y) => ala(x) - ala(y));
    return ehdokkaat.length ? [ehdokkaat[0]] : [];
  });
  const kokoLaatikko = [
    { lat: r.pohjoinen, lon: r.lansi },
    { lat: r.pohjoinen, lon: r.ita },
    { lat: r.etela, lon: r.ita },
    { lat: r.etela, lon: r.lansi },
  ];
  /*
   * MAAPUOLITAPA: koko rajaus on merta ja maamassat piirretään sen
   * päälle. Tämä on ainoa toimiva tapa silloin, kun rajauksessa on
   * maata VEDEN MOLEMMIN PUOLIN — Istanbulissa niemi, Beyoğlu ja
   * Aasian puoli. Silloin tavallinen vesipuolen rengas sisältää aina
   * ne muut maamassat, ja renkaiden unioni peittää koko kuvan
   * (mitattu: 160–255 % rajauksesta).
   *
   * Tämä EI kelpaa oletukseksi: Helsingissä maapuolitapa tuottaa
   * 27 päällekkäistä maakuviota ja hajoaa. Kummallekin kaupungille
   * on oma oikea tapansa, ja siksi se on valinta.
   */
  if (tapa === 'maa') {
    return renkaat.length || saaret.length
      ? { renkaat: [kokoLaatikko], saaret: [...renkaat, ...saaret] }
      : { renkaat: [], saaret: [] };
  }
  /*
   * PELKKIÄ SAARIA: jos rajauksen sisällä on suljettuja
   * rantaviivarenkaita muttei yhtään avointa rantaa, koko rajaus on
   * merta ja renkaat ovat saaria sen keskellä. Tämä on Suomenlinnan
   * kainalon tapaus — sama idea kuin maapuolitavassa, mutta se
   * syntyy tässä itsestään eikä vaadi valintaa.
   */
  if (!renkaat.length && saaret.length) renkaat.push(kokoLaatikko);
  return { renkaat, saaret };
}

/**
 * Rajauksen kuvasuhde: leveys yhtä korkeusyksikköä kohden.
 *
 * Leveyspiirin venytys keskileveydellä — sama tasavälinen projektio
 * kuin sijaintikartoissa, joten prosenttiasemointi pysyy suorana.
 */
function kuvasuhde(rajat) {
  const venytys = 1 / Math.cos(((rajat.pohjoinen + rajat.etela) / 2) * (Math.PI / 180));
  return (rajat.ita - rajat.lansi) / ((rajat.pohjoinen - rajat.etela) * venytys);
}

/**
 * PIIRRETTÄVÄ ALUE: ydinrajaus laajennettuna samasta keskipisteestä.
 *
 * Keskipiste säilyy, joten myös keskileveysaste — ja siten
 * kuvasuhteen venytyskerroin — on sama kuin ydinrajauksella. Sen
 * ansiosta ydinrajaus on laajemmassa kuvassa tarkalleen
 * `1 / laajennus` sekä leveydestä että korkeudesta, ja lehti saa
 * lepotilassa kehykseensä pikselilleen entisen näkymän.
 *
 * Luvut pyöristetään viiteen desimaaliin (noin metri), jotta
 * maakartat.js:ään kirjattavat rajat pysyvät luettavina. Nykyisillä
 * kaupungeilla pyöristys on tarkka: kaikki neljä laajennettua rajausta
 * osuvat viiteen desimaaliin ilman jäännöstä.
 */
function piirretytRajat({ rajat, laajennus = 1 }) {
  if (laajennus === 1) return rajat;
  const lat = ((rajat.pohjoinen - rajat.etela) * laajennus) / 2;
  const lon = ((rajat.ita - rajat.lansi) * laajennus) / 2;
  const keskiLat = (rajat.pohjoinen + rajat.etela) / 2;
  const keskiLon = (rajat.ita + rajat.lansi) / 2;
  const p = (n) => +n.toFixed(5);
  return {
    pohjoinen: p(keskiLat + lat),
    etela: p(keskiLat - lat),
    lansi: p(keskiLon - lon),
    ita: p(keskiLon + lon),
  };
}

/**
 * Kokoaa piirtokerrokset elementeistä annetulla koordinaattimuunnoksella.
 *
 * Muunnos on parametri, koska sama koodi piirtää sekä pääkartan että
 * kainalokartat — kainalossa vain x ja y osoittavat pieneen ruutuun
 * pääkuvan sisällä.
 */
function kokoaKerrokset(elementit, x, y, rajat, meri = false) {
  const pisteet = (geom) => geom.map((p) => `${x(p.lon)},${y(p.lat)}`).join(' ');
  const kerrokset = {
    meri: [], saaret: [], puistot: [], vedet: [], joet: [], radat: [], muurit: [],
    rauniot: [], raunioviivat: [],
    kadut: KADUT.map(() => []),
  };
  const rantaviivat = [];
  const laatikonAla = (rajat.ita - rajat.lansi) * (rajat.pohjoinen - rajat.etela);
  for (const e of elementit) {
    /*
     * Vesirelaatio TÄYTETÄÄN, ei piirretä nauhana. Aiemmin jäsenpolut
     * työnnettiin joet-listaan, jolloin Marseillen Vanhasatama —
     * relaatio 10793156 — piirtyi ontoksi suorakaiteeksi keskelle
     * kaupunkia. Ulkorenkaat ketjutetaan jäsenpoluista; suunnalla ei
     * ole väliä, joten yleiskäyttöinen ketjuta riittää.
     *
     * VAROITUS: tämä haara olettaa relaation olevan VESI, koska
     * kysely hakee vain relation["natural"="water"]. Jos joku lisää
     * kyselyyn puisto- tai metsärelaatioita, ne täyttyisivät vetenä.
     * Lisää silloin tagitarkistus tähän.
     */
    if (e.type === 'relation') {
      const ulko = (e.members ?? [])
        .filter((m) => m.type === 'way' && m.geometry?.length && m.role !== 'inner')
        .map((m) => m.geometry);
      /*
       * SISÄRENKAAT OVAT SAARIA, JA NE ON PIIRRETTÄVÄ REIKINÄ.
       *
       * Tässä luettiin ensin vain ulkorenkaat, ja Tukholmassa se
       * upotti puolet kaupungista: Riddarfjärdenin vesirelaation
       * ulkorengas kiertää Kungsholmenin ja Södermalmin, jotka ovat
       * relaation sisärenkaita eli saaria. Ilman reikiä täyttö valui
       * niiden päälle, ja katuverkko piirtyi veden yli — kaupungintalo
       * seisoi kartalla aallokossa. Vika ei näkynyt muissa
       * kaupungeissa, koska niiden vesissä ei ole saaria.
       *
       * SVG:n evenodd täyttää parittomat kerrokset, joten sama polku
       * hoitaa ulkorenkaan ja reiät ilman erillistä maskia.
       */
      const sisa = ketjuta((e.members ?? [])
        .filter((m) => m.type === 'way' && m.geometry?.length && m.role === 'inner')
        .map((m) => m.geometry))
        .filter((rengas) => rengas.length >= 4);
      const polku = (renkaat) => renkaat
        .map((rengas) => `M${pisteet(rengas).replace(/ /g, ' L')}Z`)
        .join(' ');
      for (const rengas of ketjuta(ulko)) {
        if (rengas.length < 4) continue;
        /*
         * MITTA ON LEIKATTU ALA, EI KOKO RENKAAN ALA (Fablen hyväksymä
         * korjaus 9.8.2026). Vanha sääntö vertasi renkaan koko alaa
         * laatikkoon, ja koska joen rengas jatkuu kymmeniä kilometrejä
         * kuvan ulkopuolelle, jokainen iso joki ylitti rajan ja putosi
         * paljaiksi rantaviivoiksi: Kiovan Dnepr 2,9-kertainen,
         * Pietarin Neva 2,5-kertainen, Budapestin Tonava samoin. Kuvaan
         * jäi kaksi viivaa ja niiden väliin paperia.
         *
         * Laatikkoon leikattuna joki on kapea nauha ja ympäröivä
         * vesistö peittää lähes koko ruudun, joten sama mitta erottaa
         * ne. Raja on 0,5: sen yli menevä vesi on vesistö, jonka
         * SISÄLLÄ kartta on, eikä sitä saa täyttää — työkalulla ei ole
         * maa-alueita, joten täyttö peittäisi kaupungin. Venetsian
         * laguuni on juuri se tapaus.
         *
         * LEIKKAUSTA KÄYTETÄÄN VAIN MITTAAMISEEN, ei piirtoon. Kokeiltu
         * 9.8.2026: leikatun renkaan piirtäminen muuttaa kuvaa, koska
         * vesimonikulmiolla on rantaviivan väristä stroke — leikatun
         * reunan kohdalle ilmestyy tekoranta pitkin kuvan laitaa.
         * Venetsiassa se näkyi 301 pikselin erona oikeassa
         * alanurkassa. Alkuperäinen rengas piirtyy oikein, koska SVG
         * rajaa sen näkymättömän osan pois ilman reunaviivaa.
         */
        const nakyva = renkaanAla(leikkaaLaatikkoon(rengas, rajat)) / laatikonAla;
        if (nakyva > 0.5) {
          console.log(`  vesirelaatio peittäisi ${Math.round(nakyva * 100)} % —`
            + ' piirretään rantaviivana');
          for (const geom of ulko) kerrokset.joet.push(`<polyline points="${pisteet(geom)}"/>`);
          break;
        }
        if (sisa.length) {
          kerrokset.vedet.push(`<path fill-rule="evenodd" d="${polku([rengas, ...sisa])}"/>`);
        } else {
          kerrokset.vedet.push(`<polygon points="${pisteet(rengas)}"/>`);
        }
      }
      continue;
    }
    if (e.type !== 'way' || !e.geometry?.length) continue;
    const t = e.tags ?? {};
    if (t.highway) {
      const i = KADUT.findIndex((k) => k.luokat.includes(t.highway));
      if (i >= 0) kerrokset.kadut[i].push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.waterway) {
      kerrokset.joet.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.natural === 'coastline') {
      // Kerätään talteen; meri täytetään näistä alempana.
      rantaviivat.push(e.geometry);
    } else if (t.natural === 'water') {
      /*
       * SUIHKULÄHDETTÄ EI PIIRRETÄ VEDEKSI.
       *
       * Kolmen kilometrin kartalla parinkymmenen metrin allas on
       * muutaman pikselin täplä, joka lukee virheenä: Madridin
       * Cibeleen aukio ja Tukholman Sergelin tori näyttivät
       * pisteentarkistimessa upotetuilta, koska aukion oma
       * suihkulähde piirtyi vetenä juuri kohteen kohdalle. Järvi ja
       * lampi ovat eri asia, joten raja on pinta-alassa eikä tagissa:
       * alle 2000 neliömetrin (n. 45 × 45 m) vesi on koriste.
       */
      if (alaNelioMetreina(e.geometry) >= 2000) {
        kerrokset.vedet.push(`<polygon points="${pisteet(e.geometry)}"/>`);
      }
    } else if (t.railway) {
      kerrokset.radat.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.barrier === 'city_wall' || t.historic === 'citywalls') {
      kerrokset.muurit.push(`<polyline points="${pisteet(e.geometry)}"/>`);
    } else if (t.historic === 'ruins' || t.historic === 'archaeological_site') {
      /*
       * Suljettu polku on alue ja täytetään; avoin polku on muuri tai
       * pylväsrivi ja piirtyy viivana. Ero luetaan geometriasta eikä
       * merkinnöistä, koska OSM ei erottele näitä tageilla.
       */
      const g = e.geometry;
      const suljettu = g.length > 3
        && g[0].lat === g[g.length - 1].lat && g[0].lon === g[g.length - 1].lon;
      if (suljettu) kerrokset.rauniot.push(`<polygon points="${pisteet(g)}"/>`);
      else kerrokset.raunioviivat.push(`<polyline points="${pisteet(g)}"/>`);
    } else {
      kerrokset.puistot.push(`<polygon points="${pisteet(e.geometry)}"/>`);
    }
  }

  /*
   * MERI ON KAUPUNKIKOHTAISESTI VALITTAVA (meri: true), eikä se ole
   * oletuksena päällä. Syy on kova ja mitattu: Venetsiassa täyttö
   * peitti KOKO KAUPUNGIN vedellä. Laguunissa rantaviiva pilkkoutuu
   * kymmeniksi pätkiksi, joista osa sulkeutuu väärin päin, ja
   * lopputulos oli kartta jossa saaret olivat meren alla.
   *
   * Luulin ensin, että tyhjään tulokseen peräytyminen riittäisi
   * turvaksi. Ei riitä: peräännytys laukeaa vain kun renkaita ei
   * synny lainkaan, ei silloin kun ne ovat vääriä. Geometrinen
   * heuristiikka, joka voi kääntää maan ja meren päikseen, ei kuulu
   * oletukseksi — se kuuluu valinnaksi, jonka tekijä on katsonut.
   *
   * Toinen vahti on pinta-ala: jos renkaat peittävät yli 85 %
   * rajauksesta, jotain meni pieleen ja piirretään vanha rantanauha.
   * Kaupunkia ei ole, jossa meri veisi niin paljon ja kartta olisi
   * silti mielekäs.
   *
   * Vanha nauha ei ole hätäratkaisu vaan pelin oma kartankieli:
   * pääkartalla meri on rantaa myötäilevä viiva (.sea-echo, sama sävy
   * #b99a68). Kapeille salmille se riittää yhä, ja juuri niin
   * Tukholma piirrettiin ennen.
   */
  if (rantaviivat.length) {
    const nauhaksi = () => {
      for (const geom of rantaviivat) kerrokset.joet.push(`<polyline points="${pisteet(geom)}"/>`);
    };
    if (!meri) {
      nauhaksi();
    } else {
      const { renkaat, saaret } = merenTaytto(ketjutaSuunnassa(rantaviivat), rajat,
        meri === 'maa' ? 'maa' : 'vesi');
      /*
       * Näkyvä vesi = meri miinus saaret. Ero on olennainen
       * pelkkien saarten tapauksessa (Suomenlinnan kainalo), jossa
       * meri on koko laatikko mutta iso osa siitä on saarten alla.
       */
      const pintaAla = renkaat.reduce((summa, rengas) => summa + renkaanAla(rengas), 0)
        - saaret.reduce((summa, saari) => summa + renkaanAla(saari), 0);
      if (!renkaat.length || pintaAla > laatikonAla * 0.85) {
        if (renkaat.length) {
          console.log(`  VAROITUS: meri peittäisi ${Math.round((pintaAla / laatikonAla) * 100)} %`
            + ' rajauksesta — piirretään rantanauha. Tarkista rajaus.');
        }
        nauhaksi();
      } else {
        for (const rengas of renkaat) kerrokset.meri.push(`<polygon points="${pisteet(rengas)}"/>`);
        for (const saari of saaret) kerrokset.saaret.push(`<polygon points="${pisteet(saari)}"/>`);
      }
    }
  }
  return kerrokset;
}

/**
 * Kerrokset SVG-ryhmiksi. `mitta` skaalaa viivanleveydet: kainalossa
 * on pienempi mittakaava, joten samat pikselileveydet tekisivät siitä
 * mustan mötkön.
 */
function kerrosKuvaus(kerrokset, mitta = 1, rauniokaupunki = false) {
  const v = (n) => (n * mitta).toFixed(2);
  /*
   * RAUNIOKAUPUNKI kääntää kartan painotuksen (Petra 19.8.2026).
   * Tavallisessa kaupungissa polku on suojatie tai puistokäytävä ja
   * piirtyy siksi kaikkein haaleimpana. Raunioalueella se on itse
   * kaupunki: Petrassa Siq, hautojen katu ja Ad Deirin portaat ovat
   * OSM:ssä highway=path, eikä kartalla ole yhtään muuta katua. Sama
   * koskee raunioalueiden reunaviivaa — kaivausalue ei ole tausta
   * vaan kartan aihe.
   *
   * MITTA EI OLE ARVAUS. Ensimmäinen ajo tehtiin oletusarvoilla ja
   * KATSOTTIIN: 175 elementtiä piirtyi niin haaleana, että kuva oli
   * käytännössä tyhjä paperi. Leveydet ja sävyt nostettiin tässä
   * asuinkadun tasolle, joka on julisteen oma sävyperhe eikä uusi väri.
   */
  const polkuLuokka = KADUT.findIndex((k) => k.luokat.includes('footway'));
  const katuryhmat = KADUT.map((k, i) => {
    const polku = rauniokaupunki && i === polkuLuokka;
    const vari = polku ? '#bfae8b' : (PALETTI.kadut?.[i] ?? k.vari);
    const leveys = polku ? 1.8 : k.leveys;
    return `<g fill="none" stroke="${vari}" stroke-width="${v(leveys)}"
    stroke-linecap="round" stroke-linejoin="round">${kerrokset.kadut[i].join('')}</g>`;
  }).join('\n');
  const raunioReuna = rauniokaupunki ? '#a89164' : RAUNIOREUNA;
  const raunioViiva = rauniokaupunki ? 2.4 : 1.2;
  return `
  <!-- Meri pohjimmaiseksi, saaret sen päälle: saaren ranta on
       rantaviivan sisärengas, ja ilman tätä järjestystä luodot
       katoaisivat veden alle. -->
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.meri.join('')}</g>
  <g fill="${PAPERI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.saaret.join('')}</g>
  <g fill="${PUISTO}" stroke="none">${kerrokset.puistot.join('')}</g>
  <g fill="${RAUNIO}" stroke="${raunioReuna}" stroke-width="${v(raunioViiva)}">${kerrokset.rauniot.join('')}</g>
  <g fill="none" stroke="${raunioReuna}" stroke-width="${v(raunioViiva + 0.4)}"
     stroke-linecap="round" stroke-linejoin="round">${kerrokset.raunioviivat.join('')}</g>
  <!-- Joen reunaviiva: leveämpi tumma veto alle, vesi päälle — jokeen
       tulee sama ohut ranta kuin vesialtaiden stroke-reunaan. -->
  <g fill="none" stroke="${VESIREUNA}" stroke-width="${v(16.4)}" stroke-linecap="round"
     stroke-linejoin="round" opacity="0.55">${kerrokset.joet.join('')}</g>
  <g fill="none" stroke="${VESI}" stroke-width="${v(14)}" stroke-linecap="round"
     stroke-linejoin="round">${kerrokset.joet.join('')}</g>
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.vedet.join('')}</g>
  <g fill="none" stroke="${RATA}" stroke-width="${v(1.4)}" stroke-dasharray="${v(7)} ${v(5)}">${kerrokset.radat.join('')}</g>
  ${katuryhmat}
  <!-- Kaupunginmuuri päällimmäisenä ja katuja tummempana: se on
       muurikaupungin kartan tärkein viiva, ei tausta. -->
  <g fill="none" stroke="${MUURI}" stroke-width="${v(3.2)}" stroke-linecap="round"
     stroke-linejoin="round">${kerrokset.muurit.join('')}</g>`;
}

/*
 * KAINALOKARTTA (omistajan ratkaisu 9.8.2026: "Liian laajoissa
 * kartoissa voisi tehdä pienen kainalon kartan siihen kohtaa missä ei
 * ole tärkeää ja laittaa minikartan kaukokohteen kera siihen").
 *
 * Ongelma oli tämä: kun lehdessä mainittu kohde on 4 km keskustasta,
 * sen mukaan ottaminen levittää rajauksen katupuuroksi ja työntää
 * kaupungin oman juonen — joen, rannan, kanavakehän — kuvan laitaan.
 * Wienin Schönbrunn ja Budapestin Sankarien aukio jäivät tästä syystä
 * ensin kokonaan pois.
 *
 * Kainalo on oma tiukka rajaus kaukokohteen ympäriltä, piirrettynä
 * pääkuvan tyhjään kulmaan omine kehyksineen. Kohde numeroidaan samaan
 * sarjaan pääkartan kanssa, ja koska karttapiste() osaa sijoittaa sen
 * (ks. maakartat.js), se on pelissä napautettava kuten muutkin.
 *
 * Sijainti (x, y, leveys) annetaan prosentteina pääkuvasta. KORKEUTTA
 * EI ANNETA vaan se lasketaan kainalon omasta kuvasuhteesta — muuten
 * minikartta venyisi ja sen kadut valehtelisivat.
 */
function piirraKainalo(kainalo, elementit, W, H, ydinW, rauniokaupunki = false) {
  const x0 = (kainalo.x / 100) * W;
  const y0 = (kainalo.y / 100) * H;
  const w = (kainalo.leveys / 100) * W;
  const h = w / kuvasuhde(kainalo.rajat);
  const r = kainalo.rajat;
  const x = (lon) => (x0 + ((lon - r.lansi) / (r.ita - r.lansi)) * w).toFixed(1);
  const y = (lat) => (y0 + ((r.pohjoinen - lat) / (r.pohjoinen - r.etela)) * h).toFixed(1);
  /*
   * Viivat kainalon mittakaavaan: sama suhde kuin ruudun leveys
   * YDINRAJAUKSEN leveyteen, pohjalla 0,45 jottei kaikki katoa.
   * Ydinrajaus eikä koko kuva, koska reunuksen leventämässä kuvassa
   * (laajennus) sekä ruutu että pääkartta piirtyvät samalla px/km:llä
   * kuin ennen — pelkkä w/W kutistuisi laajennuksen verran ilman että
   * mikään kuvassa muuttuu.
   */
  const mitta = Math.max(0.45, w / ydinW);
  const kerrokset = kokoaKerrokset(elementit, x, y, kainalo.rajat, kainalo.meri);
  const tunnus = `kainalo${Math.round(x0)}_${Math.round(y0)}`;
  /*
   * Suuntamerkinnän koko on mitattu eikä arvattu. Lehti näyttää kuvan
   * palstan levyisenä, eli puhelimessa noin 360 CSS-pikselinä, joten
   * 1600 pikselin kuva kutistuu suhteessa 0,22. Ensimmäinen versio
   * käytti kokoa W/80 = 20 px, mikä on ruudulla 4,5 px — se ei ole
   * pieni vaan näkymätön. W/35 antaa noin 10 CSS-pikseliä, joka on
   * luettavissa. Siksi myös teksti pidetään lyhyenä ("4 km
   * lounaaseen"): kohteen nimi on joka tapauksessa kartan alla
   * selitelistassa, jossa se on aina luettava.
   *
   * Mitta on YDINRAJAUKSEN leveys eikä koko kuvan: lehti sovittaa
   * kehykseen juuri ydinrajauksen, joten reunuksen leventämässä
   * kuvassa (laajennus) W/35 kasvattaisi tekstin ruudulla samassa
   * suhteessa.
   */
  const koko = Math.round(ydinW / 35);
  /*
   * Teksti ruudun ylle, paitsi jos ruutu on liian lähellä ylälaitaa —
   * silloin se leikkautuisi kuvan reunaan. Budapestissa kävi juuri
   * niin: kainalo on 3 %:n korkeudella, ja "3 km koilliseen" jäi
   * puoliksi kuvan ulkopuolelle. Alapuolella tilaa on aina, koska
   * ruutu ei ulotu kuvan alareunaan asti.
   */
  const ylla = y0 > koko * 1.4;
  const tekstiY = ylla ? y0 - 12 : y0 + h + koko;
  const teksti = kainalo.suunta
    ? `<text x="${(x0 + w / 2).toFixed(1)}" y="${tekstiY.toFixed(1)}" text-anchor="middle"
        font-family="Georgia, serif" font-size="${koko}" fill="#8a7654">${kainalo.suunta}</text>`
    : '';
  return `
  <clipPath id="${tunnus}"><rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}"
    width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="6"/></clipPath>
  <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"
    rx="6" fill="${PAPERI}"/>
  <g clip-path="url(#${tunnus})">${kerrosKuvaus(kerrokset, mitta, rauniokaupunki)}</g>
  <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"
    rx="6" fill="none" stroke="${VESIREUNA}" stroke-width="2.5"/>
  ${teksti}`;
}

function piirra(kaupunki, elementit, kainaloAineistot = []) {
  const {
    kainalot = [], meri = false, laajennus = 1, rauniokaupunki = false,
  } = KAUPUNGIT[kaupunki];
  const rajat = piirretytRajat(KAUPUNGIT[kaupunki]);
  // Ydinrajaus pysyy 1600 pikselinä myös laajennetussa kuvassa, ks.
  // tiedoston alun kommentti.
  const W = Math.round(1600 * laajennus);
  const H = Math.round(W / kuvasuhde(rajat));
  const x = (lon) => (((lon - rajat.lansi) / (rajat.ita - rajat.lansi)) * W).toFixed(1);
  const y = (lat) => (((rajat.pohjoinen - lat) / (rajat.pohjoinen - rajat.etela)) * H).toFixed(1);
  const kerrokset = kokoaKerrokset(elementit, x, y, rajat, meri);
  const kainaloKuvat = kainalot
    .map((k, i) => piirraKainalo(k, kainaloAineistot[i] ?? [], W, H, W / laajennus, rauniokaupunki))
    .join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPERI}"/>
  ${kerrosKuvaus(kerrokset, 1, rauniokaupunki)}
  ${kainaloKuvat}
</svg>`;
}

const kaupunki = process.argv[2];
if (!KAUPUNGIT[kaupunki]) {
  console.error(`Anna kaupunki: ${Object.keys(KAUPUNGIT).join(', ')}`);
  process.exit(1);
}
console.log('Haetaan OpenStreetMap-aineisto (Overpass)…');
const elementit = await haeOverpassSitkeasti(
  // Haku koskee koko piirrettävää alaa, myös reunusta — muuten
  // laajennetun kartan laidoille jäisi tyhjää paperia.
  piirretytRajat(KAUPUNGIT[kaupunki]),
  KAUPUNGIT[kaupunki].palvelutiet ?? false,
  KAUPUNGIT[kaupunki].jalkakaydat ?? false,
);
console.log(`${elementit.length} elementtiä.`);
/*
 * Kainalot haetaan omina kyselyinään ja TAUON TAKAA: Overpass
 * rate-limittaa peräkkäiset ajot, ja kolmen kaupungin erässä se
 * kaatoi ajon kerran jo ilman kainaloita.
 */
const kainaloAineistot = [];
for (const [i, kainalo] of (KAUPUNGIT[kaupunki].kainalot ?? []).entries()) {
  await new Promise((r) => setTimeout(r, 4000));
  console.log(`Haetaan kainalo ${i + 1}…`);
  const osat = await haeOverpassSitkeasti(kainalo.rajat);
  console.log(`  ${osat.length} elementtiä.`);
  kainaloAineistot.push(osat);
}
const svg = piirra(kaupunki, elementit, kainaloAineistot);
mkdirSync(resolve(JUURI, 'assets/kartat'), { recursive: true });
/*
 * Värinäyte EI korvaa julistetta vaan menee omaan tiedostoonsa
 * (--vari, ks. PALETIT). Pelin kartta on aina <kaupunki>-keskusta.png.
 */
// Paletti hyväksyttiin 15.8.2026 ("Joo vaihda väri berliiniin"),
// joten --vari kirjoittaa suoraan pelin käyttämän tiedoston.
const tiedosto = VARINAYTE ? `${kaupunki}-varikartta` : `${kaupunki}-keskusta`;
const svgPolku = resolve(JUURI, `assets/kartat/${tiedosto}.svg`);
writeFileSync(svgPolku, svg);
// Rasterointi PNG:ksi pelin Chromiumilla: SVG:n koko katuverkko on
// selaimelle raskas joka avauksella — PNG piirtyy heti.
const pngPolku = resolve(JUURI, `assets/kartat/${tiedosto}.png`);
const skripti = `
const { chromium } = require('playwright');
(async () => {
  const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
  const sivu = await (await selain.newContext({ viewport: { width: 10, height: 10 } })).newPage();
  await sivu.goto('file://${svgPolku}');
  const koko = await sivu.evaluate(() => {
    const s = document.querySelector('svg');
    return { w: Number(s.getAttribute('width')), h: Number(s.getAttribute('height')) };
  });
  await sivu.setViewportSize({ width: koko.w, height: koko.h });
  await sivu.screenshot({ path: '${pngPolku}' });
  await selain.close();
})();`;
/*
 * NODE_PATH mukaan, koska playwright ei ole pelin riippuvuus vaan
 * ympäristön: kontissa se on /opt/node22/lib/node_modules. Ilman tätä
 * rasterointi kaatui "Cannot find module 'playwright-core'" -virheeseen
 * vasta SVG:n valmistuttua, eli työ oli jo tehty kun se kaatui.
 */
execFileSync('node', ['-e', skripti], {
  cwd: JUURI,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_PATH: [process.env.NODE_PATH, '/opt/node22/lib/node_modules']
      .filter(Boolean).join(':'),
  },
});
const rajat = KAUPUNGIT[kaupunki].rajat;
const piirto = piirretytRajat(KAUPUNGIT[kaupunki]);
console.log(`Valmis: assets/kartat/${tiedosto}.png`);
if (VARINAYTE) {
  console.log('Värikartta valmis — kytke maakartat.js:n varikartta-kenttään ja sw.js:n SHELLiin, ja KATSO KUVA SILMIN.');
  process.exit(0);
}
console.log('KAUPUNKIKARTAT-rivit:');
console.log(`    polku: 'assets/kartat/${kaupunki}-keskusta.png',`);
console.log(`    lahde: '© OpenStreetMap-tekijät (ODbL)',`);
console.log(`    rajat: { pohjoinen: ${rajat.pohjoinen}, etela: ${rajat.etela}, lansi: ${rajat.lansi}, ita: ${rajat.ita} },`);
if (piirto !== rajat) {
  console.log(`    piirtoRajat: { pohjoinen: ${piirto.pohjoinen}, etela: ${piirto.etela},`
    + ` lansi: ${piirto.lansi}, ita: ${piirto.ita} },`);
}
/*
 * Kainalon KORKEUS lasketaan tässä eikä kirjoiteta käsin: peli tarvitsee
 * sen asemoidakseen kainalon kohteet, ja jos luku poikkeaisi piirretystä,
 * numero osuisi eri kohtaan kuin kartta. Yksi laskenta, kaksi käyttäjää.
 */
const kainalot = KAUPUNGIT[kaupunki].kainalot ?? [];
if (kainalot.length) {
  console.log('    kainalot: [');
  for (const k of kainalot) {
    // Kainalon mitat ovat prosentteja PIIRRETYSTÄ kuvasta, joten myös
    // korkeus lasketaan piirretyn kuvan kuvasuhteesta.
    const korkeus = +((k.leveys * kuvasuhde(piirto)) / kuvasuhde(k.rajat)).toFixed(2);
    console.log(`      { rajat: { pohjoinen: ${k.rajat.pohjoinen}, etela: ${k.rajat.etela},`
      + ` lansi: ${k.rajat.lansi}, ita: ${k.rajat.ita} },`);
    console.log(`        x: ${k.x}, y: ${k.y}, leveys: ${k.leveys}, korkeus: ${korkeus} },`);
  }
  console.log('    ],');
}
