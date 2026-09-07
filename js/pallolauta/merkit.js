/*
 * PALLOLAUDAN MERKIT — nappula ja nopanheiton kohteet pallon päällä
 * (vaihe 2, docs/moduulit/karttapallo.md luku 4.2: molemmat **H** eli
 * Globe.gl:n htmlElementsData, CSS2D-elementti pallon pinnan pisteessä).
 *
 * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026): nappula ja kohteet
 * ovat PELIN merkkejä — ne vaihtuvat pelin edetessä ja ottavat
 * napautuksen vastaan — joten ne saavat olla pinnoitteen päällä.
 *
 * SAMA ULKOASU KUIN TASOKARTALLA. Kohdemerkki on täsmälleen fokusnäkymän
 * kohdemerkki (js/ui.js fokusKohdeMerkki, omistaja 2.9.2026:
 * *"nopanheitossa valittavat pisteet täytyy näkyä selvemmin"*): hengittävä
 * kultahalo, kultalevy + punamullan katkoviivarengas ja kohteen nimi —
 * samat CSS-luokat (.target-halo.fokus, .target-piste, .target-nimi),
 * joten väri, viiva ja liike tulevat samasta säännöstä. Askelpiste ilman
 * kaupunkia saa saman merkin pienempänä (.far) eikä nimeä. Nappula on
 * js/ui.js pawnShape sellaisenaan pieneen svg:hen piirrettynä.
 *
 * KOKO ON RUUTUVAKIO: CSS2D-elementti ei skaalaudu pallon mukana, joten
 * merkki on 24 px joka korkeudella — sama kuin tasokartan fokusnäkymässä,
 * jossa kohdemerkin säde mitataan ruudulta (paivitaFokusKohdeMitat).
 *
 * NAPAUTUS EI KULJE ELEMENTIN KAUTTA. Kohde-elementit ovat
 * pointer-events: none, ja osuma lasketaan pallon omasta napautuksesta
 * lähimpään kohteeseen 44 px:n sisällä (js/pallolauta/lauta.js,
 * R-malli). Syy on karttapallo.md:n riski 3: CSS2D-elementtien
 * napautus kulkee kirjaston sormenlaskennan ohi, ja kaksi reittiä samaan
 * doMoveen olisi tuplakutsu. Yksi osumatesti, yksi kutsu.
 *
 * ELEMENTIT PYSYVÄT: datumit ovat pysyviä olioita avaimittain, jotta
 * Globe.gl siirtää olemassa olevaa elementtiä (htmlTransitionDuration,
 * KAIKKI LIIKE ANIMOIDAAN) eikä luo sitä uudestaan joka piirrossa.
 *
 * VAIHE 3: sama kerros kantaa myös kaupunkien nimet
 * (js/pallolauta/nimet.js) ja elävät nostot, eläintäyt ja
 * kohtaamispisteen (js/pallolauta/nostot.js) — ks. luoMerkit alla.
 */

/** Kohdemerkin halkaisija ruudulla (px) — js/ui.js FOKUS_KOHDE_PX. */
export const KOHDEMERKIN_PX = 24;
/** Askelpisteen (kohde ilman kaupunkia) halkaisija — FOKUS_KOHDE_PISTE_PX. */
export const KOHDEMERKIN_PISTE_PX = 15;
/** Kohteen nimen kirjasinkoko — FOKUS_KOHDE_NIMI_PX. */
export const KOHDEMERKIN_NIMI_PX = 13;
/** Halon laajin aste (CSS kohde-halo) — nimi sen yläpuolelle. */
export const KOHDEMERKIN_HALO_LAAJIN = 1.42;
/** Rako halon ja nimen väliin (px). */
export const KOHDEMERKIN_NIMI_RAKO_PX = 8;
/*
 * HUOMIORENGAS VALITTAVAN KAUPUNGIN YMPÄRILLE (omistaja 7.9.2026
 * iltapäivä, sanatarkasti: *"Ja valittavien kohdekaupunkien
 * huomioympyrää voisi hieman tehostaa."*).
 *
 * Lähtövalinnan kohde on eri asia kuin nopanheiton kohde: nopanheitossa
 * pelaaja etsii vaihtoehtoja lähikuvasta, lähtövalinnassa hän etsii
 * yhtä NELJÄSTÄTOISTA kaupungista koko maapallolta (js/ui-apurit.js
 * ETUSIVUN_KOHTEET) — merkin pitää löytyä silmänräpäyksessä myös
 * pallon reunalta. Siksi valittava saa oman renkaansa merkin
 * ympärille: kohdemerkin halo on 24 px:n merkin päällä 17 px:n
 * säteinen, tämä on 27 — selvästi merkkiä laajempi mutta yhä yhden
 * kaupungin kokoinen, ei maanosan.
 *
 * KOKO ON RUUDUN MITTA, ei laudan: merkki on CSS2D-elementti, joten
 * rengas on yhtä iso kaukaa ja läheltä, kuten kohdemerkki itsekin.
 * Sykkeen (2,6 s) ja kultaisen värin omistaa css/styles.css
 * (.pallolauta-huomio, --kulta) — täällä on vain mitta.
 */
export const KOHDEMERKIN_HUOMIO_PX = 54;
/*
 * MERKKI ON PINNALLA, EI PINNAN YLLÄ (omistajan vikailmoitus 7.9.2026,
 * iPad, sanatarkasti: *"nyt kun kartta on pallona, niin kohdepisteet ja
 * pelaajan nappula ei pysy paikallaan, kun karttaa vierittää, vaan ne
 * heiluvat vähän eri suuntiin, riippuen mihin päin vierittää. Pystyisikö
 * ne lukitsemaan? Paikalleen."*)
 *
 * JUURISYY ON PERSPEKTIIVI, EI VIIVE. Merkki oli 0,004 × säde eli 0,4
 * yksikköä pinnan YLÄPUOLELLA. Kohotettu piste ei projisoidu samaan
 * ruutupikseliin kuin sen alla oleva pinnan piste: se työntyy ruudun
 * keskipisteestä ULOSPÄIN kertoimella, joka riippuu vain kameran
 * korkeudesta — likimain (1 + h / (R · korkeus)). Ruudun keskellä ero on
 * nolla ja laidalla suurimmillaan, joten kun karttaa panoroi, merkki
 * liukuu laattojen päällä sitä mukaa kuin sen paikka ruudulla muuttuu —
 * ja suunta vaihtuu vierityssuunnan mukana. Laatat, rantaviiva
 * (js/pallovektorit.js VEKTORIT_KORKEUS = 0) ja pallon oma pinta ovat
 * korkeudella 0, joten ne eivät liiku: liikkui vain merkki.
 *
 * Mitattu Chromiumilla 7.9.2026 (390 × 844 dpr 2, Ateena, korkeus 0,08,
 * 12 × 0,02° panorointia itään): CSS2D-elementin ruutupaikka on tasan
 * `getScreenCoords(lat, lng, 0,004)`, ja sen ero pinnan pisteestä kasvoi
 * 0,16 px:stä 1,95 px:iin, kun merkki siirtyi 11 → 44 px ruudun
 * keskipisteestä. Kerroin on 4,4 % säteittäisestä etäisyydestä: puhelimen
 * laidalla (195 px) 8,6 px ja iPadin laidalla (~400 px) 18 px — juuri se
 * "heiluminen", jonka omistaja näki.
 *
 * KORKEUS EI OSTA MITÄÄN CSS2D-KERROKSELLE. Merkit ovat DOM-elementtejä
 * kankaan päällä, eivät kolmiulotteisia olioita: niillä ei ole
 * syvyystestiä, joten nostatus ei voi nostaa niitä minkään edelle.
 * Kaupunkipisteet (pointsData, 0,003) ovat oikeita meshejä ja
 * tarvitsevat nostatuksensa piirtojärjestykseen — ne jäävät ennalleen,
 * ja niiden oma 3,3 %:n säteittäinen siirtymä on kirjattu
 * docs/moduulit/karttapallo.md luvun 12 jatkotyöksi.
 */
export const MERKIN_KORKEUS = 0;

const SVG = 'http://www.w3.org/2000/svg';

/**
 * Nappula (js/ui.js pawnShape) pieneen svg:hen. Jaettu paikallaan olevan
 * H-nappulan ja liikkuvan D-nappulan (js/pallolauta/siirto.js) kesken,
 * jotta hahmo on sama molemmissa.
 *
 * JALKA ON PISTEESSÄ MOLEMMISSA (päätoimittajan linjaus 7.9.2026,
 * Raamattu VIAT v1672). Liikkuva nappula asemoi itsensä joka kehys
 * (siirto.js: `p.x - leveys / 2, p.y - korkeus`); lepomerkin hoitaa
 * css/styles.css `.pallolauta-nappula:not(.pallolauta-liikkuva)` —
 * 0 × 0 laatikko + svg:n oma `translate(-50%, -100%)`, koska kirjaston
 * CSS2D-kerros kirjoittaa keskityksensä inline-tyyliin eikä
 * tyylitiedoston sääntö muuten päde. Ilman tätä siirron viimeisellä
 * kehyksellä nappula hyppäsi 18 px alas.
 */
export function nappulaElementti(ui, luokka = 'pallolauta-nappula', aktiivinen = true) {
  const el = document.createElement('div');
  el.className = luokka;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '-8 -14 16 18');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '36');
  svg.setAttribute('aria-hidden', 'true');
  el.appendChild(svg);
  // Sama hahmo kuin tasokartalla (js/ui.js pawnShape); liitteet
  // (varjo, vuororengas, liukuvärit) syntyvät tähän pieneen svg:hen.
  // Liikkuva nappula on ilman vuororengasta kuten tasokartan .pawn-moving.
  if (ui.game.player) ui.pawnShape(svg, ui.game.player, aktiivinen);
  return el;
}

/**
 * Nopanheiton kohteen merkki: halo, piste ja nimi samoilla luokilla kuin
 * tasokartan fokusKohdeMerkki. `kohde.city` on kaupunki tai null
 * (askelpiste reitin varrella).
 *
 * `kohde.huomio` (lähtövalinnan valittava kaupunki) lisää merkin
 * ympärille hitaasti sykkivän kultarenkaan ja nostaa nimen sen
 * yläpuolelle — ks. KOHDEMERKIN_HUOMIO_PX.
 */
export function kohdeElementti(kohde) {
  const el = document.createElement('div');
  el.className = 'pallolauta-kohde';
  el.dataset.kohde = kohde.key;
  const px = kohde.city ? KOHDEMERKIN_PX : KOHDEMERKIN_PISTE_PX;
  const r = px / 2;
  const huomio = kohde.huomio === true;
  // Nimi jää aina ylimmän kehän yläpuolelle: halon laajin aste tai
  // huomiorenkaan säde, kumpi on suurempi.
  const nimenSade = Math.max(r * KOHDEMERKIN_HALO_LAAJIN, huomio ? KOHDEMERKIN_HUOMIO_PX / 2 : 0);
  // Nimi mahtuu leveyssuunnassa: svg on merkkiä leveämpi, keskipiste
  // origossa, jotta translate(-50%, -50%) osuu pallon pisteeseen.
  const w = 160;
  const h = 2 * (nimenSade + KOHDEMERKIN_NIMI_RAKO_PX + KOHDEMERKIN_NIMI_PX + 4);
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', `${-w / 2} ${-h / 2} ${w} ${h}`);
  svg.setAttribute('width', String(w));
  svg.setAttribute('height', String(h));
  svg.setAttribute('aria-hidden', 'true');
  el.appendChild(svg);
  const ympyra = (luokka) => {
    const c = document.createElementNS(SVG, 'circle');
    c.setAttribute('cx', '0');
    c.setAttribute('cy', '0');
    c.setAttribute('r', String(r));
    c.setAttribute('class', luokka);
    svg.appendChild(c);
    return c;
  };
  // Huomiorengas ja halo ENNEN pistettä, jotta ne jäävät sen alle
  // (sama järjestys kuin kartalla).
  if (huomio) {
    const rengas = ympyra('pallolauta-huomio');
    rengas.setAttribute('r', String(KOHDEMERKIN_HUOMIO_PX / 2));
  }
  ympyra(kohde.city ? 'target-halo fokus' : 'target-halo fokus far');
  ympyra(kohde.city ? 'target-piste' : 'target-piste far');
  if (kohde.city) {
    const nimi = document.createElementNS(SVG, 'text');
    nimi.setAttribute('x', '0');
    // Nimi HALON yläpuolelle, ei renkaan (ks. paivitaFokusKohdeMitat).
    nimi.setAttribute('y', String(-(nimenSade + KOHDEMERKIN_NIMI_RAKO_PX)));
    nimi.setAttribute('class', 'target-nimi');
    nimi.setAttribute('text-anchor', 'middle');
    nimi.setAttribute('font-size', String(KOHDEMERKIN_NIMI_PX));
    nimi.textContent = kohde.city.name;
    svg.appendChild(nimi);
  }
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', kohde.city ? `Kohde: ${kohde.city.name}` : 'Kohde reitin varrella');
  return el;
}

/**
 * Merkkikerros pallolle — YKSI htmlElementsData-KERROS, MONTA OSAA
 * (vaihe 3). Globe.gl:llä on yksi html-kerros, joten nappula ja
 * kohteet (osa `peli`), kaupunkien nimet (osa `nimet`,
 * js/pallolauta/nimet.js) ja elävät nostot, eläintäyt ja
 * kohtaamispiste (osa `nostot`, js/pallolauta/nostot.js) kootaan tässä
 * samaan listaan. Jokainen osa asettaa oman listansa (`aseta`), ja
 * rekisteri pitää datumit pysyvinä avaimittain, jotta kirjasto siirtää
 * olemassa olevaa elementtiä eikä luo sitä uudestaan.
 *
 * ILMESTYMINEN JA POISTUMINEN ANIMOIDAAN (Raamattu, KAIKKI LIIKE
 * ANIMOIDAAN): uusi elementti häivytetään sisään CSS-animaatiolla
 * (.pallolauta-merkki), ja poistuva jää listaan siirtymän ajaksi
 * luokalla .pallolauta-poistuu (häivytys ulos) ennen kuin se puretaan.
 * Pallon takana oleva merkki saa luokan .pallolauta-takana — sama
 * häivytys, ei inline-opacity, jotta kolme tilaa eivät kirjoita
 * saman ominaisuuden yli. Reduced motion: siirtymä 0 → purku heti.
 *
 * `asteet(kohta)` kääntää laudan (x, y) asteiksi ({ lat, lon }).
 * Palauttaa `paivita({ nappula, kohteet })` (osa `peli`), `aseta(osa,
 * lista)`, `maara(osa)`, `laatikot(osa)` ja kohteiden luettelon
 * osumatestiä varten.
 */
export function luoMerkit({ pallo, ui, siirtyma, asteet, kotelo = null }) {
  const data = new Map(); // avain → pysyvä datum
  const osat = new Map(); // osan nimi → datumit
  const poistuvat = new Map(); // avain → ajastin
  let kohteet = [];

  /** Elementti datumin lajin mukaan; osat antavat oman tehtaansa. */
  const elementti = (d) => {
    let el;
    if (d.laji === 'nappula') el = nappulaElementti(ui);
    else if (d.laji === 'kohde') el = kohdeElementti(d);
    else el = d.elementti(d);
    el.classList.add('pallolauta-merkki');
    d.el = el;
    d.asettele?.(el, d);
    return el;
  };

  pallo
    .htmlElementsData([])
    .htmlLat('lat').htmlLng('lng')
    .htmlAltitude(MERKIN_KORKEUS)
    .htmlElement(elementti)
    .htmlTransitionDuration(siirtyma);
  // Merkit pallon takana piiloon (CSS2D ei itse leikkaa horisonttiin).
  pallo.htmlElementVisibilityModifier?.((el, nakyy) => {
    el.classList.toggle('pallolauta-takana', !nakyy);
  });

  /** Koko lista kirjastolle: osat järjestyksessä + poistuvat. */
  const tyonna = () => {
    const lista = [];
    for (const osa of osat.values()) lista.push(...osa);
    for (const d of data.values()) if (d.poistuu && !lista.includes(d)) lista.push(d);
    pallo.htmlElementsData(lista);
  };

  const poista = (d) => {
    if (!(siirtyma > 0) || !d.el) { data.delete(d.avain); return; }
    d.poistuu = true;
    d.el.classList.add('pallolauta-poistuu');
    poistuvat.set(d.avain, setTimeout(() => {
      poistuvat.delete(d.avain);
      if (!d.poistuu) return;
      data.delete(d.avain);
      tyonna();
    }, siirtyma));
  };

  /**
   * Osan datumit. `uudet` on lista { avain, laji, lat, lng, ... };
   * `haivyta` (oletus tosi) häivyttää poistuvat siirtymän ajan;
   * osan `nimet` ja `nostot` datumeilla on lisäksi `elementti(d)` ja
   * mahdollinen `asettele(el, d)` (sisäasettelu, kun sama datum saa
   * uudet mitat). Sama datum säilyy, kun avain säilyy.
   */
  const aseta = (osa, uudet, { haivyta = true } = {}) => {
    const ennen = osat.get(osa) ?? [];
    const lista = [];
    for (const tiedot of uudet) {
      let d = data.get(tiedot.avain);
      if (d) {
        Object.assign(d, tiedot);
        if (d.poistuu) {
          d.poistuu = false;
          clearTimeout(poistuvat.get(d.avain));
          poistuvat.delete(d.avain);
          d.el?.classList.remove('pallolauta-poistuu');
        }
        if (d.el) d.asettele?.(d.el, d);
      } else {
        d = { ...tiedot };
        data.set(d.avain, d);
      }
      lista.push(d);
    }
    const jaa = new Set(lista.map((d) => d.avain));
    for (const d of ennen) {
      if (jaa.has(d.avain) || d.poistuu) continue;
      if (haivyta) poista(d); else data.delete(d.avain);
    }
    osat.set(osa, lista);
    if (osa === 'peli') kohteet = lista.filter((d) => d.laji === 'kohde');
    tyonna();
  };

  /**
   * Pelin merkit (osa `peli`). `nappula` on laudan kohta { x, y } tai
   * null (nappula liikkeessä tai ei laudalla); `kohteet` on lista
   * { key, x, y, city }.
   */
  const paivita = ({ nappula = null, kohteet: uudet = [] }) => {
    const lista = [];
    // Kohteet ennen nappulaa: nappula piirtyy päällimmäiseksi.
    for (const k of uudet) {
      const a = asteet(k);
      if (!a) continue;
      lista.push({
        avain: `kohde:${k.key}`, laji: 'kohde', key: k.key, city: k.city ?? null,
        huomio: k.huomio === true, x: k.x, y: k.y, lat: a.lat, lng: a.lon,
      });
    }
    if (nappula) {
      const a = asteet(nappula);
      if (a) {
        lista.push({
          avain: 'nappula', laji: 'nappula', x: nappula.x, y: nappula.y, lat: a.lat, lng: a.lon,
        });
      }
    }
    /*
     * PELIN MERKIT EIVÄT HÄIVY ULOS: paikallaan oleva nappula vaihtuu
     * liikkuvaan (js/pallolauta/siirto.js) samassa pisteessä, ja
     * häivytys olisi haamu sen alla; kohteet katoavat valinnan
     * hetkellä kuten kartalla. Nimet ja nostot häivytetään.
     */
    aseta('peli', lista, { haivyta: false });
  };

  /**
   * Osan elementtien laatikot kotelon pikseleinä (nimiladonnan
   * varaukset ja väistökehä, js/karttanimet.js ladoRuutunimet). Vain
   * ruudulla olevat, poistuvat ja pallon takana olevat eivät varaa.
   */
  const laatikot = (osa) => {
    const ulos = [];
    const koti = kotelo?.getBoundingClientRect?.();
    if (!koti) return ulos;
    for (const d of osat.get(osa) ?? []) {
      const el = d.el;
      if (!el?.isConnected || d.poistuu || el.classList.contains('pallolauta-takana')) continue;
      const r = (el.querySelector('svg') ?? el).getBoundingClientRect();
      if (!(r.width > 0)) continue;
      ulos.push({
        x0: r.left - koti.left, y0: r.top - koti.top, x1: r.right - koti.left, y1: r.bottom - koti.top,
      });
    }
    return ulos;
  };

  return {
    paivita,
    aseta,
    laatikot,
    maara: (osa) => (osat.get(osa) ?? []).length,
    /** Näkyvät kohteet osumatestiä varten ({ key, lat, lng, city }). */
    kohteet: () => kohteet,
    /**
     * NAPAUTETTAVAT LINSSIMERKIT (aalto 2A). Linssin merkki
     * (js/pallolauta/linssit.js merkit, laji `linssi`) saa datumiinsa
     * `napautus(d)`, ja osuma lasketaan pallon omasta napautuksesta
     * kuten kaikilla muillakin merkeillä — elementti itse ei ota
     * osumia (ks. NAPAUTUS EI KULJE ELEMENTIN KAUTTA yllä). Poistuva
     * merkki ei enää vastaa.
     */
    napautettavat: () => {
      const ulos = [];
      for (const lista of osat.values()) {
        for (const d of lista) if (!d.poistuu && typeof d.napautus === 'function') ulos.push(d);
      }
      return ulos;
    },
    pura: () => {
      for (const t of poistuvat.values()) clearTimeout(t);
      poistuvat.clear();
    },
  };
}
