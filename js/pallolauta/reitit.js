/*
 * PALLOLAUDAN REITIT — naapurireitit viivoina, askelhelmet pisteinä ja
 * lentokaaret kaarina (vaihe 2, docs/moduulit/karttapallo.md luku 4.2:
 * reitit **T** = pathsData, helmet **P** = pointsData, kaaret **A** =
 * arcsData).
 *
 * KARTTA LAATOISSA, PELI PÄÄLLÄ (Raamattu 5.9.2026): reittiVERKKO on
 * laatoissa tekstuurina eikä sitä piirretä pallolle. Pallolle piirretään
 * vain se, mikä tasokartan elävässä matkareittikerroksessa on
 * (js/ui.js paivitaMatkareitit): siirtovaiheessa ja liu'un ollessa auki
 * nykyisen kaupungin naapurireitit askelhelmineen, kesken reittiä se
 * reitti jolla nappula on, ja lentokaaret vain lentolistan ollessa auki
 * tai valitun lennon ajan (omistaja 1.9.2026: *"Piirretään ne näkyviin
 * reaaliajassa vasta sitten jos pelaaja päättää mennä lentokoneella."*).
 * SÄÄNTÖ ON YKSI: ui.matkareittienValinta() päättää, tämä vain piirtää.
 *
 * SAMA KIELI KUIN KARTALLA: maareitti hento musteviiva, merireitti
 * sinertävä, lentokaari poltettua sinooperia (css .matkareitti-*),
 * katkoviiva 50/50 ja lennolla 60/40, askelhelmet vaaleita pisteitä
 * täsmälleen niissä kohdissa, joihin nappula pysähtyy (js/rules.js
 * pointAlong, sama kaava kuin pixelOf).
 *
 * YKSI TOTUUS: laudan (x, y). Reitin poly käännetään asteiksi kerran
 * per reitti ja muistetaan (karttapallo.md luku 5: "polyn asteistus
 * välimuistiin per lauta"). Datumit ovat pysyviä olioita avaimittain,
 * jotta Globe.gl siirtää olemassa olevaa viivaa eikä luo sitä uudestaan
 * (pathTransitionDuration, KAIKKI LIIKE ANIMOIDAAN).
 */

import { pointAlong } from '../rules.js';

/** Reittiviivan paksuus asteina (Globe.gl pathStroke): ~2,7 px saapumisnäkymässä. */
export const MATKAREITIN_PAKSUUS_AST = 0.05;
/** Katkoviivan jakso asteina (viiva + väli); tasokartalla 8 px. */
export const MATKAREITIN_KATKO_AST = 0.16;
/** Askelhelmen säde (Globe.gl pointRadius-yksikköä, vrt. KAUPUNKIPISTEEN_SADE 0,03). */
export const REITTIHELMEN_SADE = 0.014;
/** Helmen korkeus: kaupunkipisteiden (0,003) alla, viivan (0,002) päällä. */
export const REITTIHELMEN_KORKEUS = 0.0025;
export const REITIN_KORKEUS = 0.002;
/** Lentokaaren paksuus asteina ja katkojakso asteina. */
export const LENTOKAAREN_PAKSUUS_AST = 0.06;
export const LENTOKAAREN_KATKO_AST = 0.35;
/**
 * Lentokaaren huippu pallon säteinä 180°:n lennolla; lyhyempi lento
 * kaartaa suhteessa matalammin. Kone (js/pallolauta/siirto.js) lentää
 * saman kaaren, joten luku on täällä molempien luettavissa.
 */
export const LENTOKAAREN_KORKEUS = 0.5;
/** Valitun lennon katkojälki kiertää kaarta (ms per kierros). */
export const LENTOKAAREN_ELO_MS = 2400;

/** Värit: css .matkareitti (#4a3a24 .42), .matkareitti-meri, .matkareitti-lento. */
export const REITIN_VARIT = {
  maa: 'rgba(74, 58, 36, 0.42)',
  meri: 'rgba(61, 85, 112, 0.42)',
  lento: 'rgba(150, 54, 40, 0.6)',
  /*
   * AVAUSLENTO LUETAAN HARSON LÄPI. Lennon niukkuusharso on kalvo
   * kotelon päällä (js/pallolauta/lauta.js), ja kaari on sen ALLA
   * pallon pinnassa — WebGL-kerrosta ei voi nostaa CSS-kalvon yli.
   * Tasokartalla reitti piirtyy harson päälle terävänä sinooperina
   * (.flight-trail), joten pallon kaari saa saman sävyn täytenä, jotta
   * se lukeutuu harson läpi samanlaisena.
   */
  avauslento: 'rgba(194, 69, 47, 0.95)',
  /*
   * AVAUSLENNON SUUNNITTELUVIIVA. Kun kone piirtää lennon aikana paksun
   * punaisen viivan (avauslennonJalki alla, omistaja 5.9.2026 klo
   * 23.10), katkoviivakaari ei enää saa kilpailla sen kanssa: se jää
   * hennoksi suunnitteluviivaksi paksun viivan alle, samaan tapaan kuin
   * tasokartalla reitti näkyy ohuena ennen kuin kone on kulkenut sen.
   */
  avauslennonSuunnitelma: 'rgba(194, 69, 47, 0.3)',
  /*
   * PAKSU PUNAINEN VIIVA KUTEN ETUSIVULLA (omistaja 5.9.2026 klo 23.10,
   * sanatarkasti: *"lentokone saisi tehdä saman paksun viivan kuin
   * etusivulla"*). Sama sinooperi kuin css .etusivupallo-viiva
   * (#c2452f, peittävyys 0,92) — etusivun pallo ja pelin pallo
   * piirtävät saman jäljen, vaikka toinen on esirenderöity video ja
   * toinen elävä lauta.
   */
  avauslennonJalki: 'rgba(194, 69, 47, 0.92)',
};
export const HELMEN_VARI = 'rgba(250, 243, 226, 0.9)';

const RAD = Math.PI / 180;

/** Isoympyräkulma kahden pisteen välillä asteina. */
export function kulmaAsteina(a, b) {
  const la1 = a.lat * RAD; const la2 = b.lat * RAD;
  const dLng = (b.lng - a.lng) * RAD;
  const c = Math.sin(la1) * Math.sin(la2) + Math.cos(la1) * Math.cos(la2) * Math.cos(dLng);
  return Math.acos(Math.max(-1, Math.min(1, c))) / RAD;
}

/** Piste isoympyrällä a→b osuudella t (0…1), asteina. */
export function isoympyranPiste(a, b, t) {
  const kulma = kulmaAsteina(a, b) * RAD;
  if (kulma < 1e-9) return { lat: a.lat, lng: a.lng };
  const la1 = a.lat * RAD; const lo1 = a.lng * RAD;
  const la2 = b.lat * RAD; const lo2 = b.lng * RAD;
  const s = Math.sin(kulma);
  const A = Math.sin((1 - t) * kulma) / s;
  const B = Math.sin(t * kulma) / s;
  const x = A * Math.cos(la1) * Math.cos(lo1) + B * Math.cos(la2) * Math.cos(lo2);
  const y = A * Math.cos(la1) * Math.sin(lo1) + B * Math.cos(la2) * Math.sin(lo2);
  const z = A * Math.sin(la1) + B * Math.sin(la2);
  return { lat: Math.atan2(z, Math.hypot(x, y)) / RAD, lng: Math.atan2(y, x) / RAD };
}

/** Lentokaaren huippukorkeus lennon kulmasta (asteina). */
export function lentokaarenKorkeus(kulmaAst) {
  return LENTOKAAREN_KORKEUS * Math.max(0.02, Math.min(1, kulmaAst / 180));
}

/**
 * Piste lentokaarella osuudella e: { lat, lng, korkeus }.
 *
 * YKSI KAAVA KONEELLE JA JÄLJELLE. Kone (js/pallolauta/siirto.js
 * piirraKone) ja avauslennon paksu viiva (js/pallolauta/avaus.js) ovat
 * saman lennon kaksi puolta: jos korkeusparaabeli olisi kahdessa
 * paikassa, viiva irtoaisi koneen alta heti kun toista säädettäisiin.
 * `pohja` on kerroksen oma nostatus pinnasta (koneella MERKIN_KORKEUS,
 * viivalla REITIN_KORKEUS).
 */
export function lentokaarenKohta(kaari, e, pohja = 0) {
  const p = isoympyranPiste(kaari.alku, kaari.loppu, e);
  return { lat: p.lat, lng: p.lng, korkeus: kaari.korkeus * 4 * e * (1 - e) + pohja };
}

/**
 * Reittikerros pallolle. `asteet(kohta)` kääntää laudan (x, y) asteiksi
 * ({ lat, lon }); `ui` antaa laudan ja lentoKaaren.
 */
export function luoReitit({ pallo, ui, siirtyma, asteet }) {
  const reittiMuisti = new Map(); // edge id → { pisteet, pituusAst, helmet, datum }
  const kaariMuisti = new Map(); // "a>b" → datum
  /*
   * YKSI VIIVAKERROS, MONTA OSAA (karttapallo.md luku 10.1). Globe.gl:llä
   * on tasan yksi pathsData, ja siihen kirjoittaa nyt pelin lisäksi
   * linssi (joet, rajat, virrat — js/pallolauta/linssit.js polut).
   * Jokainen osa asettaa oman listansa nimellään, ja kerros kootaan
   * osista samaan tapaan kuin merkkikerroksessa (merkit.js aseta):
   * linssi ei voi pyyhkiä pelin naapurireittejä pois eikä toisin päin.
   */
  const osat = new Map(); // osan nimi → datumit
  let edellinenAvain = null;
  let helmet = [];

  pallo
    .pathsData([])
    .pathPoints('pisteet')
    .pathPointLat((p) => p[0]).pathPointLng((p) => p[1])
    /*
     * KORKEUS PISTEESTÄ, KUN SE ON ANNETTU. Pelin reitit ja linssien
     * viivat ovat pallon pinnassa (REITIN_KORKEUS), mutta avauslennon
     * jälki nousee koneen mukana kaarelle, joten kolmas luku
     * ([lat, lng, korkeus]) saa voittaa. Kahden luvun pisteet toimivat
     * ennallaan.
     */
    .pathPointAlt((p) => (p.length > 2 ? p[2] : REITIN_KORKEUS))
    .pathColor((d) => d.vari)
    // Paksuus ja katko datumista: pelin reitit saavat oletuksensa
    // (MATKAREITIN_PAKSUUS_AST, katko laskettuna), linssin viiva omansa.
    // Ilman katkoa viiva on yhtenäinen (jakso 1, väli 0).
    .pathStroke((d) => d.paksuus ?? MATKAREITIN_PAKSUUS_AST)
    /*
     * KATKO KAHDESTA LUVUSTA, KUN NIITÄ ON KAKSI. Pelin reitit ja
     * linssien viivat antavat yhden `katko`n (viiva ja väli yhtä
     * pitkiä); avauslennon jälki antaa ne erikseen (`viiva` = kuljettu
     * osuus, `vali` = loput), jolloin viiva kasvaa koneen perässä ilman
     * että geometriaa rakennetaan uudestaan joka kehys.
     */
    .pathDashLength((d) => d.viiva ?? d.katko ?? 1)
    .pathDashGap((d) => d.vali ?? d.katko ?? 0)
    .pathTransitionDuration(siirtyma)
    .pathResolution(2);
  pallo
    .arcsData([])
    .arcStartLat('startLat').arcStartLng('startLng')
    .arcEndLat('endLat').arcEndLng('endLng')
    .arcColor((d) => d.vari ?? REITIN_VARIT.lento)
    .arcAltitude((d) => d.korkeus)
    .arcStroke(LENTOKAAREN_PAKSUUS_AST)
    .arcDashLength((d) => d.katko * 0.6).arcDashGap((d) => d.katko * 0.4)
    .arcDashAnimateTime((d) => (d.elava ? LENTOKAAREN_ELO_MS : 0))
    .arcsTransitionDuration(siirtyma);

  /** Reitin poly asteiksi, pituus ja helmet — kerran per reitti. */
  const reitinMuisti = (reitti) => {
    let m = reittiMuisti.get(reitti.id);
    if (m) return m;
    const pisteet = [];
    let pituusAst = 0;
    let edellinen = null;
    for (const [x, y] of reitti.poly ?? []) {
      const a = asteet({ x, y });
      if (!a) continue;
      const p = { lat: a.lat, lng: a.lon };
      if (edellinen) pituusAst += kulmaAsteina(edellinen, p);
      pisteet.push([p.lat, p.lng]);
      edellinen = p;
    }
    /*
     * ASKELHELMET: reitin väliaskeleet, sama kaava kuin nappulan
     * sijainnilla (js/rules.js pixelOf). Päätekaupungit jäävät pois —
     * niillä on oma pisteensä — joten kierros on 1 … steps-1.
     */
    const askelia = Math.max(1, Math.round(reitti.steps ?? 1));
    const helmia = [];
    for (let i = 1; i < askelia; i += 1) {
      const kohta = pointAlong(reitti.poly, i / askelia);
      const a = asteet(kohta);
      if (a) helmia.push({ laji: 'helmi', id: `${reitti.id}#${i}`, lat: a.lat, lon: a.lon });
    }
    const katko = pituusAst > 0 ? Math.min(0.5, (MATKAREITIN_KATKO_AST / 2) / pituusAst) : 0.5;
    m = {
      pisteet,
      pituusAst,
      helmet: helmia,
      datum: {
        avain: reitti.id, pisteet, katko, vari: REITIN_VARIT[reitti.type === 'sea' ? 'meri' : 'maa'],
      },
    };
    reittiMuisti.set(reitti.id, m);
    return m;
  };

  /** Lentokaaren datum kaupunkiparille (pysyvä olio). */
  const kaari = (a, b, elava) => {
    const avain = `${a.id}>${b.id}`;
    let d = kaariMuisti.get(avain);
    if (!d) {
      const alku = asteet(a);
      const loppu = asteet(b);
      if (!alku || !loppu) return null;
      const kulma = kulmaAsteina({ lat: alku.lat, lng: alku.lon }, { lat: loppu.lat, lng: loppu.lon });
      d = {
        avain,
        startLat: alku.lat, startLng: alku.lon, endLat: loppu.lat, endLng: loppu.lon,
        kulma,
        korkeus: lentokaarenKorkeus(kulma),
        katko: kulma > 0 ? Math.min(0.5, LENTOKAAREN_KATKO_AST / kulma) : 0.5,
        elava: false,
      };
      kaariMuisti.set(avain, d);
    }
    d.elava = elava;
    return d;
  };

  /**
   * Piirtää valinnan (ui.matkareittienValinta) pallolle. Palauttaa
   * askelhelmet, jotka lauta.js liittää pistekerrokseen.
   */
  const paivita = ({
    reittiTunnukset = [], lennot = [], lentoLahto = null, avain = '', kaarenVari = null,
  }) => {
    const elava = ui.lentoKaari?.b ?? null;
    const tunniste = `${avain}|${elava ?? ''}`;
    if (tunniste === edellinenAvain) return helmet;
    edellinenAvain = tunniste;
    const { board } = ui.game;
    const polut = [];
    helmet = [];
    if (avain) {
      for (const eid of reittiTunnukset) {
        const reitti = board.edgeById.get(eid);
        if (!reitti?.poly?.length) continue;
        const m = reitinMuisti(reitti);
        polut.push(m.datum);
        helmet.push(...m.helmet);
      }
    }
    const kaaret = [];
    const lahto = avain && lentoLahto ? board.cityById.get(lentoLahto) : null;
    for (const kohdeId of lahto ? lennot : []) {
      const kohde = board.cityById.get(kohdeId);
      if (!kohde) continue;
      const d = kaari(lahto, kohde, elava === kohdeId && ui.lentoKaari?.a === lahto.id);
      if (d) { d.vari = kaarenVari; kaaret.push(d); }
    }
    aseta('peli', polut);
    pallo.arcsData(kaaret);
    return helmet;
  };

  /** Koko viivakerros kirjastolle: osat järjestyksessä. */
  const tyonna = () => {
    const lista = [];
    for (const o of osat.values()) lista.push(...o);
    pallo.pathsData(lista);
  };

  /**
   * Osan viivat. `peli` on pelin naapurireitit, linssien osat lisätään
   * perään (js/pallolauta/linssit.js polut). Tyhjä lista poistaa osan
   * viivat kerrokselta siirtymällä.
   */
  function aseta(nimi, lista = []) {
    osat.set(nimi, lista);
    tyonna();
  }

  /*
   * ══════════════════════════════════════════════════════════════
   * AVAUSLENNON JÄLKI — PAKSU PUNAINEN VIIVA KONEEN PERÄSSÄ
   * ══════════════════════════════════════════════════════════════
   *
   * Omistaja 5.9.2026 klo 23.10: *"lentokone saisi tehdä saman paksun
   * viivan kuin etusivulla."* Jälki on tavallinen viivakerroksen osa
   * (`aseta('avauslento', …)`), joten se ei voi pyyhkiä pelin
   * naapurireittejä eikä linssien viivoja — sama sääntö kuin kaikilla
   * muillakin osilla.
   *
   * GEOMETRIA KERRAN, KASVU KATKOVIIVALLA. `pisteet` on KOKO kaari heti
   * ensimmäisellä kutsulla, ja `osuus` (0…1) kertoo, kuinka pitkälle
   * kone on ehtinyt: viiva piirretään katkona, jonka viivaosa on
   * `osuus` ja väli 1 (Globe.gl normittaa katkon viivan pituudella,
   * dashScale = 1/pituus, joten juuri alkupää `osuus` piirtyy).
   *
   * MIKSI NÄIN EIKÄ PISTELISTAA KASVATTAMALLA (mitattu Chromiumilla
   * 5.9.2026): kasvava pistelista näkyi ruudulla vain lennon
   * ENSIMMÄISENÄ pätkänä Lontoon vieressä. Globe.gl rakentaa Line2:n
   * geometrian `interpolK`-tweenin kautta, ja joka kehyksen kirjoitus
   * jätti geometrian ensimmäisen kirjoituksen mittaiseksi. Katkoviivan
   * luvut sen sijaan kirjoitetaan materiaaliin joka päivityksellä
   * ennen tuota tweeniä, joten ne menevät perille varmasti.
   *
   * SIIRTYMÄ POIS JÄLJEN AJAKSI: kerroksen datumit siirtyvät
   * pathTransitionDurationin verran (KAIKKI LIIKE ANIMOIDAAN), eikä
   * kasvava viiva saa laahata koneen perässä siirtymän mitan. Siirtymä
   * palautuu, kun jälki poistetaan — ja juuri siksi poisto myös HÄIPYY
   * PEHMEÄSTI eikä katoa välähdyksellä.
   */
  let jalkiDatum = null;

  const jalki = (pisteet, { paksuus = MATKAREITIN_PAKSUUS_AST, osuus = 1 } = {}) => {
    if (!pisteet?.length) {
      if (!jalkiDatum) return;
      jalkiDatum = null;
      pallo.pathTransitionDuration(siirtyma);
      aseta('avauslento', []);
      return;
    }
    if (!jalkiDatum) {
      jalkiDatum = { avain: 'avauslennon-jalki', pisteet, vari: REITIN_VARIT.avauslennonJalki };
      pallo.pathTransitionDuration(0);
    }
    jalkiDatum.pisteet = pisteet;
    jalkiDatum.paksuus = paksuus;
    jalkiDatum.viiva = Math.max(0, Math.min(1, osuus));
    // Väli on aina koko viiva: jakso on viiva + 1 ≥ 1, joten kuljetun
    // osuuden jälkeen ei piirry mitään.
    jalkiDatum.vali = 1;
    aseta('avauslento', [jalkiDatum]);
  };

  return {
    paivita,
    aseta,
    jalki,
    helmet: () => helmet,
    /** Lentokaaren geometria koneelle: { alku, loppu, kulma, korkeus }. */
    lentokaari: (a, b) => {
      const d = kaari(a, b, false);
      if (!d) return null;
      return {
        alku: { lat: d.startLat, lng: d.startLng },
        loppu: { lat: d.endLat, lng: d.endLng },
        kulma: d.kulma,
        korkeus: d.korkeus,
      };
    },
  };
}
