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

/** Kuvan sijaintitiedot ja itse kuva valmiiksi ladattuina. */
export async function lataaReliefi() {
  if (!kuvatiedot) {
    ({ TOPOGRAFIA_KUVA: kuvatiedot } = await import('../packs/linssi-topografia-kuva.js'));
  }
  await esilataa(kuvatiedot.kuva);
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
    await lataaReliefi();
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

  selite() {
    return SELITERIVIT;
  },
};
