/*
 * TASOKARTAN LATAUSPORTTI JA LEPOTILAN SIJAISOLIO (erä 5b; omistaja
 * 5.9.2026 ilta: *"laita laiskoitus työn alle"*; docs/moduulit/
 * karttapallo.md luvut 3, 5b ja 10.3).
 *
 * MIKSI. Karttapallo on pelilauta (Raamattu KARTTAPALLO ON PELILAUTA) ja
 * tasokartta jää vivun `?lauta=kartta` taakse linssipinnaksi (Raamattu
 * VANHA KARTTA JAA VIVUN TAAKSE). Vaiheessa 1 kartta pantiin LEPOTILAAN:
 * se ei piirrä pallolaudalla mitään. Lataus jäi silti maksettavaksi —
 * js/ui.js toi js/kartta.js:n ja sen omat aineistopakat STAATTISESTI,
 * joten ne haettiin ja jäsennettiin joka käynnistyksessä (mitattu
 * 5.9.2026: 0,89 Mt lähdekoodia pallolaudalla, karttapallo.md 5b).
 *
 * MALLI: SIJAISOLIO, EI `await` JOKA HERÄTYKSEN EDELLÄ. `ui.kartta` on
 * aina olio, ja sitä kutsutaan SYNKRONISESTI kymmenistä kohdista myös
 * pallolaudalla — mitattu Chromiumilla 5.9.2026: kiertava 133 kutsua,
 * fitViewBox, asennaPanorointi, nuku ja boardBounds jo avausnäkymässä,
 * dieRestingSpot jokaisessa nopanheitossa. Yhtäkään niistä ei voi
 * muuttaa odottavaksi, joten portti on OLIO eikä await: peli saa
 * `NukkuvaKartta`-sijaisen, ja `js/ui.js varmistaKartta` vaihtaa sen
 * oikeaan `Kartta`-olioon vasta kun kartta tarvitaan (vipu kartalle,
 * linssikartta pallon päälle, pallon varapolku).
 *
 * KAKSI TOTUUTTA EI SYNNY: js/kartta.js:n `Kartta` PERII tämän luokan,
 * joten nukkuvan kartan pienet metodit (boardBounds, kiertava,
 * dieRestingSpot, maatiedotHalutaan …) ovat samaa koodia kummallakin.
 * Raskaat metodit ovat täällä NUKKUVINA TYNKINÄ, jotka hereillä oleva
 * Kartta korvaa — sama sääntö kuin lepotilan porteilla: yksi portti
 * metodin alussa, ei hajautettuja ehtoja kutsujissa.
 *
 * YHDEN TIEDOSTON VERSIO (tools/build-standalone.mjs) niputtaa moduulit
 * samaan näkyvyysalueeseen ja poistaa import-rivit, joten dynaaminen
 * tuonti kaatuisi siellä (docs/moduulit/linssit.md 2.1). Siksi lataus
 * katsoo ensin, onko `Kartta` jo samassa näkyvyysalueessa, ja käyttää
 * sitä: nipussa laiskoitus ei maksa eikä anna mitään, ja tasokartta
 * toimii siellä kuten ennenkin (savuke-dist).
 */
import { pyramidinArkki } from './laattapyramidi.js';

/*
 * Kuinka paljon pergamenttia jatketaan kartan alle avaustekstiä varten.
 *
 * NOLLA 25.8.2026 (etusivu-uudistus): teksti oli hetken yhtenä palstana
 * kartan PÄÄLLÄ, joten kaistalle ei ollut käyttöä.
 *
 * TAKAISIN 26.8.2026, ilta (omistajan tilaus): *"Aloitussivulla saisi
 * olla maailmankartta pienemmällä ja asettelu niin että maailmankartan
 * päällä olisi 'Maailman ympäri...' -otsikko ja sen alapuolella olisi
 * tyhjää vaaleaa karttapohjaa ja sen päälle tulisi muut tekstit."*
 *
 * Juuri tämä vakio pienentää kartan: rajauslaatikkoa jatketaan alaspäin,
 * jolloin sovitus laskee mittakaavan isommalle laatikolle ja lauta
 * kutistuu ruudun ylälohkoon. Alle jäävä pergamentti on se tyhjä vaalea
 * karttapohja, jonka päälle avausteksti asettuu (js/ui.js placeIntro
 * mittaa rajan .intro-arkille).
 *
 * 1.2 = lauta vie ylälohkon ja pergamenttia jatketaan 1,2-kertaisesti
 * sen alle. Leveällä ruudulla (korkeus rajoittaa) lauta asettuu noin
 * 45 %:iin paneelin korkeudesta; kapealla pystyruudulla leveys rajoittaa
 * jo ennestään eikä kaista pienennä lautaa, vaan nostaa sen ylös.
 */
export const INTRO_SPACE = 1.2;

/**
 * NUKKUVA TASOKARTTA: se osa Kartta-luokasta, joka toimii ilman
 * js/kartta.js:ää.
 *
 * Kaksi käyttäjää: (1) sijaisolio, jonka js/ui.js rakentaa aina — se on
 * `ui.kartta` niin kauan kuin tasokarttaa ei ole ladattu; (2) Kartan
 * kantaluokka, jolloin nämä metodit ovat hereillä olevan kartan omia.
 *
 * Mitä tänne kuuluu: metodi, jota kutsutaan PALLOLAUDALLA (mitattu, ks.
 * tiedoston alku) tai jonka nukkuva kartta muuten tarvitsee. Mitä ei:
 * mikään, mikä koskee svg#boardin kerroksiin, kameraan tai eleisiin —
 * ne ovat tyngiksi asti täällä ja oikeasti js/kartta.js:ssä.
 */
export class NukkuvaKartta {
  constructor(ui) {
    this.ui = ui;
    // Kesken oleva kamera-ajo (ks. ajaKamera); null kun kamera on levossa.
    this.kameraAjo = null;
    /*
     * ============ LEPOTILA: TASOKARTTA POIS TIELTÄ ====================
     *
     * Omistaja 5.9.2026 (Raamattu, KARTTAPALLO ON PELILAUTA): *"Kunhan
     * vanha kartta pysyy pois tieltä eikä hidasta ollenkaan uuden kartan
     * toimintaa."* Kun pelilauta on karttapallo (js/ui-apurit.js
     * lautaValinta, js/pallolauta/lauta.js), tasokartta on LEPOTILASSA:
     * svg#board on tyhjä, eikä yhtään kerrosta synny.
     *
     * MITÄ LEPOTILA OHITTAA (mitattu 5.9.2026, docs/moduulit/
     * karttapallo.md luku 3: Ateenassa ~1 650 SVG-elementtiä, koko
     * pyramidiliikenne ja ~7 Mt keosta): ui.render ei kutsu drawBoardForia
     * eikä yhtään kerrospiirtoa (staattinen, laattapyramidi, karttanimet,
     * maastonimet, fokuskohteet, eläintäyt, fokuspiste, maatummennus,
     * fokuslaatta, matkareitit, kohteet, nappulat, lento), joten
     * paivitaPyramidi, taydennaTaide, karttanimien ladonta ja fokusmitat
     * eivät koskaan käynnisty; täällä fitViewBox, ajaKamera,
     * ajastaMannerZoom, zoomaaMantereelle ja tarkistaFokusZoom palaavat
     * heti, ja karttaruudun eleet (asennaPanorointi) ohitetaan yhdestä
     * portista. YKSI PORTTI METODIN ALUSSA, ei hajautettuja ehtoja.
     *
     * MYÖS MODUULIT LAISKOITETTIIN (erä 5b, omistaja 5.9.2026 ilta:
     * *"laita laiskoitus työn alle"*): js/kartta.js ja sen omat
     * aineistopakat ladataan vasta kun kartta oikeasti tarvitaan, ks.
     * lataaTasokartta alempana. Sitä ennen ui.kartta on tämä sijaisolio.
     *
     * Kartta herää linssin tai siirron ajaksi (heraa → drawBoardFor) ja
     * nukkuu takaisin (nuku → kerrosten purku ja svg tyhjäksi). Sijainen
     * SYNTYY NUKKUVANA: pallolaudalla mitään ei piirretä ennen herätystä,
     * ja tasokartalla (?lauta=kartta) mount herättää sen heti moduulin
     * saavuttua (js/ui.js heraaTasokartta).
     */
    this.lepotila = true;
  }

  /**
   * Onko tämä pelkkä SIJAINEN eli onko js/kartta.js vielä lataamatta?
   *
   * Yksi kysymys, yksi vastaus: js/ui.js varmistaKartta lukee tästä,
   * tarvitseeko olio vaihtaa, ja js/pallolauta/linssikartta.js siitä,
   * pitääkö avausta jatkaa vasta latauksen jälkeen. Hereillä oleva
   * Kartta vastaa epätoden.
   */
  get sijainen() {
    return true;
  }

  /**
   * Tasokartta lepotilaan: ajot seis, kerrokset puretaan ja svg#board
   * jää tyhjäksi. Palauttaa false, jos kartta jo nukkui.
   */
  nuku() {
    if (this.lepotila) return false;
    this.lepotila = true;
    // Lähikuva, liuku ja kamera-ajo puretaan kirjaamatta välivaihetta —
    // sama polku kuin laudan vaihdossa (drawBoardFor → nollaaAloitusZoom).
    this.nollaaAloitusZoom();
    this.ui.puraLauta?.();
    return true;
  }

  /**
   * SIJAISEN HERÄTYS: moduuli ladataan ja olio vaihdetaan.
   *
   * Palauttaa AINA false — sijainen ei voi herätä synkronisesti, koska
   * js/kartta.js tulee verkosta (tai SW-välimuistista). Kutsuja saa siis
   * saman vastauksen kuin hereillä olevalta kartalta ("en herännyt"),
   * eikä piirrä turhaan; varsinaisen piirron tekee js/ui.js
   * heraaTasokartta, kun moduuli on paikallaan. Hereillä olevan kartan
   * oma heraa (js/kartta.js) korvaa tämän.
   */
  heraa() {
    void this.ui.heraaTasokartta?.();
    return false;
  }

  /*
   * ============ KARTAN SIIRTOKUORI ==================================
   *
   * Omistajan tilaus 26.8.2026 ilta: *"scrollaus parempi mutta ei
   * taysin sujuva"* — wrapper-siirto.
   *
   * KAIKKI kameran CSS-muunnokset (panorointi, nipistys, zoomiliuku,
   * kamera-ajo) kirjoitetaan tähän kuoreen — EI SVG-juureen. Ero on
   * mitattu Chromiumin CDP-mittarilla: kun siirto kirjoitettiin
   * `svg.style.transform`iin, skriptattu panorointi tuotti ~1,05
   * asettelua kehystä kohti, koska SVG:n oma asettelu lasketaan juuren
   * muunnoksen läpi ja jokainen kehys likasi sen. Tavallisen divin
   * muunnos ei koske asetteluun lainkaan
   * (tools/savukkeet/savuke-panorointi.mjs vartioi lukua).
   *
   * KAAVA EI MUUTU, VAIN KOHDE-ELEMENTTI. Kuori on paneelin kokoinen
   * ja alkaa paneelin vasemmasta yläkulmasta, joten muunnoksen origo
   * (0 0) osuu täsmälleen siihen, mitä eleiden laskenta on aina
   * olettanut. SVG jää kuoren sisään entisellään: viewBox ja
   * inline-mitat (width/height/flex/align-self) ovat yhä sen omia,
   * eikä `svg.getBoundingClientRect()` menetä mitään — se palauttaa
   * yhä kuoren muunnoksen mukaisen ruutupaikan, koska kuori on sen
   * esi-isä.
   *
   * Varana SVG itse: vanhassa DOM:ssa (yhden tiedoston koeversiot,
   * testisivut) kuorta ei välttämättä ole, ja silloin kartta liikkuu
   * kuten ennenkin.
   */
  get kuori() {
    return this.ui.karttaKuori ?? this.ui.svg;
  }

  /**
   * Pelisisällön rajauslaatikko: kaupungit nimineen, reitit, lentokaaret ja
   * koristeet. Näkymä sovitetaan tähän eikä koko karttapohjaan, jolloin lauta
   * näkyy mahdollisimman suurena eikä tyhjää merta jää reunoille.
   */
  boardBounds() {
    const { board, pack } = this.ui.game;
    /*
     * PYRAMIDILAUDALLA MAAILMA ON ARKKI (omistajan iPad-havainto
     * 30.8.2026: *"Toiseksi laajin kartta ei näytä koko karttaa vaan
     * leikkaa ylhäältä ja alhaalta karttaa pois."*).
     *
     * Alla oleva laskenta johtaa rajat kaupungeista, reiteistä ja
     * koristeista — siis SISÄLLÖSTÄ, joka on peräisin vanhalta
     * laudalta. Kun kartta on laattapyramidi, se on väärä mitta:
     * mitattu laatikko oli y 254…5345, mutta arkin kartta-ala on
     * y −611…5811 ja koko paperi kehyksineen −1046…6261. Ero
     * leikkasi ylhäältä 865 ja alhaalta 466 yksikköä juuri sitä
     * aluetta, jonka takia arkkia laajennettiin (Grönlannin kärki,
     * Huippuvuoret, JÄÄMERI-nimiö) — ja piilotti paperimarginaalin ja
     * kehyksen, jotka uloimmille tasoille tehtiin.
     *
     * Arkki tulee pyramidin luettelosta (js/laattapyramidi.js
     * pyramidinArkki), eli samasta lähteestä kuin laattojen paikat.
     * Kopio, koska aloitusnäkymä kasvattaa laatikkoa eikä luettelon
     * oliota saa muuttaa.
     */
    const arkki = pyramidinArkki(pack.id);
    if (arkki) return this.withIntroSpace({ ...arkki });
    // Valmiiksi rajattu lauta (esim. Maailma) käyttää omaa kehystään.
    // Kopio, koska aloitusnäkymä kasvattaa laatikkoa eikä pakkaa saa muuttaa.
    if (pack.map.frame) return this.withIntroSpace({ ...pack.map.frame });

    const pts = [];
    // Karkea arvio nimikirjaimen leveydestä. Aloituskaupungit piirtyvät
    // isommalla versaalifontilla (21px, kirjainväli 0.1em), joten niissä
    // kirjain vie puolitoista kertaa tavallisen levyn — muuten esimerkiksi
    // Aasian Tokio jäisi rajauksen ulkopuolelle ja leikkautuisi reunaan.
    const CHAR_W = 9.5;
    const START_CHAR_W = 15.2;
    const STROKE = 2; // nimen vaalea reunusviiva levittää tekstiä hieman
    for (const c of board.cities) {
      pts.push([c.x - 34, c.y - 34], [c.x + 34, c.y + 34]);
      const w = c.name.length * (c.start ? START_CHAR_W : CHAR_W) + STROKE * 2;
      const anchor = c.la ?? 'middle';
      const lx = c.x + (c.lx ?? 0);
      const ly = c.y + (c.ly ?? -(c.start ? 28 : 19));
      const x0 = anchor === 'start' ? lx : anchor === 'end' ? lx - w : lx - w / 2;
      pts.push([x0, ly - 18], [x0 + w, ly + 6]);
    }
    for (const e of board.edges) {
      for (const p of e.poly) pts.push(p);
    }
    for (const route of this.ui.game.airRoutes) {
      const a = board.cityById.get(route.a);
      const b = board.cityById.get(route.b);
      pts.push([(a.x + b.x) / 2 + (b.y - a.y) * 0.12, (a.y + b.y) / 2 - (b.x - a.x) * 0.12]);
    }
    const d = pack.decor;
    pts.push(
      [d.compass.x - d.compass.r - 14, d.compass.y - d.compass.r - 26],
      [d.compass.x + d.compass.r + 14, d.compass.y + d.compass.r + 14],
    );
    const titleHalf = Math.max(110, d.mapLabel.length * 12.5);
    pts.push([d.mapLabelPos.x - titleHalf, d.mapLabelPos.y - 34], [d.mapLabelPos.x + titleHalf, d.mapLabelPos.y + 60]);
    if (d.ship) pts.push([d.ship.x - 62, d.ship.y - 56], [d.ship.x + 62, d.ship.y + 46]);
    if (d.serpent) pts.push([d.serpent.x - 96, d.serpent.y - 26], [d.serpent.x + 96, d.serpent.y + 30]);

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of pts) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    const pad = 12;
    const box = { x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2, h: maxY - minY + pad * 2 };
    /*
     * Kiertävällä kartalla vaakarajaus on laudan leveys, ei sisällön.
     *
     * Sisällöstä laskettu laatikko on täällä väärä mitta: rannikot ja
     * reitit JATKUVAT laudan reunan yli, koska sauman ylittävät viivat
     * pidetään yhtenäisinä. Mitattuna laatikko oli 24860 yksikköä eli
     * yli kaksi maapalloa, ja kaikki siitä johdettu meni mukana —
     * kierron jakso, elementin leveys ja loitonnuksen raja.
     *
     * Pystysuunta lasketaan yhä sisällöstä: siellä ei kierretä.
     */
    if (this.kiertava()) {
      box.x = 0;
      box.w = pack.map.width;
    }
    // Aloitusnäkymässä pergamenttia jatketaan kartan alapuolelle, jotta
    // avausteksti mahtuu siihen ja lauta nousee ruudun yläreunaan. Näkymä
    // keskittää laatikon, joten alaosan kasvattaminen nostaa karttaa ylös.
    return this.withIntroSpace(box);
  }

  /**
   * Aloitusnäkymässä pergamenttia jatketaan kartan alapuolelle avaustekstiä
   * varten. Näkymä kiinnitetään yläreunaan (fitViewBox), joten kasvatus
   * nostaa laudan ruudun ylälaitaan ja jättää tekstille tyhjän alaosan.
   */
  withIntroSpace(box) {
    if (!this.introKaistaKaytossa()) return box;
    return { ...box, h: box.h * (1 + INTRO_SPACE) };
  }

  /**
   * Onko avaustekstin kaista käytössä juuri nyt?
   *
   * Kaista on VASTA PORTIN JÄLKEEN (omistajan aloitusnäkymä pidetään
   * ennallaan): Aloita seikkailu -ruudussa lauta on iso ja keskellä,
   * ja vasta napin painalluksesta se kutistuu ylälohkoon ja alle
   * jäävälle pergamentille kirjoittuu avausteksti. Katselutila
   * (?lauta=) ei näytä avaustekstiä lainkaan, joten siellä kaistaa ei
   * ole koskaan — muuten lauta kutistuisi ja jäisi yläreunaan
   * (omistajan havainto).
   */
  introKaistaKaytossa() {
    return this.ui.game.phase === 'pickstart' && !this.ui.katselu && Boolean(this.ui.aloitettu);
  }

  /**
   * Laudan oma korkeus rajauslaatikossa: aloitusnäkymässä laatikkoa on
   * jatkettu avaustekstin kaistalla (withIntroSpace), joten lauta on
   * vain sen yläosa. Yksi paikka, josta sekä rajaus, aloitusZoom että
   * js/ui.js placeIntro lukevat saman luvun.
   */
  laudanKorkeus(box) {
    return this.introKaistaKaytossa() ? box.h / (1 + INTRO_SPACE) : box.h;
  }

  /** Kiertääkö tämän laudan kartta ympäri? */
  kiertava() {
    return this.ui.game?.pack?.map?.kiertava === true;
  }

  /**
   * Ollaanko avausnäkymässä, jossa kartalla on oma lähikuvansa ja
   * avausteksti? Katselutila (?lauta=) on vaiheeltaan pickstart mutta
   * näyttää laudan kuin pelissä. Sama ehto on fitViewBoxissa.
   */
  avausNakymassa() {
    return this.ui.game.phase === 'pickstart' && !this.ui.katselu;
  }
  /**
   * Onko maiden tiedot -tila päällä: napista tai varusteesta.
   *
   * Kaksi lähdettä yhdelle tilalle tarvitsee yhden totuuden, tai
   * varusteen vaihto sammuttaisi napilla avatun tilan.
   */
  maatiedotHalutaan() {
    // Vain varusteesta (omistajan tarkennus 10.8.2026 ilta: "maiden
    // tietojen vapaasta katsomisesta missä tahansa sijainnissa pitää
    // tehdä oma varuste") — varusteeton ohituspolku poistui.
    return this.ui.linssiValittu === 'maatiedot';
  }

  /** Napin ulkoasu ja näkyvyys: vain laudoilla, joilla on maiden rajat. */
  paivitaMaalehtiNappi() {
    const nappi = document.getElementById('maalehti-nappi');
    if (!nappi) return;
    const rajat = Boolean(this.ui.game?.pack?.map?.countryShapes);
    // Nappi näkyy vasta kun Maiden tiedot on KYTKETTY PÄÄLLE
    // päävalikosta (omistajan tarkennus 10.8.2026 ilta: "pitäisi olla
    // oletuksena poissa näkyvistä. se tulisi vain jos kyseinen varuste
    // kytketään päälle") — pelkkä omistus ei riitä. Kartalla nappi
    // toimii varusteen pikakatkaisijana.
    nappi.hidden = !rajat || this.avausNakymassa() || !this.maatiedotHalutaan();
    nappi.setAttribute('aria-pressed', String(this.maatiedotHalutaan()));
  }

  /**
   * Kartan kalusteet zoomitason mukaan.
   *
   * NIMI ON PERUA +/- -PAINIKKEILTA, jotka poistettiin 27.8.2026
   * (omistajan tilaus): zoomi hoidetaan eleillä, ja portaiden päät
   * tuntee zoomaaPainikkeella itse. Kutsupaikkoja on kymmeniä — joka
   * piirto, joka kamera-ajo — ja niistä jokainen tarvitsee yhä Maiden
   * lehdet -napin päivityksen, joten metodi jäi paikalleen sen
   * ainoana tehtävänään.
   */
  paivitaZoomiNapit() {
    this.paivitaMaalehtiNappi();
  }

  /** Kartan koordinaatit kartta-alueen pikseleiksi. */
  mapToPane({ x, y }) {
    const point = this.ui.svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const screen = point.matrixTransform(this.ui.svg.getScreenCTM());
    const rect = this.ui.mapPane.getBoundingClientRect();
    return { x: screen.x - rect.left, y: screen.y - rect.top };
  }

  /**
   * Nopan lepopaikka: avomerta, jotta noppa ei jää kenenkään nappulan tai
   * kaupungin päälle. Paikka arpoutuu hieman joka heitolla, jotta noppa ei
   * osu aina täsmälleen samaan kohtaan. Päiväkirjakortti hakeutuu
   * merellisimpään kulmaan — usein samaan, jonne nopan paikka on valittu —
   * joten kortin kulmaa väistetään peilaamalla paikka vastakkaiselle
   * sivulle (tai pakan omaan varapaikkaan decor.dieSpotAlt).
   */
  dieRestingSpot() {
    const pane = this.ui.mapPane;
    const w = pane.clientWidth || 600;
    const h = pane.clientHeight || 600;
    const decor = this.ui.game.pack.decor;
    let spot = decor.dieSpot;
    const corner = this.ui.factCard?.hidden ? null : this.ui.factCard?.dataset.corner;
    if (corner) {
      const spotCorner = (spot.y < 0.5 ? 't' : 'b') + (spot.x < 0.5 ? 'l' : 'r');
      if (spotCorner === corner) spot = decor.dieSpotAlt ?? { x: 1 - spot.x, y: spot.y };
    }
    const jitter = this.ui.dieJitter ?? { x: 0, y: 0 };
    return {
      x: w * (spot.x + jitter.x),
      y: h * (spot.y + jitter.y),
    };
  }

  /*
   * ============ NUKKUVAT TYNGÄT =====================================
   *
   * Nämä kaikki ovat js/kartta.js:ssä oikeina metodeina, ja hereillä
   * oleva Kartta korvaa ne perinnällä. Täällä ne ovat sitä, mitä
   * lepotilan portit tekevät jo nyt: palaavat heti. Tyngät ovat
   * OLEMASSA eivätkä puutu, jotta pallolaudan polku ei kaadu
   * TypeErroriin, jos jokin harvinainen haara kutsuu karttaa nukkuvana
   * (esim. pallon varapolku ennen kuin moduuli on ladattu).
   *
   * Sijainen ei myöskään omista mitään: sillä ei ole svg-kerroksia,
   * kamera-ajoa eikä eleitä, joten purettavaa ei ole.
   */
  fitViewBox() { /* nukkuu: näkymää ei soviteta */ }

  asennaPanorointi() { /* nukkuu: karttaruudun eleitä ei asenneta */ }

  ajastaMannerZoom() { /* nukkuu: mannerzoomia ei ajasteta */ }

  zoomaaMantereelle() { /* nukkuu */ }

  tarkistaFokusZoom() { /* nukkuu */ }

  zoomaaAloituskartta() { /* nukkuu: lähikuvaa ei ole */ }

  nollaaAloitusZoom() { /* nukkuu: purettavaa lähikuvaa ei ole */ }

  ankkuroiNoppa() { /* nukkuu: noppa on pallon kuoressa */ }

  merkitseNopanPaikka() { /* nukkuu: laudan koordinaatteja ei ole */ }

  pysaytaKameraAjo() { /* nukkuu: ajoa ei ole */ }

  /** Kamera-delegaatin rajapinta (js/ui.js kamera()): nukkuva ei aja. */
  ajaKamera() {
    return Promise.resolve(false);
  }

  kameraAjossa() {
    return false;
  }

  kameranTila() {
    return null;
  }

  siirtoZoomiKerroin() {
    return 1;
  }

  zoomTarpeen() {
    return false;
  }

  mapObstacles() {
    return [];
  }

  maidenBbox() {
    return null;
  }

  kuorenMitat() {
    return null;
  }

  /** Ruutupiste sellaisenaan: nukkuvalla kartalla kuori ei ole siirtynyt. */
  paneKuoreen(piste) {
    return piste;
  }

}

/*
 * ============ LATAUSPORTTI ========================================
 *
 * Yksi portti, yksi lupaus: ensimmäinen kutsuja käynnistää tuonnin,
 * kaikki muut odottavat samaa lupausta, ja valmis tulos jää muistiin.
 * Mukana tulevat myös ne AINEISTOPAKAT, joita vain tasokartta lukee
 * (js/ui.js avaaMaastonimi ja drawMaasto) — ne olivat samaa
 * käynnistyksen kuormaa kuin itse kartta.
 *
 * js/packs/maailmankartta-syvyys.js EI ole listalla: MERISYVYYS on ollut
 * pois käytöstä (js/ui.js drawBoard kertoo miksi), ja pakka ladattiin
 * silti joka käynnistyksessä — 260 kt turhaa. Tuonti poistettiin
 * kokonaan (tests/sw.test.mjs NIPUTTAMATTOMAT kertoo saman).
 */
let osat = null;
let lupaus = null;

/** Ladatut osat tai null, jos tasokarttaa ei ole vielä tuotu. */
export function tasokartanOsat() {
  return osat;
}

/**
 * Yhden tiedoston versio: moduulit ovat jo samassa näkyvyysalueessa.
 *
 * try/catch eikä `typeof`, koska nimi voi olla myös ajallisessa
 * kuolleessa vyöhykkeessä (niputettu `class Kartta` ennen omaa
 * julistustaan) — silloinkin vastaus on "ei vielä".
 */
function niputettu() {
  try {
    /* eslint-disable no-undef */
    return {
      Kartta,
      MAASTO_TEKSTIT,
      MAASTO_TEKSTIT_MALLI,
      MAASTON_VARJOSTUS,
    };
    /* eslint-enable no-undef */
  } catch {
    return null;
  }
}

/**
 * Lataa tasokartan moduulin ja sen omat aineistopakat. Muistaa lupauksen,
 * joten kutsua ei tarvitse suojata kutsupaikoissa.
 *
 * @returns {Promise<{Kartta: Function, MAASTO_TEKSTIT: object,
 *   MAASTO_TEKSTIT_MALLI: object, MAASTON_VARJOSTUS: object}>}
 */
export function lataaTasokartta() {
  if (osat) return Promise.resolve(osat);
  lupaus ??= tuoOsat().then((tulos) => {
    osat = tulos;
    lupaus = null;
    return tulos;
  });
  return lupaus;
}

async function tuoOsat() {
  const nipussa = niputettu();
  if (nipussa?.Kartta) return nipussa;
  const [kartta, tekstit, malli, varjostus] = await Promise.all([
    import('./kartta.js'),
    import('./packs/maasto-tekstit.js'),
    import('./packs/maasto-tekstit-malli.js'),
    import('./packs/maailmankartta-varjostus.js'),
  ]);
  return {
    Kartta: kartta.Kartta,
    MAASTO_TEKSTIT: tekstit.MAASTO_TEKSTIT,
    MAASTO_TEKSTIT_MALLI: malli.MAASTO_TEKSTIT_MALLI,
    MAASTON_VARJOSTUS: varjostus.MAASTON_VARJOSTUS,
  };
}
