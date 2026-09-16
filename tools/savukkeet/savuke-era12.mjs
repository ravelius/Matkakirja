/*
 * Savuke: KARTTAUUDISTUKSEN ERÄ 12 — ZOOMIN RAJAUS JA MAAPANEELI
 * BISKAJANLAHDELLE (Ranska-pilotti).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 9 (omistaja 14.9.2026 klo
 * 11.00 UTC, sanatarkasti): *"aloita zoomin rajoittamisesta ja siirra
 * maainfo laatikko biskajanlahden paalle. silla pitaa olla kiintea
 * paikka ja koko. eli koko pysyy karttaan verrattuna samana, suurenee
 * zoomatessa ja toisinpain. laatikolla saisi olla isommat sisennykset
 * tekstille (kehys liian lahella)."*
 *
 * Kolme väitettä, kaikki Ranskassa (Pariisi):
 *
 *   1. ULOSZOOMAUS EI ONNISTU. Saapumisnäkymä JA uloin sallittu
 *      näkymä ovat sama asia: OrbitControlsin `maxDistance` on
 *      enintään ULOSZOOMAUSVARA verran kameran saapumiskorkeutta
 *      ulompana, ja ctrl-rulla ulospäin ei kasvata näkyvää leveyttä
 *      sitä enempää. Mitataan 9 sekunnin levon jälkeen, jotta
 *      erässä 12 korjattu mittauspiikki (ks. alla) ehtii tapahtua.
 *   2. PANEELI ON MEREN PÄÄLLÄ. Paneelin nelikulmio (25 näytepistettä)
 *      ei osu YHDENKÄÄN maan polygoniin — ei Ranskan eikä Espanjan.
 *      Polygonit luetaan samasta aineistosta kuin peli
 *      (assets/data/maapolygonit.json, js/maanaariviivat.js), ja
 *      paneelin paikka luetaan AJOSSA OLEVASTA pelistä
 *      (lauta.maapaneeli.mitat()), ei koodivakiosta.
 *   3. KOKO ON KIINTEÄ KARTTAAN NÄHDEN. Kolmella zoomitasolla (uloin
 *      sallittu, puolet siitä, neljäsosa) paneelin ruutuskaalan ja
 *      kameran korkeuden TULO on vakio ±SUHTEEN_VARA — eli
 *      ruutukoko ∝ kartan mittakaava ilman katkoa. Sama mitataan
 *      suoraan kortin ruutuleveyden ja paneelin OMAN lautamitan
 *      ruutuprojektion suhteena.
 *   5. RAJAUS ON AIVAN MAAN RAJOJEN ULKOPUOLELLA (erä 13, omistaja
 *      14.9.2026: *"kartta zoomautuu liian kauas. pitaa rajautua aivan
 *      rajojen ulkopuolelle."*). Rajauksen ruutulaatikko on maan
 *      laatikon kehän projektio yhdistettynä maapaneelin korttiin, ja
 *      SITOVALLA akselilla tyhjää tilaa on enintään TYHJAN_KATTO
 *      (9 % erästä 19d alkaen, ks. vakion perustelu);
 *      lisäksi laatikko on kokonaan ruudussa (mikään ei leikkaudu).
 *   6. PUHELIN PYSTYSSÄ SOVITETAAN KORKEUTEEN (erä 14, Raamattu
 *      KARTTAUUDISTUKSEN PÄÄTÖKSET 17): 390 × 844 -ruudulla sitova
 *      akseli on Y, sen tyhjä on enintään TYHJAN_KATTO (9 %), ja pelaajan
 *      kaupunki on ruudun keskellä vaakasuunnassa enintään
 *      KAUPUNGIN_POIKKEAMA verran sivussa. X-ylivuoto on PÄÄTÖS.
 *   7. PANOROINTI TUO MAAN REUNAN RUUDULLE eikä laatikon reuna tule
 *      ruudun sisään: kummassakin ääripäässä (länsi = Bretagne, itä =
 *      Elsass) maan kärki on ruudulla ja laatikon reuna ruudun
 *      ulkopuolella.
 *   9. KREIKAN ANKKURI (erä 18, Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET
 *      20, omistaja 15.9.2026 työpöytäkuvalla). Leveällä ruudulla
 *      Kreikan maapaneeli on JOONIANMERELLÄ Peloponnesoksen
 *      länsipuolella, merikilpikonna-noston vasemmalla puolella;
 *      kapealla ruudulla AIGEIANMERELLÄ Peloponnesoksen ja Kreetan
 *      välissä. Molemmilla: 25 näytepistettä merellä, kortti kokonaan
 *      ruudulla, ei yhtään päällekkäisyyttä nostojen, nimikylttien,
 *      kaupunkimerkkien, reitin tai pulun kanssa.
 *  10. PANEELI EI ESTÄ ZOOMIA EIKÄ VIERITYSTÄ (erä 18, PÄÄTÖKSET 21).
 *      Ctrl-rulla paneelin päällä muuttaa kameran korkeutta yhtä
 *      paljon kuin kartan päällä (±10 %; mitattu 0,93, ero on
 *      osoittimen paikka eikä vika), raahaus paneelin päältä
 *      panoroi, tekstivalinta ei ala raahauksesta ja plus-nappi avaa
 *      yhä valikon ruutunapautuksella.
 *   8. ANKKURI SEURAA KUVASUHDE-EHTOA (erä 16, Raamattu
 *      KARTTAUUDISTUKSEN PÄÄTÖKSET 18, omistaja 15.9.2026). Kapealla
 *      ruudulla (390 px pystyssä — sama ehto kuin PÄÄTÖKSET 17:n
 *      korkeussovituksella, ei laitetunnistusta) Ranskan maapaneelin
 *      ankkuri on LYONINLAHDELLA, kortti on saapuessa kokonaan
 *      ruudulla ja meren päällä; leveällä ruudulla (1400 px) ankkuri
 *      on ennallaan BISKAJANLAHDELLA.
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 * Kaikki tehdään TARJOILTAVAAN LÄHDETEKSTIIN, joten peli ajaa
 * oikeasti vanhalla arvolla — ei piilotettua koetta.
 *
 *   A. ULOSZOOMAUKSEN_KERROIN 1,15 → 3 (erää 2 edeltänyt arvo).
 *      VÄITTEEN 1 ON KAADUTTAVA.
 *   B. MAAPANEELIN_ANKKURIT tyhjäksi → ankkuri palaa maan laatikon
 *      eteläreunaan. VÄITTEEN 2 ON KAADUTTAVA (paneeli osuu
 *      Espanjaan).
 *   C. MAAPANEELIN_SKAALA_MAX → 0,5 (katto kesken pelialueen, ks.
 *      kokeen oma perustelu). VÄITTEEN 3 ON KAADUTTAVA: katto
 *      katkaisee skaalauksen kesken pelialueen.
 *   D. `pallonKorkeus` palauttamaan null → rajaus lasketaan taas laudan
 *      Mercator-yksiköistä, kuten ennen erää 13. Kokeessa muutetaan
 *      VAIN MITTA, ei varaa, joten tulos ei ole vanha näkymä vaan
 *      vastaus kysymykseen *"tekeekö mitta eron"*. VÄITTEEN 5 ON
 *      KAADUTTAVA.
 *   E. MAAPANEELIN_KATTO_RUUDUSTA 0,095 → 10 (erän 15 katto pois) →
 *      paneeli mitoitetaan taas pelkästä maan laatikosta.
 *      LEVEYSVÄITTEEN ON KAADUTTAVA (puhelimella mitattu 21,7 %).
 *   F. Erän 12 valikkotyyli takaisin (kaksi palstaa tummassa
 *      laatikossa) → VALIKKOVÄITTEEN 7 ON KAADUTTAVA.
 *   K. PÄÄTÖKSET 22 KORJAUS: yleinen `button { min-height: 42px }`
 *      palautetaan voittamaan `.maapaneeli-aihe`n oman
 *      `min-height: 0`:n → VÄITTEIDEN 7 JA 7B ON KAADUTTAVA (rivien
 *      väli/tekstikoko-suhde karkaa kauas 1,3:sta, myös zoomattuna).
 *   G. `korkeuteenSovitus` palauttamaan null → rajaus tehdään taas
 *      MOLEMPIIN suuntiin, kuten ennen erää 14. KORKEUSSOVITUSVÄITTEEN
 *      ON KAADUTTAVA (sitova akseli vaihtuu X:ksi ja pystyyn jää
 *      mitattu 59 % tyhjää).
 *   I. Kreikan ankkuririvit pois → paneeli palaa eteläreunaan Kreetan
 *      alle. VÄITTEEN 9 ON KAADUTTAVA: kortti ei ole enää nostojen
 *      vasemmalla puolella.
 *   J. `stopPropagation` ja `pointer-events: auto` takaisin korttiin →
 *      VÄITTEEN 10 ON KAADUTTAVA: ctrl-rulla paneelin päällä ei muuta
 *      kameran korkeutta.
 *   H. MAAPANEELIN_KAPEAT_ANKKURIT tyhjäksi → Ranska jää
 *      Biskajanlahdelle myös pystypuhelimella. VÄITTEEN 8 ON
 *      KAADUTTAVA: korkeuteen sovitettu saapumisnäkymä rajaa ruudun
 *      maan pystymittaan, ja laatikon länsireunan takana oleva kortti
 *      jää ruudun ULKOPUOLELLE.
 *
 * === MIKSI 9 SEKUNNIN LEPO ON OSA KOETTA ============================
 *
 * Erässä 12 mitattu vika (Ranska 390 × 844): ResizeObserver ajaa
 * `mitoita`n noin 7 s saapumisen jälkeen kotelon hetkellisellä
 * mitalla, jolloin uloszoomauksen katto laskee alle kameran korkeuden
 * ja OrbitControls puristaa kameran sisään; katto palaa mutta kamera
 * ei. Vika näkyy VAIN, jos mittaus tehdään piikin jälkeen.
 *
 * === VERKKO ========================================================
 *
 * Pallo tarvitsee Globe.gl:n ämpäristä. Jos ämpäri ei vastaa, savuke
 * ohitetaan (sama sääntö kuin muilla pallosavukkeilla).
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { puraMaanRenkaat } from '../../js/maanaariviivat.js';
import { KARTTANIMI_KOOT } from '../../js/karttanimet.js';
import { NOSTOSYM_NIMIO_KOKO } from '../../js/fokusnosto-symbolit.js';
import { projisoiLaudalle } from '../../js/fokusmitat.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/**
 * Sallittu uloszoomausvara: kuinka paljon `maxDistance` saa olla
 * saapumiskorkeutta ulompana. Luku EI ole mitoitus vaan väite, ja se
 * on valittu suunnitellun varan ja mitatun vian väliin:
 *
 *   suunniteltu  erässä 13 uloszoomauksen kerroin JA saapumisen vara
 *                ovat sama luku 1 + 2 × 0,01 = 1,02  →  0 % (ennen
 *                erää 13: 1,15 vs. 1,10 → 4,5 % työpöydällä)
 *   mitattu vika  mittauspiikin jälkeen 49 % (puhelin, 14.9.2026)
 *   vastakoe A    kerroin 3            →  yli 150 %
 */
const ULOSZOOMAUSVARA = 0.02;
/**
 * Väitteen 3 sallittu hajonta kolmen zoomitason välillä.
 *
 * MITTA ON `skaala × korkeus`, EI RUUTULEVEYKSIEN SUHDE. Kortti on
 * litteä HTML-elementti, jonka mittakaava on ruudun KESKIPISTEEN
 * mittakaava; kartan pinta on pallo, jolla sama lautamitta kattaa
 * ruudulla eri määrän pikseleitä sen mukaan, missä päin ruutua se on
 * ja millä leveyspiirillä (Mercatorin cos φ). Ruutuleveyksien suhde
 * heittelee siis pallon geometriasta 4–10 % ilman yhtään katkoa
 * koodissa — se kirjataan INFOna. Sen sijaan `skaala × korkeus` on
 * tasan vakio silloin ja vain silloin, kun mikään raja ei katkaise
 * skaalausta: skaala ∝ px per lautayksikkö ∝ 1 / korkeus.
 */
const SUHTEEN_VARA = 0.02;
/**
 * VÄITE 5: TYHJÄ TILA SITOVALLA AKSELILLA (erä 13, omistaja 14.9.2026
 * sanatarkasti: *"kartta zoomautuu liian kauas. pitaa rajautua aivan
 * rajojen ulkopuolelle."*).
 *
 * Mitta on RAJAUKSEN (maa + maapaneeli) ruutulaatikko: maan laatikon
 * kehä projisoituna `getScreenCoords`illa ja maapaneelin kortin oma
 * ruutulaatikko yhdistettynä. Tyhjä tila = ruudun mitta miinus
 * laatikon mitta, jaettuna ruudun mitalla; SITOVA AKSELI on se, jolla
 * tyhjää on vähemmän — toisella akselilla tyhjää saa olla, koska
 * laatikon kuvasuhde ei ole ruudun kuvasuhde.
 *
 * KATTO 3,5 % JA SEN PERUSTELU. Saapumisen vara on 1 + 2 × 0,01 =
 * 1,02, eli KAUIMMAINEN laatikon reuna asettuu tasan 98 %:iin ruudun
 * puolikkaasta. Koko akselin tyhjä on silti hitusen enemmän, koska
 * kamera osoittaa laatikon keskipisteeseen LAUDAN yksiköissä eikä
 * pallon projektion keskelle: toiselle reunalle jää enemmän tilaa kuin
 * toiselle. MITATTU Ranskassa erän 13 jälkeen 1,08 % (390 × 844) ja
 * 3,01 % (1400 × 900); ennen erää 13 luvut olivat 35,3 % ja 27,5 %.
 * Katto oli 3,5 % eikä 3,0 %, jottei vartio kaadu kuormitetun koneen
 * puolen prosentin heitosta — se erottaa silti korjatun rajauksen
 * korjaamattomasta kymmenkertaisella marginaalilla (vastakoe D).
 *
 * ══════════════════════════════════════════════════════════════════
 * KATTO 9 % ERÄSTÄ 19d ALKAEN — SAMA NÄKYMÄ, ERI MITTA
 * ══════════════════════════════════════════════════════════════════
 *
 * 3,5 % mitattiin aikana, jolloin MAAPANEELI OLI KARTALLA ja riippui
 * maan laatikon alapuolella: yllä oleva `yhd` on maan laatikon JA
 * PANEELIN KORTIN yhdiste, joten kortti täytti juuri sen tilan, jonka
 * sama paneeli oli saapumislaatikkoon lisännyt. Tyhjää ei siis jäänyt
 * mitattavaksi.
 *
 * ERÄ 19 siirsi paneelin RUUDUN nurkkaan (PÄÄTÖKSET 28), jolloin
 * kortti ei enää ole kartalla eikä täytä kehystä. Erä 19d palautti
 * saapumisnäkymän väljyyden v1917:n tasolle omana vakionaan
 * (js/pallolauta/maapaneeli.js SAAPUMISEN_VARA, 5 % per sivu), koska
 * omistaja on nähnyt ja hyväksynyt juuri sen näkymän eikä pyytänyt
 * zoomin muutosta. SAMA NÄKYMÄ lukee nyt eri tavalla:
 *
 *   ilman väljyyttä (v1918)   tyhjä Y 2,91 % (390) ja 2,90 % (1400)
 *   väljyys takaisin (19d)    tyhjä Y 7,12 % (390) ja 7,11 % (1400)
 *
 * Ero on tasan se 10 %:n laatikkoväljennys, joka on omistajan
 * hyväksymä. Katto on siksi 9 %: se päästää läpi mitatun 7,1 %:n ja
 * jättää heittovaran, mutta kaataisi yhä korjaamattoman rajauksen
 * (vastakoe D mittasi 35,3 % ja 27,5 %) nelinkertaisella
 * marginaalilla.
 */
const TYHJAN_KATTO = 0.09;
/*
 * VÄITE 6: PYSTYRUUDULLA SITOVA AKSELI ON Y (erä 14, Raamattu
 * KARTTAUUDISTUKSEN PÄÄTÖKSET 17). Puhelimen kotelo on 0,46-suhteinen
 * ja Ranskan laatikko pallolla noin 1,05 — ruutu on siis laatikkoa
 * KAPEAMPI, ja saapumisnäkymä sovitetaan korkeuteen. Väite mittaa
 * kolme asiaa yhdestä hetkestä: sitova akseli on Y, sen tyhjä on
 * enintään TYHJAN_KATTO, ja pelaajan kaupunki on ruudun keskellä
 * vaakasuunnassa enintään KAUPUNGIN_POIKKEAMA verran sivussa.
 */
const KAUPUNGIN_POIKKEAMA = 0.10;
/**
 * Kolme zoomitasoa osuuksina uloimmasta sallitusta korkeudesta.
 * Sisin on valittu niin, että se YLITTÄÄ erän 11 katon (SKAALA_MAX 3)
 * molemmilla ruuduilla — muuten vastakoe C ei mittaisi mitään.
 */
const ZOOMITASOT = [1, 0.25, 0.125];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/** Vastakokeen kytkin: 'A'…'E' tai null. Muutos tarjoiltuun lähdetekstiin. */
let vastakoe = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (vastakoe === 'A' && polkuOsa.endsWith('/js/pallolauta/kamera.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/ULOSZOOMAUKSEN_KERROIN = [^;]+;/, 'ULOSZOOMAUKSEN_KERROIN = 3;'));
  }
  if (vastakoe === 'B' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    /*
     * ANKKURI POIS *JA* ERÄN 12 KOKO TAKAISIN. Paneeli kutistui
     * 14.9.2026 illan päätöksellä kymmenesosaan ruudun leveydestä, ja
     * niin pieni kortti mahtuu Ranskan eteläreunallakin merelle —
     * silloin koe ei enää mittaisi sitä, mitä se väittää mittaavansa
     * (mitattu: osumia 0). Koe palauttaa siksi molemmat: ilman
     * Biskajanlahden ankkuria ENTISEN KOKOINEN paneeli osuu maahan.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_ANKKURIT = \{[\s\S]*?\n\};/, 'MAAPANEELIN_ANKKURIT = {};')
      // ERÄ 16: kapea ruutu (390 px) käyttää Lyoninlahtea, joten
      // pelkkä leveän ankkurin poisto ei enää palauttaisi paneelia
      // eteläreunaan. Molemmat taulut on tyhjennettävä.
      .replace(/MAAPANEELIN_KAPEAT_ANKKURIT = \{[\s\S]*?\n\};/, 'MAAPANEELIN_KAPEAT_ANKKURIT = {};')
      .replace(/MAAPANEELIN_TEKSTIKERROIN = [\d.]+/, 'MAAPANEELIN_TEKSTIKERROIN = 1')
      /*
       * ERÄ 15: MYÖS KATTO ON PURETTAVA. Uusi ruutukatto leikkaisi
       * paneelin pieneksi kertoimesta riippumatta, ja pieni kortti
       * mahtuu Ranskan eteläreunallakin merelle (mitattu: osumia 0).
       */
      .replace(/MAAPANEELIN_KATTO_RUUDUSTA = [\d.]+/, 'MAAPANEELIN_KATTO_RUUDUSTA = 10'));
  }
  if (vastakoe === 'I' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    /*
     * ERÄ 18 — VASTAKOE I: KREIKAN ANKKURIT POIS. Paneeli palaa maan
     * laatikon eteläreunaan eli Kreetan alle Libyanmerelle. Se on yhä
     * merellä ja ruudulla, joten kokeen kaataa VÄITTEEN 9 se osa, joka
     * on omistajan oma sana: kortti ei ole enää merikilpikonna-noston
     * vasemmalla puolella vaan ruudun toisella laidalla.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace(/GRC: \{ lat: 37\.8, lng: 19\.9 \},\n/, '')
      .replace(/GRC: \{ lat: 36\.15, lng: 24\.35 \},\n/, ''));
  }
  if (vastakoe === 'J' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    /*
     * ERÄ 18 — VASTAKOE J: ELEIDEN PYSÄYTYS TAKAISIN KORTTIIN. Tämä on
     * täsmälleen se koodi, joka oli ennen PÄÄTÖKSET 21:tä: neljä
     * tapahtumaa pysäytetään kortissa. Yhdessä CSS:n `pointer-events:
     * auto`n kanssa (alla) väitteen 10 ON kaaduttava — ctrl-rulla
     * paneelin päällä ei muuta kameran korkeutta lainkaan.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace('  el.appendChild(kortti);\n  return el;',
        '  for (const t of [\'pointerdown\', \'touchstart\', \'wheel\', \'click\']) {\n'
        + '    kortti.addEventListener(t, (e) => e.stopPropagation(), { passive: true });\n'
        + '  }\n  el.appendChild(kortti);\n  return el;'));
  }
  if (vastakoe === 'J' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace('  pointer-events: none;\n  user-select: none;\n  touch-action: manipulation;',
        '  pointer-events: auto;\n  touch-action: manipulation;'));
  }
  if (vastakoe === 'H' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    /*
     * ERÄ 16 — VASTAKOE H: KAPEA-ANKKURI POIS. Ranska jää
     * Biskajanlahdelle myös pystypuhelimella, jolloin korkeuteen
     * sovitettu saapumisnäkymä (PÄÄTÖKSET 17) rajaa ruudun maan
     * PYSTYMITTAAN ja laatikon länsireunan takana oleva kortti jää
     * ruudun ULKOPUOLELLE. Väitteen 8 on kaaduttava.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_KAPEAT_ANKKURIT = \{[\s\S]*?\n\};/,
        'MAAPANEELIN_KAPEAT_ANKKURIT = {};'));
  }
  if (vastakoe === 'D' && polkuOsa.endsWith('/js/pallolauta/kamera.js')) {
    /*
     * Erää 13 edeltänyt MITTA: korkeus laskettiin laudan
     * Mercator-yksiköistä eikä pallon perspektiivistä. Yksi rivi
     * riittää — `pallonKorkeus` palauttaa null, jolloin kameranKohde
     * putoaa takaisin vanhaan `korkeus(leveys)`-polkuun. Vara pysyy
     * uutena (1,02), joten koe eristää nimenomaan mitan.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace('const pallonKorkeus = (bbox, vara = 1) => {',
        'const pallonKorkeus = (bbox, vara = 1) => { if (bbox || vara) return null;'));
  }
  if (vastakoe === 'G' && polkuOsa.endsWith('/js/pallolauta/kamera.js')) {
    /*
     * Erää 14 edeltänyt sovitus: `korkeuteenSovitus` palauttaa null,
     * jolloin rajaus tehdään taas MOLEMPIIN suuntiin (PÄÄTÖKSET 12) ja
     * puhelimen pystyruudulle jää mitattu 59 % tyhjää pystysuunnassa.
     *
     * KOUKKU OLI ERÄSSÄ 14 KIRJOITETTU 'E':lle (kirjoitusvirhe), joten
     * vastakoe G ajoi täysin normaalilla koodilla ja oli siksi
     * punaisena (17/19). Nyt se on sillä kirjaimella, jonka koe lukee.
     */
    runko = Buffer.from(runko.toString('utf8')
      .replace('const korkeuteenSovitus = (bbox, vara = 1) => {',
        'const korkeuteenSovitus = (bbox, vara = 1) => { if (bbox || vara) return null;'));
  }
  if (vastakoe === 'C' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      /*
       * KATTO ON ASETETTAVA SIIHEN, MISSÄ RUUTUSKAALA NYT KULKEE.
       * Erän 11 luku 3 oli sidottu silloiseen paneelikokoon; ruutuskaala
       * on sen jälkeen kutistunut kahdesti (erän 13 kerroin ja erän 15
       * ruutukatto), ja saapumisessa se on nyt 0,34 (390 px) ja 0,83
       * (1400 px). Kiinteä 3 ei enää sitoisi kolmen zoomin sisällä
       * eikä koe kaataisi väitettä (mitattu: hajonta 0). Luku 0,5 on
       * sama koe samassa kohdassa: se katkaisee skaalauksen kesken
       * pelialuetta, ja väitteen 3 ON kaaduttava.
       */
      .replace(/MAAPANEELIN_SKAALA_MAX = [\d.]+ \* MAAPANEELIN_TEKSTIKERROIN/,
        'MAAPANEELIN_SKAALA_MAX = 0.5'));
  }
  /*
   * E: ERÄN 15 KATTO POIS → LEVEYSVÄITTEEN ON KAADUTTAVA.
   *
   * Ennen erää 15 koe palautti erän 12 paneelikoon (TEKSTIKERROIN 1).
   * Se ei enää kaataisi väitettä siitä syystä, jota väite mittaa: uusi
   * katto (MAAPANEELIN_KATTO_RUUDUSTA) leikkaisi myös kertoimella 1
   * molemmat ruudut kymmenesosaan. Koe purkaa siksi juuri sen katon —
   * jäljelle jää erän 13 mitoitus maan laatikosta, joka PÄÄTÖKSET 17:n
   * korkeussovituksen jälkeen antaa puhelimelle mitatut 21,7 %.
   */
  if (vastakoe === 'E' && polkuOsa.endsWith('/js/pallolauta/maapaneeli.js')) {
    runko = Buffer.from(runko.toString('utf8')
      .replace(/MAAPANEELIN_KATTO_RUUDUSTA = [\d.]+/, 'MAAPANEELIN_KATTO_RUUDUSTA = 10'));
  }
  // F: erän 12 valikko takaisin (kaksi palstaa, kiinni kortissa).
  if (vastakoe === 'F' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.from(runko.toString('utf8')
      /*
       * ANKKUROITU RIVIN ALKUUN (`^…/m`). Ilman sitä ensimmäinen osuma
       * on `.pallolauta-poistuu .maapaneeli-valikko { … }` rivillä
       * ~25837, ja koe muutti väärää sääntöä — mitattu 15.9.2026:
       * vastakoe F oli punainen, koska valikon tyyli ei muuttunut.
       */
      .replace(/^\.maapaneeli-valikko \{[\s\S]*?\n\}/m, `.maapaneeli-valikko {
  position: absolute;
  top: calc(100% - 2px);
  right: -3px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  width: 105px;
  padding: 2.5px;
  background: var(--overlay-card);
  border: 0.5px solid var(--overlay-line);
  border-radius: 2.5px;
  pointer-events: auto;
}`));
  }
  /*
   * K: PÄÄTÖKSET 22 KORJAUS kohta d PALAUTETAAN VIKAAN. Yleinen
   * `button { min-height: 42px }` voittaa taas rivin oman
   * `min-height: 0`:n (lisätään sääntö tiedoston LOPPUUN, jolloin se
   * voittaa kaskadissa saman erityisyyden `.maapaneeli-aihe`-säännöt).
   * Tämä on TÄSMÄLLEEN se vika, jonka omistaja kuvasi (Unkari
   * zoomattuna, rivit kaukana toisistaan) — vastakokeen on siis
   * kaadutettava sekä väite 7 että 7b.
   */
  if (vastakoe === 'K' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.concat([runko, Buffer.from('\n.maapaneeli-aihe { min-height: 42px; }\n')]);
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);
/*
 * ERÄ 19 (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 28, omistaja 15.9.2026
 * klo 20.45 UTC): maapaneeli palasi RUUDUN VASEMPAAN ALAKULMAAN, eikä
 * se ole enää kartassa kiinni. Tämän savukkeen erä 12 -vartiot
 * mittasivat juuri karttaan kiinnitystä — maakohtaista ankkuria
 * (Biskajanlahti/Lyoninlahti/Joonianmeri), zoomin mukana kasvavaa
 * kokoa, leveyskattoa ruudun leveydestä ja valikon paikkaa plussan
 * vierellä. NE OVAT KUMOUTUNEET: mitattava asia ei ole olemassa.
 *
 * Vartiot EI POISTETA vaan merkitään kumotuiksi: rivi kertoo mikä
 * päätös ne kumosi ja mikä savuke mittaa niiden tilalla (erän 19
 * vartiot ovat tools/savukkeet/savuke-maapaneeli.mjs:ssä). Mittaus
 * ajetaan yhä ja tulos jää INFO-riville, jotta luku on nähtävissä.
 */
const kumottu = (nimi, ehto, lisa = '') => console.log(
  `KUMOTTU  ${nimi} — PÄÄTÖKSET 28 (erä 19); tilalla savuke-maapaneeli.mjs`
  + ` · mittaus ${ehto ? 'läpi' : 'punainen'}${lisa ? ` (${lisa})` : ''}`,
);
const p = (v, d = 4) => (typeof v === 'number' ? +v.toFixed(d) : v);

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

/* ---- maapolygonit Nodessa: onko paneeli maan päällä? -------------- */
const maadata = JSON.parse(readFileSync(join(JUURI, 'assets/data/maapolygonit.json'), 'utf8'));
const renkaat = new Map();
for (const iso of Object.keys(maadata.maat ?? {})) renkaat.set(iso, puraMaanRenkaat(maadata, iso));
/** Säteenheitto: onko laudan piste renkaan sisällä? */
const rengaassa = (piste, rengas) => {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i, i += 1) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > piste[1]) !== (yj > piste[1])
      && piste[0] < ((xj - xi) * (piste[1] - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
};
/** Paneelin 25 näytepisteen maaosumat: [{ piste, iso }, …]. */
const maaosumat = (mitat) => {
  const keski = projisoiLaudalle('maailmankartta', mitat.lng, mitat.lat);
  if (!keski || !(mitat.w > 0) || !(mitat.h > 0)) return null;
  const ulos = [];
  for (let i = 0; i <= 4; i += 1) {
    for (let k = 0; k <= 4; k += 1) {
      const piste = [keski.x - mitat.w / 2 + (mitat.w * i) / 4, keski.y + (mitat.h * k) / 4];
      for (const [iso, ryhma] of renkaat) {
        if (ryhma.some((r) => rengaassa(piste, r))) ulos.push({ piste, iso });
      }
    }
  }
  return ulos;
};

/* Tallenne: Fogg Pariisissa — pilottimaa on Ranska. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

/*
 * ERÄ 18: TOINEN TALLENNE, FOGG ATEENASSA (Raamattu, KARTTAUUDISTUKSEN
 * PÄÄTÖKSET 20). Kreikka on toinen maa, jolle ankkuri on MITATTU, ja
 * sen vartiot ajetaan samassa savukkeessa kuin Ranskan — eri maa on
 * eri tallenne, ei eri savuke, koska mitattava koneisto on sama.
 */
const peliGRC = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peliGRC.phase = 'action';
peliGRC.tokens.delete('ateena');
const tallenneGRC = JSON.stringify(peliGRC.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi ajo: konteksti, peli Pariisissa, 9 s lepoa (ks. tiedoston alku). */
async function avaaPeli({ leveys, korkeus, dpr = 1, lepo = true, save = tallenne }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: dpr, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, save);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  // 9 s: saapumisketju ja mittauspiikki ehtivät molemmat tapahtua.
  if (auki && lepo) {
    await sivu.waitForTimeout(9000);
    /*
     * VAKIINTUMINEN ON OSA MITTAUSTA. `pointOfView()` voi palauttaa
     * ajon KOHTEEN, kun kirjaston oma tween on kesken, joten mittaus
     * odottaa, että PIIRRETTY mittakaava (kahden pisteen ruutuväli) ei
     * enää liiku. Ilman tätä rajausmitta luki kerran kameran korkeuden
     * 0,4667 vaikka kuva oli yhä korkeudella 0,65 (mitattu 14.9.2026).
     */
    const otos = () => sivu.evaluate(() => {
      const l = window.matkakirja.ui.pallolauta;
      const a = l.pallo.getScreenCoords(0, 0, 0);
      const b = l.pallo.getScreenCoords(0, 10, 0);
      return Math.abs(b.x - a.x);
    });
    let edel = await otos();
    for (let i = 0; i < 8; i += 1) {
      await sivu.waitForTimeout(1500);
      const nyt = await otos();
      if (Math.abs(nyt - edel) < 0.5) { edel = nyt; break; }
      edel = nyt;
    }
  }
  return { ctx, sivu, virheet, auki };
}

/** Kamera, kortti ja paneelin lautamitat samasta hetkestä. */
const mittaa = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const sade = l.pallo.getGlobeRadius();
  const ohj = l.pallo.controls();
  const pov = l.pallo.pointOfView();
  const kortti = document.querySelector('.maapaneeli-kortti');
  const r = kortti?.getBoundingClientRect() ?? null;
  const kotelo = l.kotelo.getBoundingClientRect();
  const sisus = document.querySelector('.maapaneeli-sisus');
  const mitat = l.maapaneeli?.mitat?.() ?? null;
  /*
   * ERÄ 19: mittakaava ja maan laatikko luetaan kerroksen omasta
   * mittarista, ei merkkikerroksen datumista (ks. rajausNyt) — datumia
   * ei ole enää olemassa.
   */
  return {
    alt: pov.altitude,
    maxAlt: ohj.maxDistance / sade - 1,
    minAlt: ohj.minDistance / sade - 1,
    skaala: mitat?.skaala ?? null,
    // ERÄ 16: sovitetaanko TÄMÄN maan saapumisnäkymä korkeuteen?
    kapea: mitat?.laatikko ? Boolean(l.kamera.korkeuteenSovitettu?.(mitat.laatikko)) : null,
    mitat,
    kortti: r ? { x0: r.left - kotelo.left, y0: r.top - kotelo.top, x1: r.right - kotelo.left, y1: r.bottom - kotelo.top, w: r.width, h: r.height } : null,
    kotelo: { w: kotelo.width, h: kotelo.height, x0: kotelo.left, y0: kotelo.top },
    ylivuoto: sisus ? sisus.scrollHeight - sisus.clientHeight : null,
  };
});

/**
 * Rajauksen ruutulaatikko ja tyhjä tila (väite 5).
 *
 * KOORDINAATISTO ON KOTELON, EI SIVUN. `getScreenCoords` antaa jo
 * kotelon suhteelliset pikselit, kun taas `getBoundingClientRect` on
 * sivun koordinaatistossa — kortista vähennetään siksi kotelon nurkka
 * ja maan laatikosta EI. Sekoitus siirtäisi laatikot toistensa suhteen
 * yläpalkin verran (mitattu 68 px), ja mitta olisi hölynpölyä.
 */
const rajausNyt = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kotelo = l.kotelo.getBoundingClientRect();
  /*
   * ERÄ 19: MAAN LAATIKKO EI OLE ENÄÄ MERKKIKERROKSEN DATUM
   * (js/pallolauta/maapaneeli.js MAAPANEELIN KERROS — PÄÄTÖKSET 28: kortti
   * on kiinteä nurkkasäiliö `.maapaneeli-nurkka`, ei kameran sijoittama
   * datum). Maan laatikko kulkee silti mukana `mitat().laatikko`-kentässä
   * juuri tätä savuketta varten — sieltä se luetaan nyt.
   */
  const bb = l.maapaneeli?.mitat?.()?.laatikko ?? null;
  if (!bb || !l.asteet) return null;
  let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
  const N = 40;
  const lisaa = (bx, by) => {
    const a = l.asteet({ x: bx, y: by });
    if (!a) return;
    const s = l.pallo.getScreenCoords(a.lat, a.lon ?? a.lng, 0);
    if (!s || !Number.isFinite(s.x) || !Number.isFinite(s.y)) return;
    x0 = Math.min(x0, s.x); x1 = Math.max(x1, s.x);
    y0 = Math.min(y0, s.y); y1 = Math.max(y1, s.y);
  };
  for (let i = 0; i <= N; i += 1) {
    const t = i / N;
    lisaa(bb.x + bb.w * t, bb.y);
    lisaa(bb.x + bb.w * t, bb.y + bb.h);
    lisaa(bb.x, bb.y + bb.h * t);
    lisaa(bb.x + bb.w, bb.y + bb.h * t);
  }
  if (!Number.isFinite(x0)) return null;
  const maa = { x0, x1, y0, y1 };
  const k = document.querySelector('.maapaneeli-kortti')?.getBoundingClientRect() ?? null;
  const kortti = k
    ? { x0: k.left - kotelo.left, x1: k.right - kotelo.left,
      y0: k.top - kotelo.top, y1: k.bottom - kotelo.top }
    : null;
  const yhd = kortti
    ? { x0: Math.min(x0, kortti.x0), x1: Math.max(x1, kortti.x1),
      y0: Math.min(y0, kortti.y0), y1: Math.max(y1, kortti.y1) }
    : maa;
  const tyhjaX = (kotelo.width - (yhd.x1 - yhd.x0)) / kotelo.width;
  const tyhjaY = (kotelo.height - (yhd.y1 - yhd.y0)) / kotelo.height;
  /*
   * SITOVA AKSELI ON SE, JOLLA LAATIKKO MAHTUU (erä 14). Kun ruutu on
   * laatikkoa kapeampi (puhelin pystyssä), rajaus sovitetaan
   * KORKEUTEEN ja laatikko ylivuotaa X:ssä TARKOITUKSELLA
   * (Raamattu KARTTAUUDISTUKSEN PÄÄTÖKSET 17) — negatiivinen tyhjä X
   * ei silloin ole vika vaan päätös. Sitova on siis pienin
   * EI-NEGATIIVINEN tyhjä; jos molemmat ovat negatiivisia, laatikko ei
   * mahdu kummallakaan akselilla ja mitta on null (väite kaatuu).
   */
  const ehdokkaat = [];
  if (tyhjaX >= 0) ehdokkaat.push(['X', tyhjaX]);
  if (tyhjaY >= 0) ehdokkaat.push(['Y', tyhjaY]);
  ehdokkaat.sort((a2, b2) => a2[1] - b2[1]);
  const valittu = ehdokkaat[0] ?? null;
  const akseli = valittu ? valittu[0] : (tyhjaX >= tyhjaY ? 'X' : 'Y');
  const kaupunki = (() => {
    const pos = window.matkakirja.ui.game?.player?.pos;
    const id = pos?.city ?? pos;
    const c = (window.matkakirja.ui.game?.board?.cities ?? []).find((x) => x.id === id);
    if (!c || !l.asteet) return null;
    const a2 = l.asteet({ x: c.x, y: c.y });
    if (!a2) return null;
    const s2 = l.pallo.getScreenCoords(a2.lat, a2.lon ?? a2.lng, 0);
    return s2 ? { x: s2.x, y: s2.y } : null;
  })();
  const paikka = (lat, lng) => {
    const s2 = l.pallo.getScreenCoords(lat, lng, 0);
    return s2 ? { x: s2.x, y: s2.y } : null;
  };
  return {
    maa,
    kortti,
    yhd,
    kaupunki,
    // Bretagnen kärki (Pointe du Raz) ja Elsass (Strasbourg) — panoroinnin ääripäät.
    bretagne: paikka(48.36, -4.77),
    elsass: paikka(48.58, 7.75),
    kotelo: { w: kotelo.width, h: kotelo.height },
    tyhjaX,
    tyhjaY,
    sitova: valittu ? valittu[1] : -1,
    akseli,
    // Leikkautuuko rajaus ruudun ulkopuolelle SITOVALLA akselilla?
    ruudussa: akseli === 'X'
      ? yhd.x0 >= -1 && yhd.x1 <= kotelo.width + 1
      : yhd.y0 >= -1 && yhd.y1 <= kotelo.height + 1,
  };
});

/** Kortin leveys ja paneelin oman lautamitan ruutuleveys samalla zoomilla. */
const suhdeNyt = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const mitat = l.maapaneeli?.mitat?.();
  const kortti = document.querySelector('.maapaneeli-kortti');
  /*
   * ERÄ 19: paneelilla ei ole enää lat/lng-ankkuria (se on ruudun
   * kaluste, ei kartan datum), joten tätä mittaa ei ole olemassa —
   * väite 3 on KUMOTTU ja tämä palauttaa null kaatumatta.
   */
  if (!mitat || !kortti || !Number.isFinite(mitat.lat) || !Number.isFinite(mitat.lng)) return null;
  /*
   * Paneelin OMA lautaleveys ruutupikseleinä: puolet leveydestä
   * ankkurin kummallekin puolelle samalla leveyspiirillä. Lauta on
   * 12000 yksikköä = 360°, joten muunnos on sama kuin kameran
   * `asteetLeveydesta`. Tämä on se mitta, jonka kortin PITÄÄ kattaa
   * ruudulla joka zoomilla — suhde on siis vakio 1:n tuntumassa.
   */
  const askel = (mitat.w * 360) / 12000 / 2;
  const a = l.pallo.getScreenCoords(mitat.lat, mitat.lng - askel, 0);
  const b = l.pallo.getScreenCoords(mitat.lat, mitat.lng + askel, 0);
  const r = kortti.getBoundingClientRect();
  // Maan laatikon ruutuleveys (tehtävänannon vertailumitta).
  // ERÄ 19: laatikko ja skaala mittarista, ei datumista (ks. rajausNyt).
  let laatikko = null;
  const bb = mitat?.laatikko;
  if (bb && l.asteet) {
    const v = l.asteet({ x: bb.x, y: bb.y + bb.h / 2 });
    const o = l.asteet({ x: bb.x + bb.w, y: bb.y + bb.h / 2 });
    if (v && o) {
      const p1 = l.pallo.getScreenCoords(v.lat, v.lon ?? v.lng, 0);
      const p2 = l.pallo.getScreenCoords(o.lat, o.lon ?? o.lng, 0);
      laatikko = Math.abs(p2.x - p1.x);
    }
  }
  return { kortti: r.width, lauta: Math.abs(b.x - a.x), laatikko,
    alt: l.pallo.pointOfView().altitude, skaala: mitat?.skaala ?? null };
});

/**
 * Panorointi maan laatikon X-rajalle (erä 14, väite 7). Raja luetaan
 * kameran omasta `panoraja`sta samalla laatikolla, jota lauta käyttää.
 */
const panoroiRajalle = (sivu, suunta) => sivu.evaluate((s) => {
  const l = window.matkakirja.ui.pallolauta;
  // ERÄ 19: maan laatikko luetaan mitat().laatikko:sta, ei enää datumista (ks. rajausNyt).
  const bb = l.maapaneeli?.mitat?.()?.laatikko;
  if (!bb) return null;
  const raja = l.kamera.panoraja(bb);
  const kohde = s < 0 ? raja?.lngMin : raja?.lngMax;
  if (!Number.isFinite(kohde)) return { raja, kohde: null };
  const pov = l.pallo.pointOfView();
  l.pallo.pointOfView({ lat: pov.lat, lng: kohde, altitude: pov.altitude }, 0);
  return { raja, kohde };
}, suunta);

/** Laattakerroksen mittarit (js/pallolaatat.js). */
const laattamittarit = (sivu) => sivu.evaluate(() => {
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit?.() ?? null;
  if (!m) return null;
  return { taso: m.taso, laattoja: m.laattoja, valmiita: m.valmiita, scenessa: m.scenessa,
    nakyvia: m.nakyvia, nakyviaScenessa: m.nakyviaScenessa, jonossa: m.jonossa,
    varillisia: m.varillisia, variMaa: m.variMaa, kaytetytTavut: m.kaytetytTavut };
});

/**
 * Laattakerroksen valitsema taso, kun saapumisnäkymä on kohdallaan.
 * Odottaa, että kerros on tunnistanut väritason maan ja valinnut
 * tason; palauttaa mittarit tai null.
 */
const SAAPUMISEN_KORKEUSKATTO = 1;
async function valittuTaso(sivu, kierroksia = 20) {
  /*
   * TASO LUETAAN VASTA SAAPUMISNÄKYMÄSTÄ. `variMaa` asettuu jo ennen
   * kuin kamera on perillä, ja silloin kerros on yhä maailmankuvan
   * tasolla — ensimmäinen mittaukseni luki siitä syystä z3 (koko
   * pallo, korkeus 2,5) sekä dpr 2:lla että dpr 3:lla, ja väite ei
   * mitannut mitään. Odotetaan siis, että KORKEUS on saapumisluokkaa
   * (alle SAAPUMISEN_KORKEUSKATTO; saapumisnäkymä on 0,15…0,26) ja
   * ettei se enää liiku, ja vasta sitten luetaan taso.
   */
  let edellinen = null;
  let viimeinen = null;
  for (let i = 0; i < kierroksia; i += 1) {
    const alt = await sivu // eslint-disable-line no-await-in-loop
      .evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView()?.altitude)
      .catch(() => null);
    const m = await laattamittarit(sivu).catch(() => null); // eslint-disable-line no-await-in-loop
    viimeinen = m ?? viimeinen;
    if (alt !== null && alt < SAAPUMISEN_KORKEUSKATTO && edellinen !== null
      && Math.abs(alt - edellinen) < 1e-4 && m?.variMaa && Number.isFinite(m.taso)) return m;
    edellinen = alt;
    await sivu.waitForTimeout(1000); // eslint-disable-line no-await-in-loop
  }
  return viimeinen;
}

/** Kamera annetulle osuudelle uloimmasta sallitusta korkeudesta. */
const zoomaa = async (sivu, osuus) => {
  await sivu.evaluate(async (k) => {
    const l = window.matkakirja.ui.pallolauta;
    const sade = l.pallo.getGlobeRadius();
    const maxAlt = l.pallo.controls().maxDistance / sade - 1;
    const pov = l.pallo.pointOfView();
    l.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: maxAlt * k }, 0);
    await new Promise((v) => setTimeout(v, 900));
    l.ladoHeti?.();
    await new Promise((v) => setTimeout(v, 300));
  }, osuus);
};


/**
 * ERÄ 13 — VÄITE 5: PANEELIN LEIPÄTEKSTI ON NOSTON TEKSTIN KOKOINEN.
 *
 * Molemmat mitataan RUUDULTA eikä koodivakiosta: kumpikin fonttikoko
 * kerrotaan sillä muunnosketjulla, joka elementin päällä oikeasti on.
 * Noston nimiö on rasteri, joten sen "fonttikoko" on piirtoyksikkö
 * NOSTOSYM_NIMIO_KOKO kerrottuna ryhmän mittakaavalla — sama luku,
 * jonka selain latoisi, jos nimiö olisi <text>.
 */
const tekstiKoot = (sivu, nimioKoko) => sivu.evaluate((koko) => {
  const ketju = (el) => {
    let s = 1;
    let n = el;
    while (n && n !== document.documentElement) {
      const t = getComputedStyle(n).transform;
      if (t && t !== 'none') { const m = new DOMMatrixReadOnly(t); s *= Math.hypot(m.a, m.b); }
      n = n.parentElement;
    }
    return s;
  };
  const g = document.querySelector('.pallolauta-nosto .pallolauta-nosto-siirto');
  const arvo = document.querySelector('.maapaneeli-arvo');
  return {
    nosto: g ? koko * ketju(g) : null,
    paneeli: arvo ? parseFloat(getComputedStyle(arvo).fontSize) * ketju(arvo) : null,
  };
}, nimioKoko);

/**
 * VÄITE 7: LISÄÄ-VALIKKO ON ALLEKKAIN, ILMAN TAUSTAA JA RUUDULLA.
 *
 * ERÄ 18 (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 22) KORVAA ERÄN 13
 * YHDEN RIVIN: omistaja 15.9.2026 *"tuo sisallysluettelo… voisi tulla
 * kokonaan ilman tuota taustaikkunaa ja eri kategoriat saisivat tulla
 * tiiviisti allekkain"*. Vartio mittaa siis kolme asiaa:
 *
 *   a) JOKA KATEGORIA OMALLA RIVILLÄÄN: eri y-arvoja on yhtä monta kuin
 *      nappeja. Rivit luetaan nappien RUUTUPAIKOISTA eikä CSS:n
 *      `flex-direction`ista — mitta on se, minkä pelaaja näkee.
 *   b) EI TAUSTALAATIKKOA: valikon oman rungon taustaväri on täysin
 *      läpinäkyvä ja reunus 0 px. Myös nappien oma tausta on pois,
 *      joten laatikkoa ei ole missään kerroksessa.
 *   c) KOKONAAN RUUDULLA EIKÄ KORTIN PÄÄLLÄ: valikon laatikko on
 *      kotelon sisällä joka reunasta, eikä se leikkaa korttia.
 *
 * Rako mitataan kortin alareunan ja valikon yläreunan väliltä (tai
 * ylöspäin auetessa toisin päin).
 *
 * PÄÄTÖKSET 22 KORJAUS (omistaja 15.9.2026) lisäsi kaksi uutta mittaa
 * samaan funktioon, jotta vartio ja vastakokeet lukevat yhden totuuden:
 *   d) RIVIVÄLI ON 1,3 × TEKSTIN OMA KOKO joka vierekkäisen napin
 *      parilla (`suhteet`) — EI ABSOLUUTTISENA PIKSELINÄ, koska koko
 *      kortti skaalautuu zoomin mukana (vika, joka jäi kolmen zoomin
 *      savukkeista huomaamatta, oli juuri se, että VAIN suhde pysyy
 *      vakiona, ei ollenkaan pikselimäärä).
 *   e) VALIKKO ON PLUSSAN VIERESSÄ, EI PANEELIN ALLA: valikko on joko
 *      plussan/kortin OIKEALLA puolella riittävän raolla (`vasen` ===
 *      false) tai kokonaan kortin VASEMMALLA puolella (`vasen` ===
 *      true) — ei kummassakaan tapauksessa kortin PÄÄLLÄ. `plusYlaero`
 *      (yläreunan ero plussaan) jää INFO-mitaksi, ei ehdoksi: normaalisti
 *      se on 0 (molemmilla `top: -1px`), mutta se voi olla suurempikin,
 *      kun `sovitaValikko` (js/pallolauta/maapaneeli.js) liu'uttaa
 *      listaa pystyyn alalaidan kalusteiden yläpuolelle — SIVUSUUNNAN
 *      rako yksinään takaa, ettei valikko koskaan peitä korttia,
 *      koska ne eivät vaakasuunnassa osu päällekkäin.
 */
const valikonMitat = async (sivu) => {
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
  await sivu.waitForTimeout(600);
  const ulos = await sivu.evaluate(() => {
    const kortti = document.querySelector('.maapaneeli-kortti');
    const valikko = document.querySelector('.maapaneeli-valikko');
    /*
     * ERÄ 20: PLUS-NAPPIA EI OLE (PÄÄTÖKSET 28 TARKENNUS 2). Kaluste
     * avataan maan nimestä, joten plussan paikan sijaan käytetään
     * AVAIMEN laatikkoa — tämän funktion väitteet (7, 7b) ovat
     * KUMOTTUJA, ja mitta jää raportoitavaksi tiedoksi.
     */
    const plus = document.querySelector('.maapaneeli-avain');
    if (!kortti || !valikko || valikko.hidden || !plus) return { auki: false };
    const r = valikko.getBoundingClientRect();
    const k = kortti.getBoundingClientRect();
    const pr = plus.getBoundingClientRect();
    const napit = [...valikko.querySelectorAll('.maapaneeli-aihe')]
      .map((b) => { const bb = b.getBoundingClientRect(); return { y: bb.top, w: bb.width, h: bb.height }; });
    const rivit = new Set(napit.map((n) => Math.round(n.y * 10) / 10)).size;
    const nappiAla = napit.reduce((a, n) => a + n.w * n.h, 0);
    /*
     * TAUSTA LUETAAN LASKETUSTA TYYLISTÄ (erä 18). `rgba(…, 0)` ja
     * `transparent` ovat sama asia, joten mitta on alfa: mikä tahansa
     * yli nollan on laatikko. Sama luetaan myös yhdeltä napilta,
     * jottei laatikko palaisi kerrosta alempana.
     */
    const alfa = (vari) => {
      const osat = String(vari).match(/[\d.]+/g) ?? [];
      if (String(vari) === 'transparent' || osat.length === 0) return 0;
      return osat.length >= 4 ? Number(osat[3]) : 1;
    };
    const tyyli = getComputedStyle(valikko);
    const nappiTyyli = napit.length ? getComputedStyle(valikko.querySelector('.maapaneeli-aihe')) : null;
    const kotelo = valikko.closest('.pallo-kotelo')?.getBoundingClientRect() ?? null;
    /*
     * d) rivivälin suhde tekstin omaan kokoon (kohta A yllä).
     *
     * `napit[i].y` on RUUDUN pikseleitä (getBoundingClientRect, CSS3D-
     * skaalan LÄPI), mutta `getComputedStyle(...).fontSize` on kortin
     * OMA, skaalaamaton arvo (transform ei muuta computed styleä).
     * Jos suhde laskettaisiin suoraan näistä kahdesta, se ei koskaan
     * pysyisi vakiona zoomilla — se olisi aina 1,3 × kortin skaala
     * (mitattu 15.9.2026: skaala 0.342 → suhde 0.443, skaala 0.826 →
     * suhde 1.072 — tasan 1,3 × skaala kummassakin). Fontin koko on
     * siis skaalattava SAMALLA kortin skaalalla kuin rivien paikat,
     * jotta molemmat puolet ovat samaa yksikköä (ruutupikseliä).
     */
    const skaalaNyt = kortti.offsetWidth > 0 ? k.width / kortti.offsetWidth : 1;
    const fontSizePx = nappiTyyli ? parseFloat(nappiTyyli.fontSize) * skaalaNyt : null;
    const pitches = [];
    for (let i = 1; i < napit.length; i += 1) pitches.push(napit[i].y - napit[i - 1].y);
    const suhteet = fontSizePx ? pitches.map((pp) => pp / fontSizePx) : [];
    // e) plussan viereen, ei paneelin alle (kohta B yllä).
    const vasen = valikko.classList.contains('vasen');
    const oikeaRako = pr.left - r.right; // >0 kun valikko on OIKEALLA plussasta
    const vasenRako = r.left - k.left; // <0 kun valikko on kokonaan kortin VASEMMALLA puolella
    return {
      auki: true,
      rivit,
      napit: napit.length,
      w: r.width,
      h: r.height,
      taustaAlfa: alfa(tyyli.backgroundColor),
      reunusPx: parseFloat(tyyli.borderTopWidth) || 0,
      nappiTaustaAlfa: nappiTyyli ? alfa(nappiTyyli.backgroundColor) : null,
      varjo: nappiTyyli
        ? getComputedStyle(valikko.querySelector('.maapaneeli-aihe-nimi')).textShadow : null,
      ruudulla: Boolean(kotelo && r.left >= kotelo.left - 0.5 && r.right <= kotelo.right + 0.5
        && r.top >= kotelo.top - 0.5 && r.bottom <= kotelo.bottom + 0.5),
      // Tyhjä tila = valikon ala, joka ei ole nappia (pehmuste + välit).
      tyhja: 1 - nappiAla / (r.width * r.height),
      rako: r.top >= k.bottom ? r.top - k.bottom : k.top - r.bottom,
      leikkaa: r.left < k.right && r.right > k.left && r.top < k.bottom && r.bottom > k.top,
      plusKeskiKortista: pr.top + pr.height / 2 - k.top,
      skaala: k.width / kortti.offsetWidth,
      fontSizePx,
      pitches,
      suhteet,
      vasen,
      oikeaRako: -oikeaRako, // >0 kun valikko on plussan OIKEALLA puolella
      vasenRako,
      plusYlaero: r.top - pr.top,
    };
  });
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
  await sivu.waitForTimeout(300);
  return ulos;
};

/** Rivivälin suhde: kaikki napinparit 1,3 ± 5 % (PÄÄTÖKSET 22 KORJAUS d). */
const RIVIVALIN_SUHDE = 1.3;
const RIVIVALIN_VARA = 0.05;
const rivivaliKelpaa = (v) => Boolean(v?.suhteet?.length)
  && v.suhteet.every((s) => Math.abs(s / RIVIVALIN_SUHDE - 1) <= RIVIVALIN_VARA);

/**
 * Plussan vieressä eikä paneelin päällä (PÄÄTÖKSET 22 KORJAUS e): rako
 * plussaan/korttiin vähintään SIVURAON_VARA ruutu-px, ei leikkausta
 * kortin kanssa.
 *
 * `plusYlaero` (yläreunan ero plussaan) EI OLE ehto tässä, vaikka
 * normaalisti valikon yläreuna ON plussan tasalla (`top: -1px`
 * molemmilla). js/pallolauta/maapaneeli.js `sovitaValikko` liu'uttaa
 * koko listaa pystyyn, kun se osuisi alalaidan kalusteisiin (rail,
 * toimintorivi, kelluva pollo-nappi) — TARKOITUKSELLINEN, dokumentoitu
 * käytös, ei vika. Mitattu 15.9.2026: Ranska 390 px -ruudulla kortti
 * on niin alhaalla, että valikko osuisi kelluvaan pollo-nappiin ja
 * toimintoriviin ilman siirtoa (`--valikko-pysty: -51.6px`, mitattuna
 * `plusYlaero` -17.6 ruutu-px) — SIVUSUUNNAN rako (`oikeaRako`/
 * `vasenRako`, tarkistettu tässä) takaa YKSINÄÄN, ettei valikko
 * koskaan peitä korttia tai plussaa pystysuunnasta riippumatta, koska
 * ne eivät vaakasuunnassa osu päällekkäin. "Ruudulla" (tarkistetaan
 * `valikkoKelpaa`:ssa) takaa, ettei siirto vie valikkoa ruudun
 * ulkopuolelle.
 */
const SIVURAON_VARA = 4;
const sivuKelpaa = (v) => Boolean(v?.auki) && !v.leikkaa
  && (v.vasen ? v.vasenRako <= -SIVURAON_VARA : v.oikeaRako >= SIVURAON_VARA);

/**
 * Täyttääkö valikko erän 18 linjauksen (PÄÄTÖKSET 22) ja sen korjauksen
 * (PÄÄTÖKSET 22 KORJAUS)? Kaikki ehdot yhdessä paikassa, jotta vartio
 * ja vastakokeet lukevat SAMAN säännön eivätkä useaa kopiota.
 *
 * PÄÄTÖKSET 22 KORJAUS (kohta c): `v.rako` mittaa raon KORTIN
 * ALAREUNAAN — vanhan, erän 18 "valikko paneelin alla" -asettelun
 * mitta. Uudessa "plussan vierellä" -asettelussa valikko on korttia
 * SIVUSSA eikä alla, jolloin tuo pystyrako on rakenteellisesti
 * negatiivinen (valikko limittyy kortin oman korkeuden kanssa
 * pystysuunnassa) vaikka valikko olisi täysin oikein sivussa — mitattu
 * 15.9.2026 sekä 390 että 1400 px:llä. "Ei kortin päällä" -vaatimus
 * tulee jo `!v.leikkaa`:sta, ja "plussan vierellä" tarkemmin
 * `sivuKelpaa`:sta (oikeaRako/vasenRako + plusYlaero), joten `v.rako`
 * jää tästä eteenpäin vain INFO-mitaksi, ei ehdoksi.
 */
const valikkoKelpaa = (v) => Boolean(v?.auki)
  && v.napit > 1 && v.rivit === v.napit          // a) joka kategoria omalla rivillään
  && v.taustaAlfa === 0 && v.reunusPx === 0 && v.nappiTaustaAlfa === 0  // b) ei laatikkoa
  && v.varjo && v.varjo !== 'none'               //    luettavuus on tekstin oma
  && v.ruudulla && !v.leikkaa                    // c) ruudulla eikä kortin päällä
  && rivivaliKelpaa(v)                           // d) rivivälin suhde 1,3 ± 5 %
  && sivuKelpaa(v);                              // e) plussan vierellä, ei paneelin alla


/*
 * ═══════════════════════════════════════════════════════════════════
 * ERÄ 18 — KREIKKA: KARTAN KALUSTEET, ZOOMI JA RAAHAUS
 * ═══════════════════════════════════════════════════════════════════
 */

/**
 * Kartan kalusteiden RUUTULAAJUUS (nostot, nimikyltit, kaupunkimerkit,
 * reittipisteet, pulu).
 *
 * CSS2D-ANKKURI ON 0 × 0, JOTEN SEN OMA LAATIKKO EI KELPAA MITAKSI:
 * näkyvä jälki on ankkurin lapsissa (svg, g), joilla on oma muunnos.
 * Laajuus on siis ankkurin ja kaikkien sen jälkeläisten yhdiste —
 * muuten päällekkäisyys jäisi mittaamatta ja väite 9 olisi tyhjä.
 */
const kartanKalusteet = (sivu) => sivu.evaluate(() => {
  const l = window.matkakirja.ui.pallolauta;
  const kotelo = l.kotelo.getBoundingClientRect();
  const ulos = [];
  for (const valitsin of ['.pallolauta-nosto', '.pallolauta-nimi', '.pallolauta-kohde',
    '.pallolauta-piste', '.pulu-paikka']) {
    for (const e of document.querySelectorAll(valitsin)) {
      if (e.closest('.pallolauta-takana') || e.closest('.pallolauta-poistuu')) continue;
      const r = e.getBoundingClientRect();
      if (!(r.width > 0) && !(r.height > 0)) continue;
      let laatikko = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      for (const c of e.querySelectorAll('*')) {
        const cr = c.getBoundingClientRect();
        if (!(cr.width > 0) || !(cr.height > 0)) continue;
        laatikko = { left: Math.min(laatikko.left, cr.left), top: Math.min(laatikko.top, cr.top),
          right: Math.max(laatikko.right, cr.right), bottom: Math.max(laatikko.bottom, cr.bottom) };
      }
      ulos.push({ laji: valitsin, nimi: (e.textContent ?? '').trim().slice(0, 20),
        x0: laatikko.left - kotelo.left, y0: laatikko.top - kotelo.top,
        x1: laatikko.right - kotelo.left, y1: laatikko.bottom - kotelo.top });
    }
  }
  return ulos;
});

/** Leikkaavatko kaksi ruutulaatikkoa? */
const leikkaavat = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

/**
 * VÄITE 10: ZOOMI JA RAAHAUS MENEVÄT PANEELIN LÄPI KARTALLE
 * (Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 21).
 *
 * MIKSI CTRL-RULLA: pallon eleissä (js/pallo.js) paljas rulla PANOROI
 * ja ctrl/cmd-rulla ZOOMAA — ctrl-rulla on myös trackpadin nipistys.
 * Panorointi kuuntelee kotelon KAAPPAUSVAIHEESSA ja toimi siksi
 * paneelinkin päällä jo ennen tätä erää; zoomin ottaa vastaan
 * OrbitControlsin oma kuuntelija KANKAALLA, joten se jäi kokonaan
 * saamatta, kun kortti oli osumakohde. Tämä on se, mistä omistaja
 * kirjoitti, ja siksi mitta on nimenomaan zoomi.
 *
 * MITTA ON SUHTEELLINEN: sama pykälämäärä kartan päällä ja paneelin
 * päällä on muutettava kameran korkeutta yhtä paljon.
 */
const rullaa = async (sivu, x, y, pykalia = 6) => {
  const ennen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView().altitude);
  await sivu.keyboard.down('Control');
  await sivu.mouse.move(x, y);
  for (let i = 0; i < pykalia; i += 1) {
    await sivu.mouse.wheel(0, -120); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(30); // eslint-disable-line no-await-in-loop
  }
  await sivu.keyboard.up('Control');
  await sivu.waitForTimeout(800);
  const jalkeen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView().altitude);
  return { ennen, jalkeen, muutos: ennen - jalkeen };
};

/**
 * Kamera takaisin saapumisnäkymään mittausten väliin (erä 19b).
 * Ilman tätä toinen rulla lähtisi eri korkeudelta kuin ensimmäinen,
 * eikä muutoksia voisi verrata.
 */
const palautaNakyma = async (sivu) => {
  // Sivu voi olla jo suljettu (ajon aikakatko): mittaus ei saa kaataa savuketta.
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    await l.saavu?.({ kesto: 0 });
  }).catch(() => {});
  await sivu.waitForTimeout(1200).catch(() => {});
};

/** Raahaus pisteestä (x, y) — paljonko kartan keskipiste siirtyy? */
const raahaa = async (sivu, x, y) => {
  const ennen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  await sivu.mouse.move(x, y);
  await sivu.mouse.down();
  for (let i = 1; i <= 8; i += 1) {
    await sivu.mouse.move(x + i * 10, y); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(30); // eslint-disable-line no-await-in-loop
  }
  await sivu.mouse.up();
  await sivu.waitForTimeout(700);
  const jalkeen = await sivu.evaluate(() => window.matkakirja.ui.pallolauta.pallo.pointOfView());
  const valinta = await sivu.evaluate(() => String(window.getSelection?.() ?? ''));
  return { dLng: Math.abs(jalkeen.lng - ennen.lng), dLat: Math.abs(jalkeen.lat - ennen.lat), valinta };
};

/**
 * OMISTAJAN RUUTULUOKKA on tekstisuhteen ankkuri (ks.
 * js/pallolauta/maapaneeli.js MAAPANEELIN_TEKSTIKERROIN): paneeli on
 * karttaan sidottu ja noston nimiö ruutuvakio, joten suhde on 1,00
 * tasan yhdellä kartan mittakaavalla. Muiden ruutujen suhteet
 * kirjataan INFOna.
 */
const ANKKURIRUUTU = { nimi: '2560', leveys: 2560, korkeus: 1352 };
/** Väitteen 5 vara: omistajan sana on "samaa luokkaa", mitta 5 %. */
const TEKSTIVARA = 0.05; // INFO-vertailu (ks. TEKSTISUHDE EI OLE ENÄÄ OMA VARTIONSA)

const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];

const zoomiTulokset = [];
const tekstiTulokset = [];
const valikkoTulokset = [];
const valikkoZoomiTulokset = [];
/*
 * PANEELIN LEVEYS SAAPUMISNÄKYMÄSSÄ (omistaja 14.9.2026 klo 17.55,
 * puhelin: *"maa info edelleen liian iso"*; Fablen mitoitus samana
 * iltana): paneeli saa viedä enintään kymmenesosan ruudun leveydestä
 * SAAPUMISNÄKYMÄSSÄ — se on uloin sallittu zoomi, eli se näkymä, jossa
 * paneeli on ruudulla suurimmillaan suhteessa karttaan.
 */
const LEVEYDEN_KATTO = 0.10;
/*
 * ERÄ 15: KATTO PITÄÄ NYT MYÖS PYSTYPUHELIMELLA. PÄÄTÖKSET 17 vei
 * puhelimen saapumisnäkymän noin kaksi kertaa lähemmäs, ja koska
 * paneeli on kartan mitta, sen ruutuosuus kasvoi mitatusti 9,5 %:sta
 * 21,7 %:iin. Paneelin katto lasketaan siksi samasta vertailusta kuin
 * nimikylttien koko (kunkin laitteen oma saapumisnäkymä,
 * js/pallolauta/maapaneeli.js MAAPANEELIN_KATTO_RUUDUSTA). Mitattu
 * tämän erän jälkeen: 390 px 35,5 px = 9,5 %, 1400 px 85,9 px = 6,2 %
 * (työpöytä ei muuttunut lainkaan).
 */
const leveysTulokset = [];
const meriTulokset = [];
/*
 * VÄITE 8: ANKKURI SEURAA KUVASUHDE-EHTOA (erä 16, Raamattu
 * KARTTAUUDISTUKSEN PÄÄTÖKSET 18, omistaja 15.9.2026).
 *
 * Kapealla ruudulla (390 px pystyssä — sama ehto kuin PÄÄTÖKSET 17:n
 * korkeussovituksella, EI laitetunnistusta) Ranskan maapaneelin
 * ankkuri on LYONINLAHDELLA, kortti on saapuessa KOKONAAN RUUDULLA ja
 * MEREN PÄÄLLÄ; leveällä ruudulla (1400 px) ankkuri on ennallaan
 * BISKAJANLAHDELLA. Kumpikin piste luetaan ajossa olevasta pelistä
 * (lauta.maapaneeli.mitat()), ei koodivakiosta, ja verrataan päätöksen
 * lukuun ASTEEN_VARAlla.
 */
const KAPEA_ANKKURI = { lat: 42.6, lng: 3.77 };  // Lyoninlahti (erä 17: vara pulun nokkaan)
const LEVEA_ANKKURI = { lat: 45.9, lng: -4.6 };  // Biskajanlahti
/*
 * VÄITE 9: KREIKAN ANKKURI (erä 18, Raamattu KARTTAUUDISTUKSEN
 * PÄÄTÖKSET 20, omistaja 15.9.2026 työpöytäkuvalla). Leveällä ruudulla
 * paneeli on JOONIANMERELLÄ Peloponnesoksen länsipuolella,
 * merikilpikonna-noston VASEMMALLA puolella; kapealla ruudulla
 * Aigeianmerellä Peloponnesoksen ja Kreetan välissä. Molemmilla:
 * kokonaan merellä, kokonaan ruudulla, ei yhtään päällekkäisyyttä
 * nostojen, nimikylttien, kaupunkimerkkien, reitin tai pulun kanssa.
 */
const GRC_LEVEA = { lat: 37.8, lng: 19.9 };     // Joonianmeri
const GRC_KAPEA = { lat: 36.15, lng: 24.35 };   // Aigeianmeri
/** Kortin ja lähimmän noston vaadittu rako leveällä ruudulla (mitattu 115 px). */
const NOSTON_RAKO = 20;
/** Ankkurin sallittu poikkeama päätöksen luvusta (pyöristys, ei muuta). */
const ASTEEN_VARA = 0.05;
const ankkuriTulokset = [];
const suhdeTulokset = [];
const rajausTulokset = [];
let paaVirheet = [];

for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  vaadi(`pallolauta aukesi (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }

  /* --- 5. rajaus aivan maan rajojen ulkopuolelle ------------------ */
  const r = await rajausNyt(sivu);
  rajausTulokset.push({ ruutu: ruutu.nimi, sitova: p(r?.sitova, 4), akseli: r?.akseli,
    ruudussa: r?.ruudussa ?? false,
    ok: Boolean(r && r.sitova <= TYHJAN_KATTO && r.sitova >= 0 && r.ruudussa) });
  tieto(`${ruutu.nimi} px · rajaus (maa + maapaneeli)`,
    r
      ? `laatikko x ${p(r.yhd.x0, 1)}…${p(r.yhd.x1, 1)} / 0…${p(r.kotelo.w, 1)}, `
        + `y ${p(r.yhd.y0, 1)}…${p(r.yhd.y1, 1)} / 0…${p(r.kotelo.h, 1)}; `
        + `tyhjä X ${p(100 * r.tyhjaX, 2)} % · Y ${p(100 * r.tyhjaY, 2)} % → `
        + `sitova ${r.akseli} ${p(100 * r.sitova, 2)} % (katto ${p(100 * TYHJAN_KATTO, 1)} %), `
        + `kokonaan ruudussa ${r.ruudussa}`
      : 'EI MITATTAVISSA');

  /* --- 1. uloszoomaus ei onnistu -------------------------------- */
  const m = await mittaa(sivu);
  const vara = m.maxAlt / m.alt - 1;
  const kx = Math.round(m.kotelo.x0 + m.kotelo.w / 2);
  const ky = Math.round(m.kotelo.y0 + m.kotelo.h / 2);
  await sivu.keyboard.down('Control');
  await sivu.mouse.move(kx, ky);
  for (let i = 0; i < 25; i += 1) { await sivu.mouse.wheel(0, 200); await sivu.waitForTimeout(25); }
  await sivu.keyboard.up('Control');
  await sivu.waitForTimeout(700);
  const u = await mittaa(sivu);
  const rullavara = u.alt / m.alt - 1;
  zoomiTulokset.push({ ruutu: ruutu.nimi, vara: p(vara), rullavara: p(rullavara),
    ok: vara <= ULOSZOOMAUSVARA && rullavara <= ULOSZOOMAUSVARA });
  tieto(`${ruutu.nimi} px · uloszoomaus`,
    `saapumiskorkeus ${p(m.alt)}, katto ${p(m.maxAlt)} (vara ${p(100 * vara, 1)} %), `
    + `ctrl-rulla ulos → ${p(u.alt)} (+${p(100 * rullavara, 1)} %), `
    + `kortti ${m.kortti ? `${p(m.kortti.w, 1)} × ${p(m.kortti.h, 1)} px` : 'EI OLE'}, `
    + `ylivuoto ${m.ylivuoto} px`);

  /* --- 2. paneeli on meren päällä -------------------------------- */
  const osumat = m.mitat ? maaosumat(m.mitat) : null;
  meriTulokset.push({ ruutu: ruutu.nimi, osumia: osumat ? osumat.length : null,
    maat: osumat ? [...new Set(osumat.map((o) => o.iso))] : null,
    ok: Boolean(osumat && osumat.length === 0) });
  tieto(`${ruutu.nimi} px · paneelin paikka`,
    `keskiylä ${p(m.mitat?.lat, 3)} N / ${p(m.mitat?.lng, 3)} E, `
    + `lautamitta ${p(m.mitat?.w, 1)} × ${p(m.mitat?.h, 1)} yks, `
    + `maaosumia ${osumat ? osumat.length : '—'}`
    + `${osumat?.length ? ` (${[...new Set(osumat.map((o) => o.iso))].join(', ')})` : ''}, `
    + `kortti ruudulla x ${p(m.kortti?.x0, 1)}…${p(m.kortti?.x1, 1)} / 0…${p(m.kotelo.w, 1)}, `
    + `y ${p(m.kortti?.y0, 1)}…${p(m.kortti?.y1, 1)} / 0…${p(m.kotelo.h, 1)}`);

  /* --- 8. ankkuri seuraa kuvasuhde-ehtoa (erä 16) ---------------- */
  {
    const odotettu = ruutu.nimi === '390' ? KAPEA_ANKKURI : LEVEA_ANKKURI;
    const ero = m.mitat
      ? Math.max(Math.abs(m.mitat.lat - odotettu.lat), Math.abs(m.mitat.lng - odotettu.lng))
      : null;
    const ruudulla = Boolean(m.kortti && m.kortti.x0 >= -0.5 && m.kortti.y0 >= -0.5
      && m.kortti.x1 <= m.kotelo.w + 0.5 && m.kortti.y1 <= m.kotelo.h + 0.5);
    ankkuriTulokset.push({
      ruutu: ruutu.nimi,
      kapea: m.kapea,
      odotettuKapea: ruutu.nimi === '390',
      lat: p(m.mitat?.lat, 3),
      lng: p(m.mitat?.lng, 3),
      ero: p(ero, 4),
      ruudulla,
      merella: Boolean(osumat && osumat.length === 0),
      ok: Boolean(m.kapea === (ruutu.nimi === '390') && ero !== null && ero <= ASTEEN_VARA
        && ruudulla && osumat && osumat.length === 0),
    });
    tieto(`${ruutu.nimi} px · maapaneelin ankkuri (erä 16)`,
      `korkeussovitus ${m.kapea} → odotettu ${ruutu.nimi === '390' ? 'Lyoninlahti' : 'Biskajanlahti'} `
      + `${p(odotettu.lat, 2)} N / ${p(odotettu.lng, 2)} E, mitattu ${p(m.mitat?.lat, 3)} N / `
      + `${p(m.mitat?.lng, 3)} E (ero ${p(ero, 4)}°, vara ${ASTEEN_VARA}°), `
      + `kortti kokonaan ruudulla ${ruudulla}, merellä ${Boolean(osumat && osumat.length === 0)}`);
  }

  if (KUVAKANSIO) {
    await sivu.evaluate(() => {
      for (const node of document.querySelectorAll('.fokusvirta-isokuva')) {
        node.style.setProperty('display', 'none', 'important');
      }
    });
    await sivu.waitForTimeout(400);
    await zoomaa(sivu, 1);
    await sivu.screenshot({ path: join(KUVAKANSIO, `karttauudistus-12-${ruutu.nimi}.png`) });
  }

  /* --- 3. koko on kiinteä karttaan nähden ------------------------ */
  const tasot = [];
  for (const osuus of ZOOMITASOT) {
    await zoomaa(sivu, osuus);
    const s = await suhdeNyt(sivu);
    if (s) tasot.push({ osuus, alt: p(s.alt), kortti: p(s.kortti, 1), lauta: p(s.lauta, 1),
      suhde: p(s.kortti / s.lauta, 5), laatikkosuhde: p(s.kortti / s.laatikko, 5),
      tulo: p(s.skaala * s.alt, 5) });
  }
  const hajonta = (avain) => {
    const arvot = tasot.map((t) => t[avain]);
    if (arvot.length < 3 || arvot.some((v) => !(v > 0))) return Infinity;
    return (Math.max(...arvot) - Math.min(...arvot)) / (arvot.reduce((a, b) => a + b, 0) / arvot.length);
  };
  const hTulo = hajonta('tulo');
  suhdeTulokset.push({ ruutu: ruutu.nimi, hTulo: p(hTulo, 5), ok: hTulo <= SUHTEEN_VARA, tasot });
  tieto(`${ruutu.nimi} px · skaala kolmella zoomilla`,
    `${tasot.map((t) => `alt ${t.alt} → kortti ${t.kortti} px, skaala × korkeus ${t.tulo}`).join(' | ')}; `
    + `hajonta ${p(100 * hTulo, 3)} % (raja ${100 * SUHTEEN_VARA} %)`);
  tieto(`${ruutu.nimi} px · ruutuleveyksien suhteet (pallon geometria, INFO)`,
    `${tasot.map((t) => `alt ${t.alt}: kortti/paneelin lautamitta ${t.suhde}, `
      + `kortti/maan laatikko ${t.laatikkosuhde}`).join(' | ')}; `
    + `hajonta ${p(100 * hajonta('suhde'), 2)} % ja ${p(100 * hajonta('laatikkosuhde'), 2)} %`);

  /* --- 5./6. tekstisuhde ja valikko (erä 13) ------------------- */
  await zoomaa(sivu, 1);
  /* --- paneelin leveysosuus saapumisnäkymässä ------------------- */
  const leveysOsuus = m.kortti?.w > 0 && m.kotelo?.w > 0 ? m.kortti.w / m.kotelo.w : null;
  leveysTulokset.push({
    ruutu: ruutu.nimi,
    leveysPx: p(m.kortti?.w, 1),
    osuus: p(leveysOsuus, 4),
    ok: Boolean(leveysOsuus !== null && leveysOsuus <= LEVEYDEN_KATTO),
  });
  tieto(`${ruutu.nimi} px · paneelin leveys saapumisnäkymässä`,
    `${p(m.kortti?.w, 1)} px / ${p(m.kotelo?.w, 0)} px = ${p(100 * (leveysOsuus ?? 0), 2)} % `
    + `(katto ${100 * LEVEYDEN_KATTO} %)`);

  const t = await tekstiKoot(sivu, NOSTOSYM_NIMIO_KOKO);
  tekstiTulokset.push({ ruutu: ruutu.nimi, ...t, suhde: p(t.paneeli / t.nosto, 4) });
  tieto(`${ruutu.nimi} px · tekstikoot saapumisnäkymässä`,
    `noston nimiö ${p(t.nosto, 3)} px, paneelin leipäteksti ${p(t.paneeli, 3)} px, `
    + `suhde ${p(t.paneeli / t.nosto, 3)} (ankkuri on ${ANKKURIRUUTU.nimi} px, INFO tässä)`);
  const v = await valikonMitat(sivu);
  valikkoTulokset.push({ ruutu: ruutu.nimi, ...v, ok: valikkoKelpaa(v) });
  tieto(`${ruutu.nimi} px · lisää-valikko`,
    v.auki
      ? `${v.napit} nappia ${v.rivit} rivillä, ${p(v.w, 1)} × ${p(v.h, 1)} px, `
        + `taustan alfa ${p(v.taustaAlfa, 3)} / reunus ${p(v.reunusPx, 2)} px / `
        + `napin tausta ${p(v.nappiTaustaAlfa, 3)}, rako korttiin ${p(v.rako, 2)} px, `
        + `leikkaa korttia: ${v.leikkaa ? 'KYLLÄ' : 'ei'}, kokonaan ruudulla `
        + `${v.ruudulla}, tekstin reunus: ${v.varjo && v.varjo !== 'none' ? 'on' : 'EI'}, `
        + `plussan keskilinja ${p(v.plusKeskiKortista, 2)} px kortin yläreunasta `
        + `(skaala ${p(v.skaala, 3)}), rivien väli/tekstikoko ${JSON.stringify(v.suhteet.map((s) => p(s, 3)))} `
        + `(tavoite ${RIVIVALIN_SUHDE} ± ${100 * RIVIVALIN_VARA} %), sivu ${v.vasen ? 'VASEN' : 'oikea'}, `
        + `rako plussaan ${p(v.vasen ? -v.vasenRako : v.oikeaRako, 2)} px, `
        + `yläreunan ero plussaan ${p(v.plusYlaero, 2)} px`
      : 'EI AUENNUT');

  /*
   * --- 7b. rivivälin suhde pysyy 1,3 ± 5 %:ssa KOLMELLA ZOOMILLA
   * (saapumis + 2 porrasta sisään; PÄÄTÖKSET 22 KORJAUS). Skaalautuva
   * PIKSELIRAKO ei riitä todisteeksi — juuri se piti vian piilossa
   * kolmen zoomin savukkeista, kun `min-height: 42px` venytti rivit
   * (ks. valikonMitat-funktion selitys).
   */
  await zoomaa(sivu, 1);
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
  await sivu.waitForTimeout(600);
  const valikkoZoomit = [];
  for (const osuus of ZOOMITASOT) {
    await zoomaa(sivu, osuus); // eslint-disable-line no-await-in-loop
    await sivu.waitForTimeout(200); // eslint-disable-line no-await-in-loop
    const vz = await sivu.evaluate(() => { // eslint-disable-line no-await-in-loop
      const kortti = document.querySelector('.maapaneeli-kortti');
      const valikko = document.querySelector('.maapaneeli-valikko');
      const napit = [...(valikko?.querySelectorAll('.maapaneeli-aihe') ?? [])]
        .map((b) => b.getBoundingClientRect().top);
      // Sama skaalaus kuin valikonMitat:ssa (kohta d yllä) — muuten
      // suhde ei koskaan pysyisi vakiona zoomilla.
      const skaalaNyt = kortti && kortti.offsetWidth > 0
        ? kortti.getBoundingClientRect().width / kortti.offsetWidth : 1;
      const fontSizePx = valikko && napit.length
        ? parseFloat(getComputedStyle(valikko.querySelector('.maapaneeli-aihe')).fontSize) * skaalaNyt
        : null;
      const pitches = [];
      for (let i = 1; i < napit.length; i += 1) pitches.push(napit[i] - napit[i - 1]);
      return { fontSizePx, suhteet: fontSizePx ? pitches.map((pp) => pp / fontSizePx) : [] };
    });
    valikkoZoomit.push({ osuus, ...vz, ok: rivivaliKelpaa(vz) });
  }
  await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
  await sivu.waitForTimeout(300);
  await zoomaa(sivu, 1);
  valikkoZoomiTulokset.push({ ruutu: ruutu.nimi, zoomit: valikkoZoomit,
    ok: valikkoZoomit.length === ZOOMITASOT.length && valikkoZoomit.every((z) => z.ok) });
  tieto(`${ruutu.nimi} px · rivivälin suhde kolmella zoomilla`,
    valikkoZoomit.map((z) => `osuus ${z.osuus}: fontti ${p(z.fontSizePx, 3)} px, suhteet `
      + `${JSON.stringify(z.suhteet.map((s) => p(s, 3)))}`).join(' | '));

  paaVirheet = paaVirheet.concat(virheet);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

/*
 * TEKSTISUHDE EI OLE ENÄÄ OMA VARTIONSA. Erä 13 kalibroi paneelin
 * noston tekstikokoon yhdellä ankkuriruudulla, mutta 14.9.2026 illan
 * päätös korvasi mitoituksen suoralla leveysrajalla (väite 6), ja
 * samana iltana myös NOSTON kyltti sidottiin karttaan
 * (js/pallolauta/nostot.js KARTTANOSTON KYLTTI ON KARTAN MITTA).
 * Molempien suhde on siis vakio zoomeilla, ja sen mittaa
 * tools/savukkeet/savuke-nimikyltti.mjs (vartiot 4 ja 6) — täällä se
 * olisi kopio. Suhde jää INFOksi jokaiselta ruudulta (yllä).
 */

vaadi('1. uloszoomaus ei onnistu Ranskassa (390 px ja 1400 px)',
  zoomiTulokset.length === RUUDUT.length && zoomiTulokset.every((t) => t.ok),
  JSON.stringify(zoomiTulokset));
kumottu('2. maapaneeli on meren päällä — ei yhdenkään maan polygonissa',
  meriTulokset.length === RUUDUT.length && meriTulokset.every((t) => t.ok),
  JSON.stringify(meriTulokset));
kumottu('3. paneelin koko seuraa kartan mittakaavaa katkotta (3 zoomia)',
  suhdeTulokset.length === RUUDUT.length && suhdeTulokset.every((t) => t.ok),
  JSON.stringify(suhdeTulokset.map((t) => ({ ruutu: t.ruutu, hTulo: t.hTulo }))));
vaadi('5. saapumisnäkymä rajautuu aivan maan rajojen ulkopuolelle (tyhjä ≤ 9 %, '
  + 'sisältää erän 19d saapumisvaran)',
  rajausTulokset.length === RUUDUT.length && rajausTulokset.every((t) => t.ok),
  JSON.stringify(rajausTulokset));
kumottu('6. paneelin leveys saapumisnäkymässä ≤ 10 % ruudun leveydestä',
  leveysTulokset.length === RUUDUT.length && leveysTulokset.every((t) => t.ok),
  JSON.stringify(leveysTulokset));
kumottu('7. lisää-valikko: kategoriat allekkain tiiviisti (rivivali 1,3× tekstin koko), '
  + 'ei taustalaatikkoa, plussan vierellä ja kokonaan ruudulla (390 px ja 1400 px)',
  valikkoTulokset.length === RUUDUT.length && valikkoTulokset.every((t) => t.ok),
  JSON.stringify(valikkoTulokset.map((t) => ({ ruutu: t.ruutu, napit: t.napit, rivit: t.rivit,
    taustaAlfa: t.taustaAlfa, reunusPx: t.reunusPx, nappiTaustaAlfa: t.nappiTaustaAlfa,
    ruudulla: t.ruudulla, rako: t.rako, leikkaa: t.leikkaa, suhteet: t.suhteet,
    vasen: t.vasen, oikeaRako: t.oikeaRako, vasenRako: t.vasenRako, plusYlaero: t.plusYlaero }))));
kumottu('7b. rivivälin suhde (1,3 ± 5 %) pysyy vakiona kolmella zoomilla '
  + '(saapumis + 2 porrasta sisään, 390 px ja 1400 px)',
  valikkoZoomiTulokset.length === RUUDUT.length && valikkoZoomiTulokset.every((t) => t.ok),
  JSON.stringify(valikkoZoomiTulokset));
kumottu('8. ankkuri: kapealla ruudulla Lyoninlahti, leveällä Biskajanlahti — '
  + 'kortti ruudulla ja meren päällä kummallakin',
  ankkuriTulokset.length === RUUDUT.length && ankkuriTulokset.every((t) => t.ok),
  JSON.stringify(ankkuriTulokset));
tieto('sivun virheet (pääajo)', paaVirheet.length ? paaVirheet.join(' | ') : 'ei yhtään');
vaadi('4. pääajo ei tuottanut sivuvirheitä', paaVirheet.length === 0, paaVirheet.join(' | '));

/* ===== 6 JA 7: PUHELIN PYSTYSSÄ SOVITETAAN KORKEUTEEN (erä 14) ===== */
let kuusi = null;
let seitseman = null;
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  vaadi('pallolauta aukesi (390 px, korkeussovitus)', auki, '');
  if (auki) {
    const r = await rajausNyt(sivu);
    const poikkeama = r?.kaupunki ? (r.kaupunki.x - r.kotelo.w / 2) / r.kotelo.w : null;
    kuusi = {
      akseli: r?.akseli, sitova: p(r?.sitova, 4), tyhjaX: p(r?.tyhjaX, 4),
      poikkeama: p(poikkeama, 4), ruudussa: r?.ruudussa ?? false,
      ok: Boolean(r && r.akseli === 'Y' && r.sitova >= 0 && r.sitova <= TYHJAN_KATTO
        && r.ruudussa && poikkeama !== null && Math.abs(poikkeama) <= KAUPUNGIN_POIKKEAMA),
    };
    tieto('390 px · korkeussovitus',
      `sitova akseli ${r?.akseli} ${p(100 * (r?.sitova ?? 0), 2)} % (katto ${100 * TYHJAN_KATTO} %), `
      + `tyhjä X ${p(100 * (r?.tyhjaX ?? 0), 1)} % (ylivuoto on päätös), `
      + `Pariisi ruudun keskeltä ${p(100 * (poikkeama ?? 0), 2)} % `
      + `(katto ±${100 * KAUPUNGIN_POIKKEAMA} %)`);

    /* 7. panorointi ääripäihin: maan reuna ruudulle, laatikko ei sisään. */
    const osat = [];
    for (const suunta of [-1, 1]) {
      const pt = await panoroiRajalle(sivu, suunta); // eslint-disable-line no-await-in-loop
      await sivu.waitForTimeout(700); // eslint-disable-line no-await-in-loop
      const r2 = await rajausNyt(sivu); // eslint-disable-line no-await-in-loop
      const kohta = suunta < 0 ? r2?.bretagne : r2?.elsass;
      // r2 (siis myös r2.kotelo/r2.maa) voi olla null (ks. rajausNyt) — ei saa kaataa savuketta.
      const ruudulla = Boolean(kohta && r2 && kohta.x >= 0 && kohta.x <= r2.kotelo.w
        && kohta.y >= 0 && kohta.y <= r2.kotelo.h);
      // Laatikon reuna EI saa tulla ruudun sisään sillä laidalla, jota kohti panoroitiin.
      const reunaUlkona = r2
        ? (suunta < 0 ? r2.maa.x0 <= 1 : r2.maa.x1 >= r2.kotelo.w - 1)
        : false;
      osat.push({ suunta: suunta < 0 ? 'länsi' : 'itä', kohde: p(pt?.kohde, 4),
        elava: pt?.raja?.elava ?? false, ruudulla, reunaUlkona,
        reunaX: p(suunta < 0 ? r2?.maa.x0 : r2 ? r2.maa.x1 - r2.kotelo.w : null, 1),
        kohtaX: p(kohta?.x, 1) });
      tieto(`390 px · panorointi ${suunta < 0 ? 'länteen' : 'itään'}`,
        `keskipiste ${p(pt?.kohde, 3)}°, ${suunta < 0 ? 'Bretagne' : 'Elsass'} ruudulla `
        + `${ruudulla} (x ${p(kohta?.x, 1)}), laatikon reuna ruudun ulkopuolella ${reunaUlkona}`);
    }
    seitseman = { osat, ok: osat.length === 2 && osat.every((o) => o.ruudulla && o.reunaUlkona) };
  }
  await ctx.close();
}
vaadi('6. puhelin pystyssä: sitova akseli Y, tyhjä ≤ TYHJAN_KATTO, kaupunki keskellä',
  Boolean(kuusi?.ok), JSON.stringify(kuusi));
vaadi('7. panorointi tuo maan reunan ruudulle, laatikon reuna ei tule ruudun sisään',
  Boolean(seitseman?.ok), JSON.stringify(seitseman));

/* ===== 9 JA 10: KREIKKA (erä 18, PÄÄTÖKSET 20 ja 21) ============== */
const kreikkaTulokset = [];
let kreikanVirheet = [];
let kymmenen = null;
for (const ruutu of RUUDUT) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli({ ...ruutu, save: tallenneGRC });
  vaadi(`pallolauta aukesi Kreikassa (${ruutu.nimi} px)`, auki, virheet.join(' | '));
  if (!auki) { await ctx.close(); continue; }
  const m = await mittaa(sivu);
  const osumat = m.mitat ? maaosumat(m.mitat) : null;
  const kalusteet = await kartanKalusteet(sivu);
  const odotettu = ruutu.nimi === '390' ? GRC_KAPEA : GRC_LEVEA;
  const ero = m.mitat
    ? Math.max(Math.abs(m.mitat.lat - odotettu.lat), Math.abs(m.mitat.lng - odotettu.lng)) : null;
  const ruudulla = Boolean(m.kortti && m.kortti.x0 >= -0.5 && m.kortti.y0 >= -0.5
    && m.kortti.x1 <= m.kotelo.w + 0.5 && m.kortti.y1 <= m.kotelo.h + 0.5);
  const tormaykset = m.kortti ? kalusteet.filter((k) => leikkaavat(m.kortti, k)) : [];
  /*
   * "MERIKILPIKONNAN VASEMMALLA PUOLELLA" MITATAAN KAIKISTA NOSTOISTA.
   * Nostolla ei ole tekstisolmua (nimiö on rasteri), joten yksittäistä
   * kilpikonnaa ei voi nimetä ruudulta — mutta *kaikkien* nostojen
   * vasen puoli on vahvempi väite kuin yhden, ja se pitää sisällään
   * omistajan pyynnön.
   */
  const nostot = kalusteet.filter((k) => k.laji === '.pallolauta-nosto');
  const lahinNosto = nostot.length ? Math.min(...nostot.map((k) => k.x0)) : null;
  const rako = m.kortti && lahinNosto !== null ? lahinNosto - m.kortti.x1 : null;
  const vasemmalla = ruutu.nimi !== '1400' || (rako !== null && rako >= NOSTON_RAKO);
  kreikkaTulokset.push({ ruutu: ruutu.nimi, kapea: m.kapea, lat: p(m.mitat?.lat, 3),
    lng: p(m.mitat?.lng, 3), ero: p(ero, 4), osumia: osumat?.length ?? null, ruudulla,
    tormayksia: tormaykset.length, rakoNostoon: p(rako, 1), vasemmalla,
    ok: Boolean(m.kapea === (ruutu.nimi === '390') && ero !== null && ero <= ASTEEN_VARA
      && osumat && osumat.length === 0 && ruudulla && tormaykset.length === 0 && vasemmalla) });
  tieto(`${ruutu.nimi} px · Kreikan maapaneeli`,
    `korkeussovitus ${m.kapea} → odotettu ${ruutu.nimi === '390' ? 'Aigeianmeri' : 'Joonianmeri'} `
    + `${p(odotettu.lat, 2)} N / ${p(odotettu.lng, 2)} E, mitattu ${p(m.mitat?.lat, 3)} N / `
    + `${p(m.mitat?.lng, 3)} E (ero ${p(ero, 4)}°), maaosumia ${osumat?.length ?? '—'}`
    + `${osumat?.length ? ` (${[...new Set(osumat.map((o) => o.iso))].join(', ')})` : ''}, `
    + `kortti x ${p(m.kortti?.x0, 1)}…${p(m.kortti?.x1, 1)} / 0…${p(m.kotelo.w, 1)}, `
    + `y ${p(m.kortti?.y0, 1)}…${p(m.kortti?.y1, 1)} / 0…${p(m.kotelo.h, 1)}, ruudulla ${ruudulla}, `
    + `päällekkäisyyksiä ${tormaykset.length}`
    + `${tormaykset.length ? ` (${tormaykset.map((t) => `${t.laji}${t.nimi ? ` ${t.nimi}` : ''}`).join(', ')})` : ''}, `
    + `rako lähimpään nostoon ${p(rako, 1)} px`);

  if (KUVAKANSIO) {
    await sivu.evaluate(() => {
      for (const node of document.querySelectorAll('.fokusvirta-isokuva')) {
        node.style.setProperty('display', 'none', 'important');
      }
    });
    await sivu.waitForTimeout(400);
    await sivu.screenshot({ path: join(KUVAKANSIO, `paneeli-grc-${ruutu.nimi}.png`) });
    await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
    await sivu.waitForTimeout(700);
    await sivu.screenshot({ path: join(KUVAKANSIO, `lisaa-valikko-${ruutu.nimi}.png`) });
    await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
    await sivu.waitForTimeout(300);
  }

  /* --- 10. zoomi ja raahaus menevät paneelin läpi (vain 1400 px) --- */
  if (ruutu.nimi === '1400' && m.kortti) {
    const px = Math.round(m.kotelo.x0 + (m.kortti.x0 + m.kortti.x1) / 2);
    const py = Math.round(m.kotelo.y0 + (m.kortti.y0 + m.kortti.y1) / 2);
    /*
     * NIMEN NAPAUTUS MITATAAN ENSIN (erä 20, PÄÄTÖKSET 28 TARKENNUS 2:
     * plus-nappi on poistettu, ja kalusteen avaa maan NIMI).
     *
     * Napautus tehdään OIKEALLA HIIRELLÄ ruudun koordinaatteihin (ei
     * `el.click()`), koska juuri osumatestaus on se, mitä erä 18 ja
     * erä 20 muuttivat: kaluste on `pointer-events: none`, ja napautus
     * poimitaan dokumentin kaappausvaiheessa (js/pallolauta/
     * maapaneeli.js NAPAUTUS ON OSUMATESTI).
     */
    const nappi = await sivu.evaluate(() => {
      const b = document.querySelector('.maapaneeli-avain');
      const r = b?.getBoundingClientRect();
      return r && r.width > 0 ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    });
    let plusToimii = false;
    if (nappi) {
      await sivu.mouse.click(nappi.x, nappi.y);
      await sivu.waitForTimeout(600);
      plusToimii = await sivu.evaluate(() => {
        const v = document.querySelector('.maapaneeli-valikko');
        return Boolean(v && !v.hidden && v.getBoundingClientRect().height > 0);
      });
      await sivu.mouse.click(nappi.x, nappi.y);
      await sivu.waitForTimeout(300);
    }
    /*
     * VERTAILU ON SAMA PISTE ILMAN PANEELIA (korjaus 16.9.2026, erä
     * 19b).
     *
     * ENNEN: paneelin päältä rullattiin sen omassa kohdassa ja
     * vertailu otettiin TOISESTA sivusta RUUDUN KESKELTÄ. Se toimi
     * niin kauan kuin paneeli oli kartalla lähellä keskustaa (ero
     * mitattu 7 %), mutta erä 19 siirsi paneelin ruudun VASEMPAAN
     * ALAKULMAAN — ja Globe.gl zoomaa OSOITTIMEN KOHTAA kohti, joten
     * sama pykälämäärä nurkassa ja keskellä antaa eri korkeusmuutoksen
     * ihan geometrian takia. Julkaisuajossa suhde oli 0,837 eikä
     * paneelissa ollut mitään vikaa.
     *
     * NYT: molemmat mitat otetaan SAMASTA RUUTUPISTEESTÄ samalla
     * sivulla, ja ainoa ero on, onko paneeli siinä vai ei — juuri se,
     * mitä PÄÄTÖKSET 21 väittää. Kamera palautetaan saapumisnäkymään
     * mittausten väliin, jotta lähtökorkeus on sama.
     */
    const paneeli = await rullaa(sivu, px, py);
    await palautaNakyma(sivu);
    await sivu.evaluate(() => {
      const sailio = document.querySelector('.maapaneeli-nurkka');
      if (sailio) sailio.style.setProperty('display', 'none', 'important');
    });
    const kartta = await rullaa(sivu, px, py);
    await sivu.evaluate(() => {
      document.querySelector('.maapaneeli-nurkka')?.style.removeProperty('display');
    });
    await palautaNakyma(sivu);
    /*
     * RAAHAUS SAMASTA PISTEESTÄ. Kortti on erästä 19 alkaen ruudun
     * kaluste eikä kartan mitta, joten se on samassa kohdassa myös
     * zoomin jälkeen — vetopiste on siis sama px, py.
     */
    const veto = await raahaa(sivu, px, py);
    const suhde = kartta && kartta.muutos > 0 ? paneeli.muutos / kartta.muutos : null;
    kymmenen = {
      paneeli: p(paneeli.muutos, 5), kartta: p(kartta?.muutos, 5), suhde: p(suhde, 3),
      dLng: p(veto.dLng, 3), valinta: veto.valinta, plusToimii,
      /*
       * VARA 10 %. Kun molemmat mitat otetaan SAMASTA ruutupisteestä
       * samalta sivulta (ks. yllä), suhteen pitäisi olla 1,00 —
       * vara kattaa vain tweenin ja pyöristyksen heilahtelun. Vara ei
       * höllennä väitettä: vastakokeessa J suhde on 0, koska paneeli
       * syö rullan kokonaan.
       */
      ok: Boolean(kartta && kartta.muutos > 1e-4 && suhde !== null && Math.abs(suhde - 1) <= 0.10
        && veto.dLng > 0.03 && veto.valinta === '' && plusToimii),
    };
    tieto('1400 px · zoomi ja raahaus paneelin päältä',
      `ctrl-rulla paneelin päällä muutti korkeutta ${p(paneeli.muutos, 5)}, SAMASTA pisteestä `
      + `ilman paneelia ${p(kartta?.muutos, 5)} (suhde ${p(suhde, 3)}, vara 10 %), raahaus paneelin päältä `
      + `panoroi ${p(veto.dLng, 3)}°, tekstivalinta "${veto.valinta}", nimen napautus avasi `
      + `otsikot ${plusToimii}`);
  }

  kreikanVirheet = kreikanVirheet.concat(virheet);
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}
tieto('sivun virheet (Kreikka)', kreikanVirheet.length ? kreikanVirheet.join(' | ') : 'ei yhtään');
kumottu('9. Kreikan maapaneeli: Joonianmeri (leveä) ja Aigeianmeri (kapea) — merellä, '
  + 'ruudulla, ilman päällekkäisyyksiä, nostojen vasemmalla puolella',
  kreikkaTulokset.length === RUUDUT.length && kreikkaTulokset.every((t) => t.ok),
  JSON.stringify(kreikkaTulokset));
vaadi('10. rulla ja raahaus kalusteen päältä menevät kartalle, nimen napautus avaa yhä',
  Boolean(kymmenen?.ok), JSON.stringify(kymmenen));

/*
 * ===== INFO: DPR 3:N LAATTATASO (erä 14, MITATTU JA KIRJATTU) ======
 *
 * Tämä EI ole väite vaan mittaus. Erän 14 hypoteesi oli, että
 * laattatason valinta kertoo ruudun tarpeen koko laitepikseli-
 * kertoimella ja että dpr 3 nostaa tason kaksi porrasta (z6 → z8).
 * VASTAKOE KAATOI HYPOTEESIN: dpr-katolla ja ilman sitä valittu taso
 * on sama z7, koska tason valinta ei koskaan pääse z8:aan —
 * näkyvien laattojen katto (LAATTAKERROS_LAATTAKATTO_NAKYVA 48) ja
 * hystereesi pudottavat sen z7:ään jo ilman kattoa. Ero dpr 1:een
 * (z6, 12 laattaa) on siis YKSI porras eikä kaksi, ja se on
 * tarkkuusvaatimus eikä vika. Luku jää INFOksi, jotta muutos näkyisi
 * heti, jos tason valinta joskus muuttuu.
 */
for (const dpr of [1, 3]) {
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844, dpr });
  if (auki) {
    const m = await valittuTaso(sivu);
    tieto(`390 px dpr ${dpr} · laattataso (INFO)`,
      `z${m?.taso}, laattoja ${m?.laattoja} (näkyviä ${m?.nakyvia}), `
      + `valmiita ${m?.valmiita}, scenessä ${m?.scenessa}, maa ${m?.variMaa}`);
  }
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

/* ==================== VASTAKOKEET ================================= */

/* A: ULOSZOOMAUKSEN_KERROIN 3 → väitteen 1 on kaaduttava. */
vastakoe = 'A';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaa(sivu) : null;
  const vara = m ? m.maxAlt / m.alt - 1 : null;
  tieto('vastakoe A (kerroin 3)',
    `saapumiskorkeus ${p(m?.alt)}, katto ${p(m?.maxAlt)}, vara ${p(100 * (vara ?? 0), 1)} % `
    + `→ väite 1 ${vara != null && vara <= ULOSZOOMAUSVARA ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  vaadi('VASTAKOE A: kertoimella 3 uloszoomausväite kaatuu',
    Boolean(auki && m) && vara > ULOSZOOMAUSVARA, JSON.stringify({ auki, vara }));
  await ctx.close();
}

/* B: ankkuritaulu tyhjäksi → väitteen 2 on kaaduttava. */
vastakoe = 'B';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaa(sivu) : null;
  const osumat = m?.mitat ? maaosumat(m.mitat) : null;
  tieto('vastakoe B (ankkuri takaisin eteläreunaan)',
    `keskiylä ${p(m?.mitat?.lat, 3)} N / ${p(m?.mitat?.lng, 3)} E, maaosumia ${osumat?.length ?? '—'}`
    + `${osumat?.length ? ` (${[...new Set(osumat.map((o) => o.iso))].join(', ')})` : ''} `
    + `→ väite 2 ${osumat && osumat.length === 0 ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  kumottu('VASTAKOE B: eteläreunan ankkurilla meriväite kaatuu',
    Boolean(auki && osumat) && osumat.length > 0, JSON.stringify({ auki, osumia: osumat?.length }));
  await ctx.close();
}

/* H: kapea-ankkuri pois → väitteen 8 on kaaduttava (erä 16). */
vastakoe = 'H';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const m = auki ? await mittaa(sivu) : null;
  const ruudulla = Boolean(m?.kortti && m.kortti.x0 >= -0.5 && m.kortti.y0 >= -0.5
    && m.kortti.x1 <= m.kotelo.w + 0.5 && m.kortti.y1 <= m.kotelo.h + 0.5);
  tieto('vastakoe H (kapea-ankkuri pois → Biskajanlahti myös pystypuhelimella)',
    `keskiylä ${p(m?.mitat?.lat, 3)} N / ${p(m?.mitat?.lng, 3)} E, `
    + `kortti x ${p(m?.kortti?.x0, 1)}…${p(m?.kortti?.x1, 1)} / 0…${p(m?.kotelo?.w, 1)}, `
    + `y ${p(m?.kortti?.y0, 1)}…${p(m?.kortti?.y1, 1)} / 0…${p(m?.kotelo?.h, 1)} `
    + `→ väite 8 ${ruudulla ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  kumottu('VASTAKOE H: ilman kapea-ankkuria paneeli jää pystypuhelimella ruudun ulkopuolelle',
    Boolean(auki && m?.kortti) && !ruudulla,
    JSON.stringify({ auki, kortti: m?.kortti, kotelo: m?.kotelo }));
  await ctx.close();
}

/* C: MAAPANEELIN_SKAALA_MAX 3 → väitteen 3 on kaaduttava. */
vastakoe = 'C';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const tasot = [];
  if (auki) {
    for (const osuus of ZOOMITASOT) {
      await zoomaa(sivu, osuus);
      const s = await suhdeNyt(sivu);
      if (s) tasot.push({ alt: p(s.alt), skaala: p(s.skaala, 3), tulo: p(s.skaala * s.alt, 5) });
    }
  }
  const arvot = tasot.map((t) => t.tulo);
  const hajonta = arvot.length === 3
    ? (Math.max(...arvot) - Math.min(...arvot)) / (arvot.reduce((a, b) => a + b, 0) / 3) : Infinity;
  tieto('vastakoe C (SKAALA_MAX 0,5)',
    `${tasot.map((t) => `alt ${t.alt} → skaala ${t.skaala}, tulo ${t.tulo}`).join(' | ')}; `
    + `hajonta ${p(100 * hajonta, 2)} % `
    + `→ väite 3 ${hajonta <= SUHTEEN_VARA ? 'LÄPI (paha)' : 'PUNAINEN'}`);
  kumottu('VASTAKOE C: katolla 0,5 skaalaväite kaatuu',
    auki && hajonta > SUHTEEN_VARA, JSON.stringify({ auki, hajonta }));
  await ctx.close();
}
/* D: rajaus takaisin laudan yksiköihin → väitteen 5 on kaaduttava. */
vastakoe = 'D';
{
  const tulokset = [];
  for (const ruutu of RUUDUT) {
    /* eslint-disable no-await-in-loop */
    const { ctx, sivu, auki } = await avaaPeli(ruutu);
    const r = auki ? await rajausNyt(sivu) : null;
    tulokset.push({ ruutu: ruutu.nimi, sitova: p(r?.sitova, 4), akseli: r?.akseli });
    tieto(`vastakoe D (${ruutu.nimi} px, rajaus laudan Mercator-yksiköistä)`,
      r ? `tyhjä X ${p(100 * r.tyhjaX, 2)} % · Y ${p(100 * r.tyhjaY, 2)} % → sitova `
        + `${r.akseli} ${p(100 * r.sitova, 2)} %` : 'EI MITATTAVISSA');
    await ctx.close();
    /* eslint-enable no-await-in-loop */
  }
  const kaatui = tulokset.some((t) => !(t.sitova >= 0) || t.sitova > TYHJAN_KATTO);
  tieto('vastakoe D', `→ väite 5 ${kaatui ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  vaadi('VASTAKOE D: laudan yksiköillä rajausväite kaatuu', kaatui, JSON.stringify(tulokset));
}
/* E: MAAPANEELIN_TEKSTIKERROIN 1 (erän 12 koko) → väitteen 6 on kaaduttava. */
vastakoe = 'E';
{
  const tulokset = [];
  for (const ruutu of RUUDUT) {
    /* eslint-disable no-await-in-loop */
    const { ctx, sivu, auki } = await avaaPeli(ruutu);
    const m = auki ? await mittaa(sivu) : null;
    const osuus = m?.kortti?.w > 0 && m?.kotelo?.w > 0 ? m.kortti.w / m.kotelo.w : null;
    tulokset.push({ ruutu: ruutu.nimi, leveysPx: p(m?.kortti?.w, 1), osuus: p(osuus, 4) });
    tieto(`vastakoe E (${ruutu.nimi} px, KATTO_RUUDUSTA pois)`,
      `paneeli ${p(m?.kortti?.w, 1)} px = ${p(100 * (osuus ?? 0), 2)} % ruudusta`);
    await ctx.close();
    /* eslint-enable no-await-in-loop */
  }
  const kaatuiE = tulokset.some((t) => !(t.osuus >= 0) || t.osuus > LEVEYDEN_KATTO);
  tieto('vastakoe E', `→ väite 6 ${kaatuiE ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  kumottu('VASTAKOE E: ilman erän 15 kattoa leveysväite kaatuu', kaatuiE, JSON.stringify(tulokset));
}

/* F: erän 12 valikkotyyli → väitteen 7 on kaaduttava. */
vastakoe = 'F';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 1400, korkeus: 900 });
  const v = auki ? await valikonMitat(sivu) : null;
  tieto('vastakoe F (erän 12 valikko: kaksi palstaa tummassa laatikossa)',
    v?.auki
      ? `${v.napit} nappia ${v.rivit} rivillä, taustan alfa ${p(v.taustaAlfa, 3)}, `
        + `reunus ${p(v.reunusPx, 2)} px, rako ${p(v.rako, 2)} px `
        + `→ väite 7 ${valikkoKelpaa(v) ? 'LÄPI (paha)' : 'PUNAINEN'}`
      : 'EI AUENNUT');
  kumottu('VASTAKOE F: erän 12 valikkotyylillä valikkoväite kaatuu',
    Boolean(v?.auki) && !valikkoKelpaa(v), JSON.stringify(v));
  await ctx.close();
}
/*
 * K: PÄÄTÖKSET 22 KORJAUS — skaalautuva mutta LIIAN SUURI rivinväli
 * (`button { min-height: 42px }` palaa voittamaan `.maapaneeli-aihe`n
 * oman `min-height: 0`:n) → väitteiden 7 ja 7b on kaaduttava. Tämä on
 * juuri se vika, joka jäi kolmen zoomin savukkeista huomaamatta,
 * koska rako PYSYI VAKIONA suhteessa zoomiin — vain suhde tekstin
 * kokoon oli väärä. Siksi koe ajetaan MYÖS kahdella zoomilla.
 */
vastakoe = 'K';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 1400, korkeus: 900 });
  const v = auki ? await valikonMitat(sivu) : null;
  let vz = null;
  if (auki) {
    await zoomaa(sivu, 1);
    await sivu.evaluate(() => { document.querySelector('.maapaneeli-avain')?.click(); });
    await sivu.waitForTimeout(600);
    await zoomaa(sivu, 0.25);
    await sivu.waitForTimeout(200);
    vz = await sivu.evaluate(() => {
      const kortti = document.querySelector('.maapaneeli-kortti');
      const valikko = document.querySelector('.maapaneeli-valikko');
      const napit = [...(valikko?.querySelectorAll('.maapaneeli-aihe') ?? [])]
        .map((b) => b.getBoundingClientRect().top);
      // Sama skaalaus kuin valikonMitat:ssa — muuten suhde ei koskaan
      // pysyisi vakiona zoomilla (ks. valikonMitat kohta d).
      const skaalaNyt = kortti && kortti.offsetWidth > 0
        ? kortti.getBoundingClientRect().width / kortti.offsetWidth : 1;
      const fontSizePx = valikko && napit.length
        ? parseFloat(getComputedStyle(valikko.querySelector('.maapaneeli-aihe')).fontSize) * skaalaNyt
        : null;
      const pitches = [];
      for (let i = 1; i < napit.length; i += 1) pitches.push(napit[i] - napit[i - 1]);
      return { fontSizePx, suhteet: fontSizePx ? pitches.map((pp) => pp / fontSizePx) : [] };
    });
  }
  tieto('vastakoe K (button min-height: 42px voittaa rivinkorkeuden)',
    v?.auki
      ? `saapumis rivien väli/tekstikoko ${JSON.stringify(v.suhteet.map((s) => p(s, 2)))}, `
        + `zoomattuna ${JSON.stringify((vz?.suhteet ?? []).map((s) => p(s, 2)))} `
        + `(tavoite ${RIVIVALIN_SUHDE} ± ${100 * RIVIVALIN_VARA} %) `
        + `→ väite 7 ${valikkoKelpaa(v) ? 'LÄPI (paha)' : 'PUNAINEN'}, `
        + `väite 7b ${rivivaliKelpaa(vz) ? 'LÄPI (paha)' : 'PUNAINEN'}`
      : 'EI AUENNUT');
  kumottu('VASTAKOE K: button-oletuksen min-height: 42px palautettuna rivivälin suhde kaatuu '
    + 'saapumiszoomilla ja zoomattuna',
    Boolean(v?.auki) && !rivivaliKelpaa(v) && !rivivaliKelpaa(vz), JSON.stringify({ v, vz }));
  await ctx.close();
}
/* G: korkeussovitus pois → väitteiden 6 ja 7 on kaaduttava. */
vastakoe = 'G';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 390, korkeus: 844 });
  const r = auki ? await rajausNyt(sivu) : null;
  const poikkeama = r?.kaupunki ? (r.kaupunki.x - r.kotelo.w / 2) / r.kotelo.w : null;
  const kaatui = !(r && r.akseli === 'Y' && r.sitova >= 0 && r.sitova <= TYHJAN_KATTO
    && poikkeama !== null && Math.abs(poikkeama) <= KAUPUNGIN_POIKKEAMA);
  tieto('vastakoe G (korkeussovitus pois)',
    `sitova ${r?.akseli} ${p(100 * (r?.sitova ?? 0), 2)} %, tyhjä Y ${p(100 * (r?.tyhjaY ?? 0), 2)} % `
    + `→ väite 6 ${kaatui ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  vaadi('VASTAKOE G: ilman korkeussovitusta pystyruudun väite kaatuu',
    Boolean(auki) && kaatui, JSON.stringify({ auki, akseli: r?.akseli, sitova: p(r?.sitova, 4) }));
  await ctx.close();
}

/* I: Kreikan ankkurit pois → väitteen 9 on kaaduttava (erä 18). */
vastakoe = 'I';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 1400, korkeus: 900, save: tallenneGRC });
  const m = auki ? await mittaa(sivu) : null;
  const kalusteet = auki ? await kartanKalusteet(sivu) : [];
  const nostot = kalusteet.filter((k) => k.laji === '.pallolauta-nosto');
  const lahin = nostot.length ? Math.min(...nostot.map((k) => k.x0)) : null;
  const rako = m?.kortti && lahin !== null ? lahin - m.kortti.x1 : null;
  const kaatui = !(rako !== null && rako >= NOSTON_RAKO);
  tieto('vastakoe I (Kreikan ankkurit pois → eteläreuna, Kreetan alle)',
    `keskiylä ${p(m?.mitat?.lat, 3)} N / ${p(m?.mitat?.lng, 3)} E, kortti x `
    + `${p(m?.kortti?.x0, 1)}…${p(m?.kortti?.x1, 1)}, lähin nosto x ${p(lahin, 1)}, `
    + `rako ${p(rako, 1)} px → väite 9 ${kaatui ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  kumottu('VASTAKOE I: ilman Kreikan ankkuria paneeli ei ole nostojen vasemmalla puolella',
    Boolean(auki && m?.kortti) && kaatui, JSON.stringify({ auki, rako: p(rako, 1) }));
  await ctx.close();
}

/* J: eleiden pysäytys takaisin → väitteen 10 on kaaduttava (erä 18). */
vastakoe = 'J';
{
  const { ctx, sivu, auki } = await avaaPeli({ leveys: 1400, korkeus: 900, save: tallenneGRC });
  const m = auki ? await mittaa(sivu) : null;
  let paneeli = null;
  if (auki && m?.kortti) {
    paneeli = await rullaa(sivu, Math.round(m.kotelo.x0 + (m.kortti.x0 + m.kortti.x1) / 2),
      Math.round(m.kotelo.y0 + (m.kortti.y0 + m.kortti.y1) / 2));
  }
  const kaatui = !(paneeli && kymmenen?.kartta > 0
    && Math.abs(paneeli.muutos / kymmenen.kartta - 1) <= 0.10);
  tieto('vastakoe J (stopPropagation ja pointer-events: auto takaisin)',
    `ctrl-rulla paneelin päällä muutti korkeutta ${p(paneeli?.muutos, 5)} `
    + `(kartan päällä mitattu ${p(kymmenen?.kartta, 5)}) → väite 10 `
    + `${kaatui ? 'PUNAINEN' : 'LÄPI (paha)'}`);
  vaadi('VASTAKOE J: eleiden pysäytyksellä zoomi ei mene paneelin läpi',
    Boolean(auki && paneeli) && kaatui,
    JSON.stringify({ auki, paneeli: p(paneeli?.muutos, 5), kartta: p(kymmenen?.kartta, 5) }));
  await ctx.close();
}

vastakoe = null;

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
