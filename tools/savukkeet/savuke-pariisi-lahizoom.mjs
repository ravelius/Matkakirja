/*
 * Savuke: PARIISIN LÄHIZOOMI — nimiön ruutupikselikatto, rykelmän
 * näkyvyys ja luentakuvapakan piilotus.
 *
 * OMISTAJA 16.9.2026 klo 16.05 UTC (Raamattu, KARTTAUUDISTUKSEN
 * PAATOKSET 31, iPhone-kuva Pariisista lähizoomilla), sanatarkasti:
 * *"Piilotetaan nuo kuvat kartalta toistaiseksi. Täytyy miettiä niille
 * joku parempi paikka. Mutta miksi tuolla Pariisin alueella ei näy
 * niitä nostoja, enkä pysty noitakaan klikkaamaan?"* — ja korjaus
 * samana päivänä: *"pystyn kyllä noita näkyviä nostoja klikkaamaan,
 * mutta ilmeisesti iso osa nostoista on jossain piilossa."*
 *
 * ── MITÄ TÄMÄ MITTAA, JA MIKSI JUURI SEN ──────────────────────────
 *
 * Vika ei ollut yksi vaan kolme, ja kaikki kolme näkyvät vasta
 * PUHELIMEN SISIMMÄLLÄ zoomilla — siinä, mihin uloszoomauksen esto
 * (js/pallolauta/lauta.js maanZoomiraja) päästää pelaajan, kun hän
 * nipistää Pariisiin niin lähelle kuin peli sallii (mitattu 390 × 844:
 * osuus 0,341 uloimmasta). Savuke ajaa kameran sinne asti ja mittaa
 * vasta siellä: välitasolla mikään näistä ei vielä riko mitään.
 * Työpöydällä zoomataan SAMAAN karttamittaan eikä pohjaan asti (ks.
 * LAHIZOOMIN_TAVOITE), jotta molemmat ruudut mittaavat samaa ilmiötä.
 *
 * ── VARTIOT (390 × 844 ja 1400 × 900, dpr 2) ──────────────────────
 *
 *   1.  NIMIÖ EI KASVA YLI KATON. Jokaisen kartalla olevan noston ja
 *       kaupunkimerkin nimiön kirjasinkoko RUUDULLA on lähizoomissa
 *       enintään NIMION_KATTO_PX (js/pallolauta/nostot.js
 *       NOSTON_NIMIO_KATTO_PX). Koko luetaan siitä `scale()`-
 *       muunnoksesta, jonka kerros oikeasti kirjoittaa, kerrottuna
 *       nimiön kirjasinkoolla (NOSTOSYM_NIMIO_KOKO).
 *   1b. VASTAKOE: sama kerroin ilman kattoa antaisi yli
 *       VASTAKOKEEN_RAJA_PX:n nimiön. Ilman tätä vartio 1 menisi läpi
 *       myös silloin, jos kartta ei olisi zoomannut lainkaan.
 *   1c. SAAPUMISNÄKYMÄSSÄ NIMIÖ EI OLE KUTISTUNUT. Kaupunkimerkin
 *       nimiö on saapuessa vähintään SAAPUMISEN_VAHIN_PX (PAATOKSET
 *       25 kohta 2: *"Isommaksi, n. 11-12 px"*) — katto ei siis saa
 *       purra siellä, missä mitään ei ollut vikana.
 *   2.  NIMIÖ MAHTUU RUUDULLE. Yhdenkään kartalla olevan noston
 *       nimiölaatikko ei leikkaudu kotelon laidasta lähizoomissa.
 *   3.  PARIISIN RYKELMÄSTÄ EI KATOA YKSIKÄÄN NOSTO. Jokainen
 *       PARIISIN_NOSTOT-rivi on lähizoomissa joko oma elävä merkkinsä
 *       (DOM + osumalaatikko), aihemerkin jäsen tai laattaan poltettua
 *       mustetta (jolla ei OLE DOM-elementtiä mutta joka on ruudulla
 *       ja osumalistalla) — mikään näistä kolmesta ei tarkoita
 *       piilossa olevaa sisältöä, mutta neljäs vaihtoehto tarkoittaa.
 *   3b. RYKELMÄ ON YHÄ RYKELMÄ, JOTEN AIHEMERKKEJÄ ON. Ryhmitys
 *       seuraa limitystä eikä zoomiporrasta (PAATOKSET 27 kohta 3),
 *       ja Pariisin nostojen LYHIN keskinäinen ruutuväli on
 *       sisimmälläkin zoomilla 39,2 px eli alle sormen 44 px:n
 *       (mitattu 16.9.2026) — aihemerkkejä on siis oltava vähintään
 *       AIHEMERKKEJA_VAHINTAAN.
 *   3d. AIHENOSTOJA ON TÄSMÄLLEEN NIIN MONTA KUIN PARIISISSA ON
 *       AIHEITA, JOILLA ON ≥ 2 NOSTOA (PAATOKSET 27 TARKENNUS 2
 *       kohta 7, omistaja 16.9.2026 klo 19.00 UTC: saman kaupungin
 *       saman aiheen nostot yhdistetään AINA *"zoomista riippumatta -
 *       ei vain limityksen perusteella"*). Odotus lasketaan RUUDULLA
 *       olevista Pariisin nostoista eikä kirjoiteta vakioksi: joukko
 *       riippuu siitä, mitkä nostot ovat poltettuja. Mitataan sekä
 *       saapumisnäkymässä että lähizoomissa — sääntö ei saa riippua
 *       zoomista.
 *   3e. JOKAISELLA AIHENOSTOLLA ON NIMIÖ MUOTOA "Nimi…" (kohta 8:
 *       *"tarkeimman noston nimella ja laittaa loppuun vain kolme
 *       pistetta"*), ja nimiön runko on ryhmän ensimmäisen jäsenen
 *       nimen alkuosa. Tärkein on paketin ensimmäinen LADONNASSA
 *       (js/pallolauta/nostot.js `ladontaNro`), ei ruudulla, joten
 *       nimi on sama saapumisnäkymässä ja lähizoomissa. Lukumäärää ei
 *       ole (3e2: `.pallolauta-aihemerkki-luku` on 0 kappaletta).
 *   3e3. OMISTAJAN OMA ESIMERKKI: Pariisin skandaalirykelmän
 *       aihenoston nimiö on *"Mona Lisan varkaus…"* — sanatarkasti se
 *       nimi, jonka omistaja kirjoitti tarkennukseen.
 *   3f. YKSINÄINEN SAMAN AIHEEN NOSTO PYSYY OMANA NOSTONAAN ja
 *       MAASTOKOHDE EI YHDISTY (kohdat 9 ja 6): yhdenkään aihenoston
 *       jäsenenä ei ole maastokohdetta, ja aihe, jolla on Pariisissa
 *       vain yksi nosto, ei saa aihenostoa.
 *   3e4. NIMIÖ MYÖS NÄKYY LÄHIZOOMISSA: sovittelun viimeinen keino on
 *       lapun piilotus, eikä yhdenkään Pariisin aihenoston nimiö saa
 *       joutua sinne siinä näkymässä, josta päätös tehtiin.
 *   3i. NIMIÖ VAIN LÄHIZOOMISSA (PAATOKSET 27 TARKENNUS 4 kohta 10,
 *       omistaja 17.9.2026 klo 04.15 UTC, kortti *"Nimiö vain
 *       lähizoomissa"*): koko maan SAAPUMISNÄKYMÄSSÄ yhdelläkään
 *       aihenostolla ei ole nimiötä — se on pelkkä symboli — ja
 *       LÄHIZOOMISSA nimiö on jokaisella, kuten ennen. Mitataan
 *       kahdesta lähteestä: kerroksen `nimioNakyy` ja elementin oma
 *       `data-nimio` (aihenimioitaDom).
 *   3i2. VASTAKOE `?aihenimiokynnys=0`: kun kynnys otetaan pois,
 *       nimiöt palaavat saapumisnäkymään (v1927:n tila) — vartio 3i
 *       mittaa siis kynnystä eikä sitä, ettei nimiöitä ole lainkaan.
 *   3h. AIHENOSTOT EIVÄT PEITÄ TOISIAAN LÄHIZOOMISSA enempää kuin
 *       AIHENOSTOJEN_LIMITYSKATTO sallii — ryhmitys ei saa vain
 *       siirtää rykelmän ongelmaa merkkitasolle. Saapumisnäkymän luvut
 *       ovat INFOna (koko Ranska 390 px:ssä).
 *   3g. VASTAKOE `?aihekaupunki=0`: kun kaupungin AINA-yhdistys
 *       otetaan pois, aihenostojen määrä EI enää vastaa aiheiden
 *       määrää — lähizoomissa rykelmä hajoaa ja luku on liian pieni.
 *       Lippu käännetään ilman uutta sivunlatausta
 *       (history.replaceState + uusi ladonta), joten vastakoe mittaa
 *       täsmälleen samaa näkymää kuin vartio 3d.
 *   3c. VASTAKOE `?aihemerkit=0`: ilman ryhmitystä rykelmän nimiöt
 *       menevät SAAPUMISNÄKYMÄSSÄ toistensa päälle (PAATOKSET 27:n
 *       oma limitysmittari; lähizoomin luvut INFOna, koska siellä
 *       ruutupikselikatto jo riittää). Vartio 3b mittaa siis
 *       ryhmityksen ansiota eikä sattumaa.
 *   4.  NAPAUTUS AVAA NOSTON. Kolme nostoa avataan AIDOLLA
 *       napautuksella merkin omasta ruutupisteestä (sivu.mouse.click),
 *       ja jokaisesta avautuu nostokortti. Jos kortin tunnus on
 *       luettavissa (`ui.fokuskohdeAuki`), sen merkin on oltava 44
 *       px:n osumasäteen sisällä napautetusta pisteestä — rykelmässä
 *       lähin merkki saa voittaa, se ON osumasääntö.
 *   4b. Aihemerkin napautus avaa viuhkan, jossa on ryhmän verran
 *       kohtia, ja viuhkan kohdan napautus avaa juuri sen kortin.
 *   5.  LUENTAKUVAPAKKAA EI OLE KARTALLA (PAATOKSET 31 kohta 1):
 *       yhtään näkyvää `.fokusvirta-luentakuva`-paneelia eikä
 *       `.pulucam-kortti`-korttia kartalla saapumisen jälkeen.
 *   6.  MERKIT OVAT TERÄVIÄ. Rasterin tarkkuusporras
 *       (js/fokusnosto-symbolit.js nostosymPorrasNyt) on vähintään
 *       merkin näkyvä tarve `mitta × devicePixelRatio`. Sumeus on
 *       täsmälleen tämän ehdon rikkoutuminen, joten se mitataan
 *       luvuilla eikä kuvavertailulla.
 *   6b. VASTAKOE: oletusporras (NOSTOSYM_PORTAAT[0] = 1,5) EI riitä
 *       samaan tarpeeseen — vartio 6 mittaa siis sitä, että pallo
 *       oikeasti tilaa portaan, eikä sitä että tarve on pieni.
 *   7.  TURISTI-INFON KYLTTI SAA SAMAN KATON (PAATOKSET 31 TARKENNUS
 *       1 kohta 3). Kyltti on js/kaupunkinosto.js:n oma merkki eikä
 *       karttanosto, joten vartiot 1 ja 2 eivät sitä mitanneet: sen
 *       nimiö luetaan omasta elementistään ja sen on oltava enintään
 *       NIMION_KATTO_PX.
 *   7b. KYLTTI MAHTUU RUUDULLE. Sen piirretty ala on kokonaan
 *       kotelossa — juuri se, mikä omistajan kuvassa leikkautui
 *       oikeasta laidasta (*"Turisti-in…"*).
 *   7c. KYLTIN NAPAUTUS AVAA TURISTI-INFON (PAATOKSET 31 TARKENNUS 2
 *       kohta 4). Aito napautus merkin omasta ruutupisteestä avaa
 *       matkailijan oppaan. Rivi oli 16.9.2026 INFO, koska korjaus
 *       vaati omistajan päätöksen siitä, kumpi osumasääntö väistää.
 *   7d. VASTAKOE: katto pois kesken ajon (`?nimiokatto=0`,
 *       js/fokusnosto-symbolit.js) — sama näkymä, sama kyltti, ja
 *       nimiö kasvaa yli TURISTIN_VASTAKOKEEN_RAJA_PX:n.
 *   7e. KYLTIN LAATIKKO ON VAPAA (PAATOKSET 31 TARKENNUS 2 kohta 6).
 *       Yksikään kaupungin nimi eikä yksikään näkyvä nostolappu leikkaa
 *       kyltin varausta. Kaupunkinimi saa siirtyä.
 *   7f. KYLTIN KERROIN ON SAMA KUIN MUILLA MERKEILLÄ (kohta 5): nimiö
 *       on saapuessa KYLTIN_SAAPUMISNIMIO_PX (11,5 px) ja lähizoomissa
 *       katossa (16 px) — sama luku molemmilla ruuduilla.
 *   7g. VASTAKOE: erän säännöt pois (`?kylttiosuma=0&kylttilaatikko=0&
 *       kylttisiirto=0`, js/pallolauta/lauta.js pallonSaantoKaytossa) —
 *       sama napautus ei enää avaa turisti-infoa.
 *   7h. VASTAKOE: samat liput pois — kyltin varaus kutistuu 1 × 1 px:n
 *       pisteeksi ja ladonta latoo lapun kyltin piirroksen päälle.
 *   7i. VASTAKOE: kyltti ei siirry (`?kylttisiirto=0`, PAATOKSET 31
 *       TARKENNUS 3) — kyltti jää ensimmäiseen asentoonsa, ja
 *       INFO-rivi kertoo, mitä se maksaa (aihenoston nimiö katoaa).
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 * Ilman ämpäriä pallon kirjastoa ei saa, ja savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *      node tools/savukkeet/savuke-pariisi-lahizoom.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
import {
  NOSTON_MITTA, NOSTON_NIMIO_KATTO_PX, KAUPUNKIMERKIN_KERROIN, KAUPUNKIMERKIN_NIMIO_PX,
} from '../../js/pallolauta/nostot.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] && process.argv[2] !== '-' ? process.argv[2] : null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAIKKI_RUUDUT = [
  { nimi: 'puhelin', w: 390, h: 844 },
  { nimi: 'tyopoyta', w: 1400, h: 900 },
];
/*
 * YKSI RUUTU KERRALLAAN (`SAVUKE_RUUTU=390`). Kohdennettu uusinta on
 * eri asia kuin koko sarja: kun yksi vartio häilyy tai korjataan, sen
 * ruutu on ajettava uudestaan ilman että toinen ruutu ajetaan turhaan
 * (44 s saapumista + zoomit kumpaakin kohti). Ilman muuttujaa ajetaan
 * molemmat, kuten ennenkin.
 */
const RUUDUT = process.env.SAVUKE_RUUTU
  ? KAIKKI_RUUDUT.filter((r) => String(r.w) === String(process.env.SAVUKE_RUUTU))
  : KAIKKI_RUUDUT;
/**
 * ZOOMATAAN SAMAAN KARTTAMITTAAN MOLEMMILLA RUUDUILLA, EI SAMAAN
 * MÄÄRÄÄN PORTAITA.
 *
 * Uloszoomauksen esto pysähtyy eri kohtiin eri ruuduilla: mitattu
 * Ranskassa 390 × 844 pohja on osuudessa 0,341 uloimmasta, kun
 * 1400 × 900 päästää 0,098:aan. Puolituksin (0,5 → 0,25 → …) ei
 * myöskään voi osua 0,34:ään. Savuke asettaa siksi korkeuden SUORAAN
 * saapumiskorkeuden osuuteen LAHIZOOMIN_TAVOITE: puhelimella
 * uloszoomauksen esto pitää sen omassa pohjassaan (0,341) ja
 * työpöydällä kamera menee juuri siihen. Molemmat ruudut mittaavat
 * silloin saman karttamitan — sen, jonka omistaja näki.
 *
 * VÄLIPORTAAT AJETAAN SILTI, koska ladonta kulkee liikkeen mukana
 * (js/pallolauta/lauta.js LADONNAN_TAHTI_MS) ja yksi jättiloikka
 * jättäisi kerroksen kiinni saapumisnäkymän mittoihin.
 */
const LAHIZOOMIN_TAVOITE = 0.34;
/** Väliportaat saapumiskorkeuden osuuksina, viimeinen on tavoite. */
const ZOOMIPORTAAT = [0.7, 0.5, LAHIZOOMIN_TAVOITE];
/** Nimiön ruutupikselikatto (sama luku kuin kerroksella). */
const NIMION_KATTO_PX = NOSTON_NIMIO_KATTO_PX;
/** Mittausvara kattoon: pyöristys `toFixed(4)`-muunnoksessa. */
const KATON_VARA_PX = 0.1;
/**
 * VASTAKOKEEN RAJA. Ilman kattoa kaupunkimerkin nimiö olisi
 * sisimmällä zoomilla 33,8 px ja noston 25,0 px (mitattu 16.9.2026,
 * 390 × 844 dpr 2). Raja 30 px on näiden välissä: se ei voi mennä
 * läpi vahingossa, ja se vaatii kameran oikeasti zoomanneen.
 */
const VASTAKOKEEN_RAJA_PX = 30;
/**
 * TURISTI-INFON VASTAKOKEEN RAJA. Raja on katto × 1,25 = 20 px: se on
 * selvästi katon (16 px) yläpuolella, joten vastakoe ei voi mennä läpi
 * vahingossa eikä kaadu ruudun kuvasuhteesta. Mitattu 17.9.2026
 * sisimmällä zoomilla ilman kattoa: 33,8 px molemmilla ruuduilla —
 * sama luku, koska kyltin kerroin on nyt sama kuin muilla merkeillä
 * (PAATOKSET 31 TARKENNUS 2 kohta 5). Ennen kohtaa 5 luvut olivat
 * 79,8 px (puhelin) ja 22,97 px (työpöytä).
 */
const TURISTIN_VASTAKOKEEN_RAJA_PX = NOSTON_NIMIO_KATTO_PX * 1.25;
/**
 * KYLTIN NIMIÖ SAAPUMISNÄKYMÄSSÄ (PAATOKSET 31 TARKENNUS 2 kohta 5:
 * *"n. 11,5 px saapuessa, 16 px lähizoomissa, sama molemmilla
 * ruuduilla"*). Luku on kaupunkimerkin oma nimiökoko, koska kyltti
 * käyttää nyt täsmälleen samaa kerrointa (nostonMitta,
 * KAUPUNKIMERKIN_KERROIN) — ei savukkeen omaa vakiota.
 */
const KYLTIN_SAAPUMISNIMIO_PX = KAUPUNKIMERKIN_NIMIO_PX;
/** Kaupunkimerkin nimiö saapumisnäkymässä (PAATOKSET 25 kohta 2). */
const SAAPUMISEN_VAHIN_PX = 11;
/**
 * PARIISIN RYKELMÄ (js/packs/*-fra.js, lähin kaupunki `pariisi`,
 * enintään 3 lautayksikköä kaupungista — sama joukko, jonka omistajan
 * kuvassa olisi pitänyt näkyä). Lista on kirjoitettu auki eikä
 * johdettu, jotta vartio kaatuu myös silloin, kun nosto katoaa
 * DATASTA eikä vain kartalta.
 */
const PARIISIN_NOSTOT = [
  'tuileries', 'bastilji',
  'syvennys-pariisi-tuileriat', 'syvennys-pariisi-kyyhkyposti',
  'syvennys-pariisi-impressionistit',
  'skandaali-mona-lisan-varkaus-1911', 'skandaali-vrain-lucas-kirjevaarennokset',
  'nosto-lustig-eiffel', 'nosto-kirahvin-kavelymatka', 'nosto-carmenin-ensi-ilta',
  'nosto-pariisin-72-nimea', 'nosto-guimardin-metro', 'nosto-notre-damen-kukko',
  'nosto-pariisin-patonki', 'nosto-pariisi-soi', 'nosto-pariisin-vuosisadat',
  'nosto-maalehti-braille', 'nosto-maalehti-pasteur-meister',
  'nosto-maalehti-tour-de-france-1903', 'nosto-maalehti-roland-garros',
  'nosto-maalehti-bouquinistit',
];
/**
 * Aihemerkkejä lähizoomissa vähintään. Mitattu 16.9.2026 (390 × 844):
 * sisimmällä zoomilla syntyy 4 ryhmää (Historia, Kulttuuri ja ruoka,
 * Kauppa ja tekniikka, Skandaalit). Raja on 2, jotta työpöydän
 * väljempi ruutu saa purkaa osan ryhmistä ilman että vartio kaatuu —
 * väite on "rykelmä ryhmittyy yhä", ei tarkka lukumäärä.
 */
const AIHEMERKKEJA_VAHINTAAN = 2;
/** Kaupunki, jonka rykelmää mitataan (js/fokuskohteet.js nostonKaupunkiAvain). */
const KAUPUNKI = 'pariisi';
/** Kolme pistettä on yksi merkki (js/pallolauta/aihemerkit.js). */
const ELLIPSI = '…';
/** Omistajan sanatarkas esimerkki aihenoston nimiöstä (kohta 8). */
const OMISTAJAN_ESIMERKKI = 'Mona Lisan varkaus';
/*
 * AIHENOSTOJEN LIMITYSKATTO. Aihenoston nimi on tärkeämpi kuin
 * täydellinen ladonta (js/pallolauta/sovittelu.js AIHENOSTON NIMI EI
 * KATOA NAAPURIN TAKIA): kun kaksi aihenostoa syntyy muutaman
 * kymmenen pikselin päähän toisistaan ja molempien nimiö on toista
 * sataa pikseliä pitkä, sovittelu valitsee mieluummin naapurin
 * viereen ladotun nimen kuin nimettömän pallon. Katto on siksi
 * MITATTU eikä nolla — luku on kirjattu raporttiin, ja sen KASVU on
 * regressio.
 */
const AIHENOSTOJEN_LIMITYSKATTO = 1;

/**
 * AIHENOSTOJEN ODOTUS LASKETAAN NÄKYMÄSTÄ, EI VAKIOSTA (vartio 3d).
 *
 * PAATOKSET 27 TARKENNUS 2 kohta 7: kaupungin rykelmässä saman aiheen
 * nostot yhdistetään AINA. Odotus on siis *"aiheiden määrä, joilla on
 * Pariisissa vähintään kaksi ryhmittyvää nostoa"* — ja ryhmittyviä
 * ovat elävät kohdenostot, joilla on aihe eivätkä ne ole kaupunkeja,
 * nimikylttejä tai maastokohteita (kohta 6).
 *
 * Ehdokkaat kootaan kahdesta paikasta, koska ryhmään sulautunut nosto
 * EI ole osumalistalla: yksin jääneet luetaan `osumat`ista ja
 * ryhmittyneet aihemerkkien jäsentiedoista.
 *
 * @returns {{ehdokkaat:Array, aiheet:Map<string,number>, odotus:number}}
 */
function rykelmanAiheet(mit) {
  const kelpaa = (r) => r.aihe && !r.poltettu && !r.maasto && !r.kaupunki
    && r.kaupunkiAvain === KAUPUNKI;
  const ehdokkaat = [
    ...mit.osumat.filter((o) => o.perhe === 'nosto' && kelpaa(o)),
    ...mit.aihemerkit.flatMap((a) => a.jasentiedot.filter((j) => kelpaa(j))),
  ];
  const aiheet = new Map();
  for (const r of ehdokkaat) aiheet.set(r.aihe, (aiheet.get(r.aihe) ?? 0) + 1);
  let odotus = 0;
  for (const m of aiheet.values()) if (m >= 2) odotus += 1;
  return { ehdokkaat, aiheet, odotus };
}

/** Pariisin aihenostot (muut kaupungit eivät kuulu tähän vartioon). */
const pariisinAihenostot = (mit) => mit.aihemerkit
  .filter((a) => a.jasentiedot.some((j) => j.kaupunkiAvain === KAUPUNKI));

/** Kartan lyhennys ei katkaise kesken sanan: runko on nimen alkuosa. */
const siisti = (t) => String(t ?? '').trim().replace(/\s+/gu, ' ');

/** Leikkaavatko kaksi ruutulaatikkoa? */
const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
/** Montako nostoa avataan aidolla napautuksella (vartio 4). */
const NAPAUTUKSIA = 3;
/** Rasterin oletusporras (js/fokusnosto-symbolit.js NOSTOSYM_PORTAAT[0]). */
const OLETUSPORRAS = 1.5;
/** Osumasäde ruudulla (js/pallolauta/lauta.js NAPAUTUKSEN_SADE_PX). */
const NAPAUTUKSEN_SADE_PX = 44;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
const p = (v, n = 2) => (Number.isFinite(v) ? v.toFixed(n) : '—');

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://media.matkakirja.app/';
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  peli.tokens.delete(kaupunki);
  return JSON.stringify(peli.toJSON());
}

/** CPU:n hidastuskerroin (`SAVUKE_HIDASTUS`), 1 = ei hidastusta. */
const HIDASTUS = Number(process.env.SAVUKE_HIDASTUS ?? 1) || 1;

const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

async function avaaSivu(ruutu, { ryhmitys = true } = {}) {
  const ctx = await selain.newContext({
    viewport: { width: ruutu.w, height: ruutu.h },
    deviceScaleFactor: 2,
    serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne('pariisi'));
  const sivu = await ctx.newPage();
  /*
   * HIDAS KONE VASTAKOKEENA (`SAVUKE_HIDASTUS=<kerroin>`).
   *
   * GitHub Actionsin ajo 35201833942 antoi 72/74 samalla koodilla, joka
   * on tässä koneessa 74/74: vartiot 7c ja 7e kaatuivat, koska kyltin
   * asento riippui siitä, montako ladontakierrosta kone oli ehtinyt
   * ajaa. Vika ei näy nopealla koneella lainkaan, joten savukkeeseen
   * tarvitaan tapa hidastaa se esiin. CDP:n `Emulation.setCPUThrottlingRate`
   * hidastaa JavaScriptin suorituksen annetulla kertoimella — sama
   * ilmiö kuin hitaammalla ajurilla, ilman että savukkeen väitteitä
   * löysätään. Oletuksena pois päältä, jotta tavallinen ajo pysyy
   * nopeana.
   */
  if (HIDASTUS > 1) {
    const cdp = await ctx.newCDPSession(sivu);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: HIDASTUS });
  }
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const lippu = ryhmitys ? '' : '&aihemerkit=0';
  await sivu.goto(`${osoite}?lauta=pallo${lippu}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  /*
   * SAAPUMINEN AJETAAN LOPPUUN ENNEN MITTAUSTA — sama syy kuin
   * savuke-nimikyltti.mjs:ssä: isoisän kuvasarja ja pulun kommentti
   * kulkevat ruudun poikki saapumisen ensimmäisen 40 sekunnin ajan, ja
   * juuri niiden jälkeinen tila on se, jota omistaja katsoi.
   */
  await sivu.waitForTimeout(44000);
  return { ctx, sivu };
}

/**
 * Kamera Pariisin päälle ja lähizoomiin: väliportaat saapumiskorkeuden
 * osuuksina ja viimeisenä tavoite (ks. LAHIZOOMIN_TAVOITE).
 */
async function zoomaaPariisiin(sivu, portaat) {
  return sivu.evaluate(async (osuudet) => {
    const ui = window.matkakirja.ui;
    const l = ui.pallolauta;
    const c = ui.game.pack.cities.find((x) => x.id === 'pariisi');
    const a = l.asteet({ x: c.x, y: c.y });
    // Saapumiskorkeus on uloin sallittu: kaikki portaat ovat sen osuuksia.
    const alku = l.pallo.pointOfView().altitude;
    // Ensin keskelle ilman zoomia, jotta mitta on Pariisin oma.
    l.pallo.pointOfView({ lat: a.lat, lng: a.lon, altitude: alku }, 0);
    await new Promise((v) => setTimeout(v, 1600));
    for (const k of osuudet) {
      l.pallo.pointOfView({ lat: a.lat, lng: a.lon, altitude: alku * k }, 0);
      await new Promise((v) => setTimeout(v, 1600));
    }
    return l.pallo.pointOfView().altitude;
  }, portaat);
}

/*
 * KYLTIN ASENNON ON ANNETTAVA ASETTUA ENNEN MITTAUSTA (mitattu
 * 17.9.2026, GitHub Actions 35201833942 ja paikallinen vastakoe
 * `SAVUKE_HIDASTUS=4`).
 *
 * Kyltin asento valitaan ladonnassa (js/pallolauta/lauta.js
 * paivitaTuristiInfo), ja zoomin jälkeen ensimmäinen ladonta voi olla
 * hitaalla koneella yhä matkalla, kun savuke jo mittaa. MITATTU: sormen
 * piste luettiin kyltin VANHASTA paikasta ja kyltti oli jo uudessa —
 * 17,2 px (390 px) ja 183,8 px (1400 px) erossa, ja napautus meni
 * naapurin viuhkaan. Vika oli mittauksen ajoituksessa, ei säännössä:
 * savuke ei saa mitata liikkuvaa kohdetta.
 *
 * ODOTUS KATSOO PIIRROSTA, EI PELKKÄÄ KAAVAA. Ladonnan laatikko
 * (`turistiLaatikot`) lasketaan kamerasta ja on paikallaan heti, kun
 * kamera pysähtyy — mutta merkkikerroksen ELEMENTTI tweenaa uuteen
 * paikkaansa (htmlTransitionDuration) ja jokainen uusi ladonta aloittaa
 * tweenin alusta. MITATTU 17.9.2026 `SAVUKE_HIDASTUS=4`, työpöytä
 * 1400 px: kun odotus katsoi vain kaavaa, kyltin elementti liikkui yhä
 * 195 px kahden peräkkäisen mittauksen välissä, sormen piste luettiin
 * vanhasta paikasta ja napautus meni *Kyyhkyposti…*-viuhkaan (7c
 * punainen, etäisyys 179,6 px). Siksi odotetaan MOLEMPIA: kaavan
 * laatikkoa ja piirrettyä laatikkoa.
 *
 * MYÖS NIMILADONNAN ON OLTAVA VALMIS. Kyltti valitaan ladonnassa ENNEN
 * nimiä, ja nimet väistävät sitä samassa kierroksessa — mutta hitaalla
 * koneella mittaus ehti niiden väliin: MITATTU 17.9.2026
 * `SAVUKE_HIDASTUS=4`, työpöytä 1400 px: kyltin laatikko oli jo
 * paikallaan (714,444 → 812,465, sama kuin nopealla koneella), mutta
 * vartio 7e luki nimiä 1 — kaupungin nimi oli vielä edellisen kierroksen
 * paikassa. Siksi vakiintumiseen luetaan myös nimien laatikot.
 *
 * Odotus on tilan VAKIINTUMINEN, ei kello: laatikoita luetaan, kunnes
 * kaksi peräkkäistä lukemaa ovat samat. Odotus katsoo PAIKKOJA, ei
 * väitteitä — yksikään vartio ei löysty siitä, että ladonnan annetaan
 * ensin valmistua.
 */
async function odotaKyltinAsento(sivu, { yrityksia = 40, valiMs = 250 } = {}) {
  let edellinen = null;
  for (let i = 0; i < yrityksia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const nyt = await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const teksti = (r) => (r
        ? `${Math.round(r.x0)},${Math.round(r.y0)},${Math.round(r.x1)},${Math.round(r.y1)}`
        : '');
      const kaava = teksti((l.turistiLaatikot?.() ?? [])[0] ?? null);
      const piirretty = teksti((l.turistiPiirretty?.() ?? [])[0] ?? null);
      const nimet = (l.nimet?.laatikot?.() ?? []).map(teksti).join(';');
      return kaava
        ? { kyltti: `${piirretty || 'ei piirrosta'} (kaava ${kaava})`, nimet }
        : null;
    });
    const avain = nyt ? `${nyt.kyltti}|${nyt.nimet}` : '';
    if (avain && avain === edellinen) return nyt.kyltti;
    edellinen = avain;
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(valiMs);
  }
  return edellinen ? edellinen.split('|')[0] : '';
}

/** Yksi mittaus nykyisestä näkymästä. */
const mittaa = (sivu) => sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const l = ui.pallolauta;
  const n = l.nostot;
  const koti = (document.querySelector('.pallo-kotelo') ?? document.body).getBoundingClientRect();
  const sym = await import('/js/fokusnosto-symbolit.js');
  const merkit = [...document.querySelectorAll('.pallolauta-nosto')].map((el) => {
    const g = el.querySelector('.pallolauta-nosto-siirto');
    const mitta = g ? Number((g.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
    const tyyli = getComputedStyle(el);
    return {
      id: el.dataset.nosto,
      nimio: el.dataset.nimio ?? '',
      kaupunki: el.classList.contains('pallolauta-nosto-kaupunki'),
      mitta,
      nakyy: tyyli.display !== 'none' && tyyli.visibility !== 'hidden'
        && Number(tyyli.opacity) > 0.01,
    };
  });
  return {
    koti: { w: koti.width, h: koti.height },
    alt: l.pallo.pointOfView().altitude,
    uloinOsuus: n?.portti?.()?.uloinOsuus ?? 0,
    karttaskaala: l.kamera.nakyvaAlue()?.skaala ?? 0,
    vertailuskaala: l.saapumisenSkaala?.() ?? 0,
    tiheys: window.devicePixelRatio || 1,
    porras: sym.nostosymPorrasNyt(),
    merkit,
    /*
     * TURISTI-INFON KYLTTI (js/kaupunkinosto.js) ON OMA MITTANSA, EI
     * NOSTOJEN. Merkki on pallon merkkikerroksen datum, jonka
     * mittakaava tulee `kaupunkimerkinMitta`sta, joten se luetaan
     * omasta elementistään (`.pallolauta-turisti-info`) eikä
     * `.pallolauta-nosto`-listasta, jossa sitä ei ole. Laatikko on
     * SIIRTORYHMÄN piirretty ala (svg on 1 × 1 px ja `overflow:
     * visible`), eli täsmälleen se, minkä pelaaja näkee — kotelon
     * koordinaateissa, kuten nostojen osumalaatikot.
     */
    turisti: (() => {
      const el = document.querySelector('.pallolauta-turisti-info');
      if (!el) return null;
      const g = el.querySelector('.pallolauta-turisti-info-siirto');
      const mitta = g ? Number((g.style.transform.match(/scale\(([\d.]+)\)/u) ?? [])[1] ?? 0) : 0;
      const r = (g ?? el).getBoundingClientRect();
      const tyyli = getComputedStyle(el);
      return {
        kaupunki: el.dataset.kaupunki ?? '',
        mitta,
        x0: r.left - koti.left,
        y0: r.top - koti.top,
        x1: r.right - koti.left,
        y1: r.bottom - koti.top,
        nakyy: tyyli.display !== 'none' && tyyli.visibility !== 'hidden'
          && Number(tyyli.opacity) > 0.01,
      };
    })(),
    aihemerkit: (n?.aihemerkit?.() ?? []).map((a) => ({
      id: a.id,
      aihe: a.aihe,
      // Nimiö ja kaupunki: PAATOKSET 27 TARKENNUS 2 kohdat 7 ja 8.
      nimi: a.nimi ?? '',
      nimioNakyy: Boolean(a.nimioNakyy),
      kaupunkiAvain: a.kaupunkiAvain ?? null,
      maara: a.maara,
      jasenet: a.jasenet.map((j) => j.id),
      jasentiedot: a.jasenet.map((j) => ({
        id: j.id, nimi: j.nimi ?? '', aihe: j.aihe ?? null, kaupunkiAvain: j.kaupunkiAvain ?? null, maasto: Boolean(j.maasto),
      })),
      x: a.x,
      y: a.y,
    })),
    // Lukumäärää ei saa olla pallossa (kohta 8: *"ei lukumaaraa palloon"*).
    lukupalloja: document.querySelectorAll('.pallolauta-aihemerkki-luku').length,
    /*
     * AIHENOSTON NIMIÖ RUUDULLA (PAATOKSET 27 TARKENNUS 4 kohta 10).
     * Datan `nimioNakyy` kertoo päätöksen, tämä kertoo mitä pelaaja
     * NÄKEE: asetteleAihemerkki kirjoittaa näkyvän nimiön elementin
     * `data-nimio`-määreeseen ja tyhjän merkkijonon, kun nimiötä ei
     * piirretä. Kaksi mittaria, jottei vartio nojaa pelkkään lippuun.
     */
    aihenimioitaDom: [...document.querySelectorAll('.pallolauta-aihemerkki')]
      .filter((el) => (el.dataset.nimio ?? '') !== '').length,
    osumat: (n?.osumat?.() ?? []).map((o) => ({
      id: o.id,
      perhe: o.perhe,
      poltettu: Boolean(o.poltettu),
      nimi: o.nimi ?? '',
      aihe: o.aihe ?? null,
      kaupunkiAvain: o.kaupunkiAvain ?? null,
      maasto: Boolean(o.maasto),
      kaupunki: Boolean(o.kaupunki),
    })),
    laatikot: (n?.osumaLaatikot?.() ?? []).map((r) => ({
      id: r.id, x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1,
    })),
    /*
     * LADONNAN KOLME LAATIKKOJOUKKOA SAMASSA AVARUUDESSA (kotelon
     * pikselit): kaupunkien nimet, nostojen NÄKYVÄT laput ja
     * turisti-infon kyltin VARAUS. Vartio 7e vertaa näitä keskenään —
     * juuri ne kolme, jotka omistajan kuvassa latoutuivat päällekkäin.
     */
    nimet: (l.nimet?.laatikot?.() ?? []).map((r) => ({
      id: r.id ?? '', x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1,
    })),
    laput: (n?.lappuLaatikot?.() ?? []).map((r) => ({
      id: r.id, nimi: r.nimi ?? '', x0: r.x0, y0: r.y0, x1: r.x1, y1: r.y1,
    })),
    turistiVaraus: (l.turistiLaatikot?.() ?? [])[0] ?? null,
    // Kartalle jäänyt luentakuvapakka (PAATOKSET 31 kohta 1).
    pakka: [...document.querySelectorAll('.fokusvirta-luentakuva')]
      .filter((el) => getComputedStyle(el).display !== 'none').length,
    pulucamKortteja: [...document.querySelectorAll('.pulucam-kortti')]
      .filter((el) => getComputedStyle(el).display !== 'none').length,
  };
});

/*
 * AVOIN KORTTI LUETAAN KAHDESTA PAIKASTA (sama kahvapari kuin
 * tools/savukkeet/savuke-ranska-sisalto.mjs `avoinna`).
 *
 * `ui.fokuskohdeAuki` on kohdekortin oma tila, mutta nosto voi avautua
 * myös KUVA EDELLÄ -korttina (`.fokusnosto-kerros`), joka ei kulje sen
 * kautta. Mitattu 16.9.2026: viuhkasta avattu nosto jätti
 * `fokuskohdeAuki`n tyhjäksi, jolloin savuke luuli ettei mitään
 * auennut — ja koska sulkeminen katsoi samaa tyhjää tilaa, kortti jäi
 * ruudulle peittämään kaikki seuraavat napautukset. Kahva on siksi
 * kumpi tahansa: tunnus tai kerroksen luokka.
 */
const KORTIT = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
  + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup, .kaupunkipopup';
const avoinNosto = (sivu) => sivu.evaluate((sel) => {
  const ui = window.matkakirja.ui;
  const el = document.querySelector(sel);
  return ui.fokuskohdeAuki?.id
    ?? (el ? String(el.className?.baseVal ?? el.className ?? el.tagName) : null);
}, KORTIT);
async function suljeKortti(sivu) {
  for (let i = 0; i < 8; i += 1) {
    if (!(await avoinNosto(sivu))) return;
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(260);
  }
  // Viimeinen keino: kortti pois suoraan, jottei se peitä seuraavia
  // napautuksia (savukkeen siivous, ei väite).
  await sivu.evaluate(async (sel) => {
    const { suljeFokuskohde } = await import('/js/fokuskohteet.js');
    suljeFokuskohde(window.matkakirja.ui);
    for (const e of document.querySelectorAll(sel)) e.remove();
  }, KORTIT);
  await sivu.waitForTimeout(250);
}

/*
 * KARTAN PÄÄLTÄ POIS KAIKKI, JA ODOTA TILAA — EI KELLOA (17.9.2026).
 * Kyltin vastakokeet avaavat nähtävyysarkin (`#nahtavyys-dialog`), ja
 * Macilla arkki oli yhä auki, kun vartiot 4 ja 4b mittasivat: kaikki
 * kolme napautusehdokasta kirjattiin *"peitossa"*
 * (`IMG.nahtavyys-kuva`, `P.nahtavyys-kappale`) ja viuhkan napautus
 * osui arkkiin, jolloin kohtia oli 0 / 5. Kiinteä odotus ei auta:
 * arkin sulkeminen on animaatio. Tämä sulkee kortit, dialogit ja
 * viuhkan niin monta kierrosta, että annettu piste on vapaa — tai
 * palauttaa esteen nimen, jolloin kutsuja ohittaa kohteen kuten ennen.
 */
async function odotaVapaaPiste(sivu, px, py, kattoMs = 6000) {
  const t0 = Date.now();
  let este = await peitossa(sivu, px, py);
  while (este && Date.now() - t0 < kattoMs) {
    // eslint-disable-next-line no-await-in-loop
    await suljeKortti(sivu);
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => {
      for (const d of document.querySelectorAll('dialog[open]')) d.close();
      window.matkakirja.ui.pallolauta.nostot?.suljeViuhka?.();
    });
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
    // eslint-disable-next-line no-await-in-loop
    este = await peitossa(sivu, px, py);
  }
  return este;
}

/*
 * MERKIN RUUTUPISTE SIVUN KOORDINAATEISSA. Kerroksen omat luvut
 * (`osumaLaatikot`, `aihemerkit`) ovat KANKAAN koordinaatteja
 * (`getScreenCoords`), joten sivun piste saadaan lisäämällä kankaan
 * nurkka — ei kotelon, joka on eri elementti ja voi olla eri kohdassa.
 * Sama kaava kuin tools/savukkeet/savuke-ranska-sisalto.mjs `tuore`.
 */
const kankaanNurkka = (sivu) => sivu.evaluate(() => {
  const r = window.matkakirja.ui.pallolauta.pallo.renderer().domElement
    .getBoundingClientRect();
  return { x: r.left, y: r.top };
});

/** Yhden noston oma ruutupiste (symbolin kohta, ei nimiön ulkopää). */
const merkinPiste = (sivu, id) => sivu.evaluate((tunnus) => {
  const l = window.matkakirja.ui.pallolauta;
  const o = l.nostot.osumat().find((x) => x.id === tunnus);
  if (!o) return null;
  const p = l.pallo.getScreenCoords(o.lat, o.lng, 0);
  return p ? { x: p.x, y: p.y } : null;
}, id);

/** Peittääkö käyttöliittymän paneeli tämän pisteen? */
const peitossa = (sivu, px, py) => sivu.evaluate(([x, y]) => {
  const e = document.elementFromPoint(x, y);
  if (!e) return 'ei elementtiä';
  const kangas = window.matkakirja.ui.pallolauta.pallo.renderer().domElement;
  if (e === kangas || e.closest?.('.pallolauta-nosto, .pallolauta-merkki')) return null;
  return `${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}`.slice(0, 40);
}, [px, py]);

/*
 * ── NAPAUTUKSEN ESITILA (17.9.2026, Mac-kalibrointi) ──────────────
 *
 * MACILLA punaiset rivit olivat kaikki samannäköisiä — *"ei korttia"*,
 * *"kohtia 0"*, *"ei mitään"* — eikä lokista voinut päätellä, veikö
 * napautuksen osumasääntö, auki jäänyt viuhka vai laudan sulkeva
 * napautus. Tämä lukee SAMALLA HETKELLÄ, jona sormi laskeutuu:
 * kameran korkeuden, ladonnan portit (viuhka, kortti, linssi),
 * `elementFromPoint`-elementin ja sen, minkä kohteen pelin oma
 * osumasääntö valitsisi tuosta pikselistä (lauta.napautusselitys*).
 */
const esitila = (sivu, px, py, asteet = null) => sivu.evaluate(([x, y, a]) => {
  const l = window.matkakirja.ui.pallolauta;
  const e = document.elementFromPoint(x, y);
  return {
    selitys: a ? l.napautusselitys?.(a.lat, a.lng) ?? null : null,
    elementti: e ? `${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}`.slice(0, 40) : null,
  };
}, [px, py, asteet]);

/*
 * ── SORMI LIIKKUU ENNEN KUIN SE PAINAA (17.9.2026, Mac) ───────────
 *
 * MITATTU JUURISYY: `mouse.click(x, y)` antoi pelille EDELLISEN
 * napautuksen asteet — kolme peräkkäistä napautusta kirjautuivat
 * yhden askeleen jäljessä (braille → 48,2689 tuli vasta
 * tour-de-francen napautuksesta). Kirjasto (globe.gl) säteittää
 * osoittimen paikan kehyksessä ja käyttää klikissä VIIMEKSI
 * säteitettyä osumaa; kun siirto ja painallus tulevat samassa
 * kehyksessä, klikki lukee vielä edellisen pisteen. Siksi vartio 4
 * sai *"ei korttia"* ja vartio 4b *"kohtia 0"* — napautukset
 * osuivat oikeaan pikseliin mutta väärään kohtaan pallolla.
 *
 * Oikea sormi ei tee näin: se liikkuu, ja vasta sitten painaa. Tämä
 * apuri tekee saman — siirto, kaksi kehystä, painallus.
 */
async function napauta(sivu, x, y) {
  await sivu.mouse.move(x, y);
  await sivu.evaluate(() => new Promise((ok) => {
    requestAnimationFrame(() => requestAnimationFrame(ok));
  }));
  await sivu.waitForTimeout(120);
  await sivu.mouse.click(x, y);
}

/** Napautuksen jälkeen: mitkä asteet kirjasto antoi pelille? */
const jalkitila = (sivu, asteet) => sivu.evaluate((a) => {
  const v = window.matkakirja.ui.pallolauta.viimeinenNapautus?.();
  if (!v) return 'ei kirjausta';
  const dLat = a ? v.lat - a.lat : null;
  const dLng = a ? v.lng - a.lng : null;
  return `pelille ${v.lat.toFixed(4)},${v.lng.toFixed(4)}`
    + (a ? ` (kohde ${a.lat.toFixed(4)},${a.lng.toFixed(4)}, ero ${dLat.toFixed(4)},${dLng.toFixed(4)})` : '');
}, asteet);

/** Yhden esitilan tiivis rivi lokiin. */
const esitilaRivi = (t) => (t?.selitys
  ? `sääntö→${t.selitys.voittaja ?? '-'} (muste ${t.selitys.muste ?? '-'}`
    + `, kyltinMusteella ${t.selitys.kyltinMusteella ? 'kyllä' : 'ei'}`
    + `, viuhka ${t.selitys.viuhkaAuki ?? '-'}, kortteja ${t.selitys.kortteja}`
    + `, korttiOliAuki ${t.selitys.korttiOliAuki}, alt ${t.selitys.korkeus?.toFixed?.(4) ?? '-'})`
    + `, elementti ${t.elementti ?? '-'}`
  : `ei selitystä, elementti ${t?.elementti ?? '-'}`);

/*
 * LADONTA ON ASETTUNUT VASTA, KUN SAMA LAATIKKO TULEE KAHDESTI.
 * Macin nopeampi veto ehti aiemmin napauttaa kesken kameran ajon:
 * piste luettiin DOMista eri hetkellä kuin peli laski osuman.
 * Palauttaa viimeksi luetun pisteen — sen, johon napautus tehdään.
 */
async function odotaAsettunut(sivu, lue, kattoMs = 4000) {
  const t0 = Date.now();
  let edellinen = null;
  let nyt = await lue();
  while (Date.now() - t0 < kattoMs) {
    if (edellinen && nyt && Math.hypot(nyt.x - edellinen.x, nyt.y - edellinen.y) < 0.6) {
      return nyt;
    }
    edellinen = nyt;
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(220);
    // eslint-disable-next-line no-await-in-loop
    nyt = await lue();
  }
  return nyt;
}

/*
 * KAAPPAUS EI SAA KAATAA MITTAUSTA. Playwrightin `screenshot` odottaa
 * kirjasinten latautumista, ja pallon oma rAF-silmukka voi pitää sen
 * odotuksen auki yli 30 s:n (mitattu 16.9.2026, 1400 × 900 — sama
 * ilmiö kuin tools/savukkeet/savuke-pergamentti.mjs:n kirjasinodotus).
 * Kuva on savukkeen sivutuote, vartiot sen tulos, joten epäonnistunut
 * kaappaus kirjataan INFOna eikä heitetä eteenpäin.
 */
async function kaappaa(sivu, nimi) {
  if (!KUVAKANSIO) return;
  try {
    await sivu.screenshot({ path: join(KUVAKANSIO, nimi), timeout: 15000 });
  } catch (virhe) {
    tieto('kaappaus ei onnistunut', `${nimi}: ${String(virhe?.message ?? virhe).slice(0, 80)}`);
  }
}

for (const ruutu of RUUDUT) {
  console.log(`\n=== ${ruutu.nimi} ${ruutu.w} × ${ruutu.h} =====================`);
  const { ctx, sivu } = await avaaSivu(ruutu);

  /* --- saapumisnäkymä: katto ei saa purra siellä (vartio 1c) --- */
  const saapuen = await mittaa(sivu);
  const saapuvaKaupunki = saapuen.merkit.filter((m) => m.kaupunki && m.mitta > 0);
  const saapuvaNimio = saapuvaKaupunki.length
    ? Math.max(...saapuvaKaupunki.map((m) => m.mitta)) * NOSTOSYM_NIMIO_KOKO : 0;
  tieto(`${ruutu.nimi} · saapuminen`,
    `uloinOsuus ${p(saapuen.uloinOsuus, 3)}, merkkejä ${saapuen.merkit.length}, `
    + `kaupunkimerkin nimiö ${p(saapuvaNimio)} px, aihemerkkejä ${saapuen.aihemerkit.length}`);
  vaadi(`1c. ${ruutu.nimi}: kaupunkimerkin nimiö on saapuessa ≥ ${SAAPUMISEN_VAHIN_PX} px`,
    saapuvaNimio >= SAAPUMISEN_VAHIN_PX,
    `${p(saapuvaNimio)} px (kaupunkimerkkejä ${saapuvaKaupunki.length})`);

  /*
   * --- 3i2. VASTAKOE: NIMIÖKYNNYS POIS SAMASTA SAAPUMISNÄKYMÄSTÄ ---
   *
   * `?aihenimiokynnys=0` (js/pallolauta/nostot.js
   * aihenimionKynnysSallittu) palauttaa v1927:n tilan, jossa nimiö
   * näkyi kaikilla zoomeilla. Lippu luetaan joka ladonnassa
   * osoitteesta, joten sivua ei ladata uudelleen eikä kameraa
   * siirretä — mitattava näkymä on sama kuin vartiossa 3i.
   */
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('aihenimiokynnys', '0');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const ilmanKynnysta = await mittaa(sivu);
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('aihenimiokynnys');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const kynnysTakaisin = await mittaa(sivu);
  const ilmanNimioita = ilmanKynnysta.aihemerkit.filter((a) => a.nimioNakyy).length;
  tieto(`${ruutu.nimi} · vastakoe ilman nimiökynnystä (saapuen)`,
    `nimiöllisiä aihenostoja ${ilmanNimioita}/${ilmanKynnysta.aihemerkit.length}, `
    + `DOM ${ilmanKynnysta.aihenimioitaDom}; kynnyksen kanssa `
    + `${kynnysTakaisin.aihemerkit.filter((a) => a.nimioNakyy).length}/`
    + `${kynnysTakaisin.aihemerkit.length}, DOM ${kynnysTakaisin.aihenimioitaDom}`);
  vaadi(`3i2. VASTAKOE ${ruutu.nimi}: ilman kynnystä nimiöt palaavat saapumisnäkymään`,
    ilmanKynnysta.aihemerkit.length > 0
      && ilmanNimioita === ilmanKynnysta.aihemerkit.length
      && ilmanKynnysta.aihenimioitaDom === ilmanKynnysta.aihemerkit.length
      && kynnysTakaisin.aihenimioitaDom === 0,
    `ilman kynnystä ${ilmanNimioita}/${ilmanKynnysta.aihemerkit.length} `
    + `(DOM ${ilmanKynnysta.aihenimioitaDom}), kynnyksen kanssa DOM `
    + `${kynnysTakaisin.aihenimioitaDom}`);

  /* --- 5. PAKKA EI OLE KARTALLA (PAATOKSET 31 kohta 1) --- */
  vaadi(`5. ${ruutu.nimi}: luentakuvapakkaa ei ole kartalla saapumisen jälkeen`,
    saapuen.pakka === 0 && saapuen.pulucamKortteja === 0,
    `paneeleja ${saapuen.pakka}, PuluCam-kortteja ${saapuen.pulucamKortteja}`);

  /* --- sisimpään zoomiin --- */
  const alt = await zoomaaPariisiin(sivu, ZOOMIPORTAAT);
  const asettuiKohtaan = await odotaKyltinAsento(sivu);
  const m = await mittaa(sivu);
  const nurkka = await kankaanNurkka(sivu);
  const kerroin = m.vertailuskaala > 0 ? m.karttaskaala / m.vertailuskaala : 0;
  tieto(`${ruutu.nimi} · lähizoom`,
    `alt ${p(alt, 4)}, uloinOsuus ${p(m.uloinOsuus, 3)}, kerroin ${p(kerroin, 3)}, `
    + `merkkejä ${m.merkit.length}, aihemerkkejä ${m.aihemerkit.length}, porras ${m.porras}`);

  /* --- 1. NIMIÖN RUUTUPIKSELIKATTO --- */
  const nimiolliset = m.merkit.filter((x) => x.nimio && x.mitta > 0);
  const koot = nimiolliset.map((x) => x.mitta * NOSTOSYM_NIMIO_KOKO);
  const suurin = koot.length ? Math.max(...koot) : 0;
  tieto(`${ruutu.nimi} · nimiön koko ruudulla lähizoomissa`,
    `${koot.length} nimiötä, suurin ${p(suurin)} px, pienin ${p(Math.min(...koot))} px`);
  vaadi(`1. ${ruutu.nimi}: nimiö ≤ ${NIMION_KATTO_PX} px lähizoomissa`,
    koot.length > 0 && suurin <= NIMION_KATTO_PX + KATON_VARA_PX,
    `suurin ${p(suurin)} px (${koot.length} nimiötä)`);

  /*
   * 1b. VASTAKOE ILMAN KATTOA. Sama kerroin, sama peruskoko — vain
   * `Math.min` jää pois. Luku on se, mitä omistaja näki.
   */
  const ilmanKattoa = NOSTON_MITTA * kerroin * KAUPUNKIMERKIN_KERROIN * NOSTOSYM_NIMIO_KOKO;
  const nostoIlmanKattoa = NOSTON_MITTA * kerroin * NOSTOSYM_NIMIO_KOKO;
  tieto(`${ruutu.nimi} · vastakoe ilman kattoa`,
    `nosto ${p(nostoIlmanKattoa)} px, kaupunkimerkki ${p(ilmanKattoa)} px`);
  vaadi(`1b. VASTAKOE ${ruutu.nimi}: ilman kattoa nimiö olisi > ${VASTAKOKEEN_RAJA_PX} px`,
    ilmanKattoa > VASTAKOKEEN_RAJA_PX,
    `${p(ilmanKattoa)} px — kamera ei ilmeisesti zoomannut (kerroin ${p(kerroin, 3)})`);

  /*
   * 2. NIMIÖ MAHTUU RUUDULLE — MITATTUNA PARIISIN RYKELMÄSTÄ.
   *
   * Mitta on rykelmän omat laatikot eikä koko kartan: ruudun LAIDALLA
   * oleva merkki saa yhä jäädä puoliksi näkyviin (sama myönnytys kuin
   * nimikylteillä, js/pallolauta/nimet.js RUUDUN REUNA PURKAA LUKON),
   * eikä se ole se vika, jonka omistaja näki. Pariisin rykelmä on
   * ruudun keskellä, joten sen laatikoilla ei ole tuota tekosyytä.
   */
  const rykelmanLaatikot = (mit) => mit.laatikot.filter((r) => PARIISIN_NOSTOT.includes(r.id));
  const laidanYli = (mit) => rykelmanLaatikot(mit).filter((r) => r.x0 < 0 || r.y0 < 0
    || r.x1 > mit.koti.w || r.y1 > mit.koti.h);
  const yli = laidanYli(m);
  tieto(`${ruutu.nimi} · rykelmän laidan yli valuvat laatikot`,
    yli.length ? yli.map((r) => r.id).join(', ') : 'ei yhtään');
  vaadi(`2. ${ruutu.nimi}: Pariisin nimiölaatikot mahtuvat koteloon`,
    yli.length === 0, `${yli.length} laatikkoa: ${yli.map((r) => r.id).join(', ')}`);

  /*
   * 3. PARIISIN RYKELMÄSTÄ EI KATOA YKSIKÄÄN NOSTO.
   *
   * KOLME HYVÄKSYTTÄVÄÄ TILAA, ei yksi. Nosto on kartalla, jos se on
   *   a) oma ELÄVÄ merkkinsä (DOM-elementti + osumalaatikko),
   *   b) aihemerkin jäsen (napautus avaa viuhkan, PAATOKSET 27), tai
   *   c) LAATTAAN POLTETTU muste (js/pallolauta/nostot.js POLTETTUA
   *      MUSTETTA EI VOI PIILOTTAA): sen kuva tulee laatasta eikä
   *      kerroksesta, joten DOM-elementtiä ei ole — mutta merkki on
   *      ruudulla ja osumalistalla, ja juuri niin sen kuuluu olla.
   * Poltetut kirjataan omana INFO-rivinään, koska joukko riippuu
   * siitä, millä laattatasolla kamera on.
   */
  const domIdt = new Set(m.merkit.filter((x) => x.nakyy).map((x) => x.id));
  const osumaIdt = new Set(m.osumat.map((o) => o.id));
  const poltetut = new Set(m.osumat.filter((o) => o.poltettu).map((o) => o.id));
  const ryhmassa = new Set(m.aihemerkit.flatMap((a) => a.jasenet));
  /*
   * NELJAS HYVAKSYTTAVA TILA: KAUPUNKILIUSKA (PAATOKSET 34 kohta 3,
   * mitattu 18.9.2026 era 4). Kaupungin SISAISET nostot eivat enaa ole
   * kartalla millaan zoomilla — ne ovat liuskan kategorioissa, ja
   * niiden KUULUU olla poissa. 390 px:lla nama olivat
   * nosto-guimardin-metro ja nosto-pariisin-patonki. Vartio ei siis
   * vanhennu: se mittaa yha, ettei yksikaan nosto KATOA, mutta tuntee
   * liuskan paikkana siina missa aihemerkin ja poltetun musteen.
   * Lista luetaan kerrokselta, ei kovakoodattuna.
   */
  const liuskassa = new Set(await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const n = ui.pallolauta.nostot;
    const oma = ui.game?.cityOf?.() ?? null;
    const a = oma ? (n.laudanAnkkurit?.() ?? []).find((x) => x.id === oma.id) : null;
    if (!a || !n.liuskanSisaiset) return [];
    return n.liuskanSisaiset(a.avain);
  }));
  const kartalla = (id) => ryhmassa.has(id) || liuskassa.has(id)
    || (osumaIdt.has(id) && (domIdt.has(id) || poltetut.has(id)));
  const kateissa = PARIISIN_NOSTOT.filter((id) => !kartalla(id));
  const poltettujaRykelmassa = PARIISIN_NOSTOT.filter((id) => poltetut.has(id));
  if (poltettujaRykelmassa.length) {
    tieto(`${ruutu.nimi} · rykelmän poltettua mustetta (ei DOM-elementtiä)`,
      poltettujaRykelmassa.join(', '));
  }
  tieto(`${ruutu.nimi} · Pariisin rykelmä`,
    `${PARIISIN_NOSTOT.length} nostoa: omana merkkinä `
    + `${PARIISIN_NOSTOT.filter((id) => domIdt.has(id)).length}, `
    + `aihemerkin jäsenenä ${PARIISIN_NOSTOT.filter((id) => ryhmassa.has(id)).length}, `
    + `poltettuna ${poltettujaRykelmassa.length}`);
  /*
   * NOSTOKOHTAINEN RIVI RAPORTTIA VARTEN (omistajan kysymys koski
   * sitä, MIKÄ nosto on piilossa — yhteenvetoluku ei sitä kerro).
   * Rivi on INFO eikä vartio: vartio on 3, joka vaatii jokaisen
   * olevan jossakin kolmesta hyväksyttävästä tilasta.
   */
  const tilaRivi = (id) => {
    if (liuskassa.has(id)) return 'kaupunkiliuskassa';
    if (ryhmassa.has(id)) return 'aihemerkissä';
    if (domIdt.has(id)) return 'oma merkki';
    if (poltetut.has(id)) return 'poltettu';
    return 'PIILOSSA';
  };
  tieto(`${ruutu.nimi} · rykelmän nostot tiloittain`,
    PARIISIN_NOSTOT.map((id) => `${id}=${tilaRivi(id)}`).join(', '));
  vaadi(`3. ${ruutu.nimi}: yksikään Pariisin nosto ei ole piilossa lähizoomissa`,
    kateissa.length === 0, `kateissa ${kateissa.length}: ${kateissa.join(', ')}`);
  vaadi(`3b. ${ruutu.nimi}: rykelmä ryhmittyy yhä lähizoomissa `
    + `(≥ ${AIHEMERKKEJA_VAHINTAAN} aihemerkkiä)`,
    m.aihemerkit.length >= AIHEMERKKEJA_VAHINTAAN, `${m.aihemerkit.length} aihemerkkiä`);

  /*
   * 3d–3f. AIHENOSTOT (PAATOKSET 27 TARKENNUS 2, omistaja 16.9.2026
   * klo 19.00 UTC). Sama mittaus molemmista näkymistä: sääntö 7 on
   * *"zoomista riippumatta"*, joten saapumisnäkymän ja lähizoomin on
   * annettava sama vastaus.
   */
  for (const [nakyma, mit] of [['saapuen', saapuen], ['lähizoom', m]]) {
    const { aiheet, odotus } = rykelmanAiheet(mit);
    const nostot = pariisinAihenostot(mit);
    tieto(`${ruutu.nimi} · ${nakyma} · Pariisin aiheet`,
      [...aiheet.entries()].map(([a, k]) => `${a}=${k}`).join(', ') || 'ei yhtään');
    tieto(`${ruutu.nimi} · ${nakyma} · aihenostot`,
      nostot.map((a) => `${a.aihe}:"${a.nimi}"(${a.maara})`).join(', ') || 'ei yhtään');
    vaadi(`3d. ${ruutu.nimi} (${nakyma}): aihenostoja = aiheita joilla ≥ 2 nostoa`,
      nostot.length === odotus,
      `aihenostoja ${nostot.length}, aiheita joilla ≥ 2 nostoa ${odotus}`);

    // 3e. NIMIÖ = tärkeimmän noston nimi + kolme pistettä, ei lukua.
    const nimiovirheet = nostot.filter((a) => {
      if (!a.nimi.endsWith(ELLIPSI)) return true;
      const runko = a.nimi.slice(0, -ELLIPSI.length);
      if (!runko || runko.endsWith('.')) return true;
      return !siisti(a.jasentiedot[0]?.nimi).startsWith(runko);
    });
    /*
     * 3e. VANHENTUNUT VARTIONA, SÄILYY TIETONA (PAATOKSET 34 kohta 3,
     * mitattu 18.9.2026 erässä 5). Vartio vaati, että Pariisissa ON
     * aihenostoja; kerrosraja siirsi kaupungin sisäiset nostot
     * liuskaan, joten niitä ei ole kartalla lainkaan ja väite kaatuisi
     * aina. Nimiön MUOTO on silti mittaamisen arvoinen, jos aihenosto
     * jossain näkymässä on — siksi tieto, ei poisto. Väitteen
     * kaupungin sisällöstä esittää nyt 8f/8i.
     */
    tieto(`${ruutu.nimi} · ${nakyma} · 3e (INFO, vanhentunut): aihenoston nimiön muoto`,
      nostot.length
        ? `virheellisiä ${nimiovirheet.length}: ${nimiovirheet.map((a) => `${a.id}="${a.nimi}"`).join(', ') || 'ei yhtään'}`
        : 'aihenostoja ei ollut lainkaan (kaupungin sisäiset ovat liuskassa)');
    /*
     * NIMIÖ MYÖS NÄKYY — MITATTUNA SIINÄ NÄKYMÄSSÄ, JOSTA PÄÄTÖS
     * TEHTIIN. Sovittelun viimeinen keino on yhä lapun piilotus
     * (js/pallolauta/sovittelu.js kohta 3), ja SAAPUMISNÄKYMÄSSÄ koko
     * Ranska on 390 px:n levyisenä niin täynnä, että osa aihenostoista
     * joutuu sinne asti. Omistajan kuva ja PAATOKSET 27 TARKENNUS 2:n
     * oma mittausohje (*"Mitataan Pariisi 390 px"*) koskevat
     * LÄHIZOOMIA, joten vartio on siellä ja saapumisnäkymä on INFO.
     */
    const piilossa = nostot.filter((a) => !a.nimioNakyy);
    tieto(`${ruutu.nimi} · ${nakyma} · aihenoston nimiö piilotettu sovittelussa`,
      piilossa.length ? piilossa.map((a) => a.id).join(', ') : 'ei yhtään');
    if (nakyma === 'lähizoom') {
      vaadi(`3e4. ${ruutu.nimi} (${nakyma}): yhdenkään aihenoston nimiö ei ole piilossa`,
        piilossa.length === 0, `${piilossa.length} piilossa`);
    }
    /*
     * 3i. NIMIÖ VAIN LÄHIZOOMISSA (PAATOKSET 27 TARKENNUS 4 kohta 10).
     * Saapumisnäkymässä nolla, lähizoomissa jokaisella — ja luku
     * luetaan KAHDESTA lähteestä: kerroksen oma lippu (`nimioNakyy`,
     * jota myös sovittelu lukee) ja se, mitä elementtiin oikeasti
     * piirrettiin (`data-nimio`). Jos ne eroavat, vika on siinä
     * välissä eikä kynnyksessä, ja se on syytä nähdä.
     *
     * DOM-luku koskee KOKO ruutua, kerroksen luku Pariisin nostoja,
     * joten lähizoomissa verrataan DOMia kaikkiin aihemerkkeihin ja
     * saapumisnäkymässä molempien on oltava nolla.
     */
    const nimiollisia = nostot.filter((a) => a.nimioNakyy).length;
    tieto(`${ruutu.nimi} · ${nakyma} · aihenoston nimiö näkyy`,
      `kerros ${nimiollisia}/${nostot.length}, DOM ${mit.aihenimioitaDom} `
      + `(aihemerkkejä kartalla ${mit.aihemerkit.length})`);
    if (nakyma === 'saapuen') {
      vaadi(`3i. ${ruutu.nimi} (${nakyma}): aihenostojen nimiöitä 0 — pelkkä symboli`,
        nimiollisia === 0 && mit.aihenimioitaDom === 0,
        `kerros ${nimiollisia}, DOM ${mit.aihenimioitaDom}`);
    } else {
      /*
       * 3i (lähizoom). VANHENTUNUT VARTIONA, ks. 3e: väite vaati
       * Pariisin aihenostoja, jotka kerrosraja siirsi liuskaan.
       * Saapumisnäkymän haara (nolla nimiötä) on yhä vartio — se
       * mittaa kynnystä, ei kaupungin sisältöä.
       */
      tieto(`${ruutu.nimi} · ${nakyma} · 3i (INFO, vanhentunut): aihenoston nimiö näkyvissä`,
        `kerros ${nimiollisia}/${nostot.length}, DOM ${mit.aihenimioitaDom}/`
        + `${mit.aihemerkit.length}`);
    }
    vaadi(`3e2. ${ruutu.nimi} (${nakyma}): pallossa ei ole lukumäärää`,
      mit.lukupalloja === 0, `${mit.lukupalloja} lukua kartalla`);

    /*
     * 3e3. VANHENTUNUT VARTIONA (ks. 3e). Omistajan oma esimerkki oli
     * PARIISIN skandaalirykelmä, ja juuri se on nyt liuskan kategoria
     * "Skandaalit (5)" — ei kartan aihemerkki. Sama sisältö mitataan
     * vartioilla 8f ja 8i.
     */
    const skandaalit = nostot.find((a) => a.aihe === 'skandaalit');
    tieto(`${ruutu.nimi} · ${nakyma} · 3e3 (INFO, vanhentunut): skandaalirykelmän nimiö`,
      `odotus "${OMISTAJAN_ESIMERKKI}${ELLIPSI}", kartalla "${skandaalit?.nimi ?? '-'}"`);

    /*
     * 3h. AIHENOSTOT EIVÄT PEITÄ TOISIAAN. Rykelmä korvautuu viidellä
     * merkillä, jotka kaikki ovat saman kaupungin päällä — jos niiden
     * nimiöt limittyisivät keskenään, ryhmitys olisi vain siirtänyt
     * ongelman. Laatikot ovat samasta kaavasta kuin sormi
     * (osumaLaatikot → aihemerkinLaatikko).
     */
    const aihelaatikot = mit.laatikot.filter((r) => String(r.id).startsWith('aihemerkki:'));
    let aiheparit = 0;
    for (let i = 0; i < aihelaatikot.length; i += 1) {
      for (let j = i + 1; j < aihelaatikot.length; j += 1) {
        if (limittyy(aihelaatikot[i], aihelaatikot[j])) aiheparit += 1;
      }
    }
    tieto(`${ruutu.nimi} · ${nakyma} · aihenostojen limittyvät parit`,
      `${aiheparit} paria ${aihelaatikot.length}:stä`);
    // Sama rajaus kuin 3e4: vartio on lähizoomissa, saapuminen INFO.
    if (nakyma === 'lähizoom') {
      vaadi(`3h. ${ruutu.nimi} (${nakyma}): aihenostojen limittyviä pareja `
        + `≤ ${AIHENOSTOJEN_LIMITYSKATTO}`,
        aiheparit <= AIHENOSTOJEN_LIMITYSKATTO,
        `${aiheparit} limittyvää paria ${aihelaatikot.length}:stä`);
    }

    // 3f. maastokohde ei yhdisty, yksinäinen aihe ei saa aihenostoa.
    const maastoJasenet = nostot.flatMap((a) => a.jasentiedot.filter((j) => j.maasto));
    const yksinaiset = [...aiheet.entries()].filter(([, k]) => k < 2).map(([a]) => a);
    const vaaraYksin = nostot.filter((a) => yksinaiset.includes(a.aihe));
    vaadi(`3f. ${ruutu.nimi} (${nakyma}): maastokohde ei yhdisty, yksinäinen nosto pysyy omanaan`,
      maastoJasenet.length === 0 && vaaraYksin.length === 0,
      `maastojäseniä ${maastoJasenet.length}, yksinäisiä aihenostoja ${vaaraYksin.length}`);
  }

  /*
   * 3g. VASTAKOE: KAUPUNGIN AINA-YHDISTYS POIS SAMASTA NÄKYMÄSTÄ.
   * Lippu luetaan joka ladonnassa osoitteesta (js/pallolauta/nostot.js
   * kaupunkiYhdistysSallittu), joten sivua ei tarvitse ladata uudelleen
   * eikä kameraa siirtää — mitattava näkymä on sama kuin vartiossa 3d.
   */
  const odotusLahella = rykelmanAiheet(m).odotus;
  const aihenostojaLahella = pariisinAihenostot(m).length;
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('aihekaupunki', '0');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const ilmanKaupunkia = await mittaa(sivu);
  const ilmanKaupunkiaMaara = pariisinAihenostot(ilmanKaupunkia).length;
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('aihekaupunki');
    window.history.replaceState({}, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  tieto(`${ruutu.nimi} · vastakoe ilman kaupungin aina-yhdistystä`,
    `aihenostoja ${ilmanKaupunkiaMaara} (säännön kanssa ${aihenostojaLahella}, `
    + `odotus ${odotusLahella})`);
  /*
   * 3g. VANHENTUNUT VASTAKOKEENA (PAATOKSET 34 kohta 3). Vastakoe
   * mittaa EROA kaupungin rykelmän ryhmityksessä, mutta Pariisin
   * rykelmää ei ole enää kartalla: molemmat luvut ovat nollia, joten
   * "ero" ei voi syntyä eikä väite kerro säännöstä mitään. Luvut
   * jäävät tiedoksi (yllä), jotta ero näkyisi, jos rykelmä palaisi.
   */
  tieto(`${ruutu.nimi} · 3g (INFO, vanhentunut vastakoe)`,
    `ilman sääntöä ${ilmanKaupunkiaMaara}, säännön kanssa ${aihenostojaLahella}, `
    + `odotus ${odotusLahella} — kaupungin rykelmä on liuskassa`);

  /* --- 6. TERÄVYYS: PORRAS RIITTÄÄ MERKIN NÄKYVÄÄN TARPEESEEN --- */
  const suurinMitta = Math.max(...m.merkit.map((x) => x.mitta), 0);
  const tarve = suurinMitta * Math.min(m.tiheys, 3);
  tieto(`${ruutu.nimi} · rasteri`,
    `suurin mitta ${p(suurinMitta, 4)}, dpr ${m.tiheys}, tarve ${p(tarve, 3)}, `
    + `porras ${m.porras}`);
  vaadi(`6. ${ruutu.nimi}: rasteriporras riittää merkin näkyvään kokoon`,
    m.porras >= tarve, `porras ${m.porras} < tarve ${p(tarve, 3)}`);
  vaadi(`6b. VASTAKOE ${ruutu.nimi}: oletusporras ${OLETUSPORRAS} ei riittäisi`,
    tarve > OLETUSPORRAS, `tarve ${p(tarve, 3)} ≤ ${OLETUSPORRAS}`);

  /*
   * 4. AITO NAPAUTUS AVAA NOSTON. Sormen piste on merkin OMA
   * ruutupiste (`getScreenCoords`), ei nimiölaatikon keskikohta: nimiö
   * on osa osumapintaa, mutta pelaajan sormi hakee symbolin. Kohteeksi
   * kelpaavat vain Pariisin rykelmän omat merkit — juuri ne, joita
   * omistaja ei nähnyt.
   */
  const ehdokkaat = PARIISIN_NOSTOT.filter((id) => domIdt.has(id) && osumaIdt.has(id));
  const napautetut = [];
  const virheet = [];
  /*
   * ── 7c. TURISTI-INFON KYLTIN NAPAUTUS MITATAAN ENSIMMÄISENÄ ─────
   *
   * SAMASTA SYYSTÄ KUIN VIUHKA: kartan napautustila on puhtaimmillaan
   * ennen kuin yksikään kortti on ehtinyt avautua ja sulkeutua.
   * MITATTU 16.9.2026: kun sama napautus tehtiin vasta kolmen
   * nostokortin jälkeen, se ei avannut mitään — laudan oma
   * `korttiOliAuki`-lukko (js/pallolauta/lauta.js napautaPintaan:
   * *"sulkeva napautus ei avaa mitään uutta"*) nielaisi sen. Lukko on
   * oikein, mutta se on eri asia kuin tämän erän väite.
   *
   * Sormen piste on merkin ANKKURI eli sen elementin keskikohta:
   * elementti on 1 × 1 px:n laatikko ankkurissa (`translate(-50%,
   * -50%)`) ja nimiö piirtyy siitä oikealle siirtoryhmään, joten
   * sormi hakee symbolin eikä nimiön ulkopäätä — sama sääntö kuin
   * vartiossa 4.
   */
  await odotaKyltinAsento(sivu);
  const tPiste = await sivu.evaluate(() => {
    const el = document.querySelector('.pallolauta-turisti-info');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: (r.left + r.right) / 2, y: (r.top + r.bottom) / 2 };
  });
  let opasAuki = null;
  let opasEste = null;
  let opasSijaan = null;
  let ilmanSaantoa = null;
  let ilmanSaantoaOpas = null;
  let vainOsuma = null;
  let vainOsumaOpas = null;
  /** Yksi napautus kyltin keskelle: mitä aukesi? */
  const napautaKylttia = async () => {
    /*
     * KARTAN TILA PUHTAAKSI ENNEN NAPAUTUSTA, EI VAIN SEN JÄLKEEN
     * (17.9.2026, Mac). Auki jäänyt viuhka tai kortti nielaisee
     * napautuksen laudan omissa porteissa (`viuhkaAuki`,
     * `korttiOliAuki`) — silloin mittaus kertoo *"ei mitään"*
     * vaikka osumasääntö olisi kunnossa.
     */
    await odotaVapaaPiste(sivu, tPiste.x, tPiste.y, 3000);
    const kEnnen = await esitila(sivu, tPiste.x, tPiste.y);
    tieto(`${ruutu.nimi} · esitila kyltti`, esitilaRivi(kEnnen));
    await napauta(sivu, tPiste.x, tPiste.y);
    await sivu.waitForTimeout(900);
    tieto(`${ruutu.nimi} · kyltin napautus pelille`, await jalkitila(sivu, null));
    const opas = await sivu.evaluate(() => {
      const d = document.getElementById('nahtavyys-dialog');
      const auki = window.matkakirja.ui.lehtitila?.nahtavyysAuki ?? null;
      return d?.open
        ? (auki?.kohde?.nimi ?? auki?.kohde?.otsikko ?? 'opas auki') : null;
    });
    /*
     * MIKÄ MUU VEI NAPAUTUKSEN? Ilman tätä punainen rivi ei kerro,
     * oliko kyse osumasäännöstä vai kuolleesta merkistä. Kysytään
     * LAAJASTI: kortin lisäksi auki olevat dialogit, aihemerkin viuhka
     * ja kaupungin oma etusivu — ne eivät ole `.fokuskohde-popup`-
     * luokkaisia korttteja, joten pelkkä korttihaku kertoisi
     * *"ei mitään"* silloinkin, kun napautus meni jonnekin.
     */
    const sijaan = opas ? null : await sivu.evaluate(async (sel) => {
      const ui2 = window.matkakirja.ui;
      const el = document.querySelector(sel);
      const dialogit = [...document.querySelectorAll('dialog[open]')]
        .map((d) => d.id || d.className).filter(Boolean);
      const osat = [];
      if (ui2.fokuskohdeAuki?.id) osat.push(`nosto:${ui2.fokuskohdeAuki.id}`);
      if (el) osat.push(`kortti:${String(el.className?.baseVal ?? el.className ?? el.tagName)}`);
      if (ui2.pallolauta.nostot?.viuhkaAuki?.()) osat.push(`viuhka:${ui2.pallolauta.nostot.viuhkaAuki()}`);
      if (document.querySelector('.kaupunkipopup-tiivis')) osat.push('kaupungin etusivu');
      if (ui2.kaupunkipopupAuki) osat.push('kaupunkipopup');
      if (dialogit.length) osat.push(`dialogit: ${dialogit.join(', ')}`);
      return osat.join(' | ') || null;
    }, KORTIT);
    // Opas on modaali arkki: se on suljettava ennen seuraavia
    // napautuksia, tai se peittäisi kartan (savukkeen siivous).
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(500);
    await sivu.evaluate(() => {
      const d = document.getElementById('nahtavyys-dialog');
      if (d?.open) d.close();
    });
    await sivu.waitForTimeout(300);
    await suljeKortti(sivu);
    /*
     * VIUHKA EI OLE KORTTI, JOTEN SE ON SULJETTAVA ERIKSEEN. Kyltin
     * vastakokeet (`?kylttiosuma=0`) avaavat naapurin aihemerkin
     * viuhkan, ja auki jäänyt viuhka on kartan oma tila: sen aikana
     * kartan napautus SULKEE viuhkan eikä avaa mitään. MITATTU
     * 17.9.2026: ilman tätä siivousta vartio 4b mittasi
     * *"kohtia 0 / 5"*, koska sen napautus vain sulki edellisen
     * viuhkan.
     */
    await sivu.evaluate(() => {
      window.matkakirja.ui.pallolauta.nostot?.suljeViuhka?.();
    });
    await sivu.waitForTimeout(250);
    return { opas, sijaan };
  };
  /** Vastakokeen lippu päälle tai pois KESKEN AJON (ks. 7d:n perustelu). */
  const lippuun = (nimi, arvo) => sivu.evaluate(([avain, tila]) => {
    const u2 = new URL(window.location.href);
    if (tila === null) u2.searchParams.delete(avain); else u2.searchParams.set(avain, tila);
    window.history.replaceState(null, '', u2.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  }, [nimi, arvo]);
  if (tPiste) {
    /*
     * MIKÄ ELEMENTTI ANKKURISSA ON? `peitossa` päästää läpi kartan omat
     * merkit (ne ovat pointer-events: none), mutta jos jokin niistä ei
     * ole, napautus ei koskaan pääse kankaalle — ja silloin punainen
     * 7c ei kerro osumasäännöstä mitään. Rivi on INFO.
     */
    const ankkurinElementti = await sivu.evaluate(([x, y]) => {
      const e = document.elementFromPoint(x, y);
      if (!e) return 'ei elementtiä';
      const tyyli = getComputedStyle(e);
      return `${e.tagName}.${e.className?.baseVal ?? e.className ?? ''}`.slice(0, 60)
        + ` (pointer-events: ${tyyli.pointerEvents})`;
    }, [tPiste.x, tPiste.y]);
    tieto(`${ruutu.nimi} · kyltin ankkurissa oleva elementti`, ankkurinElementti);
    const ankkurinNaapurit = await sivu.evaluate(([x, y]) => {
      const l = window.matkakirja.ui.pallolauta;
      const koti = l.kotelo.getBoundingClientRect();
      const kx = x - koti.left;
      const ky = y - koti.top;
      const et = (r) => Math.hypot(
        Math.max(r.x0 - kx, 0, kx - r.x1), Math.max(r.y0 - ky, 0, ky - r.y1),
      );
      const rivit = l.nostot.osumaLaatikot()
        .map((r) => ({ id: r.id, perhe: r.perhe, d: et(r) }))
        .sort((a, b) => a.d - b.d).slice(0, 4);
      const oma = (l.turistiLaatikot?.() ?? [])[0] ?? null;
      const piirretty = (l.turistiPiirretty?.() ?? [])[0] ?? null;
      const elementit = [...document.querySelectorAll('.pallolauta-turisti-info')].map((e) => {
        const b = e.getBoundingClientRect();
        return `${e.className} @ ${(b.left + b.right) / 2 - koti.left}`
          + `,${(b.top + b.bottom) / 2 - koti.top}`;
      });
      return {
        piirretty,
        elementit,
        rivit,
        kyltti: oma ? { d: et(oma), x0: oma.x0, y0: oma.y0, x1: oma.x1, y1: oma.y1 } : null,
        kohta: { x: kx, y: ky },
      };
    }, [tPiste.x, tPiste.y]);
    tieto(`${ruutu.nimi} · kyltin elementit DOMissa`,
      ankkurinNaapurit.elementit.join(' | ') || 'ei yhtään');
    tieto(`${ruutu.nimi} · osumatestin piirretty laatikko`,
      ankkurinNaapurit.piirretty
        ? `${ankkurinNaapurit.piirretty.x0.toFixed(1)},${ankkurinNaapurit.piirretty.y0.toFixed(1)} → `
          + `${ankkurinNaapurit.piirretty.x1.toFixed(1)},${ankkurinNaapurit.piirretty.y1.toFixed(1)}`
        : 'EI SAATAVILLA (osumatesti käyttää kaavaa)');
    tieto(`${ruutu.nimi} · ankkurin lähimmät osumalaatikot`,
      ankkurinNaapurit.rivit.map((r) => `${r.id}[${r.perhe}] ${r.d.toFixed(1)} px`).join(', '));
    tieto(`${ruutu.nimi} · napautuspiste vs. kyltin osumalaatikko`,
      ankkurinNaapurit.kyltti
        ? `piste ${ankkurinNaapurit.kohta.x.toFixed(1)},${ankkurinNaapurit.kohta.y.toFixed(1)} · `
          + `laatikko ${ankkurinNaapurit.kyltti.x0.toFixed(1)},${ankkurinNaapurit.kyltti.y0.toFixed(1)} → `
          + `${ankkurinNaapurit.kyltti.x1.toFixed(1)},${ankkurinNaapurit.kyltti.y1.toFixed(1)} · `
          + `etäisyys ${ankkurinNaapurit.kyltti.d.toFixed(1)} px`
        : 'ei laatikkoa');
    opasEste = await peitossa(sivu, tPiste.x, tPiste.y);
    if (!opasEste) {
      const tulos = await napautaKylttia();
      opasAuki = tulos.opas;
      opasSijaan = tulos.sijaan;
      /*
       * 7g. VASTAKOE: SÄÄNTÖ POIS (`?kylttiosuma=0`). Sama sormi, sama
       * näkymä, sama kyltti — mutta ilman kohdan 4 sääntöä napautus
       * menee taas naapurinostolle (16 px:n kosketusvara voittaa
       * kyltin musteen). Ilman tätä vartio 7c menisi läpi myös
       * silloin, jos kyltti olisi vain sattunut voittamaan kilpailun.
       */
      await lippuun('kylttiosuma', '0');
      await sivu.waitForTimeout(700);
      const pelkkaSaanto = await napautaKylttia();
      vainOsumaOpas = pelkkaSaanto.opas;
      vainOsuma = pelkkaSaanto.sijaan;
      /*
       * VASTAKOE ON KOKO ERÄ, EI PUOLIKAS. Kohdat 4 ja 6 korjaavat
       * saman napautuksen kahdesta päästä: sääntö päästää sormen läpi,
       * laatikko pitää naapurin lapun pois kyltin päältä. Puhelimella
       * pelkän laatikon korjaus riittää jo (mitattu 17.9.2026: kyltti
       * aukeaa myös `?kylttiosuma=0`:lla), työpöydällä ei. Vastakoe
       * kääntää siksi molemmat pois — silloin se mittaa täsmälleen sen
       * tilan, jossa omistaja vian näki.
       */
      await lippuun('kylttilaatikko', '0');
      await lippuun('kylttisiirto', '0');
      await sivu.waitForTimeout(900);
      const vastakoe = await napautaKylttia();
      ilmanSaantoaOpas = vastakoe.opas;
      ilmanSaantoa = vastakoe.sijaan;
      await lippuun('kylttiosuma', null);
      await lippuun('kylttilaatikko', null);
      await lippuun('kylttisiirto', null);
      await sivu.waitForTimeout(900);
    }
  }
  /*
   * VIUHKA ENNEN NOSTOJA. Aihemerkin napautus on kartan tila
   * (viuhka aukeaa ja sulkeutuu), ja se on mitattava puhtaasta
   * näkymästä — ennen kuin yksikään kortti on ehtinyt avautua.
   */
  let viuhkaTulos = null;
  let listaTulos = null;
  if (m.aihemerkit.length) {
    const suurinRyhma = [...m.aihemerkit].sort((a, b) => b.maara - a.maara)[0];
    // Puhdas näkymä: kyltin vastakokeiden jäljiltä auki jäänyt
    // nähtävyysarkki nielaisisi tämän napautuksen (ks. odotaVapaaPiste).
    const viuhkaEste = await odotaVapaaPiste(
      sivu, nurkka.x + suurinRyhma.x, nurkka.y + suurinRyhma.y,
    );
    if (viuhkaEste) tieto(`${ruutu.nimi} · viuhkan piste peitossa`, viuhkaEste);
    const viuhkaEnnen = await esitila(
      sivu, nurkka.x + suurinRyhma.x, nurkka.y + suurinRyhma.y,
    );
    tieto(`${ruutu.nimi} · esitila viuhka`, esitilaRivi(viuhkaEnnen));
    await napauta(sivu, nurkka.x + suurinRyhma.x, nurkka.y + suurinRyhma.y);
    await sivu.waitForTimeout(800);
    tieto(`${ruutu.nimi} · viuhkan napautus pelille`, await jalkitila(sivu, null));
    const kohdat = await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const r = l.pallo.renderer().domElement.getBoundingClientRect();
      return (l.nostot?.viuhkanOsumalaatikot?.() ?? []).map((b) => ({
        id: b.id, x: (b.x0 + b.x1) / 2 + r.left, y: (b.y0 + b.y1) / 2 + r.top,
      }));
    });
    /*
     * LISTA ON MITATTAVA AUKI (PAATOKSET 32 kohta 3): rivien laatikot
     * eivät saa limittyä keskenään eivätkä kaupungin nimen tai
     * pelinappulan kanssa, ja listan on mahduttava ruudulle. Luvut
     * ovat kotelon pikseleitä: rivit samasta kaavasta, jolla sormi
     * mittaa (viuhkanOsumalaatikot), nimi ja nappula DOMista.
     */
    const listaMitta = await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const r = l.pallo.renderer().domElement.getBoundingClientRect();
      const laatikko = (el) => {
        const b = el.getBoundingClientRect();
        return {
          x0: b.left - r.left, y0: b.top - r.top, x1: b.right - r.left, y1: b.bottom - r.top,
        };
      };
      return {
        ruutu: { leveys: r.width, korkeus: r.height },
        rivit: l.nostot?.viuhkanOsumalaatikot?.() ?? [],
        nimet: [...document.querySelectorAll('.pallolauta-nimi')].map(laatikko),
        nappulat: [...document.querySelectorAll('.pallolauta-nappula')].map(laatikko),
        /*
         * MUIDEN NOSTOJEN NIMIÖT JA MERKIT (PAATOKSET 32 kohta 5,
         * Fablen erä 3): listan alle ei saa jäädä toisen noston
         * tekstiä. Näkyvä muste luetaan DOMista, joten listan ajaksi
         * PIILOTETUT (visibility: hidden) eivät ole tässä joukossa —
         * juuri se on korjauksen väite, ja piilotettujen määrä
         * kirjataan erikseen.
         */
        nostot: [...document.querySelectorAll('.pallolauta-nosto')]
          .filter((el) => !el.classList.contains('pallolauta-nosto-piilossa')
            && !el.classList.contains('pallolauta-aihemerkki')
            && el.getBoundingClientRect().width > 0)
          .map((el) => ({ nimi: el.dataset.nimio || el.dataset.nosto || 'nosto', ...laatikko(el) })),
        piilotetut: l.nostot?.viuhkanPiilotetut?.() ?? [],
      };
    });
    await kaappaa(sivu, `pariisi-viuhkalista-${ruutu.w}.png`);
    const limittyy = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
    const rivitKeskenaan = [];
    for (let i = 0; i < listaMitta.rivit.length; i += 1) {
      for (let j = i + 1; j < listaMitta.rivit.length; j += 1) {
        if (limittyy(listaMitta.rivit[i], listaMitta.rivit[j])) {
          rivitKeskenaan.push(`${listaMitta.rivit[i].nimi} × ${listaMitta.rivit[j].nimi}`);
        }
      }
    }
    const musteenPaalla = [];
    for (const rivi of listaMitta.rivit) {
      for (const nimi of listaMitta.nimet) {
        if (limittyy(rivi, nimi)) musteenPaalla.push(`${rivi.nimi} × kaupungin nimi`);
      }
      for (const nappula of listaMitta.nappulat) {
        if (limittyy(rivi, nappula)) musteenPaalla.push(`${rivi.nimi} × nappula`);
      }
      // Muiden nostojen nimiöt ja merkit: limitys on virhe, koska
      // listan alle jäänyt muste on piilotettu (ks. yllä).
      for (const nosto of listaMitta.nostot) {
        if (limittyy(rivi, nosto)) musteenPaalla.push(`${rivi.nimi} × ${nosto.nimi}`);
      }
    }
    const reunanYli = listaMitta.rivit.filter((b) => b.x0 < 0 || b.y0 < 0
      || b.x1 > listaMitta.ruutu.leveys || b.y1 > listaMitta.ruutu.korkeus)
      .map((b) => b.nimi);
    listaTulos = {
      rivit: listaMitta.rivit.length,
      rivitKeskenaan,
      musteenPaalla,
      reunanYli,
      piilotetut: listaMitta.piilotetut ?? [],
    };
    tieto(`${ruutu.nimi} · viuhkalista`, `rivejä ${listaTulos.rivit}`
      + `, limityksiä ${rivitKeskenaan.length}`
      + `, musteen päällä ${musteenPaalla.length}`
      + `, reunan yli ${reunanYli.length}`
      + `, listan alle piilotettuja ${listaTulos.piilotetut.length}`
      + `${listaTulos.piilotetut.length ? ` (${listaTulos.piilotetut.map((x) => `${x.avain}/${x.osa}`).slice(0, 6).join('; ')})` : ''}`);
    let viuhkaKortti = null;
    if (kohdat.length) {
      await napauta(sivu, kohdat[0].x, kohdat[0].y);
      await sivu.waitForTimeout(900);
      viuhkaKortti = await avoinNosto(sivu);
    }
    await suljeKortti(sivu);
    /*
     * VIUHKA SULJETAAN ENNEN SEURAAVIA NAPAUTUKSIA. Auki jäänyt viuhka
     * on kartan oma tila: sen aikana kartan napautus SULKEE viuhkan
     * eikä avaa mitään (js/pallolauta/lauta.js napautaPintaan), joten
     * vartio 4 mittaisi väärää asiaa. Tämä on savukkeen siivous, ei
     * väite — viuhkan sulkeutumisen mittaa savuke-nimikyltti (9d).
     */
    await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      l.nostot?.suljeViuhka?.();
      l.ladoHeti?.();
    });
    await sivu.waitForTimeout(500);
    viuhkaTulos = { ryhma: suurinRyhma, kohdat, kortti: viuhkaKortti, lista: listaTulos };
  }

  const esteet = [];
  for (const id of ehdokkaat) {
    if (napautetut.length >= NAPAUTUKSIA) break;
    await suljeKortti(sivu);
    // Sulkeutuva kortti vie oman hetkensä; sen aikana tullut napautus
    // menisi hukkaan eikä kertoisi osumapinnasta mitään.
    await sivu.waitForTimeout(400);
    /*
     * PISTE LUETAAN VASTA ASETTUNEESTA LADONNASTA, JA NAPAUTUS
     * TEHDÄÄN SAMAAN PISTEESEEN (17.9.2026, Mac). Aiemmin piste
     * luettiin kerran ja napautettiin vasta siivousten jälkeen —
     * Macilla merkki oli siihen mennessä ehtinyt liikkua.
     */
    const piste = await odotaAsettunut(sivu, () => merkinPiste(sivu, id));
    if (!piste) continue;
    const px = nurkka.x + piste.x;
    const py = nurkka.y + piste.y;
    const este = await odotaVapaaPiste(sivu, px, py);
    // Paneelin alle jäävä merkki ohitetaan: sitä ei voi napauttaa
    // sormellakaan, eikä se ole tämän vartion väite. Este kirjataan,
    // jotta "napautettavia vain 0" ei jää arvoitukseksi.
    if (este) { esteet.push(`${id} (${este})`); continue; }
    const asteet = await sivu.evaluate((t) => {
      const o = window.matkakirja.ui.pallolauta.nostot.osumat().find((x) => x.id === t);
      return o ? { lat: o.lat, lng: o.lng } : null;
    }, id);
    const ennen = await esitila(sivu, px, py, asteet);
    tieto(`${ruutu.nimi} · esitila ${id}`, esitilaRivi(ennen));
    await napauta(sivu, px, py);
    await sivu.waitForTimeout(800);
    tieto(`${ruutu.nimi} · napautus ${id}`, await jalkitila(sivu, asteet));
    const auki = await avoinNosto(sivu);
    napautetut.push(`${id}→${auki ?? '-'}`);
    /*
     * OSUMASÄÄNTÖ ON LÄHIN MERKKI 44 px:N SÄTEELLÄ
     * (js/pallolauta/lauta.js NAPAUTUKSEN_SADE_PX). Rykelmässä sormen
     * pisteestä voi siis avautua NAAPURIN kortti, ja niin kuuluukin:
     * väite on *"napautus avaa noston popupin"*, ei "juuri tämän".
     * Vartio kaatuu, jos mitään ei aukea — ja jos kortin TUNNUS on
     * luettavissa (`ui.fokuskohdeAuki`), myös silloin, jos sen merkki
     * on yli 44 px:n päässä napautetusta pisteestä. Kuva edellä
     * -kortilla tunnusta ei ole, jolloin mitta on kortin olemassaolo.
     */
    if (!auki) { virheet.push(`${id}→ei korttia`); continue; }
    const avatunPiste = await merkinPiste(sivu, auki);
    const etaisyys = avatunPiste
      ? Math.hypot(avatunPiste.x - piste.x, avatunPiste.y - piste.y) : null;
    if (etaisyys !== null && etaisyys > NAPAUTUKSEN_SADE_PX) {
      virheet.push(`${id}→${auki} (${p(etaisyys)} px päässä)`);
    }
  }
  await suljeKortti(sivu);
  tieto(`${ruutu.nimi} · napautukset`, napautetut.join(', ') || 'ei yhtään');
  if (esteet.length) {
    tieto(`${ruutu.nimi} · peitossa (ohitettu)`, esteet.join(', '));
  }
  /*
   * 4. VANHENTUNUT VARTIO (mitattu 18.9.2026, era 3). Vartio napauttaa
   * PARIISIN OMIA nostoja (PARIISIN_NOSTOT), ja PAATOKSET 34 kohta 3
   * siirsi ne kartalta liuskaan: merkkeja ei ole, koska niiden KUULUU
   * olla poissa (`INFO napautukset: ei yhtaan`). Korvaaja on 8h
   * (kohteen napautus liuskasta avaa kortin). sarjat.json ennallaan —
   * Fable paattaa, mita sinne kirjataan.
   */
  tieto(`4. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    `kaupungin sisaiset nostot ovat liuskassa, ei kartalla (PAATOKSET 34 k. 3); `
    + `napautettavia ${napautetut.length}`
    + (virheet.length ? `, ${virheet.join(', ')}` : ''));

  /*
   * 4b. AIHEMERKIN VIUHKA AVAA KORTIN. Viuhkan kohtia on oltava
   * ryhmän verran (jokainen jäsen saa oman nimensä, PAATOKSET 27
   * kohta 2), ja kohdan napautuksesta on avauduttava kortti. Tunnusta
   * ei vaadita: viuhkasta avautuva nosto tulee usein KUVA EDELLÄ
   * -korttina (`.fokusnosto-kerros`), jolla ei ole `fokuskohdeAuki`-
   * tunnusta lainkaan (ks. avoinNosto).
   */
  tieto(`4b. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'aihemerkit poistuivat kaupungin sisalta — korvaaja on liuskan vartio 8 (PAATOKSET 34; sarjat.json ennallaan)');

  /*
   * 4c. VIUHKA ON SIISTI LISTA (PAATOKSET 32 kohta 3, omistaja
   * 17.9.2026 klo 20.35): rivit ovat *"yhtena siistina pystylistana"*
   * merkin vieressä — yksikään rivi ei limity toisen rivin,
   * kaupungin nimen eikä pelinappulan kanssa, ja koko lista on
   * ruudun sisällä. Rivin napautus avaa kortin (vartio 4b).
   */
  vaadi(`4c. ${ruutu.nimi}: viuhkalista ei limity eikä valu ruudun yli`,
    Boolean(viuhkaTulos?.lista) && viuhkaTulos.lista.rivitKeskenaan.length === 0
      && viuhkaTulos.lista.musteenPaalla.length === 0
      && viuhkaTulos.lista.reunanYli.length === 0,
    viuhkaTulos?.lista
      ? `rivejä ${viuhkaTulos.lista.rivit}`
        + `, rivi rivin päällä: ${viuhkaTulos.lista.rivitKeskenaan.join(', ') || 'ei'}`
        + `, musteen päällä: ${viuhkaTulos.lista.musteenPaalla.join(', ') || 'ei'}`
        + `, reunan yli: ${viuhkaTulos.lista.reunanYli.join(', ') || 'ei'}`
        + `, listan alle piilotettuja: ${viuhkaTulos.lista.piilotetut?.length ?? 0}`
      : 'listaa ei mitattu (ks. vartio 4b)');

  /*
   * ══════════════════════════════════════════════════════════════
   * 8. KAUPUNKILIUSKA (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34)
   * ══════════════════════════════════════════════════════════════
   *
   * Korvaa vartiot 4b ja 7d/7f/7g/7h/7i, jotka lukitsivat poistuneen
   * käyttöliittymän (aihemerkit kaupungin sisällä, turisti-infon
   * kyltti kartalla). Väitteet ovat päätöksen omat:
   *   8a. kaupungin sisäisiä nostomerkkejä kartalla 0 — kolmella
   *       zoomilla, koska raja on maantieteellinen eikä ruudun (k. 4);
   *   8b. Versailles, Chartres ja Chambord OVAT kartalla (k. 4);
   *   8c. kaupunkimerkin napautus ajaa kameran < 600 ms ja avaa
   *       liuskan (k. 1 ja 10);
   *   8d. liuska on kokonaan ruudussa eikä kaupungin nimen tai
   *       pelinappulan päällä (k. 10);
   *   8e. yläryhmä on 3 riviä (k. 8);
   *   8f. kategorioita ≥ 2 ja lukumäärien summa = sisäisten nostojen
   *       määrä (k. 5-7) — sama luku kuin 8a:n suodatus pudotti;
   *   8g. kategorian avaus näyttää kohteet, toisen avaus sulkee
   *       edellisen (haitari, k. 8);
   *   8h. kohteen napautus avaa kortin ja liuska sulkeutuu (k. 1);
   *   8i. liuskan lukumäärien summa ≥ 8 — Pariisin omat nostot ovat
   *       liuskassa eivätkä kartalla (era 5).
   *
   * 8a JA 8f MITTAAVAT NOSTON OMAA DATAPAIKKAA, eivät ladottua: se on
   * päätöksen kohta 4 sanatarkasti (*"noston oma paikka"*), ja se on
   * juuri se, minkä erä 4 mittasi väärin.
   */
  const kaupunginSisaiset = () => sivu.evaluate(async () => {
    const k = await import('/js/pallolauta/kaupunkiliuska.js');
    const n = window.matkakirja.ui.pallolauta.nostot;
    const osumat = n.osumat?.() ?? [];
    /*
     * KAUPUNKI ON PELAAJAN OMA LAUDAN KAUPUNKI, EI OSUMALISTAN
     * ENSIMMAINEN (korjattu 18.9.2026, era 4). Osumalistan ensimmainen
     * `kaupunki`-rivi oli LILLE, joten vartio mittasi Lillen ymparia ja
     * vastasi *"sisaisia kartalla 0 (kaikkiaan 0)"* myos silloin, kun
     * Pariisin omat nostot olivat kartalla. Vaite koskee Pariisia.
     */
    const { ui } = window.matkakirja;
    const oma = ui.game?.cityOf?.() ?? null;
    /*
     * KESKUS ON KAUPUNGIN OMA PISTE, JA JASENYYS LUETAAN NOSTON OMASTA
     * DATAPAIKASTA (Fablen tarkennus 18.9.2026, era 5). Era 4 mittasi
     * molemmat ladotuista paikoista: nostojen `lat`/`lng` oli
     * ankkurilevityksen (PAATOKSET 32) siirtama 33-74 km:n paahan, ja
     * keskus oli niiden mediaani. Silloin liuskassa oli kaksi
     * kategoriaa ja kaupungin omat nostot jaivat kartalle. Nyt molemmat
     * luetaan `omaLat`/`omaLng`-kentista, jotka ladonta ottaa talteen.
     */
    const ankkuri = oma
      ? (n.laudanAnkkurit?.() ?? []).find((a) => a.id === oma.id) ?? null
      : null;
    const city = ankkuri
      ? { id: ankkuri.id, lat: ankkuri.omaLat ?? ankkuri.lat, lng: ankkuri.omaLng ?? ankkuri.lng }
      : osumat.find((o) => o.kaupunki);
    if (!city) return null;
    const nakyvat = new Set([...document.querySelectorAll('.pallolauta-nosto')]
      .filter((el) => el.getBoundingClientRect().width > 0
        && getComputedStyle(el).visibility !== 'hidden')
      .map((el) => el.dataset.nosto));
    const sisalla = (o) => k.onKaupunginSisainen(o, { lat: city.lat, lng: city.lng });
    /*
     * JASENET MUKAAN. Aihemerkki on yksi merkki kartalla, mutta se
     * kantaa monta nostoa (`jasenet`): jos yksikaan niista on kaupungin
     * sateella, kartalla on kaupungin sisainen nosto.
     */
    const osat = (o) => (o.jasenet?.length ? o.jasenet : [o]);
    const sisallaKaikki = (o) => osat(o).some(sisalla);
    // Diagnoosi: lahimmat nostot kaupungin pisteesta kilometreina.
    const lahimmat = osumat.filter((o) => !o.kaupunki)
      .flatMap(osat)
      .map((o) => ({
        nimi: o.nimi ?? o.id,
        km: k.etaisyysKm(k.nostonOmaPaikka(o) ?? { lat: o.lat, lng: o.lng },
          { lat: city.lat, lng: city.lng }),
        // Onko datapaikka mukana lainkaan: ilman sita mitta on ladottu.
        oma: Number.isFinite(o.omaLat),
        ankkuri: o.kaupunkiAvain ?? null,
      }))
      .sort((a, b) => a.km - b.km).slice(0, 8);
    return {
      kaupunki: city.id,
      keskus: `${city.lat?.toFixed?.(4)}/${city.lng?.toFixed?.(4)}`,
      lahimmat,
      kartalla: osumat.filter((o) => !o.kaupunki && nakyvat.has(o.id) && sisallaKaikki(o))
        .map((o) => o.id),
      kaikki: osumat.filter((o) => !o.kaupunki && sisallaKaikki(o)).length,
    };
  });

  /* 8a. Kolme zoomia: lähizoomi ja kaksi uloimpaa porrasta. */
  const sisaisetZoomeilla = [];
  for (const porras of [LAHIZOOMIN_TAVOITE, 0.5, 0.7]) {
    /* eslint-disable no-await-in-loop */
    await zoomaaPariisiin(sivu, [porras]);
    await sivu.waitForTimeout(900);
    const tulos = await kaupunginSisaiset();
    /* eslint-enable no-await-in-loop */
    sisaisetZoomeilla.push({ porras, tulos });
    tieto(`${ruutu.nimi} · liuska zoom ${porras}`,
      tulos ? `sisäisiä kartalla ${tulos.kartalla.length} (kaikkiaan ${tulos.kaikki})`
        + `, kaupunki ${tulos.kaupunki} @ ${tulos.keskus}, lähimmät: `
        + tulos.lahimmat.map((l) => `${l.nimi} ${p(l.km)} km/${l.ankkuri ?? '-'}`
          + `${l.oma ? '' : ' (EI DATAPAIKKAA)'}`).join(', ')
        : 'kaupunkiriviä ei ollut');
  }
  vaadi(`8a. ${ruutu.nimi}: kaupungin sisäisiä nostomerkkejä kartalla 0 (3 zoomia)`,
    sisaisetZoomeilla.every((z) => z.tulos && z.tulos.kartalla.length === 0),
    sisaisetZoomeilla.map((z) => `${z.porras}: ${z.tulos?.kartalla.join(', ') ?? '—'}`).join(' | '));
  // Takaisin lähizoomiin: loput vartiot mittaavat sen näkymän.
  await zoomaaPariisiin(sivu, ZOOMIPORTAAT);
  await sivu.waitForTimeout(900);

  /*
   * 8b. Ankkuroidut mutta ULKOPUOLISET kohteet pysyvat kartalla.
   *
   * NIMET LUETAAN `nostot.osumat()`ISTA, EI DOMIN NIMIOISTA (korjattu
   * 18.9.2026, era 3:n mittaus): aihenostojen ryhmitys nayttaa vain
   * ryhman ensimmaisen nimen (`Nimi…`), joten DOM-nimio kertoi 1400
   * px:lla *"ei yhtaan"* vaikka kohteet olivat kartalla (vartio 3f oli
   * samaan aikaan vihrea). Osumalista on se, mika kartalla oikeasti on
   * — myos ryhman sisalla.
   */
  const ulkonaTeksti = await sivu.evaluate(
    () => (window.matkakirja.ui.pallolauta.nostot.osumat?.() ?? [])
      .flatMap((o) => [o.nimi ?? '', o.id ?? '', ...(o.jasenet ?? []).map((j) => j.nimi ?? '')])
      .join(' | '),
  );
  const LAHIKOHTEET = ['Versailles', 'Chartres', 'Chambord'];
  const loytyi = LAHIKOHTEET.filter((nimi) => new RegExp(nimi, 'iu').test(ulkonaTeksti));
  vaadi(`8b. ${ruutu.nimi}: Versailles, Chartres ja Chambord ovat kartalla`,
    loytyi.length === LAHIKOHTEET.length,
    `löytyi ${loytyi.join(', ') || 'ei yhtään'}`);

  /* 8c-8h: liuska auki kaupunkimerkin napautuksesta. */
  await suljeKortti(sivu);
  await sivu.waitForTimeout(300);
  /*
   * NAPAUTUS OSUU LAUDAN OMAAN KAUPUNKIMERKKIIN (Fablen paatos
   * kerrosrajasta, PAATOKSET 34 TILA; korjattu 18.9.2026, era 4).
   *
   * MITATTU SYY: nostokerroksen `kaupunki`-rivit ovat sisaltopakettien
   * NAKYVIA kaupunkeja (Lille, js/packs/nakyvat-kaupungit-fra.js).
   * Pelaajan Pariisi on LAUDAN kaupunki, jolla ei ole riviä siina
   * kerroksessa — era 3 napautti siksi Lillea ja mittasi Lillen
   * kortin. Piste luetaan nyt laudan kaupungista
   * (`pallolauta.kaupunki(id)` → `pallo.getScreenCoords`), eli
   * TASMALLEEN siita merkista, jota pelaajan sormi koskettaa.
   */
  const kaupunkiTieto = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const l = ui.pallolauta;
    const oma = ui.game?.cityOf?.() ?? null;
    const k = oma ? (l.kaupunki?.(oma.id) ?? null) : null;
    const p = k ? l.pallo.getScreenCoords(k.lat, k.lon, 0) : null;
    const rivit = (l.nostot.osumat?.() ?? []).filter((o) => o.kaupunki);
    return {
      oma: oma?.name ?? null,
      kaupunkirivit: rivit.map((o) => o.nimi ?? o.id),
      piste: p ? { x: p.x, y: p.y } : null,
    };
  });
  tieto(`${ruutu.nimi} · liuskan kaupunkimerkki`,
    `oma ${kaupunkiTieto.oma ?? '—'}, laudan merkki `
    + `${kaupunkiTieto.piste ? `${p(kaupunkiTieto.piste.x)},${p(kaupunkiTieto.piste.y)}` : 'EI RUUDULLA'}`
    + `, nostokerroksen kaupunkirivit [${kaupunkiTieto.kaupunkirivit.join(', ')}]`);
  const kPiste = kaupunkiTieto.piste;
  let liuskaTulos = null;
  if (kPiste) {
    /*
     * KAKSI NAPAUTUSYRITYSTÄ, JA SE ON MITATTU SYY. Juuri suljetun
     * kortin jälkeen pelin oma portti nielaisee seuraavan napautuksen
     * (js/pallolauta/lauta.js napautaPintaan, `korttiOliAuki`), joten
     * yksi napautus mittasi tässä savukkeessa nielun eikä liuskaa.
     * Ensimmäinen yritys ei siis ole vartion väite; VÄITE ON, ETTÄ
     * LIUSKA AUKEAA JA KAMERA-AJO KESTÄÄ ALLE 600 ms — kesto mitataan
     * siitä napautuksesta, joka meni läpi.
     */
    let kesto = null;
    let alku = Date.now();
    for (let yritys = 0; yritys < 2 && kesto === null; yritys += 1) {
      /* eslint-disable no-await-in-loop */
      alku = Date.now();
      await napauta(sivu, nurkka.x + kPiste.x, nurkka.y + kPiste.y);
      for (let i = 0; i < 40; i += 1) {
        const auki = await sivu.evaluate(
          () => window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null,
        );
        if (auki) { kesto = Date.now() - alku; break; }
        await sivu.waitForTimeout(50);
      }
      /* eslint-enable no-await-in-loop */
    }
    await sivu.waitForTimeout(400);
    const mitta = await sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const r = l.pallo.renderer().domElement.getBoundingClientRect();
      const laatikko = (el) => {
        const b = el.getBoundingClientRect();
        return {
          x0: b.left - r.left, y0: b.top - r.top, x1: b.right - r.left, y1: b.bottom - r.top,
        };
      };
      return {
        ruutu: { leveys: r.width, korkeus: r.height },
        rivit: l.nostot.liuskanRivit?.() ?? [],
        nimet: [...document.querySelectorAll('.pallolauta-nimi')].map(laatikko),
        nappulat: [...document.querySelectorAll('.pallolauta-nappula')].map(laatikko),
      };
    });
    liuskaTulos = { kesto, mitta };
  }
  await kaappaa(sivu, `pariisi-liuska-auki-${ruutu.w}.png`);
  const lRivit = liuskaTulos?.mitta?.rivit ?? [];
  tieto(`${ruutu.nimi} · liuska`,
    lRivit.length
      ? `${lRivit.length} riviä: ${lRivit.map((r) => r.nimi).join(' / ')} `
        + `(ajo ${liuskaTulos.kesto} ms)`
      : 'liuska ei auennut');
  vaadi(`8c. ${ruutu.nimi}: kaupunkimerkin napautus ajaa kameran < 600 ms ja avaa liuskan`,
    Boolean(lRivit.length) && Number.isFinite(liuskaTulos?.kesto) && liuskaTulos.kesto < 600,
    `ajo ${liuskaTulos?.kesto ?? '—'} ms, rivejä ${lRivit.length}`);
  const liuskaYli = lRivit.filter((b) => b.x0 < 0 || b.y0 < 0
    || b.x1 > (liuskaTulos?.mitta.ruutu.leveys ?? 0)
    || b.y1 > (liuskaTulos?.mitta.ruutu.korkeus ?? 0)).map((b) => b.nimi);
  const liuskaPaalla = [];
  for (const r of lRivit) {
    for (const nimi of liuskaTulos.mitta.nimet) {
      if (limittyy(r, nimi)) liuskaPaalla.push(`${r.nimi} × kaupungin nimi`);
    }
    for (const nappula of liuskaTulos.mitta.nappulat) {
      if (limittyy(r, nappula)) liuskaPaalla.push(`${r.nimi} × nappula`);
    }
  }
  vaadi(`8d. ${ruutu.nimi}: liuska on kokonaan ruudussa eikä nimen tai nappulan päällä`,
    Boolean(lRivit.length) && liuskaYli.length === 0 && liuskaPaalla.length === 0,
    `reunan yli: ${liuskaYli.join(', ') || 'ei'}, `
    + `musteen päällä: ${liuskaPaalla.join(', ') || 'ei'}`);
  const ylaryhma = lRivit.filter((r) => ['lehti', 'nahtavyydet', 'opas'].includes(r.laji));
  vaadi(`8e. ${ruutu.nimi}: liuskan yläryhmä on 3 riviä`,
    ylaryhma.length === 3,
    `rivejä ${ylaryhma.length}: ${ylaryhma.map((r) => r.nimi).join(', ') || '—'}`);
  const katRivit = lRivit.filter((r) => r.laji === 'kategoria');
  const summa = katRivit.reduce((a, r) => a + (r.maara ?? 0), 0);

  /* 8g. Haitari: ensimmäisen avaus näyttää kohteet, toisen sulkee sen. */
  const napautaLiuskanRivi = async (rivi) => {
    if (!rivi) return null;
    await napauta(sivu, nurkka.x + (rivi.x0 + rivi.x1) / 2, nurkka.y + (rivi.y0 + rivi.y1) / 2);
    await sivu.waitForTimeout(500);
    return sivu.evaluate(() => ({
      kategoria: window.matkakirja.ui.pallolauta.nostot.liuskanKategoria?.() ?? null,
      rivit: window.matkakirja.ui.pallolauta.nostot.liuskanRivit?.() ?? [],
    }));
  };
  const auki1 = await napautaLiuskanRivi(katRivit[0]);
  const kohteita1 = (auki1?.rivit ?? []).filter((r) => r.laji === 'kohde');
  const toinenKat = (auki1?.rivit ?? []).filter((r) => r.laji === 'kategoria')[1];
  const auki2 = await napautaLiuskanRivi(toinenKat);
  const kohteita2 = (auki2?.rivit ?? []).filter((r) => r.laji === 'kohde');
  /*
   * ══ 8j. AVATTU KATEGORIA EI YLITÄ ESTEITÄ ═══════════════════════
   *
   * Fablen tarkistus 18.9.2026 (kaappaus pariisi-liuska-kategoria-390):
   * *"kun kategoria avataan, liuska kasvaa ylöspäin ja peittää
   * PARIISI-kaupunginnimen"*. 8d mittaa liuskan KIINNI-tilassa, joten
   * se oli vihreä vaikka avattu lista nousi nimen päälle. Tämä vartio
   * mittaa saman väitteen AVATTUNA ja nimenomaan SUURIMMALLA
   * kategorialla — se on pahin tapaus 390 px:n ruudulla.
   */
  const isoinKat = [...katRivit].sort((a, b) => (b.maara ?? 0) - (a.maara ?? 0))[0];
  const avattavaIso = (auki2?.rivit ?? [])
    .filter((r) => r.laji === 'kategoria')
    .find((r) => r.aihe === isoinKat?.aihe);
  const isoAuki = (avattavaIso && avattavaIso.aihe !== auki2?.kategoria)
    ? await napautaLiuskanRivi(avattavaIso)
    : auki2;
  await kaappaa(sivu, `pariisi-liuska-kategoria-${ruutu.w}.png`);
  const aukiMitta = await sivu.evaluate(() => {
    const l = window.matkakirja.ui.pallolauta;
    const r = l.pallo.renderer().domElement.getBoundingClientRect();
    const laatikko = (el) => {
      const b = el.getBoundingClientRect();
      return {
        x0: b.left - r.left, y0: b.top - r.top, x1: b.right - r.left, y1: b.bottom - r.top,
      };
    };
    return {
      ruutu: { leveys: r.width, korkeus: r.height },
      rivit: l.nostot.liuskanRivit?.() ?? [],
      nimet: [...document.querySelectorAll('.pallolauta-nimi')].map(laatikko),
      nappulat: [...document.querySelectorAll('.pallolauta-nappula')].map(laatikko),
    };
  });
  const aukiRivit = aukiMitta.rivit ?? [];
  const aukiYli = aukiRivit.filter((b) => b.x0 < 0 || b.y0 < 0
    || b.x1 > aukiMitta.ruutu.leveys || b.y1 > aukiMitta.ruutu.korkeus).map((b) => b.nimi);
  const aukiPaalla = [];
  for (const r of aukiRivit) {
    for (const nimi of aukiMitta.nimet) if (limittyy(r, nimi)) aukiPaalla.push(`${r.nimi} × nimi`);
    for (const nap of aukiMitta.nappulat) if (limittyy(r, nap)) aukiPaalla.push(`${r.nimi} × nappula`);
  }
  tieto(`${ruutu.nimi} · avattu liuska`,
    `${isoAuki?.kategoria ?? '—'} (${isoinKat?.maara ?? '—'} kohdetta), rivejä `
    + `${aukiRivit.length}, korkeus ${aukiRivit.length
      ? Math.round(Math.max(...aukiRivit.map((b) => b.y1))
        - Math.min(...aukiRivit.map((b) => b.y0)))
      : 0} px, kelausrivejä ${aukiRivit.filter((r) => r.laji === 'kelaus').length}`);
  vaadi(`8j. ${ruutu.nimi}: avattu kategoria pysyy ruudussa eikä nimen tai nappulan päällä`,
    aukiRivit.length > 0 && Boolean(isoAuki?.kategoria)
      && aukiYli.length === 0 && aukiPaalla.length === 0,
    `kategoria ${isoAuki?.kategoria ?? '—'}, reunan yli: ${aukiYli.join(', ') || 'ei'}, `
    + `musteen päällä: ${aukiPaalla.join(', ') || 'ei'}`);
  tieto(`${ruutu.nimi} · liuskan haitari`,
    `1. avaus ${auki1?.kategoria ?? '—'} → kohteita ${kohteita1.length}; `
    + `2. avaus ${auki2?.kategoria ?? '—'} → kohteita ${kohteita2.length}`);
  vaadi(`8g. ${ruutu.nimi}: kategorian avaus näyttää kohteet, toisen avaus sulkee edellisen`,
    kohteita1.length === (katRivit[0]?.maara ?? -1)
      && Boolean(auki2?.kategoria) && auki2.kategoria !== auki1?.kategoria
      && kohteita2.length === (toinenKat?.maara ?? -1)
      && kohteita2.every((r) => r.aihe === auki2.kategoria),
    `1: ${kohteita1.length}/${katRivit[0]?.maara ?? '—'}, `
    + `2: ${kohteita2.length}/${toinenKat?.maara ?? '—'}`);

  /*
   * 8f. LUKUMÄÄRÄT PITÄVÄT PAIKKANSA. Riippumatonta lukua EI saa
   * `nostot.osumat()`ista: se on kartan lista, josta kaupungin
   * sisäiset nostot on jo pudotettu (juuri se on 8a:n väite, mitattu
   * *"kaikkiaan 0"*). Vertailuluku luetaan siksi SISÄLLÖSTÄ: jokainen
   * kategoria avataan kerran ja sen kohderivit lasketaan. Vartio
   * kaatuu, jos otsikon luku ja rivien määrä eroavat — se on sama
   * lupaus kuin "summa = kaupungin sisäisten nostojen määrä", koska
   * liuska on ainoa paikka, jossa ne nostot ovat.
   */
  const kategorioidenSisallot = [];
  for (const kat of katRivit) {
    /* eslint-disable no-await-in-loop */
    const tuoreet = (await sivu.evaluate(
      () => window.matkakirja.ui.pallolauta.nostot.liuskanRivit?.() ?? [],
    )).filter((r) => r.laji === 'kategoria');
    const rivi = tuoreet.find((r) => r.aihe === kat.aihe);
    const avattu = await napautaLiuskanRivi(rivi);
    /* eslint-enable no-await-in-loop */
    const kohteita = (avattu?.rivit ?? []).filter((r) => r.laji === 'kohde'
      && r.aihe === kat.aihe).length;
    kategorioidenSisallot.push({ aihe: kat.aihe, otsikko: kat.maara, kohteita });
  }
  const sisaltoSumma = kategorioidenSisallot.reduce((a, k) => a + k.kohteita, 0);
  tieto(`${ruutu.nimi} · liuskan kategoriat`,
    kategorioidenSisallot.map((k) => `${k.aihe}: ${k.otsikko}/${k.kohteita}`).join(', ') || '—');
  vaadi(`8f. ${ruutu.nimi}: kategorioita ≥ 2 ja lukumäärien summa = kohteiden määrä`,
    katRivit.length >= 2 && summa > 0 && summa === sisaltoSumma
      && kategorioidenSisallot.every((k) => k.otsikko === k.kohteita),
    `kategorioita ${katRivit.length}, otsikoiden summa ${summa}, kohteita ${sisaltoSumma}`);

  /*
   * 8i. PARIISIN NOSTOT OVAT OIKEASTI LIUSKASSA (Fablen tarkistus
   * 18.9.2026, era 5). 8f sanoo vain, etta otsikoiden luvut pitavat
   * paikkansa — se oli vihrea myos silloin, kun liuskassa oli kaksi
   * nostoa ja kaupungin loput nostot (Kyyhkyposti, Impressionistit,
   * Tuileriain rauniot, Mona Lisan varkaus, Tuileries, Paras patonki…)
   * seisoivat yha kartalla. Tama vartio mittaa MAARAA: Pariisin omia
   * nostoja on tunnetusti kahdeksan tai enemman, joten summa alle
   * kahdeksan tarkoittaa, etta jasenyys mittaa taas vaaraa pistetta.
   */
  vaadi(`8i. ${ruutu.nimi}: liuskan lukumäärien summa ≥ 8 (Pariisin omat nostot)`,
    summa >= 8,
    `summa ${summa}, kategoriat `
    + `${katRivit.map((r) => `${r.nimi}`).join(', ') || '—'}`);

  /*
   * ══ 8h. KOHTEEN NAPAUTUS AVAA KORTIN (PAATOKSET 34 kohta 1) ═══════
   *
   * ODOTUS ON KYSELY, EI KELLOA. Erä 5:ssä vartio oli punainen
   * (*"kohde Tuileries, kortti -, liuska kiinni: true"*): liuska
   * sulkeutui eli napautus MENI läpi, mutta kiinteä 800 ms:n odotus
   * luki kortin ennen kuin se oli DOMissa. Kortti luetaan siksi
   * silmukassa, ja jos sitä ei kuulu, tuloste kertoo mitä sivulla on
   * (`kerrokset`) — niin ero "ei auennut" ja "auennut väärä kortti"
   * näkyy mittauksesta eikä päättelystä.
   */
  /*
   * KOHDE VALITAAN ENSIMMÄISESTÄ KATEGORIASTA, EI SIITÄ, MIKÄ SATTUI
   * JÄÄMÄÄN AUKI. 8f:n kierros päättyy viimeiseen kategoriaan, joka
   * Pariisissa on "Kadonneet ihmeet" — ja sen nostoilla on OMA avaaja
   * (js/fokuskohteet.js: `kohde.avaa` ohittaa kohteiden tietoruudun),
   * joten vartio mittasi aarrekortin ehtoja eikä liuskan riviä.
   */
  const eka = (await sivu.evaluate(
    () => window.matkakirja.ui.pallolauta.nostot.liuskanRivit?.() ?? [],
  )).filter((r) => r.laji === 'kategoria')[0];
  const avattuEka = eka?.aihe !== (await sivu.evaluate(
    () => window.matkakirja.ui.pallolauta.nostot.liuskanKategoria?.() ?? null,
  )) ? await napautaLiuskanRivi(eka) : null;
  const viimeisimmat = ((avattuEka?.rivit) ?? (await sivu.evaluate(
    () => window.matkakirja.ui.pallolauta.nostot.liuskanRivit?.() ?? [],
  ))).filter((r) => r.laji === 'kohde');
  const liuskanKohde = viimeisimmat[0] ?? kohteita2[0] ?? kohteita1[0] ?? null;
  let liuskanKortti = null;
  /*
   * PELI EI OTA NAPAUTUSTA VASTAAN KESKEN OMAA TEKOAAN. Kerroksen
   * portti on `ui.busy` (js/pallolauta/nostot.js napautaLiuskasta), ja
   * 8f:n kategoriakierros jättää pelin hetkeksi varatuksi: silloin
   * napautus ei avaa korttia mutta lauta sulkee liuskan, eli mittari
   * kirjaisi pelin viaksi oman kiireensä. Odotus on siksi kysely.
   */
  const tila = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    for (let i = 0; i < 30 && (ui.busy || ui.dead); i += 1) {
      /* eslint-disable-next-line no-await-in-loop, no-promise-executor-return */
      await new Promise((r) => setTimeout(r, 100));
    }
    return { busy: Boolean(ui.busy), dead: Boolean(ui.dead) };
  });
  // Onko rivin päällä jotain muuta (esim. kelluva pulunappi)? Tämä on
  // se ero, jota erän 5 punainen ei osannut kertoa.
  const kohteenPeite = liuskanKohde
    ? await peitossa(sivu,
      nurkka.x + (liuskanKohde.x0 + liuskanKohde.x1) / 2,
      nurkka.y + (liuskanKohde.y0 + liuskanKohde.y1) / 2)
    : 'ei kohdetta';
  if (liuskanKohde) {
    await napauta(sivu,
      nurkka.x + (liuskanKohde.x0 + liuskanKohde.x1) / 2,
      nurkka.y + (liuskanKohde.y0 + liuskanKohde.y1) / 2);
    for (let i = 0; i < 24 && !liuskanKortti; i += 1) {
      /* eslint-disable-next-line no-await-in-loop */
      liuskanKortti = await avoinNosto(sivu);
      /* eslint-disable-next-line no-await-in-loop */
      if (!liuskanKortti) await sivu.waitForTimeout(100);
    }
  }
  const kerrokset = await sivu.evaluate(() => [...document.querySelectorAll(
    '[class*="-kerros"], .fokuskohde-popup, .minipopup, .kaupunkipopup, dialog[open]',
  )].map((e) => String(e.className?.baseVal ?? e.className ?? e.tagName)).slice(0, 6));
  const liuskaKiinni = await sivu.evaluate(
    () => (window.matkakirja.ui.pallolauta.nostot.liuskaAuki?.() ?? null) === null,
  );
  vaadi(`8h. ${ruutu.nimi}: liuskan kohde avaa kortin ja liuska sulkeutuu`,
    Boolean(liuskanKohde) && Boolean(liuskanKortti) && liuskaKiinni,
    `kohde ${liuskanKohde?.nimi ?? '—'} (avaaja ${liuskanKohde?.avattava}), `
    + `kortti ${liuskanKortti ?? '-'}, liuska kiinni: ${liuskaKiinni}, `
    + `busy ${tila.busy}/dead ${tila.dead}, rivin päällä: ${kohteenPeite ?? 'ei mitään'}, `
    + `sivulla: ${kerrokset.join(' | ') || 'ei kerroksia'}`);
  await suljeKortti(sivu);
  await sivu.waitForTimeout(400);


  /*
   * ══════════════════════════════════════════════════════════════
   * 7. TURISTI-INFON KYLTTI (PAATOKSET 31 TARKENNUS 1 kohta 3)
   * ══════════════════════════════════════════════════════════════
   *
   * Fable 16.9.2026 klo 20.45 UTC: kyltti *"kasvaa lähizoomissa
   * rajatta ja leikkautuu ruudun laidasta — kohdan 2 ruutupikselikatto
   * ei koske sitä"*. Kyltti on js/kaupunkinosto.js:n oma merkki, ei
   * karttanosto, joten vartiot 1 ja 2 eivät sitä mitanneet.
   *
   * Kolme väitettä, kaikki samasta ruudusta ja samasta zoomista kuin
   * nostojen omat:
   *   7.  nimiö ei kasva yli nostojen katon (NIMION_KATTO_PX);
   *   7b. kyltin piirretty ala mahtuu koteloon — juuri se, mikä
   *       omistajan kuvassa leikkautui oikeasta laidasta;
   *   7c. (INFO) napautus merkin omasta ruutupisteestä — avaako se
   *       matkailijan oppaan (js/kaupunkinosto.js avaaTuristiOpas →
   *       #nahtavyys-dialog)? Napautus tehdään puhtaasta tilasta ennen
   *       muita kortteja, ks. sen oma perustelu ylempänä.
   * Vastakoe on 7d: katto pois kesken ajon (`?nimiokatto=0`).
   */
  const t = m.turisti;
  const turistiNimio = t ? t.mitta * NOSTOSYM_NIMIO_KOKO : 0;
  const tSaapuen = saapuen.turisti;
  tieto(`${ruutu.nimi} · turisti-infon kyltti`,
    t
      ? `mitta ${p(t.mitta, 4)}, nimiö ${p(turistiNimio)} px, `
        + `laatikko ${p(t.x0)},${p(t.y0)} → ${p(t.x1)},${p(t.y1)} `
        + `(leveys ${p(t.x1 - t.x0)} px, kotelo ${p(m.koti.w)} × ${p(m.koti.h)} px), `
        + `saapuessa nimiö ${p(tSaapuen ? tSaapuen.mitta * NOSTOSYM_NIMIO_KOKO : 0)} px`
      : 'ei kyltillä kartalla');
  /*
   * ══ 7, 7b, 7c JA 7e OVAT VANHENTUNEITA VARTIOINA (INFO) ═════════
   *
   * TURISTI-INFON KYLTTIÄ EI OLE KARTALLA. PAATOKSET 34 kohta 8 siirsi
   * turisti-infon kaupunkiliuskan riviksi *"Turistiopas"*, ja kyltin
   * piirto on sammutettu koodissa asti: js/pallolauta/lauta.js
   * `KYLTTI_KARTALLA = false`, jolloin `paivitaTuristiInfo` palauttaa
   * tyhjän eikä kyltillä ole varausta lainkaan. Neljä vartiota väittää
   * kyltistä jotain (nimiön koko, mahtuminen koteloon, napautus,
   * laatikon vapaus), joten ne ovat punaisia MOLEMMILLA ruuduilla joka
   * ajossa eivätkä ole enää häilyviä — ne mittaavat poistunutta
   * käyttöliittymää.
   *
   * INFOKSI EIKÄ POISTOON: luku on yhä hyödyllinen, jos kyltti joskus
   * palaa kartalle (lippu on yhä koodissa), ja poistettu vartio ei
   * kertoisi mitään, jos kyltti palaisi rikkinäisenä. Väitteen samasta
   * asiasta esittää nyt liuskan vartio 8e (yläryhmässä on Turistiopas-
   * rivi). `sarjat.jsonia` EI muutettu — se on Fablen päätös.
   */
  tieto(`${ruutu.nimi} · 7 (INFO, vanhentunut): turisti-infon nimiö ≤ ${NIMION_KATTO_PX} px`,
    t
      ? `${p(turistiNimio)} px (mitta ${p(t.mitta, 4)}) — katto ${NIMION_KATTO_PX} px`
      : 'kylttiä ei ole kartalla (KYLTTI_KARTALLA = false, PAATOKSET 34 kohta 8)');
  const tYli = t
    ? (t.x0 < 0 || t.y0 < 0 || t.x1 > m.koti.w || t.y1 > m.koti.h) : true;
  tieto(`${ruutu.nimi} · 7b (INFO, vanhentunut): kyltti mahtuu koteloon`,
    `${Boolean(t) && !tYli ? 'mahtuu · ' : ''}${t
      ? `laatikko ${p(t.x0)},${p(t.y0)} → ${p(t.x1)},${p(t.y1)}, `
        + `kotelo ${p(m.koti.w)} × ${p(m.koti.h)} px`
      : 'kylttiä ei ole kartalla (KYLTTI_KARTALLA = false)'}`);
  /*
   * 7c. KYLTIN NAPAUTUS AVAA TURISTI-INFON — NYT VARTIO (omistaja
   * 17.9.2026 klo 03.30 UTC, Raamattu KARTTAUUDISTUKSEN PAATOKSET 31
   * TARKENNUS 2 kohta 4, kortti *"Kyltti voittaa kosketusvaran"*:
   * *"sormi suoraan kyltin päällä avaa turisti-infon"*).
   *
   * MITATTU VIKA (16.9.2026, molemmat ruudut): sormi TÄSMÄLLEEN kyltin
   * päällä avasi Guimardin metron, jonka merkki on 16,4 px päässä —
   * kaksi omistajan omaa sääntöä osui yhteen (nostojen 16 px:n
   * kosketusvara, 7.9.2026, ja noston musteen etuoikeus kyltin yli,
   * 14.9.2026 Chambord). Rivi oli siksi INFO 16.9.2026: korjaus
   * tarvitsi omistajan päätöksen siitä, kumpi sääntö väistää.
   *
   * PÄÄTÖS ON NYT TEHTY ja sääntö on KAPEA: kyltin muste voittaa vain
   * noston KOSKETUSVARAN, ei sen omaa mustetta. Siksi tämä rivi on
   * vartio ja Bukarestin lappuvartiot (savuke-pallo-nostolaput 6 ja 7)
   * pysyvät vihreinä — niissä sormi ei ole kyltin päällä.
   *
   * Vastakoe on 7g: sama sormi ilman sääntöä (`?kylttiosuma=0`).
   */
  tieto(`${ruutu.nimi} · turisti-infon kyltin napautus`,
    tPiste
      ? (opasEste
        ? `merkki on peitossa: ${opasEste}`
        : (opasAuki
          ? `avasi oppaan (${opasAuki})`
          : `EI avannut opasta — auki sen sijaan: ${opasSijaan ?? 'ei mitään'}`))
      : 'kylttiä ei ollut kartalla');
  tieto(`${ruutu.nimi} · 7c (INFO, vanhentunut): napautus kyltin päälle avaa oppaan`,
    `${Boolean(tPiste) && !opasEste && Boolean(opasAuki) ? 'avasi · ' : ''}${tPiste
      ? (opasEste
        ? `merkki on peitossa: ${opasEste}`
        : `auki sen sijaan: ${opasSijaan ?? 'ei mitään'}`)
      : 'kylttiä ei ole kartalla (KYLTTI_KARTALLA = false)'}`);
  tieto(`${ruutu.nimi} · kyltin napautus pelkkä osumasääntö pois (?kylttiosuma=0)`,
    tPiste && !opasEste
      ? (vainOsumaOpas
        ? `avasi oppaan (${vainOsumaOpas}) — laatikkokorjaus riittää tällä ruudulla`
        : `auki sen sijaan: ${vainOsuma ?? 'ei mitään'}`)
      : 'ei mitattu');
  tieto(`${ruutu.nimi} · kyltin napautus erän säännöt pois `
    + '(?kylttiosuma=0&kylttilaatikko=0&kylttisiirto=0)',
    tPiste && !opasEste
      ? (ilmanSaantoaOpas
        ? `avasi oppaan (${ilmanSaantoaOpas})`
        : `auki sen sijaan: ${ilmanSaantoa ?? 'ei mitään'}`)
      : 'ei mitattu');
  tieto(`7g. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34; sarjat.json ennallaan)');
  /*
   * ── 7e. KYLTIN LAATIKKO ON VAPAA (omistaja 17.9.2026, PAATOKSET 31
   *    TARKENNUS 2 kohta 6) ───────────────────────────────────────────
   *
   * MITATTU VIKA: `merkit.laatikot('turistiinfo')` palautti 1 × 1 px:n
   * PISTEEN, koska merkin svg on 1 × 1 px ja piirros elää
   * `overflow: visible` -ryhmässä. Nimiladonta (varaukset) ja nostojen
   * sovittelu (esteet) latoivat siksi kyltin päälle — omistajan kuvassa
   * *"Turisti-in…"* ja *"Mona Lisan varkaus…"* päällekkäin.
   *
   * VÄITE: yksikään kaupungin nimi eikä yksikään NÄKYVÄ nostolappu
   * leikkaa kyltin varausta. Kaupunkinimi saa siirtyä (omistajan oma
   * tarkennus) — vartio ei siis vaadi nimeä paikalleen vaan kyltin
   * vapaaksi. Vastakoe on 7h: `?kylttilaatikko=0` palauttaa pisteen.
   */
  tieto(`${ruutu.nimi} · kyltin asento vakiintui`, asettuiKohtaan || 'ei kylttiä');
  const varaus = m.turistiVaraus;
  const limittyyLaatikko = (a2, b2) => Boolean(a2) && Boolean(b2)
    && a2.x0 < b2.x1 && b2.x0 < a2.x1 && a2.y0 < b2.y1 && b2.y0 < a2.y1;
  const nimiaPaalla = varaus ? m.nimet.filter((r) => limittyyLaatikko(varaus, r)) : [];
  const lappujaPaalla = varaus ? m.laput.filter((r) => limittyyLaatikko(varaus, r)) : [];
  /*
   * MERKIT MITATAAN OSUMALAATIKOISTA, EI DATAN PISTEISTÄ. Sovittelu
   * siirtää myös IKONIA (`dx`, `dy`), joten merkin datapiste ei kerro,
   * missä sen muste ruudulla on — mitattu 17.9.2026, työpöytä 1400 px:
   * *Kyyhkyposti…* -aihemerkin datapiste oli kaukana kyltistä, mutta
   * sen siirretty ikoni kyltin ankkurin päällä.
   */
  const merkkejaPaalla = varaus ? m.laatikot.filter((r) => limittyyLaatikko(varaus, r)) : [];
  tieto(`${ruutu.nimi} · kyltin varaus ladonnassa`,
    varaus
      ? `${p(varaus.x0)},${p(varaus.y0)} → ${p(varaus.x1)},${p(varaus.y1)} `
        + `(${p(varaus.x1 - varaus.x0)} × ${p(varaus.y1 - varaus.y0)} px), `
        + `nimiä päällä ${nimiaPaalla.length}/${m.nimet.length}, `
        + `lappuja päällä ${lappujaPaalla.length}/${m.laput.length}, `
        + `osumalaatikoita päällä ${merkkejaPaalla.length}/${m.laatikot.length}`
        + (lappujaPaalla.length ? ` — ${lappujaPaalla.map((r) => r.nimi).join(', ')}` : '')
        + (merkkejaPaalla.length ? ` — ${merkkejaPaalla.map((r) => r.id).join(', ')}` : '')
      : 'ei varausta');
  tieto(`${ruutu.nimi} · 7e (INFO, vanhentunut): kyltin laatikko on vapaa`,
    `${Boolean(varaus) && varaus.x1 - varaus.x0 > 2
      && nimiaPaalla.length === 0 && lappujaPaalla.length === 0
      && merkkejaPaalla.length === 0 ? 'vapaa · ' : ''}${varaus
      ? `varaus ${p(varaus.x1 - varaus.x0)} × ${p(varaus.y1 - varaus.y0)} px, `
        + `nimiä ${nimiaPaalla.length}, lappuja ${lappujaPaalla.length}, `
        + `merkkejä ${merkkejaPaalla.length}`
      : 'kyltillä ei ole varausta (KYLTTI_KARTALLA = false)'}`);
  /*
   * ── 7f. KYLTIN KERROIN ON SAMA KUIN MUILLA MERKEILLÄ (omistaja
   *    17.9.2026, PAATOKSET 31 TARKENNUS 2 kohta 5) ──────────────────
   *
   * MITATTU EPÄSUHTA 16.9.2026: kyltin vertailuleveys oli maan laatikko
   * × 1,15 eikä laitteen saapumisnäkymä, joten sama pelitilanne antoi
   * saapuessa puhelimella 27,18 px:n ja työpöydällä 8,25 px:n nimiön —
   * ja katon jälkeen puhelimella kyltti seisoi 16 px:ssä jo saapuessa.
   *
   * VÄITE: saapumisnäkymässä nimiö on KAUPUNKIMERKIN_NIMIO_PX (11,5 px)
   * molemmilla ruuduilla, ja lähizoomissa se on katossa (16 px). Kaksi
   * lukua, sama kummallakin ruudulla — juuri se, mitä kortti pyysi.
   */
  const saapumisenNimio = tSaapuen ? tSaapuen.mitta * NOSTOSYM_NIMIO_KOKO : 0;
  tieto(`7f. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34; sarjat.json ennallaan)');

  /*
   * 7d. VASTAKOE: KATTO POIS KESKEN AJON (`?nimiokatto=0`,
   * js/fokusnosto-symbolit.js). Kyltin kerrointa ei voi laskea
   * savukkeessa kuten nostojen (vartio 1b): sen vertailuleveys on maan
   * laatikko × 1,15 eikä laitteen saapumisnäkymä
   * (js/pallolauta/lauta.js paivitaTuristiInfo), eikä laatikko ole
   * savukkeen ulottuvilla. Lippu kääntää katon pois SAMASSA näkymässä
   * — ei sivun uudelleenlatausta, vain uusi ladonta — ja sitten
   * mitataan sama kyltti uudelleen. Näin vastakoe on aito mittaus
   * eikä laskutoimitus.
   */
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('nimiokatto', '0');
    window.history.replaceState(null, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  const kattoPois = await mittaa(sivu);
  const tIlman = kattoPois.turisti;
  const turistiIlmanKattoa = tIlman ? tIlman.mitta * NOSTOSYM_NIMIO_KOKO : 0;
  const tIlmanYli = tIlman
    ? (tIlman.x0 < 0 || tIlman.y0 < 0
      || tIlman.x1 > kattoPois.koti.w || tIlman.y1 > kattoPois.koti.h) : false;
  tieto(`${ruutu.nimi} · turisti-info ilman kattoa (?nimiokatto=0)`,
    tIlman
      ? `nimiö ${p(turistiIlmanKattoa)} px, leveys ${p(tIlman.x1 - tIlman.x0)} px, `
        + `laidan yli ${tIlmanYli ? 'kyllä' : 'ei'}`
      : 'kylttiä ei ollut kartalla');
  tieto(`7d. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34; sarjat.json ennallaan)');
  // Lippu pois: kuva ja mahdolliset myöhemmät mittaukset ovat korjatusta
  // laudasta, eivät vastakokeesta.
  await sivu.evaluate(() => {
    const u = new URL(window.location.href);
    u.searchParams.delete('nimiokatto');
    window.history.replaceState(null, '', u.toString());
    window.matkakirja.ui.pallolauta.ladoHeti?.();
  });
  await sivu.waitForTimeout(900);
  /*
   * 7h. VASTAKOE: VARAUS TAKAISIN PISTEEKSI (`?kylttilaatikko=0`,
   * js/pallolauta/lauta.js pallonSaantoKaytossa). Sama näkymä, sama
   * ladonta — mutta kyltin varaus on taas se 1 × 1 px:n piste, joka
   * merkin svg:stä luetaan. Väite on kaksiosainen ja mitattu, ei
   * laskettu: varaus kutistuu, ja ladonta latoo kyltin päälle.
   */
  await lippuun('kylttilaatikko', '0');
  await lippuun('kylttisiirto', '0');
  await sivu.waitForTimeout(900);
  const pisteVaraus = await mittaa(sivu);
  const pv = pisteVaraus.turistiVaraus;
  const pisteNimia = pv ? pisteVaraus.nimet.filter((r) => limittyyLaatikko(pv, r)) : [];
  const pistePaalla = pv
    ? pisteVaraus.laput.filter((r) => limittyyLaatikko(pisteVaraus.turisti, r)) : [];
  tieto(`${ruutu.nimi} · kyltin varaus ilman sääntöjä `
    + '(?kylttilaatikko=0&kylttisiirto=0)',
    pv
      ? `${p(pv.x1 - pv.x0)} × ${p(pv.y1 - pv.y0)} px (korjattuna `
        + `${varaus ? `${p(varaus.x1 - varaus.x0)} × ${p(varaus.y1 - varaus.y0)}` : '—'} px), `
        + `nimiä varauksen päällä ${pisteNimia.length}, `
        + `lappuja kyltin piirroksen päällä ${pistePaalla.length}`
        + (pistePaalla.length ? ` — ${pistePaalla.map((r) => r.nimi).join(', ')}` : '')
      : 'ei varausta');
  tieto(`7h. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34; sarjat.json ennallaan)');
  await lippuun('kylttilaatikko', null);
  await sivu.waitForTimeout(900);
  /*
   * 7i. VASTAKOE: KYLTTI EI SIIRRY (`?kylttisiirto=0`, PAATOKSET 31
   * TARKENNUS 3). Varaus on oikean kokoinen, mutta kyltti jää
   * ensimmäiseen asentoonsa — ja silloin *Impressionistit…* -aihemerkki
   * on kyltin laatikon sisällä eikä sen nimiölle löydy vapaata asentoa
   * yhdeltäkään kyljeltä. Väite on siis se sama, jonka vartio 3e4
   * mittaa: ilman siirtoa aihenoston nimiö katoaa.
   */
  const ilmanSiirtoa = await mittaa(sivu);
  const isVaraus = ilmanSiirtoa.turistiVaraus;
  const isMerkit = isVaraus
    ? ilmanSiirtoa.laatikot.filter((r) => limittyyLaatikko(isVaraus, r)) : [];
  const isPiilossa = ilmanSiirtoa.aihemerkit.filter((a) => a.nimi && !a.nimioNakyy);
  tieto(`${ruutu.nimi} · kyltti ilman siirtoa (?kylttisiirto=0)`,
    isVaraus
      ? `varaus ${p(isVaraus.x0)},${p(isVaraus.y0)} → ${p(isVaraus.x1)},${p(isVaraus.y1)}, `
        + `osumalaatikoita päällä ${isMerkit.length}`
        + (isMerkit.length ? ` (${isMerkit.map((r) => r.id).join(', ')})` : '')
        + `, aihenoston nimiö piilossa ${isPiilossa.length}`
      : 'ei varausta');
  /*
   * VASTAKOE MITTAA SIIRRON, EI SEN SEURAUSTA. Seuraus (aihenoston
   * nimiö katoaa) on ladonnan tila, joka ehtii vakiintua savukkeen
   * loppupuolella eri tavalla eri ruuduilla — mitattu 17.9.2026:
   * työpöydällä nimiö on piilossa, puhelimella ei enää tässä kohtaa
   * ajoa. Siirto itse on deterministinen: ilman sääntöä kyltti jää
   * ensimmäiseen asentoonsa (TURISTI_INFO_RUUTUSIIRTO), säännön kanssa
   * se on muualla. Seuraus jää INFO-riville yllä.
   */
  const siirtyi = Boolean(varaus) && Boolean(isVaraus)
    && (Math.abs(varaus.x0 - isVaraus.x0) > 2 || Math.abs(varaus.y0 - isVaraus.y0) > 2);
  tieto(`7i. ${ruutu.nimi}: VANHENTUNUT VARTIO`,
    'turisti-infon kyltti ei ole enaa kartalla (PAATOKSET 34; sarjat.json ennallaan)');
  await lippuun('kylttisiirto', null);
  await sivu.waitForTimeout(900);

  await kaappaa(sivu, `pariisi-lahizoom-${ruutu.w}.png`);
  await ctx.close();

  /*
   * 3c. VASTAKOE `?aihemerkit=0`: sama peli ilman ryhmitystä.
   *
   * MITTA ON LIMITYS SAAPUMISNÄKYMÄSSÄ, EI LÄHIZOOMISSA. Kaksi syytä,
   * molemmat mitattuja 16.9.2026:
   *   1. Saapumisnäkymä on se, jolle PAATOKSET 27 kirjoitettiin
   *      (*"Pariisin saapumisnäkymässä limittyviä nimiöitä 0"*), ja
   *      siellä ero on suurin: rykelmä mahtuu 26,6 × 135,4 px:n alaan.
   *   2. Lähizoomissa ero on kadonnut, koska ruutupikselikatto
   *      (vartio 1) kutistaa nimiöt niin pieniksi, että sovittelu
   *      mahtuu latomaan nekin limittymättä — mitattu: 0 paria
   *      kummallakin. Se EI ole vastakokeen epäonnistuminen vaan
   *      katon ansio, ja siksi vastakoe mittaa sen näkymän, jossa
   *      ryhmityksellä on oikeasti tehtävä.
   * Lähizoomin luvut jäävät INFO-riveiksi.
   */
  const limitysparit = (mit) => {
    const laatikot = rykelmanLaatikot(mit);
    let parit = 0;
    for (let i = 0; i < laatikot.length; i += 1) {
      for (let j = i + 1; j < laatikot.length; j += 1) {
        if (limittyy(laatikot[i], laatikot[j])) parit += 1;
      }
    }
    return parit;
  };
  const paritSaapuen = limitysparit(saapuen);
  const paritLahella = limitysparit(m);
  tieto(`${ruutu.nimi} · rykelmän limittyvät nimiöparit`,
    `saapuen ${paritSaapuen}, lähizoomissa ${paritLahella}`);
  const vastakoe = await avaaSivu(ruutu, { ryhmitys: false });
  const vSaapuen = await mittaa(vastakoe.sivu);
  const vParitSaapuen = limitysparit(vSaapuen);
  await zoomaaPariisiin(vastakoe.sivu, ZOOMIPORTAAT);
  const v = await mittaa(vastakoe.sivu);
  tieto(`${ruutu.nimi} · vastakoe ilman ryhmitystä`,
    `saapuen limityspareja ${vParitSaapuen} (aihemerkkejä ${vSaapuen.aihemerkit.length}); `
    + `lähizoomissa merkkejä ${v.merkit.length}, limityspareja ${limitysparit(v)}, `
    + `laidan yli ${laidanYli(v).length}`);
  /*
   * 3c. VANHENTUNUT VASTAKOKEENA (PAATOKSET 34 kohta 3). Vastakoe
   * vertaa rykelmän limittyviä nimiöpareja ryhmityksen kanssa ja
   * ilman, mutta kaupungin sisäiset nostot eivät ole enää kartalla:
   * rykelmää ei ole kummassakaan ajossa, joten ero on nolla eikä
   * väite mittaa ryhmitystä. Luvut jäävät tiedoksi.
   */
  tieto(`${ruutu.nimi} · 3c (INFO, vanhentunut vastakoe)`,
    `limityspareja ${vParitSaapuen} (ryhmityksen kanssa ${paritSaapuen}), `
    + `aihemerkkejä ${vSaapuen.aihemerkit.length} — kaupungin rykelmä on liuskassa`);
  await kaappaa(vastakoe.sivu, `pariisi-lahizoom-ilman-ryhmitysta-${ruutu.w}.png`);
  await vastakoe.ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
