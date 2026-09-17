/*
 * SATELLIITTILINSSIN AVARUUSNÄKYMÄ — Maa avaruudesta, tähdet taustalla.
 *
 * OMISTAJAN TILAUS 12.9.2026, sanatarkasti: *"Astronoottikuvat ovat
 * hienoja, niitä voisi olla vaikka enemmänkin. Saisiko maapallosta
 * tehtyä sen näköistä, miltä se näyttää avaruudestakin? Ja laittaisi
 * vielä tähtiä taustalle. Linssi voisi alkaa niin, että maapallon
 * reunat näkyvät ja taustalla on tähtiä. Maapallonhan ei tarvitse olla
 * kovin tarkka. Eli zoomaustasoja ei tarvitse olla juurikaan."*
 *
 * Linssi katsoo astronautin silmin: kuvat on otettu avaruudesta, joten
 * myös pallon pitää olla se pallo, jonka astronautti näkee ikkunasta.
 * Mitattu vika ennen tätä (12.9.2026, kolme ruutua): linssi avautui
 * siihen zoomiin, jossa pelaaja sattui olemaan — puhelimella pallon
 * halkaisija oli 1 908 px 374 px:n ruudulla, eli reunoja ei näkynyt
 * lainkaan, ja ruudulla oli 1873-vuoden paperikartta Kreikan yllä.
 *
 * ── NELJÄ MUUTOSTA, KAIKKI LINSSIN AJAKSI ─────────────────────────
 *
 *  1. AVAUSNÄKYMÄ. Kamera nousee korkeudelle, jolla KOKO pallo mahtuu
 *     ruudun kapeimpaan suuntaan (avausKorkeus). Luku lasketaan
 *     kotelon omista mitoista eikä ole vakio: pystyruudulla rajaa
 *     LEVEYS, vaikka Globe.gl:n fov on pystysuunnan kulma.
 *  2. TÄHDET. Laudalla on jo tähtitaivas (js/pallolauta/tahdet.js,
 *     kirjoitettu Ihmisen matka -linssin avausjaksoa varten): kolme
 *     pistekerrosta kirjaston omalla hiukkaskerroksella, 2 190 pistettä
 *     ja siemenluku, joka antaa aina saman taivaan. UUTTA TÄHTIKENTTÄÄ
 *     EI SIIS TEHDÄ eikä kuvatiedostoa tuoda repoon (Raamattu: media
 *     ämpäriin, ei repoon) — tämä moduuli vain kutsuu sitä.
 *  3. MAAPALLO AVARUUDESTA. Pelin pinta on 1873-juliste; astronautin
 *     ikkunasta näkyy sininen pallo. Pinta vaihdetaan linssin ajaksi
 *     GENEROITUUN tekstuuriin (maapallonVarit alla), ilmakehän hehku
 *     kellanruskeasta taivaansiniseen ja taustaväri avaruuden mustaksi.
 *  4. ZOOM. Pallo ei saa kadota ruudulta eikä pelaaja sukeltaa
 *     pintaan: zoomiraja on avauskorkeuden ympärillä
 *     (ZOOMIN_LAHIN/-KAUIN). PYÖRITYS SÄILYY — kohteet etsitään palloa
 *     pyörittämällä, ja se on omistajan linjaus.
 *
 * KAIKKI NELJÄ PURETAAN SULKIESSA. Lähtötila luetaan talteen avatessa
 * ja kirjoitetaan takaisin sellaisenaan: muun pelin pallon ulkoasu ei
 * muutu pysyvästi millään tavalla (mitattu ennen/jälkeen kolmella
 * ruudulla).
 *
 * ── MIKSI TEKSTUURI GENEROIDAAN EIKÄ HAETA ────────────────────────
 *
 * Ämpärissä on 1873-juliste, ei sinistä palloa, eikä repoon saa tuoda
 * mediaa. Omistaja sanoo suoraan, ettei pallon tarvitse olla tarkka.
 * Pelissä on kuitenkin jo maan ja meren raja koneluettavana:
 * js/linssit/ihmisen-matka-maamaski.js on 720 × 360 ruudun maapeitto
 * (0…9 osumaa yhdeksästä alinäytteestä), poltettu pelin omasta
 * laudasta. Siitä maalataan leveysvyöhykkeinen Maa — meri, sademetsä,
 * savanni, aavikko, lehtimetsä, taiga, tundra ja napajää — ja päälle
 * ohut pilviharso. Se on "uskottava pallo" eikä satelliittikuva, juuri
 * niin kuin tilattiin.
 *
 * MASKIN RAJAT OVAT LAUDAN RAJAT: juliste loppuu 76° N:ään ja 58° S:ään,
 * joten sen ulkopuoli on maskissa merta. Napajää maalataan siksi omana
 * kerroksenaan 66°:sta navalle, jolloin Etelämanner ja Jäämeren jää
 * tulevat esiin ilman erillistä aineistoa.
 */

/*
 * ── KAKSI MUUTOSTA 12.9.2026 (omistajan havainnot 4 ja 5) ─────────
 *
 *  4. YKSI ZOOM-TASO LISÄÄ. Sanatarkasti: *"Lisäksi tarvitaan ainakin
 *     yksi zoom-taso lisää, koska nyt pisteet ovat aivan liian lähellä
 *     toisiaan."* Kaista 0,55…1,30 × avaus muuttui 0,12…1,30:ksi, ja
 *     lähimmälle rajalle tuli absoluuttinen pohja (ZOOMIN_POHJA 0,1 ≈
 *     640 km). Mitattu puhelimella: Etna ja Italian saapas olivat
 *     11 px:n päässä toisistaan, nyt 102 px; Fuji ja Tokio 2 px, nyt
 *     26 px. Ks. ZOOMIN_LAHIN.
 *  5. PELIN OMA RELIEFI PALLON PINNAKSI. Sanatarkasti: *"Katsoitko
 *     topografia linssistä, joka on jo aiemmin luotu peliin? Se
 *     varmaan sopisi aika hyvin kartan pohjan rakentamiseksi
 *     pallolle."* Sopii — ja kuva on jo repossa
 *     (assets/linssit/topografia-pallo.webp, NOAA ETOPO1, public
 *     domain). Generoitu vyöhykeväri-Maa EI katoa vaan jää pohjalle,
 *     koska reliefin navat ovat läpinäkyviä. Ks. luku 2b.
 *
 * Nimien kynnys mitattiin samalla uudestaan: leveämmässä kaistassa
 * 0,72 osui keskelle, ja nimet olisivat syttyneet heti pienestä
 * nipistyksestä. Ks. NIMIEN_KYNNYS.
 */

/*
 * ── KOLME LISÄYSTÄ 16.9.2026 (Raamattu, "ASTRONAUTIN KAMERA:
 *    VALOKUVANÄKYMÄ UUSIKSI 2", PALLONÄKYMÄ 11–13) ────────────────
 *
 *  6. ISS KIERTÄÄ PALLOA. Kirkas merkki 51,6 asteen radalla 6 %
 *     pinnan yläpuolella, kierros 75 sekunnissa, ja himmeä ratakaari
 *     näkyy vain pallon etupuolella. Liikkeenvähennyksellä merkki on
 *     paikallaan. Ks. luku 2c.
 *  7. AURINKO SIVULTA. Pallon toinen reuna painuu varjoon (alfa 0 →
 *     0,55 viimeisellä 12 %:lla säteestä) ja vastakkainen saa kapean
 *     kirkkaan kaistan (0 → 0,18 viimeisellä 8 %:lla). Keskusta jää
 *     koskematta, ja kohdepisteet jäävät varjon PÄÄLLE, koska kalvo
 *     työnnetään CSS2D-merkkikerroksen eteen.
 *  8. KYLLÄISYYS 0,8:AAN. Hypsometrinen asteikko on kartan asteikko;
 *     astronautin ikkunassa värit ovat vaimeampia. Kylläisyys
 *     lasketaan kankaan suodattimella samassa piirrossa, jolla
 *     reliefi ladotaan (kyllaisyysAlas).
 *
 * Samalla reliefistä on kaksi tarkkuutta (valitseReliefi): 8 192 ×
 * 4 096 leveille ruuduille ja 4 096 × 2 048 puhelimelle, jolla
 * isompi purkautuisi 134 Mt:n puskuriksi.
 *
 *  9. AVAUSAJO JA HIDAS PYÖRIMINEN (Raamattu LISÄYS 4, kohta 18).
 *     Linssi avautuu niin, että pallo näkyy KOKONAAN (65 % ruudun
 *     kapeimmasta sivusta) ja pyörii hitaasti; viidessä sekunnissa
 *     kamera laskeutuu pehmeästi siihen, että pallo peittää melkein
 *     koko ruudun (92 %), ja jää pyörimään, kunnes pelaaja tarttuu
 *     palloon. Ks. luvun 1 kohta "AVAUSAJO".
 */

import {
  diagNyt, pallodiag, pallodiagLoki,
} from '../pallodiag.js';
import { MAAMASKI } from './ihmisen-matka-maamaski.js';
import { puraPeitto } from '../aikajana-virrat-laskenta.js';
import { luoTahtitaivas, TAHTIKERROKSET_PAIKALLAAN } from '../pallolauta/tahdet.js';
import { kokoPallonKorkeus } from '../pallolauta/kamera.js';
/*
 * Reliefin vakiot ja valinta ovat omassa moduulissaan (ks. alempana
 * RELIEFIN VAKIOT JA VALINTA MUUTTIVAT OSOITETTA): tuodaan tähän
 * moduulin omaan käyttöön ja viedään samalla edelleen ulos.
 */
import {
  RELIEFIN_OSOITE,
  RELIEFIN_LEVEYS,
  RELIEFIN_KORKEUS,
  RELIEFIN_OSOITE_8K,
  RELIEFIN_8K_LEVEYS,
  RELIEFIN_8K_KORKEUS,
  RELIEFIN_8K_RAJA_CSS,
  RELIEFIN_8K_RAJA_LAITEPX,
  RELIEFIN_8K_KAYTOSSA,
  RELIEFI_KOKO_PALLO,
  RELIEFIN_KOKO_4K,
  RELIEFIN_KOKO_8K,
  LADONNAN_KATTO_PUHELIN,
  LADONNAN_RAJA_CSS,
  LADONNAN_KATTO,
  LADONNAN_KATTO_WEBKIT,
  LADONNAN_PIKSELIKATTO,
  webkitSelain,
  valitseReliefi,
  valitseLadonta,
} from './reliefikuva.js';

/* ═════════════════ 1. AVAUSNÄKYMÄN KORKEUS ══════════════════════ */

/**
 * Reunan rako LEPONÄKYMÄSSÄ eli avausajon LOPUSSA: osuus ruudun
 * kapeimmasta sivusta, joka jää pallon ja ruudun laidan väliin.
 *
 * OMISTAJA 16.9.2026 (Raamattu LISÄYS 4, kohta 18, sanatarkasti):
 * *"…ja lopuksi pallo peittää melkein koko ruudun ja jää sen jälkeen
 * vain hitaasti pyörimään…"* — "melkein koko ruutu" on 92 % ruudun
 * kapeimmasta sivusta (rako 0,08). Reunat ovat yhä näkyvissä, mikä on
 * koko linssin alkuperäinen tilaus; ennen tätä rako oli 0,12.
 */
export const AVAUKSEN_MARGINAALI = 0.08;

/*
 * ── AVAUSAJO: KOKO PALLO → MELKEIN KOKO RUUTU ─────────────────────
 *
 * OMISTAJA 16.9.2026, sanatarkasti: *"maapallo voisi pyöriä hitaasti
 * kun linssi avautuu ja samalla zoomautua alussa pehmeästi lähemmäs
 * niin että alussa pallo näkyy kokonaan ja lopuksi pallo peittää
 * melkein koko ruudun ja jää sen jälkeen vain hitaasti pyörimään,
 * kunnes pelaaja alkaa ohjata palloa, jolloin pyöriminen loppuu."*
 *
 * ALKU on 65 % ruudun kapeimmasta sivusta (rako 0,35): pallo on
 * kokonaan ruudussa väljästi, tähtitaivasta ympärillä. LOPPU on
 * AVAUKSEN_MARGINAALIn 92 %. Kesto on viisi sekuntia, pehmennys
 * kuutiollinen ease-in-out — sama tunne kuin kirjaston omassa
 * kamera-ajossa (globe.gl tweenaa Cubic.InOut).
 *
 * ── MIKSI KORKEUS AJETAAN KEHYKSITTÄIN EIKÄ pointOfView-TWEENILLÄ ──
 *
 * Kirjaston oma `pointOfView(pov, kesto)` tweenaa lat/lng/korkeuden
 * YHTENÄ pakettina: se lukee nykyisen paikan lähtöarvoksi ja
 * kirjoittaa kameran paikan joka kehyksellä myös lat/lng:stä. Samaan
 * aikaan pyörivä `autoRotate` jäisi siis tween alle — pallo
 * pysähtyisi juuri zoomin ajaksi, ja tilaus sanoo "pyörii hitaasti JA
 * SAMALLA zoomautuu". Kirjastossa on kuitenkin toinen sisäänkäynti:
 * `pointOfView({ altitude }, 0)` yhdistää annetun kentän NYKYISEEN
 * näkymään (`Object.assign({}, nykyinen, muutos)`), joten pelkkä
 * korkeus voidaan kirjoittaa ilman että lat/lng liikkuu. Linssillä on
 * jo oma kehyssilmukka (tähdet ja karttapintojen pyyhkäisy), joten
 * uutta koneistoa ei synny — vain kuusi riviä pehmennystä siihen.
 *
 * PYÖRIMINEN ON KIRJASTON OMA: OrbitControlsin `autoRotate`.
 * Kolme syytä: (1) sen kulma lasketaan kehysajasta
 * (`controls.update(dt)`, three-render-objects antaa deltan), joten
 * nopeus on 0,16 °/s myös hitaalla laitteella; (2) pelin oma elekerros
 * SAMMUTTAA sen jo valmiiksi ensimmäisestä sormesta ja rullasta
 * (js/pallo.js asennaPallonEleet: `ohjaimet.autoRotate = false`
 * sormiAlas- ja wheel-käsittelijöissä), eli "kunnes pelaaja alkaa
 * ohjata palloa" tulee ilmaiseksi ja täsmälleen samasta paikasta kuin
 * valikkopallolla; (3) `enableRotate = false` ei estä sitä — kirjasto
 * tarkistaa vain, ettei sormi ole alhaalla.
 */
/** Reunan rako avausajon ALUSSA (pallo 65 % ruudun kapeimmasta). */
export const ALOITUKSEN_MARGINAALI = 0.35;
/** Avausajon kesto (ms). Tilaus: 4–6 s. */
export const AVAUSZOOMIN_KESTO_MS = 5000;
/**
 * Yhden kehyksen enimmäisaskel avausajossa (ms). Pitkä nykäys —
 * tekstuurin purku, laattojen saapuminen, taustavälilehti — ei saa
 * syödä ajoa, vaan se on yksi askel muiden joukossa. 100 ms vastaa
 * kymmentä kehystä sekunnissa.
 */
export const AVAUSAJON_KEHYSKATTO_MS = 100;
/** Hidas pyöriminen astetta sekunnissa (sama kuin avauspallolla). */
export const PYORIMISTA_ASTETTA_S = 0.16;
/**
 * OrbitControlsin `autoRotateSpeed` samalle nopeudelle. Kirjaston kaava
 * on 2π/60 · speed radiaania sekunnissa eli 6 · speed astetta
 * sekunnissa, joten nopeus on asteet jaettuna kuudella.
 */
export const PYORIMISEN_NOPEUS = PYORIMISTA_ASTETTA_S / 6;

/**
 * Avausajon pehmennys: kuutiollinen ease-in-out (0 → 1).
 * Puhdas funktio (tests/satelliitti-avaruus.test.mjs).
 */
export function avausPehmennys(p) {
  const x = p < 0 ? 0 : (p > 1 ? 1 : Number(p) || 0);
  return x < 0.5 ? 4 * x * x * x : 1 - ((-2 * x + 2) ** 3) / 2;
}

/** Globe.gl:n kameran avauskulma pystysuunnassa (sama kuin PALLO_FOV). */
export const AVARUUDEN_FOV = 50;

/*
 * ── NIMET VASTA LÄHELTÄ (omistaja 12.9.2026) ──────────────────────
 *
 * Sanatarkasti: *"Kaikissa pisteissä ei tarvitse nimeä näkyä kuin
 * vasta lähemmäs zoomattuna."*
 *
 * MITATTU UUDESTAAN 12.9.2026, KUN ZOOMIKAISTA LEVENI (64 kohdetta,
 * limittyvät nimilaatikot luettuna DOMista, nimet pakotettuna päälle
 * joka korkeudella):
 *
 *   korkeus ×avaus │ puhelin 374 × 828 │ työpöytä 1259 × 779
 *   ───────────────┼───────────────────┼─────────────────────
 *      1,00 (avaus)│ 45 paria / 33 nimeä│ 17 paria / 31 nimeä
 *      0,80        │ 38 / 33            │ 11 / 30
 *      0,70        │ 30 / 33            │ 10 / 27
 *      0,60        │ 25 / 32            │  8 / 24
 *      0,50        │ 23 / 29            │  5 / 24
 *      0,40        │ 16 / 27            │  3 / 22
 *      0,30        │ 11 / 22            │  2 / 15
 *      0,20        │  5 / 14            │  1 / 10
 *      0,12 (lähin)│  2 / 10            │  0 /  9
 *
 * KYNNYS ON SUHDELUKU EIKÄ ASTELUKU: avauskorkeus lasketaan kotelosta
 * (avausKorkeus) ja on puhelimella 4,49 mutta työpöydällä 1,63, joten
 * absoluuttinen raja toimisi vain yhdellä ruudulla. Nimet syttyvät
 * korkeudella ≤ NIMIEN_KYNNYS × avaus.
 *
 * MIKSI 0,72 VAIHTUI 0,25:EEN. Vanha luku oli mitattu kaistalle
 * 0,55…1,30, jossa 0,72 oli kaistan alapuoliskossa. Uusi kaista on
 * 0,12…1,30 (ks. ZOOMIN_LAHIN), ja 0,72 osuisi siinä keskelle: nimet
 * syttyisivät heti pienestä nipistyksestä, ja taulukon mukaan niitä
 * olisi silloin yhä 30 paria päällekkäin. 0,25 pudottaa limityksen
 * puhelimella 45:stä noin kahdeksaan ja työpöydällä 17:stä yhteen tai
 * kahteen, ja se on selvästi kaistan alapäässä — nimen näkeminen vaatii
 * siis oikeasti zoomaamista eikä tule vahingossa.
 *
 * LIMITYS EI KATOA KOKONAAN MILLÄÄN KORKEUDELLA, ja se sanotaan tässä
 * suoraan: lähimmälläkin sallitulla korkeudella puhelimelle jää 2
 * limityparia. Syy on aineiston tiheys, ei kynnys — Fuji ja Tokio ovat
 * 0,91° päässä toisistaan, kun pelkkä nimilappu on levein 167 px.
 * Näiden erottaminen vaatisi nimien VÄISTELYN (ladonta, joka siirtää
 * päällekkäiset lapun toiselle puolelle pistettä) — se on oma työnsä
 * eikä kuulu tähän erään.
 */
/** Nimet syttyvät tällä osuudella avauskorkeudesta (mitattu, ks. yllä). */
export const NIMIEN_KYNNYS = 0.25;
/**
 * Nimet sammuvat vasta tässä. Hystereesi (0,25 → 0,29, eli 16 %) estää
 * värähtelyn: ilman sitä yksi kynnyksellä värisevä pikseli sytyttäisi ja
 * sammuttaisi nimet joka kehyksellä. Siirtymä on lisäksi häivytys
 * (css/satelliitti.css), ei välähdys.
 */
export const NIMIEN_KYNNYS_POIS = 0.29;
/** Body-luokka, joka sytyttää nimet (oletus: piilossa avaruusnäkymässä). */
export const NIMIEN_LUOKKA = 'satelliitti-nimet';

/**
 * NÄKYVÄTKÖ NIMET tällä korkeudella? Puhdas funktio hystereesillä:
 * `nyt` on edellinen tila, ja kynnysten välissä se säilyy — siitä
 * vakaus syntyy. (tests/satelliitti-avaruus.test.mjs)
 */
export function nimetNakyvat(korkeus, avaus, nyt = false) {
  if (!(avaus > 0) || !Number.isFinite(korkeus)) return Boolean(nyt);
  if (korkeus <= avaus * NIMIEN_KYNNYS) return true;
  if (korkeus >= avaus * NIMIEN_KYNNYS_POIS) return false;
  return Boolean(nyt);
}

/*
 * ── YKSI ZOOM-TASO LISÄÄ (omistaja 12.9.2026) ─────────────────────
 *
 * Sanatarkasti: *"Lisäksi tarvitaan ainakin yksi zoom-taso lisää,
 * koska nyt pisteet ovat aivan liian lähellä toisiaan."*
 *
 * MITATTU, MIKSI 0,55 EI RIITTÄNYT. Kaista oli 0,55…1,30 × avaus.
 * Puhelimella (374 × 828, avaus 4,49) lähin sallittu korkeus oli 2,47,
 * jolloin pallon halkaisija ruudulla on 535 px. Kahden kohteen
 * ruutuetäisyys on likimain (halkaisija / 2) × kulmaero radiaaneina,
 * joten
 *
 *   pari                      kulmaero   0,55 × avaus   0,12 × avaus
 *   ─────────────────────────┼──────────┼──────────────┼─────────────
 *   Fuji – Tokio              0,91°      4 px           12 px
 *   Etna – Italian saapas     3,56°      17 px          47 px
 *
 * ja hohtavan pisteen sädekehä on 46 px leveä: 17 px:n päässä olevat
 * kaksi pistettä ovat yksi läiskä. 0,12:lla Etna ja saapas erottuvat
 * omiksi renkaikseen (47 px > 46 px sädekehä), ja Fuji–Tokio erottuu
 * kahdeksi ytimeksi saman hehkun sisällä — täyteen eroon tarvittaisiin
 * 3 100 px:n halkaisija, mikä ei mahdu mihinkään ruutuun.
 *
 * POHJA ON ABSOLUUTTINEN EIKÄ SUHDELUKU. Suhdeluku yksin veisi
 * työpöydällä (avaus 1,63) korkeuteen 0,196 ja laajalla ruudulla vielä
 * alemmas — ja korkeus 0,1 on jo noin 640 km eli matalan radan
 * korkeus. Sitä alemmas ei mennä: pallon pinnan läpi ei sukelleta eikä
 * kamera saa joutua ilmakehän hehkun (ILMAKEHAN_KORKEUS 0,25) sisään
 * niin syvälle, että hehku kääntyy kameran ympärille.
 */
/** Zoomin lähin raja avauskorkeudesta: yksi taso lisää (ks. yllä). */
export const ZOOMIN_LAHIN = 0.12;
/** Absoluuttinen lattia: matala rata, ei pinnan läpi (pallonsäteinä). */
export const ZOOMIN_POHJA = 0.1;
/** Zoomin kauin raja avauskorkeudesta: pallo pienenee, ei katoa. */
export const ZOOMIN_KAUIN = 1.3;

/** Avausajon kesto (ms); liikkeenvähennyksellä hyppy. */
export const AVAUSAJON_MS = 900;
/**
 * Sormiliu'un naulaus sulkiessa (ms). Pallon oma liuku (js/pallo.js
 * asennaPallonEleet) jatkaa kirjoittamista kameraan sormen irrottua,
 * eikä sitä voi pysäyttää ulkoa; lähtöpaikka kirjoitetaan siksi joka
 * kehyksellä liu'un keston yli. Mitattu 12.9.2026: yksi kirjoitus jätti
 * kameran 0,32° sivuun, kun pelaaja pyöräytti palloa juuri ennen
 * sulkemista.
 */
export const LIUUN_NAULAUS_MS = 900;

/**
 * Asettumisen ikkuna (ms): tämän ajan sisällä kotelon koon muutos on
 * yläpalkin vaihtumista eikä pelaajan tekoa, ja kamera saa sovittaa
 * itsensä uudestaan vaikka avausajo olisi kesken.
 */
export const ASETTUMISEN_IKKUNA_MS = 2500;

/**
 * KOKO PALLO RUUTUUN — kameran korkeus pallonsäteinä.
 *
 * PUHDAS FUNKTIO (tests/satelliitti-avaruus.test.mjs), riippumaton
 * pallon säteestä: kulma on sama olipa pallo minkä kokoinen tahansa.
 *
 * Kamera on etäisyydellä d = R · (1 + korkeus). Pallon siluetin
 * kulmasäde on a = asin(R / d), ja perspektiivikuvassa sen ruutusäde on
 *
 *     r = (K / 2) · tan(a) / tan(fov / 2),
 *
 * missä K on kotelon KORKEUS pikseleinä (fov on pystykulma). Pallon on
 * mahduttava MOLEMPIIN suuntiin, joten halkaisijan katto on ruudun
 * kapeampi sivu marginaalilla vähennettynä — ja juuri tämä on se kohta,
 * joka pystyruudulla menee väärin, jos leveyttä ei katsota lainkaan.
 *
 * @param {{leveys: number, korkeus: number, fov?: number, marginaali?: number}} mitat
 * @returns {number} Globe.gl:n `altitude`
 */
export function avausKorkeus({
  leveys, korkeus, fov = AVARUUDEN_FOV, marginaali = AVAUKSEN_MARGINAALI,
} = {}) {
  /*
   * KAAVA MUUTTI OSOITETTA 16.9.2026 (js/pallolauta/kamera.js
   * kokoPallonKorkeus). Topografialinssi tarvitsee saman laskun
   * vapauttaakseen zoomin koko palloon, eikä kahta kopiota oteta —
   * tämä jää nimeksi, jonka savukkeet ja testit tuntevat.
   */
  return kokoPallonKorkeus({ leveys, korkeus, fov, marginaali });
}

/**
 * Pallon halkaisija ruudulla (px) annetulla korkeudella — avausKorkeuden
 * käänteisluku, jota mittaukset ja testit lukevat.
 */
export function halkaisijaRuudulla(alt, { korkeus, fov = AVARUUDEN_FOV } = {}) {
  const K = Number(korkeus) > 0 ? Number(korkeus) : 0;
  const d = 1 + Math.max(0, Number(alt) || 0);
  if (!K || !(d > 1)) return 0;
  const a = Math.asin(Math.min(1, 1 / d));
  return K * Math.tan(a) / Math.tan((fov / 2) * (Math.PI / 180));
}

/**
 * Zoomirajat avauskorkeudesta. Lähin raja on suhdeluku, jolla on
 * absoluuttinen lattia (ZOOMIN_POHJA) — ks. ZOOMIN_LAHIN.
 */
export function zoomirajat(alt) {
  const a = Math.max(0.05, Number(alt) || 0.05);
  const min = Math.max(ZOOMIN_POHJA, a * ZOOMIN_LAHIN);
  const max = a * ZOOMIN_KAUIN;
  // Pieni avauskorkeus (hyvin matala ruutu) voisi viedä lattian katon
  // yli; kaista ei saa kääntyä nurin.
  return { min: Math.min(min, max * 0.95), max };
}

/* ═════════════════ 2. MAAN VÄRIT ════════════════════════════════ */

/**
 * LEVEYSVYÖHYKKEET — sävy ja se leveysaste, jolla se on puhtaimmillaan.
 *
 * Maa ei ole yksivärinen pallo, ja juuri vyöhykkeet tekevät siitä
 * tunnistettavan: vihreä päiväntasaajalla, keltainen aavikkovyöhyke
 * noin 25°:ssa, vihreä uudestaan lauhkealla, harmaanvihreä taigassa.
 * Pituuspiiriä ei katsota lainkaan — Sahara on oikeassa kohdassa
 * leveyssuunnassa mutta jatkuu maapallon ympäri. Omistaja: *"Maapallon
 * ei tarvitse olla kovin tarkka."*
 */
export const MAAVYOHYKKEET = [
  { lat: 0, vari: [46, 84, 44] },
  { lat: 14, vari: [92, 106, 52] },
  { lat: 25, vari: [170, 142, 96] },
  { lat: 38, vari: [88, 104, 58] },
  { lat: 52, vari: [62, 86, 58] },
  { lat: 64, vari: [116, 118, 104] },
  { lat: 90, vari: [214, 220, 224] },
];

/** Syvän meren ja matalan rannikkoveden sävyt. */
export const MERI_SYVA = [9, 32, 72];
export const MERI_MATALA = [28, 86, 126];
/** Napajään sävy ja vyöhyke, jolla se sulautuu ympäristöönsä. */
export const JAAN_VARI = [236, 240, 244];
export const JAAVYOHYKE = [64, 78];

/**
 * VALON VASTAKAAVA — miksi tekstuuri on navoilta tummempi kuin Maa.
 *
 * MITATTU 12.9.2026 (kaappaus puhelimelta): napa-alue paloi puhtaaksi
 * valkoiseksi. Syy on pallon valaistuksessa, ei tekstuurissa: kirjaston
 * valot ovat AmbientLight π (= kerroin 1,0) ja DirectionalLight 0,6 π
 * SUORAAN POHJOISNAVAN YLÄPUOLELTA (js/pallo.js kertoo saman
 * napakansien yhteydessä). Pinnan kirkkaus on siis
 *
 *     väri × (1 + 0,6 · max(0, sin(leveysaste))),
 *
 * eli navalla 1,6-kertainen. Napajää 236 → 378 → leikkautuu 255:een, ja
 * koko Jäämeri on yksi valkoinen läiskä ilman muotoa.
 *
 * TEKSTUURI EI VOI OLLA VALAISTUKSEN ARMOILLA, eikä valoja saa muuttaa:
 * ne ovat PELIN pallon valot, ja tämä on linssitila. Siksi tekstuuriin
 * poltetaan valon KÄÄNTEISLUKU — jokainen rivi jaetaan samalla
 * kertoimella, jolla valo sen kertoo. Lopputulos ruudulla on juuri se
 * väri, joka tässä tiedostossa on kirjoitettu.
 */
export const VALON_KOMPENSAATIO = 0.6;

/** Tekstuurin oletusmitat: 0,35° / pikseli, riittää yleiskuvaan. */
export const TEKSTUURIN_LEVEYS = 1024;
export const TEKSTUURIN_KORKEUS = 512;

const raja01 = (x) => (x < 0 ? 0 : (x > 1 ? 1 : x));
const pehmea = (a, b, x) => {
  if (b === a) return x < a ? 0 : 1;
  const t = raja01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const sekoita = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t,
];

/** Vyöhykeväri leveysasteelta (lineaarinen liuku taulukon välillä). */
export function vyohykeVari(lat) {
  const a = Math.abs(Number(lat) || 0);
  for (let i = 1; i < MAAVYOHYKKEET.length; i += 1) {
    const ed = MAAVYOHYKKEET[i - 1];
    const nyt = MAAVYOHYKKEET[i];
    if (a <= nyt.lat) return sekoita(ed.vari, nyt.vari, (a - ed.lat) / (nyt.lat - ed.lat));
  }
  return MAAVYOHYKKEET[MAAVYOHYKKEET.length - 1].vari.slice();
}

/**
 * Toistettava arvokohina (hash → 0…1). Sama siemen antaa aina saman
 * Maan, joten kuvakaappaukset vertautuvat keskenään.
 */
function kohina(x, y, siemen) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(siemen | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
/** Kaksiulotteinen sileä kohina ruudukolla `askel`. */
function sileaKohina(x, y, askel, siemen) {
  const gx = x / askel;
  const gy = y / askel;
  const x0 = Math.floor(gx);
  const y0 = Math.floor(gy);
  const fx = gx - x0;
  const fy = gy - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = kohina(x0, y0, siemen);
  const b = kohina(x0 + 1, y0, siemen);
  const c = kohina(x0, y0 + 1, siemen);
  const d = kohina(x0 + 1, y0 + 1, siemen);
  return (a + (b - a) * sx) + ((c + (d - c) * sx) - (a + (b - a) * sx)) * sy;
}

/**
 * PILVIEN PAINO LEVEYSASTEELLA. Ilmakehä ei jaa pilviä tasan: niitä on
 * päiväntasaajan nousuvyöhykkeessä ja lauhkeissa matalapaineissa, ja
 * aavikkovyöhykkeessä (noin 25°) tuskin lainkaan. Tämä yksi käyrä tekee
 * kuvasta uskottavan — tasainen harso näyttäisi sumulta.
 */
export function pilvipaino(lat) {
  const a = Math.abs(Number(lat) || 0);
  const paiva = Math.exp(-((a - 4) ** 2) / 110);
  const lauhkea = Math.exp(-((a - 55) ** 2) / 320);
  return raja01(0.22 + 0.75 * paiva + 0.65 * lauhkea);
}

/**
 * MAAPEITON PURKU KERRAN. Maski on 720 × 360 ruutua; purku on halpa,
 * mutta sitä ei tehdä kahdesti samassa istunnossa.
 */
let peittoValimuisti = null;
export function maapeitto() {
  if (peittoValimuisti) return peittoValimuisti;
  const koko = MAAMASKI.leveys * MAAMASKI.korkeus;
  peittoValimuisti = puraPeitto(MAAMASKI.peitot, koko) ?? new Uint8Array(koko);
  return peittoValimuisti;
}

/** Maapeitto 0…1 asteina, bilineaarisesti maskin ruuduista. */
function peittoAsteilla(peitto, lat, lon) {
  const W = MAAMASKI.leveys;
  const H = MAAMASKI.korkeus;
  // Rivi 0 = 90°N…89,5°N, sarake 0 = 180°W…179,5°W (maskin oma sopimus).
  const fy = raja01((90 - lat) / 180) * H - 0.5;
  const fx = ((lon + 180) / 360) * W - 0.5;
  const y0 = Math.floor(fy);
  const x0 = Math.floor(fx);
  const ty = fy - y0;
  const tx = fx - x0;
  const nayte = (xi, yi) => {
    const y = yi < 0 ? 0 : (yi > H - 1 ? H - 1 : yi);
    const x = ((xi % W) + W) % W;
    return peitto[y * W + x] / 9;
  };
  const a = nayte(x0, y0);
  const b = nayte(x0 + 1, y0);
  const c = nayte(x0, y0 + 1);
  const d = nayte(x0 + 1, y0 + 1);
  return (a + (b - a) * tx) + ((c + (d - c) * tx) - (a + (b - a) * tx)) * ty;
}

/**
 * MAA AVARUUDESTA — tasavälinen (equirectangular) RGBA-kuva.
 *
 * PUHDAS FUNKTIO ilman canvasia, jotta yksikkötesti voi lukea sen
 * Nodessa (tests/satelliitti-avaruus.test.mjs mittaa meren ja maan
 * osuudet, napajään ja sen, ettei kuvassa ole läpinäkyviä pikseleitä).
 *
 * @returns {{ leveys: number, korkeus: number, data: Uint8ClampedArray }}
 */
export function maapallonVarit({
  leveys = TEKSTUURIN_LEVEYS, korkeus = TEKSTUURIN_KORKEUS, siemen = 20260912,
} = {}) {
  const W = Math.max(8, Math.round(leveys));
  const H = Math.max(4, Math.round(korkeus));
  const peitto = maapeitto();
  const data = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y += 1) {
    const lat = 90 - ((y + 0.5) / H) * 180;
    const maaVari = vyohykeVari(lat);
    const jaa = pehmea(JAAVYOHYKE[0], JAAVYOHYKE[1], Math.abs(lat));
    const pilvia = pilvipaino(lat);
    // Valon vastakaava: ks. VALON_KOMPENSAATIO.
    const valo = 1 + VALON_KOMPENSAATIO * Math.max(0, Math.sin((lat * Math.PI) / 180));
    for (let x = 0; x < W; x += 1) {
      const lon = -180 + ((x + 0.5) / W) * 360;
      const m = peittoAsteilla(peitto, lat, lon);
      // Meri: matalampi rannikolla (osittainen maapeitto = rantaruutu).
      const meri = sekoita(MERI_SYVA, MERI_MATALA, raja01(m * 2.2) * 0.6);
      // Maa: vyöhykeväri + karkea kohina, joka rikkoo tasaisen laikun.
      const k = sileaKohina(x, y, 9, siemen) - 0.5;
      const maa = [
        maaVari[0] + k * 26, maaVari[1] + k * 22, maaVari[2] + k * 16,
      ];
      let vari = sekoita(meri, maa, pehmea(0.18, 0.62, m));
      // Napajää viimeisenä: se peittää sekä maan että meren.
      if (jaa > 0) vari = sekoita(vari, JAAN_VARI, jaa);
      // Pilviharso: kaksi oktaavia, painotus leveysasteelta.
      const p = sileaKohina(x, y, 26, siemen + 11) * 0.65
        + sileaKohina(x, y, 11, siemen + 29) * 0.35;
      const pilvi = raja01((p - 0.52) * 3.1) * pilvia;
      if (pilvi > 0) vari = sekoita(vari, [246, 248, 252], pilvi * 0.72);
      const i = (y * W + x) * 4;
      data[i] = vari[0] / valo;
      data[i + 1] = vari[1] / valo;
      data[i + 2] = vari[2] / valo;
      data[i + 3] = 255;
    }
  }
  return { leveys: W, korkeus: H, data };
}

/**
 * Tekstuuri data-URLina selaimessa. Erillään maapallonVarit-funktiosta,
 * koska tämä tarvitsee canvasin — testit lukevat pikselit suoraan.
 */
export function maapallonTekstuuri(asetukset = {}, doc = globalThis.document) {
  const { leveys, korkeus, data } = maapallonVarit(asetukset);
  const kangas = doc?.createElement?.('canvas');
  const ctx = kangas?.getContext?.('2d');
  if (!ctx) return null;
  kangas.width = leveys;
  kangas.height = korkeus;
  ctx.putImageData(new globalThis.ImageData(data, leveys, korkeus), 0, 0);
  return kangas.toDataURL('image/png');
}

/* ═══════════ 2b. PELIN OMA RELIEFI PALLON PINNAKSI ══════════════ */

/*
 * OMISTAJA 12.9.2026, sanatarkasti: *"Katsoitko topografia linssistä,
 * joka on jo aiemmin luotu peliin? Se varmaan sopisi aika hyvin kartan
 * pohjan rakentamiseksi pallolle."*
 *
 * SOPII, JA SE ON JO PELISSÄ. `assets/linssit/topografia-pallo.webp`
 * (4096 × 2048, 441 kt) on NOAA ETOPO1 -korkeusruudukko hypsometrisin
 * värein ja luoteesta varjostettuna, uudelleenprojisoituna laudan
 * Milleristä pallon tasaväliin (tools/tee-pallotopografia.mjs).
 * Vesistölinssi käyttää sitä jo (js/linssit/vesistot.js), joten kuva on
 * usein selaimen välimuistissa valmiiksi. Lisenssi on public domain
 * (NOAA), ja viite kulkee js/packs/linssi-topografia-kuva.js:ssä.
 *
 * MITÄ TÄMÄ RATKAISEE. Generoitu maapeittomaski on VYÖHYKEVÄRI: se
 * tietää leveysasteen muttei pituuspiiriä, joten Sahara jatkuu maapallon
 * ympäri ja Andit eivät näy. Reliefissä on oikea maasto — vuoret,
 * aavikot, merten syvyys — ja juuri se tekee pallosta tunnistettavan.
 *
 * ── KOLME ASIAA, JOTKA ON PAKKO HOITAA ───────────────────────────
 *
 *  1. NAVAT OVAT LÄPINÄKYVÄT. Lauta ulottuu vain −58°…76°, joten
 *     kuvassa on alfaltaan nolla Etelämantereen ja pohjoisimman
 *     arktisen kohdalla (tools/tee-pallotopografia.mjs sanoo tämän
 *     suoraan). Pallolla se olisi REIKÄ mustaan — ja juuri se on tämän
 *     linssin pahin virhe, koska taustalla on avaruus. GENEROITU MAA EI
 *     SIIS KATOA VAAN JÄÄ POHJALLE: reliefi piirretään sen PÄÄLLE, ja
 *     läpinäkyvien napojen kohdalla näkyy generoitu napajää
 *     (JAAN_VARI, JAAVYOHYKE) kuten ennenkin. Sauma on kuvan oma
 *     pehmeä alfareuna.
 *  2. VALON KOMPENSAATIO. Pallon valo kertoo pinnan kirkkauden
 *     kertoimella 1 + 0,6 · sin(lat) (ks. VALON_KOMPENSAATIO), ja
 *     ilman vastakaavaa reliefin pohjoinen palaisi puhtaaksi
 *     valkoiseksi samalla tavalla kuin generoitu napajää paloi.
 *     Reliefin pikselit jaetaan siksi rivikohtaisella kertoimella
 *     ENNEN päällepiirtoa — täsmälleen sama kaava kuin
 *     maapallonVarit-funktiossa.
 *  3. LATAUS EI SAA VIIVYTTÄÄ AVAUSTA. Linssi avautuu generoituun
 *     Maahan heti, ja reliefi vaihtuu tilalle sitten kun se on ladattu.
 *     Mitattu 12.9.2026 kontissa (SwiftShader, ohjelmistopiirto):
 *     lataus + ladonta + blob 817 ms — ja koko sen ajan pallo on jo
 *     ruudulla. Jos lataus ei onnistu (offline, kuva puuttuu), näkymä
 *     jää generoituun Maahan eikä mitään rikkoudu.
 *
 * ILMAKEHÄ, TÄHDET JA KIILLON POISTO EIVÄT MUUTU: ne ovat pallon
 * asetuksia eivätkä tekstuurin.
 */

/*
 * RELIEFIN VAKIOT JA VALINTA MUUTTIVAT OSOITETTA 16.9.2026
 * (js/linssit/reliefikuva.js). Topografialinssi ottaa pallon
 * pohjatekstuuriin saman valinnan kuin avaruusnäkymä, eikä samaa
 * laskua pidetä kahtena kopiona. Nimet viedään täältä edelleen ulos:
 * savukkeet, testit ja tämän moduulin oma koodi tuntevat ne näillä
 * nimillä, eikä rajapinta muuttunut.
 */
export {
  RELIEFIN_OSOITE,
  RELIEFIN_LEVEYS,
  RELIEFIN_KORKEUS,
  RELIEFIN_OSOITE_8K,
  RELIEFIN_8K_LEVEYS,
  RELIEFIN_8K_KORKEUS,
  RELIEFIN_8K_RAJA_CSS,
  RELIEFIN_8K_RAJA_LAITEPX,
  RELIEFIN_8K_KAYTOSSA,
  RELIEFI_KOKO_PALLO,
  RELIEFIN_KOKO_4K,
  RELIEFIN_KOKO_8K,
  LADONNAN_KATTO_PUHELIN,
  LADONNAN_RAJA_CSS,
  LADONNAN_KATTO,
  LADONNAN_KATTO_WEBKIT,
  LADONNAN_PIKSELIKATTO,
  webkitSelain,
  valitseReliefi,
  valitseLadonta,
};

/*
 * ── KYLLÄISYYS HIEMAN ALAS (PALLONÄKYMÄ 13) ───────────────────────
 *
 * Hypsometrinen väriasteikko on kartan asteikko: se on tehty
 * erottumaan paperilla, ei näyttämään maapallolta. Astronautin
 * ikkunassa värit ovat vaimeampia. Kylläisyys viedään siksi 0,8:aan
 * KANKAAN SUODATTIMELLA (`filter: saturate(0.8)`) siinä samassa
 * piirrossa, jolla reliefi ladotaan — ei omana pikselisilmukkanaan,
 * joka olisi 8,4 miljoonaa pikseliä JS-muistissa.
 *
 * VARAREITTI: jos selain ei tue kankaan suodatinta (vanha Safari),
 * sama tulos syntyy sekoitustilalla `saturation` harmaalla täytöllä —
 * alfa 1 − 0,8 vie kylläisyydestä viidenneksen. Tuki tunnistetaan
 * kirjoittamalla arvo ja lukemalla se takaisin.
 */
/** Reliefin kylläisyyskerroin (1 = ennallaan). */
export const RELIEFIN_SATURAATIO = 0.8;

/*
 * NAPOJEN HÄIVYTYS — reliefin reuna ei saa olla viiva.
 *
 * MITATTU KAAPPAUKSESTA 12.9.2026 (puhelin, avausnäkymä): reliefin
 * alfa loppuu KERRALLA 76°:ssa, ja generoitu napajää alkoi sen
 * yläpuolella terävänä valkoisena soikiona. Raja näytti kuvan reunalta
 * eikä jään reunalta.
 *
 * Reliefin alfa kerrotaan siksi liu'ulla, joka vie sen nollaan JO
 * ENNEN kuvan omaa reunaa: pohjoisessa 70°…76°, etelässä −52°…−58°.
 * Alla oleva generoitu Maa on samalla kaistalla jo osin jäätä
 * (JAAVYOHYKE 64…78), joten reliefi sulaa jäähän eikä lopu siihen.
 */
/** Reliefin häivytyskaista pohjoisessa ja etelässä (asteina). */
export const RELIEFIN_HAIVYTYS = { pohjoinen: [70, 76], etela: [-52, -58] };

/**
 * Reliefin alfan kerroin leveysasteella (1 = täysi, 0 = pois).
 * Puhdas funktio (tests/satelliitti-avaruus.test.mjs).
 */
export function reliefinAlfa(lat) {
  const [pa, pb] = RELIEFIN_HAIVYTYS.pohjoinen;
  const [ea, eb] = RELIEFIN_HAIVYTYS.etela;
  const l = Number(lat) || 0;
  if (l >= pa) return 1 - pehmea(pa, pb, l);
  if (l <= ea) return 1 - pehmea(-ea, -eb, -l);
  return 1;
}

/**
 * Valon kerroin leveysasteella — VALON_KOMPENSAATIOn käänteisluku.
 * Puhdas funktio; sekä liuku että testi lukevat tämän.
 */
export function valokerroin(lat) {
  return 1 / (1 + VALON_KOMPENSAATIO * Math.max(0, Math.sin(((Number(lat) || 0) * Math.PI) / 180)));
}

/**
 * Liu'un pysäkit: 181 kappaletta eli YHDEN asteen välein navalta
 * navalle. Yksi aste riittää molemmille liu'uille — valon käyrä on
 * loiva, ja napojen häivytyskaista on 6° leveä, joten siihen osuu
 * kuusi pysäkkiä. Puhdas funktio, jotta testi näkee saman taulukon
 * kuin selain.
 */
export function liuunPysakit(arvo, maara = 180) {
  const ulos = [];
  for (let i = 0; i <= maara; i += 1) {
    const t = i / maara;
    const lat = 90 - t * 180;
    ulos.push({ t, lat, arvo: arvo(lat) });
  }
  return ulos;
}

/*
 * ── MIKSI LIUKU EIKÄ PIKSELISILMUKKA ─────────────────────────────
 *
 * Valon vastakaava ja napojen häivytys ovat molemmat RIVIKOHTAISIA:
 * arvo riippuu vain leveysasteesta. 4096 × 2048 -kuvassa se olisi
 * 8,4 miljoonaa pikseliä ja 33 Mt:n Uint8ClampedArray joka kerta, kun
 * linssi avataan — puhelimella kohtuuton. Sama tulos syntyy kahdella
 * pystyliu'ulla, jotka selain piirtää näytönohjaimella.
 *
 * MULTIPLY YKSIN EI RIITÄ: `multiply` yhdistää alfat source-overina,
 * joten läpinäkyvät navat täyttyisivät harmaalla. Siksi kolmas askel
 * `destination-in` piirtää alkuperäisen kuvan uudestaan ja palauttaa
 * alfan täsmälleen; vasta sen jälkeen navat häivytetään.
 */
function valoLiuku(ctx, leveys, korkeus) {
  const g = ctx.createLinearGradient(0, 0, 0, korkeus);
  for (const p of liuunPysakit(valokerroin)) {
    const v = Math.round(255 * p.arvo);
    g.addColorStop(p.t, `rgb(${v},${v},${v})`);
  }
  ctx.globalCompositeOperation = 'multiply';
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, leveys, korkeus);
  ctx.globalCompositeOperation = 'source-over';
}

function napaLiuku(ctx, leveys, korkeus) {
  const g = ctx.createLinearGradient(0, 0, 0, korkeus);
  for (const p of liuunPysakit(reliefinAlfa)) {
    g.addColorStop(p.t, `rgba(0,0,0,${(1 - p.arvo).toFixed(4)})`);
  }
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, leveys, korkeus);
  ctx.globalCompositeOperation = 'source-over';
}

/* ═══════════ 2b-diag. PALLODIAG: KETJU NÄKYVIIN PUHELIMELLA ═════ */

/*
 * LOKIN YDIN ASUU js/pallodiag.js:SSÄ (16.9.2026, WebKit-haara).
 * Avausketju alkaa jo ENNEN tätä moduulia — kirjaston lataus ja laudan
 * rakennus ovat js/pallo.js:ssä — eikä niistä saanut yhtään riviä,
 * kun loki oli linssin oma. Nimet viedään tästä edelleen ulos, joten
 * yksikään savukkeen tai testin tuonti ei muuttunut.
 */
export {
  DIAGIN_RIVIT, pallodiag, pallodiagLoki, pallodiagPaalla, pallodiagTeksti,
} from '../pallodiag.js';

/**
 * Kangas pois muistista. iOS Safari ei vapauta kankaan taustapuskuria
 * roskienkeruun tahdissa; nollamitta vapauttaa sen heti. Tämä on ainoa
 * keino pitää ketjun huippukulutus yhdessä kankaassa.
 */
function vapautaKangas(kangas) {
  try { kangas.width = 1; kangas.height = 1; } catch { /* ei kangas */ }
}

/**
 * Reliefi kankaalle kylläisyys laskettuna (RELIEFIN_SATURAATIO).
 * Palauttaa käytetyn tavan: `suodatin`, `pikselit`, `sekoitus` tai
 * `ei` (mikään ei ollut käytettävissä) — vartio lukee sen mittarista.
 *
 * KOLME TAPAA, KOSKA SAFARI. `ctx.filter` tuli WebKitiin vasta Safari
 * 17:ssä, ja sitä vanhemmat iOS-versiot ovat yhä käytössä. Ennen tätä
 * korjausta varareittinä oli pelkkä `saturation`-sekoitus, joka
 * KIRJOITTI HARMAAN KOKO KANKAALLE, jos sekään ei ollut tuettu:
 * `globalCompositeOperation` ei heitä virhettä tuntemattomasta
 * arvosta, vaan jättää edellisen (`source-over`) voimaan. Siksi arvo
 * luetaan nyt takaisin ennen täyttöä.
 *
 * Pikselisilmukka on tarkin mutta vaatii muistia leveys × korkeus × 4,
 * joten se sallitaan vain pienelle kankaalle. Puhelimen ladontakangas
 * (2048 × 1024 = 8 Mt) mahtuu siihen; 4k ja 8k eivät.
 */
export const PIKSELISATURAATION_KATTO = 2048 * 1024;

export function kyllaisyysAlas(ctx, kuva, leveys, korkeus, kerroin = RELIEFIN_SATURAATIO) {
  const arvo = `saturate(${kerroin})`;
  let suodatin = false;
  try {
    ctx.filter = arvo;
    if (ctx.filter === arvo || ctx.filter === `saturate(${kerroin * 100}%)`) suodatin = true;
  } catch { suodatin = false; }
  ctx.drawImage(kuva, 0, 0, leveys, korkeus);
  try { ctx.filter = 'none'; } catch { /* suodatinta ei ollut */ }
  if (suodatin) return 'suodatin';
  /* 2. PIKSELITASO — tarkka, mutta vain pienelle kankaalle. */
  if (leveys * korkeus <= PIKSELISATURAATION_KATTO
    && typeof ctx.getImageData === 'function' && typeof ctx.putImageData === 'function') {
    try {
      const data = ctx.getImageData(0, 0, leveys, korkeus);
      const d = data.data;
      for (let i = 0; i < d.length; i += 4) {
        const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        d[i] = l + (d[i] - l) * kerroin;
        d[i + 1] = l + (d[i + 1] - l) * kerroin;
        d[i + 2] = l + (d[i + 2] - l) * kerroin;
      }
      ctx.putImageData(data, 0, 0);
      return 'pikselit';
    } catch { /* likainen kangas tai muisti lopussa → sekoitus */ }
  }
  /*
   * 3. VARAREITTI: harmaa täyttö sekoitustilassa `saturation` vie
   * kylläisyyttä alfan verran. `destination-in` palauttaa alfan
   * täsmälleen (sama syy kuin valoLiuussa: navat ovat läpinäkyvät).
   */
  try {
    ctx.globalCompositeOperation = 'saturation';
    if (ctx.globalCompositeOperation !== 'saturation') {
      ctx.globalCompositeOperation = 'source-over';
      return 'ei';
    }
    ctx.globalAlpha = Math.max(0, Math.min(1, 1 - kerroin));
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, leveys, korkeus);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(kuva, 0, 0, leveys, korkeus);
    ctx.globalCompositeOperation = 'source-over';
    return 'sekoitus';
  } catch {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }
  return 'ei';
}

/*
 * ── TYHJÄN KANKAAN TUNNISTUS ─────────────────────────────────────
 *
 * TÄMÄ ON KOKO KORJAUKSEN YDIN. iOS Safari ei kerro kankaan rajojen
 * ylityksestä poikkeuksella — se antaa kankaan, joka on kokonaan
 * läpinäkyvä. Sellainen menee toBlobin läpi, syntyy blob-osoite, ja
 * three.js piirtää läpinäkyvän tekstuurin MUSTANA. Ketju "onnistuu"
 * alusta loppuun ja pallo on musta.
 *
 * Siksi ladonta tarkistetaan pikseleistä ennen kuin tuloksesta tehdään
 * osoite: kymmenen näytettä eri puolilta karttaa, ja kirkkaimman on
 * ylitettävä kynnys. Näytteet ovat maalla ja merellä sekaisin mutta
 * eivät navoilla — Etelämanner on valkoinen ja kelpaisi tyhjällekin
 * kankaalle huonosti, Jäämeri taas on kuvan kirkkain kohta.
 *
 * JOS TARKISTUSTA EI VOI TEHDÄ (ei getImageDataa, likainen kangas),
 * ladonta hyväksytään. Vartija ei saa olla tiukempi kuin sen tieto.
 */
export const TYHJYYDEN_KYNNYS = 12;
/*
 * ── KYNNYS EI RIITÄ YKSIN (17.9.2026, LISÄYS 13 kohta 37) ─────────
 *
 * Musta pallo asennetussa macOS-WebAppissa LÄPÄISI tämän tarkistuksen
 * (`vartija puute=ei`, 64 pistettä, tekstuuri silti musta). Kaksi
 * aukkoa, molemmat mitattuja:
 *
 *   1. NÄYTTEET OLIVAT VAIN KESKELTÄ. Kymmenen pistettä 12–86 %:n
 *      kaistalla eivät kerro mitään reunoista, ja juuri reunat jäävät
 *      piirtämättä, kun kangas on osittain rajan yli.
 *   2. YKSIVÄRISTÄ EI HYLÄTTY. Kynnys katsoo vain KIRKKAINTA näytettä:
 *      tasainen tummanharmaa tai yksivärinen täyttö menee läpi, vaikka
 *      oikeassa reliefissä on AINA meren ja maan ero.
 *
 * Siksi kolme ehtoa: kirkkain ylittää kynnyksen, keskiarvo ylittää
 * lähes mustan rajan, JA näytteiden välillä on vaihtelua. Vaihtelu on
 * se ehto, jota tyhjä tai yksivärinen kangas ei voi täyttää.
 */
const TYHJYYSNAYTTEET = [
  [0.12, 0.35], [0.28, 0.30], [0.30, 0.62], [0.46, 0.45], [0.52, 0.28],
  [0.58, 0.52], [0.70, 0.38], [0.78, 0.60], [0.86, 0.32], [0.50, 0.50],
  /* REUNAT MUKAAN: ylä-, ala-, vasen- ja oikealaita sekä kulmat. */
  [0.02, 0.5], [0.98, 0.5], [0.5, 0.02], [0.5, 0.98],
  [0.03, 0.04], [0.97, 0.04], [0.03, 0.96], [0.97, 0.96],
];
/** Lähes musta pinta: näytteiden keskiarvon alaraja. */
export const TUMMUUDEN_KYNNYS = 18;
/** Yksivärinen pinta: kirkkaimman ja tummimman näytteen pienin ero. */
export const VAIHTELUN_KYNNYS = 6;

/**
 * Onko ladottu kangas tyhjä, lähes musta tai yksivärinen?
 *
 * `false` tarkoittaa "kangas kelpaa" — myös silloin, kun tarkistusta ei
 * voi tehdä (ei getImageDataa, likainen kangas). Vartija ei saa olla
 * tiukempi kuin sen tieto.
 */
export function tyhjaKangas(ctx, leveys, korkeus, kynnys = TYHJYYDEN_KYNNYS) {
  if (typeof ctx?.getImageData !== 'function') return false;
  try {
    let paras = 0;
    let pienin = Infinity;
    let summa = 0;
    let n = 0;
    for (const [fx, fy] of TYHJYYSNAYTTEET) {
      const x = Math.min(leveys - 1, Math.max(0, Math.round(fx * leveys)));
      const y = Math.min(korkeus - 1, Math.max(0, Math.round(fy * korkeus)));
      const d = ctx.getImageData(x, y, 1, 1).data;
      const kirkkaus = Math.max(d[0], d[1], d[2]) * (d[3] / 255);
      if (kirkkaus > paras) paras = kirkkaus;
      if (kirkkaus < pienin) pienin = kirkkaus;
      summa += kirkkaus;
      n += 1;
    }
    if (!n) return false;
    if (paras < kynnys) return true;
    if (summa / n < TUMMUUDEN_KYNNYS) return true;
    return paras - pienin < VAIHTELUN_KYNNYS;
  } catch {
    return false;
  }
}

/**
 * YKSI LADONTAYRITYS annetuilla kankaan mitoilla. Palauttaa kankaan ja
 * käytetyn kylläisyystavan tai nullin (kangas jäi tyhjäksi tai heitti).
 * Kaikki apukankaat vapautetaan ennen paluuta.
 */
function ladoKerran({
  doc, ikkuna, kuva, leveys, korkeus, kokoPallo,
}) {
  let kangas = null;
  let apu = null;
  try {
    kangas = doc.createElement('canvas');
    const ctx = kangas.getContext?.('2d');
    if (!ctx) return null;
    kangas.width = leveys;
    kangas.height = korkeus;
    /*
     * 1. GENEROITU MAA POHJALLE omassa pienessä koossaan (1024 × 512).
     * Koko pallon kuva peittää sen kokonaan; se on vakuutus sen varalta,
     * että kuvan purku epäonnistuu kesken piirron.
     */
    let pohja = null;
    try {
      const perus = maapallonVarit({});
      pohja = doc.createElement('canvas');
      pohja.width = perus.leveys;
      pohja.height = perus.korkeus;
      pohja.getContext('2d').putImageData(
        new ikkuna.ImageData(perus.data, perus.leveys, perus.korkeus), 0, 0,
      );
      ctx.drawImage(pohja, 0, 0, leveys, korkeus);
    } catch { /* pohja on vakuutus, ei ehto */ } finally {
      if (pohja) vapautaKangas(pohja);
    }
    let tapa = 'ei';
    if (kokoPallo) {
      /*
       * YKSI KANGAS, EI KAHTA. Koko pallon kuvassa ei ole yhtään
       * läpinäkyvää pikseliä (navat ovat siinä mukana), joten alfan
       * palautusta ei tarvita eikä apukangasta sen kanssa. Ketjun
       * huippukulutus puolittuu — ja juuri se huippu oli se, joka
       * ylitti iOS Safarin rajan ja teki kankaasta tyhjän.
       */
      tapa = kyllaisyysAlas(ctx, kuva, leveys, korkeus);
      valoLiuku(ctx, leveys, korkeus);
    } else {
      apu = doc.createElement('canvas');
      apu.width = leveys;
      apu.height = korkeus;
      const actx = apu.getContext?.('2d');
      if (!actx) return null;
      tapa = kyllaisyysAlas(actx, kuva, leveys, korkeus);
      valoLiuku(actx, leveys, korkeus);
      // Alfa takaisin täsmälleen: multiply täytti navat harmaalla.
      actx.globalCompositeOperation = 'destination-in';
      actx.drawImage(kuva, 0, 0, leveys, korkeus);
      actx.globalCompositeOperation = 'source-over';
      napaLiuku(actx, leveys, korkeus);
      ctx.drawImage(apu, 0, 0);
      vapautaKangas(apu);
      apu = null;
    }
    if (tyhjaKangas(ctx, leveys, korkeus)) {
      vapautaKangas(kangas);
      return null;
    }
    return { kangas, tapa };
  } catch {
    if (apu) vapautaKangas(apu);
    if (kangas) vapautaKangas(kangas);
    return null;
  }
}

/** Ketjun aikakatko: tämän jälkeen generoitu Maa jää pinnalle. */
export const RELIEFIN_AIKAKATKO_MS = 8000;
/** Pienin ladontakangas, jota enää yritetään. */
export const LADONNAN_POHJA = 512;

/**
 * RELIEFI GENEROIDUN MAAN PÄÄLLE. Palauttaa lupauksen osoitteesta
 * (blob- tai data-URL) tai nullista (lataus ei onnistunut, kangas jäi
 * tyhjäksi, aika loppui, canvasia ei ole). Osoite vapautetaan linssin
 * purkaessa (vapautaReliefi).
 *
 * `kokoPallo` kertoo, kattaako kuva navat: silloin napoja ei häivytetä
 * eikä generoitua napajäätä maalata päälle (ks. napaLiuku), ja koko
 * ladonta mahtuu yhdelle kankaalle.
 *
 * `ruudunLeveys` on RUUDUN CSS-leveys (ei tekstuurin): se valitsee
 * ladontakankaan koon (valitseLadonta). Ilman sitä oletus on
 * puhelinkatto — varovaisempi arvaus on oikea arvaus, kun kyse on
 * mustasta pallosta.
 *
 * LUPAUS EI JÄÄ AUKI. Jos kuva ei lataudu eikä heitä virhettä
 * (Safarissa tavallista, kun yhteys katkeaa kesken), aikakatko
 * ratkaisee sen nullina ja generoitu vyöhykepallo jää pinnalle.
 *
 * @param {{ leveys?: number, korkeus?: number, osoite?: string,
 *   kokoPallo?: boolean, ruudunLeveys?: number, aikakatko?: number }} asetukset
 */
export function reliefiTekstuuri(asetukset = {}, doc = globalThis.document, ikkuna = globalThis) {
  /*
   * OLETUKSET TULEVAT VALINNASTA, EIVÄT VAKIOISTA. valitseReliefi({})
   * ilman ruudun mittoja antaa 4k-haaran — ja koko pallon kytkimen
   * ollessa päällä sen koko pallon version. Näin oletusosoite ja
   * oletuslippu eivät voi olla eri kuvista.
   */
  const oletus = valitseReliefi({});
  const {
    leveys = oletus.leveys, korkeus = oletus.korkeus, osoite = oletus.osoite,
    kokoPallo = oletus.kokoPallo, ruudunLeveys = 0,
    aikakatko = RELIEFIN_AIKAKATKO_MS,
  } = asetukset;
  if (!doc?.createElement || !ikkuna?.Image) return Promise.resolve(null);
  const koe = doc.createElement('canvas');
  if (!koe?.getContext?.('2d')) return Promise.resolve(null);
  vapautaKangas(koe);
  /*
   * WEBKIT SAA OMAN KATTONSA (LISÄYS 13 kohta 37). Selainperhe luetaan
   * tässä eikä valitseLadonnan sisällä, jotta funktio pysyy puhtaana ja
   * yksikkötesti voi antaa lipun kumpaankin suuntaan.
   */
  const webkit = webkitSelain(ikkuna?.navigator);
  const ensi = valitseLadonta({
    leveys, korkeus, ruudunLeveys, webkit,
  });
  const alku = diagNyt(ikkuna);
  pallodiag('alku', {
    lahde: `${leveys}x${korkeus}`, kangas: `${ensi.leveys}x${ensi.korkeus}`,
    ruutu: ruudunLeveys, kokoPallo: kokoPallo ? 1 : 0, webkit: webkit ? 1 : 0,
  }, ikkuna);

  return new Promise((valmis) => {
    let ratkaistu = false;
    let kello = 0;
    const paata = (url, syy) => {
      if (ratkaistu) return;
      ratkaistu = true;
      if (kello) { try { ikkuna.clearTimeout?.(kello); } catch { /* ei kelloa */ } }
      pallodiag('valmis', {
        syy, osoite: url ? url.slice(0, 12) : 'ei', ms: Math.round(diagNyt(ikkuna) - alku),
      }, ikkuna);
      valmis(url ?? null);
    };
    try {
      kello = ikkuna.setTimeout?.(() => paata(null, 'aikakatko'), aikakatko) ?? 0;
    } catch { kello = 0; }

    /* Valmis kangas osoitteeksi ja heti pois muistista. */
    const ulos = (kangas) => {
      const lopeta = (url, syy) => { vapautaKangas(kangas); paata(url, syy); };
      try {
        if (typeof kangas.toBlob === 'function' && ikkuna.URL?.createObjectURL) {
          const t0 = diagNyt(ikkuna);
          kangas.toBlob((blob) => {
            if (!blob) {
              pallodiag('blob-tyhja', {}, ikkuna);
              try { lopeta(kangas.toDataURL('image/png'), 'dataurl'); } catch { lopeta(null, 'blob-ei'); }
              return;
            }
            pallodiag('blob', { kt: Math.round(blob.size / 1024), ms: Math.round(diagNyt(ikkuna) - t0) }, ikkuna);
            let url = null;
            try { url = ikkuna.URL.createObjectURL(blob); } catch { url = null; }
            lopeta(url, url ? 'blob' : 'blob-osoite-ei');
          }, 'image/png');
          return;
        }
        lopeta(kangas.toDataURL('image/png'), 'dataurl');
      } catch {
        lopeta(null, 'pakkaus-heitti');
      }
    };

    const kuva = new ikkuna.Image();
    kuva.decoding = 'async';
    // Kuva on samasta alkuperästä (repo), mutta crossOrigin pitää
    // canvasin puhtaana myös silloin kun peli on avattu toiselta
    // isännältä — likainen canvas ei anna toDataURLia lainkaan.
    kuva.crossOrigin = 'anonymous';
    kuva.addEventListener('error', () => paata(null, 'lataus-ei'), { once: true });
    kuva.addEventListener('load', () => {
      pallodiag('kuva', {
        px: `${kuva.naturalWidth ?? '?'}x${kuva.naturalHeight ?? '?'}`,
        ms: Math.round(diagNyt(ikkuna) - alku),
      }, ikkuna);
      /*
       * LADONTA JA TARVITTAESSA PUOLITUS. Ensimmäinen koko on ruudun
       * mukaan valittu; jos kangas jää siitä huolimatta tyhjäksi
       * (laitteessa oli jo muuta kuormaa), pienempi yleensä mahtuu.
       * Kolme yritystä riittää: 8192 → 4096 → 2048.
       */
      let mitat = { leveys: ensi.leveys, korkeus: ensi.korkeus };
      for (let n = 0; n < 3 && !ratkaistu; n += 1) {
        const t0 = diagNyt(ikkuna);
        const tulos = ladoKerran({
          doc, ikkuna, kuva, leveys: mitat.leveys, korkeus: mitat.korkeus, kokoPallo,
        });
        pallodiag('ladonta', {
          koko: `${mitat.leveys}x${mitat.korkeus}`, ok: tulos ? 1 : 0,
          tapa: tulos?.tapa ?? '-', ms: Math.round(diagNyt(ikkuna) - t0),
        }, ikkuna);
        if (tulos) { ulos(tulos.kangas); return; }
        if (mitat.leveys <= LADONNAN_POHJA) break;
        mitat = {
          leveys: Math.round(mitat.leveys / 2),
          korkeus: Math.max(1, Math.round(mitat.korkeus / 2)),
        };
      }
      paata(null, 'kangas-tyhja');
    }, { once: true });
    kuva.src = osoite;
  });
}

/* ═══════════ 2c. ISS RADALLAAN JA AURINKO SIVULTA ═══════════════ */

/*
 * OMISTAJAN LINJAUS (Raamattu, "ASTRONAUTIN KAMERA: VALOKUVANÄKYMÄ
 * UUSIKSI 2", PALLONÄKYMÄ 11–13): avaruusvaiheen pallo saa kolme
 * lisää — kiertävän ISS:n, auringon sivuvalon pallon reunalla ja
 * hillitymmän kylläisyyden.
 *
 * ── MISSÄ NÄMÄ PIIRRETÄÄN JA MIKSI ────────────────────────────────
 *
 * ISS, ratakaari ja reunavarjo ovat KOTELON KALVOLLA (DOM + SVG)
 * eivätkä three.js-olioita. Kolme syytä, kaikki mitattuja tämän pelin
 * omista ratkaisuista:
 *
 *  1. Globe.gl kantaa three.js:n sisällään EIKÄ vie sitä ulos
 *     (js/pallolauta/linssit.js kertoo saman): jokainen uusi olio
 *     pitäisi rakentaa heijastuksella jonkin olemassa olevan
 *     `constructor`ista. Kalvo ei tarvitse kirjastosta mitään.
 *  2. PISTEET JÄÄVÄT VARJON PÄÄLLE ILMAN ERIKOISJÄRJESTELYÄ. Kalvo
 *     työnnetään kirjaston CSS2D-kerroksen ETEEN samaan vanhempaan
 *     (sama kuvio kuin js/pallolauta/linssit.js kalvoRuudulle `alle`):
 *     se peittää WebGL-kankaan mutta jää kohdemerkkien alle. Varjo ei
 *     siis voi himmentää yhtäkään kohdepistettä eikä estää napautusta
 *     (pointer-events: none, ja osuma lasketaan pallon omasta
 *     napautuksesta).
 *  3. PALLO ON AINA KOTELON KESKELLÄ ja sen halkaisija ruudulla
 *     tiedetään kaavasta (halkaisijaRuudulla). Reunavarjo on siis
 *     täsmälleen se ympyrä, jonka pelaaja näkee — ilman
 *     syvyyspuskurin, polygonOffsetin tai ilmakehäkuoren kanssa
 *     painimista.
 *
 * SYVYYS HOIDETAAN HORISONTTITESTILLÄ, ei syvyyspuskurilla: piste P
 * (|P| = säde · 1,06) on kameran C näkemällä puolella tasan silloin,
 * kun P · C > säde² — pallon oma horisontti. Takapuolen kaari ja
 * takana oleva ISS jäävät siis pois piirrosta, kuten tilaus sanoo.
 */

/** ISS:n radan kaltevuus (astetta) — oikean aseman inklinaatio. */
export const ISS_INKLINAATIO = 51.6;
/** Radan korkeus pallonsäteinä (n. 6 % pinnan yläpuolella). */
export const ISS_KORKEUS = 0.06;
/**
 * Yksi kierros sekunteina. Oikea kierrosaika on 92 minuuttia; se olisi
 * ruudulla liikkumaton piste. Nopeutus on tilauksen oma luku (60–90 s),
 * ja 75 s antaa 4,8 astetta sekunnissa: kahdessa sekunnissa merkki on
 * siirtynyt selvästi (vartio mittaa juuri sen).
 */
export const ISS_KIERROS_S = 75;
/**
 * Radan solmun hidas kierto sekunteina. Rata pyörii maan mukana: yksi
 * kierros 15 minuutissa eli kahdestoistaosa siitä, mitä merkki itse
 * kulkee. Silmä näkee sen vain pitkään katsoessa, ja se estää radan
 * jäämisen ikuisesti samaan kohtaan ruutua.
 */
export const ISS_SOLMUN_KIERTO_S = 900;
/** Merkin halkaisija ruudulla (px) — tilaus 6–10. */
export const ISS_MERKIN_PX = 8;
/** Ratakaaren pisteet (koko kierros); takapuoli karsitaan piirrossa. */
export const ISS_KAAREN_PISTEITA = 240;
/** Kaaren paksuus ja sävy: kuultava viiva, ei valokaapeli. */
export const ISS_KAAREN_LEVEYS_PX = 1.1;
export const ISS_KAAREN_VARI = 'rgba(198, 222, 255, 0.34)';
/** Merkin sävy: kirkas, hieman sinertävä piste. */
export const ISS_VARI = '#f2f8ff';

/**
 * Radan piste: kulma radalla (u) ja nousevan solmun pituus (solmu),
 * molemmat asteina. Puhdas funktio (tests/satelliitti-avaruus.test.mjs).
 *
 * Pallokolmio: sin(lat) = sin(i) · sin(u), ja pituusero solmusta on
 * atan2(cos(i) · sin(u), cos(u)).
 */
export function radanPiste(u, solmu = 0, inklinaatio = ISS_INKLINAATIO) {
  const r = Math.PI / 180;
  const i = inklinaatio * r;
  const a = (Number(u) || 0) * r;
  const lat = Math.asin(Math.sin(i) * Math.sin(a)) / r;
  let lng = (Number(solmu) || 0) + Math.atan2(Math.cos(i) * Math.sin(a), Math.cos(a)) / r;
  lng = ((lng + 180) % 360 + 360) % 360 - 180;
  return { lat, lng };
}

/** ISS:n paikka hetkellä t (sekunteina linssin avauksesta). */
export function issPaikka(t) {
  const s = Number(t) || 0;
  return radanPiste((360 * s) / ISS_KIERROS_S, (-360 * s) / ISS_SOLMUN_KIERTO_S);
}

/** Koko radan pisteet hetkellä t (kaaren piirtoa varten). */
export function issKaari(t, maara = ISS_KAAREN_PISTEITA) {
  const s = Number(t) || 0;
  const solmu = (-360 * s) / ISS_SOLMUN_KIERTO_S;
  const n = Math.max(8, Math.round(maara));
  const ulos = [];
  for (let k = 0; k <= n; k += 1) ulos.push(radanPiste((360 * k) / n, solmu));
  return ulos;
}

/**
 * Onko piste kameran näkemällä puolella? Pallon horisonttitaso on
 * { X : X · C = säde² }, joten näkyvä puoli on P · C > säde².
 * Pinnan pisteillä tämä on sama kuin js/pallolauta/lauta.js
 * pisteEdessa; radan korkeudella se päästää merkin näkyviin myös
 * horisontin yli, kuten oikeastikin.
 */
export function radallaEdessa(kamera, piste, sade) {
  if (!kamera || !piste) return false;
  const R = Number(sade) || 0;
  return kamera.x * piste.x + kamera.y * piste.y + kamera.z * piste.z > R * R;
}

/*
 * ── AURINKO SIVULLA (PALLONÄKYMÄ 12) ──────────────────────────────
 *
 * Astronautin ikkunassa Maa ei ole tasaisesti valaistu levy: toinen
 * reuna painuu varjoon ja toisella on kapea kirkas kaistale. Vaikutus
 * on REUNAN OMA — keskusta jää koskematta, koska muuten koko pallo
 * tummuisi ja reliefin maasto katoaisi.
 *
 * Luvut ovat tilauksesta: varjo 0 → 0,55 viimeisellä 12 %:lla säteestä,
 * vastakkainen reuna 0 → 0,18 valkoista viimeisellä 8 %:lla. Molemmat
 * ovat CSS-liukuja ympyrässä, jonka säde on pallon oma säde ruudulla;
 * liu'un ulkopuolella (yli 100 %) alfa katkaistaan nollaan, jottei
 * tummennus vuoda tähtitaivaalle.
 */
/** Varjon syvin alfa ja sen kaista säteestä. */
export const VARJON_ALFA = 0.55;
export const VARJON_KAISTA = 0.12;
/** Valoreunan voimakkain alfa ja sen kaista säteestä. */
export const VALOREUNAN_ALFA = 0.18;
export const VALOREUNAN_KAISTA = 0.08;
/**
 * Kummalla puolella aurinko on. `oikea` = valo oikealta, varjo
 * vasemmalla — sama suunta kuin reliefin omassa varjostuksessa
 * (luoteesta) ei ole mahdollinen, koska reliefi on pinnan kuva ja tämä
 * on ruudun ilmiö; tilaus sanoo vain "esim. vasen/oikea".
 */
export const AURINGON_PUOLI = 'oikea';
/**
 * Puolen häivytys: sivuttaisliuku, joka vie varjon nollaan ruudun
 * toisella laidalla. Ilman sitä varjo olisi tasainen rengas eikä
 * sirppi.
 */
export const PUOLEN_HAIVYTYS = 0.62;

/** Varjon liukutausta (CSS). Puhdas funktio, jotta testi näkee saman. */
export function varjonTausta() {
  const alku = ((1 - VARJON_KAISTA) * 100).toFixed(1);
  return `radial-gradient(circle closest-side at 50% 50%, rgba(0,0,0,0) ${alku}%,`
    + ` rgba(0,0,0,${VARJON_ALFA}) 100%, rgba(0,0,0,0) 100%)`;
}

/** Valoreunan liukutausta (CSS). */
export function valoreunanTausta() {
  const alku = ((1 - VALOREUNAN_KAISTA) * 100).toFixed(1);
  return `radial-gradient(circle closest-side at 50% 50%, rgba(255,255,255,0) ${alku}%,`
    + ` rgba(255,255,255,${VALOREUNAN_ALFA}) 100%, rgba(255,255,255,0) 100%)`;
}

/** Puolen maski: `varjo` menee auringosta poispäin, `valo` aurinkoon. */
export function puolenMaski(laji) {
  const aurinkoOikealla = AURINGON_PUOLI === 'oikea';
  const varjoVasemmalla = laji === 'varjo' ? aurinkoOikealla : !aurinkoOikealla;
  const suunta = varjoVasemmalla ? 'right' : 'left';
  const loppu = (PUOLEN_HAIVYTYS * 100).toFixed(0);
  // `to right` = musta vasemmalla → maski jättää vasemman laidan näkyviin.
  return `linear-gradient(to ${suunta}, #000 0%, rgba(0,0,0,0) ${loppu}%)`;
}

/** Kalvon elementtien luokat (vartiot etsivät näillä). */
export const KALVON_LUOKKA = 'astro-kalvo';
export const ISSIN_LUOKKA = 'astro-iss';
export const RADAN_LUOKKA = 'astro-rata';
export const VARJON_LUOKKA = 'astro-varjo';
export const VALOREUNAN_LUOKKA = 'astro-valoreuna';

/**
 * AVARUUSVAIHEEN KALVO: ISS, ratakaari ja auringon sivuvalo.
 *
 * Palauttaa kahvan, jonka `paivita(nyt, korkeus)` ajetaan linssin
 * omassa kehyssilmukassa. Kaikki mitat luetaan kotelosta ja kameran
 * korkeudesta, joten zoom ja laitteen kääntö hoituvat itsestään.
 *
 * LIIKKEENVÄHENNYS: `reduced` jäädyttää ISS:n ja radan hetkeen 0 —
 * merkki ja kaari ovat paikallaan, mutta näkyvissä.
 */
export function luoAvaruusKalvo({
  pallo, kotelo, reduced = false, ikkuna = globalThis,
} = {}) {
  const doc = ikkuna?.document;
  if (!pallo?.getScreenCoords || !kotelo || !doc?.createElement) return null;
  const SVG = 'http://www.w3.org/2000/svg';
  const kalvo = doc.createElement('div');
  kalvo.className = KALVON_LUOKKA;
  kalvo.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden;';

  const varjo = doc.createElement('div');
  varjo.className = VARJON_LUOKKA;
  const valoreuna = doc.createElement('div');
  valoreuna.className = VALOREUNAN_LUOKKA;
  for (const [el, tausta, laji] of [[varjo, varjonTausta(), 'varjo'],
    [valoreuna, valoreunanTausta(), 'valo']]) {
    const maski = puolenMaski(laji);
    el.style.cssText = 'position:absolute;left:0;top:0;pointer-events:none;'
      + `background:${tausta};-webkit-mask-image:${maski};mask-image:${maski};`;
  }

  const rata = doc.createElementNS(SVG, 'svg');
  rata.setAttribute('class', RADAN_LUOKKA);
  rata.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible;';
  const viiva = doc.createElementNS(SVG, 'path');
  viiva.setAttribute('fill', 'none');
  viiva.setAttribute('stroke', ISS_KAAREN_VARI);
  viiva.setAttribute('stroke-width', String(ISS_KAAREN_LEVEYS_PX));
  viiva.setAttribute('stroke-linecap', 'round');
  rata.appendChild(viiva);

  const iss = doc.createElement('div');
  iss.className = ISSIN_LUOKKA;
  iss.setAttribute('aria-hidden', 'true');
  iss.style.cssText = `position:absolute;left:0;top:0;width:${ISS_MERKIN_PX}px;height:${ISS_MERKIN_PX}px;`
    + `margin:${-ISS_MERKIN_PX / 2}px 0 0 ${-ISS_MERKIN_PX / 2}px;border-radius:50%;`
    + `background:${ISS_VARI};box-shadow:0 0 ${ISS_MERKIN_PX}px rgba(210,230,255,0.85),`
    + `0 0 ${ISS_MERKIN_PX * 2}px rgba(150,190,255,0.45);pointer-events:none;`;

  kalvo.append(varjo, valoreuna, rata, iss);

  /*
   * PAIKKA PINOSSA: kirjaston CSS2D-kerroksen ETEEN, jolloin kalvo on
   * WebGL-kankaan päällä mutta kohdemerkkien ALLA (ks. luvun alku,
   * kohta 2). Kerros syntyy vasta ensimmäisestä merkistä, joten paikka
   * tarkistetaan uudelleen, kunnes se löytyy.
   */
  let paikallaan = false;
  const merkkikerros = () => {
    const merkki = kotelo.querySelector?.('.pallolauta-merkki, .satelliitti-piste');
    const kerros = merkki?.closest?.('.pallolauta-merkki')?.parentElement
      ?? merkki?.parentElement ?? null;
    return kerros && kerros !== kotelo && kotelo.contains(kerros) ? kerros : null;
  };
  const sijoita = () => {
    if (paikallaan) return;
    const kerros = merkkikerros();
    if (kerros?.parentElement) {
      kerros.parentElement.insertBefore(kalvo, kerros);
      paikallaan = true;
      return;
    }
    if (!kalvo.parentElement) kotelo.appendChild(kalvo);
  };
  sijoita();

  let varjostus = true;
  let sadePx = 0;
  let issPiste = null;
  let kaarenPisteita = 0;
  let aika = 0;
  let purettu = false;

  const asetaSade = (r) => {
    if (Math.abs(r - sadePx) < 0.5) return;
    sadePx = r;
    const d = `${(r * 2).toFixed(1)}px`;
    for (const el of [varjo, valoreuna]) {
      el.style.width = d;
      el.style.height = d;
      el.style.left = `calc(50% - ${r.toFixed(1)}px)`;
      el.style.top = `calc(50% - ${r.toFixed(1)}px)`;
    }
  };

  /**
   * Yksi kehys. `nyt` on kello millisekunteina (performance.now) ja
   * `korkeus` kameran korkeus pallonsäteinä.
   */
  const paivita = (nyt = 0, korkeus = 1) => {
    if (purettu) return;
    sijoita();
    const sade3d = pallo.getGlobeRadius?.() ?? 0;
    const kamera = pallo.camera?.()?.position;
    if (!sade3d || !kamera) return;
    asetaSade(halkaisijaRuudulla(korkeus, { korkeus: kotelo.clientHeight }) / 2);
    aika = reduced ? 0 : (Number(nyt) || 0) / 1000;

    /* ratakaari: näkyvä puoli katkoviivattomina jaksoina */
    const osat = [];
    let jakso = [];
    for (const p of issKaari(aika)) {
      const xyz = pallo.getCoords(p.lat, p.lng, ISS_KORKEUS);
      if (xyz && radallaEdessa(kamera, xyz, sade3d)) {
        const s = pallo.getScreenCoords(p.lat, p.lng, ISS_KORKEUS);
        if (s && Number.isFinite(s.x)) { jakso.push(s); continue; }
      }
      if (jakso.length > 1) osat.push(jakso);
      jakso = [];
    }
    if (jakso.length > 1) osat.push(jakso);
    kaarenPisteita = osat.reduce((n, o) => n + o.length, 0);
    viiva.setAttribute('d', osat
      .map((o) => o.map((s, i) => `${i ? 'L' : 'M'}${s.x.toFixed(1)} ${s.y.toFixed(1)}`).join(''))
      .join(' '));

    /*
     * MERKKI. Paikka lasketaan AINA, myös pallon takana: mittari
     * (tools/savukkeet/savuke-astro-pallo.mjs) lukee radan etenemisen
     * siitä, ja `nakyvissa` kertoo erikseen, piirretäänkö merkki.
     * Takapuolella elementti on peittävyydeltään nolla.
     */
    const kohta = issPaikka(aika);
    const xyz = pallo.getCoords(kohta.lat, kohta.lng, ISS_KORKEUS);
    const ruudulla = pallo.getScreenCoords(kohta.lat, kohta.lng, ISS_KORKEUS);
    const nakyvissa = Boolean(xyz && radallaEdessa(kamera, xyz, sade3d));
    if (ruudulla && Number.isFinite(ruudulla.x)) {
      issPiste = {
        x: +ruudulla.x.toFixed(1), y: +ruudulla.y.toFixed(1), ...kohta, nakyvissa,
      };
      iss.style.transform = `translate(${ruudulla.x.toFixed(1)}px, ${ruudulla.y.toFixed(1)}px)`;
    } else {
      issPiste = { x: null, y: null, ...kohta, nakyvissa: false };
    }
    iss.style.opacity = nakyvissa && issPiste.x !== null ? '1' : '0';
  };

  return {
    paivita,
    /** Vartion kytkin: varjo ja valoreuna pois/päälle samaan näkymään. */
    asetaVarjostus(paalla) {
      varjostus = Boolean(paalla);
      varjo.style.opacity = varjostus ? '1' : '0';
      valoreuna.style.opacity = varjostus ? '1' : '0';
    },
    tila: () => ({
      iss: issPiste,
      kaarenPisteita,
      sadePx: +sadePx.toFixed(1),
      varjostus,
      paikallaan,
      aika: +aika.toFixed(2),
    }),
    pura() {
      purettu = true;
      kalvo.remove?.();
    },
  };
}

/* ═════════════════ 3. NÄKYMÄN ASENNUS JA PURKU ══════════════════ */

/** Avaruuden taustaväri (kangas pallon takana). */
export const AVARUUDEN_TAUSTA = '#04060e';

/* ═══════════ 2d. AVAUS EI SAA JÄÄDÄ KESKEN ════════════════ */

/*
 * OMISTAJAN VIKA 16.9.2026 (Raamattu, ASTRONAUTIN KAMERA LISÄYS 11
 * kohta 34; Codexin live-QA asennetusta macOS Safari -sovelluksesta):
 * *"matkalaukku → Astronautin kamera → Aktivoi: näkymä jää tyhjäksi,
 * ruskea pinta ja X, ei palloa eikä pisteitä"*. Chrome toimi samasta
 * julkaisusta.
 *
 * KOLME ASIAA, JOTKA TEKIVÄT VIASTA NÄKYMÄTTÖMÄN:
 *   1. avausketjussa oli odotuksia ILMAN AIKAKATKOA (kirjaston lataus),
 *   2. yksi poikkeus kesken `avaa`-funktion jätti kohdepisteet
 *      lisäämättä mutta kelluvan ✕:n ruudulle, ja
 *   3. mikään ei TARKISTANUT, näkyykö ruudulla lopulta mitään.
 *
 * Tämä puhdas funktio on kohta 3. Se lukee mitatut luvut ja kertoo,
 * mikä avauksesta puuttuu — tai `null`, kun kaikki on paikallaan.
 * Puhdas, jotta yksikkötesti näkee sen ilman selainta
 * (tests/satelliitti-avaruus.test.mjs).
 *
 * JÄRJESTYS ON TARKOITUKSELLINEN: ensin ne puutteet, jotka selittävät
 * kaikki muut. Ilman kangasta ei ole pintaa, ilman pintaa ei ole
 * pisteitä — ja pelaajalle riittää yksi syy, ei viisi.
 */
export function avauksenPuute({
  avaruus = false, kotelo = null, kangas = null, pinnanOsoite = '',
  pisteita = 0, kontekstiHukassa = false, kehyksia = null, pinnanKirkkaus = null,
} = {}) {
  if (!avaruus) return 'avaruusnakyma';
  if (kontekstiHukassa) return 'webgl-konteksti';
  if (!(Number(kangas?.leveys) > 0) || !(Number(kangas?.korkeus) > 0)) return 'kangas';
  if (!(Number(kotelo?.leveys) > 0) || !(Number(kotelo?.korkeus) > 0)) return 'kotelo';
  /*
   * KEHYKSET ENNEN PINTAA JA PISTEITÄ (LISÄYS 13 kohta 36). Jos
   * yhtäkään kehystä ei ole piirretty, PINTA JA PISTEET EIVÄT VOI olla
   * ruudulla — ja silloin pelaajalle on kerrottava se eikä seurausta.
   * `null` tarkoittaa "ei mitattavissa" eikä ole puute.
   */
  if (kehyksia !== null && !(Number(kehyksia) > 0)) return 'kehykset';
  if (!String(pinnanOsoite ?? '')) return 'pinta';
  /*
   * MUSTA PINTA ON OMA PUUTTEENSA (LISÄYS 13 kohta 37). Osoite on
   * paikallaan ja pisteet ruudulla, mutta piirtopuskurista luettu
   * pallon keskusta on musta: tekstuuri ei päätynyt GPU:lle.
   */
  if (pinnanKirkkaus !== null && Number(pinnanKirkkaus) < PINNAN_MUSTAN_KYNNYS) return 'pinta-musta';
  if (!(Number(pisteita) > 0)) return 'pisteet';
  return null;
}

/** Puutteen selitys pelaajalle — yksi lause, ei koodinimiä. */
export const PUUTTEEN_SELITE = {
  avaruusnakyma: 'Maapalloa ei saatu käynnistettyä.',
  'webgl-konteksti': 'Laitteen 3D-piirto katkesi kesken avauksen.',
  kangas: 'Maapallon piirtopinta jäi tyhjäksi.',
  kotelo: 'Näkymälle ei jäänyt tilaa ruudulla.',
  kehykset: 'Laite ei piirtänyt näkymästä yhtään kuvaa.',
  pinta: 'Maapallon pintakuva ei latautunut.',
  'pinta-musta': 'Maapallon pintakuva jäi mustaksi.',
  pisteet: 'Kohdepisteitä ei saatu pallolle.',
  kirjasto: 'Maapallokirjasto ei latautunut.',
};

/** Onko pallon WebGL-konteksti menetetty? Null, jos ei tiedetä. */
export function kontekstiHukassa(pallo) {
  try {
    const gl = pallo?.renderer?.()?.getContext?.();
    if (!gl?.isContextLost) return false;
    return Boolean(gl.isContextLost());
  } catch { return false; }
}

/* ═══════════ 2e. MITÄ RUUDULLE OIKEASTI PIIRTYI ════════════════ */

/*
 * OMISTAJAN VIKA 17.9.2026 (Raamattu, ASTRONAUTIN KAMERA LISÄYS 13
 * kohta 37): asennetun macOS-WebAppin kolmannella avauksella pallo ja
 * 64 kohdepistettä näkyivät, mutta karttatekstuuri oli KOKONAAN MUSTA
 * — ja vartija sanoi `puute=ei`.
 *
 * SYY ON MITTARIN LAJI, EI SEN KYNNYS. Vanha vartija luki PINNAN
 * OSOITTEEN (`globeImageUrl` asetettu?) ja kohdepisteiden määrän
 * DOMissa. Molemmat kertovat AIKOMUKSESTA. Mustan pallon ketjussa
 * jokainen aikomus toteutui: kangas ladottiin, blob syntyi, osoite
 * asetettiin, three sai tekstuurin — ja vasta GPU:lla se jäi
 * lataamatta. Ainoa mittari, joka näkee sen, lukee PIKSELIT SIITÄ
 * PUSKURISTA, johon WebGL piirsi.
 *
 * MIKSI readPixels EIKÄ KUVAKAAPPAUS. Pelin WebGL-konteksti luodaan
 * ilman `preserveDrawingBuffer`ia (eikä sitä saa kytkeä päälle: se
 * maksaa joka kehyksellä), joten piirtopuskuri on luettavissa VAIN
 * samassa tehtävässä, jossa piirto tehtiin. Siksi tämä funktio piirtää
 * itse yhden kehyksen ja lukee pikselit heti perään — ei kaappausta,
 * ei kangaskopiota, ei odotusta.
 *
 * NÄYTTEET OVAT PALLON KESKELTÄ. Ilmakehän hohto on reunalla ja tähdet
 * pallon takana; keskeltä näkyy vain pinta. Ruudukko on 5 × 5 ja
 * kattaa 30 % pallon säteestä — riittävän laaja, ettei yksi musta
 * meri tai yksi valkoinen pilvi ratkaise.
 */

/** Pinta on musta, jos kirkkain näyte alittaa tämän. */
export const PINNAN_MUSTAN_KYNNYS = 12;
/** Näyteruudukon leveys (ruutua) ja kattavuus pallon säteestä. */
export const PINNAN_NAYTERUUTU = 5;
export const PINNAN_NAYTEOSUUS = 0.3;
/**
 * Viive pinnan vaihdosta mittaukseen (ms). Kirjasto lataa kuvan ja vie
 * sen GPU:lle omassa tahdissaan; mitattu Chromiumissa 8k-blobilla noin
 * 300 ms, joten 900 ms antaa hitaallekin laitteelle varaa.
 */
export const PINNAN_MITTAUKSEN_VIIVE_MS = 900;

/**
 * Pallon pinnan kirkkain näyte piirtopuskurista (0–255), tai `null`
 * jos mittausta ei voi tehdä (ei kontekstia, konteksti hukassa, ei
 * readPixelsia). `null` EI ole puute: vartija ei saa olla tiukempi
 * kuin sen tieto.
 */
export function pinnanKirkkaus(pallo, ikkuna = globalThis) {
  try {
    const piirtaja = pallo?.renderer?.();
    const gl = piirtaja?.getContext?.();
    const kangas = piirtaja?.domElement;
    if (!gl?.readPixels || !kangas?.width || !kangas?.height) return null;
    if (gl.isContextLost?.()) return null;
    /*
     * YKSI KEHYS OMIN KÄSIN. Ilman tätä puskuri on jo vaihdettu ja
     * readPixels palauttaa nollia — eli mittari väittäisi mustaa aina.
     */
    const nayttamo = pallo.scene?.();
    const kamera = pallo.camera?.();
    if (!nayttamo || !kamera || typeof piirtaja.render !== 'function') return null;
    piirtaja.render(nayttamo, kamera);
    /*
     * PALLON SÄDE RUUDULLA: kirjasto antaa kameran korkeuden säteinä,
     * ja pallo on kankaan keskellä. Jos sädettä ei saa, otetaan
     * näytteet kankaan keskeltä kiinteällä osuudella.
     */
    const sadePx = Math.max(
      8, Math.round(Math.min(kangas.width, kangas.height) * 0.25),
    );
    const askel = Math.max(
      1, Math.round((sadePx * 2 * PINNAN_NAYTEOSUUS) / (PINNAN_NAYTERUUTU - 1)),
    );
    const keskiX = Math.round(kangas.width / 2);
    const keskiY = Math.round(kangas.height / 2);
    const reuna = Math.floor(PINNAN_NAYTERUUTU / 2);
    const pikseli = new Uint8Array(4);
    let paras = 0;
    for (let iy = -reuna; iy <= reuna; iy += 1) {
      for (let ix = -reuna; ix <= reuna; ix += 1) {
        const x = Math.min(kangas.width - 1, Math.max(0, keskiX + ix * askel));
        const y = Math.min(kangas.height - 1, Math.max(0, keskiY + iy * askel));
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pikseli);
        const kirkkaus = Math.max(pikseli[0], pikseli[1], pikseli[2]);
        if (kirkkaus > paras) paras = kirkkaus;
      }
    }
    return paras;
  } catch { return null; }
}

/*
 * ── MATERIAALIN VÄRI VALKOISEKSI (LISÄYS 13 kohta 37 TARKENNUS) ────
 *
 * Globe.gl maalaa pohjapallon materiaalin MUSTAKSI aina, kun
 * `globeImageUrl` asetetaan nulliksi (kirjaston oma rivi:
 * `!n.color && (n.color = new Color(0))`). Musta jää materiaaliin, ja
 * kun tekstuuri myöhemmin saapuu, kirjasto asettaa `color = null` —
 * jolloin three.js EI ENÄÄ kirjoita `diffuse`-uniformia. Mustaa ei siis
 * saa pois `color.set()`illä (null-oliolla ei ole settiä) eikä
 * `needsUpdate`illa: materiaalille on annettava UUSI Color-olio.
 *
 * MITATTU (Mac-sessio 17.9.2026, oikea WebKit ja Chromium): `color.set`
 * ei auta, uusi `Color('#ffffff')` palauttaa pinnan (kirkkaus 65–68).
 *
 * Palauttaa `true`, jos väri kirjoitettiin.
 */
/*
 * ── PALLON SÄVY: HIEMAN TUMMEMPI KAUTTAALTAAN (LISÄYS 15 kohta 43) ─
 *
 * OMISTAJA 17.9.2026, sanatarkasti: *"Maapallo voisi olla myös hieman
 * tummempi kautta altaan, jolloin pisteiden hehku näkyisi
 * mielenkiintoisempana."* — *"Kauttaaltaan piti kirjoittaa."*
 *
 * Tummennus tehdään MATERIAALIN VÄRILLÄ eikä tekstuuria muokkaamalla:
 * `diffuse`-uniformi kertoo koko pinnan samalla kertoimella, joten sävy
 * laskee tasaisesti kauttaaltaan eikä mihinkään jää valoläikkää. 0,75
 * (0xbfbfbf) on mitattu määrä: hehkuvat kohdepisteet erottuvat, mutta
 * pinta pysyy selvästi luettavana — ja kaukana mustan kynnyksestä
 * (PINNAN_MUSTAN_KYNNYS), jota pinta-musta-vartija valvoo.
 *
 * SAMA SÄVY MYÖS SULUSSA. Sulku ei saa jättää materiaalia mustaksi
 * (LISÄYS 13 kohta 37), joten se kirjoittaa värin aina — nyt tämän
 * sävyn. Pelilaudalla pohjapallo on laattamoottorin alla, joten arvo
 * vaikuttaa vain seuraavan avauksen lähtötilaan.
 */
export const PALLON_SAVY = 0xbfbfbf;

/** Sävyvahdin kello: kuinka usein sävy tarkistetaan (ks. sävyvahti). */
export const SAVYN_TARKISTUS_MS = 400;

export function valkaiseMateriaali(materiaali, hex = 0xffffff) {
  try {
    if (!materiaali) return false;
    /*
     * COLOR-LUOKKA ILMAN GLOBAALIA THREE:Ä. `globalThis.THREE` on
     * olemassa vain jos joku muu on ladannut kirjaston; pohjapallon
     * `specular` on Color-olio, joten sen konstruktori kelpaa.
     */
    const Vari = globalThis.THREE?.Color ?? materiaali.specular?.constructor;
    if (typeof Vari !== 'function') {
      // Viimeinen oljenkorsi: jos väri on olemassa, se voidaan asettaa.
      if (materiaali.color?.setHex) {
        materiaali.color.setHex(hex ?? 0xffffff);
        materiaali.needsUpdate = true;
        return true;
      }
      return false;
    }
    materiaali.color = new Vari(hex ?? 0xffffff);
    materiaali.needsUpdate = true;
    return true;
  } catch { return false; }
}

/** Piirrettyjen kehysten laskuri (three: renderer.info.render.frame). */
export function piirrettyjaKehyksia(pallo) {
  try {
    const n = pallo?.renderer?.()?.info?.render?.frame;
    return Number.isFinite(n) ? n : null;
  } catch { return null; }
}

/*
 * ── KEHYSVAHTI: YKSIKÄÄN KEHYS EI PIIRTYNYT ──────────────────────
 *
 * OMISTAJAN VIKA 17.9.2026 (LISÄYS 13 kohta 36): asennetussa macOS-
 * WebAppissa avauksen JOKAINEN vaihe raportoi `ok=1` (pisteet 1 ms),
 * pinta, ladonta ja blob valmistuivat — ja silti ruutu jäi ruskeaksi
 * ja `pisteita=0` kahdesti.
 *
 * MITATTU (Chromium, kotelo 2539 × 1321, 17.9.2026): kun
 * requestAnimationFrame lakkaa kutsumasta takaisin linssin avautuessa,
 * saadaan TÄSMÄLLEEN tuo loki ja täsmälleen Codexin kuva. Syy on
 * yhteinen molemmille oireille:
 *
 *   • pallon pinta piirtyy WebGL-kankaalle vain render-silmukassa, ja
 *   • kohdepisteet ovat CSS2D-elementtejä, jotka CSS2DRenderer lisää
 *     DOMiin VASTA PIIRTÄESSÄÄN.
 *
 * `vaihe nimi=pisteet ok=1 ms=1` kertoo siis vain, että lista meni
 * kirjastolle (Kapsulen digest on 1 ms:n ajastin). DOMiin ne tulevat
 * vasta kehyksestä. Ilman kehyksiä ei ole palloa eikä pisteitä —
 * mutta AJASTIMET toimivat, joten vartija ja koko tekstuuriketju
 * ehtivät raportoida onnistumisensa.
 *
 * VAHTI EI VAIN MITTAA VAAN AJAA. Jos kehyslaskuri ei etene, se
 * pakottaa kirjaston piirtämään yhden kehyksen ajastimesta:
 * `pauseAnimation()` nollaa kirjaston kehyspyynnön ja
 * `resumeAnimation()` ajaa piirtosyklin HETI ja pyytää uuden kehyksen.
 * Näin linssi valmistuu silloinkin, kun laite ei anna kehyksiä.
 */

/** Kehysvahdin väli ja kesto (ms). */
export const KEHYSVAHDIN_VALI_MS = 300;
export const KEHYSVAHDIN_KESTO_MS = 12000;

/**
 * Kehysvahti pallolle. Palauttaa kahvan, jonka `tila()` kertoo
 * piirrettyjen ja pakotettujen kehysten määrän ja `pura()` lopettaa.
 */
export function varmistaKehykset(pallo, lauta = null, ikkuna = globalThis) {
  const alku = piirrettyjaKehyksia(pallo);
  let edellinen = alku;
  let pakotettuja = 0;
  let kierroksia = 0;
  let kello = 0;
  const pakota = () => {
    try {
      /*
       * PAUSE ENNEN RESUMEA, EI PELKKÄ RESUME: kirjasto ajaa
       * piirtosyklin vain, jos sen kehyspyyntö on tyhjä, ja `pause`
       * tyhjentää sen. Ilman paria resume olisi tyhjä kutsu.
       */
      pallo?.pauseAnimation?.();
      pallo?.resumeAnimation?.();
      pakotettuja += 1;
    } catch { /* kirjasto ei tue: vartija kertoo puutteen */ }
    try { lauta?.heraa?.(); } catch { /* ei lautaa */ }
  };
  const askel = () => {
    kierroksia += 1;
    const nyt = piirrettyjaKehyksia(pallo);
    /*
     * TAUSTALLA EI PAKOTETA. Piilotettu sivu ei kuulu pakottaa
     * piirtämään — se olisi akun tuhlausta eikä korjaisi mitään.
     */
    const piilossa = ikkuna?.document?.visibilityState === 'hidden';
    if (nyt !== null && nyt === edellinen && !piilossa) pakota();
    edellinen = nyt;
    if (kierroksia * KEHYSVAHDIN_VALI_MS >= KEHYSVAHDIN_KESTO_MS) {
      pallodiag('kehykset', {
        piirtoja: nyt ?? '?', alussa: alku ?? '?', pakotettu: pakotettuja,
      }, ikkuna);
      lopeta();
    }
  };
  const lopeta = () => {
    if (!kello) return;
    try { ikkuna.clearInterval?.(kello); } catch { /* ei kelloa */ }
    kello = 0;
  };
  try {
    kello = ikkuna.setInterval?.(askel, KEHYSVAHDIN_VALI_MS) ?? 0;
  } catch { kello = 0; }
  return {
    tila: () => ({
      piirtoja: piirrettyjaKehyksia(pallo),
      alussa: alku,
      pakotettuja,
      /** Onko yksikään kehys piirtynyt linssin avauksen jälkeen? */
      kehyksia: (() => {
        const nyt = piirrettyjaKehyksia(pallo);
        if (nyt === null || alku === null) return null;
        return nyt - alku;
      })(),
    }),
    pakota,
    pura: lopeta,
  };
}



/** Ilmakehän hehku reunalla: astronautin näkemä sininen kaista. */
export const ILMAKEHAN_VARI = '#7fb6ff';
export const ILMAKEHAN_KORKEUS = 0.25;
/**
 * Tähtitaivaan venytys. Kerroin 1 on laudan oma taivas pallon lähellä
 * (korkeudet 2,6–6,5 pallonsädettä); avausnäkymässä kamera on
 * korkeudella 1,6–4,5, joten kaukaisin kerros siirretään selvästi
 * kameran taakse — muuten tähdet olisivat osin kameran edessä.
 */
export const TAHTIEN_KERROIN = 1.6;

/**
 * PELIN OMAT KARTTAPINNAT POIS LINSSIN AJAKSI.
 *
 * Pallon päällä on 1873-kartan pintoja, jotka avaruudesta katsottuna
 * ovat väärää tarinaa — ja MITATTU 12.9.2026: ilman tätä linssi avautui
 * tähtitaivaaseen, jonka keskellä oli paperikartta.
 *
 *   • LAATTAKERROS (js/pallolaatat.js luoLaattakerros): pelin oma
 *     pyramidikerros pallon pinnalla. TÄMÄ on se, joka piirtää kartan —
 *     ei Globe.gl:n oma laattamoottori, joka suljetaan erikseen.
 *   • LEPOKERROS (js/pallo.js luoLepokerros): terävä kuva levossa.
 *   • NAPAKANNET JA -KALOTIT (js/pallo.js): paperinsävyinen kansi ja
 *     atsimutaalinen karttakuva navoilla.
 *   • VEKTORIT (js/pallovektorit.js): rantaviiva ja VALTIONRAJAT.
 *     Rajoja ei näy avaruuteen.
 *
 * MIKSI TOISTUVA PYYHKÄISY EIKÄ KERTAKYTKIN. Laattakerros rakentaa
 * uusia verkkoja aina kun kamera liikkuu JA kirjoittaa niiden
 * näkyvyyden itse häivytyksessä, eikä siinä ole ulkoista kytkintä;
 * kytkimen lisääminen sinne muuttaisi PELIN pallon koodia linssin
 * takia. Sen sijaan linssi pyyhkäisee näyttämön joka kehyksellä ja
 * sulkee sen, mitä löytää — noin 150 oliota, mikrosekunteja, ja koko
 * tieto siitä mitä linssi tekee jää yhteen tiedostoon. Sulkeminen
 * puretaan tarkalleen: jokaisen olion lähtöarvo on muistissa.
 *
 * VEKTORIT SULJETAAN MATERIAALISTA: kerros jakaa materiaalin lajeittain
 * (rannikko, rajat), joten `material.visible = false` sulkee myös ne
 * oliot, joita ei vielä ole olemassa.
 */
function piilotaKarttapinnat(pallo, lauta, ikkuna = globalThis) {
  /*
   * KERROS SULJETAAN PIIRTOKERROKSISTA, EI `visible`-lipusta. Mitattu
   * 12.9.2026: laattakerros kirjoittaa omien verkkojensa `visible`-lipun
   * uudestaan OMASSA kehyskutsussaan, joka ajetaan linssin pyyhkäisyn
   * JÄLKEEN samalla kehyksellä — yksi karttapinta jäi näkyviin
   * puhelimella ja työpöydällä, vaikka pyyhkäisy ajoi joka kehys.
   * three.js:n `layers`-maski on eri kenttä, jota mikään pelin kerros ei
   * kirjoita: maski 0 tarkoittaa, ettei yksikään kamera näe oliota.
   * Lähtömaski (yleensä 1) on muistissa ja kirjoitetaan purkaessa takaisin.
   */
  const maskit = new Map();
  const materiaalit = new Map();
  let purettu = false;
  const piiloon = (olio) => {
    if (!olio?.layers) return;
    if (!maskit.has(olio)) maskit.set(olio, olio.layers.mask);
    olio.layers.mask = 0;
  };
  const suljeMateriaali = (m) => {
    if (!m) return;
    if (!materiaalit.has(m)) materiaalit.set(m, m.visible);
    m.visible = false;
  };
  let pyyhkaisyja = 0;
  const pyyhkaise = () => {
    if (purettu) return;
    pyyhkaisyja += 1;
    pallo.scene?.()?.traverse?.((o) => {
      const ud = o?.userData;
      if (!ud) return;
      if (ud.laattakerros || ud.lepokerros || ud.napakansi || ud.napakalotti) piiloon(o);
      if (ud.pallovektorit && o.material) suljeMateriaali(o.material);
    });
  };
  pyyhkaise();
  /*
   * PINTAKERROS SEIS. `lauta.lepokerros()` antaa pallon pintakerroksen
   * kahvan — laattakerroksen, kun se on päällä (oletus), ja vanhan
   * lepokerroksen kun se on sammutettu (js/pallo.js pallonLepokerros).
   * `lukitse` pysäyttää päivityksen, jolloin uusia karttaverkkoja ei
   * synny linssin aikana lainkaan; `piilota` vie pois sen, mitä on jo
   * koottu. Vanhassa lepokerroksessa ei ole lukkoa (se ei kokoa
   * yleiskuvassa lainkaan), ja `?.` hoitaa senkin tapauksen.
   */
  const pintakerros = lauta?.lepokerros?.() ?? null;
  pintakerros?.lukitse?.(true);
  pintakerros?.piilota?.();
  /*
   * PYYHKÄISY AJETAAN JOKA KEHYS (linssin oma kehyssilmukka kutsuu
   * tätä). Ajastin ei riitä: laattakerros luo verkon vasta kun sen
   * tekstuuri on ladattu, JA se kirjoittaa oman näkyvyytensä takaisin
   * päälle häivytyksessä — mitattu 12.9.2026 iPadilla, jossa 200 ms:n
   * ajastimen väliin ehti yksi näkyvä karttapinta. Pyyhkäisy on yhden
   * näyttämön läpikäynti (noin 150 oliota), eli murto-osa siitä, mitä
   * three.js tekee samalla kehyksellä.
   */
  return {
    /** Mittari savukkeelle: montako pintaa on suljettu. */
    maara: () => maskit.size + materiaalit.size,
    /** Mittari: montako kertaa näyttämö on käyty läpi. */
    kertoja: () => pyyhkaisyja,
    /** Yksi pyyhkäisy: kehyssilmukka kutsuu. */
    pyyhkaise,
    pura() {
      if (purettu) return;
      purettu = true;
      pintakerros?.lukitse?.(false);
      for (const [olio, maski] of maskit) olio.layers.mask = maski;
      for (const [m, nakyi] of materiaalit) m.visible = nakyi;
      maskit.clear();
      materiaalit.clear();
    },
  };
}

/**
 * AVARUUSNÄKYMÄ PÄÄLLE. Palauttaa kahvan, jonka `pura` kirjoittaa
 * pallon lähtötilan takaisin sellaisenaan.
 *
 * @param {object} lauta pallolauta (js/pallolauta/lauta.js)
 * @param {{ ui?: object, ikkuna?: object }} asetukset
 */
export function avaaAvaruusnakyma(lauta, { ui = null, ikkuna = globalThis } = {}) {
  const pallo = lauta?.pallo;
  const kotelo = lauta?.kotelo;
  if (!pallo?.pointOfView) {
    pallodiag('avaruus', { ok: 0, syy: 'ei-palloa' }, ikkuna);
    return null;
  }
  const reduced = Boolean(ui?.reducedMotion);
  /*
   * VAIHELOKI AVAUKSESTA (`?pallodiag=1`). Asennetusta Safari-
   * sovelluksesta ei saa konsolia, joten jokainen avauksen vaihe
   * kirjataan lokiin: mistä ketju katkesi näkyy sitten ilmoituksessa
   * ilman kehittyökaluja (Raamattu, LISÄYS 11 kohta 34).
   */
  const kangasAlussa = pallo.renderer?.()?.domElement ?? null;
  pallodiag('avaruus-alku', {
    kotelo: `${kotelo?.clientWidth ?? 0}x${kotelo?.clientHeight ?? 0}`,
    kangas: `${kangasAlussa?.width ?? 0}x${kangasAlussa?.height ?? 0}`,
    hukassa: kontekstiHukassa(pallo) ? 1 : 0,
    itsenainen: ikkuna.navigator?.standalone === true ? 1 : 0,
    dpr: Math.round((ikkuna.devicePixelRatio ?? 1) * 10) / 10,
  }, ikkuna);
  /* Linssi on purettu: myöhässä saapuva reliefi ei enää kirjoita. */
  let purettu = false;

  /* ---- lähtötila talteen ------------------------------------------- */
  const lahto = {
    pov: { ...pallo.pointOfView() },
    tausta: pallo.backgroundColor?.(),
    ilmakehanVari: pallo.atmosphereColor?.(),
    ilmakehanKorkeus: pallo.atmosphereAltitude?.(),
    laattaUrl: pallo.globeTileEngineUrl?.(),
    kuvaUrl: pallo.globeImageUrl?.(),
  };

  /* ---- 1. pinta: generoitu Maa laattamoottorin tilalle -------------- */
  /*
   * LAATTAMOOTTORI ON SULJETTAVA, EI VAIN PEITETTÄVÄ. Globe.gl piirtää
   * joko laattaverkon TAI pohjapallon tekstuurilla — kirjaston oma rivi
   * on `tileEngine.visible = !(globeObj.visible = !globeTileEngineUrl)`.
   * Ilman moottorin sulkemista globeImageUrl ei näkyisi lainkaan.
   */
  let tekstuuri = null;
  try {
    tekstuuri = maapallonTekstuuri({}, ikkuna.document);
  } catch { tekstuuri = null; }
  if (tekstuuri) {
    pallo.globeTileEngineUrl(null);
    pallo.globeImageUrl(tekstuuri);
  }
  /*
   * RELIEFI PERÄSSÄ, EI ENNEN (ks. 2b). Avaus ei odota latausta: pallo
   * on jo ruudulla generoituna, ja oikea maasto vaihtuu tilalle kun
   * kuva saapuu. Jos linssi on jo suljettu (purettu), tekstuuria ei
   * kirjoiteta — muuten reliefi ilmestyisi pelin omalle pallolle.
   */
  let reliefiPaalla = false;
  let reliefinUrl = null;
  /*
   * TERÄVÄMPI KUVA VAIN LEVEÄLLE RUUDULLE (ks. valitseReliefi).
   * Valinta tehdään avattaessa eikä muutu kesken linssin: laitteen
   * kääntäminen ei saa panna toista 134 Mt:n tekstuuria latautumaan.
   */
  const reliefinValinta = valitseReliefi({
    leveys: ikkuna.innerWidth ?? 0, dpr: ikkuna.devicePixelRatio ?? 1,
  });
  const reliefiAlkoi = Date.now();
  let reliefinKesto = 0;
  /** Blob-osoite pois muistista (ks. reliefiTekstuuri). */
  const vapautaReliefi = () => {
    if (reliefinUrl?.startsWith?.('blob:')) {
      try { ikkuna.URL?.revokeObjectURL?.(reliefinUrl); } catch { /* jo vapautettu */ }
    }
    reliefinUrl = null;
  };
  /*
   * VARAPOLKU ON JO PINNALLA. Generoitu vyöhykepallo asetettiin yllä
   * heti, ennen kuin reliefiä edes pyydettiin, eikä sitä oteta pois
   * jos reliefi ei valmistu: `reliefiTekstuuri` palaa silloin nullina
   * (aikakatko 8 s, tyhjä kangas, latausvirhe) ja tämä haara ei tee
   * mitään. MUSTA PALLO EI OLE MAHDOLLINEN NÄIN KAUAN kuin generoitu
   * tekstuuri syntyi — ja sen ainoa kangas on 1024 × 512.
   *
   * `ruudunLeveys` valitsee ladontakankaan koon (valitseLadonta).
   */
  reliefiTekstuuri({
    leveys: reliefinValinta.leveys,
    korkeus: reliefinValinta.korkeus,
    osoite: reliefinValinta.osoite,
    kokoPallo: reliefinValinta.kokoPallo,
    ruudunLeveys: ikkuna.innerWidth ?? 0,
  }, ikkuna.document, ikkuna)
    .then((url) => {
      reliefinKesto = Date.now() - reliefiAlkoi;
      if (!url) return;
      // Linssi ehti sulkeutua latauksen aikana: osoite pois heti,
      // eikä pelin omalle pallolle kirjoiteta mitään.
      if (purettu || !tekstuuri) { reliefinUrl = url; vapautaReliefi(); return; }
      reliefinUrl = url;
      reliefiPaalla = true;
      pallo.globeImageUrl(url);
      lauta?.heraa?.();
      /*
       * PINNAN VAIHTO TARKISTETAAN RUUDULTA (LISÄYS 13 kohta 37).
       * Osoitteen asettaminen ei todista mitään: kuva puretaan ja
       * ladataan GPU:lle vasta tämän jälkeen, ja juuri siinä musta
       * pallo syntyi. Mittaus odottaa sen verran, että kirjasto ehtii
       * ladata tekstuurin, ja jos pinta on musta, GENEROITU
       * VYÖHYKEPALLO PALAA — se on väriä, ja väri on parempi kuin
       * oikea maasto, jota ei näy.
       */
      ajastaPinnanTarkistus();
    })
    .catch(() => { /* reliefiä ei saatu: generoitu Maa jää */ });
  /*
   * KIILTO POIS. Pohjapallon materiaali on MeshPhongMaterial, jonka
   * specular on 0x111111 ja shininess 30 — paperikartalla se ei näy,
   * mutta vaalealla jäällä suoraan navan yläpuolella olevan valon alla
   * se lisää oman heijastuksensa jo valmiiksi kirkkaimpaan kohtaan.
   * Maa ei kiillä avaruuteen kuin peili, joten linssin ajaksi nolla.
   */
  const materiaali = pallo.globeMaterial?.();
  const kiiltoEnnen = materiaali
    ? { spec: materiaali.specular?.getHex?.(), shine: materiaali.shininess }
    : null;
  if (materiaali) {
    materiaali.specular?.setHex?.(0x000000);
    materiaali.shininess = 0;
    materiaali.needsUpdate = true;
  }
  /*
   * ── MUSTA PINTA ON KIRJASTON VÄRI, EI TEKSTUURI ─────────────────
   *
   * MITATTU OIKEALLA WebKitillä JA CHROMIUMILLA (Mac-sessio 17.9.2026,
   * docs/raportit/viesti-fable-webkit-toisto-20260917.md luku 4;
   * Raamattu LISÄYS 13 kohta 37 TARKENNUS). Globe.gl 2.46.2:n oma rivi:
   *
   *   globeImageUrl
   *     ? TextureLoader.load(url, t => { n.map = t; n.color = null; ... })
   *     : !n.color && (n.color = new Color(0))
   *
   * Eli KUN OSOITE ON NULL, kirjasto maalaa materiaalin MUSTAKSI. Juuri
   * niin linssin sulku tekee: `globeImageUrl(lahto.kuvaUrl ?? null)`, ja
   * pelin lähtöarvo on null, koska peli piirtää laattamoottorilla.
   * Musta ei näy heti (laatat peittävät pallon), mutta SEURAAVASSA
   * avauksessa pallo tulee näkyviin HETI ja tekstuuri vasta
   * asynkronisesti: jos yksikin kehys ehtii väliin, sävyttimen
   * `diffuse`-uniformi saa mustan — ja kun tekstuuri saapuu, kirjasto
   * asettaa `color = null`, jolloin three.js ei enää kirjoita uniformia.
   * Lopputulos on musta × tekstuuri = MUSTA PALLO, vaikka kartta, valot
   * ja kangas ovat kunnossa.
   *
   * Siksi väri pakotetaan valkoiseksi ENNEN oman tekstuurin asetusta —
   * ja purussa uudestaan, jotta seuraava avaus ei peri mustaa.
   *
   * COLOR-LUOKKA ILMAN GLOBAALIA THREE:Ä: `specular` on Color-olio,
   * joten sen konstruktori on sama luokka (mitattu Mac-sessiossa).
   */
  const varinLahto = materiaali?.color?.getHex?.() ?? null;
  valkaiseMateriaali(materiaali, PALLON_SAVY);
  /*
   * ── SÄVYVAHTI: KIRJASTO NOLLAA VÄRIN, KUN TEKSTUURI SAAPUU ───────
   *
   * MITATTU 17.9.2026 (savuke-astro-pallo, työpöytä ja puhelin): avaus
   * kirjoittaa sävyn heti, mutta kun reliefi latautuu, globe.gl
   * käsittelee `globeImageUrl`in uudestaan ja pinta palaa TÄYTEEN
   * kirkkauteen (mitattu 167 = sama kuin valkoisella; sävyllä 124).
   * Yksi kirjoitus avauksessa ei siis riitä, koska tekstuuri saapuu
   * asynkronisesti vasta sen jälkeen.
   *
   * Vahti kirjoittaa sävyn takaisin aina, kun väri on nollattu tai
   * vaihtunut. Se ei piirrä mitään eikä pyöri kehystahdissa: 400 ms:n
   * kello ja kirjoitus VAIN kun arvo on väärä (laskuri kertoo, montako
   * kertaa). Sama vahti hoitaa myös varapolun jälkeisen tilanteen,
   * jossa pinnalle vaihdetaan toinen kuva.
   */
  let savyKirjoituksia = 0;
  const savyta = () => {
    if (purettu || !materiaali) return;
    const nyt = materiaali.color?.getHex?.() ?? null;
    if (nyt === PALLON_SAVY) return;
    if (valkaiseMateriaali(materiaali, PALLON_SAVY)) {
      savyKirjoituksia += 1;
      lauta?.heraa?.();
    }
  };
  const savyKello = ikkuna.setInterval?.(savyta, SAVYN_TARKISTUS_MS) ?? 0;
  pallo.backgroundColor?.(AVARUUDEN_TAUSTA);
  pallo.atmosphereColor?.(ILMAKEHAN_VARI);
  pallo.atmosphereAltitude?.(ILMAKEHAN_KORKEUS);
  /*
   * ── PINNAN MITTAUS JA VARAPOLKU (LISÄYS 13 kohta 37) ────────────
   *
   * `pinnanKirkkaus` piirtää yhden kehyksen ja lukee pallon keskustan
   * piirtopuskurista. Mittaus tehdään VAIN kun reliefi on juuri
   * vaihdettu pinnalle — generoitu vyöhykepallo on 1024 × 512 eikä voi
   * jäädä GPU:lle lataamatta.
   */
  let viimeisinKirkkaus = null;
  let pinnanKello = 0;
  let varapolullaKaytiin = false;
  let varinValkaisuTehty = false;
  const mittaaPinta = () => {
    const kirkkaus = pinnanKirkkaus(pallo, ikkuna);
    viimeisinKirkkaus = kirkkaus;
    pallodiag('pinta-mittaus', {
      kirkkaus: kirkkaus ?? '?', reliefi: reliefiPaalla ? 1 : 0,
      varapolku: varapolullaKaytiin ? 2 : (varinValkaisuTehty ? 1 : 0),
    }, ikkuna);
    if (kirkkaus === null || kirkkaus >= PINNAN_MUSTAN_KYNNYS) return kirkkaus;
    if (purettu) return kirkkaus;
    /*
     * ── VARAPOLKU KAHDESSA ASKELEESSA ───────────────────────────
     *
     * Mustalla pinnalla on KAKSI mahdollista syytä, ja ne vaativat eri
     * lääkkeen. Kumpikin on mitattu:
     *
     *   1. MATERIAALIN VÄRI (Mac-sessio 17.9.2026, oikea WebKit ja
     *      Chromium): globe.gl maalasi materiaalin mustaksi, kun
     *      `globeImageUrl` oli null. Tekstuuri on kunnossa — vain väri
     *      kertoo sen nollaksi. Lääke: UUSI valkoinen Color.
     *   2. TYHJÄ TEKSTUURI (pallo-musta-erä 16.9.2026, iOS Safari):
     *      ladontakangas jäi läpinäkyväksi, ja läpinäkyvä tekstuuri
     *      piirtyy mustana. Väri ei auta lainkaan — pinnalle on
     *      vaihdettava toinen kuva.
     *
     * Siksi askel 1 on väri ja askel 2 generoitu vyöhykepallo. Kumpikin
     * todistaa itsensä uudella mittauksella; jos kumpikaan ei auta,
     * `avauksenPuute` kertoo pelaajalle `pinta-musta`.
     */
    if (!varinValkaisuTehty) {
      varinValkaisuTehty = true;
      const valkaistiin = valkaiseMateriaali(materiaali, PALLON_SAVY);
      lauta?.heraa?.();
      pallodiag('pinta-musta', {
        askel: 1, toimenpide: valkaistiin ? 'vari-valkoiseksi' : 'ei-onnistunut', kirkkaus,
      }, ikkuna);
      ajastaPinnanTarkistus();
      return kirkkaus;
    }
    if (varapolullaKaytiin || !reliefiPaalla || !tekstuuri) return kirkkaus;
    /* Väri ei auttanut: tekstuuri itse on tyhjä. Generoitu Maa tilalle. */
    varapolullaKaytiin = true;
    reliefiPaalla = false;
    pallo.globeImageUrl(tekstuuri);
    valkaiseMateriaali(materiaali, PALLON_SAVY);
    lauta?.heraa?.();
    vapautaReliefi();
    pallodiag('pinta-musta', { askel: 2, toimenpide: 'vyohykepallo', kirkkaus }, ikkuna);
    ajastaPinnanTarkistus();
    return kirkkaus;
  };
  function ajastaPinnanTarkistus() {
    if (purettu) return;
    try { ikkuna.clearTimeout?.(pinnanKello); } catch { /* ei kelloa */ }
    try {
      pinnanKello = ikkuna.setTimeout?.(() => {
        pinnanKello = 0;
        if (!purettu) mittaaPinta();
      }, PINNAN_MITTAUKSEN_VIIVE_MS) ?? 0;
    } catch { pinnanKello = 0; }
  }
  /*
   * KEHYSVAHTI PÄÄLLE HETI (LISÄYS 13 kohta 36): ilman kehyksiä ei ole
   * palloa eikä kohdepisteitä, ja juuri se oli WebAppin vika.
   */
  const kehysvahti = varmistaKehykset(pallo, lauta, ikkuna);
  pallodiag('avaruus-pinta', {
    tekstuuri: tekstuuri ? 1 : 0, tarkkuus: reliefinValinta.tunnus,
  }, ikkuna);
  const pinnat = piilotaKarttapinnat(pallo, lauta, ikkuna);
  // Luokka kertoo CSS:lle, että pisteitä on ruudulla koko pallon verran
  // (css/satelliitti.css: nimet pienemmällä). Poistetaan purkaessa.
  ikkuna.document?.body?.classList?.add?.('satelliitti-avaruus');

  /* ---- 2. tähdet ---------------------------------------------------- */
  /*
   * TÄHDET PAIKALLAAN, PÖLY KESYTETTYNÄ (LISÄYS 15, kohdat 39, 40 ja
   * 44). Neliöt olivat pölykerros; omistaja halusi sen takaisin, kun
   * se saadaan toimimaan. `TAHTIKERROKSET_PAIKALLAAN` antaa pölyn
   * pyöristettynä, tähteä pienempänä ja `kattoPx`-rajalla (ei
   * lähikasvua), ja `ajautuma: false` sammuttaa kaiken oman liikkeen:
   * koko taivas pöly mukaan lukien kääntyy vain kameran mukana, kun
   * pelaaja pyörittää palloa.
   */
  const taivas = luoTahtitaivas(pallo, {
    reducedMotion: reduced,
    ikkuna,
    kerroin: TAHTIEN_KERROIN,
    kerrokset: TAHTIKERROKSET_PAIKALLAAN,
    ajautuma: false,
  });
  taivas?.paivita?.(0, 1);
  /* ---- 2b. ISS, ratakaari ja auringon sivuvalo (luku 2c) ----------- */
  const kalvo = luoAvaruusKalvo({
    pallo, kotelo, reduced, ikkuna,
  });
  /*
   * LINSSIN OMA KEHYSSILMUKKA. Kaksi työtä samassa silmukassa: pölyn
   * hidas ajautuma (tarvitsee kehyskellon; liikkeenvähennyksellä dt
   * jätetään antamatta, jolloin taivas on liikkumaton) ja karttapintojen
   * pyyhkäisy (ks. piilotaKarttapinnat). Silmukka elää vain linssin
   * ajan, eikä pallon oma silmukka tiedä siitä mitään.
   */
  let kehys = 0;
  let edellinen = 0;
  let nimetPaalla = false;
  /*
   * KORKEUS LUETAAN KAMERAN PAIKASTA eikä `pointOfView()`istä: kirjasto
   * rakentaa joka kutsulla uuden olion, ja tämä ajetaan joka kehyksellä.
   * Etäisyys = säde · (1 + korkeus), joten korkeus on suoraan
   * |kamera| / säde − 1.
   */
  const kameranKorkeus = () => {
    const sade = pallo.getGlobeRadius?.() ?? 0;
    const p = pallo.camera?.()?.position;
    if (sade > 0 && p?.length) return p.length() / sade - 1;
    return pallo.pointOfView?.()?.altitude ?? NaN;
  };
  const tahdistaNimet = () => {
    const nyt = nimetNakyvat(kameranKorkeus(), alt, nimetPaalla);
    if (nyt === nimetPaalla) return;
    nimetPaalla = nyt;
    ikkuna.document?.body?.classList?.toggle?.(NIMIEN_LUOKKA, nyt);
  };
  /*
   * ── HIDAS PYÖRIMINEN (kirjaston oma autoRotate) ──────────────────
   *
   * Lauta sammuttaa pyörimisen käynnistyessään (js/pallolauta/lauta.js:
   * *"Lauta ei pyöri itsekseen: se on pelilauta, ei näyteikkuna"*), ja
   * linssi sytyttää sen omaksi ajakseen. Lähtöarvo otetaan talteen ja
   * kirjoitetaan purkaessa takaisin — muuten pallo jäisi pyörimään
   * pelilaudalle linssin sulkemisen jälkeen.
   */
  const ohjaimet = pallo.controls?.();
  const pyorimisenLahto = ohjaimet
    ? { paalla: ohjaimet.autoRotate, nopeus: ohjaimet.autoRotateSpeed }
    : null;
  if (ohjaimet && !reduced) {
    ohjaimet.autoRotateSpeed = PYORIMISEN_NOPEUS;
    ohjaimet.autoRotate = true;
  }
  /** Pyöriikö pallo juuri nyt (vartio lukee tämän). */
  const pyorii = () => Boolean(ohjaimet?.autoRotate);

  /**
   * AVAUSAJON YKSI KEHYS: korkeus aloituksesta leponäkymään pehmeästi.
   * `dt` on kehysten väli millisekunteina (0 = pelkkä uudelleenpiirto,
   * esim. kotelon koon muutos kesken ajon).
   *
   * AIKA LASKETAAN KEHYKSISTÄ EIKÄ SEINÄKELLOSTA, ja yksittäinen väli
   * katkaistaan AVAUSAJON_KEHYSKATTO_MS:ään. Syy on MITATTU 16.9.2026
   * kontissa: linssin avaus tekee samaan aikaan reliefitekstuurin
   * (8 192 × 4 096 -kuvan purku, ladonta ja PNG-blob, 9–13 s), ja
   * seinäkellolla koko viiden sekunnin ajo kului SIINÄ — pallo hyppäsi
   * suoraan loppuasentoon eikä pelaaja nähnyt ajoa lainkaan. Katko
   * tekee pitkästä nykäyksestä yhden kehyksen mittaisen askeleen,
   * jolloin ajo näkyy kokonaan myös silloin kun laite tökkii.
   */
  const ajaAvaus = (dt) => {
    if (!avausajo.kaynnissa) return;
    if (reduced) {
      avausajo.osuus = 1;
    } else if (dt > 0) {
      avausajo.kulunut += Math.min(dt, AVAUSAJON_KEHYSKATTO_MS);
      avausajo.osuus = Math.min(1, avausajo.kulunut / AVAUSZOOMIN_KESTO_MS);
    }
    const k = avausPehmennys(avausajo.osuus);
    const korkeus = aloitusAlt + (alt - aloitusAlt) * k;
    // VAIN KORKEUS: kirjasto yhdistää tämän nykyiseen näkymään, joten
    // pyörivä lat/lng säilyy (ks. luvun 1 perustelu).
    pallo.pointOfView?.({ altitude: korkeus }, 0);
    lauta?.heraa?.();
    if (avausajo.osuus >= 1) paataAvausajo();
  };

  /**
   * AJO PÄÄTTYY joko perille tultuaan tai siihen, että pelaaja tarttuu
   * palloon. Katto lasketaan takaisin leponäkymän kaistaan ja kameran
   * sen hetkinen korkeus kirjataan linssin omaksi (omaKorkeus), jotta
   * myöhempi kotelon koon muutos ei nykäise pelaajan omaa zoomia.
   */
  const paataAvausajo = () => {
    if (!avausajo.kaynnissa) return;
    avausajo.kaynnissa = false;
    omaKorkeus = pallo.pointOfView?.()?.altitude ?? alt;
    lauta?.zoomirajat?.({ min: rajat.min, max: rajat.max });
  };

  /*
   * PELAAJAN OTE KESKEYTTÄÄ AJON. Pyörimisen sammuttaa pelin oma
   * elekerros (js/pallo.js asennaPallonEleet), mutta zoom-ajo on
   * linssin omaa — se on pysäytettävä samasta eleestä, ettei kamera
   * kiskoisi vastaan sormea. Kuuntelijat ovat kaappausvaiheessa ja
   * passiivisia, jottei mikään ele hidastu.
   */
  const otePalloon = () => paataAvausajo();
  kotelo?.addEventListener?.('pointerdown', otePalloon, { capture: true, passive: true });
  kotelo?.addEventListener?.('wheel', otePalloon, { capture: true, passive: true });

  const askel = (t) => {
    kehys = ikkuna.requestAnimationFrame?.(askel) ?? 0;
    pinnat.pyyhkaise();
    tahdistaNimet();
    /*
     * KEHYSVÄLI AVAUSAJOLLE: katkaistu delta, ei seinäkello (ks.
     * ajaAvaus). Sama kello kuin tähtien ajautumalla, mutta oma
     * katkaisunsa — tähdet saavat jäädä nykäisyssä jälkeen, ajo ei.
     */
    const kello = t ?? 0;
    const kehysvali = avausajo.edellinenKehys ? kello - avausajo.edellinenKehys : 0;
    avausajo.edellinenKehys = kello;
    ajaAvaus(kehysvali);
    /*
     * KALVO JOKA KEHYS. ISS liikkuu radallaan, ja varjon ympyrä
     * seuraa zoomia — molemmat luetaan kameran korkeudesta, joten
     * sama kutsu hoitaa myös nipistyksen ja laitteen kääntämisen.
     */
    kalvo?.paivita?.(t ?? 0, kameranKorkeus());
    if (!taivas) return;
    const dt = reduced || !edellinen ? 0 : (t - edellinen) / 1000;
    edellinen = t;
    taivas.paivita(dt, 1);
  };
  kehys = ikkuna.requestAnimationFrame?.(askel) ?? 0;

  /* ---- 3. avausnäkymä ja 4. kapea zoom ------------------------------ */
  /*
   * MITTA LUETAAN UUDESTAAN, KUN KOTELO MUUTTUU (mitattu 12.9.2026).
   * Linssin oma yläpalkki korvaa Matkakirjan palkin, ja kotelo kasvaa
   * sen verran kuin palkkien korkeusero on — puhelimella 771 → 828 px.
   * Ensimmäinen mitta osuu siis vanhaan koteloon, ja avauskorkeudeksi
   * tuli 4,12 kun oikea luku on 4,49: pallo täytti 94 % ruudun
   * leveydestä, vaikka marginaaliksi pyydettiin 12 %. Sovitus ajetaan
   * siksi uudestaan jokaisesta kotelon koon muutoksesta — sama korjaa
   * myös laitteen kääntämisen linssin ollessa auki.
   */
  const avattu = Date.now();
  const mitat = { leveys: 0, korkeus: 0 };
  let alt = 0;
  let aloitusAlt = 0;
  let rajat = { min: 0, max: 0 };
  let omaKorkeus = 0;
  /*
   * AVAUSAJON TILA. `kaynnissa` on tosi siitä hetkestä, kun linssi
   * avautuu, siihen asti kun zoom on perillä TAI pelaaja tarttuu
   * palloon. Kello luetaan kehyssilmukan omasta ajasta, jotta zoom ja
   * tähtien ajautuma kulkevat samassa tahdissa.
   */
  const avausajo = {
    kaynnissa: true, kulunut: 0, osuus: 0, edellinenKehys: 0,
  };
  const sovita = () => {
    mitat.leveys = kotelo?.clientWidth ?? 0;
    mitat.korkeus = kotelo?.clientHeight ?? 0;
    const uusi = avausKorkeus(mitat);
    if (Math.abs(uusi - alt) < 0.001) return;
    alt = uusi;
    aloitusAlt = avausKorkeus({ ...mitat, marginaali: ALOITUKSEN_MARGINAALI });
    rajat = zoomirajat(alt);
    /*
     * ZOOMIRAJAT ENSIN, KAMERA VASTA SEN JÄLKEEN. OrbitControls rajaa
     * etäisyyden joka kehyksellä omilla min/maxDistance-luvuillaan
     * (js/pallolauta/lauta.js tahdistaZoomirajat), ja laudan katto
     * PALLO_KORKEUS_MAX 2,5 on puhelimen avauskorkeutta 4,5 pienempi:
     * ilman nostoa kamera vedettäisiin takaisin eikä pallo mahtuisi.
     */
    /*
     * AVAUSAJON AJAKSI KATTO ON ALOITUSKORKEUS. Ajo alkaa YLEMPÄÄ kuin
     * leponäkymä (pallo 65 % ruudusta), ja OrbitControls vetäisi kameran
     * takaisin kattoonsa heti ensimmäisellä kehyksellä. Katto lasketaan
     * takaisin normaaliksi, kun ajo on ohi — silloin pelaajan oma
     * zoom-ulos on taas se sama kapea kaista kuin ennenkin.
     */
    lauta?.zoomirajat?.({
      min: rajat.min,
      max: avausajo.kaynnissa ? Math.max(rajat.max, aloitusAlt * 1.02) : rajat.max,
    });
    /*
     * PELAAJAN OMA ZOOMI EI SAA HYPÄTÄ: kamera siirretään vain, jos se
     * on yhä siinä korkeudessa, johon linssi sen viimeksi vei. Jos
     * pelaaja on sen jälkeen nipistänyt, uusi mitta muuttaa vain rajat.
     *
     * AVAUKSEN AIKAIKKUNA on poikkeus: ensimmäiset ASETTUMISEN_IKKUNA_MS
     * ovat yläpalkin vaihtumista ja asettelua, ja silloin kamera on yhä
     * kesken avausajon — sen hetkinen korkeus ei kerro pelaajan
     * tahdosta mitään, eikä vertailu siihen kelpaa (mitattu 12.9.2026:
     * puhelin jäi korkeuteen 4,12, kun oikea oli 4,49).
     */
    /*
     * AVAUSAJON AIKANA KAMERAN VIE SILMUKKA. Sovitus päivittää vain
     * luvut ja rajat; korkeuden kirjoittaa `ajaAvaus` joka kehyksellä,
     * jolloin kesken ajon tehty koon muutos (yläpalkin vaihtuminen,
     * laitteen kääntö) muuttaa ajon päätepistettä eikä nykäise kameraa.
     */
    if (avausajo.kaynnissa) {
      omaKorkeus = alt;
      ajaAvaus(0);
      return;
    }
    const tuore = Date.now() - avattu < ASETTUMISEN_IKKUNA_MS;
    const nyt = pallo.pointOfView()?.altitude ?? 0;
    const omassa = tuore || !omaKorkeus || Math.abs(nyt - omaKorkeus) < omaKorkeus * 0.02;
    omaKorkeus = alt;
    if (!omassa) return;
    lauta?.kamera?.pysaytaKameraAjo?.();
    // Napa keskellä olisi outo avaus: pidetään pelaajan oma kohta, mutta
    // korkeintaan 55 asteessa, jotta pallo näyttää pallolta eikä kiekolta.
    const lat = Math.max(-55, Math.min(55, Number(pallo.pointOfView()?.lat) || 0));
    const lng = Number(pallo.pointOfView()?.lng) || 0;
    pallo.pointOfView({ lat, lng, altitude: alt }, reduced ? 0 : AVAUSAJON_MS);
    lauta?.heraa?.();
  };
  sovita();
  const kokovahti = kotelo && ikkuna.ResizeObserver ? new ikkuna.ResizeObserver(sovita) : null;
  kokovahti?.observe(kotelo);
  /** Piirtokankaan mitat (0 × 0 = mitään ei piirry). */
  const kangasMitat = () => {
    const k = pallo.renderer?.()?.domElement ?? null;
    return { leveys: Number(k?.width) || 0, korkeus: Number(k?.height) || 0 };
  };
  pallodiag('avaruus-valmis', {
    alt: +alt.toFixed(2),
    kotelo: `${mitat.leveys}x${mitat.korkeus}`,
    tahtia: taivas?.tila?.()?.pisteita ?? 0,
    kalvo: kalvo ? 1 : 0,
  }, ikkuna);

  return {
    /** Mitatut luvut savukkeelle ja vartijoille. */
    tila: () => ({
      avauskorkeus: +alt.toFixed(3),
      aloituskorkeus: +aloitusAlt.toFixed(3),
      korkeusNyt: +(pallo.pointOfView?.()?.altitude ?? 0).toFixed(3),
      halkaisijaNytPx: Math.round(halkaisijaRuudulla(
        pallo.pointOfView?.()?.altitude ?? alt, { korkeus: mitat.korkeus },
      )),
      halkaisijaAlussaPx: Math.round(halkaisijaRuudulla(aloitusAlt, { korkeus: mitat.korkeus })),
      avausajo: {
        kaynnissa: avausajo.kaynnissa,
        osuus: +avausajo.osuus.toFixed(3),
        kulunutMs: Math.round(avausajo.kulunut),
      },
      pyorii: pyorii(),
      pyorimisenNopeus: ohjaimet?.autoRotateSpeed ?? null,
      halkaisijaPx: Math.round(halkaisijaRuudulla(alt, { korkeus: mitat.korkeus })),
      kotelo: { ...mitat },
      rajat,
      tahtia: taivas?.tila?.()?.pisteita ?? 0,
      tahtikerroksia: taivas?.tila?.()?.kerroksia ?? 0,
      /* LISÄYS 15: ajautuvia 0, pyöreitä = kerroksia, kierto pysyy 0:ssa. */
      tahdet: taivas?.tila?.() ?? null,
      piilotettuja: pinnat.maara(),
      nimetNakyvissa: nimetPaalla,
      nimienKynnys: +(alt * NIMIEN_KYNNYS).toFixed(3),
      pyyhkaisyja: pinnat.kertoja(),
      tekstuuri: Boolean(tekstuuri),
      reliefi: reliefiPaalla,
      reliefinTarkkuus: reliefinValinta.tunnus,
      reliefinOsoite: reliefinValinta.osoite,
      reliefinKestoMs: reliefinKesto,
      /* Musta pallo näkyy tässä: pinnalla ei ole osoitetta lainkaan. */
      pinnanOsoite: String(pallo.globeImageUrl?.() ?? '').slice(0, 24),
      diag: pallodiagLoki(),
      kalvo: kalvo?.tila?.() ?? null,
      /* Piirtokangas ja kontekstin kunto: vartija lukee nämä. */
      kangas: kangasMitat(),
      kontekstiHukassa: kontekstiHukassa(pallo),
      /* Kehysvahti ja pinnan mitattu kirkkaus (LISÄYS 13, 36 ja 37). */
      kehykset: kehysvahti.tila(),
      pinnanKirkkaus: viimeisinKirkkaus,
      pinnanVarapolku: varapolullaKaytiin,
      /* LISÄYS 15 kohta 43: sävyvahdin kirjoitukset ja voimassa oleva sävy. */
      pallonSavy: `#${PALLON_SAVY.toString(16)}`,
      savyKirjoituksia,
      ladonnanWebkit: webkitSelain(ikkuna?.navigator),
    }),
    /*
     * ONKO NÄKYMÄ VALMIS? Yksi totuus, jota sekä linssin vartija että
     * savuke lukevat: `null` = kaikki paikallaan, muuten puutteen
     * nimi (ks. avauksenPuute). `pisteita` tulee linssiltä, koska
     * kohdemerkit lisätään avaruusnäkymän ULKOPUOLELLA.
     */
    puute: (pisteita = 0) => avauksenPuute({
      avaruus: true,
      kotelo: { leveys: kotelo?.clientWidth ?? 0, korkeus: kotelo?.clientHeight ?? 0 },
      kangas: kangasMitat(),
      pinnanOsoite: String(pallo.globeImageUrl?.() ?? ''),
      pisteita,
      kontekstiHukassa: kontekstiHukassa(pallo),
      /*
       * Kehykset ja pinnan todellinen kirkkaus (LISÄYS 13, 36 ja 37).
       * Mittaus kelpaa myös varapolun jälkeen: jos GENEROITUKIN pinta
       * on musta, pelaajan on saatava siitä lause eikä musta pallo.
       */
      kehyksia: kehysvahti.tila().kehyksia,
      pinnanKirkkaus: reliefiPaalla || varapolullaKaytiin || varinValkaisuTehty
        ? viimeisinKirkkaus : null,
    }),
    /** Pinnan mittaus pyynnöstä (savuke ja vartija). */
    mittaaPinta,
    /** Yksi kehys väkisin (linssi kutsuu, kun pisteet eivät näy). */
    pakotaKehys: () => kehysvahti.pakota(),
    /** Vartion kytkin: reunavarjo pois/päälle samaan näkymään. */
    asetaVarjostus: (paalla) => kalvo?.asetaVarjostus?.(paalla),
    pura() {
      purettu = true;
      avausajo.kaynnissa = false;
      kotelo?.removeEventListener?.('pointerdown', otePalloon, { capture: true });
      kotelo?.removeEventListener?.('wheel', otePalloon, { capture: true });
      /*
       * PYÖRIMINEN TAKAISIN LÄHTÖARVOONSA ENNEN KAMERAN PALAUTUSTA:
       * jos autoRotate jäisi päälle, naulattu lähtöpaikka valuisi heti
       * sivuun eikä pallo palaisi täsmälleen siihen, mistä lähdettiin.
       */
      if (ohjaimet && pyorimisenLahto) {
        ohjaimet.autoRotate = pyorimisenLahto.paalla;
        ohjaimet.autoRotateSpeed = pyorimisenLahto.nopeus;
      }
      kokovahti?.disconnect?.();
      if (savyKello) { try { ikkuna.clearInterval?.(savyKello); } catch { /* ei kelloa */ } }
      kehysvahti.pura();
      if (pinnanKello) { try { ikkuna.clearTimeout?.(pinnanKello); } catch { /* ei kelloa */ } }
      pinnanKello = 0;
      if (kehys) ikkuna.cancelAnimationFrame?.(kehys);
      kehys = 0;
      taivas?.pura?.();
      kalvo?.pura?.();
      pinnat.pura();
      ikkuna.document?.body?.classList?.remove?.('satelliitti-avaruus');
      ikkuna.document?.body?.classList?.remove?.(NIMIEN_LUOKKA);
      nimetPaalla = false;
      lauta?.zoomirajat?.(null);
      if (tekstuuri) {
        /*
         * PINTA TAKAISIN TÄSMÄLLEEN: ensin laattamoottorin osoite (se
         * kytkee pohjapallon pois) ja vasta sitten pohjapallon oma
         * kuva-asetus lähtöarvoonsa. Toisessa järjestyksessä kirjasto
         * ehtisi ladata 1873-julisteen pohjapallolle turhaan.
         */
        pallo.globeTileEngineUrl(lahto.laattaUrl ?? null);
        pallo.globeImageUrl(lahto.kuvaUrl ?? null);
        /*
         * JUURI TÄSSÄ SYNTYI MUSTA PALLO (ks. valkaiseMateriaali).
         * `globeImageUrl(null)` panee kirjaston maalaamaan materiaalin
         * mustaksi, ja se musta jäi odottamaan seuraavaa avausta.
         * EI lähtöarvoon (varinLahto on 0/musta jo laattatilassa, koska
         * globe.gl alustaa värin mustaksi) — sulku jättää aina VALKOISEN
         * (oletushex), jotta musta ei jää odottamaan seuraavaa avausta.
         */
        valkaiseMateriaali(materiaali, PALLON_SAVY);
      }
      // Reliefin blob-osoite pois vasta kun pinta on jo vaihdettu.
      vapautaReliefi();
      if (materiaali && kiiltoEnnen) {
        if (Number.isFinite(kiiltoEnnen.spec)) materiaali.specular?.setHex?.(kiiltoEnnen.spec);
        materiaali.shininess = kiiltoEnnen.shine;
        materiaali.needsUpdate = true;
      }
      pallo.backgroundColor?.(lahto.tausta ?? 'rgba(0,0,0,0)');
      pallo.atmosphereColor?.(lahto.ilmakehanVari ?? '#d9a13b');
      pallo.atmosphereAltitude?.(lahto.ilmakehanKorkeus ?? 0.18);
      /*
       * KAMERA PALAUTETAAN KOLMESTI. Pallon oma sormiliuku (js/pallo.js
       * asennaPallonEleet) jatkaa kirjoittamista `pointOfView`iin vielä
       * puoli sekuntia sormen irrottua, eikä sitä voi pysäyttää ulkoa
       * ilman koko elekuuntelijan purkua. Mitattu 12.9.2026 puhelimella:
       * kertapalautus jätti kameran 0,32° sivuun, kun pelaaja oli juuri
       * pyöräyttänyt palloa ennen sulkemista. Kaksi lisäkirjoitusta
       * liu'un keston yli naulaavat lähtöpaikan.
       */
      const palautaKamera = () => {
        lauta?.kamera?.pysaytaKameraAjo?.();
        pallo.pointOfView(lahto.pov, 0);
        lauta?.heraa?.();
      };
      palautaKamera();
      const loppu = Date.now() + LIUUN_NAULAUS_MS;
      const naulaa = () => {
        if (Date.now() > loppu) return;
        palautaKamera();
        ikkuna.requestAnimationFrame?.(naulaa);
      };
      ikkuna.requestAnimationFrame?.(naulaa);
    },
  };
}
