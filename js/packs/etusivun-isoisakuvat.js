/*
 * ETUSIVUN REITTIKUVAT (js/etusivupallo.js).
 *
 * ── KUVAT PALASIVAT, MUTTA PALLON PINNALLE (6.9.2026 aamu) ─────────
 *
 * OMISTAJA, sanatarkasti: *"Etusivulla kuvat voisivat tulla pienellä
 * kartalle kaupungin käännöksen kohdalle ja seurata kaupunkia ja
 * lopulta häipyä sitä kautta näkyvistä. Käytä uusia vaaleita kuvia.
 * Voi olla isoisän ottamia kuvia."* Aiempi PINO (kortit ruudun
 * laidassa, poistettu 6.9. klo 01.20) EI palaa: kuva on nyt ankkuroitu
 * kaupungin lat/lon-pisteeseen ja seuraa sitä pallon pyöriessä.
 *
 * Kerros lukee kuvan `kaupunki`-kentästä: reitin jakson päättyessä
 * juuri sen kaupungin kuva nousee pallolle. Kuvateksti ei näy pallolla
 * (kuva on pieni), mutta se on kuvan alt-teksti.
 *
 * ── VANHA PINO (5.9.2026) ──────────────────────────────────────────
 *
 * Omistaja 5.9.2026 klo 22.45, sanatarkasti: *"isoisän kuvat voivat olla
 * blurrattuja ja haalealla ja jäädä tekstin alle"* ja *"ne voisivat
 * pinoutua hieman sikin sokin toistensa päälle"*.
 *
 * Omistaja 5.9.2026 klo 22.50, sanatarkasti: *"käytetään niitä uusia
 * jotka toivottavasti olet saanut kuvaputkelta, jotka ovat aika
 * vaaleita (vinjetti vaaleaan)"* — siksi haaleus ja sumennus ovat
 * KUVAKOHTAISIA kenttiä eivätkä yhtä CSS-vakiota: vaalea vinjettikuva
 * katoaisi kokonaan samalla peittävyydellä, jolla tumma albumiinivedos
 * on sopivan haalea.
 *
 * KAANON (Raamattu: ISOISA JAA ARVOITUKSEKSI, omistaja 5.9.2026 klo
 * 22.55): pinon kuvat ovat joko isoisän itsensä ottamia näkymiä
 * vuodelta 1873 tai kuvia, joissa hän on mukana muttei hahmotu täysin
 * (selkä, kaukana, vinjetti, liike). Kasvokuvaa ei ole. Siksi
 * KUVATEKSTI ON PAIKKA + VUOSI ("Bombay, 1873"), ei koskaan
 * henkilökuvaus eikä "Isoisä (kuvassa)" — hän vain kävi
 * mielenkiintoisissa paikoissa ja aika vauhdilla. Sumennus ja haaleus
 * tukevat samaa: hahmo ei saa erottua tarkasti.
 *
 * ── MITEN KUVAPUTKEN TOIMITUS LISÄTÄÄN ─────────────────────────────
 *
 * Kuvaputken arviointisivulla odottaa 5.9.2026 kaksitoista kuvaa, joita
 * EI VIELÄ OLE pelin R2-ämpärissä. Kun kuvaputki on toimittanut ne
 * ämpäriin (sama kansio kuin nykyisillä, ISOISAN_KUVAJUURI), lisää
 * jokaisesta tähän tauluun YKSI rivi — muuta ei tarvita, koska
 * js/etusivupallo.js lukee pinon kuvat yksin tästä:
 *
 *   1. `tunnus`     = kuvaputken tunnus SELLAISENAAN
 *                     (esim. 'isoisa-aden-hiilisatama-1873-kuva-v1').
 *   2. `osoite`     = `${ISOISAN_KUVAJUURI}<tunnus>.jpg` — polku
 *                     muodostetaan juuresta, ei koskaan käsin. Tämä on
 *                     kuvan LÄHDE (alkuperäinen ämpärin vedos).
 *   2b. `pieni`     = vain reitin kaupungeille: repon pienennetty
 *                     versio `${ETUSIVUN_PIENET}<kaupunki>.jpg`
 *                     (320 px, laatu 0,8). Etusivun pallo lataa TÄMÄN;
 *                     `osoite` jää lähteeksi ja muihin käyttöihin.
 *   3. `kuvateksti` = SANASTA SANAAN paikka + vuosi, esim.
 *                     'Adenin hiilisatama, 1873'. Ei henkilökuvausta.
 *   4. `kaupunki`   = se ETUSIVUN_REITIN jakso, jonka laskeutuessa kuva
 *                     tulee pinoon (js/etusivupallo.js ETUSIVUN_REITTI:
 *                     lontoo, pariisi, kairo, mumbai, kolkata,
 *                     singapore, hongkong, tokio, sanfrancisco,
 *                     newyork). Reitin ulkopuolisella kuvalla kenttä on
 *                     null: se tulee kiertovuorollaan.
 *   5. `savy`       = 'vaalea' kuvaputken uusille (vinjetti vaaleaan)
 *                     ja 'tumma' vanhoille albumiinivedoksille.
 *   6. `rajaus`     = vain jos kuvassa on pahvireunus, joka on
 *                     leikattava pois (mitattu kuvasta, osuuksina).
 *
 * Odottavat tunnukset (kuvaputken arviointisivu 5.9.2026) ja niiden
 * reittijakso, jos sellainen on:
 *
 *   isoisa-aden-hiilisatama-1873-kuva-v1         (ei reitillä)
 *   isoisa-kairo-ezbekiyeh-1873-kuva-v1          kairo
 *   isoisa-galatan-silta-1873-kuva-v1            (ei reitillä)
 *   isoisa-colombo-teeplantaasi-1873-kuva-v1     (ei reitillä)
 *   isoisa-singaporen-satama-1873-kuva-v1        singapore
 *   isoisa-jokohaman-ranta-1873-kuva-v1          tokio
 *   isoisa-sanfrancisco-satama-1873-kuva-v1      sanfrancisco
 *   isoisa-newyork-broadway-1873-kuva-v2         newyork
 *   isoisa-wien-maailmannayttely-1873-kuva-v1    (ei reitillä)
 *   isoisa-kapkaupunki-taffelberg-1873-kuva-v2   (ei reitillä)
 *   isoisa-rio-satama-1873-kuva-v1               (ei reitillä)
 *   isoisa-melbourne-kultakentta-1873-kuva-v1    (ei reitillä)
 */
import { ISOISAN_KUVAJUURI } from '../isoisan-valokuvat.js';

export { ISOISAN_KUVAJUURI };

/*
 * PIENENNETYT REITTIKUVAT REPOSSA (omistaja 6.9.2026 aamu,
 * sanatarkasti: *"Etusivulle kuvat kannattaa varmaan pienentää
 * valmiiksi että pyörii parhaiten. Kuvat saavat olla aika pieniä."*).
 *
 * Etusivun pallo ei enää hae reittikuvaa ämpärin 1024–1536 px
 * vedoksena, vaan repon omana 320 px:n JPEG:nä (laatu 0,8, sRGB,
 * 9–14 kt) — kymmenesosa tavuista ja murto-osa purkutyöstä juuri
 * siinä kohdassa, jossa pallon on pyörittävä tasaisesti.
 *
 * Tiedostot on tehty ämpärin ALKUPERÄISISTÄ kuvista (kentän `osoite`
 * osoite on yhä tietueessa, ja se on kuvan lähde): kuva skaalattiin
 * pisimmältä sivultaan 320 px:iin Chromiumin kanvaasilla ja
 * tallennettiin JPEG-laadulla 0,8. Sama työ toistuu ajamalla
 * pienennys uudelleen samalla säännöllä, kun kuvaputki toimittaa
 * uuden kuvan (esim. Pariisi ja Kalkutta).
 *
 * Kuvatekstit ja lähdeosoitteet ovat tietueissa alla; kansiossa on
 * vain kaupunkitunnuksen mukaan nimetty tiedosto.
 */
export const ETUSIVUN_PIENET = 'assets/etusivu/reitti/';

/**
 * SÄVYN OLETUKSET. `haalea` on kuvan peittävyys pinossa ja `sumennus`
 * sen sumennus pikseleinä.
 *
 * Tumma albumiinivedos: 0,55 osuu omistajan haarukkaan (noin
 * 0,45–0,55) ja on tarpeeksi haalea, ettei kuva vie huomiota tekstiltä,
 * jonka alle se jää. Vaalea vinjettikuva on jo lähteessään lähes
 * pergamentin sävyinen: samalla peittävyydellä siitä ei näkyisi mitään,
 * joten se saa 0,85 ja kevyemmän sumennuksen (omistaja klo 22.50:
 * *"jotta kuvaputken vaaleat kuvat eivät haalistu liikaa"*).
 */
export const ISOISAKUVAN_SAVYT = {
  tumma: { haalea: 0.55, sumennus: 1.5 },
  vaalea: { haalea: 0.85, sumennus: 1.2 },
};

/**
 * PINON KUVAT LASKEUTUMISJÄRJESTYKSESSÄ. Taulukko on totuus: uusi
 * kuvaputken toimitus lisätään tähän, eikä js/etusivupallo.js:ään
 * kosketa.
 *
 * Nykyiset kaksi ovat kuvaputken aiempia albumiinivedoksia
 * (js/isoisan-valokuvat.js) — samat tiedostot ja sama pahvireunuksen
 * rajaus, mutta kuvateksti on tässä paikka + vuosi, koska etusivun pino
 * ei nimeä isoisää (Raamattu: ISOISA JAA ARVOITUKSEKSI). Lennon
 * valokuvakortilla (js/ui.js) on yhä oma kuvatekstinsä.
 */
/*
 * KUVAPUTKEN TOIMITUS 5.9.2026 (posti/kuvatoimitus.md 20:05 ja 20:24 UTC,
 * 23 + 4 kuvaa, kohtaamiset/isoisa/). Kuvatekstit ovat kuvaputken
 * sanasta sanaan ("Isoisä, Aden, 1873" tai "Isoisän ottama kuva,
 * Benares, 1873"); selite on kuvaputken arviointikuvaus. Kaikki ovat
 * vaaleita vinjettikuvia (savy 'vaalea'), koko kuva paperireunoineen,
 * ei rajausta. Reitin jaksot: Lontoo, Kairo, Bombay, Singapore,
 * Kanton (Hongkongin jakso), Jokohama (Tokion jakso), San Francisco,
 * New York. Kalkutan jakson kuvana on 6.9.2026 alkaen Benares
 * (isoisän oma Gangesin-kuva samalta matkaosuudelta) — Varanasi EI ole
 * Kalkutta (kuvaputken huomautus), joten kuvateksti pysyy Benaresina ja
 * rivi palaa arvoon `kaupunki: null`, kun kuvaputki toimittaa Kalkutan
 * oman kuvan. PARIISI ON AINOA REITIN KAUPUNKI ILMAN KUVAA: sille ei
 * panna väliaikaista sijaista (päätoimittaja 6.9.2026 aamu), vaan
 * Pariisin käännös jää ilman kuvaa kunnes kuvaputki toimittaa sen.
 * Vanhat kaksi albumiinivedosta poistuivat pinosta (omistaja 23.15:
 * "kohta pitäisi tulla isoisän uusia kuvia, niin käytä niitä ennemmin").
 */
export const ETUSIVUN_ISOISAKUVAT = [
  {
    tunnus: 'isoisa-departure-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-departure-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}lontoo.jpg`,
    kuvateksti: 'Isoisä, Lontoo, 1873',
    selite: 'Isoisä viivähtää arkun vieressä. Vaunun ikkunassa näkyvä saattaja vastaa hänen pieneen hyvästieleeseensä.',
    kaupunki: 'lontoo',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-cairo-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-cairo-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}kairo.jpg`,
    kuvateksti: 'Isoisä, Kairo, 1873',
    selite: 'Puutarhan varjoisa porttikäytävä, Kairo 1873',
    kaupunki: 'kairo',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-bombay-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bombay-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}mumbai.jpg`,
    kuvateksti: 'Isoisä, Bombay, 1873',
    selite: 'Venemies ojentaa kätensä, kun isoisä siirtyy Bombayn rantaportailta veneeseen. Kulunut vedos säilyttää pienen auttavan eleen ja avoimen sataman, mutta katoksen varjo jättää isoisän kasvot arvoitukseksi.',
    kaupunki: 'mumbai',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-singapore-aged-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-singapore-aged-r20260905-v2.jpg`,
    pieni: `${ETUSIVUN_PIENET}singapore.jpg`,
    kuvateksti: 'Isoisä, Singapore, 1873',
    selite: 'Isoisä odottaa varastokäytävän varjossa, kun paikallinen kantaja pysähtyy matka-arkun ääreen. Veneestä katsottuna he jäävät pieniksi hahmoiksi Boat Quayn pitkään varastoriviin.',
    kaupunki: 'singapore',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-kanton-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kanton-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}hongkong.jpg`,
    kuvateksti: 'Isoisä, Kanton, 1873',
    selite: 'Isoisä istuu teehuoneen hämärässä ja seuraa, kuinka teeammattilainen näyttää lehtiä tarjottimelta. Käytössä taittunut vedos säilyttää yhteisen hetken mutta kadottaa isoisän kasvot varjoon.',
    kaupunki: 'hongkong',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-yokohama-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-yokohama-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}tokio.jpg`,
    kuvateksti: 'Isoisä, Jokohama, 1873',
    selite: 'Isoisän avoin muistikirja lepää sylissä. Kuistin varjosta hän kääntyy kohti rantaa, jolla ohikulkija jatkaa matkaansa.',
    kaupunki: 'tokio',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-sanfrancisco-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-sanfrancisco-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}sanfrancisco.jpg`,
    kuvateksti: 'Isoisä, San Francisco, 1873',
    selite: 'Isoisä tukeutuu hetkeksi matka-arkun kanteen varaston räystään alla. Lahdella pieni höyrylaiva etääntyy laiturista.',
    kaupunki: 'sanfrancisco',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-newyork-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-newyork-aged-r20260905-v1.jpg`,
    pieni: `${ETUSIVUN_PIENET}newyork.jpg`,
    kuvateksti: 'Isoisä, New York, 1873',
    selite: 'Isoisä jää liikkeen oviaukon varjoon, kun nainen ja pieni koira pysähtyvät hänen kohdalleen. Leveä Broadway ja matala hevosomnibus jatkuvat hetken takana kauas.',
    kaupunki: 'newyork',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-aden-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-aden-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Aden, 1873',
    selite: 'Isoisä ja hiilityöläinen istuvat samassa pienessä varjossa. Avara lahti jatkuu heidän edessään rauhallisena.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-capetown-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-capetown-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Kapkaupunki, 1873',
    selite: 'Verkkojen äärellä Pöytävuoren juurella, Kapkaupunki 1873',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-giza-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-giza-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Giza, 1873',
    selite: 'Pieni hahmo Gizan aavikolla, 1873',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-railway-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-railway-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Yhdysvaltain länsi, 1873',
    selite: 'Tauko vaununsillalla sateen jälkeen, Yhdysvaltain länsi 1873',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-varanasi-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-varanasi-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Varanasi, 1873',
    selite: 'Pieni hahmo Varanasin rantaportailla, 1873',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-angkor-aged-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-angkor-aged-r20260905-v2.jpg`,
    kuvateksti: 'Isoisä, Angkor, 1873',
    selite: 'Pieni matkustaja pysähtyy puun varjoon katsomaan Angkor Watin korkealle nousevia torneja. Kulunut kivikäytävä johdattaa katseen hänen ohitseen kohti temppelin porttia.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-bali-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-bali-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Balin riisiterassit, 1873',
    selite: 'Isoisä istuu pienen peltokatoksen varjossa. Alempana viljelijä kulkee kapealla penkereellä, ja veden täyttämät riisilohkot kaartuvat palmujen reunustamaan laaksoon.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-ceylon-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-ceylon-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Ceylonin ylänkö, 1873',
    selite: 'Ceylonin nuoren viljelmän laidalla paikallinen viljelijä näyttää isoisälle lehtiverson. Isoisä nojaa kevyesti työkatoksen tukeen, pää ja hartiat katon varjossa.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-ballarat-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-ballarat-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Melbourne / Ballarat, Australia, 1873',
    selite: 'Isoisä kuuntelee työmiehen selitystä vajan ovella. Pihan toisella puolella kaksi miestä jatkaa työtään lautapinon ääressä.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-galata-aged-r20260905-v3',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-galata-aged-r20260905-v3.jpg`,
    kuvateksti: 'Isoisä, Konstantinopoli, 1873',
    selite: 'Isoisä odottaa varjossa, kun kalastaja selvittää siimaansa. Matalana veden pinnalla kulkeva silta johtaa kaupunkiin, joka jo haalistuu paperilta.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-kyoto-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kyoto-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Kioto, 1873',
    selite: 'Bambujen korkeat rungot sulkeutuvat hiljaisen polun ympärille. Pieni isoisähahmo pysähtyy mutkaan ja katsoo metsän sisään.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-petra-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-petra-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Petra, 1873',
    selite: 'Korkeat hiekkakiviseinämät kaartuvat kapean reitin ympärille. Isoisä pysähtyy pienenä hahmona varjoiseen mutkaan.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-rio-aged-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-rio-aged-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Rio de Janeiro, 1873',
    selite: 'Isoisä seisoo venevajan varjossa käsi puuveneen laidalla. Pieni koira odottaa rannassa, ja lahden yli erottuu Sokeritoppa.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-baalbek-more-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-baalbek-more-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Baalbek, 1873',
    selite: 'Isoisä jää pieneksi hahmoksi Baalbekin valtavien temppeliraunioiden ja kaatuneiden kivien keskelle.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-yosemite-more-r20260905-v1',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-yosemite-more-r20260905-v1.jpg`,
    kuvateksti: 'Isoisä, Yosemite, 1873',
    selite: 'Isoisä istuu pienenä hahmona kaatuneen rungon vierellä Yosemiten laajan laakson yläpuolella.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-rangoon-more-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-rangoon-more-r20260905-v2.jpg`,
    kuvateksti: 'Isoisä, Rangoon, 1873',
    selite: 'Isoisä seisoo kaukana Shwedagonin varjoisalla porrasnousulla koristeellisten katosten alla.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-benares-ghat-more-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-benares-ghat-more-r20260905-v2.jpg`,
    pieni: `${ETUSIVUN_PIENET}kolkata.jpg`,
    kuvateksti: 'Isoisän ottama kuva, Benares, 1873',
    selite: 'Benaresin jokirannassa veneilijät auttavat kukkakauppiasta keräämään veteen kaatuneet seppeleet.',
    /*
     * KALKUTAN JAKSO TOISTAISEKSI (päätoimittajan tarkennus 6.9.2026
     * aamu): reittikuvakerros tarvitsee kuvan jokaiselle kaupungille,
     * ja Benares on isoisän oma Gangesin-kuva samalta matkaosuudelta.
     * Kuvateksti pysyy kuvaputken sanana ("Benares"), koska se kertoo
     * mitä kuvassa oikeasti on — Varanasi EI ole Kalkutta. Kuvaputki
     * toimittaa Kalkutan (ja Pariisin) oman kuvan myöhemmin, jolloin
     * tämä rivi palaa arvoon `kaupunki: null`.
     */
    kaupunki: 'kolkata',
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-alexandria-harbor-more-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-alexandria-harbor-more-r20260905-v2.jpg`,
    kuvateksti: 'Isoisän ottama kuva, Aleksandria, 1873',
    selite: 'Aleksandrian satamassa köydenkorjaajat ja nuori vedenkantaja pysähtyvät hetkeksi kameran eteen.',
    kaupunki: null,
    savy: 'vaalea',
  },
  {
    tunnus: 'isoisa-kyoto-fish-lane-more-r20260905-v2',
    osoite: `${ISOISAN_KUVAJUURI}isoisa-kyoto-fish-lane-more-r20260905-v2.jpg`,
    kuvateksti: 'Isoisän ottama kuva, Kioto, 1873',
    selite: 'Kioton kalakujalla pudonnut kala pysäyttää kantajan ja saa myyjän peittämään hymynsä.',
    kaupunki: null,
    savy: 'vaalea',
  },
];

/** Kuvan sävyasetukset (kuvakohtainen arvo voittaa sävyn oletuksen). */
export function isoisakuvanSavy(kuva) {
  const oletus = ISOISAKUVAN_SAVYT[kuva?.savy] ?? ISOISAKUVAN_SAVYT.tumma;
  return {
    haalea: Number.isFinite(kuva?.haalea) ? kuva.haalea : oletus.haalea,
    sumennus: Number.isFinite(kuva?.sumennus) ? kuva.sumennus : oletus.sumennus,
  };
}
