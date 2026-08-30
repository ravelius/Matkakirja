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
 * 3. KAIKKI KOOT OVAT CSS-PIKSELEITÄ, SVG:N YKSIKÖIKSI JAETTUNA.
 *    Kerros elää kartan omassa koordinaatistossa, joten `koko / skaala`
 *    on täsmälleen `koko` pikseliä ruudulla — ja teksti rasteroidaan
 *    laitteen omalla tarkkuudella, ei laatan.
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
import { MAAILMANKARTAN_NIMET } from './packs/maailmankartta-nimet.js';

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
  /*
   * KOHDENIMIÖ SYTTYY SAMALLA KYNNYKSELLÄ KUIN TAVALLISEN KAUPUNGIN
   * NIMI (omistajan päätös 30.8.2026, kysymyskortti: *"Sama ladonta
   * kuin paikannimillä"* — sama koko, sama törmäyksenvältely, samat
   * tiheyskynnykset).
   *
   * Sama luku kuin `nimi` on tässä TARKOITUS eikä sattuma, ja siksi se
   * on oma rivinsä: kohteen nimi on kartalla samaa lajia kuin
   * kaupungin nimi — luettava paikannimi — eikä sen kynnystä saa
   * siirtää vahingossa kaupunkien mukana. Jos kohteita joskus halutaan
   * harvemmaksi tai tiheämmäksi kuin kaupunkeja, muutos tehdään tähän
   * lukuun eikä `nimi`-riviin.
   */
  kohdeNimi: 0.45,
};

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
 * `kohde` on tavallisen kaupungin nimen kokoinen. Se on omistajan
 * päätös 30.8.2026 sanatarkasti (*"sama koko"*), ja se on myös ainoa
 * koko, joka kestää perustelun: kohde on kartalla paikka siinä missä
 * kaupunkikin, ja aiempi 5,8 CSS-pikselin nimiö oli lukukelvoton juuri
 * siksi, ettei se ollut minkään kartan oma mitta vaan merkin oman
 * kutistuksen sivutuote (js/fokuskohteet.js KOHDE_SYMBOLI_SKAALA ×
 * js/fokusnosto-symbolit.js NOSTOSYM_NIMIO_KOKO).
 */
const KOKO = {
  isoKaupunki: 12, kaupunki: 10.5, vuori: 11, jarvi: 10, kohde: 10.5,
};

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
 * Noston viivan paksuus ja katkon mitta CSS-pikseleinä (omistajan
 * pelitesti 30.8.2026: *"tuo katkoviiva saisi olla kevyempi"*).
 *
 * Hiuksenohut kynä ja tiheä katko: nosto johdattaa silmän eikä kilpaile
 * kartan omien viivojen kanssa. Väri ja peittävyys ovat CSS:ssä
 * (.karttanimi-nosto) — tässä on vain se, mikä on mitta.
 */
const NOSTON_VIIVA = 0.5;
const NOSTON_KATKO = 1.6;

/** Merkkien mitat CSS-pikseleinä — samat luvut kuin laatoilla. */
const MERKKI = {
  pisteIso: 2.6, piste: 2.0, rengasIso: 4.6, vuoriIso: 5, vuori: 4,
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
    .map((k) => `${k.teksti}@${k.x.toFixed(1)},${k.y.toFixed(1)}`).join(';')}`;
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

/* ---------------------------------------------------------- mittari */

/*
 * KIRJAIMEN LEVEYS LUETAAN, EI ARVATA (sama sääntö kuin laatoilla).
 * Yksi canvas koko istunnolle: se ei ole DOM:issa eikä piirrä mitään.
 */
let mittari = null;

function tekstinLeveys(teksti, koko, tyylitys) {
  if (!mittari) {
    if (typeof document === 'undefined') return teksti.length * koko * 0.5;
    mittari = document.createElement('canvas').getContext('2d');
  }
  mittari.font = `${tyylitys} ${koko}px ${FONTTI}`.trim();
  return mittari.measureText(teksti).width;
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
 */
function lado(data, px) {
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
  const vapaa = (r) => {
    for (const a of avaimet(r)) {
      for (const o of hila.get(a) ?? []) {
        if (r.x0 < o.x1 && r.x1 > o.x0 && r.y0 < o.y1 && r.y1 > o.y0) return false;
      }
    }
    return true;
  };
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
   */
  const pisteet = [];
  for (const c of data.kaupungit) {
    if (!c.iso && !nakyy(KYNNYS.kaupunkiPiste)) continue;
    if (!nakyy(KYNNYS.isoPiste)) continue;
    const x = c.x * px;
    const y = c.y * px;
    const r = c.iso ? 5.2 : 2.6;
    pisteet.push({ c, x, y });
    merkit.push({
      laji: 'kaupunki', iso: c.iso, x: c.x, y: c.y,
    });
    varaa({ x0: x - r, y0: y - r, x1: x + r, y1: y + r });
  }

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
    const lev = tekstinLeveys(c.nimi, koko, '');
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
    });
  }

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
  if (nakyy(KYNNYS.kohdeNimi)) {
    /*
     * MERKIN SÄDE RUUTUPIKSELEINÄ. Kohdemerkki elää kartan
     * mittakaavassa, joten sen näkyvä koko riippuu zoomista — nimen
     * rako merkin reunaan on laskettava siitä eikä vakiosta, tai
     * lähikuvassa nimi asettuisi merkin päälle.
     */
    const merkkiR = kohteenSade * px;
    for (const k of kohdenimet) {
      const x = k.x * px;
      const y = k.y * px;
      const lev = tekstinLeveys(k.teksti, KOKO.kohde, '');
      const kork = KOKO.kohde * 1.15;
      const vieri = merkkiR + NIMION_RAKO;
      /*
       * EHDOKKAAT KAHDESSA LUOKASSA: ensin neljä merkin omaa kylkeä
       * (nimi kiinni merkissä, ei viivaa — viiva olisi silloin pelkkä
       * koriste), ja vasta jos yksikään ei mahdu, NOSTO: nimi
       * lähituntumaan ja katkoviiva merkkiin.
       *
       * Kyljet ovat samassa järjestyksessä kuin kohdekerroksen omassa
       * väistössä oli (oikea ennen vasenta, js/fokuskohteet.js
       * KOHDE_NIMIO_PUOLET): järjestys on kiinteä, joten sama näkymä
       * antaa aina saman kartan eikä nimi voi vaihtaa puolta
       * panoroinnissa.
       */
      const ehdokkaat = [
        { dx: vieri, dy: kork * 0.35, ank: 'start', nosto: false },
        { dx: -vieri, dy: kork * 0.35, ank: 'end', nosto: false },
        { dx: 0, dy: -(merkkiR + kork * 0.55), ank: 'middle', nosto: false },
        { dx: 0, dy: merkkiR + kork * 0.95, ank: 'middle', nosto: false },
      ];
      for (const pituus of NOSTON_PITUUDET) {
        for (const sx of [1, -1]) {
          for (const sy of [-1, 1]) {
            ehdokkaat.push({
              dx: sx * (vieri + pituus * 0.7),
              dy: sy * pituus * 0.7 + kork * 0.35,
              ank: sx > 0 ? 'start' : 'end',
              nosto: true,
            });
          }
        }
      }
      let asetettuK = null;
      for (const e of ehdokkaat) {
        const kx = x + e.dx;
        const ky = y + e.dy;
        const x0 = e.ank === 'end' ? kx - lev : (e.ank === 'middle' ? kx - lev / 2 : kx);
        /* Väljyysvara on mukana sekä testissä että varauksessa: nimi
         * vaatii tilaa ympärilleen eikä vain itselleen (ks. NIMION_VALJYYS). */
        const r = {
          x0: x0 - NIMION_VALJYYS_X,
          y0: ky - kork * 0.62 - NIMION_VALJYYS_Y,
          x1: x0 + lev + NIMION_VALJYYS_X,
          y1: ky + kork * 0.42 + NIMION_VALJYYS_Y,
        };
        if (vapaa(r)) { varaa(r); asetettuK = { kx, ky, ank: e.ank, nosto: e.nosto }; break; }
      }
      /*
       * PUDOTUS ON YLEISTYSTÄ, EI VIRHE. Juuri tämä haara purkaa
       * omistajan näkemän viuhkan: kun kaksitoista nimeä kilpailee
       * yhdestä kaupungin kyljestä, muutama luettava jää ja loput
       * väistyvät — ja merkit jäävät kaikki paikoilleen.
       */
      if (!asetettuK) { pudotettu += 1; continue; }
      nimiot.push({
        laji: 'kohde',
        teksti: k.teksti,
        x: laudalle(asetettuK.kx),
        y: laudalle(asetettuK.ky),
        ank: asetettuK.ank,
        koko: KOKO.kohde,
      });
      if (!asetettuK.nosto) continue;
      /*
       * NOSTON VIIVA SEURAA NIMEÄ SEN VALITTUUN PAIKKAAN. Se lähtee
       * merkin REUNALTA (ei keskeltä, jottei jää merkin alle) ja
       * päättyy juuri ennen nimen perusviivaa.
       */
      const vx = asetettuK.kx - x;
      const vy = asetettuK.ky - kork * 0.35 - y;
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

/** Mittakaavan avain: neljä merkitsevää numeroa riittää nimiöiden eroon. */
const ladonnanAvain = (px) => px.toPrecision(4);

function ladoVarastosta(pack, px) {
  const avain = ladonnanAvain(px);
  const oli = LADONNAT.get(avain);
  if (oli) return oli;
  const tulos = lado(aineistoLaudalle(pack), px);
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

  const { nimiot, merkit, nostot } = ladoVarastosta(ui.game.pack, nakyva.skaala);
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

  /* Merkit ensin, nimet päälle: nimi on merkin selitys eikä toisin päin. */
  for (const { m, x } of nakyvatMerkit) {
    if (m.laji === 'vuori') {
      const r = laudalle(m.iso ? MERKKI.vuoriIso : MERKKI.vuori);
      el('path', {
        class: 'karttamerkki karttamerkki-vuori',
        'stroke-width': laudalle(1),
        d: `M${(x - r).toFixed(2)} ${(m.y + r * 0.6).toFixed(2)}`
          + `L${x.toFixed(2)} ${(m.y - r * 0.8).toFixed(2)}`
          + `L${(x + r).toFixed(2)} ${(m.y + r * 0.6).toFixed(2)}`,
      }, kerros);
      continue;
    }
    el('circle', {
      class: 'karttamerkki karttamerkki-piste',
      cx: x, cy: m.y, r: laudalle(m.iso ? MERKKI.pisteIso : MERKKI.piste),
    }, kerros);
    // Rengas ison ympärille: aikakauden kartan pääkaupunkimerkintä.
    if (m.iso) {
      el('circle', {
        class: 'karttamerkki karttamerkki-rengas',
        cx: x,
        cy: m.y,
        r: laudalle(MERKKI.rengasIso),
        'stroke-width': laudalle(0.9),
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
