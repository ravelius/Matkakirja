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
/** Merkkien korkeus pallon pinnasta: kaupunkipisteiden (0,003) yllä. */
export const MERKIN_KORKEUS = 0.004;

const SVG = 'http://www.w3.org/2000/svg';

/**
 * Nappula (js/ui.js pawnShape) pieneen svg:hen. Jaettu paikallaan olevan
 * H-nappulan ja liikkuvan D-nappulan (js/pallolauta/siirto.js) kesken,
 * jotta hahmo on sama molemmissa.
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
 */
export function kohdeElementti(kohde) {
  const el = document.createElement('div');
  el.className = 'pallolauta-kohde';
  el.dataset.kohde = kohde.key;
  const px = kohde.city ? KOHDEMERKIN_PX : KOHDEMERKIN_PISTE_PX;
  const r = px / 2;
  // Nimi mahtuu leveyssuunnassa: svg on merkkiä leveämpi, keskipiste
  // origossa, jotta translate(-50%, -50%) osuu pallon pisteeseen.
  const w = 160;
  const h = 2 * (r * KOHDEMERKIN_HALO_LAAJIN + KOHDEMERKIN_NIMI_RAKO_PX + KOHDEMERKIN_NIMI_PX + 4);
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
  // Halo ENSIN, jotta se jää pisteen alle (sama järjestys kuin kartalla).
  ympyra(kohde.city ? 'target-halo fokus' : 'target-halo fokus far');
  ympyra(kohde.city ? 'target-piste' : 'target-piste far');
  if (kohde.city) {
    const nimi = document.createElementNS(SVG, 'text');
    nimi.setAttribute('x', '0');
    // Nimi HALON yläpuolelle, ei renkaan (ks. paivitaFokusKohdeMitat).
    nimi.setAttribute('y', String(-(r * KOHDEMERKIN_HALO_LAAJIN + KOHDEMERKIN_NIMI_RAKO_PX)));
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
 * Merkkikerros pallolle. `asteet(kohta)` kääntää laudan (x, y) asteiksi
 * ({ lat, lon }). Palauttaa `paivita({ nappula, kohteet })` ja luettelot
 * osumatestiä varten.
 */
export function luoMerkit({ pallo, ui, siirtyma, asteet }) {
  let data = new Map(); // avain → pysyvä datum
  let kohteet = [];

  pallo
    .htmlElementsData([])
    .htmlLat('lat').htmlLng('lng')
    .htmlAltitude(MERKIN_KORKEUS)
    .htmlElement((d) => (d.laji === 'nappula' ? nappulaElementti(ui) : kohdeElementti(d)))
    .htmlTransitionDuration(siirtyma);
  // Merkit pallon takana piiloon (CSS2D ei itse leikkaa horisonttiin).
  pallo.htmlElementVisibilityModifier?.((el, nakyy) => { el.style.opacity = nakyy ? '1' : '0'; });

  /**
   * Merkit pelitilasta. `nappula` on laudan kohta { x, y } tai null
   * (nappula liikkeessä tai ei laudalla); `kohteet` on lista
   * { key, x, y, city }. Sama datum säilyy, kun avain säilyy.
   */
  const paivita = ({ nappula = null, kohteet: uudet = [] }) => {
    const seuraava = new Map();
    const lista = [];
    const ota = (avain, tiedot) => {
      let d = data.get(avain);
      if (d) Object.assign(d, tiedot);
      else d = { avain, ...tiedot };
      seuraava.set(avain, d);
      lista.push(d);
    };
    // Kohteet ennen nappulaa: nappula piirtyy päällimmäiseksi.
    for (const k of uudet) {
      const a = asteet(k);
      if (!a) continue;
      ota(`kohde:${k.key}`, {
        laji: 'kohde', key: k.key, city: k.city ?? null, x: k.x, y: k.y, lat: a.lat, lng: a.lon,
      });
    }
    if (nappula) {
      const a = asteet(nappula);
      if (a) ota('nappula', { laji: 'nappula', x: nappula.x, y: nappula.y, lat: a.lat, lng: a.lon });
    }
    data = seuraava;
    kohteet = lista.filter((d) => d.laji === 'kohde');
    pallo.htmlElementsData(lista);
  };

  return {
    paivita,
    /** Näkyvät kohteet osumatestiä varten ({ key, lat, lng, city }). */
    kohteet: () => kohteet,
  };
}
