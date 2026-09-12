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
    kuva: https(kuva),
    pikku: https(pikku),
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
