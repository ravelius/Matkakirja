/*
 * LAATTAPYRAMIDI: yksi maailmanlaajuinen esirenderöity kartta, laatoiksi
 * pilkottuna ja zoomtasoittain kahdennettuna.
 *
 *   node tools/generoi-laattapyramidi.mjs <kohdekansio> \
 *        [--data <raaka-aineiston kansio>] [--tasot 0-7] \
 *        [--alue lon0,lat0,lon1,lat1] [--laatta 512] [--laatu 0.9] \
 *        [--lohko 4] [--kaariminuutit 1|3] [--korkeuspalat <kansio>]
 *        [--vari <ISO A3>] [--variversio <v>] [--aluevesi 6.7]
 *        [--paletti murrettu|taysvari|tasoitus] [--vesi 0.72] [--feidaus 0.35]
 *        [--peitto 0.85] [--kerma '#faf4d6']
 *        [--feidausreuna <yksikköä>]
 *        [--laatikkokerroin 1.15] [--laatikko-nakyma] [--ilman-rajausta]
 *        [--muoto webp]
 *        [--harva] [--harvamittaus] [--saumatesti] [--kuiva]
 *        [--vain-lista] [--vain-palat [tiedosto]] [--paikkaus <lähdeversio>]
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
  mkdirSync, readFileSync, writeFileSync, statSync, existsSync, rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import {
  basename, dirname, join, resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { ikkunanRajat, keraaMaailma, rannikot, meriRenkaat } from './fokuskartta/maailma.mjs';
import { ikkunanPalat } from './korkeuspalat-lukija.mjs';
import { demIkkuna, demVali } from './maasto/dem-ikkuna.mjs';
import {
  demHakemisto, kaksiLahdetta, LAHDEMAININTA, LAHDEMAININTA_90,
} from './maasto/tee-maasto.mjs';
import { meriMaski } from './fokuskartta/aineisto.mjs';
import { yhdistaLuettelo } from './pyramidiluettelo.mjs';
import { keraaSisalto, sisallonYhteenveto } from './fokuskartta/sisalto.mjs';
import { keraaNostot, nostojenYhteenveto } from './fokuskartta/nostot.mjs';
import { lueRajaviivasto, rajatLaudalle, RAJASETIT } from './fokuskartta/rajat.mjs';
import {
  RESEPTIT, TAUSTA, VESIVIIVOITUKSET, patinoiSelaimessa,
} from './patina.mjs';
import { laudanProjektio, SYVYYS, asetaSyvyyskontrasti } from './fokuskartta/piirto.js';
import { RANTATYYLI, nimiotasonLadonta } from './fokuskartta/maailmapiirto.js';
import { NIMISTO_1873 } from '../js/packs/nimisto-1873.js';
import { nostosymPolttoLaatikko } from '../js/fokusnosto-symbolit.js';
import { NOSTOLADONTA_SAANTO } from '../js/nostoladonta.js';
import { nostotasonKansio, varitasonKansio } from '../js/laattapyramidi.js';

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

/* --------------------------------------------- argumentit (luetaan ensin) */

/*
 * Valitsimet luetaan ENNEN tasovakioita, koska tasojen määrä on
 * komentoriviargumentti (--tasoja, ks. alla). Käyttöohje ja loput
 * asetukset ovat entisellä paikallaan alempana.
 */
const argv = process.argv.slice(2);
const kohdekansio = argv[0];
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);

/*
 * TASOJEN MÄÄRÄ (kerroin 2). Syvin taso on TASOJA − 1.
 *
 * OLETUS ON 8 (z0–z7) — se on tuotannon pyramidi, ja oletusarvolla tämä
 * työkalu käyttäytyy tavulleen kuten ennen tätä valitsinta.
 *
 * `--tasoja 9` LISÄÄ SYVEMMÄN TASON z8 (480 px/aste), ei uutta karkeaa
 * tasoa: TASO0 on naulattu viitteeseen SYVIN_VIITE eikä johdeta
 * TASOJA:sta, joten z0…z7 pysyvät täsmälleen entisinä ja z8 on niiden
 * jatke. Raamattu ("PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA"): pallon
 * lepokerros ottaa syvemmän tason käyttöön ilman koodimuutosta, kun se
 * on luettelossa ja ämpärissä.
 *
 * TASOJA vaikuttaa kolmeen asiaan eikä mihinkään muuhun: oletustasoihin
 * (`--tasot`), luettelon tasoluetteloon ja siihen, MINKÄ TASON
 * SARAKKEINA `--sarakkeet` tulkitaan (kaista on aina syvimmän tason
 * sarakkeita). Siksi z8-shardin on ajettava `--tasoja 9`: ilman sitä
 * kaista skaalattaisiin puolikkaalla jaolla ja kaistan viimeinen
 * z8-sarake jäisi jokaisesta shardista piirtämättä.
 */
/*
 * KATTO 11 (Karttaseppä 23.9.2026): `--tasoja 11` lisää syvät tasot
 * z9 (960 px/aste) ja z10 (1920 px/aste) natiivipelin pallosarjaa
 * Z9–Z11 varten. Ne poltetaan VAIN alueelle (`--syva-alue`, ks. SYVÄT
 * TASOT alempana) ja niiden rinnevarjo tulee Copernicus GLO-30:sta
 * (`--dem`). Selainpeli ei käytä niitä: js/laattapyramidi.js rajaa
 * luettelon tasot PELIN_SYVIN_TASO:on.
 */
const TASOJA = Number(valitsin('tasoja', 8));
if (!Number.isInteger(TASOJA) || TASOJA < 1 || TASOJA > 11) {
  console.error(`--tasoja ${TASOJA}: kokonaisluku 1…11 (tuotanto 8; 9 lisää z8:n, 11 syvät z9–z10).`);
  process.exit(1);
}
/*
 * SYVIMMÄN TASON VIITE: se taso, jonka tiheys on TIHEYS. Tämä on
 * naulattu 7:ään eikä johdeta TASOJA:sta, jotta tasojen määrän
 * kasvattaminen EI siirrä yhtään olemassa olevaa tasoa. (Ennen tätä
 * TASO0 = 86 400 / 2^(TASOJA−1); silloin `--tasoja 9` olisi puolittanut
 * jokaisen tason ja lisännyt uuden KARKEAN tason — juuri päinvastoin
 * kuin on tarkoitus.)
 */
const SYVIN_VIITE = 7;

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
 * tasoille (omistaja 30.8.2026; z0–z3 1.9.2026 illasta alkaen) —
 * ks. MERET ja KOMPASSI alempana.
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
/*
 * VALTAMERTEN KORISTEET POHJAAN (`--koristeet <json>`, Karttaseppä
 * 21.9.2026 ilta; maailmapiirto.js piirraMaailma osio 9): Codexin
 * laivat ja kompassiruusut arkin kalusteina merten nimien ja ruusun
 * rinnalla. Rivi { kuva, lon, lat, kokoPx, kierto?, tasot? }; kuvapolku
 * repon juuresta. Oletustiedosto assets/koristeet/meri/pallo-koristeet.json.
 * Karsinta (umpimeriSavy kohta 5) säästää laatat, joihin koriste osuu.
 */
const KORISTEET_LAHDE = valitsin('koristeet', null);
const KORISTEET = KORISTEET_LAHDE ? JSON.parse(readFileSync(KORISTEET_LAHDE, 'utf8')) : [];
const KORISTEIDEN_OLETUSTASOT = [1, 2, 3, 4, 5, 6];
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
 *
 * NOSTETTU 0,3 -> 0,5 (omistaja 1.9.2026 illalla: *"toiseksi uloin
 * zoomtaso saisi sisältää samat lisämerkinnät karttaan kuin uloin
 * taso. tai ainakin sen ison ilmansuunta symbolin meren päällä."*).
 * Nimet ja ruusu piirtyvät nyt myös z3:lle (0,45), ja karsinnan on
 * tiedettävä se: muuten se hylkäisi umpimeren laattoina juuri ne
 * laatat, joihin piirto kirjoittaa nimen tai ruusun. Perustelut
 * kokonaisuudessaan maailmapiirto.js:n osiossa 7.
 */
const KALUSTEIDEN_YLARAJA = 0.5;

/*
 * TASON 0 LEVEYS johdetaan viitetasosta: 86 400 / 2^7 = 675 px.
 * Tasot ovat siis 675, 1350, 2700, 5400, 10 800, 21 600, 43 200, 86 400
 * ja `--tasoja 9`:llä niiden jatkeena 172 800.
 */
const TASO0 = (12000 * TIHEYS) / 2 ** SYVIN_VIITE;

/* ------------------------------------------------------------ argumentit */

if (!kohdekansio || kohdekansio.startsWith('--')) {
  console.error('Käyttö: node tools/generoi-laattapyramidi.mjs <kohdekansio> '
    + '[--data <kansio>] [--tasot 0-4] [--alue lon0,lat0,lon1,lat1] [--koristeet <json>] '
    + '[--laatta 512] [--laatu 0.9] [--muoto webp] [--kuiva] '
    + '[--tasoja 8|9|11] [--syva-alue lon0,lat0,lon1,lat1] [--dem <GLO-30-kansio>] [--dem90 <GLO-90-kansio>] '
    + '[--dem-kaikki-tasot] [--maski-aa 4] [--meri-kohina 0.2] [--reliefi-koe lammin|<json>] [--rantaleveys z:k,…] [--reseptinimi <nimi>] '
    + '[--kaariminuutit 1|3] [--korkeuspalat <kansio>] [--vain-palat [tiedosto]] '
    + '[--vain-lista] [--paikkaus <lähdeversio>] '
    + '[--nostotaso --nostoversio <v> [--nostomaa <ISO>] [--ilman-hahmotelmia [--polta-hahmotelmat t,t]] [--nostotasot <json>] [--nostot-ilman-nimioita]] '
    + '[--nimiotaso --nimioversio <v> [--nimiot <json>] [--nimiot-aika pysyva]] '
    + '[--viivataso --viivaversio <v> [--eipiirit] [--eireitit] [--eirajat] [--eijoet]] '
    + '[--vesiviivoitus tihea|harva] [--syvyysportaat m,m,…] [--syvyyskayrat m,m,… [--syvyyskayrapeitto 0.55]] [--syvyyskohina lauta] [--paperirae ruutu] [--resepti-json <json>] [--syvyyskontrasti <k>] [--joet-pohjaan] '
    + '[--rantataso --rantaversio <v>] [--ilman-rantaviivaa] '
    + '[--vari <ISO> --variversio <v> [--aluevesi <yksikköä>] '
    + '[--paletti murrettu|taysvari|tasoitus] [--vesi <0..1>] [--feidaus <0..1>] '
    + '[--peitto <0..1>] [--kerma <#rrggbb>] '
    + '[--feidausreuna <yksikköä>] '
    + '[--laatikkokerroin <k>] [--laatikko-nakyma] [--ilman-rajausta]] '
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
 * KORKEUSDATAN TARKKUUS KAARIMINUUTTEINA — SYVIMMÄLLÄ TASOLLA.
 *
 * Omistajan päätös 30.8.2026 oli 3 kaariminuuttia kaikilla tasoilla;
 * TILAUS 2.9.2026 KUMOSI SEN SYVIMMÄN TASON OSALTA: *"korkeusdata
 * pitää tehdä 1 tarkkuudella uudestaan"* (Raamattu, KORKEUSDATA).
 * Tarkkuus on nyt siis TASON OMINAISUUS eikä ajon:
 *
 *   z7        `--kaariminuutit` (oletus 1) — ETOPO1:n natiivi ruutu
 *   z0–z6     aina 3 kaariminuuttia
 *
 * MIKSI KAUKOTASOT JÄÄVÄT KOLMEEN. Yksi korkeussolu on z7:llä 12
 * kuvapikseliä 3′:llä ja 4 pikseliä 1′:llä — siellä tarkkuus näkyy.
 * Jo z6:lla 1′-solu on 2 pikseliä ja z5:llä yksi, eli aineisto on
 * piirtoa tarkempaa: tarkempi ruudukko ei toisi yhtään näkyvää
 * yksityiskohtaa vaan pelkkää kohinaa ja nelinkertaisen muistin.
 * Kaukotasoilla harvennus on nimenomaan ALIPÄÄSTÖSUODATIN (Raamattu),
 * ja se on niillä oikea valinta myös tarkan aineiston aikana.
 *
 * `--kaariminuutit 3` palauttaa vanhan yhtenäisen ajon kokonaan.
 *
 * YKSI AJO, YKSI RUUDUKKO. Ruudukko kootaan kerran ja se palvelee
 * kaikkia ajon tasoja, joten ajo jonka tasot tarvitsisivat ERI
 * ruudukot pysäytetään (ks. RUUTU alempana). Tuotannossa tämä ei tule
 * vastaan: matriisi ajaa z0–z6:n ja z7:n eri shardeissa.
 */
const KAARIMINUUTIT = Number(valitsin('kaariminuutit', 1));
if (KAARIMINUUTIT !== 1 && KAARIMINUUTIT !== 3) {
  console.error(`--kaariminuutit ${KAARIMINUUTIT}: vain 1 tai 3 ovat olemassa `
    + '(1 = ETOPO1:n natiivi palat R2:ssa, 3 = repon oma harvennettu aineisto).');
  process.exit(1);
}
/** Kaukotasojen kiinteä tarkkuus. */
const KARKEA_KAARIMINUUTIT = 3;
/*
 * Alin taso, joka saa tarkan ruudukon: z7 ja sitä syvemmät.
 *
 * Raja on NAULATTU TASOON eikä sidottu tasojen määrään: `--tasoja 9`
 * lisää z8:n, ja jos raja seuraisi syvintä tasoa, z7 tippuisi samalla
 * kolmeen kaariminuuttiin — sen pohjalaatat muuttuisivat huomaamatta
 * karkeammiksi kuin tuotannossa nyt olevat.
 */
const TARKKA_ALIN = SYVIN_VIITE;
/** Tason korkeusruudukon tarkkuus kaariminuutteina. */
const kaariminuutitTasolle = (z) => (z >= TARKKA_ALIN ? KAARIMINUUTIT : KARKEA_KAARIMINUUTIT);
/*
 * 1′-PALOJEN PAIKALLINEN KANSIO. Työnkulku kopioi tarvittavat palat
 * R2:sta ajokoneelle ennen polttoa, jolloin itse ajossa ei ole yhtään
 * verkkopyyntöä. Ilman tätä palat noudetaan julkisesta osoitteesta ja
 * välimuistitetaan tmpdiriin (tools/korkeuspalat-lukija.mjs).
 */
const KORKEUSPALAT = valitsin('korkeuspalat', null);
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
 * === NOSTOTASO MAITTAIN (18.9.2026) ================================
 *
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 d, omistaja:
 * *"muiden maiden nostot piiloon"*. Elävä kerros osasi jo vaieta
 * naapureista (js/pallolauta/nostot.js NAYTA_VAIN_KOHDEMAAN_NOSTOT),
 * mutta MAAILMANLAAJUISESSA laatastossa naapurin nimiö on poltettu
 * samaan kuvaan kuin kohdemaan, ja poltettua ei voi piilottaa: se
 * kuulsi 0,85-kerman läpi (Gotthard-nimiön kontrasti 14,8 / 13,9,
 * tavoite < 10), ja kerman nosto latistaisi koko kartan.
 *
 * `--nostomaa <ISO>` ajaa siis YHDEN MAAN nostot omaan laatastoonsa
 * polkuun `<nostoversio>/nostot/<ISO>/z…`, ja peli hakee vain
 * kohdemaan laataston (js/laattapyramidi.js nostotasonKirjaus).
 * Rakenne on TÄSMÄLLEEN väritason rakenne (`--vari <ISO>` →
 * `varitasot[ISO]`), ja se valittiin maskin sijasta, koska se on
 * kevyempi molemmissa päissä: maski vaatisi TOISEN alfalaataston joka
 * maalle (yhtä monta laattaa kuin muste) ja kompositoinnin selaimessa,
 * kun taas maittainen laatasto kasvattaa laattamäärää vain rajalle
 * osuvien laattojen verran — ja peli lataa vain yhden maan laatat
 * koko maailman sijaan.
 *
 * ILMAN `--nostomaa`-valitsinta ajo on entinen maailmanlaajuinen ajo
 * (`nostotaso`-kenttä). Mitään ei siis rikota kesken siirtymän.
 */
const NOSTO_MAA = (valitsin('nostomaa', null) ?? '').toUpperCase() || null;
/** Nostotason kirjauksen polkukentät; sama olio kuin `nostotasot[ISO]`. */
const NOSTO_POLKUKIRJAUS = NOSTO_MAA
  ? { versio: NOSTOVERSIO, maa: NOSTO_MAA } : null;
/** Laattojen alikansio ajokansiossa (ilman versiota). */
const NOSTO_KANSIO = NOSTO_MAA
  ? nostotasonKansio(NOSTO_POLKUKIRJAUS, { versio: false }) : 'nostot';
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
/*
 * ERIKOISPIIRIT POIS VIIVATASOLTA (`--eipiirit`, omistaja 1.9.2026
 * ilta): *"Poista pituus ja leveyspiirit näkyvistä."* Piirit —
 * päiväntasaaja, kääntöpiirit, pohjoinen napapiiri ja nollameridiaani
 * nimineen — ovat viivatason oma passi (tools/fokuskartta/
 * maailmapiirto.js piirraViivataso, `passit.piirit`), eikä niitä ole
 * pohjassa (ks. ERIKOISPIIRIT EIVÄT OLE POHJASSA). Ne katoavat siis
 * kartalta polttamalla viivataso uudella versiolla ilman passia; pohja
 * ja nostotaso pysyvät välimuistissaan.
 *
 * PEITE KULKEE SAMALLA KYTKIMELLÄ (VIIVAOSAT): piirien kaistat ovat
 * z0–z4:llä valtaosa viivatason laatoista, ja ilman passia ne olisivat
 * täysin läpinäkyviä kuvia, joita peli kuitenkin pyytäisi. Luettelo
 * kirjaa `viivataso.piirit`, jotta ämpäristä näkee kumpi ajo on —
 * peli ei lue kenttää, se piirtää laatat sellaisinaan.
 */
const PIIRIT = !lippu('eipiirit');
/*
 * REITIT POIS VIIVATASOLTA (`--eireitit`, Fablen päätös 20.9.2026,
 * omistajan kaappaus pariisi-ei-jokia-v1980.webp): pallon lepokerros ei
 * lataa viivatasoa, koska sillä on reittiviuhka (Raamattu PAATOKSET 8),
 * ja pohja 2026-09-20 on poltettu ilman jokia — levossa Loire katosi.
 * Tällä lipulla poltetaan JOKITASO: sama viivatason piirtäjä ja sama
 * peite, mutta reittipassi pois (joet + rajat jäävät). Luettelo kirjaa
 * `reitit: false`, ja luettelon kokoaja siirtää kirjauksen kenttään
 * `jokitaso` (js/laattapyramidi.js JOKITASO) — tämä ajo ei koske
 * viivatason omaan kirjaukseen ämpärissä.
 */
const REITIT = !lippu('eireitit');
/*
 * RAJAT POIS (`--eirajat`): pallo piirtää maiden rajat itse vektorina
 * (js/pallovektorit.js), ja poltettu raja oli vektorin alla
 * kaksinkertaisena musteena (js/pallolaatat.js VIIVATASO EI TULE
 * PALLOLLE). Jokitaso poltetaan siksi pelkillä joilla: --eireitit
 * --eipiirit --eirajat.
 */
const RAJAT = !lippu('eirajat');
/*
 * JOET POIS VIIVATASOLTA (`--eijoet`, polttosuunnitelma 20.9.2026): kun
 * joet poltetaan POHJAAN (omistajan päätös: koko pyramidi uusiksi
 * yhdellä kertaa), viivatasolle ei saa jäädä samaa uomaa toiseen
 * kertaan — tasokartta latoo viivatason pohjan päälle ja uoma
 * piirtyisi kahdesti.
 */
const JOET = !lippu('eijoet');
const VIIVAOSAT = (PIIRIT && REITIT && RAJAT && JOET) ? null
  : { piirit: PIIRIT, reitit: REITIT, rajat: RAJAT, joet: JOET };
/*
 * REITIT VAIN LÄHITASOILLE (omistaja 1.9.2026, kuvakaappaus jonka
 * mittajana on 1000 km): *"Tällä zoomitasolla ja yli reitit voi
 * piilottaa kokonaan."*
 *
 * MIKÄ TASO ON MIKÄKIN — MITATTU KAAPPAUKSISTA, EI ARVATTU. Peli
 * valitsee tason noin 1:1 laitepikseleinä (js/laattapyramidi.js
 * valitseTaso), ja mittajana lasketaan näkymän mittakaavasta
 * (js/fokusmitat.js laskeMittajana). Tason oma tiheys on
 * `TASO0 · 2^z / 12000` kuvapikseliä lautayksikköä kohti:
 *
 *   z2  0,225 px/yks   jana 5000 km   koko maailma arkilla
 *   z3  0,45           jana 2000 km
 *   z4  0,90           jana 1000 km   ← omistajan kaappaus
 *   z5  1,80           jana  500 km
 *   z6  3,60           jana  200 km   ← omistajan lähikaappaus
 *   z7  7,20           jana  100 km
 *
 * Omistajan raja kulkee siis z4:n ja z5:n VÄLISSÄ: 1000 km:n näkymässä
 * ja sitä laajemmilla reittejä ei polteta lainkaan, 500 km:stä
 * sisäänpäin ne ovat. RAJA ON POLTTOPÄÄTÖS EIKÄ HÄIVYTYS (Raamattu,
 * VIIVATASO: *"EI häivytystä millään tasolla"*) — laattaa ei ole, ja
 * peli jättää sen pyytämättä, koska luettelon bittikartta lasketaan
 * samasta funktiosta.
 *
 * RAJAT JA PIIRIT JÄÄVÄT KAIKILLE TASOILLE: ne ovat kartan omaa
 * hallinnollista ja tähtitieteellistä viivastoa, eivät pelilaudan
 * rataa, eikä omistajan pyyntö koskenut niitä.
 */
const VIIVA_REITIT_ALIN = 5;
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
/*
 * RANTATASO (omistaja 6.9.2026 ilta, sanatarkasti: *"joo poltetaan
 * vain uudestaan ilman viivaa nyt kun on mac studio viritetty"*):
 * rantaviivan muste siirtyy pohjalaatoista NELJÄNTEEN läpinäkyvään
 * laattapyramidiin polkuun ranta/z<taso>/<sarake>/<rivi>.
 *
 * MIKSI OMA TASO. Karttapallo piirtää rantaviivan vektorina
 * (js/pallovektorit.js), joka on aina tasan pikselin levyinen;
 * poltettu viiva jäisi sen alle venytettynä usvana. Kun muste on
 * omalla tasollaan, pallo jättää sen lataamatta ja tasokartta lataa
 * sen pohjan päälle — tasokartan kuva ei muutu (ks.
 * docs/moduulit/pallon-vektoriviivat.md luvut 4.5 ja 6, erä V4).
 *
 * TASOT z0–z7 (tai z8) KUTEN VIIVATASOLLA: rantaviiva on kartalla joka
 * tasolla, toisin kuin nostot.
 *
 * RANTAVERSIO on tason oma versio-osa polussa samasta syystä kuin
 * nosto- ja viivatasolla: kerroksen uusintapoltto ei saa koskea pohjan
 * ikuiseen välimuistiin.
 */
const RANTATASO = lippu('rantataso');
/*
 * NIMIÖTASO (omistajan kortti 20.9.2026 ilta; ks. maailmapiirto.js
 * NIMIÖTASO): `--nimiotaso --nimioversio <v> [--nimiot <json>]`.
 * Läpinäkyvä taso kuten ranta ja viivat; sisältö on nimiölista
 * (oletus js/packs/nimisto-1873.js NIMISTO_1873). Luetteloon kirjataan
 * `nimiotaso` versioineen, laatastoineen ja nimiöiden metadatalla
 * (Pelikoodarin rajapinta: luokka, teksti, lon, lat, iso, meri,
 * laatikot tasoittain).
 */
const NIMIOTASO = lippu('nimiotaso');
const NIMIOVERSIO = valitsin('nimioversio', VERSIO);
const NIMIOT_LAHDE = valitsin('nimiot', null);
const RANTAVERSIO_ANNETTU = valitsin('rantaversio', null);
const RANTAVERSIO = RANTAVERSIO_ANNETTU ?? VERSIO;

/* --------------------------------------------------------- väritaso */

/*
 * VÄRITASO — KOHDEMAAN VÄRILLINEN TOPOGRAFIA (karttauudistus, erä 1).
 *
 * `--vari FRA` ajaa VIIDENNEN laattajoukon samalle laattaruudukolle:
 * sama arkki, sama projektio, samat tasot, sama laattakoko — vain
 * toinen väriasteikkopari (tools/fokuskartta/piirto.js VARI_ASTEIKKO ja
 * VARI_SYVYYS). Peli piirtää sen omana kerroksenaan pohjan päälle ja
 * rajaa sen kohdemaan muotoon (js/laattapyramidi.js varitasonTasot,
 * clipPath js/maanaariviivat.js aluevesipolusta).
 *
 * Omistaja 13.9.2026: *"Maan korkeuserot muutetaan varilliseksi ja
 * vedetkin nakyvat sinisena syyvyyserot huomioiden. … Muiden maiden
 * kartat ja valtion ulkopuoliset vedet ja meret ennallaan ruskean
 * savyissa. … Siis etta vain kohdemaassa on varillinen topografia
 * nakyvissa?"*
 *
 * === MIKSI LAATAT EIVÄT OLE MAAN MUOTOISIA ==========================
 *
 * Laatat piirretään maan LAATIKON alalle suorakaiteena, ei maan
 * muotoon leikattuna, ja leikkaus tehdään vasta pelissä. Kaksi syytä,
 * ja kumpikin on ehto:
 *
 *   1. LEIKKAUSTA EI VOI POLTTAA, JOS SE HALUTAAN TARKISTAA. Erän
 *      savuke (tools/savukkeet/savuke-varilaatat.mjs) mittaa pikselin
 *      Belgian puolelta ja vaatii sen ruskeaksi. Jos laatta olisi
 *      valmiiksi leikattu, väite menisi läpi myös silloin kun pelin
 *      leikkuri on rikki — eli testi ei mittaisi mitään. Rajaus on
 *      pelissä, ja siksi savuke voi riisua sen ja nähdä testin
 *      muuttuvan punaiseksi (vastakoe).
 *   2. RAJA VOI VIELÄ MUUTTUA. Aluevesipuskurin leveys on päätös
 *      (12 mpk), ja jos se muuttuu, laatat olisi poltettava uudestaan.
 *      Nyt muuttuu yksi luku pelin puolella.
 *
 * Hinta on ne laatat, jotka jäävät leikkurin ulkopuolelle: Ranskan
 * laatikosta niitä on runsas kolmannes. Ne EIVÄT lataudu pelissä —
 * peli hakee vain leikkurin laatikon sisältä (js/laattapyramidi.js) —
 * mutta ne ovat ämpärissä. Se on halvin mahdollinen vakuutus siitä,
 * että rajan muutos on yhden luvun muutos.
 *
 * PATINA ON OLETUKSENA POIS (`--patina ei`). Värilaatta piirtyy
 * patinoidun pohjalaatan PÄÄLLE, ja patinan passit — sävykäyrä,
 * pastellihaalennus, meren litistys globaaliin seepiasävyyn — ovat
 * juuri ne, jotka vetäisivät sinisen ja vihreän takaisin ruskeaan.
 * Paperin rae, kuitu ja pigmentti tulevat moottorin omasta
 * pikselisilmukasta, joten laatta on yhä samaa painettua karttaa kuin
 * naapurinsa. `--patina taysi` pakottaa passin takaisin vertailukuvia
 * varten.
 */
const VARI_MAA = (valitsin('vari', null) ?? '').toUpperCase() || null;
const VARITASO = Boolean(VARI_MAA);
const VARIVERSIO = valitsin('variversio', null) ?? VERSIO;
/*
 * ===== MAA ON LAATAN POLUSSA (14.9.2026) ===========================
 *
 * Kaistat-raportin luku 5: ennen tätä kaikkien 27 maan tasoituslaatat
 * kirjoitettiin samaan avaimeen `<versio>/vari/z<taso>/<sarake>/<rivi>`
 * samalla versiomerkkijonolla, ja koska maiden laatikot menevät
 * päällekkäin, peräkkäiset ajot ylikirjoittivat toisensa. Kaava on nyt
 * `<versio>/vari/<ISO>/z…`, eikä kahdella maalla voi olla samaa
 * avainta versiosta riippumatta.
 *
 * KAAVA LUETAAN PELIN OMASTA FUNKTIOSTA (js/laattapyramidi.js
 * varitasonKansio) — sama syy kuin leikkurin renkailla: generaattorin
 * oma kopio kaavasta ehtisi eriytyä pelin kaavasta, ja lopputulos
 * olisi 404 tai oikean näköinen mutta väärän maan laatta.
 *
 * `--vanha-varipolku` ajaa entiseen, maattomaan polkuun. Se on
 * vastakoe ja hätävara, ei ajotila: sillä ajetut laatat törmäävät
 * edelleen toisiinsa.
 */
const VARI_MAA_POLUSSA = VARITASO && !lippu('vanha-varipolku');
/** Kirjauksen polkukentät; sama olio, jonka `varitasot[ISO]` saa alle. */
const VARI_POLKUKIRJAUS = {
  versio: VARIVERSIO, maa: VARI_MAA, maaPolussa: VARI_MAA_POLUSSA || undefined,
};
/** Laattojen kansio AJOKANSIOSSA, esim. `vari/FRA` (ilman versiota). */
const VARI_KANSIO = varitasonKansio(VARI_POLKUKIRJAUS, { versio: false }) || 'vari';
/** Laattojen kansio ÄMPÄRISSÄ, esim. `2026-09-14-tasoitus/vari/FRA`. */
const VARI_AMPARIKANSIO = varitasonKansio(VARI_POLKUKIRJAUS);
/*
 * ALUEVESIPUSKURI LAUTAYKSIKKÖINÄ (Fablen päätös 13.9.2026: 12
 * meripeninkulmaa eli aluevesiraja). 12 mpk = 22,224 km; laudalla yksi
 * leveysaste on 33,33 yksikköä ja yksi aste 111,32 km, joten
 * 22,224 / 111,32 · 33,33 = 6,654 → 6,7 yksikköä. Sama luku on pelin
 * puolella (js/maanaariviivat.js ALUEVESI_YKSIKKOA), ja kumpikin
 * viittaa tähän perusteluun — laatikko ja leikkuri EIVÄT saa olla eri
 * mieltä, tai leikkuri leikkaisi laatatonta alaa.
 */
const ALUEVESI_YKSIKKOA = Number(valitsin('aluevesi', 6.7));
/*
 * PALETTI, VEDEN PEITTÄVYYS JA FEIDAUS OVAT AJON VALITSIMIA
 * (karttauudistuksen PÄÄTÖKSET 2, omistaja 13.9.2026: *"Varit ovat
 * rakennusaikainen asteikko: vaihto = asteikon muutos + laattojen uusi
 * ajo, ei koodimuutos"*).
 *
 * `--paletti murrettu` on pelinäkymän oletus: seepiaan sointuvat
 * murretut sävyt (tools/fokuskartta/piirto.js VARI_ASTEIKKO_MURRETTU).
 * `--paletti taysvari` on erän 1 asteikko, ja se jää vertailukuviin.
 * `--vesi` ja `--feidaus` ovat ne kaksi lukua, jotka omistaja valitsee
 * pilottikuvista (0,60/0,25 · 0,72/0,35 · 0,85/0,45).
 */
const VARIPALETTI = valitsin('paletti', 'murrettu');
const VARI_VESI = valitsin('vesi', null) === null ? null : Number(valitsin('vesi', null));
/*
 * ====== TASOITUSAJO (`--paletti tasoitus`, karttauudistus erä 1c) ===
 *
 * OMISTAJAN PÄÄTÖS 4 KÄÄNTÄÄ ERÄN 1b YMPÄRI (13.9.2026 klo 14.10 UTC,
 * sanatarkasti: *"Jätä ranska alkuperäiseen. Kaikki muut ihan kamalia.
 * Poistetaan muista maista korkeus erot kokonaan tai lähes
 * kokonaan."*). Erässä 1b värilaatta oli maastorenderöinti, josta
 * leikkuri jätti näkyviin KOHDEMAAN; nyt laatta on kerma-peite, josta
 * leikkuri jättää näkyviin KAIKEN MUUN. Putki, poltettu alfa,
 * `varitasot`-taulu ja versioportti ovat samat — vain laatan sisältö
 * vaihtuu.
 *
 * KOLME SEURAUSTA, JOTKA ON HYVÄ LUKEA YHDESSÄ:
 *
 *   (1) KOHDEMAAN ALFA ON 0, eli pohjalaatan alkuperäinen seepia
 *       näkyy pikselilleen muuttumattomana. Se on päätöksen 4
 *       kirjaimellinen vaatimus, ja savuke mittaa sen A/B-erona
 *       (tools/savukkeet/savuke-tasoitus-pallo.mjs V2).
 *   (2) LEIKKURI ON MAAN POLYGONI ILMAN ALUEVESIPUSKURIA. Puskuri oli
 *       erässä 1b sitä varten, että 12 mpk:n kaistale saisi SINISEN
 *       veden; päätös 4 sanoo, ettei sinistä tule ("Aluevesien sininen
 *       ei kuulu alkuperäiseen"). Aluevesi tasoitetaan siis muun meren
 *       mukana, ja leikkurin puskuri on 0. Laataston LAATIKKO pitää
 *       puskurinsa (ks. VÄRITASON ALUE): se on työn rajaus, ei rajan
 *       muoto.
 *   (3) MAASTOA EI PIIRRETÄ LAINKAAN. Kohdemaassa alfa on 0 ja muualla
 *       peiton alla on tasainen kerma, joten renderöinnistä ei jäisi
 *       jäljelle yhtään pikseliä. Ajo ei siis lataa korkeusaineistoa,
 *       Natural Earthiä eikä sisältöä — ks. piirraTasoitustaso.
 */
const TASOITUSTASO = VARITASO && VARIPALETTI === 'tasoitus';
/*
 * PEITTO = tasoituksen alfa laatikon sisällä. 0,85 jättää 15 %
 * alkuperäistä reliefiä läpi: rantaviivat ja rajat erottuvat hennosti,
 * korkeuserot eivät. `--peitto 0.95` on omistajan toinen
 * vertailuvaihtoehto ("lähes kokonaan" → "kokonaan").
 */
const { KERMA, VARIPALETIT } = await import(`${JUURI}/tools/fokuskartta/piirto.js`);
const TASOITUS_PEITTO = Number(valitsin('peitto', VARIPALETIT.tasoitus.peitto));
/* Kerma on paletin oletus; `--kerma #rrggbb` vaihtaa sen ajossa. */
const TASOITUS_KERMA = valitsin('kerma', KERMA);
/*
 * FEIDAUS on erän 1b luku (naapurin vaaleneminen paperia kohti).
 * Tasoitusajossa sama kenttä kantaa PEITON ja feidausväri on kerma —
 * yksi koodipolku, kaksi merkitystä, ja merkitys luetaan paletista.
 */
const VARI_FEIDAUS = TASOITUSTASO
  ? TASOITUS_PEITTO : Number(valitsin('feidaus', 0.35));
/*
 * FEIDAUKSEN HÄIVE LAATASTON REUNALLA lautayksikköinä (mitattu
 * pilotista 13.9.2026; perustelu tools/fokuskartta/maailmapiirto.js
 * polttaVariLeikkuri). Oletus on 15 % laatikon lyhyemmästä sivusta:
 * Ranskalla 70 yksikköä eli runsas 2°, jolloin vaaleneva ala loppuu
 * vinjettinä eikä vaakasuorana viivana. `--feidausreuna 0` palauttaa
 * terävän reunan vertailukuvia varten.
 */
const VARI_FEIDAUSREUNA_ANNETTU = valitsin('feidausreuna', null);
/*
 * LAATIKON KERROIN 1,15 ON SAMA LUKU KUIN ULOSZOOMAUKSEN ESTOSSA
 * (js/pallolauta/lauta.js ULOSZOOMAUKSEN_KERROIN), ja se on ehto eikä
 * varmuusvara: feidaus näkyisi suorakaiteena, jos kamera pääsisi
 * laataston laatikkoa kauemmas. Niiden on siis oltava sama luku, ja
 * siksi tämä on kirjattu molempiin päihin.
 */
const VARI_KERROIN = Number(valitsin('laatikkokerroin', 1.15));
/*
 * ======== LAATIKKO KOKO NÄKYVÄÄN ALAAN (`--laatikko-nakyma`) ========
 *
 * KERROIN 1,15 EI RIITÄ TASOITUKSELLE, JA SE ON MITATTU. Uloszoomauksen
 * esto rajaa vain sen, kuinka kauas kamera pääsee — se EI tee
 * laatikosta ruutua. Ruudun kuvasuhde ratkaisee: pystyruudulla
 * (390 × 844) kamera sovittaa laatikon LEVEYDEN, jolloin näkyvä ala on
 * kolme kertaa laatikon korkuinen, ja leveällä työpöydällä
 * (1920 × 1080) sovitetaan KORKEUS ja ylimääräinen ala on sivuilla.
 * Laataston laatikon ulkopuolella kartta jää alkuperäiseksi, eli
 * puhelimella Britannia ja Espanja jäivät tasoittamatta ja keskelle jäi
 * vaalea vyö (omistajan havainto kuvasta karttauudistus-1c-peitto085).
 *
 * LAATIKKO ON SIIS KUVASUHTEIDEN UNIONI. Sama kaava kuin kamerassa
 * (js/pallolauta/kamera.js laatikonTarve): näkyvä leveys on
 * `max(w · k, h · k · W/H)` ja näkyvä korkeus se jaettuna ruudun
 * kuvasuhteella. Unioni yli kuvasuhteiden supistuu kahteen ääripäähän:
 *
 *   leveys  = max(w · k, h · k · (W/H)max)     (levein ruutu)
 *   korkeus = max(h · k, w · k · (H/W)max)     (kapein ruutu)
 *
 * Laatikko keskitetään maan laatikon keskipisteeseen, koska kamera
 * keskittää sen (kameranKohde). Pinta-ala kasvaa TASAN kuvasuhteiden
 * suhteella ((H/W)max / (H/W)min = 3,85 tällä listalla) maasta
 * riippumatta — ja se on tasoitukselle halpaa, koska laatassa ei ole
 * maastoa (ks. TASOITUSAJO).
 */
/*
 * KUVASUHDE 2,0 ON MUKANA 14.9.2026 ALKAEN (kaistat-raportti, luku 6,
 * suositus 1). Lista päättyi ennen kuvasuhteeseen 1,778 (1920 × 1080),
 * mutta rootin ruutu on 2560 × 1352 = 1,893 ja sillä laataston laatikko
 * jäi ruutua kapeammaksi — ruudun laidoille jäi ala, jolla laattoja ei
 * ole lainkaan, ja se oli mitattuna 45 luminanssiyksikön suora kaista.
 * Kuvasuhde 2,0 kattaa 1,893:n ja jättää varaa vielä leveämmälle.
 *
 * PUHELIMEN PYSTYRUUTU ON YHÄ OSAJOUKKO, koska unioni ottaa LEVEYDEN
 * levimmältä ja KORKEUDEN kapeimmalta kuvasuhteelta. Lista on siis
 * järjestämätön joukko, jonka molemmat ääripäät ovat mukana; 2,0:n
 * lisäys kasvattaa vain leveyttä (1,778 → 2,0 eli 12,5 %) eikä voi
 * pienentää korkeutta.
 */
const NAKYMAN_KUVASUHTEET = [
  [390, 844],   // puhelin pystyssä (kapein — määrää KORKEUDEN)
  [768, 1024],  // tabletti pystyssä
  [1440, 900],  // työpöytä
  [1920, 1080], // leveä työpöytä (1,778)
  [2000, 1000], // LEVEIN: kuvasuhde 2,0 — määrää LEVEYDEN (rootin 2560 × 1352 = 1,89 mahtuu)
];
const VARI_LAATIKKO_NAKYMA = lippu('laatikko-nakyma');
/*
 * VASTAKOE (`--ilman-rajausta`): laatat ajetaan ILMAN poltettua
 * leikkuria ja feidausta. Silloin naapurimaa ja avomeri saavat
 * murretun paletin täydellä peitolla, ja savukkeen on kaaduttava
 * juuri niissä kahdessa väitteessä (tools/savukkeet/
 * savuke-varilaatat-pallo.mjs). Vihreä savuke tällä lipulla
 * tarkoittaisi, ettei mittari mittaa leikkuria vaan jotain muuta.
 */
const VARI_ILMAN_RAJAUSTA = lippu('ilman-rajausta');
/*
 * POHJA ILMAN RANTAVIIVAA (`--ilman-rantaviivaa`). Piirtomoottorin
 * osio 4 ohitetaan tyyliparametrilla (`tyyli.rantaviiva: false`,
 * tools/fokuskartta/maailmapiirto.js), EI oletuksena: vanhat lehdet,
 * pilotit ja testit kutsuvat ilman kenttää ja saavat rantaviivan
 * kuten ennenkin.
 *
 * LUETTELO KERTOO SEN PELILLE (`pohja.rantaviiva: false`), jotta
 * myöhempi lukija — ja pallon sarjan poltto — näkee ämpäristä, kumpi
 * pohja siellä on. Peli ei lue kenttää: sille riittää, että
 * rantataso on olemassa.
 */
const ILMAN_RANTAVIIVAA = lippu('ilman-rantaviivaa');
/*
 * RANNIKON HARVENNUS: pienin sallittu askel asteina, kun meren renkaat
 * luetaan (maailma.mjs meriRenkaat).
 *
 * Oletus 0,006 on yleislehden luku, ja EPAILIN SITA PYRAMIDISSA:
 * syvimmalla tasolla yksi pikseli on noin 160 metria (0,0015 astetta
 * pituudessa 45. leveyspiirilla), joten 0,006 asteen askel on nelja
 * pikselia, ja pudonneet pisteet voisivat kasautua rannikolle.
 *
 * MITATTU 20.9.2026 (Gironden laatta z8/162/74, 0,006 vs. 0,001):
 * EPAILY EI PITANYT. Reuna ei siirry: mediaanipoikkeama ne_10m_oceanin
 * renkaista on 0,20 km (1,3 pikselia) kummallakin tarkkuudella, ja
 * laatoista eroaa 20/206 niin, etta eroava ala on yksi 43 x 38 pikselin
 * laikku ja suurin kanavaero 11/255 - alle silman erotuskyvyn.
 *
 * Aiempi mittaukseni antoi 0,70 km:n maallepain-virheen. Se oli
 * MITTAUSVIRHE: maan ja meren raja ei ole askel vaan noin kahdeksan
 * pikselin varjostusramppi (meri ~205, maa ~220), ja kiinteä kynnys 222
 * osui rampin ylapaahan. Rampin puolivalista mitattuna virhe on
 * pikselin luokkaa.
 *
 * Valitsin jaa tanne, jotta koe on toistettavissa ilman koodimuutosta.
 * OLETUSTA EI OLE SYYTA MUUTTAA. Renkaita kaytetaan vain poltossa, joten
 * tarkkuus maksaisi vain rasterointiaikaa - mutta se ei osta mitaan.
 */
const RANNIKON_HARVENNUS = Number(valitsin('rannikon-harvennus', '0.006'));
if (!Number.isFinite(RANNIKON_HARVENNUS) || RANNIKON_HARVENNUS < 0) {
  console.error(`--rannikon-harvennus ${valitsin('rannikon-harvennus', '')}: aste, 0 tai suurempi.`);
  process.exit(1);
}
if ([NOSTOTASO, VIIVATASO, RANTATASO, VARITASO, NIMIOTASO].filter(Boolean).length > 1) {
  console.error('--nostotaso, --viivataso, --rantataso, --nimiotaso ja --vari ovat eri ajoja; '
    + 'anna vain yksi.');
  process.exit(1);
}
/*
 * MERKKITASO = MIKÄ TAHANSA POHJAN RINNALLE AJETTAVA LAATTAJOUKKO.
 *
 * Neljä ajotilaa jakavat yhden säännön: ne EIVÄT piirrä pohjalaattoja,
 * joten ne eivät myöskään saa kirjoittaa luetteloon pohjan tietoja —
 * tasoluetteloa, laatastoja, korkeustarkkuutta, merisävyä eivätkä
 * pyramidin alaa. Jos ne kirjoittaisivat, yksi väritasoajo väittäisi
 * koko pyramidin olevan Ranskan kokoinen. Ehto oli tähän asti
 * kirjoitettu auki joka kohdassa; väritaso on neljäs, ja neljä
 * luetteloa samasta säännöstä olisi kolme liikaa.
 */
const MERKKITASO = NOSTOTASO || VIIVATASO || RANTATASO || VARITASO || NIMIOTASO;
/*
 * ====== AJOT, JOTKA EIVÄT LATAA AINEISTOA ==========================
 *
 * Nosto-, viiva- ja rantataso piirtävät pelkkää mustetta, ja erän 1c
 * TASOITUSTASO piirtää pelkkää kermaa — yksikään niistä ei lue
 * korkeusruudukkoa, merimaskia eikä rannikoita. Tämä lippu on se yksi
 * paikka, josta kaikki neljä guardia lukevat saman totuuden; ennen
 * ehto oli kirjoitettu auki viidessä kohdassa, ja uuden ajotilan
 * lisääminen tarkoitti viiden kohdan muistamista.
 *
 * TASOITUKSELLA TÄMÄ ON MYÖS SUORITUSKYKYPÄÄTÖS: ilman sitä Ranskan
 * z4–z8-ajo purkaisi 1′-ruudukon (kymmeniä megatavuja), noutaisi
 * R2:sta 1′-palat ja piirtäisi koko maaston — kaiken sen, mistä ei jää
 * laattaan yhtään pikseliä.
 */
const ILMAN_AINEISTOA = NOSTOTASO || VIIVATASO || RANTATASO || TASOITUSTASO || NIMIOTASO;
if (RANTATASO && ILMAN_RANTAVIIVAA) {
  console.error('--ilman-rantaviivaa on POHJA-ajon lippu; rantataso on juuri se '
    + 'muste, joka pohjasta jää pois.');
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
const PATINA_TASO = valitsin('patina', VARITASO ? 'ei' : 'taysi');
/*
 * NOSTOTASO SAA AINA OMAN RESEPTINSÄ (RESEPTIT.nosto): läpinäkyvän
 * mustekerroksen paperivakiopassit — sävytys, rosoisuus, leviäminen,
 * rae — ilman pohjan maastopasseja, jotka lukisivat tyhjää kangasta.
 * `--patina ei` kytkee patinan pois myös nostotasolta.
 */
const PATINA_POHJA = PATINA_TASO === 'ei' ? null
  : ((NOSTOTASO || VIIVATASO || RANTATASO || NIMIOTASO) ? RESEPTIT.nosto : RESEPTIT[PATINA_TASO]);
/*
 * RESEPTIN AJOKOHTAISET MUUTOKSET (poltto-koe 20.9.2026, omistajan
 * kortti: *"testataan ensin miltä kaikki näyttää ennen kuin
 * poltetaan"*). `--vesiviivoitus tihea|harva` kytkee rannikon
 * vesiviivoituksen (tools/patina.mjs VESIVIIVOITUKSET; oletus null
 * omistajan 30.8.2026 päätöksellä) ja `--resepti-json` yhdistää
 * annetun JSON-olion reseptin päälle kentittäin (esim.
 * '{"syvyys":{"litistys":0.4}}' syvyysvyöhykkeiden kokeeseen). Kumpikaan
 * ei muuta reseptitaulua — vain tämän ajon reseptiä — ja molemmat
 * kirjataan luetteloon (`patinaMuutos`), jotta ämpäristä näkee mitä
 * ajettiin.
 */
/** `--syvyysportaat 30,120,600,1500,3000` — meren syvyysvyöhykkeet portaina (koe). */
const SYVYYSPORTAAT = valitsin('syvyysportaat', null)
  ? valitsin('syvyysportaat', null).split(',').map(Number).filter((v) => v > 0) : null;
/** `--syvyyskayrat 200,1000,3000` — isobaatit ohuina viivoina (koe 21.9.2026, ks. maailmapiirto.js syvyysKayrat). */
const SYVYYSKAYRAT = valitsin('syvyyskayrat', null)
  ? valitsin('syvyyskayrat', null).split(',').map(Number).filter((v) => v > 0) : null;
/** `--syvyyskayrapeitto 0.55` — isobaattiviivan peitto. */
const SYVYYSKAYRAPEITTO = Number(valitsin('syvyyskayrapeitto', 0.55));
/** `--syvyyskohina lauta` — vyöhykerajan kohina laudan yksiköissä (sama kuvio joka tasolla). */
const SYVYYSKOHINA_LAUDALLA = valitsin('syvyyskohina', 'pikselit') === 'lauta';
/** `--paperirae ruutu` — kuitu ja rae POIS laatasta (peli piirtää ne ruutuavaruudessa; ks. maailmapiirto.js paperiRaeRuudulla). */
const PAPERIRAE_RUUDULLA = valitsin('paperirae', 'poltto') === 'ruutu';
/*
 * LÖYDÖS 46 -KOE (Karttaseppä 24.9.2026, kuvavedokset; oletuksena kaikki
 * pois ja piirto tavulleen entinen — ks. maailmapiirto.js `maskiAA`,
 * `rantaKerroin`, `reliefi`):
 *   --maski-aa 4              maan ja meren raja peittosuhteena (N aliriviä)
 *   --rantaleveys "0:0.5,5:0.8,7:1"   rantaviivan leveyskerroin tasoittain
 *                             (lähin määritelty taso alapuolelta)
 *   --reliefi-koe lammin|<json>  monisuuntainen rinnevarjo + rinnevarjostus
 *                             + lämmin hypsometria (json yhdistyy oletuksiin)
 *   --dem-kaikki-tasot        --dem myös tasoille z0–z8 (muuten vain z9+)
 */
const MASKI_AA = Number(valitsin('maski-aa', 0)) || 0;
const RANTALEVEYS = valitsin('rantaleveys', null)
  ? String(valitsin('rantaleveys', null)).split(',').map((p) => p.split(':').map(Number))
    .filter(([z, k]) => Number.isFinite(z) && k > 0).sort((a, b) => a[0] - b[0])
  : null;
const rantaKerroinTasolle = (z) => {
  if (!RANTALEVEYS) return 1;
  let k = RANTALEVEYS[0][1];
  for (const [tz, tk] of RANTALEVEYS) if (tz <= z) k = tk;
  return k;
};
const RELIEFI_KOE = (() => {
  const v = valitsin('reliefi-koe', null);
  if (!v) return null;
  return v === 'lammin' ? {} : JSON.parse(v);
})();
const DEM_KAIKKI_TASOT = lippu('dem-kaikki-tasot');
/** `--meri-kohina 0.2` — syvyyskohinan kerroin (löydös 46: pehmeä syvyysliuku). */
const MERI_KOHINA = valitsin('meri-kohina', null) === null ? null : Number(valitsin('meri-kohina', null));
const VESIVIIVOITUS_VALINTA = valitsin('vesiviivoitus', null);
const RESEPTI_JSON = valitsin('resepti-json', null);
/** `--syvyyskontrasti 1.35` — meren syvyysrampin venytys (löydös 129; 1 = entinen, ks. piirto.js asetaSyvyyskontrasti). */
const SYVYYSKONTRASTI = Number(valitsin('syvyyskontrasti', 1));
asetaSyvyyskontrasti(SYVYYSKONTRASTI);
if (VESIVIIVOITUS_VALINTA && !VESIVIIVOITUKSET[VESIVIIVOITUS_VALINTA]) {
  console.error(`--vesiviivoitus: tuntematon ${VESIVIIVOITUS_VALINTA} (tihea|harva)`);
  process.exit(1);
}
const yhdistaResepti = (pohja, muutos) => {
  if (!muutos || typeof muutos !== 'object') return pohja;
  const ulos = { ...pohja };
  for (const [k, v] of Object.entries(muutos)) {
    ulos[k] = (v && typeof v === 'object' && !Array.isArray(v) && pohja?.[k] && typeof pohja[k] === 'object')
      ? { ...pohja[k], ...v } : v;
  }
  return ulos;
};
/*
 * `--resepti-json` YHDISTETÄÄN LIPPUJEN PÄÄLLE SISÄKKÄIN (23.9.2026):
 * `{"vesiviivoitus":{"harvennus":"haive"}}` muuttaa vain sen kentän
 * `--vesiviivoitus tumma` -asetuksista. Ennen JSON korvasi koko avaimen,
 * ja vesiviivoitus jäi ilman parametrejaan.
 */
const PATINA_MUUTOS = yhdistaResepti({
  ...(VESIVIIVOITUS_VALINTA ? { vesiviivoitus: VESIVIIVOITUKSET[VESIVIIVOITUS_VALINTA] } : {}),
  /*
   * `--paperirae ruutu` SAMMUTTAA PAPERIN HIENON RAKEEN MYÖS PATINASTA
   * (omistaja 22.9.2026, vaihtoehto b). Rae, nyppy, kuitu, ristikuitu
   * ja kuitukimppujen katkonta ovat kaikki paperipikselin mittaisia,
   * eli juuri sitä kuviota, joka on joka tasolla eri kohdassa maailmaa
   * ja joka sekoittuu tasonvaihdon häivytyksessä liaksi. Peli piirtää
   * ne ruutuavaruudessa (js, Pelikoodari), jolloin paperintuntu on
   * vakio eikä välky. Ikääntymisen laikku EI ole tässä: se on jo
   * sidottu laudalle (`maailmaX/maailmaY`) ja saa jäädä laattaan.
   */
  ...(PAPERIRAE_RUUDULLA ? {
    paperi: {
      rae: 0, raeKarkea: 0, kuitu: 0, kuituRisti: 0, klimppi: 0,
    },
  } : {}),
}, RESEPTI_JSON ? JSON.parse(RESEPTI_JSON) : null);
const PATINA = PATINA_POHJA && Object.keys(PATINA_MUUTOS).length
  ? yhdistaResepti(PATINA_POHJA, PATINA_MUUTOS) : PATINA_POHJA;
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
 * AJON RUUTU: se tarkkuus, jota TÄMÄN ajon tasot tarvitsevat.
 *
 * Ruudukko kootaan kerran ja tarjoillaan selainsivulle yhtenä
 * tiedostona, joten PIIRTÄVÄSSÄ ajossa voi olla vain yksi tarkkuus.
 * Ristiriitainen ajo pysäytetään — mutta vasta piirron kynnyksellä
 * (ks. YKSI AJO, YKSI RUUDUKKO ennen aineiston keruuta), koska
 * luettelo- ja listausajot eivät lue ruudukkoa lainkaan ja
 * `--vain-luettelo` kuvaa nimenomaan KOKO pyramidin z0–z7.
 *
 * Lista on hienoimmasta karkeimpaan, joten RUUTU on ajon tarkin
 * tarkkuus.
 */
const AJON_KAARIMINUUTIT = [...new Set(TASOT.map(kaariminuutitTasolle))].sort((a, b) => a - b);
const RUUTU = Number(valitsin('ruutu', (AJON_KAARIMINUUTIT[0] ?? KARKEA_KAARIMINUUTIT) / 60));

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

/**
 * "lon0,lat0,lon1,lat1" -> rajaus asteina, tai null = koko maailma.
 *
 * `let`, koska VÄRITASOAJO laskee alueensa itse kohdemaan polygonista
 * (ks. VÄRITASON ALUE alempana) eikä komentoriviltä: maan laatikko on
 * aineistossa, ja käsin annettu laatikko olisi neljäs paikka, jossa
 * saman maan rajat elävät.
 */
const alueTeksti = valitsin('alue', null);
let ALUE = alueTeksti
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

/*
 * ============ SYVÄT TASOT z9–z10 (Karttaseppä 23.9.2026) ============
 *
 * Natiivipeli (Cesium) lukee pallon Web Mercator -sarjan ämpäristä, ja
 * Z9–Z11 tarvitsevat lähteekseen pyramidin z8–z10 (tee-pallolaatat
 * lahdetaso Z − 1). z9 ja z10 ovat siksi olemassa, mutta vain ALUEELLA:
 * koko maailman z10 olisi yli miljoona laattaa, ja 30 metrin aineistoa
 * on toistaiseksi vain Ranskasta (ja Euroopasta latautumassa).
 *
 * `--syva-alue lon0,lat0,lon1,lat1` on SYVIEN TASOJEN ALA, ja se on
 * YKSI LÄHDE kahdelle asialle:
 *
 *   1. työlista: tason ≥ SYVA_ALIN laatta piirretään vain, jos se
 *      leikkaa alan (sama `alueella`-testi kuin `--alue`-rajauksella),
 *   2. luettelo: syvän tason `laatasto` on SAMASTA testistä laskettu
 *      bittikartta eikä levyltä luettu — luettelojobi (--vain-luettelo)
 *      ei näe shardien levyä, ja ilman bittikarttaa peli ja eheys-
 *      tarkistus tulkitsisivat "kaikki olemassa" (koko maailma).
 *
 * Miksi ei `--alue`: se on luettelossa PYRAMIDIN ala (juuritason
 * `alue`), ja Ranskan laatikko siellä väittäisi, ettei pyramidissa ole
 * muuta kuin Ranska. Syvä ala koskee vain syviä tasoja.
 *
 * Syvä taso ilman alaa on virhe: se olisi hiljainen koko maailman
 * z10-ajo tai luettelo, joka lupaa miljoona laattaa.
 */
const SYVA_ALIN = 9;
const syvaAlueTeksti = valitsin('syva-alue', null);
const SYVA_ALUE = syvaAlueTeksti
  ? (() => {
    const [a, b, c, d] = syvaAlueTeksti.split(',').map(Number);
    return {
      lon0: Math.min(a, c), lat0: Math.min(b, d), lon1: Math.max(a, c), lat1: Math.max(b, d),
    };
  })()
  : null;
if (TASOT.some((z) => z >= SYVA_ALIN) && !SYVA_ALUE) {
  console.error(`--tasot ${TASOT.join(',')}: tasot z${SYVA_ALIN}+ poltetaan vain alueelle — `
    + 'anna --syva-alue lon0,lat0,lon1,lat1 (esim. Ranska -5.5,41,9.8,51.5).');
  process.exit(1);
}
/*
 * DEM-KANSIO (`--dem`): Copernicus GLO-30 -ruudut
 * (Copernicus_DSM_COG_10_N44_00_E003_00_DEM.tif …, tools/maasto/).
 * Käytössä vain tasoilla ≥ SYVA_ALIN; matalammilla tasoilla lippu ei
 * muuta yhtään tavua. Ks. tools/maasto/dem-ikkuna.mjs.
 */
const DEM_KANSIO = valitsin('dem', null);
/*
 * GLO-90-KANSIO (`--dem90`, peruskartan resepti 2026-09-25): GLO-30 on
 * NAS:issa vain E28-laatikosta, joten koko maailman reliefi tarvitsee
 * GLO-90:n. Lähde valitaan täsmälleen kuten natiivin maastolaatoissa
 * (tools/maasto/tee-maasto.mjs kaksiLahdetta, GLO30_KYNNYS 0,001°):
 * pyramidin z0–z9 välit ovat kynnystä harvempia, joten niillä GLO-90 on
 * ensisijainen ja GLO-30 varalla; z10 (0,00052°) lukee ensin GLO-30:tä.
 * Ilman `--dem90`:tä ajo on tavulleen entinen (vain GLO-30).
 */
const DEM90_KANSIO = valitsin('dem90', null);
/** `--reseptinimi 2026-09-25` — nimetty resepti luetteloon (polta-paikallisesti.sh --resepti). */
const RESEPTINIMI = valitsin('reseptinimi', null);

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
/*
 * MERKKIPORTTI KOHDEMAAN ASETUKSELLA, KUN LAATASTO ON MAAKOHTAINEN
 * (ks. tools/fokuskartta/nostot.mjs "MERKKIPORTTI AJETAAN KOHDEMAAN
 * ASETUKSELLA"). `--nostomaa <ISO>` ajaa yhden maan laataston, jonka
 * peli lataa VAIN silloin kun se maa on kohdemaa — joten portin on
 * saatava sama `kohdemaa: true` kuin elävällä kerroksella. Ilman
 * `--nostomaa` ajo on entinen maailmanlaajuinen, ja katto 21 sekä
 * `lahi`-lippu pysyvät voimassa.
 */
const nostot = keraaNostot(pack, { maittain: Boolean(NOSTO_MAA) });
console.log(nostojenYhteenveto(nostot.tilasto));
for (const rivi of nostot.tilasto.estot) console.log(`    esto ${rivi}`);

/*
 * MAAKOHTAISEN AJON MERKIT — YKSI SUODATIN, KOLME KÄYTTÄJÄÄ.
 *
 * Ladonta lasketaan aina KOKO MAAILMASTA (keraaNostot): naapurimaan
 * ladonta on osa tämän maan väistöä (tools/fokuskartta/nostot.mjs
 * maanUlkoisetEsteet), joten suodatus ei saa tapahtua ennen ladontaa
 * vaan vasta sen jälkeen. Muuten Ranskan merkit asettuisivat eri
 * paikkaan maakohtaisessa ajossa kuin maailmanlaajuisessa — ja
 * Raamatun ehto on sanatarkka: yksi ladonta, yksi lähde.
 *
 * Sama joukko menee kolmeen paikkaan, eikä kahta eriytyvää kopiota
 * synny: mustelaatikot (nostoLaatikot → peite → työlista ja
 * bittikartta), piirtosivun `nostot.json` ja luettelon
 * tunnus→tiiviste-taulu.
 */
/*
 * `--ilman-hahmotelmia` (Fablen erä L, 19.9.2026): uudelleenpoltto, joka
 * korjaa VANHENTUNEET tiivisteet (tools/tarkista-polton-tuoreus.mjs)
 * mutta jättää hahmotelmanostot (`hahmotelma-*`) eläviksi — linjaus:
 * hahmotelmat pysyvät elävinä pisteinä, niiden poltto on oma
 * päätöksensä. Hahmotelmat ovat silti LADONNASSA mukana (keraaNostot
 * latoo koko maailman), joten poltettujen paikat ja kyljet ovat samat
 * kuin pelin mallissa; ne vain eivät pala laattaan eivätkä tule
 * luettelon tiivistetauluun, jolloin peli piirtää ne elävinä.
 */
const ILMAN_HAHMOTELMIA = process.argv.includes('--ilman-hahmotelmia');
/*
 * POIKKEUKSET (`--polta-hahmotelmat tunnus,tunnus`, omistaja 21.9.2026):
 * yksittäinen hahmotelmanosto saa palaa laattaan, vaikka muut jäävät
 * eläviksi — Étretat ykköstasolle (docs/raportit/poltto-koe-20260920.md,
 * vedos). Luettelon tiivistetaulu saa sen kuten muutkin poltetut, joten
 * peli vaientaa elävän merkin.
 */
const POLTETTAVAT_HAHMOTELMAT = new Set(String(valitsin('polta-hahmotelmat', '')).split(',').map((s) => s.trim()).filter(Boolean));
/*
 * NOSTOT KOLMEEN TASOON (omistajan tilaus 20.9.2026 ilta, vedos):
 * `--nostotasot <json>` = { <tunnus>: 1|2|3, "@kuvat": { <laji>: <png/svg> } }.
 * Taso 1 = tärkeimmät: symboli ja nimiö NOSTO_TASO1_KERROIN-kertaisina ja
 * lajin kuvamerkki (sama kuvarajapinta kuin koristeilla) symbolin päällä;
 * taso 2 = nykyinen; taso 3 = vain z7+ (peite ja piirto). Sisältökirjuri
 * tuo kentän `taso` nostoihin; tämä tiedosto on vedoksen väliaikainen
 * ohitus siihen asti. Ilman tiedostoa käytös on ennallaan (kaikki taso 2).
 */
const NOSTOTASOT = valitsin('nostotasot', null) ? JSON.parse(readFileSync(valitsin('nostotasot', null), 'utf8')) : null;
const NOSTO_TASO1_KERROIN = 1.5;
const NOSTO_TASO3_ALIN_Z = 7;
const nostonTaso = (m) => Number(NOSTOTASOT?.[m.tunnus] ?? m.taso ?? 2) || 2;
/*
 * `--nostot-ilman-nimioita` (Fable 23.9.2026, paatokset 20.9.: kohdemaan
 * nimiöt elävinä): nostotasolle palaa vain merkki (harmaa piste tai
 * kuvamerkki), ei nimeä — peli piirtää nimen elävänä sovittelun läpi
 * (js/pallo.js pallonNostonPisteLaatassa, koe `poltetutnostot`).
 * Tiiviste ei muutu (se lasketaan merkin datasta ennen tätä), ja
 * maan kirjaus saa kentän `nimiot: false`, josta peli tunnistaa tilan.
 */
const NOSTOT_ILMAN_NIMIOITA = lippu('nostot-ilman-nimioita');
const poltettavatMerkit = nostot.merkit
  .filter((m) => m.poltettava && (!NOSTO_MAA || m.iso === NOSTO_MAA))
  .filter((m) => !ILMAN_HAHMOTELMIA || !String(m.tunnus ?? '').startsWith('hahmotelma-')
    || POLTETTAVAT_HAHMOTELMAT.has(String(m.tunnus ?? '')))
  .map((m) => {
    const taso = nostonTaso(m);
    const nimio = NOSTOT_ILMAN_NIMIOITA ? { nimioNakyy: false } : {};
    if (taso === 1) {
      const kuva = NOSTOTASOT?.['@kuvat']?.[m.laji] ?? NOSTOTASOT?.['@kuvat']?.[m.symboli] ?? null;
      return { ...m, taso, porras: m.porras * NOSTO_TASO1_KERROIN, nimioRajaton: true, ...(kuva ? { kuva } : {}), ...nimio };
    }
    return { ...m, taso, ...nimio };
  });
if (NOSTOTASOT) {
  const n = [1, 2, 3].map((k) => poltettavatMerkit.filter((m) => m.taso === k).length);
  console.log(`  nostotasot      taso 1: ${n[0]}, taso 2: ${n[1]}, taso 3: ${n[2]} (z${NOSTO_TASO3_ALIN_Z}+)`);
}
/** Tämän ajon tunnus→tiiviste-taulu (maakohtaisessa ajossa maan omat). */
const poltettuLuettelo = NOSTO_MAA
  ? Object.fromEntries(poltettavatMerkit.map((m) => [m.tunnus, m.tiiviste]))
  : nostot.luettelo;
if (NOSTOTASO && NOSTO_MAA) {
  console.log(`  nostotaso       ${NOSTO_MAA}: ${poltettavatMerkit.length} poltettavaa `
    + `merkkia (koko maailmassa ${nostot.merkit.filter((m) => m.poltettava).length})`);
  if (!poltettavatMerkit.length) {
    console.error(`--nostomaa ${NOSTO_MAA}: maalla ei ole yhtaan poltettavaa nostoa.`);
    process.exit(1);
  }
}

const { projektio } = LAUTA;
const kaava = laudanProjektio(projektio);

/*
 * TASOITUKSEN MERI VAPAAKSI (`--tasoitus-meri vapaa`, KOE; Fable 26.9.2026,
 * resepti 2026-09-26). Tasoitusharso (päätös 4, 13.9.2026) peittää kaiken
 * kohdemaan ulkopuolisen kermalla, myös meren: laatikon sisällä pohjan
 * syvyysliuku näkyy vain ~12 %:sti, ulkopuolella täysin, joten resepti 26:n
 * meri ei näy kohdemaanäkymässä. Tällä lipulla harso pyyhitään meren kohdalta
 * (alfa 0) samoista meren renkaista kuin pohjan rantaviiva (ne_10m_ocean,
 * sama --rannikon-harvennus), kuten natiivin kermahuntu on vain maalla.
 * Oletus `peitto` = entinen harso tavulleen. Omistajan päätös ratkaisee,
 * tuleeko tästä oletus (kumoaisi päätöksen 4 kohdan "aluevesi tasoitetaan
 * muun meren mukana").
 */
const TASOITUS_MERI_VAPAA = valitsin('tasoitus-meri', 'peitto') === 'vapaa';
/** Meren renkaat laudan koordinaateissa, vain laatikon lähellä olevat. */
function tasoituksenMeri() {
  const renkaat = meriRenkaat(dataKansio, { harvennus: RANNIKON_HARVENNUS });
  const L = VARI_LAATIKKO; const reuna = (VARI_FEIDAUSREUNA || 0) + 50;
  const ulos = [];
  for (const r of renkaat) {
    const lauta = r.map(([lon, lat]) => [kaava.lautaX(lon), kaava.lautaY(lat)]);
    let x0 = Infinity; let x1 = -Infinity; let y0 = Infinity; let y1 = -Infinity;
    for (const [x, y] of lauta) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    if (L && (x1 < L.x - reuna || x0 > L.x + L.w + reuna || y1 < L.y - reuna || y0 > L.y + L.h + reuna)) continue;
    ulos.push(lauta);
  }
  return ulos;
}

/* ------------------------------------------------- väritason alue */

/*
 * VÄRITASON ALUE = KOHDEMAAN LAATIKKO + ALUEVESIPUSKURI.
 *
 * Laatikko luetaan SAMASTA aineistosta, jota peli käyttää leikkuriin
 * (assets/data/maapolygonit.json, ne_10m_admin_0_countries, ISO A3) ja
 * SAMALLA funktiolla (js/maanaariviivat.js maanLautalaatikko), jotta
 * laatat kattavat täsmälleen sen alan, jonka leikkuri voi paljastaa.
 * Toinen laskenta ehtisi ajautua muutaman yksikön sivuun, ja silloin
 * rannikolle jäisi laataton kaistale juuri siihen, mihin puskuri
 * ulottuu.
 *
 * MERENTAKAISET OSAT EIVÄT OLE MUKANA, koska maanLautalaatikko jättää
 * ne pois (SAARIVARA): Ranskan Guayana ja Réunion tekisivät laatikosta
 * puolen maailman levyisen ja ajosta tuntien mittaisen. Ne ovat oma
 * eränsä, jos niihin joskus matkustetaan.
 *
 * PUSKURI LISÄTÄÄN LAATIKKOON EIKÄ RENKAISIIN: laatikko on karkea
 * rajaus työlle, ja tarkka aluevesiraja on pelin leikkurissa. Laatikon
 * on oltava vähintään yhtä suuri kuin leikkuri, ei tarkalleen sen
 * muotoinen.
 */
let VARI_LEIKKURI = null;
let VARI_LAATIKKO = null;
let VARI_FEIDAUSREUNA = 0;
if (VARITASO) {
  const { maanAluevesiRenkaat, maanLautalaatikko } = await import(`${JUURI}/js/maanaariviivat.js`);
  const polygonit = JSON.parse(
    readFileSync(join(JUURI, 'assets/data/maapolygonit.json'), 'utf8'),
  );
  const laatikkoLaudalla = maanLautalaatikko(polygonit, VARI_MAA);
  if (!laatikkoLaudalla) {
    console.error(`--vari ${VARI_MAA}: maata ei ole aineistossa `
      + 'assets/data/maapolygonit.json (avaimena ISO A3).');
    process.exit(1);
  }
  /*
   * LAATIKKO ON KAHDEN EHDON SUUREMPI (erä 1b).
   *
   *   (1) maan laatikko × VARI_KERROIN (1,15) — se on kaikki, mitä
   *       pelaaja voi nähdä, koska uloszoomauksen esto pysäyttää
   *       kameran samaan kertoimeen (js/pallolauta/lauta.js).
   *   (2) maan laatikko + aluevesipuskuri — leikkuri ulottuu 12 mpk
   *       maan ulkopuolelle, ja laataton kaistale juuri siinä olisi
   *       sininen vesi ilman laattaa.
   *
   * Isolla maalla (1) voittaa, pikkuvaltiolla (2): Singaporen laatikko
   * on 12 × 6 yksikköä, jonka 15 % on 0,9 — vähemmän kuin puskurin
   * 6,7. Kumpikin ehto on pakko, joten laatikko on niiden UNIONI.
   */
  let kx = Math.max((VARI_KERROIN - 1) / 2 * laatikkoLaudalla.w, ALUEVESI_YKSIKKOA);
  let ky = Math.max((VARI_KERROIN - 1) / 2 * laatikkoLaudalla.h, ALUEVESI_YKSIKKOA);
  /*
   * `--laatikko-nakyma`: laatikko kasvaa koko näkyvään alaan
   * uloimmalla sallitulla zoomilla, kaikilla kuvasuhteilla (ks.
   * NAKYMAN_KUVASUHTEET). Kasvatus on UNIONI entisen kanssa, joten
   * aluevesipuskuri ja kerroin pysyvät alarajana eikä pikkuvaltio
   * kutistu.
   */
  if (VARI_LAATIKKO_NAKYMA) {
    let nakymaW = laatikkoLaudalla.w * VARI_KERROIN;
    let nakymaH = laatikkoLaudalla.h * VARI_KERROIN;
    for (const [rw, rh] of NAKYMAN_KUVASUHTEET) {
      const tarve = Math.max(laatikkoLaudalla.w * VARI_KERROIN,
        (laatikkoLaudalla.h * VARI_KERROIN * rw) / rh);
      nakymaW = Math.max(nakymaW, tarve);
      nakymaH = Math.max(nakymaH, (tarve * rh) / rw);
    }
    kx = Math.max(kx, (nakymaW - laatikkoLaudalla.w) / 2);
    ky = Math.max(ky, (nakymaH - laatikkoLaudalla.h) / 2);
  }
  const x0 = laatikkoLaudalla.x - kx;
  const x1 = laatikkoLaudalla.x + laatikkoLaudalla.w + kx;
  const y0 = laatikkoLaudalla.y - ky;
  const y1 = laatikkoLaudalla.y + laatikkoLaudalla.h + ky;
  VARI_LAATIKKO = {
    x: x0, y: y0, w: x1 - x0, h: y1 - y0, kerroin: VARI_KERROIN,
    nakyma: VARI_LAATIKKO_NAKYMA,
  };
  ALUE = {
    lon0: kaava.lautaLon(x0),
    lon1: kaava.lautaLon(x1),
    lat0: kaava.lautaLat(y1),
    lat1: kaava.lautaLat(y0),
  };
  /*
   * LEIKKURIN RENKAAT TULEVAT PELIN OMASTA FUNKTIOSTA. Sama aineisto,
   * sama puskuri ja sama harvennus kuin pelin aluevesirajalla — jos
   * generaattori laskisi rajan omalla kaavallaan, laatan poltettu
   * reuna ja pelin oma raja ehtisivät eriytyä eikä kukaan huomaisi
   * sitä kuin rannikkoa katsomalla.
   */
  /*
   * TASOITUKSESSA PUSKURI ON 0 (erä 1c, ks. TASOITUSAJO): sininen
   * aluevesi ei kuulu alkuperäiseen, joten 12 mpk:n kaistale
   * tasoitetaan muun meren mukana ja leikkuri on maan oma polygoni.
   * Sama funktio, eri puskuri — rajan lähde pysyy yhtenä.
   */
  const LEIKKURIN_PUSKURI = TASOITUSTASO ? 0 : ALUEVESI_YKSIKKOA;
  const renkaat = VARI_ILMAN_RAJAUSTA
    ? [] : maanAluevesiRenkaat(polygonit, VARI_MAA, LEIKKURIN_PUSKURI);
  let pisteita = 0;
  for (const r of renkaat) pisteita += r.length;
  VARI_FEIDAUSREUNA = VARI_FEIDAUSREUNA_ANNETTU === null
    ? Math.round(0.15 * Math.min(VARI_LAATIKKO.w, VARI_LAATIKKO.h))
    : Number(VARI_FEIDAUSREUNA_ANNETTU);
  /*
   * TASOITUKSEN VASTAKOE SÄILYTTÄÄ LEIKKURIN MUTTA RIISUU RENKAAT
   * (ks. polttaVariLeikkuri): kerma valuu silloin myös kohdemaan
   * päälle, ja savukkeen V2:n ON kaaduttava. Erän 1b paleteilla
   * `--ilman-rajausta` jättää leikkurin yhä nulliksi, jolloin laatta on
   * läpinäkymätön värillinen suorakaide.
   */
  VARI_LEIKKURI = (VARI_ILMAN_RAJAUSTA && !TASOITUSTASO) ? null : {
    renkaat,
    tasoitus: TASOITUSTASO,
    paperi: TASOITUSTASO ? TASOITUS_KERMA : undefined,
    feidaus: VARI_FEIDAUS,
    feidausReuna: VARI_FEIDAUSREUNA,
    laatikko: VARI_LAATIKKO,
    laudanLeveys: polygonit?.lauta?.leveys > 0 ? polygonit.lauta.leveys : 12000,
    ...(TASOITUS_MERI_VAPAA ? { meri: tasoituksenMeri() } : {}),
  };
  console.log(`  väritaso        ${VARI_MAA} · laatikko laudalla `
    + `x ${x0.toFixed(1)}..${x1.toFixed(1)} y ${y0.toFixed(1)}..${y1.toFixed(1)} `
    + `(kerroin ${VARI_KERROIN}, puskuri ${ALUEVESI_YKSIKKOA} yksikköä = 12 mpk`
    + `${VARI_LAATIKKO_NAKYMA ? ', NÄKYMÄUNIONI' : ''}) · `
    + `versio ${VARIVERSIO} · polku ${VARI_AMPARIKANSIO}/z<taso>/<sarake>/<rivi>.${MUOTO}`);
  console.log(`  väripaletti     ${VARIPALETTI} · `
    + (TASOITUSTASO
      ? `peitto ${TASOITUS_PEITTO} · kerma ${TASOITUS_KERMA} · leikkuri maan polygoni (puskuri 0) `
      : `vesi ${VARI_VESI === null ? 'paletin oletus' : VARI_VESI} · feidaus ${VARI_FEIDAUS} `)
    + `(häive ${VARI_FEIDAUSREUNA} yks) · `
    + (VARI_ILMAN_RAJAUSTA
      ? 'LEIKKURI POIS (--ilman-rajausta, vastakoe)'
      : `leikkuri ${renkaat.length} rengasta / ${pisteita} pistettä`));
}

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

/*
 * RANTATASON SISÄLTÖ ON RANTAVIIVA — SAMA KUTSU KUIN POHJASSA.
 *
 * `rannikot(kansio, { laatikko })` on täsmälleen se, minkä
 * keraaMaailma kokoaa pohjalle (maailma.mjs: meriRenkaat harvennuksella
 * 0,006° ja rannikotRenkaista samalla laatikolla), joten tason muste
 * osuu pikselilleen siihen kohtaan, josta se pohjasta jäi pois.
 *
 * LAISKASTI, koska aineistokansiota ei ole aina: `--vain-luettelo`
 * osaa laskea nosto- ja viivatason peitteen pelkästä laudasta, ja
 * sama ajo tekee rantatason peitteen vain jos rantataso on pyydetty
 * (--rantataso tai --rantaversio).
 */
let rantaViivatMuisti = null;
function rantaViivat() {
  if (rantaViivatMuisti) return rantaViivatMuisti;
  try {
    rantaViivatMuisti = rannikot(dataKansio, { laatikko, harvennus: RANNIKON_HARVENNUS });
  } catch (e) {
    console.error(`Rantataso tarvitsee ne_10m_ocean.geojson-tiedoston kansiosta ${dataKansio} `
      + `(--data <kansio>): ${e.message}`);
    process.exit(1);
  }
  return rantaViivatMuisti;
}

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

/*
 * ============ KORKEUSRUUDUKON LAATIKKO ==============================
 *
 * VEKTORIT KOKO LAUDALTA, KORKEUDET VAIN AJETULTA ALALTA.
 *
 * Rannikot ja järvet ovat kevyitä ja ne kootaan aina koko laudalta;
 * korkeusruudukko ei ole. Koko laudan ruudukko on 3′:llä 44 Mt mutta
 * yhdellä kaariminuutilla 395 Mt — ja se olisi vielä siirrettävä
 * selainsivulle, joka piirtää siitä yhden pituuskaistan. Siksi ajo
 * kokoaa ruudukon vain siltä alalta, jonka se todella piirtää.
 *
 * ALA ON LOHKOJEN UNIONI REUNUKSINEEN, EI PYYDETTY ALUE. Lohko
 * piirretään reunuksen verran isompana (ks. REUNUS), ja jokainen
 * pikseli lukee korkeutta myös naapureistaan (varjo on
 * keskeisdifferenssi). Marginaali on sama puoli astetta kuin koko
 * laudan laatikossa, eli 30 solua 1′:llä — moninkertaisesti se, mitä
 * bilineaarinen näyte ja varjon askel yltävät hakemaan.
 *
 * LAATIKKO EI KOSKAAN KASVA KOKO LAUDAN LAATIKKOA SUUREMMAKSI. Se on
 * leikattu siihen molemmista päistä, ja siksi täyden leveyden ajo saa
 * TÄSMÄLLEEN saman laatikon kuin ennen tätä muutosta — 3′-tuotannon
 * laatat pysyvät tavulleen entisinä.
 */
function korkeudenLaatikko(MARGINAALI = 0.5) {
  if (!lohkot.size) return laatikko;
  const R = PATINA ? reunusTasolle() : 0;
  let ax0 = Infinity; let ax1 = -Infinity;
  let ay0 = Infinity; let ay1 = -Infinity;
  for (const { mitat, bx, by } of lohkot.values()) {
    const s0 = bx * LOHKO;
    const r0 = by * LOHKO;
    const pw = Math.min(Math.min(LOHKO, mitat.sarakkeita - s0) * LAATTA,
      mitat.leveys - s0 * LAATTA);
    const ph = Math.min(Math.min(LOHKO, mitat.riveja - r0) * LAATTA,
      mitat.korkeus - r0 * LAATTA);
    const kx0 = s0 * LAATTA - R;
    const ky0 = r0 * LAATTA - R;
    ax0 = Math.min(ax0, arkinBbox.x + kx0 / mitat.px);
    ax1 = Math.max(ax1, arkinBbox.x + (kx0 + pw + 2 * R) / mitat.px);
    ay0 = Math.min(ay0, arkinBbox.y + ky0 / mitat.px);
    ay1 = Math.max(ay1, arkinBbox.y + (ky0 + ph + 2 * R) / mitat.px);
  }
  return {
    lon0: Math.max(laatikko.lon0, snap(kaava.lautaLon(ax0) - MARGINAALI, true)),
    lon1: Math.min(laatikko.lon1, snap(kaava.lautaLon(ax1) + MARGINAALI, false)),
    lat0: Math.max(laatikko.lat0, snap(kaava.lautaLat(ay1) - MARGINAALI, true)),
    lat1: Math.min(laatikko.lat1, snap(kaava.lautaLat(ay0) + MARGINAALI, false)),
  };
}

/**
 * Osuuko laatta pyydettyyn alueeseen? Null = koko maailma.
 * `alue` on oletuksena `--alue`; syvien tasojen ala (SYVA_ALUE) testataan
 * samalla funktiolla, jotta työlista ja luettelon bittikartta ovat
 * samaa mieltä.
 */
function alueella(mitat, sarake, rivi, alue = ALUE) {
  if (!alue) return true;
  const b = laatanBbox(mitat, sarake, rivi);
  const lat1 = kaava.lautaLat(b.y);
  const lat0 = kaava.lautaLat(b.y + b.h);
  if (lat1 < alue.lat0 || lat0 > alue.lat1) return false;
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
  const alueenLev = ((((alue.lon1 - alue.lon0) % 360) + 360) % 360) || 360;
  const ero = (a, b2) => (((b2 - a) % 360) + 360) % 360;
  return ero(lonA, alue.lon0) < laatanLev || ero(alue.lon0, lonA) < alueenLev;
}

/** Syvän tason (z ≥ SYVA_ALIN) laatta vain syvällä alalla; muut aina. */
function syvallaAlalla(mitat, sarake, rivi) {
  return mitat.z < SYVA_ALIN || alueella(mitat, sarake, rivi, SYVA_ALUE);
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
 * sama taulukko jolla nimiö ladotaan), siirtoviiva janan päistä, ja
 * päälle patinan paperivakiomarginaali. (Viivan päät olivat pois
 * yhden vuorokauden ajan 31.8.2026; omistaja pyysi siirtoviivat
 * takaisin 1.9.2026 illalla, ks. js/fokusniput.js sääntö 6.) Laatikko
 * on VÄLJÄ: ylimitta maksaa muutaman lähes tyhjän laatan, alimitta
 * katkaisisi noston laattarajalle.
 */
/** Patinan musteen ulottuma laatan reunan yli kuvapikseleinä
 *  (leviäminen 2 px + rosoisuus + varaa). */
const NOSTO_MARGINAALI_PX = 12;

/** Poltettavien nostojen mustelaatikot laudan yksiköissä (kerran). */
const nostoLaatikot = poltettavatMerkit.map((m) => {
  const lk = nostosymPolttoLaatikko(m);
  let x1 = m.x + lk.x1 * m.porras;
  let x2 = m.x + lk.x2 * m.porras;
  let y1 = m.y + lk.y1 * m.porras;
  let y2 = m.y + lk.y2 * m.porras;
  /*
   * SIIRTOVIIVA VENYTTÄÄ LAATIKKOA ANKKURIIN ASTI. Viiva on merkin
   * mustetta siinä missä symboli ja nimiö: jos sen päät jäisivät
   * laatikon ulkopuolelle, viiva katkeaisi laattarajalle eikä
   * ankkuripään laattaa piirrettäisi lainkaan. Vara on viivan oma
   * leveys kaksinkertaisena, jottei pyöristetty pää jää rajan taakse.
   */
  const v = m.viiva;
  if (v) {
    const vara = (v.leveys ?? 0) * 2;
    x1 = Math.min(x1, Math.min(v.x1, v.x2) - vara);
    x2 = Math.max(x2, Math.max(v.x1, v.x2) + vara);
    y1 = Math.min(y1, Math.min(v.y1, v.y2) - vara);
    y2 = Math.max(y2, Math.max(v.y1, v.y2) + vara);
  }
  return {
    x1, x2, y1, y2, taso: m.taso ?? 2,
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
    if (lk.taso === 3 && mitat.z < NOSTO_TASO3_ALIN_Z) continue;
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
 * PÄIVITETTY LAUTAPELITYYLIIN (omistaja 1.9.2026, ks. maailmapiirto.js
 * REITTITYYLI): veto, katkon heitto ja helmi kasvoivat, ja vapina on
 * uusi.
 *
 * PÄIVITETTY UUDESTAAN (omistaja 1.9.2026 ilta, ks. maailmapiirto.js
 * REITTITYYLI "MAA PALAA YHTENÄISEEN VIIVAAN"): helmi 15 -> 10 ja
 * kehä 9,0 -> 6,0, ja maantie on yhtenäinen 6,0:n veto. Molemmat
 * ulottumat siis KUTISTUVAT — mutta ne lasketaan yhä lajien
 * YLÄRAJASTA, eli meren katkoviivasta ja meren helmen ankkurista.
 *
 * JA VIELÄ KERRAN (omistaja 1.9.2026 myöhään illalla, ks. REITTITYYLI
 * "MERI KAPENEE JA TIHENEE"): meren veto 9,0 -> 7,5 ja jakso
 * 190 -> 150. Veton kaventuminen ei näy `reitti`-ulottumassa
 * lainkaan, koska sen määrää helmi eikä veto; JAKSON lyhentyminen sen
 * sijaan kutistaa `helmi`-ulottuman, koska ankkurin suurin siirtymä on
 * puoli jaksoa.
 *
 * JA KERRAN VIELÄ (omistaja 2.9.2026 aamu, ks. REITTITYYLI "LYHYEMPI
 * KATKO, TIHEÄMPI RYTMI"): jakso 150 -> 90. Sama sääntö, sama seuraus
 * — `helmi` kutistuu puolen jakson verran, muut eivät liiku:
 *
 *   reitti  MERI: solmuheitto 0,60 + vapina 0,35 + katkon sivu 0,55
 *           + kaari 0,95 + puoli veton leveyttä
 *           (7,5 · 1,12 / 2 = 4,20)                          = 6,65
 *           MAA: solmuheitto 0,60 + vapina 0,35 + puoli veton
 *           leveyttä (6,0 · 1,12 / 2 = 3,36)                  = 4,31
 *           MUTTA helmi on kummallakin lajilla VIIVALLA, joten
 *           korridorin on katettava myös helmen ulottuma
 *           säde 10 + puoli kehää (6,0 / 2 = 3,0)             = 13,0
 *   helmi   MERELLÄ ankkuri voi siirtää helmen jopa puoli jaksoa
 *           (90 / 2 = 45) pitkin viivaa raakapaikastaan:
 *           13,0 + 45                                         = 58,0
 *           (maalla ankkuria ei ole, joten siellä riittää 13,0)
 *           MITATTU koko laudalta z7:llä (350 merihelmeä): suurin
 *           todellinen siirtymä on 44,5 px eli alle puolen jakson,
 *           kuten yläraja lupaa.
 *   raja    puoli veton leveyttä (1,8 / 2)                    = 0,90
 *   joki    puoli pääuoman leveyttä (2,6 / 2) ja varaa sille, että
 *           uoma piirtyy pehmeänä käyränä pisteiden LÄPI
 *           (maailmapiirto.js lautaKaari), joten se pullistuu
 *           murtoviivan ulkopuolelle                          = 2,0
 *
 * LENTOREITTEJÄ EI OLE ENÄÄ LISTASSA: ne eivät ole viivatasolla
 * lainkaan (ks. LENNOT EIVÄT OLE VIIVATASOLLA).
 */
const ULOTTUMA = {
  reitti: 13.2, helmi: 58.5, raja: 1.0, joki: 2.0,
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

  /*
   * --- joet ------------------------------------------------------
   *
   * Uomat piirtyvat JOKA TASOLLA (maailmapiirto.js: kaikki uomat
   * piirretaan joka tasolla), toisin kuin reitit, jotka alkavat
   * VIIVA_REITIT_ALIN-tasolta. Peite lasketaan samalla janakaavalla
   * kuin reiteilla, ULOTTUMA.joki-marginaalilla.
   */
  if (O.joet !== false) {
    const kierrosJ = projektio.leveys ?? 0;
    const siirrotJ = kierrosJ ? [-kierrosJ, 0, kierrosJ] : [0];
    const mj = ULOTTUMA.joki * R + VIIVA_MARGINAALI_PX;
    for (const joki of lautaSisalto.joet ?? []) {
      const poly = joki.pisteet ?? [];
      for (const d of siirrotJ) {
        for (let i = 1; i < poly.length; i += 1) {
          const ax = poly[i - 1][0] + d;
          const bx = poly[i][0] + d;
          if (kierrosJ && Math.abs(bx - ax) > kierrosJ / 2) continue;
          lisaaJana(joukko, mitat, px(ax), py(poly[i - 1][1]), px(bx), py(poly[i][1]), mj);
        }
      }
    }
  }

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
    const lisaaPoly = (poly, ulottumaR, valit) => {
      const m = ulottumaR * R + VIIVA_MARGINAALI_PX;
      for (const d of siirrot) {
        for (const [v0, v1] of valit) {
          for (let i = v0 + 1; i <= v1; i += 1) {
            const ax = poly[i - 1][0] + d;
            const bx = poly[i][0] + d;
            // Sauman yli avattu hyppy ei ole jana (js/rules.js avaaSauma).
            if (KIERROS && Math.abs(bx - ax) > KIERROS / 2) continue;
            lisaaJana(joukko, mitat, px(ax), py(poly[i - 1][1]), px(bx), py(poly[i][1]), m);
          }
        }
      }
    };
    /*
     * PEITE LUKEE PIIRTOVÄLIT, EI KOKO MURTOVIIVAA. Rinnakkaiskarsinta
     * (tools/fokuskartta/reittikarsinta.mjs) jättää osan reitistä
     * piirtämättä, ja jos peite laskisi sen mukaan, luettelo lupaisi
     * täysin läpinäkyviä laattoja. Sama lista ohjaa piirtoa
     * (maailmapiirto.js katkoPolku) — yksi lähde, kuten aina.
     *
     * LENTOREITTEJÄ EI LASKETA: ne eivät ole viivatasolla (ks. LENNOT
     * EIVÄT OLE VIIVATASOLLA).
     */
    for (const r of lautaSisalto.reitit) {
      lisaaPoly(r.poly, ULOTTUMA.reitti, r.piirtoValit ?? [[0, r.poly.length - 1]]);
    }
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

/* ------------------------------------------------- rantatason peite */

/*
 * MUSTEEN ULOTTUMA PIKSELEINÄ — PAPERIVAKIO, EI REITTIYKSIKKÖ.
 *
 * Rantaviivan leveys on paperivakio (RANTATYYLI, paperiS = 1), joten
 * ulottuma on sama luku joka tasolla: puolet leveimmästä vedosta
 * (usva 3 px) plus patinan musteen ulottuma laatan reunan yli. Pyöreä
 * liitos ei ulotu vetoa kauemmas, joten puolikas riittää.
 */
const RANTA_ULOTTUMA_PX = RANTATYYLI.usva.leveys / 2;

/**
 * Tason rantaviivalliset laatat joukkona "sarake:rivi".
 *
 * SAMA SOPIMUS KUIN VIIVATASOLLA: tämä funktio antaa sekä työlistan
 * että luettelon bittikartan, joten peli ei voi pyytää laattaa, jota
 * ajo ei kirjoittanut — eikä jättää pyytämättä laattaa, joka on.
 *
 * SAUMAN YLI EI VEDETÄ (maailmapiirto.js viivaPolku): Natural Earth
 * katkaisee monikulmionsa pituusasteelle ±180, ja kierrosta vastaava
 * hyppy on aina yli puoli arkkia. Peitteen on noudatettava samaa
 * sääntöä, tai se lupaisi laattoja, joihin ei piirry mitään.
 */
function rantatasonPeite(mitat) {
  const joukko = new Set();
  const m = RANTA_ULOTTUMA_PX + VIIVA_MARGINAALI_PX;
  /*
   * KARTTA-ALAN RIVIT: piirto leikkaa musteen atlaskehyksen
   * marginaaliin (piirraRantataso), ja rantaviivan aineisto ulottuu
   * laatikon puolen asteen varan verran sen yli. Ilman tätä rajausta
   * luettelo lupaisi marginaaliin täysin läpinäkyviä laattoja.
   */
  const S = mitat.leveys / 6400;
  const yYla = Math.round(KEHYS.yla * S);
  const yAla = mitat.korkeus - Math.round(KEHYS.ala * S);
  const riviAlku = Math.floor(yYla / LAATTA);
  const riviLoppu = Math.floor(Math.max(yYla, yAla - 1) / LAATTA);
  const puoliArkki = arkinBbox.w / 2;
  const px = (bx) => (bx - arkinBbox.x) * mitat.px;
  const py = (by) => (by - arkinBbox.y) * mitat.px;
  for (const viiva of rantaViivat()) {
    let ex = null;
    let ey = null;
    for (const [lon, lat] of viiva) {
      const bx = kaava.lautaX(lon);
      const by = kaava.lautaY(lat);
      if (ex !== null && Math.abs(bx - ex) <= puoliArkki) {
        lisaaJana(joukko, mitat, px(ex), py(ey), px(bx), py(by), m);
      }
      ex = bx;
      ey = by;
    }
  }
  for (const avain of [...joukko]) {
    const rivi = Number(avain.split(':')[1]);
    if (rivi < riviAlku || rivi > riviLoppu) joukko.delete(avain);
  }
  return joukko;
}

/** Tason nostolaatasto bittikarttana base64:nä (sama muoto kuin
 *  pohjan `laatasto`, ks. teeLuettelo — peli purkaa ne samalla
 *  koodilla). */
/*
 * NIMIÖTASON PEITE JA METADATA samasta ladonnasta kuin piirto
 * (maailmapiirto.js nimiotasonLadonta). Tekstin leveys mitataan tässä
 * ilman kangasta likiarvolla NIMION_MERKKILEVEYS × korkeus per merkki
 * + harvennus — peite saa olla hitusen leveä (turha läpinäkyvä laatta
 * on halpa), mutta EI kapea (puuttuva laatta katkaisisi nimen).
 * Laatikko metadataan on sama likiarvo; Pelikoodarin elävä sovittelu
 * käyttää sitä alana, ei pikselirajana.
 */
const NIMION_MERKKILEVEYS = 0.66;
let nimiotLista = null;
/*
 * POHJAKARTAN NIMIÖTASOLLE VAIN PYSYVÄT NIMET (omistaja 21.9.2026, Fable):
 * meret, lahdet ja kulttuurialueet; vuoden 1873 poliittiset nimet ja
 * rajat siirtyvät Vuosi 1873 -linssiin. Nimistön rivillä on kenttä
 * `aika: 'pysyva' | '1873'` (Sisältökirjuri); `--nimiot-aika pysyva`
 * pitää vain sen arvon rivit. Koristeet (kuva, kompassi, laiva) ja
 * rivit ilman kenttää pysyvät mukana — ne eivät ole poliittisia nimiä.
 */
const NIMIOT_AIKA = valitsin('nimiot-aika', null);
function nimiotasonNimiot() {
  if (nimiotLista) return nimiotLista;
  if (NIMIOT_LAHDE) nimiotLista = JSON.parse(readFileSync(NIMIOT_LAHDE, 'utf8'));
  else nimiotLista = NIMISTO_1873;
  if (NIMIOT_AIKA) {
    const ennen = nimiotLista.length;
    nimiotLista = nimiotLista.filter((n) => !n.aika || n.aika === NIMIOT_AIKA
      || ['kuva', 'kompassi', 'laiva'].includes(n.luokka));
    console.log(`  nimiöt          aika=${NIMIOT_AIKA}: ${nimiotLista.length}/${ennen} riviä`);
  }
  return nimiotLista;
}
/*
 * TÖRMÄYSTEN VÄISTÖ (Fable 20.9.2026, poltto-koe 2: *"maakuntanimi väistää
 * kaupunkia ja jokea"*; omistajan havainnot Loire/Orléanais, Auvergne/
 * nosto, Marseille/Provence, Île-de-France/Pariisi). Esteet ovat laudan
 * kaupungit (pack.cities, nimiön ala kaupungin oikealla puolella kuten
 * pelin nimilappu) ja joet (lautaSisalto.joet) sekä jo ladotut nimiöt.
 * Nimiö kokeilee järjestyksessä: paikallaan, ylös, alas, ylä-/ala-
 * viistoon, sivuille — askel on kirjainkorkeus — ja ottaa ensimmäisen
 * vapaan; jos mikään ei ole vapaa, se jää paikalleen (parempi näkyä
 * kuin kadota). Sama ladonta kirjoitetaan sivulle (nimiot.json
 * `tasot[z]`), peitteeseen ja metadataan, joten kolme lukijaa näkevät
 * saman paikan. Koristeet (kompassi, laiva) eivät väistä.
 */
/** Karkeilla tasoilla (z <= tämä) nimi ilman vapaata paikkaa jää pois. */
const NIMION_PUDOTUS_Z = 5;
const NIMION_VAISTO_ASKELIA = [[0, 0], [0, -1], [0, 1], [0.6, -0.8], [-0.6, -0.8], [0.6, 0.8], [-0.6, 0.8], [1.2, 0], [-1.2, 0], [0, -2], [0, 2], [1.2, -1.6], [-1.2, -1.6], [1.2, 1.6], [-1.2, 1.6], [0, -3], [0, 3]];
let esteMuisti = null;
function nimiotasonEsteet(mitat) {
  esteMuisti ??= new Map();
  if (esteMuisti.has(mitat.z)) return esteMuisti.get(mitat.z);
  const laatikot = [];
  const px = (bx) => (bx - arkinBbox.x) * mitat.px;
  const py = (by) => (by - arkinBbox.y) * mitat.px;
  // Kaupungit: piste + nimilapun ala oikealle (leveys ~ 7 merkkiä × 12 px).
  const kaupunkiKorkeus = { 4: 10, 5: 12, 6: 14, 7: 18, 8: 24 }[mitat.z] ?? 14;
  for (const c of pack.cities ?? []) {
    const x = px(c.x); const y = py(c.y);
    const nimi = String(c.name ?? c.id ?? '');
    laatikot.push([x - kaupunkiKorkeus, y - kaupunkiKorkeus, x + kaupunkiKorkeus * (1 + 0.6 * nimi.length), y + kaupunkiKorkeus]);
  }
  // Nostot (kaikki maat, ks. keraaNostot): merkki + nimiö puolelleen.
  // Nostot piirtyvät z5–z8, joten z4:llä ne eivät ole esteitä.
  if (mitat.z >= 5) {
    const nostoKorkeus = { 5: 10, 6: 12, 7: 15, 8: 20 }[mitat.z] ?? 14;
    for (const n of nostot.merkit ?? []) {
      if (!Number.isFinite(n.x) || !Number.isFinite(n.y)) continue;
      // Vain laattaan palavat merkit ovat esteitä: eläväksi jäävät
      // (merkkiportin takana, kaupungin sisäiset, hahmotelmat) eivät
      // piirry karkealla tasolla, ja 15/37 maakuntanimeä putosi z5:ltä
      // niiden laatikoiden takia (21.9.2026). Taso 3 piirtyy vasta z7+.
      if (!n.poltettava) continue;
      if ((Number(NOSTOTASOT?.[n.tunnus] ?? n.taso ?? 2) || 2) === 3 && mitat.z < NOSTO_TASO3_ALIN_Z) continue;
      const x = px(n.x); const y = py(n.y);
      const nimi = n.nimioNakyy === false ? '' : String(n.nimio ?? '');
      const lev = nostoKorkeus * 0.55 * nimi.length;
      const vasen = n.nimioPuoli === 'vasen';
      laatikot.push([x - nostoKorkeus - (vasen ? lev : 0), y - nostoKorkeus, x + nostoKorkeus + (vasen ? 0 : lev), y + nostoKorkeus]);
    }
  }
  // Joet: jokainen jana kapeana laatikkona (levennys 4 px). Karkeilla
  // tasoilla (z <= NIMION_PUDOTUS_Z) joki ei ole este: viiva on ohut ja
  // nimi sen päällä lukee hyvin, kun taas 15/37 maakuntanimeä putosi
  // z5:ltä jokien takia (mitattu 21.9.2026, mm. Normandia ja Provence).
  const joet = [];
  for (const joki of (mitat.z <= NIMION_PUDOTUS_Z ? [] : (lautaSisalto.joet ?? []))) {
    const p = joki.pisteet ?? [];
    for (let i = 1; i < p.length; i += 1) {
      joet.push([Math.min(px(p[i - 1][0]), px(p[i][0])) - 4, Math.min(py(p[i - 1][1]), py(p[i][1])) - 4,
        Math.max(px(p[i - 1][0]), px(p[i][0])) + 4, Math.max(py(p[i - 1][1]), py(p[i][1])) + 4, [px(p[i - 1][0]), py(p[i - 1][1]), px(p[i][0]), py(p[i][1])]]);
    }
  }
  const esteet = { laatikot, joet };
  esteMuisti.set(mitat.z, esteet);
  return esteet;
}
const laatikotLeikkaavat = (a, b) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1];
function janaLeikkaaLaatikon(j, l) {
  // Karkea: janan laatikko leikkaa ja janan keskikohta tai päät ovat laatikossa, tai jana ylittää laatikon.
  const [x0, y0, x1, y1] = j;
  const sisalla = (x, y) => x >= l[0] && x <= l[2] && y >= l[1] && y <= l[3];
  if (sisalla(x0, y0) || sisalla(x1, y1) || sisalla((x0 + x1) / 2, (y0 + y1) / 2)) return true;
  // Leikkaako jana laatikon jonkin sivun (parametrinen leikkaus).
  const sivut = [[l[0], l[1], l[2], l[1]], [l[2], l[1], l[2], l[3]], [l[2], l[3], l[0], l[3]], [l[0], l[3], l[0], l[1]]];
  const d = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  return sivut.some(([ax, ay, bx, by]) => {
    const d1 = d(x0, y0, x1, y1, ax, ay); const d2 = d(x0, y0, x1, y1, bx, by);
    const d3 = d(ax, ay, bx, by, x0, y0); const d4 = d(ax, ay, bx, by, x1, y1);
    return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
  });
}
function laatikkoVapaa(laatikko, esteet, ladotut) {
  for (const e of esteet.laatikot) if (laatikotLeikkaavat(laatikko, e)) return false;
  for (const l of ladotut) if (laatikotLeikkaavat(laatikko, l)) return false;
  for (const j of esteet.joet) if (laatikotLeikkaavat(laatikko, j) && janaLeikkaaLaatikon(j[4], laatikko)) return false;
  return true;
}
const ladontaMuisti = new Map();
function nimiotasonLadonnat(mitat) {
  if (ladontaMuisti.has(mitat.z)) return ladontaMuisti.get(mitat.z);
  const mittaa = (teksti, fontti) => Number(fontti.match(/^(\d+(?:\.\d+)?)px/)?.[1] ?? 0)
    * NIMION_MERKKILEVEYS * [...teksti].length;
  const arkkiKaava = {
    lautaX: (lon) => kaava.lautaX(lon) - arkinBbox.x,
    lautaY: (lat) => kaava.lautaY(lat) - arkinBbox.y,
  };
  const esteet = nimiotasonEsteet(mitat);
  const ladotut = [];
  const ulos = [];
  // Meret ja koristeet ensin (isot, harvat), sitten maakunnat väistävät niitä.
  const jarjestys = [...nimiotasonNimiot()].sort((a, b) => {
    const arvo = (n) => (n.luokka === 'meri' ? 0 : (['kompassi', 'laiva', 'kuva', 'reitti', 'raja'].includes(n.luokka) ? 1 : 2));
    return arvo(a) - arvo(b);
  });
  let siirrettyja = 0;
  let pudotettuja = 0;
  for (const nimio of jarjestys) {
    const l = nimiotasonLadonta(nimio, mitat.z, arkkiKaava, mitat.px, mittaa);
    if (!l) continue;
    /*
     * KORISTEETKIN VÄISTÄVÄT (21.9.2026, täyden polton kaappaus z5–z6:
     * Kanaalin laiva ENGLANNIN KANAALI -nimen päällä, kompassiruusu-32
     * LIONINLAHTI-nimen päällä). Meret ladotaan ensin, koristeet
     * väistävät niitä samoin askelin kuin maakunnat; reitti ei väistä
     * (sen laatikko on koko polku). Kun vapaata paikkaa ei löydy,
     * koriste ja karkean tason (z <= NIMION_PUDOTUS_Z) maakuntanimi
     * PUDOTETAAN tältä tasolta: päällekkäinen nimi on huonompi kuin
     * puuttuva, ja seuraavalla tasolla sille on tilaa.
     */
    const reitti = nimio.luokka === 'reitti' || nimio.luokka === 'raja';
    const koriste = ['kompassi', 'laiva', 'kuva'].includes(nimio.luokka);
    const w = l.laatikko[2] - l.laatikko[0]; const h = l.laatikko[3] - l.laatikko[1];
    let valittu = null;
    for (const [sx, sy] of (reitti ? [[0, 0]] : NIMION_VAISTO_ASKELIA)) {
      const askel = (koriste ? Math.min(l.korkeus, l.leveys) * 0.6 : l.korkeus) * 1.1;
      const x = l.x + sx * askel * 2; const y = l.y + sy * askel;
      const laatikko = [x - w / 2, y - h / 2, x + w / 2, y + h / 2];
      if (reitti || laatikkoVapaa(laatikko, esteet, ladotut)) { valittu = { x, y, laatikko }; if (sx || sy) siirrettyja += 1; break; }
    }
    // Nykyalue z7:llä vain jos mahtuu (omistaja 21.9.2026); z8:sta aina.
    if (!valittu && (koriste || mitat.z <= NIMION_PUDOTUS_Z || (nimio.luokka === 'nykyalue' && mitat.z < 8))) { pudotettuja += 1; continue; }
    valittu ??= { x: l.x, y: l.y, laatikko: l.laatikko };
    const ladonta = { ...l, x: valittu.x, y: valittu.y, laatikko: valittu.laatikko };
    // Alueraja ei ole este: sen laatikko on koko maan kokoinen.
    if (nimio.luokka !== 'raja') ladotut.push(ladonta.laatikko);
    ulos.push({ nimio, ladonta });
  }
  if (siirrettyja || pudotettuja) console.log(`  nimiötaso z${mitat.z}: ${ulos.length} nimiötä, ${siirrettyja} väisti kaupunkia/jokea/nimiötä, ${pudotettuja} pudotettu (ei vapaata paikkaa)`);
  ladontaMuisti.set(mitat.z, ulos);
  return ulos;
}
function nimiotasonPeite(mitat) {
  const joukko = new Set();
  const marg = VIIVA_MARGINAALI_PX;
  for (const { ladonta } of nimiotasonLadonnat(mitat)) {
    /*
     * ALUERAJAN PEITE JANOITTAIN (maakuntavedos 21.9.2026): rajan
     * laatikko on koko FRA+DEU:n kokoinen, ja laatikosta laskettu peite
     * olisi lupannut z8:lla 336 laattaa, joista suurin osa tyhjiä
     * (mitattu: 171 → 336). Viiva kulkee vain osassa niistä; peite
     * kootaan janojen omista laatikoista.
     */
    const laatikot = Array.isArray(ladonta.polut)
      ? ladonta.polut.flatMap((polku) => polku.slice(1).map(([x, y], i) => {
        const [px, py] = polku[i];
        return [Math.min(px, x), Math.min(py, y), Math.max(px, x), Math.max(py, y)];
      }))
      : [ladonta.laatikko];
    for (const [x0, y0, x1, y1] of laatikot) for (const d of [0, -mitat.leveys, mitat.leveys]) {
      const s0 = Math.floor((x0 + d - marg) / LAATTA);
      const s1 = Math.floor((x1 + d + marg) / LAATTA);
      const r0 = Math.max(0, Math.floor((y0 - marg) / LAATTA));
      const r1 = Math.min(mitat.riveja - 1, Math.floor((y1 + marg) / LAATTA));
      for (let s = Math.max(0, s0); s <= Math.min(mitat.sarakkeita - 1, s1); s += 1) {
        for (let r = r0; r <= r1; r += 1) joukko.add(`${s}:${r}`);
      }
    }
  }
  return joukko;
}

/** Syvän tason laatasto syvän alan geometriasta (ks. SYVÄT TASOT). */
function syvaLaatastoBase64(mitat) {
  const tavut = Buffer.alloc(Math.ceil((mitat.sarakkeita * mitat.riveja) / 8));
  for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
      if (!syvallaAlalla(mitat, sarake, rivi)) continue;
      const i = rivi * mitat.sarakkeita + sarake;
      tavut[i >> 3] |= 1 << (i & 7);
    }
  }
  return tavut.toString('base64');
}

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
/*
 * MERKKITASOT (nosto, viiva, ranta, nimiö) EIVÄT ULOTU SYVILLE TASOILLE
 * (23.9.2026). Syvät z9–z10 ovat vain pohjaa natiivin pallosarjaa
 * varten; merkkitasojen peitteet koko maailman z10:lle olisivat sekä
 * raskaita laskea että valheellisia (niitä laattoja ei polteta).
 * Ilman syviä tasoja tämä on sama lista kuin `tasot`.
 */
const merkkiTasot = tasot.filter((m) => m.z < SYVA_ALIN);
/*
 * DEM KÄYTÖSSÄ vain kun `--dem` on annettu JA ajossa on syviä tasoja;
 * muuten ajo on tavulleen entinen (1′/3′-ruudukko).
 */
const DEM_KAYTOSSA = Boolean(DEM_KANSIO || DEM90_KANSIO) && (DEM_KAIKKI_TASOT || TASOT.some((z) => z >= SYVA_ALIN));
/** Käyttääkö taso DEM-ikkunaa (syvä taso tai `--dem-kaikki-tasot`)? */
const demTasolla = (z) => Boolean(DEM_KANSIO || DEM90_KANSIO) && (z >= SYVA_ALIN || DEM_KAIKKI_TASOT);
/** Luettelon aineistonimi; pelkällä GLO-30:llä täsmälleen entinen. */
const DEM_AINEISTO = DEM90_KANSIO
  ? (DEM_KANSIO ? 'Copernicus GLO-90 (3″) + GLO-30 (1″)' : 'Copernicus GLO-90 (3″)')
  : 'Copernicus GLO-30';
/** DEM-ikkunan reunus asteina: varjon askel ja bilineaarinen naapuri, ei enempää. */
const DEM_MARGINAALI = 0.02;
/** Tason DEM-väli: pikseli pituusasteina (lauta on 360° = projektio.leveys). */
function demValiTasolle(z) {
  const m = tasonMitat(z);
  return demVali((m.px * projektio.leveys) / 360);
}

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
  VIIVATASO ? tasot.map((m) => [m.z, viivatasonPeite(m, VIIVAOSAT)]) : [],
);
/* RANTATASOAJOSSA SAMA SÄÄNTÖ: työlista on rantatasonPeite. */
const rantaPeitteet = new Map(
  RANTATASO ? tasot.map((m) => [m.z, rantatasonPeite(m)]) : [],
);
const nimioPeitteet = new Map(
  NIMIOTASO ? tasot.map((m) => [m.z, nimiotasonPeite(m)]) : [],
);
const tarvitaan = new Set();
const lohkot = new Map();
for (const mitat of tasot) {
  let peite = viivaPeitteet.get(mitat.z);
  if (NOSTOTASO) peite = nostoPeitteet.get(mitat.z);
  else if (RANTATASO) peite = rantaPeitteet.get(mitat.z);
  else if (NIMIOTASO) peite = nimioPeitteet.get(mitat.z);
  for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
      if ((NOSTOTASO || VIIVATASO || RANTATASO || NIMIOTASO) && !peite.has(`${sarake}:${rivi}`)) continue;
      if (!alueella(mitat, sarake, rivi)) continue;
      if (!syvallaAlalla(mitat, sarake, rivi)) continue;
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
if (RANTATASO) {
  console.log(`  rantataso       ${rantaViivat().length} viivaa · versio ${RANTAVERSIO} `
    + '· polku ranta/z<taso>');
} else if (ILMAN_RANTAVIIVAA) {
  console.log('  pohja           ILMAN RANTAVIIVAA (muste on rantatasolla)');
}
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
  console.log('   z   ruudukko      reitit   rajat  piirit    joet   yhteensä   jokien lisä');
  const summat = {
    reitit: 0, rajat: 0, piirit: 0, joet: 0, kaikki: 0, lisa: 0,
  };
  for (const m of tasot) {
    const vainReitit = viivatasonPeite(m, { rajat: false, piirit: false, joet: false });
    const vainRajat = viivatasonPeite(m, { reitit: false, piirit: false, joet: false });
    const vainPiirit = viivatasonPeite(m, { reitit: false, rajat: false, joet: false });
    // JOET OVAT UUSI SISÄLTÖ VIIVATASOLLA (20.9.2026): niiden hinta on
    // raportoitava samalla tavalla kuin rajojen, koska ne kasvattavat
    // tason laattamäärää kaikilla tasoilla eivätkä vain z5:stä ylöspäin.
    const vainJoet = viivatasonPeite(m, { reitit: false, rajat: false, piirit: false });
    const kaikki = viivatasonPeite(m);
    const ilmanJokia = viivatasonPeite(m, { joet: false });
    const lisa = kaikki.size - ilmanJokia.size;
    summat.reitit += vainReitit.size;
    summat.rajat += vainRajat.size;
    summat.piirit += vainPiirit.size;
    summat.joet += vainJoet.size;
    summat.kaikki += kaikki.size;
    summat.lisa += lisa;
    console.log(`  ${m.z}  ${String(m.sarakkeita).padStart(4)}x${String(m.riveja).padStart(3)}  `
      + `${String(vainReitit.size).padStart(8)}${String(vainRajat.size).padStart(8)}`
      + `${String(vainPiirit.size).padStart(8)}${String(vainJoet.size).padStart(8)}`
      + `${String(kaikki.size).padStart(11)}${String(lisa).padStart(14)}`);
  }
  console.log(`  yht          ${String(summat.reitit).padStart(8)}`
    + `${String(summat.rajat).padStart(8)}${String(summat.piirit).padStart(8)}`
    + `${String(summat.joet).padStart(8)}`
    + `${String(summat.kaikki).padStart(11)}${String(summat.lisa).padStart(14)}`);
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
    nostomaa: NOSTO_MAA || undefined,
    rantataso: RANTATASO || undefined,
    alue: ALUE,
    tasot: TASOT,
    laatat: tyot.map(({ mitat, sarake, rivi }) => [mitat.z, sarake, rivi]),
  })}\n`);
  console.log(`\n--vain-lista: ${polku} (${tyot.length} laattaa)`);
  process.exit(0);
}

/*
 * VAIN PALAT (`--vain-palat`): tulostaa ne 1′-korkeuspalat, jotka TÄMÄ
 * komento tarvitsisi — yksi nimi rivillä, ei mitään muuta.
 *
 * TÄMÄ ON TYÖNKULUN KOPIOINTILISTA. Ajokone hakee palat R2:sta ennen
 * polttoa, jottei itse ajossa ole yhtään verkkopyyntöä. Koko maailma
 * olisi 194 Mt jokaiselle shardille; yksi pituuskaista tarvitsee siitä
 * neljäsosan. Lista tulee SAMASTA laatikosta jota piirto käyttää
 * (korkeudenLaatikko), joten se ei voi jäädä palaa vajaaksi — ja
 * puuttuva pala olisi ajon pysäyttävä virhe eikä hiljainen merenpinta.
 */
if (lippu('vain-palat')) {
  const kaarim = AJON_KAARIMINUUTIT[0] ?? KARKEA_KAARIMINUUTIT;
  const nimet = (ILMAN_AINEISTOA || kaarim !== 1)
    ? []
    : ikkunanPalat(ikkunanRajat({ laatikko: korkeudenLaatikko(), ruutu: RUUTU }));
  /*
   * Lista TIEDOSTOON eikä stdoutiin: ajon oma tuloste kulkee samaa
   * putkea, ja työnkulku joutuisi arvaamaan mikä rivi on palan nimi.
   */
  const tiedosto = valitsin('vain-palat', null);
  const polku = tiedosto && !tiedosto.startsWith('--') ? tiedosto : join(kohdekansio, 'palat.txt');
  mkdirSync(dirname(resolve(polku)), { recursive: true });
  writeFileSync(polku, nimet.length ? `${nimet.join('\n')}\n` : '');
  console.log(`\n--vain-palat: ${polku} (${nimet.length} palaa, ${kaarim}′)`);
  process.exit(0);
}

if (KUIVA) {
  /*
   * Kuiva ajo kertoo myös KORKEUSRUUDUKON KOON. Se on tämän ajon
   * suurin yksittäinen muistierä ja se, joka päättää mahtuuko shardi
   * ajokoneelle — ja sen näkee nyt ilman että mitään kootaan.
   */
  if (!ILMAN_AINEISTOA) {
    const kl = korkeudenLaatikko();
    const r = ikkunanRajat({ laatikko: kl, ruutu: RUUTU });
    const kaarim = AJON_KAARIMINUUTIT.join('+');
    console.log(`  korkeusruudukko ${r.leveys} x ${r.korkeus} (${kaarim}′, `
      + `${(r.leveys * r.korkeus * 2 / 1e6).toFixed(0)} Mt Int16) `
      + `lon ${kl.lon0.toFixed(2)}..${kl.lon1.toFixed(2)} `
      + `lat ${kl.lat0.toFixed(2)}..${kl.lat1.toFixed(2)}`);
    if (DEM_KAYTOSSA) {
      const dl = korkeudenLaatikko(DEM_MARGINAALI);
      const vali = demValiTasolle(TASOT[0]);
      const w = Math.floor((dl.lon1 - dl.lon0) / vali + 1e-6) + 1;
      const h = Math.floor((dl.lat1 - dl.lat0) / vali + 1e-6) + 1;
      console.log(`  DEM-ikkuna      ${w} x ${h} (väli ${(vali * 3600).toFixed(3)}″, `
        + `${(w * h * 2 / 1e6).toFixed(0)} Mt Int16)`);
    }
  }
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
/*
 * RANTATASO TUKEE SAUMATESTIÄ samasta syystä kuin viivataso: muste
 * piirretään ARKIN koordinaateissa, ja juuri se on se asia, joka
 * saumatestillä todistetaan. Harva karsinta on pohjakuvan ominaisuus.
 */
if (RANTATASO && (HARVA || lippu('harvamittaus'))) {
  console.error('--rantataso ei tue --harva/--harvamittaus-lippuja.');
  process.exit(1);
}
let aineisto = null;
let sisalto = null;
if (!ILMAN_AINEISTOA) {
  /*
   * YKSI AJO, YKSI RUUDUKKO. Ruudukko kootaan kerran ja tarjoillaan
   * selainsivulle yhtenä tiedostona, joten ajo jonka tasot
   * tarvitsisivat eri tarkkuudet pysähtyy tähän. Vaihtoehto olisi
   * polttaa kaukotasot tarkalla aineistolla ja kirjata luetteloon
   * toisin — laatat ja luettelo eivät saa olla eri mieltä siitä,
   * mistä aineistosta laatta on tehty.
   *
   * Tuotannossa tämä ei tule vastaan: matriisi ajaa z0–z6:n ja z7:n
   * eri shardeissa (.github/workflows/generoi-pyramidi.yml).
   */
  if (AJON_KAARIMINUUTIT.length > 1) {
    console.error(`--tasot ${valitsin('tasot', '')}: tasot tarvitsevat eri korkeusruudukot `
      + `(${AJON_KAARIMINUUTIT.join(' ja ')} kaariminuuttia), eikä yhteen piirtoajoon `
      + 'mahdu kuin yksi. Aja z0–z6 ja z7 erikseen (niin matriisikin tekee) tai '
      + `pakota yhtenäinen ajo: --kaariminuutit ${KARKEA_KAARIMINUUTIT}.`);
    process.exit(1);
  }
  /*
   * SAMA SÄÄNTÖ DEM-RUUDUKOLLE: sen väli on tason pikseli (z9 3,75″,
   * z10 1,875″), joten z9 ja z10 ovat eri ruudukot, eikä syvää ja
   * matalaa tasoa voi ajaa samassa piirtoajossa. Polttoskripti ajaa
   * ne eri shardeina (tools/polta-paikallisesti.sh --sarjat syva).
   */
  if (DEM_KAYTOSSA) {
    const valit = new Set(TASOT.map((z) => ((z >= SYVA_ALIN || DEM_KAIKKI_TASOT) ? demValiTasolle(z) : 'etopo')));
    if (valit.size > 1) {
      console.error(`--dem --tasot ${TASOT.join(',')}: jokainen syvä taso tarvitsee oman `
        + 'DEM-ruudukkonsa, eikä matalaa ja syvää tasoa voi ajaa yhdessä. '
        + `Aja tasot erikseen (esim. --tasot ${SYVA_ALIN} ja --tasot ${SYVA_ALIN + 1}).`);
      process.exit(1);
    }
  }
  console.log(`  aineisto        ${dataKansio}`);
  const aineistoAlkoi = Date.now();
  const korkeuslaatikko = korkeudenLaatikko();
  aineisto = await keraaMaailma({
    kansio: dataKansio,
    laatikko,
    korkeuslaatikko,
    ruutu: RUUTU,
    palat: KORKEUSPALAT,
    harvennus: RANNIKON_HARVENNUS,
  });
  if (DEM_KAYTOSSA) {
    /*
     * DEM-IKKUNA KORVAA 1′-RUUDUKON (ks. tools/maasto/dem-ikkuna.mjs).
     * 1′-ikkuna koottiin yllä tavalliseen tapaan, koska se on varalla
     * siellä, missä DEM-ruutua ei ole. Merimaski lasketaan uudestaan
     * samaan tiheään ruudukkoon: maski ja korkeus ovat aina samaa
     * ruudukkoa (harva karsinta ja ruudukon merilippu lukevat niitä
     * rinnakkain).
     */
    const vali = demValiTasolle(TASOT[0]);
    /*
     * GLO-30 (tunnus 10) ja GLO-90 (tunnus 30) erillisinä hakemistoina,
     * jotta aineistot eivät sekoitu vaikka kansiossa olisi vieraita
     * nimiä; NAS:n `._`-tiedostot hylätään nimen perusteella (demNimi).
     */
    const glo30 = DEM_KANSIO ? demHakemisto(DEM_KANSIO) : null;
    const glo90 = DEM90_KANSIO ? demHakemisto(DEM90_KANSIO, undefined, { tunnus: '30' }) : null;
    const dem = glo90 ? kaksiLahdetta({ glo30, glo90 }) : glo30;
    if (!dem.ruutuja) {
      console.error(`--dem ${DEM_KANSIO ?? '-'} --dem90 ${DEM90_KANSIO ?? '-'}: kansioissa ei ole `
        + 'yhtään Copernicus-ruutua (Copernicus_DSM_COG_10_… tai _30_…_DEM.tif).');
      process.exit(1);
    }
    const karkeaKoko = `${aineisto.korkeus.w} x ${aineisto.korkeus.h}`;
    const demAlkoi = Date.now();
    const tihea = demIkkuna({
      karkea: aineisto.korkeus, laatikko: korkeudenLaatikko(DEM_MARGINAALI), vali, dem,
    });
    dem.sulje();
    aineisto.korkeus = tihea;
    aineisto.meri = meriMaski(dataKansio, tihea, { laajennus: 1 });
    console.log(`  DEM-ikkuna      ${tihea.w} x ${tihea.h} (väli ${(vali * 3600).toFixed(3)}″, `
      + `${(tihea.grid.byteLength / 1e6).toFixed(0)} Mt, DEM ${(tihea.dem.osuus * 100).toFixed(1)} % soluista, `
      + `${dem.ruutuja} ruutua ${glo90 ? `(GLO-30 ${glo30?.ruutuja ?? 0}, GLO-90 ${glo90.ruutuja})` : 'kansiossa'}; `
      + `1′-varalla ${karkeaKoko}) `
      + `${((Date.now() - demAlkoi) / 1000).toFixed(1)} s`);
  }
  const megatavua = (aineisto.korkeus.grid.byteLength / 1e6).toFixed(0);
  console.log(`  korkeusruudukko ${aineisto.korkeus.w} x ${aineisto.korkeus.h} `
    + `(${DEM_KAYTOSSA ? 'DEM' : `${AJON_KAARIMINUUTIT[0] ?? KARKEA_KAARIMINUUTIT}′`}, ${megatavua} Mt) `
    + `lon ${korkeuslaatikko.lon0.toFixed(2)}..${korkeuslaatikko.lon1.toFixed(2)} `
    + `lat ${korkeuslaatikko.lat0.toFixed(2)}..${korkeuslaatikko.lat1.toFixed(2)}`);
  console.log(`  rannikko        ${aineisto.rannikot.length} viivaa `
    + `· järvet ${aineisto.jarvet.length}`);
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
  /*
   * JOET SIIRTYIVÄT VIIVATASOLLE (Fablen päätös 20.9.2026; mittaus
   * docs/raportit/viesti-fable-maalehti-viivat-20260920.md).
   *
   * Uomat olivat pohjassa, koska joki on maastoa eikä rataa. Se maksoi
   * liikaa: yksi jokiaineiston korjaus vaati koko pohjapyramidin
   * uudelleenpolton (23 340 laattaa z0-z7 ja 69 628 z8). Nyt ne ovat
   * samalla lapinakyvalla tasolla kuin reitit, jolloin seuraava
   * korjaus maksaa vain viivatason ajon ja pohja pysyy ikuisessa
   * valimuistissaan.
   */
  /*
   * JOET TAKAISIN POHJAAN (`--joet-pohjaan`, omistajan päätös 20.9.2026
   * ilta: koko pyramidi poltetaan uusiksi yhdellä kertaa ja joet
   * poltetaan pohjaan). Syy: pallon lepokerros ei lataa viivatasoa
   * (reittiviuhka, PAATOKSET 8), joten viivatason joki katosi levossa
   * — Loire-nimiö ilman jokea (kaappaus pariisi-ei-jokia-v1980.webp).
   * Viivataso poltetaan silloin `--eijoet`, ettei uoma piirry kahdesti
   * tasokartalla. Ilman lippua käytös on 20.9. aamun mukainen.
   */
  const joetPohjaan = lippu('joet-pohjaan');
  sisalto = lippu('ilman-sisaltoa')
    ? null
    : {
      ...lautaSisalto, reitit: [], lentoreitit: [], ...(joetPohjaan ? {} : { joet: [] }),
    };
  if (sisalto) console.log(`  sisältö         ${sisallonYhteenveto(sisalto)} `
    + (joetPohjaan ? '(reitit viivatasolla; JOET POHJASSA --joet-pohjaan)' : '(reitit viivatasolla, eivät pohjassa)'));
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
   * (omistaja 30.8.2026, ks. MERET yllä; kynnys nousi z3:lle 1.9.2026
   * illalla). Syvemmillä tasoilla arkilla ei ole merennimeä eikä
   * ruusua, joten niiden varaama ala olisi varaus tyhjästä — ja juuri
   * syvät tasot ovat ne, joilla karsittavia laattoja on tuhansia.
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
  /*
   * 5. VALTAMERTEN KORISTEET (--koristeet): koko on laatan pikseleitä
   * (kokoPx), joten asteina se on kokoPx / (px · ASTE); kierto ja
   * laivan varjo mahtuvat kertoimeen 0,8 (puolikas 0,5 · 1,6).
   */
  for (const k of KORISTEET) {
    const tasot = Array.isArray(k.tasot) ? k.tasot : KORISTEIDEN_OLETUSTASOT;
    if (!tasot.includes(mitat.z) || !(k.kokoPx > 0)) continue;
    const puoli = (k.kokoPx * 0.8) / (mitat.px * ASTE);
    if (k.lon > lonL - puoli && k.lon < lonO + puoli
      && k.lat > latE - puoli && k.lat < latP + puoli) return ei('koriste');
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
/*
 * TYÖKANSIO SIIVOTAAN AINA (Karttaseppä 24.9.2026, PR #3123). Kansiossa on
 * korkeusruudukko ja merimaski (syvällä sarjalla ~440 Mt), eikä sitä
 * poistettu koskaan: E28-ajon 16 rinnakkaista shardia jättivät jokainen
 * omansa, ja 429 orpoa kansiota (35 Gt) täytti levyn kesken ajon.
 * Poisto sekä normaalissa lopussa että SIGTERM/SIGINT-pysäytyksessä.
 */
process.on('exit', () => { try { rmSync(tyokansio, { recursive: true, force: true }); } catch { /* ei väliä */ } });
for (const s of ['SIGTERM', 'SIGINT']) process.once(s, () => process.exit(143));
if (!ILMAN_AINEISTOA) {
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
/*
 * === LENNOT EIVÄT OLE VIIVATASOLLA (omistaja 1.9.2026) =============
 *
 * Sanatarkasti: *"Poistetaan lentoreitit kokonaan näkyvistä.
 * Piirretään ne näkyviin reaaliajassa vasta sitten jos pelaaja
 * päättää mennä lentokoneella."*
 *
 * Lentoreitti ei ole pelilaudan rataa vaan pelaajan valinta: sillä ei
 * ole askelmia (js/game.js actionMannerLento siirtää nappulan suoraan
 * perille), ja 71 ilmaviivaa risteili kartan yli merkitsemättä
 * mitään, mitä pelaaja voisi kulkea askel kerrallaan. Piirtopassiin
 * ei koskettu — se piirtää sen, minkä saa, ja tämä ajo antaa sille
 * tyhjän listan. Elävä kaari on js/ui.js paivitaMatkareitit
 * (`matkareitti-lento`).
 *
 * VANHOJEN LAATTOJEN LENNOT NÄKYVÄT SIIHEN ASTI, KUNNES VIIVATASO ON
 * POLTETTU UUDESTAAN. Se on kunnossa: laatta on muuttumaton kuva, ja
 * uusi viivaversio korvaa sen kokonaan (ks. VIIVAVERSIO).
 */
writeFileSync(join(tyokansio, 'sisalto.json'), JSON.stringify(VIIVATASO
  ? {
    reitit: lautaSisalto.reitit,
    lentoreitit: [],
    // JOET OVAT VIIVATASOLLA (ks. pohjan sisalto ylla).
    joet: lautaSisalto.joet,
    rajat: rajaViivat,
  }
  : (sisalto ?? null)));
/*
 * RANTATASON AINEISTO OMANA TIEDOSTONAAN. Se on pelkkä rantaviiva —
 * ei korkeusruudukkoa, ei merimaskia, ei järviä — ja juuri siksi
 * rantatason ajo on nopea: sivu lataa yhden vektoritiedoston ja
 * piirtää siitä mustetta läpinäkyvälle kankaalle.
 */
writeFileSync(join(tyokansio, 'nimiot.json'),
  JSON.stringify(NIMIOTASO ? {
    tasot: Object.fromEntries(tasot.map((m) => [m.z, nimiotasonLadonnat(m).map(({ nimio, ladonta }) => ({ nimio, ...ladonta }))])),
  } : null));
writeFileSync(join(tyokansio, 'ranta.json'),
  JSON.stringify(RANTATASO ? { rannikot: rantaViivat() } : null));
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
  JSON.stringify(NOSTOTASO ? poltettavatMerkit : []));
/*
 * VÄRILEIKKURI OMANA TIEDOSTONAAN eikä lohkon asetuksissa: Ranskan
 * aluevesirenkaissa on 6 323 pistettä, ja lohkoja on kymmeniä. Sama
 * lista `evaluate`-argumentissa siirtyisi selaimeen kerran lohkoa
 * kohti; tiedostona se siirtyy kerran koko ajossa.
 */
writeFileSync(join(tyokansio, 'vari.json'),
  JSON.stringify(VARI_LEIKKURI ?? null));

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
  import {
    piirraMaailma, piirraNostotaso, piirraViivataso, piirraRantataso, piirraNimiotaso,
    piirraTasoitustaso, polttaVariLeikkuri,
  } from './maailmapiirto.js';
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
  /*
   * RANTATASOAJO LATAA VAIN RANTAVIIVAN: läpinäkyvälle tasolle
   * piirretään pelkkä rannikon muste (ks. RANTATASO ylempänä).
   */
  const RANTATASO = ${RANTATASO};
  const NIMIOTASO = ${NIMIOTASO};
  // Pohjan valtamerikoristeiden kuvapolut (ks. KORISTEET): esiladataan kuten nimiötason kuvat.
  const KORISTEKUVAT = ${JSON.stringify([...new Set(KORISTEET.filter((k) => k.kuva).map((k) => k.kuva))])};
  /*
   * VÄRITASOAJO POLTTAA LEIKKURIN LAATTAAN (erä 1b): kohdemaa ja sen
   * aluevedet täydellä peitolla, muu laatikko feidattuna paperina,
   * laatikon ulkopuoli ilman laattaa. Null = vastakoe
   * (--ilman-rajausta) tai jokin muu ajotila.
   */
  const VARITASO = ${VARITASO};
  /*
   * TASOITUSAJO (erä 1c) EI PIIRRÄ MAASTOA: laatta on kerma-peite,
   * jossa kohdemaan kohdalla on alfa 0. Ks. piirraTasoitustaso.
   */
  const TASOITUS = ${TASOITUSTASO};
  const variLeikkuri = VARITASO
    ? await (await fetch('./vari.json')).json().catch(() => null) : null;
  // Erikoispiirien passi (ks. ERIKOISPIIRIT POIS VIIVATASOLTA).
  const PIIRIT = ${PIIRIT};
  // Reitti- ja rajapassi (ks. REITIT POIS VIIVATASOLTA): jokitaso poltetaan ilman.
  const REITIT = ${REITIT};
  const RAJAT = ${RAJAT};
  const JOET_VIIVOIHIN = ${JOET};
  const nostot = await (await fetch('./nostot.json')).json().catch(() => null);
  const NOSTO_TASO3_ALIN_Z = ${NOSTO_TASO3_ALIN_Z};
  /*
   * NOSTOT KOLMEEN TASOON (ks. Node-puoli): taso 3 vain z7+, taso 1 saa
   * lajin kuvamerkin symbolin päälle (esiladattu kuten koristeet).
   */
  const nostokuvat = {};
  await Promise.all([...new Set((nostot ?? []).filter((m) => m.kuva).map((m) => m.kuva))].map((polku) => new Promise((ok) => {
    const img = new Image();
    img.onload = () => { nostokuvat[polku] = img; ok(); };
    img.onerror = () => ok();
    img.src = './koristeet/' + polku.split('/').pop();
  })));
  const nostotTasolla = (z) => (nostot ?? []).filter((m) => (m.taso ?? 2) !== 3 || z >= NOSTO_TASO3_ALIN_Z);
  const piirraNostoTasoineen = (ctx, m, porras) => {
    piirraNostosymPolttoon(ctx, m, porras);
    const kuva = m.kuva ? nostokuvat[m.kuva] : null;
    if (kuva) {
      // Kuvamerkki symbolin paalle: porras on kuvapikselia lautayksikkoa
      // kohti ja minisymbolin sade on 6,5 yksikkoa (fokusnosto-symbolit.js).
      const k = porras * 24;
      // PAPERINVAALEA SADEKEHA KUVAMERKIN ALLE (omistaja 21.9.2026, vedos:
      // Mont Blancin merkki hukkui tummaan reliefiin). Pehmea kiekko
      // paperin savylla, reunaan haipyva, jotta mustepiirros erottuu
      // vuoristosta mutta ei nayta tarralta tasaisella maalla.
      const kehä = ctx.createRadialGradient(0, 0, k * 0.18, 0, 0, k * 0.62);
      kehä.addColorStop(0, 'rgba(244,236,214,0.92)');
      kehä.addColorStop(0.7, 'rgba(244,236,214,0.7)');
      kehä.addColorStop(1, 'rgba(244,236,214,0)');
      ctx.save();
      ctx.fillStyle = kehä;
      ctx.beginPath();
      ctx.arc(0, 0, k * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.drawImage(kuva, -k / 2, -k / 2, k, k);
    }
  };
  let aineisto = null;
  let sisalto = null;
  let rannikot = null;
  if (!NOSTOTASO) {
    sisalto = await (await fetch('./sisalto.json')).json();
  }
  if (RANTATASO) {
    rannikot = (await (await fetch('./ranta.json')).json())?.rannikot ?? [];
  }
  let nimiotaso = null;
  const koristekuvat = {};
  // Kuvakoristeet esiladataan kerran: polku → Image (maailmapiirto.js KUVAKORISTEET);
  // pohjan valtamerikoristeet (KORISTEKUVAT) samaan tauluun.
  const polut = new Set(KORISTEKUVAT);
  if (NIMIOTASO) {
    // Esiladotut nimiöt tasoittain (ks. TÖRMÄYSTEN VÄISTÖ): { z: [ {nimio, x, y, …} ] }.
    nimiotaso = (await (await fetch('./nimiot.json')).json())?.tasot ?? {};
    for (const lista of Object.values(nimiotaso)) for (const l of lista) if (l.nimio?.luokka === 'kuva' && l.nimio.kuva) polut.add(l.nimio.kuva);
  }
  await Promise.all([...polut].map((polku) => new Promise((ok) => {
    const img = new Image();
    img.onload = () => { koristekuvat[polku] = img; ok(); };
    img.onerror = () => ok();
    img.src = './koristeet/' + polku.split('/').pop();
  })));
  if (!TASOITUS && !NOSTOTASO && !VIIVATASO && !RANTATASO && !NIMIOTASO) {
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
        ...yhteiset, passit: { reitit: REITIT && saumaZ >= VIIVA_REITIT_ALIN, piirit: PIIRIT, rajat: RAJAT, joet: JOET_VIIVOIHIN },
      });
    } else if (RANTATASO) {
      piirraRantataso(kangas, { ...yhteiset, rannikot });
    } else if (NIMIOTASO) {
      piirraNimiotaso(kangas, { ...yhteiset, __z: saumaZ, ladonnat: nimiotaso[String(saumaZ)] ?? [], kuvat: koristekuvat });
    } else {
      piirraMaailma(kangas, aineisto, {
        ...yhteiset, nostot: nostotTasolla(saumaZ), piirraNosto: piirraNostoTasoineen, kuvat: koristekuvat,
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
          ...yhteiset, passit: { reitit: REITIT && (perus.__z ?? 7) >= VIIVA_REITIT_ALIN, piirit: PIIRIT, rajat: RAJAT, joet: JOET_VIIVOIHIN },
        });
      } else if (RANTATASO) {
        piirraRantataso(kangas, { ...yhteiset, rannikot });
      } else if (NIMIOTASO) {
        piirraNimiotaso(kangas, { ...yhteiset, __z: perus.__z ?? 7, ladonnat: nimiotaso[String(perus.__z ?? 7)] ?? [], kuvat: koristekuvat });
      } else {
        piirraMaailma(kangas, aineisto, {
          ...yhteiset, nostot: nostotTasolla(perus.__z ?? 7), piirraNosto: piirraNostoTasoineen, kuvat: koristekuvat,
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
    if (TASOITUS) {
      /*
       * TASOITUSTASO: kangas vain mitoitetaan ja jätetään
       * läpinäkyväksi; polttaVariLeikkuri täyttää sen kermalla ja
       * puhkaisee reiän kohdemaan kohdalle. Kohdemaan alfa on 0, joten
       * pohjalaatan alkuperäinen seepia näkyy muuttumattomana
       * (omistajan PÄÄTÖS 4).
       */
      piirraTasoitustaso(kangas, asetukset);
    } else if (NOSTOTASO) {
      piirraNostotaso(kangas, {
        ...asetukset, nostot: nostotTasolla(asetukset.__z), piirraNosto: piirraNostoTasoineen,
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
        passit: { reitit: REITIT && asetukset.__z >= VIIVA_REITIT_ALIN, piirit: PIIRIT, rajat: RAJAT, joet: JOET_VIIVOIHIN },
      });
    } else if (RANTATASO) {
      /*
       * RANTATASO: sama lohkokoneisto, eri piirto. Kankaalle jää vain
       * rannikon kaksi vetoa; patina saa läpinäkyvän mustereseptin
       * (RESEPTIT.nosto) kuten nosto- ja viivatasolla.
       */
      piirraRantataso(kangas, { ...asetukset, rannikot });
    } else if (NIMIOTASO) {
      piirraNimiotaso(kangas, { ...asetukset, ladonnat: nimiotaso[String(asetukset.__z)] ?? [], kuvat: koristekuvat });
    } else {
      piirraMaailma(kangas, aineisto, {
        ...asetukset, sisalto, nostot: nostotTasolla(asetukset.__z), piirraNosto: piirraNostoTasoineen, kuvat: koristekuvat,
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
    /*
     * LEIKKURI JA FEIDAUS VIIMEISENÄ PASSINA — PATINAN JÄLKEEN.
     * Patina lukee pikseleitä naapureistaan (rantavyö, reunakertymä,
     * musteen leviäminen) ja kirjoittaisi poltetun alfan päälle, joten
     * järjestys ei ole makuasia. Vastakoe (--ilman-rajausta) jättää
     * variLeikkurin nulliksi, ja silloin laatta on läpinäkymätön
     * suorakaide — juuri se, minkä savukkeen on nähtävä punaisena.
     */
    if (variLeikkuri) polttaVariLeikkuri(kangas, asetukset, variLeikkuri);
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
  // Kuvakoristeet ja tyyppimerkit (maailmapiirto.js KUVAKORISTEET).
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
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
    // Rantatason aineisto: pelkkä rantaviiva (ks. RANTATASO).
    '/ranta.json': join(tyokansio, 'ranta.json'),
    // Nimiötason aineisto: nimiölista (ks. NIMIÖTASO).
    '/nimiot.json': join(tyokansio, 'nimiot.json'),
    // Kuvakoristeet (maailmapiirto.js KUVAKORISTEET): tiedostot nimiölistasta.
    ...Object.fromEntries([
      ...(NIMIOTASO ? nimiotasonNimiot() : []).filter((n) => n.luokka === 'kuva' && n.kuva),
      ...(NOSTOTASO ? poltettavatMerkit : []).filter((m) => m.kuva),
      // Pohjan valtamerikoristeet (ks. KORISTEET).
      ...KORISTEET.filter((k) => k.kuva),
    ].map((n) => [`/koristeet/${basename(n.kuva)}`, resolve(n.kuva)])),
    // Väritason leikkuri: kohdemaan aluevesirenkaat (ks. vari.json).
    '/vari.json': join(tyokansio, 'vari.json'),
    /*
     * PELIN OMA SYMBOLIKIRJASTO SIVULLE. Poltettu merkki piirretään
     * TÄSMÄLLEEN samalla koodilla kuin elävä (piirraNostosymPolttoon),
     * eikä muotoja kirjoiteta generaattoriin toiseen kertaan.
     * `mapart.js` tulee mukana, koska kirjasto tuo siitä `el`/`maare`
     * elävää varapolkuaan varten.
     */
    /*
     * maailmapiirto.js tuo ruutukaton kaavan suoraan pelin
     * moduulista (v1408 nostoladontaKattoPorras), ja selain pyytaa
     * sen polusta /js/nostoladonta.js — ilman valkolistariviä pyyntö
     * sai 404:n ja koko aineiston lataus kaatui (ajo 13, 1.9.2026).
     */
    '/js/nostoladonta.js': join(JUURI, 'js', 'nostoladonta.js'),
    /*
     * SAMA TARINA UUDESTAAN (2.9.2026): maailmapiirto.js tuo
     * varjostuskaavan yhteisestä moduulista (v1436 js/maastovarjo.js, v1438 alkaen tools/fokuskartta/maastovarjo.js,
     * yksi lähde moottorille ja pelin tarkalle varjolle), ja selain
     * pyytää sen polusta /js/maastovarjo.js. Ilman tätä riviä pyyntö
     * sai 404:n ja koko aineiston lataus kaatui — sama vika kuin
     * nostoladonnalla ajossa 13.
     */
    // v1438 siirsi kaavan tools/fokuskartta/maastovarjo.js:ään (live-kerros
    // purettiin); maailmapiirto.js tuo sen './maastovarjo.js', joten selain
    // pyytää juuripolun /maastovarjo.js — sama tarina kuin piirto.js:llä.
    '/maastovarjo.js': join(TAALLA, 'fokuskartta', 'maastovarjo.js'),
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

/*
 * PLAYWRIGHT WORKTREESTÄ (Mac Studio 18.9.2026). Agentin worktreessä ei
 * ole node_modulesia, ja kontin varapolku (/opt/node22/…) ei ole
 * Macilla — ilman `PLAYWRIGHT_JS`-ympäristömuuttujaa koepolttoa ei voi
 * ajaa työpuussa lainkaan. Järjestys on sama kuin ennen: paketti
 * ensin, varapolut vasta sen puuttuessa.
 */
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
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
/*
 * Syvyyskontrasti myös SIVULLE: pohja piirretään selaimessa, jonka
 * piirto.js on eri moduuli-instanssi kuin Noden. Sama URL kuin
 * maailmapiirto.js:n tuonnilla → sama instanssi ja sama SYVYYS-taulukko.
 */
if (SYVYYSKONTRASTI !== 1) {
  await sivu.evaluate(async (k) => {
    const m = await import(new URL('./piirto.js', window.location.href).href);
    m.asetaSyvyyskontrasti(k);
  }, SYVYYSKONTRASTI);
}
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
/*
 * RANTAVIIVA POIS POHJASTA (`--ilman-rantaviivaa`, omistaja 6.9.2026
 * ilta): sama kytkinmalli kuin erikoispiireillä. Muste on silloin
 * omalla läpinäkyvällä tasollaan (--rantataso), ja jos se olisi
 * molemmissa, kartalla olisi kaksinkertainen viiva.
 */
const TYYLI = {
  meret: MERET, kehys: KEHYS, kompassi: KOMPASSI, koristeet: KORISTEET, asteverkko: false,
  ...(ILMAN_RANTAVIIVAA ? { rantaviiva: false } : {}),
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
    /*
     * VÄRIPALETTI ON ASETUS EIKÄ TOINEN PIIRTOPOLKU (ks. VÄRITASO).
     * Moottori vaihtaa kaksi asteikkoa ja meren peittävyyden; kaikki
     * muu — geometria, varjostus, rae, kalusteet — on sama koodi, ja
     * juuri siksi värilaatta osuu pohjalaatan päälle pikselilleen.
     */
    /*
     * TASOITUSAJOSSA PALETTIA EI ANNETA MOOTTORILLE. Tasoituspaletissa
     * ei ole asteikkoa (se ei piirrä maastoa), ja maailmapiirto.js
     * heittää virheen jos se päätyy sinne — kirjaus on luettelossa ja
     * leikkurissa, ei piirtoasetuksissa.
     */
    variPaletti: (VARITASO && !TASOITUSTASO) ? VARIPALETTI : false,
    /*
     * VEDEN PEITTÄVYYS: null = paletin oletus (murrettu 0,72,
     * täysväri 0,9), luku = ajon valinta (`--vesi`).
     */
    variVesi: VARITASO ? VARI_VESI : null,
    // Syvyysvyöhykkeet portaina (poltto-koe; ks. maailmapiirto.js syvyysPortaat).
    syvyysPortaat: SYVYYSPORTAAT,
    // Isobaatit viivoina (koe 21.9.2026).
    syvyysKayrat: SYVYYSKAYRAT,
    syvyysKayraPeitto: SYVYYSKAYRAPEITTO,
    syvyysKohinaLaudalla: SYVYYSKOHINA_LAUDALLA,
    paperiRaeRuudulla: PAPERIRAE_RUUDULLA,
    // Löydös 46 -koe (oletuksena pois).
    ...(MASKI_AA ? { maskiAA: MASKI_AA } : {}),
    ...(RANTALEVEYS ? { rantaKerroin: rantaKerroinTasolle(mitat.z) } : {}),
    ...(RELIEFI_KOE ? { reliefi: RELIEFI_KOE } : {}),
    ...(MERI_KOHINA !== null ? { meriKohina: MERI_KOHINA } : {}),
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
    // Nostotaso: maakohtaisessa ajossa `nostot/<ISO>/z…` (NOSTO_KANSIO).
    if (NOSTOTASO) kansio = join(kohdekansio, ...NOSTO_KANSIO.split('/'), `z${mitat.z}`, String(sarake));
    if (VIIVATASO) kansio = join(kohdekansio, 'viivat', `z${mitat.z}`, String(sarake));
    if (RANTATASO) kansio = join(kohdekansio, 'ranta', `z${mitat.z}`, String(sarake));
    if (NIMIOTASO) kansio = join(kohdekansio, 'nimiot', `z${mitat.z}`, String(sarake));
    // Väritaso: `vari/<ISO>/z…` (ks. MAA ON LAATAN POLUSSA).
    if (VARITASO) kansio = join(kohdekansio, ...VARI_KANSIO.split('/'), `z${mitat.z}`, String(sarake));
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
function laatastoBase64(mitat, alipolku = '') {
  const bitteja = mitat.sarakkeita * mitat.riveja;
  const tavut = Buffer.alloc(Math.ceil(bitteja / 8));
  const juuri = alipolku ? join(kohdekansio, alipolku) : kohdekansio;
  for (let rivi = 0; rivi < mitat.riveja; rivi += 1) {
    for (let sarake = 0; sarake < mitat.sarakkeita; sarake += 1) {
      const polku = join(juuri, `z${mitat.z}`, String(sarake), `${rivi}.${MUOTO}`);
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
  // Ajokohtainen reseptimuutos (poltto-koe): kirjataan, jotta ämpäristä
  // näkee mitä ajettiin; peli ei lue kenttää.
  ...(SYVYYSPORTAAT ? { syvyysPortaat: SYVYYSPORTAAT } : {}),
  ...(SYVYYSKAYRAT ? { syvyysKayrat: SYVYYSKAYRAT, syvyysKayraPeitto: SYVYYSKAYRAPEITTO } : {}),
  ...(SYVYYSKOHINA_LAUDALLA ? { syvyysKohina: 'lauta' } : {}),
  ...(PAPERIRAE_RUUDULLA ? { paperirae: 'ruutu' } : {}),
  ...(Object.keys(PATINA_MUUTOS).length ? {
    patinaMuutos: {
      ...(VESIVIIVOITUS_VALINTA ? { vesiviivoitus: VESIVIIVOITUS_VALINTA } : {}),
      ...(RESEPTI_JSON ? JSON.parse(RESEPTI_JSON) : {}),
    },
  } : {}),
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
    /*
     * MAAKOHTAISESSA AJOSSA TÄTÄ KENTTÄÄ EI SYNNY (18.9.2026).
     * Maailmanlaajuista laatastoa ei ole, ja jos kenttä silti
     * kirjoitettaisiin, se lupaisi pelille laattoja polusta
     * `<versio>/nostot/z…` — sieltä ei tule kuin 404. Uusi peli lukee
     * `nostotasot`-taulun (alla), vanha peli ei löydä kumpaakaan ja
     * piirtää jokaisen noston elävänä; se on oikein, koska
     * pohjalaatoissa ei ole nostoja.
     */
    if (NOSTO_MAA) return null;
    const omat = merkkiTasot.filter((m) => m.z >= NOSTO_ALIN);
    if (!omat.length) return null;
    const laatastot = {};
    for (const m of omat) laatastot[m.z] = nostotasoBase64(m, nostotasonPeite(m));
    return {
      versio: NOSTOVERSIO,
      /*
       * PIIRTOSÄÄNNÖN TUNNUS (1.9.2026, js/nostoladonta.js
       * NOSTOLADONTA_SAANTO). Tiiviste kertoo, onko YKSI merkki
       * muuttunut; tämä kertoo, onko koko taso piirretty vanhalla
       * säännöllä. Ero on käytännön ero: kun sääntö vaihtuu, jokainen
       * tiiviste eroaa eikä yhtään merkkiä vaienneta — mutta laatoissa
       * oleva vanha muste jäisi silti elävän merkin alle
       * kaksoiskuvaksi. Peli piilottaa koko nostotason, kun tunnus ei
       * ole sen oma (js/laattapyramidi.js nostotasonTasot).
       */
      saanto: NOSTOLADONTA_SAANTO,
      tasot: omat.map((m) => m.z),
      nostot: poltettuLuettelo,
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
    if (!merkkiTasot.length) return null;
    const laatastot = {};
    for (const m of merkkiTasot) laatastot[m.z] = nostotasoBase64(m, viivatasonPeite(m, VIIVAOSAT));
    return {
      versio: VIIVAVERSIO,
      tasot: merkkiTasot.map((m) => m.z),
      rajat: RAJASETTI,
      piirit: PIIRIT,
      // Jokitaso (--eireitit) kirjaa reitit: false; tavallinen ajo ei
      // kirjoita kenttää, joten ämpärin luettelot pysyvät entisellään.
      ...(REITIT ? {} : { reitit: false }),
      ...(RAJAT ? {} : { rajat: 'ei' }),
      ...(JOET ? {} : { joet: false }),
      laatastot,
    };
  })(),
  /*
   * RANTATASO — NELJÄS laattapyramidi pohjan, nostotason ja viivatason
   * rinnalle (omistaja 6.9.2026 ilta). Pohjalaatoissa ei ole
   * rantaviivaa, kun ne on poltettu `--ilman-rantaviivaa`; muste on
   * tason laatoissa polussa <rantataso.versio>/ranta/z….
   *
   * MIKSI OMA TASO — karttapallo (Raamattu, "PALLO LEVOSSA YHTA TERAVA
   * KUIN TASOKARTTA" lisäyksineen): pallo piirtää rantaviivan
   * vektorina, joka on aina tasan pikselin levyinen, ja jättää tämän
   * tason lataamatta. Tasokartta lataa sen pohjan päälle, joten sen
   * kuva ei muutu (kerrosjärjestys pohja → ranta → viiva → nosto,
   * js/laattapyramidi.js varmistaKerrokset).
   *
   * TIIVISTELISTAA EI OLE, kuten ei viivatasollakaan: rantaviivalla ei
   * ole pelissä elävää kerrosta, joten pelille riittää tieto siitä,
   * mitkä laatat ovat olemassa.
   *
   * KENTTÄ SYNTYY VAIN, KUN RANTATASO ON PYYDETTY (--rantataso tai
   * --rantaversio). Muuten peite vaatisi rantaviiva-aineiston jokaiseen
   * ajoon — myös nosto- ja viivatason shardeihin, joilla ei ole
   * aineistokansiota lainkaan.
   *
   * YHTEENSOPIVUUS ON SAMA KUIN VIIVATASOLLA: vanha peli ei tunne
   * `rantataso`-kenttää, joten se piirtää pohjan sellaisenaan.
   * JULKAISUJÄRJESTYS on siksi selain ensin, rantatason laatat toisena
   * ja rannaton pohja vasta kolmantena.
   */
  /*
   * NIMIÖTASO — KUUDES laattapyramidi (omistajan kortti 20.9.2026 ilta):
   * atlastyyliset nimiöt (1873-maakunnat, meret) läpinäkyvänä tasona
   * polussa <nimioversio>/nimiot/z…. Kenttä syntyy vain nimiötasoajossa.
   *
   * `nimiot` on Pelikoodarin rajapinta (sovittu 20.9.2026): jokaiselle
   * nimiölle luokka, teksti, lon, lat, iso (maakunnalla), meri-avain
   * (merellä, esim. 'valimeri') ja `laatikot` tasoittain asteina —
   * elävä sovittelu tietää poltetun tekstin alan ilman fontin
   * uudelleenmittausta ja kohdemaan nimiöt voi piilottaa/korvata.
   */
  nimiotaso: (() => {
    if (!NIMIOTASO || !merkkiTasot.length) return null;
    const laatastot = {};
    for (const m of merkkiTasot) laatastot[m.z] = nostotasoBase64(m, nimiotasonPeite(m));
    const nimiot = {};
    const tunnus = (n) => (['kompassi', 'laiva', 'kuva'].includes(n.luokka) ? `${n.luokka}-${n.lon}-${n.lat}` : (n.luokka === 'raja' ? `raja-${n.iso ?? 'x'}` : String(n.teksti))).toLowerCase()
      .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a').replace(/é/g, 'e').replace(/î/g, 'i')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const asteiksi = (x, y) => {
      // Ladonta on arkin pikseleitä; takaisin laudan yksiköihin ja asteisiin.
      const lx = arkinBbox.x + x; const ly = arkinBbox.y + y;
      return { lon: kaava.lautaLon(lx), lat: kaava.lautaLat(ly), lx, ly };
    };
    for (const m of merkkiTasot) {
      for (const { nimio, ladonta } of nimiotasonLadonnat(m)) {
        const id = tunnus(nimio);
        nimiot[id] ??= {
          luokka: nimio.luokka, teksti: nimio.teksti, lon: nimio.lon, lat: nimio.lat,
          iso: nimio.iso ?? null,
          ...(nimio.luokka === 'meri' ? { meri: id } : {}),
          ...(nimio.koko ? { koko: nimio.koko } : {}),
          ...(nimio.kulma ? { kulma: nimio.kulma } : {}),
          ...(nimio.luokka === 'kuva' ? { kuva: basename(String(nimio.kuva)), kierto: nimio.kierto ?? 0 } : {}),
          tasot: [], laatikot: {},
        };
        nimiot[id].tasot.push(m.z);
        const [x0, y0, x1, y1] = ladonta.laatikko;
        const a = asteiksi(x0 / m.px, y0 / m.px);
        const b = asteiksi(x1 / m.px, y1 / m.px);
        nimiot[id].laatikot[m.z] = (a.lon != null && b.lon != null)
          ? { lon0: +a.lon.toFixed(4), lat0: +b.lat.toFixed(4), lon1: +b.lon.toFixed(4), lat1: +a.lat.toFixed(4) }
          : { lx0: +a.lx.toFixed(2), ly0: +a.ly.toFixed(2), lx1: +b.lx.toFixed(2), ly1: +b.ly.toFixed(2) };
      }
    }
    return {
      versio: NIMIOVERSIO,
      tasot: merkkiTasot.map((m) => m.z),
      laatastot,
      nimiot,
    };
  })(),
  rantataso: (() => {
    if (!(RANTATASO || RANTAVERSIO_ANNETTU) || !merkkiTasot.length) return null;
    const laatastot = {};
    for (const m of merkkiTasot) laatastot[m.z] = nostotasoBase64(m, rantatasonPeite(m));
    return {
      versio: RANTAVERSIO,
      tasot: merkkiTasot.map((m) => m.z),
      laatastot,
    };
  })(),
  /*
   * VÄRITASO — VIIDES laattapyramidi (karttauudistus, erä 1;
   * omistaja 13.9.2026). Kohdemaan värillinen topografia samalla
   * laattaruudukolla polussa <varitasot[ISO].versio>/vari/z….
   *
   * KENTÄT OVAT PELIN AINOA TIETO SIITÄ, KENELLE VÄRIT KUULUVAT.
   * `maa` on ISO A3, ja peli piirtää kerroksen VAIN kun pelaaja on
   * siinä maassa (js/laattapyramidi.js varitasonTasot) — muuten
   * Ranskan värilaatat maalaisivat Ranskan värilliseksi silloinkin,
   * kun pelaaja on Belgiassa, ja omistajan ehto *"vain kohdemaassa"*
   * rikkoutuisi. `aluevesi` on puskurin leveys lautayksikköinä, ja
   * peli rakentaa leikkurin siitä: laatikko ja leikkuri tulevat
   * samasta luvusta eivätkä voi olla eri mieltä.
   *
   * YHTEENSOPIVUUS ON SAMA KUIN RANTA- JA VIIVATASOLLA: vanha peli ei
   * tunne `varitasot`-kenttää eikä rakenna kerrosta, ja uusi peli
   * vanhan luettelon kanssa ei pyydä yhtään värilaattaa. Kummassakin
   * suunnassa kartta on täsmälleen se seepiakartta, joka se oli ennen
   * tätä erää — värit ovat puhdas lisäys.
   *
   * KENTTÄ SYNTYY VAIN VÄRITASOAJOSSA. Muuten pohja-ajon luettelo
   * pyyhkisi värit ämpäristä joka kerta kun pohja poltetaan uudestaan
   * (luettelo täydentyy erissä, ks. LUETTELO TÄYDENTYY).
   */
  /*
   * TAULU EIKÄ YKSI OLIO (erän 1 rajoite 7.2, korjattu erässä 1b).
   *
   * Erän 1 luettelossa `varitaso` oli yksi olio, eli toinen maan ajo
   * pyyhki ensimmäisen. Pallolla rajoite on pahempi kuin tasokartalla,
   * koska väri on osa LAATAN KANGASTA: väärän maan värilaatta
   * näyttäisi oikealta eikä mikään kertoisi, että kartalla on Ranskan
   * vuoret Belgian kohdalla. Avaimena on ISO A3, ja peli hakee
   * laatastoa VAIN pelaajan maan avaimella
   * (js/laattapyramidi.js varitasonTasot).
   *
   * MUIDEN MAIDEN AJOT KANNETAAN ETEENPÄIN (ks. LUETTELO TÄYDENTYY):
   * yhden maan ajo täydentää taulua eikä korvaa sitä.
   */
  /*
   * NOSTOTASOT — MAAKOHTAISET NOSTOLAATASTOT (18.9.2026,
   * Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta 17 d).
   *
   * TAULU EIKÄ YKSI OLIO, samasta syystä kuin `varitasot`: jokainen
   * maa ajetaan omana ajonaan, ja ilman taulua Belgian ajo pyyhkisi
   * Ranskan laatastot luettelosta (laatat jäisivät ämpäriin, mutta
   * peli ei löytäisi niitä). Yhdistäminen tehdään avaimittain
   * tools/pyramidiluettelo.mjs:ssä.
   *
   * KENTÄT OVAT PELIN AINOA TIETO SIITÄ, KENELLE MUSTE KUULUU.
   * `maa` on ISO A3 ja se on myös LAATAN POLUSSA
   * (js/laattapyramidi.js nostotasonKansio) — kaksi maata ei voi
   * kirjoittaa samaan ämpärin avaimeen. `nostot` on TÄMÄN MAAN
   * tunnus→tiiviste-taulu: peli saa vaieta vain niistä merkeistä,
   * jotka ovat sen hakemassa laatastossa.
   *
   * `saanto` on sama piirtosäännön tunnus kuin maailmanlaajuisella
   * tasolla (js/nostoladonta.js NOSTOLADONTA_SAANTO): kun sääntö
   * vaihtuu, peli piilottaa koko tason eikä vanha muste jää elävän
   * merkin alle kaksoiskuvaksi.
   */
  nostotasot: (() => {
    if (!(NOSTOTASO && NOSTO_MAA)) return null;
    const omat = merkkiTasot.filter((m) => m.z >= NOSTO_ALIN);
    if (!omat.length) return null;
    const laatastot = {};
    for (const m of omat) laatastot[m.z] = nostotasoBase64(m, nostotasonPeite(m));
    return {
      [NOSTO_MAA]: {
        versio: NOSTOVERSIO,
        maa: NOSTO_MAA,
        saanto: NOSTOLADONTA_SAANTO,
        tasot: omat.map((m) => m.z),
        nostot: poltettuLuettelo,
        laatastot,
        // Nimet elävinä (ks. NOSTOT_ILMAN_NIMIOITA); kenttä puuttuu = nimet laatassa.
        ...(NOSTOT_ILMAN_NIMIOITA ? { nimiot: false } : {}),
      },
    };
  })(),
  varitasot: (() => {
    if (!VARITASO || !tasot.length) return null;
    const laatastot = {};
    /*
     * ALIPOLKU ON SAMA KUIN LAATTOJEN (14.9.2026: `vari/<ISO>`).
     * Bittikartta luetaan LEVYLTÄ, joten jos se etsisi laattoja
     * vanhasta `vari/z…`-polusta, se olisi pelkkiä nollia — peli ei
     * pyytäisi yhtään laattaa eikä mikään kertoisi miksi. Juuri sen
     * savuke-tasoitus-pallo näki 14.9.2026 (tasoitettuja 0).
     */
    for (const m of tasot) laatastot[m.z] = laatastoBase64(m, VARI_KANSIO);
    return {
      [VARI_MAA]: {
        versio: VARIVERSIO,
        maa: VARI_MAA,
        /*
         * MAA POLUSSA — TÄMÄ KENTTÄ ON SIIRTYMÄN AINOA KYTKIN.
         * Ämpärissä jo olevissa kirjauksissa sitä ei ole, ja peli lukee
         * niille vanhan maattoman polun täsmälleen ennallaan
         * (js/laattapyramidi.js varitasonKansio). Kirjaus saa kentän
         * vasta kun maa on ajettu uudestaan — ja työnkulku vie
         * luettelon vasta laattojen jälkeen, joten uutta polkua ei
         * luvata ennen kuin laatat ovat perillä.
         */
        maaPolussa: VARI_MAA_POLUSSA || undefined,
        aluevesi: ALUEVESI_YKSIKKOA,
        /*
         * PALETTI, VESI JA FEIDAUS OVAT AJON KIRJANPITOA. Peli ei lue
         * niitä — värit ovat jo laatassa — mutta ilman niitä ämpäristä
         * ei voi nähdä, millä asteikolla laatasto on poltettu, ja
         * omistajan valinta kolmesta vaihtoehdosta katoaisi.
         */
        paletti: VARIPALETTI,
        vesi: TASOITUSTASO ? null : VARI_VESI,
        /*
         * TASOITUKSEN OMAT LUVUT (erä 1c). `peitto` on kerman alfa ja
         * `kerma` sen sävy; kumpikin on rakennusaikainen valinta, jota
         * ei voi lukea laatasta takaisin. Savuke lukee `peiton` tästä
         * eikä omasta vakiostaan — mittarin ja laataston on tultava
         * samasta luvusta (tools/savukkeet/savuke-tasoitus-pallo.mjs).
         *
         * `aluevesi` on yhä kirjattu, mutta tasoituksessa leikkurin
         * puskuri on 0: kenttä kertoo LAATIKON puskurin, ei rajan
         * muotoa (ks. TASOITUSAJO kohta 2).
         */
        tasoitus: TASOITUSTASO ? true : undefined,
        peitto: TASOITUSTASO ? TASOITUS_PEITTO : undefined,
        kerma: TASOITUSTASO ? TASOITUS_KERMA : undefined,
        leikkurinPuskuri: TASOITUSTASO ? 0 : ALUEVESI_YKSIKKOA,
        feidaus: VARI_ILMAN_RAJAUSTA ? null : VARI_FEIDAUS,
        feidausReuna: VARI_ILMAN_RAJAUSTA ? null : VARI_FEIDAUSREUNA,
        /*
         * LAATIKON KERROIN ON PELIN JA LAATASTON YHTEINEN EHTO: peli
         * pysäyttää uloszoomauksen samaan kertoimeen
         * (js/pallolauta/lauta.js ULOSZOOMAUKSEN_KERROIN), ja jos luvut
         * eroavat, feidaus näkyy suorakaiteena.
         */
        kerroin: VARI_KERROIN,
        /**
         * Laatikko kasvatettiin kuvasuhteiden unioniin
         * (`--laatikko-nakyma`): kerroin yksin ei siis kerro laatikon
         * kokoa, ja `alue` on ainoa tarkka lähde.
         */
        laatikkoNakyma: VARI_LAATIKKO_NAKYMA ? true : undefined,
        /** Vastakoeajo (`--ilman-rajausta`): leikkuria EI ole poltettu. */
        rajattu: !VARI_ILMAN_RAJAUSTA,
        alue: ALUE,
        laatikko: VARI_LAATIKKO,
        tasot: tasot.map((m) => m.z),
        laatastot,
      },
    };
  })(),
  /*
   * POHJAN OMINAISUUDET: onko rantaviiva poltettu pohjalaattoihin.
   *
   * Peli ei lue tätä — sille riittää rantatason olemassaolo — mutta
   * ämpäristä on voitava nähdä, kumpi pohja siellä on: rantaviivaton
   * pohja ilman rantatasoa olisi kartta ilman rantaviivaa, eikä sitä
   * saa päätellä laattoja katsomalla.
   *
   * KENTTÄ KIRJOITETAAN JOKA POHJA-AJOSSA (korjattu 20.9.2026).
   * Ennen se syntyi vain `--ilman-rantaviivaa`-ajossa, ja puuttuminen
   * tulkittiin "rantaviiva on pohjassa" — mutta mitattuna
   * (docs/raportit/viesti-fable-maalehti-viivat-20260920.md, laatta
   * z7/81/37) tuotannon pohja on rannaton, vaikka `pyramidi.json`:ssa
   * ei ole kenttää lainkaan. Luettelo väitti siis päinvastaista kuin
   * ämpärin sisältö. Nyt pohja-ajo kertoo kummassakin tapauksessa,
   * kumpi pohja syntyi; merkkitaso kantaa vanhan arvon eteenpäin
   * (tools/pyramidiluettelo.mjs).
   */
  pohja: MERKKITASO ? undefined : {
    rantaviiva: !ILMAN_RANTAVIIVAA,
    ...(lippu('joet-pohjaan') ? { joet: true } : {}),
    /*
     * NIMETTY RESEPTI JA LÖYDÖS 46:N ASETUKSET (25.9.2026): kirjataan
     * vain kun ne ovat päällä, joten vanhan reseptin luettelo on
     * tavulleen entinen. Peli ei lue näitä; ämpäristä näkee, millä
     * reseptillä pohja poltettiin.
     */
    ...(RESEPTINIMI ? { resepti: RESEPTINIMI } : {}),
    ...(MASKI_AA ? { maskiAA: MASKI_AA } : {}),
    ...(MERI_KOHINA !== null ? { meriKohina: MERI_KOHINA } : {}),
    ...(RELIEFI_KOE ? { reliefi: valitsin('reliefi-koe', null) === 'lammin' ? 'lammin' : RELIEFI_KOE } : {}),
    ...(RANTALEVEYS ? { rantaleveys: RANTALEVEYS } : {}),
  },
  /*
   * MERISÄVY: se yksi väri, jolla peli maalaa karsittujen umpimeren
   * laattojen paikan (ks. umpimeriSavy). Null, jos mitään ei karsittu.
   */
  meriSavy,
  /*
   * KORKEUSAINEISTON TARKKUUS TASOITTAIN (2.9.2026).
   *
   * Tarkkuus ei ole enää sama joka tasolla (ks. KORKEUSDATAN TARKKUUS
   * KAARIMINUUTTEINA), ja luettelo on ainoa paikka, josta myöhempi
   * lukija voi tietää MISTÄ AINEISTOSTA kukin taso on poltettu.
   * Peli ei lue tätä; paikkausajo ja ihminen lukevat. Ilman kenttää
   * kysymys "onko tämä versio se 1′-poltto" olisi arvailua.
   *
   * Kenttä on tasokohtainen JA erissä täydentyvä, koska pyramidi
   * ajetaan shardeissa: z0–z6 tulee eri ajosta kuin z7, ja kummankin
   * on saatava kirjattua oma tarkkuutensa ilman että toinen pyyhkii
   * sen (ks. LUETTELO TÄYDENTYY).
   */
  korkeus: MERKKITASO ? undefined : {
    kaariminuutit: Object.fromEntries(tasot.map((m) => [m.z, kaariminuutitTasolle(m.z)])),
    aineisto: [...new Set(tasot.map((m) => kaariminuutitTasolle(m.z)))]
      .sort((a, b) => a - b)
      .map((k) => (k === KARKEA_KAARIMINUUTIT
        ? `ETOPO1 ${k}′ (repon tools/korkeusaineisto)`
        : `ETOPO1 ${k}′ (R2:n 10°-palat)`))
      .join(' + '),
    /*
     * SYVÄT TASOT DEM:STÄ (23.9.2026): mitkä tasot, millä alalla ja
     * pakollinen lähdemaininta (Copernicus-lisenssi). 1′ on yhä varalla
     * siellä, missä DEM-ruutua ei ole (ks. tools/maasto/dem-ikkuna.mjs).
     */
    ...(DEM_KANSIO && tasot.some((m) => m.z >= SYVA_ALIN) ? {
      syvat: {
        tasot: tasot.filter((m) => m.z >= SYVA_ALIN).map((m) => m.z),
        alue: SYVA_ALUE,
        aineisto: DEM90_KANSIO ? `${DEM_AINEISTO}, varalla ETOPO1 1′` : 'Copernicus GLO-30 (1″), varalla ETOPO1 1′',
        lahdemaininta: LAHDEMAININTA,
      },
    } : {}),
    /*
     * KOKO PYRAMIDIN RELIEFI DEM:STÄ (`--dem-kaikki-tasot`, peruskartan
     * resepti 2026-09-25): tasot, aineisto ja lähdemaininnat. Meri ja
     * puuttuvat ruudut ovat ETOPO1:tä (ks. dem-ikkuna.mjs).
     */
    ...(DEM_KAIKKI_TASOT && (DEM_KANSIO || DEM90_KANSIO) ? {
      dem: {
        tasot: tasot.filter((m) => demTasolla(m.z)).map((m) => m.z),
        aineisto: `${DEM_AINEISTO}, meri ja puuttuvat ruudut ETOPO1`,
        valinta: 'GLO-90 ensin, kun näyteväli ≥ 0,001° (tools/maasto/tee-maasto.mjs GLO30_KYNNYS)',
        lahdemaininta: [...(DEM90_KANSIO ? [LAHDEMAININTA_90] : []), ...(DEM_KANSIO ? [LAHDEMAININTA] : [])],
      },
    } : {}),
  },
  tasot: tasot.map((m) => ({
    z: m.z,
    leveys: m.leveys,
    korkeus: m.korkeus,
    /*
     * Tason oma tarkkuus myös tässä, jotta se kulkee `tasot`-taulukon
     * mukana erien yli samalla koodilla kuin laatasto.
     */
    kaariminuutit: MERKKITASO ? undefined : kaariminuutitTasolle(m.z),
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
    /*
     * SYVÄT TASOT (z ≥ SYVA_ALIN): bittikartta syvän alan geometriasta
     * (syvaLaatastoBase64) — sama testi kuin työlistalla, ks. SYVÄT
     * TASOT. Harvan pyramidin levyluku ei koske niitä.
     */
    laatasto: m.z >= SYVA_ALIN ? syvaLaatastoBase64(m) : (HARVA ? laatastoBase64(m) : null),
    ...(demTasolla(m.z) ? { korkeusaineisto: DEM_AINEISTO } : {}),
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
  /*
   * VÄRITASOAJON ALUE ON KOHDEMAAN LAATIKKO EIKÄ PYRAMIDIN ALA: se
   * kuuluu `varitasot[ISO].alue`-kenttään, ei tähän. Tänne kirjoitettuna se
   * väittäisi, ettei pyramidissa ole muuta kuin Ranska.
   */
  alue: MERKKITASO ? undefined : (PAIKKAUS_LAHDE ? null : ALUE),
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
    // Tarkka rantaviiva (tools/gshhs-meri.mjs kirjoittaa lahde.json:n
    // aineistokansioon): lähde ja lisenssi luetteloon sellaisenaan.
    ...(existsSync(join(dataKansio, 'lahde.json'))
      ? [`Rantaviiva: ${JSON.parse(readFileSync(join(dataKansio, 'lahde.json'), 'utf8')).lahde}`] : []),
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
 * pyramidista murusen.
 *
 * SÄÄNTÖ ASUU OMASSA MODUULISSAAN (tools/pyramidiluettelo.mjs), koska
 * juuri se päättää, sammuuko koko laattakerros: väriajo ei saa vaihtaa
 * pohjan, nosto-, viiva- eikä rantatason versiota. Moduulina se on
 * yksikkötestattavissa ilman selainta ja tuntien polttoa.
 */
let vanhaLuettelo = null;
if (existsSync(luetteloPolku)) {
  try {
    vanhaLuettelo = JSON.parse(readFileSync(luetteloPolku, 'utf8'));
  } catch {
    /* rikkinäinen vanha luettelo: kirjoitetaan tuore päälle */
    vanhaLuettelo = null;
  }
}
const kirjoitettava = yhdistaLuettelo(luettelo, vanhaLuettelo, {
  merkkitaso: MERKKITASO,
  varitaso: VARITASO,
  era: {
    tasot: TASOT,
    alue: ALUE,
    nostotaso: NOSTOTASO || undefined,
    viivataso: VIIVATASO || undefined,
    rantataso: RANTATASO || undefined,
    varitaso: VARI_MAA || undefined,
    varipaletti: VARITASO ? VARIPALETTI : undefined,
    varirajattu: VARITASO ? !VARI_ILMAN_RAJAUSTA : undefined,
    paikkaus: PAIKKAUS_LAHDE || undefined,
  },
});
kirjoitettava.erat = kirjoitettava.erat ?? [{ tasot: TASOT, alue: ALUE }];
writeFileSync(luetteloPolku, `${JSON.stringify(kirjoitettava, null, 2)}\n`);

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
} else if (RANTATASO) {
  console.log(`\nVie ämpäriin: pyramidi/<rantaversio>/ranta/z<taso>/<sarake>/<rivi>.${MUOTO}`);
} else if (NIMIOTASO) {
  console.log(`\nVie ämpäriin: pyramidi/<nimioversio>/nimiot/z<taso>/<sarake>/<rivi>.${MUOTO}`);
} else if (VARITASO) {
  console.log(`\nVie ämpäriin: pyramidi/${VARI_AMPARIKANSIO}/z<taso>/<sarake>/<rivi>.${MUOTO}`);
} else {
  console.log(`\nVie ämpäriin: pyramidi/<versio>/z<taso>/<sarake>/<rivi>.${MUOTO}`);
}
