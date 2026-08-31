/*
 * LAATTAPYRAMIDI: yksi maailmanlaajuinen esirenderöity kartta, laatoiksi
 * pilkottuna ja zoomtasoittain kahdennettuna.
 *
 *   node tools/generoi-laattapyramidi.mjs <kohdekansio> \
 *        [--data <raaka-aineiston kansio>] [--tasot 0-7] \
 *        [--alue lon0,lat0,lon1,lat1] [--laatta 512] [--laatu 0.9] \
 *        [--lohko 4] [--kaariminuutit 3] [--muoto webp]
 *        [--harva] [--harvamittaus] [--saumatesti] [--kuiva]
 *        [--vain-lista] [--paikkaus <lähdeversio>]
 *
 * Omistajan päälinjaus 30.8.2026 (Raamattu, "YKSI MAAILMANBITTIKARTTA -
 * MAALEHDISTA LUOVUTAAN"): *"koko maailma on kokoajan yksi iso
 * bittikartta josta vain ladataan kulloinkin tarvittava palanen"*.
 * Maakohtaisia lehtiä ei ole missään; Maailma-nappi vain löysentää
 * panorointirajoja.
 *
 * === PYRAMIDI ON SAMA ARKKI MONELLA TARKKUUDELLA ==================
 *
 * Jokainen taso piirtää TÄSMÄLLEEN saman arkin samalla moottorilla
 * (tools/fokuskartta/maailmapiirto.js) kuin kaukozoomin yleislehti —
 * sama projektio, sama patina — vain eri leveydellä. Taso z on
 * 675 * 2^z kuvapikseliä leveä (675 ... 86 400), ja arkki pilkotaan
 * siitä `--laatta` pikselin ruutuihin. Mitat ovat omistajan lukitsemat;
 * ks. LUKITUT MITAT alempana.
 *
 * TÄMÄ ON KOKO IDEA: kun jokainen taso on sama arkki, mikään ei voi
 * ajautua eri sävyihin tasojen välillä, eikä kahden tason rajalla
 * välähdä kaksi eri karttaa. Se oli maalehtien perisynti (yleislehden
 * johdanto: "tilkkutäkki"), ja se poistuu rakenteellisesti.
 *
 * TASOJA EI JOHDETA ALASPÄIN PIENENTÄMÄLLÄ. Jokainen taso piirretään
 * omalla mittakaavallaan (moottorin S), jotta rannikon viiva, paperin
 * rae ja nimien koko pysyvät luettavina joka tasolla. Pienennetyssä
 * tasossa rannikko olisi pikselin murto-osa eli näkymätön ja rae
 * mössöä. Kustannus on maltillinen: koko pyramidi on vain 4/3 ylimmän
 * tason pinta-alasta (1 + 1/4 + 1/16 + ...).
 *
 * === LAATTATASOT JA KAMERAN ZOOMIPORTAIKKO OVAT ERI ASIA ===========
 *
 * Pelin zoomiportaikko (js/kartta.js zoomiTasot, kerroin 1,5) on
 * NÄYTÖN portaikko: mihin kohtaan nipistys napsahtaa. Laattatasot ovat
 * DATAN portaikko: mikä tarkkuus levyltä ladataan. Näitä EI sovitella
 * yhteen (omistajan lukitus 30.8.2026). Peli valitsee lähimmän
 * laattatason logaritmisesti, jolloin skaalaus on korkeintaan
 * kerroin 1,41 kumpaankin suuntaan.
 *
 * === LAATTOJEN NIMEÄMINEN ==========================================
 *
 *   pyramidi/<versio>/z<taso>/<sarake>/<rivi>.webp
 *
 * Versio on kansiotasolla, jotta koko pyramidin voi julkaista uutena
 * eränä ilman että yksikään vanha osoite muuttuu — silloin laatat
 * saavat ikuisen välimuistin (immutable), eikä sisältöpäivitys voi
 * jättää selaimeen puolikasta karttaa kahdesta eri ajosta.
 *
 * KIERTO EI OLE LAATTAKOON MONIKERTA. Tason leveys (675 * 2^z) ei ole
 * jaollinen 512:lla, joten viimeinen sarake on VAJAA eikä kierto ole
 * "sarake modulo sarakkeiden määrä" tasavälisellä ruudukolla. Kierros
 * on `leveys` PIKSELIÄ; peli laskee laatan paikan kierroksittain
 * (js/laattapyramidi.js).
 *
 * === MITÄ TÄMÄ EI TEE ==============================================
 *
 * Laatoissa on VAIN PYSYVÄ: topografia, meri, rannikko, järvet,
 * asteverkko ja valtamerten nimet. Pelitila —
 * laattavärit, elävät merkit, nappula, vinjetointi — on ohut
 * päällyskerros pelissä eikä kuulu tänne. Kaupungit, reittipisteet ja
 * kohteet poltetaan laattoihin vasta kun niiden piirto on siirretty
 * tähän moottoriin; se on oma eränsä.
 *
 * Aineisto ja lähteet: tools/fokuskartta/maailma.mjs (sama kuin
 * yleislehdellä). Natural Earth 10m — public domain; ETOPO1 (NOAA,
 * Amante & Eakins 2009) — public domain.
 */
import { createServer } from 'node:http';
import {
  mkdirSync, readFileSync, writeFileSync, statSync, existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { keraaMaailma } from './fokuskartta/maailma.mjs';
import { keraaSisalto, sisallonYhteenveto } from './fokuskartta/sisalto.mjs';
import { keraaNostot, nostojenYhteenveto } from './fokuskartta/nostot.mjs';
import { lueRajaviivasto, rajatLaudalle, RAJASETIT } from './fokuskartta/rajat.mjs';
import { RESEPTIT, TAUSTA, patinoiSelaimessa } from './patina.mjs';
import { laudanProjektio, SYVYYS } from './fokuskartta/piirto.js';
import { nostosymPolttoLaatikko } from '../js/fokusnosto-symbolit.js';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');

/* ------------------------------------------------------------ lauta */

/*
 * LAUTA JA SEN PROJEKTIO — sanasta sanaan tools/tee-yleislehti.mjs:stä.
 * Nämä ovat pelin koko koordinaatiston perusta (LEVEYS 12000, LON0
 * −175, POHJOINEN 76) eikä niitä muuteta: y = 0 on 76. leveyspiiri
 * kaikelle, mitä laudalle on esilaskettu.
 */
const LAUTA = {
  id: 'maailmankartta',
  moduuli: './js/packs/maailmankartta.js',
  vienti: 'MAAILMANKARTTA',
  projektio: {
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  },
};

/*
 * ============ LUKITUT MITAT (omistaja 30.8.2026) =====================
 *
 * Nämä luvut ovat omistajan päätös eikä tämän työkalun johtopäätös, ja
 * ne on kirjattu tähän kokonaisina, jotta kukaan ei myöhemmin johda
 * niitä uudestaan hitusen eri tavalla:
 *
 *   ARKKI     kartta-ala 84 °N … 66 °S (sama kuin yleislehdellä) ja sen
 *             ylä- ja alapuolella atlaskehyksen paperimarginaali:
 *             laudan y −1046,31 … 6261,41, korkeus 7307,72.
 *             (Omistajan päätös 30.8.2026 illalla; kumoaa saman päivän
 *             aiemman 76 °N … 76 °S -rajauksen, joka olisi leikannut
 *             Grönlannin kärjen ja Huippuvuoret pois.)
 *   TIHEYS    syvimmällä tasolla 7,2 px / lautayksikkö
 *             = 240 px/aste = 4 px/kaariminuutti
 *             = 12 px yhtä kolmen kaariminuutin korkeussolua kohti.
 *   TASOT     8 kappaletta, kerroin 2: 675 → 86 400 px maailman leveys.
 *   LAATTA    512 × 512.
 *
 * ORIGO EI SIIRRY, VAIKKA ARKKI KASVOI. Projektion vakiot ovat
 * koskemattomat, joten y = 0 on yhä 76. leveyspiiri ja jokainen
 * laudalle esilaskettu piste — kaupungit, reittipisteet, kohteet,
 * eläintäyt — on entisellä paikallaan. Vain KUVAN laatikko alkaa
 * laudan yläpuolelta, eli sen y on negatiivinen. Mekaanista muunnosta
 * ei siis tarvita mihinkään (js/fokusmitat.js, packien
 * laudat.maailmankartta), ja se on todennettu savukkeella: merkin ja
 * maaston suhde ei liiku pikseliäkään.
 */
const ARKIN_LEVEYSPIIRIT = { pohjoinen: 84, etela: -66 };
/** Syvimmän tason tiheys, px / lautayksikkö. */
const TIHEYS = 7.2;
/** Tasojen määrä (kerroin 2). Syvin taso on TASOJA − 1. */
const TASOJA = 8;

/*
 * ATLASKEHYS (Raamattu "LAATTAPYRAMIDI JA KARTAN PATINA", omistajan
 * päätös 30.8.2026 illalla): kaukaisimmalla zoomtasolla kartta makaa
 * paperilla — kermanvalkoinen marginaali, ohut kaksoisviivakehys
 * kulmakorein, kartussi, painajanrivi, kompassiruusu ja mittajana.
 *
 * KEHYS ON ARKILLA JOKA TASOLLA, EI VAIN ULOIMMALLA. Mitat skaalautuvat
 * moottorin S:llä, joten kehys on KAIKILLA tasoilla saman kokoinen
 * kartalla — vain terävämpi syvemmällä. Jos marginaali olisi vain
 * uloimmalla tasolla, arkin korkeus vaihtelisi tasoittain eikä
 * laattaruudukko olisi enää pyramidi.
 *
 * Marginaali on 232 ja 240 kuvapikseliä 6400 pikselin viitearkilla eli
 * 435 ja 450 lautayksikköä. Vain ylhäällä ja alhaalla: kiertävällä
 * laudalla ei ole sivureunaa.
 *
 * KEHYS EI OLE SAMA ASIA KUIN KARTAN SISÄLLÄ OLEVAT KALUSTEET.
 * Marginaali, kaksoisviiva, kartussi, mittajana ja painajanrivi elävät
 * arkin reunassa ja ovat joka tasolla. Valtamerten nimet ja
 * kompassiruusu ovat kartan ALALLA, ja ne piirretään vain uloimmille
 * tasoille (omistaja 30.8.2026) — ks. MERET ja KOMPASSI alempana.
 */
const KEHYS = {
  yla: 232,
  ala: 240,
  otsikko: 'MATKAKIRJA',
  alaotsikko: 'Unohdettu aarre',
  painaja: 'Painettu Matkakirjan kustantamossa MDCCCLXXIII',
  oikeudet: '© Matkakirja',
};
/*
 * VALTAMERTEN NIMET JA KOMPASSIRUUSU — KOOT MITATTU UUDESTAAN
 * 30.8.2026 (omistajan päätös samana päivänä: *"vain uloimmille
 * tasoille"*).
 *
 * Nämä kaksi ovat arkin kalusteita eli KARTAN mittakaavassa (moottorin
 * `S`), ja moottori piirtää ne vain tasoille, joilla koko meri mahtuu
 * näkymään — kynnys ja sen mittaus ovat maailmapiirto.js:n osiossa 7.
 * Kun syvät tasot jäävät pois, koot on mitoitettava sen mukaan, missä
 * ne oikeasti piirretään: alla olevat luvut ovat MITATTUJA eivätkä
 * arvattuja.
 *
 * NIMET: entiset koot olivat uloimmilla tasoilla näkymättömiä
 * (kirjaimen korkeus z0:lla 1,8 px, z1:llä 3,6 px). Suurin mahdollinen
 * suurennos tulee siitä, kuinka paljon avovettä nimen ympärillä on:
 * tiukin on ATLANTIN VALTAMERI, jonka puolikas leveys (9,85°) täyttää
 * 42 % lähimmästä rannasta (23,5° itään, Länsi-Afrikka). 80 %:n
 * täyttöaste antaa kertoimeksi 1,9 — ja se on todennettu myös silmällä:
 * 1,9:llä nimen ja Afrikan väliin jää selvä rako, 2,2:lla viimeinen I
 * osuu rannikkoon. Kaikki koot on siksi kerrottu 1,9:llä, jolloin
 * typografinen hierarkia (Tyynimeri suurin) säilyy sellaisenaan.
 *
 * KOMPASSI: sama koe omalla mitallaan. Lähin maa ruusun keskipisteestä
 * on 14,1° (Pitcairnin saariryhmä), ja nykyinen ulkokehä on 9,2°.
 * Kerroin 1,5 vie kehän 13,8°:een eli juuri avoveden sisään; 1,9 veisi
 * sen 17,5°:een, jolloin kehä kulkisi saarten yli. Ruusun halkaisija
 * on tällöin 207 px tasolla z2 ja 104 px tasolla z1.
 */
const KOMPASSI = { lon: -132, lat: -38, sade: 198 };
const MERET = [
  { nimi: 'TYYNIMERI', lon: -142, lat: 4, koko: 49 },
  { nimi: 'TYYNIMERI', lon: 163, lat: 18, koko: 49 },
  { nimi: 'ATLANTIN VALTAMERI', lon: -38, lat: 26, koko: 42 },
  { nimi: 'ETELÄINEN ATLANTTI', lon: -18, lat: -30, koko: 36 },
  { nimi: 'INTIAN VALTAMERI', lon: 78, lat: -28, koko: 42 },
  { nimi: 'JÄÄMERI', lon: 110, lat: 80.5, koko: 38 },
  { nimi: 'ETELÄINEN JÄÄMERI', lon: 60, lat: -61.5, koko: 34 },
];
/*
 * Kynnys on moottorin oma (maailmapiirto.js KALUSTEIDEN_YLARAJA); tämä
 * on sen kopio umpimeren karsintaa varten, ja ne on pidettävä samana.
 */
const KALUSTEIDEN_YLARAJA = 0.3;

/*
 * TASON 0 LEVEYS johdetaan syvimmästä: 86 400 / 2^7 = 675 px.
 * Tasot ovat siis 675, 1350, 2700, 5400, 10 800, 21 600, 43 200, 86 400.
 */
const TASO0 = (12000 * TIHEYS) / 2 ** (TASOJA - 1);

/* ------------------------------------------------------------ argumentit */

const argv = process.argv.slice(2);
const kohdekansio = argv[0];
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);

if (!kohdekansio || kohdekansio.startsWith('--')) {
  console.error('Käyttö: node tools/generoi-laattapyramidi.mjs <kohdekansio> '
    + '[--data <kansio>] [--tasot 0-4] [--alue lon0,lat0,lon1,lat1] '
    + '[--laatta 512] [--laatu 0.9] [--muoto webp] [--kuiva] '
    + '[--vain-lista] [--paikkaus <lähdeversio>] '
    + '[--saumatesti [--saumakohta sarake,rivi]]');
  process.exit(1);
}

const dataKansio = resolve(valitsin('data',
  process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta')));
const MUOTO = valitsin('muoto', 'webp');
const LAATU = Number(valitsin('laatu', 0.9));
const LAATTA = Number(valitsin('laatta', 512));
/*
 * LOHKO: montako laattaa kerrallaan piirretään YHTENÄ kuvana, joka
 * vasta sitten leikataan laatoiksi.
 *
 * Laatta kerrallaan piirtäminen maksaa paljon enemmän kuin sen
 * pikselit: jokainen kutsu varaa canvasin, ajaa kaksi koko kuvan
 * getImageData/putImageData-kierrosta (rae ja reunahäivytys) ja
 * pakkaa oman base64-siirtonsa. Mitattuna (30.8.2026, ks.
 * docs/moduulit/laattapyramidi.md) yksi laatta kerrallaan jäi 0,63
 * Mpx/s:aan, kun yhtenä isona kuvana sama moottori piirtää 1,39
 * Mpx/s. Lohko poistaa eron: pikselityö on sama, mutta kiinteä
 * kustannus jaetaan lohkon laattojen kesken.
 *
 * 4 x 4 laattaa on 2048 x 2048 pikseliä eli 16 megatavua ImageDataa —
 * mahtuu vaivatta, ja jakaa kiinteän kustannuksen kuudellatoista.
 * `--lohko 1` palauttaa laatta kerrallaan -tavan vertailua varten.
 */
const LOHKO = Number(valitsin('lohko', 4));
/*
 * KORKEUSDATAN TARKKUUS KAARIMINUUTTEINA (omistajan päätös 30.8.2026:
 * 3 kaariminuuttia KAIKILLA tasoilla).
 *
 * ETOPO1:n natiivi yksi kaariminuutti on tässä mittakaavassa pelkkää
 * kohinaa varjostuksessa: varjo lasketaan naapuriruutujen EROSTA, ja
 * yhden kaariminuutin naapurierot ovat suurelta osin mittauskohinaa.
 * Keskiarvoistava harvennus on alipäästösuodatin — pinta on pehmeämpi,
 * ei köyhempi. Tarkempi ajo on myöhemmin pelkkä tämän luvun muutos
 * samalle laattaruudukolle, joten sitä ei tehdä nyt.
 *
 * 3 kaariminuuttia = 0,05°, joka on tools/hae-korkeusruudukko.mjs:n oma
 * ruutu — aineistoa ei siis tarvitse hakea uudestaan.
 */
const KAARIMINUUTIT = Number(valitsin('kaariminuutit', 3));
const RUUTU = Number(valitsin('ruutu', KAARIMINUUTIT / 60));
const KUIVA = lippu('kuiva');
/*
 * VERSIO on laattojen polun osa ämpärissä
 * (julisteet/pyramidi/<versio>/z…). Luettelo asuu versioimattomassa
 * osoitteessa ja kertoo version, joten laatat saavat ikuisen
 * välimuistin eikä sisältöpäivitys voi jättää selaimeen puolikasta
 * karttaa kahdesta ajosta.
 */
const VERSIO = valitsin('versio', new Date().toISOString().slice(0, 10));
/*
 * NOSTOTASO (omistaja 31.8.2026 ilta): karttanostot poltetaan omaan
 * LÄPINÄKYVÄÄN laattapyramidiin, ei pohjaan. `--nostotaso` ajaa VAIN
 * nostotason: ei aineistoa, ei maastoa, ei paperia — pelkkä nostojen
 * muste alfa-webp-laatoiksi polkuun nostot/z<taso>/<sarake>/<rivi>.
 *
 * TASOT VAIN z5–z7 (omistajan päätös: "Voisi poistaa näkyvistä
 * kauemmilla zoom tasoilla" — jana ≤ ~200 km). Kaukotasoilla laattoja
 * ei ole olemassa, joten piilotus on ilmainen; selain häivyttää
 * kerroksen pehmeästi rajalla (js/laattapyramidi.js).
 *
 * NOSTOVERSIO on nostotason oma versio-osa polussa. Koko mallin
 * päähyöty on NOPEA UUSINTAPOLTTO: kun nostoja tulee lisää, ajetaan
 * vain nostotaso uudella nostoversiolla ja pohja pysyy ikuisessa
 * välimuistissaan — siksi tason versio on erotettava pohjan versiosta.
 * Yhteisajossa ne ovat sama merkkijono.
 */
const NOSTOTASO = lippu('nostotaso');
const NOSTOVERSIO = valitsin('nostoversio', VERSIO);
/*
 * PAIKKAUS (`--paikkaus <lähdeversio>`) — RAJATUN ALUEEN KORJAUS.
 *
 * Koko pyramidin uudelleenajo on tunteja, mutta virhe on melkein aina
 * paikallinen: yhden järven väri, yhden vuoren nimi, yhden saaren
 * rannikko. Paikkausajo piirtää VAIN alueeseen osuvat laatat (`--alue`)
 * ja kopioi loput lähdeversiosta uuteen versiopolkuun ämpärin sisällä
 * palvelinkopiona. Mitattuna Kreikan kokoinen laatikko on 55 laattaa
 * kaikilta kahdeksalta tasolta eli minuutteja — ei tunteja.
 *
 * TÄMÄ TOIMII VAIN KOSKA LAATTA EI RIIPU NAAPURISTAAN. Jokainen laatta
 * lasketaan arkin koordinaateista, ja patina on sidottu arkin pikseliin
 * (ks. REUNUS ja `arkki`-asetus lohkopiirrossa) — sama laatta samasta
 * aineistosta on tavulleen sama riippumatta siitä, piirrettiinkö se
 * maailma-ajossa vai alueajossa. Paikatun ja kopioidun laatan väliin ei
 * siis voi syntyä saumaa.
 *
 * TÄMÄ LIPPU EI PIIRRÄ MITÄÄN ERI TAVALLA. Se on pelkkää
 * KIRJANPITOA luettelossa: mistä versiosta muuttumattomat laatat
 * kopioitiin ja mikä laatikko piirrettiin uudelleen. Ilman sitä
 * `pyramidi.json` väittäisi paikatusta versiosta joko liikaa
 * (`alue` = koko pyramidi olisi vain tuo laatikko) tai liian vähän
 * (ei jälkeä siitä, että versio on koottu kahdesta ajosta).
 *
 * Itse kopion ja turvatarkistukset tekee tools/paikkaa-pyramidi.mjs;
 * tämä työkalu piirtää ja luetteloi, kuten aina.
 */
const PAIKKAUS_LAHDE = valitsin('paikkaus', null);
if (PAIKKAUS_LAHDE && PAIKKAUS_LAHDE === VERSIO) {
  console.error(`--paikkaus: lähdeversio ja uusi versio ovat sama (${VERSIO}). `
    + 'Paikkaus ei saa koskaan kirjoittaa lähteen polkuun.');
  process.exit(1);
}
/** Nostotason matalin taso: kaukotasoilla nostolaattoja ei ole. */
const NOSTO_ALIN = 5;
/*
 * VIIVATASO (omistaja 31.8.2026 ilta): reittiverkko, erikoispiirit ja
 * MAIDEN RAJAT poltetaan omaan LÄPINÄKYVÄÄN laattapyramidiin nostojen
 * rinnalle. `--viivataso` ajaa VAIN sen: ei korkeusruudukkoa, ei
 * merimaskia, ei maastoa — pelkkä viivojen muste alfa-webp-laatoiksi
 * polkuun viivat/z<taso>/<sarake>/<rivi>.
 *
 * TASOT z0–z7, TOISIN KUIN NOSTOTASOLLA. Erikoispiirit ja rajat
 * kulkevat kartan poikki joka tasolla ja ovat mielekkäitä joka
 * tasolla; nosto on merkki yhdessä pisteessä, ja kaukaa se olisi
 * pelkkä täplä. Reittipassi kuitenkin OHITETAAN z0:lla: siellä veto on
 * alle 0,01 pikseliä leveä eikä Skia piirrä siitä mitään (mitattu —
 * laatta on tavulleen sama kuin ilman reittejä), joten sen laattoja ei
 * lasketa peitteeseen eikä kirjoiteta levylle.
 *
 * VIIVAVERSIO on tason oma versio-osa polussa, samasta syystä kuin
 * nostotasolla: reittiverkon tai rajasetin muuttuessa ajetaan vain
 * viivataso uudella versiolla ja pohja pysyy ikuisessa
 * välimuistissaan.
 */
const VIIVATASO = lippu('viivataso');
const VIIVAVERSIO = valitsin('viivaversio', VERSIO);
/** Se taso, jolta alkaen reittipassi piirretään (ks. VIIVATASO). */
const VIIVA_REITIT_ALIN = 1;
/*
 * RAJASETTI on DATAA, ei koodia (omistaja 31.8.2026 ilta: rajojen oma
 * taso on tärkeä siksikin, että myöhemmin voidaan mallintaa
 * *"eri valtioiden kehityksiä vuosien saatossa"*). Setin nimi menee
 * luetteloon (`viivataso.rajat`), joten ämpäristä ja pelistä näkee,
 * minkä aikakauden rajat kartalla ovat.
 */
const RAJASETTI = valitsin('rajasetti', 'nykyiset');
if (!RAJASETIT[RAJASETTI]) {
  console.error(`Tuntematon rajasetti: ${RAJASETTI} `
    + `(tunnetut: ${Object.keys(RAJASETIT).join(', ')})`);
  process.exit(1);
}
if (NOSTOTASO && VIIVATASO) {
  console.error('--nostotaso ja --viivataso ovat eri ajoja; anna vain toinen.');
  process.exit(1);
}
/*
 * HARVA PYRAMIDI (omistaja 30.8.2026): syvimmillä tasoilla umpimeren
 * laattoja ei generoida lainkaan, ja peli maalaa niiden tilalle
 * merisävyn. Laatta jätetään pois vain, jos SEN KOKO ALALLA ei ole
 * maata, ei järveä, ei asteverkon viivaa eikä valtameren nimeä — ja
 * jos sen syvyysvaihtelu mahtuu HARVA_RAJA-kanavaeroon, jolloin
 * tasainen sävy on silmälle sama asia.
 */
/*
 * PATINA POLTETAAN LAATTOIHIN (Raamattu: *"patina poltetaan
 * laattoihin"*). Passi on sama tools/patina.mjs, jota lehtiputki
 * ajaa — ei kopiota, vaan sama resepti samasta tiedostosta.
 *
 * REUNUS ON SE, MIKÄ TEKEE SIITÄ JATKUVAN. Patinan paikalliset
 * operaattorit (rantaetäisyys meren litistykseen, akvarellin
 * reunakertymä, musteen leviäminen, kohdistusheitto, pienennetyt
 * kentät) lukevat naapuripikseleitä. Lohkon reunalla naapureita ei
 * olisi, ja jokainen lohko saisi oman reunavirheensä — ruudukko
 * näkyisi. Siksi lohko piirretään REUNUKSEN verran isompana, patina
 * ajetaan koko alalle ja laatat leikataan vasta reunuksen sisältä.
 * 64 pikseliä on moninkertaisesti suurin operaattorin ulottuvuus
 * (rantavyö 7 px, leviäminen 3 px, kahdeksasosakenttä 8 px).
 */
const PATINA_TASO = valitsin('patina', 'taysi');
/*
 * NOSTOTASO SAA AINA OMAN RESEPTINSÄ (RESEPTIT.nosto): läpinäkyvän
 * mustekerroksen paperivakiopassit — sävytys, rosoisuus, leviäminen,
 * rae — ilman pohjan maastopasseja, jotka lukisivat tyhjää kangasta.
 * `--patina ei` kytkee patinan pois myös nostotasolta.
 */
const PATINA = PATINA_TASO === 'ei' ? null
  : ((NOSTOTASO || VIIVATASO) ? RESEPTIT.nosto : RESEPTIT[PATINA_TASO]);
if (PATINA_TASO !== 'ei' && !PATINA) {
  console.error(`Tuntematon patinataso: ${PATINA_TASO}`);
  process.exit(1);
}
/**
 * Reunuksen leveys pikseleinä.
 *
 * KIINTEÄ LUKU KELPAA VASTA NYT. Ennen paperivakiokorjausta patinan
 * operaattorit skaalautuivat `s`:llä (= tason leveys / 6400), jolloin
 * syvimmällä tasolla rantavyö oli 7 · 13,5 = 95 pikseliä ja reunuksen
 * oli pakko kasvaa tason mukana. Nyt jokainen paikallinen operaattori
 * on paperivakio, joten sama luku riittää joka tasolle.
 *
 * 9 on suurin viitesäde reseptissä (SYVYYS.rantaVali yläraja 7,
 * KOHDISTUS 2,6, LEVIAMINEN 2) pyöristettynä ylöspäin; +16 kattaa
 * pienennettyjen kenttien (J4, J8) reunavaikutuksen.
 *
 * REUNUS PYÖRISTETÄÄN KAHDEKSAN MONIKERRAKSI, ja se on korjaus eikä
 * siisteyttä. Patina laskee meren ja reunakertymän PIENENNETYISTÄ
 * KENTISTÄ (neljäsosa ja kahdeksasosa), joiden ruudukko alkaa kankaan
 * nurkasta. Jos kankaan nurkka on eri kohdassa arkkia modulo 8, saman
 * maailmankohdan pikselit putoavat eri ämpäreihin, keskiarvot eroavat
 * ja reunakertymä piirtyy hitusen eri kohtaan. Laattakoko 512 on
 * jaollinen kahdeksalla, joten kun reunuskin on, jokainen kangas alkaa
 * arkin pikselistä joka on jaollinen kahdeksalla — ja pienennetyt
 * ruudukot osuvat kaikilla lohkoilla samaan kohtaan.
 */
function reunusTasolle() {
  const annettu = valitsin('reunus', null);
  if (annettu !== null) return Number(annettu);
  /*
   * MITTAKAAVA ON PAPERIN, EI TASON (30.8.2026, paperivakiokorjaus).
   *
   * Kun jokainen paikallinen operaattori on paperivakio (`paperiS`),
   * niiden ulottuma on sama joka tasolla eikä reunuksen tarvitse enää
   * kasvaa tason mukana. Aiemmin z7 sai 144 pikselin reunuksen, jolloin
   * 4 x 4 laatan lohko piirrettiin 2336 x 2336 pikselinä 2048:n sijaan
   * eli 30 % ylimääräistä työtä; nyt reunus on 32 ja ylimääräinen työ
   * 6 %. Tason `mitat` jää parametriksi, koska reunus on tason
   * ominaisuus siinä missä laattaruudukkokin.
   */
  return 8 * Math.ceil((9 * PAPERI_S + 16) / 8);
}
const HARVA = lippu('harva');
const HARVA_ALIN_TASO = Number(valitsin('harva-alin', 4));
/*
 * KARSINTARAJA SEURAA SYVYYSRAMPIN KONTRASTIA.
 *
 * Raja on kanavaeroina ilmaistu "tämä laatta on niin tasainen ettei
 * sitä kannata piirtää". Kun syvyysramppia jyrkennettiin 30.8.2026
 * kertoimella 2,10 (tools/fokuskartta/piirto.js SYVYYS_ANKKURIT,
 * omistajan valinta *"vahvempi sävyporrastus"*), sama FYYSINEN
 * tasaisuus alkoi tuottaa 2,10× enemmän kanavaeroa — vanhalla rajalla
 * 2 lähes jokainen ulappalaatta olisi ylittänyt sen, karsinta olisi
 * lakannut ja syvimmän tason ajo moninkertaistunut. Raja on siis 4
 * (tarkka vastine olisi 4,2; pyöristys alaspäin karsii hitusen
 * varovaisemmin eli piirtää hitusen enemmän).
 */
const HARVA_RAJA = Number(valitsin('harva-raja', 4));

/** "0-4" tai "3" -> [0,1,2,3,4] / [3]. */
function lueTasot(teksti) {
  const osat = String(teksti).split('-').map(Number);
  if (osat.length === 1) return [osat[0]];
  const ulos = [];
  for (let z = osat[0]; z <= osat[1]; z += 1) ulos.push(z);
  return ulos;
}
/*
 * Nostotasoajossa tasot ovat oletuksena ja ENINTÄÄN z5–z7: matalampien
 * tasojen nostolaattoja ei ole olemassa (ks. NOSTOTASO), joten pyyntö
 * niistä olisi hiljainen virhe. Rajaus tehdään tässä eikä kiellolla,
 * jotta `--tasot 6-7` (osittainen uusintapoltto) toimii.
 */
const TASOT = lueTasot(valitsin('tasot', NOSTOTASO ? `${NOSTO_ALIN}-${TASOJA - 1}` : `0-${TASOJA - 1}`))
  .filter((z) => !NOSTOTASO || z >= NOSTO_ALIN);
/*
 * VIIVATASO KATTAA KAIKKI TASOT (z0–z7), joten oletusrajausta ei ole
 * eikä yllä olevaa suodatinta tarvita — `--tasot` toimii sellaisenaan.
 */

/*
 * SARAKEKAISTA (--sarakkeet a-b) on parven/matriisin jakotapa.
 *
 * Miksi sarakkeina eikä asteina: `--alue` rajaa asteilla, ja silloin
 * kaistan reuna osuu keskelle lohkoa. Lohko piirretään silti
 * kokonaan, joten reunalla tehdään työtä jota ei kirjoiteta levylle —
 * mitattuna Kreikan alueajossa 62 % hukkaa. Sarakeväli osuu
 * lohkorajalle, ja hukka on nolla.
 *
 * Väli on SULKEUTUVA molemmista päistä ja tulkitaan SYVIMMÄN tason
 * sarakkeina; matalammilla tasoilla se skaalataan, jotta sama kaista
 * kattaa saman maantieteellisen siivun joka tasolla.
 */
const sarakeTeksti = valitsin('sarakkeet', null);
const SARAKKEET = sarakeTeksti
  ? (() => {
    const [a, b] = String(sarakeTeksti).split('-').map(Number);
    return { alku: Math.min(a, b), loppu: Math.max(a, b) };
  })()
  : null;

/** "lon0,lat0,lon1,lat1" -> rajaus asteina, tai null = koko maailma. */
const alueTeksti = valitsin('alue', null);
const ALUE = alueTeksti
  ? (() => {
    const [a, b, c, d] = alueTeksti.split(',').map(Number);
    return {
      lon0: Math.min(a, c), lat0: Math.min(b, d), lon1: Math.max(a, c), lat1: Math.max(b, d),
    };
  })()
  : null;

/*
 * Paikkaus ilman laatikkoa olisi hiljainen koko maailman uudelleenajo
 * uuteen versioon — juuri se, mitä paikkauksella vältetään.
 */
if (PAIKKAUS_LAHDE && !ALUE) {
  console.error('--paikkaus vaatii --alue lon0,lat0,lon1,lat1.');
  process.exit(1);
}

/* ------------------------------------------------------------ arkki */

const moduuli = await import(LAUTA.moduuli.replace('./', `${JUURI}/`));
const pack = moduuli[LAUTA.vienti];
if (!pack?.map?.width) throw new Error('Laudan mittoja ei löytynyt.');

/*
 * POLTETTAVAT KARTTANOSTOT (Raamattu 31.8.2026, KARTTANOSTOT POLTETAAN
 * LAATTOIHIN). Ladonta ajetaan KERRAN koko arkille — ei lohkoittain —
 * täsmälleen samasta syystä kuin paikannimillä aikanaan: nimiöiden
 * väistö ja merkkien erottelu ovat GLOBAALEJA päätöksiä, ja
 * lohkoittain ladottuna naapurit päätyisivät eri tulokseen. Silloin
 * nosto katkeaisi laattarajalle.
 *
 * Tulos on pelkkää dataa laudan yksiköissä, ja piirtäjä (maailmapiirto)
 * skaalaa sen laatan tarkkuuteen. Sama joukko piirtyy jokaiseen
 * lohkoon, joka sen alueen kattaa.
 */
const nostot = keraaNostot(pack);
console.log(nostojenYhteenveto(nostot.tilasto));
for (const rivi of nostot.tilasto.estot) console.log(`    esto ${rivi}`);

const { projektio } = LAUTA;
const kaava = laudanProjektio(projektio);

/*
 * ARKKI = KARTTA-ALA, EI ENEMPÄÄ. Lukitut mitat mittaavat tasan tämän
 * laatikon (ks. ARKIN_LEVEYSPIIRIT): y = 0 on 76 °N, koska projektion
 * `pohjoinen` on 76, ja alareuna on sen peilikuva 76 °S.
 *
 * Lukuja EI pyöristetä lautayksiköiksi. Arkin korkeus on 6422,99, ja
 * juuri se kerrottuna tiheydellä antaa lukitun 46 246 pikseliä;
 * pyöristys 6423:een siirtäisi alareunaa 0,07 yksikköä ja tekisi
 * luvuista hitusen eri kuin päätöksessä.
 */
const laudanBbox = {
  x: 0,
  y: kaava.lautaY(ARKIN_LEVEYSPIIRIT.pohjoinen),
  w: pack.map.width,
  h: kaava.lautaY(ARKIN_LEVEYSPIIRIT.etela) - kaava.lautaY(ARKIN_LEVEYSPIIRIT.pohjoinen),
};
/*
 * KAKSI LAATIKKOA. `laudanBbox` on KARTTA-ALA, johon kamera ajaa;
 * `arkinBbox` on koko painettu arkki, eli kartta-ala ja sen ylä- ja
 * alapuolella kehyksen paperimarginaali. Laatat pilkotaan ARKISTA,
 * jotta marginaali on osa samaa ruudukkoa.
 */
const YKSIKKOA_PER_PIKSELI = laudanBbox.w / 6400;
const arkinBbox = {
  x: 0,
  y: laudanBbox.y - KEHYS.yla * YKSIKKOA_PER_PIKSELI,
  w: laudanBbox.w,
  h: laudanBbox.h + (KEHYS.yla + KEHYS.ala) * YKSIKKOA_PER_PIKSELI,
};

/* Aineiston laatikko: koko lauta, kuten yleislehdellä. */
const snap = (v, alas) => (alas ? Math.floor(v / RUUTU) : Math.ceil(v / RUUTU)) * RUUTU;
const laatikko = {
  lon0: snap(kaava.lautaLon(0) - 0.5, true),
  lon1: snap(kaava.lautaLon(arkinBbox.w) + 0.5, false),
  lat0: snap(kaava.lautaLat(arkinBbox.y + arkinBbox.h) - 0.5, true),
  lat1: snap(kaava.lautaLat(arkinBbox.y) + 0.5, false),
};

/* --------------------------------------------- viivatason sisältö */

/*
 * VIIVATASON SISÄLTÖ KERÄTÄÄN ENNEN TYÖLISTAA, koska työlista ON
 * peite (ks. viivatasonPeite) ja peite lasketaan tästä. Kumpikaan
 * lähde ei ole raskas eikä kumpikaan tarvitse verkkoa: reitit tulevat
 * laudalta (js/packs, sama `edge.poly` jota peli kävelee) ja rajat
 * repon omasta rajasetistä. Juuri siksi myös `--vain-luettelo` osaa
 * laskea peitteen ilman aineistoa ja ilman selainta — ja siksi
 * luettelon bittikartta ei voi olla eri mieltä levyn kanssa.
 */
const lautaSisalto = await keraaSisalto(pack, join(JUURI, 'js', 'packs'));
/*
 * RAJAT LAUDAN YKSIKÖIHIN KERRAN. Setti on data (tools/fokuskartta/
 * rajat.mjs); tämä ajo ei tiedä valtioista mitään, vain viivoista.
 */
const rajaViivat = rajatLaudalle(lueRajaviivasto(RAJASETTI), kaava, laatikko);

/**
 * Yhden tason mitat. Leveys on aina 2 * edellinen, joten sarakemäärä
 * pysyy kokonaislukuna ja laudan kierros osuu tasan sarakerajalle.
 */
function tasonMitat(z) {
  const leveys = TASO0 * 2 ** z;
  const px = leveys / arkinBbox.w;
  const korkeus = Math.round(arkinBbox.h * px);
  return {
    z,
    leveys,
    korkeus,
    px,
    sarakkeita: Math.ceil(leveys / LAATTA),
    riveja: Math.ceil(korkeus / LAATTA),
  };
}

/** Laatan laatikko laudan koordinaateissa. */
function laatanBbox(mitat, sarake, rivi) {
  const w = Math.min(LAATTA, mitat.leveys - sarake * LAATTA);
  const h = Math.min(LAATTA, mitat.korkeus - rivi * LAATTA);
  return {
    x: arkinBbox.x + (sarake * LAATTA) / mitat.px,
    y: arkinBbox.y + (rivi * LAATTA) / mitat.px,
    w: w / mitat.px,
    h: h / mitat.px,
    pw: w,
    ph: h,
  };
}

/** Osuuko laatta pyydettyyn alueeseen? Null = koko maailma. */
function alueella(mitat, sarake, rivi) {
  if (!ALUE) return true;
  const b = laatanBbox(mitat, sarake, rivi);
  const lat1 = kaava.lautaLat(b.y);
  const lat0 = kaava.lautaLat(b.y + b.h);
  if (lat1 < ALUE.lat0 || lat0 > ALUE.lat1) return false;
  /*
   * PITUUSASTE ON YMPYRÄ, EI JANA. Lauta alkaa asteelta −175, joten sen
   * itälaita on numeroina lännempää kuin länsilaita; suora vertailu
   * pudottaisi päivämääränrajan yli menevät laatat.
   *
   * Kummankin välin nurkkien testaaminen ei riitä: uloimmilla tasoilla
   * yksi laatta on 90 astetta leveä, jolloin ALUE on kokonaan LAATAN
   * sisällä eikä yksikään laatan nurkka osu alueeseen. Leikkaus
   * testataan siksi molempiin suuntiin.
   */
  const lonA = kaava.lautaLon(b.x);
  const laatanLev = (b.w / projektio.leveys) * 360;
  const alueenLev = ((((ALUE.lon1 - ALUE.lon0) % 360) + 360) % 360) || 360;
  const ero = (a, b2) => (((b2 - a) % 360) + 360) % 360;
  return ero(lonA, ALUE.lon0) < laatanLev || ero(ALUE.lon0, lonA) < alueenLev;
}

/* ------------------------------------------------- nostotason peite */

/*
 * MISSÄ LAATOISSA ON NOSTOJEN MUSTETTA — pelkästä geometriasta.
 *
 * Nostotason tyhjiä laattoja EI generoida eikä viedä: z5–z7:llä
 * laattapaikkoja on yli 20 000, mutta nostollisia vain murto-osa.
 * Sama funktio päättää sekä sen, MITKÄ laatat piirretään, että sen,
 * mitkä luettelon bittikartta väittää oleviksi — yksi lähde, eikä
 * peli voi pyytää laattaa jota ajo ei kirjoittanut.
 *
 * LASKENTA ON GEOMETRIAA EIKÄ PIIRTOA, koska luettelojobi
 * (`--vain-luettelo`) ajaa ilman selainta ja koska matriisin shardit
 * eivät näe toistensa levyä. Merkin musteen ulottuma tulee pelin
 * omasta mitasta (js/fokusnosto-symbolit.js nostosymPolttoLaatikko —
 * sama taulukko jolla nimiö ladotaan), nostoviiva janan päistä, ja
 * päälle patinan paperivakiomarginaali. Laatikko on VÄLJÄ: ylimitta
 * maksaa muutaman lähes tyhjän laatan, alimitta katkaisisi noston
 * laattarajalle.
 */
/** Patinan musteen ulottuma laatan reunan yli kuvapikseleinä
 *  (leviäminen 2 px + rosoisuus + varaa). */
const NOSTO_MARGINAALI_PX = 12;

/** Poltettavien nostojen mustelaatikot laudan yksiköissä (kerran). */
const nostoLaatikot = nostot.merkit.filter((m) => m.poltettava).map((m) => {
  const lk = nostosymPolttoLaatikko(m);
  let x1 = m.x + lk.x1 * m.porras;
  let x2 = m.x + lk.x2 * m.porras;
  let y1 = m.y + lk.y1 * m.porras;
  let y2 = m.y + lk.y2 * m.porras;
  const v = m.viiva;
  if (v) {
    const vara = (v.leveys ?? 0) * 2;
    x1 = Math.min(x1, Math.min(v.x1, v.x2) - vara);
    x2 = Math.max(x2, Math.max(v.x1, v.x2) + vara);
    y1 = Math.min(y1, Math.min(v.y1, v.y2) - vara);
    y2 = Math.max(y2, Math.max(v.y1, v.y2) + vara);
  }
  return {
    x1, x2, y1, y2,
  };
});

/**
 * Tason nostolliset laatat joukkona "sarake:rivi".
 *
 * Sauman yli ulottuva muste leikkautuu arkin reunaan täsmälleen kuten
 * pohjaan poltettunakin (canvasin leikkuri), joten sarakkeet
 * rajataan arkin sisään eikä kierretä.
 */
function nostotasonPeite(mitat) {
  const joukko = new Set();
  for (const lk of nostoLaatikot) {
    const px0 = (lk.x1 - arkinBbox.x) * mitat.px - NOSTO_MARGINAALI_PX;
    const px1 = (lk.x2 - arkinBbox.x) * mitat.px + NOSTO_MARGINAALI_PX;
    const py0 = (lk.y1 - arkinBbox.y) * mitat.px - NOSTO_MARGINAALI_PX;
    const py1 = (lk.y2 - arkinBbox.y) * mitat.px + NOSTO_MARGINAALI_PX;
    const s0 = Math.max(0, Math.floor(px0 / LAATTA));
    const s1 = Math.min(mitat.sarakkeita - 1, Math.floor(px1 / LAATTA));
    const r0 = Math.max(0, Math.floor(py0 / LAATTA));
    const r1 = Math.min(mitat.riveja - 1, Math.floor(py1 / LAATTA));
    for (let rivi = r0; rivi <= r1; rivi += 1) {
      for (let sarake = s0; sarake <= s1; sarake += 1) {
        joukko.add(`${sarake}:${rivi}`);
      }
    }
  }
  return joukko;
}

/* ------------------------------------------------- viivatason peite */

/*
 * MISSÄ LAATOISSA ON VIIVOJEN MUSTETTA — pelkästä geometriasta.
 *
 * Sama sopimus kuin nostotasolla: TÄMÄ FUNKTIO ANTAA SEKÄ TYÖLISTAN
 * ETTÄ LUETTELON BITTIKARTAN. Yksi lähde, eikä peli voi pyytää
 * laattaa, jota ajo ei kirjoittanut.
 *
 * === MIKSI RASTEROIVA ASKELLUS EIKÄ JANAN LAATIKKO =================
 *
 * Nostolla muste on pisteessä, joten sen laatikko on tiukka. Reitti on
 * MURTOVIIVA, ja jos jokaisen janan ympärille otettaisiin sen
 * suorakulmainen laatikko, viistoon kulkeva jana veisi mukanaan koko
 * laatikkonsa nurkat — laattoja, joiden läpi viiva ei kulje. Mitattuna
 * (viivataso-peite, 31.8.2026) z7:n reittipeite oli laatikoilla 3 713
 * laattaa ja rasteroivalla askelluksella noin 2 500 eli kolmanneksen
 * vähemmän.
 *
 * Askellus käy janan LÄPI SARAKE KERRALLAAN: kussakin laattasarakkeessa
 * lasketaan janan oma y-väli sen sarakkeen alalla ja levitetään se
 * musteen ulottumalla. Tulos on janan todellinen naapurusto eikä sen
 * laatikko.
 */

/** Laatikko ARKIN KUVAPIKSELEINÄ -> laatat joukkoon. */
function lisaaLaatikko(joukko, mitat, px0, px1, py0, py1) {
  const s0 = Math.max(0, Math.floor(px0 / LAATTA));
  const s1 = Math.min(mitat.sarakkeita - 1, Math.floor(px1 / LAATTA));
  const r0 = Math.max(0, Math.floor(py0 / LAATTA));
  const r1 = Math.min(mitat.riveja - 1, Math.floor(py1 / LAATTA));
  if (s1 < s0 || r1 < r0) return;
  for (let rivi = r0; rivi <= r1; rivi += 1) {
    for (let sarake = s0; sarake <= s1; sarake += 1) joukko.add(`${sarake}:${rivi}`);
  }
}

/**
 * Yksi jana arkin kuvapikseleissä, ulottuma `m` pikseliä joka suuntaan.
 *
 * Sarake kerrallaan: janan y-väli lasketaan sen sarakkeen x-alalla
 * (marginaali mukaan lukien) ja levitetään ulottumalla. Kun jana ei
 * yllä sarakkeeseen muuten kuin marginaalinsa kautta, t-parametri
 * kiinnittyy päätepisteeseen — ja juuri se on lähin kohta.
 */
function lisaaJana(joukko, mitat, ax, ay, bx, by, m) {
  const x0 = Math.min(ax, bx);
  const x1 = Math.max(ax, bx);
  const s0 = Math.max(0, Math.floor((x0 - m) / LAATTA));
  const s1 = Math.min(mitat.sarakkeita - 1, Math.floor((x1 + m) / LAATTA));
  if (s1 < s0) return;
  const dx = bx - ax;
  for (let sarake = s0; sarake <= s1; sarake += 1) {
    const kx0 = Math.max(x0, sarake * LAATTA - m);
    const kx1 = Math.min(x1, (sarake + 1) * LAATTA - 1 + m);
    let ya;
    let yb;
    if (dx === 0) { ya = ay; yb = by; } else {
      const t0 = Math.min(1, Math.max(0, (kx0 - ax) / dx));
      const t1 = Math.min(1, Math.max(0, (kx1 - ax) / dx));
      ya = ay + (by - ay) * t0;
      yb = ay + (by - ay) * t1;
    }
    const py0 = Math.min(ya, yb) - m;
    const py1 = Math.max(ya, yb) + m;
    const r0 = Math.max(0, Math.floor(py0 / LAATTA));
    const r1 = Math.min(mitat.riveja - 1, Math.floor(py1 / LAATTA));
    for (let rivi = r0; rivi <= r1; rivi += 1) joukko.add(`${sarake}:${rivi}`);
  }
}

/*
 * MUSTEEN ULOTTUMA REITTIYKSIKKÖINÄ (R = px / 7,2, koska paperiS = 1).
 * Luvut ovat maailmapiirto.js:n REITTITYYLIstä ja katkokuvion
 * heitoista laskettuja YLÄRAJOJA — ylimitta maksaa muutaman lähes
 * tyhjän laatan, alimitta katkaisisi viivan laattarajalle.
 *
 *   reitti  solmuheitto 0,35 + katkon sivu 0,40 + kaari 0,55
 *           + puoli veton leveyttä (2,8 · 1,12 / 2 = 1,57)   = 2,87
 *   helmi   säde 4,6 + puoli kehää (1,9 / 2)                 = 5,55
 *   lento   sivu 0,40 + kaari 0,55 + 2,5 · 1,10 / 2          = 2,33
 *   raja    puoli veton leveyttä (1,8 / 2)                   = 0,90
 */
const ULOTTUMA = {
  reitti: 2.9, helmi: 5.6, lento: 2.4, raja: 1.0,
};
/** Patinan musteen ulottuma laatan reunan yli (sama kuin nostolla). */
const VIIVA_MARGINAALI_PX = NOSTO_MARGINAALI_PX;

/*
 * ERIKOISPIIRIT: neljä VAAKAVIIVAA koko arkin leveydeltä ja
 * nollameridiaani PYSTYVIIVANA koko kartta-alan korkeudelta, joten
 * peite on rivi- ja sarakekaistoja.
 *
 * NIMET MAHTUVAT KAISTAAN, eikä niille tarvita omia sarakekaistoja:
 * nimi keskitetään 13 · 0,72 = 9,4 pikseliä viivan yläpuolelle ja on
 * 13 pikseliä korkea, eli se ulottuu 15,9 px viivan yläpuolelle ja
 * 2,9 px sen alapuolelle — kaista y−16 … y+4 kattaa sekä viivan että
 * nimen. Nollameridiaanin nimi kulkee pystyssä viivan oikealla
 * puolella, ja sen leveys (9,4 … 22,4 px) on sarakekaistassa.
 */
const EKLIPTIIKKA = 23.4365;
const PIIRIEN_LATIT = [0, EKLIPTIIKKA, -EKLIPTIIKKA, 90 - EKLIPTIIKKA];
const PIIRI_YLOS = 16;
const PIIRI_ALAS = 4;
const MERIDIAANI_VASEN = 2;
const MERIDIAANI_OIKEA = 24;

/**
 * Tason viivalliset laatat joukkona "sarake:rivi".
 *
 * REITTIPASSI OHITETAAN z0:LLA (ks. VIIVATASO): siellä veto on alle
 * 0,01 pikseliä leveä eikä Skia piirrä siitä mitään, joten sen laatat
 * olisivat täysin läpinäkyviä.
 */
function viivatasonPeite(mitat, osat = null) {
  const O = osat ?? {};
  const joukko = new Set();
  const R = mitat.px / TIHEYS;                // reittiyksikkö kuvapikseleinä
  const px = (bx) => (bx - arkinBbox.x) * mitat.px;
  const py = (by) => (by - arkinBbox.y) * mitat.px;

  /* --- reitit, helmet ja lennot --------------------------------- */
  if (O.reitit !== false && mitat.z >= VIIVA_REITIT_ALIN) {
    /*
     * LAUDAN KIERTO: reitin murtoviiva on avattu sauman yli
     * (js/rules.js avaaSauma), joten sen x voi olla laudan
     * ulkopuolella ja piirto tekee siitä kolme kappaletta. Peitteen on
     * nähtävä samat kolme; sarakkeet rajautuvat arkin sisään
     * (lisaaJana), joten kierrosta ei tarvitse erikseen katkaista.
     */
    const KIERROS = projektio.leveys ?? 0;
    const siirrot = KIERROS ? [-KIERROS, 0, KIERROS] : [0];
    const lisaaPoly = (poly, ulottumaR) => {
      const m = ulottumaR * R + VIIVA_MARGINAALI_PX;
      for (const d of siirrot) {
        for (let i = 1; i < poly.length; i += 1) {
          const ax = poly[i - 1][0] + d;
          const bx = poly[i][0] + d;
          // Sauman yli avattu hyppy ei ole jana (js/rules.js avaaSauma).
          if (KIERROS && Math.abs(bx - ax) > KIERROS / 2) continue;
          lisaaJana(joukko, mitat, px(ax), py(poly[i - 1][1]), px(bx), py(poly[i][1]), m);
        }
      }
    };
    for (const r of lautaSisalto.reitit) lisaaPoly(r.poly, ULOTTUMA.reitti);
    for (const r of lautaSisalto.lentoreitit) lisaaPoly(r.poly, ULOTTUMA.lento);
    const mh = ULOTTUMA.helmi * R + VIIVA_MARGINAALI_PX;
    for (const r of lautaSisalto.reitit) {
      for (const [bx, by] of r.askelmat) {
        for (const d of siirrot) {
          lisaaLaatikko(joukko, mitat, px(bx + d) - mh, px(bx + d) + mh,
            py(by) - mh, py(by) + mh);
        }
      }
    }
  }

  /* --- maiden rajat --------------------------------------------- */
  if (O.rajat !== false) {
    const m = ULOTTUMA.raja * R + VIIVA_MARGINAALI_PX;
    for (const viiva of rajaViivat) {
      for (let i = 1; i < viiva.length; i += 1) {
        lisaaJana(joukko, mitat, px(viiva[i - 1][0]), py(viiva[i - 1][1]),
          px(viiva[i][0]), py(viiva[i][1]), m);
      }
    }
  }

  /* --- erikoispiirit ja nollameridiaani -------------------------- */
  if (O.piirit !== false) {
    const S = mitat.leveys / 6400;
    const yYla = Math.round(KEHYS.yla * S);
    const yAla = mitat.korkeus - Math.round(KEHYS.ala * S);
    for (const lat of PIIRIEN_LATIT) {
      const y = py(kaava.lautaY(lat));
      if (y < yYla || y > yAla) continue;
      lisaaLaatikko(joukko, mitat, 0, mitat.leveys - 1,
        y - PIIRI_YLOS - VIIVA_MARGINAALI_PX, y + PIIRI_ALAS + VIIVA_MARGINAALI_PX);
    }
    const x = px(kaava.lautaX(0));
    lisaaLaatikko(joukko, mitat, x - MERIDIAANI_VASEN - VIIVA_MARGINAALI_PX,
      x + MERIDIAANI_OIKEA + VIIVA_MARGINAALI_PX, yYla, yAla);
  }
  return joukko;
}

/** Tason nostolaatasto bittikarttana base64:nä (sama muoto kuin
 *  pohjan `laatasto`, ks. teeLuettelo — peli purkaa ne samalla
 *  koodilla). */
function nostotasoBase64(mitat, peite) {
  const tavut = Buffer.alloc(Math.ceil((mitat.sarakkeita * mitat.riveja) / 8));
  for (const avain of peite) {
    const [sarake, rivi] = avain.split(':').map(Number);
    const i = rivi * mitat.sarakkeita + sarake;
    tavut[i >> 3] |= 1 << (i & 7);
  }
  return tavut.toString('base64');
}

/* ------------------------------------------------------------ luettelo */

const tasot = TASOT.map(tasonMitat);
const tyot = [];
/*
 * LOHKOT, EI LAATAT. Tarvittavat laatat kerätään joukoksi ja lohkot
 * niiden ympäriltä: lohko piirretään, jos yksikin sen laatoista on
 * pyydetty. Alueajossa lohkon reunalle jää siis muutama laatta, joita
 * ei pyydetty — ne piirtyvät ilmaiseksi mukana mutta EI KIRJOITETA
 * levylle, jottei alueen raja muutu sen mukaan mihin lohkoruudukko
 * sattuu osumaan.
 */
/*
 * NOSTOTASOAJOSSA TYÖLISTA ON PEITE: vain laatat, joissa on nostojen
 * mustetta (nostotasonPeite). Sama peite menee luetteloon, joten
 * työlista ja luettelo eivät voi olla eri mieltä.
 */
/*
 * VIIVATASOAJOSSA SAMA SÄÄNTÖ: työlista on viivatasonPeite, ja sama
 * peite menee luetteloon.
 */
const nostoPeitteet = new Map(
  NOSTOTASO ? tasot.map((m) => [m.z, nostotasonPeite(m)]) : [],
);
const viivaPeitteet = new Map(
  VIIVATASO ? tasot.map((m) => [m.z, viivatasonPeite(m)]) : [],
);
const tarvitaan = new Set();
const lohkot = new Map();
for (const mitat of tasot) {
  const peite = NOSTOTASO ? nostoPeitteet.get(mitat.z) : viivaPeitteet.get(mitat.z);
  for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
      if ((NOSTOTASO || VIIVATASO) && !peite.has(`${sarake}:${rivi}`)) continue;
      if (!alueella(mitat, sarake, rivi)) continue;
      if (SARAKKEET) {
        /*
         * Kaista on annettu syvimmän tason sarakkeina; tällä tasolla
         * sama siivu on kerrointa 2^(syvin - z) kapeampi.
         */
        const jako = 2 ** ((TASOJA - 1) - mitat.z);
        const alku = Math.floor(SARAKKEET.alku / jako);
        const loppu = Math.floor(SARAKKEET.loppu / jako);
        if (sarake < alku || sarake > loppu) continue;
      }
      tarvitaan.add(`${mitat.z}:${sarake}:${rivi}`);
      tyot.push({ mitat, sarake, rivi });
      const bx = Math.floor(sarake / LOHKO);
      const by = Math.floor(rivi / LOHKO);
      const k = `${mitat.z}:${bx}:${by}`;
      if (!lohkot.has(k)) lohkot.set(k, { mitat, bx, by });
    }
  }
}

const alkoi = Date.now();
console.log(`Laattapyramidi — lauta ${LAUTA.id}, laatta ${LAATTA} px, ${MUOTO} q${LAATU}`);
console.log(`  arkki laudalla  x ${arkinBbox.x} y ${arkinBbox.y.toFixed(1)} `
  + `w ${arkinBbox.w} h ${arkinBbox.h.toFixed(1)}`);
/*
 * PAINOJÄLKI ON PAPERIVAKIO JOKA TASOLLA.
 *
 * Raamattu, "PAPERIVAKIOT JA KARTTAVAKIOT": paperin ja painokoneen
 * ominaisuudet ovat vakioita ulostulopikseleinä, maaston ominaisuudet
 * kartan mittakaavassa. Pyramidissa nämä eroavat, koska taso ei ole
 * sama arkki tarkempana vaan sama arkki isompana ja peli katsoo sitä
 * noin 1:1 — siksi sekä moottori että patina saavat tästä `paperiS: 1`
 * ja kaikki painojälki (viivanleveydet, rae, syy, kohdistus,
 * leviäminen, rantaviivan suojavyö) on joka tasolla samanlevyistä.
 * Kartan mittakaavaan jäävät arkin geometria ja kalusteet.
 *
 * ILMAN TÄTÄ (mitattu 30.8.2026, Ateenan seutu): rannikon kynä oli
 * z3:lla 1 px, z6:lla 11 px ja z7:llä 19-23 px, ja syvin taso oli
 * tummanruskeaa vyötä eikä karttaa.
 */
const PAPERI_S = 1;
console.log(`  painojälki      paperivakioina (paperiS ${PAPERI_S}); `
  + 'maasto ja kalusteet kartan mittakaavassa');

for (const m of tasot) {
  const kaikki = m.sarakkeita * m.riveja;
  const tassa = tyot.filter((t) => t.mitat.z === m.z).length;
  console.log(`  z${m.z}  ${m.leveys} x ${m.korkeus} px  `
    + `${m.px.toFixed(4)} px/yksikkö  ${m.sarakkeita} x ${m.riveja} = ${kaikki} laattaa`
    + (ALUE ? `  (alueella ${tassa})` : ''));
}
console.log(`  laattoja ajossa ${tyot.length} (${lohkot.size} lohkoa à ${LOHKO}x${LOHKO})`);
if (ALUE) {
  console.log(`  alue            lon ${ALUE.lon0}..${ALUE.lon1} lat ${ALUE.lat0}..${ALUE.lat1}`);
}
/*
 * Umpimeren tasainen sävy; asetetaan vasta karsinnassa, mutta
 * esitellään tässä, koska luettelo voidaan kirjoittaa ilman ajoa
 * (--vain-luettelo).
 */
let meriSavy = null;

/*
 * VIIVATASON PEITEMITTAUS (--peitemittaus): montako laattaa kukin
 * sisältölaji tuo tasolle. Rajapassi on uusi sisältö, ja sen hinta on
 * raportoitava — se on ainoa luku, jolla tason koon kasvun voi
 * perustella tai kiistää.
 */
if (VIIVATASO && lippu('peitemittaus')) {
  console.log('\nVIIVATASON PEITE  (laattoja tasolla)');
  console.log('   z   ruudukko      reitit   rajat  piirit   yhteensä   rajojen lisä');
  const summat = {
    reitit: 0, rajat: 0, piirit: 0, kaikki: 0, lisa: 0,
  };
  for (const m of tasot) {
    const vainReitit = viivatasonPeite(m, { rajat: false, piirit: false });
    const vainRajat = viivatasonPeite(m, { reitit: false, piirit: false });
    const vainPiirit = viivatasonPeite(m, { reitit: false, rajat: false });
    const kaikki = viivatasonPeite(m);
    const ilmanRajoja = viivatasonPeite(m, { rajat: false });
    const lisa = kaikki.size - ilmanRajoja.size;
    summat.reitit += vainReitit.size;
    summat.rajat += vainRajat.size;
    summat.piirit += vainPiirit.size;
    summat.kaikki += kaikki.size;
    summat.lisa += lisa;
    console.log(`  ${m.z}  ${String(m.sarakkeita).padStart(4)}x${String(m.riveja).padStart(3)}  `
      + `${String(vainReitit.size).padStart(8)}${String(vainRajat.size).padStart(8)}`
      + `${String(vainPiirit.size).padStart(8)}${String(kaikki.size).padStart(11)}`
      + `${String(lisa).padStart(15)}`);
  }
  console.log(`  yht          ${String(summat.reitit).padStart(8)}`
    + `${String(summat.rajat).padStart(8)}${String(summat.piirit).padStart(8)}`
    + `${String(summat.kaikki).padStart(11)}${String(summat.lisa).padStart(15)}`);
}

/*
 * VAIN LISTA (`--vain-lista`): kirjoittaa työlistan — täsmälleen ne
 * laatat jotka TÄMÄ komento piirtäisi — tiedostoon `laatat.json` ilman
 * aineistoa, selainta ja piirtoa.
 *
 * TÄMÄ ON PAIKKAUKSEN TODISTUSAINEISTO. Paikkausajon jälkeen on
 * osoitettava, että vain alueen laatat muuttuivat ja kaikki muut ovat
 * bitilleen lähdeversion laattoja (tools/paikkaa-pyramidi.mjs vertaa).
 * Vertailu tarvitsee alueen laattajoukon, ja sen on oltava SAMA joukko
 * jonka piirto käyttää — ei uudelleen johdettu geometria, joka voisi
 * ajautua hitusen eri tulokseen ja vaientaa juuri sen laatan, joka
 * meni pieleen. Lista tulee siksi samasta `tyot`-taulukosta.
 */
if (lippu('vain-lista')) {
  mkdirSync(kohdekansio, { recursive: true });
  const polku = join(kohdekansio, 'laatat.json');
  writeFileSync(polku, `${JSON.stringify({
    versio: VERSIO,
    muoto: MUOTO,
    laatta: LAATTA,
    nostotaso: NOSTOTASO || undefined,
    alue: ALUE,
    tasot: TASOT,
    laatat: tyot.map(({ mitat, sarake, rivi }) => [mitat.z, sarake, rivi]),
  })}\n`);
  console.log(`\n--vain-lista: ${polku} (${tyot.length} laattaa)`);
  process.exit(0);
}

if (KUIVA) {
  console.log('\n--kuiva: vain luettelo, ei piirtoa.');
  process.exit(0);
}

/*
 * VAIN LUETTELO (--vain-luettelo): kirjoittaa pyramidi.jsonin ilman
 * aineistoa, selainta ja piirtoa.
 *
 * Tätä tarvitsee matriisiajo. Luettelo kuvaa KOKO pyramidin, eikä
 * yksikään shardi tunne muiden tasoja — jos shardit kirjoittaisivat
 * sen, viimeisenä valmistuva jättäisi ämpäriin luettelon, joka tuntee
 * vain omat tasonsa. Luettelo on pyramidin MUOTO eikä ajon tulos,
 * joten se syntyy pelkästä geometriasta.
 */
if (lippu('vain-luettelo')) {
  mkdirSync(kohdekansio, { recursive: true });
  const polku = join(kohdekansio, 'pyramidi.json');
  writeFileSync(polku, `${JSON.stringify(teeLuettelo(), null, 2)}\n`);
  console.log(`\n--vain-luettelo: ${polku} (${statSync(polku).size} tavua), `
    + `tasot ${tasot.map((m) => `z${m.z}`).join(' ')}, versio ${VERSIO}`);
  process.exit(0);
}

/* ------------------------------------------------------------ aineisto */

/*
 * NOSTOTASO EI TARVITSE AINEISTOA: kankaalle piirretään vain nostojen
 * muste, eikä korkeusruudukolla, rannikoilla tai sisällöllä ole siinä
 * mitään tehtävää. Juuri tämä tekee uusintapoltosta nopean — ja siksi
 * myös saumatesti ja harva karsinta (pohjakuvan ominaisuuksia) eivät
 * kuulu tähän tilaan.
 */
if (NOSTOTASO && (HARVA || lippu('harvamittaus') || lippu('saumatesti'))) {
  console.error('--nostotaso ei tue --harva/--harvamittaus/--saumatesti-lippuja.');
  process.exit(1);
}
/*
 * VIIVATASO TUKEE SAUMATESTIÄ, koska juuri siellä sauma voisi olla:
 * katkoviivan vaihe lasketaan reitin kaarenpituudesta ARKIN
 * koordinaateissa ja rajojen pistekuvion vaihe murtoviivan alusta.
 * Kumpaakaan ei saa laskea laatan omasta nurkasta, ja sauma on
 * todennettava eikä oletettava. Harva karsinta on pohjakuvan
 * ominaisuus eikä kuulu tänne.
 */
if (VIIVATASO && (HARVA || lippu('harvamittaus'))) {
  console.error('--viivataso ei tue --harva/--harvamittaus-lippuja.');
  process.exit(1);
}
let aineisto = null;
let sisalto = null;
if (!NOSTOTASO && !VIIVATASO) {
  console.log(`  aineisto        ${dataKansio}`);
  const aineistoAlkoi = Date.now();
  aineisto = await keraaMaailma({ kansio: dataKansio, laatikko, ruutu: RUUTU });
  console.log(`  korkeusruudukko ${aineisto.korkeus.w} x ${aineisto.korkeus.h} (${RUUTU}°) `
    + `· rannikko ${aineisto.rannikot.length} viivaa · järvet ${aineisto.jarvet.length}`);
  const aineistoSek = (Date.now() - aineistoAlkoi) / 1000;
  console.log(`  aineisto koossa ${aineistoSek.toFixed(1)} s`);

  /*
   * PYSYVÄ SISÄLTÖ: joet poltetaan pohjalaattoihin (ks.
   * tools/fokuskartta/sisalto.mjs). `--ilman-sisaltoa` jättää ne pois
   * — vertailukuvia varten.
   *
   * REITIT JA LENNOT EIVÄT ENÄÄ OLE POHJASSA (viivataso 31.8.2026
   * ilta): ne piirretään omalle läpinäkyvälle tasolleen, joten pohjan
   * sivu saa niiden tilalle tyhjät listat. Sivun koodi on sama
   * molemmissa tiloissa, ja ero on datassa — sama ratkaisu kuin
   * nostoilla.
   */
  sisalto = lippu('ilman-sisaltoa')
    ? null
    : { ...lautaSisalto, reitit: [], lentoreitit: [] };
  if (sisalto) console.log(`  sisältö         ${sisallonYhteenveto(sisalto)} `
    + '(reitit viivatasolla, eivät pohjassa)');
}

/* ------------------------------------------------------ harva pyramidi */

/*
 * UMPIMEREN LAATAT POIS (omistaja 30.8.2026).
 *
 * Kaksi kolmasosaa maapallosta on merta, ja syvimmillä tasoilla se on
 * tuhansia laattoja tasaista ulappaa. Ne jätetään generoimatta ja peli
 * maalaa niiden tilalle yhden merisävyn.
 *
 * LAATTA JÄTETÄÄN POIS VAIN, JOS SEN TILALLE MAALATTU TASAINEN SÄVY ON
 * SILMÄLLE SAMA ASIA. Ehtoja on neljä, ja jokainen niistä on
 * välttämätön:
 *
 *   1. ei maata eikä järveä laatan alalla (marginaalilla)
 *   2. syvyyden tuottama värivaihtelu enintään HARVA_RAJA kanavaa
 *   3. ei asteverkon viivaa laatan yli
 *   4. ei valtameren nimeä eikä kompassiruusua
 *
 * Ehtojen 3-4 unohtaminen olisi juuri se virhe, joka näkyy pelaajalle:
 * asteverkko katkeaisi keskellä ulappaa ja TYYNIMERI-teksti olisi
 * puolikas. Paperin rae menetetään näiltä laatoilta — se on tämän
 * säästön hinta, ja siksi tasainen sävy sallitaan vain siellä, missä
 * sävy on muutenkin tasainen.
 */
/* Nostotasoajossa aineistoa ei ole; harva karsinta on jo estetty. */
const K = aineisto?.korkeus ?? null;
const DLON = K ? (K.lon1 - K.lon0) / (K.w - 1) : 1;
const DLAT = K ? (K.lat1 - K.lat0) / (K.h - 1) : 1;
const MERIMASKI = aineisto?.meri ?? null;

/** Korkeus metreinä lähimmästä ruudusta; NaN ruudukon ulkopuolella. */
function korkeusPisteessa(lon, lat) {
  const x = Math.round((lon - K.lon0) / DLON);
  const y = Math.round((K.lat1 - lat) / DLAT);
  if (x < 0 || y < 0 || x > K.w - 1 || y > K.h - 1) return NaN;
  return K.grid[y * K.w + x];
}

/** Onko piste Natural Earthin meren alalla? */
function merenAlalla(lon, lat) {
  if (!MERIMASKI) return true;
  const x = Math.round((lon - K.lon0) / DLON);
  const y = Math.round((K.lat1 - lat) / DLAT);
  if (x < 0 || y < 0 || x > K.w - 1 || y > K.h - 1) return true;
  const i = y * K.w + x;
  return ((MERIMASKI[i >> 3] >> (i & 7)) & 1) === 1;
}

/** Syvyyssävy samalla asteikolla kuin piirtomoottorilla. */
function syvyysSavy(m) {
  const a = SYVYYS;
  if (m >= 0) return a[0].v;
  for (let i = 1; i < a.length; i += 1) {
    if (m >= a[i].m) {
      const p = a[i - 1];
      const q = a[i];
      const t = (m - p.m) / (q.m - p.m);
      return [0, 1, 2].map((c) => p.v[c] + (q.v[c] - p.v[c]) * t);
    }
  }
  return a[a.length - 1].v;
}

/** Järvirenkaiden karkeat laatikot asteina — järvi ei ole ulappaa. */
const JARVIEN_LAATIKOT = (aineisto?.jarvet ?? []).map((j) => {
  let lo = 180;
  let hi = -180;
  let la = 90;
  let lb = -90;
  for (const rengas of j.renkaat) {
    for (const [lon, lat] of rengas) {
      lo = Math.min(lo, lon); hi = Math.max(hi, lon);
      la = Math.min(la, lat); lb = Math.max(lb, lat);
    }
  }
  return { lon0: lo, lon1: hi, lat0: la, lat1: lb };
});

/**
 * Onko tämä laatta pelkkää tasaista ulappaa?
 * Palauttaa sävyn (skipattava) tai null (piirretään).
 */
function umpimeriSavy(mitat, sarake, rivi, syyt = null) {
  const ei = (syy) => { if (syyt) syyt.set(syy, (syyt.get(syy) ?? 0) + 1); return null; };
  const b = laatanBbox(mitat, sarake, rivi);
  const latP = kaava.lautaLat(b.y);
  const latE = kaava.lautaLat(b.y + b.h);
  const lonL = kaava.lautaLon(b.x);
  const lonO = kaava.lautaLon(b.x + b.w);
  // Marginaali: rantaviiva ei saa jäädä laatan reunan taakse.
  const dLat = Math.abs(latP - latE) * 0.06 + DLAT;
  const dLon = Math.abs(lonO - lonL) * 0.06 + DLON;

  /*
   * 3. asteverkko (moottorin oletusväli 20°)
   *
   * TÄMÄ EHTO ON VIIVATASON JÄLKEEN PELKKÄÄ VAROVAISUUTTA, eikä sitä
   * poistettu: erikoispiirit ovat nyt viivatasolla (TYYLI
   * `asteverkko: false`), joten pohjalaatan yli ei enää kulje yhtään
   * viivaa, jonka takia laatta pitäisi säästää. Ehto siis vain SÄÄSTÄÄ
   * muutaman laatan, jonka voisi karsia — ei koskaan karsi laattaa,
   * jossa on mustetta. Kun `--harva` seuraavan kerran ajetaan, tämän
   * voi mitata ja poistaa; nyt sitä ei kosketa, koska karsinta on
   * pohjakuvan ominaisuus eikä tämän erän asia.
   */
  const vali = 20;
  const yliMeridiaanin = Math.floor((lonO + dLon) / vali) > Math.floor((lonL - dLon) / vali);
  const yliLeveyspiirin = Math.floor((latP + dLat) / vali) > Math.floor((latE - dLat) / vali);
  if (yliMeridiaanin || yliLeveyspiirin) return ei('asteverkko');

  /*
   * 4. VALTAMERTEN NIMET JA KOMPASSI, LASKETTUNA PIIRRON OMISTA
   * MITOISTA.
   *
   * Mitat ovat moottorin viitetarkkuudessa (6400 px koko arkin
   * leveydelle), joten yksi viitepikseli on 12000/6400 = 1,875
   * lautayksikköä ja aste on 33,33 yksikköä. Väljä arvaus olisi tässä
   * kallis: se hylkäisi tuhansia laattoja, joissa ei ole mitään.
   *
   * EHTO KOSKEE VAIN NIITÄ TASOJA, JOILLA KALUSTEET PIIRRETÄÄN
   * (omistaja 30.8.2026, ks. MERET yllä). Syvemmillä tasoilla arkilla
   * ei ole merennimeä eikä ruusua, joten niiden varaama ala olisi
   * varaus tyhjästä — ja juuri syvät tasot ovat ne, joilla karsittavia
   * laattoja on tuhansia.
   */
  const YKS_PER_VIITE = LAUTA.projektio.leveys / 6400;
  const ASTE = LAUTA.projektio.leveys / 360;
  if (mitat.px <= KALUSTEIDEN_YLARAJA) {
    for (const m of MERET) {
      // Harvennettu versaaliteksti: leveys noin 0,72 · koko merkkiä kohti.
      const puoliLev = (m.nimi.length * m.koko * 0.72 * YKS_PER_VIITE) / 2 / ASTE;
      const puoliKork = (m.koko * 1.4 * YKS_PER_VIITE) / ASTE;
      if (m.lon > lonL - puoliLev && m.lon < lonO + puoliLev
        && m.lat > latE - puoliKork && m.lat < latP + puoliKork) return ei('nimi');
    }
    const kompassiAst = (KOMPASSI.sade * 1.15 * YKS_PER_VIITE) / ASTE;
    if (KOMPASSI.lon > lonL - kompassiAst && KOMPASSI.lon < lonO + kompassiAst
      && KOMPASSI.lat > latE - kompassiAst && KOMPASSI.lat < latP + kompassiAst) return ei('kompassi');
  }

  // 1b. järvet
  for (const j of JARVIEN_LAATIKOT) {
    if (j.lon1 > lonL - dLon && j.lon0 < lonO + dLon
      && j.lat1 > latE - dLat && j.lat0 < latP + dLat) return ei('jarvi');
  }

  // 1a + 2. maa ja syvyyden vaihtelu, näytteet laatan yli
  const N = 24;
  let matalin = Infinity;
  let syvin = -Infinity;
  for (let i = 0; i <= N; i += 1) {
    const lat = latE - dLat + ((latP + dLat) - (latE - dLat)) * (i / N);
    for (let j = 0; j <= N; j += 1) {
      const lon = lonL - dLon + ((lonO + dLon) - (lonL - dLon)) * (j / N);
      const m = korkeusPisteessa(lon, lat);
      if (!Number.isFinite(m)) return ei('ruudukon ulkopuoli');
      if (m >= 0 || !merenAlalla(lon, lat)) return ei('maata'); // maata
      matalin = Math.min(matalin, m);
      syvin = Math.max(syvin, m);
    }
  }
  const a = syvyysSavy(matalin);
  const c = syvyysSavy(syvin);
  const ero = Math.max(...[0, 1, 2].map((i) => Math.abs(a[i] - c[i])));
  if (ero > HARVA_RAJA) return ei('syvyysvaihtelu');
  return syvyysSavy((matalin + syvin) / 2).map((v) => Math.round(v));
}

/*
 * Karsinta ajetaan VASTA aineiston jälkeen, koska se lukee
 * korkeusruudukkoa. Karsitut laatat kirjataan tilastoon, jotta säästö
 * on mitattu luku eikä arvio.
 */
const karsittu = new Map();

/*
 * HARVAN SÄÄSTÖN MITTAUS ILMAN PIIRTOA (--harvamittaus).
 *
 * Säästö on SYVIEN TASOJEN ILMIÖ, eikä sitä voi mitata matalilta.
 * Uloimmilla tasoilla yksi laatta kattaa kymmeniä asteita, joten lähes
 * jokaisessa on rannikkoa tai asteverkon viiva — z0-z5:llä karsittavaa
 * ei ole käytännössä lainkaan. Syvimmällä tasolla laatta on 2,1
 * astetta, ja silloin umpimerta on paljon.
 *
 * Luokittelu on pelkkää ruudukon lukemista eikä vaadi selainta, joten
 * koko maailman syvimmätkin tasot voi mitata sekunneissa vaikka niiden
 * piirtäminen kestäisi tunnin. Juuri sitä varten tämä tila on.
 */
if (lippu('harvamittaus')) {
  console.log('\nHARVAN SÄÄSTÖ (luokittelu ilman piirtoa)');
  for (const mitat of tasot) {
    const syyt = new Map();
    let pois = 0;
    let kaikki = 0;
    /*
     * TAVUT MYÖS, JOS LAATAT OVAT LEVYLLÄ.
     *
     * Laattamäärä yksin JOHTAA HARHAAN: karsittavat laatat ovat juuri
     * ne, jotka pakkautuvat parhaiten (tasainen ulappa), joten 22 %
     * laatoista voi olla 8 % tavuista. Kun kohdekansiossa on tiheänä
     * ajettu taso, säästö lasketaan sen oikeista tiedostokoista.
     */
    let tavutKaikki = 0;
    let tavutPois = 0;
    for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
      for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
        kaikki += 1;
        const karsitaan = Boolean(umpimeriSavy(mitat, sarake, rivi, syyt));
        if (karsitaan) pois += 1;
        const polku = join(kohdekansio, `z${mitat.z}`, String(sarake), `${rivi}.${MUOTO}`);
        if (!existsSync(polku)) continue;
        const koko = statSync(polku).size;
        tavutKaikki += koko;
        if (karsitaan) tavutPois += koko;
      }
    }
    const lista = [...syyt.entries()].sort((a, b) => b[1] - a[1])
      .map(([s, n]) => `${s} ${n}`).join(', ');
    console.log(`  z${mitat.z}  ${kaikki} laattaa → umpimerta ${pois} `
      + `(${((100 * pois) / kaikki).toFixed(1)} %) · jää ${kaikki - pois}`);
    if (tavutKaikki) {
      console.log(`        tavuina ${(tavutKaikki / 1e6).toFixed(2)} Mt → säästö `
        + `${(tavutPois / 1e6).toFixed(2)} Mt (${((100 * tavutPois) / tavutKaikki).toFixed(1)} %)`);
    }
    console.log(`        piirrettävä koska: ${lista}`);
  }
  process.exit(0);
}

if (HARVA) {
  const karsintaAlkoi = Date.now();
  const jaljelle = [];
  for (const tyo of tyot) {
    if (tyo.mitat.z >= HARVA_ALIN_TASO) {
      const savy = umpimeriSavy(tyo.mitat, tyo.sarake, tyo.rivi);
      if (savy) {
        meriSavy = meriSavy ?? savy;
        karsittu.set(tyo.mitat.z, (karsittu.get(tyo.mitat.z) ?? 0) + 1);
        continue;
      }
    }
    jaljelle.push(tyo);
  }
  console.log(`  harva karsinta  ${((Date.now() - karsintaAlkoi) / 1000).toFixed(1)} s`);
  for (const m of tasot) {
    const kaikki = tyot.filter((t) => t.mitat.z === m.z).length;
    const pois = karsittu.get(m.z) ?? 0;
    if (!kaikki) continue;
    console.log(`    z${m.z}  ${kaikki} → ${kaikki - pois} laattaa `
      + `(umpimerta ${pois}, ${((100 * pois) / kaikki).toFixed(1)} %)`);
  }
  // Työlista ja lohkot uusiksi karsitusta joukosta.
  tyot.length = 0;
  tyot.push(...jaljelle);
  tarvitaan.clear();
  lohkot.clear();
  for (const t of tyot) {
    tarvitaan.add(`${t.mitat.z}:${t.sarake}:${t.rivi}`);
    const bx = Math.floor(t.sarake / LOHKO);
    const by = Math.floor(t.rivi / LOHKO);
    const k = `${t.mitat.z}:${bx}:${by}`;
    if (!lohkot.has(k)) lohkot.set(k, { mitat: t.mitat, bx, by });
  }
  console.log(`  karsinnan jälkeen ${tyot.length} laattaa (${lohkot.size} lohkoa)`);
}

/* ------------------------------------------------------------ palvelin */

const tyokansio = join(tmpdir(), `pyramidi-${process.pid}`);
mkdirSync(tyokansio, { recursive: true });
if (!NOSTOTASO && !VIIVATASO) {
  const { grid, ...korkeudenMitat } = aineisto.korkeus;
  writeFileSync(join(tyokansio, 'korkeus.bin'),
    Buffer.from(grid.buffer, grid.byteOffset, grid.byteLength));
  if (aineisto.meri) writeFileSync(join(tyokansio, 'meri.bin'), Buffer.from(aineisto.meri.buffer));
  writeFileSync(join(tyokansio, 'aineisto.json'), JSON.stringify({
    korkeus: korkeudenMitat,
    meri: Boolean(aineisto.meri),
    rannikot: aineisto.rannikot,
    /*
     * MEREN RENKAAT: sama harvennettu kärkipistejoukko kuin `rannikot`,
     * mutta suljettuina renkaina. Moottori erottaa niistä maan ja meren
     * (maailmapiirto.js "VEKTORI ON AUKTORITEETTI"), jolloin maaväri ei
     * voi olla rantaviivan kanssa eri mieltä.
     */
    meriRenkaat: aineisto.meriRenkaat,
    jarvet: aineisto.jarvet,
  }));
}
/*
 * Sisältö omana tiedostonaan: se on satoja kilotavuja (jokien
 * polyviivat), eikä sitä kannata ahtaa aineisto.jsonin sekaan.
 */
/*
 * VIIVATASOAJO SAA OMAN SISÄLTÖNSÄ: reitit, lennot ja rajat — ei
 * jokia, koska joet jäävät pohjaan. Tiedosto on sama nimi ja sama
 * muoto molemmissa tiloissa, joten sivun koodi ei haaraudu.
 */
writeFileSync(join(tyokansio, 'sisalto.json'), JSON.stringify(VIIVATASO
  ? {
    reitit: lautaSisalto.reitit,
    lentoreitit: lautaSisalto.lentoreitit,
    joet: [],
    rajat: rajaViivat,
  }
  : (sisalto ?? null)));
/*
 * POLTETTAVAT KARTTANOSTOT omana tiedostonaan samasta syystä kuin
 * sisältö. Piirtoon menee VAIN `poltettava`-merkit: estetyn maan
 * merkit lasketaan mukaan tilastoon, mutta niitä ei polteta eikä
 * kirjata luetteloon, jolloin peli piirtää ne elävinä.
 */
/*
 * NOSTOT MENEVÄT VAIN NOSTOTASOLLE (omistaja 31.8.2026 ilta): pohja
 * ajetaan jatkossa ILMAN nostoja, ja poltettavat merkit piirretään
 * omaan läpinäkyvään pyramidiin `--nostotaso`-ajossa. Pohja-ajon
 * sivu saa siksi tyhjän listan — sivun koodi on sama molemmissa
 * tiloissa, ja ero on datassa.
 */
writeFileSync(join(tyokansio, 'nostot.json'),
  JSON.stringify(NOSTOTASO ? nostot.merkit.filter((m) => m.poltettava) : []));

/*
 * AINEISTO PURETAAN KERRAN, EI KERRAN LAATTAA KOHTI.
 *
 * Yleislehti lataa sivun uudestaan joka renderöinnille, koska niitä on
 * yksi tai kaksi. Pyramidissa niitä on tuhansia, ja 52 megatavun
 * ruudukon purku on kymmeniä sekunteja: sivu avataan siksi kerran ja
 * jokainen laatta on yksi funktiokutsu jo pystyssä olevaan sivuun.
 */
const SIVU = `<!doctype html><meta charset="utf-8"><title>laattapyramidi</title>
<body style="margin:0;background:#333"><canvas id="k"></canvas>
<script type="module">
  import { piirraMaailma, piirraNostotaso, piirraViivataso } from './maailmapiirto.js';
  /*
   * PELIN OMA SYMBOLIKIRJASTO. Poltettu merkki piirretään täsmälleen
   * samalla funktiolla kuin elävä (Raamattu 31.8.2026: poltetun ja
   * selaimen on tultava samasta lähteestä) — generaattorissa ei ole
   * yhtään merkin muotoa.
   */
  import { piirraNostosymPolttoon } from './fokusnosto-symbolit.js';
  /*
   * NOSTOTASOAJO EI LATAA AINEISTOA: läpinäkyvälle tasolle piirretään
   * vain nostojen muste, eikä korkeusruudukkoa tai rannikoita ole
   * edes kirjoitettu levylle (ks. työkansio).
   */
  const NOSTOTASO = ${NOSTOTASO};
  /*
   * VIIVATASOAJO LATAA VAIN SISÄLLÖN: reitit, lennot ja rajat ovat
   * murtoviivoja laudan yksiköissä, eikä korkeusruudukolla tai
   * merimaskilla ole läpinäkyvällä tasolla mitään tehtävää.
   */
  const VIIVATASO = ${VIIVATASO};
  const VIIVA_REITIT_ALIN = ${VIIVA_REITIT_ALIN};
  const nostot = await (await fetch('./nostot.json')).json().catch(() => null);
  let aineisto = null;
  let sisalto = null;
  if (!NOSTOTASO) {
    sisalto = await (await fetch('./sisalto.json')).json();
  }
  if (!NOSTOTASO && !VIIVATASO) {
    aineisto = await (await fetch('./aineisto.json')).json();
    aineisto.korkeus.grid = new Int16Array(await (await fetch('./korkeus.bin')).arrayBuffer());
    aineisto.meri = aineisto.meri
      ? new Uint8Array(await (await fetch('./meri.bin')).arrayBuffer()) : null;
  }
  const kangas = document.getElementById('k');
  const pala = document.createElement('canvas');
  const pctx = pala.getContext('2d');
  /*
   * Yksi lohko piirretään yhtenä kuvana ja leikataan vasta sitten
   * laatoiksi. Leikkaus on drawImage eli pelkkää muistin kopiointia;
   * kallis osuus (pikselisilmukat, rae, häivytys) ajettiin kerran.
   */
  /*
   * SAUMATESTI: sama alue kerran isona kuvana ja kerran laattoina.
   * Vertailu tehdään RAAKOIHIN PIKSELEIHIN eikä tiedostoihin, koska
   * webp-pakkaus ei ole tavulleen toistettava, kun kuva tulee
   * enkooderille eri kokoisena — sauman todiste on pikseleissä.
   */
  /*
   * Yksi ala piirrettynä annetulla kankaan koolla, patina ajettuna ja
   * reunus leikattuna pois — TÄSMÄLLEEN sama polku kuin tuotannossa.
   */
  const piirraPala = async (bbox, siirto, leveys, korkeusPx, koko, patina) => {
    const R = patina ? patina.reunus : 0;
    const px = leveys / bbox.w;
    const kbbox = {
      x: bbox.x - R / px, y: bbox.y - R / px,
      w: bbox.w + (2 * R) / px, h: bbox.h + (2 * R) / px,
    };
    /*
     * SAUMATESTI AJAA SEN PIIRRON, JOTA TESTATAAN. Viivatasolla sauma
     * voisi syntyä katkoviivan vaiheesta ja rajojen pistekuviosta;
     * molemmat lasketaan arkin koordinaateista, ja tämä on se koe,
     * joka sen todentaa.
     */
    const yhteiset = {
      bbox: kbbox,
      projektio: patinaProjektio,
      leveys: leveys + 2 * R,
      tyyli: saumaTyyli,
      koko,
      siirto: { x: siirto.x - R, y: siirto.y - R },
      arkki: saumaArkki,
      sisalto,
      paperiS: saumaPaperiS,
    };
    if (VIIVATASO) {
      piirraViivataso(kangas, {
        ...yhteiset, passit: { reitit: saumaZ >= VIIVA_REITIT_ALIN },
      });
    } else {
      piirraMaailma(kangas, aineisto, {
        ...yhteiset, nostot, piirraNosto: piirraNostosymPolttoon,
      });
    }
    const kctx = kangas.getContext('2d', { willReadFrequently: true });
    if (patina && window.__patina) {
      const tulos = await window.__patina({
        pikselit: kctx.getImageData(0, 0, kangas.width, kangas.height),
        resepti: patina.resepti,
        tausta: patina.tausta,
        maailma: kbbox,
        koko,
        paperiS: saumaPaperiS,
        palauta: 'pikselit',
      });
      kctx.putImageData(tulos.pikselit, 0, 0);
    }
    return kctx.getImageData(R, R, leveys, korkeusPx);
  };

  let patinaProjektio = null;
  let saumaTyyli = null;
  let saumaArkki = null;
  let saumaPaperiS = null;
  let saumaZ = 7;

  /*
   * SAUMATESTI: sama alue kerran isona kuvana ja kerran laattoina.
   * Vertailu tehdään RAAKOIHIN PIKSELEIHIN eikä tiedostoihin, koska
   * webp-pakkaus ei ole tavulleen toistettava, kun kuva tulee
   * enkooderille eri kokoisena — sauman todiste on pikseleissä.
   *
   * PATINA ON MUKANA, kun se on päällä: juuri sen paikalliset
   * operaattorit ovat se osa, joka voisi katketa laatan reunalla.
   */
  window.__sauma = async (perus, laatta, ruudukko, patina) => {
    patinaProjektio = perus.projektio;
    saumaTyyli = perus.tyyli;
    saumaArkki = perus.arkki;
    saumaPaperiS = perus.paperiS ?? null;
    saumaZ = perus.__z ?? 7;
    const iso = await piirraPala(
      perus.bbox, perus.siirto, ruudukko * laatta, ruudukko * laatta, perus.koko, patina,
    );
    let pahin = 0;
    let eroja = 0;
    // Reunalla = enintään 2 pikselin päässä sisäisestä laattarajasta.
    // Oikea sauma näkyisi VAIN siellä; kelluvan pisteen pyöristys
    // vektorien reunoilla on hajallaan pitkin kuvaa.
    let reunalla = 0;
    let pahinReunalla = 0;
    const yksikkoaPerPx = perus.bbox.w / (ruudukko * laatta);
    for (let ry = 0; ry < ruudukko; ry += 1) {
      for (let rx = 0; rx < ruudukko; rx += 1) {
        const pala2 = await piirraPala(
          {
            x: perus.bbox.x + rx * laatta * yksikkoaPerPx,
            y: perus.bbox.y + ry * laatta * yksikkoaPerPx,
            w: laatta * yksikkoaPerPx,
            h: laatta * yksikkoaPerPx,
          },
          { x: perus.siirto.x + rx * laatta, y: perus.siirto.y + ry * laatta },
          laatta, laatta, perus.koko, patina,
        );
        for (let y = 0; y < laatta; y += 1) {
          for (let x = 0; x < laatta; x += 1) {
            const a = ((ry * laatta + y) * iso.width + rx * laatta + x) * 4;
            const b = (y * laatta + x) * 4;
            const isox = rx * laatta + x;
            const isoy = ry * laatta + y;
            const rajalla = (isox > 1 && Math.abs(isox - laatta) <= 2)
              || (isoy > 1 && Math.abs(isoy - laatta) <= 2);
            for (let k = 0; k < 4; k += 1) {
              const d2 = Math.abs(iso.data[a + k] - pala2.data[b + k]);
              if (!d2) continue;
              eroja += 1;
              pahin = Math.max(pahin, d2);
              if (rajalla) { reunalla += 1; pahinReunalla = Math.max(pahinReunalla, d2); }
            }
          }
        }
      }
    }
    return {
      pahin, eroja, reunalla, pahinReunalla, pikseleita: iso.width * iso.height,
    };
  };
  /*
   * NIMIÖIDEN LADONTA ON SIIRRETTY PELIIN (omistajan päätös 30.8.2026).
   *
   * Täällä oli ladonta, joka ajettiin kerran tasoa kohti koko arkille
   * ja poltettiin laattoihin: 345 nimiötä, 0 päällekkäisyyttä,
   * tärkeysjärjestys lähtökaupunki > lentokenttä > reittisolmun aste.
   * Se logiikka ei kadonnut — se on nyt js/karttanimet.js:ssä samoine
   * sääntöineen, mittauksineen ja kynnyksineen.
   *
   * SYY MUUTTOON: laatta ei tiedä katsojan pikselitiheyttä, ja asiakas
   * valitsee tason luvusta skaala x dpr. Poltettu nimi oli siksi
   * iPadilla kolmasosan kokoinen työpöytään verrattuna, eikä sitä voi
   * korjata generaattorissa (perustelu kokonaisuudessaan
   * tools/fokuskartta/maailmapiirto.js, osio 8b).
   *
   * PYRAMIDI KERTOO ITSE, KUMMASSA MAAILMASSA SE ON: luettelon kenttä
   * "nimiot: false" sanoo pelille, että näissä laatoissa ei ole nimiä
   * ja peli saa latoa ne. Vanha luettelo ilman kenttää tarkoittaa
   * vanhoja laattoja, joissa nimet ovat — silloin peli vaikenee, eikä
   * nimi voi olla kartalla kahdesti eikä nollaa kertaa.
   */

  /*
   * LOHKORAJAN TODISTUS — tuotannon oma tilanne.
   *
   * __sauma vertaa 1024 pikselin kangasta 512 pikselin kankaisiin.
   * Se on ANKARAMPI koe kuin tuotanto: selaimen viivan- ja
   * kirjasinrasterointi riippuu hitusen kankaan koosta, joten erikokoiset
   * kankaat eroavat vaikka syöte olisi sama. Tuotannossa kaikki lohkot
   * ovat SAMAN KOKOISIA ja niiden nurkat eroavat vain kokonaisella
   * pikselimäärällä — ja kokonaispikselin siirto on rasteroinnille
   * täsmällinen operaatio.
   *
   * Tämä koe tekee juuri sen: piirtää kaksi VIERELLISTÄ samankokoista
   * lohkoa ja vertaa sitä aluetta, jonka molemmat kattavat (A:n oikea
   * reunus vs. B:n vasen laita). Jos ne ovat samat, laattojen väliin ei
   * voi jäädä saumaa, koska kumpikin laatta on leikattu tuosta alueesta.
   */
  window.__lohkoraja = async (perus, laatta, patina) => {
    const R = patina ? patina.reunus : 0;
    const W = 2 * laatta;
    const px = W / perus.bbox.w;
    const piirra = async (siirtoPx) => {
      const bbox = {
        x: perus.bbox.x + (siirtoPx - R) / px,
        y: perus.bbox.y - R / px,
        w: (W + 2 * R) / px,
        h: (W + 2 * R) / px,
      };
      const yhteiset = {
        bbox,
        projektio: perus.projektio,
        leveys: W + 2 * R,
        tyyli: perus.tyyli,
        koko: perus.koko,
        siirto: { x: perus.siirto.x + siirtoPx - R, y: perus.siirto.y - R },
        arkki: perus.arkki,
        sisalto,
        paperiS: perus.paperiS ?? null,
      };
      if (VIIVATASO) {
        piirraViivataso(kangas, {
          ...yhteiset, passit: { reitit: (perus.__z ?? 7) >= VIIVA_REITIT_ALIN },
        });
      } else {
        piirraMaailma(kangas, aineisto, {
          ...yhteiset, nostot, piirraNosto: piirraNostosymPolttoon,
        });
      }
      const kctx = kangas.getContext('2d', { willReadFrequently: true });
      if (patina && window.__patina) {
        const t = await window.__patina({
          pikselit: kctx.getImageData(0, 0, kangas.width, kangas.height),
          resepti: patina.resepti,
          tausta: patina.tausta,
          maailma: bbox,
          koko: perus.koko,
          paperiS: perus.paperiS ?? null,
          palauta: 'pikselit',
        });
        kctx.putImageData(t.pikselit, 0, 0);
      }
      return kctx.getImageData(R, R, W, W);
    };
    const a = await piirra(0);
    const b = await piirra(W);
    /*
     * A:n viimeinen laattasarake ja B:n ensimmäinen ovat ERI laattoja,
     * mutta niiden RAJA on sama arkin pikseliviiva. Verrataan A:n
     * oikeaa reunaa (viimeiset 8 saraketta) siihen, mitä B kertoo
     * samasta arkin kohdasta — B:n vasen reunus on juuri se alue.
     * Reunus ei ole B:n ImageDatassa, joten verrataan sen sijaan A:n
     * oikean laidan ja B:n vasemman laidan RAJAPIKSELEITÄ: jos rasterointi
     * on sama, A:n sarake W-1 ja B:n sarake 0 ovat vierekkäisiä
     * naapureita, ja niiden ero kertoo saumasta.
     *
     * Suora todiste: piirretään B uudestaan siirrettynä yhden laatan
     * verran vasemmalle, jolloin A:n oikea puolisko ja B:n vasen
     * puolisko kattavat TÄSMÄLLEEN saman arkin alan.
     */
    const c = await piirra(laatta);
    let pahin = 0;
    let eroja = 0;
    for (let y = 0; y < W; y += 1) {
      for (let x = 0; x < laatta; x += 1) {
        const ia = (y * W + laatta + x) * 4;   // A:n oikea puolisko
        const ic = (y * W + x) * 4;            // C:n vasen puolisko
        for (let k = 0; k < 4; k += 1) {
          const d2 = Math.abs(a.data[ia + k] - c.data[ic + k]);
          if (d2) { eroja += 1; pahin = Math.max(pahin, d2); }
        }
      }
    }
    return { pahin, eroja, pikseleita: laatta * W };
  };

  window.__lohko = async (asetukset, laatta, tyyppi, laatu, patina) => {
    /*
     * NOSTOTASO: sama lohkokoneisto, eri piirto. piirraNostotaso jättää
     * kaiken paitsi nostojen musteen läpinäkyväksi; patina saa
     * lapinäkyvän mustereseptin (RESEPTIT.nosto) patina-parametrissa.
     */
    if (NOSTOTASO) {
      piirraNostotaso(kangas, {
        ...asetukset, nostot, piirraNosto: piirraNostosymPolttoon,
      });
    } else if (VIIVATASO) {
      /*
       * VIIVATASO: sama lohkokoneisto, eri piirto. Reittipassi
       * ohitetaan uloimmalla tasolla, jossa se on mitattu tyhjäksi —
       * ja juuri samaa rajaa noudattaa peite, joten työlista ja piirto
       * ovat samaa mieltä.
       */
      piirraViivataso(kangas, {
        ...asetukset,
        sisalto,
        passit: { reitit: asetukset.__z >= VIIVA_REITIT_ALIN },
      });
    } else {
      piirraMaailma(kangas, aineisto, {
        ...asetukset, sisalto, nostot, piirraNosto: piirraNostosymPolttoon,
      });
    }
    /*
     * PATINA KOKO LOHKOLLE, REUNUS MUKAAN LUKIEN. Vasta sen jälkeen
     * leikataan laatat reunuksen sisältä, jolloin jokainen paikallinen
     * operaattori on nähnyt oikeat naapurit myös laatan reunalla.
     */
    if (patina && window.__patina) {
      const kctx = kangas.getContext('2d', { willReadFrequently: true });
      const sisaan = kctx.getImageData(0, 0, kangas.width, kangas.height);
      const tulos = await window.__patina({
        pikselit: sisaan,
        resepti: patina.resepti,
        tausta: patina.tausta,
        maailma: patina.maailma,
        koko: patina.koko,
        paperiS: patina.paperiS ?? null,
        palauta: 'pikselit',
      });
      kctx.putImageData(tulos.pikselit, 0, 0);
    }
    const reunus = patina ? patina.reunus : 0;
    const ulos = [];
    const sisaLeveys = kangas.width - 2 * reunus;
    const sisaKorkeus = kangas.height - 2 * reunus;
    for (let ry = 0; ry * laatta < sisaKorkeus; ry += 1) {
      for (let rx = 0; rx * laatta < sisaLeveys; rx += 1) {
        const w = Math.min(laatta, sisaLeveys - rx * laatta);
        const h = Math.min(laatta, sisaKorkeus - ry * laatta);
        pala.width = w;
        pala.height = h;
        pctx.clearRect(0, 0, w, h);
        pctx.drawImage(kangas, reunus + rx * laatta, reunus + ry * laatta, w, h, 0, 0, w, h);
        ulos.push({ rx, ry, data: pala.toDataURL(tyyppi, laatu) });
      }
    }
    return ulos;
  };
  document.body.dataset.valmis = '1';
</script>`;

const TYYPIT = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.bin': 'application/octet-stream',
};
const palvelin = createServer((req, res) => {
  const polku = decodeURIComponent(req.url.split('?')[0]);
  if (polku === '/' || polku === '/index.html') {
    res.writeHead(200, { 'content-type': TYYPIT['.html'] });
    res.end(SIVU);
    return;
  }
  if (polku === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const lahteet = {
    '/maailmapiirto.js': join(TAALLA, 'fokuskartta', 'maailmapiirto.js'),
    '/piirto.js': join(TAALLA, 'fokuskartta', 'piirto.js'),
    '/aineisto.json': join(tyokansio, 'aineisto.json'),
    '/sisalto.json': join(tyokansio, 'sisalto.json'),
    '/nostot.json': join(tyokansio, 'nostot.json'),
    /*
     * PELIN OMA SYMBOLIKIRJASTO SIVULLE. Poltettu merkki piirretään
     * TÄSMÄLLEEN samalla koodilla kuin elävä (piirraNostosymPolttoon),
     * eikä muotoja kirjoiteta generaattoriin toiseen kertaan.
     * `mapart.js` tulee mukana, koska kirjasto tuo siitä `el`/`maare`
     * elävää varapolkuaan varten.
     */
    '/fokusnosto-symbolit.js': join(JUURI, 'js', 'fokusnosto-symbolit.js'),
    '/mapart.js': join(JUURI, 'js', 'mapart.js'),
    '/korkeus.bin': join(tyokansio, 'korkeus.bin'),
    '/meri.bin': join(tyokansio, 'meri.bin'),
  };
  const tiedosto = lahteet[polku];
  if (!tiedosto || !existsSync(tiedosto)) { res.writeHead(404); res.end('ei'); return; }
  const pate = polku.slice(polku.lastIndexOf('.'));
  res.writeHead(200, {
    'content-type': TYYPIT[pate] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});
const sivu = await selain.newPage({ viewport: { width: 300, height: 200 } });
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));
sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });
const sivuAlkoi = Date.now();
await sivu.goto(osoite, { waitUntil: 'load' });
/*
 * Lyhyt aikakatkaisu on TARKOITUS. Sivun skripti lataa aineiston
 * parissa sekunnissa; jos se ei ole valmis kahdessa minuutissa, se ei
 * ole hidas vaan rikki, ja silloin `virheet` kertoo miksi. Yhdeksän
 * sadan sekunnin katkaisu piilotti kerran template-literalin
 * lainausmerkkivirheen neljäksitoista minuutiksi.
 */
await sivu.waitForSelector('body[data-valmis="1"]', { timeout: 120000 })
  .catch(() => { throw new Error(`Aineisto ei latautunut: ${virheet.join(' | ') || 'aikakatkaisu'}`); });
/*
 * Patinapassi sivulle. `patinoiSelaimessa` on tarkoituksella
 * itsenäinen funktio, joka ei viittaa moduulin ulkopuolelle — sama
 * ominaisuus, jonka turvin lehtityökalu antaa sen page.evaluatelle.
 * Tässä se viedään kerran, ja lohkot kutsuvat sitä sivun sisällä
 * ilman sarjallistusta.
 */
if (PATINA) {
  await sivu.evaluate((lahde) => {
    // eslint-disable-next-line no-eval
    window.__patina = (0, eval)(`(${lahde})`);
  }, patinoiSelaimessa.toString());
}
console.log(`  sivu pystyssä   ${((Date.now() - sivuAlkoi) / 1000).toFixed(1)} s`
  + (PATINA ? ` · patina ${PATINA_TASO}` : ' · ei patinaa'));

/* ------------------------------------------------------------ piirto */

/*
 * ERIKOISPIIRIT EIVÄT OLE POHJASSA (viivataso 31.8.2026 ilta): piirit
 * nimineen piirretään omalle läpinäkyvälle tasolleen, ja pohja saa
 * siksi `asteverkko: false`. Ilman tätä ne olisivat kartalla kahdesti,
 * ja kaksinkertainen muste näkyisi juuri niillä viivoilla, jotka
 * kulkevat ruudun poikki joka tasolla.
 *
 * Yhden arkin lehdelle (tools/tee-yleislehti.mjs) kytkintä ei anneta,
 * ja piirit piirtyvät siellä kuten ennen.
 */
const TYYLI = {
  meret: MERET, kehys: KEHYS, kompassi: KOMPASSI, asteverkko: false,
};

/*
 * SAUMATESTI (--saumatesti): laattapyramidin pahin mahdollinen vika on
 * sauma. Jos paperin rae, kuitujuovat tai mittakaava laskettaisiin
 * laatan omasta nurkasta, JOKA laatta saisi saman rakeen ja ruudukko
 * näkyisi ruudukkona. Testi piirtää saman alueen kahdesti — kerran
 * yhtenä kuvana, kerran laattoina — ja vertaa RAAKOJA PIKSELEITÄ.
 *
 * Vertailu ei voi olla tiedostotasolla: webp-enkooderi saa kuvan eri
 * kokoisena eikä tuota tavulleen samaa tulosta, vaikka pikselit
 * olisivat samat.
 */
if (lippu('saumatesti')) {
  /*
   * KOEALA ON VALITTAVISSA (--saumakohta sarake,rivi; oletus 8,2).
   *
   * Oletusala on avomerta, ja se on tarkoitus: siellä testataan
   * paperin rae ja kohdistusheitto ilman vektoreiden hälyä. Mutta
   * SISÄLTÖ on se, mikä oikeasti voi katketa laattarajalle — poltettu
   * karttanosto, jonka nimiö on kymmeniä pikseleitä pitkä — ja siksi
   * koe on voitava ajaa myös sen päälle. Ateenan rypäs on z7:llä
   * sarakkeella 93, rivillä 41.
   */
  const [saumaSarake, saumaRivi] = String(valitsin('saumakohta', '8,2'))
    .split(',').map(Number);
  for (const mitat of tasot) {
    const ruudukko = 2;
    const perus = {
      bbox: {
        x: arkinBbox.x + (saumaSarake * LAATTA) / mitat.px,
        y: arkinBbox.y + (saumaRivi * LAATTA) / mitat.px,
        w: (ruudukko * LAATTA) / mitat.px,
        h: (ruudukko * LAATTA) / mitat.px,
      },
      projektio,
      leveys: ruudukko * LAATTA,
      tyyli: TYYLI,
      koko: { w: mitat.leveys, h: mitat.korkeus },
      siirto: { x: saumaSarake * LAATTA, y: saumaRivi * LAATTA },
      arkki: { x: arkinBbox.x, y: arkinBbox.y },
      paperiS: PAPERI_S,
      // Viivataso ohittaa reittipassin uloimmalla tasolla (ks. VIIVATASO).
      __z: mitat.z,
    };
    const patinaParam = PATINA ? {
      resepti: PATINA, tausta: TAUSTA, reunus: reunusTasolle(), paperiS: PAPERI_S,
    } : null;
    const tulos = await sivu.evaluate(
      ([p, l, r, pat]) => window.__sauma(p, l, r, pat),
      [perus, LAATTA, ruudukko, patinaParam],
    );
    const osuus = (100 * tulos.eroja) / (tulos.pikseleita * 4);
    console.log(`  sauma z${mitat.z}  pahin kanavaero ${tulos.pahin}, `
      + `eroavia kanavia ${tulos.eroja} / ${tulos.pikseleita * 4} (${osuus.toFixed(4)} %) `
      + `· laattarajalla ${tulos.reunalla} (pahin ${tulos.pahinReunalla})`);
    /*
     * TULKINTA. Oikea sauma — kohina tai mittakaava luettuna laatan
     * omasta nurkasta — näkyisi KOKO kuvassa ja erityisesti
     * laattarajalla katkoksena. Hajallaan vektorien reunoilla oleva
     * muutaman promillen ero on kelluvan pisteen pyöristystä:
     * kuvakoordinaatti lasketaan laatan bboxista, ja vähennyslasku
     * tehdään eri suuruusluokassa kuin isossa kuvassa.
     */
    /*
     * TUOTANNON OMA KOE: kaksi samankokoista vierekkäistä lohkoa.
     * Tämä on se luku, joka kertoo näkyykö sauma pelissä.
     */
    const raja = await sivu.evaluate(
      ([p2, l, pat]) => window.__lohkoraja(p2, l, pat),
      [perus, LAATTA, patinaParam],
    );
    console.log(`             lohkoraja: pahin ${raja.pahin}, eroavia `
      + `${raja.eroja} / ${raja.pikseleita * 4}`);
    if (tulos.eroja && tulos.reunalla > tulos.eroja * 0.5) {
      console.log('    VAROITUS: erot kasautuvat laattarajalle — se on OIKEA SAUMA. '
        + 'Tarkista, lukeeko jokin kaava laatan omaa nurkkaa arkin sijasta '
        + '(maailmapiirto.js koko/siirto).');
    }
  }
  await sivu.close();
  await selain.close();
  palvelin.close();
  process.exit(0);
}

mkdirSync(kohdekansio, { recursive: true });

/*
 * NIMIÖT EIVÄT OLE LAATOISSA (omistajan päätös 30.8.2026).
 * Ladonta ajetaan pelissä ruutuavaruudessa (js/karttanimet.js); ks.
 * perustelu selaimen puolen kommentista ja luettelon kentästä `nimiot`.
 */

const tilasto = new Map();
let tavuja = 0;
let tehty = 0;
const piirtoAlkoi = Date.now();

let piirrettyaPx = 0;

for (const { mitat, bx, by } of lohkot.values()) {
  const s0 = bx * LOHKO;
  const r0 = by * LOHKO;
  const sarakkeita = Math.min(LOHKO, mitat.sarakkeita - s0);
  const riveja = Math.min(LOHKO, mitat.riveja - r0);
  const pw = Math.min(sarakkeita * LAATTA, mitat.leveys - s0 * LAATTA);
  const ph = Math.min(riveja * LAATTA, mitat.korkeus - r0 * LAATTA);
  /*
   * REUNUS ON MUKANA PIIRROSSA MUTTA EI TULOKSESSA. Kangas on
   * reunuksen verran isompi joka suuntaan, ja laatat leikataan sen
   * sisältä — patinan paikalliset operaattorit näkevät siis oikeat
   * naapurit myös laatan reunalla (ks. REUNUS).
   */
  const R = PATINA ? reunusTasolle() : 0;
  const kx0 = s0 * LAATTA - R;
  const ky0 = r0 * LAATTA - R;
  const kw = pw + 2 * R;
  const kh = ph + 2 * R;
  const kbbox = {
    x: arkinBbox.x + kx0 / mitat.px,
    y: arkinBbox.y + ky0 / mitat.px,
    w: kw / mitat.px,
    h: kh / mitat.px,
  };
  const asetukset = {
    bbox: kbbox,
    projektio,
    leveys: kw,
    tyyli: TYYLI,
    // Tason numero sivulle: viivataso ohittaa reittipassin uloimmalla
    // tasolla (ks. VIIVATASO). Piirtoon tämä ei muuten vaikuta.
    __z: mitat.z,
    // Arkin koko ja tämän lohkon nurkka: kohina, mittakaava ja kehys
    // lasketaan arkin koordinaateissa (ks. maailmapiirto.js).
    koko: { w: mitat.leveys, h: mitat.korkeus },
    siirto: { x: kx0, y: ky0 },
    // Arkin origo laudan koordinaateissa: vektorit lasketaan siitä eikä
    // laatan bboxista, jotta lohkosta leikattu laatta on tavulleen sama
    // kuin erikseen piirretty (maailmapiirto.js kuvaX).
    arkki: { x: arkinBbox.x, y: arkinBbox.y },
    // Painojälki paperivakioina (ks. PAINOJÄLKI ON PAPERIVAKIO).
    paperiS: PAPERI_S,
  };
  /*
   * Patinan `maailma` on kankaan bbox LAUDAN koordinaateissa: siitä
   * passi johtaa kohinoiden faasin ja ikääntymislaikun mittakaavan
   * (tools/patina.mjs maailmankoordinaatit). Koska se on laudalta eikä
   * kankaan kulmasta, sama maailmankohta saa saman kuvion lohkosta
   * riippumatta — juuri se tekee patinasta jatkuvan.
   */
  const patinaParam = PATINA ? {
    resepti: PATINA,
    tausta: TAUSTA,
    maailma: kbbox,
    koko: { w: mitat.leveys, h: mitat.korkeus },
    reunus: R,
    paperiS: PAPERI_S,
  } : null;
  const palat = await sivu.evaluate(
    ([a, laatta, t, l, pat]) => window.__lohko(a, laatta, t, l, pat),
    [asetukset, LAATTA, `image/${MUOTO}`, LAATU, patinaParam],
  );
  if (virheet.length) throw new Error(`Piirto virheili: ${virheet.join(' | ')}`);
  piirrettyaPx += kw * kh;

  for (const pala of palat) {
    const sarake = s0 + pala.rx;
    const rivi = r0 + pala.ry;
    // Lohkon reunalle jäänyt ylimääräinen laatta ei mene levylle.
    if (!tarvitaan.has(`${mitat.z}:${sarake}:${rivi}`)) continue;
    const puskuri = Buffer.from(pala.data.split(',')[1], 'base64');
    // Läpinäkyvien tasojen laatat omiin alipolkuihinsa pohjan
    // rinnalle: <versio>/nostot/z… ja <viivaversio>/viivat/z…
    let kansio = join(kohdekansio, `z${mitat.z}`, String(sarake));
    if (NOSTOTASO) kansio = join(kohdekansio, 'nostot', `z${mitat.z}`, String(sarake));
    if (VIIVATASO) kansio = join(kohdekansio, 'viivat', `z${mitat.z}`, String(sarake));
    mkdirSync(kansio, { recursive: true });
    writeFileSync(join(kansio, `${rivi}.${MUOTO}`), puskuri);

    tavuja += puskuri.length;
    const t = tilasto.get(mitat.z) ?? {
      laattoja: 0, tavuja: 0, pienin: Infinity, suurin: 0, pikseleita: 0,
    };
    t.laattoja += 1;
    t.tavuja += puskuri.length;
    t.pikseleita += Math.min(LAATTA, mitat.leveys - sarake * LAATTA)
      * Math.min(LAATTA, mitat.korkeus - rivi * LAATTA);
    t.pienin = Math.min(t.pienin, puskuri.length);
    t.suurin = Math.max(t.suurin, puskuri.length);
    tilasto.set(mitat.z, t);
    tehty += 1;
  }
  const sek = (Date.now() - piirtoAlkoi) / 1000;
  process.stdout.write(`\r  laattoja ${tehty}/${tyot.length}  `
    + `${(tehty / sek).toFixed(2)} laattaa/s  `
    + `${(piirrettyaPx / 1e6 / sek).toFixed(2)} Mpx/s  `
    + `${(tavuja / 1e6).toFixed(1)} Mt   `);
}
process.stdout.write('\n');

await sivu.close();
await selain.close();
palvelin.close();

/* ------------------------------------------------------------ luettelo */

const piirtoSek = (Date.now() - piirtoAlkoi) / 1000;
const pikseleita = [...tilasto.values()].reduce((s, t) => s + t.pikseleita, 0);

/**
 * Tason laatasto bittikarttana: bitti 1 = laatta on levyllä.
 *
 * Luetaan LEVYLTÄ eikä työlistasta, jotta osa-ajojen (parvi, alue)
 * yhdistelmä on aina totta: jokainen erä näkee edellisten kirjoittamat
 * tiedostot samasta kansiosta.
 */
function laatastoBase64(mitat) {
  const bitteja = mitat.sarakkeita * mitat.riveja;
  const tavut = Buffer.alloc(Math.ceil(bitteja / 8));
  for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
      const polku = join(kohdekansio, `z${mitat.z}`, String(sarake), `${rivi}.${MUOTO}`);
      if (!existsSync(polku)) continue;
      const i = rivi * mitat.sarakkeita + sarake;
      tavut[i >> 3] |= 1 << (i & 7);
    }
  }
  return tavut.toString('base64');
}

/*
 * LUETTELO ON PELIN AINOA TIETO PYRAMIDISTA. Peli ei arvaa tasojen
 * mittoja eikä arkin paikkaa laudalla — se lukee ne tästä, aivan kuten
 * maalehti luki paikkansa omasta JSONistaan.
 */
function teeLuettelo() {
  return {
  versio: VERSIO,
  lauta: LAUTA.id,
  projektio,
  laatta: LAATTA,
  muoto: MUOTO,
  laatu: LAATU,
  /*
   * PATINATASO ON LUETTELOSSA, JOTTA PAIKKAUS OSAA JATKAA SAMALLA
   * RESEPTILLÄ. Peli ei lue tätä — paikkausajo lukee. Paikatut laatat
   * asetetaan kopioitujen naapureiden viereen, ja jos ne piirrettäisiin
   * eri patinatasolla (tai eri laadulla, muodolla tai laattakoolla),
   * raja näkyisi kartalla vaikka geometria täsmäisi pikselilleen.
   * Kaikki neljä ovat siksi luettelossa ja tools/paikkaa-pyramidi.mjs
   * lukee ne lähdeversion luettelosta ajon asetuksiksi.
   */
  patina: PATINA_TASO,
  // Arkin paikka LAUDAN koordinaateissa: kartta-ala + atlaskehyksen
  // paperimarginaali sen ylä- ja alapuolella (y on negatiivinen).
  arkki: arkinBbox,
  // Kameran ikkuna on kartta-ala eli tasan lauta — marginaaliin ei ajeta.
  rajaus: laudanBbox,
  kehys: KEHYS,
  /*
   * NIMIÖT EIVÄT OLE NÄISSÄ LAATOISSA (omistajan päätös 30.8.2026).
   *
   * Peli lukee tämän ja päättää siitä, latooko se paikannimet itse
   * (js/karttanimet.js) vai onko ne poltettu laattoihin. Kenttä on
   * luettelossa eikä koodissa, koska laatat ja koodi julkaistaan eri
   * aikaan: nimen pitää näkyä täsmälleen kerran kummassakin välissä.
   * Vanhassa luettelossa kenttää ei ole, ja peli tulkitsee sen
   * "laatoissa on nimet" — silloin se vaikenee, kuten v1366:sta asti.
   */
  nimiot: false,
  /*
   * NOSTOTASO — oma läpinäkyvä laattapyramidi (omistaja 31.8.2026
   * ilta). Pohjalaatoissa EI ole nostoja; ne ovat tason laatoissa
   * polussa <nostotaso.versio>/nostot/z…, ja tunnus→tiiviste-luettelo
   * (`nostotaso.nostot`, js/nostoladonta.js nostoladontaTiiviste)
   * kertoo pelille, mitkä merkit se saa vaientaa elävästä kerroksesta.
   *
   * KENTTÄ ON TÄSSÄ EIKÄ VANHASSA `nostot`-AVAIMESSA, JA SE ON
   * YHTEENSOPIVUUDEN YDIN. Vanha peli (ennen nostotasoa) lukee vain
   * juuritason `nostot`-kenttää: jos uusi luettelo kirjoittaisi
   * tiivisteet sinne, vanha peli vaikenisi merkeistä, joita sen
   * tuntemissa pohjalaatoissa ei enää ole — nostot katoaisivat.
   * Kun tiivisteet ovat vain `nostotaso`-olion sisällä, vanha peli
   * piirtää kaiken elävänä (oikein, koska pohja on nostoton) ja uusi
   * peli vaientaa vain sen, minkä sen oma nostokerros piirtää.
   * Vastaavasti VANHA luettelo (nostot pohjassa, juuritason `nostot`)
   * toimii uudessa pelissä entisellään: kerrosta ei rakenneta, ja
   * vaientaminen nojaa juuriavaimeen. Ikkunaa, jossa nosto näkyisi
   * kahdesti tai ei kertaakaan, ei siis ole kummassakaan suunnassa.
   *
   * PELKKÄ TOTUUSARVO EI RIITÄ kuten nimiöillä, koska kerrokset ovat
   * RINNAKKAISET eivätkä toisensa poissulkevat (Raamattu 31.8.2026):
   * maailma kasvaa nopeammin kuin pyramidia ajetaan, joten kartalla on
   * aina viimeisimmässä ajossa poltettuja JA sen jälkeen lisättyjä
   * eläviä nostoja. Peli piirtää elävänä jokaisen merkin, jonka
   * tunnusta luettelo ei tunne TAI jonka tiiviste eroaa
   * (js/laattapyramidi.js nostoOnPoltettu).
   *
   * `laatastot` on sama bittikarttamuoto kuin tasojen `laatasto`
   * (peli purkaa molemmat samalla koodilla): bitti 1 = nostolaatta on
   * olemassa. Se lasketaan geometriasta (nostotasonPeite), samalla
   * funktiolla josta piirtoajon työlista tulee — luettelo ja levy
   * eivät voi olla eri mieltä. Kun pyramidin tasoihin ei kuulu
   * yhtään nostotason tasoa (koeajo z0–z3), kenttä jää pois ja peli
   * piirtää kaikki nostot elävinä.
   */
  nostotaso: (() => {
    const omat = tasot.filter((m) => m.z >= NOSTO_ALIN);
    if (!omat.length) return null;
    const laatastot = {};
    for (const m of omat) laatastot[m.z] = nostotasoBase64(m, nostotasonPeite(m));
    return {
      versio: NOSTOVERSIO,
      tasot: omat.map((m) => m.z),
      nostot: nostot.luettelo,
      laatastot,
    };
  })(),
  /*
   * VIIVATASO — kolmas laattapyramidi pohjan ja nostotason rinnalle
   * (omistaja 31.8.2026 ilta). Pohjalaatoissa EI ole reittejä eikä
   * erikoispiirejä; ne ovat tason laatoissa polussa
   * <viivataso.versio>/viivat/z…, ja siellä ovat myös MAIDEN RAJAT.
   *
   * TIIVISTELISTAA EI OLE, ja se on ero nostotasoon. Nostot ovat myös
   * pelin ELÄVÄSSÄ kerroksessa, joten peli tarvitsee tiedon siitä,
   * minkä merkin se saa vaientaa. Reiteillä, piireillä ja rajoilla
   * elävää kerrosta ei ole lainkaan — ne joko ovat laatoissa tai
   * eivät ole kartalla — joten pelille riittää se, mitkä laatat ovat
   * olemassa.
   *
   * `rajat` on RAJASETIN NIMI, ei sisältöä. Omistajan peruste
   * 31.8.2026 ilta: rajojen oma taso on tärkeä siksikin, että
   * myöhemmin voidaan mallintaa *"eri valtioiden kehityksiä vuosien
   * saatossa esim. maailmansotien aikaan"*. Kun settejä joskus on
   * useampi, tämä kenttä kertoo mikä niistä kartalla on — ja setin
   * vaihto on datanvaihto ja uusi viivatasoversio, ei koodimuutos.
   *
   * YHTEENSOPIVUUS ON SAMA KUIN NOSTOTASOLLA JA SE ON TÄMÄN ERÄN
   * TÄRKEIN KOHTA. Vanha peli ei tunne `viivataso`-kenttää: se
   * piirtää pohjan sellaisenaan, ja jos pohja on jo ajettu
   * reitittömänä, kartalta puuttuvat reitit. Siksi JULKAISUJÄRJESTYS
   * on selain ensin, viivatason laatat toisena ja reititön pohja
   * vasta kolmantena (ks. .github/workflows/generoi-pyramidi.yml).
   * Toiseen suuntaan sauma on umpinainen: uusi peli vanhan luettelon
   * kanssa ei rakenna kerrosta eikä pyydä yhtään laattaa.
   */
  viivataso: (() => {
    if (!tasot.length) return null;
    const laatastot = {};
    for (const m of tasot) laatastot[m.z] = nostotasoBase64(m, viivatasonPeite(m));
    return {
      versio: VIIVAVERSIO,
      tasot: tasot.map((m) => m.z),
      rajat: RAJASETTI,
      laatastot,
    };
  })(),
  /*
   * MERISÄVY: se yksi väri, jolla peli maalaa karsittujen umpimeren
   * laattojen paikan (ks. umpimeriSavy). Null, jos mitään ei karsittu.
   */
  meriSavy,
  tasot: tasot.map((m) => ({
    z: m.z,
    leveys: m.leveys,
    korkeus: m.korkeus,
    pikseliaPerYksikko: Math.round(m.px * 1e6) / 1e6,
    sarakkeita: m.sarakkeita,
    riveja: m.riveja,
    /*
     * LAATASTO: bittikartta siitä, mitkä laatat ovat olemassa.
     * Rivi kerrallaan, bitti 1 = laatta on levyllä. Ilman tätä peli
     * pyytäisi karsittuja umpimeren laattoja ja saisi 404:n jokaisesta
     * — tuhansia turhia pyyntöjä ja hukkaa reunapalvelimella.
     *
     * Koko on pieni: syvin taso 169 x 91 = 15 379 bittiä eli 1,9 kt
     * base64:nä.
     */
    /*
     * LAATASTO VAIN HARVASSA PYRAMIDISSA. Kun jokainen laatta on
     * olemassa, bittikartta olisi pelkkiä ykkösiä — turhaa tavua, ja
     * matriisiajossa suorastaan vaarallista: jokainen shardi näkee
     * levyllä vain omat laattansa ja kirjoittaisi luetteloon, että
     * muita ei ole. Peli tulkitsee puuttuvan laataston "kaikki
     * olemassa" (js/laattapyramidi.js laattaOlemassa).
     */
    laatasto: HARVA ? laatastoBase64(m) : null,
  })),
  /*
   * ALUE kertoo, MIKÄ OSA PYRAMIDIA TÄSSÄ VERSIOSSA ON OLEMASSA.
   * Paikkausajossa se on koko pyramidi: muuttumattomat laatat
   * kopioitiin lähdeversiosta uuteen versiopolkuun, joten uusi versio
   * on täysi. Piirretty laatikko ei siis kuulu tähän kenttään vaan
   * `paikkaus`-olioon — muuten luettelo väittäisi, että pyramidissa on
   * vain se laatikko, ja jokainen tarkistus joka lukee `alue`-kenttää
   * valehtelisi.
   */
  alue: PAIKKAUS_LAHDE ? null : ALUE,
  /*
   * PAIKKAUKSEN KIRJANPITO: mistä versiosta muuttumattomat laatat
   * kopioitiin ja mikä laatikko piirrettiin uudelleen. Kenttä on
   * olemassa vain paikatuissa versioissa (vanhoissa luetteloissa sitä
   * ei ole, eikä peli lue sitä), ja se on ainoa jälki siitä, että
   * versio on koottu kahdesta ajosta. Ilman sitä myöhempi lukija ei
   * voisi tietää, minkä ajon patina- ja aineistotila kussakin laatassa
   * on.
   */
  paikkaus: PAIKKAUS_LAHDE ? { lahde: PAIKKAUS_LAHDE, alue: ALUE } : undefined,
  lahteet: [
    'Natural Earth 10m (Kelso & Patterson) — public domain',
    'ETOPO1 Global Relief (NOAA, Amante & Eakins 2009) — public domain',
  ],
};
}

const luettelo = teeLuettelo();

const luetteloPolku = join(kohdekansio, 'pyramidi.json');
/*
 * LUETTELO TÄYDENTYY, EI KORVAUDU. Pyramidi ajetaan erissä — uloimmat
 * tasot koko maailmasta, sisimmät alueittain parven kesken — ja
 * jokainen erä tuntee vain omat tasonsa. Jos ajo kirjoittaisi luettelon
 * yli, viimeinen erä pyyhkisi kaikkien muiden tasot pois ja peli näkisi
 * pyramidista murusen. Vanhat tasot luetaan siis pohjaksi ja tämän ajon
 * tasot korvaavat samat z-numerot.
 */
if (existsSync(luetteloPolku)) {
  try {
    const vanha = JSON.parse(readFileSync(luetteloPolku, 'utf8'));
    if (vanha.laatta === LAATTA && vanha.muoto === MUOTO) {
      /*
       * NOSTOTASOAJO EI KOSKE POHJAN TASOIHIN: se ei piirtänyt yhtään
       * pohjalaattaa, joten vanhan luettelon tasot (mahdollisine
       * laatastoineen) jäävät sellaisinaan. Vain nostotaso-olio ja
       * eräkirjanpito päivittyvät.
       */
      if ((NOSTOTASO || VIIVATASO) && vanha.tasot?.length) {
        luettelo.tasot = vanha.tasot;
      } else {
        const omat = new Set(luettelo.tasot.map((t) => t.z));
        luettelo.tasot = [...(vanha.tasot ?? []).filter((t) => !omat.has(t.z)), ...luettelo.tasot]
          .sort((a, b) => a.z - b.z);
      }
      luettelo.erat = [...(vanha.erat ?? []), {
        tasot: TASOT,
        alue: ALUE,
        nostotaso: NOSTOTASO || undefined,
        viivataso: VIIVATASO || undefined,
        paikkaus: PAIKKAUS_LAHDE || undefined,
      }];
      // Osa-ajo matalilla tasoilla (koeajo z0–z3) ei saa pyyhkiä
      // olemassa olevaa nostotasoa pois luettelosta.
      luettelo.nostotaso = luettelo.nostotaso ?? vanha.nostotaso ?? null;
      luettelo.viivataso = luettelo.viivataso ?? vanha.viivataso ?? null;
    }
  } catch {
    /* rikkinäinen vanha luettelo: kirjoitetaan tuore päälle */
  }
}
luettelo.erat = luettelo.erat ?? [{ tasot: TASOT, alue: ALUE }];
writeFileSync(luetteloPolku, `${JSON.stringify(luettelo, null, 2)}\n`);

console.log('\nMITAT');
for (const m of tasot) {
  const t = tilasto.get(m.z);
  if (!t) continue;
  const koko = m.sarakkeita * m.riveja;
  const keski = t.tavuja / t.laattoja;
  console.log(`  z${m.z}  ${t.laattoja} laattaa  ${(t.tavuja / 1e6).toFixed(2)} Mt  `
    + `keski ${(keski / 1024).toFixed(1)} kt  `
    + `(${(t.pienin / 1024).toFixed(1)}..${(t.suurin / 1024).toFixed(1)} kt)  `
    + `${(t.tavuja / t.pikseleita).toFixed(3)} tavua/px  `
    + `koko taso olisi ${(keski * koko / 1e6).toFixed(0)} Mt`);
}
console.log(`  yhteensä        ${(tavuja / 1e6).toFixed(2)} Mt / ${tyot.length} laattaa`);
console.log(`  pikseleitä      ${(pikseleita / 1e6).toFixed(1)} Mpx`);
console.log(`  piirtoaika      ${piirtoSek.toFixed(1)} s `
  + `(${(piirrettyaPx / 1e6 / piirtoSek).toFixed(2)} Mpx/s piirrettyä, `
  + `${(tehty / piirtoSek).toFixed(2)} laattaa/s, lohko ${LOHKO}x${LOHKO})`);
console.log(`  piirrettyä      ${(piirrettyaPx / 1e6).toFixed(1)} Mpx `
  + `(hukkaa ${(100 * (1 - pikseleita / piirrettyaPx)).toFixed(1)} % lohkon reunoilla)`);
console.log(`  kokonaisaika    ${((Date.now() - alkoi) / 1000).toFixed(1)} s`);
console.log(`  luettelo        ${luetteloPolku} (${statSync(luetteloPolku).size} tavua)`);
if (NOSTOTASO) {
  console.log(`\nVie ämpäriin: pyramidi/<nostoversio>/nostot/z<taso>/<sarake>/<rivi>.${MUOTO}`);
} else if (VIIVATASO) {
  console.log(`\nVie ämpäriin: pyramidi/<viivaversio>/viivat/z<taso>/<sarake>/<rivi>.${MUOTO}`);
} else {
  console.log(`\nVie ämpäriin: pyramidi/<versio>/z<taso>/<sarake>/<rivi>.${MUOTO}`);
}
