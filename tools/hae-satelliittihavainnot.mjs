/*
 * SATELLIITTILINSSIN AINEISTON HAKU — NASAn astronauttien Maa-kuvat →
 * js/linssit/satelliitti-data.js.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-satelliittihavainnot.mjs
 *
 * Työkalu on AJETTAVA ERIKSEEN eikä osa pelin latausta: linssi lukee
 * valmiin aineistotiedoston, jotta peli ei tee kymmeniä verkkopyyntöjä
 * linssin auetessa eikä ole kiinni siitä, vastaako NASAn palvelin juuri
 * nyt. Kuvia EI tuoda repoon — aineistoon tallentuu vain osoite.
 *
 * ── MIKSI AINEISTO VAIHTUI (omistaja 12.9.2026) ───────────────────
 *
 * Sanatarkasti: *"Uusi linssi toimii nyt hyvin, mutta valitettavasti
 * itse materiaali on aika epäkiinnostavaa. Onko mitään muuta
 * tietolähdettä, mitä voitaisiin käyttää samalla logiikalla ja korvata
 * vain data johonkin toiseen?"* — ja kysymyskorttiin vastaus:
 * *"Astronauttien Maa-kuvat"*.
 *
 * Harmaa tutkakuva (ICEYE, v1794–v1801) ei kerro katsojalle mitään
 * ilman selitystä. Värivalokuvassa näkee heti mitä katsoo: kaupungit
 * yöllä, tulivuoret, atollit, jokisuistot, hiekkadyynit, hurrikaanit,
 * revontulet. Linssin logiikka säilyi täsmälleen ennallaan — vain
 * tämä työkalu ja sen tuottama aineisto vaihtuivat. Juuri se on
 * linssin arvo: se on aineistosta riippumaton.
 *
 * ── MIKSI KOHTEET VALITAAN KÄSIN ──────────────────────────────────
 *
 * Tutka-aineistossa kohteet kelpasi ryhmitellä koneellisesti
 * jalanjäljistä, koska jokaisella kuvauksella oli mitattu bbox.
 * Astronautin ottamassa valokuvassa ei ole sellaista: kamera osoittaa
 * minne astronautti sen käänsi, kuvassa on vinoja perspektiivejä,
 * pilviä, ikkunankehyksiä ja avaruusaseman omia rakenteita. Kelvollista
 * kuvaa EI voi valita metatiedosta — se pitää katsoa.
 *
 * KOHTEET alla on siksi käsin katsottu ja hylätty luettelo: jokainen
 * kuva on avattu ja arvioitu (rajaus, pilvet, terävyys, tunnistuuko
 * kohde), ja jokaiselle on kirjoitettu oma suomenkielinen kuvateksti.
 * Kuvateksti on linssissä ainoa teksti, jonka pelaaja näkee, joten se
 * on sisältötyötä eikä metatiedon kopiointia.
 *
 * ── AINEISTO KAKSINKERTAISTETTIIN (omistaja 12.9.2026) ────────────
 *
 * Sanatarkasti: *"Astronoottikuvat ovat hienoja, niitä voisi olla
 * vaikka enemmänkin."* Kohteita nostettiin 26:sta 64:ään ja kuvia
 * 37:stä 83:een samalla kurilla: jokainen ehdokas ladattiin ja
 * katsottiin, ja hylkyprosentti pysyi entisellään. Hylkäysperusteet
 * olivat pilvet ja usva, avaruusaseman rakenteet kohteen edessä,
 * liian kaukaa otettu rajaus, lähes harmaasävyinen kuva, filmikuvien
 * ristikot ja ruutunumerot sekä päällekkäisyys paremman otoksen
 * kanssa. Uudet teemat: saaristot ja riuttasaaret, koralliriutat,
 * suistot ja mangrove, suolatasangot ja kausijärvet, metsäpalojen
 * savu, tekojärvet ja kasteluympyrät, hiekkameret, merijää ja
 * jäävuoret, kanavat ja salmet, avolouhos ja keitaat.
 *
 * Työkalu hakee koneellisesti sen, mikä on koneellisesti haettavissa:
 * kuvaosoitteet, kuvausajan, retkikunnan ja kuvaajan NASAn omasta
 * rajapinnasta — ja tarkistaa, että jokainen osoite vastaa.
 *
 * ── YKSI PISTE PER PAIKKA, GALLERIA PISTEEN SISÄLLÄ ───────────────
 *
 * Sama sääntö kuin ennen: saman paikan eri kuvauskerrat ovat yhden
 * pisteen galleria (Etna 2002 ja 2006, Dubai päivällä ja yöllä), eri
 * paikat ovat eri pisteitä. Saman paikan kuvat ovat eri päiviltä,
 * jotta pikkukuvien päiväykset erottavat ne toisistaan.
 *
 * ── LISENSSI ──────────────────────────────────────────────────────
 *
 * NASAn kuvat ovat public domainia: käyttö ei vaadi lupaa eikä maksua,
 * ja lähde mainitaan hyvän tavan mukaisesti. Kuvan päällä oleva leima
 * "Valokuva avaruudesta · NASA" ja info-popupin lähdelinkki kertovat
 * aina, mistä kuva on. ICEYE-attribuutio poistui, koska aineistoa ei
 * enää käytetä.
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');

/** NASAn kuvakirjaston rajapinta (ei avainta, CORS *). */
export const RAJAPINTA = 'https://images-api.nasa.gov';

/** Kuvasivu ihmiselle — info-popupin lähdelinkki. */
export const KUVASIVU = 'https://images.nasa.gov/details/';

/**
 * POIKKEUKSET — nasa_id → oma ämpäri, kun NASAn kuvassa oli alareunan
 * valkoinen tekstipalkki (leima), joka on rajattu pois käsin (sisalto-
 * astro-palkit, 2026-09-20/21). Ilman tätä listaa ajo palauttaisi taas
 * NASAn alkuperäiset, palkilliset osoitteet.
 */
const OMA_AMPARI = 'https://media.matkakirja.app/linssit/astronautin-kamera/';
export const KUVAPOIKKEUKSET = new Set([
  'iss005e19024', 'iss013e62714', 'iss020e009048', 'iss014e17165',
  'iss025e009858', 'iss002e5693', 'iss010e12917', 'iss026e016287',
  'iss024e011914', 'iss013e65526', 'iss015e29867', 'iss018e038182',
]);

/**
 * KOHTEET — käsin katsottu luettelo.
 *
 *   tunnus  pisteen avain (pysyvä)
 *   nimi    yläpalkkiin ja pisteen viereen
 *   seutu   info-popupin paikkarivi
 *   lat/lon pisteen paikka pallolla
 *   selite  yhden virkkeen kuvaus kohteesta
 *   oletus  gallerian ensimmäinen kuva (paras yleiskuva, ei uusin)
 *   kuvat   [{ id, teksti }] — NASA-kuvatunnus ja sen oma kuvateksti
 */
export const KOHTEET = [
  {
    tunnus: 'etna', nimi: 'Etna', seutu: 'Sisilia, Italia', lat: 37.751, lon: 14.994,
    selite: 'Euroopan korkein toimiva tulivuori, joka purkautuu useammin kuin mikään muu.',
    oletus: 'iss005e19024',
    kuvat: [
      {
        id: 'iss005e19024',
        teksti: 'Etnan purkaus lokakuussa 2002. Tumma tuhkapilvi kulkee kaakkoon Sisilian ylle, '
          + 'ja sen vasemmalla puolella nousee vaaleampaa savua maastopaloista, jotka rinteitä '
          + 'alas valunut laava sytytti. Miehistö sai purkauksen kuvaan sen alkuvaiheessa.',
      },
      {
        id: 'iss013e62714',
        teksti: 'Sama vuori neljä vuotta myöhemmin rauhallisempana: huippukraattereista nousee '
          + 'höyryä ja hiukan tuhkaa. Mustat laavavirrat erottuvat vihreästä rinteestä kuin '
          + 'maalitahrat — jokainen niistä on oma purkauksensa.',
      },
    ],
  },
  {
    tunnus: 'italia-yolla', nimi: 'Italian saapas yöllä', seutu: 'Italia', lat: 41.30, lon: 14.60,
    selite: 'Koko niemimaa kerralla: kaupunkien valot piirtävät rannikon tarkemmin kuin kartta.',
    oletus: 'iss037e018864',
    kuvat: [
      {
        id: 'iss037e018864',
        teksti: 'Italia ja Sisilia yön valoissa. Rooman ja Napolin kirkkaat läiskät ovat keskellä '
          + 'kuvaa, Adrianmeri jää oikealle mustaksi. Rannikon ääriviiva syntyy pelkistä '
          + 'katuvaloista: siellä missä ihmiset asuvat, maa hohtaa, ja vuoristo jää pimeäksi.',
      },
    ],
  },
  {
    tunnus: 'istanbul', nimi: 'Istanbul', seutu: 'Turkki', lat: 41.02, lon: 28.98,
    selite: 'Kaupunki kahdella mantereella, ja niiden välissä musta salmi.',
    oletus: 'iss065e030820',
    kuvat: [
      {
        id: 'iss065e030820',
        teksti: 'Bosporinsalmi halkoo kultaisen kaupungin kahtia: vasemmalla Eurooppa, oikealla '
          + 'Aasia. Salmi ja Kultainen sarvi jäävät valojen keskellä täysin mustiksi, ja niiden '
          + 'yli kulkevat siltojen ohuet valojuovat. Kuvan otti Thomas Pesquet.',
      },
      {
        id: 'iss032e017547',
        teksti: 'Laajempi näkymä yhdeksän vuotta aiemmin. Kaupungin reuna erottuu yöllä '
          + 'terävämmin kuin päivällä — siitä kohdasta valot yksinkertaisesti loppuvat.',
      },
    ],
  },
  {
    tunnus: 'sarytsev', nimi: 'Sarytševin tulivuori', seutu: 'Kuriilit, Venäjä', lat: 48.09, lon: 153.20,
    selite: 'Purkaus, joka osui kohdalle juuri oikealla hetkellä.',
    oletus: 'iss020e009048',
    kuvat: [
      {
        id: 'iss020e009048',
        teksti: 'Purkaus kesken nousunsa: ruskea tuhkapatsas työntyy ylös ja sen huipulla lepää '
          + 'sileä valkoinen pilvenhattu, joka tiivistyy kun ilma nousee pilven mukana. Pilvikatto '
          + 'on auennut tulivuoren ympäriltä renkaaksi. Avaruusaseman rata sattui kulkemaan '
          + 'kohdalta juuri tällä hetkellä.',
      },
    ],
  },
  {
    tunnus: 'siveluts', nimi: 'Šiveluts', seutu: 'Kamtšatka, Venäjä', lat: 56.65, lon: 161.36,
    selite: 'Kamtšatkan vilkkaimpia tulivuoria, lumen ja tuhkan kaksivärinen rinne.',
    oletus: 'iss014e17165',
    kuvat: [
      {
        id: 'iss014e17165',
        teksti: 'Höyry- ja tuhkapilvi ajautuu länteen lumisen huipun yli. Vasemmalla rinne on '
          + 'tuhkan peittämä ja ruskea, oikealla puhtaan valkoinen — tuuli on lajitellut vuoren '
          + 'kahteen väriin. Purkausjakso oli alkanut muutamaa päivää aiemmin.',
      },
    ],
  },
  {
    tunnus: 'popocatepetl', nimi: 'Popocatépetl', seutu: 'Meksiko', lat: 19.023, lon: -98.622,
    selite: 'Toimiva tulivuori aivan Mexico Cityn kyljessä.',
    oletus: 'iss064e026423',
    kuvat: [
      {
        id: 'iss064e026423',
        teksti: 'Yli 5 400 metriä korkean tulivuoren huipulta karkaa ohut höyrypilvi länteen. '
          + 'Rinteen juurella näkyy peltojen ja teiden verkko: viisitoista miljoonaa ihmistä asuu '
          + 'alle sadan kilometrin päässä kraatterista.',
      },
    ],
  },
  {
    tunnus: 'fuji', nimi: 'Fuji', seutu: 'Japani', lat: 35.361, lon: 138.727,
    selite: 'Japanin korkein vuori, lähes täydellinen kartio.',
    oletus: 'iss074e0459342',
    kuvat: [
      {
        id: 'iss074e0459342',
        teksti: 'Fuji melkein suoraan ylhäältä. Keskellä näkyy kraatteri mustana kuoppana, ja '
          + 'lumi valuu siitä säteittäin alas kuin kaadettu maito. Vuori on yhä toimiva '
          + 'tulivuori, vaikka viime purkauksesta on vuosi 1707.',
      },
      {
        id: 'iss074e0044445',
        teksti: 'Sama vuori yöllä. Lumihuippu häämöttää harmaana keskellä kaupunkien valoverkkoa: '
          + 'Fuji-järvien seudulla ja sen ympäristössä asuu yli viisi miljoonaa ihmistä. Kuva on '
          + 'otettu paikallista aikaa noin puoli viideltä aamulla.',
      },
    ],
  },
  {
    tunnus: 'tokio', nimi: 'Tokio', seutu: 'Japani', lat: 35.68, lon: 139.77,
    selite: 'Maailman väkirikkain kaupunkiseutu yöllä.',
    oletus: 'iss073e0918643',
    kuvat: [
      {
        id: 'iss073e0918643',
        teksti: 'Tokionlahden ympärillä asuu yli 39 miljoonaa ihmistä. Valojen seasta erottuvat '
          + 'pääratojen linjat, joiden asemat hohtavat ketjuna kirkkaampia pisteitä. Kuva on '
          + 'otettu paikallista aikaa noin neljältä aamulla.',
      },
    ],
  },
  {
    tunnus: 'korea', nimi: 'Korean niemimaa yöllä', seutu: 'Korea', lat: 38.30, lon: 127.20,
    selite: 'Yökuva, jossa valtioiden raja näkyy pelkkänä pimeytenä.',
    oletus: 'iss038e038300',
    kuvat: [
      {
        id: 'iss038e038300',
        teksti: 'Etelä-Korea loistaa alhaalla oikealla, ja sen keskellä on Soulin suuri '
          + 'valoläiskä. Pohjoisessa on lähes täysin pimeää: ainoa kirkas piste on Pjongjang. '
          + 'Yökuva mittaa sähkönkäyttöä, ja siksi raja erottuu tässä selvemmin kuin päiväkuvassa.',
      },
    ],
  },
  {
    tunnus: 'dubai', nimi: 'Dubai', seutu: 'Arabiemiirikunnat', lat: 25.13, lon: 55.13,
    selite: 'Mereen rakennetut keinosaaret, jotka tunnistaa avaruudesta muodosta.',
    oletus: 'iss073e0247372',
    kuvat: [
      {
        id: 'iss073e0247372',
        teksti: 'Persianlahden rannalle kasattu hiekka on muotoiltu palmuiksi ja saariryhmäksi: '
          + 'vasemmalla Palm Jebel Ali, keskellä Palm Jumeirah ja oikealla The World -saaret. '
          + 'Kaikki näkyvä ranta on ihmisen tekemää.',
      },
      {
        id: 'iss072e447465',
        teksti: 'Sama rannikko yöllä paikallista aikaa noin kymmeneltä illalla. Palm Jumeirahin '
          + 'lehdet piirtyvät valoista, ja aavikolle vievät tiet erottuvat oransseina viivoina '
          + 'kaupungin valkoista hehkua vasten.',
      },
    ],
  },
  {
    tunnus: 'niilin-suisto', nimi: 'Niilin suisto', seutu: 'Egypti', lat: 30.60, lon: 31.20,
    selite: 'Joki ja sen suisto piirtyvät yöllä valoista, aavikko jää mustaksi.',
    oletus: 'iss037e004654',
    kuvat: [
      {
        id: 'iss037e004654',
        teksti: 'Kairo on kirkas ryöppy keskellä kuvaa, ja siitä pohjoiseen avautuu Niilin '
          + 'suiston valoviuhka. Joen varsi on asuttu kapeana nauhana, ja sen molemmin puolin '
          + 'alkaa heti aavikon pimeys. Kuvan otti Karen Nyberg.',
      },
      {
        id: 'iss025e009858',
        teksti: 'Sama seutu avaruusaseman ikkunasta. Niili nousee alhaalta ylös kuin valoköysi, '
          + 'ja sen päässä suisto levittäytyy Välimerelle; kaukana horisontissa hohtaa ilmakehän '
          + 'oma vihertävä valo.',
      },
    ],
  },
  {
    tunnus: 'richat', nimi: 'Saharan silmä', seutu: 'Mauritania', lat: 21.124, lon: -11.401,
    selite: 'Neljäkymmentä kilometriä leveä rengasrakenne keskellä aavikkoa.',
    oletus: 'iss069e005471',
    kuvat: [
      {
        id: 'iss069e005471',
        teksti: 'Richat-rakenne eli Saharan silmä. Kyseessä ei ole törmäyskraatteri vaan '
          + 'kohonnut kalliokupoli, jonka kerrokset tuuli ja vesi ovat kuluttaneet paljaiksi '
          + 'renkaiksi. Kovat kerrokset jäivät harjanteiksi, pehmeät kuluivat kouruiksi.',
      },
      {
        id: 'iss002e5693',
        teksti: 'Sama kohde 22 vuotta aiemmin, kun hiekkapöly värjää ilman punertavaksi. '
          + 'Astronautit ovat käyttäneet silmää maamerkkinä alusta asti: aavikolla ei ole '
          + 'juuri muuta, mistä paikan tunnistaisi.',
      },
    ],
  },
  {
    tunnus: 'namib', nimi: 'Namibin dyynit', seutu: 'Namibia', lat: -25.00, lon: 16.00,
    selite: 'Maailman korkeimpia hiekkadyynejä, ja niiden terävä reuna kalliomaata vasten.',
    oletus: 'iss073e0511487',
    kuvat: [
      {
        id: 'iss073e0511487',
        teksti: 'Oikealla punainen dyynikenttä, vasemmalla paljas kalliomaa — ja niiden välissä '
          + 'lähes viivasuora raja. Meren puolelta puhaltava tuuli kasaa hiekan aina samaan '
          + 'kohtaan, eikä se pääse kallioiden yli.',
      },
      {
        id: 'iss071e230722',
        teksti: 'Dyynikenttä ylhäältä Atlantin rannikolla. Hiekka vaihtaa väriä vaaleasta '
          + 'ruosteenpunaiseen sitä mukaa kuin rautapitoiset jyvät hapettuvat: mitä vanhempi '
          + 'hiekka, sitä punaisempi dyyni.',
      },
    ],
  },
  {
    tunnus: 'betsiboka', nimi: 'Betsiboka', seutu: 'Madagaskar', lat: -16.00, lon: 46.55,
    selite: 'Joki, joka kuljettaa punaisen maan mereen.',
    oletus: 'iss071e218069',
    kuvat: [
      {
        id: 'iss071e218069',
        teksti: 'Betsiboka-joki tuo Bombetokanlahteen niin paljon rautapitoista maa-ainesta, '
          + 'että vesi on ruosteenpunaista. Saarekkeet lahden suulla ovat kasvaneet siitä '
          + 'maasta, jonka joki on huuhtonut metsänhakkuiden jäljiltä.',
      },
      {
        id: 'iss018e025705',
        teksti: 'Sama joki tulvillaan vuonna 2009, kun trooppinen myrsky Eric oli kastellut sen '
          + 'valuma-alueen. Punaisen veden rinnalla näkyy vielä tummanvihreää metsää — juuri '
          + 'sen katoaminen tekee joesta näin punaisen.',
      },
    ],
  },
  {
    tunnus: 'gibraltar', nimi: 'Gibraltarinsalmi', seutu: 'Espanja ja Marokko', lat: 35.95, lon: -5.60,
    selite: 'Neljäntoista kilometrin kapeikko kahden mantereen ja kahden meren välissä.',
    oletus: 'iss071e217183',
    kuvat: [
      {
        id: 'iss071e217183',
        teksti: 'Espanja vasemmalla, Marokko oikealla, ja niiden välissä salmi, joka yhdistää '
          + 'Atlantin Välimereen. Oikeassa yläkulmassa näkyy avaruusaseman robottikäsi. Kuvan '
          + 'otti astronautti Butch Wilmore.',
      },
      {
        id: 'iss073e0686324',
        teksti: 'Sama salmi yöllä. Molempien rannikoiden valot piirtävät kapeikon muodon, ja '
          + 'horisontissa hohtaa ilmakehän oma vihreä valo. Paikallista aikaa oli puoli kaksi '
          + 'yöllä.',
      },
    ],
  },
  {
    tunnus: 'bahama', nimi: 'Bahaman matalikot', seutu: 'Bahama', lat: 24.00, lon: -77.50,
    selite: 'Kirkas vesi matalan kalkkipohjan päällä — avaruuden näkyvin turkoosi.',
    oletus: 'iss071e449837',
    kuvat: [
      {
        id: 'iss071e449837',
        teksti: 'Turkoosit alueet ovat vain muutaman metrin syvyisiä kalkkihiekkamatalikoita, '
          + 'joista valo heijastuu takaisin; tummansininen on syvää merta. Ylhäällä kaartuu '
          + 'Maan reuna ja sen yllä ohut ilmakehä.',
      },
      {
        id: 'iss058e002206',
        teksti: 'Sama matalikkoalue Kuuban suunnasta katsottuna. Kuvan vasemmassa reunassa näkyy '
          + 'avaruusasemaan telakoitu Progress-rahtialus — muistutus siitä, mistä ikkunasta '
          + 'kuvat otetaan.',
      },
    ],
  },
  {
    tunnus: 'new-york', nimi: 'New York yöllä', seutu: 'Yhdysvallat', lat: 40.71, lon: -74.00,
    selite: 'Katuverkko, jonka muodon tunnistaa pelkistä valoista.',
    oletus: 'iss064e016772',
    kuvat: [
      {
        id: 'iss064e016772',
        teksti: 'Manhattanin ruutukaava erottuu vaaleana suikaleena, ja Central Park on sen '
          + 'keskellä musta suorakulmio. Joet ja satama jäävät pimeiksi, sillat näkyvät ohuina '
          + 'valojuovina niiden yli.',
      },
      {
        id: 'iss053e239527',
        teksti: 'Laajempi näkymä kaikkiin viiteen kaupunginosaan ja New Jerseyn puolelle. '
          + 'Oranssit valot ovat vanhaa natriumvaloa, kylmän valkoiset uutta LED-valaistusta — '
          + 'ero kertoo, missä katulamput on jo vaihdettu.',
      },
    ],
  },
  {
    tunnus: 'manicouagan', nimi: 'Manicouaganin kraatteri', seutu: 'Québec, Kanada', lat: 51.38, lon: -68.70,
    selite: 'Rengasjärvi, joka on 214 miljoonaa vuotta vanhan törmäyksen jälki.',
    oletus: 'iss034e052297',
    kuvat: [
      {
        id: 'iss034e052297',
        teksti: 'Jäätynyt rengasjärvi kiertää keskelle jäänyttä saarta. Kraatteri syntyi noin '
          + '214 miljoonaa vuotta sitten asteroidin törmäyksestä, ja jääkaudet ovat sittemmin '
          + 'hioneet sen reunat matalaksi. Se on avaruudesta katsottuna yksi Maan '
          + 'tunnistettavimmista muodoista.',
      },
    ],
  },
  {
    tunnus: 'grand-canyon', nimi: 'Grand Canyon', seutu: 'Arizona, Yhdysvallat', lat: 36.10, lon: -112.10,
    selite: 'Joen kaivama rotko, jonka haarat levittäytyvät kuin puun oksat.',
    oletus: 'iss074e0208838',
    kuvat: [
      {
        id: 'iss074e0208838',
        teksti: 'Colorado-joki alkoi kaivaa rotkoa noin viisi miljoonaa vuotta sitten. '
          + 'Talvikuvassa varjot ja lumi korostavat sivurotkojen haarautuvaa kuviota, ja '
          + 'ylätasangot erottuvat vaaleina — ne ovat tuhat metriä rotkon pohjan yläpuolella.',
      },
    ],
  },
  {
    tunnus: 'lago-argentino', nimi: 'Lago Argentino', seutu: 'Patagonia, Argentiina', lat: -50.30, lon: -72.80,
    selite: 'Turkoosi jäätikköjärvi lumihuippujen keskellä.',
    oletus: 'iss074e0573516',
    kuvat: [
      {
        id: 'iss074e0573516',
        teksti: 'Järven väri tulee jäätikköjauhosta: jäätiköt jauhavat kalliota hienoksi '
          + 'jauheeksi, joka jää veteen leijumaan ja heijastaa valoa turkoosina. Järven '
          + 'sormet työntyvät suoraan Andien lumisten vuorten väliin.',
      },
      {
        id: 'iss030e091253',
        teksti: 'Perito Morenon jäätikkö työntyy samaan järveen lännestä. Jäävirta tulee '
          + 'Patagonian mannerjäätiköstä ja päättyy jyrkkään reunaan veden rajassa; kieleke on '
          + 'välillä kasvanut kiinni vastarannan niemeen ja padonnut järven eteläisen haaran.',
      },
    ],
  },
  {
    tunnus: 'ucayali', nimi: 'Ucayali', seutu: 'Peru', lat: -7.50, lon: -74.80,
    selite: 'Amazonin latvajoki, joka vaihtaa uomaansa jatkuvasti.',
    oletus: 'iss074e0492148',
    kuvat: [
      {
        id: 'iss074e0492148',
        teksti: 'Joki kiemurtelee sademetsän läpi niin jyrkissä mutkissa, että osa niistä on jo '
          + 'kuroutunut umpeen: vanhat uomat näkyvät kaarevina järvinä joen vierellä. Ucayali on '
          + 'Amazonin pääasiallinen latvahaara.',
      },
    ],
  },
  {
    tunnus: 'taifuuni', nimi: 'Taifuunin silmä', seutu: 'Tyynimeri, Japanin eteläpuolella', lat: 26.00, lon: 139.00,
    selite: 'Myrskyn silmä ylhäältä katsottuna — tyyni reikä keskellä pyörrettä.',
    oletus: 'iss073e1044643',
    kuvat: [
      {
        id: 'iss073e1044643',
        teksti: 'Taifuuni Halong luokkaa neljä Japanin eteläpuolella. Keskellä on silmä, jossa '
          + 'ilma laskeutuu ja pilvet hajoavat; sen ympärillä kiertää tiivis pilviseinä, jossa '
          + 'tuuli on kovimmillaan. Kuvan reunoilla näkyvät avaruusaseman aurinkopaneeli ja '
          + 'robottikäsi.',
      },
    ],
  },
  {
    tunnus: 'revontulet-etela', nimi: 'Etelän revontulet', seutu: 'Uuden-Seelannin kaakkoispuoli', lat: -48.00, lon: 179.00,
    selite: 'Revontulet ylhäältä: valo on samalla korkeudella kuin katsoja.',
    oletus: 'iss073e0256896',
    kuvat: [
      {
        id: 'iss073e0256896',
        teksti: 'Etelän revontulet pyörteilevät pilvien yllä Uuden-Seelannin kaakkoispuolella. '
          + 'Vihreä väri syntyy hapesta noin sadan kilometrin korkeudessa ja punertava '
          + 'sitä ylempää — avaruusasema kiertää noin 400 kilometrissä, eli valon yläpuolella.',
      },
    ],
  },
  {
    tunnus: 'revontulet-pohjoinen', nimi: 'Pohjoisen revontulet', seutu: 'Saint Lawrencenlahti, Kanada', lat: 48.50, lon: -62.00,
    selite: 'Punaista ja vihreää verhoa Kanadan yllä.',
    oletus: 'iss072e451060',
    kuvat: [
      {
        id: 'iss072e451060',
        teksti: 'Revontuliverho seisoo pystyssä kuin valoaita: alaosa on vihreä, yläosa punainen. '
          + 'Väri kertoo korkeuden, koska ohuessa yläilmakehässä happi ehtii hehkua punaisena. '
          + 'Tähtiä näkyy verhon läpi.',
      },
    ],
  },
  {
    tunnus: 'himalaja', nimi: 'Himalaja', seutu: 'Nepal ja Kiina', lat: 28.30, lon: 85.50,
    selite: 'Vuorijono, joka jakaa ilmaston kahtia.',
    oletus: 'iss074e0603570',
    kuvat: [
      {
        id: 'iss074e0603570',
        teksti: 'Lumiset huiput erottavat Nepalin Tiibetistä. Vuoristo toimii patona: kostea '
          + 'ilma pysähtyy etelärinteille, ja pohjoispuolen ylätasanko jää kuivaksi. Ero näkyy '
          + 'kuvassa värinä — alhaalla vihreää, ylhäällä ruskeaa.',
      },
    ],
  },
  {
    tunnus: 'goidhoo', nimi: 'Goidhoon atolli', seutu: 'Malediivit', lat: 4.90, lon: 72.90,
    selite: 'Rengasriutta, jonka sisään jää matala laguuni.',
    oletus: 'iss010e12917',
    kuvat: [
      {
        id: 'iss010e12917',
        teksti: 'Atolli on vanhan tulivuoren ympärille kasvanut koralliriutta: vuori on painunut '
          + 'mereen, riutta jäi. Vaalea vyöhyke on riutan matalikkoa, tummansininen ulkopuolella '
          + 'on satojen metrien syvyistä. Kuva on osa sarjaa, joka otettiin vuoden 2004 '
          + 'tsunamin jälkeen.',
      },
    ],
  },
  {
    tunnus: 'bermuda', nimi: 'Bermuda', seutu: 'Pohjois-Atlantti', lat: 32.32, lon: -64.75,
    selite: 'Yksinäinen saariryhmä keskellä valtamerta, riutan reunustamana.',
    oletus: 'iss071e206529',
    kuvat: [
      {
        id: 'iss071e206529',
        teksti: 'Bermudan koukkumainen saariketju on sammuneen tulivuoren huipulle kasvanut '
          + 'kalkkikivikansi. Vaaleansininen alue saaren ympärillä on matalaa riuttatasannetta, '
          + 'sen takana meri syvenee tuhansiin metreihin. Lähin manner on yli 1 000 kilometrin päässä.',
      },
    ],
  },
  {
    tunnus: 'bazaruto', nimi: 'Bazaruton saaristo', seutu: 'Mosambik', lat: -21.60, lon: 35.45,
    selite: 'Hiekkasärkkiä ja vuorovesivirtoja, jotka piirtyvät veteen kuin suonisto.',
    oletus: 'iss065e009427',
    kuvat: [
      {
        id: 'iss065e009427',
        teksti: 'Pitkä hiekkasaari erottaa matalan salmen avomerestä. Turkoosit juovat ovat '
          + 'vuoroveden kuljettamaa hiekkaa: vesi virtaa saaren ohi kahdesti päivässä sisään ja '
          + 'ulos, ja pohja järjestyy virran suuntaisiksi harjuiksi.',
      },
      {
        id: 'iss070e064005',
        teksti: 'Sama salmi lähempää. Vaaleat viuhkat ovat hiekkaa, tummemmat urat syvempiä '
          + 'väyliä. Kuvio muuttuu myrskyjen mukana, joten merikartat vanhenevat täällä nopeammin '
          + 'kuin kalliorannikolla.',
      },
    ],
  },
  {
    tunnus: 'quirimbas', nimi: 'Quirimbasin saaret', seutu: 'Mosambik', lat: -12.30, lon: 40.60,
    selite: 'Riuttasaarten ketju mantereen ja syvän meren rajalla.',
    oletus: 'iss071e378497',
    kuvat: [
      {
        id: 'iss071e378497',
        teksti: 'Saaret ovat jonossa pitkin mannerjalustan reunaa. Jokaisen ympärillä näkyy '
          + 'vaalea riuttarengas, ja heti sen ulkopuolella vesi muuttuu yhtäkkiä tummansiniseksi '
          + '— siinä pohja putoaa jyrkästi Intian valtamereen.',
      },
    ],
  },
  {
    tunnus: 'turks-caicos', nimi: 'Turks- ja Caicossaaret', seutu: 'Karibia', lat: 21.75, lon: -71.75,
    selite: 'Matalikko, joka hohtaa vaaleana keskellä syvää merta.',
    oletus: 'iss073e0118628',
    kuvat: [
      {
        id: 'iss073e0118628',
        teksti: 'Saaret ovat vain kapea reunus laajan kalkkimatalikon päällä. Vaaleanvihreä '
          + 'alue on muutaman metrin syvyistä vettä hiekkapohjan yllä; ympäröivä tummansininen on '
          + 'kilometrien syvyistä. Sama raja erottaa myös lämpimän ja kylmän veden.',
      },
    ],
  },
  {
    tunnus: 'mayotte', nimi: 'Mayotte', seutu: 'Mosambikin kanaali', lat: -12.80, lon: 45.15,
    selite: 'Saari, jonka ympärillä on yhtenäinen valliriutta.',
    oletus: 'iss071e345427',
    kuvat: [
      {
        id: 'iss071e345427',
        teksti: 'Vanhan tulivuoren ympärille on kasvanut yhtenäinen valliriutta, ja saaren ja '
          + 'riutan väliin jää laguuni. Tulivuori painuu hitaasti mereen, riutta kasvaa ylöspäin '
          + 'samaa tahtia — kun saari lopulta katoaa, jäljelle jää pelkkä rengas eli atolli.',
      },
    ],
  },
  {
    tunnus: 'galapagos', nimi: 'Galápagossaaret', seutu: 'Ecuador, Tyynimeri', lat: -0.40, lon: -91.10,
    selite: 'Kuusi kilpitulivuorta merestä, jokaisella oma kraatteri.',
    oletus: 'STS099-753-032',
    kuvat: [
      {
        id: 'sts059-213-019',
        teksti: 'Isabela on syntynyt useasta tulivuoresta, jotka ovat kasvaneet yhteen. '
          + 'Keskellä näkyy kraatterin romahtanut lakikattila, ja rinteiltä laskeutuu tummia '
          + 'laavavirtoja rantaan asti. Vihreä vyö erottaa sateiset ylärinteet kuivasta rannikosta.',
      },
      {
        id: 'STS099-753-032',
        teksti: 'Saariryhmä ylhäältä: jokaisessa saaressa erottuu pyöreä lakikattila. '
          + 'Tulivuoret nousevat kuumasta pisteestä merenpohjassa, ja maalevyn liikkuessa itään '
          + 'vanhimmat saaret jäävät kauemmas ja sammuvat. Charles Darwin kävi täällä 1835.',
      },
    ],
  },
  {
    tunnus: 'onekotan', nimi: 'Onekotan', seutu: 'Kuriilit, Venäjä', lat: 49.45, lon: 154.75,
    selite: 'Kraatterijärvi, jonka keskellä kohoaa uusi tulivuorenkartio.',
    oletus: 'iss071e046421',
    kuvat: [
      {
        id: 'iss026e016287',
        teksti: 'Asumattoman saaren molemmissa päissä on lakikattila. Saari on lumen peitossa, '
          + 'ja pyöreät kattilat erottuvat varjojensa ansiosta: reunat ovat jyrkät, pohja tasainen. '
          + 'Kuriilien ketju erottaa Ohotanmeren Tyynestämerestä.',
      },
      {
        id: 'iss071e046421',
        teksti: 'Tao-Rusyrin kattilan pohjalla on rengasmainen järvi, ja sen keskellä nousee '
          + 'Krenitsynin huippu — tulivuori järven sisällä. Kattila syntyi, kun vanha huippu '
          + 'romahti tyhjentyneen magmasäiliön päälle; uusi kartio kasvoi romahduksen jälkeen.',
      },
    ],
  },
  {
    tunnus: 'mataiva', nimi: 'Mataivan atolli', seutu: 'Tuamotu, Ranskan Polynesia', lat: -14.88, lon: -148.68,
    selite: 'Atolli, jonka laguuni on jakautunut kymmeniksi altaiksi.',
    oletus: 'iss024e011914',
    kuvat: [
      {
        id: 'iss024e011914',
        teksti: 'Laguunin pohjassa kulkee matalien harjanteiden verkko, joka jakaa sen noin '
          + 'seitsemäänkymmeneen altaaseen. Harjanteet ovat vanhan riutan runkoa, joka jäi '
          + 'pystyyn laguunin syvetessä. Saaren nimi tarkoittaa paikallisella kielellä yhdeksää silmää.',
      },
    ],
  },
  {
    tunnus: 'seurasaaret', nimi: 'Seurasaaret', seutu: 'Ranskan Polynesia', lat: -16.50, lon: -151.75,
    selite: 'Vuorisaaria valliriuttojen sisällä, eri ikäisiä vierekkäin.',
    oletus: 'sts093-717-066',
    kuvat: [
      {
        id: 'sts093-717-066',
        teksti: 'Kolme saarta samassa kuvassa, kolme eri vaihetta samasta kehityksestä. '
          + 'Nuorimmassa vuori täyttää vielä riuttarenkaan, vanhemmassa vuoren ja riutan väliin on '
          + 'jäänyt leveä laguuni. Bora Bora on näistä pisimmälle kulunut.',
      },
    ],
  },
  {
    tunnus: 'al-wadj', nimi: 'Al Wadjin riuttamatalikko', seutu: 'Punainenmeri, Saudi-Arabia', lat: 25.30, lon: 36.70,
    selite: 'Aavikko loppuu rantaan, ja vedessä jatkuu koralliriutta.',
    oletus: 'iss016e019394',
    kuvat: [
      {
        id: 'iss016e019394',
        teksti: 'Hiekkasaarten ympärillä kiemurtelee turkoosi riuttamatalikko. Punainenmeri on '
          + 'kapea repeämä maankuoressa: Afrikka ja Arabia loittonevat toisistaan noin sentin '
          + 'vuodessa, ja riutat kasvavat repeämän reunoille.',
      },
    ],
  },
  {
    tunnus: 'ganges', nimi: 'Gangesin suisto', seutu: 'Bangladesh ja Intia', lat: 22.00, lon: 89.20,
    selite: 'Maailman laajin jokisuisto, jonka reunalla kasvaa mangrovemetsä.',
    oletus: 'sts066-92-013',
    kuvat: [
      {
        id: 'sts066-92-013',
        teksti: 'Ganges ja Brahmaputra tuovat Himalajalta niin paljon lietettä, että suisto '
          + 'kasvaa yhä merelle päin. Vaalea alue rannan edustalla on veteen sekoittunutta savea. '
          + 'Suiston haarat vaihtavat paikkaa tulvien mukana, ja niiden mukana vaihtuvat kylienkin paikat.',
      },
      {
        id: 'iss070e005997',
        teksti: 'Sundarbansin mangrovemetsä suiston merenpuoleisella reunalla. Tummat saarekkeet '
          + 'ovat metsää, vaaleat haarat vuorovesiuomia. Metsä kasvaa suolaisessa vedessä ja '
          + 'vaimentaa myrskyjen aallot ennen kuin ne osuvat viljelysmaahan.',
      },
    ],
  },
  {
    tunnus: 'mississippi-suisto', nimi: 'Mississippin suisto', seutu: 'Louisiana, Yhdysvallat', lat: 29.15, lon: -89.25,
    selite: 'Linnunjalka, jonka joki on työntänyt kauas merelle.',
    oletus: 'STS062-85-021',
    kuvat: [
      {
        id: 'STS062-85-021',
        teksti: 'Joki on rakentanut omista lietteistään kapeat sormet, jotka jatkuvat kauas '
          + 'merelle — muoto on saanut nimen linnunjalka. Vaalea usva veden päällä on suistosta '
          + 'purkautuvaa savea. Ilman patoja joki olisi jo vaihtanut uomaansa lännemmäs.',
      },
    ],
  },
  {
    tunnus: 'zeeland', nimi: 'Reinin suistosaaret', seutu: 'Zeeland, Alankomaat', lat: 51.60, lon: 4.00,
    selite: 'Suisto, jonka ihminen on rakentanut osittain uudelleen.',
    oletus: 'iss071e488058',
    kuvat: [
      {
        id: 'iss071e488058',
        teksti: 'Rein, Maas ja Schelde laskevat mereen samassa suistossa. Saarten väliset '
          + 'lahdet on suljettu padoilla vuoden 1953 tulvakatastrofin jälkeen; osa suluista '
          + 'aukeaa yhä vuoroveden mukana, jotta suolainen vesi pitää luonnon ennallaan.',
      },
    ],
  },
  {
    tunnus: 'niger-suisto', nimi: 'Nigerin sisämaan suisto', seutu: 'Mali', lat: 15.00, lon: -4.20,
    selite: 'Suisto keskellä mannerta: joki leviää eikä pääse mereen.',
    oletus: 'iss070e030773',
    kuvat: [
      {
        id: 'iss070e030773',
        teksti: 'Niger hajoaa Malissa satojen uomien ja kausijärvien verkoksi, vaikka meri on '
          + 'yhä tuhannen kilometrin päässä. Sadekaudella alue täyttyy vedellä ja ruokkii '
          + 'kalastajat ja karjan; kuivalla kaudella jäljelle jäävät vaaleat suolareunaiset altaat.',
      },
    ],
  },
  {
    tunnus: 'uyuni', nimi: 'Uyunin suolatasanko', seutu: 'Bolivia', lat: -19.90, lon: -67.60,
    selite: 'Maailman laajin suolatasanko ja sen reunalla sammunut tulivuori.',
    oletus: 'iss012e06456',
    kuvat: [
      {
        id: 'iss012e06456',
        teksti: 'Tumma Tunupan tulivuori työntyy valkoiselle suola-aavikolle. Tasanko on '
          + 'kuivuneen järven pohja: suolakuori on paikoin metrien paksuinen ja niin tasainen, '
          + 'että satelliitit käyttävät sitä korkeusmittariensa tarkistamiseen.',
      },
    ],
  },
  {
    tunnus: 'araljarvi', nimi: 'Araljärvi', seutu: 'Kazakstan ja Uzbekistan', lat: 45.00, lon: 59.50,
    selite: 'Järvi, joka kuivui, kun sen joet ohjattiin pelloille.',
    oletus: 'sts059-l22-140',
    kuvat: [
      {
        id: 'sts059-l22-140',
        teksti: 'Aral oli 1960-luvulla maailman neljänneksi suurin järvi. Kun sen kaksi jokea '
          + 'ohjattiin puuvillapelloille, vesi väheni vuosi vuodelta; tässä vuoden 1994 kuvassa '
          + 'jäljellä on enää osa entisestä, ja vaalea reunus on paljastunutta suolapohjaa.',
      },
    ],
  },
  {
    tunnus: 'baikal', nimi: 'Baikal jäässä', seutu: 'Siperia, Venäjä', lat: 53.50, lon: 108.00,
    selite: 'Maailman syvin järvi talvisen jään peitossa.',
    oletus: 'sts059-90-098',
    kuvat: [
      {
        id: 'sts059-90-098',
        teksti: 'Baikal on yli 1 600 metriä syvä ja sisältää noin viidenneksen maapallon '
          + 'jäätymättömästä makeasta vedestä. Talvella pinta jäätyy metrin paksuiseksi kanneksi, '
          + 'jonka yli on ennen kuljettu hevosilla ja jopa rautateitse.',
      },
    ],
  },
  {
    tunnus: 'suolajarvi-utah', nimi: 'Iso Suolajärvi', seutu: 'Utah, Yhdysvallat', lat: 41.20, lon: -112.50,
    selite: 'Yksi järvi, kaksi väriä — pengertie jakaa veden kahtia.',
    oletus: 'iss073e0865636',
    kuvat: [
      {
        id: 'iss073e0865636',
        teksti: 'Järven halki kulkeva rautatiepenger estää veden sekoittumisen, ja puoliskoista '
          + 'on tullut eri suolaisia. Suolaisemmassa puolessa viihtyvät punaista väriainetta '
          + 'tuottavat mikrobit, joten sama järvi näkyy toisaalta sinisenä ja toisaalta punaisena.',
      },
    ],
  },
  {
    tunnus: 'carnegie', nimi: 'Carnegiejärvi', seutu: 'Länsi-Australia', lat: -26.10, lon: 122.50,
    selite: 'Järvi, joka on useimmiten pelkkä kuiva suomutka.',
    oletus: 'iss071e615200',
    kuvat: [
      {
        id: 'iss071e615200',
        teksti: 'Carnegie täyttyy vedellä vain harvoina sadevuosina; muulloin se on mutaa, '
          + 'suolaa ja kasvillisuuslaikkuja. Vaaleat rannat ovat suolakuorta, ruskeat läikät '
          + 'matalaa vettä. Kuvio on pikemminkin soiden kuin järven muotoinen.',
      },
    ],
  },
  {
    tunnus: 'riftin-jarvet', nimi: 'Riftin järvet', seutu: 'Etiopia', lat: 7.60, lon: 38.75,
    selite: 'Järvijono repeämälaaksossa, jokaisella oma väri.',
    oletus: 'iss071e132461',
    kuvat: [
      {
        id: 'iss071e132461',
        teksti: 'Itä-Afrikan hautavajoama repeää auki, ja laakson pohjalle on jäänyt järviä. '
          + 'Tummansininen on syvä ja kirkas, ruskea matala ja lietteinen; väriero kertoo '
          + 'syvyydestä ja siitä, mitä jokia kuhunkin laskee.',
      },
    ],
  },
  {
    tunnus: 'kanadan-palot', nimi: 'Kanadan metsäpalot', seutu: 'Manitoba ja Saskatchewan, Kanada', lat: 55.00, lon: -101.00,
    selite: 'Rinnakkaisia savuvanoja, jokainen omasta palosta.',
    oletus: 'iss073e0420617',
    kuvat: [
      {
        id: 'iss073e0420617',
        teksti: 'Havumetsävyöhykkeellä palaa kymmenkunta erillistä paloa yhtä aikaa, ja tuuli '
          + 'venyttää jokaisen savun samansuuntaiseksi vanaksi. Savu nousee niin korkealle, että '
          + 'se kulkeutuu mantereen yli asti ja sumentaa taivaan tuhansien kilometrien päässä.',
      },
    ],
  },
  {
    tunnus: 'mount-hood', nimi: 'Mount Hood', seutu: 'Oregon, Yhdysvallat', lat: 45.37, lon: -121.70,
    selite: 'Lumihuippu ja sen vieressä palava metsä.',
    oletus: 'iss075e0001471',
    kuvat: [
      {
        id: 'iss075e0001471',
        teksti: 'Vasemmalla kohoaa Mount Hood, jäätiköiden peittämä tulivuori; oikealla '
          + 'Grasshopper-palo työntää paksua savua itään. Kesän kuivuus ja vuoriston tuulet '
          + 'tekevät samasta rinteestä vuorotellen jäätikkömaisemaa ja paloaluetta.',
      },
    ],
  },
  {
    tunnus: 'nasser', nimi: 'Nasser-järvi', seutu: 'Egypti', lat: 22.80, lon: 31.80,
    selite: 'Tekojärvi, joka täytti Niilin laakson sivuhaarat.',
    oletus: 'iss073e0879542',
    kuvat: [
      {
        id: 'iss058e010623',
        teksti: 'Järven länsipuolella aavikkoon on merkitty tummia kasteluruutuja: vesi '
          + 'pumpataan järvestä pelloille. Ilman pumppuja ero on jyrkkä — viljelys loppuu siihen, '
          + 'mihin putki yltää.',
      },
      {
        id: 'iss073e0879542',
        teksti: 'Assuanin padon taakse noussut vesi täytti Niilin laakson sivukuivat uomat, ja '
          + 'rannasta tuli puumainen haarasto. Pato sitoo tulvat ja lietteen; alajuoksulla pellot '
          + 'saavat nyt vetensä säännöstellysti mutta jäävät ilman entistä lannoittavaa mutaa.',
      },
    ],
  },
  {
    tunnus: 'kasteluympyrat', nimi: 'Kasteluympyrät', seutu: 'Saudi-Arabia', lat: 30.60, lon: 38.20,
    selite: 'Aavikolle piirretyt ympyrät, joista jokainen on pelto.',
    oletus: 'sts083-747-033',
    kuvat: [
      {
        id: 'sts083-747-033',
        teksti: 'Jokainen tumma ympyrä on pelto, jota kastelee keskipisteen ympäri kiertävä '
          + 'putkivarsi. Vesi nousee syvältä pohjavesikerroksesta, joka täyttyi viimeisen '
          + 'jääkauden sateista — sitä kuluu nopeammin kuin se uusiutuu.',
      },
    ],
  },
  {
    tunnus: 'khufrah', nimi: 'Al Khufrahin keidas', seutu: 'Libya', lat: 24.18, lon: 23.29,
    selite: 'Sahara ja sen keskellä täydellisiä ympyröitä.',
    oletus: 'iss010e05266',
    kuvat: [
      {
        id: 'iss010e05266',
        teksti: 'Vanhan keitaan viereen on pumpattu pohjavedellä satoja pyöreitä peltoja. '
          + 'Vaalea hiekka ympärillä on täysin kuivaa, eikä sadetta juuri tule: ympyrät '
          + 'pysyvät vihreinä vain niin kauan kuin pumput käyvät.',
      },
    ],
  },
  {
    tunnus: 'lake-powell', nimi: 'Powell-järvi', seutu: 'Utah ja Arizona, Yhdysvallat', lat: 37.30, lon: -110.85,
    selite: 'Tekojärvi, joka seuraa vanhan kanjonin mutkia.',
    oletus: 'STS100-716-176',
    kuvat: [
      {
        id: 'STS100-716-176',
        teksti: 'Colorado on uurtanut itsensä syvälle tasangon sisään, ja pato on täyttänyt '
          + 'uoman vedellä. Järvi ei siksi ole leveä allas vaan kapea, haarautuva kiemura — se '
          + 'noudattaa tarkasti sitä muotoa, jonka joki ehti kaivertaa.',
      },
      {
        id: 'iss031e006398',
        teksti: 'Kuvan keskellä on Rincon: umpeen kuroutunut joenmutka, jonka joki hylkäsi ja '
          + 'jätti kuivaksi renkaaksi kallion päälle. Samanlaisia mutkia näkyy ympärillä yhä '
          + 'vedellä täytettyinä.',
      },
    ],
  },
  {
    tunnus: 'issaouane', nimi: 'Issaouanen hiekkameri', seutu: 'Algeria', lat: 26.50, lon: 8.50,
    selite: 'Dyynikenttä, jossa on kahden eri tuulen jälki.',
    oletus: 'iss013e65526',
    kuvat: [
      {
        id: 'iss013e65526',
        teksti: 'Isojen dyyniharjanteiden päälle on kasvanut pienempiä, eri suuntaan kulkevia '
          + 'kaarteita. Ne kertovat kahdesta tuulesta: vallitseva tuuli rakentaa suuret muodot '
          + 'hitaasti, kausituuli muokkaa pintaa nopeasti.',
      },
    ],
  },
  {
    tunnus: 'white-sands', nimi: 'White Sands', seutu: 'New Mexico, Yhdysvallat', lat: 32.85, lon: -106.30,
    selite: 'Lumivalkoiset dyynit, jotka eivät ole hiekkaa vaan kipsiä.',
    oletus: 'sts060-83-016',
    kuvat: [
      {
        id: 'sts060-83-016',
        teksti: 'Dyynien aines on kipsiä, joka liukenee vedessä eikä siksi yleensä säily '
          + 'hiekkana. Täällä se voi: laakso on umpinainen, vesi ei pääse pois vaan haihtuu, ja '
          + 'jäljelle jäävät kiteet tuuli kasaa valkoisiksi kummuiksi.',
      },
    ],
  },
  {
    tunnus: 'merijaa', nimi: 'Merijää Newfoundlandin edustalla', seutu: 'Pohjois-Atlantti, Kanada', lat: 49.50, lon: -53.00,
    selite: 'Jäälauttoja, jotka merivirta on kiertänyt pyörteiksi.',
    oletus: 'iss071e046021',
    kuvat: [
      {
        id: 'iss071e046021',
        teksti: 'Labradorinvirta tuo pohjoisesta talven aikana syntynyttä jäätä, ja virtauksen '
          + 'pyörteet piirtävät siitä valkoisia kiertoja tummaan veteen. Sama virta kuljettaa '
          + 'tänne myös Grönlannista irronneita jäävuoria.',
      },
    ],
  },
  {
    tunnus: 'suez', nimi: 'Suezin kanava', seutu: 'Egypti', lat: 30.40, lon: 32.35,
    selite: 'Suora viiva aavikon halki kahden meren välillä.',
    oletus: 'iss070e034694',
    kuvat: [
      {
        id: 'iss013e44847',
        teksti: 'Kanavan pohjoinen suu Port Saidissa. Väylät jatkuvat merelle aallonmurtajien '
          + 'välissä, ja odottavat laivat näkyvät pieninä tummina viivoina. Kanava avattiin '
          + 'vuonna 1869 — neljä vuotta ennen isoisän matkaa.',
      },
      {
        id: 'iss070e034694',
        teksti: 'Kanavan eteläpää laskee Suezinlahteen. Vesi kulkee ilman sulkuja, koska '
          + 'Välimeri ja Punainenmeri ovat suunnilleen samalla korkeudella; kanavan varren '
          + 'vihreä nauha on sen tuomaa kastelua keskellä aavikkoa.',
      },
    ],
  },
  {
    tunnus: 'tiran', nimi: 'Tiranin salmi', seutu: 'Punainenmeri', lat: 27.95, lon: 34.55,
    selite: 'Kapea, riuttojen ahtama portti Akabanlahdelle.',
    oletus: 'iss036e010628',
    kuvat: [
      {
        id: 'iss036e010628',
        teksti: 'Saarten ja riuttojen väliin jää vain muutaman sadan metrin levyinen syvä väylä. '
          + 'Vaaleat alueet ovat matalaa riuttaa, jonka yli laiva ei kulje. Salmi on ainoa reitti '
          + 'Akabanlahden satamiin, mikä on tehnyt siitä toistuvan kiistakohteen.',
      },
    ],
  },
  {
    tunnus: 'tunis', nimi: 'Tunis yöllä', seutu: 'Tunisia', lat: 36.80, lon: 10.18,
    selite: 'Kaupungin valot piirtävät lahden ja laguunin muodon.',
    oletus: 'iss073e0078538',
    kuvat: [
      {
        id: 'iss073e0078538',
        teksti: 'Mustat aukot valojen keskellä ovat vettä: matala laguuni kaupungin ja meren '
          + 'välissä sekä suolajärvi lounaassa. Oranssit alueet ovat vanhempaa natriumvaloa, '
          + 'valkoiset uudempaa led-valoa — kaupungin ikä näkyy värissä.',
      },
    ],
  },
  {
    tunnus: 'kairo-yolla', nimi: 'Kairo yöllä', seutu: 'Egypti', lat: 30.05, lon: 31.25,
    selite: 'Niili halkaisee valomeren ja jatkuu suistoon.',
    oletus: 'iss074e0043697',
    kuvat: [
      {
        id: 'iss074e0043697',
        teksti: 'Joki näkyy mustana nauhana keskellä kaupunkia, ja pohjoisessa valot haarautuvat '
          + 'suiston suuntaan. Aavikko jää ympärillä täysin pimeäksi: lähes koko Egyptin väestö '
          + 'asuu tällä kapealla, kastellulla kaistalla.',
      },
    ],
  },
  {
    tunnus: 'bingham', nimi: 'Binghamin avolouhos', seutu: 'Utah, Yhdysvallat', lat: 40.52, lon: -112.15,
    selite: 'Ihmisen kaivama kuoppa, joka näkyy avaruuteen asti.',
    oletus: 'iss015e29867',
    kuvat: [
      {
        id: 'iss015e29867',
        teksti: 'Kuparikaivos on louhittu vuoren sisään terassi kerrallaan; kierteinen kuvio on '
          + 'ajoteitä, joita pitkin kuorma-autot nousevat pohjalta. Kuoppa on lähes neljä '
          + 'kilometriä leveä ja yli kilometrin syvä.',
      },
    ],
  },
  {
    tunnus: 'faiyum', nimi: 'Faiyumin keidas', seutu: 'Egypti', lat: 29.45, lon: 30.60,
    selite: 'Vihreä lehti aavikossa, kiinni Niilissä kuin varressa.',
    oletus: 'iss061e004613',
    kuvat: [
      {
        id: 'iss061e004613',
        teksti: 'Painanne aavikossa täyttyy Niilistä johdetusta vedestä, ja sen ympärille on '
          + 'kasvanut viljelysalue. Kanava on kaivettu jo faaraoiden aikana; altaan pohjalla '
          + 'oleva Qarun-järvi on suolainen, koska vesi haihtuu eikä pääse pois.',
      },
    ],
  },
  {
    tunnus: 'ulawun', nimi: 'Ulawun', seutu: 'Uusi-Britannia, Papua-Uusi-Guinea', lat: -5.05, lon: 151.33,
    selite: 'Tuhkapatsas, jonka tuuli taittaa merelle.',
    oletus: 'iss034e005496',
    kuvat: [
      {
        id: 'iss034e005496',
        teksti: 'Purkaus nousee saaren korkeimmalta huipulta, ja tuuli kääntää tuhkan '
          + 'harmaaksi vanaksi merelle. Ulawun on yksi Tyynenmeren tulirenkaan aktiivisimmista '
          + 'tulivuorista, ja sen juurella asuu tuhansia ihmisiä.',
      },
    ],
  },
  {
    tunnus: 'jaavuori', nimi: 'Pöytäjäävuori', seutu: 'Eteläinen Atlantti', lat: -55.00, lon: -40.00,
    selite: 'Litteä jäälautta, joka on irronnut mannerjäätiköstä.',
    oletus: 'sts048-73-000q',
    kuvat: [
      {
        id: 'sts048-73-000q',
        teksti: 'Etelämantereen jäähyllystä irronnut jäävuori on tasakantinen, koska se on '
          + 'lohjennut kelluvan jäälautan reunasta. Yhdeksän kymmenesosaa jäästä on pinnan alla. '
          + 'Merivirrat kuljettavat tällaisia lauttoja vuosia pohjoiseen, kunnes ne sulavat.',
      },
    ],
  },
  {
    tunnus: 'heard', nimi: 'Heardin saari', seutu: 'Eteläinen Intian valtameri', lat: -53.10, lon: 73.51,
    selite: 'Jäätikköinen tulivuori keskellä myrskyisää merta.',
    oletus: 'iss018e038182',
    kuvat: [
      {
        id: 'iss018e038182',
        teksti: 'Mawsonin huippu on jäätiköiden peittämä toimiva tulivuori: jäävirrat laskevat '
          + 'sen rinteiltä suoraan mereen. Saarella ei ole pysyvää asutusta, ja sinne pääsee vain '
          + 'laivalla tuhansien kilometrien päästä.',
      },
    ],
  },
  /*
   * ERÄ 1: PELIN KAUPUNGIT (Sisältökirjuri 26.9.2026, omistajan tilaus,
   * Fablen välitys). 23 kaupunkia pelilaudan PALLON_KAUPUNKIPISTEET-
   * listasta, jotka eivät olleet vielä mukana. Kaksi Pulu-kysymystä per
   * kohde: tools/astronaut/qa-era1.json. Amsterdam, Berliini, Tukholma,
   * Kööpenhamina, Praha, Toronto, Lagos, Hanoi ja Manila jätetty pois —
   * millekään ei löytynyt kelvollista ISS-käsikamerakuvaa (vain
   * avaruussukkulakuvia, moni-kaupunki-yleiskuvia joissa kaupunki ei
   * erotu, tai ei osumia lainkaan).
   */
  {
    tunnus: 'pariisi', nimi: 'Pariisi', seutu: 'Ranska', lat: 48.857, lon: 2.352,
    selite: 'Ranskan pääkaupunki, jonka säteittäiset bulevardit erottuvat selvästi yöllä avaruudesta.',
    oletus: 'iss072e789833',
    kuvat: [
      {
        id: 'iss072e789833',
        teksti: 'Pariisi yöllisessä valaistuksessa avaruusasemalta kuvattuna. Eiffel-tornin ja '
          + 'Champs de Marsin kohdalla erottuu kirkas valopilkku kuvan keskellä, ja kaupungin '
          + 'säteittäiset bulevardit haarautuvat siitä joka suuntaan. Seine-joki näkyy tummana, '
          + 'valottomana nauhana kaupungin halki.',
      },
    ],
  },
  {
    tunnus: 'lontoo', nimi: 'Lontoo', seutu: 'Englanti, Yhdistynyt kuningaskunta', lat: 51.507, lon: -0.128,
    selite: 'Yhdistyneen kuningaskunnan pääkaupunki, jonka halki mutkitteleva Thames erottaa sen kahtia myös yöllä.',
    oletus: 'iss074e0405029',
    kuvat: [
      {
        id: 'iss074e0405029',
        teksti: 'Lontoo yöllä avaruusasemalta kuvattuna. Thames-joki mutkittelee kirkkaana '
          + 'valonauhojen välissä kaupungin keskellä ja jakaa sen kahtia. Kuvan alareunassa erottuu '
          + 'Heathrowin lentokentän kiitoratavalaistus ja oikeassa reunassa Gatwickin lentokenttä.',
      },
    ],
  },
  {
    tunnus: 'rooma', nimi: 'Rooma', seutu: 'Italia', lat: 41.893, lon: 12.483,
    selite: 'Italian pääkaupunki ja antiikin valtakunnan sydän, asutettuna yhtäjaksoisesti tuhansia vuosia.',
    oletus: 'iss073e0343840',
    kuvat: [
      {
        id: 'iss073e0343840',
        teksti: 'Rooma yöllä, avaruusasemalta kuvattuna. Kaupungin tiivis, sokkeloinen valokudos '
          + 'erottuu selvästi ympäröivästä maaseudusta, ja kuvan vasemmassa reunassa näkyy '
          + 'Tyrrhenanmeren pimeä rantaviiva.',
      },
    ],
  },
  {
    tunnus: 'venetsia', nimi: 'Venetsia', seutu: 'Italia', lat: 45.44, lon: 12.332,
    selite: 'Italian kanavakaupunki, rakennettu sadan sokkeloisen saaren päälle laguunin keskelle.',
    oletus: 'iss014e17346',
    kuvat: [
      {
        id: 'iss014e17346',
        teksti: 'Venetsia päivänvalossa avaruusasemalta kuvattuna. Kaupungin tunnusomainen '
          + 'kalanmuotoinen saari erottuu selvästi laguunin vihertävästä vedestä, ja Canal Granden '
          + 'S-mutka halkoo sitä keskeltä. Kuvan yläosassa näkyy Muranon saari, ja vasemmassa '
          + 'reunassa rautatiesilta, joka yhdistää Venetsian Italian mantereeseen.',
      },
    ],
  },
  {
    tunnus: 'moskova', nimi: 'Moskova', seutu: 'Venäjä', lat: 55.751, lon: 37.617,
    selite: 'Venäjän pääkaupunki, jonka säteittäis-rengasmainen katuverkko erottuu selvästi avaruudesta.',
    oletus: 'iss064e024687',
    kuvat: [
      {
        id: 'iss064e024687',
        teksti: 'Moskova yöllä avaruusasemalta kuvattuna. Kaupungin säteittäis-rengasmainen '
          + 'katuverkko erottuu kirkkaana valokuviona, ja tiiviisti valaistu keskusta hehkuu selvästi '
          + 'ympäröivää, harvemmin valaistua esikaupunkialuetta vasten. Moskova-joki virtaa '
          + 'keskustan halki tummana, valottomana raitana.',
      },
    ],
  },
  {
    tunnus: 'peking', nimi: 'Peking', seutu: 'Kiina', lat: 39.904, lon: 116.408,
    selite: 'Kiinan pääkaupunki ja Kielletyn kaupungin kotipaikka, ainoa isännöinyt kesä- ja talviolympialaiset.',
    oletus: 'iss072e444944',
    kuvat: [
      {
        id: 'iss072e444944',
        teksti: 'Peking yöllä avaruusasemalta kuvattuna. Kaupungin keskusta erottuu ruudukkomaisena, '
          + 'oranssinsävyisenä valomerenä, jota ympäröivät konsentriset kehätiet. Kuvan keskellä '
          + 'erottuu Kielletyn kaupungin kirkkaasti valaistu Meridiaaniportti, ja oikeassa yläkulmassa '
          + 'näkyvät lentokentän valaistut kiitoradat.',
      },
    ],
  },
  {
    tunnus: 'hongkong', nimi: 'Hongkong', seutu: 'Kiina (erityishallintoalue)', lat: 22.278, lon: 114.159,
    selite: 'Kiinan erityishallintoalue, jonka valot erottuvat selvästi naapurikaupunki Shenzhenin valoista.',
    oletus: 'iss072e399613',
    kuvat: [
      {
        id: 'iss072e399613',
        teksti: 'Hongkong ja naapurikaupunki Shenzhen yöllä avaruusasemalta kuvattuna. Kuvan '
          + 'alaosan Hongkongin rannikko erottuu lämpimän kellertävänä valona, kun taas yläosan '
          + 'Shenzhen hohtaa sinertävänä — ero johtuu kaupunkien erilaisesta valaistushistoriasta '
          + 'ja -tekniikasta rajan molemmin puolin.',
      },
    ],
  },
  {
    tunnus: 'singapore', nimi: 'Singapore', seutu: 'Singapore', lat: 1.3, lon: 103.8,
    selite: 'Kaupunkivaltio Malesian kärjessä, jonka lentokenttä ja konttisatama näkyvät selvästi yöllä.',
    oletus: 'iss073e0763866',
    kuvat: [
      {
        id: 'iss073e0763866',
        teksti: 'Singapore erottuu kuvan keskellä, erotettuna Malesian Johor Bahrusta vasemmalla '
          + 'Johorin salmella. Oikealla keskellä siintää Changin lentokenttä, ja kuvan alaosan '
          + 'kirkas suorakulmainen alue on Pasir Panjangin konttisatama, suunniteltu maailman '
          + 'suurimmille konttialuksille. Kuva otettu yöllä ISS:ltä.',
      },
    ],
  },
  {
    tunnus: 'sydney', nimi: 'Sydney', seutu: 'Australia', lat: -33.868, lon: 151.21,
    selite: 'Australian suurin kaupunki, jonka lentokenttä ja satama-alueet reunustavat Botany Baytä.',
    oletus: 'iss055e073720',
    kuvat: [
      {
        id: 'iss055e073720',
        teksti: 'Kuvassa näkyy Sydneyn lentokenttä kahdella kiitoradallaan Botany Bayn rannalla. '
          + 'Lentokentän ympärillä erottuvat sataman konttiterminaalit ja tiheä ruudukkomainen '
          + 'kaupunkirakenne, joka jatkuu rannikkoa pitkin koilliseen. Kuva otettu päivänvalossa ISS:ltä.',
      },
    ],
  },
  {
    tunnus: 'rio', nimi: 'Rio de Janeiro', seutu: 'Brasilia', lat: -22.911, lon: -43.206,
    selite: 'Brasilian rantakaupunki Guanabaran lahden rannalla, yhdistettynä Niteróihin pitkällä sillalla.',
    oletus: 'iss070e108427',
    kuvat: [
      {
        id: 'iss070e108427',
        teksti: 'Kuvan keskellä avautuu Guanabaran lahti, jonka länsirannalla on Rio de Janeiro ja '
          + 'itärannalla Niterói. Lahden poikki kulkee noin 13 kilometrin pituinen Rio-Niterói-silta, '
          + 'joka yhdistää kaupungit. Kuva otettu päivänvalossa ISS:ltä Atlantin rannikon yllä.',
      },
    ],
  },
  {
    tunnus: 'saopaulo', nimi: 'São Paulo', seutu: 'Brasilia', lat: -23.55, lon: -46.634,
    selite: 'Etelä-Amerikan suurin kaupunki ja Brasilian talouden veturi, levittäytynyt laajana valomerenä.',
    oletus: 'iss073e0982063',
    kuvat: [
      {
        id: 'iss073e0982063',
        teksti: 'São Paulo levittäytyy kuvassa laajana valomerenä yöllä otetussa kuvassa. Kaupungin '
          + 'valot ovat siirtyneet energiatehokkaisiin valkoisiin LED-lamppuihin, jotka näkyvät '
          + 'kuvassa vanhoja oransseja natriumlamppuja kirkkaampina. São Paulon metropolialueella '
          + 'asuu noin 22 miljoonaa ihmistä.',
      },
    ],
  },
  {
    tunnus: 'losangeles', nimi: 'Los Angeles', seutu: 'Yhdysvallat', lat: 34.05, lon: -118.25,
    selite: 'Yhdysvaltain Tyynenmeren rannikon suurkaupunki, jonka satama on maan vilkkain konttisatama.',
    oletus: 'iss073e0513936',
    kuvat: [
      {
        id: 'iss073e0513936',
        teksti: 'Kuvassa erottuu Los Angelesin rannikkoa ja tiheää ruudukkomaista kaupunkirakennetta '
          + 'aina Long Beachin satama-alueelle ja Terminal Islandille asti oikeassa alakulmassa. '
          + 'Vasemmalla rannikolla näkyy myös lentokenttä- ja satamarakenteita. Kuva otettu '
          + 'päivänvalossa ISS:ltä.',
      },
    ],
  },
  {
    tunnus: 'sanfrancisco', nimi: 'San Francisco', seutu: 'Yhdysvallat', lat: 37.779, lon: -122.419,
    selite: 'Kalifornian lahtikaupunki, joka tunnetaan Golden Gate -sillasta ja lähellä syntyneestä Piilaaksosta.',
    oletus: 'iss073e0285002',
    kuvat: [
      {
        id: 'iss073e0285002',
        teksti: 'Kuvassa San Franciscon lahti erottuu pimeänä alueena, jonka ympärillä valot '
          + 'piirtävät kaupungin ja sen esikaupunkien, kuten San Josen ja Oaklandin, ääriviivat '
          + 'näkyviin. Lahden yli kulkevat siltayhteydet erottuvat valojuovina veden yllä. Kuva '
          + 'otettu keskiyön aikaan ISS:ltä.',
      },
    ],
  },
  {
    tunnus: 'chicago', nimi: 'Chicago', seutu: 'Yhdysvallat', lat: 41.882, lon: -87.628,
    selite: 'Yhdysvaltain Keskilännen suurkaupunki Michiganjärven rannalla, pilvenpiirtäjien syntypaikka.',
    oletus: 'iss073e0080182',
    kuvat: [
      {
        id: 'iss073e0080182',
        teksti: 'Chicago erottuu kuvassa kirkkaana valoruudukkona Michiganjärven eteläkärjessä, ja '
          + 'järven pimeä pinta rajaa kaupungin selvästi idässä. Kaupungin ydin pistää esiin '
          + 'ympäröivästä esikaupunkialueesta kirkkaimpana valopilkkuna. Kuva otettu yöllä ISS:ltä.',
      },
    ],
  },
  {
    tunnus: 'mexico', nimi: 'Mexico City', seutu: 'Meksiko', lat: 19.411, lon: -99.131,
    selite: 'Meksikon pääkaupunki entisen järven pohjalla korkealla vuoristolaaksossa, joka vaipuu vuosi vuodelta.',
    oletus: 'iss073e0075943',
    kuvat: [
      {
        id: 'iss073e0075943',
        teksti: 'Mexico City loistaa yöllä kirkkaana Meksikon laakson pohjalla. Kaupungin valot '
          + 'täyttävät koko altaan, ja niitä reunustavat tummat, valottomat alueet: Texcocon ja '
          + 'Tláhuac-Xicon luonnonsuojelualueet sekä Ajuscon kansallispuiston vuoret. Kuva otettiin '
          + 'Kansainväliseltä avaruusasemalta.',
      },
    ],
  },
  {
    tunnus: 'kapkaupunki', nimi: 'Kapkaupunki', seutu: 'Etelä-Afrikka', lat: -33.925, lon: 18.425,
    selite: 'Etelä-Afrikan lainsäädäntöpääkaupunki mantereen lounaiskärjessä, Kapniemen vuorten juurella.',
    oletus: 'iss064e038871',
    kuvat: [
      {
        id: 'iss064e038871',
        teksti: 'Kapkaupunki ja sen ympäröivä rannikko näkyvät päivänvalossa Etelä-Afrikan '
          + 'kärjessä, auringon kimmellyksen loistaessa Atlantin pinnalla. Kaupungin katuverkko '
          + 'erottuu vaaleana, tiiviisti rakennettuna alueena rannikon tuntumassa.',
      },
    ],
  },
  {
    tunnus: 'mumbai', nimi: 'Mumbai', seutu: 'Intia', lat: 18.975, lon: 72.826,
    selite: 'Intian talouselämän keskus, rakennettu alun perin seitsemälle erilliselle saarelle Arabianmeren rannalla.',
    oletus: 'iss014e08744',
    kuvat: [
      {
        id: 'iss014e08744',
        teksti: 'Mumbain satama ja kaupunkialue täyttävät kapean Salsette-niemekkeen Arabianmeren '
          + 'rannalla. Rakennettu alue jatkuu yhtenäisenä noin 50 kilometrin matkan pohjoisesta '
          + 'etelään, ja kuvassa erottuvat myös rannikon pienet niemet ja lahdet.',
      },
    ],
  },
  {
    tunnus: 'delhi', nimi: 'Delhi', seutu: 'Intia', lat: 28.61, lon: 77.23,
    selite: 'Intian pääkaupunkialue, maailman toiseksi suurin metropolialue Himalajan eteläpuolella.',
    oletus: 'iss072e757452',
    kuvat: [
      {
        id: 'iss072e757452',
        teksti: 'Delhin valot loistavat kirkkaina lähellä puolta yötä paikallista aikaa, Himalajan '
          + 'reunan tuntumassa. Kaupungin tiivis valoverkko peittää laajan alueen tasaisella '
          + 'tasangolla, ja valojen tiheys vaihtelee vanhan ja uuden kaupunginosan välillä.',
      },
    ],
  },
  {
    tunnus: 'bangkok', nimi: 'Bangkok', seutu: 'Thaimaa', lat: 13.75, lon: 100.517,
    selite: 'Thaimaan pääkaupunki, jonka Chao Phraya -joki jakaa kahtia matkalla Siaminlahteen.',
    oletus: 'iss072e757257',
    kuvat: [
      {
        id: 'iss072e757257',
        teksti: 'Bangkok jakautuu selvästi kahtia Chao Phraya -joen ympärille, joka erottuu kuvassa '
          + 'mustana nauhana kaupungin valojen keskellä. Kuvan keskioikealla erottuu tumma, '
          + 'vähemmän valaistu Bang Krachaon viheralue joen mutkassa.',
      },
    ],
  },
  {
    tunnus: 'jakarta', nimi: 'Jakarta', seutu: 'Indonesia', lat: -6.21, lon: 106.845,
    selite: 'Indonesian pääkaupunki, joka vajoaa nopeasti ja jota siksi korvaamaan rakennetaan uutta pääkaupunkia.',
    oletus: 'iss030e015896',
    kuvat: [
      {
        id: 'iss030e015896',
        teksti: 'Kuva on otettu infrapunakameralla, joten Jakartan kaupunkialue hohtaa '
          + 'oranssinpunaisena rannikolla. Tiivis, verkkomainen kaupunkirakenne erottuu selvästi '
          + 'ympäröivästä pimeästä merestä ja harvaan asutusta maaseudusta.',
      },
    ],
  },
  {
    tunnus: 'shanghai', nimi: 'Shanghai', seutu: 'Kiina', lat: 31.224, lon: 121.476,
    selite: 'Kiinan väkirikkain kaupunki Jangtse-joen suulla, jonka rannikko värjäytyy joen liejusta.',
    oletus: 'iss073e0513927',
    kuvat: [
      {
        id: 'iss073e0513927',
        teksti: 'Kuva näyttää Shanghain kaupunkialueen päiväsaikaan Jangtse-joen suulla Itä-Kiinan '
          + 'meren rannalla. Ylälaidassa erottuu Pudongin kansainvälisen lentokentän kiitoradat, ja '
          + 'kuvan oikealla puolella näkyy pyöreä Dishui-järvi, Kiinan suurin tekoallas. Mereen '
          + 'laskeva sedimenttipitoinen vesi näkyy vaaleanruskeana rannikon tuntumassa.',
      },
    ],
  },
  {
    tunnus: 'wien', nimi: 'Wien', seutu: 'Itävalta', lat: 48.208, lon: 16.373,
    selite: 'Itävallan pääkaupunki Tonavan rannalla, jonka tiivis keskusta erottuu selvästi yöllä avaruudesta.',
    oletus: 'iss064e005231',
    kuvat: [
      {
        id: 'iss064e005231',
        teksti: 'Kuva näyttää Wienin yöllä avaruusasemalta kuvattuna, katuvalot piirtävät kaupungin '
          + 'tiheän verkkomaisen rakenteen selvästi näkyviin. Tonava-joki erottuu kuvan keskellä '
          + 'pimeänä, valottomana nauhana, joka halkoo valaistua kaupunkialuetta.',
      },
    ],
  },
  {
    tunnus: 'soul', nimi: 'Soul', seutu: 'Etelä-Korea', lat: 37.567, lon: 126.978,
    selite: 'Etelä-Korean pääkaupunki, jonka Han-joki jakaa kaupungin kahtia niemimaan keskiosassa.',
    oletus: 'iss072e757318',
    kuvat: [
      {
        id: 'iss072e757318',
        teksti: 'Kuva näyttää Soulin yöllä, kaupungin tiheä valoverkko peittää laajan alueen '
          + 'Korean niemimaan keskiosassa. Han-joki kulkee kuvan poikki pimeänä nauhana ja jakaa '
          + 'kaupungin selvästi kahteen osaan. Kuva paljastaa myös kaupungin ympärille leviävän '
          + 'esikaupunkialueen tiiviin tieverkoston.',
      },
    ],
  },
  /*
   * ERÄ 2 (26.9.2026): isoisän reitin maisemat, luonnonkohteet ja
   * sama paikka eri vuosina -parit. Kuvat katsottu ja arvioitu käsin.
   */
  {
    tunnus: 'kilimanjaro', nimi: 'Kilimanjaro', seutu: 'Tansania', lat: -3.07, lon: 37.35,
    selite: 'Afrikan korkein vuori, jonka huipun jää on kutistunut 85 prosenttia sadan vuoden aikana.',
    oletus: 'iss014e18950',
    kuvat: [
      {
        id: 'iss014e18950',
        teksti: 'Kraatterin reuna suoraan ylhäältä kuvattuna. Lumi ja jää peittävät enää osan Kibon '
          + 'huipusta, ja tumma kivikko pilkistää esiin rengasmaisen jäätikön keskeltä. Vuoren jää oli '
          + 'vuonna 1912 vielä 11,4 neliökilometrin kokoinen korkki; tässä kuvassa siitä on jäljellä hajanaisia läiskiä.',
      },
      {
        id: 'iss056e098062',
        teksti: 'Sama vuori yksitoista vuotta myöhemmin, pilvirenkaan ympäröimänä kuin silmä. '
          + 'Lumihuippu erottuu tumman rinteen keskeltä pienenä valkoisena kolmiona. Kenian raja jää '
          + 'kuvan taakse pohjoiseen, ja Kilimanjaro nousee tasangosta ilman yhtäkään vieressään kilpailevaa huippua.',
      },
    ],
  },
  {
    tunnus: 'victorianputous', nimi: 'Victorianputous', seutu: 'Sambia ja Zimbabwe', lat: -17.92, lon: 25.86,
    selite: 'Maailman suurin yhtenäinen putoavan veden verho, 1708 metriä leveä.',
    oletus: 'iss007e14361',
    kuvat: [
      {
        id: 'iss007e14361',
        teksti: 'Putous näkyy ohuena valkoisena raitana Zambezi-joen poikki, ja sen alapuolella joki '
          + 'jatkaa matkaansa terävinä sik-sakkeina — samoja basalttirotkoja, jotka putous on kaivertanut '
          + 'itselleen perääntyessään vuosituhansien varrella. Victoria Falls -kaupunki näkyy oikealla partaalla.',
      },
    ],
  },
  {
    tunnus: 'iso-valliriutta', nimi: 'Iso valliriutta', seutu: 'Queensland, Australia', lat: -16.5, lon: 145.7,
    selite: 'Maailman suurin koralliriuttajärjestelmä, yli 2300 kilometrin matkalla.',
    oletus: 'iss068e004262',
    kuvat: [
      {
        id: 'iss068e004262',
        teksti: 'Queenslandin rannikko oikealla, ja sen edustalla riuttojen laikukas turkoosi vyöhyke '
          + 'jatkuu kuvan reunalle asti. Jokainen vaaleampi laikku on oma matala riuttansa, jonka ympärillä '
          + 'syvempi vesi tummuu siniseksi — tässä kuvassa näkyy vain murto-osa yli 2900 erillisestä riutasta.',
      },
    ],
  },
  {
    tunnus: 'kata-tjuta', nimi: 'Kata Tjuta', seutu: 'Pohjoisterritorio, Australia', lat: -25.31, lon: 130.74,
    selite: 'Kolmisenkymmentä punaista kivikupolia aution tasangon keskellä, Uluru-Kata Tjuta -kansallispuistossa.',
    oletus: 'iss023e029806',
    kuvat: [
      {
        id: 'iss023e029806',
        teksti: 'Iltapäivän valo korostaa Kata Tjutan pyöristyneitä kivikupoleja, joiden väliin varjot '
          + 'piirtävät syviä rakoja. Korkein kupoli, Mount Olga, on 206 metriä naapuriaan Ulurua korkeampi, '
          + 'vaikka Uluru on niistä kahdesta kuuluisampi. Vihreä kasvillisuus seuraa kuivia puronuomia alaosassa.',
      },
    ],
  },
  {
    tunnus: 'kuollutmeri', nimi: 'Kuollut meri', seutu: 'Israel, Jordania ja Länsiranta', lat: 31.4, lon: 35.5,
    selite: 'Maapallon matalin kohta merenpinnasta, ja järvi joka kutistuu vuosi vuodelta.',
    oletus: 'iss062e078990',
    kuvat: [
      {
        id: 'iss062e078990',
        teksti: 'Meren eteläpää, jossa luonnollinen sininen vesi (vasen) vaihtuu geometrisiksi '
          + 'haihdutusaltaiksi (oikea): niissä auringossa haihdutetaan suolavettä potaskaksi. Altaiden '
          + 'vihertävä ja vaaleanpunainen sävy syntyy eri suolapitoisuuksista.',
      },
      {
        id: 'iss073e0425936',
        teksti: 'Laajempi näkymä samalta seudulta: Galileanjärvi (vasemmalla) ja Kuollut meri (oikealla) '
          + 'yhdistää Jordan-joki, ohut tumma viiva kuvan keskellä. Galileanjärvi on maailman matalin '
          + 'makeanveden järvi, Kuollut meri matalin suolajärvi — molemmat samassa hautavajoamassa.',
      },
    ],
  },
  {
    tunnus: 'tsadjarvi', nimi: 'Tšadjärvi', seutu: 'Tšad, Niger, Nigeria ja Kamerun', lat: 13.15, lon: 14.3,
    selite: 'Järvi, joka on kutistunut noin 90 prosenttia 1960-luvulta.',
    oletus: 'iss037e015757',
    kuvat: [
      {
        id: 'iss037e015757',
        teksti: 'Auringon heijastus vedestä paljastaa matalan, pirstoutuneen järven ääriviivat '
          + 'paremmin kuin suora kuva pystyisi. 1960-luvulla järvi peitti 25 000 neliökilometriä; nyt '
          + 'siitä on jäljellä enää murto-osa, ja vesi on hajonnut saarekkeiden ja ruovikon verkoksi.',
      },
    ],
  },
  {
    tunnus: 'fitrijarvi', nimi: 'Fitrijärvi', seutu: 'Tšad', lat: 12.83, lon: 17.43,
    selite: 'Umpijärvi keskellä Saheliä, josta ei lähde ainuttakaan jokea mereen.',
    oletus: 'iss030e059398',
    kuvat: [
      {
        id: 'iss030e059398',
        teksti: 'Mutainen keltaruskea vesi täyttää autiomaan painanteen keskeltä, ja sen ympärillä '
          + 'tummempi rengas on paljastunut, palaneen kasvillisuuden peittämä järvenpohja. Kaikki '
          + 'Fitrijärveen tuleva vesi joko haihtuu tai imeytyy hiekkaan — mereen ei johda yksikään puro.',
      },
    ],
  },
  {
    tunnus: 'dardanellit', nimi: 'Dardanellit', seutu: 'Turkki', lat: 40.14, lon: 26.4,
    selite: 'Kapea salmi, joka yhdistää Egeanmeren Marmarameren kautta Mustallemerelle.',
    oletus: 'iss014e08138',
    kuvat: [
      {
        id: 'iss014e08138',
        teksti: 'Gallipolin kaupunki kuvan keskellä salmen suulla. Vesi virtaa yhtä aikaa koilliseen '
          + 'ja lounaaseen, sillä pinta- ja pohjavirtaus kulkevat vastakkaisiin suuntiin, ja muutama '
          + 'laiva näkyy tummina pilkkuina salmessa kaupungin lounaispuolella.',
      },
      {
        id: 'iss002e7758',
        teksti: 'Laajempi näkymä samalta salmelta viisi vuotta aiemmin: Gelibolun niemimaa työntyy '
          + 'alas vasemmalla, Egeanmeren saaria pilkottaa oikealla, ja avaruuden musta reuna kaartuu ylhäällä.',
      },
    ],
  },
  {
    tunnus: 'okavango', nimi: 'Okavango-suisto', seutu: 'Botswana', lat: -19.28, lon: 22.97,
    selite: 'Joki joka ei koskaan tavoita merta vaan haihtuu aavikon keskellä viuhkamaiseksi kosteikoksi.',
    oletus: 'iss073e0604445',
    kuvat: [
      {
        id: 'iss073e0604445',
        teksti: 'Angolasta virtaava Okavango-joki haarautuu Kalaharin hiekalle lukemattomiksi tummiksi '
          + 'suoniksi vaaleaa hiekkaa vasten, kuin puun juuristo. Vesi ei koskaan saavuta merta: se haihtuu '
          + 'ja imeytyy kokonaan, ja suisto ylläpitää yhtä Afrikan lajirikkaimmista ekosysteemeistä.',
      },
      {
        id: 'iss040e008209',
        teksti: 'Auringon heijastus vedestä muuttaa suiston yhdeksi kirkkaaksi hopeajuovaksi tummaa '
          + 'maata vasten — tekniikka, jolla miehistö saa esiin veden hienoimmatkin yksityiskohdat. Aseman '
          + 'oma aurinkopaneeli reunustaa kuvan oikeaa laitaa.',
      },
    ],
  },
  {
    tunnus: 'kolmen-rotkon-pato', nimi: 'Kolmen rotkon pato', seutu: 'Kiina', lat: 30.82, lon: 111.0,
    selite: 'Maailman suurin pato, jonka tekojärvi on yli 600 kilometriä pitkä.',
    oletus: 'iss019e007720',
    kuvat: [
      {
        id: 'iss019e007720',
        teksti: 'Pato näkyy vasemmassa reunassa kapeana valkoisena viivana joen poikki, ja sen takana '
          + 'Jangtse-joki on juuri alkanut täyttää laaksoaan uudeksi, kapeaksi tekojärveksi — kuva on yksi '
          + 'ensimmäisistä, jotka tallensivat täyttymisen vuonna 2009. Vuoristoinen maasto selittää altaan mutkittelun.',
      },
    ],
  },
  {
    tunnus: 'vesuvius', nimi: 'Vesuvius', seutu: 'Italia', lat: 40.82, lon: 14.43,
    selite: 'Tulivuori joka tuhosi Pompejin vuonna 79, ja asuu nyt kolmen miljoonan ihmisen naapurina.',
    oletus: 'iss067e010622',
    kuvat: [
      {
        id: 'iss067e010622',
        teksti: 'Vesuviuksen pyöreä kraatteri erottuu Napolinlahden rannalla, ja kaupunki on '
          + 'levittäytynyt aivan rinteille asti. Capri ja Ischia näkyvät saarina lahden suulla. Vuori '
          + 'purkautui viimeksi 1944, mutta se on yhä yksi maailman tarkimmin valvotuista tulivuorista.',
      },
      {
        id: 'iss061e006435',
        teksti: 'Naapurikaupunki Pompeiji jää kuvassa vuoren juurelle: se hautautui tuhkaan vuonna 79 '
          + 'purkauksessa, joka tappoi tuhansia. Kolme miljoonaa ihmistä asuu nykyään alueella, jonka '
          + 'Vesuvius voisi vielä joskus haudata uudelleen.',
      },
    ],
  },
  {
    tunnus: 'ounianga', nimi: 'Ouniangan järvet', seutu: 'Tšad', lat: 19.05, lon: 20.49,
    selite: 'Kymmenen makean veden järveä keskellä Saharaa, jäänteinä muinaisesta suurjärvestä.',
    oletus: 'iss021e026475',
    kuvat: [
      {
        id: 'iss021e026475',
        teksti: 'Oranssit hiekkadyynit ovat tunkeutuneet järven poikki ja pilkkoneet sen tummiksi '
          + 'kaistaleiksi, jotka näyttävät puun oksilta. Järvet ovat jäänteitä yhdestä isosta järvestä, '
          + 'joka peitti alueen 14 800–5 500 vuotta sitten kun Sahara oli vihreä; nyt pohjavesi pitää ne '
          + 'täynnä keskellä autiomaata.',
      },
    ],
  },
  {
    tunnus: 'sokotra', nimi: 'Sokotra', seutu: 'Jemen', lat: 12.46, lon: 53.82,
    selite: 'Saari niin eristyksissä, että 37 prosenttia sen kasveista ei kasva missään muualla.',
    oletus: 'iss069e004768',
    kuvat: [
      {
        id: 'iss069e004768',
        teksti: 'Sokotran eteläisen rannikon vuoristo laskeutuu jyrkkinä laaksoina turkoosiin mereen. '
          + 'Saari erosi mantereesta miljoonia vuosia sitten ja on siksi oma evoluution laboratorionsa: '
          + 'sen sateenvarjonmuotoiset lohikäärmeenveripuut eivät kasva luonnossa missään muualla maailmassa.',
      },
    ],
  },
  {
    tunnus: 'titicaca', nimi: 'Titicaca-järvi', seutu: 'Peru ja Bolivia', lat: -15.78, lon: -69.34,
    selite: 'Maailman korkeimmalla sijaitseva suuri purjehduskelpoinen järvi, Andien huipuilla.',
    oletus: 'iss055e071030',
    kuvat: [
      {
        id: 'iss055e071030',
        teksti: 'Järvi täyttää Andien ylätasangon painanteen, ja sen luoteisreunaa vasten kohoavat '
          + 'lumihuippuiset vuoret. Järvi sijaitsee noin 3812 metrin korkeudessa ja jakautuu Perun ja '
          + 'Bolivian kesken rajaviivaa pitkin keskeltä vettä.',
      },
      {
        id: 'iss067e149915',
        teksti: 'Lähempi kuva samasta järvestä: auringon kimallus vedessä piirtää vaaleita raitoja, '
          + 'jotka paljastavat pintavirtausten suunnan. Niemet ja lahdet erottuvat terävinä rantaviivoina — '
          + 'järvi on niin suuri, että sen tuulet ja aallot muistuttavat merta.',
      },
    ],
  },
  {
    tunnus: 'gizan-pyramidit', nimi: 'Gizan pyramidit', seutu: 'Egypti', lat: 29.87, lon: 30.95,
    selite: 'Muinaisen maailman seitsemästä ihmeestä ainoa, joka on vielä pystyssä.',
    oletus: 'iss032e009123',
    kuvat: [
      {
        id: 'iss032e009123',
        teksti: 'Kolme pyramidia näkyy tummina kolmiovarjoineen aivan siinä kohtaa, missä Kairon '
          + 'tiheä kaupunkikudos loppuu ja aavikko alkaa — raja on käytännössä suora viiva. Suurin '
          + 'pyramideista, 146,6 metriä valmistuessaan noin 2560 eaa., oli maailman korkein rakennelma '
          + 'yli 3700 vuotta.',
      },
      {
        id: 'iss068e006657',
        teksti: 'Laajempi näkymä kymmenen vuotta myöhemmin: pyramidit näkyvät pieninä kolmioina '
          + 'kuvan yläosassa, ja alhaalla Niilin vihreä laakso ja joki itse leikkaavat aavikon halki. '
          + 'Kaupunki on levinnyt entistä lähemmäs pyramideja.',
      },
    ],
  },
  {
    tunnus: 'tshernobyl', nimi: 'Tšernobyl', seutu: 'Ukraina', lat: 51.39, lon: 30.10,
    selite: 'Ydinvoimala, jonka ympärille jäi kielletty vyöhyke vuoden 1986 onnettomuuden jälkeen.',
    oletus: 'iss057e051419',
    kuvat: [
      {
        id: 'iss057e051419',
        teksti: 'Voimalan rakennukset ja niitä ympäröivät jäähdytysaltaat erottuvat Pripjat-joen '
          + 'mutkassa. Räjähtäneen neljännen reaktorin päälle rakennettu uusi teräskaari näkyy vaaleana '
          + 'suorakulmiona. Rajan taakse Valko-Venäjälle perustettiin oma suojelualueensa säteilylle '
          + 'altistuneelle alueelle — luonto on vallannut molemmat puolet takaisin ihmisen lähdettyä.',
      },
    ],
  },
  {
    tunnus: 'everest', nimi: 'Mount Everest', seutu: 'Nepal ja Kiina', lat: 27.99, lon: 86.93,
    selite: 'Maapallon korkein kohta merenpinnasta, 8849 metriä.',
    oletus: 'iss069e003192',
    kuvat: [
      {
        id: 'iss069e003192',
        teksti: 'Terävät lumihuiput työntyvät pilvimeren yläpuolelle Nepalin puolella Himalajaa, '
          + 'Everest kuvan keskellä muiden jättiläisten joukossa. Pilvet kasautuvat vuorten eteläpuolelle, '
          + 'koska kostea ilma nousee ja jäähtyy törmätessään Himalajan seinämään.',
      },
    ],
  },
  {
    tunnus: 'aletsch', nimi: 'Aletschin jäätikkö', seutu: 'Sveitsi', lat: 46.43, lon: 8.02,
    selite: 'Alppien pisin jäätikkö, 23 kilometriä, joka virtaa kolmen tunnetun huipun juurelta.',
    oletus: 'iss013e77377',
    kuvat: [
      {
        id: 'iss013e77377',
        teksti: 'Jäätikkö mutkittelee laaksossa Jungfrau-, Mönch- ja Eiger-huippujen juurelta '
          + 'alaspäin, ja sen keskellä kulkevat tummat raidat ovat moreeneja: kolmen erillisen jäävirran '
          + 'mukanaan tuomaa kivi- ja soraröykkiötä, joka on puristunut yhteen jäätiköiden sulautuessa. '
          + 'Kuvan yläreunassa siintää Brienzinjärvi.',
      },
    ],
  },
  {
    tunnus: 'torres-del-paine', nimi: 'Torres del Paine', seutu: 'Chile', lat: -50.95, lon: -73.03,
    selite: 'Patagonian graniittitornit ja niitä ympäröivät jäätiköt, jotka kalvavat vuosi vuodelta.',
    oletus: 'iss056e096830',
    kuvat: [
      {
        id: 'iss056e096830',
        teksti: 'Jäätikkö päättyy jyrkkään, siniseen jäärintamaan järveen, joka on täynnä juuri '
          + 'irronneita jäälohkareita. Ympärillä jyrkät vuoret kohoavat suoraan jäästä — koko '
          + 'kansallispuisto on graniittihuippujen ja jään yhteispeliä.',
      },
      {
        id: 'iss016e012047',
        teksti: 'Tyndall-jäätikkö yksitoista vuotta aiemmin: 32 kilometriä pitkä jäävirta, jonka '
          + 'keskellä näkyy tumma moreeniviiva ja lähempänä reunaa rikkonaisia railokenttiä — kohtia, '
          + 'joissa jää halkeilee virratessaan kallionkielekkeen ohi.',
      },
    ],
  },
  {
    tunnus: 'kilauea', nimi: 'Kilauea', seutu: 'Havaiji, Yhdysvallat', lat: 19.42, lon: -155.29,
    selite: 'Yksi maailman aktiivisimmista tulivuorista, joka muokkaa Ison saaren rantaviivaa yhä uudelleen.',
    oletus: 'iss055e070297',
    kuvat: [
      {
        id: 'iss055e070297',
        teksti: 'Vaalea tuhka- ja kaasupilvi valuu Ison saaren itärannikolta merelle päin — tämä on '
          + 'toukokuussa 2018 alkaneen purkauksen alkuvaiheita, jolloin laava tuhosi yli 700 kotia ja '
          + 'loi saarelle kokonaan uutta rantaviivaa. Vuoren rinteet näkyvät tummina laavavirtojen uurtamina.',
      },
    ],
  },
  {
    tunnus: 'ararat', nimi: 'Ararat', seutu: 'Turkki', lat: 39.70, lon: 44.30,
    selite: 'Turkin korkein vuori, kaksoishuippu joka näkyy kolmen maan rajaseudulta.',
    oletus: 'iss064e029480',
    kuvat: [
      {
        id: 'iss064e029480',
        teksti: 'Vinosta kuvakulmasta otettu näkymä paljastaa Araratin kaksi huippua selvästi: '
          + 'suurempi, 5137-metrinen Suur-Ararat etualalla ja pienempi kartiomainen Pikku-Ararat sen '
          + 'takana. Lumi peittää molemmat huiput kokonaan, ja rinteiltä laskeutuvat tummat laavavirrat '
          + 'erottuvat terävinä juovina lumen alta.',
      },
    ],
  },
  {
    tunnus: 'crater-lake', nimi: 'Crater Lake', seutu: 'Oregon, Yhdysvallat', lat: 42.94, lon: -122.11,
    selite: 'Yhdysvaltain syvin järvi, 592 metriä, syntynyt kun tulivuori romahti sisäänpäin.',
    oletus: 'iss013e54243',
    kuvat: [
      {
        id: 'iss013e54243',
        teksti: 'Poikkeuksellisen syvänsininen järvi täyttää pyöreän kalderan, joka syntyi kun '
          + 'Mount Mazama -tulivuori räjähti ja romahti noin 7700 vuotta sitten. Wizard Island, pieni '
          + 'tulivuorikartio järven sisällä, näkyy tummana pilkkuna eteläreunan lähellä.',
      },
      {
        id: 'iss062e152575',
        teksti: 'Sama kaldera talvella, lähes 14 vuotta myöhemmin: lumi peittää kraatterin reunat '
          + 'kauttaaltaan, mutta järven pinta pysyy sulana ja yhtä tummansinisenä kuin kesällä. Wizard '
          + 'Island erottuu nyt valkoisena lumihuippuna tumman veden keskeltä.',
      },
    ],
  },

  /*
   * ERÄ 3 (27.9.2026): isoisän reitin maisemat, luonnonkohteet ja
   * sama paikka eri vuosina -parit. Kuvat katsottu ja arvioitu käsin.
   */
  {
    tunnus: 'upsala-jaatikko', nimi: 'Upsalan jäätikkö', seutu: 'Patagonia, Argentiina', lat: -49.88, lon: -73.30,
    selite: 'Etelä-Patagonian jäätikköalueen kolmanneksi suurin jäätikkö, joka on vetäytynyt nopeasti.',
    oletus: 'iss021e015243',
    kuvat: [
      { id: 'iss021e015243',
        teksti: 'Upsala-jäätikön pää työntyy Argentino-järveen lokakuussa 2009. Reunasta irtoaa jäävuoria järveen — kaksi niistä kuljettaa mukanaan tummaa moreeniainesta, joka näkyy tummana raitana jään pinnalla. Vasemmalla oleva sininen järvi on jäätikön kuluttaman kallion ympäröimä, kirkkaampi kuin sameampi pääjärvi.' },
      { id: 'iss037e005104',
        teksti: 'Sama jäätikön pää neljä vuotta myöhemmin, lokakuussa 2013. Jään reuna on vetäytynyt keskimäärin 3,6 kilometriä vuodesta 2002, ja järven pinta on tuoreen jäänmurtuman jäljiltä valkoisen jäämurskan peitossa; suuremmat jäävuoret näkyvät valkoisina pilkkuina oikealla. Tutkijoiden mukaan vetäytyminen kertoo alueen ilmaston lämpenemisestä.' },
    ],
  },
  {
    tunnus: 'poopojarvi', nimi: 'Poopó-järvi', seutu: 'Oruro, Bolivia', lat: -18.75, lon: -67.13,
    selite: 'Andien korkealla ylängöllä oleva matala suolajärvi, joka on kuivunut toistuvasti lähes kokonaan.',
    oletus: 'iss012e06469',
    kuvat: [
      { id: 'iss012e06469',
        teksti: 'Poopó-järvi marraskuussa 2005, vielä vihertävän veden peittämänä ja valkoisen suolareunuksen kehystämänä. Järvi on niin matala — yleensä alle kolme metriä — että pienetkin sademäärän muutokset ylä-Andeilla näkyvät suoraan sen pinta-alassa.' },
      { id: 'iss070e098385',
        teksti: 'Sama järvi helmikuussa 2024, lähes täysin kuivana. Punaiset ja oranssinruskeat sävyt ovat paljastunutta suolaista ja mineraalipitoista pohjaa, ja vain muutama tumma vesiallas on enää jäljellä. Kaivostoiminta ja kastelu ovat vieneet vettä syöttöjoista.' },
    ],
  },
  {
    tunnus: 'etosha', nimi: 'Etosha-tasanko', seutu: 'Namibia', lat: -18.60, lon: 16.00,
    selite: 'Suunnaton, yleensä täysin kuiva suolatasanko, joka värjäytyy harvinaisina sadevuosina levien mukaan.',
    oletus: 'iss030e234965',
    kuvat: [
      { id: 'iss030e234965',
        teksti: 'Etosha-tasangon luoteiskulma, jonka valkoinen suolapinta erottuu ruskeasta savannista. Harvinaisen sadejakson jäljiltä Ekuma-joki on tuonut vettä lampeen oikealla, ja levä värjää sen vaaleanvihreäksi; toinen pieni allas hehkuu kirkkaan vihreänä. Yleensä tasanko on täysin kuiva.' },
      { id: 'iss011e09504',
        teksti: 'Sama seutu lähempää: pinkki ja vaaleanvihreä lampi pistävät esiin valkoisen suolakuoren keskeltä. Värin tekevät suolaa sietävät mikrolevät, joiden sävy vaihtelee veden lämpötilan ja suolaisuuden mukaan. Tasanko on 120 kilometriä pitkä ja Namibian suurimman eläinpuiston sydän.' },
    ],
  },
  {
    tunnus: 'eyrejarvi', nimi: 'Eyre-järven tulva', seutu: 'Etelä-Australia', lat: -28.90, lon: 137.30,
    selite: 'Yleensä täysin kuiva järvi, joka harvinaisina vuosina värjäytyy suolaa rakastavien mikrobien mukaan.',
    oletus: 'iss030e009271',
    kuvat: [
      { id: 'iss030e009271',
        teksti: 'Vuoden 2011 poikkeuksellisten sateiden täyttämä Eyre-järvi. Vihreä Belt Bay on syvempää vettä, punainen Madigan Gulf matalampaa ja suolaisempaa — sen mikrobitiheys voi kohota niin suureksi, että solujen karotenoidipigmentti värjää koko lahden. Alareunassa näkyvä lohko on yhä täysin kuiva ja valkoinen suolasta.' },
    ],
  },
  {
    tunnus: 'sharkbay', nimi: 'Shark Bay', seutu: 'Länsi-Australia', lat: -25.75, lon: 113.60,
    selite: 'Haarautunut aavikkolahti, jossa kasvaa maailman laajin merikaislaniitty ja elää eläviä stromatoliitteja.',
    oletus: 'iss064e003722',
    kuvat: [
      { id: 'iss064e003722',
        teksti: 'Shark Bayn syvälle Länsi-Australian rannikkoon pistävät turkoosit haarat. Matala vesi on täynnä merikaislaa, ja lahden pohjalla elää myös eläviä stromatoliitteja — kivimäisiä mikrobimattoja, jotka muistuttavat maapallon varhaisimpia elämänmuotoja.' },
      { id: 'iss057e105411',
        teksti: 'Sama rannikko idempää, missä lahti pilkkoutuu saariksi ja matalikoiksi. Vaaleat hiekkasärkät ja tummemmat syvänteet piirtävät lahden pohjan muodon suoraan veden läpi.' },
    ],
  },
  {
    tunnus: 'pyramidjarvi', nimi: 'Pyramid Lake', seutu: 'Nevada, Yhdysvallat', lat: 40.00, lon: -119.58,
    selite: 'Jääkautisen jättimäisen Lahontan-järven jäänne aavikon keskellä, nimetty pyramidinmuotoisesta kalkkikivipatsaasta.',
    oletus: 'iss073e0919979',
    kuvat: [
      { id: 'iss073e0919979',
        teksti: 'Pyramid Lake syysauringossa; vihreät ja siniset pyörteet vedessä ovat levän värjäämiä virtauksia. Järveä ympäröi jyrkkä aavikkomaasto keskellä Nevadaa.' },
      { id: 'iss025e005259',
        teksti: 'Sama järvi talvella, jolloin auringon kajastus paljastaa veden pinnalla kaksi suurta pyörrettä — tuulen jättämän jäljen. Ne kertovat pintavirtauksista, jotka muuttavat paikallisesti sitä, kuinka paljon valoa vesi heijastaa takaisin avaruusasemalle.' },
    ],
  },
  {
    tunnus: 'monojarvi', nimi: 'Mono-järvi', seutu: 'Kalifornia, Yhdysvallat', lat: 38.00, lon: -119.02,
    selite: 'Laskujoeton suolajärvi Kalifornian korkealla aavikolla, jonka keskellä kohoaa tulivuoritoiminnan synnyttämä saari.',
    oletus: 'iss069e000859',
    kuvat: [
      { id: 'iss069e000859',
        teksti: 'Lumen ympäröimä Mono-järvi huhtikuussa. Järven keskellä kohoava vaalea Paoha-saari on kolmesta saaresta nuorin ja syntyi tulivuoritoiminnasta alle 400 vuotta sitten. Järvellä ei ole luonnollista laskujokea, joten se on jäänyt suolaiseksi ja emäksiseksi.' },
    ],
  },
  {
    tunnus: 'saltonjarvi', nimi: 'Salton Sea', seutu: 'Kalifornia, Yhdysvallat', lat: 33.30, lon: -115.80,
    selite: 'Vahingossa vuonna 1905 syntynyt järvi Kalifornian eteläisellä aavikolla, joka suolaantuu vuosi vuodelta.',
    oletus: 'iss040e011868',
    kuvat: [
      { id: 'iss040e011868',
        teksti: 'Salton Sea makaa tummana pisarana aavikon keskellä, vihreiden viljelysten ympäröimänä. Järvi syntyi, kun Colorado-joki murtautui kastelukanavan läpi ja täytti kuivan altaan kahdeksi vuodeksi ennen padon korjaamista; ilman jokea uudistuvaa vettä siitä on sittemmin tullut yhä suolaisempi.' },
    ],
  },
  {
    tunnus: 'etelaalpit-jarvet', nimi: 'Etelä-Alppien jäätikköjärvet', seutu: 'Uusi-Seelanti', lat: -44.13, lon: 170.13,
    selite: 'Jäätikköjauhon turkoosiksi värjäämiä järviä Uuden-Seelannin korkeimpien vuorten juurella.',
    oletus: 'iss071e073568',
    kuvat: [
      { id: 'iss071e073568',
        teksti: 'Kolme peräkkäistä jäätikköjärveä samassa kuvassa — Tekapo, Pukaki ja Ohau vasemmalta oikealle. Kunkin sävy on hieman erilainen sen mukaan, kuinka paljon jäätikköjauhoa eli hienoksi jauhautunutta kivipölyä sen oma syöttöjoki kuljettaa; suurin niistä, Pukaki, on Aoraki/Mount Cookin, maan korkeimman vuoren, eteläpuolella.' },
    ],
  },
  {
    tunnus: 'zion', nimi: 'Zion Canyon', seutu: 'Utah, Yhdysvallat', lat: 37.30, lon: -113.05,
    selite: 'Virginin joen kaivama punahiekkakivikanjoni, jonka jyrkät seinämät kohoavat satoja metrejä.',
    oletus: 'iss017e005351',
    kuvat: [
      { id: 'iss017e005351',
        teksti: 'Zion Canyonin punertavat ja vaaleanpinkit hiekkakivijyrkänteet lähes suoraan ylhäältä kuvattuna. Kivi on noin 200 miljoonaa vuotta vanhan aavikon hiekkadyynien jäänne, ja jokien kaivamat pystysuorat railot seuraavat kallion vanhoja säröjä. Vasemmassa alakulmassa erottuu kapea tie, joka kiipeää kanjonin seinämää pitkin.' },
    ],
  },
  {
    tunnus: 'volgansuisto', nimi: 'Volgan suisto', seutu: 'Astrahanin alue, Venäjä', lat: 45.70, lon: 47.90,
    selite: 'Euroopan pisimmän joen laaja haarautuva suisto Kaspianmeren rannalla.',
    oletus: 'iss005e11203',
    kuvat: [
      { id: 'iss005e11203',
        teksti: 'Volga-joki haarautuu kymmeniksi uomiksi ennen laskuaan Kaspianmereen; vihreät suistosaaret erottuvat selvästi ruskeasta maasta pohjoisessa ja vihertävästä merestä etelässä. Suisto on tärkeä pysähdyspaikka muuttolinnuille ja elinympäristö belugasammille, joista saadaan Venäjän kuuluisaa kaviaaria.' },
      { id: 'iss013e77351',
        teksti: 'Sama suisto tulvan aikaan syyskuussa 2006, muutama päivä rankkojen sateiden jälkeen. Sameat tulvavedet virtaavat pitkinä juovina laivaväylän molemmin puolin kosteikkojen yli suoraan Kaspianmereen.' },
    ],
  },
  {
    tunnus: 'irrawaddyn-suisto', nimi: 'Irrawaddyn suisto', seutu: 'Myanmar', lat: 16.00, lon: 95.00,
    selite: 'Myanmarin tärkeimmän joen mangrovemetsien ja riisipeltojen halkoma suisto Andamaanien merellä.',
    oletus: 'iss073e1197819',
    kuvat: [
      { id: 'iss073e1197819',
        teksti: 'Irrawaddy-joki haarautuu lukemattomiksi mangrovemetsän reunustamiksi uomiksi ennen laskuaan Andamaanien merelle. Ruskea sedimenttivyöhyke rannikon edustalla paljastaa, kuinka paljon liejua joki kuljettaa mukanaan riisipeltojen ja kosteikkojen halki. Avaruusaseman aurinkopaneeli näkyy kuvan oikeassa reunassa.' },
    ],
  },
  {
    tunnus: 'colorado-suisto', nimi: 'Colorado-joen suisto', seutu: 'Kalifornianlahti, Meksiko', lat: 31.80, lon: -114.75,
    selite: 'Kuivunut jokisuisto, joka paljastaa kuinka kastelu vie Colorado-joen veden ennen kuin se ehtii mereen.',
    oletus: 'iss064e002258',
    kuvat: [
      { id: 'iss064e002258',
        teksti: 'Colorado-joen suisto Kalifornianlahden pohjukassa. Valkoinen alue vasemmalla on entistä jokiuomaa, joka on kuivunut, koska joen vesi käytetään lähes kokonaan kasteluun ennen kuin se ehtii merelle asti. Turkoosi sedimenttipitoinen vesi näyttää, missä vielä virtaava vesi kohtaa lahden. Avaruusaseman rakenteet näkyvät kuvan oikeassa reunassa.' },
    ],
  },
  {
    tunnus: 'santorini', nimi: 'Santorini', seutu: 'Kykladit, Kreikka', lat: 36.40, lon: 25.40,
    selite: 'Kalderasaaristo, joka syntyi yhden historian voimakkaimmista tulivuorenpurkauksista.',
    oletus: 'iss017e005037',
    kuvat: [
      { id: 'iss017e005037',
        teksti: 'Santorinin saariryhmä ylhäältä: oikealla Théran pääsaari, jonka valkoiset kattojen rivit seuraavat jyrkän kalderan reunaa, ja vasemmalla tumma Nea Kamenin saari, joka on kasvanut esiin merestä laavavirroista. Kalderan synnytti noin vuonna 1620 eaa. tapahtunut purkaus, yksi viimeisten 10 000 vuoden voimakkaimmista. Saaren oikeassa yläkulmassa erottuu lentokenttä.' },
    ],
  },
  {
    tunnus: 'amazonin-suu', nimi: 'Amazonin suu', seutu: 'Pará, Brasilia', lat: -0.60, lon: -49.90,
    selite: 'Maailman vesirikkaimman joen suualue, jossa virtaukset muovaavat rantaviivaa jatkuvasti uudelleen.',
    oletus: 'iss010e13029',
    kuvat: [
      { id: 'iss010e13029',
        teksti: 'Punaruskea liejuinen vesi virtaa vehreiden saarien välistä siellä missä Amazon laskee mereen; Perigoso-kanava erottaa saaren mantereesta, ja pilvet peittävät osan näkymästä. NASA:n tutkijat vertasivat vuosien 2000 ja 2005 kuvia ja havaitsivat kanavan siirtyneen satoja metrejä, kun joki syö rantaa toiselta puolelta ja kasaa lietettä toiselle.' },
    ],
  },
  {
    tunnus: 'fundynlahti', nimi: 'Fundynlahti', seutu: 'Nova Scotia ja New Brunswick, Kanada', lat: 45.30, lon: -64.50,
    selite: 'Lahti, jossa on maailman suurin vuorovesivaihtelu — vesi voi nousta ja laskea yli kymmenen metriä.',
    oletus: 'iss059e059149',
    kuvat: [
      { id: 'iss059e059149',
        teksti: 'Fundynlahti erottaa Nova Scotian (oikealla) New Brunswickistä (vasemmalla). Lahden pohjukoissa vesi on punaruskeaa: maailman suurimmat vuorovedet huuhtovat esiin hiekkakiveä ja punaista mutaa kahdesti päivässä. Pilvijuova kulkee lahden yli kuvan alareunassa.' },
    ],
  },

  /*
   * ERÄ 4 (27.9.2026): isoisän reitin maisemat, luonnonkohteet ja
   * sama paikka eri vuosina -parit. Kuvat katsottu ja arvioitu käsin.
   */
  {
    tunnus: 'falklandinsaaret', nimi: 'Falklandinsaaret', seutu: 'Etelä-Atlantti, Britannian merentakainen alue', lat: -51.7, lon: -59.5,
    selite: 'Kahden pääsaaren ja satojen pienempien saarten ryhmä keskellä eteläistä Atlanttia, kaukana lähimmästä mantereesta.',
    oletus: 'iss071e582470',
    kuvat: [
      {
        id: 'iss071e582470',
        teksti: 'Länsi- ja Itä-Falkland erottuvat tummina, repaleisina saarina kirkkaan sinisen valtameren '
          + 'keskeltä. Saarilla asuu vain runsaat 3 700 ihmistä mutta moninkertainen määrä lampaita, ja '
          + 'rannikon lahdet ovat pingviinien ja merileijonien suosimia poikuupaikkoja.',
      },
      {
        id: 'iss066e091560',
        teksti: 'Sama saaristo runsaat kaksi vuotta aiemmin, pilvien raosta kuvattuna. Saarten välistä '
          + 'kulkeva salmi erottaa Länsi- ja Itä-Falklandin toisistaan. Saariryhmän kaksi nimeä — '
          + 'brittiläinen Falklandinsaaret ja argentiinalainen Malvinas — kertovat kiistasta, joka johti sotaan 1982.',
      },
    ],
  },
  {
    tunnus: 'etela-georgia', nimi: 'Etelä-Georgia', seutu: 'Eteläinen Atlantti, Britannian merentakainen alue', lat: -54.3, lon: -36.5,
    selite: 'Jäätikköinen vuorisaari, jonne Ernest Shackleton käveli hakemaan apua pelastusretkellään 1916.',
    oletus: 'iss011e12148',
    kuvat: [
      {
        id: 'iss011e12148',
        teksti: 'Lumihuippuiset vuoret laskevat suoraan jäätiköinä mereen, ja niiden välissä tumma vuono '
          + 'heijastaa taivasta. Saari on niin jyrkkä ja jäätikköinen, ettei sen halki ole koskaan '
          + 'rakennettu tietä — Shackleton ja kaksi toveria ylittivät samankaltaisen maaston jalan '
          + 'vuonna 1916 pelastaakseen haaksirikkoutuneen miehistönsä.',
      },
    ],
  },
  {
    tunnus: 'dasht-e-lut', nimi: 'Dasht-e Lutin kaluutit', seutu: 'Kerman, Iran', lat: 30.7, lon: 58.5,
    selite: 'Yksi Maan kuumimmista paikoista, jonka tuuli on veistänyt pitkiksi, harjanteisiksi yardangeiksi.',
    oletus: 'iss012e18779',
    kuvat: [
      {
        id: 'iss012e18779',
        teksti: 'Kaluutit eli tuulen kuluttamat harjanteet piirtyvät aavikkoon kymmenien kilometrien '
          + 'pituisina riveinä, kultaisina iltapäivän valossa. Satelliitit ovat mitanneet Dasht-e Lutin '
          + 'pintalämpötilaksi yli 70 astetta — yhden korkeimmista koskaan mitatuista maanpinnan '
          + 'lämpötiloista. Pilvet kuvassa ovat harvinaisia: alueella ei sada juuri koskaan.',
      },
    ],
  },
  {
    tunnus: 'damavand', nimi: 'Damavand', seutu: 'Mazandaran, Iran', lat: 35.951, lon: 52.109,
    selite: 'Iranin ja koko Lähi-idän korkein huippu, lähes symmetrinen lumihuippuinen tulivuori.',
    oletus: 'iss010e13393',
    kuvat: [
      {
        id: 'iss010e13393',
        teksti: 'Vuoren rinteiltä laskeutuu säteittäin lumiuurteita joka suuntaan kuin valtava valkoinen '
          + 'sateenvarjo. Damavand on yli 5 600 metriä korkea ja yhä toimiva tulivuori — huipulla '
          + 'purkautuu rikkikaasua — vaikka viimeisestä laavapurkauksesta on kulunut tuhansia vuosia.',
      },
    ],
  },
  {
    tunnus: 'sarezjarvi', nimi: 'Sarezjärvi', seutu: 'Pamir, Tadžikistan', lat: 38.264, lon: 72.573,
    selite: 'Maanjäristyksen padottu vuoristojärvi, jonka luonnollinen pato uhkaa yhä pettää.',
    oletus: 'iss074e0814815',
    kuvat: [
      {
        id: 'iss074e0814815',
        teksti: 'Turkoosi järvi täyttää Pamirin vuoristolaakson mutkitellen yli 60 kilometrin matkan. Se '
          + 'syntyi 1911, kun voimakas maanjäristys irrotti kalliovyöryn, joka tukki laakson — Usoin '
          + 'sortuma on yhä yksi maailman korkeimmista luonnollisista padoista. Geologit seuraavat patoa '
          + 'jatkuvasti, sillä sen pettäminen uhkaisi satojatuhansia ihmisiä alajuoksulla.',
      },
    ],
  },
  {
    tunnus: 'toktogul', nimi: 'Toktogulin tekojärvi', seutu: 'Tien-shan, Kirgisia', lat: 41.72, lon: 73.0,
    selite: 'Keski-Aasian suurimpiin kuuluva tekojärvi, joka varastoi vuoriston sulamisvedet vuoriston sisään.',
    oletus: 'iss074e0825692',
    kuvat: [
      {
        id: 'iss074e0825692',
        teksti: 'Kirkkaan turkoosi tekojärvi täyttää joenlaakson Tien-shanin vuorten keskellä. Pato '
          + 'valmistui 1974, ja järvi tuottaa suuren osan Kirgisian sähköstä. Kesken talven päästetty '
          + 'vesi on toistuvasti riidan aihe naapurimaiden kanssa, jotka tarvitsisivat saman veden '
          + 'keväällä kastelukauden alkuun.',
      },
    ],
  },
  {
    tunnus: 'kljutsevskaja', nimi: 'Kljutševskaja Sopka', seutu: 'Kamtšatka, Venäjä', lat: 56.056, lon: 160.642,
    selite: 'Euraasian korkein toimiva tulivuori, joka purkautuu useita kertoja vuosikymmenessä.',
    oletus: 'iss038e005515',
    kuvat: [
      {
        id: 'iss038e005515',
        teksti: 'Tuhkapatsas nousee suoraan huipulta ja taittuu tuulen mukana sivulle — purkaus oli '
          + 'käynnissä juuri kun avaruusasema lensi ylitse. Vuori on lähes 4 800 metriä korkea ja kasvaa '
          + 'joka purkauksen myötä. Vasemmalla näkyy lumihuippuinen naapuritulivuori, jonka purkauspilvi jättää varjoonsa.',
      },
    ],
  },
  {
    tunnus: 'reunion', nimi: 'Réunion', seutu: 'Intian valtameri, Ranska', lat: -21.13, lon: 55.54,
    selite: 'Ranskan merentakainen departementti, jonka keskellä kohoaa yksi maailman aktiivisimmista tulivuorista.',
    oletus: 'iss055e020372',
    kuvat: [
      {
        id: 'iss055e020372',
        teksti: 'Saaren pyöreä muoto ja rosoiset laaksot paljastavat sen synnyn: koko saari on yhden '
          + 'ainoan kilpitulivuoren, Piton des Neigesin, rakentama. Vuoren jyrkät valurenkaat erottuvat '
          + 'kuvan vasemmassa reunassa vihreinä syvänteinä. Saaren toisella laidalla purkautuu säännöllisesti '
          + 'Piton de la Fournaise, joka purkautuu keskimäärin kerran vuodessa.',
      },
    ],
  },
  {
    tunnus: 'villarrica', nimi: 'Villarrica', seutu: 'Araucanía, Chile', lat: -39.42, lon: -71.93,
    selite: 'Yksi Etelä-Amerikan aktiivisimmista tulivuorista, jonka kraatterissa lipuu pysyvä laavajärvi.',
    oletus: 'iss068e040596',
    kuvat: [
      {
        id: 'iss068e040596',
        teksti: 'Lumihuippu piirtää täydellisen kartion kahden järven, Villarrican ja Calafquénin, '
          + 'väliin. Rinteiltä laskeutuvat tummat juovat ovat vanhoja laavavirtoja ja mutavirtojen uria. '
          + 'Huipun kraatterissa kiehuu jatkuvasti näkyvä laavajärvi — yksi vain viidestä koko maailmassa.',
      },
    ],
  },
  {
    tunnus: 'laguna-verde', nimi: 'Laguna Verde', seutu: 'Atacama, Chile', lat: -26.98, lon: -68.55,
    selite: 'Turkoosi korkean vuoriston järvi maailman korkeimman aktiivisen tulivuoren, Ojos del Saladon, juurella.',
    oletus: 'iss074e0760459',
    kuvat: [
      {
        id: 'iss074e0760459',
        teksti: 'Järven vesi hohtaa kirkkaan turkoosina liuenneiden mineraalien ansiosta, yli 4 300 '
          + 'metrin korkeudessa. Ympäröivä maasto on täynnä pieniä tulivuorenkartioita ja tuoreita '
          + 'laavavirtoja. Vain muutaman kilometrin päässä kohoaa Ojos del Salado, 6 893 metriä korkea '
          + 'maailman korkein aktiivinen tulivuori.',
      },
    ],
  },
  {
    tunnus: 'laguna-colorada', nimi: 'Laguna Colorada', seutu: 'Potosí, Bolivia', lat: -22.2, lon: -67.78,
    selite: 'Veripunainen suolajärvi Andien ylätasangolla, jonka rannoilla pesii tuhansia flamingoja.',
    oletus: 'iss066e110899',
    kuvat: [
      {
        id: 'iss066e110899',
        teksti: 'Järven pinta hohtaa veripunaisena keskellä ruskeaa ylätasankoa, ja valkoiset '
          + 'boraattisaarekkeet pilkottavat sen läpi. Punainen väri syntyy pigmentistä, jota levät ja '
          + 'mikrobit tuottavat suojautuakseen kirkkaalta auringolta yli 4 200 metrin korkeudessa. Kolme '
          + 'flamingolajia ruokailee järven levillä ja äyriäisillä.',
      },
    ],
  },
  {
    tunnus: 'san-rafael', nimi: 'San Rafaelin jäätikkö', seutu: 'Aysén, Chile', lat: -46.68, lon: -73.83,
    selite: 'Patagonian pohjoisen jäätikköalueen jäätikkö, joka laskee suoraan laguuniin ja kalvaa siihen jäävuoria.',
    oletus: 'iss063e081907',
    kuvat: [
      {
        id: 'iss063e081907',
        teksti: 'Jäätikön sininen, rikkonainen etureuna työntyy suoraan laguuniin, ja sen edestä '
          + 'irronneet jäävuoret kelluvat vedessä satoina valkoisina lohkareina. San Rafael on eteläisen '
          + 'pallonpuoliskon matalimmilla leveysasteilla oleva jäätikkö, joka ulottuu lähes '
          + 'sademetsävyöhykkeeseen asti — ja on vetäytynyt viime vuosikymmeninä useita kilometrejä.',
      },
    ],
  },
  {
    tunnus: 'simienit', nimi: 'Simienin vuoret', seutu: 'Amhara, Etiopia', lat: 13.19, lon: 38.24,
    selite: 'Jyrkkiin huippuihin ja syviin rotkoihin kulunut ylätasanko, jota kutsutaan Afrikan Grand Canyoniksi.',
    oletus: 'iss016e010784',
    kuvat: [
      {
        id: 'iss016e010784',
        teksti: 'Vuosimiljoonien sadevedet ovat uurtaneet rotkoja, jotka haarautuvat ylätasangosta kuin '
          + 'puun juuret, ja jyrkät reunat erottuvat terävinä varjoina. Ylätasanko on jäänne paljon '
          + 'suuremmasta laavakerrostumasta, josta eroosio on jättänyt jäljelle vain kovimmat, sakaraiset '
          + 'huiput. Alueella elää geladapaviaani, jota ei tavata luonnossa missään muualla maailmassa.',
      },
    ],
  },
  {
    tunnus: 'everglades', nimi: 'Everglades', seutu: 'Florida, Yhdysvallat', lat: 25.4, lon: -80.9,
    selite: 'Valtavan matalana virtaava "ruohon joki", yksi maailman suurimmista kosteikoista.',
    oletus: 'iss015e08920',
    kuvat: [
      {
        id: 'iss015e08920',
        teksti: 'Turkoosin ja tummanvihreän kirjava kuvio on satojen tuhansien hehtaarien laajuinen '
          + 'saraikko, jonka läpi vesi virtaa niin hitaasti — vain muutaman sadan metrin päivässä — että '
          + 'aluetta kutsutaan "ruohon joeksi". Kansallispuisto on maailman ainoa paikka, jossa '
          + 'amerikanalligaattori ja amerikankrokotiili elävät luonnossa samalla alueella.',
      },
    ],
  },
  {
    tunnus: 'ennedi', nimi: 'Ennedin ylänkö', seutu: 'Ennedi, Tšad', lat: 17.42, lon: 21.75,
    selite: 'UNESCOn suojelema hiekkakivimuodostuma Saharan keskellä, jonka pinnalla on myös muinaisen meteoriitin jättämä kraatteri.',
    oletus: 'iss074e0320315',
    kuvat: [
      {
        id: 'iss074e0320315',
        teksti: 'Gweni-Fadan kraatteri erottuu lähes täydellisenä ympyränä aavikon keskeltä — NASA '
          + 'tunnistaa sen eroosion paljastamaksi, meteoriitin törmäyksestä syntyneeksi rakenteeksi, '
          + 'halkaisijaltaan yli kolme kilometriä. Sen ympärillä mutkittelevat kuivat jokiuomat täyttyvät '
          + 'vedellä vain harvoin sadekausina.',
      },
      {
        id: 'iss072e404551',
        teksti: 'Laajempi näkymä samasta ylängöstä: punertava hiekkakivi on kulunut sokkeloiseksi '
          + 'labyrintiksi kanjoneita ja pylväitä. Muodostuma on satoja miljoonia vuosia vanha, ja sen '
          + 'kallioseinillä on tuhansia vuosia vanhoja maalauksia ajalta, jolloin Sahara oli vihreä ja märkä.',
      },
    ],
  },
  {
    tunnus: 'nevado-del-ruiz', nimi: 'Nevado del Ruiz', seutu: 'Kolumbia', lat: 4.892, lon: -75.324,
    selite: 'Jäätikköinen tulivuori, jonka vuoden 1985 purkaus suli jäätikköä ja hautasi kokonaisen kaupungin mutavirran alle.',
    oletus: 'iss023e027737',
    kuvat: [
      {
        id: 'iss023e027737',
        teksti: 'Lumi- ja jäätikkökupu peittää huipun, ja sen keskellä erottuu tumma, pyöreä kraatteri, '
          + 'josta nousee yhä höyryä. Rinteiltä laskeutuvat syvät, säteittäiset uurteet ovat vanhojen '
          + 'mutavirtojen jälkiä. Vuoden 1985 purkaus suli osan jäätiköstä ja synnytti laharin, joka '
          + 'hautasi Armeron kaupungin ja surmasi yli 23 000 ihmistä.',
      },
    ],
  },
  {
    tunnus: 'sakurajima', nimi: 'Sakurajima', seutu: 'Kyūshū, Japani', lat: 31.593, lon: 130.657,
    selite: 'Yksi Japanin aktiivisimmista tulivuorista kohoaa keskellä '
            + 'Kagoshiman lahtea, kaupungin kupeessa.',
    oletus: 'iss034e027139',
    kuvat: [
      {
        id: 'iss034e027139',
        teksti: 'Sakurajima purkautuu tammikuussa 2013 kuvattuna Kansainväliseltä '
          + 'avaruusasemalta. Tuhkapilvi kulkeutuu kaakkoon yli lahden, ja '
          + 'purkauspilven varjo osuu vedenpinnalle. Alempana näkyy Kagoshiman '
          + 'kaupunki, jonka noin 600 000 asukasta elävät tulivuoren varjossa ja '
          + 'pyyhkivät tuhkaa katoiltaan lähes viikoittain.',
      },
    ],
  },
  {
    tunnus: 'aorounga', nimi: 'Aorounga-kraatteri', seutu: 'Sahara, Tšad', lat: 19.1, lon: 19.25,
    selite: 'Yksi maailman parhaiten säilyneistä meteoriittikraattereista '
            + 'piirtyy tarkkoina renkaina Saharan hiekkaan.',
    oletus: 'iss012e09639',
    kuvat: [
      {
        id: 'iss012e09639',
        teksti: 'Aorounga-kraatterin renkaat erottuvat terävinä Tšadin pohjoisosan '
          + 'aavikolla. Kraatterin halkaisija on noin 17 kilometriä, ja '
          + 'tutkijoiden mukaan sen iskun jäljet ovat säilyneet lähes '
          + 'koskemattomina satojen miljoonien vuosien ajan, koska alueella ei '
          + 'ole ollut juuri lainkaan eroosiota kuluttavaa kasvillisuutta tai '
          + 'vettä. Tutkakuvaukset ovat paljastaneet hiekan alta vielä kaksi '
          + 'samanikäistä kraatteria vierekkäin, mikä viittaa kolmen kappaleen '
          + 'peräkkäiseen törmäykseen.',
      },
    ],
  },
  {
    tunnus: 'emi-koussi', nimi: 'Emi Koussi', seutu: 'Tibestin vuoret, Tšad', lat: 19.792, lon: 18.556,
    selite: 'Saharan korkein huippu on kilpitulivuori, jonka laella on yksi '
            + 'maailman suurimmista kalderoista.',
    oletus: 'iss030e005456',
    kuvat: [
      {
        id: 'iss030e005456',
        teksti: 'Emi Koussin harmaanvihreä kilpitulivuori kohoaa Tšadin Tibestin '
          + 'vuoristossa, ja oikealla näkyy vertailun vuoksi Aorounga-kraatterin '
          + 'rengasmuodostuma samassa kuvassa. Emi Koussin huipulla on noin 12 x '
          + '19 kilometrin kalderarakennelma, yksi laajimmista koko maailmassa. '
          + 'Vuori kohoaa 3 415 metriin ja on samalla koko Saharan aavikon '
          + 'korkein kohta.',
      },
    ],
  },
  {
    tunnus: 'meteor-crater-arizona', nimi: 'Meteorikraatteri', seutu: 'Arizona, Yhdysvallat', lat: 35.027, lon: -111.022,
    selite: 'Ensimmäinen kraatteri, joka todistettiin tieteellisesti '
            + 'meteoriitin iskun jäljeksi, aukeaa terävärajaisena Arizonan '
            + 'ylängöllä.',
    oletus: 'iss074e0208832',
    kuvat: [
      {
        id: 'iss074e0208832',
        teksti: 'Meteorikraatteri erottuu tarkkarajaisena reikänä Arizonan lumisen '
          + 'ylängön keskellä. Kraatteri syntyi noin 50 000 vuotta sitten, kun '
          + 'noin 50 metriä leveä rauta-nikkelimeteoriitti iski maahan. Se on '
          + 'halkaisijaltaan noin 1,2 kilometriä, ja NASA on käyttänyt paikkaa '
          + 'Kuu-astronauttien maastokoulutukseen sen kuumaisemaa muistuttavan '
          + 'pinnan takia.',
      },
    ],
  },
  {
    tunnus: 'buenos-aires-yolla', nimi: 'Buenos Aires yöllä', seutu: 'Argentiina', lat: -34.61, lon: -58.44,
    selite: 'Argentiinan pääkaupunki levittäytyy miljoonine valoineen Río de la '
            + 'Platan rannalle.',
    oletus: 'iss072e519264',
    kuvat: [
      {
        id: 'iss072e519264',
        teksti: 'Buenos Airesin katuverkko piirtyy oranssina ja valkoisena yöllisessä '
          + 'kuvassa tammikuulta 2025. Kaupungissa asuu noin 3,1 miljoonaa '
          + 'ihmistä, mutta metropolialueella yli 15 miljoonaa – lähes kolmasosa '
          + 'koko Argentiinan väestöstä. Río de la Plata, maailman leveimpiin '
          + 'kuuluva jokisuisto, jää kuvan oikeaan reunaan mustana.',
      },
    ],
  },
  {
    tunnus: 'riyadh-yolla', nimi: 'Riad yöllä', seutu: 'Saudi-Arabia', lat: 24.7136, lon: 46.6753,
    selite: 'Aavikon keskelle noussut pääkaupunki hehkuu yöllä laajana '
            + 'ruudukkona ilman ainoatakaan lähijokea.',
    oletus: 'iss033e020288',
    kuvat: [
      {
        id: 'iss033e020288',
        teksti: 'Riadin katuverkko hohtaa keltaisena ja sinisenä marraskuisessa '
          + 'yökuvassa vuodelta 2012. Kaupungin väkiluku on kasvanut '
          + 'räjähdysmäisesti: vielä 1960 asukkaita oli noin 150 000, nykyään yli '
          + '7 miljoonaa. Riad sijaitsee Najdin ylätasangolla, eikä sen lähellä '
          + 'virtaa yhtään pysyvää jokea – vesi tulee suolanpoistolaitoksista ja '
          + 'pohjavedestä.',
      },
    ],
  },
  {
    tunnus: 'casablanca-yolla', nimi: 'Casablanca yöllä', seutu: 'Marokko', lat: 33.5731, lon: -7.5898,
    selite: 'Marokon suurin kaupunki ja tärkein satama loistaa Atlantin '
            + 'rannalla.',
    oletus: 'iss072e645691',
    kuvat: [
      {
        id: 'iss072e645691',
        teksti: 'Casablancan valot piirtävät rannikon ääriviivan tarkasti Atlantin '
          + 'mustaa merta vasten. Kaupunki on Marokon suurin ja tärkein '
          + 'talouskeskus, ja siellä asuu yli 3,7 miljoonaa ihmistä. Nimi '
          + 'tarkoittaa espanjaksi \'valkoista taloa\' – portugalilaiset ja '
          + 'espanjalaiset merenkulkijat antoivat sen valkoisiksi kalkittujen '
          + 'rakennusten mukaan.',
      },
    ],
  },
  {
    tunnus: 'empty-quarter', nimi: 'Tyhjä neljännes', seutu: 'Rub al-Khali, Saudi-Arabia', lat: 20, lon: 52,
    selite: 'Maailman suurin yhtenäinen hiekkameri aaltoilee tuulen muovaamana '
            + 'loputtomiin.',
    oletus: 'iss027e034290',
    kuvat: [
      {
        id: 'iss027e034290',
        teksti: 'Rub al-Khalin – Tyhjän neljänneksen – dyynit muodostavat tarkan, '
          + 'säännöllisen kuvion aavikon pinnalle. Hiekkameri on maailman suurin '
          + 'yhtenäinen dyynialue, ja sen dyynit voivat kohota jopa 250 metrin '
          + 'korkuisiksi. Alueen ylitti ensimmäisten eurooppalaisten joukossa '
          + 'brittiläinen tutkimusmatkailija Bertram Thomas vuosina 1930–31.',
      },
    ],
  },
  {
    tunnus: 'taklamakan', nimi: 'Taklamakanin autiomaa', seutu: 'Xinjiang, Kiina', lat: 39.5, lon: 76.5,
    selite: 'Yksi maailman suurimmista liikkuvan hiekan aavikoista täyttää koko '
            + 'Tarimin altaan Keski-Aasiassa.',
    oletus: 'iss074e0316083',
    kuvat: [
      {
        id: 'iss074e0316083',
        teksti: 'Taklamakanin autiomaan läntinen reuna kohtaa Pamirin vuoriston '
          + 'lumihuiput jyrkässä siirtymässä. Autiomaa on toiseksi suurin '
          + 'liikkuvan hiekan alue maailmassa, ja sen nimen on tulkittu '
          + 'tarkoittavan suunnilleen \'sinne menee mutta ei tule takaisin\'. '
          + 'Muinaiset silkkitiekulkijat kiersivät koko autiomaan sen reunoja '
          + 'pitkin sen sijaan, että olisivat yrittäneet ylittää sen.',
      },
    ],
  },
  {
    tunnus: 'simpson-desert', nimi: 'Simpsonin autiomaa', seutu: 'Australia', lat: -24.5, lon: 137,
    selite: 'Satojen kilometrien pituiset punaiset hiekkaharjanteet juovittavat '
            + 'Australian sydänmaata.',
    oletus: 'iss005e21295',
    kuvat: [
      {
        id: 'iss005e21295',
        teksti: 'Simpsonin autiomaan oranssinpunaiset dyyniharjanteet erottuvat '
          + 'selvästi vastikään palaneesta, sinertävän vihreästä '
          + 'kasvillisuudesta. Dyynit ovat pitkittäisiä ja voivat jatkua satojen '
          + 'kilometrien matkan lähes suorina linjoina. Punainen väri syntyy '
          + 'hiekanjyvien pintaa peittävästä rautaoksidikerroksesta, joka on '
          + 'muodostunut vuosituhansien kuluessa.',
      },
    ],
  },
  {
    tunnus: 'aurora-scandinavia', nimi: 'Revontulet Pohjolan yllä', seutu: 'Ruotsi ja Suomi', lat: 60, lon: 20,
    selite: 'Vihreä revontulinauha kaartuu maapallon reunan yli Pohjoismaiden '
            + 'kaupunkivalojen päällä.',
    oletus: 'iss064e024089',
    kuvat: [
      {
        id: 'iss064e024089',
        teksti: 'Vihreä ja punertava revontulinauha kaartuu tähtitaivasta vasten '
          + 'Ruotsin ja Suomen kaupunkivalojen yllä, ja niiden välissä pimeänä '
          + 'erottuu Itämeri. Revontulet syntyvät, kun Auringosta tulevat '
          + 'varautuneet hiukkaset törmäävät yläilmakehän kaasuihin. Vihreä väri '
          + 'syntyy noin 100–300 kilometrin korkeudessa hehkuvasta hapesta.',
      },
    ],
  },
  {
    tunnus: 'manam', nimi: 'Manam', seutu: 'Papua-Uusi-Guinea', lat: -4.08, lon: 145.037,
    selite: 'Oma saarensa muodostava tulivuori on yksi Papua-Uusi-Guinean '
            + 'aktiivisimmista.',
    oletus: 'sts093-709-051',
    kuvat: [
      {
        id: 'sts093-709-051',
        teksti: 'Manam-saaren pyöreä tulivuori työntää tuhkapilveä pitkälle '
          + 'Bismarckinmerelle. Vuori muodostaa kokonaan oman, halkaisijaltaan '
          + 'noin 10 kilometrin saarensa Papua-Uuden-Guinean koillisrannikon '
          + 'edustalla. Vuoden 2004 suuri purkaus pakotti evakuoimaan koko saaren '
          + 'noin 9 000 asukasta mantereelle.',
      },
    ],
  },
  {
    tunnus: 'karymsky', nimi: 'Karymski', seutu: 'Kamtšatka, Venäjä', lat: 54.049, lon: 159.443,
    selite: 'Kamtšatkan aktiivisin tulivuori purkautuu lähes jatkuvasti vanhan '
            + 'kalderajärven kupeessa.',
    oletus: 'iss033e019822',
    kuvat: [
      {
        id: 'iss033e019822',
        teksti: 'Karymskin tulivuoren tumma tuhkapilvi kohoaa lumisen rinteen yllä, '
          + 'ja vieressä siintää pyöreä kalderajärvi. Vuori on yksi Kamtšatkan '
          + 'aktiivisimmista, ja se on purkautunut lähes yhtäjaksoisesti vuodesta '
          + '1996 lähtien. Vuori sijaitsee vanhemman, suuremman kalderan sisällä, '
          + 'joka syntyi noin 7 600 vuotta sitten.',
      },
    ],
  },
  {
    tunnus: 'tarawa', nimi: 'Tarawan atollit', seutu: 'Kiribati', lat: 1.5, lon: 173,
    selite: 'Matalat koralliatollit Tyynellämerellä ovat sekä Kiribatin sydän '
            + 'että ilmastonmuutoksen etulinja.',
    oletus: 'iss053e180184',
    kuvat: [
      {
        id: 'iss053e180184',
        teksti: 'Abaiangin, Tarawan ja Maianan atollit kuvattuna marraskuussa 2017 '
          + 'muodostavat vihreänsinisen ketjun keskelle Tyyntämerta. Yhdessä ne '
          + 'ovat osa Kiribatin 33 koralliatollin ja saaren joukkoa. Tarawa oli '
          + 'näyttämönä toisen maailmansodan verisimpiin taisteluihin kuuluneelle '
          + 'Tarawan taistelulle marraskuussa 1943.',
      },
    ],
  },
  {
    tunnus: 'wake-island', nimi: 'Waken saari', seutu: 'Tyynimeri, Yhdysvallat', lat: 19.28, lon: 166.65,
    selite: 'Yksinäinen koralliatolli keskellä Tyyntämerta toimi '
            + 'lentotukikohtana jo ennen toista maailmansotaa.',
    oletus: 'iss033e007873',
    kuvat: [
      {
        id: 'iss033e007873',
        teksti: 'Waken atollin vaaleanturkoosi laguuni erottuu selvästi tummansinistä '
          + 'valtamerta vasten. Atollin muodostavat kolme pientä saarta noin 4 '
          + '000 kilometrin päässä Havaijista. Japani valtasi Waken joulukuussa '
          + '1941 lyhyen mutta ankaran taistelun jälkeen, ja saari pysyi '
          + 'japanilaismiehityksessä koko sodan ajan.',
      },
    ],
  },
  {
    tunnus: 'bassac-vietnam', nimi: 'Bassac-joen suisto', seutu: 'Vietnam', lat: 9.55, lon: 106.23,
    selite: 'Mekongin toiseksi suurin haara jakautuu hedelmätarhojen ja '
            + 'mangrovemetsien ympäröimäksi jokisaareksi ennen Etelä-Kiinan '
            + 'merta.',
    oletus: 'iss073e0818427',
    kuvat: [
      {
        id: 'iss073e0818427',
        teksti: 'Bassac-joki – Mekongin yksi yhdeksästä \'lohikäärmehaarasta\' – '
          + 'kiertää Cù Lao Dungin jokisaarta ruskeana ja sedimenttipitoisena '
          + 'juuri ennen laskuaan mereen. Vasemmalla näkyy tummempaa maata ja '
          + 'oikealla vihreämpää viljelysmaata ja hedelmätarhoja. Sameus syntyy '
          + 'Mekongin koko valuma-alueelta kertyneestä liejusta, jota vuorovesi '
          + 'sekoittaa edelleen suulla.',
      },
    ],
  },
  {
    tunnus: 'kenya-rift', nimi: 'Kenian riftilaakso', seutu: 'Kenia', lat: -1.87, lon: 36.28,
    selite: 'Itä-Afrikan hautavajoama repii mannerta kahtia ja jättää jälkeensä '
            + 'värikkäitä soodajärviä.',
    oletus: 'iss030e035487',
    kuvat: [
      {
        id: 'iss030e035487',
        teksti: 'Kenian riftilaakson rinnakkaiset murroslinjat viiruttavat maastoa '
          + 'vinosti kuvan poikki, ja keskellä hohtaa vaaleanpunertava '
          + 'soodajärvi. Laakso on osa Itä-Afrikan hautavajoamaa, joka syntyy, '
          + 'kun Afrikan ja Somalian mannerlaatat vetäytyvät hitaasti erilleen. '
          + 'Miljoonien vuosien kuluessa liike voi lopulta halkaista Afrikan ja '
          + 'synnyttää alueelle uuden valtameren.',
      },
    ],
  },
  {
    tunnus: 'sahara-dust-western', nimi: 'Länsi-Saharan pölymyrsky', seutu: 'Länsi-Sahara', lat: 24, lon: -13.5,
    selite: 'Saharasta nouseva pölypilvi peittää rannikon ja kulkeutuu edelleen '
            + 'Atlantin ylle.',
    oletus: 'iss007e08259',
    kuvat: [
      {
        id: 'iss007e08259',
        teksti: 'Vaaleanruskea pölypilvi peittää Länsi-Saharan rannikon ja leviää '
          + 'pilvien lomasta kohti Atlantin valtamerta ja Kanariansaaria. Sahara '
          + 'nostaa ilmakehään valtavia määriä hienoa pölyä, joka voi kulkeutua '
          + 'tuhansien kilometrien päähän saakka Amazonin sademetsään asti. Pöly '
          + 'tuo mukanaan fosforia, joka lannoittaa sademetsän köyhää maaperää.',
      },
    ],
  },
  {
    tunnus: 'baghdad-yolla', nimi: 'Bagdad yöllä', seutu: 'Irak', lat: 33.3152, lon: 44.3661,
    selite: 'Tigris-joen mutka kiemurtelee kirkkaana miljoonakaupungin '
            + 'valomeren keskellä.',
    oletus: 'iss073e0515117',
    kuvat: [
      {
        id: 'iss073e0515117',
        teksti: 'Bagdadin valot piirtävät kaupungin ääriviivat, ja niiden keskeltä '
          + 'erottuu Tigris-joen tumma S-mutka. Bagdad perustettiin vuonna 762 '
          + 'Abbasidien kalifikunnan pääkaupungiksi, ja siitä tuli pian yksi '
          + 'keskiajan maailman suurimmista ja oppineimmista kaupungeista. '
          + 'Nykyään Bagdadissa asuu yli seitsemän miljoonaa ihmistä, ja se on '
          + 'edelleen Irakin pääkaupunki.',
      },
    ],
  },
  {
    tunnus: 'malaspina', nimi: 'Malaspina', seutu: 'Alaska, Yhdysvallat', lat: 59.87, lon: -140.5,
    selite: 'Maailman suurin niin sanottu jalustajäätikkö, joka levittäytyy '
            + 'vuorten juurelta leveäksi jäälakeudeksi rannikolle.',
    oletus: 'STS066-117-014',
    kuvat: [
      {
        id: 'STS066-117-014',
        teksti: 'Jäätikön pinnalla kiemurtelee tummia raitoja: ne ovat moreeneja, '
          + 'kivi- ja soravöitä, jotka syntyvät kun useampi vuoristojäätikkö '
          + 'yhtyy samaksi jäälevyksi rannikkotasangolla. Malaspina on niin '
          + 'laaja, että se peittäisi kokonaisen pienen osavaltion. Kuva otettiin '
          + 'sukkula Atlantiksen STS-66-lennolta marraskuussa 1994.',
      },
    ],
  },
  {
    tunnus: 'makgadikgadin-altaat', nimi: 'Makgadikgadin suola-altaat', seutu: 'Botswana', lat: -20.6, lon: 26.08,
    selite: 'Yksi maailman suurimmista suolatasangoista, jonka reunalla '
            + 'altaissa haihdutetaan soodaa ja suolaa punaisten suolarakkojen '
            + 'värjäämästä suolavedestä.',
    oletus: 'iss014e15732',
    kuvat: [
      {
        id: 'iss014e15732',
        teksti: 'Geometriset haihdutusaltaat reunustavat Makgadikgadin suolatasankoa: '
          + 'tummanpunaiset lammikot ovat suolaa rakastavien levien värjäämiä, ja '
          + 'niiden reunoille on kiteytynyt valkoista soodaa ja suolaa. Suolavesi '
          + 'pumpataan pinnan alta ja haihdutetaan alueen aurinkoisessa '
          + 'ilmastossa. Tuotanto on jatkunut samalla paikalla vuodesta 1991 '
          + 'lähtien.',
      },
    ],
  },
  {
    tunnus: 'kaukasusvuoret', nimi: 'Kaukasusvuoret', seutu: 'Azerbaidžan ja Venäjä', lat: 41.05, lon: 47,
    selite: 'Euroopan ja Aasian rajalla kohoava lumihuippuinen vuorijono, jonka '
            + 'juurella lepää Kaukasuksen suurin tekojärvi.',
    oletus: 'iss071e041651',
    kuvat: [
      {
        id: 'iss071e041651',
        teksti: 'Lumipeitteiset Kaukasuksen huiput kohoavat Azerbaidžanin ja Venäjän '
          + 'rajaseudulla, ja kuvan yläreunassa kimaltaa Mingečaurin tekojärvi. '
          + 'Se on Kaukasuksen suurin allas, ja sitä käytetään kalastukseen, '
          + 'juomaveden hankintaan ja peltojen kasteluun. Kuva otettiin '
          + 'huhtikuussa 2024 avaruusaseman kiertäessä noin 415 kilometrin '
          + 'korkeudessa.',
      },
      {
        id: 'iss023e035670',
        teksti: 'Sama tekojärvi lähempää, neljätoista vuotta aiemmin kuvattuna. '
          + 'Mingečaurin allas täyttää Kuran laakson syvennystä Suur- ja '
          + 'Vähä-Kaukasuksen välissä, ja sen rannat on jaettu selkeisiin, '
          + 'suorakulmaisiin viljelylohkoihin.',
      },
    ],
  },
  {
    tunnus: 'guadalupen-pyorteet', nimi: 'Guadalupen saaren pyörteet', seutu: 'Tyynimeri, Meksiko', lat: 29.03, lon: -118.27,
    selite: 'Tulivuorisaari, jonka jyrkkä huippu pysäyttää matalan '
            + 'pilvikerroksen virtauksen ja synnyttää toistuvasti näyttäviä '
            + 'pilvipyörteiden ketjuja.',
    oletus: 'iss036e035663',
    kuvat: [
      {
        id: 'iss036e035663',
        teksti: 'Guadalupen saaren korkea, tulivuorinen selänne katkaisee tasaisen '
          + 'pilvikerroksen virtauksen, ja saaren tuulen alle syntyy pyörteiden '
          + 'ketju eli von Kármánin pyörrekatu. Ilmiö on nimetty Theodore von '
          + 'Kármánin mukaan, joka kuvasi sen ensimmäisenä ja oli myöhemmin '
          + 'perustamassa NASAn JPL-tutkimuskeskusta. Pyörteiden sarja jatkuu '
          + 'satoja kilometrejä saaren taakse.',
      },
      {
        id: 'iss040e016570',
        teksti: 'Sama saari lähes suoraan ylhäältä kuvattuna vajaan vuoden kuluttua. '
          + 'Pyörteet ovat nyt kiertyneet tiukemmiksi spiraaleiksi; niiden tarkka '
          + 'muoto riippuu kulloisestakin tuulen nopeudesta ja pilvikerroksen '
          + 'paksuudesta.',
      },
    ],
  },
  {
    tunnus: 'kanariansaarten-pyorteet', nimi: 'Kanariansaarten pyörteet', seutu: 'Atlantti, Espanja', lat: 28.3, lon: -16.5,
    selite: 'Saariketju, jonka tulivuorihuiput pysäyttävät passaatituulen '
            + 'alapilvet ja synnyttävät toistuvia pyörrekatuja valtamerelle.',
    oletus: 's40-75-003',
    kuvat: [
      {
        id: 's40-75-003',
        teksti: 'Yksi Kanariansaarista lepää matalan pilvikerroksen keskellä kuin '
          + 'reikä valkoisessa peitteessä, ja sen taakse kiertyy peräkkäisiä '
          + 'pyörteitä. Passaattituulten yllä oleva lämmin ilmakerros lukitsee '
          + 'pilvet matalalle, jolloin saaren jyrkkä huippu muokkaa virtausta '
          + 'selvästi näkyväksi kuvioksi. Kuva otettiin sukkula Columbian '
          + 'STS-40-lennolla kesäkuussa 1991.',
      },
    ],
  },
  {
    tunnus: 'zagrosvuoret', nimi: 'Zagrosvuoret', seutu: 'Iran', lat: 33.5, lon: 46.7,
    selite: 'Iranin ylängön reunalla kohoava poimuvuoristo, jonka rinteet '
            + 'piirtyvät avaruudesta kuin sormenjäljet.',
    oletus: 'iss074e0315889',
    kuvat: [
      {
        id: 'iss074e0315889',
        teksti: 'Kalliokerrokset ovat taittuneet mannerlaattojen puristuksessa '
          + 'pitkiksi, yhdensuuntaisiksi harjanteiksi. Kuvan yläreunassa '
          + 'harjanteiden laet kohoavat lumirajan yläpuolelle. Poimut ovat '
          + 'syntyneet, kun Arabian laatta on työntynyt hitaasti Euraasian '
          + 'laattaa vasten miljoonien vuosien ajan.',
      },
    ],
  },
  {
    tunnus: 'lasvegas-yolla', nimi: 'Las Vegas yöllä', seutu: 'Nevada, Yhdysvallat', lat: 36.17, lon: -115.14,
    selite: 'Aavikkokaupunki, jonka suorakulmainen katuverkko ja kirkkaasti '
            + 'valaistu Strip erottuvat yöllä selvästi ympäröivästä pimeästä '
            + 'autiomaasta.',
    oletus: 'iss026e006255',
    kuvat: [
      {
        id: 'iss026e006255',
        teksti: 'Las Vegasin kaupunkialue täyttää laakson Mojaven aavikon keskellä, '
          + 'ja kadut piirtävät säännöllisen ruudukon. Kirkkain, valkoinen '
          + 'valokimppu keskellä kuvaa on kuuluisa Strip, jonka kasinot ja '
          + 'hotellit ovat auki ympäri vuorokauden. Kaupungin ympärillä alkaa '
          + 'heti asumaton, pimeä aavikko.',
      },
    ],
  },
  {
    tunnus: 'iberia-yolla', nimi: 'Iberian niemimaa yöllä', seutu: 'Espanja ja Portugali', lat: 40, lon: -4.5,
    selite: 'Koko niemimaa yöllä: kaksi pääkaupunkia erottuu kirkkaimpina '
            + 'pisteinä valoverkon keskellä.',
    oletus: 'iss030e010008',
    kuvat: [
      {
        id: 'iss030e010008',
        teksti: 'Espanjan ja Portugalin rannikot ja kaupungit piirtyvät oranssina '
          + 'valoverkkona. Madrid hehkuu kirkkaana pisteenä niemimaan keskellä, '
          + 'ja Lissabon loistaa rannikolla oikealla. Ilmakehän vihertävä hehku '
          + 'erottuu selvästi horisontin yllä.',
      },
    ],
  },
  {
    tunnus: 'labradorin-jaameri', nimi: 'Labradorin merijää', seutu: 'Kanada', lat: 54, lon: -57,
    selite: 'Kylmä Labradorin virta kuljettaa merijäätä ja jäävuoria etelään, '
            + 'ja jään reunalla näkyvät virtausten piirtämät pyörteet.',
    oletus: 'iss070e086805',
    kuvat: [
      {
        id: 'iss070e086805',
        teksti: 'Merijää ajelehtii Labradorin rannikolla virtausten mukana, ja jään '
          + 'reuna piirtää näkyviin pyörteitä ja raitoja. Kuvan otti astronautti '
          + 'Loral O\'Hara käsikamerallaan helmikuussa 2024. Saman talven aikana '
          + 'Arktiksen merijää kasvoi tutkijoiden mukaan tavallista hitaammin.',
      },
    ],
  },
  {
    tunnus: 'lake-sharpe', nimi: 'Lake Sharpe ja kastelurenkaat', seutu: 'Etelä-Dakota, Yhdysvallat', lat: 44.07, lon: -99.57,
    selite: 'Missourijoen entinen mutka padottiin tekojärveksi, ja sen '
            + 'niemekkeelle piirtyy pyöreiden keskipistekastelukoneiden kuvio.',
    oletus: 'iss038e023651',
    kuvat: [
      {
        id: 'iss038e023651',
        teksti: 'Missourijoen entinen mutka on nyt Lake Sharpe -tekojärven lahti, ja '
          + 'sen sisäkaarteeseen jäänyt niemeke on täynnä pyöreitä '
          + 'keskipistekastelun kenttiä. Missourijoki on Pohjois-Amerikan pisin '
          + 'joki, ja sen alajuoksua on padottu useaan otteeseen 1900-luvulla. '
          + 'Kuva otettiin joulukuussa 2013, ennen talven lumia.',
      },
    ],
  },
  {
    tunnus: 'new-orleans-mutka', nimi: 'New Orleans ja joen mutka', seutu: 'Louisiana, Yhdysvallat', lat: 29.95, lon: -90.07,
    selite: 'Mississippijoki kiemurtelee kaupungin läpi niin jyrkästi, että New '
            + 'Orleansia kutsutaan Puolikuun kaupungiksi.',
    oletus: 'iss039e001640',
    kuvat: [
      {
        id: 'iss039e001640',
        teksti: 'Mississippijoen ruskea vesi kiertää New Orleansin keskustan läpi '
          + 'kahdessa jyrkässä mutkassa. Oikeassa alakulmassa Pontchartrain-järvi '
          + 'kimaltaa auringon heijastuksessa. Kuva on otettu 400 millimetrin '
          + 'polttovälillä maaliskuussa 2014.',
      },
    ],
  },
  {
    tunnus: 'rio-negro-mutkat', nimi: 'Río Negron mutkat', seutu: 'Patagonia, Argentiina', lat: -40.5, lon: -63.5,
    selite: 'Yksi Etelä-Amerikan mutkittelevimmista joista kiemurtelee '
            + 'Patagonian tasangon poikki lukemattomina hylättyinä lenkkeinä.',
    oletus: 'iss022e019513',
    kuvat: [
      {
        id: 'iss022e019513',
        teksti: 'Río Negron nykyinen uoma ja lukuisat entiset jokilenkit erottuvat '
          + 'tummina käyrinä kuivalla tasangolla. Yksi hylätyistä lenkeistä '
          + 'hohtaa oranssina, todennäköisesti kuivuneen kasvillisuuden '
          + 'värjäämänä. Joki tunnetaan astronauttien keskuudessa juuri '
          + 'poikkeuksellisen mutkittelevasta uomastaan.',
      },
    ],
  },
  {
    tunnus: 'ebron-suisto', nimi: 'Ebron suisto', seutu: 'Espanja', lat: 40.72, lon: 0.72,
    selite: 'Riisiviljelysten pilkkoma suisto, jossa joen makea vesi ja '
            + 'Välimeren suolainen vesi kohtaavat.',
    oletus: 'iss009e09985',
    kuvat: [
      {
        id: 'iss009e09985',
        teksti: 'Ebro-joki laskee Välimereen kolmiomaisena suistona, jonka pintaa '
          + 'peittävät geometriset riisipellot. Kuva on otettu auringon '
          + 'kimmellyksessä, joka paljastaa joen makean veden rajapinnan '
          + 'suolaisempaa merta vasten. Yläjuoksun padot ovat vähentäneet '
          + 'suistoon päätyvän veden ja kiintoaineksen määrää.',
      },
    ],
  },
  {
    tunnus: 'selengan-suisto', nimi: 'Selengajoen suisto', seutu: 'Burjatia, Venäjä', lat: 52.16, lon: 106.5,
    selite: 'Baikal-järven suurimman sivujoen suisto, joka suodattaa vettä '
            + 'ennen kuin se päätyy järveen.',
    oletus: 'iss029e037915',
    kuvat: [
      {
        id: 'iss029e037915',
        teksti: 'Selengajoki haarautuu lukemattomiksi kanaviksi ja koukeroisiksi '
          + 'harjanteiksi ennen laskuaan Baikal-järveen. Tuore lumi korostaa '
          + 'suiston lohkomaista, viuhkamaista muotoa. Suiston laajuus ja muoto '
          + 'riippuvat siitä, kuinka paljon kiintoainesta joki kuljettaa '
          + 'mukanaan.',
      },
    ],
  },
  {
    tunnus: 'texasin-kastelurenkaat', nimi: 'Länsi-Texasin kastelurenkaat', seutu: 'Texas, Yhdysvallat', lat: 32, lon: -102.1,
    selite: 'Permin altaan öljynporausalue ja pyöreät kastelupellot limittyvät '
            + 'samalle kuivalle tasangolle.',
    oletus: 'iss074e0603632',
    kuvat: [
      {
        id: 'iss074e0603632',
        teksti: 'Satoja pyöreitä keskipistekastelun kenttiä peittää Länsi-Texasin '
          + 'tasankoa, ja niiden joukossa erottuu öljynporauslaitteita ja teitä '
          + 'vaaleina pilkkuina. Alue lepää Permin altaan päällä, joka on yksi '
          + 'maailman tuottavimmista öljyesiintymistä. Kastelu tekee viljelyn '
          + 'mahdolliseksi muuten kuivalla aavikkoalueella.',
      },
    ],
  },
  {
    tunnus: 'ningaloo-riutta', nimi: 'Ningaloo-riutta', seutu: 'Länsi-Australia', lat: -22.7, lon: 113.85,
    selite: 'Mantereen laidalle kasvanut reunariutta erottaa turkoosin '
            + 'matalikon syvästä valtamerestä pitkän niemen länsipuolella.',
    oletus: 'sts067-722a-053',
    kuvat: [
      {
        id: 'sts067-722a-053',
        teksti: 'Ningaloo-riutta kulkee ohuena turkoosina reunuksena Luoteisniemen '
          + 'länsirannalla aivan mantereen laidassa. Niemen itäpuolella avautuu '
          + 'Exmouth-lahti, jonka sameaan veteen hurrikaani Bobbyn tulvat olivat '
          + 'huuhtoneet punaista mutaa viikkoa aiemmin. Riutta on yksi harvoista '
          + 'suurista koralliriutoista, jotka kasvavat kiinni mantereeseen '
          + 'kaukana avomerellä sijaitsevien riuttojen sijaan.',
      },
    ],
  },
];

/**
 * HTTPS PÄÄLLE. NASAn asset-rajapinta palauttaa osoitteet http-muodossa,
 * ja selain estäisi ne peliin (sekasisältö) — kuva jäisi tyhjäksi. Sama
 * palvelin vastaa https:llä, joten osoite korjataan tässä kerran, eikä
 * pelin tarvitse tietää asiasta mitään.
 */
export function https(osoite) {
  return String(osoite ?? '').replace(/^http:\/\//i, 'https://');
}

/** Kuvaustapa kuvatunnuksesta: iss074e… → avaruusasema. */
export function kuvaustapa(id) {
  if (/^iss\d+/i.test(id)) return 'Kansainväliseltä avaruusasemalta';
  if (/^sts/i.test(id)) return 'Avaruussukkulasta';
  if (/^sl\d/i.test(id)) return 'Skylab-avaruusasemalta';
  return 'NASAn miehitetyltä lennolta';
}

/** Retkikunta kuvatunnuksesta: iss074e0459342 → "Retkikunta 74". */
export function retkikunta(id) {
  const m = String(id).match(/^iss(\d{2,3})e/i);
  return m ? `Retkikunta ${Number(m[1])}` : null;
}

/**
 * Kuvausaika siistittynä.
 *
 * NASAn `date_created` on näissä kuvissa lähes aina pelkkä päivä
 * keskiyöksi merkittynä (…T00:00:00Z). Kellonaikaa EI keksitä: jos se
 * on tasan keskiyö, tallennetaan pelkkä päivä, ja linssin `aikateksti`
 * jättää kellonajan silloin pois. Jos aineistossa joskus on oikea
 * kellonaika, se säilyy sellaisenaan.
 */
export function siistiAika(iso) {
  const t = String(iso ?? '');
  const m = t.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  if (!m) return t.slice(0, 10);
  if (m[2] === '00' && m[3] === '00' && m[4] === '00') return m[1];
  return `${m[1]}T${m[2]}:${m[3]}:${m[4]}Z`;
}

async function haeJson(osoite) {
  const vastaus = await fetch(osoite);
  if (!vastaus.ok) throw new Error(`${vastaus.status} ${osoite}`);
  return vastaus.json();
}

/** Vastaako osoite 200:lla? Kuvaa ei ladata, vain otsikot. */
async function kuvaVastaa(osoite) {
  try {
    const vastaus = await fetch(osoite, { method: 'HEAD' });
    return vastaus.ok;
  } catch {
    return false;
  }
}

/** Rinnakkaishaku pienissä erissä, jottei rajapinta tukkeudu. */
async function erissa(lista, tyo, koko = 8) {
  const ulos = [];
  for (let i = 0; i < lista.length; i += koko) {
    // eslint-disable-next-line no-await-in-loop
    ulos.push(...await Promise.all(lista.slice(i, i + koko).map(tyo)));
  }
  return ulos;
}

/** Yhden kuvan tiedot NASAn rajapinnasta, tai null jos se ei kelpaa. */
export async function haeKuva({ id, teksti }) {
  const haku = await haeJson(`${RAJAPINTA}/search?nasa_id=${encodeURIComponent(id)}`);
  const tietue = haku.collection?.items?.[0];
  if (!tietue) return null;
  const d = tietue.data?.[0] ?? {};
  const linkit = await haeJson(`${RAJAPINTA}/asset/${encodeURIComponent(id)}`);
  const osoitteet = (linkit.collection?.items ?? []).map((i) => https(i.href));
  const kuva = osoitteet.find((h) => /~large\.jpg$/i.test(h));
  const pikku = osoitteet.find((h) => /~small\.jpg$/i.test(h))
    ?? osoitteet.find((h) => /~thumb\.jpg$/i.test(h));
  if (!kuva || !pikku) return null;
  if (!await kuvaVastaa(kuva) || !await kuvaVastaa(pikku)) return null;
  const iso = (tietue.links ?? []).find((l) => /~large\.jpg$/i.test(l.href ?? ''));
  return {
    id,
    aika: siistiAika(d.date_created),
    teksti,
    kuvaustapa: kuvaustapa(id),
    retkikunta: retkikunta(id),
    kuvaaja: d.photographer || null,
    mitat: iso?.width && iso?.height ? [iso.width, iso.height] : null,
    kuva: KUVAPOIKKEUKSET.has(id) ? `${OMA_AMPARI}${id}~large.jpg` : https(kuva),
    pikku: KUVAPOIKKEUKSET.has(id) ? `${OMA_AMPARI}${id}~small.jpg` : https(pikku),
    sivu: `${KUVASIVU}${id}`,
  };
}

async function main() {
  process.stdout.write(`Haetaan NASAn kuvakirjastosta: ${RAJAPINTA}\n`);
  const kohteet = [];
  for (const k of KOHTEET) {
    // eslint-disable-next-line no-await-in-loop
    const havainnot = (await erissa(k.kuvat, async (kuva) => {
      try { return await haeKuva(kuva); } catch (e) {
        process.stdout.write(`  !! ${kuva.id}: ${e.message}\n`);
        return null;
      }
    })).filter(Boolean);
    if (!havainnot.length) {
      process.stdout.write(`  !! ${k.tunnus}: yksikään kuva ei vastannut\n`);
      continue;
    }
    havainnot.sort((a, b) => (a.aika < b.aika ? -1 : 1));
    const oletus = havainnot.some((h) => h.id === k.oletus) ? k.oletus : havainnot[0].id;
    kohteet.push({
      tunnus: k.tunnus,
      nimi: k.nimi,
      seutu: k.seutu,
      selite: k.selite,
      lat: k.lat,
      lon: k.lon,
      oletus,
      havainnot,
    });
    process.stdout.write(`  ${k.tunnus}: ${havainnot.length} kuvaa, oletus ${oletus}\n`);
  }

  const paiva = new Date().toISOString().slice(0, 10);
  const sisalto = '/*\n'
    + ' * SATELLIITTILINSSIN KUVAT — KONEELLISESTI TUOTETTU TIEDOSTO.\n'
    + ' *\n'
    + ' * Älä muokkaa käsin: aja tools/hae-satelliittihavainnot.mjs, joka\n'
    + ' * lukee NASAn kuvakirjaston rajapinnasta astronauttien ottamien\n'
    + ' * Maa-kuvien osoitteet ja kuvaustiedot ja tarkistaa jokaisen\n'
    + ' * osoitteen. Kohteet ja suomenkieliset kuvatekstit ovat työkalun\n'
    + ' * KOHTEET-luettelossa, ja ne on valittu kuvat katsomalla.\n'
    + ' *\n'
    + ' * NASAn kuvat ovat public domainia; kuvat EIVÄT ole repossa vaan\n'
    + ' * ladataan NASAn omasta ämpäristä.\n'
    + ' *\n'
    + ` * Haettu: ${paiva}. Kohteita ${kohteet.length}, kuvia `
    + `${kohteet.reduce((s, k) => s + k.havainnot.length, 0)}.\n`
    + ' */\n\n'
    + `export const SATELLIITTI_LAHDE = ${JSON.stringify({
      aineisto: 'Astronauttien Maa-kuvat',
      tekija: 'NASA',
      lisenssi: 'Public domain',
      osoite: 'https://images.nasa.gov/',
      katalogi: `${RAJAPINTA}/search?media_type=image`,
      haettu: paiva,
    }, null, 2)};\n\n`
    + `export const SATELLIITTI_KOHTEET = ${JSON.stringify(kohteet, null, 2)};\n`;
  const polku = join(JUURI, 'js/linssit/satelliitti-data.js');
  writeFileSync(polku, sisalto);
  process.stdout.write(`Kirjoitettu ${polku}\n`);
}

if (process.argv[1] && process.argv[1].endsWith('hae-satelliittihavainnot.mjs')) {
  await main();
}
