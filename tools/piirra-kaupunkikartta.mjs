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
 * Tuloste: assets/kartat/<kaupunki>-keskusta.png ja rajat-lohko,
 *          joka liitetään js/packs/maakartat.js:n KAUPUNKIKARTAT-
 *          tauluun (pisteet asemoidaan siitä prosentteina).
 *
 * Uusi kaupunki: lisää KAUPUNGIT-tauluun rajaus, joka kattaa vain
 * ydinkeskustan kuuluisimmat kohteet (n. 5–8 km leveä alue — laajempi
 * muuttuu puuroksi). Aja työkalu ja KATSO kuva silmin ennen käyttöä.
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
    rajat: { pohjoinen: 52.54, etela: 52.485, lansi: 13.34, ita: 13.46 },
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
    kainalot: [
      {
        rajat: { pohjoinen: 48.191, etela: 48.178, lansi: 16.303, ita: 16.325 },
        x: 2, y: 56, leveys: 30, suunta: '4 km lounaaseen',
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
    // Hinta on etelälaita: Panthéon ja Luxembourgin puutarha jäävät
    // ulos. Vaihtoehto oli tiukempi rajaus ilman Montmartrea, mutta
    // silloin lapsen kaksi tunnetuinta kohdetta eivät olisi samassa
    // kuvassa.
    rajat: { pohjoinen: 48.892, etela: 48.847, lansi: 2.277, ita: 2.3675 },
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
    // Kolme lehden kohdetta jää alle puolen kilometrin päähän reunasta
    // mutta eri suuntiin: Sibelius-monumentti lännessä, Linnanmäki ja
    // Kotiharjun sauna pohjoisessa. Yksikään venytys ei saa niitä
    // kaikkia sisään ilman että kuva paisuu yli neljän kilometrin.
    rajat: { pohjoinen: 60.184, etela: 60.1545, lansi: 24.916, ita: 24.9835 },
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
        rajat: { pohjoinen: 60.152, etela: 60.1368, lansi: 24.969, ita: 24.9955 },
        x: 76, y: 69.15, leveys: 22, suunta: '3 km kaakkoon', meri: true,
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
    rajat: { pohjoinen: 51.525, etela: 51.4925, lansi: -0.16, ita: -0.06 },
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
  izmir: {
    // Konakin aukio, Kemeraltin basaari ja antiikin agora mahtuvat
    // samaan runsaan puolentoista kilometrin ruutuun, ja niiden väli on
    // yhtenäistä vanhaa kaupunkia — ei tyhjää kuten Masqatissa.
    // Kadifekale jää ulos: linnavuori on 1,5 km itään ja sen ja agoran
    // välissä on jyrkkä rinne, joka venyttäisi rajauksen kaksinkertaiseksi.
    rajat: { pohjoinen: 38.426, etela: 38.413, lansi: 27.124, ita: 27.142 },
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
    rajat: { pohjoinen: 33.348, etela: 33.332, lansi: 44.376, ita: 44.400 },
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
const VESI = '#e8d5a9';
const VESIREUNA = '#b99a68';
const PUISTO = '#efe6ca';
const RATA = '#d5c9b0';
const PAPERI = '#f6eeda';
// Muuri on kartan tummin viiva: pääkartan musteen sävy (.city-label),
// jotta se erottuu vaaleista kaduista mutta pysyy pergamentissa.
const MUURI = '#6f5a3c';

async function haeOverpass(rajat, palvelutiet = false) {
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
  const luokat = KADUT
    .flatMap((k) => k.luokat)
    .filter((l) => l !== 'service' || palvelutiet)
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
     * Isot järvet ja lahdet ovat OSM:ssä monikulmiorelaatioita, ja
     * niiden jäsenpoluilla ei ole omia merkintöjä — pelkkä
     * way["natural"="water"] ei siis löydä niitä lainkaan. Tukholmassa
     * se tarkoitti, että Riddarfjärden puuttui kartalta kokonaan.
     */
    relation["natural"="water"]${alue};
  );out geom;`;
  const vastaus = await fetch('https://overpass-api.de/api/interpreter', {
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
 */
async function haeOverpassSitkeasti(rajat, palvelutiet = false, yrityksia = 3) {
  for (let i = 1; ; i++) {
    try {
      return await haeOverpass(rajat, palvelutiet);
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
function kerrosKuvaus(kerrokset, mitta = 1) {
  const v = (n) => (n * mitta).toFixed(2);
  const katuryhmat = KADUT.map((k, i) => `<g fill="none" stroke="${k.vari}" stroke-width="${v(k.leveys)}"
    stroke-linecap="round" stroke-linejoin="round">${kerrokset.kadut[i].join('')}</g>`).join('\n');
  return `
  <!-- Meri pohjimmaiseksi, saaret sen päälle: saaren ranta on
       rantaviivan sisärengas, ja ilman tätä järjestystä luodot
       katoaisivat veden alle. -->
  <g fill="${VESI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.meri.join('')}</g>
  <g fill="${PAPERI}" stroke="${VESIREUNA}" stroke-width="${v(1.4)}">${kerrokset.saaret.join('')}</g>
  <g fill="${PUISTO}" stroke="none">${kerrokset.puistot.join('')}</g>
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
function piirraKainalo(kainalo, elementit, W, H) {
  const x0 = (kainalo.x / 100) * W;
  const y0 = (kainalo.y / 100) * H;
  const w = (kainalo.leveys / 100) * W;
  const h = w / kuvasuhde(kainalo.rajat);
  const r = kainalo.rajat;
  const x = (lon) => (x0 + ((lon - r.lansi) / (r.ita - r.lansi)) * w).toFixed(1);
  const y = (lat) => (y0 + ((r.pohjoinen - lat) / (r.pohjoinen - r.etela)) * h).toFixed(1);
  // Viivat kainalon mittakaavaan: sama suhde kuin ruudun leveys
  // pääkuvan leveyteen, pohjalla 0,45 jottei kaikki katoa.
  const mitta = Math.max(0.45, w / W);
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
   */
  const koko = Math.round(W / 35);
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
  <g clip-path="url(#${tunnus})">${kerrosKuvaus(kerrokset, mitta)}</g>
  <rect x="${x0.toFixed(1)}" y="${y0.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"
    rx="6" fill="none" stroke="${VESIREUNA}" stroke-width="2.5"/>
  ${teksti}`;
}

function piirra(kaupunki, elementit, kainaloAineistot = []) {
  const { rajat, kainalot = [], meri = false } = KAUPUNGIT[kaupunki];
  const W = 1600;
  const H = Math.round(W / kuvasuhde(rajat));
  const x = (lon) => (((lon - rajat.lansi) / (rajat.ita - rajat.lansi)) * W).toFixed(1);
  const y = (lat) => (((rajat.pohjoinen - lat) / (rajat.pohjoinen - rajat.etela)) * H).toFixed(1);
  const kerrokset = kokoaKerrokset(elementit, x, y, rajat, meri);
  const kainaloKuvat = kainalot
    .map((k, i) => piirraKainalo(k, kainaloAineistot[i] ?? [], W, H)).join('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPERI}"/>
  ${kerrosKuvaus(kerrokset)}
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
  KAUPUNGIT[kaupunki].rajat,
  KAUPUNGIT[kaupunki].palvelutiet ?? false,
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
const svgPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.svg`);
writeFileSync(svgPolku, svg);
// Rasterointi PNG:ksi pelin Chromiumilla: SVG:n koko katuverkko on
// selaimelle raskas joka avauksella — PNG piirtyy heti.
const pngPolku = resolve(JUURI, `assets/kartat/${kaupunki}-keskusta.png`);
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
console.log(`Valmis: assets/kartat/${kaupunki}-keskusta.png`);
console.log('KAUPUNKIKARTAT-rivit:');
console.log(`    polku: 'assets/kartat/${kaupunki}-keskusta.png',`);
console.log(`    lahde: '© OpenStreetMap-tekijät (ODbL)',`);
console.log(`    rajat: { pohjoinen: ${rajat.pohjoinen}, etela: ${rajat.etela}, lansi: ${rajat.lansi}, ita: ${rajat.ita} },`);
/*
 * Kainalon KORKEUS lasketaan tässä eikä kirjoiteta käsin: peli tarvitsee
 * sen asemoidakseen kainalon kohteet, ja jos luku poikkeaisi piirretystä,
 * numero osuisi eri kohtaan kuin kartta. Yksi laskenta, kaksi käyttäjää.
 */
const kainalot = KAUPUNGIT[kaupunki].kainalot ?? [];
if (kainalot.length) {
  console.log('    kainalot: [');
  for (const k of kainalot) {
    const korkeus = +((k.leveys * kuvasuhde(rajat)) / kuvasuhde(k.rajat)).toFixed(2);
    console.log(`      { rajat: { pohjoinen: ${k.rajat.pohjoinen}, etela: ${k.rajat.etela},`
      + ` lansi: ${k.rajat.lansi}, ita: ${k.rajat.ita} },`);
    console.log(`        x: ${k.x}, y: ${k.y}, leveys: ${k.leveys}, korkeus: ${korkeus} },`);
  }
  console.log('    ],');
}
