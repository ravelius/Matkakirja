// Käyttöliittymä: aarrekartan piirto, ohjauspaneeli, tietovisa ja bottien ohjaus.

import { pixelOf, pointAlong, posKey } from './rules.js';
import {
  chooseDuelAnswer,
  chooseMove,
  chooseQuizAnswer,
  chooseTravel,
  wantsDuelRelief,
  wantsFiftyFifty,
  wantsHint,
} from './ai.js';
import {
  DUEL_PRIZE, FLIGHT_PRICE,
  HINT_PRICE, MANNERLENTO_NAPPI, MANNER_NIMET, RECORD_DAYS, SEA_FARE, STAR_PRIZE,
} from './game.js';
import {
  factSource, factText, factVoice, isSourceUrl, PACKS, packById, sourceLabel, voiceTitle,
} from './pack.js';
import { stampBoard } from './passport.js';
// UI:n puhtaat apurit, ikonit ja alkuanimaation kehysmatematiikka
// (siirretty tästä tiedostosta 17.8.2026, remontin M2).
import {
  AARRELAATAT, EVENT_SOUND, JALJEN_PYYHKAISY, TOAST_MS, LINSSI_EI_IKONI, MERKKI_SEIS,
  MERKKI_SOITA, REVEAL_SUB, VIIVA_IKONIT, aarreIkoni, aarrekuvanOsoitteet,
  alkuKehykset, arvoHuudahdus, ekaLause, esilataaKuvat, html, jaaKappaleiksi,
  jaljenKehykset, kierraKehykset, kuvitukseton, lahdemerkinta, liuskaIkoniSvg,
  maahanMuoto, onVanhaKuva, paikassaMuoto, pehmeaPolku, piirraLeipateksti,
  pisteMonikulmiossa, polloNimilappu, polunPituus,
  cachedImage, cachedSummary, fokusmoodiPaalla,
  kehittajaMaailmaPaalla, kehittajaTilaPaalla, unohdaKehittajaKytkimet,
  shortIntro, suojaa, tallennaLinssi, tallennettuLinssi, viivaIkoni,
} from './ui-apurit.js';
import { onAarre } from './tokens.js';
// Remontin M5a: lehden sivukoneisto.
import {
  avaaGrafiikkaLehti,
  avaaKehittajaLehti, avaaLukijoiltaLehti, avaaMaalehti, avaaPoiminnatLehti,
  avaaRaamattuLehti,
  avaaSisallysvalikko,
  avaaTilanneLehti, avaaTilastoLehti, jatkaLehdenLuentaa, kytkeTutkiSelaus, naytaMaaUutiset,
  naytaTutkiSivu, naytaVuosiSaa, openWiki, rakennaSivut, renderArticle,
  renderMaastoArtikkeli, sijoitaLehtiKaiutin, tutkiEkaSivu, tutkiSivuja,
  vaihdaTutkiSivu, varustaLukija,
} from './lehti.js';
// Remontin M5c: maalehti ja sisällys.
import {
  naytaMaaTunnusluvut, paivitaMediarivit, piirraKategoria,
} from './maalehti.js';
// Remontin M6: luenta ja visa.
import {
  asetaLuentaKytkin, haivytaJaSiivoa, haivytaLuenta, lueMerkinta,
  luennanLoppuun, luentaKytkinPaalla, merkitsePuhuja, playDiaryVoice,
  playIntroVoice, stopDiaryVoice, stopIntroVoice, vapautaPuhuja,
} from './luenta.js';
import {
  answerDuelUi, answerQuiz, renderDuel, renderQuiz, stopQuizTimer,
} from './visa.js';
// Mallin B pilotit (remontin M3): liput, karttazoom ja vertailutila.
import {
  piirraMaatiedotMaat, piirraVertailuMaat, rakennaVertailuPalkki,
  tahdistaMaatiedot,
  tahdistaVertailu, vertailuPaalla,
} from './vertailu.js';
// Remontin M4: nähtävyydet+kohdekartta ja Matkailijan opas.
import {
  avaaNahtavyys, mitoitaNahtavyysDialogi, nahtavyydenKaruselli,
} from './nahtavyydet.js';
import { taitaOpas } from './opas.js';
// Lautojen yhdistetyt sisältötaulut, luentajoukot ja kuratoidut
// galleriat (siirretty tästä tiedostosta 17.8.2026, remontin M1).
import {
  ARTIKKELIT, EI_VALOKUVAKYSYMYKSEEN, HAVAINTOLUENNAT, KAIKKI_VALOKUVAT,
  KULTTUURIT, LAUTA_TUNNUSLUVUT,
  OMAT_GALLERIAT, SAAPUMISLUENNAT, SAAPUMISTEKSTIT, VALOKUVAT, luentaLauta,
} from './sisaltotaulut.js';
// iOS-kuoren kytkennät. Selaimessa jokainen näistä on mykkä (js/natiivi.js).
import {
  NATIIVI_SAAVUTUKSET, natiiviJaaTeksti, natiiviMatkaTeksti, natiiviSaavutus,
  natiiviTarise, natiiviTukee, natiiviVastaus,
} from './natiivi.js';
// Matkalaukun alalaidan "Unohdettu aarre": tekijänoikeus ja lähdeluettelo.
import { LAHTEET, LAHTEITA, PELI } from './lahteet.js';
import { fetchArticle, fetchImages, suurennusportaat } from './wiki.js';
// HUOM: tuonnit ilman aliasta. Yhden tiedoston versio (tools/build-standalone.mjs)
// niputtaa moduulit samaan näkyvyysalueeseen ja poistaa import-rivit, joten alias
// katoaisi ja nimi jäisi määrittelemättä. Siksi lautakohtaiset nimet ovat
// yksilöllisiä jo lähdetiedostoissa.

import {
  lippuUrl, lippuVara, valokuvaSuurennos, valokuvaUrl, valokuvaVara,
} from './packs/africa-valokuvat.js';
import {
  asetaKuva, julisteUrl, peiliPetti, peilinLaji, aaniOsoite, aaniUrl, onPeilista,
} from './media.js';
import { KULTTUURI_PALKKIO } from './packs/africa-kulttuuri.js';
import { TARINAKAARI, KAARI_LAUDAT, kaariLuentaSoi } from './packs/tarinakaari.js';
/*
 * Loput kuvapaketit. Aasia on kahdessa tiedostossa, koska ensimmäiset
 * 40 kaupunkia kirjoitettiin omalla ajollaan eikä valmista pakettia
 * saa korvata — koostaja kirjoittaa tiedoston kokonaan uusiksi, ja
 * ylikirjoitus veisi mukanaan kaiken, mitä siihen on käsin korjattu.
 * Yksi ylimääräinen tiedosto on halvempi kuin yksi menetetty.
 */
import { KULTTUURI_KATEGORIAT } from './packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from './packs/maa-kategoriat.js';
import {
  MAAKARTAT, KAUPUNKIKARTAT, mittakaava,
} from './packs/maakartat.js';
import { MINIATYYRIT } from './packs/miniatyyrit.js';
// Aikakausjulisteet: minitehtävän palkinto, matkalaukun kokoelma ja
// kehittäjäkartan vihreä merkintä lukevat kaikki tämän saman taulun.
import { JULISTEET, JULISTE_LAHDE, kaupunginJuliste } from './packs/julisteet.js';
import {
  POLLO_AARRE, polloAnkkuri, polloLisavihje, polloOnnittelu, polloPaivitaNakyvyys, polloSulje,
  polloVihje, polloVihjePois,
} from './pollo.js';
import { ajastaEhdotusKupla, ehdotusOsio, proHakuRasti, proOsio } from './ehdotukset.js';
// Viiden symbolin reaktionappi sisällön kylkeen (js/reaktiot.js).
// ui.js tarvitsee tästä kuvasuurennoksen napin ja litteiden
// kulttuurinostojen väliotsikkonapit; lehden ja jutun omat napit
// piirretään niiden omissa moduuleissa.
import { piirraOtsikonReaktio, piirraReaktiot } from './reaktiot.js';
/*
 * SÄHKEPINTA (Raamattu, osio SÄHKEJÄRJESTELMÄ): retkikunta, sähkeet ja
 * kaveriapu asuvat omassa moduulissaan (js/sahke.js). ui.js kutsuu
 * siitä kahta asiaa: valikon retkikuntaosio ja piirtokutsu.
 */
import { paivitaSahke, retkikuntaOsio } from './sahke.js';
import { taytaLahderivi } from './tekijakortti.js';
// Tietäjätasot: matkalaukun nimikerivi ja pöllön onnittelukuplat.
import {
  seuraavaTietajataso, tietajaAvatar, tietajataso, tietajatasonOsuus, varssynSakeet,
} from './tietajatasot.js';
// Matkalaukun i-napin tasogalleria (minipopup-palikan ensimmäinen käyttäjä).
import { avaaTietajagalleria } from './tietajagalleria.js';
import { KOHTAAMISET } from './packs/kohtaamiset.js';
import { LIPPU_TEKIJAT } from './packs/lippu-tekijat.js';
// Fokusmoodin annosteluvirta (js/fokusvirta.js). Kytkentä on kaksi
// kutsua: saapumisen laukaisin renderissä ja lehtilukko openArrivalissa.
import {
  fokusvirtaOhittaaLehden, fokusvirtaSaapuminen, fokusvirtaLukitseeLehden,
  fokusvirtaMatkakirja, fokusvirtaMerkintaLuettu, fokusvirtaLaattaNakyy,
  fokusvirtaKohtaaminenPisteessa, fokusvirtaLehtivinkki, fokusvirtaSisalto,
  fokusvirtaSaapumiskupla, paivitaFokuskuvat, nollaaFokuskuvat,
} from './fokusvirta.js';

const wikiGalleryCache = new Map();

/**
 * Kuratoitu kuvalista galleriamuotoon: Commonsin tiedostonimestä
 * osoite, varareitti ja kuvateksti lähteineen.
 *
 * Sama muunnos kahdelle aineistolle: Tutki-sivun OMAT_GALLERIAT
 * (kenttä `caption`) ja vuorikohteiden VUORIKUVAT (kentät `selite` ja
 * `lahde`, kuten nähtävyysjutuissa).
 */
function kuratoituGalleria(kuvat, leveys = 1200) {
  return kuvat.map((k) => ({
    src: valokuvaUrl(k.tiedosto, leveys),
    vara: valokuvaVara(k.tiedosto, leveys),
    caption: k.selite ?? k.caption ?? null,
    lahde: k.lahde ?? null,
  }));
}

async function cachedGallery(title) {
  if (!wikiGalleryCache.has(title)) {
    const oma = OMAT_GALLERIAT[title];
    wikiGalleryCache.set(title, oma
      ? Promise.resolve(kuratoituGalleria(oma))
      : cachedSummary(title).then((s) => fetchImages(s)));
  }
  return wikiGalleryCache.get(title);
}
import { sfx, treasureSound } from './sound.js';
import {
  playPlaceAmbience, stopPlaceStream, stopQuizMusic,
  vaimennaTausta, palautaTausta,
  hiljennaAmbienssi, palautaAmbienssi,
} from './ambience-stream.js';
import {
  AANITILA_TAPAHTUMA, puheVoima, jaaAlku, kertojaTila, luentaVastaaTekstia,
} from './aani-ehdokkaat.js';
import { BoardDie } from './die.js';
/*
 * Sivun luenta laitteen omalla äänellä (js/lukija.js). Lehden sivuilla,
 * maalehden aihesivuilla ja pitkissä artikkeleissa ei ole generoituja
 * äänitteitä, joten kaiutinnappi turvautuu iOS-kuoren luentasiltaan tai
 * selaimen puhesyntetisaattoriin.
 */
import {
  esipuskuroiLuenta, kaynnistaLukija, kokoaLuettavaTeksti, liitaLukija, lueAaneen,
  lukijaLukee, lukijaTuettu, paivitaLukija, pysaytaLukija, vieritaPehmeasti,
} from './lukija.js';
// Lukijaäänen saatavuus ohjaa merkintöjen luentapolkua: kun lennossa
// generoitu ääni on käytössä, ElevenLabs-äänitteet ohitetaan
// (omistajan päätös 14.8.2026 — "toistaiseksi", kunnes tekstit
// kirjoitetaan uusiksi).
import { puheTuettu } from './puhe.js';
/*
 * Kehittäjän liitteet (omistajan tilaus 15.8.2026): Raamattu ja
 * työhuoneen tilannetaulut luetaan pelin sisällä lehtinä, kun
 * kehittäjävipu on päällä — työhuone pidetään jatkossa integroituna
 * suoraan peliin. Tuonti ei kasvata pelaajan polkuja: sisältö
 * piirretään vain kehittäjätilan valikkolinkeistä.
 */
import { RAAMATTU } from './tyohuone-raamattu.js';
import { TILANNE, TESTATTAVAA } from './tyohuone-tilanne.js';
import {
  el,
  hash01,
  vary,
  drawCompass,
  drawDefs,
  drawDoodles,
  drawHemisphereFrames,
  drawLand,
  drawPaperOverlay,
  drawPaperPohja,
  drawParchment,
  drawTerrain,
  drawWaves,
  paperi,
  kasinPiirretty,
  rasteroiRuutu,
  RUUTU_TYHJA,
  avaaTaidelahde,
  esilammitaTaide,
  rasteroiPohja,
  pohjanMitat,
  piirtotarkkuus,
  ruudunKoko,
  valmisteleTaide,
  pilkoTaide,
  tyylitSisaan,
  drawMaasto,
  drawMaastonimet,
  drawLahivesi,
  lahivedenVoima,
} from './mapart.js';
import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';
import { vuorikuvat } from './packs/vuori-valokuvat.js';
import { MAASTO_TEKSTIT } from './packs/maasto-tekstit.js';
import { MAASTO_TEKSTIT_MALLI } from './packs/maasto-tekstit-malli.js';
import { MERISYVYYS } from './packs/maailmankartta-syvyys.js';
import { MAASTON_VARJOSTUS } from './packs/maailmankartta-varjostus.js';
// Remontin M7a: laudan kamera ja koordinaatit (malli B).
import { Kartta } from './kartta.js';
// Fokusmoodin maakohtainen topografiapohja (paketti 2).
import {
  esilammitaFokuspohja, esilataaMatkanLehti,
  fokusAtlasIkkunat, paivitaFokusAtlas, paivitaFokuskartta, paivitaFokusNimet,
  paivitaLennonLehdet, nollaaFokuskartta,
} from './fokuskartta.js';
// Fokuslehden klikattavat karttakohteet ja niiden pop-up (js/fokuskohteet.js).
import {
  matkakirjanIhme, nollaaFokuskohteet, paivitaFokuskohteet, piirraIhmenappi,
  piirraIhmenauha,
} from './fokuskohteet.js';
/*
 * Kevyen kulun vihreä kohtaamispiste (js/fokuspiste.js). Sama kytkentä
 * kuin kohdemerkeillä: päivitys aina kun näkymä on asettunut, nollaus
 * laudan vaihdossa.
 */
import { paivitaFokuspiste, nollaaFokuspiste } from './fokuspiste.js';
/*
 * Fokusnäkymän RUUTUUN ankkuroidut atlas-elementit: mittajana, maan
 * kartuutsi ja sen takaa liukuva maataulu (omistaja 25.8.2026). Ne
 * eivät ole laudalla vaan kartan päällä HTML:nä, koska ne eivät saa
 * skaalautua zoomissa — ks. js/fokusmitat.js.
 */
import { nollaaFokusmitat, paivitaFokusmitat } from './fokusmitat.js';

const DIE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const BOT_DELAY = 650;
const BOT_QUIZ_DELAY = 1500; // botin kysymys jää hetkeksi näkyviin luettavaksi
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Animaatioiden rytmi millisekunteina.

const STEP_MS = 190; // yhden hypyn lentoaika kartalla
/*
 * NAPPULAN HYPPY (omistajan tilaus #100).
 *
 * `STEP_MS` on nyt HYPYN LENTOAIKA, ja tauko on oma lukunsa: askel
 * kestää yhteensä lento + tauko. Jako on tarkoituksellinen, koska
 * tulossa on erikseen hitaampi jalkamatkasiirtymä (#96) — silloin
 * riittää kasvattaa lentoaikaa (parametri `stepMs`), ja tauko pysyy
 * sinä pienenä hengähdyksenä, joka tekee liikkeestä siirretyn
 * pelinappulan eikä liukuvan pisteen.
 *
 * Kaaren korkeus laudan yksiköinä on suhteessa hypyn pituuteen, mutta
 * rajoissa: lyhyt askel ei saa jäädä litteäksi eikä pitkä (lento,
 * jossa askelia on yksi) kaartaa ruudun ulkopuolelle.
 */
const HYPYN_TAUKO_MS = 190; // näkymätön käsi laskee nappulan ja tarttuu uudelleen
const HYPYN_KAARI = 0.34; // kaaren huippu suhteessa hypyn pituuteen
const HYPYN_KORKEUS_MIN = 9;
const HYPYN_KORKEUS_MAX = 30;
/*
 * JALKAMATKAN OMA ASKEL (omistajan tilaus #96: *"Matkustusanimaatio
 * jalan saisi olla hitaampi."*).
 *
 * Muutos on täsmälleen se, jota #100 varautui: kasvatetaan HYPYN
 * LENTOAIKAA, ei taukoa. Tauko on se pieni hengähdys, joka tekee
 * liikkeestä siirretyn pelinappulan; jos sekin venyisi, jalkamatka
 * muuttuisi nykiväksi odotteluksi. Lento (STEP_MS, FLIGHT_MS,
 * MANNER_LENTO_MS) jää ennalleen — tilaus koski maareittejä.
 *
 * 190 → 640 ms eli 3,4×. Ensimmäinen yritys oli 340 ms (1,8×), mutta
 * omistajan pelitesti 27.8.2026 (iPhone) oikaisi sen: *"pelinappulan
 * etenemisvauhti pitäisi olla paljon hitaampi"* — paljon, ei vähän.
 * 640 ms on se aika, jossa silmä ehtii seurata yhden hypyn kaaren
 * alusta loppuun ja liike lukee käden siirroksi eikä lentoradaksi.
 *
 * Kuuden askeleen täysi heitto kestää nyt 6 × 640 + 5 × 190 ≈ 4,8 s
 * (ennen 1,9 s), ja juuri se on se matka, jonka ajan saattava kamera
 * ehtii ajaa lähemmäs, kuljettaa laudan uuteen kohteeseen ja palata.
 */
const JALKAMATKAN_STEP_MS = 640;
/*
 * SAATTAVA KAMERA (omistajan tilaus #96: *"Kartta voisi samalla myös
 * hitaasti siirtyä uuteen kohteeseen ja paljastaa sitä näkyviin sitä
 * mukaa kun nappula etenee."*).
 *
 * Kamera ei seuraa nappulaa hypyittäin — se olisi nykivä, koska hyppy
 * on paraabeli ja välissä on tauko — vaan LIUKUU koko matkan ajan
 * kohti määränpäätä yhtenä ajona (js/kartta.js ajaKamera). Se on
 * samalla se tapa, jolla kohde "paljastuu sitä mukaa": uutta maastoa
 * tulee näkyviin ruudun reunasta täsmälleen sitä tahtia kuin nappula
 * etenee.
 *
 * KAMERA MENEE MYÖS LÄHEMMÄS (omistajan pelitesti 27.8.2026, iPhone:
 * *"kamera-animaatio ei seuraa järkevästi pelinappulaa. pitäisi olla
 * ainakin lähempänä jotta lauta liikkuisi enemmän"*).
 *
 * Ensimmäinen toteutus piti mittakaavan ennallaan ja siirsi vain
 * keskipistettä. Ongelma ei ollut liu'ussa vaan siinä, ETTEI LAUTA
 * LIIKKUNUT TARPEEKSI: kaukaa katsottuna koko matka mahtuu ruudulle,
 * ja kamera siirtyy muutaman kymmenen pikseliä — silmä ei näe sitä
 * seuraamisena. Lähikuvassa sama matka on ruudullinen liikettä, ja
 * juuri se on "kartta siirtyy uuteen kohteeseen".
 *
 * SAATTOZOOMI on kerroin nykyiseen zoomiin: 1,7× vie kartan selvästi
 * lähemmäs mutta ei niin lähelle, että pelaaja kadottaisi paikkansa.
 * Katon hoitaa kamera-ajo itse (kartta.zoomiRajat), joten valmiiksi
 * lähellä oleva näkymä ei kiristy yli portaikon.
 *
 * JA PALAA. Perillä kamera ajaa takaisin siihen kertoimeen, josta
 * matka alkoi — nopeammin kuin meno, koska paluu ei ole kohtaus vaan
 * asennon palautus. Uuteen MAAHAN saavuttaessa fokuskartan oma ajo
 * ehtii ensin ja korvaa paluun; se on oikein, koska maanvaihdoksen
 * rajaus on tarkempi kuin vanha kerroin.
 *
 * Pehmennys on smoothstep eikä kamera-ajon oma kuutiokäyrä: kuutio
 * seisoo lähes paikallaan matkan ensimmäisen neljänneksen, ja kamera
 * jäisi jälkeen ja kirisi lopussa. Smoothstep lähtee ja pysähtyy
 * pehmeästi mutta kulkee välillä lähes nappulan tahtia.
 *
 * ELE VOITTAA: ajon keskeyttää sormi kartalla, nipistys, rulla tai
 * zoomipainike (kartta.pysaytaKameraAjo), ja kartta jää siihen mihin
 * ajo ehti. Sitä ei yritetä jatkaa — pelaajan oma ele on viimeinen
 * sana kartan paikasta, eikä keskeytetty matka aja paluutakaan.
 */
const SAATON_PEHMENNYS = (t) => t * t * (3 - 2 * t);
const SAATON_LAHENNYS = 1.7;
const SAATON_PALUU_MS = 900;
/*
 * Alle tämän jäävää siirtoa ei ajeta lainkaan: kohde on jo käytännössä
 * ruudun keskellä, ja pikkuliike näyttäisi vain siltä että kartta
 * värähtää nappulan lähtiessä. Mitta on RUUDUN pikseleitä.
 */
const SAATON_VAHIN_PX = 60;
/*
 * JALKAMATKAN ÄÄNIMAISEMA (#96: *"Taustalle pitää kehitellä sopiva
 * äänimaisema siirtymän ajaksi."*).
 *
 * Matka kulkee maareittejä pitkin läpi kaikenlaisen maaston, joten
 * ääneksi valittiin se laji, joka ei väitä maastosta mitään: METSÄ eli
 * tuuli puissa ja kaukaiset linnut (js/aani-ehdokkaat.js metsa —
 * "Tuuli puissa", CC0, ja "Linnut metsässä", CC BY). Kori on jo
 * repossa ja peilattu ämpäriin; uutta ei ladattu eikä generoitu.
 *
 * Paikkatunnus on OMA ('jalkamatka') eikä kaupungin, jotta
 * ambience-stream tunnistaa matkan omaksi tilakseen: se saa oman
 * nopean sisääntulonsa ja kevyemmän tasonsa (ks. ambience-stream.js
 * JALKAMATKAN_VOIMA). Tunnus ei ole vakiopaikka — matkan ääni saa
 * arpoutua korista ja alkaa eri kohdasta joka kerta, koska sama
 * siirtymä toistuu pelissä kymmeniä kertoja.
 */
const JALKAMATKAN_MAISEMA = 'metsa';
const FLIGHT_MS = 900;
// Mantereen sisäinen lento liukuu rauhallisemmin moottorin hurinalla.
const MANNER_LENTO_MS = 2800;
// Lentoanimaation kesto: sen verran, että repliikin ehtii lukea.
// Kalvolento saa kestää: matka on tarkoitus tuntea, ei ohittaa.
const FLY_OVERLAY_MS = 4800;
/*
 * Lennon kesto seuraa repliikin pituutta.
 *
 * Kiinteä 4,8 sekuntia riitti koneelle mutta ei lukijalle: omistajan
 * havainto avauslennolta oli, että "lentokoneen pitää lentää hitaammin
 * koska tekstin luku kestää paljon kauemmin". Repliikki kirjoittuu
 * sanoittain ja jää sitten paikalleen, joten hidas osuus ei ole
 * kirjoitus vaan lukeminen.
 *
 * Aika lasketaan sanoista eikä merkeistä: silmä lukee sanan kerrallaan,
 * ja lyhyet suomen sanat pidentäisivät merkkilaskurilla arviota väärään
 * suuntaan. Yläraja on siksi, ettei poikkeuksellisen pitkä rivi jätä
 * konetta ilmaan minuutiksi — lennon voi joka tapauksessa hypäyttää
 * perille napauttamalla.
 */
const LENNON_POHJA_MS = 2200;
const LENNON_SANA_MS = 210;
const LENNON_ENINTAAN_MS = 20000;
/*
 * Kuinka kauan valmis repliikki jää ruudulle ennen kuin lento päättyy.
 * Nostettu 1600 → 4200 ja katto 15 s → 20 s (omistaja 26.8.2026:
 * *"Lentokohtaus ehtii loppua ennen kuin lukija ehtii lukea tekstin
 * loppuun"*) — konekirjoituksen valmistuttua lukija tarvitsee vielä
 * rauhallisen lukuhetken. Napautus ohittaa odotuksen milloin vain.
 */
const LENNON_LUKUAIKA_MS = 4200;
/*
 * ÄÄNI EDELLÄ, TEKSTI PERÄSSÄ (omistaja 12.8.2026).
 *
 * Avauslennon kaksi alkuhetkeä olivat kumpikin aavistuksen väärässä
 * kohdassa: kertoja aloitti 4,2 sekunnin kohdalla ja ruututeksti heti
 * kalvon auettua. Kumpaakin siirrettiin saman verran mutta
 * vastakkaisiin suuntiin — luenta 400 ms aikaisemmaksi ja kirjoitus
 * 400 ms myöhemmäksi — jolloin ääni ehtii ensin ja teksti seuraa.
 *
 * Kirjoituksen viive on erillinen luku eikä osa typeTextiä, koska
 * lennon kesto lasketaan siitä: lennonKesto lisää saman viiveen
 * kirjoituksen kestoon, jottei kone laskeudu kesken lauseen.
 *
 * 13.8.2026: omistaja aikaisti luentaa vielä puolellatoista sekunnilla
 * (3800 → 2300) — moottorin ei tarvitse nousta yhtä pitkään ennen kuin
 * kertoja aloittaa.
 */
const LENNON_PUHE_MS = 2300;
const LENNON_TEKSTI_VIIVE_MS = 400;
/*
 * Varoventtiili sille odotukselle, jolla kalvo varmistaa ettei kone
 * laskeudu kesken lauseen (ks. animateFlightSisalla). Tavallisella
 * laitteella odotusta ei ole lainkaan: rivi on valmis kauan ennen
 * laskeutumista. Luku on siis vain katkaisija kadonneen kuittauksen
 * varalle, eikä sitä ole mitoitettu kirjoituksen mukaan — mitattu
 * hitain tapaus (kuormitettu pääsäie, 25 sanaa) tarvitsi 15,2 s, joten
 * 30 s jättää reilun varan eikä katkaise kesken lauseen. Pelaaja pääsee
 * odotuksen ohi milloin tahansa napauttamalla kalvoa tai nuolta.
 */
const LENNON_TEKSTI_ODOTUS_MS = 30000;
// Kuinka kauan lennon jälkeen odotetaan, ennen kuin pieni nuoli syttyy.
const LENNON_NUOLI_MS = 3500;
/*
 * LENTO JATKUU ITSESTÄÄN (omistajan tilaus 26.8.2026: *"Peli voisi
 * lennon jälkeen automaattisesti jatkaa mantereelle, eli ota siitä pois
 * astu mantereelle -nappi. Muuten tulee liikaa nappeja heti alkuun."*).
 *
 * Astu mantereelle oli pelin ensimmäinen nappi, ja se tuli ruudulle
 * ennen kuin pelaaja oli nähnyt yhtäkään pelin omaa nappia. Nyt lento
 * laskeutuu ja jatkaa itsestään: viive on tässä, jotta laskeutuminen
 * ehditään nähdä — kone pysähtyy, saapumisleima läimähtää kohteen
 * viereen ja vasta sitten kuva vaihtuu. Lyhyempi tuntuisi katkaisulta
 * ja pidempi odottelulta; napauttamalla pääsee joka tapauksessa heti.
 */
const LENNON_JATKO_MS = 1100;
/*
 * Ohituksen jälkeinen napautusten nielu.
 *
 * Ohitus poistaa kalvon alta koko lentonäkymän, ja napautuksen
 * jälkipuoli (pointerup, click) osuisi siihen, mikä juuri paljastui —
 * kartan kaupunkiin tai alarivin nappiin. Nielu on lyhyt: se kattaa
 * saman napautuksen loppuosan muttei ehdi syödä seuraavaa.
 */
const LENNON_NIELU_MS = 500;

/*
 * ALOITUSLENTO KARTALLA (omistaja 24.8.2026, Raamatun osio
 * "Fokusmoodi" / ALOITUSLENTO UUSIKSI). Luvut yhdessä paikassa, koska
 * ne on mitoitettu toisiaan vasten: kamera-ajo ensin, sitten lento.
 */
// Lähtökaupunki: matka alkaa aina Lontoosta (Raamattu, "Pelin kulku").
const ALOITUSLENNON_LAHTO = 'lontoo';
/*
 * ETUSIVUN VALITTAVAT KOHTEET (omistajan tilaus 25.8.2026).
 *
 * Aloituskartalla on vain ne kaupungit, joilla on valmis fokusmoodin
 * sisältö: matkan ensimmäinen kohde on kokonaisen maan avaus, eikä
 * puolivalmiiseen kohteeseen saa päästä lentämään. PISTEITÄ LISÄTÄÄN
 * SITÄ MUKAA KUN MAITA VALMISTUU FOKUSJÄRJESTELMÄLLE — lisäys on tähän
 * joukkoon, ei laudan dataan (js/packs/maailma.js pysyy täytenä
 * maailmankarttana, jota myös katselutila käyttää).
 *
 * Sofia on jo pelissä mutta EI ole aloituskohde: sinne kävellään
 * Ateenasta, kuten tarina menee.
 */
const ETUSIVUN_KOHTEET = new Set(['ateena']);
/*
 * MITKÄ KAUPUNGIT NÄKYVÄT ALOITUSKARTALLA LAINKAAN (omistajan
 * pelitestipalaute v1119: *"piilota toistaiseksi KAIKKI muut
 * kaupungit paitsi Ateena — Tanger, Moskova, Kairo, Kapkaupunki,
 * Peking, Mumbai ym. pois näkyvistä (nimet, ympyrät, konesymbolit;
 * Lontoo lähtöpisteenä saa jäädä)"*).
 *
 * Valintakartalla oli neljätoista kaupunkia nimineen, laattoineen ja
 * lentokonemerkkeineen, mutta VALITTAVIA on tasan yksi
 * (ETUSIVUN_KOHTEET). Kolmetoista muuta lupasivat matkan, jota ei ole
 * vielä olemassa.
 *
 * NÄKYVYYS, EI DATA. Lauta pysyy täytenä maailmankarttana
 * (js/packs/maailma.js) — myös katselutilaa (?lauta=) varten, jossa
 * tämä piilotus ei ole voimassa. Kaupunki palaa kartalle lisäämällä
 * sen tunnuksen tähän joukkoon, samaan tapaan kuin ETUSIVUN_KOHTEET
 * kasvaa maiden valmistuessa.
 *
 * Lontoo on mukana lähtöpisteenä: siitä matka alkaa, ja sen kultainen
 * rengas on koko kartan ainoa kiintopiste.
 */
const ETUSIVUN_NAKYVAT = new Set(['lontoo', ...ETUSIVUN_KOHTEET]);
/*
 * ALOITUSSIIRTYMÄN PERGAMENTTIARKKI (omistajan tilaus 25.8.2026).
 *
 * JUURISYY, jonka tämä korjaa: kohteen napautus vaihtaa laudan
 * etusivun pikku laudasta (js/packs/maailma.js) koko maailmankarttaan,
 * ja uusi lauta sovitetaan ensin OLETUSNÄKYMÄÄN eli koko maailmaan.
 * Vasta sen jälkeen kamera-ajo vie näkymän lähtömaan ja kohdemaan
 * yhteisrajaukseen. Mitattuna (Chromium, kontti) laudan piirto vei
 * 3,8 sekuntia ja kamera-ajo 5 sekuntia — koko sen ajan ruudulla oli
 * tyhjä, sumuverhon alle jäänyt maailmankartta. Se on se välähdys.
 *
 * Korjaus: näkymä feidataan ensin tyhjäksi pergamenttiarkiksi, raskas
 * työ tehdään arkin takana, kamera asetetaan rajaukseen HETI (kesto 0)
 * ja arkki feidataan pois vasta valmiiseen lentonäkymään. Tyhjää
 * maailmankarttaa ei näy hetkeäkään.
 *
 * Sisään nopeasti (napautuksen vastaus), ulos rauhassa (paljastus).
 */
const ALOITUSVERHO_SISAAN_MS = 420;
const ALOITUSVERHO_ULOS_MS = 700;
// Rajauksen marginaali: lähtömaan ja kohdemaan ympärille jää tämän
// verran merta ja naapureita, jotta molemmat maat erottuvat muodoiltaan
// eivätkä kosketa ruudun laitaa. Väljempi kuin kartan oletus (0,12),
// koska kuvassa on kaksi maata ja niiden välinen reitti.
const ALOITUSLENNON_MARGINAALI = 0.16;
// Kamera-ajon kesto rajaukseen. Pidempi kuin kartan oletusajo (2000 ms):
// tämä on pelin ensimmäinen liike, ja matka Lontoosta kohteeseen
// kannattaa ehtiä lukea kartalta ennen kuin kone lähtee.
const ALOITUSLENNON_AJO_MS = 2400;
/*
 * Kuinka kauan arkin takana enintään odotetaan karkeaa koko laudan
 * kuvaa (pohjatasoa) ennen kuin lento lähtee joka tapauksessa.
 *
 * Mitattu Chromiumissa: arkin alla maalaamattomana (body.lauta-arkin-alla)
 * pohjataso valmistuu noin kahdessa sekunnissa kamera-ajon jälkeen.
 *
 * KATTO ON SILTI RUNSAS, koska sen ylittäminen on pahempi vaihtoehto
 * kuin odottaminen: ilman pohjatasoa ruudulle jää vektorilauta, jonka
 * jokainen kehys maksaa lähikuvassa sekunteja — nelinkertaisesti
 * kuristetussa Chromiumissa mitattuna yhdeksän. Katto on siis
 * varoventtiili rikkinäiselle putkelle eikä hitaan laitteen normaali
 * tila; silmukka päättyy joka tapauksessa heti kun pohja on valmis TAI
 * kun se on todettu mahdottomaksi (pohjaTulossa laskee).
 *
 * Aika luetaan kellosta eikä ajastimien laukeamisista, joten katto
 * pitää silloinkin kun pääsäie on tukossa (ks. aloituslentoSisalla).
 */
const ALOITUSLENNON_POHJA_ODOTUS_MS = 12000;
// Reitin kaaren voimakkuus. Sama kerroin kuin laudan omilla
// lentoreiteillä (drawBoard, .air-route), jotta uusi viiva on samaa
// käsialaa kuin kartalle valmiiksi piirretyt kaaret.
const ALOITUSLENNON_KAARI = 0.12;
/*
 * Kuinka paljon rajaus saa enintään laajeta reitin ympärille.
 *
 * "Lähtömaa ja kohdemaa näkyvät molemmat" on Raamatun sääntö, mutta
 * maat ovat eri kokoisia: Kreikka on 220 yksikköä leveä ja Yhdysvallat
 * Alaskoineen 6300 — eli puolet maailmasta. Sellaisenaan noudatettuna
 * sääntö kutistaisi Lontoo–New York -lennon 110 pikselin viivaksi
 * ruudun laitaan (mitattu 24.8.2026), ja itse lento katoaisi kuvasta,
 * jonka on määrä esittää se.
 *
 * Siksi maiden rajausta käytetään SIIHEN ASTI kun se pysyy tämän
 * kertoimen sisällä reitin omasta koosta; sen yli menevä osa jää
 * kuvan ulkopuolelle. Reitti päätepisteineen mahtuu aina kokonaan.
 */
const ALOITUSLENNON_LAAJUUS = 2.2;
// Reittiviivan paksuus ja koneen mitta RUUDUN pikseleinä: kumpikin
// muunnetaan laudan yksiköiksi näkymän mittakaavalla, jottei viiva
// katoa hiuskarvaksi eikä kone kasva mantereen kokoiseksi.
const ALOITUSLENNON_VIIVA_PX = 3.4;
const ALOITUSLENNON_KONE_PX = 34;
// Koneen piirroksen oma leveys omissa yksiköissään (polku ulottuu
// x = -15…14, ks. aloituslentoSisalla): mitta, jota vasten
// ALOITUSLENNON_KONE_PX skaalataan.
const ALOITUSLENNON_KONE_MITTA = 29;
/*
 * RETKIKUNTAKARTAN REITTIMERKINTÄ (päätoimittajan taidesuunta
 * 26.8.2026): koneen kärjessä on yhtenäinen tuore vetäisy ja sen
 * taakse jää katkoviiva — juuri niin kuin 1800-luvun matkakartoissa
 * merkittiin kuljettu reitti.
 *
 * Miksi kaksi elementtiä eikä yksi katkoviivainen polku: sama polku ei
 * voi olla yhtä aikaa katkonainen ja puoliksi piirtynyt (stroke-
 * dasharray hoitaa kummankin, ei molempia). Tuore vetäisy on siksi
 * pääpolun ainoa näkyvä pätkä, joka kulkee koneen mukana, ja katkojälki
 * on oma sarjansa lyhyitä viivoja, jotka syttyvät koneen ohitettua.
 *
 * Mitat ovat RUUDUN pikseleitä kuten viivan paksuuskin.
 */
const ALOITUSLENNON_KARKI_PX = 52;
const ALOITUSLENNON_KATKO_PX = 22;
// Katkoviivan viivan osuus jaksosta; loppu on väli.
const ALOITUSLENNON_KATKO_OSUUS = 0.58;
// Katkojälkeä ei piirretä loputtomiin: harva pitkä lento ei saa
// synnyttää satoja elementtejä eikä lyhyt lento tiheää tikkuriviä.
const ALOITUSLENNON_KATKOJA_ENINTAAN = 44;
const ALOITUSLENNON_KATKOJA_VAHINTAAN = 5;
/*
 * ==================================================================
 * LAIVAREITIT MERELLE LENNON AJAKSI (omistajan pelitestipalaute
 * v1119, saapumisleiman tilalle)
 * ==================================================================
 *
 * *"Piirrä lentonäkymän mereen muutama himmeä laivareittiviiva
 * (katkoviiva, vanhan merikartan tyyli) ja niihin HYVIN himmeät
 * pisteet jotka liikkuvat hitaasti ja välkkyvät kevyesti."*
 *
 * DATA ON LAUDAN OMA. Maailmankartalla on satoja merireittejä
 * (js/packs/maailmankartta.js, type: 'sea') väliponnistuksineen —
 * ne ovat oikeita 1800-luvun höyrylaivalinjoja, ja juuri niitä
 * isoisän atlaksessa olisi. Lento poimii niistä ne, jotka osuvat
 * rajaukseen, ja piirtää muutaman pisimmän: keksitty kaari olisi
 * ollut sama työ ja vähemmän totta.
 *
 * KAIKKI MITAT RUUDUN PIKSELEINÄ ja skaalataan näkymän mittakaavalla,
 * kuten reittiviivalla ja koneellakin.
 */
/*
 * Nostettu 4 → 6 ja vähimmäispituus 260 → 170 (omistaja 26.8.2026:
 * *"välimerelle voisi lisätä myös laivoja kulkemaan"*) — Välimeren
 * linjat ovat laudalla lyhyempiä kuin valtamerten, joten pelkkiä
 * pisimpiä valitessa sisämeret jäivät tyhjiksi.
 */
const LAIVAREITTEJA_ENINTAAN = 6;
// Viivan paksuus ja katkoviivan jakso ruudun pikseleinä.
const LAIVAREITIN_VIIVA_PX = 1.5;
const LAIVAREITIN_KATKO_PX = 9;
// Laivasiluetin mittakaava (2,6 = entisen pisteen säde; siluetti on
// tällä noin 9 ruudun pikseliä pitkä) ja kierroksen kesto.
const LAIVAN_PISTE_PX = 3.1;
const LAIVAN_KIERROS_MS = 46000;
// Reitin on oltava vähintään näin pitkä (laudan yksikköinä), jottei
// kartalle ilmesty tikkuja lahtien poikki.
const LAIVAREITIN_VAHIN_PITUUS = 170;

/*
 * ==================================================================
 * SAAPUMISSEKVENSSI (omistajan tilaus 26.8.2026)
 * ==================================================================
 *
 * *"Lentoanimaation päätyttyä näkymä feidautuu ensin TYHJÄÄN vaaleaan
 * karttapohjaan. Siihen kirjoittuu KONEKIRJOITUKSELLA välikorttiteksti:
 * kohdekaupunki ja päivälaskuri. Teksti häviää, ja varsinainen kartta
 * feidautuu sisään SUORAAN oikeassa zoomitilassa — EI
 * zoomausanimaatiota. ~1 s kartan ilmestymisestä: pöllön ensimmäinen
 * puhekupla… Melkein heti perään TOINEN kupla ENSIMMÄISEN ALLE."*
 *
 * Sekvenssi korvaa vanhan suoran siirtymän, ja OHITUSKIN HYPPÄÄ TÄHÄN
 * eikä tämän yli: napautus lopettaa lennon, muttei sitä hetkeä, jossa
 * pelaajalle kerrotaan mihin hän saapui.
 *
 * Välikortti on sama pergamenttiarkki kuin aloitussiirtymässä
 * (naytaAloitusverho): tyhjä paperi ilman suodattimia, jonka takana
 * raskas työ tehdään näkymättä. Ero on vain sisällössä.
 */
// Tauko sen jälkeen kun paperi on täyttänyt ruudun, ennen kirjoitusta.
const SAAPUMISKORTTI_TAUKO_MS = 280;
// Kuinka kauan valmis välikorttiteksti jää ruudulle ennen häipymistä.
const SAAPUMISKORTTI_LUKUAIKA_MS = 1000;
// Tekstin oma häivytys (css .saapumiskortti-teksti).
const SAAPUMISKORTTI_TEKSTI_MS = 320;
/*
 * Kartan ilmestymisestä ensimmäiseen kuplaan ja siitä toiseen —
 * molemmissa selvä hengähdys (omistaja 26.8.2026: "pieni tauko").
 *
 * ENSIMMÄINEN VIIVE ON VARAPOLKU (omistajan pelitestipalaute v1119).
 * Kun matkapäiväkirjan luenta soi, kuplat odottavat sen loppumista
 * (js/luenta.js luennanLoppuun) — kiinteä viive ponnahti kertojan
 * päälle kesken merkinnän. Tämä luku pätee siis vain silloin, kun
 * luentaa ei ole: mykistys, kertojatila 'ei' tai puuttuva äänite.
 *
 * TOISEN KUPLAN TAUKO 1,6 s → 2,5 s (sama palaute): ensimmäinen lause
 * on kaksi riviä pitkä, eikä ohje saa ilmestyä ennen kuin se on
 * luettu.
 */
const SAAPUMISEN_KUPLA_MS = 1800;
const SAAPUMISEN_KUPLA_VALI_MS = 2500;
/*
 * Hengähdys luennan päättymisen ja ensimmäisen kuplan välissä. Kupla
 * heti viimeisen sanan päälle olisi yhtä tungetteleva kuin kesken
 * lauseen — pöllö odottaa, että kertoja on vaiennut.
 */
const SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS = 900;
/*
 * KUPLIEN SANAMUOTO ON KAANON (omistajan tilaus 26.8.2026). Maa ja
 * kaupunki taipuvat js/ui-apurit.js:n taulukoilla, mutta lauseiden
 * rakenne ei muutu ilman omistajan sanaa. Toinen kupla kuvaa merkin
 * TODELLISEN ulkoasun (kultainen kiekko) — "vihreä piste" oli väärin
 * (omistajan oikaisu 26.8.2026: muuta tekstiä, älä merkin väriä).
 */
const SAAPUMISEN_KUPLA_TOINEN = 'Klikkaa kaupungin kultaista merkkiä kartalla.';

/*
 * MATKUSTUSNÄKYMÄN MARGINAALI (omistajan pelitestipalaute v1119).
 * Osuus rajauslaatikon koosta joka reunaan: naapurikaupungin nimi ja
 * laatta mahtuvat kokonaan ruudulle eivätkä kosketa laitaa. Väljempi
 * kuin kameran oletus (0,12), koska laatikko on tässä pieni ja
 * kaupunkien merkit ovat sen reunoilla.
 */
const MATKUSTUKSEN_MARGINAALI = 0.22;
/*
 * Matkareittien mitat ruudun pikseleinä (skaalataan näkymän
 * mittakaavalla kuten lentoreitilläkin). Viiva on laudan omaa
 * katkoviivaa hennompi: se on merkintä atlaksen päällä, ei pelilauta
 * takaisin.
 */
const MATKAREITIN_VIIVA_PX = 2;
const MATKAREITIN_KATKO_PX = 8;
/*
 * Askelympyrä on nyt OIKEA väliaskel eikä yksi murtoviivan sadasta
 * pehmennyspisteestä (ks. paivitaMatkareitit), joten niitä on reitillä
 * kourallinen eikä sataa. Siksi piste saa olla hitusen isompi: se on
 * ruutu, jolle nappula pysähtyy, ja sellaisen pitää näkyä.
 */
const MATKAREITIN_PISTE_PX = 4.2;

/*
 * NUOREN HERRAN HUUDAHDUSRIVI PALJASTUSKORTILLA (omistajan
 * pelitestipalaute v1119: *"'Taskuun!'-rivi POIS toistaiseksi (koodia
 * ei poisteta, piilotus/lippu)"*).
 *
 * Rivi on kortin kärjessä oleva kursivoitu repliikki ("Taskuun!",
 * "Ohhoh!"). Huudahdus ITSESSÄÄN jää: pääaarteen luettu hihkaisu soi
 * kuten ennenkin (js/aani-ehdokkaat.js HUUDAHDUKSET), ja arvonta on
 * ennallaan — vain teksti on piilossa. Lippu takaisin todeksi
 * palauttaa rivin sellaisenaan.
 */
const REVEAL_HUUDAHDUS_RIVI = false;

/*
 * PÖLLÖN PAIKALLINEN VIHJE (omistajan toive 13.8.2026: *"Pöllö voi
 * tarpeen mukaan vinkata, jos pelaaja ei osaa painaa mitään
 * nappia."*).
 *
 * Nopanheiton jälkeen peli odottaa napautusta kartalta, eikä kartan
 * päällä ole enää ohjetekstiä. Jos kartalla ei tapahdu MITÄÄN näin
 * pitkään aikaan, pöllö vinkkaa kiinteällä lauseella. Viisitoista
 * sekuntia on pitkä tauko pelin tahtiin: se ei ehdi häiritä sitä, joka
 * vain katselee karttaa vuoroaan miettien, mutta ehtii avuksi sille,
 * joka ei tiedä mitä pitäisi tehdä.
 */
const VALINTAVIHJEEN_VIIVE = 15000;
const VALINTAVIHJEEN_TEKSTI = 'Napauta korostettua kohdetta kartalla, niin matka jatkuu.';
/*
 * Tietäjätason onnittelukupla pöllönapin vieressä (naytaTietajaNousut).
 * Lause on pari riviä pitkä, ja tämä on se aika, jonka se saa olla
 * yksin ennen kuin seuraava nousu vaihtaa sen. Viimeinen kupla jää
 * näkyviin, kunnes pelaaja koskee karttaan.
 */
const TIETAJAKUPLA_MS = 4200;
/*
 * Maan ääriviivan piirtoanimaatio (animoiMaanAariviiva). Piirto on
 * omistajan toivomat "parisen sekuntia". Väläys poistui kokonaan
 * (omistaja 13.8.2026 ilta: "otetaan rajan väläytys pois mutta raja
 * voisi jäädä lähes yhtä voimakkaana näkyviin kuin se on piirron
 * lopussa") — piirron perään jää vain lyhyt pehmeä asettuminen
 * lepoarvoihin, sama kesto myös CSS:ssä (maa-aariviivan-asettuminen).
 */
const AARIVIIVAN_PIIRTO_MS = 2000;
const AARIVIIVAN_ASETTUMIS_MS = 750;
/*
 * Fokusmoodin sumuverhon reunan pehmennys laudan yksikköinä
 * (js/ui.js paivitaFokusSumu). Maailmankartta on 12000 yksikköä leveä ja
 * yksi maa kymmeniä satoja, joten 26 on rajan yli levittyvä haalistuma —
 * ei pelkkä pehmennetty viiva eikä koko naapurimaata nielevä pilvi.
 */
const FOKUS_REUNAN_PEHMENNYS = 26;
/*
 * Haalistuman portaat: kerroin pehmennykselle ja viivan peittävyys.
 * Leveimmästä kapeimpaan, jolloin päällekkäin ladottuina ne tekevät
 * neljä askelta harsosta kirkkaaseen maahan. Suodatinta ei käytetä (ks.
 * paivitaFokusSumu) — nämä ovat tavallisia ääriviivoja maskin sisällä.
 */
const FOKUS_REUNAN_PORTAAT = [
  { leveys: 3, peitto: 0.25 },
  { leveys: 2, peitto: 0.45 },
  { leveys: 1, peitto: 0.7 },
];
/*
 * FOKUSKUVAN REUNAN HAALISTUMA (omistajan pelitesti v1101: kuvan
 * suorakaide erottui kartalla "neliörajana").
 *
 * Portaat ovat maskin PÄÄLLEKKÄISIÄ täyttöjä uloimmasta sisimpään:
 * ensimmäinen kattaa koko kuvan alan heikosti, viimeinen on ikkuna
 * täytenä mustana eli täysin kirkkaana. Väliin jäävä kaista on
 * täsmälleen kuvan omaa vuotoa (bbox miinus rajaus), joten verho
 * voimistuu juuri siinä missä kuvakin haalistuu — reunaviivaa ei jää.
 *
 * Peittävyydet kertyvät päällekkäin (1 - (1-a)(1-b)…), joten luvut ovat
 * matalampia kuin lopputulos: 0,16 → 0,40 → 0,65 → 0,87 → kirkas.
 */
const FOKUS_KUVAN_REUNA = [0.16, 0.28, 0.42, 0.62, 1];
/*
 * NYKYISEN KAUPUNGIN LAATTA FOKUSLEHDEN PÄÄLLÄ (omistajan pelitesti
 * 24.8.2026: laatta takaisin, mutta paljon pienempänä).
 *
 * MITTA ON RUUDULLA, EI LAUDALLA. Fokusmoodin zoomiväli on valtava —
 * yleiskuvassa koko Eurooppa, fokusajon jälkeen yksi maa — ja laudan
 * yksiköissä mitoitettu laatta olisi lehdellä joko täplä tai kiekko
 * puoli ruutua. Laatta viritetään siksi ruutumittaan: halkaisija on
 * lehden perusnäkymässä noin 23 px, jolloin se ei hallitse lehteä
 * muttei myöskään katoa.
 *
 * MITTA ON LEHDEN PERUSTASOLLA, EI JOKA ZOOMILLA (omistajan LOPULLINEN
 * linjaus 26.8.2026, kumoaa 25.8. kirjatun kiinteän ruutukoon):
 * *"pisteiden koko pitäisi olla koko ajan sama suhteessa kartan muihin
 * elementteihin"*. Kerroin on nyt VAKIO (fokusMerkkiSkaala): laatta on
 * FOKUS_LAATTA_PX siinä näkymässä, johon saapumisajo maahan päätyy, ja
 * kasvaa tai kutistuu siitä kartan mukana. Sama tekniikka kaikilla
 * fokusnäkymän merkkikerroksilla: kohdemerkit (js/fokuskohteet.js),
 * kohtaamispiste (js/fokuspiste.js), nostosymbolit
 * (js/fokusnosto-symbolit.js) sekä nappula ja aarremerkki
 * (fokusMerkkiKerroin).
 *
 * MITTA PIENENI NOIN 12 % (26 → 23) omistajan pelitestitilauksesta
 * 26.8.2026 (iPhone, Kreikka): *"Kaikkia pisteitä voisi hieman
 * pienentää. Myös Ateenan pääpistettä voi hieman pienentää."* Samassa
 * erässä kohdemerkit kutistuivat 15 % (js/fokuskohteet.js). Laatta
 * pysyy silti kartan kiinnekohtana, ja napautusalue on ennallaan
 * sormenkokoinen (FOKUS_LAATTA_OSUMA_PX).
 */
// 23 -> 19 (omistaja 27.8.2026 aamu: "sekä Ateenan laattaa").
/*
 * 19 -> 15 (omistajan pelitesti 28.8.2026, iPhone: *"Myös Ateenan
 * laatta ja pelinappula voi olla vielä pienempi."*). Laatta on yhä
 * selvästi nappulaa leveämpi — perustasolla 15 px, kun kartalle
 * piirretty nappula on 7,8 lautayksikköä leveä (NAPPULAN_POLKU) —
 * joten sen reuna kiertää hahmon kuten ennenkin.
 */
const FOKUS_LAATTA_PX = 15;
/*
 * LEHDEN OMA PROTOTYYPPILEVEYS PIKSELEINÄ (tools/fokuskartta/piirto.js
 * `S`): lehden kaikki ladonta — kirjainkoot, viivanleveydet,
 * vuorikolmiot — on annettu 1600 pikselin levyisen lehden pikseleinä.
 * Yksi lehden oma pikseli on siis `rajaus.w / 1600` lautayksikköä.
 * Sama luku on js/fokuskohteet.js KOHDE_POLTETTU_PROTO, joka mittaa
 * kuvaan poltettuja kaupunginnimiä.
 */
const FOKUS_LEHTI_PROTO = 1600;
/*
 * MERKIN KATTO LEHDEN OMINA PIKSELEINÄ (ks. fokusMerkkiSkaalaKartalle).
 *
 * Yksi merkin perustason pikseli saa olla enintään tämän verran lehden
 * omia pikseleitä. 2,0 on mitoitettu kartan omista merkinnöistä: sillä
 * katolla kohdemerkin symboli on lehden vuorikolmion mittainen (4,5 vs.
 * 3,8 lautayksikköä Kreikan lehdellä) ja nimiö poltetun vuorennimen
 * kokoinen (3,4 vs. 3,2) — merkki on kartan merkintä eikä nappi sen
 * päällä. iPhonella kertoimeksi tulee 2,1 (9,7 -> 4,5), kun ennen
 * merkki oli 2,6-kertainen kolmioon nähden.
 *
 * KATTO EI PURE LEVEÄLLÄ RUUDULLA. Kreikan lehdellä katto on 0,585,
 * kun skaala on työpöydällä (1440 x 900) 0,356 ja iPadilla
 * (834 x 1112) 0,572 — kummankaan näkymä ei siis muutu lainkaan.
 */
const FOKUS_MERKKI_KATTO = 2.0;
/*
 * Napautusalue on suurempi kuin piirretty laatta: laatta on
 * fokusnäkymässä Tutki-napin paikka (alarivillä on vain Liiku), ja
 * sormenpään vähimmäismitta on 44 px. 48 px antaa siihen varan.
 */
const FOKUS_LAATTA_OSUMA_PX = 48;
/*
 * SYKKIVÄN KEHÄN LEPOSÄDE RUUDUN PIKSELEINÄ (omistajan pelitestitilaus
 * 25.8.2026: *"Ateenan laatta sykkii kevyesti houkutellen
 * klikkaamaan"*). Laatan säde on FOKUS_LAATTA_PX / 2 = 11,5, joten 15
 * jättää kehän laatan ulkopuolelle mutta sen mittasuhteisiin — kehä
 * kutistui laatan mukana (17 → 15 → 12, ks. FOKUS_LAATTA_PX); CSS
 * kasvattaa sitä sykkeen huipussa muutaman pikselin
 * (css .fokuslaatta-syke). Kehä on olemassa vain silloin, kun laatan
 * napautus oikeasti tekee jotain (fokusLaattaTutkii).
 */
const FOKUS_LAATTA_SYKE_PX = 12;
/*
 * AARREMERKIN SÄDE LAUDAN YKSIKÖINÄ oli täällä 26.8.2026 lähtien. Kartan
 * aarremerkki poistui 28.8.2026 illalla (drawTokens: laatta vain vaihtaa
 * väriä), joten mittaa ei enää tarvita.
 */
/*
 * FOKUSNÄKYMÄN NAPPULA JA AARREMERKKI RUUDUN PIKSELEINÄ (omistajan
 * pelitestitilaus 26.8.2026, iPhone-kuvakaappaus Kreikasta: *"Nämä
 * pisteet näkyvät aivan liian suurella"*).
 *
 * VIKA OLI SAMA KUIN LAATALLA AIKANAAN: pelinappula ja käännetty
 * laatta ovat laudan yksiköissä, ja fokuszoomi suurentaa ne ruudulla
 * moninkertaisiksi — kuvakaappauksessa nappula oli neljänneksen
 * ruudun levyinen. Korjaus on sama mitoitus kuin nykyisen kaupungin
 * laatalla (FOKUS_LAATTA_PX, paivitaFokusLaatta): mitta luetaan
 * RUUDULTA lehden perustasolla eikä laudalta.
 *
 * SUHTEET: nappula on laatan kokoluokkaa (28 vs. 26) — se on pelaajan
 * oma paikka ja saa olla kiinnekohta — ja aarremerkki on
 * kääntämätöntä laattaa pienempi (20 vs. 26), kuten laudallakin.
 *
 * MUILLA LAUDOILLA JA FOKUSNÄKYMÄN ULKOPUOLELLA KOOT OVAT ENNALLAAN:
 * kerroin on 1 aina kun fokusnäkymä ei ole päällä
 * (paivitaFokusMerkkiMitat).
 */
const FOKUS_NAPPULA_PX = 28;
const FOKUS_AARRE_PX = 20;
/*
 * Nappulan oma säde laudan yksiköinä. Luku on peräisin vanhasta
 * `pawn-ring`-kehästä (13) ja on JÄTETTY ENNALLEEN, vaikka nappula on
 * nyt tinaherra: fokusnäkymän mitoitus (fokusMerkkiKerroin,
 * FOKUS_NAPPULA_PX) ja nimikyltin etäisyys on viritetty tähän lukuun,
 * eikä hahmon vaihto saa muuttaa kokoja lehden päällä.
 */
const NAPPULAN_R = 13;
/*
 * TINAHERRA PELINAPPULANA (omistajan tilaus #100).
 *
 * Kuva on läpinäkyvä webp ILMAN OMAA VARJOA — varjo piirretään
 * koodilla, koska vain silloin se voi irrota hypyn laella ja kertoa
 * korkeuden (pawnShape, hyppaaAskel).
 *
 * MITAT LAUDAN YKSIKÖISSÄ. Korkeus on 28 eikä enempää siksi, että
 * kaupungin nimikyltti ladotaan laudalla nappulan YLÄPUOLELLE
 * (boardBounds: ly oletuksena -19). Silinterin laki jää sen alle;
 * isompi hahmo peittäisi nimen. Leveys on kuvan oma kuvasuhde
 * (177 x 256 px), jotta herra ei veny.
 *
 * ANKKURI on jalustan keskipiste kuvassa (osuus leveydestä ja
 * korkeudesta): juuri se kohta asetetaan kaupungin päälle, jolloin
 * hahmo seisoo laudalla eikä leiju sen yllä. Luvut on mitattu
 * kuvasta — jalusta on hieman vasemmalla, koska keppi vie tilaa.
 */
const NAPPULAN_KUVA = 'assets/kartat/nappula-tinaherra.webp';
const NAPPULAN_KORKEUS = 28;
const NAPPULAN_LEVEYS = NAPPULAN_KORKEUS * (177 / 256);
const NAPPULAN_ANKKURI_X = 0.424;
const NAPPULAN_ANKKURI_Y = 0.918;
/*
 * Jalusta hitusen kaupungin pisteen alapuolella, kuten vanha varjokin:
 * ilman tätä hahmo leijuisi pisteen päällä eikä seisoisi siinä.
 *
 * 6 -> 3,5 (omistaja 28.8.2026). Kun kaupungin laatta tuli takaisin
 * nappulan alle, kuuden yksikön siirto vei jalustan, varjon ja
 * vuororenkaan laatan alalaitaan — ne rikkoivat laatan reunan juuri
 * siitä, mistä laatan piti näkyä. 3,5 pitää perspektiivin (jalusta on
 * yhä pisteen alapuolella) mutta jättää hahmon laatan päälle.
 */
const NAPPULAN_JALKA_Y = 3.5;
/*
 * PUINEN LAUTAPELINAPPULA (omistajan tilaus 27.8.2026: *"kokeile
 * muuttaa tinaherra mahdollisimman yksinkertaiseksi pelinappulaksi,
 * nykyinen on liian raskas visuaalisesti"* — ja 28.8.2026: *"puun
 * värisen ja matalamman"*).
 *
 * MIKSI: tinaherra on tummaa metallia ja täynnä yksityiskohtia —
 * silinteri, keppi, matkalaukku — ja kartalla se lukee pikkuesineenä,
 * ei pelaajan paikkana. Laudalla nappula on kymmenkunta pikseliä
 * korkea, jolloin yksityiskohdat menevät mössöksi ja jäljelle jää vain
 * tumma läiskä seepiakartan päällä. Kartionappula on SILUETTI: sen
 * tunnistaa yhdellä silmäyksellä missä koossa tahansa.
 *
 * PUUN VÄRI EIKÄ VALKOINEN. Ensimmäinen versio oli lämmin valkoinen, ja
 * seepiakartan päällä se luki paperinpalana: vaalein asia laudalla oli
 * pelaajan oma nappula, ja katse tarttui siihen ennen karttaa. Sorvatun
 * pyökin sävy (css .pawn-nappula) on samasta paletista kuin kartta
 * itse — se on lautapelin osa kartan päällä, ei reikä kartassa — mutta
 * selvästi tummempi ja kylläisempi kuin kaupungin laatta (#f3e5c4),
 * joten hahmo erottuu siitä laatasta, jonka päällä se seisoo.
 *
 * PIIRRETÄÄN KOODILLA, EI KUVANA. Ääriviiva skaalautuu zoomissa
 * terävänä, tiedostoa ei tarvitse ladata eikä tallentaa välimuistiin,
 * ja väriä voi säätää yhdestä paikasta (css .pawn-nappula).
 *
 * MITAT LAUDAN YKSIKÖISSÄ, ja ne on sovitettu KAUPUNGIN LAATTAAN, ei
 * enää tinaherran silinteriin (omistajan tilaus 28.8.2026, ks.
 * NAPPULAN_POLKU alla): laki 18,1 ja leveys 10 laudan yksikköä, kun
 * tavallisen kaupungin laatta on 23,2 yksikköä leveä (drawCities, rx
 * 11,6) ja kaupunkilaudalla 19,0 (nodeScale 0,82). Nappula seisoo
 * laatan päällä peittämättä sitä, ja kaupungin nimikyltti nappulan
 * yläpuolella (boardBounds ly -19) jää entistä väljemmälle.
 *
 * PALUU VANHAAN on yhden vakion mittainen: NAPPULA_TYYLI = 'tinaherra'
 * palauttaa webp-kuvan (tiedosto on jätetty repoon juuri siksi).
 */
const NAPPULA_TYYLI = 'puinen';
/*
 * Klassinen nappulan siluetti yhtenä polkuna: pyöreä jalusta, kartioksi
 * kapeneva runko, kaulus ja pallopää. Yksi polku eikä kolme päällekkäistä
 * muotoa siksi, että ääriviiva kiertää hahmon ULKOREUNAA — päällekkäisistä
 * paloista näkyisivät saumat läpi.
 *
 * Origo on jalustan keskipiste ja y kasvaa alaspäin (SVG), joten hahmo
 * nousee negatiiviseen y-suuntaan. Pään kaari on yksi A-komennon puoliympyrää
 * suurempi kaari; kaulus on kaksi lyhyttä käyrää sen alla.
 *
 * MATALAMPI JA KAPEAMPI KUIN ENSIMMÄINEN VERSIO (omistaja 28.8.2026:
 * *"pelinappulasta voisi tehdä puun värisen ja matalamman. ja lisäksi
 * sen alta saisi näkyä kaupungin laatta (nyt ei näy ollenkaan). eli
 * nappula saa olla pienempi"*).
 *
 * MITTA TULEE LAATASTA. Nappula oli 13,2 x 25,9 yksikköä, eli sen
 * jalusta oli lähes yhtä leveä kuin kaupungin laatta (23,2) ja hahmo
 * ylsi kaupungin nimen tasalle. Silloin laatasta ei jäänyt nappulan
 * ympärille reunaa, ja laatta piti piilottaa kokonaan hahmon alta
 * (css .nappulan-alla) — juuri se on omistajan havainto "ei näy
 * ollenkaan". Nyt siluetti on 10 x 18,1 eli laatan levyinen vain
 * 43-prosenttisesti: laatan reunaa jää molemmin puolin noin kuusi
 * yksikköä, ja laatta piirretään taas nappulan alle.
 *
 * SUHTEET EIVÄT OLE PELKKÄ SKAALAUS. Korkeus kutistui 70 %:iin mutta
 * leveys vain 76 %:iin: matalampi nappula on myös TUKEVAMPI, muuten
 * siitä tulisi neula. Pää on suhteessa hitusen pienempi (halkaisija
 * 6,1 vs. jalusta 10) kuin ennen (8,6 vs. 13,2), jottei siitä tule
 * pienessä koossa nuppineulan päätä.
 *
 * VIELÄ 22 % PIENEMPI (omistajan pelitesti 28.8.2026, iPhone: *"Myös
 * Ateenan laatta ja pelinappula voi olla vielä pienempi."*). Siluetti
 * on nyt 7,8 x 14,1 yksikköä, eli koko polku on kerrottu 0,78:lla —
 * mittasuhteet säilyvät täsmälleen, ja kaupungin laattaa (23,2)
 * jää hahmon molemmin puolin entistä enemmän näkyviin. Fokusnäkymässä
 * laatta on 15 px eli sekin kutistui (FOKUS_LAATTA_PX), joten hahmon
 * ja laatan suhde pysyi.
 */
const NAPPULAN_POLKU = 'M 3.9 0'
  + ' C 3.9 -1.33 2.77 -1.48 2.5 -2.42'
  + ' C 2.07 -4.49 1.64 -6.55 1.51 -8.07'
  + ' L 2.18 -8.62'
  + ' C 2.6 -8.93 2.48 -9.59 1.54 -9.91'
  + ' A 2.38 2.38 0 1 0 -1.54 -9.91'
  + ' C -2.48 -9.59 -2.6 -8.93 -2.18 -8.62'
  + ' L -1.51 -8.07'
  + ' C -1.64 -6.55 -2.07 -4.49 -2.5 -2.42'
  + ' C -2.77 -1.48 -3.9 -1.33 -3.9 0'
  + ' C -3.9 0.62 3.9 0.62 3.9 0 Z';
/* Siluetin laki jalustasta mitattuna (pään keskipiste 11,72 + säde 2,38). */
const NAPPULAN_LAKI = 14.1;
/*
 * Osuma-alueen katto LAUDAN yksiköissä. Ruutumitta muuttuu laudan
 * yksiköiksi jakamalla zoomilla, ja yleiskuvassa (pieni zoom) jakolasku
 * kasvattaisi alueen naapurikaupunkien päälle — 34 on sama säde kuin
 * kehittäjätilan omilla napautusalueilla (drawTargets).
 */
const FOKUS_LAATTA_OSUMA_LAUDALLA = 34;
/*
 * VALITTAVAN KOHTEEN MERKKI FOKUSNÄKYMÄSSÄ (omistajan pelitestitilaus
 * 26.8.2026, iPad-kuvakaappaus Liiku-tilasta).
 *
 * VIKA: matkakohteet piirtyivät fokuslehden päälle laudan omalla
 * kielellä eli isoina punaisina katkoviivarenkaina (.target-ring, säde
 * 22 laudan yksikköä) ja kultahaloineen. Fokusnäkymän zoomilla se on
 * ruudulla yli 60 pikselin rengas keskellä hienovaraista atlaslehteä —
 * omistajan sanoin *"ruma"*.
 *
 * KORJAUS: sama kieli kuin nykyisen kaupungin laatalla (ks.
 * FOKUS_LAATTA_PX yllä) eli PIENI PYÖREÄ MERKKI, jonka koko mitataan
 * RUUDULTA eikä laudalta. Merkki on hiukan pienempi kuin oma laatta
 * (18 px vs. 26 px): valittava kohde on ehdotus, oma sijainti on
 * kiinnekohta.
 *
 * NIMI KUULUU MERKKIIN. Fokuslehden ulkopuolella olevan kohteen
 * (Sofia, Istanbul) laatta ja nimi ovat lehden vieressä laudan
 * yleiskuvassa niin pieninä, ettei pelaaja tiedä mihin on
 * lähdössä. Nimi ladotaan siksi merkin viereen kohdekerrokseen, jolloin
 * se on olemassa riippumatta siitä, mitä laudan omalle nimelle tapahtuu.
 *
 * NIMI ON ISOMPI KUIN LEHDEN OMAT KAUPUNKINIMET (css .city-label
 * fokusnäkymässä ~7,5 laudan yksikköä eli noin 10 px ruudulla): valinta
 * saa erottua siitä, mikä on jo paikallaan. 13 px on maltillinen ero,
 * ei otsikko.
 */
const FOKUS_KOHDE_PX = 18;
const FOKUS_KOHDE_NIMI_PX = 13;
/*
 * PAIKALLAAN OLEVAN KAUPUNGIN NIMI on selvästi pienempi kuin valittavan
 * kohteen (Raamattu, KAMERA PELIN KÄSISSÄ: *"valittavien nimet hieman
 * isommalla, nykyisen sijainnin nimet paljon pienemmällä"*). Mitta on
 * ruudulla eikä laudalla, kuten kaikilla fokusnäkymän merkeillä
 * (paivitaFokusNimilaput).
 */
const FOKUS_NIMI_PX = 9;
/*
 * NYKYISEN KAUPUNGIN NIMI NAPPULAN ALLE.
 *
 * TÄSSÄ OLI 24 LAUDAN YKSIKKÖÄ (omistajan pelitestipalaute v1119:
 * *"ATEENAN NIMIKYLTTI on LIIAN ALHAALLA — kaukana kaupungin
 * kultaisesta merkistä"*).
 *
 * Luku oli oikein silloin kun se kirjoitettiin: pelinappula oli laudan
 * yksiköissä (kehä 17 yksikköä), joten sen alle oli pakko ladota laudan
 * mitalla. Sen jälkeen nappula sai ruutumitan muiden merkkien tapaan
 * (paivitaFokusMerkkiMitat, FOKUS_NAPPULA_PX), eikä laudan yksiköitä
 * enää tarvita — mutta luku jäi. Fokuszoomissa 24 yksikköä on noin 70
 * ruutupikseliä, ja juuri niin kaukana nimi oli laatastaan (mitattu
 * 68 px).
 *
 * Nyt mitta on RUUDUN pikseleitä kuten kaikki muukin fokusnäkymässä:
 * nappulan puolikas, rako ja kirjaimen korkeus.
 */
const FOKUS_NIMI_NAPPULAN_ALLE_PX = 28 / 2 + 4 + 9;
/*
 * NIMEN PIENIN SALLITTU KOKO RUUDULLA (omistajan pelitestipalaute
 * v1119: *"kyltistä PUUTTUU PALOJA — teksti piirtyy rikkinäisenä"*).
 *
 * Nimikoko on ruutumitta LEHDEN PERUSTASOLLA ja kutistuu siitä kartan
 * mukana, joten hieman uloszoomattuna Ateenan nimi piirtyi seitsemän
 * pikselin korkuisena (mitattu). Sen kokoinen teksti ei enää ole pieni
 * vaan rikki: kirjaimet katoavat pikselirasteriin ja pergamenttihalo
 * täyttää sen mitä jää. Tämä on lattia, jonka alle koko ei mene.
 */
const FOKUS_NIMI_VAHIN_PX = 11;
/* Askelpiste ilman kaupunkia on pelkkä reitin nasta — puolet merkistä. */
const FOKUS_KOHDE_PISTE_PX = 10;
/* Napautusalue: sama sormisääntö kuin laatalla, sama katto laudalla. */
const FOKUS_KOHDE_OSUMA_PX = 48;
/*
 * NÄKYMÄN KOKOVAHDIN RAJAT (ks. UI vahdiNakymanKokoa).
 *
 * Alle 240 pikselin leveys ei ole mikään laite vaan mittausvirhe —
 * kapeinkin puhelin on 320 px. Neljänneksen romahdus on selvä merkki
 * siitä, ettei mitta ole vielä asettunut; 120 ms riittää iOS:llä
 * niputtamaan peräkkäiset resize-tapahtumat yhdeksi.
 */
const NAKYMAN_VAHIMMAISLEVEYS = 240;
const NAKYMAN_KUTISTUMISRAJA = 0.75;
const NAKYMAN_ELVYTYSVIIVE = 120;
/*
 * Sama roskaraja korkeudelle: matalinkin puhelin vaakatasossa on yli
 * 300 px, joten sitä pienempi luku on mittausvirhe eikä laite.
 */
const NAKYMAN_VAHIMMAISKORKEUS = 300;
/*
 * Visuaaliviewportin oikaisun harvennus (ks. vahdiNakymanKokoa,
 * oikaisuVahti): näppäimistön ja sanelupalkin animaatio laukoo
 * resize/scroll-tapahtumia kymmeniä sekunnissa, ja sovitus ajetaan
 * vasta kun virta on ollut hetken hiljaa — asettunut mitta on se,
 * josta geometria kannattaa johtaa.
 */
const OIKAISUN_HILJAISUUS_MS = 250;
/*
 * Paluun vakiintumissilmukka (ks. sovitaTaustapaluu): mitat luetaan
 * tähän tahtiin niin kauan kuin kesto sallii. Kesto on pitkä, koska
 * omistajan laitteella mitat ovat palautuneet vasta sekunteja paluun
 * jälkeen (jäädytetty prosessi + sanelunäppäimistö) — askel on halpa
 * (pelkkä mittojen luku), joten pitkä silmukka ei maksa mitään.
 */
const PALUU_TAHTI_MS = 300;
const PALUU_KESTO_MS = 8000;
// Kirjoituskoneen tahti: avaus saa naksua rauhassa, muut tekstit ripeästi.
const TYPE_MS = 50;
const INTRO_TYPE_MS = 190;
/*
 * KIRJOITTAJAN RYTMI. Sanaväli huojuu, ja välimerkin jälkeen pidetään
 * tauko: revennyt katkelma jättää lukijan pisimmäksi aikaa tyhjän
 * päälle, piste hengähdyksen ajaksi ja pilkku hetkeksi.
 *
 * Taulukossa eikä koodissa, koska kaksi kohtaa lukee samat luvut:
 * typeText arpoo niistä oikean viiveen, ja kirjoituksenKesto laskee
 * niiden keskiarvoista, kuinka kauan rivin kirjoittaminen kestää.
 * Jälkimmäistä tarvitaan lennon mitoitukseen.
 */
const KIRJOITUSTAUOT = [
  { osuu: /…"?$/, tauko: 1200, huojunta: 500 },
  { osuu: /[.!?]$/, tauko: 620, huojunta: 320 },
  { osuu: /[,;:—–]$/, tauko: 300, huojunta: 160 },
];
// Kirjoittaja pysähtyy välillä miettimään kesken virkkeenkin.
const KIRJOITUS_MIETE = { osuus: 0.15, tauko: 280, huojunta: 340 };
/*
 * Ne kirjoituspaikat, joilla rytmi on käytössä. Muualla teksti naksuu
 * tasaisesti: pelitilanneilmoitus tai tehtäväkortti ei ole kenenkään
 * kirjoittama, vaan pelin oma ääni.
 *
 * Lennon repliikki liitettiin joukkoon 12.8.2026 omistajan tilauksesta:
 * *"pitää animoida samalla tavalla kuin etusivun teksti"*. Se on nuoren
 * herran oma repliikki niin kuin avaustekstikin, joten se ansaitsee
 * saman käden — ja koska tahti on sama, ruututeksti pysyy luennan
 * tahdissa siellä missä kertoja lukee.
 */
const KIRJOITUSRYTMI = new Set(['intro', 'flight', 'saapuminen']);

/**
 * Kuinka kauan typeText kirjoittaa tekstin: sama rytmi keskiarvoilla,
 * ilman arpaa. Lennon kesto mitoitetaan tällä, jottei kone laskeudu
 * kesken lauseen.
 */
export function kirjoituksenKesto(teksti, tahti = INTRO_TYPE_MS) {
  const sanat = String(teksti).trim().split(/\s+/).filter(Boolean);
  if (!sanat.length) return 0;
  // Ensimmäinen sana ilmestyy yhden tahdin päästä, ja sen jälkeen
  // jokainen väli on edellisen sanan mukainen (ks. typeText).
  let ms = tahti;
  for (const sana of sanat.slice(0, -1)) {
    // Huojunnan (0,7…1,3) keskiarvo on tasan yksi tahti.
    ms += tahti;
    const tauko = KIRJOITUSTAUOT.find((t) => t.osuu.test(sana));
    if (tauko) ms += tauko.tauko + tauko.huojunta / 2;
    else ms += KIRJOITUS_MIETE.osuus * (KIRJOITUS_MIETE.tauko + KIRJOITUS_MIETE.huojunta / 2);
  }
  return ms;
}
/*
 * Avaustekstin kirjasinkoko sovitetaan kaistaan näiden rajojen sisällä.
 *
 * Pienennetty omistajan pyynnöstä 12.8.2026 ("selvästi nykyisestä"):
 * yläraja 1,32 → 0,96 ja lattia 0,72 → 0,6. Vanha yläraja täytti
 * leveällä ruudulla koko kartan alapuolisen pergamentin, ja kapealla
 * ruudulla viimeinen rivi ("Valitse kohde kartalta") jäi kaistan
 * ulkopuolelle, koska lattia tuli vastaan ennen kuin teksti mahtui.
 */
/*
 * Nostettu 0,96 → 1,14 (omistaja 26.8.2026: *"tekstiä saisi ainakin
 * iPadilla suurentaa, siis sitä konekirjoitettua"*). fitIntro kutistuu
 * lattiaan asti kapealla ruudulla, joten katto koskee vain ruutuja,
 * joilla tila riittää — juuri iPadia.
 */
const INTRO_FONT_MAX = 1.14;
const INTRO_FONT_MIN = 0.6;
/*
 * AVAUKSEN YLÄLOHKON HAARUKKA (omistajan pelitestipalaute v1119:
 * *"maailmankarttakuva katkeaa nyt liian aikaisin, eteläinen
 * pallonpuolisko leikkautuu … kasvata ylälohkoa niin että kartta näkyy
 * KOKONAAN alareunaansa asti"*).
 *
 * Entinen 28–55 % oli liian tiukka: iPadin pystyruudulla mitattu
 * laudan alalaita on noin 57 % paneelin korkeudesta, joten katto
 * leikkasi kartan juuri ennen sen omaa alareunaa. Väljä haarukka
 * päästää mitatun rajan läpi; lattia on yhä olemassa siltä varalta,
 * että hyvin matalalla ruudulla mitattu raja jäisi olemattomaksi.
 *
 * Arkille jää pahimmillaankin runsas neljännes paneelista, ja
 * avausteksti kutistuu siihen (js/ui.js fitIntro).
 */
const INTRO_KARTTA_VAHINTAAN = 0.24;
const INTRO_KARTTA_ENINTAAN = 0.72;
/*
 * Arkin yläreunan häivytyskaista arkin omina em-yksiköinä — sama luku
 * kuin css .intro-arkki::before korkeudessa. Raja työnnetään tämän
 * verran laudan alalaidan alapuolelle, jotta liuku osuu laudan
 * ALAPUOLISEEN pergamenttiin eikä syö karttakuvan alinta kaistaletta.
 */
const INTRO_HAIVYTYS_EM = 2.2;
/*
 * Omistajan päättämä avausteksti. ÄLÄ muokkaa ilman omistajan lupaa
 * (docs/tyolista-opukselle.md, paketti 3). Lyhennetty omistajan
 * pyynnöstä 4.8.2026; draamaviilaus omistajan hyväksynnällä
 * 10.8.2026. Teksti ja luenta (intro-puhe.mp3) pidetään samana —
 * muutos vain tools/generoi-avaus.mjs:n kautta, jonka INTRO_RUUTU
 * on tämän vakion ainoa lähde (sanasta sanaan).
 *
 * V3/V4 25.8.2026 (omistajan etusivu-uudistus): kirjan nimi pois —
 * se luetaan nyt kansikuvan selästä (assets/etusivu/kansikuva.png) —
 * ja ohjerivi "Valitse kohde kartalta" pois, koska ohjeen tilalle
 * tuli klikattava viimeinen lause (INTRO_VALINTA). Teksti päättyy
 * siis täsmälleen siihen, mihin nauhoitettu luentakin.
 */
/*
 * V5 25.8.2026 (omistajan uusi alkuteksti, sanasta sanaan): terminaali
 * ja revitty sivu yhdessä kappaleessa; paikkarivi naputetaan ensin
 * kirjoituskoneella ja luenta alkaa vasta tästä kappaleesta.
 */
const INTRO_TEXT = 'Vintiltä löytyi isoisän matkalaukku ja kulunut '
  + 'matkakirja. Juoksen sisälle terminaaliin ja olen varma, että ukko '
  + 'oli löytänyt jotain. Mutta kuka on repinyt kirjasta viimeisen '
  + 'sivun?';
/*
 * KYSYMYS ON NAPPI (omistajan tilaus 26.8.2026, ilta): "Mistä
 * aloitan?" on samalla se kehystetty 1873-nappi, joka vie kartan
 * lähikuvaan Lontoon kohdalle. Välivaihe, jossa kysymys oli pelkkää
 * tekstiä ja sen alla erillinen ALOITA MATKA -nappi, purettiin — kaksi
 * peräkkäistä kehotusta oli yksi liikaa.
 *
 * Nappi EI OLE KERRONTAA eikä siksi kuulu INTRO_TEXTiin: nauhoitettu
 * luenta päättyy revittyyn sivuun.
 *
 * TEKSTI ON NYT KEHOTUS EIKÄ KYSYMYS (omistajan pelitestipalaute
 * v1119): *"Mistä aloitan?" → "Valitse aloituskaupunki"*. Nappi vie
 * kartan lähikuvaan, jossa valinta oikeasti tehdään, ja kysymys jätti
 * epäselväksi mitä napista tapahtuu.
 */
const INTRO_VALINTA = 'Valitse aloituskaupunki';
/*
 * ETUSIVUN PAIKKARIVI (omistajan tilaus 25.8.2026): kohtausmerkintä
 * avaustekstin ensimmäisenä rivinä, kuukausi ja vuosi laitteen
 * kellosta. Kertoja EI lue tätä (nauhoitettu luenta alkaa vasta
 * varsinaisesta tekstistä), joten rivi elää oman elementtinsä
 * varassa eikä ole osa INTRO_TEXTiä.
 */
const INTRO_PAIKKA = 'Heathrow, Lontoo';

/*
 * ETUSIVUN ALKUANIMAATIO: kuusi reittiä, joita pitkin kulkee sykkivä
 * valopiste ja piirtää kuljetun osuuden näkyviin katkoviivana.
 *
 * Omistajan tilaus 12.8.2026: aloituskartalle kevyt jatkuva liike —
 * isoisän maailmanympärysmatka punaisella ja laivareitit sinisellä.
 *
 * HIENOSÄÄTÖ 12.8.2026, kun animaatio vihdoin näkyi omistajan
 * Safarissa. Neljä havaintoa, neljä muutosta:
 *   1. PISTE SYKKII SELVÄSTI. Ennen säde hengitti 4,2 sekunnin
 *      jaksolla ja kehä vastavaiheessa ytimen kanssa, jolloin kärjen
 *      kokonaispinta pysyi jotakuinkin samana eikä syke erottunut.
 *      Nyt kehä ja ydin sykkivät samassa vaiheessa 1,6 sekunnissa, ja
 *      säteen lisäksi aaltoilee peittävyys.
 *   2. JÄLKI JÄÄ NÄKYVIIN. Ennen jälki oli lyhyt haipuva häntä, joka
 *      seurasi pistettä "kuin mato" ja katosi heti perässä. Nyt
 *      kuljettu osuus piirtyy pysyvästi tasaisen himmeänä
 *      katkoviivana ja pyyhkiytyy vasta kun silmukka alkaa alusta.
 *   3. LAIVOJA ON NELJÄ. Yksi sininen reitti oli liian vähän isolle
 *      merikartalle; nyt niitä on neljä eri satamista, ja ne lähtevät
 *      porrastetusti (ks. alku-kenttä).
 *   4. SINISET OVAT HIMMEÄMPIÄ. Punainen piste on päähahmo, laivat
 *      taustaa — ero tehdään kirkkauskertoimella (LAJIN_KIRKKAUS),
 *      ei värillä.
 *
 * REITTIPISTEET OVAT LAUDAN OMIA. Jokainen väliarvo alla on poimittu
 * js/packs/maailma.js:n WORLD_EDGES-merireiteiltä (tai niiden
 * käänteisjärjestyksestä), joten viiva kulkee samoja vesiä kuin pelin
 * omat laivareitit eikä leikkaa mantereita. Käsin arvattu kaari olisi
 * mennyt Madagaskarin ja Afrikan sarven yli.
 *
 * PUNAINEN REITTI ON KAHDESSA OSASSA, koska kahden pallonpuoliskon
 * kartalla Tyynenmeren ylitys tapahtuu kartan reunan yli: oikean
 * ympyrän itäreuna ja vasemman ympyrän länsireuna ovat samaa 160.
 * pituuspiiriä. Yhtenäinen viiva niiden välillä kulkisi koko kartan
 * halki väärään suuntaan. Osat kulkevat vuorotellen samassa
 * silmukassa (ks. ALKUREITIT[].alku), joten matka luetaan yhtenä.
 *
 * KOKO JA VAUHTI ON MITATTU, EI ARVATTU (12.8.2026). Omistaja ei
 * nähnyt animaatiota lainkaan sen paremmin iPhonella kuin
 * työpöytäselaimella. Playwright-mittaus 390 pikselin levyisellä
 * näytöllä osoitti, että kerros rakentuu ja liikkuu oikein — 15
 * polkua, 36 animaatiota, kärki eteni 41 pikseliä viidessä
 * sekunnissa — mutta itse kärki oli vain 2,7 pikseriä leveä ja jäljen
 * pisteet 1,1–1,5 pikseliä. Sen kokoinen piste katoaa seepiakartan
 * omaan kuvioon: kartalla on jo valmiiksi katkoviivoitettuja
 * laivareittejä, ja himmeä pistejono luki osana karttataidetta.
 *
 * Siksi kärki ja jälki ovat nyt noin kaksinkertaisia. Värit ovat
 * ennallaan eli seepian sisällä: liike saa erottua, ilme ei saa
 * muuttua julisteeksi.
 *
 * VAUHTI HILJENI TAKAISIN (omistaja 12.8.2026, sama ilta). Kun pisteet
 * olivat vihdoin näkyviä, kävi ilmi että ne kiitävät: silmukka oli
 * kutistettu 26 sekuntiin siinä toivossa, että liike erottuisi.
 * Näkyvyys tuli koosta, ei vauhdista, joten vauhti sai palata.
 * Punainen kulkee nyt 40 sekunnin silmukkaa (matka-aika 11,4 s → 17,6
 * s, eli noin 39 ja 28 laudan yksikköä sekunnissa reitin osasta
 * riippuen) ja laivat 52–66 sekunnin silmukkaa (noin 17–19 yksikköä
 * sekunnissa). Järjestys on tarkoitettu luettavaksi: punainen on
 * matkalla, siniset ovat maailman taustaliikennettä, ja katse ehtii
 * seurata kumpaakin.
 *
 * KENTÄT: `kesto` on koko silmukan pituus sekunteina, `ikkuna` se
 * osuus silmukasta joka kuluu matkaan (loppu on lepoa, jonka ajan
 * valmis reitti jää näkyviin) ja `alku` se kohta silmukasta, jossa
 * reitti lähtee liikkeelle. `alku` on samalla porrastus: laivat
 * lähtevät 8, 15, 22 ja 28 sekunnin kohdalla, eivät yhtä aikaa.
 *
 * LAIVOJEN IKKUNA ON KAPEAMPI KUIN PUNAISEN. Pelkkä silmukan
 * pidennys olisi hidastanut laivat ryömimään (14 yksikköä
 * sekunnissa), koska matka-aika on kesto × ikkuna. Kapeampi ikkuna
 * pitää laivat selvästi punaista hitaampina mutta yhä liikkeessä, ja
 * antaa samalla valmiille katkoviivalle pidemmän lepohetken ruudulla.
 *
 * ALKU-KENTÄN KAKSI RAJAA (tarkistettu testissä). Sekä kärjen että
 * jäljen avainhetket kierretään kohdasta 1 − alku, ja sen kohdan on
 * osuttava lepovaiheeseen — muuten kierto katkaisisi matkan tai
 * pyyhkäisyn keskeltä. Siitä seuraa `alku + ikkuna < 1` ja
 * `alku > JALJEN_PYYHKAISY` (tai alku = 0, jolloin ei kierretä).
 */
const ALKU_LONTOO = [731.7, 225.9];
const ALKU_KAIRO = [772.5, 322.1];
const ALKU_MUMBAI = [871.5, 353.5];
const ALKU_SYDNEY = [1051.9, 527.7];
const ALKU_NEWYORK = [359, 293.2];
export const ALKUREITIT = [
  {
    // Isoisän matka itään: Lontoo – Välimeri – Suez – Intia – Kaakkois-
    // Aasia – Kiina – Japani. Verne'n reitti pelin omia meriteitä pitkin.
    laji: 'isoisa',
    alku: 0,
    kesto: 40,
    ikkuna: 0.44,
    pisteet: [
      ALKU_LONTOO,
      [713.6, 223.7], [689.3, 236.4], [673.2, 260.6], [679.6, 266.2], [686.5, 270.5],
      [699.3, 272.3], [713.2, 275], [735.1, 280.9], [746.2, 296.8], [769.2, 308],
      ALKU_KAIRO,
      [781.6, 331.9], [790.4, 356.7], [795.9, 367.9], [809, 368.9], [828.9, 365.2],
      [857.5, 359.6],
      ALKU_MUMBAI,
      [876, 388.2], [911.4, 398.9],
      [948.4, 402.6], // Singapore
      [959.5, 368], [972.5, 339.9], [985.2, 304.7], [981.3, 292.4],
      [959.8, 286.6], // Peking
      [992, 307], [1016.5, 309.3],
      [1029.6, 279.5], // Tokio
    ],
  },
  {
    // Paluu: Tyynenmeren toiselta puolelta Los Angelesin kautta New
    // Yorkiin ja Atlantin yli kotiin. Alkaa vasta kun ensimmäinen osa
    // on päättynyt Tokioon.
    laji: 'isoisa',
    alku: 0.5,
    kesto: 40,
    ikkuna: 0.44,
    pisteet: [
      [286.5, 322.3], // Los Angeles
      [313.3, 312.3], [339.5, 293.7],
      ALKU_NEWYORK,
      [412.1, 259], [443.9, 213.6],
      ALKU_LONTOO,
    ],
  },
  {
    // Kauppareitti Intiasta Lontooseen Hyväntoivonniemen kautta — se
    // tie, jota mausteet ja tee kulkivat ennen Suezin kanavaa. Kiertää
    // Afrikan, joten se ei osu isoisän reitin päälle missään kohtaa.
    laji: 'kauppa',
    alku: 0.12,
    kesto: 66,
    ikkuna: 0.55,
    pisteet: [
      ALKU_MUMBAI,
      [882, 392], [880, 435], [855, 470], [830, 495], [799.7, 508.2],
      [750.3, 483], // Kapkaupunki
      [724, 485], [706, 455], [696, 425], [692, 408], [668, 404], [640, 398],
      [627, 382], [616, 365], [610, 350], [604, 335], [610, 320], [617, 305],
      [634, 290],
      [679.8, 278.7], // Tanger
      [670.5, 260.5], [681.8, 239], [705, 226.4],
      ALKU_LONTOO,
    ],
  },
  {
    // Etelä-Atlantti: New York – Rio de Janeiro. Amerikkojen puoliskolla
    // ei liikkunut mitään, ja tämä on kartan tyhjin merialue.
    //
    // Miksi ei New York – Lontoo, jota omistaja ehdotti: se on täsmälleen
    // sama viiva kuin isoisän paluumatkan viimeinen osuus. Sininen olisi
    // piirtynyt punaisen päälle, ja päällekkäisyys näyttäisi virheeltä.
    laji: 'kauppa',
    alku: 0.29,
    kesto: 52,
    ikkuna: 0.32,
    pisteet: [
      ALKU_NEWYORK,
      [377.7, 304.6], [424.8, 340.2], [461.6, 383.5], [517, 399.8], [502.2, 458.5],
      [457.7, 477], // Rio de Janeiro
    ],
  },
  {
    // Intian valtameri: Sydney – Mumbai. Kulkee Australian länsipuolitse
    // eikä osu missään isoisän reittiin tai Afrikan kiertävään
    // kauppareittiin — vain Mumbain satamassa viivat kohtaavat.
    laji: 'kauppa',
    alku: 0.375,
    kesto: 58,
    ikkuna: 0.3,
    pisteet: [
      ALKU_SYDNEY,
      [1040.7, 542.8], [1003.6, 531.1], [956.6, 506.2], [929.8, 471.7], [900.5, 426.6],
      [876, 388.2],
      ALKU_MUMBAI,
    ],
  },
  {
    // Tyynenmeren laita: Peking – Sydney. Kartan oikea reuna, jossa ei
    // ole muuta liikettä sen jälkeen kun isoisä on kääntynyt Tokioon.
    laji: 'kauppa',
    alku: 0.43,
    kesto: 64,
    ikkuna: 0.28,
    pisteet: [
      [959.8, 286.6], // Peking
      [1007.7, 321.5], [1049, 364.9], [1078.7, 431.4], [1094.6, 475.9], [1086.8, 513.3],
      ALKU_SYDNEY,
    ],
  },
];
/*
 * Punainen on päähahmo, siniset taustaa (omistaja 12.8.2026). Ero
 * tehdään kertoimella eikä värillä: sama seepian sisällä pysyvä sininen
 * himmenee, joten kartan ilme ei muutu — vain katseen järjestys.
 * Kerroin osuu sekä kärkeen että jälkeen; pohjaviivan vastaava himmennys
 * on css/styles.css:ssä, koska sitä ei animoida.
 */
const LAJIN_KIRKKAUS = { isoisa: 1, kauppa: 0.66 };
/*
 * JÄLKI: KULJETTU OSUUS JÄÄ NÄKYVIIN.
 *
 * Omistaja 12.8.2026: *"nyt jälki seuraa pistettä lyhyenä häntänä kuin
 * mato"*. Ennen jälki oli kolme ryhmää katkoviivan pätkiä, jotka
 * liukuivat pisteen perässä stroke-dashoffsetilla ja himmenivät
 * portaittain. Nyt jälki on yksi polku reittiä kohti, ja se piirtyy
 * pysyvästi: tasainen himmeä katkoviiva kasvaa pisteen mukana ja jää
 * paikalleen, kunnes silmukka alkaa alusta.
 *
 * TEKNIIKKA: animoidaan stroke-dasharrayta, ei dashoffsetia. Kuvio on
 * kirjoitettu kokonaan auki — yhtä monta pätkä/väli-paria kuin reitillä
 * on jaksoja — ja kasvu tapahtuu niin, että seuraava pätkä venyy
 * nollasta täyteen mittaansa samalla kun sen jälkeinen väli lyhenee
 * saman verran. Parin summa pysyy siis jakson mittaisena, jolloin jo
 * piirtyneet pätkät eivät liiku paikaltaan. Yksi ainoa polku riittää
 * koko reitin jäljeksi, eikä yhdenkään pätkän kirkkaus muutu.
 *
 * Kaksi seurausta, jotka on pakko muistaa:
 *   - PÄÄT OVAT SUORAT (stroke-linecap: butt). Pyöreäpäinen nollan
 *     mittainen pätkä piirtyy SVG:ssä pisteenä, joten piirtämätön osa
 *     reittiä olisi näkynyt pistejonona koko matkan.
 *   - JAKSO LASKETAAN REITIN PITUUDESTA (pituus / jaksoja), ei
 *     kiinteänä lukuna. Silloin kuvion kokonaispituus on tasan reitin
 *     pituus, eikä jälki karkaa pisteestä edelle tai jälkeen matkan
 *     varrella.
 *
 * Jos selain ei jostain animoisi dasharrayta, määreen pohja-arvo on
 * valmiiksi piirretty kuvio: silloin reitti näkyy staattisena
 * katkoviivana eikä tyhjänä.
 */
const JALJEN_PATKA = 5.5;       // yhden katkoviivan pituus laudan yksikköinä
const JALJEN_JAKSO = 15.5;      // tavoiteltu pätkän ja välin summa
const JALJEN_LEVEYS = 7.2;
const JALJEN_KIRKKAUS = 0.5;
/*
 * Kärki on kaksi päällekkäistä ympyrää: leveä ja himmeä kehä sekä sen
 * sisällä kirkas ydin. Se on hehkun halvin muoto — suodatin
 * (feGaussianBlur) maksaisi koko kerroksen uudelleenpiirron joka
 * ruudulla.
 *
 * SYKE ON MAJAKKA, EI HENGITYS (omistaja 12.8.2026, sama ilta).
 * Tasainen sini-aalto (spline-pehmennetty pieni↔iso↔pieni) luki
 * tykytyksenä: piste oli puolet ajasta kirkkaana, eikä kumpikaan
 * ääriasento erottunut toisesta. Nyt muoto on majakan: nopea kirkas
 * leimahdus ja sen jälkeen pitkä himmeä vaihe, jonka aikana piste
 * vain kulkee.
 *
 * MUOTO ON TAULUKKONA, EI SPLINENÄ. keyTimes/values antaa tarkan
 * verhokäyrän — nousu, terävä huippu, nopea lasku, pitkä lepo —
 * eivätkä keySplinen neljä lukua pysty samaan. Lineaarinen
 * välistys riittää, kun avainhetkiä on tarpeeksi, ja calcMode="linear"
 * on WebKitin varmin tie (sama peruste kuin koko kerroksen SMILillä).
 *
 * SYKE_MUOTO on osuus välillä 0 (himmeä lepo) … 1 (leimahduksen
 * huippu); jokainen KARJET-pari luetaan sen läpi, joten säde ja
 * peittävyys leimahtavat täsmälleen samassa tahdissa.
 *
 * Peittävyys mahtuu mukaan, koska kärki asuu <g>-ryhmässä: ryhmä
 * kantaa silmukan oman häivytyksen ja ympyrä sykkeen, ja SVG kertoo
 * ne keskenään. Yhdelle elementille ei voi asettaa kahta
 * peittävyysanimaatiota.
 *
 * VAIN PUNAINEN VÄLÄHTÄÄ. Laivoilta syke poistettiin kokonaan
 * (omistaja: *"siniset pisteet eivät välky lainkaan"*) — ne ovat
 * tasaisen himmeitä pisteitä, jotka vain liikkuvat. Lepotaso
 * poimitaan samasta taulukosta LAIVAN_TASO-kohdalta, jottei laivalle
 * tarvita omaa lukusarjaa: piste jää leimahduksen ja levon väliin,
 * himmeäksi mutta näkyväksi.
 */
const SYKE_KESTO = '2.4s';
// Leimahdus: nousu 0,07 s, huippu, lasku takaisin himmeään 0,31 s
// kohdalla — loput 2,1 s jakson kestosta on lepoa.
const SYKE_HETKET = [0, 0.03, 0.06, 0.13, 1];
const SYKE_MUOTO = [0, 1, 0.42, 0, 0];
const LAIVAN_TASO = 0.35;
const KARJET = [
  { luokka: 'alkureitti-keha', sade: [8.5, 20], kirkkaus: [0.14, 0.5] },
  { luokka: 'alkureitti-karki', sade: [4.2, 9.2], kirkkaus: [0.5, 1] },
];
/** Kärjen arvo sykkeen muodon kohdassa `osuus` (0 = lepo, 1 = huippu). */
function sykkeenArvo(arvot, osuus) {
  return arvot[0] + (arvot[1] - arvot[0]) * osuus;
}

// Lehden minitehtävän palkkio: pienempi kuin kulttuurivisan, koska
// vastaus lukee samalla sivulla.
const MINITEHTAVA_PALKKIO = 10;
/*
 * Tarkkuusvahdin kaksi viivettä (ks. tarkistaTarkkuus).
 *
 * ENSI on latauksen jälkeinen ensitarkistus: runko asettuu muutamassa
 * fitViewBoxissa, ja heti sen jälkeen tarkistus korjaa mountissa
 * syntyneen mittakaavavirheen. Siihen ei liity yhtään käyttäjän
 * elettä, joten se saa tapahtua nopeasti.
 *
 * LEPO on se, mitä eleen jälkeen odotetaan. Uudelleenrasterointi vie
 * satoja millisekunteja PÄÄSÄIKEESSÄ, joten se ei saa osua sormen
 * alle eikä eleiden väliin — omistajan havainto v607:stä: "kartta
 * tökkii, vieritys nykii". Puolentoista sekunnin hiljaisuus tarkoittaa
 * käytännössä, että käyttäjä on lopettanut kartan käsittelyn.
 */
const TARKKUUS_ENSI_MS = 350;
const TARKKUUS_LEPO_MS = 1600;
// Osoitinlippu on jumissa, jos se on ollut pystyssä näin kauan ilman
// yhtään tapahtumaa (ks. tarkkuusOdotus).
const TARKKUUS_JUMI_MS = 5000;
/*
 * Rasterointiruudun yläraja laudan yksiköissä (ks. taydennaTaide).
 *
 * Ruudun koko lasketaan pikselibudjetista (1100 px / mittakaava), ja
 * loitonnetussa näkymässä se kasvaa rajatta: yhdistetyllä vanhalla
 * maailmalla (12000 yksikköä) yleiskuvan ruuduksi tuli koko lauta.
 * Pikseleitä siinä on vähän, mutta piirrettävää vektoria KAIKKI —
 * yksi drawImage maalaa silloin jokaisen mantereen taiteen kerralla,
 * ja se on jakamaton pääsäikeen tukos. Mitattuna (Chromium, 4x
 * CPU-kuristus eli suunnilleen iPad): 6,3 sekuntia, joka osui suoraan
 * nipistyseleen alle — juuri se "zoomaus tökkii iPadilla".
 *
 * Eleiden keskeytysvahti (eleKesken) toimii vain RUUTUJEN VÄLISSÄ,
 * joten ainoa tapa pitää kartta sormessa kiinni on pitää yksittäinen
 * ruutu pienenä. Raja on yksiköissä eikä pikseleissä, koska maalaus-
 * työn määrä seuraa katettua lauta-alaa, ei kuvan kokoa: palojen
 * XML:ää on maailmanlaudalla yhteensä ~8 Mt, ja ruutuun kootaan vain
 * siihen osuvat palat. Kaikki laudat on piirretty samaan tiheyteen
 * (~1000 yksikköä per manner), joten 2000 tarkoittaa kaikkialla samaa
 * määrää piirrettävää. Pienillä laudoilla (~1000–1200 yksikköä)
 * pikseleistä laskettu koko jää tämän alle eikä mikään muutu; raja
 * puree vain isoon lautaan. Mitattuna samalla kuristuksella: koko
 * laudan ruudun SVG-kuvan lataus kesti 21 sekuntia yhtenä pötkönä,
 * 2000 yksikön ruudun 1,4–1,8 sekuntia — ja ruutujen välissä ele
 * pääsee nyt väliin.
 */
const RUUDUN_YKSIKOT_ENINTAAN = 2000;
/*
 * Palautelomakkeen vastaanottava ulkopuolinen palvelu. Tyhjänä lomakkeen
 * tilalla näkyy GitHub-linkki, joten palaute toimii ilman asetuksia.
 *
 * Käyttöönotto: luo lomake esim. Formspreessa (formspree.io) tai
 * Web3Formsissa ja liitä palvelun antama osoite tähän, esimerkiksi
 * 'https://formspree.io/f/xxxxxxxx'. Osoite ei paljasta sähköpostia:
 * palvelu tietää sen, sivun lähdekoodi ei.
 */
const PALAUTE_LOMAKE = '';

/**
 * Versionumero palauteviestiin. Luetaan sivulta (js/main.js kirjoittaa
 * sen asetuksiin), jottei ui.js tarvitse tuontia main.js:stä — se olisi
 * kehämäinen riippuvuus.
 */
function peliVersio() {
  return document.getElementById('app-version')?.textContent?.trim() ?? '?';
}

/**
 * Julisteet maanosittain julistegalleriaa varten (omistajan tilaus
 * 22.8.2026: galleria "maanosien mukaan jaoteltuna").
 *
 * JAKO JOHDETAAN PELIN OMASTA DATASTA, ei käsin kirjoitetusta
 * rinnakkaislistasta: maailmankartan cityManner kertoo, mistä
 * lähdepakasta kukin kaupunki on peritty (js/packs/maailmankartta.js),
 * ja MANNER_NIMET antaa maanosalle suomenkielisen nimen sekä
 * ryhmien järjestyksen (js/game.js). Uusi juliste asettuu siis oikeaan
 * ryhmään heti kun se lisätään JULISTEET-tauluun — tässä ei ole mitään
 * ylläpidettävää, eikä lista voi eriytyä pelin muusta jaosta.
 *
 * Kaupunki, joka on kahdessa lähdepakassa (esimerkiksi Istanbul ja
 * Kairo), saa cityMannerin oman deterministisen valinnan — sama
 * maanosa kuin pelin linssijaossa, ei tässä erikseen päätettyä.
 *
 * @returns {{id: string, nimi: string, kaupungit: string[]}[]}
 */
function julisteMantereet() {
  const manner = packById('maailmankartta').map?.cityManner ?? {};
  const jarjestys = Object.keys(MANNER_NIMET);
  const ryhmat = new Map();
  for (const cityId of Object.keys(JULISTEET)) {
    const avain = manner[cityId] ?? 'muu';
    if (!ryhmat.has(avain)) ryhmat.set(avain, []);
    ryhmat.get(avain).push(cityId);
  }
  // Tuntematon maanosa (uusi lauta ennen MANNER_NIMET-riviä) menee
  // loppuun omana ryhmänään sen sijaan että juliste katoaisi.
  const sija = (id) => (jarjestys.indexOf(id) + 1 || jarjestys.length + 1);
  return [...ryhmat.entries()]
    .sort(([a], [b]) => sija(a) - sija(b))
    .map(([id, kaupungit]) => ({ id, nimi: MANNER_NIMET[id]?.nimi ?? 'Muualla', kaupungit }));
}

const FACT_WIDTH = 340; // pidettävä samana kuin .fact-card css:ssä
const TURN_WIDTH = 560; // pidettävä samana kuin .turn-card css:ssä

export class UI {
  constructor(game, { onNewGame, onChange }) {
    this.game = game;
    // Remontin M7a: kamera ja koordinaatit asuvat Kartta-oliossa.
    this.kartta = new Kartta(this);
    this.onNewGame = onNewGame;
    this.onChange = onChange;
    this.botTimer = null;

    this.svg = document.getElementById('board');
    this.turnPill = document.getElementById('turn-pill');
    /*
     * KARTAN PÄÄLLÄ EI OLE OHJETEKSTIÄ (omistaja 13.8.2026: *"kartan
     * päälle ei tule enää mitään ohjetekstiä"*). Tässä haettiin ennen
     * kartan ohjerivi (#board-hint) ja vuorolaatikon tilarivi
     * (#turn-status); molemmat kelluivat kartan päällä ja molemmat on
     * poistettu myös index.html:stä. Kehotus tulee kartalta itseltään:
     * valittavat kohteet korostuvat renkailla.
     */
    this.actionsEl = document.getElementById('actions');
    this.errorEl = document.getElementById('error');
    this.passportDialog = document.getElementById('passport-dialog');
    this.passportAarteet = document.getElementById('passport-aarteet');
    this.passportFinds = document.getElementById('passport-finds');
    this.passportProgress = document.getElementById('passport-progress');
    // Julisterivi: oma kotelonsa, koska koko rivi piiloutuu ennen
    // ensimmäistä voitettua julistetta (ks. renderJulisteet).
    this.julisteKotelo = document.getElementById('juliste-kotelo');
    this.passportJulisteet = document.getElementById('passport-julisteet');
    /*
     * Rivin sisältö rakennetaan uusiksi joka renderissä, mutta rivi
     * itse on sama nappi koko pelin ajan — kuuntelija kiinnitetään
     * siksi kerran tässä eikä renderJulisteetissa, jossa se
     * kertautuisi joka avauksella.
     */
    this.passportJulisteet?.addEventListener('click', () => this.avaaJulisteGalleria());
    /** Avoin julistegalleria: { kortti, huntu, nappaimet } tai null. */
    this.julisteGalleria = null;

    /*
     * Aarnin luettelon i-nappi. Teksti on tarinakaanonia (Fablen
     * kirjoittama), joten se on tässä sellaisenaan eikä sitä lyhennetä
     * näytön mukaan — pikkuseloste kasvaa tekstin mukaan.
     */
    document.getElementById('aarni-otsikko')?.appendChild(this.pikkuselosteNappi(
      'Aarnin luettelo on isoisän vanhan ystävän, keräilijä Aarnin, kokoama '
      + 'lista aarteista, jotka ovat päässeet unohtumaan. Kateissa-luku '
      + 'kertoo, montako niistä on vielä löytämättä — jokainen matkalla '
      + 'ratkaistu johtolanka voi viedä yhden jäljille.',
      'Mikä Aarnin luettelo on?',
    ));

    /*
     * Laukun alalaidan nimikilpi avaa lähdeikkunan.
     *
     * Kaksi <dialog>-modaalia päällekkäin jättäisi alemman
     * taustahimmennyksen päälle (sama ansa kuin päivityslokissa,
     * js/main.js), joten laukku suljetaan ensin. Sulkeminen ei hävitä
     * mitään: laukku rakennetaan uudelleen joka avauksella.
     */
    this.lahteetDialog = document.getElementById('lahteet-dialog');
    this.lahteetSisus = document.getElementById('lahteet-sisus');
    /*
     * Ylärivin logo avaa tekijätiedot ja lähdeluettelon (omistajan toive
     * 5.8.2026). Linkki oli ennen matkalaukun alalaidassa nimikilpenä,
     * eli kahden napautuksen takana ja väärässä paikassa: laukku on
     * pelaajan tavaroita varten, ei pelin tekijöitä.
     *
     * Laukkua ei enää tarvitse sulkea ennen avausta — logo on kartalla
     * eikä laukun sisällä, joten kahden modaalin päällekkäisyyttä ei
     * synny.
     */
    document.getElementById('brand-btn')?.addEventListener('click', () => {
      this.avaaLahteet();
    });

    /*
     * Napautus laukun ulkopuolelle sulkee sen.
     *
     * Sulje-nappi poistui (omistaja: "se on turha kun voi klikata vain
     * karttaa"), joten tämä on nyt ainoa hiiriele ulos. Modaalin
     * taustakerros on osa <dialog>-elementtiä itseään, joten napautus
     * kortin vierestä osuu dialogiin — kortin sisällä osuu korttiin.
     */
    this.passportDialog?.addEventListener('click', (e) => {
      if (e.target === this.passportDialog) this.passportDialog.close();
    });
    // Seloste elää laukun sisällä, joten se sulkeutuu laukun mukana —
    // muuten se jäisi leijumaan kartan päälle ilman ankkuriaan.
    this.passportDialog?.addEventListener('close', () => {
      this.suljePikkuseloste();
      // Julistegalleria on laukun lapsi (suurennosIsanta): ilman tätä
      // se jäisi suljetun dialogin sisään roikkumaan ja avautuisi
      // seuraavan avauksen mukana ilman että kukaan sitä pyysi.
      this.suljeJulisteGalleria();
      document.body.classList.remove('laukku-auki');
    });

    this.turnCard = document.getElementById('actions').closest('.turn-card');
    this.introEl = document.getElementById('intro');
    this.introText = document.getElementById('intro-text');
    /*
     * AVAUKSEN KAKSI LOHKOA (omistajan tilaus 26.8.2026, ilta):
     * ylälohkossa pienennetty kartta ja julisteotsikko, alalohkossa
     * tyhjä vaalea arkki ja sen päällä tekstipalsta. Kumpikin lohko
     * saa oman kirjasinkokonsa fitIntrossa, ja lasten mitat ovat
     * em-yksiköissä — niin otsikko ja nappi kutistuvat mukana.
     */
    this.introKartta = this.introEl?.querySelector('.intro-kartta');
    this.introOtsikko = this.introEl?.querySelector('.intro-juliste');
    this.introArkki = this.introEl?.querySelector('.intro-arkki');
    this.introPalsta = this.introEl?.querySelector('.intro-palsta');
    this.introRunko = document.getElementById('intro-runko');
    // Paikkarivi: kohtausmerkintä laitteen kellosta (INTRO_PAIKKA).
    this.introPaikka = document.getElementById('intro-paikka');
    // Mistä aloitan? -nappi; kuuntelija kytketään renderIntrossa.
    this.introValinta = document.getElementById('intro-valinta');
    // Isoisän työpöytä: matkakirja ja irtolehti samassa sommitelmassa.
    this.introTyopoyta = this.introEl?.querySelector('.intro-tyopoyta');
    this.introKansi = document.getElementById('intro-kansi');
    // Kuvan latauduttua palstan korkeus on lopullinen: sovitetaan koko
    // uudelleen. aspect-ratio kertoo mitat jo ennen latausta, joten tämä
    // on varmistus eikä ainoa mittaus.
    this.introKansi?.addEventListener('load', () => this.fitIntro(), { once: true });

    /*
     * LEHTITILA — lehden, maalehden ja kohdekartan koko muistitila
     * yhdessä oliossa (moduuliremontin M5:n jatkoaskel 17.8.2026).
     * Tämä on kenttien AINOA dokumentointipaikka; lehti.js, maalehti.js,
     * nahtavyydet.js ja opas.js lukevat ja kirjoittavat näitä
     * ui.lehtitila-viitteen kautta. DOM-kahvat (this.arrivalDialog ym.
     * getElementById-haut) eivät kuulu tähän: ne ovat kiinteitä
     * elementtiviitteitä, eivät tilaa. Olio syntyy rakentimessa ja
     * kuolee instanssin mukana, joten uusi peli nollaa tilan
     * täsmälleen kuten ennenkin.
     */
    this.lehtitila = {
      // — Kaupunkilehti (saapumiskortti) —
      arrivalShownFor: undefined, // minkä kaupungin lehti on auki (city.id)
      arrivalKuvat: [], // kansikuvakarusellin kuvalista
      arrivalKuvaKohdalla: 0, // karusellin näkyvä kuva (indeksi)
      arrivalMaaTiedot: undefined, // auki olevan maaosaston maatiedot
      esilatattu: undefined, // minkä kaupungin lehtikuvat on esiladattu (city.id)
      mediaKaupunki: undefined, // mediarivin kaupunki (radio/tv)
      mediaIso: undefined, // mediarivin maakoodi (ISO)
      lehtiSaaTiedot: undefined, // sääruudun tiedot (lehti.js täyttää)
      lehtiMittaAjastin: undefined, // lehden mittavarmistuksen ajastin
      lehtiMittaJalkiajastin: undefined, // ja sen jälkitarkistus
      // — Kulttuuriosa: kuvakatselin ja ääninäytteet —
      kulttuuriSaatavilla: undefined, // onko kaupungilla kulttuuriosa
      kulttuuriKuvaEl: undefined, // avoin kuvakortti (luotu elementti)
      kulttuuriHuntuEl: undefined, // kuvakortin taustahuntu
      kulttuuriKuvaNappaimet: undefined, // katselimen näppäinkuuntelija
      kulttuuriAani: undefined, // soiva ääninäyte { audio, nappi, nimi }
      // — Lehden sivupino (tutki = Tutki-napista aukeava lehti) —
      tutkiTila: undefined, // 'kaupunki' | 'maa' | 'kehittaja'
      tutkiSivut: undefined, // sivulista (kategoriat)
      tutkiSivu: undefined, // auki oleva sivu (indeksi)
      tutkiKansi: undefined, // kansitiedot (null = ei kantta)
      tutkiLehti: undefined, // onko auki lehtitaitto
      tutkiMaaLehti: undefined, // maalehden ISO-koodi (null = kaupunkilehti)
      tutkiMaaEtusivu: undefined, // onko maakarttaetusivu
      tutkiMaaIso: undefined, // Maa numeroina -sivun data
      tutkiMaaNimi: undefined, // otsikon maa
      tutkiSelausKytketty: undefined, // selauseleet kytketty (kerran/lehti)
      tutkiSyke: undefined, // Tutki-napin syke (kaupunkiavain)
      // — Maalehti —
      maanSivut: undefined, // maalehden sivulista
      // — Nähtävyysjutut ja kohdekartta —
      nahtavyysPino: undefined, // paluupino (edelliset jutut)
      nahtavyysAuki: undefined, // avoin juttu { kohde, numero, … }
      nahtavyysYlaVahti: undefined, // yläreunavahdin ajastin
      nahtavyysSelaus: undefined, // juttujen selaustila { lista, kohdalla }
    };

    this.arrivalDialog = document.getElementById('arrival-dialog');
    this.arrivalCity = document.getElementById('arrival-city');
    this.arrivalImage = document.getElementById('arrival-image');
    // Kuvan galleria selattavana jo pikkukoossa: hento laskuri ja
    // nuolet (omistajan toive). Suurennos aukeaa selatusta kohdasta.
    this.arrivalKuvakotelo = document.getElementById('arrival-kuvakotelo');
    this.arrivalKuvaLaskuri = document.getElementById('arrival-kuva-laskuri');
    this.arrivalImage.addEventListener('click', () => {
      const city = this.game.board.cityById.get(this.lehtitila.arrivalShownFor);
      if (city?.wiki) this.openLightbox(city.wiki, city.name, this.arrivalImage.src || null);
    });
    const selaaKuvaa = (askel) => {
      if (this.lehtitila.arrivalKuvat.length < 2) return;
      this.lehtitila.arrivalKuvaKohdalla = (this.lehtitila.arrivalKuvaKohdalla + askel
        + this.lehtitila.arrivalKuvat.length) % this.lehtitila.arrivalKuvat.length;
      this.arrivalImage.src = this.lehtitila.arrivalKuvat[this.lehtitila.arrivalKuvaKohdalla].src;
      this.paivitaKuvaLaskuri();
    };
    document.getElementById('arrival-kuva-edellinen')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaKuvaa(-1); });
    document.getElementById('arrival-kuva-seuraava')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaKuvaa(1); });
    this.arrivalImage.addEventListener('error', () => {
      this.pudotaRikkiKuva(this.lehtitila.arrivalKuvat, this.arrivalImage, 'arrival');
    });
    this.arrivalIntro = document.getElementById('arrival-intro');
    this.arrivalWiki = document.getElementById('arrival-wiki');
    this.arrivalWiki.addEventListener('click', () => openWiki(this, this.lehtitila.arrivalShownFor));
    // Maan tiedot kaupungin rinnalla: lohko täyttyy openArrivalissa.
    this.arrivalMaa = document.getElementById('arrival-maa');
    this.arrivalMaaNimi = document.getElementById('arrival-maa-nimi');
    this.arrivalMaaIntro = document.getElementById('arrival-maa-intro');
    this.arrivalMaaKartta = document.getElementById('arrival-maa-kartta');
    this.arrivalMaaTunnusluvut = document.getElementById('arrival-maa-tunnusluvut');
    // Uutisotsikot maaosastossa (vaatii omistajan uutisvälityksen).
    this.arrivalUutiset = document.getElementById('arrival-uutiset');
    // Mediarivi: maan radio ja tv-kanavan suora lähetys.
    this.arrivalMedia = document.getElementById('arrival-media');
    // Kaupunkilehden oma mediarivi (ks. paivitaMediarivit).
    this.arrivalMediaKaupunki = document.getElementById('arrival-media-kaupunki');
    this.arrivalMaaTervehdykset = document.getElementById('arrival-maa-tervehdykset');
    // Lippu näytetään vasta kun se on oikeasti latautunut — ilman verkkoa
    // riviltä ei jää rikkinäistä kuvaruutua.
    this.arrivalMaaLippu = document.getElementById('arrival-maa-lippu');
    this.arrivalMaaLippu.addEventListener('load', () => {
      this.arrivalMaaLippu.hidden = false;
    });
    this.arrivalMaaLippu.addEventListener('error', () => {
      this.arrivalMaaLippu.hidden = true;
    });
    this.arrivalMaaWiki = document.getElementById('arrival-maa-wiki');
    this.arrivalMaaWiki.addEventListener('click', () => {
      const maa = this.lehtitila.arrivalMaaTiedot;
      if (maa) this.openWikiArticle(maa.wiki ?? maa.nimi, maa.nimi);
    });
    // Kaupungin elämää -lohko täytetään openArrivalissa.
    this.arrivalKulttuuri = document.getElementById('arrival-kulttuuri');
    this.arrivalKulttuuriLista = document.getElementById('arrival-kulttuuri-lista');
    this.arrivalLiuskat = document.getElementById('arrival-liuskat');
    this.arrivalKategoria = document.getElementById('arrival-kategoria');
    // Kaupungin kohdekartta lehden etusivun lopussa (omistajan
    // tarkennus 7.8.2026: "kartta pitäisi olla jo ihan ensimmäisellä
    // sivulla" — aiemmin se oli kaupunki-aihesivun pohjalla).
    this.arrivalKaupunkiKartta = document.getElementById('arrival-kaupunkikartta');
    /*
     * Kohdekartan vaihtoehtonäkymä (värikartta tai satelliitti) on
     * päällä tässä kaupungissa (null = kaikissa piirros). Kartta
     * piirretään uusiksi joka sivunkäännöllä, joten valinnan on
     * asuttava piirtofunktion ulkopuolella — muuten se nollautuisi
     * sivua vaihtaessa. Ei mene tallennukseen: lehti aukeaa aina
     * piirroksena.
     */
    this.satelliittiNakyma = null;
    // Kaupunki- ja maapalstat: näkyvät vain lehden etusivulla.
    this.arrivalPalstat = document.querySelector('#arrival-dialog .arrival-palstat');
    // Uutiset ja mediarivi yhteisessä kääreessä (siirtyy maa-etusivulle
    // niissä maissa, joilla on oma karttasivu — ks. piirraMaaEtusivu).
    this.arrivalOikea = document.getElementById('arrival-oikea');
    // Kulmalinkki lehden etusivulta maaosion aloitussivulle (omistajan
    // toive 7.8.2026: maaosasto pois etusivulta, tilalle linkki
    // "Saksa-osio ›" oikeaan yläkulmaan).
    this.arrivalMaaLinkki = document.getElementById('arrival-maa-linkki');
    /*
     * Kulmalinkki avaa maalehden, ei enää sivua samasta pinosta.
     *
     * Ennen v350:tä maan etusivu oli kaupungin sivujen jatkona, ja
     * linkki hyppäsi sen kohdalle. Kun lehdet erotettiin, maan sivut
     * lähtivät tutkiSivut-listasta — findIndex palautti -1 eikä
     * napista tapahtunut mitään. Nyt se tekee saman kuin kartan "i":
     * avaa maalehden.
     */
    this.arrivalMaaLinkki.addEventListener('click', () => {
      if (this.lehtitila.tutkiMaaIso) avaaMaalehti(this, this.lehtitila.tutkiMaaIso);
    });
    // Lehtitaitto (omistajan toive 5.8.2026): kaupungin oma kansiosio
    // taittuu etusivulle, ja masto kertoo että käsissä on paikallislehti.
    // Lehden etusivun kuvataitto: iso pääkuva maston alla ja
    // pienempien kuvien rivi esittelytekstin jälkeen.
    this.arrivalLehtiPaakuva = document.getElementById('arrival-lehti-paakuva');
    this.arrivalLehtiKuvat = document.getElementById('arrival-lehti-kuvat');
    this.arrivalLehtiYla = document.getElementById('arrival-lehti-yla');
    this.arrivalLehtiAla = document.getElementById('arrival-lehti-ala');
    this.arrivalLehtiPvm = document.getElementById('arrival-lehti-pvm');
    // Päivän sää maston alla; napautus avaa koko vuoden graafin.
    this.arrivalSaa = document.getElementById('arrival-saa');
    this.arrivalSaa.addEventListener('click', () => this.naytaVuosiSaa());
    this.arrivalKulttuuriVisa = document.getElementById('arrival-kulttuuri-visa');
    // Visa aukeaa omasta napistaan samaan näkymään (omistajan toive):
    // nappi väistyy ja kysymys vaihtoehtoineen tulee tilalle.
    this.arrivalKulttuuriKysymys = document.getElementById('arrival-kulttuuri-kysymys');
    this.arrivalKulttuuriVaihtoehdot = document.getElementById('arrival-kulttuuri-vaihtoehdot');
    this.arrivalKulttuuriTulos = document.getElementById('arrival-kulttuuri-tulos');
    document.getElementById('arrival-yes').addEventListener('click', () => {
      // Tutki paikka vie tietovisaan: tauolle jäänyt luenta ei saa
      // jatkua kysymyksen alle. Ehto closeArrivalissa ei riitä, koska
      // visa syntyy vasta actionQuizissa — sulku ehtii ensin
      // (omistajan havainto Tangerissa).
      this.luentaTauolla = null;
      this.closeArrival();
      sfx.play('paper');
      /*
       * Kohtaamiskaupungissa hahmo esittää kysymyksen itse, joten
       * muotoarvonta (väittämä, valokuvaaja, tullimies) ohitetaan —
       * "Tapaa gondolieeri" ei saa avata tullimiestä. Isoisän pulma
       * pysyy silti etusijalla: nimetty muoto ohittaisi sen, joten
       * pulman odottaessa kutsu tehdään entiseen tapaan.
       */
      const kohtaaminen = KOHTAAMISET[this.game.cityOf()?.id];
      const pulmaOdottaa = this.game.pendingPuzzle?.();
      this.doAction(() => this.game.actionQuiz(
        kohtaaminen && !pulmaOdottaa ? { form: 'quiz' } : {},
      ));
    });
    document.getElementById('arrival-no').addEventListener('click', () => {
      this.closeArrival();
      // Kortti avataan nykyään Tutki-napista kesken vuoron, jolloin
      // sulkeminen on pelkkä paluu kartalle — päiväkirja pysyy ennallaan.
      // Vanha tallennus voi silti herätä tarjousvaiheeseen, jossa
      // sulkeminen päättää vuoron.
      if (this.game.phase === 'offer') this.doAction(() => this.game.actionSkipQuiz());
    });

    this.quizSketch = document.getElementById('quiz-sketch');
    this.quizSelite = document.getElementById('quiz-selite');
    this.quizPhoto = document.getElementById('quiz-photo');
    this.quizPhoto.addEventListener('click', () => {
      const quiz = this.game.quiz;
      // Vain kuratoitu valokuva suurena, ei artikkeligalleriaa: se
      // paljastaisi vastauksen kuvateksteissään.
      if (quiz?.photoFile) {
        this.openLightbox(null, 'Matkavalokuvaajan vedos',
          valokuvaUrl(quiz.photoFile, 1600));
      }
    });
    this.quizBadge = document.getElementById('quiz-badge');

    this.wikiDialog = document.getElementById('wiki-dialog');
    this.wikiTitle = document.getElementById('wiki-title');
    this.wikiImage = document.getElementById('wiki-image');
    this.wikiExtract = document.getElementById('wiki-extract');

    this.wikiSource = document.getElementById('wiki-source');
    // Sama galleriaselaus kuin Tutki-kortin kuvassa (omistajan toive):
    // laskuri ja nuolet Lue lisää -lehden kuvaan, suurennos aukeaa
    // selatusta kohdasta.
    this.wikiKuvakotelo = document.getElementById('wiki-kuvakotelo');
    this.wikiKuvaLaskuri = document.getElementById('wiki-kuva-laskuri');
    this.wikiKuvateksti = document.getElementById('wiki-kuvateksti');
    this.wikiKuvat = [];
    this.wikiKuvaKohdalla = 0;
    this.wikiKuvaPortaat = [];
    this.wikiGalleria = null;
    this.wikiImage.addEventListener('click', () => {
      if (this.wikiOpenFor) {
        // Kuratoitu karuselli jatkuu suurennoksessa selitteineen ja
        // lähdemerkintöineen; ilman listaa suurennos hakisi tilalle
        // artikkelin oman kuvaston.
        this.openLightbox(this.wikiOpenFor, this.wikiTitle.textContent,
          this.wikiImage.src || null, this.wikiGalleria);
      }
    });
    const selaaWikiKuvaa = (askel) => {
      if (this.wikiKuvat.length < 2) return;
      this.wikiKuvaKohdalla = (this.wikiKuvaKohdalla + askel
        + this.wikiKuvat.length) % this.wikiKuvat.length;
      this.naytaWikiKuva(this.wikiKuvat[this.wikiKuvaKohdalla].src);
      this.paivitaWikiKuvaLaskuri();
    };
    document.getElementById('wiki-kuva-edellinen')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaWikiKuvaa(-1); });
    document.getElementById('wiki-kuva-seuraava')
      .addEventListener('click', (e) => { e.stopPropagation(); selaaWikiKuvaa(1); });
    this.wikiImage.addEventListener('error', () => {
      /*
       * SUURENNOS PUUTTUU — OTETAAN SEURAAVA PORRAS, EI PUDOTETA KUVAA.
       *
       * Kuva pyydetään ensin suurimmassa koossa (naytaWikiKuva). Jos
       * sitä kokoa ei ole tehty tälle tiedostolle, Wikipedia vastaa
       * virheellä. Ilman tätä haaraa `pudotaRikkiKuva` olisi poistanut
       * aivan kelvollisen kuvan galleriasta — ja pahempaa: se ei olisi
       * edes löytänyt sitä listalta, koska osoite on eri, joten kuva
       * olisi jäänyt rikkinäiseksi ruuduksi.
       */
      if (this.wikiKuvaPortaat?.length) {
        this.wikiImage.src = this.wikiKuvaPortaat.shift();
        return;
      }
      this.pudotaRikkiKuva(this.wikiKuvat, this.wikiImage, 'wiki');
    });
    this.factImage = document.getElementById('fact-image');
    this.factImage.addEventListener('click', () => {
      if (this.factImageTitle) this.openWikiArticle(this.factImageTitle);
    });
    // Kaiutin jatkaa merkinnän luentaa siitä, mihin se pysähtyi
    // ensimmäisen virkkeen jälkeen — ja toimii myös taukonappina.
    // Vanha valokuva muistikirjan kyljessä: pikkukuva aukeaa napautuksesta
    // postikortiksi kortin viereen. Latausvirhe (esim. ei verkkoa)
    // piilottaa pikkukuvan siististi.
    this.factValokuva = document.getElementById('fact-valokuva');
    this.factValokuvaKuva = document.getElementById('fact-valokuva-kuva');
    this.factValokuvaKuva.addEventListener('error', () => {
      this.factValokuva.hidden = true;
    });
    this.factValokuva.addEventListener('click', (event) => {
      event.stopPropagation();
      this.naytaPostikortti();
    });
    this.postikorttiSulkija = (e) => {
      // Kuvapinossa napautus mihin tahansa kuvaan vaihtaa kortit päikseen;
      // pinosta pääsee pois napauttamalla karttaa eli pinon ulkopuolelle
      // (omistajan toive). Yhden kuvan kortti sulkeutuu mistä napautuksesta
      // tahansa, kuten ennenkin.
      /*
       * Pino kiertää eteenpäin, ei vaihda päikseen.
       *
       * Kahdella kuvalla vaihto riitti, mutta pinossa voi nyt olla
       * useampi (omistajan toive). Napautus nostaa seuraavan
       * päällimmäiseksi ja kiertää lopusta alkuun; pinosta pääsee pois
       * napauttamalla sen ulkopuolelle.
       */
      const kortit = this.postikortti
        ? [...this.postikortti.querySelectorAll('.postikortti-kortti')] : [];
      const kortilla = this.postikortti && e.composedPath?.().includes(this.postikortti);
      if (kortit.length > 1 && kortilla) {
        e.preventDefault();
        e.stopPropagation();
        this.postikorttiIndeksi = ((this.postikorttiIndeksi ?? 0) + 1) % kortit.length;
        kortit.forEach((k, i) => k.classList.toggle('alla', i !== this.postikorttiIndeksi));
        sfx.play('swipe');
        return;
      }
      /*
       * Napautus matkakirjaan EI sulje valokuvaa (omistajan havainto
       * 13.8.2026 iPadilla: "yläreunan matkakirja sulkee kuvan jos
       * sitä painaa"). Kuva kuuluu päiväkirjamerkintään: merkinnän
       * oma käsittely (avaus, vieritys, kuuntelunappi) tai yläpalkin
       * painikkeet eivät ole se "napauta karttaa" -ele, jolla kuvasta
       * poistutaan. Kartan tai muun ulkopuolen napautus sulkee yhä.
       */
      const polku = e.composedPath?.() ?? [];
      const matkakirjassa = polku.some((osa) => osa?.classList
        && (osa.classList.contains('fact-card') || osa.classList.contains('topbar')));
      if (matkakirjassa) return;
      this.suljePostikortti();
    };

    /*
     * KAIUTIN ON LUENNAN KYTKIN (omistaja 25.8.2026: *"Tuon luenta
     * tekstin ja kytkimen voi ottaa pois kokonaan koska yläreunassa on
     * jo kaiutin kuvake sitä varten"*). Erillinen LUENTA-liukukytkin
     * poistui; painallus kääntää saman laitekohtaisen tilan
     * (js/luenta.js) ja kuvake saa vinoviivan, kun luenta on pois.
     */
    this.factKuuntele = document.getElementById('fact-kuuntele');
    /*
     * KAIUTIN JA VALIKON KERTOJA-KYTKIN OVAT SAMA TILA (omistajan
     * pelitestipalaute v1119). Kytkin voi kääntyä valikosta, ja
     * kuvakkeen vinoviivan on seurattava sitä heti — tapahtuma tulee
     * js/aani-ehdokkaat.js:stä (AANITILA_TAPAHTUMA).
     */
    this.aanitilaKuuntelija = () => this.paivitaKaiutinTila();
    document.addEventListener(AANITILA_TAPAHTUMA, this.aanitilaKuuntelija);
    this.factKuuntele.addEventListener('click', () => {
      const paalle = !luentaKytkinPaalla();
      asetaLuentaKytkin(paalle);
      this.paivitaKaiutinTila();
      sfx.play('clack');
      if (!paalle) {
        // Pois kesken luennan: kumpikin lukija vaikenee heti.
        stopDiaryVoice(this);
        if (lukijaLukee(this.factKuuntele)) pysaytaLukija();
        return;
      }
      /*
       * Päälle: RUUDULLA OLEVA MERKINTÄ ALKAA ALUSTA — sama sopimus
       * kuin vanhalla kytkimellä. Jatko-osa nollataan, ettei alusta
       * alkaneen luennan perään soisi vanhaa jatkoa.
       */
      this.merkintaJatko = null;
      if (this.merkinnanLuenta) {
        this.merkinnanLuenta();
        return;
      }
      // Merkintä, jota ei ole rekisteröity luentatehtäväksi: soitetaan
      // äänite tai luetaan laitteen omalla äänellä kuten ennenkin.
      if (this.diaryFullUrl) {
        playDiaryVoice(this, this.diaryFullUrl);
        return;
      }
      const teksti = kokoaLuettavaTeksti(this.factText);
      if (lueMerkinta(this, teksti)) return;
      lueAaneen(teksti, this.factKuuntele, { persoona: 'merkinnat', sailio: 'merkinnat' });
    });
    this.paivitaKaiutinTila();

    this.eventDialog = document.getElementById('event-dialog');
    this.eventText = document.getElementById('event-text');
    this.eventEffect = document.getElementById('event-effect');
    document.getElementById('event-ok').addEventListener('click', () => {
      if (this.eventDialog.open) this.eventDialog.close();
      this.eventShownFor = null;
      sfx.play('paper');
      this.doAction(() => this.game.closeEvent());
    });

    this.factVoiceEl = document.getElementById('fact-voice');
    this.factPlace = document.getElementById('fact-place');
    this.factPlaceLyhyt = document.getElementById('fact-place-lyhyt');
    this.factText = document.getElementById('fact-text');
    this.factCard = this.factText.closest('.fact-card');
    this.factKey = null;
    // Jatkuu-vihje: nuoli ja häivytys näkyvät, kun tekstiä on näkymän
    // alapuolella. Tarkkailija kattaa myös kirjoituskoneen etenemisen,
    // joten vihje syttyy heti kun teksti kasvaa yli näkymän.
    this.factTekstiRivi = this.factText.closest('.fact-teksti-rivi');
    const jatkuuVihje = () => {
      const el = this.factText;
      const jatkuu = el.scrollHeight - el.clientHeight - el.scrollTop > 6;
      this.factTekstiRivi?.classList.toggle('jatkuu', jatkuu);
      // Vieritettäessä pikkukuva väistyy, ettei teksti katoa sen alle
      // (omistajan havainto) — alkuun palatessa kuva palaa paikalleen.
      this.factTekstiRivi?.classList.toggle('vieritetty', el.scrollTop > 4);
    };
    this.paivitaJatkuuVihje = jatkuuVihje;
    this.factText.addEventListener('scroll', jatkuuVihje, { passive: true });
    new MutationObserver(jatkuuVihje)
      .observe(this.factText, { childList: true, characterData: true, subtree: true });

    /*
     * PÄIVÄKIRJALLA EI OLE ENÄÄ VÄLIKOKOA (omistajan päätös 7.8.2026):
     * "matkakirja voisi avautua jatkossa kokonaan, koska se pienenee
     * kätevästi kokonaan kun karttaa liikuttaa. eli sen välikoon voisi
     * ottaa pois kokonaan."
     *
     * Kokoja oli kolme: yhden rivin nimilappu, viiden rivin ikkuna ja
     * napautuksella auki levitetty kortti. Keskimmäinen poistui, joten
     * merkintä näkyy heti kokonaan eikä sitä tarvitse avata erikseen —
     * ja kartan liike kutistaa kortin edelleen yhdelle riville.
     * Tekstirivin napautuskuuntelija poistui samalla: sillä ei ole
     * enää kokoa vaihdettavanaan.
     *
     * Vieritys jää varalle: jos merkintä ei mahdu kortin kattoon
     * (74 dvh), teksti vierii kuten ennenkin ja jatkuu-nuoli kertoo
     * siitä.
     */

    /*
     * Yhden rivin päiväkirja: koko kortti on painike.
     *
     * Kutistuneena kortista näkyy vain kaupungin nimi (.fact-place), ja
     * kaikki muu on kartan päällä tieltä pois. Napautus mihin tahansa
     * kohtaan lappua palauttaa tavallisen ikkunan — kortin omat napit ja
     * tekstirivi eivät silloin ota napautuksia vastaan lainkaan (css:n
     * pointer-events), joten tähän ei tarvita nappisuodatusta.
     *
     * stopPropagation on tässä tahallinen: kutistunut lappu on pieni,
     * mutta se on kartan päällä, ja sen oma napautus ei saa jatkaa
     * kartalle napautuszoomaukseksi.
     */
    this.factCard.addEventListener('click', (e) => {
      if (!this.factCard.classList.contains('pieni')) return;
      e.stopPropagation();
      this.asetaPaivakirjanKoko(false);
    });
    // Sama näppäimistöltä: kutistuneena kortilla on role="button" ja
    // tabindex, joten sen kuuluu totella myös Enteriä ja välilyöntiä.
    this.factCard.addEventListener('keydown', (e) => {
      if (!this.factCard.classList.contains('pieni')) return;
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      e.preventDefault();
      e.stopPropagation();
      this.asetaPaivakirjanKoko(false);
    });

    this.winnerDialog = document.getElementById('winner-dialog');
    this.quizDialog = document.getElementById('quiz-dialog');
    this.quizCity = document.getElementById('quiz-city');
    this.quizQuestion = document.getElementById('quiz-question');
    // Kohtaamisen tervehdys kysymyksen yllä (js/packs/kohtaamiset.js).
    this.quizKohtaaminen = document.getElementById('quiz-kohtaaminen');
    this.quizKohtaaminenKuva = document.getElementById('quiz-kohtaaminen-kuva');
    this.quizIsoisa = document.getElementById('quiz-isoisa');
    this.quizIsoisaTeksti = document.getElementById('quiz-isoisa-teksti');
    // Tervehdys luetaan kerran per kaupunki ja istunto — toistuvassa
    // käynnissä hahmo menee suoraan asiaan.
    this.kohtaamisetNahty = new Set();
    this.quizOptions = document.getElementById('quiz-options');
    this.quizResult = document.getElementById('quiz-result');
    this.quizHintText = document.getElementById('quiz-hint-text');
    this.quizFifty = document.getElementById('quiz-5050');
    this.quizFifty.addEventListener('click', () => {
      if (this.game.phase === 'duel') {
        sfx.play('robber');
        this.doAction(() => this.game.actionDuelRelief());
        return;
      }
      sfx.play('swipe');
      this.doAction(() => this.game.actionFiftyFifty());
    });
    this.quizHint = document.getElementById('quiz-hint');
    this.quizHint.addEventListener('click', () => {
      // Kaksintaistelussa vihjenappi on piilossa: hevosenkengillä
      // ohittaminen poistui uuden aarrejärjestelmän myötä (js/visa.js).
      sfx.play('hint');
      this.doAction(() => this.game.actionHint());
    });

    // Tiimalasi
    this.quizTimerEl = document.getElementById('quiz-timer');
    this.quizSeconds = document.getElementById('quiz-seconds');
    this.hourglass = document.getElementById('hourglass');
    this.hgTopSand = document.getElementById('hg-top-sand');
    this.hgBottomSand = document.getElementById('hg-bottom-sand');
    this.hgStream = document.getElementById('hg-stream');
    this.quizTimer = null;
    this.timedQuiz = null;
    this.quizContinue = document.getElementById('quiz-continue');
    this.quizContinue.addEventListener('click', () => this.doAction(() => (
      this.game.phase === 'duel' ? this.game.closeDuel() : this.game.closeQuiz()
    )));
    // Aloita peli: kohtaamisen kysymys ja tiimalasi vasta painalluksesta
    // (omistajan toive 10.8.2026 — luenta ei saa syödä vastausaikaa).
    this.quizAloita = document.getElementById('quiz-aloita');
    this.quizAloita.addEventListener('click', () => {
      this.quizAloita.hidden = true;
      /*
       * Kesken soiva kohtaamisluenta feidataan pois (omistajan
       * palaute 10.8.2026: "jos jatkaa eteenpäin ennen kuin teksti
       * loppuu, kertojan ääni vielä jatkuu taustalla") — kysymykset
       * saa lukea rauhassa. Siivousversio, ei pelkkä pause: tähän
       * luentaan ei palata, ja puhujan rooli on vapautettava tai
       * tausta jää väistöön.
       */
      const luenta = this.diaryVoice;
      if (luenta) {
        this.diaryVoice = null;
        this.luentaTauolla = null;
        haivytaJaSiivoa(this, luenta);
      }
      sfx.play('paper');
      const jatka = this.jatkaKysymykseen;
      this.jatkaKysymykseen = null;
      jatka?.();
    });

    // Lappu sulkeutuu myös taustaa — siis karttaa — napauttamalla, ettei
    // sulkunappia tarvitse etsiä; tietovisassa sellaista ei edes ole.
    // Napautus vastaa lapun kevyintä poistumistietä (sulje / Jatka matkaa).
    this.lappuTausta = (event) => {
      if (event.target === event.currentTarget) this.suljeLappu(event.currentTarget);
    };
    // Esc kulkee samaa polkua: selaimen oletus sulkisi lapun päivittämättä
    // pelitilaa, ja peli jäisi jumiin kysymys- tai tapahtumavaiheeseen.
    this.lappuPeruutus = (event) => {
      event.preventDefault();
      this.suljeLappu(event.currentTarget);
    };
    this.taustaLaput = [
      this.arrivalDialog, this.wikiDialog, this.eventDialog, this.passportDialog,
      this.quizDialog, this.winnerDialog, document.getElementById('rules-dialog'),
      // Lähdeikkuna ei vie pelitilaa eteenpäin, joten sille riittää
      // suljeLappun viimeinen haara: paperin kahina ja close(). Esc
      // sulkee sen selaimen omalla oletuksella.
      this.lahteetDialog,
    ];
    for (const lappu of this.taustaLaput) lappu.addEventListener('click', this.lappuTausta);
    this.peruutusLaput = [this.quizDialog, this.eventDialog, this.arrivalDialog];
    for (const lappu of this.peruutusLaput) lappu.addEventListener('cancel', this.lappuPeruutus);

    /*
     * LEHTI HILJENTÄÄ ÄÄNIMAISEMAN (omistajan tilaus 13.8.2026:
     * *"ambienssi voisi hiljentyä hieman myös jos lehti avataan"*).
     * Sama hiljennys kuin pöllöpaneelilla, omalla syyllään — kumpikaan
     * ei pura toisen hiljennystä (ks. ambience-stream.js).
     *
     * Palautus on kiinni dialogin omassa close-tapahtumassa eikä
     * closeArrivalissa: lehden voi sulkea myös Escillä, taustaa
     * napauttamalla ja pelin omilta poluilta, ja close laukeaa niistä
     * kaikista. Hiljennys kytketään päälle näyttöhetkellä
     * (openArrival ja avaaMaalehti).
     */
    this.arrivalDialog.addEventListener('close', () => palautaAmbienssi('lehti'));

    /*
     * KARTTARUUTU JA KARTAN SIIRTOKUORI (omistaja 26.8.2026 ilta:
     * *"scrollaus parempi mutta ei taysin sujuva"* — wrapper-siirto).
     *
     * SVG:n vanhempi EI ole enää karttaruutu vaan .kartta-kuori: se on
     * se elementti, johon panoroinnin ja eleiden CSS-muunnos
     * kirjoitetaan (js/kartta.js asetaPan). Siksi ruutu haetaan
     * nimeltä eikä `svg.parentElement`-ketjusta — kuori LIIKKUU, joten
     * sen ruutupaikka ei kelpaa mihinkään, mikä mittaa "missä
     * karttaruutu on" (nakyvaAlue, eleiden laatikot, paneelin mitat).
     */
    this.mapPane = this.svg.closest('.map-pane') ?? this.svg.parentElement;
    this.karttaKuori = this.svg.closest('.kartta-kuori');
    /*
     * Kartan napautus kutistaa päiväkirjan yhden rivin lapuksi
     * (omistajan toive; v317 asti se kutisti auki levitetyn kortin
     * viiden rivin ikkunaan, jota ei enää ole). Näin kartan saa
     * näkyviin myös napauttamalla, ei vain liikuttamalla.
     *
     * Kuuntelija on kartta-alueella, jonka päällä kortit vain
     * kelluvat, joten kortin oma napautus ei osu tähän.
     */
    this.mapPane.addEventListener('click', () => this.asetaPaivakirjanKoko(true));

    /*
     * KARTAN +/- -PAINIKKEET ON POISTETTU (omistajan tilaus
     * 27.8.2026). Kosketuslaitteilta ne oli piilotettu jo ennestään,
     * ja työpöydällä trackpad ja hiiren rulla hoitavat saman:
     * nipistys zoomaa portaattomasti, rullan naksu portain ja kahden
     * sormen vieritys panoroi (ks. kartta.js, TRACKPADIN ELEET).
     * zoomaaPainikkeella-metodi jäi — rullan naksu ajaa portaat sillä.
     */

    /*
     * Maiden lehdet -nappi (omistajan havainto 8.8.2026: *"Kartalta
     * pitäisi päästä myös"*).
     *
     * Nappi on Maiden tiedot -varusteen pikakatkaisin kartalla: se
     * näkyy vain varusteen ollessa päällä (paivitaMaalehtiNappi) ja
     * painallus sammuttaa varusteen. Varusteeton hakuteosreitti
     * poistui (omistajan tarkennus 10.8.2026 ilta) — maiden vapaa
     * selailu vaatii varusteen, nykyisen maan pilleri toimii aina.
     */
    const maaNappi = document.getElementById('maalehti-nappi');
    if (maaNappi) {
      maaNappi.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.play('paper');
        this.valitseLinssi(this.linssiValittu === 'maatiedot' ? null : 'maatiedot');
      });
    }

    /*
     * Linssivalitsin ylärivissä (docs/moduulit/linssit.md luku 5.1).
     *
     * Kotelo on index.html:ssä valmiina mutta piilossa: nappi ilmestyy
     * vasta kun pelaaja omistaa ensimmäisen linssin, joten uudelle
     * pelaajalle ylärivi pysyy tarkalleen entisellään. Sisältö
     * rakennetaan täällä, koska valikoima riippuu sekä omistuksesta
     * että laudasta.
     *
     * Valitsin on YLÄRIVISSÄ eikä kartan reunassa: @media (pointer:
     * coarse) and (hover: none) piilottaa .zoomin kokonaan, ja sama
     * sääntö veisi valitsimen juuri iPadilta, jolla peliä eniten
     * pelataan (suunnitelman riski 10).
     */
    this.linssiKotelo = document.getElementById('linssi-kotelo');
    /*
     * Varusteet ovat päävalikossa auki valmiiksi (omistajan toive
     * 5.8.2026), joten avausnappia ja sen kuvaketta ei enää ole.
     * Kenttiin jäi null, ja ne on jätetty näkyviin, koska useampi
     * paikka tarkistaa ne — tyhjä viittaus kertoo että nappi puuttuu
     * tarkoituksella eikä vahingossa.
     */
    this.linssiNappi = null;
    this.linssiNapinIkoni = null;
    this.linssiValikko = document.getElementById('linssi-valikko');
    this.linssiTuki = null; // moottori ja omistus, kun dynaaminen tuonti onnistui
    /*
     * Maailmanradio talteen synkronisesti: drawTargets kysyy tilaa
     * kesken piirron eikä voi odottaa lupausta.
     */
    this.radioModuuli = null;
    this.radioLataus = null;
    this.radioAani = null;
    this.linssiLataus = null; // kesken oleva tuonti; jaetaan kaikille kutsujille
    this.linssiValittu = tallennettuLinssi();
    this.linssiPiirretty = null; // mihin kerrokseen linssi on piirretty
    this.linssiPois = new Set(); // linssit, joilla ei ollut tälle laudalle mitään
    this.linssiLauta = null; // mille laudalle valikoima on laskettu
    this.linssiTunniste = null; // valikoiman tunniste: valikko rakennetaan vain muutoksesta
    this.linssiAskeleet = new Map(); // valittu askel linssiä kohti
    /*
     * Valitsin ei enää avaudu eikä sulkeudu: se on osa päävalikkoa ja
     * katoaa sen mukana. Sulkeutumisen kuuntelijat (napautus muualle,
     * Esc) poistuivat samalla — päävalikko hoitaa molemmat.
     */
    this.linssiKuuntelijat = [];

    this.busy = false;
    this.dead = false; // destroy() jälkeen instanssi ei saa enää piirtää
    this.travelExpanded = false; // matkavalinnan toinen vaihe auki
    this.travelSuodatin = null; // 'sea' | 'air' | null — kumpi lista näytetään
    this.kehittajaTila = kehittajaTilaPaalla();
    /*
     * KEHITTÄJÄN YLÄRIVIN AINOA NAPPI (omistajan tilaus 27.8.2026,
     * js/ui-apurit.js osio "KEHITTÄJÄN YKSI YLÄRIVIN NAPPI:
     * MAAILMANÄKYMÄ"). Luetaan samalla tavalla kuin kehittäjätila, ja
     * paivitaKehittajaMaailma tahdistaa sen ilman sivulatausta.
     */
    this.kehittajaMaailma = kehittajaMaailmaPaalla();
    /*
     * FOKUSMOODI (omistajan linjaus 24.8.2026, Raamatun osio
     * "Fokusmoodi"). Luetaan kerran tässä kuten kehittäjätilakin;
     * paivitaFokusmoodi päivittää kentän ilman sivulatausta.
     */
    this.fokusmoodi = fokusmoodiPaalla();
    // Fokuskerroksen viimeksi piirretty maajoukko: sumuverho rakennetaan
    // uusiksi vain kun käytyjen maiden joukko oikeasti muuttuu.
    this.fokusAvain = null;
    /*
     * NOPAN PAIKKA LAUDALLA (#98). `dieThrown` kertoo, onko heitetty
     * noppa yhä näkyvissä, ja `noppaKartalla` MISSÄ se lepää — laudan
     * koordinaatteina ja sen mittakaavan kanssa, jossa se heitettiin
     * ({ x, y, perus }). Ruutupaikkaa ei säilötä lainkaan: se johdetaan
     * näistä aina kun näkymä asettuu (js/kartta.js ankkuroiNoppa).
     */
    this.dieThrown = false;
    this.noppaKartalla = null;
    this.movingPlayerId = null;
    this.revealShownFor = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    /*
     * Pöllön vihjekuplan ajastin (paivitaValintavihje). Viive on
     * kentässä eikä suoraan vakiona, jotta savukkeen ei tarvitse odottaa
     * viittätoista sekuntia todistaakseen ketjun toimivaksi.
     */
    this.valintavihjeViive = VALINTAVIHJEEN_VIIVE;
    this.valintavihjeAjastin = null;
    this.valintavihjeVaihe = false;
    /*
     * PÖLLÖN KUPLAT ODOTTAVAT LÖYTYMISTÄ (omistajan tilaus 18.8.2026).
     *
     * Pöllö on aarre, eikä sitä ole pelissä ennen ensimmäistä laattaa.
     * Kuplia ehtii silti syntyä: heti ensimmäisestä kaupungista tulee
     * 60 tietäjäpistettä (uusi lauta 50 + uusi kaupunki 10), mikä
     * ylittää tason 2 rajan (40 tp) jo ennen kuin yhtään laattaa on
     * käännetty. Siksi jono eikä pelkkä vaikeneminen: ennen löytymistä
     * kuplan sisältö pannaan talteen ja puretaan paljastuksen jälkeen
     * (naytaTietajaNousut) — muuten pelaaja menettäisi ensimmäisen
     * tietäjätasonsa onnittelun kokonaan.
     *
     * Jonon alkiot ovat olioita ({ teksti, kuva, sakeet }), koska
     * jonossa on kahdenlaisia kuplia: tavallinen vihje (pelkkä teksti)
     * ja tason nousun juhlakupla (avatar + värssy + onnittelu).
     */
    this.polloJono = [];

    this.viewBoxSize = { vw: 1000, vh: 1000 };
    // Aloituskartan lähikuva ja sen vaakapanorointi (puhelin).
    this.aloitusZoom = false;
    this.panX = null;
    this.panVara = 0;
  }

  mount() {
    this.drawBoardFor(this.game.pack);
    /*
     * NOPPA KARTAN SIIRTOKUOREEN, EI KARTTARUUTUUN (#98). Kuori on se
     * elementti, johon panoroinnin ja nipistyksen muunnos kirjoitetaan
     * (js/kartta.js asetaPan), joten kuoressa asuva noppa liikkuu ja
     * skaalautuu kartan mukana ilman yhtään laskutoimitusta
     * kehyssilmukassa. Karttaruutu on varapaikka siltä varalta, ettei
     * kuorta löydy — silloin noppa käyttäytyy kuten ennen.
     */
    this.boardDie = new BoardDie(this.karttaKuori ?? this.mapPane);
    this.kartta.asennaPanorointi();
    this.kartta.fitViewBox();
    this.observer = new ResizeObserver(() => this.kartta.fitViewBox());
    // Karttaruutu, ei siirtokuori: kuori on ruudun kokoinen mutta
    // liikkuu, ja koon muutos tulee aina ruudulta (wrapper-siirto).
    this.observer.observe(this.mapPane);
    this.vahdiNakymanKokoa();
    this.render();
    this.esilataaAarrekuvat();
    /*
     * PÖLLÖN KUTSU OSALLISTUA (Raamattu, osio "Lukijoiden
     * ehdotukset"): kymmenen minuutin pelaamisen jälkeen pöllönapin
     * viereen ilmestyy kerran — ja vain kerran koko pelaajan
     * historiassa — kupla, joka kertoo kanavasta. Ajastus, lippu ja
     * teksti ovat js/ehdotukset.js:ssä; tässä on vain kuplan
     * näyttäjä, sama kuin valintavihjeellä.
     */
    this.ehdotusKuplaAjastin = ajastaEhdotusKupla((teksti) => {
      // Kohde 'valikko': ehdota-nappi asuu hampurilaisessa, joten
      // kupla osoittaa sinne (omistaja 18.8.2026).
      if (!this.dead) this.polloKupla(teksti, 'valikko');
    }, () => this.game?.dayCount?.() ?? 1);
    /*
     * PÖLLÖN NÄKYVYYS UUDELLE PELILLE. Nappi katoaa ja ilmestyy pelin
     * tilan mukana (game.polloLoydetty), ja uusi peli vaihtaa UI:n
     * alta ilman että #intro liikkuu — pöllön oma tarkkailija ei siis
     * huomaisi mitään. Ilman tätä riviä edellisen pelin löytämä pöllö
     * jäisi riviin uudenkin pelin alkuun.
     */
    polloPaivitaNakyvyys();
  }

  /**
   * Pöllön minipuhekupla: heti jos pöllö on löytynyt, muuten jonoon.
   *
   * Ennen ensimmäistä laattaa pöllöä ei ole pelissä, eikä sen napin
   * vieressä voi näyttää mitään. Kupla ei kuitenkaan saa hävitä: se
   * odottaa löytöhetkeä ja tulee heti paljastuksen jälkeen.
   */
  polloKupla(teksti, kohde) {
    if (!teksti || this.dead) return;
    if (this.game?.polloLoydetty === false) {
      this.polloJono.push({ teksti, kohde });
      return;
    }
    polloVihje(teksti, kohde);
  }

  /**
   * Yksi jonosta purettu kupla oikeaan asuunsa: juhlakupla, jos
   * mukana on avatar tai värssy, muuten tavallinen vihjekupla.
   */
  naytaPolloKupla(kupla) {
    if (!kupla?.teksti) return;
    if (kupla.kuva || kupla.sakeet?.length) polloOnnittelu(kupla);
    else polloVihje(kupla.teksti, kupla.kohde);
  }

  /* --- näkymän koko ja sen elpyminen taustalta ---------------------- */

  /**
   * Näkymän leveys pikseleinä.
   *
   * Ensisijainen mitta on ASETTELUVIEWPORTTI (documentElement), koska
   * juuri se ohjaa kaikkea, mitä vahti vartioi: arkin 100vw ja palstojen
   * 700 px:n media query seuraavat asetteluviewporttia. visualViewport
   * voi erota siitä (nipistyszoomi, näppäimistö), ja sen käyttö
   * ensisijaisena sai vahdin vertaamaan eri lukua kuin CSS näkee.
   * visualViewport jää varamittariksi tapauksiin, joissa asettelumitta
   * on roskaa.
   */
  mittaaNakyma() {
    const asettelu = Math.round(document.documentElement?.clientWidth || 0);
    const visuaali = Math.round(window.visualViewport?.width || window.innerWidth || 0);
    /*
     * RISTIINTARKISTUS (omistaja 13.8.2026: "lehti näkyy vieläkin
     * kapeana iPadilla" — neljäs saman perheen oire). WKWebView voi
     * kylmäkäynnistyksessä pitää ASETTELUVIEWPORTIN vanhassa kapeassa
     * mitassa, vaikka ruutu on iPadin levyinen: clientWidth palauttaa
     * silloin sitkeästi esim. 390 eikä mikään aiempi vahti epäile sitä,
     * koska 390 on ihan kelvollisen näköinen luku. Zoomaamattomana
     * visuaalinen viewportti kertoo laitteen todellisen leveyden —
     * jos se on selvästi asettelumittaa suurempi, asettelumitta on
     * vanhentunut ja visuaalinen voittaa. Nipistyszoomissa scale ≠ 1
     * ja ehto ei laukea, joten zoomattu lukija ei riko mitään.
     */
    const zoomaton = !window.visualViewport
      || Math.abs((window.visualViewport.scale ?? 1) - 1) < 0.05;
    if (zoomaton && visuaali > asettelu * 1.2) return visuaali;
    if (asettelu >= NAKYMAN_VAHIMMAISLEVEYS) return asettelu;
    return visuaali;
  }

  /**
   * Näkymän korkeus pikseleinä.
   *
   * Tässä valitaan tarkoituksella PIENEMPI kahdesta mitasta, toisin
   * kuin leveydessä. Syy on oireessa, jota tämä palvelee (omistajan
   * havainto 16.8.2026 iPadilla: *"alareunasta puuttuu
   * navigointinäppäimet jotka jäävät jonkun vaalean laatikon taakse.
   * Bugi alkaa kun käy jossain toisessa sovelluksessa ja palaa
   * takaisin"*): jos kortti on NÄKYVÄÄ ruutua korkeampi, sen
   * alanapit valuvat ruudun ali — eikä niitä saa esiin
   * vierittämälläkään, koska sisältö mahtuu korttiin eikä kortti
   * enää vieri. Liian matala kortti on vain hieman ruma; liian
   * korkea kortti vie napit kokonaan. Siksi epävarmuus ratkaistaan
   * pienemmän hyväksi.
   */
  mittaaNakymanKorkeus() {
    const asettelu = Math.round(document.documentElement?.clientHeight || 0);
    const visuaali = Math.round(window.visualViewport?.height || window.innerHeight || 0);
    const zoomaton = !window.visualViewport
      || Math.abs((window.visualViewport.scale ?? 1) - 1) < 0.05;
    const kelpo = [asettelu, zoomaton ? visuaali : 0]
      .filter((mitta) => mitta >= NAKYMAN_VAHIMMAISKORKEUS);
    return kelpo.length ? Math.min(...kelpo) : 0;
  }

  /**
   * ARKKIEN PYSTYMITAT (18.8.2026, koko v784–v851-perheen purku).
   *
   * LEHTIARKKI (#arrival-dialog) EI SAA KORKEUTTA JS:STÄ ENÄÄ
   * LAINKAAN. Sen pystymitat ovat CSS:ssä top/bottom-ankkureita ja
   * prosentteja (ks. styles.css `.dialog.arkki`-perussäännön
   * selostus): fixed-laatikko venytetään asetteluviewportin
   * reunoihin, ja asetteluviewportti on WKWebView'ssä oikein myös
   * silloin, kun dvh/vw ovat jumissa (v784 osoitti tämän:
   * clientHeight oli oikein, dvh väärin). Jokainen tässä metodissa
   * aiemmin kirjoitettu pikselikorkeus oli mittaushetkensä vanki —
   * jos resize-tapahtuma jäi tulematta (taustakierto, taustapaluu),
   * väärä mitta jäi voimaan ikuisesti, ja alareunaan syntyi joko
   * sumea ::backdrop-kaista (liian lyhyt arkki) tai napit ruudun
   * alle (liian pitkä). Siksi täällä vain SIIVOTAAN mahdolliset
   * vanhat inline-mitat, jotta ankkurit pääsevät varmasti voimaan.
   *
   * NÄHTÄVYYS- JA OPASARKKI (#nahtavyys-dialog) pitää pikselikaton:
   * sen dialogi on `height: fit-content` (dialogiin ankkuroidut
   * napit istuvat kortin kulmassa) ja kortin katto `max-height:
   * inherit` — prosentti ei periydy käyttökelpoisena fit-content-
   * vanhemman läpi, joten ankkurimalli ei sovi siihen sellaisenaan.
   * Sen katto lasketaan kuten ennenkin: mitattu korkeus − 3rem −
   * turva-alueet (omistajan havainnot 16.8.2026; turva-arvot
   * luetaan --turva-muuttujista, koska env() ei aukea JS:lle).
   *
   * ROSKAMITTA EI PALAUTA dvh:TA VOIMAAN (17.8.2026): mittauksen
   * pettäessä käytetään viimeisintä kelvollista pikselimittaa
   * (arkinKelpoKorkeus), ei CSS:n dvh-sääntöä — juuri dvh on se,
   * joka jumiutuu. Seuraava kelvollinen mittaus (näkymävahti herää
   * resizesta, orientationchangesta, pageshow'sta ja
   * visibilitychangesta) korjaa tilanteen.
   */
  mitoitaArkinKorkeus() {
    const arkit = document.querySelectorAll('dialog.arkki');
    if (!arkit.length) return;
    const mitattu = this.mittaaNakymanKorkeus();
    if (mitattu) this.arkinKelpoKorkeus = mitattu;
    const korkeus = mitattu || this.arkinKelpoKorkeus || 0;
    const juuri = getComputedStyle(document.documentElement);
    const rem = parseFloat(juuri.fontSize) || 16;
    const turva = (nimi) => parseFloat(juuri.getPropertyValue(nimi)) || 0;
    // clientHeight ulottuu loveuksen ja kotipalkin ali, koska sivu on
    // viewport-fit=cover. Katon on siis annettava ne takaisin.
    const turvat = turva('--turva-yla') + turva('--turva-ala');
    for (const arkki of arkit) {
      const kortti = arkki.querySelector('.dialog-card');
      if (!arkki.classList.contains('nahtavyys-arkki')) {
        // Lehtiarkki: ankkurit hoitavat — inline-mitat vain pois.
        for (const el of [arkki, kortti]) {
          if (!el) continue;
          el.style.height = '';
          el.style.maxHeight = '';
        }
        continue;
      }
      const katto = korkeus
        ? `${Math.round(korkeus - 3 * rem - turvat)}px`
        : '';
      arkki.style.maxHeight = katto;
      // Katto myös kortille: kortti ei saa koskaan olla dialogiaan
      // löysempi (mitattu ylitys 32 px iPadilla 16.8.2026).
      if (kortti) kortti.style.maxHeight = katto;
    }
  }

  /**
   * NÄKYMÄN ELVYTYS (omistajan havainto 13.8.2026 iPadilla:
   * *"lehti oli ensin leveä ja monipalstainen, ja taustakäynnin
   * jälkeen se avautui kapeana yksipalstaisena"*).
   *
   * Lehtiarkin leveys ja palstojen määrä tulevat näkymän mitasta
   * (css: .dialog.arkki on 100vw, ja kahden palstan taitto alkaa
   * 700 pikselistä), ja arkin sisällä on lisäksi piirroksia, jotka
   * mitoitetaan JS:ssä kortin senhetkisestä leveydestä — kohdekartta,
   * maakäyrät ja tilastopalkit. WKWebView voi taustalta palatessa
   * ilmoittaa hetkeksi väärän — pienen tai nollan — näkymäkoon, ja jos
   * asettelu lasketaan juuri silloin, lehti jää puhelinlevyiseksi
   * vaikka ruutu on iPadin kokoinen.
   *
   * Vahti tekee kaksi asiaa:
   *
   *   a) EI KOSKAAN sivuta roskamitalla. Nolla tai epäilyttävän pieni
   *      luku hylätään, ja jos mitta romahtaa dokumentin ollessa
   *      piilossa, laskenta lykätään siihen hetkeen, jolloin näkymä on
   *      taas esillä oikean kokoisena.
   *   b) Kun oikea koko palaa, AVOINNA OLEVA lehti sivutetaan
   *      uudelleen itsestään — lehteä ei tarvitse sulkea ja avata.
   *
   * Kynnykset ovat tarkoituksella karkeat: puhelimen näppäimistö ja
   * osoiterivi muuttavat näkymän korkeutta jatkuvasti, mutta LEVEYS
   * muuttuu vain kääntyessä tai ikkunaa vetämällä — ja silloin
   * uudelleensivutus on juuri se, mitä halutaan.
   */
  vahdiNakymanKokoa() {
    if (this.nakymaVahti) return;
    this.nakymanLeveys = this.mittaaNakyma();
    // Lähtökorkeus talteen: ilman sitä ensimmäinen vertailu ei voi
    // havaita hyppyä, ja juuri ensimmäinen taustapaluu on se hetki,
    // jolloin korkeus on väärä.
    this.nakymanKorkeus = this.mittaaNakymanKorkeus();
    this.nakymaElvytyksia = 0;
    this.nakymaVahti = () => this.tarkistaNakyma();
    window.addEventListener('resize', this.nakymaVahti);
    window.addEventListener('orientationchange', this.nakymaVahti);
    window.addEventListener('pageshow', this.nakymaVahti);
    document.addEventListener('visibilitychange', this.nakymaVahti);
    window.visualViewport?.addEventListener('resize', this.nakymaVahti);
    /*
     * ALAREUNAN KAISTA SOVELLUSVAIHDON JÄLKEEN (omistajan bugiraportti
     * 23.8.2026 iPadilta: *"kun käyn toisessa sovelluksessa —
     * näppäimistö auki — ja palaan peliin, sivun alareunaan jää väärin
     * mitoitettu kaista; laitteen kääntäminen vaakaan ja takaisin
     * korjaa sen"*). EI TOISTETTAVISSA KONTISSA: tämä on
     * todennäköisin syy, ei mitattu.
     *
     * Kokovahti kuuntelee jo sekä visibilitychangea että
     * visualViewportin resizea (yllä), mutta tarkistaNakyma on
     * EROVERTAILU: paluun hetkellä leveys on ennallaan ja korkeusero
     * jää alle 8 %:n kynnyksen — juuri sen kokoinen kuin näppäimistön
     * jättämä kaista — joten elvytystä ei ajeta ja vanha mitoitus jää
     * voimaan. Laitteen kääntö korjaa nimenomaan siksi, että se
     * muuttaa LEVEYTTÄ: silloin vertailu näkee muutoksen.
     *
     * Siksi paluu näkyviin ja asettunut visualViewportin resize
     * merkitsevät mitan EPÄVARMAKSI ennen tarkistusta. `nakymaEpavarma`
     * on tarkistaNakyman oma, jo olemassa oleva lippu ("lukuun ei voi
     * luottaa, aja elvytys silti"), joten uutta logiikkaa ei synny —
     * vahti päätyy samaan lopputulokseen kuin käännöstä. Harvennus
     * (OIKAISUN_HILJAISUUS_MS) pitää näppäimistöanimaation kymmenet
     * tapahtumat yhtenä tarkistuksena.
     *
     * Fokusoitu tekstikenttä on poikkeus: silloin näppäimistö on
     * pelaajan oma ja elää juuri nyt (pöllön kysymysrivi), eikä
     * avoimen lehden uudelleensivutus kuulu kirjoittamisen väliin.
     * Kentän jättö ajaa oman sovituksensa (kenttaVahti).
     */
    this.mitoitusVahti = () => {
      clearTimeout(this.mitoitusAjastin);
      this.mitoitusAjastin = setTimeout(() => {
        if (this.dead || document.hidden) return;
        const el = document.activeElement;
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
          || el.isContentEditable)) return;
        this.nakymaEpavarma = true;
        this.tarkistaNakyma();
      }, OIKAISUN_HILJAISUUS_MS);
    };
    document.addEventListener('visibilitychange', this.mitoitusVahti);
    window.visualViewport?.addEventListener('resize', this.mitoitusVahti);
    /*
     * TAUSTAPALUUN SOVITUS (18.8.2026, kartan taustapaluuperheen
     * rakenteellinen korjaus — omistajan kuvakaappaus 18.8.2026:
     * Afrikka-näkymässä kartan vasempaan reunaan jäi pergamentin-
     * värinen pystykaista, kartta oli työntynyt oikealle ja vasemman
     * ylänurkan tekstit piirtyivät päällekkäin; sama oirepari kuin
     * v789:ssä ja v837:ssä, jotka paikkasivat kukin yhden polun).
     *
     * Aiemmat vahdit toimivat EROVERTAILULLA: tarkistaNakyma vertaa
     * mitattua leveyttä/korkeutta muistettuun ja elvyttää vain kun ne
     * eroavat. Taustapaluussa on kuitenkin tiloja, joissa mitat
     * täsmäävät mutta piirretty geometria on silti vanhaa: WKWebView
     * palauttaa sivun vanhalla asettelulla ja oikaisee sen ilman
     * yhtään resize-tapahtumaa, tai mitat ovat paluun ensihetkellä
     * vanhat ja oikenevat vasta myöhemmin — jolloin erovertailu näkee
     * "ei muutosta" kummallakin puolella. Silloin kartan svg:n
     * inline-mitat, panorointi ja matkakirjalapun paikka jäävät
     * vanhan näkymän mukaisiksi eikä mikään laske niitä uusiksi.
     *
     * Siksi paluu näkyviin EI vertaa mihinkään vaan JOHTAA geometrian
     * uudelleen nykytilasta: fitViewBox on idempotentti (se lukee
     * paneelin koon juuri nyt, säilyttää käsipanoroinnin kun koko ei
     * muuttunut ja keskittää pelaajaan kun muuttui), joten sen ajo
     * turhaan on halpa ja ajamatta jättäminen kallis. Sama sovitus
     * ajetaan uudelleen 400 ja 1600 ms päästä — iOS:n viivästyneet
     * viewport-oikaisut ehtivät molempiin (sama pari kuin lehden
     * varmistaLehtiMitta). Rasterit hoitaa tarkkuusvahti kuten ennen.
     */
    this.paluuVahti = () => {
      if (this.dead || document.hidden) return;
      this.sovitaTaustapaluu();
    };
    document.addEventListener('visibilitychange', this.paluuVahti);
    window.addEventListener('pageshow', this.paluuVahti);
    /*
     * PEITON POISTUMINEN JOHTAA GEOMETRIAN UUDELLEEN (18.8.2026,
     * saman perheen toinen kierros — omistajan kuvakaappaus v884:stä:
     * vika toistui KESKEN PELIN ilman taustapaluuta).
     *
     * Modaalin (lehti, laukku, tapahtumaikkuna) ollessa auki kartta
     * on top layer -kerroksen alla, ja WKWebView voi sinä aikana
     * muuttaa asettelua toimittamatta yhtään resize-tapahtumaa —
     * sama mekanismi, jonka taustapaluu jo tunnisti. Paneelin
     * ResizeObserver (mount) hoitaa moottorit, jotka tapahtumansa
     * toimittavat; tämä hoitaa paluut, joista tapahtumaa ei tule.
     *
     * Dialogin close-tapahtuma ei kupli mutta kulkee kaappausvaiheen
     * läpi, joten yksi dokumenttitason kuuntelija kattaa kaikki
     * dialogit — myös tulevat — eikä sovitusta voi unohtaa uudesta
     * ikkunasta. Sovitus on sama idempotentti uudelleenjohto kuin
     * taustapaluussa: ei erovertailua, turha ajo on halpa (pienen
     * popupin sulku ajaa saman ketjun eikä se haittaa — pan säilyy,
     * kun paneelin koko ei ole muuttunut).
     */
    this.peiteVahti = (e) => {
      if (this.dead || e.target?.tagName !== 'DIALOG') return;
      this.sovitaTaustapaluu();
    };
    document.addEventListener('close', this.peiteVahti, true);
    /*
     * VISUAALIVIEWPORTIN OIKAISU (18.8.2026, saman perheen kolmas
     * kierros — omistajan kuvakaappaus v895-illalta: KOKO
     * SOVELLUSKEHYS kutistuneena ylävasemmalle, ruudun oikea alakulma
     * paljasta taustaa, MATKAKIRJASTA-kyltin tekstit sisäkkäin — ja
     * yläpalkissa iOS:n mikrofonimerkki eli pöllön SANELU oli käytössä).
     *
     * iOS:n näppäimistö ja sanelupalkki muuttavat visualViewportia,
     * ja WKWebView voi samalla siirtää tai kutistaa ASETTELUVIEWPORTIN
     * toimittamatta window-tason resize-tapahtumaa. Kokovahti
     * (nakymaVahti) kuuntelee kyllä visualViewportin resizea, mutta se
     * on EROVERTAILU: kun palkki katoaa ja mitat palaavat lähtöarvoon,
     * vahti näkee "ei muutosta" — vaikka kehys jäi väärän kokoiseksi
     * (mitattu Chromiumissa 18.8.2026: vanhentunut geometria + vv-
     * resize samoilla mitoilla → ei yhtään sovitusta ennen tätä).
     *
     * Siksi visualViewportin resize JA scroll johtavat geometrian
     * uudelleen samalla ankkuriopilla kuin taustapaluu — ei
     * erovertailua. Harvennus: sovitus ajetaan vasta kun tapahtumat
     * ovat olleet OIKAISUN_HILJAISUUS_MS hiljaa, joten näppäimistö-
     * animaation kymmenet tapahtumat maksavat yhden sovituksen.
     * Kesken kartaneleen (raahaus/nipistys) oikaisu siirtyy
     * tuonnemmas: sovitus hylkäisi elävän eleen (hylkaaNipistys),
     * ja eleen oma päätös ajaa fitViewBoxin joka tapauksessa.
     */
    this.oikaisuVahti = () => {
      clearTimeout(this.oikaisuAjastin);
      this.oikaisuAjastin = setTimeout(() => {
        if (this.dead || document.hidden) return;
        if (this.kartanRaahaus) { this.oikaisuVahti(); return; }
        this.sovitaTaustapaluu();
      }, OIKAISUN_HILJAISUUS_MS);
    };
    window.visualViewport?.addEventListener('resize', this.oikaisuVahti);
    window.visualViewport?.addEventListener('scroll', this.oikaisuVahti);
    /*
     * TEKSTIKENTÄN JÄTTÖ JOHTAA GEOMETRIAN UUDELLEEN (18.8.2026,
     * omistajan täsmennys: iPadissa on kolmannen osapuolen
     * SANELUNÄPPÄIMISTÖ, joka avautuu AINA kun MIKÄ TAHANSA pelin
     * tekstikenttä saa fokuksen — pöllön kysymysrivi, ehdotuslomake,
     * pro-kirjautuminen — ja jonka koko ja palkit poikkeavat
     * vakionäppäimistöstä; sen sulkeutuminen voi jättää viewportin
     * vääräksi ilman yhtään tapahtumaa).
     *
     * Siksi vahti on DOKUMENTTITASOLLA eikä yhdessäkään kentässä:
     * focusout kuplii (toisin kuin blur), joten yksi kuuntelija
     * kattaa kaikki kentät — myös tulevat — samalla opilla kuin
     * peiteVahti kattaa kaikki dialogit. Sovitus on idempotentti ja
     * turha ajo halpa; kenttien välillä liikkuva fokus maksaa vain
     * ylimääräisen sovituksen.
     */
    this.kenttaVahti = (e) => {
      if (this.dead || document.hidden) return;
      const el = e.target;
      const kentta = el && (el.tagName === 'INPUT'
        || el.tagName === 'TEXTAREA' || el.isContentEditable);
      if (kentta) this.sovitaTaustapaluu();
    };
    document.addEventListener('focusout', this.kenttaVahti, true);
  }

  /**
   * Johda näkyvä geometria uudelleen nykymitoista (ks. paluuVahti ja
   * peiteVahti — sama sovitus ajaa taustapaluun ja peiton poistumisen).
   */
  sovitaTaustapaluu() {
    const sovita = () => {
      if (this.dead || document.hidden) return;
      // Kesken jäänyt nipistys hylätään ennen sovitusta: sen
      // välivaiheen muunnos (scale + siirto) ei saa jäädä svg:hen
      // (ks. kartta.js hylkaaNipistys; 18.8.2026, v884:n kaappaus).
      this.kartta.hylkaaNipistys?.();
      /*
       * SIVUN VIERITYS NOLLAAN (18.8.2026, kolmas kierros). Sovellus
       * on kiinteä koko ruudun kehys (css .app: fixed + inset 0) eikä
       * sivu vieritä koskaan — mutta iOS vierittää asetteluviewporttia
       * itse, kun näppäimistö tai sanelupalkki avautuu fokusoidulle
       * kentälle (pöllön kysymysrivi), overflow: hiddenistä
       * piittaamatta. Jos palautus jää tulematta, kiinteä kehys jää
       * siirtyneeksi ja ruudun vastakkaiseen laitaan jää paljas
       * tausta. Oikea vieritys on siis AINA 0,0 — paitsi juuri
       * silloin, kun tekstikenttä on fokusissa ja iOS tarvitsee
       * siirtoa näppäimistön tieltä; silloin ei kosketa.
       */
      const aktiivinen = document.activeElement;
      const kentassa = aktiivinen && (aktiivinen.tagName === 'INPUT'
        || aktiivinen.tagName === 'TEXTAREA' || aktiivinen.isContentEditable);
      if (!kentassa && (window.scrollX || window.scrollY)) window.scrollTo(0, 0);
      // Pakotettu asettelun luku + viewport-metan uudelleenkirjoitus:
      // sama herätyspari kuin elvytaNakymassa — WKWebView pitää vanhan
      // mitan voimassa, kunnes joku sitä kysyy.
      void document.body.offsetWidth;
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) meta.setAttribute('content', meta.getAttribute('content'));
      this.kartta.fitViewBox();
      // Nähtävyysarkin pikselikatto tuoreeksi samalla (lehtiarkki ei
      // tarvitse: sen pystymitat ovat ankkureita, ks. mitoitaArkinKorkeus).
      this.mitoitaArkinKorkeus();
    };
    sovita();
    /*
     * VAKIINTUMISSILMUKKA KIINTEIDEN JÄLKIAJOJEN TILALLE (18.8.2026,
     * kolmas kierros — omistaja: vika tulee AINA sovellusvaihdosta ja
     * paluusta, vaikka v871:n 400/1600 ms jälkiajot piti kattaa juuri
     * sen). Kiinteät jälkiajot ovat mittaushetkensä vankeja: iOS voi
     * jäädyttää taustalle jääneen prosessin, jolloin ajastimet
     * laukeavat paluussa HETI peräkkäin ennen kuin WKWebView on
     * palauttanut oikeat mitat — ja sanelunäppäimistö voi muuttaa
     * palautuvia mittoja vielä sekunteja myöhemmin.
     *
     * Siksi paluun jälkeen EI luoteta yhteenkään kiinteään hetkeen
     * vaan JATKETAAN tarkistamista: silmukka lukee mitat
     * (visualViewport, ikkuna, dokumentti, vieritys) PALUU_TAHTI_MS
     * välein PALUU_KESTO_MS ajan ja ajaa sovituksen aina, kun mitat
     * muuttuivat edellisestä lukemasta TAI dokumentti ei peitä
     * ruutua (paluunMitat — juuri se jättää mustan kulman). Askel on
     * halpa: pelkkä mittojen luku, sovitus vain tarpeesta;
     * ensimmäinen askel ajaa sovituksen aina (v871:n 400 ms:n perua).
     * Piiloon menevä dokumentti pysäyttää silmukan — paluuVahti
     * käynnistää uuden esiintulossa.
     */
    clearTimeout(this.paluuAjastin);
    const alku = performance.now();
    let edellinen = null;
    const askel = () => {
      if (this.dead || document.hidden) return;
      const tila = this.paluunMitat();
      const muuttui = edellinen !== null && tila.tunniste !== edellinen;
      if (edellinen === null || muuttui || !tila.kattaa) sovita();
      edellinen = tila.tunniste;
      if (performance.now() - alku < PALUU_KESTO_MS) {
        this.paluuAjastin = setTimeout(askel, PALUU_TAHTI_MS);
      }
    };
    this.paluuAjastin = setTimeout(askel, PALUU_TAHTI_MS);
  }

  /**
   * Paluun vakiintumissilmukan mittalukema: yksi tunniste kaikista
   * näkymän mitoista sekä tieto siitä, peittääkö dokumentti ruudun.
   *
   * Kattavuus mitataan DOKUMENTISTA eikä svg:stä (omistajan kaappaus
   * 18.8.2026: ruudun oikea alakulma oli paljasta taustaa eli
   * html/body oli ruutua pienempi): zoomaamattomana visuaalinen
   * viewportti kertoo ruudun todelliset mitat, ja asetteluviewportin
   * (documentElement) on peitettävä ne — muuten kiinteä sovelluskehys
   * (css .app: inset 0) jää vajaaksi. Myös vieritysjäämä lasketaan
   * peittovirheeksi, paitsi tekstikentän fokuksessa, jolloin iOS
   * vierittää tarkoituksella näppäimistön tieltä.
   */
  paluunMitat() {
    const vv = window.visualViewport;
    const zoomaton = !vv || Math.abs((vv.scale ?? 1) - 1) < 0.05;
    const vvW = Math.round(vv?.width ?? 0);
    const vvH = Math.round(vv?.height ?? 0);
    const docW = Math.round(document.documentElement?.clientWidth || 0);
    const docH = Math.round(document.documentElement?.clientHeight || 0);
    const aktiivinen = document.activeElement;
    const kentassa = aktiivinen && (aktiivinen.tagName === 'INPUT'
      || aktiivinen.tagName === 'TEXTAREA' || aktiivinen.isContentEditable);
    const vieritys = !kentassa && (Math.round(window.scrollX) || Math.round(window.scrollY));
    // Näppäimistön ollessa auki visuaalinen KORKEUS on asettelua
    // pienempi — se on kunnossa; virhe on dokumentti ruutua pienempänä.
    const kattaa = !zoomaton || !vvW
      || (docW >= vvW - 2 && docH >= vvH - 2 && !vieritys);
    const tunniste = [vvW, vvH, Math.round(window.innerWidth || 0),
      Math.round(window.innerHeight || 0), docW, docH,
      Math.round(window.scrollX), Math.round(window.scrollY)].join('x');
    return { tunniste, kattaa };
  }

  tarkistaNakyma() {
    if (this.dead) return;
    /*
     * Korkeus päivitetään joka heräämisellä eikä vasta leveyden
     * muuttuessa: taustalta palatessa ruudun korkeus voi muuttua
     * (osoiterivi, jaettu näyttö, Stage Manager) ilman että leveys
     * liikahtaa lainkaan — ja juuri se vei alanapit ruudun ali.
     */
    if (!document.hidden) this.mitoitaArkinKorkeus();
    const leveys = this.mittaaNakyma();
    const edellinen = this.nakymanLeveys || 0;
    const roska = !leveys || leveys < NAKYMAN_VAHIMMAISLEVEYS;
    const romahti = edellinen > 0 && leveys < edellinen * NAKYMAN_KUTISTUMISRAJA;
    /*
     * Roskamitta ja piilossa tapahtunut romahdus jätetään huomiotta,
     * mutta merkitään: seuraava esiintulo tarkistaa koon uudestaan,
     * vaikka luku olisi silloin sama kuin ennen romahdusta.
     */
    if (roska || (romahti && document.hidden)) {
      this.nakymaEpavarma = true;
      return;
    }
    if (document.hidden) return;
    /*
     * KORKEUS LAUKAISEE ELVYTYKSEN SIINÄ MISSÄ LEVEYSKIN (omistajan
     * havainto 16.8.2026: peli jää iPadilla tilaan, jossa alanapit
     * puuttuvat ja kartta on piirretty väärän kokoiseksi, mutta karttaa
     * voi vierittää — ja tila korjaantuu itsestään myöhemmin).
     *
     * Vahti seurasi tähän asti VAIN leveyttä, koska leveys ratkaisee
     * palstojen määrän. Kartta ja alapalkki mitoitetaan kuitenkin
     * KORKEUDESTA (fitViewBox), ja taustalta palatessa juuri korkeus on
     * se, joka ehtii olla hetken väärä: leveys pysyy samana, joten
     * vahti totesi "ei muutosta" ja palasi — eikä kukaan laskenut
     * karttaa uusiksi. Se selittää myös itsestään korjaantumisen:
     * seuraava tapahtuma, joka sattui muuttamaan LEVEYTTÄ, teki
     * elvytyksen jälkijunassa.
     *
     * Kynnys on karkea (8 %), koska puhelimen osoiterivi liikuttaa
     * korkeutta jatkuvasti pikkuriikkisesti — vain selvä hyppy on
     * merkki siitä, että näkymä on oikeasti toinen.
     */
    const korkeus = this.mittaaNakymanKorkeus();
    const edellinenKorkeus = this.nakymanKorkeus || 0;
    const korkeusHyppasi = korkeus > 0 && edellinenKorkeus > 0
      && Math.abs(korkeus - edellinenKorkeus) > edellinenKorkeus * 0.08;
    if (korkeus > 0) this.nakymanKorkeus = korkeus;
    if (leveys === edellinen && !korkeusHyppasi && !this.nakymaEpavarma) return;
    this.nakymanLeveys = leveys;
    this.nakymaEpavarma = false;
    this.ajastaNakymanElvytys();
  }

  ajastaNakymanElvytys() {
    clearTimeout(this.nakymaAjastin);
    // Pieni odotus: iOS ilmoittaa koon usein ennen kuin asettelu on
    // ehtinyt sen mukaiseksi, ja peräkkäiset tapahtumat niputtuvat.
    this.nakymaAjastin = setTimeout(() => {
      if (this.dead) return;
      const leveys = this.mittaaNakyma();
      if (!leveys || leveys < NAKYMAN_VAHIMMAISLEVEYS) return;
      this.nakymanLeveys = leveys;
      this.elvytaNakyma();
    }, NAKYMAN_ELVYTYSVIIVE);
  }

  /*
   * LEHDEN AVAUKSEN MITTAVARMISTUS (omistaja 13.8.2026: "lehden leveys
   * palasi kapeaan iPhone-leveyteen kun suljin ja avasin apin
   * uudestaan" — kolmas saman perheen oire; v595 hoiti taustapaluun ja
   * v617 CSS-leveyden).
   *
   * Vahti (tarkistaNakyma) herää vain TAPAHTUMISTA. WKWebView kuitenkin
   * pitää kylmäkäynnistyksessä vanhan — kapean — mitan voimassa siihen
   * asti, kunnes joku pakottaa asettelun luvun (sama ilmiö, jonka
   * elvytaNakyma jo kirjaa), eikä oikaisu välttämättä lähetä yhtään
   * resize-tapahtumaa. Silloin lehti sivutetaan avattaessa vanhalla
   * mitalla eikä mikään koskaan korjaa sitä.
   *
   * Siksi lehden avaus tekee kolme asiaa tapahtumiin luottamatta:
   *   1. pakottaa asettelun luvun ja mittaa JUURI ennen sivutusta,
   *   2. tarkistaa mitan uudelleen kahdesti avauksen jälkeen (400 ja
   *      1600 ms — iOS:n myöhässä asettuva viewportti ehtii molempiin),
   *   3. jos mitta on ehtinyt muuttua, avoinna oleva lehti sivutetaan
   *      uudelleen (elvytaNakyma palauttaa myös lukukohdan).
   */
  varmistaLehtiMitta() {
    void document.body.offsetWidth;
    const mitattu = this.mittaaNakyma();
    if (mitattu >= NAKYMAN_VAHIMMAISLEVEYS) this.nakymanLeveys = mitattu;
    clearTimeout(this.lehtitila.lehtiMittaAjastin);
    clearTimeout(this.lehtitila.lehtiMittaJalkiajastin);
    const tarkista = () => {
      if (this.dead || !this.arrivalDialog?.open) return;
      void document.body.offsetWidth;
      const nyt = this.mittaaNakyma();
      if (!nyt || nyt < NAKYMAN_VAHIMMAISLEVEYS) return;
      /*
       * KORTTI-INVARIANTTI: avoin arkki on aina lähes näkymän levyinen
       * (CSS: 100vw − 1.6rem). Jos renderöity kortti on selvästi
       * kapeampi kuin mitattu näkymä, sivutus on tehty vanhalla
       * mitalla TAI vw-yksiköt elävät yhä vanhassa viewportissa —
       * kummassakin tapauksessa elvytys mitoittaa arkin pikseleinä
       * uusiksi. Tämä laukeaa myös silloin, kun mitta itsessään ei
       * ole muuttunut (aiempi vahti vaati muutoksen ja jäi siksi
       * sokeaksi juuri tälle vialle).
       */
      const kortti = this.arrivalDialog.querySelector('.dialog-card');
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      // Sama leveyssääntö kuin mitoitaArkissa: alle 700 koko ruutu,
      // muuten 100vw − 6rem katolla 960 (leveä työpöytä EI ole vika).
      const odotettu = nyt < 700 ? nyt : Math.min(nyt - 6 * rem, 960);
      const kapea = this.arrivalDialog.classList.contains('arkki')
        && (kortti?.offsetWidth ?? 0) > 0
        && kortti.offsetWidth < odotettu * 0.9;
      if (nyt === this.nakymanLeveys && !kapea) return;
      this.nakymanLeveys = nyt;
      this.elvytaNakyma();
    };
    this.lehtitila.lehtiMittaAjastin = setTimeout(tarkista, 400);
    this.lehtitila.lehtiMittaJalkiajastin = setTimeout(tarkista, 1600);
  }

  /*
   * ARKIN LEVEYS PIKSELEINÄ, EI vw-YKSIKÖINÄ. CSS antaa arkille
   * 100vw − 1.6rem, mutta vw seuraa asetteluviewporttia — ja juuri se
   * jää WKWebView:n kylmäkäynnistyksessä joskus vanhaan kapeaan
   * mittaan (ks. mittaaNakyma). Kun mitta on luotettavasti tiedossa,
   * sama leveys kirjoitetaan inline-pikseleinä: ne eivät riipu
   * viewportin yksiköistä. Ei mitään, jos mitta ei eroa CSS:n omasta
   * tuloksesta — inline-arvo vain vahvistaa saman luvun.
   */
  mitoitaArkki() {
    const dialog = this.arrivalDialog;
    if (!dialog?.classList.contains('arkki')) return;
    // Korkeus samalla kertaa: sivunvaihto on juuri se hetki, jolloin
    // kortin mitat kirjoitetaan pikseleinä.
    this.mitoitaArkinKorkeus();
    const leveys = this.nakymanLeveys || this.mittaaNakyma();
    if (!leveys || leveys < NAKYMAN_VAHIMMAISLEVEYS) return;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    /*
     * Sama haarautuma kuin CSS:n media queryissä, mutta TODELLISESTA
     * mitasta laskettuna: kapea ruutu (<700) saa arkin koko ruudun
     * levyisenä, leveä 100vw − 6rem katolla 960 px. Myös max-width
     * kirjoitetaan: jumiutunut viewportti voi pitää puhelimen
     * 100vw-katon voimassa, ja pelkkä width jäisi sen alle.
     */
    const px = leveys < 700
      ? `${leveys}px`
      : `${Math.min(Math.round(leveys - 6 * rem), 960)}px`;
    dialog.style.width = px;
    dialog.style.maxWidth = px;
    const kortti = dialog.querySelector('.dialog-card');
    if (kortti) {
      kortti.style.width = px;
      kortti.style.maxWidth = px;
    }
  }

  /**
   * Lue lisää -arkin leveys PIKSELEINÄ mitatusta näkymästä, samasta
   * syystä kuin mitoitaNahtavyysDialogi: WKWebView:n jämähtänyt
   * viewportti voi jättää CSS:n min-width-ehdon laukeamatta, jolloin
   * artikkeli jäi iPadilla puhelimen 620 pikselin kaistaksi
   * (omistajan kaappaus 18.8.2026, Schönbrunn). Sama mitta ja raja
   * kuin CSS:ssä (min(92 %, 860 px) 700 pikselistä alkaen); kapealla
   * ruudulla inline-mitat tyhjennetään ja CSS hoitaa asian ennallaan.
   * Myös max-width kirjoitetaan, koska .dialog- ja .wiki-card-
   * perussääntöjen 620 pikselin katto jäisi muuten voimaan.
   */
  mitoitaWikiDialogi() {
    const dialogi = this.wikiDialog;
    if (!dialogi) return;
    const mitta = this.mittaaNakyma() || 0;
    const px = mitta >= 700 ? `${Math.min(Math.round(mitta * 0.92), 860)}px` : '';
    dialogi.style.width = px;
    dialogi.style.maxWidth = px;
    const kortti = dialogi.querySelector('.wiki-card');
    if (kortti) kortti.style.maxWidth = px;
  }

  /** Asettelu uusiksi oikealla mitalla. Kutsutaan vain kun mitta on kelvollinen. */
  elvytaNakyma() {
    this.nakymaElvytyksia = (this.nakymaElvytyksia ?? 0) + 1;
    /*
     * Pakotettu asettelun luku. WKWebView jättää taustalta palatessa
     * vanhan mitan voimaan, kunnes joku sitä kysyy — tämä on se kysyjä.
     */
    void document.body.offsetWidth;
    /*
     * Viewport-metan uudelleenkirjoitus: WebKit laskee asettelu-
     * viewportin metasta, ja saman sisällön kirjoittaminen takaisin
     * pakottaa laskennan uusiksi. Vanhentuneeseen mittaan jumiutunut
     * viewportti (ks. mittaaNakyma) palaa tästä laitteen oikeaan
     * leveyteen — myös media queryt (palstat ≥ 700 px) näkevät sen.
     */
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) meta.setAttribute('content', meta.getAttribute('content'));
    this.kartta.fitViewBox();
    // Avoin nähtävyysjuttu mitoitetaan uusiksi samasta syystä kuin
    // lehti alla: vanhentunut viewportti oli voinut kaventaa sen.
    if (document.getElementById('nahtavyys-dialog')?.open) mitoitaNahtavyysDialogi(this);
    // Sama huolto Lue lisää -arkille (omistajan kaappaus 18.8.2026:
    // wiki-artikkeli kapeana kaistana iPadilla).
    if (this.wikiDialog?.open) this.mitoitaWikiDialogi();
    if (!this.arrivalDialog?.open) return;
    // Avoinna oleva lehti sivutetaan uudelleen: kortin leveys on nyt
    // oikea, joten palstat, kohdekartta ja käyrät piirtyvät sen mukaan.
    const kortti = this.arrivalDialog.querySelector('.dialog-card');
    const kohta = kortti?.scrollTop ?? 0;
    naytaTutkiSivu(this, this.lehtitila.tutkiSivu ?? tutkiEkaSivu(this), { heti: true });
    // Sivunvaihto vierittää alkuun; elvytys ei ole sivunvaihto, joten
    // lukukohta palautetaan.
    if (kortti) kortti.scrollTop = kohta;
  }

  /*
   * Aarteiden kuvat lämpimiksi ennen ensimmäistä paljastusta:
   * paljastuskortti on ruudulla vain pari sekuntia, eikä kylmä lataus
   * ehtisi siihen ikkunaan. Neljä pientä kuvaa per lauta (kolme
   * jalokiveä ja pääaarre) — maailmankartalla mannerkohtaiset tyypit
   * eli 7 × 4 pientä kuvaa. Halpa hinta siitä, että aarre NÄKYY.
   */
  esilataaAarrekuvat() {
    const ryhmat = [
      this.game.tokenTypes ?? {},
      ...Object.values(this.game.pack?.tokens?.mannerTypes ?? {}),
    ];
    const nahdyt = new Set();
    for (const tyypit of ryhmat) {
      for (const type of Object.values(tyypit)) {
        if (!type.kuva || nahdyt.has(type.kuva)) continue;
        nahdyt.add(type.kuva);
        const kuva = new Image();
        const [osoite, vara] = aarrekuvanOsoitteet(type.kuva);
        asetaKuva(kuva, osoite, vara);
      }
    }
  }

  /**
   * Kehittäjätilan kytkin.
   *
   * Tila näkyy versionumeron perässä ("v154 : kehittäjä", js/main.js).
   * Ensin siitä kertoi oma merkki kartan yläreunassa, mutta se oli
   * omistajan mielestä liian iso ele pienelle asetukselle — nurkan
   * numero on jo se paikka, josta pelin tila luetaan.
   */
  paivitaKehittajaTila() {
    // Kytkinten muisti ensin pois (js/ui-apurit.js unohdaKehittajaKytkimet):
    // savukevartijat kirjoittavat avaimen suoraan levylle ja kutsuvat
    // tämän tahdistimen, joten muistin on annettava periksi tässä.
    unohdaKehittajaKytkimet();
    this.kehittajaTila = kehittajaTilaPaalla();
    this.kehittajaMaailma = kehittajaMaailmaPaalla();
    /*
     * Kaupunkien valmiusvärit syntyvät laudan piirrossa (drawBoard),
     * joten kytkin jäisi ilman tätä näkymättömäksi seuraavaan laudan
     * vaihtoon asti. Tyhjä drawnPackId saa renderin piirtämään laudan
     * uusiksi samalla polulla kuin laudan vaihdossa.
     */
    this.drawnPackId = null;
    this.render();
  }

  /** Piirtää annetun laudan; vaelluksessa lauta vaihtuu porttien kautta. */
  drawBoardFor(pack) {
    this.drawnPackId = pack.id;
    this.svg.setAttribute('aria-label', pack.ariaLabel);
    this.svg.dataset.style = pack.style ?? 'map';
    document.body.dataset.pack = pack.id;
    // Lauta vaihtui: mahdollinen edellinen lähikuva puretaan, ja uudelle
    // mantereelle ajastetaan oma zoomaus kokonäkymän jälkeen.
    this.kartta.nollaaAloitusZoom();
    this.drawBoard();
    this.kartta.fitViewBox();
    this.kartta.ajastaMannerZoom();
  }

  destroy() {
    // Kuollut instanssi ei saa enää koskea jaettuun DOM:iin: sen
    // tapahtumakuuntelijat ja kesken olevat animaatioketjut jäävät elämään
    // uuden pelin rinnalle, ja ilman lippua ne piirtäisivät vanhan pelin
    // tilaa uuden päälle (esim. edellisen pelin kysymyksen tekstin).
    this.dead = true;
    // Ehdotuskuplan ajastin voi olla kymmenen minuutin päässä: uusi
    // peli ei saa periä vanhan instanssin kuplaa.
    clearTimeout(this.ehdotusKuplaAjastin);
    this.ehdotusKuplaAjastin = null;
    // Tarkkuusvahti on documentin kuuntelija: ilman purkua kuollut
    // instanssi jäisi tarkkailemaan näkyvyyttä uuden pelin rinnalle.
    if (this.tarkkuusVahti) {
      document.removeEventListener('visibilitychange', this.tarkkuusVahti);
      this.tarkkuusVahti = null;
    }
    // Kartan elevahti (kartta.js) on niin ikään documentin kuuntelija:
    // se päättää kesken jääneen raahauksen, kun sovellus menee taustalle.
    if (this.eleVahti) {
      document.removeEventListener('visibilitychange', this.eleVahti);
      this.eleVahti = null;
    }
    // Näkymän kokovahti kuuntelee ikkunaa ja dokumenttia — sama sääntö.
    if (this.nakymaVahti) {
      window.removeEventListener('resize', this.nakymaVahti);
      window.removeEventListener('orientationchange', this.nakymaVahti);
      window.removeEventListener('pageshow', this.nakymaVahti);
      document.removeEventListener('visibilitychange', this.nakymaVahti);
      window.visualViewport?.removeEventListener('resize', this.nakymaVahti);
      this.nakymaVahti = null;
    }
    clearTimeout(this.nakymaAjastin);
    // Paluun pakotettu uudelleenmitoitus kuuntelee dokumenttia ja
    // visualViewporttia — sama sääntö.
    if (this.mitoitusVahti) {
      document.removeEventListener('visibilitychange', this.mitoitusVahti);
      window.visualViewport?.removeEventListener('resize', this.mitoitusVahti);
      this.mitoitusVahti = null;
    }
    clearTimeout(this.mitoitusAjastin);
    // Taustapaluun sovitus kuuntelee dokumenttia ja ikkunaa — sama sääntö.
    if (this.paluuVahti) {
      document.removeEventListener('visibilitychange', this.paluuVahti);
      window.removeEventListener('pageshow', this.paluuVahti);
      this.paluuVahti = null;
    }
    // Peitevahti (dialogien close) on niin ikään dokumentin kuuntelija.
    if (this.peiteVahti) {
      document.removeEventListener('close', this.peiteVahti, true);
      this.peiteVahti = null;
    }
    // Visuaaliviewportin oikaisu kuuntelee visualViewporttia.
    if (this.oikaisuVahti) {
      window.visualViewport?.removeEventListener('resize', this.oikaisuVahti);
      window.visualViewport?.removeEventListener('scroll', this.oikaisuVahti);
      this.oikaisuVahti = null;
    }
    clearTimeout(this.oikaisuAjastin);
    // Tekstikenttävahti (focusout) on dokumentin kuuntelija.
    if (this.kenttaVahti) {
      document.removeEventListener('focusout', this.kenttaVahti, true);
      this.kenttaVahti = null;
    }
    // Paluun vakiintumissilmukka ei saa jatkua kuolleessa pelissä.
    clearTimeout(this.paluuAjastin);
    // Nipistyksen oma jumivahti (kartta.js ajastaNipistysVahti) ei saa
    // laueta kuolleessa pelissä.
    clearTimeout(this.nipistysVahtiAjastin);
    // Trackpadin eleen päättymisajastin (kartta.js ajastaRullanLoppu)
    // ei saa viimeistellä elettä kuolleessa pelissä.
    clearTimeout(this.rullanEleAjastin);
    /*
     * Eleen ajaksi piilotetut merkkikerrokset (kartta.js piilotaMerkit)
     * palautetaan tässä eikä ajastimen varassa: kuolleen pelin ajastin
     * ei laukea, ja runkoon jäänyt luokka piilottaisi seuraavan pelin
     * merkit heti alkuun.
     */
    clearTimeout(this.merkkiPaluuAjastin);
    this.merkkiPaluuAjastin = 0;
    this.merkitPiilossa = false;
    document.body.classList.remove('kartta-merkit-piilossa');
    // Lehden avauksen mittavarmistuksen jälkitarkistukset samoin.
    clearTimeout(this.lehtitila.lehtiMittaAjastin);
    clearTimeout(this.lehtitila.lehtiMittaJalkiajastin);
    // Pöllön vihjekupla ei saa ilmestyä kuolleen pelin ajastimesta.
    this.peruValintavihje();
    // Sama koskee ääriviivan asettumisen loppuajastinta.
    clearTimeout(this.aariviivaAjastin);
    /*
     * Maapilleri pois DOM:ista (omistajan kaappaus 13.8.2026: "Jordania
     * jäi maalehtipainikkeen taakse"). Pilleri on mapPanen suora lapsi
     * eikä kuulu kartan piirtoon, joten uusi peli ei pyyhi sitä muun
     * mukana — ilman tätä vanhan pelin maa jää kummittelemaan uuden
     * pillerin alle.
     */
    this.maaPilleri?.remove();
    this.maaPilleri = null;
    // Sama koskee alanappirivin liukua sulkevaa karttanapautusta.
    if (this.liukuKuuntelija) {
      document.removeEventListener('pointerdown', this.liukuKuuntelija);
      this.liukuKuuntelija = null;
    }
    // Puskurirenkaan jono elää joutohetkien varassa: ilman perumista se
    // piirtäisi kuolleen pelin ruutuja uuden kartan päälle.
    this.peruutaRengas();
    // Kerran jäsennetty taidelähde ja pohjataso irti: lähteen kuva on
    // laudan raskain yksittäinen muistinvaraus, eikä kuolleen pelin
    // pidä pitää sitä hengissä uuden rinnalla.
    this.vapautaPohja();
    this.taideLahde = null;
    stopPlaceStream();
    stopQuizMusic();
    sfx.stopFlight();
    stopIntroVoice(this);
    stopDiaryVoice(this);
    // Uusi peli vaientaa myös sivujen luennan: se on documentin
    // ulkopuolinen puhuja eikä lopu itsestään pelin vaihtuessa.
    pysaytaLukija();
    this.suljePostikortti();
    this.suljeKulttuuriKuva();
    this.pysaytaKulttuuriAani();
    // Kesken jäänyt lentokalvo siivotaan, ettei se jää uuden pelin päälle.
    // Sama kartalennolle: lippu pidättelee kamera-ajoja ja annosteluvirtaa,
    // joten kesken katkennut lento lamauttaisi seuraavan pelin.
    document.body.classList.remove('flight-active', 'kartalento');
    // Arkin alle piilotettu lauta takaisin näkyviin: pystyyn jäädessään
    // luokka jättäisi uuden pelin kartan näkymättömäksi.
    document.body.classList.remove('lauta-arkin-alla', 'aloitusverho-paalla');
    this.aloituslentoKesken = false;
    // Sama silta alas: ilman tätä kesken katkennut avaus jättäisi
    // uuden pelin äänimaisemaksi lentokoneen kabiinin (ks. syncAmbience).
    this.lennonAmbienssi = false;
    // Sama jalkamatkan matkaäänelle (#96): kesken katkennut siirto
    // jättäisi muuten metsätuulen soimaan uuden pelin kaupunkiin.
    this.jalkamatkanAani = false;
    // Radiotila piilottaa matkakirjan ja alanapit; ilman purkua ne
    // jäisivät piiloon uudessa pelissä.
    document.body.classList.remove('radio-tila');
    for (const kalvo of document.querySelectorAll('.flight-overlay')) kalvo.remove();
    this.suljeAloitusportti();
    clearTimeout(this.botTimer);
    clearTimeout(this.lentoPuheAjastin);
    clearTimeout(this.lentoTekstiAjastin);
    clearTimeout(this.zoomAlkuAjastin);
    clearTimeout(this.zoomTaustaAjastin);
    // Ajastettu tarkkuustarkistus rasteroisi kuolleen pelin karttaa.
    clearTimeout(this.tarkkuusAjastin);
    if (this.previewFrame) cancelAnimationFrame(this.previewFrame);
    for (const timer of Object.values(this.typeTimers ?? {})) clearTimeout(timer);
    stopQuizTimer(this);
    for (const lappu of this.taustaLaput ?? []) lappu.removeEventListener('click', this.lappuTausta);
    for (const lappu of this.peruutusLaput ?? []) lappu.removeEventListener('cancel', this.lappuPeruutus);
    // Nipistyksen kuuntelijat pois: ne ovat paneelissa, joka jää eloon.
    for (const [nimi, kasittele] of this.nipistysKuuntelijat ?? []) {
      this.mapPane?.removeEventListener(nimi, kasittele, { passive: false });
    }
    this.nipistysKuuntelijat = [];
    // Linssin kuuntelijat ovat documentissa ja ylärivissä, jotka jäävät
    // eloon uuden pelin ajaksi.
    for (const [kohde, nimi, kasittele] of this.linssiKuuntelijat ?? []) {
      kohde.removeEventListener(nimi, kasittele);
    }
    this.linssiKuuntelijat = [];
    /*
     * Kuollut käyttöliittymä luopuu linssistään: sammutus vapauttaa
     * rasterin blob-osoitteen (10,4 Mt kerrallaan) ja body-luokat.
     * Kerroksen hakija tarkistaa dead-lipun, joten tämä ei voi tyhjentää
     * uuden pelin kerrosta, vaikka uusi peli ehtisi jo alkaa.
     */
    this.linssiTuki?.moottori?.sammuta();
    // Soitin elää document.bodyssä eikä laudassa, joten se jäisi
    // ruutuun ja soimaan uuden pelin päälle.
    this.radioModuuli?.pois();
    this.linssiSelite?.remove();
    this.linssiSelite = null;
    if (this.linssiKotelo) this.linssiKotelo.hidden = true;
    this.observer?.disconnect();
  }

  /**
   * Lapun kevyin poistumistie taustanapautukselle ja Esc:lle: takaisin
   * karttanäkymään. Tietovisassa sulkeminen on kysymyksestä luopumista —
   * pulma palaa taskuun, muu kysymys päättää vuoron vastaamatta.
   * Rosvon kaksintaistelusta ei karata taustaa napauttamalla.
   */
  suljeLappu(lappu) {
    const { game } = this;
    if (lappu === this.quizDialog) {
      if (this.busy) return;
      if (game.phase === 'duel') {
        const duel = game.duel;
        if (duel && duel.chosen !== null && this.revealShownFor === duel) {
          sfx.play('paper');
          this.doAction(() => game.closeDuel());
        }
        return;
      }
      if (game.phase !== 'quiz' || !game.quiz) return;
      // Tuomion paljastus on kesken — tulos ei saa jäädä näkemättä.
      if (game.quiz.chosen !== null && this.revealShownFor !== game.quiz) return;
      sfx.play('paper');
      this.doAction(() => game.closeQuiz());
      return;
    }
    // Saapumis- ja tapahtumalaput vievät pelitilaa eteenpäin, joten
    // taustanapautus painaa niiden omaa jatkonappia.
    if (lappu === this.eventDialog) {
      document.getElementById('event-ok').click();
      return;
    }
    if (lappu === this.arrivalDialog) {
      document.getElementById('arrival-no').click();
      return;
    }
    sfx.play('paper');
    lappu.close();
  }

  /**
   * Muuttaa kartan staattisen taiteen yhdeksi kuvaksi.
   *
   * Rajaus on pergamentin koko eikä laudan: paperi jatkuu reunojen yli,
   * ja lähikuvassa panoroidaan sinne. Jos rajaisi laudan mukaan, reunan
   * takaa paljastuisi tyhjää.
   *
   * Kutsu ei odota tulosta. Kartta näkyy heti vektoreina ja vaihtuu
   * kuvaksi kun se on valmis; jos vaihto ei onnistu, vektorit jäävät.
   */
  rasteroiTaide(ryhma) {
    /*
     * Taide sarjallistetaan KERRAN ja tyylit kirjoitetaan elementteihin.
     *
     * Irrallinen SVG ei peri sivun tyylitiedostoa: säännöt on kirjoitettu
     * sivun rakennetta vasten (`#board`, `body...`), eikä kuvassa ole
     * bodya. Ilman tätä kartasta tulisi musta paperi mustine
     * mantereineen.
     *
     * Sarjallistus kerran on nopeuden kannalta olennaista: jokainen
     * ruutu tehdään samasta tekstistä, ja 6500 elementin läpikäynti
     * ruutua kohti maksaisi enemmän kuin itse piirto.
     */
    this.taideRyhma = ryhma;
    /*
     * Pilkottu taide, jos se onnistuu; muuten yksi teksti kuten ennen.
     *
     * Pilkkominen tarvitsee elävän puun mitat, ja se on tehtävä NYT —
     * vektorit poistetaan heti kun ensimmäiset ruudut ovat valmiit.
     * Varareitti ei ole muodollisuus: pilkkominen palauttaa nullin, jos
     * kloonin ja elävän puun rakenne ei täsmää, ja silloin kartta
     * piirtyy hitaammin mutta oikein.
     */
    const tyylitelty = tyylitSisaan(ryhma);
    const maarittelyt = this.svg.querySelector('defs');
    this.taide = pilkoTaide(tyylitelty, ryhma, maarittelyt,
      { leveys: this.kartta.kiertava() ? this.game.pack.map.width : 0 })
      ?? valmisteleTaide(tyylitelty, maarittelyt);
    this.taideRuudut = new Map();
    this.taideTyhjat = new Set();
    this.taideSkaala = 0;
    this.taideRuutu = 0;
    this.taideRengas = null;
    this.taideVektorit = ryhma.firstElementChild ? [...ryhma.children] : [];
    /*
     * Kerran jäsennetty taidelähde ja pyramidin pohjataso.
     *
     * Ruudut leikataan lähteestä drawImagella eikä SVG:tä jäsennetä
     * enää ruutu kerrallaan — se oli mitattuna ruudun kallein vaihe
     * (WebKit 169 ms + peittävyysluku 230 ms + pakkaus 196 ms per
     * ruutu; lähteestä leikattuna 5,6 ms per ruutu, ks. js/mapart.js
     * avaaTaidelahde). Lähteen jäsennys maksaa kerran (WebKit ~0,9 s).
     * Sen valmistuttua käynnistyvät rinnakkain ruutusarja ja koko
     * laudan karkea pohjataso; pohja asettuu kaiken alle ja takaa,
     * että ele piirtää aina valmista bittikarttaa, vaikka tarkat
     * ruudut puuttuisivat.
     */
    this.vapautaPohja();
    this.taideLahde = null;
    this.taideLahdeTulossa = true;
    // Edellisen laudan lykätty työ ei koskaan enää kelpaa.
    this.taideLahdeLykatty = null;
    this.taideAtlasOdottaa = false;
    this.taideLuotu = performance.now();
    this.pohjaValmisMs = null;
    /*
     * Pohjan tarkkuus tiedetään jo ennen kuin pohja on rakennettu
     * (pelkkää geometriaa), ja sillä tiedolla yleiskuva voi odottaa
     * pohjaa sen sijaan, että rakentaisi ison ruutusarjan, jonka pohja
     * heti korvaa — maailmankartan yleiskuva on yli sata ruutua
     * paperia ja merta.
     */
    this.pohjaTulossa = true;
    this.pohjaTehoOdotus = pohjanMitat(this.game.pack.map).teho;
    const taide = this.taide;
    const kaynnistaLahde = () => {
      if (this.dead || this.taide !== taide) return;
      avaaTaidelahde(taide, this.game.pack.map).then((lahde) => {
        if (this.dead || this.taide !== taide) return;
        this.taideLahde = lahde;
        this.taideLahdeTulossa = false;
        // Ilman lähdettä ei tule pohjaakaan — lippu alas ENNEN
        // täydennystä, ettei yleiskuva jää odottamaan pohjaa ikuisesti.
        if (!lahde) this.pohjaTulossa = false;
        // Ruutusarja odotti lähdettä (ks. taydennaTaide); nyt se saa alkaa.
        // Pohjatasoa EI odoteta: sen pakkaus vie ison laudan kokoisena
        // sekunteja (mitattu Chromium ~5 s), ja ruudut blokkaava odotus
        // piti koko kartan vektoreina sen ajan.
        this.taydennaTaide();
        if (!lahde) return;
        rasteroiPohja(lahde, this.game.pack.map).then((pohja) => {
          if (this.dead || this.taide !== taide) return;
          this.pohjaTulossa = false;
          if (!pohja) { this.taydennaTaide(); return; }
          /*
           * Pohja OMAAN ryhmäänsä taideRyhmän EDELLE, ei taideRyhmän
           * sisään: uudet ruudut lisätään taideRyhmän alkuun
           * (insertBefore firstChild), joten ryhmän sisällä pohja
           * valuisi ruutujen PÄÄLLE heti ensimmäisen ruudun tullessa.
           * Edeltävänä sisaruksena se on aina kaiken tarkan alla, ja
           * kiertävän kartan <use>-kopio monistaa sen siinä missä
           * muunkin juuriryhmän sisällön.
           */
          const ryhmaPohjalle = el('g', { class: 'taide-pohja' });
          this.taideRyhma.parentElement?.insertBefore(ryhmaPohjalle, this.taideRyhma);
          ryhmaPohjalle.appendChild(pohja.kuva);
          this.pohjaRyhma = ryhmaPohjalle;
          this.taidePohja = pohja.kuva;
          this.pohjaTeho = pohja.teho;
          // Aika laudan luonnista koko laudan kattavaan bittikarttaan —
          // savuke vartioi tätä (tools/savuke-kartan-sujuvuus.mjs).
          this.pohjaValmisMs = performance.now() - this.taideLuotu;
          // Raskas vektorikerros pois HETI: pohja kattaa koko laudan,
          // eikä poisto odota ruutusarjaa, jonka raskaat vektorikehykset
          // itse pitäisivät ikuisesti kesken (ks. poistaVektorit).
          this.poistaVektorit();
          // Yleiskuvassa pohja korvaa ruudut (ks. taydennaTaide), joten
          // näkymä saa tilaisuuden vapauttaa ne heti.
          this.taydennaTaide();
        });
      });
    };
    /*
     * BITTIKARTTAPUTKI EI KÄYNNISTY PIILOTETULLE LAUDALLE (omistajan
     * kysymys 25.8.2026, ks. vanhaLautaPiilossa). Atlasnäkymässä
     * lauta on display: none, eikä sen lähdettä ja pohjatasoa — koko
     * laudan kokoinen bittikartta, mitattuna sekuntien työ — kannata
     * rakentaa kuvalle, jota kukaan ei näe.
     *
     * AVAUSLENTO EI OLE ESTE, vaikka sekin piirtyy kartan päälle.
     * Kokeiltiin ja mitattiin: lennon aikana lykätty putki tarkoittaa,
     * että laudan 7000 vektorielementtiä jäävät elävään puuhun koko
     * lennon ajaksi, ja lähikuvassa niiden tyyli- ja maalauskierros
     * maksaa Chromiumissa 1,6 sekuntia JOKA KEHYS — kirjoituskone
     * naputti sanan 1,6 sekunnin välein ja kone olisi nytkähdellyt
     * samaan tahtiin. Juuri pohjataso on se, joka päästää vektorit
     * pois (poistaVektorit), joten lennolla se on tehtävä eikä
     * lykättävä.
     *
     * EIKÄ PIILOTUS RIITÄ SYYKSI LYKÄTÄ (mitattu 25.8.2026, ilta).
     * Kun vanha lauta otettiin lennostakin pois näkyvistä, olisi
     * ollut houkuttelevaa jättää koko putki tekemättä — mutta
     * vektorit ovat samassa .staattinen-ryhmässä, ja Chromium maksaa
     * niistä myös display: none -tilassa: nipistyksessä pudonneita
     * kehyksiä 3,2 % → 15,3 %. Putki siis ajetaan kerran laudan
     * syntyessä (ennen kuin atlas ehtii peittää sen), ja vasta
     * TOISTUVA työ eli tarkkojen ruutujen sarja jää tekemättä
     * (taydennaTaide, taideAtlasOdottaa).
     *
     * Työ ei katoa vaan odottaa: jatkaLykattyPiirto käynnistää sen heti
     * kun lauta palaa näkyviin.
     */
    if (this.piirtoLykkaantyy()) this.taideLahdeLykatty = kaynnistaLahde;
    else kaynnistaLahde();
    // Ensimmäinen piirto vasta seuraavalla kehyksellä: laudan
    // luontihetkellä viewBox on vielä oletusarvoinen eikä paneelin koko
    // ole tiedossa.
    requestAnimationFrame(() => this.taydennaTaide());
    this.vahdiTarkkuutta();
  }

  /**
   * Onko laudan bittikartalla juuri nyt katsojaa? Ks. rasteroiTaide.
   */
  piirtoLykkaantyy() {
    return this.vanhaLautaPiilossa();
  }

  /**
   * Käynnistää lykätyn bittikarttatyön, kun este on poistunut.
   *
   * Kutsutaan kahdesta paikasta: avauslennon päättyessä ja siitä
   * kohdasta, joka poistaa atlaksen piilotusluokan (js/fokuskartta.js
   * paivitaVanhaLauta). Molemmat voivat tulla silloinkin, kun toinen
   * este on yhä voimassa — siksi ehto tarkistetaan tässä eikä
   * kutsujassa.
   */
  jatkaLykattyPiirto() {
    if (this.dead || this.piirtoLykkaantyy()) return;
    const lykatty = this.taideLahdeLykatty;
    if (lykatty) {
      this.taideLahdeLykatty = null;
      lykatty();
    }
    if (this.taideAtlasOdottaa) {
      this.taideAtlasOdottaa = false;
      this.taydennaTaide({ heti: true });
    }
  }

  /** Poistaa pohjatason ja vapauttaa sen blob-osoitteen. */
  vapautaPohja() {
    if (this.taidePohja?.dataset?.osoite) URL.revokeObjectURL(this.taidePohja.dataset.osoite);
    this.pohjaRyhma?.remove();
    this.pohjaRyhma = null;
    this.taidePohja = null;
    this.pohjaTeho = 0;
    this.pohjaTulossa = false;
  }

  /**
   * Piirtotarkkuus tälle näkymälle myös ennen ensimmäistä ruutusarjaa.
   * Sarja tallettaa arvon taideTarkkuuteen; sitä ennen se lasketaan
   * paneelista samalla kaavalla kuin sarja laskisi.
   */
  nykyinenTarkkuus() {
    if (this.taideTarkkuus) return this.taideTarkkuus;
    const pane = this.mapPane;
    return piirtotarkkuus(pane?.clientWidth ?? 400, pane?.clientHeight ?? 800);
  }

  /**
   * Turvaverkko sumealle kartalle (omistajan havainto 7.8.2026:
   * *"kartta näkyy pehmeänä sen jälkeen kun peli päivittyy
   * automaattisesti uuteen versioon"* — ja korjautuu, kun zoomaa ulos
   * ja takaisin).
   *
   * Ruudut piirretään sillä mittakaavalla, joka kartalla oli
   * rasterointihetkellä, ja uusi sarja pyydetään vasta kun mittakaava
   * muuttuu yli viidenneksen. Jos ensimmäinen rasterointi osuu
   * hetkeen, jolloin näkymä ei ole vielä lopullinen — päivityksen
   * jälkeinen lataus voi tapahtua taustavälilehdessä, jossa
   * requestAnimationFrame ei laukea — ruudut jäävät väärän tarkkuisiksi
   * eikä mikään pyydä niitä uudestaan. Kartta näyttää venytetyltä.
   *
   * Tämä vahti vertaa ruutujen mittakaavaa siihen, mikä kartalla
   * oikeasti on. Kynnys on tiukempi kuin täydennyksen oma (2 % eikä
   * 20 %), koska tässä ei olla kesken eleen: pieni ero tarkoittaa juuri
   * sitä väärää tarkkuutta.
   *
   * JUURISYY LÖYTYI 13.8.2026 (omistaja: "kartta on kauttaaltaan sumea
   * ilman avointa ikkunaa"). Kesken jäänyt peli palautetaan latauksessa,
   * ja mountissa tapahtuu tämä järjestys:
   *
   *   fitViewBox  → mittakaava A → requestAnimationFrame rasteroi A:lla
   *   ResizeObserver laukeaa heti observen jälkeen
   *   fitViewBox  → mittakaava B (alakaista korteille muuttaa korkeutta)
   *
   * Mitattuna A oli 0,805 ja B 0,886 eli ero 10 %. taydennaTaide sietää
   * viidenneksen, joten se EI pyytänyt uutta sarjaa — ja koska
   * yleiskuvassa ei panoroida, mikään ei pyytänyt sitä myöhemminkään.
   * Kartta jäi venytetyksi ensimmäiseen kaupunginvaihtoon asti. Sama
   * toistuu jokaisella latauksella, ei vain päivityksen jälkeen.
   *
   * Siksi tarkistus ei enää odota välilehden paluuta vaan ajetaan aina
   * kun näkymä on asettunut (fitViewBox ajastaa sen). Ajastin on siksi,
   * ettei ikkunan raahaaminen rasteroisi joka pikselillä.
   */
  vahdiTarkkuutta() {
    if (this.tarkkuusVahti) return;
    this.tarkkuusVahti = () => {
      if (document.visibilityState !== 'visible') return;
      this.tarkistaTarkkuus();
    };
    document.addEventListener('visibilitychange', this.tarkkuusVahti);
  }

  /**
   * Vastaako rasteroitu mittakaava sitä, jolla kartta oikeasti
   * piirretään? Jos ei, koko sarja pyydetään uudestaan.
   *
   * TÖKKIMINEN v607:SSÄ (omistaja 13.8.2026: "kartta tökkii, vieritys
   * nykii"). Ensimmäinen versio tästä vahdista tarkisti 350 ms jokaisen
   * fitViewBoxin jälkeen ja SIIRSI tarkistuksen eteenpäin, jos ele oli
   * kesken. Mitattuna (tools/savuke-kartan-sujuvuus.mjs):
   *
   *   nipistys 1,15x → PAKOTETTU uudelleenrasterointi, suhde 1,150
   *   nipistys 0,90x → PAKOTETTU uudelleenrasterointi, suhde 0,900
   *   yksi ele, jonka aikana ikkuna eli → 5 tarkistusta samassa eleessä
   *
   * Kaksi vikaa. Ensinnäkin kynnys (2 %) on tiukempi kuin
   * taydennaTaiden oma sietoraja (20 %), joten JOKAINEN nipistys
   * portaiden välistä pakotti koko ruutusarjan piirrettäväksi
   * uudestaan — työtä, jonka taydennaTaide oli tarkoituksella jättänyt
   * tekemättä juuri siksi, että se tökkii. Toiseksi rasterointi osui
   * hetkeen, jossa sormi oli yhä kartalla: 350 ms on eleiden VÄLI eikä
   * eleen jälkeinen tauko, ja siirretty tarkistus laukesi heti kun
   * sormi hetkeksi pysähtyi. Pahimmillaan se nollasi taideSkaalan
   * kesken käynnissä olevan piirtosarjan, jolloin sarja katkesi
   * (skaala !== this.taideSkaala) ja työ tehtiin kahteen kertaan.
   *
   * Nyt tarkistus vaatii TODELLISEN levon: TARKKUUS_LEPO_MS ilman
   * yhtäkään kartan elettä, ilman raahausta, lentoa ja zoomiliukua
   * eikä kesken piirtosarjan. Latauksen jälkeinen ensitarkistus — se
   * joka korjaa mountin 10 %:n virheen — ei odota mitään, koska
   * silloin ei ole vielä ollut yhtään elettä (kartanEleHetki puuttuu).
   */
  tarkistaTarkkuus() {
    if (this.dead) return;
    /*
     * JUMIVAHTI ENNEN RASTEROINNIN EHTOJA (mitattu 27.8.2026).
     *
     * eleKesken on kaksi asiaa yhdessä: kysymys "onko ele kesken" ja
     * VAHTI, joka purkaa jumiin jääneen eleen. Vahtiin päästiin
     * kuitenkin vasta tarkkuusOdotuksen kautta — eli vasta kolmen
     * rasterointiehdon takaa, jotka eivät liity eleisiin lainkaan.
     * Fokusnäkymässä molemmat portit ovat kiinni: `taideSkaala` on 0
     * (vanhaa lautaa ei ole rasteroitu kertaakaan) ja
     * `vanhaLautaPiilossa()` on tosi (atlas peittää laudan). Mitattuna
     * (Chromium, iPad-ikkuna, nipistys ilman touchendiä, kartanEleHetki
     * kuusi sekuntia vanha):
     *
     *   tarkistaTarkkuus()  →  scale(0.4) jäi voimaan, kartanRaahaus jäi
     *   eleKesken()  suoraan →  muunnos palautui, kartanRaahaus laski
     *
     * Pystyyn jäänyt lippu jäädyttää kartan piirron lopuksi istunnoksi
     * (ks. eleKesken) ja kesken jäänyt nipistys tappaa panoroinnin
     * kokonaan — juuri se "välillä kartta ei liiku" -kokemus. Vahti
     * kuuluu siis ennen portteja: se ei tee mitään, ellei ele ole
     * ollut hiljaa yli rajan.
     */
    this.eleKesken();
    if (!this.taide || !this.taideSkaala) return;
    /*
     * Piilotetun laudan tarkkuudella ei ole katsojaa (ks.
     * vanhaLautaPiilossa). Tarkistus ei siirry ajastimelle vaan jää
     * odottamaan paluuta näkymästä: silloin sarja pyydetään joka
     * tapauksessa uusiksi (jatkaVanhanLaudanPiirto).
     */
    if (this.vanhaLautaPiilossa()) { this.taideAtlasOdottaa = true; return; }
    /*
     * Tarkistus SIIRTYY eikä peruunnu: muuten kartta voisi jäädä
     * sumeaksi vain siksi, että ajastin sattui osumaan eleen kohdalle.
     * Jokainen odotuksen syy päättyy, ja päättyessään ajastin laukeaa.
     */
    const odotus = this.tarkkuusOdotus();
    if (odotus > 0) { this.ajastaTarkkuustarkistus(odotus); return; }
    /*
     * KESKEN JÄÄNYT RUUTUSARJA JATKUU LEVOSSA.
     *
     * Sarja katkeaa aina, kun ele alkaa kesken piirron (taideOdottaa),
     * ja normaalisti sen jatkaa sormen irrotus (kartta.js
     * jatkaKeskenJaanyt). Kun sovellus vaihtuu kesken eleen,
     * irrotusta ei tule — eikä siis mitään, mikä jatkaisi sarjaa.
     * Näkyvälle alueelle jää se kaistale, jonka ruudut eivät ehtineet
     * valmistua, ja siinä näkyy pelkkä pergamentin pohjakerros:
     * vaalea pystykaista siinä reunassa, johon sarja jäi kesken
     * (omistajan kuvakaappaus iPadilta 17.8.2026).
     *
     * Tässä kohdassa eikä vahdissa, koska tämä on se piste, joka
     * ajastaa itsensä uudelleen niin kauan kuin ele on kesken
     * (tarkkuusOdotus yllä). Taustapaluu herättää vahdin, vahti
     * tämän — ja jos ele on vielä pystyssä, jatko tapahtuu heti kun
     * se laskee.
     */
    if (this.taideOdottaa && !this.taidePiirtyy) this.taydennaTaide({ heti: true });
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    const suhde = nakyva.skaala / this.taideSkaala;
    if (suhde <= 1.02 && suhde >= 0.98) return;
    // Nollaus pakottaa uuden sarjan: taydennaTaide vertaa tähän.
    this.taideSkaala = 0;
    this.taydennaTaide({ heti: true });
  }

  /**
   * Onko kartalla ele kesken juuri nyt? Rasterointi ei saa alkaa
   * silloin: se vie satoja millisekunteja pääsäikeessä.
   *
   * Osoittimen alhaalla olo on omana ehtonaan eikä kartanRaahauksen
   * varassa: raahauslippu syttyy vasta kuuden pikselin kynnyksen
   * jälkeen ja nipistys 24 pikselin jälkeen, joten pelkkä sormi
   * kartalla — juuri se hetki, jolloin ele on alkamassa — ei muuten
   * estäisi rasterointia lainkaan.
   */
  eleKesken() {
    /*
     * Jumiin jäänyt ele ei saa pysäyttää piirtoa ikuisesti.
     * Sormi ei ole ruudulla viittä sekuntia liikkumatta; jos lippu on
     * sen jälkeen yhä pystyssä, tapahtuma on jäänyt saapumatta
     * (ikkunanvaihto, selaimen oma ele) ja lippu lasketaan alas.
     *
     * MOLEMMAT LIPUT, EI VAIN OSOITINLIPPU (omistajan kuvakaappaus
     * iPadilta 17.8.2026: kartan vasempaan reunaan jää vaalea
     * pystykaista, kun käy toisessa sovelluksessa ja palaa).
     *
     * Vahti kirjoitettiin osoitinlipulle, mutta paluuarvo lukee
     * MYÖS raahauslipun — ja juuri se jää jumiin, kun sovellus
     * vaihtuu kesken pyyhkäisyn: kartta.js laskee kartanRaahauksen
     * vasta pointerup/pointercancel-tapahtumasta, eikä iOS toimita
     * kumpaakaan taustalle jääneelle webapille. Mitattuna
     * (Chromium, hylätty raahaus + taustapaluu): osoitinKartalla
     * palautui itsestään viidessä sekunnissa, kartanRaahaus jäi
     * pystyyn loputtomiin.
     *
     * Pystyyn jäänyt raahauslippu jäädyttää KOKO kartan piirron
     * lopuksi istunnoksi: taydennaTaide palaa heti (kartanRaahaus
     * && !heti), puskurirengas lykkää itseään joutohetkestä toiseen,
     * tarkkuusvahti ei pääse koskaan lepoon eivätkä maastonimet
     * päivity. Näkyvälle alueelle jäävät ne ruudut jotka ehtivät
     * valmistua, ja lopun peittää pelkkä pergamentin pohjakerros —
     * vaalea pystykaista siinä reunassa, johon sarja jäi kesken.
     *
     * Liuku pitää raahauslippua pystyssä tahallaan (ks. kartta.js
     * pysaytaLiuku), mutta liuku sammuu alle kahdessa sekunnissa ja
     * jokainen kosketus virkistää kartanEleHetken — viiden sekunnin
     * hiljaisuus ei osu yhteenkään elävään eleeseen.
     */
    if ((this.osoitinKartalla || this.kartanRaahaus)
        && performance.now() - (this.kartanEleHetki ?? 0) > TARKKUUS_JUMI_MS) {
      /*
       * Jumiin jäänyt NIPISTYS puretaan samalla (18.8.2026, v884:n
       * kuvakaappaus): pelkkä lippujen lasku ei riitä, koska kesken
       * jääneen nipistyksen scale-muunnos jää svg:hen ja panorointi
       * nipistystilan taakse — kartta näyttää pienennetyltä ja
       * siirtyneeltä lopun istuntoa. Hylkäys palauttaa eleen
       * edeltävän geometrian (ks. kartta.js hylkaaNipistys).
       */
      this.kartta?.hylkaaNipistys?.();
      this.osoitinKartalla = false;
      if (this.kartanRaahaus) {
        this.kartanRaahaus = false;
        // Luokka syttyi saman eleen mukana; ilman poistoa kartan
        // sykähdykset jäisivät sammuksiin lopuksi istunnoksi.
        document.body.classList.remove('kartta-raahaus');
        // Kesken jäänyt sarja saa jatkua heti, ei vasta seuraavasta
        // eleestä: juuri se kaista on nyt piirtämättä.
        this.taideOdottaa = true;
      }
      /*
       * Eleen ajaksi piilotetut merkkikerrokset (kartta.js
       * piilotaMerkit) palaavat samalla: jumiin jäänyt ele ei saa
       * jättää karttaa merkittömäksi lopuksi istunnoksi — merkit ovat
       * napautuskohteita.
       */
      if (this.merkitPiilossa) {
        this.kartta?.naytaMerkit?.(true);
        document.body.classList.remove('kartta-merkit-piilossa');
        this.merkitPiilossa = false;
      }
    }
    return Boolean(this.osoitinKartalla || this.kartanRaahaus);
  }

  /**
   * Kuinka monta millisekuntia tarkistuksen on vielä odotettava.
   * Nolla tarkoittaa, että ruutu on rauhassa ja työ saa alkaa.
   */
  tarkkuusOdotus() {
    if (this.eleKesken()
        || this.taidePiirtyy
        || document.body.classList.contains('flight-active')
        || document.body.classList.contains('zoom-kaynnissa')) return TARKKUUS_LEPO_MS;
    const kulunut = performance.now() - (this.kartanEleHetki ?? -Infinity);
    return kulunut < TARKKUUS_LEPO_MS ? Math.ceil(TARKKUUS_LEPO_MS - kulunut) : 0;
  }

  /**
   * Kartan ele juuri nyt: lepolaskuri alkaa alusta.
   *
   * Kutsutaan jokaisesta kohdasta, jossa käyttäjä käsittelee karttaa —
   * sormi, rulla ja zoomipainikkeet. Pelkkä hiiren liike kartan päällä
   * EI ole ele: työpöydällä osoitin voi levätä kartalla loputtomiin,
   * eikä tarkistus saa siitä jäädä tekemättä.
   */
  merkitseKartanEle() {
    this.kartanEleHetki = performance.now();
  }

  /**
   * Sama tarkistus, mutta vasta kun näkymä on lakannut muuttumasta.
   * fitViewBox voi laueta monta kertaa peräkkäin (ResizeObserver,
   * ikkunan raahaus, näppäimistön avautuminen), ja jokainen niistä
   * saisi muuten oman rasterointinsa. Ajastin kuittaa ne yhdeksi:
   * yksi asettuminen, korkeintaan yksi tarkistus.
   */
  ajastaTarkkuustarkistus(viive = TARKKUUS_ENSI_MS) {
    clearTimeout(this.tarkkuusAjastin);
    this.tarkkuusAjastin = setTimeout(() => this.tarkistaTarkkuus(), viive);
  }

  /**
   * Näkyvä alue laudan koordinaatteina.
   *
   * Luvut luetaan ruudulta eikä zoomimuuttujista: this.zoomSkaala on
   * olemassa vain lähikuvassa, ja yleiskuvassa se on nolla. viewBox ja
   * elementin oma koko ovat olemassa aina.
   */
  nakyvaAlue() {
    /*
     * KARTTARUUTU, EI SIIRTOKUORI (wrapper-siirto 26.8.2026). Kuori on
     * ruudun kokoinen mutta liikkuu kartan mukana, joten siitä luettu
     * laatikko kertoisi aina "koko lauta näkyy" — näkyvä alue on se
     * pala, jonka PAIKALLAAN pysyvä ruutu paljastaa.
     */
    const pane = this.mapPane;
    if (!pane) return null;
    const vb = this.svg.viewBox?.baseVal;
    if (!vb?.width) return null;
    /*
     * RUUDUN LAATIKOT LUETAAN KERRAN TEHTÄVÄÄ KOHTI (mitattu 28.8.2026,
     * saapuminen uuteen maahan, 4x kuristus).
     *
     * Tätä kutsutaan yhden piirron aikana yli kolmekymmentä kertaa —
     * fokusmerkit, kohteet, mittajana, atlas, sumuverho — ja jokainen
     * kutsu lukee kaksi getBoundingClientRectia. Koska piirto myös
     * KIRJOITTAA DOMiin kutsujen välissä, jokainen luku pakotti tuoreen
     * tyylilaskennan: jäljityksessä yhdessä kehyksessä 47 kertaa
     * UpdateLayoutTree ja 41 kertaa Layout, yhteensä 725 ms + 214 ms.
     * Se on klassinen asettelupiiska (layout thrashing).
     *
     * MUISTI KESTÄÄ YHDEN TEHTÄVÄN — JA VAIN NIIN KAUAN KUIN KARTTA
     * PYSYY PAIKALLAAN. v1223 luotti pelkkään tehtävärajaan sillä
     * oletuksella, että "yhden synkronisen tehtävän sisällä kartan RUUTU
     * ei liiku". Oletus oli VÄÄRÄ, ja juuri kamera-ajo rikkoi sen
     * (omistajan laitepalaute: *"Ateenasta Sofiaan kartta liikkuu
     * oudosti sivusuunnassa"*). js/kartta.js ajaKamera lukee näkymän
     * KAHDESTI samassa tehtävässä — ennen ja jälkeen fitViewBoxin — ja
     * fitViewBox kirjoittaa niiden VÄLISSÄ sekä SVG:n omat mitat
     * (sovitaMannerZoom: svg.style.width/height) että siirtokuoren
     * muunnoksen (asetaPan: kuori.style.transform). Molemmat siirtävät
     * `svg.getBoundingClientRect()`ia, joten ajon MAALI laskettiin
     * vanhoista laatikoista uuden viewBoxin kanssa. Mitattu Ateena →
     * Sofia (matka laudalla lähes suoraan pohjoiseen, dx 13,5 / dy
     * 186,1): kamera kulki 317,8 yksikköä SIVUUN ja 15,0 pystyyn, ja
     * saattozoomi jäi kertoimeen 0,62 → 1,0:n sijaan, eli ajon lopussa
     * kartta nykäisi 631 px yhdessä kehyksessä.
     *
     * TUNNISTE MITÄTÖI MUISTIN ITSESTÄÄN. Avaimeen luetaan ne neljä
     * asiaa, joista laatikot riippuvat: SVG:n omat inline-mitat,
     * siirtokuoren muunnos ja body-luokat (kaikki asettelutilat ajetaan
     * niillä). Inline-tyylin ja luokkalistan lukeminen EI pakota
     * tyylinlaskentaa — ne ovat CSSOM-merkkijonoja — joten tarkistus on
     * yhtä halpa kuin lipun katsominen. Näin yksikään tuleva kutsupaikka
     * ei voi unohtaa mitätöintiä: se joka siirtää karttaa, muuttaa
     * väistämättä avainta.
     */
    const kuori = this.karttaKuori ?? this.svg;
    const avain = `${document.body.className}|${this.svg.style.width}|${this.svg.style.height}`
      + `|${this.svg.style.alignSelf}|${kuori.style.transform}`;
    let mitat = this.nakyvanMitat;
    if (!mitat || mitat.avain !== avain) {
      mitat = {
        avain,
        laatikko: this.svg.getBoundingClientRect(),
        paneeli: pane.getBoundingClientRect(),
      };
      // Tehtäväraja on yhä toinen puoli suojasta: se kattaa muutokset,
      // jotka eivät näy avaimessa (ikkunan koko, muualta tullut asettelu).
      if (!this.nakyvanMitat) Promise.resolve().then(() => { this.nakyvanMitat = null; });
      this.nakyvanMitat = mitat;
    }
    const { laatikko, paneeli } = mitat;
    if (!laatikko.width) return null;
    const skaala = laatikko.width / vb.width;
    return {
      x: vb.x + Math.max(0, paneeli.left - laatikko.left) / skaala,
      y: vb.y + Math.max(0, paneeli.top - laatikko.top) / skaala,
      w: Math.min(paneeli.width, laatikko.width) / skaala,
      h: Math.min(paneeli.height, laatikko.height) / skaala,
      skaala,
    };
  }

  /**
   * Täydentää kartan bittikartan puuttuvilla ruuduilla.
   *
   * KOLME SÄÄNTÖÄ, JOTKA OMISTAJA ANTOI:
   *
   * 1. Kesken eleen ei ladata. Piirto vie satoja millisekunteja
   *    pääsäikeessä, ja se tökkii sormen alla riippumatta siitä kuinka
   *    pieni pala on. Aiemmin lataus alkoi heti kun reuna lähestyi, ja
   *    juuri se tökki.
   * 2. Puskuria on niin paljon, ettei kesken eleen TARVITSE ladata.
   *    Yksi pyyhkäisy siirtää karttaa korkeintaan ruudullisen, koska
   *    sormi ei mahdu kulkemaan ruutua pidemmälle. Ruutuja piirretään
   *    siksi ruudullisen verran näkyvän alueen ympärille.
   * 3. Ladataan vain uusi osa. Ruudukko pysyy paikallaan, ja jo
   *    piirretyt ruudut jäävät sellaisinaan — uutta työtä on vain se
   *    kaistale, joka tuli näkyviin.
   */
  /**
   * Onko vanha lauta juuri nyt piilossa atlaksen alla?
   *
   * Totuus on CSS-luokassa eikä omassa kirjanpidossa: sen asettaa
   * js/fokuskartta.js (paivitaVanhaLauta) ja siihen nojaa myös se
   * tyylisääntö, joka laudan oikeasti piilottaa (css/styles.css
   * body.fokus-atlas-nakyma .staattinen/.taide-pohja). Kaksi lippua
   * samasta asiasta pääsisi ennen pitkää eri mieltä.
   */
  vanhaLautaPiilossa() {
    return Boolean(globalThis.document?.body?.classList?.contains('fokus-atlas-nakyma'));
  }

  taydennaTaide({ heti = false } = {}) {
    if (this.dead) return;
    /*
     * Maastonimet päivitetään SAMASSA KOHDASSA kuin kartan kuva.
     *
     * Molemmat riippuvat täsmälleen samasta asiasta — siitä mikä osa
     * laudasta on näkyvissä ja millä mittakaavalla — ja tätä funktiota
     * kutsutaan jokaisesta kohdasta, jossa näkymä asettuu: fitViewBox,
     * zoomipainikkeet, nipistys ja raahauksen loppu. Oma kutsuketju
     * olisi neljä uutta tilaisuutta unohtaa yksi niistä.
     *
     * Nimet ovat kuitenkin ENNEN rasteroinnin tarkistusta: ne piirtyvät
     * elävään kerrokseen, joten niiden on toimittava myös selaimessa,
     * jossa bittikarttaa ei saada tehtyä (rasteroiRuutu palauttaa
     * silloin nullin eikä this.taide ole olemassa).
     */
    if (!this.kartanRaahaus && !document.body.classList.contains('flight-active')) {
      this.paivitaLahivesi();
      this.paivitaMaastonimet();
    }
    if (!this.taide || !this.taideRyhma) return;
    /*
     * PIILOTETTUA VANHAA LAUTAA EI RASTEROIDA LAINKAAN (omistajan
     * kysymys 25.8.2026: *"Eihän sitä vanhaa maailman karttaa vaan
     * lasketa myös vaikka sitä ei näytetä eikä käytetä?"*).
     *
     * Fokusnäkymässä atlas korvaa laudan kokonaan ja lauta on
     * display: none (js/fokuskartta.js paivitaVanhaLauta,
     * body.fokus-atlas-nakyma). Piirto oli kuitenkin jäänyt päälle:
     * jokainen ele päättyi ruutusarjaan, joka maalasi satoja
     * millisekunteja pääsäikeessä pikseleitä, joita kukaan ei näe.
     *
     * Lippu on OMANSA eikä taideOdottaa. Juuri se on koko pointti:
     * taideOdottaa on "tee heti kun ele päättyy", ja sen kanssa työ
     * laukeaisi joka sormennoston jälkeen uudelleen. Tämä odottaa
     * paluuta näkymästä (jatkaVanhanLaudanPiirto), ei sormea.
     *
     * TYHJÄÄ EI VÄLÄHDÄ PALUUSSA: mitään ei poisteta, vain jätetään
     * tekemättä. Edellisen mittakaavan ruudut ja pohjataso jäävät
     * paikoilleen ja tulevat display: none -luokan mukana takaisin
     * näkyviin — karkeana, jos mittakaava on sillä välin muuttunut,
     * ja tarkentuvat hetken kuluttua kuten kartta muutenkin.
     */
    if (this.vanhaLautaPiilossa()) {
      this.taideAtlasOdottaa = true;
      this.taideOdottaa = false;
      this.peruutaRengas();
      return;
    }
    /*
     * Lennon aikana ei rasteroida.
     *
     * Lauta piirretään kalvon taakse jo lennon aikana, ja rasterointi vie
     * satoja millisekunteja pääsäikeessä. Omistajan havainto: "lento
     * tökki, mutta kartta toimii" — eli hitaus oli siirtynyt juuri tähän
     * kohtaan. Sama jumi selittää todennäköisesti myös sen, ettei
     * matkakertojan ääni käynnistynyt: puhe alkaa ajastimella lennon
     * aikana, ja ajastin ei pääse ajoon jumin läpi.
     *
     * Kuva täydennetään heti kun kalvo väistyy.
     *
     * AVAUSLENTO KARTALLA (body.kartalento) EI OLE ENÄÄ POIKKEUS.
     *
     * Poikkeus oli olemassa siksi, että avauslennossa kalvoa ei ole
     * vaan lento piirtyy kartan päälle — ja rasteroimaton lauta olisi
     * näkynyt lennon ajan venytettynä sumuna. Sitä ongelmaa ei enää
     * ole: koko bittikarttaputki lykkääntyy lennon yli
     * (rasteroiTaide → piirtoLykkaantyy), joten lennon aikana ruudulla
     * on laudan VEKTORIKUVA, joka on tarkempi kuin yksikään ruutu.
     * Rasterointi alkaa perillä — tai jää tekemättä, jos maa peittyy
     * atlaksen lehden alle.
     *
     * Mitattuna (Chromium, klikkauksesta koneen lähtöön): poikkeuksen
     * kanssa 24,4 s, ilman 5,0 s.
     */
    if (document.body.classList.contains('flight-active')) {
      this.taideOdottaa = true;
      return;
    }
    /*
     * Zoomiliu'un aikana ei rasteroida.
     *
     * Sama syy kuin lennolla: yksi ruutu vie satoja millisekunteja
     * pääsäikeessä, ja liuku on CSS-muunnos, jonka kompositori hoitaisi
     * muuten ilman nykäisyä. Omistaja: "zoomaus tökkii kun kartta
     * yrittää pysyä perässä piirtämisessä." Kuva täydennetään heti kun
     * liuku on ohi (kaynnistaZoomLiuku poistaa luokan).
     */
    if (document.body.classList.contains('zoom-kaynnissa')) { this.taideOdottaa = true; return; }
    // Kesken eleen ei ladata. Merkitään vain, että päättyessä pitää.
    if (this.kartanRaahaus && !heti) { this.taideOdottaa = true; return; }
    if (this.taidePiirtyy) { this.taideOdottaa = true; return; }
    /*
     * Ruutusarja odottaa kerran jäsennettyä lähdettä. Ilman lähdettä
     * jokainen ruutu jäsentäisi SVG:n itse (mitattuna 169–1886 ms per
     * ruutu moottorista riippuen), ja se työ heitettäisiin pois heti
     * kun lähde valmistuu. Lähteen valmistuminen kutsuu tätä uudestaan;
     * jos lataus epäonnistuu, lippu laskee ja ruudut piirtyvät
     * varareittiä.
     */
    if (this.taideLahdeTulossa) { this.taideOdottaa = true; return; }
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    /*
     * Pohjataso on tulossa ja kattaa tämän mittakaavan: odotetaan sitä
     * eikä rakenneta ruutusarjaa, jonka pohja korvaisi saman tien.
     * Pohjan valmistuminen kutsuu tätä uudestaan. Jos pohja jää
     * syntymättä, pohjaTulossa laskee ja ruudut rakennetaan silloin.
     */
    if (!this.taidePohja && this.pohjaTulossa
        && nakyva.skaala * this.nykyinenTarkkuus() <= (this.pohjaTehoOdotus || 0)) {
      this.taideOdottaa = true;
      return;
    }
    /*
     * Vanha rengastyö pois ennen uutta laskentaa.
     *
     * Jono rakennetaan tässä uudestaan, ja jo piirretyt ruudut jäävät
     * siitä pois — vanha jono olisi siis parhaassakin tapauksessa sama
     * ja pahimmassa väärän mittakaavan.
     */
    this.peruutaRengas();

    // Mittakaavan vaihtuessa vanhat ruudut ovat väärän tarkkuisia.
    if (!this.taideSkaala || nakyva.skaala > this.taideSkaala * 1.2
        || nakyva.skaala < this.taideSkaala * 0.8) {
      this.taideSkaala = nakyva.skaala;
      const pane = this.mapPane;
      this.taideTarkkuus = piirtotarkkuus(pane?.clientWidth ?? 400, pane?.clientHeight ?? 800);
      this.taideRuutu = ruudunKoko(nakyva.skaala, this.taideTarkkuus);
      /*
       * Yläraja ENNEN kierron tasajakoa: ilman sitä loitonnettu näkymä
       * niputtaa ison laudan yhteen jättiruutuun, jonka maalaus jumittaa
       * pääsäikeen sekunneiksi kesken zoomieleen (ks. vakion selostus).
       * Tasajako pyöristää rajatun koon vielä laudan jaolliseksi osaksi,
       * joten kierron kopio ei riko mitään.
       */
      this.taideRuutu = Math.min(this.taideRuutu, RUUDUN_YKSIKOT_ENINTAAN);
      /*
       * Kiertävällä kartalla ruudun on jaettava maailma tasan.
       *
       * Ruudun koko lasketaan pikselirajasta, ja loitonnetulla
       * maailmankartalla se venyi 23860 yksikköön — kaksi kertaa
       * maailmaa leveämmäksi. Ruutu on läpinäkymätön pergamentti koko
       * alaltaan, joten sen TYHJÄ oikea puoli maalattiin kierron
       * kopion päälle: kartta loppui pystysuoraan reunaan ja oikealla
       * oli tyhjää (omistajan kuvakaappaus iPadilta).
       *
       * Kun leveys on maailman jaollinen osa, yksikään ruutu ei ulotu
       * laudan ulkopuolelle eikä siis voi peittää kopiota.
       *
       * YLÖSPÄIN eikä lähimpään: pyöristys alaspäin SUURENTAA ruutua.
       * Yleiskuvassa laskettu koko oli 9573 ja lähin jaollinen sarake-
       * määrä yksi, jolloin ruudusta tuli koko maailma — 12000 yksikköä
       * yhteen 1100 pikselin kuvaan. Kartta oli neljä kertaa liian
       * karkea, ja yhden ruudun rasterointi kesti 4,7 sekuntia
       * mitattuna; kolme ruutua vei ensimmäiseltä piirrolta 13 sekuntia,
       * jonka ajan jokainen zoomaus jäi jonoon. Ylöspäin pyöristäen
       * ruutu on aina pikselibudjetin sisällä eli tarkka, ja työ
       * pilkkoutuu paloihin, joiden välissä sormi ehtii liikkua.
       */
      if (this.kartta.kiertava()) {
        const W = this.game.pack.map.width;
        this.taideRuutu = W / Math.max(1, Math.ceil(W / this.taideRuutu));
      }
      /*
       * VANHAT KERTYVÄT, EIVÄT KORVAUDU (omistajan iPad-havainto
       * 17.8.2026: *"kun zoomailee nopeasti sisään ja ulos ja lopettaa,
       * kuvaan jää pitkäksi aikaa epäteräviä laikkuja"*).
       *
       * Tässä oli sijoitus, joka HEITTI EDELLISEN sukupolven listan
       * pois. Vanhat ruudut jäävät DOMiin uusien PÄÄLLE siihen asti
       * kunnes poistaVanhatRuudut poistaa ne (ks. insertBefore alempana),
       * ja poisto käy vain tämän listan läpi. Kun mittakaava vaihtui
       * uudestaan ennen kuin lista ehti tyhjentyä — juuri sitä nopea
       * zoomailu tekee — edellisen sukupolven solmut katosivat
       * kirjanpidosta mutta EIVÄT ruudulta: ne jäivät orvoiksi, eikä
       * mikään poistanut niitä enää koskaan.
       *
       * Mitattuna (Chromium, iPad-viewport, kuusi nopeaa zoomisykliä
       * Euroopan lähikuvassa): 31 orpoa ruutua, joista 13 peitti näkyvää
       * aluetta. Ne jäivät paikoilleen koko lopun istunnon — kartta ei
       * tarkentunut hitaasti vaan ei lainkaan, ja jokainen orpo piti
       * lisäksi objektiosoitteensa elossa iOS:n muistibudjetissa.
       */
      this.taideVanhat = [...(this.taideVanhat ?? []), ...this.taideRuudut.values()];
      this.taideRuudut = new Map();
      this.taideTyhjat = new Set();
    }

    /*
     * POHJATASO RIITTÄÄ YLEISKUVASSA — RUUTUJA EI RAKENNETA LAINKAAN.
     *
     * Pohja on koko laudan kuva 2200 pikselin leveydellä (js/mapart.js
     * rasteroiPohja), ja loitonnetussa näkymässä se on vähintään yhtä
     * tarkka kuin ruudut olisivat. Ennen yleiskuva rakensi silti
     * parikymmentä pientä ruutua joka kerta kun mittakaava vaihtui.
     * Nyt ne jäävät pois: vanhan mittakaavan ruudut vapautuvat
     * (poistaVanhatRuudut) ja pohja jää yksin näkyviin.
     *
     * taideSkaala pidetään näkymän mukana, jottei tarkkuusvahti
     * (tarkistaTarkkuus, kynnys 2 %) pakottaisi sarjaa, jota tämä
     * haara juuri päätti olla rakentamatta.
     */
    if (this.taidePohja && nakyva.skaala * this.nykyinenTarkkuus() <= this.pohjaTeho) {
      this.taideSkaala = nakyva.skaala;
      this.taideOdottaa = false;
      this.poistaVanhatRuudut();
      return;
    }

    const koko = this.taideRuutu;
    const arkki = paperi(this.game.pack.map);
    const PUSKURI = 1; // ruudullista joka suuntaan: koko pyyhkäisyn matka
    const kiertava = this.kartta.kiertava();
    const W = this.game.pack.map.width;
    /*
     * Kiertävällä kartalla ruudut EIVÄT rajaudu laudan leveyteen — ne
     * kiertyvät sen yli.
     *
     * Näkyvä alue voi ulottua laudan oikean reunan yli, ja sen osan
     * täyttää <use>-kopio, joka näyttää laudan VASENTA reunaa. Ruudun
     * ei siis pidä syntyä sinne minne katsotaan vaan sinne mistä kuva
     * haetaan: sarake W:n takaa on sama sarake kuin sarake nollan
     * kohdalla.
     *
     * Vanha versio rajasi hakualueen väliin [0, W] eikä koskaan
     * pyytänyt niitä vasemman reunan ruutuja, joita kopio tarvitsi.
     * Kartta loppui siksi pystysuoraan saumaan ja oikealla oli pelkkä
     * tyhjä pergamentti (omistajan kuvakaappaus, Beringinsalmi).
     *
     * Ruutu jakaa laudan tasan (ks. taideRuutu yllä), joten sarakkeita
     * on kokonaisluku ja jakojäännös osuu aina ruudun reunaan.
     */
    const sarakkeita = kiertava ? Math.max(1, Math.round(W / koko)) : 0;
    const x0 = kiertava ? nakyva.x - nakyva.w * PUSKURI
      : Math.max(arkki.x, nakyva.x - nakyva.w * PUSKURI);
    const y0 = Math.max(arkki.y, nakyva.y - nakyva.h * PUSKURI);
    const x1 = kiertava ? nakyva.x + nakyva.w * (1 + PUSKURI)
      : Math.min(arkki.x + arkki.w, nakyva.x + nakyva.w * (1 + PUSKURI));
    const y1 = Math.min(arkki.y + arkki.h, nakyva.y + nakyva.h * (1 + PUSKURI));

    const puuttuvat = [];
    const jonossa = new Map();
    /*
     * Osuuko ruutu OIKEASTI näkyvään alueeseen — puskuri pois luettuna?
     *
     * Tähän jakoon koko optimointi nojaa: näkyvät ruudut piirretään
     * heti, rengas joutohetkinä. Osuvuus lasketaan kiertämättömästä
     * sarakkeesta (rx), koska juuri se kertoo, mihin kohtaan ruutua
     * katsotaan; kiertävällä laudalla sama sarake voi olla yhtä aikaa
     * näkyvissä ja renkaassa, ja silloin näkyvyys voittaa.
     */
    const nakyvissa = (rx, ry) => (rx + 1) * koko > nakyva.x && rx * koko < nakyva.x + nakyva.w
      && (ry + 1) * koko > nakyva.y && ry * koko < nakyva.y + nakyva.h;
    for (let ry = Math.floor(y0 / koko); ry <= Math.floor((y1 - 0.001) / koko); ry++) {
      for (let rx = Math.floor(x0 / koko); rx <= Math.floor((x1 - 0.001) / koko); rx++) {
        // Sama sarake voi osua hakualueeseen kahdesti, kun puskurillinen
        // näkymä on laudan levyinen. Ruutu piirretään silti kerran.
        const sarake = kiertava ? ((rx % sarakkeita) + sarakkeita) % sarakkeita : rx;
        const avain = `${sarake},${ry}`;
        if (this.taideRuudut.has(avain) || this.taideTyhjat.has(avain)) continue;
        let ruutu = jonossa.get(avain);
        if (!ruutu) {
          ruutu = { avain, rx: sarake, ry, nakyy: false };
          jonossa.set(avain, ruutu);
          puuttuvat.push(ruutu);
        }
        if (nakyvissa(rx, ry)) ruutu.nakyy = true;
      }
    }
    if (!puuttuvat.length) {
      // Mitään ei puutu: odottava työ on tehty, lippu alas. Ilman tätä
      // kesken jäänyt sarja jäisi ikuisesti "odottavaksi" senkin
      // jälkeen kun näkymä on jo kokonaan katettu, ja jokainen
      // lepohetki rakentaisi saman tyhjän jonon uudestaan.
      this.taideOdottaa = false;
      this.poistaVanhatRuudut();
      return;
    }

    // Lähimmät ensin: keskeltä ruutua reunoja kohti. Kiertävällä laudalla
    // etäisyys mitataan lähintä kopiota pitkin, ei laudan koordinaatteina
    // — muuten sauman takainen ruutu näyttäisi maailman levyiseltä.
    const kx = nakyva.x + nakyva.w / 2;
    const ky = nakyva.y + nakyva.h / 2;
    const etaisyys = (r) => {
      let dx = (r.rx + 0.5) * koko - kx;
      if (kiertava) dx = ((dx % W) + W + W / 2) % W - W / 2;
      return Math.hypot(dx, (r.ry + 0.5) * koko - ky);
    };
    puuttuvat.sort((a, b) => etaisyys(a) - etaisyys(b));

    /*
     * NÄKYVÄT RUUDUT ENSIN, PUSKURIRENGAS JOUTOHETKINÄ (v339).
     *
     * Omistaja: *"se vielä vähän tökkii, lähinnä kun joutuu lataamaan
     * zoomauksen jälkeen uutta karttamateriaalia scrollattaessa."*
     *
     * Puskuroitu alue on yhdeksän ruudullista (näkyvä + ruudullinen
     * joka suuntaan), mutta pelaaja katsoo niistä yhtä. Ennen kaikki
     * yhdeksän piirrettiin samassa keskeytymättömässä silmukassa, joten
     * zoomauksen jälkeen pääsäie oli varattuna vielä pitkään sen
     * jälkeen, kun näkyvä osa oli jo terävä — ja juuri siihen kohtaan
     * osuu se sormenveto, joka nykii.
     *
     * Jako on siksi kahtia. Näkyvät ruudut piirretään heti, samassa
     * silmukassa kuin ennenkin: ne pelaaja näkee nyt. Rengas siirtyy
     * taydennaRengas-jonoon, joka ottaa yhden ruudun kerrallaan
     * joutohetkellä ja väistyy sormen tieltä.
     *
     * Puskuri ei siis pienene — sääntö "puskuria on niin paljon, ettei
     * kesken eleen tarvitse ladata" pätee yhä. Vain sen valmistumisen
     * ajoitus muuttuu.
     */
    const nakyvat = puuttuvat.filter((r) => r.nakyy);
    const rengas = puuttuvat.filter((r) => !r.nakyy);

    this.taidePiirtyy = true;
    this.taideOdottaa = false;
    const skaala = this.taideSkaala;
    (async () => {
      for (const { avain, rx, ry } of nakyvat) {
        if (this.dead || skaala !== this.taideSkaala) break;
        /*
         * Uusi ele kesken piirron: keskeytetään ja jatketaan sen
         * jälkeen. Ehtona on eleKesken eikä pelkkä kartanRaahaus:
         * raahauslippu syttyy vasta kuuden pikselin kynnyksen jälkeen,
         * joten edellisen eleen sarja jatkoi piirtoa juuri sen hetken,
         * jolloin sormi oli jo kartalla ja seuraava ele alkamassa.
         * Sarja jatkuu, kun sormi irtoaa (paata ja irrota).
         */
        if (this.eleKesken()) { this.taideOdottaa = true; break; }
        // Pohjataso ehti valmistua kesken sarjan ja kattaa tämän
        // mittakaavan: loput ruudut ovat turhia, ja jatko (skip-haara)
        // vapauttaa jo tehdytkin.
        if (this.taidePohja && skaala * this.taideTarkkuus <= this.pohjaTeho) {
          this.taideOdottaa = true;
          break;
        }
        /*
         * Mittakaava luetaan RUUDULTA joka ruudun välissä, ei
         * this.taideSkaalasta.
         *
         * taideSkaala päivittyy vain tämän funktion alussa, ja alkuun ei
         * pääse niin kauan kuin piirto on kesken. Zoomaus kesken piirron
         * jäi siksi odottamaan, että vanhentunut sarja piirtyy loppuun
         * — käynnistyksessä se oli mitattuna kuusi sekuntia työtä, joka
         * heitettiin heti pois, ja zoomia napauttaessa jono vain kasvoi.
         * Kun näkymä on vaihtunut, tämä sarja lopetetaan kesken.
         */
        const nyt = this.nakyvaAlue();
        if (nyt && (nyt.skaala > skaala * 1.2 || nyt.skaala < skaala * 0.8)) {
          this.taideOdottaa = true;
          break;
        }
        const ikkuna = { x: rx * koko, y: ry * koko, w: koko, h: koko };
        // Luovutusehto: jos ele alkaa kesken ruudun, kalleimmat vaiheet
        // (maalaus, pakkaus) jäävät tekemättä eivätkä nykäise sormen alla.
        // Lähde mukaan: ruutu leikataan kerran jäsennetystä kuvasta.
        const kuva = await rasteroiRuutu(this.taide, ikkuna, skaala, this.taideTarkkuus,
          () => this.dead || this.eleKesken(), this.taideLahde);
        if (this.dead || skaala !== this.taideSkaala) continue;
        // Tyhjä ruutu kirjataan tyhjänä: sitä ei piirretä eikä pyydetä uudestaan.
        if (kuva === RUUTU_TYHJA) {
          this.taideTyhjat.add(avain);
          this.siivoaKatetutVanhat(nyt);
          continue;
        }
        // Eleen takia luovutettu ruutu pyydetään uudestaan eleen jälkeen.
        if (!kuva && this.eleKesken()) { this.taideOdottaa = true; break; }
        if (!kuva) continue;
        this.taideRuudut.set(avain, kuva);
        // Uusi ruutu alimmaiseksi: vanhan mittakaavan ruudut jäävät
        // päälle siihen asti, kunnes koko näkymä on katettu.
        this.taideRyhma.insertBefore(kuva, this.taideRyhma.firstChild);
        /*
         * Uusi ruutu peittää alleen jääneen vanhan: jos sen näkyvä osa
         * on nyt katettu, sumea kerros lähtee heti eikä vasta renkaan
         * valmistuttua. Näkyvä alue annetaan valmiina (`nyt`, luettu
         * tämän kierroksen alussa): uuden lukeman pakottama asettelu
         * maksoi mitattuna 54 ms per ruutu 4x-kuristuksella, eikä
         * näkymä voi liikkua kesken sarjan — ele katkaisisi sen.
         */
        this.siivoaKatetutVanhat(nyt);
        /*
         * Kehyksen mittainen hengähdys ruutujen väliin. Nopealla
         * reitillä ruudun maalaus on synkronista työtä (drawImage
         * lähteestä, mitattu ~110–380 ms), ja ilman tätä kaksi kolme
         * ruutua niputtui samaan kehykseen: sormenvedon ensimmäinen
         * kehys eleiden välissä venyi yli sekuntiin (savukkeen mittari
         * "nipistyksen jälkeinen panorointi"). Vanhalla reitillä saman
         * hengähdyksen antoi vahingossa ruutukohtaisen SVG:n lataus.
         *
         * Ajastin rinnalle, koska requestAnimationFrame ei tikitä
         * taustavälilehdessä — pelkkä rAF jäädyttäisi sarjan sinne ja
         * taidePiirtyy jäisi pystyyn estämään kaiken muun.
         */
        // eslint-disable-next-line no-await-in-loop
        await new Promise((jatka) => {
          const kehys = requestAnimationFrame(() => { clearTimeout(vara); jatka(); });
          const vara = setTimeout(() => { cancelAnimationFrame(kehys); jatka(); }, 100);
        });
      }
      this.taidePiirtyy = false;
      if (this.taideOdottaa && !this.eleKesken()) {
        this.poistaVanhatRuudut();
        this.taydennaTaide({ heti: true });
        return;
      }
      // Sarja katkesi kesken (peli vaihtui tai mittakaava muuttui):
      // siivotaan kuten ennenkin, ettei vanha kerros jää DOM:iin.
      if (this.dead || skaala !== this.taideSkaala) { this.poistaVanhatRuudut(); return; }
      /*
       * Vanhat ruudut poistetaan vasta kun RENGAS on valmis.
       *
       * Vanhan mittakaavan ruudut jäävät uusien alle, ja ne peittävät
       * juuri sen alueen, jonne rengas on tulossa. Jos ne poistettaisiin
       * heti näkyvän osan valmistuttua, reunan yli vieritettäessä
       * paljastuisi tyhjä pergamentti — ennen siellä oli edes sumea
       * kartta. taydennaRengas hoitaa poiston, myös kun jono on tyhjä.
       */
      this.taydennaRengas(rengas, skaala);
    })();
  }

  /**
   * Piirtää puskurirenkaan ruutu kerrallaan joutohetkinä.
   *
   * requestIdleCallback on tässä oikea työkalu kahdesta syystä. Se ei
   * laukea kesken sormenvedon — selain on silloin kiireinen, ja työ
   * odottaa itsestään eleen ohi ilman omaa lippukirjanpitoa. Ja se
   * ottaa yhden ruudun kerrallaan, joten pisin yhtenäinen tukos on
   * yhden ruudun mittainen eikä koko renkaan.
   *
   * Aikakatkaisu (timeout) on mukana, jottei rengas jäisi ikuisesti
   * tekemättä sivulla, joka ei koskaan ole joutilas: viimeistään
   * sekunnin päästä ruutu piirretään joka tapauksessa. Selaimessa
   * ilman requestIdleCallbackia (vanhemmat Safarit) tilalle tulee
   * ajastin — hitaampi mutta samanlainen: yksi ruutu kerrallaan.
   */
  taydennaRengas(jono, skaala) {
    this.peruutaRengas();
    if (this.dead || skaala !== this.taideSkaala) return;
    if (!jono?.length) { this.poistaVanhatRuudut(); return; }

    const koko = this.taideRuutu;
    const tarkkuus = this.taideTarkkuus;
    const pyyda = window.requestIdleCallback
      ? (tehtava) => window.requestIdleCallback(tehtava, { timeout: 1000 })
      : (tehtava) => setTimeout(tehtava, 60);
    const tyo = { id: 0, jono };
    this.taideRengas = tyo;

    const askel = async () => {
      // Vanhentunut työ: mittakaava vaihtui tai peli vaihtui alta.
      if (this.dead || this.taideRengas !== tyo || skaala !== this.taideSkaala) return;
      /*
       * Vanha lauta meni piiloon atlaksen alle kesken renkaan: jono
       * jää tekemättä eikä sitä yritetä uudelleen joutohetkittäin.
       * Paluu näkymästä rakentaa sarjan uusiksi (taydennaTaide), joten
       * mitään ei mene hukkaan — vain työtä jää tekemättä.
       */
      if (this.vanhaLautaPiilossa()) {
        this.taideRengas = null;
        this.taideAtlasOdottaa = true;
        return;
      }
      // Pohjataso kattaa tämän mittakaavan: rengas on turha, ja
      // vanhat ruudut saavat siivoutua saman tien.
      if (this.taidePohja && skaala * tarkkuus <= this.pohjaTeho) {
        this.taideRengas = null;
        this.poistaVanhatRuudut();
        return;
      }
      /*
       * Samat kolme kieltoa kuin täydennyksellä: eleen, lennon ja
       * zoomiliu'un aikana ei rasteroida. Ero on, ettei tässä
       * merkitä odottavaa työtä lipuksi vaan pyydetään yksinkertaisesti
       * seuraava joutohetki — jono on tallessa tässä sulkeumassa.
       */
      if (this.eleKesken() || this.taidePiirtyy
          || document.body.classList.contains('flight-active')
          || document.body.classList.contains('zoom-kaynnissa')) {
        tyo.id = pyyda(askel);
        return;
      }
      const { avain, rx, ry } = jono.shift();
      if (!this.taideRuudut.has(avain) && !this.taideTyhjat.has(avain)) {
        const ikkuna = { x: rx * koko, y: ry * koko, w: koko, h: koko };
        // Sama luovutusehto kuin näkyvillä ruuduilla: ele voittaa.
        const kuva = await rasteroiRuutu(this.taide, ikkuna, skaala, tarkkuus,
          () => this.dead || this.eleKesken(), this.taideLahde);
        if (this.dead || this.taideRengas !== tyo || skaala !== this.taideSkaala) return;
        if (kuva === RUUTU_TYHJA) { this.taideTyhjat.add(avain); this.siivoaKatetutVanhat(); }
        else if (kuva) {
          this.taideRuudut.set(avain, kuva);
          // Alimmaiseksi, kuten näkyvätkin: vanhat jäävät päälle.
          this.taideRyhma.insertBefore(kuva, this.taideRyhma.firstChild);
          this.siivoaKatetutVanhat();
        } else if (this.eleKesken()) {
          // Luovutettu ruutu takaisin jonon kärkeen: se piirretään
          // seuraavalla joutohetkellä, kun sormi on irronnut.
          jono.unshift({ avain, rx, ry });
          tyo.id = pyyda(askel);
          return;
        }
      }
      if (jono.length) { tyo.id = pyyda(askel); return; }
      this.taideRengas = null;
      this.poistaVanhatRuudut();
    };
    tyo.id = pyyda(askel);
  }

  /** Peruu kesken olevan rengastyön. Kesken oleva ruutu saa valmistua. */
  peruutaRengas() {
    if (!this.taideRengas) return;
    // Sidottuna: irrotettu window-metodi kaatuu "Illegal invocation".
    if (window.cancelIdleCallback) window.cancelIdleCallback(this.taideRengas.id);
    else clearTimeout(this.taideRengas.id);
    this.taideRengas = null;
  }

  /**
   * Piirtää maastonimet uudelleen näkyvälle alueelle.
   *
   * Piirto tehdään vain kun näkymä on OIKEASTI muuttunut. Sama funktio
   * kutsutaan jokaisesta näkymän asettumisesta, ja moni niistä ei siirrä
   * karttaa lainkaan (fitViewBox ajetaan myös ikkunan koon muuttuessa ja
   * paneelin auetessa). Turha piirto maksaisi muutaman sadan elementin
   * poiston ja luonnin joka kerta.
   */
  /**
   * Lähikuvan vesi: uomat, järvien syvyys ja meren pohja.
   *
   * Sama tunnistetemppu kuin maastonimillä: pieni liike ei muuta
   * mitään, koska kerros herää ja sammuu kokonaisina askelina.
   * Tunnisteessa on mukana voimakkuus eikä pelkkä mittakaava, jotta
   * häivytyksen välivaiheet piirtyvät mutta paikallaan seisominen ei
   * piirrä mitään uudelleen.
   */
  paivitaLahivesi() {
    /*
     * LÄHIVESI ON POIS KÄYTÖSTÄ. Joet ja järvet siirtyivät omaan
     * linssiinsä (ks. mapart.js drawMaasto), eikä pohjakartalla ole enää
     * vettä piirrettävänä. Kerrosta ei luoda, joten tämä palaa heti.
     */
    if (!this.lahivesiKerros) return;
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    const voima = lahivedenVoima(nakyva.w);
    const tunniste = voima
      ? [Math.round(voima * 20), ...[nakyva.x, nakyva.y, nakyva.w].map((n) => Math.round(n / 40))].join(':')
      : 'pois';
    if (this.lahivesiTunniste === tunniste) return;
    this.lahivesiTunniste = tunniste;
    drawLahivesi(this.lahivesiKerros, this.game.pack.map, {
      nakyva,
      nimet: this.maastonimet,
      syvyys: this.merisyvyys,
      meriRajaus: this.meriRajaus,
    });
  }

  paivitaMaastonimet() {
    /*
     * Fokusnäkymän lisänimet tahdistetaan ENNEN varhaisia paluita:
     * ne elävät omassa kerroksessaan eivätkä riipu nimipaketista,
     * mutta niiden näkyvyys riippuu samasta asiasta kuin maastonimien
     * — siitä, kuinka isona kirjain piirtyy ruudulle.
     */
    paivitaFokusNimet(this);
    /*
     * JATKUVA ATLAS näkymän mukaan (omistajan tilaus 25.8.2026). Tämä on
     * se kohta, jossa lehtien valinta oikeasti tehdään: laiskan latauksen
     * ehto on NÄKYMÄ, ja näkymä on juuri tässä asettunut. Panoroinnin
     * aikana ei ladata mitään — sama sääntö kuin kartan bittikartalla
     * (taydennaTaide: "kesken eleen ei ladata").
     */
    paivitaFokusAtlas(this);
    /*
     * Fokusvirran kuvavinjetit ovat kiinteän KOKOISIA RUUDULLA, joten
     * niiden mittakaava on laskettava uudelleen aina kun zoomi muuttuu
     * — samasta syystä ja samasta kohdasta kuin lisänimien näkyvyys.
     */
    paivitaFokuskuvat(this);
    // Kartan kohdemerkit ovat samoin kiinteän kokoisia ruudulla.
    paivitaFokuskohteet(this);
    // Sama koskee kevyen kulun vihreää kohtaamispistettä.
    paivitaFokuspiste(this);
    /*
     * Mittajana on ruudun ominaisuus eikä kuvan: se on laskettava
     * uudelleen aina kun zoomi tai panorointi on ASETTUNUT. Tämä on
     * juuri se kohta — samasta syystä kuin lisänimet ja kuvavinjetit
     * yllä — eikä siis joka kehyksessä.
     */
    paivitaFokusmitat(this);
    // Sama syy kuin yllä: nykyisen kaupungin laatta on fokuslehden
    // päällä kiinteän kokoinen RUUDULLA (paivitaFokusLaatta), joten sen
    // mittakaava ja napautusalue lasketaan uudelleen jokaisesta zoomista.
    this.paivitaFokusLaatta();
    // Sama koskee pelinappulaa ja aarremerkkiä (paivitaFokusMerkkiMitat)…
    this.paivitaFokusMerkkiMitat();
    // …sekä valittavien kohteiden merkkejä ja niiden nimiä.
    this.paivitaFokusKohdeMitat();
    // Ja kaupunkien omia nimilappuja: ne ladotaan fokusnäkymässä laatan
    // alle ruudulla vakiokokoisina (paivitaFokusNimilaput).
    this.paivitaFokusNimilaput();
    if (!this.maastonimiKerros) return;
    if (!this.maastonimet) return;
    const nakyva = this.nakyvaAlue();
    if (!nakyva) return;
    // Tunniste karkealla tarkkuudella: pienempi liike ei muuta yhtään
    // nimeä, koska nimet ilmestyvät ja katoavat kokonaisina.
    /*
     * Vesistölinssi kuuluu tunnisteeseen: linssin vaihto ei liikuta
     * karttaa, joten pelkkä näkymä olisi sama ennen ja jälkeen — ja
     * jokien nimet jäisivät piirtymättä (tai jäisivät päälle) siihen
     * asti kun pelaaja seuraavan kerran panoroi.
     */
    /*
     * Moottorin tunnus eikä `linssiValittu`: valinta voi olla
     * tallennettu edelliseltä pelikerralta linssistä, jota pelaaja ei
     * vielä omista, ja silloin kerrosta ei sytytetä. Jokien nimet
     * seuraavat sitä mikä KARTALLA on, ei sitä mikä on muistissa.
     */
    const joet = this.linssiTuki?.moottori?.tunnus === 'vesistot';
    const tunniste = [nakyva.x, nakyva.y, nakyva.w, nakyva.skaala]
      .map((n) => Math.round(n * 4)).join(':') + (joet ? '+joet' : '');
    if (this.maastonimiTunniste === tunniste) return;
    this.maastonimiTunniste = tunniste;
    drawMaastonimet(this.maastonimiKerros, this.game.pack.map, {
      nimet: this.maastonimet,
      nakyva,
      avaa: (kohde) => this.avaaMaastonimi(kohde),
      joet,
    });
    this.himmennaMaastonimet();
  }

  /**
   * Fokusmoodi: muiden alueiden maastonimet harson taakse.
   *
   * Omistajan lista paketille 2: *"muiden alueiden maastonimet (Alpit,
   * Apenniinit…) himmeiksi/piiloon harson alla; nykyisen maan alueen
   * nimet saavat jäädä."*
   *
   * MIKSI TÄSSÄ EIKÄ HARSON ALLA. Nimikerros on this.svg:n suora lapsi
   * juuriryhmän ULKOPUOLELLA (ks. maastonimiKerros), koska kiertävä
   * kartta ei saa kirjoittaa samaa nimeä kahdesti. Sumuverho on
   * juuriryhmän sisällä, joten se ei yllä nimiin — eikä kerrosta voi
   * siirtää verhon alle menettämättä sitä syytä, jonka takia se on
   * siellä. Himmennys tehdään siis nimikohtaisesti.
   *
   * MAA PÄÄTELLÄÄN PAIKASTA, koska nimipaketissa ei ole maatietoa:
   * ankkuri (data-x/data-y, js/mapart.js drawMaastonimet) testataan
   * tarkkojen maiden monikulmioita vasten. Nimiä on ruudulla
   * korkeintaan parikymmentä, joten testi on halpa.
   */
  himmennaMaastonimet() {
    const kerros = this.maastonimiKerros;
    if (!kerros) return;
    const nimet = kerros.querySelectorAll('.maastonimi');
    if (!nimet.length) return;
    const maat = this.fokusSumuPaalla() ? this.fokusMaat() : null;
    const muodot = this.game.pack.map?.countryShapes;
    /*
     * FOKUSPOHJAN ALUEELLA NIMIÄ EI OLE LAINKAAN (omistaja 24.8.2026:
     * *"vieraiden alueiden maastonimet (Balkanvuoret ym.) ja muut laudan
     * tekstit pois fokuspohjan alueelta"*). Lehdessä on omat nimensä
     * omalla kirjasimellaan, ja laudan maastonimet jäisivät sen päälle
     * kellumaan toisella tyylillä — kaksi karttaa päällekkäin. Piilotus
     * on eri asia kuin harson alle himmentäminen, joten sillä on oma
     * luokkansa.
     *
     * KUVAN AIKANA EI LAINKAAN (laajennettu v1101). Ennen piilotus
     * rajautui kuvan suorakaiteeseen, ja sen ulkopuolelle jäi laudan
     * omia maastonimiä (Karpaatit, Dinaariset Alpit) kellumaan verhon
     * päälle — juuri sitä vanhaa lautaa, jota fokusnäkymässä ei saa
     * näkyä. Kuvassa on omat nimensä omalla kirjasimellaan.
     */
    const pohja = this.fokusPohjaBbox ?? null;
    for (const n of nimet) n.classList.toggle('maastonimi-kuvan-alla', Boolean(pohja));
    if (!maat || !muodot) {
      for (const n of nimet) n.classList.remove('maastonimi-harson-alla');
      return;
    }
    const renkaat = [];
    for (const iso of maat) {
      for (const r of muodot[iso]?.renkaat ?? []) renkaat.push(r);
    }
    for (const n of nimet) {
      const x = Number(n.dataset.x);
      const y = Number(n.dataset.y);
      const sisalla = Number.isFinite(x) && Number.isFinite(y)
        && renkaat.some((r) => pisteMonikulmiossa(x, y, r));
      n.classList.toggle('maastonimi-harson-alla', !sisalla);
    }
  }

  /**
   * i-ikonin napautus: Wikipedian artikkeli kohteesta.
   *
   * Sama ikkuna kuin kaupungeilla, joten kuvat, galleria ja lähdemerkintä
   * tulevat ilmaiseksi. Nimipaketin oma suomenkielinen selitys näytetään
   * heti odotustekstin tilalla — se on paikalla ennen kuin verkosta
   * kuuluu mitään, ja se jää ainoaksi tekstiksi, jos yhteyttä ei ole.
   */
  avaaMaastonimi(kohde) {
    if (!kohde?.wiki) return;
    /*
     * Maastokohteilla on oma käsin kirjoitettu artikkeli
     * (js/packs/maasto-tekstit.js + kymmenen kuuluisinta mallissa) ja
     * usein omat kuvat. Laji katsotaan nimipaketista samuudella eikä
     * avaimella, koska sama avain voi olla kahdella lajilla (Ural on
     * sekä joki että vuoristo).
     */
    const laji = ['vuoret', 'joet', 'jarvet']
      .find((l) => MAAILMANKARTAN_NIMET[l]?.includes(kohde));
    const teksti = laji
      ? (MAASTO_TEKSTIT[laji]?.[kohde.avain] ?? MAASTO_TEKSTIT_MALLI[laji]?.[kohde.avain])
      : null;
    /*
     * Vuorikohteilla on oma kuratoitu karuselli (VUORIKUVAT). Se
     * annetaan tässä valmiina listana eikä haeta otsikolla, koska
     * Wikipedia-otsikot törmäävät: Madagaskarin ylängön artikkeli on
     * "Madagaskar", ja sama otsikko on Afrikan laudan saarikohteella.
     * Muille kelpaavat artikkelin omat kuvakappaleet — sama
     * kenttäkolmikko tiedosto/selite/lahde.
     */
    const kuvakappaleet = (teksti?.kappaleet ?? []).filter((k) => k.tiedosto);
    this.openWikiArticle(kohde.wiki, kohde.nimi, {
      alkuteksti: kohde.selitys,
      galleria: vuorikuvat(kohde.avain) ?? (kuvakappaleet.length ? kuvakappaleet : null),
      kappaleet: teksti?.kappaleet ?? null,
    });
  }

  /**
   * Poistaa edellisen mittakaavan ruudut ja alkuperäiset vektorit.
   *
   * Vasta täällä, ei heti uuden ruudun tullessa: vanha kuva saa jäädä
   * ruudulle siihen asti kunnes uusi kattaa saman alueen. Muuten
   * kartalla vilahtaisi tyhjää joka kerta kun zoomataan.
   */
  poistaVanhatRuudut() {
    if (this.taidePiirtyy) return;
    for (const solmu of this.taideVanhat ?? []) {
      solmu.remove();
      if (solmu.dataset?.osoite) URL.revokeObjectURL(solmu.dataset.osoite);
    }
    this.taideVanhat = [];
    this.poistaVektorit();
  }

  /**
   * Poistaa ne vanhan mittakaavan ruudut, joiden alue on JO katettu
   * uusilla — kesken sarjan, ruutu kerrallaan.
   *
   * Miksi tämä on erikseen: uusi ruutu menee taideRyhmässä alimmaiseksi,
   * eli vanhan mittakaavan ruutu jää sen PÄÄLLE (ks. insertBefore
   * taydennaTaidessa). Se on tahallista — muuten kartalla vilahtaisi
   * tyhjää pergamenttia joka kerta kun zoomataan. Mutta poisto tapahtui
   * vasta kun koko puskurirengas oli valmis, ja rengas on yhdeksän
   * ruudullista, jotka piirtyvät yksi kerrallaan joutohetkinä. Näkyvä
   * osa oli terävä jo aikaa sitten, mutta pelaaja näki yhä sen päällä
   * makaavan sumean kerroksen: mitattuna yksi nipistys Euroopan
   * lähikuvassa 5632 ms.
   *
   * Peittävyys ei ole arvio vaan tarkistus. Vanha ruutu poistetaan
   * vasta kun JOKAINEN nykyruudukon ruutu, jonka päälle se ulottuu, on
   * piirretty (tai kirjattu tyhjäksi, jolloin siinä ei ole mitään
   * piirrettävää). Siksi mitään ei voi paljastua tyhjänä, ja kartta
   * tarkentuu keskeltä ulospäin samassa tahdissa kuin ruudut valmistuvat.
   *
   * "Se alue, jonka päälle ruutu ulottuu" on syvässä lähikuvassa
   * ruudun NÄKYVÄ osa eikä koko ruutu — ks. perustelu alempaa.
   *
   * @param tiedettyNakyva  jo luettu näkyvä alue, jos kutsujalla on
   *                        sellainen; säästää yhden asettelun (54 ms
   *                        per ruutu 4x-kuristuksella).
   */
  siivoaKatetutVanhat(tiedettyNakyva = null) {
    if (!this.taideVanhat?.length || !(this.taideRuutu > 0)) return;
    const koko = this.taideRuutu;
    // Kiertävällä laudalla nykyruudut on avainnettu kierrettyyn
    // sarakkeeseen; vanhan ruudun oma x on samalla tavalla laudan
    // sisällä, mutta pyöristys voi työntää viimeisen sarakkeen yli.
    const kiertava = this.kartta.kiertava();
    const W = this.game.pack.map.width;
    const sarakkeita = kiertava ? Math.max(1, Math.round(W / koko)) : 0;
    /*
     * SYVÄSSÄ LÄHIKUVASSA RIITTÄÄ, ETTÄ NÄKYVÄ OSA ON KATETTU
     * (omistajan iPad-kaappaus Itä-Afrikan rannikolta: yläosa sumea,
     * alaosa terävä pitkään).
     *
     * Vanha ruutu on loitonnetun mittakaavan kokoinen, eli syvässä
     * lähikuvassa se peittää KYMMENIÄ uuden ruudukon ruutuja — myös
     * niitä, jotka ovat näkyvän alueen ulkopuolella eli puskurirenkaassa.
     * Kun poisto vaati koko ruudun kattamista, näkyvä osa jäi sumean
     * kerroksen alle siihen asti, kunnes rengas oli piirretty loppuun.
     * Mitattuna (Chromium, iPad-viewport, syvä lähikuva maailmankartalla,
     * zoomikerroin 136):
     *
     *   yksi nipistys     näkyvä katettu 1510 ms → terävä vasta 7553 ms
     *   kuusi zoomisykliä näkyvä katettu 1837 ms → terävä vasta 6181 ms
     *   sama 4x hidastettuna (WebKit-hinta): 4649 → 28457 ms
     *
     * Koko se ero oli puskurirenkaan piirtoa, jota kukaan ei katso.
     *
     * Alta ei silti voi paljastua tyhjää: pyramidin pohjataso kattaa
     * koko laudan ja on kaiken tarkan alla. Siksi tämä helpotus vaatii
     * pohjan olemassaolon — ilman sitä pätee vanha, tiukempi sääntö.
     * Näkyvän alueen ULKOPUOLELLA olevat vanhat ruudut noudattavat
     * vanhaa sääntöä sellaisenaan: ne eivät peitä mitään, ja niistä on
     * hyötyä reunan yli vieritettäessä siihen asti kunnes rengas ehtii.
     */
    const nakyva = this.taidePohja ? (tiedettyNakyva ?? this.nakyvaAlue()) : null;
    const alueKatettu = (x0, y0, x1, y1) => {
      for (let ry = Math.floor(y0 / koko); ry <= Math.floor((y1 - 0.001) / koko); ry++) {
        for (let rx = Math.floor(x0 / koko); rx <= Math.floor((x1 - 0.001) / koko); rx++) {
          const sarake = kiertava ? ((rx % sarakkeita) + sarakkeita) % sarakkeita : rx;
          const avain = `${sarake},${ry}`;
          if (!this.taideRuudut.has(avain) && !this.taideTyhjat.has(avain)) return false;
        }
      }
      return true;
    };
    const katettu = (solmu) => {
      const x = Number(solmu.getAttribute('x'));
      const y = Number(solmu.getAttribute('y'));
      const w = Number(solmu.getAttribute('width'));
      const h = Number(solmu.getAttribute('height'));
      if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return false;
      if (nakyva) {
        /*
         * Leikkaus näkyvään alueeseen. Kiertävällä laudalla ruutu voi
         * näkyä kierron kopion kautta, jolloin näkymä on laudan
         * leveyden verran sivussa ruudun omista koordinaateista —
         * siksi ikkunaa kokeillaan myös siirrettynä.
         */
        let osui = false;
        let kaikki = true;
        for (const siirto of kiertava ? [-W, 0, W] : [0]) {
          const ax = Math.max(x, nakyva.x + siirto);
          const bx = Math.min(x + w, nakyva.x + nakyva.w + siirto);
          const ay = Math.max(y, nakyva.y);
          const by = Math.min(y + h, nakyva.y + nakyva.h);
          if (ax >= bx || ay >= by) continue;
          osui = true;
          if (!alueKatettu(ax, ay, bx, by)) kaikki = false;
        }
        /*
         * Näkyvän ULKOPUOLELLA olevaa ruutua ei tutkita lainkaan: se ei
         * peitä mitään, ja renkaan valmistuttua poistaVanhatRuudut vie
         * sen joka tapauksessa. Koko ruudun läpikäynti maksaisi turhaan
         * — syvässä lähikuvassa loitonnetun mittakaavan ruutu osuu
         * satoihin uuden ruudukon ruutuihin, ja tämä ajetaan jokaisen
         * valmistuneen ruudun jälkeen.
         */
        return osui ? kaikki : false;
      }
      return alueKatettu(x, y, x + w, y + h);
    };
    const jaljelle = [];
    for (const solmu of this.taideVanhat) {
      if (!katettu(solmu)) { jaljelle.push(solmu); continue; }
      solmu.remove();
      if (solmu.dataset?.osoite) URL.revokeObjectURL(solmu.dataset.osoite);
    }
    this.taideVanhat = jaljelle;
  }

  /**
   * Poistaa alkuperäiset vektorit heti kun bittikarttaa on: ruutuja
   * TAI pohjataso. Oma metodinsa eikä osa poistaVanhatRuuduista,
   * koska tämän on voitava tapahtua myös KESKEN ruutusarjan ja heti
   * pohjan valmistuttua: hitaalla koneella vektorikerros (12 500
   * elementtiä, mitattu 236–1400 ms per panorointikehys) teki
   * jokaisesta eleestä niin raskaan, että eleet keskeyttivät sarjan
   * loputtomiin eikä poisto sarjan lopussa tullut koskaan — kartta
   * jumitti minuutteja (savukkeen kehysvälimittari). Pohja kattaa
   * koko laudan, joten poisto ei voi paljastaa tyhjää; tarkkuus
   * palaa ruutujen mukana.
   */
  poistaVektorit() {
    if (!this.taideVektorit?.length) return;
    if (!this.taideRuudut?.size && !this.taidePohja) return;
    for (const solmu of this.taideVektorit) solmu.remove();
    this.taideVektorit = [];
  }

  /**
   * Avausteksti keskelle sitä tyhjää pergamenttia, joka jää laudan alle.
   * Kaista lasketaan näkymästä eikä arvata prosentteina, koska kapealla
   * ruudulla laatikko on myös pystysuunnassa kirjekuoressa.
   */
  placeIntro(box, vy, vh, paneH) {
    /*
     * MISSÄ PIENENNETTY LAUTA LOPPUU (omistajan tilaus 26.8.2026,
     * ilta: kartta pienemmällä ylös, tyhjä vaalea karttapohja alle).
     *
     * Avaus on kaksi lohkoa: ylälohkossa lauta ja julisteotsikko,
     * alalohkossa tyhjä arkki ja tekstipalsta. Raja ei ole arvattu
     * prosentti vaan mitattu: js/kartta.js on jatkanut pergamenttia
     * laudan alle (INTRO_SPACE), ja kartta.laudanKorkeus kertoo laudan
     * oman korkeuden laatikossa — sen alalaita muuntuu ruutupikseleiksi
     * näkymän (vy, vh) ja paneelin korkeuden kautta.
     *
     * Raja rajataan varmuuden vuoksi haarukkaan: kapea ja matala ruutu
     * ei saa jättää tekstiä ilman tilaa, eikä leveä ruutu kutistaa
     * karttaa nauhaksi.
     *
     * KARTTA NÄKYY ALAREUNAANSA ASTI (omistajan pelitestipalaute
     * v1119: *"maailmankarttakuva katkeaa nyt liian aikaisin,
     * eteläinen pallonpuolisko leikkautuu"*). Kaksi korjausta samaan
     * asiaan:
     *
     *   1. HÄIVYTYSKAISTA LASKETAAN MUKAAN. Arkin yläreuna ei ole
     *      viivasuora leikkaus vaan liuku (css .intro-arkki::before,
     *      INTRO_HAIVYTYS_EM arkin omaa kirjasinkokoa), ja se söi
     *      kartan alimman kaistaleen. Nyt raja työnnetään sen verran
     *      alemmas, että liuku osuu laudan alapuoliseen pergamenttiin
     *      eikä enää itse karttaan.
     *   2. HAARUKKA ON VÄLJEMPI. Entinen 28–55 % katkaisi kartan
     *      iPadin pystyruudulla (mitattu: lauta olisi tarvinnut 57 %),
     *      eli juuri se ruutu, jolla omistaja pelaa. 24–72 % päästää
     *      laudan kokonaan näkyviin, ja arkille jää yhä yli neljännes
     *      paneelista — teksti kutistuu tarvittaessa (fitIntro).
     */
    if (this.introEl && vh > 0 && paneH > 0) {
      const alalaita = ((box.y + this.kartta.laudanKorkeus(box) - vy) / vh) * paneH;
      const arkinFontti = this.introArkki
        ? (parseFloat(getComputedStyle(this.introArkki).fontSize) || 16) : 16;
      const haivytys = arkinFontti * INTRO_HAIVYTYS_EM;
      // Portin takana arkkia ei ole (kartta on iso ja keskellä), joten
      // ylälohko saa koko paneelin ja julisteotsikko jää sen keskelle
      // niin kuin ennenkin. Vasta portin jälkeen lohko rajataan.
      const katto = this.aloitettu ? paneH * INTRO_KARTTA_ENINTAAN : paneH;
      const raja = Math.min(
        Math.max(alalaita + haivytys, paneH * INTRO_KARTTA_VAHINTAAN),
        katto,
      );
      this.introEl.style.setProperty('--intro-kartta-korkeus', `${Math.round(raja)}px`);
    }
    this.fitIntro();
  }

  /**
   * Kutistaa avauksen kirjasinkokoa, jos se ei mahdu lohkoonsa.
   *
   * Kaksi lohkoa, kaksi sovitusta: julisteotsikko sovitetaan kartan
   * ylälohkoon ja tekstipalsta alalohkon arkille. Kirjasinkoko
   * asetetaan LOHKON JUUREEN eikä yksittäiseen tekstiin, koska lapset
   * (otsikon rivit, nappi, kansikuva) on mitoitettu em-yksiköissä: kun
   * teksti pienenee, ne pienenevät mukana ja sommitelma säilyttää
   * mittasuhteensa. Puhelimen pystyruudulla juuri tämä ratkaisee sen,
   * mahtuuko kaikki näkyviin.
   */
  fitIntro() {
    /*
     * Otsikon kerroin 1.5 on selaimen oma h2-koko: ennen 26.8.2026
     * juliste oli tekstipalstan lapsi ja peri kokonsa siitä kerrottuna
     * 1,5:llä. Nyt se on oma lohkonsa, ja sama kerroin pitää otsikon
     * täsmälleen entisen kokoisena.
     */
    this.sovitaIntroLohko(this.introKartta, this.introOtsikko, 1.5);
    this.sovitaIntroLohko(this.introArkki, this.introPalsta);
  }

  /** Pienentää palstan kirjasinta, kunnes se mahtuu kaistaan. */
  sovitaIntroLohko(kaistaEl, palsta, kerroin = 1) {
    const kaista = kaistaEl?.clientHeight;
    if (!kaista || !palsta) return;
    let koko = INTRO_FONT_MAX * kerroin;
    palsta.style.fontSize = `${koko}rem`;
    // Askelia riittävästi koko haarukkaan; INTRO_FONT_MIN on lattia.
    for (let i = 0; i < 8 && palsta.scrollHeight > kaista; i++) {
      koko = Math.max(INTRO_FONT_MIN * kerroin, koko - 0.09 * kerroin);
      palsta.style.fontSize = `${koko}rem`;
    }
  }

  /**
   * Etusivun alkuanimaatio: sykkivä valopiste kulkee reittiä ja piirtää
   * kuljetun osuuden näkyviin himmeänä katkoviivana (ALKUREITIT).
   *
   * LIIKE ON SMILIÄ, EI CSS:ÄÄ (12.8.2026). Aiempi versio teki kaiken
   * CSS-animaatiolla: kärki oli polku, jonka katkoviiva oli `0.01
   * pituus` eli yksi ainoa pyöreäpäinen pätkä, ja se matkasi reittiä
   * liu'uttamalla stroke-dashoffsetia. Chromiumilla se mitattiin
   * toimivaksi kerta toisensa jälkeen, mutta omistaja ei nähnyt
   * animaatiota millään laitteellaan — ei iPhonella eikä työpöydällä.
   * Kaikki mittaukset oli tehty Chromiumilla, ja omistajan selaimet
   * ovat WebKit-pohjaisia.
   *
   * Kolme tunnettua WebKitin käyttäytymistä osuu tuohon tekniikkaan
   * yhtä aikaa, eikä yhtäkään pysty tästä ympäristöstä sulkemaan pois
   * (koneessa on vain Chromium):
   *   1. alle puolen yksikön mittainen katkoviivan pätkä pyöreällä
   *      päällä voi jäädä piirtymättä kokonaan,
   *   2. stroke-dashoffsetin CSS-animaatio SVG:ssä on epäluotettava,
   *   3. @keyframes-lohkossa oleva var() ei ole aina ratkennut —
   *      ja peittävyys tuli täällä nimenomaan var(--kirkkaus):sta,
   *      pohja-arvon ollessa 0. Ratkeamaton muuttuja jättäisi koko
   *      kerroksen näkymättömäksi juuri niin kuin omistaja kuvaili.
   *
   * Siksi liike tehdään nyt SMILillä: kärki on oikea <circle>, joka
   * kulkee polkua <animateMotion>illa, ja peittävyys, säde ja jäljen
   * katkoviivan siirtymä ovat <animate>-elementtejä. SMIL on WebKitin
   * vanhin ja vakain SVG-animaatiotie, eikä se kulje CSS:n kautta
   * lainkaan. Samasta syystä yhtään animoitua ominaisuutta EI aseteta
   * tyylitiedostossa: CSS-sääntö jyräisi SMIL-arvon, ja piste jäisi
   * paikalleen.
   *
   * POHJAVIIVA PIIRTYY AINA. Jos animaatio jostain vielä pettää,
   * reitit näkyvät silti hentona viivana — etusivu ei enää voi olla
   * tyhjä. Sama viiva on liikkeen vähennyksen koko näkymä.
   */
  piirraAlkuReitit(root) {
    const kerros = el('g', { class: 'alkureitit', 'pointer-events': 'none' }, root);
    for (const reitti of ALKUREITIT) {
      const d = pehmeaPolku(reitti.pisteet);
      // Pituus lasketaan itse (polunPituus): selaimen getTotalLength
      // palauttaa WebKitissä nollan piirtämättömälle elementille, ja
      // kerros syntyy piilossa.
      const pituus = polunPituus(reitti.pisteet);
      const ryhma = el('g', { class: `alkureitti alkureitti-${reitti.laji}` }, kerros);
      // Hento pohjaviiva koko reitistä: näkyy aina, myös liikkeen
      // vähennyksessä ja siinä tapauksessa ettei SMIL jostain käynnisty.
      el('path', { d, class: 'alkureitti-osa alkureitti-viiva' }, ryhma);
      if (this.reducedMotion) continue;

      const kesto = `${reitti.kesto}s`;
      const himmennys = LAJIN_KIRKKAUS[reitti.laji] ?? 1;
      /*
       * Reitin oma lähtöhetki kierroksesta. Sekä kärjen että jäljen
       * avainhetket on kirjoitettu reitin omasta ajasta (0 = lähtö), ja
       * sama kierto siirtää molemmat samaan kohtaan kierrosta — siksi ne
       * pysyvät toisissaan kiinni ilman erillistä ajastusta.
       */
      const kierto = (1 - reitti.alku) % 1;
      /** Yksi SMIL-animaatio: arvot ja hetket samasta kierretystä listasta. */
      const animoi = (kohde, attributeName, kierretyt, arvo) => el('animate', {
        attributeName,
        dur: kesto,
        repeatCount: 'indefinite',
        calcMode: 'linear',
        values: kierretyt.map(arvo).join(';'),
        keyTimes: kierretyt.map((k) => k.t.toFixed(5)).join(';'),
      }, kohde);

      /*
       * JÄLKI. Kuvio kirjoitetaan auki jokaiselle askeleelle: `piirretty`
       * ensimmäistä paria on täysimittaisia pätkiä, loput ovat nollan
       * mittaisia ja niiden väli koko jakson mittainen. Kahden peräkkäisen
       * askeleen välillä muuttuu siis vain yksi pari, ja SMILin lineaarinen
       * välistys venyttää sen pätkän esiin — muut pysyvät paikallaan.
       */
      const jaksoja = Math.max(1, Math.round(pituus / JALJEN_JAKSO));
      const jakso = pituus / jaksoja;
      const patka = JALJEN_PATKA.toFixed(2);
      const vali = (jakso - JALJEN_PATKA).toFixed(2);
      const tyhja = jakso.toFixed(2);
      const kuviot = [];
      for (let piirretty = 0; piirretty <= jaksoja; piirretty++) {
        const osat = [];
        for (let i = 0; i < jaksoja; i++) {
          if (i < piirretty) osat.push(patka, vali);
          else osat.push('0', tyhja);
        }
        kuviot.push(osat.join(' '));
      }
      const jaljet = kierraKehykset(jaljenKehykset(reitti.ikkuna, jaksoja), kierto);
      const jalki = el('path', {
        d,
        class: 'alkureitti-osa alkureitti-jalki',
        'stroke-width': JALJEN_LEVEYS,
        // Pohja-arvo on valmis kuvio: jos dasharrayn animointi jostain
        // pettäisi, reitti näkyisi staattisena katkoviivana eikä tyhjänä.
        'stroke-dasharray': kuviot[jaksoja],
        opacity: 0,
      }, ryhma);
      animoi(jalki, 'stroke-dasharray', jaljet,
        (k) => kuviot[Math.min(jaksoja, Math.max(0, Math.round(k.kulku * jaksoja)))]);
      animoi(jalki, 'opacity', jaljet,
        (k) => (k.nakyy * JALJEN_KIRKKAUS * himmennys).toFixed(3));

      /*
       * KÄRKI: ryhmä, jonka <animateMotion> vie polkua pitkin.
       * Polku annetaan path-määreenä eikä <mpath>-viittauksena — sama
       * asia SMILin kannalta, mutta ilman id-viittausta, joka pitäisi
       * pitää yksilöllisenä myös yhden tiedoston dist-versiossa.
       * keyPoints kertoo, missä kohtaa polkua ollaan milläkin hetkellä,
       * joten odotusvuoro on vain jono samaa arvoa.
       *
       * Ryhmä kantaa silmukan häivytyksen ja reitin lajikohtaisen
       * himmennyksen, ympyrät oman sykkeensä. SVG kertoo ryhmän ja
       * lapsen peittävyydet keskenään, joten sykkeelle jää oma
       * animaationsa — yhdelle elementille niitä ei mahtuisi kahta.
       * Samalla molemmat ympyrät jakavat yhden liikeanimaation.
       */
      const kierretyt = kierraKehykset(alkuKehykset(reitti.ikkuna), kierto);
      const kulkija = el('g', { class: 'alkureitti-kulkija', opacity: 0 }, ryhma);
      el('animateMotion', {
        dur: kesto,
        repeatCount: 'indefinite',
        calcMode: 'linear',
        rotate: '0',
        path: d,
        keyPoints: kierretyt.map((k) => k.kulku.toFixed(5)).join(';'),
        keyTimes: kierretyt.map((k) => k.t.toFixed(5)).join(';'),
      }, kulkija);
      animoi(kulkija, 'opacity', kierretyt, (k) => (k.nakyy * himmennys).toFixed(3));
      /*
       * Majakkavälähdys vain isoisän pisteelle. Laiva saa saman
       * ympyräparin mutta ilman yhtäkään animaatiota: sen säde ja
       * peittävyys ovat kiinteitä määreitä, jolloin piste on tasaisen
       * himmeä ja liikkuu vain kulkijan mukana.
       */
      const valahtaa = reitti.laji === 'isoisa';
      for (const karki of KARJET) {
        const lepo = (arvot) => sykkeenArvo(arvot, valahtaa ? 0 : LAIVAN_TASO);
        const ympyra = el('circle', {
          class: `alkureitti-piste ${karki.luokka}`,
          cx: 0,
          cy: 0,
          // Pohja-arvot ovat lepoasento: jos SMIL ei jostain käynnisty,
          // kärki näkyy himmeänä pisteenä eikä katoa.
          r: lepo(karki.sade).toFixed(2),
          opacity: lepo(karki.kirkkaus).toFixed(3),
        }, kulkija);
        if (!valahtaa) continue;
        for (const [maare, arvot] of [['r', karki.sade], ['opacity', karki.kirkkaus]]) {
          el('animate', {
            attributeName: maare,
            dur: SYKE_KESTO,
            repeatCount: 'indefinite',
            calcMode: 'linear',
            values: SYKE_MUOTO.map((osuus) => sykkeenArvo(arvot, osuus).toFixed(3)).join(';'),
            keyTimes: SYKE_HETKET.join(';'),
          }, ympyra);
        }
      }
    }
    return kerros;
  }

  /**
   * Alkuanimaatio puuhun tai pois. Kutsutaan render()istä joka kierrolla,
   * joten se tekee työtä vain kun tila oikeasti vaihtuu.
   *
   * Kerros palautetaan samaan kohtaan lapsijärjestyksessä kuin mistä se
   * otettiin: reittien päälle mutta kaupunkien alle. Jos paikkaa ei ole
   * (ensimmäinen irrotus), se muistetaan tässä.
   */
  paivitaAlkuReitit(nakyy) {
    const kerros = this.alkuReittiKerros;
    if (!kerros) return;
    if (nakyy) {
      if (kerros.isConnected) return;
      this.alkuReittiJuuri?.insertBefore(kerros, this.alkuReittiPaikka);
      return;
    }
    if (!kerros.isConnected) return;
    this.alkuReittiPaikka = kerros.nextSibling;
    kerros.remove();
  }

  drawBoard() {
    const { board, pack } = this.game;
    const { decor } = pack;
    this.contentBox = this.kartta.boardBounds();
    this.svg.textContent = '';

    const maarittelyt = drawDefs(this.svg);
    // Kaikki piirretään juuriryhmään: esikatselu siirtää ryhmää, ei SVG:tä,
    // jolloin elementin taakse ei paljastu tyhjää taustaa raahatessa.
    const root = el('g', { class: 'board-root' }, this.svg);
    const svg = { appendChild: (node) => root.appendChild(node) };
    this.boardRoot = root;

    /*
     * Kiertävä kartta: yksi kopio koko sisällöstä laudan leveyden verran
     * oikealle.
     *
     * <use> viittaa elävään ryhmään, joten kopio seuraa kaikkea mitä
     * alkuperäisessä tapahtuu — myös bittikarttaruutuja, laattoja ja
     * nappulaa — ilman että mitään piirretään toiseen kertaan. Kopiosta
     * ei voi napauttaa mitään, koska tapahtuma osuisi <use>-elementtiin
     * eikä sen sisältöön; siksi napautettavat kohderenkaat monistetaan
     * erikseen oikeina elementteinä (piirraKohteet).
     *
     * Vain oikealle: vieritys pidetään välillä [-leveys, 0), jolloin
     * näkyvä alue on aina [0, leveys + ruudullinen]. Vasemmalle
     * puolelle ei siis koskaan katsota.
     */
    if (this.kartta.kiertava()) {
      root.setAttribute('id', 'lauta-sisalto');
      const kopio = el('use', {
        class: 'lauta-kierto',
        transform: `translate(${pack.map.width}, 0)`,
        'pointer-events': 'none',
      }, this.svg);
      kopio.setAttribute('href', '#lauta-sisalto');
      this.laudanKierto = kopio;
    } else {
      this.laudanKierto = null;
    }

    /*
     * Pergamentin pohja ENSIMMÄISENÄ ja rasteroitavan taideryhmän
     * ULKOPUOLELLE.
     *
     * Tämä on se kerros, joka takaa ettei sivun taustapaperi pilkota
     * laudan takaa millään ruudun muodolla (omistajan vaatimus
     * 17.8.2026). Se ei voi olla taideryhmässä: yleiskuvassa taide on
     * bittikarttapyramidin pohjataso, joka kattaa vain laudan ja 12 %
     * sen ympäriltä, ja vektorit poistetaan heti sen valmistuttua.
     * Perustelut kokonaisuudessaan js/mapart.js paperinPohja.
     */
    drawPaperPohja(svg, pack.map, maarittelyt);

    /*
     * Kartan raskas, muuttumaton osa omaan ryhmäänsä.
     *
     * Pergamentti, mantereet, aallot, maasto ja koristeet eivät muutu
     * pelin aikana, ja niitä on ylivoimaisesti eniten: yhdistetyllä
     * laudalla noin 6500 elementtiä 7200:sta. Ne muutetaan piirron
     * jälkeen yhdeksi kuvaksi, jotta panorointi ei joudu piirtämään
     * niitä uudelleen joka kehyksellä.
     */
    const staattinen = el('g', { class: 'staattinen' }, root);
    const taide = { appendChild: (node) => staattinen.appendChild(node) };

    drawParchment(taide, this.game.pack.map);
    // Pallonpuoliskokartalla kehykset ja asteverkko piirtyvät maiden alle.
    drawHemisphereFrames(taide, pack.map);
    drawLand(taide, pack.map);
    // Korkeusvyöhykkeet, joet ja järvet maan päälle mutta reittien ja
    // kaupunkien alle: maiseman piirre, ei pelielementti. Nimi on
    // drawMaasto eikä drawTerrain, koska jälkimmäinen on varattu
    // maastosymboleille (puut, vuoret, dyynit) — eri asia.
    //
    // Varjostus tulee tässä erikseen samasta syystä kuin MERISYVYYS:
    // se on laudalle projisoitua aineistoa, jota on vain
    // maailmankartalla, eikä se mahdu koneen kirjoittamaan
    // maailmankartta.js:ään ilman että koostajan seuraava ajo pyyhkii sen.
    // Nimiaineisto neljäntenä: siitä drawMaasto poimii pääjoet
    // (tärkeys 1) pohjakartalle järvien tyyliin (omistajan toive
    // 10.8.2026). Muilla laudoilla null — ei jokia, ei maksua.
    drawMaasto(
      taide,
      pack.map,
      pack.id === 'maailmankartta' ? MAASTON_VARJOSTUS : null,
      pack.id === 'maailmankartta' ? MAAILMANKARTAN_NIMET : null,
    );

    /*
     * Linssikerros: staattisen karttakuvan päällä, kaupunkien alla.
     *
     * JUURIRYHMÄN SISÄÄN, koska kiertävä kartta saa sisällön ilmaiseksi:
     * <use href="#lauta-sisalto"> on elävä viittaus ja seuraa kaikkea
     * mitä juuriryhmään lisätään. Suoraan this.svg:hen lisätty kerros ei
     * näkyisi sauman toisella puolella lainkaan.
     *
     * TÄHÄN KOHTAAN, koska lapsijärjestys on g.staattinen →
     * clipPath#maa-rajaus → g.country-borders → g.country-names →
     * g.cities → rect.grain → nappulat. Linssi on siis koko
     * bittikarttakartan päällä mutta kaupunkien, nimien, laattojen,
     * kohderenkaiden ja nappuloiden alla: linssi selittää maailmaa, se
     * ei peitä pelitilaa.
     *
     * pointer-events: none, ettei kerros syö kartan omaa
     * napautuszoomausta eikä kohderenkaiden napautuksia.
     *
     * Kerros on tyhjä, kunnes joku sytyttää linssin. Sisällön piirtää
     * js/linssit/kerros.js, jota EI tuoda tähän tiedostoon staattisesti
     * (ks. sen tiedoston alkukommentti: yhden tiedoston version kokoaja
     * vaatisi linssit MODULES-listalleen).
     */
    if (pack.map.kiertava) {
      /*
       * Rajaus sauman yli.
       *
       * Mitattu vika (js/mapart.js paperi() 24–41): jos sisältö vuotaa
       * laudan reunan yli, <use>-kopio ja alkuperäinen menevät
       * päällekkäin ja kaistale tummuu — ruudulla se näkyi pystysuorana
       * sävyrajana keskellä merta. Läpikuultava linssi tekee tasan saman:
       * peittävyys tuplaantuu siinä vyöhykkeessä. Ja sisältö todella
       * vuotaa: map.outlines ulottuu x = 12178,6 asti.
       *
       * Rajaus on juuriryhmän sisällä, joten kopio saa saman rajatun
       * sisällön siirrettynä ja kattaa tarkalleen [12000, 24000).
       */
      const rajaus = el('clipPath', { id: 'linssi-rajaus' }, root);
      /*
       * Rajaus vain VAAKASUUNNASSA.
       *
       * Kierron kaksinkertaistuminen on vaakasuuntainen ilmiö: kopio on
       * laudan leveyden päässä sivussa. Pystysuunnassa rajaus ei estä
       * mitään — se vain leikkasi pois sen, mitä linssi piirtää laudan
       * ylä- ja alapuolelle varattuun kaistaan. Topografialinssi täyttää
       * kaistan merellä, ja rajaus söi täytön: kartan yläreunaan jäi
       * pergamenttikaistale keskelle Jäämerta (omistajan havainto).
       */
      el('rect', {
        x: 0,
        y: -pack.map.height,
        width: pack.map.width,
        height: pack.map.height * 3,
      }, rajaus);
    }
    this.linssiKerros = el('g', {
      class: 'linssi',
      'pointer-events': 'none',
      ...(pack.map.kiertava ? { 'clip-path': 'url(#linssi-rajaus)' } : {}),
    }, root);

    /*
     * FOKUSKARTTA: nykyisen maan esirenderöity topografia (paketti 2,
     * js/fokuskartta.js). Kerros on TYHJÄ kunnes fokusmoodi tarvitsee
     * sen — sama malli kuin linssillä ja sumuverholla.
     *
     * TÄHÄN KOHTAAN eli linssin päälle mutta maan korostuksen,
     * sumuverhon, nimien ja kaupunkien alle: kuva on maastoa, ei
     * pelitilaa. Juuriryhmän sisään, jotta kiertävän kartan <use>-kopio
     * saa sen mukanaan.
     */
    this.fokuskarttaKerros = el('g', {
      class: 'fokuskartta', 'pointer-events': 'none',
    }, root);
    nollaaFokuskartta(this);
    /*
     * Ruutuun ankkuroidut mitat nollille laudan mukana: kartuutsin
     * teksti ja mittajanan pituus riippuvat laudasta, ja vanhat
     * elementit jäisivät muuten .map-paneen roikkumaan uuden laudan
     * päälle. Ne rakennetaan uudelleen ensimmäisellä päivityksellä.
     */
    nollaaFokusmitat(this);

    /*
     * Etusivun kulkevat valopisteet. Vain aloituslaudalla; render()
     * irrottaa kerroksen puusta heti kun peli alkaa.
     *
     * Liikkeen vähennystä toivovalle kerros rakennetaan silti, mutta
     * pelkkinä hentoina pohjaviivoina ilman yhtäkään animaatiota
     * (ks. piirraAlkuReitit). Ennen kerros jäi silloin kokonaan
     * tekemättä ja etusivu oli asetuksen kanssa tyhjä — juuri se, mitä
     * omistaja kuvaili näkevänsä kaikilla laitteillaan.
     */
    this.alkuReittiJuuri = root;
    this.alkuReittiPaikka = null;
    this.alkuReittiKerros = pack.id === 'maailma' ? this.piirraAlkuReitit(root) : null;

    // Nykyisen maan korostus (hento sävy + nimi kaunolla) piirretään tähän
    // kerrokseen pelin edetessä (drawCountryBorders). Sävy rajataan
    // tyylitellyn rantaviivan sisään, ettei se valu mereen — maiden
    // todelliset rannikot poikkeavat piirretystä.
    if (pack.map.countryShapes) {
      const clip = el('clipPath', { id: 'maa-rajaus' }, root);
      for (const outline of pack.map.outlines) {
        const d = `M${outline.map(([x, y]) => `${x},${y}`).join(' L')}Z`;
        el('path', { d }, clip);
      }
    }
    this.countryLayer = el('g', { class: 'country-borders', 'clip-path': 'url(#maa-rajaus)' }, root);
    /*
     * FOKUSMOODIN SUMUVERHO (omistaja 24.8.2026, Raamatun osio
     * "Fokusmoodi": *"nykyinen maa tarkkana topografioineen; käymättömät
     * maat himmeinä ja epäterävinä"*).
     *
     * KERROS ON TYHJÄ, KUNNES FOKUSMOODI TARVITSEE SEN — sama malli kuin
     * linssikerroksella yllä. Sisällön rakentaa paivitaFokusSumu, ja se
     * tekee työn vain kun käytyjen maiden joukko muuttuu.
     *
     * TÄHÄN KOHTAAN, koska verho kuuluu maan korostuksen päälle mutta
     * kaupunkien, laattojen, kohderenkaiden ja nappuloiden ALLE: se
     * himmentää maailmaa, se ei saa peittää pelitilaa eikä syödä
     * kohderenkaiden napautuksia. Siksi myös pointer-events: none.
     *
     * JUURIRYHMÄN SISÄÄN, jotta kiertävän kartan <use>-kopio saa verhon
     * mukanaan — muuten sauman toisella puolella ei sumentuisi mikään.
     * Verho on tarkalleen laudan kokoinen (0..width, 0..height) eikä
     * vuoda reunan yli, joten kopio ja alkuperäinen eivät mene
     * päällekkäin (ks. linssikerroksen rajausperustelu yllä).
     */
    this.fokusKerros = el('g', { class: 'fokus-sumu', 'pointer-events': 'none' }, root);
    /*
     * MERENPOHJAN RAJAUS ON POISTETTU YHDESSÄ SYVYYSVYÖHYKKEIDEN KANSSA.
     *
     * Rajaus oli laudan kokoinen `evenodd`-polku, johon koottiin koko
     * rantaviiva (317 000 merkkiä), ja se arvioitiin uudelleen joka kerta
     * kun lähivesi piirrettiin — eli joka panorointiaskeleella. Se oli
     * olemassa vain siksi, että syvyysvyöhykkeet eivät valuisi maalle;
     * kun vyöhykkeitä ei piirretä (ks. this.merisyvyys), sillä ei ole
     * mitään rajattavaa.
     *
     * `maa-rajaus` yllä jää: se on eri raja eri tarkoitukseen (maan
     * korostussävy pysyy rannan sisällä) ja se koskee vain yhtä maata
     * kerrallaan.
     */
    this.meriRajaus = null;
    /*
     * Nimi piirretään leikkaamattomaan kerrokseen: maan todellinen
     * keskipiste voi osua tyylitellyn rannikon ulkopuolelle, eikä
     * kaunokirjoituksen saa katketa siihen.
     *
     * Kerros luodaan tässä mutta NOSTETAAN kaupunkien päälle heti kun
     * kaupunkikerros on olemassa (ks. root.appendChild alempana).
     * Omistajan bugilöydös 9.8.2026: Ateenassa Kreikan kyltistä näkyi
     * vain kirjainten häntä kaupunginnimen takaa, eikä i-nappia
     * erottanut lainkaan. Kyltti on nappi, jota pelaajan on määrä
     * painaa — se ei voi jäädä koristeen alle. Koneellinen mittaus
     * kertoi, ettei kyse ollut yhdestä maasta: Euroopan 29 maasta
     * 15:llä kaupungin nimi peitti kylttiä, ja kuudella peitto osui
     * i-nappiin asti. Pelkkä ankkurin siirto olisi korjannut yhden
     * ruudun ja jättänyt loput.
     */
    this.countryNameLayer = el('g', { class: 'country-names' }, root);
    /*
     * Maastonimet: joet, järvet ja vuoristot kaunokirjoituksella.
     *
     * JUURIRYHMÄN ULKOPUOLELLE, toisin kuin muut kerrokset: ks.
     * maastonimiKerros alempana. Nimi on merkintä kartalla eikä osa
     * maastoa, joten kierron kopio ei saa kirjoittaa sitä toiseen
     * kertaan.
     *
     * ELÄVÄÄN PUUHUN eikä staattiseen taiteeseen, koska nimet muuttuvat
     * zoomin mukana: mikä nimi näkyy ja minkä kokoisena riippuu siitä
     * mitä ruudulla juuri nyt on (ks. drawMaastonimet). Bittikartassa ne
     * jäätyisivät ensimmäisen piirron mittakaavaan.
     *
     * Nimiaineisto on toistaiseksi vain maailmankartalla: se on
     * projisoitu juuri tälle laudalle (tools/tee-maastonimet.mjs).
     * Muilla laudoilla kerros jää tyhjäksi eikä maksa mitään.
     */
    this.maastonimet = pack.id === 'maailmankartta' ? MAAILMANKARTAN_NIMET : null;
    /*
     * Lähikuvan vesi maastonimien ALLE.
     *
     * Nimi on luettava veden päältä. Jos kerrokset olisivat toisin
     * päin, uoman vaalea valojuova kulkisi juuri joen nimen yli — ja
     * juuri siinä kohtaa, missä nimi on, koska nimi piirretään uoman
     * mukaan.
     */
    /*
     * MERISYVYYS POIS KÄYTÖSTÄ.
     *
     * Vyöhykkeet olivat neljän raportin lähde: sinistä maalla, maan sävy
     * eri zoomeilla, ja lopulta tökkivä vieritys. Mitattu matkan varrella:
     * rajaus poistaa vuodosta vain noin 40 %, koska syvyysaineisto on
     * karkeampaa kuin rannikko eikä kahden eri tarkkuuden rajaa saa
     * osumaan yhteen pikselilleen; peittävyys jouduttiin pudottamaan
     * kolmasosaan (0,07), jolloin kerros ei enää juuri näy — mutta se
     * maksaa yhä 82 polkua ja 317 000 merkin rajauspolun uudelleen joka
     * panorointiaskeleella.
     *
     * Hinta on siis täysi ja hyöty lähes olematon. Aineisto ja piirtäjä
     * jäävät paikalleen: tämän rivin palauttaminen tuo vyöhykkeet
     * takaisin, jos ne joskus halutaan omalla saumallaan projisoituina.
     */
    this.merisyvyys = null;
    // Lähivesikerrosta ei luoda: vesi on omassa linssissään.
    this.lahivesiKerros = null;
    this.lahivesiTunniste = null;
    /*
     * MAASTONIMET JUURIRYHMÄN ULKOPUOLELLE — YKSI NIMI, EI KAHTA.
     *
     * Kaikki muu piirretään `root`iin, jonka kiertävä kartta monistaa
     * <use>-kopiona laudan leveyden verran oikealle. Vedelle ja maalle se
     * on juuri oikein: molemmat puolet ovat samaa maastoa. NIMELLE SE EI
     * OLE. Nimi on merkintä kartalla, ei osa maastoa, ja kopio kirjoitti
     * sen toistamiseen — omistaja: "Joen nimi vain kerran. Nyt lukee
     * monta kertaa."
     *
     * Kerros on nyt `this.svg`:n suora lapsi eli <use>-kopion sisar. Se
     * liikkuu ja skaalautuu yhä kartan mukana, koska panorointi tehdään
     * viewBoxilla eikä ryhmän muunnoksella. Sauman yli menevän nimen
     * paikan hoitaa jo `saumasiirto` (js/mapart.js), joten kopiota ei
     * tarvita mihinkään.
     */
    this.maastonimiKerros = el('g', { class: 'maastonimet' }, this.svg);
    // Fokusvirran kuvavinjetit: oma kerros, sama juuriryhmän ulkopuolinen
    // paikka ja sama syy kuin maastonimillä (kopio monistaisi ne).
    // Kerroksen rakentaa js/fokusvirta.js paivitaFokuskuvat.
    this.fokuskuvatKerros = null;
    nollaaFokuskuvat(this);
    nollaaFokuskohteet(this);
    nollaaFokuspiste(this);
    // Uusi lauta, tyhjä kerros: muistettu näkymätunniste ei saa jäädä
    // voimaan, tai nimet jäisivät piirtymättä kun sama näkymä palaa.
    this.maastonimiTunniste = null;
    this.countryKey = null;
    // Sama syy kuin countryKeyllä: uusi lauta, tyhjä sumukerros — muistettu
    // maajoukko jättäisi verhon rakentamatta uudelle laudalle.
    this.fokusAvain = null;
    drawWaves(taide, pack.map, [
      { x: decor.compass.x, y: decor.compass.y, r: decor.compass.r + 45 },
      ...decor.waveSkip,
    ]);
    drawTerrain(taide, pack.map, this.kartta.mapObstacles(), decor.terrainBands);
    drawCompass(taide, decor.compass.x, decor.compass.y, decor.compass.r);
    drawDoodles(taide, decor);

    // Lentoreitit kaarina.
    const air = el('g', { class: 'air-routes' }, staattinen);
    for (const route of this.game.airRoutes) {
      const a = board.cityById.get(route.a);
      const b = board.cityById.get(route.b);
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
      el('path', { d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`, class: 'air-route' }, air);
    }

    // Reitit ja askelpisteet. Merireitit kaartavat rannikon ympäri.
    /*
     * Reitit ilman suodatinta ja osana kartan kuvaa.
     *
     * SUODATIN POIS. Tämä oli v159:n vian viimeinen jäänne. Silloin
     * poistettiin #rough mantereilta, aalloilta ja maastolta, koska
     * iOS:n webapp-tila palautti suodatetun kerroksen TYHJÄNÄ eikä
     * saanut sen piirtopuskuria enää varattua. Reittikerros sai pitää
     * suodattimensa, koska se oli pieni. Yhdistetyllä laudalla se ei
     * ole pieni: kerros ulottuu Lissabonista Tokioon, ja omistajan
     * kuvakaappaus iPadilta näyttää saman oireen — kaupungit, nimet ja
     * lentoreitit näkyvät, tiet eivät.
     *
     * Heilunta piirretään nyt pisteisiin kuten rannikoillakin, jolloin
     * puskuria ei tarvita lainkaan.
     *
     * KARTAN KUVAAN. Reitit eivät muutu pelin aikana — mikään ei
     * muokkaa niitä piirron jälkeen — joten ne kuuluvat samaan kuvaan
     * kuin muu muuttumaton taide. Se poistaa ne myös panoroinnin
     * tieltä: niitä on askelpisteineen noin tuhat elementtiä.
     */
    const routes = el('g', { class: 'routes' }, staattinen);
    this.piirraReittiViivat(routes, board.edges);

    // Vakiohinta kerrotaan kerran kartan selitteessä; reitille merkitään
    // hinta vain, jos se poikkeaa vakiosta. Näin meri pysyy siistinä.
    const fares = el('g', { class: 'fares' }, staattinen);
    for (const e of board.edges) {
      if (e.type !== 'sea' || e.fee === SEA_FARE) continue;
      const mid = pointAlong(e.poly, 0.5);
      el('text', {
        x: mid.x,
        y: mid.y - 12,
        class: 'fare',
        'text-anchor': 'middle',
        transform: `rotate(${vary(`fare:${e.id}`, 2.6).toFixed(2)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)})`,
        opacity: (0.85 + hash01(`fare:o:${e.id}`) * 0.3).toFixed(2),
      }, fares).textContent = `⚓${e.fee}`;
    }

    /*
     * Nyt kaikki muuttumaton on piirretty: pergamentti, mantereet,
     * aallot, maasto, koristeet, lento- ja matkareitit askelpisteineen.
     * Ne muuttuvat yhdeksi kuvaksi, ja elävään puuhun jäävät vain
     * kaupungit, nimet, laatat, kohderenkaat ja nappulat.
     */
    this.rasteroiTaide(staattinen);

    // Selite kartan otsikon alle: alueen pinta-ala ja väkiluku isoin
    // pyöristyksin — pelkät numerot ja viivasymbolit (omistajan toive;
    // matkustushinnat poistuivat selitteestä). Rivit keskitetään
    // mittaamalla, koska symboli istuu tekstin vasemmalla puolella.
    const tunnus = LAUTA_TUNNUSLUVUT[pack.id];
    if (tunnus) {
      // Yksi rivi (omistajan toive): symbolit ja luvut ladotaan peräkkäin
      // mitaten, ja koko rivi keskitetään lopuksi otsikon alle.
      const osat = [
        { teksti: tunnus.ala, ikoni: '<rect x="1" y="1" width="12.6" height="12.6" rx="1.8"/><path d="M1 9.4l3.4-3 2.6 2.2 3.2-3.6 3.4 2.6"/>' },
        { teksti: tunnus.vaki, ikoni: '<circle cx="7.3" cy="4.1" r="2.7"/><path d="M2 13.4c.7-3.4 2.7-5.1 5.3-5.1s4.6 1.7 5.3 5.1"/>' },
      ];
      const g = el('g', { class: 'map-tunnus' }, root);
      const y = decor.mapLabelPos.y + 44;
      let x = 0;
      for (const osa of osat) {
        const kuvake = el('g', {
          class: 'map-tunnus-ikoni',
          transform: `translate(${x.toFixed(1)}, ${y - 12.5})`,
        }, g);
        kuvake.innerHTML = osa.ikoni;
        const teksti = el('text', {
          x: x + 19, y, class: 'map-legend', 'text-anchor': 'start',
        }, g);
        teksti.textContent = osa.teksti;
        x += 19 + teksti.getComputedTextLength() + 24;
      }
      const bb = g.getBBox();
      g.setAttribute('transform',
        `translate(${(decor.mapLabelPos.x - bb.width / 2 - bb.x).toFixed(1)}, 0)`);
    }

    // Kaupungit ja nimet.
    const cities = el('g', { class: 'cities' }, root);
    // Kaupunkilaudalla solmut ovat pienempiä: mittakaava on kortteleissa.
    const nodeScale = pack.style === 'city' ? 0.82 : 1;
    /*
     * FOKUSMOODIN MAATUNNISTE JOKAISEEN KAUPUNGIN OSAAN (omistaja
     * 24.8.2026). Fokusmoodissa käymättömän maan datakerros katoaa
     * kartalta kokonaan, ja "datakerros" on tässä juuri se, mitä
     * kaupungista piirretään: laatta, rantarengas, porttikehä,
     * lentokoneen merkki ja nimi.
     *
     * TUNNISTE ON MÄÄRE EIKÄ LUOKKA, koska luokka on jo varattu
     * ulkoasulle (city, city-start, city-label, kehittäjän
     * valmiusvärit) eikä siihen mahdu maakoodia sotkematta olemassa
     * olevia valitsimia. Määreellä fokuskerros löytää joka osan yhdellä
     * querySelectorAllilla ja jättää tyylit rauhaan.
     *
     * PIIRTO EI PÄÄTÄ NÄKYVYYTTÄ. Merkintä tehdään aina, myös
     * fokusmoodin ollessa pois päältä: kartta piirretään kerran laudan
     * vaihtuessa, mutta käytyjen maiden joukko kasvaa joka
     * kaupungissa. Näkyvyyden ratkaisee paivitaFokusKerros joka
     * piirrossa — ilman tätä uusi maa tarkentuisi vasta seuraavassa
     * laudanvaihdossa.
     *
     * Laudoilla ilman cityCountry-taulua määre jää pois ja koko
     * fokuskerros on hiljaa tekemättä mitään.
     */
    const fokusMaat = pack.map.cityCountry ?? null;
    /*
     * KAUPUNGIN TUNNUS SAMAAN KYYTIIN (v1097, *"Ota pallot pois"*).
     * Fokuslehden päältä piilotetaan laatat mutta ei nimiä, ja
     * nykyisen kaupungin laatta tuodaan takaisin aarrevaiheessa —
     * molempiin tarvitaan tieto siitä, KENEN osa tämä on. Sama määre
     * kuin maakoodi, samasta syystä (luokat ovat varattuja ulkoasulle).
     *
     * KAUPUNGIN KESKIPISTE MYÖS MÄÄREENÄ. Fokusnäkymässä nykyisen
     * kaupungin osat kutistetaan ruudulla vakiokokoisiksi
     * (paivitaFokusLaatta), ja kutistus on skaalaus KESKIPISTEEN
     * ympäri. Piste ei löydy osista itsestään: laatalla on cx/cy,
     * lentokoneen merkillä x/y viisi yksikköä alempana, ja jokaisella
     * on lisäksi oma heilunta-muunnoksensa. Yksi määre kertoo sen
     * kaikille samalla tavalla.
     */
    const fokusMaare = (c) => {
      const iso = fokusMaat?.[c.id];
      return iso
        ? { 'data-fokus-maa': iso, 'data-kaupunki': c.id, 'data-kx': c.x, 'data-ky': c.y }
        : {};
    };
    /*
     * KEHITTÄJÄN VÄRILAATTAKOODIT ON POISTETTU (omistajan tilaus
     * 26.8.2026: *"Poista pelistä muuten kaikki värilaattakoodit, jotka
     * olivat aiemmin, jotta pystyin seuraamaan kaupunkien
     * rakennusvaiheita pelissä."*).
     *
     * Kartan laatat värjättiin kehittäjätilassa lehden valmiusasteen
     * mukaan (vihreä/kirkkaanvihreä/valkoinen/harmaa, js/ui.js
     * valmiusLuokka) ja herokuvien viiteankkuroinnin mukaan (oranssi,
     * viiteLuokka). Sama tieto on yhä luettavissa siellä, missä se on
     * taulukkona tarkempaakin: Tilastot-taulussa
     * (js/tyohuone-tilastot.js lehtiValmius, viitekuvaTila) — kartalta
     * se on nyt poissa, myös kehittäjätilassa. Laatan luokka on siis
     * pelkkä `city`/`city-start` joka tilassa.
     */
    for (const c of board.cities) {
      const wobble = `rotate(${vary(`city:rot:${c.id}`, 12).toFixed(1)} ${c.x} ${c.y})`;
      const base = (c.start ? 20 : 11.6) * nodeScale;
      const rx = base + vary(`city:rx:${c.id}`, 0.7);
      const ry = base + vary(`city:ry:${c.id}`, 0.7);
      const fokus = fokusMaare(c);
      /*
       * LAATAN OMA TUNNUS AINA MUKANA, myös laudan ulkopuolisille
       * kaupungeille. Löydetyn kaupungin laatta vaihtaa väriä
       * (merkitseAarreLaatat) — ja värjäys tarvitsee tiedon siitä,
       * kenen laatta tämä on. Maatunniste (data-fokus-maa, data-kx,
       * data-ky) jää fokusMaareen: se tulee laudan kaupunki–maa-
       * taulusta, jota kaikilla kaupungeilla ei ole.
       */
      const tunnus = { 'data-kaupunki': c.id };
      if (c.start) {
        el('ellipse', {
          cx: c.x, cy: c.y, rx, ry, transform: wobble, class: 'city-start',
          ...tunnus, ...fokus,
        }, cities);
        el('ellipse', {
          cx: c.x, cy: c.y, rx: rx * 0.6, ry: ry * 0.6, transform: wobble, class: 'coast-soft',
          ...tunnus, ...fokus,
        }, cities);
      } else {
        el('ellipse', {
          cx: c.x,
          cy: c.y,
          rx,
          ry,
          transform: wobble,
          'stroke-width': (2.2 + hash01(`city:sw:${c.id}`) * 0.7).toFixed(2),
          class: 'city',
          ...tunnus, ...fokus,
        }, cities);
      }
      // Porttikaupungista lähtee pitkä lento toiselle laudalle: kaksoiskehä
      // erottaa sen tavallisesta lentokentästä jo kartalta katsottaessa.
      if (this.game.isGateway(c)) {
        const gr = base + 9;
        el('ellipse', {
          cx: c.x,
          cy: c.y,
          rx: gr + vary(`gate:rx:${c.id}`, 1.1),
          ry: gr + vary(`gate:ry:${c.id}`, 1.1),
          transform: wobble,
          class: 'city-gate',
          ...tunnus, ...fokus,
        }, cities);
      }
      if (c.airport) {
        el('text', {
          x: c.x,
          y: c.y + 5,
          class: 'airport',
          'text-anchor': 'middle',
          ...tunnus, ...fokus,
        }, cities).textContent = '✈';
      }
      const anchor = c.la ?? 'middle';
      const dx = c.lx ?? 0;
      const dy = c.ly ?? -(c.start ? 28 : 19);
      const lx = c.x + dx;
      const ly = c.y + dy + vary(`label:y:${c.id}`, 1.2);
      const label = el('text', {
        x: lx,
        y: ly,
        class: c.start ? 'city-label start-label' : 'city-label',
        'text-anchor': anchor,
        transform: `rotate(${vary(`label:rot:${c.id}`, 1.1).toFixed(2)} ${lx.toFixed(1)} ${ly.toFixed(1)})`,
        opacity: (0.92 + hash01(`label:o:${c.id}`) * 0.08).toFixed(2),
        ...tunnus, ...fokus,
      }, cities);
      label.textContent = c.name;
    }

    // Paperin rakeisuus ja tummuvat reunat piirretään kartan päälle mutta
    // liikkuvien kerrosten ALLE. Aiemmin tämä oli päällimmäisenä, ja koska
    // rakeisuus sekoittuu multiply-tilassa, selain joutui lukemaan taustan
    // takaisin ja sekoittamaan uudelleen joka kerta kun nappula, laatta tai
    // lentokone liikkui sen alla. Kartta näyttää samalta, mutta liikkuvat
    // osat eivät enää maksa koko ruudun sekoitusta.
    drawPaperOverlay(svg, this.game.pack.map);

    /*
     * countryNameLayer jää maatiedot-tilan käyttöön; perustilassa se
     * on TYHJÄ. Maan nimikilpi muutti kartalta kartan kehykselle
     * (paivitaMaaPilleri, Fable maxin analyysi 10.8.2026): kartalle
     * piirretty kyltti peitti kaupunkeja ja nappulaa joka zoomilla,
     * koska sen geometria on kiinteä laudan yksiköissä. Kerros
     * pidetään yhä kaupunkien päällä maatiedot-tilaa varten.
     */
    root.appendChild(this.countryNameLayer);

    /*
     * MATKAREITIT ATLAKSEN PÄÄLLE (omistajan pelitestipalaute v1119,
     * kohta 16: *"nopan heiton jälkeen nappula askeltaa NÄKYVÄSTI piste
     * pisteeltä (entinen askellusanimaatio; reittipisteet ja nappula
     * piirtyvät atlas-kerroksen päälle)"*).
     *
     * JUURISYY. Laudan reittiverkko — katkoviivat ja askelympyrät —
     * asuu laudan omassa bittikartassa (js/mapart.js), ja fokusmoodissa
     * koko lauta on piilossa atlaslehtien alla (css
     * body.fokus-atlas-nakyma .staattinen). Nappula siis liikkui kuten
     * ennenkin, mutta se askelsi tyhjän paperin yli: askelpisteitä ei
     * ollut näkyvissä, eikä liikkeestä nähnyt reittiä. Sama muutos
     * (v1115, vanha kartta pois) vei myös sen, mihin askel osui.
     *
     * Kerros on kaupunkien PÄÄLLÄ ja laattojen ALLA: reitti on kartan
     * merkintä, ei pelimerkki.
     */
    this.matkaLayer = el('g', { class: 'matkareitit', 'pointer-events': 'none' }, root);
    this.tokenLayer = el('g', { class: 'tokens' }, root);
    this.targetLayer = el('g', { class: 'targets' }, root);
    this.pawnLayer = el('g', { class: 'pawns' }, root);
    /*
     * NÄKYMÄTÖN NAPAUTUSALUE NYKYISEN KAUPUNGIN LAATALLE. Fokusmoodissa
     * Tutki poistui alariviltä ja sen toiminto on laatan napautuksessa
     * (paivitaFokusLaatta), mutta laatta piirtyy pienenä — alue on siksi
     * oma ympyränsä eikä laatta itse. Kohderenkaiden PÄÄLLÄ, jotta
     * napautus osuu siihen eikä alla olevaan kehittäjätilan hyppyyn;
     * muiden kaupunkien alueet jäävät koskematta.
     */
    this.fokusLaattaKerros = el('g', { class: 'fokuslaatta' }, root);
    this.fokusLaattaAvain = null;
    this.fokusLaattaOsat = [];
    // Lentoanimaatio piirtyy kaiken päälle: kone ja sen perässä kulkeva viiva.
    this.flightLayer = el('g', { class: 'flight' }, root);
  }

  /**
   * Korostaa maan, jossa pelaaja on: alue sävytetään aavistuksen
   * tummemmaksi ja rajattu punamullanvärisellä ääriviivalla — samalla
   * värillä, jolla 1800-luvun atlakset piirsivät valtionrajat. Maan
   * nimi näkyy kartan kehyksen pillerissä (paivitaMaaPilleri), ei
   * kartalla. Reitillä (kaupunkien välissä) edellinen korostus jää
   * näkyviin, kunnes seuraava kaupunki vaihtaa maata — kartta ei vilku.
   */
  drawCountryBorders() {
    if (!this.countryLayer) return;
    const map = this.game.pack.map;
    const city = this.game.cityOf();
    const iso = city ? map.cityCountry?.[city.id] : null;
    if (!iso) return;
    const key = `${this.game.pack.id}:${iso}`;
    if (this.countryKey === key) return;
    /*
     * Onko tämä UUSI maa vai sama maa uudestaan piirrettynä?
     *
     * countryKey nollautuu aina kun lauta rakennetaan uusiksi
     * (drawBoard), joten se ei kelpaa animaation ehdoksi: pelin lataus
     * ja kartan uudelleenrakennus näyttäisivät sen valossa
     * maanvaihdolta. viimeMaa muistaa maan laudan piirtojen yli ja on
     * tyhjä vain istunnon ensimmäisellä kerralla — silloin ääriviiva on
     * heti valmis eikä piirry.
     */
    const uusiMaa = Boolean(this.viimeMaa) && this.viimeMaa !== key;
    this.viimeMaa = key;
    this.countryKey = key;
    this.countryLayer.textContent = '';
    this.countryLayer.classList.remove('maa-piirtyy', 'maa-asettuu');
    this.countryNameLayer.textContent = '';
    const maa = map.countryShapes?.[iso];
    this.paivitaMaaPilleri(maa, iso);
    if (!maa) return;
    const renkaat = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`);
    el('path', { d: renkaat.join(' '), class: 'country-tint' }, this.countryLayer);
    /*
     * Ääriviiva countryLayeriin, jolloin maa-rajaus-clip katkaisee sen
     * tyyliteltyyn rantaan — merelle ei valu mitään.
     *
     * Jokainen rengas on OMA polkunsa (ennen kaikki olivat yhdessä
     * d-määreessä). Saaristomaassa se on animaation ehto: yhtenä
     * polkuna viivan viiva-aukkokuvio jatkuisi renkaasta toiseen ja
     * saaret piirtyisivät jonossa, omina polkuinaan ne piirtyvät
     * rinnakkain kukin oman pituutensa mukaan.
     */
    const polut = renkaat.map((d) => el('path', { d, class: 'country-korostus' },
      this.countryLayer));
    /*
     * PIILOTETTUA ÄÄRIVIIVAA EI ANIMOIDA (28.8.2026, sama tutkinta kuin
     * css: body.fokus-atlas-nakyma .country-korostus). Atlasnäkymässä
     * viiva on display: none, mutta piirtoanimaatio ajettiin silti:
     * jokaiselle renkaalle getTotalLength (asettelun luku) ja kaksi
     * WAAPI-animaatiota, saaristomaassa kymmeniä — työtä, jota kukaan
     * ei näe. Viiva on valmiina paikallaan, jos näkymästä joskus
     * poistutaan.
     */
    if (uusiMaa && !this.vanhaLautaPiilossa()) this.animoiMaanAariviiva(polut, key);
  }

  /**
   * Reittiviivat ja askelpisteet annettuun säiliöön.
   *
   * OMANA METODINAAN, koska reitit piirretään kahteen paikkaan: laudan
   * kuvaan (drawBoard, koko lauta kerralla) ja fokuskartan päälle
   * (js/fokuskartta.js, vain rajaukseen osuvat reitit). Jälkimmäinen
   * tarvitaan siksi, että esirenderöity maastokuva liimataan laudan
   * bittikartan päälle ja peittäisi muuten alleen jäävät tiet — reitit
   * ovat pelitilaa, eikä pelitila saa jäädä kuvituksen alle.
   *
   * Yksi kopio piirtosäännöistä: heilunta, läpikuultavuus ja
   * askelpisteiden hajonta lasketaan reitin tunnuksesta, joten sama
   * reitti näyttää molemmissa kerroksissa täsmälleen samalta.
   */
  piirraReittiViivat(sailio, reitit) {
    for (const e of reitit) {
      const d = kasinPiirretty(e.poly, 2)
        .map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
      el('path', {
        d,
        class: `route route-${e.type}`,
        opacity: (0.82 + hash01(`route:${e.id}`) * 0.36).toFixed(2),
      }, sailio);

      for (let i = 1; i < e.steps; i++) {
        const key = `${e.id}:${i}`;
        // Askelmat eivät ole tasavälein eivätkä täysin samankokoisia.
        const t = (i + vary(`${key}:t`, 0.09)) / e.steps;
        const { x, y } = pointAlong(e.poly, Math.min(Math.max(t, 0.04), 0.96));
        const r = 5.3 + hash01(`${key}:r`) * 1.5;
        el('ellipse', {
          cx: x + vary(`${key}:x`, 1.6),
          cy: y + vary(`${key}:y`, 1.6),
          rx: r,
          ry: r * (0.86 + hash01(`${key}:ry`) * 0.24),
          transform: `rotate(${vary(`${key}:rot`, 40).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})`,
          opacity: (0.72 + hash01(`${key}:o`) * 0.5).toFixed(2),
          class: `step step-${e.type}`,
        }, sailio);
      }
    }
  }

  /* --- FOKUSMOODI (omistajan linjaus 24.8.2026) --------------------- */

  /**
   * Mitkä maat ovat kartalla tarkkoja?
   *
   * KÄYDYT KAUPUNGIT RATKAISEVAT, EI PASSI. Passin leimat (js/passport.js)
   * ovat lautatasoisia ja säilyvät pelikertojen yli, joten niistä
   * johdettu fokus olisi heti koko maailman laajuinen. Kartoituksen
   * suositus on siksi pelitallenteen `world.visited`: fokus seuraa juuri
   * tätä matkaa, kuten isoisän päiväkirjakin.
   *
   * NYKYINEN SIJAINTI ON AINA MUKANA, vaikka kaupunkia ei olisi vielä
   * kirjattu käydyksi (visitCity ehtii kirjata vasta saapumisen
   * jälkeen). Ilman tätä pelaaja seisoisi hetken sumun sisällä.
   *
   * Palauttaa null, jos laudalla ei ole maataulukkoa — silloin koko
   * fokuskerros jää tekemättä eikä vanhoille laudoille tapahdu mitään.
   */
  fokusMaat() {
    const map = this.game.pack.map;
    const cityCountry = map?.cityCountry;
    /*
     * MOLEMMAT TAULUT TAI EI KUMPAAKAAN. Kaupunki–maa-taulu riittäisi
     * datakerroksen piilottamiseen, mutta ilman maiden muotoja
     * (countryShapes) sumuverhoa ei voi rakentaa — ja silloin kartalta
     * vain katoaisi kaupunkeja ilman että mikään kertoisi miksi. Osa
     * laudoista on yhä ilman muotoja (kirjattu inventaarioon), joten
     * ehto ei ole teoreettinen. Ne jäävät fokusmoodissa ennalleen.
     */
    if (!cityCountry || !map.countryShapes) return null;
    const maat = new Set();
    for (const cityId of this.game.world?.visited ?? []) {
      const iso = cityCountry[cityId];
      if (iso) maat.add(iso);
    }
    const city = this.game.cityOf();
    const nyt = city ? cityCountry[city.id] : null;
    if (nyt) maat.add(nyt);
    return maat;
  }

  /**
   * KEHITTÄJÄN MAAILMANÄKYMÄ PÄÄLLÄ JUURI NYT? (omistajan tilaus
   * 27.8.2026, js/ui-apurit.js osio "KEHITTÄJÄN YKSI YLÄRIVIN NAPPI".)
   *
   * Yksi kysymys, johon koko näkymä nojaa neljässä paikassa: verho
   * (fokusSumuPaalla), käymättömän maan datakerros ja lehden päällä
   * olevat pelimerkit (paivitaFokusKerros, paivitaFokusPallot) sekä
   * kameran vapaus (js/kartta.js panorointiVapaa, fokusRajaukset).
   *
   * KATSELUTILA EI OLE KEHITTÄJÄN NÄKYMÄ. Linkillä avattu lauta
   * (?lauta=) on laudan esittelyä lukijalle, eikä kehittäjän kytkin saa
   * muuttaa sitä miltään osin — sama raja kuin fokusmoodin muillakin
   * kerroksilla.
   */
  maailmanakyma() {
    return Boolean(this.kehittajaTila && this.kehittajaMaailma && !this.katselu);
  }

  /**
   * Onko sumuverho päällä juuri nyt?
   *
   * KAKSI EHTOA. Fokusmoodi päällä ja peli oikeasti käynnissä.
   * Jälkimmäinen on tärkeämpi: aloitusruudulla (phase 'pickstart')
   * maailmaa vielä katsellaan kokonaisuutena eikä yhtään kaupunkia ole
   * valittu, joten verho peittäisi koko kartan juuri silloin kun siitä
   * pitää valita lähtöpaikka. Katselutila (?lauta=) on samaa lajia: se
   * on laudan esittelyä eikä matkaa.
   */
  fokusSumuPaalla() {
    /*
     * KOLMAS EHTO: KEHITTÄJÄN MAAILMANÄKYMÄ (omistajan tilaus
     * 27.8.2026). Sumuverho on osa samaa pelaajan rajoitetta kuin
     * kameran rajaus — se kertoo, mikä maailmasta on vielä auki.
     * Maailmanäkymässä *"sama nappi poistaa sumennuksen"*: verhon alla
     * selaaminen ei ole selaamista. Näkymän ollessa pois (tai
     * kehittäjätilan ollessa pois) verho on ennallaan.
     *
     * Erillistä sumennuskytkintä ei enää ole: se oli 24.–27.8.2026
     * oma vertailunappinsa hampurilaisvalikossa, ja maailmanappi korvasi
     * sen.
     */
    if (this.maailmanakyma()) return false;
    return Boolean(this.fokusmoodi
      && !this.katselu && this.game.phase !== 'pickstart');
  }

  /**
   * NYKYISEN KAUPUNGIN MATKAREITIT NÄKYVIIN (omistajan
   * pelitestipalaute v1119, kohta 16: *"matkustamisen askellus on
   * kadonnut … reittipisteet ja nappula piirtyvät atlas-kerroksen
   * päälle"*).
   *
   * Reitti piirretään VAIN silloin, kun matka on menossa: kun
   * matkustusvalinta on auki (liukuAuki) tai kun nappula askeltaa
   * (vaihe 'roll' tai 'move'). Muulloin kerros on tyhjä — atlas on
   * lehti, ei pelilauta.
   *
   * PIIRRETÄÄN LAUDAN OMASTA MURTOVIIVASTA (board.edgeById poly), sama
   * lähde kuin matkustusrajauksella (matkustusRajaus): viiva on siis
   * täsmälleen se reitti, jota pitkin nappula kulkee.
   *
   * VÄLIASKELEET LASKETAAN KAARENPITUUDESTA, EI MURTOVIIVAN
   * PISTEISTÄ (omistajan tilaus 26.8.2026: *"Käytä alkuperäisen kartan
   * pisteitä siirtymislinjoihin ja väliaskelin. Älä ota siis karttaa
   * vaan pelkästään ne reitit ja väliaskelmaa."*).
   *
   * JUURISYY, joka omistajan kuvakaappauksessa näkyi. Murtoviivan
   * pisteet EIVÄT ole askelia: js/rules.js edgePolyline pehmentää
   * reitin Catmull–Rom-käyrällä ja tihentää sen neljääntoista
   * pisteeseen jokaista väliä kohti. Ateenan naapureilla se tekee
   * 43, 127 ja 2 pistettä — vaikka askelia on 4, 4 ja 2. Ympyrä
   * jokaisessa pisteessä tuotti siis kolme eri kieltä samalla
   * ruudulla: helminauhan (Sofia), kiehkuran siellä missä
   * pehmennyksen kaari kääntyy tiukasti (Sisilian väylä Attikan
   * niemen ympäri) ja PALJAAN KATKOVIIVAN reitillä, jonka
   * murtoviivassa on vain kaksi pistettä eli pelkät päät (Kreeta).
   *
   * Nappulan oma askel lasketaan kaarenpituudesta:
   * `pointAlong(poly, idx / steps)` (js/rules.js pixelOf). Ympyrät
   * piirretään nyt samalla kaavalla, joten ne osuvat täsmälleen
   * niihin ruutuihin, joilla nappula pysähtyy — yhtä monta joka
   * reitillä, tasavälein, myös merellä.
   */
  paivitaMatkareitit() {
    const kerros = this.matkaLayer;
    if (!kerros) return;
    const { game } = this;
    const vaiheessa = game.phase === 'roll' || game.phase === 'move';
    const naytetaan = !this.katselu && !game.player?.isBot
      && (this.liukuAuki || vaiheessa);
    /*
     * MITKÄ REITIT PIIRRETÄÄN. Kaupungissa naapurireitit, kesken
     * reittiä pelkkä se reitti, jolla nappula on — silloin muut
     * reitit eivät ole valittavissa eikä niitä siis kuulu näkyä.
     */
    const kaupunki = game.cityOf?.();
    const kesken = !kaupunki && game.player?.pos?.type === 'edge'
      ? game.player.pos.edge : null;
    const reittiTunnukset = kaupunki
      ? [...(game.board.adj.get(kaupunki.id) ?? [])]
      : (kesken ? [kesken] : []);
    const avain = naytetaan && reittiTunnukset.length
      ? `${game.pack.id}:${kaupunki?.id ?? kesken}:${game.phase}` : '';
    if (this.matkareittiAvain === avain) return;
    this.matkareittiAvain = avain;
    kerros.textContent = '';
    if (!avain) return;
    const skaala = this.nakyvaAlue()?.skaala || 1;
    for (const eid of reittiTunnukset) {
      const reitti = game.board.edgeById.get(eid);
      const poly = reitti?.poly;
      if (!poly?.length) continue;
      const d = `M${poly.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')}`;
      const viiva = el('path', {
        d,
        class: `matkareitti matkareitti-${reitti.type === 'sea' ? 'meri' : 'maa'}`,
      }, kerros);
      viiva.style.strokeWidth = (MATKAREITIN_VIIVA_PX / skaala).toFixed(2);
      const jakso = MATKAREITIN_KATKO_PX / skaala;
      viiva.style.strokeDasharray = `${(jakso * 0.5).toFixed(2)} ${(jakso * 0.5).toFixed(2)}`;
      /*
       * ASKELPISTEET: reitin väliaskeleet ympyröinä, sama kaava kuin
       * nappulan sijainnilla (js/rules.js pixelOf). Päätekaupungit
       * jäävät pois — niillä on jo oma laattansa — joten kierros on
       * 1 … steps-1. Yhden askelen reitillä (steps = 1) välipisteitä
       * ei ole lainkaan, ja silloin piirtyy pelkkä viiva; se on
       * oikein, koska sellaisella reitillä ei ole ruutua johon
       * pysähtyä.
       *
       * Vanhoilla laudoilla askelmäärä voi puuttua reitiltä; silloin
       * reitti on yhden askelen mittainen eikä ympyröitä tule.
       */
      const askelia = Math.max(1, Math.round(reitti.steps ?? 1));
      for (let i = 1; i < askelia; i += 1) {
        const { x, y } = pointAlong(poly, i / askelia);
        el('circle', {
          cx: x.toFixed(1),
          cy: y.toFixed(1),
          r: (MATKAREITIN_PISTE_PX / skaala).toFixed(2),
          class: 'matkareitti-piste',
        }, kerros);
      }
    }
  }

  /**
   * ALOITUSKARTAN KAUPUNGIT: VAIN VALITTAVAT NÄKYVIIN (omistajan
   * pelitestipalaute v1119, ks. ETUSIVUN_NAKYVAT).
   *
   * Lähtöpisteen valinnassa kartalla oli neljätoista kaupunkia
   * nimineen, laattoineen ja lentokonemerkkeineen, vaikka valittavia
   * oli tasan yksi. Kaikki muut paitsi Lontoo ja aloituskohteet
   * piilotetaan — nimi, laatta, rantarengas, porttikehä ja
   * konemerkki, eli kaupungin koko piirros.
   *
   * PIILOTUS ON LUOKKA JA VAIN NÄKYVYYTTÄ. Laudan data pysyy
   * koskemattomana, ja katselutila (?lauta=) näyttää laudan yhä
   * täytenä maailmankarttana — se on laudan esittelyä eikä valintaa.
   * Sama `display: none` -sääntö kuin .fokus-piilossa: piilossa oleva
   * osa ei saa maksaa piirtoa.
   *
   * Täkyrenkaat hoituvat itsestään: drawTargets piirtää renkaan vain
   * ETUSIVUN_KOHTEET-joukolle, joka on tämän osajoukko.
   */
  paivitaAloituskaupungit() {
    const cities = this.svg?.querySelector('.cities');
    if (!cities) return;
    const piilota = this.game.phase === 'pickstart' && !this.katselu;
    // Ilman tunnusta osaa ei voi tunnistaa kaupungikseen — silloin se
    // jää näkyviin, koska väärin piilotettu kartta on pahempi kuin
    // ylimääräinen piirros.
    for (const osa of cities.querySelectorAll('[data-kaupunki]')) {
      osa.classList.toggle('aloitus-piilossa',
        piilota && !ETUSIVUN_NAKYVAT.has(osa.dataset.kaupunki));
    }
  }

  /**
   * Fokuskerroksen tahdistus: näkyvyys kaupungeille, verho maailmalle.
   *
   * Kutsutaan joka piirrossa (render). Työ on kevyttä: määrejoukon
   * läpikäynti on yksi querySelectorAll, ja verho rakennetaan uusiksi
   * vain kun maajoukko tai kytkinten tila oikeasti muuttui.
   */
  paivitaFokusKerros() {
    if (!this.svg) return;
    this.paivitaAloituskaupungit();
    // Matkareitit atlaksen päälle liikkumisen ajaksi (v1119, kohta 16).
    this.paivitaMatkareitit();
    const maat = this.fokusMaat();
    /*
     * KÄYMÄTTÖMÄN MAAN DATAKERROS POIS KOKONAAN (Raamatun linjaus: "ilman
     * dataa — ei reittejä, kaupunkeja, kohteita"). Piilotus tehdään
     * luokalla eikä hidden-määreellä, jotta sama sääntö kattaa yhdellä
     * rivillä CSS:ää kaikki kaupungin osat.
     *
     * KOHDERENKAAT (targetLayer) JÄÄVÄT NÄKYVIIN TÄSSÄ. Ne ovat pelin
     * ainoa kartalta tehtävä valinta: jos ne katoaisivat kokonaan,
     * fokusmoodissa ei pääsisi ensimmäisestä maasta koskaan pois.
     * Lehden PÄÄLTÄ ne piilotetaan erikseen ja vain valinnan
     * ulkopuolella (paivitaFokusPallot, v1097).
     *
     * KEHITTÄJÄN MAAILMANÄKYMÄ OHITTAA PIILOTUKSEN (omistajan tilaus
     * 27.8.2026): *"KOHDEKAUPUNGIT näkyviin, jotta omistaja voi siirtyä
     * eri maiden välillä"*. Määre on VAIN kaupungin osissa — laatta,
     * rantarengas, porttikehä, lentokoneen merkki ja nimi (ks.
     * fokusMaare) — joten näkyviin tulevat kaupungit eivätkä reitit:
     * lento- ja maareitit asuvat laudan bittikartassa, joka pysyy
     * atlaksen alla piilossa (js/fokuskartta.js paivitaVanhaLauta).
     */
    const piilota = Boolean(this.fokusmoodi && maat && !this.katselu
      && this.game.phase !== 'pickstart') && !this.maailmanakyma();
    for (const osa of this.svg.querySelectorAll('[data-fokus-maa]')) {
      const ulkona = piilota && !maat.has(osa.dataset.fokusMaa);
      osa.classList.toggle('fokus-piilossa', ulkona);
    }
    this.paivitaFokusSumu(maat);
    // Maastonimet myös tässä eikä vain nimien piirrossa: maa vaihtuu
    // ilman että näkymä muuttuu (ja piirto ohittaa muuttumattoman
    // näkymän tunnisteellaan), joten muuten Alpit jäisivät kirkkaiksi
    // siihen asti kun karttaa seuraavan kerran liikutetaan.
    this.himmennaMaastonimet();
    // Maakohtainen topografiapohja ämpäristä (paketti 2). Puuttuva kuva
    // ei muuta mitään: kerros jää tyhjäksi.
    paivitaFokuskartta(this);
    // Jatkuva atlas: naapurimaiden lehdet näkymän mukaan (25.8.2026).
    // Oma karkea näkymätunniste ohittaa työn, kun mikään ei muuttunut.
    paivitaFokusAtlas(this);
    // Avauslennon reunahäivytys päälle/pois (v1119: ei neliöreunaa).
    paivitaLennonLehdet(this);
    // Lehden päällä olevat pelimerkit (v1097: "Ota pallot pois").
    this.paivitaFokusPallot();
    // Ruutuun ankkuroidut mitat (v1099: mittajana ja kartuutsi).
    paivitaFokusmitat(this);
  }

  /**
   * Atlas sai tai menetti lehden: verho on rakennettava uusiksi.
   *
   * Kutsutaan js/fokuskartta.js:stä. Verho tunnistaa muutoksen omalla
   * avaimellaan, mutta avain lasketaan vain kun tämä kutsutaan — lehti
   * saapuu verkosta piirtojen välissä, eikä mikään muu herätä verhoa.
   */
  paivitaAtlasVerho() {
    if (!this.svg || this.dead) return;
    this.paivitaFokusSumu(this.fokusMaat());
  }

  /* --- KEHITTÄJÄN MAAILMANAPPI (omistajan tilaus 27.8.2026) --------- */

  /**
   * Kehittäjän ylärivin ainoan napin kytkin (js/main.js
   * #kehittaja-maailma-btn).
   *
   * Sama kaava kuin paivitaFokusmoodilla: asetus luetaan uudestaan
   * levyltä ja näkymä tahdistetaan heti ilman sivulatausta. Nappi
   * vaikuttaa neljään kerrokseen, jotka kaikki elävät valmiin kartan
   * päällä (verho, käymättömän maan datakerros, lehden päällä olevat
   * pelimerkit, kameran rajaus) — karttaa ei tarvitse rakentaa uusiksi.
   *
   * KORVASI vanhan paivitaKehittajaNapit-kytkimen (25.8.2026), joka
   * tahdisti "rajat"- ja "pisteet"-nappien tilan. Purettu "pisteet"-
   * kerros (dev-pisteet: punaiset kaupunkipisteet ja reittiverkko
   * kuvan päälle) ei enää ole: maailmanäkymässä näkyvät laudan omat
   * kaupunkilaatat, ja reitit jäävät omistajan tilauksen mukaan pois.
   */
  paivitaKehittajaMaailma() {
    // Sama syy kuin paivitaKehittajaTilassa: suora levykirjoitus + tämä
    // tahdistin on savukevartijoiden tapa vaihtaa tila ilman latausta.
    unohdaKehittajaKytkimet();
    this.kehittajaMaailma = kehittajaMaailmaPaalla();
    /*
     * FOKUSMOODI SAMASSA KUTSUSSA: napin painallus siivoaa vanhat
     * kytkinavaimet (js/ui-apurit.js siivoaVanhatKehittajaAvaimet), ja
     * niiden joukossa on fokusmoodin avain. Ilman uudelleenlukua
     * valikosta jäänyt '0' jäisi voimaan seuraavaan sivulataukseen asti
     * — juuri se kummittelu, jonka siivous poistaa. Fokusmoodin
     * vaihtuminen vaatii myös lehtien nollauksen, kuten
     * paivitaFokusmoodissa; muuten muistettu tunniste ohittaisi työn.
     */
    const fokusEnnen = this.fokusmoodi;
    this.fokusmoodi = fokusmoodiPaalla();
    if (this.fokusmoodi !== fokusEnnen) nollaaFokuskartta(this);
    // Verho ja rajaukset seuraavat näkymää: molemmat on rakennettava
    // uusiksi, vaikka maajoukko olisi sama.
    this.fokusAvain = null;
    this.atlasAvain = null;
    this.paivitaFokusKerros();
    this.kartta?.tarkistaFokusZoom?.();
  }

  /* --- PALLOT POIS LEHDEN PÄÄLTÄ (omistaja 24.8.2026, v1097) -------- */

  /**
   * Osuuko laudan piste fokuslehden alueelle?
   *
   * Sama laatikkotesti kuin maastonimillä (himmennaMaastonimet), yksi
   * lisä: kiertävällä laudalla napautettavat osat piirretään myös
   * laudan leveyden verran oikealle (kiertoKohdat), ja kopion on
   * kadottava lehden alta samalla tavalla kuin alkuperäisen.
   */
  fokusPohjanAlla(x, y) {
    const pohja = this.fokusPohjaBbox ?? null;
    if (!pohja || !Number.isFinite(x) || !Number.isFinite(y)) return false;
    if (!(y >= pohja.y && y <= pohja.y + pohja.h)) return false;
    const kierto = this.kartta?.kiertava?.() ? (this.game.pack.map?.width ?? 0) : 0;
    const osuu = (px) => px >= pohja.x && px <= pohja.x + pohja.w;
    return osuu(x) || (kierto > 0 && osuu(x - kierto));
  }

  /**
   * Onko matkustusvalinta auki juuri nyt?
   *
   * Kaksi hetkeä, joissa pelaaja valitsee kartalta minne mennään:
   * Liiku-napin avaama lentolista (`travelExpanded`) ja nopanheiton
   * jälkeinen siirtovaihe. Kummassakin kohderenkaat ja kohteiden
   * kaupunkipisteet palaavat lehden päälle valinnan ajaksi, ja
   * katoavat heti kun valinta sulkeutuu tai matka alkaa — vaihe
   * vaihtuu tai `suljeMatkavalikko` nollaa lipun, ja seuraava render
   * piilottaa ne uudelleen.
   */
  fokusMatkavalintaAuki() {
    if (this.game.player?.isBot) return false;
    return Boolean(this.travelExpanded) || this.game.phase === 'move';
  }

  /**
   * PALLOT POIS LEHDEN PÄÄLTÄ.
   *
   * Omistajan pelitestipalaute v1097 (iPad, fokusnäkymä): *"Ota pallot
   * pois"* — laudan pyöreät pelimerkit (Ateenan laatta ja pelaajan
   * nappula päällekkäin, Kreetan valkoinen rengas) rikkovat 1873-
   * atlaksen lehden tunnelman. Lehti on kokonainen kartta, ja sen
   * päällä pelilaudan grafiikka näyttää vieraalta.
   *
   * KOLME SÄÄNTÖÄ:
   *
   *   1. OLETUS ON PIILOSSA. Lehden alueella laattojen, nappuloiden ja
   *      kohderenkaiden osat saavat luokan .fokus-lehden-alla.
   *      KAUPUNKIEN NIMET JÄÄVÄT (ATEENA, Kreeta) — ne kuuluvat
   *      lehteen, samoin kuin lehden omat painetut nimet.
   *
   *   2. MATKUSTUSVALINTA TUO KOHTEET TAKAISIN. Kun Liiku-nappi tai
   *      nopanheitto avaa valinnan, kohderenkaat ja valittavien
   *      kaupunkien pisteet syttyvät valinnan ajaksi
   *      (fokusMatkavalintaAuki + drawTargetsin kokoama joukko).
   *
   *   3. NYKYISEN KAUPUNGIN LAATTA JÄÄ AINA (omistajan pelitesti
   *      24.8.2026, v1099:n jälkeen). v1098 piilotti senkin, ja lehdeltä
   *      katosi ainoa merkki siitä, missä matkaaja seisoo. Laatta on
   *      siis lehden päällä koko ajan — mutta PIENENÄ ja ruudulla lähes
   *      vakiokokoisena (paivitaFokusLaatta). Aarrevaiheen huomioele
   *      (fokusvirtaLaattaNakyy → .fokus-laatta-esiin) säilyy
   *      ennallaan: se on yhä se hetki, jolloin pöllö osoittaa laattaa,
   *      ja samalla hetkellä myös pelinappula palaa lehden päälle.
   *
   * KEHITTÄJÄTILAN NAPAUTUS EI SAA LAKATA TOIMIMASTA. Piilotus koskee
   * vain näkyviä koristeita (.target-ring, .target-halo, kohdemerkki);
   * näkymätön osuma-alue (.target-hit) ja sen ryhmä jäävät koskematta,
   * joten doKehittajaSiirto toimii piilossa olevalla laatalla.
   *
   * PIILOTUS ON LUOKKA, EI SUODATIN. Sama iOS-sääntö kuin muillakin
   * kartan kerroksilla (tests/rules.test.mjs).
   */
  paivitaFokusPallot() {
    if (!this.svg) return;
    /*
     * KEHITTÄJÄN MAAILMANÄKYMÄ PITÄÄ MERKIT KARTALLA (omistajan tilaus
     * 27.8.2026): *"KOHDEKAUPUNGIT näkyviin, jotta omistaja voi siirtyä
     * eri maiden välillä"*. Koko tämä metodi kysyy piilotuksensa
     * lehdeltä (`pohja`), joten yksi rivi riittää: ilman lehteä mikään
     * ei ole "lehden alla" ja laatat, nimet, kiekot, nappula ja
     * kohderenkaat jäävät näkyviin sellaisinaan. Kaupunkien laatat ovat
     * juuri se, mitä omistaja napauttaa (doKehittajaSiirto).
     */
    const pohja = this.maailmanakyma() ? null : (this.fokusPohjaBbox ?? null);
    const nykyinen = pohja ? this.game.cityOf?.() : null;
    const valinta = pohja ? this.fokusMatkavalintaAuki() : false;
    const kohteet = valinta ? (this.fokusKohdeKaupungit ?? new Set()) : null;
    /*
     * Aarrevaihe (tai käännetty laatta): pöllön huomioele ja pelinappula.
     * EI ENÄÄ laatan näkyvyys — laatta jää lehden päälle aina (sääntö 3
     * yllä), ja tämä kertoo vain, onko se juuri nyt se hetki, jolloin
     * laattaa osoitetaan ja nappula palaa kartalle.
     */
    const omaNakyy = Boolean(nykyinen) && fokusvirtaLaattaNakyy(this, nykyinen);
    /*
     * KOKO LAUTA, EI VAIN KUVAN ALA (omistajan pelitesti v1101:
     * *"isot valinta-/kaupunkipallot Ankara/Izmir/Kreeta/Ateena"*).
     *
     * Piilotus rajautui ennen kuvan suorakaiteeseen, koska kuva oli
     * "lehti" laudan päällä. Fokusnäkymä on nyt jatkuva pinta, jonka
     * ulkopuoli on verhon alla (paivitaFokusSumu) — ja verhon päällä
     * kelluva pelimerkki on juuri se vanha lauta, jota omistaja ei halua
     * nähdä. Kuvan olemassaolo ratkaisee, sijainti ei.
     */
    const laudanMerkki = (x, y) => Boolean(pohja)
      && Number.isFinite(x) && Number.isFinite(y);
    /*
     * Valittavilla kohteilla on fokusnäkymässä OMA merkkinsä (pieni
     * piste + nimi, fokusKohdeMerkki), joten laudan iso laatta ei palaa
     * enää niiden alle. Ilman omia merkkejä (lähtöpisteen valinta)
     * vanha sääntö jää voimaan — muuten valittavaa ei näkyisi.
     */
    const omatMerkit = this.fokusKohdeMerkit();
    /** Saako tämän kaupungin piste näkyä kuvan päällä? */
    const kaupunkiNakyy = (id) => id === nykyinen?.id
      || (!omatMerkit && Boolean(kohteet?.has(id)));

    /*
     * KOKO KAUPUNKIKERROS LÄPI, EI VAIN [data-kaupunki]. Maatunniste jää
     * pois kaupungeilta, joita laudan kaupunki–maa-taulusta ei löydy
     * (maailmankartalla Jerusalem), ja juuri ne jäivät fokusnäkymässä
     * ainoina laudan palloina kartalle — kerros piilottaa ne muutenkin
     * vain käymättömistä maista (.fokus-piilossa). Tunniste on tässä
     * enää kaupungin NIMILAPPU, ei pääsylippu.
     */
    for (const osa of this.svg.querySelectorAll('.cities > *')) {
      /*
       * NIMI JÄÄ KUVAN PÄÄLLE mutta ei sen ulkopuolelle: kuvan alueella
       * nimi on kartan omaa tekstiä, verhon päällä se olisi laudan
       * merkintä toisella kirjasimella tyhjän paperin päällä.
       */
      const nimi = osa.classList.contains('city-label');
      const x = Number(osa.getAttribute('cx') ?? osa.getAttribute('x'));
      const y = Number(osa.getAttribute('cy') ?? osa.getAttribute('y'));
      const kuvanPaalla = this.fokusPohjanAlla(x, y);
      const piiloon = laudanMerkki(x, y) && !kaupunkiNakyy(osa.dataset.kaupunki)
        && (!nimi || !kuvanPaalla);
      osa.classList.toggle('fokus-lehden-alla', piiloon);
      /*
       * PÖLLÖ OSOITTAA LAATTAA: kun laatta ilmestyy aarrevaiheessa, se
       * saa kevyen huomioeleen. Luokka asetetaan togglella, joten se ei
       * käynnisty uudelleen joka piirrossa — ele nähdään kerran.
       */
      if (osa.classList.contains('city') || osa.classList.contains('city-start')) {
        osa.classList.toggle('fokus-laatta-esiin',
          !piiloon && omaNakyy && osa.dataset.kaupunki === nykyinen?.id && kuvanPaalla);
      }
    }

    for (const kiekko of this.tokenLayer?.querySelectorAll('.token-found') ?? []) {
      const piiloon = laudanMerkki(Number(kiekko.dataset.x), Number(kiekko.dataset.y))
        && kiekko.dataset.kaupunki !== nykyinen?.id;
      kiekko.classList.toggle('fokus-lehden-alla', piiloon);
    }

    /*
     * NAPPULA JÄÄ AINA LEHDEN PÄÄLLE (omistajan pelitesti 27.8.2026,
     * iPad-kaappaus Ateenasta: *"tinaherra-nappula EI näy Kreikan
     * fokuslaudalla — pelaajan sijainnissa näkyy vain vanha
     * kullanvärinen rengasmerkki"*).
     *
     * Piilotus oli v1097:n "Ota pallot pois" -säännön viimeinen jäänne
     * nappulassa: silloin nappula OLI pallo — valkoinen kehä, värillinen
     * täplä ja kiilto — ja kahtena renkaana kaupungin laatan päällä se
     * rikkoi lehden. Nappula sai näkyä vain aarrehetkellä (omaNakyy) tai
     * matkustusvalinnan ajan (valinta), ja muun ajan lehdellä oli
     * pelaajan paikkana pelkkä laatta. Juuri sen laatan omistaja näki.
     *
     * v1189 vaihtoi pallon TINAHERRAKSI (#100), ja sen myötä peruste
     * kaatui: hahmo ei ole laudan grafiikkaa vaan pelinappula, ja
     * pelinappula kuuluu kartalle. Sama linjaus kuin nykyisen kaupungin
     * laatalla (sääntö 3 yllä): se jää lehden päälle aina, pienenä ja
     * ruudulla lähes vakiokokoisena (paivitaFokusMerkkiMitat).
     *
     * Luokka kirjoitetaan yhä — nyt aina pois päältä — koska sama
     * elementti voi kantaa sen edelliseltä piirrolta.
     */
    for (const nappula of this.pawnLayer?.querySelectorAll('.pawn') ?? []) {
      nappula.classList.remove('fokus-lehden-alla');
    }

    for (const kohde of this.targetLayer?.querySelectorAll('.target') ?? []) {
      const osuma = kohde.querySelector('.target-hit');
      const piiloon = !valinta
        && laudanMerkki(Number(osuma?.getAttribute('cx')),
          Number(osuma?.getAttribute('cy')));
      // Vain koristeet piiloon — osuma-alue jää aktiiviseksi.
      // Fokusnäkymän piste ja nimi kuuluvat samaan joukkoon: ne ovat
      // kohteen merkki, eivät napautusalue (fokusKohdeMerkki).
      for (const koriste of kohde.querySelectorAll(
        '.target-ring, .target-halo, .lento-kohde-merkki, .target-piste, .target-nimi',
      )) {
        koriste.classList.toggle('fokus-lehden-alla', piiloon);
      }
    }

    // Näkyvyys on nyt ratkaistu; jäljellä on nykyisen laatan KOKO ja sen
    // napautusalue (oma metodinsa, koska sitä kutsutaan myös zoomista).
    this.paivitaFokusLaatta();
    // Sama koskee pelinappulaa ja käännetyn laatan aarremerkkiä: ne ovat
    // laudan yksiköissä ja kasvaisivat fokuszoomissa ruutua peittäviksi
    // (omistajan pelitesti 26.8.2026).
    this.paivitaFokusMerkkiMitat();
    // Samoin valittavien kohteiden merkit: pieni piste ja nimi, molemmat
    // mitattuina ruudulta eikä laudalta (omistaja 26.8.2026).
    this.paivitaFokusKohdeMitat();
    // Ja kaupunkien nimilaput laatan alle (paivitaFokusNimilaput).
    this.paivitaFokusNimilaput();
  }

  /* --- MERKIT KARTAN MITTAKAAVAAN (omistajan linjaus 26.8.2026) ------ */

  /**
   * FOKUSNÄKYMÄN MERKKIKERROSTEN VAKIOSKAALA.
   *
   * === MIKÄ MUUTTUI ===
   *
   * Omistajan LOPULLINEN linjaus (Raamattu, kumoaa 25.8. kirjatun
   * *"kartan pallurat kiinteän kokoisiksi"* -linjan): *"Nähtävyyspisteet
   * ja Ateenan merkki kummatkin vielä muuttuvat zoomatessa. Eli pisteet
   * pitäisi suurentua samalla kun karttaa suurentaa ja pienentyä karttaa
   * zoomatessa ulospäin. Eli niiden koko pitäisi olla koko ajan sama
   * suhteessa kartan muihin elementteihin."*
   *
   * Merkit olivat ruudun pikseleitä: ankkuriryhmä skaalattiin zoomin
   * KÄÄNTEISLUVULLA (1/skaala), jolloin merkki oli ruudulla samankokoinen
   * joka zoomilla — ja uloszoomatussa atlaksessa täysikokoiset pisteet
   * hallitsivat lehteä, jonka päällä ne olivat vain nuppineulanpäitä.
   * Nyt merkit ovat KARTAN MITTAKAAVASSA: transform on VAKIO, ja merkki
   * kasvaa ja kutistuu kartan mukana kuten kaikki muukin lehdellä.
   *
   * === MISTÄ VAKIO TULEE ===
   *
   * Peruskoko viritetään lehden PERUSTASOON eli siihen näkymään, johon
   * saapumisajo maahan päätyy (js/fokuskartta.js maanNakyma: kamera
   * sovittaa lehden IKKUNAN ruutuun) ja jota kauemmas loitonnusnappi ei
   * päästä (js/kartta.js fokusZoomMinimi). Sillä tasolla merkki on
   * suunnilleen entisen ruutukokonsa kokoinen; siitä se kasvaa
   * lähennettäessä ja kutistuu loitonnettaessa.
   *
   *   perusSkaala = min(paneW / ikkuna.w, paneH / ikkuna.h)
   *
   * — sama kaava kuin kameran omalla pohjalla (fokusZoomMinimi), jotta
   * merkin peruskoko ja kameran alaraja eivät voi ajautua erilleen.
   * Paluuarvo on ankkuriryhmän kerroin eli 1 / perusSkaala.
   *
   * === VARAPOLKU ON ENTINEN RUUTUKOKO ===
   *
   * Ilman lehden ikkunaa (muu lauta, fokusmoodi maassa jolle
   * esirenderöityä pohjaa ei ole, yleiskuva ilman maata) ei ole
   * perustasoa, johon virittää — silloin palataan entiseen 1/skaalaan.
   * Vain siinä haarassa `suhde` merkitsee: nipistys skaalaa koko SVG:n
   * CSS-muunnoksella muuttamatta viewBoxia, joten ruutukokoon sidottu
   * merkki tarvitsee eleen ajaksi vastaskaalan (js/kartta.js
   * vastaskaalaaMerkit). Vakioskaalassa vastaskaalaa EI tarvita: ele
   * suurentaa merkin kartan mukana, mikä on juuri se mitä pyydettiin.
   *
   * VÄLIMUISTI on maa + ruutukoko: vakio muuttuu vain kun lehti vaihtuu
   * tai ruutu muuttaa kokoaan, eikä sitä lasketa joka kehyksessä.
   *
   * === EIKÄ MITATA SITÄ, MITÄ EI TARVITA (mitattu 25.8.2026, ilta) ===
   *
   * Ensimmäinen versio luki näkyvän alueen HETI kättelyssä, ja
   * välimuisti säästi vain kertolaskun. Mittaus (Chromium, puhelin-
   * ruutu 390 x 844, CPU x2, Ateenan fokusnäkymä, panorointi +
   * nipistys) kertoi mitä se maksoi:
   *
   *   getBoundingClientRect  2 751 ms omaa aikaa, josta
   *     1 447 ms  nipistyksen vastaskaalaajasta (fokuskohteet.js)
   *     1 055 ms  nimilappujen silmukasta (paivitaFokusNimilaput)
   *
   * Syy ei ole yksittäisen mittauksen hinta vaan ASETTELUN
   * PIISKAAMINEN: jokainen kutsuja KIRJOITTAA merkkiensä muunnokset
   * kutsujen välissä, joten seuraava mittaus mitätöi juuri lasketun
   * asettelun ja selain laskee sen uudelleen — kymmeniä kertoja
   * kehyksessä. Nipistys skaalaa lisäksi koko SVG:tä joka kehyksellä.
   *
   * Vakiohaara EI TARVITSE näkyvää aluetta lainkaan: kerroin lasketaan
   * paneelin mitoista ja lehden rajauksesta. Näkyvä alue mitataan siis
   * vasta varapolulla (lehdetön näkymä), jossa vastaus on ruutukoon
   * käänteisluku. Välimuistiosuma ei enää koske asettelua ollenkaan.
   *
   * PANEELIN MITAT (clientWidth/clientHeight) OVAT SILTI MITTAUS —
   * mutta paneeli on tavallinen div, jota kartan muunnokset eivät
   * liikuta, ja sen lukeminen maksoi mittauksissa alle kymmenesosan
   * SVG:n laatikosta. Ne jäävät, koska juuri niistä välimuistin avain
   * huomaa ruudun koon muutoksen (kääntö, näppäimistö).
   */
  fokusMerkkiSkaala(suhde = 1) {
    const ele = suhde > 0 ? suhde : 1;
    const rajaus = this.fokusPohjaRajaus;
    const pane = this.mapPane;
    const paneW = pane?.clientWidth || 0;
    const paneH = pane?.clientHeight || 0;
    if (rajaus?.w > 0 && rajaus?.h > 0 && paneW > 0 && paneH > 0) {
      const avain = `${rajaus.x}:${rajaus.y}:${rajaus.w}:${rajaus.h}`
        + `:${Math.round(paneW)}x${Math.round(paneH)}`;
      if (this.fokusMerkkiSkaalaAvain !== avain) {
        const perus = Math.min(paneW / rajaus.w, paneH / rajaus.h);
        if (perus > 0) {
          this.fokusMerkkiSkaalaAvain = avain;
          this.fokusMerkkiSkaalaArvo = 1 / perus;
        }
      }
      if (this.fokusMerkkiSkaalaAvain === avain) return this.fokusMerkkiSkaalaArvo;
    }
    /*
     * VARAPOLKU: ruutukoon käänteisluku. Vasta tässä tarvitaan kartan
     * mittakaava — ja vain tässä haarassa `suhde` merkitsee (ks. yllä).
     */
    const nakyva = this.nakyvaAlue();
    const skaala = nakyva?.skaala;
    // Ilman mitattavaa näkymää mittakaava jäisi arvaukseksi: kutsuja
    // jättää entisen koon voimaan (0 = ei mittaa).
    if (!Number.isFinite(skaala) || skaala <= 0) return 0;
    return 1 / (skaala * ele);
  }

  /**
   * KARTALLE PIIRRETTÄVIEN MERKKIEN SKAALA — SAMA, MUTTA KATOLLA.
   *
   * === MIKÄ VIKA OLI (omistajan pelitesti 28.8.2026, iPhone) ===
   *
   * *"Viivat pisteisiin ovat isompia, varsinkin ne pisteet ja symbolit,
   * ovat isompia kuin muut symbolit kartalla. Samoin selitetekstit."*
   *
   * Merkit mitoitetaan RUUDUN PIKSELEINÄ lehden perustasolla
   * (fokusMerkkiSkaala), ja perustaso on lehden ikkuna sovitettuna
   * karttaruutuun. Puhelimen ruutu on kapea, joten sovitus tulee
   * LEVEYDESTÄ: Kreikan lehti (468 × 292 lautayksikköä) on 374 pikselin
   * ruudulla vain 374 pikseliä leveä, kun se työpöydän 1419 × 821
   * ruudulla on 1313. Sama 6,8 pikselin merkki on siis puhelimella
   * KARTALLA 3,5-kertainen — mitattuna 9,7 lautayksikköä, kun lehteen
   * poltettu vuorikolmio on 3,8. Työpöydällä sama merkki on 2,7 eli
   * kolmion mittainen, ja juuri siksi vika näkyi vain puhelimella.
   * (Sama juurisyy kuin nippurivien välillä, ks. js/fokusniput.js
   * sääntö 7.)
   *
   * === KATTO ON LEHDEN OMA TYPOGRAFIA ===
   *
   * Lehti ladotaan 1600 pikselin levyiselle prototyypille
   * (tools/fokuskartta/piirto.js `S`), joten yksi LEHDEN OMA pikseli on
   * `rajaus.w / 1600` lautayksikköä — sama muunnos, jolla poltettujen
   * kaupunginnimien laatikot lasketaan (js/fokuskohteet.js
   * KOHDE_POLTETTU_PROTO). Lehden omat merkinnät ovat sen pikseleitä:
   * vuorikolmion säde 6,5, vuorennimen kirjasinkoko 11.
   *
   * Merkin skaala saa siksi katon LAUTAYKSIKÖISSÄ: yksi merkin
   * perustason pikseli saa olla enintään FOKUS_MERKKI_KATTO lehden omaa
   * pikseliä. Kapea ruutu ei silloin voi paisuttaa merkkejä yli kartan
   * omien symbolien — leveällä ruudulla katto ei pure lainkaan, eikä
   * työpöytänäkymä muutu.
   *
   * === OSUMA-ALUEET EIVÄT KUTISTU ===
   *
   * Katto koskee NÄKYVÄÄ merkkiä. Sormen 44 px:n sääntö elää edelleen
   * kattamattomassa skaalassa: kerrokset kertovat osuma-ympyränsä säteen
   * kahden arvon suhteella (fokusMerkkiOsumaKerroin, tai sama jakolasku
   * siellä missä kattamatonta arvoa tarvitaan muutenkin), jolloin merkki
   * pienenee mutta napautusala pysyy. Nipun etäisyydet jakautuvat samaa
   * rajaa pitkin — ks. js/fokusniput.js sääntö 8.
   */
  fokusMerkkiSkaalaKartalle(suhde = 1) {
    const s = this.fokusMerkkiSkaala(suhde);
    if (!(s > 0)) return s;
    const rajaus = this.fokusPohjaRajaus;
    if (!(rajaus?.w > 0)) return s;
    return Math.min(s, FOKUS_MERKKI_KATTO * rajaus.w / FOKUS_LEHTI_PROTO);
  }

  /**
   * ONKO MERKKIEN MITTAKAAVA VAKIO ELI RIIPPUMATON NIPISTYSELEESTÄ?
   *
   * === MIKSI TÄTÄ KYSYTÄÄN (mitattu 28.8.2026) ===
   *
   * Omistajan pelitesti 28.8.2026 (v1273): *"edelleen kyllä tökkii sekä
   * ZOOMATESSA että scrollatessa."*
   *
   * Nipistyksen vastaskaalaajat (js/kartta.js vastaskaalaaMerkit) ajavat
   * joka kehyksellä kolme merkkikerrosta läpi — kohteet, nostosymbolit
   * ja täyn pisteen — ja jokainen niistä laskee mittansa tästä parista
   * (fokusMerkkiSkaala / fokusMerkkiSkaalaKartalle). LEHDEN OMASSA
   * NÄKYMÄSSÄ molemmat OHITTAVAT `suhde`-argumentin kokonaan: kerroin
   * on lehden rajauksen ja ruudun suhde, ja se on eleen aikana vakio
   * (ks. fokusMerkkiSkaalan osio "VÄLIMUISTI"). Silmukka siis laski ja
   * kirjoitti joka kehyksellä TÄSMÄLLEEN samat luvut kuin edellisellä.
   *
   * Mitattu (Chromium, iPhone-mitat 390x844 dpr3, 4x CPU-kuristus, 12 s
   * nipistystä Kreikan fokusnäkymässä, CDP-trace) ablaatiolla, jossa
   * vastaskaalaus kytkettiin kokonaan pois:
   *
   *                              ennen    ilman vastaskaalausta
   *     skriptiaika              3676 ms  1460 ms
   *     tyylinlaskuja/kehys      1,38     0,69
   *     kehyksiä yli 50 ms       7        1
   *     pitkiä tehtäviä          7        0
   *
   * Ero on puhdasta hukkaa: yhdenkään merkin paikka tai koko ei
   * muuttunut ablaatiossa, koska kirjoitetut arvot olivat jo samat.
   *
   * === VARAPOLKU TARVITSEE VASTASKAALAN YHÄ ===
   *
   * Ilman lehden ikkunaa (muu lauta, katselutila, maa jolle pohjaa ei
   * ole) merkit ovat RUUTUMITASSA, ja silloin `suhde` on niiden ainoa
   * suoja eleen skaalausta vastaan. Tämä palauttaa siis false juuri
   * siinä haarassa, ja kartta ajaa vastaskaalaajat kuten ennenkin.
   *
   * EHTO ON SAMA KUIN VAKIOHAARAN EHTO fokusMerkkiSkaalassa — yksi
   * kysymys, yksi vastaus: on lehden rajaus ja on mitattu ruutu.
   *
   * RUUDUN MITTA VÄLIMUISTISTA, EI ASETTELUSTA. Tätä kysytään eleen
   * silmukassa, ja `clientWidth` pakottaisi siellä ison laudan
   * asettelun (v1115:n sääntö, ks. js/kartta.js paneMitat). Vasta jos
   * välimuistia ei vielä ole — ele ennen ensimmäistä sovitusta —
   * mitataan kerran, kuten paneMitat tekee.
   */
  fokusMerkkiSkaalaVakio() {
    const rajaus = this.fokusPohjaRajaus;
    if (!(rajaus?.w > 0) || !(rajaus?.h > 0)) return false;
    const koko = this.paneKoko;
    if (koko?.w > 0 && koko?.h > 0) return true;
    const pane = this.mapPane;
    return (pane?.clientWidth || 0) > 0 && (pane?.clientHeight || 0) > 0;
  }

  /**
   * Paljonko osuma-ympyrää on kasvatettava, kun katto puree.
   *
   * Merkkiryhmä skaalataan katetulla arvolla, joten sormen mitta
   * säilyy vain jos ympyrän säde kerrotaan tällä: 1 kun katto ei pure,
   * ja katetun ja kattamattoman suhde silloin kun se puree.
   */
  fokusMerkkiOsumaKerroin(suhde = 1) {
    const s = this.fokusMerkkiSkaala(suhde);
    const katolla = this.fokusMerkkiSkaalaKartalle(suhde);
    if (!(s > 0) || !(katolla > 0)) return 1;
    return s / katolla;
  }

  /* --- LAATTA ON FOKUSNÄKYMÄN TUTKI-NAPPI (omistaja 24.8.2026) ------- */

  /**
   * Onko Tutki juuri nyt kaupungin laatassa eikä alarivissä?
   *
   * Omistajan pelitestitilaus: fokusnäkymässä alariville jää VAIN Liiku,
   * ja Tutki-napin toiminto siirtyy nykyisen kaupungin laatan
   * napautukseen. Yksi ehto ratkaisee molemmat puolet — napin poisjäännin
   * (tutkiNappi) ja napautusalueen syntymisen (paivitaFokusLaatta) —
   * jotta toiminto ei voi kadota kummastakaan paikasta yhtä aikaa.
   *
   * EHTO EI OLE LEHTI VAAN FOKUSMOODI. Fokuskartan lehti saapuu verkosta
   * kesken pelin ja on toistaiseksi olemassa vain Kreikassa; jos alarivi
   * riippuisi siitä, Tutki katoaisi lehden saapuessa ja palaisi sen
   * lähtiessä — ja lehden ja alarivin välissä olisi hetki, jolloin
   * kumpaakaan ei ole. Fokusmoodin kytkin ei värähdä kesken vuoron.
   *
   * VAIHE RATKAISEE LOPUN. Tutki on alarivissä vain vuoron kahdessa
   * vaiheessa ('action' ja 'roll'); siirtovaiheessa, tapahtumassa ja
   * tietovisassa koko rivi on tyhjä. Napautusalue noudattaa samaa
   * rajaa, eikä siis voi joutua siirtovaiheessa nopanheiton
   * kohdealueiden päälle — lähin askelpiste on laudalla vain kymmeniä
   * yksiköitä sivussa, ja sormenkokoinen alue ylettyisi sen päälle.
   */
  fokusLaattaTutkii() {
    if (!this.fokusmoodi || this.katselu) return false;
    if (this.game.player?.isBot) return false;
    if (this.game.phase !== 'action' && this.game.phase !== 'roll') return false;
    return Boolean(this.game.cityOf?.());
  }

  /**
   * NYKYISEN KAUPUNGIN LAATTA: pieni koko ja sormenkokoinen napautusalue.
   *
   * KAKSI TYÖTÄ, YKSI PAIKKA:
   *
   *   1. KOKO. Fokusnäkymässä laatta skaalataan MERKKIEN VAKIOSKAALALLA
   *      (fokusMerkkiSkaala) niin, että sen halkaisija on lehden
   *      perustasolla ruudulla FOKUS_LAATTA_PX — ja siitä se kasvaa
   *      lähennettäessä ja kutistuu loitonnettaessa kartan mukana.
   *      Skaalaus tehdään laatan omien osien transform-määreisiin
   *      kaupungin keskipisteen ympäri, jolloin heilunta (rotate) ja
   *      porttikehä säilyvät suhteessa toisiinsa. Alkuperäinen muunnos
   *      talletetaan data-määreeseen, joten palautus on tarkka eikä
   *      arvattu.
   *   2. NAPAUTUS. Laatan päälle piirretään näkymätön ympyrä, jonka
   *      halkaisija on ruudulla vähintään FOKUS_LAATTA_OSUMA_PX (44 px:n
   *      sormisääntö). Napautus tekee saman kuin vanha Tutki-nappi.
   *
   * KAKSI EHTOA, EI YHTÄ. Koko koskee koko fokusnäkymää: laatta pysyy
   * pienenä myös siirtovaiheessa ja tietovisan aikana, koska se on
   * lehden ulkoasua eikä nappi. Napautusalue syntyy vain silloin, kun
   * Tutki olisi muutenkin tarjolla (fokusLaattaTutkii) — muuten se
   * peittäisi siirtovaiheen kohdealueita.
   *
   * MITTAKAAVA PÄIVITTYY LEHDEN JA RUUDUN VAIHTUESSA. Kutsu tulee sekä
   * paivitaFokusPallotin kautta joka piirrossa että
   * paivitaMaastonimistä, joka ajetaan aina kun näkymä on asettunut —
   * sama kytkentäkohta kuin fokusvirran kuvavinjeteillä.
   */
  paivitaFokusLaatta() {
    if (!this.svg || !this.fokusLaattaKerros) return;
    const city = this.fokusmoodi && !this.katselu ? this.game.cityOf?.() : null;
    if (!city) { this.tyhjennaFokusLaatta(); return; }
    const s = this.fokusMerkkiSkaala();
    // Ilman mitattavaa näkymää mittakaava jäisi arvaukseksi: entinen
    // koko on parempi kuin väärä (sama sääntö kuin kuvavinjeteillä).
    if (!(s > 0)) return;

    const osat = [...this.svg.querySelectorAll('.cities [data-kaupunki]')]
      .filter((osa) => osa.dataset.kaupunki === city.id
        && !osa.classList.contains('city-label'));
    const laatta = osat.find((osa) => osa.classList.contains('city')
      || osa.classList.contains('city-start'));
    const rx = Number(laatta?.getAttribute('rx'));
    /*
     * KARTAN MITTAKAAVASSA, EI RUUDUN (omistajan linjaus 26.8.2026, ks.
     * fokusMerkkiSkaala ja FOKUS_LAATTA_PX). Kerroin on VAKIO niin kauan
     * kuin lehti ja ruutukoko pysyvät: laatan halkaisija on lehden
     * perustasolla FOKUS_LAATTA_PX, ja siitä se kasvaa ja kutistuu kartan
     * mukana. Ilman lehden ikkunaa vakiota ei ole, ja fokusMerkkiSkaala
     * palauttaa entisen käänteisen zoomiskaalauksen.
     *
     * MITTA KOSKEE FOKUSMOODIA, EI LEHTEÄ. Ehto oli ennen kuvan
     * olemassaolo (fokusPohjaBbox), mutta pallurat ovat samat pallurat
     * myös maassa, jolle esirenderöityä pohjaa ei vielä ole — ja juuri
     * sellaisen maan yli aloituslento kulkee. Sama raja kuin
     * kohdemerkeillä (fokusKohdeMerkit): fokusmoodi ja pelinäkymä.
     */
    const kerroin = Number.isFinite(rx) && rx > 0
      ? (FOKUS_LAATTA_PX / 2) * s / rx
      : 1;
    // Edellisen kaupungin osat takaisin omaan kokoonsa — ja näkyviin,
    // jos nappula seisoi niiden päällä (nappulanAlla alla).
    for (const vanha of this.fokusLaattaOsat ?? []) {
      if (!osat.includes(vanha)) {
        this.asetaLaatanKoko(vanha, 1);
        vanha.classList.remove('nappulan-alla');
      }
    }
    for (const osa of osat) this.asetaLaatanKoko(osa, kerroin);
    this.fokusLaattaOsat = osat;
    /*
     * MERKINTÄ SIITÄ, ETTÄ NAPPULA SEISOO TÄMÄN LAATAN PÄÄLLÄ.
     *
     * MITÄ LUOKKA TEKEE, ON CSS:SSÄ (.nappulan-alla). Se piilotti
     * 27.8.2026 koko laatan — silloinen nappula oli laatan levyinen
     * eikä laatasta jäänyt sen ympärille reunaa — ja piilottaa
     * 28.8.2026 alkaen enää lentokoneen merkin (se on täsmälleen
     * hahmon takana) ja houkuttelevan sykekehän (se kutsuu
     * napauttamaan tyhjää laattaa). Laatta itse jää näkyviin:
     * omistajan tilaus 28.8.2026 on, että nappula seisoo laatalla
     * peittämättä sitä, ja nappula kutistettiin sitä varten.
     *
     * EHTO KOSKEE VAIN SITÄ KOHTAA, JOSSA NAPPULA ON. Se on
     * geometrinen eikä "tämä on nykyinen kaupunki": jos samassa
     * kaupungissa on useampi pelaaja, nappulat levitetään kehälle
     * (drawPawns, spread 17) eikä kukaan seiso enää laatan päällä.
     *
     * SÄÄNTÖ ON LUOKKA EIKÄ SUODATIN (sama iOS-sääntö kuin kartan
     * muillakin kerroksilla, tests/rules.test.mjs) ja sama keino kuin
     * löydetyn kaupungin laatan värillä (.aarre-loydetty).
     *
     * NAPAUTUSALUE JÄÄ: laatta on fokusnäkymän Tutki-nappi
     * (fokusLaattaTutkii), ja sen näkymätön osuma-ympyrä piirretään
     * omaan kerrokseensa alla. Nappula ei ota napautuksia vastaan
     * (css .pawn-kuva pointer-events: none), joten nappulan
     * napauttaminen avaa tutkinnan täsmälleen kuten laatan napautus.
     */
    const nappulanAlla = this.nappulaKaupungissa(city);
    for (const osa of osat) osa.classList.toggle('nappulan-alla', nappulanAlla);

    /*
     * NAPAUTUSALUE VAIN KUN TUTKI OLISI TARJOLLA. Ks. fokusLaattaTutkii:
     * siirtovaiheessa alue peittäisi nopanheiton lähimmät kohdealueet,
     * eikä Tutkia ole silloin alarivissäkään.
     */
    if (!this.fokusLaattaTutkii()) {
      if (this.fokusLaattaKerros.firstChild) this.fokusLaattaKerros.textContent = '';
      this.fokusLaattaAvain = null;
      return;
    }
    /*
     * Napautusalue laudan yksiköinä — SAMASSA MITTAKAAVASSA KUIN LAATTA
     * (fokusMerkkiSkaala), eli ruudulla FOKUS_LAATTA_OSUMA_PX lehden
     * perustasolla ja siitä kartan mukana. Alue saa pienetä laatan
     * mukana: napautus tapahtuu lähizoomilla, jossa laatta on kasvanut.
     * Katto FOKUS_LAATTA_OSUMA_LAUDALLA jää varmistukseksi varapolulle
     * (yleiskuva ilman lehteä, jossa jakolasku kasvattaisi alueen
     * naapurikaupunkien päälle), ja vähintään laatan oma säde, ettei
     * näkyvän laatan reuna jää alueen ulkopuolelle.
     */
    const r = Math.max(
      Number.isFinite(rx) ? rx : 0,
      Math.min((FOKUS_LAATTA_OSUMA_PX / 2) * s, FOKUS_LAATTA_OSUMA_LAUDALLA),
    );
    const kohdat = this.kiertoKohdat(city.x);
    const avain = `${this.game.pack.id}:${city.id}:${kohdat.length}`;
    if (this.fokusLaattaAvain !== avain) {
      this.fokusLaattaAvain = avain;
      this.fokusLaattaKerros.textContent = '';
      for (const x of kohdat) {
        /*
         * LAATTA SYKKII KEVYESTI (omistajan pelitestitilaus 25.8.2026:
         * *"Ateenan laatta sykkii kevyesti houkutellen klikkaamaan"*).
         *
         * Syke on OMA KEHÄNSÄ eikä laatan oma muunnos. Laatan
         * transform-määre on kirjoitettu käsin (heilunta + kiinteän
         * ruutukoon skaalaus, asetaLaatanKoko), ja CSS:n transform
         * VOITTAA määreen — sykkivä skaalaus söisi siis sekä heilunnan
         * että keskityksen ja laatta hyppäisi paikaltaan. Kehä on siksi
         * erillinen elementti, joka ei tiedä laatasta muuta kuin
         * keskipisteen.
         *
         * SAMA KAAVA KUIN VIHREÄLLÄ KOHTAAMISPISTEELLÄ (js/fokuspiste.js):
         * ankkuriryhmä on laudan koordinaateissa ja skaalataan merkkien
         * vakioskaalalla (fokusMerkkiSkaala), jolloin kehän säde on
         * ruudun pikseleitä LEHDEN PERUSTASOLLA ja kasvaa siitä kartan
         * mukana. Sykkeessä liikkuvat vain `opacity` ja `scale()` —
         * ei `r` (sen CSS-animointi ei ole kaikissa selaimissa tuettua)
         * eikä suodattimia (tests/rules.test.mjs). Kehän keskipiste on
         * ankkurin origossa, joten oletusarvoinen transform-origin osuu
         * siihen samaan pisteeseen.
         *
         * KEHÄ ON NAPAUTUSALUEEN ALLA piirtojärjestyksessä ja lisäksi
         * läpäisemätön hiirelle (css .fokuslaatta-syke), joten se ei voi
         * varastaa napautusta.
         */
        const ankkuri = el('g', { class: 'fokuslaatta-ankkuri' }, this.fokusLaattaKerros);
        ankkuri.dataset.kx = String(x);
        ankkuri.dataset.ky = String(city.y);
        el('circle', { class: 'fokuslaatta-syke', r: FOKUS_LAATTA_SYKE_PX }, ankkuri);
        const osuma = el('circle', {
          cx: x, cy: city.y, r, class: 'fokuslaatta-osuma',
        }, this.fokusLaattaKerros);
        /*
         * Kesken animaation (nopan pyörähdys, siirtymä) kartta ottaa yhä
         * napautuksia vastaan toisin kuin alarivin napit, jotka ovat
         * silloin poissa — siksi kiireen esto on tässä eikä
         * avaaTutkinnassa (napin polku pysyy ennallaan).
         *
         * TÄMÄ PUOLI EI TARVITSE LÄHIN-KESKIPISTE-RATKONTAA (omistajan
         * päätös 28.8.2026, js/fokusniput.js sääntö 9). Ratkonta on
         * merkkien puolella, koska merkkikerrokset piirtyvät TÄMÄN
         * kerroksen päälle: kun napautus osuu sekä laattaan että
         * merkkiin, tapahtuman saa aina merkki, ja se luovuttaa työn
         * tänne (nippuAvaaKaupunki), jos laatan keskipiste oli lähempänä.
         * Tänne asti pääsevät vain ne napautukset, joita yksikään merkin
         * osuma-alue ei peitä — ja silloin kilpailua ei ole.
         */
        osuma.addEventListener('click', () => {
          if (!this.busy) this.avaaTutkinta(city);
        });
      }
    }
    /*
     * Mitat joka kutsulla — myös juuri rakennetuille osille, jotta
     * sääntö on yhdessä paikassa. Napautusalue on laudan yksiköissä,
     * sykekehän ankkuri merkkien vakioskaalassa. Kuuntelijoita ei kytketä
     * uudelleen, jottei napautus katoaisi sormen alta.
     */
    for (const osuma of this.fokusLaattaKerros.querySelectorAll('.fokuslaatta-osuma')) {
      osuma.setAttribute('r', r);
    }
    const zoom = s.toFixed(4);
    for (const ankkuri of this.fokusLaattaKerros.querySelectorAll('.fokuslaatta-ankkuri')) {
      ankkuri.setAttribute('transform',
        `translate(${ankkuri.dataset.kx} ${ankkuri.dataset.ky}) scale(${zoom})`);
    }
    /*
     * SYKEKEHÄ SEURAA LAATTAA NAPPULAN ALLE. Kehä on laatan houkutus
     * (*"Ateenan laatta sykkii kevyesti houkutellen klikkaamaan"*), ja
     * kun laattaa itseään ei näy, kehä olisi pelkkä irrallinen
     * kullanvärinen rengas nappulan ympärillä — juuri se, jonka
     * omistaja luki pinon pohjimmaiseksi kerrokseksi.
     *
     * KEHÄ JÄÄ DOM:IIN, LUOKKA VIE SEN POIS. `display: none` pysäyttää
     * animaation kokonaan (ei tyylinlaskentaa, ei asettelun likaamista
     * kehyksittäin, ks. body.kartta-raahaus -lista), mutta säilyttää
     * sekä kehän että sen säännöt siinä kunnossa, jossa ne palaavat
     * heti kun nappula on muualla — mekanismi on tallella, vain tämä
     * yksi paikka on vapautettu.
     */
    for (const syke of this.fokusLaattaKerros.querySelectorAll('.fokuslaatta-syke')) {
      syke.classList.toggle('nappulan-alla', nappulanAlla);
    }
  }

  /**
   * Seisooko jonkun pelaajan nappula tämän kaupungin laatan päällä?
   *
   * Kysymys on GEOMETRINEN eikä "onko tämä nykyinen kaupunki": samassa
   * kaupungissa olevat nappulat levitetään kehälle (drawPawns, spread
   * 17 laudan yksikköä), jolloin laatan keskipiste jää paljaaksi eikä
   * laattaa peitä kukaan. Raja on nappulan oma jalansija (NAPPULAN_R):
   * sitä lähempänä hahmo peittää laatan, kauempana ei.
   *
   * Paikka luetaan nappulan data-määreistä, joihin drawPawns kirjoittaa
   * sen — nappula asuu muunnoksessa, eikä koordinaatteja saa muuten
   * selville ilman geometrian mittaamista (sama syy kuin
   * paivitaFokusPallotin piilotussäännöllä).
   *
   * LIIKKUVA NAPPULA EI LASKE. Se on omassa kerroksessaan
   * (.pawn-moving, animatePawn) matkalla pisteestä toiseen, ja sen
   * paikka muuttuu joka kehyksellä; laatan piilottaminen sen mukaan
   * välkyttäisi laattaa siirron ajan. Kun siirto päättyy, nappula
   * piirretään takaisin omaan kerrokseensa ja sääntö puree.
   */
  nappulaKaupungissa(city) {
    if (!city || !this.pawnLayer) return false;
    for (const nappula of this.pawnLayer.querySelectorAll('.pawn')) {
      const x = Number(nappula.dataset.x);
      const y = Number(nappula.dataset.y);
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (Math.hypot(x - city.x, y - city.y) <= NAPPULAN_R) return true;
    }
    return false;
  }

  /**
   * Yhden laatan osan koko: skaalaus keskipisteen ympäri tai palautus.
   *
   * Alkuperäinen muunnos (heilunta) talletetaan ensimmäisellä kerralla
   * data-määreeseen. Ilman sitä palautus joutuisi rakentamaan heilunnan
   * uudelleen samasta siemenestä — kaksi kopiota samasta säännöstä.
   *
   * KERROIN SAA OLLA YLI YHDEN: kapealla ruudulla lehden perustaso on
   * niin kaukana, että FOKUS_LAATTA_PX vaatii laatalta enemmän kuin sen
   * oma lautakoko. Palautus omaan kokoon on siis ykkösen kohta eikä
   * "ykkönen tai enemmän" — pyöristysvara mukana, jottei tismalleen
   * oikean kokoiselle laatalle kirjoiteta turhaa muunnosta joka
   * piirrossa.
   */
  asetaLaatanKoko(osa, kerroin) {
    if (osa.dataset.laattaMuunnos === undefined) {
      osa.dataset.laattaMuunnos = osa.getAttribute('transform') ?? '';
    }
    const perus = osa.dataset.laattaMuunnos;
    if (!(kerroin > 0) || Math.abs(kerroin - 1) < 0.0005) {
      if (perus) osa.setAttribute('transform', perus);
      else osa.removeAttribute('transform');
      return;
    }
    const x = Number(osa.dataset.kx);
    const y = Number(osa.dataset.ky);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    osa.setAttribute('transform', `translate(${x} ${y}) scale(${kerroin.toFixed(4)}) `
      + `translate(${-x} ${-y}) ${perus}`.trimEnd());
  }

  /* --- NAPPULA JA AARREMERKKI KARTAN MITTAAN (omistaja 26.8.2026) ---- */

  /**
   * Kokokerroin yhdelle kartan merkille — 1 fokusnäkymän ulkopuolella.
   *
   * `px` on merkin haluttu LÄPIMITTA RUUDULLA LEHDEN PERUSTASOLLA ja
   * `omaR` sen säde laudan yksiköissä. Sama laskutoimitus kuin nykyisen
   * kaupungin laatalla (paivitaFokusLaatta); erillinen funktio, koska
   * nappulan siirto tarvitsee kertoimen kesken animaation
   * (animatePawnSisalla).
   *
   * KERROIN ON VAKIO, EI ZOOMIN KÄÄNTEISLUKU (omistajan linjaus
   * 26.8.2026, ks. fokusMerkkiSkaala). Nappula ja aarremerkki elävät
   * kartan mukana kuten kaikki muukin lehdellä: perustasolla ne ovat
   * `px`:n kokoisia, lähennettäessä isompia ja loitonnettaessa
   * pienempiä.
   *
   * EHTO ON SAMA KUIN LAATALLA (fokusmoodi ja pelinäkymä) eikä lehden
   * olemassaolo: pallurat ovat samat pallurat myös maassa, jolle
   * esirenderöityä pohjaa ei vielä ole — ja juuri sellaisen maan yli
   * aloituslento kulkee.
   *
   * KATTO ON YHÄ YKSI — tässä kohdin sääntö EROAA nykyisen kaupungin
   * laatasta. Omistajan tilaus 26.8.2026: *"Yleiskuvassa koot
   * ennallaan."* Laattoja on kartalla yksi (pelaajan oma), mutta
   * aarremerkkejä kertyy pelin mittaan kymmeniä, eikä niitä pidä
   * SUURENTAA yli oman lautakokonsa missään näkymässä. Kerroin 1 on
   * sekin vakio, joten merkki skaalautuu kartan mukana silloinkin kun
   * katto puree.
   */
  fokusMerkkiKerroin(px, omaR) {
    if (!this.fokusmoodi || this.katselu) return 1;
    if (!(omaR > 0)) return 1;
    const s = this.fokusMerkkiSkaala();
    if (!(s > 0)) return 1;
    return Math.min(1, (px / 2) * s / omaR);
  }

  /**
   * Pelinappuloiden ja aarremerkkien koko fokusnäkymässä.
   *
   * KUTSUTAAN SAMOISTA KAHDESTA PAIKASTA kuin laatan mitat: joka
   * piirrossa (paivitaFokusPallot) ja aina kun näkymä on asettunut
   * (paivitaMaastonimet). Kumpikin merkki asuu omassa muunnoksessaan,
   * joten skaalaus kirjoitetaan siihen — ei CSS:ään, joka voittaisi
   * määreen ja söisi paikan.
   *
   * PALAUTUS OMAAN KOKOON on kertoimen 1 kohta: fokusnäkymästä
   * poistuttaessa nappula ja merkki ovat taas laudan yksiköissä, myös
   * silloin kun kartta ei ehdi piirtyä uudelleen.
   */
  paivitaFokusMerkkiMitat() {
    for (const nappula of this.pawnLayer?.querySelectorAll('.pawn') ?? []) {
      this.asetaMerkinKoko(nappula, this.fokusMerkkiKerroin(FOKUS_NAPPULA_PX, NAPPULAN_R));
    }
    for (const merkki of this.tokenLayer?.querySelectorAll('.token-found') ?? []) {
      const oma = Number(merkki.dataset.r);
      this.asetaMerkinKoko(merkki, this.fokusMerkkiKerroin(FOKUS_AARRE_PX, oma));
    }
  }

  /**
   * Yhden merkin muunnos: paikka, koko ja heilunta samassa järjestyksessä.
   *
   * Muunnos KIRJOITETAAN KOKONAAN UUDELLEEN eikä täydennetä: sen osat
   * ovat tiedossa määreinä (data-x, data-y, data-kierto), ja skaalaus
   * on pakko tulla siirron jälkeen mutta heilunnan edellä — muuten
   * merkki lentäisi paikaltaan tai kiertyisi väärän pisteen ympäri.
   * Ilman paikkaa ei ole mitään mitoitettavaa (liikkuva nappula, jonka
   * paikka on tyylissä; ks. animatePawnSisalla).
   */
  asetaMerkinKoko(merkki, kerroin) {
    const x = Number(merkki.dataset.x);
    const y = Number(merkki.dataset.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    const kierto = Number(merkki.dataset.kierto);
    const osat = [`translate(${x},${y})`];
    if (kerroin > 0 && Math.abs(kerroin - 1) >= 0.0005) {
      osat.push(`scale(${kerroin.toFixed(4)})`);
    }
    if (Number.isFinite(kierto) && kierto) osat.push(`rotate(${kierto})`);
    merkki.setAttribute('transform', osat.join(' '));
  }

  /* --- KAUPUNGIN NIMI LAATAN ALLE (omistajan pelitesti v1101) -------- */

  /**
   * Määre vain jos se OIKEASTI muuttuu.
   *
   * `setAttribute` ei vertaa mitään: samalla arvolla kirjoitettu määre
   * on selaimelle yhtä lailla muutos, ja se mitätöi elementin tyylin ja
   * SVG-tekstin asettelun. Mitattu omistajan tökkimisvalituksen
   * (26.8.2026, iPad) jäljityksessä — Chromiumin invalidointijäljitys,
   * 150 kehyksen raahaus Kreikan fokusnäkymässä:
   *
   *   780  setAttribute  text.city-label  [x] [y] [text-anchor]  SAMA ARVO
   *
   * Kaikki 780 tulivat YHTENÄ RYÖPPYNÄ eleen päättyessä
   * (kartta.js `paata` → taydennaTaide → paivitaMaastonimet →
   * paivitaFokusNimilaput): panorointi ei muuta yhdenkään nimilapun
   * paikkaa laudalla eikä yhdenkään kirjasinkokoa, joten silmukka
   * kirjoitti 260 lapulle kolme määrettä samoilla arvoilla kuin ennenkin
   * — ja mitätöi 260 SVG-tekstin asettelun juuri sillä hetkellä, kun
   * sormi irtoaa. Se on täsmälleen se hetki, jossa nykäys tuntuu.
   *
   * Vertailu on tässä eikä kutsupaikoissa, jotta sääntö pysyy yhtenä.
   *
   * SAMA SÄÄNTÖ LAUDAN PIIRTÄJILLE on js/mapart.js `maare` — sinne
   * yltävät ne kerrokset, jotka eivät ole UI-luokan sisällä
   * (fokuskohteet, erikoispiirit). Jos tätä sääntöä muutetaan,
   * molemmat muuttuvat.
   */
  static maare(osa, nimi, arvo) {
    const teksti = String(arvo);
    if (osa.getAttribute(nimi) === teksti) return;
    osa.setAttribute(nimi, teksti);
  }

  /**
   * Kaupunkien nimilaput fokusnäkymässä: laatan alle keskitettynä ja
   * ruudulla vakiokokoisina.
   *
   * === MIKÄ OLI VIALLA ===
   *
   * Laudan nimilappu ladotaan pakettidatan ohjeilla: ankkuri `la` ja
   * siirtymä `lx`/`ly` (js/packs/*). Maailmankartalla Ateena on
   * `{ x: 6624.7, y: 1882, la: 'end', lx: -17, ly: -16 }`, eli teksti
   * PÄÄTTYY 17 yksikköä laatan vasemmalle puolelle ja jatkuu siitä
   * länteen. Yleiskuvassa se on hyvä latomistapa — nimi väistää
   * naapurikaupunkeja — mutta fokuszoomissa ISO teksti työntyy noin 36
   * lautayksikköä (~95 km) laatasta länteen, keskelle Korintinlahtea.
   * Omistaja luki nimen paikan laatan paikaksi, ja siksi oikeassa
   * kohdassa oleva vihreä kohtaamispiste näytti karanneen itään.
   *
   * === MITÄ TEHDÄÄN ===
   *
   * Fokusnäkymässä pakettidatan la/lx/ly OHITETAAN: nimi keskitetään
   * laatan alle vakiosiirtymällä, joka mitataan RUUDULLA eikä laudalla
   * (sama sääntö kuin laatalla ja kohdemerkeillä). Samalla nimi on
   * pieni: Raamatun linjaus *"valittavien nimet hieman isommalla,
   * nykyisen sijainnin nimet paljon pienemmällä"* — kohteen nimi on
   * 13 px (FOKUS_KOHDE_NIMI_PX), paikallaan oleva nimi 9.
   *
   * ALKUPERÄINEN LATOMINEN TALLETETAAN, jotta paluu yleiskuvaan on
   * tarkka eikä arvattu — sama tapa kuin laatan heilunnalla
   * (asetaLaatanKoko).
   *
   * KOKO ON INLINE-TYYLISSÄ eikä määreessä: fokusnäkymän nimikoko on
   * CSS-sääntö (body.fokuspohja .cities .city-label), ja tyylitiedosto
   * voittaisi määreen. Palautus poistaa tyylin, jolloin sääntö palaa
   * voimaan sellaisenaan.
   */
  paivitaFokusNimilaput() {
    if (!this.svg) return;
    const laput = this.svg.querySelectorAll('.cities .city-label');
    if (!laput.length) return;
    const paalla = Boolean(this.fokusmoodi && !this.katselu && this.fokusPohjaBbox);
    /*
     * KERROIN LASKETAAN KERRAN, EI JOKAISELLE LAPULLE (mitattu
     * 25.8.2026, ilta: 1 055 ms pakotettua asettelua tästä silmukasta
     * yhdellä mittausajolla). Arvo ei riipu lapusta mitenkään, mutta
     * silmukka kirjoittaa jokaisen lapun x:n ja y:n kutsujen väliin —
     * ja juuri kirjoituksen ja lukemisen vuorottelu pakottaa selaimen
     * laskemaan asettelun uudelleen lappu lapulta. Ks. fokusMerkkiSkaala.
     *
     * Nolla tarkoittaa "ei mittaa": entinen latominen on silloin
     * parempi kuin väärä (sama sääntö kuin ennenkin).
     */
    const kerroin = paalla ? this.fokusMerkkiSkaala() : 0;
    if (paalla && !(kerroin > 0)) return;
    // Näkymän oma mittakaava (px laudan yksikköä kohti) nimikoon
    // ruutulattiaa varten; luetaan kerran kuten kerroinkin.
    const skaala = paalla ? (this.nakyvaAlue()?.skaala ?? 0) : 0;
    const oma = paalla ? this.game.cityOf?.() : null;
    for (const lappu of laput) {
      if (!paalla) {
        if (lappu.dataset.nimiPerus === undefined) continue;
        const perus = JSON.parse(lappu.dataset.nimiPerus);
        lappu.setAttribute('x', perus.x);
        lappu.setAttribute('y', perus.y);
        lappu.setAttribute('text-anchor', perus.ank);
        if (perus.muunnos) lappu.setAttribute('transform', perus.muunnos);
        else lappu.removeAttribute('transform');
        lappu.style.removeProperty('font-size');
        lappu.style.removeProperty('stroke-width');
        delete lappu.dataset.nimiPerus;
        continue;
      }
      const x = Number(lappu.dataset.kx);
      const y = Number(lappu.dataset.ky);
      // Ilman laatan keskipistettä ei ole mihin keskittää (lauta ilman
      // kaupunki–maa-taulua): nimi jää pakettidatan paikalle.
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (lappu.dataset.nimiPerus === undefined) {
        lappu.dataset.nimiPerus = JSON.stringify({
          x: lappu.getAttribute('x'),
          y: lappu.getAttribute('y'),
          ank: lappu.getAttribute('text-anchor') ?? 'middle',
          muunnos: lappu.getAttribute('transform') ?? '',
        });
      }
      UI.maare(lappu, 'x', x.toFixed(2));
      /*
       * Laatan puolikas + rako + kirjaimen korkeus, kaikki ruudun
       * pikseleinä ja vasta lopuksi laudan yksiköiksi. Nykyisen
       * kaupungin kohdalla mitta on VÄHINTÄÄN nappulan kehä
       * (FOKUS_NIMI_NAPPULAN_ALLE) — muuten nimi jäisi lähikuvassa
       * nappulan alle.
       */
      // Kartan mittakaava, ei ruudun (omistaja 25.8.2026: "nimilaput
      // samalla lailla") — kerroin on vakio kuten merkeillä, joten nimi
      // kasvaa ja kutistuu laatan mukana. Laskettu kerran silmukan yllä.
      /*
       * KOKO ENSIN, ETÄISYYS SEN MUKAAN. Nimikoko on ruutumitta lehden
       * perustasolla, mutta sillä on LATTIA ruudulla
       * (FOKUS_NIMI_VAHIN_PX): uloszoomattuna kirjaimet menivät
       * seitsemään pikseliin ja piirtyivät rikkinäisinä. Lattia
       * lasketaan näkymän omasta mittakaavasta, joten se on ruudun
       * pikseleitä juuri nyt eikä perustasolla.
       */
      const nimiYksikot = Math.max(
        FOKUS_NIMI_PX * kerroin,
        skaala > 0 ? FOKUS_NIMI_VAHIN_PX / skaala : 0,
      );
      const ruudulta = (FOKUS_LAATTA_PX / 2 + 4) * kerroin + nimiYksikot;
      const etaisyys = lappu.dataset.kaupunki === oma?.id
        ? Math.max(FOKUS_NIMI_NAPPULAN_ALLE_PX * kerroin, ruudulta)
        : ruudulta;
      UI.maare(lappu, 'y', (y + etaisyys).toFixed(2));
      UI.maare(lappu, 'text-anchor', 'middle');
      // Heilunta pois: se kiertää tekstiä vanhan ankkurin ympäri.
      lappu.removeAttribute('transform');
      lappu.style.fontSize = `${nimiYksikot.toFixed(2)}px`;
      /*
       * PERGAMENTTIHALO SAMASSA SUHTEESSA. CSS antaa sille kiinteän
       * 1,6 laudan yksikköä, mikä on pienellä kirjaimella paksumpi
       * kuin kirjain itse — juuri se täytti kirjainten sisukset.
       */
      lappu.style.strokeWidth = `${(nimiYksikot * 0.22).toFixed(2)}px`;
    }
  }

  /** Fokusnäkymä loppui: laatta omaan kokoonsa ja napautusalue pois. */
  tyhjennaFokusLaatta() {
    if (this.fokusLaattaKerros?.firstChild) this.fokusLaattaKerros.textContent = '';
    this.fokusLaattaAvain = null;
    if (!this.fokusLaattaOsat?.length) return;
    for (const osa of this.fokusLaattaOsat) {
      this.asetaLaatanKoko(osa, 1);
      // Merkintä pois: fokusnäkymän ulkopuolella laatan osia ei
      // piiloteta nappulan takia (ks. paivitaFokusLaatta,
      // css .nappulan-alla).
      osa.classList.remove('nappulan-alla');
    }
    this.fokusLaattaOsat = [];
  }

  /**
   * Fokuspohja tuli tai lähti: mitä kartalla on tehtävä sen takia.
   *
   * Kutsuu js/fokuskartta.js aina kun lehti piirretään tai kerros
   * tyhjennetään; `bbox` on lehden paikka laudan koordinaateissa tai
   * null.
   *
   * === MIKSI TÄMÄ ON OLEMASSA (omistajan pelitesti v1095) ===
   *
   * Lehti on OPAAKKI ja kokonainen atlaksen sivu. Kaikki, mitä laudalla
   * on sen alueella, joko katoaa kuvan alle tai jää päälle riitelemään
   * sen kanssa — ja omistajan lista oli yksiselitteinen: punainen maan
   * ääriviiva pois, reittien pisteet ja katkoviivat pois, vieraiden
   * alueiden maastonimet pois. Kolme eri kerrosta, kolme eri keinoa:
   *
   *   1. MAAN KOROSTUS (.country-tint, .country-korostus) on kuvan
   *      PÄÄLLÄ (countryLayer luodaan fokuskarttaKerroksen jälkeen), ja
   *      punainen rengas piirtyisi keskelle lehteä. Piilotus luokalla
   *      body.fokuspohja — kerrosta ei tyhjennetä, koska maa on yhä
   *      korostettu ja rengas palaa heti kun lehti häviää.
   *
   *   2. SUMUVERHO on myös kuvan päällä ja sävyttäisi lehden kaikkialta
   *      paitsi Kreikan kohdalta — lehti näyttäisi kahdella eri
   *      paperilla painetulta. Verhoon leikataan reikä lehden kohdalle
   *      (paivitaFokusSumu).
   *
   *   3. MAASTONIMET ovat SVG:tä koko kartan päällä (maastonimiKerros
   *      on svg:n suora lapsi), joten ne jäisivät lehden päälle
   *      kellumaan. Lehden alueelle osuvat piilotetaan
   *      (himmennaMaastonimet).
   *
   *   4. PELIMERKIT (laatat, käännetyt aarrekiekot, pelinappula,
   *      kohderenkaat) asuvat omissa kerroksissaan kuvan päällä.
   *      Omistajan pelitestipalaute v1097: *"Ota pallot pois"* — ne
   *      piilotetaan lehden alueelta ja tuodaan takaisin vain kun
   *      peli niitä oikeasti tarvitsee (paivitaFokusPallot).
   *
   * Reitit hoituvat ilman koodia: ne ovat laudan bittikartassa ja
   * jäävät opaakin kuvan alle itsestään.
   */
  paivitaFokusPohja(bbox, rajaus = null) {
    const ennen = this.fokusPohjaBbox ?? null;
    const uusi = bbox && bbox.w > 0 && bbox.h > 0 ? bbox : null;
    const sama = (!ennen && !uusi)
      || (ennen && uusi && ennen.x === uusi.x && ennen.y === uusi.y
        && ennen.w === uusi.w && ennen.h === uusi.h);
    if (sama) return;
    this.fokusPohjaBbox = uusi;
    /*
     * IKKUNA ERIKSEEN KUVASTA (v1101). Kuvassa on ikkunan ympärillä
     * vuotoa, joka sulattaa sauman lautaan; kamera ja uloszoomauksen
     * raja mitataan IKKUNASTA (js/kartta.js fokusRajaukset), verho
     * häivytetään sen ja kuvan reunan välissä (paivitaFokusSumu).
     */
    this.fokusPohjaRajaus = uusi
      ? ((rajaus?.w > 0 && rajaus?.h > 0) ? rajaus : uusi)
      : null;
    document.body.classList.toggle('fokuspohja', Boolean(uusi));
    // Verho on rakennettava uusiksi: reikä tuli tai lähti.
    this.fokusAvain = null;
    this.paivitaFokusSumu(this.fokusMaat());
    this.himmennaMaastonimet();
    // Neljäs kerros: pelimerkit (ks. doc yllä ja paivitaFokusPallot).
    // Kutsu on tässä, koska pohja saapuu verkosta vasta piirron jälkeen.
    this.paivitaFokusPallot();
    // Viides kerros: lehden klikattavat karttakohteet (js/fokuskohteet.js).
    paivitaFokuskohteet(this);
    // Kuudes kerros: kevyen kulun vihreä kohtaamispiste (js/fokuspiste.js).
    paivitaFokuspiste(this);
    /*
     * Viides kerros: ruutuun ankkuroidut mitat (mittajana ja
     * kartuutsi). Kutsu on tässä samasta syystä kuin pallojen: pohja
     * saapuu verkosta vasta piirron jälkeen, eikä paivitaFokusKerros
     * enää aja itseään uudelleen sen takia.
     */
    paivitaFokusmitat(this);
    /*
     * Seitsemäs: KAMERA. Kuvan ikkuna on uloszoomauksen pohja
     * (js/kartta.js fokusRajaukset), ja kuva saapuu verkosta vasta
     * piirron jälkeen — jos näkymä on sitä laajempi, kamera ajetaan
     * ikkunaan heti eikä jäädä rikkomaan omaa sääntöä.
     */
    this.kartta?.tarkistaFokusZoom?.();
  }

  /**
   * Sumuverho: pergamentinvärinen harso koko laudan päälle, käydyt maat
   * verhosta pois leikattuina.
   *
   * MIKSI VERHO EIKÄ SUMENNUS? Kartan raskas osa (pergamentti,
   * mantereet, maasto) rasteroidaan bittikartaksi suorituskyvyn takia
   * (js/mapart.js pilkoTaide), eikä valmiista bittikartasta voi enää
   * sumentaa yhtä maata ja jättää naapuria tarkaksi. Aito maapohjan
   * epäterävyys tulee vasta paketissa 2 maakohtaisten esirenderöityjen
   * topografiakuvien kanssa; tässä paketissa käymätön maailma
   * HIMMENEE ja sen datakerros katoaa.
   *
   * REUNA PORTAILEE, EI SUODATA. Harso ei lopu terävään viivaan vaan
   * haalistuu rajan yli — mutta feGaussianBlurilla sitä ei tehdä.
   * Kartan kerroksissa ei saa olla suodattimia lainkaan (ks.
   * tests/rules.test.mjs "kartan kerroksilla ei ole suodattimia"): iOS
   * vapauttaa taustalle jääneen sovelluksen piirtopuskurit eikä saa
   * isointa enää varattua, jolloin suodatettu kerros palaa TYHJÄNÄ.
   * v159:ssä katosi meri ja v169:ssä tiet juuri tällä tavalla, eikä
   * laudan levyinen maski ole yhtään pienempi puskuri.
   *
   * Pehmennys tehdään siksi PORTAINA: maan ääriviiva vedetään ensin
   * leveinä, läpikuultavan mustina viivoina ja vasta lopuksi täytenä
   * mustana. Maskissa se on neljä askelta harsosta kirkkaaseen, ja
   * silmä lukee sen liukumana. Ei suodatinta, ei omaa puskuria, ei
   * mitään mikä voisi kadota taustalle jäämisen jälkeen.
   *
   * TUNNISTE ON LAUTAKOHTAINEN (fokus-sumu-maski). Kartta rakennetaan
   * uusiksi laudan vaihtuessa ja koko kerros syntyy silloin tyhjänä,
   * joten kahta samannimistä maskia ei ole olemassa yhtä aikaa.
   */
  paivitaFokusSumu(maat) {
    const kerros = this.fokusKerros;
    if (!kerros) return;
    const map = this.game.pack.map;
    const muodot = map?.countryShapes;
    const paalla = this.fokusSumuPaalla() && maat && muodot;
    /*
     * Fokuspohjan alue leikataan verhosta pois: lehti on valmis kuva,
     * jonka päälle harso maalaisi toisen sävyn kaikkialle paitsi
     * kohdemaan kohdalle (ks. paivitaFokusPohja).
     */
    const pohja = this.fokusPohjaBbox ?? null;
    /*
     * ALOITUSLENTO PITÄÄ MAAILMAN AUKI (Raamattu, ALOITUSLENTO UUSIKSI:
     * lähtömaa ja kohdemaa näkyvät molemmat). Lennon aikana lehteä ei
     * enää piirretä lainkaan (js/fokuskartta.js), joten `pohja` on
     * silloin null ja ehto on tuplavarmistus: jos lehti jostain jäisi
     * paikalleen, sen oma verho peittäisi Britannian ja koko
     * lentoreitin — kone lentäisi tyhjän paperin yli. Lennon ajan pätee
     * siis vanha sääntö: käydyt maat aukkoina.
     *
     * SAMA YLEISKUVASSA (mannerZoom pois). Silloin ruudulla on koko
     * lauta ja fokuskuva on siinä pieni upote — verho peittäisi
     * maailman yhden maan takia. Sama raja kuin kameran rajauksilla
     * (js/kartta.js fokusRajaukset), ja kartta kutsuu tämän uudelleen
     * lähikuvan asettuessa (sovitaMannerZoom).
     *
     * ELLEI VANHA LAUTA OLE PIILOSSA — SILLOIN AUKKO ON PAHEMPI KUIN
     * VERHO (omistajan linjaus 25.8.2026, ilta: vanha kartta pois koko
     * pelin ajaksi). Maan muotoinen aukko on olemassa sitä varten, että
     * käyty maa pysyisi laudan piirroksessa TARKKANA; kun piirrosta ei
     * ole, aukko paljastaa pelkän tyhjän pergamentin. Piilotuksen
     * ollessa päällä aukot kuuluvat siis lehdille — kuvan haara osaa jo
     * sen — ja loppu maailma jää tasaisen verhon alle. Kuvan haara
     * toimii myös ilman omaa lehteä (`pohja` null): se on juuri se
     * tilanne, jossa maalla ei ole lehteä tai lento on kesken.
     */
    const kuvanVerho = this.vanhaLautaPiilossa()
      || (Boolean(pohja) && !this.aloituslentoKesken && Boolean(this.mannerZoom));
    // Avain kertoo, onko mitään muuttunut: sama joukko samassa tilassa
    // piirretään uudestaan turhaan joka vuorolla.
    /*
     * Atlaksen lehdet kuuluvat avaimeen: niiden joukko muuttuu
     * panoroinnin mukana ilman että käytyjen maiden joukko liikahtaa,
     * ja jokainen käyty naapuri tuo verhoon oman reikänsä.
     */
    const avain = paalla
      ? `${[...maat].sort().join(',')}|${pohja ? `${pohja.x},${pohja.y},${pohja.w},${pohja.h}` : ''}`
        + `|${kuvanVerho ? 'kuva' : 'maat'}`
        + `|${[...(this.atlasLehdet?.keys() ?? [])].sort().join(',')}`
      : 'pois';
    if (this.fokusAvain === avain) return;
    this.fokusAvain = avain;
    kerros.textContent = '';
    if (!paalla) return;

    const maski = el('mask', { id: 'fokus-sumu-maski', maskUnits: 'userSpaceOnUse' }, kerros);
    // Valkoinen pohja = harso näkyy; mustat aukot = maa jää tarkaksi.
    el('rect', {
      x: 0, y: 0, width: map.width, height: map.height, fill: '#fff',
    }, maski);
    if (kuvanVerho) {
      /*
       * === FOKUSKUVA ON KOKO NÄKYMÄ (omistajan pelitesti v1101) =====
       *
       * *"Vanhan laudan elementit näkyvät: paksut maarajat, ruskeat
       * väripinnat, katkoviivareitit."* Ne kaikki asuvat laudan
       * BITTIKARTASSA (js/mapart.js pilkoTaide), eikä valmiista
       * rasterista voi piilottaa yhtä kerrosta — verho on ainoa keino,
       * joka niihin yltää.
       *
       * SIKSI KÄYTYJEN MAIDEN AUKOT JÄÄVÄT POIS SILLOIN KUN KUVA ON
       * KARTALLA. Aukot ovat olemassa siksi, että käyty maa pysyisi
       * tarkkana — mutta "tarkka" tarkoittaa nykyään maan omaa
       * fokuskuvaa, ei laudan piirrosta. Kreikka jäi Bulgariaan
       * saavuttaessa vanhaksi pelilaudaksi kuvan viereen, ja juuri se
       * oli omistajan näkemä vika. Ilman kuvaa (maat ilman pohjaa) mikään
       * ei muutu: alempi haara piirtää aukot kuten ennenkin.
       *
       * REUNA HÄIVYTETÄÄN IKKUNAN JA KUVAN REUNAN VÄLISSÄ. Kuvan
       * suorakaiteen reuna näkyi ruudulla "neliörajana"; nyt verho
       * voimistuu portaittain juuri sillä kaistalla, joka on kuvan omaa
       * vuotoa. Portaat eivätkä suodattimet — sama iOS-sääntö kuin
       * muuallakin (ks. metodin johdanto).
       */
      const reika = (kuva, sisus) => {
        FOKUS_KUVAN_REUNA.forEach((peitto, i) => {
          const t = (i + 1) / FOKUS_KUVAN_REUNA.length;
          el('rect', {
            x: kuva.x + (sisus.x - kuva.x) * t,
            y: kuva.y + (sisus.y - kuva.y) * t,
            width: kuva.w + (sisus.w - kuva.w) * t,
            height: kuva.h + (sisus.h - kuva.h) * t,
            fill: '#000',
            'fill-opacity': peitto,
          }, maski);
        });
      };
      /*
       * JATKUVA ATLAS: KÄYTYJEN NAAPUREIDEN LEHDET SAAVAT OMAN REIKÄNSÄ
       * (omistajan tilaus 25.8.2026). Naapurilehdet piirtyvät nyt koko
       * ajan (js/fokuskartta.js), mutta PELITILASSA vanha sääntö jää
       * voimaan: käymättömän maan päällä pysyy sumuverho. Reikä tulee
       * siis vain niille lehdille, joiden maassa on jo käyty — muut
       * jäävät verhon alle kuten ennenkin, ja isoisän atlas tarkentuu
       * yhä sitä mukaa kuin jäljillä kuljetaan.
       *
       * Reiät ovat ENNEN kohdemaan omaa reikää, jotta nykyinen maa jää
       * varmasti kirkkaimmaksi (maskin myöhempi musta voittaa).
       */
      for (const lehti of fokusAtlasIkkunat(this, maat)) {
        reika(lehti.bbox, lehti.ikkuna ?? lehti.bbox);
      }
      // Oma lehti vain jos sellainen on: haara on nyt käytössä myös
      // lehdettömässä maassa ja lennon aikana (ks. kuvanVerho).
      if (pohja) reika(pohja, this.fokusPohjaRajaus ?? pohja);
      el('rect', {
        x: 0,
        y: 0,
        width: map.width,
        height: map.height,
        class: 'fokus-sumu-harso fokus-sumu-kuva',
        mask: 'url(#fokus-sumu-maski)',
      }, kerros);
      return;
    }
    const polut = [];
    for (const iso of maat) {
      const renkaat = muodot[iso]?.renkaat;
      if (!renkaat) continue;
      polut.push(renkaat.map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`).join(' '));
    }
    /*
     * Portaat leveimmästä kapeimpaan: jokainen viiva vetää maan rajan
     * yli oman levyisensä kaistan, ja päällekkäin ne muodostavat
     * haalistuman. Viivat ovat ääriviivalla, joten kaista jakautuu tasan
     * rajan molemmin puolin — harso ei siis leikkaa maasta palaa pois
     * vaan pehmenee sitä lähestyessään. Täysi musta tulee vasta
     * lopuksi, jotta maa itse jää varmasti kokonaan kirkkaaksi.
     */
    for (const { leveys, peitto } of FOKUS_REUNAN_PORTAAT) {
      for (const d of polut) {
        el('path', {
          d,
          fill: 'none',
          stroke: '#000',
          'stroke-opacity': peitto,
          'stroke-width': FOKUS_REUNAN_PEHMENNYS * leveys,
          'stroke-linejoin': 'round',
        }, maski);
      }
    }
    for (const d of polut) el('path', { d, fill: '#000' }, maski);
    /*
     * Fokuskuva kokonaan verhon ulkopuolelle (musta = kirkas). Tämä
     * haara on käytössä vain aloituslennon aikana (ks. kuvanVerho); muu
     * peli kulkee kuvan oman verhon kautta, jossa aukko on ikkuna.
     */
    if (pohja) {
      el('rect', {
        x: pohja.x, y: pohja.y, width: pohja.w, height: pohja.h, fill: '#000',
      }, maski);
    }
    el('rect', {
      x: 0,
      y: 0,
      width: map.width,
      height: map.height,
      class: 'fokus-sumu-harso',
      mask: 'url(#fokus-sumu-maski)',
    }, kerros);
  }

  /**
   * Fokusmoodin tahdistus laitteen asetuksesta.
   *
   * Kytkintä ei enää ole käyttöliittymässä (omistajan tilaus 27.8.2026
   * poisti hampurilaisvalikon fokusmoodi- ja sumennuskytkimet), mutta
   * avain elää yhä (js/ui-apurit.js fokusmoodiPaalla) ja savukevartijat
   * vertailevat sillä vanhaa ja uutta näkymää.
   *
   * Sama kaava kuin paivitaKehittajaTilalla: asetus luetaan uudestaan
   * levyltä ja näkymä tahdistetaan heti. Sivulatausta ei tarvita —
   * fokuskerros elää valmiiksi piirretyn kartan päällä, eikä laudan
   * uudelleenpiirto ole tarpeen.
   */
  paivitaFokusmoodi() {
    this.fokusmoodi = fokusmoodiPaalla();
    // Verho on saatettava rakentaa uusiksi, vaikka maajoukko olisi sama:
    // kytkin muuttaa tilaa eikä joukkoa. Sama fokuskartalle — mutta
    // ilman kamera-ajoa, koska kytkimen napautus ei ole saapuminen.
    this.fokusAvain = null;
    nollaaFokuskartta(this);
    this.paivitaFokusKerros();
  }

  /**
   * UUTEEN MAAHAN SAAVUTAAN NÄYTTÄVÄSTI (omistajan tilaus 13.8.2026;
   * väläys poistui saman päivän iltana: "otetaan rajan väläytys pois
   * mutta raja voisi jäädä lähes yhtä voimakkaana näkyviin kuin se on
   * piirron lopussa").
   *
   * Kaksi vaihetta:
   *   1. viiva piirtyy päästä päähän (stroke-dasharray = polun pituus,
   *      dashoffset pituudesta nollaan) noin kahdessa sekunnissa ja
   *      paisuu samalla täyteen voimaansa (5.4 / 0.8)
   *   2. valmistuessa lyhyt pehmeä asettuminen lepoarvoihin, jotka
   *      ovat hivenen piirron loppua alempana (5 / 0.72) — ei väläystä
   *
   * Vaihe 2 on yksi CSS-animaatio (.maa-asettuu), vaihe 1
   * Web Animations API — kummassakaan ei ole kehyskohtaista silmukkaa,
   * eikä kumpikaan koske näkymään (fitViewBox), joten kartan
   * bittikarttaa ei rasteroida uudelleen animaation takia.
   *
   * Liikeherkkyys ja katselutila (?lauta=) saavat viivan valmiina.
   */
  animoiMaanAariviiva(polut, avain) {
    if (this.reducedMotion || this.katselu) return;
    if (!polut.length || typeof polut[0].animate !== 'function') return;
    const kerros = this.countryLayer;
    kerros.classList.add('maa-piirtyy');

    const liikkeet = [];
    for (const polku of polut) {
      // Polun oma mitta: jokainen rengas piirtyy alusta loppuun samassa
      // ajassa, joten pieni saari ei jää pitkän rannikon jalkoihin.
      const pituus = polku.getTotalLength?.() ?? 0;
      if (!pituus) continue;
      polku.style.strokeDasharray = `${pituus}`;
      polku.style.strokeDashoffset = `${pituus}`;
      liikkeet.push(polku.animate(
        [{ strokeDashoffset: `${pituus}` }, { strokeDashoffset: '0' }],
        { duration: AARIVIIVAN_PIIRTO_MS, easing: 'ease-in-out', fill: 'forwards' },
      ));
      /*
       * Viiva paisuu ja voimistuu TASAISESTI jo piirtyessään täyteen
       * voimaansa (omistajan tarkennus 13.8.2026 ilta: "tasaisesti
       * levittää ja voimistaa viivaa jo matkalla") — asettuminen
       * jatkaa tästä lepoon (css: maa-aariviivan-asettuminen alkaa
       * täsmälleen näistä arvoista, ettei sauma näy).
       */
      liikkeet.push(polku.animate(
        [
          { strokeWidth: '3.5', stroke: 'rgba(150, 60, 45, 0.62)' },
          { strokeWidth: '5.4', stroke: 'rgba(182, 61, 42, 0.8)' },
        ],
        { duration: AARIVIIVAN_PIIRTO_MS, easing: 'linear', fill: 'forwards' },
      ));
    }
    if (!liikkeet.length) {
      kerros.classList.remove('maa-piirtyy');
      return;
    }

    let jaljella = liikkeet.length;
    const valmis = () => {
      jaljella -= 1;
      if (jaljella > 0) return;
      // Maa on voinut vaihtua kesken piirron: silloin nämä polut ovat jo
      // poissa eikä asettuminen kuulu uudelle maalle.
      if (this.dead || this.countryKey !== avain || !kerros.isConnected) return;
      /*
       * Viiva-aukkokuvio pois ENNEN animaatioiden perumista: fill:
       * 'forwards' pitää dashoffsetia nollassa, ja ilman dasharrayta
       * offsetilla ei ole enää merkitystä. Näin viiva ei välähdä
       * katkonaisena yhtenä kehyksenä.
       */
      for (const polku of polut) {
        polku.style.strokeDasharray = '';
        polku.style.strokeDashoffset = '';
      }
      for (const liike of liikkeet) liike.cancel();
      kerros.classList.remove('maa-piirtyy');
      kerros.classList.add('maa-asettuu');
      clearTimeout(this.aariviivaAjastin);
      this.aariviivaAjastin = setTimeout(() => {
        kerros.classList.remove('maa-asettuu');
      }, AARIVIIVAN_ASETTUMIS_MS);
    };
    for (const liike of liikkeet) liike.addEventListener('finish', valmis, { once: true });
  }

  /**
   * Maan nimi + lippu + ⓘ kiinteänä pillerinä kartan KEHYKSELLÄ, ei
   * kartalla (Fable maxin speksi 10.8.2026; omistajan tarkennus
   * samana iltana: pilleri asuu AINA oikeassa reunassa ja on aina
   * näkyvillä — nykyisen maan lehti aukeaa siitä ilman varusteita.
   * Vain maavertailu ja minkä tahansa maan selailu (kirjanappi +
   * maatiedot-tila) ovat löydettäviä varusteita). HTML-nappi ei
   * skaalaudu zoomissa, ei liiku panoroinnissa eikä voi peittää
   * kaupunkia tai nappulaa. maa = null piilottaa pillerin (lauta
   * ilman muotoja, pelin alku).
   */
  paivitaMaaPilleri(maa, iso) {
    let nappi = this.maaPilleri;
    if (!maa) {
      if (nappi) nappi.hidden = true;
      return;
    }
    if (!nappi || !nappi.isConnected) {
      // Varmistus kaksoiskappaleita vastaan: jos mapPanessa asuu vielä
      // jonkin aiemman elämän pilleri (esim. purkamatta jäänyt UI),
      // se siivotaan ennen uuden luontia — pillereitä on aina yksi.
      for (const vanha of this.mapPane.querySelectorAll('.maa-pilleri')) vanha.remove();
      nappi = document.createElement('button');
      nappi.type = 'button';
      nappi.className = 'maa-pilleri';
      nappi.appendChild(html('span', 'maa-pilleri-nimi', ''));
      // Ei i-merkkiä (omistajan tarkennus 10.8.2026 ilta): pelkkä
      // nimi ja lippu; koko pilleri on nappi.
      const lippu = document.createElement('img');
      lippu.className = 'maa-pilleri-lippu';
      lippu.alt = '';
      nappi.appendChild(lippu);
      nappi.addEventListener('click', () => {
        if (this.maaPilleriIso) avaaMaalehti(this, this.maaPilleriIso);
      });
      this.mapPane.appendChild(nappi);
      this.maaPilleri = nappi;
    }
    this.maaPilleriIso = iso;
    nappi.querySelector('.maa-pilleri-nimi').textContent = maa.nimi;
    nappi.setAttribute('aria-label', `${maa.nimi}: avaa maan lehti`);
    // Maan lippu nimen perässä (omistajan toive 10.8.2026 ilta) —
    // sama Commons-tiedosto kuin saapumiskortilla; puuttuva lippu
    // tai verkko piilottaa kuvan äänettömästi.
    const lippu = nappi.querySelector('.maa-pilleri-lippu');
    if (maa.lippu) {
      lippu.hidden = false;
      asetaKuva(lippu, lippuUrl(maa.lippu, 40), lippuVara(maa.lippu, 40), () => { lippu.hidden = true; });
    } else {
      lippu.hidden = true;
      lippu.removeAttribute('src');
    }
    nappi.hidden = false;
  }

  /**
   * KÄÄNNETTY LAATTA VAIN VAIHTAA VÄRIÄ — EI OMAA MERKKIÄ.
   *
   * Omistajan linjaus 28.8.2026 ilta (kuvakaappaus Sofiasta: *"Miksi
   * tämä on näin kummallisen näköinen? Ihan kuin olisi monta
   * elementtiä päällekkäin. Pitäisi olla vain nappi ja laatta."*).
   * Linjaus kumoaa 25.–26.8.2026 aarremerkkilinjan: löydön jälkeen
   * kaupungin kohdalla on NORMAALI KAUPUNKILAATTA LÖYTÖVÄRISSÄ ja sen
   * päällä pelinappula, eikä mitään muuta symbolia.
   *
   * MIKÄ PINOSSA OLI (mitattu Playwrightilla samasta tilanteesta):
   * kaupungin oma laatta piilotettiin (.aarre-laatan-alla) ja tilalle
   * piirtyi tästä metodista aarremerkki — pergamenttikiekko
   * (.token-disc, tumma 2,5 yksikön kehä) ja sen sisään laatan
   * kuvake, mantereen aarteella kultainen tähti (.icon-star). Kun
   * nappula seisoi kiekon päällä, kehä luki tyhjänä renkaana hahmon
   * ympärillä ja tähti pilkotti sen takaa. Nyt kiekkoa ei piirretä.
   *
   * KERROS JÄÄ (tyhjänä): fokusnäkymän mitoitus ja lehden
   * pallonpiilotus etsivät täältä .token-found -merkkejä, ja
   * aarremerkin piirtokoodi (mapart.js drawTokenIcon) elää yhä
   * paneeleissa ja matkalaukussa. Vain kartan käyttö poistui.
   *
   * KIRJANPITO EI MUUTU. Tämä on esitys: game.revealed ja game.tokens
   * ovat tismalleen ennallaan, ja laatan kääntö vie yhä samaan
   * paikkaan pelissä (tools/savuke-pollo.mjs).
   */
  drawTokens() {
    this.tokenLayer.textContent = '';
    this.merkitseAarreLaatat();
  }

  /**
   * AVATUN KAUPUNGIN LAATTA LÖYTÖVÄRIIN.
   *
   * Luokka `.aarre-loydetty` on ainoa ero löydetyn ja löytämättömän
   * kaupungin välillä kartalla (css: lämmin kullansävy pergamentin
   * tilalle). Laatta itse — koko, kehä, nimi, rantarengas, porttikehä
   * — pysyy täsmälleen ennallaan: omistajan tilaus 28.8.2026 illalla
   * oli *"laatta vain vaihtaa väriä, ei mitään muuta symbolia"*.
   *
   * MERKINTÄ ON TÄSSÄ EIKÄ PIIRROSSA, koska lauta piirretään vain kun
   * pakkaus vaihtuu (drawBoardFor) mutta laattoja käännetään kesken
   * pelin. Sama syy kuin muillakin kartan tilaluokilla.
   *
   * VÄRI VAIN KAUPUNGIN OMAAN LAATTAAN (.city / .city-start).
   * Rantarengas, porttikehä ja lentokonemerkki ovat kartan omaa
   * kieltä eivätkä kerro löydöstä; ne jäävät ennalleen.
   */
  merkitseAarreLaatat() {
    if (!this.svg) return;
    const auki = this.game?.revealed;
    for (const osa of this.svg.querySelectorAll('.cities .city, .cities .city-start')) {
      // dataset.kaupunki puuttuu vain laudoilta, joita ei ole piirretty
      // tässä versiossa; Map.has(undefined) on silloin epätosi.
      osa.classList.toggle('aarre-loydetty', Boolean(auki?.has(osa.dataset.kaupunki)));
    }
  }

  drawTargets() {
    const { game } = this;
    this.targetLayer.textContent = '';
    /*
     * MITKÄ KAUPUNGIT OVAT JUURI NYT VALITTAVIA KOHTEITA?
     *
     * Fokuslehden päällä kaupunkien pisteet ovat piilossa (v1097,
     * *"Ota pallot pois"*), mutta matkustusvalinnan ajaksi valittavien
     * kohteiden pisteet on tuotava takaisin — muuten pelaaja valitsisi
     * paljaalta paperilta. Lista kerätään tässä, koska kohteiden
     * säännöt (kehittäjätila, lähtöpiste, lennot, nopanheitto) asuvat
     * tässä metodissa eikä niitä saa kirjoittaa toiseen paikkaan
     * uudelleen.
     *
     * KEHITTÄJÄTILAN NÄKYMÄTTÖMÄT HYPPYALUEET EIVÄT OLE KOHTEITA: ne
     * ovat oikotie, ei valinta, eikä niiden takia saa syttyä yhtään
     * pistettä lehden päälle.
     */
    const kohdeKaupungit = new Set();
    this.fokusKohdeKaupungit = kohdeKaupungit;

    /*
     * Maailmanradio: kaupungit ovat itse play-nappeja eikä kartalla
     * ole muita kohteita. Ei nopanheiton kohteita, ei lentokohteita,
     * ei lähtöpisteen valintaa — se on koko tilan idea (omistaja
     * 4.8.2026: "kaikki muu toiminto häviää").
     *
     * ENNEN kehittäjätilaa: radiotilassa napautus kuuluu radiolle
     * silloinkin kun kehittäjätila on päällä, muuten radiota ei voisi
     * kokeilla juuri siinä tilassa, jota varten se avattiin.
     */
    if (this.radioPaalla()) {
      this.radioModuuli.piirraKaupunkinapit(this.targetLayer, game.board.cities,
        { kiertoKohdat: (x) => this.kiertoKohdat(x) });
      return;
    }

    /*
     * Kehittäjätila (omistajan toive): jokainen kaupunki on napautettava
     * ja napautus vie sinne suoraan. Tämä ohittaa kaikki muut kohteet,
     * myös lähtöpisteen valinnan — muuten tilaa ei pääsisi käyttämään
     * pelin alussa lainkaan.
     *
     * Lähtöpaikkaa ei ole vielä valittu ennen ensimmäistä napautusta,
     * joten pickstart-vaiheessa käytetään pelin omaa aloitusta ja
     * hypätään vasta sen jälkeen.
     *
     * Kohdealueet ovat näkymättömiä (omistajan toive): 41 rengasta
     * kerralla peitti kartan eikä kartan katselusta tullut mitään.
     * Napautus toimii silti, ja yläreunan merkki kertoo tilan olevan
     * päällä.
     *
     * JUURISYY OMISTAJAN HAVAINTOON 13.8.2026 (*"kehittäjänäkymässä
     * nopanheitto ei vieläkään näytä valittavia kohteita"*): tämä haara
     * palautti ENNEN aina heti, myös siirtovaiheessa. Näkymättömät
     * hyppyalueet korvasivat siis nopanheiton kohderenkaat kokonaan, ja
     * kartta näytti siltä, ettei heitolla ole yhtään valittavaa kohdetta.
     *
     * Nyt siirtovaiheessa hyppyalueet piirretään vain niihin
     * kaupunkeihin, jotka EIVÄT ole heiton laillisia kohteita, ja
     * laillisten kohteiden renkaat piirtyvät alempana täsmälleen kuten
     * normaalitilassa. Oikotie säilyy, korostukset palaavat.
     */
    if (this.kehittajaTila && !game.player?.isBot && game.phase !== 'over') {
      const siirtoVaihe = game.phase === 'move';
      const kohdeKaupungit = siirtoVaihe
        ? new Set(game.moveOptions().map((opt) => opt.city?.id).filter(Boolean))
        : null;
      for (const c of game.board.cities) {
        if (kohdeKaupungit?.has(c.id)) continue;
        const g = el('g', { class: 'target' }, this.targetLayer);
        el('circle', { cx: c.x, cy: c.y, r: 34, class: 'target-hit' }, g);
        g.addEventListener('click', () => this.doKehittajaSiirto(c));
      }
      // Siirtovaiheessa jatketaan kohderenkaisiin; muissa vaiheissa
      // kehittäjätila on ainoa tapa napauttaa kartalta.
      if (!siirtoVaihe) return;
    }

    /*
     * LÄHTÖPISTEEN VALINTA — ETUSIVUN VALINTAKARTTA.
     *
     * Kohdepisteitä on tasan yksi (ks. ETUSIVUN_KOHTEET): Ateena.
     * Pisteitä lisätään sitä mukaa kun maita valmistuu
     * fokusjärjestelmälle. Sofia on jo pelissä, mutta se EI ole
     * aloituskohde — sinne kävellään Ateenasta.
     *
     * PISTEET ILMESTYVÄT VASTA LÄHIKUVASSA (omistajan tilaus
     * 25.8.2026). Etusivulla kartan päällä on avauspalsta, ja kartta
     * on sen takana sumennettuna; vasta klikattava viimeinen lause
     * ("Aloitan sieltä, mistä hänkin — Lontoosta.", ui.aloitaKartalta)
     * vie kartan koko ruudulle Lontoon kohdalle, ja siitä näkymästä
     * kohde valitaan.
     */
    if (game.phase === 'pickstart') {
      if (!this.aloitusZoom) return;
      // Puhelimella ensimmäinen napautus zoomaa kartan lähemmäs sen
      // sijaan että valitsisi kaupungin — kaukaa katsottuna kaupungit
      // ovat liian pieniä osuttaviksi (omistajan havainto). Zoomauksen
      // hoitaa paneelin oma kuuntelija (asennaPanorointi), joten tässä
      // riittää olla valitsematta kaupunkia.
      const zoomaa = this.kartta.zoomTarpeen() && !this.aloitusZoom;
      for (const c of game.board.cities) {
        if (!ETUSIVUN_KOHTEET.has(c.id)) continue;
        kohdeKaupungit.add(c.id);
        for (const x of this.kiertoKohdat(c.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          this.kohdeOsuma(g, x, c.y, 34);
          if (this.fokusKohdeMerkit()) this.fokusKohdeMerkki(g, x, c.y, c);
          else {
            el('circle', {
              cx: x,
              cy: c.y,
              r: c.start ? 27 : 22,
              class: 'target-ring pick',
            }, g);
          }
          g.addEventListener('click', () => {
            if (!zoomaa) this.doPickStart(c);
          });
        }
      }
      return;
    }

    // Lentokohteet näkyvät kartalla lentovalinnan aikana: rengas ja pieni
    // kone kohdekaupungin päällä, ja napautus ostaa lennon suoraan
    // (omistajan toive). Porttilennot toisille laudoille pysyvät napeissa,
    // koska niiden kohde ei ole tällä kartalla.
    if (game.phase === 'action' && this.travelExpanded
      && this.travelSuodatin !== 'sea' && !game.player.isBot) {
      for (const dest of game.airportDestinations()) {
        const city = game.board.cityById.get(dest);
        if (!city) continue;
        kohdeKaupungit.add(city.id);
        for (const x of this.kiertoKohdat(city.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          this.kohdeOsuma(g, x, city.y, 34);
          if (this.fokusKohdeMerkit()) {
            // Lentokohteessa kone kulkee nimen edessä: sama pieni merkki
            // kuin muillakin kohteilla, mutta valinta on eri.
            this.fokusKohdeMerkki(g, x, city.y, city, '✈ ');
          } else {
            el('circle', { cx: x, cy: city.y, r: 25, class: 'target-ring lento' }, g);
            const merkki = el('text', {
              x, y: city.y - 33, class: 'lento-kohde-merkki', 'text-anchor': 'middle',
            }, g);
            merkki.textContent = '✈';
          }
          g.addEventListener('click', () => this.doFly(dest));
        }
      }
      return;
    }

    if (game.phase !== 'move' || game.player.isBot) return;
    for (const opt of game.moveOptions()) {
      const { x, y } = pixelOf(game.board, opt.pos);
      if (opt.city?.id) kohdeKaupungit.add(opt.city.id);
      for (const kx of this.kiertoKohdat(x)) {
        const g = el('g', { class: 'target' }, this.targetLayer);
        this.kohdeOsuma(g, kx, y, 30);
        if (this.fokusKohdeMerkit()) this.fokusKohdeMerkki(g, kx, y, opt.city ?? null);
        else {
          /*
           * Pelkkä koriste renkaan alla: pehmeästi laajeneva kultahalo,
           * jolla valittavat kohteet erottuvat kartasta (omistajan
           * havainto 18.8.2026). Ei osu klikkauksiin (pointer-events:
           * none CSS:ssä) — osuma-alue on yllä oleva target-hit.
           */
          el('circle', {
            cx: kx,
            cy: y,
            r: opt.city ? 22 : 14,
            class: 'target-halo',
          }, g);
          el('circle', {
            cx: kx,
            cy: y,
            r: opt.city ? 22 : 14,
            class: opt.city ? 'target-ring' : 'target-ring far',
          }, g);
        }
        g.addEventListener('click', () => this.doMove(opt.key));
      }
    }
  }

  /* --- KOHDEMERKIT FOKUSNÄKYMÄSSÄ (omistaja 26.8.2026) -------------- */

  /**
   * Piirretäänkö kohteet fokusnäkymän kielellä (pieni piste + nimi)?
   *
   * EHTO ON FOKUSMOODI, EI LEHTI. Sama valinta kuin kaupungin laatalla
   * (fokusLaattaTutkii): lehti saapuu verkosta kesken pelin ja on
   * toistaiseksi vain Kreikassa, joten lehteen sidottu ehto vaihtaisi
   * merkkien kielen kesken vuoron. Omistajan tilaus koskee myös lehden
   * ULKOPUOLELLA olevia kohteita (Sofia), joten ehdon on kannettava
   * koko kartan yli.
   *
   * LÄHTÖPISTEEN VALINTA ON POIKKEUS. Siinä KAIKKI laudan kaupungit ovat
   * kohteita — Euroopassa kymmeniä — ja jokainen saisi nimen merkkinsä
   * viereen, vaikka sama nimi on jo kaupungin omassa laatassa. Sama raja
   * on fokusmoodin muillakin kerroksilla (paivitaFokusKerros,
   * fokusSumuPaalla): pickstart-vaiheessa fokusmoodi ei ole vielä
   * käynnissä.
   */
  fokusKohdeMerkit() {
    if (!this.fokusmoodi || this.katselu) return false;
    return this.game.phase !== 'pickstart';
  }

  /**
   * Kohteen napautusalue. Säde talletetaan data-määreeseen, koska
   * fokusnäkymässä sitä kasvatetaan zoomin mukaan sormenkokoiseksi
   * (paivitaFokusKohdeMitat) eikä alkuperäistä saa arvata takaisin.
   */
  kohdeOsuma(g, x, y, r) {
    const osuma = el('circle', {
      cx: x, cy: y, r, class: 'target-hit',
    }, g);
    osuma.dataset.perusR = String(r);
    return osuma;
  }

  /**
   * Valittavan kohteen merkki fokusnäkymässä: pieni pyöreä laatta ja
   * sen yläpuolella kohteen nimi.
   *
   * MITAT ANNETAAN LAUDAN YKSIKÖISSÄ MUTTA TARKOITETAAN RUUDULLE.
   * Tässä piirretään karkea alkuarvo, ja paivitaFokusKohdeMitat asettaa
   * lopullisen säteen ja kirjasinkoon nykyisestä zoomista — sama kaava
   * kuin nykyisen kaupungin laatalla ja fokusvirran kuvavinjeteillä.
   * Alkuperäinen keskipiste jää data-määreisiin, jotta nimen etäisyys
   * merkistä voidaan laskea uudelleen joka zoomilla.
   *
   * NIMETÖN KOHDE on askelpiste reitin varrella (nopanheiton väliruutu),
   * ei kaupunki: se saa pienemmän pisteen eikä nimeä lainkaan.
   */
  fokusKohdeMerkki(g, x, y, city = null, etuliite = '') {
    const px = city ? FOKUS_KOHDE_PX : FOKUS_KOHDE_PISTE_PX;
    const piste = el('circle', {
      cx: x,
      cy: y,
      r: px / 2,
      class: city ? 'target-piste' : 'target-piste far',
    }, g);
    piste.dataset.px = String(px);
    if (!city) return;
    const nimi = el('text', {
      x,
      y: y - px,
      class: 'target-nimi',
      'text-anchor': 'middle',
      'font-size': FOKUS_KOHDE_NIMI_PX,
    }, g);
    nimi.dataset.ky = String(y);
    nimi.textContent = `${etuliite}${city.name}`;
  }

  /**
   * Kohdemerkkien koko RUUDULLA: pisteet, nimet ja napautusalueet.
   *
   * Kutsutaan samoista kahdesta paikasta kuin nykyisen kaupungin laatan
   * mitat (paivitaFokusPallot joka piirrossa, paivitaMaastonimet kun
   * näkymä on asettunut), jotta merkki ei kasva eikä kutistu zoomin
   * mukana.
   */
  paivitaFokusKohdeMitat() {
    if (!this.targetLayer || !this.fokusKohdeMerkit()) return;
    const osat = this.targetLayer.querySelectorAll(
      '.target-piste, .target-nimi, .target-hit',
    );
    if (!osat.length) return;
    const skaala = this.nakyvaAlue()?.skaala;
    // Ilman mitattavaa näkymää entinen koko on parempi kuin väärä.
    if (!Number.isFinite(skaala) || skaala <= 0) return;
    // Kartan mittakaava, ei ruudun (omistaja 25.8.2026: "nimilaput
    // samalla lailla") — sama vakio kuin merkeillä ja nimilapuilla.
    const kerroin = this.fokusMerkkiSkaala();
    for (const osa of osat) {
      if (osa.classList.contains('target-piste')) {
        const px = Number(osa.dataset.px) || FOKUS_KOHDE_PX;
        osa.setAttribute('r', ((px / 2) * kerroin).toFixed(2));
      } else if (osa.classList.contains('target-nimi')) {
        osa.setAttribute('font-size', (FOKUS_KOHDE_NIMI_PX * kerroin).toFixed(2));
        const y = Number(osa.dataset.ky);
        if (Number.isFinite(y)) {
          // Nimi merkin yläpuolelle: puolikas merkkiä ja pieni rako.
          osa.setAttribute('y', (y - (FOKUS_KOHDE_PX / 2 + 6) * kerroin).toFixed(2));
        }
      } else {
        /*
         * Napautusalue: sormenkokoinen perustasolla, mutta ei koskaan
         * pienempi kuin laudan oma alue eikä suurempi kuin naapurien
         * väli (sama katto kuin laatalla).
         */
        const perus = Number(osa.dataset.perusR) || 0;
        osa.setAttribute('r', Math.max(
          perus,
          Math.min((FOKUS_KOHDE_OSUMA_PX / 2) * kerroin, FOKUS_LAATTA_OSUMA_LAUDALLA),
        ).toFixed(2));
      }
    }
  }

  /*
   * Napautettavan kohdan x-koordinaatit.
   *
   * Kartan sisällöstä on kiertävällä laudalla <use>-kopio laudan
   * leveyden verran oikealla, mutta kopiosta ei voi napauttaa mitään:
   * tapahtuma osuisi <use>-elementtiin eikä sen sisältöön. Siksi
   * napautettavat renkaat piirretään oikeina elementteinä molempiin
   * kohtiin. Niitä on korkeintaan muutama kymmenen, joten hinta on
   * olematon — ja ilman tätä oikeaan laitaan kiertynyt kaupunki näyttää
   * napautettavalta mutta ei ole sitä.
   */
  kiertoKohdat(x) {
    if (!this.kartta.kiertava()) return [x];
    return [x, x + this.game.pack.map.width];
  }

  /**
   * Pelinappula: hahmo (valkoinen nappula tai tinaherra, ks.
   * NAPPULA_TYYLI), koodilla piirretty varjo ja vuoron rengas.
   *
   * RAKENNE ON HYPPYÄ VARTEN (#100). Ryhmä on kolmiosainen, ja jako
   * on koko 3D-illuusion perusta:
   *
   *   .pawn        paikka laudalla — VAIN vaakasuunta liikkuu
   *   .pawn-varjo  jää laudan pintaan; kutistuu ja haalenee kun
   *                nappula nousee (hyppaaAskel)
   *   .pawn-hahmo  itse nappula — VAIN pystysuunta liikkuu
   *
   * Jos hahmo ja varjo olisivat samassa muunnoksessa, varjo nousisi
   * mukana eikä korkeus näkyisi mistään. Erillään ne kertovat sen
   * ilman yhtään lisäpikseliä: mitä kauempana varjo on jaloista ja
   * mitä haaleampi se on, sitä ylempänä nappula leijuu.
   *
   * VARJON PAIKKA ON NAPPULAN JALKOJEN KOHDALLA eikä keskipisteessä:
   * hahmo seisoo laudalla, ja sen kosketuskohta on jalusta.
   */
  pawnShape(parent, player, active) {
    const g = el('g', { class: 'pawn' }, parent);
    const varjo = el('g', { class: 'pawn-varjo' }, g);
    varjo.setAttribute('transform', `translate(1.2,${NAPPULAN_JALKA_Y})`);
    /*
     * Varjo on nappulan jalustan levyinen — eikä leveämpi. Varjo on
     * ainoa TÄYTETTY osa hahmon ulkopuolella (vuororengas on pelkkä
     * viiva), joten se on myös ainoa, joka voi peittää kaupungin
     * laattaa. 3,9 on täsmälleen jalustan puolikas: varjo on hahmon
     * kosketuskohta eikä sitä isompi läiskä, ja laatan reuna (11,6
     * laudan yksikköä) jää sen ympärille joka suunnasta näkyviin,
     * kuten omistaja 28.8.2026 pyysi. Luku kutistui hahmon mukana
     * (5 -> 3,9, ks. NAPPULAN_POLKU).
     */
    const varjonR = NAPPULA_TYYLI === 'tinaherra' ? 10 : 3.9;
    el('ellipse', { cx: 0, cy: 0, rx: varjonR, ry: varjonR * 0.36, class: 'pawn-shadow' }, varjo);
    /*
     * VUORON RENGAS MAKAA LAUDALLA (#100). Ympyrä kiersi ennen
     * pyöreää nappulaa, mutta seisovan hahmon ympärillä se olisi
     * pystyssä oleva kehä keskellä säärtä. Litistetty ellipsi lukee
     * kartan pinnalla olevaksi valoksi — samasta perspektiivistä kuin
     * varjo, joka on sen sisällä.
     *
     * YKSI RENGAS, EI KAHTA (omistajan pelitesti 27.8.2026,
     * iPad-kaappaus Sofian fokuslaudalta: nappulan alla oli *"monta
     * päällekkäistä kerrosta"*). Renkaita oli tähän asti kaksi: tumma
     * kehä ja sen päällä pelaajan värinen sykähdys (.pawn-pulse), joka
     * laajeni puolitoistakertaiseksi ja himmeni. Fokuslaudalla, jossa
     * merkit skaalataan ruudulle, se luki punertavana hehkuna hahmon
     * jalkojen ympärillä — kolmantena kerroksena varjon ja kaupungin
     * korostuksen päällä. Pelaajan väri jäi pois nappulasta kokonaan:
     * hahmo on kaikilla sama nappula, eikä sykähdys kertonut vuorosta
     * mitään, mitä tumma kehä ei kertoisi hillitymmin.
     *
     * SAMALLA KATOSI KARTAN AINOA JATKUVA SYKE NAPPULASSA. Sykähdys oli
     * laudan SVG:n sisällä, joten jokainen kehys likasi koko laudan
     * asettelun (ks. css `body.kartta-raahaus` -lista) ja pudotti
     * ruudunpäivityksen mitatusti 60 fps:stä 15:een — siksi sille oli
     * kaksi erillistä vaimennussääntöä. Ne poistuivat tämän mukana.
     */
    if (active) {
      /*
       * RENGAS MAHTUU LAATAN SISÄÄN (28.8.2026). Kun kaupungin laatta
       * tuli takaisin nappulan alle, entisen kokoinen rengas (9,6)
       * leikkasi laatan poikki: litistetty ellipsi on jalkapisteen
       * korkeudella laattaa leveämpi, ja lopputulos luki kuminauhana
       * laatan ympärillä. Ulkopuolelle sitä ei voi siirtää — matalan
       * ellipsin kaari kulkisi silti laatan yli — joten se mahtuu
       * sisään.
       *
       * JA SELVÄSTI VARJOA ISOMPI (5,6 vs. varjonR 3,9). Yhtä suurina
       * rengas ja varjo asettuivat päällekkäin ja hahmon jalusta muuttui
       * yhdeksi tummaksi möhkäleeksi — sama pino, jota vastaan koko
       * tilaus tehtiin. Nyt rengas kiertää varjon ympäri renkaana.
       */
      const renkaanR = NAPPULA_TYYLI === 'tinaherra' ? 12 : 5.6;
      el('ellipse', {
        cy: NAPPULAN_JALKA_Y, rx: renkaanR, ry: renkaanR * 0.383, class: 'pawn-active-ring',
      }, g);
    }
    const hahmo = el('g', { class: 'pawn-hahmo' }, g);
    /*
     * HAHMON KAKSI TYYLIÄ (ks. NAPPULA_TYYLI). Molemmat asettuvat samaan
     * ankkuriin — jalkapiste on kaupungin päällä, `NAPPULAN_JALKA_Y`
     * verran pisteen alapuolella — ja molemmat elävät saman `.pawn-kuva`
     * -luokan alla, jotta lehden päällä tehtävä mittaus (paivitaFokusPallot,
     * savukkeet) löytää hahmon pinnan tyylistä riippumatta.
     */
    if (NAPPULA_TYYLI === 'tinaherra') {
      el('image', {
        class: 'pawn-kuva',
        href: NAPPULAN_KUVA,
        x: -NAPPULAN_ANKKURI_X * NAPPULAN_LEVEYS,
        y: NAPPULAN_JALKA_Y - NAPPULAN_ANKKURI_Y * NAPPULAN_KORKEUS,
        width: NAPPULAN_LEVEYS,
        height: NAPPULAN_KORKEUS,
        preserveAspectRatio: 'xMidYMid meet',
      }, hahmo);
    } else {
      el('path', {
        class: 'pawn-kuva pawn-nappula',
        d: NAPPULAN_POLKU,
        transform: `translate(0,${NAPPULAN_JALKA_Y})`,
      }, hahmo);
    }
    /*
     * NAPPULAN PÄÄN YLLE EI TULE MERKKIÄ (omistajan linjaus 28.8.2026
     * ilta, kuvakaappaus Sofiasta: kaupungin kohdalla on vain laatta ja
     * nappula, *"ei mitään muuta symbolia"*). Tässä oli kannettujen
     * unohdettujen aarteiden ◈ hahmon laen yläpuolella (lakiY − 2,65),
     * ja se oli yksi kuvan päällekkäisistä kerroksista: kullattu
     * vinoneliö leijumassa nappulan yllä. Sama tieto on matkalaukun
     * Aarnin luettelossa (◈ löytyi -rivit), eikä se katoa pelistä.
     */
    return g;
  }

  /**
   * Nappulan puuliuku kerran koko kerrokselle.
   *
   * MIKSI DEFS EIKÄ CSS-VÄRI: sorvattu puu on ylhäältä vaaleampi kuin
   * alhaalta, ja juuri se ero erottaa nappulan litteästä läiskästä
   * pienessäkin koossa. Liuku on `objectBoundingBox`-mitoissa, joten se
   * seuraa hahmoa muunnoksesta ja fokusnäkymän skaalauksesta
   * riippumatta — userSpaceOnUse vaatisi polun omat koordinaatit.
   *
   * KERRAN KERROKSEEN, EI NAPPULAA KOHTI: sama tunnus kelpaa kaikille
   * nappuloille, ja kahdella samannimisellä määrittelyllä olisi sama
   * loppu kuin kahdella id-määreellä yleensä. Kerros tyhjennetään joka
   * piirrossa (drawPawns), joten liuku on rakennettava uudelleen sen
   * mukana; hinta on kolme elementtiä.
   *
   * CSS:ssä on VARAVÄRI (.pawn-nappula fill), joka puree jos määrittely
   * jostain syystä puuttuu — esimerkiksi irrotetussa SVG:ssä. Tyhjä
   * hahmo olisi pahempi vika kuin litteä hahmo.
   */
  puuliuku(parent) {
    const defs = el('defs', {}, parent);
    const liuku = el('linearGradient', {
      id: 'nappula-puu', x1: 0, y1: 0, x2: 0, y2: 1,
    }, defs);
    el('stop', { offset: 0, 'stop-color': '#d9b47c' }, liuku);
    el('stop', { offset: 0.55, 'stop-color': '#c49a63' }, liuku);
    el('stop', { offset: 1, 'stop-color': '#a87e4c' }, liuku);
  }

  drawPawns() {
    const { game } = this;
    this.pawnLayer.textContent = '';
    this.puuliuku(this.pawnLayer);
    const groups = new Map();
    for (const p of game.players) {
      if (p.id === this.movingPlayerId) continue; // liikkuva nappula piirretään erikseen
      if (p.packId !== this.drawnPackId) continue; // toisella laudalla olevat eivät näy
      const key = posKey(p.pos);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(p);
    }
    for (const [, players] of groups) {
      const base = pixelOf(game.board, players[0].pos);
      players.forEach((p, i) => {
        const angle = (i / Math.max(players.length, 1)) * Math.PI * 2 - Math.PI / 2;
        const spread = players.length > 1 ? 17 : 0;
        const x = base.x + Math.cos(angle) * spread;
        const y = base.y + Math.sin(angle) * spread;
        const g = this.pawnShape(this.pawnLayer, p, p.id === game.current && !this.busy);
        g.setAttribute('transform', `translate(${x},${y})`);
        // Paikka talteen fokuslehden pallonpiilotusta varten: nappula
        // asuu muunnoksessa, eikä sen koordinaatteja saa muuten selville
        // ilman geometrian mittaamista (paivitaFokusPallot).
        g.dataset.x = x;
        g.dataset.y = y;
      });
    }
  }

  // --- paneeli ------------------------------------------------------------

  renderTurnPill() {
    const { game } = this;
    /*
     * Etusivulla ja avauslennolla yläpalkki on tyhjä: laukku, kukkaro
     * ja päivä ilmestyvät vasta ensimmäiseen kaupunkiin saavuttaessa
     * (omistaja 26.8.2026). Lento päättää itsensä render-kutsulla,
     * joten pilleri syttyy täsmälleen saapumisen hetkellä; ladatussa
     * pelissä kumpikaan ehto ei ole tosi ja pilleri näkyy heti.
     */
    const piilossa = game.phase === 'pickstart' || this.aloituslentoKesken;
    this.turnPill.hidden = piilossa;
    if (piilossa) return;
    this.turnPill.textContent = '';
    // Laukun kahva pillerin edessä: pilleri on samalla matkalaukun nappi,
    // ja ilman kuvaketta mikään ei kertoisi sen aukeavan (omistajan toive).
    const laukku = html('span', 'laukku-ikoni');
    laukku.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<rect x="4" y="8" width="16" height="11.5" rx="2"/>'
      + '<path d="M9.3 8V6.3a1.7 1.7 0 0 1 1.7-1.7h2a1.7 1.7 0 0 1 1.7 1.7V8'
      + 'M8.6 8v11.5M15.4 8v11.5"/></svg>';
    this.turnPill.appendChild(laukku);
    if (game.phase === 'over') {
      this.turnPill.appendChild(html('span', '', `${game.winner.name} voitti`));
      return;
    }
    // Yläpalkissa on kukkaro ja päiväkirjan päivämäärä. Sijainti, kokemus ja
    // tietoprosentti ovat passissa: kartta on tärkeämpi kuin mittaristo.
    this.turnPill.appendChild(html('span', '', `£${game.player.money}`));
    // Mittari on päivämäärä, ei kello eikä palkki: aika on tarinaa, ei uhkaa,
    // joten se ei saa hälytysväriä eikä muutu punaiseksi ennätyksen jälkeen.
    const kello = game.clockLabel();
    this.turnPill.appendChild(html('span', 'clock', kello));
    // Ajan eteneminen välähtää kevyesti, jotta pelaaja huomaa vilkaista
    // päivämäärää (omistajan toive). Ensimmäinen piirto ei väläytä.
    if (this.kelloEdellinen !== undefined && this.kelloEdellinen !== kello) {
      this.turnPill.classList.remove('aika-valahdys');
      void this.turnPill.offsetWidth;
      this.turnPill.classList.add('aika-valahdys');
    }
    this.kelloEdellinen = kello;
  }

  /**
   * Matkan tiedot laukkuun: missä ollaan, paljonko tietäjäpisteitä ja
   * tietoa — ja kuinka pitkällä matka on kolmella mittarilla.
   *
   * LUVUT LASKETAAN AINA PELITILASTA (omistajan tilaus 18.8.2026), ei
   * omasta kirjanpidosta. Laukku rakentaa sisältönsä joka avauksella
   * (js/main.js), joten laskurit ovat tuoreita eikä niitä tarvitse
   * tallentaa erikseen: käydyt kaupungit ovat maailman visited-joukossa
   * ja löytyneet aarteet starsFound-taulussa, jotka molemmat kulkevat
   * tallennuksessa mukana.
   */
  renderProgress() {
    const { game } = this;
    const p = game.player;
    this.passportProgress.textContent = '';

    /*
     * Rivi palauttaa itsensä, jotta kutsuja voi ripustaa siihen omansa
     * (tietäjärivin avatar ja i-nappi). Kuvakeparametria ei ole:
     * matkalohkon ainoa kuva on tietäjän muotokuva, ja se on kuva eikä
     * viivakuvake — yhden käyttäjän parametri olisi vain kiertotie.
     */
    const rivi = (label, value) => {
      const row = html('div', 'find');
      row.appendChild(html('span', 'find-text', label));
      row.appendChild(html('span', 'find-value', value));
      this.passportProgress.appendChild(row);
      return row;
    };

    const city = this.factCity(p.pos);
    rivi('Sijainti', p.pos.type === 'edge' ? `matkalla — ${city.name}` : city.name);
    rivi('Kukkaro', `£${p.money}`);

    /*
     * TIETÄJÄRIVI: nimike on rivin selite ja oikeassa reunassa vain
     * pisteet (omistajan tarkennus 18.8.2026: "Tietäjä-tekstin voisi
     * korvata tuolla maailmanmatkaajatekstillä ja i voisi olla sen
     * perässä ja oikeassa reunassa vain pisteet"). Rivin edessä on
     * NYKYISEN TASON AVATAR pyöreänä kuvakkeena — muotokuva kertoo
     * roolin, ja kuva vaihtuu joka nousussa.
     */
    const pisteet = p.xp ?? 0;
    const taso = tietajataso(pisteet);
    const tietajaRivi = rivi(taso.nimi, `${pisteet} tp`);
    const avatar = document.createElement('img');
    avatar.className = 'find-avatar';
    avatar.src = tietajaAvatar(taso);
    avatar.alt = '';
    avatar.decoding = 'async';
    avatar.draggable = false;
    tietajaRivi.prepend(avatar);
    /*
     * i-NAPPI HETI NIMIKKEEN PERÄÄN (omistajan tarkennus 18.8.2026;
     * pisteet jäävät yksin oikeaan reunaan): mistä pisteet tulevat ja
     * mitä tasoja on olemassa. Selitys ei mahdu laukkuun, joten se on
     * minipopupissa (js/tietajagalleria.js) — pikkuseloste ei riitä,
     * koska mukana on kymmenen kuvan ruudukko.
     *
     * Nappi lainaa pikkuselosteen `seloste-nappi`-asun: samassa
     * laukussa on jo Aarnin luettelon i-nappi, eivätkä kaksi i-nappia
     * saa näyttää kahdelta eri napilta.
     */
    const info = html('button', 'seloste-nappi tietaja-info', 'i');
    info.type = 'button';
    info.title = 'Tietäjän tie';
    info.setAttribute('aria-label', 'Mikä tietäjätaso on?');
    info.addEventListener('click', () => avaaTietajagalleria(pisteet));
    tietajaRivi.querySelector('.find-text').after(info);

    /*
     * EDISTYMISPALKKI rivin alle: täyttyy nykyisen tason alusta
     * seuraavan rajaan ja nollautuu noustessa. Palkki on ohut ja
     * kullanvärinen — mittari, ei hälytin. Ylimmällä tasolla sitä ei
     * piirretä lainkaan, koska täysi palkki ilman seuraavaa rajaa
     * lupaisi jotain mitä ei ole.
     */
    const seuraava = seuraavaTietajataso(pisteet);
    if (seuraava) {
      const palkki = html('div', 'tietaja-palkki');
      const tayte = html('div', 'tietaja-palkki-tayte');
      tayte.style.width = `${Math.round(tietajatasonOsuus(pisteet) * 100)}%`;
      palkki.appendChild(tayte);
      this.passportProgress.appendChild(palkki);
      /*
       * Seuraava raja hienovaraisesti palkin alle: se on vihje eikä
       * mittari, joten se on pienemmällä ja himmeämmällä. Ylimmällä
       * tasolla riviä ei ole lainkaan — "seuraava: ei mitään" on
       * huonompi kuin hiljaisuus.
       */
      this.passportProgress.appendChild(html(
        'p',
        'tietaja-seuraava',
        `Seuraava taso ${seuraava.raja} tp: ${seuraava.nimi}`,
      ));
    }

    // Aarteet: sama laskenta kuin Aarnin luettelossa, jotta laukun kaksi
    // aarrelukua eivät voi mennä eri tahtiin.
    const { kaikki, loydetyt } = this.aarreLuettelo();
    rivi('Avatut aarteet', `${loydetyt.length} / ${kaikki.length}`);

    /*
     * Kaupungit ja maat TÄLTÄ LAUDALTA. Lauta on maailmankartta, jolla
     * peliä pelataan (js/pack.js: "PELI on yksi lauta"), ja sen
     * kaupungit ovat pakkauksen omaa dataa — MAX ei siis voi mennä eri
     * tahtiin sisällön kanssa.
     *
     * Maa luetaan map.cityCountry-taulusta, samasta lähteestä kuin
     * kartan maakyltti ja maalehti. Kaupunki ilman maatunnusta
     * (Jerusalem) ei kasvata kumpaakaan lukua — se on rehellisempää
     * kuin arvata sille maa.
     */
    const kaydyt = game.worldOf?.(p)?.visited ?? new Set();
    const kaupunkeja = game.pack?.cities?.length ?? 0;
    if (kaupunkeja) rivi('Käydyt kaupungit', `${kaydyt.size} / ${kaupunkeja}`);

    const maaTaulu = game.pack?.map?.cityCountry ?? null;
    if (maaTaulu) {
      const kaikkiMaat = new Set(Object.values(maaTaulu).filter(Boolean));
      if (kaikkiMaat.size) {
        const kaydytMaat = new Set();
        for (const cityId of kaydyt) {
          const iso = maaTaulu[cityId];
          if (iso) kaydytMaat.add(iso);
        }
        rivi('Käydyt maat', `${kaydytMaat.size} / ${kaikkiMaat.size}`);
      }
    }

    const tieto = game.knowledgePercent(p);
    if (tieto !== null) rivi('Tieto tästä laudasta', `${tieto} %`);
  }

  renderActions() {
    const { game } = this;
    this.actionsEl.textContent = '';
    // Matkustustavan ensimmäinen vaihe latoo nappinsa aina yhteen riviin;
    // muut näkymät (vaihe B, kysymykset) käyttävät tavallista ruudukkoa.
    delete this.actionsEl.dataset.rivi;
    this.errorEl.hidden = true;

    if (game.phase === 'over') {
      const again = html('button', 'primary', 'Uusi peli');
      again.addEventListener('click', () => this.onNewGame());
      this.actionsEl.appendChild(again);
      return;
    }

    const p = game.player;

    // Lähtöpisteen valinta tehdään kartalta yhdellä napautuksella.
    // Aloitusnäkymässä ei ole toimintoja: avausteksti hoitaa kehotuksen,
    // ja tyhjä kortti vain veisi tilaa kartalta.
    if (game.phase === 'pickstart') {
      this.turnCard.hidden = true;
      return;
    }
    this.turnCard.hidden = false;

    /*
     * Botin vuoro, siirtovaihe, tapahtuma ja tietovisa: kortissa ei ole
     * nappeja eikä tekstiä. Ennen näissä kirjoitettiin tilariville
     * ("Heitit 4 — valitse kohde kartalta", "Matkalla sattui jotain"),
     * mutta kortti kelluu kartan päällä, joten teksti oli tekstiä kartan
     * päällä — ja juuri se poistui (omistaja 13.8.2026). Siirtovaiheessa
     * kehotuksen kertovat kartan korostetut kohteet; jos pelaaja jää
     * pitkäksi aikaa paikalleen, pöllö vinkkaa (paivitaValintavihje).
     */
    if (p.isBot || game.phase === 'move' || game.phase === 'event' || game.phase === 'quiz') {
      return;
    }

    const modes = game.travelModes();

    // Saapuminen aarrekaupunkiin kerrotaan keskelle ruutua omana korttinaan;
    // valinta tehdään siellä, joten toimintopaneeliin ei tule nappeja.
    if (game.phase === 'offer') {
      this.openArrival(game.cityOf());
      return;
    }

    if (game.phase === 'roll') {
      /*
       * NOPPA EI PYÖRÄHDÄ ITSESTÄÄN (omistajan pelitesti 27.8.2026,
       * iPhone: *"kun aarteen on avannut, peli menee SUORAAN
       * nopanheittoon. Pelaajan pitää itse saada valita matkustaako vai
       * ei"*).
       *
       * Aarteen avaus päättää vuoron, ja seuraava vuoro alkaa
       * sisämaakaupungissa yhdellä ainoalla matkustustavalla — silloin
       * game.beginTurn valitsee tavan valmiiksi (autoTravel) ja vaihe on
       * heti 'roll'. Tässä oli sen pari: `autoRoll`, joka heitti nopan
       * 320 ms:n kuluttua ilman painallusta. Aarrekortin sulkeuduttua se
       * näytti siltä, että peli lähtee matkaan pelaajan puolesta.
       *
       * TAVAN ESIVALINTA JÄÄ (game.js autoTravel): kun vaihtoehtoja on
       * yksi, siitä ei ole mitään valittavaa — turha napautus ei ole
       * valinnanvapautta. HEITTO on eri asia: se on se hetki, jossa
       * pelaaja päättää lähteäkö vai jäädäkö tutkimaan, ja se painetaan
       * aina itse.
       *
       * Nopanheitto ja matkustustavan vaihto ovat monitoiminapin
       * liu'ussa kuten muutkin matkustustoiminnot (omistajan linjaus
       * 12.8.2026): alanappirivi on aina täsmälleen kolme paikkaa.
       */
      const rollBtn = this.iconButton('noppa', 'Heitä noppa', 'primary');
      rollBtn.addEventListener('click', () => this.doRoll());
      const napit = [rollBtn];
      /*
       * Paluunappi vain kun on mihin palata. Esivalitulla tavalla
       * game.actionCancelTravel torjuu paluun ("Muita matkustustapoja ei
       * ole"), joten nappi näyttäisi vain virheilmoituksen.
       */
      if (!game.autoTravel) {
        const backBtn = this.iconButton('nuoli', 'Vaihda matkustustapa');
        backBtn.addEventListener('click', () => this.doAction(() => game.actionCancelTravel()));
        napit.push(backBtn);
      }

      this.piirraToimintorivi(napit, this.tutkiNappi());
      return;
    }

    // Vaihe 'action': matkustustavan valinta. Näytöllä pidetään kerrallaan
    // vain kourallinen nappeja — laivat, lennot ja portit odottavat
    // toisen vaiheen takana.
    this.renderTravelChoice(modes);
  }

  /**
   * Matkustustavan valinta kahdessa vaiheessa.
   *
   * VAIHE A on alanappirivin liuku: kolme nappia — jalan, laiva ja lento
   * (omistajan linjaus 12.8.2026). Aiemmin laiva ja lento olivat saman
   * "Laiva & lento" -napin takana, ja pelaaja joutui etsimään lentonsa
   * laivalistan seasta. Nyt nappi valitsee jo listan: LAIVA avaa vaiheen
   * B pelkillä laivavaihtoehdoilla, LENTO pelkillä lentävillä
   * vaihtoehdoilla (lennot, mannerlennot ja portit). Se mitä listassa
   * NÄYTETÄÄN suodattuu — säännöt, hinnat ja toiminnot ovat ennallaan.
   *
   * VAIHE B (`travelExpanded`) on entinen valikko. `travelSuodatin`
   * kertoo kumpi puoli näytetään: 'sea', 'air' tai null (molemmat).
   */
  renderTravelChoice(modes) {
    const { game } = this;
    const flights = game.airportDestinations();
    const gateways = game.gatewayOptions();
    const countryGates = game.countryGateOptions();
    // Mannerlento aukeaa, kun tämän mantereen unohdettu aarre on
    // löytynyt — se ei vaadi lentokenttää, joten se on oma listansa.
    const mannerLennot = game.mannerLennot();
    /*
     * Portit (vaellus ja tietoportti) kuuluvat LENNON puolelle: molemmat
     * ovat pitkiä lentoja toiselle laudalle (game.gatewayOptions), eikä
     * kumpikaan ole laivamatka. Näin mikään vaihtoehto ei jää kahden
     * napin väliin saavuttamattomiin.
     */
    const laivaa = modes.includes('sea');
    const lentoa = flights.length > 0 || mannerLennot.length > 0
      || gateways.length > 0 || countryGates.length > 0;
    const hasSlow = laivaa || lentoa;

    // Jos välivaiheeseen ei jää yhtään valintaa (esim. rahat eivät riitä
    // lentoon eikä satamaa ole), palataan suoraan perusvalintoihin —
    // pelkkä Takaisin-nappi ei ole näkymä. Sama koskee tyhjäksi jäävää
    // suodatinta: laivalistaa ei avata, jos laivoja ei ole.
    const suodatinTyhja = (this.travelSuodatin === 'sea' && !laivaa)
      || (this.travelSuodatin === 'air' && !lentoa);
    if (this.travelExpanded && (!hasSlow || suodatinTyhja)) this.suljeMatkavalikko();

    if (!this.travelExpanded) {
      /*
       * OTSIKKORIVI POIS (omistajan päätös 12.8.2026): kolme
       * matkanappia kertovat itse mitä valitaan, eikä "Valitse
       * matkustustapa." lisää siihen mitään. Koko tilarivi poistui
       * 13.8.2026 — kartan päälle ei kirjoiteta mitään.
       */
      // Jalan. Estettynä kerrotaan syy napin vihjetekstissä, kuten muissakin
      // pelin estetyissä napeissa (vrt. vertailunappi).
      const landBtn = this.iconButton('saapas', 'Jalan',
        modes.includes('land') && !modes.includes('stay') ? 'primary' : '');
      if (modes.includes('land')) landBtn.addEventListener('click', () => this.doWalk());
      else this.estaNappi(landBtn, this.maaEste());

      const laivaBtn = this.iconButton('purje', 'Laivalla');
      if (laivaa) {
        laivaBtn.addEventListener('click', () => this.avaaMatkavalikko('sea'));
      } else {
        this.estaNappi(laivaBtn, this.laivaEste());
      }

      const lentoBtn = this.iconButton('kone', 'Lentäen');
      if (lentoa) {
        lentoBtn.addEventListener('click', () => this.avaaMatkavalikko('air'));
      } else {
        this.estaNappi(lentoBtn, this.lentoEste());
      }

      this.piirraToimintorivi([landBtn, laivaBtn, lentoBtn], this.tutkiNappi());
      return;
    }

    // Vaihe B.
    const meri = this.travelSuodatin !== 'air';
    const ilma = this.travelSuodatin !== 'sea';
    /*
     * Listan yläpuolella oli ennen kysymysrivi ("Minne lennetään?").
     * Se on poistettu muun kartanpäällisen tekstin mukana: napit
     * kertovat itse, mihin ne vievät.
     */

    if (meri && modes.includes('sea')) {
      const seaBtn = this.ikoniTekstiNappi('purje', `Laivalla (${SEA_FARE} p)`, 'wide');
      seaBtn.addEventListener('click', () => {
        this.suljeMatkavalikko();
        sfx.play('ferry');
        this.doAction(() => game.actionTravel('sea'));
      });
      this.actionsEl.appendChild(seaBtn);
    }

    for (const dest of ilma ? flights : []) {
      const city = game.board.cityById.get(dest);
      const flyBtn = this.ikoniTekstiNappi('kone', `${city.name} (${FLIGHT_PRICE} p)`, 'wide');
      flyBtn.addEventListener('click', () => this.doFly(dest));
      this.actionsEl.appendChild(flyBtn);
    }

    /*
     * Mannerlento: aarre löytyi, matka voi jatkua. Napit ovat samaa
     * leveää muotoa kuin poistuneet porttinapit, koska kohde on kaukana
     * ruudun ulkopuolella eikä löydy kartalta osoittamalla. Nappi
     * nimeää mantereen ("Lennä Oseaniaan: Sydney"), koska tavalliset
     * lentonapit ovat pelkkiä kaupunkeja — ero on pidettävä näkyvänä.
     */
    for (const kohde of ilma ? mannerLennot : []) {
      const btn = this.ikoniTekstiNappi('kone',
        `${MANNERLENTO_NAPPI(kohde)} (${FLIGHT_PRICE} p)`, 'wide');
      btn.addEventListener('click', () => {
        this.suljeMatkavalikko();
        sfx.play('flight');
        this.doAction(() => game.actionMannerLento(kohde.city));
      });
      this.actionsEl.appendChild(btn);
    }

    // Vaelluksessa porttikaupungeista jatketaan toisille laudoille.
    for (const link of ilma ? gateways : []) {
      const gwBtn = this.ikoniTekstiNappi('kompassi', link.label, 'wide');
      gwBtn.addEventListener('click', async () => {
        this.suljeMatkavalikko();
        sfx.play('flight');
        // Lentokalvo kuuluu vain maailmankartalle — mantereella lento
        // tapahtuu suoraan karttanäkymässä. Siirto tehdään ennen kalvoa,
        // jotta perillä odottava päiväkirjamerkintä alkaa puheineen jo
        // lennon aikana.
        const lahto = game.cityOf()?.name ?? '';
        const kalvo = game.pack.id === 'maailma';
        const line = kalvo ? game.flightLine(link.city, packById(link.pack)) : null;
        // Lippu ennen siirtoa: kohteen äänimaisema ja päiväkirja odottavat
        // kalvon alla, kunnes pelaaja astuu ulos.
        if (kalvo && !this.reducedMotion) document.body.classList.add('flight-active');
        this.doAction(() => game.actionGateway(link.index));
        if (kalvo) await this.animateFlight(lahto, link.label, line);
      });
      this.actionsEl.appendChild(gwBtn);
    }

    // Tietoportti: maan lauta aukeaa pääkaupungista vaikealla kysymyksellä.
    for (const gate of ilma ? countryGates : []) {
      const gateBtn = this.ikoniTekstiNappi('tahti', `${gate.label} — vaikea kysymys`, 'wide');
      gateBtn.addEventListener('click', () => {
        this.suljeMatkavalikko();
        sfx.play('paper');
        this.doAction(() => game.actionGateQuiz(gate.index));
      });
      this.actionsEl.appendChild(gateBtn);
    }

    const backBtn = this.iconButton('nuoli', 'Takaisin');
    backBtn.addEventListener('click', () => {
      this.suljeMatkavalikko();
      this.render();
    });
    this.actionsEl.appendChild(backBtn);
  }

  /** Avaa vaiheen B yhdellä listalla: 'sea' laivat, 'air' lennot ja portit. */
  avaaMatkavalikko(suodatin = null) {
    this.travelExpanded = true;
    this.travelSuodatin = suodatin;
    this.render();
  }

  /** Sulkee vaiheen B ja unohtaa suodattimen. */
  suljeMatkavalikko() {
    this.travelExpanded = false;
    this.travelSuodatin = null;
  }

  /**
   * Estetty nappi kertoo syyn.
   *
   * Sama tapa kuin muualla pelissä (esim. vertailunappi): teksti menee
   * titleen ja aria-labeliin, joten se näkyy hiirellä ja kuuluu
   * ruudunlukijalle. Napin oma nimi jää alkuun, jotta ikonin merkitys ei
   * katoa syyn alle.
   */
  estaNappi(nappi, syy) {
    nappi.disabled = true;
    if (!syy) return nappi;
    const nimi = nappi.getAttribute('aria-label') ?? '';
    const teksti = nimi ? `${nimi} — ${syy}` : syy;
    nappi.title = teksti;
    nappi.setAttribute('aria-label', teksti);
    return nappi;
  }

  /**
   * Miksi jalan, laivalla tai lentäen ei juuri nyt onnistu?
   *
   * Syyt luetaan laudalta ja kukkarosta samoilla ehdoilla kuin
   * game.travelModes käyttää — tässä ei päätetä mistään, vain
   * sanoitetaan se mitä säännöt jo sanoivat.
   */
  keskenReittia() {
    // Kesken reittiä matka jatkuu samalla tavalla kuin se alkoi.
    return this.game.player.pos.type === 'edge';
  }

  maaEste() {
    if (this.keskenReittia()) return 'matka jatkuu samaa reittiä';
    return 'täältä ei lähde maareittiä';
  }

  laivaEste() {
    const { game } = this;
    if (this.keskenReittia()) return 'matka jatkuu samaa reittiä';
    const city = game.cityOf();
    if (!city) return 'laiva lähtee vain satamasta';
    const satama = game.board.adj.get(city.id)
      ?.some((id) => game.board.edgeById.get(id)?.type === 'sea');
    if (!satama) return 'täältä ei lähde laivareittiä';
    return `laivalippu maksaa ${SEA_FARE} puntaa`;
  }

  lentoEste() {
    const { game } = this;
    if (this.keskenReittia()) return 'matka jatkuu samaa reittiä';
    const city = game.cityOf();
    if (!city) return 'lento lähtee vain kaupungista';
    const kentta = Boolean(city.airport) || Boolean(city.links?.length);
    if (!kentta) return 'täällä ei ole lentokenttää';
    if (game.player.money < FLIGHT_PRICE) return `lentolippu maksaa ${FLIGHT_PRICE} puntaa`;
    return 'täältä ei lähde lentoja';
  }

  /**
   * Tutki-nappi (suurennuslasi) alanappirivin oikeaan paikkaan.
   *
   * Tutki on kaupungissa AINA tarjolla, tehtävistä riippumatta: kortti
   * ja lehti ovat luettavaa sisältöä. Aiemmin nappi katosi heti kun
   * tehtävät oli käytetty, ja lehtisivulle ei päässyt enää lainkaan
   * (omistajan löytö 10.8.2026: "kahden väärän vastauksen jälkeen ei
   * pääse enää ollenkaan edes lehtisivulle"). Korostus kertoo,
   * odottaako tehtävä. Palauttaa null, jos pelaaja ei ole kaupungissa.
   */
  tutkiNappi() {
    const { game } = this;
    const city = game.cityOf();
    if (!city) return null;
    /*
     * FOKUSNÄKYMÄSSÄ NAPPIA EI OLE (omistajan pelitestitilaus
     * 24.8.2026): alariville jää vain Liiku, ja tutkiminen alkaa
     * kaupungin laatan napautuksesta (paivitaFokusLaatta). Sama ehto
     * molemmissa päissä, ks. fokusLaattaTutkii.
     */
    if (this.fokusLaattaTutkii()) return null;
    const stayBtn = this.iconButton('suurennuslasi', 'Tutki',
      game.travelModes().includes('stay') ? 'primary' : '');
    // Uudessa kaupungissa nappi sykkii, kunnes sitä on painettu kerran.
    if (this.lehtitila.tutkiSyke && this.lehtitila.tutkiSyke === this.kaupunkiAvain(city)) {
      stayBtn.classList.add('tutki-syke');
    }
    stayBtn.addEventListener('click', () => {
      stayBtn.classList.remove('tutki-syke');
      this.avaaTutkinta(city);
    });
    return stayBtn;
  }

  /**
   * TUTKI-TOIMINTO YHTENÄ KAPPALEENA.
   *
   * Sama teko kahdesta paikasta: alarivin Tutki-nappi (fokusmoodin
   * ollessa pois) ja fokusnäkymän kaupunkilaatan napautus. openArrival
   * ratkaisee lopun — fokusvirran avaus tai paluu nykyvaiheeseen, ja
   * virran ohitettua saapumiskortti, josta laatan kääntö alkaa
   * (fokusvirtaOhittaaLehden).
   */
  avaaTutkinta(city = this.game.cityOf()) {
    if (!city) return;
    sfx.play('paper');
    this.lehtitila.tutkiSyke = null;
    // Tutki avaa ensin saapumiskortin (esittely, kuva ja Lue lisää) —
    // peliin siirrytään vasta kortin omasta Tutki paikka -napista.
    this.openArrival(city);
  }

  /**
   * SAAKO LIIKU-NAPPI NÄKYÄ JUURI NYT?
   *
   * Omistajan tarkennus 25.8.2026: *"Liiku-nappi EI näy pelin alussa
   * lainkaan. Se ilmestyy vasta kun maan aarre on löydetty."*
   *
   * MIKSI. Fokusmoodissa kaupunki on tehtävä eikä pysäkki: matkakirja,
   * pöllön huomio, täky, tietovisa ja lopulta paikallisen esittämä
   * aarrekysymys (Raamattu, ANNOSTELU ja ETENEMINEN). Liiku-nappi
   * alarivissä on koko sen ajan ovi ulos, ja aloittava pelaaja lukee
   * ainoan näkyvän napin ohjeeksi. Kun nappi ilmestyy vasta aarteen
   * ratkettua, se on palkinto ja lupa jatkaa — juuri se, mitä
   * ETENEMINEN kuvaa: *"Aarteen jälkeen vapaa tutkinta … tai pelaaja
   * jatkaa matkaa."*
   *
   * MITTA ON LAATTA, SAMA KUIN LEHTILUKOLLA (js/fokusvirta.js
   * fokusvirtaLukitseeLehden): niin kauan kuin kaupungin laatta on
   * kääntämättä (game.tokens sisältää sen), aarretta ei ole löydetty.
   * Kääntyneen laatan alta löytyi mitä tahansa — myös väärä vastaus
   * päättää vaiheen aikanaan — ja lukko aukeaa lopullisesti.
   *
   * UMPIKUJAA EI SYNNY. Nappi on aina näkyvissä silloin kun laattaa ei
   * ole (kaupunki ilman laattaa, reitin varsi ilman kaupunkia,
   * fokusmoodi pois, katselutila).
   *
   * KEHITTÄJÄTILA EI OLE ENÄÄ POIKKEUS (omistajan pelitesti 25.8.2026:
   * *"Liiku teksti ei pitäisi vielä näkyä"*). Poikkeus oli tarkoitettu
   * kaupungista toiseen hyppimiseen, mutta omistaja pelaa
   * kehittäjätilassa päällä — fokus- ja sumennuskytkimet ovat siinä —
   * ja poikkeus näytti napin heti pelin alusta juuri sille, jonka
   * pelikokemusta sääntö suojelee. Sääntö on nyt sama kaikissa
   * tiloissa: nappi ilmestyy, kun laatta on käännetty. Katselutila
   * (yllä) riittää yhä kartan vapaaseen tarkasteluun.
   *
   * VÄÄRÄ VASTAUS EI LUKITSE KAUPUNKIIN. Laatta jää silloin paikalleen
   * ja kysymyksen voi yrittää uudelleen (sama sääntö kuin lehtilukolla,
   * js/fokusvirta.js): laatan napautus avaa tehtävän niin monta kertaa
   * kuin tarvitaan. Nappi palaa heti kun laatta kääntyy — löytyi sen
   * alta mitä tahansa.
   *
   * ILMESTYMINEN ILMAN SIVUN PÄIVITYSTÄ hoituu itsestään: laatan
   * kääntävä vastaus kulkee doActionin kautta, ja se piirtää rivin
   * uudelleen (renderActions) samassa kehyksessä.
   */
  liikuNappiNakyy() {
    if (!this.fokusmoodi || this.katselu) return true;
    const city = this.game.cityOf?.();
    if (!city) return true;
    return !this.game.tokens?.has(city.id);
  }

  /**
   * ALANAPPIRIVI: KAKSI PAIKKAA (omistajan linjaus 24.8.2026).
   *
   *   vasen   Liiku  — monitoiminappi, avaa matkustusnapit
   *   oikea   Tutki  — suurennuslasi, ennallaan
   *
   * LIIKU ODOTTAA AARRETTA (omistajan tarkennus 25.8.2026): fokusmoodissa
   * nappia ei ole olemassa ennen kuin kaupungin laatta on käännetty
   * (ks. liikuNappiNakyy). Rivi voi siis olla hetken tyhjä — se on
   * tarkoitus, ei virhe: silloin ainoa tarjolla oleva teko on kartalla.
   *
   * FOKUSNÄKYMÄSSÄ VAIN LIIKU (omistajan pelitestitilaus 24.8.2026
   * illalla). Tutki-napin toiminto siirtyi kaupungin laatan
   * napautukseen (fokusLaattaTutkii, paivitaFokusLaatta), joten rivissä
   * on yksi keskitetty nappi. Fokusmoodin ollessa pois rivi on
   * täsmälleen entisensä.
   *
   * MIKSI KAKSI EIKÄ KOLME. Rivissä oli 12.8.2026 alkaen kolme paikkaa
   * ja keskimmäisenä Viisas Pöllö. Raamatun osio "Fokusmoodi"
   * (omistaja 24.8.2026) siirsi pöllön pysyvästi kelluvaksi
   * sivuelementiksi kaikissa tiloissa, ja alariville jäi *"vain Liiku-
   * ja Tutki-napit"*. Vanha kolmen napin linjaus on siis kumottu, ei
   * unohtunut: pöllön paikan mekanismi on tallella js/pollo.js:n
   * POLLO_ALANAPPIRIVISSA-lipun takana.
   *
   * VASEN NAPPI ON "LIIKU". Kompassikuvake säilyy, mutta nimi on nyt
   * pelaajan teko eikä valikon otsikko: kahden napin rivi lukee
   * "Liiku · Tutki", ja se on koko pelin perusvalinta yhdellä
   * silmäyksellä. Nimi näkyy napin tekstinä, titlenä ja aria-labelina.
   *
   * Matkustusnapit eivät levitä riviä: ne LIUKUVAT koko rivin päälle,
   * joten rivi on aina täsmälleen kolmen napin levyinen. Liu'un ollessa
   * auki myös monitoiminappi väistyy (css: .toimintorivi.liuku-auki):
   * omistaja laski iPhonella neljä nappia, kun kompassi jäi kolmen
   * matkanapin viereen. Liuku sulkeutuu matkanapin valinnasta tai mistä
   * tahansa napautuksesta rivin ulkopuolella (kartta) — piiloon
   * jäänyttä monitoiminappia ei voi enää napauttaa uudelleen.
   *
   * Liu'ussa on matkustustapaa valittaessa kolme nappia — jalan, laiva
   * ja lento (renderTravelChoice) — ja nopanheiton hetkellä kaksi:
   * noppa ja paluu matkustustavan valintaan. Napit ovat pelkkiä
   * ikoneita kuten rivin perusnapitkin; nimi luetaan titlestä ja
   * aria-labelista.
   *
   * Napit itse ovat samoja kuin ennen — tapahtumakäsittelijät,
   * korostukset ja estotilat tulevat kutsujalta, joten mikään
   * pelitoiminto ei muutu tämän myötä.
   */
  piirraToimintorivi(matkanapit = [], tutkiNappi = null) {
    const rivi = html('div', 'toimintorivi');
    const perus = html('div', 'toimintorivi-perus');

    /*
     * "MATKUSTA" (omistajan pelitestipalaute v1119; ennen "Liiku",
     * ja sitä ennen "Matkustustavat"). Kompassikuvake säilyy, mutta
     * nimi kertoo teon täsmällisemmin: napin takaa avautuvat jalan,
     * laivalla ja lentäen -valinnat, eikä "Liiku" kertonut niistä.
     * iconButton asettaa saman tekstin näkyväksi nimeksi, titleksi ja
     * aria-labeliksi, joten ruudunlukija ja hiiren kärki saavat sen
     * yhtä aikaa. Matkustustapojen valinta on liu'un omien nappien
     * aria-label-teksteissä (jalan, laiva, lento).
     */
    const monitoimi = this.iconButton('kompassi', 'Matkusta');
    monitoimi.classList.add('monitoimi-nappi');
    /*
     * Ilman matkustusvaihtoehtoja nappi on estetty — sama harmaus kuin
     * muillakin estetyillä napeilla, ei katoamista. Rivi tarjoaa nykyään
     * aina kolme nappia (jalan, laiva, lento), joten pelkkä lukumäärä ei
     * riitä: liuku on tyhjä myös silloin, kun kaikki kolme ovat estettyjä.
     */
    monitoimi.disabled = matkanapit.length === 0 || matkanapit.every((n) => n.disabled);
    monitoimi.setAttribute('aria-expanded', String(Boolean(this.liukuAuki)));
    monitoimi.addEventListener('click', (e) => {
      e.stopPropagation();
      this.vaihdaLiuku();
    });
    /*
     * NAPPI JÄTETÄÄN POIS, EI PIILOTETA (omistajan tarkennus 25.8.2026,
     * ks. liikuNappiNakyy). Piilotettu nappi jättäisi ruudukkoon
     * paikkansa ja kartuutsin viereen tyhjän laatikon; poissa oleva
     * nappi vie mukanaan myös liu'un, jota ei ilman sitä voi avata.
     */
    const liikuNakyy = this.liikuNappiNakyy();
    if (liikuNakyy) perus.appendChild(monitoimi);
    else this.liukuAuki = false;

    /*
     * PÖLLÖLLÄ EI OLE ENÄÄ PAIKKAA RIVISSÄ (omistajan linjaus
     * 24.8.2026): nappi kelluu sivuelementtinä kaikissa tiloissa, myös
     * pelinäkymässä ja myös fokusmoodin ollessa kytkettynä pois.
     * Ankkurointi ilmoitetaan silti joka piirrolla (polloAnkkuri
     * alempana) — js/pollo.js ohittaa sen lipullaan ja kiinnittää napin
     * bodyyn, joten rivipaikan palauttaminen ei vaadi muutosta tänne.
     */
    /*
     * FOKUSNÄKYMÄSSÄ RIVI ON YHDEN NAPIN LEVYINEN (omistajan
     * pelitestitilaus 24.8.2026). Tutki muutti kaupungin laattaan, eikä
     * sen tilalle jätetä tyhjää paikkaa: kahden paikan ruudukossa Liiku
     * jäisi puoliksi riviä roikkumaan vasempaan reunaan. Muualla tyhjä
     * paikka säilyy — siellä Tutki vain puuttuu hetkellisesti (matkalla
     * kaupunkien välissä), ja rivin on pysyttävä samanlevyisenä.
     */
    const yksin = !tutkiNappi && this.fokusLaattaTutkii();
    if (yksin) rivi.classList.add('rivi-yksi');
    else perus.appendChild(tutkiNappi ?? html('div', 'rivi-tyhja'));
    rivi.appendChild(perus);

    const liuku = html('div', 'toimintorivi-liuku');
    liuku.setAttribute('role', 'group');
    liuku.setAttribute('aria-label', 'Matkustustavat');
    for (const nappi of matkanapit) liuku.appendChild(nappi);
    // Mikä tahansa liu'un nappi vie toimintoon, jonka jälkeen rivi
    // piirretään uudestaan — liuku ei saa jäädä auki sen alle.
    liuku.addEventListener('click', () => {
      this.liukuAuki = false;
      /*
       * MATKUSTUSTAPA VALITTU: kamera JÄÄ uloszoomattuun näkymään
       * (v1119). Seuraava vaihe on kohteen valinta kartalta, ja
       * kohteet ovat juuri ne naapurit, joiden takia näkymä avattiin —
       * paluu lähikuvaan piilottaisi ne saman tien.
       */
      this.matkustusPaluu = null;
    });
    rivi.appendChild(liuku);

    if (this.liukuAuki && !monitoimi.disabled) rivi.classList.add('liuku-auki');
    else this.liukuAuki = false;

    this.actionsEl.appendChild(rivi);
    this.toimintoRivi = rivi;
    // Rivissä ei ole pöllön paikkaa (ks. yllä): ilmoitetaan tyhjä
    // ankkuri, jolloin vanhan piirron paikka ei jää roikkumaan.
    polloAnkkuri(null);
    this.kytkeLiukuSulku();
  }

  /**
   * PÖLLÖ VINKKAA, JOS VALINTA JÄÄ TEKEMÄTTÄ (omistajan toive
   * 13.8.2026: *"Pöllö voi tarpeen mukaan vinkata, jos pelaaja ei osaa
   * painaa mitään nappia."*).
   *
   * Siirtovaiheessa peli odottaa napautusta kartalta eikä kartan päällä
   * ole enää ohjetekstiä. Jos kartalla ei tapahdu mitään
   * VALINTAVIHJEEN_VIIVE:n verran, pöllönapin viereen ilmestyy kiinteä
   * vihjekupla — ei tekoälykutsua, ei ääntä, ei keskustelun avausta.
   *
   * Kerran vuorossa: kartan kosketus tai valinta vie kuplan pois, eikä
   * ajastinta viritetä uudelleen ennen kuin vaihe on käynyt muualla
   * (valintavihjeVaihe pysyy tosi koko siirtovaiheen ajan).
   */
  paivitaValintavihje() {
    const { game } = this;
    const odottaaValintaa = game.phase === 'move' && !game.player?.isBot
      && !this.katselu && !this.busy && !this.radioPaalla()
      // Pöllö on aarre (18.8.2026): ennen ensimmäistä laattaa se ei ole
      // pelissä eikä siis vinkkaa mitään — ajastintakaan ei viritetä.
      && game.polloLoydetty !== false;
    if (!odottaaValintaa) {
      if (this.valintavihjeVaihe) this.peruValintavihje();
      this.valintavihjeVaihe = false;
      return;
    }
    if (this.valintavihjeVaihe) return; // sama vuoro: ajastin on jo käynyt
    this.valintavihjeVaihe = true;
    this.valintavihjeAjastin = setTimeout(() => {
      this.valintavihjeAjastin = null;
      if (this.dead || this.game.phase !== 'move' || this.game.player?.isBot) return;
      polloVihje(VALINTAVIHJEEN_TEKSTI);
    }, this.valintavihjeViive);
  }

  /** Vihjekupla ja sen ajastin pois. */
  peruValintavihje() {
    clearTimeout(this.valintavihjeAjastin);
    this.valintavihjeAjastin = null;
    polloVihjePois();
  }

  /**
   * Kartalla tapahtui jotain: vihje ei ole enää tarpeen eikä se palaa
   * samassa vuorossa. Kutsutaan kartan osoitin- ja kosketuseleistä
   * (asennaPanorointi).
   */
  kartallaKosketettu() {
    if (!this.valintavihjeVaihe) return;
    this.peruValintavihje();
  }

  /** Monitoiminapin napautus: liuku auki tai kiinni. */
  vaihdaLiuku() {
    this.liukuAuki = !this.liukuAuki;
    // Liuku peittää pöllön napin, joten avautuessaan se sulkee chatin.
    if (this.liukuAuki) polloSulje();
    if (this.liukuAuki) this.avaaMatkustusNakyma();
    else this.palaaMatkustusNakymasta();
    this.paivitaLiuku();
    // Reitit näkyviin (tai pois) heti: liu'un avaus ei kulje renderin
    // kautta, ja juuri silloin pelaaja katsoo, mihin reitit vievät.
    this.paivitaMatkareitit();
  }

  suljeLiuku() {
    if (!this.liukuAuki) return;
    this.liukuAuki = false;
    this.palaaMatkustusNakymasta();
    this.paivitaLiuku();
    this.paivitaMatkareitit();
  }

  /**
   * MATKUSTA AVAA NÄKYMÄN NAAPUREIHIN (omistajan pelitestipalaute
   * v1119: *"kun pelaaja painaa MATKUSTA-nappia, kartan pitää ZOOMATA
   * ULOSPÄIN pehmeällä kamera-ajolla niin, että näkyvissä ovat nykyinen
   * kaupunki, KAIKKI naapurikaupungit joihin reitti kulkee, ja reitit
   * niihin kokonaisuudessaan (reittipisteineen/noppineen) sopivalla
   * marginaalilla"*).
   *
   * Lähikuvassa naapurikaupunki jäi ruudun ylälaidan taakse, eikä
   * reitistä näkynyt kuin ensimmäinen askel — pelaaja valitsi
   * matkustustavan näkemättä, mihin se veisi.
   *
   * RAJAUS ON REITTIEN OMA, EI ARVATTU SÄDE: laatikko lasketaan
   * nykyisen kaupungin naapurireittien MURTOVIIVOISTA (board.edgeById
   * poly), joten mukaan tulevat myös reittien väliaskelpisteet — ne,
   * joilla noppa kulkee. Sama kamera-ajokoneisto kuin muissakin ajoissa
   * (js/kartta.js ajaKamera), joten liike on pehmeä ja ele keskeyttää
   * sen kuten aina.
   */
  matkustusRajaus() {
    const kaupunki = this.game?.cityOf?.();
    const board = this.game?.board;
    if (!kaupunki || !board?.adj) return null;
    let x0 = kaupunki.x; let y0 = kaupunki.y;
    let x1 = kaupunki.x; let y1 = kaupunki.y;
    const mukaan = (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    };
    for (const eid of board.adj.get(kaupunki.id) ?? []) {
      const reitti = board.edgeById.get(eid);
      if (!reitti) continue;
      // Murtoviiva kattaa molemmat päät ja väliaskeleet; ilman sitä
      // (vanha lauta ilman polyä) riittävät reitin päätekaupungit.
      for (const p of reitti.poly ?? []) mukaan(p?.x ?? p?.[0], p?.y ?? p?.[1]);
      for (const id of [reitti.a, reitti.b]) {
        const c = board.cityById.get(id);
        if (c) mukaan(c.x, c.y);
      }
    }
    if (!(x1 > x0) || !(y1 > y0)) return null;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /** Kamera naapureiden rajaukseen; paluupaikka talteen. */
  avaaMatkustusNakyma() {
    if (!this.kartta?.ajaKamera || this.katselu) return;
    const bbox = this.matkustusRajaus();
    if (!bbox) return;
    /*
     * PALUUPAIKKA ON NÄKYVÄ ALUE, EI ZOOMIKERROIN. Kerroin lasketaan
     * yleiskuvan mittakaavasta, ja fokusnäkymässä se on eri asia kuin
     * lehden oma rajaus; näkyvä alue palautuu sellaisenaan
     * (ajaKamera bbox + marginaali 0).
     */
    const nakyva = this.nakyvaAlue?.();
    this.matkustusPaluu = nakyva?.w > 0
      ? {
        x: nakyva.x, y: nakyva.y, w: nakyva.w, h: nakyva.h,
      } : null;
    this.kartta.ajaKamera({ bbox, marginaali: MATKUSTUKSEN_MARGINAALI });
  }

  /**
   * Kamera takaisin siihen näkymään, josta matkustusvalintaan tultiin.
   *
   * Vain sulkemisesta (napautus ulkopuolelle tai sama nappi uudelleen).
   * Kun matkustustapa VALITAAN, paluuta ei tehdä: seuraavaksi valitaan
   * kohde kartalta, ja juuri tämä uloszoomattu näkymä on se, jossa
   * kohteet näkyvät (ks. renderActions liu'un kuuntelija).
   */
  palaaMatkustusNakymasta() {
    const paluu = this.matkustusPaluu;
    this.matkustusPaluu = null;
    if (!paluu || !this.kartta?.ajaKamera || this.dead) return;
    this.kartta.ajaKamera({ bbox: paluu, marginaali: 0 });
  }

  paivitaLiuku() {
    const rivi = this.toimintoRivi;
    if (!rivi || !rivi.isConnected) return;
    rivi.classList.toggle('liuku-auki', Boolean(this.liukuAuki));
    rivi.querySelector('.monitoimi-nappi')
      ?.setAttribute('aria-expanded', String(Boolean(this.liukuAuki)));
  }

  /**
   * Napautus rivin ulkopuolella (kartta) sulkee liu'un.
   *
   * Kuuntelija kytketään kerran ja puretaan destroyssa: ilman purkua
   * kuollut instanssi jäisi kuuntelemaan uuden pelin rinnalle.
   */
  kytkeLiukuSulku() {
    if (this.liukuKuuntelija) return;
    this.liukuKuuntelija = (e) => {
      if (this.dead || !this.liukuAuki) return;
      if (e.target?.closest?.('.toimintorivi')) return;
      this.suljeLiuku();
    };
    document.addEventListener('pointerdown', this.liukuKuuntelija);
  }

  /**
   * Toimintonappi ikonina. Teksti jää saavutettavuutta varten title- ja
   * aria-label-määreisiin sekä leveälle ruudulle näkyväksi selitteeksi, jotta
   * napit vievät kartalta mahdollisimman vähän tilaa.
   */
  iconButton(icon, label, extra = '') {
    const btn = html('button', `icon-btn${extra ? ` ${extra}` : ''}`);
    btn.type = 'button';
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.appendChild(viivaIkoni(icon) ?? html('span', 'icon-glyph', icon));
    btn.appendChild(html('span', 'icon-label', label));
    return btn;
  }

  /** Tekstinappi, jonka edessä on kartan kynällä piirretty viivaikoni. */
  ikoniTekstiNappi(ikoni, teksti, luokka = '') {
    const btn = html('button', `ikoni-teksti${luokka ? ` ${luokka}` : ''}`);
    btn.type = 'button';
    const kuva = viivaIkoni(ikoni);
    if (kuva) btn.appendChild(kuva);
    btn.appendChild(html('span', '', teksti));
    return btn;
  }

  /** Vaihtaa olemassa olevan napin sisällöksi viivaikonin ja tekstin. */
  ikonoi(btn, ikoni, teksti) {
    btn.classList.add('ikoni-teksti');
    btn.textContent = '';
    const kuva = viivaIkoni(ikoni);
    if (kuva) btn.appendChild(kuva);
    btn.appendChild(html('span', '', teksti));
  }

  /**
   * Tyhjä pergamenttiarkki koko näkymän päälle (ks.
   * ALOITUSVERHO_SISAAN_MS). Pelkkä pergamentti ja sen rakeisuus — ei
   * suodattimia, ei sisältöä: arkki, jolle seuraava kuva piirretään.
   *
   * Peittävyyden siirtymä on kompositorin työtä, joten se etenee
   * loppuun vaikka pääsäie jumittuisi heti perään laudan piirtoon.
   */
  naytaAloitusverho() {
    if (this.aloitusverho) return this.aloitusverho;
    const verho = html('div', 'aloitusverho');
    verho.setAttribute('aria-hidden', 'true');
    verho.style.setProperty('--verho-kesto', `${ALOITUSVERHO_SISAAN_MS}ms`);
    this.mapPane.appendChild(verho);
    // Pakotettu asettelu, jotta selain näkee alkuasennon (opacity 0)
    // omana tilanaan eikä hyppää suoraan lopputilaan.
    void verho.getBoundingClientRect();
    verho.classList.add('verho-nakyy');
    /*
     * Kelluva pöllönappi ei ole kartan kerroksissa vaan sen ulkopuolella,
     * joten arkin z-index ei yllä sen yli — se jäi mitatusti näkyviin
     * tyhjän arkin päälle. Nappi väistyy siis luokalla, ei kerroksella.
     */
    document.body.classList.add('aloitusverho-paalla');
    this.aloitusverho = verho;
    return verho;
  }

  /** Häivyttää arkin pois ja odottaa häivytyksen loppuun. */
  async piilotaAloitusverho() {
    const verho = this.aloitusverho;
    this.aloitusverho = null;
    /*
     * Lauta takaisin maalattavaksi AINA, myös kun arkkia ei enää ole
     * (poikkeuspolku): luokka on koko näkymän kytkin eikä saa jäädä
     * pystyyn — pystyyn jäädessään kartta olisi loppupelin ajan
     * näkymätön.
     */
    document.body.classList.remove('lauta-arkin-alla');
    if (!verho) return;
    document.body.classList.remove('aloitusverho-paalla');
    /*
     * Yksi kehys laudalle ENNEN häivytystä: lauta on ollut arkin alla
     * maalaamatta, ja ensimmäinen maalaus on sen kertaluontoinen hinta.
     * Ilman tätä hinta osuisi keskelle häivytystä ja arkin alta
     * paljastuisi hetkeksi tyhjä paneeli.
     */
    await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    if (this.dead) { verho.remove(); return; }
    verho.style.setProperty('--verho-kesto', `${ALOITUSVERHO_ULOS_MS}ms`);
    verho.classList.remove('verho-nakyy');
    await this.wait(ALOITUSVERHO_ULOS_MS);
    verho.remove();
  }

  /**
   * AVAUSLENNON ESILÄMMITYS ALKUKERTOMUKSEN AIKANA.
   *
   * Omistajan kysymys 25.8.2026: *"Lataako peli siinä taustalla jotain
   * todella paljon? Ja jos lataa, niin voisiko ne jo ladata heti pelin
   * alussa, kun vasta kuunnellaan alkukertomusta?"*
   *
   * Lataa. Mitattuna (Chromium, tools/mittaa-avaus, ks. raportti)
   * napautuksesta koneen lähtöön meni 24 sekuntia, ja siitä laudan
   * rakentaminen oli 4,5 s. Alkukertomus kestää kymmeniä sekunteja,
   * eikä pelaaja tee sinä aikana mitään — juuri se aika käytetään tässä.
   *
   * MITÄ ESILÄMMITETÄÄN JA MITÄ EI. Kaikkea ei voi: laudan piirto
   * kirjoittaa suoraan siihen samaan SVG:hen, jossa avausruudun oma
   * kartta on, eikä toista lautaa voi rakentaa sen rinnalle ilman että
   * koko piirtoketju (this.svg, boardRoot, kerrokset, tyylien luku
   * elävästä puusta) revitään auki. Sen sijaan tehdään kaikki se, mikä
   * EI koske näkyvään puuhun:
   *
   *   1. kohdelaudan pelitila (game.enterWorld) — laattapino ja
   *      verkko, mitattu 108 ms pöytäkoneella eli nelinkertaisesti
   *      puhelimella
   *   2. kartan piirron raskain puhdas laskenta (mapart.esilammitaTaide:
   *      rannikkoruudukko ja meripisteet)
   *   3. kohdemaan fokuspohja verkosta ja purettuna
   *      (fokuskartta.esilammitaFokuspohja) — megatavujen webp, joka
   *      muuten purettaisiin vasta laskeutumisen jälkeen
   *   4. äänipuolen herätys, jotta napautuksen naksahdus soi heti
   *
   * RNG-JÄRJESTYS SÄILYY. Avauslennon repliikki nostetaan tässä ja
   * pannaan talteen (esilammitys.line), ja doPickStart käyttää sen
   * eikä nosta uutta. Näin arvonnat osuvat samaan kohtaan kuin ennen:
   * ensin repliikki, sitten laudan laattapino (ks. doPickStart, jossa
   * sama järjestys oli jo kommentoitu).
   *
   * TYÖ PILKOTAAN joutohetkiin, jottei avausteksti töki: yksi vaihe
   * kerrallaan, requestIdleCallbackilla ja ajastinvarareitillä.
   */
  esilammitaAvaus() {
    if (this.esilammitys || this.dead || this.katselu) return;
    if (this.game.phase !== 'pickstart') return;
    // Kohde tiedetään ennalta vain jos valittavia on tasan yksi
    // (ETUSIVUN_KOHTEET). Useammalla esilämmitys jää tekemättä eikä
    // mikään muutu — se on etumatka, ei ehto.
    if (ETUSIVUN_KOHTEET.size !== 1) return;
    const [kohdeId] = [...ETUSIVUN_KOHTEET];
    const kohde = this.game.board.cityById.get(kohdeId);
    const portti = (kohde?.links ?? [])[0];
    if (!kohde || !portti) return;
    const lauta = packById(portti.pack);
    if (!lauta) return;
    this.esilammitys = { kohde: kohdeId, line: null };

    const vaiheet = [
      // Ääni ensin: se on halvin ja sen puute kuuluu heti napautuksessa.
      () => sfx.ensureContext(),
      // Repliikki ENNEN lautaa — sama arvontajärjestys kuin doPickStartissa.
      () => { this.esilammitys.line = this.game.firstFlightLine(kohdeId); },
      () => this.game.enterWorld(lauta),
      () => esilammitaTaide(lauta.map),
      () => esilammitaFokuspohja(
        lauta.map?.cityCountry?.[portti.city], lauta.id, lauta.map,
      ),
    ];

    const pyyda = window.requestIdleCallback
      ? (tehtava) => window.requestIdleCallback(tehtava, { timeout: 1200 })
      : (tehtava) => setTimeout(tehtava, 150);
    const askel = () => {
      // Matka ehti alkaa: loput vaiheet tapahtuvat joka tapauksessa
      // oikeassa järjestyksessä lennon omalla polulla.
      if (this.dead || this.game.phase !== 'pickstart') return;
      const vaihe = vaiheet.shift();
      if (!vaihe) return;
      try {
        vaihe();
      } catch {
        /* esilämmitys on etumatka eikä ehto: virhe ei saa näkyä pelaajalle */
      }
      if (vaiheet.length) pyyda(askel);
    };
    pyyda(askel);
  }

  /**
   * Lähtöpisteen valinta: napautus vie suoraan perille. Porttikaupungista
   * laskeudutaan mantereen omalle laudalle, muualta jäädään maailmankartalle.
   * Useamman portin kaupungeista (Kairo, Mumbai) otetaan ensimmäinen eli
   * kaupungin oma manner — välikysymystä ei enää esitetä.
   */
  async doPickStart(city) {
    const { game } = this;
    const portti = (city.links ?? []).length > 0;
    // Ei ääniefektiä lähtövalinnassa (omistajan päätös 10.8.2026):
    // moottoriääni feidautuu sisään vasta lentokalvolla.
    // Pelin avaus on se filmihetki: avausteksti häipyy ja lento piirtyy
    // kartalle (fokusmoodi) tai kalvona sen päälle (vanha tapa) ennen
    // kuin kohdemaan kartta aukeaa.
    const lontoo = game.board.cityById.get(ALOITUSLENNON_LAHTO);
    if (lontoo && lontoo.id !== city.id) {
      /*
       * NAKSAHDUS ENSIMMÄISENÄ RIVINÄ (omistajan pelitesti 25.8.2026
       * iPhonella: *"kun klikkaa Atenaa, niin ei kuulu mitään ääntä"*).
       *
       * Kuittausääni on napautuksen ainoa välitön vastaus, ja sen on
       * synnyttävä ennen kuin mikään muu ehtii viedä pääsäiettä:
       * äänisolmu syntyy vain pääsäikeessä, ja sen jälkeen soitto on
       * selaimen äänisäikeen asia. Ennen tämä oli vasta kertojan
       * vaientamisen, luokanvaihdon ja lentotavan päättelyn jälkeen.
       *
       * VOIMAKKAAMPANA KUIN TAVALLINEN NAKSU. Napautuksen hetkellä
       * soivat sekä avauskertoja että etusivun lentoasemahäly, ja
       * tehosteväylän oma taso on hillitty (Sound master 0,24):
       * naksahdus jäi mitatusti noin -23 dB puheen alle eikä puhelimen
       * kaiuttimessa erottunut. `voima` on sama säädin kuin
       * kirjoituskoneen lyönnillä (js/sound.js REAL_PLAYERS).
       */
      sfx.play('clack', { voima: 2.4 });
      /*
       * KABIININ ÄÄNI HETI NAPAUTUKSESTA — ÄÄNI JOHTAA, KUVA SEURAA
       * (omistajan tilaus 27.8.2026: *"aloita sen äänen toisto
       * mahdollisimman pian. Olisi kiva ensin kuulla kabiinin ääni
       * ennenkuin lentokone feidautuu kartan kanssa näytölle"*).
       *
       * Ennen matkustamon äänimaisema lähti vasta lennon omassa
       * kohdassa (aloituslentoSisalla), pergamenttiarkin jo väistyttyä
       * — eli täsmälleen samalla hetkellä kuin kartta ja kone tulivat
       * näkyviin. Nyt se lähtee tässä, ennen arkkia: napautuksesta
       * kuvan paljastumiseen kuluu arkin sisääntulo, kamera-ajo,
       * pohjatason odotus ja arkin ulostulo, joten kabiini ehtii
       * nousta kuuluviin ennen kuin ruudulla näkyy mitään lennosta.
       *
       * Automaattitoisto ei esty: tämä on samaa napautuksen ketjua kuin
       * naksahdus rivi ylempänä, eli ele on juuri tapahtunut. Lipun
       * (lennonAmbienssi) tehtävä on kantaa lennon ääni sen ajan yli,
       * jolloin body.flight-active ei ole vielä paikallaan — muuten
       * väliin osuva render palauttaisi etusivun lähtöaulan.
       */
      if (!this.reducedMotion) this.aloitaLennonAmbienssi();
      // Lukuääni väistyy, kun matka alkaa.
      stopIntroVoice(this);
      this.introEl.classList.add('intro-fade');
      /*
       * Kumpi avauslento (Raamattu, ALOITUSLENTO UUSIKSI): fokusmoodissa
       * kone lentää kartalla, muuten vanha kalvo. Ratkaisu tehdään ENNEN
       * siirtoa, koska lippu aloituslentoKesken on nostettava ennen
       * ensimmäistä piirtoa: se pidättelee kamera-ajoja ja annostelu-
       * virtaa, joita render muuten käynnistäisi kesken lennon.
       */
      const kartalento = this.aloituslentoKartalla();
      /*
       * NAKSAHDUS JA TYHJÄ PERGAMENTTIARKKI (omistajan tilaus
       * 25.8.2026, ks. naytaAloitusverho): näkymä feidataan arkiksi
       * ENNEN kuin lauta vaihtuu, ja arkista feidataan suoraan
       * valmiiseen lentonäkymään. Arkin on oltava täysin peittävä jo
       * ennen laudan piirtoa, joten siirtymä odotetaan loppuun —
       * peittävyyden siirtymä hoituu kompositorissa, joten se ehtii
       * maaliin vaikka pääsäie jumittuisi heti perään piirtoon.
       *
       * Arkki tulee vain karttalennolla: vanha kalvo tuo oman peittonsa,
       * eikä liikeherkkyydessä (reducedMotion) saa odotuttaa turhaan.
       */
      if (kartalento) {
        this.naytaAloitusverho();
        await this.wait(ALOITUSVERHO_SISAAN_MS);
        if (this.dead) return;
        /*
         * Arkki on nyt läpinäkymätön: lauta saa lakata maalautumasta
         * sen alla (css/styles.css body.lauta-arkin-alla). Vasta tässä
         * eikä arkin ilmestyessä — muuten lauta katoaisi puoliksi
         * läpinäkyvän arkin alta ja ruudulla välähtäisi tyhjää.
         */
        document.body.classList.add('lauta-arkin-alla');
      }
      /*
       * Repliikki ennen siirtoa, jotta rng-kutsut osuvat samaan kohtaan.
       * Esilämmitys on voinut nostaa sen jo alkukertomuksen aikana —
       * silloin arvonta on tehty siellä ja täsmälleen samassa kohdassa
       * (ks. esilammitaAvaus). Toiselle kaupungille (kehittäjätilan
       * hyppy) talletus ei kelpaa.
       */
      const esilammitetty = this.esilammitys?.kohde === city.id
        ? this.esilammitys.line : null;
      const line = esilammitetty ?? game.firstFlightLine(city.id);
      // Lippu ennen siirtoa, jotta saapumismerkintä ei ala lennon alla —
      // se odottaa Astu ulos -nappia. Lennot poistavat lipun perillä.
      if (!this.reducedMotion) document.body.classList.add('flight-active');
      // Luokka on nyt paikallaan ja kantaa lennon äänen loppuun asti:
      // silta napautuksesta tähän on kuljettu (ks. aloitaLennonAmbienssi).
      this.lennonAmbienssi = false;
      if (kartalento) this.aloituslentoKesken = true;
      this.doAction(() => game.actionPickStart(city.id, portti ? 0 : null));
      if (!this.reducedMotion) {
        // Avauslennon repliikki on lukittu ja luettu ääneen: puhe alkaa
        // pienellä viiveellä, kun moottori on jo ehtinyt nousta esiin.
        this.lentoPuheAjastin = setTimeout(() => {
          // Lentorepliikin lukee vain pitkä kertoja. Kertoja aloittaa
          // vasta kun moottori on ehtinyt nousta kuuluviin (omistajan
          // toive 10.8.2026, tarkennus samana iltana: 4,2 s kohdalla,
          // kun moottori on jo noussut rauhassa kuuluviin). 12.8.2026
          // hetki aikaistui LENNON_PUHE_MS:ään: ääni saa olla edellä ja
          // teksti perässä.
          if (!this.dead && kertojaTila() === 'pitka') {
            playDiaryVoice(this, 'assets/audio/puhe-lento-alku.mp3');
          }
        }, LENNON_PUHE_MS);
      }
      // Kartalento voi todeta lennon mahdottomaksi (puuttuva maatieto tai
      // rajaus); silloin vanha kalvo hoitaa avauksen kuten ennenkin.
      try {
        const lensi = kartalento && await this.aloituslento(city.id, line);
        if (!lensi) {
          this.aloituslentoKesken = false;
          // Kartalento ei lähtenyt (puuttuva maatieto tai rajaus):
          // lykätty bittikarttatyö on käynnistettävä tässäkin haarassa.
          this.jatkaLykattyPiirto();
          // Vanha kalvo tulee oman häivytyksensä kanssa: arkki pois
          // ensin, jottei kalvo aukea peitetylle ruudulle.
          await this.piilotaAloitusverho();
          await this.animateFlight(
            'Lontoo', city.name, line,
            { dx: city.x - lontoo.x, dy: city.y - lontoo.y },
          );
        }
      } finally {
        clearTimeout(this.lentoPuheAjastin);
        // Varmistus: arkki ei saa jäädä ruudulle, jos lento katkeaa
        // poikkeukseen. Tavallisella polulla se on jo poistettu
        // (aloituslentoSisalla) ja tämä palaa heti.
        await this.piilotaAloitusverho();
      }
      return;
    }
    this.doAction(() => game.actionPickStart(city.id, portti ? 0 : null));
  }


  /**
   * Kehittäjätilan hyppy kaupunkiin. Pelin alussa lähtöpaikka pitää
   * valita pelin omilla säännöillä (se avaa portin mantereelle), joten
   * ensimmäinen napautus menee tavallista tietä ja vasta seuraavat
   * hyppäävät.
   */
  doKehittajaSiirto(city) {
    const { game } = this;
    if (game.phase === 'pickstart') {
      this.doPickStart(city);
      return;
    }
    // Nappula siirtyy ilman animaatiota: oikotie saa näyttää oikotieltä.
    haivytaLuenta(this);
    this.suljeMatkavalikko();
    this.doAction(() => game.actionKehittajaSiirto(city.id));
  }

  /** Jalan: matkustustapa ja nopanheitto samalla painalluksella. */
  doWalk() {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    // Nopanheitto keskeyttää tarinan: luenta häipyy pehmeästi pois.
    haivytaLuenta(this);
    this.run(
      () => {
        const chosen = game.actionTravel('land');
        return chosen.ok ? game.actionRoll() : chosen;
      },
      { after: (result) => this.animateDie(result.die) },
    );
  }

  /**
   * Kaupunki, jonka tiedon paneeli näyttää. Reitin varrella valitaan se pää,
   * jota lähempänä pelaaja on.
   */
  factCity(pos) {
    const { board } = this.game;
    if (pos.type === 'city') return board.cityById.get(pos.city);
    const edge = board.edgeById.get(pos.edge);
    const nearer = pos.idx * 2 <= edge.steps ? edge.a : edge.b;
    return board.cityById.get(nearer);
  }

  /**
   * Maan minikartta saapumiskorttiin pelin omasta rajadatasta: maan
   * muoto, pelin kaupungit pisteinä ja nykyinen kaupunki korostettuna.
   * Sama kynä kuin laudalla — ja toimii ilman verkkoa, toisin kuin
   * Wikipediasta haettu kartta.
   */
  piirraMaakartta(iso, nykyinenId) {
    const map = this.game.pack.map;
    const maa = map?.countryShapes?.[iso];
    if (!maa?.renkaat?.length) return null;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const rengas of maa.renkaat) {
      for (const [x, y] of rengas) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
    const mitta = Math.max(maxX - minX, maxY - minY);
    // Nimilaput tarvitsevat reunoille hieman ilmaa muodon ympärille —
    // alareunaan vähemmän, jotta tunnusluvut istuvat lähelle karttaa
    // (omistajan toive).
    const vara = mitta * 0.14;
    const varaAla = mitta * 0.05;
    const svg = el('svg', {
      class: 'arrival-maa-kartta-svg',
      viewBox: `${minX - vara} ${minY - vara} ${maxX - minX + vara * 2} ${maxY - minY + vara + varaAla}`,
      'aria-hidden': 'true',
    });
    const d = maa.renkaat
      .map((r) => `M${r.map(([x, y]) => `${x},${y}`).join(' L')}Z`)
      .join(' ');
    el('path', { d, class: 'minimaa-pohja' }, svg);
    for (const [cityId, maanIso] of Object.entries(map.cityCountry ?? {})) {
      if (maanIso !== iso) continue;
      const kaupunki = this.game.board.cityById.get(cityId);
      if (!kaupunki) continue;
      const oma = cityId === nykyinenId;
      el('circle', {
        cx: kaupunki.x,
        cy: kaupunki.y,
        r: ((oma ? 0.024 : 0.016) * mitta).toFixed(2),
        class: oma ? 'minimaa-piste nykyinen' : 'minimaa-piste',
      }, svg);
      const nimi = el('text', {
        x: kaupunki.x,
        y: kaupunki.y - 0.04 * mitta,
        class: 'minimaa-nimi',
        'text-anchor': 'middle',
        'font-size': (0.07 * mitta).toFixed(1),
      }, svg);
      nimi.textContent = kaupunki.name;
    }
    return svg;
  }

  /**
   * Vanhan valokuvan pikkukuva muistikirjan kylkeen, jos kaupungille on
   * kuva kuvastossa. Null piilottaa kuvan ja sulkee auki jääneen kortin.
   *
   * @param {object} [suoraan] valmis kuvaolio ({ tiedosto, selite,
   *   lahde, … }) kuvaston ohi. Fokusvirta antaa merkintänsä oman
   *   vanhan valokuvan tätä kautta: kuva kuuluu virtaan eikä
   *   kaupunkien kuvastoon (js/fokusvirta.js fokusvirtaMatkakirja).
   */
  naytaFactValokuva(cityId, paikka, suoraan = null) {
    const valokuva = suoraan
      ?? (cityId ? (VALOKUVAT[this.game.pack.id] ?? {})[cityId] ?? null : null);
    // Kaupungin vaihtuessa edellisen kaupungin auki jäänyt kortti suljetaan
    // aina — muuten vanha pino voi jäädä uuden kaupungin kortin alle.
    if (cityId !== this.factValokuvaCityId) this.suljePostikortti();
    this.factValokuvaCityId = cityId;
    this.factValokuvaTiedot = valokuva ? { ...valokuva, paikka } : null;
    if (!valokuva) {
      this.factValokuva.hidden = true;
      this.suljePostikortti();
      return;
    }
    asetaKuva(this.factValokuvaKuva,
      valokuvaUrl(valokuva.tiedosto, 160), valokuvaVara(valokuva.tiedosto, 160));
    this.factValokuva.hidden = false;
  }

  /**
   * Valokuva aukeaa postikorttina hieman vinottain keskelle ruutua:
   * valkoiset reunukset, kuvateksti ja lähde. Kuvapinossa napautus kuvaan
   * vaihtaa kortit; kortti suljetaan napauttamalla sen ulkopuolelle.
   */
  naytaPostikortti() {
    this.suljePostikortti();
    const tiedot = this.factValokuvaTiedot;
    if (!tiedot) return;
    const kortti = html('div', 'postikortti');
    const teeKortti = (kuvaTiedot, luokka, altTeksti, oletusVanha = false) => {
      const osa = html('div', `postikortti-kortti${luokka ? ` ${luokka}` : ''}`);
      const kuva = document.createElement('img');
      asetaKuva(kuva,
        valokuvaUrl(kuvaTiedot.tiedosto, 1000), valokuvaVara(kuvaTiedot.tiedosto, 1000));
      // Harmaasävy vain aidosti vanhoille (ks. onVanhaKuva).
      if (onVanhaKuva(kuvaTiedot, oletusVanha)) kuva.classList.add('vanha-vedos');
      kuva.alt = altTeksti;
      osa.appendChild(kuva);
      /*
       * Parin lauseen selite kertoo mitä kuvassa näkyy, ja paikka,
       * vuosi ja lähde jatkavat sitä SAMALLA RIVILLÄ pienemmällä
       * (omistajan tilaus 23.8.2026; ennen ne olivat oma kappaleensa
       * selitteen alla). Lähde on osa kuvatekstiä eikä sen sisar,
       * jotta rivitys hoituu inline-virtana — ks. css/styles.css
       * "LÄHDERIVI KUVATEKSTIN JATKEEKSI".
       *
       * Kuvateksti tehdään aina: lähde on lisenssiehto ja näkyy myös
       * silloin, kun kuvalla ei ole selitettä.
       */
      const teksti = html('p', 'kuvateksti');
      if (kuvaTiedot.selite) teksti.appendChild(document.createTextNode(kuvaTiedot.selite));
      teksti.appendChild(html('span', 'kuvalahde',
        [tiedot.paikka, kuvaTiedot.vuosi, kuvaTiedot.lahde].filter(Boolean).join(' · ')));
      osa.appendChild(teksti);
      return osa;
    };
    /*
     * Pinossa voi olla enemmän kuin kaksi kuvaa.
     *
     * Omistajan toive 3.8.2026: "Matkakirjassa mainitut näkymät ja asiat
     * olisi kiva saada kuvin matkakirjan kuviin, joita voi siis olla
     * enemmän kuin kaksi." Päiväkirja mainitsee Suakinissa korallitalot,
     * sataman ja dhow-veneet — jokaisesta voi olla oma kuvansa.
     *
     * Järjestys: vanha valokuva ensin, sitten päiväkirjan mainitsemat
     * näkymät, viimeisenä nykypäivä. Näin pino kertoo saman tarinan kuin
     * teksti ja päättyy siihen, mitä paikasta on jäljellä.
     */
    const pino = [
      { ...tiedot, alt: `Vanha valokuva: ${tiedot.paikka}` },
      ...(tiedot.lisat ?? []).map((k) => ({
        ...k,
        alt: `${k.selite ? k.selite.slice(0, 60) : tiedot.paikka}`,
      })),
      ...(tiedot.uusi
        ? [{
          ...tiedot.uusi,
          vuosi: tiedot.uusi.vuosi ?? 'nykypäivä',
          alt: `Uusi valokuva: ${tiedot.paikka}`,
        }]
        : []),
    ];
    this.postikorttiPino = pino.length;
    this.postikorttiIndeksi = 0;
    pino.forEach((kuvaTiedot, i) => {
      const luokat = [
        kuvaTiedot === pino[pino.length - 1] && tiedot.uusi ? 'uusi' : '',
        i === 0 ? '' : 'alla',
      ].filter(Boolean).join(' ');
      // Pinon ensimmainen on kaupungin historiakuva. Jos siita puuttuu
      // vuosi, se on silti vanha — muissa oletus on varillinen.
      const osa = teeKortti(kuvaTiedot, luokat, kuvaTiedot.alt, i === 0);
      // Laskuri kertoo, että kuvia on lisää — muuten pinon alta
      // pilkottava reuna jää helposti huomaamatta.
      if (pino.length > 1) {
        osa.appendChild(html('p', 'postikortti-laskuri', `${i + 1}/${pino.length}`));
      }
      kortti.appendChild(osa);
    });
    // Kortti keskelle ruutua — sama paikka yhdelle kuvalle ja pinolle,
    // jotta avaus näyttää samalta joka laitteella. Pystykeskitys tehdään
    // CSS:llä eikä mittaamalla: kortin korkeus ei ole tiedossa ennen kuin
    // kuva on latautunut, ja mitattu keskitys valui alas (omistajan
    // havainto iPadilla).
    /*
     * Keskitys tehdään CSS:llä molempiin suuntiin.
     *
     * Vaakakeskitys laskettiin ennen JavaScriptissä oletuksella, että
     * kortti on korkeintaan 400 pikseliä leveä. Kun kortti kasvoi
     * isolla ruudulla 720 pikseliin, laskelma jäi vanhaksi ja kortti
     * valui oikealle yli ruudun reunan (omistajan havainto iPadilla:
     * "ei keskellä"). Sama virhe oli aiemmin pystysuunnassa, ja se
     * korjattiin silloin samalla tavalla — leveys ei ole tiedossa
     * ennen kuin tyylit on laskettu.
     */
    kortti.style.left = '50%';
    kortti.style.top = '50%';
    // Hienoinen nosto ylös: alta pilkottava kortti jatkuu alaspäin.
    kortti.style.transform = 'translate(-50%, -52%)';
    document.body.appendChild(kortti);
    this.postikortti = kortti;
    // Sieppausvaiheessa, jotta kartan omat käsittelijät eivät estä
    // sulkemista — napautus mihin tahansa sulkee kortin.
    setTimeout(() => {
      document.addEventListener('pointerdown', this.postikorttiSulkija, { capture: true });
    }, 0);
  }

  suljePostikortti() {
    document.removeEventListener('pointerdown', this.postikorttiSulkija, true);
    this.postikortti = null;
    // Poistetaan seuratun kortin lisäksi mahdolliset orvoiksi jääneet
    // kortit — kaksi päällekkäistä korttia eri kaupungeista näytti
    // rikkinäiseltä (omistajan havainto). Kulttuurisuurennos ei ole
    // bodyn alla, joten se ei osu tähän.
    for (const kortti of document.querySelectorAll('body > .postikortti')) kortti.remove();
  }

  /**
   * Tietoruutu pelaajan sijainnista. Siinä puhuu vuorotellen kaksi ääntä:
   * isoisän 1870-luvun päiväkirja ja nuoren herran nykyhavainto. Teksti
   * vaihtuu kierroksittain mutta pysyy samana saman vuoron ajan, jotta sen
   * ehtii lukea.
   */
  /**
   * Isoisän aikataulurivi matkakirjamerkinnän perään: pieni oma rivinsä,
   * joka ei peitä merkintää (omistajan havainto Gaossa — aikataulukortti
   * ajoi uuden saapumistekstin ohi koko käynnin ajaksi).
   */
  aikatauluRivi() {
    const aikataulu = this.game.scheduleNote;
    if (!aikataulu || aikataulu.packId !== this.game.pack.id) return null;
    const rivi = html('span', 'aikataulu-rivi');
    rivi.appendChild(html('b', '', `Isoisän aikataulusta, päivä ${aikataulu.day}: `));
    rivi.appendChild(document.createTextNode(aikataulu.text));
    return rivi;
  }

  /*
   * ── KAIUTIN ON LUENNAN KYTKIN (omistajan tilaus 25.8.2026) ─────────
   *
   * Erillinen LUENTA-liukukytkin puhekuplan alla poistui: *"yläreunassa
   * on jo kaiutin kuvake sitä varten"*. Sama laitekohtainen tila
   * (js/luenta.js) elää yhä — sitä käännetään nyt kortin kaiuttimesta,
   * ja pois kytkettynä kuvakkeen päällä on vinoviiva (css/styles.css
   * .fact-kuuntele.mykistetty).
   *
   * KYTKIN OHJAA ISOISÄÄ. Pöllön kuplat elävät omassa kerroksessaan
   * (js/fokusvirta.js) eikä niitä lueta koskaan, joten kytkimellä ei ole
   * niihin mitään sanottavaa.
   */
  paivitaKaiutinTila() {
    const nappi = this.factKuuntele;
    if (!nappi) return;
    const paalla = luentaKytkinPaalla();
    nappi.classList.toggle('mykistetty', !paalla);
    // role="switch" eikä pelkkä painike: ruudunlukija kertoo tilan
    // (aria-checked) eikä pelkkää nimeä.
    nappi.setAttribute('role', 'switch');
    nappi.setAttribute('aria-checked', paalla ? 'true' : 'false');
    const nimi = paalla ? 'Luenta päällä — mykistä' : 'Luenta pois — kytke päälle';
    nappi.dataset.lukijaNimi = nimi;
    if (lukijaLukee(nappi)) return;
    nappi.title = nimi;
    nappi.setAttribute('aria-label', nimi);
  }

  /**
   * Nykyisen merkinnän luenta yhteen paikkaan talteen.
   *
   * Jokainen matkakirjahaara antaa tästä oman aloitusfunktionsa (tai
   * nullin, jos luettavaa ei ole). Kaksi asiaa hoituu silloin yhdessä
   * paikassa: luenta EI ALA kytkimen ollessa pois päältä, ja kytkimen
   * kääntäminen päälle voi käynnistää juuri sen merkinnän, joka on
   * ruudulla — ilman että kytkin tuntisi yhtäkään haaraa.
   *
   * `aloita: false` vain rekisteröi (tai tyhjentää) tehtävän: sitä
   * käytetään haaroissa, jotka ovat itse jo päättäneet olla vaiti
   * (sama merkintä uudelleen ruudulle, kertojatila 'ei').
   */
  asetaMerkinnanLuenta(tehtava, { aloita = true } = {}) {
    this.merkinnanLuenta = tehtava ?? null;
    if (!aloita) return;
    if (!this.merkinnanLuenta || !luentaKytkinPaalla()) {
      stopDiaryVoice(this);
      return;
    }
    this.merkinnanLuenta();
  }

  /**
   * Matkakirjamerkinnän kaiutin: sama nappi, kaksi lukijaa.
   *
   * Generoitu äänite (assets/audio/puhe-*.mp3) soitetaan kuten ennen.
   * Merkinnälle, jolle äänitettä ei ole tehty, tarjotaan sama
   * kuunteluele laitteen omalla äänellä — nappi näkyy siis myös
   * silloin, kunhan laitteella on jompikumpi lukija. Ilman kumpaakaan
   * nappi piiloutuu entiseen tapaan, koska se tuottaisi hiljaisuuden.
   */
  naytaMerkinnanKaiutin(onAanite) {
    const nappi = this.factKuuntele;
    if (!nappi) return;
    nappi.hidden = !onAanite && !lukijaTuettu();
    // Nimi ja tila tulevat kytkimestä — kaiutin on sama vipu joka
    // merkinnällä, oli äänite tai laitteen lukija.
    this.paivitaKaiutinTila();
  }

  /**
   * Uusi päiväkirjamerkintä alkaa aina alusta ja avaa kortin.
   *
   * Teksti palautetaan alkuun, koska edellinen merkintä on voitu
   * jättää vieritettynä keskeltä — muuten uusi merkintä alkaisi
   * näkyä puolivälistä.
   *
   * Linssi tai kartan vieritys on voinut kutistaa kortin yhden rivin
   * lapuksi, ja jos se jäisi siihen, pelaaja ei näkisi juuri
   * kirjoitettua tekstiä lainkaan — hän ei edes tietäisi, että
   * sellainen tuli (omistajan linjaus). Seuraava kartan liike tai
   * napautus kutistaa kortin taas.
   */
  uusiFactKey(key) {
    this.factKey = key;
    // Uusi merkintä, uusi teksti: edellisen luenta ei saa jatkua,
    // eikä edellisen merkinnän jatko-osa saa soida uuden alla.
    this.merkintaJatko = null;
    if (lukijaLukee(this.factKuuntele)) pysaytaLukija();
    if (this.factText) this.factText.scrollTop = 0;
    this.asetaPaivakirjanKoko(false);
    this.paivitaJatkuuVihje?.();
  }

  /**
   * Päiväkirjan kaksi kokoa kartalla: koko merkintä ja yhden rivin
   * nimilappu. Välikoko poistui v317:ssä (omistajan päätös), joten
   * näiden väliin ei jää mitään.
   *
   * Lappu on kolmen tilanteen vastaus (omistajan toive 4.8.2026):
   * linssin päällä kartan pitää näkyä selitteen ja päiväkirjan välistä,
   * ja kun karttaa vieritetään sormella tai napautetaan, kortti on
   * tiellä juuri siinä nurkassa, jota katsotaan. Kutistuminen on aina
   * peruttavissa napautuksella, eikä se koskaan kestä uuden merkinnän
   * yli.
   *
   * Tila luetaan ja kirjoitetaan luokasta itsestään, ei erillisestä
   * kentästä: niin kortin ulkoasu ja saavutettavuusmääreet eivät voi
   * ajautua eri linjoille.
   */
  asetaPaivakirjanKoko(pieni) {
    if (!this.factCard) return;
    if (this.factCard.classList.contains('pieni') === pieni) return;
    this.factCard.classList.toggle('pieni', pieni);
    if (pieni) {
      // Teksti alkuun: jos merkintä oli vieritetty keskeltä, lapun
      // avaaminen näyttäisi muuten katkelman keskeltä virkettä.
      if (this.factText) this.factText.scrollTop = 0;
      this.factCard.setAttribute('role', 'button');
      this.factCard.setAttribute('tabindex', '0');
      this.factCard.setAttribute('aria-expanded', 'false');
      this.factCard.setAttribute('aria-label', 'Avaa matkapäiväkirjan merkintä');
    } else {
      // Auki kortti on tavallista sisältöä omine nappeineen, joten
      // painikkeen rooli ja tila otetaan pois — sisäkkäinen painike
      // painikkeen sisällä ei ole luettavissa oleva tila.
      this.factCard.removeAttribute('role');
      this.factCard.removeAttribute('tabindex');
      this.factCard.removeAttribute('aria-expanded');
      this.factCard.removeAttribute('aria-label');
    }
    this.paivitaJatkuuVihje?.();
  }

  /**
   * PAIKKARIVI KAHDESSA MITASSA (omistajan pelitestipalaute v1119:
   * *"kun laatikko pienenee yhdelle riville, rivillä saa näkyä VAIN
   * otsikko ja kaupungin nimi — ei päivämäärää, säätä eikä tekstin
   * alkua"*).
   *
   * Auki kortissa paikkarivi on merkinnän oma kohtausrivi: *"Ateena,
   * heinäkuussa 1873. Seesteistä; ilmanpuntari 762 mmHg."* Yhden rivin
   * lapussa se venyi katkeavaksi litaniaksi, josta ei erottunut mitään
   * — ja juuri se lappu on se, jonka pelaaja näkee karttaa liikuttaessa.
   *
   * Lyhyt muoto on oma elementtinsä eikä leikattu teksti: leikkaus
   * kolmella pisteellä olisi jättänyt riville puolikkaan päivämäärän.
   * Ilman erillistä lyhyttä muotoa käytetään pitkää — useimmissa
   * haaroissa se on jo pelkkä kaupungin nimi.
   */
  asetaPaikkarivi(teksti, lyhyt = null) {
    const rivi = String(teksti ?? '');
    if (this.factPlace) this.factPlace.textContent = rivi;
    if (this.factPlaceLyhyt) this.factPlaceLyhyt.textContent = String(lyhyt ?? rivi);
  }

  renderFact() {
    const { game } = this;
    /*
     * ALOITUSLENTO: KORTTI ODOTTAA PERILLE ASTI.
     *
     * Kortti itse on lennon ajan piilossa (body.flight-active .fact-card),
     * mutta ilman tätä sen TEKSTI kirjoittuisi silti loppuun piilossa — ja
     * fokusvirta siirtyy kirjoituksen päätteeksi seuraavaan vaiheeseen
     * (fokusvirtaMerkintaLuettu), jolloin Pöllön kupla ponnahtaa kartalla
     * lentävän koneen päälle. Mitattu Ateenan koeajossa 24.8.2026: kupla
     * oli ruudulla kuudennella sekunnilla, kun kone oli vasta Alpeilla.
     *
     * Lento päättää itsensä render-kutsulla, joka tuo kortin esiin
     * tavalliseen tapaan.
     */
    if (this.aloituslentoKesken) return;
    // Aloitusnäkymässä kartta saa puhua puolestaan: tietoruutu on piilossa.
    this.factCard.hidden = game.phase === 'pickstart';
    if (game.phase === 'pickstart') {
      // Piilotuksen lisäksi sisältö tyhjennetään: muuten edellisen pelin
      // teksti voi välähtää ruudulla ennen kuin kortti ehtii piiloon.
      this.uusiFactKey(null);
      this.factVoiceEl.textContent = '';
      this.asetaPaikkarivi('');
      this.factText.textContent = '';
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      stopDiaryVoice(this);
      // Ei merkintää, ei luettavaa: kytkin ei saa käynnistää edellisen
      // pelin merkintää.
      this.asetaMerkinnanLuenta(null, { aloita: false });
      return;
    }

    /*
     * Matkalla kortti ei päivity: sama merkintä pysyy näytöllä, kunnes
     * saavutaan uuteen kaupunkiin — uusi nopanheitto reitillä ei vaihda
     * tekstiä (omistajan päätös). Ennen tässä laskettiin myös isoisän
     * aarrevihje, joka nousi esiin nimenomaan kaupunkien välissä ja
     * siksi ohitti tämän varhaispoistuman; tähtivihjejärjestelmä
     * poistettiin 11.8.2026 (ks. js/game.js), joten ehto on jälleen
     * yksinkertainen.
     */
    if (game.player.pos.type === 'edge' && this.factKey) return;

    /*
     * FOKUSVIRTA KIRJOITTAA TÄHÄN KORTTIIN (omistajan tarkennus
     * 24.8.2026: *"ISOISÄN MERKINTÄ EI OLE UUSI KORTTI vaan se
     * näytetään PERINTEISESSÄ matkakirjakortissa YLÄVASEMMALLA"*).
     *
     * v1093 piilotti tämän kortin, kun fokusvirta omisti saapumisen —
     * silloin virralla oli oma matkakirjakorttinsa, ja kaksi
     * matkakirjaa yhtä aikaa oli juuri se vika, joka korjattiin.
     * Nyt virralla EI OLE omaa merkintäkorttia lainkaan: merkintä
     * tulee tähän, sille kortille, jolla saapumistekstit ovat aina
     * olleet. Piilotus siis vaihtui syötöksi.
     *
     * LUENTA SOI, KUN ÄÄNITE ON (omistajan tilaus 25.8.2026; korvaa
     * v1093:n "luenta pysyy vaiti" -välivaiheen). Fokusvirran
     * matkakirjalohkolla voi olla kenttä `aanite`; kun se on, merkintä
     * luetaan täsmälleen samalla koneistolla kuin saapumisluennat
     * (playDiaryVoice) — kertojatilan lyhyt/pitkä-sääntö, hengähdys
     * ennen aloitusta ja taustan väistö pätevät sellaisenaan.
     *
     * KYTKENTÄ ON YLEINEN EIKÄ ATEENAN OMA: kenttä luetaan datasta,
     * joten Sofia ja muut kaupungit soivat samalla koodilla heti kun
     * niiden äänitteet ilmestyvät. Ilman äänitettä merkintä on vaiti
     * kuten ennenkin — mitään ei striimata varapoluksi, koska luennat
     * generoidaan äänitteiksi yksi kaupunki kerrallaan.
     *
     * Äänite luetaan ensisijaisesti fokusvirran palauttamasta
     * merkinnästä ja toissijaisesti suoraan virran sisällöstä
     * (fokusvirtaSisalto) — näin kytkentä ei ole kiinni siitä, kumpaa
     * kenttää fokusvirtaMatkakirja sattuu välittämään eteenpäin.
     *
     * MERKINTÄ PYSYY MYÖS LAATAN RATKETTUA (korjaus 27.8.2026).
     * Aiemmin fokusvirtaMatkakirja palautti laatan käännyttyä nullin,
     * jolloin alempi varapolku kirjoitti korttiin vanhan
     * SAAPUMISTEKSTIT-merkinnän — omistaja näki Kreikassa uuden
     * merkinnän tilalla yhtäkkiä vanhan oliivitorin. Nyt virta omistaa
     * fokusvirtakaupungin matkakirjakortin koko käynnin ajan (ks.
     * js/fokusvirta.js fokusvirtaMatkakirja), ja koska korttiavain
     * pysyy samana, teksti ei myöskään kirjoitu uudelleen laatan
     * ratketessa. Varapolku alempana palvelee vain kaupunkeja, joilla
     * fokusvirtasisältöä EI ole.
     */
    if (game.player.pos.type === 'city') {
      const virtaKaupunki = game.board.cityById.get(game.player.pos.city);
      const merkinta = virtaKaupunki ? fokusvirtaMatkakirja(this, virtaKaupunki) : null;
      if (merkinta) {
        this.factCard.hidden = false;
        if (this.factKey === merkinta.avain) return;
        this.uusiFactKey(merkinta.avain);
        // Otsikko lyheni v1119:ssä (omistajan pelitestipalaute):
        // MATKAPÄIVÄKIRJASTA → MATKAPÄIVÄKIRJA. Yhden rivin lapussa
        // otsikko ja kaupungin nimi ovat vierekkäin, ja partitiivi
        // teki rivistä pitkän ilman että se kertoi enempää.
        this.factVoiceEl.textContent = 'Matkapäiväkirja';
        // Lyhyt muoto on kaupungin nimi: kohtausrivin päivämäärä ja
        // sää eivät mahdu yhden rivin lappuun (ks. asetaPaikkarivi).
        this.asetaPaikkarivi(merkinta.paikkarivi, virtaKaupunki.name);
        this.factImageTitle = null;
        this.factImage.hidden = true;
        stopDiaryVoice(this);
        // Vanha valokuva kortin kylkeen suoraan virran datasta: kuvaa
        // ei ole kaupunkien kuvastossa (VALOKUVAT), se on virran oma.
        this.naytaFactValokuva(virtaKaupunki.id, virtaKaupunki.name, merkinta.kuva);
        this.typeText(this.factText, merkinta.teksti, 'fact', () => {
          fokusvirtaMerkintaLuettu(this, virtaKaupunki);
        });
        const virranMerkinta = fokusvirtaSisalto(this, virtaKaupunki)?.matkakirja;
        /*
         * AARREMERKINTÄ EI PERI SAAPUMISMERKINNÄN ÄÄNITETTÄ (omistajan
         * pelitesti 25.8.2026: aarteen jälkeen lukija aloitti vanhan
         * matkakirjan uudelleen). Varapolku virran matkakirjan
         * äänitteeseen kuuluu vain virran omalle merkinnälle — muu
         * merkintä ilman omaa äänitettä jää lukematta.
         */
        const onAarremerkinta = merkinta.avain.startsWith('fokusaarre:');
        const virtaAanite = merkinta.aanite
          ?? (onAarremerkinta ? null : virranMerkinta?.aanite) ?? null;
        this.diaryFullUrl = virtaAanite;
        if (virtaAanite) {
          // Kaiutin näkyviin vain äänitteellisille: ilman äänitettä
          // nappi tarjoaisi laitteen lukijaa merkinnälle, jota ei ole
          // tarkoitettu striimattavaksi.
          this.naytaMerkinnanKaiutin(true);
        } else {
          this.factKuuntele.hidden = true;
        }
        // Lyhyt kertoja pysähtyy ensimmäisen virkkeen jälkeiseen
        // hengähdykseen; osuus kertoo äänitteen lauserajan etsijälle,
        // mistä kohtaa puhetta virkkeen loppu suunnilleen on.
        const { eka: virtaEka } = ekaLause(merkinta.teksti);
        const virtaOsuus = merkinta.teksti.length
          ? virtaEka.length / merkinta.teksti.length : null;
        this.asetaMerkinnanLuenta(virtaAanite ? () => {
          const tila = kertojaTila();
          if (tila === 'ei') {
            stopDiaryVoice(this);
          } else if (tila === 'lyhyt') {
            playDiaryVoice(this, virtaAanite, {
              ekaLauseeseen: true, osuus: virtaOsuus, viive: 1000,
            });
          } else {
            playDiaryVoice(this, virtaAanite, { viive: 1000 });
          }
        } : null);
        return;
      }
      if (virtaKaupunki && fokusvirtaLukitseeLehden(this, virtaKaupunki)) {
        this.factCard.hidden = true;
        this.uusiFactKey(null);
        this.factVoiceEl.textContent = '';
        this.asetaPaikkarivi('');
        this.factText.textContent = '';
        this.factImage.hidden = true;
        this.factKuuntele.hidden = true;
        this.naytaFactValokuva(null);
        stopDiaryVoice(this);
        this.asetaMerkinnanLuenta(null, { aloita: false });
        return;
      }
    }

    // Matkakirjan merkintä voittaa aina (omistajan havainto Gaossa:
    // aikataulurivi peitti uuden saapumistekstin koko käynnin ajaksi).
    // Kaupungissa ollessa aikataulu liitetään merkinnän perään omana
    // rivinään; oma korttinsa siitä tulee vain ilman saapumismerkintää.
    const saapuvilla = game.arrivalFact
      && game.arrivalFact.packId === game.pack.id
      && game.player.pos.type === 'city'
      && game.player.pos.city === game.arrivalFact.cityId;

    // Isoisän aikataulu nousee esiin, kun matkapäivä ohittaa merkinnän.
    const aikataulu = game.scheduleNote;
    if (aikataulu && aikataulu.packId === game.pack.id && !saapuvilla) {
      const key = `schedule:${aikataulu.packId}:${aikataulu.day}`;
      if (this.factKey === key) return;
      this.uusiFactKey(key);
      this.factVoiceEl.textContent = 'Isoisän aikataulusta';
      this.asetaPaikkarivi(`Päivä ${aikataulu.day}`);
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      stopDiaryVoice(this);
      this.asetaMerkinnanLuenta(null, { aloita: false });
      this.typeText(this.factText, aikataulu.text);
      return;
    }

    // Saapumishavainto: kortti kertoo aina siitä kaupungista, jossa
    // matkaaja on. Isoisän muistelu luetaan ääneen ensisijaisesti; ilman
    // sitä käytetään kaupungin ensimmäistä havaintoa. Sama teksti pysyy
    // koko käynnin ajan, ja luenta kuuluu vain kerran per saapuminen.
    const saapuminen = game.arrivalFact;
    if (saapuminen && saapuminen.packId === game.pack.id
      && game.player.pos.type === 'city' && game.player.pos.city === saapuminen.cityId) {
      // Lennon aikana ruudussa on lentorepliikki — havainto ja luenta
      // alkavat vasta, kun pelaaja astuu ulos koneesta. Muuten lukija
      // lukisi eri tekstiä kuin ruudulla näkyy.
      if (document.body.classList.contains('flight-active')) return;
      const kaupunki = game.board.cityById.get(saapuminen.cityId);

      // Uusi malli (pilotti): nuoren herran fiiliskuvaus lihavoituna,
      // perässä isoisän nosto, ja lukija lukee koko merkinnän tunteella.
      // Teksti ei vaihdu kaupungissa olon aikana.
      // Aikataulurivi elää merkinnän perässä: sen ilmestyminen muuttaa
      // kortin avainta (teksti piirtyy uusiksi), mutta luenta ei ala
      // alusta — luentaa seurataan perusavaimella.
      const aikatauluLisa = aikataulu && aikataulu.packId === game.pack.id
        ? `:a${aikataulu.day}` : '';

      /*
       * TILAPÄINEN (omistajan päätös 11.8.2026 ilta): vanhan mallin
       * lyhyt kahden äänen merkintä luentoineen on palautettu
       * kaaritekstin tilalle, kunnes tekstit kirjoitetaan uusiksi
       * Raamatun mukaan — omistajan arvio: vanha malli on
       * parempi, ja kaaritekstien luentoja ei ehditty generoida.
       * Kaarimerkintää käytetään vain, jos vanhaa ei ole; kohtaaminen
       * ja aarre tulevat yhä kaaresta. Nosto jää kaaritekstistä pois:
       * merkintä on jo kokonainen.
       */
      const vanhaMerkinta = (SAAPUMISTEKSTIT[saapuminen.packId] ?? {})[saapuminen.cityId];
      const kaariMerkinta = !vanhaMerkinta && KAARI_LAUDAT.has(saapuminen.packId)
        ? TARINAKAARI[saapuminen.cityId] : null;
      const uusi = kaariMerkinta
        ? { kuvaus: kaariMerkinta.saapuminen, nosto: '' }
        : vanhaMerkinta;
      if (uusi && kaupunki) {
        const luentaAvain = `saapui:${saapuminen.packId}:${saapuminen.cityId}`;
        const key = luentaAvain + aikatauluLisa;
        if (this.factKey === key) return;
        this.uusiFactKey(key);
        this.factVoiceEl.textContent = 'Matkakirjasta';
        this.asetaPaikkarivi(kaupunki.name);
        this.factImageTitle = null;
        this.factImage.hidden = true;
        this.naytaFactValokuva(saapuminen.cityId, kaupunki.name);
        this.factText.textContent = '';
        const lihava = html('b', 'fact-lead');
        const jatko = html('span');
        this.factText.appendChild(lihava);
        this.factText.appendChild(document.createTextNode(' '));
        this.factText.appendChild(jatko);
        // Vain ensimmäinen lause lihavoituna (omistajan toive) — loppu
        // kuvauksesta ja isoisän nosto jatkuvat tavallisella leikkauksella.
        const { eka, loput } = ekaLause(uusi.kuvaus);
        const jatkoTeksti = [loput, uusi.nosto].filter(Boolean).join(' ');
        this.typeText(lihava, eka, 'fact', () => {
          this.typeText(jatko, jatkoTeksti, 'fact', () => {
            const rivi = this.aikatauluRivi();
            if (rivi) this.factText.appendChild(rivi);
            /*
             * LIVIA SAA KOMMENTOIDA MYÖS TAVALLISESSA KAUPUNGISSA
             * (omistajan laajennus 28.8.2026): sama puheenvuoro kuin
             * fokuskaupungin maadoitus, vain eri sisältö — kaupungin
             * oma saapumisrepliikki (js/fokusvirta.js
             * LIVIAN_SAAPUMISET). Kupla odottaa itse luennan loppua ja
             * vaikenee, jos kaupungille ei ole kirjoitettu repliikkiä.
             */
            fokusvirtaSaapumiskupla(this, kaupunki);
          });
        });
        /*
         * ÄÄNITE ENSIN, KUN TEKSTI TÄSMÄÄ (omistajan linjaus
         * 15.8.2026, korvaa 14.8. "lukijaääni ensin" -päätöksen):
         * ElevenLabs-äänite soi, jos merkinnän luenta-kenttä vastaa
         * nykyistä näyttötekstiä (luentaVastaaTekstia) — 39/42
         * äänitteestä täsmäsi linjauksen hetkellä. Muuttunut teksti
         * striimataan lukijaäänellä, samoin merkinnät joille
         * äänitettä ei koskaan tehty ja mykistetyt kaariosat.
         * UUSIA ÄÄNITTEITÄ EI GENEROIDA ennen kuin matkakirjatekstit
         * uudistetaan Raamatun valmistuttua — striimaus kattaa
         * välivaiheen. Kaariosilla ajantasaisuuden kirjanpito on
         * mykistyslistassa (kaariLuentaSoi), ei tekstivertailussa.
         */
        const saapumisAanite = kaariMerkinta
          ? (kaariLuentaSoi(kaariMerkinta, 'saapuminen') ? 'kaari' : null)
          : (luentaVastaaTekstia(uusi)
            ? luentaLauta(SAAPUMISLUENNAT, saapuminen.packId, saapuminen.cityId)
            : null);
        if (puheTuettu() && !saapumisAanite) {
          this.diaryFullUrl = null;
          this.naytaMerkinnanKaiutin(false);
          // Kertojan tila (yläpalkin valikko): pitkä lukee koko
          // merkinnän, lyhyt vain ensimmäisen lauseen — kaiutinnappi
          // jatkaa loput. Ei kertojaa → ei autoluentaa.
          const aloitaStriimi = () => {
            stopDiaryVoice(this);
            const tila = kertojaTila();
            if (tila === 'lyhyt') {
              this.merkintaJatko = jatkoTeksti || null;
              lueMerkinta(this, eka, { viive: 1000 });
            } else if (tila === 'pitka') {
              lueMerkinta(this, [uusi.kuvaus, uusi.nosto].filter(Boolean).join(' '), { viive: 1000 });
            }
          };
          if (this.luettuSaapuminen !== luentaAvain) {
            this.luettuSaapuminen = luentaAvain;
            this.asetaMerkinnanLuenta(aloitaStriimi);
          } else {
            // Sama merkintä uudelleen ruudulle (vihje, aikataulu) —
            // mahdollinen vanha äänite kiinni, luentaa ei aloiteta.
            stopDiaryVoice(this);
            this.asetaMerkinnanLuenta(aloitaStriimi, { aloita: false });
          }
          return;
        }
        // Kaiutin ja luenta vain merkinnöille, joiden äänite on ajan
        // tasalla (saapumisAanite yllä). Ilman lukijaääntä myös
        // eritekstinen äänite kelpaa varapoluksi — parempi vanha
        // luenta kuin hiljaisuus.
        const saapumisLauta = saapumisAanite
          ?? (kaariMerkinta
            ? null
            : luentaLauta(SAAPUMISLUENNAT, saapuminen.packId, saapuminen.cityId));
        this.diaryFullUrl = saapumisLauta
          ? `assets/audio/puhe-${saapumisLauta}-saapuminen-${saapuminen.cityId}.mp3`
          : null;
        this.naytaMerkinnanKaiutin(Boolean(saapumisLauta));
        // Kertojan tila (yläpalkin valikko): pitkä lukee koko merkinnän,
        // lyhyt vain ensimmäisen lauseen (omistajan tarkennus — luenta
        // pysähtyy ensimmäisen virkkeen jälkeiseen hengähdykseen), ei
        // kertojaa jättää luennan aloittamatta — kaiutinnappi yliajaa
        // sen hetkellisesti.
        const saapumisAani = this.diaryFullUrl;
        const aloitaSaapuminen = saapumisLauta ? () => {
          const tila = kertojaTila();
          if (tila === 'ei') {
            stopDiaryVoice(this);
          } else if (tila === 'lyhyt') {
            playDiaryVoice(this, saapumisAani, {
              ekaLauseeseen: true,
              osuus: eka.length / (uusi.kuvaus.length + 1 + (uusi.nosto?.length ?? 0)),
              viive: 1000,
            });
          } else {
            playDiaryVoice(this, saapumisAani, { viive: 1000 });
          }
        } : null;
        if (saapumisLauta && this.luettuSaapuminen !== luentaAvain) {
          this.luettuSaapuminen = luentaAvain;
          this.asetaMerkinnanLuenta(aloitaSaapuminen);
        } else {
          stopDiaryVoice(this);
          // Sama merkintä uudelleen ruudulle: automatiikka on jo
          // kuluttanut vuoronsa, mutta kytkin saa yhä aloittaa alusta.
          this.asetaMerkinnanLuenta(aloitaSaapuminen, { aloita: false });
        }
        return;
      }

      const faktat = game.pack.placeFacts?.[saapuminen.cityId] ?? [];
      const isoisanIdx = faktat.findIndex((f) => factVoice(f) === 'isoisa');
      const fakta = faktat[isoisanIdx >= 0 ? isoisanIdx : 0];
      if (fakta && kaupunki) {
        const luentaAvain = `saapui:${saapuminen.packId}:${saapuminen.cityId}`;
        const key = luentaAvain + aikatauluLisa;
        if (this.factKey === key) return;
        this.uusiFactKey(key);
        this.factVoiceEl.textContent = voiceTitle(factVoice(fakta));
        this.asetaPaikkarivi(kaupunki.name);
        this.factImageTitle = typeof fakta === 'string' ? null : fakta.wiki ?? null;
        this.factImage.hidden = !this.factImageTitle;
        // Vanha valokuva kaupungista pikkukuvana tekstin kylkeen.
        this.naytaFactValokuva(saapuminen.cityId, kaupunki.name);
        // Ensimmäinen lause lihavoituna, loput perään samalla koneella.
        const teksti = factText(fakta);
        const { eka, loput } = ekaLause(teksti);
        this.factText.textContent = '';
        const lihava = html('b', 'fact-lead');
        const jatko = html('span');
        this.factText.appendChild(lihava);
        this.factText.appendChild(document.createTextNode(' '));
        this.factText.appendChild(jatko);
        this.typeText(lihava, eka, 'fact', () => {
          const loppuun = () => {
            const rivi = this.aikatauluRivi();
            if (rivi) this.factText.appendChild(rivi);
          };
          if (loput) this.typeText(jatko, loput, 'fact', loppuun);
          else loppuun();
        });
        // Luenta pysähtyy ensimmäisen virkkeen jälkeiseen hengähdykseen —
        // kaiutin jatkaa samasta kohdasta. Vihjeen tai aikataulun väläys
        // ei käynnistä luentaa uudelleen samassa kaupungissa.
        //
        // Lukijaääni ensin (14.8.2026): havainto luetaan striimaten
        // tekstistä — ensimmäinen virke heti, loput kaiuttimesta.
        if (puheTuettu()) {
          this.diaryFullUrl = null;
          this.naytaMerkinnanKaiutin(false);
          const aloitaHavainto = () => {
            if (kertojaTila() === 'ei') return;
            stopDiaryVoice(this);
            this.merkintaJatko = loput || null;
            lueMerkinta(this, eka, { viive: 1000 });
          };
          if (this.luettuSaapuminen !== luentaAvain && kertojaTila() !== 'ei') {
            this.luettuSaapuminen = luentaAvain;
            this.asetaMerkinnanLuenta(aloitaHavainto);
          } else {
            stopDiaryVoice(this);
            this.asetaMerkinnanLuenta(aloitaHavainto, { aloita: false });
          }
          return;
        }
        const havaintoLauta = luentaLauta(HAVAINTOLUENNAT, saapuminen.packId, saapuminen.cityId);
        this.diaryFullUrl = havaintoLauta
          ? `assets/audio/puhe-${havaintoLauta}-havainto-${saapuminen.cityId}.mp3`
          : null;
        this.naytaMerkinnanKaiutin(Boolean(havaintoLauta));
        const havaintoAani = this.diaryFullUrl;
        const soitaHavainto = havaintoLauta ? () => {
          if (kertojaTila() === 'ei') return;
          playDiaryVoice(this, havaintoAani, {
            ekaLauseeseen: true,
            // Ensimmäisen virkkeen osuus tekstistä ohjaa tauon valintaa.
            osuus: teksti.length ? eka.length / teksti.length : null,
            viive: 1000,
          });
        } : null;
        if (soitaHavainto && this.luettuSaapuminen !== luentaAvain && kertojaTila() !== 'ei') {
          this.luettuSaapuminen = luentaAvain;
          this.asetaMerkinnanLuenta(soitaHavainto);
        } else {
          stopDiaryVoice(this);
          this.asetaMerkinnanLuenta(soitaHavainto, { aloita: false });
        }
        return;
      }
    }

    const player = game.player;
    const city = this.factCity(player.pos);
    const facts = game.pack.placeFacts[city.id];
    if (!facts || facts.length === 0) return;

    const pick = Math.floor(hash01(`fact:${city.id}:${game.turnCount}:${player.id}`) * facts.length);
    const fact = facts[Math.min(pick, facts.length - 1)];
    const text = factText(fact);
    const key = `${city.id}:${text}`;
    if (key === this.factKey) return;
    this.uusiFactKey(key);
    this.factKuuntele.hidden = true;
    this.naytaFactValokuva(player.pos.type === 'city' ? city.id : null, city.name);
    stopDiaryVoice(this);
    // Satunnaishavainnolla ei ole luentaa: kytkin ei saa aloittaa
    // edellisen merkinnän ääntä sen päälle.
    this.asetaMerkinnanLuenta(null, { aloita: false });

    // Otsikko kertoo kumpi ääni puhuu, alarivi paikan.
    const onRoute = player.pos.type === 'edge';
    this.factVoiceEl.textContent = voiceTitle(factVoice(fact));
    this.asetaPaikkarivi(onRoute ? `Matkalla — ${city.name}` : city.name, city.name);
    // Havaintoon voi liittyä kuva: pieni linkki avaa ilmiön Wikipedia-kuvan.
    this.factImageTitle = typeof fact === 'string' ? null : fact.wiki ?? null;
    this.factImage.hidden = !this.factImageTitle;
    const source = this.sourceLine(factSource(fact));
    this.typeText(this.factText, text, 'fact', () => {
      if (source) this.factText.appendChild(source);
    });

    // Uusi tieto häivähtää esiin, jotta vaihdoksen huomaa.
    this.factText.classList.remove('fact-in');
    void this.factText.offsetWidth;
    this.factText.classList.add('fact-in');
  }

  /**
   * Lähderivi vastauksen perään. Verkko-osoite näytetään linkkinä palvelimen
   * nimellä, sanallinen viite sellaisenaan. Periaate 2: väite on tarkistettavissa.
   */
  sourceLine(sources) {
    if (!sources || sources.length === 0) return null;
    const row = html('span', 'source-line');
    row.appendChild(html('span', 'source-label', 'Lähde:'));
    sources.forEach((source, i) => {
      if (i > 0) row.appendChild(html('span', '', ' · '));
      if (isSourceUrl(source)) {
        const link = html('a', '', sourceLabel(source));
        link.href = source;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        row.appendChild(link);
      } else {
        row.appendChild(html('span', '', source));
      }
    });
    return row;
  }

  /**
   * Äänimaisema seuraa matkaajaa: paikan oikea äänite jos sellainen on
   * merkitty, muuten kaupungin syntetisoitu ambienssi, tai meri kun ollaan
   * reitillä merellä. Ilman ambience-kenttää ei soiteta mitään, joten muut
   * laudat pysyvät hiljaisina kunnes ne saavat omansa.
   */
  syncAmbience() {
    const { game } = this;
    // Radiotilassa radio on ainoa ääni. Kaupungin äänimaiseman sulkee
    // radio.paalle() itse; tämä estää sen palaamisen.
    if (this.radioPaalla()) return;
    // Lennon aikana kuuluu matkustamon äänimaisema (omistajan toive
    // 10.8.2026: kalvon taustaääneksi äänimaisema lentokoneen
    // sisältä). Kaupungin maisema alkaa vasta, kun pelaaja astuu ulos
    // koneesta (ennakoiAmbienssi ohittaa lipun kalvon lopussa).
    //
    // lennonAmbienssi on napautuksen ja luokan välinen silta: avauslento
    // käynnistää äänen jo ennen kuin body.flight-active on paikallaan
    // (ks. aloitaLennonAmbienssi), eikä väliin osuva render saa palauttaa
    // etusivun lähtöaulaa kabiinin tilalle.
    if (this.lennonAmbienssi || document.body.classList.contains('flight-active')) {
      playPlaceAmbience('lentomatka', 'lentokone', this.game.pack?.id);
      return;
    }
    /*
     * JALKAMATKAN AJAN SOI MATKAN OMA MAISEMA (#96). Sama silta kuin
     * lennolla: peli on jo siirtänyt nappulan perille, joten ilman
     * lippua matkan aikana osuva piirto toteaisi määränpään ja
     * katkaisisi matkaäänen heti sen alettua. Lipun laskee
     * lopetaJalkamatkanAani viimeisellä askeleella.
     */
    if (this.jalkamatkanAani) {
      playPlaceAmbience('jalkamatka', JALKAMATKAN_MAISEMA, game.pack?.id);
      return;
    }
    if (game.phase === 'over') {
      playPlaceAmbience(null, null);
      return;
    }
    // Etusivullakin on äänimaisema: satama ja meri odottavat lähtijää.
    // 'etusivu' ja 'merimatka' ovat virtuaalipaikkoja, joille voi valita
    // äänen studiosta kuten kaupungeille. Lauta kertoo maanosan, jonka
    // korista ääni arvotaan.
    const lauta = game.pack?.id;
    if (game.phase === 'pickstart') {
      // Etusivun ainoa taustaääni on Lontoon lentokentän lähtöaulan
      // häly (omistajan toive 10.8.2026) — satama-ambienssi väistyi.
      playPlaceAmbience('etusivu', 'lentoasema', lauta);
      return;
    }
    const pos = game.player.pos;
    if (pos.type === 'edge') {
      const edge = game.board.edgeById.get(pos.edge);
      if (edge?.type === 'sea') playPlaceAmbience('merimatka', 'meri', lauta);
      else playPlaceAmbience(null, null);
      return;
    }
    const city = game.board.cityById.get(pos.city);
    playPlaceAmbience(city?.id ?? null, city?.ambience ?? null, lauta, this.game.pack?.map?.cityCountry ?? null);
  }

  /**
   * Käynnistää matkustamon äänimaiseman heti napautuksesta, ennen kuin
   * pergamenttiarkki, kartta tai kone näkyy ruudulla (omistajan tilaus
   * 27.8.2026: ääni ensin, kuva perässä).
   *
   * Ohittaa syncAmbiencen tavallisen järjestyksen samasta syystä kuin
   * ennakoiAmbienssi saapumisessa: lentolippu (body.flight-active)
   * nousee vasta arkin takana, ja sitä odottamalla ääni myöhästyisi
   * juuri sen verran, ettei se ehdi kuuluviin ennen kuvaa. Lippu
   * lennonAmbienssi pitää valinnan voimassa siihen asti, kunnes luokka
   * on paikallaan (doPickStart).
   */
  aloitaLennonAmbienssi() {
    // Radiotilassa radio on ainoa ääni — sama poikkeus kuin syncAmbiencessa.
    if (this.radioPaalla()) return;
    this.lennonAmbienssi = true;
    playPlaceAmbience('lentomatka', 'lentokone', this.game.pack?.id);
  }

  /**
   * Käynnistää määränpään äänimaiseman jo ennen saapumista (omistajan
   * toive): ristihäivytys ehtii alkaa, ja kun kertoja aloittaa sekunnin
   * kuluttua saapumisesta, tausta on ollut hetken kuuluvissa.
   *
   * Ohittaa syncAmbiencen lentolipun tarkoituksella — juuri lennon
   * lopussa tämä on ainoa tapa saada ääni liikkeelle ennen kalvon
   * sulkeutumista. Saapumisen jälkeinen syncAmbience toteaa saman
   * kaupungin eikä aloita mitään uudestaan.
   */
  ennakoiAmbienssi(pos) {
    const { game } = this;
    if (!pos || pos.type !== 'city' || game.phase === 'over') return;
    const city = game.board.cityById.get(pos.city);
    if (!city) return;
    playPlaceAmbience(city.id, city.ambience ?? null, game.pack?.id, game.pack?.map?.cityCountry ?? null);
  }

  /**
   * Kertoo moottorille, mistä laudan kaupungeista on kuratoitu valokuva
   * valokuvakysymystä varten.
   *
   * Ennen v413:a tämä latasi Wikipedian artikkelikuvia taustalla ja
   * hyväksyi kaupungin poolliin, jos kuva ylipäätään saatiin. Kuvan
   * SISÄLTÖÄ ei tarkistettu mitenkään, ja siksi paikkakysymykseen
   * päätyi Kumasin kohdalla Kofi Annanin muotokuva ja Nairobin kohdalla
   * kuva vuoden 1998 pommi-iskusta.
   *
   * Matkakirjan omat valokuvat (KAIKKI_VALOKUVAT) on valittu käsin ja
   * ne esittävät paikkaa. Ne ovat myös repossa ja peilissä, joten
   * kysymys toimii ilman verkkoa eikä latausta tarvitse odottaa.
   */
  primePhotoPool() {
    const pack = this.game.pack;
    this.photoPools ??= new Map();
    if (!this.photoPools.has(pack.id)) {
      const kuvat = new Map();
      for (const c of pack.cities) {
        if (EI_VALOKUVAKYSYMYKSEEN.has(c.id)) continue;
        const valokuva = KAIKKI_VALOKUVAT[c.id];
        /*
         * Nykykuva ensin: kysymys on "mikä paikka tämä on", ja
         * nykyvalokuva vastaa siihen suoremmin kuin isoisän ajan vedos.
         * Vanha vedos kelpaa varalle — sekin on kuva samasta paikasta.
         */
        const valittu = valokuva?.uusi?.tiedosto ? valokuva.uusi : valokuva;
        if (!valittu?.tiedosto) continue;
        kuvat.set(c.id, { tiedosto: valittu.tiedosto, lahde: valittu.lahde ?? null });
      }
      this.photoPools.set(pack.id, kuvat);
    }
    const kuvat = this.photoPools.get(pack.id);
    this.game.setPhotoPool([...kuvat.keys()], kuvat);
  }

  render() {
    this.syncAmbience();
    if (this.dead) return;
    this.primePhotoPool();
    this.onChange?.(this.game);
    // Aloituskartalla asettelu on kahdessa palstassa; pelin käynnistyttyä
    // kartta täyttää koko ruudun ja paneelit kelluvat sen päällä.
    // Katselutila käyttäytyy kuin peli olisi jo käynnissä.
    const avauksessa = this.game.phase === 'pickstart' && !this.katselu;
    document.body.dataset.mode = avauksessa ? 'start' : 'play';
    /*
     * Alkuanimaatio irrotetaan puusta pelin ajaksi eikä vain piiloteta.
     *
     * display: none riittäisi silmälle, mutta selain pitää kerroksen
     * viisitoista animaatiota yhä käynnissä ja laskee niille tyylin joka
     * ruudulla. Pelin aikana kartta on jo raskas (bittikartta,
     * panorointi, nappuloiden liikkeet), eikä sen rinnalle jätetä
     * mitään, mikä ei näy. Uusi peli palauttaa kerroksen paikalleen.
     */
    this.paivitaAlkuReitit(avauksessa);
    // Matkavalinnan toinen vaihe koskee vain käsillä olevaa valintaa: heti
    // kun vaihe vaihtuu, ollaan taas seuraavan vuoron ensimmäisessä vaiheessa.
    if (this.game.phase !== 'action') this.suljeMatkavalikko();
    // Saapumiskortti kuuluu vain offer-vaiheeseen: botin vuorolla ja muissa
    // vaiheissa se suljetaan, jottei se jää roikkumaan kartan päälle.
    if (this.game.phase !== 'offer' || this.game.player.isBot) this.closeArrival();
    this.renderIntro();
    this.stampPassport();
    // Vuorossa oleva pelaaja voi olla eri laudalla kuin edellinen.
    if (this.game.pack.id !== this.drawnPackId) this.drawBoardFor(this.game.pack);
    // Zoomiportaan päät ja näkyvyys tarkistetaan joka piirrossa: vaihe
    // vaihtuu, lauta vaihtuu ja automaattinen saapumiszoom muuttaa tasoa.
    this.kartta.paivitaZoomiNapit();
    this.drawCountryBorders();
    /*
     * Vertailutilan maakerros piirretään joka piirrossa uudestaan
     * kuten muutkin kerrokset: kartta rakennetaan kokonaan uusiksi kun
     * lauta vaihtuu (drawBoardFor), ja ilman tätä kerros jäisi vanhan
     * puun mukana pois — kaupungit palaisivat kartalle kesken
     * vertailun.
     */
    if (vertailuPaalla()) {
      piirraVertailuMaat(this);
      rakennaVertailuPalkki(this);
    }
    this.drawTokens();
    this.drawTargets();
    this.drawPawns();
    /*
     * Fokuskerros vasta kaupunkien ja laattojen jälkeen: se lukee
     * kartalta valmiit data-fokus-maa -osat ja piilottaa käymättömien
     * maiden datan. Tässä kohdassa myös uusi kaupunki on jo kirjattu
     * käydyksi, joten maa tarkentuu samassa piirrossa kuin saavutaan.
     */
    this.paivitaFokusKerros();
    this.renderTurnPill();
    // Ennen nappien latomista: syke luetaan napin luonnissa.
    this.paivitaTutkiSyke();
    /*
     * Fokusmoodissa kaupungin esittely alkaa itsestään saapumisesta
     * (Raamattu, ANNOSTELU). Muualla tämä ei tee mitään.
     *
     * ALOITUSLENNON AIKANA EI VIELÄ: kone on kartalla matkalla kohti
     * kaupunkia, eikä esittelykortti saa avautua sen alle. Peli on
     * siirtänyt nappulan perille jo lennon alussa (actionPickStart), ja
     * ilman tätä ehtoa render avaisi virran heti. Lento päättää itsensä
     * render-kutsulla, jolloin esittely alkaa kuten muillakin
     * saapumisilla (ks. aloituslentoSisalla).
     */
    if (!this.aloituslentoKesken) fokusvirtaSaapuminen(this);
    this.renderActions();
    this.renderFact();
    renderQuiz(this);
    /*
     * Sähkepinta heti visan jälkeen: kaveriavun nappi asuu visan
     * apurivillä ja odotuskortti sen vaihtoehtojen yllä, joten kortti
     * pitää päivittää vasta kun visa on piirretty (js/sahke.js).
     * Ilman sähkelinjaa tai retkikuntaa kutsu palaa saman tien.
     */
    paivitaSahke(this);
    // Linssit tahdistetaan joka piirrossa, mutta työ tehdään vasta kun
    // jokin oikeasti muuttui: uusi löytö, uusi lauta tai uusi kerros.
    void this.paivitaLinssit();
    // Odottaako peli valintaa kartalta? Jos odottaa eikä mitään tapahdu,
    // pöllö vinkkaa hetken kuluttua.
    this.paivitaValintavihje();
    // Game Centerin saavutukset (iOS-kuori; selaimessa ei tee mitään).
    this.paivitaSaavutukset();

    if (this.game.phase === 'over') {
      this.showWinner();
      return;
    }
    this.scheduleBot();
  }

  /**
   * Vihreä passi saa leiman jokaisesta laudasta, jolla matkaaja on käynyt.
   * Leimat säilyvät pelikertojen yli, joten aloitusnäkymässä ei leimata:
   * lauta on vasta valitsematta.
   */
  stampPassport() {
    const { game } = this;
    if (game.phase === 'pickstart') return;
    if (stampBoard(game.pack.id, game.pack.boardLabel)) {
      // Ei ilmoitusta kartan päälle: uusi leima näkyy vain pienenä
      // laukun elävöitymisenä ja paperin rapinana (omistajan toive).
      sfx.play('paper');
      this.elavoitaLaukku();
    }

    // Kunniamerkintä: isoisän ennätys rikottiin tällä laudalla. Sekin on
    // passissa eikä pelitallenteessa, joten se jää talteen uusiin peleihin.
    const mark = game.recordMark;
    if (mark && stampBoard(`kunnia:${mark.packId}`, `${game.pack.boardLabel} — ${mark.label}`)) {
      const box = this.buildToast({
        kind: 'stamp',
        icon: 'mitali',
        text: mark.label,
        sub: `Aarre löytyi päivänä ${mark.day}`,
      });
      sfx.play('paper');
      this.elavoitaLaukku();
      setTimeout(() => this.removeToast(box), TOAST_MS.default);
    }
  }

  /*
   * Selain säilyttää dialogikortin vierityskohdan sulkemisen yli ja
   * palauttaa sen showModalissa. Suljettu dialogi on display:none —
   * ennen avaamista tehty scrollTop-nollaus valuu siksi hukkaan, ja
   * lehti tai popup aukesi edellisen käynnin kohdasta (omistajan
   * havainto 9.8.2026). Nollaus tehdään siksi aina showModalin JÄLKEEN.
   */
  nollaaDialoginVieritys(dialogi) {
    for (const kortti of dialogi.querySelectorAll('.dialog-card')) kortti.scrollTop = 0;
  }

  /**
   * Saapumiskortti: kaupungin matkatarina keskellä ruutua ja sen lopussa
   * valinta, avataanko aarre. Kieltävä vastaus päättää vuoron, jolloin
   * seuraava nopanheitto alkaa tavalliseen tapaan.
   */
  /**
   * Saapumiskortin tehtävänapin tila (omistajan säännöt 10.8.2026):
   * kohtaaminen odottamassa → "Tapaa Nikos"; ensimmäinen yritys
   * epäonnistui → "Viimeinen mahdollisuus tavata"; sen jälkeen pulma
   * tai laatta → "Etsi kätkö"; kaarikaupungissa jonka tehtävät ovat
   * lopussa nappi jää HARMAANA näkyviin — onnistumisen jälkeen omalla
   * tekstillään, kahden epäonnistumisen jälkeen "X ei tavattavissa".
   * Kaarettomalla laudalla (Afrikka, Aasia…) käytös on ennallaan:
   * nappi piiloon kun tehtävää ei ole. null = nappi piiloon.
   */
  tehtavaNapinTila(city) {
    const { game } = this;
    /*
     * KEVYT KULKU: kohtaaminen tavataan kartalta, ei lehden pohjalta
     * (Raamattu, KEVYT KULKU -KOKEILU: *"kaupunkilehden ALIN KOHTA
     * (josta pääsi tapaamaan henkilön) POIS"*). Perustelu ja umpikujan
     * esto ovat yhdessä paikassa: js/fokusvirta.js
     * fokusvirtaKohtaaminenPisteessa.
     */
    if (fokusvirtaKohtaaminenPisteessa(this, city)) return null;
    const kaari = game.kaariTilanne?.(city.id);
    const tapaa = KOHTAAMISET[city.id]?.nappi
      ?? (kaari?.kohde?.nimi ? `Tapaa ${kaari.kohde.nimi}` : 'Etsi kätkö');
    // Kohtaaminen on kaupungin ensimmäinen tehtävä (game.actionQuiz),
    // joten sen tila ratkaisee napin kunnes se on pelattu loppuun.
    if (kaari && game.kaariTarina(city.id)) {
      return {
        teksti: kaari.yritykset > 0 ? 'Viimeinen mahdollisuus tavata' : tapaa,
        pois: false,
      };
    }
    if (game.pendingPuzzle?.() || game.tokenHere?.()) {
      return { teksti: 'Etsi kätkö', pois: false };
    }
    if (kaari) {
      return kaari.onnistui
        ? { teksti: tapaa, pois: true }
        : { teksti: `${kaari.kohde.nimi ?? 'Henkilö'} ei tavattavissa`, pois: true };
    }
    return game.tehtavaTarjolla?.() ? { teksti: tapaa, pois: false } : null;
  }

  /** Asettaa tehtävänapin tekstin, harmauden ja näkyvyyden kortille. */
  paivitaTehtavaNappi(city) {
    const nappi = document.getElementById('arrival-yes');
    if (!nappi || !city) return;
    const tila = this.tehtavaNapinTila(city);
    nappi.hidden = !tila;
    if (!tila) return;
    nappi.textContent = tila.teksti;
    nappi.disabled = tila.pois;
    nappi.classList.toggle('tehtava-pois', tila.pois);
  }

  openArrival(city) {
    // Fokusmoodin lehtilukko: kaupungin lehti aukeaa vasta aarteesta,
    // ja siihen asti sen paikan ottaa annosteluvirta (js/fokusvirta.js).
    if (fokusvirtaOhittaaLehden(this, city)) return;
    if (this.lehtitila.arrivalShownFor === city.id && this.arrivalDialog.open) return;
    // Mitta kuntoon ennen kuin mitään sivutetaan (ks. varmistaLehtiMitta).
    this.varmistaLehtiMitta();
    this.lehtitila.arrivalShownFor = city.id;
    // Matkakirjan luenta tauolle Tutki-näkymän ajaksi: se jatkaa samasta
    // kohdasta, kun pelaaja palaa karttanäkymään (omistajan toive).
    if (this.diaryVoice && !this.diaryVoice.paused) {
      this.diaryVoice.pause();
      this.luentaTauolla = this.diaryVoice;
    }

    // Kortissa on kuva, parin lauseen esittely ja päätös. Esittely tulee
    // Wikipedian tiivistelmästä; kunnes haku valmistuu — tai jos paikalla
    // ei ole artikkelia — kortissa lukee isoisän vakiorivi.
    this.arrivalCity.textContent = city.name;
    this.paivitaTehtavaNappi(city);
    this.arrivalImage.hidden = true;
    this.arrivalImage.removeAttribute('src');
    this.arrivalKuvakotelo.hidden = true;
    this.lehtitila.arrivalKuvat = [];
    this.lehtitila.arrivalKuvaKohdalla = 0;
    this.paivitaKuvaLaskuri();
    // Maalehti piilottaa esittelyrivin (ks. avaaMaalehti); kaupunkiin
    // palattaessa se on palautettava, tai se jäisi piiloon lopullisesti.
    this.arrivalIntro.hidden = false;
    this.arrivalIntro.textContent = 'Isoisä on merkinnyt tämän paikan karttaansa.';
    this.arrivalWiki.hidden = true;
    // Oma lyhytnosto (pilottikaupungit) näkyy heti ja toimii ilman
    // verkkoa; Lue lisää avaa oman artikkelin, joten nappi voi näkyä heti.
    // Avain on wiki-otsikko, mutta useimmilla kaupungeilla se on sama
    // kuin nimi. Ilman varasuunnitelmaa oma nosto katosi hiljaa
    // kaupungeilta, joilta wiki-kenttä puuttui.
    const omaIntro = ARTIKKELIT[city.wiki ?? city.name]?.intro;
    if (omaIntro) {
      piirraLeipateksti(this.arrivalIntro, omaIntro);
      this.arrivalWiki.hidden = false;
    }

    // Maan tiedot kaupungin rinnalla (omistajan toive): nimi näkyy heti,
    // parin lauseen esittely täyttyy kun haku ehtii. Laudoilla, joilla
    // kaupunki→maa-kytkentää ei ole, lohko pysyy piilossa.
    const iso = this.game.pack.map?.cityCountry?.[city.id];
    const maa = iso ? this.game.pack.map?.countryShapes?.[iso] : null;
    this.lehtitila.arrivalMaaTiedot = maa ?? null;
    this.arrivalMaa.hidden = !maa;
    this.arrivalMaaWiki.hidden = true;
    if (maa) {
      this.arrivalMaaNimi.textContent = maa.nimi;
      this.arrivalMaaIntro.textContent = '';
      // Lippu suht pienenä nimen vieressä; puuttuva verkko piilottaa sen.
      this.arrivalMaaLippu.hidden = true;
      if (maa.lippu) {
        this.arrivalMaaLippu.alt = `${maa.nimi} — lippu`;
        asetaKuva(this.arrivalMaaLippu, lippuUrl(maa.lippu, 96), lippuVara(maa.lippu, 96));
      } else {
        this.arrivalMaaLippu.removeAttribute('src');
      }
      // Minikartta pelin omasta rajadatasta — toimii myös ilman verkkoa.
      this.arrivalMaaKartta.textContent = '';
      const kartta = this.piirraMaakartta(iso, city.id);
      if (kartta) this.arrivalMaaKartta.appendChild(kartta);
      // Tunnusluvut ja tervehdykset kartan alle (pilottimaat).
      naytaMaaTunnusluvut(this, iso);
      naytaMaaUutiset(this, iso, city.id);
      // Mediarivit rakennetaan joka kaupungille uudestaan.
      this.lehtitila.mediaKaupunki = city;
      this.lehtitila.mediaIso = iso;
      paivitaMediarivit(this);
      // Oma lyhytnosto maasta (pilottimaat) näkyy heti ja voittaa wikin
      // automaattikatkelman; Lue lisää avaa oman artikkelin.
      //
      // Kun kaupunki ja maa ovat sama paikka (Islanti, samoin kuin
      // St. Helena Afrikassa), sama teksti osuisi kortille kahdesti
      // vierekkäin. Silloin maapalstan esittely jätetään pois — kartta,
      // tunnusluvut ja tervehdykset kertovat maasta jo omansa.
      const maanAvain = maa.wiki ?? maa.nimi;
      const omaMaaIntro = maanAvain === (city.wiki ?? city.name)
        ? null
        : ARTIKKELIT[maanAvain]?.intro;
      if (omaMaaIntro) {
        this.arrivalMaaIntro.textContent = omaMaaIntro;
        this.arrivalMaaWiki.hidden = false;
      }
      // Sama poikkeus kuin yllä: samasta artikkelista ei haeta katkelmaa
      // maapalstalle, jos kaupunkipalsta näyttää sen jo.
      if (maanAvain !== (city.wiki ?? city.name)) {
        cachedSummary(maanAvain).then((summary) => {
          if (!this.arrivalDialog.open || this.lehtitila.arrivalShownFor !== city.id) return;
          if (!summary?.extract) return;
          if (!omaMaaIntro) this.arrivalMaaIntro.textContent = shortIntro(summary.extract);
          // Lehdessä ei ole Lue lisää -nappia (ks. rakennaSivut).
          if (!this.lehtitila.tutkiLehti) this.arrivalMaaWiki.hidden = false;
        });
      }
    }

    // Kaupungin elämää: taide-, ruoka- ja musiikkinostot ja niihin
    // liittyvä tutustu ja vastaa -kysymys (pilottikaupungit).
    this.naytaKulttuuri(city);
    rakennaSivut(this, city.id);
    this.esilataaKaupunki(city);

    // Sanomalehtiarkki: koko ruudun korkuinen painopaperi, kartta jää
    // sumeana laidoille. (Käsinpiirretty aaltoreuna poistui v299:ssä —
    // omistajan päätös: pohja sanomalehden tyyliin kaikissa
    // kaupungeissa, suora leikattu reuna.)
    this.arrivalDialog.classList.add('arkki');
    if (!this.arrivalDialog.open) this.arrivalDialog.showModal();
    /*
     * KORKEUSKATTO HETI AVATTAESSA (16.8.2026). Katto asetettiin tähän
     * asti vain näkymävahdista, joten vasta avattu arkki eli CSS:n
     * dvh-arvoilla siihen saakka kunnes ruudun koko sattui muuttumaan.
     * Mitattuna: juuri avatun arkin inline-katto oli tyhjä ja kortti
     * täsmälleen ruudun korkuinen. Leveys mitoitetaan jo avattaessa
     * (mitoitaArkki); tämä on sen pystysuora pari.
     */
    this.mitoitaArkinKorkeus();
    // Lukemisen ajaksi äänimaisema madaltuu; close-kuuntelija (constructor)
    // palauttaa sen, sulkeutuipa lehti mitä reittiä tahansa.
    hiljennaAmbienssi('lehti');
    this.nollaaDialoginVieritys(this.arrivalDialog);
    const arkki = this.arrivalDialog.querySelector('.dialog-card');
    // Sivujen selaus pyyhkäisyllä ja nuolinäppäimillä.
    if (arkki) kytkeTutkiSelaus(this, arkki);
    /*
     * PÖLLÖN VINKKI LEHDEN AVAUTUESSA (kevyt kulku -kokeilu, Raamattu:
     * *"kun kaupunkilehti AUKEAA, pöllö vinkkaa MAHDOLLISIMMAN
     * LYHYESTI minitehtävästä"*). Kupla mitoitetaan kelluvan pöllönapin
     * todellisesta paikasta, ja nappi siirtyy modaalin sisään vasta kun
     * lehti on auki (js/pollo.js kiinnitysKohde) — siksi kutsu odottaa
     * seuraavaa kehystä eikä lähde tästä samasta.
     */
    globalThis.requestAnimationFrame?.(() => {
      if (this.dead || !this.arrivalDialog.open) return;
      if (this.lehtitila.arrivalShownFor !== city.id) return;
      fokusvirtaLehtivinkki(this, city);
    });
    if (!city.wiki) return;

    Promise.all([cachedSummary(city.wiki), cachedImage(city.wiki)]).then(([summary, image]) => {
      // Pelaaja on voinut ehtiä jatkaa matkaa haun aikana.
      if (!this.arrivalDialog.open || this.lehtitila.arrivalShownFor !== city.id) return;
      if (!summary) return;
      // Lehtikaupungilla on omat kuvat ja riittävä teksti — wikin
      // karuselli ja Lue lisää eivät saa ponnahtaa haun valmistuttua.
      if (this.lehtitila.tutkiLehti) return;
      if (image) {
        this.arrivalImage.src = image;
        this.arrivalImage.alt = summary.title || city.name;
        this.arrivalImage.hidden = false;
        this.arrivalKuvakotelo.hidden = false;
        // Galleria taustalla: kun lista on saatu, pikkukuvaan tulevat
        // hento laskuri ja selailunuolet.
        cachedGallery(city.wiki).then((lista) => {
          if (this.lehtitila.arrivalShownFor !== city.id || lista.length < 2) return;
          this.lehtitila.arrivalKuvat = lista;
          this.lehtitila.arrivalKuvaKohdalla = Math.max(0, lista.findIndex((k) => k.src === image));
          this.paivitaKuvaLaskuri();
          // Koko galleria latautuu taustalla heti — selaus ei odota verkkoa.
          esilataaKuvat(lista.map((k) => k.src));
        });
      }
      // Oma lyhytnosto voittaa wikin automaattikatkelman (pilottikaupungit).
      if (summary.extract && !omaIntro) this.arrivalIntro.textContent = shortIntro(summary.extract);
      this.arrivalWiki.hidden = false;
    });
  }

  /**
   * Hakee kaupungin kuvat ja ääninäytteet valmiiksi selaimen välimuistiin
   * heti saapuessa (omistajan toive): kuvakarusellin selaaminen ja
   * Kuuntele näyte -nappi toimivat silloin heti eivätkä odota latausta.
   *
   * Kaikki menee selaimen omaan välimuistiin, joten varsinainen näyttö
   * käyttää samoja osoitteita eikä lataa mitään toiseen kertaan. Haut
   * porrastetaan, ettei saapumishetki tuki yhteyttä juuri silloin kun
   * kortti piirtyy ja kertoja alkaa puhua.
   *
   * Esilataus on pelkkää nopeutta: jos se epäonnistuu, kaikki toimii
   * kuten ennenkin. Siksi virheet niellään hiljaa.
   */
  esilataaKaupunki(city) {
    if (!city || this.lehtitila.esilatattu === city.id) return;
    this.lehtitila.esilatattu = city.id;
    const kuvat = [];
    const aanet = [];

    // Kulttuurinostojen kuvat ja ääninäytteet. Kuvat ovat lazy-tilassa
    // eivätkä lataudu ennen kuin lohko avataan; ääninäyte alkaisi ladata
    // vasta napin painalluksesta.
    const kulttuuri = (KULTTUURIT[this.game.pack.id] ?? {})[city.id];
    // Kategoriakaupungissa litteät nostot eivät piirry, joten niiden
    // kuvia ei esiladata — ensimmäisen aiheen kuvat renderöityvät heti
    // avattaessa eivätkä nekään tarvitse erillistä esilatausta.
    if (!(KULTTUURI_KATEGORIAT[city.id] ?? []).length) {
      for (const nosto of kulttuuri?.nostot ?? []) {
        if (nosto.tiedosto) kuvat.push(valokuvaUrl(nosto.tiedosto, 640));
        if (nosto.aani) aanet.push(aaniOsoite(jaaAlku(nosto.aani).url));
      }
    }
    // Silloin ja nyt -valokuvapari.
    const valokuva = (VALOKUVAT[this.game.pack.id] ?? {})[city.id];
    // `uusi` on oma merkintänsä selitteineen, ei pelkkä tiedostonimi.
    if (valokuva?.tiedosto) kuvat.push(valokuvaUrl(valokuva.tiedosto, 640));
    if (valokuva?.uusi?.tiedosto) kuvat.push(valokuvaUrl(valokuva.uusi.tiedosto, 640));

    // Wikipedian kuvagalleria: juuri sitä pelaaja selaa nuolilla.
    if (city.wiki) {
      cachedGallery(city.wiki).then((lista) => {
        if (this.lehtitila.esilatattu !== city.id) return;
        this.esilataaOsoitteet(lista.map((k) => k.src), city.id);
      }).catch(() => { /* galleriaa ei saatu — selaus toimii silti */ });
    }

    this.esilataaOsoitteet(kuvat, city.id);
    // Molempien lehtien etusivut ja luentojen ensimmäiset palat.
    this.esilataaLehdet(city);
    for (const url of aanet) {
      if (!url) continue;
      const audio = new Audio(url);
      audio.preload = 'auto';
      // Elementti pidetään hengissä latauksen ajan; selain säilyttää
      // tavut omassa välimuistissaan senkin jälkeen.
      (this.esiladatutAanet ??= []).push(audio);
      audio.addEventListener('error', () => { /* soitto hoitaa varareitin */ });
    }
    if ((this.esiladatutAanet?.length ?? 0) > 6) this.esiladatutAanet.splice(0, 3);
  }

  /** Lataa kuvat taustalla muutama kerrallaan, jottei yhteys tuki. */
  esilataaOsoitteet(osoitteet, cityId, kerralla = 3) {
    const jono = osoitteet.filter(Boolean);
    const seuraava = () => {
      if (this.dead || this.lehtitila.esilatattu !== cityId) return;
      const url = jono.shift();
      if (!url) return;
      const kuva = new Image();
      kuva.addEventListener('load', seuraava, { once: true });
      kuva.addEventListener('error', seuraava, { once: true });
      kuva.src = url;
    };
    for (let i = 0; i < kerralla; i += 1) seuraava();
  }

  /**
   * Jonottaa osoitteet esilatausjonoon KERTAALLEEN.
   *
   * Sama osoite ei lähde toistamiseen: lehteä selataan edestakaisin, ja
   * jokainen sivunäyttö jonottaisi muuten seuraavan sivun kuvat uudelleen.
   * Kirjanpito katkaistaan tuhannen osoitteen kohdalla kuten
   * esilataaKuvatissa — se on kirjanpidon raja, ei latauksen.
   *
   * Kaupunkivartija tulee jonosta itsestään (esilataaOsoitteet vertaa
   * `esilatattu`-tunnukseen), joten kaupungin vaihtuessa kesken jäänyt
   * jono lakkaa etenemästä.
   */
  esipuskuroiKuvat(osoitteet) {
    const muisti = (this.esipuskuroidut ??= new Set());
    const jono = [];
    for (const url of osoitteet ?? []) {
      if (!url || muisti.has(url)) continue;
      if (muisti.size >= 1000) muisti.clear();
      muisti.add(url);
      jono.push(url);
    }
    if (jono.length) this.esilataaOsoitteet(jono, this.lehtitila.esilatattu);
  }

  /**
   * ETUKÄTEISPUSKURI: MOLEMPIEN LEHTIEN ETUSIVUT HETI SAAPUESSA
   * (omistajan tilaus 15.8.2026, docs/periaatteet.md
   * "Etukäteispuskurin periaate").
   *
   * Kaupunkilehden etusivu on tässä vaiheessa jo piirretty
   * (rakennaSivut → naytaTutkiSivu(0)), joten sen kuvat ovat matkalla.
   * Osoitteet jonotetaan silti — samoilla leveyksillä kuin piirto
   * pyytää — jotta puskuri ei riipu piirtojärjestyksestä. Sama osoite
   * samalla leveydellä on selaimelle sama kuva, joten tuplapyyntöä ei
   * synny; eri leveys sen sijaan olisi eri kuva ja latautuisi kahdesti.
   *
   * MAALEHDEN etusivua ei ole DOMissa lainkaan ennen kuin liitelinkkiä
   * painetaan, joten sen kuvat johdetaan samasta datasta, jota piirto
   * käyttää (maalehdenEkaSivu + lehdenSivunKuvat).
   *
   * Sääosio ei tarvitse kuvia: rivin kuvakkeet ovat pelin omia
   * SVG-piirroksia (SAA_IKONIT), ja päivän ennuste on jo haettu —
   * naytaLehtiSaa ajetaan saapumisessa rakennaSivutin osana.
   */
  esilataaLehdet(city) {
    // Vain lehtikaupungeissa on kaksi lehteä; muualla saapumiskortti on
    // wikin varassa eikä sillä ole etusivua puskuroitavaksi.
    if (!this.lehtitila.tutkiLehti) return;
    this.esipuskuroiKuvat([
      ...this.kaupunkilehdenEtusivunKuvat(city.id),
      // Maalehden etusivu kokonaisuudessaan.
      ...this.lehdenSivunKuvat(this.maalehdenEkaSivu()),
    ]);
    this.esipuskuroiLehtienLuennat();
  }

  /**
   * Kaupunkilehden etusivun kuvat: kansikuvat (piirraLehtiKuvat pyytää
   * pääkuvan 1200:lla ja enintään kaksi pikkukuvaa 640:llä), maan lippu
   * mastossa ja kohdekartta sivun pohjalla.
   */
  kaupunkilehdenEtusivunKuvat(cityId = this.lehtitila.arrivalShownFor) {
    const kuvat = [];
    const kansikuvat = this.lehtitila.tutkiKansi?.kansikuvat ?? [];
    const avauskuvat = this.lehtitila.tutkiKansi?.avauskuvat ?? [];
    const ennenNyt = this.lehtitila.tutkiKansi?.ennenNyt ?? [];
    /*
     * Avauskuvakaupungissa iso paikka on panoraamakaruselli (900,
     * sama leveys kuin nahtavyydenKarusellissa) ja pikkurivillä ovat
     * kansikuvien kaksi ensimmäistä; muuten entinen taitto.
     *
     * ÄMPÄRIKUVA MUKAAN (korjaus 28.8.2026): heropohjaisilla
     * avauskuvilla ei ole Commons-tiedostoa vaan `ampari`-polku
     * (js/packs/kulttuuri-kategoriat.js, herokoe/...), ja pelkkä
     * `tiedosto`-ehto pudotti juuri lehden ISOIMMAN kuvan puskurista.
     * Osoite johdetaan samalla säännöllä kuin piirto sen johtaa
     * (nahtavyydenKaruselli/varustaNostonKuva), jotta välimuisti osuu.
     */
    const avausOsoite = (teos) => teos.osoite
      ?? (teos.ampari ? julisteUrl(teos.ampari) : (teos.tiedosto ? valokuvaUrl(teos.tiedosto, 900) : null));
    for (const teos of avauskuvat) {
      const url = avausOsoite(teos);
      if (url) kuvat.push(url);
    }
    if (!avauskuvat.length && kansikuvat[0]?.tiedosto) {
      kuvat.push(valokuvaUrl(kansikuvat[0].tiedosto, 1200));
    }
    // Ennen ja nyt -pari korvaa pikkurivin kansikuvat (ks. lehti.js
    // piirraLehtiKuvat) — silloin puskuriin kuuluvat juuri ne kaksi.
    if (ennenNyt.length >= 2) {
      for (const teos of ennenNyt.slice(0, 2)) {
        if (teos.tiedosto) kuvat.push(valokuvaUrl(teos.tiedosto, 640));
      }
    } else {
      for (const teos of kansikuvat.slice(avauskuvat.length ? 0 : 1, avauskuvat.length ? 2 : 3)) {
        if (teos.tiedosto) kuvat.push(valokuvaUrl(teos.tiedosto, 640));
      }
    }
    const lippu = this.lehtitila.arrivalMaaTiedot?.lippu;
    if (lippu) kuvat.push(lippuUrl(lippu, 96));
    /*
     * Kohdekartta: oma julistekartta on paikallinen tiedosto, Commons-
     * pohjainen haetaan peilin kautta 1000:lla. Satelliittinäkymä
     * puskuroidaan mukaan, koska vipu vaihtaa kuvan heti napautuksesta.
     * (Piirto itse on piirraKaupunkiKartassa — tähän kootaan vain
     * osoitteet.)
     */
    const kohdekartta = KAUPUNKIKARTAT[cityId];
    if (kohdekartta) {
      kuvat.push(kohdekartta.polku ?? valokuvaUrl(kohdekartta.tiedosto, 1000));
      // Värikartta puskuriin samoin — vipu vaihtaa kuvan heti
      // napautuksesta.
      if (kohdekartta.varikartta) kuvat.push(kohdekartta.varikartta);
      // Miniatyyripiirrokset (etukäteispuskurin periaate): kortti
      // aukeaa napautuksesta, eikä piirros saa latautua vasta siinä.
      kuvat.push(...Object.values(MINIATYYRIT[cityId] ?? {}));
    }
    return kuvat;
  }

  /**
   * Maalehden ensimmäinen sivu ilman lehden avaamista: sama valinta
   * kuin avaaMaalehti tekee — kartta niillä mailla, joilla se on,
   * muuten ensimmäinen aihe. Puskuri hakee siis juuri sen sivun, joka
   * liitelinkistä aukeaa.
   */
  maalehdenEkaSivu(iso = this.lehtitila.tutkiMaaIso) {
    if (!iso) return null;
    const maa = this.game?.pack?.map?.countryShapes?.[iso];
    const otsikko = this.lehtitila.tutkiMaaNimi ?? maa?.nimi ?? '';
    const kartta = MAAKARTAT[iso];
    /*
     * OTSIKKO ON PELKKÄ MAAN NIMI JA LIPPU SEN PERÄSSÄ (omistajan
     * tilaus 16.8.2026). Ennen tässä luki "Ranska kartalla", vaikka
     * kartta näkyy sivulla itsestään — nimiö kertoo nyt saman kuin
     * kaupunkilehden masto: paikan nimen. Lippu tulee samasta
     * maaLippu-mekanismista kuin maan aihesivuilla, joten se on myös
     * sama nappi lipun tarinaan niillä mailla, joilla se on.
     */
    if (kartta) {
      return maa?.lippu
        ? {
          id: 'maa-etusivu', nimi: otsikko, kartta, maaLippu: maa.lippu, maa: otsikko,
        }
        : { id: 'maa-etusivu', nimi: otsikko, kartta };
    }
    const osa = (MAA_KATEGORIAT[iso] ?? [])[0] ?? null;
    if (!osa) return null;
    return maa?.lippu ? { ...osa, maaLippu: maa.lippu, maa: otsikko } : osa;
  }

  /**
   * Yhden lehtisivun kuvaosoitteet SAMOILLA LEVEYKSILLÄ kuin sivun
   * piirto pyytää. Leveys on osa osoitetta: 640 ja 900 ovat selaimelle
   * kaksi eri kuvaa, joten väärällä leveydellä puskuroitu sivu
   * latautuisi kokonaan uudestaan avattaessa.
   *
   * Leveydet: maan korkokartta 1000 (piirraMaaEtusivu), menovinkkien
   * avauskuva 1200 ja rivit 320 (piirraKategoria + piirraVinkkilista),
   * litteät kulttuurinostot 640 (piirraKulttuuriNostot), tavalliset
   * aihenostot ja niiden galleriat 900 (piirraKategoria +
   * kaariNostoGalleria). Tilastosivu piirtyy käyristä eikä hae kuvia.
   */
  lehdenSivunKuvat(kategoria) {
    if (!kategoria) return [];
    const kuvat = [];
    if (kategoria.maaLippu) kuvat.push(lippuUrl(kategoria.maaLippu, 96));
    if (kategoria.kartta) {
      kuvat.push(valokuvaUrl(kategoria.kartta.tiedosto, 1000));
      kuvat.push(...this.nostonKuvat(kategoria.kartta.nosto, 900));
      return kuvat;
    }
    if (kategoria.numerot) return kuvat;
    if (kategoria.lista) {
      const kohteet = (kategoria.lista ?? []).flatMap((rivi) => rivi.kohteet ?? []);
      const hero = kohteet.find((k) => k.tiedosto);
      if (hero) kuvat.push(valokuvaUrl(hero.tiedosto, 1200));
      for (const kohde of kohteet) {
        if (kohde.tiedosto) kuvat.push(valokuvaUrl(kohde.tiedosto, 320));
      }
      return kuvat;
    }
    const leveys = kategoria.litteä ? 640 : 900;
    for (const nosto of kategoria.nostot ?? []) kuvat.push(...this.nostonKuvat(nosto, leveys));
    return kuvat;
  }

  /**
   * Noston oma kuva ja sen selattava galleriasarja.
   *
   * Galleria kuuluu vain tavalliseen aihenostoon (kaariNostoGalleria,
   * 900); litteässä listassa gallerianuolia ei ole, joten sarjaa ei
   * siellä myöskään haeta.
   */
  nostonKuvat(nosto, leveys) {
    if (!nosto?.tiedosto) return [];
    const kuvat = [valokuvaUrl(nosto.tiedosto, leveys)];
    if (leveys === 900) {
      for (const teos of nosto.galleria ?? []) {
        if (teos.tiedosto) kuvat.push(valokuvaUrl(teos.tiedosto, 900));
      }
    }
    return kuvat;
  }

  /**
   * Lukijaäänen ensimmäinen pala valmiiksi molempiin lehtiin: kaksi
   * hakua per saapuminen, ei enempää (omistajan kiintiökuri). Loput
   * palat generoituvat ensimmäisen soidessa kuten ennenkin.
   */
  esipuskuroiLehtienLuennat() {
    /*
     * Kaupunkilehti: etusivu on jo DOMissa, joten teksti otetaan
     * TÄSMÄLLEEN samasta koonnista, josta luentakin sen ottaa — ei
     * datasta johdettuna. Sivu on tässä kohtaa piirretty mutta dialogi
     * vielä auki-avaamatta; kokoaLuettavatKohdat katsoo vain
     * hidden-tiloja, joten tulos on sama kuin painalluksen hetkellä.
     */
    esipuskuroiLuenta(this.arrivalDialog?.querySelector('.dialog-card'));
    // Maalehti: etusivua ei ole DOMissa ennen liitelinkin painallusta.
    const runko = this.maalehdenEtusivuRunko();
    if (runko) esipuskuroiLuenta(runko);
  }

  /**
   * Maalehden etusivun luettava sisältö IRRALLISEEN elementtiin.
   *
   * Sivua ei voi piirtää oikeille paikoilleen ennen aikojaan —
   * piirraMaaEtusivu siirtää #arrival-maa-osaston sivulle ja pyyhkii
   * aihesivun — joten tässä rakennetaan sama rakenne erilliseen
   * elementtiin, jota ei liitetä dokumenttiin. Lukija saa siitä
   * täsmälleen saman ensimmäisen kohdan kuin oikeasta sivusta:
   *
   * - karttamailla otsikko (ohitetaan), kartta (ohituslistalla) ja
   *   maaosaston KOPIO, jonka ensimmäinen luettava rivi on maan nimi
   * - muilla mailla ensimmäinen aihesivu samalla piirrolla
   *   (piirraKategoria ottaa kohde-elementin parametrina)
   */
  maalehdenEtusivuRunko(iso = this.lehtitila.tutkiMaaIso) {
    const sivu = this.maalehdenEkaSivu(iso);
    if (!sivu) return null;
    const runko = html('div', 'wiki-kategoria');
    if (!sivu.kartta) {
      /*
       * Kuvat pois esikatselukopiosta: lukija ohittaa IMG-elementit,
       * joten luettava teksti on sama, mutta irrallinen piirto ei
       * käynnistä omaa kuvaryöppyään esilatausjonon ohi. Sivun kuvat
       * kulkevat jonossa kuten muutkin (lehdenSivunKuvat).
       */
      piirraKategoria(this, kuvitukseton(sivu), runko);
      return runko;
    }
    if (!this.arrivalMaa) return null;
    runko.classList.add('maa-etusivu');
    runko.appendChild(html('h3', 'aihe-nimi', sivu.nimi));
    // Kartta itse on ohituslistalla (.maakartta-kotelo, .lahde), joten
    // siitä ei synny luettavaa — vain maaosastosta.
    const maa = this.arrivalMaa.cloneNode(true);
    // Karttamaassa osasto on kaupunkilehden etusivulla piilotettuna;
    // maalehdessä se on näkyvissä, ja lukija ohittaa piilotetun.
    maa.hidden = false;
    runko.appendChild(maa);
    return runko;
  }

  /**
   * Kaupungin elämää -lohko: nostot (kuva, teksti tai linkki lähteineen)
   * ja niiden perässä tutustu ja vastaa -kysymys. Oikeasta vastauksesta
   * pieni palkkio kerran per kaupunki — väärästä ei rangaista, mutta
   * uutta yritystä ei saa.
   */
  /*
   * Kulttuurinostot annettuun kohteeseen.
   *
   * Erotettu omaksi metodikseen, koska nostoja piirretään nyt kahdesta
   * paikasta: Tutki-ikkunan liuskoilta ja (siirtymän ajan) muualta.
   * Kaksi kopiota samasta piirrosta ajautuisi erilleen ensimmäisellä
   * muutoksella — ja juuri musiikkilinkit ja ääninäytteet ovat se osa,
   * jota muutetaan useimmin.
   */
  piirraKulttuuriNostot(lista, nostot, sivuAvain = null) {
    lista.textContent = '';
    // Nostot tulevat parametrina. Tässä luki aiemmin `tiedot.nostot`,
    // joka jäi metodia irrotettaessa osoittamaan kutsuvan funktion
    // muuttujaan: metodin omassa näkyvyysalueessa sellaista ei ole,
    // joten jokainen kutsu heitti ReferenceErrorin ja Tutki-ikkunan
    // liuska jäi tyhjäksi.
    for (const nosto of nostot ?? []) {
      const lohko = html('div', 'kulttuuri-nosto');
      // Otsikko ja mahdollinen ääninäyte samalla rivillä: selkeä nappi
      // kaiutinkuvakkeella erottuu tekstilinkeistä (omistajan toive).
      const otsikkoRivi = html('div', 'kulttuuri-otsikkorivi');
      otsikkoRivi.appendChild(html('p', 'kulttuuri-otsikko', nosto.otsikko));
      // Ääninäyte, Apple Music ja ilmainen musiikkinäyte — yhteinen
      // toteutus kategorianostojen kanssa (lisaaNostonNapit).
      this.lisaaNostonNapit(otsikkoRivi, nosto);
      /*
       * VÄLIOTSIKON REAKTIONAPPI (js/reaktiot.js) rivin päähän, sama
       * kuin kategorianostoilla (js/maalehti.js). Sivuavain tulee
       * kutsujalta: Tutki-ikkunan liuska tietää, mikä sivu on auki,
       * eikä sitä voi päätellä täältä ilman lehtitilan kaivamista.
       */
      piirraOtsikonReaktio(otsikkoRivi, sivuAvain, nosto.otsikko);
      lohko.appendChild(otsikkoRivi);
      if (nosto.tyyppi === 'kuva' && nosto.tiedosto) {
        const kuva = document.createElement('img');
        /*
         * EI loading="lazy". Kuva säilyttää mittasuhteensa (width: auto),
         * jolloin sen laatikko on ennen latausta nollan kokoinen — eikä
         * WebKit lataa nollan kokoista laiskaa kuvaa koskaan. iPhonella
         * nostot jäivät kokonaan ilman kuvaa. Nämä kuvat esiladataan jo
         * saapuessa, joten laiskuus ei säästänyt mitään.
         */
        // Napautus avaa kuvan isompana (omistajan toive).
        kuva.classList.add('kulttuuri-kuva-nappi');
        this.varustaNostonKuva(kuva, nosto, 640);
        lohko.appendChild(kuva);
      }
      lohko.appendChild(html('p', 'arrival-intro', nosto.teksti));
      if (nosto.wiki) {
        const nappi = html('button', 'wiki-btn', 'Lue lisää aiheesta');
        nappi.type = 'button';
        nappi.addEventListener('click', () => this.openWikiArticle(nosto.wiki, nosto.otsikko));
        lohko.appendChild(nappi);
      }
      this.lisaaNostonLinkki(lohko, nosto);
      const lahteet = [lahdemerkinta(nosto.lahde), nosto.aaniLahde]
        .filter(Boolean).join(' · ');
      if (lahteet) {
        lohko.appendChild(taytaLahderivi(html('p', 'kulttuuri-lahde'), lahteet, nosto));
      }
      lista.appendChild(lohko);
    }

  }

  naytaKulttuuri(city) {
    const tiedot = (KULTTUURIT[this.game.pack.id] ?? {})[city.id] ?? null;
    this.arrivalKulttuuri.hidden = !tiedot;
    this.arrivalKulttuuri.open = false;
    // Lehden etusivu näyttää visan; naytaTutkiSivu tarvitsee tiedon
    // siitä, onko sitä ylipäätään olemassa.
    this.lehtitila.kulttuuriSaatavilla = Boolean(tiedot);
    if (!tiedot) return;
    /*
     * Nostot EIVÄT ole enää saapumiskortissa vaan Tutki-ikkunassa
     * (omistajan toive: "nyt kun tutki ikkunaan tulee lisää, sinne
     * voisi lisätä myös nostoja enemmän").
     *
     * Saapumiskortti on saapumisen hetki: lyhyt, ja se tarjoaa
     * valinnan. Tutki-ikkuna on se, jonka pelaaja on itse valinnut
     * avata, ja syventävä sisältö kuuluu sinne.
     *
     * Kulttuurivisa jää tänne, koska se on pelitoiminto eikä
     * luettavaa: siitä saa puntia, ja se kuuluu samaan hetkeen kuin
     * "Etsi kätkö".
     */
    this.arrivalKulttuuriLista.textContent = '';

    const { kysymys } = tiedot;
    this.arrivalKulttuuriVisa.hidden = !kysymys;
    this.arrivalKulttuuriTulos.hidden = true;
    this.arrivalKulttuuriTulos.className = 'arrival-intro';
    this.arrivalKulttuuriVaihtoehdot.textContent = '';
    if (!kysymys) return;
    const vastattu = this.game.kulttuuriVastatut?.has(`${this.game.pack.id}:${city.id}`);
    this.arrivalKulttuuriKysymys.textContent = vastattu
      ? 'Kulttuurivisaan on jo vastattu tässä kaupungissa.'
      : `Tutustuitko? ${kysymys.q}`;
    // Visa näkyy heti ilman avausnappia (omistajan toive 5.8.2026:
    // "saisi näkyä heti ilman klikkausta").
    this.arrivalKulttuuriKysymys.hidden = false;
    this.arrivalKulttuuriVaihtoehdot.hidden = vastattu;
    if (vastattu) return;
    kysymys.options.forEach((vaihtoehto, i) => {
      const nappi = html('button', '', vaihtoehto);
      nappi.type = 'button';
      nappi.addEventListener('click', () => {
        const oikein = i === kysymys.correct;
        const vastaus = this.game.actionKulttuuri(city.id, oikein, KULTTUURI_PALKKIO);
        this.arrivalKulttuuriVaihtoehdot.textContent = '';
        this.arrivalKulttuuriKysymys.textContent = kysymys.q;
        this.arrivalKulttuuriTulos.hidden = false;
        // Hiljaista polkua ei ole: myös jo vastattu kysymys saa näkyvän
        // vastauksen (omistajan havainto — palaute ei saa jäädä arvailuksi).
        if (!vastaus.ok) {
          this.arrivalKulttuuriTulos.className = 'kulttuuri-tulos';
          this.arrivalKulttuuriTulos.textContent = 'Kysymykseen on jo vastattu tässä kaupungissa.';
          return;
        }
        this.arrivalKulttuuriTulos.className = oikein
          ? 'kulttuuri-tulos oikein-tulos'
          : 'kulttuuri-tulos vaarin-tulos';
        this.arrivalKulttuuriTulos.textContent = (oikein
          ? `Oikein! +${KULTTUURI_PALKKIO} puntaa. `
          : `Oikea vastaus: ${kysymys.options[kysymys.correct]}. `) + (kysymys.fact ?? '');
        // Palaute vieritetään näkyviin — kysymys elää dialogin alalaidassa.
        this.arrivalKulttuuriTulos.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        sfx.play(oikein ? 'correct' : 'wrong');
        natiiviVastaus(oikein);
        // Palkkiosta myös toast kortin ulkopuolelle, jotta hyvitys näkyy
        // varmasti vaikka katse olisi muualla.
        if (oikein) {
          const box = this.buildToast({
            kind: 'stamp',
            icon: 'kukkaro',
            text: `+${KULTTUURI_PALKKIO} puntaa`,
            sub: 'Tunsit paikallista kulttuuria',
          });
          setTimeout(() => this.removeToast(box), TOAST_MS.default);
        }
        // Koko render() sulkisi Tutki-napista avatun kortin (kortti pysyy
        // auki vain offer-vaiheessa), jolloin palaute ei ehtisi näkyä.
        // Riittää tallentaa peli ja päivittää rahapilleri.
        this.onChange?.(this.game);
        this.renderTurnPill();
      });
      this.arrivalKulttuuriVaihtoehdot.appendChild(nappi);
    });
  }

  /**
   * Nostokuvan lataus ja napautus yhdessä paikassa (litteät nostot ja
   * aihenostot).
   *
   * KUVA EI KOSKAAN POISTU LATAUSVIRHEESTÄ. Ennen molemmat piirrot
   * antoivat `asetaKuvalle` varareitin `() => kuva.remove()`, jolloin
   * kuva katosi sivulta pysyvästi heti kun sekä peili että Commons
   * pettivät. Ja kun peilin katkaisija on lauennut (kolme virhettä
   * samassa istunnossa, tila sessionStoragessa), `valokuvaUrl` ja
   * `valokuvaVara` palauttavat SAMAN Commons-osoitteen — silloin
   * `asetaKuva` ei enää pidä sitä varareittinä ja ensimmäinen virhe
   * riitti poistoon. Luvusta katosivat kaikki kuvat kerralla, eikä
   * sivulla näkynyt rikkinäistä kuvaa eikä aukkoa, joka kertoisi syyn.
   *
   * Nyt osoitteita kokeillaan vuorotellen kolme kertaa pienellä
   * odotuksella, ja vasta sen jälkeen kuva jää piiloon — se ei poistu,
   * joten uusi yritys onnistuu heti kun yhteys palaa.
   *
   * EI myöskään `fetchPriority = 'low'`: kuva on luvun sisältöä eikä
   * koriste, eikä sen lataus saa jäädä muiden pyyntöjen jalkoihin.
   */
  varustaNostonKuva(kuva, nosto, leveys) {
    kuva.decoding = 'async';
    kuva.alt = nosto.selite ?? nosto.otsikko;
    /*
     * Selaimen oma kuvanraahaus keskeyttää osoitintapahtumat
     * (pointercancel), ja sivunvaihtopyyhkäisy kuoli heti kun se alkoi
     * kuvan päältä — juuri siitä mistä se useimmiten alkaa.
     */
    kuva.draggable = false;
    /*
     * ÄMPÄRIKUVA (omistajan koe 22.8.2026): pelin oma generoitu
     * kuvitus asuu peiliämpärissä eikä Commonsissa, joten sillä on
     * `ampari`-polku tiedostonimen sijaan. Varareittiä ei ole —
     * ämpäri on ainoa lähde, kuten julisteillakin.
     */
    /*
     * REPON OMA TIEDOSTO (`osoite`) on valmis polku, jolla ei ole
     * thumb-putkea eikä varareittiä — sama sääntö kuin fokuskohteiden
     * kuvilla (js/fokuskohteet.js asetaKohdeKuva). Matkakirjan ihmeen
     * havainnekuvat (assets/kartat/ihmeet/) tulevat tätä tietä myös
     * nähtävyysjuttuun.
     */
    const osoitteet = nosto.osoite
      ? [nosto.osoite]
      : (nosto.ampari
        ? [julisteUrl(nosto.ampari)]
        : [...new Set([
          valokuvaUrl(nosto.tiedosto, leveys), valokuvaVara(nosto.tiedosto, leveys),
        ])].filter(Boolean));
    let yritys = 0;
    const YRITYKSIA = 3;
    const seuraava = () => {
      if (yritys >= YRITYKSIA) { kuva.hidden = true; return; }
      const url = osoitteet[yritys % osoitteet.length];
      yritys += 1;
      // Sama osoite uudelleen ei lähtisi liikkeelle pelkällä src-
      // asetuksella, joten se nollataan ensin.
      if (kuva.getAttribute('src') === url) kuva.removeAttribute('src');
      kuva.src = url;
    };
    kuva.addEventListener('error', () => {
      // Galleriateoksen virhe kuuluu asetaKuvan varareitille — tämä
      // kuuntelija hoitaa vain noston oman kuvan osoitteet, muuten se
      // palauttaisi selatun teoksen takaisin ensimmäiseen.
      if (!osoitteet.includes(kuva.getAttribute('src'))) return;
      if (onPeilista(kuva.currentSrc || kuva.src)) {
        peiliPetti(peilinLaji(kuva.currentSrc || kuva.src) ?? 'kuvat');
      }
      // Pieni odotus: heti uusittu pyyntö kaatuisi samaan syyhyn.
      setTimeout(seuraava, 700);
    });
    seuraava();
    // Suurennus vain tarkoituksellisesta napautuksesta, ei vierityksen
    // tai raahauksen päätteeksi (omistajan toive). Galleriassa avataan
    // kohdalla oleva teos ja koko sarja selattavana.
    this.napautuksesta(kuva, () => {
      const tila = kuva.galleriaTila;
      if (tila) {
        this.naytaKulttuuriKuva(tila.teokset[tila.kohdalla], {
          teokset: tila.teokset, kohdalla: tila.kohdalla,
        });
      } else {
        this.naytaKulttuuriKuva(nosto);
      }
    });
  }

  /**
   * Napautus, joka ei laukea vieritettäessä.
   *
   * Kuvat elävät vierivän arkin sisällä, ja kosketusnäytöllä sormi
   * liikkuu lähes aina hieman. Suurennus avataan vasta kun osoitin
   * pysyi paikallaan — muuten sivupyyhkäisy tai vierityksen pysäytys
   * avasi kuvan vahingossa.
   */
  napautuksesta(el, toiminto) {
    let alku = null;
    el.addEventListener('pointerdown', (e) => { alku = { x: e.clientX, y: e.clientY }; });
    el.addEventListener('pointercancel', () => { alku = null; });
    el.addEventListener('click', (e) => {
      const paikka = alku;
      alku = null;
      // Näppäimistön ja hiiren napsautuksissa pointerdownia ei
      // välttämättä ole — ne kelpaavat sellaisenaan.
      if (paikka && Math.hypot(e.clientX - paikka.x, e.clientY - paikka.y) > 10) return;
      toiminto();
    });
  }

  /**
   * Kulttuurinoston kuva isompana: valokuvavedos keskellä ruutua valkoisin
   * reunuksin. Katselin on saapumisikkunan sisällä, koska modaalin päälle
   * ei muuten pääse. Napautus sulkee.
   */
  /**
   * @param {object[]} [asetukset.teokset] koko sarja: suurennoksesta
   *   tulee selattava (nuolet ja laskuri kuvan päällä), ja selite ja
   *   lähderivi vaihtuvat teoksen mukana. Näin Canaletton galleriaa —
   *   ja lehden etusivun kuvia — voi katsoa läpi täydellä ruudulla
   *   (omistajan toive 5.8.2026).
   */
  naytaKulttuuriKuva(nosto, { teokset = null, kohdalla = 0 } = {}) {
    this.suljeKulttuuriKuva();
    const kortti = html('div', 'postikortti kulttuuri-suurennos');
    /*
     * Leveys pikseleinä MITATUSTA näkymästä, ei vw-yksiköistä
     * (omistajan oivallus 13.8.2026: sama jumiutuneen asettelu-
     * viewportin ilmiö kuin kapeassa lehdessä voi kutistaa myös
     * suurennoksen — CSS:n 96vw lukee jumittunutta viewporttia,
     * mittaaNakyma ristiintarkistaa visuaalisen ja saa oikean
     * leveyden). Sama vyö ja henkselit kuin arkilla (mitoitaArkki).
     */
    const nakyma = this.nakymanLeveys || this.mittaaNakyma();
    if (nakyma >= NAKYMAN_VAHIMMAISLEVEYS) {
      kortti.style.width = `${Math.min(Math.round(nakyma * 0.96), 1600)}px`;
    }
    // Kuva omaan koteloonsa, jotta nuolet ja laskuri asemoituvat
    // täsmälleen kuvan päälle myös kapean pystykuvan kohdalla.
    const kotelo = html('div', 'suurennos-kuvakotelo');
    const kuva = document.createElement('img');
    kuva.draggable = false;
    kotelo.appendChild(kuva);
    kortti.appendChild(kotelo);
    /*
     * Parin lauseen selite teoksesta kuvan alla (omistajan toive), ja
     * otsikko ja lähde sen JATKEENA samalla rivillä pienemmällä
     * (omistajan tilaus 23.8.2026).
     *
     * Molemmat ovat saman kappaleen sisällä eivätkä sisaruksia: 36 rem:n
     * lukupalsta (omistajan havainto 23.8.2026 julistesuurennoksesta) on
     * tämän kappaleen max-width, ja inline-laatikko ei ottaisi sitä
     * vastaan omanaan. Selite on oma span, koska nayta() kirjoittaa sen
     * joka kuvanvaihdossa — kappaleen textContent pyyhkisi lähteen.
     */
    const kuvateksti = html('p', 'kuvateksti');
    const kuvaselite = html('span', 'kuvateksti-selite');
    const kuvalahde = html('span', 'kuvalahde');
    kuvateksti.append(kuvaselite, kuvalahde);
    kortti.appendChild(kuvateksti);
    const lista = (teokset?.length ?? 0) > 1 ? teokset : null;
    let indeksi = Math.max(0, Math.min(kohdalla, (lista?.length ?? 1) - 1));
    let laskuri = null;
    // Matkakirjan ihmeen kulmanauha, kun näytössä oleva kuva kantaa sen.
    let nauha = null;
    /*
     * REAKTIORIVI (js/reaktiot.js) sille kuvalle, jolla on oma
     * tunniste — käytännössä Matkakirjan ihme, joka aukeaa
     * nähtävyysjutun "Koe ihme" -napista. Rivi seuraa kuvaa kuten
     * nauhakin: sarjaa selattaessa se vaihtuu tai katoaa.
     */
    let reaktiot = null;
    // Sarjan kaikki suurennokset latautuvat taustalla heti, jotta
    // selaus ei odota verkkoa (omistajan tilaus 14.8.2026).
    if (lista) {
      esilataaKuvat(lista.map((t) => (t.osoite
        ?? (t.ampari ? julisteUrl(t.ampari) : valokuvaSuurennos(t.tiedosto, 1600)))));
    }
    const nayta = () => {
      const teos = lista ? lista[indeksi] : nosto;
      /*
       * Iso versio Commonsista, EI paikallista palstakopiota
       * (ks. valokuvaSuurennos): suurennoksen pitää olla vähintään
       * yhtä iso kuin kuva lehden sivulla. Vara on paikallinen/peili-
       * reitti, jotta kuva näkyy myös yhteydettä.
       *
       * VALMIS OSOITE (`osoite`) ohittaa koko portaikon: pelin oma
       * painotuote — aikakausjuliste — ei ole Commonsissa eikä sillä
       * ole tiedostonimeä, jota valokuvaSuurennos osaisi kääntää
       * (js/packs/julisteet.js, js/media.js julisteUrl).
       */
      if (teos.osoite || teos.ampari) {
        asetaKuva(kuva, teos.osoite ?? julisteUrl(teos.ampari), null);
      } else asetaKuva(kuva, valokuvaSuurennos(teos.tiedosto, 1600), valokuvaUrl(teos.tiedosto, 1600));
      kuva.alt = teos.otsikko ?? teos.selite ?? '';
      kuvaselite.textContent = teos.selite ?? '';
      kuvalahde.textContent = [teos.otsikko, teos.lahde].filter(Boolean).join(' · ');
      kuvateksti.hidden = !kuvaselite.textContent && !kuvalahde.textContent;
      /*
       * "MATKAKIRJAN IHME" -NAUHA MYÖS TÄHÄN KATSELIMEEN (omistaja
       * 27.8.2026 ilta: *"täällä pitäisi olla myöskin se ihme
       * nähtävillä"*). Sama komponentti kuin kartan tietoruudussa ja
       * sen suurennoksessa (js/fokuskohteet.js piirraIhmenauha) — nauha
       * on kuvan ominaisuus (`nauha`-kenttä), joten se seuraa kuvaa myös
       * sarjaa selattaessa eikä jää edellisen kuvan päälle.
       */
      nauha?.remove();
      nauha = piirraIhmenauha(kotelo, teos.nauha);
      kotelo.classList.toggle('kuva-nauhalla', Boolean(nauha));
      reaktiot?.remove();
      reaktiot = piirraReaktiot(kortti, teos.reaktio, {
        otsikko: teos.reaktioOtsikko ?? teos.otsikko ?? '',
        luokka: 'reaktiot-suurennos',
      });
      if (laskuri) laskuri.textContent = `${indeksi + 1} / ${lista.length}`;
    };
    if (lista) {
      const nuoli = (luokka, merkki, nimi, suunta) => {
        const nappi = html('button', `arrival-kuva-nuoli ${luokka}`, merkki);
        nappi.type = 'button';
        nappi.setAttribute('aria-label', nimi);
        nappi.addEventListener('click', (e) => {
          e.stopPropagation();
          indeksi = (indeksi + suunta + lista.length) % lista.length;
          sfx.play('paper');
          nayta();
        });
        kotelo.appendChild(nappi);
      };
      nuoli('edellinen', '‹', 'Edellinen kuva', -1);
      nuoli('seuraava', '›', 'Seuraava kuva', 1);
      laskuri = html('span', 'arrival-kuva-laskuri');
      kotelo.appendChild(laskuri);
    }
    nayta();
    /*
     * Pyyhkäisy selaa sarjaa kuten lehden kuvakotelossa (omistajan
     * toive 10.8.2026). Veto ei saa sulkea katselinta: selain laukoo
     * clickin myös raahauksen päätteeksi, joten pyyhkäisyn ja
     * liikkuneen vedon jälkeinen click ohitetaan lipulla.
     */
    let veto = null;
    let ohitaSulku = false;
    // Lippu nollataan eleen ALUSSA: kosketusnäytöllä pyyhkäisy ei
    // tuota clickiä lainkaan, joten pelkkä click-puolen nollaus jätti
    // lipun päälle ja nielaisi pyyhkäisyä seuraavan sulkunapautuksen.
    kortti.addEventListener('pointerdown', (e) => { veto = { x: e.clientX, y: e.clientY }; ohitaSulku = false; });
    kortti.addEventListener('pointercancel', () => { veto = null; });
    kortti.addEventListener('pointerup', (e) => {
      const alku = veto;
      veto = null;
      if (!alku) return;
      const dx = e.clientX - alku.x;
      const dy = e.clientY - alku.y;
      if (lista && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        indeksi = (indeksi + (dx < 0 ? 1 : -1) + lista.length) % lista.length;
        sfx.play('paper');
        nayta();
        ohitaSulku = true;
      } else if (Math.hypot(dx, dy) > 10) {
        ohitaSulku = true;
      }
    });
    kortti.addEventListener('click', (e) => {
      if (ohitaSulku) { ohitaSulku = false; return; }
      // Reaktiorivi on kortin oma toiminto: peukku ei sulje katselinta,
      // eikä virhelomakkeen kenttään pääsisi muuten kirjoittamaan.
      if (e.target?.closest?.('.reaktiorivi')) return;
      /*
       * Sarjassa napautus KUVAAN siirtyy seuraavaan (omistaja
       * 13.8.2026: "kuva sulkeutui myös sitä painettaessa vaikka
       * pitäisi vaihtaa seuraavaan kuvaan") — sama ele kuin
       * päiväkirjan kuvapinossa. Kuvan ulkopuolinen napautus sulkee
       * kuten ennenkin, samoin yhden kuvan katselimessa napautus
       * mihin tahansa.
       */
      if (lista && e.composedPath?.().includes(kotelo)) {
        indeksi = (indeksi + 1) % lista.length;
        sfx.play('paper');
        nayta();
        return;
      }
      this.suljeKulttuuriKuva();
    });
    this.rekisteroiSuurennosNappaimet(lista ? (suunta) => {
      indeksi = (indeksi + suunta + lista.length) % lista.length;
      sfx.play('paper');
      nayta();
    } : null);
    this.suurennosIsanta().appendChild(kortti);
    this.lehtitila.kulttuuriKuvaEl = kortti;
  }

  /**
   * PÄÄLLIMMÄINEN avoin dialogi suurennospopupien isännäksi. Modaali
   * (showModal) elää selaimen top layer -kerroksessa, joka peittää
   * kaiken ulkopuolisen z-indexistä riippumatta — kun kuvaa
   * napautettiin nähtävyysikkunassa, arrivalDialogiin liitetty
   * suurennos jäi ikkunan TAAKSE (omistajan löytö 8.8.2026).
   * Saman dialogin lapsena suurennos on samassa kerroksessa ja
   * z-index 70 nostaa sen kortin ylle; position: fixed kattaa yhä
   * koko ruudun, koska dialogilla ei ole transformia. Sama sääntö
   * koskee kaikkia postikortteja ja niiden huntua — vuosisääkortti
   * aukeaa nyt myös Matkailijan oppaasta eli nähtävyysikkunasta.
   */
  suurennosIsanta() {
    const nahtavyys = document.getElementById('nahtavyys-dialog');
    if (nahtavyys?.open) return nahtavyys;
    /*
     * Matkalaukku on samasta syystä listalla kuin nähtävyysikkuna:
     * julistekokoelman pikkukuvasta avautuva suurennos jäisi laukun
     * TAAKSE, koska laukku on modaali ja elää selaimen ylimmässä
     * kerroksessa (21.8.2026, julistepalkinnon pilotti). Laukku on
     * ennen saapumisikkunaa, koska se avataan aina päällimmäiseksi.
     */
    if (this.passportDialog?.open) return this.passportDialog;
    return this.arrivalDialog;
  }

  /**
   * Yhteinen näppäinsopimus kaikille suurennospopupeille (kuva, sää,
   * uutinen): Esc sulkee popupin ja nuolet selaavat, jos selattavaa
   * on — muuten nuolet vain nielaistaan, etteivät ne käännä lehteä
   * popupin takana. Kuuntelija on documentissa kaappausvaiheessa,
   * jotta se voittaa alla olevan dialogin oman sivuselauksen JA
   * dialogin cancel-sulun: ennen tätä Esc uutispopupissa sulki koko
   * Tutki-ikkunan popupin sijaan. Puretaan suljeKulttuuriKuvassa.
   */
  rekisteroiSuurennosNappaimet(selaa = null) {
    const nappaimet = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (selaa) selaa(e.key === 'ArrowRight' ? 1 : -1);
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this.suljeKulttuuriKuva();
      }
    };
    document.addEventListener('keydown', nappaimet, { capture: true });
    this.lehtitila.kulttuuriKuvaNappaimet = nappaimet;
  }

  suljeKulttuuriKuva() {
    this.lehtitila.kulttuuriKuvaEl?.remove();
    this.lehtitila.kulttuuriKuvaEl = null;
    this.lehtitila.kulttuuriHuntuEl?.remove();
    this.lehtitila.kulttuuriHuntuEl = null;
    if (this.lehtitila.kulttuuriKuvaNappaimet) {
      document.removeEventListener('keydown', this.lehtitila.kulttuuriKuvaNappaimet, { capture: true });
      this.lehtitila.kulttuuriKuvaNappaimet = null;
    }
  }

  /*
   * Kevyt blurrihuntu popupin taakse (omistajan toive: ei tummennusta
   * mutta kevyt sumennus). Oma elementti kortin ALLA — kortin sisään
   * piirretty kerros sumentaisi kortin oman taustan. Napautus sulkee.
   */
  lisaaKevytHuntu() {
    const huntu = html('div', 'kevythuntu');
    huntu.addEventListener('click', () => this.suljeKulttuuriKuva());
    // Sama isäntä kuin kortilla — muuten huntu jäisi nähtävyys-
    // ikkunan taakse, kun kortti avataan sen sisältä.
    this.suurennosIsanta().appendChild(huntu);
    this.lehtitila.kulttuuriHuntuEl = huntu;
  }

  /**
   * Kuuntele näyte -napin vaihtokytkin: soitto alkaa pehmeällä nousulla ja
   * toinen painallus tai kortin sulkeminen pysäyttää. Näyte on taustaa
   * hiljaisempi luenta — ei täyttä voimaa.
   */
  kulttuuriAaniNapista(nosto, nappi) {
    if (this.lehtitila.kulttuuriAani) {
      this.pysaytaKulttuuriAani();
      return;
    }
    const asetus = jaaAlku(nosto.aani);
    const audio = new Audio(aaniOsoite(asetus.url));
    audio.preload = 'auto';
    audio.volume = Math.min(1, 0.55 * (asetus.voima ?? 1));
    if (asetus.alku) {
      audio.addEventListener('loadedmetadata', () => {
        try {
          audio.currentTime = asetus.alku;
        } catch {
          /* soi alusta */
        }
      }, { once: true });
    }
    // Vain tekstiosa vaihtuu — kaiutinkuvake säilyy napissa.
    const nimio = nappi.querySelector('span');
    // Napin oma teksti talteen: samaa soitinta käyttävät myös
    // "Kuuntele kieltä" ja "Kuuntele musiikkia", ja ilman tätä ne
    // muuttuivat pysäytettäessä "Kuuntele näyte" -napeiksi.
    const alkuperainen = nimio?.textContent ?? 'Kuuntele näyte';
    this.lehtitila.kulttuuriAani = { audio, nappi, nimi: alkuperainen };
    /*
     * Radionapissa lukee aseman nimi, ja se saa jäädä lukemaan sitä
     * myös soidessa: nimi on napin tunniste, ei kehotus. Muissa
     * napeissa teksti on kehotus ("Kuuntele näyte"), ja silloin sen
     * on vaihduttava. Merkki (kolmio/neliö) kertoo tilan molemmissa.
     */
    const merkki = nappi.querySelector('.merkki');
    if (merkki) merkki.outerHTML = MERKKI_SEIS;
    if (nimio && !merkki) nimio.textContent = 'Pysäytä näyte';
    nappi.classList.add('soi');
    // Kesto ja toistokohta näkyvät napissa näytteen soidessa
    // (omistajan toive) — muodossa 0:12 / 3:10.
    const aika = nappi.querySelector('.aika');
    const muoto = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
    const naytaAika = () => {
      if (!aika || !Number.isFinite(audio.duration)) return;
      aika.hidden = false;
      aika.textContent = `${muoto(audio.currentTime)} / ${muoto(audio.duration)}`;
    };
    audio.addEventListener('loadedmetadata', naytaAika);
    audio.addEventListener('timeupdate', naytaAika);
    // Paikan taustaääni väistyy näytteen ajaksi ja palaa pysäytettäessä.
    vaimennaTausta();
    const nollaa = () => {
      if (this.lehtitila.kulttuuriAani?.audio === audio) this.pysaytaKulttuuriAani();
    };
    // Peilin pettäessä sama äänite haetaan alkuperäisestä lähteestä
    // ennen kuin näyte luovuttaa (ks. js/media.js).
    let varareittiKokeiltu = false;
    let toinenAaniKokeiltu = false;
    const petti = () => {
      if (this.lehtitila.kulttuuriAani?.audio !== audio) return;
      if (!varareittiKokeiltu && onPeilista(audio.getAttribute('src'))) {
        varareittiKokeiltu = true;
        peiliPetti('aanet');
        audio.src = asetus.url;
        audio.load();
        audio.play().catch(petti);
        return;
      }
      /*
       * Kokonaan toinen ääni, ei saman äänen toinen osoite. "Kuuntele
       * kieltä" soittaa suoraa radiolähetystä, ja lähetysosoitteet
       * lakkaavat toimimasta ilman varoitusta — silloin soitetaan
       * kaupungissa nauhoitettu näyte sen sijaan että nappi jäisi
       * hiljaiseksi. Kokeillaan vain kerran, joten silmukkaa ei synny.
       */
      if (!toinenAaniKokeiltu && nosto.vara) {
        toinenAaniKokeiltu = true;
        varareittiKokeiltu = false;
        /*
         * Live-merkki sammuu tässä. Nyt soi kaupungissa nauhoitettu
         * näyte, ei suora lähetys, ja punainen piste väittäisi
         * muuta. Merkki on tieto eikä koriste, joten sen on
         * kadottava samalla hetkellä kuin sen kertoma asia.
         */
        nappi.querySelector('.live')?.remove();
        audio.src = aaniOsoite(jaaAlku(nosto.vara).url);
        audio.load();
        audio.play().catch(petti);
        return;
      }
      nollaa();
    };
    audio.addEventListener('ended', nollaa);
    audio.addEventListener('error', petti);
    audio.play().catch(petti);
  }

  pysaytaKulttuuriAani() {
    const soiva = this.lehtitila.kulttuuriAani;
    this.lehtitila.kulttuuriAani = null;
    if (!soiva) return;
    soiva.audio.pause();
    soiva.audio.removeAttribute('src');
    const merkki = soiva.nappi.querySelector('.merkki');
    if (merkki) merkki.outerHTML = MERKKI_SOITA;
    const nimio = soiva.nappi.querySelector('span');
    // Nimiö palautetaan vain jos se oli kehotus. Radionapissa lukee
    // aseman nimi, eikä se muuttunut soidessakaan.
    if (nimio && !merkki) nimio.textContent = soiva.nimi ?? 'Kuuntele näyte';
    const aika = soiva.nappi.querySelector('.aika');
    if (aika) {
      aika.hidden = true;
      aika.textContent = '';
    }
    soiva.nappi.classList.remove('soi');
    palautaTausta();
  }


  /**
   * Lehden minitehtävä: kehystetty tehtäväpalsta sivun lopussa kuin
   * sanomalehden ristikkonurkka. Kysymykseen osaa vastata luettuaan
   * saman sivun — ja oikeasta vastauksesta saa pienen rahapalkkion,
   * kerran per lehti (game.actionMinitehtava). Maan yhteinen aihesivu
   * voi palkita uudelleen saman maan toisessa kaupungissa.
   */
  /**
   * Ohut delegaattori (remontin M4): nähtävyysdialogi taittaa
   * opasartikkelin tämän kautta, jotta js/nahtavyydet.js ja
   * js/opas.js eivät tuo toisiaan ristiin (tuontisykli rikkoisi
   * niputuksen järjestyssäännön).
   */
  taitaOpas(sisalto, kohde, linkit) {
    return taitaOpas(this, sisalto, kohde, linkit);
  }

  /*
   * Ohuet delegaattorit (remontin M5a): pollo.js, lukija.js,
   * nahtavyydet.js ja main.js kutsuvat lehden sivukoneistoa
   * ui-olion kautta — suora tuonti js/lehti.js:stä tekisi
   * tuontisyklin (lehti tuo lukijan, ja pöllö/lukija saavat ui:n).
   */
  /*
   * Ohut delegaattori: kevyen kulun lehtitehtävä (js/fokustehtavat.js)
   * sytyttää vihreän pisteen heti oikeasta vastauksesta, ja se elää
   * kartalla eikä lehdessä. Suora tuonti fokustehtavat.js:stä tekisi
   * tuontisyklin (fokuspiste tuo fokusvirran, fokusvirta fokustehtävät),
   * joten kutsu kulkee ui-olion kautta kuten lehden muutkin.
   */
  paivitaFokuspiste() { return paivitaFokuspiste(this); }

  naytaTutkiSivu(indeksi, asetukset) { return naytaTutkiSivu(this, indeksi, asetukset); }

  avaaMaalehti(iso, asetukset) { return avaaMaalehti(this, iso, asetukset); }

  avaaSisallysvalikko(asetukset) { return avaaSisallysvalikko(this, asetukset); }

  sijoitaLehtiKaiutin(nappi) { return sijoitaLehtiKaiutin(this, nappi); }

  varustaLukija(dialogi, haeJuuri, asetukset) { return varustaLukija(this, dialogi, haeJuuri, asetukset); }

  naytaVuosiSaa() { return naytaVuosiSaa(this); }
  vaihdaTutkiSivu(suunta) { return vaihdaTutkiSivu(this, suunta); }
  tahdistaMaatiedot(halutaan) { return tahdistaMaatiedot(this, halutaan); }
  tutkiSivuja() { return tutkiSivuja(this); }
  piirraMaatiedotMaat() { return piirraMaatiedotMaat(this); }
  nahtavyydenKaruselli(kuvat) { return nahtavyydenKaruselli(this, kuvat); }

  /*
   * Ohut delegaattori: pöllön nähtävyyslinkki avaa jutun ui:n kautta.
   * Kutsu jäi M4:ssä huomaamatta ilman delegaattoria (?.-kutsu vaikeni),
   * ja savukevartija toi sen esiin 17.8.2026.
   */
  avaaNahtavyys(kohde, numero, asetukset) { return avaaNahtavyys(this, kohde, numero, asetukset); }

  /* ---------- MATKAKIRJAN IHME NÄHTÄVYYSIKKUNAAN ----------
   *
   * Kolme ohutta delegaattoria, koska js/nahtavyydet.js on yhden
   * tiedoston niputuksessa ENNEN js/fokuskohteet.js:ää eikä voi tuoda
   * sitä suoraan (tools/tarkista-niputus.mjs sääntö 3: riippuvuus ennen
   * tuojaansa). Sama kaava kuin nähtävyysjutun muillakin lainoilla
   * (varustaNostonKuva, naytaKulttuuriKuva) — ui on niiden silta.
   */

  /** Nimetyn paikan Matkakirjan ihme kuvaoliona, tai null. */
  matkakirjanIhme(nimi) { return matkakirjanIhme(nimi); }

  /** "Koe ihme" -nappi tähtineen; napautus avaa ihmekuvan suurennoksen. */
  piirraIhmenappi(sisalto, ihme) {
    return piirraIhmenappi(sisalto, ihme.nappi,
      () => this.naytaKulttuuriKuva(ihme));
  }

  /** Ihmenauha kuvan vasempaan yläkulmaan; isäntä on kuvan kokoinen. */
  piirraIhmenauha(isanta, teksti) { return piirraIhmenauha(isanta, teksti); }

  avaaRaamattuLehti() { return avaaRaamattuLehti(this); }

  avaaTilanneLehti() { return avaaTilanneLehti(this); }

  avaaPoiminnatLehti() { return avaaPoiminnatLehti(this); }

  avaaTilastoLehti() { return avaaTilastoLehti(this); }

  avaaGrafiikkaLehti() { return avaaGrafiikkaLehti(this); }

  avaaLukijoiltaLehti() { return avaaLukijoiltaLehti(this); }

  piirraMinitehtava(kohde, kategoria) {
    const { tehtava } = kategoria;
    const cityId = this.lehtitila.arrivalShownFor;
    /*
     * Maalehden aihe erotellaan maatunnuksella. Ilman sitä avain on
     * pakka:kaupunki:aihe, ja koska maan lehden saa auki kartalta
     * mistä tahansa (v390), Prahassa seisova pelaaja olisi voinut
     * ratkaista Tšekin Historian ja sitten Saksan Historia-sivu olisi
     * ollut "jo ratkaistu" — eri maa, sama aihetunnus, sama kaupunki.
     * Kaupunki jää avaimeen, joten maan aihesivu palkitsee yhä
     * uudestaan saman maan toisessa kaupungissa.
     */
    const aiheAvain = this.lehtitila.tutkiTila === 'maa' && this.lehtitila.tutkiMaaLehti
      ? `${this.lehtitila.tutkiMaaLehti}:${kategoria.id}`
      : kategoria.id;
    /*
     * PALKINTOJULISTE (omistajan tilaus 21.8.2026): kaupungeilla, joilla
     * on aikakausjuliste, tehtävälaatikon kyljessä on siitä pikkuvedos.
     * Juliste on KAUPUNKILEHDEN palkinto, joten maan yhteinen aihesivu
     * ei sitä näytä — muuten saman maan jokainen kaupunki tarjoaisi
     * samaa julistetta uudelleen, ja palkinto kutistuisi koristeeksi.
     */
    const juliste = this.lehtitila.tutkiTila === 'maa' ? null : kaupunginJuliste(cityId);
    const laatikko = html('div', `minitehtava${juliste ? ' minitehtava-palkinnollinen' : ''}`);
    laatikko.appendChild(html('p', 'minitehtava-otsikko', 'Lehden minitehtävä'));
    const avain = `${this.game.pack.id}:${cityId}:${aiheAvain}`;
    if (this.game.minitehtavatVastatut?.has(avain)) {
      /*
       * TAKAUTUVA MYÖNTÖ: tehtävä on ratkaistu ennen kuin julisteita
       * oli olemassa, joten palkinto annetaan nyt. Rahaa ei tule
       * uudelleen (actionMinitehtava on jo kirjannut avaimen), mutta
       * vanha pelaaja ei jää ilman julistetta.
       *
       * VÄÄRIN VASTANNUT EI SAA JULISTETTA takaoven kautta: myöntö
       * katsoo oikein vastattujen joukkoa (game.js minitehtavatOikein),
       * ja vanhassa tallennuksessa se on koko vastattujen joukko.
       * Voitettu juliste kelpaa myös sellaisenaan — sama kaupunki
       * toisella laudalla on sama juliste.
       */
      const voitettu = Boolean(juliste)
        && (this.game.minitehtavatOikein?.has(avain) || this.game.julisteet?.has(cityId));
      if (juliste) {
        const myonto = voitettu ? this.game.myonnaJuliste(cityId) : { uusi: false };
        this.piirraJulistepalkinto(laatikko, cityId, juliste, voitettu);
        if (myonto.uusi) this.onChange?.(this.game);
      }
      /*
       * "Tämän SIVUN", ei "tämän lehden": palkkioavain on
       * pakka:kaupunki:aihe (game.js actionMinitehtava), eli jokainen
       * aihesivu on oma tehtävänsä. Kun kaupunkilehden molemmat
       * aihesivut saivat tehtävän (omistajan toive 8.8.2026), vanha
       * teksti alkoi valehdella: se väitti koko lehden ratkaistuksi,
       * vaikka toisella sivulla oli tehtävä yhä auki.
       */
      laatikko.appendChild(html('p', 'minitehtava-kysymys',
        'Tämän sivun minitehtävä on jo ratkaistu.'));
      kohde.appendChild(laatikko);
      return;
    }
    // Palkinto ensin, jotta teksti kiertää sen (float oikealle, css).
    const palkinto = juliste
      ? this.piirraJulistepalkinto(laatikko, cityId, juliste, this.game.julisteet?.has(cityId))
      : null;
    laatikko.appendChild(html('p', 'minitehtava-kysymys', tehtava.kysymys));
    const vaihtoehdot = html('div', 'kulttuuri-vaihtoehdot');
    const tulos = html('p', 'kulttuuri-tulos');
    tulos.hidden = true;
    tehtava.vaihtoehdot.forEach((teksti, i) => {
      const nappi = html('button', '', teksti);
      nappi.type = 'button';
      nappi.addEventListener('click', () => {
        const oikein = i === tehtava.oikea;
        const vastaus = this.game.actionMinitehtava(
          cityId, aiheAvain, oikein, MINITEHTAVA_PALKKIO,
        );
        if (!vastaus.ok) return;
        vaihtoehdot.replaceChildren();
        tulos.hidden = false;
        tulos.className = oikein
          ? 'kulttuuri-tulos oikein-tulos'
          : 'kulttuuri-tulos vaarin-tulos';
        tulos.textContent = (oikein
          ? `Oikein! +${MINITEHTAVA_PALKKIO} puntaa. `
          : `Oikea vastaus: ${tehtava.vaihtoehdot[tehtava.oikea]}. `)
          + (tehtava.fakta ?? '');
        sfx.play(oikein ? 'correct' : 'wrong');
        natiiviVastaus(oikein);
        // Palkkiosta toast myös kortin ulkopuolelle — sama syy kuin
        // kulttuurivisassa: hyvitys ei saa jäädä huomaamatta.
        if (oikein) {
          const box = this.buildToast({
            kind: 'stamp',
            icon: 'kukkaro',
            text: `+${MINITEHTAVA_PALKKIO} puntaa`,
            sub: 'Lehden minitehtävä ratkesi',
          });
          setTimeout(() => this.removeToast(box), TOAST_MS.default);
        }
        /*
         * JULISTE LUNASTETAAN NAPISTA (omistajan tilaus 22.8.2026:
         * "Kun vastaus on oikein, niin pitäisi olla nappi 'lunasta
         * juliste', koska muuten oikean vastauksen tekstiä ei ehdi
         * lukea"). Kumoaa 21.8.2026 automaattiavauksen: 700 ms:n
         * viivekään ei riittänyt, koska suurennos peitti faktarivin
         * kesken lukemisen. Juliste myönnetään kokoelmaan silti heti
         * — nappi avaa vain katselun, eikä lunastus jää saamatta
         * vaikka pelaaja sulkisi lehden nappia painamatta.
         */
        if (oikein && juliste) {
          this.game.myonnaJuliste(cityId);
          palkinto?.merkitseVoitetuksi();
          this.elavoitaLaukku();
          const lunasta = html('button', 'minitehtava-lunastus', 'Lunasta juliste');
          lunasta.type = 'button';
          lunasta.addEventListener('click', () => this.naytaJuliste(cityId));
          laatikko.appendChild(lunasta);
        }
        // Koko render() sulkisi Tutki-kortin — riittää tallentaa ja
        // päivittää rahapilleri (sama syy kuin kulttuurivisassa).
        this.onChange?.(this.game);
        this.renderTurnPill();
      });
      vaihtoehdot.appendChild(nappi);
    });
    laatikko.appendChild(vaihtoehdot);
    laatikko.appendChild(tulos);
    kohde.appendChild(laatikko);
  }

  /**
   * PIKKUVEDOS JULISTEESTA tehtävälaatikon kyljessä.
   *
   * Ansaitsematon juliste näkyy jo ennen vastausta, mutta himmeänä ja
   * ilman suurennosta: pelaajan pitää nähdä mistä pelataan, muttei
   * saada palkintoa katsomalla. Voitettu vedos kirkastuu, saa
   * "Voitettu"-merkinnän ja aukeaa napautuksesta täydeksi julisteeksi.
   *
   * Tiedosto asuu vain peiliämpärissä (js/packs/julisteet.js): jos sitä
   * ei ole vielä viety, koko kuvapaikka poistuu itsestään eikä laatikkoon
   * jää rikkinäistä kuvaa. Silloin tehtävä toimii täsmälleen kuten
   * ennenkin — juuri niin kuin julisteettomassa kaupungissa.
   *
   * @returns {{merkitseVoitetuksi: () => void}} kahva, jolla oikea
   *   vastaus vaihtaa vedoksen voitetuksi ilman koko sivun uudelleen
   *   piirtoa (render() sulkisi Tutki-kortin).
   */
  piirraJulistepalkinto(laatikko, cityId, juliste, voitettu = false) {
    const kotelo = html('figure', 'juliste-palkinto');
    const kuva = document.createElement('img');
    kuva.decoding = 'async';
    kuva.draggable = false;
    asetaKuva(kuva, julisteUrl(juliste.tiedosto), null, () => kotelo.remove());
    kotelo.appendChild(kuva);
    const merkki = html('figcaption', 'juliste-merkki');
    kotelo.appendChild(merkki);
    const avaa = () => this.naytaJuliste(cityId);
    const asetaTila = (onVoitettu) => {
      kotelo.classList.toggle('voitettu', onVoitettu);
      merkki.textContent = onVoitettu ? 'Voitettu' : 'Palkinto';
      kuva.alt = onVoitettu
        ? `${juliste.otsikko} — voitettu juliste`
        : 'Palkintojuliste, vielä voittamatta';
      if (onVoitettu) {
        kotelo.tabIndex = 0;
        kotelo.setAttribute('role', 'button');
        kotelo.setAttribute('aria-label', `${juliste.otsikko} — katso juliste isona`);
      } else {
        kotelo.removeAttribute('tabindex');
        kotelo.removeAttribute('role');
        kotelo.removeAttribute('aria-label');
      }
    };
    asetaTila(Boolean(voitettu));
    // Kuuntelijat kiinnitetään kerran ja ne kysyvät tilan vasta
    // laukeamishetkellä: sama kotelo vaihtaa tilaa kesken elinkaarensa.
    this.napautuksesta(kotelo, () => {
      if (kotelo.classList.contains('voitettu')) avaa();
    });
    kotelo.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      if (!kotelo.classList.contains('voitettu')) return;
      e.preventDefault();
      avaa();
    });
    laatikko.appendChild(kotelo);
    return { merkitseVoitetuksi: () => asetaTila(true) };
  }

  /**
   * Juliste koko ruudulle. Sama katselin kuin kulttuurikuvilla, joten
   * sulku rastista, taustanapautuksesta ja Escistä tulee sieltä —
   * osoite vain annetaan valmiina, koska julisteella ei ole Commons-
   * tiedostonimeä (js/packs/julisteet.js).
   */
  naytaJuliste(avain) {
    /*
     * AVAIN, EI KAUPUNKI (v1119, kohta 21). Tehtäväkohtainen juliste
     * kulkee omalla avaimellaan (js/fokustehtavat.js julisteAvain);
     * kaupungin tunnus on yhä kelvollinen avain, koska kaupungin oma
     * juliste asuu JULISTEET-taulussa sen tunnuksella.
     */
    const juliste = kaupunginJuliste(avain);
    if (!juliste) return;
    this.naytaKulttuuriKuva({
      otsikko: juliste.otsikko,
      selite: juliste.selite,
      lahde: JULISTE_LAHDE,
      osoite: julisteUrl(juliste.tiedosto),
    });
  }

  /**
   * Kääräisee noston kuvan galleriaksi: kuva saa ympärilleen kotelon,
   * jossa ovat samat selailunuolet ja laskuri kuin saapumiskuvassa.
   * Teoslista alkaa noston omasta kuvasta ja jatkuu galleria-kentän
   * teoksilla; selailu kiertää ympäri. Selite- ja lähderivit vaihtuvat
   * teoksen mukana, ja suurennos avaa aina kohdalla olevan teoksen
   * (kuva.galleriaKohde — ks. varustaNostonKuva).
   */
  kaariNostoGalleria(kuva, nosto, { selite = null, lahde = null } = {}) {
    const kotelo = html('div', 'arrival-kuvakotelo nosto-galleria');
    kuva.replaceWith(kotelo);
    kotelo.appendChild(kuva);
    const teokset = [
      {
        otsikko: nosto.otsikko,
        tiedosto: nosto.tiedosto,
        selite: nosto.selite,
        lahde: nosto.lahde,
        // Pro-tuottajan tekijäsivu kulkee teoskohtaisesti: sarjan
        // kuvat voivat olla eri tekijöiltä (js/tekijakortti.js).
        tekija: nosto.tekija,
        tekijaId: nosto.tekijaId,
      },
      ...nosto.galleria,
    ];
    /*
     * Sarjan kaikki kuvat latautuvat taustalla heti kun galleria on
     * sivulla (omistajan tarkennus 14.8.2026: ensimmäinen erä kattoi
     * vain avattavat katselimet, mutta lehden sivulla pyörivä
     * nostogalleria jäi lataamaan kuvat vasta nuolesta). Sama osoite
     * ja leveys kuin nayta():ssa, jotta välimuisti osuu.
     */
    esilataaKuvat(teokset.map((t) => valokuvaUrl(t.tiedosto, 900)));
    let kohdalla = 0;
    const laskuri = html('span', 'arrival-kuva-laskuri', `1 / ${teokset.length}`);
    // Suurennos avaa kohdalla olevan teoksen JA koko sarjan selattavana
    // (ks. varustaNostonKuva ja naytaKulttuuriKuva).
    kuva.galleriaTila = { teokset, kohdalla };
    const nayta = (suunta) => {
      kohdalla = (kohdalla + suunta + teokset.length) % teokset.length;
      const teos = teokset[kohdalla];
      asetaKuva(kuva, valokuvaUrl(teos.tiedosto, 900), valokuvaVara(teos.tiedosto, 900));
      kuva.alt = teos.selite ?? teos.otsikko ?? nosto.otsikko;
      kuva.galleriaTila = { teokset, kohdalla };
      if (selite) selite.textContent = teos.selite ?? '';
      if (lahde) taytaLahderivi(lahde, teos.lahde ?? nosto.lahde ?? '', teos);
      laskuri.textContent = `${kohdalla + 1} / ${teokset.length}`;
    };
    const nuoli = (luokka, merkki, nimi, suunta) => {
      const nappi = html('button', `arrival-kuva-nuoli ${luokka}`, merkki);
      nappi.type = 'button';
      nappi.setAttribute('aria-label', nimi);
      nappi.addEventListener('click', (e) => {
        e.stopPropagation();
        sfx.play('paper');
        nayta(suunta);
      });
      kotelo.appendChild(nappi);
    };
    nuoli('edellinen', '‹', 'Edellinen teos', -1);
    nuoli('seuraava', '›', 'Seuraava teos', 1);
    kotelo.appendChild(laskuri);
  }

  /*
   * Ääninäyte-, Apple Music- ja musiikkinäytenapit otsikkoriville.
   * Yksi toteutus molemmille nostomuodoille (litteä ja kategoria) —
   * kaksi kopiota ajautuisi erilleen ensimmäisellä muutoksella.
   */
  /*
   * Ulkoinen linkki noston loppuun (Menovinkit-sivut, omistajan
   * tilaus 8.8.2026: "parhaat menovinkit nettimatkaajalle").
   *
   * Tämä on eri asia kuin `wiki`: se avaa Wikipedian tiivistelmän
   * pelin sisällä, tämä vie museon omaan verkkokokoelmaan uuteen
   * välilehteen. Siksi oikea elementti on <a> eikä nappi — pelaaja
   * näkee osoitteen, voi avata sen keskipainikkeella ja tallentaa
   * kirjanmerkiksi. Ulkoasu on sama tekstilinkki (wiki-btn), jotta
   * sivu ei täyty erinäköisistä kutsuista.
   *
   * linkkiNimi on linkin näkyvä teksti: kohde kannattaa nimetä
   * ("National Gallery — Auringonkukat zoomattavana"), koska pelkkä
   * "Avaa sivusto" ei kerro minne ollaan menossa.
   */
  lisaaNostonLinkki(kohde, nosto) {
    if (!nosto.linkki) return;
    const linkki = html('a', 'wiki-btn nosto-linkki', nosto.linkkiNimi ?? 'Avaa sivusto');
    linkki.href = nosto.linkki;
    linkki.target = '_blank';
    linkki.rel = 'noopener noreferrer';
    kohde.appendChild(linkki);
  }

  lisaaNostonNapit(otsikkoRivi, nosto) {
    if (nosto.aani) {
      const nappi = html('button', 'kulttuuri-kuuntele');
      nappi.type = 'button';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">'
        + '<path d="M4.5 9.6v4.8h3.2l4.5 3.8V5.8L7.7 9.6Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<path d="M15.2 9.4a3.6 3.6 0 0 1 0 5.2M17.6 7.2a6.9 6.9 0 0 1 0 9.6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
        + '</svg><span>Kuuntele näyte</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.kulttuuriAaniNapista(nosto, nappi));
      otsikkoRivi.appendChild(nappi);
    }
    if (nosto.musiikki) {
      const linkki = html('a', 'kulttuuri-musiikkilinkki');
      linkki.href = nosto.musiikki;
      linkki.target = '_blank';
      linkki.rel = 'noopener';
      if (nosto.musiikkiNimi) linkki.title = nosto.musiikkiNimi;
      linkki.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg> Apple Music';
      otsikkoRivi.appendChild(linkki);
    }
    if (nosto.musiikkiNayte) {
      const nappi = html('button', 'kulttuuri-kuuntele kulttuuri-musiikkinayte');
      nappi.type = 'button';
      nappi.title = nosto.musiikkiNayteNimi ?? 'Vapaasti lisensoitu ääninäyte';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg>'
        + '<span>Kuuntele musiikkia</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.kulttuuriAaniNapista(
        { aani: nosto.musiikkiNayte, otsikko: nosto.otsikko }, nappi,
      ));
      otsikkoRivi.appendChild(nappi);
    }
    /*
     * Esikuuntelu (omistajan hyväksyntä 7.8.2026): uudempi musiikki —
     * ABBA, Dietrich, flamenco — ei ole vapaasti lisensoitua, joten se
     * soi Applen 30 sekunnin esikuunteluna. Vapaa näyte voittaa aina:
     * jos nostolla on musiikkiNayte, esikuuntelunappia ei näytetä.
     */
    /*
     * Soittonappi myös pelkälle Apple Music -linkille (omistajan
     * kysymys 10.8.2026: "saako linkin avaamaan ja toistamaan myös
     * itse kappaleen suoraan?"). Koko kappaleen toisto sivulla
     * vaatisi MusicKitin ja kehittäjäavaimen — sen sijaan Applen
     * 30 sekunnin esikatselu soi suoraan: kappale-id poimitaan
     * linkistä ja osoite haetaan avoimesta iTunes-rajapinnasta.
     * Linkki itse vie edelleen Apple Musiciin, jossa tilaaja saa
     * koko kappaleen.
     */
    if ((nosto.esikuuntelu || nosto.musiikki) && !nosto.musiikkiNayte) {
      const nappi = html('button', 'kulttuuri-kuuntele kulttuuri-musiikkinayte');
      nappi.type = 'button';
      nappi.title = 'Esikuuntelu Apple Musicista (30 s)';
      nappi.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">'
        + '<path d="M9 18.5V6.2l9-1.7v11.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>'
        + '<circle cx="6.8" cy="18.6" r="2.2" fill="currentColor"/>'
        + '<circle cx="15.8" cy="15.9" r="2.2" fill="currentColor"/></svg>'
        + '<span>Kuuntele näyte</span><span class="aika" hidden></span>';
      nappi.addEventListener('click', () => this.esikuunteluNapista(nosto, nappi));
      otsikkoRivi.appendChild(nappi);
    }
  }

  /**
   * Hakee Applen 30 sekunnin esikuuntelun ja soittaa sen kuten muutkin
   * musiikkinäytteet. iTunes Search API on avoin (ei avainta, ja
   * CORS-otsake sallii kutsun suoraan selaimesta — tarkistettu
   * 7.8.2026), mutta previewUrl-osoitteet eivät ole pysyviä, joten
   * paketteihin tallennetaan vain hakutermi (esikuuntelu-kenttä) ja
   * osoite haetaan lennossa. Termi → osoite muistetaan istunnon ajan.
   * Applen ehto palveluun linkittämisestä täyttyy viereisestä Apple
   * Music -linkistä, joka esikuuntelunostoilla on aina.
   */
  async esikuunteluNapista(nosto, nappi) {
    this.esikuuntelut ??= new Map();
    const avain = nosto.esikuuntelu ?? nosto.musiikki;
    let url = this.esikuuntelut.get(avain) ?? null;
    if (!url) {
      const teksti = nappi.querySelector('span');
      const alku = teksti.textContent;
      teksti.textContent = 'Haetaan…';
      nappi.disabled = true;
      try {
        /*
         * Ilman hakutermiä esikatselu johdetaan Apple Music
         * -linkistä: kappaleen id on ?i=-parametrissa (albumilinkit)
         * tai polun lopussa (song-linkit), ja lookup-rajapinta antaa
         * sille previewUrlin. Albumin id:llä entity=song poimii
         * albumin ensimmäisen kappaleen. Termihaku jää varapoluksi
         * nimellä, jos linkistä ei irtoa id:tä.
         */
        const haku = new URL('https://itunes.apple.com/search');
        if (!nosto.esikuuntelu && nosto.musiikki) {
          const id = nosto.musiikki.match(/[?&]i=(\d+)/)?.[1]
            ?? nosto.musiikki.match(/\/(?:song|album)\/[^/]+\/(?:id)?(\d+)/)?.[1];
          if (id) {
            haku.href = 'https://itunes.apple.com/lookup';
            haku.searchParams.set('id', id);
            haku.searchParams.set('entity', 'song');
            haku.searchParams.set('limit', '1');
          } else {
            haku.searchParams.set('term', nosto.musiikkiNimi ?? nosto.otsikko ?? '');
            haku.searchParams.set('entity', 'song');
            haku.searchParams.set('limit', '1');
          }
        } else {
          haku.searchParams.set('term', nosto.esikuuntelu);
          haku.searchParams.set('entity', 'song');
          haku.searchParams.set('limit', '1');
        }
        haku.searchParams.set('country', 'fi');
        const vastaus = await fetch(haku, { signal: AbortSignal.timeout(10000) });
        url = (await vastaus.json()).results?.find((r) => r.previewUrl)?.previewUrl ?? null;
      } catch {
        url = null;
      }
      nappi.disabled = false;
      teksti.textContent = alku;
      if (!url) {
        // Sama kohtelias linja kuin uutisissa: ilman verkkoa nappi
        // kertoo syyn hetken eikä jää jumiin.
        teksti.textContent = 'Ei yhteyttä';
        setTimeout(() => { teksti.textContent = alku; }, 2500);
        return;
      }
      this.esikuuntelut.set(avain, url);
    }
    this.kulttuuriAaniNapista({ aani: url, otsikko: nosto.otsikko }, nappi);
  }

  /**
   * Sama dialogi mille tahansa artikkelille — esimerkiksi havainnossa
   * mainitulle ilmiölle (Katso kuva), jolla ei ole omaa kaupunkia.
   */
  /**
   * @param {string} [asetukset.alkuteksti] näytetään "Haetaan…" tilalla,
   *   kunnes verkosta tulee vastaus. Maastonimillä se on paketin oma
   *   suomenkielinen selitys: ikkunassa lukee jotain heti, ja jos
   *   yhteyttä ei ole, se jää ainoaksi tekstiksi kohteliaan
   *   virheilmoituksen sijaan.
   * @param {Array} [asetukset.galleria] käsin kuratoidut kuvat
   *   ({ tiedosto, selite, lahde }). Kun lista on annettu, se KORVAA
   *   artikkelin oman kuvaston kokonaan — myös suurennoksessa.
   */
  async openWikiArticle(title, label = title, { alkuteksti = null, galleria = null, kappaleet = null } = {}) {
    this.wikiOpenFor = title;
    this.wikiTitle.textContent = label;
    this.wikiImage.hidden = true;
    this.wikiImage.removeAttribute('src');
    this.wikiKuvakotelo.hidden = true;
    this.wikiKuvat = [];
    this.wikiKuvaKohdalla = 0;
    // Edellisen artikkelin suurennusportaat eivät saa jäädä voimaan.
    this.wikiKuvaPortaat = [];
    /*
     * 1600 eikä 1200: Commonsin FilePath-osoitteessa ei ole
     * `NNNpx-` -merkintää, joten suurennusportaat ei osaa kasvattaa
     * sitä jälkikäteen (upsizeImage, js/wiki.js) — kuratoidun kuvan
     * koko on se, joka pyydetään tässä. Lehti on iPadilla noin 700
     * CSS-pikseliä eli tarkalla näytöllä 1400.
     */
    this.wikiGalleria = galleria?.length ? kuratoituGalleria(galleria, 1600) : null;
    this.paivitaWikiKuvaLaskuri();
    /*
     * Kuratoitu karuselli on ruudulla HETI, ennen verkkoa. Kuvat ovat
     * paketissa, joten ne eivät tarvitse tiivistelmähakua — ja jos
     * yhteyttä ei ole, kuvat tulevat silti peilistä tai selaimen
     * välimuistista. Artikkelin oma kuvasto odottaisi kaksi hakua.
     */
    if (this.wikiGalleria) {
      this.wikiKuvat = this.wikiGalleria;
      this.naytaWikiKuva(this.wikiKuvat[0].src);
      this.wikiImage.alt = label;
      this.wikiImage.hidden = false;
      this.wikiKuvakotelo.hidden = false;
      this.paivitaWikiKuvaLaskuri();
      // Loput karusellin kuvat latautuvat taustalla heti.
      esilataaKuvat(this.wikiKuvat.map((k) => k.src));
    }
    /*
     * Käsin kirjoitettu maastoartikkeli (js/packs/maasto-tekstit.js)
     * on ruudulla heti eikä Wikipediaa haeta sen tilalle koskaan —
     * omistajan tilaus 10.8.2026: "Vuorien artikkelit voisi
     * kirjoittaa. Ne taitavat olla nyt suoraan wikipediasta."
     * Verkosta haetaan enää kuva, ja sekin vain jos kuratoitua
     * galleriaa ei ole.
     */
    const omat = kappaleet?.length ? kappaleet : null;
    if (omat) {
      renderMaastoArtikkeli(this, this.wikiExtract, omat);
      this.wikiSource.textContent = 'Unohdetun aarteen oma artikkeli. '
        + 'Aikalaislainaukset on luettu ja tarkistettu alkuteksteistä.';
    } else {
      this.wikiExtract.textContent = alkuteksti || 'Haetaan…';
      this.wikiSource.textContent = '';
    }
    if (!this.wikiDialog.open) this.wikiDialog.showModal();
    // Leveys pikseleinä heti avattaessa — jumiutunut viewportti ei
    // saa kaventaa artikkelia puhelinpalstaksi (ks. mitoitaWikiDialogi).
    this.mitoitaWikiDialogi();
    this.nollaaDialoginVieritys(this.wikiDialog);
    /*
     * Kaiutin artikkelin ylälaitaan. Teksti valmistuu vasta
     * verkkohaun jälkeen, joten nappi seuraa kortin sisältöä ja
     * ilmestyy siinä hetkessä, kun artikkeli laskeutuu ruudulle.
     */
    pysaytaLukija();
    this.wikiLukija = this.varustaLukija(this.wikiDialog,
      () => this.wikiDialog.querySelector('.wiki-card'), { seuraa: true });

    // Teksti ja kuvat molemmat paketista: verkkoa ei tarvita lainkaan.
    if (omat && this.wikiGalleria) return;

    const summary = await cachedSummary(title);
    // Pelaaja on voinut ehtiä sulkea dialogin tai avata toisen paikan.
    if (!this.wikiDialog.open || this.wikiOpenFor !== title) return;

    if (!summary) {
      // Oma selitys on parempi kuin pahoittelu: se on jo ruudulla, ja
      // lentokoneessa se on ainoa mitä kohteesta voidaan kertoa.
      if (!alkuteksti && !omat) this.wikiExtract.textContent = 'Tietoja ei saatu haettua. Matka jatkuu.';
      return;
    }

    if (!omat) this.wikiTitle.textContent = summary.title || label;
    // Kuratoitu karuselli on jo paikallaan; artikkelin kuvasto ei saa
    // tulla sen päälle.
    if (!this.wikiGalleria) {
      cachedImage(title).then((image) => {
        if (!this.wikiDialog.open || this.wikiOpenFor !== title || !image) return;
        this.naytaWikiKuva(image);
        this.wikiImage.alt = summary.title || label;
        this.wikiImage.hidden = false;
        this.wikiKuvakotelo.hidden = false;
        // Galleria taustalla: laskuri ja nuolet, kun kuvia on useampi.
        cachedGallery(title).then((lista) => {
          if (this.wikiOpenFor !== title || lista.length < 2) return;
          this.wikiKuvat = lista;
          this.wikiKuvaKohdalla = Math.max(0, lista.findIndex((k) => k.src === image));
          this.paivitaWikiKuvaLaskuri();
          // Koko galleria latautuu taustalla heti — selaus ei odota verkkoa.
          esilataaKuvat(lista.map((k) => k.src));
        });
      });
    }

    // Maastoartikkelin teksti on jo ruudulla — vain kuva haettiin.
    if (omat) return;

    // Oma artikkeli (pilottikaupungit): Wikipedia-tekstin sijaan näytetään
    // pelin tyyliin kirjoitettu lyhyempi artikkeli — Wikipedian pohjalta,
    // joten lähdemaininta säilyy. Kuva haetaan silti Wikipediasta.
    /*
     * Kaksi kenttänimeä samalle asialle. Vanhemmat artikkelit
     * (Tanger, Tripoli, maat) käyttävät nimeä `artikkeli`, uudemmat
     * `teksti`. Renderöinti luki vain ensimmäistä, ja 69 paikan
     * kohdalla se sai undefinedin — "Lue lisää" kaatui kokonaan
     * Venetsiassa, Roomassa, Ateenassa, Krakovassa ja Sarajevossa.
     *
     * Kenttiä ei yhtenäistetä tässä: se olisi 69 tiedostomuutosta
     * yhden rivin ongelmaan.
     */
    const oma = ARTIKKELIT[title];
    const omaTeksti = oma?.artikkeli ?? oma?.teksti ?? null;
    if (omaTeksti) {
      renderArticle(this, this.wikiExtract, omaTeksti);
      this.wikiSource.textContent = 'Unohdetun aarteen oma artikkeli, kirjoitettu Wikipedian pohjalta (CC BY-SA)';
      if (summary.url) {
        this.wikiSource.appendChild(document.createTextNode(' — '));
        const alkup = html('a', '', 'lue alkuperäinen');
        alkup.href = summary.url;
        alkup.target = '_blank';
        alkup.rel = 'noopener noreferrer';
        this.wikiSource.appendChild(alkup);
      }
      return;
    }

    this.wikiExtract.textContent = summary.extract;

    // Koko artikkeli ladataan tiivistelmän perään; tiivistelmä jää, jos
    // hakua ei saada tehtyä. Kysytään vain kerran per avaus.
    fetchArticle(summary.title, summary.lang).then((article) => {
      if (!this.wikiDialog.open || this.wikiOpenFor !== title || !article) return;
      if (article.length <= summary.extract.length) return;
      renderArticle(this, this.wikiExtract, article);
    });

    // CC BY-SA vaatii maininnan ja linkin — myös kaupallisessa käytössä.
    // Oma tiivistelmä ei ole Wikipediaa, joten sille kerrotaan oma lähde.
    if (summary.oma) {
      this.wikiSource.textContent = 'Unohdetun aarteen oma tiivistelmä — fi-Wikipediassa ei vielä ole tästä artikkelia.';
      return;
    }
    this.wikiSource.textContent = 'Lähde: Wikipedia (CC BY-SA) — ';
    const link = html('a', '', 'lue artikkeli');
    link.href = summary.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    this.wikiSource.appendChild(link);
  }

  /**
   * Kuvakatselin: napautettu kuva aukeaa isona, ja jos artikkelissa on
   * useampia kelvollisia kuvia, niitä voi selata nuolista tai pyyhkäisemällä.
   * Katselin lisätään avoimen dialogin sisään, koska dialogi on selaimen
   * top layerissa — muualle lisätty kerros jäisi sen alle.
   */
  /** Lue lisää -lehden kuvan laskuri ja nuolet — sama malli kuin Tutki-kortissa. */
  paivitaWikiKuvaLaskuri() {
    const monta = this.wikiKuvat.length > 1;
    this.wikiKuvaLaskuri.hidden = !monta;
    this.wikiKuvaLaskuri.textContent = monta
      ? `${this.wikiKuvaKohdalla + 1}/${this.wikiKuvat.length}` : '';
    document.getElementById('wiki-kuva-edellinen').hidden = !monta;
    document.getElementById('wiki-kuva-seuraava').hidden = !monta;
    this.paivitaWikiKuvateksti();
  }

  /**
   * Kuvateksti ja lähderivi karusellin alle.
   *
   * Vain kuratoiduilla kuvilla. Wikipedian oma kuvasto kulkee
   * artikkelin lisenssin alla, ja se lukee jo ikkunan lopussa
   * ("Lähde: Wikipedia (CC BY-SA)"); Commonsista käsin poimittu kuva
   * on oma teoksensa, jonka tekijä ja lisenssi on mainittava siinä,
   * missä kuva näytetään. Sama muoto kuin nähtävyysjutuissa: selite
   * ensin ja lähde sen jatkeena samalla rivillä pienemmällä.
   */
  paivitaWikiKuvateksti() {
    if (!this.wikiKuvateksti) return;
    const kuva = this.wikiGalleria ? this.wikiKuvat[this.wikiKuvaKohdalla] : null;
    this.wikiKuvateksti.textContent = '';
    this.wikiKuvateksti.hidden = !kuva;
    if (!kuva) return;
    if (kuva.caption) {
      this.wikiKuvateksti.appendChild(html('span', 'nahtavyys-selite', kuva.caption));
    }
    if (kuva.lahde) {
      this.wikiKuvateksti.appendChild(html('span', 'nahtavyys-lahde', kuva.lahde));
    }
  }

  /**
   * Latausvirhe ei saa jättää rikkinäisen kuvan merkkiä galleriaan:
   * lähteestä voi kadota tiedosto (uudelleennimeäminen tai poisto), ja
   * silloin kelaus vain jää jumiin kysymysmerkkiin.
   *
   * Ensin kokeillaan varareittiä: jos peili ei vastaa, sama kuva löytyy
   * yhä alkuperäisestä lähteestä. Vasta kun sekin pettää, kuva pudotetaan
   * listalta ja näytetään seuraava; jos kuvia ei jää yhtään, koko kotelo
   * piilotetaan. Lista lyhenee joka virheellä, joten ketju päättyy.
   */
  /**
   * Artikkelin kuva niin suurena kuin sitä on olemassa.
   *
   * Omistajan toive 6.8.2026: "kaikilla Wikipedia-artikkelisivuilla
   * kuvat näytetään mahdollisimman suurina". Kuvaosoite tulee joko
   * tiivistelmästä tai kuvalistasta, ja MOLEMMAT ovat pikkukuvia:
   * tiivistelmän thumbnail on mitattuna noin 330 px leveä (Madrid
   * 330 × 283, alkuperäinen 1184 × 1016) ja kuvalistan srcset tarjoaa
   * usein 500 px. Osoitteessa on leveys muodossa `/330px-`, ja
   * `upsizeImage` vaihtaa sen — sama temppu kuin suurennoskatselimessa
   * (openLightbox), nyt myös itse artikkelisivulla.
   *
   * 1600 eikä 1200: lehti on iPadilla noin 700 CSS-pikseliä leveä, ja
   * tarkalla näytöllä se on 1400 laitepikseliä. Pienempi luku näkyisi
   * juuri siellä, missä kuvaa katsotaan tarkimmin.
   *
   * Portaat jäävät talteen: jos suurinta kokoa ei ole tehty tälle
   * tiedostolle, virhekäsittelijä ottaa listalta seuraavan ja lopulta
   * alkuperäisen pikkukuvan (ks. wikiImage error).
   */
  naytaWikiKuva(src) {
    if (!src) return;
    this.wikiKuvaPortaat = suurennusportaat(src);
    this.wikiImage.src = this.wikiKuvaPortaat.shift();
  }

  pudotaRikkiKuva(lista, kuva, mika) {
    const nyt = kuva.getAttribute('src');
    if (!nyt) return;
    const sama = (s) => Boolean(s)
      && new URL(s, location.href).href === new URL(nyt, location.href).href;
    const kohta = lista.findIndex((k) => sama(k.src));
    if (kohta < 0) return;
    const merkinta = lista[kohta];
    if (merkinta.vara && merkinta.vara !== merkinta.src) {
      peiliPetti(peilinLaji(merkinta.src) ?? 'kuvat');
      merkinta.src = merkinta.vara;
      kuva.src = merkinta.vara;
      return;
    }
    lista.splice(kohta, 1);
    const kotelo = mika === 'wiki' ? this.wikiKuvakotelo : this.arrivalKuvakotelo;
    if (!lista.length) {
      kuva.removeAttribute('src');
      kotelo.hidden = true;
      return;
    }
    if (mika === 'wiki') {
      this.wikiKuvaKohdalla %= lista.length;
      // Myös korvaava kuva näytetään suurena; jos suurennosta ei ole,
      // virhekäsittelijä palaa pikkukuvaan kuten muissakin kohdissa.
      this.naytaWikiKuva(lista[this.wikiKuvaKohdalla].src);
      this.paivitaWikiKuvaLaskuri();
    } else {
      this.lehtitila.arrivalKuvaKohdalla %= lista.length;
      kuva.src = lista[this.lehtitila.arrivalKuvaKohdalla].src;
      this.paivitaKuvaLaskuri();
    }
  }

  /** Pikkukuvan laskuri ja nuolet näkyvät vain, kun galleriassa on selattavaa. */
  paivitaKuvaLaskuri() {
    const monta = this.lehtitila.arrivalKuvat.length > 1;
    this.arrivalKuvaLaskuri.hidden = !monta;
    this.arrivalKuvaLaskuri.textContent = monta
      ? `${this.lehtitila.arrivalKuvaKohdalla + 1}/${this.lehtitila.arrivalKuvat.length}` : '';
    document.getElementById('arrival-kuva-edellinen').hidden = !monta;
    document.getElementById('arrival-kuva-seuraava').hidden = !monta;
  }

  /**
   * @param {Array} [lista] valmis kuvalista ({ src, caption, lahde }).
   *   Kun se on annettu, artikkelin omaa kuvastoa ei haeta lainkaan.
   */
  async openLightbox(title, alt = '', aloitusSrc = null, lista = null) {
    if (!title && !aloitusSrc) return;
    const parent = [this.wikiDialog, this.arrivalDialog].find((d) => d.open) ?? document.body;
    const overlay = html('div', 'lightbox');
    const img = html('img', 'lightbox-img');
    img.alt = alt;
    /*
     * Leveys pikseleinä MITATUSTA näkymästä, ei vw-yksiköistä: iPadin
     * jumiutunut asetteluviewportti (sama ilmiö kuin kapeassa lehdessä
     * ja kulttuurisuurennoksessa) sai CSS:n 94vw:n lukemaan iPhonen
     * leveyttä, ja wikin kuvat rajautuivat iPhonen kokoon koko näytön
     * galleriassa (omistajan havainto 14.8.2026). Sama vyö ja
     * henkselit kuin mitoitaArkissa ja naytaKulttuuriKuvassa.
     */
    const nakyma = this.nakymanLeveys || this.mittaaNakyma();
    if (nakyma >= NAKYMAN_VAHIMMAISLEVEYS) {
      img.style.maxWidth = `${Math.round(nakyma * 0.94)}px`;
    }
    const lataus = html('div', 'lightbox-loading', 'Ladataan…');
    const kuvateksti = html('div', 'lightbox-caption');
    if (nakyma >= NAKYMAN_VAHIMMAISLEVEYS) {
      kuvateksti.style.maxWidth = `${Math.min(640, Math.round(nakyma * 0.88))}px`;
    }
    const prev = html('button', 'lightbox-nav prev', '‹');
    const next = html('button', 'lightbox-nav next', '›');
    const counter = html('div', 'lightbox-counter');
    const close = html('button', 'lightbox-close', '✕');
    prev.hidden = next.hidden = kuvateksti.hidden = true;
    img.hidden = true; // rikkinäisen kuvan kysymysmerkki ei saa vilahtaa
    overlay.append(img, lataus, kuvateksti, prev, next, counter, close);
    parent.appendChild(overlay);

    let kuvat = []; // { src, caption }
    let kohdalla = 0;
    // Nykyisen kuvan jäljellä olevat suurennusportaat, ks. wiki.js.
    let portaat = [];
    img.addEventListener('load', () => {
      img.hidden = false;
      lataus.hidden = true;
    });
    const nayta = () => {
      if (!kuvat.length) return;
      const kohde = kuvat[kohdalla];
      img.hidden = true;
      lataus.hidden = false;
      lataus.textContent = 'Ladataan…';
      portaat = suurennusportaat(kohde.src);
      img.src = portaat.shift();
      // Lähde kuvatekstin jatkeeksi samalle riville pienemmällä
      // (23.8.2026): CC BY vaatii tekijän maininnan myös
      // suurennoksessa, jossa kuva on isoimmillaan.
      kuvateksti.textContent = kohde.caption ?? '';
      if (kohde.lahde) kuvateksti.appendChild(html('span', 'lightbox-lahde', kohde.lahde));
      kuvateksti.hidden = !kohde.caption && !kohde.lahde;
      counter.textContent = kuvat.length > 1 ? `${kohdalla + 1} / ${kuvat.length}` : '';
      prev.hidden = next.hidden = kuvat.length < 2;
    };
    /*
     * Jos suurinta kokoa ei ole tehty tälle tiedostolle, otetaan
     * seuraava porras ja lopulta kuvalistan oma osoite. Aiemmin tässä
     * oli yksi kiinteä suurennos (1200 px) ja paluu pikkukuvaan — ja
     * koska 1200 ei ole Wikipedian vakiokoko, katselin päätyi lähes
     * aina takaisin 330 pikselin pikkukuvaan.
     */
    img.addEventListener('error', () => {
      if (!kuvat.length) return;
      if (portaat.length) { img.src = portaat.shift(); return; }
      lataus.textContent = 'Kuvaa ei saatu ladattua.';
    });
    const siirry = (askel) => {
      if (kuvat.length < 2) return;
      kohdalla = (kohdalla + askel + kuvat.length) % kuvat.length;
      nayta();
      sfx.play('swipe');
    };
    prev.addEventListener('click', (e) => { e.stopPropagation(); siirry(-1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); siirry(1); });
    /*
     * Sama näppäinsopimus kuin muissa suurennoksissa (ks.
     * rekisteroiSuurennosNappaimet): nuolet selaavat, Esc sulkee vain
     * suurennoksen. Tämä katselin oli ainoa ilman näppäimiä
     * (omistajan havainto 10.8.2026: "nuolinäppäin selailu ei
     * toimi") — kuuntelija on documentissa kaappausvaiheessa, jotta
     * se voittaa alla olevan lehden sivunkäännön, ja purkautuu
     * suurennoksen sulkeutuessa mitä reittiä tahansa.
     */
    const nappaimet = (e) => {
      if (!overlay.isConnected) {
        document.removeEventListener('keydown', nappaimet, { capture: true });
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        siirry(e.key === 'ArrowRight' ? 1 : -1);
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        sulje();
      }
    };
    const sulje = () => {
      overlay.remove();
      document.removeEventListener('keydown', nappaimet, { capture: true });
    };
    document.addEventListener('keydown', nappaimet, { capture: true });
    close.addEventListener('click', sulje);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) sulje();
    });
    // Pyyhkäisy vaihtaa kuvaa sormella.
    let alkuX = null;
    overlay.addEventListener('pointerdown', (e) => { alkuX = e.clientX; });
    overlay.addEventListener('pointerup', (e) => {
      if (alkuX === null) return;
      const siirtyma = e.clientX - alkuX;
      alkuX = null;
      if (Math.abs(siirtyma) > 40) siirry(siirtyma < 0 ? 1 : -1);
    });

    // Kuratoitu lista on jo valmiina: ei hakua, ei välivaihetta yhden
    // kuvan galleriana.
    if (lista?.length) {
      kuvat = lista;
      kohdalla = Math.max(0, lista.findIndex((k) => k.src === aloitusSrc));
      // Sarjan kaikkien kuvien ylin suurennusporras latautuu taustalla
      // heti (omistajan tilaus 14.8.2026) — selaus ei odota verkkoa.
      esilataaKuvat(kuvat.map((k) => suurennusportaat(k.src)[0] ?? k.src));
      nayta();
      return;
    }

    // Ensimmäinen kuva heti ruutuun, koko galleria kun lista on haettu.
    // Jos suurennos avattiin selatusta pikkukuvasta, aloitetaan siitä.
    const eka = aloitusSrc || (title ? await cachedImage(title) : null);
    if (!overlay.isConnected) return;
    if (eka) {
      kuvat = [{ src: eka, caption: null }];
      nayta();
    }
    /*
     * Ilman otsikkoa suurennos jää yhteen kuvaan. Valokuvakysymys
     * käyttää tätä: artikkeligalleria näyttäisi samat kuvat, joista
     * koko vika alkoi, ja sen kuvatekstit kertoisivat vastauksen.
     */
    if (!title) return;
    const haettu = await cachedGallery(title);
    if (!overlay.isConnected || !haettu.length) return;
    const nykyinen = kuvat[0]?.src ?? null;
    kuvat = haettu;
    kohdalla = Math.max(0, haettu.findIndex((k) => k.src === nykyinen));
    // Haettu galleria esiladataan samalla tavalla kuin valmis lista.
    esilataaKuvat(kuvat.map((k) => suurennusportaat(k.src)[0] ?? k.src));
    nayta();
  }

  closeArrival() {
    this.lehtitila.arrivalShownFor = null;
    this.suljeKulttuuriKuva();
    this.pysaytaKulttuuriAani();
    // Inline-mitat pois (ks. mitoitaArkki): suljettu dialogi palaa
    // CSS:n varaan, ettei vanha pikselileveys jää seuraavan avauksen
    // tai muun dialogikäytön tielle.
    this.arrivalDialog.style.width = '';
    this.arrivalDialog.style.maxWidth = '';
    // Myös pystymitat: sama dialogi palvelee ilman arkki-luokkaa
    // (saapumiskortti), eikä sille kuulu lehden pikselikorkeus.
    this.arrivalDialog.style.height = '';
    this.arrivalDialog.style.maxHeight = '';
    const arkkiKortti = this.arrivalDialog.querySelector('.dialog-card');
    if (arkkiKortti) {
      arkkiKortti.style.width = '';
      arkkiKortti.style.maxWidth = '';
      arkkiKortti.style.height = '';
      arkkiKortti.style.maxHeight = '';
    }
    if (this.arrivalDialog.open) this.arrivalDialog.close();
    // Tauolle jäänyt luenta jatkuu, kun palataan karttanäkymään — mutta
    // ei tietovisan tai kaksintaistelun päälle (Tutki paikka -polku).
    const kesken = this.luentaTauolla;
    this.luentaTauolla = null;
    if (kesken && kesken === this.diaryVoice && !this.game.quiz && !this.game.duel) {
      kesken.play().catch(() => {});
    }
  }

  /**
   * Etusivun paikkarivi laitteen kellosta: "Heathrow, Lontoo, elokuu 2026".
   *
   * Kuukausi pienellä alkukirjaimella, kuten suomessa kuuluu — se tulee
   * suoraan toLocaleStringiltä, joka ei versaalia lisää. Jos selaimen
   * fi-FI-tuki puuttuu (vanha WebKit ilman ICU-dataa), kuukausi voi
   * palautua englanniksi; rivi on silti ehjä eikä ajo kaadu.
   */
  introPaikkarivi(nyt = new Date()) {
    const kuukausi = nyt.toLocaleString('fi-FI', { month: 'long' });
    return `${INTRO_PAIKKA}, ${kuukausi} ${nyt.getFullYear()}`;
  }

  /**
   * Avaus on kaksi lohkoa (omistajan tilaus 26.8.2026, ilta):
   * ylälohkossa pienennetty kartta ja sen päällä julisteotsikko,
   * alalohkossa tyhjä vaalea karttapohja ja sen päällä paikkarivi,
   * avausteksti ja Mistä aloitan? -nappi. Teksti on omistajan lukkoon
   * lyömä eikä sitä muokata täällä; se naksuu esiin kirjoituskoneen
   * tapaan, ja lopuksi sen alle ilmestyy nappi, joka vie kartan
   * lähikuvaan Lontoon kohdalle.
   */
  renderIntro() {
    // Katselutilassa (?lauta=) porttia ja avaustekstiä ei näytetä: kartta
    // on heti esillä täydessä koossaan.
    const nakyy = this.game.phase === 'pickstart' && !this.katselu;
    this.introEl.hidden = !nakyy;
    /*
     * PERGAMENTTI KOKO PANEELIIN AVAUKSEN AJAKSI (omistajan havainto
     * 16.8.2026 iPadilla: "etusivu näkyy väärin").
     *
     * Avausteksti kirjoittuu kartan alapuoliseen tyhjään tilaan, kuten
     * tämän metodin kuvaus sanoo — mutta se tila oli pergamentin sijaan
     * paneelin tummaa pohjaa (#241a12). Maailmankartta on leveä ja
     * säilyttää kuvasuhteensa, joten korkealla ruudulla sen alle jää
     * paneelia, jota kartta ei peitä: iPadilla mitattuna reilut 300 px,
     * ja teksti putosi kokonaan sen tummalle alueelle.
     *
     * Sama vika on ratkaistu ennenkin puhelimen lähikuvassa
     * (body.aloitus-zoom .map-pane): siellä paneeli sai saman
     * pergamenttiliu'un kuin kartta, jottei tumma pohja paista reunoilta.
     * Tässä on sama tilanne ilman zoomia, joten sama keino.
     */
    document.body.classList.toggle('aloitusnakyma', nakyy);
    // Uusi peli tuo tekstin takaisin täyteen näkyvyyteen häivytyksestä —
    // mutta lähikuvassa teksti on väistynyt tarkoituksella, joten sitä ei
    // palauteta joka renderöinnillä.
    if (nakyy && !this.aloitusZoom) this.introEl.classList.remove('intro-fade', 'intro-pois');
    /*
     * KOKO AVAUSKAPPALE ODOTTAA NAPPIA (omistajan tilaus 12.8.2026).
     *
     * Runko ja lopetus kirjoittuivat jo ennestään vasta napin jälkeen,
     * mutta paikkarivi ("Lontoo, nykyhetki:") on kirjoitettu suoraan
     * HTML:ään (index.html), joten se oli ruudulla heti — ja jäi
     * kellumaan yksin kartan alle ennen kuin seikkailu oli alkanut.
     * Perustilassa etusivulla on siis vain kartta ja aloitusnappi;
     * kappale ilmestyy napin painalluksen jälkeen entiseen tapaan
     * animoituna.
     */
    if (this.introText) this.introText.hidden = !nakyy || !this.aloitettu;
    // Työpöytäsommitelma ja klikattava lause seuraavat tekstiä: portin
    // takana etusivulla on vain kartta ja aloitusnappi.
    if (this.introTyopoyta) this.introTyopoyta.hidden = !nakyy || !this.aloitettu;
    // Sumuverho syttyy samalla kuin teksti: portin takana kartta on
    // terävä, ja portilla on oma tummennuksensa.
    this.introEl.classList.toggle('intro-aloitettu', Boolean(nakyy && this.aloitettu));
    if (!nakyy) {
      this.introShown = false;
      this.introRunko.textContent = '';
      if (this.introValinta) this.introValinta.hidden = true;
      stopIntroVoice(this);
      this.suljeAloitusportti();
      return;
    }
    if (this.introShown) return;
    // Seikkailu alkaa napista: selain sallii äänet vasta napautuksesta,
    // joten lukuääni, kirjoituskone ja ambienssi käynnistyvät kaikki
    // samasta Aloita seikkailu -painalluksesta. Tausta on himmeänä takana.
    if (!this.aloitettu) {
      this.showAloitusportti();
      return;
    }
    this.introShown = true;
    /*
     * Avauslennon esilämmitys alkaa samasta hetkestä kuin kertomus:
     * pelaaja kuuntelee, peli rakentaa kohdelaudan taustalla
     * (ks. esilammitaAvaus).
     */
    this.esilammitaAvaus();
    /*
     * PAIKKARIVI NAPUTETAAN ENSIN (omistajan tilaus 25.8.2026: "Tätä ei
     * tarvitse lukea, mutta konekirjoitus ääni pitää kuulua ensin tämän
     * kohdalla, sitten vasta alkaa seuraavan kappaleen luenta").
     * Kirjoituskone lyö kohtausmerkinnän, ja vasta sen valmistuttua
     * kertoja aloittaa ja runko alkaa kirjoittua.
     */
    if (this.introPaikka) this.introPaikka.textContent = '';
    /*
     * Avausteksti kirjoittuu selvästi hitaammin kuin muut: se on matkan
     * ensimmäinen hetki eikä pelitilanteen ilmoitus.
     *
     * Teksti varaa tilansa näkymättömällä varjotekstillä (typeTextin
     * oma pending-span) jo ennen kirjoitusta, ja fitIntro mitataan
     * vasta sen jälkeen — muuten palsta kasvaisi kirjoituksen alla ja
     * kansikuva hyppisi sen perässä.
     */
    this.introRunko.textContent = '';
    /*
     * MISTÄ ALOITAN? -NAPPI ILMESTYY VASTA KIRJOITUKSEN JÄLKEEN
     * (omistajan tilaus 25.8.2026). Nappi on kuitenkin jo asettelussa
     * mukana (peittävyys, ei hidden), jotta palstan korkeus on mitattu
     * oikein heti eikä mikään liiku napin ilmestyessä.
     */
    if (this.introValinta) {
      this.introValinta.textContent = INTRO_VALINTA;
      this.introValinta.hidden = false;
      this.introValinta.classList.add('intro-valinta-piilossa');
      if (!this.introValintaKytketty) {
        this.introValintaKytketty = true;
        this.introValinta.addEventListener('click', () => this.aloitaKartalta());
      }
    }
    const aloitaRunko = () => {
      if (this.dead || this.game.phase !== 'pickstart') return;
      // Luenta alkaa vasta nyt — paikkarivi oli pelkkää konekirjoitusta.
      playIntroVoice(this);
      this.typeText(this.introRunko, INTRO_TEXT, 'intro', () => {
        // Nappi paljastuu pehmeästi vasta kun viimeinen kirjain on tullut.
        this.introValinta?.classList.remove('intro-valinta-piilossa');
      }, INTRO_TYPE_MS);
      // Koko teksti on paikallaan (typeTextin varjoteksti varaa tilan),
      // joten koon voi sovittaa heti — mikään ei liiku kirjoituksen alla.
      this.fitIntro();
    };
    if (this.introPaikka) {
      this.typeText(this.introPaikka, `${this.introPaikkarivi()}:`, 'intro',
        aloitaRunko, INTRO_TYPE_MS);
      this.fitIntro();
    } else {
      aloitaRunko();
    }
  }

  /**
   * Mistä aloitan? -napin polku kartalle (omistajan tilaus 25.8.2026,
   * nappi 26.8.2026).
   *
   * Naksahdus, avauspalsta häipyy (teksti, sumuverho ja kansikuva
   * samalla kertaa, koska ne ovat saman elementin lapsia), ja kartta
   * zoomautuu koko ruudulle Lontoon kohdalle — sama lähikuva, joka
   * ennen aukesi puhelimella kartan napautuksesta
   * (kartta.zoomaaAloituskartta). Kohdepisteet piirtyvät vasta siinä
   * lähikuvassa, joten Ateenan voi valita vasta täältä.
   */
  aloitaKartalta() {
    if (this.aloitusZoom || this.game.phase !== 'pickstart') return;
    // Naksahdus: sama puinen naksu kuin nappulan kolauksessa
    // (efekti-naksu.mp3). Kevyt eikä juhlava — matka ei ole vielä
    // alkanut, kartta vain avautuu.
    sfx.play('clack');
    // Häivytys ensin ja zoomaus vasta sen alettua: kartta saa liikkua
    // pehmenevän tekstin alla eikä ruutu välähdä tyhjäksi väliltä.
    this.introEl.classList.add('intro-fade');
    const lontoo = this.game.board.cityById.get(ALOITUSLENNON_LAHTO);
    this.kartta.zoomaaAloituskartta(lontoo ? { x: lontoo.x, y: lontoo.y } : null);
  }

  /** Aloita seikkailu -portti: keskellä ruutua, kartta himmeänä takana. */
  showAloitusportti() {
    if (this.aloitusportti) return;
    const portti = html('div', 'start-gate');
    const keskus = html('div', 'start-gate-keskus');

    // Ääniviihje napin yläpuolelle (omistajan toive): peli on tehty
    // kuunneltavaksi, ja selain sallii äänet vasta napautuksesta.
    const aanet = html('p', 'start-aanet');
    aanet.appendChild(document.createTextNode('Laita äänet päälle '));
    const kaiutin = viivaIkoni('kaiutin');
    if (kaiutin) aanet.appendChild(kaiutin);
    keskus.appendChild(aanet);

    const nappi = html('button', 'start-btn primary', 'Aloita seikkailu');
    nappi.addEventListener('click', () => {
      this.aloitettu = true;
      this.suljeAloitusportti();
      /*
       * Lauta kutistuu keskeltä ylälohkoon tekstin tieltä heti portin
       * auettua. Rajauslaatikko on laskettava uudelleen: avaustekstin
       * kaista (kartta.introKaistaKaytossa) syntyy vasta nyt, ja ilman
       * uutta laskentaa fitViewBox sovittaisi vanhaan, kaistattomaan
       * laatikkoon eikä lauta pienenisi lainkaan.
       */
      this.contentBox = this.kartta.boardBounds();
      this.kartta.fitViewBox();
      this.render();
    });
    keskus.appendChild(nappi);
    portti.appendChild(keskus);

    // Alareunan linkki pelin periaatteisiin.
    const alaosa = html('div', 'start-gate-alaosa');
    const linkki = html('button', 'start-linkki', 'Oppiminen on hauskaa');
    linkki.type = 'button';
    linkki.addEventListener('click', () => this.naytaPeriaatteet());
    alaosa.appendChild(linkki);
    portti.appendChild(alaosa);

    this.mapPane.appendChild(portti);
    this.aloitusportti = portti;
  }

  /**
   * Pelin periaatteet omana ikkunanaan aloitussivulta (omistajan toive).
   * Sisältö on tiivistys README:stä ja Raamatun perustuslaista: miksi peli
   * on olemassa ja millä säännöillä sisältöä siihen tehdään.
   */
  naytaPeriaatteet() {
    sfx.play('paper');
    const lappu = html('dialog', 'dialog periaate-lappu');
    const kortti = html('div', 'dialog-card');
    lappu.appendChild(kortti);

    const otsikko = html('h2', 'periaate-otsikko', 'Oppiminen on hauskaa');
    kortti.appendChild(otsikko);

    const kappale = (teksti, luokka = '') => {
      const p = html('p', `periaate-teksti ${luokka}`.trim());
      p.textContent = teksti;
      kortti.appendChild(p);
    };
    const valiotsikko = (teksti) => {
      const h = html('h3', 'periaate-valiotsikko');
      h.textContent = teksti;
      kortti.appendChild(h);
    };

    kappale('Matkakirja ja unohdettu aarre on seikkailupeli, jonka sivutuotteena opitaan — '
      + 'ei oppikirja, johon on liimattu noppa. Pelin pitää olla '
      + 'koukuttava ensin; tieto tarttuu matkassa.', 'kärki');

    valiotsikko('Mitä pelissä opitaan');
    kappale('Maiden arkea ja kulttuuria, maantiedettä ja historiaa, '
      + 'geopolitiikkaa ja poliittista tilannetta — ja ennen kaikkea sitä, '
      + 'että maailma on suurempi kuin oma ympäristö. Jokaisella '
      + 'pysähdyksellä on jotain katsottavaa: valokuva silloin ja nyt, '
      + 'maan tunnusluvut, kaupungin musiikkia ja ruokaa.');

    valiotsikko('Kaksi ääntä');
    kappale('Isoisän päiväkirja vuodelta 1873 ja nuoren herran havainto '
      + 'tänään. Vanha ääni loistaa siinä, mikä ei ole muuttunut, ja on '
      + 'toivottoman vanhentunut nimissä ja rajoissa.');

    valiotsikko('Totuus ja lähteet');
    kappale('Jokainen väittämä on tarkistettavissa. Epävarmaa ei väitetä '
      + 'eikä kiistanalaista esitetä varmana. Politiikka ja historia '
      + 'kuvataan, ei tuomita: kerrotaan mitä on ja miksi.');

    valiotsikko('Tekoäly apuna, ihminen päättää');
    kappale('Tekoäly auttaa sisällön kokoamisessa: havainnekuvat luodaan '
      + 'avoimesti lisensoiduista aineistoista ja merkitään havainnekuviksi, '
      + 'ja tekstit kirjoitetaan lähteistä uudelleen yhtenäiseen asuun. '
      + 'Jokaisen sisällön tarkistaa ja hyväksyy ihminen.');

    valiotsikko('Kunnioitus');
    kappale('Jokainen maa kuvataan asukkaidensa silmin — ei stereotypioita, '
      + 'ei pilkkaa eikä säälittelyä, ei pelkkiä turistikliseitä. '
      + 'Vaikeita aiheita ei kaunistella eikä kauhistella.');

    valiotsikko('Avointa ja ilmaista');
    kappale('Peli on toistaiseksi ilmainen, ja sen lähdekoodi on '
      + 'kaikkien luettavissa. Peliä tekee tamperelainen '
      + 'Visuaaliviestinnän Instituutti (VVI). '
      + 'Kuvat, äänet ja tiedot tulevat avoimista '
      + 'lähteistä, ja jokaisen kohdalla lukee mistä se on ja kuka sen '
      + 'on tehnyt. Peli itse on tekijänsä omaisuutta: sitä saa pelata '
      + 'ja lähdekoodia lukea vapaasti, mutta julkaisuun tai omaan '
      + 'tuotteeseen tarvitaan lupa.');

    // Lippukuvat näkyvät pieninä tervehdysten vieressä, eikä niiden alle
    // mahdu omaa lähderiviä. Valtaosa on public domainia, mutta muutaman
    // lisenssi vaatii tekijän nimeämisen — se tehdään tässä, jotta
    // "jokaisen kohdalla lukee kuka sen on tehnyt" pitää paikkansa.
    if (LIPPU_TEKIJAT.length) {
      const lippurivi = html('p', 'periaate-teksti periaate-liput');
      lippurivi.textContent = `Lippukuvat ovat Wikimedia Commonsista. `
        + `Näiden tekijät lisenssi käskee nimetä: `
        + `${LIPPU_TEKIJAT.map((l) => `${l.tekija} (${l.lisenssi})`).join(', ')}.`;
      kortti.appendChild(lippurivi);
    }

    const linkit = html('p', 'periaate-linkit');
    const gh = html('a', 'periaate-linkki', 'Pelin GitHub-sivu');
    gh.href = 'https://github.com/ravelius/Matkakirja';
    gh.target = '_blank';
    gh.rel = 'noopener';
    linkit.appendChild(gh);
    kortti.appendChild(linkit);

    kortti.appendChild(this.periaatePalaute());

    const oikeudet = html('p', 'periaate-oikeudet',
      '© Visuaaliviestinnän Instituutti Tampere Oy');
    kortti.appendChild(oikeudet);

    const sulje = html('button', 'ghost periaate-sulje', 'Takaisin');
    sulje.type = 'button';
    sulje.addEventListener('click', () => lappu.close());
    kortti.appendChild(sulje);

    lappu.addEventListener('close', () => lappu.remove());
    lappu.addEventListener('click', (e) => { if (e.target === lappu) lappu.close(); });
    document.body.appendChild(lappu);
    lappu.showModal();
    // showModal siirtää kohdistuksen ensimmäiseen napautettavaan
    // elementtiin, joka on kortin lopussa — selain vieritti ikkunan
    // valmiiksi alas (omistajan havainto). Kohdistus otsikkoon ja
    // vieritys alkuun.
    kortti.scrollTop = 0;
    otsikko.setAttribute('tabindex', '-1');
    otsikko.focus({ preventScroll: true });
  }

  /**
   * Palautelohko periaateikkunan loppuun (omistajan toive). Viesti menee
   * ulkopuoliselle lomakepalvelulle, joka välittää sen tekijälle —
   * sähköpostiosoitetta ei ole sivulla eikä lähdekoodissa, joten
   * roskapostirobotit eivät saa sitä käsiinsä.
   *
   * Jos PALAUTE_LOMAKE on tyhjä, lohko tarjoaa GitHub-linkin, jolloin
   * palaute toimii ilman mitään asetuksia.
   */
  periaatePalaute() {
    const lohko = html('div', 'periaate-palaute');
    const otsikko = html('h3', 'periaate-valiotsikko', 'Palaute ja mukaan');
    lohko.appendChild(otsikko);

    const johdanto = html('p', 'periaate-teksti');
    johdanto.textContent = 'Jos tämä peli kiinnostaa, lähetä palautetta. '
      + 'Voit myös osallistua pelin kehittämiseen — sisältöä, kuvia, '
      + 'kysymyksiä tai koodia.';
    lohko.appendChild(johdanto);

    const vihje = html('p', 'periaate-teksti');
    vihje.textContent = 'Pelin oikeassa alakulmassa on huutomerkki. Sitä '
      + 'napauttamalla voit lähettää palautetta juuri siitä kohdasta, '
      + 'jossa olet — kätevää etenkin, jos jokin näyttää menneen vikaan.';
    lohko.appendChild(vihje);

    lohko.appendChild(this.palauteKentat());
    return lohko;
  }

  /**
   * Palautteen kentät ja lähetys. Sama lohko palvelee sekä periaate-
   * ikkunaa että alakulman huutomerkkiä; tilanne-teksti kulkee viestin
   * mukana, jotta virheilmoitus osuu oikeaan kohtaan peliä.
   *
   * Jos PALAUTE_LOMAKE on tyhjä, tarjolla on GitHub-linkki, jolloin
   * palaute toimii ilman mitään asetuksia.
   */
  palauteKentat(tilanne = '') {
    const lohko = html('div', 'periaate-lomake');
    if (!PALAUTE_LOMAKE) {
      // Omistajan päätös 18.8.2026: ei GitHub-linkkiä eikä alkutekstiä —
      // ehdotuskanava on ainoa palautetie, ja se näkyy suoraan.
      this.lisaaEhdotusOsio(lohko, tilanne);
      return lohko;
    }

    const kentta = html('textarea', 'periaate-kentta');
    kentta.rows = 4;
    kentta.placeholder = 'Kirjoita viestisi tähän…';
    kentta.setAttribute('aria-label', 'Viesti pelin tekijälle');
    lohko.appendChild(kentta);

    // Yhteydenottokenttä (omistajan toive): ilman sitä palautteeseen ei
    // voi vastata. Vapaaehtoinen — nimettömän viestin saa lähettää.
    const paluu = html('input', 'periaate-kentta periaate-paluu');
    paluu.type = 'email';
    paluu.placeholder = 'Sähköpostisi, jos haluat vastauksen';
    paluu.setAttribute('aria-label', 'Sähköpostiosoitteesi, vapaaehtoinen');
    lohko.appendChild(paluu);

    const nappi = html('button', 'primary periaate-laheta', 'Lähetä palautetta');
    nappi.type = 'button';
    lohko.appendChild(nappi);

    const huomio = html('p', 'periaate-huomio');
    huomio.setAttribute('role', 'status');
    huomio.textContent = 'Viesti menee suoraan pelin tekijälle.';
    lohko.appendChild(huomio);

    nappi.addEventListener('click', async () => {
      const viesti = kentta.value.trim();
      if (!viesti) {
        huomio.textContent = 'Kirjoita ensin viesti.';
        kentta.focus();
        return;
      }
      nappi.disabled = true;
      huomio.textContent = 'Lähetetään…';
      try {
        const vastaus = await fetch(PALAUTE_LOMAKE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            viesti,
            email: paluu.value.trim(),
            tilanne,
            // Vaihe on kehittäjän tieto eikä näy pelaajalle: se kertoo
            // virheraportissa, mitä peli oli juuri tekemässä.
            vaihe: this.game?.phase ?? '',
            versio: peliVersio(),
            _subject: tilanne
              ? `Matkakirja — palaute: ${tilanne}`
              : 'Matkakirja — palaute',
          }),
        });
        if (!vastaus.ok) throw new Error(`HTTP ${vastaus.status}`);
        kentta.value = '';
        paluu.value = '';
        huomio.textContent = 'Kiitos! Viesti lähti perille.';
        nappi.textContent = 'Lähetetty';
      } catch (err) {
        console.warn('Palautteen lähetys ei onnistunut:', err);
        nappi.disabled = false;
        huomio.textContent = 'Lähetys ei onnistunut. Kokeile hetken päästä uudelleen.';
      }
    });
    this.lisaaEhdotusOsio(lohko, tilanne);
    return lohko;
  }

  /**
   * LUKIJOIDEN EHDOTUKSET -osio palautelomakkeen perään (Raamattu,
   * osio "Lukijoiden ehdotukset"). Osio on oma moduulinsa
   * (js/ehdotukset.js) ja se on piilossa, kunnes EHDOTUS_OSOITE on
   * asetettu — palaute toimii täsmälleen kuten ennen.
   *
   * Sivuehdotus tulee pelin nykyisestä näkymästä, jotta pelaajan ei
   * tarvitse osata nimetä lehteä itse.
   */
  lisaaEhdotusOsio(lohko, tilanne = '') {
    /*
     * RETKIKUNTA ensin (Raamattu, osio SÄHKEJÄRJESTELMÄ): sähkeosio
     * asuu samassa valikon lomakkeessa kuin ehdotuskanava, koska
     * molemmat ovat pelin ympäryksiä eivätkä pelisisältöä
     * (hampurilaisen linjaus 18.8.2026). Ilman sähkelinjaa osio on yksi
     * rivi tekstiä ja ilman yhtään nappia (js/sahke.js).
     */
    lohko.appendChild(retkikuntaOsio(this));
    const osio = ehdotusOsio(this.ehdotusSivu(tilanne));
    if (osio) lohko.appendChild(osio);
    // PRO-SISÄLLÖNTUOTTAJAT kahdessa osassa (omistajan tarkennukset
    // 18.8.2026): HAKURASTI i-selitteineen ennen Lähetä ehdotus
    // -nappia (hakemus kulkee ehdotuksen mukana), ja KIRJAUTUMINEN
    // lomakkeen pohjalla aina näkyvän väkäsen takana.
    const rasti = proHakuRasti();
    const laheta = osio?.querySelector('.periaate-laheta');
    if (rasti && laheta) laheta.before(rasti);
    const pro = proOsio();
    if (pro) lohko.appendChild(pro);
  }

  /**
   * Sivutunniste ehdotukseen: sama tilannekuvaus kuin palautteessa
   * (lauta · kaupunki) ja sen perään auki olevan lehden sivu, jos
   * lehti on auki. Selkokieltä, koska pelaaja näkee sen lomakkeessa.
   */
  ehdotusSivu(tilanne = '') {
    const osat = [tilanne || this.palauteTilanne()].filter(Boolean);
    try {
      const { tutkiSivut, tutkiSivu } = this.lehtitila;
      const sivu = tutkiSivut?.[tutkiSivu ?? 0];
      if (this.lehtitila.tutkiLehti && sivu?.nimi) osat.push(sivu.nimi);
    } catch (err) {
      console.warn('Lehden sivun luku ehdotusta varten ei onnistunut:', err);
    }
    return osat.join(' · ');
  }

  /**
   * Alakulman huutomerkki (omistajan toive): palaute juuri siitä
   * kohdasta peliä, jossa pelaaja on. Ikkuna kertoo lyhyesti mistä on
   * kyse ja näyttää, mikä tilanne kulkee viestin mukana.
   */
  naytaPalauteKulmasta() {
    if (document.querySelector('.palaute-lappu')) return;
    sfx.play('paper');
    const tilanne = this.palauteTilanne();
    const lappu = html('dialog', 'dialog periaate-lappu palaute-lappu');
    const kortti = html('div', 'dialog-card periaate-kortti');
    lappu.appendChild(kortti);

    const otsikko = html('h2', 'periaate-otsikko', 'Kerro mitä huomasit');
    kortti.appendChild(otsikko);

    kortti.appendChild(this.palauteKentat(tilanne));

    const sulje = html('button', 'ghost periaate-sulje', 'Takaisin peliin');
    sulje.type = 'button';
    sulje.addEventListener('click', () => lappu.close());
    kortti.appendChild(sulje);

    lappu.addEventListener('close', () => lappu.remove());
    lappu.addEventListener('click', (e) => { if (e.target === lappu) lappu.close(); });
    document.body.appendChild(lappu);
    lappu.showModal();
    kortti.scrollTop = 0;
    otsikko.setAttribute('tabindex', '-1');
    otsikko.focus({ preventScroll: true });
  }

  /**
   * Lyhyt kuvaus pelin nykytilasta palauteviestin liitteeksi. Näkyy myös
   * pelaajalle, joten teksti on selkokieltä eikä koodin sisäisiä
   * tunnisteita: lauta ja kaupunki riittävät paikantamaan kohdan.
   */
  palauteTilanne() {
    const osat = [];
    try {
      // ariaLabel on pakan ainoa ihmisluettava nimi ("Euroopan
      // aarrekartta"); pelkkä id olisi "europe".
      const lauta = this.game?.pack?.ariaLabel;
      if (lauta) osat.push(lauta);
      const kaupunki = this.game?.cityOf?.();
      if (kaupunki?.name) osat.push(kaupunki.name);
    } catch (err) {
      console.warn('Pelitilanteen luku palautetta varten ei onnistunut:', err);
    }
    return osat.join(' · ');
  }

  suljeAloitusportti() {
    this.aloitusportti?.remove();
    this.aloitusportti = null;
  }


  /** Kaupungin tunnus laudan kanssa: sama nimi voi olla kahdella laudalla. */
  kaupunkiAvain(city) {
    return city ? `${this.game.pack.id}:${city.id}` : null;
  }

  /**
   * Sytyttää suurennuslasin sykkeen, kun pelaaja saapuu kaupunkiin
   * ENSIMMÄISTÄ KERTAA (omistajan toive: "jotta pelaaja tajuaa painaa").
   *
   * Uutuus luetaan pelin omasta käytyjen kaupunkien listasta, mutta
   * VERTAAMALLA SITÄ EDELLISEEN PIIRTOON. Suora kysely ei kelpaa:
   * game.visitCity lisää kaupungin listaan jo saapumishetkellä, joten
   * piirron aikaan se on siellä aina — vasta ero edelliseen kertoo,
   * oliko käynti uusi.
   *
   * Ensimmäinen piirto vain kirjaa lähtötilanteen. Tallennuksesta
   * palattaessa saapuminen on jo tapahtunut, eikä vanhaa kaupunkia pidä
   * korostaa uutena.
   *
   * Botin vuorot kirjataan mutta eivät sytytä sykettä: nappi on
   * pelaajan, ja botin liikkeet vain merkitsevät kaupungit nähdyiksi.
   */
  paivitaTutkiSyke() {
    const { game } = this;
    const kaydyt = game.worldOf?.(game.player)?.visited;
    if (!kaydyt) return;
    const avaimet = [...kaydyt].map((id) => `${game.pack.id}:${id}`);
    if (!this.kaydytEnnen) {
      this.kaydytEnnen = new Set(avaimet);
      return;
    }
    const nyt = this.kaupunkiAvain(game.cityOf());
    if (nyt && !game.player.isBot && !this.kaydytEnnen.has(nyt) && kaydyt.has(game.cityOf().id)) {
      this.lehtitila.tutkiSyke = nyt;
    }
    for (const avain of avaimet) this.kaydytEnnen.add(avain);
  }

  /**
   * Pieni i-ympyrä, jonka napautus avaa selosteen napin vierestä.
   *
   * Palauttaa valmiin napin, jonka voi liittää minkä tahansa otsikon
   * perään: `otsikko.appendChild(ui.pikkuselosteNappi('teksti', 'nimi'))`.
   * Nappi hoitaa itse avaamisen, sulkemisen ja aria-tilansa.
   *
   * @param {string} teksti selosteen sisältö
   * @param {string} nimi ruudunlukijan ja hiiren osoittimen nimi napille
   */
  pikkuselosteNappi(teksti, nimi = 'Lisätietoa') {
    const nappi = html('button', 'seloste-nappi', 'i');
    nappi.type = 'button';
    nappi.title = nimi;
    nappi.setAttribute('aria-label', nimi);
    nappi.setAttribute('aria-expanded', 'false');
    nappi.addEventListener('click', (e) => {
      e.stopPropagation();
      // Toinen napautus samaan nappiin sulkee: i-nappi on katkaisija,
      // ei pelkkä avaaja.
      if (this.pikkuseloste?.ankkuri === nappi) this.suljePikkuseloste();
      else this.avaaPikkuseloste(nappi, teksti);
    });
    return nappi;
  }

  /**
   * Lyhyt seloste ankkurielementin viereen.
   *
   * Tämä EI ole <dialog> vaan tekstin kokoinen laatikko: opastus on
   * yhden virkkeen mittainen, eikä sen takia pidä peittää koko ruutua
   * eikä keskeyttää sitä mitä pelaaja oli tekemässä. Sulkeutuu
   * napautuksesta ulkopuolelle, omasta ×:stään tai Escistä.
   *
   * Laatikko lisätään AVOIMEN DIALOGIN SISÄÄN, jos ankkuri on
   * sellaisessa: selain nostaa <dialog>-modaalin omaan ylätasoonsa, ja
   * muualle lisätty kerros jäisi sen alle näkymättömiin. Sama ansa on
   * ratkaistu samalla tavalla suurennoskatselimessa (openLightbox).
   *
   * @param {HTMLElement} ankkuri elementti, jonka viereen seloste tulee
   * @param {string} teksti selosteen sisältö
   */
  avaaPikkuseloste(ankkuri, teksti) {
    this.suljePikkuseloste();
    if (!ankkuri || !teksti) return null;

    const koti = ankkuri.closest('dialog[open]') ?? document.body;
    const laatikko = html('div', 'pikkuseloste');
    laatikko.setAttribute('role', 'note');
    laatikko.appendChild(html('p', 'pikkuseloste-teksti', teksti));
    const sulje = html('button', 'pikkuseloste-sulje', '×');
    sulje.type = 'button';
    sulje.setAttribute('aria-label', 'Sulje seloste');
    sulje.addEventListener('click', (e) => {
      e.stopPropagation();
      this.suljePikkuseloste();
    });
    laatikko.appendChild(sulje);
    koti.appendChild(laatikko);
    ankkuri.setAttribute('aria-expanded', 'true');

    /*
     * Paikka lasketaan vasta kun laatikko on DOMissa ja sillä on mitat.
     * Ankkurin alle, keskitettynä siihen — ja jos alle ei mahdu (nappi
     * on ruudun alalaidassa), yläpuolelle. Reunoista jätetään marginaali,
     * jottei laatikko valu ruudun ulkopuolelle puhelimella.
     */
    const asemoi = () => {
      if (!laatikko.isConnected) return;
      const a = ankkuri.getBoundingClientRect();
      const l = laatikko.getBoundingClientRect();
      const marginaali = 10;
      const alle = a.bottom + 8;
      const yli = a.top - l.height - 8;
      const mahtuuAlle = alle + l.height <= window.innerHeight - marginaali;
      const ylin = mahtuuAlle ? alle : Math.max(marginaali, yli);
      let vasen = a.left + a.width / 2 - l.width / 2;
      vasen = Math.min(Math.max(marginaali, vasen), window.innerWidth - l.width - marginaali);
      laatikko.style.top = `${Math.round(ylin)}px`;
      laatikko.style.left = `${Math.round(vasen)}px`;
      laatikko.classList.add('nakyy');
    };
    asemoi();

    /*
     * Sulkijat lisätään vasta seuraavalla silmukalla: sama napautus,
     * joka avasi selosteen, ehtisi muuten kuplia dokumenttiin ja sulkea
     * sen heti (mitattu ansa, ei teoreettinen).
     */
    const ulkopuolella = (e) => {
      if (laatikko.contains(e.target) || ankkuri.contains(e.target)) return;
      this.suljePikkuseloste();
    };
    const nappaimesta = (e) => {
      if (e.key === 'Escape') {
        // Laukku on <dialog>, ja Esc sulkisi senkin. Seloste on päällimmäisin,
        // joten se saa Escin ensin eikä päästä sitä eteenpäin.
        e.stopPropagation();
        e.preventDefault();
        this.suljePikkuseloste();
      }
    };
    const ajastin = setTimeout(() => {
      document.addEventListener('pointerdown', ulkopuolella, true);
      document.addEventListener('keydown', nappaimesta, true);
    }, 0);
    window.addEventListener('resize', asemoi);

    this.pikkuseloste = {
      laatikko,
      ankkuri,
      siivoa: () => {
        clearTimeout(ajastin);
        document.removeEventListener('pointerdown', ulkopuolella, true);
        document.removeEventListener('keydown', nappaimesta, true);
        window.removeEventListener('resize', asemoi);
      },
    };
    return laatikko;
  }

  /** Sulkee avoimen selosteen ja irrottaa sen kuuntelijat. */
  suljePikkuseloste() {
    const auki = this.pikkuseloste;
    if (!auki) return;
    this.pikkuseloste = null;
    auki.siivoa();
    auki.ankkuri?.setAttribute('aria-expanded', 'false');
    auki.laatikko.remove();
  }

  /**
   * Matkalaukku: matkan tiedot, Aarnin luettelo, tavarat ja varusteet.
   *
   * Varusteiden valitsin (#linssi-kotelo) muutti hampurilaisvalikosta
   * tänne 18.8.2026 — laukku on ainoa paikka, josta linssit kytketään
   * kartalle. Valitsin tahdistetaan avattaessa, jotta juuri löytynyt
   * linssi on siellä heti eikä vasta seuraavan piirron jälkeen.
   */
  openPassport() {
    this.renderProgress();
    this.renderAarteet();
    this.renderFinds();
    this.renderJulisteet();
    void this.paivitaLinssit();
    if (!this.passportDialog.open) this.passportDialog.showModal();
    // Kapealla ruudulla alanappirivi väistyy laukun alta, jotta
    // linssin vaikutus karttaan näkyy (css: body.laukku-auki).
    document.body.classList.add('laukku-auki');
    this.nollaaDialoginVieritys(this.passportDialog);
    this.asemoiLaukku();
  }

  /*
   * AARNIN LUETTELO: mitä ollaan etsimässä ja mikä on jo löytynyt.
   *
   * Tämä tuli vihreän passin tilalle (omistaja 5.8.2026: "koko vihreän
   * passin voi poistaa, tehdään sen tilalle pääaarteista oma osio").
   * Leimat kertoivat vain missä on käyty, minkä matkarivin Sijainti
   * kertoo jo — luettelo kertoo mihin ollaan menossa.
   *
   * NIMISTÖ ON SITOVA (docs/tyolista-opukselle.md, päätös 4.8.2026):
   * pelaajalle näkyvissä teksteissä aarre on "unohdettu aarre" eikä
   * "pääaarre" eikä "tähti", ja luettelon erisnimi on Aarnin luettelo.
   * Rivien nimet tulevat lautojen omista aarrelaatoista, joten luettelo
   * ei voi mennä eri tahtiin pelin kanssa.
   *
   * LÖYTYNYT TARKOITTAA TÄTÄ MATKAA. Aarteen löytymistä ei tallenneta
   * pelikertojen yli (js/passport.js tuntee vain lautaleimat ja
   * linssit), joten luettelo kertoo rehellisesti tämän matkan tilanteen
   * eikä väitä muistavansa enempää.
   */
  /**
   * Luettelo lukuina: kaikki laudan unohdetut aarteet ja niistä
   * löytyneet.
   *
   * LUETTELO ON MANNERKOHTAINEN (omistajan päätös 11.8.2026):
   * jokaisella seitsemällä mantereella on oma unohdettu aarteensa, ja
   * mannerTypes kertoo kunkin nimen. Muilla laudoilla — ja vanhoissa
   * yhden tähden tallennuksissa — mannerTypes puuttuu, jolloin luettelo
   * palaa vanhaan muotoonsa lautojen omista aarteista.
   *
   * Löytyneet luetaan maailman kirjanpidosta, joten moninpelissä
   * luettelo näyttää koko seurueen saaliin — luettelo on Aarnin, ei
   * yhden matkaajan.
   *
   * Sama laskenta palvelee luetteloa, Game Centerin saavutuksia ja
   * jaettavaa matkan yhteenvetoa, joten se asuu yhdessä paikassa.
   */
  aarreLuettelo() {
    const { game } = this;
    const mannerTypes = game.pack?.tokens?.mannerTypes;
    const kaikki = mannerTypes
      ? Object.entries(mannerTypes)
        .map(([manner, types]) => ({ manner, aarre: types?.star }))
        .filter((rivi) => rivi.aarre?.name)
      : PACKS.map((pakkaus) => ({ manner: pakkaus.id, aarre: pakkaus.tokens?.types?.star }))
        .filter((rivi) => rivi.aarre?.name);
    const loytyneet = game.world?.starsFound ?? new Map();
    return {
      kaikki,
      loydetyt: kaikki.filter((rivi) => loytyneet.has(rivi.manner)).map((rivi) => rivi.aarre),
    };
  }

  renderAarteet() {
    if (!this.passportAarteet) return;
    this.passportAarteet.textContent = '';

    /*
     * VAIN LÖYTYNEET NIMELTÄ, LOPUT LUKUNA.
     *
     * Ensin tässä luki koko luettelo rivi riviltä, ja jokaisen perässä
     * "KATEISSA". Se oli sekä spoileri että tautologiaa: luettelo
     * paljasti kaikki yksitoista nimeä ennen kuin pelaaja oli löytänyt
     * yhtään, ja "kateissa" toisti sen minkä himmennys jo kertoi.
     * Omistaja: "laita vain että kateissa: (määrä) — vasta sitten kun
     * jotain löytyy, niin sen nimi tulee Aarnin luetteloon."
     *
     * Nyt luettelo täyttyy matkan mukana, kuten Aarnin oma luettelo
     * täyttyi. Kateissa-luku kertoo silti kuinka pitkä matka on jäljellä.
     */
    const { kaikki, loydetyt } = this.aarreLuettelo();

    for (const aarre of loydetyt) {
      const rivi = html('div', 'aarre-rivi loytynyt');
      const merkki = html('span', 'aarre-merkki');
      // ◈ on pelin oma aarremerkki (docs: laatan ja nappulan merkki).
      merkki.textContent = '◈';
      rivi.appendChild(merkki);
      rivi.appendChild(html('span', 'aarre-nimi', aarre.name));
      rivi.appendChild(html('span', 'aarre-tila', 'löytyi'));
      this.passportAarteet.appendChild(rivi);
    }

    const kateissa = Math.max(0, kaikki.length - loydetyt.length);
    const rivi = html('div', 'aarre-rivi aarre-kateissa');
    rivi.appendChild(html('span', 'aarre-nimi', 'Kateissa'));
    rivi.appendChild(html('span', 'aarre-luku', String(kateissa)));
    this.passportAarteet.appendChild(rivi);
  }

  /*
   * LAUKKU AUKEAA PILLERIN ALLE (omistaja 5.8.2026: "eikös tämä
   * matkalaukku pitänyt aueta suoraan tuon pillerin alapuolelle").
   *
   * <dialog> keskittää itsensä ruudulle, eikä sitä voi asemoida
   * pelkällä CSS:llä sen napin suhteen, joka sen avasi — nappi on
   * ylärivissä ja dialogi on ylimmässä kerroksessa, eivätkä ne ole
   * sukua toisilleen. Paikka lasketaan siis avattaessa.
   *
   * Vasen reuna kohdistetaan pilleriin mutta pidetään ruudulla: kapealla
   * puhelimella kortti on lähes ruudun levyinen, ja pilleriin
   * kohdistettuna sen oikea laita valuisi yli.
   */
  asemoiLaukku() {
    const kortti = this.passportDialog?.querySelector('.dialog-card');
    if (!kortti || !this.turnPill) return;
    const pilleri = this.turnPill.getBoundingClientRect();
    if (!pilleri.width) return;
    const VARA = 8;
    const leveys = kortti.getBoundingClientRect().width || kortti.offsetWidth;
    const suurinVasen = Math.max(VARA, window.innerWidth - leveys - VARA);
    const vasen = Math.min(Math.max(VARA, pilleri.left), suurinVasen);
    /*
     * KIINNI YLÄPALKKIIN, EI PILLERIN ALLE VÄLIN PÄÄHÄN.
     *
     * Omistaja: "laukun yläreunan voisi ottaa kokonaan pois, niin että
     * näyttäisi että laukku aukeaa suoraan yläpalkista." Rako palkin ja
     * kortin välissä tekisi siitä ponnahdusikkunan; kiinni oleva lukee
     * laatikoksi, joka vedetään ulos palkista. Yläreunus ja yläkulmien
     * pyöristys ovat pois CSS:ssä samasta syystä.
     */
    const palkki = document.querySelector('.topbar')?.getBoundingClientRect();
    const ylin = palkki?.bottom ?? pilleri.bottom;
    this.passportDialog.style.left = `${Math.round(vasen)}px`;
    this.passportDialog.style.top = `${Math.round(ylin)}px`;
    this.passportDialog.classList.add('pillerin-alla');
  }

  /**
   * Matkasaalis passissa: unohdetut aarteet, mantereen aarteet ja
   * paikallisaarteet. Nämä näkyivät ennen erillisessä
   * pelaajapaneelissa, joka vei tilaa kartalta.
   */
  renderFinds() {
    const { game } = this;
    const p = game.player;
    this.passportFinds.textContent = '';

    const rivi = (icon, text) => {
      const row = html('div', 'find');
      row.appendChild(icon);
      row.appendChild(html('span', 'find-text', text));
      this.passportFinds.appendChild(row);
    };

    // Isommat kuvat ja selite alla — tavarat kuin matkamuistohyllyllä
    // (omistajan toive).
    /*
     * Unohdetut aarteet omina riveinään: jokaisella mantereella on oma
     * aarteensa, joten yksi rivi ei enää riitä. Manner luetaan
     * findManner-listasta, joka kulkee finds-listan rinnalla samoin
     * indeksein — se kertoo mistä KUKIN tähti löytyi, myös silloin kun
     * pelaajalla on niitä useita.
     */
    p.finds.forEach((type, i) => {
      if (type !== 'star') return;
      const tahti = game.aarreMantereella('star', p.findManner?.[i] ?? null);
      rivi(aarreIkoni(tahti, 'star', 44), tahti.name);
    });

    /*
     * Muut aarteet omina riveinään. Ryhmittely tehdään VALMIIN NIMEN
     * mukaan, koska sama laattatyyppi on eri paikoissa eri aarre:
     * mantereen aarre vaihtuu mantereittain (findManner) ja
     * paikallisaarre maittain (findMaa). Kummankin listan alkiot
     * kulkevat finds-listan rinnalla samoin indeksein; vanhan
     * tallennuksen löydöillä ne ovat null, jolloin laudan oma tyyppi
     * ja yleinen varanimi kelpaavat.
     */
    const counts = new Map();
    p.finds.forEach((type, i) => {
      if (type === 'star' || !onAarre(type)) return;
      const token = game.aarreMantereella(type, p.findManner?.[i] ?? null, p.findMaa?.[i] ?? null);
      const rivit = counts.get(token.name) ?? { type, token, n: 0 };
      rivit.n++;
      counts.set(token.name, rivit);
    });
    for (const { type, token, n } of counts.values()) {
      rivi(aarreIkoni(token, type, 44), `${token.name}${n > 1 ? ` ×${n}` : ''}`);
    }

    /*
     * VARUSTEET EIVÄT OLE ENÄÄ TAVAROISSA (omistaja 18.8.2026:
     * "Varusteet ovat nyt kahteen kertaan. Nuo graafisemmat ovat
     * parempia."). Linssit näkyivät tässä näyttölistana JA alempana
     * Varusteet-osaston kytkiminä; nyt ne piirtyvät vain kytkiminä,
     * samoilla varustekuvilla (rakennaLinssivalikko).
     *
     * Tyhjän laukun viesti katsoo siksi myös omistetut linssit:
     * pelkkien linssien kanssa "Laukku on vielä tyhjä" valehtelisi,
     * koska varusteet ovat laukussa heti listan alla. Silloin todetaan
     * vain, ettei aarteita vielä ole. Omistus luetaan omistus.js:stä
     * (passin leimat + kehittäjätila), ei pelkästä p.linssit-kentästä.
     */
    if (!this.passportFinds.childElementCount) {
      const omat = this.linssiTuki?.omistus?.omistetut?.(game, p) ?? new Set(p.linssit ?? []);
      const teksti = omat.size ? 'Ei vielä matkalöytöjä.' : 'Laukku on vielä tyhjä.';
      this.passportFinds.appendChild(html('p', 'muted', teksti));
    }
  }

  /**
   * JULISTERIVI MATKALAUKUSSA (omistajan tilaus 22.8.2026: "Julisteet
   * voisi olla oma rivi laukussa mutta kuvakkeet todella pieniä, sama
   * korkeus kuin tekstillä ja näkyisi vain kolme viimeisintä. Perässä
   * olisi numeromäärä ja >> merkki.").
   *
   * TILAUS KUMOAA 21.8.2026 TEHDYN RUUDUKON. Siinä laukussa oli
   * otsikkorivi, kaikki voitetut pikkuvedokset ja loput himmeinä
   * ?-paikkoina — eli osasto kasvoi sitä pidemmäksi mitä paremmin peli
   * sujui, ja loppupelissä se peitti laukun muun sisällön. Nyt rivi on
   * aina yhtä korkea: kolme tuoreinta vedosta tekstirivin korkuisina,
   * perässä määrä ja ». Kaikki muu — myös voittamattomat paikat —
   * asuu gallerian sisällä (avaaJulisteGalleria).
   *
   * TUOREIN ENSIN: game.julisteet on Set, johon myönnöt lisätään
   * voittohetkellä (js/game.js myonnaJuliste), joten listan loppupää on
   * tuorein. Siksi kolme viimeistä otetaan lopusta ja käännetään.
   *
   * RIVI ON PIILOSSA ENNEN ENSIMMÄISTÄ JULISTETTA. Vaihtoehto olisi
   * himmeä "Julisteet 0/15 »", joka avaisi gallerian pelkkine
   * lukkopaikkoineen, mutta valinta on piilotus samasta syystä kuin
   * Varusteet-osastolla: tyhjä osasto kertoisi pelaajalle vain sen,
   * mitä hänellä ei ole. Galleria ei jää saavuttamattomaksi —
   * ensimmäinen juliste tulee lehden minitehtävästä, ja juuri se
   * paljastaa rivin.
   */
  /**
   * Voitettujen julisteiden lista rivin ja gallerian tarpeisiin.
   * KEHITTÄJÄTILASSA KAIKKI JULISTEET NÄKYVÄT VOITETTUINA (omistajan
   * tilaus 22.8.2026: "Laita kaikki julisteet matkalaukkuun kun
   * kehittäjä tila") — koko kokoelman voi katselmoida pelaamatta
   * minitehtäviä. Pelitilaan (game.julisteet) ei kosketa: tämä on
   * pelkkä näkymä, ja kehittäjätilan sammuttaminen palauttaa oikean
   * tilanteen.
   */
  julisteVoitot() {
    if (this.kehittajaTila) return Object.keys(JULISTEET);
    return [...(this.game.julisteet ?? [])].filter((id) => JULISTEET[id]);
  }

  renderJulisteet() {
    if (!this.julisteKotelo || !this.passportJulisteet) return;
    const voitetut = this.julisteVoitot();
    this.julisteKotelo.hidden = voitetut.length === 0;
    if (!voitetut.length) return;
    const kaikki = Object.keys(JULISTEET).length;
    const rivi = this.passportJulisteet;
    rivi.replaceChildren();
    rivi.setAttribute('aria-label',
      `Julisteet: ${voitetut.length}/${kaikki} voitettu — avaa julistegalleria`);
    rivi.appendChild(html('span', 'laukku-julisterivi-nimio', 'Julisteet'));
    const vedokset = html('span', 'laukku-julisterivi-vedokset');
    for (const cityId of voitetut.slice(-3).reverse()) {
      const kuva = document.createElement('img');
      kuva.decoding = 'async';
      kuva.alt = '';
      // Puuttuva tiedosto (ämpärivienti kesken) vie vain vedoksen:
      // rivi, luku ja galleria jäävät paikoilleen.
      asetaKuva(kuva, julisteUrl(JULISTEET[cityId].tiedosto), null, () => kuva.remove());
      vedokset.appendChild(kuva);
    }
    rivi.appendChild(vedokset);
    rivi.appendChild(html('span', 'laukku-julisterivi-luku', `${voitetut.length}/${kaikki} »`));
  }

  /**
   * JULISTEGALLERIA (omistajan tilaus 22.8.2026: "Riviä klikkaamalla
   * aukeaisi oma juliste popup galleria jossa julisteet vähän
   * isommalla maanosien mukaan jaoteltuna ja klikattavissa täyteen
   * kokoon kuvagalleriaksi").
   *
   * Galleria elää samassa kerroksessa kuin muutkin laukun päälle
   * avautuvat popupit: isäntä on päällimmäinen avoin dialogi
   * (suurennosIsanta), koska modaali <dialog> on selaimen top
   * layerissa eikä sen päälle pääse z-indexillä ulkopuolelta. Oma
   * huntu kortin alle, rasti ja Escape sulkevat.
   *
   * Kerroksia on kaksi: galleria (z 66) ja sen päälle avautuva täysi
   * koko (kulttuurisuurennos, z 70). Escape purkaa ne oikeassa
   * järjestyksessä ilman erillistä pinologiikkaa: gallerian kuuntelija
   * väistää, jos suurennos on auki, ja suurennoksen oma kuuntelija
   * sulkee sen ensin.
   */
  avaaJulisteGalleria() {
    this.suljeJulisteGalleria();
    // Kehittäjätilassa koko kokoelma on auki (ks. julisteVoitot).
    const voitetut = new Set(this.julisteVoitot());
    const ryhmat = julisteMantereet();
    const kortti = html('div', 'julistegalleria');
    kortti.setAttribute('role', 'dialog');
    kortti.setAttribute('aria-label', 'Julistekokoelma');
    const ylapalkki = html('div', 'julistegalleria-ylapalkki');
    ylapalkki.appendChild(html('h2', 'julistegalleria-otsikko', 'Julisteet'));
    ylapalkki.appendChild(html('span', 'julistegalleria-luku',
      `${voitetut.size}/${Object.keys(JULISTEET).length}`));
    const rasti = html('button', 'julistegalleria-rasti', '×');
    rasti.type = 'button';
    rasti.setAttribute('aria-label', 'Sulje julistegalleria');
    rasti.addEventListener('click', () => this.suljeJulisteGalleria());
    ylapalkki.appendChild(rasti);
    kortti.appendChild(ylapalkki);
    /*
     * Täyden koon selailu seuraa gallerian omaa järjestystä (maanosa
     * kerrallaan): nuoli vie siihen julisteeseen, joka on ruudulla
     * seuraavana, eikä johonkin muuhun voittojärjestykseen.
     */
    const selattavat = ryhmat.flatMap((r) => r.kaupungit.filter((id) => voitetut.has(id)));
    const teokset = selattavat.map((cityId) => ({
      otsikko: JULISTEET[cityId].otsikko,
      selite: JULISTEET[cityId].selite,
      lahde: JULISTE_LAHDE,
      // Valmis osoite ohittaa Commons-portaikon (ks. naytaKulttuuriKuva).
      osoite: julisteUrl(JULISTEET[cityId].tiedosto),
    }));
    for (const ryhma of ryhmat) {
      const osio = html('section', 'julistegalleria-ryhma');
      const saatu = ryhma.kaupungit.filter((id) => voitetut.has(id)).length;
      osio.appendChild(html('h3', 'julistegalleria-ryhma-otsikko',
        `${ryhma.nimi} ${saatu}/${ryhma.kaupungit.length}`));
      const ruudukko = html('div', 'julistegalleria-ruudukko');
      for (const cityId of ryhma.kaupungit) {
        /*
         * Voittamaton paikka näkyy himmeänä kysymysmerkkinä omassa
         * ryhmässään: kokoelma kertoo että sitä voi täydentää ja mistä
         * päin maailmaa, muttei sitä mistä kaupungista — sama linjaus
         * kuin Aarnin luettelossa.
         */
        if (!voitetut.has(cityId)) {
          const lukossa = html('div', 'julistegalleria-vedos lukossa', '?');
          lukossa.setAttribute('aria-hidden', 'true');
          ruudukko.appendChild(lukossa);
          continue;
        }
        const juliste = JULISTEET[cityId];
        const nappi = html('button', 'julistegalleria-vedos');
        nappi.type = 'button';
        nappi.setAttribute('aria-label', `${juliste.otsikko} — katso juliste isona`);
        const kuva = document.createElement('img');
        kuva.decoding = 'async';
        kuva.alt = '';
        // Viemättä oleva tiedosto jättää nimen ja kehyksen paikalleen,
        // jottei ryhmästä katoaisi kokonainen ruutu.
        asetaKuva(kuva, julisteUrl(juliste.tiedosto), null, () => {
          kuva.remove();
          nappi.classList.add('kuvaton');
        });
        nappi.appendChild(kuva);
        nappi.appendChild(html('span', 'julistegalleria-nimi', juliste.kaupunki));
        const kohdalla = selattavat.indexOf(cityId);
        nappi.addEventListener('click', () => {
          sfx.play('paper');
          this.naytaKulttuuriKuva(teokset[kohdalla], { teokset, kohdalla });
        });
        ruudukko.appendChild(nappi);
      }
      osio.appendChild(ruudukko);
      kortti.appendChild(osio);
    }
    const huntu = html('div', 'julistegalleria-huntu');
    huntu.addEventListener('click', () => this.suljeJulisteGalleria());
    const nappaimet = (e) => {
      if (e.key !== 'Escape') return;
      // Täysi koko on kerrosta ylempänä ja sulkee itsensä omalla
      // kuuntelijallaan — galleria odottaa vuoroaan.
      if (this.lehtitila.kulttuuriKuvaEl) return;
      e.preventDefault();
      e.stopPropagation();
      this.suljeJulisteGalleria();
    };
    const isanta = this.suurennosIsanta();
    isanta.appendChild(huntu);
    isanta.appendChild(kortti);
    document.addEventListener('keydown', nappaimet, { capture: true });
    this.julisteGalleria = { kortti, huntu, nappaimet };
    rasti.focus({ preventScroll: true });
  }

  /** Sulkee julistegallerian ja purkaa sen näppäinkuuntelijan. */
  suljeJulisteGalleria() {
    const auki = this.julisteGalleria;
    if (!auki) return;
    this.julisteGalleria = null;
    auki.kortti.remove();
    auki.huntu.remove();
    document.removeEventListener('keydown', auki.nappaimet, { capture: true });
  }

  /**
   * Nimikilpi laukun alalaidasta: pelin tekijänoikeus, tekijätiedot ja
   * luettelo kaikista aineistoista, joista peli on koottu.
   *
   * Sisältö rakennetaan VASTA ensimmäisellä avauksella ja jää sitten
   * paikoilleen. Rivejä on toista sataa, eikä useimmilla pelikerroilla
   * ikkunaa avata lainkaan — sama päätös kuin päivityslokissa
   * (js/main.js avaaMuutokset).
   */
  avaaLahteet() {
    if (!this.lahteetDialog || !this.lahteetSisus) return;
    if (!this.lahteetRakennettu) {
      const sisus = this.lahteetSisus;
      sisus.replaceChildren();

      sisus.appendChild(html('p', 'lahteet-alaotsikko', PELI.englanniksi));
      sisus.appendChild(html('p', 'lahteet-copyright', PELI.copyright));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.tekija));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.apu));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.ehdot));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.johdanto));

      sisus.appendChild(html('h3', 'lahteet-otsikko', 'Lähteet ja aineistot'));
      sisus.appendChild(html('p', 'lahteet-teksti', PELI.kolmannet));

      for (const ryhma of LAHTEET) {
        sisus.appendChild(html('h4', 'lahteet-ryhma', ryhma.otsikko));
        if (ryhma.johdanto) {
          sisus.appendChild(html('p', 'lahteet-ryhma-johdanto', ryhma.johdanto));
        }
        const lista = html('ul', 'lahteet-lista');
        for (const rivi of ryhma.rivit) {
          const kohta = html('li');
          kohta.appendChild(html('span', 'lahteet-nimi', rivi.nimi));
          if (rivi.tekija) kohta.appendChild(html('span', 'lahteet-tekija', rivi.tekija));
          /*
           * Kirjaamaton lisenssi merkitään näkyvästi eikä jätetä pois.
           * Tyhjä kohta luettaisiin "ei ehtoja", ja se olisi juuri
           * väärä johtopäätös — epäselvyyden pitää näkyä.
           */
          kohta.appendChild(html(
            'span',
            rivi.lisenssi ? 'lahteet-lisenssi' : 'lahteet-lisenssi epaselva',
            rivi.lisenssi ?? 'Lisenssi epäselvä',
          ));
          if (rivi.huom) kohta.appendChild(html('span', 'lahteet-huom', rivi.huom));
          lista.appendChild(kohta);
        }
        sisus.appendChild(lista);
      }

      sisus.appendChild(html('p', 'lahteet-lopetus',
        `${LAHTEITA} aineistoa. Yksittäisen valokuvan, äänitteen ja väitteen `
        + 'oma lähde näkyy siinä kohdassa peliä, jossa se esitetään.'));
      this.lahteetRakennettu = true;
    }
    if (!this.lahteetDialog.open) this.lahteetDialog.showModal();
    this.nollaaDialoginVieritys(this.lahteetDialog);
  }

  // --- linssit: valitsin, kerros ja selitekortti -----------------------------

  /**
   * Linssikoneisto tuodaan DYNAAMISESTI ja tarkalleen kerran.
   *
   * Staattinen tuonti kaataisi yhden tiedoston version kokoajan
   * (tools/build-standalone.mjs vaatii jokaisen from-tuonnin
   * MODULES-listalleen, eivätkä linssit kuulu sinne — suunnitelman luku
   * 2.1). Samalla tämä pitää pelin käynnistyksen ennallaan: linssien
   * metatiedot ovat kilotavuja, ja raskas aineisto haetaan vasta kun
   * linssi sytytetään.
   *
   * Epäonnistuminen ei ole virhe vaan hyväksytty raja: yhden tiedoston
   * versiossa linssejä ei ole, ja silloin koko valitsin jää pois.
   */
  /**
   * Maailmanradion moduuli. OMA laiska tuontinsa eikä osa
   * lataaLinssit():ia: jos radio ei lataudu (yhden tiedoston versio),
   * muiden linssien pitää silti toimia.
   */
  lataaRadio() {
    if (!this.radioLataus) {
      this.radioLataus = import('./linssit/radio.js')
        .then((moduuli) => { this.radioModuuli = moduuli; return moduuli; })
        .catch((syy) => {
          console.warn('Maailmanradiota ei voitu ladata; linssi jää pois.', syy);
          return null;
        });
    }
    return this.radioLataus;
  }

  /*
   * Erillistä X-nappia EI ole.
   *
   * Sellainen oli hetken ruudun oikeassa yläkulmassa, mutta soittimessa
   * on jo virtakytkin, joka sammuttaa koko radiotilan (onSulje).
   * Omistaja 4.8.2026: "Poista myös yläreunan x. Riittää kun radiosta
   * saa suljettua." Kaksi sulkutapaa samalle tilalle on yksi liikaa, ja
   * kytkin on se, joka kuuluu laitteeseen.
   */

  /** Onko radiotila päällä? Synkroninen: piirto kysyy tätä. */
  radioPaalla() {
    return this.radioModuuli?.paalla() === true;
  }

  /**
   * Kytkee maailmanradion päälle tai pois.
   *
   * Kutsutaan joka kerta kun linssi sytytetään, myös kun sama linssi
   * sytytetään uudelleen. Se on turvallista: moottori sammuttaa aina
   * ensin, ja paalle() purkaa vielä itsekin vanhan tilan.
   */
  async tahdistaRadio(halutaan) {
    const radio = await this.lataaRadio();
    if (!radio || this.dead) return;
    if (halutaan) {
      // Kertoja vaikenee radion tieltä. Radio sulkee itse kaupungin
      // äänimaiseman, mutta se ei tunne luentaa eikä voi tuoda ui.js:ää.
      stopDiaryVoice(this);
      /*
       * Radiotilassa ruudulla on vain kartta ja soitin.
       *
       * Omistajan toive 4.8.2026: "Piilota Matkakirja ja alanapit radion
       * ollessa käytössä. Poista myös yläreunan x. Riittää kun radiosta
       * saa suljettua."
       *
       * Radiotilassa peli on tauolla: matkustustavan valinta ja
       * matkakirjan kortti eivät koske mihinkään, mitä radiossa voi
       * tehdä. Piilotus tehdään bodyn luokalla eikä elementti kerrallaan,
       * jotta se purkautuu varmasti myös silloin kun radio sammuu
       * omalta puoleltaan.
       */
      document.body.classList.add('radio-tila');
      radio.paalle({
        map: this.game.pack.map,
        kaupungit: this.game.board.cities,
        juuri: document.body,
        aani: this.radioAani,
        // Soittimen asteikko keskittyy siihen, missä pelaaja seisoo,
        // kunnes ensimmäinen kanava valitaan.
        sijainti: this.game.player?.pos?.city ?? null,
        // Soittimen virtakytkin (OFF) sammuttaa koko radiotilan, ei vain
        // laitetta: radio ei tunne linssivalikkoa eikä saa tuntea.
        onSulje: () => this.valitseLinssi(null),
        onMuutos: (tilanne) => {
          this.radioAani = tilanne.aani;
          // Soivan kaupungin napin ulkoasu päivittyy vain näin.
          if (!this.dead) this.drawTargets();
        },
      });
    } else {
      /*
       * X-nappi katoaa aina, myös silloin kun radiotila on jo purettu
       * omalta puoleltaan (soittimen OFF-kytkin ehtii kutsua pois():n
       * ennen kuin linssi sammuu). Ehdon sisällä nappi jäisi ruudulle
       * yksin sulkemaan tilaa, joka on jo suljettu.
       */
      document.body.classList.remove('radio-tila');
      if (radio.paalla()) {
        radio.pois();
        // Radio ei tiedä kaupunkia eikä maisematyyppiä, joten kaupungin
        // oma äänimaisema palautetaan täältä.
        this.syncAmbience();
      }
    }
    this.drawTargets();
  }

  lataaLinssit() {
    if (!this.linssiLataus) {
      this.linssiLataus = (async () => {
        try {
          const [kerros, omistus] = await Promise.all([
            import('./linssit/kerros.js'),
            import('./linssit/omistus.js'),
          ]);
          const tuki = {
            kerros,
            omistus,
            /*
             * Moottorille annetaan oma kerroksen hakija.
             *
             * Oletushakija etsii kerroksen documentista, jolloin kuollut
             * käyttöliittymä voisi kirjoittaa seuraavan pelin kerrokseen
             * — kesken jäänyt rasterointi valmistuu vasta uuden pelin
             * alettua. Tämä hakija palauttaa null heti kun instanssi on
             * kuollut, ja seuraa muuten drawBoardin luomaa uutta ryhmää.
             */
            moottori: new kerros.Linssikerros(() => (this.dead ? null : this.linssiKerros ?? null)),
            kaikki: await kerros.haeKaikki(),
          };
          this.linssiTuki = tuki;
          return tuki;
        } catch (syy) {
          console.warn('Linssejä ei voitu ladata; valitsin jää pois.', syy);
          return null;
        }
      })();
    }
    return this.linssiLataus;
  }

  /**
   * Linssit, jotka pelaaja omistaa ja jotka pätevät tälle laudalle.
   *
   * Löytämätön linssi ei näy valitsimessa edes harmaana: valikko
   * kertoisi muuten suoraan, montako on vielä löytämättä ja mistä.
   */
  nakyvatLinssit(tuki) {
    const omat = tuki.omistus.omistetut(this.game, this.game.player);
    return tuki.kaikki.filter((linssi) => omat.has(linssi.tunnus)
      && tuki.kerros.kelpaaLaudalle(linssi, this.game.pack.id)
      && !this.linssiPois.has(linssi.tunnus));
  }

  /**
   * Valitsimen ja kerroksen tahdistus. Kutsutaan joka renderissä, mutta
   * valikko rakennetaan vain kun valikoima oikeasti muuttuu: löydetty
   * linssi ilmestyy itsestään eikä välissä tehdä turhaa työtä.
   */
  async paivitaLinssit() {
    const tuki = await this.lataaLinssit();
    if (!tuki || this.dead || !this.linssiKotelo) return;
    // Laudan vaihto antaa uuden mahdollisuuden niille linsseille, joilla
    // ei ollut edelliselle laudalle mitään näytettävää: pudotus koski
    // lautaa eikä linssiä.
    if (this.linssiLauta !== this.game.pack.id) {
      this.linssiLauta = this.game.pack.id;
      this.linssiPois.clear();
    }
    const nakyvat = this.nakyvatLinssit(tuki);
    this.linssiKotelo.hidden = nakyvat.length === 0;

    const tunniste = `${this.game.pack.id}|${nakyvat.map((l) => l.tunnus).join(',')}`;
    if (tunniste !== this.linssiTunniste) {
      this.linssiTunniste = tunniste;
      this.rakennaLinssivalikko(nakyvat);
    }

    // Omistamaton tai tuntematon tallennettu valinta ohitetaan hiljaa
    // (suunnitelman luku 5.3): tallennus voi olla toiselta pelikerralta.
    const haluttu = nakyvat.some((l) => l.tunnus === this.linssiValittu) ? this.linssiValittu : null;
    /*
     * Lauta piirretään uudelleen monesta syystä (uusi peli, laudan
     * vaihto, kehittäjätilan esikatselu), ja silloin kerros on uusi ja
     * tyhjä. Moottori ei kuuntele karttaa, joten linssi on sytytettävä
     * tässä uudelleen — muuten se katoaisi ilman yhtään virhettä.
     */
    if (haluttu !== tuki.moottori.tunnus || this.linssiKerros !== this.linssiPiirretty) {
      await this.sytytaLinssi(haluttu);
    }
  }

  /** Sytyttää linssin kartalle; tunnus === null sammuttaa. */
  async sytytaLinssi(tunnus) {
    const tuki = await this.lataaLinssit();
    if (!tuki || this.dead) return;
    const askel = tunnus ? this.linssiAskeleet.get(tunnus) ?? null : null;
    let tulos = null;
    try {
      tulos = await tuki.moottori.vaihda(tunnus, tuki.kerros.linssitila(this.game.pack, askel));
    } catch (syy) {
      /*
       * Moottori heittää sopimusrikkeestä tarkoituksella: se on aina
       * linssimoduulin oma vika ja se pitää nähdä. Peli ei silti saa
       * kaatua siihen — rikkinäinen linssi pudotetaan valikoimasta ja
       * kartta jää entiselleen.
       */
      console.error(syy);
      this.pudotaLinssi(tunnus);
      return;
    }
    if (this.dead) return;
    this.linssiPiirretty = this.linssiKerros;
    if (tulos === false) {
      // Linssillä ei ollut tälle laudalle mitään näytettävää.
      this.pudotaLinssi(tunnus);
      return;
    }
    // Maailmanradio ei ole karttakerros vaan kartan TILA: moottori
    // merkitsi linssin vain valituksi (kerros: false), ja tila
    // kytketään tässä.
    await this.tahdistaRadio(tunnus === 'radio');
    if (this.dead) return;
    // Vertailulinssi on radion tavoin kartan TILA eikä karttakerros
    // (kerros: false) — se kytketään tässä samalla tavalla.
    tahdistaVertailu(this, tunnus === 'vertailu');
    if (this.dead) return;
    // Maiden tiedot on samaa perhettä: kartan tila, ei kerros. Tila
    // voi olla päällä myös kartan omasta napista, joten varusteen
    // vaihto ei saa sammuttaa sitä yksin (ks. maatiedotHalutaan).
    tahdistaMaatiedot(this, this.kartta.maatiedotHalutaan());
    if (this.dead) return;
    this.kartta.paivitaMaalehtiNappi();
    this.paivitaLinssiNappi();
    this.paivitaLinssiTiedot();
    this.piirraLinssiSelite();
    /*
     * Jokien nimet kuuluvat vesistölinssiin mutta asuvat kartan omassa
     * nimikerroksessa (js/mapart.js drawMaastonimet). Kerros piirtää
     * uudelleen vain kun näkymä muuttuu, eikä linssin vaihto liikuta
     * karttaa — muistettu tunniste on siis nollattava käsin, tai nimet
     * ilmestyisivät vasta seuraavasta panoroinnista.
     */
    this.maastonimiTunniste = null;
    this.paivitaMaastonimet();
  }

  /** Ottaa linssin pois valikoimasta ja palaa linssittömään karttaan. */
  pudotaLinssi(tunnus) {
    if (tunnus) this.linssiPois.add(tunnus);
    this.linssiValittu = null;
    tallennaLinssi(null);
    this.linssiTunniste = null;
    this.linssiPiirretty = null;
    void this.paivitaLinssit();
  }

  /** Valitsimen rivin napautus. tunnus === null = "Ei linssiä". */
  valitseLinssi(tunnus) {
    if (this.linssiValittu === tunnus) return;
    this.linssiValittu = tunnus;
    tallennaLinssi(tunnus);
    // Merkintä valikkoon heti, kerros hetkeä myöhemmin: raskas linssi
    // rasteroidaan, eikä napin pidä odottaa sitä näyttääkseen valinnan.
    this.paivitaLinssiTiedot();
    void this.sytytaLinssi(tunnus);
  }

  /*
   * Valitsin on päävalikossa auki valmiiksi eikä sitä enää avata tai
   * suljeta erikseen. Metodit jäivät tyhjinä, koska niitä kutsutaan
   * useammasta paikasta — sulkupyyntö on nyt kohteeton mutta ei virhe.
   */
  avaaLinssivalikko() {}

  suljeLinssivalikko() {}

  /**
   * Valitsimen sisältö: varustekuvien ruudukko ja sen alla valitun
   * linssin nimi ja yhden rivin kuvaus.
   *
   * KUVAT VIIVAKUVAKKEIDEN TILALLE (omistaja 18.8.2026: "Nuo
   * graafisemmat ovat parempia. Varusteista voisi ottaa selitystekstit
   * pois. Varustetta klikkaamalla kuitenkin alas tulee teksti siitä,
   * mitä ne tekevät."). Napit ovat samoja pyöreitä varustekuvia kuin
   * Tavarat-listalla ennen ollut näyttörivi — nimi ei ole kuvan alla
   * vaan tulee valittaessa tietolohkoon (paivitaLinssiTiedot).
   *
   * Rooli on aria-pressed eikä role="tab" — role="tab" lupaa
   * nuolinäppäinnavigoinnin, jota tässä pelissä ei ole yhdessäkään
   * liuskarivissä (suunnitelman luku 5.2).
   */
  rakennaLinssivalikko(linssit) {
    if (!this.linssiValikko) return;
    this.linssiValikko.replaceChildren();
    // Vanha tietolohko jäi irralleen puusta: viittaus siihen kirjoittaisi
    // näkymättömään elementtiin.
    this.linssiTiedot = null;
    if (!linssit.length) return;

    const liuskat = html('nav', 'linssi-liuskat');
    liuskat.setAttribute('role', 'group');
    liuskat.setAttribute('aria-label', 'Linssit');
    // "Ei linssiä" on aina ensimmäisenä: paluu tavalliseen karttaan on
    // yhtä lähellä kuin linssin valinta.
    liuskat.appendChild(this.linssiLiuska(null, 'Ei linssiä'));
    for (const linssi of linssit) {
      liuskat.appendChild(this.linssiLiuska(linssi.tunnus, linssi.nimi));
    }
    this.linssiValikko.appendChild(liuskat);
    this.linssiTiedot = html('div', 'linssi-tiedot');
    this.linssiValikko.appendChild(this.linssiTiedot);
    this.paivitaLinssiNappi();
    this.paivitaLinssiTiedot();
  }

  linssiLiuska(tunnus, nimi) {
    const nappi = html('button');
    nappi.type = 'button';
    nappi.dataset.linssi = tunnus ?? '';
    // Nimi jää saavutettavuuteen ja pitkään painallukseen, koska
    // ruudulla näkyy vain kuva ilman nimilappua.
    nappi.title = nimi;
    nappi.setAttribute('aria-label', nimi);
    if (tunnus) {
      // Sama pyöreä rajaus kuin aarteilla; jos kuva ei lataudu,
      // aarreIkoni pudottaa tilalle laattatyypin viivakuvakkeen.
      nappi.appendChild(aarreIkoni({ kuva: `assets/varusteet/varuste-${tunnus}.jpg`, name: nimi }, 'linssi', 64));
    } else {
      // "Ei linssiä" ei ole esine, jolla olisi valokuva: yliviivatut
      // taikalasit pyöreässä kehyksessä pitävät sen samassa rivissä
      // kuvien kanssa mutta selvästi "paljain silmin" -valintana.
      nappi.innerHTML = liuskaIkoniSvg(LINSSI_EI_IKONI, 30);
    }
    nappi.addEventListener('click', () => this.valitseLinssi(tunnus));
    return nappi;
  }

  /** Ylärivin nappi näyttää päällä olevan linssin kuvakkeen. */
  paivitaLinssiNappi() {
    if (!this.linssiNappi || !this.linssiNapinIkoni) return;
    const linssi = this.paallaOlevaLinssi();
    this.linssiNapinIkoni.innerHTML = `<svg viewBox="0 0 24 24">${linssi?.ikoni ?? VIIVA_IKONIT.varusteet}</svg>`;
    this.linssiNappi.title = linssi ? `Linssi: ${linssi.nimi}` : 'Varusteet — valitse linssi kartalle';
    this.linssiNappi.classList.toggle('paalla', Boolean(linssi));
  }

  /** Valittu linssi moduulina, tai null kun karttaa katsotaan paljain silmin. */
  paallaOlevaLinssi() {
    if (!this.linssiValittu) return null;
    return this.linssiTuki?.kaikki.find((l) => l.tunnus === this.linssiValittu) ?? null;
  }

  /** Valittu rivi korostetaan ja sen kuvaus kirjoitetaan rivien alle. */
  paivitaLinssiTiedot() {
    if (!this.linssiValikko) return;
    for (const nappi of this.linssiValikko.querySelectorAll('.linssi-liuskat button')) {
      const paalla = (nappi.dataset.linssi || null) === this.linssiValittu;
      nappi.classList.toggle('paalla', paalla);
      nappi.setAttribute('aria-pressed', String(paalla));
    }
    if (!this.linssiTiedot) return;
    this.linssiTiedot.replaceChildren();
    const linssi = this.paallaOlevaLinssi();
    if (!linssi) {
      this.linssiTiedot.appendChild(html('p', 'linssi-lyhyt', 'Kartta sellaisena kuin isoisä sen piirsi.'));
      return;
    }
    this.linssiTiedot.appendChild(html('h3', 'linssi-nimi', linssi.nimi));
    this.linssiTiedot.appendChild(html('p', 'linssi-lyhyt', linssi.lyhyt));

    /*
     * LÄHDELINKKI POISTETTU VALIKOSTA (omistaja 5.8.2026: "poista myös,
     * mistä tämä tieto on, linkki").
     *
     * Tässä oli nappi, joka avasi aineiston nimen, lisenssin ja
     * hakupäivän. Se oli valikossa väärässä paikassa kahdesta syystä:
     * valikko on säädin eikä lukusali, ja täysleveä tekstinappi rikkoi
     * keskitetyn ladelman.
     *
     * NIMEÄMINEN EI KADONNUT. Molempien nykyisten linssien aineistot
     * (Natural Earth ja ETOPO1) ovat luettelossa js/lahteet.js:ssä, joka
     * aukeaa ylärivin logosta — ja siellä ne ovat täydellisinä
     * merkintöinä lisensseineen. Jos joskus tulee CC BY -aineistoon
     * perustuva linssi, sen nimeäminen kuuluu sinne, ei tähän.
     */
  }

  /**
   * Selitekortti kartan nurkassa: linssin nimi, värilaput selityksineen,
   * mahdolliset askeleet ja lähdemerkintä.
   *
   * Kortti on tavallista DOM:ia kartan päällä eikä SVG:tä, joten
   * napautukset toimivat normaalisti eikä kierron <use>-kopio koske
   * siihen lainkaan.
   */
  piirraLinssiSelite() {
    const linssi = this.paallaOlevaLinssi();
    const kerrosPaalla = !!linssi && linssi.kerros !== false && !this.dead;
    /*
     * Linssin syttyminen kutistaa päiväkirjan yhdelle riville ja
     * sammuminen palauttaa sen (omistajan toive): kartan päällä on
     * silloin kaksi paperia, ja kartan pitää näkyä niiden välistä.
     *
     * Vain vaihtumishetkellä, ei joka piirrolla: selite piirretään
     * uudelleen myös askelvalinnasta ja laudan vaihdosta, eikä pelaajan
     * omaa napautusta saa kumota selän takaa.
     */
    this.linssiKortitPienina ??= false;
    if (kerrosPaalla !== this.linssiKortitPienina) {
      this.linssiKortitPienina = kerrosPaalla;
      this.asetaPaivakirjanKoko(kerrosPaalla);
    }
    // Kerrokseton linssi (radio, tähtitaivas) ei piirrä kartalle mitään,
    // joten sillä ei ole kartalla selitettävää.
    if (!kerrosPaalla) {
      this.suljeLinssiSelite();
      return;
    }
    /*
     * Selite avautuu ja sulkeutuu napauttamalla, ja kutistettuna siitä
     * jää näkyviin vain linssin nimi. Aloitustila on kutistettu: linssin
     * päällä kartta on se, jota katsotaan, ja värilaatikot ovat
     * yhden napautuksen päässä. Valinta säilyy istunnon yli linssistä
     * toiseen, joten kerran avattu selite pysyy auki.
     */
    this.linssiSelitePieni ??= true;
    if (!this.linssiSelite) {
      this.linssiSelite = html('aside', 'linssi-selite');
      // Kartan oma napautuskuuntelija kutistaisi päiväkirjan, ja
      // kortin napit ovat napautuksia varten.
      this.linssiSelite.addEventListener('click', (e) => {
        e.stopPropagation();
        // Otsikkopainike ja askelliuskat hoitavat oman napautuksensa.
        if (e.target.closest('button')) return;
        this.vaihdaLinssiSelite();
      });
      this.mapPane.appendChild(this.linssiSelite);
    }
    const kortti = this.linssiSelite;
    kortti.replaceChildren();
    /*
     * Nimi on oikea painike eikä pelkkä otsikko: kutistettuna se on
     * ainoa näkyvä osa selitteestä, ja aria-expanded kertoo apuvälineelle
     * kumpi tila on päällä. Otsikkotaso säilyy sen ympärillä.
     */
    const otsikko = html('h2');
    const otsikkoNappi = html('button', 'linssi-selite-nappi', linssi.nimi);
    otsikkoNappi.type = 'button';
    otsikkoNappi.addEventListener('click', () => this.vaihdaLinssiSelite());
    otsikko.appendChild(otsikkoNappi);
    kortti.appendChild(otsikko);

    let rivit = [];
    try {
      rivit = linssi.selite?.() ?? [];
    } catch (syy) {
      console.warn(`Linssin "${linssi.tunnus}" selite kaatui.`, syy);
    }
    if (rivit.length) {
      const lista = html('ul', 'linssi-selite-rivit');
      for (const rivi of rivit) {
        const kohta = html('li');
        if (rivi.vari) {
          const lappu = html('span', 'linssi-lappu');
          // Väri tulee aineistosta, joten se asetetaan tyylinä eikä
          // luokkana: luokkia olisi yhtä monta kuin vyöhykkeitä.
          lappu.style.background = rivi.vari;
          kohta.appendChild(lappu);
        }
        kohta.appendChild(html('span', '', rivi.teksti ?? ''));
        lista.appendChild(kohta);
      }
      kortti.appendChild(lista);
    }

    let askeleet = null;
    try {
      askeleet = linssi.askeleet?.() ?? null;
    } catch (syy) {
      console.warn(`Linssin "${linssi.tunnus}" askeleet kaatui.`, syy);
    }
    if (askeleet?.vaihtoehdot?.length) {
      /*
       * Askellus on aina pelaajan komennolla, ei ajastimella. Mitattu:
       * yksikin sykkivä elementti kartan päällä pudottaa ruudunpäivityksen
       * 60:stä 15 kuvaan sekunnissa (js/ui.js 7529–7534) — ja juuri
       * aikajanalinsseillä houkutus animaatioon on suurin.
       */
      const valittu = this.linssiAskeleet.get(linssi.tunnus) ?? askeleet.valittu ?? null;
      if (askeleet.otsikko) kortti.appendChild(html('p', 'linssi-askel-otsikko', askeleet.otsikko));
      const rivi = html('nav', 'linssi-liuskat linssi-askeleet');
      rivi.setAttribute('role', 'group');
      rivi.setAttribute('aria-label', askeleet.otsikko ?? 'Askeleet');
      for (const vaihtoehto of askeleet.vaihtoehdot) {
        const nappi = html('button', '', vaihtoehto.nimi);
        nappi.type = 'button';
        const paalla = vaihtoehto.avain === valittu;
        nappi.classList.toggle('paalla', paalla);
        nappi.setAttribute('aria-pressed', String(paalla));
        nappi.addEventListener('click', () => this.valitseLinssiAskel(linssi.tunnus, vaihtoehto.avain));
        rivi.appendChild(nappi);
      }
      kortti.appendChild(rivi);
    }

    /*
     * Lähdemerkintä EI ole tässä kortissa (omistajan päätös 4.8.2026).
     *
     * Kartan päällä se oli kolmen rivin mittainen aineiston nimi
     * ("NOAA NGDC ETOPO1 … Public domain"), joka vei selitteeltä tilan
     * eikä kertonut pelaajalle mitään siitä, mitä värit tarkoittavat.
     * Merkintä ei silti katoa mihinkään: kaikkien aineistojen lähteet,
     * tekijät ja lisenssit ovat yhdessä paikassa matkalaukun alalaidan
     * "Unohdettu aarre" -ikkunassa (js/lahteet.js) sekä README.md:ssä,
     * ja linssin oma pitkä merkintä on yhä linssivalitsimen "Mistä tämä
     * tieto on?" -napin takana (paivitaLinssiTiedot).
     */
    this.vaihdaLinssiSelite(this.linssiSelitePieni);
    this.sijoitaLinssiSelite();
  }

  /**
   * Selite auki tai kiinni. Ilman argumenttia napautus vaihtaa tilaa;
   * argumentin kanssa tila vain kirjoitetaan uudelleen piirrettyyn
   * korttiin (piirraLinssiSelite rakentaa lapset joka kerta uusiksi).
   */
  vaihdaLinssiSelite(pieni) {
    this.linssiSelitePieni = pieni ?? !this.linssiSelitePieni;
    const kortti = this.linssiSelite;
    if (!kortti) return;
    kortti.classList.toggle('pieni', this.linssiSelitePieni);
    kortti.querySelector('.linssi-selite-nappi')
      ?.setAttribute('aria-expanded', String(!this.linssiSelitePieni));
  }

  suljeLinssiSelite() {
    this.linssiSelite?.remove();
    this.linssiSelite = null;
  }

  /**
   * Selitekortti sille kartan nurkalle, jossa päiväkirja ei ole.
   * Päiväkirja valitsee nurkkansa meren mukaan (placeFactCard); kortti
   * ottaa ensimmäisen vapaan mieluisuusjärjestyksessä, jotta kaksi
   * paperia ei koskaan mene päällekkäin.
   */
  sijoitaLinssiSelite() {
    if (!this.linssiSelite) return;
    const varattu = this.factCard?.dataset.corner ?? 'bl';
    /*
     * Kapealla ruudulla alanurkat ovat toimintokortin käytössä: se on
     * leveydeltään koko ruutu miinus rako. Sama mitta kuin päiväkirjalla
     * (placeFactCard), joten kortit tekevät saman päätöksen samasta
     * syystä — leveällä ruudulla alanurkka on rauhallisin paikka, mutta
     * puhelimella siellä ovat matkustusnapit.
     */
    const leveys = this.mapPane?.getBoundingClientRect().width ?? 0;
    const jarjestys = leveys >= FACT_WIDTH + TURN_WIDTH + 40
      ? ['bl', 'tl', 'br', 'tr']
      // Vasen ylänurkka ennen oikeaa: oikeasta laskeutuu valitsimen
      // paneeli, ja sen alle jäävä kortti näkyisi vasta paneelin
      // sulkeuduttua.
      : ['tl', 'tr', 'br', 'bl'];
    this.linssiSelite.dataset.corner = jarjestys.find((n) => n !== varattu) ?? 'tr';
  }

  /** Aikajanan tai mittarin vaihto: moduulille tieto ja kerros uusiksi. */
  async valitseLinssiAskel(tunnus, avain) {
    this.linssiAskeleet.set(tunnus, avain);
    const linssi = this.linssiTuki?.kaikki.find((l) => l.tunnus === tunnus) ?? null;
    try {
      linssi?.valitseAskel?.(avain);
    } catch (syy) {
      console.warn(`Linssin "${tunnus}" valitseAskel kaatui.`, syy);
    }
    await this.sytytaLinssi(tunnus);
  }

  showWinner() {
    clearTimeout(this.botTimer);
    if (!this.winnerDialog.open) sfx.play('win');
    const w = this.game.winner;
    document.getElementById('winner-title').textContent = `${w.name} voitti!`;
    // Voiton ainoa tie on pääaarre kotiin (js/game.js checkWin).
    this.typeText(
      document.getElementById('winner-text'),
      this.game.pack.texts.winnerStar(w.name, w.money),
      'winner',
    );
    const roamBtn = document.getElementById('winner-roam');
    roamBtn.onclick = () => {
      this.winnerDialog.close();
      this.doAction(() => this.game.continueRoaming());
    };
    // Läpipeluu on saavutus vasta voitossa — ei vaellustilan välietapissa.
    natiiviSaavutus(NATIIVI_SAAVUTUKSET.lapipeluu);
    this.paivitaJakonappi();
    if (!this.winnerDialog.open) this.winnerDialog.showModal();
  }

  /**
   * "Jaa matka" voittoruudussa. Nappi on olemassa vain iOS-kuoressa:
   * selaimessa se pysyy piilossa, koska jakoikkunaa ei ole eikä
   * puolinaista korviketta rakenneta (navigator.share käyttäytyy eri
   * selaimissa eri tavoin, eikä työpöydällä lainkaan).
   */
  paivitaJakonappi() {
    const nappi = document.getElementById('winner-jaa');
    if (!nappi) return;
    if (!natiiviTukee('jako')) {
      nappi.hidden = true;
      return;
    }
    nappi.hidden = false;
    nappi.onclick = () => natiiviJaaTeksti(this.matkanYhteenveto());
  }

  /** Matkan luvut jaettavaan tekstiin: päivät, kaupungit ja aarteet. */
  matkanYhteenveto() {
    const { game } = this;
    // Kaupungit lasketaan kaikista maailmoista: vaeltaja käy monella laudalla.
    let kaupungit = 0;
    for (const maailma of game.worlds?.values?.() ?? []) kaupungit += maailma.visited?.size ?? 0;
    return natiiviMatkaTeksti({
      paivat: game.dayCount(),
      kaupungit,
      aarteet: this.aarreLuettelo().loydetyt.length,
    });
  }

  /**
   * Game Centerin saavutukset pelitilasta.
   *
   * Luetaan piirron yhteydessä eikä löytöhetkellä: löytö voi tulla
   * monta reittiä (visa, kohtaaminen, tapahtumakortti), ja tilasta
   * lukeva tarkistus ei voi jäädä yhdestäkään niistä paitsi. Sama
   * saavutus lähtee silti vain kerran (js/natiivi.js).
   */
  paivitaSaavutukset() {
    // Katselutila on työhuoneen esikatselu eikä pelaajan matka.
    if (this.katselu) return;
    const { kaikki, loydetyt } = this.aarreLuettelo();
    if (loydetyt.length > 0) natiiviSaavutus(NATIIVI_SAAVUTUKSET.ensimmainenAarre);
    if (kaikki.length > 0 && loydetyt.length >= kaikki.length) {
      natiiviSaavutus(NATIIVI_SAAVUTUKSET.kaikkiAarteet);
    }
  }

  // --- tietovisa ----------------------------------------------------------

  /**
   * Vastausnapit rakennetaan vain kun kysymys vaihtuu, ja päivitetään muuten
   * paikallaan. Jos ne rakennettaisiin joka renderillä uudelleen, esiin-
   * liukuva option-in-animaatio alkaisi alusta joka kerta ja koko lista
   * välähtäisi esimerkiksi väärän vastauksen jälkeen.
   */
  syncOptions(data, onPick) {
    if (this.builtOptionsFor !== data) {
      this.builtOptionsFor = data;
      this.optionButtons = data.options.map((text, i) => {
        const btn = html('button', 'quiz-option');
        btn.style.setProperty('--i', String(i));
        /*
         * Valokuvapulma (omistajan tilaus 10.8.2026): vaihtoehto on
         * oikea valokuva piirroksen sijaan. Kuva peilin kautta kuten
         * muutkin; latausvirhe pudottaa kuvan mutta jättää nimen,
         * joten pulmaan voi silti vastata.
         */
        const kuva = data.kuvat?.[i];
        if (kuva) {
          btn.classList.add('kuvallinen');
          const img = document.createElement('img');
          img.className = 'quiz-option-kuva';
          img.alt = kuva.selite ?? '';
          img.draggable = false;
          img.addEventListener('error', () => { img.hidden = true; });
          asetaKuva(img, valokuvaUrl(kuva.tiedosto, 560), valokuvaVara(kuva.tiedosto, 560));
          btn.appendChild(img);
        }
        btn.appendChild(html('span', 'letter', LETTERS[i]));
        btn.appendChild(html('span', 'text', text));
        btn.addEventListener('click', () => {
          if (!btn.disabled) onPick(i);
        });
        return btn;
      });
      this.quizOptions.textContent = '';
      for (const btn of this.optionButtons) this.quizOptions.appendChild(btn);
      // CC-lisenssi vaatii tekijämaininnan: yksi hiljainen rivi
      // vaihtoehtojen alla, sama kaikille kolmelle kuvalle.
      if (data.kuvaLahteet) {
        this.quizOptions.appendChild(html('p', 'quiz-kuvalahteet', data.kuvaLahteet));
      }
    }

    const answered = data.chosen !== null;
    this.optionButtons.forEach((btn, i) => {
      const hidden = data.hidden.includes(i);
      btn.classList.toggle('hidden-option', hidden);
      btn.classList.toggle('correct', answered && i === data.correct);
      btn.classList.toggle('wrong', answered && i === data.chosen && !data.right);
      btn.disabled = hidden || answered || this.game.player.isBot;
    });
  }

  /**
   * Tapahtumakortti: kysymyksen sijaan tapahtuu jotain. Vaikutus kerrotaan
   * kortin lopussa omalla rivillään, jottei pelaajan tarvitse päätellä
   * sääntöä tarinatekstistä.
   */
  renderEvent() {
    const { game } = this;
    const kortti = game.eventCard;
    if (game.phase !== 'event' || !kortti) {
      if (this.eventDialog.open) this.eventDialog.close();
      this.eventShownFor = null;
      return;
    }
    if (this.eventShownFor === kortti) return;
    this.eventShownFor = kortti;

    const selitteet = {
      viive: 'Matka viivästyy yhdellä vuorolla.',
      kyyti: 'Saat ilmaisen kyydin naapurikaupunkiin.',
    };
    const { effect } = kortti;
    this.eventEffect.textContent = effect?.kind === 'raha'
      ? (effect.amount >= 0 ? `Kukkaroon +${effect.amount} puntaa.` : `Kukkarosta ${effect.amount} puntaa.`)
      : (selitteet[effect?.kind] ?? '');
    this.eventText.textContent = '';
    this.typeText(this.eventText, kortti.text, 'event');
    if (!this.eventDialog.open) this.eventDialog.showModal();
  }


  /**
   * Nuoren herran hihkaisu aarteen paljastushetkellä (omistajan
   * tilaus 10.8.2026: "pitäisi kuulua se lyhyt hihkaisu jee").
   * Kolme sävyä kierrossa (riemu, hämmästys, hykertely). Vain
   * arvokkaille löydöille, ja ei kertojattomassa tilassa —
   * hihkaisukin on ääninäyttelyä.
   */
  soitaHihkaisu(lahde) {
    const audio = new Audio(aaniUrl(lahde));
    audio.volume = puheVoima();
    // Tausta väistyy hihkaisun ajaksi kuten luennoilla; merkitsePuhuja
    // vapauttaa roolin ended/error-tapahtumista.
    merkitsePuhuja(this, audio);
    (this.luennat ??= new Set()).add(audio);
    audio.play().catch(() => vapautaPuhuja(this, audio));
  }

  /**
   * PALJASTUSKORTIN RUNKO — YKSI AINOA MALLI (omistajan linjaus
   * 18.8.2026: "käytä jatkossa vain uudenlaista aarteenpaljastumis-
   * näkymää … vanhat aarteet ja vanha aarreikkuna poistetaan
   * kaikkialta").
   *
   * Löytö NOUSEE MUSTASTA: generoitu kuva keskelle ilman kehyksiä ja
   * tekstit sen ympärille. Kääntyvää seepialaattaa sädeviivoineen ei
   * enää ole — myöskään laatoille, joilta generoitu kuva vielä
   * puuttuu: ne näyttävät saman kortin pelkkinä teksteinä, kunnes
   * kuva on tehty. Sama runko palvelee laattapaljastusta ja Viisasta
   * Pöllöä, jottei kahta erilaista aarreikkunaa pääse syntymään
   * uudestaan.
   *
   * KOLME MALLIA, YKSI RUNKO (omistajan leiskapäätökset 28.8.2026,
   * docs/mantereet-tyoaineisto/aarreleiskat/README.md):
   *  - 'tumma' — entinen malli: kuva nousee mustasta (laudan omat
   *    mustapohjaiset kuvat, ryöstäjä, pöllö).
   *  - 'paikallis' — vinjetointimalli maan omille aarrekuville: kuvan
   *    vaalea pergamenttitausta jatkuu valokeilaksi ja vinjetoituu
   *    tummaan; taustalla pelin kartta purppuraan taitettuna. EI
   *    paperiarkkia eikä kehystä.
   *  - 'diplomi' — VAIN pääaarteille: Aarnin luettelon sivu
   *    kaiverruskehyksineen, kartussissa otsake, alanauhassa arvo ja
   *    punainen LÖYDETTY-leima. Aarnin luettelossa ovat kaanonin
   *    mukaan vain pääaarteet, joten paikallisaarre ei koskaan saa
   *    diplomia.
   *
   * @param {string|null} kuva kuvan polku (assets/…) tai null
   * @param {string} alt kuvan tekstivastine
   * @param {string} [malli] 'tumma' | 'paikallis' | 'diplomi'
   * @param {{otsake?: string, alaotsake?: string, alanauha?: string,
   *   leima?: string, leimaPvm?: string}} [lisat] diplomin tekstit
   * @returns {{overlay: HTMLElement, scene: HTMLElement, caption: HTMLElement,
   *   kuvaEl: HTMLImageElement|null, jatka: HTMLElement,
   *   pohja: HTMLElement, leima: HTMLElement|null}}
   */
  rakennaPaljastus(kuva, alt, malli = 'tumma', lisat = {}) {
    const overlay = html('div', malli === 'tumma'
      ? 'reveal-overlay' : `reveal-overlay ${malli}`);
    const scene = html('div', 'reveal-scene');
    let kuvaEl = null;
    if (kuva) {
      kuvaEl = document.createElement('img');
      kuvaEl.className = 'reveal-aarrekuva';
      kuvaEl.alt = alt;
      const [osoite, vara] = aarrekuvanOsoitteet(kuva);
      // Puuttuva tiedosto (yhden tiedoston versio levyltä) ei saa
      // jättää rikkinäistä kuvaketta — kortti jatkaa tekstillä.
      asetaKuva(kuvaEl, osoite, vara, () => kuvaEl.remove());
    }
    /*
     * `pohja` on se pinta, jolle kuva ja tekstit ladotaan: tummassa
     * mallissa suoraan scene, vaaleissa malleissa oma kerros, joka
     * nousee esiin yhtenä kappaleena (pergamenttikeila tai diplomi).
     */
    let pohja = scene;
    let leima = null;
    if (malli === 'paikallis') {
      pohja = html('div', 'reveal-pergamentti');
      scene.appendChild(pohja);
    } else if (malli === 'diplomi') {
      /*
       * Valokerros overlayn pohjalle: tumma siirtymä kirkastuu
       * vaaleaan lopputilaan (omistajan kortti 28.8.2026 — pimennys
       * ja leima tummassa, sitten pohja vaalenee), kun overlay saa
       * luokan .kirkas.
       */
      overlay.appendChild(html('div', 'reveal-valo'));
      pohja = html('div', 'reveal-plansi');
      const kehys = document.createElement('img');
      kehys.className = 'reveal-kehys';
      kehys.alt = '';
      // Kehys on koriste: jos tiedosto puuttuu, diplomi jatkaa ilman.
      asetaKuva(kehys, 'assets/aarteet/aarnin-luettelo-kehys.jpg', null,
        () => kehys.remove());
      pohja.appendChild(kehys);
      if (lisat.otsake) pohja.appendChild(html('div', 'reveal-otsake', lisat.otsake));
      if (lisat.alaotsake) {
        pohja.appendChild(html('div', 'reveal-alaotsake', lisat.alaotsake));
      }
      pohja.appendChild(html('hr', 'reveal-jakoviiva'));
      scene.appendChild(pohja);
    }
    if (kuvaEl) pohja.appendChild(kuvaEl);
    const caption = html('div', 'reveal-caption');
    pohja.appendChild(caption);
    if (malli === 'diplomi') {
      if (lisat.alanauha) {
        pohja.appendChild(html('div', 'reveal-alanauha', lisat.alanauha));
      }
      if (lisat.leima) {
        leima = html('div', 'reveal-leima', lisat.leima);
        leima.appendChild(html('small', '', lisat.leimaPvm ?? ''));
        pohja.appendChild(leima);
      }
    }
    overlay.appendChild(scene);
    /*
     * KULMAN RUKSIA EI ENÄÄ OLE (omistaja 26.8.2026 ilta: "Yläkulman
     * ruksi on turha. Ota pois."). Jatka matkaa -nappi ja napautus
     * mihin tahansa kortilla riittävät — ruksi oli kolmas kahva
     * samaan oveen.
     *
     * JATKA MATKAA (omistajan pelitestipalaute v1119: *"sivu pysyy
     * näkyvissä kunnes käyttäjä toimii: lisää selkeä nappi 'JATKA
     * MATKAA' (1873-nappityyli); napautus muuallakin ruudulla saa myös
     * sulkea"*).
     *
     * Ennen kortti sulkeutui itsestään lukuajan päätteeksi, ja
     * pitkähkö kaariteksti ehti jäädä kesken. Nappi on kortin oma
     * kahva; ruksi ja napautus mihin tahansa jäävät ennalleen, koska
     * ne olivat jo olemassa ja kärsimätön pelaaja käyttää niitä.
     */
    const jatka = html('button', 'reveal-jatka', 'Jatka matkaa');
    jatka.type = 'button';
    scene.appendChild(jatka);
    return {
      overlay, scene, caption, kuvaEl, jatka, pohja, leima,
    };
  }

  /**
   * Odottaa, että pelaaja sulkee paljastuskortin (v1119).
   *
   * Kaksi kahvaa, yksi lupaus: Jatka matkaa -nappi ja napautus
   * mihin tahansa kortilla (kulman ruksi poistui 26.8.2026). Ajastinta EI ole — kortti on
   * ruudulla niin kauan kuin pelaaja haluaa.
   */
  odotaPaljastuksenSulku(overlay, jatka) {
    if (jatka) jatka.classList.add('nakyy');
    return new Promise((valmis) => {
      jatka?.addEventListener('click', valmis, { once: true });
      overlay.addEventListener('pointerdown', valmis, { once: true });
    });
  }

  /**
   * Aarteen paljastus ruudun keskellä. Kuva on laattatyypin oma
   * generoitu aarrekuva (packs/*.js kuva-kenttä) tai taikalasin
   * varustekuva. Maailmankartalla aarre on löytömantereen aarre
   * (aarreTyyppi; kaupunki on visan kaupunki, sillä paljastus tulee
   * aina visan voitosta).
   */
  async playTokenReveal(type) {
    /*
     * PÖLLÖ KORVAA ENSIMMÄISEN LAATAN AARTEEN KOKONAAN (omistajan
     * tilaus 18.8.2026). Kun revealToken palautti pöllön, laatan omaa
     * aarrekorttia ei näytetä lainkaan — pelaaja saa siitä laatasta
     * vain pöllön paljastuskortin. Lippu poimitaan tässä, joten
     * animaatio ajetaan täsmälleen kerran.
     */
    const polloOdottaa = this.game.takePolloPaljastus?.() === true;
    if (type === 'pollo' || polloOdottaa) {
      await this.naytaPolloAarre();
      return;
    }
    const token = this.game.aarreTyyppi(type, this.game.quiz?.cityId);
    /*
     * Aarre tuntuu kädessä (iOS-kuori). Juhla on pelin voimakkain
     * tärähdys, ja siksi se on varattu löydölle: rosvo ei saa sitä,
     * tai ele kuluisi loppuun.
     */
    if (AARRELAATAT.has(type)) natiiviTarise('juhla');
    const kuva = token.kuva ?? null;
    /*
     * ARVO ON LÖYTÖHETKEN OMA (Raamattu: *"Arvo vaihtelee
     * löytöhetkellä"*). revealToken jätti sen viimeAarre-kenttään;
     * ilman sitä kortti näyttäisi laattatyypin nollan, koska pienen ja
     * ison paikallisaarteen arvoa ei lueta taulusta. Luetaan ennen
     * kortin rakentamista, koska diplomin alanauha tarvitsee arvon.
     */
    const loyto = this.game.viimeAarre;
    const arvo = loyto?.type === type ? loyto.arvo : token.value;
    /*
     * MALLIN VALINTA (omistajan leiskapäätökset 28.8.2026 +
     * pohjapäätös kortilla: diplomiin tumma → vaalea siirtymä):
     * pääaarre saa aina Aarnin luettelon diplomin; maan oma
     * paikallisaarrekuva (vaalea pergamenttipohja) saa
     * vinjetointimallin; kaikki muut — laudan mustapohjaiset kuvat,
     * kirjoittamattomien mantereiden parit — jäävät tummaan malliin,
     * koska vaalea malli olettaa kuvalta vaalean pohjan.
     */
    const malli = type === 'star' ? 'diplomi'
      : (kuva?.startsWith('assets/aarteet/paikallis/') ? 'paikallis' : 'tumma');
    let lisat = {};
    if (malli === 'diplomi') {
      const manner = this.game.quiz?.cityId
        ? this.game.mannerOf(this.game.quiz.cityId) : null;
      const mannerNimi = MANNER_NIMET[manner]?.nimi;
      // Leiman päiväys ladotaan 1873-asiakirjan tapaan: päivä ja
      // kuukausi roomalaisin numeroin ("28 · VIII").
      const nyt = new Date();
      const KUUT = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
      lisat = {
        otsake: 'Aarnin luettelo',
        alaotsake: mannerNimi
          ? `${mannerNimi.toUpperCase()} · UNOHDETTU AARRE` : 'UNOHDETTU AARRE',
        // Pääaarteen arvo on kiinteä eikä revealToken arvo sitä
        // (arvoAarteenArvo antaa tähdelle laattataulun nollan).
        alanauha: `Arvo ${STAR_PRIZE} puntaa`,
        leima: 'Löydetty',
        leimaPvm: `${nyt.getDate()} · ${KUUT[nyt.getMonth()]}`,
      };
    }
    const {
      overlay, caption, kuvaEl, jatka, pohja, leima,
    } = this.rakennaPaljastus(kuva, token.name, malli, lisat);

    // Nuoren herran huudahdus ensin — se kuuluu juuri siihen hetkeen,
    // kun aarre tulee näkyviin; cliffhanger-teksti vasta sen jälkeen.
    const huudahdus = arvoHuudahdus(type);
    // Huudahdusrivi ("Taskuun!") on lipun takana (REVEAL_HUUDAHDUS_RIVI):
    // ääni jää, teksti on toistaiseksi pois. Ks. lipun kommentti.
    if (huudahdus && REVEAL_HUUDAHDUS_RIVI) {
      caption.appendChild(html('span', 'reveal-huudahdus', huudahdus.teksti));
    }
    caption.appendChild(html('strong', '', token.name));
    caption.appendChild(html('span', '', REVEAL_SUB[type] ?? `+${arvo} puntaa`));
    /*
     * FAKTA ON OPPIMISTEKSTI (Raamattu: *"Löytöteksti: lyhyt tosi
     * fakta aarteesta"*; omistajan leiskapäätös 28.8.2026 nosti sen
     * löytökortille). Kenttä tulee maan omalta pariteilta
     * (js/packs/paikallisaarteet.js) tai laudan laattatyypiltä; ilman
     * kenttää rivi jää pois eikä kortti muutu.
     */
    if (token.fakta) caption.appendChild(html('p', 'reveal-fakta', token.fakta));
    /*
     * Tarinakaaren aarreteksti paljastuksen alle: kätkön löytyessä
     * kaaren henkilö sulkee kohtaamisen ja jättää auki jäävän vihjeen
     * (omistajan tilaus 9.8.2026 — korvasi isoisän aarresitaatin).
     * Teksti on kerrontaa eikä sitaatti, joten lainausmerkkejä tai
     * nimiötä ei lisätä päälle.
     */
    const kaari = KAARI_LAUDAT.has(this.game.pack.id)
      ? TARINAKAARI[this.game.quiz?.cityId] : null;
    /*
     * Hihkaisu on kortin huudahdus ääneen — sama repliikki luettuna
     * ja kirjoitettuna. KERTOJA EI ENÄÄ LUE AARRETEKSTIÄ (omistajan
     * tilaus 18.8.2026: "Ota kertojan ääni pois kaikista aarteen
     * tapaamisista") — kaariteksti on kortilla vain luettavana, ja
     * hihkaisu on ainoa ääni kuvan nousun päälle.
     */
    const hihkaisu = (huudahdus && sfx.enabled && kertojaTila() !== 'ei')
      ? huudahdus.tiedosto : null;
    if (kaari?.aarre) caption.appendChild(html('p', 'reveal-isoisa', kaari.aarre));

    // Dialogi on top layerissa, joten paljastus lisätään sen sisään.
    this.quizDialog.appendChild(overlay);

    // Näyttöaika ei ole enää mitoitettu selitteen pituuteen (v1119):
    // kortti odottaa pelaajaa, joten pitkä kaariteksti ei voi jäädä
    // kesken. Alla oleva lyhyt `odota` on vain kuvan nousun rytmiä.
    // Kortti odottaa vähimmäislukuajan; napautus sulkee heti.
    const napautus = new Promise((resolve) => {
      overlay.addEventListener('pointerdown', resolve, { once: true });
    });
    const odota = (min) => Promise.race([this.wait(min), napautus]);

    /*
     * KORTTI ODOTTAA PELAAJAA (v1119). Ennen tässä oli lukuaikaan
     * mitoitettu ajastin (seliteMs); nyt kortti pysyy ruudulla, kunnes
     * pelaaja painaa Jatka matkaa -nappia tai napauttaa
     * korttia. `odota` jää kuvan nousun rytmiin.
     */
    if (this.reducedMotion) {
      pohja.classList.add('shown');
      kuvaEl?.classList.add('shown');
      caption.classList.add('shown');
      leima?.classList.add('lyoty');
      overlay.classList.add('kirkas');
      sfx.play(treasureSound(type));
      if (hihkaisu) this.soitaHihkaisu(hihkaisu);
      await odota(900);
      await this.odotaPaljastuksenSulku(overlay, jatka);
    } else {
      // Kuva nousee pimeästä: hidas häivytys ja kasvu, ei kääntöä.
      // Vaaleissa malleissa koko pohja (pergamenttikeila tai diplomi)
      // nousee yhtenä kappaleena kuvan mukana.
      await this.wait(420);
      pohja.classList.add('shown');
      kuvaEl?.classList.add('shown');
      sfx.play(treasureSound(type));
      if (hihkaisu) this.soitaHihkaisu(hihkaisu);
      await this.wait(760);
      caption.classList.add('shown');
      if (leima) {
        /*
         * LEIMAN LYÖNTI JA KIRKASTUMINEN (omistajan pohjapäätös
         * 28.8.2026): diplomi luetaan hetki tummassa valokeilassa,
         * LÖYDETTY-leima lyödään siihen, ja vasta leiman jälkeen
         * pohja kirkastuu vaaleaan lopputilaan. Napautus ohittaa
         * odotukset muttei animaatioita — kortti jää silloin heti
         * valmiiseen vaaleaan tilaan.
         */
        await odota(700);
        leima.classList.add('lyoty');
        natiiviTarise('juhla');
        await odota(650);
        overlay.classList.add('kirkas');
      }
      await this.odotaPaljastuksenSulku(overlay, jatka);
      overlay.classList.add('leaving');
      await this.wait(300);
    }
    overlay.remove();
    // Löytö päätyy matkalaukkuun: yläreunan Laukku-nappi heilahtaa
    // eloisasti merkiksi (omistajan toive). Rosvo ei tuo mitään.
    if (onAarre(type)) this.elavoitaLaukku();
  }

  /**
   * VIISAS PÖLLÖ PALJASTUU AARTEENA (omistajan tilaus 18.8.2026).
   *
   * Sama kortti ja sama rytmi kuin laatan paljastuksessa: pöllön oma
   * generoitu muotokuva (POLLO_AARRE.kuva, tools/generoi-tietaja-
   * avatarit.mjs avain viisas-pollo) nousee mustasta ja tekstit
   * asettuvat sen ympärille. Kääntyvää laattaa ei ole enää millään
   * paljastuksella (omistajan linjaus 18.8.2026).
   *
   * Ei pisteitä, ei rahaa, ei laukkutavaraa: pöllön paikka
   * matkalaukussa on tietäjäpisterivin kuvake, joka on ollut siellä
   * jo ennen löytöä. Kortti kertoo vain, kuka tuli matkaan.
   *
   * Lopuksi nappi ilmestyy alanappiriviin ja löytymistä odottaneet
   * kuplat puretaan.
   */
  async naytaPolloAarre() {
    const { overlay, caption, kuvaEl, jatka } = this.rakennaPaljastus(
      POLLO_AARRE.kuva, POLLO_AARRE.nimi,
    );
    // Huudahdusrivi on lipun takana kuten laattapaljastuksessakin.
    if (REVEAL_HUUDAHDUS_RIVI) {
      caption.appendChild(html('span', 'reveal-huudahdus', POLLO_AARRE.huudahdus));
    }
    /*
     * KORTIN NIMILAPPU ON YLIVIIVATTU (omistajan tilaus 27.8.2026):
     * "Viisas Pöllö Pulu", jossa "Viisas Pöllö" on vedetty yli
     * punaisella. Kuvan alt-teksti (rakennaPaljastus yllä) ja rivi
     * "Löysit: …" pysyvät pelkkänä tekstinä — ne eivät ole otsikoita.
     */
    caption.appendChild(polloNimilappu(html('strong', ''), {
      yli: 'Viisas Pöllö', tilalle: 'Pulu',
    }));
    caption.appendChild(html('span', '', POLLO_AARRE.selite));
    caption.appendChild(html('p', 'reveal-isoisa', POLLO_AARRE.esittely));
    this.quizDialog.appendChild(overlay);

    /*
     * KERTOJA EI LUE ESITTELYÄ (omistajan tilaus 18.8.2026: kertojan
     * ääni pois kaikista aarteen tapaamisista) — kortti odottaa vain
     * lukuajan verran, ja napautus ohittaa odotuksen.
     */
    const napautus = new Promise((resolve) => {
      overlay.addEventListener('pointerdown', resolve, { once: true });
    });
    const odota = (min) => Promise.race([this.wait(min), napautus]);

    // Kortti odottaa pelaajaa (v1119, ks. odotaPaljastuksenSulku).
    if (this.reducedMotion) {
      kuvaEl?.classList.add('shown');
      caption.classList.add('shown');
      sfx.play(treasureSound('star'));
      await odota(900);
      await this.odotaPaljastuksenSulku(overlay, jatka);
    } else {
      await this.wait(420);
      kuvaEl?.classList.add('shown');
      sfx.play(treasureSound('star'));
      await this.wait(760);
      caption.classList.add('shown');
      await this.odotaPaljastuksenSulku(overlay, jatka);
      overlay.classList.add('leaving');
      await this.wait(300);
    }
    overlay.remove();
    /*
     * Nappi riviin pienen nytkäyksen kera. Löytymistä odottaneet
     * kuplat purkautuvat itsestään seuraavassa tapahtumaerässä
     * (naytaTietajaNousut), joka ajetaan heti tämän jälkeen — siellä
     * ne asettuvat oikeaan järjestykseen laatan omien
     * tapahtumakuplien perään.
     */
    polloPaivitaNakyvyys(true);
  }

  /**
   * Laukku-nappi herää hetkeksi eloon, kun laukkuun tulee jotain uutta:
   * passileima, kunniamerkintä tai löydetty aarre. Sama pieni heilahdus
   * joka kerta — huomio kiinnittyy yläreunaan ilman uutta ilmoitusta.
   */
  elavoitaLaukku() {
    const nappi = document.getElementById('turn-pill');
    if (!nappi) return;
    nappi.classList.remove('laukku-elo');
    void nappi.offsetWidth;
    nappi.classList.add('laukku-elo');
  }

  // --- toiminnot ja animaatiot ---------------------------------------------

  wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Kirjoituskone: teksti naksuu ruudulle sana kerrallaan kuin vanhalla
   * matkakirjoituskoneella. Sama paikka (slot) keskeyttää edellisen
   * kirjoituksen, jotta tekstit eivät sekoitu keskenään. Liikkeen
   * vähennystä toivovalle teksti ilmestyy kerralla.
   */
  /**
   * Kirjoituskoneteksti. Koko teksti on alusta asti paikallaan, mutta
   * kirjoittamaton osa on näkymätöntä: se varaa tilansa, joten rivitys ei
   * muutu kesken kirjoituksen eikä jo luettu teksti hyppää paikaltaan.
   * Aiemmin sanat lisättiin yksi kerrallaan, jolloin koko kappale latoutui
   * uudelleen joka sanalla.
   */
  typeText(target, text, slot = 'fact', done = null, speed = TYPE_MS) {
    this.typeTimers ??= {};
    clearTimeout(this.typeTimers[slot]);
    const full = String(text);
    if (this.reducedMotion) {
      target.textContent = full;
      done?.();
      return;
    }

    target.textContent = '';
    const kirjoitettu = html('span', 'typed');
    const tuleva = html('span', 'pending');
    target.appendChild(kirjoitettu);
    target.appendChild(tuleva);

    const words = full.split(' ');
    let shown = 0;
    const piirra = () => {
      kirjoitettu.textContent = words.slice(0, shown).join(' ');
      tuleva.textContent = shown < words.length
        ? (shown ? ' ' : '') + words.slice(shown).join(' ')
        : '';
    };
    piirra();

    // Kirjoittajan rytmi (ks. KIRJOITUSTAUOT): sanaväli huojuu ja
    // välimerkin jälkeen pidetään tauko — tasainen konemainen tahti
    // näytti luonnottomalta.
    const viive = (sana) => {
      if (!KIRJOITUSRYTMI.has(slot)) return speed;
      const perus = speed * (0.7 + Math.random() * 0.6);
      const tauko = KIRJOITUSTAUOT.find((t) => t.osuu.test(sana));
      if (tauko) return perus + tauko.tauko + Math.random() * tauko.huojunta;
      // Kirjoittaja pysähtyy välillä miettimään kesken virkkeenkin.
      if (Math.random() < KIRJOITUS_MIETE.osuus) {
        return perus + KIRJOITUS_MIETE.tauko + Math.random() * KIRJOITUS_MIETE.huojunta;
      }
      return perus;
    };

    const kirjoita = () => {
      shown++;
      piirra();
      /*
       * Kirjoituskoneen lyönti täsmälleen sillä hetkellä, kun sana
       * ilmestyy — ei ennen eikä jälkeen.
       *
       * NAPUTUS KUULUU MYÖS LENNOLLA (omistaja 12.8.2026). Aiemmin se
       * jätettiin lennolta pois sillä perusteella, että matkustamon
       * äänimaisema soi alla ja naputus kuulostaisi sen päällä
       * viallisen koneen ääneltä. Omistaja kuuli sen toisin ja tilasi
       * saman äänen kuin etusivun avaustekstissä; poisjättö on siis
       * kumottu. Sama sfx.play('pen') myös tarkoittaa, että äänet pois
       * -asetus (SoundKit.enabled) vaientaa naputuksen kummassakin, ja
       * ääni loppuu itsestään viimeiseen sanaan — se soitetaan vain
       * kirjoitushetkellä eikä silmukkana.
       */
      if (KIRJOITUSRYTMI.has(slot)) sfx.play('pen');
      if (shown >= words.length) {
        // Lopuksi pelkkä teksti, jotta perään lisättävä lähderivi asettuu
        // luontevasti eikä jää näkymättömän jäänteen taakse.
        target.textContent = full;
        done?.();
        return;
      }
      this.typeTimers[slot] = setTimeout(kirjoita, viive(words[shown - 1]));
    };
    this.typeTimers[slot] = setTimeout(kirjoita, speed);
  }

  showError(message) {
    this.errorEl.textContent = message;
    this.errorEl.hidden = false;
  }

  /**
   * Suorittaa toiminnon ja antaa animaatioiden pyöriä rauhassa: uusi klikkaus
   * tai botin vuoro odottaa, kunnes edellinen tapahtuma on näytetty.
   */
  async run(fn, { after } = {}) {
    if (this.busy || this.dead) return;
    this.busy = true;
    this.actionsEl.dataset.busy = 'true';
    try {
      const result = fn();
      if (result && result.ok === false) {
        this.showError(result.error);
        // Peruuntunut lento ei saa jättää kalvolippua päälle mykistämään
        // äänimaisemaa.
        if (!document.querySelector('.flight-overlay')) {
          document.body.classList.remove('flight-active');
        }
        return;
      }
      if (after) await after(result);
      await this.playEvents();
    } finally {
      this.busy = false;
      delete this.actionsEl.dataset.busy;
      this.render();
    }
  }

  doAction(fn) {
    this.run(fn);
  }

  /** Nopanheitto: silmäluku pyörii kartan päällä ja jää hetkeksi näkyviin. */
  doRoll() {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    // Nopanheitto keskeyttää tarinan: luenta häipyy pehmeästi pois.
    haivytaLuenta(this);
    this.run(() => this.game.actionRoll(), { after: (result) => this.animateDie(result.die) });
  }


  /** Siirto: nappula hyppii reittiä pitkin piste kerrallaan. */
  doMove(key) {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    const move = game.moves?.get(key);
    if (!move) return;
    const player = game.player;
    const from = player.pos;
    const path = move.path;
    /*
     * MATKUSTUSTAPA LUETAAN ENNEN SIIRTOA (#96). `after` ajetaan vasta
     * kun game.actionMove on jo tehnyt siirron, ja vuoron vaihtuessa
     * beginTurn nollaa travelModen — jälkikäteen luettuna se olisi
     * milloin null, milloin seuraavan vuoron tapa.
     */
    const maitse = game.travelMode === 'land';
    this.run(() => game.actionMove(key), {
      after: () => this.animatePawn(
        player, from, path,
        maitse ? JALKAMATKAN_STEP_MS : STEP_MS,
        { saatto: true, maitse },
      ),
    });
  }

  doFly(destination) {
    // Radiotilassa kartalla ei liikuta.
    if (this.radioPaalla()) return;
    const { game } = this;
    // Matkavalinnan välivaihe ei saa jäädä päälle seuraavaan vuoroon.
    this.suljeMatkavalikko();
    const player = game.player;
    const from = player.pos;
    const lahto = from.type === 'city' ? game.board.cityById.get(from.city) : null;
    const kohde = game.board.cityById.get(destination);
    const suunta = lahto && kohde ? { dx: kohde.x - lahto.x, dy: kohde.y - lahto.y } : null;
    // Repliikki arvotaan ennen siirtoa, jotta rng-kutsu osuu samaan kohtaan
    // riippumatta siitä, näytetäänkö animaatio.
    const line = game.flightLine(destination);
    // Kalvollisella lennolla kohteen äänimaisema odottaa kalvon loppuun.
    if (game.pack.id === 'maailma') {
      sfx.play('flight');
      if (!this.reducedMotion) document.body.classList.add('flight-active');
    }
    this.run(() => game.actionFly(destination), {
      after: async () => {
        // Lentokalvo kuuluu vain maailmankartalle; mantereella nappula
        // lentää suoraan karttanäkymässä — rauhallisemmin ja moottorin
        // hurinan saattelemana (omistajan toive).
        if (game.pack.id === 'maailma') {
          await this.animateFlight(lahto?.name ?? '', kohde?.name ?? '', line, suunta);
          await this.animatePawn(player, from, [player.pos], FLIGHT_MS);
        } else {
          sfx.startFlight(MANNER_LENTO_MS);
          await this.animatePawn(player, from, [player.pos], MANNER_LENTO_MS);
          sfx.stopFlight();
        }
      },
    });
  }

  /**
   * Zoomaa näkymän kahden pisteen ympärille lennon ajaksi — kertaheitolla,
   * ei liukuen: viewBoxin animointi piirtää koko kartan joka ruudulla
   * uudelleen ja tökkii hitaammilla koneilla. Rajaus on tiukka, jotta
   * lentoreitti täyttää reilusti yli puolet ruudusta ja matka näyttää
   * matkalta. Palauttaa lähtönäkymän viewBox-merkkijonon paluuta varten.
   */
  /**
   * Indiana Jones -lentoanimaatio läpikuultavana kalvona kartan päällä.
   * Näytetään vain maailmankartalla — mantereella lento tapahtuu suoraan
   * karttanäkymässä. Kohtaus häipyy itsestään hetken kuluttua perillä,
   * ja napautus mihin tahansa ohittaa sen heti.
   *
   * `prefers-reduced-motion` ohittaa animaation kokonaan: silloin ei piirretä
   * mitään eikä odoteta, jotta peli etenee samaa tahtia kuin ennenkin.
   */
  async animateFlight(fromLabel, toLabel, line = null, dir = null) {
    if (this.reducedMotion) return;
    return this.isoAnimaatio(() => this.animateFlightSisalla(fromLabel, toLabel, line, dir));
  }

  /** Lennon varsinainen piirto; kääre yllä hiljentää kartan animaatiot. */
  async animateFlightSisalla(fromLabel, toLabel, line = null, dir = null) {

    const overlay = html('div', 'flight-overlay');
    const scene = el('svg', { viewBox: '0 0 1000 560', class: 'flight-scene' }, overlay);
    this.mapPane.appendChild(overlay);
    // Alareunan kortit ja napit piiloon lennon ajaksi: kalvon alla näkyy
    // vain kohdemantereen kartta. Lukuääni jatkuu kalvon alla.
    document.body.classList.add('flight-active');

    // Napautus mihin tahansa vie koneen perille JA lennon läpi
    // (omistajan tilaus 26.8.2026). Animaatiot kerätään talteen, jotta
    // napautus voi viedä ne loppuun eikä ruudulle jää puolinaista
    // tilaa.
    const lentoAnimaatiot = [];
    let ohitettu = false;
    let ohitusKuittaus = null;
    const ohitusLupaus = new Promise((valmis) => { ohitusKuittaus = valmis; });
    const ohita = () => {
      for (const a of lentoAnimaatiot) a.finish();
      // Ohitus vie myös repliikin loppuun: hypätty lento ei saa jäädä
      // odottamaan kesken jäänyttä kirjoitusta.
      this.paataLennonTeksti(line);
      // Ja perille heti (omistajan tilaus 26.8.2026): napautus on koko
      // lennon loppu, ei pelkkä hypäytys. Nielu estää napautuksen
      // jälkipuolta osumasta siihen, mikä kalvon alta paljastuu.
      ohitettu = true;
      this.nielaiseNapautus();
      ohitusKuittaus();
    };
    overlay.addEventListener('pointerdown', ohita, { once: true });

    // Isoisän karttalehti: käsin piirretyt vyöhykeviivat katkoviivalla
    // (kääntöpiirit) ja himmeitä päiväkirjamerkintöjä piirroksineen.
    const vyohyke = (y, nimi) => {
      el('path', {
        d: `M20,${y} q160,-8 330,-2 t320,8 t310,-6`,
        class: 'flight-zone',
      }, scene);
      const t = el('text', { x: 962, y: y - 10, 'text-anchor': 'end', class: 'flight-zone-name' }, scene);
      t.textContent = nimi;
    };
    vyohyke(120, 'Kravun kääntöpiiri');
    vyohyke(300, 'päiväntasaaja');
    vyohyke(470, 'Kauriin kääntöpiiri');
    const muistiinpano = (x, y, rivit, kulma = -2) => {
      const g = el('g', { transform: `translate(${x},${y}) rotate(${kulma})`, class: 'flight-note' }, scene);
      rivit.forEach((rivi, i) => {
        const t = el('text', { x: 0, y: i * 26, class: 'flight-note-text' }, g);
        t.textContent = rivi;
      });
      return g;
    };
    muistiinpano(60, 80, ['pasaatituuli kantaa', 'lounaaseen — luota siihen'], -3);
    muistiinpano(640, 90, ['N.B. monsuuni kääntyy', 'lokakuussa'], 2);
    muistiinpano(90, 505, ['täällä kompassi', 'valehtelee hiukan'], -1);
    // Pieni kompassiruusu ja aaltoja isoisän käden jälkeä.
    const ruusu = el('g', { transform: 'translate(905,505)', class: 'flight-note' }, scene);
    el('circle', { cx: 0, cy: 0, r: 26, fill: 'none', class: 'flight-doodle' }, ruusu);
    el('path', { d: 'M0,-24 L5,0 L0,24 L-5,0 z M-24,0 L0,-5 L24,0 L0,5 z', class: 'flight-doodle-fill' }, ruusu);
    el('path', { d: 'M330,520 q14,-10 28,0 q14,10 28,0', fill: 'none', class: 'flight-doodle' }, scene);
    el('path', { d: 'M540,60 l14,-18 l12,18 l10,-12 l9,12', fill: 'none', class: 'flight-doodle' }, scene);

    // Lennon suunta seuraa oikeaa maantiedettä, kun molempien päiden
    // koordinaatit tunnetaan: Lontoosta Tangeriin lennetään ylhäältä
    // oikealta alas vasemmalle, kuten oikeallakin kartalla. Ilman suuntaa
    // (esim. porttilento toiselle laudalle) lento nousee vasemmalta ylös.
    const itaan = dir ? dir.dx >= 0 : true;
    const etelaan = dir ? dir.dy >= 0 : false;
    const a = { x: itaan ? 130 : 870, y: etelaan ? 120 : 450 };
    const b = { x: itaan ? 870 : 130, y: etelaan ? 450 : 120 };
    el('circle', { cx: a.x, cy: a.y, r: 9, class: 'flight-dot' }, scene);
    el('circle', { cx: b.x, cy: b.y, r: 9, class: 'flight-dot' }, scene);
    const nimi = (p, teksti) => {
      const t = el('text', {
        x: p.x, y: p.y + 56, 'text-anchor': p.x > 500 ? 'end' : 'start', class: 'flight-name',
      }, scene);
      t.textContent = teksti;
    };
    if (fromLabel) nimi(a, fromLabel);
    if (toLabel) nimi(b, toLabel);

    // Kaari kaartuu aina ylöspäin kulkusuunnasta riippumatta, kuin
    // lentorata vanhan filmin kartalla.
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    let px = -dy / len;
    let py = dx / len;
    if (py > 0) { px = -px; py = -py; }
    const kx = (a.x + b.x) / 2 + px * 170;
    const ky = (a.y + b.y) / 2 + py * 170;
    const d = `M${a.x},${a.y} Q${kx},${ky} ${b.x},${b.y}`;
    const reitti = el('path', { d, class: 'flight-trail' }, scene);
    const kokoPituus = reitti.getTotalLength();
    reitti.style.strokeDasharray = kokoPituus;
    reitti.style.strokeDashoffset = kokoPituus;

    const kone = el('g', { class: 'flight-plane' }, scene);
    // Yksinkertainen kone ylhäältä: runko, siivet ja pyrstö.
    el('path', {
      d: 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
        + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z',
      class: 'flight-plane-body',
      transform: 'scale(1.7)',
    }, kone);

    // Reitti näytteistetään kerran valmiiksi: getPointAtLength jokaisella
    // ruudunpäivityksellä oli raskas (etenkin iPadin Safarissa) ja teki
    // koneen liikkeestä nykivän. Taulukosta poiminta on ilmaista.
    const NAYTTEITA = 240;
    const naytteet = [];
    for (let i = 0; i <= NAYTTEITA; i++) {
      naytteet.push(reitti.getPointAtLength((kokoPituus * i) / NAYTTEITA));
    }
    const kohta = (osuus) => {
      const f = Math.min(NAYTTEITA - 0.001, Math.max(0, osuus * NAYTTEITA));
      const i = Math.floor(f);
      const j = f - i;
      const p1 = naytteet[i];
      const p2 = naytteet[i + 1];
      return {
        x: p1.x + (p2.x - p1.x) * j,
        y: p1.y + (p2.y - p1.y) * j,
        kulma: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI,
      };
    };

    // Repliikki asuu kelluvassa alaosassa: asettelu hoituu itsestään.
    //
    // ASTU MANTEREELLE -NAPPI ON POISSA (omistajan tilaus 26.8.2026:
    // *"ota siitä pois astu mantereelle -nappi. Muuten tulee liikaa
    // nappeja heti alkuun."*). Alaosaan jää siis vain rivi, ja koska
    // rivi varaa koko korkeutensa heti (typeText piirtää
    // kirjoittamattoman osan näkymättömänä), pino ei liiku kirjoituksen
    // aikana — juuri se oli aikoinaan syy pitää näkymätöntä nappia
    // paikkaa varaamassa.
    const alaosa = html('div', 'flight-alaosa');
    overlay.appendChild(alaosa);
    // Ilman repliikkiä ei ole mitään odotettavaa: vanha kuittaus pois,
    // jottei tämä lento jää edellisen rivin varaan.
    this.flightLineValmis = null;
    if (line) this.showFlightLine(line, alaosa);
    /*
     * Lennon kesto repliikin mukaan; ilman repliikkiä perusmitta.
     *
     * Toinen alaraja tuli 12.8.2026, kun repliikki sai avaustekstin
     * hitaan tahdin: sanamäärään perustuva arvio ei enää tunne rivin
     * välimerkkejä, ja kolmen pisteen jälkeinen tauko yksin on yli
     * sekunnin. Ilman tätä kone laskeutui pisimmillä riveillä kesken
     * lauseen. Lukuaika on se hetki, jonka valmis rivi ehtii olla
     * ruudulla ennen kuin lento jatkaa perille.
     *
     * Kirjoituksen aloitusviive (LENNON_TEKSTI_VIIVE_MS) on mukana
     * summassa: teksti alkaa nyt myöhemmin kuin kalvo, ja ilman sitä
     * viive söisi juuri saman verran lukuajasta.
     */
    const sanoja = line ? String(line).trim().split(/\s+/).length : 0;
    const lennonKesto = Math.min(
      LENNON_ENINTAAN_MS,
      Math.max(
        FLY_OVERLAY_MS,
        LENNON_POHJA_MS + sanoja * LENNON_SANA_MS,
        line ? LENNON_TEKSTI_VIIVE_MS + kirjoituksenKesto(line) + LENNON_LUKUAIKA_MS : 0,
      ),
    );
    /*
     * Pieni nuoli oikeaan alanurkkaan muutaman sekunnin kuluttua.
     *
     * Kalvon saa jo nyt hypäytettyä perille napauttamalla mistä
     * tahansa, mutta sitä ei näe mistään. Omistajan toive: "oikeassa
     * alareunassa voisi olla pieni nuoli joka syttyisi muutaman
     * sekunnin kuluttua. Se saa olla kuitenkin aika huomaamaton."
     *
     * Huomaamaton on tässä vaatimus eikä makuasia: nuoli kilpailee
     * saman ruudun repliikin kanssa, ja jos se vetää katseen, se vie
     * huomion juuri siitä tekstistä, jonka lukemiseen aikaa lisättiin.
     */
    const nuoli = html('button', 'flight-eteen');
    nuoli.type = 'button';
    nuoli.setAttribute('aria-label', 'Ohita lento');
    nuoli.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<path d="M8 5 L15 12 L8 19" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    overlay.appendChild(nuoli);
    const nuolenAjastin = setTimeout(() => nuoli.classList.add('nakyy'), LENNON_NUOLI_MS);
    nuoli.addEventListener('click', ohita);
    /*
     * Kalvon taustaääni on matkustamon äänimaisema, ei syntetisoitu
     * moottori (omistajan toive 10.8.2026) — sen käynnistää
     * syncAmbience flight-active-lipusta, joten tässä ei aloiteta
     * mitään. stopFlight kalvon lopussa jää varmistukseksi vanhojen
     * polkujen varalle.
     */
    this.syncAmbience();

    // Kone ja reittiviiva lentävät selaimen omina WAAPI-animaatioina, ei
    // rAF-silmukalla: pääsäikeessä naputtava kirjoituskone ja käynnistyvä
    // lukuääni pudottivat rAF-ruutuja ja kone nykäisi (omistajan havainto).
    // Avainruudut lasketaan valmiiksi pehmennys sisään leivottuna, ja
    // selain interpoloi niiden välit tasaisesti omassa tahdissaan.
    const RUUTUJA = 120;
    const koneRuudut = [];
    const reittiRuudut = [];
    for (let i = 0; i <= RUUTUJA; i++) {
      const t = i / RUUTUJA;
      // Pehmeä kiihdytys ja jarrutus, jottei kone nykäise liikkeelle.
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const p = kohta(e);
      koneRuudut.push({
        offset: t,
        transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) rotate(${p.kulma.toFixed(2)}deg)`,
      });
      reittiRuudut.push({ offset: t, strokeDashoffset: kokoPituus * (1 - e) });
    }
    // Lähtöasento ennen animaation alkua, ettei kone välähdä origossa.
    kone.style.transform = koneRuudut[0].transform;
    /*
     * Liike alkaa vasta, kun kalvon ensimmäinen maalaus on valmis:
     * ison SVG:n asettelu, fonttien nouto ja moottoriäänen käynnistys
     * osuivat samaan ruutuun animaation alun kanssa, ja kone nykäisi
     * lähdössä (omistajan havainto 10.8.2026). Kaksi ruudunpäivitystä
     * päästää maalauksen ohi, ja pieni delay on lisäksi tarkoituksella:
     * kone seisoo hetken lähtöpisteessään ennen nousua. Napautus
     * ohittaa myös viivästetyn animaation (finish vie loppuun).
     */
    await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    const koneAnim = kone.animate(koneRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    const reittiAnim = reitti.animate(reittiRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    lentoAnimaatiot.push(koneAnim, reittiAnim);
    await Promise.all([koneAnim.finished, reittiAnim.finished]).catch(() => {
      /* peruttu animaatio (esim. dialogin sulku) ei kaada lentoa */
    });

    // Moottori jää käymään kalvon ajaksi — se hiljenee vasta
    // saapumisen omassa lohkossa, ohituksessa samalla tavalla.

    /*
     * KONE EI LASKEUDU KESKEN LAUSEEN — MITATTUNA, EI ARVIOITUNA.
     *
     * Lennon kesto on mitoitettu kirjoituksen keskimääräiselle
     * kestolle (kirjoituksenKesto), ja tavallisesti rivi on valmis
     * reilusti ennen laskeutumista. Arvio pettää kuormitetulla
     * pääsäikeellä: kone lentää selaimen omana WAAPI-animaationa
     * eikä siitä välitä, mutta kirjoituskone naputtaa setTimeoutilla,
     * ja avauslennon aikana piirtyy koko maailmankartan lauta. Ajossa
     * 12.8.2026 (Chromium, kontti) 25 sanan rivi kirjoittui 28
     * sekunnissa 8 sekunnin arviota vastaan — sama luku ennen ja
     * jälkeen tämän hienosäädön, eli kyse ei ole uudesta viiveestä
     * vaan vanhasta oletuksesta.
     *
     * Siksi lento jatkaa vasta kun rivi on oikeasti valmis. Nopealla
     * laitteella odotus on nolla, hitaalla se on juuri se hetki, jonka
     * lukija tarvitsee. Yläraja on varoventtiili: kadonnut kuittaus ei
     * saa jättää kalvoa ikuisiksi ajoiksi. Napautus ohittaa odotuksen.
     */
    await Promise.race([
      this.flightLineValmis ?? Promise.resolve(),
      this.wait(LENNON_TEKSTI_ODOTUS_MS),
      ohitusLupaus,
    ]);

    /*
     * Perillä kalvo hengähtää hetken ja jatkaa itsestään (omistajan
     * tilaus 26.8.2026): laskeutuminen ehditään nähdä, mutta yhtään
     * nappia ei tarvitse painaa. Napautus vie tästäkin ohi.
     */
    clearTimeout(nuolenAjastin);
    nuoli.remove();
    if (!ohitettu) await Promise.race([this.wait(LENNON_JATKO_MS), ohitusLupaus]);

    sfx.stopFlight();
    // Kohteen äänimaisema alkaa jo kalvon häivytyksen aikana: kun
    // kertoja aloittaa sekunnin kuluttua saapumisesta, tausta on ehtinyt
    // nousta kuuluviin eikä ilmesty puheen kanssa yhtä aikaa.
    this.ennakoiAmbienssi(this.game.player?.pos);
    /*
     * SAAPUMISNÄKYMÄ ASETETAAN ENNEN KALVON HÄIVYTYSTÄ.
     *
     * Kalvo häipyy 280 millisekuntia, ja sen läpi näkyy kartta. Jos
     * saapumiszoom ajastetaan vasta kalvon poiston jälkeen, häivytyksen
     * ajan näkyy laudan KOKONÄKYMÄ — ja vasta sitten kuva hyppää
     * lähemmäs ja alkaa liukua. Omistaja näki juuri sen: "näkyy ensin
     * koko maailmankartta, sitten se vain hyppää lähemmäs ja sitten
     * vasta zoomaa."
     *
     * Kun näkymä asetetaan ensin, kalvon takaa paljastuu suoraan liu'un
     * lähtöasento eikä kokonäkymä. Hyppyä ei ole, koska mitään ei
     * ehditty näyttää siitä mistä hypättäisiin.
     *
     * zoomaaMantereelle asettaa asennon heti mutta käynnistää liu'un
     * vasta ZOOM_TAUKO_MS:n kuluttua (260 ms), eli suunnilleen silloin
     * kun kalvo on juuri kadonnut.
     *
     * flight-active on purettava ENSIN. mannerZoomTarpeen() palauttaa
     * falsen niin kauan kuin lippu on päällä (zoomaus ehti muuten
     * tapahtua lennon aikana), joten ilman purkua saapumiszoom ei
     * käynnisty lainkaan — mitattuna näkyvä leveys jäi laudan
     * levyiseksi koko saapumisen ajaksi.
     */
    document.body.classList.remove('flight-active');
    this.kartta.ajastaMannerZoom();
    overlay.classList.add('flight-leaving');
    await this.wait(280);
    overlay.remove();
    this.hideFlightLine();
    // Ulos astuttaessa päiväkirja pääsee ääneen: lennon ajaksi lykätty
    // saapumismerkintä alkaa kirjoittua ja soida vasta nyt.
    if (!this.dead) this.render();
    // Kartan bittikartta täydennetään vasta tässä: lennon aikana
    // rasterointi olisi jumittanut kalvon animaation ja puheen ajastimen.
    this.taydennaTaide?.({ heti: true });
  }

  /**
   * Nuoren herran repliikki lennon ajaksi, kirjoituskoneella. Rivi elää
   * kalvon kelluvassa alaosassa ja poistuu kalvon mukana.
   *
   * SAMA KÄSI KUIN ETUSIVULLA (omistajan tilaus 12.8.2026). Ennen rivi
   * naksui tasaista 50 millisekunnin tahtia ja oli valmis parissa
   * sekunnissa: se ei ollut kirjoittamista vaan latautumista. Nyt tahti
   * ja rytmi ovat avaustekstin (INTRO_TYPE_MS, KIRJOITUSRYTMI), eli
   * sanaväli huojuu ja välimerkin jälkeen hengähdetään. Lennon kesto on
   * mitoitettu tälle tahdille (kirjoituksenKesto), joten kone ei
   * laskeudu kesken lauseen.
   *
   * KIRJOITUS ALKAA VIIVEELLÄ (LENNON_TEKSTI_VIIVE_MS): kertoja saa
   * lähteä liikkeelle ensin, ja rivi seuraa perässä. Ajastin on
   * talletettu, jotta ohitettu tai peruttu lento ei jää kirjoittamaan
   * irronneeseen elementtiin — ja naputtamaan sen tahdissa.
   */
  showFlightLine(line, kotelo) {
    this.flightLine = html('p', 'flight-line');
    kotelo.appendChild(this.flightLine);
    const rivi = this.flightLine;
    clearTimeout(this.lentoTekstiAjastin);
    // Kuittaus siitä, että rivi on valmis: lento odottaa sitä ennen kuin
    // se jatkaa itsestään perille (ks. animateFlightSisalla).
    this.flightLineValmis = new Promise((valmis) => { this.flightLineKuittaus = valmis; });
    this.lentoTekstiAjastin = setTimeout(() => {
      if (this.flightLine !== rivi) return;
      this.typeText(rivi, line, 'flight', () => this.flightLineKuittaus?.(), INTRO_TYPE_MS);
    }, LENNON_TEKSTI_VIIVE_MS);
  }

  /**
   * Repliikki kerralla valmiiksi. Ohitettu lento (napautus tai nuoli) vie
   * myös tekstin loppuun: muuten kalvo jäisi odottamaan kirjoitusta,
   * jonka pelaaja juuri ilmoitti haluavansa ohittaa.
   */
  paataLennonTeksti(line) {
    clearTimeout(this.lentoTekstiAjastin);
    clearTimeout(this.typeTimers?.flight);
    if (this.flightLine && line) this.flightLine.textContent = String(line);
    this.flightLineKuittaus?.();
  }

  hideFlightLine() {
    // Rivi poistuu kalvon mukana; viite siivotaan, ettei kirjoitus jatku
    // irronneeseen elementtiin. Kuittaus vapautetaan, ettei kukaan jää
    // odottamaan poistettua riviä.
    clearTimeout(this.lentoTekstiAjastin);
    clearTimeout(this.typeTimers?.flight);
    this.flightLineKuittaus?.();
    this.flightLineValmis = null;
    this.flightLine = null;
  }

  /*
   * ==================================================================
   * LENNON YHTEISET OSAT (omistajan tilaus 26.8.2026)
   * ==================================================================
   *
   * Kaksi lentoa — avauslento kartalla (aloituslentoSisalla) ja vanha
   * kalvolento (animateFlightSisalla) — jakavat nyt ohituksen ja
   * automaattisen jatkon. Kohtauksen koristeet (katkojälki, leima,
   * vanavesi, vinjetti, pilvet) kuuluvat avauslennolle: se on se
   * kohtaus, jonka pelaaja näkee ja jonka omistaja katsoi.
   */

  /**
   * Nielaisee juuri alkaneen napautuksen loppuosan.
   *
   * Ohitus purkaa lentonäkymän saman tien, ja napautuksen pointerup ja
   * click ehtivät osua siihen, mikä alta paljastuu — kartan kaupunkiin
   * tai alarivin nappiin. Kuuntelija on kaappausvaiheessa, joten se on
   * kaiken muun edellä, ja se poistuu itsestään.
   */
  nielaiseNapautus(ms = LENNON_NIELU_MS) {
    const nielaise = (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
    };
    const lajit = ['pointerup', 'click'];
    for (const laji of lajit) document.addEventListener(laji, nielaise, true);
    setTimeout(() => {
      for (const laji of lajit) document.removeEventListener(laji, nielaise, true);
    }, ms);
  }

  /**
   * Harsomaiset pilvet kartan päälle lennon ajaksi (omistajan lisätilaus
   * 26.8.2026: *"Saisiko lennon ajaksi animoitua kevyesti harsomaisia
   * pilviä tai usvaa tai jotain kartan päälle? Voisi liikkua hyvin
   * hitaasti."*).
   *
   * Muutama iso pehmeäreunainen laikku, joilla on eri nopeus ja suunta:
   * hitaimman jakso on lähes kaksi minuuttia, joten yksikään pilvi ei
   * ehdi lennon aikana käydä matkaansa loppuun — liike on sitä lajia,
   * jonka huomaa vasta kun katsoo kahdesti.
   *
   * TEKNIIKKA ON iOS-SÄÄNNÖN MUKAINEN: pehmeys on elementissä itsessään
   * (radial-gradient) eikä suodattimessa, ja liike on pelkkää
   * transformia omalla kerroksellaan. Blur olisi ollut yksi rivi ja
   * palautuisi iPadin webapp-tilassa tyhjänä, kuten kolme kertaa ennen.
   *
   * Pilvet elävät DOMissa vain lennon ajan (savuke vartioi tätä):
   * ikuinen animaatio kartan päällä on juuri se, mitä isoAnimaatio
   * muuten kieltää.
   */
  lennonPilvet(kotelo) {
    if (!kotelo || this.reducedMotion) return null;
    const pilvet = html('div', 'lento-pilvet');
    /*
     * Viisi laikkua: kaksi isoa ja hidasta ylös, kaksi keskikokoista
     * laidoille ja yksi kapea usvaviiru alas. Sijainnit ovat ruudun
     * laidoilla ja nurkissa, koska kone lentää keskeltä — pilvi ei saa
     * peittää konetta, viivaa eikä matkakirjatekstiä.
     */
    const mallit = [
      { x: -14, y: 4, koko: 86, korkeus: 0.5, kirkkaus: 0.2 },
      { x: 46, y: -6, koko: 74, korkeus: 0.46, kirkkaus: 0.17 },
      { x: 58, y: 26, koko: 52, korkeus: 0.55, kirkkaus: 0.13 },
      { x: -8, y: 52, koko: 62, korkeus: 0.5, kirkkaus: 0.12 },
      { x: 18, y: 70, koko: 96, korkeus: 0.3, kirkkaus: 0.1 },
    ];
    // Ajelehdinta: matka ruudun leveydestä, jakso sekunteina ja
    // negatiivinen viive, joka aloittaa liikkeen keskeltä — muuten
    // kaikki viisi lähtisivät samasta kohdasta samaan aikaan.
    const ajot = [
      { matka: 9, nousu: 2, kesto: 104, viive: 0 },
      { matka: -7, nousu: 3, kesto: 132, viive: -12 },
      { matka: 6, nousu: -3, kesto: 88, viive: -30 },
      { matka: 8, nousu: -2, kesto: 118, viive: -46 },
      { matka: -6, nousu: 1, kesto: 146, viive: -8 },
    ].map((ajo, i) => ({ ...mallit[i], ...ajo }));
    for (const m of ajot) {
      const pilvi = html('div', 'lento-pilvi');
      pilvi.style.setProperty('--x', `${m.x}%`);
      pilvi.style.setProperty('--y', `${m.y}%`);
      pilvi.style.setProperty('--koko', `${m.koko}%`);
      pilvi.style.setProperty('--korkeus', String(m.korkeus));
      pilvi.style.setProperty('--kirkkaus', String(m.kirkkaus));
      pilvi.style.setProperty('--matka', `${m.matka}%`);
      pilvi.style.setProperty('--nousu', `${m.nousu}%`);
      pilvi.style.setProperty('--kesto', `${m.kesto}s`);
      pilvi.style.setProperty('--viive', `${m.viive}s`);
      pilvet.appendChild(pilvi);
    }
    kotelo.appendChild(pilvet);
    // Häivytys sisään vasta seuraavassa kehyksessä: luokka samassa
    // lohkossa kuin elementin luonti ei käynnistäisi siirtymää.
    requestAnimationFrame(() => pilvet.classList.add('nakyy'));
    return pilvet;
  }

  /** Pilvet pois — häivytys ensin, poisto vasta sen jälkeen. */
  poistaLennonPilvet(pilvet) {
    if (!pilvet) return;
    pilvet.classList.add('poistuu');
    setTimeout(() => pilvet.remove(), 400);
  }

  /**
   * Katkoviivainen jälki koneen perään (a-kohta, päätoimittaja
   * 26.8.2026).
   *
   * Jokainen katko on oma lyhyt polkunsa, joka syttyy juuri kun kone on
   * ohittanut sen. Sytytys on selaimen oma animaatio kuten koneenkin
   * liike, ja se on VIIVEELLÄ eikä silmukassa: ohitus vie ne loppuun
   * yhdellä finishillä, ja lennon aikana käynnissä on kerrallaan
   * korkeintaan pari lyhyttä häivytystä.
   *
   * Sytytyshetki lasketaan pehmennyksen käänteisfunktiolla: kone kulkee
   * eased-tahtia (kiihdytys ja jarrutus), joten tasainen jako pituudelle
   * antaisi väärän hetken juuri lennon päissä.
   */
  lennonKatkojalki({ kerros, kohta, kokoPituus, mitta = 1, kesto, viive = 0 }) {
    const animaatiot = [];
    if (!kerros || !(kokoPituus > 0)) return animaatiot;
    const jakso = ALOITUSLENNON_KATKO_PX * mitta;
    const maara = Math.max(
      ALOITUSLENNON_KATKOJA_VAHINTAAN,
      Math.min(ALOITUSLENNON_KATKOJA_ENINTAAN, Math.round(kokoPituus / jakso)),
    );
    const oma = kokoPituus / maara;
    const viiva = oma * ALOITUSLENNON_KATKO_OSUUS;
    // easeInOutQuad käänteisenä: millä hetkellä kone on kohdassa x.
    const milloin = (x) => (x < 0.5 ? Math.sqrt(x / 2) : 1 - Math.sqrt((1 - x) / 2));
    for (let i = 0; i < maara; i++) {
      const alku = i * oma;
      const loppu = alku + viiva;
      const kohdat = [];
      for (let k = 0; k <= 3; k++) kohdat.push(kohta((alku + ((loppu - alku) * k) / 3) / kokoPituus));
      const d = `M${kohdat.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L')}`;
      const pala = el('path', { d, class: 'lento-katko' }, kerros);
      pala.style.strokeWidth = (ALOITUSLENNON_VIIVA_PX * 0.8 * mitta).toFixed(2);
      pala.style.opacity = '0';
      animaatiot.push(pala.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 240,
        delay: viive + milloin(Math.min(1, loppu / kokoPituus)) * kesto,
        easing: 'ease-out',
        fill: 'forwards',
      }));
    }
    return animaatiot;
  }

  /**
   * Koneen elävöitys (c-kohta): kevyt pystyhuojunta ja kaksi
   * haalistuvaa vanavesiviirua siivistä taaksepäin.
   *
   * Kallistus reitin suuntaan tulee jo koneen omasta liikkeestä (kulma
   * lasketaan reitiltä), joten tässä lisätään vain se, mikä puuttui:
   * kone ei enää liu'u kuin viivain vaan huojuu ilmavirrassa.
   *
   * HUOJUNTA ON PELKKÄ SIIRTO — ei kiertoa eikä skaalausta. Kone on
   * ryhmä ryhmän sisällä, ja SVG:ssä kierron origo riippuu
   * transform-boxista; siirrolla ei ole origoa, joten se on sama
   * jokaisessa selaimessa. Suunta on koneen omassa kehyksessä eli
   * kohtisuoraan lentorataa vastaan, kuten ilmakuopassa.
   */
  lennonHuojunta(keinu, { mitta = 1, kesto, viive = 0 }) {
    const jaksoja = Math.max(2, Math.round(kesto / 2600));
    const ruudut = [];
    for (let i = 0; i <= 48; i++) {
      const t = i / 48;
      const y = Math.sin(t * Math.PI * 2 * jaksoja) * 2.4 * mitta;
      ruudut.push({ offset: t, transform: `translate(0px, ${y.toFixed(2)}px)` });
    }
    return keinu.animate(ruudut, {
      duration: kesto, delay: viive, easing: 'linear', fill: 'forwards',
    });
  }

  /*
   * SAAPUMISLEIMA ON POISTETTU (omistajan pelitestipalaute v1119:
   * *"POISTA SAAPUMISLEIMA kokonaan — nakyy vain lopussa, turha"*).
   *
   * Leima oli v1118:n taidesuunnan b-kohta: pyorea 1873-postileima,
   * joka laimahti kohdekaupungin viereen koneen laskeuduttua. Ruudulla
   * se ehti nakya vain sen sekunnin, joka kuluu laskeutumisen ja
   * saapumiskortin valissa — ja juuri silloin katse on koneessa. Sen
   * tilalle lentonakymaan tulivat merelle piirtyvat laivareitit
   * (lennonLaivareitit), jotka elavat koko lennon ajan.
   */

  /**
   * LAIVAREITIT MERELLE LENNON AJAKSI (omistajan pelitestipalaute
   * v1119, ks. LAIVAREITTEJA_ENINTAAN).
   *
   * Kartalla on lennon aikana yksi punainen kaari ja tyhjä ulappa.
   * Muutama himmeä katkoviiva merellä kertoo, että maailmassa
   * liikutaan muutenkin kuin ilmateitse — ja että kartta on isoisän
   * merikartta, ei pelilauta.
   *
   * REITIT OVAT LAUDAN OMIA MERIREITTEJÄ (type: 'sea'), joten ne
   * kulkevat vettä pitkin eivätkä mantereiden yli. Rajaukseen osuvista
   * valitaan pisimmät — lyhyt lahdenylitys näyttäisi tikulta.
   *
   * PISTE ON PELKKÄÄ TRANSFORMIA JA PEITTÄVYYTTÄ. Sama sääntö kuin
   * harsopilvillä: ikuinen animaatio kartan päällä on sallittu vain
   * siksi, että se on halvinta laatua omalla kerroksellaan JA että se
   * katoaa laskeutumisessa (koko lentokerros tyhjennetään).
   *
   * @returns {SVGElement|null} ryhmä, tai null jos reittejä ei ollut
   */
  lennonLaivareitit({ kerros, skaala = 1 }) {
    if (!kerros || this.reducedMotion) return null;
    const alue = this.nakyvaAlue();
    const kaupungit = this.game?.board?.cityById;
    const reitit = this.game?.pack?.edges;
    if (!alue?.w || !kaupungit || !Array.isArray(reitit)) return null;
    /** Osuuko piste rajaukseen (väljästi: reitti saa alkaa reunan takaa)? */
    const vara = { x: alue.x - alue.w * 0.15, y: alue.y - alue.h * 0.15 };
    const sisalla = (p) => p.x >= vara.x && p.x <= alue.x + alue.w * 1.15
      && p.y >= vara.y && p.y <= alue.y + alue.h * 1.15;
    const ehdokkaat = [];
    for (const reitti of reitit) {
      if (reitti?.type !== 'sea') continue;
      const a = kaupungit.get(reitti.a);
      const b = kaupungit.get(reitti.b);
      if (!a || !b) continue;
      const pisteet = [
        { x: a.x, y: a.y },
        ...(reitti.via ?? []).map(([x, y]) => ({ x, y })),
        { x: b.x, y: b.y },
      ];
      // Vähintään puolet nivelistä rajauksessa: reitti, josta näkyy
      // pelkkä kulma, näyttäisi irralliselta pätkältä.
      const osuvia = pisteet.filter(sisalla).length;
      if (osuvia < Math.max(2, Math.ceil(pisteet.length / 2))) continue;
      let pituus = 0;
      for (let i = 1; i < pisteet.length; i++) {
        pituus += Math.hypot(pisteet[i].x - pisteet[i - 1].x, pisteet[i].y - pisteet[i - 1].y);
      }
      if (pituus < LAIVAREITIN_VAHIN_PITUUS) continue;
      ehdokkaat.push({ pisteet, pituus });
    }
    if (!ehdokkaat.length) return null;
    ehdokkaat.sort((x, y) => y.pituus - x.pituus);
    const valitut = ehdokkaat.slice(0, LAIVAREITTEJA_ENINTAAN);

    const g = el('g', { class: 'lento-laivat', 'pointer-events': 'none' }, kerros);
    valitut.forEach((reitti, i) => {
      const d = `M${reitti.pisteet.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L')}`;
      const viiva = el('path', { d, class: 'lento-laivareitti' }, g);
      viiva.style.strokeWidth = (LAIVAREITIN_VIIVA_PX / skaala).toFixed(2);
      const jakso = LAIVAREITIN_KATKO_PX / skaala;
      viiva.style.strokeDasharray = `${(jakso * 0.55).toFixed(2)} ${(jakso * 0.45).toFixed(2)}`;
      /*
       * Piste kulkee reittiä pitkin näytteistetyillä avainruuduilla —
       * sama tekniikka kuin koneella, koska getPointAtLength joka
       * kehyksellä nykii iPadin Safarissa. Kaksikymmentä näytettä
       * riittää: liike on niin hidasta, ettei murtoviivan kulmia
       * erota.
       */
      const pituus = viiva.getTotalLength();
      /*
       * PISTEESTÄ LAIVAKSI (omistajan tilaus 26.8.2026: *"välimerelle
       * voisi lisätä myös laivoja kulkemaan"*): kulkija on pieni
       * purjelaivasiluetti — runko ja kaksi purjetta — samaan sepiaan
       * kuin reittiviiva. Ulompi ryhmä liikkuu avainruuduilla, sisempi
       * skaalaa ruudun pikseleihin ja kääntää keulan menosuuntaan
       * (peilaus riittää: reitit kulkevat kartalla enimmäkseen
       * vaakaan, ja pysty keinunta näyttäisi vain oudolta).
       */
      const piste = el('g', { class: 'lento-laivapiste' }, g);
      const eka = reitti.pisteet[0];
      const vika = reitti.pisteet[reitti.pisteet.length - 1];
      const suunta = vika.x < eka.x ? -1 : 1;
      const mitta = (LAIVAN_PISTE_PX / 2.6) / skaala;
      const laiva = el('g', {
        transform: `scale(${(suunta * mitta).toFixed(3)}, ${mitta.toFixed(3)})`,
      }, piste);
      // Runko: matala kaukalo vesirajan alla.
      el('path', { d: 'M-4.2 0.8 L4.2 0.8 L2.6 3 L-2.6 3 Z' }, laiva);
      // Kaksi purjetta ja keulapurje — 1873:n prikin siluetti.
      el('path', { d: 'M-1 -3.8 L-1 0.2 L-3.6 0.2 Z' }, laiva);
      el('path', { d: 'M0 -4.6 L0 0.2 L3 0.2 Z' }, laiva);
      el('path', { d: 'M3.4 -1.6 L3.4 0.2 L4.6 0.6 Z' }, laiva);
      const ruudut = [];
      for (let k = 0; k <= 20; k++) {
        const p = viiva.getPointAtLength((pituus * k) / 20);
        ruudut.push({
          offset: k / 20,
          transform: `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`,
        });
      }
      piste.animate(ruudut, {
        duration: LAIVAN_KIERROS_MS + i * 5200,
        // Negatiivinen viive hajottaa lähdöt: muuten kaikki laivat
        // seisoisivat satamassa samaan aikaan.
        delay: -i * 9000,
        easing: 'linear',
        iterations: Infinity,
      });
      // Kevyt välke omana animaationaan: peittävyys ei ole samassa
      // ominaisuudessa kuin liike, joten kaksi animaatiota ei kilpaile.
      piste.animate(
        [{ opacity: 0.16 }, { opacity: 0.42 }, { opacity: 0.16 }],
        {
          duration: 5200 + i * 900,
          delay: -i * 1700,
          easing: 'ease-in-out',
          iterations: Infinity,
        },
      );
    });
    return g;
  }

  /* ==== SAAPUMISSEKVENSSI (ks. SAAPUMISKORTTI_TAUKO_MS) ============ */

  /** Kohdekaupungin maan nimi pelin omasta rajadatasta. */
  kaupunginMaanNimi(cityId) {
    const map = this.game?.pack?.map;
    const iso = map?.cityCountry?.[cityId];
    return iso ? (map.countryShapes?.[iso]?.nimi ?? '') : '';
  }

  /**
   * Välikortin teksti: kohdekaupunki ja päivälaskuri.
   *
   * Päivä luetaan pelin omasta kellosta ja katto on isoisän ennätys
   * (RECORD_DAYS = 80) — sama luku, jota vasten koko matka mitataan.
   */
  saapumisKortinTeksti(kohde) {
    const nimi = String(kohde?.name ?? '').toUpperCase();
    const paiva = this.game?.dayCount?.() ?? 1;
    return `${nimi} · PÄIVÄ ${paiva}/${RECORD_DAYS}`;
  }

  /**
   * Tyhjä paperi ruudulle ja välikorttiteksti siihen konekirjoituksella.
   *
   * Sama arkki kuin aloitussiirtymässä (naytaAloitusverho): pelkkä
   * pergamentti, ei suodattimia. Kirjoitus käyttää samaa typeTextiä ja
   * samaa naputusääntä kuin etusivun avausteksti ja lennon repliikki
   * (KIRJOITUSRYTMI), joten käsi on koko pelissä sama.
   */
  async naytaSaapumiskortti(kohde) {
    const arkki = this.naytaAloitusverho();
    arkki.classList.add('saapumiskortti');
    await this.wait(ALOITUSVERHO_SISAAN_MS + SAAPUMISKORTTI_TAUKO_MS);
    if (this.dead) return arkki;
    const teksti = html('p', 'saapumiskortti-teksti');
    arkki.appendChild(teksti);
    await new Promise((valmis) => {
      this.typeText(teksti, this.saapumisKortinTeksti(kohde), 'saapuminen', valmis, INTRO_TYPE_MS);
    });
    if (this.dead) return arkki;
    await this.wait(SAAPUMISKORTTI_LUKUAIKA_MS);
    // Teksti häviää ennen karttaa: paperi jää hetkeksi tyhjäksi, ja
    // kartta nousee tyhjältä paperilta eikä tekstin päältä.
    teksti.classList.add('poistuu');
    await this.wait(SAAPUMISKORTTI_TEKSTI_MS);
    teksti.remove();
    return arkki;
  }

  /**
   * Pöllön kaksi kuplaa saapumisen päätteeksi.
   *
   * Ensimmäinen kertoo, mihin tultiin ja mitä täällä on tehtävä;
   * toinen kertoo, mitä sormella tehdään. Ne ovat ruudulla YHTÄ AIKAA
   * allekkain (omistajan tilaus): ohje ei saa syödä sitä lausetta,
   * jonka se selittää.
   *
   * KUPLAT ODOTTAVAT KERTOJAA (omistajan pelitestipalaute v1119:
   * *"pöllön kuplat tulevat vasta kun MATKAPÄIVÄKIRJAN LUENTA on
   * päättynyt"*). Saapumisen matkakirjamerkintä alkaa soida samassa
   * renderissä, joka tämän kutsun edeltää, ja kiinteä 1,8 sekunnin
   * viive ponnahti kuplan kertojan päälle. Nyt ensimmäinen kupla on
   * kiinni luennan loppumisessa (js/luenta.js luennanLoppuun) ja
   * vanha viive on varapolku sille tapaukselle, ettei luentaa ole —
   * mykistys, kertojatila 'ei' tai puuttuva äänite.
   */
  saapumisenKuplat(kohde) {
    const maa = this.kaupunginMaanNimi(kohde?.id);
    const paikka = paikassaMuoto(kohde?.name);
    // Ilman maata tai kaupunkia lause jäisi puolikkaaksi — silloin
    // mieluummin pelkkä toimintaohje kuin rikkinäinen tervetulotoivotus.
    const tervetuloa = maa && paikka
      ? `Tervetuloa ${maahanMuoto(maa)}. Sinun on ratkaistava tehtävä ${paikka} `
        + 'ennen kuin voit etsiä aarretta.'
      : '';
    clearTimeout(this.saapumisKuplaAjastin);
    clearTimeout(this.saapumisKupla2Ajastin);
    const naytaKuplat = (viive) => {
      this.saapumisKuplaAjastin = setTimeout(() => {
        if (this.dead) return;
        polloVihje(tervetuloa || SAAPUMISEN_KUPLA_TOINEN);
        if (!tervetuloa) return;
        this.saapumisKupla2Ajastin = setTimeout(() => {
          if (this.dead) return;
          polloLisavihje(SAAPUMISEN_KUPLA_TOINEN);
        }, SAAPUMISEN_KUPLA_VALI_MS);
      }, viive);
    };
    // Luenta soi tai ei soi — kumpikin haara on olemassa (ks. metodin
    // johdanto). Kuuntelu ei estä mitään: kupla on ainoa, joka odottaa.
    const luenta = luennanLoppuun(this);
    if (luenta) {
      void luenta.then(() => {
        if (this.dead) return;
        naytaKuplat(SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS);
      });
      return;
    }
    naytaKuplat(SAAPUMISEN_KUPLA_MS);
  }

  /*
   * ==================================================================
   * ALOITUSLENTO KARTALLA (omistaja 24.8.2026, Raamatun osio
   * "Fokusmoodi" / ALOITUSLENTO UUSIKSI: *"kun pelaaja valitsee pelin
   * alussa ensimmäisen kohteen, kartta rajautuu automaattisesti niin,
   * että lähtömaa (Lontoo/Britannia) ja kohdemaa näkyvät molemmat
   * sopivalla marginaalilla, ja lentokone lentää punaista viivaa pitkin
   * Lontoosta kohteeseen. Kartta on tällöin jo fokusmoodin tapaan
   * niukka: maat, joissa ei ole käyty tai joissa pelaaja ei ole,
   * himmeinä/sumennettuina. Koko näkymä uusitaan."*)
   * ==================================================================
   *
   * MIKÄ VANHASTA JÄÄ POIS. Avauslento oli tähän asti läpikuultava
   * KALVO kartan päällä (animateFlightSisalla): oikea kartta sumennettiin
   * pergamenttiharson alle ja sen päälle piirrettiin oma kuvitteellinen
   * karttalehti — kääntöpiirit katkoviivalla, isoisän muistiinpanoja
   * kaunokirjoituksella, kompassiruusu ja kaksi nimettyä pistettä ruudun
   * vastakkaisissa nurkissa. Kohtaus oli siis PIIRROS lennosta eikä
   * lento kartalla: suunta oli vain "itään vai länteen, ylös vai alas",
   * eikä kaari päättynyt siihen kaupunkiin, jonka pelaaja juuri valitsi.
   * Juuri sen omistaja näki 24.8.2026 ("näkyy vielä vanha animaatio ja
   * tausta"). Tausta, kohtaus ja niiden sumennus jäävät nyt pois.
   *
   * MIKÄ JÄÄ ENNALLEEN. Repliikki kirjoituskoneineen ja naputuksineen,
   * kertojan luenta, matkustamon äänimaisema, ohitusnuoli ja Astu
   * mantereelle -nappi — kaikki samoine ajoituksineen, joita
   * tests/lento-ajoitus.test.mjs vartioi. Vaihtuu vain se, minkä päällä
   * ne ovat: kalvon oman kuvitteellisen kartan sijaan pelin oma kartta.
   *
   * VANHA KALVO ON YHÄ OLEMASSA eikä sitä poistettu: fokusmoodin
   * kehittäjäkytkin ja liikeherkkyys (reducedMotion) vievät yhä vanhaa
   * tietä (ks. aloituslentoKartalla), samoin lennot, joilta puuttuu
   * maatieto. Myöhemmät lennot (doFly) ovat kokonaan ennallaan.
   *
   * KOLME VAIHETTA:
   *   1. lauta vaihtuu (aloitusnäytöstä maailmankartalle) ja fokusmoodin
   *      niukkuus astuu voimaan: sumu päälle, käymättömät maat himmeinä
   *   2. kamera-ajo lähtömaan ja kohdemaan yhteisrajaukseen
   *      (kartta.maidenBbox + kartta.ajaKamera, Raamattu: KAMERA-AJOT)
   *   3. kone lentää punaista viivaa pitkin Lontoosta kohteeseen
   */

  /**
   * Lennetäänkö aloituslento kartalla vai vanhalla kalvolla?
   *
   * Fokusmoodi on ehto siksi, että koko lento on fokusmoodin näkymä:
   * niukka kartta, sumennetut maat, ei ylimääräistä dataa. Kun
   * kehittäjä kytkee fokusmoodin pois, myös avaus palaa entiselleen.
   * Liikeherkkyys ohittaa animaatiot kaikkialla muuallakin.
   */
  aloituslentoKartalla() {
    return Boolean(this.fokusmoodi && !this.reducedMotion && !this.katselu);
  }

  /**
   * Reittikaaren ohjauspiste laudan koordinaateissa.
   *
   * Kaari on sama kuin laudan omilla lentoreiteillä (drawBoard,
   * .air-route), mutta se kaartuu AINA POHJOISEEN — sama sääntö kuin
   * vanhalla kalvolla ("kaari kaartuu aina ylöspäin kulkusuunnasta
   * riippumatta"). Laudan kaava antaa suunnan etumerkin mukaan, joten
   * länteen lennettäessä ohjauspiste peilataan jänteen keskipisteen
   * kautta. Ilman peilausta Lontoo–New York kaartuisi etelään, mitä
   * yksikään 1800-luvun atlaksen lentoreitti ei tee.
   */
  aloituslennonOhjauspiste(a, b) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const kx = mx + (b.y - a.y) * ALOITUSLENNON_KAARI;
    const ky = my - (b.x - a.x) * ALOITUSLENNON_KAARI;
    return ky > my ? { x: 2 * mx - kx, y: 2 * my - ky } : { x: kx, y: ky };
  }

  /**
   * Aloituslennon rajaus: lähtömaa ja kohdemaa samaan kuvaan niin
   * pitkälle kuin reitti kestää (ks. ALOITUSLENNON_LAAJUUS).
   *
   * Reitin oma laatikko lasketaan päätepisteistä ja kaaren
   * keskipisteestä (Bézier t = 0,5). Se ei ole kaaren tarkka ääriarvo
   * — neliöllisellä käyrällä ääriarvo osuu yleensä hieman muualle —
   * mutta ero on murto-osa marginaalista, ja koko laatikkoa
   * väljennetään joka tapauksessa ALOITUSLENNON_MARGINAALILLA.
   *
   * Rajaus kasvaa siitä maiden rajaukseen asti mutta enintään
   * laajuuskertoimen verran; reitin päätepisteet mahtuvat aina, myös
   * silloin kun ne pistävät maiden laatikon ulkopuolelle.
   */
  aloituslennonRajaus(a, b, isot) {
    const maat = this.kartta.maidenBbox(isot);
    if (!maat) return null;
    const k = this.aloituslennonOhjauspiste(a, b);
    const huippu = { x: (a.x + 2 * k.x + b.x) / 4, y: (a.y + 2 * k.y + b.y) / 4 };
    const rx0 = Math.min(a.x, b.x, huippu.x);
    const rx1 = Math.max(a.x, b.x, huippu.x);
    const ry0 = Math.min(a.y, b.y, huippu.y);
    const ry1 = Math.max(a.y, b.y, huippu.y);
    const cx = (rx0 + rx1) / 2;
    const cy = (ry0 + ry1) / 2;
    const puoliW = (Math.max(rx1 - rx0, 1) * ALOITUSLENNON_LAAJUUS) / 2;
    const puoliH = (Math.max(ry1 - ry0, 1) * ALOITUSLENNON_LAAJUUS) / 2;
    const x0 = Math.min(rx0, Math.max(maat.x, cx - puoliW));
    const x1 = Math.max(rx1, Math.min(maat.x + maat.w, cx + puoliW));
    const y0 = Math.min(ry0, Math.max(maat.y, cy - puoliH));
    const y1 = Math.max(ry1, Math.min(maat.y + maat.h, cy + puoliH));
    if (!(x1 > x0) || !(y1 > y0)) return null;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /**
   * Aloituslento kartalla. Palauttaa true, jos lento oikeasti lennettiin
   * — false tarkoittaa, että kutsujan on lennettävä vanha kalvolento.
   */
  async aloituslento(cityId, line) {
    /*
     * LAUTA VAIHTUU ENNEN LENTOA. Aloitusnäyttö on oma pieni lautansa
     * (js/packs/maailma.js), ja lähtöpisteen valinta vie sen portista
     * varsinaiselle maailmankartalle. Lento piirretään sille laudalle,
     * joten kartta on rakennettava ensin: muuten kone lentäisi laudalla,
     * joka katoaa alta ensimmäisessä piirrossa. render() tekee vaihdon
     * (drawBoardFor) — se on sama kutsu, joka muutenkin tulisi
     * doActionin perässä, tässä vain heti eikä vasta lokin jälkeen.
     */
    this.render();
    const kerros = this.flightLayer;
    const lahto = this.game.board.cityById.get(ALOITUSLENNON_LAHTO);
    const kohde = this.game.board.cityById.get(cityId);
    const maat = this.game.pack?.map?.cityCountry;
    const lahtoIso = maat?.[ALOITUSLENNON_LAHTO];
    const kohdeIso = maat?.[cityId];
    // Ilman maatietoa rajausta ei voi laskea — silloin vanha kalvo on
    // parempi kuin puolikas uusi (sama varovaisuus kuin sumuverholla).
    if (!kerros || !lahto || !kohde || !lahtoIso || !kohdeIso) return false;
    const bbox = this.aloituslennonRajaus(lahto, kohde, [lahtoIso, kohdeIso]);
    if (!bbox) return false;
    try {
      await this.isoAnimaatio(() => this.aloituslentoSisalla({
        kerros, lahto, kohde, bbox, line,
      }));
    } finally {
      /*
       * Lippu alas myös silloin, kun lento katkeaa poikkeukseen. Se
       * pidättelee kamera-ajoja ja annosteluvirtaa, joten pystyyn
       * jäädessään se lamauttaisi koko loppupelin — ja vika näkyisi
       * jossain aivan muualla kuin lennossa.
       */
      this.aloituslentoKesken = false;
      // Lennon yli lykätty bittikarttatyö saa alkaa — ellei kohdemaan
      // lehti juuri peitä lautaa (ks. jatkaLykattyPiirto).
      this.jatkaLykattyPiirto();
    }
    return true;
  }

  /** Lennon varsinainen piirto; kääre yllä hiljentää kartan animaatiot. */
  async aloituslentoSisalla({ kerros, lahto, kohde, bbox, line }) {
    kerros.textContent = '';
    /*
     * kartalento kertoo CSS:lle ja rasteroinnille, että lento on kartan
     * PÄÄLLÄ eikä kalvon takana: pelitila (nappula, kohderenkaat,
     * laatat) piiloon lennon ajaksi, mutta kartan kuva täyteen
     * tarkkuuteen (ks. taydennaTaide).
     */
    document.body.classList.add('flight-active', 'kartalento');
    /*
     * Fokusmoodin niukkuus voimaan ENNEN kamera-ajoa: sumuverho
     * rakennetaan tässä, jotta ajo alkaa jo valmiiksi niukalta kartalta
     * eikä maailma himmene kesken liikkeen.
     *
     * MAAKOHTAISTA POHJAA EI PIIRRETÄ LENNON AIKANA (omistajan pelitesti
     * 25.8.2026, ks. js/fokuskartta.js). Lentonäkymä on niukka vanha
     * kartta punaisella viivalla; lehti, sen verhonreikä, laatan alle
     * keskitetyt nimilaput ja kohtaamispiste tulevat vasta perillä.
     */
    this.paivitaFokusKerros();

    // --- 1) Kamera-ajo: lähtömaa ja kohdemaa samaan kuvaan -----------
    /*
     * pakota, koska lento omistaa kameran (ks. kartta.ajaKamera):
     * this.aloituslentoKesken torjuu muut ajot lennon ajaksi, ja tämä on
     * se yksi ajo, joka saa mennä läpi.
     */
    /*
     * PERGAMENTTIARKIN TAKANA KAMERA EI AJA VAAN ASETTUU (omistajan
     * tilaus 25.8.2026). Ajo alkaisi uuden laudan oletusnäkymästä eli
     * koko maailmankartasta, ja juuri se on se tyhjä maailmankartta,
     * joka ennen välähti — arkin takana ajolla ei olisi katsojaa,
     * vain hinta. kesto 0 vie näkymän rajaukseen kerralla.
     *
     * Ilman arkkia (esim. jos verho on jo ehditty poistaa) ajo menee
     * kuten ennenkin.
     */
    await this.kartta.ajaKamera(
      { bbox, marginaali: ALOITUSLENNON_MARGINAALI },
      { kesto: this.aloitusverho ? 0 : ALOITUSLENNON_AJO_MS, pakota: true },
    );
    if (this.dead) return;
    /*
     * ARKIN TAKANA ODOTETAAN VAIN KARKEA KOKO LAUDAN KUVA.
     *
     * Pohjataso (rasteroiTaide → rasteroiPohja) on koko laudan
     * bittikartta, ja se on avauksen ratkaiseva hetki kahdesta syystä.
     * Se on ensimmäinen kuva, joka näyttää kartalta ilman vektoreita —
     * ja ennen kaikkea se PÄÄSTÄÄ VEKTORIT POIS (poistaVektorit).
     * Niin kauan kuin laudan 7000 vektorielementtiä ovat elävässä
     * puussa, jokainen lähikuvan kehys maksaa Chromiumissa mitatusti
     * 1,6 sekuntia: kone nytkähtelisi, kirjoituskone naputtaisi sanan
     * puolentoista sekunnin välein eikä ajastin osuisi mihinkään.
     *
     * ODOTUS ON LYHYT JA MITATTU KELLOSTA. Vanha versio odotti koko
     * ruutusarjan valmistumista silmukalla, joka laski ajastimen
     * laukeamisia — ja koska juuri ne olivat jumissa, sen luvattu
     * kolmen sekunnin katto venyi kuudeksitoista. Tässä katto luetaan
     * performance.now():sta, joten se pitää riippumatta siitä, mitä
     * pääsäie tekee. Kattoon osuessaan lento lähtee joka tapauksessa.
     *
     * TARKAT RUUDUT EIVÄT KUULU TÄHÄN (omistajan tilaus 25.8.2026:
     * *"karkea kuva SAA tarkentua koneen lennon alla; älä odota täyttä
     * rasterointia verhon takana"*). Ne piirretään perillä — tai
     * jäävät piirtämättä, jos kohdemaan lehti peittää laudan.
     */
    /*
     * ODOTUS PÄTEE MYÖS NYT, KUN LAUTA ON ATLAKSEN ALLA (25.8.2026,
     * ilta). Pohjataso rakennetaan yhä kerran, koska juuri se päästää
     * vektorit pois — ja piilotettukin vektorikerros maksaa Chromiumissa
     * (ks. rasteroiTaide). Odotus on siis edelleen se hetki, jonka
     * jälkeen kone lentää kevyen puun päällä.
     */
    const pohjanTakaraja = performance.now() + ALOITUSLENNON_POHJA_ODOTUS_MS;
    while (!this.dead && !this.taidePohja && this.pohjaTulossa
      && performance.now() < pohjanTakaraja) {
      // eslint-disable-next-line no-await-in-loop
      await this.wait(60);
    }
    if (this.dead) return;
    /*
     * KARTTA TARKENTUU KONEEN LENNON ALLA — EI ARKIN TAKANA.
     *
     * Tässä oli odotus, joka piti pergamenttiarkkia ruudulla siihen
     * asti kunnes koko ruutusarja oli rasteroitu (30 x 100 ms).
     * Ylärajan piti olla kolme sekuntia, mutta se ei pitänyt: silmukan
     * odotukset ovat ajastimia, ja rasterointi jumittaa pääsäikeen
     * satojen millisekuntien erissä, joten yksi kierros venyi
     * mitatusti puoleentoista sekuntiin. Klikkauksesta koneen lähtöön
     * kului Chromiumissa 24 sekuntia, ja siitä 16 tämän silmukan
     * takana — pergamentti ruudulla, ei mitään tapahtumassa.
     *
     * Omistajan tilaus 25.8.2026: *"kartta tulisi nopeasti feidaten
     * ilman odottelua ja sen jälkeen tulisi ääni ja lentokone alkaisi
     * liikkua"* — ja *"karkea kuva saa tarkentua koneen lennon alla"*.
     * Arkki väistyy siis heti kun kamera on rajauksessa ja kone on
     * kiitoradalla (ks. piilotaAloitusverho alempana), ja ruutusarja
     * jatkuu lennon alla. Kartta ei ole silloin tyhjä: laudan vektorit
     * ovat paikallaan täydessä tarkkuudessaan ja pohjataso niiden
     * alla — tarkentuu vain se, mikä on jo oikein.
     */

    // --- 2) Reitti ja kone laudan koordinaateissa --------------------
    /*
     * Mittakaava luetaan kerran: kamera on nyt paikallaan koko lennon
     * ajan, joten viivan paksuus ja koneen koko voidaan muuntaa ruudun
     * pikseleistä laudan yksiköiksi tässä eikä joka kehyksellä.
     */
    const skaala = this.nakyvaAlue()?.skaala || 1;
    const a = { x: lahto.x, y: lahto.y };
    const b = { x: kohde.x, y: kohde.y };
    /*
     * LAIVAREITIT ENSIMMÄISENÄ eli lentoreitin ja koneen ALLE: ne ovat
     * kartan taustaa, eivät kohtauksen tapahtuma. Poistuvat kerroksen
     * mukana laskeutumisessa (ks. lennonLaivareitit).
     */
    this.lennonLaivareitit({ kerros, skaala });
    // Sama kaari kuin rajausta laskettaessa — yksi ja sama ohjauspiste,
    // jottei viiva voi kulkea kuvan ulkopuolelta.
    const ohjaus = this.aloituslennonOhjauspiste(a, b);
    // Lähtömerkki Lontoon kohdalle: reitin alkupää on luettava, vaikka
    // Britannia on käymättömänä maana sumun alla.
    el('circle', {
      cx: a.x,
      cy: a.y,
      r: (ALOITUSLENNON_VIIVA_PX * 1.6) / skaala,
      class: 'aloituslento-piste',
    }, kerros);
    const reitti = el('path', {
      d: `M${a.x},${a.y} Q${ohjaus.x},${ohjaus.y} ${b.x},${b.y}`,
      class: 'flight-trail',
    }, kerros);
    /*
     * VIIVA PIIRTYY KONEEN EDETESSÄ, EI KOKONAAN VALMIIKSI.
     *
     * Kaksi syytä. Kartalla valmis kaari kertoisi määränpään ennen kuin
     * sinne on tultu — ja juuri se saapuminen on avauksen ainoa
     * tapahtuma. Toiseksi valmis viiva kilpailisi koneen kanssa: silmä
     * lukee ensin pisimmän viivan eikä liikkuvaa pistettä. Piirtyvä
     * viiva tekee päinvastoin, se on koneen jälki — sama kieli kuin
     * vanhalla kalvolla, joten mitään ei mene hukkaan.
     *
     * TUORE VETÄISY KÄRJESSÄ, KATKOJÄLKI TAKANA (päätoimittajan
     * taidesuunta 26.8.2026). Pääpolusta näkyy vain lyhyt yhtenäinen
     * pätkä, joka kulkee koneen mukana: dasharray on "kärki + koko
     * pituus", jolloin kuvioon mahtuu koko polulle vain yksi viiva, ja
     * dashoffset siirtää sen koneen perään. Kuljettu matka jää
     * näkyviin erillisinä katkoina (lennonKatkojalki) — se on vanhojen
     * retkikuntakarttojen reittimerkintä.
     */
    reitti.style.strokeWidth = (ALOITUSLENNON_VIIVA_PX / skaala).toFixed(2);
    const kokoPituus = reitti.getTotalLength();
    const karki = Math.min(kokoPituus, (ALOITUSLENNON_KARKI_PX / skaala));
    reitti.style.strokeDasharray = `${karki} ${kokoPituus}`;
    reitti.style.strokeDashoffset = karki;

    const kone = el('g', { class: 'flight-plane' }, kerros);
    // Huojunta omaan ryhmäänsä: koneen oma muunnos on varattu reitille
    // (siirto + kääntö), eikä yksi elementti voi kantaa kahta
    // animaatiota samasta ominaisuudesta.
    const keinu = el('g', { class: 'flight-keinu' }, kone);
    const runko = el('g', {
      transform: `scale(${(ALOITUSLENNON_KONE_PX
        / (ALOITUSLENNON_KONE_MITTA * skaala)).toFixed(4)})`,
    }, keinu);
    /*
     * Vanavesiviirut siivistä taaksepäin: kaksi ohutta viivaa, jotka
     * haalistuvat liu'ulla eivätkä suodattimella (iOS-sääntö). Liuku
     * on koneen omassa kehyksessä, joten viiru osoittaa aina taakse.
     */
    const defs = el('defs', {}, kerros);
    const vana = el('linearGradient', {
      id: 'lento-vana',
      x1: -7, y1: 0, x2: -34, y2: 0,
      gradientUnits: 'userSpaceOnUse',
    }, defs);
    el('stop', { offset: 0, 'stop-color': '#2e2114', 'stop-opacity': 0.34 }, vana);
    el('stop', { offset: 1, 'stop-color': '#2e2114', 'stop-opacity': 0 }, vana);
    el('path', { d: 'M-7,-6.5 L-31,-9.5', class: 'lento-vana' }, runko);
    el('path', { d: 'M-7,6.5 L-31,9.5', class: 'lento-vana' }, runko);
    // Sama koneen piirros kuin vanhalla kalvolla: runko, siivet, pyrstö.
    // Mitta ruudun pikseleinä, jottei kone kasva mantereen kokoiseksi.
    el('path', {
      d: 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
        + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z',
      class: 'flight-plane-body',
    }, runko);

    // Reitti näytteistetään kerran valmiiksi (sama syy kuin kalvolla:
    // getPointAtLength joka kehyksellä nykii etenkin iPadin Safarissa).
    const NAYTTEITA = 240;
    const naytteet = [];
    for (let i = 0; i <= NAYTTEITA; i++) {
      naytteet.push(reitti.getPointAtLength((kokoPituus * i) / NAYTTEITA));
    }
    const kohta = (osuus) => {
      const f = Math.min(NAYTTEITA - 0.001, Math.max(0, osuus * NAYTTEITA));
      const i = Math.floor(f);
      const j = f - i;
      const p1 = naytteet[i];
      const p2 = naytteet[i + 1];
      return {
        x: p1.x + (p2.x - p1.x) * j,
        y: p1.y + (p2.y - p1.y) * j,
        kulma: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI,
      };
    };

    // --- 3) Repliikki, ohitus ja kohtauksen kerrokset -----------------
    /*
     * OHITUS VIE PERILLE HETI (omistajan tilaus 26.8.2026: *"jos pelaaja
     * haluaa kiirehtiä, niin napauttamalla ruutua animaatio katkeaa
     * kesken ja pelaaja pääsee siirtymään mantereelle välittömästi"*).
     *
     * Ennen napautus vain hypäytti koneen perille ja kalvo jäi
     * odottamaan napin painallusta. Nyt sama napautus on koko lennon
     * loppu: animaatiot viedään loppuun (ei puolinaisia tiloja),
     * repliikki päätetään, ja lupaus päästää suorituksen suoraan
     * saapumiseen. Äänet vaikenevat samassa kohdassa kuin tavallisessa
     * laskeutumisessa, koska ne ovat saapumisen omassa lohkossa.
     */
    const lentoAnimaatiot = [];
    let ohitettu = false;
    let ohitusKuittaus = null;
    const ohitusLupaus = new Promise((valmis) => { ohitusKuittaus = valmis; });
    const ohitaLento = () => {
      if (ohitettu) return;
      ohitettu = true;
      for (const anim of lentoAnimaatiot) anim.finish();
      this.paataLennonTeksti(line);
      this.nielaiseNapautus();
      ohitusKuittaus();
    };
    /*
     * Kalvo on nyt LÄPINÄKYVÄ (.flight-overlay.kartalla): siitä jää
     * jäljelle vain repliikin pysty pino, hento vinjetti ja koko ruudun
     * kokoinen ohituskuuntelija. Tausta, sumennus ja piirretty kohtaus
     * ovat poissa — kartta näkyy sellaisenaan.
     */
    const overlay = html('div', 'flight-overlay kartalla');
    this.mapPane.appendChild(overlay);
    overlay.addEventListener('pointerdown', ohitaLento, { once: true });
    /*
     * Hento vinjetti lennon ajaksi (d-kohta, päätoimittajan taidesuunta
     * 26.8.2026): ruudun reunat tummuvat aavistuksen, jolloin katse
     * hakeutuu kartan keskelle reitin päälle. Liuku elementissä eikä
     * suodattimessa, ja se häipyy kalvon mukana.
     */
    overlay.appendChild(html('div', 'lento-vinjetti'));
    const alaosa = html('div', 'flight-alaosa');
    overlay.appendChild(alaosa);
    this.flightLineValmis = null;
    if (line) this.showFlightLine(line, alaosa);
    // Harsopilvet kartan päälle koko lennon ajaksi.
    const pilvet = this.lennonPilvet(this.mapPane);
    const sanoja = line ? String(line).trim().split(/\s+/).length : 0;
    const lennonKesto = Math.min(
      LENNON_ENINTAAN_MS,
      Math.max(
        FLY_OVERLAY_MS,
        LENNON_POHJA_MS + sanoja * LENNON_SANA_MS,
        line ? LENNON_TEKSTI_VIIVE_MS + kirjoituksenKesto(line) + LENNON_LUKUAIKA_MS : 0,
      ),
    );
    const nuoli = html('button', 'flight-eteen');
    nuoli.type = 'button';
    nuoli.setAttribute('aria-label', 'Ohita lento');
    nuoli.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">'
      + '<path d="M8 5 L15 12 L8 19" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    overlay.appendChild(nuoli);
    const nuolenAjastin = setTimeout(() => nuoli.classList.add('nakyy'), LENNON_NUOLI_MS);
    nuoli.addEventListener('click', ohitaLento);

    // --- 4) Lento selaimen omina animaatioina ------------------------
    const RUUTUJA = 120;
    const koneRuudut = [];
    const reittiRuudut = [];
    for (let i = 0; i <= RUUTUJA; i++) {
      const t = i / RUUTUJA;
      // Pehmeä kiihdytys ja jarrutus, jottei kone nykäise liikkeelle.
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const p = kohta(e);
      koneRuudut.push({
        offset: t,
        transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px) rotate(${p.kulma.toFixed(2)}deg)`,
      });
      // Tuore vetäisy kulkee koneen perässä: kuvion ainoa viiva alkaa
      // aina kärjen verran ennen konetta ja päättyy koneeseen.
      reittiRuudut.push({ offset: t, strokeDashoffset: karki - kokoPituus * e });
    }
    kone.style.transform = koneRuudut[0].transform;
    /*
     * ARKKI POIS VASTA NYT: kaikki on paikallaan — kartta rajattuna
     * lähtömaahan ja kohdemaahan, lähtömerkki Lontoon kohdalla, kone
     * kiitoradalla. Pergamenttiarkista feidataan siis suoraan valmiiseen
     * lentonäkymään, eikä tyhjää maailmankarttaa näy hetkeäkään
     * (omistajan tilaus 25.8.2026, ks. ALOITUSVERHO_SISAAN_MS).
     */
    await this.piilotaAloitusverho();
    if (this.dead) return;
    /*
     * ÄÄNI ENSIN, SITTEN KARTTA, SITTEN KONE (omistajan tilaus
     * 27.8.2026: *"olisi kiva ensin kuulla kabiinin ääni ennenkuin
     * lentokone feidautuu kartan kanssa näytölle"*).
     *
     * Aiemmin matkustamon äänimaisema lähti tästä eli samalla hetkellä
     * kuin kartta paljastui (tilaus 25.8.2026: *"kartta tulisi nopeasti
     * feidaten ja sen jälkeen tulisi ääni"*). Nyt se on jo soinut arkin
     * takana koko sisääntulon ajan — käynnistys tapahtuu napautuksessa
     * (doPickStart → aloitaLennonAmbienssi). Tämä kutsu jää
     * varmistukseksi: se toteaa saman äänen soivan eikä aloita mitään
     * uudestaan, mutta hoitaa käynnistyksen niissä poluissa, joissa
     * napautuksen kohta on ohitettu (esim. kehittäjätilan hyppy).
     */
    this.syncAmbience();
    await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    const koneAnim = kone.animate(koneRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    const reittiAnim = reitti.animate(reittiRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    lentoAnimaatiot.push(koneAnim, reittiAnim);
    // Katkojälki ja koneen huojunta samaan tahtiin: ne ovat kohtauksen
    // koristeita, mutta ohituksen on vietävä nekin loppuun, ettei
    // ruudulle jää puolikasta reittimerkintää.
    lentoAnimaatiot.push(...this.lennonKatkojalki({
      kerros, kohta, kokoPituus, mitta: 1 / skaala, kesto: lennonKesto, viive: 180,
    }));
    lentoAnimaatiot.push(this.lennonHuojunta(keinu, {
      mitta: 1 / skaala, kesto: lennonKesto, viive: 180,
    }));
    await Promise.all([koneAnim.finished, reittiAnim.finished]).catch(() => {
      /* peruttu animaatio (esim. uusi peli) ei kaada lentoa */
    });

    /*
     * PERILLÄ — JA JATKO TAPAHTUU ITSESTÄÄN (omistajan tilaus
     * 26.8.2026). Astu mantereelle -nappia ei enää ole; tilalla on
     * kaksi odotusta, jotka molemmat katkeavat napautuksesta:
     *
     *   1. repliikki loppuun (sama mitattu sääntö kuin ennen: kone ei
     *      saa jättää lausetta kesken)
     *   2. lyhyt hengähdys (LENNON_JATKO_MS), jonka aikana koneen
     *      laskeutumisen ehtii nähdä
     *
     * KOLMANTENA OLI SAAPUMISLEIMA. Se on poistettu v1119:ssä
     * (omistaja: *"näkyy vain lopussa, turha"*) — ks. poiston perustelu
     * lennonKatkojaljen jäljessä.
     */
    await Promise.race([
      this.flightLineValmis ?? Promise.resolve(),
      this.wait(LENNON_TEKSTI_ODOTUS_MS),
      ohitusLupaus,
    ]);
    clearTimeout(nuolenAjastin);
    nuoli.remove();
    if (!ohitettu) await Promise.race([this.wait(LENNON_JATKO_MS), ohitusLupaus]);

    // --- 5) Saapumissekvenssi: paperi, välikortti, kartta, kuplat ----
    sfx.stopFlight();
    this.ennakoiAmbienssi(this.game.player?.pos);
    /*
     * PAPERI ENSIN, VASTA SITTEN PURKU. Arkki nousee lentonäkymän
     * päälle ja täyttää ruudun; kone, viiva ja leima häipyvät sen alla
     * eikä purkua näy. Ilman tätä järjestystä ruudulla välähtäisi
     * puolittain purettu kohtaus.
     */
    const kortti = this.naytaSaapumiskortti(kohde);
    document.body.classList.remove('flight-active', 'kartalento');
    overlay.classList.add('flight-leaving');
    this.poistaLennonPilvet(pilvet);
    kerros.classList.add('lento-poistuu');
    await this.wait(280);
    overlay.remove();
    kerros.textContent = '';
    kerros.classList.remove('lento-poistuu');
    this.hideFlightLine();
    // Välikortti kirjoittuu ja häipyy arkilla; kartta rakennetaan
    // vasta sen jälkeen, arkin takana.
    await kortti;
    if (this.dead) return;
    /*
     * Lento päättyy tähän, ja vasta nyt muut kamera-ajot ovat taas
     * sallittuja. Render tekee loput kahdessa osassa:
     *
     *   1. KAMERA KOHDEMAAHAN — ILMAN AJOA. Lipun laskiessa kohdemaa on
     *      fokuskartan mielestä vaihtunut ('pois' → GRC), ja
     *      js/fokuskartta.js vie näkymän samaan rajaukseen kuin
     *      muissakin maanvaihdoksissa — lehden IKKUNAAN, ei maan
     *      muotolaatikkoon. Saapumissekvenssissä se ASETTUU eikä aja
     *      (saapumisAsettuu → kesto 0): ajo alkaisi näkymästä, jota
     *      kukaan ei nähnyt, koska arkki peittää sen — omistajan
     *      tilaus 26.8.2026: *"kartta feidautuu sisään SUORAAN oikeassa
     *      zoomitilassa — EI zoomausanimaatiota"*.
     *   2. FOKUSKERROKSET JA ANNOSTELUVIRTA. Lehti, nimilaput,
     *      kohtaamispiste ja fokusvirtaSaapuminen odottivat lennon ajan
     *      ja alkavat nyt kuten muillakin saapumisilla.
     */
    this.aloituslentoKesken = false;
    this.saapumisAsettuu = true;
    try {
      this.render();
    } finally {
      this.saapumisAsettuu = false;
    }
    // Arkki pois: kartta on jo valmiissa rajauksessaan sen takana.
    await this.piilotaAloitusverho();
    if (this.dead) return;
    this.saapumisenKuplat(kohde);
  }

  /**
   * Siirtää nappulaa askel kerrallaan annettua polkua pitkin.
   *
   * `saatto` kytkee laudalla tehtävän matkan lisät (#96): kamera liukuu
   * nappulan mukana kohti määränpäätä ja — maitse kuljettaessa
   * (`maitse`) — matkan ajaksi nousee oma äänimaisema. Lennot kutsuvat
   * ilman valitsimia, jolloin mikään ei muutu.
   */
  async animatePawn(player, from, path, stepMs = STEP_MS, valinnat = {}) {
    return this.isoAnimaatio(
      () => this.animatePawnSisalla(player, from, path, stepMs, valinnat),
    );
  }

  /**
   * Käynnistää saattavan kamera-ajon matkan ajaksi (#96).
   *
   * KOLME EHTOA. (1) Liikeherkkyys ohittaa: silloin nappulakaan ei
   * liiku vaan hyppää perille. (2) Kartan on jo oltava LÄHIKUVASSA —
   * yleiskuvasta ajo pakottaisi mannerZoomin päälle ja siis zoomaisi,
   * mikä ei ole tilaus (tilaus on panorointi). (3) Siirron on oltava
   * ruudulla tuntuva (SAATON_VAHIN_PX), muuten kartta vain värähtäisi.
   *
   * KOHDE ON MATKAN PÄÄTEPISTE eikä kaupungin muotolaatikko: kerrointa
   * ei anneta, joten kamera pitää nykyisen mittakaavansa ja pelkkä
   * keskipiste siirtyy. Näin nappulan käänteisskaalaus (kerroin
   * animatePawnSisalla) pysyy voimassa koko matkan ajan.
   *
   * Lupausta ei odoteta: ajo saa jäädä pyörimään saapumisen yli, ja
   * ele saa keskeyttää sen milloin tahansa.
   */
  aloitaSaattavaKamera(path, kesto) {
    this.saatonPaluuKerroin = null;
    if (this.reducedMotion || this.dead) return;
    const kartta = this.kartta;
    if (!kartta?.ajaKamera || !this.mannerZoom) return;
    const maali = path[path.length - 1];
    if (!maali) return;
    const kohta = pixelOf(this.game.board, maali);
    const nyt = kartta.kameranTila?.();
    if (!nyt) return;
    /*
     * LÄHEMMÄS ON EHTO, EI KORISTE. Ajo tehdään myös silloin kun matka
     * on ruudulla lyhyt, koska zoomi yksinään liikuttaa lautaa —
     * SAATON_VAHIN_PX torjuu vain sen tapauksen, jossa EIKÄ kohde siirry
     * EIKÄ mittakaava muutu (kamera on jo lähikuvan katossa kohteen
     * päällä).
     */
    const lahtoKerroin = kartta.zoomiKerroin;
    const kerroin = lahtoKerroin * SAATON_LAHENNYS;
    const matka = Math.hypot(kohta.x - nyt.x, kohta.y - nyt.y) * nyt.skaala;
    const lahenee = kartta.kameranKohde?.(
      { x: kohta.x, y: kohta.y, kerroin },
      this.mapPane?.clientWidth ?? 0,
      this.mapPane?.clientHeight ?? 0,
    );
    const zoomaa = lahenee ? Math.abs(lahenee.kerroin / lahtoKerroin - 1) > 0.02 : false;
    if (!(matka > SAATON_VAHIN_PX) && !zoomaa) return;
    /*
     * Paluu tarvitsee kaksi asiaa, ja molemmat katoavat matkan aikana:
     * LÄHTÖKERTOIMEN (ajo kirjoittaa zoomiVapaan uuteen arvoonsa) ja
     * tiedon siitä, PÄÄSIKÖ AJO PERILLE — lupaus ratkeaa arvolla false,
     * jos ele keskeytti sen.
     */
    this.saatonPaluuKerroin = lahtoKerroin;
    this.saatonAjo = kartta.ajaKamera(
      { x: kohta.x, y: kohta.y, kerroin },
      { kesto, pehmennys: SAATON_PEHMENNYS },
    );
  }

  /**
   * Saattozoomi purkautuu perillä (#96 + omistajan pelitesti
   * 27.8.2026): kamera palaa siihen kertoimeen, josta matka alkoi, ja
   * jää nappulan kohdalle.
   *
   * EI AJETA, JOS SAATTO KESKEYTYI. Keskeytys tarkoittaa, että pelaaja
   * otti kartan omaan käteensä (kartta.pysaytaKameraAjo kirjaa
   * välivaiheen oikeaksi kameratilaksi) — silloin paluu olisi toinen
   * ohjastus samaan karttaan ja veisi sen pois siitä kohdasta, jonka
   * pelaaja juuri valitsi.
   *
   * Lupausta ei odoteta: saapumisen kortit, kuplat ja mahdollinen
   * maanvaihdoksen oma ajo saavat alkaa heti.
   */
  async puraSaattavaKamera(path) {
    const kerroin = this.saatonPaluuKerroin;
    const ajo = this.saatonAjo;
    this.saatonPaluuKerroin = null;
    this.saatonAjo = null;
    if (!kerroin || !ajo || this.reducedMotion || this.dead) return;
    // Menoajon lupaus on tässä kohtaa jo ratkennut (kesto = matkan
    // kesto); false tarkoittaa, että ele keskeytti sen.
    const perille = await ajo;
    if (!perille || this.dead || !this.kartta?.ajaKamera) return;
    const maali = path[path.length - 1];
    if (!maali) return;
    const kohta = pixelOf(this.game.board, maali);
    void this.kartta.ajaKamera(
      { x: kohta.x, y: kohta.y, kerroin },
      { kesto: SAATON_PALUU_MS },
    );
  }

  /**
   * Jalkamatkan äänimaisema (#96): kevyt maastoääni matkan ajaksi.
   *
   * Sama kaava kuin lennon kabiiniäänellä (aloitaLennonAmbienssi): oma
   * lippu kertoo syncAmbiencelle, ettei matkan aikana osuva piirto saa
   * palauttaa lähtökaupungin maisemaa kesken kaiken. Ääni feidautuu
   * sisään matkan alkaessa; ULOS se lähtee itsestään, koska viimeinen
   * askel käynnistää määränpään maiseman (ennakoiAmbienssi) ja
   * soittimet ristihäivytetään.
   */
  aloitaJalkamatkanAani() {
    if (this.radioPaalla() || this.dead) return;
    this.jalkamatkanAani = true;
    playPlaceAmbience('jalkamatka', JALKAMATKAN_MAISEMA, this.game.pack?.id);
  }

  /**
   * Lopettaa jalkamatkan äänimaiseman. Lippu nollataan AINA, mutta
   * maisema vaihdetaan vain kun mikään muu ei ole jo ottanut ääntä
   * haltuunsa: kaupunkiin saavuttaessa ennakoiAmbienssi on ehtinyt
   * käynnistää määränpään maiseman, eikä sitä saa keskeyttää.
   */
  lopetaJalkamatkanAani({ vaihtui = false } = {}) {
    if (!this.jalkamatkanAani) return;
    this.jalkamatkanAani = false;
    if (!vaihtui && !this.dead) this.syncAmbience();
  }

  /**
   * Yksi hyppy askelpisteestä toiseen (#100).
   *
   * KAARI ON PARAABELI, EI CSS-SIIRTYMÄ. Vaakasuunnassa liike on
   * ease-in-out (nappula lähtee levosta ja pysähtyy lepoon), ja
   * pystysuunnassa korkeus on `4t(1-t)` eli symmetrinen kaari, joka on
   * nolla molemmissa päissä ja huipussaan puolivälissä. Kaksi eri
   * käyrää samassa hypyssä on juuri se, mikä tekee liikkeestä
   * kolmiulotteisen: käsi kiihdyttää nappulaa vaakasuunnassa, mutta
   * korkeus noudattaa omaa lakiaan.
   *
   * VARJO MYY KORKEUDEN. Se jää laudan pintaan, kutistuu ja haalenee
   * laella ja palaa laskeutuessa. Ilman sitä kaari näyttäisi pelkältä
   * mutkalta kartalla.
   *
   * Palauttaa lupauksen, joka ratkeaa laskeutumishetkellä.
   */
  hyppaaAskel(g, hahmo, varjo, a, b, kesto, koko) {
    const matka = Math.hypot(b.x - a.x, b.y - a.y);
    const huippu = Math.min(HYPYN_KORKEUS_MAX, Math.max(HYPYN_KORKEUS_MIN, matka * HYPYN_KAARI));
    return new Promise((valmis) => {
      const alku = performance.now();
      const kehys = (nyt) => {
        // Kuollut peli ei enää piirrä; irronnut nappula (render pyyhki
        // kerroksen kesken siirron) saa silti hyppynsä loppuun, jottei
        // koko matka syöksy läpi yhdessä kehyksessä.
        if (this.dead) { valmis(); return; }
        const t = Math.min(1, (nyt - alku) / kesto);
        // Vaaka: ease-in-out. Pysty: paraabeli, nolla päissä.
        const e = t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
        const korkeus = huippu * 4 * t * (1 - t);
        const osuus = huippu > 0 ? korkeus / huippu : 0;
        g.style.transform =
          `translate(${(a.x + (b.x - a.x) * e).toFixed(2)}px, ${(a.y + (b.y - a.y) * e).toFixed(2)}px)${koko}`;
        hahmo?.setAttribute('transform', `translate(0,${(-korkeus).toFixed(2)})`);
        varjo?.setAttribute(
          'transform',
          `translate(2,${NAPPULAN_JALKA_Y}) scale(${(1 - 0.4 * osuus).toFixed(3)})`,
        );
        if (varjo) varjo.style.opacity = (1 - 0.55 * osuus).toFixed(3);
        if (t >= 1) { valmis(); return; }
        requestAnimationFrame(kehys);
      };
      requestAnimationFrame(kehys);
    });
  }

  /** Nappulan varsinainen siirto; kääre yllä hiljentää kartan animaatiot. */
  async animatePawnSisalla(player, from, path, stepMs = STEP_MS, { saatto = false, maitse = false } = {}) {
    if (!path || path.length === 0) return;
    const { board } = this.game;
    /*
     * KOHDEMAAN LEHTI HAKUUN HETI, ei vasta perillä (omistajan
     * laitepalaute 28.8.2026). Kartan piirto — ja siis lehden nouto —
     * ajetaan vasta animaation jälkeen (run → finally → render), joten
     * ilman tätä koko megatavujen lehti haettiin ja purettiin siinä
     * hetkessä, jossa pelaaja katsoo karttaa. Ks. fokuskartta.js
     * esilataaMatkanLehti; purku tehdään työntekijässä eikä siis vie
     * kehyksiä tältä animaatiolta.
     */
    esilataaMatkanLehti(this, path[path.length - 1]);

    this.movingPlayerId = player.id;
    this.drawPawns();
    const g = this.pawnShape(this.pawnLayer, player, false);
    g.classList.add('pawn-moving');
    const hahmo = g.querySelector('.pawn-hahmo');
    const varjo = g.querySelector('.pawn-varjo');

    /*
     * MATKAN LISÄT LAUDALLA (#96) ENNEN MITOITUSTA. Kesto lasketaan
     * tässä, koska sekä kamera että ääni tarvitsevat saman luvun:
     * hyppyjä on path.length ja taukoja yksi vähemmän.
     *
     * JÄRJESTYS ON OLEELLINEN. Saattoajo vie näkymän lopulliseen
     * mittakaavaansa heti (kartta.ajaKamera → fitViewBox) ja piirtää
     * matkan sen päälle kuoren muunnoksena. Nappulan käänteisskaalaus
     * on siis luettava VASTA ajon jälkeen — muuten se olisi lähtötilan
     * mittakaavasta ja nappula jäisi perillä väärän kokoiseksi siihen
     * asti, kunnes seuraava piirto korjaa sen.
     */
    if (saatto) {
      const kokonaiskesto = path.length * stepMs
        + Math.max(0, path.length - 1) * HYPYN_TAUKO_MS;
      this.aloitaSaattavaKamera(path, kokonaiskesto);
      /*
       * YHDEN ASKELEEN MATKA JÄÄ ILMAN OMAA ÄÄNTÄ. Maisema nousee
       * kuuluviin 900 ms:ssa, ja viimeinen askel vaihtaa sen jo
       * määränpään ääneen — yhdellä hypyllä siitä jäisi vain
       * puolikas väre. Kamera saa silti saattaa: liike näkyy heti.
       */
      if (maitse && path.length > 1) this.aloitaJalkamatkanAani();
    }

    /*
     * LIIKKUVA NAPPULA ON YHTÄ PIENI KUIN PAIKALLAAN OLEVA. Siirron
     * paikka on TYYLISSÄ (hyppy kirjoittaa sen joka kehyksellä), ja
     * tyyli voittaa transform-määreen — fokusnäkymän käänteisskaalaus
     * on siksi kirjoitettava tähän samaan merkkijonoon eikä
     * paivitaFokusMerkkiMitatiin. Kerroin luetaan kerran, saattoajon
     * asettamasta lopullisesta mittakaavasta (ks. yllä).
     */
    const kerroin = this.fokusMerkkiKerroin(FOKUS_NAPPULA_PX, NAPPULAN_R);
    const koko = Math.abs(kerroin - 1) < 0.0005 ? '' : ` scale(${kerroin.toFixed(4)})`;
    let paikka = pixelOf(board, from);
    g.style.transform = `translate(${paikka.x}px, ${paikka.y}px)${koko}`;

    for (const [i, pos] of path.entries()) {
      const kohta = pixelOf(board, pos);
      const viimeinen = i === path.length - 1;
      // Määränpään äänimaisema lähtee nousemaan jo viimeisellä
      // askeleella, jotta ristihäivytys on käynnissä saapumishetkellä
      // eikä ala vasta kertojan kanssa yhtä aikaa (omistajan toive).
      if (viimeinen) {
        /*
         * Jalkamatkan ääni väistyy täsmälleen tässä: lippu alas ENNEN
         * ennakoiAmbienssia, jotta määränpään maisema saa nousta
         * ristihäivytyksellä matkaäänen päälle. Reitin varrelle
         * pysähtyvä matka (pos ei ole kaupunki) ei saa määränpäätä,
         * ja silloin lopetaJalkamatkanAani hoitaa vaihdon itse.
         */
        const kaupunkiin = pos.type === 'city';
        this.lopetaJalkamatkanAani({ vaihtui: kaupunkiin });
        this.ennakoiAmbienssi(pos);
      }
      if (this.reducedMotion) {
        g.style.transform = `translate(${kohta.x}px, ${kohta.y}px)${koko}`;
      } else {
        await this.hyppaaAskel(g, hahmo, varjo, paikka, kohta, stepMs, koko);
      }
      /*
       * NAKSAHDUS KUULUU LASKEUTUMISEEN, ei lähtöön: nappula kolahtaa
       * lautaan silloin kun se osuu siihen. Aiemmin liike oli tasainen
       * liuku eikä kosketushetkeä ollut, joten ääni soi askeleen
       * alussa.
       */
      sfx.play(viimeinen ? 'arrive' : 'step');
      paikka = kohta;
      /*
       * TAUKO VÄLIPISTEESSÄ (omistajan tilaus #100: *"kuin näkymätön
       * käsi siirtäisi pelinappulaa laudalla aavistuksen
       * hidastettuna"*). Tauko on nimenomaan hyppyjen VÄLISSÄ: viimeisen
       * laskeutumisen jälkeen odottaminen vain viivyttäisi saapumista.
       */
      if (!viimeinen && !this.reducedMotion) await this.wait(HYPYN_TAUKO_MS);
    }

    g.remove();
    this.movingPlayerId = null;
    this.revealShownFor = null;
    this.drawPawns();
    /*
     * NOPPA POIS UUDESSA KAUPUNGISSA (#98). Matka päättyi kaupunkiin
     * (myös lento on tällainen siirto, jossa askelia on yksi), joten
     * edellisen heiton noppa on tehnyt tehtävänsä.
     */
    if (path[path.length - 1]?.type === 'city') this.piilotaNoppa();
    // Saattozoomi auki: kamera palaa lähtökertoimeensa nappulan
    // kohdalle (ei odoteta — saapuminen saa jatkua sen päällä).
    if (saatto) await this.puraSaattavaKamera(path);
  }

  /** Nopanheitto: noppa lentää nappulan vierestä laudalle ja jää siihen. */
  /**
   * Ajaa isoja animaatioita: kartan päällä ei saa sinä aikana olla mitään
   * jatkuvaa. Yksikin sykkivä elementti suodatetun kartan päällä pakottaa
   * kartan piirtymään uudelleen joka kehyksellä (mitattu 15 fps vastaan
   * 60 fps), ja juuri isot animaatiot ovat ne, joissa se näkyy nykimisenä.
   *
   * Laskuri eikä lippu, koska animaatiot voivat mennä sisäkkäin: lento
   * kutsuu nappulan siirtoa omansa sisällä.
   */
  async isoAnimaatio(tehtava) {
    this.isojaAnimaatioita = (this.isojaAnimaatioita ?? 0) + 1;
    document.body.classList.add('animaatio-kaynnissa');
    try {
      return await tehtava();
    } finally {
      this.isojaAnimaatioita -= 1;
      if (this.isojaAnimaatioita <= 0) {
        this.isojaAnimaatioita = 0;
        document.body.classList.remove('animaatio-kaynnissa');
      }
    }
  }

  async animateDie(value) {
    if (!value) return;
    // Silmäluku kerrotaan vain laudalle jäävällä nopalla — ei tekstinä
    // kartan päällä (ks. renderActions).
    const player = this.game.player;
    this.dieJitter = { x: (Math.random() - 0.5) * 0.06, y: (Math.random() - 0.5) * 0.05 };
    /*
     * HEITTO AJETAAN SIIRTOKUOREN PIKSELEISSÄ (#98). Noppa asuu
     * kuoressa, joten sen oma koordinaatisto on kuoren — ei
     * karttaruudun. Ero on täsmälleen kartan nykyinen siirto, ja
     * yleiskuvassa se on nolla, joten vanha käytös säilyy sellaisenaan.
     * Lepopaikka on yhä ruudun mitoilla arvottu avomeren kolkka
     * (dieRestingSpot); vasta pysähdyttyään noppa lukitaan siihen
     * kohtaan KARTTAA, johon se jäi.
     */
    const from = this.kartta.paneKuoreen(this.kartta.mapToPane(pixelOf(this.game.board, player.pos)));
    const to = this.kartta.paneKuoreen(this.kartta.dieRestingSpot());
    this.dieThrown = true;
    this.kartta.merkitseNopanPaikka(to);

    /*
     * Noppa tuntuu kädessä kahdesti (iOS-kuori; selaimessa mykkä):
     * kevyt heiton lähtiessä ja keskitaso silloin kun noppa pysähtyy
     * laudalle. Kaksi tärähdystä riittää — jokainen pomppu tuntuisi
     * kohinalta, ja pomppuja on useita.
     */
    natiiviTarise('kevyt');
    await this.isoAnimaatio(() => this.boardDie.roll(value, from, to, {
      reduced: this.reducedMotion,
      onTick: () => sfx.play('dieTick'),
      onLand: () => sfx.play('dieLand'),
      onBounce: () => sfx.play('clack'),
      /*
       * Pysähtymisen tärähdys täsmälleen sillä hetkellä, kun noppa
       * kallahtaa silmäluvulleen. Aiemmin se odotti koko
       * animaatiolupauksen ratkeamista ja tuli lähes sekunnin
       * myöhässä (omistajan havainto 13.8.2026).
       */
      onSettle: () => natiiviTarise('keskitaso'),
    }));
    await this.wait(this.reducedMotion ? 0 : 260);
  }

  /**
   * Noppa pois kartalta pehmeästi häivyttäen (omistajan tilaus #98,
   * kohta 3: *"kun saavutaan uuteen kaupunkiin, noppa häviää
   * feidaten"*). Kutsutaan nappulan siirron päätteeksi, kun matka
   * pysähtyi kaupunkiin — myös lennosta, joka on siirto yhdellä
   * askeleella (animatePawnSisalla).
   *
   * Lippu nollataan ennen häivytystä, jotta kesken häipymisen tuleva
   * näkymän sovitus (fitViewBox → ankkuroiNoppa) ei enää siirrä
   * katoavaa noppaa.
   */
  piilotaNoppa() {
    if (!this.dieThrown) return;
    this.dieThrown = false;
    this.noppaKartalla = null;
    this.boardDie?.haivyta();
  }

  buildToast({ kind, text, sub, icon, token, city, linssi }) {
    const box = html('div', `event-toast ${kind === 'robber' ? 'bad' : kind}`);
    // Ikoni voi olla viivaikonin nimi tai suora merkki — kuplat piirretään
    // samalla kynällä kuin napit aina kun ikoni sarjasta löytyy.
    const kuva = viivaIkoni(icon);
    if (kuva) kuva.classList.add('toast-icon');
    if (token) {
      // Linssilöydön kupla näyttää varusteen oman kuvan (10.8.2026).
      const tiedot = linssi
        ? { kuva: `assets/varusteet/varuste-${linssi}.jpg`, name: text }
        : this.game.aarreTyyppi(token, city);
      box.appendChild(aarreIkoni(tiedot, token, kind === 'die' ? 30 : 34));
    }
    else box.appendChild(kuva ?? html('span', 'toast-icon', icon ?? '•'));
    const body = html('div');
    body.appendChild(html('span', 'toast-text', text));
    if (sub) body.appendChild(html('span', 'toast-sub', sub));
    box.appendChild(body);
    this.mapPane.appendChild(box);
    return box;
  }

  async removeToast(box) {
    box.classList.add('leaving');
    await this.wait(this.reducedMotion ? 0 : 300);
    box.remove();
  }

  /** Näyttää kertyneet tapahtumat yksi kerrallaan kartan päällä. */
  async playEvents() {
    // Aarre ja ryöstäjä nähdään jo paljastusanimaatiossa, joten niitä ei toisteta.
    const events = this.game.takeEvents().filter((e) => e.kind !== 'treasure' && e.kind !== 'robber');
    for (const event of events) {
      sfx.play(EVENT_SOUND[event.kind] ?? 'turn');
      const box = this.buildToast(event);
      await this.wait(this.reducedMotion ? 0 : TOAST_MS[event.kind] ?? TOAST_MS.default);
      await this.removeToast(box);
    }
    await this.naytaTietajaNousut();
  }

  /**
   * PÖLLÖ ONNITTELEE TIETÄJÄTASON NOUSUSTA (päätoimittajan päätös
   * 18.8.2026). Nousu ei anna mitään muuta kuin uuden nimikkeen, joten
   * ilmoitus on koko palkinto — ja se on pöllön ääni, ei kartan päälle
   * lentävä tapahtumakupla.
   *
   * VASTA TAPAHTUMAKUPLIEN JÄLKEEN. Sama pisteiden lisäys voi ylittää
   * linssikynnyksen ja tietäjätason yhtä aikaa (aarre 100 + ennätys 200
   * = 300 kerralla). Linssilöytö näkyy kartan päällä tapahtumakuplana
   * ja tason nousu pöllönapin vieressä puhekuplana; päällekkäin ne
   * peittäisivät toisensa, joten ne näytetään peräkkäin — ensin
   * tapahtumat, sitten pöllö.
   *
   * Useampi nousu kerralla näkyy myös peräkkäin: kupla vaihtuu, ja
   * viimeinen jää näkyviin kunnes pelaaja koskee karttaan.
   */
  async naytaTietajaNousut() {
    const nousut = this.game.takeTietajaNousut?.() ?? [];
    /*
     * ENNEN PÖLLÖN LÖYTYMISTÄ ONNITTELU JÄÄ JONOON (omistajan tilaus
     * 18.8.2026). Pöllöä ei ole pelissä ennen ensimmäistä laattaa,
     * eikä sen napin vieressä ole mihin kuplaa kiinnittää — ja tason
     * nousuja ehtii varmasti tulla: ensimmäinen kaupunki antaa 60 tp
     * (uusi lauta 50 + uusi kaupunki 10) eli jo tason 2 (40 tp).
     * Jono puretaan seuraavassa tapahtumaerässä löydön jälkeen.
     */
    /*
     * KUPLAN SISÄLTÖ: uuden tason avatar, sen kalevalainen värssy ja
     * onnittelulause (omistajan tilaus 18.8.2026). Kolme osaa samassa
     * kuplassa — kuva kertoo, kuka puhuu, värssy antaa hetkelle juhlan
     * ja lause sen, mistä on kyse.
     */
    const juhla = (taso) => ({
      teksti: taso.onnittelu,
      kuva: tietajaAvatar(taso),
      sakeet: varssynSakeet(taso.varssy),
    });
    if (this.game.polloLoydetty === false) {
      for (const taso of nousut) this.polloJono.push(juhla(taso));
      return;
    }
    // Odottaneet kuplat ensin, sitten tämän hetken nousut.
    const jono = this.polloJono;
    this.polloJono = [];
    for (const kupla of [...jono, ...nousut.map(juhla)]) {
      if (this.dead) return;
      this.naytaPolloKupla(kupla);
      await this.wait(this.reducedMotion ? 0 : TIETAJAKUPLA_MS);
    }
  }

  scheduleBot() {
    clearTimeout(this.botTimer);
    const { game } = this;
    if (this.busy || game.phase === 'over' || !game.player.isBot) return;
    const delay = game.phase === 'quiz' || game.phase === 'duel' ? BOT_QUIZ_DELAY : BOT_DELAY;
    this.botTimer = setTimeout(() => this.botStep(), delay);
  }

  botStep() {
    const { game } = this;
    if (this.busy || game.phase === 'over' || !game.player.isBot) return;

    if (game.phase === 'event') {
      this.run(() => game.closeEvent());
      return;
    }
    if (game.phase === 'duel') {
      if (game.duel.chosen !== null) this.run(() => game.closeDuel());
      else if (wantsDuelRelief(game)) this.run(() => game.actionDuelRelief());
      else answerDuelUi(this, chooseDuelAnswer(game));
      return;
    }

    if (game.phase === 'quiz') {
      if (game.quiz.chosen !== null) this.run(() => game.closeQuiz());
      else if (wantsHint(game)) this.run(() => game.actionHint());
      else if (wantsFiftyFifty(game)) this.run(() => game.actionFiftyFifty());
      else answerQuiz(this, chooseQuizAnswer(game));
      return;
    }

    if (game.phase === 'offer') {
      this.run(() => game.actionQuiz());
      return;
    }

    if (game.phase === 'move') {
      const key = chooseMove(game);
      if (key) this.doMove(key);
      else this.run(() => game.endTurn());
      return;
    }

    if (game.phase === 'roll') {
      this.doRoll();
      return;
    }

    const travel = chooseTravel(game);
    if (travel.type === 'fly') this.doFly(travel.destination);
    else this.run(() => game.actionTravel(travel.type));
  }
}
