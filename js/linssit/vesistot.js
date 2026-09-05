/*
 * Vesistölinssi: maailman joet ja järvet reliefikartan päällä.
 *
 * Omistajan päätös 4.8.2026: *"Ota joet pois kokonaan. Täytyy tehdä
 * niistä vaikka oma linssi, missä näkyisi vain pelkät joet ja järvet.
 * Nykyinen on liian sekava."*
 *
 * Joet olivat pohjakartalla samaan aikaan kaiken muun kanssa, ja
 * kartasta tuli sotkuinen juuri siksi: uoma, rannikko, korkeusvyöhyke,
 * reitti ja kaupunki kilpailivat samasta viivasta. Linssi ratkaisee sen
 * kysymyksen kääntämällä sen ympäri — kun pelaaja NOSTAA lasit
 * silmilleen, hän kysyy nimenomaan vesistöä, ja silloin kaikki muu saa
 * väistyä.
 *
 * --- miksi pohjana on topografia eikä pergamentti ---
 *
 * Ensimmäinen versio himmensi kartan vaalealla pergamenttihunnulla.
 * Huntu teki tehtävänsä (uomat erottuivat) mutta hukkasi kaksi asiaa:
 * meret jäivät tyhjäksi paperiksi, eikä kartasta näkynyt MIKSI joki
 * kulkee juuri siinä.
 *
 * Omistaja 5.8.2026: *"koko Jokilinssin voisi itse asiassa rakentaa
 * topografiakartan päälle. Silloin saataisiin meretkin hienosti
 * näkyviin. Jolloin myös joet voisivat olla sinisen eri sävyissä."*
 *
 * Se on sama havainto kuin topografialinssin omassa kuvauksessa:
 * vesistö on se, minkä topografia selittää — joki laskee sinne minne
 * maa viettää. Kun laakso näkyy uoman alla, kartta perustelee itsensä.
 * Pohja piirretään topografialinssin omalla funktiolla
 * (js/linssit/topografia.js piirraReliefi), joten kaksi linssiä jakaa
 * yhden kuvan ja yhden tavan piirtää se.
 *
 * Reliefikuvan meri on sinistä, joten sininen joki on nyt kartan omaa
 * kieltä eikä päälle liimattu poikkeus. Pohjakartan seepiasääntö
 * ("jätä sininen pois vesielementeistä") koskee peruspeliä, ei tätä
 * kuvaa — täysväri linssiin oli sama omistajan päätös 4.8.2026.
 *
 * --- miksi viivanleveys on pikseleitä eikä laudan yksiköitä ---
 *
 * Pohjakartan uomat mitattiin laudan yksiköissä, jolloin ne levenevät
 * kartan mukana. Se on oikein maastolle, mutta väärin tälle linssille:
 * linssi piirretään KERRAN eikä zoomin mukana (js/linssit/kerros.js
 * piirtää kerroksen linssiä vaihdettaessa), joten laudan yksiköissä
 * annettu uoma olisi maailmankuvassa alle pikselin levyinen ja
 * kaupunkikuvassa nauha. Mitattu: lauta on 12000 yksikköä leveä, joten
 * maailmankuvassa yksi pikseli on noin kymmenen yksikköä.
 *
 * `vector-effect="non-scaling-stroke"` pitää viivan samanlevyisenä
 * ruudulla riippumatta zoomista. Vesistökartta on verkosto, ei maasto:
 * verkoston viiva on merkintä eikä mitta, ja merkinnän kuuluukin pysyä
 * samankokoisena. Sama valinta on tehty kaikissa metrokartoissa.
 *
 * --- nimet eivät ole tässä ---
 *
 * Jokien nimet piirtyvät kartan omaan maastonimikerrokseen
 * (js/mapart.js drawMaastonimet), joka piirretään uudelleen jokaisella
 * zoomilla ja osaa siksi näyttää nimen oikean kokoisena ja vain silloin
 * kun se on luettava. Täällä ne olisivat jäätyneet yhteen kokoon. Kerros
 * kytketään päälle tästä linssistä (js/ui.js paivitaMaastonimet), ja
 * sen sävyt hoitaa css/styles.css `body.linssi-vesistot`: kaupunkien
 * nimet ja pallot haalistuvat, jokien nimet tummuvat.
 *
 * PALLOLLA NIMET OVAT TÄSSÄ. Pallolaudalla ei ole maastonimikerrosta —
 * ei ole zoomia, jonka mukana nimi ladottaisiin uudelleen, vaan kamera ja
 * CSS2D-merkit (js/pallolauta/merkit.js). Siksi tärkeimpien jokien nimet
 * tulevat pallolla linssin omasta merkkiosastaan, katto 20 (ks.
 * VESINIMIEN_KATTO): koko on ruutuvakio niin kuin kaikilla pallon
 * merkeillä, eikä jäätymistä yhteen kokoon tapahdu, koska ruutuvakio ON
 * pallon oma mitta.
 *
 * --- sama linssi pallolla (karttapallo.md luku 10.1) ---
 *
 * Omistajan linjaus 5.9.2026: *"Käännä kaikki pallolle, niin voidaan
 * sulkea vanha kartta kokonaan"*. Tämä linssi piirtyy pallolle kolmena
 * kerroksena `lauta.linssit`-apurin kautta: reliefi tasavälisenä kalvona
 * (TOPOGRAFIA_PALLOKUVA), järvet polygoneina ja joet polkuina. Linssi ei
 * koske Globe.gl-instanssiin itse.
 *
 * KAKSI ASIAA MUUTTUU LAUDALTA PALLOLLE.
 *
 * 1. VIIVANLEVEYS ON ASTEITA, EI PIKSELEITÄ. Yllä perusteltu
 *    `non-scaling-stroke` on SVG:n keino; pallolla viivan paksuus on
 *    Globe.gl:n pathStroke eli kulma-aste, ja se kasvaa zoomatessa kuten
 *    kaikki muukin pallon pinnalla. Mitta on otettu matkareitistä
 *    (js/pallolauta/reitit.js MATKAREITIN_PAKSUUS_AST = 0,05), jotta
 *    pääjoki lukeutuu reittiä vahvempana ja sivujoki sitä hennompana —
 *    sama kolmiportainen järjestys kuin laudalla, sen omissa yksiköissä.
 * 2. PEHMENNYSTÄ EI TARVITA. Laudalla polut pehmennetään
 *    (smoothOpenPath); pallolla Globe.gl pilkkoo polun itse
 *    (pathResolution), ja mitattuna aineiston pisteväli on enimmillään
 *    3,5° — pitkät välit tihennetään isoympyrän pisteillä
 *    (TIHENNYS_AST), jotta uoma seuraa palloa eikä oikaise sen läpi.
 *
 * KIERTÄVÄN LAUDAN SAUMA. Lauta jatkuu reunan yli itseensä, joten
 * asteiksi käännettynä piste voi hypätä +180°:sta -180°:een. Polku
 * katkaistaan siitä kohdasta omaksi polukseen (katkaiseSauma); muuten
 * uoma vetäisi viivan koko maapallon ympäri väärää kautta. Nykyisessä
 * aineistossa hyppyjä ei ole (mitattu), mutta sauma on laudan ominaisuus
 * eikä aineiston, joten katkaisu on koodissa eikä datassa.
 */

import { el, kasinPiirretty, smoothOpenPath, smoothClosedPath } from '../mapart.js';
import { isoympyranPiste, kulmaAsteina } from '../pallolauta/reitit.js';
import { lataaReliefi, piirraReliefi } from './topografia.js';

/*
 * Peittävyys: suunnitelman kova raja kaikille linsseille (luku 2.2
 * sääntö 4). Lento- ja laivareitit ovat linssin ALLA staattisessa
 * kerroksessa, eikä niitä voi nostaa elävään puuhun — täysin peittävä
 * linssi hävittäisi pelaajalta koko reittiverkon.
 */
const PEITTAVYYS = 0.72;

/*
 * Vesistö piirretään pohjaa peittävämpänä (0,94).
 *
 * Raja 0,72 on olemassa siksi, että KARTTA näkyisi linssin läpi. Uoma
 * on tässä linssissä se asia, jota katsotaan, eikä se saa kadota
 * reliefin kirjavuuteen: 0,72:lla ohut sivujoki sekoittui Andien
 * ruskeaan. Reitit näkyvät yhä pohjan läpi, koska pohja on se kerros,
 * joka noudattaa rajaa — joet ovat viivoja, eivät peitettä.
 */
const VESI_PEITTO = 0.94;

/*
 * Varapergamentti.
 *
 * Käytössä vain jos reliefikuva puuttuu tai lauta ei täsmää kuvan
 * rajasuorakulmioon (ks. piirra). Linssi ei saa kaatua siihen: joet ja
 * järvet ovat sen sisältö, pohja on sen tausta.
 */
const HUNTU = '#e7d8b2';

/*
 * SININEN VIIVA JA SEN VARJO.
 *
 * Kolmiulotteisuus tehdään kahdella vedolla samaa polkua: leveämpi
 * tumma penger alle ja kapeampi kirkas uoma päälle. Silmä lukee parin
 * uraksi, ei kahdeksi viivaksi — sama kuvio on kaiverretuissa
 * merikartoissa ja pohjakartan omassa lähivedessä (js/mapart.js
 * drawLahivesi).
 *
 * Varjo ei ole suodatin eikä siirretty kopio: molemmat olisivat
 * kiellettyjä (suodatin) tai kaksinkertaistaisivat elementtimäärän
 * ilman, että ura paranisi. Sama polku kahdesti riittää, koska
 * `stroke-linejoin: round` pyöristää molemmat reunat samalla tavalla.
 *
 * Sävyt on poimittu reliefikuvan omasta merestä (mitattu
 * assets/linssit/topografia.webp: avomeri 57,104,165, syvänne
 * 29,62,124), jotta joki ja meri ovat samaa vettä. Uoma on merta
 * vaaleampi, koska joki on matala ja kirkas — ja koska vaalea viiva
 * erottuu sekä vihreältä alangolta että ruskealta vuorelta.
 */
const PENGER = '#123f68';
const UOMA = { 1: '#5aa9e0', 2: '#4a95d0', 3: '#3c82be' };
const JARVEN_VESI = '#3b7db5';

/*
 * Viivanleveydet ruudun pikseleinä tärkeysluokan mukaan.
 *
 * Kolme luokkaa, koska aineistossa on kolme (js/packs/
 * maailmankartta-nimet.js tarkeys): 13 pääjokea, 71 keskisuurta ja 85
 * pientä. Suhde on sama kuin kirjapainon viivaportailla — pienempi ero
 * ei erotu, suurempi tekisi pääjoista putkia.
 *
 * PENGER ON UOMA + 3 PIKSELIÄ, siis 1,5 pikseliä kummallakin puolella.
 * Ensin kokeiltiin kaksinkertaista leveyttä (2,6 / 5,0), ja mitattuna
 * ruudulla pari suli yhdeksi siniseksi viivaksi: 1,2 pikselin reuna on
 * tavallisella näytöllä alle kokonaisen pikselin ja sekoittuu uoman
 * sävyyn. 1,5 pikseliä piirtyy.
 *
 * PENGER VAIN KAHDELLE YLIMMÄLLE LUOKALLE. Luokan 3 uoma on 1,3
 * pikseliä, ja sama 3 pikselin lisäys tekisi siitä 4,3 leveän eli
 * leveämmän kuin luokan 2 koko uran. Tärkeysjärjestys katoaisi juuri
 * siitä syystä, jonka takia luokkia on kolme. Sivutuotteena
 * elementtimäärä pysyy reilusti katon alla (ks. piirra).
 */
const LEVEYS = {
  1: { uoma: 3.0, penger: 7.0 },
  2: { uoma: 2.0, penger: 5.0 },
  3: { uoma: 1.3, penger: 0 },
};
const JARVEN_REUNA = 1.4;

/* ------------------------------------------------------- pallon mitat */

/*
 * UOMAN JA PENKEREEN PAKSUUS ASTEINA (Globe.gl pathStroke).
 *
 * Mittatikku on matkareitti: js/pallolauta/reitit.js
 * MATKAREITIN_PAKSUUS_AST = 0,05 on se viiva, jonka pelaaja tuntee
 * pallolta entuudestaan. Pääjoki on sitä hitusen vahvempi (0,06), koska
 * se on tässä linssissä pääasia; keskisuuri jää alle (0,04) ja sivujoki
 * puoleen (0,025). Suhde 2,4 : 1,6 : 1 on sama kuin laudan pikseleillä
 * (3,0 : 2,0 : 1,3), joten kolmiportainen järjestys säilyy sellaisenaan.
 *
 * PENGER ON SAMASSA SUHTEESSA KUIN LAUDALLA (7/3 ja 5/2), ei kiinteä
 * lisäys: asteissa lisäys olisi eri levyinen eri zoomilla, kun laudalla
 * se oli ruudun pikseleitä. Luokka 3 jää ilman pengertä samasta syystä
 * kuin laudalla — penger söisi luokkien eron.
 *
 * AVOIN KYSYMYS MOOTTORILLE (aalto 1A / Fable): aste on kiinteä pallon
 * pinnalla, joten koko maailma ruudulla (korkeus 2,5, ~2 px asteessa)
 * ohentaa uoman alle pikselin, kun saapumisnäkymässä (~55 px asteessa)
 * se on kolme pikseliä. Sama pätee matkareittiin, joka piirretään vain
 * lähellä. Jos `lauta.linssit` joskus asettaa listat uudelleen kameran
 * pysähtyessä (kuten nimiladonta, LAATU_LEPOVIIVE_MS), nämä luvut
 * kannattaa kertoa kameran korkeudella — silloin uoma olisi taas
 * merkintä eikä mitta, niin kuin laudalla.
 */
export const PALLON_UOMA_AST = { 1: 0.06, 2: 0.04, 3: 0.025 };
export const PALLON_PENGER_AST = { 1: 0.14, 2: 0.1 };

/*
 * KORKEUDET PALLON PINNASTA. Kalvo (reliefi) on omana kuorenaan
 * 0,002:ssa, järvi juuri sen päällä ja uoma järven päällä — sama
 * järjestys kuin laudalla, jossa joki piirretään järven jälkeen, jotta
 * uoma jatkuu rantaan asti.
 */
export const JARVEN_KORKEUS = 0.003;
export const UOMAN_KORKEUS = 0.004;

/*
 * Pisin sallittu väli kahden pisteen välillä asteina. Aineiston suurin
 * mitattu väli on 3,5°, ja niitä on 19 kappaletta; ne tihennetään
 * isoympyrän pisteillä, jotta uoma kulkee pallon pintaa eikä oikaise
 * jänteenä sen läpi.
 */
export const TIHENNYS_AST = 2;

/*
 * JOKIEN NIMET PALLOLLA — kytkin ja katto.
 *
 * Nimet ovat CSS2D-elementtejä, joiden paikan kirjasto laskee joka kehys
 * (karttapallo.md luku 6 ja riski 3), joten niitä on oltava vähän: vain
 * tärkeysluokat 1–2 ja niistäkin 20 pisintä. Kytkin on olemassa siksi,
 * että merkit-osa on aallon 1A moottorin varassa — jos sitä ei ole,
 * linssi piirtyy silti täydellisenä ilman nimiä.
 */
export const VESINIMET_PALLOLLA = true;
export const VESINIMIEN_KATTO = 20;

let maasto = null;
let nimet = null;
let kuvatiedot = null;
let pallokuva = null;
let pallomuisti = null;

/* -------------------------------------------- laudalta pallolle (puhdas) */

/**
 * Laudan pisteet asteiksi: [[x, y]…] → [[lat, lng]…].
 *
 * `asteet` on laudan oma asteistus (js/fokusmitat.js laudaltaAsteiksi,
 * pallolaudalla js/pallolauta/lauta.js pallonAsteet). Se palauttaa
 * `{ lat, lon }` tai null; null-pisteet jätetään pois, koska yksi
 * projisoimaton piste ei saa hävittää koko uomaa.
 */
function pisteetAsteina(pisteet, asteet) {
  const ulos = [];
  for (const p of pisteet ?? []) {
    const x = Array.isArray(p) ? p[0] : p?.x;
    const y = Array.isArray(p) ? p[1] : p?.y;
    const a = Number.isFinite(x) && Number.isFinite(y) ? asteet({ x, y }) : null;
    if (a && Number.isFinite(a.lat) && Number.isFinite(a.lon)) ulos.push([a.lat, a.lon]);
  }
  return ulos;
}

/**
 * KIERTÄVÄN LAUDAN SAUMA: polku paloiksi siitä, missä pituusaste hyppää
 * yli 180°. Palauttaa listan polkuja; alle kahden pisteen palat jäävät
 * pois, koska yhdestä pisteestä ei tule viivaa.
 */
export function katkaiseSauma(pisteet) {
  const palat = [];
  let pala = [];
  for (const p of pisteet ?? []) {
    const edellinen = pala[pala.length - 1];
    if (edellinen && Math.abs(p[1] - edellinen[1]) > 180) {
      if (pala.length >= 2) palat.push(pala);
      pala = [];
    }
    pala.push(p);
  }
  if (pala.length >= 2) palat.push(pala);
  return palat;
}

/**
 * PITKÄT VÄLIT TIHENNETÄÄN ISOYMPYRÄLLÄ. Kahden kaukana toisistaan
 * olevan pisteen väliin lisätään pallon pintaa seuraavat välipisteet
 * (js/pallolauta/reitit.js isoympyranPiste — sama kaava kuin
 * lentokaarella), jotta uoma ei oikaise pallon läpi.
 */
export function tihennaKaarella(pisteet, raja = TIHENNYS_AST) {
  if (!(pisteet?.length >= 2)) return pisteet ?? [];
  const ulos = [pisteet[0]];
  for (let i = 1; i < pisteet.length; i += 1) {
    const a = { lat: pisteet[i - 1][0], lng: pisteet[i - 1][1] };
    const b = { lat: pisteet[i][0], lng: pisteet[i][1] };
    const kulma = kulmaAsteina(a, b);
    // Pyöristysvara: acos antaa tasan rajan mittaisesta välistä 2,0000001.
    const osia = Math.ceil(kulma / raja - 1e-9);
    for (let k = 1; k < osia; k += 1) {
      const v = isoympyranPiste(a, b, k / osia);
      ulos.push([v.lat, v.lng]);
    }
    ulos.push(pisteet[i]);
  }
  return ulos;
}

/**
 * VESISTÖ PALLOLLE — koko muunnos yhtenä puhtaana funktiona.
 *
 * `aineisto` on `{ maasto, nimet }` (js/packs/maailmankartta-maasto.js ja
 * js/packs/maailmankartta-nimet.js) ja `asteet({ x, y })` laudan
 * asteistus. Funktio ei koske selaimeen eikä Globe.gl:ään, joten se on
 * ajettavissa ja mitattavissa Nodessa (tests/vesistot-pallolla.test.mjs).
 *
 * Palauttaa kolme valmista datumlistaa:
 *
 *   polut      — penkereet ensin, uomat päälle. Järjestys on sama syy
 *                kuin laudan kahdella ryhmällä: jos pari piirrettäisiin
 *                joki kerrallaan, seuraavan joen tumma penger leikkaisi
 *                edellisen kirkkaan uoman poikki joka yhtymäkohdassa.
 *   polygonit  — järvet GeoJSON-renkaina ([lng, lat], rengas suljettu).
 *   nimet      — tärkeimpien jokien nimet ja ankkurit; elementin tekee
 *                `pallolle`, jotta tämä funktio pysyy DOM-vapaana.
 */
export function vesistotPallolle(aineisto, asteet) {
  const maastoData = aineisto?.maasto ?? null;
  const nimiData = aineisto?.nimet ?? null;
  const polygonit = [];
  const penkat = [];
  const uomat = [];
  const vesinimet = [];
  if (!maastoData || typeof asteet !== 'function') {
    return { polut: [], polygonit, nimet: vesinimet };
  }

  /*
   * JÄRVET. Rengas suljetaan (GeoJSON vaatii ensimmäisen ja viimeisen
   * pisteen samaksi), ja sauman ylittävä rengas jätetään pois: renkaalla
   * ei ole päätä, josta sen voisi katkaista kahdeksi. Nykyisessä
   * aineistossa sellaisia ei ole — tools/tee-maasto.mjs pitää sauman
   * ylittävät muodot yhtenäisinä laudan omassa kierrossa.
   */
  maastoData.jarvet?.forEach((jarvi, i) => {
    const rengas = pisteetAsteina(jarvi.rengas ?? jarvi, asteet);
    if (rengas.length < 4) return;
    if (katkaiseSauma(rengas).length !== 1) return;
    const koordinaatit = rengas.map(([lat, lng]) => [lng, lat]);
    const eka = koordinaatit[0];
    const vika = koordinaatit[koordinaatit.length - 1];
    if (eka[0] !== vika[0] || eka[1] !== vika[1]) koordinaatit.push([eka[0], eka[1]]);
    polygonit.push({
      avain: `jarvi:${i}`,
      nimi: jarvi.nimi ?? '',
      geometry: { type: 'Polygon', coordinates: [koordinaatit] },
      vari: JARVEN_VESI,
      reuna: PENGER,
      korkeus: JARVEN_KORKEUS,
    });
  });

  /*
   * JOET. Tärkeysluokka luetaan nimipaketista samalla avaimella kuin
   * laudalla (joen nimi), ja luokka päättää sekä sävyn että paksuuden.
   */
  const jokiTarkeys = new Map((nimiData?.joet ?? []).map((j) => [j.avain, j.tarkeys]));
  maastoData.joet?.forEach((joki, i) => {
    const asteina = pisteetAsteina(joki.pisteet ?? joki, asteet);
    if (asteina.length < 2) return;
    const luokka = jokiTarkeys.get(joki.nimi) ?? 3;
    const palat = katkaiseSauma(asteina);
    palat.forEach((pala, k) => {
      const pisteet = tihennaKaarella(pala);
      const tunnus = palat.length > 1 ? `${i}/${k}` : `${i}`;
      const penger = PALLON_PENGER_AST[luokka];
      if (penger) {
        penkat.push({
          avain: `penger:${tunnus}`,
          nimi: joki.nimi ?? '',
          pisteet,
          vari: PENGER,
          paksuus: penger,
          korkeus: UOMAN_KORKEUS,
          katko: 0,
        });
      }
      uomat.push({
        avain: `uoma:${tunnus}`,
        nimi: joki.nimi ?? '',
        tarkeys: luokka,
        pisteet,
        vari: UOMA[luokka] ?? UOMA[3],
        paksuus: PALLON_UOMA_AST[luokka] ?? PALLON_UOMA_AST[3],
        korkeus: UOMAN_KORKEUS,
        katko: 0,
      });
    });
  });

  /*
   * NIMET. Ankkuri on uoman KIINTEÄ keskikohta samasta syystä kuin
   * laudalla (js/mapart.js drawMaastonimet): "Joen nimi hyppii uusiin
   * paikkoihin kun karttaa katsoo eri paikassa" — nimi kuuluu paikkaan,
   * ei katseeseen. Ehdokkaat ovat luokat 1–2 pituusjärjestyksessä, ja
   * katto leikkaa lopun.
   */
  const ehdokkaat = (nimiData?.joet ?? [])
    .filter((j) => (j.tarkeys ?? 3) <= 2 && (j.pisteet?.length ?? 0) >= 2)
    .sort((a, b) => (a.tarkeys - b.tarkeys) || ((b.pituus ?? 0) - (a.pituus ?? 0)));
  for (const joki of ehdokkaat) {
    if (vesinimet.length >= VESINIMIEN_KATTO) break;
    const keski = joki.pisteet[Math.floor(joki.pisteet.length / 2)];
    const a = asteet({ x: keski[0], y: keski[1] });
    if (!a) continue;
    vesinimet.push({
      avain: `vesinimi:${joki.avain}`,
      laji: 'linssi',
      teksti: joki.nimi ?? joki.avain,
      tarkeys: joki.tarkeys ?? 2,
      lat: a.lat,
      lng: a.lon,
    });
  }

  return { polut: [...penkat, ...uomat], polygonit, nimet: vesinimet };
}

/** Joen nimen elementti pallolla: yksi span, tyyli css:ssä. */
function vesinimenElementti(d) {
  const el = document.createElement('span');
  el.className = 'pallolauta-vesinimi';
  el.textContent = d.teksti;
  el.setAttribute('aria-hidden', 'true');
  return el;
}

export const LINSSI = {
  tunnus: 'vesistot',
  /*
   * Topografian (10) jälkeen. Molemmat kertovat maasta eivätkä
   * ihmisistä, ja vesistö on se, minkä topografia selittää: joki kulkee
   * siellä minne maa viettää. Ne kuuluvat valitsimessa vierekkäin, ja
   * nyt myös jakavat pohjakuvan.
   */
  jarjestys: 20,
  kerros: true,

  nimi: 'Vesistölinssi',
  lyhyt: 'Joet ja järvet maaston päällä: vesi näkyy siellä minne maa viettää.',
  /*
   * Mutkitteleva joki ja järvi sen varrella. Ei pisaraa eikä aaltoa:
   * kuvakkeen on kerrottava mitä linssi NÄYTTÄÄ, ja tämä linssi näyttää
   * uomia. 24×24 viivapolkuja ilman <svg>-kuorta, kuten muillakin.
   */
  ikoni: '<path d="M4 3.2c0 3.4 3.4 3.9 3.4 7.1 0 3.2-3.4 3.7-3.4 7 0 2 1.2 3.1 3 3.5"/>'
    + '<path d="M13.2 8.6c2.1-.9 4.6-.5 5.9.9 1.4 1.6 1 3.9-.8 5-1.9 1.1-4.6.8-6-.7'
    + '-1.3-1.4-1-3.4.9-5.2z"/>',

  /*
   * Vain maailmankartalla. Aineisto on projisoitu tälle laudalle
   * (tools/hae-vedet.mjs), ja väärässä paikassa oleva joki on pahempi
   * kuin ei jokea. Sama koskee reliefipohjaa.
   */
  laudat: ['maailmankartta'],

  /*
   * valokuva: true ottaa paperin rakeisuuden pois linssin päältä
   * (css/styles.css: body.linssi-valokuva .grain). Sama syy kuin
   * topografialinssissä, ja nyt sama kuva: rakeisuus sekoittuu
   * KERTOLASKULLA, joten se jää linssin päälle ja vetäisi
   * täysvärireliefin ruskeaksi. Sininen joki ruskean seulan alla ei ole
   * enää sininen.
   */
  valokuva: true,

  lahde: {
    aineisto: 'Natural Earth 10m: ne_10m_rivers_lake_centerlines ja ne_10m_lakes '
      + '(Kaspianmeri ne_10m_ocean-aineistosta); pohjana NOAA NGDC ETOPO1',
    lisenssi: 'Public domain',
    osoite: 'https://www.naturalearthdata.com/downloads/10m-physical-vectors/',
    haettu: '2026-07-27',
  },

  /**
   * Vesistöaineisto, nimipaketti (tärkeysluokat) ja reliefipohja
   * valmiiksi. Kaksi ensimmäistä ovat pohjakartan omia moduuleja, joten
   * ne ovat useimmiten jo selaimen muistissa eikä lataus maksa mitään.
   *
   * Reliefin lataus ei saa kaataa linssiä: ilman kuvaa piirretään
   * pergamenttihuntu, ja joet näkyvät yhä.
   */
  async lataa() {
    if (!maasto) {
      ({ MAAILMANKARTAN_MAASTO: maasto } = await import('../packs/maailmankartta-maasto.js'));
    }
    if (!nimet) {
      ({ MAAILMANKARTAN_NIMET: nimet } = await import('../packs/maailmankartta-nimet.js'));
    }
    try {
      kuvatiedot = await lataaReliefi();
    } catch {
      kuvatiedot = null;
    }
    /*
     * Pallon kalvo on sama reliefi TASAVÄLISENÄ (js/packs/
     * linssi-topografia-kuva.js TOPOGRAFIA_PALLOKUVA). Paketti on
     * lataaReliefi:n jäljiltä jo selaimen muistissa, joten tämä on
     * kirjanpitoa eikä latausta.
     */
    if (!pallokuva) {
      ({ TOPOGRAFIA_PALLOKUVA: pallokuva } = await import('../packs/linssi-topografia-kuva.js'));
    }
  },

  /**
   * Pohja, järvet ja joet — tässä järjestyksessä.
   *
   * ELEMENTTIMÄÄRÄ ON MITOITETTU, EI SATTUMA. Moottori muuttaa linssin
   * yhdeksi kuvaksi, jos elementtejä on yli LINSSIN_ELEMENTTIKATTO =
   * 400 — ja rasteroitu SVG ajetaan blob-hiekkalaatikossa, joka EI hae
   * ulkoisia osoitteita (suunnitelma luku 1.7). Rasteroituna
   * reliefikuva palauttaisi läpinäkyvän tyhjän, ja pohja katoaisi ilman
   * yhtäkään virhettä lokissa.
   *
   * Laskenta: pohja 7 (kaksi rajausta, kaksi suorakulmiota, kolme
   * kuvaa) + 38 järveä + 84 penkereen vetoa (luokat 1 ja 2) + 169 uomaa
   * + neljä ryhmää = 302. Katto on 400, joten aineisto saa kasvaa
   * kolmanneksen ennen kuin tämä on mietittävä uudelleen.
   */
  piirra(ryhma, tila) {
    if (!maasto) return false;

    /*
     * POHJA: reliefi, tai pergamentti jos kuva puuttuu.
     *
     * Rajatarkistus on sama kuin topografialinssissä: jos lauta on
     * vaihtunut kuvan tekemisen jälkeen, kuva peittäisi kartan mutta
     * mantereet olisivat väärässä kohdassa. Tässä linssissä se ei
     * kelpaa piilottamisen syyksi — joet ovat oikeassa paikassa joka
     * tapauksessa, joten pohja vaihtuu hunnuksi ja linssi jää päälle.
     */
    const raja = kuvatiedot?.raja;
    const sopiiLautaan = raja && raja.leveys === tila.leveys && raja.korkeus === tila.korkeus;
    if (sopiiLautaan) {
      piirraReliefi(ryhma, raja, kuvatiedot.kuva, PEITTAVYYS, 'vesi');
    } else {
      /*
       * HUNTU KOKO LAUDAN YLI JA SEN ULKOPUOLELLE.
       *
       * Näkyvä alue ulottuu laudan ylä- ja alapuolelle: reunimmaiset
       * kaupungit on voitava panoroida yläpalkin ja alanappien alta
       * esiin (js/ui.js YLAKAISTA ja ALAKAISTA). Jos huntu loppuisi
       * laudan reunaan, kaistaan jäisi himmentämätön kaistale kirkasta
       * merta.
       */
      el('rect', {
        x: 0,
        y: -tila.korkeus,
        width: tila.leveys,
        height: tila.korkeus * 3,
        fill: HUNTU,
        opacity: PEITTAVYYS * 0.82,
      }, ryhma);
    }

    const g = el('g', { opacity: VESI_PEITTO }, ryhma);

    /*
     * Järvet ensin, joet päälle. Joki laskee järveen, ja uoman on
     * jatkuttava rantaan asti — toisin päin järven täyttö katkaisisi
     * uoman juuri siitä kohtaa, jossa se on kiinnostavin.
     *
     * Järvi on YKSI polku: täyttö ja tumma reuna samassa. Reuna tekee
     * järvelle saman kuin penger joelle — se laskee rannan varjoon ja
     * nostaa vesipinnan muodoksi.
     */
    const jarvet = el('g', {
      fill: JARVEN_VESI,
      stroke: PENGER,
      'stroke-width': JARVEN_REUNA,
      'vector-effect': 'non-scaling-stroke',
    }, g);
    for (const jarvi of maasto.jarvet ?? []) {
      const rengas = jarvi.rengas ?? jarvi;
      if (!rengas || rengas.length < 4) continue;
      el('path', { d: smoothClosedPath(kasinPiirretty(rengas)) }, jarvet);
    }

    /*
     * KAKSI RYHMÄÄ, EI KAHTA VETOA PERÄKKÄIN.
     *
     * Kaikki penkereet piirretään ensin ja kaikki uomat vasta sitten.
     * Jos pari piirrettäisiin joki kerrallaan, seuraavan joen tumma
     * penger leikkaisi edellisen kirkkaan uoman poikki jokaisessa
     * yhtymäkohdassa — ja yhtymäkohta on juuri se paikka, jossa
     * vesistön pitää näyttää yhtenäiseltä.
     */
    const jokiTarkeys = new Map((nimet?.joet ?? []).map((j) => [j.avain, j.tarkeys]));
    const yhteiset = {
      fill: 'none',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'vector-effect': 'non-scaling-stroke',
    };
    const penkat = el('g', { ...yhteiset, stroke: PENGER }, g);
    const uomat = el('g', yhteiset, g);

    for (const joki of maasto.joet ?? []) {
      const pisteet = joki.pisteet ?? joki;
      if (!pisteet || pisteet.length < 2) continue;
      // Polku lasketaan kerran ja käytetään molemmissa vedoissa.
      const d = smoothOpenPath(kasinPiirretty(pisteet));
      const luokka = jokiTarkeys.get(joki.nimi) ?? 3;
      const mitat = LEVEYS[luokka] ?? LEVEYS[3];
      if (mitat.penger) el('path', { d, 'stroke-width': mitat.penger }, penkat);
      el('path', {
        d,
        stroke: UOMA[luokka] ?? UOMA[3],
        'stroke-width': mitat.uoma,
      }, uomat);
    }
    return true;
  },

  /**
   * SAMA LINSSI PALLOLLA (karttapallo.md luku 10.1).
   *
   * Kolme kutsua `lauta.linssit`-apurille — kalvo, järvet, joet — ja
   * neljäs, jos merkit-osa on käytettävissä (jokien nimet). Linssi ei
   * koske Globe.gl:ään itse, joten kerrosten kirjanpito ja purku ovat
   * yhdessä paikassa (js/pallolauta/linssit.js).
   *
   * MUUNNOS TEHDÄÄN KERRAN. Laudan (x, y) → asteet on 253 polun ja 38
   * renkaan verran laskentaa, ja se on sama joka kerta: pallolauta on
   * yksi ja sen projektio vakio (js/packs/fokus-grc.js
   * FOKUS_LAUTAPROJEKTIOT.maailmankartta). Tulos jää muistiin, jotta
   * linssin sytyttäminen uudestaan on kerroslistojen asettamista.
   */
  pallolle(lauta) {
    const linssit = lauta?.linssit;
    if (!linssit) return { pura() {} };
    if (!pallomuisti && maasto) {
      pallomuisti = vesistotPallolle({ maasto, nimet }, lauta.asteet);
    }
    const aineisto = pallomuisti ?? { polut: [], polygonit: [], nimet: [] };

    /*
     * POHJA ENSIN, sitten järvet, sitten joet — sama järjestys kuin
     * laudalla. Kalvo on pallon oma kuori reliefikuvalla; jos kuva
     * puuttuu, kalvo jää pois eikä linssi kaadu: joet ja järvet ovat sen
     * sisältö, pohja on sen tausta.
     */
    if (pallokuva) linssit.kalvo('vesistot', { kuva: pallokuva, peittavyys: PEITTAVYYS });
    linssit.polygonit('vesistot', aineisto.polygonit);
    linssit.polut('vesistot', aineisto.polut);

    const nimiOsa = VESINIMET_PALLOLLA && typeof linssit.merkit === 'function'
      && aineisto.nimet.length > 0;
    if (nimiOsa) {
      linssit.merkit('vesistot-nimet', aineisto.nimet.map((d) => ({
        ...d, elementti: vesinimenElementti,
      })));
    }

    return {
      pura() {
        linssit.pura('vesistot');
        if (nimiOsa) linssit.pura('vesistot-nimet');
      },
    };
  },

  selite() {
    return [
      { vari: UOMA[1], teksti: 'Pääjoki, esimerkiksi Niili tai Amazon' },
      { vari: UOMA[3], teksti: 'Sivujoki ja pienempi uoma' },
      { vari: JARVEN_VESI, teksti: 'Järvi tai suolainen sisämeri' },
      { vari: '#3968a5', teksti: 'Meri ja valtameri' },
      { vari: '#3e6e42', teksti: 'Alanko, jonne joet laskevat' },
      { vari: '#94623e', teksti: 'Vuoristo, josta joet saavat alkunsa' },
    ];
  },
};
