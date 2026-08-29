/*
 * ===== BITTIKARTTAKARTAN POHJACANVAS (vaiheet 1–3) ==================
 *
 * === MIKÄ VIKA ON (mitattu 29.8.2026, Fablemaxin mittausspeksi) ======
 *
 * Lavan pohja ON jo bittikarttoja — mutta niitä on PÄÄLLEKKÄIN jopa 25
 * kappaletta: yleislehti, maailmanäkymän 134 pikkulehteä, atlaksen
 * naapurilehdet ja nykyisen maan oma lehti. Selain ei koosta niitä
 * kertaakaan valmiiksi, vaan purkaa ja maalaa ne UUDESTAAN joka kerta
 * kun se rasteroi kartan tiiliä:
 *
 *     Decode Image, Puolan jokitiheikkö (maailmatila)     448 ms
 *     Decode Image, Ateenan lähikuva                        4 ms
 *     WebKit: leikkauksen jälkeinen pisin maalauskehys     951 ms
 *
 * Elävä vektorisisältö EI ole syy: kun kaikki kartan merkit, nappula,
 * tuikkeet ja nimet piilotettiin, kehys parani vain 109 → 98 ms.
 *
 * === VAIHEEN 1 KORJAUS JA SEN MITATTU RAJA ============================
 *
 * Lavan POHJAKERROKSET koostetaan kerran yhdelle canvakselle, ja svg:n
 * omat pohjakuvat piilotetaan (display: none — sama mekanismi kuin
 * body.fokus-atlas-nakyma .staattinen). Sen jälkeen selaimella on
 * tiiltä rasteroidessaan yksi valmis bittikartta 25:n purettavan
 * sijaan. Piikit katosivat (WebKit max 1780 → 885 ms), mutta PERUSTASO
 * EI PARANTUNUT — ja juurisyy mitattiin:
 *
 *     OLETUS: lava on monta ruudullista (mitattu 14,5 kertaa
 *     karttaruudun ala), ja selain maalaa canvaksesta koko pinnan —
 *     svg:stä se rasteroi vain tarvitsemansa tiilet.
 *
 * === RUUTUAVARUUDEN CANVAS MITATTIIN — JA OLETUS KAATUI =============
 *
 * Vaiheen 2 resepti oli ruudun kokoinen canvas, joka EI liiku kuoren
 * mukana: joka kehyksellä siihen blitattaisiin koosteesta se ikkuna,
 * joka juuri nyt on ruudulla (vastasiirto). Se rakennettiin ja
 * mitattiin 29.8.2026 — ja se on 8 kertaa HITAAMPI:
 *
 *     WebKit, Ateenan syväzoom, HOLD-ele ±170 px
 *       kooste kuoressa (vaihe 1)         p50 16 ms
 *       ruutucanvas, blitti joka kehys    p50 131 ms
 *       sama ilman per-kehys-blittiä      p50 16 ms
 *       blitin oma JS-hinta                   0,02 ms
 *
 * Syy on kompositorissa eikä blitissä. Kuoren `translate3d` on
 * SIIRTO: selain siirtää valmista kerrosta eikä maalaa mitään. Kun
 * canvas asuu kuoren ULKOPUOLELLA, se ei voi siirtyä — sen sisältö on
 * kirjoitettava uusiksi joka kehyksellä, ja kirjoitus mitätöi
 * kerroksen. Se mitätöinti maksaa satakertaisesti sen, mitä
 * itse pikselikopio.
 *
 * MAALATTAVA ALA EI OLLUT SYY. Sama ajo tehtiin TYHJÄLLÄ kartalla
 * (ei svg-sisältöä, ei canvasta): p95 102 ms ja 17 % kehyksistä yli
 * 40 ms — käytännössä sama kuin täydellä kartalla (p95 101 ms).
 * WebKitin käännöskohtien piikit tulevat siis eleen omasta
 * koneistosta, eivät kartan maalauksesta.
 *
 * CANVAS PYSYY SIIS KUORESSA, ja vaiheen 2 työ meni sinne, missä
 * mitattu hyöty on: kooste ei enää katoa ruudulta kesken
 * uudelleenrakennuksen (ATOMINEN VAIHTO alla), zoomeja on kiinteä
 * määrä (js/kartta.js napsautaTasoon), ja maailmanäkymä on mukana.
 *
 * MERKIT JÄÄVÄT SVG:HEN. Kaupungit, nappula, kohderenkaat, tuikkeet ja
 * osumatestaus elävät entiseen tapaan; mitattu hinta on 11 ms.
 *
 * === ATOMINEN VAIHTO ==================================================
 *
 * Täysi kooste rakennetaan TAUSTAPUSKURIIN, ja vanha kooste jää
 * ruudulle sen ajaksi — CSS-muunnos venyttää sen uuteen mittakaavaan
 * (paikoitaCanvas). Ennen ruutu palasi tuoksi ajaksi svg:lle eli
 * juuri sille hitaalle polulle, jota tämä moduuli on olemassa
 * välttämään. Omistajan linjaus: *"tökkiminen on pahempi kuin pehmeä
 * kuva"*.
 *
 * === STRIPE-REBAKE ====================================================
 *
 * Canvas EI synny uudestaan joka kerta kun lava ikkunoidaan (js/kartta.js
 * ikkunoiLava). Vanha sisältö siirretään canvaksen sisällä (`copy`-blit)
 * ja vain PALJASTUNUT KAISTA koostetaan lehdistä. Koostoresoluutio k on
 * vakio per zoomtaso, joten kaista on pikselintarkka jatke eikä sauma
 * näy. Keskipiste ei siirry pikseliäkään — sama lupaus kuin
 * sovitaMannerZoomilla, ja canvas lukee saman lavaikkunan kuin svg.
 *
 * === MITÄ TÄHÄN EI KOOSTETA ===========================================
 *
 * Vain paperin pohja ja neljä pohjakuvaryhmää.
 *
 * SUMUVERHOA EI ENÄÄ OLE. Vaiheessa 1 verho jäi svg:hen, koska se on
 * maan korostuksen PÄÄLLÄ eikä maalausjärjestys sallinut sen siirtoa.
 * Omistajan linjaus 29.8.2026 poisti sumennuksen kokonaan pelistä
 * (fokus = liikerajaus), joten kysymystä ei enää ole.
 *
 * MERKIT JÄÄVÄT SVG:HEN — ks. yllä. Mitattu hinta on 11 ms, ja
 * merkkien polttaminen vaatisi koko svg-piirtimen toisintamisen
 * canvakselle (tekstit, viivatyylit, maskit). Ablaatio osoitti, ettei
 * kartan maalaus ole enää kehyksen kustannus lainkaan, joten poltosta
 * ei ole mitään saatavissa.
 *
 * === MUISTIKURI =======================================================
 *
 * Lehdet puretaan ImageBitmapeiksi YKSI KERRALLAAN ja suljetaan heti
 * piirron jälkeen (close()). Puhelimessa yksi lehti on 3200 x 3200 eli
 * 41 Mt purettuna; kymmenen samanaikaista tappaisi välilehden. Kooste
 * itse mitoitetaan profiilikohtaiseen kattoon (mitoitaKarttapohja).
 * getImageData-luentaa ei tuotantopolulla ole yhtään.
 *
 * KAKSI PUSKURIA ON TRANSIENTTI. Atominen vaihto tarvitsee hetkeksi
 * kaksi lavan kokoista canvasta (puhelimessa 2 x 32 Mt), ja se on
 * täsmälleen se huippu, jonka mitoitus sallii (huippuBudjettiTavut).
 * Toinen puskuri vapautetaan, kun kartta on ollut PUSKURIN_RAUHA_MS
 * verran rauhassa — pysyvästi kahta ei pidetä.
 */

/*
 * KOOSTOPROFIILIT.
 *
 * `kerroin` on koostoresoluutio css-pikseliä kohti. Puhelimessa 1,38 on
 * mitattu luku eikä arvattu: lehden lähdetarkkuus on 3200 px/lehti eli
 * noin 1,36 x se css-mitta, jolla lehti lähikuvassa piirtyy. Suurempi
 * kerroin ei siis toisi yhtään uutta yksityiskohtaa — se veisi vain
 * muistia.
 *
 * `kattoMp` on canvaksen megapikselikatto (RGBA = 4 tavua/px):
 *
 *     kapea      8 Mp  ≈ 32 Mt   (iPhone; lava 1830 x 2284 css)
 *     tabletti  12 Mp  ≈ 48 Mt   (iPad ja kuori)
 *     tyopoyta  20 Mp  ≈ 80 Mt
 *
 * `sivuKatto` on sama kaikilla: 4096 px on se raja, jonka alle jokainen
 * kohdealusta varmasti tekee canvaksen laitteistolla.
 */
export const KARTTAPOHJAN_PROFIILIT = {
  kapea: { kerroin: 1.38, kattoMp: 8, sivuKatto: 4096 },
  tabletti: { kerroin: 1.38, kattoMp: 12, sivuKatto: 4096 },
  tyopoyta: { kerroin: 1.38, kattoMp: 20, sivuKatto: 4096 },
};

/**
 * Profiili ruudun lyhyestä sivusta JA kosketuksesta.
 *
 * Kosketuslaite ei koskaan saa työpöydän budjettia, vaikka ruutu olisi
 * iso: iPadin 12,9" on 1024 x 1366 css, mutta iOS tappaa välilehden
 * paljon aikaisemmin kuin työpöytäselain. Puhelin erottuu lyhyestä
 * sivustaan (390) ilman mitään laitetunnistusta.
 */
export function valitseKarttapohjanProfiili({ leveys = 0, korkeus = 0, kosketus = false } = {}) {
  const lyhyt = Math.min(leveys || 0, korkeus || 0);
  if (!(lyhyt > 0)) return 'kapea';
  if (lyhyt < 500) return 'kapea';
  if (kosketus) return 'tabletti';
  if (lyhyt < 700) return 'tabletti';
  return 'tyopoyta';
}

const MITOITUS_MUISTI = new Map();
const MITOITUS_MUISTI_KATTO = 24;

/**
 * PUHDAS MITOITUSFUNKTIO (muistilla).
 *
 * Sisään lavan NIMELLISET css-mitat — ruutu plus lavamarginaali
 * molemmin puolin — ja profiili. Ulos koostoresoluutio ja se
 * tavumäärä, jonka canvas oikeasti varaa.
 *
 * NIMELLISET eikä sen hetkiset mitat, jotta k on VAKIO PER ZOOMTASO:
 * laudan ylä- ja alalaidassa lavaikkuna kutistuu (js/kartta.js
 * lavaIkkuna leikkaa akselin laudan rajaan), ja jos k eläisi sen
 * mukana, jokainen pystypanorointi laudan laidassa muuttaisi
 * koostoruudukkoa eikä kaistaa voisi liittää pikselintarkasti.
 *
 * `huippuTavut` on kooston hetkellinen huippu: canvas itse plus
 * pahimmillaan yhtä suuri väliaikainen puskuri (maskitetun lehden
 * apucanvas, ks. piirraLehti). Se on transientti eikä jää eloon.
 */
export function mitoitaKarttapohja({ leveysCss, korkeusCss, profiili = 'kapea' } = {}) {
  const avain = `${leveysCss}x${korkeusCss}|${profiili}`;
  const muistista = MITOITUS_MUISTI.get(avain);
  if (muistista) return muistista;
  const p = KARTTAPOHJAN_PROFIILIT[profiili] ?? KARTTAPOHJAN_PROFIILIT.kapea;
  const w = Math.max(1, Number(leveysCss) || 0);
  const h = Math.max(1, Number(korkeusCss) || 0);
  const budjettiTavut = Math.round(p.kattoMp * 1e6) * 4;
  // Kolme kattoa yhtä aikaa: megapikselit, sivun pituus ja tavoiteltu
  // koostoresoluutio. Pienin voittaa.
  const kerroin = Math.min(
    p.kerroin,
    Math.sqrt((p.kattoMp * 1e6) / (w * h)),
    p.sivuKatto / w,
    p.sivuKatto / h,
  );
  const leveysPx = Math.max(1, Math.round(w * kerroin));
  const korkeusPx = Math.max(1, Math.round(h * kerroin));
  const tavut = leveysPx * korkeusPx * 4;
  const tulos = Object.freeze({
    profiili,
    kerroin,
    leveysPx,
    korkeusPx,
    tavut,
    huippuTavut: tavut * 2,
    budjettiTavut,
    huippuBudjettiTavut: budjettiTavut * 2,
    sivuKatto: p.sivuKatto,
  });
  if (MITOITUS_MUISTI.size >= MITOITUS_MUISTI_KATTO) {
    MITOITUS_MUISTI.delete(MITOITUS_MUISTI.keys().next().value);
  }
  MITOITUS_MUISTI.set(avain, tulos);
  return tulos;
}

/** Testien ja kehittäjätyökalujen käyttöön. */
export function nollaaKarttapohjanMuisti() {
  MITOITUS_MUISTI.clear();
}

/* --- geometria ------------------------------------------------------ */

/** Leikkaus kahdesta suorakaiteesta; null jos ei leikkaa. */
function leikkaus(a, b) {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  if (!(x2 > x) || !(y2 > y)) return null;
  return { x, y, w: x2 - x, h: y2 - y };
}

const KAYTOSSA_LUOKKA = 'karttapohja-canvas';

/** Yhtäjaksoisen piirtotyön katto pikseleinä: sen jälkeen hengähdetään. */
const TYON_KATTO = 1e5;
/** Tätä isompaa purettua lehteä ei pidetä muistissa hetkeäkään. */
const LEHDEN_KATTO_TAVUT = 8e6;
/** Koko lehtivaraston katto (≈ 8 Mp RGBA). */
const VARASTON_KATTO_TAVUT = 32e6;
/** Näin kauan eleettömyyttä ennen kuin TÄYSI kooste käynnistetään. */
const TAYDEN_RAUHA_MS = 900;
/*
 * Suurin sallittu kohdistusvirhe canvaspikseleinä ennen kuin kaista
 * hylätään ja koostetaan täysi.
 *
 * Virhe EI KERRY: jokainen kaista laskee siirtonsa lavaikkunan
 * todellisesta origosta, joten pyöristys jää aina puolen pikselin
 * sisään (0,36 css-pikseliä puhelimen kertoimella). Raja on siis
 * vartija eikä säädin — se laukeaa vain jos laskenta joskus muuttuu
 * niin, että virhe alkaisi kasvaa.
 */
const KOHDISTUKSEN_KATTO = 0.51;

/** Näin kauan rauhaa ennen kuin koosteen taustapuskuri vapautetaan. */
const PUSKURIN_RAUHA_MS = 4000;

/**
 * Lavan pohjacanvas.
 *
 * Yksi olio laudan elinkaaren yli; laudan vaihtuessa kutsutaan pura().
 */
export class Karttapohja {
  constructor(ui) {
    this.ui = ui;
    /** Työn kohteena oleva kooste (ei välttämättä se, joka näkyy). */
    this.canvas = null;
    this.ctx = null;
    /** Toinen puskuri: kooste rakennetaan tähän vanhan alla. */
    this.toinenCanvas = null;
    this.apu = null;
    /** Viimeksi koostettu tila (lavaikkuna + resoluutio + sisältöavain). */
    this.tila = null;
    /*
     * NÄKYVÄ KOOSTE ON ERI ASIA KUIN RAKENTEILLA OLEVA (vaihe 3).
     *
     * Täysi kooste rakennetaan TAUSTAPUSKURIIN, ja vanha kooste jää
     * ruudulle siihen asti kunnes uusi on valmis — silloin ne
     * vaihdetaan yhdellä sijoituksella. Zoomin napsahduksessa ruudulla
     * näkyy siis vanha kuva venytettynä uuteen mittakaavaan (pehmeä),
     * ei tyhjää eikä svg:n hidasta piirtoa. Omistajan linjaus:
     * *"tökkiminen on pahempi kuin pehmeä kuva"*.
     */
    this.nakyva = null;
    this.takaAjastin = 0;
    /** Mittarit savukkeelle ja kehittäjätyökaluille. */
    this.rebakeja = 0;
    this.taydet = 0;
    this.vaihtoja = 0;
    this.kaistat = 0;
    this.ohitukset = 0;
    this.viimeisinKesto = 0;
    /** Työ kesken -lippu: purku on asynkroninen. */
    this.tyoKesken = false;
    this.uusiPyynto = null;
    this.maskiMuisti = new Map();
    this.odotusAjastin = 0;
    this.vahti = null;
    /** Purettujen lehtien LRU (ks. palauta). */
    this.varasto = new Map();
    this.varastonTavut = 0;
    this.tyoLaskuri = 0;
  }

  /* --- näkyvä kooste (vaihe 2) --------------------------------------- */

  /**
   * NÄKYVÄ KOOSTE PAIKALLEEN — MYÖS SILLOIN, KUN SE ON VANHENTUNUT.
   *
   * Canvas asuu karttakuoressa svg:n alla ja on koostettu OMASSA
   * lavassaan: sen pikseli (0,0) on laudan piste (tila.x, tila.y) ja
   * sen mittakaava on tila.pxPerYks. Kun lava sen jälkeen vaihtuu —
   * zoomin napsahdus, reunatäydennys — kooste on hetken väärässä
   * mittakaavassa, ja se hetki kestää niin kauan kuin uuden koosteen
   * rakentaminen.
   *
   * CSS-MUUNNOS VENYTTÄÄ VANHAN KUVAN UUTEEN LAVAAN. Muunnos on
   * kompositorin työtä eikä maalausta: se ei maksa kehysbudjetista
   * mitään, ja ruudulla näkyy pehmeä mutta OIKEASSA KOHDASSA oleva
   * kartta sen sijaan että svg ottaisi pohjan takaisin.
   *
   * Kun kooste vastaa lavaa, muunnos on tyhjä — silloin canvas on
   * pikselilleen lavan päällä, kuten vaiheessa 1 (ks. laskeTila:
   * murto-osapikselin paikka maksaa joka maalauksessa).
   */
  paikoitaCanvas() {
    const n = this.nakyva;
    if (!n?.canvas || !n.tila) return;
    const c = n.canvas;
    const t = n.tila;
    const leveys = `${t.leveysCss}px`;
    const korkeus = `${t.korkeusCss}px`;
    if (c.style.width !== leveys) c.style.width = leveys;
    if (c.style.height !== korkeus) c.style.height = korkeus;
    const ui = this.ui;
    const skaala = ui?.zoomSkaala;
    const vasen = ui?.zoomVasenReuna;
    const yla = ui?.zoomYlaReuna;
    let muunnos = '';
    if (skaala > 0 && t.pxPerYks > 0 && Number.isFinite(vasen) && Number.isFinite(yla)) {
      const k = skaala / t.pxPerYks;
      const tx = (t.x - vasen) * skaala;
      const ty = (t.y - yla) * skaala;
      if (Math.abs(k - 1) > 1e-4 || Math.abs(tx) > 0.01 || Math.abs(ty) > 0.01) {
        muunnos = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${k.toFixed(4)})`;
      }
    }
    if (c.style.transform !== muunnos) c.style.transform = muunnos;
  }

  /** Kutsutaan lavan geometrian muuttuessa (js/kartta.js sovitaMannerZoom). */
  paikoita() {
    this.paikoitaCanvas();
  }

  /**
   * Peittääkö kooste sen, mitä ruudulla juuri nyt on?
   *
   * Vain silloin vanha kooste kelpaa näytettäväksi uuden rakentuessa.
   * Lähennettäessä peittää aina, loitonnettaessa ei — ja silloin svg
   * ottaa pohjan takaisin kuten ennenkin, koska tyhjä reunus olisi
   * pahempi kuin hidas mutta oikea kuva.
   */
  peittaaNakyvan(t) {
    const ui = this.ui;
    const skaala = ui?.zoomSkaala;
    const mitat = ui?.paneKoko;
    if (!t || !(skaala > 0) || !(mitat?.w > 0) || !(mitat?.h > 0)) return false;
    if (!Number.isFinite(ui.zoomVasenReuna) || !Number.isFinite(ui.zoomYlaReuna)) return false;
    const x0 = ui.zoomVasenReuna - (ui.panX ?? 0) / skaala;
    const y0 = ui.zoomYlaReuna - (ui.panY ?? 0) / skaala;
    const x1 = x0 + mitat.w / skaala;
    const y1 = y0 + mitat.h / skaala;
    const leveysYks = t.leveysCss / t.pxPerYks;
    const korkeusYks = t.korkeusCss / t.pxPerYks;
    const vara = 0.5 / t.pxPerYks;
    return x0 >= t.x - vara && y0 >= t.y - vara
      && x1 <= t.x + leveysYks + vara && y1 <= t.y + korkeusYks + vara;
  }

  /* --- julkinen rajapinta ------------------------------------------- */

  /**
   * Pohja ajan tasalle. Kutsutaan täsmälleen samoista kohdista kuin
   * ikkunoiLava (js/kartta.js) sekä liu'un puolivälissä.
   *
   * EI KOSKAAN KESKEN ELEEN muualta: sormen alla ei koosteta mitään
   * (js/ui.js taydennaTaide sääntö 1). Liu'un puoliväli on ainoa
   * poikkeus, ja se on mitattu (WebKit 0–33 ms).
   */
  paivita(syy = '', { pakota = false } = {}) {
    if (this.ui?.dead) return false;
    this.varmistaVahti();
    /*
     * SORMEN ALLA EI KOOSTETA (js/ui.js taydennaTaide sääntö 1). Ainoa
     * poikkeus on liu'un puoliväli, joka kutsuu pakota-lipulla: kaista
     * on mitattu halvaksi (WebKit 0–33 ms) ja se jakaa työn kahtia sen
     * sijaan että koko kaista tulisi kerralla liu'un loputtua.
     */
    if (!pakota && this.eleKaynnissa()) {
      this.ajastaUusiYritys();
      return false;
    }
    const tavoite = this.laskeTila();
    /*
     * "EI NYT" EI OLE "TYHJENNÄ". Canvaksen sisältö kelpaa yhä, ja jos
     * se heitettäisiin pois joka kerta kun näkymä käy hetken kelpaamattomana
     * (lehti häivähtämässä, kamera-ajo, lento), seuraava kooste olisi
     * aina TÄYSI — ja täysi kooste on juuri se satojen millisekuntien
     * työ, jonka takia tämä moduuli on olemassa. Mitattu: ilman tätä
     * eroa Ateenan RELEASE-sarjan p50 nousi 16,7 → 33,3 ms.
     */
    if (!tavoite) {
      this.piilota();
      return false;
    }
    if (this.tila && this.samaTila(this.tila, tavoite)) {
      this.ohitukset += 1;
      this.otaKayttoon();
      return false;
    }
    if (this.tyoKesken) {
      this.uusiPyynto = syy;
      return false;
    }
    /*
     * TÄYSI KOOSTE VASTA KUN ELEET OVAT LAKANNEET.
     *
     * Zoomin muutos mitätöi koko koosteen (koostoruudukko on toinen),
     * ja nipistys muuttaa zoomia monta kertaa peräkkäin. Ilman tätä
     * jokainen nipistysporras aloitti oman täyden koosteensa ja
     * seuraava porras heitti sen pois — mitattuna kehittäjän
     * maailmanäkymässä 1015 ms pitkiä tehtäviä neljän nipistyksen
     * sarjassa (savuke-maailmanakyma väite 4; verrokki 426 ms).
     * Kaista saa ajaa heti: se on halpa eikä kilpaile itsensä kanssa.
     */
    if (!pakota && this.taysiTarpeen(tavoite)
      && performance.now() - (this.ui.kartanEleHetki ?? -Infinity) < TAYDEN_RAUHA_MS) {
      this.ajastaUusiYritys();
      return false;
    }
    void this.koostaTila(tavoite, syy);
    return true;
  }

  /** Canvas pois ja svg:n pohjat takaisin (laudan vaihto, purku). */
  pura() {
    this.poistaKaytosta();
    // Nollamitta kertoo selaimelle heti, ettei puskuria enää tarvita.
    for (const c of [this.canvas, this.toinenCanvas]) {
      if (!c) continue;
      c.width = 0;
      c.height = 0;
      c.parentNode?.removeChild(c);
    }
    clearTimeout(this.takaAjastin);
    this.takaAjastin = 0;
    this.toinenCanvas = null;
    this.nakyva = null;
    this.canvas = null;
    this.ctx = null;
    this.vapautaApu();
    this.tila = null;
    this.maskiMuisti.clear();
    clearTimeout(this.odotusAjastin);
    this.odotusAjastin = 0;
    this.vahti?.disconnect();
    this.vahti = null;
  }

  get tilasto() {
    return {
      rebakeja: this.rebakeja,
      taydet: this.taydet,
      vaihtoja: this.vaihtoja,
      kaistat: this.kaistat,
      ohitukset: this.ohitukset,
      kaytossa: Boolean(this.tila),
      viimeisinKesto: Math.round(this.viimeisinKesto * 10) / 10,
      canvas: this.canvas ? `${this.canvas.width}x${this.canvas.height}` : null,
      /*
       * NÄKYVÄ KOOSTE JA SEN MUUNNOS. Tyhjä muunnos tarkoittaa, että
       * kooste vastaa lavaa pikselilleen; muunnos päällä tarkoittaa,
       * että ruudulla on VANHA kooste venytettynä sillä aikaa kun uusi
       * rakentuu (ks. paikoitaCanvas).
       */
      nakyvaMuunnos: this.nakyva?.canvas?.style?.transform || '',
      puskureita: [this.canvas, this.toinenCanvas].filter(Boolean).length,
      kerroin: this.tila?.kerroin ?? null,
      // Koostoruudukon origo laudan yksiköissä ja ruudukon askel: origo
      // on lavaikkunan origosta enintään yhden askeleen verran alkuun.
      origo: this.tila ? { x: this.tila.x, y: this.tila.y } : null,
      lavaOrigo: this.tila ? { x: this.tila.ikkunaX, y: this.tila.ikkunaY } : null,
      askel: this.tila ? 1 / (this.tila.pxPerYks * this.tila.kerroin) : null,
    };
  }

  /* --- tilan laskenta ------------------------------------------------ */

  /**
   * Onko pohjacanvas juuri nyt paikallaan — ja millaisena?
   *
   * Null tarkoittaa "ei nyt": svg:n omat pohjat jäävät näkyviin ja
   * kaikki toimii kuten ennen tätä moduulia.
   */
  laskeTila() {
    const ui = this.ui;
    const doc = globalThis.document;
    if (!ui || !doc) return null;
    const ikkuna = ui.lavaIkkunaTila;
    // VAIN PELILAUDAN FOKUSNÄKYMÄ. Pickstart, katselulaudat ja
    // lehtiwidgetit kulkevat tästä ohi koskemattomina.
    if (!ikkuna || !ui.mannerZoom) return null;
    if (!ui.vanhaLautaPiilossa?.()) return null;
    // Kamera-ajon ja lennon aikana lehdet häivähtelevät: koosteeseen
    // jäätyisi puolikas peittävyys. Ajo on lyhyt eikä panoroi.
    if (ui.aloituslentoKesken) return null;
    if (doc.body?.classList?.contains('kartalento')) return null;
    /*
     * KEHITTÄJÄN MAAILMANÄKYMÄ JÄÄ SVG:LLE — MITATTU KAHDESTI.
     *
     * Maailmanäkymä (js/main.js #kehittaja-maailma-btn) tuo lavalle
     * 25 lehteä yhtä aikaa, ja jokainen zoomin muutos mitätöi koko
     * koosteen. Vaiheessa 1 mitattiin: neljän nipistyksen sarjassa
     * pitkiä tehtäviä 426 → 1015 ms.
     *
     * VAIHEIDEN 2 JA 3 JÄLKEEN KOE UUSITTIIN. Kiinteät zoomtasot
     * (js/kartta.js napsautaTasoon) ja atominen vaihto poistivat
     * kuolleena syntyvät koosteet, mutta lehtiä on yhä 25 ja lava
     * yhä lavan kokoinen: savuke-maailmanakyma väite 4 mittasi
     * 1036 ms rajaa 750 vastaan. Se on omistajan oma tarkastelutila
     * eikä pelaajan polku, joten sen pohja piirtyy kuten ennenkin.
     *
     * Tämän poistaa vasta vaihe 4 (laattapyramidi): silloin lehteä ei
     * koosteta kokonaisena vaan laatta kerrallaan, ja zoomin muutos
     * mitätöi vain sen tason laatat.
     */
    if (ui.maailmanakyma?.()) return null;
    const kerros = ui.fokuskarttaKerros;
    if (!kerros) return null;
    /*
     * LINSSI ON POHJAKUVIEN ALLA (js/ui.js linssiKerros). Jos sen
     * sisällä on jotain, canvas nostaisi sen pohjakuvien yli — silloin
     * pohja jää svg:hen kuten ennenkin.
     */
    if (ui.linssiKerros?.firstElementChild) return null;
    const svg = ui.svg;
    const leveysCss = parseFloat(svg?.style?.width ?? '');
    const korkeusCss = parseFloat(svg?.style?.height ?? '');
    if (!(leveysCss > 0) || !(korkeusCss > 0)) return null;
    if (!(ikkuna.w > 0) || !(ikkuna.h > 0)) return null;
    const kuvat = this.keraaKuvat(kerros, ikkuna);
    if (!kuvat) return null;      // jokin lehti kesken häivähdyksensä
    if (!kuvat.length) return null;
    const pane = ui.mapPane?.getBoundingClientRect?.();
    if (!(pane?.width > 0)) return null;
    // Lavan pikselit yksikköä kohti. Luetaan lavan omista mitoista eikä
    // zoomSkaalasta, jotta pyöristys on täsmälleen sama kuin svg:llä.
    const pxPerYks = leveysCss / ikkuna.w;
    const nimellinen = mitoitaKarttapohja({
      leveysCss: Math.round(pane.width + 2 * ikkuna.margX * pxPerYks),
      korkeusCss: Math.round(pane.height + 2 * ikkuna.margY * pxPerYks),
      profiili: valitseKarttapohjanProfiili({
        leveys: globalThis.innerWidth ?? pane.width,
        korkeus: globalThis.innerHeight ?? pane.height,
        kosketus: (globalThis.navigator?.maxTouchPoints ?? 0) > 0,
      }),
    });
    const kerroin = nimellinen.kerroin;
    /*
     * CANVAS ON TÄSMÄLLEEN LAVAN PÄÄLLÄ — EI PUOLTA PIKSELIÄ SIVUSSA.
     *
     * Ruudukon ankkurointi lautaan (jolloin kaistan siirto olisi aina
     * kokonaisluku) vaatisi canvakselle murto-osapikselin css-paikan,
     * ja se maksaa joka ainoassa maalauksessa: mitattuna Ateenan
     * lähikuvassa kehyksen p50 nousi 16,7 → 100 ms, koska kompositori
     * joutui näytteistämään 8 Mp:n canvaksen uudestaan puolen pikselin
     * siirrolla. Canvas pysyy siis lavan origossa, ja kaistan
     * murto-osa hoidetaan toisin: siirto pyöristetään, ja kertyvä
     * kohdistusvirhe pidetään kolmasosapikselin sisällä (ks.
     * valmisteleAlueet — sen ylittyessä koostetaan täysi).
     */
    return {
      x: ikkuna.x,
      y: ikkuna.y,
      ikkunaX: ikkuna.x,
      ikkunaY: ikkuna.y,
      w: ikkuna.w,
      h: ikkuna.h,
      leveysCss,
      korkeusCss,
      pxPerYks,
      kerroin,
      mitoitus: nimellinen,
      leveysPx: Math.max(1, Math.round(leveysCss * kerroin)),
      korkeusPx: Math.max(1, Math.round(korkeusCss * kerroin)),
      kuvat,
      avain: kuvat.map((k) => k.avain).join('|'),
    };
  }

  samaTila(a, b) {
    // Vertailu tehdään LAVAIKKUNAN origosta eikä canvaksen omasta:
    // kaista pyöristää canvaksen origon pikseleihin (valmisteleAlueet),
    // eikä se ero saa näyttää muuttuneelta tilalta.
    return a.ikkunaX === b.ikkunaX && a.ikkunaY === b.ikkunaY
      && a.leveysPx === b.leveysPx && a.korkeusPx === b.korkeusPx
      && a.kerroin === b.kerroin && a.pxPerYks === b.pxPerYks && a.avain === b.avain;
  }

  /**
   * Lavalle osuvat pohjakuvat maalausjärjestyksessä.
   *
   * Palauttaa null, jos jokin kuva on kesken esiinhäivähdyksensä
   * (css .fokuskartta-kuva animation): silloin koosteeseen jäisi
   * puolikas peittävyys, ja parempi on antaa svg:n hoitaa häivähdys
   * loppuun. Uusi yritys ajastetaan.
   */
  keraaKuvat(kerros, ikkuna) {
    const kuvat = [];
    const kierto = this.ui.kartta?.kiertava?.()
      ? (this.ui.game?.pack?.map?.width ?? 0) : 0;
    const solmut = kerros.querySelectorAll('image.fokuskartta-kuva');
    const kaytossa = Boolean(globalThis.document?.body?.classList?.contains(KAYTOSSA_LUOKKA));
    let kesken = false;
    for (const kuva of solmut) {
      const ryhma = kuva.parentElement?.getAttribute?.('class') ?? '';
      if (!/fokus-(yleislehti|maailma|atlas|lehti)/.test(ryhma)) continue;
      const x = Number(kuva.getAttribute('x'));
      const y = Number(kuva.getAttribute('y'));
      const w = Number(kuva.getAttribute('width'));
      const h = Number(kuva.getAttribute('height'));
      if (!(w > 0) || !(h > 0)) continue;
      // Kierrolla sama lehti voi osua ikkunaan laudan leveyden päästä.
      const siirrot = [];
      for (const d of kierto ? [0, kierto, -kierto] : [0]) {
        if (leikkaus({ x: x + d, y, w, h }, ikkuna)) siirrot.push(d);
      }
      if (!siirrot.length) continue;
      /*
       * NÄKYVYYS LUETAAN LUOKISTA, EI LASKETUSTA TYYLISTÄ.
       *
       * Laskettu tyyli olisi tässä kehäpäätelmä: koosteen jälkeen nämä
       * samat kuvat ovat display: none NIMENOMAAN TÄMÄN MODUULIN
       * takia, jolloin seuraava kooste ei löytäisi yhtään lehteä,
       * purkaisi canvaksen, kuvat palaisivat ja kooste alkaisi alusta.
       * Mitattu: se oli päättymätön silmukka (p50 16,7 → 33,3 ms).
       * Piilotuksia on kaksi ja molemmat ovat luokkia: maailmanäkymän
       * näkymärajaus (.fokus-ikkunan-ulkona) ja tämä moduuli itse.
       */
      if (kuva.classList.contains('fokus-ikkunan-ulkona')) continue;
      if (kuva.style?.display === 'none') continue;
      const ryhmaEl = kuva.parentElement;
      if (ryhmaEl?.style?.display === 'none') continue;
      if (ryhmaEl?.classList?.contains('fokus-ikkunan-ulkona')) continue;
      /*
       * ESIINHÄIVÄHDYS ODOTETAAN LOPPUUN VAIN ENSIMMÄISELLÄ KERRALLA.
       * Kun pohja on jo canvaksella, uusi lehti on piilossa vasta kun
       * se on poltettu — siihen asti se häivähtää svg:ssä kuten ennen.
       */
      if (!kaytossa) {
        const peitto = Number(globalThis.getComputedStyle?.(kuva)?.opacity ?? 1);
        if (Number.isFinite(peitto) && peitto < 0.999) { kesken = true; break; }
      }
      const href = kuva.getAttribute('href')
        ?? kuva.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
      if (!href) continue;
      const maski = kuva.getAttribute('mask') ?? '';
      kuvat.push({
        el: kuva,
        href,
        x,
        y,
        w,
        h,
        siirrot,
        maskiOsuus: maski ? this.maskinOsuus(kerros, maski) : 0,
        avain: `${href}@${x},${y},${w},${h},${siirrot.join(',')},${maski}`,
      });
    }
    if (kesken) {
      this.ajastaUusiYritys();
      return null;
    }
    return kuvat;
  }

  /**
   * Reunahäivytysmaskin kaistan osuus luettuna MASKISTA ITSESTÄÄN
   * (js/fokuskartta.js haivytysMaski): maskin ensimmäinen liukuvärillä
   * täytetty suorakaide on vasen reuna, ja sen leveys on osuus.
   * Näin lennon ja vuodon maskit erottuvat ilman kopioitua vakiota.
   */
  maskinOsuus(kerros, viite) {
    if (this.maskiMuisti.has(viite)) return this.maskiMuisti.get(viite);
    let osuus = 0;
    const tunnus = /^url\(#(.+)\)$/.exec(viite.trim())?.[1];
    if (tunnus) {
      const maski = kerros.querySelector(`mask#${CSS.escape(tunnus)}`);
      const reuna = maski?.querySelector('rect[fill^="url(#"]');
      const arvo = Number(reuna?.getAttribute('width'));
      if (arvo > 0 && arvo < 1) osuus = arvo;
    }
    this.maskiMuisti.set(viite, osuus);
    return osuus;
  }

  ajastaUusiYritys() {
    if (this.odotusAjastin) return;
    this.odotusAjastin = setTimeout(() => {
      this.odotusAjastin = 0;
      this.paivita('haivahdys');
    }, 480);
  }

  /**
   * LEHTIVAHTI. Atlaksen lehdet saapuvat verkosta kesken pelin
   * (js/fokuskartta.js paivitaFokusAtlas), eikä sitä hetkeä ole
   * missään kutsuketjussa. Vahti huomaa uuden lehden ja ajastaa
   * koosteen — sama 480 ms:n odotus kuin esiinhäivähdyksellä, joten
   * lehti ehtii häivähtää svg:ssä loppuun ennen kuin se poltetaan.
   */
  varmistaVahti() {
    if (this.vahti) return;
    const kerros = this.ui?.fokuskarttaKerros;
    if (!kerros || typeof MutationObserver !== 'function') return;
    this.vahti = new MutationObserver(() => this.ajastaUusiYritys());
    this.vahti.observe(kerros, { childList: true, subtree: true });
  }

  /* --- kooste -------------------------------------------------------- */

  async koostaTila(tavoite, syy) {
    this.tyoKesken = true;
    const alku = performance.now();
    /*
     * TÄYSI KOOSTE RAKENNETAAN TAUSTAPUSKURIIN (vaihe 3, atominen
     * vaihto).
     *
     * Vaiheessa 1 täyden koosteen ajaksi svg otti pohjan takaisin: se
     * oli oikein mutta hidasta, ja juuri se oli zoomin napsahduksen
     * pahin hetki. Nyt vanha kooste jää ruudulle — ruutucanvas blittaa
     * siitä uudella mittakaavalla, jolloin kuva on hetken pehmeä mutta
     * paikallaan — ja uusi kooste kirjoitetaan toiseen puskuriin.
     * Vaihto on yksi sijoitus (this.nakyva), joten ruudulla ei ole
     * koskaan puolivalmista koostetta.
     *
     * SVG PALAA VAIN JOS VANHAA EI OLE. Ensimmäisellä koosteella
     * ruudulla ei ole mitään näytettävää, ja silloin svg hoitaa
     * välihetken kuten ennenkin.
     */
    const vaihto = this.taysiTarpeen(tavoite)
      && Boolean(this.nakyva?.canvas)
      && this.peittaaNakyvan(this.nakyva.tila);
    const paluu = { canvas: this.canvas, ctx: this.ctx, tila: this.tila };
    try {
      if (vaihto) this.otaTaustapuskuri();
      const canvas = this.varmistaCanvas(tavoite);
      if (!canvas) { if (vaihto) this.palautaPuskuri(paluu); return; }
      const alueet = this.valmisteleAlueet(tavoite);
      if (alueet.taysi && !vaihto) this.piilota();
      this.rebakeja += 1;
      if (alueet.taysi) this.taydet += 1; else this.kaistat += 1;
      if (alueet.taysi && vaihto) this.vaihtoja += 1;
      await this.piirraAlueet(tavoite, alueet.osat);
      this.tila = tavoite;
      // ATOMINEN VAIHTO: tästä hetkestä ruudulla on uusi kooste.
      this.asetaNakyva(this.canvas, tavoite);
      this.merkitsePoltetut(tavoite);
      this.otaKayttoon();
      if (vaihto) this.ajastaPuskurinVapautus();
    } finally {
      this.viimeisinKesto = performance.now() - alku;
      this.tyoKesken = false;
      const uusi = this.uusiPyynto;
      this.uusiPyynto = null;
      if (uusi != null) this.paivita(uusi);
    }
    void syy;
  }

  /**
   * Näkyvä kooste vaihtuu YHDELLÄ SIJOITUKSELLA: luokka toiselle
   * canvakselle, ja paikoitus perään.
   */
  asetaNakyva(canvas, tila) {
    for (const c of [this.canvas, this.toinenCanvas]) {
      if (c) c.classList.toggle('karttapohja-nakyva', c === canvas);
    }
    this.nakyva = { canvas, tila };
    this.paikoitaCanvas();
  }

  /**
   * Rakenteille toinen puskuri; vanha kooste jää näkyviin.
   *
   * Molemmat puskurit ovat kuoressa; näkyvyyden ratkaisee luokka
   * `karttapohja-nakyva` (css/styles.css), koska `display: none` ei
   * tyhjennä canvaksen puskuria — piilossa oleva kooste säilyy
   * sellaisenaan ja on valmis heti kun se vuorollaan palaa.
   */
  otaTaustapuskuri() {
    const doc = globalThis.document;
    const kuori = this.ui.karttaKuori;
    if (!doc || !kuori) return;
    clearTimeout(this.takaAjastin);
    this.takaAjastin = 0;
    let uusi = this.toinenCanvas;
    if (!uusi) {
      uusi = doc.createElement('canvas');
      uusi.className = 'karttapohja';
      uusi.setAttribute('aria-hidden', 'true');
      kuori.insertBefore(uusi, kuori.firstChild);
    }
    this.toinenCanvas = this.canvas;
    this.canvas = uusi;
    this.ctx = uusi.getContext('2d', { alpha: true });
    if (this.ctx) this.ctx.imageSmoothingQuality = 'high';
    // Tyhjä tila pakottaa valmisteleAlueet tekemään täyden koosteen:
    // uudessa puskurissa ei ole mitään siirrettävää.
    this.tila = null;
  }

  /** Vaihto peruuntui (canvasta ei saatu): vanha jää työkohteeksi. */
  palautaPuskuri(paluu) {
    this.toinenCanvas = this.canvas;
    this.canvas = paluu.canvas;
    this.ctx = paluu.ctx;
    this.tila = paluu.tila;
  }

  /*
   * TAUSTAPUSKURI EI JÄÄ MUISTIIN. Kaksi lavan kokoista canvasta on
   * puhelimessa 64 Mt, ja se on kaksinkertainen profiilibudjettiin
   * nähden (mitoitaKarttapohja huippuBudjettiTavut sallii sen vain
   * transienttina). Puskuri elää siis vain zoomailun ympärillä ja
   * vapautuu, kun kartta on ollut hetken rauhassa.
   */
  ajastaPuskurinVapautus() {
    clearTimeout(this.takaAjastin);
    this.takaAjastin = setTimeout(() => {
      this.takaAjastin = 0;
      const taka = this.toinenCanvas;
      if (!taka || taka === this.canvas || taka === this.nakyva?.canvas) return;
      taka.width = 0;
      taka.height = 0;
      taka.parentNode?.removeChild(taka);
      this.toinenCanvas = null;
    }, PUSKURIN_RAUHA_MS);
  }

  /**
   * Kooste oikean kokoisena karttakuoreen svg:n alle.
   *
   * KUORESSA JA VAIN KUORESSA. Kuoren oma translate3d (js/kartta.js
   * asetaPan) siirtää canvaksen ja svg:n yhtä aikaa, eikä panorointi
   * maalaa kummastakaan mitään — se on kompositorin siirto. Ruudun
   * kokoinen, kuoren ulkopuolella elävä canvas kokeiltiin ja mitattiin
   * (ks. tiedoston johdanto): se on kahdeksan kertaa hitaampi, koska
   * sen sisältö on kirjoitettava uusiksi joka kehyksellä.
   *
   * `willReadFrequently` on POIS: se pakottaa canvaksen ohjelmistolle,
   * eikä tuotantopolulla ole yhtään getImageData-luentaa.
   */
  varmistaCanvas(tavoite) {
    const doc = globalThis.document;
    const kuori = this.ui.karttaKuori;
    if (!kuori || !doc) return null;
    if (!this.canvas) {
      const c = doc.createElement('canvas');
      c.className = 'karttapohja';
      c.setAttribute('aria-hidden', 'true');
      // ENSIMMÄISEKSI LAPSEKSI: canvas on lavan varjo, ja css antaa
      // sille z-index: -1 kuoren omassa pinossa (css/styles.css).
      kuori.insertBefore(c, kuori.firstChild);
      this.canvas = c;
      this.ctx = c.getContext('2d', { alpha: true });
      if (this.ctx) this.ctx.imageSmoothingQuality = 'high';
    }
    const c = this.canvas;
    if (c.width !== tavoite.leveysPx || c.height !== tavoite.korkeusPx) {
      c.width = tavoite.leveysPx;
      c.height = tavoite.korkeusPx;
      if (this.ctx) this.ctx.imageSmoothingQuality = 'high';
      tavoite.koonMuutos = true;
    }
    return c;
  }

  /**
   * STRIPE-REBAKE: mikä osa canvaksesta on koostettava uudestaan?
   *
   * Vanha sisältö siirretään paikalleen `copy`-blitillä (drawImage
   * itseensä; lähde otetaan tilannekuvana ennen piirtoa), ja jäljelle
   * jää korkeintaan kaksi kaistaa — yksi vaakaan, yksi pystyyn.
   */
  valmisteleAlueet(tavoite) {
    const ctx = this.ctx;
    const vanha = this.tila;
    const koko = { x: 0, y: 0, w: tavoite.leveysPx, h: tavoite.korkeusPx };
    const taysi = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, tavoite.leveysPx, tavoite.korkeusPx);
      return { taysi: true, osat: [koko] };
    };
    if (!vanha || tavoite.koonMuutos) return taysi();
    if (vanha.kerroin !== tavoite.kerroin) return taysi();
    if (vanha.pxPerYks !== tavoite.pxPerYks) return taysi();
    if (vanha.leveysPx !== tavoite.leveysPx || vanha.korkeusPx !== tavoite.korkeusPx) return taysi();
    /*
     * SIIRTO PYÖRISTETÄÄN, VIRHE PIDETÄÄN KURISSA.
     *
     * Lavaikkunan origo on liukuluku, joten siirto ei osu tasan
     * pikseleihin. Murto-osan siirto sumentaisi pohjan joka kerta, ja
     * canvaksen siirtäminen murto-osalla maksaisi jokaisessa
     * maalauksessa (ks. laskeTila). Siirto pyöristetään siis
     * kokonaisiksi pikseleiksi, ja `x`/`y` kertovat mitä canvaspikseli
     * 0 SEN JÄLKEEN oikeasti esittää. Ero lavan origoon on aina alle
     * puoli koostopikseliä (0,36 css-pikseliä); kun se kasvaisi
     * KOHDISTUKSEN_KATTOa suuremmaksi, koostetaan täysi ja virhe
     * nollautuu.
     */
    const s = tavoite.pxPerYks * tavoite.kerroin;
    const dxTarkka = (vanha.x - tavoite.x) * s;
    const dyTarkka = (vanha.y - tavoite.y) * s;
    const dx = Math.round(dxTarkka);
    const dy = Math.round(dyTarkka);
    // Canvaspikselin 0 todellinen kohta laudalla siirron jälkeen.
    const uusiX = vanha.x - dx / s;
    const uusiY = vanha.y - dy / s;
    if (Math.abs((uusiX - tavoite.ikkunaX) * s) > KOHDISTUKSEN_KATTO) return taysi();
    if (Math.abs((uusiY - tavoite.ikkunaY) * s) > KOHDISTUKSEN_KATTO) return taysi();
    tavoite.x = uusiX;
    tavoite.y = uusiY;
    if (Math.abs(dx) >= tavoite.leveysPx || Math.abs(dy) >= tavoite.korkeusPx) return taysi();
    /*
     * LEHTIJOUKON MUUTOS ON MYÖS VAIN LIKAINEN ALUE.
     *
     * Maailmanäkymässä lehtiä on lavalla 25, ja näkymärajaus
     * (js/ui.js paivitaMaailmanRajaus) sytyttää ja sammuttaa niitä
     * panoroinnin mukana. Jos jokainen sellainen muutos pakottaisi
     * täyden koosteen, 25 lehden purku ajaisi taustalla lakkaamatta —
     * mitattuna se nosti Puolan RELEASE-sarjan p50:n 16,7 → 33,3 ms.
     * Muuttuneen lehden oma suorakaide riittää: sen alla oleva
     * pergamentti ja naapurit piirtyvät samalla uudestaan, koska
     * kooste käy alueen läpi koko maalausjärjestyksessä.
     */
    const likaiset = this.likaisetLehdet(vanha, tavoite, koko);
    if (!likaiset) return taysi();
    if (dx === 0 && dy === 0 && !likaiset.length) return taysi();
    const osat = [];
    if (dx !== 0 || dy !== 0) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'copy';
      ctx.drawImage(this.canvas, dx, dy);
      ctx.globalCompositeOperation = 'source-over';
      if (dy > 0) osat.push({ x: 0, y: 0, w: koko.w, h: dy });
      else if (dy < 0) osat.push({ x: 0, y: koko.h + dy, w: koko.w, h: -dy });
      const pystyY = dy > 0 ? dy : 0;
      const pystyH = koko.h - Math.abs(dy);
      if (dx > 0) osat.push({ x: 0, y: pystyY, w: dx, h: pystyH });
      else if (dx < 0) osat.push({ x: koko.w + dx, y: pystyY, w: -dx, h: pystyH });
    }
    osat.push(...likaiset);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    for (const osa of osat) ctx.clearRect(osa.x, osa.y, osa.w, osa.h);
    return { taysi: false, osat };
  }

  /**
   * Muuttuneiden lehtien suorakaiteet UUDEN ikkunan canvaspikseleinä.
   *
   * Null tarkoittaa "liikaa muuttunutta" — silloin täysi kooste on
   * halvempi kuin kymmenen erillistä aluetta. Poistuneet lehdet ovat
   * yhtä lailla likaisia: niiden alta on piirrettävä pergamentti ja
   * alemmat lehdet takaisin.
   */
  likaisetLehdet(vanha, tavoite, koko) {
    const KATTO_OSUUS = 0.5;
    const uudet = new Map(tavoite.kuvat.map((k) => [k.avain, k]));
    const vanhat = new Map(vanha.kuvat.map((k) => [k.avain, k]));
    const muuttuneet = [];
    for (const [avain, k] of uudet) if (!vanhat.has(avain)) muuttuneet.push(k);
    for (const [avain, k] of vanhat) if (!uudet.has(avain)) muuttuneet.push(k);
    if (!muuttuneet.length) return [];
    const s = tavoite.pxPerYks * tavoite.kerroin;
    const alueet = [];
    let ala = 0;
    for (const k of muuttuneet) {
      for (const d of k.siirrot) {
        const osa = leikkaus({
          x: (k.x + d - tavoite.x) * s,
          y: (k.y - tavoite.y) * s,
          w: k.w * s,
          h: k.h * s,
        }, koko);
        if (!osa) continue;
        alueet.push(osa);
        ala += osa.w * osa.h;
      }
    }
    if (ala > koko.w * koko.h * KATTO_OSUUS) return null;
    return alueet;
  }

  /** Yksikkökoordinaatti canvaspikseleiksi. */
  muunnin(tavoite) {
    const s = tavoite.pxPerYks * tavoite.kerroin;
    return (yks, akseli) => (yks - (akseli === 'x' ? tavoite.x : tavoite.y)) * s;
  }

  /**
   * Yksi kehys muille. Täysi kooste on satojen millisekuntien
   * pikselityö, ja ilman hengähdyksiä se olisi yksi jättikehys —
   * mitattuna 500 ms Chromiumin 4x-kuristuksella. Palasteltuna sama
   * työ kulkee useamman kehyksen läpi eikä yksikään niistä pysäytä
   * ruutua.
   */
  hengahda(pikseleita = Infinity) {
    this.tyoLaskuri = (this.tyoLaskuri ?? 0) + pikseleita;
    if (this.tyoLaskuri < TYON_KATTO) return null;
    this.tyoLaskuri = 0;
    /*
     * JOUTOAIKA ENSIN. Kooste on taustatyötä: sen saa tehdä vasta kun
     * ruutu on ehtinyt piirtyä. `setTimeout(0)` palaa heti seuraavassa
     * tehtävässä ja kilpailee samasta kehyksestä selaimen oman
     * uudelleenrasteroinnin kanssa — mitattuna se nosti irrotussarjan
     * p50:n 16,7 → 33,3 ms. requestIdleCallback antaa saman työn
     * kehysten VÄLIIN; aikakatko pitää huolen, ettei kooste jää
     * roikkumaan jos joutoaikaa ei tule.
     */
    const idle = globalThis.requestIdleCallback;
    const tauko = () => (typeof idle === 'function'
      ? new Promise((ok) => { idle(() => ok(), { timeout: 400 }); })
      : new Promise((ok) => { setTimeout(ok, 0); }));
    return (async () => {
      await tauko();
      /*
       * SORMEN ALLA EI JATKETA. paivita ei aloita koostetta kesken
       * eleen, mutta jo alkanut kooste jatkuisi sen läpi — mitattuna
       * kehittäjän maailmanäkymässä 372 ms pitkiä tehtäviä pelkän
       * panoroinnin aikana (savuke-maailmanakyma väite 3a). Kooste
       * odottaa siis eleen ohi ja jatkaa vasta sitten.
       */
      while (this.eleKaynnissa()) {
        await new Promise((ok) => { setTimeout(ok, 120); });
      }
    })();
  }

  /**
   * Vaatiiko tämä tila TÄYDEN koosteen? Halpa etukäteisarvio samoista
   * ehdoista kuin valmisteleAlueet — ilman canvaksen koskemista.
   */
  taysiTarpeen(tavoite) {
    const vanha = this.tila;
    if (!vanha) return true;
    if (vanha.kerroin !== tavoite.kerroin) return true;
    if (vanha.pxPerYks !== tavoite.pxPerYks) return true;
    return vanha.leveysPx !== tavoite.leveysPx || vanha.korkeusPx !== tavoite.korkeusPx;
  }

  /** Onko kartalla juuri nyt ele käynnissä (raahaus, liuku, nipistys, rulla)? */
  eleKaynnissa() {
    const ui = this.ui;
    if (!ui || ui.dead) return false;
    if (ui.kartanRaahaus) return true;
    const hetki = ui.kartanEleHetki;
    return Number.isFinite(hetki) && performance.now() - hetki < 200;
  }

  /**
   * Alue paloiksi, joista yksikään ei ole KAISTAN_KATTO pikseliä
   * suurempi. Palat ovat vaakakaistoja, koska canvas on pysty ja
   * vaakakaista osuu useimmiten yhteen lehteen.
   */
  paloiksi(alue) {
    const KAISTAN_KATTO = TYON_KATTO;
    const ala = alue.w * alue.h;
    if (!(ala > KAISTAN_KATTO)) return [alue];
    const korkeus = Math.max(1, Math.floor(KAISTAN_KATTO / Math.max(1, alue.w)));
    const palat = [];
    for (let y = alue.y; y < alue.y + alue.h; y += korkeus) {
      palat.push({
        x: alue.x, y, w: alue.w, h: Math.min(korkeus, alue.y + alue.h - y),
      });
    }
    return palat;
  }

  async piirraAlueet(tavoite, osat) {
    const ctx = this.ctx;
    if (!ctx || !osat.length) return;
    const s = tavoite.pxPerYks * tavoite.kerroin;
    const px = (yks, origo) => (yks - origo) * s;
    for (const osa of osat) {
      for (const pala of this.paloiksi(osa)) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.rect(pala.x, pala.y, pala.w, pala.h);
        ctx.clip();
        this.piirraPaperi(ctx, tavoite, px);
        ctx.restore();
        await this.hengahda(pala.w * pala.h);
      }
    }
    for (const kuva of tavoite.kuvat) {
      /*
       * OSUMATESTI ENNEN PURKUA. Kaistakoosteessa lehdistä osuu
       * tyypillisesti yksi tai kaksi; loput eivät saa maksaa
       * purkuaan — se on koko kaistan idea.
       */
      const piirrot = [];
      for (const d of kuva.siirrot) {
        const kohde = {
          x: px(kuva.x + d, tavoite.x),
          y: px(kuva.y, tavoite.y),
          w: kuva.w * s,
          h: kuva.h * s,
        };
        for (const osa of osat) {
          const ala = leikkaus(kohde, osa);
          if (ala) piirrot.push({ kohde, ala });
        }
      }
      if (!piirrot.length) continue;
      // YKSI LEHTI KERRALLAAN: purettu 3200 x 3200 -lehti on 41 Mt.
      const bm = await this.avaaKuva(kuva.href);
      if (!bm) continue;
      try {
        for (const { kohde, ala } of piirrot) {
          for (const pala of this.paloiksi(ala)) {
            this.piirraLehti(ctx, bm, kohde, pala, kuva.maskiOsuus);
            await this.hengahda(pala.w * pala.h);
          }
        }
      } finally {
        this.palauta(kuva.href, bm);
      }
    }
  }

  /**
   * Pergamentin pohja (js/mapart.js drawPaperPohja) canvakselle.
   *
   * Suorakaide ja liukuväri luetaan SVG:STÄ ITSESTÄÄN — sama ellipsi,
   * samat pysäkit, sama muunnos — jottei tänne synny toista kopiota
   * mapartin laskennasta, joka voisi eriytyä.
   */
  piirraPaperi(ctx, tavoite, px) {
    const svg = this.ui.svg;
    const pohja = svg?.querySelector('.paper-pohja');
    const grad = svg?.querySelector('#paper-pohja-grad');
    if (!pohja || !grad) return;
    const x = Number(pohja.getAttribute('x'));
    const y = Number(pohja.getAttribute('y'));
    const w = Number(pohja.getAttribute('width'));
    const h = Number(pohja.getAttribute('height'));
    if (!(w > 0) || !(h > 0)) return;
    const cx = Number(grad.getAttribute('cx'));
    const cy = Number(grad.getAttribute('cy'));
    const r = Number(grad.getAttribute('r'));
    if (!(r > 0)) return;
    const m = grad.gradientTransform?.baseVal?.consolidate?.()?.matrix
      ?? { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
    const s = tavoite.pxPerYks * tavoite.kerroin;
    const kierto = this.ui.kartta?.kiertava?.()
      ? (this.ui.game?.pack?.map?.width ?? 0) : 0;
    for (const d of kierto ? [0, kierto, -kierto] : [0]) {
      const kohde = {
        x: px(x + d, tavoite.x), y: px(y, tavoite.y), w: w * s, h: h * s,
      };
      if (!leikkaus(kohde, { x: 0, y: 0, w: tavoite.leveysPx, h: tavoite.korkeusPx })) continue;
      ctx.save();
      /*
       * Kaksi muunnosta peräkkäin, täsmälleen kuten SVG tekee:
       * ensin laudan yksiköt canvaspikseleiksi (kierron siirto mukana),
       * sitten liukuvärin oma gradientTransform. Sen jälkeen piirretään
       * LIUKUVÄRIN koordinaateissa, joten sekä keskus (cx, cy, r) että
       * täytettävä suorakaide ovat samassa avaruudessa.
       */
      ctx.setTransform(s, 0, 0, s, (d - tavoite.x) * s, -tavoite.y * s);
      ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
      const liuku = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      for (const stop of grad.children) {
        const kohta = parseFloat(stop.getAttribute('offset')) / 100;
        liuku.addColorStop(
          Number.isFinite(kohta) ? Math.max(0, Math.min(1, kohta)) : 0,
          stop.getAttribute('stop-color') ?? '#000',
        );
      }
      ctx.fillStyle = liuku;
      const kaanteinen = this.kaannaSuorakaide(m, { x, y, w, h });
      ctx.fillRect(kaanteinen.x, kaanteinen.y, kaanteinen.w, kaanteinen.h);
      ctx.restore();
    }
  }

  /** Suorakaide liukuvärin muunnoksen käänteisavaruuteen (vain skaala + siirto). */
  kaannaSuorakaide(m, laatikko) {
    const a = m.a || 1;
    const d = m.d || 1;
    return {
      x: (laatikko.x - m.e) / a,
      y: (laatikko.y - m.f) / d,
      w: laatikko.w / a,
      h: laatikko.h / d,
    };
  }

  /**
   * Yksi lehti kohdealueelleen — tarvittaessa reunahäivytyksen kanssa.
   *
   * MASKI ON `destination-out`-LIUKUJA, EI SUODATINTA. SVG:n maski on
   * valkoinen pohja, jonka reunoille maalataan mustaa liukuvärillä;
   * luminanssimaskissa musta alfalla p jättää näkyviin (1 - p), ja
   * täsmälleen sen tekee destination-out samalla alfalla. Sama tulos,
   * eikä canvakselle synny yhtään suodatinta (iOS-sääntö).
   */
  piirraLehti(ctx, bm, kohde, ala, maskiOsuus) {
    /*
     * VAIN TARVITTAVA PALA LÄHTEESTÄ.
     *
     * Yhdeksänargumenttinen drawImage rajaa lähteen samassa suhteessa
     * kuin kohde on rajattu, jolloin suodatustyö on verrannollinen
     * KOHDEALUEESEEN eikä lehden koko pinta-alaan. Ilman tätä
     * yleislehden piirto syväzoomissa olisi 400 megapikselin verran
     * skaalausta yhden ruudullisen takia.
     */
    const lahde = {
      x: ((ala.x - kohde.x) / kohde.w) * bm.width,
      y: ((ala.y - kohde.y) / kohde.h) * bm.height,
      w: (ala.w / kohde.w) * bm.width,
      h: (ala.h / kohde.h) * bm.height,
    };
    if (!(lahde.w > 0) || !(lahde.h > 0)) return;
    if (!(maskiOsuus > 0)) {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(bm, lahde.x, lahde.y, lahde.w, lahde.h, ala.x, ala.y, ala.w, ala.h);
      ctx.restore();
      return;
    }
    const aw = Math.max(1, Math.ceil(ala.w));
    const ah = Math.max(1, Math.ceil(ala.h));
    const apu = this.varaaApu(aw, ah);
    if (!apu) return;
    const g = apu.getContext('2d');
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, aw, ah);
    g.imageSmoothingQuality = 'high';
    g.save();
    g.translate(-ala.x, -ala.y);
    g.drawImage(bm, lahde.x, lahde.y, lahde.w, lahde.h, ala.x, ala.y, ala.w, ala.h);
    const r = maskiOsuus;
    const kaistaW = kohde.w * r;
    const kaistaH = kohde.h * r;
    const reunat = [
      { x: kohde.x, y: kohde.y, w: kaistaW, h: kohde.h, x1: kohde.x, y1: kohde.y, x2: kohde.x + kaistaW, y2: kohde.y },
      { x: kohde.x + kohde.w - kaistaW, y: kohde.y, w: kaistaW, h: kohde.h, x1: kohde.x + kohde.w, y1: kohde.y, x2: kohde.x + kohde.w - kaistaW, y2: kohde.y },
      { x: kohde.x, y: kohde.y, w: kohde.w, h: kaistaH, x1: kohde.x, y1: kohde.y, x2: kohde.x, y2: kohde.y + kaistaH },
      { x: kohde.x, y: kohde.y + kohde.h - kaistaH, w: kohde.w, h: kaistaH, x1: kohde.x, y1: kohde.y + kohde.h, x2: kohde.x, y2: kohde.y + kohde.h - kaistaH },
    ];
    g.globalCompositeOperation = 'destination-out';
    for (const reuna of reunat) {
      if (!(reuna.w > 0) || !(reuna.h > 0)) continue;
      const liuku = g.createLinearGradient(reuna.x1, reuna.y1, reuna.x2, reuna.y2);
      liuku.addColorStop(0, 'rgba(0,0,0,1)');
      liuku.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = liuku;
      g.fillRect(reuna.x, reuna.y, reuna.w, reuna.h);
    }
    g.globalCompositeOperation = 'source-over';
    g.restore();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(apu, 0, 0, aw, ah, ala.x, ala.y, aw, ah);
    ctx.restore();
  }

  varaaApu(w, h) {
    const doc = globalThis.document;
    if (!doc) return null;
    if (!this.apu) this.apu = doc.createElement('canvas');
    if (this.apu.width < w || this.apu.height < h) {
      this.apu.width = Math.max(this.apu.width, w);
      this.apu.height = Math.max(this.apu.height, h);
    }
    return this.apu;
  }

  vapautaApu() {
    if (!this.apu) return;
    this.apu.width = 0;
    this.apu.height = 0;
    this.apu = null;
  }

  /**
   * Lehti ImageBitmapiksi. Kutsuja SULKEE sen heti piirron jälkeen —
   * välimuistia ei ole, koska yksi purettu lehti on kymmeniä megatavuja
   * ja kymmenen samanaikaista tappaisi puhelimen välilehden.
   */
  /**
   * PIENI LRU — VAIN PIENILLE LEHDILLE.
   *
   * Maailmanäkymässä lavalla on 25 pikkulehteä, ja jokainen kaista
   * koskee useaan niistä: ilman välimuistia sama lehti purettaisiin
   * yhä uudestaan. Pikkulehti on muutamia satoja kilotavuja purettuna
   * ja mahtuu hyvin budjettiin.
   *
   * ISO LEHTI SULJETAAN HETI. Puhelimen maalehti on 3200 x 3200 eli
   * 41 Mt purettuna, eikä sellaista pidetä muistissa hetkeäkään
   * pidempään kuin kooste kestää (speksin muistikuri).
   */
  palauta(href, bm) {
    const tavut = (bm.width ?? 0) * (bm.height ?? 0) * 4;
    if (!bm.close || !(tavut > 0) || tavut > LEHDEN_KATTO_TAVUT) {
      bm.close?.();
      return;
    }
    const vanha = this.varasto.get(href);
    if (vanha && vanha.bm !== bm) vanha.bm.close?.();
    this.varasto.delete(href);
    this.varasto.set(href, { bm, tavut });
    this.varastonTavut = [...this.varasto.values()].reduce((s, v) => s + v.tavut, 0);
    while (this.varastonTavut > VARASTON_KATTO_TAVUT && this.varasto.size > 1) {
      const [avain, arvo] = this.varasto.entries().next().value;
      this.varasto.delete(avain);
      this.varastonTavut -= arvo.tavut;
      arvo.bm.close?.();
    }
  }

  tyhjennaVarasto() {
    for (const arvo of this.varasto.values()) arvo.bm.close?.();
    this.varasto.clear();
    this.varastonTavut = 0;
  }

  async avaaKuva(href) {
    const talteen = this.varasto.get(href);
    if (talteen) {
      // Käyttöjärjestys tuoreimmaksi (Mapin lisäysjärjestys = LRU).
      this.varasto.delete(href);
      this.varasto.set(href, talteen);
      return talteen.bm;
    }
    /*
     * PURKU POIS PÄÄSÄIKEELTÄ. createImageBitmap(blob) purkaa lehden
     * työsäikeessä; pääsäikeelle jää pelkkä blitti. Varapolku
     * (Image + decode) on siltä varalta, ettei blobia saa haettua.
     *
     * PIENENNYSTÄ EI PYYDETÄ. `resizeWidth/Height` houkuttelisi, mutta
     * kohde voi olla valtava: yleislehti on syväzoomissa 29751 x 13385
     * lavapikseliä, ja siihen kokoon pyydetty pienennys jumitti
     * välilehden 42 sekunniksi (mitattu). Rajaus tehdään piirrossa —
     * ks. piirraLehti, joka piirtää vain sen palan lähteestä, joka
     * oikeasti osuu koostettavalle alueelle.
     */
    if (typeof createImageBitmap === 'function' && typeof fetch === 'function') {
      try {
        const vastaus = await fetch(href);
        const mytty = await vastaus.blob();
        return await createImageBitmap(mytty);
      } catch { /* varapolulle */ }
    }
    try {
      const kuva = new Image();
      kuva.decoding = 'async';
      kuva.src = href;
      await (kuva.decode?.() ?? Promise.resolve());
      if (!(kuva.naturalWidth > 0)) return null;
      if (typeof createImageBitmap !== 'function') return kuva;
      return await createImageBitmap(kuva);
    } catch {
      return null;
    }
  }

  /* --- näkyvyys ------------------------------------------------------ */

  otaKayttoon() {
    const body = globalThis.document?.body;
    if (!body || !this.tila) return;
    if (!body.classList.contains(KAYTOSSA_LUOKKA)) body.classList.add(KAYTOSSA_LUOKKA);
    this.paikoitaCanvas();
  }

  /**
   * VAIN POLTETUT LEHDET PIILOON.
   *
   * Merkki on kuvakohtainen eikä ryhmäkohtainen, jotta kesken pelin
   * saapuva naapurilehti saa häivähtää svg:ssä loppuun ennen kuin se
   * poltetaan (LEHTIVAHTI ajastaa koosteen 480 ms:n päähän). Sama
   * `display: none` -sääntö kuin .fokus-piilossa: piilossa oleva kuva
   * ei saa jäädä selaimen purettavaksi.
   */
  merkitsePoltetut(tavoite) {
    const kerros = this.ui.fokuskarttaKerros;
    if (!kerros) return;
    const joukko = new Set(tavoite.kuvat.map((k) => k.el));
    for (const kuva of kerros.querySelectorAll('image.fokuskartta-kuva')) {
      kuva.classList.toggle('karttapohja-poltettu', joukko.has(kuva));
    }
  }

  /** Merkit pois: svg piirtää pohjan taas kokonaan itse. */
  puhdistaPoltetut() {
    const kerros = this.ui.fokuskarttaKerros;
    if (!kerros) return;
    for (const kuva of kerros.querySelectorAll('image.karttapohja-poltettu')) {
      kuva.classList.remove('karttapohja-poltettu');
    }
  }

  /** Svg:n pohjat esiin, koosteen SISÄLTÖ säilyy (ks. paivita). */
  piilota() {
    const body = globalThis.document?.body;
    if (body?.classList.contains(KAYTOSSA_LUOKKA)) body.classList.remove(KAYTOSSA_LUOKKA);
  }

  poistaKaytosta() {
    this.piilota();
    this.puhdistaPoltetut();
    this.tila = null;
    this.nakyva = null;
    this.vapautaApu();
    this.tyhjennaVarasto();
  }
}
