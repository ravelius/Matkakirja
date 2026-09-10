/*
 * IHMISEN MATKA — ESITYS YHTENÄ KAARENA.
 *
 * Raamattu, IHMISEN MATKA ON YKSI KAARI, EI PYSAKKEJA (omistaja
 * 7.9.2026 ilta, sanatarkasti): *"Tässä on siis yksi pitkä
 * tarinankaari. Toisin kuin keksijöissä, oli jokaisessa oma nostonsa.
 * Ja silloin myös nämä kuvituskuvat ovat vain sivuosassa. … Ne pysäkit
 * ovat vain meidän tekemiämme kaivauksia ja havaintoja, mutta se ei
 * saisi rikkoa sitä virtaa."* — sekä ALKAA MUSTASTA RUUDUSTA, KERTOMUS
 * SOLJUVAKSI ja KAARI HYVAKSYTTY, TUTKIMUSVAIHE, VIISI NAPPIA.
 *
 * Tämä moduuli on ESITYKSEN OHJAAJA. Se ei omista mitään pintaa:
 * kellon, kameran, vanat, musiikin ja lamput omistaa aikajanamoottori
 * (js/aikajana.js), ja tämä kertoo niille, mitä kaanoni
 * (js/linssit/ihmisen-matka-kertomus.js) kussakin jaksossa tahtoo.
 * Moottorin pysäkkikello (kehys → aikajanaAskel → sytyta) EI KÄY
 * esityksen aikana lainkaan: `tila.i` jää arvoon −1, jolloin myös
 * värivirtojen oma kameraohjaus pysyy poissa päältä
 * (js/aikajana-virrat.js ohjaaKameraa) ja kamera on kokonaan tämän
 * käsissä.
 *
 * ── VIISI VAIHETTA ────────────────────────────────────────────────
 *
 *   1. PIMEÄ    Käynnistä-napin jälkeen ruutu on TÄYSIN musta (oma peite
 *               linssin juuressa, peittävyys 1). Kartta ja
 *               käyttöliittymä ovat piilossa, vain sulkunappi on
 *               käytettävissä; kertojan 'avaus'-luenta soi. Musiikki EI
 *               vielä ala. Tähdet feidautuvat esiin mustan laskiessa
 *               harsoksi, ja pallo on kaukana pisteenä (ks. AVAUS).
 *   2. VALOT    Musta häipyy VALOJEN_MS:ssä VASTA KUN zoomi on perillä
 *               ja pallo täyttää ruudun Afrikka keskellä (kaanonin
 *               'afrikka'-jakso on silloin jo käynnissä). Musiikki
 *               nousee sisään.
 *   3. MATKA    Jaksot peräkkäin ILMAN TAUKOA: luenta soi, kamera liukuu
 *               jakson kohteeseen tai nimettyyn alueeseen, kello etenee
 *               lineaarisesti jakson vuosista seuraavan jakson vuosiin
 *               luennan keston mukaan, ja vanat kasvavat kellon tahdissa.
 *   4. HYPPY    'aikahyppy': kello kelaa taaksepäin (14 500 → 50 000)
 *               nopeana mutta pehmeänä liukuna ja kamera siirtyy
 *               Keski-Aasiaan. Rintama ei katoa (ks. PITO alla).
 *               KELAUS ON VISUAALINEN: ääntä ei kelata, kertoja lukee
 *               aikahypyn kappaleen putkeen muiden joukossa.
 *   5. LOPPU    Kamera vetäytyy koko palloon, kaikki vanat näkyvissä,
 *               pulun välihuomio — ja `ui.aloitaTutkimusvaihe?.()`.
 *
 * ── PITO: RINTAMA EI KATOA ────────────────────────────────────────
 *
 * Kaanoni palaa ajassa taaksepäin kerran (Chile 14,5 ka → aikahyppy
 * 50 ka; Blombosin toinen paluu poistui 8.9.2026, kun Etelä-Afrikassa
 * käydään enää kerran). Ilman pitoa vana kelautuisi auki. Pito kytketään
 * päälle KOKO ESITYKSEN AJAKSI heti valojen syttyessä
 * (js/aikajana-virrat.js asetaPito, js/aikajana-vanat.js paivita):
 * piirretty vana ei enää lyhene, mutta kasvaa yhä normaalisti.
 *
 * ── AVAUS: MUSTA VIRKE, PISTE TÄHDISSÄ, AFRIKKA SANAN JÄLKEEN ─────
 *
 * Raamattu "IHMISEN MATKAN ALKUANIMAATIO: ENSIMMAINEN VIRKE MUSTALLE,
 * PALLO TAHTIEN KESKELLA PISTEENA, AFRIKKA TAYTTAA RUUDUN KUN SE
 * MAINITAAN, KAMERA KIIHTYY MAROKKOON" (omistaja 9.9.2026 klo 15.15,
 * sanatarkasti): *"ensimmäinen virke saisi tulla täysin mustalle
 * näytölle. sitten musta feidautuisi pois näkyvistä ja maapallo tulisi
 * näkyviin tähtien keskellä aivan pienenä pisteenä, ei juuri tähtiä
 * isompana. sen jälkeen maapallo saisi zoomautua nopeasti niin lähelle
 * että afrikka täyttää koko peli-ikkunan sillä hetkellä kun lukija
 * mainitsee afrikan ensimmäistä kertaa. tämän jälkeen kamera saa alkaa
 * hitaasti liikkua kohti ensimmäistä kohdetta marokossa ja sen vauhti
 * voi kiihtyä loppua kohden kunnes hidastaa juuri ennen kuin saapuu
 * perille kun marokon teksti alkaa."* — sekä edeltävä AVAUS MUSTASTA
 * TAHTIIN JA AFRIKKAAN SANAN KOHDALLA (8.9.2026): *"Jokainen lause
 * voisi tulla tämän kappaleen loppuun asti yksitellen keskelle ruutua.
 * Vasta kun siirrytään ensimmäiseen kohteeseen tekstit hyppäävät alas
 * nykyiselle paikalleen."*
 *
 * KOKO AVAUS ON KIINNI LUENNAN AIKALEIMOISSA, ei sekuntikellossa.
 * `avauksenVaiheet` (puhdas funktio) kääntää avausjakson lauseiden ja
 * sanojen aikaleimat viideksi hetkeksi, ja kehyssilmukka lukee ne
 * äänikellosta (js/linssit/ihmisen-matka-luenta.js kulunut):
 *
 *   1. MUSTA VIRKE. Peite on läpinäkymätön (`musta`) koko ENSIMMÄISEN
 *      VIRKKEEN ajan (aikaleimojen `lauseet[1]`): pallo on jo asetettu
 *      kauas (AVARUUDEN_KORKEUS) ja tähtitaivas rakennettu, mutta
 *      kumpaakaan ei näy.
 *   2. PISTE TÄHDISSÄ. Toisen virkkeen alkaessa peite laskee harsoksi
 *      (AVARUUDEN_HARSO) ja pistepilvi nousee samassa tahdissa
 *      peittävyyteen 1. Maa on tähtien keskellä PISTEENÄ, tuskin
 *      tähteä isompana: korkeudella 300 se on 0,8 % ruudun korkeudesta
 *      eli noin 6 px (pallonOsuusRuudusta).
 *   3. AFRIKKA-SANA. Zoomi ei lähde kellosta vaan PÄÄTTYY kertojan
 *      sanaan: avausjakson neljäs lause on "Afrikasta.", ja sen
 *      alkuhetki luetaan aikaleimoista (tai lasketaan merkkiosuutena,
 *      sananHetki). Zoomi ajetaan taaksepäin siitä hetkestä, joten
 *      Afrikka täyttää ruudun VAJAAN SEKUNNIN (AFRIKAN_VIIVE_MS
 *      = 0,7 s) SEN JÄLKEEN, kun sana kuuluu — Raamattu "IHMISEN
 *      MATKA: AFRIKKA 0,7 S SANAN JALKEEN" (omistaja 10.9.2026 klo
 *      23.00, sanatarkasti): *"Siirrä Afrikan ilmestymistä puoli
 *      sekuntia aiemmaksi."* (aiempi klo 23.35 linjaus oli 1,2 s). Jos
 *      jakso loppuu ennen sitä, päätepiste jää jakson loppuun.
 *   4. KAMERA KIIHTYY MAROKKOON. Samalla hetkellä (zoomin päätyttyä,
 *      ei siis enää sanan kohdalla) kamera lähtee
 *      hitaasti kohti ensimmäistä kohdetta (Jebel Irhoud), kiihtyy ja
 *      jarruttaa juuri ennen perille tuloa (marokonPehmennys). Ajon
 *      kesto luetaan luennasta: perillä ollaan kun 'jebel-irhoud'-
 *      jakson aikaleima alkaa.
 *   5. LAUSEET KESKELLÄ. Avaus- ja afrikka-jaksojen teksti ladotaan
 *      lause kerrallaan RUUDUN KESKELLE (.aikajana-kertomusteksti
 *      .keskella): lause tulee omalla vuorollaan, häipyy ennen
 *      seuraavaa, ja koko rivi laskeutuu pehmeästi alalaitaan vasta kun
 *      ensimmäinen kohde ('jebel-irhoud') alkaa.
 *
 * AIKALEIMAKOUKKU. Ajoitus on ARVIO niin kauan kuin luenta on pelkkä
 * ääniraita: lauseen ja sanan alkuhetki on sen merkkiosuus koko
 * kappaleesta kerrottuna jakson kestolla (sama tapa kuin
 * kertomuksenVarakesto). Kun Fable generoi luennan aikaleimoineen,
 * kaanonin jaksoon tulee kenttä `aikaleimat`:
 *
 *   aikaleimat: { lauseet: [0, 3120, 5040, 6980, 7910],
 *                 sanat:   [0, 480, 980, 1520, …] }
 *
 * eli millisekunteja jakson luennan alusta — `lauseet` yhtä monta
 * alkiota kuin jaaLauseiksi antaa lauseita, `sanat` yhtä monta kuin
 * tekstissä on välilyönnillä erotettuja sanoja. Jos taulukko on
 * olemassa ja oikean mittainen, se VOITTAA arvion; muuten arvio jää
 * voimaan eikä mikään rikkoudu.
 *
 * ── KUVAT OVAT SIVUOSASSA ─────────────────────────────────────────
 *
 * Kun jaksolla on kohde, sen kuva nousee PIENENÄ (KUVAN_OSUUS ruudun
 * leveydestä, pergamenttikehys) kohteen viereen pallon pinnalle
 * luennan ajaksi ja häipyy jakson päättyessä. Se ei pysäytä mitään:
 * kello käy, kamera liukuu ja kertoja jatkaa. Lippu
 * IHMISEN_MATKA_KUVAT_ESITYKSESSA kytkee kuvat kokonaan pois
 * (omistaja: *"Vaihtoehtoisesti ne voitaisiin jopa hetkeksi jättää
 * pois kokonaan"*); saman tekee osoiterivin `?esityskuvat=ei`, jottei
 * kokeilu vaadi koodin muokkausta.
 *
 * ── LUENTA JA KESTO ───────────────────────────────────────────────
 *
 * Luenta on omassa moduulissaan (js/linssit/ihmisen-matka-luenta.js),
 * ja sillä on kaksi tilaa. PUTKI (Raamattu KERTOJA LUKEE KOKO
 * KERTOMUKSEN PUTKEEN, omistaja 9.9.2026: *"siinä koko tekstin luenta
 * saisi mennä putkeen ilman että sitä katkotaan välillä"*): koko
 * kertomus on ämpärissä yhtenä äänitteenä ja se soitetaan KERRAN alusta
 * loppuun — ei kelausta, ei pysäytystä, ei taukoa jaksojen väliin.
 * Ohjaaja ei silloin aja kelloa seinäkellosta vaan ÄÄNIKELLOSTA
 * (`luenta.kulunut()`), ja jakso vaihtuu, kun soittimen `currentTime`
 * ohittaa seuraavan jakson `alku`-aikaleiman (`onRaja`). JAKSO
 * KERRALLAAN on entinen käytös: oma mp3 per jakso nimellä, jonka antaa
 * js/linssipuhe.js kertomuksenRunko — sama funktio kuin
 * generointityökalulla (tools/generoi-linssiluennat.mjs --kertomus),
 * joten nimi ei voi eriytyä.
 *
 * KAKSI KESTOA. Putkessa jakso antaa `kesto`-luvun (seuraavan jakson
 * alkuun — kello, kamera ja jakson vaihto) ja `puhe`-luvun (tämän
 * jakson viimeiseen ääneen). Kello ja kamera jakavat matkansa koko
 * `kesto`-välille, joten tiedostossa kappaleiden välissä olevat
 * hiljaisuudet kuuluvat luontevasti läpi. Jakso kerrallaan -tilassa
 * kesto tulee ÄÄNITTEESTÄ heti kun sen metatiedot saapuvat; siihen asti
 * (ja kokonaan ilman äänitettä) kesto on tekstin pituus jaettuna 14
 * merkillä sekunnissa (kertomuksenVarakesto). Esitys ei siis pysähdy
 * siihen, ettei ääntä ole — mykistetty peli kulkee luetun mittaisena
 * seinäkellolla. Manifestin lauseiden ja sanojen aikaleimat välittyvät
 * jaksolle kenttään `jakso.aikaleimat` (ms jakson alusta), josta avaus
 * ja tekstin rytmitys lukevat ne.
 *
 * ── PULUN VÄLIHUOMIOT ─────────────────────────────────────────────
 *
 * Jakson `pulu` luetaan pulun äänellä sillä hetkellä, kun jakson oma
 * PUHE päättyy (`tila.puluHetki`): putkessa se on kappaleiden välinen
 * hengähdys, joten välihuomio alkaa hiljaisuudesta ja kuuluu kertojan
 * päälle vasta hännästään. Kupla on pieni (js/pollo.js
 * polloLinssikupla, linssin oma poikkeus kuplaporttiin) ja äänite soi
 * PULUN_VAIMENNUS_PUTKESSA (0,55) × tasolla ilman kertojan väistöä —
 * sama mekanismi kuin fokusvirran huudahduksella (js/liviapuhe.js
 * soitaLivianLinssiAani, `vaista: false`). Kertoja ei vaikene eikä
 * kello pysähdy. Jakso kerrallaan -tilassa välihuomio soi entiseen
 * tapaan omassa raossaan (LIVIAN_VALIHUOMION_VAIMENNUS, jakson häntä
 * PULUN_VARA_MS); putkessa häntää EI ole, koska luentaa ei katkota.
 *
 * ── TUTKIMUSVAIHE ON TOISEN TYÖTÄ ─────────────────────────────────
 *
 * Esitys päättyy koukkuun `ui.aloitaTutkimusvaihe?.()`. Mitä sen
 * takana on — hehkuvat nostokohdat, viisi nappia, pulun kutsu — ei
 * kuulu tälle moduulille (Raamattu KAARI HYVAKSYTTY, TUTKIMUSVAIHE,
 * VIISI NAPPIA). Ilman koukkua esitys päättyy siihen, että kartta jää
 * pelaajalle: esinerivi palaa ja ohjaimet tulevat takaisin.
 */

import { projisoiLaudalle } from '../fokusmitat.js';
import { kertomuksenVarakesto } from '../linssipuhe.js';
import { luoKertomusluenta } from './ihmisen-matka-luenta.js';
import { LIVIAN_VALIHUOMION_VAIMENNUS, soitaLivianLinssiAani } from '../liviapuhe.js';
import { polloLinssikupla } from '../pollo.js';
import { karkiHetkella } from '../aikajana-vanat.js';
import { luoTahtitaivas } from '../pallolauta/tahdet.js';
import { kulmaEro } from './ihmisen-matka-kortti.js';
import { rajauksenLeveys, vananRajaus } from './ihmisen-matka-tutkimus.js';
import { ilmoitaLivianTunne } from '../livia-tilanteet.js';

/** Lauta, jonka koordinaatistoon nimetyt alueet projisoidaan. */
const LAUTA = 'maailmankartta';

/**
 * KUVAT ESITYKSESSÄ (oletus päällä). Omistajan koeasetus: false jättää
 * löytökuvat kokonaan pois, jolloin ruudulla on vain viiva, kello ja
 * kertojan ääni. Osoiterivin `?esityskuvat=ei` tekee saman ilman
 * koodin muokkausta.
 */
export const IHMISEN_MATKA_KUVAT_ESITYKSESSA = true;

/** Kuvan leveys osuutena ruudun leveydestä (omistajan mitta: "pienenä"). */
export const KUVAN_OSUUS = 0.22;

/**
 * KAMERAN LÄHIKUVA JAKSOLLA. Väljempi kuin pysäkkiajon 560
 * (js/linssit/ihmisen-matka.js IHMISEN_MATKAN_LAHIKUVA): kertomuksessa
 * ei pysähdytä katsomaan löytöä vaan katsotaan, MITEN VIIVA LAAJENEE
 * kohteen ohi. 1 200 lautayksikköä on noin 36° eli 4 000 km ruudun
 * leveydellä — kohde on selvästi tunnistettavassa lähikuvassa, mutta
 * vanan kärki ja sen suunta mahtuvat samaan kuvaan.
 */
export const ESITYKSEN_LAHIKUVA = 1200;

/** Koko maapallo laudan yksiköissä (sama laatikko kuin linssin `alue`). */
const MAAILMA = {
  x: 0, y: 0, w: 12000, h: 5399,
};

/**
 * NIMETYT RAJAUKSET kaanonin `alue`-kentälle. Laatikot ovat asteina
 * (lat/lon) ja käännetään laudan yksiköiksi vasta ajossa, jotta luvut
 * ovat luettavia ja tarkistettavia. Kamera saa laatikon
 * (`ajaKamera({ bbox })`), joka mahtuu ruudulle kummassakin suunnassa
 * kuvasuhteesta riippumatta — siksi tässä ei ole korkeuksia.
 */
export const ESITYKSEN_ALUEET = {
  // Koko Afrikka: Hyväntoivonniemeltä Välimerelle, Atlantilta Somaliaan.
  afrikka: {
    lat: [-35, 37], lon: [-18, 52],
  },
  // Afrikan itälaita: Etiopian jokilaaksot ja Punaisenmeren rannikko.
  'afrikka-ita': {
    lat: [0, 18], lon: [30, 50],
  },
  // Keski-Aasia laajana: Altai, Siperian eteläreuna ja Iranin ylängöt.
  'keski-aasia': {
    lat: [28, 60], lon: [50, 105],
  },
  // Koko pallo: lopun peräytyminen.
  maailma: null,
};

/** Mustan häivytys valojen syttyessä (omistaja: "2–3 s"). */
export const VALOJEN_MS = 2600;
/*
 * AVARUUSAVAUS (Raamattu "IHMISEN MATKA: MUSTA ALKU ON AVARUUS, PALLO
 * ZOOMAUTUU PIMEYDESTA AFRIKKA EDELLA", omistaja 7.9.2026 ilta:
 * *"Ja se pimeys on avaruus"*, ja tarkennus *"Kertoja alkaa jo
 * pimeydestä"* — sekä 8.9.2026 AVAUS MUSTASTA TAHTIIN JA AFRIKKAAN
 * SANAN KOHDALLA: *"ihan pienestä pisteestä zoomautuisi afrikka
 * esiin"*). Ruutu alkaa täysin mustana, tähdet feidautuvat esiin ja Maa
 * on niiden keskellä PISTEENÄ, kunnes kertoja sanoo "Afrikasta" ja
 * pallo kasvaa ruudun täyttäväksi.
 *
 * KORKEUS 300 ON KAUKANA LAUDAN OMAN KATON TAKANA (js/pallolauta/kamera.js
 * PALLO_KORKEUS_MAX = 2,5, ja js/pallolauta/lauta.js sitoo
 * OrbitControlsin maxDistancen samaan). MITATTU (kontti, 1280 × 800):
 * korkeudella 2,5 pallo täyttää jo ruudun leveyden ja korkeudella 7,5 se
 * on kolmanneksen ruudun korkeudesta — kumpikaan ei ole "ihan pieni
 * piste". Korkeudella 50 pallo oli 4,5 % ruudun korkeudesta eli noin
 * 36 px, mikä on yhä moninkertainen tähteen verrattuna; omistajan
 * tarkennus 9.9.2026 (*"aivan pienenä pisteenä, ei juuri tähtiä
 * isompana"*) vei korkeuden 300:aan, jolloin pallo on 0,76 % ruudun
 * korkeudesta eli noin 6 px 800 px:n ruudulla (pallonOsuusRuudusta).
 * Tähdet venytetään SAMASSA SUHTEESSA (TAHTIEN_KERROIN = korkeus / 5),
 * jotta kirkkain kerros jää yhä kameran taakse ja taivas on joka
 * suunnassa eikä rypäs pallon vieressä. Kameran far-taso (mitattu:
 * 125 000 yksikköä eli 1 250 pallonsädettä) riittää tähänkin: kaukaisin
 * tähti on 391 ja kamera 301 pallonsädettä keskipisteestä.
 *
 * Avaus siis LEVENTÄÄ ohjaimen kattoa hetkeksi ja asettaa lähtönäkymän
 * laudan omalla `pointOfView`-kutsulla; katto palautetaan ajon jälkeen
 * (palautaKaukaisuus), eikä pelaaja pääse sillä välin pallon ohjaimiin
 * (peite on edessä). Zoomi itse ajetaan laudan omalla ajaKameralla,
 * joka rajaa MAALIN normaaliin 2,5:een.
 */
export const AVARUUDEN_KORKEUS = 300;
/** Tähtitaivaan venytys avauksessa (js/pallolauta/tahdet.js kerroin). */
export const TAHTIEN_KERROIN = AVARUUDEN_KORKEUS / 5;
/**
 * ZOOMIN ENIMMÄIS- JA VÄHIMMÄISKESTO. Kesto ei ole enää vakio vaan
 * luetaan luennasta: zoomi PÄÄTTYY sanaan "Afrikasta", joten sen mitta
 * on se aika, joka jää tähtien esiintulon ja sanan väliin
 * (avauksenVaiheet). Katto ja pohja pitävät huolen siitä, ettei
 * poikkeuksellisen pitkä tai lyhyt äänite tee siitä tahmeaa tai
 * räpsähdystä.
 */
export const AVARUUDEN_MS = 7000;
export const AVARUUDEN_MIN_MS = 1200;
/**
 * AFRIKKA TÄYTTÄÄ RUUDUN 0,7 S SANAN JÄLKEEN (Raamattu "IHMISEN MATKA:
 * AFRIKKA 0,7 S SANAN JALKEEN…", omistaja 10.9.2026 klo 23.00
 * sanatarkasti: *"Siirrä Afrikan ilmestymistä puoli sekuntia
 * aiemmaksi."*). Zoomin päätepiste ei ole tasan sanan "Afrikasta"
 * kohdalla vaan tämän verran sen jälkeen; musta virke ja tähtien
 * esiintulo pysyvät ennallaan. Edellinen arvo oli 1200 ms (10.9.2026
 * klo 23.35 linjaus *"reilun sekunnin myöhemmin"*), ja omistaja
 * mittasi sen iPadilla puoli sekuntia liian hitaaksi.
 */
export const AFRIKAN_VIIVE_MS = 700;
/** Osuus zoomista, jonka jälkeen tähdet alkavat häipyä. */
export const TAHTIEN_HAIVE = 0.55;
/** Avauksen tumma harso pallon päällä (0 = ei harsoa). */
export const AVARUUDEN_HARSO = 0.35;
/**
 * MUSTAN OSUUS, JOS LAUSEITA EI TIEDETÄ. Musta kestää ensimmäisen
 * virkkeen ajan (aikaleimojen `lauseet[1]`); jos avausjaksosta ei löydy
 * toista lausetta lainkaan, musta kestää tämän osuuden siitä matkasta,
 * joka jakson alusta on sanaan "Afrikasta".
 */
export const MUSTAN_OSUUS = 0.35;
/** Tähtien feidaus mustasta esiin (omistaja: "esim. 1,5–2 s"). */
export const TAHTIEN_FEIDI_MS = 1800;
/**
 * Osuus mustan ja Afrikka-sanan välisestä ajasta, jonka feidaus saa
 * viedä: loppu jää pisteen katselulle ja zoomille.
 */
export const FEIDIN_OSUUS = 0.45;
/** Avauslauseen häivytys ennen seuraavan lauseen alkua. */
export const LAUSEEN_HAIVE_MS = 340;
/** Tekstirivin lasku keskeltä alalaitaan (css .aikajana-kertomusteksti). */
export const TEKSTIN_LASKU_MS = 900;
/**
 * PULU PIILOSSA KUNNES TEKSTI ON ALHAALLA — JA KÄVELEE SITTEN OIKEALTA
 * SISÄÄN (Raamattu "IHMISEN MATKA: AFRIKKA 0,7 S SANAN JALKEEN, PULU
 * PIILOSSA KUNNES TEKSTI ON ALHAALLA JA KAVELEE SITTEN OIKEALTA
 * SISAAN…", omistaja 10.9.2026 klo 23.00, sanatarkasti: *"Pulun
 * pitäisi olla piilossa kunnes tekstit siirtyvät alareunaan ja siitä
 * parin sekunnin päästä pulu voisi kävellä kartalla oikeasta reunasta
 * sisään."*).
 *
 * Odotus alkaa siitä, kun tekstirivin lasku (TEKSTIN_LASKU_MS) on
 * valmis — ei jakson alusta.
 */
export const PULUN_SISAANTULO_MS = 2000;
/**
 * SISÄÄNTULOELE on `walkBack` (js/livia-pikselit.js "Astelen
 * takaisin", 2,2 s): kävelyele, joka alkaa ruudun oikeasta reunasta
 * (livianSvgMalli: `walk.direction === -1` → x kulkee reunalta
 * paikalleen) ja päättyy pulun omalle paikalle. `arrive` olisi
 * lennähdys, `walkRight` sen vastapari ULOS ruudusta. Ele ajetaan
 * VAIN livia-eleiden julkisen rajapinnan kautta
 * (window.matkakirjaPollo.kasvoEleet.toista) — animaatiotiedostot ovat
 * toisen session omistuksessa.
 */
export const PULUN_SISAANTULOELE = 'walkBack';
/**
 * Piiloluokka bodylle. CSS (css/aikajana.css) piilottaa sekä napin,
 * paneelin ETTÄ kasvokankaan `visibility: hidden` -säännöllä: peittävyys
 * ei riittäisi, koska kasvot piirtyvät napin ULKOPUOLELLA omalle
 * kankaalleen (.livia-kasvot-pinta on bodyn lapsi). `visibility` on myös
 * se, jonka livia-eleet itse lukee näkyvyystestissään, joten piilossa
 * oleva pulu ei elehdi eikä puhu kankaalle.
 */
export const PULUN_PIILO_LUOKKA = 'aikajana-pulu-piilossa';
/**
 * SANA, JOSTA ZOOMI LÄHTEE. Alkuosa riittää: kaanonissa lukee
 * "Afrikasta.", mutta taivutus voi vaihtua ilman että ajoitus rikkoutuu.
 */
export const AVAUKSEN_SANA = 'Afrik';
/**
 * AIKAHYPYN KELAUS: nopea mutta pehmeä liuku taaksepäin. VAIN
 * VISUAALINEN — putkiluennassa ääntä ei kelata (Raamattu KERTOJA LUKEE
 * KOKO KERTOMUKSEN PUTKEEN): kello ja kamera palaavat, kertoja jatkaa.
 */
export const KELAUKSEN_MS = 2400;
/**
 * JAKSON HÄNTÄ JAKSO KERRALLAAN -TILASSA: aika, jonka pulun välihuomio
 * saa jakson perään. Putkessa häntää ei ole (luentaa ei katkota), vaan
 * pulu puhuu kappaleiden väliseen hengähdykseen kertojan päälle.
 */
export const PULUN_VARA_MS = 2600;
/**
 * PULUN TASO KERTOJAN PÄÄLLÄ (omistaja 9.9.2026: *"pulu voi puhua
 * hieman hiljempaa kertojan päälle omat kommentit"*). Kerroin pulun
 * perustasoon (js/liviapuhe.js LIVIAN_PERUSTASO = 0,8), aivan kuten
 * LIVIAN_VALIHUOMION_VAIMENNUS (0,7) — putkessa vain hieman sen alle,
 * koska kertoja ei enää vaikene välihuomion ajaksi.
 */
export const PULUN_VAIMENNUS_PUTKESSA = 0.55;
/** Lyhin ja pisin kamera-ajo jaksolla. */
export const KAMERAN_POHJA_MS = 1400;
export const KAMERAN_KATTO_MS = 9000;
/** Osuus jakson luennasta, jonka kamera-ajo saa kestää. */
export const KAMERAN_OSUUS = 0.85;
/**
 * ENSIMMÄISEEN KOHTEESEEN KIIHTYEN (Raamattu ALKUANIMAATIO … KAMERA
 * KIIHTYY MAROKKOON). `MAROKON_JARRU` on se kohta ajosta, jossa
 * kiihdytys loppuu ja jarrutus alkaa; `MAROKON_POHJA_MS` on lyhin ajo,
 * joka kannattaa aloittaa (sitä lyhyempi jää jakson omaksi ajoksi).
 */
export const MAROKON_JARRU = 0.8;
export const MAROKON_POHJA_MS = 1600;
/** Kuvan häivytys (css .aikajana-kertomuskuva). */
export const KUVAN_POISTUMA_MS = 420;
/** Loppunäkymän varmistava liuku, jos viimeinen ajo jäi kesken (ks. paata). */
export const LOPUN_ASETUS_MS = 1200;

/*
 * KÄRKI EI SAA POISTUA KUVASTA (Raamattu IHMISEN MATKA: ETELA-AFRIKASSA
 * KAMERA ULOS, VANA EI SAA HUKKUA; omistaja 7.9.2026 klo 18.15,
 * sanatarkasti: *"siinä tarinan alkupaikkeella, kun käydään
 * Etelä-Afrikan kohdalla, niin kartta voisi zoomautua ulospäin, jotta
 * ei hukattaisi sitä viivaa, jossa oltiin menossa niin pahasti"*).
 *
 * MITATTU (kontti, 7.9.2026, vanojen kärjet jaksoittain): 'ranta'-
 * jaksossa (164 000 → 75 000) kamera oli Pinnacle Pointissa (34° E),
 * mutta selkärangan kärki kulki Etiopiasta (12° N, 43° I) Arabiaan
 * (24° N, 58° I) — 50–65° päässä kohteesta, siis kokonaan kuvan
 * ulkopuolella 1 200 yksikön (n. 36°) lähikuvassa. Sama toistui
 * 'arabia'-jaksossa (kärki Keski-Aasiaan) ja 'denisova'-jaksossa
 * (kärki Beringiaan).
 *
 * SÄÄNTÖ (jaksonRajaus): kohteellisen jakson kamera rajataan
 * laatikkoon, jossa ovat KOHDE ja jakson aikana LIIKKUVIEN vanojen
 * kärkipolut (viisi näytettä jakson kellovälillä). Vain UUTTA piirtävä
 * osuus lasketaan — pito (kello palaa kaanonissa taaksepäin
 * aikahypyssä) pitää jo piirretyn paikallaan, eikä sen "kärki" ole
 * rintama. Kun jakso ei piirrä mitään uutta (kello palaa taaksepäin
 * tai seisoo pidon pohjalla), mukaan otetaan nykyinen rintama, jotta se
 * ei katoa kuvasta.
 *
 * KAKSI ETÄISYYSKATTOA, koska koko maailma ei ole yksi näyttämö:
 * selkäranka (kertomuksen päälinja) otetaan mukaan KARJEN_ETAISYYS_MAX_AST
 * asti (65° Pinnacle Point → Arabia mahtuu), sivuhaara vain
 * HAARAN_ETAISYYS_MAX_AST asti — Euroopan haaran kärki Lissabonissa ei
 * saa vetää Denisovan jakson kameraa puolen pallon näkymään, kun
 * Eurooppa kerrotaan vasta aikahypyn jälkeen. Rajaus ei koskaan mene
 * lähikuvaa (ESITYKSEN_LAHIKUVA) tiukemmaksi.
 */
export const KARJEN_ETAISYYS_MAX_AST = 80;
export const HAARAN_ETAISYYS_MAX_AST = 45;
/** Kärjen on liikuttava vähintään tämän verran, jotta vana on "kulkeva". */
export const KARJEN_LIIKE_MIN_AST = 2;
/** Rajauksen marginaali (osuus sivusta kummallakin laidalla). */
export const KARJEN_VARA = 0.14;
/** Näytteitä kärkipolulta jakson kellovälillä. */
const KARJEN_NAYTTEET = [0, 0.25, 0.5, 0.75, 1];

/**
 * Jakson kameran rajaus: kohde ja liikkuvien vanojen kärkipolut.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs).
 *
 * @param {object} asetukset
 * @param {{lat:number, lon:number}} asetukset.kohde jakson kohde
 * @param {Array<{pisteet: Array<[number, number, number]>}>} asetukset.vanat
 *   vanojen kärkilistat (ensimmäinen on selkäranka), [lat, lon, vuosia]
 * @param {number} asetukset.alku jakson kello alussa (vuosia sitten)
 * @param {number} asetukset.loppu jakson kello lopussa
 * @param {number} [asetukset.pitoMin] pienin kellolukema tähän asti (pito)
 * @returns {{ rajaus: object|null, karjet: Array<[number, number]> }}
 */
export function jaksonRajaus({
  kohde, vanat = [], alku, loppu, pitoMin = Infinity,
  selkaMaxAst = KARJEN_ETAISYYS_MAX_AST, haaraMaxAst = HAARAN_ETAISYYS_MAX_AST,
  liikeMinAst = KARJEN_LIIKE_MIN_AST,
}) {
  if (!Number.isFinite(kohde?.lat) || !Number.isFinite(kohde?.lon)) return { rajaus: null, karjet: [] };
  const pisteet = [[kohde.lat, kohde.lon]];
  const karjet = [];
  // Uutta piirtävä kelloväli: pito pitää jo piirretyn, joten alku ei
  // voi olla pitoMin:iä vanhempi; taaksepäin kulkeva jakso kutistuu
  // yhteen hetkeen (nykyinen rintama).
  const hi = Math.min(Number(alku), Number.isFinite(pitoMin) ? pitoMin : Infinity);
  const lo = Math.min(Number(loppu), hi);
  if (!Number.isFinite(hi) || !Number.isFinite(lo)) return { rajaus: vananRajaus(pisteet), karjet };
  const naytteet = hi === lo ? [hi] : KARJEN_NAYTTEET.map((f) => hi + (lo - hi) * f);
  vanat.forEach((vana, k) => {
    const p = vana?.pisteet;
    if (!p?.length) return;
    const eka = p[0][2];
    const vika = p[p.length - 1][2];
    // Vana on käynnissä välillä: alkanut ennen ikkunan loppua eikä
    // valmis ennen sen alkua.
    if (!(vika < hi && eka > lo)) return;
    const kohdat = naytteet.map((t) => karkiHetkella(p, t)).filter(Boolean);
    if (!kohdat.length) return;
    const liike = kulmaEro(kohdat[0].lat, kohdat[0].lng, kohdat[kohdat.length - 1].lat, kohdat[kohdat.length - 1].lng);
    if (hi !== lo && liike < liikeMinAst) return;
    const katto = k === 0 ? selkaMaxAst : haaraMaxAst;
    if (kohdat.some((c) => kulmaEro(kohde.lat, kohde.lon, c.lat, c.lng) > katto)) return;
    for (const c of kohdat) {
      pisteet.push([c.lat, c.lng]);
      karjet.push([c.lat, c.lng]);
    }
  });
  return { rajaus: vananRajaus(pisteet), karjet };
}

/**
 * Nimetyn alueen kameralaatikko laudan yksiköissä.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs). Palauttaa
 * MAAILMA-laatikon, kun aluetta ei tunneta tai se on koko pallo —
 * tuntematon nimi ei saa jättää kameraa paikoilleen ilman jälkeä.
 *
 * @param {string} tunnus kaanonin `alue`
 * @returns {{x:number,y:number,w:number,h:number}}
 */
export function alueenLaatikko(tunnus) {
  const alue = ESITYKSEN_ALUEET[tunnus];
  if (!alue) return { ...MAAILMA };
  const a = projisoiLaudalle(LAUTA, alue.lon[0], alue.lat[1]);
  const b = projisoiLaudalle(LAUTA, alue.lon[1], alue.lat[0]);
  if (!a || !b) return { ...MAAILMA };
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x, y, w: Math.abs(b.x - a.x), h: Math.abs(b.y - a.y),
  };
}

/**
 * Jakson kellotahti: mistä lukemasta mihin kello kulkee.
 *
 * PUHDAS FUNKTIO (tests). Viimeinen jakso jää lukemaansa — kello ei
 * juokse kaaren ohi.
 *
 * @param {Array<object>} kertomus kaanonin jaksot
 * @param {number} i jakson indeksi
 * @returns {{alku:number, loppu:number}} lukemat (vuosia sitten)
 */
export function jaksonTahti(kertomus, i) {
  const jakso = kertomus?.[i];
  const seuraava = kertomus?.[i + 1];
  const alku = Number(jakso?.vuosia);
  const perus = Number.isFinite(alku) ? alku : 0;
  /*
   * AIKAHYPPY KUULUU HYPPYJAKSOLLE, EI SITÄ EDELTÄVÄLLE. Ilman tätä
   * ehtoa Chilen jakso (14 500) kelaisi itse takaisin Keski-Aasiaan
   * (50 000) kertojan puhuessa pisimmästä kävelymatkasta — kelaus
   * alkaisi väärässä paikassa ja väärän tekstin alla. Hyppyjakso
   * lähtee siitä lukemasta, johon edellinen jäi (ks. kelauksenAlku).
   */
  if (seuraava?.vaihe === 'hyppy') return { alku: perus, loppu: perus };
  const loppu = Number(seuraava?.vuosia);
  return { alku: perus, loppu: Number.isFinite(loppu) ? loppu : perus };
}

/**
 * AIKASELAIMEN KELATTU LUKEMA nauhan jatkuvasta osuudesta (0…1).
 *
 * PUHDAS FUNKTIO (tests/aikaselain.test.mjs). Nauhan viivat ovat
 * jaksojärjestyksessä tasavälein (js/linssit/aikaselain.js), joten
 * osuus 0 on ensimmäinen jakso ja 1 viimeinen; viivojen VÄLISSÄ lukema
 * interpoloidaan GEOMETRISESTI, samalla kaavalla kuin kellon oma
 * asteikko (js/aikajana.js vuosiaSittenLukema) — muuten sormi hyppäisi
 * 300 000:sta 240 000:een lineaarisesti ja kello näyttäisi eri lukua
 * kuin sama kohta esityksen kuluessa. Nolla tai negatiivinen pää
 * (viimeinen jakso on 0) menee suoraan, koska logaritmi ei kestä sitä.
 *
 * @param {Array<{vuosia:number}>} kertomus kaanonin jaksot
 * @param {number} osuus 0…1
 * @returns {number} vuosia sitten
 */
export function kelauksenLukema(kertomus, osuus) {
  const n = kertomus?.length ?? 0;
  if (!n) return 0;
  const t = Math.max(0, Math.min(1, Number(osuus) || 0)) * (n - 1);
  const i = Math.min(n - 2, Math.floor(t));
  if (i < 0) return Number(kertomus[0]?.vuosia) || 0;
  const f = Math.max(0, Math.min(1, t - i));
  const a = Number(kertomus[i]?.vuosia);
  const b = Number(kertomus[i + 1]?.vuosia);
  if (!Number.isFinite(a)) return 0;
  if (!Number.isFinite(b)) return a;
  if (!(a > 0) || !(b > 0)) return a + (b - a) * f;
  return a * ((b / a) ** f);
}

/** Pehmennys kelaukselle: hidas lähtö, hidas pysähdys (ei ylitystä). */
export function kelauksenPehmennys(t) {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
}

/* ==================== AVAUKSEN LAUSEET JA SANAT ==================== */

/** Lauseen päättävät merkit (myös kolme pistettä yhtenä merkkinä). */
const PAATEMERKIT = new Set(['.', '!', '?', '…']);

/**
 * Kappaleen lauseet ja niiden merkkikohdat.
 *
 * PUHDAS FUNKTIO (tests/ihmisen-matka-esitys.test.mjs). Lause päättyy
 * vain, jos päätemerkin jälkeen tulee välilyönti tai teksti loppuu:
 * niin "…on löydetty" ei tuota tyhjää lausetta eikä "Marokon
 * kukkulalta…" katkea kesken. Välit normalisoidaan, jotta merkkiosuus
 * (ks. lauseidenHetket) on sama luku kuin luennassa.
 *
 * @param {string} teksti kaanonin `teksti`
 * @returns {Array<{teksti:string, alku:number}>} lauseet ja niiden
 *   alkukohta merkkeinä normalisoidusta tekstistä
 */
export function jaaLauseiksi(teksti) {
  const t = String(teksti ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return [];
  const ulos = [];
  let alku = 0;
  for (let i = 0; i < t.length; i += 1) {
    if (!PAATEMERKIT.has(t[i])) continue;
    let loppu = i;
    while (loppu + 1 < t.length && PAATEMERKIT.has(t[loppu + 1])) loppu += 1;
    if (loppu + 1 < t.length && t[loppu + 1] !== ' ') { i = loppu; continue; }
    let a = alku;
    while (t[a] === ' ') a += 1;
    const pala = t.slice(a, loppu + 1);
    if (pala) ulos.push({ teksti: pala, alku: a });
    alku = loppu + 1;
    i = loppu;
  }
  let a = alku;
  while (t[a] === ' ') a += 1;
  const hanta = t.slice(a);
  if (hanta) ulos.push({ teksti: hanta, alku: a });
  return ulos;
}

/**
 * Lauseiden alkuhetket jakson luennassa (ms jakson alusta).
 *
 * PUHDAS FUNKTIO (tests). ARVIO on merkkiosuus: lause alkaa siinä
 * kohdassa luentaa, jossa sitä edeltävät merkit on luettu — sama mitta
 * kuin kertomuksenVarakesto (js/linssipuhe.js), joten arvio ja jakson
 * kesto puhuvat samaa kieltä. AIKALEIMAT VOITTAVAT: jos jaksossa on
 * `aikaleimat.lauseet` ja se on yhtä pitkä kuin lauselista, se on
 * generaattorin mittaama totuus.
 *
 * @param {Array<{alku:number, teksti:string}>} lauseet jaaLauseiksi
 * @param {number} kesto jakson luennan kesto (ms)
 * @param {{lauseet?: Array<number>}} [aikaleimat] kaanonin aikaleimat
 * @returns {Array<number>} alkuhetket ms
 */
export function lauseidenHetket(lauseet, kesto, aikaleimat = null) {
  const n = lauseet?.length ?? 0;
  if (!n) return [];
  const leimat = aikaleimat?.lauseet;
  if (Array.isArray(leimat) && leimat.length === n && leimat.every((v) => Number.isFinite(v))) {
    return leimat.map((v) => Math.max(0, v));
  }
  const viimeinen = lauseet[n - 1];
  const merkkeja = Math.max(1, viimeinen.alku + viimeinen.teksti.length);
  const kaikki = Math.max(0, Number(kesto) || 0);
  return lauseet.map((l) => (kaikki * l.alku) / merkkeja);
}

/** Sana ilman välimerkkejä ja isoja kirjaimia (vertailua varten). */
function sananRunko(sana) {
  return String(sana ?? '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
}

/**
 * Sanan alkuhetki jakson luennassa (ms), tai null jos sanaa ei ole.
 *
 * PUHDAS FUNKTIO (tests). Sama arvio kuin lauseilla (merkkiosuus), ja
 * sama koukku: `aikaleimat.sanat` on ms-taulukko, jossa on yksi alkio
 * jokaista välilyönnillä erotettua sanaa kohden. Hakusana täsmää myös
 * alkuosana, joten taivutus ("Afrikasta", "Afrikkaan") ei riko
 * ajoitusta.
 *
 * @param {string} teksti kaanonin `teksti`
 * @param {string} hakusana sanan alkuosa (esim. AVAUKSEN_SANA)
 * @param {number} kesto jakson luennan kesto (ms)
 * @param {{sanat?: Array<number>}} [aikaleimat] kaanonin aikaleimat
 * @returns {number|null}
 */
export function sananHetki(teksti, hakusana, kesto, aikaleimat = null) {
  const t = String(teksti ?? '').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  const haku = sananRunko(hakusana);
  if (!haku) return null;
  const sanat = t.split(' ');
  let indeksi = -1;
  let merkkeja = 0;
  let alkuMerkki = 0;
  for (let i = 0; i < sanat.length; i += 1) {
    if (indeksi < 0 && sananRunko(sanat[i]).startsWith(haku)) {
      indeksi = i;
      alkuMerkki = merkkeja;
    }
    merkkeja += sanat[i].length + 1;
  }
  if (indeksi < 0) return null;
  const leimat = aikaleimat?.sanat;
  if (Array.isArray(leimat) && leimat.length === sanat.length && Number.isFinite(leimat[indeksi])) {
    return Math.max(0, leimat[indeksi]);
  }
  return (Math.max(0, Number(kesto) || 0) * alkuMerkki) / Math.max(1, t.length);
}

/**
 * Pallon halkaisija osuutena ruudun KORKEUDESTA annetulla korkeudella.
 *
 * PUHDAS FUNKTIO (tests): avauksen "ihan pieni piste" on mitta, ei
 * mielipide. Pallon kulmahalkaisija on 2·asin(1/(1+h)) ja ruudun
 * korkeus fov astetta (js/pallolauta/kamera.js PALLO_FOV = 50).
 *
 * @param {number} korkeus kameran korkeus pallonsäteinä
 * @param {number} [fov] pystysuunnan avauskulma asteina
 */
export function pallonOsuusRuudusta(korkeus, fov = 50) {
  const h = Number(korkeus);
  if (!(h > 0)) return 1;
  const halkaisija = 2 * Math.asin(Math.min(1, 1 / (1 + h))) * (180 / Math.PI);
  return halkaisija / fov;
}

/**
 * AVAUKSEN VAIHEET LUENNAN AIKALEIMOISTA (Raamattu IHMISEN MATKAN
 * ALKUANIMAATIO). PUHDAS FUNKTIO — kaikki avauksen ajoitus on tässä
 * yhdessä laskussa, ja kehyssilmukka vain vertaa äänikelloa näihin
 * lukuihin.
 *
 *   musta     kuinka kauan ruutu on TÄYSIN musta (ensimmäinen virke)
 *   feidi     mustan häivytys harsoksi, tähdet nousevat samassa tahdissa
 *   piste     hetki, jolloin pallo on näkyvissä pisteenä tähtien keskellä
 *   zoomAlku  zoomin lähtöhetki
 *   zoomKesto zoomin kesto — niin, että zoomi PÄÄTTYY 0,7 sekuntia
 *             (AFRIKAN_VIIVE_MS) sanan "Afrikasta" jälkeen
 *   afrikka   hetki, jolloin Afrikka täyttää ruudun: sanan "Afrikasta"
 *             hetki + AFRIKAN_VIIVE_MS (kuitenkin enintään jakson kesto)
 *
 * Kaikki ovat millisekunteja AVAUSJAKSON alusta. Aikaleimojen
 * puuttuessa luvut lasketaan merkkiosuuksista (lauseidenHetket,
 * sananHetki), joten mykistetty peli kulkee samaa koreografiaa.
 *
 * @param {object} a
 * @param {Array<number>} [a.lauseet] lauseiden alkuhetket (lauseidenHetket)
 * @param {number|null} [a.sana] sanan "Afrikasta" hetki (sananHetki)
 * @param {number} [a.kesto] avausjakson kesto (ms)
 * @returns {{musta:number, feidi:number, piste:number, zoomAlku:number,
 *   zoomKesto:number, afrikka:number}}
 */
export function avauksenVaiheet({ lauseet = [], sana = null, kesto = 0 } = {}) {
  const kaikki = Math.max(1, Number(kesto) || 0);
  const hetki = Number(sana);
  // Zoomi päättyy AFRIKAN_VIIVE_MS (0,7 s) sanan jälkeen, mutta ei jakson yli.
  const afrikka = Number.isFinite(hetki) && hetki > 0
    ? Math.min(hetki + AFRIKAN_VIIVE_MS, kaikki)
    : kaikki;
  const toinen = Number(lauseet?.[1]);
  // Musta kestää ensimmäisen virkkeen, mutta zoomille on jäätävä tilaa.
  const musta = Math.max(0, Math.min(
    Number.isFinite(toinen) && toinen > 0 ? toinen : afrikka * MUSTAN_OSUUS,
    afrikka - AVARUUDEN_MIN_MS,
  ));
  const tilaa = Math.max(0, afrikka - musta);
  const feidi = Math.max(0, Math.min(TAHTIEN_FEIDI_MS, tilaa * FEIDIN_OSUUS));
  const piste = musta + feidi;
  const zoomKesto = Math.max(AVARUUDEN_MIN_MS, Math.min(AVARUUDEN_MS, afrikka - piste));
  return {
    musta,
    feidi,
    piste,
    zoomAlku: Math.max(musta, afrikka - zoomKesto),
    zoomKesto,
    afrikka,
  };
}

/**
 * ENSIMMÄISEN KOHTEEN AJON KÄYRÄ (omistaja 9.9.2026: *"kamera saa alkaa
 * hitaasti liikkua kohti ensimmäistä kohdetta marokossa ja sen vauhti
 * voi kiihtyä loppua kohden kunnes hidastaa juuri ennen kuin saapuu
 * perille"*). PUHDAS FUNKTIO.
 *
 * Ero laudan omaan trapetsiin (js/siirtokoreografia.js
 * siirtoajonPehmennys) on juuri se, mitä omistaja pyysi: siellä vauhti
 * nousee heti täyteen ja pysyy siinä, tässä se kasvaa KOKO MATKAN
 * (kuutiollinen kiihtyvyys) `jarru`-kohtaan asti ja pysähtyy vasta
 * lopussa. Nopeus on jatkuva kohdassa `jarru` ja tasan nolla perillä,
 * joten kamera ei nytkähdä kummassakaan päässä.
 *
 * @param {number} t 0…1
 * @param {number} [jarru] osuus, jonka jälkeen jarrutetaan
 * @returns {number} kuljettu osuus 0…1
 */
export function marokonPehmennys(t, jarru = MAROKON_JARRU) {
  const x = Math.max(0, Math.min(1, Number(t) || 0));
  const j = Math.min(0.95, Math.max(0.05, Number(jarru) || MAROKON_JARRU));
  const d = 1 - j;
  // Skaalaus, jolla koko matka tulee kuljetuksi tasan kerran.
  const a = 1 / (j ** 3 + 1.5 * (j ** 2) * d);
  if (x <= j) return a * x ** 3;
  const u = (x - j) / d;
  return a * (j ** 3) + 3 * a * (j ** 2) * d * (u - (u * u) / 2);
}

/**
 * AIKA TÄSTÄ JAKSOSTA JAKSON `tunnus` ALKUUN (ms) VARAKESTOISTA.
 *
 * PUHDAS FUNKTIO ja varareitti: putkessa sama luku saadaan tarkasti
 * manifestin aikaleimoista (luenta.hetki + leimat), ja tätä käytetään
 * vain silloin kun ääntä ei ole. Palauttaa null, jos jakso ei ole
 * edessä päin.
 *
 * @param {Array<object>} kertomus kaanonin jaksot
 * @param {number} i menossa oleva jakso
 * @param {string} tunnus etsittävä jakso
 * @param {number} jaljella menossa olevasta jaksosta jäljellä (ms)
 * @returns {number|null}
 */
export function jaksojenValiMs(kertomus, i, tunnus, jaljella) {
  const kohde = (kertomus ?? []).findIndex((j) => j?.id === tunnus);
  if (kohde < 0 || kohde <= i) return null;
  let ms = Math.max(0, Number(jaljella) || 0);
  for (let k = i + 1; k < kohde; k += 1) ms += kertomuksenVarakesto(kertomus[k]);
  return ms;
}

/** Onko kuvien näyttö päällä (lippu tai osoiterivin koe). */
function kuvatKaytossa() {
  const haku = new URLSearchParams(globalThis.location?.search ?? '');
  const valinta = haku.get('esityskuvat');
  if (valinta === 'ei' || valinta === '0') return false;
  if (valinta === 'kylla' || valinta === '1') return true;
  return IHMISEN_MATKA_KUVAT_ESITYKSESSA;
}

function solmu(tag, luokka) {
  const el = document.createElement(tag);
  if (luokka) el.className = luokka;
  return el;
}

/**
 * Esityksen ohjaaja yhdelle ajolle.
 *
 * @param {object} asetukset
 * @param {object} asetukset.ajo js/aikajana.js:n Aikajana-olio
 * @returns {object} { aloita, taukoTaiJatka, tauko, jatka, pura, tila }
 */
export function luoEsitys({ ajo }) {
  const kertomus = ajo.kaari?.kertomus ?? [];
  const etuliite = ajo.kaari?.kertomusRunko;
  const reduced = Boolean(ajo.reducedMotion);
  const kuvat = kuvatKaytossa();
  /** Jakson tunnus → moottorin pysäkin indeksi (kuva ja lamppu). */
  const pysakit = new Map();
  ajo.tapahtumat.forEach((t, i) => { if (t?.tunnus) pysakit.set(t.tunnus, i); });
  /*
   * Kertojan soitin. Syntyy jo linssiä avattaessa, joten se ehtii hakea
   * kertomus-manifestin ämpäristä ennen kuin pelaaja painaa Käynnistä.
   */
  const luenta = luoKertomusluenta({ ajo, etuliite });
  /*
   * ENSIMMÄINEN KOHDE (Jebel Irhoud) haetaan kaanonista eikä kirjoiteta
   * tunnuksena: avauksen kamera-ajo kuuluu sille jaksolle, joka
   * ENSIMMÄISENÄ osoittaa kartalle — vaikka kaanonin alkuun tulisi
   * uusia jaksoja.
   */
  const ensimmainenKohde = kertomus.find((j) => j?.kohde) ?? null;

  const tila = {
    i: -1,
    /*
     * KULUNUT ON SEINÄKELLOA, EI KEHYSTEN SUMMAA. Luenta on
     * reaaliaikaista ääntä, joten jakson eteneminen on mitattava
     * samasta kellosta: kehyksiä summaava laskuri jäisi jälkeen aina
     * kun pallo piirtyy hitaasti (kontin ohjelmisto-WebGL piirtää noin
     * kehyksen sekunnissa), ja kertoja puhuisi jaksosta, jota kartta ei
     * vielä näytä. Tauko siirtää lähtöhetkeä eikä pysäytä laskuria.
     */
    alkuHetki: 0,
    kulunut: 0,
    /** Jakson koko kesto (putkessa = luenta, muuten + pulun vara). */
    kesto: 0,
    /** Kellon ja kameran matka-aika jaksossa (putkessa seuraavan alkuun). */
    luenta: 0,
    /** Hetki, jolla pulun välihuomio sanotaan (jakson oman puheen loppu). */
    puluHetki: 0,
    /** Kelauksen lähtölukema aikahypyssä (null = ei kelausta). */
    kelauksenAlku: null,
    puluSanottu: false,
    kaynnissa: false,
    tauolla: false,
    purettu: false,
    paattynyt: false,
    raf: 0,
    /** Edellisen kehyksen aikaleima (tähtien ajautuman dt). */
    viimeKehys: 0,
    aani: null,
    kuva: null,
    /** Mittarit savukkeelle. */
    jaksoja: 0,
    kuviaNaytetty: 0,
    pulujaSanottu: 0,
    koukkuKutsuttu: false,
    vuosia: Number(kertomus[0]?.vuosia) || 0,
    /** Pienin kellolukema tähän asti: pidon pohja (ks. PITO ja jaksonRajaus). */
    pitoMin: Infinity,
    /** Jakson kameraan otetut kärjet [lat, lng] (savukkeen mittari). */
    karjet: [],
    /** Jatkettiinko muistista (ei pimeää, ei avausta). */
    muistista: false,
    /*
     * PULUN SISÄÄNTULO (Raamattu PULU PIILOSSA KUNNES TEKSTI ON
     * ALHAALLA). `puluPiilossa` on tosi linssin avaamisesta siihen asti,
     * kun pulu kävelee sisään; `puluAjastin` on sisääntulon ajastin ja
     * `puluTullut` savukkeen mittari.
     */
    puluPiilossa: false,
    puluAjastin: 0,
    puluTullut: false,
    /*
     * AVARUUSAVAUS: musta pohja pallon alla, tähtitaivas ja zoomin
     * lähtöhetki. Muistista jatkettaessa nämä jäävät nulliksi — pelaaja
     * on jo ollut matkalla, eikä avaruutta näytetä uudestaan.
     */
    avaruus: null,
    tahdet: null,
    avaruusAlku: 0,
    /*
     * AVAUKSEN AJOITUS (Raamattu AVAUS MUSTASTA TAHTIIN JA AFRIKKAAN
     * SANAN KOHDALLA). `avausOdottaa` on tosi siitä hetkestä, kun ruutu
     * mustenee, siihen asti kun kertoja sanoo "Afrikasta" ja zoomi
     * lähtee; `avaruusTauko` on zoomissa kulunut aika tauon ajaksi
     * jäädytettynä (kamera-ajo pysäytetään erikseen, se ei ole tämän
     * silmukan käsissä); `tahtiEsiin` on tähtien feidaus mustasta
     * (0…1, ei koskaan laske).
     */
    avausOdottaa: false,
    avaruusTauko: null,
    tahtiEsiin: 0,
    /** Zoomin kesto tälle ajolle (avauksenVaiheet, ei enää vakio). */
    avaruusKesto: AVARUUDEN_MS,
    /** Onko peite yhä TÄYSIN musta (ensimmäinen virke). */
    mustaPaalla: false,
    /** Onko avauksen oma ajo ensimmäiseen kohteeseen käynnissä. */
    kohdeajo: false,
    /** Sen ajon kesto (savukkeen mittari). */
    kohdeajonKesto: null,
    /**
     * MISTÄ KOHTAA LUENTAA ZOOMI LÄHTI (savukkeen mittari). Kontissa
     * kehystahti on noin kehys sekunnissa, eikä mittaava savuke ehdi
     * näytteillään sen 1,8 sekunnin väliin, joka jää sanasta jakson
     * loppuun — hetki on siksi kirjattava talteen silloin kun se
     * tapahtuu. { jakso, kulunut, hetki } tai null.
     */
    zoomLahti: null,
    /** Valot odottavat zoomin perilletuloa (ks. sytytaValot). */
    valotOdottaa: false,
    /** Avausjaksot ohi: teksti on alalaidassa eikä keskellä (yksisuuntainen). */
    avausOhi: false,
    /** Avausjakson lauseet (jaaLauseiksi) ja ruudulla oleva lause. */
    lauseet: [],
    lauseIndeksi: -1,
    tekstiNyt: '',
    tekstiNakyy: false,
    /** Tekstin viive jakson alussa, kun rivi laskeutuu keskeltä alas. */
    tekstiViive: 0,
    /** OrbitControlsin oma etäisyyskatto ennen avausta (palautetaan). */
    kattoEnnen: null,
    kattoAjastin: 0,
    /*
     * AIKASELAIMEN VETO KESKEN (js/linssit/aikaselain.js). Null, kun
     * sormi ei ole nauhalla; vedon ajaksi tähän jää tieto siitä, oliko
     * pelaaja itse tauolla — irrotus jatkaa esitystä vain, jos ei ollut
     * (Raamattu LINSSIEN AIKASELAIN ALAREUNAAN).
     */
    selaus: null,
    /** Mittari savukkeelle: montako kertaa nauhasta on valittu jakso. */
    selauksia: 0,
  };

  /* ---------------------------------------------------------- pinnat */

  const peite = solmu('div', 'aikajana-esitys-peite');
  peite.setAttribute('aria-hidden', 'true');
  const tekstirivi = solmu('div', 'aikajana-kertomusteksti');
  tekstirivi.setAttribute('role', 'status');
  tekstirivi.setAttribute('aria-live', 'polite');
  const tekstilaatikko = solmu('p', 'aikajana-kertomusteksti-sisus');
  tekstirivi.appendChild(tekstilaatikko);

  /**
   * AVARUUDEN MUSTA POHJA. Pallon oma piirtoalusta on läpinäkyvä
   * (js/pallo.js rakennaPallo backgroundColor 'rgba(0,0,0,0)'), joten
   * pallon ympärillä näkyy karttaruudun nahka. Avausta varten
   * karttaruutuun pannaan ENSIMMÄISEKSI LAPSEKSI musta levy: se on
   * DOM-järjestyksessä pallon kuoren alla, joten tähdet ja pallo
   * piirtyvät sen päälle. Linssin oma juuri (z-index 7) ei kelpaa
   * tähän — siellä levy peittäisi pallon.
   */
  const asennaAvaruus = () => {
    const koti = ajo.ui?.mapPane;
    if (!koti || tila.avaruus) return null;
    const levy = solmu('div', 'aikajana-avaruus');
    levy.setAttribute('aria-hidden', 'true');
    koti.prepend(levy);
    tila.avaruus = levy;
    return levy;
  };

  /** Avaruus pois: musta häipyy ja pistepilvi poistetaan näyttämöltä. */
  const suljeAvaruus = () => {
    const levy = tila.avaruus;
    tila.avaruus = null;
    if (levy) {
      levy.classList.add('pois');
      if (reduced) levy.remove();
      else setTimeout(() => levy.remove(), VALOJEN_MS);
    }
    const taivas = tila.tahdet;
    tila.tahdet = null;
    if (taivas) {
      // Pistepilvi häipyy ruudulta ja poistetaan näyttämöltä vasta sen
      // jälkeen: kolme piirtokutsua ei saa jäädä roikkumaan koko ajoksi.
      taivas.paivita(0, 0);
      setTimeout(() => taivas.pura(), reduced ? 0 : VALOJEN_MS);
    }
  };

  const asennaPinnat = ({ pimea = true } = {}) => {
    const juuri = ajo.juuri;
    if (!juuri) return;
    // Peite ensimmäiseksi lapseksi: kaikki muu on sen päällä DOM-
    // järjestyksessä, ja luokka `esitys-pimea` piilottaa ne erikseen.
    // Muistista jatkettaessa peitettä ei panna lainkaan: läpinäkyvänäkin
    // se ottaisi napautukset (pointer-events: auto) kartan edestä.
    if (pimea) juuri.prepend(peite);
    juuri.appendChild(tekstirivi);
    juuri.classList.add('esitys-kaynnissa');
  };

  /* ---------------------------------------------------------- kamera */

  const kamera = () => (ajo.pallolla ? ajo.kamera() : null);

  const ajaAlueeseen = (tunnus, kesto) => {
    const k = kamera();
    if (!k?.ajaKamera) return Promise.resolve(false);
    const bbox = alueenLaatikko(tunnus);
    return k.ajaKamera({ bbox, marginaali: 0.04 }, { kesto: reduced ? 0 : kesto });
  };

  const kuvasuhde = () => {
    const kotelo = ajo.lauta?.kotelo ?? ajo.ui?.mapPane ?? null;
    const w = kotelo?.clientWidth ?? 0;
    const h = kotelo?.clientHeight ?? 0;
    return w > 0 && h > 0 ? w / h : 1;
  };

  /**
   * Kamera kohteeseen NIIN, ETTÄ KULKEVA VANA PYSYY KUVASSA (Raamattu
   * ETELA-AFRIKASSA KAMERA ULOS, VANA EI SAA HUKKUA): rajaus on kohde +
   * jakson aikana liikkuvien vanojen kärkipolut (jaksonRajaus), eikä
   * koskaan lähikuvaa tiukempi. Ilman vanoja (tasokartta, laskenta
   * kesken) rajaus on pelkkä kohde eli entinen lähikuva.
   */
  const ajaKohteeseen = (tunnus, kesto, { alku = null, loppu = null, pehmennys = null } = {}) => {
    const k = kamera();
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    if (!k?.ajaKamera || !t || !Number.isFinite(t.lat) || !Number.isFinite(t.lon)) {
      return Promise.resolve(false);
    }
    const vanat = ajo.virrat?.vanat?.()?.pisteet?.() ?? [];
    const { rajaus, karjet } = jaksonRajaus({
      kohde: t,
      vanat,
      alku: Number.isFinite(alku) ? alku : tila.vuosia,
      loppu: Number.isFinite(loppu) ? loppu : tila.vuosia,
      pitoMin: tila.pitoMin,
    });
    tila.karjet = karjet;
    const leveys = Math.max(ESITYKSEN_LAHIKUVA, rajauksenLeveys(rajaus, kuvasuhde(), KARJEN_VARA) ?? 0);
    return k.ajaKamera(
      {
        lat: rajaus?.lat ?? t.lat, lng: rajaus?.lon ?? t.lon, leveys,
      },
      pehmennys
        ? { kesto: reduced ? 0 : kesto, pehmennys }
        : { kesto: reduced ? 0 : kesto },
    );
  };

  /* -------------------------------------------------------- avaruus */

  /** Nimetyn alueen keskipiste asteina (avausnäkymän katsesuunta). */
  const alueenKeskus = (tunnus) => {
    const a = ESITYKSEN_ALUEET[tunnus];
    if (!a) return { lat: 0, lng: 0 };
    return { lat: (a.lat[0] + a.lat[1]) / 2, lng: (a.lon[0] + a.lon[1]) / 2 };
  };

  /**
   * PALLO TULEE PIMEYDESTÄ (Raamattu MUSTA ALKU ON AVARUUS, PALLO
   * ZOOMAUTUU PIMEYDESTA AFRIKKA EDELLA).
   *
   * Kamera asetetaan ensin KAUAS (AVARUUDEN_KORKEUS, laudan oman katon
   * takana): Maa on piste, Afrikka jo keskellä. Ruutu on siihen asti
   * täysin musta, ja tähdet nousevat esiin vasta mustan laskiessa
   * harsoksi ensimmäisen virkkeen jälkeen. Zoomi (kaynnistaAvaruusajo)
   * ajetaan SAMALLA laudan kamerarajapinnalla niin, että se PÄÄTTYY
   * sanaan "Afrikasta" — uutta kameramoottoria ei tehdä. Tähdet
   * ovat pallon näyttämöllä (js/pallolauta/tahdet.js) ja häipyvät pallon
   * kasvaessa (kehys → paivita).
   *
   * `prefers-reduced-motion`: suora leikkaus valmiiseen rajaukseen,
   * tähdet paikallaan ilman ajautumista.
   */
  /**
   * Ohjaimen etäisyyskatto hetkeksi auki, jotta pallo mahtuu kauas.
   * Palautetaan aina (palautaKaukaisuus): ilman sitä pelaaja voisi
   * nipistää itsensä avaruuteen kesken kertomuksen.
   */
  const avaaKaukaisuus = (keski) => {
    const pallo = ajo.ui?.pallonInstanssi ?? null;
    const ohjaimet = pallo?.controls?.();
    if (!pallo?.pointOfView || !ohjaimet) return false;
    const sade = pallo.getGlobeRadius?.() ?? 100;
    tila.kattoEnnen = ohjaimet.maxDistance;
    ohjaimet.maxDistance = sade * (1 + AVARUUDEN_KORKEUS);
    pallo.pointOfView({ ...keski, altitude: AVARUUDEN_KORKEUS }, 0);
    return true;
  };

  const palautaKaukaisuus = () => {
    const ohjaimet = ajo.ui?.pallonInstanssi?.controls?.();
    if (ohjaimet && tila.kattoEnnen != null) ohjaimet.maxDistance = tila.kattoEnnen;
    tila.kattoEnnen = null;
  };

  /**
   * MUSTA RUUTU JA TÄHDET (avauksen vaiheet 1–2). Pallo viedään kauas,
   * taivas rakennetaan pimeänä ja peite on läpinäkymätön: ruudulla ei
   * ole palloa eikä tähtiä. Musta laskee harsoksi omalla css-liu'ullaan
   * ja pistepilvi nousee kehyssilmukassa (tahtienEsiinTulo).
   */
  const avaruusavaus = () => {
    const k = kamera();
    tila.tahdet = ajo.ui?.pallonInstanssi
      ? luoTahtitaivas(ajo.ui.pallonInstanssi, { reducedMotion: reduced, kerroin: TAHTIEN_KERROIN })
      : null;
    tila.tahdet?.paivita(0, 0);
    peite.classList.add('avaruus', 'musta');
    tila.avausOdottaa = true;
    tila.mustaPaalla = true;
    if (!k?.ajaKamera) return false;
    if (reduced) {
      // Ei liikettä: pallo on heti Afrikassa, tähdet näkyvissä.
      nostaMusta(0);
      kaynnistaAvaruusajo();
      return true;
    }
    avaaKaukaisuus(alueenKeskus('afrikka'));
    return true;
  };

  /**
   * MUSTA POIS ENSIMMÄISEN VIRKKEEN JÄLKEEN (Raamattu ALKUANIMAATIO:
   * *"ensimmäinen virke saisi tulla täysin mustalle näytölle. sitten
   * musta feidautuisi pois näkyvistä ja maapallo tulisi näkyviin"*).
   * Häivytyksen kesto annetaan css:lle muuttujana, koska se lasketaan
   * luennasta eikä ole vakio.
   */
  function nostaMusta(feidi) {
    if (!tila.mustaPaalla) return false;
    tila.mustaPaalla = false;
    peite.style.setProperty('--avauksen-feidi', `${Math.max(0, Math.round(feidi))}ms`);
    peite.classList.remove('musta');
    return true;
  }

  /**
   * ZOOMI PÄÄTTYY 0,7 SEKUNTIA SANAN "AFRIKASTA" JÄLKEEN (Raamattu
   * ALKUANIMAATIO + AFRIKKA 0,7 S SANAN JALKEEN, omistaja 10.9.2026
   * klo 23.00). Kutsutaan kehyssilmukasta hetkellä
   * `zoomAlku` = päätepiste − zoomin kesto — tai viimeistään
   * 'valot'-jakson alkaessa, jos luenta ehti loppua ennen sitä.
   *
   * @param {number} [kesto] zoomin kesto (avauksenVaiheet.zoomKesto)
   */
  function kaynnistaAvaruusajo(kesto = null) {
    if (!tila.avausOdottaa) return false;
    tila.avausOdottaa = false;
    tila.avaruusKesto = Math.max(
      AVARUUDEN_MIN_MS,
      Math.min(AVARUUDEN_MS, Number(kesto) || AVARUUDEN_MS),
    );
    tila.zoomLahti = {
      jakso: kertomus[tila.i]?.id ?? null,
      kulunut: Math.round(tila.kulunut),
      hetki: Math.round(avauksenHetki()),
      luenta: Math.round(tila.luenta),
      kesto: Math.round(tila.avaruusKesto),
    };
    const k = kamera();
    if (!k?.ajaKamera) return false;
    nostaMusta(0);
    if (reduced) {
      ajaAlueeseen('afrikka', 0);
      tila.tahdet?.paivita(0, 1);
      return true;
    }
    tila.avaruusAlku = performance.now();
    peite.style.setProperty('--avauksen-zoomi', `${Math.round(tila.avaruusKesto)}ms`);
    /*
     * KATTO PALAUTETAAN AJASTIMELLA EIKÄ AJON LUPAUKSELLA: 'afrikka'-
     * jakso ajaa saman rajauksen uudestaan jäljellä olevalla ajalla
     * (aloitaJakso), jolloin ensimmäisen ajon lupaus jää ratkeamatta.
     * Ajastin on siksi ainoa varma polku takaisin — ja purku hoitaa
     * saman, jos linssi suljetaan kesken avauksen. TAUKO PYSÄYTTÄÄ
     * AJASTIMEN (pysaytaAvaruusajo) ja jatko virittää sen uudestaan:
     * seinäkelloa käyvä ajastin palautti muuten katon kesken zoomin, ja
     * OrbitControls loikkasi pallon takaisin lukemaan 2,5.
     */
    clearTimeout(tila.kattoAjastin);
    tila.kattoAjastin = setTimeout(palautaKaukaisuus, tila.avaruusKesto + 400);
    // Harso pois zoomin tahdissa: pallo kirkastuu tullessaan lähemmäs.
    peite.classList.add('kirkastuu');
    ajaAlueeseen('afrikka', tila.avaruusKesto);
    return true;
  }

  /** Sanan "Afrikasta" hetki avausjakson luennassa (ms jakson alusta). */
  const avauksenHetki = () => {
    const jakso = kertomus[0];
    const hetki = sananHetki(jakso?.teksti, AVAUKSEN_SANA, Math.max(1, tila.luenta), jakso?.aikaleimat);
    return Number.isFinite(hetki) ? hetki : 0;
  };

  /**
   * AVAUKSEN VAIHEET NYKYISELLÄ KESTOLLA. Lasketaan kehyksittäin, koska
   * kesto ja aikaleimat tarkentuvat kesken avausjakson (manifesti tai
   * äänitteen metatiedot) — silloin loputkin hetket siirtyvät oikeaan
   * kohtaan ilman erillistä kytkentää.
   */
  const avauksenAjat = () => avauksenVaiheet({
    lauseet: lauseHetket(),
    sana: avauksenHetki(),
    kesto: Math.max(1, tila.luenta),
  });

  /**
   * Zoomissa kulunut aika (ms). TAUKO JÄÄDYTTÄÄ SEN: kamera-ajo elää
   * laudan omassa silmukassa (js/pallolauta/kamera.js), joten sekä ajo
   * että tämä kello on pysäytettävä erikseen — muuten jatko luulisi
   * zoomin menneen tauon aikana perille.
   */
  const avaruudenKulunut = () => {
    if (!tila.avaruusAlku) return 0;
    if (tila.avaruusTauko !== null) return tila.avaruusTauko;
    return performance.now() - tila.avaruusAlku;
  };

  /** Avausajosta jäljellä (ms); 0 kun pallo on perillä tai ajoa ei ollut. */
  const avaruuttaJaljella = () => {
    if (!tila.avaruusAlku) return 0;
    return Math.max(0, tila.avaruusKesto - avaruudenKulunut());
  };

  /** Avausajon eteneminen 0…1 (tähtien häivytys seuraa tätä). */
  const avaruudenOsuus = () => {
    if (!tila.avaruusAlku) return 0;
    return Math.max(0, Math.min(1, avaruudenKulunut() / Math.max(1, tila.avaruusKesto)));
  };

  /**
   * TÄHTIEN FEIDAUS MUSTASTA (omistaja 8.9.2026: *"siihen feidautuisi
   * ensin tähtiä"*; 9.9.2026: vasta ensimmäisen virkkeen JÄLKEEN).
   * Nousu mitataan avausjakson kuluneesta ajasta, joten tauko pysäyttää
   * sen samoin kuin lauseet; luku ei koskaan laske, jottei taivas
   * välkähtäisi jakson vaihtuessa.
   *
   * @param {{musta:number, feidi:number}} [ajat] avauksenVaiheet
   */
  const tahtienEsiinTulo = (ajat = null) => {
    const nousu = tila.i === 0 && !reduced && ajat
      ? Math.max(0, Math.min(1, (tila.kulunut - ajat.musta) / Math.max(1, ajat.feidi)))
      : 1;
    tila.tahtiEsiin = Math.max(tila.tahtiEsiin, nousu);
    return tila.tahtiEsiin;
  };

  /* ------------------------------------------------------------ kuva */

  const suljeKuva = () => {
    const vanha = tila.kuva;
    tila.kuva = null;
    if (!vanha) return;
    vanha.classList.remove('esilla');
    if (reduced) vanha.remove();
    else setTimeout(() => vanha.remove(), KUVAN_POISTUMA_MS);
  };

  /**
   * Löytökuva kohteen viereen pallon pinnalle. Kehys ripustetaan
   * LAMPUN elementtiin (js/aikajana.js rakennaValotPallolle), joten se
   * seuraa pistettä kameran liikkuessa eikä sitä tarvitse asemoida.
   */
  const naytaKuva = (tunnus) => {
    suljeKuva();
    if (!kuvat) return;
    const i = pysakit.get(tunnus);
    const t = ajo.tapahtumat[i];
    const g = ajo.valot?.[i]?.g ?? null;
    const osoite = t?.ilmio?.osoite ?? t?.kuva?.osoite ?? null;
    if (!g || !osoite) return;
    const kehys = solmu('div', 'aikajana-kertomuskuva');
    kehys.style.setProperty('--kertomuskuva-leveys', `${Math.round(KUVAN_OSUUS * 100)}vw`);
    /*
     * KUVA ON NAPAUTETTAVA (omistaja 7.9.2026: *"myöskään ei niistä
     * valokuvista tapahdu mitään"*). Kehys on lampun CSS2D-elementin
     * lapsi, ja koko merkkikerros on pointer-events: none — napautus
     * meni pallon pintaan, ja siellä lähin merkki (44 px) oli harvoin
     * tämä lamppu, koska kuva on 1,4 rem sivussa ja 22 % ruudun
     * levyinen. Kehys ottaa siksi napautuksen ITSE (css pointer-events:
     * auto) ja avaa saman kortin kuin lamppu ja hehku.
     */
    kehys.setAttribute('role', 'button');
    kehys.setAttribute('aria-label', `${t.otsikko ?? ''}: avaa nosto`);
    kehys.addEventListener('click', (e) => {
      e.stopPropagation();
      ajo.ui?.nostokortti?.avaa?.(tunnus);
    });
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.src = osoite;
    kehys.appendChild(img);
    g.appendChild(kehys);
    tila.kuva = kehys;
    tila.kuviaNaytetty += 1;
    if (reduced) kehys.classList.add('esilla');
    else requestAnimationFrame(() => kehys.classList.add('esilla'));
  };

  /* ----------------------------------------------------------- lamppu */

  /**
   * Kohteen lamppu palamaan ja jäämään. Löytöpaikat eivät ole
   * pysäkkejä, joten yksikään ei ole "nykyinen" — ne jäävät hiljaisiksi
   * hehkuiksi kartalle tutkimusvaihetta varten.
   */
  const sytytaKohde = (tunnus) => {
    const valo = ajo.valot?.[pysakit.get(tunnus)] ?? null;
    if (valo) ajo.asetaValonTila(valo, true, false);
  };

  /* ------------------------------------------------------------ kello */

  const kirjoitaKello = (vuosia) => {
    const arvo = Math.max(0, vuosia);
    tila.vuosia = arvo;
    tila.pitoMin = Math.min(tila.pitoMin, arvo);
    const paikka = ajo.asteikko.paikka?.(arvo) ?? arvo;
    ajo.tila = { ...ajo.tila, vuosi: paikka };
    ajo.naytaVuosi(paikka, reduced);
  };

  /**
   * KELLO JA VANAT KELATTUUN HETKEEN (aikaselaimen veto). Ero
   * `kirjoitaKello`-funktioon on kaksi:
   *
   *   1. PITOA EI KASVATETA (`tila.pitoMin`): kelaus taaksepäin on
   *      pelaajan oma ele, ja pidon pohja asetetaan vasta valinnassa.
   *   2. VANAT PÄIVITETÄÄN SUORAAN. Esityksen aikana virtojen oma
   *      silmukka lukisi kellon 80 ms:n välein, mutta TUTKIMUSVAIHEESSA
   *      se ei lue sitä lainkaan (js/aikajana-virrat.js silmukka: lukema
   *      on siellä vakio 0) — ilman suoraa kutsua nauha ei kelaisi
   *      levinneisyyttä lopussa mihinkään. Sama kutsu antaa esityksen
   *      aikana vasteen heti sormen liikkeeseen.
   */
  const kelaaKello = (vuosia) => {
    const arvo = Math.max(0, Number(vuosia) || 0);
    tila.vuosia = arvo;
    const paikka = ajo.asteikko.paikka?.(arvo) ?? arvo;
    ajo.tila = { ...ajo.tila, vuosi: paikka };
    ajo.naytaVuosi(paikka, reduced);
    ajo.virrat?.vanat?.()?.paivita?.(arvo, { pito: false });
  };

  /* ------------------------------------------------------- kertojan teksti */

  /**
   * ONKO JAKSO AVAUSTA (Raamattu AVAUS MUSTASTA TAHTIIN JA AFRIKKAAN
   * SANAN KOHDALLA: *"Jokainen lause voisi tulla tämän kappaleen loppuun
   * asti yksitellen keskelle ruutua. Vasta kun siirrytään ensimmäiseen
   * kohteeseen tekstit hyppäävät alas nykyiselle paikalleen."*).
   *
   * Avausjaksot ovat kaanonin kaksi ensimmäistä ('pimea' ja 'valot'),
   * ja `avausOhi` on YKSISUUNTAINEN: kun ensimmäinen kohde on kerran
   * alkanut, teksti pysyy alalaidassa, vaikka pelaaja kelaisi
   * aikaselaimella takaisin avaukseen. Muistista jatkettaessa avaus on
   * ohi jo lähtökohtaisesti.
   */
  const onAvausjakso = (jakso) => !tila.avausOhi
    && (jakso?.vaihe === 'pimea' || jakso?.vaihe === 'valot');

  /** Ruudun teksti ja sen näkyvyys (vaihto vain kun jokin muuttuu). */
  const asetaTeksti = (teksti, nakyy) => {
    if (teksti !== tila.tekstiNyt) {
      tekstilaatikko.textContent = teksti;
      tila.tekstiNyt = teksti;
    }
    if (nakyy !== tila.tekstiNakyy) {
      tila.tekstiNakyy = nakyy;
      tekstilaatikko.classList.toggle('nakyy', nakyy);
    }
  };

  /** Avausjakson lauseiden alkuhetket nykyisellä luennan kestolla. */
  const lauseHetket = () => lauseidenHetket(
    tila.lauseet, Math.max(1, tila.luenta), kertomus[tila.i]?.aikaleimat,
  );

  /**
   * LAUSE KERRALLAAN KESKELLE (avaus) TAI KOKO KAPPALE ALHAALLE.
   *
   * Ajetaan joka kehyksellä, koska ajoitus on `tila.kulunut` — sama
   * seinäkello kuin kellolla ja kameralla. Siitä seuraa kolme asiaa
   * ilmaiseksi: tauko pysäyttää lauseet, jatko jatkaa niistä, ja jakson
   * keston tarkentuminen äänitteestä (aloitaLuenta) siirtää loputkin
   * lauseet oikeaan kohtaan kesken jakson.
   */
  const paivitaTeksti = () => {
    const jakso = kertomus[tila.i];
    if (!jakso) return;
    if (tila.lauseet.length) {
      const ajat = lauseHetket();
      let i = 0;
      while (i + 1 < ajat.length && tila.kulunut >= ajat[i + 1]) i += 1;
      tila.lauseIndeksi = i;
      const seuraava = ajat[i + 1];
      // Lause häipyy hetkeä ennen seuraavan alkua: vaihto tapahtuu
      // pimeässä eikä tekstiä vaihdeta lukijan silmien alla.
      const haipyy = Number.isFinite(seuraava) && tila.kulunut >= seuraava - LAUSEEN_HAIVE_MS;
      asetaTeksti(tila.lauseet[i]?.teksti ?? '', tila.kulunut >= ajat[i] && !haipyy);
      return;
    }
    // Rivi laskeutuu keskeltä alas: vanha lause on jo häipynyt, ja uusi
    // teksti tulee näkyviin vasta kun rivi on melkein perillä.
    if (tila.kulunut < tila.tekstiViive) { asetaTeksti(tila.tekstiNyt, false); return; }
    asetaTeksti(jakso.teksti ?? '', Boolean(jakso.teksti));
  };

  /* ------------------------------------------------------------ luenta */

  /*
   * LUENTA ON OMASSA MODUULISSAAN (js/linssit/ihmisen-matka-luenta.js).
   * Se tietää, onko ämpärissä yksi yhtenäinen luenta (kertomus-
   * manifesti.json `yhtena: true`, jakso soitetaan sen väliltä) vai
   * jakso kerrallaan omina tiedostoinaan, ja se antaa jakson lauseiden
   * ja sanojen aikaleimat kenttään `jakso.aikaleimat`. Ohjaaja saa
   * siltä vain kaksi asiaa: soittimen kahvan ja jakson keston.
   */
  const aloitaLuenta = (jakso, { alkukohta = 0, hyppy = false } = {}) => {
    tila.aani = luenta.aloita(jakso, {
      alkukohta,
      /*
       * PELAAJAN HYPPY (aikaselain, muisti) aloittaa kertojan jakson
       * alusta myös putkessa; luonnollinen jaksonvaihto ei koske
       * soittimeen lainkaan.
       */
      hyppy,
      onAani: (aani) => { tila.aani = aani; },
      // Vanha äänite (edellinen jakso) ei saa muuttaa nykyistä.
      ajankohtainen: () => !tila.purettu && kertomus[tila.i] === jakso,
      voiSoida: () => !tila.purettu && !tila.tauolla,
      /*
       * KAKSI LUKUA. `ms` on jakson mitta ESITYKSELLE (putkessa
       * seuraavan jakson alkuun, muuten äänitteen kesto) ja `puhe`
       * tämän jakson viimeiseen ääneen — pulu puhuu siihen kohtaan.
       */
      onKesto: (ms, { puhe = ms } = {}) => {
        if (!Number.isFinite(ms) || ms <= 0) return;
        tila.luenta = Math.round(ms);
        tila.puluHetki = Math.max(0, Math.round(Math.min(Number(puhe) || ms, ms)));
        tila.kesto = tila.luenta + jaksonHanta(jakso);
      },
      /*
       * JAKSON RAJA SOITTIMESTA (putki). Kertojaa ei pysäytetä: kun
       * ääni ohittaa seuraavan jakson aikaleiman, kartta seuraa perässä
       * samalla kierroksella. Kehyssilmukan oma ehto (kulunut ≥ kesto)
       * jää varareitiksi mykistetylle pelille.
       */
      onRaja: () => {
        if (tila.purettu || kertomus[tila.i] !== jakso) return;
        seuraavaJakso();
      },
    });
  };

  /* ------------------------------------------------------------- pulu */

  /**
   * PULU PIILOON KOKO LINSSIN AVAUKSEN AJAKSI (Raamattu PULU PIILOSSA
   * KUNNES TEKSTI ON ALHAALLA JA KAVELEE SITTEN OIKEALTA SISAAN,
   * omistaja 10.9.2026 klo 23.00).
   *
   * Piilotus tehdään heti ohjaajan syntyessä eli LINSSIÄ AVATTAESSA,
   * ei vasta Käynnistä-napista: näin pulu ei näy hetkeäkään
   * aloituskortin ja mustan ruudun välissä. Luokka on bodyssa, koska
   * kasvokangas (.livia-kasvot-pinta) ei ole linssin juuressa vaan
   * bodyn lapsi.
   */
  const piilotaPulu = () => {
    if (tila.puluPiilossa) return false;
    tila.puluPiilossa = true;
    document.body?.classList.add(PULUN_PIILO_LUOKKA);
    return true;
  };

  /**
   * PULU NÄKYVIIN. `ele: true` kävelyttää sen ruudun oikeasta reunasta
   * paikalleen (PULUN_SISAANTULOELE) livia-eleiden JULKISEN rajapinnan
   * kautta; jos rajapintaa ei ole (vanha selain, testi, pulua ei ole
   * vielä löydetty) tai liike on rajoitettu, pulu vain tulee näkyviin.
   * Linssin sulkeminen ja muistista jatkaminen käyttävät `ele: false`
   * -muotoa: silloin pulu palaa ruudulle sellaisenaan.
   */
  const naytaPulu = ({ ele = false } = {}) => {
    clearTimeout(tila.puluAjastin);
    tila.puluAjastin = 0;
    if (!tila.puluPiilossa) return false;
    tila.puluPiilossa = false;
    document.body?.classList.remove(PULUN_PIILO_LUOKKA);
    if (!ele) return true;
    tila.puluTullut = true;
    // Julkinen rajapinta (js/livia-eleet.js): toista(id) — ei kosketa
    // animaatiomoduulien sisuksiin.
    try { globalThis.matkakirjaPollo?.kasvoEleet?.toista?.(PULUN_SISAANTULOELE); } catch { /* ele ei kuulu esitykseen */ }
    return true;
  };

  /**
   * SISÄÄNTULON AJASTUS: tekstin lasku ensin, sitten PULUN_SISAANTULO_MS.
   * Kutsutaan siitä jaksosta, jonka alkaessa kertojan rivi laskeutuu
   * ruudun keskeltä alalaitaan (aloitaJakso) — `lasku` on sen liu'un
   * kesto, jotta odotus alkaa vasta tekstin ollessa perillä.
   */
  const ajastaPulunSisaantulo = (lasku = 0) => {
    if (!tila.puluPiilossa || tila.puluAjastin) return false;
    if (reduced) { naytaPulu({ ele: false }); return true; }
    tila.puluAjastin = setTimeout(() => {
      tila.puluAjastin = 0;
      naytaPulu({ ele: true });
    }, Math.max(0, lasku) + PULUN_SISAANTULO_MS);
    return true;
  };

  /**
   * PULU PUHUU KERTOJAN PÄÄLLE HILJEMPAA (Raamattu KERTOJA LUKEE KOKO
   * KERTOMUKSEN PUTKEEN, PULU PUHUU HILJEMPAA KERTOJAN PAALLE).
   * Välihuomio ei väistä eikä varaa puhevuoroa (`vaista: false`, sama
   * reitti kuin fokusvirran huudahduksella), joten kertoja jatkaa
   * entisellä voimallaan sen alla. Putkessa taso on
   * PULUN_VAIMENNUS_PUTKESSA; jakso kerrallaan -tilassa välihuomio soi
   * omassa raossaan entisellä tasollaan.
   */
  const sanoPulu = (jakso) => {
    tila.puluSanottu = true;
    if (!jakso.pulu) return;
    /*
     * EI KUPLAA ENNEN SISÄÄNTULOA (omistaja 10.9.2026 klo 23.00): kupla
     * osoittaa pulun napin viereen, ja piilossa olevan pulun vierestä se
     * leijuisi tyhjässä. VALINTA: kupla JÄÄ POIS eikä siirry — kaanonin
     * ensimmäinen välihuomio ('ranta') tulee vasta kuudennessa jaksossa,
     * kauan sisääntulon jälkeen, joten siirretty kupla vain putkahtaisi
     * väärän jakson päälle.
     */
    if (tila.puluPiilossa) return;
    const vaimennus = luenta.yhtena() ? PULUN_VAIMENNUS_PUTKESSA : LIVIAN_VALIHUOMION_VAIMENNUS;
    const nakyi = polloLinssikupla([jakso.pulu], {
      luokka: 'aikajana-kertomus-pulu',
      aani: () => soitaLivianLinssiAani(ajo.ui, ajo.linssi?.tunnus ?? 'ihmisen-matka', jakso.id, {
        teksti: jakso.pulu, vaimennus, vaista: false,
      }),
    });
    if (nakyi) tila.pulujaSanottu += 1;
  };

  /* ------------------------------------------------------------- jakso */

  /**
   * JAKSON HÄNTÄ. Putkessa nolla: luentaa ei katkota, joten jaksojen
   * väliin ei jää pulun varaa (Raamattu KERTOJA LUKEE KOKO KERTOMUKSEN
   * PUTKEEN: *"Jaksojen välissä ei ole taukoa eikä pulun varaa"*).
   * Jakso kerrallaan -tilassa häntä on entinen PULUN_VARA_MS.
   */
  const jaksonHanta = (jakso) => (
    !luenta.yhtena() && jakso?.pulu ? PULUN_VARA_MS : 0
  );

  /** Seuraava jakso — tai kaaren loppu. */
  function seuraavaJakso() {
    if (tila.i + 1 < kertomus.length) aloitaJakso(tila.i + 1);
    else paata();
  }

  function aloitaJakso(i, { kulunut = 0, hyppy = false } = {}) {
    const jakso = kertomus[i];
    if (!jakso) { paata(); return; }
    /*
     * AVAUS EI SAA JÄÄDÄ ROIKKUMAAN. Jos luenta loppui ennen kuin
     * kertoja ehti sanaan "Afrikasta" (lyhyt äänite) tai ennen kuin
     * zoomi ehti perille, avaus kuitataan tässä: zoomi lähtee
     * viimeistään 'valot'-jaksosta ja valot syttyvät viimeistään sitä
     * seuraavan jakson alkaessa.
     */
    if (jakso.vaihe === 'valot') kaynnistaAvaruusajo();
    else if (jakso.vaihe !== 'pimea') {
      kaynnistaAvaruusajo();
      if (tila.valotOdottaa) sytytaValot();
      tila.avausOhi = true;
    }
    tila.i = i;
    // Jakson oma lähtöhetki: kulunut mitataan seinäkellosta (ks. tila).
    // Muistista jatkettaessa jakso alkaa keskeltä (kulunut > 0).
    tila.alkuHetki = performance.now() - kulunut;
    tila.kulunut = kulunut;
    tila.puluSanottu = false;
    tila.jaksoja += 1;
    tila.luenta = kertomuksenVarakesto(jakso);
    tila.puluHetki = tila.luenta;
    tila.kesto = tila.luenta + jaksonHanta(jakso);
    tila.kelauksenAlku = null;

    /*
     * TEKSTI KESKELLE VAI ALAS. Avausjaksot ladotaan lause kerrallaan
     * ruudun keskelle; ensimmäisen kohteen alkaessa rivi laskeutuu
     * pehmeästi alalaitaan (TEKSTIN_LASKU_MS) ja uusi kappale tulee
     * näkyviin vasta laskun loppupuolella — ei räpsähdystä.
     */
    tila.lauseet = onAvausjakso(jakso) ? jaaLauseiksi(jakso.teksti) : [];
    const keskella = tila.lauseet.length > 0;
    tila.tekstiViive = !keskella && tekstirivi.classList.contains('keskella') && !reduced
      ? Math.round(TEKSTIN_LASKU_MS * 0.55)
      : 0;
    tekstirivi.classList.toggle('keskella', keskella);
    tekstirivi.classList.toggle('esilla', Boolean(jakso.teksti));
    paivitaTeksti();
    /*
     * PULU KÄVELEE SISÄÄN VASTA KUN TEKSTI ON ALHAALLA (Raamattu PULU
     * PIILOSSA KUNNES TEKSTI ON ALHAALLA JA KAVELEE SITTEN OIKEALTA
     * SISAAN): odotus alkaa siitä hetkestä, kun rivin lasku on ohi.
     * Jos teksti ei laskeudu (jakso alkoi jo alhaalta, esim. aikaselaimen
     * hyppy), odotus alkaa heti.
     */
    if (!keskella) ajastaPulunSisaantulo(tila.tekstiViive ? TEKSTIN_LASKU_MS : 0);

    if (jakso.vaihe === 'valot') tila.valotOdottaa = true;
    // Kelaus lähtee nykyisestä lukemasta; keskeltä jatkettaessa
    // (muisti) kelaus on jo tehty ja kello jatkaa jakson lukemasta.
    if (jakso.vaihe === 'hyppy') tila.kelauksenAlku = kulunut >= KELAUKSEN_MS ? null : tila.vuosia;

    const tahti = jaksonTahti(kertomus, i);
    // Kello jakson alkuun heti (kelaus lähtee omasta lukemastaan).
    if (jakso.vaihe !== 'hyppy' || tila.kelauksenAlku === null) kirjoitaKello(tahti.alku);

    aloitaLuenta(jakso, { alkukohta: kulunut, hyppy });
    if (jakso.tunne) ilmoitaLivianTunne(jakso.tunne, {
      lahde: 'ihmisen-matka', tunnus: jakso.id,
    });

    /*
     * KAMERAN KESTO LASKETAAN VARAKESTOSTA eikä äänitteestä: ajo on
     * lähdettävä samalla hetkellä kuin luenta, ja äänitteen metatiedot
     * saapuvat vasta hetkeä myöhemmin.
     *
     * AJO VOI JÄÄDÄ KESKEN, JA SE ON SALLITTUA. Varakesto on tekstin
     * mitta (14 merkkiä/s) ja äänite usein lyhyempi: lopun jaksolla
     * arvio oli 10,4 s ja ajo 8,9 s, mutta äänitteen mukaan jakso
     * kesti 5,6 s. Keskellä kaarta se ei haittaa — seuraava ajo lähtee
     * siitä, mihin kamera ehti (js/pallolauta/kamera.js aloittaa aina
     * nykyisestä näkymästä), ja liike pysyy jatkuvana. VIIMEISELLÄ
     * jaksolla haittasi: loppunäkymä jäi puolitiehen (mitattu
     * savukkeella 7.9.2026: 2 698 lautayksikköä odotetun 3 546
     * sijaan), ja siksi `paata` asemoi lopun erikseen.
     */
    const kesto = Math.max(
      KAMERAN_POHJA_MS,
      Math.min(KAMERAN_KATTO_MS, Math.round(tila.luenta * KAMERAN_OSUUS)),
    );
    /*
     * HILJAISET NOSTOT (kaanonin `hiljaiset`): löytöpaikka, jolla ei ole
     * omaa jaksoa, syttyy kartalle jakson alkaessa — mutta kamera ei aja
     * sinne eikä kuvaa nosteta. Blombos on tällainen: kertoja mainitsee
     * etelän okran ja helmet Arabian jaksossa (omistaja 8.9.2026,
     * "Etelä-Afrikka vain kerran").
     */
    for (const hiljainen of jakso.hiljaiset ?? []) sytytaKohde(hiljainen);
    if (jakso.kohde) {
      sytytaKohde(jakso.kohde);
      naytaKuva(jakso.kohde);
      /*
       * ENSIMMÄISEEN KOHTEESEEN ON JO AJETTU (Raamattu ALKUANIMAATIO):
       * avauksen oma ajo lähti Afrikka-sanan kohdalla ja on juuri nyt
       * perillä. Uusi ajo samaan paikkaan vain nytkäyttäisi kuvaa.
       */
      if (tila.kohdeajo) tila.kohdeajo = false;
      else ajaKohteeseen(jakso.kohde, kesto, { alku: tahti.alku, loppu: tahti.loppu });
    } else {
      tila.karjet = [];
      suljeKuva();
      /*
       * VALOT EI SAA KATKAISTA AVAUSAJOA. Ennen 'afrikka'-jakso asetti
       * kameran kestolla 0 — kamera oli jo perillä, joten se oli tyhjä
       * käsky. Avaruusavauksen jälkeen pallo voi olla yhä matkalla
       * (kertoja ehtii lopettaa avausjakson ennen kuin zoomi on
       * perillä), ja silloin ajo jatkuu jäljellä olevan ajan.
       */
      const alueenKesto = jakso.vaihe === 'valot' ? avaruuttaJaljella() : kesto;
      /*
       * MAROKON AJO ON JO MATKALLA (Raamattu ALKUANIMAATIO): kamera on
       * lähtenyt ensimmäistä kohdetta kohti heti Afrikka-sanasta, eikä
       * 'afrikka'-jakson aluerajaus saa nykäistä sitä takaisin koko
       * maanosaan kesken ajon.
       */
      if (jakso.alue && !tila.kohdeajo) ajaAlueeseen(jakso.alue, alueenKesto);
    }
    // Aikaselaimen valittu viiva seuraa esitystä (Raamattu LINSSIEN
    // AIKASELAIN ALAREUNAAN: "vuosiluku … voisi toistua pienellä sen
    // korkeamman viivan päällä").
    ajo.aikaselain?.aseta?.(jakso.id);
    // Muisti seuraa jaksoa: sulku tai virkistys jatkaa tästä jaksosta.
    ajo.tallennaMuisti?.();
  }

  /**
   * VALOT SYTTYVÄT (Raamattu ALKAA MUSTASTA RUUDUSTA). Musta häipyy,
   * käyttöliittymä palaa, musiikki nousee sisään ja vanojen pito
   * kytkeytyy päälle koko lopun esityksen ajaksi.
   *
   * VASTA KUN PALLO ON PERILLÄ (8.9.2026). Ennen valot syttyivät
   * 'afrikka'-jakson alkaessa, koska zoomi oli silloin jo ohi. Nyt
   * zoomi päättyy vasta 0,7 sekuntia sanan "Afrikasta" jälkeen ja
   * jatkuu 'afrikka'-jakson
   * puolelle, joten valot odottavat sen perille tuloa (kehys →
   * valotOdottaa): käyttöliittymä ja musiikki tulevat sillä hetkellä,
   * kun Afrikka täyttää ruudun.
   */
  function sytytaValot() {
    tila.valotOdottaa = false;
    // Pallo on perillä: kamera saa heti lähteä kohti Marokkoa.
    aloitaKohdeajo();
    ajo.juuri?.classList.remove('esitys-pimea', 'esitys-avaruus');
    peite.classList.add('pois');
    if (reduced) peite.remove();
    else setTimeout(() => peite.remove(), VALOJEN_MS);
    // Avaruus väistyy: musta pohja häipyy ja tähdet poistuvat näyttämöltä.
    suljeAvaruus();
    // Zoomi on perillä: ohjaimen etäisyyskatto takaisin normaaliin.
    clearTimeout(tila.kattoAjastin);
    palautaKaukaisuus();
    ajo.virrat?.asetaPito?.(true);
    ajo.aloitaMusiikki?.(true);
  }

  /**
   * AIKA ENSIMMÄISEN KOHTEEN JAKSON ALKUUN (ms). Putkessa luku on
   * TARKKA: manifestin aikaleima miinus soittimen kohta. Ilman ääntä se
   * lasketaan varakestoista (jaksojenValiMs), jolloin mykistetty peli
   * ajaa saman koreografian omalla mitallaan.
   */
  const kohteeseenAsti = () => {
    const rivi = ensimmainenKohde ? luenta.leimat(ensimmainenKohde.id) : null;
    const nyt = luenta.hetki();
    if (rivi && nyt !== null) return rivi.alku - nyt;
    return jaksojenValiMs(kertomus, tila.i, ensimmainenKohde?.id, tila.luenta - tila.kulunut);
  };

  /**
   * KAMERA LÄHTEE MAROKKOON (Raamattu ALKUANIMAATIO: *"tämän jälkeen
   * kamera saa alkaa hitaasti liikkua kohti ensimmäistä kohdetta
   * marokossa ja sen vauhti voi kiihtyä loppua kohden kunnes hidastaa
   * juuri ennen kuin saapuu perille kun marokon teksti alkaa"*).
   *
   * Ajo alkaa sillä hetkellä, kun Afrikka täyttää ruudun (reilun
   * sekunnin sanan "Afrikasta" jälkeen, ks. sytytaValot) eikä siis
   * mene zoomin kanssa päällekkäin; se kestää tasan siihen asti,
   * kun ensimmäisen kohteen jakso alkaa. Käyrä on marokonPehmennys eikä
   * laudan oma trapetsi: hidas lähtö, kiihtyvä keskiosa, jarrutus juuri
   * ennen perille tuloa.
   *
   * `prefers-reduced-motion`: ei ajoa lainkaan — jaksot leikkaavat
   * paikalleen kuten ennenkin.
   */
  function aloitaKohdeajo() {
    if (reduced || tila.kohdeajo || tila.avausOhi || tila.paattynyt) return false;
    const kohde = ensimmainenKohde?.kohde;
    if (!kohde) return false;
    const kesto = kohteeseenAsti();
    if (!Number.isFinite(kesto) || kesto < MAROKON_POHJA_MS) return false;
    const tahti = jaksonTahti(kertomus, kertomus.indexOf(ensimmainenKohde));
    tila.kohdeajo = true;
    tila.kohdeajonKesto = Math.round(kesto);
    ajaKohteeseen(kohde, kesto, {
      alku: tahti.alku, loppu: tahti.loppu, pehmennys: marokonPehmennys,
    });
    return true;
  }

  /* ------------------------------------------------------------ silmukka */

  const paivitaKello = () => {
    const jakso = kertomus[tila.i];
    if (!jakso) return;
    const { alku, loppu } = jaksonTahti(kertomus, tila.i);
    if (jakso.vaihe === 'hyppy' && tila.kelauksenAlku !== null) {
      const kelaus = Math.min(1, tila.kulunut / KELAUKSEN_MS);
      if (kelaus < 1) {
        const f = kelauksenPehmennys(kelaus);
        kirjoitaKello(tila.kelauksenAlku + (alku - tila.kelauksenAlku) * f);
        return;
      }
      const jaljella = Math.max(1, tila.luenta - KELAUKSEN_MS);
      const osuus = Math.min(1, (tila.kulunut - KELAUKSEN_MS) / jaljella);
      kirjoitaKello(alku + (loppu - alku) * osuus);
      return;
    }
    const osuus = Math.min(1, tila.kulunut / Math.max(1, tila.luenta));
    kirjoitaKello(alku + (loppu - alku) * osuus);
  };

  const kehys = (nyt) => {
    if (!tila.kaynnissa || tila.purettu) return;
    tila.raf = requestAnimationFrame(kehys);
    /*
     * ÄÄNIKELLO ENSIN, SEINÄKELLO VARALLA (Raamattu KERTOJA LUKEE KOKO
     * KERTOMUKSEN PUTKEEN). Putkessa jakson kulunut aika luetaan
     * soittimen `currentTime`:stä, jolloin kello, kamera, kuvat ja
     * lauseiden rytmi seuraavat kertojaa eivätkä kehystahtia. Ilman
     * ääntä (mykistys, kertojatila 'ei', puuttuva tiedosto, jakso
     * kerrallaan -tila) mitta on entinen seinäkello; lähtöhetki
     * pidetään ajan tasalla, jotta pudotus varareitille ei hyppäisi.
     */
    const aanikello = luenta.kulunut();
    if (aanikello === null) tila.kulunut = nyt - tila.alkuHetki;
    else {
      tila.kulunut = aanikello;
      tila.alkuHetki = nyt - aanikello;
    }
    /*
     * AVAUKSEN KOREOGRAFIA (Raamattu ALKUANIMAATIO): ensimmäinen virke
     * mustalla, sitten piste tähtien keskellä, ja zoomi, joka PÄÄTTYY
     * sanaan "Afrikasta". Kaikki hetket tulevat luennan aikaleimoista
     * (avauksenVaiheet) — ei sekuntikellosta.
     */
    const ajat = tila.i === 0 && !tila.avausOhi ? avauksenAjat() : null;
    if (ajat) {
      if (tila.mustaPaalla && tila.kulunut >= ajat.musta) nostaMusta(ajat.feidi);
      /*
       * ZOOMIN KESTO LASKETAAN LÄHTÖHETKELLÄ, EI ETUKÄTEEN: kehysväli
       * voi olla pitkä (kontin ohjelmisto-WebGL piirtää noin kehyksen
       * sekunnissa), ja etukäteen laskettu kesto myöhästyttäisi perille
       * tuloa saman verran. Näin Afrikka täyttää ruudun sanan kohdalla,
       * vaikka lähtö tulisi kehyksen myöhässä.
       */
      if (tila.avausOdottaa && tila.kulunut >= ajat.zoomAlku) {
        kaynnistaAvaruusajo(ajat.afrikka - tila.kulunut);
      }
    }
    /*
     * TÄHDET FEIDAUTUVAT ESIIN JA HÄIPYVÄT PALLON KASVAESSA (Raamattu
     * MUSTA ALKU ON AVARUUS + AVAUS MUSTASTA TAHTIIN). Pistepilvi ei
     * laske mitään uudestaan: tässä muuttuu vain materiaalien
     * peittävyys ja pölykerroksen kierto.
     */
    if (tila.tahdet) {
      const dt = Math.min(0.5, Math.max(0, (nyt - (tila.viimeKehys || nyt)) / 1000));
      const osuus = avaruudenOsuus();
      const haipyy = 1 - Math.max(0, (osuus - TAHTIEN_HAIVE) / (1 - TAHTIEN_HAIVE));
      tila.tahdet.paivita(dt, Math.min(tahtienEsiinTulo(ajat), haipyy));
    }
    // Valot syttyvät sillä hetkellä, kun pallo on perillä ruudun täydeltä.
    if (tila.valotOdottaa && avaruuttaJaljella() <= 0) sytytaValot();
    tila.viimeKehys = nyt;
    paivitaTeksti();
    paivitaKello();
    if (!tila.puluSanottu && tila.kulunut >= tila.puluHetki) sanoPulu(kertomus[tila.i]);
    // Putkessa jakson vaihtaa soittimen rajavahti (onRaja); tämä on
    // varareitti sille ajolle, jossa ääntä ei ole lainkaan.
    if (tila.kulunut >= tila.kesto) seuraavaJakso();
  };

  /**
   * ZOOMI PYSÄHTYY JA JATKAA TAUON MUKANA (omistajan vaatimus 8.9.2026:
   * tauko keskellä avausta pysäyttää lauseet JA zoomin). Kamera-ajo
   * elää laudan omassa silmukassa, joten se pysäytetään erikseen ja
   * käynnistetään jatkossa uudestaan jäljellä olevalla ajalla — ajo
   * lähtee aina siitä näkymästä, jossa kamera nyt on.
   */
  const pysaytaAvaruusajo = () => {
    if (!tila.avaruusAlku || tila.avaruusTauko !== null) return;
    if (avaruuttaJaljella() <= 0) return;
    tila.avaruusTauko = avaruudenKulunut();
    kamera()?.pysaytaKameraAjo?.();
    /*
     * KATON PALAUTUS ODOTTAA TAUON YLI. Ajastin käy seinäkelloa, ja
     * pitkällä tauolla se ehti palauttaa ohjaimen etäisyyskaton kesken
     * zoomin: OrbitControls rajaa kameran heti maxDistanceen, ja pallo
     * loikkasi korkeudelta 47 lukemaan 2,5 (mitattu savukkeella
     * 8.9.2026, kun kuvakaappaus piti esityksen tauolla sekunteja).
     * Ajastin viritetään uudestaan jatkossa (jatkaAvaruusajo).
     */
    clearTimeout(tila.kattoAjastin);
  };

  const jatkaAvaruusajo = () => {
    if (tila.avaruusTauko === null) return;
    const kulunut = tila.avaruusTauko;
    tila.avaruusTauko = null;
    // Aikaselain vei jo eteenpäin: kamera on toisen jakson käsissä,
    // eikä keskeytynyttä avausajoa saa herättää sen päälle.
    if (tila.avausOhi) {
      tila.avaruusAlku = performance.now() - tila.avaruusKesto;
      palautaKaukaisuus();
      return;
    }
    tila.avaruusAlku = performance.now() - kulunut;
    clearTimeout(tila.kattoAjastin);
    tila.kattoAjastin = setTimeout(palautaKaukaisuus, avaruuttaJaljella() + 400);
    ajaAlueeseen('afrikka', avaruuttaJaljella());
  };

  const kaynnista = () => {
    if (tila.kaynnissa || tila.purettu) return;
    tila.kaynnissa = true;
    tila.tauolla = false;
    ajo.kaynnissa = true;
    ajo.juuri?.classList.remove('tauolla');
    if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Tauko';
    ajo.saadaMusiikki?.(true);
    // Jatko samasta kohdasta: lähtöhetki siirtyy kuluneen verran taakse.
    tila.alkuHetki = performance.now() - tila.kulunut;
    jatkaAvaruusajo();
    tila.raf = requestAnimationFrame(kehys);
  };

  const seis = () => {
    tila.kaynnissa = false;
    ajo.kaynnissa = false;
    pysaytaAvaruusajo();
    cancelAnimationFrame(tila.raf);
    tila.raf = 0;
  };

  /* ------------------------------------------------------------ loppu */

  function paata({ kamera = true } = {}) {
    if (tila.paattynyt) return;
    tila.paattynyt = true;
    // Avaus ei saa jäädä auki, vaikka kaari päättyisi kesken sen.
    if (tila.valotOdottaa) sytytaValot();
    tila.avausOhi = true;
    seis();
    /*
     * LOPPUNÄKYMÄ ON VARMISTETTU, EI TOIVOTTU. Viimeisen jakson
     * kamera-ajo on voinut jäädä kesken (jakso lyheni äänitteen
     * mukaan, kehysväli venyi, ele keskeytti), ja silloin esitys
     * päättyisi puolittaiseen zoomiin. Sama rajaus ajetaan siksi
     * uudestaan lyhyellä liu'ulla: jos kamera on jo perillä, laudan
     * oma ajo huomaa sen eikä liikuta mitään (js/pallolauta/kamera.js
     * "ajo, joka ei liikuta mitään, on turha").
     */
    const viimeinen = kertomus[tila.i];
    // Nauhan valinta jää loppuun; tutkimusvaiheessa siitä jatketaan.
    if (viimeinen?.id) ajo.aikaselain?.aseta?.(viimeinen.id);
    if (kamera && viimeinen?.alue) ajaAlueeseen(viimeinen.alue, reduced ? 0 : LOPUN_ASETUS_MS);
    suljeKuva();
    tekstirivi.classList.remove('esilla');
    // Esinerivi ja ohjaimet takaisin pelaajalle ennen koukkua: kartta
    // on nyt hänen.
    ajo.juuri?.classList.remove('esitys-kaynnissa');
    if (ajo.taukoNappi) {
      ajo.taukoNappi.textContent = 'Loppu';
      ajo.taukoNappi.disabled = true;
    }
    tila.koukkuKutsuttu = true;
    // Koukku viimeisenä: tutkimusvaihe on toisen moduulin työtä, ja se
    // saa ottaa ruudun haltuunsa vasta kun esitys on siivonnut jälkensä.
    ajo.ui?.aloitaTutkimusvaihe?.();
  }

  /* ---------------------------------------------------------- aikaselain */

  /**
   * NAUHAN VETO (esikatselu). Esitys menee HILJAA tauolle — kertoja
   * vaikenee, silmukka pysähtyy — ja kello sekä vanat seuraavat sormea.
   * Nappien tekstiin ei kosketa: veto ei ole Tauko-napin painallus, ja
   * irrotus joko jatkaa esitystä tai jättää sen tauolle sen mukaan,
   * kummassa tilassa pelaaja oli (Raamattu LINSSIEN AIKASELAIN
   * ALAREUNAAN: *"irrotus jatkaa esitystä siitä"*).
   *
   * Pito katkaistaan vedon ajaksi: pito on yksisuuntainen maksimi
   * (luku 12.5), eikä taaksepäin kelattu kartta saa jäädä näyttämään
   * Amerikkoja Afrikan jakson kohdalla.
   *
   * @param {number} osuus nauhan jatkuva sijainti 0…1
   */
  function esikatsele(osuus) {
    if (tila.purettu) return false;
    if (!tila.selaus) {
      tila.selaus = { oliTauolla: !tila.kaynnissa };
      if (tila.kaynnissa) seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.virrat?.asetaPito?.(false);
    }
    kelaaKello(kelauksenLukema(kertomus, osuus));
    return true;
  }

  /**
   * NAUHAN VALINTA (sormi irtosi tai napautus). Esitys jatkaa valitusta
   * jaksosta SEN ALUSTA — luenta alkaa, kamera ajaa ja kello lähtee
   * jakson lukemasta. Tutkimusvaiheessa (esityksen jälkeen) sama
   * valinta on pelkkä kelaus: kello ja vanat siirtyvät hetkeen, kertoja
   * on vaiti.
   */
  function valitse(id) {
    if (tila.purettu) return false;
    const i = kertomus.findIndex((j) => j.id === id);
    if (i < 0) return false;
    const selaus = tila.selaus;
    tila.selaus = null;
    tila.selauksia += 1;
    const vuosia = Number(kertomus[i]?.vuosia) || 0;
    // Pidon pohja alkaa valitusta hetkestä (ks. esikatsele).
    tila.pitoMin = vuosia;
    ajo.virrat?.asetaPito?.(true);
    ajo.aikaselain?.aseta?.(kertomus[i].id);
    if (tila.paattynyt) {
      tila.i = i;
      kelaaKello(vuosia);
      ajo.virrat?.vanat?.()?.paivita?.(vuosia, { pito: true });
      ajo.tallennaMuisti?.();
      return true;
    }
    suljeKuva();
    aloitaJakso(i, { hyppy: true });
    if (selaus?.oliTauolla) {
      // Pelaaja oli itse tauolla: jakso vaihtuu, mutta esitys ei lähde.
      seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.saadaMusiikki?.(false);
      if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Jatka';
      ajo.juuri?.classList.add('tauolla');
    } else kaynnista();
    return true;
  }

  /* ------------------------------------------------------------- muisti */

  /**
   * JATKO MUISTISTA (Raamattu LINSSI MUISTAA PAIKKANSA). Ei pimeää eikä
   * avausta: valot ovat päällä, musiikki nousee, pito kytketään ja sen
   * POHJA piirretään ensin (vanat siihen asti, mihin kello oli
   * pisimmillään ehtinyt — muuten Amerikat olisivat tyhjät, jos jatko
   * on Euroopan haarassa). Kamera on moottorin muistista jo paikallaan.
   * Tutkimusvaihe jatkuu suoraan koukkuun ilman kamera-ajoa.
   */
  function jatkaMuistista(muisti) {
    tila.muistista = true;
    // Ei avausta eikä sisääntuloa: pelaaja on ollut jo matkalla, ja pulu
    // palaa ruudulle sellaisenaan.
    naytaPulu({ ele: false });
    // Ei mustaa, ei tähtiä, ei keskitettyjä lauseita: avaus on ohi.
    tila.avausOhi = true;
    tila.tahtiEsiin = 1;
    asennaPinnat({ pimea: false });
    ajo.virrat?.asetaPito?.(true);
    ajo.aloitaMusiikki?.(true);
    if (Number.isFinite(muisti.pitoMin)) {
      tila.pitoMin = muisti.pitoMin;
      ajo.virrat?.vanat?.()?.paivita?.(muisti.pitoMin, { pito: true });
    }
    if (muisti.vaihe === 'tutkimus') {
      tila.i = kertomus.length - 1;
      tila.jaksoja = kertomus.length;
      kirjoitaKello(0);
      paata({ kamera: false });
      return true;
    }
    const i = kertomus.findIndex((j) => j.id === muisti.jakso);
    if (i < 0) return false;
    // Jakson kesto tarkentuu äänitteestä; kulunut ei saa ylittää varakestoa.
    const kulunut = Math.max(0, Math.min(Number(muisti.kulunut) || 0, kertomuksenVarakesto(kertomus[i]) - 200));
    aloitaJakso(i, { kulunut, hyppy: true });
    kaynnista();
    return true;
  }

  /* ------------------------------------------------------------ julkinen */

  /*
   * PULU PIILOON HETI LINSSIÄ AVATTAESSA (ks. piilotaPulu): ohjaaja
   * syntyy silloin, kun linssi kytketään päälle, joten pulu ei ehdi
   * vilahtaa aloituskortin päällä eikä mustan ruudun alkuun.
   */
  piilotaPulu();

  return {
    /**
     * Käynnistä-napista: musta ruutu, avausluenta, ei vielä musiikkia.
     * `muisti` (js/linssit/ihmisen-matka-muisti.js) jatkaa suoraan
     * siitä, mihin pelaaja jäi — ilman pimeää, ilman avausta.
     */
    aloita({ muisti = null } = {}) {
      if (tila.purettu || tila.i >= 0) return false;
      if (muisti) return jatkaMuistista(muisti);
      asennaPinnat();
      ajo.juuri?.classList.add('esitys-pimea', 'esitys-avaruus');
      /*
       * PEITE ON ENSIN MUSTA JA SITTEN HARSO (Raamattu MUSTA ALKU ON
       * AVARUUS + AVAUS MUSTASTA TAHTIIN, omistaja 8.9.2026: *"kokonaan
       * musta ruutu ja sitten siihen feidautuisi ensin tähtiä"*).
       * Aloitus on läpinäkymätön #000 koko ruudun päällä; sitten se
       * laskee harsoksi (AVARUUDEN_HARSO), jolloin pallon ALLA oleva
       * musta levy (asennaAvaruus) ja tähdet tulevat näkyviin. Peite jää
       * paikalleen loppuun asti myös siksi, ettei pallo pyörähtäisi
       * sormesta kesken avauksen.
       */
      asennaAvaruus();
      avaruusavaus();
      kirjoitaKello(Number(kertomus[0]?.vuosia) || 0);
      // KERTOJA ALKAA JO PIMEYDESTÄ (omistaja 7.9.2026): avausjakson
      // luenta lähtee heti, ja pallo kasvaa esiin sanan "Afrikasta"
      // kohdalla (kehys → kaynnistaAvaruusajo).
      aloitaJakso(0);
      kaynnista();
      return true;
    },
    /**
     * AIKASELAIN (js/linssit/aikaselain.js) kutsuu näitä kahta: veto
     * esikatselee hetken, irrotus valitsee jakson. Moottori välittää
     * kutsut sellaisenaan (js/aikajana.js rakennaAikaselain).
     */
    esikatsele,
    valitse,
    /** Yläpalkin yksi nappi. */
    taukoTaiJatka() {
      if (tila.paattynyt) return;
      if (tila.kaynnissa) this.tauko(); else this.jatka();
    },
    /** Tauko: luenta ja kello pysähtyvät samasta kohdasta. */
    tauko() {
      if (!tila.kaynnissa) return;
      seis();
      tila.tauolla = true;
      try { tila.aani?.pause(); } catch { /* soitin oli jo purettu */ }
      ajo.saadaMusiikki?.(false);
      if (ajo.taukoNappi) ajo.taukoNappi.textContent = 'Jatka';
      ajo.juuri?.classList.add('tauolla');
    },
    /** Jatko samasta kohdasta: luenta jatkuu, kello lähtee siitä mihin jäi. */
    jatka() {
      if (tila.kaynnissa || tila.paattynyt || tila.purettu) return;
      if (tila.tauolla && tila.aani && !tila.aani.ended) {
        tila.aani.play().catch(() => { /* puuttuva ääni on hiljainen */ });
      }
      kaynnista();
    },
    pura() {
      if (tila.purettu) return;
      tila.purettu = true;
      seis();
      luenta.pura();
      suljeKuva();
      // Avaruus pois heti: musta levy ja pistepilvi eivät saa jäädä
      // roikkumaan, jos linssi suljetaan kesken avauksen.
      tila.avaruus?.remove();
      tila.avaruus = null;
      tila.tahdet?.pura();
      tila.tahdet = null;
      clearTimeout(tila.kattoAjastin);
      // Linssin sulkeminen palauttaa pulun normaalisti näkyviin — ilman
      // kävelyelettä, joka kuuluu vain esityksen sisääntuloon.
      naytaPulu({ ele: false });
      palautaKaukaisuus();
      peite.remove();
      tekstirivi.remove();
      ajo.juuri?.classList.remove('esitys-pimea', 'esitys-avaruus', 'esitys-kaynnissa');
    },
    /** Mittarit savukkeelle ja testeille. */
    tila: () => ({
      jakso: kertomus[tila.i]?.id ?? null,
      vaihe: kertomus[tila.i]?.vaihe ?? null,
      indeksi: tila.i,
      jaksoja: tila.jaksoja,
      vuosia: Math.round(tila.vuosia),
      kaynnissa: tila.kaynnissa,
      tauolla: tila.tauolla,
      paattynyt: tila.paattynyt,
      pimea: Boolean(ajo.juuri?.classList.contains('esitys-pimea')),
      kuvia: tila.kuviaNaytetty,
      /*
       * ESILLÄ, EI VAIN LIITETTY. Kehys syntyy nollakoossa
       * (scale 0,6) ja saa `esilla`-luokan vasta seuraavassa
       * kehyksessä; ilman tätä eroa mittaaja voi osua siihen yhteen
       * kehykseen, jossa kuva on jo DOMissa mutta vielä kutistettuna
       * (savuke mittasi 110 px odotetun 183 px:n sijaan).
       */
      kuvaEsilla: Boolean(tila.kuva?.isConnected && tila.kuva.classList.contains('esilla')),
      kuvatKaytossa: kuvat,
      puluja: tila.pulujaSanottu,
      koukku: tila.koukkuKutsuttu,
      kesto: Math.round(tila.kesto),
      luenta: Math.round(tila.luenta),
      /** Hetki, jolla pulu puhuu (jakson oman puheen loppu). */
      puluHetki: Math.round(tila.puluHetki),
      /** Soiko kertoja putkena (manifesti) vai jakso kerrallaan. */
      yhtenainenLuenta: luenta.yhtena(),
      /** Putken kohta koko kertomuksessa (ms) tai null ilman ääntä. */
      aanikello: luenta.hetki() === null ? null : Math.round(luenta.hetki()),
      /** Jakson aikaleimat esityksen käyttöön (lauseiden määrä riittää mittariksi). */
      lauseita: kertomus[tila.i]?.aikaleimat?.lauseet?.length ?? null,
      kulunut: Math.round(tila.kulunut),
      pitoMin: Number.isFinite(tila.pitoMin) ? Math.round(tila.pitoMin) : null,
      karjet: tila.karjet,
      muistista: tila.muistista,
      /** Avausajo kesken: pallo on yhä matkalla pimeydestä. */
      avaruus: Boolean(tila.avaruus),
      avaruusOsuus: tila.avaruusAlku ? Math.round(avaruudenOsuus() * 100) / 100 : null,
      tahdet: tila.tahdet?.tila?.() ?? null,
      /*
       * AVAUKSEN MITTARIT (savuke ja testit). `avausOdottaa` on tosi
       * mustan ja tähtien aikana, ennen kuin kertoja sanoo "Afrikasta";
       * `zoominHetki` on se hetki jakson luennassa, jolloin zoomi
       * lähtee; `keskella` kertoo, onko teksti ruudun keskellä; `lause`
       * ja `teksti` sen, mikä lause on juuri nyt näkyvissä.
       */
      avausOdottaa: tila.avausOdottaa,
      avausOhi: tila.avausOhi,
      zoominHetki: tila.i === 0 ? Math.round(avauksenHetki()) : null,
      zoomLahti: tila.zoomLahti,
      /** Avauksen vaiheet nykyisellä kestolla (musta, piste, zoomi). */
      avauksenVaiheet: tila.i === 0 && !tila.avausOhi ? avauksenAjat() : null,
      /** Onko ruutu yhä TÄYSIN musta (ensimmäinen virke). */
      mustaPaalla: tila.mustaPaalla,
      /** Avauksen ajo ensimmäiseen kohteeseen: kesto ms tai null. */
      kohdeajo: tila.kohdeajonKesto,
      tahtiEsiin: Math.round(tila.tahtiEsiin * 100) / 100,
      keskella: tekstirivi.classList.contains('keskella'),
      lause: tila.lauseIndeksi,
      lauseita: tila.lauseet.length,
      teksti: tila.tekstiNyt,
      tekstiNakyy: tila.tekstiNakyy,
      /** Aikaselaimen veto kesken (kertoja vaiti, kello sormen alla). */
      selaus: Boolean(tila.selaus),
      selauksia: tila.selauksia,
      /** Pulu piilossa (avaus) ja onko se jo kävellyt sisään. */
      puluPiilossa: tila.puluPiilossa,
      puluTullut: tila.puluTullut,
    }),
  };
}
