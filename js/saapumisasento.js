/*
 * SAAPUMISASENTO — MISSÄ KAUPUNKI JA LUENTAKUVA OVAT RUUDULLA, KUN
 * UUTEEN KAUPUNKIIN TULLAAN.
 *
 * Omistaja 9.9.2026 klo 16.10 (Raamattu, SAAPUMISESSA KAMERA ASETTUU
 * NIIN, ETTA KAUPUNKI ON ALIMMASSA KOLMANNEKSESSA JA LUENTAKUVA SEN
 * YLAPUOLELLA HIEMAN OIKEALLA, sanatarkasti): *"kun tullaan uuteen
 * kaupunkiin, kamera saisi asettua niin että kaupunki jää alimpaan
 * kolmannekseen ja kuva tulee sen yläpuolelle ja vähän oikealle, niin
 * että se ei jää matkakirjan tekstin peittoon varsinkin pienillä
 * näytöillä"*.
 *
 * ── MIKSI OMA MODUULI ─────────────────────────────────────────────
 *
 * Sama asento tarvitaan KOLMESSA paikassa, jotka eivät saa ajautua
 * erilleen: pallolaudan kamera (js/pallolauta/kamera.js), tasokartan
 * kamera (js/kartta.js — nukkuu, VANHA_KARTTA_KAYTOSSA false) ja
 * kartan päälle nouseva luentakuva (js/fokusvirta.js). Kaava on siis
 * TÄSSÄ kerran, puhtaina funktioina ilman DOMia ja ilman lautaa —
 * kumpikin lauta soveltaa sitä omissa yksiköissään.
 *
 * ── KAMERA: OSUUS RUUDUSTA, EI PIKSELEITÄ ─────────────────────────
 *
 * Kaupungin piste halutaan kohtaan (0,42 · leveys, 0,78 · korkeus) eli
 * alimpaan kolmannekseen ja hitusen keskeltä vasemmalle. Kamera
 * keskittää AINA näkymän keskipisteen, joten asento toteutetaan
 * KOHDISTUSPISTEEN SIIRTONA: kamera katsoo pistettä, joka on kaupungin
 * pohjois-/itäpuolella juuri sen verran, että kaupunki asettuu
 * pyydettyyn kohtaan. Laudan pisteitä EI liikuteta.
 *
 * Poikkeama annetaan OSUUKSINA näkymästä (saapumisenPoikkeama), koska
 * lautojen yksiköt ovat eri: tasokartalla siirto on lautayksiköitä
 * (linaarinen ruudulla), pallolla asteita (kameran korkeus ja
 * kuvasuhde määräävät näkyvän kaaren). Sama osuus, kaksi soveltamista.
 *
 * PELAAJAN OMA ELE EI VEDÄ TAKAISIN: siirto lasketaan vain
 * saapumisajon kohdetta rakennettaessa, eikä mikään kehyssilmukka
 * korjaa kameraa jälkikäteen. Panorointi ja zoomi jäävät voimaan
 * sellaisinaan.
 *
 * ── LUENTAKUVA: KAUPUNGIN YLLE, HIEMAN OIKEALLE ───────────────────
 *
 * Kuvan ALAREUNA jää kaupungin pisteen yläpuolelle ja kuvan keskilinja
 * pisteestä oikealle (LUENTAKUVAN_SIVUSIIRTO · näkymän leveys). Kuva ei
 * saa mennä matkakirjakortin päälle EIKÄ ALLE: kortin suorakulmio
 * annetaan mittana, ja jos kuva ei mahdu sen viereen tai alle, KUVAA
 * PIENENNETÄÄN — tekstiä ei peitetä. Tämä on koko tilauksen ydin
 * ("varsinkin pienillä näytöillä").
 */

/* ==================== KAMERAN SAAPUMISASENTO ==================== */

/**
 * KAUPUNGIN PAIKKA RUUDULLA SAAPUMISESSA, osuuksina näkymän leveydestä
 * ja korkeudesta.
 *
 * y = 0,78 on alimman kolmanneksen puolivälin alapuoli: kolmannes alkaa
 * 0,667:stä, ja 0,78 jättää pisteen alle vielä viidenneksen ruutua eli
 * tilaa kaupungin nimelle, Etsi aarre -napille ja pulun kuplalle.
 * x = 0,42 on "hieman vasemmalla keskeltä": luentakuva nousee oikealle,
 * joten kaupunki väistyy sen alta vasemmalle.
 */
export const SAAPUMISEN_KAUPUNKI = Object.freeze({ x: 0.42, y: 0.78 });

/**
 * Kaupungin poikkeama näkymän KESKIPISTEESTÄ osuuksina.
 *
 * Positiivinen x = oikealle, positiivinen y = alas. Saapumisasennossa
 * { x: −0,08, y: +0,28 }.
 *
 * @param {{x: number, y: number}} [osuus] kaupungin paikka ruudulla
 * @returns {{x: number, y: number}} poikkeama keskeltä
 */
export function saapumisenPoikkeama(osuus = SAAPUMISEN_KAUPUNKI) {
  return { x: (osuus.x ?? 0.5) - 0.5, y: (osuus.y ?? 0.5) - 0.5 };
}

/**
 * KAMERAN KOHDISTUSPISTE TASOLAUDALLA (lautayksiköitä).
 *
 * Kaupunki on pisteessä (x, y); kamera katsoo pistettä, joka on siitä
 * poikkeaman verran vastakkaiseen suuntaan. Näkyvä korkeus lasketaan
 * leveydestä ruudun kuvasuhteella, joten sama kaava kelpaa
 * puhelimelle ja työpöydälle.
 *
 * @param {object} kohde
 * @param {number} kohde.x kaupungin x lautayksiköissä
 * @param {number} kohde.y kaupungin y lautayksiköissä
 * @param {number} kohde.leveys näkyvä leveys lautayksiköissä
 * @param {number} kohde.paneW karttapaneelin leveys pikseleinä
 * @param {number} kohde.paneH karttapaneelin korkeus pikseleinä
 * @param {{x: number, y: number}} [kohde.osuus] kaupungin paikka ruudulla
 * @returns {{x: number, y: number}|null} kameran keskipiste laudalla
 */
export function saapumisenKameranKohta({
  x, y, leveys, paneW, paneH, osuus = SAAPUMISEN_KAUPUNKI,
} = {}) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  if (!(leveys > 0) || !(paneW > 0) || !(paneH > 0)) return { x, y };
  const poikkeama = saapumisenPoikkeama(osuus);
  const korkeus = leveys * (paneH / paneW);
  return { x: x - poikkeama.x * leveys, y: y - poikkeama.y * korkeus };
}

/**
 * KAMERAN KOHDISTUSPISTE PALLOLLA (asteita).
 *
 * Pallolla näkymä on kulmamitta: `leveysAst` on ruudun leveydellä
 * näkyvä KAARI asteina (js/pallolauta/kamera.js asteetLeveydesta), ja
 * pystysuunnassa sama kaari kerrottuna ruudun kuvasuhteella. Pituusaste
 * on kaarta ahtaampi napoja kohti, joten sivusiirto jaetaan
 * kosinilla — muuten kuva liukuisi Lontoossa liian vähän.
 *
 * @param {object} kohde
 * @param {number} kohde.lat kaupungin leveysaste
 * @param {number} kohde.lng kaupungin pituusaste
 * @param {number} kohde.leveysAst näkyvä kaari asteina ruudun leveydellä
 * @param {number} kohde.paneW karttapaneelin leveys pikseleinä
 * @param {number} kohde.paneH karttapaneelin korkeus pikseleinä
 * @param {{x: number, y: number}} [kohde.osuus] kaupungin paikka ruudulla
 * @returns {{lat: number, lng: number}} kameran katsomispiste asteina
 */
export function saapumisenPallonKohta({
  lat, lng, leveysAst, paneW, paneH, osuus = SAAPUMISEN_KAUPUNKI,
} = {}) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (!(leveysAst > 0) || !(paneW > 0) || !(paneH > 0)) return { lat, lng };
  const poikkeama = saapumisenPoikkeama(osuus);
  const korkeusAst = leveysAst * (paneH / paneW);
  // Ruudun ALASPÄIN on etelään, joten kaupungin siirto alaspäin nostaa
  // KAMERAN leveysastetta — vastakkainen etumerkki kuin tasolaudan
  // y-akselilla, joka kasvaa alaspäin.
  const uusiLat = Math.max(-89.5, Math.min(89.5, lat + poikkeama.y * korkeusAst));
  // Napojen lähellä kosini menee nollaan; kerroin katkaistaan, jottei
  // siirto räjähdä äärettömäksi (sama vartio kuin mittajanalla).
  const kavennys = Math.max(0.2, Math.cos((uusiLat * Math.PI) / 180));
  return { lat: uusiLat, lng: lng - (poikkeama.x * leveysAst) / kavennys };
}

/* ==================== LUENTAKUVAN SIJAINTI ==================== */

/**
 * Kuvan keskilinjan siirto kaupungin pisteestä OIKEALLE, osuutena
 * näkymän leveydestä (omistaja: *"vähän oikealle"*, tilaus 10–20 %).
 */
export const LUENTAKUVAN_SIVUSIIRTO = 0.15;

/**
 * KUVA NOUSEE LAATAN YLÄPUOLELLE, EI SEN VIEREEN (omistaja 10.9.2026,
 * työpöytäkaappaus Marseillesta, sanatarkasti: *"kuva saisi tulla
 * ylemmäs, ei näin kiinni kaupungin laattaa"*).
 *
 * Kaupungin piste on LAATAN KESKIPISTE: laatta (js/ui.js city-ellipsi
 * kehineen) ulottuu siitä ylöskin, ja kaappauksessa kuvatekstilappu
 * lepäsi suoraan sen päällä. Alareunan väli lasketaan siksi kahdesta
 * osasta — laatan oma korkeus ja sen päälle jäävä ilmarako — eikä
 * yhdestä luvusta, jotta laatan koon muuttuessa väli muuttuu mukana.
 */
export const KAUPUNGIN_LAATTA_PX = 34;

/** Kuvan alareunan ilmarako laatan yläpuolelle pikseleinä. */
export const LUENTAKUVAN_VALI_PX = 12;

/** Reunusta, jota kuva ei ylitä missään suunnassa. */
export const LUENTAKUVAN_MARGINAALI_PX = 12;

/**
 * Pienin leveys, johon kuva vielä kutistetaan ennen kuin se saa
 * painua alemmas. Tätä pienempi kuva ei enää näyttäisi miltään.
 */
export const LUENTAKUVAN_VAHIN_PX = 96;

/** Paneelin korkeus / leveys, kun kuvan omaa mittasuhdetta ei tiedetä. */
export const LUENTAKUVAN_KUVASUHDE = 0.72;

/**
 * Luentakuvan TOIVOTTU leveys pikseleinä — sama porras kuin
 * css/fokusvirta.css:n `--luentakuva-leveys`, mutta laskettuna, koska
 * ankkuroitu kuva mitoitetaan js:stä (kortin alle mahtuminen).
 *
 * @param {number} paneW karttapaneelin leveys
 * @param {number} [ruudunLeveys] ikkunan leveys (css-media-ehto)
 * @returns {number} leveys pikseleinä
 */
export function luentakuvanPerusleveys(paneW, ruudunLeveys = paneW) {
  if (!(paneW > 0)) return 0;
  return ruudunLeveys >= 900
    ? Math.min(paneW * 0.38, 640)
    : Math.min(paneW * 0.8, 352);
}

/** Laatikko { x, y, w, h } sijainnista (ankkuri on ALAREUNAN keskellä). */
export function luentakuvanLaatikko(sijainti) {
  if (!sijainti) return null;
  return {
    x: sijainti.x - sijainti.leveys / 2,
    y: sijainti.y - sijainti.korkeus,
    w: sijainti.leveys,
    h: sijainti.korkeus,
  };
}

/** Osuvatko kaksi laatikkoa toisiinsa (marginaali mukaan luettuna). */
export function laatikotOsuvat(a, b, marginaali = 0) {
  if (!a || !b) return false;
  return a.x < b.x + b.w + marginaali
    && a.x + a.w > b.x - marginaali
    && a.y < b.y + b.h + marginaali
    && a.y + a.h > b.y - marginaali;
}

/**
 * LUENTAKUVAN PAIKKA JA KOKO KARTTAPINNALLA.
 *
 * Palauttaa ANKKURIN eli paneelin ALAREUNAN KESKIPISTEEN (x, y)
 * karttapinnan pikseleinä sekä paneelin mitat. Alareuna siksi, että
 * kartan liike kutistaa kuvan juuri sitä kohti (css transform-origin:
 * bottom center) — pieni kuva jää siihen kartan kohtaan, josta iso
 * lähti.
 *
 * KOLME YRITYSTÄ, TÄSSÄ JÄRJESTYKSESSÄ:
 *   1. Toivottu paikka: kaupungin yläpuolella, keskilinja oikealla.
 *   2. Jos kortti on tiellä: sama korkeus, mutta kortin OIKEALLE
 *      puolelle (työpöydällä kortti on kapea ja kartta jatkuu sen
 *      vierestä).
 *   3. Muuten kortin ali tai yli — kumpi kaista antaa isomman kuvan.
 *      Kuva kutistuu; jos se ei mahdu vähimmäiskoossakaan, se painuu
 *      alemmas kaupungin päälle. KORTIN TEKSTIÄ EI PEITETÄ.
 *
 * @param {object} p
 * @param {number} p.paneW karttapaneelin leveys
 * @param {number} p.paneH karttapaneelin korkeus
 * @param {{x: number, y: number}} p.kaupunki kaupungin piste pinnalla
 * @param {{x: number, y: number, w: number, h: number}|null} [p.kortti]
 *   matkakirjakortin suorakulmio samassa koordinaatistossa
 * @param {number} [p.perusleveys] toivottu leveys (luentakuvanPerusleveys)
 * @param {number} [p.kuvasuhde] paneelin korkeus / leveys
 * @param {number} [p.marginaali] reunavara
 * @param {number} [p.vali] ilmarako laatan yläreunan ja kuvan väliin
 * @param {number} [p.laatta] kaupungin laatan korkeus ruudulla; kuvan
 *   alareuna jää tämän ja `vali`:n verran kaupungin pisteen yläpuolelle
 * @param {number} [p.sivusiirto] keskilinjan siirto oikealle (osuus)
 * @param {number} [p.vahinLeveys] pienin leveys ennen alas painumista
 * @param {number} [p.lisakorkeus] kuvan alle jäävä kiinteä osa (lyhyen
 *   kuvatekstin laatikko) — se ei kasva leveyden mukana, joten se
 *   vähennetään korkeusbudjetista ennen leveyden ratkaisua
 * @param {number} [p.kallistus] kuvan kierto asteina: kallistettu
 *   laatikko ulottuu alakulmastaan alemmas kuin suora, ja ilman tätä
 *   kulma laskeutuisi kaupungin nimen päälle
 * @returns {{x, y, leveys, korkeus, mahtuu, katto}} ankkuri (alareunan
 *   keskipiste), paneelin leveys ja KOKO korkeus (kuva + kuvateksti)
 */
export function luentakuvanSijainti({
  paneW, paneH, kaupunki, kortti = null,
  perusleveys, kuvasuhde = LUENTAKUVAN_KUVASUHDE,
  marginaali = LUENTAKUVAN_MARGINAALI_PX,
  vali = LUENTAKUVAN_VALI_PX,
  laatta = KAUPUNGIN_LAATTA_PX,
  sivusiirto = LUENTAKUVAN_SIVUSIIRTO,
  vahinLeveys = LUENTAKUVAN_VAHIN_PX,
  lisakorkeus = 0,
  kallistus = 0,
} = {}) {
  const W = Math.max(1, paneW || 0);
  const H = Math.max(1, paneH || 0);
  const suhde = kuvasuhde > 0 ? kuvasuhde : LUENTAKUVAN_KUVASUHDE;
  const toivottu = perusleveys > 0 ? perusleveys : luentakuvanPerusleveys(W, W);
  const kx = Number.isFinite(kaupunki?.x) ? kaupunki.x : W / 2;
  const ky = Number.isFinite(kaupunki?.y) ? kaupunki.y : H * SAAPUMISEN_KAUPUNKI.y;
  // Kuvan alareuna kaupungin LAATAN yläpuolelle (ks. KAUPUNGIN_LAATTA_PX).
  const pohja = Math.min(H - marginaali, ky - Math.max(0, laatta || 0) - vali);
  const toivottuX = kx + sivusiirto * W;
  const leveysKatto = Math.min(toivottu, W - 2 * marginaali);
  const vahin = Math.min(vahinLeveys, leveysKatto);

  const lisa = Math.max(0, lisakorkeus || 0);
  /*
   * KALLISTUKSEN VARA. Kierretty laatikko ulottuu alakulmastaan
   * `leveys · sin(kulma) / 2` alemmas ja ylemmäs kuin suora, eli
   * yhteensä `leveys · sin(kulma)` pystysuunnassa. Ilman tätä kuvan
   * alakulma laskeutui kaupungin nimen päälle (mitattu Chromiumilla
   * 9.9.2026: 600 px leveä kuva, kierto −2,2° → 11 px).
   */
  const kulma = Math.abs(Math.sin(((kallistus || 0) * Math.PI) / 180));

  /** Yksi ehdokas: kaista `katto`…`ala`, keskilinja `keskiX`. */
  const sovita = (katto, ala, keskiX) => {
    const vara = Math.max(0, ala - katto);
    let leveys = Math.max(vahin, Math.min(leveysKatto, (vara - lisa) / (suhde + kulma)));
    if (!(leveys > 0)) leveys = vahin;
    const korkeus = leveys * suhde + lisa;
    const kulmavara = (leveys * kulma) / 2;
    const puoli = leveys / 2;
    const minX = Math.min(puoli + marginaali, W / 2);
    const maxX = Math.max(W - puoli - marginaali, W / 2);
    const x = Math.min(maxX, Math.max(minX, keskiX));
    const mahtuu = korkeus + 2 * kulmavara <= vara + 0.5;
    // Jos kaista on liian matala vähimmäiskuvallekin, kuva painuu
    // alemmas — se saa mennä kaupungin päälle, ei kortin.
    const y = mahtuu
      ? ala - kulmavara
      : Math.min(H - marginaali, katto + korkeus + kulmavara);
    return { x, y, leveys, korkeus, mahtuu, katto };
  };

  const vapaa = sovita(marginaali, pohja, toivottuX);
  const kortinLaatikko = kortti && kortti.w > 0 && kortti.h > 0 ? kortti : null;
  if (!kortinLaatikko) return vapaa;
  if (!laatikotOsuvat(luentakuvanLaatikko(vapaa), kortinLaatikko, marginaali)) return vapaa;

  // 2. Kortin oikealle puolelle samaan korkeuteen.
  const oikealle = sovita(marginaali, pohja,
    Math.max(toivottuX, kortinLaatikko.x + kortinLaatikko.w + marginaali + vapaa.leveys / 2));
  if (!laatikotOsuvat(luentakuvanLaatikko(oikealle), kortinLaatikko, marginaali)) return oikealle;

  // 3. Kortin ali tai yli — kumpi kaista antaa isomman kuvan.
  const alle = sovita(kortinLaatikko.y + kortinLaatikko.h + marginaali, pohja, toivottuX);
  const ylle = sovita(marginaali, Math.min(pohja, kortinLaatikko.y - marginaali), toivottuX);
  return ylle.leveys > alle.leveys + 0.5 ? ylle : alle;
}

/* ==================== ANKKURI KARTAN KOHTAAN ==================== */

/*
 * LUENTAKUVAA VOI ITSE LIIKUTTAA, JA SE ON ANKKUROITU KARTAN KOHTAAN
 * (omistaja 9.9.2026 klo 16.15, sanatarkasti: *"kuvaa pitää myös voida
 * itse liikuttaa ja se saisi jäädä paikalleen sen kohdan päälle karttaa
 * missä se on jos karttaa liikutetaan"*).
 *
 * Kuvan paikka EI ole ruutupiste vaan LAUDAN piste: kartan panorointi
 * ja zoomi siirtävät kuvaa kartan mukana, ja raahaus vaihtaa ankkurin
 * uuteen kartan kohtaan. Muunnos on sama kaava kuin Etsi aarre
 * -napilla ja pulun paikkamerkillä (js/etsi-aarre-nappi.js
 * ruutupaikka), tässä molempiin suuntiin ja ilman DOMia.
 *
 *     ruutuX = paneW/2 + (lautaX − keskus.x) · skaala
 *
 * `jakso` on kiertävän laudan leveys: maailmankartta toistuu, ja
 * ankkuri kuuluu siihen kopioon, joka on lähinnä näkymän keskipistettä.
 */

/** Näkyvän alueen keskipiste ja mittakaava (ui.nakyvaAlue → keskus). */
export function nakymanKeskus(alue) {
  if (!alue || !(alue.w > 0) || !(alue.skaala > 0)) return null;
  if (!Number.isFinite(alue.x) || !Number.isFinite(alue.y)) return null;
  return { x: alue.x + alue.w / 2, y: alue.y + alue.h / 2, skaala: alue.skaala };
}

/** Laudan piste → karttapinnan pikselit. */
export function laudaltaRuudulle(piste, alue, paneW, paneH, jakso = 0) {
  const keskus = nakymanKeskus(alue);
  if (!keskus || !Number.isFinite(piste?.x) || !Number.isFinite(piste?.y)) return null;
  let dx = piste.x - keskus.x;
  if (jakso > 0) dx -= Math.round(dx / jakso) * jakso;
  return {
    x: paneW / 2 + dx * keskus.skaala,
    y: paneH / 2 + (piste.y - keskus.y) * keskus.skaala,
  };
}

/** Karttapinnan pikselit → laudan piste (laudaltaRuudulle käänteisenä). */
export function ruudultaLaudalle(piste, alue, paneW, paneH) {
  const keskus = nakymanKeskus(alue);
  if (!keskus || !Number.isFinite(piste?.x) || !Number.isFinite(piste?.y)) return null;
  return {
    x: keskus.x + (piste.x - paneW / 2) / keskus.skaala,
    y: keskus.y + (piste.y - paneH / 2) / keskus.skaala,
  };
}

/**
 * RAAHAUS: napautus vai siirto?
 *
 * Sormi liikkuu napautuksessakin muutaman pikselin, ja kosketuslaite
 * liikkuu enemmän kuin hiiri. Kynnyksen alle jäävä ele on napautus
 * (suurennos aukeaa), sen ylittävä on raahaus (ankkuri vaihtuu).
 */
export const RAAHAUKSEN_KYNNYS_PX = 6;

/** Ylittikö ele raahauskynnyksen? */
export function onRaahaus(dx, dy, kynnys = RAAHAUKSEN_KYNNYS_PX) {
  return Math.hypot(dx || 0, dy || 0) > kynnys;
}
