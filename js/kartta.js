/*
 * KARTTA — laudan kamera: viewbox, zoomiportaat, mannerzoom,
 * aloituszoom, zoomiliuku, koordinaattimuunnokset sekä panorointi
 * ja eleet (remontit M7a ja M7b,
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
import { el } from './mapart.js';
import { sfx } from './sound.js';
import { fokusmoodiPaalla, kehittajaRajatPaalla, kehittajaTilaPaalla } from './ui-apurit.js';

/*
 * Kuinka paljon pergamenttia jatketaan kartan alle avaustekstiä varten.
 *
 * NOLLA 25.8.2026 (omistajan etusivu-uudistus): avausteksti ei enää asu
 * kartan ALAPUOLELLA vaan yhtenä palstana kartan PÄÄLLÄ, ja kartta jää
 * sen taakse kevyesti sumennettuna. Kaistalle ei siis ole enää käyttöä,
 * ja ilman sitä lauta saa koko paneelin — juuri sen kartan, jonka päälle
 * palsta asettuu. Vakio jätetään paikalleen (eikä laskukaavoja pureta),
 * koska kaista voi palata, jos avaus vielä muuttuu.
 */
export const INTRO_SPACE = 0;
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
/*
 * Hiiren rullan vähimmäisväli. Tarkka rulla ja trackpad lähettävät
 * kymmeniä tapahtumia yhdestä eleestä, ja ilman väliä kartta hyppäisi
 * portaikon läpi yhdellä nykäisyllä.
 */
const RULLAN_VALI_MS = 220;
// Aloituskartan lähikuvan suurennos yleiskuvaan nähden.
const ALOITUS_ZOOM = 3.1;

/*
 * KAMERA-AJON OLETUKSET (ks. ajaKamera).
 *
 * Kesto on lyhyempi kuin vanhassa saapumisliu'ussa (ZOOM_MS 3400):
 * tuo oli pelin avausele, jonka piti tuntua matkalta, kun taas
 * kamera-ajo tapahtuu kesken pelin ja toistuu joka kaupungissa.
 * Kahdessa sekunnissa ehtii nähdä mistä mihin siirryttiin ilman että
 * odottaa.
 */
const AJO_MS = 2000;
/*
 * Rajauslaatikkoon ajettaessa jätettävä reunavara osuutena laatikon
 * koosta. Ilman varaa maan rantaviiva koskettaisi ruudun laitaa, eikä
 * silloin näe onko maa loppu vai jatkuuko se ruudun ulkopuolelle.
 */
const AJON_MARGINAALI = 0.12;

/*
 * === ALOITUSLENNON NIUKKA KERROS ====================================
 *
 * Mitat ovat RUUDUN PIKSELEITÄ ja muunnetaan laudan yksiköiksi vasta
 * piirrettäessä — sama sääntö kuin lennon koneella ja viivalla (js/ui.js
 * ALOITUSLENNON_KONE_PX): kamera seisoo lennon ajan paikallaan, joten
 * kerroin luetaan kerran eikä joka kehyksellä.
 */
// Reitin päätepisteen säde. Sama kaava kuin js/ui.js:n lähtömerkillä
// (ALOITUSLENNON_VIIVA_PX * 1.6), jotta pisteet ovat samankokoisia.
const LENNON_PISTE_PX = 3.5;
// Nimen kirjasinkoko. Selvästi pienempi kuin pelilaudan kaupunkinimet:
// nämä eivät ole napautettavia kohteita vaan reitin päät.
const LENNON_NIMI_PX = 14;
/*
 * Nimen etäisyys pisteestä alaspäin (pisteen keskeltä tekstin
 * ylälaitaan). Mitta on koneen mitan mukainen: kone laskeutuu kohteen
 * pisteen päälle, ja nimen on jäätävä sen rungon alapuolelle
 * (js/ui.js ALOITUSLENNON_KONE_PX on 34, eli puolikas runko ~12 px).
 */
const LENNON_NIMI_VALI_PX = 20;
// Pergamenttihalon leveys osuutena kirjasinkoosta (vrt. .fokus-nimi,
// jossa suhde on 2,4 / 8). Halo pitää nimen luettavana harson päällä.
const LENNON_HALO_OSUUS = 0.3;
/*
 * Lähtökaupunki on sama kuin js/ui.js:n ALOITUSLENNON_LAHTO. Arvo on
 * tässä toistettuna, koska ui.js ei vie sitä ulos eikä sitä saa tuoda
 * (kehäriippuvuus: ui.js tuo tämän moduulin). Jos Lontoo joskus vaihtuu,
 * molemmat on muutettava — siksi tarkistus alla on pehmeä: tuntematon
 * lähtö jättää nimikerroksen pois eikä kaada lentoa.
 */
const LENNON_LAHTO = 'lontoo';

/**
 * Kiihtyy alussa, jarruttaa lopussa (omistajan sanoin "zoomi kiihtyy ja
 * hidastuu luontevasti"). Sama kaari kuin ZOOM_PEHMENNYS-bezierissä,
 * mutta funktiona: kamera-ajo lasketaan kehys kerrallaan
 * requestAnimationFramessa, eikä CSS:n siirtymäkäyrä ole silloin
 * käytettävissä.
 */
function pehmennysKaari(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

/** Kahden laatikon pienin yhteinen laatikko (ks. fokusRajaukset). */
function yhdistaAlue(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    w: Math.max(a.x + a.w, b.x + b.w) - x,
    h: Math.max(a.y + a.h, b.y + b.h) - y,
  };
}

export class Kartta {
  constructor(ui) {
    this.ui = ui;
    // Kesken oleva kamera-ajo (ks. ajaKamera); null kun kamera on levossa.
    this.kameraAjo = null;
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
    this.asetaPan(this.ui.panX);
    this.placeFactCard(paneW, paneH);
  }

  /**
   * Siirtää karttaa; rajat pitävät kartan ruudulla. Aloituskartalla
   * liikutaan vain vaakasuunnassa (panVaraY = 0), mantereella molempiin.
   */
  asetaPan(x, y = this.ui.panY ?? 0) {
    if (this.ui.panJakso) {
      /*
       * Kiertävällä kartalla vieritys ei pysähdy vaan kiertää ympäri.
       *
       * Arvo pidetään välillä [-jakso, 0). Kun se ylittää rajan, se
       * hyppää tasan yhden laudan leveyden verran — ja koska sisällöstä
       * on kopio juuri sen päässä, ruudulla ei muutu mikään. Sauma on
       * olemassa vain lukuna.
       */
      const j = this.ui.panJakso;
      this.ui.panX = ((x % j) + j) % j - j;
    } else {
      this.ui.panX = Math.min(0, Math.max(-(this.ui.panVara ?? 0), x));
    }
    this.ui.panY = Math.min(0, Math.max(-(this.ui.panVaraY ?? 0), y));
    this.ui.svg.style.transform =
      `translate3d(${this.ui.panX.toFixed(1)}px, ${this.ui.panY.toFixed(1)}px, 0)`;
    /*
     * Siirron aikana EI piirretä bittikarttaa.
     *
     * Aiemmin tässä tilattiin uusi kuva heti kun reuna lähestyi, ja
     * juuri se tökki: rasterointi vie satoja millisekunteja
     * pääsäikeessä, ja sormen alla se tuntuu nykäyksenä. Puskuria on
     * ruudullisen verran joka suuntaan, eli koko sen matkan minkä yksi
     * pyyhkäisy voi karttaa siirtää, joten kesken eleen ei tarvitse
     * piirtää mitään (omistajan linjaus).
     */
  }

  /*
   * --- zoomipainikkeet ------------------------------------------------
   *
   * Omistajan toive: "universaalit zoomipainikkeet kartalle kaikille
   * alustoille". Aiemmin lähikuvaan pääsi vain automaattisesti ja vain
   * kapealla ruudulla; tietokoneella karttaa ei voinut lähentää lainkaan.
   *
   * Painikkeet käyttävät samaa lähikuvakoneistoa kuin automaattinen
   * mannerzoom — vain zoomitaso vaihtuu. mannerZoomTarpeen() rajaa
   * ainoastaan AUTOMAATTISEN zoomauksen (Eurooppa, kapea ruutu), ja
   * fitViewBox katsoo pelkkää this.ui.mannerZoom-lippua, joten painikkeilla
   * lähikuva aukeaa millä tahansa laudalla ja millä tahansa ruudulla.
   */

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
     *
     * RAJAT VIIMEISENÄ VARMISTUKSENA. Fokusikkuna nostaa portaikon
     * pohjaa (zoomiRajat), ja tämä on se yksi kohta, jonka läpi jokainen
     * piirretty mittakaava kulkee — myös vanha porras, joka jäi
     * muistiin ennen kuin ikkuna ilmestyi kartalle.
     */
    const { pienin, suurin } = this.zoomiRajat();
    const rajaa = (k) => Math.min(suurin, Math.max(pienin, k));
    if (this.ui.zoomiVapaa) return rajaa(this.ui.zoomiVapaa);
    const tasot = this.zoomiTasot();
    return rajaa(tasot[this.zoomiIndeksi] ?? tasot[this.saapumisPorras()] ?? MANNER_ZOOM);
  }

  /**
   * Pienin ja suurin sallittu kerroin: portaikon päät — paitsi että
   * fokusnäkymässä pohja nousee fokusikkunaan (ks. fokusZoomMinimi).
   */
  zoomiRajat() {
    const tasot = this.zoomiTasot();
    const suurin = tasot.at(-1) ?? MANNER_ZOOM;
    const portaanPohja = tasot[0] ?? 1;
    return {
      pienin: Math.min(suurin, Math.max(portaanPohja, this.fokusZoomMinimi())),
      suurin,
    };
  }

  /** Onko yleiskuva (porras 0) juuri nyt sallittu määränpää? */
  yleiskuvaSallittu() {
    return this.fokusZoomMinimi() <= (this.zoomiTasot()[0] ?? 1) * 1.001;
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
    // Painike on käyttäjän oma tahto: kesken oleva kamera-ajo väistyy
    // ja jättää kartan siihen mihin ehti (ks. pysaytaKameraAjo).
    this.pysaytaKameraAjo();
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
    const raaka = vapaa
      ? Math.min(tasot.length - 1, Math.max(0, suunta > 0 ? lahin : lahin - 1))
      : Math.min(tasot.length - 1, Math.max(0, lahin + suunta));
    /*
     * FOKUSIKKUNA ON PORTAIKON POHJA (omistajan pelitesti 24.8.2026,
     * v1101: *"fokustilassa näkyy vanha pelilauta fokuskuvan
     * ulkopuolella"*). Loitonnus pysähtyy fokusikkunaan — kauemmas ei
     * pääse painikkeella eikä rullalla.
     *
     * VIIMEINEN ASKEL ON VAPAA KERROIN, EI PORRAS. Ikkuna osuu harvoin
     * portaikon askelmalle, ja portaaseen pyöristäminen jätti pelaajan
     * puolitoistakertaa liian lähelle (mitattu: ikkuna 466 yksikköä,
     * lähin porras 313). Viimeinen loitonnus vie siis täsmälleen siihen
     * näkymään, johon saapumisajokin — mikä on samalla se, mitä pelaaja
     * yrittää nähdä.
     */
    const pohjaKerroin = this.fokusZoomMinimi();
    const pohjalle = pohjaKerroin > 0 && raaka < this.fokusPorrasMinimi();
    const uusi = pohjalle ? this.fokusPorrasMinimi() : raaka;
    const nykyKerroin = vapaa || (tasot[this.zoomiIndeksi] ?? 0);
    this.ui.zoomiVapaa = 0;
    if (pohjalle && nykyKerroin > 0 && nykyKerroin <= pohjaKerroin * 1.001) return false;
    if (!pohjalle && !vapaa && uusi === nykyinen) return false;

    /*
     * Keskipiste luetaan ENNEN tason vaihtoa, vanhalla mittakaavalla.
     * Rullalla se on osoittimen alla oleva kartan piste, painikkeilla
     * ruudun keskipiste — painikkeella ei ole osoitinta.
     */
    const keskipiste = this.ui.rullanKohta ?? this.nykyinenKeskipiste();

    if (pohjalle) {
      // Fokusikkuna kokonaisuudessaan ruudulle (ks. yllä).
      this.ui.zoomiVapaa = pohjaKerroin;
      if (!this.ui.mannerZoom) {
        this.ui.mannerZoom = true;
        document.body.classList.add('manner-zoom');
      }
      this.ui.zoomKohde = keskipiste;
      this.ui.panX = null;
      this.ui.panY = null;
      this.fitViewBox();
      this.paivitaZoomiNapit();
      return true;
    }

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
    // Loitonnuksen pohja on fokusnäkymässä fokusikkuna eikä yleiskuva.
    ulos.disabled = this.fokusPohjallaOllaan()
      || this.zoomiIndeksi <= this.fokusPorrasMinimi();
  }

  /** Palauttaa kartan tavalliseen kokoonsa (uusi peli, laudan vaihto). */
  nollaaAloitusZoom() {
    // Liukuva kartta ei saa jäädä kirjoittamaan siirtoa nollatun
    // näkymän päälle. Sama kamera-ajolle: se puretaan KIRJAAMATTA
    // välivaihetta, koska koko lähikuvatila on juuri katoamassa.
    this.ui.pysaytaLiuku?.(true);
    this.pysaytaKameraAjo(false);
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
    // Lähikuva loppui: fokuskuvan verho väistyy laudan oman sumun
    // tieltä (sama raja kuin sovitaMannerZoomissa).
    this.ui.paivitaFokusSumu?.(this.ui.fokusMaat?.());
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
    /*
     * FOKUSIKKUNA RAJAA MYÖS PELIN OMAN NÄKYMÄN (v1101). Zoomaus pitää
     * keskipisteensä, ja ikkunan laidassa se veisi ruudun reunan kuvan
     * ulkopuolelle vaikka mittakaava olisi rajoissa. Sama rajaus kuin
     * käsieleellä (rajaaFokusPan) — aloituslento on ulkona rajauksesta
     * (fokusRajaukset), joten se ajaa vapaasti kuten ennenkin.
     */
    const fokus = this.fokusRajaukset();
    if (fokus) {
      const rajattu = this.rajaaFokusPan(this.ui.panX, this.ui.panY, fokus.kuva);
      this.ui.panX = rajattu.x;
      this.ui.panY = rajattu.y;
    }
    this.asetaPan(this.ui.panX, this.ui.panY);
    /*
     * Fokuskuvan verho tahdistetaan tästä: se on voimassa vain
     * lähikuvassa (ui.paivitaFokusSumu), ja yleiskuvasta lähikuvaan
     * siirrytään zoomipainikkeella tai nipistyksellä ilman että peli
     * piirtyy uudelleen. Kutsu on halpa — verho rakennetaan vain kun
     * sen tunniste oikeasti muuttui.
     */
    this.ui.paivitaFokusSumu?.(this.ui.fokusMaat?.());
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
    this.asetaPan(this.ui.panX, this.ui.panY);
    document.body.classList.remove('manner-odottaa');
    this.ui.taydennaTaide?.({ heti: true });
  }

  /*
   * ==================================================================
   * KAMERA-AJO (omistajan linjaus 24.8.2026, Raamatun osio
   * "Karttalinssit" / KAMERA-AJOT: *"piirtomoottoriin kehitetään
   * sulavat zoomausanimaatiot sisään ja ulos — zoomi kiihtyy ja
   * hidastuu luontevasti alussa ja lopussa (easing). Tarvitaan paljon
   * jatkossa: linssien animaatiot, joissa kartta liikkuu itsestään ja
   * zoomautuu tarvittaessa."*)
   * ==================================================================
   *
   * YKSI FUNKTIO KAIKKIIN AJOIHIN: `ajaKamera(kohde)`. Kohde on joko
   * keskipiste ja zoomitaso tai rajauslaatikko:
   *
   *   kartta.ajaKamera({ x: 667, y: 895, kerroin: 3 })
   *   kartta.ajaKamera({ x: 667, y: 895, leveys: 240 })   // näkyvä leveys
   *   kartta.ajaKamera({ bbox: { x, y, w, h }, marginaali: 0.12 })
   *
   * Kutsujia on tulossa kolme, ja API on tehty niitä kaikkia varten:
   * fokusnäkymään saapuminen (maan bbox, js/fokuskartta.js),
   * ALOITUSLENTO (lähtömaan ja kohdemaan YHTEIS-bbox — `maidenBbox`
   * antaa sen suoraan laudan maamuodoista) ja linssien omat ajot,
   * joissa kamera seuraa animaatiota paikasta toiseen.
   *
   * MITEN LIIKE PIIRRETÄÄN. Lopullinen näkymä asetetaan HETI
   * (fitViewBox), ja ajo piirretään sen päälle CSS-muunnoksena, jonka
   * requestAnimationFrame päivittää joka kehyksellä. Sama oppi kuin
   * nipistyksessä ja vanhassa zoomiliu'ussa: kartan rasterointi vie
   * satoja millisekunteja pääsäikeessä, joten sitä ei tehdä kesken
   * liikkeen — kompositori venyttää valmista kuvaa, ja lopussa ruudulla
   * on täysi tarkkuus. Mittakaavaa interpoloidaan LOGARITMISESTI:
   * lineaarinen kerroin näyttää siltä kuin ajo jarruttaisi kesken
   * matkan, koska silmä lukee zoomista suhteen eikä erotusta.
   *
   * ELE KESKEYTTÄÄ. Sormi kartalle, nipistys, rulla tai zoomipainike
   * pysäyttää ajon siihen paikkaan mihin se ehti (pysaytaKameraAjo), ja
   * välivaihe kirjataan oikeaksi kameratilaksi täsmälleen kuten
   * nipistyksen lopetus tekee — kartta ei nykäise takaisin eikä hyppää
   * eteenpäin.
   */

  /** Onko kamera-ajo juuri nyt käynnissä? */
  kameraAjossa() {
    return Boolean(this.kameraAjo);
  }

  /**
   * Näkymän tila juuri nyt: keskipiste laudan koordinaateissa ja
   * mittakaava (pikseliä laudan yksikköä kohti).
   *
   * Luetaan RUUDULTA (ui.nakyvaAlue) eikä zoomimuuttujista, koska
   * yleiskuvassa this.ui.zoomSkaala on nolla ja ajo voi alkaa kummasta
   * tahansa tilasta.
   */
  kameranTila() {
    const n = this.ui.nakyvaAlue?.();
    if (!n?.skaala) return null;
    return { x: n.x + n.w / 2, y: n.y + n.h / 2, skaala: n.skaala };
  }

  /** Yleiskuvan mittakaava: se, johon zoomikerroin 1 viittaa. */
  yleiskuvanSkaala(paneW, paneH) {
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    return Math.min(paneW / box.w, paneH / box.h);
  }

  /**
   * Kohdekuvauksesta keskipiste ja zoomikerroin.
   *
   * Kerroin rajataan aina portaikon päihin (zoomiRajat), jottei ajo vie
   * näkymää kauemmas kuin loitonnusnappi tai lähemmäs kuin lähin porras
   * — ja kiertävällä kartalla sitä paitsi saumavaran taakse.
   */
  kameranKohde(kohde, paneW, paneH) {
    if (!kohde) return null;
    const yleis = this.yleiskuvanSkaala(paneW, paneH);
    if (!yleis) return null;
    const { pienin, suurin } = this.zoomiRajat();
    const rajaa = (k) => Math.min(suurin, Math.max(pienin, k));
    if (kohde.bbox) {
      const b = kohde.bbox;
      if (!(b.w > 0) || !(b.h > 0)) return null;
      // Marginaali on osuus laatikon koosta joka reunaan: 0,12 jättää
      // maan ympärille sen verran merta ja naapuria, että muoto erottuu
      // eikä rantaviiva kosketa ruudun laitaa.
      const vara = 1 + 2 * (kohde.marginaali ?? AJON_MARGINAALI);
      const skaala = Math.min(paneW / (b.w * vara), paneH / (b.h * vara));
      return {
        x: b.x + b.w / 2,
        y: b.y + b.h / 2,
        kerroin: rajaa(skaala / yleis),
      };
    }
    if (!Number.isFinite(kohde.x) || !Number.isFinite(kohde.y)) return null;
    const kerroin = kohde.leveys > 0
      ? (paneW / kohde.leveys) / yleis
      : (kohde.kerroin ?? this.zoomiKerroin);
    return { x: kohde.x, y: kohde.y, kerroin: rajaa(kerroin) };
  }

  /**
   * Maajoukon yhteinen rajauslaatikko laudan koordinaateissa.
   *
   * Tästä saa sekä yhden maan fokusrajauksen että ALOITUSLENNON
   * kahden maan yhteisrajauksen (Britannia + kohdemaa) yhdellä
   * kutsulla. Palauttaa null, jos laudalla ei ole maamuotoja.
   */
  maidenBbox(isot) {
    const muodot = this.ui.game?.pack?.map?.countryShapes;
    if (!muodot || !isot?.length) return null;
    let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
    for (const iso of isot) {
      for (const rengas of muodot[iso]?.renkaat ?? []) {
        for (const [x, y] of rengas) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    if (!Number.isFinite(x0) || x1 <= x0 || y1 <= y0) return null;
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }

  /**
   * Ajaa kameran nykyisestä näkymästä kohteeseen pehmeästi.
   *
   * Palauttaa lupauksen, joka täyttyy arvolla true kun ajo pääsi perille
   * ja false jos se keskeytyi tai jäi tekemättä. Liikeherkkyys
   * (reducedMotion) hyppää suoraan perille — se on sama sääntö kuin
   * muillakin kartan liikkeillä.
   *
   * `pakota` ohittaa aloituslennon kameravarauksen (ks. alla). Sitä
   * käyttää vain lento itse.
   */
  ajaKamera(kohde, { kesto = AJO_MS, pehmennys = pehmennysKaari, pakota = false } = {}) {
    const pane = this.ui.svg?.parentElement;
    if (this.ui.dead || !pane) return Promise.resolve(false);
    /*
     * ALOITUSLENTO OMISTAA KAMERAN (omistaja 24.8.2026, Raamattu:
     * ALOITUSLENTO UUSIKSI). Lennon aikana kartalla on rajaus, johon
     * lähtömaa ja kohdemaa mahtuvat molemmat, ja kone lentää sen poikki.
     * Muut ajot — ennen kaikkea fokuskartan maanvaihto, joka laukeaa
     * samasta piirrosta — veisivät näkymän kesken lennon kohdemaahan ja
     * kone jatkaisi lentoaan ruudun ulkopuolella. Ne eivät jää jonoon
     * vaan raukeavat: lento ajaa itse kohdemaan rajaukseen perillä.
     */
    if (this.ui.aloituslentoKesken && !pakota) return Promise.resolve(false);
    const paneW = pane.clientWidth;
    const paneH = pane.clientHeight;
    if (!paneW || !paneH) return Promise.resolve(false);
    // Avausnäkymässä kartalla on oma lähikuvansa ja avausteksti; sinne
    // ajo ei kuulu (sama raja kuin zoomipainikkeilla).
    if (this.avausNakymassa()) return Promise.resolve(false);
    const maali = this.kameranKohde(kohde, paneW, paneH);
    if (!maali) return Promise.resolve(false);
    const alku = this.kameranTila();

    // Edellinen ajo pois alta ILMAN välivaiheen kirjausta: uusi ajo
    // asettaa näkymän joka tapauksessa itse.
    this.pysaytaKameraAjo(false);

    // Lopullinen näkymä paikalleen heti. Sen päälle piirretään liike.
    this.ui.zoomiVapaa = maali.kerroin;
    this.ui.zoomKohde = { x: maali.x, y: maali.y };
    this.ui.panX = null;
    this.ui.panY = null;
    if (!this.ui.mannerZoom) {
      this.ui.mannerZoom = true;
      document.body.classList.add('manner-zoom');
    }
    this.fitViewBox();
    this.paivitaZoomiNapit();
    /*
     * Lennon oma kerros rakennetaan TÄSSÄ eikä lennon alussa: mitat
     * luetaan ruudulta (nakyvaAlue), ja vasta fitViewBox on asettanut
     * lopullisen mittakaavan. Ajo piirretään sen päälle muunnoksena,
     * joten pisteet ja nimet skaalautuvat kartan mukana kuten kaikki muu.
     */
    if (this.ui.aloituslentoKesken && pakota) this.aloituslennonNiukkuus();

    const loppu = this.kameranTila();
    if (this.ui.reducedMotion || !alku || !loppu || kesto <= 0) {
      this.ui.taydennaTaide?.({ heti: true });
      return Promise.resolve(true);
    }
    // Ajo, joka ei liikuta mitään, on turha: pieni ero on sekä
    // näkymätön että altis pyöristysvirheelle.
    const matka = Math.hypot(loppu.x - alku.x, loppu.y - alku.y) * loppu.skaala;
    const suhde = Math.abs(Math.log(loppu.skaala / alku.skaala));
    if (matka < 8 && suhde < 0.02) {
      this.ui.taydennaTaide?.({ heti: true });
      return Promise.resolve(true);
    }

    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const ylaReuna = this.ui.zoomYlaReuna ?? box.y;
    const loppuSkaala = this.ui.zoomSkaala || loppu.skaala;
    const svg = this.ui.svg;
    document.body.classList.add('zoom-kaynnissa');
    svg.style.transition = 'none';

    /** Välivaihe ruudulle: keskipiste `x,y` mittakaavassa `s`. */
    const piirra = (x, y, s) => {
      const k = s / loppuSkaala;
      const ex = (x - box.x) * loppuSkaala;
      const ey = (y - ylaReuna) * loppuSkaala;
      const tx = paneW / 2 - k * ex;
      const ty = paneH / 2 - k * ey;
      if (!Number.isFinite(tx) || !Number.isFinite(ty) || !Number.isFinite(k)) return;
      svg.style.transform =
        `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${k.toFixed(4)})`;
    };

    return new Promise((valmis) => {
      const ajo = {
        alku,
        loppu,
        alkuhetki: performance.now(),
        kesto,
        piirra,
        valmis,
        kehys: 0,
        // Missä ajo on juuri nyt: pysäytys lukee tämän ja kirjaa sen
        // oikeaksi kameratilaksi.
        nyt: { ...alku },
      };
      this.kameraAjo = ajo;
      piirra(alku.x, alku.y, alku.skaala);
      const askel = (hetki) => {
        if (this.kameraAjo !== ajo) return;
        if (this.ui.dead) { this.pysaytaKameraAjo(false); return; }
        const t = Math.min(1, (hetki - ajo.alkuhetki) / ajo.kesto);
        const e = pehmennys(t);
        const s = Math.exp(Math.log(alku.skaala)
          + (Math.log(loppu.skaala) - Math.log(alku.skaala)) * e);
        const x = alku.x + (loppu.x - alku.x) * e;
        const y = alku.y + (loppu.y - alku.y) * e;
        ajo.nyt = { x, y, skaala: s };
        if (t < 1) {
          piirra(x, y, s);
          ajo.kehys = requestAnimationFrame(askel);
          return;
        }
        // Perillä: muunnos pois, jolloin ruudulla on lopullinen näkymä
        // täydellä tarkkuudella.
        this.kameraAjo = null;
        svg.style.transform = '';
        svg.style.transition = '';
        document.body.classList.remove('zoom-kaynnissa');
        this.asetaPan(this.ui.panX, this.ui.panY);
        this.ui.taydennaTaide?.({ heti: true });
        valmis(true);
      };
      ajo.kehys = requestAnimationFrame(askel);
    });
  }

  /*
   * === ALOITUSLENNON NIUKKA KERROS ==================================
   *
   * Raamattu (Fokusmoodi, ALOITUSLENTO UUSIKSI): lennon kartta on
   * niukka — lähtömaa ja kohdemaa samassa kuvassa, punainen viiva ja
   * kone. Omistajan pelitesti v1103:sta löysi kaksi vikaa.
   *
   *   1. KOHDEMAA EROTTUI YHÄ. Sumuverho (js/ui.js paivitaFokusSumu)
   *      jättää KÄYTYIHIN maihin aukot, ja peli siirtää nappulan
   *      perille jo lennon alussa (actionPickStart). Kohdemaa oli siis
   *      kartan mielestä käyty ja jäi ainoana maana verhon alta
   *      tarkaksi: tumma rantaviiva ja ruskeat vuoret keskellä muuten
   *      himmeää Eurooppaa. Määränpää paljastui ennen kuin kone oli
   *      siellä. Maan korostusrengas ja -sävy oli jo piilotettu
   *      (css body.kartalento), mutta verhon aukkoa ei voi peittää
   *      CSS:llä — aukko on maskissa.
   *   2. KARTALLA EI OLLUT NIMIÄ. Kaupunkikerros nimilappuineen on
   *      lennon ajan piilossa (sama CSS-sääntö), joten reitin päistä
   *      ei kertonut mikään. Omistajan tilaus: *"lennon aikana
   *      kartalla näkyy Lontoo pisteenä + Lontoo-teksti ja Ateena
   *      pisteenä + Ateena-teksti. Ei muita pisteitä eikä nimiä."*
   *
   * MOLEMMAT RATKAISTAAN LENNON OMASSA KERROKSESSA eikä pelitilan
   * kerroksia muokkaamalla. Verho korvataan lennon ajaksi tasaisella
   * harsolla ilman aukkoja (pelin oma verho menee samalla piiloon,
   * css body.kartalento .fokus-sumu), ja reitin päihin piirretään kaksi
   * pistettä nimineen. Kerros syntyy lennon kamera-ajon alussa ja
   * katoaa itsestään, kun js/ui.js tyhjentää lentokerroksen perillä.
   *
   * SAMALLA MASKI KATOAA LENNON PIIRTOPOLULTA. Pelin oma verho on koko
   * laudan kokoinen suorakaide, jonka läpinäkyvyys tulee SVG-MASKISTA
   * (valkoinen pohja + maan ääriviiva neljänä porrastettuna vetona).
   * Kone ja sen perässä piirtyvä viiva ovat samassa maalauskerroksessa
   * sen päällä, joten jokainen kehys mitätöi kaaren laatikon ja verho
   * jouduttiin maalaamaan uudestaan sen alta. Tasainen harso on pelkkä
   * väri ilman maskia, eikä lennon aikana ole enää yhtään maskattua
   * kerrosta.
   *
   * MITTAUS (Chromium kontissa, CPU 10× hidastettuna, 25.8.2026): tämä
   * EI yksin näy kehysajoissa — ero jäi ajojen väliseen hajontaan.
   * Chromiumin pullonkaula on muualla (koko laudan maalauslistan
   * uudelleennauhoitus joka kehyksellä, ja profiilissa ~19 % roskien-
   * keruuta lentorepliikin naputusäänistä, js/sound.js hiss). Maskin
   * poisto tehdään silti: se on iOS:n tunnettu kallis kerros — sama
   * sääntö, jolla suodattimet on kielletty kartan kerroksilta.
   */

  /**
   * Rakentaa lennon oman kerroksen: tasainen harso, reitin päätepisteet
   * ja niiden nimet. Kutsutaan vain lennon omasta kamera-ajosta.
   */
  aloituslennonNiukkuus() {
    const kerros = this.ui.flightLayer;
    // Kerros on kertakäyttöinen: js/ui.js tyhjentää sen ennen lentoa ja
    // sen jälkeen. Vartija on varalta, jos ajo joskus toistuisi.
    if (!kerros || kerros.querySelector('.aloituslento-niukka')) return;
    const map = this.ui.game?.pack?.map;
    if (!map?.width || !map?.height) return;
    const g = el('g', {
      class: 'aloituslento-niukka', 'pointer-events': 'none',
    }, kerros);
    /*
     * TASAINEN HARSO KOKO LAUDALLE. Sama luokka ja siis sama pergamentin
     * sävy kuin fokusmoodin omalla verholla — vaihdos lennon lopussa on
     * tästä syystä huomaamaton: kerrokset ovat identtiset yhtä asiaa
     * lukuun ottamatta, ja se yksi asia on kohdemaan aukko.
     */
    el('rect', {
      x: 0,
      y: 0,
      width: map.width,
      height: map.height,
      class: 'fokus-sumu-harso aloituslento-harso',
    }, g);

    // --- Kaksi pistettä ja kaksi nimeä --------------------------------
    const lahto = this.ui.game.board?.cityById?.get(LENNON_LAHTO);
    const kohde = this.ui.game.cityOf?.();
    // Ilman kumpaakin päätä nimikerros jää pois: harso on jo paikallaan,
    // ja lento näyttää tällöin samalta kuin v1103:ssa.
    if (!lahto || !kohde || lahto.id === kohde.id) return;
    const skaala = this.nakyvaAlueenSkaala();
    for (const kaupunki of [lahto, kohde]) {
      el('circle', {
        cx: kaupunki.x,
        cy: kaupunki.y,
        r: LENNON_PISTE_PX / skaala,
        class: 'aloituslento-piste',
      }, g);
      const teksti = el('text', {
        x: kaupunki.x,
        // Nimi pisteen ALLE: kaari kaartuu aina pohjoiseen
        // (js/ui.js aloituslennonOhjauspiste), joten alapuoli on se
        // laita, jossa nimi ei osu viivaan kummassakaan päässä.
        y: kaupunki.y + (LENNON_NIMI_VALI_PX + LENNON_NIMI_PX) / skaala,
        'font-size': LENNON_NIMI_PX / skaala,
        // Pergamenttihalo samassa mittakaavassa kuin kirjasin (css
        // .aloituslento-nimi): kiinteä pikselileveys katoaisi tai
        // paksuuntuisi zoomin mukana.
        'stroke-width': (LENNON_NIMI_PX * LENNON_HALO_OSUUS) / skaala,
        'text-anchor': 'middle',
        class: 'aloituslento-nimi',
      }, g);
      teksti.textContent = kaupunki.name ?? '';
    }
  }

  /** Kartan mittakaava ruudulla; nolla ja puuttuva alue tarkoittavat 1. */
  nakyvaAlueenSkaala() {
    const skaala = this.ui.nakyvaAlue?.()?.skaala;
    return Number.isFinite(skaala) && skaala > 0 ? skaala : 1;
  }

  /**
   * Pysäyttää kesken olevan ajon.
   *
   * `kirjaa` (oletus) jättää kartan siihen näkymään, mihin ajo ehti:
   * välivaiheen mittakaava ja keskipiste kirjataan oikeaksi
   * kameratilaksi samalla tavalla kuin nipistyksen lopetuksessa. Ilman
   * sitä muunnos vain pyyhitään ja kartta jää ajon MAALIIN — juuri se
   * hyppy, jota ele ei saa aiheuttaa.
   */
  pysaytaKameraAjo(kirjaa = true) {
    const ajo = this.kameraAjo;
    if (!ajo) return false;
    this.kameraAjo = null;
    cancelAnimationFrame(ajo.kehys);
    const svg = this.ui.svg;
    if (svg) {
      svg.style.transform = '';
      svg.style.transition = '';
    }
    document.body.classList.remove('zoom-kaynnissa');
    if (kirjaa && svg && !this.ui.dead) {
      const pane = svg.parentElement;
      const yleis = pane ? this.yleiskuvanSkaala(pane.clientWidth, pane.clientHeight) : 0;
      const { pienin, suurin } = this.zoomiRajat();
      if (yleis) {
        this.ui.zoomiVapaa = Math.min(suurin, Math.max(pienin, ajo.nyt.skaala / yleis));
        this.ui.zoomKohde = { x: ajo.nyt.x, y: ajo.nyt.y };
        this.ui.panX = null;
        this.ui.panY = null;
        this.fitViewBox();
        this.paivitaZoomiNapit();
      }
    }
    ajo.valmis(false);
    return true;
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
    this.asetaPan(this.ui.panX, this.ui.panY);
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
   * ============ KAMERA PELIN KÄSISSÄ — PANOROINTI VALLOITETULLE
   * ALUEELLE (Raamatun osio "Fokusmoodi", omistaja 24.8.2026 illalla,
   * tarkennettu saman illan pelitestissä) =============================
   *
   * Ensimmäinen linjaus oli *"käsin vieritys POIS KOKONAAN"*. Omistaja
   * tarkensi sen samana iltana: karttaa PITÄÄ pystyä liikuttamaan
   * käsin, mutta VAIN VALLOITETULLA ALUEELLA JA SEN LÄHEISYYDESSÄ.
   * Peli ajaa kameran edelleen itse (kamera-ajot), ja käsi saa liikkua
   * siellä, missä matka on jo käynyt.
   *
   * ALUE ON SAMA KUIN SUMUVERHOLLA. Käydyt maat ja nykyinen maa ovat
   * jo laskettuna yhdessä paikassa (js/ui.js fokusMaat) — se on
   * fokusmoodin oma määritelmä siitä, mikä maailmasta on "auki".
   * Kaksi eri määritelmää samasta asiasta ajautuisi erilleen, ja
   * pelaaja näkisi tarkan kartan alueelta, jonne ei voi panoroida (tai
   * päinvastoin). Bboxien yhdisteeseen lisätään REILU MARGINAALI, jotta
   * rajamaa ei jää ruudun laitaan kiinni.
   *
   * KESKIPISTE RAJATAAN, EI REUNAA. Jos koko näkyvän ikkunan pitäisi
   * mahtua alueen sisään, yhden maan kokoinen alue lukitsisi kartan
   * paikalleen heti kun zoomaa ulos — ikkuna on silloin aluetta isompi
   * eikä yksikään pan-arvo kelpaisi. Rajaamalla NÄKYMÄN KESKIPISTE
   * alueen sisään pelaaja saa aina liikkua, ja reunan yli näkyy noin
   * puoli ruutua: juuri se "läheisyys", jonka omistaja pyysi.
   *
   * MISSÄ TÄTÄ SOVELLETAAN: vain käsieleessä (raahaus ja sen liuku).
   * Pelin omat kamera-ajot menevät asetaPanin läpi rajaamattomina —
   * aloituslento Lontoosta Ateenaan ja kohdenoston ajo Korintin
   * kanavalle veisivät muuten kameran alueen ulkopuolelle ja
   * kilpailisivat oman rajauksensa kanssa.
   *
   * ZOOMAUS ENNALLAAN (nipistys, painikkeet, hiiren rulla), samoin
   * elekeskeytys: pelaajan ele keskeyttää kamera-ajon kuten ennenkin.
   *
   * KEHITTÄJÄTILASSA VAPAA — ja ilman fokusmoodia (vertailutila,
   * katselulinkit) sekin on pelin vanha rajaton panorointi.
   *
   * KEHITTÄJÄN "rajat"-NAPPI (omistajan tilaus 25.8.2026) kytkee
   * pelaajan rajoitteen takaisin päälle kehittäjätilassakin. Oletus on
   * pois, eli kehittäjätilan vanha vapaa panorointi säilyy sellaisenaan
   * — nappi on nimenomaan tapa PYYTÄÄ autenttinen rajoite, ei uusi
   * oletus (ks. js/ui-apurit.js kehittajaRajatPaalla).
   */
  panorointiVapaa() {
    if (kehittajaTilaPaalla()) return !kehittajaRajatPaalla();
    return !fokusmoodiPaalla();
  }

  /**
   * Valloitetun alueen laatikko laudan yksiköissä — tai null, kun
   * panorointi on vapaa (kehittäjätila, fokusmoodi pois, lauta ilman
   * maiden muotoja).
   *
   * TULOS VÄLIMUISTITETAAN maalistalla: renkaita on maailmankartalla
   * tuhansia pisteitä, eikä niitä saa käydä läpi jokaisella
   * pointermovella. Uusi maa listalla vaihtaa avaimen, ja laatikko
   * lasketaan silloin kerran uudelleen.
   */
  valloitettuAlue() {
    if (this.panorointiVapaa()) return null;
    const maat = this.ui.fokusMaat?.();
    const muodot = this.ui.game?.pack?.map?.countryShapes;
    if (!maat?.size || !muodot) return null;
    const avain = `${this.ui.game.pack.id}:${[...maat].sort().join(',')}`;
    if (this.panAlueAvain === avain) return this.panAlue;
    let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
    for (const iso of maat) {
      for (const rengas of muodot[iso]?.renkaat ?? []) {
        for (const [x, y] of rengas) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    this.panAlueAvain = avain;
    this.panAlue = null;
    if (!Number.isFinite(x0) || !(x1 > x0) || !(y1 > y0)) return null;
    /*
     * MARGINAALI ON NELIÖMÄINEN JA SUHTEELLINEN: neljännes alueen
     * PIDEMMÄSTÄ sivusta joka reunalle. Suhteellisuus pitää mitan
     * mielekkäänä laudasta riippumatta (maailmankartta on 12 000
     * yksikköä leveä, Eurooppa noin 1 000), ja pidemmän sivun
     * käyttäminen antaa kapealle maalle — Chilelle, Norjalle — leveyttä
     * yhtä paljon kuin korkeutta.
     */
    const marginaali = 0.25 * Math.max(x1 - x0, y1 - y0);
    this.panAlue = {
      x0: x0 - marginaali,
      x1: x1 + marginaali,
      y0: y0 - marginaali,
      y1: y1 + marginaali,
    };
    return this.panAlue;
  }

  /*
   * ============ FOKUSIKKUNA RAJAA KAMERAN (omistajan pelitesti
   * 24.8.2026 illalla, v1101) =========================================
   *
   * *"Fokustilassa näkyy vanha pelilauta fokuskuvan ulkopuolella"* —
   * Kreikka uloszoomattuna näytti fokuskuvan pienenä suorakaiteena
   * keskellä vanhaa lautaa, reunat ja kaikki.
   *
   * JUURISYY OLI KAKSIOSAINEN. Loitonnusta ei rajannut MIKÄÄN: portaikon
   * pohja on koko laudan leveys (zoomiTasot), ja maailmankartalla se on
   * puoli maapalloa. Käsin panorointia rajasi vain valloitettu alue
   * (rajaaKasinPan) ja sielläkin vain NÄKYMÄN KESKIPISTE — ruudun reunat
   * saivat mennä minne tahansa, ja kehittäjätilassa rajausta ei ollut
   * lainkaan.
   *
   * KOLME SÄÄNTÖÄ:
   *
   *   1. IKKUNA ON POHJA. Loitonnus pysähtyy siihen mittakaavaan, jolla
   *      maan fokusikkuna (FOKUS_POHJAT[iso].rajaus) juuri mahtuu
   *      ruudulle — täsmälleen se näkymä, johon saapumisajo vie
   *      (js/fokuskartta.js). Kauemmas ei pääse painikkeella, rullalla,
   *      nipistyksellä eikä pelin omalla kamera-ajolla.
   *   2. REUNAT, EI KESKIPISTE. Käsiele rajataan niin, että ruudun
   *      REUNAT pysyvät kuvan sisällä. Kun ruutu on kuvaa isompi
   *      (pystyruudulla kuvat ovat vaakasuuntaisia), akseli lukitaan
   *      kuvan keskelle — vuoto jakautuu silloin tasan molemmin puolin
   *      eikä pelaaja voi vetää kuvaa laitaan.
   *   3. MATKAVALINTA LAAJENTAA. Jos rajaus olisi ehdoton, naapurimaahan
   *      osoittava matkakohde jäisi ruudun ulkopuolelle eikä matkaan
   *      pääsisi. Valinnan ollessa auki alueeseen lisätään kohteiden
   *      omat pisteet (ks. matkakohteidenAlue) — peli ei koskaan rajaa
   *      itseään umpikujaan.
   *
   * MITTA ON KUVA, EI VALLOITETTU ALUE. Rajaus on voimassa täsmälleen
   * silloin kun kartalla on fokuskuva (ui.fokusPohjaBbox) — myös
   * kehittäjätilassa, koska juuri siinä tilassa omistaja pelitestaa.
   * Ilman kuvaa mikään ei muutu: vanha valloitetun alueen rajaus jää
   * voimaan sellaisenaan.
   */

  /**
   * Fokusnäkymän rajaukset laudan yksiköissä tai null.
   *
   * `ikkuna` on se, mitä kameran pitää näyttää (uloszoomauksen pohja),
   * `kuva` se, minkä ulkopuolelle ei saa panoroida. Ne eivät ole sama
   * laatikko: kuvassa on ikkunan ympärillä vuotoa, joka sulattaa sauman
   * lautaan (js/fokuskartta.js).
   */
  fokusRajaukset() {
    if (!this.ui.fokusmoodi || this.ui.katselu) return null;
    /*
     * KEHITTÄJÄN "rajat"-NAPPI OHITTAA KUVAN RAJAUKSENKIN (omistajan
     * tilaus 25.8.2026). Kommentti yllä sanoi *"myös kehittäjätilassa,
     * koska juuri siinä tilassa omistaja pelitestaa"* — ja se pitää yhä
     * paikkansa silloin kun rajoite on pyydetty päälle. Nyt atlas on
     * jatkuva pinta, jossa naapurimaiden lehdet piirtyvät samaan aikaan
     * (js/fokuskartta.js), ja sen selaaminen on koko uuden näkymän
     * tarkistamisen ehto: fokusikkuna lukitsisi kameran yhteen maahan.
     * Sama nappi, sama sääntö kuin panorointiVapaassa.
     */
    if (kehittajaTilaPaalla() && !kehittajaRajatPaalla()) return null;
    /*
     * VAIN LÄHIKUVASSA. Yleiskuva (mannerZoom pois) on laudan oma
     * näkymä, jossa fokuskuva on pieni upote maailmankartalla eikä
     * pelaajan näkymä — sinne jäävät liikeherkkyyttä toivovat pelaajat,
     * joille saapumiszoomia ei ajeta lainkaan (mannerZoomTarpeen). Kun
     * kartta on siellä, kuvan säännöt eivät päde: lauta on lauta.
     */
    if (!this.ui.mannerZoom) return null;
    /*
     * ALOITUSLENTO OMISTAA KAMERAN (ks. ajaKamera): sen rajaus ulottuu
     * Lontoosta kohdemaahan, eikä sitä saa kutistaa kohdemaan kuvaan
     * kesken lennon.
     */
    if (this.ui.aloituslentoKesken) return null;
    const kuva = this.ui.fokusPohjaBbox;
    if (!(kuva?.w > 0) || !(kuva?.h > 0)) return null;
    const ikkuna = this.ui.fokusPohjaRajaus ?? kuva;
    const kohteet = this.matkakohteidenAlue();
    if (!kohteet) return { ikkuna, kuva };
    return { ikkuna: yhdistaAlue(ikkuna, kohteet), kuva: yhdistaAlue(kuva, kohteet) };
  }

  /**
   * Auki olevan matkavalinnan kohteiden yhteinen laatikko tai null.
   *
   * Pisteet luetaan kohdekerroksen napautusalueista eikä pelin
   * säännöistä: kohteiden kokoamissäännöt (kehittäjätila, lennot,
   * nopanheitto) asuvat yhdessä paikassa (ui.drawTargets), eikä niitä
   * kirjoiteta tänne toiseen kertaan.
   *
   * KIERTÄVÄN LAUDAN KOPIOT tuodaan takaisin laudan omalle välille
   * (ui.kiertoKohdat piirtää napautettavat kohdat myös laudan leveyden
   * päähän); muuten yksi kopio venyttäisi laatikon koko maailman yli.
   *
   * Tulos välimuistitetaan, koska tätä kysytään jokaisella
   * pointermovella.
   */
  matkakohteidenAlue() {
    if (!this.ui.fokusMatkavalintaAuki?.()) return null;
    const osumat = this.ui.targetLayer?.querySelectorAll('.target-hit');
    if (!osumat?.length) return null;
    const avain = `${this.ui.game.phase}:${this.ui.game.turn}:${osumat.length}`;
    if (this.kohdeAlueAvain === avain) return this.kohdeAlue;
    this.kohdeAlueAvain = avain;
    this.kohdeAlue = null;
    const W = this.kiertava() ? (this.ui.game.pack.map?.width ?? 0) : 0;
    let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
    for (const osuma of osumat) {
      let x = Number(osuma.getAttribute('cx'));
      const y = Number(osuma.getAttribute('cy'));
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      if (W && x >= W) x -= W;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    if (!Number.isFinite(x0)) return null;
    // Pieni marginaali, ettei kohde jää täsmälleen ruudun laitaan.
    const vara = Math.max(20, 0.06 * Math.max(x1 - x0, y1 - y0));
    this.kohdeAlue = {
      x: x0 - vara, y: y0 - vara, w: (x1 - x0) + 2 * vara, h: (y1 - y0) + 2 * vara,
    };
    return this.kohdeAlue;
  }

  /**
   * Pienin sallittu zoomikerroin fokusikkunan takia (0 = ei rajausta).
   *
   * Sama mittakaava kuin saapumisajossa: ikkuna juuri ja juuri ruudulle
   * (ajaKamera { bbox: ikkuna, marginaali: 0 }). Yläraja on portaikon
   * tihein porras — rajaus ei saa koskaan viedä lähemmäs kuin mihin
   * pelaaja pääsee omin käsin.
   */
  fokusZoomMinimi() {
    const rajat = this.fokusRajaukset();
    if (!rajat) return 0;
    const pane = this.ui.svg?.parentElement;
    const paneW = pane?.clientWidth ?? 0;
    const paneH = pane?.clientHeight ?? 0;
    if (!paneW || !paneH) return 0;
    const yleis = this.yleiskuvanSkaala(paneW, paneH);
    if (!yleis) return 0;
    const { ikkuna } = rajat;
    const skaala = Math.min(paneW / ikkuna.w, paneH / ikkuna.h);
    if (!(skaala > 0)) return 0;
    const tasot = this.zoomiTasot();
    return Math.min(tasot.at(-1) ?? MANNER_ZOOM, skaala / yleis);
  }

  /**
   * Ollaanko jo fokusikkunan pohjalla?
   *
   * Loitonnusnapin himmennys lukee tämän: viimeinen askel on vapaa
   * kerroin eikä porras (ks. zoomaaPainikkeella), joten pelkkä
   * porrasindeksi ei kertoisi ollaanko pohjassa.
   */
  fokusPohjallaOllaan() {
    const pohja = this.fokusZoomMinimi();
    if (!(pohja > 0)) return false;
    const nyt = this.ui.zoomiVapaa || (this.zoomiTasot()[this.zoomiIndeksi] ?? 0);
    return nyt > 0 && nyt <= pohja * 1.001;
  }

  /** Sama pohja portaikon indeksinä: loitonnusnappi pysähtyy tähän. */
  fokusPorrasMinimi() {
    const pohja = this.fokusZoomMinimi();
    if (!(pohja > 0)) return 0;
    const tasot = this.zoomiTasot();
    const i = tasot.findIndex((t) => t >= pohja * 0.999);
    return i < 0 ? tasot.length - 1 : i;
  }

  /**
   * Fokuskuva ilmestyi kartalle: jos näkymä on sen ikkunaa laajempi,
   * kamera ajaa ikkunaan.
   *
   * Kutsutaan ui.paivitaFokusPohjasta. Kuva saapuu verkosta vasta
   * piirron jälkeen, ja siihen asti pelaaja on voinut jäädä yleiskuvaan
   * (uudelleenlataus kesken pelin, edellisen maan jälkeen loitonnettu
   * näkymä) — silloin uusi pohja ei saa jäädä pelkäksi säännöksi, jonka
   * kartta rikkoo jo valmiiksi.
   */
  tarkistaFokusZoom() {
    const rajat = this.fokusRajaukset();
    if (!rajat) return;
    const pohja = this.fokusZoomMinimi();
    const nyt = this.kameranTila();
    const pane = this.ui.svg?.parentElement;
    if (!pohja || !nyt || !pane) return;
    const yleis = this.yleiskuvanSkaala(pane.clientWidth, pane.clientHeight);
    if (!yleis || nyt.skaala >= yleis * pohja * 0.999) return;
    this.ajaKamera({ bbox: rajat.ikkuna, marginaali: 0 });
  }

  /**
   * Käsieleen pan-arvot rajattuna fokuskuvan sisään.
   *
   * REUNAT EIKÄ KESKIPISTE (ks. osion johdanto). Ruudun vasen reuna on
   * laudan yksiköissä `origo - pan / skaala` — sama muunnos kuin
   * asetaPanissa, vain toisin päin.
   *
   * KIERTÄVÄ LAUTA: asetaPan normalisoi panX yhden laudan leveyden
   * jaksoon, joten tästä palautettu arvo tarkoittaa samaa kohtaa
   * laudalla vaikka se olisi jakson ulkopuolella. Päivämäärärajan yli
   * ulottuva fokuskuva rajautuisi väärin — tiedossa oleva
   * yksinkertaistus, joka ei koske yhtäkään nykyistä pohjaa.
   */
  rajaaFokusPan(x, y, alue) {
    const pane = this.ui.svg?.parentElement;
    const skaala = this.ui.zoomSkaala;
    if (!pane || !skaala || !Number.isFinite(skaala) || skaala <= 0) return { x, y };
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const ylaReuna = this.ui.zoomYlaReuna ?? box.y;
    /** Yksi akseli: pan sisään, rajattu pan ulos. */
    const rajaa = (pan, mitta, origo, a0, pituus) => {
      const nakyva = mitta / skaala;
      const alku = origo - pan / skaala;
      // Ruutua pienempi alue lukitaan keskelle: vuoto tasan molemmin
      // puolin eikä pelaajan vedettävissä toiseen laitaan.
      const kohde = nakyva >= pituus
        ? a0 + pituus / 2 - nakyva / 2
        : Math.min(a0 + pituus - nakyva, Math.max(a0, alku));
      return Math.abs(kohde - alku) < 0.001 ? pan : -(kohde - origo) * skaala;
    };
    return {
      x: rajaa(x, pane.clientWidth, box.x, alue.x, alue.w),
      y: rajaa(y, pane.clientHeight, ylaReuna, alue.y, alue.h),
    };
  }

  /**
   * Käsieleen pan-arvot rajattuna valloitetulle alueelle.
   *
   * Muunnos ruutupikselien ja laudan yksiköiden välillä on sama kuin
   * asetaPanissa ja kameranKohteessa: ruudun piste x vastaa laudan
   * kohtaa `box.x + (x - panX) / skaala`. Näkymän keskipiste on siis
   * `box.x + (paneW / 2 - panX) / skaala`, ja juuri se rajataan.
   *
   * KIERTÄVÄ LAUTA: panX on normalisoitu yhden laudan leveyden
   * jaksoon, joten keskipiste kääritään ensin laudan omalle välille.
   * Päivämäärärajan yli ulottuva valloitus (Tyynenmeren molemmat
   * puolet) rajautuisi tällöin lyhyempää reittiä — tiedossa oleva
   * yksinkertaistus, joka ei koske yhtäkään nykyistä maata.
   */
  rajaaKasinPan(x, y) {
    /*
     * FOKUSKUVA VOITTAA VALLOITETUN ALUEEN. Kuva on tiukempi ja
     * tuoreempi sääntö (v1101), ja se on voimassa myös kehittäjätilassa
     * — juuri siinä tilassa vika pelitestattiin.
     */
    const fokus = this.fokusRajaukset();
    if (fokus) return this.rajaaFokusPan(x, y, fokus.kuva);
    const alue = this.valloitettuAlue();
    const pane = this.ui.svg?.parentElement;
    const skaala = this.ui.zoomSkaala;
    if (!alue || !pane || !skaala || !Number.isFinite(skaala) || skaala <= 0) return { x, y };
    const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
    const ylaReuna = this.ui.zoomYlaReuna ?? box.y;
    const paneW = pane.clientWidth;
    const paneH = pane.clientHeight;

    let uusiX = x;
    const jakso = this.ui.panJakso;
    let dx = (paneW / 2 - x) / skaala;
    if (jakso && box.w > 0) dx = ((dx % box.w) + box.w) % box.w;
    const cx = Math.min(alue.x1, Math.max(alue.x0, box.x + dx));
    if (Math.abs(cx - (box.x + dx)) > 0.001) uusiX = paneW / 2 - (cx - box.x) * skaala;

    let uusiY = y;
    const cyRaaka = ylaReuna + (paneH / 2 - y) / skaala;
    const cy = Math.min(alue.y1, Math.max(alue.y0, cyRaaka));
    if (Math.abs(cy - cyRaaka) > 0.001) uusiY = paneH / 2 - (cy - ylaReuna) * skaala;

    return { x: uusiX, y: uusiY };
  }

  /**
   * Vaakapanorointi lähikuvassa. Sormen liike siirtää karttaa; pystyyn ei
   * reagoida. Raahauksen ajaksi kartan animaatiot vaimennetaan
   * (omistajan toive), jotta ruudunpäivitys pysyy nopeana.
   */
  asennaPanorointi() {
    const pane = this.ui.svg.parentElement;
    let alku = null;
    let liikkui = false;

    /*
     * --- KARTAN PÄÄLLÄ KELLUVA UI EI OLE KARTTA ----------------------
     *
     * Omistajan pelitestipalaute 24.8.2026 (v1098, puhelin): *"Kartta
     * liikkuu kun Pöllön tekstiä vierittää."*
     *
     * Fokusvirran kortti on .map-panen SUORA LAPSI (js/fokusvirta.js
     * piirraKehys: `koti = document.querySelector('.map-pane')`), joten
     * jokainen sen päällä alkava osoitin-, kosketus- ja rullatapahtuma
     * kuplii tänne paneelin kuuntelijoille. Ne eivät katsoneet
     * lainkaan, mistä ele alkoi — sormen liike kortin tekstissä oli
     * niille tavallinen raahaus, ja kartta valui tekstin alta pois.
     * Sama vika kolmella kanavalla:
     *   - yksi sormi  → panorointi (pointerdown/-move)
     *   - kaksi sormea → nipistyszoomi (touchstart/touchmove)
     *   - hiiren rulla → kartan zoomi JA preventDefault, joten pitkä
     *     kortti ei edes vierittynyt työpöydällä.
     *
     * Korjaus on pidättäytyminen eikä uusi mekaniikka: kortin oma
     * vieritys hoituu selaimen puolella (.fokusvirta-sisalto:
     * overflow-y + overscroll-behavior: contain, css/fokusvirta.css),
     * joten kartan käsittelijöiden riittää tunnistaa kelluva pinta ja
     * jättää ele rauhaan. Kartan omat eleet — suoraan laudalta tai
     * paneelin pergamenttitaustalta — kulkevat entiseen tapaan, ja
     * kaappausvaiheen elevahdit (osoitinKartalla, kamera-ajon
     * keskeytys) jätetään tarkoituksella koskematta: ne eivät liikuta
     * karttaa, ja pelaajan kosketus on niille aito merkki siitä, että
     * animaation pitää väistää.
     *
     * Matkakirjakortti (.fact-card) ei tarvitse suojaa: se asuu
     * .rail-elementissä eikä paneelin sisällä (index.html), joten sen
     * eleet eivät kuplineet kartalle alun perinkään. Pöllön kupla ja
     * kuvan suurennos ovat bodyssa, mutta ne ovat listassa mukana,
     * koska kupla siirtyy kiinnityskohteensa mukana (js/pollo.js
     * kiinnitysKohde) eikä sijainti saa ratkaista, toimiiko vieritys.
     */
    const KELLUVA_UI = '.fokusvirta-kortti, .fokusvirta-kupla, .fokuszoom, '
      + '.fokus-maataulu, .fokuskohde-popup';
    /** Alkaako ele kartan päällä kelluvalta pinnalta? */
    const kelluvaltaPinnalta = (e) => Boolean(e?.target?.closest?.(KELLUVA_UI));

    /*
     * ELEVAHTI TARKKUUSTARKISTUSTA VARTEN.
     *
     * Rasterointi vie satoja millisekunteja pääsäikeessä, eikä se saa
     * käynnistyä sormen ollessa kartalla eikä eleiden välissä (ks.
     * tarkistaTarkkuus). Kuuntelijat ovat KAAPPAUSVAIHEESSA ja
     * passiivisia: ne eivät saa muuttaa eleen kulkua eivätkä jäädä
     * väliin, vaikka varsinainen käsittelijä pysäyttäisi kuplinnan.
     *
     * pointermove vain napin ollessa pohjassa: pelkkä hiiren lepääminen
     * kartalla ei ole ele, ja muuten työpöydällä tarkistus ei
     * tapahtuisi koskaan.
     */
    const osoittimet = new Set();
    const paalla = { capture: true, passive: true };
    pane.addEventListener('pointerdown', (e) => {
      osoittimet.add(e.pointerId);
      this.ui.osoitinKartalla = true;
      this.ui.merkitseKartanEle();
      // Sormi kartalle = liukuva kartta pysähtyy siihen paikkaan.
      pysaytaLiuku(true);
      // Sama koskee kamera-ajoa: ele keskeyttää sen aina (Raamattu
      // "Karttalinssit" / AIKAJANA-AJO: pelaajan ele voittaa animaation).
      this.pysaytaKameraAjo();
      // Pöllön vihjekupla katoaa heti, kun kartalla tapahtuu jotain.
      this.ui.kartallaKosketettu();
    }, paalla);
    /*
     * Sormen irrotessa jatketaan kesken jäänyttä piirtoa.
     *
     * taydennaTaide keskeyttää sarjansa, jos ele alkaa kesken kaiken
     * (taideOdottaa). Raahauksen oma lopetus jatkaa sarjaa vain, jos
     * kartta oikeasti liikkui — pelkän napautuksen jälkeen kesken jäänyt
     * sarja jäisi muuten odottamaan seuraavaa näkymän asettumista, ja
     * kartalla näkyisi siihen asti tyhjää pergamenttia.
     */
    const jatkaKeskenJaanyt = () => {
      if (this.ui.dead || !this.ui.taideOdottaa || this.ui.taidePiirtyy) return;
      if (this.ui.eleKesken()) return;
      this.ui.taydennaTaide({ heti: true });
    };
    const irrota = (e) => {
      osoittimet.delete(e.pointerId);
      this.ui.osoitinKartalla = osoittimet.size > 0;
      this.ui.merkitseKartanEle();
      if (!this.ui.osoitinKartalla) jatkaKeskenJaanyt();
    };
    pane.addEventListener('pointerup', irrota, paalla);
    pane.addEventListener('pointercancel', irrota, paalla);
    pane.addEventListener('pointermove', (e) => {
      if (e.buttons || osoittimet.size) this.ui.merkitseKartanEle();
    }, paalla);
    /*
     * Kosketus omina tapahtuminaan: iOS peruu osoitintapahtumat kesken
     * nipistyksen (ks. nipistyksen kommentti alempana), jolloin
     * pointercancel tyhjentäisi joukon ja vahti luulisi kartan olevan
     * rauhassa — vaikka kaksi sormea on yhä ruudulla.
     */
    pane.addEventListener('touchstart', (e) => {
      /*
       * Yksi sormi + muistissa oleva nipistys = edellinen ele on
       * jäänyt kesken: elävä nipistys päättyy aina touchend/canceliin
       * ennen kuin uusi yhden sormen kosketus voi alkaa. Hylkäys heti
       * tässä, jotta kartta palaa käyttökuntoon ensimmäisestä
       * kosketuksesta eikä vasta jumivahdin viiden sekunnin rajasta
       * (ks. hylkaaNipistys alempana; sama juttu 18.8.2026).
       */
      if (e.touches.length === 1) this.hylkaaNipistys?.();
      this.ui.osoitinKartalla = true;
      this.ui.merkitseKartanEle();
      // iOS voi perua osoitintapahtumat (ks. yllä), joten liuku
      // ja kamera-ajo pysäytetään myös kosketuksesta.
      pysaytaLiuku(true);
      this.pysaytaKameraAjo();
      this.ui.kartallaKosketettu();
    }, paalla);
    pane.addEventListener('touchmove', () => this.ui.merkitseKartanEle(), paalla);
    const kosketusLoppui = (e) => {
      if (e.touches.length === 0) this.ui.osoitinKartalla = osoittimet.size > 0;
      this.ui.merkitseKartanEle();
      if (!this.ui.osoitinKartalla) jatkaKeskenJaanyt();
    };
    pane.addEventListener('touchend', kosketusLoppui, paalla);
    pane.addEventListener('touchcancel', kosketusLoppui, paalla);
    pane.addEventListener('wheel', () => this.ui.merkitseKartanEle(), paalla);

    /*
     * --- nipistys ---------------------------------------------------
     *
     * Omistajan toive: zoomaus nipistyseleen taakse. Painikkeet jäävät,
     * koska tietokoneella ei nipistetä.
     *
     * KOSKETUSTAPAHTUMAT eikä osoitintapahtumat. Ero on ratkaiseva
     * iOS:llä: `touch-action: none` estää siellä vierityksen mutta EI
     * selaimen omaa nipistyszoomia. Safari aloittaa oman eleensä ja
     * peruu osoitintapahtumat kesken kaiken, jolloin käsittelijä ei saa
     * elettä koskaan valmiiksi — omistajan havainto: "nipistys ei tee
     * mitään". `touchmove`in preventDefault pysäyttää sivun zoomin, ja
     * se toimii sekä Safarissa että Chromessa.
     *
     * Ele piirretään CSS-muunnoksella ja mittakaava lukitaan vasta kun
     * sormet irtoavat. Sama sääntö kuin siirrossa ja samasta syystä:
     * rasterointi vie satoja millisekunteja pääsäikeessä.
     *
     * Muunnoksen origo on elementin vasen yläkulma, joten sormien
     * keskipiste pysyy paikallaan kun siirto lasketaan
     *   t = m - (m - siirto) * suhde
     */
    let nipistys = null;

    const kaksiSormea = (e) => {
      const [a, b] = [e.touches[0], e.touches[1]];
      return {
        etaisyys: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY),
        // Asiakaskoordinaatteina: paneelin suhteen laskettu keskipiste
        // ei kelpaa ankkuriksi, koska elementti ei ala paneelin kulmasta.
        keski: { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 },
      };
    };

    /*
     * Ruudun piste laudan koordinaateiksi — ELEMENTIN OMASTA
     * SIJAINNISTA, ei zoomimuuttujista.
     *
     * Ensin laskin tämän kaavalla panX/panY ja zoomYlaReuna. Kaava on
     * oikein, mutta se olettaa SVG:n alkavan paneelin vasemmasta
     * yläkulmasta. Pystysuunnassa se ei pidä paikkaansa: lähikuvassa
     * elementti on `align-self: flex-start`, aloituskartalla `center`,
     * ja asettelu siirtää sitä. Ero näkyi juuri niin kuin omistaja
     * kuvasi — kartta heilahti sormien irrotessa, ja heilahdus oli
     * lähes kokonaan pystysuuntainen.
     *
     * getBoundingClientRect ja viewBox kertovat totuuden ilman
     * oletuksia, ja sama laskenta kelpaa kumpaankin suuntaan.
     */
    const laudanKuvaus = () => {
      const r = this.ui.svg.getBoundingClientRect();
      const vb = this.ui.svg.viewBox?.baseVal;
      if (!r.width || !vb?.width) return null;
      return { r, vb, pxPerYks: r.width / vb.width };
    };

    /**
     * Asiakaskoordinaatti laudan koordinaatiksi — tai null, jos lautaa
     * ei juuri nyt voi mitata.
     *
     * EI KOSKAAN nollapistettä. Aiempi versio palautti virhetilassa
     * { x: 0, y: 0 }, ja se on laudalla oikea paikka: maailmankartan
     * vasen ylänurkka. Kun mittaus petti kesken nipistyksen, eleen
     * ankkuriksi tuli origo ja koko näkymä sinkosi sinne (omistajan
     * havainto iPadilta 13.8.2026: "hyppää ihan eri kohtaan, yleensä
     * Grönlantiin"). Null pakottaa kutsujan valitsemaan järkevän
     * varapisteen sen sijaan, että virhe naamioituisi koordinaatiksi.
     */
    const laudalle = (asiakas) => {
      const k = laudanKuvaus();
      if (!k || !Number.isFinite(asiakas?.x) || !Number.isFinite(asiakas?.y)) return null;
      const p = {
        x: k.vb.x + (asiakas.x - k.r.left) / k.pxPerYks,
        y: k.vb.y + (asiakas.y - k.r.top) / k.pxPerYks,
      };
      return Number.isFinite(p.x) && Number.isFinite(p.y) ? p : null;
    };

    /** Onko piste olemassa ja molemmat koordinaatit äärellisiä lukuja? */
    const kelpaa = (p) => Boolean(p) && Number.isFinite(p.x) && Number.isFinite(p.y);

    /**
     * Eleen ankkuri: sormien alla oleva laudan piste, tai jos sitä ei
     * saada mitattua, NÄKYMÄN KESKIPISTE. Keskipiste on ainoa varapiste,
     * joka ei koskaan heitä näkymää minnekään — zoomi vain syvenee
     * siihen mitä pelaaja jo katsoo.
     */
    const varmaAnkkuri = (asiakas) => {
      const suora = laudalle(asiakas);
      if (suora) return suora;
      const n = this.ui.nakyvaAlue();
      if (n) return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
      const box = this.ui.contentBox ?? { x: 0, y: 0, w: 1000, h: 1000 };
      return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
    };

    const aloitaNipistys = (e) => {
      const { etaisyys, keski } = kaksiSormea(e);
      if (etaisyys < 24) return;
      /*
       * Kokonäkymästä nipistettäessä EI enää hypätä lähikuvatilaan
       * eleen alussa. Aiempi versio teki juuri sen: se sytytti
       * mannerZoomin ja ajoi fitViewBoxin heti kahden sormen osuessa
       * ruutuun, jolloin näkymä loikkasi saapumisportaaseen pelaajan
       * nappulan kohdalle — kesken pelaajan oman eleen ja yleensä aivan
       * muualle kuin minne sormet osoittivat (omistajan havainto:
       * "sisään zoomattaessa kartta saattaa hypätä kokonaan eri
       * kohtaan"). Kerroin ei hyppyä tarvitse: kokonäkymässä
       * zoomiKerroin on portaikon pohja (1), ja ele piirtyy CSS-
       * muunnoksena siitä eteenpäin. Lähikuvatilaan siirrytään vasta
       * paataNipistyksessä, kun tiedetään mihin kohtaan ja kuinka
       * syvälle ele päätyi.
       */
      nipistys = {
        etaisyys,
        keski,
        kohde: varmaAnkkuri(keski),
        panX: this.ui.panX ?? 0,
        panY: this.ui.panY ?? 0,
        kerroin: this.zoomiKerroin,
        suhde: 1,
        /*
         * Paneelin sijainti mitataan KERRAN eleen alussa. Paneeli ei
         * liiku nipistyksen aikana (muunnos kohdistuu karttaan, ei
         * paneeliin), mutta getBoundingClientRect pakottaa asettelun
         * laskennan — ja ison laudan asettelu maksaa kymmeniä
         * millisekunteja. Joka touchmovella se söi kehysbudjetin
         * (mitattuna profiilissa suurin JS-kuluerä eleen aikana).
         */
        laatikko: pane.getBoundingClientRect(),
      };
      alku = null;
      liikkui = false;
      this.ui.kartanRaahaus = true;
      document.body.classList.add('kartta-raahaus');
      // Ele vahtii itse itseään: jos kosketusvirta katkeaa ilman
      // päätöstapahtumaa, ele hylätään (ks. ajastaNipistysVahti).
      ajastaNipistysVahti();
      // Kartta lähtee kahden sormen alla liikkeelle: päiväkirja riviksi.
      this.ui.asetaPaivakirjanKoko(true);
      this.ui.svg.style.transition = '';
    };

    const paivitaNipistys = (e) => {
      if (!nipistys || e.touches.length < 2) return;
      const { etaisyys } = kaksiSormea(e);
      const { pienin, suurin } = this.zoomiRajat();
      // Rajat kertoimessa eikä suhteessa: sama katto riippumatta siitä,
      // mistä ele alkoi.
      const kerroin = Math.min(suurin, Math.max(pienin, nipistys.kerroin * (etaisyys / nipistys.etaisyys)));
      nipistys.suhde = kerroin / nipistys.kerroin;
      // Eleen alussa mitattu paneelin sijainti (ks. aloitaNipistys).
      const laatikko = nipistys.laatikko ?? pane.getBoundingClientRect();
      const m = { x: nipistys.keski.x - laatikko.left, y: nipistys.keski.y - laatikko.top };
      const tx = m.x - (m.x - nipistys.panX) * nipistys.suhde;
      const ty = m.y - (m.y - nipistys.panY) * nipistys.suhde;
      // Kelvoton luku muunnoksessa hylkäisi koko tyylin ja kartta
      // nykäisisi takaisin — parempi jättää edellinen asento voimaan.
      if (!Number.isFinite(tx) || !Number.isFinite(ty)) return;
      this.ui.svg.style.transform =
        `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${nipistys.suhde.toFixed(4)})`;
    };

    const paataNipistys = () => {
      if (!nipistys) return;
      const { pienin } = this.zoomiRajat();
      const kerroin = nipistys.kerroin * nipistys.suhde;
      const kohde = nipistys.kohde;
      const keski = nipistys.keski;
      nipistys = null;
      clearTimeout(this.ui.nipistysVahtiAjastin);
      this.ui.kartanRaahaus = false;
      document.body.classList.remove('kartta-raahaus');
      this.ui.svg.style.transform = '';
      // Napautus eleen jälkeen ei saa valita kaupunkia.
      this.ui.raahattiin = true;
      setTimeout(() => { this.ui.raahattiin = false; }, 0);
      /*
       * Alarajalle nipistäminen palaa kokonäkymään: sama kuin
       * loitonnusnapin viimeinen painallus. Fokusnäkymässä alaraja EI
       * ole kokonäkymä vaan fokusikkuna (zoomiRajat), joten paluu on
       * silloin torjuttava — muuten nipistys karkaisi juuri sinne,
       * mihin loitonnusnappi ei enää päästä.
       */
      if (this.yleiskuvaSallittu() && kerroin <= pienin * 1.02) {
        this.nollaaAloitusZoom();
        this.fitViewBox();
        this.paivitaZoomiNapit();
        return;
      }
      // Kokonäkymästä alkanut ele astuu lähikuvatilaan vasta tässä,
      // kun eleen lopputulos tunnetaan (ks. aloitaNipistys).
      if (!this.ui.mannerZoom && !this.ui.aloitusZoom) {
        this.ui.mannerZoom = true;
        document.body.classList.add('manner-zoom');
      }
      /*
       * Uusi mittakaava — ja sen jälkeen ankkuri takaisin sormien alle.
       *
       * fitViewBox keskittää kartan zoomKohteeseen eli ruudun KESKELLE.
       * Eleen aikana ankkuri on kuitenkin sormien keskipisteessä, ja jos
       * se lopuksi siirretään ruudun keskelle, kartta heilahtaa juuri sen
       * verran kuin sormet olivat keskeltä sivussa. Omistaja: "kartta
       * heilahtaa rajusti kun sormet päästää irti."
       *
       * Siksi vieritys lasketaan tässä uudelleen suoraan ankkurista:
       * piste, joka oli sormien alla, on siellä yhä.
       *
       * Kelvoton ankkuri EI kelpaa kohteeksi: silloin zoomKohde jää
       * tyhjäksi ja sovitaMannerZoom keskittää pelaajan nappulaan —
       * ei koskaan laudan origoon (Grönlanti-hyppy, ks. laudalle).
       */
      this.ui.zoomiVapaa = kerroin;
      this.ui.zoomKohde = kelpaa(kohde) ? kohde : null;
      this.ui.panX = null;
      this.ui.panY = null;
      this.fitViewBox();
      const k = laudanKuvaus();
      if (k && kelpaa(kohde) && kelpaa(keski)) {
        // Elementin asettelusijainti = nykyinen kulma miinus nykyinen siirto.
        const asetteluX = k.r.left - (this.ui.panX ?? 0);
        const asetteluY = k.r.top - (this.ui.panY ?? 0);
        this.asetaPan(
          keski.x - asetteluX - (kohde.x - k.vb.x) * k.pxPerYks,
          keski.y - asetteluY - (kohde.y - k.vb.y) * k.pxPerYks,
        );
      }
      this.paivitaZoomiNapit();
      this.ui.taydennaTaide({ heti: true });
    };

    /*
     * KESKEN JÄÄNYT NIPISTYS HYLÄTÄÄN (omistajan kuvakaappaus iPadilta
     * 18.8.2026, v884: kartta pienentyneenä ja työntyneenä oikealle
     * alas kesken pelin, pergamenttikaista vasemmassa reunassa,
     * MATKAKIRJASTA-kyltti kaupunkinimen päällä ja noppa irrallaan
     * kaistalla).
     *
     * Nipistys päättyy VAIN touchend/touchcancel-tapahtumaan, eikä
     * iOS toimita kumpaakaan, kun järjestelmä ottaa eleen itselleen
     * (sovellusvaihto, reunapyyhkäisy, ilmoitus) tai modaalinen
     * ikkuna avautuu sormien alla. Silloin svg:hen jää eleen
     * välivaiheen muunnos — scale + siirto — eikä mikään kirjoita
     * sitä yli: jumivahti (ui.js eleKesken) laski vain liput,
     * fitViewBox ei laukea ilman koon muutosta, ja panorointi on
     * nipistys-tilan takia kuollut. Mitattu Chromiumissa 18.8.2026
     * (nipistys ilman päätöstapahtumaa): scale(0.4)-muunnos jäi
     * voimaan pysyvästi ja yhden sormen panorointi lakkasi.
     *
     * Hylkäys EI vie elettä loppuun — kesken jääneen eleen
     * lopputulosta ei tiedetä — vaan palaa eleen edeltävään tilaan:
     * paivitaNipistys muuttaa vain style.transformia, joten pan- ja
     * zoomitila ovat koskemattomat, ja fitViewBox johtaa näkyvän
     * geometrian niistä uudelleen (sama ankkurioppi kuin
     * taustapaluussa: ei erovertailua, turha ajo on halpa).
     */
    const hylkaaNipistys = () => {
      if (!nipistys) return;
      nipistys = null;
      clearTimeout(this.ui.nipistysVahtiAjastin);
      this.ui.kartanRaahaus = false;
      document.body.classList.remove('kartta-raahaus');
      // Yleiskuvan haara ei kirjoita muunnosta (asetaPan ajetaan vain
      // lähikuvissa), joten eleen jälki pyyhitään ensin käsin.
      this.ui.svg.style.transform = '';
      this.fitViewBox();
    };
    // Kentäksi asti: ui.js:n jumivahti (eleKesken) ja taustapaluun
    // sovitus kutsuvat tätä, kun ele ei enää voi olla elossa.
    this.hylkaaNipistys = hylkaaNipistys;

    /*
     * NIPISTYKSEN OMA JUMIVAHTI. ui.js:n jumivahti (eleKesken) elää
     * tarkkuussilmukan varassa, ja silmukka sammuu kun kartta on
     * levossa — juuri silloin, kun jumiutunut ele tarvitsisi sitä
     * (mitattu 18.8.2026: levossa alkanut kesken jäänyt nipistys ei
     * purkautunut koskaan ilman uutta kosketusta). Siksi elävä
     * nipistys ajastaa oman tarkistuksensa: jos kosketusvirta on
     * ollut hiljaa yli jumirajan eikä elettä ole päätetty, ele on
     * orpo ja hylätään. Sama viiden sekunnin oppi kuin eleKeskenissä:
     * sormet eivät lepää ruudulla viittä sekuntia liikkumatta.
     * paataNipistys ja hylkaaNipistys sammuttavat vahdin; ui.destroy
     * siivoaa ajastimen kuolleesta pelistä.
     */
    const NIPISTYS_JUMI_MS = 5000;
    const ajastaNipistysVahti = () => {
      clearTimeout(this.ui.nipistysVahtiAjastin);
      this.ui.nipistysVahtiAjastin = setTimeout(() => {
        if (!nipistys || this.ui.dead) return;
        const hiljaa = performance.now() - (this.ui.kartanEleHetki ?? 0);
        if (hiljaa > NIPISTYS_JUMI_MS) hylkaaNipistys();
        else ajastaNipistysVahti();
      }, NIPISTYS_JUMI_MS + 200);
    };

    this.ui.nipistysKuuntelijat = [
      ['touchstart', (e) => {
        if (e.touches.length !== 2) return;
        // Kortin päältä alkava kahden sormen ele ei ole kartan nipistys
        // (ks. KELLUVA_UI): preventDefault veisi eleen myös selaimelta.
        if (kelluvaltaPinnalta(e)) return;
        e.preventDefault();
        aloitaNipistys(e);
      }],
      ['touchmove', (e) => {
        /*
         * ALOITUS MYÖS LIIKKEESTÄ (omistajan iPad-havainto v639:
         * "zoomi hyppii edelleen"). Kun sormet laskeutuvat alle
         * aloituskynnyksen (24 px) päähän toisistaan — tavallinen
         * tapa aloittaa nipistys — aloitaNipistys palasi tyhjin käsin
         * EIKÄ elettä yritetty enää koskaan uudestaan. Kosketuksia ei
         * silloin myöskään estetty, joten Safari otti eleen itselleen
         * ja zoomasi koko sivua: kartta "hyppäsi" aivan muualle.
         * Nyt kahden sormen liike estetään aina selaimelta ja aloitus
         * yritetään joka liikkeellä, kunnes sormet ovat kyllin
         * etäällä — ele alkaa siitä asennosta, ei alkuperäisestä.
         */
        if (!nipistys && e.touches.length === 2) {
          if (kelluvaltaPinnalta(e)) return;
          e.preventDefault();
          aloitaNipistys(e);
          return;
        }
        if (!nipistys) return;
        e.preventDefault();
        paivitaNipistys(e);
      }],
      ['touchend', (e) => { if (nipistys && e.touches.length < 2) paataNipistys(); }],
      ['touchcancel', () => { if (nipistys) paataNipistys(); }],
      // Safarin oma ele: estetään, ettei sivu zoomaa kartan alta.
      ['gesturestart', (e) => e.preventDefault()],
      ['gesturechange', (e) => e.preventDefault()],
      /*
       * HIIREN RULLA ZOOMAA (omistajan toive).
       *
       * Työpöydällä kartalla oli vain +/- -painikkeet, ja rulla vieritti
       * sivua kartan alta. Rulla on se, mihin käsi tarttuu kartalla
       * ensimmäisenä.
       *
       * Rulla kulkee samat portaat kuin painikkeet — ei vapaata
       * mittakaavaa. Portaat on valittu niin, ettei mikään paikka näy
       * kahdesti (rajaaSkaala), ja vapaa rulla ohittaisi sen rajan.
       *
       * Kohdistus kursoriin: zoomKohde asetetaan siihen kartan pisteeseen,
       * joka on osoittimen alla, jolloin kuva laajenee siitä eikä ruudun
       * keskeltä. Painikkeet pitävät keskipisteen, koska niillä ei ole
       * osoitinta.
       *
       * Nykäisyjä hillitään: tarkka rulla (trackpad) lähettää kymmeniä
       * tapahtumia yhdestä eleestä, ja jokainen niistä olisi kokonainen
       * porras.
       */
      ['wheel', (e) => {
        if (nipistys) return;
        // Rulla kortin päällä vierittää korttia, ei zoomaa karttaa.
        if (kelluvaltaPinnalta(e)) return;
        if (this.avausNakymassa() || this.ui.radioPaalla()) return;
        e.preventDefault();
        /*
         * Läppärin kahden sormen vieritys EI zoomaa (omistajan toive
         * 10.8.2026: "voisiko sen vaihtaa nipistyseleeseen") —
         * trackpadin nipistys tulee selaimissa ctrl+rullana, ja
         * vieritys pieninä jatkuvina pikselideltoina usein
         * vaaka-akselin kera. Hiiren rullan naksu on rividelta
         * (deltaMode ≠ 0) tai iso pystydelta ilman vaakaa — se
         * zoomaa yhä, kuten alkuperäinen toive vaati.
         */
        const nipistysEle = e.ctrlKey || e.metaKey;
        const rullanNaksu = e.deltaMode !== 0
          || (Math.abs(e.deltaY) >= 50 && e.deltaX === 0);
        if (!nipistysEle && !rullanNaksu) return;
        const nyt = performance.now();
        if (nyt - (this.ui.rullanHetki ?? 0) < RULLAN_VALI_MS) return;
        const suunta = e.deltaY < 0 ? 1 : -1;
        const kohta = this.kartanKohta(e.clientX, e.clientY);
        this.ui.rullanHetki = nyt;
        this.ui.rullanKohta = kohta;
        this.zoomaaPainikkeella(suunta);
        this.ui.rullanKohta = null;
      }],
    ];
    for (const [nimi, kasittele] of this.ui.nipistysKuuntelijat) {
      pane.addEventListener(nimi, kasittele, { passive: false });
    }
    /** Onko nipistys kesken? Siirto ei saa sekaantua siihen. */
    const nipistetaan = () => nipistys !== null;

    /*
     * --- liukupanorointi -------------------------------------------
     *
     * Omistajan toive (13.8.2026): "Earthissa vieritys ei lopu heti
     * kun sormi irtoaa vaan hidastuu pehmeästi."
     *
     * Liuku on samaa elettä kuin raahaus, vain ilman sormea: se elää
     * kokonaan asetaPanissa eli CSS-muunnoksessa, ja kartanRaahaus
     * pidetään pystyssä koko liu'un ajan. Niin rasterointi ja
     * tarkkuusvahti kohtelevat liukua kuin sormi olisi yhä kartalla —
     * kumpikaan ei pääse tökkäisemään kesken liikkeen, ja bittikartta
     * täydennetään vasta kun kartta on oikeasti pysähtynyt. Sama
     * sääntö kuin sormella: "lataus aina vain juuri kun sormi irtoaa."
     *
     * Nopeus mitataan viimeisten ~120 ms:n näytteistä eikä kahdesta
     * viimeisestä tapahtumasta: kosketuksen viime parit värähtelevät,
     * ja pelkästä parista laskettu suunta heittelehtii.
     */
    const LIUKU_IKKUNA_MS = 120; // nopeus mitataan tältä hännältä
    const LIUKU_KYNNYS = 0.25; // px/ms — hitaampi irrotus ei liu'u
    const LIUKU_SAMMUU = 0.02; // px/ms — tässä liuku katsotaan ohi
    const LIUKU_KATTO = 2.5; // px/ms — hurjinkin heitto pysyy aisoissa
    const LIUKU_PUOLIINTUMIS_MS = 190; // kitka: vauhti puolittuu tässä ajassa
    let liuku = null;
    const naytteet = [];

    /**
     * Sammuttaa liu'un. Keskeytys (uusi sormi, zoomi, laudan nollaus)
     * jättää täydennyksen odottamaan seuraavaa sopivaa hetkeä —
     * rasterointia ei koskaan aloiteta juuri kun sormi laskeutuu.
     */
    const pysaytaLiuku = (keskeytys = false) => {
      if (!liuku) return;
      cancelAnimationFrame(liuku.pyynto);
      liuku = null;
      this.ui.kartanRaahaus = false;
      document.body.classList.remove('kartta-raahaus');
      if (keskeytys) this.ui.taideOdottaa = true;
    };
    // Laudan nollaus ja zoomipainikkeet pysäyttävät liu'un tästä.
    this.ui.pysaytaLiuku = pysaytaLiuku;

    const liukuAskel = (t) => {
      if (!liuku || this.ui.dead) return;
      // Katto askeleelle: taustavälilehden jälkeinen jättikehys ei saa
      // singota karttaa.
      const dt = Math.min(64, Math.max(1, t - liuku.viime));
      liuku.viime = t;
      const ennenX = this.ui.panX ?? 0;
      const ennenY = this.ui.panY ?? 0;
      // Liuku on samaa käsielettä kuin raahaus, joten sitä koskee sama
      // valloitetun alueen rajaus (ks. rajaaKasinPan).
      const pyydettyX = ennenX + liuku.vx * dt;
      const pyydettyY = ennenY + liuku.vy * dt;
      const liukuun = this.rajaaKasinPan(pyydettyX, pyydettyY);
      // Alueen raja on liu'ulle sama seinä kuin laudan laita — myös
      // kiertävällä kartalla, jossa laitaa ei muuten ole.
      const alueRajasiX = Math.abs(liukuun.x - pyydettyX) > 0.5;
      const alueRajasiY = Math.abs(liukuun.y - pyydettyY) > 0.5;
      this.asetaPan(liukuun.x, liukuun.y);
      /*
       * Pehmeä pysäytys reunalle: asetaPan rajaa siirron, ja jos
       * akseli ei enää liikkunut edes puolta pyydetystä, ollaan
       * laidassa — sen suunnan vauhti sammutetaan heti eikä jäädä
       * puskemaan rajaa vasten. Kiertävällä kartalla vaakasuunnalla
       * ei ole laitaa (arvo kiertää), joten tarkistus ohitetaan.
       */
      if (liuku.vx && (alueRajasiX || (!this.ui.panJakso
        && Math.abs((this.ui.panX ?? 0) - ennenX) < Math.abs(liuku.vx * dt) / 2))) liuku.vx = 0;
      if (liuku.vy && (alueRajasiY
        || Math.abs((this.ui.panY ?? 0) - ennenY) < Math.abs(liuku.vy * dt) / 2)) liuku.vy = 0;
      // Eksponentiaalinen kitka: aikapohjainen, jotta tuntuma ei
      // riipu ruudun virkistystaajuudesta.
      const vaimennus = 0.5 ** (dt / LIUKU_PUOLIINTUMIS_MS);
      liuku.vx *= vaimennus;
      liuku.vy *= vaimennus;
      if (Math.hypot(liuku.vx, liuku.vy) < LIUKU_SAMMUU) {
        pysaytaLiuku();
        // Liuku päättyi: lepo alkaa nyt, ja kuva täydennetään kuten
        // sormen irrotessa — täsmälleen yksi loppukirjaus.
        this.ui.merkitseKartanEle();
        this.ui.taydennaTaide({ heti: true });
        return;
      }
      liuku.pyynto = requestAnimationFrame(liukuAskel);
    };

    /** Käynnistää liu'un raahauksen päätteeksi. Tosi, jos lähti. */
    const aloitaLiuku = () => {
      if (this.ui.reducedMotion || this.ui.dead) return false;
      const nyt = performance.now();
      while (naytteet.length && nyt - naytteet[0].t > LIUKU_IKKUNA_MS + 40) naytteet.shift();
      if (naytteet.length < 2) return false;
      const eka = naytteet[0];
      const vika = naytteet[naytteet.length - 1];
      const dt = vika.t - eka.t;
      if (dt < 30) return false;
      let vx = (vika.x - eka.x) / dt;
      // Pystyvauhti vain siellä, missä pystysuuntaan voi panoroida —
      // aloituskartalla liike on yksiulotteista kuten raahauskin.
      let vy = this.ui.panVaraY ? (vika.y - eka.y) / dt : 0;
      const vauhti = Math.hypot(vx, vy);
      if (vauhti < LIUKU_KYNNYS) return false;
      if (vauhti > LIUKU_KATTO) {
        vx *= LIUKU_KATTO / vauhti;
        vy *= LIUKU_KATTO / vauhti;
      }
      liuku = { vx, vy, viime: nyt, pyynto: 0 };
      liuku.pyynto = requestAnimationFrame(liukuAskel);
      return true;
    };

    pane.addEventListener('pointerdown', (e) => {
      if (nipistetaan()) return;
      // Kortin, kuplan tai suurennoksen päältä alkava veto jää kortin
      // omaksi vieritykseksi — kartta ei liiku (ks. KELLUVA_UI).
      if (kelluvaltaPinnalta(e)) return;
      if (!this.ui.aloitusZoom && !this.ui.mannerZoom) return;
      if (!this.ui.panVara && !this.ui.panVaraY && !this.ui.panJakso) return;
      alku = {
        x: e.clientX, y: e.clientY, pan: this.ui.panX ?? 0, panY: this.ui.panY ?? 0, id: e.pointerId,
      };
      liikkui = false;
      // Uusi ele, uusi nopeushistoria.
      naytteet.length = 0;
      // Kesken oleva zoomausliuku ei saa jarruttaa raahausta.
      clearTimeout(this.ui.zoomAjastin);
      this.ui.svg.style.transition = '';
      // HUOM: osoitinta EI kaapata tässä. Kaappaus ohjaisi myös
      // click-tapahtuman paneelille, jolloin pelkkä napautus ei enää
      // osuisi kaupunkiin. Kaappaus otetaan vasta kun liike ylittää
      // kynnyksen eli kyse on oikeasti raahauksesta.
    });

    pane.addEventListener('pointermove', (e) => {
      if (nipistetaan()) return;
      if (!alku || e.pointerId !== alku.id) return;
      const dx = e.clientX - alku.x;
      // Mantereella liikutaan molempiin suuntiin, aloituskartalla vain
      // vaakaan (panVaraY on siellä nolla).
      const dy = this.ui.panVaraY ? e.clientY - alku.y : 0;
      // Pieni kynnys: pelkkä napautus ei saa laskea raahaukseksi eikä
      // sammuttaa sykähdyksiä turhaan.
      if (!liikkui && Math.hypot(dx, dy) < 6) return;
      if (!liikkui) {
        liikkui = true;
        this.ui.kartanRaahaus = true;
        document.body.classList.add('kartta-raahaus');
        // Kaappaus voi heittää NotFoundErrorin, jos osoitin ehti
        // peruuntua (iOS peruu osoittimet oman eleensä alta) — raahaus
        // toimii silloinkin, kaappaus vain jää tekemättä.
        try { pane.setPointerCapture?.(e.pointerId); } catch { /* ei kaappausta */ }
        /*
         * Päiväkirja yhdelle riville heti kun kartta lähtee liikkeelle
         * — ja vain kerran eleen aikana (omistajan toive: kortti ei saa
         * napsahdella kesken vierityksen). Tämä haara on kynnyksen
         * takana ja suoritetaan eleessä täsmälleen kerran, ja
         * asetaPaivakirjanKoko palaa saman tien, jos lappu on jo pieni.
         */
        this.ui.asetaPaivakirjanKoko(true);
      }
      // Nopeusnäyte liukua varten; vanhat putoavat ikkunan takaa pois.
      naytteet.push({ t: e.timeStamp || performance.now(), x: e.clientX, y: e.clientY });
      while (naytteet.length > 2 && naytteet[naytteet.length - 1].t - naytteet[0].t > LIUKU_IKKUNA_MS) {
        naytteet.shift();
      }
      /*
       * KÄSIN VAIN VALLOITETULLE ALUEELLE (ks. rajaaKasinPan). Rajaus
       * on tässä eikä asetaPanissa: pelin omien kamera-ajojen pitää
       * saada viedä näkymä minne pelin kulku vaatii.
       */
      const rajattu = this.rajaaKasinPan(alku.pan + dx, alku.panY + dy);
      this.asetaPan(rajattu.x, rajattu.y);
    });

    const paata = (e, { salliLiuku = true } = {}) => {
      if (!alku || (e && e.pointerId !== alku.id)) return;
      // Sama varautuminen kuin kaappauksessa: peruuntunut osoitin heittää.
      if (liikkui) { try { pane.releasePointerCapture?.(alku.id); } catch { /* ei ollut */ } }
      alku = null;
      // Raahauksen päättävä napautus ei saa valita kaupunkia: lippu
      // luetaan click-vaiheessa (alla) ja nollataan vasta sen jälkeen.
      this.ui.raahattiin = liikkui;
      if (liikkui) setTimeout(() => { this.ui.raahattiin = false; }, 0);
      /*
       * Vauhdikas irrotus jatkaa liukuna (omistajan toive): kartta
       * hidastuu pehmeästi eikä pysähdy kuin seinään. Liuku on samaa
       * elettä — kartanRaahaus ja luokka jäävät pystyyn, ja lataus
       * odottaa liu'un loppua.
       */
      if (salliLiuku && liikkui && aloitaLiuku()) return;
      // Sykähdykset palaavat heti kun sormi irtoaa.
      document.body.classList.remove('kartta-raahaus');
      /*
       * Bittikartta täydennetään VAIN tässä: heti kun sormi irtoaa
       * (tai liukuAskeleessa, kun liuku on pysähtynyt — se on saman
       * eleen loppu).
       *
       * Omistajan linjaus: "lataus siis aina vain juuri kun sormi
       * irtoaa, ei muulloin." Ele saa kulkea täysin valmiin kuvan
       * päällä, ja työ tehdään vasta kun ruutu on paikallaan.
       */
      this.ui.kartanRaahaus = false;
      if (!liikkui) return;
      /*
       * Piilossa olevalle sivulle ei rasteroida. Sarja jäisi kesken
       * heti (iOS jäädyttää taustalle jääneen webapin) ja jättäisi
       * taidePiirtyy-lipun pystyyn — sama jäätymä toista kautta.
       * Merkitään vain odottavaksi; taustapaluun vahti jatkaa sarjan
       * (ui.js tarkkuusVahti).
       */
      if (document.hidden) this.ui.taideOdottaa = true;
      else this.ui.taydennaTaide({ heti: true });
    };
    pane.addEventListener('pointerup', paata);
    pane.addEventListener('pointercancel', paata);

    /*
     * --- SOVELLUS TAUSTALLE KESKEN PYYHKÄISYN ------------------------
     *
     * Omistajan kuvakaappaus iPadilta 17.8.2026: *"kun käy toisessa
     * sovelluksessa ja palaa peliin, kartan vasempaan reunaan jää
     * vaalea pystykaista."*
     *
     * Raahaus päättyy VAIN pointerup- tai pointercancel-tapahtumaan,
     * eikä iOS toimita kumpaakaan webapille, joka jää taustalle
     * sormen ollessa vielä ruudulla. Ele jää siis pystyyn:
     * kartanRaahaus, body.kartta-raahaus ja osoittimen kaappaus.
     * Mitattuna Chromiumissa (hylätty raahaus + taustapaluu):
     * osoitinKartalla palautui ui.js:n jumivahdista viidessä
     * sekunnissa, kartanRaahaus jäi pystyyn loputtomiin — ja se
     * yksin riittää jäädyttämään kartan piirron lopuksi istunnoksi
     * (ks. ui.js eleKesken).
     *
     * Ele päätetään siis siihen hetkeen, jolloin dokumentti menee
     * piiloon: sormea ei voi vetää kartalla, joka ei ole ruudulla.
     * ILMAN LIUKUA — liuku on requestAnimationFramen varassa eikä
     * tikitä piilossa, joten se vain jättäisi saman lipun pystyyn
     * toista kautta.
     */
    this.ui.eleVahti = () => {
      if (!document.hidden) return;
      // Sama kohtalo nipistykselle: kesken jäänyt kahden sormen ele ei
      // saa jättää muunnostaan svg:hen (ks. hylkaaNipistys — sormia ei
      // voi nipistää kartalla, joka ei ole ruudulla).
      hylkaaNipistys();
      pysaytaLiuku(true);
      paata(null, { salliLiuku: false });
    };
    document.addEventListener('visibilitychange', this.ui.eleVahti);

    // Raahauksen jälkeinen click ei saa mennä kaupungille asti.
    // Sama kuuntelija hoitaa aloituskartan ensimmäisen napautuksen:
    // zoomaus lähtee mistä tahansa kohdasta karttaa eikä vaadi osumaa
    // kaupunkiin (omistajan toive). Kaappausvaiheessa, jotta kaupungin
    // oma napautus ei ehdi valita lähtöpaikkaa.
    pane.addEventListener('click', (e) => {
      if (this.ui.raahattiin) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
      if (this.ui.aloitusZoom || !this.zoomTarpeen()) return;
      // Zoomaus lähtee vain itse kartalta. Kartan päällä kelluu muutakin
      // — lentokalvo "Astu mantereelle" -nappeineen, aloitusportti,
      // matkakirjan kortti — ja koska tämä kuuntelija on kaappaus-
      // vaiheessa, se söi niiden napautukset ennen kuin ne ehtivät
      // nappiin asti. Lentokalvo jäi silloin ruudulle eikä Euroopan
      // kartta auennut lainkaan.
      if (!e.target.closest('svg')) return;
      // Sama napautuszoomaus toimii myös silloin, kun maailmankartalle
      // palataan kesken matkan (omistajan havainto): kartta on yhtä pieni
      // kummallakin kerralla. Aloitusportin takana zoomausta ei tarjota.
      if (!this.ui.aloitettu || this.ui.aloitusportti) return;
      /*
       * Vain maailmankartalla. Mantereilla on oma lähikuvansa
       * (zoomaaMantereelle), eikä aloituskartan napautuszoomaus kuulu
       * niille lainkaan.
       *
       * Ilman tätä ehtoa napautus lisäsi bodyyn aloitus-zoom-luokan.
       * Euroopassa fitViewBox palaa sen jälkeen mannerzoomin haarasta
       * eikä ehdi nollata lippua, joten kartta zoomasi uudelleen ja
       * perään syttyi kiikari — joka kuuluu vain etusivulle (omistajan
       * havainto: laivamatkan valinta Ateenassa).
       *
       * Sama ehto lopettaa toisenkin haitan: kuuntelija on
       * kaappausvaiheessa ja pysäyttää tapahtuman, joten mantereella se
       * söi kartalla olevien kohderenkaiden napautukset.
       */
      if (this.ui.game.pack.id !== 'maailma') return;
      e.stopPropagation();
      e.preventDefault();
      this.zoomaaAloituskartta(this.kartanKohta(e.clientX, e.clientY));
    }, true);
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
