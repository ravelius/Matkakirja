/*
 * KARTTAPALLO — maailmanvalikko Google Earth -tapaan.
 *
 * OMISTAJAN KYSYMYS 4.9.2026 ("Miten haastava olisi tehdä Google earth
 * tyylinen kartta pallo peliin" / "onko valmiita pohjia ... että saisi
 * 2. vaihtoehdon tehtyä nopeammin" / testisivun jälkeen: "Globe GL
 * toimii hienosti"). Vaihtoehto 2 = pallo on maailmanvalikko: pelaaja
 * pyörittää palloa, napauttaa kaupunkia, ja peli sukeltaa nykyiselle
 * laudalle. Lehdet, nostot, linssit ja poltetut nimet pysyvät
 * tasolaudalla; pallolla ovat vain kaupungit, reitit ja pelaajan
 * paikka.
 *
 * ── MOOTTORI JA AINEISTO TULEVAT ÄMPÄRISTÄ, EIVÄT REPOSTA ──────────
 *
 * Globe.gl (MIT, three.js mukana, n. 700 kt) ladataan pelin R2:sta
 * skriptinä vasta kun pallo avataan ensimmäisen kerran — peli ei
 * kanna sitä mukanaan, ja ilman verkkoa pallo kertoo, ettei se
 * latautunut. Pinnoite on pelin oma juliste käännettynä Millerista
 * tasaväliseksi kuvaksi (tools/tee-pallotekstuuri.mjs, workflow
 * tee-pallotekstuuri), samassa ämpärissä laattapyramidin vieressä.
 *
 * ── SUKELLUS ON KAMERA-AJO ─────────────────────────────────────────
 *
 * Maailmankartta on ainoa pelilauta (Raamattu 30.8.2026), joten
 * kaupungin napautus sulkee pallon ja ajaa kameran kaupunkiin
 * (js/kartta.js ajaKamera) — ei laudan vaihtoa. Pallo avataan
 * matkalaukun Karttapallo-linssistä (js/ui.js → ui.avaaPallo).
 *
 * ── SAMA RUNKO PALLOLAUDALLE (omistaja 5.9.2026) ───────────────────
 *
 * *"Voisiko pallon vaihtaa pelin kartaksi suoraan?"* — Raamattu,
 * KARTTAPALLO ON PELILAUTA. Pallon runko (rakennaPallo: pinta laatoista
 * tai z4-varatekstuurista) ja eleet (asennaPallonEleet: nipistys ei ole
 * napautus, sormessa pysyvä kierto, liuku, työpöydän rulla) ovat
 * jaettuja: tämä tiedosto
 * pitää valikkopallon kuoren (Sulje, tumma pohja, sukellus), ja
 * js/pallolauta/lauta.js rakentaa samasta rungosta pelin laudan
 * karttaruutuun. Kytkin ja suunnitelma: js/ui-apurit.js lautaValinta,
 * docs/moduulit/karttapallo.md.
 */

import { laudaltaAsteiksi, projisoiLaudalle } from './fokusmitat.js';
import {
  haePyramidinLuettelo, pyramidinKerrostasot, pyramidinLaattaOlemassa, pyramidinLaattaUrl,
} from './laattapyramidi.js';
import { laatuAinaPaalla } from './ui-apurit.js';
/*
 * Laattakerroksen puhtaat apurit (erä E0, suunnitelma
 * docs/moduulit/pallon-liike-taydella-tarkkuudella.md luku 6) asuvat
 * moduulissa js/pallolaatat.js. Ne TUODAAN tänne ja VIEDÄÄN EDELLEEN,
 * jotta testit, savukkeet ja js/pallolauta/ näkevät ne edelleen
 * js/pallo.js:stä — siirto ei muuttanut yhtään rajapintaa.
 */
import {
  LAATU_KAUKORAJA, LAATU_LEPOVIIVE_MS, LEPOKERROS_HAIVE_SISAAN_MS, LEPOKERROS_KANGASKATTO,
  LEPOKERROS_KOROTUS, LEPOKERROS_KORKEUSRAJA, LEPOKERROS_KUVAKATTO, LEPOKERROS_MITTAMATKA_PX,
  LEPOKERROS_NAYTTEITA, LEPOKERROS_SYVYYSSIIRTO, THREE_CLAMP, THREE_LINEAR,
  THREE_LINEAR_MIPMAP_LINEAR, lepokerroksenAlue, lepokerroksenKerrokset, lepokerroksenLaattakatto,
  lepokerroksenSilmat, lepokerroksenSuunnitelma, lepokerroksenTasoRiittaa, lepokerroksenVerkko,
  luoLepokerroksenAjoitus,
} from './pallolaatat.js';

export {
  LAATU_KAUKORAJA, LAATU_LEPOVIIVE_MS, LEPOKERROS_HAIVE_SISAAN_MS, LEPOKERROS_KANGASKATTO,
  LEPOKERROS_KATTOKERROIN, LEPOKERROS_KOROTUS, LEPOKERROS_KORKEUSRAJA, LEPOKERROS_KUVAKATTO,
  LEPOKERROS_LAATTAKATTO_MAX, LEPOKERROS_LAATTAKATTO_MIN, LEPOKERROS_LEPOVIIVE_MS,
  LEPOKERROS_MITTAMATKA_PX, LEPOKERROS_NAYTTEITA, LEPOKERROS_RUUDUKKO_AST,
  LEPOKERROS_RUUDUKKO_MAX, LEPOKERROS_RUUDUKKO_MIN, LEPOKERROS_SYVYYSSIIRTO,
  LEPOKERROS_TERAVYYS, LEPOKERROS_TIHEYSOSUUS, LEPOKERROS_VARA_AST, lepokerroksenAlue,
  lepokerroksenKerrokset, lepokerroksenLaatat, lepokerroksenLaattakatto, lepokerroksenSilmat,
  lepokerroksenSuunnitelma, lepokerroksenTaso, lepokerroksenTasoRiittaa, lepokerroksenUV,
  lepokerroksenVerkko, luoLepokerroksenAjoitus, pallonPiste,
} from './pallolaatat.js';

const R2 = 'https://media.matkakirja.app/';
/**
 * Globe.gl:n UMD-paketti pelin ämpärissä (workflow tee-pallotekstuuri tai
 * tee-pallolaatat vie sen). 2.46 tuo laattamoottorin (globeTileEngineUrl).
 */
export const PALLO_KIRJASTO = `${R2}vendor/globe.gl-2.46.2.min.js`;
/** Pinnoitteen versio = sen laattapyramidin versio, josta se käännettiin. */
export const PALLO_TEKSTUURIVERSIO = '2026-09-03a';
/** Laattataso, josta pinnoite on käännetty: z4 on ainoa (omistaja 4.9.2026). */
export const PALLO_TEKSTUURITASO = 4;
export const PALLO_TEKSTUURI = `${R2}julisteet/pallo/${PALLO_TEKSTUURIVERSIO}/tekstuuri-z${PALLO_TEKSTUURITASO}.jpg`;
/*
 * LAATOITETTU PALLO (omistaja 4.9.2026 ilta: "Jos se tukee niin tee se
 * suoraan peliin ilman demoa"). Pinta haetaan Web Mercator -laattoina
 * (tools/tee-pallolaatat.mjs, workflow tee-pallolaatat) vain katsotulle
 * alueelle tarkkuustasoittain, joten yhden tekstuurin muisti- ja
 * tarkkuuskatto poistuu. Yksi z4-tekstuuri jää VARAKSI: jos laattojen
 * luetteloa (laatat.json) ei saada, pallo piirtyy kuten ennen.
 */
export const PALLO_LAATTAVERSIO = '2026-09-03a';
/*
 * NOSTOTASOLLINEN KANSIO (omistaja 5.9.2026: "lisää palloon myös se
 * toinen kerros missä nimet ja kohteet yms." ja "päästään siitä
 * harmaasta hatusta eroon"): laatat on poltettu uudestaan nimien ja
 * karttanostojen kanssa (tools/tee-pallolaatat.mjs --nostot) ja navat
 * täytetty merellä ja jäällä. Kansio on <versio>-nostot-<tunniste>;
 * vanhat kansiot jäävät ämpäriin varalle. TUNNISTE b (5.9.2026 klo
 * 15 Suomen aikaa, omistaja Huippuvuorilta: "Miksi hattu näkyy?"):
 * napa merta napaan asti ilman vaaleaa lakkia ja reunarengasta, kartta
 * 84° N:ään asti (tools/tee-pallolaatat.mjs --tunniste b). Muuttunut
 * piirto saa aina uuden kansion, koska laatat ovat vuoden välimuistissa.
 */
export const PALLO_LAATTATUNNISTE = 'c';
export const PALLO_LAATTAKANSIO = `${PALLO_LAATTAVERSIO}-nostot-${PALLO_LAATTATUNNISTE}`;
export const PALLO_LAATAT = `${R2}julisteet/pallo/laatat/${PALLO_LAATTAKANSIO}/`;
/** Syvin taso, jonka peli käyttää — luettelo (laatat.json) voi rajata matalammaksi. */
export const PALLO_LAATTATASO_MAX = 8;
/*
 * SYVIN TASO VARAKANSIOSTA, KUNNES NOSTOSARJA ON POLTETTU (omistaja
 * 5.9.2026: *"kartta näkyi ennen palloa jo 7 tasolla paljon tarkemmin.
 * Eikä tarkennu vaikka odottaa"*). Tasokartan pyramidin z7 vastaa
 * Mercatorin tasoa 8, joten pallo oli saapumisnäkymässä puolet
 * tasokartan tarkkuudesta niin kauan kuin nostosarjassa oli vain
 * tasot 0–7. Pohjasarjassa (ilman nostoja) taso 8 on jo kokonaan
 * ämpärissä, joten se haetaan sieltä: nimet ja nostot ovat tasolla 8
 * elävinä (js/pallolauta/nimet.js, nostot.js) eivätkä laatoissa, joten
 * kuva on sama vailla painettuja nimiä. Kun nostosarjan taso 8 on
 * valmis, PALLO_SYVA_TASO nollataan ja kaikki tulee yhdestä kansiosta.
 *
 * NOLLATTU 5.9.2026 klo 17.30 Suomen aikaa: varakansion taso 8 kantaa
 * vanhan napalakin ja reunarenkaan, ja laattamoottori näyttää ne
 * uusien tason 6–7 laattojen PÄÄLLÄ napaa katsottaessa (mitattu:
 * "Miksi hattu näkyy?" -rengas tuli juuri näistä). Kunnes sarjan b
 * taso 8 on ämpärissä (neljännekset ajossa), syvin taso on luettelon
 * max (7); kun laatat.json sanoo 8, taso 8 tulee samasta kansiosta
 * ilman koodimuutosta.
 */
export const PALLO_LAATAT_SYVA = `${R2}julisteet/pallo/laatat/${PALLO_LAATTAVERSIO}/`;
export const PALLO_SYVA_TASO = 0;
/** Laatan osoite laattamoottorille (slippy map -koordinaatit). */
export const pallonLaatta = (x, y, l) => `${PALLO_SYVA_TASO && l >= PALLO_SYVA_TASO ? PALLO_LAATAT_SYVA : PALLO_LAATAT}${l}/${x}/${y}.jpg`;

let laatatLupaus = null;
/** Pallon laattaluettelo (laatat.json), kun se on saatu; muuten null. */
let laattaluettelo = null;
/**
 * Laattaluettelo ämpäristä: { tasot: { min, max } } tai null, jos
 * luetteloa ei saada (silloin pallo piirtyy yhdestä tekstuurista).
 * Tulos muistetaan. Luettelon tasot.max rajaa syvimmän tason: kansion
 * syvin taso poltetaan puoliskoittain, ja luettelo päivitetään vasta,
 * kun molemmat puoliskot ovat ämpärissä — pallo ei siis pyydä
 * laattoja, joita ei vielä ole.
 *
 * VÄLIMUISTI: LUETTELO REVALIDOIDAAN, LAATAT EIVÄT (6.9.2026). Laatan
 * osoitteessa on kansion versio ja ämpäri lähettää sille `immutable`,
 * mutta laatat.json MUUTTUU saman nimen alla joka poltossa (ämpäri
 * antaa sille max-age 3600). `force-cache` tarjosi selaimen kappaleen
 * ikuisesti myös vanhentuneena, joten palaava pelaaja ei saanut uutta
 * tasot.max-arvoa lainkaan — taso 8 valmistui 6.9. klo 04.50, eikä se
 * olisi tullut käyttöön ennen kuin selain siivoaa korinsa. `no-cache`
 * pakottaa revalidoinnin (ETag → 304, muutama sata tavua). Osoite
 * pysyy samana, joten palvelutyöntekijän kori (sw.js laattaluettelo:
 * kappale heti, päivitys taustalla) ja lentokonetila toimivat kuten
 * ennen; jos verkkoa ei ole, luettelo haetaan vielä korista
 * `force-cache`-pyynnöllä ennen kuin luovutetaan varatekstuuriin.
 */
export function laatatSaatavilla(haku = globalThis.fetch) {
  if (!laatatLupaus) {
    const osoite = `${PALLO_LAATAT}laatat.json`;
    laatatLupaus = Promise.resolve()
      .then(() => haku(osoite, { cache: 'no-cache' }).catch(() => null))
      .then((v) => (v?.ok ? v : haku(osoite, { cache: 'force-cache' })))
      .then((v) => (v.ok ? v.json() : null))
      .then((j) => {
        const kelpaa = Boolean(j && j.tasot && j.tasot.max >= 0);
        laattaluettelo = kelpaa ? j : null;
        return kelpaa ? { tasot: j.tasot } : null;
      })
      .catch(() => null);
  }
  return laatatLupaus;
}
/** Syvin käytettävä taso: pelin katto tai luettelon katto, kumpi on matalampi. */
export function laattatasoMax(laatat) {
  const luettelo = Number(laatat?.tasot?.max);
  if (!Number.isFinite(luettelo)) return PALLO_LAATTATASO_MAX;
  // Varakansio kantaa syvimmän tason, vaikka nostosarjan luettelo ei vielä.
  const syva = PALLO_SYVA_TASO ? Math.max(luettelo, PALLO_SYVA_TASO) : luettelo;
  return Math.min(PALLO_LAATTATASO_MAX, syva);
}

/** Saatu laattaluettelo (testit ja pallolauta) tai null. */
export function pallonLaattaluettelo() {
  return laattaluettelo;
}

/*
 * ======== KARKEA MAAILMA TALTEEN LENTOKONETTA VARTEN ================
 * (pallolauta vaihe 5c, docs/moduulit/karttapallo.md luku 6: *"SW-
 * välimuisti vendorille ja laatoille; varapolku + turvatila"*)
 *
 * Laattamoottori hakee vain sen, mitä kamera juuri katsoo. Ilman verkkoa
 * avattu peli näkisi siis vain ne laatat, jotka on sattumalta katsottu
 * aiemmin — ja koko pallon näkymässä ei mitään. Siksi pallolaudan
 * ensimmäisellä avauksella palvelutyöntekijälle lähetetään lista
 * osoitteita, jotka se hakee taustalla omaan koriinsa (sw.js
 * LAATTACACHE, esilataaLaatat): KOKO MAAILMA tasoille 0–3 (85 laattaa,
 * ~1 Mt) ja ALOITUSKAUPUNGIN ympäristö tasolle 4 (3 × 3 laattaa).
 * Silloin lentotilassa pallo näyttää ainakin karkean maailman ja oman
 * kaupungin ympäristön; tarkemmat tasot ovat korissa niiltä alueilta,
 * joilla on jo pelattu.
 *
 * Geometria on TÄÄLLÄ eikä työntekijässä: laattojen kansio, tasokatto ja
 * slippy map -koordinaatit ovat pallon omaa tietoa, ja työntekijä ei voi
 * tuoda ES-moduulia.
 */
/** Esilataus: koko maailma tähän tasoon asti (0–3 = 85 laattaa). */
export const ESILATAUKSEN_MAAILMATASO = 3;
/** Esilataus: aloituskaupungin ympäristö tällä tasolla. */
export const ESILATAUKSEN_KAUPUNKITASO = 4;
/** Esilataus: kaupungin ympäriltä (2 · säde + 1)² laattaa. */
export const ESILATAUKSEN_SADE = 1;
/** Aloituskaupunki, jos pelaajan paikkaa ei tiedetä (Lontoo). */
export const ESILATAUKSEN_KOTI = { lat: 51.5, lon: -0.12 };

/** Slippy map -laatan (x, y) asteista tasolla `taso`. */
export function laatanKoordinaatit(lat, lon, taso) {
  const n = 2 ** taso;
  const x = Math.floor((((lon + 180) % 360 + 360) % 360 / 360) * n);
  const rad = (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * n);
  return { x: Math.max(0, Math.min(n - 1, x)), y: Math.max(0, Math.min(n - 1, y)) };
}

/** Esiladattavien laattojen osoitteet (koko maailma + kaupungin ympäristö). */
export function esilatauksenLaatat({
  lat = ESILATAUKSEN_KOTI.lat, lon = ESILATAUKSEN_KOTI.lon,
  maailmataso = ESILATAUKSEN_MAAILMATASO, kaupunkitaso = ESILATAUKSEN_KAUPUNKITASO,
  maxTaso = PALLO_LAATTATASO_MAX, sade = ESILATAUKSEN_SADE,
} = {}) {
  const osoitteet = [];
  const maailma = Math.min(maailmataso, maxTaso);
  for (let z = 0; z <= maailma; z += 1) {
    const n = 2 ** z;
    for (let y = 0; y < n; y += 1) {
      for (let x = 0; x < n; x += 1) osoitteet.push(pallonLaatta(x, y, z));
    }
  }
  const kz = Math.min(kaupunkitaso, maxTaso);
  if (kz > maailma && Number.isFinite(lat) && Number.isFinite(lon)) {
    const n = 2 ** kz;
    const keski = laatanKoordinaatit(lat, lon, kz);
    for (let dy = -sade; dy <= sade; dy += 1) {
      for (let dx = -sade; dx <= sade; dx += 1) {
        const y = keski.y + dy;
        if (y < 0 || y >= n) continue;
        osoitteet.push(pallonLaatta(((keski.x + dx) % n + n) % n, y, kz));
      }
    }
  }
  return osoitteet;
}

/*
 * ── LENTOREITIN KÄYTÄVÄ (avauslento, 6.9.2026) ────────────────────
 *
 * Omistaja 6.9.2026: *"Lentokonekohtauksessa paljon lähempi zoom aste
 * ja kamera seuraa konetta."* Lähempi kamera pyytää lennon aikana Z7:ää
 * ja lopussa Z8:aa PITKIN KOKO REITTIÄ, eikä laattamoottori hae mitään
 * ennen kuin kamera on jo siellä — sumea kuva ehtisi näkyä juuri siinä
 * kohdassa, jota katsotaan. Siksi avauslento pyytää reitin käytävän
 * koriin etukäteen (js/pallolauta/avaus.js valmistele), kun
 * pergamenttiarkki on vielä ruudulla.
 *
 * KÄYTÄVÄ ON KAPEA. Kamera pysyy koneen päällä, joten reitin ympäriltä
 * riittää yksi laatta joka suuntaan; koko maailman tasot 0–3 ovat jo
 * korissa (esilatauksenLaatat yllä). Lontoo → Ateena (kaari 21,5°,
 * 24 näytettä) antaa laskettuna 33 laattaa tasolla 6 ja 53 tasolla 7,
 * päällekkäiset karsittuina, plus 9 laskeutumislaattaa tasolla 8 — noin
 * 1,4 Mt, kun koko maailman taso 7 (21 845 laattaa) olisi satoja
 * megatavuja.
 */
/** Lentoreitin käytävän laattatasot (Z6 lennon alkuun, Z7 keskelle). */
export const REITIN_ESILATAUSTASOT = [6, 7];
/** Laskeutumisen taso: kohdekaupungin ympäristö saapumisnäkymän tarkkuudella. */
export const REITIN_LASKEUTUMISTASO = 8;
/** Käytävän leveys: (2 · säde + 1)² laattaa jokaisen näytteen ympäriltä. */
export const REITIN_ESILATAUKSEN_SADE = 1;

/**
 * Reitin käytävän laattaosoitteet. `pisteet` on kaaren näytteitä
 * ({ lat, lon }), `tasot` laattatasot ja `sade` käytävän puolileveys
 * laattoina. Päällekkäiset karsitaan, joten sama laatta on listassa
 * kerran.
 */
export function reitinLaatat({
  pisteet = [], tasot = REITIN_ESILATAUSTASOT, sade = REITIN_ESILATAUKSEN_SADE,
  maxTaso = PALLO_LAATTATASO_MAX,
} = {}) {
  const osoitteet = [];
  const nahty = new Set();
  for (const taso of tasot) {
    const z = Math.min(taso, maxTaso);
    if (!(z >= 0)) continue;
    const n = 2 ** z;
    for (const p of pisteet) {
      if (!Number.isFinite(p?.lat) || !Number.isFinite(p?.lon)) continue;
      const keski = laatanKoordinaatit(p.lat, p.lon, z);
      for (let dy = -sade; dy <= sade; dy += 1) {
        for (let dx = -sade; dx <= sade; dx += 1) {
          const y = keski.y + dy;
          if (y < 0 || y >= n) continue;
          const x = ((keski.x + dx) % n + n) % n;
          const avain = `${z}/${x}/${y}`;
          if (nahty.has(avain)) continue;
          nahty.add(avain);
          osoitteet.push(pallonLaatta(x, y, z));
        }
      }
    }
  }
  return osoitteet;
}

let esilatausLahetetty = false;
/** Lista palvelutyöntekijälle; null, jos työntekijää ei ole. */
async function lahetaEsilataus(osoitteet, nav, raportoi) {
  const tyontekijat = nav?.serviceWorker;
  if (!tyontekijat || !osoitteet.length) return null;
  const rekisteri = await Promise.resolve(tyontekijat.ready).catch(() => null);
  const kohde = tyontekijat.controller ?? rekisteri?.active ?? null;
  if (!kohde) return null;
  const viesti = { tyyppi: 'esilataa-pallolaatat', kansio: PALLO_LAATTAKANSIO, osoitteet };
  if (raportoi && globalThis.MessageChannel) {
    const kanava = new MessageChannel();
    kanava.port1.onmessage = (e) => raportoi(e.data ?? null);
    kohde.postMessage(viesti, [kanava.port2]);
  } else {
    kohde.postMessage(viesti);
  }
  return osoitteet.length;
}

/**
 * Lähettää esilatauslistan palvelutyöntekijälle. Palauttaa lähetettyjen
 * osoitteiden määrän, tai null jos työntekijää ei ole (yhden tiedoston
 * versio, kehitys ilman SW:tä). Lähetetään kerran per istunto —
 * työntekijä hakee laatat taustalla eikä peli jää odottamaan.
 *
 * `raportoi` saa työntekijän kuittauksen ({ pyydetty, uusia, jo, tavuja,
 * kesto }), kun se saapuu; savukkeet mittaavat sillä esilatauksen.
 */
export async function esilataaPallolaatat(kohta = {}, nav = globalThis.navigator, raportoi = null) {
  if (esilatausLahetetty || !nav?.serviceWorker) return null;
  esilatausLahetetty = true;
  const osoitteet = esilatauksenLaatat({ ...kohta, maxTaso: laattatasoMax(laattaluettelo) });
  const n = await lahetaEsilataus(osoitteet, nav, raportoi);
  if (n === null) esilatausLahetetty = false;
  return n;
}

/**
 * Avauslennon reitti koriin: käytävä kaaren ympärillä (REITIN_
 * ESILATAUSTASOT) ja kohdekaupungin ympäristö laskeutumisen tasolla.
 * Tämä EI ole kerran per istunto -lähetys kuten esilataaPallolaatat:
 * reitti tiedetään vasta lennon alkaessa, ja työntekijä ohittaa jo
 * korissa olevat osoitteet muutenkin.
 */
export async function esilataaLentoreitti(pisteet = [], nav = globalThis.navigator, raportoi = null) {
  if (!nav?.serviceWorker || !pisteet.length) return null;
  const maxTaso = laattatasoMax(laattaluettelo);
  const osoitteet = [
    ...reitinLaatat({ pisteet, maxTaso }),
    ...reitinLaatat({
      pisteet: pisteet.slice(-1), tasot: [REITIN_LASKEUTUMISTASO], maxTaso,
    }),
  ];
  return lahetaEsilataus(osoitteet, nav, raportoi);
}

/**
 * Tukeeko laite WebGL:ää? Pallo ei ole ilman sitä mahdollinen, ja
 * varapolku (tasokartta) on parempi kuin kaatunut kuori.
 */
export function webglTuettu(doc = document) {
  try {
    const kangas = doc.createElement('canvas');
    const gl = kangas.getContext('webgl2') ?? kangas.getContext('webgl');
    // Koekonteksti pois heti: selaimella on niitä vain kourallinen, ja
    // pallo tarvitsee seuraavan itselleen.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/*
 * MITKÄ NOSTOT OVAT PALLON LAATOISSA (pallolauta vaihe 3, karttapallo.md
 * luku 4.2: *"laattaversion vaihto nostotason mukana (luettelotiiviste:
 * mitkä nostot poltettu)"*). Pallon laatat ovat oma sarjansa, joka
 * poltetaan pyramidin nostotasosta (tools/tee-pallolaatat.mjs --nostot)
 * mahdollisesti eri hetkellä kuin pyramidi itse — joten pallo EI saa
 * lukea pyramidi.jsonin tiivisteitä (js/laattapyramidi.js
 * nostoOnPoltettu) vaan oman luettelonsa `nostotaso.nostot`-kenttää,
 * jonka työkalu kopioi sinne. Ilman kenttää (pelkkä pohjasarja) mikään
 * nosto ei ole laatoissa, ja pallo piirtää kaikki elävinä.
 *
 * VERTAILU ON TUNNUKSELLA, JA TIIVISTEELLÄ KUN SE ON. Tasokartan
 * tiiviste sisältää merkin lopullisen paikan nipun ja erottelun
 * jälkeen (js/fokuskohteet.js kohteenNostotiiviste), ja se on saman
 * ladonnan tulos, jolla laatta poltettiin — pallolla sama ladonta
 * ajetaan tyngästä (maanKohdemerkit), joten tiiviste on annettavissa;
 * pelkkä tunnus riittää päätökseen "laatoissa vai ei".
 */
export function pallonNostoOnPoltettu(tunnus, tiiviste = null) {
  const nostot = laattaluettelo?.nostotaso?.nostot;
  if (!nostot || !tunnus) return false;
  const poltettu = nostot[tunnus];
  if (!poltettu) return false;
  return tiiviste ? poltettu === tiiviste : true;
}

/** Onko pallon laatoissa lainkaan nostotasoa? */
export function pallonLaatoissaOnNostoja() {
  return Boolean(laattaluettelo?.nostotaso?.nostot
    && Object.keys(laattaluettelo.nostotaso.nostot).length);
}
/** Sukelluksen näkyvä leveys laudan yksikköinä (maan kokoinen ikkuna). */
export const PALLO_SUKELLUSLEVEYS = 620;
export const PALLO_LAUTA = 'maailmankartta';

/** Kaupungit pallolle: lauta → asteet, käyntitieto ja aloituskaupungit mukana. */
export function pallonKaupungit(pack, kaydyt = new Set()) {
  return (pack?.cities ?? []).map((c) => {
    const p = laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
    if (!p) return null;
    return { id: c.id, n: c.name, lat: p.lat, lon: p.lon, x: c.x, y: c.y, alku: Boolean(c.start), kayty: kaydyt.has(c.id) };
  }).filter(Boolean);
}

/**
 * Napautettu piste laudan koordinaatiksi: asteet → laudan (x, y). Null,
 * jos piste ei ole laudalla (napa-alueet julisteen ulkopuolella).
 */
export function sukelluskohta(lat, lon) {
  const p = projisoiLaudalle(PALLO_LAUTA, lon, lat);
  return p && Number.isFinite(p.x) && Number.isFinite(p.y) ? { x: p.x, y: p.y } : null;
}

let kirjastoLupaus = null;
/** Lataa Globe.gl kerran; toinen avaus käyttää samaa globaalia. */
export function lataaPallokirjasto(doc = document) {
  if (globalThis.Globe) return Promise.resolve(globalThis.Globe);
  if (kirjastoLupaus) return kirjastoLupaus;
  kirjastoLupaus = new Promise((ok, ei) => {
    const s = doc.createElement('script');
    s.src = PALLO_KIRJASTO;
    s.async = true;
    s.addEventListener('load', () => (globalThis.Globe ? ok(globalThis.Globe) : ei(new Error('Globe puuttuu'))));
    s.addEventListener('error', () => { kirjastoLupaus = null; ei(new Error('kirjasto ei latautunut')); });
    doc.head.appendChild(s);
  });
  return kirjastoLupaus;
}

/**
 * Pallon runko: Globe.gl-instanssi koteloon, pinta laattamoottorilla
 * (luettelo ämpärissä) tai z4-tekstuurilla varana. Jaettu valikkopallon
 * (avaaPallo) ja pallolaudan (js/pallolauta/lauta.js) kesken — pinta ja
 * sen varapolku ovat yhdet.
 */
export function rakennaPallo(Globe, kotelo, laatat) {
  // Pelkkä pinnoite: ei pisteitä, nimiä, kaaria eikä renkaita (omistaja
  // 4.9.2026: "älä lisää mitään sen päälle"). Pelilaudalla PELIN merkit
  // lisätään lauta.js:ssä (Raamattu 5.9.2026: kartta laatoissa, peli päällä).
  const pallo = Globe()(kotelo)
    .width(kotelo.clientWidth).height(kotelo.clientHeight)
    .backgroundColor('rgba(0,0,0,0)')
    .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18);
  if (laatat && pallo.globeTileEngineUrl) {
    pallo.globeTileEngineUrl(pallonLaatta).globeTileEngineMaxLevel(laattatasoMax(laatat));
    asennaLaatunosto(pallo, kotelo);
    asennaNapakannet(pallo);
  } else {
    pallo.globeImageUrl(PALLO_TEKSTUURI);
  }
  return pallo;
}

/*
 * ======== LAATU PALAA, KUN LIIKE PYSÄHTYY ===========================
 *
 * OMISTAJA 5.9.2026 (sanatarkasti): *"saako pallon piirtämän kuvan
 * röpeliäisyyttä pois vaikka sitten kun liike pysähtyy. Pallon koodi
 * selvästi huonontaa kuvaa nopeuden kustannuksella mutta jos siihen
 * saisi lisän mikä palauttaisi laadun kun vieritys pysähtyy"*.
 *
 * MISTÄ RÖPELIÄISYYS TULEE. Globe.gl:n laattamoottori valitsee tason
 * pelkästä korkeudesta: taso t, kun 8/2^t ≤ korkeus (thresholds-
 * taulukko), riippumatta ruudun pikseleistä. Korkeudella 0,35 se on taso
 * 5 = 22,7 px/aste; iPhonen pystyruutu (1 170 laitepikseliä, näkyvä
 * kaista ≈ 25° × korkeus) tarvitsisi tason 7–8. Kuva venyy siis 3–5-
 * kertaiseksi ja lisäksi kirjasto piirtää enintään kahdella pikselillä
 * css-pikseliä kohden (setPixelRatio(min(2, dpr)), iPhone on 3) ilman
 * anisotrooppista suodatusta — reunat rakeistuvat ja vinot laatat
 * sumenevat.
 *
 * MITÄ TEHDÄÄN. Kaksi laatutilaa, joita vaihdetaan laattamoottorin
 * updatePov-koukussa (kirjasto kutsuu sitä joka kehys kameralla):
 *   LIIKE  — kirjaston oletuskynnykset ja pikselisuhde ≤ 2: kevyt,
 *            pyörii sulavasti (omistaja: "pyörii uskomattoman sulavasti").
 *   LEPO   — kun kamera ei ole liikkunut LAATU_LEPOVIIVE_MS:ään: kynnykset
 *            kerrotaan laitteen ruudun mukaan (taso, jolla laatan pikseli
 *            ≈ laitepikseli / LAATU_TERAVYYS), pikselisuhde koko dpr:ään
 *            (≤ 3) ja laattojen tekstuureille anisotrooppinen suodatus.
 * Kynnysten kerroin: taso t tarvitaan, kun 2^t ≥ 0,0263 · H / korkeus (H =
 * ruudun korkeus laitepikseleinä, fov 50°), eli kirjaston 8/2^t-kaavaan
 * kerroin H / 304. Liikkeessä karkeammat laatat jäävät pohjalle (kirjasto
 * pitää matalammat tasot), joten tason vaihto ei välähdä tyhjää; levossa
 * tarkat laatat latautuvat päälle sitä mukaa kuin ne saapuvat.
 *
 * ── MIKSI KERROIN ON RUUDUN KORKEUDESTA EIKÄ LEVEYDESTÄ ────────────
 * (mitattu 6.9.2026, omistaja työpöydältä: *"vielä röpelöistä,
 * varsinkin teksti"*)
 *
 * Globe.gl:n fov 50° on PYSTYSUUNNAN avauskulma, ja three.js:n
 * perspektiivikamera pitää sen kiinteänä kuvasuhteesta riippumatta:
 * leveämmällä ruudulla näkyy leveämpi kaista SAMALLA pikselitiheydellä.
 * Ruutupikseleitä astetta kohti on siis H / (53,4 · korkeus) sekä pysty-
 * että vaakasuunnassa — laatan venytys ei riipu ruudun leveydestä
 * lainkaan. Mitattu selaimessa 2000 × 1160 dpr 2 -ruudulla korkeudella
 * 0,0368: 550 css-px/aste pystyssä ja 550 (= 439 / cos 38°) vaakasuunnassa,
 * eli täsmälleen kaava. Leveyden lisääminen kynnykseen nostaisi tasoa
 * ilman yhtään lisättyä yksityiskohtaa ja nelinkertaistaisi laattamäärän,
 * joten kerroin lasketaan siitä, mitä TODELLA piirretään: kotelon korkeus
 * × lepotilan pikselisuhde (min(dpr, 3)).
 *
 * MITÄ LEVEÄ RUUTU SITTEN TEKEE: se vie kameran LÄHEMMÄS. Sama pyydetty
 * näkyvä leveys on työpöydällä korkeus 0,074 ja puhelimessa 0,29
 * (js/pallolauta/kamera.js korkeusLeveydesta jakaa kuvasuhteella), ja
 * lähimmässä sallitussa näkymässä (PALLOLAUDAN_SIIRTOLEVEYS 120 yks =
 * 3,6°) 2000 css-px leveä ruutu venyttää Z8:aa 4,8-kertaiseksi. Sitä ei
 * korjaa mikään kynnys: taso 8 on syvin, joka ämpärissä on. Poltettujen
 * nimien terävöinti sieltä eteenpäin vaatii tason 9 (venytys 2,4×) tai 10.
 *
 * Tason pudotus liikkeen alkaessa purkaa tarkat laatat (kirjaston oma
 * käytös); levossa ne haetaan uudestaan selaimen välimuistista. Se on
 * hinta sulavuudesta, jonka omistaja hyväksyi ("vaikka sitten kun liike
 * pysähtyy"). Reduced motion ei vaikuta: kyse on tarkkuudesta, ei
 * animaatiosta.
 */
/**
 * Kuinka kauan liikkeen on jatkuttava ennen kuin lepolaadusta luovutaan
 * (ms). Yksi hidas kehys tai pieni korjaus ei pudota tasoa: pudotus
 * purkaa tarkat laatat, ja edestakainen vaihto hakisi ne yhä uudestaan.
 */
export const LAATU_LIIKEVIIVE_MS = 120;
/*
 * TERÄVYYS = LAATAN PIKSELI ON LAITEPIKSELI (omistaja 6.9.2026 aamu:
 * *"vielä röpelöistä, varsinkin teksti"*). Levossa kynnys pyöristyy
 * kirjaston taulukossa aina ylöspäin, joten terävyys 1,0 takaa, että
 * laatta on VÄHINTÄÄN yhtä tarkka kuin ruutu (venytys 1,0…0,5). Vanha
 * 0,55 salli 1,8× venytyksen: mitattuna työpöydällä (2000 × 1160 dpr 2)
 * korkeus 0,30 jäi tasolle 7, vaikka taso 8 oli ämpärissä.
 *
 * YLEISKUVASSA ENTINEN ARVO. Kaukaa katsottuna pallon kaarevuus tuo
 * kuvaan reunat, joissa sama taso kattaa moninkertaisen alan: terävyys
 * 1,0 nostaisi koko pallon näkymän (korkeus 2,5) tasolle 5 eli 512
 * laattaan 128:n sijaan. Yli LAATU_KAUKORAJAN käytetään siksi entistä
 * 0,55:tä — siellä nimiä ei lueta, ja lähikuva on se, jota omistaja
 * katsoo. Mitatut laattamäärät: docs/moduulit/karttapallo.md luku 10.3.
 */
/** Levossa sallittu venytys lähikuvassa: 1 = laatan pikseli on laitepikseli. */
export const LAATU_TERAVYYS = 1;
/** Terävyys yleiskuvassa (kaarevuus tuo reunat kuvaan): entinen 0,55. */
export const LAATU_TERAVYYS_KAUKO = 0.55;
/** Lepotilan terävyys kameran korkeudesta (lähikuva vs. yleiskuva). */
export function laatuTeravyys(korkeus) {
  return Number.isFinite(korkeus) && korkeus > LAATU_KAUKORAJA ? LAATU_TERAVYYS_KAUKO : LAATU_TERAVYYS;
}
/** Pikselisuhteen katto levossa (iPhone 3) ja liikkeessä (kirjasto 2). */
export const LAATU_PIKSELISUHDE_LEPO = 3;
export const LAATU_PIKSELISUHDE_LIIKE = 2;
/** Kirjaston oma kynnystaulukko: taso t, kun 8/2^t ≤ korkeus. */
export const laattakynnykset = (kerroin = 1) => Array.from({ length: 30 }, (_, t) => (8 * kerroin) / 2 ** t);
/**
 * Lepotilan kynnyskerroin ruudun korkeudesta laitepikseleinä: 2^t ≥
 * 0,0263 · H / korkeus ⇔ 8k/2^t ≤ korkeus, kun k = H/304. Vähintään 1
 * (ei koskaan karkeampi kuin kirjasto).
 */
/*
 * NAPAKERROIN (omistaja 5.9.2026 klo 21.25, Huippuvuoret työpöydällä:
 * *"ihmeen hitaasti lataa tuolla ylhäällä teräviä laattoja"*).
 * Laattamoottori valitsee tason pelkästä korkeudesta, mutta Mercator-
 * laatta kattaa leveysasteella φ vain cos φ -osan päiväntasaajan
 * laatan leveydestä: 80° N:ssä yhden tason laatoissa on kuusinkertainen
 * pikselitiheys pallon pintaa kohti, ja sama näkymä tarvitsee
 * satoja laattoja (mitattu: napanäkymä tasolla 6 haki 834 laattaa).
 * Kynnykset kerrotaan kameran leveysasteen kosinilla, jolloin navan
 * lähellä valitaan karkeampi taso, jonka terävyys ruudulla on sama —
 * ja laattoja haetaan murto-osa. Alaraja pitää tason järkevänä aivan
 * navan vieressä (napakannet peittävät 83,7°:n yläpuolen).
 */
export const NAPAKERROIN_MIN = 0.16;
/** Kameran leveysasteesta kerroin laattakynnyksiin (1 päiväntasaajalla). */
export function napakerroin(lat) {
  if (!Number.isFinite(lat)) return 1;
  return Math.max(NAPAKERROIN_MIN, Math.cos((lat * Math.PI) / 180));
}
/** Leveysasteen muutos, joka päivittää kynnykset liikkeessä (astetta). */
export const NAPAKERROIN_ASKEL = 4;

export function lepokerroin(korkeusPx, teravyys = LAATU_TERAVYYS) {
  return Math.max(1, (teravyys * korkeusPx) / 304);
}

/** Globe.gl:n laattamoottori pallon scenestä (Group, jolla thresholds). */
function laattamoottori(pallo) {
  let moottori = null;
  pallo.scene()?.traverse?.((o) => {
    if (!moottori && Array.isArray(o.thresholds) && typeof o.updatePov === 'function') moottori = o;
  });
  return moottori;
}

/*
 * ── TERÄVÄ TILA PAKOTETTUNA AJON AJAKSI ───────────────────────────
 *
 * Omistaja 5.9.2026 ilta, keksintölinssin ajo pallolla (sanatarkasti):
 * *"pidä kokoajan terävä tila päällä"*. Aikajana-ajo liikuttaa kameraa
 * lähes tauotta pysäkiltä toiselle, ja lepolaatu (asetaTila) ehtisi
 * päälle vain hetkeksi jokaisen ajon jälkeen — kuva olisi juuri
 * liikkeessä röpeliäinen, eli täsmälleen siinä kohdassa, jota
 * katsotaan.
 *
 * VIPU ON SAMA KUIN ?laatu=aina, mutta se kytketään ajon ajaksi eikä
 * istunnoksi: pyytäjiä lasketaan (pakotaPallonLaatu(true/false)), joten
 * kaksi päällekkäistä pyytäjää ei sammuta toistensa terävyyttä ja
 * linssin purku palauttaa laadun aina. Muutos ilmoitetaan asennetuille
 * laatunostoille kuuntelijoilla — pallo-olioon ei tarvitse päästä
 * käsiksi, ja kutsuja (js/aikajana.js) pysyy Globe.gl:stä erossa.
 */
/** Montako pyytäjää haluaa terävän tilan juuri nyt. */
let laatuPakotukset = 0;
/** Asennetut laatunostot: kukin kuuntelee pakotuksen vaihdoksia. */
const laatuKuuntelijat = new Set();

/** Onko terävä tila pakotettuna päälle (savukkeet ja vartijat). */
export function pallonLaatuPakotettu() {
  return laatuPakotukset > 0;
}

/**
 * Pyytää tai vapauttaa terävän tilan. Palauttaa uuden tilan.
 * Vapautus ei mene koskaan nollan alle: kahdesti purettu ajo ei
 * kytke laatua pois toisen pyytäjän alta.
 *
 * @param {boolean} paalla true = pyydä, false = vapauta
 * @returns {boolean} onko terävä tila pakotettuna
 */
export function pakotaPallonLaatu(paalla) {
  const ennen = laatuPakotukset > 0;
  laatuPakotukset = Math.max(0, laatuPakotukset + (paalla ? 1 : -1));
  const nyt = laatuPakotukset > 0;
  if (nyt !== ennen) for (const kuuntelija of laatuKuuntelijat) kuuntelija(nyt);
  return nyt;
}

/**
 * Asentaa laatutilat laattamoottoriin. Palauttaa purkajan. Ei tee
 * mitään, jos moottoria ei löydy (kirjaston sisäinen muoto vaihtunut) —
 * pallo toimii silloin kirjaston oletuslaadulla.
 */
export function asennaLaatunosto(pallo, kotelo, ikkuna = globalThis) {
  /*
   * Kirjasto kokoaa scenen vasta ensimmäisellä kehyksellä, joten heti
   * rakentamisen jälkeen moottoria ei vielä ole: yritetään uudestaan
   * pienin välein, kunnes se löytyy (tai luovutetaan 10 s:n jälkeen).
   */
  let purkaja = () => {};
  let yritys = 0;
  const yrita = () => {
    const moottori = laattamoottori(pallo);
    if (moottori) { purkaja = kytkeLaatunosto(moottori, pallo, kotelo, ikkuna); return; }
    if (++yritys < 100) ikkuna.setTimeout(yrita, 100);
  };
  yrita();
  return () => purkaja();
}

function kytkeLaatunosto(moottori, pallo, kotelo, ikkuna) {
  const dpr = ikkuna.devicePixelRatio || 1;
  /*
   * KOKEILUVIPU (omistaja 5.9.2026: "kokeile pyörisikö vieritys sillä
   * korkeammalla tarkkuudella joka kytkeytyy nyt päälle vasta kun liike
   * loppuu"): ?laatu=aina tai ratas → levon kynnykset ja pikselisuhde
   * pysyvät päällä myös liikkeessä (js/ui-apurit.js laatuAinaPaalla).
   */
  const aina = () => laatuAinaPaalla(ikkuna) || laatuPakotukset > 0;
  const renderer = pallo.renderer?.();
  const maxAniso = renderer?.capabilities?.getMaxAnisotropy?.() ?? 1;
  const alkuperainen = moottori.updatePov;
  const lepokerros = luoLepokerros({
    pallo, kotelo, ikkuna, renderer, laattataso: () => moottori.level,
  });
  let lepo = false;
  let edellinen = null;
  let kamera = null;
  let lepoAjastin = 0;
  const ajastimet = new Set();

  let kynnysLat = 0;
  let kynnysTeravyys = LAATU_TERAVYYS;
  const kameranNakyma = () => pallo.pointOfView?.() ?? null;
  /*
   * Kertoimen H on se, mitä TODELLA piirretään: kotelon korkeus kertaa
   * lepotilan pikselisuhde (dpr yli 3:n ei kasvata piirtopuskuria, joten
   * pelkkä dpr yliarvioisi tarpeen). Ruudun LEVEYS ei ole kaavassa —
   * perustelu ja mittaus ylempänä (fov on pystysuunnan avauskulma).
   */
  const piirtokorkeus = () => kotelo.clientHeight * Math.min(dpr, LAATU_PIKSELISUHDE_LEPO);
  const asetaTila = (lepoon) => {
    lepo = lepoon;
    if (aina()) lepoon = true;
    const nakyma = kameranNakyma();
    kynnysLat = Number.isFinite(nakyma?.lat) ? nakyma.lat : 0;
    const teravyys = laatuTeravyys(nakyma?.altitude);
    kynnysTeravyys = teravyys;
    const kerroin = (lepoon ? lepokerroin(piirtokorkeus(), teravyys) : 1) * napakerroin(kynnysLat);
    moottori.thresholds = laattakynnykset(kerroin);
    const suhde = Math.min(dpr, lepoon ? LAATU_PIKSELISUHDE_LEPO : LAATU_PIKSELISUHDE_LIIKE);
    if (renderer && renderer.getPixelRatio?.() !== suhde) renderer.setPixelRatio(suhde);
  };
  /** Laattojen tekstuureille anisotrooppinen suodatus (kerran per laatta). */
  const teroita = () => {
    if (maxAniso <= 1) return;
    moottori.traverse((o) => {
      const map = o.material?.map;
      if (map && map.anisotropy !== maxAniso) { map.anisotropy = maxAniso; map.needsUpdate = true; }
    });
  };
  /*
   * Kirjasto kutsuu updatePovia vain, kun kamera liikkuu (controlsin
   * change ja pointOfView), ei joka kehys — lepo todetaan siis
   * ajastimella viimeisestä liikkeestä. Levossa moottorille annetaan
   * sama kamera uudestaan uusilla kynnyksillä, jotta se valitsee
   * tarkemman tason ja hakee laatat; terävöitys ajetaan vielä pari
   * kertaa, kun laatat ovat ehtineet saapua.
   *
   * KYNNYKSET LASKETAAN AINA UUDESTAAN, VAIKKA OLTAISIIN JO LEVOSSA
   * (mitattu 6.9.2026). Yksi hyppy (pointOfView kestolla 0: sukellus,
   * `?lauta`-palautus, aikajanan pysäkki) ei kestä LAATU_LIIKEVIIVE_MS:ää,
   * joten `lepo` ei ehdi kääntyä liikkeeksi — vanha `if (lepo) return`
   * jätti silloin edellisen näkymän kynnykset voimaan. Kynnykset
   * riippuvat kameran leveysasteesta (napakerroin) ja korkeudesta
   * (laatuTeravyys), joten hypyn jälkeen ne olivat väärät: mitattuna
   * hyppy korkeuteen 2,5 piti lähikuvan kertoimen ja haki tason 5 (1 024
   * laattaa) tason 4 (128) sijaan. Uudelleenlaskenta on 30 luvun taulukko.
   */
  const lepoon = () => {
    lepoAjastin = 0;
    if (!kamera) return;
    asetaTila(true);
    alkuperainen.call(moottori, kamera);
    // Sama lepo ajoittaa lepokerroksen (pyramidin laatat näkyvän päälle) —
    // kerros kootaan vasta AIDON levon jälkeen, ei raahauksen tauolla
    // (LEPOKERROS_LEPOVIIVE_MS ja sormivahti, ks. luoLepokerroksenAjoitus).
    lepokerros.levossa();
    for (const viive of [0, 800, 2500]) {
      const t = ikkuna.setTimeout(() => { ajastimet.delete(t); if (lepo) teroita(); }, viive);
      ajastimet.add(t);
    }
  };

  let liikeAlku = 0;
  moottori.updatePov = function laatuPov(kam) {
    if (kam?.position) {
      kamera = kam;
      const paikka = kam.position;
      if (!edellinen || edellinen.distanceToSquared(paikka) > 1e-10) {
        const nyt = ikkuna.performance?.now?.() ?? Date.now();
        if (!edellinen || !lepoAjastin) liikeAlku = nyt;
        // Lepokerros pois HETI liikkeen alkaessa (ei LAATU_LIIKEVIIVE_MS:n
        // jälkeen) ja ilman häivytystä: ensimmäisestä liikekehyksestä
        // alkaen pallo piirtyy täsmälleen kuten ennen kerrosta (omistaja
        // 6.9.2026 ilta, ks. LEPOKERROS JA LIIKE alempana).
        lepokerros.piilota();
        edellinen = paikka.clone();
        if (lepo && nyt - liikeAlku >= LAATU_LIIKEVIIVE_MS) asetaTila(false);
        else {
          /*
           * Napakerroin ja terävyys seuraavat kameraa myös liikkeessä.
           * YKSI HYPPY EI EHDI LIIKKEEKSI, mutta sen jälkeen kynnykset
           * ovat väärät: mitattu 6.9.2026, hyppy lähikuvasta korkeuteen
           * 2,5 haki tason 5 (1 024 laattaa) vanhoilla kynnyksillä ennen
           * kuin lepo korjasi sen tasoon 4 (256). Korkeuden vaihtuminen
           * yleiskuvan puolelle (laatuTeravyys) korjaa sen heti.
           */
          const nakyma = kameranNakyma();
          const lat = Number.isFinite(nakyma?.lat) ? nakyma.lat : 0;
          if (Math.abs(lat - kynnysLat) >= NAPAKERROIN_ASKEL
            || laatuTeravyys(nakyma?.altitude) !== kynnysTeravyys) asetaTila(lepo);
        }
        ikkuna.clearTimeout(lepoAjastin);
        lepoAjastin = ikkuna.setTimeout(lepoon, LAATU_LEPOVIIVE_MS);
      }
    }
    return alkuperainen.call(this, kam);
  };
  asetaTila(false);
  /*
   * PAKOTUS VAIKUTTAA HETI (pakotaPallonLaatu): kynnykset ja
   * pikselisuhde asetetaan uudestaan samasta liike/lepo-tilasta, ja
   * moottorille annetaan sama kamera, jotta se valitsee tarkemman
   * tason ja hakee laatat odottamatta seuraavaa liikettä. Vapautus
   * palauttaa saman tilan ilman pakotusta.
   */
  const pakotus = () => {
    asetaTila(lepo);
    if (kamera) alkuperainen.call(moottori, kamera);
    teroita();
  };
  laatuKuuntelijat.add(pakotus);
  // Kamera on jo paikallaan asennettaessa (kirjasto asetti sen ennen
  // kuin moottori löytyi): ensimmäinen lepo ilman liikettä.
  kamera = pallo.camera?.() ?? null;
  if (kamera) lepoAjastin = ikkuna.setTimeout(lepoon, LAATU_LEPOVIIVE_MS);
  return () => {
    laatuKuuntelijat.delete(pakotus);
    ikkuna.clearTimeout(lepoAjastin);
    for (const t of ajastimet) ikkuna.clearTimeout(t);
    lepokerros.pura();
    moottori.updatePov = alkuperainen;
  };
}

/*
 * ======== NAPAKANNET: KIRJASTON SAUMA JA LAKKI PIILOON =============
 *
 * OMISTAJA 5.9.2026 klo 15 Suomen aikaa, kuvakaappaus Huippuvuorilta:
 * *"Miksi hattu näkyy?"* — napaa katsottaessa pallolla oli vaalea lakki
 * ja sen reunalla katkoviivamainen tumma rengas.
 *
 * SYY EI OLE LAATTOJEN SISÄLLÖSSÄ. Sarjan b laatat mitattiin puhtaiksi
 * 5.9. klo 17.30 (84–85° on tasaista merisävyä 201,194,175, ei tummia
 * pikseleitä). Kumpikin vaiva on kirjaston geometriaa. Lakki: Web
 * Mercator loppuu 85,05°:een, ja sen yläpuolelle Globe.gl venyttää tason
 * 0 laatan koko pallon kokoisena pallopintana (säde 99, thetaLength π)
 * VALAISEMATTOMALLA materiaalilla, kun laattaverkot ovat säteellä 100 ja
 * valaistuja — siitä lakin oma kirkkaus. Rengas: laattaverkkojen
 * ylimpien rivien sauma (mitattu leveysaste alla). Laattojen uudelleen
 * polttaminen ei auta kumpaankaan, eikä pallon oma väri (globeMaterial,
 * mitattu 5.9.) — kansi on ainoa keino.
 *
 * KANSI PÄÄLLE. Sauman päälle asetetaan kaksi ohutta pallokalottia,
 * pohjoinen ja etelä, laattojen omalla sävyllä: pohjoisessa Jäämeren
 * merisävy ja etelässä napajään sävy (samat, jotka
 * tools/tee-pallolaatat.mjs polttaa laattoihin, MERI_SAVY/JAA_SAVY).
 *
 * RENKAAN LEVEYSASTE MITATTIIN, EI ARVATTU (5.9.2026 illalla). Napa-
 * näkymään piirrettiin väriraidat 83,0–85,5°:lle ja kuvan säteittäinen
 * kirkkausprofiili laskettiin pikseleistä: tumma rengas on 83,7–84,25°
 * (kirkkaus putoaa 206 → 184), ei 85°:ssä. Se on siis laattaverkkojen
 * ylimpien rivien SAUMA — Mercatorin laattarivien rajat osuvat lähelle
 * 84,01° ja 83,75° — ja se näkyy juuri siellä siksi, että kartta loppuu
 * 84° N:ään ja sen yläpuolinen täyte on tasaista merta: seassa ei ole
 * mitään, mikä peittäisi sauman. Kansi alkaa siksi 83,7°:sta, joka on
 * renkaan alapuolella mutta yhä Grönlannin pohjoiskärjen (83,67°),
 * Huippuvuorten (80,8°) ja Frans Joosefin maan (81,9°) yläpuolella.
 * Mercatorin oma raja 85,05° jää saman kannen alle.
 *
 * MATERIAALI TULEE LAATOILTA, EI VALITA ITSE (mitattu 5.9.2026 illalla,
 * kaksi kaappausta samasta näkymästä). Kirjaston valot ovat
 * AmbientLight 0,8 × π ja DirectionalLight suoraan pohjoisnavan päältä,
 * joten laatat ovat navalla n. 1,4-kertaisia omaan sävyynsä nähden.
 * Valaisematon kansi (MeshBasicMaterial) samalla sävyllä piirtyi siksi
 * selvänä TUMMANA kiekkona — uutena hattuna. Kun kansi tehdään sillä
 * materiaaliluokalla, jota laattaverkot itse käyttävät, se saa saman
 * valaistuksen ja häviää mereen kokonaan. Luokka luetaan siksi elävästä
 * laattaverkosta (kolmiulotteinen).
 */
/** Leveysaste, jonka navan puolella kansi peittää pinnan (mitattu). */
export const NAPAKANNEN_LEVEYS = 83.7;
/** Ulomman, puoliläpinäkyvän kannen lisäleveys asteina (pehmeä reuna). */
export const NAPAKANNEN_HAIVE = 0.4;
/** Ulomman kannen peitto (0–1): reuna häivyttyy laattoihin. */
export const NAPAKANNEN_HAIVEPEITTO = 0.4;
/** Kansi laattojen yläpuolelle: säde × tämä (ei z-taistelua). */
export const NAPAKANNEN_KOROTUS = 1.0015;
/** Pohjoinen kansi = Jäämeren merisävy laatoissa (MERI 201,194,175). */
export const NAPAKANSI_POHJOINEN = '#c9c2af';
/** Etelän kansi = napajään sävy laatoissa (JAA_SAVY 220,214,198). */
export const NAPAKANSI_ETELA = '#dcd6c6';

/**
 * THREE:n konstruktorit elävästä pallosta. Globe.gl 2.46:n UMD-paketti
 * ei vie THREE:a mihinkään globaaliin (se käyttää `window.THREE`ä vain,
 * JOS sivu on ladannut sen ensin), joten luokat luetaan niistä
 * objekteista, jotka kirjasto on itse tehnyt: laattamoottorin lapsista
 * löytyvät sekä laattaverkko (valaistu materiaali) että Mercatorin
 * ulkopuolen pohjapallo (valaisematon). Palauttaa null, jos moottoria
 * tai sen verkkoja ei vielä ole — kutsuja saa yrittää uudestaan.
 * Vienti on tarkoitettu myös pallolaudan omille kolmiulotteisille
 * osille (js/pallolauta/).
 */
export function kolmiulotteinen(pallo) {
  const moottori = laattamoottori(pallo);
  const lapset = moottori?.children ?? [];
  const verkko = lapset.find((o) => o.geometry && o.material?.type === 'MeshLambertMaterial');
  const pohja = lapset.find((o) => o.geometry && o.material?.type === 'MeshBasicMaterial');
  const malli = verkko ?? pohja;
  if (!malli) return null;
  // BufferGeometry on SphereGeometryn kantaluokka; attribuutin luokka ja
  // tekstuurin luokka luetaan elävästä laatasta (lepokerros rakentaa
  // oman verkkonsa ja kankaansa niillä).
  const BufferGeometry = Object.getPrototypeOf(malli.geometry.constructor.prototype)?.constructor ?? null;
  const tekstuurimalli = verkko?.material?.map ?? null;
  return {
    Mesh: malli.constructor,
    SphereGeometry: malli.geometry.constructor,
    BufferGeometry,
    BufferAttribute: malli.geometry.attributes?.position?.constructor ?? null,
    Texture: tekstuurimalli?.constructor ?? null,
    /** Elävän laatan tekstuuri: väriavaruus ja suodattimet kopioidaan siitä. */
    tekstuurimalli,
    /** Laattojen materiaali: sama valaistus kuin laatoilla. */
    LaattaMateriaali: (verkko ?? pohja).material.constructor,
    /** Valaisematon materiaali (kalvot, harsot). */
    PerusMateriaali: (pohja ?? verkko).material.constructor,
    /** Onko laattaverkko jo olemassa (valaistu materiaali käytettävissä). */
    laatatValmiit: Boolean(verkko),
    /**
     * Ryhmä, johon pallon omat osat lisätään: laattamoottorin ISÄ.
     * Moottori purkaa ja rakentaa omat lapsensa tason vaihtuessa, joten
     * sen sisään ei jätetä mitään; isä on pallon ryhmä, jolla on sama
     * koordinaatisto (napa +Y) ja sama muunnos kuin laatoilla.
     */
    juuri: moottori.parent ?? pallo.scene(),
    moottori,
  };
}

/**
 * Asentaa napakannet laattamoottorin päälle. Palauttaa purkajan. Kuten
 * laatunosto: kirjasto kokoaa scenensä vasta ensimmäisillä kehyksillä,
 * joten yritetään pienin välein, kunnes laattaverkko löytyy (tai
 * luovutetaan 10 s:n jälkeen — silloin pallo piirtyy kuten ennen).
 */
export function asennaNapakannet(pallo, ikkuna = globalThis) {
  let purkaja = () => {};
  let yritys = 0;
  const yrita = () => {
    const kolmi = kolmiulotteinen(pallo);
    // Vaaditaan laattaverkko: pelkän pohjapallon materiaali on
    // valaisematon, ja kansi näkyisi tummana kiekkona (ks. yllä).
    if (kolmi?.laatatValmiit) { purkaja = lisaaNapakannet(kolmi, pallo.getGlobeRadius()); return; }
    if (++yritys < 100) ikkuna.setTimeout(yrita, 100);
  };
  yrita();
  return () => purkaja();
}

/** Kaksi kantta × (peittävä + häivyttyvä reuna) pallon ryhmään. */
function lisaaNapakannet(kolmi, sade) {
  const { Mesh, SphereGeometry, LaattaMateriaali, juuri } = kolmi;
  const asteina = (a) => (a * Math.PI) / 180;
  const tehdyt = [];
  const kansi = (etela, savy, haive) => {
    const pituus = asteina(90 - NAPAKANNEN_LEVEYS + (haive ? NAPAKANNEN_HAIVE : 0));
    // Kalotin theta lasketaan pohjoisnavasta (+Y): etelä on toisessa päässä.
    const alku = etela ? Math.PI - pituus : 0;
    const korotus = NAPAKANNEN_KOROTUS + (haive ? 0.0005 : 0);
    const muoto = new SphereGeometry(sade * korotus, 64, 8, 0, Math.PI * 2, alku, pituus);
    const materiaali = new LaattaMateriaali({ color: savy });
    if (haive) {
      // Sama sävy kuin peittävässä kannessa, joten kaksinkertainen
      // piirto ei muuta väriä — vain uloin 0,4° liukuu laattoihin.
      materiaali.transparent = true;
      materiaali.opacity = NAPAKANNEN_HAIVEPEITTO;
      materiaali.depthWrite = false;
    }
    const verkko = new Mesh(muoto, materiaali);
    verkko.userData.napakansi = true;
    // Kansi ei ota kosketusta vastaan: pelin merkit ja onGlobeClick
    // toimivat kuten ennen (kirjasto säteenjäljittää pallon lapsia).
    verkko.raycast = () => {};
    juuri.add(verkko);
    tehdyt.push(verkko);
  };
  kansi(false, NAPAKANSI_POHJOINEN, false);
  kansi(false, NAPAKANSI_POHJOINEN, true);
  kansi(true, NAPAKANSI_ETELA, false);
  kansi(true, NAPAKANSI_ETELA, true);
  return () => {
    for (const verkko of tehdyt) {
      juuri.remove(verkko);
      verkko.geometry?.dispose?.();
      verkko.material?.dispose?.();
    }
    tehdyt.length = 0;
  };
}

/*
 * ======== LEPOKERROS: LEVOSSA PALLO ON YHTÄ TERÄVÄ KUIN TASOKARTTA ==
 *
 * OMISTAJA 6.9.2026 iltapäivä (Raamattu, PALLO LEVOSSA YHTA TERAVA KUIN
 * TASOKARTTA, sanatarkasti): *"kartta oli ennen palloa paljon
 * terävämpi, eli ongelma on pallon renderöinnissä. ainakin kun liike
 * on pysäytetty, kuva pitäisi renderöityä samalla tarkkuudella kuin 2d
 * kartassa."*
 *
 * MISTÄ ERO TULEE (mitattu 6.9.2026). Pallon laatat ovat Web Mercator
 * -sarja, joka on poltettu tasokartan pyramidista TASOA KARKEAMMASTA
 * lähteestä (tools/tee-pallolaatat.mjs: Z8 ← z7) ja pakattu jpeg-
 * laaduksi 80. Päiväntasaajalla Z8 on 182 px/aste, kun pyramidin z7 on
 * 240 px/aste; ja jokainen pallon pikseli on kulkenut kahden
 * uudelleennäytteistyksen läpi (Miller → Mercator työkalussa, Mercator-
 * laatta → pallon kaareva pinta näytönohjaimessa) ennen kuin se on
 * ruudulla. Tasokartta piirtää saman pyramidin webp-laatat kertaalleen
 * ja 1:1, joten se on terävämpi vaikka lähde on sama.
 *
 * MITÄ TEHDÄÄN. Kun kamera pysähtyy (sama lepo, joka nostaa laattojen
 * tason — kytkeLaatunosto, LAATU_LEPOVIIVE_MS), pallo kokoaa NÄKYVÄN
 * ALUEEN päälle lepokerroksen: pyramidin omista laatoista (pohja, viiva-
 * ja nostotaso samassa järjestyksessä kuin tasokartalla) kootaan yksi
 * kangas ja se piirretään pallon pinnalle tiheänä leveys-pituus-verkkona,
 * jonka UV-koordinaatit ovat Millerin projektiossa — kerros osuu
 * täsmälleen samaan paikkaan kuin pallon oma pinta, koska molemmat ovat
 * saman pyramidin kuvia samasta versiosta. Kerros HÄIPYY pehmeästi päälle
 * ja pois heti kun liike alkaa (Raamattu: KAIKKI LIIKE ANIMOIDAAN
 * PEHMEÄSTI); liikkeessä pallo on täsmälleen entinen.
 *
 * SAMA LÄHDE, SAMA OSOITE. Laattojen osoitteet, luettelo ja harvan tason
 * bittikartat kysytään tasokartan omalta moduulilta
 * (js/laattapyramidi.js haePyramidinLuettelo, pyramidinKerrostasot,
 * pyramidinLaattaUrl, pyramidinLaattaOlemassa) — pallo ei rakenna
 * osoitetta itse, joten kaksi kaavaa ei voi eriytyä.
 *
 * VERSIOVAHTI. Kerros kootaan VAIN, kun pallon laattasarja on poltettu
 * täsmälleen siitä pyramidista, jota nyt luetaan (laatat.json versio,
 * viivat, nostot = pyramidi.json versio, viivataso, nostotaso;
 * lepokerroksenKerrokset). Muuten levossa näkyisi eri kartta kuin
 * liikkeessä — nosto poltettuna toisessa ja elävänä toisessa — ja
 * kerros jää pois, kunnes sarjat ovat samat.
 *
 * MUISTI JA LATAUS. Vain näkyvät laatat (ruudun 7 × 7 näytepistettä
 * pallon pinnalla + LEPOKERROS_VARA_AST reunus), laattamäärälle katto
 * (lepokerroksenLaattakatto, ruudun koosta) ja kankaalle näytönohjaimen katto: jos taso
 * ei mahdu, otetaan karkeampi. Yleiskuvassa (korkeus yli
 * LEPOKERROS_KORKEUSRAJA) kerrosta ei koota lainkaan — siellä ei lueta
 * nimiä ja pallon kaarevuus veisi laattamäärän satoihin (ks.
 * LAATU_TERAVYYS_KAUKO). Purettu kuva pidetään pienessä välimuistissa
 * (LEPOKERROS_KUVAKATTO), selaimen HTTP-välimuisti (immutable, vuosi)
 * on varsinainen kori. Liike kesken latauksen peruu kokoamisen
 * (sukupolvi): saapuvia kuvia ei enää piirretä.
 *
 * PIIRTOJÄRJESTYS: TÄSMÄLLEEN PINNAN SÄTEELLÄ, SYVYYSSIIRROLLA (omistaja
 * 6.9.2026 ilta, sanatarkasti: *"kun kuva tarkentuu, niin se zoomautuu
 * vähän sisään, mikä näkyy hyppynä. saako pois?"*). Ensimmäinen toteutus
 * nosti kerroksen säteelle 1,001 × pinta kuten merkit; kamera on
 * lähikuvassa vain korkeus × 100 yksikön päässä pinnasta, joten 0,1
 * yksikön nosto suurentaa kuvaa 1/(korkeus × 10) — korkeudella 0,09
 * laskettuna 1,1 %, mitattuna 1,3 % eli 3–5 laitepikseliä ruudun
 * laidoilla, ja häipyvä
 * kerros näytti zoomilta sisään (mittaus 6.9.2026 ilta, Chromium
 * 390 × 844 dpr 2: neljännesten siirtymä kerros→ilman dx ±3,0, dy −5,3
 * px). Nyt kerros on TÄSMÄLLEEN pinnan säteellä (LEPOKERROS_KOROTUS 1),
 * jolloin se ei siirrä yhtään pikseliä (mitattu ±0,1 px), ja
 * järjestys laattoihin nähden hoidetaan syvyyspuskurissa: materiaalin
 * polygonOffset vetää kerroksen LEPOKERROS_SYVYYSSIIRTO syvyysyksikköä
 * kameraa kohti (factor 0: vakio siirto, ei kaltevuustermiä, joka
 * pallon reunalla kasvaisi merkkien nostoa suuremmaksi). Miksi se
 * riittää: molemmat pinnat ovat pallon jänteitä, ja kerros voi jäädä
 * laatan alle vain oman jänteensä painuman verran, R(1 − cos(silmä/2)) —
 * 64 silmän vähimmäisverkolla (LEPOKERROS_RUUDUKKO_MIN) lähikuvassa
 * 3 · 10⁻⁶ ja kaukana 0,375°:n silmällä 5 · 10⁻⁴ yksikköä, kun
 * syvyyspuskurin askel (24 bittiä, near 0,05) on d² × 1,2 · 10⁻⁶ eli
 * 2 · 10⁻⁵ lähimmällä korkeudella 0,04 ja 4 · 10⁻³ korkeudella 0,6 —
 * painuma on aina alle puoli askelta, siirto 8 askelta. Merkit jäävät
 * päälle: 8 askelta on korkeudella 0,6 0,034 yksikköä, kun matalin
 * merkki (aihevalot ja napakannet 1,0015) on 0,15 yksikköä pinnasta;
 * reittien varjo 1,0018, reitit 1,002, helmet 1,0025, kaupunkipisteet
 * 1,003 ja html-merkit 1,004 (js/pallolauta/) vielä ylempänä. Vartio
 * tests/pallolepokerros.test.mjs laskee saman. Materiaali on laattojen
 * oma valaistu luokka (LaattaMateriaali), joten sävy on sama kuin
 * laatoilla (ks. napakansien mittaus), ja kerros kirjoittaa syvyyden:
 * se piirretään läpinäkyvien ensimmäisenä (renderOrder −1), jotta sen
 * päällä olevat läpinäkyvät kerrokset (linssin polygonit, napakannen
 * häive) testaavat syvyyttä sitä vasten eivätkä jää sen alle. Navat
 * rajataan napakansien alle (NAPAKANNEN_LEVEYS) ja kartta-ala pyramidin
 * rajaukseen (84° N…66° S).
 *
 * LEPOKERROS JA LIIKE (omistaja 6.9.2026 ilta, sanatarkasti: *"vieritys
 * ei ole jostain syystä enää niin sulavaa vaikka tarkkuus vieritys on
 * pois päältä ja kartta on röpelöinen vierityksen aikana"*). Mitattu
 * syy (6.9.2026 ilta, Chromium-savuke, raahaus jossa sormi pysähtyy
 * 350 ms:ksi): kerros koottiin samasta 260 ms:n levosta kuin laattataso
 * nousee, joten raahauksen mikrotauko käynnisti kokoamisen — kymmenien
 * laattojen purku, kankaan piirto ja 12–50 Mt:n tekstuurin vienti
 * näytönohjaimelle osuivat siihen kehykseen, jolla sormi lähti taas
 * liikkeelle (yksi kehys 1 117 ms, kun muut olivat 430 ms ohjelmisto-
 * piirrolla; ilman kerrosta 633 ms). Röpelö oli kahden kartan häive:
 * 1,001-säteinen kerros häipyi 150 ms liikkeessä laattojen päällä
 * suurennettuna, siis kahtena kuvana. Nyt (1) kerros kootaan vasta
 * AIDON levon jälkeen: LEPOKERROS_LEPOVIIVE_MS viimeisestä liikkeestä
 * ja vasta kun yksikään sormi tai hiiren nappi ei ole pohjassa kotelon
 * päällä (luoLepokerroksenAjoitus; raahauksen tauko ei siis koskaan
 * kokoa), (2) liikkeen alkaessa kerros poistetaan scenestä HETI ilman
 * häivytystä, jolloin jokainen liikekehys piirtyy täsmälleen kuten
 * ennen kerrosta, ja (3) tekstuuri viedään näytönohjaimelle heti
 * kokoamisen päätteeksi (renderer.initTexture) levossa, ei seuraavan
 * kehyksen kylkiäisenä. Laattamoottorin oma lepo (LAATU_LEPOVIIVE_MS,
 * kynnykset, pikselisuhde) on ennallaan — liikkeessä pallo on v1638.
 *
 * HYLÄTTY VARAKEINO: pallon oma Z9-sarja litteästä z8:sta. Pyramidissa ei
 * ole tasoa z8 (tasot 0–7, 2026-09-03a), joten Z9 olisi vain venytetty
 * z7 jpeg:nä — ei yhtään lisää yksityiskohtaa, ja neljä kertaa Z8:n
 * laattamäärä ämpäriin. Lepokerros lukee saman z7:n suoraan.
 */

/** Asennetut lepokerrokset pallo-instanssia kohti (savukkeet, lauta). */
const lepokerrokset = new WeakMap();
/** Pallon lepokerroksen kahva ({ mittarit, kokoa, piilota }) tai null. */
export function pallonLepokerros(pallo) {
  return lepokerrokset.get(pallo) ?? null;
}

/**
 * Lepokerroksen elinkaari yhdelle pallolle. Kutsutaan laatunoston
 * asennuksesta (kytkeLaatunosto): sama lepo, sama liike.
 */
function luoLepokerros({ pallo, kotelo, ikkuna, renderer, laattataso = () => NaN }) {
  const doc = kotelo.ownerDocument ?? ikkuna.document;
  const mittarit = {
    tila: 'ei', taso: null, laattoja: 0, kangas: null, verkko: null, kokoamisia: 0,
    pyyntoja: 0, syy: '', kestoMs: 0, alue: null, katto: null, mercatorTaso: null,
    /** Haettiinko pyramidi.json tästä (savukkeet laskevat sen lepokerroksen pyynnöksi). */
    luettelo: false,
  };
  const pyydetyt = new Set();
  /** url → Promise<HTMLImageElement|null>; vanhin karsitaan katon ylittyessä. */
  const kuvat = new Map();
  let sukupolvi = 0;
  let verkko = null;
  let pyramidi;
  const reduced = () => Boolean(ikkuna.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);

  const lataaKuva = (url) => {
    const oli = kuvat.get(url);
    if (oli) return oli;
    const lupaus = new Promise((ok) => {
      const kuva = new ikkuna.Image();
      // Kangas menee WebGL-tekstuuriksi: ilman CORS-lupaa se olisi
      // tahrittu eikä kelpaisi (ämpäri antaa pelin alkuperälle luvan).
      kuva.crossOrigin = 'anonymous';
      kuva.decoding = 'async';
      // Laattamoottori pyytää levossa satoja omia laattojaan samalta
      // palvelimelta; lepokerroksen laatat menevät selaimen jonossa ohi.
      kuva.fetchPriority = 'high';
      kuva.onload = () => ok(kuva);
      kuva.onerror = () => ok(null);
      kuva.src = url;
    });
    kuvat.set(url, lupaus);
    pyydetyt.add(url);
    mittarit.pyyntoja += 1;
    while (kuvat.size > LEPOKERROS_KUVAKATTO) kuvat.delete(kuvat.keys().next().value);
    return lupaus;
  };

  /**
   * Peittävyyden liuku päälle (ease-out), kirjaston oma silmukka piirtää
   * kehykset. Poisto (poista) nollaa __haive-merkin, jolloin kesken
   * oleva liuku päättyy hiljaa — pois ei häivytetä (LEPOKERROS JA LIIKE).
   */
  const haivyta = (materiaali, kohde, kesto) => {
    const alku = materiaali.opacity;
    if (!(kesto > 0)) { materiaali.opacity = kohde; return; }
    const t0 = ikkuna.performance?.now?.() ?? Date.now();
    const askel = () => {
      if (materiaali.__haive !== askel) return;
      const t = Math.min(1, ((ikkuna.performance?.now?.() ?? Date.now()) - t0) / kesto);
      const e = 1 - (1 - t) ** 3;
      materiaali.opacity = alku + (kohde - alku) * e;
      if (t < 1) ikkuna.requestAnimationFrame(askel);
    };
    materiaali.__haive = askel;
    ikkuna.requestAnimationFrame(askel);
  };

  const poista = (v) => {
    v.material.__haive = null;
    v.parent?.remove(v);
    v.geometry?.dispose?.();
    v.material?.map?.dispose?.();
    v.material?.dispose?.();
  };

  /**
   * Liike alkoi: kesken oleva kokoaminen raukeaa ja näkyvä kerros
   * poistetaan scenestä HETI, ilman häivytystä — seuraava kehys on jo
   * pelkkiä laattoja, täsmälleen kuten ennen kerrosta (LEPOKERROS JA
   * LIIKE). Kerros on kiinni pinnassa samassa paikassa kuin laatat, joten
   * poisto ei siirrä kuvaa; vain terävyys palaa laattojen tasolle.
   */
  const piilota = () => {
    sukupolvi += 1;
    ajoitus.liike();
    if (!verkko) return false;
    const v = verkko;
    verkko = null;
    mittarit.tila = 'piilossa';
    poista(v);
    return true;
  };
  const ajoitus = luoLepokerroksenAjoitus({ ikkuna, kokoa: () => kahva.kokoa() });
  /*
   * Sormivahti: pohjassa oleva osoitin kotelon päällä on raahaus, vaikka
   * kamera ei juuri nyt liikkuisi. Alas luetaan kotelosta, ylös ja
   * peruutus DOKUMENTISTA: kirjasto kaappaa kankaalle laskeutuneen
   * osoittimen (setPointerCapture), mutta html-merkkiin laskeutunut
   * sormi voi irrota kotelon ulkopuolella, eikä laskuri saa jäädä
   * pohjaan — silloin kerros ei kokoontuisi enää koskaan.
   */
  const sormiAlas = () => ajoitus.sormiAlas();
  const sormiYlos = () => ajoitus.sormiYlos();
  kotelo.addEventListener?.('pointerdown', sormiAlas);
  doc?.addEventListener?.('pointerup', sormiYlos);
  doc?.addEventListener?.('pointercancel', sormiYlos);

  const luovuta = (syy) => { mittarit.syy = syy; if (mittarit.tila === 'kokoaa') mittarit.tila = 'ei'; return false; };

  /** Kamera levossa: kokoa näkyvän alueen kerros ja häivytä se päälle. */
  const kokoa = async () => {
    sukupolvi += 1;
    const oma = sukupolvi;
    const pov = pallo.pointOfView?.();
    if (!pov || !Number.isFinite(pov.altitude)) return luovuta('ei kameraa');
    if (pov.altitude > LEPOKERROS_KORKEUSRAJA) return luovuta('yleiskuva');
    const W = kotelo.clientWidth;
    const H = kotelo.clientHeight;
    if (!(W > 0 && H > 0)) return luovuta('kotelo piilossa');
    const kolmi = kolmiulotteinen(pallo);
    if (!kolmi?.laatatValmiit || !kolmi.Texture || !kolmi.BufferGeometry || !kolmi.BufferAttribute) {
      return luovuta('kirjaston luokat puuttuvat');
    }
    if (pyramidi === undefined) {
      mittarit.luettelo = true;
      pyramidi = await haePyramidinLuettelo().catch(() => null);
      if (oma !== sukupolvi) return false;
    }
    const kerrokset = lepokerroksenKerrokset(laattaluettelo, pyramidi);
    if (!kerrokset) return luovuta('pallon sarja ja pyramidi eri versiota');
    const alku = ikkuna.performance?.now?.() ?? Date.now();

    // Näkyvä alue: säteenjäljitys ruudun 7 × 7 pisteestä pallon pinnalle.
    const naytteet = [];
    const N = LEPOKERROS_NAYTTEITA;
    for (let j = 0; j < N; j += 1) {
      for (let i = 0; i < N; i += 1) naytteet.push(pallo.toGlobeCoords((W * i) / (N - 1), (H * j) / (N - 1)));
    }
    const keski = pallo.toGlobeCoords(W / 2, H / 2);
    const alas = pallo.toGlobeCoords(W / 2, H / 2 + LEPOKERROS_MITTAMATKA_PX);
    if (!keski || !alas || !(Math.abs(keski.lat - alas.lat) > 1e-6)) return luovuta('keskipiste ei pallolla');
    // Ruudun tarve: laitepikseleitä astetta kohti keskellä (fov on pystykulma).
    const suhde = renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1);
    const tarvePxAste = (LEPOKERROS_MITTAMATKA_PX * suhde) / Math.abs(keski.lat - alas.lat);
    const rajaus = pyramidi.rajaus ?? pyramidi.arkki;
    const latMax = Math.min(NAPAKANNEN_LEVEYS, laudaltaAsteiksi(PALLO_LAUTA, 0, rajaus.y)?.lat ?? 90);
    const latMin = Math.max(-NAPAKANNEN_LEVEYS, laudaltaAsteiksi(PALLO_LAUTA, 0, rajaus.y + rajaus.h)?.lat ?? -90);
    const alue = lepokerroksenAlue(naytteet, pov.lng, { latMin, latMax });
    if (!alue) return luovuta('ei näytteitä pallolla');
    const laudanY = (lat) => projisoiLaudalle(PALLO_LAUTA, pov.lng, lat)?.y ?? NaN;
    const kangasKatto = Math.min(LEPOKERROS_KANGASKATTO, renderer?.capabilities?.maxTextureSize ?? LEPOKERROS_KANGASKATTO);
    const katto = lepokerroksenLaattakatto(W * H * suhde * suhde, pyramidi.laatta);
    const suunnitelma = lepokerroksenSuunnitelma({
      tasot: pyramidi.tasot, tarvePxAste, alue, laatta: pyramidi.laatta, arkki: pyramidi.arkki,
      projektio: pyramidi.projektio, laudanY, katto, kangasKatto,
    });
    if (!suunnitelma) return luovuta('alue ei mahdu kattoihin');
    const { taso, kartta } = suunnitelma;
    mittarit.katto = katto;
    mittarit.mercatorTaso = laattataso();
    if (!lepokerroksenTasoRiittaa(taso, laattataso(), pov.lat)) return luovuta(`pallon laatat jo tiheämmät (z${taso.z})`);
    const tasot = (pyramidinKerrostasot(taso.z) ?? [])
      .filter((t) => (t.nosto ? kerrokset.nosto : (t.viiva ? kerrokset.viiva : true)));
    if (!tasot.length) return luovuta('pyramidin tasoa ei ole');
    // Pallon sarjassa nostot ovat tällä tasolla laatoissa: ilman pyramidin
    // nostotasoa kerros PEITTÄISI ne — silloin ei kerrosta.
    if (kerrokset.nosto && pyramidi.nostotaso?.tasot?.includes(taso.z) && !tasot.some((t) => t.nosto)) {
      return luovuta('nostotaso ei käytettävissä');
    }

    mittarit.tila = 'kokoaa';
    mittarit.taso = taso.z;
    mittarit.alue = alue;
    const tyot = [];
    for (const kerros of tasot) {
      for (const laatta of kartta.laatat) {
        if (!pyramidinLaattaOlemassa(kerros, laatta.sarake, laatta.rivi)) continue;
        tyot.push(lataaKuva(pyramidinLaattaUrl(kerros, laatta.sarake, laatta.rivi)).then((kuva) => ({ kuva, laatta })));
      }
    }
    const tulokset = await Promise.all(tyot);
    if (oma !== sukupolvi) return false;

    // Kangas: laatat kerrosjärjestyksessä (pohja, viiva, nosto) omille paikoilleen.
    const kangas = doc.createElement('canvas');
    kangas.width = kartta.leveys;
    kangas.height = kartta.korkeus;
    const ctx = kangas.getContext('2d');
    if (!ctx) return luovuta('ei 2d-kontekstia');
    let piirretty = 0;
    for (const { kuva, laatta } of tulokset) {
      if (!kuva) continue;
      ctx.drawImage(kuva, laatta.x, laatta.y, laatta.w, laatta.h);
      piirretty += 1;
    }
    if (!piirretty) return luovuta('yhtään laattaa ei saatu');

    // Verkko ja tekstuuri.
    const nx = lepokerroksenSilmat(alue.lon1 - alue.lon0);
    const ny = lepokerroksenSilmat(alue.lat1 - alue.lat0);
    // Täsmälleen pinnan säteellä (LEPOKERROS_KOROTUS on 1): ei suurennosta.
    const sade = pallo.getGlobeRadius() * LEPOKERROS_KOROTUS;
    const puskurit = lepokerroksenVerkko({ alue, kartta, sade, nx, ny });
    const geometria = new kolmi.BufferGeometry();
    geometria.setAttribute('position', new kolmi.BufferAttribute(puskurit.paikat, 3));
    geometria.setAttribute('normal', new kolmi.BufferAttribute(puskurit.normaalit, 3));
    geometria.setAttribute('uv', new kolmi.BufferAttribute(puskurit.uvt, 2));
    geometria.setIndex(puskurit.indeksit);
    const tekstuuri = new kolmi.Texture(kangas);
    const malli = kolmi.tekstuurimalli;
    // Sama väriavaruus kuin laatoilla — muuten sävy hyppäisi levossa.
    if (malli && 'colorSpace' in malli) tekstuuri.colorSpace = malli.colorSpace;
    else if (malli && 'encoding' in malli) tekstuuri.encoding = malli.encoding;
    const webgl2 = Boolean(renderer?.capabilities?.isWebGL2);
    tekstuuri.generateMipmaps = webgl2;
    tekstuuri.minFilter = webgl2 ? THREE_LINEAR_MIPMAP_LINEAR : THREE_LINEAR;
    tekstuuri.magFilter = THREE_LINEAR;
    tekstuuri.wrapS = THREE_CLAMP;
    tekstuuri.wrapT = THREE_CLAMP;
    tekstuuri.anisotropy = renderer?.capabilities?.getMaxAnisotropy?.() ?? 1;
    tekstuuri.needsUpdate = true;
    // Vienti näytönohjaimelle nyt, levossa — ei seuraavan kehyksen
    // kylkiäisenä, joka voisi olla liikkeen ensimmäinen (LEPOKERROS JA LIIKE).
    renderer?.initTexture?.(tekstuuri);
    // Syvyyssiirto laattojen edelle; ks. PIIRTOJÄRJESTYS (miksi factor 0).
    const materiaali = new kolmi.LaattaMateriaali({
      map: tekstuuri, transparent: true, opacity: 0, depthWrite: true,
      polygonOffset: true, polygonOffsetFactor: 0, polygonOffsetUnits: LEPOKERROS_SYVYYSSIIRTO,
    });
    const uusi = new kolmi.Mesh(geometria, materiaali);
    uusi.renderOrder = -1;
    uusi.raycast = () => {};
    uusi.userData.lepokerros = true;
    if (verkko) poista(verkko);
    kolmi.juuri.add(uusi);
    verkko = uusi;
    mittarit.tila = 'nakyy';
    mittarit.laattoja = piirretty;
    mittarit.kangas = [kangas.width, kangas.height];
    mittarit.verkko = [nx, ny];
    mittarit.kokoamisia += 1;
    mittarit.kestoMs = Math.round((ikkuna.performance?.now?.() ?? Date.now()) - alku);
    mittarit.syy = '';
    haivyta(materiaali, 1, reduced() ? 0 : LEPOKERROS_HAIVE_SISAAN_MS);
    return true;
  };

  const kahva = {
    /** Kokoa heti (savukkeet ja vartijat); pelissä levossa() ajoittaa tämän. */
    kokoa: () => kokoa().catch((syy) => { mittarit.syy = String(syy?.message ?? syy); mittarit.tila = 'ei'; return false; }),
    /** Laattamoottorin lepo: kokoaminen aidon levon jälkeen (ajoitus). */
    levossa: () => ajoitus.levossa(),
    piilota,
    /** Mittarit savukkeille: tila, taso, laatat, pyynnöt ja niiden osoitteet. */
    mittarit: () => ({ ...mittarit, pyydetyt: [...pyydetyt], nakyvissa: Boolean(verkko), ajoitus: ajoitus.tila() }),
    pura: () => {
      sukupolvi += 1;
      ajoitus.pura();
      kotelo.removeEventListener?.('pointerdown', sormiAlas);
      doc?.removeEventListener?.('pointerup', sormiYlos);
      doc?.removeEventListener?.('pointercancel', sormiYlos);
      if (verkko) { poista(verkko); verkko = null; }
      kuvat.clear();
      mittarit.tila = 'purettu';
    },
  };
  lepokerrokset.set(pallo, kahva);
  return kahva;
}

/*
 * ======== TYÖPÖYTÄSELAIN: KAKSI SORMEA PANOROI, CMD ZOOMAA =========
 *
 * OMISTAJA 5.9.2026 klo 21: *"saisiko macin työpöytäselaimella
 * panoroinnin jos käyttää kahta sormea ja zoomaus olisi cmd pohjassa
 * kahdella sormella (nipistys eleen voi ottaa pois pöytäkoneelta)"*.
 *
 * Trackpadin kahden sormen pyyhkäisy ei ole selaimessa ele vaan
 * wheel-tapahtumien virta (deltaX, deltaY), ja OrbitControls tulkitsee
 * jokaisen wheelin zoomiksi — pallo siis loittoni, kun omistaja yritti
 * panoroida. Kotelo ottaa wheelin kiinni KAAPPAUSVAIHEESSA ennen
 * kirjastoa ja jakaa sen kahtia:
 *
 *   wheel ilman näppäintä          → PANOROINTI (kierto asteina)
 *   wheel + cmd (metaKey)          → zoom, kirjasto hoitaa kuten ennen
 *   wheel + ctrl                   → zoom (Windowsin tapa; ctrl-wheel on
 *                                    myös se, minkä trackpadin nipistys
 *                                    lähettää, joten nipistys jää zoomiksi
 *                                    ilman omaa nipistyskoodia)
 *
 * MIKSI CMD ON ZOOM: selain varaa itselleen ctrl+wheelin (sivun
 * zoomaus) ja macOS lähettää nipistyksen samana ctrl+wheelinä, joten
 * ctrl on jo "suurenna". Cmd on macin oma muokkausnäppäin ja vapaana;
 * omistajan pyytämä cmd-zoom istuu siis samaan kaavaan kuin selaimen
 * oma. Kosketuslaitteet eivät näe tästä mitään: sormieleet kulkevat
 * pointer-tapahtumina (sormiseuranta, tartunta, liuku) ja tämä
 * käsittelijä lukee vain wheeliä.
 */
/** Osoitinlaitteen panoroinnin tahti: 1 = pinta seuraa pyyhkäisyä 1:1. */
export const PANOROINNIN_HERKKYYS = 1;
/** Yksittäisen rullapykälän liuku (ms) — hyppy ei ole liikettä. */
export const RULLAN_LIUKU_MS = 120;
/** Tätä isompi pikseliaskel animoidaan (trackpadin virta menee suoraan). */
export const RULLAN_SUORA_RAJA = 40;
/** deltaMode 1 (rivi) pikseleinä ja deltaMode 2 (sivu) pikseleinä. */
export const RULLAN_RIVI_PX = 16;
export const RULLAN_SIVU_PX = 400;
/** Vertailuruutu, kun kutsuja ei kerro kotelon leveyttä (testit). */
export const RULLAN_VERTAILULEVEYS = 1000;
/** Globe.gl:n kameran oletusavauskulma (vrt. pallolauta/kamera.js PALLO_FOV). */
export const PALLON_FOV = 50;
/**
 * Panoroinnin leveysraja: napakannet alkavat 83,7°:sta
 * (NAPAKANNEN_LEVEYS), joten rullalla ei kiivetä kannen sisään. Sormen
 * oma kierto pitää kirjaston ±89,5°:n rajan (toGlobeCoords vastaa
 * sielläkin), tämä koskee vain rullaa.
 */
export const PANOROINNIN_LEVEYSRAJA = 85;
/**
 * Pituuspiirit kapenevat navoilla: sama pyyhkäisy pikseleinä on
 * napojen lähellä enemmän asteita (1/cos φ). Kerroin katkaistaan
 * 75°:seen, ettei askel karkaa äärettömäksi navalla.
 */
export const PANOROINNIN_KOHTISUORA_RAJA = 75;

/**
 * Rullan askel asteina: paljonko kameran keskipiste siirtyy, kun
 * osoitinlaite antaa (deltaX, deltaY) korkeudella `korkeus`.
 *
 * Askel skaalautuu korkeuden mukaan samalla kaavalla kuin pallolaudan
 * kamera (js/pallolauta/kamera.js korkeusLeveydesta): näkyvä leveys
 * asteina ≈ korkeus · 2 · tan(fov/2) · 180/π, ja yksi ruudun pikseli on
 * se jaettuna kotelon leveydellä. Matalalla askel on siis pieni ja
 * kaukaa katsottaessa suuri — pinta seuraa pyyhkäisyä samaa tahtia
 * riippumatta siitä, kuinka lähellä kamera on.
 *
 * Suunta: pyyhkäisy vie näkymää kuten sivun vieritys (deltaY > 0 =
 * etelään, deltaX > 0 = itään).
 */
export function rullanAskel(deltaX, deltaY, korkeus, {
  deltaMode = 0, leveysPx = RULLAN_VERTAILULEVEYS, lat = 0,
  fov = PALLON_FOV, herkkyys = PANOROINNIN_HERKKYYS,
} = {}) {
  const pikselia = deltaMode === 1 ? RULLAN_RIVI_PX : (deltaMode === 2 ? RULLAN_SIVU_PX : 1);
  const nakyva = Math.max(1e-4, korkeus) * 2 * Math.tan((fov / 2) * (Math.PI / 180)) * (180 / Math.PI);
  const k = (herkkyys * pikselia * nakyva) / Math.max(1, leveysPx);
  const kavennus = 1 / Math.cos((Math.min(PANOROINNIN_KOHTISUORA_RAJA, Math.abs(lat)) * Math.PI) / 180);
  return { dLat: -deltaY * k, dLng: deltaX * k * kavennus };
}

/**
 * Pallon eleet: sormiseuranta (nipistys ei ole napautus), sormessa
 * pysyvä kierto, irrotuksen jälkeinen liuku ja työpöytäselaimen rulla
 * (kaksi sormea panoroi, cmd zoomaa). Jaettu valikkopallon ja
 * pallolaudan kesken. Palauttaa sormien tilan (napautuksen hylkäys) ja
 * purkajan (liu'ut seis). Ensimmäinen sormi pysäyttää mahdollisen
 * itsepyörinnän (valikkopallo).
 */
export function asennaPallonEleet(pallo, kotelo, ui) {
  const ohjaimet = pallo.controls();
  /*
   * NIPISTYS EI OLE NAPAUTUS (omistajan bugiraportti 4.9.2026 ilta,
   * uusi iPhone: "Pallo häviää näkyvistä heti, kun koitan zoomata, eli
   * palaa takaisin peruskartalle"). Globe.gl:n napautustunnistus katsoo
   * vain yhden sormen liikettä: kahden sormen nipistyksessä ensimmäinen
   * irtoava sormi on liikkunut alle kynnyksen, ja kirjasto laukaisee
   * onGlobeClickin — peli sukelsi kesken zoomin. Sormia lasketaan
   * itse: kun toinen sormi laskeutuu, ele on nipistys, ja napautus
   * hylätään, kunnes kaikki sormet ovat irronneet ja hetki kulunut
   * (kirjaston oma click tulee pointerupin jälkeen).
   */
  const sormet = { alhaalla: 0, nipistys: false };
  kotelo.addEventListener('pointerdown', () => {
    ohjaimet.autoRotate = false;
    sormet.alhaalla += 1;
    if (sormet.alhaalla > 1) sormet.nipistys = true;
  });
  const irrota = () => {
    sormet.alhaalla = Math.max(0, sormet.alhaalla - 1);
    if (sormet.alhaalla === 0 && sormet.nipistys) setTimeout(() => { sormet.nipistys = false; }, 350);
  };
  kotelo.addEventListener('pointerup', irrota);
  kotelo.addEventListener('pointercancel', irrota);
  /*
   * SORMI PYSYY KARTAN KOHDASSA (omistajan havainto 4.9.2026 ilta:
   * "sormella liikutus ei ole synkassa kartan kanssa. Eli pallo liikkuu
   * eri tahtiin kuin sormi vierittää"). OrbitControls kiertää palloa
   * ruudun pikseleistä vakiokertoimella, ja Globe.gl skaalaa kertoimen
   * korkeudesta vain karkeasti (0,3 × korkeus) — pallo karkasi sormen
   * edelle. Kierto tehdään siksi itse Google Earthin tapaan: sormen
   * alla oleva pinnan piste otetaan talteen painalluksessa, ja joka
   * liikkeessä kameraa siirretään täsmälleen sen verran, että sama
   * piste on taas sormen alla (toGlobeCoords + pointOfView). Nipistys
   * ja hiiren rulla jäävät OrbitControlsille (zoom), yhden sormen
   * kierto sille ei. Kertoimen tarkka kaava jää varalle sitä hetkeä
   * varten, kun sormi on pallon ulkopuolella (tahdistaVeto).
   */
  const kamera = pallo.camera();
  const sade = pallo.getGlobeRadius();
  const tahdistaVeto = () => {
    const korkeus = Math.max(0.01, (kamera.position.length() - sade) / sade);
    ohjaimet.rotateSpeed = korkeus * Math.tan((kamera.fov / 2) * (Math.PI / 180)) / Math.PI;
  };
  tahdistaVeto();
  ohjaimet.addEventListener('change', tahdistaVeto);
  ohjaimet.enableRotate = false;
  let tartunta = null; // pinnan piste sormen alla painalluksessa
  const sormenKohta = (e) => {
    const r = kotelo.getBoundingClientRect();
    return pallo.toGlobeCoords(e.clientX - r.left, e.clientY - r.top);
  };
  kotelo.addEventListener('pointerdown', (e) => {
    tartunta = sormet.alhaalla === 1 ? sormenKohta(e) : null;
  });
  /*
   * LIIKE JATKUU SORMEN IRROTTUA (omistaja 5.9.2026: "Pallossa saisi olla
   * Google earth vieritys joka ei pääty heti kun sormi päästää irti").
   * Vedon aikana mitataan kulmanopeus (astetta/ms) viimeisten liikkeiden
   * keskiarvona; irrotuksen jälkeen pallo jatkaa samaan suuntaan ja
   * hidastuu eksponentiaalisesti (kitka), kunnes nopeus on alle
   * kynnyksen. Uusi kosketus pysäyttää liu'un heti. Reduced motion:
   * ei liukua.
   */
  const VAUHTI_KITKA = 0.0028; // 1/ms: nopeus puolittuu n. 250 ms:ssa
  const VAUHTI_KYNNYS = 0.0006; // astetta/ms
  const vauhti = { lat: 0, lng: 0, aika: 0, raf: 0 };
  ui.pallonVauhti = vauhti; // mittausta varten (savukkeet)
  const pysaytaLiuku = () => { if (vauhti.raf) cancelAnimationFrame(vauhti.raf); vauhti.raf = 0; };
  const liu = (edellinen) => {
    const nyt = performance.now();
    const dt = Math.min(50, nyt - edellinen);
    const pov = pallo.pointOfView();
    pallo.pointOfView({
      lat: Math.max(-89.5, Math.min(89.5, pov.lat + vauhti.lat * dt)),
      lng: pov.lng + vauhti.lng * dt,
      altitude: pov.altitude,
    }, 0);
    const vaimennus = Math.exp(-VAUHTI_KITKA * dt);
    vauhti.lat *= vaimennus; vauhti.lng *= vaimennus;
    if (Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) vauhti.raf = requestAnimationFrame(() => liu(nyt));
    else vauhti.raf = 0;
  };
  kotelo.addEventListener('pointerdown', () => { pysaytaLiuku(); vauhti.lat = 0; vauhti.lng = 0; });
  kotelo.addEventListener('pointermove', (e) => {
    if (!tartunta || sormet.alhaalla !== 1) return;
    const nyt = sormenKohta(e);
    if (!nyt) return;
    const pov = pallo.pointOfView();
    let dLng = nyt.lng - tartunta.lng;
    if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
    const dLat = nyt.lat - tartunta.lat;
    pallo.pointOfView({
      lat: Math.max(-89.5, Math.min(89.5, pov.lat - dLat)),
      lng: pov.lng - dLng,
      altitude: pov.altitude,
    }, 0);
    // Nopeus: liukuva keskiarvo, jotta yksittäinen nykäys ei määrää liukua.
    const aika = performance.now();
    const dt = Math.max(1, aika - (vauhti.aika || aika));
    if (vauhti.aika) {
      vauhti.lat = vauhti.lat * 0.6 + (-dLat / dt) * 0.4;
      vauhti.lng = vauhti.lng * 0.6 + (-dLng / dt) * 0.4;
    }
    vauhti.aika = aika;
  });
  const paasta = () => {
    tartunta = null;
    const seisahtunut = performance.now() - vauhti.aika > 150; // sormi pysähtyi ennen irrotusta
    if (!ui.reducedMotion && !seisahtunut && Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) {
      pysaytaLiuku();
      vauhti.raf = requestAnimationFrame(() => liu(performance.now()));
    }
    vauhti.aika = 0;
  };
  kotelo.addEventListener('pointerup', paasta);
  kotelo.addEventListener('pointercancel', paasta);
  /*
   * KAKSI SORMEA PANOROI, CMD ZOOMAA (omistaja 5.9.2026 klo 21; kaava ja
   * perustelu: rullanAskel yllä). Käsittelijä on KAAPPAUSVAIHEESSA:
   * OrbitControlsin oma wheel-kuuntelija istuu kankaalla eli kotelon
   * lapsessa, joten kotelon kaappaus ehtii ensin ja stopPropagation pitää
   * kirjaston erossa panoroinnista. Zoom (cmd tai ctrl) päästetään läpi
   * koskemattomana: kirjasto zoomaa kuten ennen, ja pallolaudan
   * minDistance/maxDistance rajaavat sen edelleen (js/pallolauta/lauta.js
   * tahdistaZoomirajat).
   */
  const rulla = { lat: 0, lng: 0, aikaa: 0, raf: 0, edellinen: 0 };
  ui.pallonRulla = rulla; // mittausta varten (savukkeet)
  const pysaytaRulla = () => { if (rulla.raf) cancelAnimationFrame(rulla.raf); rulla.raf = 0; };
  const siirraPalloa = (dLat, dLng) => {
    const pov = pallo.pointOfView();
    pallo.pointOfView({
      lat: Math.max(-PANOROINNIN_LEVEYSRAJA, Math.min(PANOROINNIN_LEVEYSRAJA, pov.lat + dLat)),
      lng: pov.lng + dLng,
      altitude: pov.altitude,
    }, 0);
  };
  const rullanLiuku = (nyt) => {
    const dt = Math.max(1, Math.min(50, nyt - rulla.edellinen));
    rulla.edellinen = nyt;
    const osa = rulla.aikaa > dt ? dt / rulla.aikaa : 1;
    const dLat = rulla.lat * osa;
    const dLng = rulla.lng * osa;
    rulla.lat -= dLat; rulla.lng -= dLng; rulla.aikaa -= dt;
    siirraPalloa(dLat, dLng);
    rulla.raf = rulla.aikaa > 0 && (rulla.lat || rulla.lng) ? requestAnimationFrame(rullanLiuku) : 0;
  };
  kotelo.addEventListener('wheel', (e) => {
    // Cmd (mac) tai ctrl (Windows ja trackpadin nipistys) = zoom.
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    e.stopPropagation();
    ohjaimet.autoRotate = false;
    pysaytaLiuku(); vauhti.lat = 0; vauhti.lng = 0;
    const pov = pallo.pointOfView();
    const askel = rullanAskel(e.deltaX, e.deltaY, pov.altitude, {
      deltaMode: e.deltaMode, leveysPx: kotelo.clientWidth, lat: pov.lat, fov: kamera.fov,
    });
    /*
     * Trackpadin pyyhkäisy tulee tiheänä virtana (ja oma momentum
     * perässä) — se ajetaan sellaisenaan. Hiiren rullan yksi pykälä on
     * hyppy: deltaMode 1/2 tai iso pikseliaskel liu'utetaan
     * RULLAN_LIUKU_MS:n yli (Raamattu: KAIKKI LIIKE ANIMOIDAAN PEHMEÄSTI).
     */
    const suoraan = ui.reducedMotion || (e.deltaMode === 0
      && Math.abs(e.deltaX) <= RULLAN_SUORA_RAJA && Math.abs(e.deltaY) <= RULLAN_SUORA_RAJA);
    if (suoraan) {
      pysaytaRulla();
      rulla.lat = 0; rulla.lng = 0; rulla.aikaa = 0;
      siirraPalloa(askel.dLat, askel.dLng);
      return;
    }
    rulla.lat += askel.dLat; rulla.lng += askel.dLng; rulla.aikaa = RULLAN_LIUKU_MS;
    if (!rulla.raf) {
      rulla.edellinen = performance.now();
      rulla.raf = requestAnimationFrame(rullanLiuku);
    }
  }, { capture: true, passive: false });
  return { sormet, pura: () => { pysaytaLiuku(); pysaytaRulla(); } };
}

/** Sulkee pallon, jos se on auki. */
export function suljePallo(ui) {
  const kuori = ui.pallo;
  if (!kuori) return false;
  ui.pallo = null;
  ui.pallonInstanssi = null;
  kuori.classList.remove('esilla');
  document.body.classList.remove('pallo-auki');
  ui.pallonKuuntelija?.();
  ui.pallonKuuntelija = null;
  setTimeout(() => kuori.remove(), 420);
  return true;
}

/**
 * Avaa pallon koko kartta-alueen päälle. Palauttaa true, kun pallo on
 * ruudulla (kirjasto ja pinnoite ladataan taustalla; latausvirhe
 * näytetään kuoressa eikä kaada peliä).
 */
export async function avaaPallo(ui) {
  if (ui.dead || ui.pallo) return false;
  const kuori = document.createElement('div');
  kuori.className = 'pallo-kuori';
  kuori.setAttribute('role', 'dialog');
  kuori.setAttribute('aria-modal', 'true');
  kuori.setAttribute('aria-label', 'Karttapallo');
  /*
   * EI OTSIKKORIVIÄ (omistaja 4.9.2026 ilta: "Ota se karttapallo pois
   * otsikkoriviltä, kun se menee matkakirjan logon kanssa päällekkäin.
   * Sitä ei tarvita ollenkaan"). Kuori alkaa pelin ylärivin alta, joten
   * logo ja ylärivin napit jäävät näkyviin; pallon päällä kelluu vain
   * Sulje-nappi oikeassa yläkulmassa.
   */
  kuori.innerHTML = `
    <button type="button" class="pallo-sulje" aria-label="Sulje" title="Sulje">✕</button>
    <div class="pallo-kotelo"></div>
    <p class="pallo-tila">Ladataan palloa…</p>`;
  const ylarivi = document.querySelector('.topbar');
  if (ylarivi) kuori.style.top = `${Math.round(ylarivi.getBoundingClientRect().bottom)}px`;
  document.body.appendChild(kuori);
  ui.pallo = kuori;
  document.body.classList.add('pallo-auki');
  void kuori.getBoundingClientRect();
  kuori.classList.add('esilla');
  const sulje = () => suljePallo(ui);
  kuori.querySelector('.pallo-sulje').addEventListener('click', sulje);
  const nappain = (e) => { if (e.key === 'Escape') { e.stopPropagation(); sulje(); } };
  document.addEventListener('keydown', nappain, true);
  ui.pallonKuuntelija = () => document.removeEventListener('keydown', nappain, true);

  const tila = kuori.querySelector('.pallo-tila');
  let Globe;
  try {
    Globe = await lataaPallokirjasto();
  } catch {
    tila.textContent = 'Karttapallo ei latautunut — tarkista verkkoyhteys ja yritä uudelleen.';
    return true;
  }
  if (ui.pallo !== kuori) return false;
  const kotelo = kuori.querySelector('.pallo-kotelo');
  const pack = ui.game.pack;
  const kaupungit = pallonKaupungit(pack);
  const pos = ui.game.player?.pos;
  const oma = pos?.type === 'city' ? kaupungit.find((k) => k.id === pos.city) : null;
  // Laatat, jos luettelo on ämpärissä; muuten z4-tekstuuri varana.
  const laatat = await laatatSaatavilla();
  if (ui.pallo !== kuori) return false;
  const pallo = rakennaPallo(Globe, kotelo, laatat);
  const eleet = asennaPallonEleet(pallo, kotelo, ui);
  const { sormet } = eleet;
  const eleKuuntelija = ui.pallonKuuntelija;
  ui.pallonKuuntelija = () => { eleet.pura(); eleKuuntelija?.(); };
  pallo
    .onGlobeClick(({ lat, lng }) => {
      // Nipistys ei ole napautus (ks. sormiseuranta, asennaPallonEleet).
      if (sormet.nipistys) return;
      const kohta = sukelluskohta(lat, lng);
      if (!kohta) return;
      sulje();
      ui.kartta?.ajaKamera?.({ x: kohta.x, y: kohta.y, leveys: PALLO_SUKELLUSLEVEYS }, { kesto: 1400 });
    });
  // Instanssi talteen mittausta ja savukkeita varten (suljettaessa pois).
  ui.pallonInstanssi = pallo;
  const koti = oma ?? kaupungit.find((k) => k.id === 'lontoo') ?? kaupungit[0];
  if (koti) pallo.pointOfView({ lat: koti.lat, lng: koti.lon, altitude: 1.9 }, 0);
  // Valikkopallo pyörii itsekseen, kunnes sormi laskeutuu (asennaPallonEleet).
  const ohjaimet = pallo.controls();
  ohjaimet.autoRotate = true;
  ohjaimet.autoRotateSpeed = 0.35;
  const mitoita = () => pallo.width(kotelo.clientWidth).height(kotelo.clientHeight);
  window.addEventListener('resize', mitoita);
  const vanha = ui.pallonKuuntelija;
  ui.pallonKuuntelija = () => { vanha?.(); window.removeEventListener('resize', mitoita); pallo._destructor?.(); };
  tila.textContent = '';
  tila.hidden = true;
  return true;
}
