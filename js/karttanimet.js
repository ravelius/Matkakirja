/*
 * KARTAN PAIKANNIMET — LADOTTU RUUTUAVARUUDESSA, EI POLTETTU LAATTAAN.
 *
 * Omistajan päätös 30.8.2026 (kysymyskortti): kaupunkien, vuorten ja
 * järvien nimiöt POISTUVAT laattapyramidin laatoista ja peli piirtää ne
 * itse. Tämä kumoaa nimien osalta linjauksen *"kaikki pysyvä poltetaan
 * laattoihin"*; kaikki muu pysyvä jää laattoihin ennallaan.
 *
 * === MIKSI — VIKA, JOTA EI VOI KORJATA GENERAATTORISSA ==============
 *
 * Laatta on sama tiedosto kaikille laitteille, eikä se tiedä katsojan
 * pikselitiheyttä. Asiakas valitsee tason luvusta `skaala * dpr`
 * (js/laattapyramidi.js valitseTaso), jolloin yksi kuvapikseli on
 * ruudulla noin `1 / dpr` CSS-pikseliä. Poltettu 10,5 pikselin nimi on
 * siis työpöydällä (dpr 1) 10,5 CSS-pikseliä ja iPadilla (dpr 3) 3,5 —
 * KOLMASOSAN KOKOINEN, juuri kuten omistaja näki.
 *
 * Sitä ei voi mitoittaa laatassa pois, koska tasoindeksi ei erota
 * pikselitiheyttä zoomista: sama taso valitaan sekä "dpr 3 ja kaukana"
 * että "dpr 1 ja kolme kertaa lähempänä". Yksi luku laatassa ei voi
 * palvella kahta riippumatonta muuttujaa. Ruutuavaruudessa ladottu nimi
 * ei tunne koko ongelmaa: se on 10,5 CSS-pikseliä joka laitteella ja
 * piirtyy laitteen omalla tarkkuudella eli terävänä.
 *
 * === LADONTA ON SIIRRETTY, EI KEKSITTY UUDESTAAN ===================
 *
 * Tämä on suora käännös laattojen omasta ladonnasta
 * (tools/generoi-laattapyramidi.mjs `__ladonta`,
 * docs/moduulit/laattapyramidi.md luku 6c), joka tuotti mitattuna 345
 * nimiötä ilman yhtään päällekkäisyyttä. Samat säännöt tulevat mukana:
 *
 *   - laudan oma asettelu (`la/lx/ly`) ensin, se on käsin hiottua työtä;
 *     vasta törmätessä neljä tavanomaista karttapaikkaa, ja viimeisenä
 *     nimi pudotetaan — se on yleistystä, ei virhe
 *   - tärkeysjärjestys lähtökaupunki (+8) → lentokenttä (+4) →
 *     reittisolmun aste (+0…3): pelin merkitys voittaa koristeen
 *   - kaupunkien PISTEET varataan ennen nimiä, jottei nimi peitä toisen
 *     kaupungin merkkiä
 *   - kaksoisnimi vain kerran (Alpit, Ahaggar, Titicaca…): sama
 *     normalisoitu nimi lähekkäin on sama kohde, ja tasokohtainen
 *     päätös siitä kumpi nimiö jää
 *   - yleistyskynnykset nimitiheydestä
 *
 * === MIKÄ MUUTTUI: KYNNYKSET OVAT NYT CSS-PIKSELEITÄ ===============
 *
 * Kynnykset ovat samat luvut, mutta yksikkö on nyt CSS-pikseliä
 * lautayksikköä kohti eikä kuvapikseliä. Se ON korjaus eikä kirjanpitoa:
 * kynnykset johdettiin NIMITIHEYDESTÄ (*"261 kaupunkia jakautuu W
 * pikselin maailmalle noin W/16 pikselin välein, ja 60 pikselin nimi
 * tarvitsee vähintään sen verran"*), ja sekä nimen leveys että
 * lukukelpoinen väli ovat ruudun ominaisuuksia. Laatassa sama luku
 * tarkoitti laitepikseliä, joten tiheällä näytöllä nimet syttyivät
 * kaksi–kolme kertaa liian aikaisin ja liian pieninä. Nyt työpöydän
 * (dpr 1) käytös säilyy sellaisenaan ja tiheä näyttö saa saman.
 *
 * === KOLME SÄÄNTÖÄ, JOTKA PITÄVÄT TÄMÄN HALPANA ====================
 *
 * 1. LADONTA AJETAAN KERRAN ZOOMIA KOHTI, EI KERRAN KEHYKSESSÄ eikä
 *    kerran panoroinnissa. Ladonta on funktio pelkästä mittakaavasta
 *    (`skaala`), koska nimiön siirtymä pisteestä on ruutupikseleitä ja
 *    kaikki muu on laudan omaa geometriaa. Panorointi ei siis muuta
 *    ladontaa lainkaan — ja juuri siksi nimi ei voi hypätä paikasta
 *    toiseen kartan liikkuessa. Tulos muistetaan mittakaavan mukaan,
 *    joten zoomiportaikon kuudessa portaassa ladonta lasketaan
 *    korkeintaan kuudesti koko istunnossa.
 *
 * 2. LADONTA KOKO LAUDALLE, DOM VAIN NÄKYMÄÄN. Törmäyksenvälttely on
 *    globaali päätös (sama syy kuin laatoilla: lohkoittain ladottuna
 *    naapurit päätyisivät eri tulokseen). Se on halpaa — 351 nimeä,
 *    ruudukkohaku — mutta SOLMUT eivät ole: kerrokseen syntyy vain se
 *    kourallinen, joka on näkyvissä. Vanha elävä kerros latoi 261
 *    nimilappua koko laudalle ja maksoi siitä joka eleessä (v1366:n
 *    mittaus).
 *
 * 3. NIMIEN KOOT OVAT CSS-PIKSELEITÄ, SVG:N YKSIKÖIKSI JAETTUNA.
 *    Kerros elää kartan omassa koordinaatistossa, joten `koko / skaala`
 *    on täsmälleen `koko` pikseliä ruudulla — ja teksti rasteroidaan
 *    laitteen omalla tarkkuudella, ei laatan.
 *
 *    MERKIT EIVÄT (31.8.2026). Piste, rengas ja vuorikolmio ovat
 *    laudan yksiköitä eli karttavakio: ne on mitoitettu niin kuin ne
 *    olisi POLTETTU karttaan, ja siksi ne suurenevat lähennettäessä ja
 *    kutistuvat loitonnettaessa. Perustelu ja mittaukset ovat
 *    MERKKI-taulun kohdalla; älä palauta merkkejä `laudalle`-jakoon.
 *
 * === KAKSOISNIMIVAARA — LUE TÄMÄ ENNEN KUIN MUUTAT MITÄÄN ==========
 *
 * v1366:ssa tämä tehtiin toiseen suuntaan: elävä kerros pantiin
 * vaikenemaan, koska nimi oli kartalla kahdesti (poltettu + elävä).
 * Nyt suunta kääntyy. Kumpikaan ei saa vaieta yhtä aikaa, eikä
 * kummankaan saa antaa puhua yhtä aikaa — ja laatat vaihtuvat vasta
 * kun pyramidi ajetaan uudestaan, mikä tapahtuu tästä koodista
 * riippumatta. Siksi päätöksen tekee LUETTELO eikä versionumero:
 * `js/laattapyramidi.js laatoissaOnNimet()` lukee pyramidi.jsonista
 * kentän `nimiot`. Vanha luettelo (kenttää ei ole) tarkoittaa vanhoja
 * laattoja, joissa nimet ovat — silloin tämä kerros on hiljaa.
 */
import { el, saumasiirto } from './mapart.js';
import { laatoissaOnNimet, pyramidiKattaa } from './laattapyramidi.js';
import { NOSTOLADONTA_S } from './nostoladonta.js';
import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';

/**
 * Lautayksikköä yhtä kartan piirtopikseliä kohti maan lehtinäkymässä —
 * eli se mitta, jolla merkki olisi POLTETTU karttaan.
 *
 * Sama luku kuin karttanostoilla (js/nostoladonta.js NOSTOLADONTA_S,
 * omistajan "0,60 — Kreikan mitta"), tuotuna eikä kopioituna. Koko
 * perustelu on MERKKI-taulun kohdalla alempana.
 */
const MERKIN_KARTTAVAKIO = NOSTOLADONTA_S;

/* ------------------------------------------------------------ vakiot */

/*
 * YLEISTYSKYNNYKSET: CSS-pikseliä yhtä lautayksikköä kohti.
 *
 * Samat luvut kuin laatoilla (tools/generoi-laattapyramidi.mjs
 * KYNNYKSET), yksikkö vain vaihtui laitepikselistä CSS-pikseliin —
 * ks. tiedoston johdanto.
 */
const KYNNYS = {
  isoPiste: 0.11,
  kaupunkiPiste: 0.22,
  isoNimi: 0.22,
  nimi: 0.45,
  vuoriNimi: 0.45,
  jarviNimi: 0.45,
  jarviNimi2: 0.9,
};

/*
 * KOHDENIMIÖLLÄ EI OLE OMAA TIHEYSKYNNYSTÄ — SEN KYNNYS ON LEHTI.
 *
 * Kohdenimiö luki tässä taulussa arvolla 0,45 eli samalla kuin
 * tavallisen kaupungin nimi (omistajan päätös 30.8.2026: *"Sama
 * ladonta kuin paikannimillä"*). Sama koko, sama törmäyksenvältely ja
 * sama kirjasin PÄTEVÄT YHÄ; poistuu vain mittakaavakynnys, ja siihen
 * on mitattu syy.
 *
 * KYNNYS JOHDETTIIN MAAILMAN NIMITIHEYDESTÄ — *"261 kaupunkia
 * jakautuu W pikselin maailmalle noin W/16 pikselin välein"* (ks.
 * tiedoston johdanto). Kohteet eivät ole maailmanlaajuinen nimistö:
 * ne ovat yhden maan lehden merkintöjä, niitä on lehteä kohti 1–35, ja
 * ne ovat kartalla vain silloin kun se lehti on lähikuvassa
 * (js/fokuskohteet.js LEHDEN_VAHIN_OSUUS = lehti täyttää vähintään
 * puolet näkyvästä kartasta). Kerros antaa nimet ladontaan vasta
 * silloin (luovutaKohdeNimiot) ja tyhjentää ne heti kun merkit
 * sammuvat, joten TIHEYSPORTTI ON JO OLEMASSA — se on lehden oma.
 *
 * MITÄ MAAILMAN KYNNYS TEKI SEN PÄÄLLÄ: se vaiensi LEVEIDEN LEHTIEN
 * kohdenimet kokonaan. Mittakaava on CSS-pikseliä lautayksikköä kohti,
 * eikä leveä lehti yllä 0,45:een edes koko ruudun kokoisena: Kiinan
 * lehti on 2773 lautayksikköä leveä, joten iPadin 834 pikselin
 * ruudulla se on täytenäkin 0,30 — mitattuna kartalla oli kolme
 * merkkiä eikä yhtään nimeä. Kynnys ei siis harventanut litaniaa vaan
 * valitsi maat, joissa nimiä ei näy koskaan.
 */

/*
 * KIRJASIN ON PELIN OMA KARTTA-ANTIIKVA, EI LAATAN LIBERATION SERIF.
 *
 * Laatat ladottiin sillä antiikvalla, joka kontin Chromiumissa sattui
 * olemaan. Kun ladonta tulee peliin, oikea valinta on sama kirjasin
 * jolla kartta muutenkin puhuu (.city-label) — se on lähempänä
 * aikakauden atlasta ja se on laitteella oikeasti olemassa.
 *
 * SAMA MERKKIJONO MITTAAN JA PIIRTOON. Ladonta mittaa kirjaimen
 * leveyden `measureText`illa; jos mittari ja piirto käyttäisivät eri
 * kirjasinta, tulos olisi joko turhia pudotuksia tai päällekkäisyyksiä.
 * Siksi tämä vakio menee sekä canvasin `font`iin että kerroksen
 * `font-family`yn (css/styles.css .karttanimet).
 */
const FONTTI = '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

/**
 * Nimiöiden koot CSS-pikseleinä — samat luvut kuin laatoilla.
 *
 * `kohde` oli 30.8.2026 alkaen tavallisen kaupungin nimen kokoinen
 * (omistaja: *"sama koko"*). Se oli oikea päätös silloin: sitä ennen
 * nimiö oli 5,8 pikseliä eli lukukelvoton, ja se koko oli merkin oman
 * kutistuksen sivutuote (js/fokuskohteet.js KOHDE_SYMBOLI_SKAALA ×
 * js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_KOKO) eikä kartan mitta.
 *
 * === HIERARKIA 1.9.2026: KAUPUNKI ON KARTAN NIMI, NOSTO ON SEN VIERAS
 *
 * Omistajan kuvakaappaus Bulgarian lehtinäkymästä, sanatarkasti:
 * *"kaupunkien nimet pitäisi olla isommalla (suurenna) kuin
 * karttanostojen nimet joita voi pienentää"*.
 *
 * Yhtä suurina ne kilpailivat: kartalla oli kaksi samankokoista
 * nimijoukkoa eikä katse tiennyt, kumpi on paikka ja kumpi on
 * kiinnostava kohde sen vieressä. Nyt taulu on 1800-luvun atlaksen
 * oma porras — mitä isompi asia, sitä isompi nimi:
 *
 *     isoKaupunki  12   -> 14      pääkaupunki ja lentokenttäkaupunki
 *     kaupunki     10,5 -> 12,5    tavallinen kaupunki
 *     vuori        11              maaston omat nimet ennallaan:
 *     jarvi        10               ne olivat jo oikeassa suhteessa
 *     kohde        10,5 -> 8,5     karttanoston nimiö
 *
 * Kaupungin ja noston suhde on nyt 1,47 (ennen 1,00). Kumpikin muutos
 * on noin viidennes omaan suuntaansa — sama linja kuin reittityylin
 * tarkennuksissa: ilmeen tarkennus, ei uusi ilme.
 *
 * `kohde` EI OLE ENÄÄ SAMA LUKU KUIN `kaupunki`, ja se on itse tilaus.
 * Se on yhä nostojen ruutukatto (js/nostoladonta.js
 * NOSTOLADONTA_NIMIO_KATTO), joten muutos KOSKEE MYÖS POLTETTUA
 * NIMIÖTÄ — ja siksi nostoladonnan sääntö on samassa erässä v4.
 */
const KOKO = {
  isoKaupunki: 14, kaupunki: 12.5, vuori: 11, jarvi: 10, kohde: 8.5,
};

/*
 * KOOT ULOS MITTAA VARTEN (1.9.2026). Karttanoston ruutukatto
 * (js/nostoladonta.js NOSTOLADONTA_NIMIO_KATTO) on sama luku kuin
 * `kohde` tässä taulussa — se on koko katon perustelu: poltettu nimiö
 * ei saa olla isompi kuin sama nimi elävänä. Kaksi kopiota samasta
 * luvusta ajautuisi eri arvoihin, ja tests/nostoladonta.test.mjs
 * vertaa niitä koneellisesti; siksi taulu on luettavissa ulkoa.
 */
export const KARTTANIMI_KOOT = KOKO;

/*
 * ====== PÄÄKAUPUNKI LADOTAAN HARVENNETULLA KAPITEELILLA ============
 *
 * OMISTAJAN KYSYMYS 31.8.2026: *"miten tuon ajan kartoissa eroteltiin
 * pääkaupungit ja muut kaupungit? tässä voisi käyttää samaa
 * visualisointia."*
 *
 * 1800-luvun atlaksessa pääkaupungilla on KAKSI merkintää eikä yhtä:
 * kaksoisrengas merkin ympärillä JA nimi harvennetuin kapiteelein.
 * Rengas on kartalla jo (MERKKI.rengasIso); tämä on sen typografinen
 * puolisko. Ilman sitä pääkaupunki erottuu vain siitä, että sen
 * ympärillä on ohut kehä — ja kaukaa katsottuna kehä on pikselin
 * levyinen, kun taas nimi on luettavissa joka mittakaavassa.
 *
 * === EHTO ON SAMA KUIN RENKAALLA, EI OMA LUETTELO ==================
 *
 * Asu valitaan `c.iso`-lipulla eli täsmälleen samasta tiedosta kuin
 * rengas (`merkit`-listan `iso` → MERKKI.rengasIso piirrossa). Jos
 * typografialla olisi oma ehtonsa, kartalle syntyisi ennen pitkää
 * kaupunkeja, joilla on rengas ilman kapiteelia tai päinvastoin — sama
 * juurisyy kuin kaksoisnimivaarassa (ks. tiedoston johdanto): kaksi
 * lähdettä, ei yhtään yhteistä päätöstä.
 *
 * === TEKNIIKKA ON MEREN NIMEN, EI UUSI =============================
 *
 * Harvennus tehdään kuten meren nimessä (js/fokusnosto-symbolit.js
 * NOSTOSYM_NIMIO_ASUT.meri, *"Harvennettu kursiivikapiteeli"*): asu on
 * TAULUKKO, jonka `vali` on kirjainväli KIRJASINKOON OSUUTENA, ja
 * väli lasketaan sekä mittaan että piirtoon samasta luvusta. Yksikkö
 * on osuus eikä pikseli, jotta harvennus seuraa nimen kokoa (12 px
 * pääkaupunki, 10,5 px tavallinen) ilman toista taulukkoa.
 *
 * KAPITEELI ON `small-caps`, EI `toUpperCase`. Meren nimi nostetaan
 * versaaliksi, mutta se on kartan otsikko eikä kaupunki. Tässä koko on
 * lukittu KOKO-tauluun, ja mitattuna (Chromium, kontin serif) versaali
 * *"LONTOO"* on 49,1 px kun kapiteeli on 35,2 ja tavallinen 34,7 — eli
 * versaali kasvattaisi nimen mitan 42 %:lla ja tekisi siitä ruudulla
 * selvästi isomman kuin taulu sallii. Kapiteeli kasvattaa 1,5 %:lla ja
 * pitää x-korkeuden ennallaan; leveyden lisää tulee harvennuksesta,
 * joka on ladonnan syöte ja saa vaikuttaa väistöön normaalisti.
 *
 * VÄLI EI MAKSA YHTÄÄN NIMEÄ, JA SE ON MITATTU. Ladonta ajettiin
 * kymmenellä mittakaavalla (0,11 … 1,879) ennen ja jälkeen:
 * nimiöitä 0 / 0 / 62 / 62 / 62 / 295 / 305 / 339 / 342 / 345 ja
 * pudotettuja 0 / 0 / 0 / 0 / 0 / 18 / 8 / 6 / 3 / 0 — TÄSMÄLLEEN
 * samat luvut molemmilla. Syy on ladonnan järjestyksessä:
 * pääkaupungit ovat tärkeysjonon kärjessä (`start` +8, `airport` +4),
 * joten ne latoutuvat tyhjälle paperille, eikä levennys ehdi viedä
 * tilaa keneltäkään. Vasta selvästi ilmavampi väli maksaa jotain —
 * kokeeksi ajettu 0,60 pudotti kolme nimeä portaalla 0,22 ja pysyi
 * muualla samana.
 *
 * MEREN 0,28 EI SILTI KELPAA TÄHÄN. Se on kartan otsikon harvennus:
 * *"EGEANMERI"* levittäytyy koko lahden yli, kun taas kaupungin nimi
 * on merkkinsä vieressä oleva lippu. 0,14 erottuu yhdellä
 * silmäyksellä ilman että nimi hajoaa merkistään irti.
 */
const PAAKAUPUNGIN_ASU = { tyylitys: 'small-caps', vali: 0.14 };

/** Tavallinen kaupunki: ei kapiteelia eikä harvennusta. */
const KAUPUNGIN_ASU = { tyylitys: '', vali: 0 };

/*
 * PELAAJAN OMA KAUPUNKI SAA PÄÄKAUPUNGIN ASUN (omistaja 1.9.2026,
 * sanatarkasti: *"sen kaupungin nimi olisi hyvä kirjoittaa samalla
 * lailla harvennetuilla kapitaaleilla kuin pääkaupungin nimi"*).
 *
 * ASU EI OLE UUSI VAAN SAMA. Harvennettu kapiteeli on kartalla jo
 * olemassa ja se tarkoittaa *"tämä nimi on tärkeämpi kuin naapurinsa"*
 * (ks. PAAKAUPUNGIN_ASU). Pelaajan sijainti on lähikuvassa juuri se
 * nimi — ja kun pelaaja seisoo pääkaupungissa, asu ei muutu lainkaan,
 * mikä on oikein: kaksi syytä samaan korostukseen ei tee siitä
 * kaksinkertaista.
 *
 * KOKO EI MUUTU, VAIN ASU. Nimi ei saa hypätä kokoa sen mukaan, missä
 * nappula sattuu seisomaan — kartan porras (KOKO) kertoo, kuinka iso
 * paikka on, ja se on sama eilen ja tänään. Korostus on typografinen.
 *
 * LADONTA TUNTEE SEN, EIKÄ VAIN PIIRTO. Harvennus levittää nimen noin
 * 14 %:lla, ja jos se lisättäisiin vasta piirrossa, ladonnan
 * törmäyslaatikko olisi liian kapea ja levinnyt nimi peittäisi
 * naapurinsa. Siksi pelaajan kaupunki on ladonnan syötettä ja osa
 * välimuistin avainta (ladonnanAvain) — yksi uusi ladonta siirtoa
 * kohti, sama hinta kuin uudella zoomiportaalla.
 */
const OMAN_KAUPUNGIN_ASU = PAAKAUPUNGIN_ASU;

/* ------------------------------------------------- kohdenimiön nosto */

/**
 * Rako merkin reunan ja nimiön välissä, CSS-pikseleinä.
 *
 * Sama suuruusluokka kuin kaupungin nimiön siirtymä pisteestä (5–7):
 * nimi on kiinni merkissään mutta ei sen päällä.
 */
const NIMION_RAKO = 3;

/**
 * KOHDENIMIÖIDEN VÄLJYYSVARA CSS-PIKSELEINÄ — TÄMÄ ON YLEISTYSKYNNYS,
 * EI KOSMETIIKKAA.
 *
 * Kaupunkien ja maastonimien yleistys tulee mittakaavakynnyksistä
 * (KYNNYS): ne ovat hajallaan kartalla, ja kun mittakaava pienenee,
 * nimiä on yksinkertaisesti liikaa maailman leveydelle. Kohteet ovat
 * toisin: ne ovat kaikki YHDEN kaupungin ympärillä, ja kaupungin
 * merkkirypäs (js/fokusniput.js) järjestää ne siistiksi sarakkeeksi —
 * eli tekee niille tilaa juuri sen verran, että 12 pikselin rivit
 * mahtuvat vierekkäin koskettamatta. Pelkkä törmäystesti hyväksyisi
 * ne siis kaikki joka mittakaavassa, ja litania jäisi.
 *
 * Varaus tehdään siksi nimeä ISOMPANA. Silloin nimi vaatii ympärilleen
 * oikeaa paperia eikä pelkkää rakoa, ja koska merkit elävät kartan
 * mittakaavassa mutta nimet ruudun, sarake levenee lähennettäessä ja
 * päästää lisää nimiä läpi. Kaukaa näkyy tärkein kourallinen, lähempää
 * useampi — sama porrastus kuin paikannimillä, eri mekanismilla,
 * koska aineisto on erilainen.
 */
const NIMION_VALJYYS_X = 4;
const NIMION_VALJYYS_Y = 5;

/**
 * NOSTON PITUUDET CSS-PIKSELEINÄ (omistajan pelitesti 30.8.2026,
 * Ateena: *"nostot voisi tuoda lähemmäksi Ateenaa"*).
 *
 * Nosto on kartografinen keino eikä ahtauden oire: kun nimi ei mahdu
 * merkkinsä kylkeen, se nostetaan lähituntumaan ja sidotaan merkkiin
 * ohuella katkoviivalla. Pituudet ovat siksi LYHYITÄ ja niitä on vain
 * kaksi — pitkä nosto ei enää kerro kenen nimi on kyseessä, ja
 * silloin nimen kuuluu ennemmin pudota kokonaan (yleistystä, ei
 * virhe).
 *
 * Yksikkö on CSS-pikseli samasta syystä kuin nimen koko: nosto on
 * nimen jatke ja sen on oltava sama matka joka laitteella ja joka
 * zoomilla.
 */
const NOSTON_PITUUDET = [14, 26];

/**
 * Kuinka pitkälle nimiö saa LIUKUA esteen ohi (ks. sovita, LIUKU).
 *
 * Sama kuin pisin nosto: liuku on saman leikin osa kuin nostokin, eikä
 * nimi saa sen kautta päätyä kauemmas merkistään kuin nosto muutenkin
 * veisi.
 */
const NOSTON_LIUKU = Math.max(...NOSTON_PITUUDET);

/**
 * Noston viivan paksuus ja katkon mitta CSS-pikseleinä (omistajan
 * pelitesti 30.8.2026: *"tuo katkoviiva saisi olla kevyempi"*).
 *
 * Hiuksenohut kynä ja tiheä katko: nosto johdattaa silmän eikä kilpaile
 * kartan omien viivojen kanssa. Väri ja peittävyys ovat CSS:ssä
 * (.karttanimi-nosto) — tässä on vain se, mikä on mitta.
 */
const NOSTON_VIIVA = 0.5;
const NOSTON_KATKO = 1.6;

/*
 * ====== MERKIT OVAT KARTTAVAKIO, NIMET PAPERIVAKIO =================
 *
 * OMISTAJAN LINJAUS 31.8.2026 sanatarkasti: *"Kaupungin pisteet eivät
 * saa muuttaa kokoa suhteessa karttaan. Niiden koko pitää olla sama
 * kuin ne olisivat poltettu karttaan."* Kysymyskortilla samana päivänä
 * tarkennettuna: peruskoko viritetään MAAN LEHTINÄKYMÄN zoomiin, ja
 * siitä merkki suurenee lähennettäessä ja pienenee loitonnettaessa —
 * sama sääntö kuin Raamatun 25.8. pallurapäätöksessä.
 *
 * MIKÄ VIKA OLI, MITATTUNA (900 x 1200, dpr 1, Kreikka; 1000 ja 2000
 * km vaativat kehittäjän maailmanapin, muuten zoomi ei päästä niin
 * kauas). Merkit ladottiin RUUTUpikseleissä (`laudalle(koko)` eli
 * koko/skaala), joten ne pysyivät ruudulla samankokoisina — ja juuri
 * siksi KASVOIVAT kartan suhteen ulos zoomatessa:
 *
 *   jana      skaala   ruudulla        LAUDAN YKSIKÖISSÄ
 *                      piste  rengas   piste       rengas
 *   250 km    1,879    4,0     9,2      2,1 / 2,8    4,9
 *   500 km    0,626    4,0     9,2      6,4 / 8,3   14,7
 *   1000 km   0,371    5,2     9,2     14,0         24,8
 *   2000 km   0,247    5,2     9,2     21,0         37,2
 *
 * Vertailuluku on kaupunkilaatta (js/ui.js drawCities): se on jo
 * karttavakio, 16,2 lautayksikköä leveä joka mittakaavassa. Renkaan
 * kasvu ohitti sen 1000 km:n kohdalla ja oli 2000 km:ssä sen päällä
 * yli kaksinkertaisena — kermanvalkoinen laatta jäi umpimustan nastan
 * alle. Se on omistajan "musta pippuri".
 *
 * === PERUSKOKO ON KREIKAN MITTA, JA SE ON JO OLEMASSA ==============
 *
 * Mittakerroin ei ole uusi luku vaan js/nostoladonta.js:n
 * NOSTOLADONTA_S — *"0,60, Kreikan mitta koko maailmalle"*, omistajan
 * oma valinta kysymyskortilla 31.8.2026. Se on täsmälleen tämän
 * tehtävän mitta, koska se on täsmälleen tämä sama kysymys kahdesti
 * kysyttynä: montako lautayksikköä on yksi kartan piirtopikseli
 * silloin, kun Kreikan lehti on ruudulla omassa näkymässään?
 * Nostoladonnan oma johto oli KATTO * rajaus.w / PROTO = 0,585
 * Kreikalle; tässä kontissa mitattu maanäkymän skaala 1,879 antaa
 * 1/1,879 = 0,532. Ne ovat sama suure kahdella mittatikulla, ja
 * omistaja pyöristi sen 0,60:aan.
 *
 * LUKU TUODAAN EIKÄ KOPIOIDA. Kaksi kopiota samasta luvusta ajautuu
 * ennen pitkää eri arvoihin (sama perustelu kuin PARIN_ETAISYYS:llä ja
 * katkaisusäännöllä alempana), ja jos maailman merkkimitta joskus
 * viritetään uudestaan, kaupungin pisteen ja poltetun karttanoston on
 * liikuttava yhdessä — muuten kartalla on kaksi eri kokojärjestelmää.
 *
 * MITÄ MITTA ANTAA. Merkki on nyt sama joka mittakaavassa: piste 2,4
 * ja rengas 5,5 lautayksikköä eli reilusti laatan 16,2:n sisällä,
 * eikä se voi enää ohittaa sitä millään zoomilla. Ruudulla (sama
 * mittaus, sama ruutu) maanäkymässä piste 4,5 px ja rengas 10,4 px eli
 * entisen näköinen, 500 km:n janalla 1,5 / 3,5 px ja 2000 km:ssä
 * 0,8 / 1,4 px. Kapealla ruudulla (puhelin) lehti on ruudulla pienempi
 * ja merkkikin siis pienempi, leveällä isompi; juuri se on "poltettu
 * karttaan" eikä vika.
 *
 * NIMET EIVÄT SEURAA (KOKO, KYNNYS). Ne jäävät CSS-pikseleihin
 * tietoisesti: nimi on paperivakio (ks. tiedoston johdanto), koska
 * lukukelpoisuus on ruudun ominaisuus eikä kartan. Kartalla on siis
 * kaksi mittajärjestelmää, ja se on päätös eikä epäjohdonmukaisuus —
 * sama jako kuin nostoviivalla (NOSTON_VIIVA, paperivakio) ja
 * kohdemerkillä (karttavakio).
 */
/** Merkkien mitat LAUDAN yksiköinä (karttavakio) — ks. yllä. */
const MERKKI = {
  pisteIso: 2.6 * MERKIN_KARTTAVAKIO,
  piste: 2.0 * MERKIN_KARTTAVAKIO,
  rengasIso: 4.6 * MERKIN_KARTTAVAKIO,
  vuoriIso: 5 * MERKIN_KARTTAVAKIO,
  vuori: 4 * MERKIN_KARTTAVAKIO,
};

/*
 * VIIVANLEVEYDET KULKEVAT MUKANA, TAI KORJAUS JÄÄ PUOLITIEHEN.
 *
 * Renkaan säde on nyt karttavakio, mutta jos sen kynä jäisi ruudun
 * mittaan, kaukana rengas olisi 1,4 px leveä muste 1,4 px:n säteellä —
 * eli täytetty musta nappi, sama pippuri toisessa asussa. Merkki on
 * yksi piirros, ja sen kaikki mitat kuuluvat samaan järjestelmään.
 * (Nostoviiva on eri asia: se on NIMEN jatke, ja nimi on paperivakio.)
 */
const MERKIN_VIIVA = {
  rengas: 0.9 * MERKIN_KARTTAVAKIO,
  vuori: 1 * MERKIN_KARTTAVAKIO,
};

/**
 * Lauta kiertyy: 12000 yksikköä on koko maapallon ympärys.
 *
 * Viety, koska kohdekerros tarvitsee saman luvun samaan tarkoitukseen
 * (js/fokuskohteet.js maastonimiLahella).
 */
export const LAUDAN_YMPARYS = 12000;

/**
 * Sama nimi tätä lähempänä = sama kohde.
 *
 * TÄMÄ ON KAKSOISNIMISÄÄNNÖN KOTI, JA SITÄ ON VAIN YKSI. Sääntö oli
 * ennen kolmessa paikassa (laattojen ladonta, sen sisältökerääjä ja
 * kohdenimiöiden väistö), ja kolme kopiota samasta luvusta ajautuu
 * ennen pitkää eri arvoihin. Kun ladonta muutti laatoista peliin, tämä
 * moduuli on ainoa paikka, jossa sääntö vielä elää ajossa — joten se
 * viedään täältä eikä kirjoiteta uudestaan.
 *
 * Raja on vakuutus eikä viritysruuvi: mitattuna kauimmainen aito pari
 * on Alpit 114,7 lautayksikköä, ja kaikki rajat välillä 115…6000
 * antavat täsmälleen saman kuuden parin joukon.
 */
export const PARIN_ETAISYYS = 400;

/* --------------------------------------------------------- aineisto */

/** Nimen vertailumuoto: ilman tarkkeita, välimerkkejä ja kirjainkokoa. */
export const normalisoiNimi = (s) => String(s ?? '')
  .normalize('NFD')
  .replace(/\p{Diacritic}/gu, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]+/gu, '');

/*
 * SAMA NIMI VAIN KERRAN KARTALLE (käännös tools/fokuskartta/sisalto.mjs
 * `parita`-funktiosta; perustelu ja mittaus siellä ja luvussa 6c.1).
 *
 * Laudan paikat (`cities`) ja maastonimet (`maailmankartta-nimet`) ovat
 * eri lähteitä, eikä kumpikaan tiedä toisesta. Osa laudan paikoista on
 * oikeasti vuoristoja tai järviä. Sääntö on yleinen eikä nimilista:
 * sama normalisoitu nimi lähekkäin. Mitattuna pareja on kuusi, ja
 * kaikki rajat välillä 115…6000 antavat saman kuuden joukon.
 *
 * MOLEMMAT MERKIT JÄÄVÄT, VAIN NIMIÖ YHDISTETÄÄN. Kaupunkipiste on se,
 * johon pelaaja matkustaa; vuorisymboli kertoo mistä on kyse.
 */
function parita(kaupungit, vuoret, jarvet) {
  const maasto = [
    ...vuoret.map((v) => ({ kohde: v, laji: 'vuori' })),
    ...jarvet.map((j) => ({ kohde: j, laji: 'jarvi' })),
  ];
  for (const c of kaupungit) {
    const nimi = normalisoiNimi(c.nimi);
    let lahin = null;
    let lahinEtaisyys = Infinity;
    for (const m of maasto) {
      if (normalisoiNimi(m.kohde.nimi) !== nimi) continue;
      let dx = Math.abs(c.x - m.kohde.x);
      if (dx > LAUDAN_YMPARYS / 2) dx = LAUDAN_YMPARYS - dx;
      const d = Math.hypot(dx, c.y - m.kohde.y);
      if (d < lahinEtaisyys) { lahinEtaisyys = d; lahin = m; }
    }
    if (!lahin || lahinEtaisyys > PARIN_ETAISYYS) continue;
    c.maastopari = {
      nimi: lahin.kohde.nimi,
      laji: lahin.laji,
      x: lahin.kohde.x,
      y: lahin.kohde.y,
      tarkeys: lahin.kohde.tarkeys ?? 2,
    };
    lahin.kohde.parillinen = true;
  }
}

/*
 * TÄRKEYS RATKAISEE TÖRMÄYKSEN (sama kaava kuin sisalto.mjs).
 *
 * Nimiöitä ei mahdu tiheimpään kohtaan kaikkia, ja päätös ei saa olla
 * aakkosjärjestys: PELIN KANNALTA MERKITYKSELLINEN KAUPUNKI VOITTAA
 * KORISTEELLISEN. Lähtökaupunki on pelin aloituspiste, lentokenttä on
 * solmu johon voi lentää, ja reittisolmun aste kertoo kuinka moni matka
 * kulkee sen kautta.
 */
function keraaAineisto(pack) {
  const aste = new Map();
  for (const e of pack.edges ?? []) {
    aste.set(e.a, (aste.get(e.a) ?? 0) + 1);
    aste.set(e.b, (aste.get(e.b) ?? 0) + 1);
  }
  for (const e of pack.airRoutes ?? []) {
    aste.set(e.a, (aste.get(e.a) ?? 0) + 1);
    aste.set(e.b, (aste.get(e.b) ?? 0) + 1);
  }
  const kaupungit = (pack.cities ?? []).map((c) => ({
    // Tunnus on ladonnassa vain yhtä varten: pelaajan oma kaupunki saa
    // pääkaupungin asun (OMAN_KAUPUNGIN_ASU).
    id: c.id,
    nimi: c.name,
    x: c.x,
    y: c.y,
    la: c.la ?? 'start',
    lx: c.lx ?? 0,
    ly: c.ly ?? 0,
    iso: Boolean(c.start || c.airport),
    tarkeys: (c.start ? 8 : 0) + (c.airport ? 4 : 0) + Math.min(3, aste.get(c.id) ?? 0),
  }));
  const nimet = MAAILMANKARTAN_NIMET ?? {};
  const vuoret = (nimet.vuoret ?? [])
    .filter((v) => Number.isFinite(v.x) && Number.isFinite(v.y))
    .map((v) => ({ nimi: v.nimi, x: v.x, y: v.y, tarkeys: v.tarkeys ?? 2 }));
  const jarvet = (nimet.jarvet ?? [])
    .filter((v) => Number.isFinite(v.x) && Number.isFinite(v.y))
    .map((v) => ({ nimi: v.nimi, x: v.x, y: v.y, tarkeys: v.tarkeys ?? 2 }));
  parita(kaupungit, vuoret, jarvet);
  return { kaupungit, vuoret, jarvet };
}

/* Aineisto on laudan ominaisuus eikä pelin: se lasketaan kerran. */
let aineisto = null;
let aineistoLauta = null;

function aineistoLaudalle(pack) {
  if (aineistoLauta !== pack?.id) {
    aineisto = keraaAineisto(pack);
    aineistoLauta = pack?.id;
  }
  return aineisto;
}

/* ------------------------------------------------- kohteet ladontaan */

/*
 * KOHDENIMIÖT TULEVAT TÄNNE, EIVÄTKÄ LADO ITSE (omistajan päätös
 * 30.8.2026, kysymyskortti: *"Sama ladonta kuin paikannimillä"*).
 *
 * ── MIKSI YKSI LADONTA EIKÄ KAKSI ─────────────────────────────────
 *
 * Kohdenimiöt latoivat tähän asti itse (js/fokuskohteet.js
 * paivitaKohdeNimiot) omalla mitallaan ja omalla väistöllään. Kaksi
 * rinnakkaista ladontaa ei voi ratkaista törmäystä, koska kumpikaan ei
 * tiedä toisesta: kaupungin nimi ja kohteen nimi saattoivat päätyä
 * samaan kohtaan, ja kumpikin piti sitä vapaana. Sama juurisyy kuin
 * kaksoisnimillä (ks. tiedoston johdanto) — kaksi lähdettä, ei yhtään
 * yhteistä päätöstä.
 *
 * Nyt ladontoja on yksi ja se tuntee kaikki nimet. Kohdekerros
 * ILMOITTAUTUU tänne (asetaKohdenimet) samalla tavalla kuin
 * lisäkohteet ilmoittautuvat kohdekerrokselle
 * (js/fokuskohteet.js rekisteroiLisakohteet): riippuvuus osoittaa
 * yhteen suuntaan, eikä tähän moduuliin tule kehäviittausta.
 *
 * ── MITÄ KOHDEKERROS ANTAA ────────────────────────────────────────
 *
 * PIIRTOPAIKAN, EI DATAPISTEEN. Merkki on voitu siirtää esityksessä
 * (erottelu ja nippu, js/fokusniput.js), ja nimen on oltava sen
 * merkin vieressä, joka ruudulla on — ei sen pisteen, joka datassa on.
 *
 * MERKIN SÄTEEN LAUDAN YKSIKÖINÄ. Kohdemerkit elävät KARTAN
 * mittakaavassa (omistajan linjaus 26.8.2026), nimet CSS-pikseleissä;
 * nimiön rako merkin reunaan on siis laskettava merkin omasta koosta
 * eikä vakiona. Säde on vakio laudan yksiköissä, joten se on
 * ladonnalle sama funktio mittakaavasta kuin kaikki muukin.
 */
let kohdenimet = [];
let kohdenimienAvain = '';
let kohteenSade = 0;

/**
 * Ilmoittaa kohdenimiöt ladontaan.
 *
 * @param {Array} lista [{ id, teksti, x, y }] laudan koordinaateissa,
 *   merkin PIIRTOPAIKASSA; järjestys on tärkeysjärjestys (ensimmäisenä
 *   listattu voittaa törmäyksen), sama sääntö kuin kohdekerroksen
 *   omassa väistössä oli.
 * @param {number} sade merkin säde laudan yksiköinä.
 * @returns {boolean} muuttuiko joukko (kutsuja voi ohittaa turhan työn)
 */
export function asetaKohdenimet(lista, sade = 0) {
  const rivit = Array.isArray(lista) ? lista : [];
  const avain = `${sade.toFixed(3)}|${rivit
    .map((k) => `${k.teksti}@${k.x.toFixed(1)},${k.y.toFixed(1)}${k.puoli ? 'v' : ''}`)
    .join(';')}`;
  if (avain === kohdenimienAvain) return false;
  kohdenimienAvain = avain;
  kohdenimet = rivit;
  kohteenSade = sade;
  /*
   * LADONTA ON FUNKTIO MITTAKAAVASTA JA AINEISTOSTA. Kun aineisto
   * vaihtuu — maanvaihto, uusi merkkijoukko, nipun uusi asettelu —
   * jokainen muistettu mittakaava on vanhentunut, eikä yhtäkään saa
   * jäädä jäljelle: muuten vanha zoomiporras palauttaisi edellisen
   * maan nimet.
   */
  LADONNAT.clear();
  return true;
}

/* --------------------------------------------------- nimiön katkaisu */

/*
 * KATKAISU: NIMIÖ LYHENEE ENNEN KUIN SE VAIKENEE.
 *
 * OMISTAJAN SÄÄNTÖ 31.8.2026 (kysymyskortti, yhdistetyn merkin
 * pilkkulista): *"Jos kaikki teksti ei mahdu, niin katkaistaan vain
 * jostain kohtaa ja lisätään loppuun kolme pistettä."*
 *
 * SÄÄNTÖ ON YKSI JA SE ASUU TÄÄLLÄ. Se kirjoitettiin ensin
 * yhdistetyn merkin pilkkulistan omaksi mitaksi (ent. js/fokusryhmat.js,
 * purettu saman päivän illalla), mutta katkaisu on LADONNAN keino eikä
 * sisällön: sama sääntö tarvitaan silloin, kun valmis nimiö ei mahdu
 * paperille (ks. ladonnan kohdenimiöt). Kaksi kopiota samasta säännöstä
 * ajautuu ennen pitkää eri asuun — sama perustelu kuin
 * kaksoisnimisäännöllä (PARIN_ETAISYYS yllä).
 *
 * MITTA ANNETAAN KUTSUJALTA, EI OLETETA. Pilkkulista mitataan
 * taulukolla kirjaston yksiköissä (js/fokusnosto-symbolit.js
 * nostosymTekstinLeveys), ladonta ruutupikseleissä omalla
 * kirjasimellaan — sama sääntö, kaksi mittatikkua, eikä yksikköjä
 * sekoiteta.
 */

/** Katkaisumerkki. Omistajan "kolme pistettä" kartan omana glyyfinä. */
export const NIMION_KATKO = '\u2026';

/*
 * Mieluummin nimen rajalta kuin sanan keskeltä — mutta vain jos raja on
 * riittävän lähellä katkaisukohtaa. Osuus on mitattu käytännöksi eikä
 * periaatteeksi: omistaja sanoi *"jostain kohtaa"*, joten tässä ei
 * hiota mitään. Alle tämän jäävä raja hukkaisi tilaa enemmän kuin
 * siisteys on arvoinen.
 */
const KATKON_SANARAJA = 0.75;

/**
 * Katkaisee tekstin annettuun leveyteen ja päättää sen kolmeen
 * pisteeseen. Mahtuva teksti palautuu sellaisenaan.
 *
 * @param {string} teksti
 * @param {number} leveys  budjetti mittarin omissa yksiköissä
 * @param {function(string):number} mittaa  tekstin leveys
 * @returns {string}
 */
export function katkaiseNimio(teksti, leveys, mittaa) {
  const koko = String(teksti ?? '');
  if (!koko || mittaa(koko) <= leveys) return koko;
  /*
   * ELLIPSI MAHTUU MITTAAN eikä tule mitatun tekstin perään: kolme
   * pistettä vie tilaa siinä missä kirjaimetkin.
   */
  const tila = leveys - mittaa(NIMION_KATKO);
  let mitta = 0;
  let i = 0;
  for (const merkki of koko) {
    const w = mittaa(merkki);
    if (mitta + w > tila) break;
    mitta += w;
    i += merkki.length;
  }
  let paatos = koko.slice(0, i);
  const raja = paatos.lastIndexOf(', ');
  if (raja > 0 && mittaa(paatos.slice(0, raja)) >= KATKON_SANARAJA * mitta) {
    paatos = paatos.slice(0, raja);
  }
  return `${paatos.replace(/[\s,]+$/, '')}${NIMION_KATKO}`;
}

/* ---------------------------------------------------------- mittari */

/*
 * KIRJAIMEN LEVEYS LUETAAN, EI ARVATA (sama sääntö kuin laatoilla).
 * Yksi canvas koko istunnolle: se ei ole DOM:issa eikä piirrä mitään.
 */
let mittari = null;

/*
 * HARVENNUS ON MUKANA MITASSA, KOSKA SE ON MUKANA PIIRROSSA.
 *
 * Selain lisää `letter-spacing`-välin JOKAISEN merkin perään, myös
 * viimeisen, ja `text-anchor` laskee tasauksen siitä samasta
 * kokonaisleveydestä. Mitattuna (Chromium, kontin serif): kapiteeli
 * *"Lontoo"* on 35,19 px, ja välillä 1,92 px sama nimi on 46,70 px eli
 * tasan 35,19 + 6 × 1,92. Siksi tässä kerrotaan merkkien määrällä eikä
 * väleillä (n−1): ladonnan laatikko on silloin täsmälleen se laatikko,
 * jonka selain nimelle varaa, eikä tasaus liu'u kapiteelin alta.
 *
 * @param {number} vali kirjainväli CSS-pikseleinä (0 = ei harvennusta)
 */
function tekstinLeveys(teksti, koko, tyylitys, vali = 0) {
  const harvennus = vali * [...String(teksti)].length;
  if (!mittari) {
    if (typeof document === 'undefined') return teksti.length * koko * 0.5 + harvennus;
    mittari = document.createElement('canvas').getContext('2d');
  }
  mittari.font = `${tyylitys} ${koko}px ${FONTTI}`.trim();
  return mittari.measureText(teksti).width + harvennus;
}

/** Kohdenimiön leveys ruutupikseleinä — ladonnan oma mittatikku. */
const mittaKohde = (teksti) => tekstinLeveys(teksti, KOKO.kohde, '');

/*
 * KUINKA LYHYEKSI NIMIÖ SAA KUTISTUA.
 *
 * Alaraja on nimen OMA alku eikä pikselivakio: katkaistun nimiön on
 * yhä tunnistettava kohteensa, ja "Reunus…" tekee sen kun "Re…" ei
 * tee. Kuusi merkkiä ja katko on siksi mitta, joka skaalautuu nimen
 * mukana — lyhyt nimi ei koskaan katkea, koska se mahtuu jo
 * sellaisenaan alarajan alle.
 */
const NIMION_LYHIN_MERKKEJA = 6;

/*
 * Puolituksia alarajan ja täyden mitan välillä. Viisi kierrosta
 * riittää: haarukka kapenee kolmaskymmeneskahdesosaan, mikä on
 * 10,5 pikselin kirjasimella alle kirjaimen leveyden — tarkempi
 * haku ei enää muuttaisi katkaisukohtaa.
 */
const NIMION_KUTISTUKSIA = 5;

/**
 * PISIN KATKAISTU ASU, JOKA MAHTUU — tai null, jos edes alaraja ei
 * mahdu mihinkään ehdokkaaseen.
 *
 * Haku on puolitus, ja se on luvallinen siksi, että KAPEAMPI NIMIÖ
 * MAHTUU AINA SINNE, MISSÄ LEVEÄMPI MAHTUI: laatikko lasketaan samasta
 * ankkurista kaikilla kolmella tasauksella, joten kapeampi laatikko on
 * leveämmän osajoukko. Mahtuvuus on siis monotoninen leveyden suhteen,
 * ja puolitus löytää suurimman mahtuvan budjetin.
 *
 * @param {string} teksti
 * @param {function(string):?object} sovita  koettaa ehdokkaat yhdellä tekstillä
 */
function kutistaen(teksti, sovita) {
  const alaraja = mittaKohde(
    `${[...teksti].slice(0, NIMION_LYHIN_MERKKEJA).join('')}${NIMION_KATKO}`,
  );
  let ala = alaraja;
  let yla = mittaKohde(teksti);
  if (!(yla > ala)) return null;
  let paras = sovita(katkaiseNimio(teksti, ala, mittaKohde));
  if (!paras) return null;
  for (let i = 0; i < NIMION_KUTISTUKSIA; i += 1) {
    const keski = (ala + yla) / 2;
    const osuma = sovita(katkaiseNimio(teksti, keski, mittaKohde));
    if (osuma) { paras = osuma; ala = keski; } else yla = keski;
  }
  return paras;
}

/* ---------------------------------------------------------- ladonta */

/**
 * Latoo kaikki nimiöt ja merkit annetulla mittakaavalla.
 *
 * Käännös tools/generoi-laattapyramidi.mjs:n `__ladonta`-funktiosta.
 * Työ tehdään RUUTUPIKSELEISSÄ (siellä nimet mitataan ja siellä
 * törmäykset tapahtuvat) ja tulos palautetaan LAUDAN yksiköissä, jotta
 * panorointi ei tarvitse mitään uudelleenlaskentaa.
 *
 * @param {object} data keraaAineisto()-tulos
 * @param {number} px   CSS-pikseliä yhtä lautayksikköä kohti
 * @param {string|null} oma pelaajan nykyisen kaupungin tunnus, joka saa
 *   pääkaupungin harvennetun kapiteelin (ks. OMAN_KAUPUNGIN_ASU)
 */
function lado(data, px, oma = null) {
  const nakyy = (kynnys) => px >= kynnys;
  const laudalle = (arvo) => arvo / px;

  /* Varatut suorakaiteet; ruudukkohaku riittää, kun nimiä on satoja. */
  const RUUTU = 256;
  const hila = new Map();
  const avaimet = (r) => {
    const ulos = [];
    for (let gy = Math.floor(r.y0 / RUUTU); gy <= Math.floor(r.y1 / RUUTU); gy += 1) {
      for (let gx = Math.floor(r.x0 / RUUTU); gx <= Math.floor(r.x1 / RUUTU); gx += 1) {
        ulos.push(`${gx}:${gy}`);
      }
    }
    return ulos;
  };
  /** Ensimmäinen suorakaide, joka on tämän tiellä — tai null. */
  const este = (r) => {
    for (const a of avaimet(r)) {
      for (const o of hila.get(a) ?? []) {
        if (r.x0 < o.x1 && r.x1 > o.x0 && r.y0 < o.y1 && r.y1 > o.y0) return o;
      }
    }
    return null;
  };
  const vapaa = (r) => !este(r);
  const varaa = (r) => {
    for (const a of avaimet(r)) {
      if (!hila.has(a)) hila.set(a, []);
      hila.get(a).push(r);
    }
  };

  const nimiot = [];
  const merkit = [];

  /*
   * KAKSOISNIMEN PÄÄTÖS ON MITTAKAAVAKOHTAINEN, JA SE ON MITATTU.
   * Vuorennimi syttyy samalla kynnyksellä kuin kaupungin nimi, mutta
   * järven nimi vasta 0,9:llä kun tärkeys > 1. Jos kaupungin nimiö
   * vaiennettaisiin suoralta kädeltä, Titicaca, Tanganjika ja
   * Tšad-järvi jäisivät välillä 0,45…0,9 pisteeksi ILMAN NIMEÄ. Siksi
   * kaupungin nimiö väistää vasta silloin, kun maastonimi oikeasti
   * piirtyy tällä mittakaavalla.
   */
  const maastonKynnys = (pari) => (pari.laji === 'vuori'
    ? KYNNYS.vuoriNimi
    : (pari.tarkeys > 1 ? KYNNYS.jarviNimi2 : KYNNYS.jarviNimi));

  /*
   * PISTEET VARATAAN ENSIN: nimi ei saa peittää toisen kaupungin
   * merkkiä, vaikka nimi itse mahtuisi.
   *
   * VARAUS TEHDÄÄN YHÄ KAIKILLE, MYÖS NIMETTÖMILLE. Sen jälkeen kun
   * nimetön piste lakkasi piirtymästä (ks. `nimetyt` alempana), sen
   * varaus on periaatteessa turha ja voi pudottaa naapurin nimen
   * tyhjän paikan takia. Se on silti jätetty ennalleen HARKITEN:
   * varaus on ladonnan syöte ja nimen saanti sen tulos, joten
   * varauksen karsiminen vaatisi kaksi kierrosta eikä toinen kierros
   * ole edes suppeneva — uusi nimi toisi uuden pisteen, jota ei ollut
   * varattu. Näin ladonta pysyy täsmälleen entisenä eikä yksikään
   * nimi katoa tämän erän takia; muuttuu vain se, mitä piirretään.
   *
   * VARAUKSEN SÄTEET (5,2 / 2,6) JÄÄVÄT RUUTUPIKSELEIKSI, vaikka
   * merkki itse on nyt karttavakio (ks. MERKKI). Se on tietoinen
   * rajaus eikä unohdus: varaus on LADONNAN syöte, ja jos se
   * muuttuisi mittakaavan mukana, jokainen zoomiporras pudottaisi eri
   * nimet kuin ennen — sitä ei ole tilattu tässä erässä. Käytännössä
   * varaus on nyt lähikuvassa merkkiä pienempi ja kaukana isompi;
   * kumpikin virhe on alle pisteen levyinen eikä siirrä nimiä, koska
   * nimen oma laatikko on kertaluokkaa isompi.
   */
  const pisteet = [];
  for (const c of data.kaupungit) {
    if (!c.iso && !nakyy(KYNNYS.kaupunkiPiste)) continue;
    if (!nakyy(KYNNYS.isoPiste)) continue;
    const x = c.x * px;
    const y = c.y * px;
    const r = c.iso ? 5.2 : 2.6;
    pisteet.push({ c, x, y });
    varaa({ x0: x - r, y0: y - r, x1: x + r, y1: y + r });
  }

  /*
   * ====== PISTE VAIN NIMEN KANSSA (omistaja 31.8.2026) =============
   *
   * Sanatarkasti: *"Pelkkiä pisteitä ei saa näkyä. Pisteet voivat
   * näkyä sitten kun kaupungin nimikin näkyy."*
   *
   * Kaupungin piste syttyi ennen kahdella kynnyksellä aikaisemmin kuin
   * sen nimi (KYNNYS.isoPiste 0,11 vs. isoNimi 0,22; kaupunkiPiste
   * 0,22 vs. nimi 0,45), ja lisäksi nimi saattoi pudota törmäykseen
   * millä tahansa mittakaavalla. Kummassakin tapauksessa kartalle jäi
   * musta piste, joka ei kerro mitään: pelaaja näkee merkin muttei
   * saa tietää, minkä paikan merkki se on. Ulos zoomattuna niitä oli
   * ruudullinen, ja juuri se oli omistajan valitus.
   *
   * SÄÄNTÖ ON SAMA KUIN VAIENNEELLA NIMIÖLLÄ (v1385): kartalla ei ole
   * merkkiä ilman nimeä. Siksi tämä joukko kerätään VASTA ladonnan
   * jälkeen — nimen saaminen on ladonnan tulos eikä sen syöte.
   *
   * MAASTOPARI KELPAA NIMEKSI. Jos kaupungin kohdalla piirtyy sen
   * vuoren tai järven nimi (kaksoisnimisääntö), pisteen vieressä on
   * nimi ja piste saa jäädä.
   *
   * VUORISYMBOLIT EIVÄT KUULU TÄHÄN. Kolmio on kartan oma merkintä
   * eikä pelkkä piste, ja sen nimi ladotaan vasta maastokierroksella;
   * omistajan sana koski pisteitä.
   */
  const nimetyt = new Set();

  /*
   * VUORISYMBOLIT PIIRRETÄÄN MUTTA EI VARATA — sama kuin laatoilla.
   *
   * Kaupunkipiste varataan, koska nimi ei saa peittää TOISEN kaupungin
   * merkkiä. Vuorisymboli on eri asia: sen oma nimi kirjoitetaan 11
   * pikseliä sen alle, ja jos kolmio olisi varattu, jokainen vuoren
   * nimi törmäisi omaan symboliinsa ja putoaisi. Mitattu tässä
   * kontissa: varauksella 296 nimiötä ja 49 pudotettua, ilman sitä
   * sama 345 kuin laatoilla.
   */
  if (nakyy(KYNNYS.kaupunkiPiste)) {
    for (const v of data.vuoret) {
      if (v.tarkeys > 1 && !nakyy(KYNNYS.vuoriNimi)) continue;
      merkit.push({ laji: 'vuori', iso: v.tarkeys <= 1, x: v.x, y: v.y });
    }
  }

  /* Tärkein ensin; tasapelissä nimi, jotta ladonta on toistettava. */
  const jono = pisteet.slice().sort((a, b) => (b.c.tarkeys - a.c.tarkeys)
    || (a.c.nimi < b.c.nimi ? -1 : 1));

  let pudotettu = 0;
  for (const { c, x, y } of jono) {
    const saaNimen = c.iso ? nakyy(KYNNYS.isoNimi) : nakyy(KYNNYS.nimi);
    /*
     * Parillinen kohde ladotaan kaupungin TÄRKEYDELLÄ mutta
     * maastonimen ULKOASULLA ja PAIKALLA: tärkeys tulee kaupungilta,
     * jottei nimi putoa sen takia, että maastonimet ladotaan vasta
     * kaupunkien jälkeen.
     */
    const pari = c.maastopari;
    const pariNakyy = Boolean(pari) && nakyy(maastonKynnys(pari));
    if (!saaNimen && !pariNakyy) continue;
    if (pariNakyy) {
      const mkoko = pari.laji === 'vuori' ? KOKO.vuori : KOKO.jarvi;
      const mtyyli = pari.laji === 'jarvi' ? 'italic' : '';
      const mx = pari.x * px;
      const my = pari.y * px + (pari.laji === 'vuori' ? 11 : 0);
      const mlev = tekstinLeveys(pari.nimi, mkoko, mtyyli);
      const mkork = mkoko * 1.15;
      const mr = {
        x0: mx - mlev / 2 - 1,
        y0: my - mkork * 0.62,
        x1: mx + mlev / 2 + 1,
        y1: my + mkork * 0.42,
      };
      if (vapaa(mr)) {
        varaa(mr);
        nimiot.push({
          laji: pari.laji,
          teksti: pari.nimi,
          x: laudalle(mx),
          y: laudalle(my),
          ank: 'middle',
          koko: mkoko,
        });
        nimetyt.add(c);
        continue;
      }
      /*
       * Maastonimen paikka oli varattu. Nimi ei silti saa kadota:
       * kaupungin oma ladonta yrittää seuraavaksi. Kaksoisnimeä ei
       * synny, koska maastonimi on merkitty parilliseksi eikä sitä
       * ladota uudestaan maastokierroksella.
       */
      if (!saaNimen) { pudotettu += 1; continue; }
    }
    const koko = c.iso ? KOKO.isoKaupunki : KOKO.kaupunki;
    /*
     * Pääkaupungin asu tulee samasta lipusta kuin sen rengas
     * (ks. PAAKAUPUNGIN_ASU). Harvennus on CSS-pikseleitä, koska nimi
     * on paperivakio — sama jako kuin koolla.
     */
    const asu = (c.iso || (oma && c.id === oma))
      ? (c.iso ? PAAKAUPUNGIN_ASU : OMAN_KAUPUNGIN_ASU)
      : KAUPUNGIN_ASU;
    const vali = asu.vali * koko;
    const lev = tekstinLeveys(c.nimi, koko, asu.tyylitys, vali);
    const kork = koko * 1.15;
    /*
     * EHDOKKAAT: laudan oma asettelu ensin. Se on käsin hiottua työtä
     * (nimi ei peitä rannikkoa eikä naapuria), joten sitä
     * KUNNIOITETAAN aina kun se ei törmää. Vasta törmätessä kokeillaan
     * neljää tavanomaista karttapaikkaa, ja viimeisenä nimi putoaa.
     *
     * Kerroin 11/13 on laatoilta: laudan `lx/ly` on aseteltu 18 laudan
     * yksikön nimelle, ja tässä nimi on ruutupikseleitä — siirtymä
     * suhteutetaan samalla luvulla kuin laatoilla, jotta käsin hiottu
     * suunta säilyy.
     */
    const d = c.iso ? 7 : 5;
    const ehdokkaat = [
      { dx: c.lx * (11 / 13), dy: c.ly * (11 / 13), ank: c.la },
      { dx: d, dy: kork * 0.35, ank: 'start' },
      { dx: -d, dy: kork * 0.35, ank: 'end' },
      { dx: 0, dy: -kork * 0.75, ank: 'middle' },
      { dx: 0, dy: kork * 1.35, ank: 'middle' },
    ];
    let asetettu = null;
    for (const e of ehdokkaat) {
      const kx = x + e.dx;
      const ky = y + e.dy;
      const x0 = e.ank === 'end' ? kx - lev : (e.ank === 'middle' ? kx - lev / 2 : kx);
      const r = {
        x0: x0 - 1, y0: ky - kork * 0.62, x1: x0 + lev + 1, y1: ky + kork * 0.42,
      };
      if (vapaa(r)) { varaa(r); asetettu = { kx, ky, ank: e.ank }; break; }
    }
    if (!asetettu) { pudotettu += 1; continue; }
    nimiot.push({
      laji: 'kaupunki',
      teksti: c.nimi,
      x: laudalle(asetettu.kx),
      y: laudalle(asetettu.ky),
      ank: asetettu.ank,
      koko,
      /* Asu kulkee ladonnasta piirtoon: sama luku mittasi laatikon. */
      tyylitys: asu.tyylitys,
      vali,
    });
    nimetyt.add(c);
  }

  /*
   * PISTEET VASTA TÄSSÄ, ja vain nimen saaneille. Kaupunkien merkit
   * menevät listan alkuun, jotta piirtojärjestys on entinen
   * (kaupungit ennen vuoria).
   */
  merkit.unshift(...pisteet
    .filter(({ c }) => nimetyt.has(c))
    .map(({ c }) => ({ laji: 'kaupunki', iso: c.iso, x: c.x, y: c.y })));

  /*
   * ====== KOHDENIMIÖT — KAUPUNKIEN JÄLKEEN, MAASTON EDELLE =========
   *
   * TÄRKEYSJÄRJESTYS ON PÄÄTÖS, JA TÄSSÄ ON SEN PERUSTELU.
   *
   * 1. KAUPUNGIN NIMI VOITTAA KOHTEEN NIMEN. Kaupunki on kartan
   *    perusrakennetta ja pelaajan navigoinnin ankkuri: se on paikka,
   *    johon matkustetaan, ja sen nimi on se, jolla pelaaja etsii
   *    itsensä kartalta. Kohde on saman kaupungin yksityiskohta, ja
   *    sen kortti aukeaa merkkiä napauttamalla myös ilman nimeä —
   *    kaupungin nimen katoaminen ei korvaudu millään.
   *
   * 2. KOHTEEN NIMI VOITTAA MAASTONIMEN. Maastonimi on kuvitusta,
   *    jota kartta latoo joka tapauksessa koko maailmaan; kohde on
   *    pelin omaa sisältöä ja vain siinä maassa, jossa pelaaja nyt on.
   *    Kun molemmat eivät mahdu, se harvinaisempi ja avattava jää.
   *    Kaksoisnimivaaraa tästä ei synny: samanniminen kohde jättää
   *    nimiönsä pois jo lähteellä (js/fokuskohteet.js kohteenNimio →
   *    maastonimiLahella), joten sama nimi ei voi kilpailla itsensä
   *    kanssa.
   *
   * MERKIT EIVÄT OSALLISTU EIVÄTKÄ KATOA. Ladonta päättää vain
   * NIMISTÄ. Kohdemerkki piirretään omassa kerroksessaan
   * (js/fokuskohteet.js) osuma-alueineen niin kuin ennenkin, ja
   * pudotetun nimen merkki avaa korttinsa täsmälleen kuten se, jonka
   * nimi jäi — omistajan nimenomainen ehto 30.8.2026.
   */
  const nostot = [];
  /*
   * MERKIN SÄDE RUUTUPIKSELEINÄ. Kohdemerkki elää kartan
   * mittakaavassa, joten sen näkyvä koko riippuu zoomista — nimen
   * rako merkin reunaan on laskettava siitä eikä vakiosta, tai
   * lähikuvassa nimi asettuisi merkin päälle.
   */
  const merkkiR = kohteenSade * px;
  /*
   * PAIKAT LASKETAAN ENSIN, PIIRTO VASTA SEN JÄLKEEN: ladonta varaa
   * paperia, ja vasta valmis asettelu kirjoitetaan nimiöiksi ja
   * nostoviivoiksi.
   */
  const tyot = kohdenimet.map((k) => {
    const x = k.x * px;
    const y = k.y * px;
    const kork = KOKO.kohde * 1.15;
    const vieri = merkkiR + NIMION_RAKO;
    /*
     * EHDOKKAAT KAHDESSA LUOKASSA: ensin neljä merkin omaa kylkeä
     * (nimi kiinni merkissä, ei viivaa — viiva olisi silloin pelkkä
     * koriste), ja vasta jos yksikään ei mahdu, NOSTO: nimi
     * lähituntumaan ja katkoviiva merkkiin.
     *
     * Kyljet ovat samassa järjestyksessä kuin kohdekerroksen omassa
     * väistössä (oikea ennen vasenta, js/fokuskohteet.js
     * KOHDE_NIMIO_PUOLET): järjestys on kiinteä, joten sama näkymä
     * antaa aina saman kartan eikä nimi voi vaihtaa puolta
     * panoroinnissa.
     *
     * LADONTA SAA TOIVOA KYLKEÄ (`puoli`, 31.8.2026). Kaupungin
     * ympärille ladotun ryppään VASEMMAN sarakkeen merkki toivoo
     * nimeään vasemmalle (js/fokusniput.js sääntö 2), tai nimi
     * kulkisi kaupungin laatan yli kohti ryppään toista saraketta.
     * Toive vaihtaa vain kahden ensimmäisen ehdokkaan järjestyksen —
     * kaikki neljä kylkeä ovat yhä tarjolla, ja jos toivottu on
     * varattu, seuraava kelpaa kuten ennenkin.
     */
    const oikea = { dx: vieri, dy: kork * 0.35, ank: 'start', nosto: false };
    const vasen = { dx: -vieri, dy: kork * 0.35, ank: 'end', nosto: false };
    const ehdokkaat = [
      ...(k.puoli ? [vasen, oikea] : [oikea, vasen]),
      { dx: 0, dy: -(merkkiR + kork * 0.55), ank: 'middle', nosto: false },
      { dx: 0, dy: merkkiR + kork * 0.95, ank: 'middle', nosto: false },
    ];
    /*
     * NOSTON SUUNNAT: NELJÄ VINOA JA NELJÄ SUORAA (31.8.2026).
     *
     * Vinot neljä ovat alkuperäiset. Suorat neljä — sama korkeus
     * oikealle ja vasemmalle, sama sarake ylös ja alas — lisättiin,
     * kun mittaus osoitti mistä vaienneet nimiöt oikeasti johtuvat:
     * Ateenassa, Istanbulissa ja Berliinissä nimi ei jäänyt pois
     * siksi että se oli liian leveä (sama nimiö vaikeni budjeteilla
     * 100, 160 ja 240), vaan siksi että KAIKKI kaksitoista
     * ehdokaspaikkaa olivat varattuja — myös lyhimmällä mahdollisella
     * asulla. Kahdeksan suunnan kehä on kartografin oma tapa etsiä
     * nimelle paperia, ja se on halpa: umpikujaan päädytään vasta kun
     * merkin ympäriltä ei kahdella etäisyydellä löydy yhtään aukkoa.
     *
     * NOSTO EI PIDENNY. Pituudet ovat samat kaksi (NOSTON_PITUUDET),
     * joten viiva pysyy yhtä lyhyenä kuin omistajan hyväksymässä
     * asussa — vain suuntia on enemmän.
     *
     * VINOT ENSIN, jotta jo hyväksytyt asettelut eivät muutu: uusi
     * suunta valitaan vain siellä, missä vanhat eivät kelvanneet.
     */
    for (const pituus of NOSTON_PITUUDET) {
      /*
       * Vinossa nosto jakautuu molempiin akseleihin (0,7 + 0,7 ≈ 1),
       * suorassa se menee kokonaan yhteen — kummassakin tapauksessa
       * viivan pituus on sama `pituus`.
       */
      const vino = pituus * 0.7;
      ehdokkaat.push(
        /* Neljä vinoa (alkuperäiset, samassa järjestyksessä). */
        { dx: vieri + vino, dy: -vino + kork * 0.35, ank: 'start', nosto: true },
        { dx: vieri + vino, dy: vino + kork * 0.35, ank: 'start', nosto: true },
        { dx: -(vieri + vino), dy: -vino + kork * 0.35, ank: 'end', nosto: true },
        { dx: -(vieri + vino), dy: vino + kork * 0.35, ank: 'end', nosto: true },
        /* Neljä suoraa: sama korkeus kauempana, sama sarake ylempänä tai alempana. */
        { dx: vieri + pituus, dy: kork * 0.35, ank: 'start', nosto: true },
        { dx: -(vieri + pituus), dy: kork * 0.35, ank: 'end', nosto: true },
        { dx: 0, dy: -(merkkiR + kork * 0.55 + pituus), ank: 'middle', nosto: true },
        { dx: 0, dy: merkkiR + kork * 0.95 + pituus, ank: 'middle', nosto: true },
      );
    }
    /*
     * Yksi teksti ehdokkaisiin; palauttaa ensimmäisen vapaan paikan.
     * `vara` on väljyysvaran kerroin (1 = täysi, 0 = pelkkä muste).
     * Varausta EI tehdä tässä: kutsuja varaa vain sen paikan, jonka se
     * pitää — muuten hylätyt kokeilut söisivät paperia.
     */
    const sovita = (teksti, vara) => {
      const lev = mittaKohde(teksti);
      for (const e of ehdokkaat) {
        const kx = x + e.dx;
        const ky = y + e.dy;
        const x0 = e.ank === 'end' ? kx - lev : (e.ank === 'middle' ? kx - lev / 2 : kx);
        /* Väljyysvara on mukana sekä testissä että varauksessa: nimi
         * vaatii tilaa ympärilleen eikä vain itselleen (ks. NIMION_VALJYYS). */
        const r = {
          x0: x0 - NIMION_VALJYYS_X * vara,
          y0: ky - kork * 0.62 - NIMION_VALJYYS_Y * vara,
          x1: x0 + lev + NIMION_VALJYYS_X * vara,
          y1: ky + kork * 0.42 + NIMION_VALJYYS_Y * vara,
        };
        const tulppa = este(r);
        if (!tulppa) {
          return {
            r, kx, ky, ank: e.ank, nosto: e.nosto, teksti,
          };
        }
        /*
         * LIUKU: SAMA PAIKKA JUURI ESTEEN OHI (31.8.2026).
         *
         * Kiinteä ehdokaskehä osuu joskus juuri raon VIERELLE. Mitattu
         * tapaus: Berliinin ryppään keskimmäisen merkin ylä- ja
         * alanaapurin nimiöiden väliin jää 13,4 pikseliä ja nimiö vie
         * 12,6 — rako riittää, mutta yksikään kehän paikoista ei osu
         * sen 0,8 pikselin ikkunaan, ja nimi vaikeni raon vieressä.
         *
         * Liuku on siksi PYSTYSUUNTAINEN JA TÄSMÄLLINEN: laatikkoa
         * siirretään juuri sen verran, että se ohittaa esteen ylhäältä
         * tai alhaalta, eikä yhtään enempää. Se ei ole uusi paikka
         * vaan sama paikka aukon kohdalla — kylki pysyy kylkenä ja
         * sarake sarakkeena.
         *
         * MITTA EI KARKAA: siirto on enintään NOSTON_LIUKU, joka on
         * pisin nosto. Nimi ei siis pääse kauemmas merkistään kuin
         * nosto muutenkin veisi, ja jos siirto on riittävän pitkä,
         * viiva piirtyy sille kuten nostolle.
         */
        for (const dy of [tulppa.y0 - r.y1, tulppa.y1 - r.y0]) {
          if (!(Math.abs(dy) <= NOSTON_LIUKU)) continue;
          /* Liuku ei saa viedä nimeä kauemmas kuin pisin nosto veisi. */
          if (Math.hypot(kx - x, ky + dy - y) > merkkiR + kork + NOSTON_LIUKU) continue;
          const rl = {
            x0: r.x0, y0: r.y0 + dy, x1: r.x1, y1: r.y1 + dy,
          };
          if (este(rl)) continue;
          return {
            r: rl, kx, ky: ky + dy, ank: e.ank, nosto: true, teksti,
          };
        }
      }
      return null;
    };
    return {
      k, x, y, kork, sovita, asetettu: null,
    };
  });

  /*
   * PAIKAN HAKU: TÄYSI NIMI ENSIN, VÄLJYYS VASTA SITTEN, LYHENNYS
   * VIIMEISENÄ — ja hiljaisuus vasta niiden jälkeen.
   *
   * 1. Täysi nimi väljyysvaroineen: tavallinen tapaus, ei muuttunut.
   * 2. Täysi nimi ILMAN väljyysvaraa. Varaus on ILMAA eikä mustetta
   *    (ks. NIMION_VALJYYS): se on yleistyskynnys, joka harventaa
   *    litaniaa. Kun valittavana on ilma tai vaikeneminen, ilma
   *    väistyy — nimi ei silti kosketa naapuriaan, koska naapurin oma
   *    varaus on yhä voimassa.
   * 3. Lyhennetty nimi (kutistaen): omistajan katkaisusääntö.
   */
  for (const t of tyot) {
    const kokeile = (teksti) => t.sovita(teksti, 1) ?? t.sovita(teksti, 0);
    t.asetettu = kokeile(t.k.teksti) ?? kutistaen(t.k.teksti, kokeile);
    if (t.asetettu) varaa(t.asetettu.r);
  }

  for (const {
    k, x, y, kork, asetettu,
  } of tyot) {
    /*
     * PUDOTUS ON YLEISTYSTÄ, EI VIRHE — mutta se on nyt VIIMEINEN
     * keino eikä ensimmäinen. Tänne päätyy vain nimi, jolle ei löydy
     * paperia edes alarajan mittaisena: silloin kartalla on merkki
     * ilman nimeä, ja se on mittaustulos eikä hiljainen päätös.
     */
    if (!asetettu) { pudotettu += 1; continue; }
    nimiot.push({
      laji: 'kohde',
      teksti: asetettu.teksti,
      x: laudalle(asetettu.kx),
      y: laudalle(asetettu.ky),
      ank: asetettu.ank,
      koko: KOKO.kohde,
    });
    if (!asetettu.nosto) continue;
    /*
     * NOSTON VIIVA SEURAA NIMEÄ SEN VALITTUUN PAIKKAAN. Se lähtee
     * merkin REUNALTA (ei keskeltä, jottei jää merkin alle) ja
     * päättyy juuri ennen nimen perusviivaa.
     */
    const vx = asetettu.kx - x;
    const vy = asetettu.ky - kork * 0.35 - y;
    const pit = Math.hypot(vx, vy);
    if (!(pit > merkkiR + 2)) continue;
    const ux = vx / pit;
    const uy = vy / pit;
    nostot.push({
      x1: laudalle(x + ux * merkkiR),
      y1: laudalle(y + uy * merkkiR),
      x2: laudalle(x + ux * (pit - 2)),
      y2: laudalle(y + uy * (pit - 2)),
      /* Ankkurin x laudalla: saumasiirto lasketaan tästä. */
      ax: k.x,
    });
  }

  /*
   * Vuorten ja järvien nimet samaan törmäysjoukkoon, matalammalla
   * tärkeydellä: kaupunki on pelin kohde, maastonimi on kuvitusta.
   */
  const maasto = [];
  if (nakyy(KYNNYS.vuoriNimi)) {
    for (const v of data.vuoret) {
      if (v.parillinen) continue;
      maasto.push({
        nimi: v.nimi, x: v.x, y: v.y, koko: KOKO.vuori, laji: 'vuori', tarkeys: v.tarkeys,
      });
    }
  }
  if (nakyy(KYNNYS.jarviNimi)) {
    for (const j of data.jarvet) {
      if (j.tarkeys > 1 && !nakyy(KYNNYS.jarviNimi2)) continue;
      if (j.parillinen) continue;
      maasto.push({
        nimi: j.nimi, x: j.x, y: j.y, koko: KOKO.jarvi, laji: 'jarvi', tarkeys: j.tarkeys,
      });
    }
  }
  maasto.sort((a, b) => (a.tarkeys - b.tarkeys) || (a.nimi < b.nimi ? -1 : 1));
  for (const m of maasto) {
    const x = m.x * px;
    const y = m.y * px + (m.laji === 'vuori' ? 11 : 0);
    const tyylitys = m.laji === 'jarvi' ? 'italic' : '';
    const lev = tekstinLeveys(m.nimi, m.koko, tyylitys);
    const kork = m.koko * 1.15;
    const r = {
      x0: x - lev / 2 - 1, y0: y - kork * 0.62, x1: x + lev / 2 + 1, y1: y + kork * 0.42,
    };
    if (!vapaa(r)) { pudotettu += 1; continue; }
    varaa(r);
    nimiot.push({
      laji: m.laji,
      teksti: m.nimi,
      x: laudalle(x),
      y: laudalle(y),
      ank: 'middle',
      koko: m.koko,
    });
  }

  return {
    nimiot, merkit, nostot, pudotettu,
  };
}

/* -------------------------------------------------------- välimuisti */

/*
 * LADONTA MUISTETAAN MITTAKAAVAN MUKAAN. Kameran zoomiportaikko on
 * kuusi porrasta (js/kartta.js zoomiTasot), joten avaimia kertyy
 * kourallinen; katto on silti olemassa, koska nipistys voi pysähtyä
 * portaiden väliin ennen napsahdusta.
 */
const LADONNAT = new Map();
const LADONTOJA_ENINTAAN = 24;

/*
 * Mittakaavan avain: neljä merkitsevää numeroa riittää nimiöiden eroon.
 *
 * PELAAJAN KAUPUNKI ON MUKANA AVAIMESSA, koska se on ladonnan syötettä
 * (OMAN_KAUPUNGIN_ASU levittää nimen ja siirtää törmäyslaatikkoa). Yksi
 * uusi ladonta siirtoa kohti, ja vanha jää muistiin: paluu edelliseen
 * kaupunkiin ei lado uudestaan.
 */
const ladonnanAvain = (px, oma) => `${px.toPrecision(4)}|${oma ?? ''}`;

function ladoVarastosta(pack, px, oma = null) {
  const avain = ladonnanAvain(px, oma);
  const oli = LADONNAT.get(avain);
  if (oli) return oli;
  const tulos = lado(aineistoLaudalle(pack), px, oma);
  if (LADONNAT.size >= LADONTOJA_ENINTAAN) LADONNAT.delete(LADONNAT.keys().next().value);
  LADONNAT.set(avain, tulos);
  return tulos;
}

/** Laudan tai aineiston vaihtuessa vanha ladonta ei kelpaa. */
export function unohdaKarttanimet() {
  LADONNAT.clear();
  aineisto = null;
  aineistoLauta = null;
}

/* ----------------------------------------------------------- piirto */

/**
 * LATOOKO TÄMÄ KERROS NIMET JUURI NYT?
 *
 * Kaksi ehtoa, ja kumpikin on jo olemassa muualla tässä tiedostossa —
 * tämä vain antaa saman vastauksen kohdekerrokselle, jottei sääntöä
 * kirjoiteta toista kertaa. Kohdekerros tarvitsee sen päättääkseen,
 * latooko se nimensä itse (vanha tie) vai antaako ne tänne (uusi).
 *
 * EHTO ON SAMA KUIN OMALLA PIIRROLLA, JA SE ON TÄRKEÄÄ: jos nämä
 * eriytyisivät, kohteet jäisivät välitilassa joko kokonaan nimettömiksi
 * tai saisivat nimensä kahdesti. Sama syy kuin kaksoisnimivaarassa
 * (ks. tiedoston johdanto).
 */
export function karttanimetLatovat(ui) {
  return Boolean(pyramidiKattaa(ui?.game?.pack?.id)) && !laatoissaOnNimet();
}

/**
 * Piirtää näkyvät paikannimet ja niiden merkit.
 *
 * Kutsutaan näkymän ASETTUMISESTA (js/ui.js paivitaMaastonimet), ei
 * joka kehyksestä: kartan siirto on kompositorin työtä, ja tämä kerros
 * elää sen mukana ilman yhtään uudelleenlaskentaa.
 *
 * @param {object} ui     UI-olio (kerros, näkymä, lauta)
 * @param {object} nakyva js/ui.js nakyvaAlue(): { x, y, w, h, skaala }
 * @returns {number} montako nimiötä piirrettiin (mittausta varten)
 */
export function paivitaKarttanimet(ui, tiedettyNakyva = null) {
  const kerros = ui?.karttanimiKerros;
  if (!kerros) return 0;
  const tyhjenna = () => {
    if (kerros.firstChild) kerros.textContent = '';
    ui.karttanimiAvain = null;
    return 0;
  };
  /*
   * KATSELUTILAN MANTERELAUDAT piirtävät oman karttansa ja latovat omat
   * nimilappunsa entiseen tapaan (js/ui.js drawBoard) — tämä kerros on
   * pyramidilaudan asia.
   */
  if (!pyramidiKattaa(ui.game?.pack?.id)) return tyhjenna();
  /*
   * LAATTA PUHUU TAI PELI PUHUU, EI KOSKAAN MOLEMMAT. Vanhoissa
   * laatoissa nimet ovat poltettuina; silloin tämä kerros vaikenee
   * (ks. tiedoston johdanto, KAKSOISNIMIVAARA).
   */
  if (laatoissaOnNimet()) return tyhjenna();
  const nakyva = tiedettyNakyva ?? ui.nakyvaAlue?.();
  if (!(nakyva?.w > 0) || !(nakyva.skaala > 0)) return tyhjenna();

  /*
   * Pelaajan oma kaupunki ladontaan: sen nimi saa pääkaupungin
   * harvennetun kapiteelin (OMAN_KAUPUNGIN_ASU). Katselutilassa
   * nappulaa ei ole kartalla, joten korostustakaan ei ole.
   */
  const oma = (!ui.katselu && ui.game?.cityOf?.()?.id) || null;
  const { nimiot, merkit, nostot } = ladoVarastosta(ui.game.pack, nakyva.skaala, oma);
  const leveys = ui.game.pack.map?.kiertava ? (ui.game.pack.map.width ?? 0) : 0;
  const laudalle = (cssPx) => cssPx / nakyva.skaala;

  /*
   * NÄKYMÄRAJAUS ON KOKO SÄÄSTÖ. Ladonta koskee kaikkia 351:tä nimeä,
   * mutta kerrokseen tehdään solmu vain siitä kourallisesta, joka on
   * ruudulla — vanha elävä kerros piti 261 nimilappua puussa aina.
   */
  const vara = laudalle(120);
  const yVara = laudalle(24);
  const nakyvat = [];
  for (const n of nimiot) {
    if (n.y < nakyva.y - yVara || n.y > nakyva.y + nakyva.h + yVara) continue;
    const siirto = saumasiirto(n.x, nakyva, leveys, vara);
    if (siirto === null) continue;
    nakyvat.push({ n, x: n.x + siirto });
  }
  const nakyvatMerkit = [];
  for (const m of merkit) {
    if (m.y < nakyva.y - yVara || m.y > nakyva.y + nakyva.h + yVara) continue;
    const siirto = saumasiirto(m.x, nakyva, leveys, vara);
    if (siirto === null) continue;
    nakyvatMerkit.push({ m, x: m.x + siirto });
  }

  /*
   * KERROS RAKENNETAAN UUDESTAAN VAIN KUN SEN SISÄLTÖ MUUTTUU. Avain on
   * mittakaava ja näkyvien nimien joukko: panoroinnin aikana kerros
   * täydentyy vain kun uusi nimi tulee reunan yli, eikä sama ladonta
   * maalaa itseään uudestaan joka asettumisella.
   */
  /*
   * NOSTON VIIVAT SAMAAN RAJAUKSEEN kuin nimet. Viiva on nimen jatke,
   * joten se seuraa nimeään sauman yli samalla siirrolla — siirto
   * lasketaan merkin ankkurista, jotta viivan molemmat päät kulkevat
   * yhdessä eikä viiva veny sauman poikki.
   */
  const nakyvatNostot = [];
  for (const n of nostot ?? []) {
    if (n.y1 < nakyva.y - yVara || n.y1 > nakyva.y + nakyva.h + yVara) continue;
    const siirto = saumasiirto(n.ax, nakyva, leveys, vara);
    if (siirto === null) continue;
    nakyvatNostot.push({ n, siirto });
  }

  /*
   * KERROS RAKENNETAAN UUDESTAAN VAIN KUN SEN SISÄLTÖ MUUTTUU. Avain on
   * mittakaava ja näkyvien nimien joukko: panoroinnin aikana kerros
   * täydentyy vain kun uusi nimi tulee reunan yli, eikä sama ladonta
   * maalaa itseään uudestaan joka asettumisella.
   */
  const avain = `${ladonnanAvain(nakyva.skaala)}|`
    + `${nakyvat.map((k) => `${k.n.teksti}@${k.x.toFixed(0)}`).join(',')}|`
    + `${nakyvatMerkit.length}:${nakyvatMerkit[0]?.x.toFixed(0) ?? ''}`
    + `|${nakyvatNostot.length}`;
  if (ui.karttanimiAvain === avain) return nakyvat.length;
  ui.karttanimiAvain = avain;
  kerros.textContent = '';

  /*
   * NOSTON VIIVAT KAIKKEIN ALIMMAISIKSI: ne ovat apuviivastoa, joka
   * johdattaa silmän merkiltä nimelle, eivätkä ne saa kulkea
   * kummankaan päällä.
   *
   * PAKSUUS JA KATKOT OVAT CSS-PIKSELEITÄ (paperivakio, Raamatun osio
   * PAPERIVAKIOT JA KARTTAVAKIOT). Nosto on nimen jatke, ja nimi on
   * ruudun mitta: jos viiva skaalautuisi kartan mukana, se olisi
   * lähikuvassa köysi ja yleiskuvassa näkymätön — juuri se vika, joka
   * kehysviivoista korjattiin v1369:ssä.
   */
  for (const { n, siirto } of nakyvatNostot) {
    el('line', {
      class: 'karttanimi-nosto',
      x1: (n.x1 + siirto).toFixed(2),
      y1: n.y1.toFixed(2),
      x2: (n.x2 + siirto).toFixed(2),
      y2: n.y2.toFixed(2),
      'stroke-width': laudalle(NOSTON_VIIVA),
      'stroke-dasharray': `${laudalle(NOSTON_KATKO)} ${laudalle(NOSTON_KATKO)}`,
    }, kerros);
  }

  /*
   * Merkit ensin, nimet päälle: nimi on merkin selitys eikä toisin päin.
   *
   * MITAT MENEVÄT SELLAISENAAN, ILMAN `laudalle`-jakolaskua: MERKKI ja
   * MERKIN_VIIVA ovat jo laudan yksiköitä (karttavakio, ks. MERKKI).
   * Nimet alempana käyttävät `laudalle`a yhä, koska ne ovat ruudun
   * mitta — juuri tämä ero on koko muutos.
   */
  for (const { m, x } of nakyvatMerkit) {
    if (m.laji === 'vuori') {
      const r = m.iso ? MERKKI.vuoriIso : MERKKI.vuori;
      el('path', {
        class: 'karttamerkki karttamerkki-vuori',
        'stroke-width': MERKIN_VIIVA.vuori,
        d: `M${(x - r).toFixed(2)} ${(m.y + r * 0.6).toFixed(2)}`
          + `L${x.toFixed(2)} ${(m.y - r * 0.8).toFixed(2)}`
          + `L${(x + r).toFixed(2)} ${(m.y + r * 0.6).toFixed(2)}`,
      }, kerros);
      continue;
    }
    el('circle', {
      class: 'karttamerkki karttamerkki-piste',
      cx: x, cy: m.y, r: m.iso ? MERKKI.pisteIso : MERKKI.piste,
    }, kerros);
    // Rengas ison ympärille: aikakauden kartan pääkaupunkimerkintä.
    if (m.iso) {
      el('circle', {
        class: 'karttamerkki karttamerkki-rengas',
        cx: x,
        cy: m.y,
        r: MERKKI.rengasIso,
        'stroke-width': MERKIN_VIIVA.rengas,
      }, kerros);
    }
  }

  for (const { n, x } of nakyvat) {
    el('text', {
      class: `karttanimi karttanimi-${n.laji}`,
      x,
      y: n.y,
      'font-size': laudalle(n.koko),
      'text-anchor': n.ank,
      /*
       * ASU TULEE LADONNASTA EIKÄ TYYLITIEDOSTOSTA (pääkaupungin
       * harvennettu kapiteeli, ks. PAAKAUPUNGIN_ASU). Luku on sama,
       * jolla laatikko mitattiin: jos harvennus asuisi CSS:ssä,
       * mittari ja piirto voisivat ajautua eri arvoihin, ja silloin
       * nimi joko peittäisi naapurinsa tai putoaisi turhaan.
       *
       * Väli on CSS-pikseleitä ja kerros elää laudan yksiköissä, joten
       * se jaetaan mittakaavalla samoin kuin kirjasinkoko.
       */
      ...(n.tyylitys ? { 'font-variant': n.tyylitys } : null),
      ...(n.vali ? { 'letter-spacing': laudalle(n.vali) } : null),
    }, kerros).textContent = n.teksti;
  }
  return nakyvat.length;
}

/**
 * Kehittäjän ja savukkeiden mittakahva: mitä ladonta antaa tälle
 * mittakaavalle. Ei piirrä mitään.
 */
export function karttanimienMitat(ui, px) {
  if (!pyramidiKattaa(ui?.game?.pack?.id)) return null;
  const tulos = ladoVarastosta(ui.game.pack, px);
  return {
    px,
    nimioita: tulos.nimiot.length,
    merkkeja: tulos.merkit.length,
    pudotettu: tulos.pudotettu,
  };
}
