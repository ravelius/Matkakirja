/*
 * RETKIKUNNAN PALLOT NÄKYVIIN (suunnitelma docs/raportit/pallot-nakyviin-suunnitelma-20261012.md, #4501; juna 185).
 *
 * Yksi Durable Object -huone retkikuntaa ja kaupunkia kohden (avain "<koodi>:<kaupunki>"). Jäsenet yhdistävät
 * WebSocketilla (hibernation-rajapinta: huone ei maksa levossa) ja lähettävät oman pallonsa tilan 1–2 Hz;
 * huone välittää sen muille huoneessa. Mitään ei tallenneta levylle: viimeisin tila elää vain socketin
 * liitteessä (serializeAttachment), ja se katoaa yhteyden mukana.
 *
 * Tunnistus tehdään ENNEN huonetta (kasittelija.js /pallot: koodi + jäsentunnus + avain D1:stä); huone luottaa
 * otsakkeeseen x-pallo-jasen, koska siihen pääsee vain workerin kautta (Durable Objectilla ei ole omaa osoitetta).
 *
 * Logiikka on puhtaina funktioina (tarkistaPaikka, rajoita, tilannekuva), jotta sen voi testata Nodessa
 * (tests/pallot-worker.test.mjs) ilman Cloudflaren ajoympäristöä.
 */

/** Enintään yhtä monta yhteyttä kuin retkikunnassa voi olla jäseniä. */
export const PALLO_YHTEYKSIA_ENINTAAN = 8;
/** Viestin enimmäiskoko tavuina (paikkaviesti on noin 70 tavua). */
export const PALLO_VIESTIN_KATTO = 256;
/** Viestejä sekunnissa jäsentä kohden (asiakas lähettää 0,2–2 Hz); ylimenevät pudotetaan hiljaa. */
export const PALLO_VIESTEJA_SEKUNNISSA = 4;
/** Tilannekuvaan (uusi tulija) vain tätä tuoreemmat tilat. */
export const PALLO_TUOREUS_MS = 30 * 1000;
/** Otsake, jolla worker kertoo huoneelle tunnistetun jäsenen. */
export const PALLO_JASEN_OTSAKE = 'x-pallo-jasen';
/** Pallon tilan kentät ja rajat (lat/lon WGS84, korkeus ellipsoidista m, suunta °, poltin 0–1, n kerättyjä palloja). */
const KENTAT = Object.freeze({
  lat: [-90, 90], lon: [-180, 180], alt: [-500, 12000], suunta: [0, 360], poltin: [0, 1], n: [0, 64],
});

/**
 * Asiakkaan paikkaviesti → siivottu tila tai virhe. Vain tunnetut kentät; numerot rajoissaan (n kokonaisluku);
 * lat, lon ja alt pakollisia. Merkkijonoja tai sisäkkäisiä rakenteita ei välitetä koskaan eteenpäin.
 */
export function tarkistaPaikka(teksti) {
  if (typeof teksti !== 'string') return { virhe: 'vain tekstiviestit' };
  if (new TextEncoder().encode(teksti).length > PALLO_VIESTIN_KATTO) return { virhe: 'liian pitkä' };
  let o;
  try { o = JSON.parse(teksti); } catch { return { virhe: 'ei JSONia' }; }
  if (!o || typeof o !== 'object' || Array.isArray(o)) return { virhe: 'ei olio' };
  const tila = {};
  for (const [nimi, arvo] of Object.entries(o)) {
    const raja = KENTAT[nimi];
    if (!raja) return { virhe: `tuntematon kenttä ${nimi}` };
    if (typeof arvo !== 'number' || !Number.isFinite(arvo) || arvo < raja[0] || arvo > raja[1]) return { virhe: `${nimi} rajojen ulkopuolella` };
    if (nimi === 'n' && !Number.isInteger(arvo)) return { virhe: 'n ei kokonaisluku' };
    tila[nimi] = nimi === 'lat' || nimi === 'lon' ? Math.round(arvo * 1e6) / 1e6 : Math.round(arvo * 100) / 100;
  }
  for (const pakollinen of ['lat', 'lon', 'alt']) if (!(pakollinen in tila)) return { virhe: `${pakollinen} puuttuu` };
  return { tila };
}

/**
 * Tokenikori: { mahd, aika } → { sallittu, kori }. Kori täyttyy PALLO_VIESTEJA_SEKUNNISSA sekunnissa, enintään
 * saman verran; jokainen viesti vie yhden.
 */
export function rajoita(kori, nyt) {
  const k = kori ?? { mahd: PALLO_VIESTEJA_SEKUNNISSA, aika: nyt };
  const mahd = Math.min(PALLO_VIESTEJA_SEKUNNISSA, k.mahd + ((nyt - k.aika) / 1000) * PALLO_VIESTEJA_SEKUNNISSA);
  if (mahd < 1) return { sallittu: false, kori: { mahd, aika: nyt } };
  return { sallittu: true, kori: { mahd: mahd - 1, aika: nyt } };
}

/** Muiden jäsenten tuoreet tilat uudelle tulijalle: liitteet [{ j, viim: { …tila, t } }]. */
export function tilannekuva(liitteet, itse, nyt) {
  return liitteet
    .filter((l) => l && l.j !== itse && l.viim && nyt - l.viim.t <= PALLO_TUOREUS_MS)
    .map((l) => ({ j: l.j, ...l.viim }));
}

/** Durable Object: yksi retkikunnan kaupunkihuone. */
export class PalloHuone {
  constructor(ctx, env, apurit = {}) {
    this.ctx = ctx;
    this.env = env;
    this.nyt = apurit.nyt ?? (() => Date.now());
  }

  async fetch(pyynto) {
    if ((pyynto.headers.get('upgrade') ?? '').toLowerCase() !== 'websocket') {
      return new Response('Vain WebSocket', { status: 426 });
    }
    const jasen = pyynto.headers.get(PALLO_JASEN_OTSAKE);
    if (!jasen) return new Response('Jäsen puuttuu', { status: 400 });
    // Sama jäsen uudelleen (katkos, sovellus palasi taustalta): vanha yhteys pois, ettei sama pallo näy kahdesti.
    for (const vanha of this.ctx.getWebSockets(jasen)) {
      try { vanha.close(4000, 'korvattu'); } catch { /* jo kiinni */ }
    }
    if (this.ctx.getWebSockets().filter((ws) => this.liite(ws)?.j !== jasen).length >= PALLO_YHTEYKSIA_ENINTAAN) {
      return new Response('Huone täynnä', { status: 429 });
    }
    const [asiakas, palvelin] = Object.values(new WebSocketPair());
    this.ctx.acceptWebSocket(palvelin, [jasen]);
    const nyt = this.nyt();
    palvelin.serializeAttachment({ j: jasen, viim: null, kori: null });
    palvelin.send(JSON.stringify({
      tyyppi: 'tila',
      pallot: tilannekuva(this.ctx.getWebSockets().map((ws) => this.liite(ws)), jasen, nyt),
    }));
    return new Response(null, { status: 101, webSocket: asiakas });
  }

  liite(ws) {
    try { return ws.deserializeAttachment(); } catch { return null; }
  }

  /** Hibernation: viesti herättää huoneen; tila talteen liitteeseen ja muille eteenpäin. */
  async webSocketMessage(ws, viesti) {
    const l = this.liite(ws);
    if (!l) return;
    const nyt = this.nyt();
    const raja = rajoita(l.kori, nyt);
    l.kori = raja.kori;
    if (!raja.sallittu) { ws.serializeAttachment(l); return; }
    const { tila } = tarkistaPaikka(typeof viesti === 'string' ? viesti : null);
    if (!tila) { ws.serializeAttachment(l); return; }
    l.viim = { ...tila, t: nyt };
    ws.serializeAttachment(l);
    this.levita(ws, { tyyppi: 'pallo', j: l.j, ...l.viim });
  }

  async webSocketClose(ws) { this.poistu(ws); }

  async webSocketError(ws) { this.poistu(ws); }

  poistu(ws) {
    const l = this.liite(ws);
    if (!l) return;
    // Korvattu yhteys (sama jäsen yhdisti uudelleen): ei pois-viestiä, pallo jatkaa uudella yhteydellä.
    if (this.ctx.getWebSockets(l.j).some((muu) => muu !== ws)) return;
    this.levita(ws, { tyyppi: 'pois', j: l.j });
  }

  levita(lahettaja, data) {
    const teksti = JSON.stringify(data);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === lahettaja) continue;
      try { ws.send(teksti); } catch { /* suljettu kesken: Cloudflare kutsuu webSocketClose */ }
    }
  }
}
