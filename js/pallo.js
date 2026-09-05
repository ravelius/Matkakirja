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
import { laatuAinaPaalla } from './ui-apurit.js';

const R2 = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
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
export const PALLO_LAATTATUNNISTE = 'b';
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
 */
export function laatatSaatavilla(haku = globalThis.fetch) {
  if (!laatatLupaus) {
    laatatLupaus = Promise.resolve()
      .then(() => haku(`${PALLO_LAATAT}laatat.json`, { cache: 'force-cache' }))
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

let esilatausLahetetty = false;
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
  const tyontekijat = nav?.serviceWorker;
  if (esilatausLahetetty || !tyontekijat) return null;
  esilatausLahetetty = true;
  const rekisteri = await Promise.resolve(tyontekijat.ready).catch(() => null);
  const kohde = tyontekijat.controller ?? rekisteri?.active ?? null;
  if (!kohde) { esilatausLahetetty = false; return null; }
  const osoitteet = esilatauksenLaatat({ ...kohta, maxTaso: laattatasoMax(laattaluettelo) });
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
 * kerroin H / 304. Terävyys 0,55 sallii 1,8× venytyksen, jotta koko pallo
 * (korkeus 2,5) pysyy tasolla 4 (128 laattaa) eikä hyppää tasolle 5
 * (512). Liikkeessä karkeammat laatat jäävät pohjalle (kirjasto pitää
 * matalammat tasot), joten tason vaihto ei välähdä tyhjää; levossa
 * tarkat laatat latautuvat päälle sitä mukaa kuin ne saapuvat.
 *
 * Tason pudotus liikkeen alkaessa purkaa tarkat laatat (kirjaston oma
 * käytös); levossa ne haetaan uudestaan selaimen välimuistista. Se on
 * hinta sulavuudesta, jonka omistaja hyväksyi ("vaikka sitten kun liike
 * pysähtyy"). Reduced motion ei vaikuta: kyse on tarkkuudesta, ei
 * animaatiosta.
 */
/** Kuinka kauan kameran on oltava paikallaan ennen lepolaatua (ms). */
export const LAATU_LEPOVIIVE_MS = 260;
/**
 * Kuinka kauan liikkeen on jatkuttava ennen kuin lepolaadusta luovutaan
 * (ms). Yksi hidas kehys tai pieni korjaus ei pudota tasoa: pudotus
 * purkaa tarkat laatat, ja edestakainen vaihto hakisi ne yhä uudestaan.
 */
export const LAATU_LIIKEVIIVE_MS = 120;
/** Levossa sallittu venytys: 1 = laatan pikseli on laitepikseli. */
export const LAATU_TERAVYYS = 0.55;
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
  const aina = laatuAinaPaalla(ikkuna);
  const renderer = pallo.renderer?.();
  const maxAniso = renderer?.capabilities?.getMaxAnisotropy?.() ?? 1;
  const alkuperainen = moottori.updatePov;
  let lepo = false;
  let edellinen = null;
  let kamera = null;
  let lepoAjastin = 0;
  const ajastimet = new Set();

  const asetaTila = (lepoon) => {
    lepo = lepoon;
    if (aina) lepoon = true;
    const kerroin = lepoon ? lepokerroin(kotelo.clientHeight * dpr) : 1;
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
   */
  const lepoon = () => {
    lepoAjastin = 0;
    if (lepo || !kamera) return;
    asetaTila(true);
    alkuperainen.call(moottori, kamera);
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
        edellinen = paikka.clone();
        if (lepo && nyt - liikeAlku >= LAATU_LIIKEVIIVE_MS) asetaTila(false);
        ikkuna.clearTimeout(lepoAjastin);
        lepoAjastin = ikkuna.setTimeout(lepoon, LAATU_LEPOVIIVE_MS);
      }
    }
    return alkuperainen.call(this, kam);
  };
  asetaTila(false);
  // Kamera on jo paikallaan asennettaessa (kirjasto asetti sen ennen
  // kuin moottori löytyi): ensimmäinen lepo ilman liikettä.
  kamera = pallo.camera?.() ?? null;
  if (kamera) lepoAjastin = ikkuna.setTimeout(lepoon, LAATU_LEPOVIIVE_MS);
  return () => {
    ikkuna.clearTimeout(lepoAjastin);
    for (const t of ajastimet) ikkuna.clearTimeout(t);
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
  return {
    Mesh: malli.constructor,
    SphereGeometry: malli.geometry.constructor,
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
