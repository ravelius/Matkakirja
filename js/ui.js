// Käyttöliittymä: aarrekartan piirto, ohjauspaneeli, tietovisa ja bottien ohjaus.

import { pixelOf, pointAlong, posKey } from './rules.js';
import {
  chooseDuelAnswer,
  chooseMove,
  chooseQuizAnswer,
  chooseTravel,
  wantsDuelBypass,
  wantsDuelRelief,
  wantsFiftyFifty,
  wantsHint,
} from './ai.js';
import {
  DUEL_PRIZE, FLIGHT_PRICE,
  HINT_PRICE, MANNERLENTO_NAPPI, MANNER_NIMET, SEA_FARE,
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
  onVanhaKuva, pehmeaPolku, piirraLeipateksti, pisteMonikulmiossa, polunPituus,
  cachedImage, cachedSummary, fokusSumennusPaalla, fokusmoodiPaalla, kehittajaTilaPaalla,
  shortIntro, suojaa, tallennaLinssi, tallennettuLinssi, viivaIkoni,
} from './ui-apurit.js';
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
  haivytaJaSiivoa, haivytaLuenta, lueMerkinta,
  merkitsePuhuja, playDiaryVoice, playIntroVoice, stopDiaryVoice,
  stopIntroVoice, vapautaPuhuja,
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
  POLLO_AARRE, polloAnkkuri, polloOnnittelu, polloPaivitaNakyvyys, polloSulje, polloVihje,
  polloVihjePois,
} from './pollo.js';
import { ajastaEhdotusKupla, ehdotusOsio, proHakuRasti, proOsio } from './ehdotukset.js';
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
  fokusvirtaMatkakirja, fokusvirtaMerkintaLuettu,
  paivitaFokuskuvat, nollaaFokuskuvat,
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
  puheVoima, jaaAlku, kertojaTila, luentaVastaaTekstia,
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
import { TILANNE, TESTATTAVAA, TUOREET } from './tyohuone-tilanne.js';
// Kartan kehittäjävärit lukevat valmiusasteen samasta moduulista kuin
// Tilastot-taulu (drawBoard, valmiusLuokka) — yksi määritelmä, jottei
// kartta ja taulu voi kertoa eri tarinaa samasta kaupungista.
import { lehtiValmius } from './tyohuone-tilastot.js';
import { viitekuvaTila } from './viitekuva-herot.js';
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
  drawTokenIcon,
  drawWaves,
  tokenIconSvg,
  paperi,
  kasinPiirretty,
  rasteroiRuutu,
  RUUTU_TYHJA,
  avaaTaidelahde,
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
import { INTRO_SPACE, Kartta } from './kartta.js';
// Fokusmoodin maakohtainen topografiapohja (paketti 2).
import { paivitaFokuskartta, paivitaFokusNimet, nollaaFokuskartta } from './fokuskartta.js';

const DIE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
const BOT_DELAY = 650;
const BOT_QUIZ_DELAY = 1500; // botin kysymys jää hetkeksi näkyviin luettavaksi
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// Animaatioiden rytmi millisekunteina.

const STEP_MS = 190; // yksi askel kartalla
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
const LENNON_ENINTAAN_MS = 15000;
// Kuinka kauan valmis repliikki jää ruudulle ennen kuin lento päättyy.
const LENNON_LUKUAIKA_MS = 1600;
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
 * ALOITUSLENTO KARTALLA (omistaja 24.8.2026, Raamatun osio
 * "Fokusmoodi" / ALOITUSLENTO UUSIKSI). Luvut yhdessä paikassa, koska
 * ne on mitoitettu toisiaan vasten: kamera-ajo ensin, sitten lento.
 */
// Lähtökaupunki: matka alkaa aina Lontoosta (Raamattu, "Pelin kulku").
const ALOITUSLENNON_LAHTO = 'lontoo';
// Rajauksen marginaali: lähtömaan ja kohdemaan ympärille jää tämän
// verran merta ja naapureita, jotta molemmat maat erottuvat muodoiltaan
// eivätkä kosketa ruudun laitaa. Väljempi kuin kartan oletus (0,12),
// koska kuvassa on kaksi maata ja niiden välinen reitti.
const ALOITUSLENNON_MARGINAALI = 0.16;
// Kamera-ajon kesto rajaukseen. Pidempi kuin kartan oletusajo (2000 ms):
// tämä on pelin ensimmäinen liike, ja matka Lontoosta kohteeseen
// kannattaa ehtiä lukea kartalta ennen kuin kone lähtee.
const ALOITUSLENNON_AJO_MS = 2400;
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
const ALOITUSLENNON_VIIVA_PX = 2.2;
const ALOITUSLENNON_KONE_PX = 34;
// Koneen piirroksen oma leveys omissa yksiköissään (polku ulottuu
// x = -15…14, ks. aloituslentoSisalla): mitta, jota vasten
// ALOITUSLENNON_KONE_PX skaalataan.
const ALOITUSLENNON_KONE_MITTA = 29;

const AUTO_ROLL_MS = 320; // tauko ennen itsestään pyörähtävää noppaa
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
/*
 * TUOREET LEHDET KARTALLE (omistajan tilaus 23.8.2026): juuri
 * valmistuneet kaupungit erottuvat kirkkaammalla vihreällä muista
 * valmiista, jotta viime julkaisujen sato näkyy laudalta yhdellä
 * silmäyksellä. Lista on TUOREET.valmiit (js/tyohuone-tilanne.js,
 * jota vain Fable päivittää) — sama taulu, josta Tilastot-taulu
 * merkitsee tuoreet rivit. Aikaleimoja paketeissa ei ole, joten
 * tuoreutta ei voi päätellä datasta.
 */
const TUORE_VALMIS_IDT = new Set((TUOREET?.valmiit ?? []).map((k) => k.id));
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
const KIRJOITUSRYTMI = new Set(['intro', 'flight']);

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
const INTRO_FONT_MAX = 0.96;
const INTRO_FONT_MIN = 0.6;
// Omistajan päättämä avausteksti. ÄLÄ muokkaa ilman omistajan lupaa
// (docs/tyolista-opukselle.md, paketti 3). Lyhennetty omistajan
// pyynnöstä 4.8.2026; draamaviilaus omistajan hyväksynnällä
// 10.8.2026. Teksti ja luenta (intro-puhe.mp3) pidetään samana —
// muutos vain tools/generoi-avaus.mjs:n kautta.
const INTRO_TEXT = 'Vintiltä löytyi isoisän kulunut matkakirja — '
  + 'Maailman ympäri kahdeksassakymmenessä päivässä.\n\n'
  + 'Viimeinen sivu on revitty irti kesken lauseen. Mitä hän löysi? '
  + 'Ja kuka repii kirjasta juuri sen sivun?\n\n'
  + 'Valitse kohde kartalta.';
// Kirjan nimi kursivoidaan VAIN ruudulla (renderIntro) — luentaan
// kursiivi ei vaikuta. Nimen on esiinnyttävä INTRO_TEXTissä juuri
// tässä muodossa, jotta kursiivijako osuu.
const INTRO_KIRJAN_NIMI = 'Maailman ympäri kahdeksassakymmenessä päivässä';

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
    // Avausteksti kirjoittuu kahteen osaan, jotta viimeinen rivi
    // ("mistä aloitan?") voidaan lihavoida ilman että itse tekstiä
    // muutetaan (INTRO_TEXT on omistajan lukitsema).
    this.introRunko = document.getElementById('intro-runko');
    this.introLopetus = document.getElementById('intro-lopetus');

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

    this.factKuuntele = document.getElementById('fact-kuuntele');
    this.factKuuntele.addEventListener('click', () => {
      const audio = this.diaryVoice;
      if (audio) {
        if (audio.paused) {
          audio.jatkettu = true; // automaattinen pysäytys ei enää koske
          audio.play().catch(() => {});
        } else {
          audio.pause();
        }
        return;
      }
      // Ääni ehti sulkeutua (esim. korttien vaihto) — aloitetaan alusta.
      if (this.diaryFullUrl) {
        playDiaryVoice(this, this.diaryFullUrl);
        return;
      }
      /*
       * MERKINTÄ ILMAN GENEROITUA ÄÄNITETTÄ (v-lisäys 12.8.2026).
       *
       * Sama kaiutin, sama ele, eri lukija: kun puhe-*.mp3:ää ei ole
       * tehty, merkintä luetaan laitteen omalla äänellä (iOS-kuoren
       * luentasilta tai selaimen puhesyntetisaattori). Generoituihin
       * äänitteisiin tämä ei kajoa lainkaan — ne käsitellään yllä.
       */
      if (lukijaLukee(this.factKuuntele)) {
        pysaytaLukija();
        return;
      }
      /*
       * Lyhyen autoluennan jatko: autoluenta luki vain ensimmäisen
       * virkkeen ja pani loput talteen — nappi jatkaa siitä, ei
       * alusta. Seuraava painallus (jatko kulutettu) lukee taas koko
       * merkinnän.
       */
      const jatko = this.merkintaJatko;
      this.merkintaJatko = null;
      const teksti = jatko ?? kokoaLuettavaTeksti(this.factText);
      // Merkinnät omalla persoonalla ja omassa äänisäilössä (omistajan
      // ohje 14.8.2026): säilön voi tuhota erikseen, kun tekstit
      // kirjoitetaan uusiksi, ja äänen voi vaihtaa muista lukuäänistä
      // riippumatta.
      if (lueMerkinta(this, teksti)) return;
      lueAaneen(teksti, this.factKuuntele, { persoona: 'merkinnat', sailio: 'merkinnat' });
    });

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
      if (this.game.phase === 'duel') {
        sfx.play('coin');
        this.doAction(() => this.game.actionDuelBypass());
        return;
      }
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

    this.mapPane = this.svg.parentElement;
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

    // Zoomipainikkeet. Napautus ei saa vuotaa kartalle asti: mapPanen
    // oma kuuntelija kutistaisi päiväkirjan ja maailmankartalla
    // napautuszoomaus veisi näkymän muualle.
    this.zoomiKuuntelijat = [];
    for (const [id, suunta] of [['zoom-in', 1], ['zoom-out', -1]]) {
      const nappi = document.getElementById(id);
      if (!nappi) continue;
      const kasittele = (e) => {
        e.stopPropagation();
        this.kartta.zoomaaPainikkeella(suunta);
      };
      nappi.addEventListener('click', kasittele);
      this.zoomiKuuntelijat.push([nappi, kasittele]);
    }

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
     * FOKUSMOODI (omistajan linjaus 24.8.2026, Raamatun osio
     * "Fokusmoodi"). Luetaan kerran tässä kuten kehittäjätilakin;
     * kytkin päivittää kentät paivitaFokusmoodilla ilman sivulatausta.
     *
     * fokusSumennus on erillinen kehittäjäasetus eikä oma tilansa: se
     * vaikuttaa vain fokusmoodin ollessa päällä (ks. fokusSumuPaalla).
     */
    this.fokusmoodi = fokusmoodiPaalla();
    this.fokusSumennus = fokusSumennusPaalla();
    // Fokuskerroksen viimeksi piirretty maajoukko: sumuverho rakennetaan
    // uusiksi vain kun käytyjen maiden joukko oikeasti muuttuu.
    this.fokusAvain = null;
    this.autoRollTimer = null;
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
    this.boardDie = new BoardDie(this.mapPane);
    this.kartta.asennaPanorointi();
    this.kartta.fitViewBox();
    this.observer = new ResizeObserver(() => this.kartta.fitViewBox());
    this.observer.observe(this.svg.parentElement);
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
    });
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
    this.kehittajaTila = kehittajaTilaPaalla();
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
    this.aloituslentoKesken = false;
    // Radiotila piilottaa matkakirjan ja alanapit; ilman purkua ne
    // jäisivät piiloon uudessa pelissä.
    document.body.classList.remove('radio-tila');
    for (const kalvo of document.querySelectorAll('.flight-overlay')) kalvo.remove();
    this.suljeAloitusportti();
    clearTimeout(this.botTimer);
    clearTimeout(this.autoRollTimer);
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
    for (const [nappi, kasittele] of this.zoomiKuuntelijat ?? []) {
      nappi.removeEventListener('click', kasittele);
    }
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
    // Ensimmäinen piirto vasta seuraavalla kehyksellä: laudan
    // luontihetkellä viewBox on vielä oletusarvoinen eikä paneelin koko
    // ole tiedossa.
    requestAnimationFrame(() => this.taydennaTaide());
    this.vahdiTarkkuutta();
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
    const pane = this.svg?.parentElement;
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
    if (this.dead || !this.taide || !this.taideSkaala) return;
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
    const pane = this.svg?.parentElement;
    if (!pane) return null;
    const vb = this.svg.viewBox?.baseVal;
    const laatikko = this.svg.getBoundingClientRect();
    const paneeli = pane.getBoundingClientRect();
    if (!vb?.width || !laatikko.width) return null;
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
     * POIKKEUS: ALOITUSLENTO KARTALLA (body.kartalento). Siinä kalvoa ei
     * ole vaan lento piirtyy kartan päälle, ja kartta ON se, mitä
     * pelaaja katsoo: rasteroimatta jäänyt lauta näkyisi koko lennon
     * ajan venytettynä sumuna. Työtä tulee kuitenkin vain yksi erä,
     * koska näkymä ei enää muutu koneen lähdettyä liikkeelle — kamera-
     * ajo on silloin jo ohi (ks. aloituslentoSisalla).
     */
    if (document.body.classList.contains('flight-active')
      && !document.body.classList.contains('kartalento')) {
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
      const pane = this.svg.parentElement;
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
     * Fokusvirran kuvavinjetit ovat kiinteän KOKOISIA RUUDULLA, joten
     * niiden mittakaava on laskettava uudelleen aina kun zoomi muuttuu
     * — samasta syystä ja samasta kohdasta kuin lisänimien näkyvyys.
     */
    paivitaFokuskuvat(this);
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
     */
    const pohja = this.fokusPohjaBbox ?? null;
    for (const n of nimet) {
      const x = Number(n.dataset.x);
      const y = Number(n.dataset.y);
      const kuvanAlla = Boolean(pohja) && Number.isFinite(x) && Number.isFinite(y)
        && x >= pohja.x && x <= pohja.x + pohja.w
        && y >= pohja.y && y <= pohja.y + pohja.h;
      n.classList.toggle('maastonimi-kuvan-alla', kuvanAlla);
    }
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
    const paneY = (boardY) => ((boardY - vy) / vh) * paneH;
    // Kaista alkaa laudan alareunasta ja päättyy rajauslaatikon pohjaan.
    // Rajataan paneelin sisään, jottei teksti valu ulos matalalla ruudulla.
    const ylin = Math.max(0, paneY(box.y + box.h / (1 + INTRO_SPACE)));
    // Kaista jatkuu paneelin pohjaan asti: pergamentti ulottuu sinne, joten
    // kapealla ruudulla teksti saa käyttöönsä kaiken tyhjän tilan.
    const alin = paneH;
    this.introEl.style.top = `${Math.round(ylin)}px`;
    this.introEl.style.height = `${Math.max(0, Math.round(alin - ylin))}px`;
    this.fitIntro();
  }

  /**
   * Kutistaa avaustekstiä, jos se ei mahdu kaistaan. Matalalla ruudulla
   * kaista jää kapeaksi, eikä teksti saa valua laudan tai kartan reunan yli.
   */
  fitIntro() {
    const kaista = this.introEl.clientHeight;
    if (!kaista) return;
    let koko = INTRO_FONT_MAX;
    this.introText.style.fontSize = `${koko}rem`;
    // Askelia riittävästi koko haarukkaan; INTRO_FONT_MIN on lattia.
    for (let i = 0; i < 8 && this.introText.scrollHeight > kaista; i++) {
      koko = Math.max(INTRO_FONT_MIN, koko - 0.09);
      this.introText.style.fontSize = `${koko}rem`;
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
    const fokusMaare = (c) => {
      const iso = fokusMaat?.[c.id];
      return iso ? { 'data-fokus-maa': iso } : {};
    };
    /*
     * LEHTIVALMIUS VÄREINÄ — VAIN KEHITTÄJÄTILASSA (omistajan tilaus
     * 23.8.2026: kartan värit ovat nyt neliportainen valmiusasteikko).
     *
     * Tämä KORVAA aiemmat merkinnät: julistevihreän (21.8.), violetit
     * herokuvat (22.8.), keltaisen työn alla olevan ja oranssinruskean
     * tekstiremontin (20.8.). Ne kertoivat kukin yhdestä yksittäisestä
     * urakasta, ja päällekkäin ladottuina ne peittivät toisensa —
     * neljä väriä yhdellä asteikolla vastaa yhteen kysymykseen: missä
     * kunnossa tämän kaupungin lehti on?
     *
     *   kirkkaan vihreä  juuri valmistunut (TUOREET.valmiit)
     *   vihreä           valmis
     *   valkoinen        lähes valmis: lehti on, jokin osa puuttuu
     *   harmaa           ei lehteä lainkaan
     *
     * TUOREUS EI OHITA VALMIUTTA (omistajan havainto 23.8.2026:
     * "Täällä vielä vihreää vaikka herokuvat ei generoitu" — TUOREET-
     * lista väritti Kašgarin ja kumppanit vihreiksi ilman heroja).
     * Kirkkaan vihreän saa vain kaupunki, joka on oikeasti valmis;
     * muuten tuorekin kaupunki näkyy asteikon mukaan.
     *
     * Aste tulee js/tyohuone-tilastot.js:n lehtiValmius-funktiosta eli
     * samasta määritelmästä kuin Tilastot-taulun sarakkeet.
     *
     * NYT JOKAINEN PISTE SAA LUOKAN. Vanha sääntö "valmis on se, joka
     * ei saa luokkaa" säästi laudan oman pergamentinvaalean, mutta
     * asteikolla se olisi sokea kohta: pergamentti ei ole yksi neljästä
     * väristä vaan taustan väri, eikä katsoja tietäisi, onko piste
     * valmis vai jäikö se värjäämättä. Pelaajan laudalle ei lisätä
     * edelleenkään yhtään luokkaa, joten tavallinen näkymä on
     * tismalleen entisensä.
     */
    const valmiusLuokka = (c) => {
      if (!this.kehittajaTila) return '';
      const aste = lehtiValmius(c.id);
      if (aste === 'valmis') {
        return TUORE_VALMIS_IDT.has(c.id) ? ' city-tuore' : ' city-valmis';
      }
      return aste === 'lahes' ? ' city-lahes' : ' city-kesken';
    };

    /*
     * ORANSSI LAATTA = kaupungin herokuvat on generoitu kohteen omista
     * Commons-valokuvista viitteinä (omistajan tilaus 24.8.2026:
     * "muuta niiden kaupunkien laatan väri oranssiksi"). Ankkuroimaton
     * generointi tuotti Kašgariin väärän rakennuksen, joten ankkuroitu
     * ja ankkuroimaton erä ovat eri luotettavuustasoa — ja se ero
     * halutaan nähdä suoraan laudalta.
     *
     * ORANSSI KORVAA VALMIUSVÄRIN, EI TÄYDENNÄ SITÄ. Laatta on yksi
     * ellipsi ja sillä on yksi täyttöväri, joten kahta asteikkoa ei voi
     * näyttää samassa täytössä. Lehtivalmius jää silti luettavaksi:
     * valmiusluokka annetaan yhä ja sen ÄÄRIVIIVA jää voimaan, koska
     * oranssit säännöt asettavat vain fillin. Kaupunki, joka on sekä
     * valmis että ankkuroitu, on siis oranssi vihrein reunoin.
     *
     * Vain kehittäjätilassa — pelaajan lauta pysyy ennallaan.
     */
    const viiteLuokka = (c) => {
      if (!this.kehittajaTila) return '';
      const kansi = (KULTTUURI_KATEGORIAT[c.id] ?? [])
        .find((k) => k.id === 'kaupunki');
      const kaikki = (kansi?.avauskuvat ?? [])
        .filter((kuva) => kuva.ampari).length;
      const tila = viitekuvaTila(c.id, kaikki);
      if (!tila) return '';
      return tila.taysi ? ' city-viite-taysi' : ' city-viite-osa';
    };

    /** Laatan kehittäjäluokat: valmiusaste + mahdollinen viiteankkurointi. */
    const laatanLuokat = (c) => `${valmiusLuokka(c)}${viiteLuokka(c)}`;
    for (const c of board.cities) {
      const wobble = `rotate(${vary(`city:rot:${c.id}`, 12).toFixed(1)} ${c.x} ${c.y})`;
      const base = (c.start ? 20 : 11.6) * nodeScale;
      const rx = base + vary(`city:rx:${c.id}`, 0.7);
      const ry = base + vary(`city:ry:${c.id}`, 0.7);
      const fokus = fokusMaare(c);
      if (c.start) {
        el('ellipse', {
          cx: c.x, cy: c.y, rx, ry, transform: wobble, class: `city-start${laatanLuokat(c)}`,
          ...fokus,
        }, cities);
        el('ellipse', {
          cx: c.x, cy: c.y, rx: rx * 0.6, ry: ry * 0.6, transform: wobble, class: 'coast-soft',
          ...fokus,
        }, cities);
      } else {
        el('ellipse', {
          cx: c.x,
          cy: c.y,
          rx,
          ry,
          transform: wobble,
          'stroke-width': (2.2 + hash01(`city:sw:${c.id}`) * 0.7).toFixed(2),
          class: `city${laatanLuokat(c)}`,
          ...fokus,
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
          ...fokus,
        }, cities);
      }
      if (c.airport) {
        el('text', {
          x: c.x, y: c.y + 5, class: 'airport', 'text-anchor': 'middle', ...fokus,
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
        ...fokus,
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

    this.tokenLayer = el('g', { class: 'tokens' }, root);
    this.targetLayer = el('g', { class: 'targets' }, root);
    this.pawnLayer = el('g', { class: 'pawns' }, root);
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
    if (uusiMaa) this.animoiMaanAariviiva(polut, key);
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
   * Onko sumuverho päällä juuri nyt?
   *
   * KOLME EHTOA. Fokusmoodi päällä, kehittäjän sumennuskytkin päällä ja
   * peli oikeasti käynnissä. Kolmas on tärkein: aloitusruudulla
   * (phase 'pickstart') maailmaa vielä katsellaan kokonaisuutena eikä
   * yhtään kaupunkia ole valittu, joten verho peittäisi koko kartan
   * juuri silloin kun siitä pitää valita lähtöpaikka. Katselutila
   * (?lauta=) on samaa lajia: se on laudan esittelyä eikä matkaa.
   */
  fokusSumuPaalla() {
    return Boolean(this.fokusmoodi && this.fokusSumennus
      && !this.katselu && this.game.phase !== 'pickstart');
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
    const maat = this.fokusMaat();
    /*
     * KÄYMÄTTÖMÄN MAAN DATAKERROS POIS KOKONAAN (Raamatun linjaus: "ilman
     * dataa — ei reittejä, kaupunkeja, kohteita"). Piilotus tehdään
     * luokalla eikä hidden-määreellä, jotta sama sääntö kattaa yhdellä
     * rivillä CSS:ää kaikki kaupungin osat.
     *
     * KOHDERENKAAT (targetLayer) JÄÄVÄT NÄKYVIIN. Ne ovat pelin ainoa
     * kartalta tehtävä valinta: jos ne katoaisivat, fokusmoodissa ei
     * pääsisi ensimmäisestä maasta koskaan pois. Reittien ja renkaiden
     * piilotus kuuluu pakettiin 2 yhdessä Liiku-napin uuden
     * matkustusvalinnan kanssa.
     */
    const piilota = Boolean(this.fokusmoodi && maat && !this.katselu
      && this.game.phase !== 'pickstart');
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
   * Reitit hoituvat ilman koodia: ne ovat laudan bittikartassa ja
   * jäävät opaakin kuvan alle itsestään.
   */
  paivitaFokusPohja(bbox) {
    const ennen = this.fokusPohjaBbox ?? null;
    const uusi = bbox && bbox.w > 0 && bbox.h > 0 ? bbox : null;
    const sama = (!ennen && !uusi)
      || (ennen && uusi && ennen.x === uusi.x && ennen.y === uusi.y
        && ennen.w === uusi.w && ennen.h === uusi.h);
    if (sama) return;
    this.fokusPohjaBbox = uusi;
    document.body.classList.toggle('fokuspohja', Boolean(uusi));
    // Verho on rakennettava uusiksi: reikä tuli tai lähti.
    this.fokusAvain = null;
    this.paivitaFokusSumu(this.fokusMaat());
    this.himmennaMaastonimet();
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
    // Avain kertoo, onko mitään muuttunut: sama joukko samassa tilassa
    // piirretään uudestaan turhaan joka vuorolla.
    const avain = paalla
      ? `${[...maat].sort().join(',')}|${pohja ? `${pohja.x},${pohja.y},${pohja.w},${pohja.h}` : ''}`
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
    // Fokuspohjan lehti kokonaan verhon ulkopuolelle (musta = kirkas).
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
   * Fokusmoodin kytkin (js/main.js #fokus-btn ja #fokus-sumennus-btn).
   *
   * Sama kaava kuin paivitaKehittajaTilalla: asetus luetaan uudestaan
   * levyltä ja näkymä tahdistetaan heti. Sivulatausta ei tarvita —
   * fokuskerros elää valmiiksi piirretyn kartan päällä, eikä laudan
   * uudelleenpiirto ole tarpeen.
   */
  paivitaFokusmoodi() {
    this.fokusmoodi = fokusmoodiPaalla();
    this.fokusSumennus = fokusSumennusPaalla();
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

  /** Kartalla näkyvät vain käännetyt laatat omina kuvakkeinaan. */
  drawTokens() {
    const { game } = this;
    this.tokenLayer.textContent = '';
    for (const [cityId, type] of game.revealed) {
      const city = game.board.cityById.get(cityId);
      const g = el('g', {
        class: 'token-found',
        transform: `translate(${city.x + 22},${city.y + 18}) rotate(${vary(`token:${cityId}`, 8).toFixed(1)})`,
      }, this.tokenLayer);
      el('circle', {
        r: 16.4 + hash01(`token:r:${cityId}`) * 1.4,
        class: 'token-disc',
      }, g);
      /*
       * Käännetty laatta näyttää laudan tarinallisen aarrekuvan
       * pyöreänä (omistajan päätös 10.8.2026); piirrosikoni jää
       * varasoluksi laatoille ja laudoille ilman kuvaa. clip-path
       * rajaa kuvan laattakiekon sisään, slice täyttää ympyrän.
       */
      const kuva = game.aarreTyyppi(type, cityId)?.kuva;
      if (kuva && kuva.startsWith('assets/')) {
        const im = el('image', {
          x: -15, y: -15, width: 30, height: 30,
          'clip-path': 'circle(14.5px)',
          preserveAspectRatio: 'xMidYMid slice',
          class: 'token-aarrekuva',
        }, g);
        im.setAttribute('href', kuva);
      } else {
        const icon = drawTokenIcon(g, type);
        icon.setAttribute('transform', 'scale(0.88)');
      }
    }
  }

  drawTargets() {
    const { game } = this;
    this.targetLayer.textContent = '';

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

    // Lähtöpisteen valinta: kaikki kaupungit ovat napautettavia.
    if (game.phase === 'pickstart') {
      // Puhelimella ensimmäinen napautus zoomaa kartan lähemmäs sen
      // sijaan että valitsisi kaupungin — kaukaa katsottuna kaupungit
      // ovat liian pieniä osuttaviksi (omistajan havainto). Zoomauksen
      // hoitaa paneelin oma kuuntelija (asennaPanorointi), joten tässä
      // riittää olla valitsematta kaupunkia.
      const zoomaa = this.kartta.zoomTarpeen() && !this.aloitusZoom;
      for (const c of game.board.cities) {
        for (const x of this.kiertoKohdat(c.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          el('circle', { cx: x, cy: c.y, r: 34, class: 'target-hit' }, g);
          el('circle', {
            cx: x,
            cy: c.y,
            r: c.start ? 27 : 22,
            class: 'target-ring pick',
          }, g);
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
        for (const x of this.kiertoKohdat(city.x)) {
          const g = el('g', { class: 'target' }, this.targetLayer);
          el('circle', { cx: x, cy: city.y, r: 34, class: 'target-hit' }, g);
          el('circle', { cx: x, cy: city.y, r: 25, class: 'target-ring lento' }, g);
          const merkki = el('text', {
            x, y: city.y - 33, class: 'lento-kohde-merkki', 'text-anchor': 'middle',
          }, g);
          merkki.textContent = '✈';
          g.addEventListener('click', () => this.doFly(dest));
        }
      }
      return;
    }

    if (game.phase !== 'move' || game.player.isBot) return;
    for (const opt of game.moveOptions()) {
      const { x, y } = pixelOf(game.board, opt.pos);
      for (const kx of this.kiertoKohdat(x)) {
        const g = el('g', { class: 'target' }, this.targetLayer);
        el('circle', { cx: kx, cy: y, r: 30, class: 'target-hit' }, g);
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
        g.addEventListener('click', () => this.doMove(opt.key));
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

  /** Pelinappula: varjo, vaalea kehys, pelaajan väri ja kiilto. */
  pawnShape(parent, player, active) {
    const g = el('g', { class: 'pawn' }, parent);
    el('ellipse', { cx: 2, cy: 9, rx: 11, ry: 4, class: 'pawn-shadow' }, g);
    if (active) {
      el('circle', { r: 15, class: 'pawn-pulse', stroke: player.color }, g);
      el('circle', { r: 17, class: 'pawn-active-ring' }, g);
    }
    el('circle', { r: 13, class: 'pawn-ring' }, g);
    el('circle', { r: 9.5, fill: player.color, class: 'pawn-dot' }, g);
    el('path', { d: 'M-5,-3 a6,6 0 0 1 8,-3', class: 'pawn-gloss', fill: 'none',
      stroke: 'rgba(255,255,255,0.6)', 'stroke-width': 2.2, 'stroke-linecap': 'round' }, g);
    if (player.stars > 0) {
      el('text', { x: 0, y: -18, class: 'pawn-star', 'text-anchor': 'middle' }, g).textContent = '◈';
    }
    return g;
  }

  drawPawns() {
    const { game } = this;
    this.pawnLayer.textContent = '';
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
      });
    }
  }

  // --- paneeli ------------------------------------------------------------

  renderTurnPill() {
    const { game } = this;
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
      // Kun matkustustapa valittiin automaattisesti, ei ole valittavaa eikä
      // mihin palata: noppa pyörähtää itsestään.
      if (game.autoTravel) {
        this.autoRoll();
        return;
      }
      /*
       * Nopanheitto ja matkustustavan vaihto ovat monitoiminapin
       * liu'ussa kuten muutkin matkustustoiminnot (omistajan linjaus
       * 12.8.2026): alanappirivi on aina täsmälleen kolme paikkaa.
       */
      const rollBtn = this.iconButton('noppa', 'Heitä noppa', 'primary');
      rollBtn.addEventListener('click', () => this.doRoll());

      const backBtn = this.iconButton('nuoli', 'Vaihda matkustustapa');
      backBtn.addEventListener('click', () => this.doAction(() => game.actionCancelTravel()));

      this.piirraToimintorivi([rollBtn, backBtn], this.tutkiNappi());
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
    const stayBtn = this.iconButton('suurennuslasi', 'Tutki',
      game.travelModes().includes('stay') ? 'primary' : '');
    // Uudessa kaupungissa nappi sykkii, kunnes sitä on painettu kerran.
    if (this.lehtitila.tutkiSyke && this.lehtitila.tutkiSyke === this.kaupunkiAvain(city)) {
      stayBtn.classList.add('tutki-syke');
    }
    stayBtn.addEventListener('click', () => {
      sfx.play('paper');
      this.lehtitila.tutkiSyke = null;
      stayBtn.classList.remove('tutki-syke');
      // Tutki avaa ensin saapumiskortin (esittely, kuva ja Lue lisää) —
      // peliin siirrytään vasta kortin omasta Tutki paikka -napista.
      this.openArrival(city);
    });
    return stayBtn;
  }

  /**
   * ALANAPPIRIVI: KAKSI PAIKKAA (omistajan linjaus 24.8.2026).
   *
   *   vasen   Liiku  — monitoiminappi, avaa matkustusnapit
   *   oikea   Tutki  — suurennuslasi, ennallaan
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
     * "LIIKU" EIKÄ "MATKUSTUSTAVAT" (omistajan linjaus 24.8.2026).
     * Kompassikuvake säilyy, mutta nimi kertoo teon eikä valikon
     * sisältöä — kahden napin rivi on "Liiku · Tutki". iconButton
     * asettaa saman tekstin näkyväksi nimeksi, titleksi ja
     * aria-labeliksi, joten ruudunlukija ja hiiren kärki saavat sen
     * yhtä aikaa. Matkustustapojen valinta on liu'un omien nappien
     * aria-label-teksteissä (jalan, laiva, lento).
     */
    const monitoimi = this.iconButton('kompassi', 'Liiku');
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
    perus.appendChild(monitoimi);

    /*
     * PÖLLÖLLÄ EI OLE ENÄÄ PAIKKAA RIVISSÄ (omistajan linjaus
     * 24.8.2026): nappi kelluu sivuelementtinä kaikissa tiloissa, myös
     * pelinäkymässä ja myös fokusmoodin ollessa kytkettynä pois.
     * Ankkurointi ilmoitetaan silti joka piirrolla (polloAnkkuri
     * alempana) — js/pollo.js ohittaa sen lipullaan ja kiinnittää napin
     * bodyyn, joten rivipaikan palauttaminen ei vaadi muutosta tänne.
     */
    perus.appendChild(tutkiNappi ?? html('div', 'rivi-tyhja'));
    rivi.appendChild(perus);

    const liuku = html('div', 'toimintorivi-liuku');
    liuku.setAttribute('role', 'group');
    liuku.setAttribute('aria-label', 'Matkustustavat');
    for (const nappi of matkanapit) liuku.appendChild(nappi);
    // Mikä tahansa liu'un nappi vie toimintoon, jonka jälkeen rivi
    // piirretään uudestaan — liuku ei saa jäädä auki sen alle.
    liuku.addEventListener('click', () => { this.liukuAuki = false; });
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
    this.paivitaLiuku();
  }

  suljeLiuku() {
    if (!this.liukuAuki) return;
    this.liukuAuki = false;
    this.paivitaLiuku();
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
      // Lukuääni väistyy, kun matka alkaa.
      stopIntroVoice(this);
      this.introEl.classList.add('intro-fade');
      // Repliikki ennen siirtoa, jotta rng-kutsut osuvat samaan kohtaan.
      const line = game.firstFlightLine(city.id);
      /*
       * Kumpi avauslento (Raamattu, ALOITUSLENTO UUSIKSI): fokusmoodissa
       * kone lentää kartalla, muuten vanha kalvo. Ratkaisu tehdään ENNEN
       * siirtoa, koska lippu aloituslentoKesken on nostettava ennen
       * ensimmäistä piirtoa: se pidättelee kamera-ajoja ja annostelu-
       * virtaa, joita render muuten käynnistäisi kesken lennon.
       */
      const kartalento = this.aloituslentoKartalla();
      // Lippu ennen siirtoa, jotta saapumismerkintä ei ala lennon alla —
      // se odottaa Astu ulos -nappia. Lennot poistavat lipun perillä.
      if (!this.reducedMotion) document.body.classList.add('flight-active');
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
      const lensi = kartalento && await this.aloituslento(city.id, line);
      if (!lensi) {
        this.aloituslentoKesken = false;
        await this.animateFlight(
          'Lontoo', city.name, line,
          { dx: city.x - lontoo.x, dy: city.y - lontoo.y },
        );
      }
      clearTimeout(this.lentoPuheAjastin);
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
   * Heittää nopan ilman painallusta. Sallittu vain kun matkustustapa
   * valikoitui itsestään — muuten pelaaja saa aina painaa itse.
   */
  autoRoll() {
    if (this.busy || this.autoRollTimer) return;
    this.autoRollTimer = setTimeout(() => {
      this.autoRollTimer = null;
      const { game } = this;
      if (game.phase === 'roll' && game.autoTravel && !game.player.isBot) this.doRoll();
    }, AUTO_ROLL_MS);
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
    const nimi = onAanite ? 'Jatka merkinnän kuuntelua' : 'Kuuntele merkintä';
    nappi.dataset.lukijaNimi = nimi;
    if (lukijaLukee(nappi)) return;
    nappi.title = nimi;
    nappi.setAttribute('aria-label', nimi);
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
      this.factPlace.textContent = '';
      this.factText.textContent = '';
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      stopDiaryVoice(this);
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
     * LUENTA PYSYY VAITI. Fokusvirran teksteille ei ole äänitteitä
     * eikä niiden luentoja ole vielä tehty (omistaja: *"luennat
     * tehdään myöhemmin erikseen"*), joten vanhaa saapumisluentaa ei
     * käynnistetä eikä kuuntelunappia näytetä.
     *
     * Laatan käännyttyä fokusvirtaMatkakirja palauttaa nullin ja
     * kortti jatkaa tavallista elämäänsä — kuten v1093:ssa.
     */
    if (game.player.pos.type === 'city') {
      const virtaKaupunki = game.board.cityById.get(game.player.pos.city);
      const merkinta = virtaKaupunki ? fokusvirtaMatkakirja(this, virtaKaupunki) : null;
      if (merkinta) {
        this.factCard.hidden = false;
        if (this.factKey === merkinta.avain) return;
        this.uusiFactKey(merkinta.avain);
        this.factVoiceEl.textContent = 'Matkapäiväkirjasta';
        this.factPlace.textContent = merkinta.paikkarivi;
        this.factImageTitle = null;
        this.factImage.hidden = true;
        this.factKuuntele.hidden = true;
        stopDiaryVoice(this);
        // Vanha valokuva kortin kylkeen suoraan virran datasta: kuvaa
        // ei ole kaupunkien kuvastossa (VALOKUVAT), se on virran oma.
        this.naytaFactValokuva(virtaKaupunki.id, virtaKaupunki.name, merkinta.kuva);
        this.typeText(this.factText, merkinta.teksti, 'fact', () => {
          fokusvirtaMerkintaLuettu(this, virtaKaupunki);
        });
        return;
      }
      if (virtaKaupunki && fokusvirtaLukitseeLehden(this, virtaKaupunki)) {
        this.factCard.hidden = true;
        this.uusiFactKey(null);
        this.factVoiceEl.textContent = '';
        this.factPlace.textContent = '';
        this.factText.textContent = '';
        this.factImage.hidden = true;
        this.factKuuntele.hidden = true;
        this.naytaFactValokuva(null);
        stopDiaryVoice(this);
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
      this.factPlace.textContent = `Päivä ${aikataulu.day}`;
      this.factImage.hidden = true;
      this.factKuuntele.hidden = true;
      this.naytaFactValokuva(null);
      stopDiaryVoice(this);
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
        this.factPlace.textContent = kaupunki.name;
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
          if (this.luettuSaapuminen !== luentaAvain) {
            this.luettuSaapuminen = luentaAvain;
            stopDiaryVoice(this);
            // Kertojan tila (yläpalkin valikko): pitkä lukee koko
            // merkinnän, lyhyt vain ensimmäisen lauseen — kaiutinnappi
            // jatkaa loput. Ei kertojaa → ei autoluentaa.
            const tila = kertojaTila();
            if (tila === 'lyhyt') {
              this.merkintaJatko = jatkoTeksti || null;
              lueMerkinta(this, eka, { viive: 1000 });
            } else if (tila === 'pitka') {
              lueMerkinta(this, [uusi.kuvaus, uusi.nosto].filter(Boolean).join(' '), { viive: 1000 });
            }
          } else {
            // Sama merkintä uudelleen ruudulle (vihje, aikataulu) —
            // mahdollinen vanha äänite kiinni, luentaa ei aloiteta.
            stopDiaryVoice(this);
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
        if (saapumisLauta && this.luettuSaapuminen !== luentaAvain) {
          this.luettuSaapuminen = luentaAvain;
          // Kertojan tila (yläpalkin valikko): pitkä lukee koko merkinnän,
          // lyhyt vain ensimmäisen lauseen (omistajan tarkennus — luenta
          // pysähtyy ensimmäisen virkkeen jälkeiseen hengähdykseen), ei
          // kertojaa jättää luennan aloittamatta — kaiutinnappi yliajaa
          // sen hetkellisesti.
          const tila = kertojaTila();
          if (tila === 'ei') {
            stopDiaryVoice(this);
          } else if (tila === 'lyhyt') {
            playDiaryVoice(this, this.diaryFullUrl, {
              ekaLauseeseen: true,
              osuus: eka.length / (uusi.kuvaus.length + 1 + (uusi.nosto?.length ?? 0)),
              viive: 1000,
            });
          } else {
            playDiaryVoice(this, this.diaryFullUrl, { viive: 1000 });
          }
        } else {
          stopDiaryVoice(this);
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
        this.factPlace.textContent = kaupunki.name;
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
          if (this.luettuSaapuminen !== luentaAvain && kertojaTila() !== 'ei') {
            this.luettuSaapuminen = luentaAvain;
            stopDiaryVoice(this);
            this.merkintaJatko = loput || null;
            lueMerkinta(this, eka, { viive: 1000 });
          } else {
            stopDiaryVoice(this);
          }
          return;
        }
        const havaintoLauta = luentaLauta(HAVAINTOLUENNAT, saapuminen.packId, saapuminen.cityId);
        this.diaryFullUrl = havaintoLauta
          ? `assets/audio/puhe-${havaintoLauta}-havainto-${saapuminen.cityId}.mp3`
          : null;
        this.naytaMerkinnanKaiutin(Boolean(havaintoLauta));
        if (havaintoLauta && this.luettuSaapuminen !== luentaAvain && kertojaTila() !== 'ei') {
          this.luettuSaapuminen = luentaAvain;
          playDiaryVoice(this, this.diaryFullUrl, {
            ekaLauseeseen: true,
            // Ensimmäisen virkkeen osuus tekstistä ohjaa tauon valintaa.
            osuus: teksti.length ? eka.length / teksti.length : null,
            viive: 1000,
          });
        } else {
          stopDiaryVoice(this);
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

    // Otsikko kertoo kumpi ääni puhuu, alarivi paikan.
    const onRoute = player.pos.type === 'edge';
    this.factVoiceEl.textContent = voiceTitle(factVoice(fact));
    this.factPlace.textContent = onRoute ? `Matkalla — ${city.name}` : city.name;
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
    if (document.body.classList.contains('flight-active')) {
      playPlaceAmbience('lentomatka', 'lentokone', this.game.pack?.id);
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
    // Avauskuvakaupungissa iso paikka on panoraamakaruselli (900,
    // sama leveys kuin nahtavyydenKarusellissa) ja pikkurivillä ovat
    // kansikuvien kaksi ensimmäistä; muuten entinen taitto.
    for (const teos of avauskuvat) {
      if (teos.tiedosto) kuvat.push(valokuvaUrl(teos.tiedosto, 900));
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
  piirraKulttuuriNostot(lista, nostot) {
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
    const osoitteet = nosto.ampari
      ? [julisteUrl(nosto.ampari)]
      : [...new Set([
        valokuvaUrl(nosto.tiedosto, leveys), valokuvaVara(nosto.tiedosto, leveys),
      ])].filter(Boolean);
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
  naytaJuliste(cityId) {
    const juliste = kaupunginJuliste(cityId);
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
   * Avausteksti kirjoittuu kartan alapuoliseen tyhjään pergamenttiin.
   * Teksti on omistajan lukkoon lyömä eikä sitä muokata täällä; se naksuu
   * esiin kirjoituskoneen tapaan ja väistyy heti kun kohde on valittu.
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
    if (!nakyy) {
      this.introShown = false;
      this.introRunko.textContent = '';
      this.introLopetus.textContent = '';
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
    playIntroVoice(this);
    // Avausteksti kirjoittuu selvästi hitaammin kuin muut: se on matkan
    // ensimmäinen hetki eikä pelitilanteen ilmoitus. Viimeinen rivi
    // kirjoittuu omaan lihavoituun elementtiinsä, jotta kysymys erottuu
    // (omistajan toive) — itse tekstiä ei muuteta.
    const raja = INTRO_TEXT.lastIndexOf('\n\n');
    const runko = raja < 0 ? INTRO_TEXT : INTRO_TEXT.slice(0, raja);
    const lopetus = raja < 0 ? '' : INTRO_TEXT.slice(raja);
    // Lopetus varaa tilansa jo ennen kirjoitusta samalla näkymättömällä
    // varjotekstillä kuin typeText. Ilman sitä fitIntro mittaisi tekstin
    // ilman viimeistä riviä, ja lihavoitu "mistä aloitan?" jäisi ruudun
    // alapuolelle (omistajan havainto).
    this.introLopetus.textContent = '';
    if (lopetus) {
      const varaus = html('span', 'pending');
      varaus.textContent = lopetus;
      this.introLopetus.appendChild(varaus);
    }
    /*
     * Kirjan nimi kursiiviin (omistajan toive 10.8.2026, vain ruudulla):
     * runko jaetaan paloihin nimen kohdalta ja palat kirjoitetaan
     * peräkkäin omiin elementteihinsä (span / i). Jokainen pala varaa
     * tilansa pending-varjolla heti, jotta fitIntro mittaa koko
     * tekstin ennen kirjoituksen alkua — sama syy kuin lopetuksella.
     */
    this.introRunko.textContent = '';
    const kohta = runko.indexOf(INTRO_KIRJAN_NIMI);
    const palat = (kohta < 0
      ? [{ teksti: runko, kursiivi: false }]
      : [
        { teksti: runko.slice(0, kohta), kursiivi: false },
        { teksti: INTRO_KIRJAN_NIMI, kursiivi: true },
        { teksti: runko.slice(kohta + INTRO_KIRJAN_NIMI.length), kursiivi: false },
      ]).filter((pala) => pala.teksti);
    const palaElementit = palat.map((pala) => {
      const elementti = html(pala.kursiivi ? 'i' : 'span', 'intro-pala');
      const varaus = html('span', 'pending');
      varaus.textContent = pala.teksti;
      elementti.appendChild(varaus);
      this.introRunko.appendChild(elementti);
      return elementti;
    });
    const kirjoitaPala = (i) => {
      if (i >= palat.length) {
        if (lopetus) this.typeText(this.introLopetus, lopetus, 'intro-loppu', null, INTRO_TYPE_MS);
        return;
      }
      this.typeText(palaElementit[i], palat[i].teksti, 'intro', () => kirjoitaPala(i + 1), INTRO_TYPE_MS);
    };
    kirjoitaPala(0);
    // Koko teksti on jo paikallaan, joten koon voi sovittaa heti — sen
    // jälkeen mikään ei enää liiku kirjoituksen aikana.
    this.fitIntro();
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
      // Lauta siirtyy keskeltä ylös tekstin tieltä heti portin auettua.
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

    valiotsikko('Kunnioitus');
    kappale('Jokainen maa kuvataan asukkaidensa silmin — ei stereotypioita, '
      + 'ei pilkkaa eikä säälittelyä, ei pelkkiä turistikliseitä. '
      + 'Vaikeita aiheita ei kaunistella eikä kauhistella.');

    valiotsikko('Avointa ja ilmaista');
    kappale('Peli on ilmainen harrastusprojekti, ja sen lähdekoodi on '
      + 'kaikkien luettavissa. Kuvat, äänet ja tiedot tulevat avoimista '
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

    const oikeudet = html('p', 'periaate-oikeudet', '© Sami Reivinen');
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
   * Matkasaalis passissa: tähti, hevosenkengät ja jalokivet. Nämä näkyivät
   * ennen erillisessä pelaajapaneelissa, joka vei tilaa kartalta.
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
    if (p.horseshoes) rivi(tokenIconSvg('horseshoe', 44), `Hevosenkenkiä ${p.horseshoes}`);

    /*
     * Jalokivet tyypeittäin JA mantereittain: maailmankartalla sama
     * laji on eri mantereilla eri aarre (findManner kulkee finds-
     * listan rinnalla; vanhan tallennuksen löydöillä manner on null
     * ja laudan oma tyyppi kelpaa).
     */
    const counts = new Map();
    p.finds.forEach((type, i) => {
      if ((game.tokenTypes[type]?.value ?? 0) <= 0) return;
      const manner = p.findManner?.[i] ?? null;
      const avain = `${type}:${manner ?? ''}`;
      const rivit = counts.get(avain) ?? { type, manner, n: 0 };
      rivit.n++;
      counts.set(avain, rivit);
    });
    for (const { type, manner, n } of counts.values()) {
      const token = game.aarreMantereella(type, manner);
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
    this.typeText(document.getElementById('winner-text'), w.stars > 0
      ? this.game.pack.texts.winnerStar(w.name, w.money)
      : `${w.name} ehti hevosenkengän kanssa kotiin ennen unohdetun aarteen löytäjää.`, 'winner');
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
   * @param {string|null} kuva kuvan polku (assets/…) tai null
   * @param {string} alt kuvan tekstivastine
   * @returns {{overlay: HTMLElement, scene: HTMLElement, caption: HTMLElement,
   *   kuvaEl: HTMLImageElement|null, ruksi: HTMLElement}}
   */
  rakennaPaljastus(kuva, alt) {
    const overlay = html('div', 'reveal-overlay');
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
      scene.appendChild(kuvaEl);
    }
    const caption = html('div', 'reveal-caption');
    scene.appendChild(caption);
    overlay.appendChild(scene);
    /*
     * Ruksi kortin kulmaan ja kortti esillä koko luennan ajan
     * (omistajan palaute 10.8.2026: "aarre häviää näkyvistä ennen
     * kuin lukija ehtii lukea repliikkinsä loppuun"). Koko kortti
     * sulkeutuu napautuksesta muutenkin — ruksi on sen näkyvä kahva.
     */
    const ruksi = html('button', 'reveal-sulje', '×');
    ruksi.type = 'button';
    ruksi.setAttribute('aria-label', 'Sulje paljastus');
    overlay.appendChild(ruksi);
    return { overlay, scene, caption, kuvaEl, ruksi };
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
     * tärähdys, ja siksi se on varattu löydölle: tyhjä kotelo, rosvo,
     * hevosenkenkä ja taikalasi eivät saa sitä, tai ele kuluisi loppuun.
     */
    if (AARRELAATAT.has(type)) natiiviTarise('juhla');
    /*
     * Varustekuva (omistajan tilaus 10.8.2026: "tee varusteet kuviksi
     * samoin kuin aarteet"): löytynyt linssi nousee mustasta omalla
     * toimintakuvallaan kuten aarteet. Tunnus on jo tapahtumajonossa
     * (revealToken kirjoitti sen); tyhjä kotelo jää kuvattomaksi,
     * koska sillä ei ole varustetta näytettävänä.
     */
    const linssiTunnus = type === 'linssi'
      ? (this.game.events?.find((e) => e.linssi)?.linssi ?? null) : null;
    const kuva = linssiTunnus
      ? `assets/varusteet/varuste-${linssiTunnus}.jpg` : (token.kuva ?? null);
    const { overlay, caption, kuvaEl } = this.rakennaPaljastus(kuva, token.name);

    // Nuoren herran huudahdus ensin — se kuuluu juuri siihen hetkeen,
    // kun aarre tulee näkyviin; cliffhanger-teksti vasta sen jälkeen.
    const huudahdus = arvoHuudahdus(type, token);
    if (huudahdus) caption.appendChild(html('span', 'reveal-huudahdus', huudahdus.teksti));
    caption.appendChild(html('strong', '', token.name));
    caption.appendChild(html('span', '', REVEAL_SUB[type] ?? `+${token.value} puntaa`));
    /*
     * Tarinakaaren aarreteksti paljastuksen alle: kätkön löytyessä
     * kaaren henkilö sulkee kohtaamisen ja jättää auki jäävän vihjeen
     * (omistajan tilaus 9.8.2026 — korvasi isoisän aarresitaatin).
     * Ei tyhjälle laatalle — pettymyksellä on oma selitteensä. Teksti
     * on kerrontaa eikä sitaatti, joten lainausmerkkejä tai nimiötä
     * ei lisätä päälle.
     */
    const kaari = (type !== 'empty' && KAARI_LAUDAT.has(this.game.pack.id))
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
    /*
     * Taikalasin kohdalla "Taikalasi" ei kerro vielä mitään: pelaajan
     * pitää nähdä KUMPI lasi löytyi ja mitä sillä näkee. Nimi ja kuvaus
     * asuvat linssimoduulissa (suunnitelman luku 3), joten ne haetaan
     * dynaamisella tuonnilla — eikä kortin nousu jää sitä odottamaan,
     * vaan teksti täydentyy paikalleen kun se saapuu.
     */
    if (type === 'linssi') void this.taydennaLinssiPaljastus(caption);

    // Dialogi on top layerissa, joten paljastus lisätään sen sisään.
    this.quizDialog.appendChild(overlay);

    // Näyttöaika kasvaa selitteen mukana: "+300 puntaa" saa vilahtaa,
    // mutta pitkä selite (esim. tyhjän laatan "merkintä oli vanhentunut")
    // pitää ehtiä lukea. Napautus tai ruksi ohittaa odotuksen.
    const seliteMs = ((REVEAL_SUB[type] ?? '').length + (kaari?.aarre?.length ?? 0)) * 45;
    // Kortti odottaa vähimmäislukuajan; ruksi tai napautus sulkee heti.
    const napautus = new Promise((resolve) => {
      overlay.addEventListener('pointerdown', resolve, { once: true });
    });
    const odota = (min) => Promise.race([this.wait(min), napautus]);

    if (this.reducedMotion) {
      kuvaEl?.classList.add('shown');
      caption.classList.add('shown');
      sfx.play(treasureSound(type));
      if (hihkaisu) this.soitaHihkaisu(hihkaisu);
      await odota(900 + seliteMs);
    } else {
      // Kuva nousee mustasta: hidas häivytys ja kasvu, ei kääntöä.
      await this.wait(420);
      kuvaEl?.classList.add('shown');
      sfx.play(treasureSound(type));
      if (hihkaisu) this.soitaHihkaisu(hihkaisu);
      await this.wait(760);
      caption.classList.add('shown');
      await odota(1250 + seliteMs);
      overlay.classList.add('leaving');
      await this.wait(300);
    }
    overlay.remove();
    // Löytö päätyy matkalaukkuun: yläreunan Laukku-nappi heilahtaa
    // eloisasti merkiksi (omistajan toive). Tyhjä laatta ei tuo mitään.
    if (type !== 'empty') this.elavoitaLaukku();
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
    const { overlay, caption, kuvaEl } = this.rakennaPaljastus(
      POLLO_AARRE.kuva, POLLO_AARRE.nimi,
    );
    caption.appendChild(html('span', 'reveal-huudahdus', POLLO_AARRE.huudahdus));
    caption.appendChild(html('strong', '', POLLO_AARRE.nimi));
    caption.appendChild(html('span', '', POLLO_AARRE.selite));
    caption.appendChild(html('p', 'reveal-isoisa', POLLO_AARRE.esittely));
    this.quizDialog.appendChild(overlay);

    /*
     * KERTOJA EI LUE ESITTELYÄ (omistajan tilaus 18.8.2026: kertojan
     * ääni pois kaikista aarteen tapaamisista) — kortti odottaa vain
     * lukuajan verran, ja napautus tai ruksi ohittaa odotuksen.
     */
    const napautus = new Promise((resolve) => {
      overlay.addEventListener('pointerdown', resolve, { once: true });
    });
    const odota = (min) => Promise.race([this.wait(min), napautus]);
    const seliteMs = (POLLO_AARRE.selite.length + POLLO_AARRE.esittely.length) * 45;

    if (this.reducedMotion) {
      kuvaEl?.classList.add('shown');
      caption.classList.add('shown');
      sfx.play(treasureSound('star'));
      await odota(900 + seliteMs);
    } else {
      await this.wait(420);
      kuvaEl?.classList.add('shown');
      sfx.play(treasureSound('star'));
      await this.wait(760);
      caption.classList.add('shown');
      await odota(1250 + seliteMs);
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
   * Paljastusruudun teksti taikalasille: linssin oma nimi ja se yksi
   * rivi, joka kertoo miksi lasi on hieno.
   *
   * Tunnus luetaan pelin tapahtumajonosta, johon revealToken juuri
   * kirjoitti sen (kenttä linssi). Jono tyhjennetään vasta
   * playEventsissä, joka ajetaan tämän animaation jälkeen.
   */
  async taydennaLinssiPaljastus(caption) {
    const tunnus = this.game.events?.find((e) => e.linssi)?.linssi ?? null;
    if (!tunnus) return;
    const tuki = await this.lataaLinssit();
    const linssi = tuki?.kaikki.find((l) => l.tunnus === tunnus) ?? null;
    // Kortti on voinut jo poistua ruudulta: hidas tuonti ei saa
    // kirjoittaa irralliseen elementtiin.
    if (!linssi || !caption.isConnected) return;
    caption.firstChild.textContent = linssi.nimi;
    caption.lastChild.textContent = linssi.lyhyt;
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
    this.run(() => game.actionMove(key), { after: () => this.animatePawn(player, from, path) });
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

    // Napautus mihin tahansa hypäyttää koneen perille; kalvo pysyy
    // kuitenkin esillä, kunnes pelaaja astuu ulos napista. Animaatiot
    // kerätään talteen, jotta napautus voi viedä ne loppuun.
    const lentoAnimaatiot = [];
    const ohita = () => {
      for (const a of lentoAnimaatiot) a.finish();
      // Ohitus vie myös repliikin loppuun: hypätty lento ei saa jäädä
      // odottamaan kesken jäänyttä kirjoitusta.
      this.paataLennonTeksti(line);
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

    // Repliikki ja Astu mantereelle -nappi asuvat samassa kelluvassa
    // alaosassa: asettelu hoituu itsestään eikä napin osumakohtaa
    // tarvitse laskea käsin.
    const alaosa = html('div', 'flight-alaosa');
    overlay.appendChild(alaosa);
    // Ilman repliikkiä ei ole mitään odotettavaa: vanha kuittaus pois,
    // jottei tämä lento jää edellisen rivin varaan.
    this.flightLineValmis = null;
    if (line) this.showFlightLine(line, alaosa);
    /*
     * Astu mantereelle -nappi luodaan heti mutta näkyy vasta perillä.
     *
     * Se varaa paikkansa alusta asti, koska kartta, repliikki ja nappi
     * ovat nyt samassa pystypinossa (ks. .flight-overlay css): jos nappi
     * ilmestyisi vasta lennon lopussa, koko pino keskittyisi uudelleen
     * ja repliikki nytkähtäisi ylöspäin juuri kun sitä luetaan.
     * Näkymätön nappi ei ole myöskään sarkainjärjestyksessä eikä
     * nappaa napautuksia (visibility: hidden).
     */
    const nappi = html('button', 'flight-exit odottaa', 'Astu mantereelle');
    nappi.type = 'button';
    alaosa.appendChild(nappi);
    /*
     * Lennon kesto repliikin mukaan; ilman repliikkiä perusmitta.
     *
     * Toinen alaraja tuli 12.8.2026, kun repliikki sai avaustekstin
     * hitaan tahdin: sanamäärään perustuva arvio ei enää tunne rivin
     * välimerkkejä, ja kolmen pisteen jälkeinen tauko yksin on yli
     * sekunnin. Ilman tätä kone laskeutui pisimmillä riveillä kesken
     * lauseen. Lukuaika on se hetki, jonka valmis rivi ehtii olla
     * ruudulla ennen kuin Astu mantereelle syttyy.
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

    // Moottori jää käymään kalvon ajaksi — se hiljenee vasta, kun
    // pelaaja astuu ulos koneesta.

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
     * Siksi Astu mantereelle syttyy vasta kun rivi on oikeasti
     * valmis. Nopealla laitteella odotus on nolla, hitaalla se on
     * juuri se hetki, jonka lukija tarvitsee. Yläraja on varoventtiili:
     * kadonnut kuittaus ei saa jättää kalvoa ikuisiksi ajoiksi.
     */
    await Promise.race([
      this.flightLineValmis ?? Promise.resolve(),
      this.wait(LENNON_TEKSTI_ODOTUS_MS),
    ]);

    // Perillä kalvo jää odottamaan: lukuääni saa puhua rauhassa, ja
    // pelaaja astuu ulos itse valitsemallaan hetkellä.
    clearTimeout(nuolenAjastin);
    nuoli.remove();
    await new Promise((resolve) => {
      // Nappi on jo paikallaan repliikin alla; tässä se vain syttyy.
      nappi.classList.remove('odottaa');
      nappi.addEventListener('click', resolve, { once: true });
    });

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
    // Astu mantereelle syttyy (ks. animateFlightSisalla).
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
        kerros, lahto, kohde, kohdeIso, bbox, line,
      }));
    } finally {
      /*
       * Lippu alas myös silloin, kun lento katkeaa poikkeukseen. Se
       * pidättelee kamera-ajoja ja annosteluvirtaa, joten pystyyn
       * jäädessään se lamauttaisi koko loppupelin — ja vika näkyisi
       * jossain aivan muualla kuin lennossa.
       */
      this.aloituslentoKesken = false;
    }
    return true;
  }

  /** Lennon varsinainen piirto; kääre yllä hiljentää kartan animaatiot. */
  async aloituslentoSisalla({ kerros, lahto, kohde, kohdeIso, bbox, line }) {
    kerros.textContent = '';
    /*
     * kartalento kertoo CSS:lle ja rasteroinnille, että lento on kartan
     * PÄÄLLÄ eikä kalvon takana: pelitila (nappula, kohderenkaat,
     * laatat) piiloon lennon ajaksi, mutta kartan kuva täyteen
     * tarkkuuteen (ks. taydennaTaide).
     */
    document.body.classList.add('flight-active', 'kartalento');
    /*
     * Fokusmoodin niukkuus voimaan ENNEN kamera-ajoa: sumuverho ja
     * maakohtainen pohja rakennetaan tässä, jotta ajo alkaa jo valmiiksi
     * niukalta kartalta eikä maailma himmene kesken liikkeen.
     */
    this.paivitaFokusKerros();

    // --- 1) Kamera-ajo: lähtömaa ja kohdemaa samaan kuvaan -----------
    /*
     * pakota, koska lento omistaa kameran (ks. kartta.ajaKamera):
     * this.aloituslentoKesken torjuu muut ajot lennon ajaksi, ja tämä on
     * se yksi ajo, joka saa mennä läpi.
     */
    await this.kartta.ajaKamera(
      { bbox, marginaali: ALOITUSLENNON_MARGINAALI },
      { kesto: ALOITUSLENNON_AJO_MS, pakota: true },
    );
    if (this.dead) return;
    /*
     * KARTTA TARKENTUU ENNEN KUIN KONE LÄHTEE.
     *
     * Ajon päätteeksi kartta rasteroidaan uudessa mittakaavassa
     * (ajaKamera → taydennaTaide), ja se vie pääsäikeestä satoja
     * millisekunteja kerrallaan. Mitattuna (Chromium, kontti) repliikin
     * ensimmäinen sana ilmestyi 4,5 sekuntia kalvon jälkeen, kun sen
     * pitäisi tulla 400 ms:ssä: kirjoituskone naputtaa setTimeoutilla ja
     * jäi rasteroinnin alle. Kone lensi silloin yksin ja teksti tuli
     * perässä omaan tahtiinsa.
     *
     * Siksi lento odottaa piirron rauhoittumista. Odotus ei ole tyhjää:
     * ruudulla kartta tarkentuu venytetystä yleiskuvasta lopulliseen —
     * juuri se isoisän atlaksen tarkentuminen, jota fokusmoodi muutenkin
     * esittää. Yläraja on varoventtiili hitaalle laitteelle: kone lähtee
     * joka tapauksessa, vaikka viimeinen ruutu olisi kesken.
     */
    for (let i = 0; i < 30 && (this.taidePiirtyy || this.taideOdottaa); i++) {
      await this.wait(100);
    }
    if (this.dead) return;

    // --- 2) Reitti ja kone laudan koordinaateissa --------------------
    /*
     * Mittakaava luetaan kerran: kamera on nyt paikallaan koko lennon
     * ajan, joten viivan paksuus ja koneen koko voidaan muuntaa ruudun
     * pikseleistä laudan yksiköiksi tässä eikä joka kehyksellä.
     */
    const skaala = this.nakyvaAlue()?.skaala || 1;
    const a = { x: lahto.x, y: lahto.y };
    const b = { x: kohde.x, y: kohde.y };
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
     * Katkoviiva (.flight-trail stroke-dasharray) korvautuu tässä
     * paljastuksella: sama polku ei voi olla yhtä aikaa katkonainen ja
     * puoliksi piirtynyt.
     */
    reitti.style.strokeWidth = (ALOITUSLENNON_VIIVA_PX / skaala).toFixed(2);
    const kokoPituus = reitti.getTotalLength();
    reitti.style.strokeDasharray = kokoPituus;
    reitti.style.strokeDashoffset = kokoPituus;

    const kone = el('g', { class: 'flight-plane' }, kerros);
    // Sama koneen piirros kuin vanhalla kalvolla: runko, siivet, pyrstö.
    // Mitta ruudun pikseleinä, jottei kone kasva mantereen kokoiseksi.
    el('path', {
      d: 'M14,0 L-6,0 M-10,0 L-14,0 M2,0 L-8,-9 L-4,-9 L6,0 L-4,9 L-8,9 z '
        + 'M-11,0 L-15,-5 L-13,-5 L-9,0 L-13,5 L-15,5 z',
      class: 'flight-plane-body',
      transform: `scale(${(ALOITUSLENNON_KONE_PX
        / (ALOITUSLENNON_KONE_MITTA * skaala)).toFixed(4)})`,
    }, kone);

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

    // --- 3) Repliikki, napit ja ohitus (ennallaan kalvolta) ----------
    const lentoAnimaatiot = [];
    const ohitaLento = () => {
      for (const anim of lentoAnimaatiot) anim.finish();
      this.paataLennonTeksti(line);
    };
    /*
     * Kalvo on nyt LÄPINÄKYVÄ (.flight-overlay.kartalla): siitä jää
     * jäljelle vain repliikin ja napin pysty pino sekä koko ruudun
     * kokoinen ohituskuuntelija. Tausta, sumennus ja piirretty kohtaus
     * ovat poissa — kartta näkyy sellaisenaan.
     */
    const overlay = html('div', 'flight-overlay kartalla');
    this.mapPane.appendChild(overlay);
    overlay.addEventListener('pointerdown', ohitaLento, { once: true });
    const alaosa = html('div', 'flight-alaosa');
    overlay.appendChild(alaosa);
    this.flightLineValmis = null;
    if (line) this.showFlightLine(line, alaosa);
    const nappi = html('button', 'flight-exit odottaa', 'Astu mantereelle');
    nappi.type = 'button';
    alaosa.appendChild(nappi);
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
    // Matkustamon äänimaisema seuraa flight-active-lippua, kuten kalvolla.
    this.syncAmbience();

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
      reittiRuudut.push({ offset: t, strokeDashoffset: kokoPituus * (1 - e) });
    }
    kone.style.transform = koneRuudut[0].transform;
    await new Promise((valmis) => requestAnimationFrame(() => requestAnimationFrame(valmis)));
    const koneAnim = kone.animate(koneRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    const reittiAnim = reitti.animate(reittiRuudut, {
      duration: lennonKesto, delay: 180, easing: 'linear', fill: 'forwards',
    });
    lentoAnimaatiot.push(koneAnim, reittiAnim);
    await Promise.all([koneAnim.finished, reittiAnim.finished]).catch(() => {
      /* peruttu animaatio (esim. uusi peli) ei kaada lentoa */
    });

    // Sama mitattu sääntö kuin kalvolla: Astu mantereelle syttyy vasta
    // kun repliikki on oikeasti kirjoittunut loppuun.
    await Promise.race([
      this.flightLineValmis ?? Promise.resolve(),
      this.wait(LENNON_TEKSTI_ODOTUS_MS),
    ]);
    clearTimeout(nuolenAjastin);
    nuoli.remove();
    await new Promise((resolve) => {
      nappi.classList.remove('odottaa');
      nappi.addEventListener('click', resolve, { once: true });
    });

    // --- 5) Perillä: fokusmoodin tavallinen saapuminen ---------------
    sfx.stopFlight();
    this.ennakoiAmbienssi(this.game.player?.pos);
    document.body.classList.remove('flight-active', 'kartalento');
    overlay.classList.add('flight-leaving');
    await this.wait(280);
    overlay.remove();
    kerros.textContent = '';
    this.hideFlightLine();
    /*
     * Lento päättyy tähän, ja vasta nyt muut kamera-ajot ovat taas
     * sallittuja. Kamera ajaa kohdemaan rajaukseen — se on sama
     * saapumisliike, jonka fokuskartta tekee muissa maanvaihdoksissa —
     * ja render käynnistää annosteluvirran (fokusvirtaSaapuminen),
     * joka odotti lennon ajan.
     */
    this.aloituslentoKesken = false;
    const maanRajaus = this.kartta.maidenBbox([kohdeIso]);
    if (maanRajaus) this.kartta.ajaKamera({ bbox: maanRajaus });
    if (!this.dead) this.render();
  }

  /** Siirtää nappulaa askel kerrallaan annettua polkua pitkin. */
  async animatePawn(player, from, path, stepMs = STEP_MS) {
    return this.isoAnimaatio(() => this.animatePawnSisalla(player, from, path, stepMs));
  }

  /** Nappulan varsinainen siirto; kääre yllä hiljentää kartan animaatiot. */
  async animatePawnSisalla(player, from, path, stepMs = STEP_MS) {
    if (!path || path.length === 0) return;
    const { board } = this.game;

    this.movingPlayerId = player.id;
    this.drawPawns();
    const g = this.pawnShape(this.pawnLayer, player, false);
    g.classList.add('pawn-moving');
    if (stepMs !== STEP_MS) g.style.transitionDuration = `${stepMs}ms`;

    const start = pixelOf(board, from);
    g.style.transform = `translate(${start.x}px, ${start.y}px)`;
    g.getBoundingClientRect(); // varmistaa, että ensimmäinenkin askel animoituu

    for (const [i, pos] of path.entries()) {
      const { x, y } = pixelOf(board, pos);
      g.style.transform = `translate(${x}px, ${y}px)`;
      // Määränpään äänimaisema lähtee nousemaan jo viimeisellä
      // askeleella, jotta ristihäivytys on käynnissä saapumishetkellä
      // eikä ala vasta kertojan kanssa yhtä aikaa (omistajan toive).
      if (i === path.length - 1) this.ennakoiAmbienssi(pos);
      sfx.play(i === path.length - 1 ? 'arrive' : 'step');
      await this.wait(this.reducedMotion ? 0 : stepMs);
    }

    g.remove();
    this.movingPlayerId = null;
    this.revealShownFor = null;
    this.drawPawns();
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
    const from = this.kartta.mapToPane(pixelOf(this.game.board, player.pos));
    const to = this.kartta.dieRestingSpot();
    this.dieThrown = true;

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
      else if (wantsDuelBypass(game)) this.run(() => game.actionDuelBypass());
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
