/*
 * YLEISLEHDEN PIIRTOMOOTTORI — koko pelilauta yhtenä 1873-atlaksen
 * lehtenä, ilman yhtäkään korostettua maata.
 *
 * Tämä ajetaan SELAIMESSA aivan kuten maalehtien moottori
 * (tools/fokuskartta/piirto.js): tools/tee-yleislehti.mjs käynnistää
 * Chromiumin, syöttää aineiston ja tallentaa canvasin.
 *
 * === MIKSI OMA MOOTTORI EIKÄ LIPPU MAALEHDEN MOOTTORIIN ===
 *
 * Maalehden moottori on rakennettu YHDEN MAAN ympärille: siinä on
 * kohdemaan maski, etäisyyskenttä kohdemaan rannikosta, naapurien
 * sumenevat vyöhykkeet ja kaikki merkinnät (vesileima, naapurien nimet,
 * kaupungit) suhteessa siihen maahan. Yleislehdessä EI OLE kohdemaata
 * — juuri se on koko tilauksen ydin (omistaja 26.8.2026: uloszoomattu
 * maailma näyttää tilkkutäkiltä, koska jokainen maalehti korostaa omaa
 * maataan ja piirtää naapurit haaleina. Kaukozoomiin tarvitaan yksi
 * yhtenäinen kartta, jossa kaikki maat ovat samalla voimalla).
 *
 * Lippu maalehden moottoriin olisi tarkoittanut ehtoa jokaisen kerroksen
 * ympärille — ja niiden ehtojen alle jäisi juuri se koodi, joka tekee
 * maalehdestä maalehden. Sen sijaan PALETTI ja KOHINA tuodaan
 * maalehden moottorista sellaisenaan (piirto.js vie ne), joten
 * lehtilajien paperi, hypsometria ja meren syvyysporrastus ovat
 * samasta lähteestä eivätkä voi ajautua eri sävyihin.
 *
 * === MITÄ TÄSSÄ ON JA MITÄ EI ===
 *
 *   ON     opaakki paperi, meren syvyysporrastus, akvarellihypsometria
 *          varjostuksineen, rannikko, isot järvet, harva asteverkko,
 *          muutama valtameren nimi kursiivilla — ja ATLASKEHYS
 *          (paperimarginaali, kaksoisviivakehys, kartussi,
 *          kompassiruusu, painajanrivi). Mittakaavajanaa EI: se on
 *          ruudun ominaisuus eikä kuvan (js/fokusmitat.js).
 *          Valtamerten nimet ja kompassiruusu ovat kartan alalla, ja
 *          ne piirretään vain uloimmille tasoille — ks. osio 7.
 *
 *   EI OLE maakorostusta, rajaviivoja, naapurien sumennusta eikä
 *          yhtäkään kaupunkia. Kaupunkien nimet ovat pelin omia
 *          laattoja (js/ui.js), ja kaukozoomissa niitä ei muutenkaan
 *          lueta.
 *
 * === ATLASKEHYS: MIKSI VAIN YLÄ- JA ALAMARGINAALI ===
 *
 * Omistajan tilaus 29.8.2026: *"ei näy sitä kartan reunapaperia ja
 * lisämerkintöjä?"* — kaukaisimmalla zoomtasolla kartan pitää maata
 * paperilla kuten oikean atlaksen lehti.
 *
 * Paperia voi olla vain YLÄ- JA ALAREUNASSA, ei sivuilla. Lauta on
 * kiertävä (js/packs/maailmankartta.js `kiertava`): peli toistaa
 * kartan laudan leveyden päässä (js/ui.js kiertoKohdat) ja rajaa
 * loitonnuksen niin, ettei sama paikka näy kahdesti
 * (js/kartta.js rajaaSkaala) — vaakasuunnassa laudan reunaa EI OLE
 * missään zoomissa, ja pystysuora marginaali piirtyisi kermanvaaleana
 * kaistaleena keskelle Tyyntämerta. Sama syy pitää reunahäivytyksen
 * pelkästään ylä- ja alareunassa (osio 10).
 *
 * Siksi kehys on se, mikä kiertävälle lehdelle kuuluukin: ylä- ja
 * alamarginaali kaksoisviivoin, kartussi ylämarginaalissa (aikakauden
 * atlaslehdissä otsikko ladottiin juuri reunaviivan yläpuolelle),
 * painajanrivi alamarginaalissa sekä kompassiruusu
 * kartan omalle tyhjälle merialueelle eteläiselle Tyynellemerelle.
 * Kulmakoristeet ovat kartussin kulmissa — kehyksellä itsellään ei
 * kiertävällä laudalla ole kulmia.
 *
 * Marginaali on 232 ja 240 kuvapikseliä eli 435 ja 450 lautayksikköä.
 * KARTTA-ALAN LAAJENNUKSEN JÄLKEEN (tools/tee-yleislehti.mjs KARTTA_ALA,
 * 84 °N…66 °S) se ei enää mahdu 16:9-työpöydän uloimpaan näkymään:
 * kartta-ala yksin on 6422 yksikköä ja näkyvä korkeus 6150. Se on
 * tarkoitus eikä vika — omistaja pyysi juuri karttaa reunaan asti — ja
 * marginaali tulee näkyviin korkeammalla ruudulla (tabletilla näkyvä
 * korkeus on 7466 eli koko arkki 7307) sekä panoroitaessa.
 *
 * === LAUTA KIERTÄÄ, JA SE ON PIIRRON ASIA ===
 *
 * Lehti kattaa koko laudan eli täyden 360 asteen kierroksen
 * pituusasteelta −175 asteelle +185. Projektio (piirto.js
 * laudanProjektio) palauttaa jokaiselle pituusasteelle x:n väliltä
 * [0, 12000), joten päivämääränrajan yli kulkeva viiva hyppäisi laudan
 * laidasta toiseen ja piirtäisi vaakasuoran viivan yli koko kartan. Siksi
 * JOKAINEN viiva katkaistaan siellä, missä x hyppää yli puolen kuvan
 * (`viivaPolku`). Sama sääntö koskee rannikkoa, järviä ja asteverkkoa.
 */

import {
  ASTEIKKO, KOHINA, KOHINA2, MUSTE, PAPERI,
  fbm, laudanProjektio, lerpSyvyys, lerpVari, mulberry32,
} from './piirto.js';
import { bilineaarinenKorkeus, varjonVoimakkuus, varjostusPisteessa } from './maastovarjo.js';
import {
  NOSTOLADONTA_POLTON_TIHEYS, nostoladontaKattoPorras,
} from '../../js/nostoladonta.js';

/* ====================================================== tekstin ladonta
 *
 * LADONTA ON TEHDAS, EI SULKEUMA (viivataso 31.8.2026 ilta).
 *
 * `teksti` ja `tekstinLeveys` olivat piirraMaailman sisäisiä sulkeumia
 * niin kauan kuin kutsujia oli yksi. Kun sama osio (erikoispiirit
 * nimineen) piirretään NYT KAHDESTA paikasta — pohjan arkilta ja
 * läpinäkyvältä viivatasolta — sulkeuma olisi pakko kopioida, ja kaksi
 * kopiota latoisi ennen pitkää eri tavalla. Sama vaara kuin merkkien
 * kanssa (Raamattu: poltetun ja selaimen on tultava samasta lähteestä).
 *
 * Tehdas saa `ctx`:n ja KARTAN MITTAKAAVAN `S`, koska ne ovat ainoat
 * asiat, joita ladonta ympäristöstään tarvitsee: `S` on `mitta`-kertoimen
 * oletus (merten nimet ja kalusteet kasvavat kartan mukana), ja `mitta: P`
 * tekee tekstistä paperivakion.
 */

/** Ladonnan oletukset; `mitta: null` = kutsuja saa kartan mittakaavan. */
const TEKSTIN_OLETUS = {
  koko: 13, fontti: '"Liberation Serif", serif', tyylitys: '', vari: MUSTE,
  ank: 'left', vali: 0, kulma: 0, mitta: null,
};

/**
 * Tekstin ladonta yhdelle kankaalle.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} S kartan mittakaava (arkin leveys / 6400)
 * @returns {{teksti:Function, tekstinLeveys:Function}}
 */
export function tekstinLatoja(ctx, S) {
  const tekstinLadonta = (o) => {
    const a = { ...TEKSTIN_OLETUS, ...o };
    return { ...a, mitta: a.mitta ?? S };
  };
  /** Rivin leveys pikseleinä ilman piirtoa (törmäysten välttelyyn). */
  const tekstinLeveys = (s, asetukset = {}) => {
    const a = tekstinLadonta(asetukset);
    ctx.save();
    ctx.font = `${a.tyylitys} ${a.koko * a.mitta}px ${a.fontti}`.trim();
    const merkit = [...s];
    const lev = merkit.reduce((sum, m) => sum + ctx.measureText(m).width, 0)
      + a.vali * a.mitta * (merkit.length - 1);
    ctx.restore();
    return lev;
  };
  const teksti = (s, x, y, asetukset = {}) => {
    const a = tekstinLadonta(asetukset);
    ctx.save();
    ctx.translate(x, y);
    if (a.kulma) ctx.rotate(a.kulma * Math.PI / 180);
    ctx.font = `${a.tyylitys} ${a.koko * a.mitta}px ${a.fontti}`.trim();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const merkit = [...s];
    const lev = merkit.reduce((sum, m) => sum + ctx.measureText(m).width, 0)
      + a.vali * a.mitta * (merkit.length - 1);
    let t = a.ank === 'center' ? -lev / 2 : a.ank === 'right' ? -lev : 0;
    ctx.fillStyle = a.vari;
    for (const m of merkit) {
      ctx.fillText(m, t, 0);
      t += ctx.measureText(m).width + a.vali * a.mitta;
    }
    ctx.restore();
  };
  return { teksti, tekstinLeveys };
}

/* =========================================================== moottori */

/*
 * === YKSI ARKKI VAI YKSI LAATTA (laattapyramidi, 30.8.2026) =========
 *
 * Sama moottori piirtää sekä koko arkin (tools/tee-yleislehti.mjs) että
 * YHDEN LAATAN maailmanlaajuisesta laattapyramidista
 * (tools/generoi-laattapyramidi.mjs). Ero on kahdessa valinnaisessa
 * asetuksessa, ja NIIDEN PUUTTUESSA JOKAINEN KAAVA PALAUTUU SANASTA
 * SANAAN ENTISEEN — juuri siksi ne ovat oletuksia eivätkä haaroja:
 *
 *   koko    { w, h }  koko arkin mitat kuvapikseleinä. Oletus on tämän
 *                     canvasin oma koko, jolloin arkki on laatta.
 *   siirto  { x, y }  tämän laatan vasen ylänurkka ARKIN pikseleissä.
 *                     Oletus 0,0.
 *
 * KOLME ASIAA, JOTKA ON PAKKO LASKEA ARKIN KOORDINAATEISSA, tai
 * laattojen väliin jää sauma:
 *
 * 1. KOHINA. Paperin rae, kuitujuovat, laikut ja akvarellin pigmentti
 *    näytteistetään kuvapikselistä. Jos jokainen laatta aloittaisi
 *    nollasta, KAIKKI laatat saisivat saman rakeen — ruudukko näkyisi
 *    ruudukkona. Kohina luetaan siksi arkin pikselistä (x + siirto.x).
 *
 * 2. MITTAKAAVA S. Kalusteiden koko ja kehyksen marginaali on säädetty
 *    6400 pikselin arkille. Laatan oma leveys (512) antaisi S = 0,08
 *    eli kehyksen paikan pieleen; S tulee siksi ARKIN leveydestä, joka
 *    on pyramiditasolla koko maailman leveys. Painojälki (viivat, rae,
 *    kirjasin) EI tule S:stä vaan P:stä — ks. PAPERIN MITTAKAAVA.
 *
 * 3. KEHYS JA KALUSTEET. Marginaali, kartussi ja painajanrivi ovat
 *    arkin reunassa ja keskellä. Ne piirretään arkin
 *    koordinaateissa ja siirretään laatan omaan nurkkaan; laatta, jonka
 *    ulkopuolelle ne jäävät, saa ne canvasin leikkaamana eli ei
 *    lainkaan.
 *
 * Vektorit (rannikko, järvet, asteverkko) EIVÄT tarvitse siirtoa: ne
 * tulevat kuvaX/kuvaY:n kautta laatan omasta bboxista ja osuvat siis
 * jo valmiiksi oikeaan kohtaan.
 */
export function piirraMaailma(canvas, aineisto, asetukset) {
  const {
    bbox, projektio, leveys, tyyli = {}, esikatseluTausta,
    koko = null, siirto = null, sisalto = null, nostot = null, piirraNosto = null,
    paperiS = null,
  } = asetukset;

  const px = leveys / bbox.w;
  const W = Math.round(leveys);
  const H = Math.round(bbox.h * px);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  /*
   * ARKIN KOORDINAATISTO. GX/GY on tämän laatan nurkka arkilla ja GW/GH
   * arkin koko; ilman `koko`- ja `siirto`-asetuksia arkki on tämä
   * canvas, jolloin GX = GY = 0, GW = W ja GH = H.
   */
  const GX = siirto?.x ?? 0;
  const GY = siirto?.y ?? 0;
  const GW = koko?.w ?? W;
  const GH = koko?.h ?? H;

  /*
   * S = MITTAKAAVA SUHTEESSA VIITETARKKUUTEEN (6400 px).
   *
   * Maalehdessä S on yksi PROTOTYYPPIPIKSELI, koska sen mitat on hiottu
   * 1600 pikselin levyisenä lehtenä. Yleislehdellä sellaista prototyyppiä
   * ei ole: sen mitat — paperin rae, rannikon viivanleveys, nimien koko —
   * on säädetty silmällä 6400 pikselin kuvasta, joka on se tarkkuus,
   * jolla lehti tehdään. Näin `--leveys 9600` tuo lisää pikseleitä eikä
   * isompaa tekstiä, aivan kuten maalehdillä.
   */
  const S = GW / 6400;

  /*
   * === P = PAPERIN MITTAKAAVA, S = KARTAN MITTAKAAVA =================
   *
   * Raamattu, "PAPERIVAKIOT JA KARTTAVAKIOT" (omistaja 30.8.2026):
   * *paperin ja painokoneen ominaisuudet ovat PAPERIN mittakaavassa eli
   * vakioita ulostulopikseleinä; maaston ominaisuudet ovat KARTAN
   * mittakaavassa.* Painettu viiva on paperilla tietyn levyinen
   * riippumatta siitä, mitä mittakaavaa lehti esittää — rantaviivan
   * MUOTO on maastoa, sen LEVEYS on painotekniikkaa.
   *
   * YHDEN ARKIN LEHDELLÄ NÄMÄ OVAT SAMA LUKU, ja siksi ero ei
   * aikaisemmin näkynyt: `--leveys 12800` on sama lehti kahdesti
   * tarkempana, ja katsoja näkee sen kutistettuna ruudulle, joten
   * viivankin on kaksinkertaistuttava. Oletus on siksi `P = S` eikä
   * mikään kutsuja muutu.
   *
   * LAATTAPYRAMIDISSA NE EROAVAT. Siellä taso ei ole sama lehti
   * tarkempana vaan sama arkki ISOMPANA, ja peli katsoo valittua tasoa
   * noin 1:1 — jolloin `mitta · S` ulostulopikseliä on `mitta · S`
   * LAITEPIKSELIÄ ruudulla. Mitattuna (30.8.2026) rannikon kynä oli
   * z3:lla 1 px, z6:lla 11 px ja z7:llä 19-23 px: sama vikaluokka kuin
   * nimiöissä (`ruutuKoko`) ja patinan kohdistusheitossa. Pyramidi
   * antaa siksi `paperiS: 1`, jolloin jokainen painojälki on joka
   * tasolla saman levyinen ja vain maasto tarkentuu.
   *
   * MIKÄ ON KUMPAAKIN — sääntö, ei lista:
   *   P (paperi)  viivanleveydet, kirjasinkoko laitepikseleinä,
   *               paperin rae ja kuitu, akvarellin pigmentti ja
   *               laikku, hypsometrian ja meren kohinan kudos,
   *               leikatun reunan tummennus ja häivytys.
   *   S (kartta)  arkin geometria (kehyksen marginaali, joka määrää
   *               laattaruudukon), kalusteiden koko (kartussi,
   *               kompassi, merten nimet) — ne on ladottu arkin
   *               mittoihin ja niiden paikka on arkilla, ei ruudulla.
   *
   * MERTEN NIMET JA KOMPASSI OVAT S:SSÄ MUTTA EIVÄT JOKA TASOLLA.
   * Ne kuuluvat merelle, jonka ne nimeävät, joten niiden on kasvettava
   * kartan mukana — mutta juuri siksi ne on myös jätettävä pois heti,
   * kun meri ei enää mahdu näkymään. Se on yleistyskysymys eikä
   * mittakaavakysymys, ja se ratkaistaan kynnyksellä osiossa 7.
   */
  const P = paperiS ?? S;

  /*
   * ATLASKEHYKSEN MARGINAALIT KUVAPIKSELEINÄ.
   *
   * Kartta-ala on kuvassa `yYla`..`yAla`; sen ulkopuoli on paperia.
   * Luvut tulevat työkalulta (tools/tee-yleislehti.mjs KEHYS) samassa
   * 6400 pikselin viitetarkkuudessa kuin kaikki muutkin tämän moottorin
   * mitat, ja niistä on JOHDETTU myös kuvan bbox — työkalu ja moottori
   * eivät siis voi olla eri mieltä siitä, missä kartan reuna on.
   */
  const kehys = tyyli.kehys ?? null;
  const yYla = kehys ? Math.round(kehys.yla * S) : 0;
  const yAla = kehys ? GH - Math.round(kehys.ala * S) : GH;

  // --- projektio: asteet -> lauta -> kuvapikselit ja takaisin --------
  const { lautaX, lautaY, lautaLon, lautaLat } = laudanProjektio(projektio);
  /*
   * VEKTORIT PIIRRETÄÄN ARKIN KOORDINAATEISSA, EI LAATAN.
   *
   * Laatan oma nurkka kelpaisi sijainniltaan, mutta EI TAVULLEEN: jos
   * kuvakoordinaatti lasketaan laatan bboxista, vähennyslasku tehdään
   * eri suuruusluokassa kuin isossa kuvassa ja rannikon viiva osuu
   * pyöristyksen verran eri kohtaan pikseliä. Mitattuna (30.8.2026,
   * `--saumatesti`) se näkyi 0,04–0,11 %:ssa kanavista siellä missä
   * vektoreita on. Ero on silmälle näkymätön, mutta se estää sen
   * ainoan todisteen, joka tästä arkkitehtuurista kannattaa vaatia:
   * että lohkosta leikattu laatta on TÄSMÄLLEEN sama kuin erikseen
   * piirretty.
   *
   * Siksi arkin origo tulee asetuksena (`arkki`, laudan koordinaatit)
   * ja koko vektoripiirto elää arkin pikseleissä; canvas siirretään
   * laatan nurkkaan kokonaisluvulla `ctx.translate(-GX, -GY)`, joka on
   * tarkka operaatio. Ilman `arkki`-asetusta origo on laatan oma bbox
   * ja siirto nolla — eli entinen käytös sanasta sanaan.
   */
  const origo = asetukset.arkki ?? { x: bbox.x, y: bbox.y };
  const arkkiSiirto = asetukset.arkki ? { x: GX, y: GY } : { x: 0, y: 0 };
  const kuvaX = (lon) => (lautaX(lon) - origo.x) * px;
  const kuvaY = (lat) => (lautaY(lat) - origo.y) * px;
  /*
   * LAUDAN KOORDINAATIT SUORAAN KUVAAN. Pysyvä sisältö (kaupungit,
   * reitit, joet, vuoret, kohteet) on jo valmiiksi LAUDAN yksiköissä —
   * se on esilaskettu laudan omalla kaavalla eikä sitä projisoida
   * uudelleen. Kierto asteiden kautta olisi sekä turhaa työtä että
   * pyöristystä, ja juuri se siirtäisi merkin pois laatasta.
   */
  const lautaKuvaX = (bx) => (bx - origo.x) * px;
  const lautaKuvaY = (by) => (by - origo.y) * px;
  const lonPikselista = (x) => lautaLon(bbox.x + x / px);
  const latPikselista = (y) => lautaLat(bbox.y + y / px);

  // --- korkeusruudukko ------------------------------------------------
  const K = aineisto.korkeus;
  const GRID = K.grid;
  const DLON = (K.lon1 - K.lon0) / (K.w - 1);
  const DLAT = (K.lat1 - K.lat0) / (K.h - 1);

  /*
   * Bilineaarinen korkeus (m); NaN ruudukon ulkopuolella.
   *
   * Näytteenotin asuu varjostuskaavan kanssa samassa moduulissa
   * (./maastovarjo.js), koska varjo lasketaan NELJÄSTÄ näytteestä ja
   * näytteenoton pyöristys on osa varjon lopputulosta. Ruudukko
   * annetaan sille kerran koottuna oliona eikä pikselikohtaisesti:
   * askelvälit DLON/DLAT lasketaan tässä reunoista, kun taas moduuli
   * ottaa ne valmiina.
   */
  const RUUDUKKO = {
    grid: GRID, w: K.w, h: K.h, lon0: K.lon0, lat1: K.lat1, dlon: DLON, dlat: DLAT,
  };
  const korkeus = (lon, lat) => bilineaarinenKorkeus(RUUDUKKO, lon, lat);

  /*
   * ================== MAA VAI MERI: VEKTORI ON AUKTORITEETTI =========
   *
   * Omistajan havainto 30.8.2026 iPadilta: *"Ääriviiva ja korkeus
   * väritys eivät täsmää."* Ja niin ne eivät voineetkaan täsmätä:
   * rantaviiva piirrettiin Natural Earthin 10m-vektoreista, mutta
   * maa/meri-jako luettiin korkeusruudukosta (3 kaariminuuttia = 5,5 km
   * solussa) ja sen merimaskista. Kaksi lähdettä, kaksi tarkkuutta.
   *
   * MITATTU ENNEN KORJAUSTA (näiden laattojen kuvapikseleissä, sama
   * ruudukko ja sama maski kuin tuotannossa):
   *
   *   alue            z5        z6        z7        vuoto enimmillään
   *   Egeanmeri       1 px      2,5 px    5,5 px    21 px
   *   Länsi-Afrikka   4 px      3,5 px    13 px     11 px
   *   Norja          20 px     40 px     40 px      48 px
   *   Chile          22 px     32 px     40 px      23 px
   *
   * Kilometreinä ero pysyy samana (2-40 km eli murto-osasta muutamaan
   * ruudukkosoluun), joten PIKSELEINÄ SE KAKSINKERTAISTUU JOKA
   * TASOLLA. Egeanmeren otoksessa 9 saarta 29:stä jäi kokonaan ilman
   * maaväriä: pelkkä ääriviiva meren päällä.
   *
   * KORJAUS on kartografinen eikä tekninen: **vektori kertoo MISSÄ maa
   * on, korkeusruudukko vain KUINKA KORKEALLA se on.** Maa ja meri
   * erotetaan siis samasta renkaasta, josta rantaviiva piirretään
   * (maailma.mjs `meriRenkaat`), ja silloin niillä ei ole mitään
   * mahdollisuutta olla eri mieltä.
   *
   * REUNATAPAUKSET RATKEAVAT ITSESTÄÄN, koska värit on jo kummassakin
   * päässä leikattu:
   *   - Rannikon matala meri, jossa ruudukko sanoo maata (+m): meri
   *     saa `lerpSyvyys`in matalimman sävyn (m >= 0 -> SYVYYS[0]).
   *   - Vuono tai salmi, jonka ruudukko ei näe: sama matalin merisävy.
   *   - Saari, jonka ruudukko luulee mereksi (-m): maa saa
   *     `Math.max(0, m + ...)` eli hypsometrian alimman sävyn.
   * Kumpikaan ei tarvinnut uutta erikoissääntöä; nyt ne vain osuvat
   * oikeaan kohtaan.
   *
   * KUIVA MAA MERENPINNAN ALLA säilyy maana ilman erillistä ehtoa:
   * Kuollutmeri, Kaspian alanko ja Qattara eivät ole meren
   * monikulmiossa. Kaspianmeri taas ON siinä (kuten maalehdilläkin),
   * joten se on vettä vaikka on järvi.
   *
   * VANHA RUUDUKKOSÄÄNTÖ JÄÄ VARALLE. Jos aineistossa ei ole renkaita
   * (vanha kutsuja, joka kokoaa aineistonsa itse), moottori toimii
   * kuten ennen. Renkaat tulevat `keraaMaailma`sta.
   */
  const MERI = aineisto.meri ?? null;
  const ruudukonMerenAlalla = (lon, lat) => {
    if (!MERI) return true;
    const x = Math.round((lon - K.lon0) / DLON);
    const y = Math.round((K.lat1 - lat) / DLAT);
    if (x < 0 || y < 0 || x > K.w - 1 || y > K.h - 1) return true;
    const i = y * K.w + x;
    return ((MERI[i >> 3] >> (i & 7)) & 1) === 1;
  };

  /*
   * MEREN RENKAAT JUOVAPYYHKÄISYNÄ TÄMÄN KUVAN OMILLE RIVEILLE.
   *
   * Miller-projektiossa kuvarivi on tasan yksi leveyspiiri ja sarake
   * tasan yksi pituuspiiri, joten kuvan pikseliruudukko ON lon/lat-
   * ruudukko — epätasavälinen pystysuunnassa, mutta rivi kerrallaan
   * tarkka. Siksi maski voidaan laskea suoraan kuvan tarkkuudella
   * ilman välirasteria: rivi tietää monikulmion leikkauskohdat, ja
   * pikseli katsoo oman pituusasteensa parillisuuden.
   *
   * Reunat kootaan KERRAN (muistiin `aineisto`-olioon), koska sama
   * olio piirtää tuhannet laatat; per lohko rakennetaan vain se osa
   * indeksistä, joka osuu tämän kuvan leveysasteisiin.
   *
   * Parillisuus lasketaan säteellä pituusasteelta −180: meren
   * monikulmio on leikattu ±180:een, joten sen länsipuolella ei ole
   * mitään, ja sädettä leikkaavien reunojen pariton määrä tarkoittaa
   * merta. Sama sääntö kuin aineisto.mjs:n `meriMaski`ssa.
   */
  const RENKAAT = aineisto.meriRenkaat ?? null;
  const NORMLON = (lon) => ((((lon + 180) % 360) + 360) % 360) - 180;
  let meriIndeksi = null;
  if (RENKAAT) {
    if (!aineisto.__meriReunat) {
      let n = 0;
      for (const r of RENKAAT) n += r.length;
      const xa = new Float64Array(n); const ya = new Float64Array(n);
      const xb = new Float64Array(n); const yb = new Float64Array(n);
      let k = 0;
      for (const r of RENKAAT) {
        for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
          // Vaakasuora reuna ei voi leikata leveyspiiriä.
          if (r[j][1] === r[i][1]) continue;
          xa[k] = r[j][0]; ya[k] = r[j][1];
          xb[k] = r[i][0]; yb[k] = r[i][1];
          k += 1;
        }
      }
      // Leveysastekorit (1°): rivi ei katso koko maailman reunoja.
      const korit = new Map();
      for (let i = 0; i < k; i += 1) {
        const a = Math.floor(Math.min(ya[i], yb[i]));
        const b = Math.floor(Math.max(ya[i], yb[i]));
        for (let c = a; c <= b; c += 1) {
          let l = korit.get(c);
          if (!l) { l = []; korit.set(c, l); }
          l.push(i);
        }
      }
      /*
       * `nahty` estää saman reunan poimimisen kahdesti. Se ei ole
       * hienosäätöä vaan välttämätöntä: pitkä reuna (±180 asteen
       * kehysjana kulkee navalta navalle) kuuluu kymmeniin koreihin, ja
       * kaksi kappaletta samasta leikkauksesta kääntäisi
       * parillisuussäännön nurin — kokonaisia rivejä merta maaksi.
       */
      aineisto.__meriReunat = {
        xa, ya, xb, yb, n: k, korit, nahty: new Int32Array(k), sukupolvi: 0,
      };
    }
    meriIndeksi = aineisto.__meriReunat;
  }

  /**
   * Kuvan jokaisen rivin leikkauskohdat (pituusasteina, nousevassa
   * järjestyksessä). Lasketaan kerran koko kuvalle, koska pikselisilmukka
   * käy rivit läpi järjestyksessä ja sama rivi tarvitaan 512-2112 kertaa.
   */
  const rivienLeikkaukset = () => {
    if (!meriIndeksi) return null;
    const rivit = new Array(H).fill(null);
    const y0 = kehys ? Math.max(0, yYla - GY) : 0;
    const y1 = kehys ? Math.min(H, yAla - GY) : H;
    if (y1 <= y0) return rivit;
    const latYla = latPikselista(y0 + 0.5);
    const latAla = latPikselista(y1 - 0.5);
    const ehdokkaat = [];
    const { xa, ya, xb, yb, korit, nahty } = meriIndeksi;
    meriIndeksi.sukupolvi += 1;
    const sp = meriIndeksi.sukupolvi;
    for (let c = Math.floor(latAla) - 1; c <= Math.floor(latYla) + 1; c += 1) {
      const l = korit.get(c);
      if (!l) continue;
      for (const i of l) {
        if (nahty[i] === sp) continue;
        nahty[i] = sp;
        const ylin = Math.max(ya[i], yb[i]);
        const alin = Math.min(ya[i], yb[i]);
        if (ylin < latAla || alin > latYla) continue;
        ehdokkaat.push(i);
      }
    }
    if (!ehdokkaat.length) return rivit;
    // Reuna herää sillä rivillä, jolla se alkaa; kuolee kun ohitetaan.
    const rivinLat = (y) => latPikselista(y + 0.5);
    const herat = new Map();
    const kuolee = new Int32Array(ehdokkaat.length);
    const reuna = new Int32Array(ehdokkaat.length);
    let m2 = 0;
    for (const i of ehdokkaat) {
      const ylin = Math.max(ya[i], yb[i]);
      const alin = Math.min(ya[i], yb[i]);
      // Rivit ovat pohjoisesta etelään, joten ylin lat on pienin y.
      let r0 = y0; let r1 = y1 - 1;
      // Binäärihaku: ensimmäinen rivi, jonka lat < ylin.
      let lo = y0; let hi = y1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (rivinLat(mid) < ylin) hi = mid; else lo = mid + 1; }
      r0 = lo;
      lo = y0; hi = y1;
      while (lo < hi) { const mid = (lo + hi) >> 1; if (rivinLat(mid) <= alin) hi = mid; else lo = mid + 1; }
      r1 = lo - 1;
      if (r1 < r0) continue;
      reuna[m2] = i; kuolee[m2] = r1;
      let l = herat.get(r0);
      if (!l) { l = []; herat.set(r0, l); }
      l.push(m2);
      m2 += 1;
    }
    let aktiiviset = [];
    for (let y = y0; y < y1; y += 1) {
      const uudet = herat.get(y);
      if (uudet) aktiiviset = aktiiviset.concat(uudet);
      if (!aktiiviset.length) { rivit[y] = new Float64Array(0); continue; }
      const lat = rivinLat(y);
      const leik = [];
      let elossa = 0;
      for (let t = 0; t < aktiiviset.length; t += 1) {
        const e = aktiiviset[t];
        if (kuolee[e] < y) continue;
        aktiiviset[elossa++] = e;
        const i = reuna[e];
        if ((ya[i] > lat) === (yb[i] > lat)) continue;
        leik.push(xa[i] + ((lat - ya[i]) / (yb[i] - ya[i])) * (xb[i] - xa[i]));
      }
      aktiiviset.length = elossa;
      leik.sort((a, b) => a - b);
      rivit[y] = Float64Array.from(leik);
    }
    return rivit;
  };
  const MERIRIVIT = rivienLeikkaukset();

  /** Onko piste meren monikulmion sisällä? Rivi on jo laskettu. */
  const merenAlallaRivilla = (leik, lon) => {
    const n = NORMLON(lon);
    let lo = 0; let hi = leik.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (leik[mid] < n) lo = mid + 1; else hi = mid; }
    return (lo & 1) === 1;
  };

  /*
   * Varjostus: valo luoteesta, askel ruudukon väli METREINÄ. Sama kaava
   * kuin maalehdellä; liioittelu on hitusen maltillisempi, koska
   * yleislehden ruudukko on kolme kaariminuuttia eikä yksi — samalla
   * kertoimella rinteet olisivat kaukozoomissa rakeisia.
   *
   * KAAVA ITSE ASUU MUUALLA (./maastovarjo.js). Se irtosi omaksi
   * moduulikseen 1.9.2026, kun omistajan 1′-kokeilu laski hetken
   * samaa varjoa selaimessa; kokeilu purettiin 2.9.2026, mutta kaava
   * jäi omilleen, koska se on siellä testattavissa ilman moottoria
   * (tests/korkeuspalat.test.mjs). Tässä on enää moottorin oma askel
   * — ruudukon väli — ja sen sulkeuma.
   */
  const varjostus = (lon, lat) => varjostusPisteessa(korkeus, lon, lat, DLON);

  /* ================================================== 1-3. PINTA
   *
   * Paperi, meri ja maasto YHDELLÄ pikselikierroksella.
   *
   * Maalehdellä nämä ovat kolme erillistä kierrosta, koska sen maasto
   * tarvitsee oman canvasin ja maskin (rannikko leikataan kohdemaan
   * monikulmiosta). Yleislehdellä maskia ei ole — maan ja meren raja
   * tulee ruudukosta — joten jokainen pikseli osaa maalata itsensä
   * kerralla. Ero on iso: koko kuva on 6400 x 2880 eli 18 megapikseliä,
   * ja jokainen ylimääräinen ImageData on 74 megatavua.
   */
  {
    const img = ctx.createImageData(W, H);
    const d = img.data;
    // Paperin pohjaväri kolmena lukuna, jottei sitä pilkota silmukassa.
    const pohja = [
      parseInt(PAPERI.slice(1, 3), 16),
      parseInt(PAPERI.slice(3, 5), 16),
      parseInt(PAPERI.slice(5, 7), 16),
    ];
    /*
     * MARGINAALIN KERMA on eri sävy kuin kartta-alan paperi, ja niin
     * kuuluukin: painetussa lehdessä marginaali on PAINAMATONTA paperia
     * ja siksi vaaleampi kuin merensinen tai maastonruskea kartta-ala.
     *
     * SÄVY ON LÄMMIN EIKÄ NEUTRAALI, JA SE ON MITTA EIKÄ MAKUASIA.
     * Patinapassin merimaski (tools/patina.mjs VESIVIIVOITUS ja SYVYYS,
     * `kromaVali: [34, 44]`) lukee mereksi jokaisen vaalean pinnan,
     * jonka kroma — suurimman ja pienimmän värikanavan ero — jää alle
     * 44:n. Kerma rgb(245,237,214) on kromaltaan 31 eli patinan silmissä
     * ulappaa, ja passi vetää marginaaliin rantaviivat kartussin
     * kirjainten ja mittajanan ympärille (mitattu 29.8.2026: mittajanan
     * palkkien ympärillä samankeskiset renkaat). Kroma 48 nostaa
     * marginaalin maskin yläpuolelle, jolloin patina jättää sen
     * rauhaan — ja silmälle ero on vain hitusen lämpimämpi norsunluu.
     */
    const kerma = [246, 237, 198];
    for (let y = 0; y < H; y++) {
      // Arkin rivi: marginaali, reunatummennus ja kohina ovat arkin
      // mittoja, mutta lat tulee laatan omasta bboxista (latPikselista).
      const gy = y + GY;
      const marginaalissa = gy < yYla || gy >= yAla;
      const lat = marginaalissa ? 0 : latPikselista(y + 0.5);
      // Tämän leveyspiirin leikkaukset meren monikulmion kanssa.
      const leik = marginaalissa || !MERIRIVIT ? null : MERIRIVIT[y];
      /*
       * PAPERIN LEIKATTU REUNA. Muutaman pikselin tummennus uloimmalla
       * laidalla erottaa arkin siitä pergamentista, jonka päällä se
       * laudalla lepää — ilman sitä kerma vain loppuu kesken.
       */
      const reuna = kehys
        ? Math.min(1, Math.min(gy + 0.5, GH - 0.5 - gy) / (11 * P))
        : 1;
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const gx = x + GX;
        // --- paperi: kuitujuovat, rae ja laikut ---
        const kuitu = fbm(KOHINA, gx / (52 * P), gy / (7 * P), 3) - 0.5;
        const rae = KOHINA2(gx / (1.7 * P), gy / (1.7 * P)) - 0.5;
        const laikka = fbm(KOHINA2, gx / (260 * P), gy / (260 * P), 3) - 0.5;
        const v = kuitu * 9 + rae * 11 + laikka * 16;
        if (marginaalissa) {
          const s = (1 - reuna) * 15;
          d[i] = Math.max(0, Math.min(255, kerma[0] + v * 0.85 - s));
          d[i + 1] = Math.max(0, Math.min(255, kerma[1] + v * 0.8 - s));
          d[i + 2] = Math.max(0, Math.min(255, kerma[2] + v * 0.7 - s * 0.85));
          d[i + 3] = 255;
          continue;
        }
        let r = pohja[0] + v * 1.05;
        let g = pohja[1] + v;
        let b = pohja[2] + v * 0.82;

        const lon = lonPikselista(x + 0.5);
        let m = korkeus(lon, lat);
        const vesi = leik
          ? merenAlallaRivilla(leik, lon)
          : (Number.isFinite(m) ? (m < 0 && ruudukonMerenAlalla(lon, lat)) : true);
        if (vesi) {
          // --- meri: syvyysvyöhykkeet, raja aaltoilee kohinasta ---
          if (!Number.isFinite(m)) m = -900;
          const n = fbm(KOHINA, gx / (30 * P), gy / (30 * P), 4) - 0.5;
          const s = lerpSyvyys(m + n * Math.min(150, Math.max(12, -m * 1.25)));
          const a = 0.5;
          r = r * (1 - a) + s[0] * a;
          g = g * (1 - a) + s[1] * a;
          b = b * (1 - a) + s[2] * a;
        } else {
          // --- maasto: hypsometria, varjostus, akvarellin rae ---
          if (!Number.isFinite(m)) m = 60;
          const n1 = fbm(KOHINA, gx / (26 * P), gy / (26 * P), 4) - 0.5;
          const n2 = fbm(KOHINA2, gx / (7 * P), gy / (7 * P), 3) - 0.5;
          const c = lerpVari(ASTEIKKO, Math.max(0, m + n1 * 190 + n2 * 60));
          const varjo = varjonVoimakkuus(varjostus(lon, lat));
          const pigmentti = (KOHINA2(gx / (2.1 * P), gy / (2.1 * P)) - 0.5) * 13;
          const lai = (fbm(KOHINA, gx / (95 * P), gy / (95 * P), 3) - 0.5) * 12;
          const t = (k) => k * (1 - varjo) + pigmentti + lai + (varjo > 0 ? 0 : varjo * 30);
          r = t(c[0]);
          g = t(c[1] * (1 - varjo * 0.12));
          b = t(c[2] * (1 - varjo * 0.3));
        }
        d[i] = Math.max(0, Math.min(255, r));
        d[i + 1] = Math.max(0, Math.min(255, g));
        d[i + 2] = Math.max(0, Math.min(255, b));
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ------------------------------------------------------------ polut */

  /**
   * Viiva kuvaan — katkaistuna siellä, missä lauta kiertää ympäri.
   *
   * Hyppy yli puolen kuvan leveyden tarkoittaa, että viiva ylitti laudan
   * sauman (ks. tiedoston johdanto): silloin aloitetaan uusi osapolku
   * eikä vedetä viivaa kartan poikki.
   */
  const viivaPolku = (g, viivat, suljettu = false) => {
    g.beginPath();
    for (const viiva of viivat) {
      let edellinen = null;
      for (let i = 0; i < viiva.length; i++) {
        const x = kuvaX(viiva[i][0]);
        const y = kuvaY(viiva[i][1]);
        // Sauman tunnistus on ARKIN mitta: laatta on kapea, ja laudan
        // kierrosta vastaava hyppy on aina puoli arkkia eikä puoli laattaa.
        if (edellinen === null || Math.abs(x - edellinen) > GW / 2) g.moveTo(x, y);
        else g.lineTo(x, y);
        edellinen = x;
      }
      if (suljettu) g.closePath();
    }
  };

  /**
   * Sama katkaisu LAUDAN koordinaateissa oleville viivoille.
   *
   * Erillinen funktio eikä kytkin viivaPolkuun: sauman tunnistus on
   * molemmissa sama sääntö, mutta lähtöaineisto on eri avaruudessa, ja
   * yksi funktio kahdella merkityksellä olisi juuri se paikka, jossa
   * väärä avaruus menee huomaamatta läpi.
   */
  const lautaPolku = (g, viivat) => {
    g.beginPath();
    for (const viiva of viivat) {
      let edellinen = null;
      for (let i = 0; i < viiva.length; i++) {
        const x = lautaKuvaX(viiva[i][0]);
        const y = lautaKuvaY(viiva[i][1]);
        if (edellinen === null || Math.abs(x - edellinen) > GW / 2) g.moveTo(x, y);
        else g.lineTo(x, y);
        edellinen = x;
      }
    }
  };

  /**
   * Sama, mutta PEHMEÄNÄ KÄYRÄNÄ pisteiden läpi.
   *
   * === MIKSI ========================================================
   *
   * Omistajan havainto 30.8.2026 iPadilta: *"Joet eivät mutkittele
   * pehmeästi vaan kantikkaasti."* Ja niin ne eivät mutkitelleetkaan:
   * jokien polyviivoissa on 4 330 pistettä 123 uomaan, ja mitattuna
   * yksi jakso on syvimmällä tasolla mediaanina 96 pikseliä (p90 214,
   * pisin 875) — taitteen mediaanikulma on 49°. Sadan pikselin välein
   * puolisuora kulma on kaivertajan kynässä mahdottomuus.
   *
   * RANTAVIIVA JA JÄRVET EIVÄT TARVITSE TÄTÄ, ja se on mitattu eikä
   * arvattu: Natural Earthin harvennettu rantaviiva on samalla tasolla
   * mediaanina 3,55 pikseliä jaksoa kohti (järvet 3,38), eli 27 kertaa
   * tiheämpi kuin joet. Sitä paitsi rantaviiva on nyt myös maan ja
   * meren RAJA (ks. "VEKTORI ON AUKTORITEETTI"), ja jos viiva
   * silotettaisiin mutta täyttö ei, syntyisi täsmälleen se ero, joka
   * juuri korjattiin. Reitit taas ovat kahden kaupungin välisiä janoja
   * — niissä ei ole mitä silottaa.
   *
   * === SENTRIPETAALINEN CATMULL-ROM (alpha = 0,5) ====================
   *
   * Käyrä kulkee JOKAISEN pisteen kautta (interpoloi, ei approksimoi),
   * joten uoma ei siirry paikaltaan. Alpha 0,5 on se valinta, joka
   * estää molemmat spline-vaarat: yhtenäinen Catmull-Rom (alpha = 0)
   * yliampuu terävissä mutkissa ja tekee silmukoita, kun pisteet ovat
   * epätasavälein — ja juuri sitä nämä uomat ovat, sillä pisin jakso on
   * yli 200-kertainen lyhimpään nähden. Sentripetaalinen
   * parametrisointi on todistetusti silmukaton ja kärjetön (Yuksel et
   * al. 2011). Muunnos kuutiolliseksi Bézieriksi tehdään suoraan, joten
   * canvas rasteroi käyrän itse eikä sitä pilkota janoiksi.
   *
   * === JATKUVUUS LAATTARAJAN YLI ====================================
   *
   * Silotus nojaa KOKO uomaan eikä siihen osaan, joka sattuu osumaan
   * lohkoon: `sisalto.joet` on maailmanlaajuinen lista, jota mikään ei
   * rajaa ennen piirtoa, ja kärkipisteet muunnetaan ARKIN pikseleiksi
   * (`lautaKuvaX`), jotka ovat samat joka lohkossa. Canvasin leikkuri
   * hoitaa rajauksen vasta rasteroinnissa. Ainoa kohta, jossa käyrä
   * katkeaa, on laudan sauma — ja se on arkin ominaisuus, ei lohkon.
   */
  const lautaKaari = (g, viivat) => {
    g.beginPath();
    const jakso = (p) => {
      if (p.length < 2) return;
      g.moveTo(p[0][0], p[0][1]);
      if (p.length === 2) { g.lineTo(p[1][0], p[1][1]); return; }
      for (let i = 0; i < p.length - 1; i += 1) {
        const p0 = p[i === 0 ? 0 : i - 1];
        const p1 = p[i];
        const p2 = p[i + 1];
        const p3 = p[i + 2 < p.length ? i + 2 : p.length - 1];
        const d1 = Math.sqrt(Math.hypot(p1[0] - p0[0], p1[1] - p0[1]));
        const d2 = Math.sqrt(Math.hypot(p2[0] - p1[0], p2[1] - p1[1]));
        const d3 = Math.sqrt(Math.hypot(p3[0] - p2[0], p3[1] - p2[1]));
        if (d2 === 0) { g.lineTo(p2[0], p2[1]); continue; }
        // Epätasavälisen Catmull-Romin ohjauspisteet (alpha = 0,5).
        const a = d1 > 0
          ? [0, 1].map((k) => (d1 * d1 * p2[k] - d2 * d2 * p0[k]
              + (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) / (3 * d1 * (d1 + d2)))
          : [p1[0], p1[1]];
        const b = d3 > 0
          ? [0, 1].map((k) => (d3 * d3 * p1[k] - d2 * d2 * p3[k]
              + (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) / (3 * d3 * (d3 + d2)))
          : [p2[0], p2[1]];
        g.bezierCurveTo(a[0], a[1], b[0], b[1], p2[0], p2[1]);
      }
    };
    for (const viiva of viivat) {
      let osa = [];
      let edellinen = null;
      for (let i = 0; i < viiva.length; i += 1) {
        const x = lautaKuvaX(viiva[i][0]);
        const y = lautaKuvaY(viiva[i][1]);
        // Sauma katkaisee käyrän kuten murtoviivankin (ks. viivaPolku).
        if (edellinen !== null && Math.abs(x - edellinen) > GW / 2) { jakso(osa); osa = []; }
        osa.push([x, y]);
        edellinen = x;
      }
      jakso(osa);
    }
  };

  /*
   * KARTTA-ALAN LEIKKURI (osiot 4–7).
   *
   * Rannikkoaineisto ulottuu asteen laudan reunojen yli (maailma.mjs
   * `rannikot`) ja asteverkon meridiaanit vedetään koko kuvan yli, joten
   * ilman leikkuria rantaviiva ja hilaviivat vuotaisivat kermaiseen
   * marginaaliin. Leikkuri on yhdessä paikassa eikä jokaisessa
   * kerroksessa: kartta-ala on yksi laatikko, ja kaikki kartan sisältö
   * kuuluu sen sisään.
   */
  /*
   * ARKIN KOORDINAATISTO PÄÄLLE (osiot 4–9).
   *
   * Tästä eteenpäin kaikki — rannikko, järvet, asteverkko, merten
   * nimet, kompassi ja atlaskehys kalusteineen — piirretään ARKIN
   * pikseleissä, ja canvas on siirretty tämän laatan nurkkaan. Siirto
   * on kokonaisluku eli tarkka, joten lohkosta leikattu laatta on
   * täsmälleen sama kuin erikseen piirretty (ks. kuvaX yllä).
   *
   * Ilman `arkki`-asetusta siirto on nolla ja arkki on tämä canvas —
   * jokainen alla oleva kaava on silloin sanasta sanaan entisensä.
   */
  ctx.save();
  ctx.translate(-arkkiSiirto.x, -arkkiSiirto.y);

  ctx.save();
  ctx.beginPath();
  ctx.rect(arkkiSiirto.x, yYla, W, yAla - yYla);
  ctx.clip();

  /* ================================================== 4. RANNIKKO
   *
   * Kaksi vetoa kuten maalehdellä: kostea leveä reuna ja sen päällä
   * kynä. Maalehdellä kostea reuna leikataan meren puolelle kohdemaan
   * monikulmiolla; yleislehdellä leikkuria ei ole eikä tarvita —
   * vetoja on 3 ja 1,1 pikseliä, joten maan puolelle jäävä puolikas on
   * pikselin murto-osa eikä erotu rannikon omasta pigmentistä.
   *
   * LEVEYS ON PAPERIVAKIO (P), MUOTO ON MAASTOA. Kartalla kaksi vetoa
   * kattaa sitä pienemmän maa-alan mitä lähemmäs zoomataan, ja juuri
   * niin painetun viivan kuuluu käyttäytyä: kaivertajan kynä ei
   * lihonut siitä, että lehti esitti pienempää aluetta. Kertoimella S
   * tämä oli laattapyramidin syvimmällä tasolla mitattuna 19-23
   * pikselin vyö (z6 11 px, z3 1 px) — ks. P:n määrittely ylempänä.
   */
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(74,52,33,0.18)';
  ctx.lineWidth = 3 * P;
  viivaPolku(ctx, aineisto.rannikot);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(58,40,25,0.85)';
  ctx.lineWidth = 1.1 * P;
  viivaPolku(ctx, aineisto.rannikot);
  ctx.stroke();
  ctx.restore();

  /* ================================================== 5. JÄRVET
   *
   * Vain isot (tools/fokuskartta/maailma.mjs `jarvet`).
   *
   * === JÄRVI ON VETTÄ, EI REIKÄ PAPERISSA (omistaja 31.8.2026) =======
   *
   * Omistaja katsoi Tiibetiä janalla 500 km ja kysyi *"onko tuolla
   * järviä"* — eli Namtso, Siling ja Yamdrok eivät lukeneet vetenä.
   *
   * MITATTU SYY EI OLLUT SÄVY VAAN SEN KAKSI VIKAA. Vanha täyttö oli
   * `rgba(203,200,182,0.9)` eli LÄPIKUULTAVA, ja alta paistava maasto
   * värjäsi sen sitä enemmän mitä tummempi maasto oli:
   *
   *   Suuret järvet (alanko, vaalea)   rgb(204,200,181)  lum 200
   *   Tiibet (ylänkö, tummanruskea)    rgb(191,180,161)  lum 181
   *   rannikon matala meri (vertailu)  rgb(199,193,173)  lum 193
   *
   * Sama järvisävy oli siis eri väriä eri puolilla maailmaa, ja juuri
   * Tiibetissä se ajautui kauimmas siitä merisävystä, joka opettaa
   * lukijalle mikä on vettä. PEITTÄVÄ TÄYTTÖ korjaa sen: järvi on nyt
   * täsmälleen sama sävy joka puolella maailmaa ja samassa perheessä
   * kuin rannikon matala meri.
   *
   * TOINEN VIKA OLI RANTAVIIVA. Järven ääriviiva oli `0,9 * P` ja
   * haalean ruskea (118,107,80 alfalla 0,75), kun rannikko saa kaksi
   * vetoa: `3 * P` kostea reuna ja sen päällä `1,1 * P` kynä (58,40,25
   * alfalla 0,85). Reunaton vaalea läiskä tumman ylängön keskellä
   * lukee painovirheenä; sama kynä kuin rannalla tekee siitä rannan.
   * Järvi saa nyt rannikon vedot pienennettyinä (2,2 ja 1,0), koska
   * järven ranta on kartografisesti kevyempi kuin valtameren.
   *
   * SÄVY ON MATALAN MEREN PERHETTÄ EIKÄ UUSI VÄRI: 206,201,181 on se
   * sävy, jonka syvyysramppi antaa rannikon tuntumassa paperin päälle
   * maalattuna. MEREN OMAA RAMPPIA EI KOSKETA — se on lukittu
   * monotoninen kuutiokäyrä (piirto.js SYVYYS), eikä tämä erä muuta
   * siitä tavuakaan.
   */
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  for (const j of aineisto.jarvet ?? []) {
    viivaPolku(ctx, j.renkaat, true);
    ctx.fillStyle = 'rgb(206,201,181)';
    ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(74,52,33,0.18)';
    ctx.lineWidth = 2.2 * P;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(58,40,25,0.8)';
    ctx.lineWidth = 1.0 * P;
    ctx.stroke();
  }
  ctx.restore();

  /**
   * Yksi tekstirivi harvennettuna; sama kaava kuin maalehdellä.
   *
   * `mitta` on se kerroin, jolla kirjasinkoko ja harvennus kerrotaan.
   * Oletus on `S` eli KARTAN mittakaava — niin merten nimet ja arkin
   * kalusteet on aina ladottu, ja ne kasvavat tason mukana. `mitta: P`
   * tekee tekstistä PAPERIVAKION, joka on joka tasolla saman kokoinen
   * laitepikseleinä (Raamattu, "PAPERIVAKIOT JA KARTTAVAKIOT").
   */
  const { teksti, tekstinLeveys } = tekstinLatoja(ctx, S);

  /* =========================== 6. ERIKOISPIIRIT JA NOLLAMERIDIAANI
   *
   * OSIO ON NYT OMANA PASSINAAN (viivataso 31.8.2026 ilta): sama
   * funktio piirtää piirit pohjan arkille JA läpinäkyvälle
   * viivatasolle. Perustelut, mitat ja nimien ladonta ovat
   * `piirraErikoispiiritKankaalle`-funktion johdannossa; tähän jää
   * kutsu ja se kytkin, joka on TYYLIN eikä passin asia.
   *
   * PYRAMIDIN POHJA-AJO ANTAA `asteverkko: false`: piirit ovat siellä
   * viivatasolla, eivätkä ne saa olla kartalla kahdesti. Yhden arkin
   * lehdellä kytkintä ei anneta, ja piirit piirtyvät kuten ennen.
   */
  if (tyyli.asteverkko !== false) {
    piirraErikoispiiritKankaalle(ctx, {
      S, P, GW, yYla, yAla, kuvaX, kuvaY, lautaLat, bbox,
    });
  }

  /* ================================================== 7. MERTEN NIMET
   *
   * === VAIN ULOIMMILLE TASOILLE (omistajan päätös 30.8.2026) ========
   *
   * Omistajan sanoin: *valtamerten nimet ja kompassiruusu piirretään
   * vain kun koko meri on näkyvissä; lähemmäs zoomatessa ne katoavat.*
   * Perustelu on painetun atlaksen oma tapa — **valtameri nimetään
   * kerran maailmankartalla, ei jokaisella lehdellä**, ja kompassiruusu
   * kuuluu arkin kalusteisiin eikä maastoon.
   *
   * Nämä kaksi ovat ARKIN KALUSTEITA eli kartan mittakaavassa (`S`,
   * ks. PAPERIN MITTAKAAVA ylempänä), ja se on oikein: nimi kuuluu
   * merelle, jonka se nimeää, ja kasvaa sen mukana. Ilman kynnystä se
   * on kuitenkin väärin MOLEMMISSA päissä, ja kumpikin pää on mitattu:
   * syvimmällä tasolla (z7, S = 13,5) ATLANTIN VALTAMERI oli 4 725
   * pikseliä eli 9,2 laattaa leveä ja laatta jäi kokonaan kirjainten
   * sisään, kun taas uloimmalla (z0, S = 0,105) kirjaimen korkeus oli
   * 1,8 pikseliä. Kynnys hoitaa syvän pään, ja mitoitus
   * (tyylitiedoston `koko`) uloimman.
   *
   * KYNNYS ON MITATTU, EI VALITTU TUNNELMALLA. Kriteeri on omistajan
   * "koko meri on näkyvissä", ja se on mitattu merimaskista: kunkin
   * nimiön kohdalta käveltiin itään ja länteen rantaan asti, jolloin
   * meren oma leveys laitepikseleinä on tasoittain
   *
   *      meri            z1     z2     z3
   *      Tyynimeri      619   1238   2476
   *      Jäämeri        626   1251   2502
   *      Intian valt.   306    611   1222
   *      Atlantti       310    619   1239
   *
   * Peli katsoo valittua tasoa noin 1:1 laitepikseleinä
   * (js/laattapyramidi.js valitseTaso), joten näkymän leveys on
   * puhelimella 1170 ja työpöydällä 1440-3024 laitepikseliä. Tasolla
   * z2 jokainen nimetty meri mahtuu näkymään; z3:lla Tyynimeri ja
   * Jäämeri ovat jo kaksi ruudullista. Raja kulki siksi aluksi z2:n ja
   * z3:n välissä (0,3), ja se kirjataan samassa yksikössä kuin muutkin
   * yleistyskynnykset (kuvapikseliä lautayksikköä kohti): z2 on 0,225
   * ja z3 on 0,45.
   *
   * (Eteläinen jäämeri on kehämeri eikä mahdu näkymään millään
   * tasolla; se seuraa muita, koska sen nimi kulkee kartan alalaidassa
   * vyönä eikä rajatun altaan sisällä.)
   *
   * === KYNNYS NOUSEE Z3:LLE (omistaja 1.9.2026 illalla) =============
   *
   * Sanatarkasti: *"toiseksi uloin zoomtaso saisi sisältää samat
   * lisämerkinnät karttaan kuin uloin taso. tai ainakin sen ison
   * ilmansuunta symbolin meren päällä."*
   *
   * TÄMÄ ON SAMA PYYNTÖ KUIN AAMULLA, ERI KALUSTEISTA. Aamulla omistaja
   * pyysi kartussin ja painajanrivin näkyviin *"toiseksi laajimmalle
   * zoom tasolle"*, ja se mitattiin z3:ksi (omistajan kaappaukset
   * olivat mittajanoiltaan 5000 km ja 2000 km eli z2 ja z3; ks.
   * KALUSTEET_YLARAJA alla). Pelaajan laajin näkymä osuu z1:een tai
   * z2:een ja seuraava porras z3:een — sama pari. Aamun korjaus koski
   * VAIN marginaalin kalusteita, joten z3:lle jäi arkki, jossa on
   * otsikko ja painajanrivi mutta ei yhtään valtameren nimeä eikä
   * kompassiruusua. Juuri se ero on omistajan *"samat lisämerkinnät"*.
   *
   * MIKSI ALKUPERÄINEN MITTAUS SILTI PITÄÄ. Kriteeri *"koko meri on
   * näkyvissä"* oli oikea kysymys nimen SIJOITTELULLE, ei sen
   * olemassaololle: nimi ja meri ovat molemmat kartan mittakaavassa
   * (S), joten nimen osuus altaastaan on JOKA TASOLLA SAMA — z3:lla
   * ATLANTIN VALTAMERI on 564 px ja sen allas 1 239 px, täsmälleen
   * sama suhde kuin z2:lla (282 / 619). Nimi ei siis voi z3:lla
   * törmätä rantaan sen enempää kuin z2:lla, eikä yksikään mitattu
   * täyttöaste muutu. Ainoa muutos on, ettei Tyynenmeren nimeä näe
   * enää yhdellä silmäyksellä koko altaansa kanssa — ja omistaja pyysi
   * tätä nähtyään juuri sen näkymän.
   *
   * 0,5 ON SAMA LUKU KUIN MARGINAALIN KALUSTEILLA, mutta vakio pysyy
   * omanaan: kriteerit ovat eri (allas vs. arkki), ja jos omistaja
   * joskus haluaa nimet pois z3:lta jättäen otsikon paikalleen, vain
   * tämä luku liikkuu. Raja kulkee z3:n (0,45) ja z4:n (0,90) välissä,
   * eli 1000 km:n näkymässä kartta on taas nimetön kuten ennenkin.
   *
   * KYNNYS ON KAHDESSA PAIKASSA. Sama luku on
   * tools/generoi-laattapyramidi.mjs:ssä umpimeren karsintaa varten
   * (`umpimeriSavy` ehto 4): jos ne eroaisivat, karsinta heittäisi
   * pois juuri sen laatan, johon piirto on kirjoittamassa nimen.
   */
  const KALUSTEIDEN_YLARAJA = 0.5;
  const merinimetNakyvat = px <= KALUSTEIDEN_YLARAJA;
  /*
   * === MARGINAALIN KALUSTEILLA ON OMA KYNNYS (omistaja 1.9.2026) =====
   *
   * Omistaja katsoi kahta kaappausta peräkkäin ja sanoi: *"Toiseksi
   * laajimmalla zoom tasolla saisi näkyä paperin päälle ladottu
   * matkakirja ja alhaalla myös muut vastaavat"*, ja täsmensi mitä
   * tarkoitti: *"nuo tekstit jotka näkyy valkoisen marginaalin
   * päällä"*.
   *
   * Kaappaukset ovat mittajanoiltaan 5000 km ja 2000 km eli tasot z2
   * (0,225 px/yks) ja z3 (0,45). Vanha kynnys 0,3 päästi kartussin ja
   * painajanrivin vain z2:lle, joten z3:lla arkki oli paperia ilman
   * nimeä — ja juuri z3 on se taso, jolla peli näyttää koko
   * maailmankartan tabletin ruudulla.
   *
   * KYNNYS ON KALUSTEILLE OMA, EI MERTEN NIMIEN KANSSA JAETTU. Merten
   * nimet ovat KARTAN ALALLA ja niiden kynnys tulee siitä, mahtuuko
   * koko meri näkymään (osion 7 mittaus): se ei muuttunut. Kartussi ja
   * painajanrivi ovat MARGINAALISSA, ja niiden kysymys on toinen —
   * onko arkki kokonaisena katsottavana. Sama arkki on kokonaisena
   * myös z3:lla.
   *
   * 0,5 on tason 3 (0,45) yläpuolella ja tason 4 (0,9) alapuolella,
   * eli raja kulkee siellä missä omistajan kaksi kaappausta erottuvat
   * seuraavasta: 1000 km:n näkymässä (z4) marginaali on jo ruudun
   * ulkopuolella, eikä otsikkoa siellä katsota.
   */
  const KALUSTEET_YLARAJA = 0.5;
  const kalusteetNakyvat = px <= KALUSTEET_YLARAJA;

  /*
   * Valtamerten nimet ovat karttatypografiaa eivätkä paikkatietoa: ne
   * on aseteltu silmällä sinne, missä ulappaa riittää (tyylitiedosto
   * tools/generoi-laattapyramidi.mjs MERET). Ei haloa — nimi jää
   * paperiin kuten maalehdillä.
   */
  if (merinimetNakyvat) {
    for (const m of tyyli.meret ?? []) {
      teksti(m.nimi, kuvaX(m.lon), kuvaY(m.lat), {
        koko: m.koko ?? 20, tyylitys: 'italic', vari: 'rgba(112,99,76,0.62)',
        ank: 'center', vali: (m.koko ?? 20) * 0.34, kulma: m.kulma ?? 0,
      });
    }
  }

  /* ================================================== 8. KOMPASSIRUUSU
   *
   * Kartan omalle tyhjälle merialueelle, ei marginaaliin: aikakauden
   * atlaksessa ruusu on kartan sisällä siellä, missä ulappaa riittää.
   * Paikka tulee työkalulta (tools/tee-yleislehti.mjs KOMPASSI) ja on
   * eteläinen Tyynimeri — laudan suurin yhtenäinen tyhjä vesi, jolla ei
   * ole yhtään kaupunkia, laattaa eikä valtameren nimeä.
   *
   * RUUSU PIIRRETÄÄN SAMALLA KYNNYKSELLÄ KUIN MERTEN NIMET (osio 7):
   * se on arkin kaluste eikä maastoa, ja z7:llä se oli mitattuna
   * 4 419 pikseliä eli 8,6 laattaa leveä — yksi laatta jäi kokonaan
   * ruusun navan sisään (katsottu).
   *
   * KAIVERRUSTYYLI syntyy kahdesta puoliskosta: jokainen sakara on
   * jaettu keskiviivastaan valoon ja varjoon, kuten teräskaiverruksessa,
   * jossa kolmiulotteisuus tehdään sävyllä eikä varjostuksella.
   */
  if (tyyli.kompassi && merinimetNakyvat) {
    const k = tyyli.kompassi;
    const r = (k.sade ?? 130) * S;
    const cx = kuvaX(k.lon);
    const cy = kuvaY(k.lat);
    /*
     * VALO JA VARJO OVAT ERI MAALIA, EIVÄT ERI VOIMAKKUUTTA. Kaiverruksen
     * kolmiulotteisuus syntyy siitä, että sakaran toinen puolisko on
     * paperinvaaleaa ja toinen mustetta; pelkkä sävyero samasta
     * musteesta latistaa ruusun harmaaksi tähdeksi.
     */
    const varjo = 'rgba(74,52,33,0.66)';
    const valo = 'rgba(250,244,226,0.62)';
    const viiva = 'rgba(74,52,33,0.6)';
    ctx.save();
    ctx.translate(cx, cy);
    ctx.lineJoin = 'miter';
    ctx.lineWidth = 0.75 * S;
    const sakara = (kulma, pituus, kanta) => {
      const a = kulma * Math.PI / 180;
      const kx = Math.sin(a) * pituus;
      const ky = -Math.cos(a) * pituus;
      const bx = Math.cos(a) * kanta;
      const by = Math.sin(a) * kanta;
      for (const puoli of [-1, 1]) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(kx, ky);
        ctx.lineTo(bx * puoli, by * puoli);
        ctx.closePath();
        ctx.fillStyle = puoli > 0 ? varjo : valo;
        ctx.fill();
        ctx.strokeStyle = viiva;
        ctx.stroke();
      }
    };
    // Väli-ilmansuunnat ensin, jotta pääsakarat jäävät päälle.
    for (let i = 0; i < 4; i++) sakara(i * 90 + 45, r * 0.6, r * 0.1);
    for (let i = 0; i < 4; i++) sakara(i * 90, r, r * 0.135);
    // Napa peittää sakaroiden risteyksen, joka jäisi muuten sotkuiseksi.
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(74,52,33,0.8)';
    ctx.fill();
    ctx.strokeStyle = viiva;
    ctx.lineWidth = 0.8 * S;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.16, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1.5 * S;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.24, 0, Math.PI * 2);
    ctx.stroke();
    // Asteripsut kehän väliin: 32 kompassipiirtoa kuten merikartassa.
    ctx.lineWidth = 0.8 * S;
    ctx.beginPath();
    for (let i = 0; i < 32; i++) {
      const a = (i * 360 / 32) * Math.PI / 180;
      const pitka = i % 4 === 0;
      const r0 = r * 1.16;
      const r1 = r * (pitka ? 1.24 : 1.205);
      ctx.moveTo(Math.sin(a) * r0, -Math.cos(a) * r0);
      ctx.lineTo(Math.sin(a) * r1, -Math.cos(a) * r1);
    }
    ctx.stroke();
    ctx.restore();
    teksti('N', cx, cy - r * 1.45, {
      koko: (k.sade ?? 130) * 0.2, vari: 'rgba(74,52,33,0.62)', ank: 'center',
    });
  }

  /* =========================================== 8b. PYSYVÄT VIIVAT
   *
   * Joet ja isoisän reittiverkosto poltetaan laattoihin (Raamattu,
   * omistajan täsmennys 29.8.2026: *"kaikki reittipisteet ja kaupungit
   * yms voidaan piirtaa suoraan yhteen karttaan"*).
   *
   * NIMET JA NIIDEN MERKIT EIVÄT ENÄÄ OLE TÄÄLLÄ (omistajan päätös
   * 30.8.2026): perustelu on alempana omassa lohkossaan. Tähän jää se,
   * mikä on viivatyötä ja mitä ei lueta — 123 uomaa ja 479 reittijanaa,
   * jotka elävässä kerroksessa maksaisivat kehysaikaa joka eleessä.
   *
   * === MITAT OVAT KARTAN MITTOJA, EIVÄT RUUDUN =====================
   *
   * Tämä on se kohta, jossa pyramidi eroaa yhden arkin lehdestä, ja
   * ero on tehty väärin kahdesti: ensin skaalaamalla kaikki kartan
   * mukana (mitattiin, korjattiin luvussa 6d), sitten pitämällä
   * KAIKKI painojälki paperivakiona (mitattiin, korjattiin tässä).
   *
   * Moottorin kalusteet kerrotaan S:llä, jolloin ne ovat SAMAN
   * KOKOISIA KARTALLA joka tasolla — kehys ja kartussi kuuluvat juuri
   * niin. Paperin rae, rannikon viiva ja nimiöt eivät kuulu (ne ovat
   * paperivakioita, P): peli valitsee tason ruudun tarkkuuden mukaan
   * ja katsoo laattaa suunnilleen 1:1, joten `koko * S` pikseliä
   * olisi `koko * S` LAITEPIKSELIÄ ruudulla.
   *
   * PYSYVÄT VIIVAT — JOET JA REITIT — OVAT KOLMAS LAJI, ja se on
   * omistajan päätös 31.8.2026: ne ovat kartan MERKINTÖJÄ, joten ne
   * kutistuvat kartan mukana (`R`, alla). Rantaviiva ei ole merkintä
   * vaan maaston raja, eikä se siksi kutistu.
   *
   * === YLEISTYS TEHDÄÄN KOOLLA, EI KYNNYKSILLÄ =====================
   *
   * Ennen tässä oli kolme kynnystä: reitit sisään kun px ≥ 0,22, joet
   * kun px ≥ 0,11 ja sivujoet kun px ≥ 0,45. Ne olivat oikea ratkaisu
   * niin kauan kuin muste oli paperivakio: uloimmalla tasolla maailma
   * on 675 pikseliä leveä, ja 123 uomaa täyden levyisenä olisi ollut
   * harmaata mössöä.
   *
   * KAIKKI KOLME ON POISTETTU, koska `R` hoitaa saman asian paremmin
   * ja koska kynnys rikkoi pyramidin oman perussäännön: *"jokainen
   * taso piirtää TÄSMÄLLEEN saman arkin"*
   * (tools/generoi-laattapyramidi.mjs). Kynnys teki uloimmista
   * tasoista eri SISÄLLÖN, ei vain pienemmän — ja juuri sitä pyramidi
   * ei saa tehdä. Nyt sisältö on sama joka tasolla ja vain koko
   * muuttuu.
   *
   * MITATTU, ETTEI POISTO TUO MITÄÄN NÄKYVIIN (luvut
   * docs/moduulit/laattapyramidi.md 6i ja 6k): kynnyksettä piirretyn
   * laatan keskisävy tummenee jokien takia z0:lla 0,003, z1:llä 0,014
   * ja z2:lla 0,032 luminanssiyksikköä, kun paperin oma rae on
   * 6…14 yksikköä — eli 0,02…0,5 % rakeesta. Kynnykset eivät siis
   * rajanneet pois mitään näkyvää, vaan pelkkää työtä — ja työtäkin
   * vain 32 laatalla 23 340:stä.
   */
  if (sisalto) {

    /*
     * === R = PYSYVIEN VIIVOJEN MUSTE ON KARTTAVAKIO ==================
     *
     * OMISTAJAN PÄÄTÖS 31.8.2026, ensin reiteistä sanatarkasti: *"kun
     * kartta on zoomattu tarpeeksi ulospäin, niin pisteistä tulee
     * aivan liian häiritseviä. Pisteiden koko pitäisi siis pysyä koko
     * ajan samana, elikkä kun kartta zoomautuu ulospäin, niin pisteet
     * ja viivat alkavat pienentyä kartan mukana. Eli mietitään
     * pisteiden koko niin, että se näyttää lähimmässä zoomauksessa
     * hyvälle ja sitten ne häipyvät näkyvistä pienentyessään aina kun
     * zoomataan ulospäin, mikä on luonnollista."* — ja saman tien
     * perään JOISTA: sama sääntö, koska joki on kartan merkintä eikä
     * painokoneen ominaisuus, ja yksi sääntö on parempi kuin kaksi
     * eri sääntöä samassa piirrossa.
     *
     * TÄMÄ KUMOAA NÄIDEN KAHDEN OSALTA luvun 6d säännön *"painojälki
     * on vakio ulostulopikseleinä"*. Paperivakio pitää merkin saman
     * kokoisena ruudulla joka tasolla — juuri siitä syntyi valitettu
     * vika: uloimmalla tasolla, jossa yksi askelmahelmi kattaa satoja
     * kilometrejä, sama 6,4 pikselin helmi peitti mantereen.
     *
     * MITÄ TÄMÄ EI KOSKE, JA SE ON SANOTTAVA ÄÄNEEN:
     *
     *   RANTAVIIVA EI MUUTU. Se ei ole merkintä vaan MAASTON RAJA, ja
     *   samalla maavärin täytön reuna: jos ranta ohenisi ulommilla
     *   tasoilla, maa ja meri erkanisivat toisistaan ja rannikolle
     *   jäisi rako (luku 6h — ne piirretään tarkoituksella samasta
     *   vektorista).
     *   KEHYS, KARTUSSI, NIMIÖT JA PATINA EIVÄT MUUTU. Ne ovat arkin
     *   geometriaa ja painojälkeä; niiden skaalaaminen rikkoisi
     *   laattaruudukon (luku 6d).
     *
     * MITOITETTU SYVIMMÄN TASON MUKAAN. `SYVIN_TIHEYS` on pyramidin
     * syvimmän tason tiheys (tools/generoi-laattapyramidi.mjs
     * `TIHEYS`), ja se on tässä pelkkä KALIBROINTIPISTE: se kertoo,
     * millä tasolla ilmeen on määrä olla se hyväksytty. `px` on tämän
     * tason kuvapikseliä lautayksikköä kohti, joten `px /
     * SYVIN_TIHEYS` on 1 syvimmällä tasolla ja puolittuu joka
     * askelmalla ulospäin. Jos pyramidin tiheys joskus muuttuu,
     * muuttuu kalibrointipiste eikä periaate.
     *
     * YHDEN ARKIN LEHDELLÄ EI MUUTU MITÄÄN. Siellä `paperiS` on null,
     * jolloin `R = P = S` eli kartan mittakaava — yhden arkin lehdellä
     * paperi ja kartta ovat sama mittakaava, ja siksi vika ei näkynyt
     * ennen pyramidia.
     */
    const SYVIN_TIHEYS = 7.2;
    const R = paperiS != null ? (px / SYVIN_TIHEYS) * paperiS : P;

    /* --- joet: uomat ennen kaupunkeja, kuten vesi on ennen kaupunkia
     *
     * LEVEYS ON NYT KARTTAVAKIO (ks. R yllä) JA SAMALLA NOUSI.
     * Omistaja 31.8.2026: *"Joki saisi olla leveämpi kuin nyt jotta
     * näkyy paremmin"* — jokien mitoitus ei siis ollut pelkkä
     * yksikönvaihto niin kuin reiteillä, joilla z7 ei saanut liikkua.
     * Vanhat 1,4 / 1,0 nostettiin 2,2 R / 1,6 R (kerroin 1,57), eli
     * z7:llä 2,20 ja 1,60 pikseliä ja puolet siitä joka taso ulospäin.
     *
     * LEVEYS VALITTIIN KATSOMALLA, EI ARVAAMALLA: neljä leveyttä
     * (1,4/1,0 · 1,8/1,3 · 2,2/1,6 · 2,6/1,9) renderöitiin samasta
     * z7-ruudusta ja katsottiin 1:1 sekä kolminkertaisena
     * suurennoksena. 1,8 jäi yhä ohueksi; 2,6 alkoi näyttää maantieltä
     * eikä uomalta, ja sivujokia on 115 eli valtaosa uomista.
     *
     * JOKI EI SAA KILPAILLA RANTAVIIVAN KANSSA, koska silmä lukee
     * molemmat veden rajaksi. Rantaviivan kynä on 1,1 P eli
     * PAPERIvakio, joki 2,2 R eli KARTTAvakio — ne ovat yhtä leveät
     * vasta z6:lla, ja joki on kynää leveämpi VAIN z7:llä, jossa
     * katsoja on lähimpänä ja ero on helpoin nähdä. Ennen muutosta
     * joki oli kynää leveämpi JOKA TASOLLA (1,4 : 1,1), joten
     * sekaantumisriski itse asiassa pieneni kaikkialla paitsi
     * syvimmällä tasolla. Mitattuna samasta laatasta samalla
     * estimaattorilla: rantaviivan Weberin kontrasti on 0,47…0,53 ja
     * joen 0,011…0,221, eli ranta on syvimmälläkin tasolla yli
     * kaksinkertainen. Sen etu ei ole leveydessä vaan siinä, että
     * sillä on oma 3 P:n usva ja maavärin täyttöraja, ja että sen
     * muste (58,40,25 alfalla 0,85) on paljon tummempaa kuin joen
     * siniharmaa (120,130,138 alfalla 0,72).
     *
     * `tarkeys` ei enää valitse KETKÄ piirretään vaan pelkän
     * leveyden. Kaikki 123 uomaa ovat joka tasolla, ja pääjoen (8 kpl)
     * ja sivujoen (115 kpl) ero on 2,2 : 1,6.
     *
     * JOET HÄIPYVÄT YHÄ AIEMMIN KUIN REITIT, ja se on mitattu eikä
     * arvattu: jokimuste on vaaleaa siniharmaata (120,130,138) alfalla
     * 0,72, kun reitin seepia ja preussinsininen ovat paljon tummempia.
     * Jokien oma lisäys paperin tummuuteen
     * (docs/moduulit/laattapyramidi.md 6i) on z5:llä 0,071 / 0,047,
     * z4:llä 0,025 / 0,013 ja z3:sta ulospäin alle 0,005 — reitit
     * erottuvat vielä z3:lla. Leveyden nosto osti täsmälleen yhden
     * tason lisää (1,4:llä joki hävisi jo z4:ään), mutta järjestys
     * säilyi: joki katoaa ennen reittiä, mikä on kartografisesti
     * oikein — rata on tärkeämpi kuin maasto.
     */
    /*
     * 2,2 / 1,6 -> 2,6 / 1,9 (omistajan valinta 31.8.2026 arkilta:
     * *"Minusta se leveämpi joki oli paras. Käytä sitä."*).
     *
     * Agentti oli hylännyt 2,6:n sillä perusteella, että sivujoki
     * alkaa lukea maantienä — ja sivujokia on 115 kaikkiaan 123:sta.
     * Omistaja katsoi saman arkin ja oli eri mieltä, ja hänen
     * silmänsä ratkaisee tyylikysymyksen. Perustelu jätetään tähän
     * näkyviin, koska se on se hinta joka tästä maksetaan: jos joet
     * joskus alkavat sekoittua maareitteihin, syy on tässä luvussa
     * eikä reittien musteessa.
     */
    const JOKI_PAA = 2.6;
    const JOKI_SIVU = 1.9;
    if (sisalto.joet?.length) {
      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(120,130,138,0.72)';
      for (const joki of sisalto.joet) {
        // Pääjoki on leveämpi; kaikki uomat piirretään joka tasolla.
        ctx.lineWidth = (joki.tarkeys <= 1 ? JOKI_PAA : JOKI_SIVU) * R;
        // Pehmeä käyrä pisteiden läpi, ei murtoviiva — ks. lautaKaari.
        lautaKaari(ctx, [joki.pisteet]);
        ctx.stroke();
      }
      ctx.restore();
    }

    /* --- reitit: pelilaudan rata askelmineen ------------------------
     *
     * OSIO ON NYT OMANA PASSINAAN (viivataso 31.8.2026 ilta): sama
     * funktio piirtää reitit pohjan arkille JA läpinäkyvälle
     * viivatasolle. Musteet, katkokuvio, käsin piirretty heitto ja
     * askelhelmet ovat `piirraReititKankaalle`-funktion johdannossa.
     *
     * PYRAMIDIN POHJA-AJO ANTAA TYHJÄT LISTAT (sisalto.reitit = [],
     * lentoreitit = []): rata on siellä viivatasolla. JOET JÄÄVÄT
     * POHJAAN (yllä) — joki on maastoa eikä rataa, eikä sitä ole
     * tarpeen polttaa uudestaan silloin kun reittiverkko muuttuu.
     */
    piirraReititKankaalle(ctx, sisalto, {
      lautaKuvaX, lautaKuvaY, px, P, R, GX, GY, W, H, GW,
      kierros: projektio.leveys ?? 0,
    });

    /* ============================ NIMET JA MERKIT EIVÄT OLE LAATOISSA
     *
     * OMISTAJAN PÄÄTÖS 30.8.2026 (kysymyskortti): kaupunkien, vuorten
     * ja järvien NIMIÖT sekä niiden MERKIT poistuvat laatoista, ja peli
     * latoo ne ruutuavaruudessa (js/karttanimet.js). Tämä kumoaa nimien
     * osalta linjauksen *"kaikki pysyvä poltetaan laattoihin"*.
     *
     * SYY ON RAKENTEELLINEN EIKÄ SÄÄTÖKYSYMYS. Laatta on sama tiedosto
     * kaikille laitteille eikä se tiedä katsojan pikselitiheyttä.
     * Asiakas valitsee tason luvusta `skaala * dpr`, joten poltettu
     * 10,5 pikselin nimi on työpöydällä 10,5 CSS-pikseliä ja iPadilla
     * 3,5 — kolmasosan kokoinen. Sitä ei voi mitoittaa laatassa pois,
     * koska tasoindeksi ei erota pikselitiheyttä zoomista: sama taso
     * valitaan sekä "dpr 3 ja kaukana" ETTÄ "dpr 1 ja kolme kertaa
     * lähempänä". Yksi luku laatassa ei voi palvella kahta
     * riippumatonta muuttujaa.
     *
     * MYÖS MERKIT LÄHTEVÄT, JA SE ON SAMA PÄÄTÖS. Kaupunkipiste (2,0 /
     * 2,6 px), sen rengas (4,6 px) ja vuorisymboli (4–5 px) kärsivät
     * täsmälleen samasta viasta, ja ne ovat NIMEN ANKKUREITA: ladonta
     * varaa pisteen ennen nimeä, jottei nimi peitä toisen kaupungin
     * merkkiä. Jos piste jäisi laattaan ja nimi lähtisi peliin, ne
     * eivät olisi enää samassa suhteessa eikä varaus vastaisi sitä,
     * mitä ruudulla oikeasti on.
     *
     * KOHDERENGAS (3,2 px) LÄHTEE ILMAN KORVAAJAA. Kohteilla on jo
     * elävä, ruutuun mitoitettu merkki nimineen ja napautusaloineen
     * (js/fokuskohteet.js) siinä maassa, jossa pelaaja on — poltettu
     * rengas oli sen alla toinen, pienempi merkki samasta asiasta.
     * Muualla siitä jäi nimetön ympyrä, joka on tiheällä näytöllä
     * yhden CSS-pikselin kokoinen.
     *
     * VUORTEN KORKEUSLUKEMA (`4810 m`) EI KATOA TÄSSÄ: se piirtyi vain
     * ilman ladontaa eli ei koskaan pyramidissa.
     *
     * LAATTOIHIN JÄÄVÄT joet ja reitit yllä. Ne ovat viivatyötä samassa
     * paperivakioluokassa kuin rannikko (luku 6d), niissä ei ole
     * tekstiä, eikä 602:ta polyviivaa kannata palauttaa siihen elävään
     * kerrokseen, jonka purkaminen teki panoroinnista sujuvan (v1365).
     */
  }

  /* ============================== 8c. POLTETUT KARTTANOSTOT
   *
   * OMISTAJAN PÄÄTÖS 31.8.2026 (Raamattu, KARTTANOSTOT POLTETAAN
   * LAATTOIHIN), sanatarkasti: *"mikään karttanostoista ei kuulu kadota
   * laudalta missään vaiheessa peliä, joten ne voidaan aivan hyvin
   * polttaa suoraan karttaan"* ja *"myös nostojen tekstit on hyvä
   * polttaa suoraan kartalle"*.
   *
   * === MIKSI NÄMÄ SAA POLTTAA, VAIKKA PAIKANNIMIÄ EI (luku 8b) =====
   *
   * Kysymys ei ole tekstistä vaan MITTAKAAVASTA. Paikannimi on RUUDUN
   * mitassa — 10,5 CSS-pikseliä joka laitteella — eikä laatta tiedä
   * katsojan pikselitiheyttä, joten poltettu nimi on iPadilla
   * kolmasosan kokoinen. Karttanosto on KARTAN mitassa (omistajan
   * linjaus 26.8.2026: *"merkit elävät kartan mittakaavassa"*): sen
   * koko on lehden rajauksesta laskettu vakio lautayksiköitä
   * (js/nostoladonta.js nostoladontaSkaala), ja se kutistuu kartan
   * mukana kuten vuorikolmio ja rantaviiva. Tiheä näyttö valitsee
   * syvemmän tason ja saa saman merkin tarkempana — ei pienempänä.
   *
   * Sivutuote, joka ratkaisee vanhan valituksen: uloimmilla tasoilla
   * merkit häipyvät itsestään (z0:lla Ateenan symbolin säde on 0,1
   * kuvapikseliä), joten yleiskuvan merkkikasaa ei enää ole.
   *
   * === LADONTA ON JO TEHTY, TÄSSÄ VAIN PIIRRETÄÄN =================
   *
   * `nostot` on pelin oman ladonnan tulos laudan yksiköissä
   * (tools/fokuskartta/nostot.mjs, joka ajaa js/fokuskohteet.js:n ja
   * js/fokusniput.js:n passit sellaisinaan). Ladonta on ajettu KERRAN
   * KOKO ARKILLE, ei lohkoittain — sama sääntö ja sama syy kuin
   * paikannimillä: törmäyksenvältely on globaali päätös, ja
   * lohkoittain ladottuna nosto katkeaisi laattarajalle.
   *
   * MERKKI PIIRRETÄÄN PELIN OMALLA KOODILLA (js/fokusnosto-symbolit.js
   * piirraNostosymPolttoon), ei generaattorin kopiolla. Se on Raamatun
   * ehto: poltetun ja elävän on tultava samasta lähteestä.
   *
   * === NOSTO ON KARTTAVAKIO, KUTEN REITIT JA JOET =================
   *
   * Merkin oma mitta (`m.porras`) on lautayksikköä kirjaston yksikköä
   * kohti, ja kertomalla se `px`:llä saadaan kuvapikseliä kirjaston
   * yksikköä kohti. Mitään paperivakiota ei ole: merkki on kartan
   * merkintä eikä painokoneen ominaisuus.
   */
  if (nostot?.length && piirraNosto) {
    piirraNostotKankaalle(ctx, nostot, piirraNosto, { lautaKuvaX, lautaKuvaY, px });
  }

  ctx.restore();                       // kartta-alan leikkuri auki

  /* ================================================== 9. ATLASKEHYS
   *
   * Kaikki painetun lehden kalusteet marginaaleissa: kaksoisviivakehys,
   * kartussi ja painajanrivi. Piirretään VASTA
   * leikkurin purun jälkeen, koska ne kuuluvat kartan ulkopuolelle — ja
   * ENNEN paperin rakeen viimeistä kierrosta (osio 10), jotta rae sitoo
   * kehyksen musteen samaan paperiin kuin rantaviivan.
   *
   * === KAKSI ERI ASIAA SAMASSA MARGINAALISSA ========================
   *
   * PAPERI JA REUNAVIIVAT ovat joka tasolla. Marginaalin korkeus on
   * arkin geometriaa — se määrää laattaruudukon eikä sitä saa muuttaa
   * (luku 5) — ja kaksoisviiva on kartan reuna, joka kuuluu näkyä myös
   * silloin kun pelaaja panoroi laidalle syvässä zoomissa.
   *
   * KARTUSSI JA PAINAJANRIVI ovat ARKIN KALUSTEITA, ja ne
   * seuraavat merten nimien ja kompassin kynnystä (osio 7). Peruste on
   * Raamatun oma sanamuoto atlaskehyksestä: *"kaukaisimmalla
   * zoomtasolla kartta makaa paperilla ... Poltetaan uloimman tason
   * laattoihin"*. Ne kertovat mikä ARKKI tämä on, ja arkkia katsotaan
   * kokonaisena vain uloimmilla tasoilla; syvällä pelaaja katsoo
   * seutua, ei lehteä.
   *
   * Ilman kynnystä ne ovat mitattuna (30.8.2026) z7:llä:
   *   MATKAKIRJA          5 256 px eli 10,3 laattaa, kirjain 419 px
   *   painajanrivi        6 805 px eli 13,3 laattaa
   * Kukaan ei ole päättänyt niin — se on jäänne siitä, että S tarkoitti
   * kerran vain tarkkuutta (ks. PAPERIN MITTAKAAVA).
   *
   * MITTAJANA ON POISTETTU KOKONAAN (omistajan päätös 30.8.2026);
   * perustelu on siinä kohdassa, jossa se oli — ks. alempana.
   */
  if (kehys) {
    /*
     * TURVAVYÖHYKE — MITATTU PELISTÄ, EI ARVATTU.
     *
     * Marginaalia EI näy koko leveydeltään millään ruudulla: uloimmassa
     * zoomissa näkyvä leveys on laudan leveys, joten näkyvä korkeus
     * riippuu karttaruudun kuvasuhteesta. Mitattu 29.8.2026 selaimessa
     * (koko lauta ruudulle ajettuna):
     *
     *   1920 x 1080  karttaruutu 1901 x 1003  → 371 lautayksikköä eli
     *                198 kuvapikseliä laudan ylä- ja alapuolelle
     *   1180 x 820   karttaruutu 1161 x 743   → 551 px, koko marginaali
     *   430 x 930    puhelin                  → moninkertaisesti
     *
     * Siksi KAIKKI kalusteet — kartussi, jana, painajanrivi — mahtuvat
     * 198 kuvapikselin sisään reunaviivasta. Paperia on sen ulkopuolella
     * vielä hitusen (232 ja 240 px), jotta korkeammilla ruuduilla näkyy
     * arkin oma leikattu reuna eikä kesken loppuva kerma.
     *
     * MITTAUS ON KARTTA-ALAN LAAJENNUKSEN JÄLKEEN VANHENTUNUT SIINÄ,
     * MISSÄ SE PUHUU TYÖPÖYDÄSTÄ: kartta-ala täyttää nyt 16:9-ruudun
     * kokonaan (ks. tiedoston johdanto). Kalusteiden mitat pidetään
     * silti ennallaan, koska ne on ladottu marginaalin omiin mittoihin
     * ja marginaali näkyy yhä sekä tabletilla että panoroitaessa.
     */
    const MUSTE_KEHYS = 'rgba(74,52,33,0.86)';
    const MUSTE_HENTO = 'rgba(74,52,33,0.62)';

    /**
     * Vaakaviiva koko lehden yli. `gy` on ARKIN rivi; laatalle se
     * siirretään canvasin omaan nurkkaan (ks. koko/siirto).
     */
    const vaaka = (gy, paksuus, vari = MUSTE_KEHYS) => {
      ctx.save();
      ctx.strokeStyle = vari;
      // Viivan LEVEYS on painojälkeä (P), sen PAIKKA arkin geometriaa
      // (S). Ks. KEHYSVIIVAT OVAT PAINOJÄLKEÄ alempana.
      ctx.lineWidth = paksuus * P;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(GW, gy);
      ctx.stroke();
      ctx.restore();
    };

    /*
     * KAKSOISVIIVA: ohut reunaviiva kartan laidassa ja sen ulkopuolella
     * paksumpi kehysviiva. Järjestys on aikakauden painotyön oma —
     * hiusviiva rajaa kuvan, vahva viiva rajaa lehden.
     */
    /*
     * === KEHYSVIIVAT OVAT PAINOJÄLKEÄ (korjattu 30.8.2026) ==========
     *
     * Viivat piirrettiin `paksuus * S`, eli ne olivat KARTAN
     * mittakaavassa. Mitattuna se tarkoitti:
     *
     *   taso   ohut reunaviiva (1,4)   vahva kehysviiva (3,0)
     *   z0     0,15 px (näkymätön)     0,32 px (näkymätön)
     *   z2     0,59 px                 1,27 px
     *   z7     18,9 px                 40,5 px
     *
     * Vertailukohta on rannikon kynä, joka on luvun 6d korjauksen
     * jälkeen paperivakiona 1,1 px joka tasolla. z7:llä kehys oli 40
     * pikselin ruskea palkki meren ja paperin välissä; z0:lla, siis
     * juuri siellä missä arkkia katsotaan kokonaisena, kehystä ei
     * ollut lainkaan.
     *
     * Luvun 6d oma sääntö ratkaisee: PAINOJÄLKI (viivanleveydet) on
     * paperivakio, ARKIN GEOMETRIA (marginaalin korkeus, viivan
     * paikka) on S:ssä. Kehysviivan PAIKKA on geometriaa, sen LEVEYS
     * on painotyötä — kaivertajan kynä ei tiedä mitä mittakaavaa lehti
     * esittää. Sama korjaus kuin rannikolle luvussa 6d.
     *
     * KAKSOISVIIVAN VÄLI TARVITSEE PAPERIVAKIOISEN POHJAN. Väli on
     * arkin geometriaa (14 * S), mutta uloimmilla tasoilla se on
     * 1,5 ... 2,9 px eli KAPEAMPI KUIN VIIVAT ITSE: hiusviiva ja
     * vahva viiva sulaisivat yhdeksi 3,6 pikselin palkiksi, eikä
     * kaksoisviivaa olisi. Väli saa siksi paperivakioisen alarajan,
     * joka on juuri se väli jonka kaivertaja jättäisi. Syvemmillä
     * tasoilla geometria on jo suurempi ja voittaa itsestään.
     */
    const RAKO = 14 * S;
    const RAKO_VIIVA = Math.max(RAKO, 6 * P);
    vaaka(yYla - 0.7 * S, 1.4);
    vaaka(yYla - RAKO_VIIVA, 3.0);
    vaaka(yAla + 0.7 * S, 1.4);
    vaaka(yAla + RAKO_VIIVA, 3.0);

    /*
     * TÄSTÄ ETEENPÄIN VAIN ULOIMMILLA TASOILLA (ks. osion johdanto).
     * Paperi ja kaksoisviiva yllä ovat joka tasolla; kartussi, jana ja
     * painajanrivi kertovat mikä ARKKI tämä on, ja se on kysymys vain
     * silloin kun arkkia katsotaan kokonaisena.
     *
     * KYNNYS ON MARGINAALIN OMA (`kalusteetNakyvat`, osio 7) eikä sama
     * kuin merten nimillä: omistajan päätös 1.9.2026 toi kartussin ja
     * painajanrivin myös tasolle z3, jolla koko maailmankartta on
     * tabletin ruudulla mutta merten nimet olisivat jo liian isot.
     */
    if (kalusteetNakyvat) {
      /* ---------------------------------------------------- kartussi */

      /*
       * KEHYSTEKSTIEN KOKO — MITATTU UUDESTAAN 30.8.2026.
       *
       * Kun kalusteet piirretään vain tasoille z0-z2, ne on mitoitettava
       * niiden mukaan. Vanhoilla koolla ne olivat siellä, missä niitä
       * oikeasti katsotaan, liian pieniä: z2:lla kartussin otsikon
       * kirjainkorkeus oli 13,1 px, painajanrivin 5,9 px ja
       * MITTAKAAVAJANAN LUKEMAN 4,2 px — mittavälineen lukema, jota ei
       * voi lukea.
       *
       * Kerroin on sama luku kaikille, jotta kartussin ladonta ja
       * alamarginaalin rivijako säilyvät sellaisenaan, ja sen ylärajan
       * kertoo tiukin kaluste. Kartussissa se on laatikko (980 · S
       * leveä, 150 · S korkea): otsikko täyttää siitä 40 %, ja pinottu
       * otsikko + alaotsikko täyttävät korkeudesta kolmanneksen.
       * Alamarginaalissa se on rivijako, joka on 32 · S painajanrivin ja
       * ©-rivin välissä. Mitattu ja katsottu: 1,8 on suurin, jolla
       * kumpikaan ei ahtaudu.
       */
      const TEKSTIKERROIN = 1.8;
      const tkoko = (n) => n * TEKSTIKERROIN;

      /*
       * Kartussi ylämarginaalin keskelle. Keskikohta on laudan keskus
       * (x = 6000 eli 5° itäistä pituutta), joka on myös se kohta, johon
       * pelin uloin näkymä keskittyy (js/kartta.js fitViewBox) — otsake
       * on siis ruudun keskellä silloin kun se ylipäätään näkyy.
       */
      const kx = GW / 2;
      const kLev = 980 * S;
      const kYla = 44 * S;
      const kAla = yYla - RAKO - 24 * S;
      const kKork = kAla - kYla;
      ctx.save();
      ctx.lineJoin = 'miter';
      /*
       * Kartussin oma kermalaikku: painettu otsake istuu hitusen
       * vaaleammalla paperilla kuin ympäröivä marginaali. Sävy on SAMAA
       * lämmintä norsunluuta kuin marginaali (ks. osio 1-3): neutraalin
       * valkoinen jäisi patinan merimaskin alle, ja passi vetäisi
       * kartussin sisään rantaviivat otsakkeen ympärille.
       */
      ctx.fillStyle = 'rgba(250,242,203,0.7)';
      ctx.fillRect(kx - kLev / 2, kYla, kLev, kKork);
      const kehysSuora = (sisennys, paksuus) => {
        ctx.strokeStyle = paksuus > 1.6 ? MUSTE_KEHYS : MUSTE_HENTO;
        // Sama sääntö kuin lehden kehysviivalla: leveys on painojälkeä.
        ctx.lineWidth = paksuus * P;
        ctx.strokeRect(kx - kLev / 2 + sisennys, kYla + sisennys,
          kLev - sisennys * 2, kKork - sisennys * 2);
      };
      kehysSuora(0, 2.4);
      kehysSuora(7 * S, 1.0);
      /*
       * KULMAKORISTEET. Kehyksellä itsellään ei kiertävällä laudalla ole
       * kulmia (ks. tiedoston johdanto), joten koristeet ovat siellä
       * missä kulmat ovat: kartussin nurkissa. Muoto on kaiverruksen oma
       * — nurkan yli vedetty viiste ja sen keskellä pieni vinoneliö.
       */
      const KULMA = 26 * S;
      ctx.strokeStyle = MUSTE_HENTO;
      ctx.lineWidth = 1.1 * P;
      for (const sx of [-1, 1]) {
        for (const sy of [-1, 1]) {
          const nx = kx + sx * (kLev / 2);
          const ny = sy < 0 ? kYla : kAla;
          ctx.beginPath();
          ctx.moveTo(nx - sx * KULMA, ny);
          ctx.lineTo(nx, ny - sy * KULMA);
          ctx.stroke();
          ctx.beginPath();
          const mx = nx - sx * KULMA * 0.5;
          const my = ny - sy * KULMA * 0.5;
          const d2 = 3.6 * S;
          ctx.moveTo(mx, my - d2);
          ctx.lineTo(mx + d2, my);
          ctx.lineTo(mx, my + d2);
          ctx.lineTo(mx - d2, my);
          ctx.closePath();
          ctx.fillStyle = MUSTE_HENTO;
          ctx.fill();
        }
      }
      ctx.restore();

      teksti(kehys.otsikko ?? 'MATKAKIRJA', kx, kYla + kKork * 0.36, {
        koko: tkoko(46), vari: 'rgba(58,40,25,0.9)', ank: 'center', vali: tkoko(46) * 0.28,
      });
      // Otsakkeen ja alaotsakkeen väliin pieni jakoviiva vinoneliöineen.
      {
        const jy = kYla + kKork * 0.6;
        const jl = kLev * 0.24;
        ctx.save();
        ctx.strokeStyle = MUSTE_HENTO;
        ctx.lineWidth = 0.9 * P;
        ctx.beginPath();
        ctx.moveTo(kx - jl, jy); ctx.lineTo(kx - 9 * S, jy);
        ctx.moveTo(kx + 9 * S, jy); ctx.lineTo(kx + jl, jy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(kx, jy - 4.2 * S);
        ctx.lineTo(kx + 4.2 * S, jy);
        ctx.lineTo(kx, jy + 4.2 * S);
        ctx.lineTo(kx - 4.2 * S, jy);
        ctx.closePath();
        ctx.fillStyle = MUSTE_HENTO;
        ctx.fill();
        ctx.restore();
      }
      teksti(kehys.alaotsikko ?? 'Unohdettu aarre', kx, kYla + kKork * 0.79, {
        koko: tkoko(25), tyylitys: 'italic', vari: 'rgba(74,52,33,0.78)',
        ank: 'center', vali: tkoko(25) * 0.2,
      });

      /* --------------------------------- MITTAJANAA EI ARKILLE ENÄÄ
       *
       * POLTETTU MITTAKAAVAJANA POISTETTU (omistajan päätös 30.8.2026,
       * kysymyskortti). Se oli koko atlaskehyksen ainoa kaluste, joka
       * VÄITTI JOTAIN MITATTAVAA — ja se oli ainoa, joka ei voinut
       * pitää väitettään.
       *
       * MITATTU 30.8.2026. Asiakas valitsee lähimmän laattatason
       * logaritmisesti ja skaalaa kuvaa sen jälkeen
       * (js/laattapyramidi.js valitseTaso); kerroin vaihtelee välillä
       * 0,708 ... 1,413. Poltettu jana on kiinni KUVASSA, joten se
       * venyy samalla kertoimella mutta lukema pysyy paikallaan:
       * "5000 km" on ruudulla oikeasti 3 538 ... 7 066 km eli
       * enimmillään 41 % pielessä.
       *
       * MITTAKAAVA ON RUUDUN OMINAISUUS EIKÄ KUVAN, ja juuri siksi
       * pelissä on oma janansa (js/fokusmitat.js laskeMittajana,
       * omistajan tilaus 25.8.2026: *"Mittajana valehteli heti kun
       * pelaaja zoomasi"*). Se laskee pituutensa näkymästä ja valitsee
       * lukunsa sarjasta 1-2-2,5-5, joten se on oikeassa rakenteeltaan
       * eikä vain sattumalta. Kaksi janaa samasta pelistä antaisi eri
       * luvun, ja se joka poistuu on se, joka ei osaa mitata.
       *
       * KARTUSSI JA PAINAJANRIVI JÄÄVÄT. Ne eivät väitä mitään
       * mitattavaa vaan kertovat mikä ARKKI tämä on — sama peruste
       * kuin kompassiruusulla ja merten nimillä.
       */

      /* -------------------------------------------------- painajanrivi */

      /*
       * Aikakauden asu: kustantamo ja painovuosi roomalaisin numeroin.
       * Tekijänoikeusmerkintä on tarkoituksella HUOMAAMATON — se on
       * nykyajan välttämättömyys vanhan lehden reunassa, ei osa lehteä.
       */
      teksti(kehys.painaja ?? '', GW / 2, yAla + RAKO + tkoko(78) * S, {
        koko: tkoko(21), tyylitys: 'italic', vari: 'rgba(74,52,33,0.66)',
        ank: 'center', vali: tkoko(21) * 0.06,
      });
      teksti(kehys.oikeudet ?? '', GW / 2, yAla + RAKO + tkoko(94) * S, {
        koko: tkoko(13), vari: 'rgba(74,52,33,0.34)', ank: 'center', vali: tkoko(13) * 0.16,
      });
    }
  }

  // Arkin koordinaatisto pois: osiot 10–11 ovat pikselisilmukoita, ja
  // ne elävät tämän canvasin omissa riveissä (kohina lukee arkin
  // paikan itse, ks. GX/GY).
  ctx.restore();

  /* ================================================== 10. PAPERIN RAE
   *
   * Viimeinen kerros koko lehden yli: rae sitoo maalin ja musteen
   * yhteen, jottei mikään osa näytä liimatulta.
   */
  {
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const gx = x + GX;
        const gy = y + GY;
        const rae = (KOHINA2(gx / (1.35 * P) + 40, gy / (1.35 * P) + 40) - 0.5) * 8;
        const kuitu = (fbm(KOHINA, gx / (30 * P) + 11, gy / (4 * P) + 11, 2) - 0.5) * 5;
        d[i] = Math.max(0, Math.min(255, d[i] + rae + kuitu));
        d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + rae + kuitu));
        d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + (rae + kuitu) * 0.9));
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ================================================== 11. REUNAHÄIVYTYS
   *
   * VAIN YLÄ- JA ALAREUNA, EI SIVUJA.
   *
   * Lehti on vaakasuunnassa tasan laudan levyinen, joten sen sivut ovat
   * laudan sauma: peli piirtää kartan uudelleen laudan leveyden päähän
   * (js/ui.js kiertoKohdat), ja häivytetty pystyreuna näkyisi siinä
   * kohtaa vaaleana raitana keskellä Tyyntämerta. Ylä- ja alareunassa
   * lehti sen sijaan kohtaa laudan oman pergamentin.
   *
   * ATLASKEHYKSEN KANSSA HÄIVYTYS ON KAPEA. Ilman kehystä reuna oli
   * kartan reuna ja se piti sulattaa pergamenttiin leveällä liu'ulla.
   * Kehyksellisessä lehdessä reuna on ARKIN LEIKATTU LAITA, jonka
   * kuuluu näkyä: pari pikseliä riittää poistamaan porrastuksen, ja
   * loput hoitaa paperin oma reunatummennus (osio 1-3).
   */
  {
    const hy = kehys
      ? Math.max(1, Math.round(2.5 * P))
      : Math.max(1, Math.round(GH * 0.004));
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      const gy = y + GY;
      const a = Math.min(1, Math.min(gy + 0.5, GH - 0.5 - gy) / hy);
      if (a >= 1) continue;
      for (let x = 0; x < W; x++) d[(y * W + x) * 4 + 3] = Math.round(255 * a);
    }
    ctx.putImageData(img, 0, 0);
  }

  /*
   * ESIKATSELU (vain --esikatselu): häivytetty reuna näkyy katselimessa
   * mustana, joten tausta lisätään KAIKEN ALLE. Kuva itse on sama.
   */
  if (esikatseluTausta) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = esikatseluTausta;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  return { w: W, h: H };
}

/* ================================================================
 * NOSTOTASO — läpinäkyvä laattakerros pohjan päälle
 * ================================================================
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 ilta (kysymyskortti, sanatarkka:
 * *"Voisiko nämä nostot polttaa erilliselle läpinäkyvälle
 * rasteritasolle? Jaksaako pyörittää? Voisi poistaa näkyvistä
 * kauemmilla zoom tasoilla"*): karttanostot — symboli, nimiö ja
 * siirtoviiva — poltetaan OMAAN läpinäkyvään laattapyramidiin, ei
 * pohjaan. Päähyöty on nopea uusintapoltto: kun maailmaan tulee uusia
 * nostoja, vain nostotaso ajetaan uudestaan (minuutteja, ei tunteja),
 * ja pohja pysyy ikuisessa välimuistissaan.
 *
 * === YKSI PIIRTO, KAKSI KUTSUJAA ==================================
 *
 * Nosto piirretään TÄSMÄLLEEN samalla koodilla kuin pohjaan
 * poltettaessa: `piirraNostotKankaalle` on sama funktio, jota
 * `piirraMaailma` (luku 8c) kutsuu. Tämä kuori vain pystyttää saman
 * arkkikoordinaatiston (origo, leikkuri, kokonaislukusiirto) ILMAN
 * aineistoa — nostotason ajo ei tarvitse korkeusruudukkoa, Natural
 * Earthiä eikä sisältöä, ja juuri se tekee siitä nopean.
 *
 * === SISÄLTÖPASSIT OVAT PARAMETRI, EIVÄT RAKENNE ==================
 *
 * Omistaja 31.8.2026: reittiverkon voi myöhemmin polttaa samalle
 * tasolle ("Reitit voi piirtää kolmannelle tai samaan jos sekään ei
 * ongelma"). Reitit ovat NYT pohjalaatoissa (luku 8b), eikä niitä
 * siirretä tässä erässä — mutta kun siirto tehdään, se on
 * `sisaltopassit`-listaan lisättävä uusi passi eikä uusi kuori:
 * jokainen passi saa saman ctx:n ja saman mittaolion
 * ({ lautaKuvaX, lautaKuvaY, px }) leikkurin sisällä.
 */

/**
 * Poltetut karttanostot kankaalle — sama piirto poltettuna pohjaan
 * (piirraMaailma 8c) ja läpinäkyvälle nostotasolle (piirraNostotaso).
 *
 * @param {CanvasRenderingContext2D} ctx  arkin koordinaatistossa,
 *   kartta-alan leikkuri päällä
 * @param {Array} nostot  tools/fokuskartta/nostot.mjs:n merkit
 * @param {Function} piirraNosto  js/fokusnosto-symbolit.js
 *   piirraNostosymPolttoon — pelin oma piirto, ei kopiota
 * @param {{lautaKuvaX:Function, lautaKuvaY:Function, px:number}} mitta
 */
export function piirraNostotKankaalle(ctx, nostot, piirraNosto, mitta) {
  const { lautaKuvaX, lautaKuvaY, px } = mitta;
  for (const m of nostot) {
    const mx = lautaKuvaX(m.x);
    const my = lautaKuvaY(m.y);
    /*
     * SIIRTOVIIVA ENSIN, merkin alle — sama järjestys kuin pelissä,
     * jossa viivakerros menee laattakerroksen eteen (js/fokusniput.js
     * nippuViivakerros). Päät on laskettu valmiiksi pelin omalla
     * funktiolla (nippuViivanJana), joten tässä ei ole yhtäkään
     * ladonnan lukua — vain skaalaus laatan kuvapikseleiksi.
     *
     * PALAUTETTU 1.9.2026 ILTA (omistaja, sanatarkasti: *"otetaan
     * siirtoviivat takaisin karttanostoille (esim. ateena)"*); viivat
     * olivat poissa yhden vuorokauden ajan.
     *
     * VAHVISTETTU 2.9.2026 (omistaja: *"Lisää siirto viivat, ne ei
     * vielä näy"*): leveys, himmeys, katko ja muste kaksinkertaistuivat
     * tai vahvistuivat, mutta yhtäkään niistä ei kirjoiteta tänne —
     * kaikki tulevat samasta janasta kuin elävässä kerroksessa, ja
     * juuri se on tämän lohkon koko idea.
     *
     * VIIVA EI OTA RUUTUKATTOA (alempana, nostoladontaKattoPorras).
     * Katto on nimiön luettavuutta varten — se estää nimiötä ohittamasta
     * kartan omaa paikannimeä syvillä tasoilla — ja viivan päät ovat jo
     * laudan koordinaateissa: jos katto purisi niihin, poltettu viiva
     * irtoaisi merkistä juuri niillä tasoilla, joilla se on suurin.
     */
    const v = m.viiva;
    if (v) {
      ctx.save();
      ctx.strokeStyle = v.vari;
      ctx.globalAlpha = v.himmeys;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(0.2, v.leveys * px);
      // Katko ja väli ovat eri mitat (js/fokusniput.js NIPPU_VIIVA_KATKO
      // ja NIPPU_VIIVA_VALI): pidempi veto, lyhyempi väli.
      ctx.setLineDash([v.katko * px, v.vali * px]);
      ctx.beginPath();
      ctx.moveTo(lautaKuvaX(v.x1), lautaKuvaY(v.y1));
      ctx.lineTo(lautaKuvaX(v.x2), lautaKuvaY(v.y2));
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    ctx.translate(mx, my);
    /*
     * RUUTUKATTO (omistaja 1.9.2026: *"Tee max sama koko kuin
     * kohdekaupungin koko"*). Merkin oma mitta on karttavakio ja kasvaa
     * kartan mukana; katto leikkaa sen kasvun syvillä tasoilla niin,
     * ettei nimiö ohita kartan omaa paikannimeä. Kaava on pelin kanssa
     * yhteinen (js/nostoladonta.js nostoladontaKattoPorras), ja tason
     * oma tiheys on LAITEPIKSELEITÄ — muunnos CSS-pikseleihin on
     * NOSTOLADONTA_POLTON_TIHEYS, ks. sen perustelu.
     */
    const porras = nostoladontaKattoPorras(m.porras, px / NOSTOLADONTA_POLTON_TIHEYS);
    piirraNosto(ctx, m, porras * px);
    ctx.restore();
  }
}

/**
 * Läpinäkyvä nostotason lohko — sama arkkigeometria kuin
 * piirraMaailmassa, mutta ei aineistoa, ei paperia, ei kehystä:
 * kankaalle jää vain nostojen muste, kaikki muu on läpinäkyvää.
 *
 * Asetukset ovat sama osajoukko kuin piirraMaailmalla: bbox, leveys,
 * tyyli (kehys — leikkuria varten), koko, siirto, arkki, nostot,
 * piirraNosto. `koko`/`siirto`/`arkki` toimivat täsmälleen kuten
 * pohjapiirrossa (ks. piirraMaailman johdanto): kaikki lasketaan
 * arkin koordinaateissa ja canvas siirretään kokonaisluvulla, joten
 * lohkosta leikattu laatta on tavulleen sama kuin erikseen piirretty.
 */
export function piirraNostotaso(canvas, asetukset) {
  const {
    bbox, leveys, tyyli = {}, koko = null, siirto = null,
    nostot = null, piirraNosto = null,
  } = asetukset;
  const px = leveys / bbox.w;
  const W = Math.round(leveys);
  const H = Math.round(bbox.h * px);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const GX = siirto?.x ?? 0;
  const GY = siirto?.y ?? 0;
  const GW = koko?.w ?? W;
  const GH = koko?.h ?? H;
  const S = GW / 6400;

  /*
   * KARTTA-ALAN LEIKKURI — sama laatikko kuin pohjapiirron osioilla
   * 4–8: nosto ei saa vuotaa atlaskehyksen kermaiseen marginaaliin,
   * joka on pohjalaatoissa nostotason alla.
   */
  const kehys = tyyli.kehys ?? null;
  const yYla = kehys ? Math.round(kehys.yla * S) : 0;
  const yAla = kehys ? GH - Math.round(kehys.ala * S) : GH;

  const origo = asetukset.arkki ?? { x: bbox.x, y: bbox.y };
  const arkkiSiirto = asetukset.arkki ? { x: GX, y: GY } : { x: 0, y: 0 };
  const lautaKuvaX = (bx) => (bx - origo.x) * px;
  const lautaKuvaY = (by) => (by - origo.y) * px;

  ctx.save();
  ctx.translate(-arkkiSiirto.x, -arkkiSiirto.y);
  ctx.save();
  ctx.beginPath();
  ctx.rect(arkkiSiirto.x, yYla, W, yAla - yYla);
  ctx.clip();

  /*
   * SISÄLTÖPASSIT. Nyt vain nostot; reittiverkon siirto tälle tasolle
   * on myöhempi erä ja tulee tähän uutena passina (ks. johdanto).
   */
  if (nostot?.length && piirraNosto) {
    piirraNostotKankaalle(ctx, nostot, piirraNosto, { lautaKuvaX, lautaKuvaY, px });
  }

  ctx.restore();
  ctx.restore();
  return { w: W, h: H };
}


/* ================================================================
 * VIIVATASO — reitit, erikoispiirit ja maiden rajat omalle
 * läpinäkyvälle laattatasolle
 * ================================================================
 *
 * OMISTAJAN PÄÄTÖS 31.8.2026 ilta, jatkoa nostotasolle: reittiverkko
 * siirretään pohjalaatoista omaan LÄPINÄKYVÄÄN laattapyramidiin, ja
 * samalle tasolle tulevat erikoispiirit nimineen sekä uutena
 * sisältönä MAIDEN RAJAT (*"maiden rajat näyttävät puuttuvan"*).
 *
 * SYY ON SAMA KUIN NOSTOTASOLLA JA SE ON UUSINTAPOLTON HINTA. Pohjan
 * ajo lukee korkeusruudukon, Natural Earthin ja piirtää maaston: se on
 * tunteja. Viivataso ei lue mitään näistä — se piirtää murtoviivoja
 * tyhjälle kankaalle — ja on minuutteja. Kun reittiverkko muuttuu tai
 * rajasetti vaihtuu, vain viivataso ajetaan uudestaan ja pohja pysyy
 * ikuisessa välimuistissaan.
 *
 * === YKSI PIIRTO, KAKSI KUTSUJAA ==================================
 *
 * Jokainen passi (`piirraErikoispiiritKankaalle`, `piirraReititKankaalle`,
 * `piirraRajatKankaalle`) on SAMA funktio, jota `piirraMaailma` kutsuu
 * yhden arkin lehteä piirtäessään. Tässä kuoressa on vain sama
 * arkkigeometria ilman aineistoa, paperia ja kehystä.
 *
 * === RAJAT OVAT DATAA, EIVÄT KOODIA ===============================
 *
 * Omistaja 31.8.2026 ilta: rajojen oma taso on tärkeä myös
 * tulevaisuuden takia — *"äärimmäisen hyvä siinä vaiheessa kun
 * mallinnetaan kartalla eri valtioiden kehityksiä vuosien saatossa
 * esim. maailmansotien aikaan"*. Siksi rajapassi ei tunne yhtäkään
 * valtiota eikä vuosilukua: se saa murtoviivaston parametrina
 * (`sisalto.rajat`, laudan yksiköissä) ja piirtää sen. Toisen
 * aikakauden rajasetti on silloin pelkkä datanvaihto ja oma
 * viivatasoversio — ei koodimuutos.
 */

/**
 * Erikoispiirit ja nollameridiaani nimineen.
 *
 * Sama piirto pohjan arkille (piirraMaailma osio 6) ja läpinäkyvälle
 * viivatasolle (piirraViivataso).
 *
 * @param {CanvasRenderingContext2D} ctx arkin koordinaatistossa,
 *   kartta-alan leikkuri päällä
 * @param {{S:number,P:number,GW:number,yYla:number,yAla:number,
 *   kuvaX:Function,kuvaY:Function,lautaLat:Function,bbox:object}} mitta
 */
export function piirraErikoispiiritKankaalle(ctx, mitta) {
  const {
    S, P, GW, yYla, yAla, kuvaX, kuvaY, lautaLat, bbox,
  } = mitta;
  const { teksti, tekstinLeveys } = tekstinLatoja(ctx, S);
  const EKLIPTIIKKA = 23.4365;          // maapallon akselikallistuma
  /*
   * `faasi` on nimen paikka toistovälin sisällä. Se on eri jokaisella
   * viivalla tarkoituksella: samalla faasilla kaikki neljä nimeä
   * asettuisivat samaan pystysarakkeeseen (uloimmalla tasolla, jossa
   * kappaleita on yksi, ne kasautuisivat kaikki arkin keskelle), ja
   * kartta näyttäisi tekstipalstalta. Painetussa atlaksessa jokainen
   * piiri nimetään omassa kohdassaan.
   */
  const PIIRIT = [
    { lat: 0, nimi: 'Päiväntasaaja', vahva: true, faasi: 0.5 },
    { lat: EKLIPTIIKKA, nimi: 'Kravun kääntöpiiri', faasi: 0.26 },
    { lat: -EKLIPTIIKKA, nimi: 'Kauriin kääntöpiiri', faasi: 0.74 },
    { lat: 90 - EKLIPTIIKKA, nimi: 'Pohjoinen napapiiri', faasi: 0.17 },
  ];
  /*
   * NOLLAMERIDIAANI, EI "GREENWICHIN MERIDIAANI". Kaksi syytä, ja
   * molemmat ovat mittoja: nimi kulkee PYSTYVIIVAN vartta, jolloin sen
   * pituus on korkeutta — "Greenwichin meridiaani" on 22 merkkiä eli
   * paperivakiona noin 150 pikseliä pystyyn, ja se leikkaisi
   * kääntöpiirien nimet. "Nollameridiaani" on 15 merkkiä ja yksi sana,
   * ja se on suomalaisen kartaston oma termi juuri tälle viivalle.
   */
  const NOLLAMERIDIAANI = 'Nollameridiaani';
  const PIIRIVIIVA = 'rgba(96,74,46,0.30)';
  const PIIRIVIIVA_VAHVA = 'rgba(96,74,46,0.44)';
  const PIIRINIMI = 'rgba(112,99,76,0.62)';
  const NIMEN_KOKO = 13;
  const NIMEN_VALI = 0.3;
  // Toistoväli laitepikseleinä; ks. TOISTOVÄLI yllä.
  const TOISTOVALI = 2400;
  ctx.save();
  ctx.lineJoin = 'round';

  /* --- viivat ---------------------------------------------------- */
  const latYla = lautaLat(bbox.y);
  const latAla = lautaLat(bbox.y + bbox.h);
  for (const p of PIIRIT) {
    if (p.lat < latAla - 1 || p.lat > latYla + 1) continue;
    ctx.strokeStyle = p.vahva ? PIIRIVIIVA_VAHVA : PIIRIVIIVA;
    ctx.lineWidth = (p.vahva ? 0.9 : 0.8) * P;
    ctx.beginPath();
    const y = kuvaY(p.lat);
    ctx.moveTo(0, y); ctx.lineTo(GW, y);
    ctx.stroke();
  }
  ctx.strokeStyle = PIIRIVIIVA_VAHVA;
  ctx.lineWidth = 0.9 * P;
  ctx.beginPath();
  const xNolla = kuvaX(0);
  ctx.moveTo(xNolla, yYla); ctx.lineTo(xNolla, yAla);
  ctx.stroke();

  /* --- nimet ------------------------------------------------------ */
  const nimenAsetukset = {
    koko: NIMEN_KOKO, mitta: P, tyylitys: 'italic', vari: PIIRINIMI,
    ank: 'center', vali: NIMEN_KOKO * NIMEN_VALI,
  };
  // Nimien paikat lasketaan ARKIN mitoista: sama tulos joka lohkossa.
  const vaakaMaara = Math.max(1, Math.round(GW / TOISTOVALI));
  const pystyMaara = Math.max(1, Math.round((yAla - yYla) / TOISTOVALI));
  for (const p of PIIRIT) {
    if (p.lat < latAla - 1 || p.lat > latYla + 1) continue;
    const y = kuvaY(p.lat) - NIMEN_KOKO * 0.72 * P;
    const lev = tekstinLeveys(p.nimi, nimenAsetukset);
    for (let k = 0; k < vaakaMaara; k += 1) {
      let x = ((k + p.faasi) * GW) / vaakaMaara;
      /*
       * NIMI SIIRRETÄÄN POIS NOLLAMERIDIAANIN ALTA, EI JÄTETÄ POIS.
       * Kaksi tasoa osuu kohdalleen: z0-z2:lla nimiä on yksi ja se
       * osuu arkin keskelle, joka on melkein tasan pituusaste 0
       * (lauta alkaa asteelta −175), ja z7:llä toistoväli on tasan
       * 10 astetta, jolloin joka neljäskymmenes kappale osuu
       * meridiaanille. Poisjättö veisi uloimmilta tasoilta nimen
       * kokonaan, joten kappale siirretään sivuun oman leveytensä
       * verran — se on yhä samalla viivalla ja samalla tasolla.
       */
      const vali2 = lev / 2 + NIMEN_KOKO * 0.8 * P;
      const ero = ((x - xNolla + GW * 1.5) % GW) - GW / 2;
      if (Math.abs(ero) < vali2) x += (ero >= 0 ? 1 : -1) * (vali2 - Math.abs(ero));
      teksti(p.nimi, x, y, nimenAsetukset);
    }
  }
  /*
   * Nollameridiaanin nimi kulkee viivan vartta ylöspäin (kierto −90°)
   * ja istuu viivan oikealla puolella, kuten kaiverretussa atlaksessa.
   */
  for (let k = 0; k < pystyMaara; k += 1) {
    const y = yYla + ((k + 0.5) * (yAla - yYla)) / pystyMaara;
    teksti(NOLLAMERIDIAANI, xNolla + NIMEN_KOKO * 0.72 * P, y, {
      ...nimenAsetukset, kulma: -90,
    });
  }
  ctx.restore();
}

/**
 * REITTITYYLI — mitat reittiyksikköinä (R), yhtenä säädettävänä oliona.
 *
 * OMISTAJAN KUVAKAAPPAUSPALAUTE 31.8.2026 ilta, sanatarkasti:
 * *"reittiviivat ovat liian pieniä ja tiheään tikattuja ja
 * väliaskelmien merkit ovat liian pienellä"*. Kolme lukua nousi noin
 * puolitoistakertaisiksi — EI moninkertaisiksi, koska sama arkki oli
 * hyväksytty vain vuorokautta aiemmin ja kyse on ilmeen tarkennuksesta
 * eikä uudesta ilmeestä:
 *
 *   viiva  1,9 -> 2,8   paksumpi veto
 *   jakso   16 -> 24    harvempi katkorytmi (katkoja on 2/3 entisestä)
 *   helmi  3,2 -> 4,6   isommat askelhelmet
 *   kehä   1,3 -> 1,9   ja niiden kehä samassa suhteessa
 *   lento  1,7 -> 2,5   lentoreitin veto samassa suhteessa
 *
 * === LAUTAPELI, EI TEKNINEN PIIRUSTUS (omistaja 1.9.2026) ==========
 *
 * Sanatarkasti: *"Katkoviivat saisi olla harvempia ja vähän
 * paksumpia, niin että näyttävät enemmän käsin piirretyiltä"* ja
 * *"Maa ja vesireitit saisi olla enemmän söpön lautapelin oloisia
 * kuin teknisiä piirustuksia."* Sama suunta kuin edellisessä erässä,
 * pidemmälle vietynä — ja nyt myös katkon OMA MUOTO, ei vain sen koko:
 *
 *   viiva     2,8 -> 4,0   paksumpi veto (1,43x)
 *   jakso      24 -> 40    harvempi rytmi (1,67x, katkoja on 3/5)
 *   helmi     4,6 -> 5,6   helmi kasvaa veton mukana
 *   kehä      1,9 -> 2,4
 *   sivu     0,40 -> 0,55  katko heittää enemmän sivuun
 *   kaari    0,55 -> 0,95  ja kaartaa selvemmin — tästä syntyy
 *                          käsin piirretty tunnelma lähikuvassa
 *   huojunta 0,35 -> 0,60  solmun heitto (käsivara)
 *   vapina      – -> 0,35  UUSI: hidas huojunta pitkin kaarta
 *
 * PYÖREÄT PÄÄT OVAT JO PAIKALLAAN (`ctx.lineCap = 'round'` alla) ja
 * jäävät: pyöreä pää on juuri se, mikä erottaa piirretyn viivan
 * teknisen piirustuksen tikusta. Paksummalla vedolla se myös näkyy —
 * 1,4 pikselin viivassa pään muotoa ei erottanut.
 *
 * VAPINA ON KÄSIVARA, EI KOHINAA. Solmuheitto (`huojunta`) toimii
 * solmujen välein, ja merireitillä välit ovat satoja yksiköitä pitkiä
 * — pitkä kaari oli siis geometrisen sileä. Vapina lisää saman
 * mittakaavan heiton TIHEÄMMIN (ohjauspiste joka seitsemäs
 * murtoviivan piste) ja pehmennettynä, jolloin viiva elää kuin käsi
 * eikä väristä kuin kohina. Se arvotaan REITIN SIEMENESTÄ ja
 * ohjauspisteen järjestysluvusta — ei pikselistä eikä laatasta —
 * joten laattaraja ei näy (sama sääntö kuin solmuheitolla).
 *
 * KAKSI VANHAA RAJAA PITÄVÄT YHÄ, ja ne on tarkistettu uusilla
 * luvuilla:
 *
 *   HELMI EI MAHDU KATKOON. Helmen halkaisija on 20 R ja katko
 *   0,30 · 150 = 45 R — katko on yhä selvästi pitkänomainen.
 *   HELMINAUHAA EI SYNNY. Lyhin askelväli on 232 R ja helmen
 *   ulkohalkaisija kehineen 26 R, joten väliin jää yli 200 R.
 *   (Luvut on päivitetty 1.9.2026 illan eriin: helmi 15 -> 10 ja
 *   jakso 190 -> 150; molemmat rajat pitävät uusillakin mitoilla.)
 *
 * Luvut ovat R:ssä eli KARTTAVAKIOITA (ks. piirraMaailma osio 8b):
 * ne kutistuvat kartan mukana, joten muutos näkyy joka tasolla samana
 * suhteellisena nousuna eikä vain syvimmällä.
 */
/*
 * === VEDOSITEROINTI OMISTAJAN KANSSA (1.9.2026 iltapäivä) ===========
 *
 * Omistaja katsoi vedokset ennen polttoa ja tarkensi neljästi:
 * *"vieläkin viiva pidempi kuin tyhjä väli"* -> katko-osuus alle
 * puolen; *"saisivat mennä tasaisesti ja viivan paksuus voi olla
 * leveämpi"* -> keskitetty katko + paksumpi tussi; *"saa olla vielä
 * pidemmät välit ja pyöreät pisteet pitää olla isompia"* ja *"tee
 * viivoista ja viivojen väleistä vielä pidempiä"* -> jakso 190 ja
 * katko-osuus 0,30 (väli on yli kaksi kertaa katkon mitta); *"piste
 * vielä isommalla"* -> helmi 12. Pituusheitto poistui kokonaan
 * (lyhin = pisin): tasainen rytmi oli nimenomainen tilaus, ja käsin
 * piirretty jälki tulee tussiprofiilista, sivusta ja kaaresta.
 */
/*
 * === MAA PALAA YHTENÄISEEN VIIVAAN (omistaja 1.9.2026 ilta) =========
 *
 * Sanatarkasti: *"ohjasin sinua myös väärään suuntaan noissa
 * reittiviivojen tekemisessä. vedessä katkoviivat näyttävät hyvältä
 * mutta maalla täytyy ehkä palata yhtenäiseen viivaan joka on hiukan
 * ohuempi ja vielä himmeämpi. samalla pienennä askelpisteitä reitillä
 * (saman paksuinen viiva kuin pienennetty reittiviiva ja vähän
 * pienempi ympyrä)."*
 *
 * TÄMÄ KUMOAA MAAREITTIEN OSALTA aamun linjan *"Kaikki reitit saavat
 * olla piirretty katkoviivalla"* (31.8.2026). Sääntö kaventuu, se ei
 * katoa: **katkoviiva on MEREN ja LENNON merkki, maantie on yhtenäinen
 * veto** — ja silloin muste ei ole enää ainoa, mikä erottaa lajit,
 * vaan viivan laji kertoo kulkutavan jo kaukaa. Helmet jäävät
 * molemmille lajeille (ne kertovat askelmat), lennolla niitä ei ole.
 *
 * MITAT, JA JOKAISELLA OMISTAJAN PERUSTE:
 *
 *   MAAVIIVA 6,0    *"hiukan ohuempi"* — 2/3 meren katkotussista
 *                   (9,0). Yhtenäinen veto peittää matkasta 100 %,
 *                   katkoviiva 30 %: samalla leveydellä maantie
 *                   näyttäisi kolme kertaa raskaammalta kuin
 *                   meriväylä, ja juuri sitä *"vielä himmeämpi"*
 *                   vastustaa. 2/3 leveys ja alempi alfa (alla)
 *                   vievät maantien musteen alle meren keskitason.
 *   HELMI 15 -> 10  *"vähän pienempi ympyrä"*. Molemmilla lajeilla
 *                   sama helmi: askelma on sama pelin asia meressä
 *                   ja maalla. Vanhat kaksi rajaa pitävät yhä:
 *                   helmen halkaisija 20 R mahtuu katkoon (57 R) ja
 *                   helminauhaa ei synny (lyhin askelväli 232 R,
 *                   ulkohalkaisija kehineen 26 R).
 *   KEHÄ 9,0 -> 6,0 *"saman paksuinen viiva kuin pienennetty
 *                   reittiviiva"* — kehä ei siis ole enää sidottu
 *                   meren katkotussiin vaan MAAVIIVAan.
 */
/*
 * === MERI KAPENEE JA TIHENEE (omistaja 1.9.2026 myöhään illalla) ====
 *
 * Sanatarkasti: *"kavenna hieman meren noppareittiviivoja ja tee
 * niistä vähän tiheämmät."*
 *
 * TILAUS KOSKEE VAIN MERTA. Maantie (`maaViiva` 6,0, yhtenäinen veto),
 * askelhelmi (`helmi` 10) ja sen kehä (6,0) EIVÄT muutu — helmet ovat
 * nopan askelmia eivätkä tyyliä, ja maantien omistaja oli hyväksynyt
 * saman illan aikaisemmasta vedoksesta (*"Hyväksy + lämmitä
 * maantietä"*). Muutos on siis kaksi lukua:
 *
 *   viiva  9,0 -> 7,5   *"kavenna hieman"* (−17 %)
 *   jakso  190 -> 150   *"vähän tiheämmät"* (−21 %, katkoja on 1,27x)
 *
 * KATKON OSUUS PYSYY 0,30:SSA, ja se on tarkoituksellista eikä
 * unohdus. Osuus on suhdeluku, joten se pitää sekä katkon MUODON että
 * omistajan aiemman vedosvaatimuksen *"väli on yli kaksi kertaa
 * katkon mitta"* voimassa uudessakin rytmissä:
 *
 *   ennen  0,30 · 190 = 57 R katkoa, 133 R väliä; katko/viiva 6,3
 *   nyt    0,30 · 150 = 45 R katkoa, 105 R väliä; katko/viiva 6,0
 *
 * Katkon ja veton SUHDE siis säilyy melkein sellaisenaan (6,3 -> 6,0),
 * eli katko on yhä selvästi pitkänomainen tussinveto eikä pyöreä
 * piste — juuri se ero, jonka takia osuutta ei nostettu kaventamisen
 * kompensaatioksi. Jos osuus olisi pidetty katkon PITUUDESSA (57 R)
 * eikä suhdeluvussa, väli olisi kutistunut 93 R:ään ja rytmi olisi
 * mennyt "tiheämmän" ohi tikutukseksi.
 *
 * HELMET EIVÄT SIIRRY, VAIKKA JAKSO LYHENEE. Merihelmi ankkuroidaan
 * lähimmän katkojakson keskelle (ks. `arkilla`), joten sen suurin
 * siirtymä raakapaikastaan on puoli jaksoa: 95 R -> 75 R. Tiheämpi
 * rytmi vie helmen siis LÄHEMMÄS omaa askelmaansa, ei kauemmas — ja
 * se on MITATTU koko laudalta (350 merihelmeä): suurin siirtymä oli
 * ennen 95 px ja on nyt 74 px z7:llä, eikä yksikään helmi ylitä
 * palautusrajaa 0,75 · jakso kummallakaan mitalla. Helmi ei siis voi
 * jäädä raakapaikalleen niin, että sen jakso silti jätettäisiin
 * piirtämättä (se oli 1.9.2026 korjattu vika *"osa laivareiteistä
 * jännästi katkeaa välissä"*).
 */
export const REITTITYYLI = Object.freeze({
  viiva: 7.5,    // meren katkotussin leveys (omistaja 1.9.2026: "kavenna hieman"; oli 9,0)
  maaViiva: 6.0, // maantien yhtenäisen veton leveys (omistaja 1.9.2026)
  jakso: 150,    // katko + väli (omistaja 1.9.2026: "vähän tiheämmät"; oli 190)
  helmi: 10,     // askelhelmen säde (omistaja 1.9.2026: "vähän pienempi ympyrä")
  kehä: 6.0,     // askelhelmen kehä = MAAVIIVA (omistaja 1.9.2026)
  lento: 2.5,    // lentoreitin veton leveys (ei enää poltossa, ks. LENNOT)
  /*
   * KATKON OMA MUOTO. Nämä olivat ennen funktion sisäisiä vakioita;
   * tyylissä ne ovat siksi, että vertailuvedos voi renderöidä saman
   * näkymän kahdella ilmeellä ilman koodimuutosta (piirraViivataso
   * `reittityyli`).
   */
  lyhin: 0.30,   // katkon osuus jaksosta, alaraja
  pisin: 0.30,   // katkon osuus jaksosta, yläraja (= alaraja: tasainen rytmi)
  sivu: 0.55,    // koko katko sivussa viivalta (R)
  kaari: 0.95,   // katkon kaarevuus keskellä (R)
  huojunta: 0.6, // solmun heitto (R), molempiin suuntiin
  vapina: 0.35,  // hidas käsivarahuojunta pitkin kaarta (R)
});

/* --- reitit: pelilaudan rata askelmineen ------------------------
 *
 * Omistaja 30.8.2026: *"Kaupunkien välissä pitäisi näkyä
 * nopanheitto askelmat, ei katkoviiva. Lentoreitin punaisella
 * katkoviivalla ja laivareitit sinisellä niin että noppa askelmat
 * näkyy."*
 *
 * Omistaja 31.8.2026 (tämä erä, sanatarkasti): *"Kaikki reitit
 * saavat olla piirretty katkoviivalla. Ja ne voisivat olla
 * himmeämmällä. Ja katkoviivoihin voisi tehdä pientä käsin
 * piirretyn tunnelmaa niin, että ne hieman heittelevät ja
 * kaartelevat."*
 *
 * SÄÄNTÖ, JOKA SYNTYY TÄSTÄ — ja se KUMOAA edellisen erän säännön
 * "katkoviiva on varattu sille reitille, jolla ei ole askelmia":
 * **muste kertoo kulkutavan, HELMET kertovat askelmat, ja
 * katkoviiva on kartan yleinen reittimerkintä.** Kaikki kolme
 * lajia ovat katkoviivaa ja eroavat toisistaan musteeltaan; maa-
 * ja merireitillä on lisäksi helmet, lennolla ei, koska lento
 * siirtää nappulan suoraan perille eikä sillä ole askelmia
 * (js/game.js `actionMannerLento`, ks. sisalto.mjs).
 *
 * TÄMÄ SÄÄNTÖ ON SITTEMMIN KAVENTUNUT MAAN OSALTA (omistaja
 * 1.9.2026 ilta: *"vedessä katkoviivat näyttävät hyvältä mutta
 * maalla täytyy ehkä palata yhtenäiseen viivaan"*). Voimassa oleva
 * muoto on REITTITYYLIn osiossa "MAA PALAA YHTENÄISEEN VIIVAAN":
 * katkoviiva on MEREN ja LENNON merkki, maantie on yhtenäinen
 * ohuempi ja himmeämpi veto. Kaikki muu tässä kappaleessa pätee
 * yhä — myös se, että helmet kertovat askelmat.
 *
 * HELMI ON SILLOIN AINOA ASIA, JOKA EROTTAA LAJIT MUUTEN KUIN
 * VÄRILLÄ. Siksi katkon mitta on valittu niin, ettei helmi voi
 * mennä katkosta: helmen halkaisija on 6,4 paperipikseliä ja
 * lyhinkin katko 8,8 — katko on aina pitkänomainen ja helmi aina
 * pyöreä, ja helmi maalataan viivan PÄÄLLE paperinvärisenä, joten
 * se puhkaisee katkon eikä sekoitu siihen.
 *
 * VÄRIT OVAT AIKAKAUDEN MUSTEITA, EIVÄT NÄYTTÖVÄREJÄ. Merireitti
 * on preussinsinistä (1706, kaivertajan vakiosininen) ja lento
 * poltettua sinooperia — kumpikin murrettuna niin, ettei paperin
 * illuusio rikkoudu. Kirkas RGB-sininen tekisi kartasta
 * tietokonegrafiikkaa yhdellä viivalla.
 *
 * === REITTIEN MUSTE ON KARTTAVAKIO, EI PAPERIVAKIO ==============
 *
 * Sääntö ja omistajan sanamuoto ovat yllä jokien edessä (`R`).
 * Reittien osalta se kumoaa säännön *"askelman ja katkon koko on
 * paperivakio (P) kuten muukin painojälki"*: `R` korvaa `P`:n
 * viivanleveydessä, helmen säteessä ja kehässä, katkon jaksossa,
 * sivuheitossa ja kaarevuudessa sekä käsin piirretyssä heitossa.
 *
 * Syvimmällä tasolla `R = P`, joten z7:n hyväksytty ilme ei muutu
 * pikseliäkään, ja jokainen taso siitä ulospäin saa puolet
 * edellisestä. Ulommilla tasoilla reitit siis häipyvät itsestään
 * — se on päätöksen tarkoitus, ja mitattuna
 * (docs/moduulit/laattapyramidi.md 6k) reitin oma lisäys paperin
 * tummuuteen on z4:llä vielä 0,04 Weberiä, z3:lla 0,014 eli
 * havaitsemiskynnyksen tuntumassa ja z2:sta ulospäin 0,005…0,000
 * eli paperin oman rakeen alla.
 *
 * KYNNYS POISTUI. Omistaja 31.8.2026: *"eikös reitit pidä olla
 * päällä kaikilla zoomitasoilla? ne vain jäävät niin pieniksi että
 * eivät siksi juuri näy"*. Vanha `nakyy(0.22)` päästi reitit
 * sisään z2:lla ja piti ne poissa z0:lta ja z1:ltä; kun muste
 * häipyy itsestään, kynnys ei suojaa miltään vaan tekee
 * ilmestymisestä hyppäyksen siellä, missä pitäisi olla häivytys.
 *
 * ALIPIKSELIN VIIVA EI JÄTÄ USVAA — TÄMÄ ON MITATTU, koska se oli
 * poiston oikea riski: canvas ei piirrä puolikasta pikseliä
 * tyhjäksi vaan sekoittaa sen taustaan. Sama laatta reitteineen ja
 * ilman: koko laatan keskisävy tummenee tiheimmälläkin laatalla
 * z1:llä 0,13 ja z2:lla 0,20 luminanssiyksikköä, kun paperin oma
 * rae on 6…11 yksikköä — eli usva on 1…3 % rakeesta. z0:lla
 * Chromium ei piirrä reiteistä yhtään mitään: laatta on TAVULLEEN
 * sama kuin ilman reittejä, koska Skia lakkaa piirtämästä, kun
 * veto on alle noin 0,01 pikseliä leveä ja katko sitä lyhyempi.
 */

/**
 * Isoisän reittiverkosto askelhelmineen ja lentoreitteineen.
 *
 * Sama piirto pohjan arkille (piirraMaailma osio 8b) ja läpinäkyvälle
 * viivatasolle (piirraViivataso).
 *
 * @param {CanvasRenderingContext2D} ctx arkin koordinaatistossa,
 *   kartta-alan leikkuri päällä
 * @param {{reitit:Array, lentoreitit:Array}} sisalto laudan yksiköissä
 * @param {object} mitta { lautaKuvaX, lautaKuvaY, px, P, R, GX, GY,
 *   W, H, GW, kierros }
 * @param {object} [tyyli] REITTITYYLIn osittainen korvaus
 */
export function piirraReititKankaalle(ctx, sisalto, mitta, tyyli = null) {
  const {
    lautaKuvaX, lautaKuvaY, px, P, R, GX, GY, W, H, GW, kierros,
  } = mitta;
  const TYYLI = tyyli ? { ...REITTITYYLI, ...tyyli } : REITTITYYLI;
  if (sisalto.reitit?.length) {
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    /*
     * LAUDAN KIERTO: reitin murtoviiva on avattu sauman yli
     * (js/rules.js `avaaSauma`), joten sen x voi olla laudan
     * ulkopuolella. Piirretään kolmena kappaleena — laudan verran
     * vasemmalle, paikalleen ja oikealle — jolloin Tokio-San
     * Francisco näkyy sauman molemmin puolin eikä katkea.
     */
    const KIERROS = kierros;
    const siirrot = KIERROS ? [-KIERROS, 0, KIERROS] : [0];
    /*
     * === MUSTEEN PEITTÄVYYS ON MITTA, EI MAKUASIA =================
     *
     * Kaksi omistajan päätöstä peräkkäin, ja ne vetävät eri suuntiin:
     *
     *   31.8. aamu  *"Viivat ovat liian ohuita ja pisteet liian
     *               pieniä."*  → peittävyys 0,52/0,56/0,50 nostettiin
     *               0,80/0,84/0,76:een.
     *   31.8. ilta  *"Ne voisivat olla himmeämmällä."*  → tämä erä
     *               laskee ne 0,64/0,68/0,60:een.
     *
     * TAKAISIN LÄHTÖTILAAN EI PALATA, ja se on mitattu eikä arvattu.
     * Weberin kontrasti (paperi − tummin pikseli) / paperi, Rec. 709
     * -luminanssista, poikkileikkauksena reittijanan yli
     * renderöidyistä laatoista, oli lähtötilassa merireitillä z7:llä
     * **0,064** eli kuusi prosenttia paperin kirkkaudesta — juuri se
     * näkymättömyys, josta valitettiin. Tämän erän jälkeen sama luku
     * on **0,30** (nostetun erän 0,44:stä), eli yhä nelinkertainen
     * lähtötilaan nähden. Kaikki luvut ovat raportissa
     * docs/viesti-fable.md.
     *
     * KATKOVIIVA HIMMENTÄÄ JO ITSESSÄÄN: viivaa on enää noin 56 %
     * matkasta, joten silmän kokema keskimääräinen tummuus laskee
     * vaikkei muste muuttuisi. Siksi alfaa ei tarvinnut laskea
     * lähellekään lähtötilaa saadakseen omistajan pyytämän
     * himmennyksen.
     *
     * SÄVY EI MUUTU, VAIN PEITTÄVYYS. Merireitti pysyy
     * preussinsinisenä (32, 60, 98) ja lento poltettuna sinooperina
     * (150, 54, 40); muuttunut on ALFA, eli kynä painaa keveämmin
     * samalla musteella. Kirkas RGB-sininen tekisi kartasta
     * tietokonegrafiikkaa yhdellä viivalla — se raja ei liiku.
     */
    /*
     * MAAN MUSTE LASKEE VIELÄ (omistaja 1.9.2026 ilta: yhtenäinen
     * maaviiva *"hiukan ohuempi ja vielä himmeämpi"*; ks. REITTITYYLI
     * "MAA PALAA YHTENÄISEEN VIIVAAN"). 0,24 -> 0,17 ja kehä samassa
     * suhteessa 0,32 -> 0,23. Sävy ei muutu, vain kynän paine.
     *
     * MIKSI JUURI TÄHÄN — silmän kokema tummuus on alfan ja PEITON
     * tulo, ja peitto muuttui katkoviivan mukana:
     *
     *   ennen (katko)     0,24 alfaa · 30 % matkasta · leveys 9,0
     *   nyt   (yhtenä)    0,17 alfaa · 100 % matkasta · leveys 6,0
     *
     * (Meren veto kaventui saman illan myöhemmässä erässä 7,5:een —
     * ks. REITTITYYLI "MERI KAPENEE JA TIHENEE" — jolloin maantie on
     * 80 % meren tussista eikä enää 2/3. Musteen määrä ratkaisee, ja
     * se ei muuttunut suunnaltaan: meri peittää matkasta 30 %,
     * maantie 100 %, ja maantien alfa on kolmanneksen matalampi.)
     *
     * Yksittäinen piste viivalla on nyt 29 % vaaleampi (0,17 vs
     * 0,24) — juuri se, mitä *"vielä himmeämpi"* tarkoittaa — ja
     * viivan pinta-ala matkayksikköä kohti kasvaa 2,25 -> 6,0, koska
     * yhtenäisessä viivassa ei ole reikiä. Maantie ei siis katoa
     * vaan muuttuu kevyeksi jatkuvaksi jäljeksi, ja meri jää
     * tummemmaksi katkojaksi — lajit erottuvat kaukaakin.
     */
    const MUSTEET = {
      /*
       * Ohuempi ja himmeämpi yhtenäinen veto (omistaja 1.9.2026 ilta).
       * SÄVY LÄMPENI (omistajan hyväksyntäpäätös 1.9.2026, vedosten
       * jälkeen: "Hyväksy + lämmitä maantietä"): (120,88,54) oli
       * käytännössä sama sävy kuin valtionrajan muste (96,74,46),
       * joten ohut tie ja piste-raja sekosivat toisiinsa. Uusi sävy
       * on terrakotan suuntaan (152,92,44) — selvästi lämpimämpi kuin
       * raja mutta kaukana lennon sinooperista (150,54,40), ettei
       * tietä lueta lennoksi. Alfat ennallaan.
       */
      maa: { viiva: 'rgba(152,92,44,0.17)', kehä: 'rgba(152,92,44,0.23)' },
      meri: { viiva: 'rgba(32,60,98,0.26)', kehä: 'rgba(32,60,98,0.34)' },
    };
    const helmiTaytto = 'rgba(246,239,220,0.92)';
    /*
     * HELMEN SÄDE JA VETON LEVEYS TULEVAT REITTITYYLISTÄ (ks. sen
     * johdanto: omistajan tarkennus 31.8.2026 illalla nosti molempia
     * noin puolitoistakertaisiksi). Yläraja tuli aikanaan tiheimmästä
     * askelvälistä, ja se sääntö kulkee mukana mittakaavassa: kun
     * helmi kutistuu kartan mukana, askelvälin ja helmen suhde on JOKA
     * TASOLLA sama kuin z7:llä. Mitattuna lyhin askelväli on 232 R ja
     * helmen ulkohalkaisija kehineen 26 R (helmi 10 + kehä 6), joten
     * helmien väliin jää joka tasolla yli 200 R — helminauhaa ei voi
     * syntyä (se oli
     * edellisen erän tunnettu rajatapaus z2:lla, ja tämä päätös
     * poistaa sen rakenteellisesti).
     */
    const sade = TYYLI.helmi * R;
    const VIIVA = TYYLI.viiva * R;
    const MAAVIIVA = (TYYLI.maaViiva ?? TYYLI.viiva) * R;

    /*
     * === KÄSIN PIIRRETTY JÄLKI — JA MIKSI SE EI TEE SAUMAA =========
     *
     * Omistaja 31.8.2026: *"Reitit saisi olla käsin piirretyn
     * näköisiä."* ja *"katkoviivoihin voisi tehdä pientä käsin
     * piirretyn tunnelmaa niin, että ne hieman heittelevät ja
     * kaartelevat."* Muoto tulee reitin omasta käyrästä — samasta,
     * jota peli kävelee (js/rules.js `densify`, sentripetaalinen
     * Catmull-Rom) — ja käsin piirretty vaikutelma tehdään KAHDESSA
     * MITTAKAAVASSA:
     *
     *   SOLMUN MITASSA  kynänpaine vaihtelee reitistä toiseen ja
     *                   solmu heittää pikselin murto-osan pois
     *                   paikaltaan (`HEITTO`, alla).
     *   KATKON MITASSA  jokainen katko on eri pituinen, istuu eri
     *                   kohdassa jaksoaan, on hitusen sivussa
     *                   viivalta ja KAARTAA (`KATKO`, alla).
     *
     * HEITTO ARVOTAAN SOLMUILLE, EI PEHMENNYSPISTEILLE. Käyrällä on
     * neljätoista pistettä jokaista väliä kohti; jos jokainen saisi
     * oman heittonsa, jäljestä tulisi rosoista kohinaa eikä kynän
     * vapinaa. Solmujen välillä heitto liukuu pehmeästi
     * (smoothstep), joten viiva heiluu solmun mitassa niin kuin käsi
     * heiluu — ja käyrän oma muoto säilyy.
     *
     * HEITTO EI SAA TULLA PIKSELISTÄ. Sama virhe tehtiin kerran
     * patinan rakeessa: kun kohina luettiin laatan omasta nurkasta,
     * JOKA laatta sai saman kentän ja ruudukko näkyi ruudukkona
     * (generoi-laattapyramidi.mjs, "KOHINA"). Siksi heittoa ei arvota
     * pikselistä eikä laatan nurkasta vaan REITIN TUNNUKSESTA
     * (`r.siemen`, sisalto.mjs) ja solmun järjestysluvusta. Ne ovat
     * samat luvut joka lohkossa, joka laatalla ja joka ajolla, joten
     * viiva jatkuu laattarajan yli pikselilleen samana — eikä
     * `--saumatesti` voi nähdä tästä mitään.
     *
     * PÄÄTESOLMUT EIVÄT HEITÄ: reitin pää on kaupunki, ja kolme
     * reittiä samasta kaupungista kuuluu lähteä samasta pisteestä.
     *
     * Heitto lasketaan kerran reittiä kohti ja jää muistiin
     * `sisalto`-olioon — sama olio piirtää tuhannet laatat.
     */
    const HEITTO = TYYLI.huojunta;   // reittiyksikköä (R), molempiin suuntiin
    const KYNIA = 5;       // kynänpaineen portaat
    /*
     * VAPINA — KÄSIVARA SOLMUJEN VÄLILLÄ (omistaja 1.9.2026: *"vähän
     * paksumpia, niin että näyttävät enemmän käsin piirretyiltä"*).
     *
     * Solmuheitto yksin ei riitä merireitillä: solmuja on kourallinen
     * ja niiden väli satoja yksiköitä, joten pitkä kaari oli
     * geometrisen sileä juuri siellä, missä käden pitäisi näkyä.
     * Vapina on toinen kerros samaa ideaa TIHEÄMMÄLLÄ ohjausvälillä
     * (`VAPINA_VALI` murtoviivan pistettä) ja pienemmällä
     * amplitudilla; smoothstep pehmentää sen, joten se on huojuntaa
     * eikä rosoa.
     *
     * SIEMEN ON REITIN, EI PIKSELIN. Sama sääntö kuin solmuheitolla ja
     * katkokuviolla: luvut tulevat `r.siemen`istä ja ohjauspisteen
     * järjestysluvusta, joten viiva on joka laatalla pikselilleen sama
     * eikä laattarajaan voi syntyä saumaa.
     */
    const VAPINA = TYYLI.vapina ?? 0;
    const VAPINA_VALI = 7;
    const heitot = (r) => {
      if (!r.__heitto) {
        const rnd = mulberry32(r.siemen ?? 1);
        const solmut = r.solmut?.length >= 2 ? r.solmut : [0, r.poly.length - 1];
        const s = solmut.map(() => [0, 0]);
        for (let i = 1; i < s.length - 1; i += 1) {
          s[i] = [(rnd() - 0.5) * 2 * HEITTO, (rnd() - 0.5) * 2 * HEITTO];
        }
        // Kynänpaineen porras samasta virrasta, jotta se on yhtä pysyvä.
        r.__kyna = Math.min(KYNIA - 1, Math.floor(rnd() * KYNIA));
        const h = r.poly.map(() => [0, 0]);
        for (let k = 0; k < solmut.length - 1; k += 1) {
          const a = solmut[k];
          const b = solmut[k + 1];
          for (let i = a; i <= b && i < h.length; i += 1) {
            const t = b > a ? (i - a) / (b - a) : 0;
            const u = t * t * (3 - 2 * t);          // smoothstep
            h[i] = [
              s[k][0] + (s[k + 1][0] - s[k][0]) * u,
              s[k][1] + (s[k + 1][1] - s[k][1]) * u,
            ];
          }
        }
        if (VAPINA > 0 && h.length > 2) {
          const ohjaimia = Math.max(2, Math.ceil((h.length - 1) / VAPINA_VALI) + 1);
          const v = [];
          for (let i = 0; i < ohjaimia; i += 1) {
            // Päät eivät vavise: reitin pää on kaupunki (ks. yllä).
            const reuna = i === 0 || i === ohjaimia - 1;
            v.push(reuna ? [0, 0] : [
              (rnd() - 0.5) * 2 * VAPINA, (rnd() - 0.5) * 2 * VAPINA,
            ]);
          }
          for (let i = 0; i < h.length; i += 1) {
            const p = Math.min(ohjaimia - 2, Math.floor(i / VAPINA_VALI));
            const t = Math.min(1, (i - p * VAPINA_VALI) / VAPINA_VALI);
            const u = t * t * (3 - 2 * t);
            h[i] = [
              h[i][0] + v[p][0] + (v[p + 1][0] - v[p][0]) * u,
              h[i][1] + v[p][1] + (v[p + 1][1] - v[p][1]) * u,
            ];
          }
        }
        r.__heitto = h;
      }
      return r.__heitto;
    };

    /*
     * === KATKON MITAT (reittiyksikköä R) ==========================
     *
     * `jakso` on yhden katkon ja sitä seuraavan välin yhteismitta.
     * 150 yksikköä (REITTITYYLI; omistaja 1.9.2026 illalla *"tee
     * niistä vähän tiheämmät"*, ennen 190) on valittu kahdesta
     * rajasta, ja kumpikin on MITTAKAAVASTA RIIPPUMATON, koska helmi
     * ja katko kutistuvat samaa tahtia:
     *
     *   ALARAJA  helmi on halkaisijaltaan 20 R. Jos katko olisi
     *            samaa kokoluokkaa, katko ja helmi näyttäisivät
     *            käyttökoossa samalta merkiltä. Katko
     *            (0,30 · 150 = 45 R) on selvästi pidempi kuin
     *            helmi on leveä — ja pidempi myös suhteessa
     *            kaventuneeseen vetoon (45 / 7,5 = 6,0).
     *   YLÄRAJA  askelvälille on mahduttava katkorytmiä: mitattuna
     *            lyhin askelväli on 232 R ja mediaani 595 R, eli
     *            jakso 150 antaa mediaanivälille neljä jaksoa ja
     *            lyhimmällekin puolitoista. Lyhimmällä välillä joka
     *            jaksossa on helmi ja rytmi harvenee — omistaja
     *            1.9.2026: *"Ei haittaa, jos pistetiheys muuttuu
     *            suuntaan tai toiseen."*
     *
     * SEURAUS, JOKA KANNATTAA TIETÄÄ: kun jakso skaalautuu kartan
     * mukana, KATKOJEN LUKUMÄÄRÄ reittiä kohti on sama joka
     * tasolla. Kuvio ei siis harvene eikä tihene zoomatessa, se vain
     * pienenee — juuri niin kuin painettu kartta pienenee.
     *
     * Katkon pituus on tasan 30 % jaksosta ja katko istuu jaksonsa
     * keskellä (omistaja 1.9.2026: *"Saisivat mennä tasaisesti"*) —
     * väli on siis aina yli kaksi kertaa katkon mitta. Käsin
     * piirretty vaihtelu tulee katkon MUODOSTA (tussiprofiili,
     * sivu, kaari), ei rytmistä.
     */
    const KATKO = {
      jakso: TYYLI.jakso,  // reittiyksikköä: katko + väli (REITTITYYLI)
      lyhin: TYYLI.lyhin,  // katkon osuus jaksosta, alaraja
      pisin: TYYLI.pisin,  // katkon osuus jaksosta, yläraja
      sivu: TYYLI.sivu,    // reittiyksikköä: koko katko sivussa viivalta
      kaari: TYYLI.kaari,  // reittiyksikköä: katkon kaarevuus keskellä
      paloja: 7,     // janaa per katko (kaaren tarkkuus)
    };
    /**
     * Deterministinen 0…1 reitin siemenestä ja katkon numerosta.
     *
     * EI PIKSELISTÄ EIKÄ LAATASTA. Katkon numero on jakson
     * järjestysluku reitin OMALTA KAARENPITUUDELTA arkin
     * koordinaateissa, eli sama luku joka laatalla — ks. `arkilla`.
     */
    const arpa = (siemen, n, k) => {
      let h = (siemen ^ Math.imul(n + 1, 2246822519) ^ Math.imul(k + 1, 668265263)) >>> 0;
      h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0;
      h = Math.imul(h ^ (h >>> 13), 3266489917) >>> 0;
      return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
    };

    /*
     * === REITTI ARKIN PIKSELEINÄ JA SEN KAARENPITUUS ==============
     *
     * TÄMÄ ON SE KOHTA, JOSSA SAUMA SYNTYISI, JOS SEN TEKISI VÄÄRIN.
     * Jos katkokuvion vaihe laskettaisiin laatan omasta origosta,
     * jokainen laattaraja katkaisisi kuvion ja sauma näkyisi rivinä
     * — sama ansa kuin patinan rakeessa. Vaihe lasketaan siksi
     * REITIN KAARENPITUUDESTA ARKIN KOORDINAATEISSA: `lautaKuvaX`
     * lukee arkin origon, joten pisteet ja niiden väliset etäisyydet
     * ovat samat luvut joka laatalla, ja katkon numero `n` on
     * reitin ominaisuus eikä laatan.
     *
     * Arvot muistiin `sisalto`-olioon TASOKOHTAISESTI (`__avain`):
     * sama olio piirtää tuhannet laatat, mutta tason vaihtuessa
     * `px` muuttuu ja pituudet on laskettava uudestaan.
     *
     * Laudan kierto (`siirrot`) ei kelpaa avaimeksi: siirto on x:ään
     * lisätty VAKIO, joka ei muuta etäisyyksiä eikä sauman
     * tunnistusta, joten sama taulukko kelpaa kaikille kolmelle
     * kappaleelle ja siirto lisätään vasta piirrettäessä.
     */
    const AVAIN = `${px}|${P}|${R}`;
    const arkilla = (r) => {
      if (r.__avain !== AVAIN) {
        const h = heitot(r);
        const n = r.poly.length;
        const xs = new Float64Array(n);
        const ys = new Float64Array(n);
        const s = new Float64Array(n);
        const uusi = new Uint8Array(n);      // 1 = tästä alkaa uusi jakso
        let x0 = Infinity; let x1 = -Infinity;
        let y0 = Infinity; let y1 = -Infinity;
        for (let i = 0; i < n; i += 1) {
          xs[i] = lautaKuvaX(r.poly[i][0]) + h[i][0] * R;
          ys[i] = lautaKuvaY(r.poly[i][1]) + h[i][1] * R;
          if (xs[i] < x0) x0 = xs[i];
          if (xs[i] > x1) x1 = xs[i];
          if (ys[i] < y0) y0 = ys[i];
          if (ys[i] > y1) y1 = ys[i];
          if (i === 0) { uusi[i] = 1; continue; }
          // Sauma katkaisee viivan, eikä hyppy kartu kaarenpituuteen.
          if (Math.abs(xs[i] - xs[i - 1]) > GW / 2) { s[i] = s[i - 1]; uusi[i] = 1; } else {
            s[i] = s[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1]);
          }
        }
        /*
         * HELMI KATKON KESKELLE — JA SE KATKO POIS (omistaja
         * 1.9.2026: *"viiva ei saisi osua pisteen kohdalle. Pisteen
         * voisi itse asiassa aina tähdätä jonkun viivan keskelle ja
         * jättää vain viiva siinä piirtymättä"*). Askelma vedetään
         * lähimmän katkojakson keskipisteeseen ja se jakso jätetään
         * piirtämättä, jolloin pisteen molemmin puolin jää aina
         * täysi väli. Ankkuri lasketaan samasta kaarenpituudesta
         * kuin katkot, joten piste ja aukko ovat samaa mieltä joka
         * laatalla. Sauman yli ei ankkuroida: jos keskipiste osuisi
         * kauas askelmasta, helmi jää paikalleen ja katko piirtyy.
         */
        const helmet = [];
        const ohita = new Set();
        /*
         * MAAREITILLÄ EI ANKKUROIDA (omistaja 1.9.2026 ilta,
         * ks. REITTITYYLI "MAA PALAA YHTENÄISEEN VIIVAAN").
         * Ankkurointi on katkoviivan palvelija: se vetää helmen
         * lähimmän katkon keskelle ja jättää sen katkon
         * piirtämättä, jotta viiva ei kulje pisteen läpi.
         * Yhtenäisellä maaviivalla ei ole katkoa, johon ankkuroida
         * — siirto veisi helmen jopa puoli jaksoa (75 R) väärään
         * kohtaan reittiä, eikä siirrosta olisi mitään hyötyä.
         * Maalla helmi jää siis omalle askelmapaikalleen, ja
         * paperinvärinen täyttö puhkaisee viivan sen kohdalta
         * (piirtojärjestys: viivat ensin, helmet päälle).
         */
        const yhtena = r.laji === 'maa';
        if (r.askelmat?.length && yhtena) {
          for (const [bx, by] of r.askelmat) {
            helmet.push([lautaKuvaX(bx), lautaKuvaY(by)]);
          }
        } else if (r.askelmat?.length) {
          const T = KATKO.jakso * R;
          /*
           * === HELMEN JAKSO SEN OMASTA KAARENPITUUDESTA ===========
           *
           * Tarkastusparvi 1.9.2026 (Kaakkois-Aasia) mittasi, että
           * ankkurin jaksonumero `k` luettiin LÄHIMMÄN KÄRJEN
           * kaarenpituudesta ja että kärki löydettiin ahneella
           * "etene, jos seuraava kärki on lähempänä" -askelluksella.
           * Kumpikin pettää eikä `edge.poly` ole tasavälinen:
           *
           *   HARVA MURTOVIIVA  sumatra|yangon on KAKSI pistettä ja
           *      770 px, joten lähin kärki on aina jompikumpi PÄÄ ja
           *      k romahti nollaan tai viimeiseen.
           *   MUTKA HETI ALUSSA  islanti|edinburgh, lontoo|dublin,
           *      salvador|saoluis: jo poly[1] on helmestä kauempana
           *      kuin poly[0], joten osoitin ei lähtenyt liikkeelle
           *      lainkaan ja k jäi nollaan KAIKILLE helmille.
           *
           * Seuraus oli mitattu ja näkyvä: 170/1094 helmeä koko
           * laudalla ankkuroitui jaksoon, joka on satojen pikselien
           * päässä helmestä. Helmi jäi silloin omalle paikalleen,
           * mutta se väärä jakso jätettiin silti piirtämättä — ja
           * kuvaan jäi katko, jossa ei ole helmeä eikä viivaa.
           * Sumatran solmun vieressä aukko oli 64 px keskellä merta
           * (omistaja 1.9.2026: *"Osa laivareiteistä jännästi
           * katkeaa välissä"*).
           *
           * Nyt helmen kaarenpituus haetaan LÄHIMMÄSTÄ KOHDASTA
           * murtoviivalla, ei lähimmästä kärjestä: janat käydään
           * läpi osoittimesta eteenpäin (helmet kulkevat reitin
           * suuntaan, joten osoitin vain etenee — pisinkin reitti
           * on muutama tuhat janaa ja helmiä kourallinen, ja tämä
           * ajetaan kerran reittiä ja tasoa kohti). Sauman jana
           * ohitetaan: sen yli ei kertynyt kaartakaan.
           */
          let jana = 1;
          for (const [bx, by] of r.askelmat) {
            const ax = lautaKuvaX(bx);
            const ay = lautaKuvaY(by);
            let sh = s[jana - 1];
            let parasJana = jana;
            let parasD = Infinity;
            for (let m = jana; m < n; m += 1) {
              if (uusi[m]) continue;
              const vx = xs[m] - xs[m - 1];
              const vy = ys[m] - ys[m - 1];
              const L2 = vx * vx + vy * vy;
              let tt = L2 ? ((ax - xs[m - 1]) * vx + (ay - ys[m - 1]) * vy) / L2 : 0;
              tt = tt < 0 ? 0 : (tt > 1 ? 1 : tt);
              const d = Math.hypot(ax - (xs[m - 1] + vx * tt), ay - (ys[m - 1] + vy * tt));
              if (d < parasD) {
                parasD = d;
                parasJana = m;
                sh = s[m - 1] + tt * (s[m] - s[m - 1]);
              }
            }
            jana = parasJana;
            const k = Math.max(0, Math.round(sh / T - 0.5));
            if (ohita.has(k)) { helmet.push([ax, ay]); continue; }
            const tavoite = Math.min((k + 0.5) * T, s[n - 1]);
            let p = parasJana;
            while (p > 0 && s[p] > tavoite) p -= 1;
            while (p + 1 < n && s[p + 1] < tavoite) p += 1;
            const b = Math.min(p + 1, n - 1);
            const pit = s[b] - s[p];
            const t = pit > 0 ? (tavoite - s[p]) / pit : 0;
            const hx = xs[p] + (xs[b] - xs[p]) * t;
            const hy = ys[p] + (ys[b] - ys[p]) * t;
            // Sauman yli ei ankkuroida — mutta katko jää silti pois,
            // ettei viiva voi osua helmeen (omistaja: "varmista että
            // viiva ei osu sen kanssa samaan kohtaan").
            ohita.add(k);
            if (Math.hypot(hx - ax, hy - ay) > 0.75 * T) { helmet.push([ax, ay]); continue; }
            helmet.push([hx, hy]);
          }
        }
        r.__arkilla = {
          xs, ys, s, uusi, x0, x1, y0, y1, helmet, ohita,
        };
        r.__avain = AVAIN;
      }
      return r.__arkilla;
    };

    /*
     * Näkyvä ala arkin koordinaateissa. Katkoja ei lasketa polkuun
     * sen ulkopuolelta: canvas leikkaisi ne kuitenkin, mutta
     * karsinta säästää valtaosan työstä joka laatalla.
     */
    const MARGINAALI = 8 * P + VIIVA;
    const NX0 = GX - MARGINAALI;
    const NX1 = GX + W + MARGINAALI;
    const NY0 = GY - MARGINAALI;
    const NY1 = GY + H + MARGINAALI;

    /**
     * MAANTIEN YHTENÄINEN VETO polkuun (omistaja 1.9.2026 ilta,
     * ks. REITTITYYLI "MAA PALAA YHTENÄISEEN VIIVAAN").
     *
     * Sama käyrä, samat käsin piirretyt kerrokset kuin katkoviivalla
     * — solmuheitto ja vapina ovat jo `arkilla`n `xs`/`ys`:ssä, joten
     * maantie huojuu kuin käsi eikä ole viivoittimen jälki. Erona on
     * vain se, että jälki ei katkea: katkon oma muoto (tussiprofiili,
     * sivu, kaari) on katkoviivan asia eikä yhtenäisellä vedolla ole
     * sille paikkaa.
     *
     * KAKSI ASIAA, JOTKA EIVÄT SAA MUUTTUA katkoviivaan nähden:
     *
     *   PIIRTOVÄLIT  `r.piirtoValit` rajaa tämänkin veton (sama
     *                lista ohjaa peitettä, ks. `katkoPolku`), joten
     *                rinnakkaiskarsinta toimii maalla kuten merellä.
     *   SAUMA        `uusi[i]` katkaisee viivan siellä, missä
     *                murtoviiva hyppää laudan sauman yli — muuten
     *                yhtenäinen veto piirtäisi koko arkin levyisen
     *                vaakaviivan (katkoviivalla saman teki se, ettei
     *                kaarenpituus kertynyt hypyn yli).
     *
     * Piirretään `stroke`lla eikä `fill`illä: leveys tulee kynästä
     * (`ctx.lineWidth`) ja pyöreät päät `lineCap`ista, jotka ovat jo
     * paikallaan tämän funktion kutsujassa.
     */
    const yhtenaPolku = (g, r, dx) => {
      const a = arkilla(r);
      if (a.x1 + dx < NX0 || a.x0 + dx > NX1 || a.y1 < NY0 || a.y0 > NY1) return;
      const { xs, ys, uusi } = a;
      const n = xs.length;
      const valit = r.piirtoValit ?? [[0, n - 1]];
      for (const [v0, v1] of valit) {
        let auki = false;
        for (let i = v0; i <= v1; i += 1) {
          if (!auki || uusi[i]) { g.moveTo(xs[i] + dx, ys[i]); auki = true; continue; }
          g.lineTo(xs[i] + dx, ys[i]);
        }
      }
      /*
       * Liittymäsillat samalla yhtenäisellä vedolla: silta on osa
       * samaa viivaa (reittikarsinta.mjs LIITTYMÄSILLAT), joten
       * maalla se on suora yhtenäinen veto eikä katko.
       */
      for (const [bax, bay, bbx, bby] of r.liittymat ?? []) {
        const x0 = lautaKuvaX(bax);
        const y0 = lautaKuvaY(bay);
        const x1 = lautaKuvaX(bbx);
        const y1 = lautaKuvaY(bby);
        if (Math.max(x0, x1) + dx < NX0 || Math.min(x0, x1) + dx > NX1
          || Math.max(y0, y1) < NY0 || Math.min(y0, y1) > NY1) continue;
        g.moveTo(x0 + dx, y0);
        g.lineTo(x1 + dx, y1);
      }
    };

    /**
     * Yksi katkoviiva polkuun: reitti `r` siirrettynä `dx` pikseliä.
     *
     * Katkot ovat JAKSOITTAIN: jakso `n` on kaarenpituuden väli
     * [n·T, (n+1)·T), ja siinä on tasan yksi katko, jonka pituus ja
     * paikka arvotaan reitin tunnuksesta ja n:stä. Näin katkon
     * numeron saa suoraan kaarenpituudesta (`Math.floor(s / T)`)
     * eikä sitä tarvitse kerätä reitin alusta asti — ja juuri se
     * tekee kuviosta laatasta riippumattoman.
     *
     * PIIRTOVÄLIT (`r.piirtoValit`) rajaavat sen, mikä osa reitistä
     * ylipäätään piirtyy: rinnakkaiskarsinta jättää pois sen osuuden,
     * jonka toinen reitti jo piirtää (tools/fokuskartta/
     * reittikarsinta.mjs). Välit ovat murtoviivan indeksejä, ne
     * lasketaan reitin omasta geometriasta eikä laatasta, ja
     * SAMA lista ohjaa peitettä — työlista ja piirto ovat siis
     * samaa mieltä. Ilman kenttää piirtyy koko reitti.
     */
    const katkoPolku = (g, r, dx, w) => {
      const a = arkilla(r);
      if (a.x1 + dx < NX0 || a.x0 + dx > NX1 || a.y1 < NY0 || a.y0 > NY1) return;
      const {
        xs, ys, s, uusi,
      } = a;
      const n = xs.length;
      const T = KATKO.jakso * R;
      const valit = r.piirtoValit ?? [[0, n - 1]];
      for (const [v0, v1] of valit) {
        let i0 = v0;
        for (let raja = v0 + 1; raja <= v1 + 1; raja += 1) {
          if (raja <= v1 && !uusi[raja]) continue;
          jaksonKatkot(g, xs, ys, s, i0, raja - 1, r.siemen ?? 1, dx, T, w, a.ohita);
          i0 = raja;
        }
      }
    };

    /*
     * LIITTYMÄSILLAT (omistaja 1.9.2026 ilta, sanatarkasti: *"aina
     * kun kaksi laivareittiä kulkee lähellä toisiaan niin ne pitää
     * yhdistää siltä osin yhdeksi reitiksi. ne voivat sitten taas
     * erkaantua tarvittaessa myöhemmin reitillä"*). Kun
     * rinnakkaiskarsinta jättää reitin jakson piirtämättä
     * (osuusyhdistäminen, tools/fokuskartta/reittikarsinta.mjs), sen
     * piirtyvä pää liitetään peittävään viivaan lyhyellä sillalla —
     * muuten pää roikkuisi kymmenien yksiköiden päässä viivasta,
     * josta se kuvassa "jatkuu", ja juuri roikkuvista päistä
     * omistaja huomautti ("yhteneviä linjoja, jotka pitää yhdistää").
     *
     * Silta on 1–2 katkon mittainen ja kulkee SAMAN katkokoneiston
     * (jaksonKatkot) läpi: tussiprofiili, sivuheitto ja kaari ovat
     * reitin omat. Jakso mitoitetaan sillan omasta pituudesta
     * (T' = L/k), jotta lyhyeenkin siltaan piirtyy aina katko —
     * arkin kaarenpituusvaihe ei kelpaa, koska silta ei ole reitin
     * kaarella. Determinismi: siemen tulee reitistä ja sillan
     * järjestysluvusta, pituudet laudan geometriasta — ei laatasta,
     * joten silta on sama joka laatalla ja joka ajolla.
     */
    const liittymaPolku = (g, r, dx, w) => {
      if (!r.liittymat?.length) return;
      const T = KATKO.jakso * R;
      let m = 0;
      for (const [ax, ay, bx, by] of r.liittymat) {
        m += 1;
        const x0 = lautaKuvaX(ax);
        const y0 = lautaKuvaY(ay);
        const x1 = lautaKuvaX(bx);
        const y1 = lautaKuvaY(by);
        const L = Math.hypot(x1 - x0, y1 - y0);
        if (L < 1) continue;
        if (Math.max(x0, x1) + dx < NX0 || Math.min(x0, x1) + dx > NX1
          || Math.max(y0, y1) < NY0 || Math.min(y0, y1) > NY1) continue;
        const k = Math.max(1, Math.round(L / T));
        jaksonKatkot(g, [x0, x1], [y0, y1], [0, L], 0, 1,
          ((r.siemen ?? 1) ^ Math.imul(m, 2654435761)) >>> 0, dx, L / k, w, null);
      }
    };

    /** Yhden yhtenäisen osuuden (i0…i1) katkot polkuun `g`. */
    const M = KATKO.paloja;
    const px0 = new Float64Array(M + 1);
    const py0 = new Float64Array(M + 1);
    const jaksonKatkot = (g, xs, ys, s, i0, i1, siemen, dx, T, w, ohita) => {
      if (i1 <= i0) return;
      const sA = s[i0];
      const sB = s[i1];
      if (sB - sA < 1) return;
      let kohta = i0;
      /** Piste kaarenpituudella `sPos`; osoitin kulkee vain eteenpäin. */
      const piste = (sPos, ulos, k) => {
        while (kohta < i1 && s[kohta + 1] < sPos) kohta += 1;
        const b = Math.min(kohta + 1, i1);
        const pituus = s[b] - s[kohta];
        const t = pituus > 0 ? Math.min(1, Math.max(0, (sPos - s[kohta]) / pituus)) : 0;
        ulos[0][k] = xs[kohta] + (xs[b] - xs[kohta]) * t;
        ulos[1][k] = ys[kohta] + (ys[b] - ys[kohta]) * t;
      };
      const ulos = [px0, py0];
      for (let k = Math.floor(sA / T); k <= Math.floor(sB / T); k += 1) {
        // Jakso on askelhelmen paikka: viiva ei saa osua pisteeseen.
        if (ohita && ohita.has(k)) continue;
        const osuus = KATKO.lyhin + (KATKO.pisin - KATKO.lyhin) * arpa(siemen, k, 0);
        const pituus = T * osuus;
        /*
         * Katko istuu jaksonsa KESKELLÄ (omistaja 1.9.2026: "Saisivat
         * mennä tasaisesti") — arvottu kohta jaksossa antoi vierekkäin
         * lähes kiinni olevia ja lähes puolentoista jakson välejä.
         * Käsivaratuntu tulee sivusta, kaaresta ja vapinasta, ei
         * rytmistä.
         */
        const alku = k * T + (T - pituus) / 2;
        const a = Math.max(sA, alku);
        const b = Math.min(sB, alku + pituus);
        if (b - a < 0.4 * R) continue;
        for (let m = 0; m <= M; m += 1) piste(a + ((b - a) * m) / M, ulos, m);
        // Katko sivuun ja kaarelle: normaali katkon omasta jänteestä.
        const ux = px0[M] - px0[0];
        const uy = py0[M] - py0[0];
        const L = Math.hypot(ux, uy) || 1;
        const nx = -uy / L;
        const ny = ux / L;
        const sivu = (arpa(siemen, k, 2) - 0.5) * 2 * KATKO.sivu * R;
        const kaari = (arpa(siemen, k, 3) - 0.5) * 2 * KATKO.kaari * R;
        /*
         * TUSSIN JÄLKI (omistaja 1.9.2026: "jos viivat olisi piirretty
         * leveäkärkisellä tussilla, josta alku ja loppu ovat hieman
         * erimuotoisia"): katko on TÄYTETTY muoto, ei veto. Kolme
         * päätyvarianttia siemenestä — tasainen, loppuun kapeneva ja
         * alusta kapeneva — sekä aavistus leveysheittoa. Rytmi pysyy
         * tasaisena: pituus ja paikka eivät arvo, vain muoto.
         */
        const variantti = Math.floor(arpa(siemen, k, 4) * 3);
        const leveysHeitto = 0.92 + 0.16 * arpa(siemen, k, 5);
        const puoli = (w / 2) * leveysHeitto;
        const profiili = (t) => {
          if (variantti === 1) return t > 0.72 ? 1 - ((t - 0.72) / 0.28) * 0.55 : 1;
          if (variantti === 2) return t < 0.28 ? 0.45 + (t / 0.28) * 0.55 : 1;
          return 0.9 + 0.1 * Math.sin(Math.PI * t);
        };
        for (let m = 0; m <= M; m += 1) {
          const o = sivu + kaari * Math.sin((Math.PI * m) / M);
          px0[m] += nx * o + dx;
          py0[m] += ny * o;
        }
        for (let m = 0; m <= M; m += 1) {
          const h = puoli * profiili(m / M);
          const x = px0[m] + nx * h;
          const y = py0[m] + ny * h;
          if (m === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        for (let m = M; m >= 0; m -= 1) {
          const h = puoli * profiili(m / M);
          g.lineTo(px0[m] - nx * h, py0[m] - ny * h);
        }
        g.closePath();
      }
    };

    for (const laji of ['meri', 'maa']) {
      const osa = sisalto.reitit.filter((r) => r.laji === laji);
      if (!osa.length) continue;
      const muste = MUSTEET[laji];
      ctx.strokeStyle = muste.viiva;
      ctx.fillStyle = muste.viiva;
      /*
       * YKSI POLKU KYNÄNPAINEEN PORRASTA KOHTI. Jokainen reitti saa
       * oman leveytensä, mutta piirtoja on viisi eikä 408: sama
       * `lineWidth` kelpaa kaikille saman portaan reiteille.
       */
      for (let k = 0; k < KYNIA; k += 1) {
        const kynalla = osa.filter((r) => { heitot(r); return r.__kyna === k; });
        if (!kynalla.length) continue;
        if (laji === 'maa') {
          /*
           * MAANTIE ON YHTENÄINEN VETO (omistaja 1.9.2026 ilta;
           * ks. REITTITYYLI "MAA PALAA YHTENÄISEEN VIIVAAN").
           * Kynänpaineen porras säilyy — se on käsin piirretyn
           * jäljen toinen kerros — mutta se annetaan `lineWidth`inä
           * eikä katkon täyttöleveytenä.
           */
          ctx.lineWidth = MAAVIIVA * (0.88 + 0.06 * k);
          for (const d of siirrot) {
            ctx.beginPath();
            for (const r of kynalla) yhtenaPolku(ctx, r, d * px);
            ctx.stroke();
          }
          continue;
        }
        const leveys = VIIVA * (0.88 + 0.06 * k);
        for (const d of siirrot) {
          ctx.beginPath();
          for (const r of kynalla) {
            katkoPolku(ctx, r, d * px, leveys);
            // Liittymäsillat samalla kynällä ja musteella kuin reitti.
            liittymaPolku(ctx, r, d * px, leveys);
          }
          ctx.fill();
        }
      }
      /*
       * Helmet yhtenä polkuna: 1 118 erillistä fill+stroke-paria
       * lohkoa kohti olisi turhaa työtä, kun sama polku kelpaa
       * kaikille. Ruudun ulkopuoliset karsitaan ennen polkua.
       *
       * HELMET PIIRRETÄÄN VIIVAN PÄÄLLE JA VIIMEISENÄ, ja se on nyt
       * kahdesta syystä pakko: merellä paperinvärinen täyttö
       * puhkaisee katkon, jolloin helmi ei voi näyttää katkolta
       * eikä katko helmeltä, ja maalla sama täyttö puhkaisee
       * YHTENÄISEN viivan (omistaja 1.9.2026 ilta: *"viiva ei saisi
       * osua pisteen kohdalle"*) — maareitillä ei ole katkoa, johon
       * helmi ankkuroitaisiin, joten aukko syntyy vain tästä
       * järjestyksestä.
       */
      ctx.beginPath();
      for (const r of osa) {
        // Ankkuroidut paikat: helmi istuu ohitetun katkon keskellä.
        for (const [hx, hy] of arkilla(r).helmet) {
          for (const d of siirrot) {
            const x = hx + d * px;
            if (x < GX - sade * 2 || x > GX + W + sade * 2) continue;
            if (hy < GY - sade * 2 || hy > GY + H + sade * 2) continue;
            ctx.moveTo(x + sade, hy);
            ctx.arc(x, hy, sade, 0, Math.PI * 2);
          }
        }
      }
      ctx.fillStyle = helmiTaytto;
      ctx.fill();
      ctx.strokeStyle = muste.kehä;
      ctx.lineWidth = TYYLI.kehä * R;
      ctx.stroke();
    }
    /*
     * Lentoreitit poltettuna sinooperina: aikakauden kartassa ne ovat
     * höyrylaivalinjan tapainen merkintä eikä maantie, ja niitä on
     * vähemmän. Ne ovat SAMAA katkoviivaa kuin muutkin (omistaja
     * 31.8.2026) ja kulkevat saman `katkoPolku`n läpi — lento on
     * kahden solmun ilmaviiva, joten solmuheittoa ei ole mihin
     * panna, mutta katkon oma heitto ja kaari ovat sillä samat kuin
     * muilla. Helmiä ei ole, koska askelmia ei ole.
     */
    if (sisalto.lentoreitit?.length) {
      ctx.strokeStyle = 'rgba(150,54,40,0.60)';
      ctx.fillStyle = 'rgba(150,54,40,0.60)';
      for (let k = 0; k < KYNIA; k += 1) {
        const kynalla = sisalto.lentoreitit
          .filter((r) => Math.floor(mulberry32(r.siemen ?? 1)() * KYNIA) === k);
        if (!kynalla.length) continue;
        const lentoleveys = TYYLI.lento * R * (0.9 + 0.05 * k);
        for (const d of siirrot) {
          ctx.beginPath();
          for (const r of kynalla) katkoPolku(ctx, r, d * px, lentoleveys);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }
}

/**
 * RAJATYYLI — rajaviivaston mitat reittiyksikköinä (R).
 *
 * Muste on kartan omaa harmaanruskeaa, ja raja on JOKA MITALLAAN
 * reittiä vaatimattomampi: ohuempi veto (1,8 R vs. 2,8 R), himmeämpi
 * alfa (0,52 vs. 0,64) ja PISTEKUVIO katkoviivan sijaan. Silmä lukee
 * pisterivin hallinnolliseksi merkinnäksi ja katkoviivan reitiksi,
 * joten kaksi merkintää samalla kartalla eivät voi sekaantua
 * toisiinsa — juuri se oli reittien ja jokien kohdalla se riski, joka
 * jouduttiin mittaamaan (osio 8b).
 *
 * KARTTAVAKIO (R) KUTEN REITIT JA JOET: raja on kartan merkintä eikä
 * painokoneen ominaisuus, joten se kutistuu kartan mukana ja häipyy
 * itsestään uloimmilla tasoilla.
 *
 * LUVUT ON VALITTU KATSOMALLA, EI ARVAAMALLA, JA RATKAISEVA NÄKYMÄ
 * ON z6 EIKÄ z7. Omistajan ehto on kaksiosainen: rajojen on näyttävä
 * MAANÄKYMÄSSÄ mutta ei huudettava. Maanäkymä (mittajana 200 km,
 * Kreikka ruudulla) on pyramidin taso z6, jossa R on puolet
 * syvimmän tason arvosta — siellä siis mitoitus ratkeaa, ja z7 on
 * vain tarkistus siitä, ettei raja ala kilpailla reitin kanssa.
 *
 * Kolme mittaa renderöitiin samasta Balkanin ruudusta z6:lla ja
 * z7:llä ja katsottiin 1:1 sekä kolminkertaisena suurennoksena:
 *
 *   1,3 R / 0,48  z7:llä siisti pisterivi, z6:lla katosi maastoon
 *                 (0,65 px veto) — maanäkymän ehto ei täyty.
 *   1,8 R / 0,52  z6:lla luettava pisterivi, z7:llä yhä selvästi
 *                 ohuempi ja himmeämpi kuin reitti.  VALITTU.
 *   2,2 R / 0,56  alkoi z7:llä lähestyä reitin painoa.
 */
export const RAJATYYLI = Object.freeze({
  viiva: 1.8,                    // veton leveys reittiyksikköinä (R)
  muste: 'rgba(96,74,46,0.52)',  // kartan oma harmaanruskea
  piste: 1.5,                    // pisteen pituus R:ssä
  vali: 3.0,                     // pisteiden väli R:ssä
});

/**
 * RAJAVIIVASTO — hento piste-viiva maiden välillä.
 *
 * OMISTAJA 31.8.2026 ilta: *"maiden rajat näyttävät puuttuvan"*.
 * Kartta on TYYLILTÄÄN aikakauden mutta SISÄLLÖLTÄÄN nykyaikainen
 * (kaanon), joten oletussetti on nykyrajat.
 *
 * === TÄMÄ PASSI EI TUNNE YHTÄKÄÄN VALTIOTA =========================
 *
 * Syöte on pelkkä murtoviivasto laudan yksiköissä. Passi ei lue
 * maatunnuksia, ei vuosilukuja eikä valitse settiä — kaikki se on
 * datassa (tools/fokuskartta/rajat.mjs, generaattorin `--rajasetti`).
 * Omistajan peruste on tulevaisuus: *"äärimmäisen hyvä siinä
 * vaiheessa kun mallinnetaan kartalla eri valtioiden kehityksiä
 * vuosien saatossa esim. maailmansotien aikaan"*. Toisen aikakauden
 * rajat ovat silloin uusi tiedosto ja oma viivatasoversio, eivät uusi
 * haara tässä.
 *
 * === MERIRAJOJA EI PIIRRETÄ ========================================
 *
 * Lähde on Natural Earthin `admin_0_boundary_lines_land`: vain maalla
 * kulkevat rajat. Merirajat ja talousvyöhykkeet olisivat kartalla
 * ruudukkoa eivätkä maantiedettä — sama peruste, jolla tasavälinen
 * asteverkko poistettiin (osio 6).
 *
 * @param {CanvasRenderingContext2D} ctx arkin koordinaatistossa,
 *   kartta-alan leikkuri päällä
 * @param {Array<Array<[number,number]>>} rajat laudan yksiköissä
 * @param {{lautaKuvaX:Function, lautaKuvaY:Function, R:number,
 *   GW:number}} mitta
 * @param {object} [tyyli] RAJATYYLIn osittainen korvaus
 */
export function piirraRajatKankaalle(ctx, rajat, mitta, tyyli = null) {
  if (!rajat?.length) return;
  const {
    lautaKuvaX, lautaKuvaY, R, GW,
  } = mitta;
  const TYYLI = tyyli ? { ...RAJATYYLI, ...tyyli } : RAJATYYLI;
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = TYYLI.muste;
  ctx.lineWidth = TYYLI.viiva * R;
  /*
   * PISTEKUVION VAIHE ON ARKIN, EI LAATAN.
   *
   * `setLineDash` laskee vaiheen polun alusta, ja polku alkaa
   * murtoviivan ensimmäisestä pisteestä ARKIN koordinaateissa — sama
   * piste joka laatalla, koska `lautaKuvaX` lukee arkin origon.
   * `lineDashOffset` jää siis nollaan eikä sitä saa laskea laatan
   * omasta nurkasta: juuri se tekisi sauman jokaiselle laattarajalle
   * (sama ansa kuin patinan rakeessa).
   */
  ctx.setLineDash([TYYLI.piste * R, TYYLI.vali * R]);
  ctx.lineDashOffset = 0;
  ctx.beginPath();
  for (const viiva of rajat) {
    let edellinen = null;
    let aloitettu = false;
    for (let i = 0; i < viiva.length; i += 1) {
      const x = lautaKuvaX(viiva[i][0]);
      const y = lautaKuvaY(viiva[i][1]);
      /*
       * Sauma katkaisee viivan (sama sääntö kuin rannikolla, joilla ja
       * reiteillä): laudan projektio kiertää x:n välille [0, leveys),
       * joten päivämääränrajan yli kulkeva raja hyppäisi laidasta
       * toiseen ja piirtäisi vaakaviivan yli koko kartan.
       */
      if (edellinen !== null && Math.abs(x - edellinen) > GW / 2) aloitettu = false;
      if (!aloitettu) { ctx.moveTo(x, y); aloitettu = true; } else ctx.lineTo(x, y);
      edellinen = x;
    }
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

/**
 * Läpinäkyvä viivatason lohko — sama arkkigeometria kuin
 * piirraMaailmassa, mutta ei aineistoa, ei paperia, ei kehystä:
 * kankaalle jää vain viivojen muste, kaikki muu on läpinäkyvää.
 *
 * Asetukset ovat sama osajoukko kuin piirraMaailmalla: bbox,
 * projektio, leveys, tyyli (kehys — leikkuria varten), koko, siirto,
 * arkki, paperiS ja sisältö (`reitit`, `lentoreitit`, `rajat`).
 * `koko`/`siirto`/`arkki` toimivat täsmälleen kuten pohjapiirrossa
 * (ks. piirraMaailman johdanto): kaikki lasketaan arkin
 * koordinaateissa ja canvas siirretään kokonaisluvulla, joten
 * lohkosta leikattu laatta on tavulleen sama kuin erikseen piirretty.
 *
 * `passit` rajaa piirrettävät osiot (oletus kaikki). Sitä käyttää
 * generaattori uloimmalla tasolla: z0:lla reittipassi on MITATTU
 * tyhjäksi — veto on siellä alle 0,01 pikseliä leveä, eikä Skia
 * piirrä siitä mitään — joten se ohitetaan eikä sen laattoja lasketa
 * peitteeseen.
 */
export function piirraViivataso(canvas, asetukset) {
  const {
    bbox, projektio, leveys, tyyli = {}, koko = null, siirto = null,
    sisalto = null, paperiS = null,
    passit = null,
    /*
     * Tyylien osittainen korvaus. Oletuksena null eli REITTITYYLI ja
     * RAJATYYLI sellaisinaan; vertailukuvat ja tyylikokeet antavat
     * tästä vanhan tai kokeiltavan arvon, jolloin sama näkymä voidaan
     * renderöidä kahdella ilmeellä ilman koodimuutosta.
     */
    reittityyli = null, rajatyyli = null,
  } = asetukset;
  const P_ = passit ?? {};
  const px = leveys / bbox.w;
  const W = Math.round(leveys);
  const H = Math.round(bbox.h * px);
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const GX = siirto?.x ?? 0;
  const GY = siirto?.y ?? 0;
  const GW = koko?.w ?? W;
  const GH = koko?.h ?? H;
  const S = GW / 6400;
  const P = paperiS ?? S;

  /*
   * KARTTA-ALAN LEIKKURI — sama laatikko kuin pohjapiirron osioilla
   * 4–8: viiva ei saa vuotaa atlaskehyksen kermaiseen marginaaliin,
   * joka on pohjalaatoissa viivatason alla.
   */
  const kehys = tyyli.kehys ?? null;
  const yYla = kehys ? Math.round(kehys.yla * S) : 0;
  const yAla = kehys ? GH - Math.round(kehys.ala * S) : GH;

  const { lautaX, lautaY, lautaLat } = laudanProjektio(projektio);
  const origo = asetukset.arkki ?? { x: bbox.x, y: bbox.y };
  const arkkiSiirto = asetukset.arkki ? { x: GX, y: GY } : { x: 0, y: 0 };
  const kuvaX = (lon) => (lautaX(lon) - origo.x) * px;
  const kuvaY = (lat) => (lautaY(lat) - origo.y) * px;
  const lautaKuvaX = (bx) => (bx - origo.x) * px;
  const lautaKuvaY = (by) => (by - origo.y) * px;

  /*
   * R = VIIVOJEN MUSTE ON KARTTAVAKIO. Sama kaava kuin piirraMaailman
   * osiossa 8b, ja sen ON PAKKO olla sama luku: viivataso ja pohja
   * piirretään samaan ruudukkoon, ja jos mittakaava eroaisi, viivan
   * leveys hyppäisi tasolta toiselle.
   */
  const SYVIN_TIHEYS = 7.2;
  const R = paperiS != null ? (px / SYVIN_TIHEYS) * paperiS : P;

  ctx.save();
  ctx.translate(-arkkiSiirto.x, -arkkiSiirto.y);
  ctx.save();
  ctx.beginPath();
  ctx.rect(arkkiSiirto.x, yYla, W, yAla - yYla);
  ctx.clip();

  /* --- SISÄLTÖPASSIT, JÄRJESTYS ON PIIRTOJÄRJESTYS -----------------
   *
   * Rajat ensin ja alimmaksi: ne ovat hallinnollinen pohjamerkintä, ja
   * reitin kuuluu kulkea niiden yli eikä alta. Piirit sen jälkeen (ne
   * ovat kartan omaa geometriaa) ja reitit päällimmäisenä — rata on
   * tärkein merkintä, ja se on sama järjestys kuin pohjassa oli.
   */
  if (P_.rajat !== false) {
    piirraRajatKankaalle(ctx, sisalto?.rajat, {
      lautaKuvaX, lautaKuvaY, R, GW,
    }, rajatyyli);
  }
  if (P_.piirit !== false) {
    piirraErikoispiiritKankaalle(ctx, {
      S, P, GW, yYla, yAla, kuvaX, kuvaY, lautaLat, bbox,
    });
  }
  if (P_.reitit !== false && sisalto) {
    piirraReititKankaalle(ctx, sisalto, {
      lautaKuvaX, lautaKuvaY, px, P, R, GX, GY, W, H, GW,
      kierros: projektio.leveys ?? 0,
    }, reittityyli);
  }

  ctx.restore();
  ctx.restore();
  return { w: W, h: H };
}
