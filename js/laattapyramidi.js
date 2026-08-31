/*
 * LAATTAPYRAMIDI — yksi maailmanlaajuinen kartta, näkyvät laatat vain.
 *
 * Omistajan päälinjaus 30.8.2026 (Raamattu, "YKSI MAAILMANBITTIKARTTA -
 * MAALEHDISTA LUOVUTAAN", sanatarkka: *"koko maailma on kokoajan yksi
 * iso bittikartta josta vain ladataan kulloinkin tarvittava palanen,
 * riippumatta siita onko maailma paalla vai ei? Maailma nappi pitaisi
 * vain ja ainoastaan rajoittaa miten pitkalle pelaaja voi panoroida
 * kartalla."*).
 *
 * Laatat tekee tools/generoi-laattapyramidi.mjs ja ne asuvat ämpärissä
 * polussa `pyramidi/z<taso>/<sarake>/<rivi>.webp`. Luettelo
 * (`pyramidi.json`) kertoo arkin paikan laudalla, laattakoon ja tasojen
 * mitat — peli ei arvaa niistä mitään.
 *
 * === TÄMÄ ON PELIN AINOA KARTTAPOHJA ===============================
 *
 * Omistajan päätös 30.8.2026, sanatarkka: *"Ei kun poista kaikki muut
 * vaihtoehdot käytöstä ja kytke peliin vain tämä uusi kartta, ei mitään
 * muuta."* ja *"Joo, ei pidetä mitään varajärjestelmiä yllä."*
 * Kytkintä (`?pyramidi`), kehittäjävalikon riviä ja vanhaa
 * maakohtaista fokuslehtijärjestelmää EI OLE — ne purettiin
 * kokonaisuudessaan, eikä pyramidille ole varajärjestelmää.
 *
 * === MIKSI SVG-KUVIA EIKÄ CANVASTA =================================
 *
 * Laatat ovat `<image>`-elementteinä laudan koordinaateissa. Silloin kartan oma siirtokuori liikuttaa niitä
 * kompositorilla eikä yksikään kehys maalaa niitä uudelleen — juuri se,
 * mitä Raamatun "BITTIKARTTA VAIHEET 2-3" vaatii ("kartan kooste elää
 * KARTTAKUOREN SISÄLLÄ"). Ruutuavaruudessa elävä canvas mitattiin
 * kahdeksan kertaa hitaammaksi, eikä sitä siis tehdä.
 *
 * === NELJÄ SÄÄNTÖÄ =================================================
 *
 * 1. NOUTO ON LAAJA, KIINNITYS KAPEA. Näkyvän alueen ympäriltä
 *    NOUDETAAN ruudun verran joka suuntaan (omistajan iPad-havainto
 *    30.8.2026: *"Kartta pitää esiladata ennen siirtoa kuten se
 *    vanhempi kartta... lataa pelaajan näkymän ympäriltä ruudun verran
 *    joka suuntaan valmiiksi niin panorointi ei voi näyttää tyhjää
 *    karttapohjaa."*), mutta DOMiin KIINNITETÄÄN vain kapea reunus.
 *    Ks. seuraava osio: nämä kaksi ovat eri hintaisia.
 *
 * 2. VANHA TASO EI KATOA ENNEN KUIN UUSI ON PAIKALLAAN. Zoomatessa
 *    taso vaihtuu, ja jos edellisen tason laatat poistetaan heti,
 *    ruudulla on tyhjää sen ajan, jonka uudet laatat latautuvat.
 *    Sääntö oli kirjoitettu tähän jo pilotissa, mutta KOODI EI
 *    NOUDATTANUT SITÄ: poisto ajettiin samassa synkronisessa
 *    päivityksessä, siis ennen kuin yksikään uusi laatta oli perillä.
 *    Juuri se oli omistajan havainto 30.8.2026 (*"Miksi zoomatessa
 *    uusi kartta latautuu hitaasti?"*). Nyt vanha taso jää uusien alle
 *    ja poistuu vasta kun uuden tason NÄKYVÄT laatat ovat load-
 *    tapahtuneet — tai kun kahden sekunnin katto täyttyy, ettei yksi
 *    saapumaton laatta jätä kahta tasoa päällekkäin (paivitaKerros).
 *
 * 2b. KARKEA POHJA ON AINA ALLA. Näkyvän alueen laatat pidetään myös
 *    KAKSI TASOA karkeampina omassa alakerroksessaan. Sama ala on
 *    silloin 1/16 laattoja, eli kuorma on olematon — ja ruudulla se
 *    tarkoittaa, ettei tyhjää karttapohjaa voi näkyä missään
 *    tilanteessa: pahimmillaan kartta on hetken sumea ja terävöityy.
 *    Näin tekee jokainen karttakirjasto, ja se on halvempi kuin mikä
 *    tahansa reunuksen kasvatus.
 *
 * 3. LAATTA PIIRRETÄÄN ARKILLE KERRAN — KIERRON HOITAA LAUDAN KOPIO.
 *    Kiertävällä laudalla koko sisältö on olemassa kahdesti: juuriryhmä
 *    kattaa välin [0, leveys) ja sen <use>-kopio välin
 *    [leveys, 2 × leveys) (js/ui.js laudanKierto, js/kartta.js
 *    LAVAIKKUNA). Kopio on juuriryhmän PÄÄLLÄ, ja siihen kuuluu myös
 *    paperin pohja — läpinäkymätön suorakaide.
 *
 *    Siksi arkin oikealle puolelle piirretty laatta EI näy: kopion
 *    pergamentti maalaa sen yli. Juuri niin kävi (omistajan kuvakaappaus
 *    31.8.2026, näkymä Kamtšatkan yllä, mittakaava 1000 km): kartta
 *    piirtyi vain ruudun vasempaan puolikkaaseen ja sauman oikealla
 *    puolella oli tyhjää pergamenttia. Laatat OLIVAT puussa oikeilla
 *    paikoillaan (mitattu: 30 laattaa, vaakapeitto 100 %), ne olivat
 *    ladattuja, ja kopion piilottaminen paljasti kartan kokonaisena.
 *
 *    Laatan paikka on siis AINA sen oma paikka arkilla: sarake c on
 *    pikselissä c · laatta, olipa näkymä sauman kummalla puolella
 *    tahansa. Näkyvyys sen sijaan on kysyttävä KIERTÄEN (osuuKiertaen):
 *    ruutu voi olla kopion päällä, jolloin ruudun täyttävä laatta on
 *    kokonaisen arkinleveyden päässä siitä.
 *
 *    TASON LEVEYS EI OLE LAATTAKOON MONIKERTA. Se on 675 · 2^z pikseliä
 *    (86 400 syvimmällä), eikä yksikään niistä ole jaollinen 512:lla —
 *    viimeinen sarake on VAJAA. Sen leveys luetaan siksi tason omista
 *    pikseleistä eikä laattakoosta, ja arkin oikea reuna osuu tasan
 *    kohtaan leveys, jossa kopio jatkaa.
 */
import { el } from './mapart.js';
import { pyramidiUrl } from './media.js';

/*
 * === NOUTAMINEN JA KIINNITTÄMINEN OVAT ERI ASIOITA =================
 *
 * Omistaja katsoi iPadilla panoroinnin jälkeistä hetkeä ja näki ruudun
 * yläosassa TYHJÄN KARTTAPOHJAN. Syy oli tässä tiedostossa: reunus oli
 * YKSI LAATTA (`PUSKURI = 1`), eli noin 120 CSS-pikseliä — murto-osa
 * siitä, minkä yksi sormenveto ehtii paljastaa. Pyyntö oli "ruudun
 * verran joka suuntaan", ja se on kirjaimellisesti 3 × 3 ruudullista
 * eli YHDEKSÄNKERTAINEN laattamäärä.
 *
 * Naiivisti tehtynä se kaataisi puhelimen, mutta vain toinen puoli
 * työstä on kallis — ja mitattuna (30.8.2026, Chromium, iPhone-profiili
 * 390 × 844 dpr 3, z7, renderöijäprosessin RSS):
 *
 *   NOUTO   verkko + selaimen HTTP-välimuisti. Laatta on 15-40 kt
 *           (mitattu ämpäristä), ja jos kuvaa ei kiinnitetä puuhun,
 *           siitä ei jää purettua bittikarttaa. 250 laattaa ≈ 6 Mt
 *           siirtoa. HALPA.
 *   KIINNITYS  DOM + purettu bittikartta. Ruudulla NÄKYVÄ laatta
 *           maksaa 512² × 4 = 1 Mt purettuna. Ruudun ulkopuolelle
 *           jäävää laattaa selain ei pura ennen kuin se maalataan:
 *           54 → 238 kiinnitettyä laattaa nosti renderöijän RSS:ää
 *           vain ~80 Mt (ei 190 Mt), eli ruudun ulkopuolinen laatta
 *           maksaa satoja kilotavuja, ei megatavua. KOHTALAINEN.
 *
 * Siksi: NOUDA LAAJASTI, KIINNITÄ KAPEASTI. Noudettu laatta on jo
 * välimuistissa, kun se kiinnitetään — mitattuna hitaalla 3G:llä
 * panoroinnin jälkeinen tyhjä hetki lyheni sekunneista alle sadasosaan
 * siitä (luvut docs/moduulit/laattapyramidi.md luku 6h).
 *
 * REUNUKSET MITATAAN RUUDULLISINA, EI LAATTOINA. Laatan koko ruudulla
 * riippuu tason ja mittakaavan suhteesta (0,71...1,41 ×), ja ruutu on
 * pystysuunnassa yli kaksi kertaa leveyttään — yksi laatta reunuksena
 * on eri asia ylhäällä ja sivulla. Ruudullinen on sama mitta kuin se,
 * jonka sormi liikuttaa.
 */

/**
 * Kiinnitys: näkyvän alueen ympärille tämän verran RUUTUJA joka
 * suuntaan. Puoli ruutua kattaa mitatusti tavallisen sormenvedon
 * (390 × 844 -profiilissa 195 px sivulle, 422 px ylös ja alas).
 */
const KIINNITYS_RUUTUJA = 0.5;

/**
 * Kiinnityksen LISÄREUNUS panoroinnin suuntaan (perusreunuksen päälle).
 *
 * Karttapalvelut painottavat esilatausta liikkeen suuntaan, ja tässä se
 * on halpa: reunus kasvaa vain YHDELLE sivulle. Omistaja pyysi "joka
 * suuntaan", joten tämä ei korvaa perusreunusta vaan LISÄÄ siihen —
 * liikkeen suunnassa katetaan kokonainen ruudullinen.
 */
const SUUNTALISA_RUUTUJA = 0.5;

/**
 * Nouto: ruutuja joka suuntaan. Tämä on omistajan pyytämä "ruudun
 * verran joka suuntaan" — vain verkkoa ja välimuistia, ei DOMia.
 */
const NOUTO_RUUTUJA = 1;

/** Enintään näin monta laattaa jonossa noutoa odottamassa. */
const NOUTO_KATTO = 400;

/** Rinnakkaisia esilatauksia. Näkyvät laatat saavat kaistan ensin. */
const NOUTO_RINNAKKAIN = 4;

/**
 * Esilataus alkaa vasta tämän kuluttua näkymän asettumisesta.
 *
 * Näkyvät laatat ovat samassa jonossa saman palvelimen kanssa, ja
 * hitaalla yhteydellä esilataus veisi niiltä kaistaa juuri silloin kun
 * pelaaja katsoo tyhjää kohtaa. Viive on myös eleiden suodatin:
 * peräkkäisistä pikkuvedoista ei synny kolmea päällekkäistä jonoa.
 */
const NOUTO_VIIVE_MS = 300;

/**
 * Pohjakerroksen SYVIN taso — pohja ei seuraa terävää tasoa tämän yli.
 *
 * === MIKSI POHJA NAULATAAN ==========================================
 *
 * Omistajan iPhone-havainto 31.8.2026: *"Ja välillä kartta ei piirry
 * ollenkaan."* — noin 1000 km mittakaavassa Amerikan yllä ruudulla oli
 * pelkkä pergamentti ja sen päällä elävä kerros (nimet, pisteet,
 * viivaimen asteluvut).
 *
 * Syy oli se, että pohja SEURASI terävää tasoa (z − 2). Kun taso
 * vaihtuu, molemmat kerrokset menevät saman tason vaihdon läpi, ja jos
 * kummankaan laatat eivät olleet ehtineet perille, molemmat tyhjenivät
 * samalla hetkellä — eikä alla ollut mitään. Harva pyramidi on
 * oletuksena pois, joten `meriSavy`-pohjaakaan ei ole.
 *
 * Toistettu mitattuna (Chromium, iPhone-profiili, välimuisti tyhjätty
 * ja yhteys 400 kbit/s + 400 ms KÄYNNISTYKSEN JÄLKEEN, neljä
 * loitonnusporrasta 150 ms välein): peitto **0 % 202 näytteessä
 * 208:sta**, eli kartta oli poissa noin kuusi sekuntia.
 *
 * Naulattuna z3:een pohja EI VAIHDU tasoilla z5…z7 — siis koko siinä
 * lähialueessa, jossa pelaaja liikkuu — joten se ladataan kerran eikä
 * se voi tyhjentyä zoomatessa. Koko maailma on z0–z3:lla vain 109
 * laattaa, ja näkymän ympäriltä niitä on kiinnitettynä mitattuna 3…11.
 *
 * Matalilla tasoilla pohja seuraa yhä (z − 2), koska z3 olisi silloin
 * TERÄVÄMPI kuin tarkka taso: pelkkä kustannus ilman hyötyä.
 */
const POHJA_SYVIN = 3;

/**
 * Pohjakerroksen taso: AINA sama, tai ei pohjaa lainkaan.
 *
 * Naulaus on ehdoton, koska "seuraa terävää tasoa mutta enintään
 * z3:een" mitattiin riittämättömäksi: kymmenen nopean zoomiportaan
 * sarjassa (molempiin suuntiin, välimuisti tyhjänä) pohjan taso vaihtui
 * yhä rajalla z4 ↔ z5, ja silloin ruutu tyhjeni uudestaan — mitattuna
 * 202 näytettä 233:sta. Kun pohja on aina z3, se ladataan istunnossa
 * kerran eikä yksikään zoomiporras voi tyhjentää sitä.
 *
 * HINTA ON PIENI JA KERTALUONTOINEN. Koko maailma on z3:lla 77 laattaa
 * (11 × 7) eli noin 2 Mt, ja laatat ovat `immutable`-välimuistissa
 * vuoden. Peli aloittaa maailmanäkymästä, joten uloimmat tasot ovat
 * käytännössä lämpiminä jo ennen ensimmäistä lähikuvaa. Kiinnitettynä
 * niistä on mitattuna 6 laattaa (z7), 9 (z6), 24 (z5) ja 16…24 (z4).
 *
 * Tasoilla z0…z3 pohjakerrosta ei ole: tarkka taso ON silloin
 * karkeimmillaan, eikä samaa kuvaa piirretä kahdesti. Silloin tarkasta
 * kerroksesta tulee alin (ks. `alin`), eikä se enää heitä pois sitä,
 * mikä on ruudulla.
 */
function pohjanTaso(tasot, taso) {
  if (taso.z <= POHJA_SYVIN) return null;
  return tasot.find((t) => t.z === POHJA_SYVIN) ?? null;
}

/**
 * Karkean pohjan reunus RUUTUINA. Tämä on se, mikä kattaa LIU'UN:
 * vauhdikas pyyhkäisy jatkuu sormen noston jälkeen inertialla, eikä
 * yhtään laattaa kiinnitetä ennen kuin liuku pysähtyy (js/kartta.js,
 * omistajan linjaus *"lataus siis aina vain juuri kun sormi irtoaa"*).
 * Kaksi ruutua joka suuntaan on 25 ruudullista alaa, mutta karkealla
 * tasolla vain noin 1,5-kertainen laattamäärä ruudun omaan nähden.
 */
const KARKEA_RUUTUJA = 2;

/**
 * Kuinka kauan edellinen zoomtaso saa jäädä uuden alle.
 *
 * Sääntö 2 poistaa vanhan tason vasta kun uusi on ruudulla, mutta
 * yksikin saapumaton laatta (404, katkennut yhteys) jättäisi vanhan
 * roikkumaan ikuisesti — kaksi tasoa päällekkäin maksaa muistia. Kaksi
 * sekuntia on selvästi yli mitatun latausajan hitaalla 3G:llä.
 */
const VANHAN_TASON_KATTO_MS = 2000;

/**
 * Minkä laudan pyramidi kattaa.
 *
 * ARKKI ON MAAILMANKARTAN ARKKI (docs/moduulit/laattapyramidi.md luku 1:
 * 84 °N…66 °S, leveys 12000 lautayksikköä), ja laatan paikka lasketaan
 * suoraan siitä. Katselutilan maanosalaudoilla (?lauta=africa) sama
 * laskenta osoittaisi laatat aivan väärään kohtaan, joten pyramidi ei
 * kuulu niille — ne piirtävät oman karttansa kuten ennenkin.
 *
 * Tämä EI ole kytkin eikä varajärjestelmä: se on arkin identiteetti.
 * Pelilaudalla kartta on aina ja vain pyramidi.
 */
const PYRAMIDIN_LAUTA = 'maailmankartta';

/**
 * Kattaako laattapyramidi tämän laudan?
 *
 * Kutsutaan laudan pystytyksestä (js/ui.js drawBoard): kun pyramidi
 * kattaa laudan, laudan omaa pohjamaalausta — pergamenttia, mantereita,
 * maastoa — EI piirretä lainkaan. Laatat ovat pohjakerros, ja vanha
 * piirros jäisi niiden alle näkymättömiin: latauksen alussa se ehti
 * välähtää ruudulla (omistajan TestFlight-havainto 30.8.2026: *"Peli
 * piirtää alle ensin sen vanhan kartan ja sitten päälle sen uuden."*).
 */
export function pyramidiKattaa(lauta) {
  return lauta === PYRAMIDIN_LAUTA;
}

/**
 * Ovatko paikannimet POLTETTUINA näissä laatoissa?
 *
 * === MIKSI TÄMÄ ON LUETTELOSSA EIKÄ KOODISSA ================ *
 * Omistajan päätös 30.8.2026: kaupunkien, vuorten ja järvien nimiöt
 * poistuvat laatoista, ja peli latoo ne ruutuavaruudessa
 * (js/karttanimet.js). Nimen pitää näkyä TÄSMÄLLEEN KERRAN: v1366:ssa
 * sama nimi oli kartalla kahdesti (poltettu + elävä), ja se korjattiin
 * vaientamalla elävä kerros. Nyt suunta kääntyy — mutta laatat
 * vaihtuvat vasta kun pyramidi ajetaan uudestaan, ja se tapahtuu tästä
 * koodista riippumatta eri aikaan.
 *
 * Jos kytkin olisi koodissa, julkaisun ja pyramidiajon väliin jäisi
 * ikkuna, jossa nimet olisivat joko kahdesti tai eivät kertaakaan.
 * Luettelo tulee laattojen mukana samasta ajosta, joten se ei voi olla
 * eri mieltä kuin laatat: `nimiot: false` = uudet laatat, joissa
 * nimiöitä ei ole, ja peli saa puhua.
 *
 * OLETUS ON VANHA MAAILMA. Kenttää ei ole vanhassa luettelossa, eikä
 * sitä ole ennen kuin luettelo on ladattu — molemmissa tapauksissa
 * vastaus on "laatoissa on nimet", jolloin peli vaikenee. Väärin päin
 * oletettuna kartalta katoaisivat kaikki nimet siihen asti kun
 * luettelo saapuu.
 */
export function laatoissaOnNimet() {
  return luettelo?.nimiot !== false;
}

/**
 * ONKO TÄMÄ KARTTANOSTO POLTETTU NÄIHIN LAATTOIHIN?
 *
 * === MIKSI TÄMÄ ON LUETTELOSSA EIKÄ KOODISSA ======================
 *
 * Sama malli ja sama syy kuin nimiöillä (`laatoissaOnNimet` yllä):
 * laatat vaihtuvat vasta kun pyramidi ajetaan uudestaan, ja se
 * tapahtuu tästä koodista riippumatta eri aikaan. Koodissa oleva
 * kytkin jättäisi julkaisun ja pyramidiajon väliin ikkunan, jossa
 * nostot olisivat joko kahdesti tai eivät kertaakaan.
 *
 * === MIKSI TOTUUSARVO EI RIITÄ (Raamattu 31.8.2026) ===============
 *
 * Nimiöillä kerrokset ovat toisensa POISSULKEVAT: joko laatat latovat
 * nimet tai peli, joten `nimiot: false` riittää. Nostoilla kerrokset
 * ovat RINNAKKAISET — omistaja 31.8.2026: *"uusia karttanostoja tulee
 * vielä kun maailmaa rakennetaan, niin ne voi väliaikaisesti tehdä
 * samalla tavalla kuin tähän asti … tehdään vain sitten uusi poltto
 * kartalle sopivassa vaiheessa."* Maailma kasvaa nopeammin kuin
 * pyramidia ajetaan, joten kartalla on aina viimeisimmässä ajossa
 * poltettuja JA sen jälkeen lisättyjä eläviä nostoja. Luettelon on
 * siksi kannettava, MITKÄ nostot poltettiin.
 *
 * === MIKSI TIIVISTE EIKÄ PELKKÄ TUNNUSLISTA =======================
 *
 * Tunnus kertoo, oliko merkki polttohetkellä olemassa; tiiviste
 * kertoo, onko se yhä SAMA merkki. Jos noston sisältö muuttuu polton
 * jälkeen — nimi, symboli, ryhmän jäsenet, paikka — laatassa on vanha
 * kuva, ja pelkkään tunnukseen luottava peli vaikenisi ja jättäisi
 * vanhentuneen näkyviin. Tiiviste lasketaan pelin puolella samasta
 * ladonnasta (js/nostoladonta.js nostoladontaTiiviste), joten ero
 * havaitaan heti ja merkki piirretään elävänä.
 *
 * === OLETUS: MITÄÄN EI OLE POLTETTU ===============================
 *
 * Kun kenttää ei ole (vanha ajo) tai luetteloa ei ole vielä ladattu,
 * vastaus on EI — peli piirtää kaiken elävänä.
 *
 * Logiikka on sama kuin nimiöillä (valitaan se väärinolo, joka ei
 * kadota sisältöä), mutta se KÄÄNTYY TOISIN PÄIN. Nimiöillä väärä
 * "laatoissa on nimet" vaientaa pelin, ja jos laatoissa ei olekaan
 * nimiä, kartalta katoavat kaikki nimet; siksi siellä oletetaan vanha
 * maailma. Tässä sisällön kadottaisi juuri "on poltettu": peli
 * vaikenisi merkistä, jota laatassa ei ole, ja omistajan ehto on
 * *"mikään karttanostoista ei kuulu kadota laudalta missään vaiheessa
 * peliä"*. Väärä oletus maksaa siis enintään kaksoispiirron samaan
 * pisteeseen — ja koska ladonta on sama molemmilla puolilla
 * (js/nostoladonta.js), kaksoispiirto on kaksinkertainen muste eikä
 * kaksi merkkiä eri kohdissa. Se korjaantuu itsestään heti kun
 * luettelo saapuu.
 *
 * === KAKSI MALLIA, YKSI VASTAUS (nostotaso 31.8.2026 ilta) ========
 *
 * VANHA MALLI (ajo 2026-08-31b): nostot poltettiin POHJALAATTOIHIN ja
 * tiivisteet ovat luettelon juuressa (`nostot`). UUSI MALLI: pohja on
 * nostoton ja nostot ovat omassa läpinäkyvässä laattakerroksessa,
 * jonka tiivisteet ovat `nostotaso.nostot`-kentässä. Avain on eri
 * TARKOITUKSELLA: vanha peli ei tunne nostotasoa, ja jos uusi
 * luettelo kirjoittaisi tiivisteet juureen, vanha peli vaikenisi
 * merkeistä joita sen laatoissa ei ole. Nyt vanha peli näkee uudessa
 * luettelossa tyhjän juuren ja piirtää kaiken elävänä — oikein,
 * koska pohja on nostoton. Uusi peli lukee kummankin: se vaientaa
 * merkin, jos JOKO pohja (vanha ajo) TAI nostokerros (uusi ajo)
 * piirtää sen.
 *
 * @param {string} tunnus    merkin tunnus (ryhmän tai kohteen)
 * @param {string} tiiviste  merkin nykyinen sisältötiiviste
 */
export function nostoOnPoltettu(tunnus, tiiviste) {
  const nostot = luettelo?.nostotaso?.nostot ?? luettelo?.nostot;
  if (!nostot || !tunnus || !tiiviste) return false;
  return nostot[tunnus] === tiiviste;
}

/** Onko luettelossa lainkaan poltettuja nostoja? */
export function laatoissaOnNostoja() {
  const nostot = luettelo?.nostotaso?.nostot ?? luettelo?.nostot;
  return Boolean(nostot && Object.keys(nostot).length);
}

/*
 * ARKIN MITAT MYÖS ILMAN LUETTELOA.
 *
 * Kamera tarvitsee arkin heti ensimmäisessä sovituksessa (js/kartta.js
 * boardBounds → ui.contentBox), mutta luettelo saapuu verkosta vasta
 * piirron jälkeen. Ilman näitä lukuja ensimmäinen näkymä sovitettaisiin
 * vanhaan lautaan ja hyppäisi luettelon saavuttua — ja offline-tilassa
 * se jäisi vanhaan pysyvästi.
 *
 * LUVUT OVAT SAMAT KUIN pyramidi.json:issa (versio 2026-08-30) ja ne
 * ovat arkin geometriaa: 12 000 yksikköä leveä miller-arkki, 84 °N…66 °S
 * kartta-alaa ja sen ympärillä paperimarginaali kehyksineen. LUETTELO
 * VOITTAA aina kun se on kädessä (pyramidinArkki lukee sen ensin), joten
 * uusi ajo eri mitoilla korjaa itsensä; nämä ovat vain se, mitä kamera
 * tietää ennen ensimmäistä vastausta.
 */
const ARKKI_VARALLA = Object.freeze({
  x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571,
});

/**
 * Laattapyramidin arkki laudan yksiköissä — tai null muille laudoille.
 *
 * TÄMÄ ON KAMERAN MAAILMA (omistajan iPad-havainto 30.8.2026:
 * *"Toiseksi laajin kartta ei näytä koko karttaa vaan leikkaa ylhäältä
 * ja alhaalta karttaa pois."*). Vanha `boardBounds` johti rajat
 * kaupunkien ja koristeiden ääripisteistä, eikä se tiennyt arkista
 * mitään: mitattu laatikko oli y 254…5345, kun arkin kartta-ala alkaa
 * y −611:stä ja päättyy 5811:een. Grönlannin pohjoiskärki, Huippuvuoret
 * ja JÄÄMERI-nimiö olivat laatoissa mutta kameran ulottumattomissa.
 */
export function pyramidinArkki(lauta) {
  if (!pyramidiKattaa(lauta)) return null;
  const arkki = luettelo?.arkki;
  return (arkki?.w > 0 && arkki?.h > 0) ? arkki : ARKKI_VARALLA;
}

/* ------------------------------------------------------------ luettelo */

/*
 * Luettelo haetaan kerran istuntoa kohti. Moduulitasolla eikä
 * UI-oliossa: tiedosto ei muutu kesken istunnon, eikä uusi peli saa
 * aloittaa hakua alusta.
 */
let luettelo = null;

/*
 * Edellinen näkymä: siitä luetaan panoroinnin suunta (ks.
 * paivitaPyramidi). Moduulitasolla samasta syystä kuin luettelo —
 * tämä on kartan tila, ei pelin.
 */
let edellinenKeskus = null;
let edellinenTaso = null;
let luetteloHaku = null;

async function haeLuettelo() {
  if (luettelo) return luettelo;
  if (!luetteloHaku) {
    luetteloHaku = fetch(pyramidiUrl('pyramidi.json'))
      .then((v) => (v.ok ? v.json() : null))
      .then((j) => {
        // Kelpaa vain, jos siinä on se, mitä piirto lukee — versio
        // mukaan lukien, koska laatan osoite rakennetaan siitä.
        if (!j?.arkki?.w || !j?.laatta || !j?.versio
          || !Array.isArray(j.tasot) || !j.tasot.length) return null;
        luettelo = j;
        return j;
      })
      .catch(() => null);
  }
  return luetteloHaku;
}

/* ------------------------------------------------------------ tason valinta */

/**
 * Mikä taso ladataan tälle mittakaavalle?
 *
 * LÄHIN TASO, EI LÄHIN ALASPÄIN (omistajan lukitus 30.8.2026:
 * *"asiakas valitsee lähimmän laattatason ja skaalaa korkeintaan
 * 1,41×"*). Tasojen suhde on 2, joten lähin taso on aina korkeintaan
 * kertoimen √2 päässä kumpaankin suuntaan — puolet siitä virheestä,
 * jonka "hienoin joka on vielä karkeampi" antaisi, ja puolet myös sen
 * turhasta latauksesta.
 *
 * LÄHIN MITATAAN LOGARITMISESTI, samasta syystä kuin kameran
 * portaikossa (js/kartta.js zoomiTasot): tasot ovat kertoimia, ja
 * aritmeettinen "lähin" vetäisi aina isompaan päin.
 *
 * KAMERAN ZOOMIPORTAIKKO PYSYY TÄSTÄ ERILLÄÄN. Se on 1,5 × 6 porrasta
 * (js/kartta.js zoomiTasot) eikä sitä sovitella laattatasoihin —
 * portaikko kertoo mihin nipistys napsahtaa, tämä kertoo mikä tarkkuus
 * levyltä ladataan.
 *
 * @param {number} tarve laitepikseliä yhtä lautayksikköä kohti
 */
function valitseTaso(tasot, tarve) {
  let paras = tasot[0];
  let ero = Infinity;
  for (const t of tasot) {
    const d = Math.abs(Math.log(t.pikseliaPerYksikko / Math.max(1e-6, tarve)));
    if (d < ero) { ero = d; paras = t; }
  }
  return paras;
}

/* ------------------------------------------------------------ mittarit */

/*
 * PILOTIN MITTARIT. Nämä ovat se syy, jonka takia pilotti ylipäätään
 * ajetaan: latausaika, laattojen määrä näkymässä ja muistin arvio
 * mitataan pelistä eikä arvata. Luetaan konsolista
 * `window.__pyramidinMittarit()`.
 */
const mittarit = {
  taso: null,
  // Kiinnitettyjä laattoja (DOM) ja niistä ruudulla NÄKYVIÄ. Ero on
  // koko esilatauksen idea, joten se on myös mittarissa näkyvissä.
  nakymassa: 0,
  ruudulla: 0,
  karkeita: 0,
  nostoja: 0,
  ladattu: 0,
  epaonnistui: 0,
  esiladattu: 0,
  esijonossa: 0,
  esikaynnissa: 0,
  esiEpaonnistui: 0,
  tavuja: 0,
  hitainMs: 0,
  yhteensaMs: 0,
  paivityksia: 0,
  viimeisinPaivitysMs: 0,
};

export function pyramidinMittarit() {
  const laatta = luettelo?.laatta ?? 0;
  return {
    ...mittarit,
    keskiMs: mittarit.ladattu ? Math.round(mittarit.yhteensaMs / mittarit.ladattu) : 0,
    /*
     * MUISTIARVIO KAHTENA LUKUNA, KOSKA NE OVAT ERI SUURUUSLUOKKAA.
     *
     * Purettu bittikartta on 4 tavua pikseliä kohti — mutta vain silloin
     * kun selain oikeasti PURKAA kuvan, ja se tapahtuu vasta maalatessa.
     * Ruudun ulkopuolelle kiinnitetty laatta jää pakattuna (mitattu
     * 30.8.2026: 54 → 238 kiinnitettyä laattaa nosti renderöijän RSS:ää
     * ~80 Mt eli ~0,4 Mt/laatta, ei 1 Mt/laatta).
     *
     *   muistiMt      ruudulla näkyvät laatat purettuna — se, mitä
     *                 puhelimen muistista oikeasti menee koko ajan.
     *   muistiKattoMt sama kaava kaikille kiinnitetyille — vanha luku,
     *                 joka on nyt YLÄRAJA eikä arvio.
     */
    muistiMt: Math.round((mittarit.ruudulla * laatta ** 2 * 4) / 1e6 * 10) / 10,
    muistiKattoMt: Math.round((mittarit.nakymassa * laatta ** 2 * 4) / 1e6 * 10) / 10,
  };
}

/* ------------------------------------------------------------ piirto */

/**
 * Laatan avain kerroksessa.
 *
 * KIERROSTA EI OLE (sääntö 3): laatta on arkilla täsmälleen yhdessä
 * paikassa, ja sauman takaisen kopion piirtää lauta itse. Kun avain
 * kantoi kierroksen, sauman yli panoroitaessa samasta tiedostosta
 * syntyi toinen elementti — ja se elementti oli juuri se, jonka laudan
 * kopio peitti.
 */
const avain = (z, sarake, rivi) => `${z}:${sarake}:${rivi}`;

/**
 * Onko laatta olemassa levyllä?
 *
 * Harvassa pyramidissa umpimeren laattoja ei generoida lainkaan
 * (tools/generoi-laattapyramidi.mjs `umpimeriSavy`), ja peli maalaa
 * niiden tilalle merisävyn. Ilman tätä tarkistusta peli pyytäisi
 * jokaisen puuttuvan laatan ja saisi 404:n — tuhansia turhia pyyntöjä.
 *
 * Luettelo kantaa jokaiselta tasolta bittikartan (`laatasto`, base64).
 * Jos sitä ei ole, oletetaan että kaikki laatat ovat olemassa.
 */
function laattaOlemassa(taso, sarake, rivi) {
  const bitit = taso.__bitit;
  if (bitit === null) return true;
  if (bitit === undefined) {
    if (!taso.laatasto) { taso.__bitit = null; return true; }
    try {
      const raaka = atob(taso.laatasto);
      const puskuri = new Uint8Array(raaka.length);
      for (let i = 0; i < raaka.length; i += 1) puskuri[i] = raaka.charCodeAt(i);
      taso.__bitit = puskuri;
    } catch {
      taso.__bitit = null;
      return true;
    }
  }
  const i = rivi * taso.sarakkeita + sarake;
  const t = taso.__bitit[i >> 3];
  return t === undefined ? false : ((t >> (i & 7)) & 1) === 1;
}

/** Laatan osoite ämpärissä. Sama merkkijono sekä kuvalle että noudolle. */
function laattaUrl(taso, sarake, rivi) {
  // Nostotason laatta asuu oman versionsa alla pohjan rinnalla:
  // <nostoversio>/nostot/z…. Oma versio on koko mallin päähyöty —
  // nostojen uusintapoltto ei koske pohjan ikuista välimuistia.
  if (taso.nosto) {
    return pyramidiUrl(`${luettelo.nostotaso.versio}/nostot/z${taso.z}/${sarake}/${rivi}`
      + `.${luettelo.muoto ?? 'webp'}`);
  }
  return pyramidiUrl(`${luettelo.versio}/z${taso.z}/${sarake}/${rivi}`
    + `.${luettelo.muoto ?? 'webp'}`);
}

/**
 * Noutokirjanpidon avain. Nostotason laatta on ERI TIEDOSTO kuin
 * saman ruudun pohjalaatta, joten sen avain saa n-etuliitteen — muuten
 * kerroksen kiinnitys merkitsisi pohjalaatan noudetuksi ja esilataus
 * ohittaisi sen.
 */
const noutoAvain = (taso, sarake, rivi) => `${taso.nosto ? 'n' : ''}${taso.z}:${sarake}:${rivi}`;

/**
 * Käy läpi laatat, jotka osuvat annettuun laudan suorakaiteeseen.
 *
 * KIERTO ON TÄSSÄ YHDESSÄ PAIKASSA (ks. sääntö 3). Sekä kiinnitys että
 * esilataus lukevat laattaruudukkoa samalla kaavalla — kaksi kopiota
 * ehtisi eriytyä juuri päivämääränrajan takana, jossa virhe on
 * vaikeimmin huomattava.
 *
 * SAMA LAATTA VOI OSUA ALUEESEEN KAHDESTI. Kun näkymä on sauman
 * päällä, arkin molemmat laidat ovat ruudulla, ja silloin kierrokset
 * k ja k+1 osoittavat osin samoihin sarakkeisiin. Käsittelijä saa
 * sarakkeen sellaisenaan ja vastaa itse siitä, ettei samaa laattaa
 * käsitellä kahdesti (kiinnityksessä `uudet`, noudossa `nahty`).
 *
 * @param {object} alue laudan yksiköissä: { x, y, w, h }
 * @param {(sarake:number, rivi:number)=>void} kasittele
 */
function jokaLaatta(taso, laatta, arkki, alue, kasittele) {
  const px0 = (alue.x - arkki.x) * taso.pikseliaPerYksikko;
  const px1 = (alue.x + alue.w - arkki.x) * taso.pikseliaPerYksikko;
  const yksikkoaPerLaatta = laatta / taso.pikseliaPerYksikko;
  const k0 = Math.floor(px0 / taso.leveys);
  const k1 = Math.floor(px1 / taso.leveys);
  const r0 = Math.max(0, Math.floor((alue.y - arkki.y) / yksikkoaPerLaatta));
  const r1 = Math.min(taso.riveja - 1,
    Math.floor((alue.y + alue.h - arkki.y) / yksikkoaPerLaatta));
  for (let kierros = k0; kierros <= k1; kierros += 1) {
    const alku = kierros * taso.leveys;
    const s0 = Math.max(0, Math.floor((px0 - alku) / laatta));
    const s1 = Math.min(taso.sarakkeita - 1, Math.floor((px1 - alku) / laatta));
    for (let rivi = r0; rivi <= r1; rivi += 1) {
      for (let sarake = s0; sarake <= s1; sarake += 1) {
        if (!laattaOlemassa(taso, sarake, rivi)) continue;
        kasittele(sarake, rivi);
      }
    }
  }
}

/**
 * Näkyvä alue laajennettuna ruudullisina joka suuntaan.
 *
 * Lisät ovat sivukohtaisia, jotta panoroinnin suuntaan voi antaa
 * enemmän kuin taaksepäin (SUUNTALISA_RUUTUJA).
 */
function laajenna(nakyva, ruutuja, lisa = null) {
  const vas = (ruutuja + (lisa?.vasen ?? 0)) * nakyva.w;
  const oik = (ruutuja + (lisa?.oikea ?? 0)) * nakyva.w;
  const yla = (ruutuja + (lisa?.yla ?? 0)) * nakyva.h;
  const ala = (ruutuja + (lisa?.ala ?? 0)) * nakyva.h;
  return {
    x: nakyva.x - vas,
    y: nakyva.y - yla,
    w: nakyva.w + vas + oik,
    h: nakyva.h + yla + ala,
  };
}

/* ------------------------------------------------------------ esilataus */

/*
 * ESILATAUS: NOUTO ILMAN KIINNITYSTÄ.
 *
 * Laatta haetaan tavallisella kuvapyynnöllä (`new Image()`), täsmälleen
 * samalla osoitteella ja samalla pyyntötavalla kuin SVG:n <image> sen
 * hakisi — silloin ne osuvat samaan välimuistiriviin. Kuvaa EI panna
 * puuhun eikä siihen jätetä viittausta: kun lataus on ohi, olio jää
 * roskiksi ja jäljelle jää se, mitä haluttiin, eli PAKATTU vastaus
 * selaimen HTTP-välimuistissa (laatoilla on ämpärissä `immutable`,
 * 1 vuosi — ks. docs/moduulit/laattapyramidi.md "Osoitteet ja
 * välimuisti").
 *
 * PALVELUTYÖNTEKIJÄ EI OLE TIELLÄ: sw.js päästää `julisteet/`-polun
 * ämpäriin sellaisenaan (vain `kuvat/`, `liput/`, `audio/` ja `aanet/`
 * ovat sen omassa korissa), joten esilataus menee suoraan selaimen
 * välimuistiin.
 */

/** Kertaalleen pyydetyt laatat: `z:sarake:rivi` (kierros ei kuulu urliin). */
const noudetut = new Set();
/** Odottavat noudot tärkeysjärjestyksessä. */
let noutojono = [];
let noutoKaynnissa = 0;
let noutoAjastin = 0;

/** Yksi nouto. Viittaus kuvaan katoaa heti, kun lataus on ohi. */
function noudaYksi(url, k) {
  /*
   * MERKINTÄ TEHDÄÄN VASTA TÄSSÄ, EI JONOON PANTAESSA. Jono
   * rakennetaan joka näkymästä uudelleen, ja jos jonottaminen
   * merkitsisi laatan noudetuksi, pudonnutta jonoa ei haettaisi
   * koskaan — kartalle jäisi pysyviä kylmiä kohtia.
   */
  noudetut.add(k);
  noutoKaynnissa += 1;
  let kuva = new Image();
  const valmis = (onnistui) => {
    if (onnistui) mittarit.esiladattu += 1; else mittarit.esiEpaonnistui += 1;
    // Viittaus pois: purettu kuva ei saa jäädä muistiin roikkumaan.
    kuva = null;
    noutoKaynnissa -= 1;
    pumppaaNoutoa();
  };
  kuva.decoding = 'async';
  // Vihje selaimelle: näkyvät laatat menevät jonossa ohi.
  kuva.fetchPriority = 'low';
  kuva.addEventListener('load', () => valmis(true), { once: true });
  kuva.addEventListener('error', () => valmis(false), { once: true });
  kuva.src = url;
}

function pumppaaNoutoa() {
  while (noutoKaynnissa < NOUTO_RINNAKKAIN && noutojono.length) {
    const seuraava = noutojono.shift();
    if (noudetut.has(seuraava.k)) continue;
    noudaYksi(seuraava.url, seuraava.k);
  }
  mittarit.esijonossa = noutojono.length;
  mittarit.esikaynnissa = noutoKaynnissa;
}

/**
 * Panee näkymän ympäristön noutojonoon.
 *
 * JONO RAKENNETAAN JOKA PÄIVITYKSESSÄ UUDESTAAN. Vanha jono kuvaa
 * paikkaa, josta pelaaja on jo lähtenyt; jos se saisi jäädä, hitaalla
 * yhteydellä noudettaisiin edellistä näkymää samalla kun nykyinen
 * odottaa. Kesken olevia noutoja ei katkaista — niitä on enintään
 * NOUTO_RINNAKKAIN, ja katkaisu heittäisi pois jo saapuneet tavut.
 *
 * JÄRJESTYS: lähin ensin, ja panoroinnin suunta painaa vaakaa. Sama
 * ruudullinen noudetaan joka tapauksessa, mutta hitaalla yhteydellä
 * järjestys ratkaisee, mikä ehtii perille ennen seuraavaa vetoa.
 */
function jonotaEsilataus(taso, laatta, arkki, nakyva, suunta) {
  const alue = laajenna(nakyva, NOUTO_RUUTUJA);
  const kx = nakyva.x + nakyva.w / 2;
  const ky = nakyva.y + nakyva.h / 2;
  const jono = [];
  /*
   * SAMA TIEDOSTO VAIN KERRAN JONOSSA. Kun näkymä on laudan sauman
   * päällä, arkin molemmat laidat ovat ruudulla, ja sama sarake osuu
   * alueeseen KAHDESTI (sääntö 3) — yhdestä laatasta ei silloin saa
   * tulla kahta noutoa.
   */
  const nahty = new Set();
  const jakso = arkki.w;
  jokaLaatta(taso, laatta, arkki, alue, (sarake, rivi) => {
    const k = noutoAvain(taso, sarake, rivi);
    if (noudetut.has(k) || nahty.has(k)) return;
    nahty.add(k);
    const x = arkki.x + ((sarake + 0.5) * laatta) / taso.pikseliaPerYksikko;
    const y = arkki.y + (rivi + 0.5) * laatta / taso.pikseliaPerYksikko;
    /*
     * Etäisyys ruudullisina, jotta pysty ja vaaka ovat
     * vertailukelpoisia — ja vaaka LYHINTÄ TIETÄ ARKIN YMPÄRI. Laatan
     * paikka on sen oma paikka arkilla (sääntö 3), joten sauman
     * takainen naapuri on numeroina koko arkin päässä; ilman
     * kierrätystä se putoaisi jonon hännille juuri silloin, kun se on
     * pelaajan seuraava ruutu.
     */
    const ero = x - kx;
    const dx = (ero - jakso * Math.round(ero / jakso)) / nakyva.w;
    const dy = (y - ky) / nakyva.h;
    // Suuntapainotus: liikkeen suunnassa oleva laatta on "lähempänä".
    const paino = suunta ? Math.max(0, dx * suunta.x + dy * suunta.y) : 0;
    jono.push({ url: laattaUrl(taso, sarake, rivi), etaisyys: Math.hypot(dx, dy) - paino, k });
  });
  jono.sort((a, b) => a.etaisyys - b.etaisyys);
  noutojono = jono.slice(0, NOUTO_KATTO);
  mittarit.esijonossa = noutojono.length;
  /*
   * Muistilista ei saa kasvaa rajatta: koko maailma z7:llä on 17 407
   * laattaa, ja pitkä istunto voi käydä niistä läpi ison osan.
   * Nollaus maksaa enintään sen, että osa noudetaan toistamiseen —
   * ja se on selaimen välimuistista ilmainen.
   */
  if (noudetut.size > 20000) noudetut.clear();
  /*
   * VIIVE ON OSA SUUNNITELMAA (NOUTO_VIIVE_MS): näkyvät laatat ovat
   * juuri lähteneet hakuun samasta jonosta, eikä esilataus saa mennä
   * niiden edelle hitaalla yhteydellä.
   */
  clearTimeout(noutoAjastin);
  noutoAjastin = setTimeout(pumppaaNoutoa, NOUTO_VIIVE_MS);
}

/**
 * Panee VIEREISTEN ZOOMTASOJEN laatat jonon perälle.
 *
 * Omistajan TestFlight-havainto 30.8.2026: *"Miksi zoomatessa uusi
 * kartta latautuu hitaasti?"* Syy on rakenteellinen: kameran
 * zoomiporras on 1,5 ja tasojen suhde 2, joten käytännössä joka toinen
 * porras vaihtaa tason kokonaan TIEDOSTOIHIN, JOITA EI OLE KOSKAAN
 * HAETTU. Panoroinnin esilataus ei auta siihen lainkaan — se lämmittää
 * saman tason naapureita.
 *
 * ALUE ON SE, MIKÄ ZOOMIN JÄLKEEN NÄKYY, ei nykyinen näkymä toisella
 * tarkkuudella. Porras on 1,5×, joten sisäänpäin näkyvä ala kutistuu
 * ja ulospäin kasvaa samassa suhteessa — molemmissa päissä laattoja on
 * suunnilleen saman verran kuin nyt (~25), eli kaksi tasoa on noin
 * megatavu. Ilman tätä rajausta z+1 olisi nelinkertainen määrä.
 */
function jonotaTasovaihto(tasot, taso, laatta, arkki, nakyva) {
  const kx = nakyva.x + nakyva.w / 2;
  const ky = nakyva.y + nakyva.h / 2;
  const jono = [];
  for (const naapuri of tasot) {
    if (naapuri.z !== taso.z + 1 && naapuri.z !== taso.z - 1) continue;
    // Zoomiporras 1,5: sisään mentäessä ala kutistuu, ulos kasvaa.
    const kerroin = naapuri.z > taso.z ? 1 / 1.5 : 1.5;
    const alue = {
      x: kx - (nakyva.w * kerroin) / 2,
      y: ky - (nakyva.h * kerroin) / 2,
      w: nakyva.w * kerroin,
      h: nakyva.h * kerroin,
    };
    const nahty = new Set();
    jokaLaatta(naapuri, laatta, arkki, alue, (sarake, rivi) => {
      const k = noutoAvain(naapuri, sarake, rivi);
      if (noudetut.has(k) || nahty.has(k)) return;
      nahty.add(k);
      jono.push({ url: laattaUrl(naapuri, sarake, rivi), k });
    });
  }
  /*
   * PERÄLLE, EI SEKAAN. Nykyisen tason ympäristö on se, jonka pelaaja
   * näkee seuraavaksi todennäköisimmin (sormi liikkuu useammin kuin
   * nipistää), ja hitaalla yhteydellä jonon järjestys on koko
   * priorisointi.
   */
  noutojono = noutojono.concat(jono).slice(0, NOUTO_KATTO);
  mittarit.esijonossa = noutojono.length;
}

/* ------------------------------------------------------------ kerrokset */

/**
 * Kaksi kerrosta: KARKEA POHJA alle ja tarkka taso päälle.
 *
 * Karkea pohja on se, mikä estää tyhjän karttapohjan kaikissa niissä
 * tapauksissa, joita reunus ei kata: nopea pyyhkäisy, zoomin vaihto,
 * hidas verkko. Sama ala on karkealta tasolta 1/16 laattoja
 * (pohja on z3, tarkka taso z5…z7), joten se on käytännössä ilmainen — ja
 * juuri näin jokainen karttakirjasto tekee: alla on aina jotain, ja se
 * terävöityy kun tarkka taso saapuu.
 */
function varmistaKerrokset(ui) {
  if (ui.pyramidiPohjaKerros?.parentNode === ui.pyramidiKerros
    && ui.pyramidiTarkkaKerros?.parentNode === ui.pyramidiKerros) return;
  ui.pyramidiPohjaKerros = el('g', { class: 'pyramidi-pohjataso' }, ui.pyramidiKerros);
  ui.pyramidiTarkkaKerros = el('g', { class: 'pyramidi-tarkkataso' }, ui.pyramidiKerros);
  /*
   * NOSTOTASO — kolmas kerros samaan siirtoryhmään (omistaja 31.8.2026
   * ilta): nostolaatat liikkuvat kompositorilla yhtenä pohjan kanssa,
   * eikä yksikään kehys maalaa niitä uudelleen. Kerros on olemassa
   * aina, mutta laattoja siihen tulee vain kun luettelossa on
   * nostotaso ja kamera on sen tasoilla (z5–z7).
   *
   * HÄIVYTYS ON TYYLISIIRTYMÄ, EI PIIRTOA: kun kamera ylittää
   * nostotason alarajan, kerroksen opacity liukuu 0 ↔ 1 (omistajan
   * valinta "pehmeä häivytys, ei pomppua"). Siirtymä on elementissä
   * eikä tyylitiedostossa, koska koko kerros on tämän moduulin oma
   * eikä sillä ole muuta tyyliä.
   */
  ui.pyramidiNostoKerros = el('g', { class: 'pyramidi-nostotaso' }, ui.pyramidiKerros);
  ui.pyramidiNostoKerros.style.transition = 'opacity 0.35s ease';
}

/**
 * Poistaa laatan JA KATKAISEE SEN KESKEN OLEVAN HAUN.
 *
 * === TÄMÄ ON SE, MIKSI ZOOMAUS TUNTUI HITAALTA =====================
 *
 * Mitattu 30.8.2026 (Chromium, 1,5 Mbit/s, 200 ms viive): puusta
 * irrotettu <image> EI lopeta lataamista. Kolmen zoomiportaan sarjassa
 * peli oli ehtinyt pyytää yli 700 laattaa, ja niistä satoja oli
 * ohitettujen tasojen laattoja, jotka valuivat verkosta sisään vielä
 * kymmeniä sekunteja sen jälkeen kun ne oli poistettu — sen tason
 * EDELLÄ, jota pelaaja oikeasti katsoi. Ruudulla se näkyy täsmälleen
 * niin kuin omistaja sen kuvasi: *"uusi kartta latautuu hitaasti"*.
 *
 * Osoitteen poisto katkaisee haun. Elementti merkitään perutuksi, ettei
 * katkaisun synnyttämä error-tapahtuma kirjaudu epäonnistumiseksi eikä
 * sotke odotuslaskuria.
 */
function peruLaatta(kuva) {
  if (!kuva.dataset.ladattu) {
    kuva.dataset.peruttu = '1';
    kuva.removeAttribute('href');
  }
  kuva.remove();
}

/** Yhden kerroksen tila: mikä taso siinä on ja mitkä laatat. */
const tyhjaTila = (kerros, alin = false) => ({
  kerros, alin, z: null, laatat: new Map(), vanhat: null, ajastin: 0,
  nakyva: null, jakso: 0,
});

/**
 * Ovatko kerroksen RUUDULLA olevat laatat kaikki perillä?
 *
 * Laskurin sijasta kysely: laskuri menisi solmuun aina kun laatta
 * peruuntuu tai taso vaihtuu kesken latauksen, ja väärä laskuri
 * jättäisi vanhan tason roikkumaan tai poistaisi sen liian aikaisin.
 * Laattoja on satakunta, joten läpikäynti on olematon työ.
 */
function kaikkiRuudullaLadattu(tila) {
  for (const kuva of tila.laatat.values()) {
    if (kuva.dataset.odottaa === '1' && kuva.dataset.ladattu !== '1') return false;
  }
  return true;
}

/**
 * Osuuko arkin suorakaide näkymään, kun LAUTA KIERTÄÄ?
 *
 * Laatta piirretään arkille vain kerran (sääntö 3), ja sauman takana
 * sen näyttää laudan <use>-kopio. Näkymä voi siis olla kopion päällä —
 * ruudun täyttävän laatan oma x on silloin kokonaisen arkinleveyden
 * päässä näkymästä. Suoraviivainen leikkaustesti sanoisi sellaisesta
 * laatasta "ei ruudulla", ja juuri sitä vastausta pitkin menevät kaikki
 * ne säännöt, jotka suojaavat ruudulla olevaa kuvaa: mitä ei saa
 * heittää pois (sääntö 2), mitä vanhan tason laattaa aikakatto ei
 * karsi, ja mikä laatta noudetaan kiireellisenä.
 *
 * Kolme kierrosta riittää: lava on enintään laudan levyinen plus yksi
 * ruudullinen (js/kartta.js fitViewBox), joten sama paikka ei voi olla
 * ruudulla kahta arkinleveyttä kauempana.
 */
function osuuKiertaen(x, w, y, h, nakyva, jakso) {
  if (!(y < nakyva.y + nakyva.h && y + h > nakyva.y)) return false;
  for (let i = -1; i <= 1; i += 1) {
    const kx = x + i * jakso;
    if (kx < nakyva.x + nakyva.w && kx + w > nakyva.x) return true;
  }
  return false;
}

/**
 * Osuuko laatta näkyvään alueeseen?
 *
 * Luetaan MÄÄREISTÄ eikä getBoundingClientRectilla: laatan paikka on
 * laudan koordinaateissa, ja määreen lukeminen ei pakota asettelun
 * laskentaa (sama sääntö kuin js/ui.js nakyvaAlue -kommentissa).
 */
function osuuNakymaan(kuva, nakyva, jakso) {
  const x = parseFloat(kuva.getAttribute('x'));
  const y = parseFloat(kuva.getAttribute('y'));
  const w = parseFloat(kuva.getAttribute('width'));
  const h = parseFloat(kuva.getAttribute('height'));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  return osuuKiertaen(x, w, y, h, nakyva, jakso);
}

/**
 * Edellinen taso pois — se on korvattu, joten se saa mennä kokonaan.
 *
 * Tätä kutsutaan VAIN kun uuden tason näkyvät laatat ovat oikeasti
 * ruudulla (kaikkiRuudullaLadattu) tai kun kerros tyhjennetään.
 */
function poistaVanhaTaso(tila) {
  clearTimeout(tila.ajastin);
  tila.ajastin = 0;
  if (!tila.vanhat) return;
  for (const kuva of tila.vanhat.values()) peruLaatta(kuva);
  tila.vanhat = null;
}

/**
 * Karsii vanhasta tasosta sen, mitä ruudulla ei tarvita.
 *
 * === MIKSI AIKAKATTO EI SAA POISTAA KAIKKEA ========================
 *
 * Omistajan iPhone-havainto 31.8.2026 (*"välillä kartta ei piirry
 * ollenkaan"*) toistui mitattuna myös silloin, kun pohjakerros oli
 * naulattu: VANHAN_TASON_KATTO_MS poisti vanhan tason kahdessa
 * sekunnissa riippumatta siitä, oliko tilalle tullut mitään. Hitaalla
 * yhteydellä uusi taso ei ollut vielä perillä, joten ruutu tyhjeni
 * kahden sekunnin kuluttua zoomista — mitattuna 120 näytettä 204:stä
 * täysin tyhjänä.
 *
 * Katto on silti tarpeen, ettei kahta tasoa jää päällekkäin ikuisesti.
 * Ratkaisu: katto poistaa vain sen, mikä EI OLE RUUDULLA. Ruudulla
 * oleva vanha laatta on kirjaimellisesti ne pikselit, jotka pelaaja
 * juuri nyt näkee; se poistuu vasta kun tilalle on tullut jotain.
 */
function karsiVanhat(tila) {
  tila.ajastin = 0;
  if (!tila.vanhat || !tila.nakyva) return;
  for (const [k, kuva] of tila.vanhat) {
    if (osuuNakymaan(kuva, tila.nakyva, tila.jakso)) continue;
    peruLaatta(kuva);
    tila.vanhat.delete(k);
  }
  if (!tila.vanhat.size) tila.vanhat = null;
}

/**
 * Päivittää yhden kerroksen laatat annetulle tasolle ja alueelle.
 *
 * SÄÄNTÖ 2 ON TÄSSÄ. Kun taso vaihtuu, edellisen tason laatat jäävät
 * puuhun UUSIEN ALLE, ja ne poistetaan vasta kun uuden tason näkyvät
 * laatat ovat oikeasti latautuneet (tai kun VANHAN_TASON_KATTO_MS
 * täyttyy, ettei yksi saapumaton laatta jätä vanhaa roikkumaan
 * ikuisesti). Ennen tätä korjausta koodi poisti vanhan SAMASSA
 * synkronisessa päivityksessä, eli ennen kuin yksikään uusi laatta oli
 * perillä — ja juuri se näytti omistajalle "hitaalta latautumiselta"
 * zoomatessa.
 *
 * SAMAN TASON sisällä poisto on entisellään: näkymästä pudonnut laatta
 * lähtee heti, koska muuten muisti kasvaisi rajatta.
 */
function paivitaKerros(tila, taso, laatta, arkki, alue, nakyva, kiire) {
  if (tila.z !== taso.z) {
    // Vain YKSI vanha taso kerrallaan: sitä edellinen on jo tarpeeton.
    poistaVanhaTaso(tila);
    /*
     * ALIN KERROS EI HEITÄ POIS SITÄ, MIKÄ ON RUUDULLA. YLEMPI SAA.
     *
     * Katkaisu on oikea keksintö — se teki zoomauksesta nopean, koska
     * ohitettujen tasojen laatat eivät enää tuki yhteyttä sen tason
     * edellä, jota pelaaja katsoo (ks. peruLaatta). Mutta laatan saa
     * heittää pois vain, jos sen tilalla on jotain, ja se riippuu
     * kerroksesta:
     *
     *   TARKKA KERROS: alla on naulattu pohja (pohjanTaso), joka ei
     *     vaihdu tasoilla z5…z7 lainkaan. Ruutu ei siis voi jäädä
     *     tyhjäksi, vaikka kesken oleva haku katkaistaisiin — kartta
     *     on hetken sumea. Katkaisu kannattaa: mitattuna se pitää
     *     puussa 47…62 kuvaa 82…114:n sijaan ja nipistyksen
     *     longtask-summan mainin tasolla (710 ms) sen sijaan että se
     *     nousisi 899 ms:iin.
     *   POHJAKERROS: sen alla EI OLE MITÄÄN (harva pyramidi on pois,
     *     joten `meriSavy`-suorakaidettakaan ei ole). Ruudulla oleva
     *     pohjalaatta on kirjaimellisesti ne pikselit, jotka pelaaja
     *     näkee, joten se jää — myös latautumattomana, koska sen haku
     *     on ainoa tie takaisin karttaan.
     *
     * Ilman tätä eroa kumpikin kerros saattoi tyhjentyä samalla
     * hetkellä, ja juuri se oli omistajan havainto 31.8.2026 (*"välillä
     * kartta ei piirry ollenkaan"*): toistettuna peitto oli 0 %
     * 202 näytteessä 208:sta.
     */
    for (const [k, kuva] of tila.laatat) {
      if (tila.alin ? osuuNakymaan(kuva, nakyva, arkki.w) : kuva.dataset.ladattu) continue;
      peruLaatta(kuva);
      tila.laatat.delete(k);
    }
    tila.vanhat = tila.laatat.size ? tila.laatat : null;
    tila.laatat = new Map();
    tila.z = taso.z;
    if (tila.vanhat) {
      tila.ajastin = setTimeout(() => karsiVanhat(tila), VANHAN_TASON_KATTO_MS);
    }
  }
  // Viimeisin näkymä talteen: aikakatto tarvitsee sen tietääkseen,
  // mikä vanhan tason laatta on ruudulla (karsiVanhat). Kierron jakso
  // sen mukana — sauman päällä ruutu on laudan kopion päällä, eikä
  // ruudulla olevan laatan tunnista ilman sitä (osuuKiertaen).
  tila.nakyva = nakyva;
  tila.jakso = arkki.w;
  const yksikkoaPerLaatta = laatta / taso.pikseliaPerYksikko;
  const vanhatSamalta = tila.laatat;
  const uudet = new Map();
  let ruudulla = 0;
  const kasittele = (sarake, rivi) => {
    const k = avain(taso.z, sarake, rivi);
    if (uudet.has(k)) return;
    // Paikka on laatan OMA paikka arkilla, ei näkymän kierros (sääntö 3).
    const lx = arkki.x + (sarake * laatta) / taso.pikseliaPerYksikko;
    const ly = arkki.y + rivi * yksikkoaPerLaatta;
    const nakyy = osuuKiertaen(lx, yksikkoaPerLaatta, ly, yksikkoaPerLaatta,
      nakyva, arkki.w);
    if (nakyy) ruudulla += 1;
    // Kiinnitetty laatta on jo haussa: esilataus ei pyydä sitä uudestaan.
    noudetut.add(noutoAvain(taso, sarake, rivi));

    const oli = vanhatSamalta.get(k);
    if (oli) {
      // Reunukselta ruudulle siirtynyt laatta on nyt odottaja.
      if (nakyy && oli.dataset.ladattu !== '1') oli.dataset.odottaa = '1';
      uudet.set(k, oli);
      vanhatSamalta.delete(k);
      return;
    }

    /*
     * VIIMEISEN RIVIN JA SARAKKEEN LAATTA ON VAJAA. Tason leveys ei
     * ole laattakoon monikerta, ja venytetty vajaa laatta osuisi
     * väärään kohtaan lautaa — leveys ja korkeus lasketaan siis
     * laatan omista pikseleistä.
     */
    const pw = Math.min(laatta, taso.leveys - sarake * laatta);
    const ph = Math.min(laatta, taso.korkeus - rivi * laatta);
    const kuva = el('image', {
      x: lx,
      y: ly,
      width: pw / taso.pikseliaPerYksikko,
      height: ph / taso.pikseliaPerYksikko,
      href: laattaUrl(taso, sarake, rivi),
      preserveAspectRatio: 'none',
      class: 'pyramidi-laatta',
      'data-taso': String(taso.z),
      /*
       * VIHJEET SELAIMELLE. `decoding=async` pitää purun pois
       * pääsäikeeltä, `fetchpriority=high` nostaa kiinnitetyn laatan
       * esilatausten ohi. Kumpaakaan ei ole määritelty SVG:n
       * <image>-elementille kaikissa selaimissa, joten ne ovat
       * vihjeitä eivätkä lupauksia — väärin ymmärrettynä attribuutti
       * jää huomiotta eikä riko mitään.
       */
      decoding: 'async',
      fetchpriority: nakyy ? kiire : 'low',
    }, tila.kerros);
    // Ruudulla oleva laatta on se, jota vanha taso alla odottaa.
    if (nakyy) kuva.dataset.odottaa = '1';
    const t0 = performance.now();
    const valmis = (onnistui) => {
      // Peruttu haku ei ole epäonnistuminen eikä odottaja (ks. peruLaatta).
      if (kuva.dataset.peruttu === '1') return;
      if (onnistui) {
        const kesto = performance.now() - t0;
        mittarit.ladattu += 1;
        mittarit.yhteensaMs += kesto;
        mittarit.hitainMs = Math.max(mittarit.hitainMs, Math.round(kesto));
        /*
         * LADATTU-MERKINTÄ ON MITTAUSVÄLINE. Kiinnitetty laatta on
         * ruudulla tyhjä siihen asti kun kuva on perillä, ja juuri
         * sitä aikaa omistaja katsoi ("tyhjä karttapohja"). Ilman
         * tätä merkkiä sitä ei voi mitata pelin ulkopuolelta:
         * SVG:n <image> ei kanna `complete`-lippua kuten <img>.
         */
        kuva.dataset.ladattu = '1';
      } else {
        mittarit.epaonnistui += 1;
        // Saapumaton laatta ei saa jäädä odottajaksi ikuisesti.
        delete kuva.dataset.odottaa;
      }
      if (!nakyy || !tila.vanhat) return;
      // Uusi taso on ruudulla kokonaan: vanha saa mennä (sääntö 2).
      if (kaikkiRuudullaLadattu(tila)) poistaVanhaTaso(tila);
    };
    kuva.addEventListener('load', () => valmis(true), { once: true });
    kuva.addEventListener('error', () => valmis(false), { once: true });
    uudet.set(k, kuva);
  };
  /*
   * RUUTU ENSIN, REUNUS VASTA SITTEN — KAKSI KIERROSTA SAMALLA
   * KÄSITTELIJÄLLÄ.
   *
   * Yhdellä kierroksella laatat syntyisivät riveittäin koko
   * reunusalueen yli, jolloin ruudun yläpuolinen puskuri lähtisi hakuun
   * ENNEN sitä, mitä pelaaja katsoo. Hitaalla yhteydellä se on suoraan
   * odotusaikaa ruudulla: mitattuna 1,5 Mbit/s:llä koko kiinnitysala on
   * kolme megatavua, josta ruudun osuus on vajaa kolmannes.
   *
   * `fetchpriority` on sama asia vihjeenä, mutta järjestys on se, joka
   * pätee joka selaimessa.
   */
  jokaLaatta(taso, laatta, arkki, nakyva, kasittele);
  jokaLaatta(taso, laatta, arkki, alue, kasittele);
  // Näkymästä pudonneet saman tason laatat pois — ja niiden haut poikki.
  for (const kuva of vanhatSamalta.values()) peruLaatta(kuva);
  tila.laatat = uudet;
  /*
   * Jos ruudulla ei ole yhtään keskeneräistä (kaikki tulivat
   * välimuistista), vanhan tason odotus on turha jo tässä.
   */
  if (tila.vanhat && kaikkiRuudullaLadattu(tila)) poistaVanhaTaso(tila);
  return ruudulla;
}

/* ------------------------------------------------------------ nostotaso */

/**
 * Nostotason tasot — pohjan tasogeometria nostotason laatastolla.
 *
 * Nostolaattaruudukko on TÄSMÄLLEEN pohjan ruudukko samalla z:lla
 * (sama leveys, sama vajaa viimeinen sarake), joten tasot johdetaan
 * pohjan tasoista eikä kirjoiteta luetteloon toiseen kertaan. Vain
 * kaksi asiaa vaihtuu: `laatasto` on nostotason bittikartta (tyhjiä
 * nostolaattoja EI OLE OLEMASSA — luettelo kertoo mitkä ovat, ja
 * peli pyytää vain niitä) ja `nosto: true` ohjaa osoitteen
 * nostot-alipolkuun (laattaUrl) ja noutokirjanpidon omalle
 * avaimelleen (noutoAvain). `__bitit: undefined` on pakollinen:
 * levityskopio toisi pohjan tason valmiiksi puretun bittikartan
 * mukanaan, ja laattaOlemassa lukisi väärää laatastoa.
 */
function nostotasonTasot() {
  const nt = luettelo?.nostotaso;
  if (!nt?.tasot?.length || !nt.laatastot) return null;
  if (!luettelo.__nostoTasot) {
    luettelo.__nostoTasot = luettelo.tasot
      .filter((t) => nt.tasot.includes(t.z) && nt.laatastot[t.z])
      .map((t) => ({
        ...t, laatasto: nt.laatastot[t.z], __bitit: undefined, nosto: true,
      }));
  }
  return luettelo.__nostoTasot.length ? luettelo.__nostoTasot : null;
}

/**
 * Päivittää nostotason kerroksen — tai häivyttää sen, kun kamera on
 * nostotason tasojen ulkopuolella.
 *
 * KAUKOTASOILLA NOSTOLAATTOJA EI OLE OLEMASSA (generointi vain
 * z5–z7, omistajan päätös: jana ≤ ~200 km), joten piilotus on
 * ilmainen: kerros saa opacityn 0 eikä yhtään laattaa pyydetä.
 * Laatat JÄÄVÄT puuhun häivytyksen ajaksi — juuri ne pikselit
 * liukuvat pois näkyvistä, ja jos pelaaja palaa heti takaisin, ne
 * ovat valmiina. Muisti ei kasva: kerroksessa on enintään yhden
 * tason nostolliset laatat, ja seuraava syvä näkymä siivoaa ne
 * paivitaKerroksen omalla kirjanpidolla.
 */
function paivitaNostotaso(ui, taso, laatta, arkki, alue, nakyva) {
  const kerros = ui.pyramidiNostoKerros;
  if (!kerros) return;
  const tasot = nostotasonTasot();
  const oma = tasot?.find((t) => t.z === taso.z) ?? null;
  kerros.style.opacity = oma ? '1' : '0';
  if (!oma) return;
  ui.pyramidiNosto ??= tyhjaTila(kerros);
  ui.pyramidiNosto.kerros = kerros;
  paivitaKerros(ui.pyramidiNosto, oma, laatta, arkki, alue, nakyva, 'low');
  mittarit.nostoja = ui.pyramidiNosto.laatat.size;
}

/**
 * Päivittää näkyvät laatat. Turvallinen kutsua joka näkymän
 * asettumisesta: ilman näkyvää aluetta tai kerrosta palaa heti.
 */
export function paivitaPyramidi(ui) {
  if (ui?.dead || !ui?.pyramidiKerros) return;
  // Katselutilan maanosalaudat piirtävät oman karttansa (ks.
  // pyramidiKattaa): niille laatat osuisivat väärään kohtaan.
  if (!pyramidiKattaa(ui.game?.pack?.id)) return;
  const nakyva = ui.nakyvaAlue?.();
  if (!nakyva?.w) return;
  if (!luettelo) {
    /*
     * Ensimmäinen kutsu käynnistää haun ja palaa; piirto tulee heti kun
     * luettelo on kädessä.
     *
     * ARKKI ENSIN, LAATAT VASTA SITTEN. Kamera on siihen asti sovitettu
     * varalukuihin (ARKKI_VARALLA); jos luettelon arkki on eri, näkymä
     * on juuri nyt väärässä mittakaavassa eikä laattoja kannata laskea
     * vanhalle rajaukselle.
     *
     * MERKKIKETJU VIIMEISENÄ. Luettelo kertoo, ovatko paikannimet
     * laatoissa vai pelin ladottavina (laatoissaOnNimet), ja ennen sen
     * saapumista nimikerros on vaiennut varmuuden vuoksi. Ilman tätä
     * kutsua nimet ilmestyisivät vasta seuraavasta pelaajan eleestä —
     * ja se ajetaan rajojen jälkeen, jotta ladonta näkee oikean
     * mittakaavan.
     */
    void haeLuettelo().then((j) => {
      if (!j || ui.dead) return;
      ui.paivitaLaudanRajat?.();
      paivitaPyramidi(ui);
      ui.paivitaMaastonimet?.();
    });
    return;
  }

  const alkoi = performance.now();
  const { arkki, laatta, tasot } = luettelo;
  const dpr = globalThis.devicePixelRatio || 1;
  const taso = valitseTaso(tasot, (nakyva.skaala ?? 1) * dpr);
  const yksikkoaPerLaatta = laatta / taso.pikseliaPerYksikko;

  /*
   * PANOROINNIN SUUNTA LUETAAN NÄKYMÄN KESKIPISTEEN SIIRTYMÄSTÄ.
   *
   * Tämä funktio ajetaan kerran jokaisesta asettuneesta näkymästä (ele
   * päättyy, ks. js/kartta.js "lataus siis aina vain juuri kun sormi
   * irtoaa"), joten kahden peräkkäisen keskipisteen erotus ON viimeisin
   * sormenveto. Suuntaa ei siis tarvitse kysyä eleeltä eikä
   * js/ui.js:ään tarvitse koskea.
   *
   * Yksikkönä ruudullinen, jotta pysty ja vaaka ovat vertailukelpoisia.
   * Alle kymmenesosan siirtymä ei ole suunta vaan napautuksen väre.
   */
  const keskus = { x: nakyva.x + nakyva.w / 2, y: nakyva.y + nakyva.h / 2 };
  let suunta = null;
  if (edellinenKeskus && edellinenTaso === taso.z) {
    const dx = (keskus.x - edellinenKeskus.x) / nakyva.w;
    const dy = (keskus.y - edellinenKeskus.y) / nakyva.h;
    const pit = Math.hypot(dx, dy);
    if (pit > 0.1) suunta = { x: dx / pit, y: dy / pit };
  }
  edellinenKeskus = keskus;
  edellinenTaso = taso.z;

  /*
   * KIINNITYSALUE: näkyvä + puoli ruutua joka suuntaan, ja liikkeen
   * suuntaan puoli lisää. Reunus on se, mikä ELEEN AIKANA estää tyhjän:
   * uusia laattoja ei kiinnitetä kesken sormenvedon (omistajan linjaus),
   * joten ruudulle ehtii vain se, mikä oli puussa jo ennen elettä.
   */
  const lisa = suunta ? {
    vasen: Math.max(0, -suunta.x) * SUUNTALISA_RUUTUJA,
    oikea: Math.max(0, suunta.x) * SUUNTALISA_RUUTUJA,
    yla: Math.max(0, -suunta.y) * SUUNTALISA_RUUTUJA,
    ala: Math.max(0, suunta.y) * SUUNTALISA_RUUTUJA,
  } : null;
  const kiinnitys = laajenna(nakyva, KIINNITYS_RUUTUJA, lisa);

  const kerros = ui.pyramidiKerros;
  varmistaKerrokset(ui);
  /*
   * MERIPOHJA KAIKEN ALLE (harva pyramidi).
   *
   * Umpimeren laattoja ei ole generoitu; niiden tilalle jää tämä yksi
   * suorakaide arkin kokoisena. Se on kerroksen ENSIMMÄINEN lapsi,
   * joten jokainen laatta piirtyy sen päälle — mitään ei tarvitse
   * sovittaa laatta laatalta, ja puuttuva laatta paljastaa täsmälleen
   * sen sävyn, jonka generaattori laski sille ulapalle.
   */
  if (luettelo.meriSavy && !ui.pyramidiPohja) {
    const [pr, pg, pb] = luettelo.meriSavy;
    ui.pyramidiPohja = el('rect', {
      x: arkki.x,
      y: arkki.y,
      width: arkki.w,
      height: arkki.h,
      fill: `rgb(${pr},${pg},${pb})`,
      class: 'pyramidi-meri',
    }, kerros);
    kerros.prepend(ui.pyramidiPohja);
  }

  /*
   * KARKEA POHJA ENSIN, TARKKA TASO PÄÄLLE.
   *
   * Pohja on NAULATTU (pohjanTaso): tasoilla z5…z7 se on aina z3, eikä
   * se siis vaihdu eikä tyhjene kun tarkka taso vaihtuu. Se on koko
   * pohjakerroksen tarkoitus — alla on aina jotain — ja se maksaa
   * mitattuna 3…11 laattaa, koska yksi z3-laatta kattaa 16 kertaa
   * leveämmän alan kuin z7-laatta.
   */
  ui.pyramidiKarkea ??= tyhjaTila(ui.pyramidiPohjaKerros, true);
  ui.pyramidiTarkka ??= tyhjaTila(ui.pyramidiTarkkaKerros);
  ui.pyramidiKarkea.kerros = ui.pyramidiPohjaKerros;
  ui.pyramidiTarkka.kerros = ui.pyramidiTarkkaKerros;

  const karkea = pohjanTaso(tasot, taso);
  /*
   * KUMPI KERROS ON POHJIMMAISENA? Se, jonka alla ei ole mitään, ei saa
   * heittää pois ruudulla olevaa laattaa (ks. paivitaKerros). Uloimmilla
   * tasoilla pohjakerrosta ei ole, jolloin tarkka kerros on itse alin.
   */
  ui.pyramidiTarkka.alin = !karkea;
  let karkeitaRuudulla = 0;
  if (karkea && karkea.z !== taso.z) {
    karkeitaRuudulla = paivitaKerros(ui.pyramidiKarkea, karkea, laatta, arkki,
      laajenna(nakyva, KARKEA_RUUTUJA), nakyva, 'high');
  } else if (ui.pyramidiKarkea.laatat.size) {
    /*
     * Uloimmilla tasoilla karkeampaa ei ole, eikä samaa tasoa piirretä
     * kahdesti: pohjakerros tyhjenee vasta tässä, kun tarkka taso on jo
     * puussa sen päällä.
     */
    poistaVanhaTaso(ui.pyramidiKarkea);
    for (const kuva of ui.pyramidiKarkea.laatat.values()) kuva.remove();
    ui.pyramidiKarkea.laatat = new Map();
    ui.pyramidiKarkea.z = null;
  }

  const ruudulla = paivitaKerros(ui.pyramidiTarkka, taso, laatta, arkki,
    kiinnitys, nakyva, 'high');
  ui.pyramidiLaatat = ui.pyramidiTarkka.laatat;

  /*
   * NOSTOTASO TARKAN PÄÄLLE. Kiinnitysalue on sama kuin tarkalla
   * tasolla, ja prioriteetti matala: pohjakartta menee aina nostojen
   * edelle — nosto ilman karttaa alla olisi mustetta tyhjällä
   * pergamentilla.
   */
  paivitaNostotaso(ui, taso, laatta, arkki, kiinnitys, nakyva);

  mittarit.taso = taso.z;
  mittarit.nakymassa = ui.pyramidiTarkka.laatat.size;
  mittarit.karkeita = ui.pyramidiKarkea.laatat.size;
  // Ruudulla olevat laatat MOLEMMISTA kerroksista: ne selain purkaa.
  mittarit.ruudulla = ruudulla + karkeitaRuudulla;
  mittarit.paivityksia += 1;
  mittarit.viimeisinPaivitysMs = Math.round((performance.now() - alkoi) * 100) / 100;

  /*
   * ESILATAUS VIIMEISENÄ. Kiinnitetyt laatat ovat jo lähteneet hakuun,
   * ja jono rakennetaan niiden ympärille — jokainen kiinnitetty laatta
   * on juuri merkitty noudetuksi, joten sama tiedosto ei mene kahdesti.
   * Viereiset zoomtasot tulevat jonon perälle.
   */
  jonotaEsilataus(taso, laatta, arkki, nakyva, suunta);
  jonotaTasovaihto(tasot, taso, laatta, arkki, nakyva);
}

/** Tyhjentää laatat (laudan vaihto, pelin loppu). */
export function nollaaPyramidi(ui) {
  /*
   * ODOTTAVA ESILATAUS PERUUNTUU AINA — myös silloin, kun kerrosta ei
   * ole. Jono kuvaa näkymää, jota ei enää ole, ja se veisi kaistaa
   * uuden laudan omilta laatoilta.
   */
  clearTimeout(noutoAjastin);
  noutojono = [];
  mittarit.esijonossa = 0;
  edellinenKeskus = null;
  edellinenTaso = null;
  if (!ui?.pyramidiKerros) return;
  clearTimeout(ui.pyramidiTarkka?.ajastin);
  clearTimeout(ui.pyramidiKarkea?.ajastin);
  clearTimeout(ui.pyramidiNosto?.ajastin);
  while (ui.pyramidiKerros.firstChild) ui.pyramidiKerros.firstChild.remove();
  // Kerrokset ja niiden tilat rakennetaan seuraavassa päivityksessä.
  ui.pyramidiPohjaKerros = null;
  ui.pyramidiTarkkaKerros = null;
  ui.pyramidiNostoKerros = null;
  ui.pyramidiTarkka = null;
  ui.pyramidiKarkea = null;
  ui.pyramidiNosto = null;
  ui.pyramidiLaatat = new Map();
  ui.pyramidiPohja = null;
  mittarit.nakymassa = 0;
  mittarit.ruudulla = 0;
  mittarit.karkeita = 0;
  mittarit.nostoja = 0;
}
