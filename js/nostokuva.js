/*
 * NOSTO AUKEAA KUVA EDELLÄ — KAKSIVAIHEINEN AVAUS.
 *
 * OMISTAJA 11.9.2026 illalla, sanatarkasti: *"Voisiko kaikki nostot
 * kartalla muuttaa niin että kun pelaaja painaa nostoa niin ensin
 * aukeaa vain pelkkä kuva lähes koko ruudun kokoisena, alla pelkkä
 * lyhyt kuvateksti jonka alla olisi lisää nappi mitä painamalla
 * varsinainen nosto avautuisi teksteineen. Samalla nostolaatikoiden
 * leveys kasvaisi jotta isompana avautunut kuva mahtuisi sen sisään.
 * Tässä nostolaatikon ja tekstien ilmaantumisessa on todella tärkeää
 * että kuva pysyy täysin paikallaan ja että tekstit ja muut elementit
 * ilmaantuvat sen ympärille ilman että kuva välähtää tai liikkuu
 * yhtään. Se tekee tapahtumasta visuaalisesti koukuttavamman. Kuva
 * sulkeutuu mikäli pelaaja painaa mitä tahansa kohtaa kartalla. Ja
 * tässä tärkeää että samalla painalluksella ei voi aueta uutta nostoa
 * vaan ainoastaan kuva sulkeutuu."*
 *
 * ── YKSI KUVA, YKSI ELEMENTTI, KAKSI VAIHETTA ──────────────────────
 *
 * Tämä moduuli omistaa molempien karttakorttien (kartan tietoruutu
 * js/fokuskohteet.js ja täkynoston lunastuskortti js/fokusnosto.js)
 * kuvaesittelyn. Kuvakehys (`figure`) ja sen `img` LUODAAN KERRAN
 * vaiheessa 1 ja käytetään sellaisenaan vaiheessa 2: src ei vaihdu,
 * elementtiä ei rakenneta uudelleen eikä kuvaa siirretä toiseen
 * vanhempaan — se pysyy saman `sisalto`-elementin lapsena ja vain
 * vaihtaa paikkaa sisarustensa joukossa. Siksi selain ei lataa eikä
 * dekoodaa kuvaa uudestaan, eikä välähdystä synny.
 *
 * ── KUVA EI LIIKU: KORTTI SIIRTYY, EI KUVA ─────────────────────────
 *
 * Vaiheenvaihdossa kortin ympärille ilmestyy sisältöä myös kuvan
 * YLÄPUOLELLE (ylärivi, otsikko), joka työntäisi kuvaa alaspäin.
 * Kompensointi tehdään kahdella nupilla, jotka eivät koske kuvaan
 * lainkaan:
 *
 *   1. KORTIN OMA `top` ruudulla (kortti on `position: fixed`), ja
 *   2. sisältökotelon `scrollTop`, jos kortti ei enää mahdu ylemmäs.
 *
 * Mitta otetaan kuvan `getBoundingClientRect()`-laatikosta ENNEN ja
 * JÄLKEEN ladonnan samassa tehtävässä (ennen selaimen maalausta), ja
 * korjaus lasketaan puhtaalla funktiolla `nostokuvanKorjaus`, jota
 * testit ajavat ilman selainta. Koska koko työ tapahtuu yhden
 * synkronisen tehtävän sisällä, ruudulle ei maalaudu välitilaa.
 *
 * ── LEVEYS TULEE KUVASTA ───────────────────────────────────────────
 *
 * Kortin leveys jäädytetään vaiheessa 1 siihen, minkä iso kuva vaatii
 * (`fit-content` → mitattu px). Sama luku on voimassa vaiheessa 2,
 * joten kuvan vaakapaikka ei voi muuttua ladonnan mukana.
 *
 * ── NIMET ON PREFIKSOITU ───────────────────────────────────────────
 *
 * Yhden tiedoston versio ketjuttaa moduulit samaan näkyvyysalueeseen
 * (tools/tarkista-niputus.mjs), joten top-level-nimet alkavat
 * NOSTOKUVA_/nostokuva-etuliitteellä.
 */
import { html, suurennoksenMitat } from './ui-apurit.js';
import { kuvatekstiLyhyt } from './kuvatekstit.js';
import { taytaLahderivi } from './tekijakortti.js';

/** Oman tyylitiedoston tunnus (sama kaava kuin muilla kelluvilla pinnoilla). */
const NOSTOKUVA_TYYLIN_TUNNUS = 'nostokuva-tyyli';

/**
 * Ison kuvan pyyntöleveys pikseleinä. Kuva ladotaan lähes koko ruudun
 * kokoiseksi, joten kortin entinen 800 px olisi iPadin pystynäkymässä
 * jo venytetty.
 */
export const NOSTOKUVA_PYYNTO_PX = 1600;

/** Kortin vähimmäisetäisyys ruudun laidasta pikseleinä. */
export const NOSTOKUVA_MARGINAALI = 12;

/** Kortin vähin korkeus, kun alalaita leikataan ruudun sisään. */
export const NOSTOKUVA_VAHIN_KORKEUS = 160;

/**
 * Kuvan ympäriltä varattava tila: vaakasuunnassa kortin reunus ja
 * sisennys, pystysuunnassa kuvateksti, "Lisää"-nappi ja sama reunus.
 * Luvut ovat väljiä tarkoituksella — kuvan on mahduttava ruudulle myös
 * kaksirivisen kuvatekstin kanssa.
 */
export const NOSTOKUVA_VAAKAVARA = 44;
export const NOSTOKUVA_PYSTYVARA = 150;

/** Kuvasuhteen oletus, kun kuva ei ole vielä latautunut (3:2 havainnekuva). */
const NOSTOKUVA_OLETUSSUHDE = 3 / 2;

/**
 * Ison kuvan mitat ruudulla.
 *
 * Suunta ja täyttöaste tulevat talon yhteisestä linjauksesta
 * (js/ui-apurit.js suurennoksenMitat, omistaja 8.9.2026), jotta
 * kuvaesittely ja koko ruudun suurennos kasvavat samalla säännöllä.
 * Tässä varataan sen lisäksi kortin oma paperitila.
 */
export function nostokuvanMitat({
  kuvaLeveys, kuvaKorkeus, ruutuLeveys, ruutuKorkeus,
} = {}) {
  const kelpo = Number.isFinite(kuvaLeveys) && kuvaLeveys > 0
    && Number.isFinite(kuvaKorkeus) && kuvaKorkeus > 0;
  const { leveys, korkeus } = suurennoksenMitat({
    kuvaLeveys: kelpo ? kuvaLeveys : 3000,
    kuvaKorkeus: kelpo ? kuvaKorkeus : 3000 / NOSTOKUVA_OLETUSSUHDE,
    ruutuLeveys,
    ruutuKorkeus,
    vaakaVara: NOSTOKUVA_VAAKAVARA,
    pystyVara: NOSTOKUVA_PYSTYVARA,
  });
  return { leveys, korkeus };
}

/**
 * VAIHEENVAIHDON KORJAUS — montako pikseliä korttia siirretään ja
 * paljonko sisältöä vieritetään, jotta kuva jää TÄSMÄLLEEN paikalleen.
 *
 * @param {object} p
 * @param {number} p.ylin        kortin nykyinen `top` ruudulla
 * @param {number} p.delta       paljonko kuva siirtyi ladonnasta (px, alas +)
 * @param {number} p.korkeus     kortin korkeus vaiheessa 2
 * @param {number} p.ruutuKorkeus
 * @param {number} p.vierityskatto  sisältökotelon suurin scrollTop
 * @param {number} [p.marginaali]
 * @returns {{ ylin:number, vieritys:number, siirtyma:number }}
 *   `siirtyma` on se osa, jota ei saatu kompensoitua — nolla on ainoa
 *   hyväksytty arvo, ja testit vartioivat sitä.
 */
export function nostokuvanKorjaus({
  ylin, delta, korkeus, ruutuKorkeus, vierityskatto = 0,
  marginaali = NOSTOKUVA_MARGINAALI,
} = {}) {
  const tavoite = ylin - delta;
  const ala = Math.max(marginaali, ruutuKorkeus - marginaali - korkeus);
  const rajattu = Math.max(marginaali, Math.min(tavoite, ala));
  // Kortti jouduttiin jättämään tavoitteen ALApuolelle (rajattu > tavoite):
  // sen verran kuva valuisi alas, ja sen verran sisältöä vieritetään ylös.
  const puuttuu = Math.max(0, rajattu - tavoite);
  const vieritys = Math.min(puuttuu, Math.max(0, vierityskatto));
  return { ylin: tavoite + vieritys, vieritys, siirtyma: puuttuu - vieritys };
}

/** Oma tyylitiedosto sivulle, jos sitä ei vielä ole. */
function nostokuvaLataaTyyli() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(NOSTOKUVA_TYYLIN_TUNNUS)) return;
  const peruslinkki = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
  if (!peruslinkki) return;
  const linkki = document.createElement('link');
  linkki.id = NOSTOKUVA_TYYLIN_TUNNUS;
  linkki.rel = 'stylesheet';
  linkki.href = new URL('nostokuva.css', peruslinkki.href).href;
  document.head.appendChild(linkki);
}

/** Ruudun mitat; testattavuuden takia yhdessä paikassa. */
function nostokuvaRuutu() {
  return {
    leveys: globalThis.innerWidth || 0,
    korkeus: globalThis.innerHeight || 0,
  };
}

/**
 * KAKSIVAIHEINEN AVAUS PÄÄLLE.
 *
 * Kutsuja antaa valmiin kortin ja sisältökotelon, kuvadatan, kuvan
 * asettajan (moduulikohtainen: Commons-porras vs. repon oma polku) ja
 * takaisinkutsun, joka latoo VARSINAISEN noston — se saa parametrikseen
 * valmiin kuvakehyksen ja on velvollinen sijoittamaan juuri sen eikä
 * uutta kuvaa.
 *
 * @param {object} p
 * @param {Element} p.kortti      kortin juurielementti
 * @param {Element} p.sisalto     vieritettävä sisältökotelo kortin sisällä
 * @param {object}  p.kuva        kuvadatan olio (tiedosto/osoite, selite, lahde)
 * @param {(img:HTMLImageElement, leveys:number, onVirhe:() => void) => void} p.aseta
 * @param {(sisalto:Element, kuvakehys:Element) => void} p.latoNosto
 * @param {(nappi:Element) => void} [p.avaaSuurennos] vaiheen 2 kuvanapin teko
 * @param {(nappi:Element, kehys:Element) => void} [p.koristele] kutsujan
 *   oma lisä kuvan päälle (kartan tietoruudun ihmenauha)
 * @param {() => void} [p.onKuvatta] kutsutaan, kun kuvaesittely on peruttu
 *   (kuva jäi lataamatta); kortti on silloin jo ladottu tekstikorttina.
 * @returns {{ kehys:Element, vaihe:() => string, lisaa:() => void } | null}
 */
export function nostokuvaAloita({
  kortti, sisalto, kuva, aseta, latoNosto,
  avaaSuurennos = null, onKuvatta = null, koristele = null,
}) {
  if (typeof document === 'undefined' || !kortti || !sisalto || !kuva) return null;
  nostokuvaLataaTyyli();

  let vaihe = 1;
  kortti.classList.add('nostokuva-kortti', 'nostokuva-vaihe1');
  /*
   * ASEMOINTI INLINE-TYYLINÄ, EI LUOKASTA. Kortteja on kaksi
   * (.fokuskohde-popup on absolute kartan sisällä, .fokusnosto-kortti
   * kelluu flex-keskityksessä), ja niiden omat tyylitiedostot
   * ladataan ajossa — luokkien keskinäinen järjestys ei ole tiedossa.
   * Inline voittaa kummankin varmasti.
   */
  kortti.style.position = 'fixed';
  kortti.style.zIndex = '47';
  /*
   * AVAUSLIIKE POIS SAMASTA SYYSTÄ. Kumpikin kortti liukuu auki
   * pystysuunnassa (.fokuskohde-popup animaatio 6 px,
   * .fokusnosto-kortti siirtymä 12 px), ja se liike siirtäisi myös
   * kuvaa. Kuva edellä -avauksessa kuva on kortin ainoa sisältö: se
   * on paikallaan ensimmäisestä kehyksestä alkaen.
   */
  kortti.style.animation = 'none';
  kortti.style.transition = 'none';
  kortti.style.transform = 'none';
  kortti.style.opacity = '1';

  const kehys = html('figure', 'nostokuva-kehys');
  const nappi = html('button', 'nostokuva-nappi');
  nappi.type = 'button';
  const img = document.createElement('img');
  img.className = 'nostokuva-img';
  img.alt = kuvatekstiLyhyt(kuva);
  img.decoding = 'async';
  img.draggable = false;
  nappi.appendChild(img);
  // Kutsujan oma koriste kuvan päälle (kartan tietoruudussa ihmenauha):
  // se kuuluu kuvaan eikä saa kadota siitä, että kuva ladotaan täällä.
  koristele?.(nappi, kehys);
  kehys.appendChild(nappi);

  const selite = html('figcaption', 'nostokuva-selite');
  selite.append(
    html('span', 'nostokuva-teksti', kuvatekstiLyhyt(kuva)),
    taytaLahderivi(html('span', 'nostokuva-lahde'), kuva.lahde ?? '', kuva),
  );
  kehys.appendChild(selite);

  const lisaa = html('button', 'nostokuva-lisaa', 'Lisää');
  lisaa.type = 'button';
  lisaa.setAttribute('aria-label', 'Lisää — avaa koko nosto');

  sisalto.replaceChildren(kehys, lisaa);

  /*
   * KUVAN LAATIKKO ON INLINE-PIKSELEITÄ, EI LADONNAN TULOS. Mitta
   * asetetaan heti oletussuhteella ja tarkennetaan vain kerran, kun
   * oikea kuva on latautunut JA ollaan yhä vaiheessa 1. Vaiheen 2
   * jälkeen mittaan ei kosketa: kuvan laatikko on silloin lukossa.
   */
  const mitoita = () => {
    const ruutu = nostokuvaRuutu();
    if (!ruutu.leveys || !ruutu.korkeus) return;
    const { leveys, korkeus } = nostokuvanMitat({
      kuvaLeveys: img.naturalWidth,
      kuvaKorkeus: img.naturalHeight,
      ruutuLeveys: ruutu.leveys,
      ruutuKorkeus: ruutu.korkeus,
    });
    if (!leveys || !korkeus) return;
    img.style.width = `${Math.round(leveys)}px`;
    img.style.height = `${Math.round(korkeus)}px`;
  };

  /** Elementin vaakasuora oma tila (reunus + sisennys + marginaali). */
  const reunat = (elementti) => {
    const tyyli = globalThis.getComputedStyle?.(elementti);
    if (!tyyli) return 0;
    const luku = (arvo) => Number.parseFloat(arvo) || 0;
    return luku(tyyli.paddingLeft) + luku(tyyli.paddingRight)
      + luku(tyyli.borderLeftWidth) + luku(tyyli.borderRightWidth)
      + luku(tyyli.marginLeft) + luku(tyyli.marginRight);
  };

  /**
   * KORTIN LEVEYS LASKETAAN KUVASTA, EI LADONNASTA.
   *
   * `fit-content` olisi lyhyempi mutta ei DETERMINISTINEN: se mittaa
   * sen sisällön, joka kortissa sattuu juuri sillä hetkellä olemaan,
   * ja vaiheessa 1 se riippuisi siitä, ehtikö kuva latautua ennen
   * ensimmäistä asemointia. Sama kortti sai mittauksissa kahden ajon
   * välillä eri leveyden. Nyt luku on kuvan leveys + paperin oma tila,
   * eli aina sama — ja juuri niin leveä, että iso kuva mahtuu sisään
   * sellaisenaan (omistajan tilaus 11.9.2026).
   */
  const jaadytaLeveys = () => {
    const enintaan = Math.max(0, nostokuvaRuutu().leveys - 2 * NOSTOKUVA_MARGINAALI);
    const kuvanLeveys = Number.parseFloat(img.style.width) || 0;
    /*
     * VIERITYSPALKIN KAISTA MUKAAN. Vaiheessa 2 sisältö vierittyy, ja
     * klassisella vierityspalkilla (työpöytä) kaista kaventaisi
     * sisältöä — keskitetty kuva siirtyisi vaakasuunnassa. CSS varaa
     * kaistan molemmissa vaiheissa (scrollbar-gutter: stable), ja
     * tässä se lasketaan mukaan kortin leveyteen.
     */
    const kaista = Math.max(0, sisalto.offsetWidth - sisalto.clientWidth);
    const vara = reunat(kortti) + reunat(sisalto) + kaista;
    kortti.style.maxWidth = `${enintaan}px`;
    kortti.style.width = `${Math.round(Math.min(kuvanLeveys + vara, enintaan))}px`;
  };

  /** Kortti keskelle ruutua (vain vaihe 1). */
  const keskita = () => {
    const ruutu = nostokuvaRuutu();
    const laatikko = kortti.getBoundingClientRect();
    const vasen = Math.max(NOSTOKUVA_MARGINAALI, Math.round((ruutu.leveys - laatikko.width) / 2));
    const ylin = Math.max(NOSTOKUVA_MARGINAALI, Math.round((ruutu.korkeus - laatikko.height) / 2));
    kortti.style.left = `${vasen}px`;
    kortti.style.top = `${ylin}px`;
  };

  const asemoi = () => {
    if (vaihe !== 1) return;
    kortti.style.maxHeight = `${Math.max(0, nostokuvaRuutu().korkeus - 2 * NOSTOKUVA_MARGINAALI)}px`;
    mitoita();
    jaadytaLeveys();
    keskita();
  };

  /*
   * KUVA EI TULLUT — KORTTI ON SILTI EHJÄ. Puuttuva tiedosto veisi
   * muuten pelaajalta koko noston: vaihe 1 jäisi tyhjäksi kehykseksi,
   * jonka takana teksti odottaa. Kuvaesittely perutaan silloin
   * kokonaan ja kortti latoutuu tavallisena tekstikorttina — samat
   * inline-tyylit puretaan, jotta kortti palaa omaan asemointiinsa.
   */
  const peru = () => {
    if (vaihe === 3) return;
    vaihe = 3;
    kortti.classList.remove('nostokuva-kortti', 'nostokuva-vaihe1', 'nostokuva-vaihe2');
    for (const nimi of ['width', 'maxWidth', 'maxHeight', 'left', 'top', 'position', 'zIndex',
      'animation', 'transition', 'transform', 'opacity']) {
      kortti.style[nimi] = '';
    }
    kehys.remove();
    sisalto.replaceChildren();
    latoNosto(sisalto, null);
    onKuvatta?.();
  };

  img.addEventListener('load', () => { if (vaihe === 1) asemoi(); }, { once: true });
  aseta(img, NOSTOKUVA_PYYNTO_PX, peru);
  asemoi();

  /** Vaihe 2: varsinainen nosto saman kuvan ympärille. */
  const avaaLisaa = () => {
    if (vaihe !== 1) return;
    // 1) MITTA ENNEN. Kaikki alla tapahtuu samassa tehtävässä, joten
    //    selain ei maalaa väliä — kuva ei ehdi liikkua ruudulla.
    const ennen = img.getBoundingClientRect();
    vaihe = 2;
    kortti.classList.remove('nostokuva-vaihe1');
    kortti.classList.add('nostokuva-vaihe2');
    lisaa.remove();
    if (avaaSuurennos) {
      nappi.title = 'Katso kuva suurempana';
      nappi.setAttribute('aria-label', `${kuvatekstiLyhyt(kuva) || 'Kuva'} — avaa suurena`);
      nappi.classList.add('nostokuva-nappi-zoom');
    }
    // 2) LADONTA. Kuvakehys irtoaa hetkeksi (replaceChildren) ja palaa
    //    SAMAN vanhemman lapseksi — ei uudelleenlatausta, ei uutta
    //    elementtiä, ei src:n vaihtoa.
    sisalto.replaceChildren();
    latoNosto(sisalto, kehys);
    kortti.style.maxHeight = `${Math.max(0, nostokuvaRuutu().korkeus - 2 * NOSTOKUVA_MARGINAALI)}px`;
    // 3) MITTA JÄLKEEN JA KORJAUS.
    const jalkeen = img.getBoundingClientRect();
    const korjaus = nostokuvanKorjaus({
      ylin: Number.parseFloat(kortti.style.top) || 0,
      delta: jalkeen.top - ennen.top,
      korkeus: kortti.getBoundingClientRect().height,
      ruutuKorkeus: nostokuvaRuutu().korkeus,
      vierityskatto: Math.max(0, sisalto.scrollHeight - sisalto.clientHeight),
    });
    sisalto.scrollTop = korjaus.vieritys;
    kortti.style.top = `${korjaus.ylin}px`;
    /*
     * KORTIN ALALAITA RUUDUN SISÄÄN. Kuva pysyy paikallaan siksi, että
     * kortti saa liukua alaspäin — mutta silloin sen alaosa jäisi
     * ruudun alapuolelle, ja juuri se osa on pisin: leipäteksti,
     * lähde ja pöllökysymykset. Katto leikataan alalaidasta, jolloin
     * kaikki mahtuu kortin omaan vieritykseen eikä kuva liiku
     * (yläpuolinen sisältö ei muutu).
     */
    kortti.style.maxHeight = `${Math.max(
      NOSTOKUVA_VAHIN_KORKEUS,
      nostokuvaRuutu().korkeus - korjaus.ylin - NOSTOKUVA_MARGINAALI,
    )}px`;
    /*
     * TARKISTUSMITTA — VIERITYS PYÖRISTYY, `top` EI. Selain napsauttaa
     * scrollTopin laitepikselien hilaan (Retinalla 0,5 px), joten
     * pelkkä laskettu korjaus jätti vaakanäkymässä mitatun 0,2–0,4
     * pikselin jäännöksen. Jäännös luetaan kuvan omasta laatikosta ja
     * siirretään kortin `top`-arvoon, joka on murto-osatarkka: mittari
     * (tools/mittaa-nostokuva.mjs) vaatii täsmälleen nollan.
     */
    const jaannos = img.getBoundingClientRect().top - ennen.top;
    if (jaannos) {
      kortti.style.top = `${(Number.parseFloat(kortti.style.top) || 0) - jaannos}px`;
    }
  };

  lisaa.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    avaaLisaa();
  });
  nappi.addEventListener('click', (tapahtuma) => {
    tapahtuma.stopPropagation();
    // Vaiheessa 1 kuvan napautus on sama teko kuin "Lisää"; vaiheessa 2
    // se avaa koko ruudun suurennoksen kuten muillakin kortin kuvilla.
    if (vaihe === 1) avaaLisaa();
    else avaaSuurennos?.(nappi);
  });

  // Ikkunan koon muutos koskee vain vaihetta 1 (vaiheessa 2 kuva on
  // lukossa eikä sitä siirretä pelaajan selän takana).
  const koko = () => asemoi();
  globalThis.addEventListener?.('resize', koko);
  globalThis.addEventListener?.('orientationchange', koko);
  kortti.nostokuvaPurku = () => {
    globalThis.removeEventListener?.('resize', koko);
    globalThis.removeEventListener?.('orientationchange', koko);
  };

  return { kehys, vaihe: () => (vaihe === 1 ? 'kuva' : 'nosto'), lisaa: avaaLisaa };
}

/** Onko kortti kuvaesittelyn hallussa (asemointi ja raahaus jäävät pois)? */
export function nostokuvaKortissa(kortti) {
  return Boolean(kortti?.classList?.contains?.('nostokuva-kortti'));
}
