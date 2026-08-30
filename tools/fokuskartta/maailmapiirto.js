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
 *          kompassiruusu, mittakaavajana, painajanrivi).
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
 * mittakaavajana ja painajanrivi alamarginaalissa sekä kompassiruusu
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
  fbm, laudanProjektio, lerpSyvyys, lerpVari,
} from './piirto.js';

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
 * 3. KEHYS JA KALUSTEET. Marginaali, kartussi, mittajana ja
 *    painajanrivi ovat arkin reunassa ja keskellä. Ne piirretään arkin
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
    koko = null, siirto = null, sisalto = null, ladonta = null,
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

  /** Bilineaarinen korkeus (m); NaN ruudukon ulkopuolella. */
  const korkeus = (lon, lat) => {
    const fx = (lon - K.lon0) / DLON;
    const fy = (K.lat1 - lat) / DLAT;          // y = 0 on pohjoisin rivi
    if (fx < 0 || fy < 0 || fx > K.w - 1 || fy > K.h - 1) return NaN;
    const x0 = Math.floor(fx); const y0 = Math.floor(fy);
    const x1 = Math.min(K.w - 1, x0 + 1); const y1 = Math.min(K.h - 1, y0 + 1);
    const tx = fx - x0; const ty = fy - y0;
    const a = GRID[y0 * K.w + x0]; const b = GRID[y0 * K.w + x1];
    const c = GRID[y1 * K.w + x0]; const d = GRID[y1 * K.w + x1];
    return (a + (b - a) * tx) * (1 - ty) + (c + (d - c) * tx) * ty;
  };

  /*
   * MAA VAI MERI — sama sääntö kuin maalehdillä: ETOPO alle nollan JA
   * piste Natural Earthin meren alalla. Merenpinnan alapuolinen KUIVA
   * maa (Kaspian alanko, Kuollutmeri, Qattara) jää siis maaksi, ja
   * Kaspianmeri on vettä vaikka se on järvi. Ks. aineisto.mjs.
   */
  const MERI = aineisto.meri ?? null;
  const merenAlalla = (lon, lat) => {
    if (!MERI) return true;
    const x = Math.round((lon - K.lon0) / DLON);
    const y = Math.round((K.lat1 - lat) / DLAT);
    if (x < 0 || y < 0 || x > K.w - 1 || y > K.h - 1) return true;
    const i = y * K.w + x;
    return ((MERI[i >> 3] >> (i & 7)) & 1) === 1;
  };

  /*
   * Varjostus: valo luoteesta, askel ruudukon väli METREINÄ. Sama kaava
   * kuin maalehdellä; liioittelu on hitusen maltillisempi, koska
   * yleislehden ruudukko on kolme kaariminuuttia eikä yksi — samalla
   * kertoimella rinteet olisivat kaukozoomissa rakeisia.
   */
  const M_PER_AST = 111320;
  const varjostus = (lon, lat) => {
    const d = DLON;
    const dzdx = (korkeus(lon + d, lat) - korkeus(lon - d, lat))
      / (2 * d * M_PER_AST * Math.cos(lat * Math.PI / 180));
    const dzdy = (korkeus(lon, lat + d) - korkeus(lon, lat - d)) / (2 * d * M_PER_AST);
    if (!Number.isFinite(dzdx) || !Number.isFinite(dzdy)) return 0.5;
    const z = 2.6;
    const nx = -dzdx * z; const ny = -dzdy * z; const nz = 1;
    const len = Math.hypot(nx, ny, nz);
    const az = 315 * Math.PI / 180; const alt = 42 * Math.PI / 180;
    const lx = Math.cos(alt) * Math.sin(az); const ly = Math.cos(alt) * Math.cos(az);
    const lz = Math.sin(alt);
    return Math.max(0, (nx * lx + ny * ly + nz * lz) / len);
  };

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
        const vesi = Number.isFinite(m) ? (m < 0 && merenAlalla(lon, lat)) : true;
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
          const varjo = (0.5 - varjostus(lon, lat)) * 0.46;
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
   * Vain isot (tools/fokuskartta/maailma.mjs `jarvet`). Sama sävy kuin
   * maalehdellä, jotta Suuret järvet näyttävät samalta kaukaa ja
   * lähempää.
   */
  ctx.save();
  ctx.lineJoin = 'round';
  for (const j of aineisto.jarvet ?? []) {
    ctx.fillStyle = 'rgba(203,200,182,0.9)';
    viivaPolku(ctx, j.renkaat, true);
    ctx.fill('evenodd');
    ctx.strokeStyle = 'rgba(118,107,80,0.75)';
    ctx.lineWidth = 0.9 * P;
    ctx.stroke();
  }
  ctx.restore();

  /* ================================================== 6. ASTEVERKKO
   *
   * HARVA JA HAALEA. Kaukozoomissa kartta on pelaajan yleiskuva, ja
   * asteverkko on siinä mittapuu eikä koriste: 20 asteen väli antaa
   * yhdeksäntoista meridiaania ja seitsemän leveyspiiriä koko laudalle.
   * Päiväntasaaja on hitusen tummempi, kuten aikakauden kartoissa.
   *
   * Reunalukemia EI piirretä — ne olisivat kuvaan poltettua sivua, ja
   * peli piirtää omat mittansa ruutuun ankkuroituina (js/fokusmitat.js).
   */
  if (tyyli.asteverkko !== false) {
    const vali = tyyli.asteverkkoVali ?? 20;
    ctx.save();
    ctx.lineWidth = 0.7 * P;
    ctx.strokeStyle = 'rgba(96,74,46,0.22)';
    ctx.beginPath();
    for (let lon = -180; lon <= 180; lon += vali) {
      const x = kuvaX(lon);
      ctx.moveTo(x, yYla); ctx.lineTo(x, yAla);
    }
    const latYla = Math.floor(lautaLat(bbox.y) / vali) * vali;
    const latAla = Math.ceil(lautaLat(bbox.y + bbox.h) / vali) * vali;
    for (let lat = latAla; lat <= latYla; lat += vali) {
      if (lat === 0) continue;
      const y = kuvaY(lat);
      ctx.moveTo(0, y); ctx.lineTo(GW, y);
    }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(96,74,46,0.36)';
    ctx.beginPath();
    const y0 = kuvaY(0);
    ctx.moveTo(0, y0); ctx.lineTo(GW, y0);
    ctx.stroke();
    ctx.restore();
  }

  /* ================================================== 7. MERTEN NIMET */

  /** Yksi tekstirivi harvennettuna; sama kaava kuin maalehdellä. */
  const teksti = (s, x, y, {
    koko = 13, fontti = '"Liberation Serif", serif', tyylitys = '', vari = MUSTE,
    ank = 'left', vali = 0, kulma = 0,
  } = {}) => {
    ctx.save();
    ctx.translate(x, y);
    if (kulma) ctx.rotate(kulma * Math.PI / 180);
    ctx.font = `${tyylitys} ${koko * S}px ${fontti}`.trim();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    const merkit = [...s];
    const lev = merkit.reduce((sum, m) => sum + ctx.measureText(m).width, 0)
      + vali * S * (merkit.length - 1);
    let t = ank === 'center' ? -lev / 2 : ank === 'right' ? -lev : 0;
    ctx.fillStyle = vari;
    for (const m of merkit) { ctx.fillText(m, t, 0); t += ctx.measureText(m).width + vali * S; }
    ctx.restore();
  };

  /*
   * Valtamerten nimet ovat karttatypografiaa eivätkä paikkatietoa: ne
   * on aseteltu silmällä sinne, missä ulappaa riittää (tyylitiedosto
   * tools/tee-yleislehti.mjs MERET). Ei haloa — nimi jää paperiin kuten
   * maalehdillä.
   */
  for (const m of tyyli.meret ?? []) {
    teksti(m.nimi, kuvaX(m.lon), kuvaY(m.lat), {
      koko: m.koko ?? 20, tyylitys: 'italic', vari: 'rgba(112,99,76,0.62)',
      ank: 'center', vali: (m.koko ?? 20) * 0.34, kulma: m.kulma ?? 0,
    });
  }

  /* ================================================== 8. KOMPASSIRUUSU
   *
   * Kartan omalle tyhjälle merialueelle, ei marginaaliin: aikakauden
   * atlaksessa ruusu on kartan sisällä siellä, missä ulappaa riittää.
   * Paikka tulee työkalulta (tools/tee-yleislehti.mjs KOMPASSI) ja on
   * eteläinen Tyynimeri — laudan suurin yhtenäinen tyhjä vesi, jolla ei
   * ole yhtään kaupunkia, laattaa eikä valtameren nimeä.
   *
   * KAIVERRUSTYYLI syntyy kahdesta puoliskosta: jokainen sakara on
   * jaettu keskiviivastaan valoon ja varjoon, kuten teräskaiverruksessa,
   * jossa kolmiulotteisuus tehdään sävyllä eikä varjostuksella.
   */
  if (tyyli.kompassi) {
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

  /* ================================================ 8b. PYSYVÄ SISÄLTÖ
   *
   * Kaupungit, reitit, joet, järvet, vuoret ja kohteet POLTETAAN
   * laattoihin (Raamattu, omistajan täsmennys 29.8.2026: *"kaikki
   * reittipisteet ja kaupungit yms voidaan piirtaa suoraan yhteen
   * karttaan"*). Pelille jää vain ohut pelitilakerros.
   *
   * === MERKINNÄT MITOITETAAN RUUTUUN, EIVÄT KARTTAAN ===============
   *
   * Tämä on se kohta, jossa pyramidi eroaa yhden arkin lehdestä, ja
   * ero on helppo tehdä väärin (tehtiin ensin, mitattiin, korjattiin).
   *
   * Moottorin kalusteet kerrotaan S:llä, jolloin ne ovat SAMAN
   * KOKOISIA KARTALLA joka tasolla — kehys ja kartussi kuuluvat juuri
   * niin. Nimiö ei kuulu, eikä rannikon viiva tai paperin rae kuulu
   * (ne ovat paperivakioita, P). Peli valitsee tason ruudun
   * tarkkuuden mukaan ja katsoo laattaa suunnilleen 1:1, joten
   * `koko * S` pikseliä on `koko * S` LAITEPIKSELIÄ ruudulla: 14
   * pikselin nimi olisi uloimmalla tasolla 1,5 px (näkymätön) ja
   * syvimmällä 189 px (absurdi).
   *
   * Nimiöt, pisteet ja viivat mitoitetaan siksi LAITEPIKSELEINÄ, eli
   * S jaetaan pois (`ruutuKoko`). Silloin ne ovat aina samankokoisia
   * ruudulla ja kattavat sitä pienemmän maa-alan mitä lähemmäs
   * zoomataan — täsmälleen niin kuin kartan kuuluu käyttäytyä.
   *
   * === YLEISTYS ====================================================
   *
   * Sama sisältö on joka tasolla, mutta ei samanlaisena: uloimmalla
   * tasolla maailma on 675 pikseliä leveä, ja 261 kaupunkinimeä siinä
   * olisi mustaa mössöä. Kynnykset ovat kuvapikseliä lautayksikköä
   * kohti, ja ne on johdettu NIMIÖTIHEYDESTÄ: 261 kaupunkia jakautuu
   * W pikselin levyiselle maailmalle noin W/16 pikselin välein, ja
   * kuudenkymmenen pikselin nimi tarvitsee siitä vähintään sen verran.
   * Tasolla z3 (5400 px) väli on 330 px, tasolla z2 (2700) 170 px ja
   * tasolla z1 (1350) enää 84 px — siitä raja "kaikki nimet z3:sta,
   * vain isot z2:sta".
   */
  if (sisalto) {
    const pxY = px;                       // kuvapikseliä lautayksikköä kohti
    const nakyy = (kynnys) => pxY >= kynnys;
    /* Laitepikseli moottorin `koko`-yksiköiksi: teksti kertoo S:llä. */
    const ruutuKoko = (laitepx) => laitepx / S;

    /* --- joet: uomat ennen kaupunkeja, kuten vesi on ennen kaupunkia */
    if (nakyy(0.11) && sisalto.joet?.length) {
      ctx.save();
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(120,130,138,0.72)';
      for (const joki of sisalto.joet) {
        // Kaukaa vain pääjoet; lähempää kaikki.
        if (joki.tarkeys > 1 && !nakyy(0.45)) continue;
        ctx.lineWidth = joki.tarkeys <= 1 ? 1.4 : 1.0;
        lautaPolku(ctx, [joki.pisteet]);
        ctx.stroke();
      }
      ctx.restore();
    }

    /* --- reitit: isoisän verkosto katkoviivana ---------------------- */
    if (nakyy(0.22) && sisalto.reitit?.length) {
      ctx.save();
      ctx.strokeStyle = 'rgba(120,88,54,0.42)';
      ctx.lineWidth = 1.1;
      ctx.setLineDash([5, 4]);
      lautaPolku(ctx, sisalto.reitit.map((r) => [[r.ax, r.ay], [r.bx, r.by]]));
      ctx.stroke();
      /*
       * Lentoreitit hennompina ja pidemmällä katkolla: aikakauden
       * kartassa ne ovat höyrylaivalinjan tapainen merkintä eikä
       * maantie, ja niitä on vähemmän.
       */
      if (sisalto.lentoreitit?.length) {
        ctx.strokeStyle = 'rgba(120,88,54,0.26)';
        ctx.lineWidth = 0.9;
        ctx.setLineDash([9, 7]);
        lautaPolku(ctx, sisalto.lentoreitit.map((r) => [[r.ax, r.ay], [r.bx, r.by]]));
        ctx.stroke();
      }
      ctx.restore();
    }

    /* --- vuoret: kolmio ja nimi ------------------------------------- */
    if (nakyy(0.22) && sisalto.vuoret?.length) {
      ctx.save();
      ctx.strokeStyle = 'rgba(74,52,33,0.78)';
      ctx.lineWidth = 1.0;
      for (const v of sisalto.vuoret) {
        if (v.tarkeys > 1 && !nakyy(0.45)) continue;
        const x = lautaKuvaX(v.x);
        const y = lautaKuvaY(v.y);
        const r = v.tarkeys <= 1 ? 5 : 4;
        ctx.beginPath();
        ctx.moveTo(x - r, y + r * 0.6);
        ctx.lineTo(x, y - r * 0.8);
        ctx.lineTo(x + r, y + r * 0.6);
        ctx.stroke();
        // Nimi tulee ladonnasta (ks. LADONTA alempana), ei tästä.
        if (v.korkeus && nakyy(0.9) && !ladonta) {
          teksti(`${v.korkeus} m`, x, y + r * 2.4 + 12, {
            koko: ruutuKoko(8.5), ank: 'center', vari: 'rgba(74,52,33,0.66)',
          });
        }
      }
      ctx.restore();
    }

    /* Järvien ja vuorten nimet tulevat ladonnasta (ks. alempana). */

    /* ================================================== LADONTA
     *
     * NIMIÖT TULEVAT VALMIIKSI LADOTTUINA, eivät tästä silmukasta.
     *
     * Törmäyksenvälttely on GLOBAALI päätös: se että yksi nimi jää
     * pois, riippuu siitä mitkä muut on jo asetettu. Jos jokainen
     * lohko päättäisi sen itse, kaksi vierekkäistä lohkoa päätyisi
     * samasta kaupungista eri tulokseen ja lohkorajalle jäisi joko
     * kaksoisnimi tai katoava nimi. Ladonta ajetaan siksi kerran koko
     * arkille (tools/generoi-laattapyramidi.mjs `__ladonta`) ja tänne
     * tulee valmis lista ARKIN pikseleissä — samassa avaruudessa, jossa
     * tämä lohko jo piirtää (ks. arkin koordinaatisto).
     *
     * Ilman ladontaa piirretään kuten ennen, jotta yhden lehden
     * koeajo ei vaadi ladontaa.
     */
    if (ladonta?.length) {
      for (const n of ladonta) {
        teksti(n.teksti, n.x, n.y, {
          koko: ruutuKoko(n.koko),
          ank: n.ank === 'end' ? 'right' : (n.ank === 'middle' ? 'center' : 'left'),
          tyylitys: n.laji === 'jarvi' ? 'italic' : '',
          vari: n.laji === 'jarvi' ? 'rgba(70,86,96,0.85)' : MUSTE,
        });
      }
    }

    /* --- kohteet: pieni rengas -------------------------------------- */
    if (nakyy(0.9) && sisalto.kohteet?.length) {
      ctx.save();
      ctx.strokeStyle = 'rgba(120,88,54,0.7)';
      ctx.lineWidth = 1.0;
      for (const k of sisalto.kohteet) {
        ctx.beginPath();
        ctx.arc(lautaKuvaX(k.x), lautaKuvaY(k.y), 3.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    /* --- kaupungit: piste ja nimi ----------------------------------- */
    if (nakyy(0.11) && sisalto.kaupungit?.length) {
      ctx.save();
      for (const c of sisalto.kaupungit) {
        // Kaukaa vain isot (lähtökaupungit ja lentokentät).
        if (!c.iso && !nakyy(0.22)) continue;
        const x = lautaKuvaX(c.x);
        const y = lautaKuvaY(c.y);
        ctx.fillStyle = 'rgba(58,40,25,0.9)';
        ctx.beginPath();
        ctx.arc(x, y, c.iso ? 2.6 : 2.0, 0, Math.PI * 2);
        ctx.fill();
        // Rengas ison ympärille: aikakauden kartan pääkaupunkimerkintä.
        if (c.iso) {
          ctx.strokeStyle = 'rgba(58,40,25,0.75)';
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(x, y, 4.6, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Nimi tulee ladonnasta (ks. LADONTA alempana), ei tästä.
      }
      ctx.restore();
    }
  }

  ctx.restore();                       // kartta-alan leikkuri auki

  /* ================================================== 9. ATLASKEHYS
   *
   * Kaikki painetun lehden kalusteet marginaaleissa: kaksoisviivakehys,
   * kartussi, mittakaavajana ja painajanrivi. Piirretään VASTA
   * leikkurin purun jälkeen, koska ne kuuluvat kartan ulkopuolelle — ja
   * ENNEN paperin rakeen viimeistä kierrosta (osio 10), jotta rae sitoo
   * kehyksen musteen samaan paperiin kuin rantaviivan.
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
      ctx.lineWidth = paksuus * S;
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
    const RAKO = 14 * S;
    vaaka(yYla - 0.7 * S, 1.4);
    vaaka(yYla - RAKO, 3.0);
    vaaka(yAla + 0.7 * S, 1.4);
    vaaka(yAla + RAKO, 3.0);

    /* ---------------------------------------------------- kartussi */

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
      ctx.lineWidth = paksuus * S;
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
    ctx.lineWidth = 1.1 * S;
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
      koko: 46, vari: 'rgba(58,40,25,0.9)', ank: 'center', vali: 46 * 0.28,
    });
    // Otsakkeen ja alaotsakkeen väliin pieni jakoviiva vinoneliöineen.
    {
      const jy = kYla + kKork * 0.6;
      const jl = kLev * 0.24;
      ctx.save();
      ctx.strokeStyle = MUSTE_HENTO;
      ctx.lineWidth = 0.9 * S;
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
      koko: 25, tyylitys: 'italic', vari: 'rgba(74,52,33,0.78)',
      ank: 'center', vali: 25 * 0.2,
    });

    /* ------------------------------------------------- mittakaavajana */

    /*
     * JANA ON MITTA EIKÄ KORISTE. Millerin lieriössä mittakaava on tosi
     * päiväntasaajalla, joten jana lasketaan siitä: laudan leveys on
     * täysi kierros eli 40 075 km, ja kuvapikselin pituus saadaan
     * suoraan kuvan ja laudan suhteesta.
     */
    const kmPerPikseli = 40075.017 / (projektio.leveys * px);
    const askelKm = 1000;
    const askelPx = askelKm / kmPerPikseli;
    const askelia = 5;
    const janaLev = askelPx * askelia;
    const jx = GW / 2 - janaLev / 2;
    const jy = yAla + RAKO + 50 * S;
    const jKork = 15 * S;
    teksti('MITTAKAAVA PÄIVÄNTASAAJALLA', GW / 2, jy - 18 * S, {
      koko: 16, vari: 'rgba(74,52,33,0.66)', ank: 'center', vali: 16 * 0.3,
    });
    ctx.save();
    ctx.lineWidth = 1.1 * S;
    ctx.strokeStyle = MUSTE_KEHYS;
    for (let i = 0; i < askelia; i++) {
      // Vaalea ruutu samaa norsunluuta kuin marginaali — sama syy kuin
      // kartussin laikussa: valkoinen ruutu vesiviivoittuisi patinassa.
      ctx.fillStyle = i % 2 === 0 ? 'rgba(74,52,33,0.82)' : 'rgba(250,242,203,0.92)';
      ctx.fillRect(jx + i * askelPx, jy, askelPx, jKork);
      ctx.strokeRect(jx + i * askelPx, jy, askelPx, jKork);
    }
    ctx.restore();
    for (let i = 0; i <= askelia; i++) {
      teksti(String(i * askelKm), jx + i * askelPx, jy + jKork + 17 * S, {
        koko: 15, vari: 'rgba(74,52,33,0.7)', ank: 'center',
      });
    }
    teksti('kilometriä', jx + janaLev + 22 * S, jy + jKork / 2, {
      koko: 16, tyylitys: 'italic', vari: 'rgba(74,52,33,0.7)',
    });

    /* -------------------------------------------------- painajanrivi */

    /*
     * Aikakauden asu: kustantamo ja painovuosi roomalaisin numeroin.
     * Tekijänoikeusmerkintä on tarkoituksella HUOMAAMATON — se on
     * nykyajan välttämättömyys vanhan lehden reunassa, ei osa lehteä.
     */
    teksti(kehys.painaja ?? '', GW / 2, yAla + RAKO + 118 * S, {
      koko: 21, tyylitys: 'italic', vari: 'rgba(74,52,33,0.66)',
      ank: 'center', vali: 21 * 0.06,
    });
    teksti(kehys.oikeudet ?? '', GW / 2, yAla + RAKO + 150 * S, {
      koko: 13, vari: 'rgba(74,52,33,0.34)', ank: 'center', vali: 13 * 0.16,
    });
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
