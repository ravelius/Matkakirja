/*
 * KARTTA — laudan kamera: viewbox, zoomiportaat, mannerzoom,
 * aloituszoom, zoomiliuku ja koordinaattimuunnokset (remontin M7a,
 * suunnitelma scratchpadin m7-suunnitelma.md → docs/moduulirakenne-
 * suunnitelma.md:n M7-rivi).
 *
 * Malli B kuten lehti.js: Kartta saa ui-viitteen rakentimessa eikä tuo
 * ui.js:ää (ei kehäriippuvuutta; ui.js tuo tämän). Metodien ja kenttien
 * nimet ovat siirrossa ennallaan. Kameratila (panX, zoomSkaala,
 * contentBox…) asuu TOISTAISEKSI ui-oliolla (this.ui.X), koska jäävät
 * rypäät (panorointi M7b, rasterointi M7c, piirto M7d) lukevat ja
 * kirjoittavat samaa tilaa — tila muuttaa kartta-olioon vasta
 * omistajametodiensa mukana, jotta jokainen vaihe on puhdas siirto.
 *
 * iOS-korjaukset (M7-suunnitelman sitova lista) siirtyvät kommentteineen
 * sanatarkasti — älä muuta niiden mekanismeja.
 */
import {
  vaimennaTausta, palautaTausta,
} from './ambience-stream.js';
import { stopDiaryVoice, stopIntroVoice } from './luenta.js';
import { sfx } from './sound.js';

// Kuinka paljon pergamenttia jatketaan kartan alle avaustekstiä varten.
export const INTRO_SPACE = 0.5;
// Kuinka paljon lautaa lasketaan yläreunasta aloitusnäkymässä.
const INTRO_TOP = 0.05;
/*
 * Mantereiden lähikuva puhelimella. Ilme hiotaan ensin Euroopalla
 * (omistajan päätös); muut laudat lisätään tähän settiin sitä mukaa kuin
 * ne on käyty läpi.
 */
const ZOOMATTAVAT = new Set(['europe', 'maailmankartta']);
const MANNER_ZOOM = 2.3;        // vanha kiinteä kerroin; nykyään portaat lasketaan

/*
 * Zoomiportaat (omistajan toive: painikkeet kaikille alustoille).
 *
 * Portaat kerrotaan siitä, kuinka LEVEÄ pala lautaa näkyy — ei siitä,
 * moninkertainen lähikuva on yleiskuvaan.
 *
 * Ero ratkaisee isolla laudalla. Ennen portaat olivat kertoimia
 * [1, 1.5, 2.3, 3.4, 5]. Tuhannen yksikön laudalla suurin porras näytti
 * 200 yksikköä eli kaupungin ympäristön, mutta yhdistetyllä 7200
 * yksikön laudalla sama kerroin näytti 1440 yksikköä — koko Euroopan.
 * Sama nappi tarkoitti eri asiaa eri laudalla, ja isolla laudalla ei
 * päässyt lähelle lainkaan (omistajan havainto).
 *
 * Luvut ovat samat kuin vanhat kertoimet tuhannen yksikön laudalla
 * (1000/1.5 = 667, 1000/2.3 = 435 ja niin edelleen), joten pienet
 * laudat käyttäytyvät täsmälleen kuten ennen. Kaksi uutta porrasta
 * jatkavat lähemmäs: niitä tarvitaan vasta isolla laudalla.
 *
 * Portaat eivät ole tasavälein: alapäässä ero on pieni, jotta yleiskuvan
 * ja ensimmäisen lähikuvan välillä ei hypätä liikaa, ja yläpäässä
 * suurempi, koska lähellä pieni muutos ei enää tunnu miltään.
 */
/*
 * Portaat lasketaan puolitoistakertaisina askelina laudan leveydestä
 * lähimpään portaaseen asti.
 *
 * Kiinteä lista näkyviä leveyksiä ei kelvannut. Sen tihein porras oli
 * 667 yksikköä, ja se on tuhannen yksikön laudalla sopiva ensiaskel
 * mutta 7200 yksikön laudalla jo kaupungin ympäristö: yleiskuvan ja
 * ensimmäisen portaan väliin jäi yhdentoista kertaluokan hyppy.
 * Omistajan havainto iPadilta: "zoomautuu aivan liian lähelle Ateenaa."
 *
 * Suhteellinen askel korjaa sen itsestään. Tuhannen yksikön laudalla
 * portaat ovat 1000, 667, 444, 296, 198, 132, 88 — käytännössä samat
 * kuin vanhat kertoimet [1, 1.5, 2.3, 3.4, 5] ja kaksi lisää
 * lähemmäs. Isolla laudalla väliin syntyy portaita sitä mukaa kuin
 * lautaa on enemmän.
 */
const ZOOMI_ASKEL = 1.5;
// Lähin porras: yhden kaupungin ympäristö millä tahansa laudalla.
const ZOOMI_LAHIN = 88;

/*
 * Mihin saapumiszoom pysähtyy.
 *
 * Osuus laudasta on sama kuin ennen (vanha MANNER_ZOOM 2.3 näytti
 * 1/2,3 eli 43 % laudasta). Isolla laudalla pelkkä osuus veisi liian
 * kauas, joten sille on lisäksi yläraja yksikköinä: 2400 yksikköä
 * vastaa yhdistetyllä kartalla noin viittäkymmentä pituusastetta eli
 * Lissabonista Moskovaan — omistajan toive oli, että saavuttaessa
 * näkyy Eurooppa eikä koko vanha maailma.
 */
const SAAPUMIS_OSUUS = 0.43;
/*
 * 2400 yksikköä oli yhä liian laaja: iPadilla näkyi Marseillesta
 * Jerusalemiin (omistajan kuvakaappaus). 1500 osuu portaalle 1422, joka
 * on noin kolmekymmentä pituusastetta — Lontoosta Varsovaan, eli
 * Eurooppa siinä mielessä kuin omistaja sen tarkoitti.
 */
const SAAPUMIS_LEVEIN = 1500;
// Puhelimen kapealla ruudulla saapuminen saa olla pykälän lähempänä
// (omistajan iPhone-palaute 10.8.2026): 1400 yksikön näkymä on
// kapealla ruudulla liian laaja (650: omistajan tarkennus 10.8.
// illalla — vielä pykälä lähemmäs).
const SAAPUMIS_LEVEIN_KAPEA = 650;
const MANNER_ZOOM_VIIVE = 1400; // kokonäkymä näkyy tämän verran ennen zoomausta
// Kuinka suuri osa ruudusta varataan laudan eteläpuolelle, jotta
// alarivin nappien alle jäävät kaupungit saa panoroitua näkyviin.
const ALAKAISTA = 0.3;
// Sama pohjoiseen: matkakirjan kortti peittää laudan yläreunan, joten
// pohjoisimmat kaupungit (Tromssa, Lappi, Islanti) tarvitsevat tilaa,
// johon panoroida (omistajan havainto).
const YLAKAISTA = 0.26;
// Zoomausliu'un kesto. Omistajan palaute on vienyt tätä pidemmäksi
// kerta kerralta: 600 ms → 1200 → 2000 → 2400.
/*
 * Loitonnuksen varmuusvara: osuus laudan leveydestä, joka jää aina
 * näkymän ulkopuolelle, jottei sauma näy kahtena (ks. rajaaSkaala).
 */
const SAUMAN_VARA = 0.03;
/*
 * Saapumisnäkymän siirto kohdemantereen suuntaan (ks. mantereenKeskitys).
 * OSUUS on matka mantereen painopisteeseen; SIIRTO_X ja SIIRTO_Y
 * rajaavat sen osuuteen näkyvästä alasta, jottei kaupunki karkaa
 * laitaan. Y on tiukempi, koska ruutu on matalampi kuin leveä ja
 * kaupungin yläpuolella on matkakirjan kortti.
 */
const MANNER_PAINO = 0.5;
const MANNER_SIIRTO_X = 0.26;
const MANNER_SIIRTO_Y = 0.2;
/*
 * Saapumisliu'un lähtölaajuus isolla laudalla: monenko kertaisena
 * näkymä avautuu ennen kuin se laskeutuu lähikuvaan. Kokonäkymästä ei
 * lähdetä (ks. zoomaaMantereelle).
 *
 * Nostettu 2,6:sta omistajan pyynnöstä: "aloita zoomaus hieman
 * kauempaa kuin tällä hetkellä". 3,6 on yhä selvästi alle kokonäkymän
 * — maailmankartalla se on noin kolmasosa laudan leveydestä eli
 * mannerta ympäristöineen, ei maapalloa.
 */
const MANNER_LAAJUUS = 3.6;
/*
 * Zoomiliu'un kesto. Nostettu 2400:sta omistajan havainnon jälkeen:
 * "zoomaus tökkii kun kartta yrittää pysyä perässä piirtämisessä.
 * zoomausvauhti voisi olla ainakin hitaampi." Hitaampi liuku antaa
 * bittikartalle aikaa, ja liikkeestä tulee samalla arvokkaampi.
 */
const ZOOM_MS = 3400;
// Etusivun zoomaus vielä tätäkin hitaammin (omistajan toive): se on
// pelin avaus, ja koko maailmankartta on iso matka lähikuvaan.
const ALOITUS_ZOOM_MS = 3600;
// Kiihdytys ja jarrutus molemmissa päissä (omistajan toive): kartta
// lähtee liikkeelle hyvin hitaasti, kiihtyy vähitellen täyteen
// vauhtiin ja jarruttaa pitkään. Ensimmäinen ohjauspiste on kaukana
// oikealla juuri siksi, että alku on tarpeeksi verkkainen.
// HUOM: sama arvo on js/sound.js:ssä, jotta äänen korkeus seuraa
// samaa kaarta. Jos muutat toisen, muuta myös toinen.
const ZOOM_PEHMENNYS = 'cubic-bezier(0.68, 0, 0.3, 1)';
// Hiljainen hetki ennen zoomausta, jotta moottoriääni erottuu.
const ZOOM_TAUKO_MS = 260;
// Aloituskartan lähikuvan suurennos yleiskuvaan nähden.
const ALOITUS_ZOOM = 3.1;

export class Kartta {
  constructor(ui) {
    this.ui = ui;
  }

  /**
   * Pelisisällön rajauslaatikko: kaupungit nimineen, reitit, lentokaaret ja
   * koristeet. Näkymä sovitetaan tähän eikä koko karttapohjaan, jolloin lauta
   * näkyy mahdollisimman suurena eikä tyhjää merta jää reunoille.
   */
  boardBounds() {
    const { board, pack } = this.ui.game;
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
    // Katselutila (?lauta=) ei näytä avaustekstiä, joten pergamenttia ei
    // jatketa — muuten lauta kutistuu ja jää yläreunaan (omistajan havainto).
    if (this.ui.game.phase !== 'pickstart' || this.ui.katselu) return box;
    return { ...box, h: box.h * (1 + INTRO_SPACE) };
  }

  /**
   * Sovittaa näkymän pelisisällön rajauslaatikkoon ja venyttää sen ruudun
   * muotoiseksi, jolloin pergamentti täyttää koko alueen ja pelialue näkyy
   * mahdollisimman suurena. Kartta on staattinen: sitä ei zoomata eikä
   * raahata, joten kaikki on aina esillä.
   */
  /** Kiertääkö tämän laudan kartta ympäri? */
  kiertava() {
    return this.ui.game?.pack?.map?.kiertava === true;
  }

  /*
   * Pienin sallittu mittakaava kiertävällä kartalla.
   *
   * Omistajan vaatimus: yksi paikka ei saa näkyä kahdessa kohdassa
   * samaan aikaan. Näkyvä leveys on paneelin leveys jaettuna
   * mittakaavalla, joten mittakaava ei saa alittaa arvoa
   * paneeli / maailman leveys.
   *
   * Raja tarvitaan erikseen lähikuvassa, koska siellä mittakaava
   * lasketaan KORKEUDEN mukaan. Leveässä ja matalassa ikkunassa
   * (2400 x 420) korkeus kutistaa mittakaavan niin pieneksi, että
   * maailma mahtui ruudulle kahdesti — mitattu, ei arvattu.
   */
  rajaaSkaala(skaala, paneW, box) {
    if (!this.kiertava()) return skaala;
    /*
     * Raja on laudan leveys MIINUS pieni varmuusvara.
     *
     * Tasan laudan levyinen näkymä on teoriassa oikein: sauma osuu
     * ruudun laitaan eikä mikään näy kahdesti. Käytännössä ei osu.
     * Näkyvä leveys lasketaan paneelin pikselileveydestä, joka on
     * murtoluku, ja pyöristys, laitteen pikselisuhde ja kartan omien
     * viivojen paksuus vievät reunimmaisen kaistaleen milloin
     * kummallekin puolelle — omistajan havainto: "siinä näkyy sama
     * paikka kahteen kertaan, kun se on kokonaan zoomattu ulos."
     *
     * Vara maksaa kolme prosenttia loitonnusta ja tekee saumasta aina
     * saumattoman. Se on halvempi kuin kaksi kertaa piirtyvä ranta.
     */
    return Math.max(skaala, paneW / (box.w * (1 - SAUMAN_VARA)));
  }

  fitViewBox() {
    const pane = this.ui.svg.parentElement;
    const w = pane.clientWidth;
    const h = pane.clientHeight;
    if (!w || !h) return;
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    // Katselutila (?lauta=) näyttää laudan kuin pelissä: ei porttia eikä
    // avaustekstiä, vaikka vaihe on pickstart.
    const alkuun = this.ui.game.phase === 'pickstart' && !this.ui.katselu;
    // Leveällä ikkunalla (Mac) lauta täyttäisi koko korkeuden ja alareunan
    // kelluvat kortit ruuhkautuisivat kartan eteläosan päälle: kun korkeus
    // on rajoittava mitta, laudalta varataan alakaista korteille. Kapealla
    // ruudulla leveys rajoittaa, kaista jää nollaan eikä asettelu muutu.
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const kaista = !alkuun && w / box.w > h / box.h ? Math.min(h * 0.2, rem * 7) : 0;
    /*
     * Loitonnuksen raja kiertävällä kartalla (omistajan vaatimus): yksi
     * paikka ei saa näkyä kahdessa kohdassa samaan aikaan.
     *
     * Näkyvä leveys on w / scale, joten se ei saa ylittää laudan
     * leveyttä. Ilman rajaa leveä ja matala ikkuna teki juuri sen:
     * korkeus rajoitti mittakaavaa, ja 2000 x 400 pikselin ikkunaan
     * olisi mahtunut kaksi maapalloa vierekkäin.
     *
     * Raja leikkaa pystysuunnasta eikä vaakasuunnasta — kartan ylä- ja
     * alalaidassa on merta, kaupungit ovat keskellä.
     */
    let scale = Math.min(w / box.w, (h - kaista) / box.h);
    if (this.kiertava()) scale = this.rajaaSkaala(scale, w, box);
    const vw = w / scale;
    const vh = h / scale;
    this.ui.viewBoxSize = { vw, vh };
    // Aloitusnäkymässä lauta on ennen Aloita seikkailu -nappia keskellä
    // ruutua (pystyruudulla alaosa ammotti muuten tyhjänä), ja nousee
    // portin auettua ylös, jolloin alle jäävä kaista annetaan kokonaan
    // avaustekstille suurella fontilla. Pelissä sisältö keskitetään
    // kaistan yläpuoliseen osaan.
    let vy;
    if (alkuun && !this.ui.aloitettu) {
      const laudanKorkeus = box.h / (1 + INTRO_SPACE);
      vy = box.y + laudanKorkeus / 2 - vh / 2;
    } else if (alkuun) {
      vy = box.y - box.h * INTRO_TOP;
    } else {
      vy = box.y + box.h / 2 - (h - kaista) / (2 * scale);
    }
    this.ui.svg.setAttribute(
      'viewBox',
      `${box.x + box.w / 2 - vw / 2} ${vy} ${vw} ${vh}`,
    );
    /*
     * Tarkkuustarkistus ajastetaan JOKAISESTA fitViewBoxista, myös
     * lähikuvien haaroista. taydennaTaide sietää viidenneksen eron, ja
     * juuri siihen väliin sumea kartta jäi (ks. tarkistaTarkkuus).
     */
    this.ui.ajastaTarkkuustarkistus();
    // Aloituskartan lähikuva hoitaa oman rajauksensa ja kokonsa.
    if (this.ui.aloitusZoom && alkuun) {
      this.sovitaAloitusZoom(w, h);
      this.ui.taydennaTaide?.();
      return;
    }
    if (this.ui.mannerZoom && !alkuun) {
      this.sovitaMannerZoom(w, h);
      this.ui.taydennaTaide?.();
      return;
    }
    // Lähikuvasta poistuttaessa (kaupunki valittu, uusi peli) kartta
    // palaa paneelin kokoiseksi: inline-mitat ja siirto pois.
    if (this.ui.aloitusZoom || this.ui.mannerZoom || this.ui.svg.style.width) this.nollaaAloitusZoom();
    if (alkuun) this.ui.placeIntro(box, vy, vh, h);
    this.placeFactCard(w, h);
    // Noppa lepää kartan koordinaateissa, joten se siirretään uuteen mittakaavaan.
    if (this.ui.dieThrown && this.ui.boardDie) this.ui.boardDie.place(this.dieRestingSpot());
    /*
     * Kartan kuva päivitetään AINA kun näkymä asettuu.
     *
     * Ilman tätä ensimmäinen kuva jäi voimaan: se piirtyi heti laudan
     * luonnin jälkeen, jolloin viewBox oli vielä oletusarvoinen
     * 1000 x 1000, ja ikkunaksi tuli 3000 yksikköä. Kun näkymä sen
     * jälkeen asettui 6379 yksikön levyiseksi, mikään ei pyytänyt uutta
     * kuvaa — yleiskuvassa ei panoroida — ja kartta jäi kaistaleeksi.
     */
    this.ui.taydennaTaide?.();
  }

  /**
   * Aloituskartan lähikuva puhelimella (omistajan toive).
   *
   * Kapealla ruudulla koko maailmankartta mahtuu näytölle niin pienenä,
   * ettei yksittäistä kaupunkia voi osua sormella. Siksi ensimmäinen
   * napautus zoomaa kartan lähemmäs sen sijaan että valitsisi kaupungin,
   * ja avausteksti väistyy tieltä.
   *
   * Lähikuvassa kartta piirretään niin, että sen KORKEUS täyttää
   * paneelin; leveyttä jää yli, ja se selataan sivusuunnassa. Pystyyn ei
   * jää liikuttavaa, joten panorointi on yksiulotteista.
   *
   * Panorointi tehdään CSS-muunnoksella eikä viewBoxia siirtämällä:
   * muunnos on kompositorin työtä, joten selain käyttää valmista
   * rasteria eikä piirrä koko karttaa uudelleen joka kehyksellä. Se on
   * käytännössä sama kuin kartan muuttaminen kuvaksi, mutta kartta
   * pysyy tarkkana ja napautukset osuvat oikeisiin kohtiin itsestään.
   */
  /**
   * Kaupunkien pystysuunnan keskikohta laudalla. Aloituskartan lähikuva
   * rajataan tähän eikä laudan keskelle: maailmankartan navat ovat
   * tyhjää merta, ja niiden näyttäminen veisi tilan kaupungeilta.
   */
  kaupunkienKeskiY(box, laudanKorkeus) {
    const ys = (this.ui.game.board?.cities ?? []).map((c) => c.y);
    if (!ys.length) return box.y + laudanKorkeus / 2;
    return (Math.min(...ys) + Math.max(...ys)) / 2;
  }

  sovitaAloitusZoom(paneW, paneH) {
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    // Rajauslaatikko ilman avaustekstin varaamaa alaosaa: lähikuvassa
    // teksti on jo väistynyt, joten koko korkeus on laudan käytössä.
    const laudanKorkeus = box.h / (1 + INTRO_SPACE);
    const yleiskuva = Math.min(paneW / box.w, paneH / box.h);
    const skaala = this.rajaaSkaala(yleiskuva * ALOITUS_ZOOM, paneW, box);
    const leveys = Math.round(box.w * skaala);
    // Kartta täyttää paneelin myös pystysuunnassa. Näkymä rajataan
    // kaupunkien korkeudelle eikä laudan keskelle: maailmankartan ylä-
    // ja alalaidassa ovat pallonpuoliskojen napa-alueet, joissa ei ole
    // yhtään napautettavaa kohdetta eikä mannerta (omistajan havainto).
    const nakyvaKorkeus = paneH / skaala;
    const vy = this.kaupunkienKeskiY(box, laudanKorkeus) - nakyvaKorkeus / 2;
    // Kiertävällä kartalla yksi ruudullinen yli laudan leveyden: se on
    // kaistale, jonka <use>-kopio täyttää kun vieritys kiertyy ympäri.
    const yliLeveys = this.kiertava() ? Math.ceil(paneW) : 0;
    const nakyvaYks = box.w + yliLeveys / skaala;
    this.ui.svg.setAttribute('viewBox', `${box.x} ${vy} ${nakyvaYks} ${nakyvaKorkeus}`);
    this.ui.svg.style.width = `${leveys + yliLeveys}px`;
    this.ui.svg.style.height = `${Math.round(nakyvaKorkeus * skaala)}px`;
    this.ui.svg.style.flex = '0 0 auto';
    this.ui.svg.style.alignSelf = 'center';
    this.ui.viewBoxSize = { vw: nakyvaYks, vh: nakyvaKorkeus };
    this.ui.zoomYlaReuna = vy;
    this.ui.zoomSkaala = skaala;
    // Panorointivara: kuinka paljon karttaa jää ruudun ulkopuolelle.
    // Kiertävällä kartalla varaa ei ole — on jakso, joka kiertää ympäri.
    this.ui.panJakso = this.kiertava() ? leveys : 0;
    this.ui.panVara = this.kiertava() ? 0 : Math.max(0, leveys - paneW);
    // Aloituskohta: sama kohta kartasta, joka oli keskellä yleiskuvassa.
    if (this.ui.panX == null) {
      const keskiX = this.ui.zoomAnkkuri ?? box.x + box.w / 2;
      this.ui.panX = paneW / 2 - (keskiX - box.x) * skaala;
    }
    this.ui.asetaPan(this.ui.panX);
    this.placeFactCard(paneW, paneH);
  }

  /**
   * Ollaanko avausnäkymässä, jossa kartalla on oma lähikuvansa ja
   * avausteksti? Katselutila (?lauta=) on vaiheeltaan pickstart mutta
   * näyttää laudan kuin pelissä. Sama ehto on fitViewBoxissa.
   */
  avausNakymassa() {
    return this.ui.game.phase === 'pickstart' && !this.ui.katselu;
  }

  /** Nykyinen zoomiporras; kokonäkymässä 0. */
  get zoomiIndeksi() {
    if (!this.ui.mannerZoom) return 0;
    return this.ui.zoomiPorras ?? this.saapumisPorras();
  }

  /**
   * Zoomiportaat tälle laudalle kertoimina. Porras 0 on kokonäkymä.
   *
   * Kerroin lasketaan laudan leveydestä, jotta sama nappi tuo yhtä
   * lähelle kaikilla laudoilla. Portaat, jotka olisivat kokonäkymää
   * kauempana, jätetään pois: pienellä laudalla ei ole mieltä tarjota
   * porrasta, joka näyttäisi lautaa enemmän kuin sitä on.
   */
  zoomiTasot() {
    const leveys = this.ui.contentBox?.w ?? 1000;
    const tasot = [1];
    let nakyva = leveys / ZOOMI_ASKEL;
    while (nakyva > ZOOMI_LAHIN * 1.05) {
      tasot.push(leveys / nakyva);
      nakyva /= ZOOMI_ASKEL;
    }
    tasot.push(leveys / ZOOMI_LAHIN);
    return tasot;
  }

  /**
   * Porras, johon mantereelle saavuttaessa zoomataan.
   *
   * Valitaan se porras, joka on lähimpänä tavoiteltua näkyvää leveyttä.
   * Kiinteä indeksi ei kelpaa, koska portaiden määrä riippuu laudan
   * koosta: sama numero olisi pienellä laudalla lähikuva ja isolla
   * suurpiirteinen yleisnäkymä.
   */
  saapumisPorras() {
    const leveys = this.ui.contentBox?.w ?? 1000;
    const kapea = (this.ui.mapPane?.clientWidth ?? window.innerWidth) < 700;
    const tavoite = Math.min(leveys * SAAPUMIS_OSUUS, kapea ? SAAPUMIS_LEVEIN_KAPEA : SAAPUMIS_LEVEIN);
    const tasot = this.zoomiTasot();
    let paras = 1;
    for (let i = 1; i < tasot.length; i++) {
      if (Math.abs(leveys / tasot[i] - tavoite) < Math.abs(leveys / tasot[paras] - tavoite)) paras = i;
    }
    return paras;
  }

  /** Zoomikerroin, jolla sovitaMannerZoom laskee lähikuvan mitat. */
  get zoomiKerroin() {
    /*
     * Nipistys antaa minkä tahansa kertoimen portaiden välistä, ja
     * silloin se voittaa portaikon. Painikkeet nollaavat sen, jolloin
     * portaat palaavat käyttöön: kaksi eri tapaa zoomata samaan
     * lukuun, eikä niiden tarvitse olla samaa mieltä.
     */
    if (this.ui.zoomiVapaa) return this.ui.zoomiVapaa;
    const tasot = this.zoomiTasot();
    return tasot[this.zoomiIndeksi] ?? tasot[this.saapumisPorras()] ?? MANNER_ZOOM;
  }

  /** Pienin ja suurin sallittu kerroin: portaikon päät. */
  zoomiRajat() {
    const tasot = this.zoomiTasot();
    return { pienin: tasot[0] ?? 1, suurin: tasot.at(-1) ?? MANNER_ZOOM };
  }

  /**
   * Kartan piste, joka on juuri nyt paneelin keskellä. Zoomatessa tämä
   * pidetään paikallaan — muuten kartta karkaisi käsistä joka
   * painalluksella, koska lähikuva keskitettäisiin aina laudan keskelle.
   *
   * Käänteisluku sovitaMannerZoomin sijoituksesta:
   *   panX = paneW / 2 - (kohde.x - box.x) * skaala
   */
  nykyinenKeskipiste() {
    const pane = this.ui.svg.parentElement;
    if (!pane || !this.ui.zoomSkaala || !this.ui.mannerZoom) return null;
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    return {
      x: box.x + (pane.clientWidth / 2 - (this.ui.panX ?? 0)) / this.ui.zoomSkaala,
      y: (this.ui.zoomYlaReuna ?? box.y)
        + (pane.clientHeight / 2 - (this.ui.panY ?? 0)) / this.ui.zoomSkaala,
    };
  }

  /**
   * Siirtyy zoomiportaissa. suunta on +1 (lähemmäs) tai -1 (kauemmas).
   * Palauttaa true, jos taso muuttui.
   */
  zoomaaPainikkeella(suunta) {
    if (this.ui.dead || !this.ui.svg) return false;
    // Painike ja rulla ovat yhtä lailla kartan käsittelyä: tarkkuuden
    // uudelleenrasterointi odottaa niiden jälkeen saman levon kuin
    // sormeneleen jälkeen (ks. tarkistaTarkkuus). Liukuva kartta
    // pysähtyy, ettei liuku kirjoita siirtoa uuden näkymän päälle.
    this.ui.pysaytaLiuku?.(true);
    this.ui.merkitseKartanEle();
    // Avausnäkymässä kartalla on oma lähikuvansa ja avausteksti; sinne
    // painikkeet eivät kuulu. Katselutila (?lauta=) näyttää laudan kuin
    // pelissä, joten siellä ne kuuluvat — sama ehto kuin fitViewBoxissa.
    if (this.avausNakymassa()) return false;

    const tasot = this.zoomiTasot();
    /*
     * Nipistyksen jälkeen ollaan portaiden VÄLISSÄ. Painike siirtyy
     * silloin lähimpään portaaseen menosuunnassa — ei indeksiin, jota
     * ei ole.
     */
    const vapaa = this.ui.zoomiVapaa;
    const nykyinen = vapaa
      ? tasot.findIndex((t) => (suunta > 0 ? t > vapaa * 1.02 : t >= vapaa * 0.98))
      : this.zoomiIndeksi;
    const lahin = nykyinen < 0 ? tasot.length - 1 : nykyinen;
    const uusi = vapaa
      ? Math.min(tasot.length - 1, Math.max(0, suunta > 0 ? lahin : lahin - 1))
      : Math.min(tasot.length - 1, Math.max(0, lahin + suunta));
    this.ui.zoomiVapaa = 0;
    if (!vapaa && uusi === nykyinen) return false;

    /*
     * Keskipiste luetaan ENNEN tason vaihtoa, vanhalla mittakaavalla.
     * Rullalla se on osoittimen alla oleva kartan piste, painikkeilla
     * ruudun keskipiste — painikkeella ei ole osoitinta.
     */
    const keskipiste = this.ui.rullanKohta ?? this.nykyinenKeskipiste();

    if (uusi === 0) {
      // Takaisin kokonäkymään: lähikuvan mitat ja siirto pois.
      this.nollaaAloitusZoom();
      this.fitViewBox();
      this.paivitaZoomiNapit();
      return true;
    }

    this.ui.zoomiPorras = uusi;
    if (!this.ui.mannerZoom) {
      // Kokonäkymästä lähikuvaan. Ilman aiempaa keskipistettä
      // kohdistetaan pelaajan nappulaan, jotta lähennys vie sinne missä
      // peli on menossa eikä laudan geometriseen keskipisteeseen.
      this.ui.mannerZoom = true;
      document.body.classList.add('manner-zoom');
      this.ui.zoomKohde = this.pelaajanKohta() ?? null;
    } else {
      this.ui.zoomKohde = keskipiste;
    }
    // panX/panY nolliksi, jotta sovitaMannerZoom keskittää zoomKohteeseen.
    this.ui.panX = null;
    this.ui.panY = null;
    this.fitViewBox();
    this.paivitaZoomiNapit();
    return true;
  }

  /** Vuorossa olevan pelaajan nappulan kohta laudan koordinaateissa. */
  pelaajanKohta() {
    // turn voi olla määrittelemättä heti tallennuksen latauduttua
    // (mitattu 8.8.2026: players oli jo paikallaan, turn ei) — silloin
    // players[undefined] hukkasi pelaajan ja kartta keskittyi laudan
    // keskelle. Yksinpelissä oletus 0 on aina oikein.
    const pelaaja = this.ui.game.players?.[this.ui.game.turn ?? 0];
    const kaupunki = pelaaja && this.ui.game.board?.cityById?.get(pelaaja.pos?.city);
    return kaupunki ? { x: kaupunki.x, y: kaupunki.y } : null;
  }

  /**
   * Painikkeiden tila: kumpikin himmenee kun porras on päässä. Nappi ei
   * katoa vaan menee pois käytöstä — katoava nappi saa sormen etsimään
   * sitä, ja kartan reunassa se olisi erityisen ärsyttävää.
   */
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

  paivitaZoomiNapit() {
    // Maiden lehdet -nappi elää samaa elämää kuin zoomi: se piiloutuu
    // avausnäkymässä ja palaa kartan mukana. Kutsu on ennen zoomin
    // varhaista paluuta, jottei se jää tekemättä.
    this.paivitaMaalehtiNappi();
    const sisaan = document.getElementById('zoom-in');
    const ulos = document.getElementById('zoom-out');
    if (!sisaan || !ulos) return;
    const piilossa = this.avausNakymassa();
    const ryhma = sisaan.parentElement;
    if (ryhma) ryhma.hidden = piilossa;
    sisaan.disabled = this.zoomiIndeksi >= this.zoomiTasot().length - 1;
    ulos.disabled = this.zoomiIndeksi <= 0;
  }

  /** Palauttaa kartan tavalliseen kokoonsa (uusi peli, laudan vaihto). */
  nollaaAloitusZoom() {
    // Liukuva kartta ei saa jäädä kirjoittamaan siirtoa nollatun
    // näkymän päälle.
    this.ui.pysaytaLiuku?.(true);
    this.ui.aloitusZoom = false;
    this.ui.mannerZoom = false;
    // Porras oletukselle: seuraava lähikuva alkaa taas saapumistasolta.
    this.ui.zoomiPorras = null;
    this.ui.panX = null;
    this.ui.panY = null;
    this.ui.panVara = 0;
    this.ui.panVaraY = 0;
    this.ui.panJakso = 0;
    this.ui.zoomiVapaa = 0;
    this.ui.svg.style.transition = '';
    this.ui.svg.style.transform = '';
    this.ui.svg.style.width = '';
    this.ui.svg.style.height = '';
    this.ui.svg.style.flex = '';
    this.ui.svg.style.alignSelf = '';
    clearTimeout(this.ui.mannerAjastin);
    clearTimeout(this.ui.kiikariAjastin);
    clearTimeout(this.ui.zoomAjastin);
    clearTimeout(this.ui.korttiAjastin);
    document.body.classList.remove(
      'aloitus-zoom', 'manner-zoom', 'kartta-raahaus', 'kiikari-paalla',
      'zoom-kaynnissa', 'manner-odottaa',
    );
  }

  /**
   * Mantereen lähikuva puhelimella (omistajan toive). Sama idea kuin
   * aloituskartalla, mutta kartta on panoroitavissa kaikkiin neljään
   * suuntaan — manner on isompi kuin ruutu joka suuntaan.
   *
   * Toistaiseksi vain Euroopalla: ilme hiotaan siellä kuntoon ennen kuin
   * sama tuodaan muille laudoille (lisää laudan id ZOOMATTAVAT-settiin).
   */
  mannerZoomTarpeen() {
    if (this.ui.katselu || this.ui.reducedMotion) return false;
    if (this.ui.game.phase === 'pickstart') return false;
    if (!ZOOMATTAVAT.has(this.ui.game.pack.id)) return false;
    // Lentokalvon aikana lauta piirtyy jo taustalle, mutta pelaaja ei näe
    // sitä. Zoomaus odottaa Astu mantereelle -napin painallusta
    // (omistajan havainto: zoomaus ehti tapahtua lennon aikana).
    if (document.body.classList.contains('flight-active')) return false;
    // Isolla laudalla lähikuva tarvitaan aina, myös leveällä ruudulla:
    // kokonäkymä näyttäisi koko vanhan maailman kerralla, eikä siitä
    // erota mitään.
    if (this.isoLauta()) return true;
    return (this.ui.svg.parentElement?.clientWidth ?? 0) < 700;
  }

  /**
   * Onko lauta niin iso, ettei kokonäkymästä ole hyötyä?
   *
   * Vanhat laudat ovat 1000 yksikköä leveitä, ja niiden kokonäkymä on
   * luettava. Yhdistetty vanha maailma on 7200, ja kokonäkymässä
   * Lissabonista Tokioon mahtuu puhelimen ruudulle — kaupungit ovat
   * pisteitä eikä nimiä erota. Omistajan toive: lennettäessä kartan
   * pitää olla valmiiksi yhtä lähellä kuin ennenkin, ja loput näkyvät
   * vasta jos pelaaja itse loitontaa.
   */
  isoLauta() {
    return (this.ui.contentBox?.w ?? 1000) > 2000;
  }

  /**
   * Saapumisnäkymän keskipiste: kaupunki, mutta kohdemantereen suuntaan
   * siirrettynä.
   *
   * Omistajan havainto: "nyt kartta keskittää kaupungin ja Tangerin
   * kohdalla näkyy Eurooppaa yhtä paljon kuin Aasiaa." Tanger on
   * Afrikan pohjoisimmassa kulmassa, joten kaupunki keskellä tarkoittaa,
   * että puolet ruudusta on sitä mannerta, jonne ei olla tultu.
   *
   * Painopiste lasketaan saman mantereen kaupungeista (map.cityManner),
   * ei mantereen muodosta: kaupungit ovat se, mitä pelissä tehdään, ja
   * ne ovat valmiina laudan koordinaateissa. Kiertävällä kartalla
   * jokainen kaupunki tuodaan ensin lähimmäksi kohdetta — muuten
   * Beringinsalmen molemmin puolin ulottuva Aasia antaisi painopisteen
   * keskeltä Atlanttia.
   *
   * Siirto on osittainen ja rajattu. Koko matka painopisteeseen veisi
   * kaupungin ruudun laitaan, ja kaupunki on se, mihin on tultu.
   */
  mantereenKeskitys(kohde, paneW, paneH, skaala) {
    const kartta = this.ui.game.pack.map;
    const manner = kohde?.id && kartta?.cityManner?.[kohde.id];
    if (!manner || !skaala) return kohde;
    const W = this.kiertava() ? kartta.width : 0;
    let summaX = 0;
    let summaY = 0;
    let montako = 0;
    for (const kaupunki of this.ui.game.board.cities ?? []) {
      if (kartta.cityManner[kaupunki.id] !== manner) continue;
      let x = kaupunki.x;
      if (W) {
        while (x - kohde.x > W / 2) x -= W;
        while (x - kohde.x < -W / 2) x += W;
      }
      summaX += x;
      summaY += kaupunki.y;
      montako += 1;
    }
    if (montako < 2) return kohde;
    const rajaX = (paneW / skaala) * MANNER_SIIRTO_X;
    const rajaY = (paneH / skaala) * MANNER_SIIRTO_Y;
    const vali = (arvo, raja) => Math.max(-raja, Math.min(raja, arvo));
    return {
      x: kohde.x + vali((summaX / montako - kohde.x) * MANNER_PAINO, rajaX),
      y: kohde.y + vali((summaY / montako - kohde.y) * MANNER_PAINO, rajaY),
    };
  }

  /** Mantereen lähikuvan mitat ja rajat. */
  sovitaMannerZoom(paneW, paneH) {
    /*
     * Vanhentunut panorointi hylätään, kun ruudun koko on muuttunut
     * laskennan jälkeen. Latauksessa pan ehdittiin laskea ennen kuin
     * asettelu oli lopullinen, ja väärä arvo jäi voimaan — kartta
     * aukesi aina keskelle Atlanttia vaikka kohde (pelaajan kaupunki)
     * oli koko ajan oikein (omistajan havainto 8.8.2026, v386;
     * mitattu: sama laskenta oikealla koolla keskittää täsmälleen).
     * Käsin panorointi säilyy niin kauan kuin koko ei muutu.
     */
    if (this.ui.panX != null
      && (this.ui.panKoko?.w !== paneW || this.ui.panKoko?.h !== paneH)) {
      this.ui.panX = null;
      this.ui.panY = null;
    }
    this.ui.panKoko = { w: paneW, h: paneH };
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const yleiskuva = Math.min(paneW / box.w, paneH / box.h);
    // Zoomitaso tulee portaikosta: automaattinen saapumiszoom käyttää
    // oletusporrasta, painikkeet siirtävät sitä.
    const skaala = this.rajaaSkaala(yleiskuva * this.zoomiKerroin, paneW, box);
    // Laudan eteläpuolelle varataan tilaa alarivin nappien verran, jotta
    // eteläisimmät kaupungit saa panoroitua niiden alta pois (omistajan
    // havainto: Kreeta ja Ateena jäivät nappien alle). Tila ei muuta
    // zoomaustasoa — se vain jatkaa panoroitavaa aluetta, ja siihen
    // osuu kartan oma Pohjois-Afrikan kaistale.
    const etelaJatko = (paneH * ALAKAISTA) / skaala;
    // Sama tila laudan pohjoispuolelle (omistajan havainto: myös
    // pohjoisesta hukkui kaupunkeja). Ylhäällä tilan vievät matkakirjan
    // kortti ja kartan yläreuna, joten Tromssa ja Lappi jäivät piiloon
    // eikä niiden yläpuolella ollut mitään, mihin panoroida. Kartan
    // pergamentti jatkuu rajauksen yli joka suuntaan (mapart.js PAPER),
    // joten kaista näyttää kartalta eikä tyhjältä.
    const pohjoisJatko = (paneH * YLAKAISTA) / skaala;
    const ylaReuna = box.y - pohjoisJatko;
    const korkeusYks = box.h + pohjoisJatko + etelaJatko;
    /*
     * Kiertävällä kartalla piirretään yksi ruudullinen yli laudan
     * leveyden. Se on juuri se kaistale, jonka <use>-kopio täyttää, ja
     * juuri se mitä tarvitaan kun vieritys on kiertymässä ympäri.
     */
    const jakso = Math.round(box.w * skaala);
    const yliLeveys = this.kiertava() ? Math.ceil(paneW) : 0;
    const nakyvaYks = box.w + yliLeveys / skaala;
    const leveys = jakso + yliLeveys;
    const korkeus = Math.round(korkeusYks * skaala);
    this.ui.svg.setAttribute('viewBox', `${box.x} ${ylaReuna} ${nakyvaYks} ${korkeusYks}`);
    this.ui.svg.style.width = `${leveys}px`;
    this.ui.svg.style.height = `${korkeus}px`;
    this.ui.svg.style.flex = '0 0 auto';
    this.ui.svg.style.alignSelf = 'flex-start';
    this.ui.viewBoxSize = { vw: nakyvaYks, vh: korkeusYks };
    this.ui.zoomSkaala = skaala;
    this.ui.zoomYlaReuna = ylaReuna;
    this.ui.panJakso = this.kiertava() ? jakso : 0;
    this.ui.panVara = this.kiertava() ? 0 : Math.max(0, leveys - paneW);
    this.ui.panVaraY = Math.max(0, korkeus - paneH);
    if (this.ui.panX == null || this.ui.panY == null) {
      /*
       * Ilman asetettua kohdetta keskitetään PELAAJAAN, ei laudan
       * geometriseen keskipisteeseen — maailmanlaudalla keskipiste on
       * keskellä Atlanttia, ja päivityksen jälkeinen uusi lataus
       * aukesi aina sinne (omistajan havainto 8.8.2026, v386).
       */
      const kohde = this.ui.zoomKohde ?? this.pelaajanKohta()
        ?? { x: box.x + box.w / 2, y: box.y + box.h / 2 };
      const keskus = this.mantereenKeskitys(kohde, paneW, paneH, skaala);
      this.ui.panX = paneW / 2 - (keskus.x - box.x) * skaala;
      this.ui.panY = paneH / 2 - (keskus.y - ylaReuna) * skaala;
    }
    this.ui.asetaPan(this.ui.panX, this.ui.panY);
    this.placeFactCard(paneW, paneH);
    if (this.ui.dieThrown && this.ui.boardDie) this.ui.boardDie.place(this.dieRestingSpot());
  }

  /**
   * Mantereelle saavuttaessa näytetään ensin kokonäkymä ja vasta sen
   * jälkeen zoomataan pelinappulan kohdalle (omistajan toive): pelaaja
   * ehtii nähdä, minne on tullut, ennen kuin kartta menee lähelle.
   */
  ajastaMannerZoom() {
    clearTimeout(this.ui.mannerAjastin);
    if (!this.mannerZoomTarpeen() || this.ui.mannerZoom) {
      document.body.classList.remove('manner-odottaa');
      return;
    }
    /*
     * Isolla laudalla kokonäkymää ei näytetä lainkaan.
     *
     * Kokonäkymä on siellä siksi, että pelaaja näkee minne on tullut.
     * Vanhalla maailmalla se ei kerro sitä: koko manner mahtuu ruudulle
     * niin pienenä, ettei kaupunkeja erota. Silloin on parempi laskeutua
     * suoraan lähikuvaan, kuten pienemmillä laudoilla ennenkin.
     */
    if (this.isoLauta()) {
      this.zoomaaMantereelle();
      return;
    }
    // Matkakirja ja toimintonapit odottavat zoomauksen loppuun (omistajan
    // toive): pelaaja näkee ensin mantereen kokonaan ja saa sen jälkeen
    // vasta kortit eteensä.
    document.body.classList.add('manner-odottaa');
    this.ui.mannerAjastin = setTimeout(() => {
      if (this.ui.dead || !this.mannerZoomTarpeen() || this.ui.mannerZoom) return;
      this.zoomaaMantereelle();
    }, MANNER_ZOOM_VIIVE);
  }

  /** Zoomaa mantereen kartan nappulan kohdalle pehmeästi liukuen. */
  zoomaaMantereelle() {
    if (this.ui.mannerZoom) return;
    const [vx, vy, vw, vh] = (this.ui.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    // Kohde: pelaajan nappula, tai näkymän keskus jos sitä ei löydy.
    // pelaajanKohta on toinen varareitti: uudelleenlatauksessa cityOf
    // ei palauttanut koordinaatteja, ja näkymä putosi laudan keskelle
    // — maailmanlaudalla keskelle Atlanttia (omistajan havainto
    // 8.8.2026, v386: "Päivityksen jälkeen kartta siirtyy aina tänne").
    const oma = this.ui.game.cityOf?.();
    const kohde = oma && Number.isFinite(oma.x)
      ? { x: oma.x, y: oma.y, id: oma.id }
      : (this.pelaajanKohta() ?? { x: vx + vw / 2, y: vy + vh / 2 });

    this.ui.mannerZoom = true;
    this.ui.panX = null;
    this.ui.panY = null;
    this.ui.zoomKohde = kohde;
    document.body.classList.add('manner-zoom');
    this.fitViewBox();
    /*
     * EI LIUKUA (omistajan päätös 7.8.2026): *"ota zoomausanimaatiot
     * pois kun tullaan aloitusnäytöltä lentokoneella mantereelle. peli
     * vain siis siirtyy suoraan oikeaan zoom tasoon ilman
     * animaatiota."*
     *
     * Tässä oli ennen kaksi liukua: isolla laudalla saapuminen
     * MANNER_LAAJUUS-kertaisesta näkymästä ja muilla laudoilla liuku
     * napautuskohdasta. Molemmat poistettiin — fitViewBox yllä on jo
     * asettanut lopullisen näkymän, joten mitään muuta ei tarvita.
     *
     * Zoomausääni lähti mukana: se soi täsmälleen liu'un mittaisena
     * (js/sound.js ZOOM_VAUHTI), eikä moottorin humaus ilman liikettä
     * kerro mitään. asetaZoomAlku ja asetaSaapumisAlku jäävät
     * käyttöön aloituskartan omassa zoomissa (zoomaaAloituskartta).
     *
     * Kuva pyydetään heti oikealla mittakaavalla: ilman tätä ruudut
     * jäisivät yleiskuvan tarkkuuteen siihen asti, kunnes jokin muu
     * kutsuisi täydennyksen.
     */
    this.paivitaZoomiNapit();
    document.body.classList.remove('manner-odottaa');
    this.ui.taydennaTaide?.({ heti: true });
  }

  /**
   * Saapumisliu'un alkuasento isolla laudalla: sama näkymä
   * MANNER_LAAJUUS kertaa laajempana.
   *
   * Keskipiste luetaan lopullisesta panoroinnista eikä lasketa
   * kohteesta. Kiertävällä kartalla panX on normalisoitu välille
   * [-jakso, 0), ja kohde voi näkyä ruudulla kierron kopion kautta —
   * jolloin kohteesta laskettu piste olisi maailman leveyden verran
   * pielessä ja liuku lentäisi koko kartan poikki.
   */
  asetaSaapumisAlku(paneW, paneH) {
    if (this.ui.reducedMotion) return;
    const s = 1 / MANNER_LAAJUUS;
    // Ruudun keskipiste elementin omissa pikseleissä, sellaisena kuin
    // se juuri nyt on.
    const ex = paneW / 2 - (this.ui.panX ?? 0);
    const ey = paneH / 2 - (this.ui.panY ?? 0);
    const tx = paneW / 2 - s * ex;
    const ty = paneH / 2 - s * ey;
    this.ui.svg.style.transition = 'none';
    this.ui.svg.style.transform =
      `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
    // Pakotettu asettelu, jotta selain näkee alkuasennon omana tilanaan.
    void this.ui.svg.getBoundingClientRect();
  }

  /**
   * Zoomaa aloituskartan lähikuvaan. Avausteksti häivytetään ensin pois,
   * jotta lauta saa koko ruudun. Kutsutaan ensimmäisestä napautuksesta.
   */
  zoomaaAloituskartta(kohta = null) {
    if (this.ui.aloitusZoom) return;
    const pane = this.ui.svg.parentElement;
    const paneW = pane.clientWidth;
    const paneH = pane.clientHeight;
    // Yleiskuvan rajaus talteen: liu'un alkuasento lasketaan siitä.
    const [vx, vy, vw, vh] = (this.ui.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    const yleisSkaala = paneW / vw;
    // Tarkennuspiste: se kohta karttaa, johon käyttäjä napautti — ei
    // näkymän keskus (omistajan toive: zoomaus keskittyy napautettuun
    // kohtaan riippumatta siitä, osuiko se kaupunkiin).
    const fokus = kohta ?? { x: vx + vw / 2, y: vy + vh / 2 };
    // Napautuskohta ruudulla ennen zoomausta: siitä liuku lähtee.
    const sx = (fokus.x - vx) * yleisSkaala;
    const sy = (fokus.y - vy) * yleisSkaala;

    this.ui.aloitusZoom = true;
    this.ui.panX = null;
    this.ui.zoomAnkkuri = fokus.x;
    document.body.classList.add('aloitus-zoom');
    this.fitViewBox();
    // Renkaat piirretään uudelleen, jotta napautus valitsee kaupungin
    // eikä enää zoomaa.
    this.ui.drawTargets();
    /*
     * SUORAAN LÄHIKUVAAN (omistajan päätös 10.8.2026, iPhone-palaute):
     * ei liukua, ei zoomausääntä eikä kiikaria — kartta vaihtuu heti
     * vieritettävään lähikuvaan. fitViewBox on jo asettanut näkymän;
     * tässä siivotaan liu'un varaan jääneet tilat. Liu'un koneisto
     * (asetaZoomAlku, zoomAanellaJaViiveella, kaynnistaZoomLiuku) jää
     * paikalleen mutta kutsumatta, jos animaatioon halutaan palata.
     * sx/sy/yleisSkaala jäävät laskennasta käyttämättä samasta syystä.
     */
    void sx; void sy; void yleisSkaala;
    stopIntroVoice(this);
    stopDiaryVoice(this);
    this.ui.svg.style.transition = '';
    this.tyonnaAvausteksti(0);
    this.ui.asetaPan(this.ui.panX, this.ui.panY);
    document.body.classList.remove('manner-odottaa');
    this.ui.taydennaTaide?.({ heti: true });
  }

  /**
   * Zoomausäänen tieltä raivataan hetki hiljaisuutta (omistajan toive):
   * lukuääni lopetetaan kokonaan ja taustaäänimaisema vaimennetaan, ja
   * vasta pienen viiveen jälkeen zoomausääni ja liuku käynnistyvät.
   * Ilman taukoa moottori hukkui puheen ja meren alle.
   */
  zoomAanellaJaViiveella(liuku, kesto = ZOOM_MS) {
    stopIntroVoice(this);
    stopDiaryVoice(this);
    vaimennaTausta();
    clearTimeout(this.ui.zoomAlkuAjastin);
    this.ui.zoomAlkuAjastin = setTimeout(() => {
      if (this.ui.dead) return;
      // Moottori soi täsmälleen liu'un mittaisena, ja sen korkeus
      // seuraa liu'un vauhtia (js/sound.js ZOOM_VAUHTI).
      sfx.play('zoom', { kesto: kesto / 1000 });
      liuku();
      // Taustamaisema palaa vasta kun moottori on vaiennut.
      clearTimeout(this.ui.zoomTaustaAjastin);
      this.ui.zoomTaustaAjastin = setTimeout(() => {
        if (!this.ui.dead) palautaTausta();
      }, kesto + 300);
    }, ZOOM_TAUKO_MS);
  }

  /** Napautuskohta ruudulla kartan omiksi koordinaateiksi. */
  kartanKohta(clientX, clientY) {
    const r = this.ui.svg.getBoundingClientRect();
    const [vx, vy, vw, vh] = (this.ui.svg.getAttribute('viewBox') ?? '0 0 1000 1000')
      .split(/\s+/).map(Number);
    if (!r.width || !r.height) return null;
    return {
      x: vx + ((clientX - r.left) / r.width) * vw,
      y: vy + ((clientY - r.top) / r.height) * vh,
    };
  }

  /**
   * Pehmeä siirtymä yleiskuvasta lähikuvaan.
   *
   * Kartta on jo piirretty lähikuvan tarkkuudella, ja siirtymä tehdään
   * pelkällä CSS-muunnoksella: se on kompositorin työtä, joten selain
   * rasteroi kartan kerran ja venyttää valmista rasteria. Tämä on sama
   * asia kuin kartan tekeminen ennalta bittikartaksi (omistajan ehdotus),
   * mutta ilman erillistä kuvaa — eikä lopputulos sumene, koska
   * animaation päättyessä ruudulla on täysi tarkkuus.
   */
  asetaZoomAlku(fokus, sx, sy, yleisSkaala) {
    if (this.ui.reducedMotion) return;
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const s = yleisSkaala / this.ui.zoomSkaala;
    // Tarkennuspiste elementin omissa pikseleissä lähikuvan mitoilla.
    const ex = (fokus.x - box.x) * this.ui.zoomSkaala;
    const ey = (fokus.y - (this.ui.zoomYlaReuna ?? box.y)) * this.ui.zoomSkaala;
    // Alkuasento: sama piste pysyy siinä kohdassa ruutua, jossa se oli
    // napautushetkellä — kuva laajenee napautetusta kohdasta ulospäin.
    const tx = sx - s * ex;
    const ty = sy - s * ey;
    this.ui.svg.style.transition = 'none';
    this.ui.svg.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
    // Pakotettu asettelu, jotta selain näkee alkuasennon omana tilanaan
    // eikä hyppää suoraan loppuun.
    void this.ui.svg.getBoundingClientRect();
  }

  /**
   * Käynnistää liu'un alkuasennosta lähikuvaan.
   *
   * Kiikariefekti nostetaan esiin vasta, kun liuku on valmis (omistajan
   * toive) — liikkuvan kuvan päällä sumennus on sekä rumaa että
   * puhelimelle raskasta. Feidauksen hoitaa css.
   */
  kaynnistaZoomLiuku(kesto = ZOOM_MS) {
    if (this.ui.reducedMotion) return;
    this.ui.svg.style.transition = `transform ${kesto}ms ${ZOOM_PEHMENNYS}`;
    // Liu'un ajaksi kartan oma reunahäivytys sammuu (omistajan
    // havainto). Lähikuvan kartta on rajattu kaupunkien korkeuteen,
    // joten liu'un alussa se ei täytä paneelia — häivytys piirtyi
    // paljaalle taustalle ja näkyi ruudun laidoissa tummina kaarina.
    document.body.classList.add('zoom-kaynnissa');
    // Avausteksti lähtee liikkeelle samalla hetkellä kuin kartta.
    this.tyonnaAvausteksti(kesto);
    this.ui.asetaPan(this.ui.panX, this.ui.panY);
    clearTimeout(this.ui.zoomAjastin);
    this.ui.zoomAjastin = setTimeout(() => {
      this.ui.svg.style.transition = '';
      document.body.classList.remove('zoom-kaynnissa');
      // Liuku ohi: nyt kuva saa piirtyä loppuun.
      this.ui.taydennaTaide?.({ heti: true });
    }, kesto + 60);
    clearTimeout(this.ui.kiikariAjastin);
    // Kortit takaisin näkyviin, kun liuku on ohi.
    clearTimeout(this.ui.korttiAjastin);
    this.ui.korttiAjastin = setTimeout(() => {
      if (!this.ui.dead) document.body.classList.remove('manner-odottaa');
    }, kesto);
    // Kiikariefekti poistettiin kartasta kokonaan (omistajan päätös
    // 10.8.2026) — 'kiikari-paalla' ei enää syty mistään.
  }

  /**
   * Avausteksti työntyy alas täsmälleen sen verran kuin kartan alareuna
   * liikkuu (omistajan toive): teksti ei häivy erikseen vaan kasvava
   * kartta työntää sen ruudun alle.
   *
   * Matka mitataan geometriasta eikä arvata prosenttina. Alkuasento on
   * jo asetettu (asetaZoomAlku), joten kartan alareunan voi lukea
   * suoraan; loppuasento lasketaan lähikuvan mitoista. Kesto ja
   * pehmennys ovat samat kuin kartalla, joten liike on samaa tahtia
   * koko matkan eikä vain päätepisteissä.
   *
   * Tekstistä ei tarvitse tehdä kuvaa: siirto on pelkkä transform,
   * jonka selain hoitaa kompositorissa ilman uudelleenlatomista tai
   * -piirtoa. will-change varmistaa oman kerroksen, joka on juuri se
   * hyöty, jonka kuva antaisi.
   */
  tyonnaAvausteksti(kesto) {
    const teksti = this.ui.introEl;
    if (!teksti || teksti.hidden || !this.ui.aloitusZoom) return;
    const pane = this.ui.mapPane.getBoundingClientRect();
    const alkuAla = this.ui.svg.getBoundingClientRect().bottom;
    const korkeus = parseFloat(this.ui.svg.style.height) || pane.height;
    const loppuAla = pane.top + (this.ui.panY ?? 0) + korkeus;
    // Vähintään paneelin verran, jottei teksti jää näkyviin silloinkaan
    // kun kartta sattuu kasvamaan odotettua vähemmän.
    const siirto = Math.max(pane.height - teksti.offsetTop, loppuAla - alkuAla);
    teksti.style.setProperty('--intro-tyonto', `${Math.round(siirto)}px`);
    teksti.style.setProperty('--intro-kesto', `${kesto}ms`);
    teksti.style.setProperty('--intro-pehmennys', ZOOM_PEHMENNYS);
    teksti.classList.add('intro-pois');
  }

  /**
   * Onko lähikuva tarpeen? Vain kapealla ruudulla: leveällä koko lauta
   * näkyy kerralla riittävän isona, eikä ylimääräinen napautus tuo
   * mitään (omistajan toive koski nimenomaan puhelinta).
   */
  zoomTarpeen() {
    if (this.ui.katselu || this.ui.reducedMotion) return false;
    return (this.ui.svg.parentElement?.clientWidth ?? 0) < 700;
  }

  /**
   * Päiväkirjakortti asetetaan sille kartan nurkalle, jossa on eniten merta.
   * Näin kortti ei koskaan peitä mannerta ja lauta näkyy kokonaisena. Kortti
   * on kartan päällä, joten jokin nurkka menetetään joka tapauksessa — meri
   * on niistä halvin.
   *
   * Alanurkat hylätään, jos kortti ja toimintokortti eivät mahdu rinnakkain:
   * silloin ne peittäisivät toisensa.
   */
  placeFactCard(paneW, paneH) {
    /*
     * MATKAKIRJA ON AINA VASEMMASSA YLÄNURKASSA.
     *
     * Omistaja 5.8.2026: *"Matkakirja saisi olla aina kartan
     * yläreunassa."* — alanurkat kiellettiin, koska siellä ovat
     * toimintonapit.
     *
     * Omistaja 14.8.2026: kortti hyppi zoomatessa oikeaan reunaan,
     * koska vasen/oikea ratkaistiin näkyvän viewBoxin merenpinta-alan
     * mukaan ja zoomi muutti laskentaa. *"Saisiko sen korjattua
     * pysymään aina vasemmassa yläreunassa?"* — valinta poistettiin
     * kokonaan; kiinteä paikka voittaa kelluvan optimoinnin.
     */
    this.ui.factCard.dataset.corner = 'tl';
    // Linssin selitekortti väistää päiväkirjaa: se saa oman nurkkansa
    // vasta kun päiväkirjan nurkka on tiedossa.
    this.ui.sijoitaLinssiSelite();
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

  /** Kohdat, joihin maastokuvioita ei saa piirtää: kaupungit, nimet ja reitit. */
  mapObstacles() {
    const { board } = this.ui.game;
    const spots = [];
    for (const c of board.cities) {
      spots.push({ x: c.x, y: c.y });
      spots.push({ x: c.x + (c.lx ?? 0), y: c.y + (c.ly ?? -20) });
      spots.push({ x: c.x + 21, y: c.y + 17 }); // laatan paikka
    }
    for (const e of board.edges) {
      const a = board.cityById.get(e.a);
      const b = board.cityById.get(e.b);
      const steps = Math.max(e.steps * 2, 4);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        spots.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      }
    }
    return spots;
  }

  // --- kartta -------------------------------------------------------------
}
