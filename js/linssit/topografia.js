/*
 * Topografialinssi: maailma maastona, täysvärisenä reliefikarttana.
 *
 * Omistajan päätös 4.8.2026, kun hän näytti Wikipedian reliefikartan
 * Magdalena-joesta: *"täysväri siihen linssiin, mutta pidetään seepia
 * normaalissa pelinäkymässä"*. Sama laskenta antaa siis kaksi eri
 * lopputulosta — tämä linssi on se, joka saa näyttää täysin erilaiselta
 * kuin peli. Se on taikalasien koko idea: pelaaja nostaa lasit silmilleen
 * ja näkee maailmasta puolen, jota kartta ei kerro.
 *
 * Pohjakartan hienovarainen syvyys on eri asia ja eri tiedostossa
 * (js/packs/maailmankartta-varjostus.js, css/styles.css .varjo-1).
 *
 * --- miksi tässä ei ole yhtään laskentaa ---
 *
 * Kaikki työ on tehty rakennusaikana (docs/moduulit/linssit.md
 * luku 1.5): tools/tee-reliefikartta.mjs värittää ETOPO1:n
 * korkeusruudukon hypsometrisellä asteikolla, varjostaa sen
 * kuvitteellisella auringolla luoteesta ja projisoi tuloksen laudan
 * Milleriin. Tänne jää yksi <image>, joka venytetään laudan
 * rajasuorakulmioon. Se on koko linssi.
 *
 * Varjostus on se, mikä tekee reliefikartasta reliefikartan. Pelkkä
 * väriasteikko kertoo korkeuden mutta on litteä; varjo kertoo MUODON,
 * ja silmä lukee muodon. Siksi harjanteet nousevat esiin ja Magdalenan
 * laakso erottuu Andien kahden haaran välistä.
 *
 * --- elävä kuva, ei rasteroitu ---
 *
 * Moottori (js/linssit/kerros.js) muuttaa linssin yhdeksi kuvaksi, jos
 * elementtejä on yli LINSSIN_ELEMENTTIKATTO = 400. Tässä niitä on
 * TASAN YKSI, joten kerros jää eläväksi — ja se on pakko, ei sattuma:
 * rasteroitava SVG ajetaan blob-hiekkalaatikossa, joka EI hae ulkoisia
 * osoitteita (suunnitelma luku 1.7). Rasteroituna <image href="assets/…">
 * palauttaisi läpinäkyvän tyhjän, ja linssi olisi näkymätön ilman
 * yhtäkään virhettä lokissa. Sama ratkaisu on tehty kertaalleen samasta
 * syystä — yökartta on myös suoraan elävä <image>.
 *
 * Hinta elävyydestä on nolla: yksi kuva ei maksa panoroinnissa mitään,
 * koska se liikkuu CSS-muunnoksen mukana kuten kaikki muukin.
 */

import { el } from '../mapart.js';
import { kokoPallonKorkeus } from '../pallolauta/kamera.js';
import { luoTarkennus } from './topografia-tarkennus.js';
import { valitseReliefi } from './reliefikuva.js';
import { asetaReliefiLinssi, reliefiKaytossa, reliefipyramidiPaalla } from '../reliefipyramidi.js';

/*
 * PEITTÄVYYS.
 *
 * Suunnitelman kova raja (luku 2.2 sääntö 4 ja luku 1.1): kaikki linssit
 * piirretään korkeintaan 0,72 peittävyydellä. Syy on rakenteellinen eikä
 * makuasia — lento- ja laivareitit ovat staattisessa kerroksessa eli
 * linssin ALLA, eikä niitä voi nostaa elävään puuhun (niitä on noin
 * tuhat elementtiä). Täysin peittävä linssi hävittäisi pelaajalta koko
 * reittiverkon eli sen, mitä hän on kartalta tekemässä.
 *
 * Seepiapaperi kuultaa siis 28 prosentin verran läpi ja vaimentaa värejä
 * hieman. Se on tämän linssin hyväksytty hinta, ja se sitoo täysvärikuvan
 * samaan karttaan sen sijaan että se leijuisi päälle liimattuna.
 */
const PEITTAVYYS = 0.72;

/*
 * Kuvan tiedot ladataan vasta kun linssi avataan (suunnitelma luku 2.1).
 * Moduulin metatiedot alla ovat staattisia ja muutaman sadan tavun
 * kokoisia, joten valitsin saa nimen ja kuvakkeen ilmaiseksi.
 */
let kuvatiedot = null;

/*
 * Esiladattu kuva pidetään moduulissa hengissä.
 *
 * Ilman tätä linssi välähtää tyhjänä: <image> aloittaa haun vasta kun
 * elementti on puussa, ja megatavun WebP ehtii siinä välissä näyttää
 * useita tyhjiä kehyksiä. Sama kuvio on moottorin omassa rasteroinnissa
 * (kerros.js: PNG puretaan valmiiksi ennen kuin se pannaan puuhun).
 *
 * Viite jää muuttujaan tarkoituksella: selain voisi muuten heittää
 * puretun bittikartan pois heti kun Image-olio roskataan, ja seuraava
 * avaus purkaisi kuvan uudelleen.
 */
let esiladattu = null;

/**
 * Hakee ja purkaa kuvan valmiiksi selaimen välimuistiin.
 *
 * Ei heitä. Epäonnistunut esilataus ei ole virhe vaan hitaampi
 * ensimmäinen piirto: <image> hakee kuvan silloin itse.
 */
async function esilataa(osoite) {
  if (esiladattu?.src?.endsWith(osoite)) return;
  try {
    const kuva = new Image();
    kuva.src = osoite;
    if (kuva.decode) await kuva.decode();
    else await new Promise((valmis) => { kuva.onload = valmis; kuva.onerror = valmis; });
    esiladattu = kuva;
  } catch {
    // Verkko poikki tai kuva puuttuu; linssi yrittää silti piirtää.
  }
}

/*
 * SELITE.
 *
 * Rivit ovat tools/tee-reliefikartta.mjs:n asteikon portaita, väri
 * poimittuna samasta taulukosta. Jos asteikkoa muutetaan siellä, nämä
 * kuusi väriä on päivitettävä käsin — selite, joka valehtelee kartan
 * väreistä, on pahempi kuin ei selitettä lainkaan.
 *
 * Portaita on asteikossa yksitoista maalle ja seitsemän merelle, mutta
 * korttiin otetaan yhdeksän. Loput ovat välisävyjä, joita kukaan ei
 * lue riviltä: silmä hakee selitteestä "mitä ruskea tarkoittaa", ei
 * neljäätoista metrilukua.
 */
// Vesi ilman sinistä myös linssissä (omistajan linjaus 4.8.2026).
const MEREN_POHJA = '#5d5340';

/*
 * Kuinka monikertaiseksi kuva venytetään kaistaa piirrettäessä.
 *
 * Kaista rajataan omaan korkeuteensa, joten venytetystä kuvasta jää
 * näkyviin vain 1/90 — eli ylimmät (tai alimmat) 18 kuvariviä 1620:sta.
 * Ne kantavat kuvan oman VAAKASUUNTAISEN vaihtelun: jäätä, avomerta ja
 * mannerta siellä missä niitä on.
 */
const KAISTAN_VENYTYS = 90;

/*
 * SAMA RELIEFI PALLOLLE — TOINEN PROJEKTIO.
 *
 * Omistajan linjaus 5.9.2026 (Raamattu, KAIKKI PALLOLLE, VANHA KARTTA
 * SULJETAAN): *"Käännä kaikki pallolle, niin voidaan sulkea vanha kartta
 * kokonaan"*. Pallo lukee pinnan tekstuurin TASAVÄLISENÄ
 * (equirectangular, 2:1), eikä yllä oleva laudan Milleriin projisoitu
 * kuva kelpaa sinne: se työntäisi mantereet pohjoiseen. Sama kuva on
 * siksi uudelleenprojisoitu kerran rakennusaikana
 * (tools/tee-pallotopografia.mjs) — ei uutta aineistoa, ei uutta
 * laskentaa, vain toinen projektio samasta reliefistä.
 *
 * Lauta ulottuu -58°:sta 76°:seen, joten navat ovat kuvassa
 * läpinäkyviä: pallon oma laattapinta näkyy niiden kohdalla läpi.
 * Kaistat (KAISTAN_VENYTYS) ovat tasokartan asia eivätkä koske palloa —
 * pallolla ei ole ylä- eikä alareunaa.
 *
 * KAKSI TARKKUUTTA, VALINTA RUUDUN MUKAAN (16.9.2026). Sama reliefi on
 * ämpärissä myös 8192 × 4096:na, ja leveillä ruuduilla se otetaan
 * pohjaksi: 22,8 pikseliä astetta kohti entisen 11,4:n sijaan.
 * Puhelin pitää 4k:n — 8k purkautuu 134 Mt:n RGBA-puskuriksi, ja se on
 * puhelimelle liikaa. Valinta on YKSI FUNKTIO kahdelle linssille
 * (js/linssit/reliefikuva.js valitseReliefi), sama jota Astronautin
 * kamera käyttää avaruusnäkymänsä Maahan.
 *
 * TARKENNUSLAASTARI EI KORVAUDU TÄLLÄ vaan jää pohjan päälle: pohja on
 * koko pallolle, laastari näkyvälle ikkunalle (30 px/aste). 8k nostaa
 * sen, mitä pelaaja näkee ENNEN laastarin valmistumista ja laastarin
 * ulkopuolella; laastari on yhä se, mikä tekee lähizoomin.
 */
const PALLOKUVA = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-20260915.webp';

/**
 * Pallon pohjatekstuurin osoite tälle ruudulle. `PALLOKUVA` jää
 * varapoluksi, jos kotelon mittaa ei ole (testit, mittaamaton kotelo).
 */
function pohjakuva(kotelo, ikkuna = (typeof window === 'undefined' ? null : window)) {
  const leveys = kotelo?.clientWidth ?? 0;
  const dpr = Number(ikkuna?.devicePixelRatio) > 0 ? Number(ikkuna.devicePixelRatio) : 1;
  if (!(leveys > 0)) return { osoite: PALLOKUVA, tunnus: '4k', leveys: 4096 };
  return valitseReliefi({ leveys, dpr });
}

/**
 * LINSSIEN YHTEINEN PORTTI (js/ui.js linssikarttaEstaa). Luokka ei ole
 * aikajanan oma vaikka nimi on sen perua: sitä lukevat kaikki linssit,
 * jotka vievät koko näkymän itselleen, ja sen kautta pelin kerrokset
 * sammuvat yhdestä paikasta.
 */
const LINSSIPORTTI = 'aikajana-paalla';

/*
 * ────────────────────────────────────────────────────────────────────
 * ODOTUSPEITE — LINSSI AVAUTUU YHDELLÄ SIIRTYMÄLLÄ
 * ────────────────────────────────────────────────────────────────────
 *
 * OMISTAJAN VIKA 16.9.2026 (sanatarkasti): *"Topografia linssi tökkii
 * (vaalea kartta piirtyy ilmeisesti ensin ja sitten Topografia sen
 * päälle)"*.
 *
 * MITATTU (Chromium, 390 × 844 dpr 2, Ateena, isoisän luenta käynnissä,
 * screencast kompositorilta eli pääsäikeen jumin ohi):
 *
 *   t =    0 ms  linssi valitaan; portti päälle → pelin kerrokset,
 *                saapumiskuva, nimikyltit ja tasoituskerma katoavat
 *   t ≈ 1,7 s    RUUDULLA ON PALJAS VAALEA PELIKARTTA (kirkkaus
 *                putoaa 96,9 → 68,7, koska saapumiskuva lähti)
 *   t ≈ 2,5 s    pohjakuva ladattu; 1,3 sekunnin PITKÄ TEHTÄVÄ (purku
 *                ja tekstuurin vienti pääsäikeessä)
 *   t ≈ 3,8 s    kalvon häivytys valmis, reliefi vihdoin ruudulla
 *
 * Eli pelaaja näki KOLME näkymää peräkkäin: pelinsä, paljaan kartan ja
 * vasta sitten linssin. Juuri tuo keskimmäinen on omistajan "vaalea
 * kartta", ja se kesti mitattuna noin kaksi sekuntia.
 *
 * KORJAUS: kotelon päälle nousee tumma peite samassa kehyksessä, jossa
 * portti asetetaan, ja se otetaan pois vasta kun reliefi on OIKEASTI
 * ruudulla (kalvon peittävyys materiaalista luettuna). Pelaaja näkee
 * siis: peli → tumma lasi → maasto. Paljasta karttaa ei ole missään
 * välissä, ja napautus saa heti vastauksen — mikä on puhelimella
 * tärkeää, koska lataus kestää sekunteja.
 *
 * Sävy on linssiperheen oma tumma seepia (sama kuin ruutukalvon
 * oletus, tummempana): 0,96 peittävyydellä alla olevasta kartasta jää
 * näkyviin neljä prosenttia eli ei mitään.
 */
const ODOTUSPEITE = 'rgba(20, 16, 10, 0.96)';
/** Odotuspeitteen oma osa linssimoottorissa (ei sama kuin kalvon). */
const PEITTEEN_OSA = 'topografia-peite';
/**
 * Kuinka usein katsotaan, onko reliefi jo ruudulla (ms). Peite on
 * kompositorissa eikä maksa mitään; kysely on kevyt lukema kalvon
 * materiaalista.
 */
const PEITTEEN_KYSELY_MS = 90;
/**
 * Peitteen ehdoton katto (ms). Jos kuvaa ei kuulu — verkko poikki,
 * ämpäri alhaalla, three tavoittamattomissa — peite on otettava pois
 * joka tapauksessa. Tumman ruudun taakse ei saa jäädä jumiin, ja
 * silloin pelaaja näkee sen minkä ennenkin: oman karttansa.
 */
const PEITTEEN_KATTO_MS = 15000;
/**
 * Kuinka paljon portin asetusta viivytetään peitteen siirtymän yli
 * (ms). Kaksi kehystä 60 Hz:llä riittää kattamaan sen, että
 * `kalvoRuudulle` asettaa peittävyyden vasta seuraavassa kehyksessä.
 */
const PORTIN_MARGINAALI_MS = 40;

/**
 * Onko odotuspeite päällä? `?topopeite=0` ottaa sen pois — sama
 * kehittäjän vipu kuin tarkennuslaastarilla (`?tarkennus=0`).
 *
 * Vipu on VARTIJAN VASTAKOETTA VARTEN: ilman peitettä savukkeen on
 * nähtävä juuri se paljas vaalea välivaihe, jonka omistaja raportoi,
 * ja peitteen kanssa nolla sellaista näytettä. Ilman vastakoetta
 * väite kertoisi vain, että jokin on tummaa.
 */
export function odotuspeitePaalla(ikkuna = globalThis) {
  try {
    const param = new URLSearchParams(ikkuna.location?.search ?? '').get('topopeite');
    if (param === '0') return false;
    if (param === '1') return true;
  } catch {
    /* ei osoitetta (testiajo) */
  }
  return true;
}

/** Kameran paluuajo linssin sulkeutuessa (ms); reduced motion → 0. */
const PALUUAJON_MS = 900;

const SELITERIVIT = [
  { vari: '#e8e8eb', teksti: 'Lumiraja, yli 6000 m' },
  { vari: '#baa498', teksti: 'Paljas kivi' },
  { vari: '#94623e', teksti: 'Korkea vuoristo' },
  { vari: '#b68452', teksti: 'Vuoristo, 2200 m' },
  { vari: '#cdc470', teksti: 'Ylänkö, 800 m' },
  { vari: '#3e6e42', teksti: 'Alanko' },
  { vari: '#b9ab8c', teksti: 'Mannerjalusta' },
  { vari: MEREN_POHJA, teksti: 'Valtameren pohja' },
  { vari: '#3f382a', teksti: 'Syvänne, yli 6000 m' },
];

/**
 * Reliefikartta kaistoineen annettuun ryhmään.
 *
 * Vietiin ulos, koska vesistölinssi rakentuu saman pohjan päälle
 * (omistajan toive 5.8.2026): kaksi linssiä, yksi kuva ja yksi tapa
 * piirtää se.
 *
 * @param ryhma       elävä <g>
 * @param raja        { x, y, leveys, korkeus } laudan rajasuorakulmio
 * @param osoite      kuvan osoite
 * @param peittavyys  0–1
 * @param tunniste    yksilöi rajauspolut, kun samalla sivulla on kaksi
 */
export function piirraReliefi(ryhma, raja, osoite, peittavyys, tunniste = 'topo') {
  /*
   * MERI LAUDAN YLÄ- JA ALAPUOLELLE.
   *
   * Näkyvä alue ulottuu laudan yli sekä ylhäältä että alhaalta:
   * lähikuvassa laudan pohjois- ja eteläpuolelle varataan kaista, jotta
   * reunimmaiset kaupungit saa panoroitua yläpalkin ja alanappien alta
   * esiin (ui.js YLAKAISTA ja ALAKAISTA). Korkeuskuva loppuu laudan
   * reunaan, joten kaistaan jäi pergamenttia keskelle merta.
   *
   * KAISTA ON KUVAN JATKE, EI TASAINEN VÄRI. Ensin kaista täytettiin
   * kuvan reunarivien KESKIARVOLLA, ja omistaja raportoi: "aivan ylin
   * pohjoinen jää harmaaksi, sieltä puuttuu värit". Keskiarvo oli syy —
   * ylimmällä kuvarivillä on vierekkäin vihreää mannerta (75,105,59),
   * syvää merta (61,108,170) ja kirkasta jäätä (167,208,235), ja niiden
   * keskiarvo on harmaansininen (129,163,179). Yksi luku ei voi esittää
   * kolmea eri paikkaa.
   *
   * Nyt kaista on sama kuva venytettynä ja rajattuna niin, että siitä
   * näkyy vain reunimmainen kaistale. Vaakasuuntainen vaihtelu säilyy,
   * eikä uutta aineistoa tarvittu.
   */
  const kaista = raja.korkeus;
  const venytys = kaista * KAISTAN_VENYTYS;

  const reuna = (ylhaalla) => {
    const nimi = `${tunniste}-kaista-${ylhaalla ? 'p' : 'e'}`;
    const rajaus = el('clipPath', { id: nimi }, ryhma);
    el('rect', {
      x: raja.x,
      y: ylhaalla ? raja.y - kaista : raja.y + raja.korkeus,
      width: raja.leveys,
      height: kaista,
    }, rajaus);
    el('image', {
      x: raja.x,
      // Pohjoisessa kuvan YLÄreuna asetetaan kaistan yläreunaan, jolloin
      // rajaukseen osuu kuvan ylin 1/90. Etelässä sama toisin päin.
      y: ylhaalla
        ? raja.y - kaista
        : raja.y + raja.korkeus + kaista - venytys,
      width: raja.leveys,
      height: venytys,
      href: osoite,
      preserveAspectRatio: 'none',
      opacity: peittavyys,
      'clip-path': `url(#${nimi})`,
    }, ryhma);
  };
  reuna(true);
  reuna(false);

  el('image', {
    x: raja.x,
    y: raja.y,
    width: raja.leveys,
    height: raja.korkeus,
    href: osoite,
    preserveAspectRatio: 'none',
    opacity: peittavyys,
  }, ryhma);
}

/**
 * Kuvan sijaintitiedot ja (valinnaisesti) itse kuva valmiiksi.
 *
 * ESILATAUS ON TASOKARTAN ASIA (mitattu 16.9.2026). Millerin kuva on
 * 10800 × 4859 eli 52 megapikseliä, ja `<img>`-esilataus purkaa sen
 * kokonaan — RGBA:na 210 Mt. Tasokartalla se on pakko tehdä, koska
 * `<image>` välähtäisi muuten tyhjänä; PALLOLLA sitä ei piirretä
 * elementtinä lainkaan, ja esilataus vain viivytti linssin avautumista
 * (mitattuna yli 15 sekuntia) ja vei muistin. Pallolla kuvasta
 * puretaan vain näkyvä kaistale (js/linssit/topografia-tarkennus.js).
 */
export async function lataaReliefi({ esilataus = true } = {}) {
  if (!kuvatiedot) {
    ({ TOPOGRAFIA_KUVA: kuvatiedot } = await import('../packs/linssi-topografia-kuva.js'));
  }
  if (esilataus) await esilataa(kuvatiedot.kuva);
  return kuvatiedot;
}

export const LINSSI = {
  tunnus: 'topografia',
  /*
   * Ensimmäisenä valitsimessa. Topografia on linsseistä se, joka kertoo
   * maailmasta vähiten ihmisistä ja eniten maasta — se on pohja, jonka
   * päälle kaikki muut linssit (ilmasto, kielet, muuttoliike) piirtävät
   * oman kerroksensa. Kymmenen välein, jotta väliin mahtuu.
   */
  jarjestys: 10,
  kerros: true,

  nimi: 'Topografialinssi',
  lyhyt: 'Maailma maastona: väri kertoo korkeuden, varjo kertoo muodon.',
  /*
   * Kaksihuippuinen vuorijono ja lumiraja. Ei kompassia eikä karttalehteä:
   * kuvakkeen on kerrottava mitä linssi NÄYTTÄÄ, ja tämä linssi näyttää
   * vuoria. 24×24 viivapolkuja ilman <svg>-kuorta, kuten muillakin.
   */
  ikoni: '<path d="M2.4 19.2 9 7.4l4.1 7.3 2.3-3.4 6.2 7.9z"/>'
    + '<path d="M6.7 14.8 8 13.6l1.2 1.1 1.3-1.2"/>',
  /*
   * valokuva: true ottaa paperin rakeisuuden pois linssin päältä
   * (css/styles.css: body.linssi-valokuva .grain). Rakeisuus sekoittuu
   * KERTOLASKULLA, joten se jää linssin päälle ja vetäisi täysvärikuvan
   * ruskeaksi — juuri sen sävyn, joka tästä linssistä on tarkoitus
   * ottaa pois. Piirretyillä vektorilinsseillä rakeisuus on hyväksi,
   * mutta tämä on kuva.
   */
  valokuva: true,

  /*
   * Vain maailmankartalla. Kuva on projisoitu tarkalleen sen laudan
   * rajasuorakulmioon (12000 × 5399); Euroopan tai Afrikan laudalla se
   * venyisi väärään paikkaan, ja väärässä paikassa oleva reliefi on
   * pahempi kuin ei reliefiä.
   */
  laudat: ['maailmankartta'],

  lahde: {
    aineisto: 'NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1 kaariminuutti '
      + '(Amante & Eakins 2009, doi:10.7289/V5C8276M)',
    lisenssi: 'Public domain (Yhdysvaltain liittovaltion virasto)',
    osoite: 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360',
    haettu: '2026-08-04',
  },

  /**
   * Kuvan sijaintitiedot ja itse kuva valmiiksi. Kutsutaan kerran ennen
   * ensimmäistä piirtoa.
   */
  async lataa() {
    /*
     * Pallolaudalla esilatausta ei tehdä (ks. lataaReliefi): laudan
     * Milleriä ei piirretä pallolle, ja 52 megapikselin purku olisi
     * pelkkää odotusta ja muistia ennen linssin avautumista.
     */
    const pallolla = typeof document !== 'undefined'
      && Boolean(document.body?.classList?.contains('pallolauta-paalla'));
    /*
     * PYRAMIDITILASSA YHTÄ KUVAA EI TARVITA LAINKAAN — eikä sitä siis
     * saa ladata (erä 4, 18.9.2026).
     *
     * `sytytaLinssi` (js/ui.js) ODOTTAA tämän valmiiksi ENNEN kuin
     * `pallolle()` pääsee ajoon — ja juuri `pallolle()` on se, joka
     * nostaa odotuspeitteen ja herättää laattakerroksen. Kaikki, mitä
     * tässä tehdään, on siis suoraan pois pelaajan ruudulta: hän
     * katsoo peittämätöntä pelikarttaa niin kauan kuin tämä kestää.
     * Mitattu erässä 3: linssin valinnasta kului 1,1 sekuntia ennen
     * kuin peite edes ilmestyi.
     *
     * Pyramiditilassa kalvoa eikä tarkennuslaastaria ole (ks.
     * `pallolle`), joten `kuvatiedot` jää lukematta — moduulin tuonti
     * olisi pelkkää odotusta.
     */
    if (pallolla && reliefipyramidiPaalla()) return;
    await lataaReliefi({ esilataus: !pallolla });
  },

  /**
   * Yksi kuva laudan rajasuorakulmioon.
   *
   * preserveAspectRatio="none" on oikein eikä laiskuutta: kuvan
   * mittasuhde (3600 × 1620) EI ole sama kuin laudan (12000 × 5399),
   * koska kuva on tehty tasaleveänä ja pyöristetty kokonaisiin
   * pikseleihin. Venytys rajaan on juuri se, mikä osuu — projisointi on
   * jo tehty, ja jäljellä on vain skaalaus.
   */
  piirra(ryhma, tila) {
    if (!kuvatiedot) return false;
    const raja = kuvatiedot.raja;

    /*
     * Lauta on vaihtunut kuvan tekemisen jälkeen.
     *
     * Tarkistus on tässä, koska hiljainen väärinosuminen olisi paha:
     * kuva peittäisi kartan kokonaan mutta mantereet olisivat väärässä
     * kohdassa, eikä mikään kertoisi miksi. false piilottaa linssin
     * valitsimesta, mikä on rehellisempi lopputulos.
     */
    if (tila.leveys !== raja.leveys || tila.korkeus !== raja.korkeus) return false;

    // Kuva ja sen ylä- ja alakaistat; ks. piirraReliefi.
    piirraReliefi(ryhma, raja, kuvatiedot.kuva, PEITTAVYYS);
    return true;
  },

  /**
   * Sama linssi pallolaudalla: yksi kalvo pallon pinnalle.
   *
   * Linssi ei koske Globe.gl-instanssiin — se pyytää kalvon laudan
   * linssimoottorilta (js/pallolauta/linssit.js, sopimus
   * docs/moduulit/karttapallo.md luku 10.1) ja palauttaa kahvan, jonka
   * `pura()` ottaa kalvon pois häivyttäen.
   *
   * Kuvaa EI esiladata lataa():lla: tasokartan megatavun Miller-kuvaa ei
   * tarvita pallolla lainkaan, ja moottori hakee pallokuvan itse.
   * Selitekortti (selite) toimii kummallakin laudalla samoin.
   */
  pallolle(lauta) {
    if (!lauta?.linssit) return { pura: () => {} };
    let suljettu = false;

    /*
     * RELIEFIPYRAMIDI PÄÄLLE TÄMÄN LINSSIN AJAKSI (kytkin
     * `?reliefipyramidi=1`, oletus pois).
     *
     * Lippu kertoo laattakoneelle (js/laattapyramidi.js
     * pyramidinKerrostasot, js/pallolaatat.js lepokerroksenKerrokset),
     * että reliefilaatasto saa piirtyä pohjan päälle. SE ON TÄMÄN
     * LINSSIN TILA EIKÄ PELIN: seepiakartta pysyy seepiana, kun linssi
     * on kiinni. `pura` laskee lipun.
     *
     * Kytkimen ollessa pois tämä ei tee mitään: kerrostasoja ei ole,
     * eikä yksikään pyyntö lähde. Linssi on silloin täsmälleen se,
     * mikä se oli ennen tätä erää — yksi kuva ja laastari.
     */
    asetaReliefiLinssi(true);
    const pyramidiPaalla = reliefiKaytossa();
    /*
     * LIPUN NOSTO EI YKSIN RIITÄ — KERROS ON HERÄTETTÄVÄ.
     *
     * Mitattu 18.9.2026 (tools/savukkeet/mittaa-reliefipyramidi.mjs,
     * Chromium 390 × 844, Alppien lähizoomi): linssin avauksesta kului
     * 15,7 sekuntia ensimmäiseen reliefilaattapyyntöön, ja sekin lähti
     * vasta kun kamera liikkui. Laattakerros päivittyy piirtokoukusta
     * (js/pallo.js kytkePallonKehys), ja paikallaan olevassa
     * näkymässä koukku ei tuo mitään uutta: lippu oli pystyssä, mutta
     * kerros ei katsonut sitä. `kokoa()` on kerroksen oma
     * harventamaton päivitys (js/pallolaatat.js), ja se on tässä sama
     * yksi kutsu kuin sulkeutumisessa.
     */
    lauta.lepokerros?.()?.kokoa?.();

    /*
     * ────────────────────────────────────────────────────────────────
     * 1. KOKO PALLON KALVO — yleiskuva
     * ────────────────────────────────────────────────────────────────
     * Tasavälinen kuva koko pallon pinnalle: leveällä ruudulla 8192 ×
     * 4096 (22,8 px/aste), puhelimella 4096 × 2048 (11,4 px/aste) —
     * valinta on `pohjakuva` yllä. Se riittää yleiskuvaan ja on se,
     * mitä lähizoomissa täydennetään laastarilla.
     */
    const pohja = pohjakuva(lauta.kotelo ?? null);

    /*
     * ────────────────────────────────────────────────────────────────
     * 1 a. ODOTUSPEITE ENSIN — ei paljasta karttaa välissä
     * ────────────────────────────────────────────────────────────────
     * Peite nousee ENNEN kalvoa ja ennen porttia, jotta sama kehys, joka
     * riisuu pelin kerrokset, myös peittää kartan. Ks. ODOTUSPEITE
     * yllä: mittaus, juurisyy ja miksi tumma eikä vaalea.
     */
    const peiteKaytossa = odotuspeitePaalla();
    let peite = peiteKaytossa
      ? lauta.linssit.kalvoRuudulle(PEITTEEN_OSA, { vari: ODOTUSPEITE })
      : null;
    const peiteAlkoi = (typeof performance === 'undefined' ? Date : performance).now();
    /** Mitattu: montako millisekuntia peite oli ruudulla (savuke). */
    let peiteKesti = null;
    let peitteenKello = 0;
    const poistaPeite = () => {
      if (!peite) return;
      peite = null;
      peiteKesti = Math.round((typeof performance === 'undefined' ? Date : performance).now() - peiteAlkoi);
      clearTimeout(peitteenKello);
      peitteenKello = 0;
      lauta.linssit.pura?.(PEITTEEN_OSA);
    };

    /*
     * KOKO PALLON KALVO JÄÄ POIS, KUN RELIEFIPYRAMIDI ON PÄÄLLÄ.
     *
     * Omistajan lisäys 18.9.2026 (Raamattu LISAYS 16 kohta 49):
     * linssi ilman pohjakarttaa, paikanpitäjänä pyramidin ylätaso.
     * Kalvo on 0,72-peittävä kuva SAMASTA reliefistä 30 px/asteen
     * tiheydellä; laataston päällä se hukuttaisi juuri sen tarkkuuden,
     * jota varten laatasto poltettiin. Mitattu 18.9.2026 ennen tätä
     * riviä: gradienttienergia Alpeilla kytkin päällä 1,71 ja pois
     * 1,77 — eli laatasto EI näkynyt lainkaan kalvon alta.
     *
     * Paikanpitäjä ei ole kalvo vaan laattakoneen oma karkea kerros:
     * saman pyramidin ylemmän tason laatta skaalattuna, kuten
     * pääkartallakin.
     */
    const perus = pyramidiPaalla ? null : lauta.linssit.kalvo('topografia', {
      kuva: pohja.osoite,
      peittavyys: PEITTAVYYS,
    });

    /*
     * PEITE POIS VASTA KUN RELIEFI ON RUUDULLA — ei kun kuva on
     * ladattu. Ero on olennainen: kalvon materiaali syntyy ennen kuin
     * yhtäkään kehystä on piirretty sillä, ja juuri se ensimmäinen
     * piirto on se pitkä tehtävä, jonka aikana mikään ei liiku. Siksi
     * mitataan MATERIAALIN todellinen peittävyys (`nakyvyys`), ei
     * `ladattu`-lippua: kun se on tavoitteessaan, reliefi on oikeasti
     * näkyvissä ja peitteen häivytys paljastaa valmiin näkymän.
     */
    /**
     * Laattakerroksen tila jokaisella kyselyllä. Ilman tätä avausketjun
     * mittaus kertoo vain, MILLOIN peite lähti — ei sitä, minkä
     * perusteella. Lokin lukee savuke (`tila().peiteLoki`).
     */
    const peitteenLoki = [];

    /*
     * ONKO RELIEFI OIKEASTI RUUDULLA? — kolme ehtoa, ei yhtä.
     *
     * ERÄN 3 VIKA (mitattu 18.9.2026, Chromium 390 × 844, Alpit):
     * kirkkaussarja luki avauksen jälkeen 1,7–2,5 sekunnin ajan arvoa
     * 101,9, kun seepiapohja on 95,7 ja asettunut reliefi 69. Peite oli
     * siis jo pois, mutta reliefiä ei vielä ollut — ruudulla oli pallon
     * oma vaalea pinta. Juuri sen välähdyksen omistaja kielsi.
     *
     * Syy oli mitta: `nakyviaTaysin >= nakyvia` on TOSI myös silloin,
     * kun kerros on kesken kokoamista ja näkyviä laattoja on tilapäisesti
     * yksi — yksi valmis laatta yhdestä on sata prosenttia, vaikka ruutu
     * on tyhjä. Mitta ei myöskään nähnyt jonoa: laatat, jotka ovat vielä
     * latautumassa, eivät ole `nakyvia`-joukossa lainkaan.
     *
     * Nyt vaaditaan kaikki kolme:
     *   1. kerros on ajossa ja sillä on näkyvä ikkuna (`tila === 'nakyy'`),
     *   2. näkyvän ikkunan JOKAINEN laatta on scenessä ja häive perillä,
     *   3. mitään ei ole enää latautumassa eikä jonossa — eli kerros on
     *      kertaalleen valmis eikä vain hetkellisesti tasoissa.
     *
     * Ehto 3 on se, joka erottaa valmiin näkymän kesken olevasta, ja
     * myös se, joka päästää KARKEAN TASON läpi: paikanpitäjä on
     * laattakoneen oma ylemmän tason laatta, ja kun se on kankaalla eikä
     * jonossa ole mitään, ruutu on peitetty — silloin peite saa väistyä,
     * vaikka tarkempi taso tulisi vasta perässä.
     */
    const reliefiRuudulla = (m) => Boolean(m)
      && m.tila === 'nakyy'
      && m.nakyvia > 0
      && m.nakyviaScenessa >= m.nakyvia
      && m.nakyviaTaysin >= m.nakyvia
      && !(m.ladattavia > 0)
      && !(m.jonossa > 0);

    const katsoPeitetta = () => {
      peitteenKello = 0;
      if (suljettu || !peite) return;
      const nyt = (typeof performance === 'undefined' ? Date : performance).now();
      /*
       * KAKSI MITTAA, SAMA KYSYMYS: onko reliefi ruudulla? Yhden kuvan
       * maailmassa se on kalvon materiaalin todellinen peittävyys;
       * laatastossa kalvoa ei ole, joten mitta on laattakerroksen oma
       * kirjanpito: näkyvän ikkunan KAIKKI laatat scenessä ja häive
       * perillä (js/pallolaatat.js `nakyvia`, `nakyviaTaysin`).
       *
       * YKSI LAATTA EI RIITÄ, ja se on mitattu 18.9.2026
       * (tools/savukkeet/mittaa-reliefipyramidi.mjs, Chromium
       * 390 × 844): kun peite väistyi ensimmäisestä valmiista
       * laatasta, pallon oma vaalea pinta VÄLÄHTI häivytyksen ajan —
       * kirkkaus 101,9 sekunnin ajan, kun seepiapohja on 95,7 ja
       * asettunut reliefi 69. Juuri sen välähdyksen omistaja kielsi.
       */
      const kerrosmitat = pyramidiPaalla
        ? (lauta.lepokerros?.()?.mittarit?.() ?? null) : null;
      const nakyvyys = pyramidiPaalla
        ? (reliefiRuudulla(kerrosmitat) ? PEITTAVYYS : 0)
        : (perus?.nakyvyys?.() ?? 0);
      if (kerrosmitat) {
        peitteenLoki.push({
          ms: Math.round(nyt - peiteAlkoi),
          tila: kerrosmitat.tila,
          taso: kerrosmitat.taso,
          nakyvia: kerrosmitat.nakyvia,
          scenessa: kerrosmitat.nakyviaScenessa,
          taysin: kerrosmitat.nakyviaTaysin,
          ladattavia: kerrosmitat.ladattavia,
          jonossa: kerrosmitat.jonossa,
        });
      }
      if (nakyvyys >= PEITTAVYYS * 0.98 || nyt - peiteAlkoi >= PEITTEEN_KATTO_MS) {
        poistaPeite();
        return;
      }
      peitteenKello = setTimeout(katsoPeitetta, PEITTEEN_KYSELY_MS);
    };
    if (peite) peitteenKello = setTimeout(katsoPeitetta, PEITTEEN_KYSELY_MS);

    /*
     * ────────────────────────────────────────────────────────────────
     * 2. TARKENNUSLAASTARI — 1′-reliefi lähizoomiin
     * ────────────────────────────────────────────────────────────────
     * Juurisyy, mittaukset ja ratkaisu ovat
     * js/linssit/topografia-tarkennus.js:n alussa. Lyhyesti: pallon oma
     * kuva on tehty vanhasta 3600 pikselin Millerista, ja uusi
     * 10800 pikselin reliefi tuodaan ruudulle ikkuna kerrallaan.
     * Laastarin ollessa päällä koko pallon kalvo häivytetään
     * läpinäkyväksi, jotta peittävyys pysyy sovitussa 0,72:ssa eikä
     * kahta kalvoa lasketa päällekkäin.
     */
    let tarkennus = null;
    /*
     * LAASTARIKAAN EI OLE TARPEEN PYRAMIDIN AIKANA: se on sama
     * 10 800 pikselin kuva ikkuna kerrallaan (30 px/aste), ja laatasto
     * antaa samalle ikkunalle 240 px/astetta. Kaksi lähdettä
     * päällekkäin olisi vain kalvo lisää — ks. kalvon perustelu yllä.
     */
    if (!pyramidiPaalla) void (async () => {
      const tiedot = await lataaReliefi({ esilataus: false }).catch(() => null);
      if (!tiedot || suljettu) return;
      tarkennus = luoTarkennus({
        lauta,
        kuva: tiedot,
        peittavyys: PEITTAVYYS,
        // Kynnys pohjakuvan omasta tiheydestä: 8k-ruudulla laastaria ei
        // rakenneta siellä, missä pohja on jo yhtä tarkka.
        perusTiheys: pohja.leveys / 360,
        /*
         * KALVO HÄIVYTETÄÄN, EI PURETA. Purku ja uudelleenrakennus joka
         * zoomilla latauttaisi kuvan uudestaan, ja mitattuna 16.9.2026
         * se jätti kalvon peittävyyteen −0,09 eli näkymättömäksi, kun
         * kaksi häivytystä jäi päällekkäin. Kalvo on koko ajan
         * olemassa; laastarin ajan se on läpinäkyvä, jolloin
         * peittävyys pysyy sovitussa 0,72:ssa eikä kahta kalvoa lasketa
         * päällekkäin.
         */
        perus: {
          paalle: () => perus?.peittavyys?.(PEITTAVYYS),
          pois: () => perus?.peittavyys?.(0),
        },
      });
    })();

    /*
     * ────────────────────────────────────────────────────────────────
     * 3. PELIN ELEMENTIT POIS — linssi on oma näkymänsä
     * ────────────────────────────────────────────────────────────────
     * OMISTAJA 16.9.2026 (Raamattu, TOPOGRAFIALINSSI…, sanatarkasti):
     * *"siinä näkyy myös kaikkia pelin aikaisia juttuja kartalla, mitkä
     * pitäisivät siis olla pois"*.
     *
     * LUOKKA ON SE, JOKA JO ON — `aikajana-paalla` on linssien yhteinen
     * portti (js/ui.js linssikarttaEstaa, js/ui-apurit.js linssiEstaa,
     * js/pallolauta/lauta.js linssiPaalla). Sen kautta topografialinssi
     * saa saman sammutuksen kuin Ihmisen matka ja Satelliitti: kohdemaan
     * korostuskehä, maapaneeli, kaupunkipisteet, saapumislappu, Liiku ja
     * kartuutsi. Reitti, pelinappula ja tasoituskerma sammutetaan laudan
     * omassa päivityksessä samasta portista; nimikyltit, nostot ja pulu
     * tyylitiedostosta (css/styles.css, `body.linssi-topografia`).
     *
     * Ilman tätä luokkaa mikään niistä ei tapahtunut: mitattuna
     * 16.9.2026 linssin päällä ollessa ruudulla oli 8 nimikylttiä,
     * 13 nostoa, kaupunkipiste, pulu, saapumislappu, Liiku ja 2110
     * janan korostuskehä.
     */
    /*
     * PORTTI ODOTTAA PEITETTÄ (vika 16.9.2026 klo 15.30). Portti riisuu
     * kartan yhdessä kehyksessä, mutta odotuspeite on CSS-siirtymä ja
     * lähtee nollasta — mitattuna paljas vaalea kartta välähti
     * peitteen alta juuri sen ajan, jonka häivytys kesti (kirkkaus
     * 100,9 → 68,7 → 4,4 kolmen kymmenesosasekunnin aikana). Portti
     * asetetaan siksi vasta kun peite on perillä, ja kesto kysytään
     * moottorilta (`siirtymaMs`) eikä kopioida tänne. Ilman peitettä
     * (`?topopeite=0`, vartijan vastakoe) portti menee heti kuten
     * ennen — juuri siksi vastakoe näkee sen välivaiheen.
     */
    const runko = typeof document === 'undefined' ? null : document.body;
    const luokkaOli = Boolean(runko?.classList?.contains(LINSSIPORTTI));
    let porttiAsetettu = false;
    let portinKello = 0;
    const asetaPortti = () => {
      portinKello = 0;
      if (suljettu || porttiAsetettu) return;
      porttiAsetettu = true;
      if (!luokkaOli) runko?.classList?.add(LINSSIPORTTI);
    };
    if (peite) {
      // Yksi kehys peittävyyden asettamiseen (kalvoRuudulle tekee sen
      // rAF:ssa) + siirtymän kesto + pieni marginaali.
      const kesto = Number(lauta.linssit.siirtymaMs?.() ?? 0);
      portinKello = setTimeout(asetaPortti, Math.max(0, kesto) + PORTIN_MARGINAALI_MS);
    } else {
      asetaPortti();
    }

    /*
     * ────────────────────────────────────────────────────────────────
     * 4. KOKO MAAPALLO KATSOTTAVISSA
     * ────────────────────────────────────────────────────────────────
     * OMISTAJA 16.9.2026 (sanatarkasti): *"topografialinssi kun on
     * päällä, niin huolimatta siitä, onko maailmatila päällä vai pois,
     * niin pelaaja pääsee katsomaan koko maapalloa"*.
     *
     * Laudan uloszoomauksen esto lukitsee kameran kohdemaan laatikkoon
     * (js/pallolauta/lauta.js maanZoomiraja) — mitattuna Ranskassa
     * korkeuteen 0,186. Linssin ajaksi katto nostetaan korkeuteen, jolla
     * KOKO PALLO mahtuu ruudulle (kamera.js kokoPallonKorkeus), ja koska
     * syrjäytys on voimassa, myös panoroinnin rajaus vapautuu samalla
     * (maanPanoraja palauttaa nullin) — pelaaja pääsee pyörittämään
     * palloa. Zoomin lähin raja jää laudan omaksi: linssi ei saa viedä
     * pelaajaa lähemmäs kuin laatat kestävät.
     */
    const kotelo = lauta.kotelo ?? null;
    const sovitaKatto = () => {
      const leveys = kotelo?.clientWidth ?? 0;
      const korkeus = kotelo?.clientHeight ?? 0;
      if (!(leveys > 0) || !(korkeus > 0)) return;
      lauta.zoomirajat?.({ max: kokoPallonKorkeus({ leveys, korkeus }) });
    };
    sovitaKatto();
    const kokovahti = kotelo && typeof ResizeObserver === 'function'
      ? new ResizeObserver(sovitaKatto) : null;
    kokovahti?.observe(kotelo);

    /*
     * KAMERA TALTEEN AVATESSA. Linssin sulkeutuessa palataan siihen
     * näkymään, josta pelaaja linssin avasi — muuten hän jäisi
     * avaruuteen keskelle peliä.
     */
    const kameraTalteen = lauta.pallo?.pointOfView?.()
      ? { ...lauta.pallo.pointOfView() } : null;

    return {
      pura: () => {
        suljettu = true;
        asetaReliefiLinssi(false);
        // Sama herätys kuin avatessa: seepiapohja takaisin heti eikä
        // vasta kun pelaaja liikuttaa karttaa.
        if (pyramidiPaalla) lauta.lepokerros?.()?.kokoa?.();
        clearTimeout(peitteenKello);
        peitteenKello = 0;
        // Peite pois ennen muita: se on kartan päällä, ja sen alle ei
        // saa jäädä sulkeutuvaa linssiä.
        poistaPeite();
        clearTimeout(portinKello);
        portinKello = 0;
        kokovahti?.disconnect?.();
        tarkennus?.pura?.();
        tarkennus = null;
        perus?.pura?.();
        // Porttia ei poisteta, jos sitä ei ehditty asettaa (linssi
        // suljettiin peitteen aikana) — muuten vietäisiin luokka
        // joltain toiselta linssiltä.
        if (porttiAsetettu && !luokkaOli) runko?.classList?.remove(LINSSIPORTTI);
        lauta.zoomirajat?.(null);
        if (kameraTalteen) {
          lauta.kamera?.pysaytaKameraAjo?.();
          lauta.pallo?.pointOfView?.(
            kameraTalteen,
            lauta.linssit?.reducedMotion?.() ? 0 : PALUUAJON_MS,
          );
        }
        lauta.heraa?.();
      },
      /** Mitatut luvut savukkeelle ja vartijoille. */
      tila: () => ({
        // Koko pallon kalvo on aina olemassa; `perusKalvo` kertoo, onko
        // se NÄKYVISSÄ (laastarin ajan se on läpinäkyvä). Luku on
        // MITATTU materiaalista eikä pääteltu — juuri se ero paljasti
        // 16.9.2026, että kalvo jäi läpinäkyväksi uloszoomatessa.
        perusKalvo: (perus?.nakyvyys?.() ?? 0) > 0.5,
        perusPeitto: perus?.nakyvyys?.() ?? null,
        perusTavoite: perus?.tavoite?.() ?? null,
        perusLadattu: perus?.ladattu?.() ?? false,
        /*
         * ODOTUSPEITE savukkeelle. `peite` = onko peite juuri nyt
         * ruudulla, `peiteKaytossa` = onko vipu päällä (vastakoe
         * `?topopeite=0`), `peiteMs` = kuinka kauan se oli ruudulla eli
         * kuinka pitkä se välivaihe olisi ollut paljaana karttana.
         */
        peite: Boolean(peite),
        peiteKaytossa,
        peiteMs: peiteKesti,
        /** Onko linssien yhteinen portti jo asetettu (ks. kohta 3). */
        portti: porttiAsetettu,
        haivytykset: lauta.linssit?.haivytykset?.() ?? null,
        /** Kumpi pohjakuva tälle ruudulle valittiin ('8k' vai '4k'). */
        pohja: pohja.tunnus,
        pohjanTiheys: +(pohja.leveys / 360).toFixed(2),
        tarkennus: tarkennus?.tila?.() ?? null,
        /** Onko reliefipyramidi tämän linssin ajan päällä (savuke). */
        reliefipyramidi: pyramidiPaalla,
        /** Laattakerroksen tila peitteen jokaisella kyselyllä (savuke). */
        peiteLoki: peitteenLoki.slice(0, 80),
      }),
    };
  },

  selite() {
    return SELITERIVIT;
  },
};
