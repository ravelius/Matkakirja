/*
 * PALLOLAUDAN NIMET — kaupunkien nimet elävinä tekstielementteinä
 * pallon päällä (vaihe 3, docs/moduulit/karttapallo.md luku 4.2 ja 7).
 *
 * OMISTAJAN VASTAUS 5.9.2026 (Raamattu, KYSYMYSKORTIT AINA, sanatarkasti):
 * *"kaupunkien nimet pallolaudalla ELAVINA tekstielementteina laattojen
 * paalla (kuten Google Earth: kuva laatoissa, nimet ja rajat elavina),
 * laatoissa lisaksi poltettuina varana"*.
 *
 * ── LADONTA ON LAUDAN OMA, RUUTUAVARUUDESSA ────────────────────────
 *
 * Tasokartan nimikerros (js/karttanimet.js) latoo nimet ruudun
 * pikseleissä — nimi on paperivakio — ja sama sääntö on tuotu tänne
 * yhtenä funktiona (ladoRuutunimet): laudan oma asettelu (la/lx/ly)
 * ensin, pelimerkin väistökehä, tavanomaiset paikat, kartografin kehä,
 * liuku. Pallolla piste on jo projisoitu ruudulle (getScreenCoords),
 * ja siitä eteenpäin kaikki on täsmälleen sama mitta kuin kartalla.
 *
 * KATTO 40 JA PISTE VAIN NIMEN KANSSA. Elementit ovat CSS2D-solmuja,
 * joiden paikan kirjasto laskee joka kehys (karttapallo.md luku 6), joten
 * nimiä on enintään NIMIEN_KATTO; ehdokkaat tulevat tärkeysjärjestyksessä
 * (pelaajan kaupunki, lähtökaupunki, lentokenttä, reittisolmun aste,
 * lähin ruudun keskipistettä), ja vähäisimmät putoavat. Pudonnut
 * kaupunki ei saa pistettäkään (omistaja 31.8.2026: *"Pelkkiä pisteitä
 * ei saa näkyä"*) — js/pallolauta/lauta.js lukee nimettyjen joukon tästä
 * ja antaa pistekerrokselle vain sen.
 *
 * LADONTA AJETAAN MYÖS LIIKKEEN AIKANA (js/pallolauta/lauta.js LADONTA
 * KULKEE MUKANA, EI ODOTA LIIKKEEN LOPPUA; enintään kerran
 * LADONNAN_TAHTI_MS = 200 ms:ssä). Nimi seuraa pistettään CSS2D:n
 * mukana, mutta LADOTTU PAIKKA PISTEEN SUHTEEN LUKITAAN — ks.
 * NIMIKYLTTI ON KIINNI KAUPUNGISSA alla.
 *
 * ══════════════════════════════════════════════════════════════════
 * NIMIKYLTTI ON KIINNI KAUPUNGISSA, EI RUUDUSSA (omistaja 14.9.2026,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 12 kohta 1, sanatarkasti:
 * *"Pariisin nimikyltti liikkuu panoroitaessa. sen pitaa pysya
 * paikallaan."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * JUURISYY ON TÖRMÄYKSENVÄLTTELY, EI ANKKURI. Nimen CSS2D-solmu on
 * kaupungin omassa pallopisteessä, joten ankkuri ei liiku. Liikkui
 * SIJOITUS: `ladoRuutunimet` laskee kyljen ja siirron (dx, dy, ank)
 * joka ladonnalla uudestaan, ja koska ladonta ajetaan viisi kertaa
 * sekunnissa panoroinnin aikana, sama nimi vaihtoi kylkeä kesken
 * vedon sitä mukaa kuin naapurusto ruudulla muuttui. Mitattu
 * Chromiumilla 14.9.2026 (390 × 844 dpr 2, Pariisi, veto 200 px):
 * ks. docs/raportit/viesti-fable-nimet-merkit-20260914.md.
 *
 * LÄÄKE ON TEHTÄVÄNANNON OMA: laske sijoitus KERRAN, kun nimi
 * ilmestyy, ja LUKITSE se pisteen suhteen niin kauan kuin nimi pysyy
 * ladottuna eikä zoomi muuta sen mittoja. Lukko vapautuu, kun nimi
 * putoaa ladonnasta (reunalta, budjetista tai näkyvistä) — silloin
 * paluu on uusi saapuminen ja paikka lasketaan taas kerran.
 *
 * KOKO ON OSA LUKKOA. `kokoKerroin` ja `pisteSade` tulevat kameran
 * korkeudesta (lauta.js kohdekaupunginMitat), joten ne eivät muutu
 * panoroitaessa mutta muuttuvat zoomatessa.
 *
 * Näin 261 nimen mitat eivät myöskään maksa kehystä (karttapallo.md
 * riski 4): ladonta on yhä sama kertaluokka, vain sen TULOS pysyy.
 *
 * ══════════════════════════════════════════════════════════════════
 * ZOOMI EI SAA VAIHTAA KYLTIN PUOLTA (omistaja 15.9.2026, Raamattu
 * KARTTAUUDISTUKSEN PAATOKSET 24, sanatarkasti: *"pariisi ja muut
 * kaupungintekstit liikkuva ja hyppivat zoomatessa. saisiko ne
 * rauhoitettua paikoilleen? koko voi muuttua. mutta nyt ne hyppivat
 * eri puolille kaupungin merkkia. pitaisi pysya samassa kohdassa."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * ENSIMMÄINEN LUKKO PITI VAIN PANOROINNIN YLI. Lukko oli voimassa
 * täsmälleen samoilla mitoilla (`kerroin`, `sade`), ja zoomi muuttaa
 * molempia — silloin lukko purkautui ja `ladoRuutunimet` valitsi
 * kyljen uudestaan sen mukaan, mitä naapurustossa sattui olemaan
 * ruudulla. MITATTU Chromiumilla 15.9.2026 (1400 × 900, Ranskan
 * saapumisnäkymä ja neljä porrasta sisään; kyltin keskipisteen suunta
 * kaupungin omasta pallopisteestä): Alpit 56,7° → 51,4° → 46,1° eli
 * 10,6 asteen heitto, ja etäisyys tekstikorkeuteen suhteutettuna
 * 6,23 → 4,61 → 3,54 (56 %). Marseille 48,2° → 40,7° (7,5°). Juuri se
 * on omistajan näkemä hyppy.
 *
 * LÄÄKE: ZOOMI SKAALAA LUKON, EI PURA SITÄ. Sijoitus on kokonaan
 * kirjasinkoon mitta (ehdokkaiden dx, dy ja laatikko lasketaan
 * `koko`-luvusta, js/karttanimet.js sijoitaKaupunginNimi), joten sama
 * ehdokas uudella kertoimella on täsmälleen vanha sijoitus kerrottuna
 * kertoimien suhteella. Lukkoa ei siis tarvitse purkaa: se kerrotaan
 * suhteella, jolloin KYLKI JA SUUNTA PYSYVÄT ja vain koko muuttuu —
 * juuri se, mitä omistaja pyytää (*"koko voi muuttua"*). Lukko
 * purkautuu yhä samoista syistä kuin ennenkin: nimi katoaa näkyvistä,
 * tai ruudun reuna ei anna sille tilaa.
 *
 * PUOLI VALITAAN KERRAN KAUPUNGILLE. Lukko on kaupungin oma, ja
 * ensimmäinen laskenta ratkaisee puolen — lukko vain kantaa sen
 * zoomista toiseen. Jotta myös se ensimmäinen laskenta antaisi saman
 * puolen zoomista riippumatta, laudan käsin hiottu asettelu (lx/ly) ja
 * sivuehdokkaiden vähimmäisetäisyys skaalautuvat kirjasinkoon mukana
 * (js/karttanimet.js EHDOKASKEHÄ ON KARTAN MITTA): ehdokaskuvio on
 * silloin sama joka zoomilla, vain suurempana.
 *
 * ILMESTYMINEN JA POISTUMINEN ANIMOIDAAN merkkirekisterissä
 * (js/pallolauta/merkit.js): sisään häivytys, ulos häivytys, siirto
 * pisteestä uuteen paikkaan CSS-siirtymällä (asetteleNimi).
 */

import {
  KARTTANIMI_FONTTI, karttanimienKaupungit, ladoRuutunimet,
} from '../karttanimet.js';

/** Nimiä pallolla enintään kerrallaan (karttapallo.md luku 6). */
export const NIMIEN_KATTO = 40;
/*
 * ══════════════════════════════════════════════════════════════════
 * NIMIBUDJETTI ZOOMTASON MUKAAN (omistaja 12.9.2026, sanatarkasti:
 * *"Kaupunki tekstejä on liikaa näkyvillä uloimmilla zoom tasoilla
 * koska ne joutuvat panoroitaessa väistelemään toisiaan ja silloin
 * tekstit hyppivät eri paikkoihin"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN DIAGNOOSI ON JUURISYY, EI OIRE. Kun nimiöitä on enemmän
 * kuin ruudulle mahtuu, ladonta joutuu väistämään, ja väistöpäätös
 * riippuu siitä, missä kamera sattuu olemaan — sama nimi vaihtaa
 * kylkeä panoroitaessa. Lääke ei ole tasoittaa hyppyä vaan latoa niin
 * harvaan, ettei väistöä juuri tarvita.
 *
 * MITATTU (Chromium 390 × 844 dpr 2, neljä pientä panorointiaskelta,
 * väistö = nimen kyljen tai siirron vaihtuminen; budjetti : nimiä /
 * väistöjä):
 *
 *   näkymän korkeus  ehdokkaita   6     10    14    20    30    40
 *   133,6°           139          2     4     4     5     10    14
 *    85,5°            63          1     1     2     2     2      3
 *    53,4°            21          0     0     0     1     1      1
 *    32,1°            11          0     0     0     0     0      0
 *
 * Eli ladonta on vakaa, kun nimiä on enintään noin neljätoista, ja
 * uloimmilla tasoilla vähemmän. Vanha kiinteä 40 oli lähikuvassa
 * harmiton (ehdokkaita on vain kourallinen) mutta maailmanmitassa
 * kolminkertainen siihen, mikä mahtuu.
 *
 * SÄÄNTÖ ON PORTAATON JA SAMAA MUOTOA KUIN PISTEEN KOKO: budjetti on
 * kääntäen verrannollinen näkymän korkeuteen, eli nimiä on karkeasti
 * VAKIO MÄÄRÄ KARTAN PINTA-ALAA KOHDEN. Vertailukorkeus on pelin oma
 * saapumisnäkymä (mitattu 19,8°, pyöristettynä 20°), jossa budjetti on
 * täysi 40 — siellä peliä pelataan, eikä siihen kosketa. Ulospäin:
 *
 *   32,1° → 25    53,4° → 15    85,5° →  9
 *   40,1° → 20    64,1° → 12   133,6° →  6 (lattia)
 *
 * Lattia NIMIEN_VAHIN on kuusi: koko maailman mitassa ruudulla on yhä
 * puolisen tusinaa suurinta kaupunkia, jotta kartta ei ole mykkä.
 *
 * NÄKYMÄN KORKEUS, EI LEVEYS — sama perustelu kuin nostojen porteilla
 * (js/pallolauta/nostot.js): kameran pystykulma on kiinteä, joten
 * korkeus asteina on sama luku puhelimella ja työpöydällä, kun taas
 * leveys riippuu ruudun kuvasuhteesta.
 */
/** Näkymän korkeus asteina, jossa nimibudjetti on täysi (saapumisnäkymä). */
export const NIMIBUDJETIN_KORKEUS = 20;
/** Nimiä vähintään, vaikka koko maailma olisi ruudulla. */
export const NIMIEN_VAHIN = 6;
/**
 * Nimibudjetti näkymän korkeudesta (asteina). Portaaton ja kasvava
 * sisäänpäin zoomatessa; tuntematon näkymä saa lattian.
 *
 * @param {number} korkeusAst näkymän korkeus asteina
 */
export function nimibudjetti(korkeusAst) {
  if (!(korkeusAst > 0)) return NIMIEN_VAHIN;
  const luku = Math.round(NIMIEN_KATTO * (NIMIBUDJETIN_KORKEUS / korkeusAst));
  return Math.min(NIMIEN_KATTO, Math.max(NIMIEN_VAHIN, luku));
}
/*
 * NIMI EI SAA LEIKKAUTUA RUUDUN REUNASTA (sama vikailmoitus: kuvassa
 * SHANGHAI, HONGKONG, MANILA, DARWIN ja ADELAIDE ovat puoliksi
 * ruudun ulkopuolella).
 *
 * Reunavara oli +40 px eli nimi ladottiin, vaikka kaupungin piste oli
 * neljäkymmentä pikseliä RUUDUN ULKOPUOLELLA — silloin teksti on
 * väistämättä katkaistu. Nyt pisteen on oltava ruudulla (0), ja lisäksi
 * ladottu nimi pudotetaan, jos sen laatikko ei mahdu kokonaan ruutuun
 * (ks. lado). Jälkimmäinen on se tarkka sääntö: nimi piirtyy pisteen
 * kyljelle, joten pelkkä pisteen sijainti ei kerro, mahtuuko teksti.
 */
export const NIMEN_REUNAVARA_PX = 0;
/** Kuinka monta pikseliä nimi saa ylittää ruudun reunan ennen pudotusta. */
export /**
 * Pelimerkin varauksen lisävara ruutupikseleinä (ks. PELIMERKIN
 * VARAUS ON PAKSUMPI KUIN SEN KUVA). 4 px kattaa nimen elementin ja
 * sen kirjasinmitan eron puhelimen 8,5–11,5 px:n kirjasimilla.
 */
const PELIMERKIN_VARA_PX = 4;

const NIMEN_REUNAN_SIETO_PX = 1;
/** Pelaajan oma kaupunki voittaa kaikki muut ehdokkaat. */
const OMAN_KAUPUNGIN_TARKEYS = 1000;

/*
 * ══════════════════════════════════════════════════════════════════
 * NIMIKYLTIT KARTTAAN (omistajan päätös kysymyskortilla 14.9.2026 klo
 * 15.05 UTC; Raamattu KARTTAUUDISTUKSEN PAATOKSET 2: staattinen
 * käsinpiirretty kartta, jonka elementit *"skaalautuvat zoomatessa kuin
 * painettu kartta"*)
 * ══════════════════════════════════════════════════════════════════
 *
 * ENNEN nimikyltti oli RUUTUVAKIO: `KARTTANIMI_KOOT` on css-pikseleitä,
 * eli sama 13,5 px joka zoomilla — teksti liukui kartan päällä, kun
 * kartta kasvoi allansa. Nyt se on KARTAN MITTA, täsmälleen samalla
 * säännöllä kuin maapaneeli (js/pallolauta/maapaneeli.js `skaala`):
 * ruutukoko = peruskoko × (px lautayksikköä kohden nyt) / (px
 * lautayksikköä kohden vertailunäkymässä).
 *
 * VERTAILUNÄKYMÄ ON KUNKIN LAITTEEN OMA SAAPUMINEN (Fablen päätös
 * 14.9.2026 illalla). Ensimmäinen toteutus käytti YHTÄ vertailua
 * (työpöydän 1400 × 900), ja mittaus näytti heti, miksi se ei käy:
 * sama maa sovitetaan 373 px:n ja 1400 px:n ruutuun, joten puhelimella
 * yksi lautayksikkö on 0,655 px ja työpöydällä 1,837 px. Yhteinen
 * vertailu olisi kutistanut puhelimen saapumiskyltin 15 pikselistä
 * 5,4 pikseliin — lukukelvottomaksi, ja vastoin Raamatun PAATOKSET
 * 2:n lausetta *"tekstin luettavuus mitoitetaan uloimmalle zoomille"*.
 *
 * MITATTU Chromiumilla 14.9.2026 (dpr 2, tallenne Pariisissa,
 * `kamera.nakyvaAlue().skaala`), saapumisnäkymä:
 *
 *   ruutu        korkeus   skaala (px / lautayksikkö)   kerroin
 *   390 × 844    0,6641    0,6552                       1,000
 *   1400 × 900   0,2509    1,8370                       1,000
 *   2560 × 1352  0,2509    2,8483                       1,000
 *
 * Saapuminen on samalla ULOIN SALLITTU näkymä (uloszoomauksen esto,
 * js/pallolauta/lauta.js `maanZoomiraja`), joten vertailu on juuri se
 * zoomi, jolle luettavuus mitoitetaan — ja sisäänpäin kyltti kasvaa
 * kartan mukana. Lauta laskee vertailun sieltä ja antaa sen ladonnalle;
 * ilman sitä (kehittäjän maailmanäkymä, laatikko lataamatta) käytetään
 * mitattua työpöytävakiota, jolloin käytös on entinen.
 *
 * Rajat ovat samat kuin maapaneelilla eivätkä sido pelialueella: ne
 * ovat kehittäjän rajattoman maailmanäkymän varalla.
 */
/** Vertailuskaalan varamitta, kun laudan omaa ei ole (mitattu 1400 × 900). */
export const NIMEN_VERTAILUSKAALA = 1.837;
/*
 * Rajat eivät saa sitoa pelialueella (Fablen ohje 14.9.2026: *"ei
 * rajoja pelialueella"*). Alaraja on siksi 0,20 eikä maapaneelin 0,45:
 * puhelimen saapumisnäkymä antaa MITATUN kertoimen 0,357, ja 0,45
 * olisi leikannut juuri sen. Yläraja on maapaneelin 64.
 */
export const NIMEN_KARTTAKERROIN_MIN = 0.2;
export const NIMEN_KARTTAKERROIN_MAX = 64;
/** Kertoimen porras (suhteellinen), ks. nimenKarttakerroin. */
export const NIMEN_KERTOIMEN_PORRAS = 1.005;
/**
 * Nimikyltin kokokerroin kartan mittakaavasta (px / lautayksikkö).
 * Tuntematon mittakaava palauttaa 1 eli entisen ruutuvakion.
 *
 * @param {number} skaala `kamera.nakyvaAlue().skaala`
 * @param {number} [vertailu] saapumisnäkymän skaala tällä laitteella
 */
export function nimenKarttakerroin(skaala, vertailu = NIMEN_VERTAILUSKAALA) {
  if (!(skaala > 0)) return 1;
  const perus = vertailu > 0 ? vertailu : NIMEN_VERTAILUSKAALA;
  const raaka = Math.min(NIMEN_KARTTAKERROIN_MAX,
    Math.max(NIMEN_KARTTAKERROIN_MIN, skaala / perus));
  /*
   * KERROIN PORRASTETAAN, KOSKA LUKKO VERTAA SITÄ TÄSMÄLLEEN.
   * Kirjaston kamera kirjoittaa korkeuden liukulukuna, ja panoroinnin
   * aikana sen viimeiset bitit heiluvat, vaikka zoomi ei muutu. Ilman
   * porrasta kerroin oli joka ladonnalla eri luku, sijoituslukko
   * (NIMIKYLTTI ON KIINNI KAUPUNGISSA) purkautui joka kerta, ja kyltti
   * hyppi täsmälleen kuten ennen korjausta — mitattu Chromiumilla
   * 14.9.2026: työpöydällä kyltti liikkui 40,5 px yhden vedon yli.
   *
   * Porras on SUHTEELLINEN puoli prosenttia: silmälle näkymätön
   * (13,5 px → 13,57 px) mutta moninkertainen kameran heilahdukseen
   * nähden, ja sama zoomitaso antaa aina saman luvun.
   */
  return NIMEN_KERTOIMEN_PORRAS
    ** Math.round(Math.log(raaka) / Math.log(NIMEN_KERTOIMEN_PORRAS));
}

const SVG = 'http://www.w3.org/2000/svg';

/**
 * Nimen elementti: pieni svg pisteen kohdalla, sisällä siirtoryhmä ja
 * tasokartan omilla luokilla tyylittyvä teksti (.karttanimi
 * .karttanimi-kaupunki: kirjasin, muste). Osumaa ei ole — nimen
 * napautus on kaupungin napautus, ja sen ratkaisee pallon oma
 * osumatesti (js/pallolauta/lauta.js).
 */
export function nimiElementti(d) {
  const el = document.createElement('div');
  el.className = 'pallolauta-nimi';
  el.dataset.kaupunki = d.id;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '1');
  svg.setAttribute('height', '1');
  svg.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(SVG, 'g');
  g.setAttribute('class', 'pallolauta-nimi-siirto');
  const teksti = document.createElementNS(SVG, 'text');
  teksti.setAttribute('class', 'karttanimi karttanimi-kaupunki');
  teksti.style.fontFamily = KARTTANIMI_FONTTI;
  g.appendChild(teksti);
  svg.appendChild(g);
  el.appendChild(svg);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', d.teksti);
  return el;
}

/** Nimen sisäasettelu datumin mitoista (siirtymä, koko, asu). */
export function asetteleNimi(el, d) {
  const g = el.querySelector('.pallolauta-nimi-siirto');
  const teksti = el.querySelector('text');
  if (!g || !teksti) return;
  g.style.transform = `translate(${d.dx.toFixed(2)}px, ${d.dy.toFixed(2)}px)`;
  teksti.setAttribute('font-size', String(d.koko));
  teksti.setAttribute('text-anchor', d.ank);
  if (d.tyylitys) teksti.setAttribute('font-variant', d.tyylitys);
  else teksti.removeAttribute('font-variant');
  if (d.vali) teksti.setAttribute('letter-spacing', String(d.vali));
  else teksti.removeAttribute('letter-spacing');
  if (teksti.textContent !== d.teksti) teksti.textContent = d.teksti;
}

/**
 * Nimikerros pallolle. `ruudulla(lat, lng, vara)` (js/pallolauta/lauta.js)
 * antaa pisteen kotelon pikseleinä tai null, jos piste on pallon takana
 * tai ruudun ulkopuolella; `merkit` on merkkirekisteri (osa `nimet`).
 */
export function luoNimet({
  ui, merkit, asteet, ruudulla, kotelo, pack = null,
}) {
  let kaupungit = null; // [{ c, lat, lng }] laudan ladontatietue + asteet
  let nimetyt = new Set();
  let laatikot = [];
  let osumat = [];
  let tulos = { nimia: 0, pudotettu: 0, ehdokkaita: 0 };
  /*
   * LUKITUT SIJOITUKSET (ks. NIMIKYLTTI ON KIINNI KAUPUNGISSA):
   * id → { dx, dy, ank, koko, tyylitys, vali, kerroin, sade, rs },
   * missä `rs` on ladottu laatikko PISTEEN SUHTEEN. Vain edellisellä
   * ladonnalla selvinneet nimet ovat mukana, joten pudonnut nimi saa
   * palatessaan uuden sijoituksen.
   */
  let lukitut = new Map();

  /*
   * LAUTA TULEE PALLOLTA EIKÄ PELISTÄ (aalto 3A). Aineisto ladotaan
   * kerran ja jää muistiin, ja lähtövalinnassa (pickstart) pelin lauta
   * on vielä aloitusnäytön oma — eri koordinaatistossa kuin pallo.
   * `pack` on pallon oma lauta (js/pallolauta/lauta.js), jolloin
   * välimuistiin ei voi jäädä väärän laudan pisteitä.
   */
  const aineisto = () => {
    if (kaupungit) return kaupungit;
    kaupungit = karttanimienKaupungit(pack ?? ui.game.pack).map((c) => {
      const a = asteet(c);
      return a ? { c, lat: a.lat, lng: a.lon } : null;
    }).filter(Boolean);
    return kaupungit;
  };

  /**
   * Latoo näkyvät nimet. `varaukset` ovat muun musteen laatikot
   * (elävät nostot), `pinot` pelimerkkien laatikot (nappula, kohteet),
   * kumpikin kotelon pikseleinä; `katto` on tämän ladonnan nimibudjetti.
   *
   * `vain` rajaa ehdokkaat annettuihin kaupunkeihin. Sitä käyttää
   * AVAUSLENTO (js/pallolauta/avaus.js): omistaja 3.9.2026 sanatarkasti
   * *"muiden kaupunkien kuin lontoon ja kohdekaupungin nimiä ei
   * tarvita"* — sama sääntö kuin tasokartan lentotilassa
   * (js/karttanimet.js), vain eri kerroksessa.
   */
  /*
   * `kokoKerroin` ja `pisteSade` tulevat laudalta (js/pallolauta/lauta.js
   * kohdekaupunginMitat, omistaja 8.9.2026: *"tee samoin myös
   * kohdekaupungin tekstille joka jää lähellä liian pieneksi"*).
   * Lähikuvassa nimi on suurempi ja piste leveämpi, ja ladonnan on
   * tiedettävä molemmat: sama laatikko mittaa nimen, väistön ja
   * nostolappujen sovittelun.
   */
  const lado = ({
    varaukset = [], pinot = [], katto = NIMIEN_KATTO, vain = null,
    kokoKerroin: kaupunginKerroin = 1, pisteSade = 0,
    karttaskaala = 0, vertailuskaala = 0,
  } = {}) => {
    // Kyltti on kartan mitta, ei ruudun (ks. NIMIKYLTIT KARTTAAN).
    const kokoKerroin = kaupunginKerroin
      * nimenKarttakerroin(karttaskaala, vertailuskaala || NIMEN_VERTAILUSKAALA);
    const w = kotelo.clientWidth;
    const h = kotelo.clientHeight;
    if (!(w > 0) || !(h > 0) || ui.dead) return tulos;
    const oma = ui.game.cityOf?.()?.id ?? null;
    const ehdokkaat = [];
    for (const k of aineisto()) {
      if (vain && !vain.has(k.c.id)) continue;
      const p = ruudulla(k.lat, k.lng, NIMEN_REUNAVARA_PX);
      if (!p) continue;
      ehdokkaat.push({
        c: k.c,
        x: p.x,
        y: p.y,
        lat: k.lat,
        lng: k.lng,
        tarkeys: k.c.tarkeys + (k.c.id === oma ? OMAN_KAUPUNGIN_TARKEYS : 0),
      });
    }
    /*
     * VALINTA ON KAUPUNGIN OMA, EI KAMERAN (omistaja 12.9.2026, ks.
     * NIMIBUDJETTI ZOOMTASON MUKAAN). Järjestys oli ennen `tarkeys`,
     * sitten LÄHIN RUUDUN KESKIPISTETTÄ — ja koska `tarkeys` katkaisee
     * reittiasteen kolmeen, tasapelijoukot ovat isoja ja budjetin
     * leikkaus osui juuri niihin: sama kaupunki putosi ja palasi sen
     * mukaan, mihin suuntaan karttaa liikutti. Nyt tasapelin ratkaisee
     * kaupungin oma reittiaste ja viime kädessä nimi — kummallakaan ei
     * ole mitään tekemistä kameran kanssa, joten sama näkymä antaa
     * aina saman joukon riippumatta siitä, mistä suunnasta sinne
     * tullaan.
     */
    ehdokkaat.sort((a, b) => (b.tarkeys - a.tarkeys)
      || ((b.c.aste ?? 0) - (a.c.aste ?? 0))
      || (a.c.nimi < b.c.nimi ? -1 : 1));
    /*
     * ── PELIMERKIN VARAUS ON PAKSUMPI KUIN SEN KUVA ────────────────
     * (PAATOKSET 32 kohta 5; mitattu 17.9.2026 Macilla,
     * tools/savukkeet/mittaa-nostoankkurit.mjs vartio 5: PARIISI jäi
     * nappulan päälle saapumisessa ja välizoomissa, vaikka ladonta
     * varaa nappulan `pinot`-listasta ENNEN ensimmäistäkään nimeä.)
     *
     * LADONTA MITTAA TEKSTIN KIRJASINMITOISTA (kork = koko × 1,15,
     * laatikko −0,62…+0,42 × kork perusviivasta), mutta ruudulla
     * nimen elementti on sitä KORKEAMPI: rivinkorkeus, ylä- ja
     * alapidennykset sekä harvennuksen viimeinen väli jäävät mitan
     * ulkopuolelle. Nimi asettui siis nappulan kylkeen juuri kiinni
     * (NIMION_RAKO 3 px) ja levisi silti sen päälle.
     *
     * Vara annetaan VARAUKSEEN eikä tekstin mittaan, koska tekstin
     * mitta on sama luku kaikkialla (poltto, laatikko, osumapinta) —
     * pelimerkki taas on ainoa este, joka ei voi väistää, joten sen
     * ympärille kuuluu rako.
     */
    const pinotVaralla = pinot.filter(Boolean).map((r) => ({
      ...r,
      x0: r.x0 - PELIMERKIN_VARA_PX,
      y0: r.y0 - PELIMERKIN_VARA_PX,
      x1: r.x1 + PELIMERKIN_VARA_PX,
      y1: r.y1 + PELIMERKIN_VARA_PX,
    }));
    const ladottu = ladoRuutunimet(ehdokkaat, {
      varaukset, pinot: pinotVaralla, katto, kokoKerroin, pisteSade, ruutu: { w, h },
    });
    /*
     * REUNASTA LEIKKAUTUVA NIMI PUDOTETAAN (ks. NIMI EI SAA LEIKKAUTUA
     * RUUDUN REUNASTA): nimi piirtyy pisteen kyljelle, joten vasta
     * ladottu laatikko kertoo, mahtuuko teksti ruutuun.
     */
    const mahtuu = (r) => !r || (r.x0 >= -NIMEN_REUNAN_SIETO_PX
      && r.y0 >= -NIMEN_REUNAN_SIETO_PX
      && r.x1 <= w + NIMEN_REUNAN_SIETO_PX
      && r.y1 <= h + NIMEN_REUNAN_SIETO_PX);
    /*
     * LUKKO ENNEN REUNAPUDOTUSTA (ks. NIMIKYLTTI ON KIINNI
     * KAUPUNGISSA): reunasääntö mittaa sen laatikon, joka oikeasti
     * piirtyy, joten lukitun nimen on oltava paikallaan jo tässä.
     *
     * RUUDUN REUNA PURKAA LUKON. Jos lukittu kylki työntäisi nimen
     * ruudun ulkopuolelle, nimi PUTOAISI kokonaan — sivuttain vaihtuva
     * kyltti on pienempi paha kuin katoava. Reunalla siis vaihdetaan
     * kylkeä kuten ennenkin (mitattu 14.9.2026: ilman tätä Pariisi
     * katosi kesken vedon, kun sen laatikko osui ruudun laitaan), ja
     * uusi sijoitus lukitaan tilalle.
     */
    const paikat = new Map(ehdokkaat.map((e) => [e.c, e]));
    const nakyvat = new Set(ehdokkaat.map((e) => e.c.id));
    /*
     * LUKKO TÄMÄN LADONNAN MITOISSA (ks. ZOOMI EI SAA VAIHTAA KYLTIN
     * PUOLTA). Sama ehdokas eri kirjasinkoolla on vanha sijoitus
     * kerrottuna kertoimien suhteella, joten zoomi vain skaalaa lukon
     * — kylki, suunta ja tekstikorkeuteen suhteutettu etäisyys pysyvät
     * täsmälleen samoina.
     */
    const skaalattuLukko = (lukko) => {
      if (!lukko) return null;
      if (lukko.kerroin === kokoKerroin) return lukko;
      if (!(lukko.kerroin > 0) || !(kokoKerroin > 0)) return null;
      const s = kokoKerroin / lukko.kerroin;
      const rs = lukko.rs ? {
        dx0: lukko.rs.dx0 * s,
        dy0: lukko.rs.dy0 * s,
        dx1: lukko.rs.dx1 * s,
        dy1: lukko.rs.dy1 * s,
      } : null;
      return {
        dx: lukko.dx * s,
        dy: lukko.dy * s,
        ank: lukko.ank,
        koko: lukko.koko * s,
        tyylitys: lukko.tyylitys,
        vali: Number.isFinite(lukko.vali) ? lukko.vali * s : lukko.vali,
        kerroin: kokoKerroin,
        sade: pisteSade,
        rs,
      };
    };
    /** Lukon laatikko nykyisessä ruutupisteessä, tai null. */
    const lukonLaatikko = (id, e) => {
      const lukko = skaalattuLukko(lukitut.get(id));
      if (!e || !lukko || !lukko.rs) return null;
      return {
        x0: e.x + lukko.rs.dx0,
        y0: e.y + lukko.rs.dy0,
        x1: e.x + lukko.rs.dx1,
        y1: e.y + lukko.rs.dy1,
      };
    };
    const asetaLukko = (n, lukko, r) => {
      n.dx = lukko.dx;
      n.dy = lukko.dy;
      n.ank = lukko.ank;
      n.koko = lukko.koko;
      n.tyylitys = lukko.tyylitys;
      n.vali = lukko.vali;
      n.r = r ?? n.r;
    };
    const leikkaa = (a, b) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
    /*
     * ── PELINAPPULA ON KOVA ESTE MYÖS KAUPUNGIN OMALLE NIMELLE ─────
     * (omistaja 17.9.2026, Raamattu KARTTAUUDISTUKSEN PAATOKSET 32
     * kohta 5 ja TARKENNUS 2: *"yksikään nimiö ei saa olla toisen
     * nimiön, merkin, kaupungin nimen tai pelinappulan päällä millään
     * zoomilla"*; ankkurierän mittaus PR #2565 jätti PARIISI-nimen
     * nappulan päälle saapumisessa ja välizoomissa.)
     *
     * JUURISYY EI OLLUT LADONNASSA VAAN LUKOSSA. `ladoRuutunimet` saa
     * pelimerkit `pinot`-listassa ja VARAA ne ennen ensimmäistäkään
     * nimeä, joten tuore sijoitus väistää nappulan oikein. Lukko (ks.
     * ZOOMI EI SAA VAIHTAA KYLTIN PUOLTA) palautti nimen kuitenkin
     * vanhaan paikkaansa PELKÄN RUUTUEHDON (`mahtuu`) nojalla — ja kun
     * pelaaja saapuu kaupunkiin, nappula ilmestyy nimen alle sen
     * jälkeen, kun lukko on jo otettu. Nimi jäi siis lukkonsa vuoksi
     * nappulan päälle, vaikka ladonta oli juuri siirtänyt sen pois.
     *
     * Ehto on sama kuin pudonneen nimen paluulla kymmenen riviä
     * alempana (`[...varaukset, ...pinot]`), mutta VAIN pelimerkeille:
     * muu muste (nostot, turisti-info) on jo tämän ajon varauksissa,
     * ja jos lukko purkautuisi niistäkin, kyltti vaihtaisi puolta joka
     * kerta kun nosto liukuu sen viereen — juuri se, minkä PAATOKSET
     * 24 kieltää. Lukon purkautuessa nimi ladotaan kerran uudelleen ja
     * lukitaan uuteen paikkaansa (lukot rakennetaan tämän ajon
     * lopullisista sijoituksista).
     */
    const pinoLaatikot = pinotVaralla.filter((r) => Number.isFinite(r?.x0) && Number.isFinite(r?.y0)
      && Number.isFinite(r?.x1) && Number.isFinite(r?.y1) && r.x1 > r.x0 && r.y1 > r.y0);
    for (const n of ladottu.nimiot) {
      const e = paikat.get(n.c);
      const r = lukonLaatikko(n.c.id, e);
      if (!r || !mahtuu(r)) continue;
      if (pinoLaatikot.some((v) => leikkaa(v, r))) continue;
      asetaLukko(n, skaalattuLukko(lukitut.get(n.c.id)), r);
    }
    /*
     * LUKITTU NIMI EI PUTOA KESKEN VEDON. Ladonta pudottaa nimen, jos
     * sen tuore sijoitus ei mahdu vapaaseen tilaan — ja koska ajo
     * toistuu viisi kertaa sekunnissa, kaupungin nimi vilkkui
     * panoroitaessa (mitattu 14.9.2026: Pariisi katosi ja palasi kahden
     * vedon aikana kahdesti). Jo ladottu nimi on siis KIINTEÄ: se
     * palautetaan omalle lukitulle paikalleen, kun se yhä mahtuu
     * ruutuun eikä osu yhteenkään tämän ajon nimilaatikkoon. Muuten
     * lukko vapautuu ja nimi ladotaan taas kerran.
     */
    {
      const jo = new Set(ladottu.nimiot.map((n) => n.c.id));
      for (const e of ehdokkaat) {
        if (jo.has(e.c.id)) continue;
        const lukko = skaalattuLukko(lukitut.get(e.c.id));
        const r = lukonLaatikko(e.c.id, e);
        if (!lukko || !r || !mahtuu(r)) continue;
        if (ladottu.nimiot.some((n) => n.r && leikkaa(n.r, r))) continue;
        // Muu muste (nostojen ikonit, turisti-info, pelimerkit) liikkuu
        // kartan mukana kuten kaupunkikin, joten tämä ehto ei ailahda
        // panoroitaessa — se vain estää lukitun nimen palaamisen
        // sellaisen päälle, joka on tullut sen paikalle zoomissa.
        if ([...varaukset, ...pinotVaralla].some((v) => leikkaa(v, r))) continue;
        /*
         * BUDJETTI EI SAA SYRJÄYTTÄÄ JO LADOTTUA NIMEÄ. Nimibudjetti
         * (ks. NIMIBUDJETTI ZOOMTASON MUKAAN) on puhelimen
         * saapumisnäkymässä vain kourallinen, ja vedon aikana uusi
         * ehdokas ajoi kartalla jo olevan nimen yli — kaupungin nimi
         * välähti pois ja palasi toiselle kyljelle. Lukitut voittavat:
         * tarvittaessa listalta putoaa sen sijaan vähäisin LUKITSEMATON
         * nimi (ehdokasjärjestys, viimeinen on vähäisin).
         */
        if (ladottu.nimiot.length >= katto) {
          const irti = [...ladottu.nimiot].reverse().find((n) => !lukitut.has(n.c.id));
          if (!irti) continue;
          ladottu.nimiot.splice(ladottu.nimiot.indexOf(irti), 1);
          ladottu.pudotettu += 1;
        }
        const n = { c: e.c, r };
        asetaLukko(n, lukko, r);
        ladottu.nimiot.push(n);
        ladottu.pudotettu = Math.max(0, ladottu.pudotettu - 1);
      }
    }
    const reunalta = ladottu.nimiot.length;
    ladottu.nimiot = ladottu.nimiot.filter((n) => mahtuu(n.r));
    ladottu.pudotettu += reunalta - ladottu.nimiot.length;
    const lukot = new Map();
    const datumit = ladottu.nimiot.map((n) => {
      const e = paikat.get(n.c);
      /*
       * NIMI ON OSA KAUPUNGIN OSUMAPINTAA (omistaja 9.9.2026,
       * sanatarkasti: *"lisäksi kaupungin nimi saisi olla myös
       * klikattavaa aluetta"*). Laatikko talletetaan PISTEEN SUHTEEN
       * (dx0…dy1), koska ladonta ajetaan vain levossa mutta nimi
       * seuraa pistettään CSS2D:n mukana: osumatesti laskee laatikon
       * napautuksen hetken ruutupisteestä (`laatikko(p)`), samalla
       * tavalla kuin noston nimilappu (js/pallolauta/nostot.js
       * `lappu(p)`).
       */
      const r = n.r ?? null;
      const suhde = r && e ? {
        dx0: r.x0 - e.x, dy0: r.y0 - e.y, dx1: r.x1 - e.x, dy1: r.y1 - e.y,
      } : null;
      // Sijoitus lukkoon: seuraava ladonta antaa saman paikan pisteen
      // suhteen niin kauan kuin nimi pysyy ladottuna samoilla mitoilla.
      lukot.set(n.c.id, {
        dx: n.dx,
        dy: n.dy,
        ank: n.ank,
        koko: n.koko,
        tyylitys: n.tyylitys,
        vali: n.vali,
        kerroin: kokoKerroin,
        sade: pisteSade,
        rs: suhde,
      });
      return {
        avain: `nimi:${n.c.id}`,
        laji: 'nimi',
        id: n.c.id,
        teksti: n.c.nimi,
        lat: e.lat,
        lng: e.lng,
        dx: n.dx,
        dy: n.dy,
        ank: n.ank,
        koko: n.koko,
        tyylitys: n.tyylitys,
        vali: n.vali,
        laatikko: n.r,
        // Osumapinta ruutupisteestä p (ks. NIMI ON OSA OSUMAPINTAA).
        osuma: suhde ? (p) => ({
          x0: p.x + suhde.dx0, y0: p.y + suhde.dy0, x1: p.x + suhde.dx1, y1: p.y + suhde.dy1,
        }) : null,
        elementti: nimiElementti,
        asettele: asetteleNimi,
      };
    });
    /*
     * LUKKO SÄILYY YHDEN VÄLIIN JÄÄNEEN LADONNAN YLI. Nimi voi pudota
     * yhdeltä ajolta (esimerkiksi kun uusi nosto ilmestyy sen paikalle)
     * ja palata heti seuraavalla — ja jos lukko hävitettäisiin siinä
     * välissä, paluu olisi UUSI sijoitus ja kyltti hyppäisi. Lukko
     * pidetään siis niin kauan kuin kaupunki on yhä RUUDULLA
     * (`paikat`); vasta näkyvistä poistuminen vapauttaa sen, ja silloin
     * paluu on aidosti uusi saapuminen.
     */
    for (const [id, lukko] of lukitut) {
      if (lukot.has(id) || !nakyvat.has(id)) continue;
      // Talteen tämän ladonnan mitoissa (ks. ZOOMI EI SAA VAIHTAA
      // KYLTIN PUOLTA): näin puoli säilyy myös zoomin yli, vaikka nimi
      // olisi juuri tältä ajolta pudonnut.
      const sovitettu = skaalattuLukko(lukko);
      if (!sovitettu) continue;
      lukot.set(id, sovitettu);
    }
    lukitut = lukot;
    nimetyt = new Set(datumit.map((d) => d.id));
    laatikot = datumit.map((d) => d.laatikko).filter(Boolean);
    osumat = datumit.filter((d) => typeof d.osuma === 'function')
      .map((d) => ({
        id: d.id, lat: d.lat, lng: d.lng, laatikko: d.osuma,
      }));
    merkit.aseta('nimet', datumit);
    tulos = { nimia: datumit.length, pudotettu: ladottu.pudotettu, ehdokkaita: ehdokkaat.length };
    return tulos;
  };

  return {
    lado,
    /**
     * LUKU-API: ladottujen nimien ruutulaatikot kotelon pikseleinä.
     * Nostojen sovittelu (js/pallolauta/sovittelu.js) lukee nämä
     * KIINTEINÄ esteinä — kaupungin nimi on ensisijainen, lappu
     * väistää. Ladonta itse ei lue tätä eikä muutu tästä.
     */
    laatikot: () => laatikot,
    /**
     * OSUMA-API (omistaja 9.9.2026: *"kaupungin nimi saisi olla myös
     * klikattavaa aluetta"*): ladotut nimet osumatestiä varten,
     * `[{ id, lat, lng, laatikko(p) }]`. `laatikko(p)` antaa nimen
     * ruutulaatikon, kun kaupungin piste on ruutupisteessä `p` — sama
     * muoto kuin noston nimilapulla (js/pallolauta/nostot.js
     * `lappu(p)`), jotta molemmat kilpailevat samassa vertailussa
     * (js/pallolauta/lauta.js musteeseenOsunut).
     */
    osumat: () => osumat,
    /** Nimettyjen kaupunkien tunnukset (piste vain nimen kanssa). */
    nimetyt: () => nimetyt,
    nimetty: (id) => nimetyt.has(id),
    /** Viimeisimmän ladonnan luvut (savukkeet). */
    tulos: () => tulos,
    unohda: () => { kaupungit = null; lukitut = new Map(); },
  };
}
