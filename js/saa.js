/*
 * Sää lehden etusivulle (omistajan toive 5.8.2026).
 *
 * Kaksi tehtävää:
 *  1. haeSaaTanaan(lat, lon) — päivän ennuste Open-Meteosta.
 *     Avaimeton ja CORS-avoin palvelu; vastaus muistetaan tunnin,
 *     ettei jokainen kortin avaus hae uudestaan. Virhe palauttaa
 *     null — kutsuja näyttää silloin kuukausinormaalin, joka on
 *     staattista dataa ja toimii ilman verkkoa.
 *  2. piirraVuosiSaa(tiedot) — koko vuoden graafi pelin mustekynän
 *     tyylillä: sadepalkit ja keskilämpökäyrä samassa kuvassa,
 *     kuukaudet alareunassa. Palautetaan SVG-elementti, jonka
 *     kutsuja sijoittaa haluamaansa koteloon.
 */

const ENNUSTE_OSOITE = 'https://api.open-meteo.com/v1/forecast';
// Tunti on hyvä tasapaino: ennuste ei vanhene kesken pelisession,
// mutta illalla avattu lehti ei näytä aamun lukemia.
const VALIMUISTI_MS = 60 * 60 * 1000;

/** WMO-koodit suomeksi ja kuvakeryhmäksi (aurinko/pilvi/sade/lumi...). */
const SAAKOODIT = [
  [[0], 'selkeää', 'aurinko'],
  [[1], 'melkein selkeää', 'aurinko'],
  [[2], 'puolipilvistä', 'pilvi'],
  [[3], 'pilvistä', 'pilvi'],
  [[45, 48], 'sumua', 'sumu'],
  [[51, 53, 55, 56, 57], 'tihkusadetta', 'sade'],
  [[61, 63, 65, 66, 67], 'sadetta', 'sade'],
  [[71, 73, 75, 77], 'lumisadetta', 'lumi'],
  [[80, 81, 82], 'sadekuuroja', 'sade'],
  [[85, 86], 'lumikuuroja', 'lumi'],
  [[95, 96, 99], 'ukkosta', 'ukkonen'],
];

export function saaKuvaus(koodi) {
  const rivi = SAAKOODIT.find(([koodit]) => koodit.includes(koodi));
  return rivi ? { teksti: rivi[1], kuvake: rivi[2] } : { teksti: '', kuvake: 'pilvi' };
}

/** Pienet viivakuvakkeet (24×24, pelkkä ääriviiva) särivin alkuun. */
export const SAA_IKONIT = {
  aurinko: '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8"/>',
  pilvi: '<path d="M7 17.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 17.5Z"/>',
  sade: '<path d="M7 14.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 14.5Z"/><path d="M8.5 17.2l-1 2.6M12.4 17.2l-1 2.6M16.3 17.2l-1 2.6"/>',
  lumi: '<path d="M7 14.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 14.5Z"/><path d="M8.4 18.2h.01M12.2 19.6h.01M15.9 18.2h.01" stroke-linecap="round" stroke-width="2.2"/>',
  sumu: '<path d="M4.5 9.5h15M3.5 13h17M5.5 16.5h13"/>',
  ukkonen: '<path d="M7 13.5h9.6a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.8-1.1A3.9 3.9 0 0 0 7 13.5Z"/><path d="M12.8 15.5 10.6 19h2.6l-1.8 3"/>',
};

const KUUKAUDET_SSA = [
  'tammikuussa', 'helmikuussa', 'maaliskuussa', 'huhtikuussa',
  'toukokuussa', 'kesäkuussa', 'heinäkuussa', 'elokuussa',
  'syyskuussa', 'lokakuussa', 'marraskuussa', 'joulukuussa',
];

export function kuukausiSsa(indeksi) {
  return KUUKAUDET_SSA[indeksi] ?? '';
}

/*
 * Muisti elää sivun ajan; localStorage säilyttäisi pidempään, mutta
 * tunnin ikkunassa siitä ei ole hyötyä ja tallennustila on pelin
 * tallennuksille.
 */
const valimuisti = new Map();

/**
 * Päivän ennuste: { lampotila, ylin, alin, sademaara, koodi } tai null.
 */
export async function haeSaaTanaan(lat, lon) {
  const avain = `${lat},${lon}`;
  const vanha = valimuisti.get(avain);
  if (vanha && Date.now() - vanha.aika < VALIMUISTI_MS) return vanha.saa;
  try {
    const osoite = `${ENNUSTE_OSOITE}?latitude=${lat}&longitude=${lon}`
      + '&current=temperature_2m,weather_code'
      + '&daily=temperature_2m_max,temperature_2m_min,precipitation_sum'
      + '&timezone=auto&forecast_days=1';
    const vastaus = await fetch(osoite, { signal: AbortSignal.timeout(8000) });
    if (!vastaus.ok) return null;
    const data = await vastaus.json();
    const saa = {
      lampotila: Math.round(data.current?.temperature_2m ?? NaN),
      koodi: data.current?.weather_code ?? null,
      ylin: Math.round(data.daily?.temperature_2m_max?.[0] ?? NaN),
      alin: Math.round(data.daily?.temperature_2m_min?.[0] ?? NaN),
      sademaara: data.daily?.precipitation_sum?.[0] ?? null,
    };
    if (!Number.isFinite(saa.lampotila)) return null;
    valimuisti.set(avain, { aika: Date.now(), saa });
    return saa;
  } catch {
    return null;
  }
}

/**
 * Koko vuoden graafi: sadepalkit (sateensininen) ja keskilämpökäyrä
 * (kulta, pehmeästi kaartuva) päällekkäin. Asteikot molemmin puolin,
 * kuukausien alkukirjaimet alhaalla. Mitoitus on kiinteä viewBox —
 * SVG skaalautuu koteloonsa, ja tekstikoot on valittu sen mukaan.
 *
 * ELÄVÖITYS (omistajan tilaus 13.8.2026): käyrä on kulmikkaan
 * murtoviivan sijaan pehmeä (Catmull–Rom → bezier), sen alla on
 * haalea kultaliuku, lämpimin ja kylmin kuukausi saavat lukemansa
 * käyrälle ja sateisin kuukausi palkkinsa päälle, kuluva kuukausi
 * korostuu haalealla kaistalla ja lihavoidulla kirjaimella — ja
 * avautuessaan palkit kasvavat ja käyrä piirtyy (CSS-animaatiot,
 * liikeherkkyys sammuttaa ne tyylin puolella).
 */
export function piirraVuosiSaa({ keskilampo, sade }) {
  const NS = 'http://www.w3.org/2000/svg';
  const L = 300; const K = 176;
  const vasen = 30; const oikea = 268; const yla = 20; const ala = 146;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${L} ${K}`);
  svg.setAttribute('class', 'vuosisaa');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Keskilämpötila ja sademäärä kuukausittain');
  const el = (nimi, attrs, teksti = null) => {
    const e = document.createElementNS(NS, nimi);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    if (teksti != null) e.textContent = teksti;
    svg.appendChild(e);
    return e;
  };

  // Asteikot: lämpö pyöristetään viiden, sade viidenkymmenen tarkkuuteen.
  const lampoYla = Math.max(10, Math.ceil(Math.max(...keskilampo) / 5) * 5);
  const lampoAla = Math.min(0, Math.floor(Math.min(...keskilampo) / 5) * 5);
  const sadeYla = Math.max(50, Math.ceil(Math.max(...sade) / 50) * 50);
  const lampoY = (aste) => ala - ((aste - lampoAla) / (lampoYla - lampoAla)) * (ala - yla);
  const sadeY = (mm) => ala - (mm / sadeYla) * (ala - yla);
  const askel = (oikea - vasen) / 12;
  const keskiX = (i) => vasen + i * askel + askel / 2;

  /*
   * Käyrän alle jäävä kultaliuku tarvitsee liukuvärin <defs>iin.
   * Tunniste on kiinteä: graafi on ruudulla vain yksi kerrallaan.
   */
  const defs = el('defs', {});
  const liuku = document.createElementNS(NS, 'linearGradient');
  liuku.setAttribute('id', 'vuosisaa-liuku');
  liuku.setAttribute('x1', '0'); liuku.setAttribute('y1', '0');
  liuku.setAttribute('x2', '0'); liuku.setAttribute('y2', '1');
  const pysakki = (offset, vari) => {
    const p = document.createElementNS(NS, 'stop');
    p.setAttribute('offset', offset);
    p.setAttribute('stop-color', vari);
    liuku.appendChild(p);
  };
  pysakki('0%', 'rgba(164, 105, 28, 0.22)');
  pysakki('100%', 'rgba(164, 105, 28, 0)');
  defs.appendChild(liuku);

  // Kuluvan kuukauden haalea kaista taustimmaksi.
  const kuluva = new Date().getMonth();
  el('rect', {
    class: 'saa-kuluva-kaista',
    x: (vasen + kuluva * askel).toFixed(1),
    y: yla - 6,
    width: askel.toFixed(1),
    height: (ala - yla + 6).toFixed(1),
    rx: 2,
  });

  // Sadepalkit ennen käyrää, jotta käyrä piirtyy niiden päälle.
  // Kasvuanimaation porrastus kulkee kuukausijärjestyksessä.
  sade.forEach((mm, i) => {
    const palkki = el('rect', {
      class: 'saa-palkki',
      x: (vasen + i * askel + askel * 0.18).toFixed(1),
      y: sadeY(mm).toFixed(1),
      width: (askel * 0.64).toFixed(1),
      height: Math.max(0, ala - sadeY(mm)).toFixed(1),
      rx: 1.4,
    });
    palkki.style.animationDelay = `${i * 45}ms`;
  });

  // Apuviivat ja lämpöasteikko vasemmalle.
  for (let aste = lampoAla; aste <= lampoYla; aste += 10) {
    el('line', {
      class: 'saa-apuviiva', x1: vasen, y1: lampoY(aste), x2: oikea, y2: lampoY(aste),
    });
    el('text', { class: 'saa-akseli', x: vasen - 4, y: lampoY(aste) + 3, 'text-anchor': 'end' }, `${aste}°`);
  }
  // Sadeasteikko oikealle: nolla on jo lämpöasteikossa, joten vain
  // puoliväli ja yläraja.
  for (const mm of [sadeYla / 2, sadeYla]) {
    el('text', { class: 'saa-akseli', x: oikea + 4, y: sadeY(mm) + 3 }, `${mm}`);
  }
  el('text', { class: 'saa-akseli', x: oikea + 4, y: ala + 3 }, 'mm');

  /*
   * Keskilämpökäyrä pehmeänä: Catmull–Rom-pisteistä bezier-segmentit.
   * Sama polku kahdesti — ensin liukuväritäyttönä pohjaviivaan
   * suljettuna, sitten itse viivana, jotta täyttö ei muuta viivan
   * piirtoanimaatiota.
   */
  const pts = keskilampo.map((aste, i) => [keskiX(i), lampoY(aste)]);
  let polku = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    polku += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  el('path', {
    class: 'saa-alue',
    d: `${polku} L ${pts[11][0].toFixed(1)} ${ala} L ${pts[0][0].toFixed(1)} ${ala} Z`,
  });
  el('path', { class: 'saa-viiva', d: polku, pathLength: 1 });
  keskilampo.forEach((aste, i) => {
    const piste = el('circle', {
      class: 'saa-piste',
      cx: keskiX(i).toFixed(1),
      cy: lampoY(aste).toFixed(1),
      r: 2.1,
    });
    piste.style.animationDelay = `${250 + i * 70}ms`;
  });

  /*
   * Ääripäiden lukemat käyrälle: lämpimin ja kylmin kuukausi kertovat
   * arvonsa ilman että asteikkoa tarvitsee lukea. Sateisin kuukausi
   * saa millimetrinsä palkin päälle. Halo (paint-order CSS:ssä) pitää
   * luvut luettavina palkkien ja apuviivojen päällä.
   */
  const maxI = keskilampo.indexOf(Math.max(...keskilampo));
  const minI = keskilampo.indexOf(Math.min(...keskilampo));
  el('text', {
    class: 'saa-arvo',
    x: keskiX(maxI).toFixed(1),
    y: (lampoY(keskilampo[maxI]) - 6).toFixed(1),
    'text-anchor': 'middle',
  }, `${Math.round(keskilampo[maxI])}°`);
  el('text', {
    class: 'saa-arvo',
    x: keskiX(minI).toFixed(1),
    y: (lampoY(keskilampo[minI]) - 6).toFixed(1),
    'text-anchor': 'middle',
  }, `${Math.round(keskilampo[minI])}°`);
  const sadeI = sade.indexOf(Math.max(...sade));
  if (sade[sadeI] > 0 && sadeI !== maxI && sadeI !== minI) {
    el('text', {
      class: 'saa-arvo saa-arvo-sade',
      x: keskiX(sadeI).toFixed(1),
      y: (sadeY(sade[sadeI]) - 3).toFixed(1),
      'text-anchor': 'middle',
    }, `${Math.round(sade[sadeI])}`);
  }

  // Kuukausien alkukirjaimet; kuluva kuukausi korostuu.
  'THMHTKHESLMJ'.split('').forEach((kirjain, i) => {
    el('text', {
      class: i === kuluva ? 'saa-akseli saa-kuluva' : 'saa-akseli',
      x: keskiX(i).toFixed(1),
      y: ala + 12,
      'text-anchor': 'middle',
    }, kirjain);
  });
  el('line', { class: 'saa-pohjaviiva', x1: vasen, y1: ala, x2: oikea, y2: ala });
  return svg;
}
