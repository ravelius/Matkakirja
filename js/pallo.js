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
import { diagNyt, pallodiag } from './pallodiag.js';
import {
  KOHDEMAAN_NIMIOT_ELAVINA, pyramidinMerinimet,
  haePyramidinLuettelo, nostotasonPoltetut, pyramidinKerrostasot, pyramidinLaattaOlemassa,
  pyramidinLaattaUrl,
} from './laattapyramidi.js';
import { JAAVARI, MERIVARI, kuunteleReliefiLinssi, reliefiKaytossa } from './reliefipyramidi.js';
import {
  KOSKETUKSEN_VAPAUTUS, laattakerrosPaalla, laatuAinaPaalla, nollaaKosketusOhjaimet,
} from './ui-apurit.js';
import {
  TARKKUUS_TAPAHTUMA, antialiasTarkkuudella, pikselisuhdeTarkkuudella, tarkkuusLiikkeessa,
} from './tarkkuus-asetus.js';
/*
 * Laattakerros ja sen puhtaat apurit (erät E0 ja E1, suunnitelma
 * docs/moduulit/pallon-liike-taydella-tarkkuudella.md luvut 4 ja 6)
 * asuvat moduulissa js/pallolaatat.js. Apurit TUODAAN tänne ja VIEDÄÄN
 * EDELLEEN, jotta testit, savukkeet ja js/pallolauta/ näkevät ne
 * edelleen js/pallo.js:stä — siirto ei muuttanut yhtään rajapintaa.
 */
import {
  LAATTAKERROS_OLETUS, LAATU_KAUKORAJA, LAATU_LEPOVIIVE_MS, LEPOKERROS_HAIVE_SISAAN_MS,
  LEPOKERROS_KANGASKATTO, LEPOKERROS_KOROTUS, LEPOKERROS_KORKEUSRAJA, LEPOKERROS_KUVAKATTO,
  LEPOKERROS_MITTAMATKA_PX,
  LEPOKERROS_NAYTTEITA, LEPOKERROS_SYVYYSSIIRTO, THREE_CLAMP, THREE_LINEAR,
  THREE_LINEAR_MIPMAP_LINEAR, lepokerroksenAlue, lepokerroksenKerrokset, lepokerroksenLaattakatto,
  lepokerroksenSilmat, lepokerroksenSuunnitelma, lepokerroksenTasoRiittaa, lepokerroksenVerkko,
  laattakerroksenOsuma,
  laattakerroksenKokeet,
  luoLaattakerros, luoLepokerroksenAjoitus, pallonPiste, pinnanPiste, pyramidinKarttaAla,
} from './pallolaatat.js';

export {
  LAATTAKERROS_HAIVE_MS, LAATTAKERROS_HYSTEREESI_ALAS, LAATTAKERROS_LAATTAKATTO_ENNAKKO,
  LAATTAKERROS_LAATTAKATTO_MUISTI,
  LAATTAKERROS_LAATTAKATTO_NAKYVA, LAATTAKERROS_LAATTAKATTO_TAVUT,
  LAATTAKERROS_LIIKEVARA_KERROIN, LAATTAKERROS_LIIKEVARA_PYYHKAISY, LAATTAKERROS_NAYTTEITA,
  LAATTAKERROS_OLETUS, LAATTAKERROS_PAIVITYSVALI_LIIKE_MS, LAATTAKERROS_PITO_MS,
  LAATTAKERROS_RENDER_ORDER_POHJA,
  LAATTAKERROS_RINNAKKAIN, LAATTAKERROS_SILMAT_MAX, LAATTAKERROS_SILMAT_MIN,
  LAATTAKERROS_SYVYYSSIIRTO, LAATTAKERROS_TERAVYYS, LAATTAKERROS_TEKSTUUREJA_PER_KEHYS,
  LAATTAKERROS_VARA_AST, LAATTAKERROS_VARA_OSUUS, laatanKartta, laatanPalloAlue, laattakerroksenLRU,
  laattakerroksenNakyvissa, laattakerroksenOsuma, laattakerroksenPeitto, laattakerroksenSilmat,
  laattakerroksenTaso, luoLaattakerros, pinnanRuutupiste,
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
  lepokerroksenVerkko, luoLepokerroksenAjoitus, pallonPiste, pinnanPiste, pyramidinKarttaAla,
} from './pallolaatat.js';
import {
  VEDON_SEURANTA_TAPAHTUMA, mittauslippuPaalla, seurannanAsetukset,
} from './vedon-seuranta.js';

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
export const PALLO_LAATTAVERSIO = '2026-09-22c-pohja';
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
/*
 * TUNNISTE e, versio 2026-09-07a (7.9.2026 klo 05.46 Suomen aikaa, Macin
 * uusintapoltto; Raamattu POHJA ILMAN RANTAVIIVAA): pohja poltettu ILMAN
 * rantaviivaa, koska rantaviiva piirtyy pallolla vektorina
 * (js/pallovektorit.js) eikä poltettu muste saa jäädä sen alle varjoksi.
 * Sama versio kuin pyramidilla (viivat 2026-09-07a-viivat, nostot
 * 2026-09-07a-nostot), joten laattakerroksen versiovahti
 * (js/pallolaatat.js lepokerroksenKerrokset) päästää kerroksen piirtämään.
 */
/*
 * TUNNISTE f, versio 2026-09-07a (8.9.2026 klo 08.30 Suomen aikaa, Macin
 * pallopoltto ajo 34189623074): sama pohja kuin e, mutta viivataso
 * 2026-09-08a-viivat ja nostotaso 2026-09-08a-nostot — Helsingin reitin
 * pään korjaus (pallonKorjattuPoly generaattorissa) ja 16 uuden
 * kaupungin nostot. Pyramidi on samoilla versioilla, joten versiovahti
 * päästää lepokerroksen piirtämään; e-sarjalla se ei enää päässyt.
 */
/*
 * TUNNISTE g, versio 2026-09-07a (18.9.2026, Macin nostopoltto): sama
 * pohja ja sama viivataso kuin f, mutta NOSTOTASO 2026-09-18-nostot —
 * lukitut nostoankkurit (PAATOKSET 33 TARKENNUS 2) poltettuna ja
 * kaupungin sisäiset nostot pois laatasta (PAATOKSET 34). Uusi
 * nostoversio on uusi kansio, koska laatat ovat vuoden välimuistissa.
 *
 * KOLME ASIAA SAMASSA JULKAISUSSA (js/pallolaatat.js
 * lepokerroksenKerrokset palauttaa null, jos pallon sarjan `nostot` ja
 * pyramidin `nostotaso.versio` eivät täsmää — koko laattakerros
 * sammuu): (1) nostotason laatat ja pyramidi.json ämpäriin, (2) pallon
 * sarja poltettuna kansioon 2026-09-07a-nostot-i, (3) tämä tunniste.
 * Tunniste i (18.9.2026 ilta): nostotaso maittain 2026-09-19-maittain (v1945: 2026-09-18c-maittain, poltto kohdemaan säännöllä),
 * pallon sarja ILMAN nostoja (nostot maittain lepokerroksesta, PAATOKSET 34
 * kohta 17 d), ankkurit lukittu 50 nostolle.
 * Tunniste h (18.9.2026 iltapäivä): nostotaso 2026-09-19-nostot, jossa
 * kaupunkipisteitä (nakyva-kaupunki-*) ei enää polteta laattaan (Raamattu
 * PAATOKSET 33 TARKENNUS 2 rajaus a) — poltettu yhdellä ajolla ilman
 * välitilaa (tools/polta-paikallisesti.sh --nostot-ja-pallo).
 * Ks. docs/raportit/viesti-fable-poltto-ranska-nostot-20260918.md
 * ("Erä 3"), jossa on vientikomennot ja tarkistuslista.
 */
/*
 * TUNNISTE ON PELKKIÄ KIRJAIMIA JA NUMEROITA: tools/tee-pallolaatat.mjs
 * hylkää muun ("--tunniste: vain a–z ja 0–9"), joten 20.9.2026 poltettu
 * sarja on `20260920k` eikä `2026-09-20-k`.
 *
 * SARJA k EIKÄ j (20.9.2026 ilta): sarja j oli poltettu
 * viivaversiosta `2026-09-20c-viivat`, jossa joet OLIVAT mukana mutta
 * piirtyivät karkeilla tasoilla alle pikselin levyisinä eivätkä siksi
 * näkyneet koko maan näkymässä (JOKITYYLI.vahin,
 * tools/fokuskartta/maailmapiirto.js). Viivataso poltettiin uusiksi
 * versioon `2026-09-20d-viivat`, ja koska pallon sarja KOMPOSOI
 * viivatason laattoihinsa, sekin oli poltettava perässä.
 *
 * Sitä ennen sarja i oli poltettu versiosta `2026-09-20-viivat`,
 * jossa jokia ei ollut viivatasolla lainkaan. Lepokerroksen
 * versiovahti (js/pallolaatat.js lepokerroksenKerrokset) vaatii aina
 * saman viivaversion sarjaan ja luetteloon — muuten kerros sammuu.
 */
export const PALLO_LAATTATUNNISTE = '20260922c';
/*
 * Sarja k on poltettu ILMAN nostoja (tools/tee-pallolaatat.mjs laattojenKansio:
 * kansiossa ei ole '-nostot'-osaa): nostot tulevat maittain lepokerroksesta
 * (js/pallolaatat.js nostotMaittain). Sama tieto sw.js LAATTAKANSIO.
 */
export const PALLO_SARJASSA_NOSTOT = false;
export const PALLO_LAATTAKANSIO = `${PALLO_LAATTAVERSIO}${PALLO_SARJASSA_NOSTOT ? '-nostot' : ''}-${PALLO_LAATTATUNNISTE}`;
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
/**
 * Lista palvelutyöntekijälle; null, jos työntekijää ei ole. Viesti on
 * sama kaikille laatoille — slippy-laatat, lentoreitti ja 22.9.2026
 * alkaen pyramidin laatat levossa (js/laattaesilataus.js, laattakerros
 * kutsuu tätä `esilataa`-vaihtoehdon kautta).
 */
export async function lahetaLaattaesilataus(osoitteet, nav = globalThis.navigator, raportoi = null) {
  return lahetaEsilataus(osoitteet, nav, raportoi);
}
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
/*
 * NELJÄS LÄHDE: MAAKOHTAINEN NOSTOTASO (18.9.2026, Raamattu
 * PAATOKSET 34 kohta 17 d). Kun pallon sarja ajetaan ILMAN
 * `--nostot`-lippua, sen laatat.json ei kanna nostotasoa lainkaan
 * (`nostot: null`) ja lepokerros latoo kohdemaan nostolaatat
 * PYRAMIDISTA (js/pallolaatat.js nostotMaittain). Poltettu muste on
 * silloin ruudulla, mutta se on pyramidin luettelossa — ja jos tämä
 * funktio katsoisi vain pallon omaa luetteloa, peli ei tietäisi
 * mistään poltosta ja piirtäisi jokaisen noston ELÄVÄNÄ mustetta
 * vasten. MITATTU HINTA (v1942, Ranska): eläviä merkkejä kilpaili
 * CSS2D-katosta (NOSTOJEN_KATTO 40) niin monta, että saapumisnäkymän
 * nostopisteitä jäi 34 (390 px) ja 31 (1400 px) — aiemman 43:n
 * sijaan. Katon yli jääneet eivät olleet DOMissa eivätkä
 * osumalistalla: pelaajalle ne olivat kadonneet.
 *
 * JÄRJESTYS ON PALLON OMA ENSIN. Jos pallon sarjaan ON poltettu
 * nostot, ne ovat laattojen kankaassa koko maailmasta, eikä
 * pyramidin maakohtainen taulu saa muuttaa sitä päätöstä — sama
 * järjestys kuin kerrosportissa (js/pallolaatat.js: `!nostot`).
 */
// Kohdemaan nimiöt elävinä: kytkin ja perustelu js/laattapyramidi.js
// KOHDEMAAN_NIMIOT_ELAVINA; viedään tästä nostokerrokselle.
export { KOHDEMAAN_NIMIOT_ELAVINA, pyramidinMerinimet };
export function pallonNostoOnPoltettu(tunnus, tiiviste = null) {
  const nostot = laattaluettelo?.nostotaso?.nostot ?? nostotasonPoltetut();
  // Elävät nimiöt: pallon oma sarja ilman nostoja → mikään ei ole poltettu.
  if (KOHDEMAAN_NIMIOT_ELAVINA && !laattaluettelo?.nostotaso?.nostot) return false;
  if (!nostot || !tunnus) return false;
  const poltettu = nostot[tunnus];
  if (!poltettu) return false;
  return tiiviste ? poltettu === tiiviste : true;
}

/** Onko pallon laatoissa lainkaan nostotasoa? */
export function pallonLaatoissaOnNostoja() {
  const nostot = laattaluettelo?.nostotaso?.nostot ?? nostotasonPoltetut();
  return Boolean(nostot && Object.keys(nostot).length);
}
/** Sukelluksen näkyvä leveys laudan yksikköinä (maan kokoinen ikkuna). */
export const PALLO_SUKELLUSLEVEYS = 620;
export const PALLO_LAUTA = 'maailmankartta';

/*
 * ══════════════════════════════════════════════════════════════════
 * KAUPUNGIN OMA PISTE PALLOLLA (omistaja 7.9.2026: *"Helsinki näyttää,
 * että se on aivan liian kaukana rannikosta."*)
 * ══════════════════════════════════════════════════════════════════
 *
 * Laudan projektio ja sen kalibrointi ovat oikein (mitattu, luku 12.2
 * docs/moduulit/karttapallo.md), mutta kaupungin oma x/y on käsin
 * sommiteltu: Helsinki istuu laudalla 34,7 km liian pohjoisessa ja
 * seisoo pallolla Suomenlahden rantaviivan sisäpuolella. Laudan x/y ei
 * silti muutu — se on reittien pituus, via-pisteet, merireitin ranta ja
 * minCityDistance — vaan kaupunki saa oman `pallo`-kenttänsä
 * ({ lat, lon }, js/packs/maailmankartta-pallopisteet.js), jota VAIN
 * pallo lukee.
 *
 * KAKSI HAKEMISTOA, JOTTA SIIRTO ON YKSI ASIA KAIKILLE MERKEILLE:
 *
 *   pisteet    laudan piste "x|y" → { lat, lon }. Kaikki merkit, jotka
 *              kysyvät asteita laudan kohdasta (kaupunkipiste, nimi,
 *              nappula levossa, kohdekortin ankkuri, lentokaaren päät),
 *              osuvat tähän ilman että kutsupaikka tietää siirrosta.
 *   siirtymat  kaupungin id → { dx, dy } LAUDAN yksikköinä. Reitin poly
 *              korjataan tällä päistään (js/pallolauta/reitit.js), jotta
 *              viiva päättyy siirrettyyn pisteeseen ja nappula kulkee
 *              samaa viivaa — ilman loppunytkähdystä.
 *
 * `pisteet`-arvo lasketaan KORJATUSTA LAUDAN PISTEESTÄ takaisin
 * asteiksi (eikä suoraan taulun luvusta), jotta reitin pää ja levossa
 * seisova nappula antavat bitilleen saman asteluvun.
 */

/** Laudan pisteen avain hakemistossa (x ja y ovat aineiston lukuja). */
export function laudanPisteenAvain(x, y) {
  return `${x}|${y}`;
}

const TYHJAT_PISTEET = { pisteet: new Map(), siirtymat: new Map() };
const omatPisteetMuisti = new WeakMap();

/** Pakan omat pallopisteet: { pisteet, siirtymat }. Laskettu kerran per pakka. */
export function pallonOmatPisteet(pack) {
  if (!pack) return TYHJAT_PISTEET;
  const muistissa = omatPisteetMuisti.get(pack);
  if (muistissa) return muistissa;
  const pisteet = new Map();
  const siirtymat = new Map();
  // Kiertävällä laudalla sauman yli laskettu siirtymä olisi lähes koko
  // kartan levyinen: se kierretään lyhimpään suuntaan.
  const leveys = pack.map?.kiertava ? (pack.map?.width ?? 0) : 0;
  for (const c of pack.cities ?? []) {
    const oma = c.pallo;
    if (!oma || !Number.isFinite(oma.lat) || !Number.isFinite(oma.lon)) continue;
    const laudalla = projisoiLaudalle(PALLO_LAUTA, oma.lon, oma.lat);
    if (!laudalla) continue;
    let dx = laudalla.x - c.x;
    if (leveys > 0) {
      while (dx > leveys / 2) dx -= leveys;
      while (dx < -leveys / 2) dx += leveys;
    }
    const dy = laudalla.y - c.y;
    const asteet = laudaltaAsteiksi(PALLO_LAUTA, c.x + dx, c.y + dy);
    if (!asteet) continue;
    siirtymat.set(c.id, { dx, dy });
    pisteet.set(laudanPisteenAvain(c.x, c.y), { lat: asteet.lat, lon: asteet.lon });
  }
  const tulos = { pisteet, siirtymat };
  omatPisteetMuisti.set(pack, tulos);
  return tulos;
}

/*
 * ══════════════════════════════════════════════════════════════════
 * REITIN PÄÄ SIIRTYY KAUPUNGIN MUKANA — YKSI KAAVA KAHDELLE PIIRTÄJÄLLE
 * ══════════════════════════════════════════════════════════════════
 *
 * Reittiviiva piirtyy pelissä KAHDESTI ja kahdessa eri paikassa:
 *
 *   1. ELÄVÄNÄ pallon viivakerroksessa (js/pallolauta/reitit.js) —
 *      nykyisen kaupungin naapurireitit askelhelmineen;
 *   2. POLTETTUNA laattapyramidin viivatasoon (tools/fokuskartta/
 *      sisalto.mjs → tools/generoi-laattapyramidi.mjs --viivataso) —
 *      koko 408 reitin verkko, joka näkyy kartalla aina.
 *
 * Kun kaupunki sai oman pallopisteensä (7.9.2026), korjaus tehtiin vain
 * kohtaan 1. Mitattu 7.9.2026 illalla: laattoihin poltettu verkko
 * päättyy yhä laudan omaan pisteeseen, ja 219 reittiä 408:sta osuu yli
 * kilometrin päähän kaupungin pallopisteestä — Helsingissä 34,7 km, eli
 * juuri se, minkä omistaja näki: *"viivojen risteys on sisämaassa,
 * nappula rannalla."* Kaava on siksi TÄSSÄ, yhtenä totuutena, ja
 * molemmat piirtäjät kutsuvat sitä.
 *
 * KORJAUS LEVITETÄÄN KOKO POLYLLE, EI VAIN PÄÄHÄN. Jos vain viimeinen
 * piste siirrettäisiin, nappula kulkisi vanhaa viivaa ja nytkähtäisi
 * viimeisellä kehyksellä siirron verran (Raamattu: KAIKKI LIIKE
 * ANIMOIDAAN PEHMEÄSTI). Jokainen polyn piste siirtyy päiden siirtymien
 * painotettuna summana, painona osuus KAARENPITUUDESTA — sama
 * parametrisointi kuin `pointAlong`illa, joten askelhelmet, nappulan
 * kuljettaja (js/pallolauta/siirto.js) ja laattaan poltetut askelmat
 * kulkevat täsmälleen samaa korjattua viivaa. Päissä paino on 1 ja 0,
 * joten viiva päättyy tarkalleen siirrettyyn pisteeseen. Via-pisteet
 * (merireitin rantasovitus) säilyvät: ne liukuvat mukana, eivät katoa.
 *
 * @param {Array<[number, number]>} poly reitin murtoviiva laudan yksikköinä
 * @param {?{dx:number, dy:number}} a alkupään kaupungin siirtymä
 * @param {?{dx:number, dy:number}} b loppupään kaupungin siirtymä
 * @returns {Array<[number, number]>} korjattu poly (sama, jos siirtymiä ei ole)
 */
export function pallonKorjattuPoly(poly, a = null, b = null) {
  const p = poly ?? [];
  if ((!a && !b) || p.length < 2) return p;
  const pituudet = [];
  let yhteensa = 0;
  for (let i = 1; i < p.length; i += 1) {
    const d = Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]);
    pituudet.push(d);
    yhteensa += d;
  }
  let kertyma = 0;
  return p.map(([x, y], i) => {
    if (i) kertyma += pituudet[i - 1];
    const t = yhteensa > 0 ? kertyma / yhteensa : Math.min(1, i);
    const dx = (a ? a.dx * (1 - t) : 0) + (b ? b.dx * t : 0);
    const dy = (a ? a.dy * (1 - t) : 0) + (b ? b.dy * t : 0);
    return [x + dx, y + dy];
  });
}

/**
 * Reitin poly siinä muodossa, jossa PALLO sen piirtää. `siirtymat` on
 * pallonOmatPisteet(pack).siirtymat; ilman sitä poly palautuu sellaisenaan.
 */
export function pallonReitinPoly(reitti, siirtymat = null) {
  return pallonKorjattuPoly(
    reitti?.poly ?? [],
    siirtymat?.get(reitti?.a) ?? null,
    siirtymat?.get(reitti?.b) ?? null,
  );
}

/** Kaupungit pallolle: lauta → asteet, käyntitieto ja aloituskaupungit mukana. */
export function pallonKaupungit(pack, kaydyt = new Set()) {
  const { pisteet } = pallonOmatPisteet(pack);
  return (pack?.cities ?? []).map((c) => {
    const p = pisteet.get(laudanPisteenAvain(c.x, c.y))
      ?? laudaltaAsteiksi(PALLO_LAUTA, c.x, c.y);
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

/*
 * ── KIRJASTON LATAUS EI SAA JÄÄDÄ ROIKKUMAAN (16.9.2026) ──────────
 *
 * MITATTU VIKA (Raamattu, ASTRONAUTIN KAMERA LISÄYS 11 kohta 34):
 * asennetussa macOS Safari -sovelluksessa Astronautin kameran näkymä
 * jäi tyhjäksi, eikä konsolissa näkynyt mitään. `<script>`-lataus on
 * juuri se kohta, joka voi WebKitissä jäädä KESKEN ILMAN VIRHETTÄ:
 * `error`-tapahtuma tulee vasta kun yhteys katkeaa, ja
 * palvelutyöntekijän välimuistista tuleva vastaus voi jäädä
 * ratkeamatta (opaakki vastaus, vanhentunut kori, keskeytynyt
 * päivitys v1910 → v1924). Silloin `lataaPallokirjasto` ei koskaan
 * palaa, koko lauta jää rakentamatta, eikä yksikään virhehaara
 * laukea — ruudulle jää pelin oma tumma pohja.
 *
 * KAKSI SÄÄNTÖÄ:
 *   1. JOKAISELLA ODOTUKSELLA ON AIKAKATKO. Jos `load` ei tule
 *      PALLOKIRJASTON_AIKAKATKO_MS:ään, yritys hylätään nimetyllä
 *      syyllä ja muisti nollataan, jotta uusi yritys on mahdollinen.
 *   2. TOINEN YRITYS MENEE VÄLIMUISTIN OHI. Osoitteeseen lisätään
 *      kertaluonteinen kyselyparametri: palvelutyöntekijän
 *      VENDORCACHE hakee korista TÄSMÄLLEEN osoitteella
 *      (`kori.match(url)`), joten uusi osoite ei voi osua vanhaan
 *      kappaleeseen vaan menee verkkoon.
 */
/** Kuinka kauan yhtä kirjastolatausta odotetaan (ms). */
export const PALLOKIRJASTON_AIKAKATKO_MS = 12000;
/** Montako yritystä tehdään ennen kuin virhe palaa kutsujalle. */
export const PALLOKIRJASTON_YRITYKSET = 2;

/**
 * Kirjaston osoite yrityskerralla. Ensimmäinen on puhdas (välimuisti
 * saa palvella), seuraavat kiertävät välimuistin. Puhdas funktio
 * (tests/pallo.test.mjs).
 */
export function pallokirjastonOsoite(yritys = 0, leima = 0) {
  if (!(Number(yritys) > 0)) return PALLO_KIRJASTO;
  const erotin = PALLO_KIRJASTO.includes('?') ? '&' : '?';
  return `${PALLO_KIRJASTO}${erotin}uusi=${yritys}-${leima || Date.now()}`;
}

let kirjastoLupaus = null;

/*
 * ── ORVOT FRAME-TICKERIT (Fable 22.9.2026, omistajan v2126-kaappaukset) ──
 *
 * Globe.gl:n paketti luo JO LATAUKSESSA (paketin global code) neljä
 * kerrosoliota (arcs ja paths, kahdesti), joita peli ei koskaan käytä.
 * Jokaisen konstruktori käynnistää frame-tickerin, joka pyörittää omaa
 * rAF-ketjuaan ikuisesti — myös levossa, kun lepopiirto on pysäyttänyt
 * pallon (mitattu WebKit: 4 kutsua/kehys levossa). Olioihin ei pääse
 * käsiksi, joten ketju katkaistaan ennen kuin se alkaa: paketin
 * suorituksen ajan requestAnimationFrame jättää rekisteröimättä
 * TÄSMÄLLEEN frame-tickerin nuolen. Oman pallon tickerit syntyvät vasta
 * latauksen jälkeen, eikä niihin kosketa. Jos kirjaston versio muuttaa
 * nuolen muotoa, suodatin ei osu mihinkään (turvallinen suunta).
 */
export const ORVON_TICKERIN_LAHDE = 'function(){return e.onFrame()}';

/**
 * Suodatin paketin suorituksen ajaksi. Palauttaa { lopeta, pudotettuja }.
 * Lipulla eikä purkamalla: jos joku muu (kehysprofiili) käärii rAF:n
 * väliin, ketju pysyy ehjänä ja suodatin vain lakkaa suodattamasta.
 */
export function suodataOrvotTickerit(ikkuna = globalThis) {
  const alkuperainen = ikkuna?.requestAnimationFrame;
  const tila = { paalla: true, pudotettuja: 0 };
  if (typeof alkuperainen !== 'function') return { lopeta: () => 0, tila };
  const suodatin = function requestAnimationFrame(fn) {
    if (tila.paalla && typeof fn === 'function' && !fn.name && String(fn) === ORVON_TICKERIN_LAHDE) {
      tila.pudotettuja += 1;
      return 0;
    }
    return alkuperainen.call(ikkuna, fn);
  };
  ikkuna.requestAnimationFrame = suodatin;
  const lopeta = () => {
    tila.paalla = false;
    if (ikkuna.requestAnimationFrame === suodatin) ikkuna.requestAnimationFrame = alkuperainen;
    return tila.pudotettuja;
  };
  return { lopeta, tila };
}

/** Yksi latausyritys: `<script>` sivulle, aikakatko ja siivous. */
function yritaPallokirjasto(doc, osoite, aikakatko, ikkuna) {
  return new Promise((ok, ei) => {
    const s = doc.createElement('script');
    let kello = 0;
    let ratkaistu = false;
    const orvot = suodataOrvotTickerit(ikkuna);
    const paata = (virhe) => {
      if (ratkaistu) return;
      ratkaistu = true;
      const pudotettuja = orvot.lopeta();
      if (pudotettuja) pallodiag('kirjasto-orvot', { n: pudotettuja }, ikkuna);
      if (kello) { try { ikkuna.clearTimeout?.(kello); } catch { /* ei kelloa */ } }
      if (virhe) ei(virhe);
      else ok(globalThis.Globe);
    };
    s.src = osoite;
    s.async = true;
    s.addEventListener('load', () => paata(globalThis.Globe ? null : new Error('Globe puuttuu')));
    s.addEventListener('error', () => paata(new Error('kirjasto ei latautunut')));
    try {
      kello = ikkuna.setTimeout?.(() => paata(new Error('kirjaston aikakatko')), aikakatko) ?? 0;
    } catch { kello = 0; }
    doc.head.appendChild(s);
  });
}

/**
 * Lataa Globe.gl kerran; toinen avaus käyttää samaa globaalia.
 * Aikakatko ja välimuistin ohittava uusinta: ks. yllä.
 */
export function lataaPallokirjasto(doc = document, ikkuna = globalThis) {
  if (globalThis.Globe) return Promise.resolve(globalThis.Globe);
  if (kirjastoLupaus) return kirjastoLupaus;
  kirjastoLupaus = (async () => {
    let viimeisin = null;
    for (let yritys = 0; yritys < PALLOKIRJASTON_YRITYKSET; yritys += 1) {
      const osoite = pallokirjastonOsoite(yritys);
      const alku = diagNyt(ikkuna);
      pallodiag('kirjasto-haku', { yritys, ohi: yritys > 0 ? 1 : 0 }, ikkuna);
      try {
        /* Yritykset ovat peräkkäisiä: toinen vasta jos ensimmäinen petti. */
        const Globe = await yritaPallokirjasto(
          doc, osoite, PALLOKIRJASTON_AIKAKATKO_MS, ikkuna,
        );
        pallodiag('kirjasto', { yritys, ok: 1, ms: Math.round(diagNyt(ikkuna) - alku) }, ikkuna);
        return Globe;
      } catch (syy) {
        viimeisin = syy;
        pallodiag('kirjasto', {
          yritys, ok: 0, syy: String(syy?.message ?? syy).slice(0, 40),
          ms: Math.round(diagNyt(ikkuna) - alku),
        }, ikkuna);
      }
    }
    // Muisti nollataan, jotta seuraava avaus saa yrittää uudestaan.
    kirjastoLupaus = null;
    throw viimeisin ?? new Error('kirjasto ei latautunut');
  })();
  return kirjastoLupaus;
}

/*
 * POHJA JÄÄ KARKEAKSI, KUN LAATTAKERROS ON PÄÄLLÄ (erä E1, suunnitelma
 * docs/moduulit/pallon-liike-taydella-tarkkuudella.md luku 4.1).
 * Kirjaston oma laattamoottori on silloin vain POHJA: se näkyy napojen
 * yli (pyramidin rajaus 84° N…66° S) ja sen ajan, kun kerroksen laatta
 * ei ole vielä saapunut. Tasolla 5 se on 128 laattaa koko maailmalle ja
 * sen tasonvaihdot (0–5) tapahtuvat kerroksen alla näkymättömissä;
 * mitattu hinta tasolla 8 oli 33 ms per updatePov ja 975 kertyvää
 * laattaa (suunnitelman luku 2.2). Ilman kerrosta (?laattakerros=0)
 * katto on luettelon oma syvin taso kuten ennen.
 */
export const POHJAN_TASO_MAX = 5;
/*
 * POHJAN HARVENNUS (kehystahti, 7.9.2026). Kuinka suuren osan omasta
 * etäisyydestään kameran on siirryttävä, ennen kuin kirjaston oma
 * laattamoottori luetteloi pohjan uudestaan. Suhdeluku eikä asteita,
 * koska sama luku kelpaa joka korkeudella: |Δp| / |p| on suoraan
 * kameran kulkema kulma radiaaneina (sivusuunta) tai korkeuden
 * suhteellinen muutos (zoom). 0,06 ≈ 3,4°:n kaari korkeudella 0,35,
 * eli noin kolmasosa näkymästä — pohja (z5, laatta 11,25°) ei ehdi
 * siinä ajassa vanhentua. Perustelu ja mittaus: kytkeLaatunosto,
 * "POHJA PÄIVITTYY HARVEMMIN KUIN RUUTU".
 */
export const POHJAN_ASKEL_OSUUS = 0.06;
/**
 * Tiheimmin, kuinka usein pohja päivitetään, kun laattakerros ei vielä
 * peitä koko näkyvää aluetta (ms). Sama tahti kuin kerroksen omalla
 * päivityksellä (LAATTAKERROS_PAIVITYSVALI_LIIKE_MS): pohja ei voi olla
 * kerrosta tuoreempi, joten tiheämpi tahti olisi pelkkää työtä.
 */
export const POHJAN_VALI_MS = 100;

/**
 * Kameran suhteellinen siirtymä: |a − b| jaettuna b:n etäisyydellä
 * origosta. Puhdas funktio (tests/pallo.test.mjs): Infinity, jos
 * vertailukohtaa ei ole tai se on origossa — silloin päivitetään aina.
 */
export function kameranSiirtyma(a, b) {
  if (!a || !b) return Infinity;
  const r = Math.hypot(b.x, b.y, b.z);
  if (!(r > 0)) return Infinity;
  const matka = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  return Number.isFinite(matka) ? matka / r : Infinity;
}

/** Onko pohjan harvennus päällä? `?pohjanharvennus=0` sammuttaa. */
export function pohjanHarvennusPaalla(ikkuna = globalThis) {
  try {
    const arvo = new URLSearchParams(ikkuna.location?.search ?? '').get('pohjanharvennus');
    if (arvo === null) return true;
    return !(arvo === '0' || arvo === 'ei' || arvo === 'pois');
  } catch {
    return true;
  }
}
/**
 * Syyt, joiden takia pohja vapautetaan takaisin omaan syvimpään
 * tasoonsa (kytkeLaatunosto vapautaPohja): kerros ei näillä koskaan ala
 * piirtää, joten naulattu z5 jäisi ainoaksi kuvaksi. Muut syyt
 * ('pyramidin luettelo haussa', 'kirjaston luokat puuttuvat', 'kotelo
 * piilossa', 'ei kameraa') ovat OHIMENEVIÄ — kirjaston luokat löytyvät
 * vasta ensimmäisen kehyksen jälkeen — eivätkä kelpaa vapautukseen.
 */
export const POHJAN_VAPAUTUS_SYYT = new Set([
  'pallon sarja ja pyramidi eri versiota',
  'pyramidin luetteloa ei saatu',
]);

/**
 * Pallon runko: Globe.gl-instanssi koteloon, pinta laattamoottorilla
 * (luettelo ämpärissä) tai z4-tekstuurilla varana. Jaettu valikkopallon
 * (avaaPallo) ja pallolaudan (js/pallolauta/lauta.js) kesken — pinta ja
 * sen varapolku ovat yhdet.
 */
/**
 * ALFATON WEBGL2-KONTEKSTI ITSE LUOTUNA (`?koe=alpha0`, Fable 22.9.2026).
 *
 * MIKSI ITSE. three.js r185 luo kontekstin aina `alpha: true` -lipulla:
 * sen oma parametritaulu on kovakoodattu, eikä rendererConfigin `alpha`
 * mene sen läpi (mitattu 22.9.2026 WebKitissä). Kolmonen KUITENKIN
 * käyttää valmista kontekstia, jos sellainen annetaan
 * (`parameters.context`), ja globe.gl välittää rendererConfigin
 * sellaisenaan (`Object.assign({antialias:!0,alpha:!0}, config)`), joten
 * kangas ja konteksti voidaan luoda tässä ja antaa niille.
 *
 * Määreet ovat samat kuin kolmosen omat, paitsi `alpha: false`: muuten
 * kokeesta mitattaisiin kahta eroa yhden sijaan. `antialias` tulee
 * pelaajan asetuksesta kuten ennenkin.
 *
 * @returns {?{kangas: HTMLCanvasElement, gl: WebGL2RenderingContext}}
 *   null, jos kontekstia ei saada — silloin peli jatkaa tavallisella
 *   polulla eikä koe vain pure.
 */
export function luoAlfatonKonteksti(kotelo, antialias, doc = kotelo?.ownerDocument) {
  try {
    const kangas = doc?.createElement?.('canvas');
    const gl = kangas?.getContext?.('webgl2', {
      alpha: false,
      antialias: Boolean(antialias),
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
    });
    return gl ? { kangas, gl } : null;
  } catch { return null; }
}

/**
 * Kankaan taustaväri, kun alfakanavaa ei ole (`?koe=alpha0`): lähin
 * läpinäkymätön tausta kotelon esivanhemmista, jotta koe ei näytä
 * rikkinäiseltä. Vara on pelin oma tumma pergamenttipohja.
 */
export function kankaanTausta(kotelo, vara = '#12100b') {
  try {
    let solmu = kotelo;
    while (solmu) {
      const vari = solmu.ownerDocument?.defaultView?.getComputedStyle?.(solmu)?.backgroundColor;
      if (vari && vari !== 'transparent' && !/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/.test(vari)) return vari;
      solmu = solmu.parentElement;
    }
  } catch { /* ilman DOMia vara */ }
  return vara;
}

export function rakennaPallo(Globe, kotelo, laatat) {
  // Pelkkä pinnoite: ei pisteitä, nimiä, kaaria eikä renkaita (omistaja
  // 4.9.2026: "älä lisää mitään sen päälle"). Pelilaudalla PELIN merkit
  // lisätään lauta.js:ssä (Raamattu 5.9.2026: kartta laatoissa, peli päällä).
  /*
   * REUNANPEHMENNYS PELAAJAN ASETUKSESTA (js/tarkkuus-asetus.js,
   * "Tarkkuus liikkeessä" → kokeellinen = ei MSAA:ta). WebGL-kontekstin
   * antialias-parametri luetaan kerran tässä; asetuksen vaihto tulee
   * voimaan seuraavassa latauksessa.
   */
  /*
   * KOELIPPU `?koe=alpha0` (Fable 22.9.2026): LÄPINÄKYMÄTÖN KANGAS.
   * Safarissa WebGL ajetaan omassa GPU-prosessissaan, ja läpinäkyvä
   * kangas pakottaa komposiittorin sekoittamaan sen sivun kanssa joka
   * kehyksessä; läpinäkymättömän kerroksen se voi näyttää sellaisenaan.
   *
   * MITATTU RAJOITUS JA SEN KIERTO (22.9.2026, WebKit): pelkkä
   * `alpha: false` rendererConfigissa EI mene läpi asti — globe.gl
   * välittää konfiguraation oikein, mutta three.js r185 luo kontekstin
   * aina `alpha: true` -lipulla. Siksi kangas ja WebGL2-konteksti
   * luodaan tässä itse (`luoAlfatonKonteksti`) ja annetaan kolmoselle
   * valmiina; se käyttää annettua kontekstia sellaisenaan. Ilman
   * kiertoa kokeen ainoa vaikutus olisi läpinäkymätön taustaväri.
   *
   * Taustaväri asetetaan silti: alfattomalla kankaalla tausta EI voi
   * olla läpinäkyvä, ja sivun oma tausta ei enää paista läpi.
   *
   * Koe on mittausta varten: tausta peittää kaiken, mitä kankaan alla
   * oli, joten oletukseksi sitä ei oteta ilman omistajan päätöstä.
   */
  const eiAlfaa = laattakerroksenKokeet().has('alpha0');
  const alfaton = eiAlfaa ? luoAlfatonKonteksti(kotelo, antialiasTarkkuudella(tarkkuusLiikkeessa())) : null;
  const pallo = Globe({
    rendererConfig: {
      antialias: antialiasTarkkuudella(tarkkuusLiikkeessa()),
      // Valmis kangas ja konteksti: vain näin alfa saadaan oikeasti pois
      // (ks. ALFATON WEBGL2-KONTEKSTI ITSE LUOTUNA). `alpha: false` jää
      // mukaan, jotta pyyntö näkyy myös silloin, kun kolmonen luo itse.
      ...(alfaton ? { canvas: alfaton.kangas, context: alfaton.gl, alpha: false } : {}),
    },
  })(kotelo)
    .width(kotelo.clientWidth).height(kotelo.clientHeight)
    .backgroundColor(eiAlfaa ? kankaanTausta(kotelo) : 'rgba(0,0,0,0)')
    .showAtmosphere(true).atmosphereColor('#d9a13b').atmosphereAltitude(0.18);
  asennaIlmakehanVahti(pallo, kotelo);
  if (laatat && pallo.globeTileEngineUrl) {
    const syvin = laattatasoMax(laatat);
    pallo.globeTileEngineUrl(pallonLaatta).globeTileEngineMaxLevel(
      laattakerrosPaalla(globalThis, LAATTAKERROS_OLETUS) ? Math.min(syvin, POHJAN_TASO_MAX) : syvin,
    );
    asennaLaatunosto(pallo, kotelo);
    asennaPohjanSavy(pallo);
    asennaNapakannet(pallo);
  } else {
    pallo.globeImageUrl(PALLO_TEKSTUURI);
  }
  return pallo;
}

/*
 * ======== ILMAKEHÄ POIS, KUN SEN REUNA EI OLE RUUDULLA ==============
 *
 * Sulavuuskatsaus 22.9.2026 kohta 1: ilmakehäkuori on r = (1 + h) R
 * (h = atmosphereAltitude), BackSide + additiivinen fresnel. Lähikuvassa
 * kamera on kuoren sisällä tai sen reuna on kaukana ruudun ulkopuolella,
 * ja kuori piirretään silti KOKO RUUDUN kokoisena läpinäkyvänä passina,
 * joka ei näy kartalla — dpr 3:lla noin 3 Mpx varjostusta kehystä kohti
 * turhaan. Hehku näkyy vain pallon reunan ympärillä; reunan kulmasäde
 * kamerasta on asin((1 + h) / (1 + korkeus)), ja ruudun kulma näkyy
 * puolidiagonaalin avauskulmaan asti. Kuori sammutetaan, kun hehkun
 * uloin reuna on ruudun kulmankin ulkopuolella (+ marginaali), ja
 * sytytetään heti, kun se palaa. Puhelimella pystyssä raja on
 * korkeudessa ~1,6, työpöydällä ~0,8 — pelin lähikuvat (0,05–0,6) ovat
 * aina sen alla. Kirjaston `showAtmosphere` kirjoittaa vain
 * `visible`-lipun (triggerUpdate: false), joten vaihto on ilmainen.
 * Mittauslippu `?koe=ilmakehavanha` pitää kuoren aina päällä.
 */
/** Marginaali (astetta) ruudun kulman avauskulmaan ennen sammutusta. */
export const ILMAKEHAN_REUNAVARA_AST = 3;

/** Näkyykö ilmakehän hehku ruudulla (puhdas funktio, testattava). */
export function ilmakehaNakyy({ altitude, fov, kuvasuhde, kuoriKorkeus }) {
  if (!Number.isFinite(altitude) || !(altitude >= 0)) return true;
  const h = Number.isFinite(kuoriKorkeus) && kuoriKorkeus > 0 ? kuoriKorkeus : 0.18;
  const suhde = (1 + h) / (1 + altitude);
  if (suhde >= 1) return false; // kameran sisällä kuoresta: hehku ei näy
  const aste = Math.PI / 180;
  const reuna = Math.asin(suhde) / aste;
  const f = Number.isFinite(fov) && fov > 0 ? fov : PALLON_FOV;
  const a = Number.isFinite(kuvasuhde) && kuvasuhde > 0 ? kuvasuhde : 1;
  const puoliDiag = Math.atan(Math.tan((f / 2) * aste) * Math.hypot(1, a)) / aste;
  return reuna < puoliDiag + ILMAKEHAN_REUNAVARA_AST;
}

export function asennaIlmakehanVahti(pallo, kotelo, ikkuna = globalThis) {
  if (typeof pallo?.showAtmosphere !== 'function') return () => {};
  if (laattakerroksenKokeet().has('ilmakehavanha')) return () => {};
  let paalla = true;
  const kehys = (mitat) => {
    const nakyy = ilmakehaNakyy({
      altitude: mitat?.pov?.altitude, fov: mitat?.fov, kuvasuhde: mitat?.kuvasuhde,
      kuoriKorkeus: pallo.atmosphereAltitude?.(),
    });
    if (nakyy === paalla) return;
    paalla = nakyy;
    pallo.showAtmosphere(nakyy);
    pallo.__ilmakehaPaalla = nakyy; // mittausta varten (savukkeet)
  };
  return kytkePallonKehys(pallo, kotelo, kehys, ikkuna);
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

/*
 * ======== YKSI KEHYS, YKSI MITTA ===================================
 *
 * VIKA v1649 (omistaja 6.9.2026 ilta, iPad-sovellus): *"Kartta alkoi
 * täristämään. Eli panoroidessa tuli vähän kuin kaksi karttaa hieman
 * limittäin"* — ja lisähavainto: limitys EI näy levossa, ja tärinä
 * loppuu heti kun sormi irtoaa.
 *
 * Pallolla on nyt KAKSI kerrosta laattamoottorin päällä: laattakerros
 * (js/pallolaatat.js) ja vektoriviivat (js/pallovektorit.js). Ennen
 * tätä kumpikin luki kameran ja ruudun koon OMASTA lähteestään ja OMAAN
 * aikaansa: laattakerros kirjaston updatePov-koukusta (eli
 * pointermoven sisältä, kolme kertaa jokaista sormen liikettä kohti) ja
 * vektorikerros ohjainten `change`-tapahtumasta 60 ms:n ajastimella —
 * ja kumpikin mittasi ruudun kotelon CSS-laatikosta, ei siitä, mitä
 * piirtopuskuriin oikeasti piirretään. Kaksi eri kehyksen mittaa
 * tarkoittaa kahta eri näkyvää aluetta, ja raahauksen aikana ne ovat
 * aina eri tahdissa.
 *
 * TÄSTÄ ETEENPÄIN MITTA TULEE PIIRROSTA. `scene.onBeforeRender` ajetaan
 * kerran per renderöity kehys sillä kameralla, jolla kuva piirretään
 * (three.js WebGLRenderer.render). Molemmat kerrokset ilmoittautuvat
 * siihen ja saavat SAMAN olion: sama kamera, sama pov, sama ruudun koko
 * (renderer.getSize — se, mitä todella piirretään), sama pikselisuhde.
 * Kumpikaan ei enää päivitä geometriaansa tapahtumakäsittelijässä.
 */
/** Pallon kehyskoukut: pallo → { kuuntelijat, kehys, scene, alkuperainen }. */
const kehyskoukut = new WeakMap();

/*
 * ======== KAMERAN ENNUSTE (sulavuus E4b, 21.9.2026) ==================
 *
 * Omistaja 21.9.2026: nimiöt "pomppivat" liikkeessä. Kirjasto asettaa
 * CSS2D-nimiöiden paikan samalla kameralla kuin WebGL-kuvan, mutta DOM ja
 * kangas sommitellaan laitteella eri kerroksissa ja DOM-siirto ehtii
 * ruudulle kehyksen (tai puolikkaan) kankaan jäljessä: nimiö laahaa
 * pallon perässä ja nykii, kun kamera pysähtyy. Ennuste laskee
 * SEURAAVAN kehyksen kameran viime kehysten liikkeestä (lineaarinen
 * ekstrapolaatio, lat/lng kierretään lyhintä kautta, korkeus
 * logaritmisena) ja tarjoaa sen kaikille kehyskoukun kuuntelijoille
 * (`mitat.ennuste = { dtMs, pov, nopeus }`); CSS2D-elementit siirretään
 * ennustettuun paikkaan (kytkePallonEnnuste) heti kirjaston asettaman
 * paikan jälkeen kunkin CSS2DObjectin `onAfterRender`-koukusta — ei
 * erillistä rAF:ia, joten järjestys kirjaston tickin kanssa on aina
 * oikea. Levossa (nopeus alle kynnyksen) ennuste = nykyinen, jotta
 * mikään ei värähtele. Kytkin `?ennuste=0`.
 *
 * MITTA (pallo.__ennusteMittarit): edellisen kehyksen ennusteen ja
 * tämän kehyksen toteutuneen kameran ero pikseleinä (näkyvästä
 * kaistasta). Ilman ennustetta "virhe" on koko kehyksen liike.
 */
/** Ennusteen aikaväli enintään (ms): pitkä tauko ei saa lennättää nimiöitä. */
export const ENNUSTE_KEHYS_MAX_MS = 34;
/** Liikekynnys (astetta/ms), jonka alla ennustetta ei tehdä. */
export const ENNUSTE_KYNNYS = 2e-6;
/** Ennusteen osuus kehysvälistä: 1 = koko kehys, 0,5 = puolikas. */
export const ENNUSTE_OSUUS = 1;

/*
 * ENNUSTE OLETUKSENA POIS (omistajan tuntuma v2000, 21.9.2026 ilta):
 * työpöydällä Marseille-nimiö, nappula ja nostot "heiluivat
 * panoroitaessa ja palasivat paikalleen liikkeen loputtua". Ennuste
 * johtaa aina yhden kehyksen verran; kun DOM ei laahaa kankaan perässä
 * (Macin Chrome/Safari), johto näkyy nimiön heilumisena ja liikkeen
 * lopussa yhden kehyksen palautumisena. Kunnes GL-kerros on oletus
 * (nimiöt samassa renderissä, ennustetta ei tarvita), ennuste on
 * `?ennuste=1`-kokeilu; mitat.ennuste lasketaan silti kuuntelijoille.
 */
export const ENNUSTE_OLETUS = false;

/** Onko ennusteen CSS2D-siirto käytössä (`?ennuste=1` kytkee, `?ennuste=0` sammuttaa). */
export function pallonEnnusteKaytossa(win = globalThis, oletus = ENNUSTE_OLETUS) {
  try {
    const arvo = new URLSearchParams(win.location?.search ?? '').get('ennuste');
    if (arvo != null) return !/^(0|off|false|pois)$/.test(arvo);
  } catch { /* ei osoitetta */ }
  return oletus;
}

/**
 * Seuraavan kehyksen kamera edellisen ja nykyisen kehyksen liikkeestä.
 * Puhdas: { dtMs, pov, nopeus } tai nykyinen pov nopeudella 0, kun
 * liike on alle kynnyksen tai mittoja puuttuu.
 */
export function ennustaKamera(edellinen, nykyinen, {
  osuus = ENNUSTE_OSUUS, kattoMs = ENNUSTE_KEHYS_MAX_MS, kynnys = ENNUSTE_KYNNYS,
} = {}) {
  const pov = nykyinen?.pov;
  const lepo = { dtMs: 0, pov: pov ? { ...pov } : null, nopeus: { lat: 0, lng: 0, lnAlt: 0 } };
  if (!pov || !edellinen?.pov || !Number.isFinite(nykyinen.aika) || !Number.isFinite(edellinen.aika)) return lepo;
  const dt = nykyinen.aika - edellinen.aika;
  if (!(dt > 0) || dt > 250) return lepo;
  let dLng = pov.lng - edellinen.pov.lng;
  if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
  const nopeus = {
    lat: (pov.lat - edellinen.pov.lat) / dt,
    lng: dLng / dt,
    lnAlt: (Math.log(Math.max(1e-6, pov.altitude)) - Math.log(Math.max(1e-6, edellinen.pov.altitude))) / dt,
  };
  if (![nopeus.lat, nopeus.lng, nopeus.lnAlt].every(Number.isFinite)) return lepo;
  if (Math.hypot(nopeus.lat, nopeus.lng) < kynnys && Math.abs(nopeus.lnAlt) < kynnys) return lepo;
  const dtMs = Math.min(kattoMs, dt) * osuus;
  let lng = pov.lng + nopeus.lng * dtMs;
  if (lng > 180) lng -= 360; else if (lng < -180) lng += 360;
  return {
    dtMs,
    pov: {
      lat: Math.max(-89.5, Math.min(89.5, pov.lat + nopeus.lat * dtMs)),
      lng,
      altitude: Math.exp(Math.log(Math.max(1e-6, pov.altitude)) + nopeus.lnAlt * dtMs),
    },
    nopeus,
  };
}

/**
 * Kehysmitat yhdestä lähteestä yhdellä hetkellä. Ruudun koko luetaan
 * RENDERÖIJÄLTÄ (getSize = piirretty koko css-pikseleinä); kotelo on
 * vara, kun renderöijää ei ole (yksikkötestit).
 *
 * @returns {{aika, kamera, pov, W, H, suhde, kuvasuhde, fov, sade}}
 */
export function pallonKehysmitat(pallo, kotelo = null, kamera = null, ikkuna = globalThis) {
  const kam = kamera ?? pallo?.camera?.() ?? null;
  const renderer = pallo?.renderer?.() ?? null;
  let W = 0;
  let H = 0;
  if (typeof renderer?.getSize === 'function') {
    // three:n getSize kirjoittaa kohteeseen set(leveys, korkeus) —
    // ankkakirjoitettu kohde säästää Vector2:n haun kirjastosta.
    try { renderer.getSize({ set(a, b) { W = a; H = b; } }); } catch { /* vara alla */ }
  }
  if (!(W > 0 && H > 0)) {
    W = kotelo?.clientWidth ?? 0;
    H = kotelo?.clientHeight ?? 0;
  }
  return {
    aika: ikkuna.performance?.now?.() ?? Date.now(),
    kamera: kam,
    pov: pallo?.pointOfView?.() ?? null,
    W,
    H,
    suhde: renderer?.getPixelRatio?.() ?? (ikkuna.devicePixelRatio || 1),
    kuvasuhde: Number.isFinite(kam?.aspect) && kam.aspect > 0 ? kam.aspect : (H > 0 ? W / H : 0),
    fov: Number.isFinite(kam?.fov) ? kam.fov : PALLON_FOV,
    sade: pallo?.getGlobeRadius?.() ?? 100,
  };
}

/**
 * Ilmoittaa kuuntelijan pallon kehyskoukkuun. Kuuntelija saa
 * pallonKehysmitat-olion (+ juokseva `kehys`) kerran per renderöity
 * kehys. Palauttaa purkajan; viimeinen purkaja palauttaa scenen oman
 * koukun. Yksi kaatuva kuuntelija ei kaada piirtoa.
 */
export function kytkePallonKehys(pallo, kotelo, kuuntelija, ikkuna = globalThis) {
  const scene = pallo?.scene?.();
  if (!scene || typeof kuuntelija !== 'function') return () => {};
  let solmu = kehyskoukut.get(pallo);
  if (!solmu) {
    const alkuperainen = scene.onBeforeRender;
    solmu = { kuuntelijat: new Set(), kehys: 0, scene, alkuperainen };
    scene.onBeforeRender = function pallonKehyskoukku(renderer, kohde, kamera, ...loput) {
      if (typeof alkuperainen === 'function') alkuperainen.call(this, renderer, kohde, kamera, ...loput);
      const nyt = kehyskoukut.get(pallo);
      if (!nyt?.kuuntelijat.size) return;
      nyt.kehys += 1;
      const mitat = pallonKehysmitat(pallo, kotelo, kamera, ikkuna);
      mitat.kehys = nyt.kehys;
      // Kameran ennuste seuraavalle kehykselle (E4b) ja sen virhemitta.
      mitat.ennuste = ennustaKamera(nyt.edellinen, mitat);
      kirjaaEnnustevirhe(pallo, nyt.edellinen, mitat);
      nyt.edellinen = mitat;
      pallo.__viimeisinKehys = mitat;
      for (const k of [...nyt.kuuntelijat]) {
        try { k(mitat); } catch { /* yksi kerros ei kaada piirtoa */ }
      }
    };
    kehyskoukut.set(pallo, solmu);
  }
  solmu.kuuntelijat.add(kuuntelija);
  return () => {
    const nyt = kehyskoukut.get(pallo);
    if (!nyt) return;
    nyt.kuuntelijat.delete(kuuntelija);
    if (nyt.kuuntelijat.size) return;
    nyt.scene.onBeforeRender = nyt.alkuperainen;
    kehyskoukut.delete(pallo);
  };
}

/** Ennusteen virhe: edellisen kehyksen ennuste vastaan tämän kehyksen kamera (px). */
function kirjaaEnnustevirhe(pallo, edellinen, mitat) {
  const m = pallo.__ennusteMittarit ?? (pallo.__ennusteMittarit = {
    kehyksia: 0, ennustettuja: 0, virheSumma: 0, virheMax: 0, liikeSumma: 0,
  });
  m.kehyksia += 1;
  const e = edellinen?.ennuste;
  const pov = mitat.pov;
  if (!e?.pov || !pov || !(mitat.H > 0)) return;
  const kaista = nakyvaKaista(pov.altitude, mitat.fov);
  const pxAste = mitat.H / Math.max(1e-6, kaista);
  const ero = (a, b) => {
    let dl = a.lng - b.lng;
    if (dl > 180) dl -= 360; else if (dl < -180) dl += 360;
    return Math.hypot(a.lat - b.lat, dl * Math.cos((pov.lat * Math.PI) / 180)) * pxAste;
  };
  // Liike = mitä nimiö laahaisi ilman ennustetta; virhe = ennusteen jäännös.
  // Hyppy yli puolen ruudun on kameran siirto (pointOfView), ei liikettä.
  const liike = ero(pov, edellinen.pov);
  if (!(liike > 0.05) || liike > mitat.H / 2) return;
  m.ennustettuja += 1;
  m.liikeSumma += liike;
  const virhe = e.dtMs > 0 ? ero(pov, e.pov) : liike;
  m.virheSumma += virhe;
  if (virhe > m.virheMax) m.virheMax = virhe;
}

/**
 * CSS2D-ELEMENTIT ENNUSTETTUUN PAIKKAAN (E4b). Kirjaston CSS2DRenderer
 * asettaa elementin `transform`in ja kutsuu heti perään CSS2DObjectin
 * `onAfterRender`-koukkua; siinä paikka kirjoitetaan uudestaan
 * ennustetulla kameralla lasketusta projektiosta. Näkyvyys (display)
 * jää kirjastolle. Ennustettu näkymämatriisi lasketaan kerran
 * kehyksessä kehyskoukussa; koukku kiinnitetään jokaiseen scenen
 * CSS2DObjectiin kerran (uudet elementit löytyvät seuraavalla
 * kehyksellä). Palauttaa purkajan.
 */
export function kytkePallonEnnuste(pallo, kotelo, ikkuna = globalThis) {
  if (!pallonEnnusteKaytossa(ikkuna)) return () => {};
  const scene = pallo?.scene?.();
  const kamera = pallo?.camera?.();
  if (!scene || !kamera?.projectionMatrix) return () => {};
  const Matrix4 = kamera.projectionMatrix.constructor;
  const Vector3 = kamera.position.constructor;
  const nakyma = new Matrix4();
  const kaanteinen = new Matrix4();
  const vp = new Matrix4();
  const silma = new Vector3();
  const keski = new Vector3(0, 0, 0);
  const ylos = new Vector3(0, 1, 0);
  const piste = new Vector3();
  let aktiivinen = false;
  let puoliW = 0;
  let puoliH = 0;
  const merkitty = new WeakSet();
  const siirra = function ennusteSiirto() {
    if (!aktiivinen || !this.element) return;
    piste.setFromMatrixPosition(this.matrixWorld).applyMatrix4(vp);
    if (!(piste.z >= -1 && piste.z <= 1)) return;
    pallo.__ennusteMittarit.siirtoja = (pallo.__ennusteMittarit.siirtoja ?? 0) + 1;
    const cx = this.center?.x ?? 0.5;
    const cy = this.center?.y ?? 0.5;
    this.element.style.transform = `translate(${-100 * cx}%,${-100 * cy}%)translate(${piste.x * puoliW + puoliW}px,${-piste.y * puoliH + puoliH}px)`;
  };
  const kehys = (mitat) => {
    const e = mitat.ennuste;
    aktiivinen = Boolean(e?.pov && e.dtMs > 0);
    if (!aktiivinen) return;
    pallo.__ennusteMittarit ??= { kehyksia: 0, ennustettuja: 0, virheSumma: 0, virheMax: 0, liikeSumma: 0 };
    const R = mitat.sade;
    const p = pallonPiste(e.pov.lat, e.pov.lng, R * (1 + e.pov.altitude));
    silma.set(p.x, p.y, p.z);
    nakyma.lookAt(silma, keski, ylos);
    nakyma.setPosition(silma);
    kaanteinen.copy(nakyma).invert();
    vp.multiplyMatrices(mitat.kamera.projectionMatrix, kaanteinen);
    // CSS2D-kerros on kotelon css-pikseleissä (CSS2DRenderer.setSize).
    puoliW = (kotelo?.clientWidth ?? mitat.W) / 2;
    puoliH = (kotelo?.clientHeight ?? mitat.H) / 2;
    scene.traverse((o) => {
      if (!o.isCSS2DObject || merkitty.has(o)) return;
      merkitty.add(o);
      o.onAfterRender = siirra;
    });
  };
  const pura = kytkePallonKehys(pallo, kotelo, kehys, ikkuna);
  return () => { aktiivinen = false; pura(); };
}

/*
 * ══════════════════════════════════════════════════════════════════
 * POHJAPALLO EI SAA OLLA MUSTA (omistaja 19.9.2026 klo 14.58)
 * ══════════════════════════════════════════════════════════════════
 *
 * Sanatarkasti, iPhone-kuva v1954:n Ranskan pelinäkymästä:
 * *"Panoroidessa viela bugittaa hetkellisesti. Korjaantuu kylla mutta
 * liikkeen aikana nain"* — Keski-Ranskan päälle ilmestyi yhden laatan
 * kokoinen TÄYSIN MUSTA suorakaide, joka hävisi liikkeen loputtua.
 *
 * MUSTA EI OLE LAATTA VAAN AUKKO. Mitattuna (savuke-musta-laatta,
 * WebKit 390 × 844 dpr 3) laattamoottorin ryhmässä on pohjapallo,
 * jonka materiaali on `MeshBasicMaterial`, väri RGB(0,0,0), ilman
 * tekstuuria — globe.gl asettaa sen mustaksi, koska laattatilassa
 * pallon oman pinnan EI ole tarkoitus näkyä. Se on ainoa pinta
 * laattojen alla, joten missä tahansa laatta puuttuu tai on vielä
 * häivettä aloittamassa, ruudulla on juuri tuo väri: puhdas musta.
 * Nopealla verkolla aukko on lyhyempi kuin yksi kehys; puhelimen
 * mobiiliverkossa se on sekunnin murto-osia ja NÄKYY.
 *
 * KORJAUS ON SAMA PERIAATE KUIN KERMALLA (KARTTAUUDISTUKSEN
 * PAATOKSET 37): pohjasävy on paikalla HETI eikä vasta laatan
 * mukana. Pohjapallo saa kartan oman vaalean sävyn, jolloin
 * puuttuva laatta näkyy kartanvärisenä aukkona eikä reikänä
 * avaruuteen. Sävy on sama kuin pohjoisen napakannen
 * (NAPAKANSI_POHJOINEN), eli laattojen oma merisävy — se on
 * mitattu kartan laatoista eikä keksitty tässä.
 *
 * MIKSI TÄMÄ PALLO EIKÄ `globeMaterial()`. Pallon OMA pinta (säde
 * 100, MeshPhongMaterial) on myös musta, mutta se on laattatilassa
 * `visible === false`: se on Astronautin kameran ja
 * topografialinssin pinta, ja sen väri on niiden asia (Raamattu
 * ASTRONAUTIN KAMERA kohta 37, PAATOKSET 46). Tässä kosketaan VAIN
 * laattamoottorin omaan taustapalloon, jolla ei ole tekstuuria —
 * joten yksikään linssi ei voi saada siitä sävyä päälleen.
 */
export function asennaPohjanSavy(pallo, ikkuna = globalThis) {
  let yritys = 0;
  const yrita = () => {
    const moottori = laattamoottori(pallo);
    const pohja = (moottori?.children ?? []).find((o) => o.geometry
      && o.material?.type === 'MeshBasicMaterial' && !o.material.map && o.material.color);
    if (pohja) { pohja.material.color.set(NAPAKANSI_POHJOINEN); return; }
    if (++yritys < 100) ikkuna.setTimeout(yrita, 100);
  };
  yrita();
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

/*
 * KOELIPPU `?koe=dpr15` (Fable 22.9.2026): pikselisuhde lukitaan 1,5:een
 * karkeaksi TÄYTTÖKOKEEKSI. Safarissa ei ole
 * EXT_disjoint_timer_query_webgl2:ta, joten GPU-aikaa ei voi mitata
 * suoraan; jos pitkät kehykset katoavat puolittamalla täytettävien
 * pikselien määrä (3 → 1,5 = neljäsosa pikseleistä), syy on täytössä tai
 * komposiittorissa. Jos eivät katoa, syy on muualla (laattojen vienti
 * GPU:lle, mipmapit, lämpökellotus).
 *
 * Lippu ohittaa sekä Tarkkuus liikkeessä -asetuksen että kerroksen omat
 * kynnykset, koska se on mittaus eikä ulkoasu.
 */
export const KOE_DPR = { dpr15: 1.5, dpr2: 2 };

/** Koelipun lukitsema pikselisuhde, tai null. */
export function kokeenPikselisuhde(kokeet = laattakerroksenKokeet()) {
  for (const [lippu, suhde] of Object.entries(KOE_DPR)) if (kokeet.has(lippu)) return suhde;
  return null;
}

function kytkeLaatunosto(moottori, pallo, kotelo, ikkuna) {
  const koeSuhde = kokeenPikselisuhde();
  const dpr = koeSuhde ?? (ikkuna.devicePixelRatio || 1);
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
  /*
   * LAATTAKERROS KORVAA LEPOKERROKSEN JA LAATUTILAT (erä E1). Kun kerros
   * on päällä, kirjaston kynnykset ja pikselisuhde EIVÄT enää vaihdu
   * liikkeen mukaan (asetaTila palaa heti): kynnykset ovat kirjaston
   * oletus, pohja on naulattu tasoon POHJAN_TASO_MAX, ja pikselisuhde
   * asetetaan kerran lepotilan arvoon. Terävyys tulee kerrokselta, joka
   * päivittyy jokaisella updatePov-kutsulla ja harventaa itse
   * (LAATTAKERROS_PAIVITYSVALI_LIIKE_MS). Ilman kerrosta
   * (?laattakerros=0) kaikki alla oleva toimii täsmälleen kuten v1645 —
   * se on perääntymistie, jota ei saa rikkoa.
   */
  const kerrosPaalla = laattakerrosPaalla(ikkuna, LAATTAKERROS_OLETUS);
  const kerros = kerrosPaalla ? luoLaattakerros({
    pallo, kotelo, ikkuna, renderer,
    kolmiulotteinen, pallonSarja: () => laattaluettelo,
    lauta: PALLO_LAUTA, naparaja: NAPAKANNEN_LEVEYS,
    // Esilataus levossa palvelutyöntekijän koriin (js/laattaesilataus.js).
    esilataa: ikkuna.navigator?.serviceWorker ? (osoitteet) => { void lahetaEsilataus(osoitteet, ikkuna.navigator, null); } : null,
    // Tason valinta ja laatan koko levon suhteella (ks. PIKSELISUHDE KERROKSEN KANSSA).
    lepoSuhde: Math.min(ikkuna.devicePixelRatio || 1, LAATU_PIKSELISUHDE_LEPO),
  }) : null;
  if (kerros) lepokerrokset.set(pallo, kerros);
  /*
   * POHJA VAPAUTETAAN, JOS KERROS EI PIIRRÄ (omistajan kuvakaappaus
   * v1650, iPad, Ateenan lähikuva: *"pohjalaatta on tällä zoomilla
   * selvästi sumea"*, laattojen väliset sävyerot ruutuina, ei yhtään
   * poltettua nimeä).
   *
   * Laattakerros sammuu KOKONAAN, jos pyramidin ja pallon oman sarjan
   * versiot eroavat (lepokerroksenKerrokset) tai jos pyramidin
   * luetteloa ei saada. Sarjat poltetaan eri ajoissa, joten tämä on
   * ihan tavallinen välitila — mutta pohja jäi silloin naulattuna
   * tasoon POHJAN_TASO_MAX (5), eli koko kartta oli z5:tä venytettynä.
   * Syvempi zoom (v1649, PALLOLAUDAN_LAHIN_LEVEYS 60) tekisi siitä vielä
   * kaksin verroin sumeamman.
   *
   * Kun tila todetaan, kerros puretaan ja pohja saa takaisin OMAN
   * syvimmän tasonsa (laatat.json tasot.max) ja v1645:n laatutilat:
   * kuva on silloin pahimmillaan sitä, mitä pallo näytti ennen
   * laattakerrosta — ei z5:tä. Kirjaston asetin on triggerUpdate:false
   * (globeTileEngineMaxLevel → tileEngine.maxLevel), joten moottoria ei
   * rakenneta uudestaan eikä tämä kääre irtoa.
   */
  let kerrosKaytossa = Boolean(kerros);
  /*
   * KERROS PÄIVITTYY PIIRTOKOUKUSSA, EI TAPAHTUMAKÄSITTELIJÄSSÄ (vika
   * v1649, ks. YKSI KEHYS, YKSI MITTA yllä). Ennen tätä päivitys ajettiin
   * updatePovista eli pointermoven sisältä; nyt se saa saman kameran ja
   * saman ruudun koon kuin vektorikerros, siltä kehykseltä, joka
   * piirretään. Harvennus (LAATTAKERROS_PAIVITYSVALI_LIIKE_MS) on
   * ennallaan kerroksen sisällä.
   */
  /*
   * POHJA PIILOON, KUN KERROS PEITTÄÄ KOKO RUUDUN (sulavuuskatsaus
   * 22.9.2026 kohta 2). Kirjaston moottori (pohjapallo + z5-laatat) on
   * kerroksen alla aina, myös silloin, kun kerroksen laatat peittävät
   * jokaisen ruudun näytepisteen täysin häivytettynä — silloin se on
   * yksi tai kaksi täyttökerrosta, jotka eivät näy. Moottorin ryhmä
   * piilotetaan (`visible = false`: three ei projisoi eikä piirrä sen
   * lapsia) heti, kun `kerros.peittaaKokonaan()` on tosi, ja
   * palautetaan heti, kun ei ole (reunan uusi laatta puuttuu, häive
   * kesken, korkeus yli kerroksen rajan, kerros vapautettu). Moottori
   * jatkaa laattojensa hakua piilossakin (updatePov ei katso
   * näkyvyyttä), joten paluu on välitön. `?koe=pohjavanha` pitää
   * pohjan aina piirrossa.
   */
  const pohjanPiilotus = Boolean(kerros) && !laattakerroksenKokeet().has('pohjavanha');
  moottori.pohjaPiilossa = false;
  const tahdistaPohjanNakyvyys = () => {
    const piiloon = pohjanPiilotus && kerrosKaytossa && kerros.peittaaKokonaan();
    if (piiloon === moottori.pohjaPiilossa) return;
    moottori.pohjaPiilossa = piiloon;
    moottori.visible = !piiloon;
  };
  const kehyspurku = kerros
    ? kytkePallonKehys(pallo, kotelo, (kehys) => {
      if (!kerrosKaytossa) { tahdistaPohjanNakyvyys(); return; }
      kerros.paivita(kehys, true, { liike: Boolean(lepoAjastin) });
      vapautaPohja();
      tahdistaPohjanNakyvyys();
    }, ikkuna)
    : () => {};
  const lepokerros = kerros ? null : luoLepokerros({
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
  /*
   * PIKSELISUHDE KERROKSEN KANSSA (js/tarkkuus-asetus.js): terävä ja
   * kokeellinen pitävät levon katon (3) myös liikkeessä; tasainen pudottaa
   * liikkeessä kattoon 2 ja palauttaa 3:n levossa — yksi puskurinvaihto
   * eleen alussa (LAATU_LIIKEVIIVE_MS:n jälkeen) ja lopussa
   * (LAATU_LEPOVIIVE_MS). Laattakerros valitsee tasonsa ja kokoaa
   * laattansa aina LEVON suhteella (lepoSuhde), joten liikkeen alempi
   * puskuri ei vaihda laattatasoa eikä jätä sumeita laattoja levoon.
   */
  const lepoSuhde = () => Math.min(dpr, LAATU_PIKSELISUHDE_LEPO);
  const tahdistaPikselisuhde = (lepoon) => {
    if (!renderer) return;
    // Koelippu lukitsee suhteen: mittaus ei saa vaihdella asetuksen mukana.
    const suhde = koeSuhde ?? pikselisuhdeTarkkuudella(tarkkuusLiikkeessa(ikkuna), dpr, lepoon || aina());
    if (renderer.getPixelRatio?.() !== suhde) renderer.setPixelRatio(suhde);
  };
  const asetaTila = (lepoon) => {
    lepo = lepoon;
    // Kerros päällä: kynnykset jäävät asennuksen arvoihin; pikselisuhde
    // seuraa pelaajan asetusta (tahdistaPikselisuhde).
    if (kerrosKaytossa) { tahdistaPikselisuhde(lepoon); return; }
    if (aina()) lepoon = true;
    const nakyma = kameranNakyma();
    kynnysLat = Number.isFinite(nakyma?.lat) ? nakyma.lat : 0;
    const teravyys = laatuTeravyys(nakyma?.altitude);
    kynnysTeravyys = teravyys;
    const kerroin = (lepoon ? lepokerroin(piirtokorkeus(), teravyys) : 1) * napakerroin(kynnysLat);
    moottori.thresholds = laattakynnykset(kerroin);
    const suhde = koeSuhde ?? Math.min(dpr, lepoon ? LAATU_PIKSELISUHDE_LEPO : LAATU_PIKSELISUHDE_LIIKE);
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
  /**
   * Toteaa, ettei laattakerros piirrä pysyvästä syystä, ja palauttaa
   * pohjan omaan syvimpään tasoonsa (ks. POHJA VAPAUTETAAN yllä).
   * Kertakäyttöinen: kun kerros on kerran purettu, sitä ei herätetä
   * uudestaan tässä istunnossa.
   */
  const vapautaPohja = () => {
    if (!kerrosKaytossa) return;
    // Kaksi kenttää ilman varausta: mittarit() kopioi koko taulun ja
    // pyydettyjen osoitteiden joukon, ja tämä ajetaan joka kehyksellä.
    if (kerros.tila() === 'nakyy' || !POHJAN_VAPAUTUS_SYYT.has(kerros.syy())) return;
    kerrosKaytossa = false;
    kerros.pura();
    // KAHVA JÄÄ PAIKALLEEN (lepokerrokset): savukkeet ja mittarit lukevat
    // siitä yhä kerroksen omat pyramidipyynnöt ja syyn — puretun
    // kerroksen mittarit kertovat tilan 'purettu'. Kartta poistetaan
    // vasta purkajassa, kun koko laatunosto irrotetaan.
    const syvin = laattatasoMax(laattaluettelo);
    if (Number.isFinite(syvin)) {
      if (typeof pallo.globeTileEngineMaxLevel === 'function') pallo.globeTileEngineMaxLevel(syvin);
      else moottori.maxLevel = syvin;
    }
    // v1645:n laatutilat takaisin ja tarkempi taso heti, ei vasta liikkeestä.
    asetaTila(lepo);
    if (kamera) alkuperainen.call(moottori, kamera);
  };

  const lepoon = () => {
    lepoAjastin = 0;
    if (!kamera) return;
    asetaTila(true);
    alkuperainen.call(moottori, kamera);
    // Sama lepo ajoittaa lepokerroksen (pyramidin laatat näkyvän päälle) —
    // kerros kootaan vasta AIDON levon jälkeen, ei raahauksen tauolla
    // (LEPOKERROS_LEPOVIIVE_MS ja sormivahti, ks. luoLepokerroksenAjoitus).
    // Laattakerros ei odota lepoa: se päivittyy myös liikkeessä, ja tämä
    // on vain harventamaton päivitys pysähdyksen jälkeen.
    if (kerrosKaytossa) {
      kerros.paivita(pallonKehysmitat(pallo, kotelo, kamera, ikkuna), false);
      vapautaPohja();
    } else lepokerros?.levossa();
    for (const viive of [0, 800, 2500]) {
      const t = ikkuna.setTimeout(() => { ajastimet.delete(t); if (lepo) teroita(); }, viive);
      ajastimet.add(t);
    }
  };

  /*
   * ======== POHJA PÄIVITTYY HARVEMMIN KUIN RUUTU ====================
   *
   * OMISTAJA 7.9.2026 (sanatarkasti): *"kartta pyörii nyt jo todella
   * hyvin, mutta jos vertaa google earthiin, niin vielä tulee vähän
   * tökkimistä … mittari kyllä näyttää pysyvän 55-60 fps tasossa"*.
   *
   * MITATTU (savuke-pallo-kehystahti, 7.9.2026, 390 × 844 dpr 2,
   * 41 laitekehystä): kirjaston OMA laattamoottori (`updatePov`) ajettiin
   * 79 kertaa eli KAKSI KERTAA JOKAISESSA KEHYKSESSÄ, ja vaikka
   * mediaanikutsu oli 0,4 ms, pisin oli 12,2 ms ja raskaimmassa
   * kehyksessä kutsut veivät yhteensä 17 ms — yksin koko 60 Hz:n
   * kehysbudjetin. Juuri se on omistajan näkemä nykäys: keskiarvo
   * pysyy 55–60 fps:ssä, mutta joka kymmenes kehys putoaa.
   *
   * MIKSI POHJAN EI TARVITSE PÄIVITTYÄ JOKA KEHYS. Kun laattakerros on
   * päällä, kirjaston moottori ei enää ole kartta vaan KARKEA POHJA:
   * sen taso on naulattu POHJAN_TASO_MAX:iin (5), yksi laatta kattaa
   * 11,25°, ja kerros piirtää sen päälle terävän kuvan. Pohja tarvitaan
   * vain siellä, missä kerros ei vielä peitä. Se ei siis kaipaa uutta
   * luettelointia 60 kertaa sekunnissa vaan silloin, kun kamera on
   * oikeasti siirtynyt murto-osan näkymästään.
   *
   * KOLME EHTOA, JOTKA OHITTAVAT HARVENNUKSEN — pohja päivitetään aina,
   * jos (1) laattakerros ei ole käytössä (silloin moottori ON kartta),
   * (2) kamera on siirtynyt vähintään POHJAN_ASKEL_OSUUS:n verran omasta
   * etäisyydestään, tai (3) kerros ei peitä koko näkyvää aluetta — mutta
   * silloinkin enintään POHJAN_VALI_MS:n välein, koska juuri
   * latauksen aikana ehto olisi voimassa joka kehyksellä ja koko
   * harvennus jäisi tekemättä. Lisäksi `lepoon` ajaa moottorin aina
   * pysähdyksen jälkeen, joten LEVOSSA POHJA ON TÄSMÄLLEEN SAMA kuin
   * ennen tätä muutosta.
   *
   * EI VAIKUTA KUVAAN: pohja on kerroksen alla, se säilyttää jo
   * ladatut laattansa, ja z5:n laatta kattaa 11,25° eli enemmän kuin
   * koko näkymä pelin lähikuvassa. Perääntyminen on
   * `?pohjanharvennus=0`. Laskuri `moottori.pohjapaivityksia` kertoo
   * savukkeelle, montako kertaa pohja oikeasti päivitettiin.
   */
  const pohjanPaikka = { x: NaN, y: NaN, z: NaN };
  const pohjanHarvennus = pohjanHarvennusPaalla(ikkuna);
  let pohjanHetki = -Infinity;
  moottori.pohjapaivityksia = 0;
  const pohjaPaivitetaan = (kam, nyt) => {
    if (!kerrosKaytossa || !pohjanHarvennus) return true;
    if (kameranSiirtyma(kam.position, pohjanPaikka) >= POHJAN_ASKEL_OSUUS) return true;
    return !kerros.peittaa() && nyt - pohjanHetki >= POHJAN_VALI_MS;
  };
  const merkitsePohja = (kam, nyt) => {
    pohjanPaikka.x = kam.position.x;
    pohjanPaikka.y = kam.position.y;
    pohjanPaikka.z = kam.position.z;
    pohjanHetki = nyt;
    moottori.pohjapaivityksia += 1;
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
        // 6.9.2026 ilta, ks. LEPOKERROS JA LIIKE alempana). Laattakerros
        // ei piiloudu koskaan — se on liikkeessä yhtä terävä kuin levossa.
        lepokerros?.piilota();
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
    // Laattakerros EI päivity täältä: se ilmoittautuu piirtokoukkuun
    // (kytkePallonKehys), jotta se ja vektorikerros lukevat saman
    // kameran samasta kehyksestä — updatePov tulee pointermoven sisältä.
    // Sieltä ajetaan myös vapautaPohja (ks. POHJA VAPAUTETAAN yllä).
    if (kam?.position) {
      const nyt = ikkuna.performance?.now?.() ?? Date.now();
      if (!pohjaPaivitetaan(kam, nyt)) return undefined;
      merkitsePohja(kam, nyt);
    }
    return alkuperainen.call(this, kam);
  };
  asetaTila(false);
  /*
   * Pikselisuhde kerran asennuksessa, kun kerros on päällä: puskurin koon
   * vaihto on raskas kehys eikä kuvan tarkkuus saa vaihtua liikkeessä.
   */
  if (kerros && renderer) tahdistaPikselisuhde(true);
  // Asetuksen vaihto valikosta vaikuttaa heti (terävä ↔ tasainen).
  const tarkkuusKuuntelija = () => { if (kerrosKaytossa) tahdistaPikselisuhde(lepo); };
  ikkuna.addEventListener?.(TARKKUUS_TAPAHTUMA, tarkkuusKuuntelija);
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
    ikkuna.removeEventListener?.(TARKKUUS_TAPAHTUMA, tarkkuusKuuntelija);
    laatuKuuntelijat.delete(pakotus);
    kehyspurku();
    ikkuna.clearTimeout(lepoAjastin);
    for (const t of ajastimet) ikkuna.clearTimeout(t);
    lepokerros?.pura();
    if (kerros) { kerros.pura(); lepokerrokset.delete(pallo); }
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

/*
 * ======== NAVAT TOPOGRAFIALINSSIN ALLA (PAATOKSET 41 kohta 2) =======
 *
 * Omistajan iPhone-kuva 18.9.2026: reliefilinssi auki, pohjoisnapa
 * ruudulla, ja keskellä ISO BEIGE LEVY, jonka ympärillä tummansininen
 * rengas; reliefiä vain reunoilla. Levy on juuri nämä kaksi kappaletta
 * — yksivärinen napakansi (`#c9c2af`) ja sen päälle ladattu
 * SEEPIAKARTAN napakalotti — eikä kumpikaan tiedä linssistä mitään.
 * Rengas on kansien ja reliefin poltetun reunan (76,7°…83,7°) väliin
 * jäävä laattakaistale, joka maalattiin avomeren värillä.
 *
 * Linssin ajaksi napa saa reliefin omat sävyt: pohjoisessa avomeri
 * (Jäämeri on pyramidin asteikolla syvää merta, sama sävy kuin
 * kaistaleessa, joten rengasta ei synny) ja etelässä napajää — se
 * VAALEA, jonka polttotyökalu antaa mannerjäälle
 * (tools/reliefivarit.mjs JAAN_VARI), ei kartan beige.
 *
 * Kalotti ei ole värjättävissä (se on kuva), joten se piilotetaan
 * linssin ajaksi ja palautetaan sulkiessa.
 */
export const NAPAKANSI_RELIEFI_POHJOINEN = MERIVARI;
export const NAPAKANSI_RELIEFI_ETELA = JAAVARI;

/*
 * ======== NAPAKALOTIT: KANNEN TILALLE OMA KARTTA ====================
 *
 * OMISTAJA 11.9.2026, sanatarkasti: *"Maapallon ylä- ja alaosan voisi
 * piirtää oikeanlaiseksi. Siinä näkyy vielä se vanhan kartan teksti.
 * Pohjoisnavalta taas puuttuu kokonaan kartta ihan yläosasta.
 * Etelänavalta taas pitää piirtää vähän isompi alue."* Painatusteksti
 * on korjattu v1771:ssä; tässä on se kartta, jota navoilta puuttui.
 *
 * MIKSI OMA KUVA EIKÄ LAATTA. Pelin juliste on Miller-projektiossa ja
 * laatat Web Mercatorissa: kumpikaan ei ulotu navalle (Mercator loppuu
 * 85,05°:een ja juliste jo 84,0° N:ään ja 61,47° S:ään). Napaa ei siis
 * voi laatoittaa millään tarkkuudella — se on projektion reikä, ei
 * tarkkuuskysymys. Siksi kummallekin navalle piirretään OMA
 * ATSIMUTAALINEN kuva (tools/tee-napakalotit.mjs), jossa napa on
 * keskellä ja kuvassa ei ole reikää lainkaan.
 *
 * KUVAN ALA ON ISOMPI KUIN KANNEN. Pohjoinen kalotti kattaa 80°–90° ja
 * eteläinen 60°–90° eli selvästi enemmän kuin kannen 83,7° — kaksi
 * syytä: (1) omistaja pyysi etelään *"vähän isomman alueen"*, ja koko
 * Etelämanner mahtuu vasta 60°:sta alkaen; (2) kuvan ULKOREUNA ON
 * HÄIVYTETTY LÄPINÄKYVÄKSI, ja häivytyskaista tarvitsee laattoja
 * allensa — muuten liitos näkyisi saumana. Kalotti siis ylittää
 * laattojen kanssa 80°–83,7° (pohjoinen) ja 60°–83,7° (etelä), ja
 * niillä leveyksillä sen alla on juliste, johon se liukuu.
 *
 * VANHA YKSIVÄRINEN KANSI JÄÄ VARAKSI. Kuva haetaan ämpäristä; jos
 * verkko on poikki tai polku 404, kalottia ei lisätä ja pallo piirtyy
 * täsmälleen kuten ennen (yksivärinen kansi 83,7°:sta napaan).
 *
 * SÄVY TULEE LAATOILTA, EI KALOTIN OMASTA TOTUUDESTA (omistaja
 * 11.9.2026: *"Rajat näkyvät yhä."*). Laatoissa ei ole napojen
 * leveyksillä karttaa lainkaan: juliste loppuu ~79,6° N:ään ja
 * ~61,5° S:ään, ja loppu on tasaista täytemerta. Kalotti piirtää
 * oikean batymetrian, joka on sitä täytettä 9–12 luminanssiyksikköä
 * tummempi — ja se ero näkyi kiekkona, jonka kehä erottui kaarena.
 * Kalotin meri ankkuroidaan siksi POLTOSSA laattojen liitossävyyn
 * (tools/tee-napakalotit.mjs LIITOSSÄVY); peli ei säädä sävyjä.
 *
 * KANSI OTETAAN POIS NÄKYVISTÄ, KUN KUVA ON PAIKALLAAN. Kansi on
 * varakappale eikä pohjamaali: se on läpinäkymätön eikä kalotti
 * kirjoita syvyyttä (depthWrite: false), joten pelkkä sama
 * renderOrder ei takaa, kumpi jää päälle. Mitattu 11.9.2026
 * etelänavalta: kansi piirtyi kalotin PÄÄLLE, ja koska etelänapa on
 * suunnatun valon varjopuolella, se näkyi siellä tummana kiekkona
 * (keskisävy 183,1 vs. kalotin 188,3) — ja sen päällä vain
 * vektorirantaviiva. Ks. lisaaNapakannet.
 *
 * ── KALOTTI ZOOMATESSA (omistaja 11.9.2026, sanatarkasti: *"Niin se
 * saisi piirtyä hyvin, myös silloin kun sitä zoomaan."*) ────────────
 *
 * Kaksi muutosta, ja kumpikin on MITATTU eikä arvattu (mittaukset
 * tools/tee-napakalotit.mjs:n ajoista 11.9.2026):
 *
 *  1. VEKTORIVIIVA KALOTIN PÄÄLLE. Rantaviiva on pallolla vektori
 *     (js/pallovektorit.js), joka on tasan puoli laitepikseliä leveä
 *     joka korkeudella — ja sen aineisto ulottuu napaan asti. Kalotti
 *     kuitenkin PEITTI sen: vektorikerroksen renderOrder on −0,5 ja
 *     kalotin oli oletus 0, joten läpinäkyvien jonossa kalotti
 *     maalattiin viivan päälle. Etelämantereen rantaviiva ja
 *     jäähyllyn reuna olivat siksi lähikuvassa pelkkää venytettyä
 *     kuvapikseliä, vaikka terävä viiva oli jo olemassa. Kansi ja
 *     kalotti saavat nyt renderOrderin −0,75: laattojen ja
 *     lepokerroksen (≤ −1) päälle mutta vektoriviivan (−0,5) alle.
 *     Tämä on koko zoom-korjauksen tärkein osa ja maksaa nolla tavua.
 *
 *  2. KUVA ON WEBP, EI PNG. Paperin rae, hypsometria ja rinnevarjo
 *     ovat kohinaa, jota häviötön PNG ei pakkaa: eteläkalotti oli
 *     2048 px:n PNG:nä 4,58 Mt (pohjoinen 4,84 Mt). Sama kuva webp
 *     q88 -pakattuna on 0,29 Mt eli 16 kertaa pienempi, ja tiedosto
 *     on alfansa puolesta sama (alphaQuality 100, reunan häivytys
 *     säilyy). Kun tavu ei enää ole este, kuvan sivu voi kasvaa:
 *     4096 px:n eteläkalotti on webp:nä 0,93 Mt — yhä viidesosa
 *     entisen 2048 px:n PNG:stä, mutta kaksinkertainen tarkkuus
 *     (34 → 68 kuvapikseliä leveysastetta kohti). Pohjoiskalotti jää
 *     2048:aan: se kattaa vain 80°–90°, jolloin 2048 px on jo 102
 *     px/aste. Kokojen valinta on työkalun lippuja (--koko-etela),
 *     joten kuvaa ei tarvitse kasvattaa molemmista päistä.
 *
 * KAKSITASOISTA KALOTTIA EI TEHTY, ja syy on aineistossa: korkeus
 * tulee ETOPOn 3 kaariminuutin ruudukosta (tools/korkeusaineisto,
 * 0,05° ≈ 5,5 km) ja rantaviiva Natural Earthin 1:10M-aineistosta.
 * 4096 px:n kalotissa on jo noin kolme kuvapikseliä jokaista
 * korkeusnäytettä kohti — tarkempi kuva ei enää sisältäisi uutta
 * tietoa, vain suurennettua interpolaatiota. Terävyys, jonka silmä
 * lähikuvassa näkee, on RANTAVIIVA, ja se saadaan kohdasta 1
 * ilmaiseksi ja ilman rajaa.
 */
/**
 * Kalottikuvien versio ämpärissä (uusi ajo = uusi versio, ks. työnkulku).
 *
 * 2026-09-11b on WEBP-erä (ks. yllä kohta 2): polku on eri, joten
 * vanha PNG-erä jää koskematta selainten vuoden välimuistiin. Ennen
 * kuin työnkulku on ajettu tähän versioon, kuva 404 ja pallo piirtyy
 * yksivärisellä kannella kuten ennen kalotteja — sama varapolku kuin
 * katkenneella verkolla.
 */
export const NAPAKALOTTI_VERSIO = '2026-09-11b';
/**
 * Kalottien ala: `reuna` on kuvan ULKOKEHÄN leveysaste ja `merkki`
 * navan etumerkki. Samat luvut lukee työkalu (tools/tee-napakalotit.mjs),
 * joten kuva ja pinta eivät voi olla eri mieltä kuvan alasta.
 */
export const NAPAKALOTTI = Object.freeze({
  pohjoinen: Object.freeze({ reuna: 80, merkki: 1 }),
  etela: Object.freeze({ reuna: -60, merkki: -1 }),
});
/** Kalottikuvien tiedostopääte (webp, ks. NAPAKALOTTI_VERSIO kohta 2). */
export const NAPAKALOTTI_PAATE = 'webp';
/** Kalotin kuva ämpärissä. */
export const napakalotinUrl = (puoli) => `${R2}julisteet/pallo/napakalotit/${NAPAKALOTTI_VERSIO}/${puoli}.${NAPAKALOTTI_PAATE}`;
/**
 * Napakannen ja -kalotin paikka läpinäkyvien jonossa: laattojen ja
 * lepokerroksen (≤ −1) päälle mutta VEKTORIVIIVOJEN (−0,5) alle, jotta
 * rantaviiva näkyy kalotin päällä terävänä joka korkeudella
 * (js/pallovektorit.js VEKTORIT_RENDER_ORDER).
 */
export const NAPAKALOTTI_RENDER_ORDER = -0.75;

/**
 * Pinnan pisteen paikka KALOTIN KUVASSA yksikköruudussa: x oikealle,
 * y ALASPÄIN (kuvan oma suunta), kuvan keskus (0,5, 0,5) on napa ja
 * ympyrän kehä (r = 1) on `reuna`-leveysaste.
 *
 * PROJEKTIO ON ATSIMUTAALINEN EKVIDISTANTTI: etäisyys kuvan keskustasta
 * on suoraan verrannollinen navan etäisyyteen asteina. Nollameridiaani
 * on YLÖSPÄIN kummassakin kuvassa.
 *
 * KIERTOSUUNTA ON ERI NAVOILLA ERI, eikä se ole makuasia: kuvaa
 * katsotaan pallon ULKOPUOLELTA. Pohjoisnavan päältä katsottuna
 * pituusaste kasvaa VASTAPÄIVÄÄN (90° E on vasemmalla), etelänavan alta
 * katsottuna MYÖTÄPÄIVÄÄN. Väärä suunta antaisi peilikuvan, joka ei
 * näytä virheeltä vaan väärältä kartalta — tests/napakalotit.test.mjs
 * todistaa suunnan kolmion kiertosuunnasta pallolla (ei silmällä).
 */
export function kalotinKuvapiste(puoli, lat, lon) {
  const k = NAPAKALOTTI[puoli];
  if (!k) throw new Error(`tuntematon napakalotti: ${puoli}`);
  const napa = k.merkki * 90;
  const r = (napa - lat) / (napa - k.reuna);
  // Kulma myötäpäivään ylöspäin osoittavasta nollameridiaanista.
  const kulma = (k.merkki > 0 ? -lon : lon) * (Math.PI / 180);
  return {
    x: 0.5 + 0.5 * r * Math.sin(kulma),
    y: 0.5 - 0.5 * r * Math.cos(kulma),
    r,
  };
}

/**
 * Kuvapisteen (x, y yksikköruudussa, y alaspäin) leveys- ja pituusaste:
 * `kalotinKuvapiste`:n käänteisfunktio. Työkalu piirtää kuvan tällä —
 * kuva ja UV:t tulevat siis samasta kaavasta kumpaankin suuntaan.
 */
export function kalotinAsteet(puoli, x, y) {
  const k = NAPAKALOTTI[puoli];
  if (!k) throw new Error(`tuntematon napakalotti: ${puoli}`);
  const dx = 2 * x - 1;
  const dy = 2 * y - 1;
  const r = Math.hypot(dx, dy);
  const kulma = (Math.atan2(dx, -dy) * 180) / Math.PI;
  const napa = k.merkki * 90;
  return { lat: napa - r * (napa - k.reuna), lon: k.merkki > 0 ? -kulma : kulma, r };
}

/**
 * Kalotin UV kuvassa. Sama kuin `kalotinKuvapiste`, mutta v on
 * käännetty: WebGL:n tekstuurin origo on vasemmassa ALAnurkassa, kun
 * kuvan origo on vasemmassa YLÄnurkassa (flipY, sama sääntö kuin
 * lepokerroksella, js/pallolaatat.js lepokerroksenUV).
 */
export function kalotinUv(puoli, lat, lon) {
  const p = kalotinKuvapiste(puoli, lat, lon);
  return { u: p.x, v: 1 - p.y };
}

/**
 * Kalotin verkko: napa keskellä, `kehia` rengasta reunalle ja
 * `sektoreita` sektoria kehän ympäri. Paikat pallon pinnalta
 * (pallonPiste), normaali säteen suunta, UV kalotin kuvasta.
 *
 * PITUUSASTE KIERTÄÄ NAVAN MERKIN SUUNTAAN (`merkki`), jolloin
 * kolmioiden kiertosuunta on kummallakin navalla sama kuin kirjaston
 * omilla laattaverkoilla — etupuoli ulospäin, ei yhtään käännettyä
 * kolmiota. Sama temppu kuin lepokerroksella: rivi etelään, sarake
 * itään; etelässä rivi kulkee pohjoiseen, joten sarake kulkee länteen.
 */
export function kalotinVerkko({
  puoli, sade, kehia = 40, sektoreita = 128,
}) {
  const k = NAPAKALOTTI[puoli];
  if (!k) throw new Error(`tuntematon napakalotti: ${puoli}`);
  const napa = k.merkki * 90;
  const kohtia = (kehia + 1) * (sektoreita + 1);
  const paikat = new Float32Array(kohtia * 3);
  const normaalit = new Float32Array(kohtia * 3);
  const uvt = new Float32Array(kohtia * 2);
  let i = 0;
  for (let iy = 0; iy <= kehia; iy += 1) {
    const lat = napa + ((k.reuna - napa) * iy) / kehia;
    for (let ix = 0; ix <= sektoreita; ix += 1) {
      const lon = k.merkki * ((360 * ix) / sektoreita) - 180 * k.merkki;
      const p = pallonPiste(lat, lon, sade);
      const n = pallonPiste(lat, lon, 1);
      paikat[i * 3] = p.x; paikat[i * 3 + 1] = p.y; paikat[i * 3 + 2] = p.z;
      normaalit[i * 3] = n.x; normaalit[i * 3 + 1] = n.y; normaalit[i * 3 + 2] = n.z;
      const uv = kalotinUv(puoli, lat, lon);
      uvt[i * 2] = uv.u; uvt[i * 2 + 1] = uv.v;
      i += 1;
    }
  }
  const indeksit = [];
  for (let iy = 0; iy < kehia; iy += 1) {
    for (let ix = 0; ix < sektoreita; ix += 1) {
      const a = iy * (sektoreita + 1) + ix + 1;
      const b = iy * (sektoreita + 1) + ix;
      const c = (iy + 1) * (sektoreita + 1) + ix;
      const d = (iy + 1) * (sektoreita + 1) + ix + 1;
      indeksit.push(a, b, d, b, c, d);
    }
  }
  return { paikat, normaalit, uvt, indeksit };
}

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
    if (kolmi?.laatatValmiit) { purkaja = lisaaNapakannet(kolmi, pallo.getGlobeRadius(), ikkuna); return; }
    if (++yritys < 100) ikkuna.setTimeout(yrita, 100);
  };
  yrita();
  return () => purkaja();
}

/** Kaksi kantta × (peittävä + häivyttyvä reuna) pallon ryhmään. */
function lisaaNapakannet(kolmi, sade, ikkuna = globalThis) {
  const { Mesh, SphereGeometry, LaattaMateriaali, juuri } = kolmi;
  const asteina = (a) => (a * Math.PI) / 180;
  const tehdyt = [];
  /** Kannet puolittain, jotta kalotti voi piilottaa korvaamansa kannen. */
  const kannet = { pohjoinen: [], etela: [] };
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
    verkko.renderOrder = NAPAKALOTTI_RENDER_ORDER;
    verkko.userData.napakansi = true;
    // Kansi ei ota kosketusta vastaan: pelin merkit ja onGlobeClick
    // toimivat kuten ennen (kirjasto säteenjäljittää pallon lapsia).
    verkko.raycast = () => {};
    juuri.add(verkko);
    tehdyt.push(verkko);
    kannet[etela ? 'etela' : 'pohjoinen'].push(verkko);
  };
  kansi(false, NAPAKANSI_POHJOINEN, false);
  kansi(false, NAPAKANSI_POHJOINEN, true);
  kansi(true, NAPAKANSI_ETELA, false);
  kansi(true, NAPAKANSI_ETELA, true);

  /*
   * KANSI SEURAA TOPOGRAFIALINSSIÄ (ks. NAPAKANSI_RELIEFI_* yllä).
   * Kalotti on pelin oman kartan kuva, joten linssin ajan se on pois ja
   * kansi näkyy — nyt reliefin sävyssä. Sulkiessa kaikki palaa
   * täsmälleen entiselleen: kalotti takaisin ja kansi sen alle
   * piiloon, jos kuva ehti latautua.
   */
  const kalottiLadattu = { pohjoinen: false, etela: false };
  const napojenSavy = (paalla, etela) => {
    if (paalla) return etela ? NAPAKANSI_RELIEFI_ETELA : NAPAKANSI_RELIEFI_POHJOINEN;
    return etela ? NAPAKANSI_ETELA : NAPAKANSI_POHJOINEN;
  };
  const linssiinPaivitys = (paalla) => {
    for (const puoli of ['pohjoinen', 'etela']) {
      for (const verkko of kannet[puoli]) {
        verkko.material?.color?.set?.(napojenSavy(paalla, puoli === 'etela'));
        verkko.visible = paalla ? true : !kalottiLadattu[puoli];
      }
    }
    for (const verkko of tehdyt) {
      if (verkko.userData?.napakalotti) verkko.visible = !paalla;
    }
  };
  const irrotaLinssi = kuunteleReliefiLinssi(linssiinPaivitys);
  if (reliefiKaytossa(ikkuna)) linssiinPaivitys(true);

  /*
   * KARTTAKALOTTI KANNEN PÄÄLLE (ks. NAPAKALOTIT yllä). Kuva haetaan
   * ämpäristä; verkko ja tekstuuri syntyvät vasta kun kuva on ladattu,
   * joten 404 tai katkennut verkko EI jätä palloa tyhjäksi eikä heitä
   * virhettä — silloin näkyy yksivärinen kansi kuten ennen.
   *
   * Kalotti on kannen yläpuolella (KOROTUS + 0,001) ja piirretään
   * läpinäkyvänä, koska sen uloin kehä on häivytetty alfalla
   * laattoihin. `depthWrite: false` on samasta syystä kuin häivekannella:
   * läpinäkyvä reuna ei saa kirjoittaa syvyyttä laattojen päälle.
   */
  let purettu = false;
  const kalotti = (puoli) => {
    if (!kolmi.Texture || !kolmi.BufferGeometry || !kolmi.BufferAttribute) return;
    const Kuva = ikkuna.Image;
    if (!Kuva) return;
    const kuva = new Kuva();
    // Sama CORS-lupa kuin lepokerroksen laatoilla: ilman sitä tekstuuri
    // olisi tahrittu eikä kelpaisi WebGL:lle.
    kuva.crossOrigin = 'anonymous';
    kuva.decoding = 'async';
    kuva.onerror = () => {};
    kuva.onload = () => {
      // Purettu sillä välin kun kuva latautui: ei lisätä mitään.
      if (purettu) return;
      const puskurit = kalotinVerkko({ puoli, sade: sade * (NAPAKANNEN_KOROTUS + 0.001) });
      const geometria = new kolmi.BufferGeometry();
      geometria.setAttribute('position', new kolmi.BufferAttribute(puskurit.paikat, 3));
      geometria.setAttribute('normal', new kolmi.BufferAttribute(puskurit.normaalit, 3));
      geometria.setAttribute('uv', new kolmi.BufferAttribute(puskurit.uvt, 2));
      geometria.setIndex(puskurit.indeksit);
      const tekstuuri = new kolmi.Texture(kuva);
      const malli = kolmi.tekstuurimalli;
      // Sama väriavaruus kuin laatoilla — muuten sävy hyppäisi saumassa.
      if (malli && 'colorSpace' in malli) tekstuuri.colorSpace = malli.colorSpace;
      else if (malli && 'encoding' in malli) tekstuuri.encoding = malli.encoding;
      tekstuuri.minFilter = THREE_LINEAR_MIPMAP_LINEAR;
      tekstuuri.magFilter = THREE_LINEAR;
      tekstuuri.wrapS = THREE_CLAMP;
      tekstuuri.wrapT = THREE_CLAMP;
      tekstuuri.needsUpdate = true;
      const materiaali = new LaattaMateriaali({
        map: tekstuuri, transparent: true, depthWrite: false,
      });
      const verkko = new Mesh(geometria, materiaali);
      // Vektoriviivan alle (ks. NAPAKALOTTI_RENDER_ORDER): rantaviiva
      // piirtyy kalotin päälle eikä katoa sen alle.
      verkko.renderOrder = NAPAKALOTTI_RENDER_ORDER;
      verkko.userData.napakalotti = puoli;
      verkko.raycast = () => {};
      juuri.add(verkko);
      tehdyt.push(verkko);
      /*
       * KANSI POIS, KUN KARTTA ON PAIKALLAAN (mitattu 11.9.2026).
       * Yksivärinen kansi on VARAKAPPALE sille, ettei kuvaa saada; kun
       * kuva on ladattu, kansi on sen alla turhana ja haitallisena.
       * Etelänavan kaappauksessa se piirtyi kalotin PÄÄLLE — napa on
       * suunnatun valon varjopuolella, joten kansi näkyi siellä tummana
       * kiekkona (mitattu keskisävy 183,1 vs. kalotin 188,3), ja sen
       * päällä oli vain vektorirantaviiva. Kansi ja kalotti ovat
       * SAMASSA renderOrderissa (NAPAKALOTTI_RENDER_ORDER: vektorien
       * alla), ja kaikki napakappaleet ovat origossa — THREE ei siis
       * erota niitä etäisyydelläkään. Kalotti ei myöskään kirjoita
       * syvyyttä (depthWrite: false). Piirtojärjestys ei siis ole
       * takeeksi mistään, eikä kalottia pidä nostaa vektorien yli
       * senkään vuoksi: varakappale otetaan yksinkertaisesti pois.
       */
      kalottiLadattu[puoli] = true;
      // Linssin ajan kansi on se, joka näkyy (reliefin sävyssä), ja
      // kalotti on piilossa: kuva ei saa nousta reliefin päälle.
      const linssi = reliefiKaytossa(ikkuna);
      verkko.visible = !linssi;
      for (const k of kannet[puoli]) k.visible = linssi;
    };
    kuva.src = napakalotinUrl(puoli);
  };
  kalotti('pohjoinen');
  kalotti('etela');

  return () => {
    purettu = true;
    irrotaLinssi();
    for (const verkko of tehdyt) {
      juuri.remove(verkko);
      verkko.geometry?.dispose?.();
      verkko.material?.map?.dispose?.();
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

/** Asennetut lepo- tai laattakerrokset pallo-instanssia kohti (savukkeet, lauta). */
const lepokerrokset = new WeakMap();
/**
 * Pallon pintakerroksen kahva ({ mittarit, kokoa, piilota, levossa })
 * tai null. Kerros on LAATTAKERROS, kun se on päällä (oletus), ja vanha
 * LEPOKERROS silloin kun se on sammutettu (?laattakerros=0). Kahvan
 * muoto on sama molemmilla, joten js/pallolauta/lauta.js:n accessor ja
 * savukkeet toimivat kummallakin ilman muutosta.
 */
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
    // Kartta-ala on arkin KARTTA, ei koko arkki: alakehys (painajanrivi,
    // kompassiruusu, kaksoisviiva) jää pois — ks. pyramidinKarttaAla.
    const { latMin, latMax } = pyramidinKarttaAla({
      pyramidi,
      yLat: (y) => laudaltaAsteiksi(PALLO_LAUTA, 0, y)?.lat ?? (y < 0 ? 90 : -90),
      naparaja: NAPAKANNEN_LEVEYS,
    });
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
      .filter((t) => (t.nosto ? kerrokset.nosto
        : (t.viiva ? kerrokset.viiva
          : (t.joki ? kerrokset.joki
            : (t.nimio ? kerrokset.nimio : (t.ranta ? kerrokset.ranta : true))))));
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

/*
 * ======== KARTTA EI HYPPÄÄ ILMAN PELAAJAN ELETTÄ =====================
 *
 * VIKA v1664 (omistaja 7.9.2026 aamu, sanatarkasti): *"Kartta räpsii
 * panoroitaessa ja varsinkin zoomatessa äkkiä sekoaa ja lennähtää ihan
 * eri paikkaan."*
 *
 * Räpsinnän juurisyy oli pinnanlukija (js/pallolaatat.js pinnanPiste,
 * korjattu samassa erässä): se luki säteen origon tuoreesta kameran
 * paikasta ja suunnan vanhentuneesta matriisista. NÄMÄ KATOT OVAT ERI
 * ASIA — ne ovat vartio, joka pitää omistajan säännön voimassa myös
 * silloin, kun jokin muu lukema menee joskus pieleen:
 *
 *     KARTTA EI SAA HYPÄTÄ ILMAN PELAAJAN ELETTÄ.
 *
 * Sormiveto kääntää palloa niin, että painalluksessa otettu pinnan piste
 * (tartunta) pysyy sormen alla, ja siirto on kahden pinnanlukeman
 * erotus. Erotus on rajaton: yksikin virheellinen lukema (napaklampin
 * ±89,5° jälkeen erotus ei enää suppene, ele katkeaa kesken, NaN) vie
 * kartan toiselle mantereelle — ja koska sama erotus syötetään liu'un
 * nopeuteen (vauhti), lennähdys jatkuu vielä sormen irrottua.
 *
 * Kaksi kattoa, molemmat puhtaita funktioita ja testattuja:
 *   1. vedonSiirto: yksi pointermove ei saa kääntää palloa enempää kuin
 *      VEDON_KATTO_RUUTUA näkyvästä kaistasta. Sen yli menevä lukema ei
 *      ole sormen liikettä — se hylätään kokonaan (kartta jää
 *      paikalleen; seuraava lukema on taas kelvollinen).
 *   2. rajaaVauhti: liuku ei saa viedä näkyvää ruutua nopeammin kuin
 *      VAUHDIN_KATTO_MS:ssä. Ilman tätä yksikin läpi päässyt piikki
 *      jatkuisi kitkan mukana sekunnin ajan.
 *
 * Katot EIVÄT muuta tavallista vetoa: mitattu 8 px:n sormiaskel
 * korkeudella 0,35 siirtää karttaa 0,194°, ja katto on 18,7° (yksi
 * ruudullinen) — satakertainen vara.
 */
/**
 * Yksi pointermove enintään tämä osa näkyvästä kaistasta. 1,0 = koko
 * ruudullinen: nopein mahdollinen aito heitto (koko ruudun poikki
 * yhdellä pointermovella, kun selain pudottaa väliltä tapahtumia) on
 * pystyruudulla noin 0,5 kaistaa, joten katto ei koskaan katkaise
 * pelaajan omaa elettä — se katkaisee vain sen, mikä ei voi olla ele.
 */
export const VEDON_KATTO_RUUTUA = 1;
/** Liuku enintään yksi näkyvä kaista tässä ajassa (ms). */
export const VAUHDIN_KATTO_MS = 250;

/*
 * ======== OSOITIN KEHYKSEN HETKELLÄ (sulavuus kohta 13) =============
 *
 * MITATTU VIKA (Laitetestaaja 22.9.2026, aidot hiirivedot, 16 kierrosta
 * Safarilla ja Chromella): seuraamisvirheen suhde (kameran siirtymä /
 * osoittimen siirtymä) on p10 = 0 JOKAISESSA kierroksessa — eli
 * vähintään joka kymmenes kehys on täysi pysähdys, vaikka osoitin
 * liikkuu — ja pysähdystä seuraa ylikorjaava piikki (p90 3–14).
 * Selvin yksittäinen tapaus: kaksi kehystä (36 ms) kamera ei liikkunut
 * lainkaan, vaikka osoitin oli liikkunut 130 px, ja sitten yksi kehys
 * korjasi 104 px kerralla. Sama molemmilla moottoreilla, eikä
 * kehysajoissa ollut pitkiä kehyksiä — vika on syöteputkessa, ei
 * piirrossa.
 *
 * SYY. v2097 sovelsi VIIMEISIMMÄN näytteen sellaisenaan kerran
 * kehyksessä. Selain ei kuitenkaan toimita tapahtumia tasatahtia rAF:n
 * kanssa: kehykseen osuu nolla, yksi tai kaksi tapahtumaa. Nollan
 * kehyksen kamera ei liiku (pysähdys) ja seuraavan kehyksen näyte on
 * kahden kehyksen matkan päässä (piikki). Kamera siis toistaa
 * tapahtumajonon rytmin eikä sormen liikettä.
 *
 * MIKSI JUURI SAFARISSA (dokumentoitu, Fable 22.9.2026; Nolan Lawson,
 * "Browsers, input events, and frame throttling",
 * nolanlawson.com/2019/08/14/): Chrome TAHDISTAA pointermoven,
 * mousemoven ja wheelin rAF:iin, macOS:n Safari EI tahdista niistä
 * yhtäkään, ja iOS:n Safari tahdistaa touchmoven mutta EI pointermovea.
 * Pallolauta kuuntelee vain pointer-tapahtumia, joten sekä Macin
 * Safarissa että iPhonessa syöte tulee kehyksistä riippumatta — juuri
 * se kuvio, jonka omistaja tunsi tökkimisenä. Chromessa sama ilmiö on
 * lievempi, koska selain tekee tahdistuksen puolestamme.
 *
 * Suorempi vaihtoehto iOS:lle olisi lukea vedon näytteet
 * touchmove-tapahtumista (rAF-tahdistettu) ja käyttää pointeria vain
 * hiirelle. Se on mitattava erikseen eikä sitä tehdä tässä: tämä
 * korjaus on moottorista riippumaton, ja kahden syötepolun ylläpito on
 * oma päätöksensä.
 *
 * KORJAUS. Näytteet kerätään aikaleimoineen (myös getCoalescedEvents,
 * jolloin selaimen yhdistämät välinäytteet saadaan talteen), ja
 * kehyksen alussa osoittimen paikka lasketaan HALUTULLE HETKELLE
 * lineaarisella interpoloinnilla kahden näytteen välistä. Hetki on
 * kehyksen aika miinus VAKIOVIIVE, joka on enintään yksi kehys — sen
 * verran, että kahden näytteen väliin osutaan, mutta ei enempää, koska
 * viive pehmentäisi tuntumaa.
 *
 * ALKU ILMAAN VIIVETTÄ (ei ease-inia): jos haluttu hetki on ennen
 * ensimmäistä näytettä, käytetään ensimmäistä näytettä sellaisenaan.
 * Kartta lähtee siis heti sormen mukana eikä kiihdy viiveen läpi.
 *
 * EKSTRAPOLOINTI ENINTÄÄN YKSI KEHYS: jos uutta näytettä ei ole
 * ehtinyt, jatketaan viimeisellä nopeudella korkeintaan yhden kehyksen
 * verran. Ilman sitä näytteetön kehys olisi taas pysähdys; rajan yli
 * mentäessä arvaus karkaisi.
 *
 * Paluulippu `?koe=interpvanha` palauttaa v2097:n käytöksen
 * (viimeisin näyte sellaisenaan), jotta ero voidaan mitata samalla
 * rakennuksella.
 */
/*
 * VIISI SYÖTETAPAA RINNAKKAIN (omistajan päätös Fablen kautta
 * 22.9.2026). Oikeaa tapaa ei valita päättelemällä vaan mittaamalla:
 * kaikki vaihtoehdot ovat samassa rakennuksessa koelippuina, samalla
 * lokilla ja samoilla laskureilla, jotta sama mittari ja samat vedot
 * vertaavat niitä keskenään.
 *
 *   (1) `?koe=interpvanha`  viimeisin näyte kerran kehyksessä (v2097)
 *   (2) oletus              aikaleimainterpolointi 1 kehyksen viiveellä
 *   (3) `?koe=syoteennakko` ekstrapolointi ILMAN viivettä, kiihtyvyys-
 *                           rajalla — nolla viive, arvaus tilalle
 *   (4) `?koe=syotejousi`   kriittisesti vaimennettu jousi sormeen,
 *                           aikavakio ~1 kehys, dt-pohjainen
 *   (5) `?koe=syotetouch`   näytteet touchmovesta (rAF-tahdistettu
 *                           iOS:llä) pointermoven sijaan; hiiri ennallaan
 *
 * Kohta 5 on ORTOGONAALINEN: se vaihtaa näytteiden LÄHTEEN, ei tapaa
 * laskea paikkaa, joten sen voi yhdistää kohtiin 2–4.
 */
/** Kiihtyvyyden katto ennakoinnissa (px/ms² ): nopeus ei saa hypätä. */
export const SYOTE_KIIHTYVYYS_MAX = 0.02;
/** Jousen aikavakio kehyksinä (kriittisesti vaimennettu). */
export const SYOTE_JOUSI_KEHYKSIA = 1;

/**
 * Kriittisesti vaimennetun jousen askel kohti tavoitetta. Puhdas ja
 * dt-pohjainen, joten tulos ei riipu kehystaajuudesta.
 *
 * @returns {{p:number, v:number}} uusi paikka ja nopeus
 */
export function jousiAskel(p, v, tavoite, dt, tau) {
  if (!Number.isFinite(p) || !Number.isFinite(tavoite)) return { p: tavoite, v: 0 };
  const t = Math.max(1e-3, tau);
  const askel = Math.max(0, Number(dt) || 0);
  if (!(askel > 0)) return { p, v: Number.isFinite(v) ? v : 0 };
  /*
   * SULJETTU MUOTO, EI ASKELLUSTA. Kriittisesti vaimennetun jousen
   * ratkaisu on x(t) = (A + B t) e^(-ωt), ja sitä käyttämällä askel on
   * vakaa MILLÄ TAHANSA dt:llä. Eksplisiittinen integrointi räjähti
   * testissä, kun dt oli kaksi kehystä (dt ≈ 2τ): tulos karkasi
   * arvoon 1999 tavoitteen 100 sijaan. Pitkä tauko (välilehti taustalla,
   * pitkä kehys) on juuri se tilanne, jossa niin kävisi.
   */
  const omega = 1 / t;
  const d = p - tavoite;
  const v0 = Number.isFinite(v) ? v : 0;
  const B = v0 + omega * d;
  const e = Math.exp(-omega * askel);
  const uusiP = tavoite + (d + B * askel) * e;
  const uusiV = (B - omega * (d + B * askel)) * e;
  return { p: uusiP, v: uusiV };
}

/**
 * Nopeuden rajaus kiihtyvyyskatolla: ennakointi ei saa hypätä, kun
 * sormi vaihtaa suuntaa. Puhdas.
 */
export function rajaaKiihtyvyys(edellinen, uusi, dt, kattoPerMs = SYOTE_KIIHTYVYYS_MAX) {
  if (!Number.isFinite(edellinen)) return uusi;
  const sallittu = Math.max(0, kattoPerMs) * Math.max(1, dt);
  const muutos = uusi - edellinen;
  if (Math.abs(muutos) <= sallittu) return uusi;
  return edellinen + Math.sign(muutos) * sallittu;
}

/** Näytteitä puskurissa: kaksi kehystä 125 Hz:n hiirellä on ~8. */
export const OSOITTIMEN_NAYTTEITA = 12;
/** Vakioviive enintään yksi kehys (ms); Fablen rajaus 22.9.2026. */
export const OSOITTIMEN_VIIVE_MAX_MS = 17;
/** Ekstrapolointi enintään yksi kehys (ms). */
export const OSOITTIMEN_EKSTRAPOLOINTI_MAX_MS = 17;

/**
 * Osoittimen paikka hetkellä `tavoite` näytteistä `naytteet`
 * (aikajärjestyksessä, { x, y, t }). Puhdas funktio.
 *
 * - ennen ensimmäistä näytettä → ensimmäinen näyte (ei ease-inia)
 * - kahden näytteen välissä → lineaarinen interpolointi
 * - viimeisen jälkeen → viimeinen nopeus, enintään `ekstraMax` ms
 *
 * @returns {{x:number,y:number,t:number}|null}
 */
export function osoittimenKohta(naytteet, tavoite, {
  ekstraMax = OSOITTIMEN_EKSTRAPOLOINTI_MAX_MS,
} = {}) {
  if (!Array.isArray(naytteet) || naytteet.length === 0) return null;
  const n = naytteet.length;
  if (n === 1 || !Number.isFinite(tavoite)) {
    const v = naytteet[n - 1];
    return { x: v.x, y: v.y, t: v.t };
  }
  const eka = naytteet[0];
  if (tavoite <= eka.t) return { x: eka.x, y: eka.y, t: eka.t };
  const vika = naytteet[n - 1];
  if (tavoite >= vika.t) {
    const edel = naytteet[n - 2];
    const dt = vika.t - edel.t;
    const yli = Math.min(tavoite - vika.t, Math.max(0, ekstraMax));
    if (!(dt > 0) || yli <= 0) return { x: vika.x, y: vika.y, t: vika.t };
    const k = yli / dt;
    return { x: vika.x + (vika.x - edel.x) * k, y: vika.y + (vika.y - edel.y) * k, t: vika.t + yli };
  }
  for (let i = n - 1; i > 0; i -= 1) {
    const b = naytteet[i];
    const a = naytteet[i - 1];
    if (tavoite >= a.t && tavoite <= b.t) {
      const dt = b.t - a.t;
      const k = dt > 0 ? (tavoite - a.t) / dt : 1;
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, t: tavoite };
    }
  }
  return { x: vika.x, y: vika.y, t: vika.t };
}

/** Näkyvä kaista asteina korkeudella `korkeus` (fov on pystykulma). */
export function nakyvaKaista(korkeus, fov = PALLON_FOV) {
  return Math.max(1e-4, Number(korkeus) || 0) * 2 * Math.tan((fov / 2) * (Math.PI / 180)) * (180 / Math.PI);
}

/**
 * Vedon siirto asteina (kartta pysyy sormen alla), tai null jos lukema
 * ei kelpaa: pituusaste kierretään lyhintä kautta, ja ruudullista
 * isompi askel (ks. VEDON_KATTO_RUUTUA) ei voi olla sormen liikettä.
 *
 * @param {object} pov      kameran nykyinen { lat, altitude }
 * @param {object} tartunta painalluksessa otettu pinnan piste
 * @param {object} nyt      sormen alla juuri nyt oleva pinnan piste
 */
export function vedonSiirto(pov, tartunta, nyt, {
  fov = PALLON_FOV, katto = VEDON_KATTO_RUUTUA,
} = {}) {
  const luvut = [pov?.lat, pov?.altitude, tartunta?.lat, tartunta?.lng, nyt?.lat, nyt?.lng];
  if (!luvut.every((n) => Number.isFinite(n))) return null;
  let dLng = nyt.lng - tartunta.lng;
  if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
  const dLat = nyt.lat - tartunta.lat;
  // Pituuspiirit kapenevat navoilla: sama ruutumatka on siellä enemmän
  // asteita, joten katto mitataan kohtisuorasta matkasta.
  const matka = Math.hypot(dLat, dLng * Math.cos((pov.lat * Math.PI) / 180));
  if (!(matka <= katto * nakyvaKaista(pov.altitude, fov))) return null;
  return { dLat, dLng };
}

/** Liu'un nopeus (astetta/ms) katkaistuna, ks. VAUHDIN_KATTO_MS. */
export function rajaaVauhti(lat, lng, pov, {
  fov = PALLON_FOV, kattoMs = VAUHDIN_KATTO_MS,
} = {}) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return { lat: 0, lng: 0 };
  const katto = nakyvaKaista(pov?.altitude, fov) / Math.max(1, kattoMs);
  const v = Math.hypot(lat, lng);
  if (!(v > katto)) return { lat, lng };
  return { lat: (lat * katto) / v, lng: (lng * katto) / v };
}

/*
 * ======== ZOOM GOOGLE EARTHIN MALLIIN (sulavuus E3, 21.9.2026) ========
 *
 * Omistajan päätös 21.9.2026 "KARTAN SULAVUUS ENSIN": pallon on
 * zoomattava kuten Google Earth — kohti osoitinta tai sormia, rullan
 * pykälä liukuu eikä hyppää, nipistys seuraa sormia ilman askelia.
 * OrbitControlsin dolly zoomasi aina pallon KESKIPISTEESEEN (kohta
 * osoittimen alla karkasi sivulle), rullan pykälä oli hyppy ja
 * kosketuksen dolly tuli askelina (mitattu E1: zoomAskel p50 0,044
 * ln-yksikköä kehystä kohti). Kirjaston zoom on siksi pois
 * (enableZoom false) ja zoom tehdään itse samalla kaavalla kuin
 * sormiveto: pinnan piste osoittimen alla otetaan ankkuriksi, korkeus
 * vaihtuu, ja kamera käännetään niin, että ankkuri on yhä samassa
 * ruudun kohdassa (kohdistaAnkkuri). Kamera pysyy säteellä ilman
 * kallistusta, joten laattakerroksen ja vektorikerroksen oletukset
 * (laattakerroksenOsuma) pitävät.
 *
 *   cmd/ctrl + rulla  → tavoitekorkeus (ln) siirtyy pykälän verran,
 *                       kamera liukuu kohti sitä aikavakiolla
 *                       ZOOMIN_LIUKU_MS (trackpadin virta ja hiiren
 *                       pykälä samaa polkua; hyppyä ei ole)
 *   kaksi sormea      → korkeus täsmälleen sormien etäisyyden suhteessa
 *                       joka liikkeessä, ankkuri sormien keskipisteen
 *                       alla: nipistys ja kahden sormen panorointi
 *                       samaa elettä, ei askelia eikä viivettä
 *
 * Rajat tulevat OrbitControlsin minDistance/maxDistancesta kuten
 * ennenkin (js/pallolauta/lauta.js tahdistaZoomirajat), ja panoroinnin
 * raja (ui.pallonPanorajaus) koskee myös zoomin kääntämää kameraa.
 */
/** ln-korkeutta pikseliä kohti (cmd/ctrl+rulla): 100 px ≈ 16 %. */
export const ZOOMIN_HERKKYYS = 0.0015;
/** Yksi wheel-tapahtuma enintään tämän verran (ln): sivun mittainen pykälä ei lennätä. */
export const ZOOMIN_ASKELKATTO = 0.35;
/** Rullan liu'un aikavakio (ms): kamera lähestyy tavoitetta eksponentiaalisesti. */
export const ZOOMIN_LIUKU_MS = 90;
/** Liuku päättyy, kun tavoite on tätä lähempänä (ln). */
export const ZOOMIN_KYNNYS = 1e-4;
/** Korkeuden varakatot, jos ohjaimilla ei ole rajoja (valikkopallo). */
export const ZOOMIN_KORKEUS_MIN = 0.01;
export const ZOOMIN_KORKEUS_MAX = 6;

/** Rullan pykälä ln-korkeutena (positiivinen = loitonna). */
export function zoominAskel(deltaY, deltaMode = 0, {
  herkkyys = ZOOMIN_HERKKYYS, katto = ZOOMIN_ASKELKATTO,
} = {}) {
  if (!Number.isFinite(deltaY)) return 0;
  const pikselia = deltaMode === 1 ? RULLAN_RIVI_PX : (deltaMode === 2 ? RULLAN_SIVU_PX : 1);
  return Math.max(-katto, Math.min(katto, deltaY * pikselia * herkkyys));
}

/**
 * Kamera korkeudelle `altitude` niin, että pinnan piste `ankkuri` on
 * ruudun kohdassa (sx, sy; normalisoitu −1…1, y ylös). Ratkaistaan
 * iteroimalla: kameran nadiiria siirretään ankkurin ja osuman erolla,
 * kunnes osuma on ankkurissa (kolme kierrosta riittää ruudun laidallakin;
 * mitattu jäännös alle 0,001°). Ilman ankkuria (osoitin pallon
 * ohi) kamera vain vaihtaa korkeutta paikallaan.
 *
 * @param {object} pov      { lat, lng } nykyinen
 * @param {object} ankkuri  { lat, lng } pinnan piste tai null
 * @param {object} linssi   { fov, kuvasuhde, sade } (laattakerroksenOsuma)
 */
export function kohdistaAnkkuri(pov, ankkuri, sx, sy, altitude, linssi, kierroksia = 3) {
  let lat = Number(pov?.lat) || 0;
  let lng = Number(pov?.lng) || 0;
  if (!ankkuri || !Number.isFinite(ankkuri.lat) || !Number.isFinite(ankkuri.lng)) {
    return { lat, lng, altitude };
  }
  for (let i = 0; i < kierroksia; i += 1) {
    const osuma = laattakerroksenOsuma({ lat, lng, altitude }, sx, sy, linssi);
    if (!osuma) break;
    let dLng = ankkuri.lng - osuma.lng;
    if (dLng > 180) dLng -= 360; else if (dLng < -180) dLng += 360;
    const dLat = ankkuri.lat - osuma.lat;
    if (!Number.isFinite(dLat) || !Number.isFinite(dLng)) break;
    lat = Math.max(-89.5, Math.min(89.5, lat + dLat));
    lng += dLng;
    if (lng > 180) lng -= 360; else if (lng < -180) lng += 360;
  }
  return { lat, lng, altitude };
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
  /*
   * ROIKKUVA KOSKETUS NOLLATAAN (vika v1671, omistaja 7.9.2026 ilta,
   * iPad: *"näyttää ihan kuin yksi sormi olisi koko ajan painettuna.
   * jos koitan yhdellä sormella vierittää, niin kartta zoomautuukin
   * sisään ja ulos, eikä vierity."*). Sormia ei enää lasketa
   * lukumääränä vaan pidetään pointerId:t joukossa, ja kirjanpito
   * hoidetaan DOKUMENTISTA kaappausvaiheessa:
   *
   *  - ALAS dokumentista (kotelon sisään osuvat): kaappausvaihe ehtii
   *    ENNEN kirjaston omaa pointerdownia kankaalla, joten kesken
   *    jäänyt sormi ehditään nollata ohjaimista ennen kuin kirjasto
   *    laskee uuden sormen kakkoseksi (= nipistys).
   *  - YLÖS ja PERUUTUS dokumentista: kotelosta luettuna loppu jää
   *    tulematta aina, kun sormi irtoaa kotelon ulkopuolella tai
   *    päälliskerros katoaa alta — juuri se jätti sormen roikkumaan.
   *  - Sivu taustalle, ikkuna pois fokuksesta, kerroksen ilmoitus
   *    (js/ui-apurit.js vapautaKosketus): kaikki sormet unohdetaan.
   *
   * Nollaus koskee myös kirjaston omaa listaa (nollaaKosketusOhjaimet):
   * pelkkä oma laskuri ei riitä, koska zoomin tekee OrbitControls.
   */
  const sormet = { alhaalla: 0, nipistys: false, idt: new Set() };
  ui.pallonSormet = sormet; // mittausta varten (savukkeet)
  const paivitaLuku = () => { sormet.alhaalla = sormet.idt.size; };
  /*
   * SIIVOUS VASTA KIRJASTON JÄLKEEN. Kirjaston oma nostokäsittelijä
   * istuu DOKUMENTISSA kuplavaiheessa, ja tämä vahti kaappausvaiheessa
   * — jos lista nollattaisiin heti, kirjaston oma "viimeinen sormi
   * nousi" -haara jäisi ajamatta joka kerta (kaappauksen vapautus,
   * end-tapahtuma). Ajastin 0 ms päästää koko tapahtuman läpi ensin, ja
   * nollaus tehdään vain, jos listaan JÄI jotain.
   */
  const siivoaKunTyhja = () => setTimeout(() => {
    if (sormet.idt.size === 0) nollaaKosketusOhjaimet(ohjaimet, sormet.idt);
  }, 0);
  /** Kaikki kirjatut sormet pois; kirjaston lista nollataan samalla. */
  const unohdaSormet = (paitsi = null) => {
    for (const id of [...sormet.idt]) { if (id !== paitsi) sormet.idt.delete(id); }
    paivitaLuku();
    if (sormet.idt.size === 0) siivoaKunTyhja();
  };
  const sormiAlas = (e) => {
    if (!kotelo.contains(e.target)) return;
    // Ensimmäinen sormi: pallon pitää olla levossa. Jos kirjastolle on
    // jäänyt sormi roikkumaan, se siivotaan TÄSSÄ ja HETI — muuten
    // kirjasto lukee tämän sormen toiseksi ja alkaa nipistää (dolly).
    // Kaappausvaihe takaa, että ehdimme ennen kirjaston pointerdownia.
    if (sormet.idt.size === 0) nollaaKosketusOhjaimet(ohjaimet, sormet.idt);
    ohjaimet.autoRotate = false;
    sormet.idt.add(e.pointerId);
    paivitaLuku();
    if (sormet.alhaalla > 1) sormet.nipistys = true;
  };
  const irrota = (e) => {
    if (!sormet.idt.delete(e.pointerId)) return;
    paivitaLuku();
    if (sormet.alhaalla === 0 && sormet.nipistys) setTimeout(() => { sormet.nipistys = false; }, 350);
    if (sormet.alhaalla === 0) siivoaKunTyhja();
  };
  const doc = kotelo.ownerDocument ?? document;
  const ikkuna = doc.defaultView ?? globalThis;
  /** Kuuntelija + sen purku samalla rivillä (purku kuoren mukana). */
  const purut = [];
  const kuuntele = (kohde, laji, fn, valinnat) => {
    kohde?.addEventListener?.(laji, fn, valinnat);
    purut.push(() => kohde?.removeEventListener?.(laji, fn, valinnat));
  };
  const puraSormivahti = () => { for (const pura of purut.splice(0)) pura(); };
  const kaikkiIrti = () => unohdaSormet(null);
  const kerrosKatosi = (e) => unohdaSormet(e?.detail?.paitsi ?? null);
  const taustalle = () => { if (doc.visibilityState === 'hidden') kaikkiIrti(); };
  kuuntele(doc, 'pointerdown', sormiAlas, true);
  kuuntele(doc, 'pointerup', irrota, true);
  kuuntele(doc, 'pointercancel', irrota, true);
  kuuntele(doc, KOSKETUKSEN_VAPAUTUS, kerrosKatosi);
  kuuntele(doc, 'visibilitychange', taustalle);
  kuuntele(ikkuna, 'blur', kaikkiIrti);
  kuuntele(ikkuna, 'pagehide', kaikkiIrti);
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
  /*
   * TARTUNTAPISTE LASKETAAN, EI SÄTEENJÄLJITETÄ (vika v1649, mitattu
   * 6.9.2026). Kirjaston `toGlobeCoords` osuu kirjaston omaan palloon,
   * joka on 72 × 36 -jaettu monitahokas (globeCurvatureResolution 5°):
   * jänne painuu pinnan alle, ja osuma eroaa oikeasta pinnasta
   * mediaanilla 1,4 ja enimmillään 3,2 LAITEPIKSELIÄ (puhelin 390 × 844
   * dpr 3, Ateena korkeus 0,35, 124 px/aste, 196 näytettä ruudulta).
   * Tämä silmukka syöttää eron suoraan kameraan joka pointermovessa,
   * joten kartta liikkuu sormen alla eri tavalla ruudun eri kohdissa —
   * ja koska irrotuksen jälkeinen liuku ei lue pintaa lainkaan, oire
   * loppuu täsmälleen sormen irrotessa. Ennen v1647:ää liikkeen kuva
   * oli karkea ja pikselisuhde 2, joten virhe hukkui sumuun; v1647:n
   * laattakerros pitää kuvan terävänä myös liikkeessä, ja sama virhe on
   * nyt kolme terävää pikseliä.
   *
   * pinnanPiste (js/pallolaatat.js) on tarkka säde–pallo-leikkaus, sama
   * jota vektorikerros käyttää — yksi pinnanlukija koko pallolle.
   */
  /*
   * SYÖTE KERRAN KEHYKSESSÄ (sulavuuskatsaus 22.9.2026 kohta 13).
   * Aiemmin jokainen pointermove teki heti pintaratkaisun ja
   * kamerakirjoituksen: kaksi tapahtumaa yhdessä kehyksessä = kaksi
   * täyttä kierrosta, joista piirto näytti vain viimeisen; nolla
   * tapahtumaa = kamera seisoi. Simulaattorin px/ms-vaihtelu 112 % ja
   * headlessin 37 % tulivat tästä. Nyt tapahtuma tallentaa vain sormen
   * paikan ja aikaleiman (`event.timeStamp`); ratkaisu ja kamera-
   * kirjoitus tehdään kerran kehyksessä OrbitControlsin `update`-
   * kutsun alussa (kirjaston tick: controls.update → render), eli aina
   * ennen piirtoa ja ennen kirjaston lookAtia. Liu'un nopeus lasketaan
   * tapahtumien aikaleimoista, ei sovellushetkestä. Sama nipistykselle:
   * yksi ankkurointi kehyksessä kahden sijaan.
   *
   * KOTELON MITAT KERRAN ELEEN ALUSSA (kohta 15): getBoundingClientRect
   * ja clientWidth/Height joka tapahtumassa heti CSS2D-kirjoitusten
   * jälkeen pakottivat asettelun eleen tahdissa. Mitat luetaan
   * pointerdownissa, rullassa ja kotelon koon muuttuessa
   * (ResizeObserver), ja siitä välistä käytetään muistia.
   *
   * Mittauslippu `?koe=syotevanha` palauttaa tapahtumakohtaisen polun
   * (myös mitat joka tapahtumassa), jotta ero voidaan mitata samalla
   * rakennuksella (tasaisuusmittari, __kehysprofiili.veto).
   */
  const syote = {
    veto: null, nipistys: false, vanha: laattakerroksenKokeet().has('syotevanha'), sovelluksia: 0,
    /* Osoittimen näytteet aikaleimoineen (kohta 13, ks. OSOITIN KEHYKSEN HETKELLÄ). */
    naytteet: [],
    interpVanha: laattakerroksenKokeet().has('interpvanha'),
    viiveMs: 0, ekstrapolointeja: 0, interpolointeja: 0,
    /*
     * MITTAUSLOKI (`?koe=syoteloki`). Seuraamisvirhettä ei voi mitata
     * ulkopuolisesta rAF:sta: jos lukija ajetaan ENNEN kirjaston
     * tickiä, se näkee edellisen kehyksen kameran, ja mittariin syntyy
     * 0/2x-kuvio, jota pelissä ei ole. Siksi peli kirjaa itse, samassa
     * kohdassa jossa kamera kirjoitetaan: käytetty osoittimen paikka ja
     * kamera HETI kirjoituksen jälkeen. Kehä on näin mahdoton.
     */
    loki: null, lokiKatto: 4000,
    /* Mitattava syötetapa (ks. VIISI SYÖTETAPAA RINNAKKAIN). */
    tapa: 'interp',
    touchLahde: false,
    jousi: null, // { x, y, vx, vy }
  };
  /*
   * TAPA TULEE JOKO MITTAUSLIPUSTA TAI PELAAJAN VALINNASTA
   * (js/vedon-seuranta.js, valikko → Kartta → Vedon seuranta).
   *
   * LIPPU VOITTAA KOKONAAN. Savuke ei saa joutua arvaamaan, mikä
   * laitteen localStorageen on jäänyt: kun osoitteessa on yksikin tämän
   * perheen lippu, valinta ei vaikuta mihinkään — ei alussa eikä
   * lennossa. Ilman lippuja valinta ratkaisee, ja se voi vaihtua kesken
   * pelin ilman uutta latausta.
   *
   * Kohta 5: touchmove on iOS:n Safarissa rAF-tahdistettu, pointermove
   * ei. Näytteiden lähde vaihtuu VAIN kosketuslaitteella; hiirellä
   * pointermove on ainoa lähde eikä käytös muutu.
   */
  const kosketusLaite = typeof globalThis.ontouchstart !== 'undefined';
  const mittausLippu = mittauslippuPaalla();
  const asetaTapa = ({ tapa, touchLahde }) => {
    syote.tapa = tapa;
    syote.interpVanha = tapa === 'vanha';
    syote.touchLahde = Boolean(touchLahde) && kosketusLaite;
  };
  {
    const k = laattakerroksenKokeet();
    if (k.has('syoteloki')) syote.loki = [];
    if (mittausLippu) {
      let tapa = 'interp';
      if (syote.interpVanha) tapa = 'vanha';
      else if (k.has('syoteennakko')) tapa = 'ennakko';
      else if (k.has('syotejousi')) tapa = 'jousi';
      asetaTapa({ tapa, touchLahde: k.has('syotetouch') });
    } else {
      asetaTapa(seurannanAsetukset());
    }
  }
  ui.pallonSyote = syote; // mittausta varten (savukkeet)
  let kotelonMitat = null; // { left, top, W, H }
  const lueKotelonMitat = () => {
    const r = kotelo.getBoundingClientRect();
    kotelonMitat = {
      left: r.left, top: r.top, W: Math.max(1, kotelo.clientWidth), H: Math.max(1, kotelo.clientHeight),
    };
    return kotelonMitat;
  };
  const mitat = () => ((syote.vanha || !kotelonMitat) ? lueKotelonMitat() : kotelonMitat);
  const kokovahti = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { kotelonMitat = null; }) : null;
  kokovahti?.observe(kotelo);
  /** Aikaleima tapahtumasta performance.now():n asteikolla (vara: nyt). */
  const leima = (e) => {
    const t = e?.timeStamp;
    const nyt = performance.now();
    return Number.isFinite(t) && t > 0 && Math.abs(t - nyt) < 60_000 ? t : nyt;
  };
  const sormenKohta = (x, y) => {
    const m = mitat();
    return pinnanPiste(pallo.camera(), x - m.left, y - m.top, m.W, m.H, pallo.getGlobeRadius());
  };
  kotelo.addEventListener('pointerdown', (e) => {
    lueKotelonMitat();
    syote.veto = null;
    syote.naytteet.length = 0;
    syote.jousi = null;
    syote.vx = undefined;
    syote.vy = undefined;
    syote.edellinenNyt = 0;
    tartunta = sormet.alhaalla === 1 ? sormenKohta(e.clientX, e.clientY) : null;
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
  /*
   * ══════════════════════════════════════════════════════════════════
   * PANOROINNIN RAJA (KARTTAUUDISTUS, ERÄ 9)
   * ══════════════════════════════════════════════════════════════════
   *
   * Omistaja 13.9.2026: *"Ja rajaa liikkuminen pienemmälle alalla."*
   * Sääntö itse asuu laudalla (js/pallolauta/lauta.js PANOROINNIN RAJA
   * ja js/pallolauta/kamera.js panoraja): se tuntee maan laatikon,
   * linssin, matkan ja kehittäjän maailmanapin. TÄMÄ TIEDOSTO VAIN
   * NOUDATTAA sitä — sama työnjako kuin `ui.pallonVauhti`lla.
   *
   * KOLME KIRJOITUSKOHTAA, YKSI SUODATIN. Kamera saa uuden lat/lng:n
   * vedosta (pointermove), irrotuksen jälkeisestä liu'usta (`liu`) ja
   * rullapanoroinnista (`siirraPalloa`). Kaikki kolme kulkevat tämän
   * läpi; ilman yhtäkin niistä raja vuotaisi juuri siinä eleessä.
   *
   * PEHMEÄ PYSÄYTYS, EI TÄRÄHDYSTÄ. Raja ei kimmota kameraa takaisin
   * eikä nykäise: se pysäyttää liikkeen seinään. Kun raja puree,
   * SEN SUUNNAN vauhti nollataan — muuten liuku jatkaisi seinää vasten
   * painamista sekunnin ajan ja sormen irrotus tuntuisi jumilta.
   * Toinen suunta jää vapaaksi, joten reunaa pitkin voi liukua.
   *
   * ILMAN KAHVAA EI RAJAA (etusivun pallo, katselutila, purettu lauta):
   * turvallinen tila on entinen vapaa panorointi.
   */
  const rajaaKohta = (lat, lng) => {
    const raja = ui.pallonPanorajaus;
    if (typeof raja !== 'function') return { lat, lng, latRajattu: false, lngRajattu: false };
    const r = raja(lat, lng);
    return Number.isFinite(r?.lat) && Number.isFinite(r?.lng)
      ? r : { lat, lng, latRajattu: false, lngRajattu: false };
  };

  const VAUHTI_KITKA = 0.0028; // 1/ms: nopeus puolittuu n. 250 ms:ssa
  const VAUHTI_KYNNYS = 0.0006; // astetta/ms
  const vauhti = { lat: 0, lng: 0, aika: 0, raf: 0 };
  ui.pallonVauhti = vauhti; // mittausta varten (savukkeet)
  const pysaytaLiuku = () => { if (vauhti.raf) cancelAnimationFrame(vauhti.raf); vauhti.raf = 0; };
  const liu = (edellinen) => {
    const nyt = performance.now();
    const dt = Math.min(50, nyt - edellinen);
    const pov = pallo.pointOfView();
    const kohta = rajaaKohta(
      Math.max(-89.5, Math.min(89.5, pov.lat + vauhti.lat * dt)),
      pov.lng + vauhti.lng * dt,
    );
    pallo.pointOfView({ lat: kohta.lat, lng: kohta.lng, altitude: pov.altitude }, 0);
    // Seinään osunut suunta pysähtyy tähän (ks. PEHMEÄ PYSÄYTYS).
    if (kohta.latRajattu) vauhti.lat = 0;
    if (kohta.lngRajattu) vauhti.lng = 0;
    const vaimennus = Math.exp(-VAUHTI_KITKA * dt);
    vauhti.lat *= vaimennus; vauhti.lng *= vaimennus;
    if (Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) vauhti.raf = requestAnimationFrame(() => liu(nyt));
    else vauhti.raf = 0;
  };
  /*
   * SYÖTE ON MUUTOSLÄHDE, JOTEN SE ILMOITTAA LEPOPIIRROLLE
   * (js/pallolauta/lepopiirto.js). Ilman tätä vedon alku jää kiinni
   * KEHÄÄN: odottava veto sovelletaan kameraan `ohjaimet.update`issa eli
   * kirjaston tickissä, lepopiirto pysäyttää tickin levossa, ja sen
   * ainoa herätesyy tässä tilanteessa olisi "kamera muuttui" — mutta
   * kamera ei voi muuttua ennen kuin veto on sovellettu. Veto lähtisi
   * siis vasta varmistavasta sykkeestä (enintään 250 ms) ja kiihtyisi
   * vasta sitten, kun kamera alkaa muuttua joka kehys. Pallolaudan veto
   * ei myöskään nosta `kartta-raahaus`-luokkaa (se on tasokartan,
   * js/kartta.js), joten estelista ei kata tätä.
   */
  const ilmoitaSyote = () => { try { pallo.__piirto?.tarvitaan?.(); } catch { /* ei lepopiirtoa */ } };
  kotelo.addEventListener('pointerdown', () => {
    ilmoitaSyote();
    pysaytaLiuku();
    vauhti.lat = 0;
    vauhti.lng = 0;
  });
  /** Vedon sovellus: sormi kohdassa (x, y) hetkellä aika → kamera. */
  /** Ohituksen kirjaus mittauslokiin: 1 = ei tartuntaa, 2 = ei pintapistettä, 3 = katto. */
  const kirjaaOhitus = (syy, x, y, aika) => {
    if (syote.loki && syote.loki.length < syote.lokiKatto) {
      syote.loki.push({ t: aika, x, y, lat: null, lng: null, alt: null, ohitus: syy });
    }
  };
  const sovellaVeto = (x, y, aika) => {
    if (!tartunta || sormet.alhaalla !== 1) { kirjaaOhitus(1, x, y, aika); return; }
    const nyt = sormenKohta(x, y);
    if (!nyt) { kirjaaOhitus(2, x, y, aika); return; }
    const pov = pallo.pointOfView();
    // KARTTA EI HYPPÄÄ ILMAN PELAAJAN ELETTÄ (vika v1664): yksi
    // pointermove ei saa kääntää palloa yli puolta näkyvästä kaistasta.
    const siirto = vedonSiirto(pov, tartunta, nyt, { fov: kamera.fov });
    if (!siirto) { kirjaaOhitus(3, x, y, aika); return; }
    const { dLat, dLng } = siirto;
    const kohta = rajaaKohta(
      Math.max(-89.5, Math.min(89.5, pov.lat - dLat)),
      pov.lng - dLng,
    );
    pallo.pointOfView({ lat: kohta.lat, lng: kohta.lng, altitude: pov.altitude }, 0);
    syote.sovelluksia += 1;
    if (syote.loki && syote.loki.length < syote.lokiKatto) {
      syote.loki.push({
        t: aika, x, y, lat: kohta.lat, lng: kohta.lng, alt: pov.altitude, ohitus: 0,
      });
    }
    // Nopeus: liukuva keskiarvo, jotta yksittäinen nykäys ei määrää liukua.
    const dt = Math.max(1, aika - (vauhti.aika || aika));
    if (vauhti.aika) {
      const rajattu = rajaaVauhti(
        vauhti.lat * 0.6 + (-dLat / dt) * 0.4,
        vauhti.lng * 0.6 + (-dLng / dt) * 0.4,
        pov, { fov: kamera.fov },
      );
      vauhti.lat = rajattu.lat;
      vauhti.lng = rajattu.lng;
    }
    /*
     * SEINÄÄ VASTEN VEDETTY SORMI EI HEITÄ. Vauhti mitataan sormen
     * liikkeestä, ei kameran; ilman tätä irrotus lähettäisi liu'un
     * suoraan rajaa vasten, ja se näyttäisi nykäykseltä.
     */
    if (kohta.latRajattu) vauhti.lat = 0;
    if (kohta.lngRajattu) vauhti.lng = 0;
    vauhti.aika = aika;
  };
  kotelo.addEventListener('pointermove', (e) => {
    if (!tartunta || sormet.alhaalla !== 1) return;
    ilmoitaSyote();
    if (syote.vanha) { sovellaVeto(e.clientX, e.clientY, leima(e)); return; }
    // Viimeisin paikka vanhaa polkua varten (?koe=interpvanha).
    syote.veto = { x: e.clientX, y: e.clientY, aika: leima(e) };
    /*
     * NÄYTTEET AIKALEIMOINEEN. `getCoalescedEvents` antaa ne
     * välinäytteet, jotka selain niputti yhteen tapahtumaan.
     *
     * EI SAA NOJATA SIIHEN. Safari tukee sitä vasta iOS 18.2:sta ja
     * vajaana (kentät kuten pointerId ja target puuttuvat), eikä
     * `pointerrawupdate`a ole Safarissa lainkaan. Tässä käytetään vain
     * clientX/clientY ja aikaleima, ja jokainen näyte kelpuutetaan
     * erikseen — kelvoton lista johtaa varapolkuun (itse tapahtuma),
     * ei rikkinäisiin näytteisiin.
     */
    // (5) Kun näytteet luetaan touchmovesta, pointermove ei enää syötä
    // puskuria — muuten sama liike tulisi kahdesti eri kellotuksella.
    if (syote.touchLahde) return;
    const osat = typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
    const lisaa = (p) => {
      const x = p?.clientX;
      const y = p?.clientY;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
      const t = leima(p);
      const n = syote.naytteet;
      if (n.length && t < n[n.length - 1].t) return false; // ei taaksepäin
      n.push({ x, y, t });
      if (n.length > OSOITTIMEN_NAYTTEITA) n.shift();
      return true;
    };
    let lisatty = 0;
    if (osat && osat.length) for (const p of osat) { if (lisaa(p)) lisatty += 1; }
    if (!lisatty) lisaa(e);
  });
  /*
   * KEHYKSEN ALUSSA: odottava veto ja nipistys sovelletaan kameraan
   * ennen kirjaston ohjainpäivitystä ja piirtoa. Kääre puretaan
   * `pura`ssa.
   */
  /*
   * KEHYSVÄLI MITATAAN, EI OLETETA. Viive ja ekstrapoloinnin katto ovat
   * "yksi kehys", ja se on 120 Hz:n näytöllä eri luku kuin 60 Hz:n.
   * Liukuva keskiarvo tasaa yksittäisen pitkän kehyksen.
   */
  let kehysvali = 16.7;
  let edellinenKehys = 0;
  const paivitaKehysvali = (nyt) => {
    if (edellinenKehys > 0) {
      const dt = nyt - edellinenKehys;
      if (dt > 4 && dt < 60) kehysvali = kehysvali * 0.8 + dt * 0.2;
    }
    edellinenKehys = nyt;
  };
  /*
   * (5) NÄYTTEET TOUCHMOVESTA. iOS:n Safari tahdistaa touchmoven
   * rAF:iin mutta EI pointermovea (Nolan Lawson, ks. OSOITIN KEHYKSEN
   * HETKELLÄ), joten kosketuslaitteella touchmove antaa valmiiksi
   * kehystahtiset näytteet. Lippu vaikuttaa VAIN kosketuslaitteella:
   * hiirellä pointermove on ainoa lähde.
   */
  const touchNayte = (ev) => {
    if (!syote.touchLahde || !tartunta || sormet.alhaalla !== 1) return;
    const kosketukset = ev?.touches;
    const k = kosketukset && kosketukset.length === 1 ? kosketukset[0] : null;
    if (!k || !Number.isFinite(k.clientX) || !Number.isFinite(k.clientY)) return;
    const t = leima(ev);
    const n = syote.naytteet;
    if (n.length && t < n[n.length - 1].t) return;
    n.push({ x: k.clientX, y: k.clientY, t });
    if (n.length > OSOITTIMEN_NAYTTEITA) n.shift();
    syote.veto = { x: k.clientX, y: k.clientY, aika: t };
    syote.touchNaytteita = (syote.touchNaytteita ?? 0) + 1;
  };
  /*
   * KUUNTELIJA KAIKILLE KOSKETUSLAITTEILLE, EI VAIN VALINNAN AIKANA:
   * käsittelijä palaa heti, kun `syote.touchLahde` on epätosi, ja
   * valinta voi vaihtua kesken pelin. Ehdollinen kytkentä vaatisi
   * lisäyksen ja poiston lennossa — yksi passiivinen kuuntelija on
   * halvempi kuin kaksi kirjanpitoa.
   */
  if (kosketusLaite) kotelo.addEventListener('touchmove', touchNayte, { passive: true });

  /*
   * VALINTA VAIHTUI VALIKOSSA (js/vedon-seuranta.js): tapa vaihtuu
   * heti, ilman uutta latausta. Puskuri nollataan — vanhat näytteet on
   * kerätty vanhalla tavalla ja vanhasta lähteestä, ja jousen tila
   * kuuluu jouselle.
   */
  const seurantaVaihtui = () => {
    if (mittausLippu) return; // mittausajossa lippu pitää valtansa
    asetaTapa(seurannanAsetukset());
    syote.naytteet.length = 0;
    syote.veto = null;
    syote.jousi = null;
    syote.vx = undefined;
    syote.vy = undefined;
    syote.edellinenNyt = 0;
  };
  globalThis.addEventListener?.(VEDON_SEURANTA_TAPAHTUMA, seurantaVaihtui);

  /*
   * KEHYSKELLO (`?koe=syotekello`, Pelikoodari 23.9.2026, VERTAILUKOE):
   * kohta-aika luetaan kehyksen yhteisestä kellosta (document.timeline:
   * sama arvo kaikille saman kehyksen rAF-kutsuille, vsync-tahdissa)
   * eikä performance.now():sta tickin sisällä. Tickin alkuhetki vaihtelee
   * sen mukaan, paljonko työtä kehyksessä ajettiin ennen sitä; silloin
   * sormen paikka luetaan eri kohdasta kuin kehys esitetään, ja kartan
   * askel vaihtelee, vaikka sormi liikkuu tasaisesti.
   */
  const kehyskello = laattakerroksenKokeet().has('syotekello');
  const kehyksenHetki = () => {
    if (kehyskello) {
      const t = globalThis.document?.timeline?.currentTime;
      if (Number.isFinite(t) && t > 0) return t;
    }
    return performance.now();
  };
  const sovellaSyote = () => {
    const nyt = kehyksenHetki();
    paivitaKehysvali(nyt);
    if (syote.tapa === 'vanha') {
      // (1) v2097: viimeisin näyte sellaisenaan, kerran kehyksessä.
      const v = syote.veto;
      if (v) { syote.veto = null; sovellaVeto(v.x, v.y, v.aika); }
    } else if (syote.naytteet.length) {
      const n = syote.naytteet;
      const viimeinen = n[n.length - 1];
      const dt = Math.max(1, nyt - (syote.edellinenNyt || nyt - kehysvali));
      syote.edellinenNyt = nyt;
      let kohta = null;
      if (syote.tapa === 'ennakko') {
        /*
         * (3) NOLLA VIIVE, ARVAUS TILALLE. Tavoite on kehyksen hetki
         * ILMAN viivettä, eli näytteiden yli ekstrapoloidaan aina.
         * Kiihtyvyyskatto estää hypyn, kun sormi vaihtaa suuntaa:
         * ilman sitä suunnanvaihdos heittäisi kameran väärään suuntaan
         * ennen kuin uusi näyte ehtii korjata.
         */
        const raaka = osoittimenKohta(n, nyt, { ekstraMax: OSOITTIMEN_EKSTRAPOLOINTI_MAX_MS });
        if (raaka) {
          const vx = (raaka.x - viimeinen.x) / Math.max(1, raaka.t - viimeinen.t || 1);
          const vy = (raaka.y - viimeinen.y) / Math.max(1, raaka.t - viimeinen.t || 1);
          const rx = rajaaKiihtyvyys(syote.vx, vx, dt);
          const ry = rajaaKiihtyvyys(syote.vy, vy, dt);
          syote.vx = rx;
          syote.vy = ry;
          const yli = Math.max(0, nyt - viimeinen.t);
          kohta = { x: viimeinen.x + rx * yli, y: viimeinen.y + ry * yli, t: nyt };
          syote.ekstrapolointeja += 1;
        }
      } else if (syote.tapa === 'jousi') {
        /*
         * (4) KRIITTISESTI VAIMENNETTU JOUSI sormen viimeisimpään
         * näytteeseen. Aikavakio on noin yksi kehys, ja askel on
         * dt-pohjainen, joten tulos ei riipu kehystaajuudesta (toisin
         * kuin kehyskohtainen kerroin, joka 120 Hz:llä olisi kaksi
         * kertaa nopeampi kuin 60 Hz:llä).
         */
        const tau = Math.max(1, kehysvali * SYOTE_JOUSI_KEHYKSIA);
        if (!syote.jousi) syote.jousi = { x: viimeinen.x, y: viimeinen.y, vx: 0, vy: 0 };
        const jx = jousiAskel(syote.jousi.x, syote.jousi.vx, viimeinen.x, dt, tau);
        const jy = jousiAskel(syote.jousi.y, syote.jousi.vy, viimeinen.y, dt, tau);
        syote.jousi = { x: jx.p, y: jy.p, vx: jx.v, vy: jy.v };
        kohta = { x: jx.p, y: jy.p, t: nyt };
        syote.interpolointeja += 1;
      } else {
        /*
         * (2) OLETUS: paikka kehyksen hetkelle, viive enintään yksi
         * kehys. Näytteetön kehys jatkaa viimeisellä nopeudella
         * korkeintaan yhden kehyksen verran.
         */
        const viive = Math.min(kehysvali, OSOITTIMEN_VIIVE_MAX_MS);
        syote.viiveMs = viive;
        kohta = osoittimenKohta(n, nyt - viive, {
          ekstraMax: Math.min(kehysvali, OSOITTIMEN_EKSTRAPOLOINTI_MAX_MS),
        });
        if (kohta) {
          if (kohta.t > viimeinen.t) syote.ekstrapolointeja += 1;
          else syote.interpolointeja += 1;
        }
      }
      if (kohta) {
        syote.veto = null;
        sovellaVeto(kohta.x, kohta.y, kohta.t);
      }
    }
    if (syote.nipistys) { syote.nipistys = false; sovellaNipistys(); }
  };
  const alkuperainenUpdate = ohjaimet.update;
  ohjaimet.update = function pallonSyoteUpdate(...args) {
    sovellaSyote();
    return alkuperainenUpdate.apply(this, args);
  };
  const puraSyote = () => {
    if (kosketusLaite) kotelo.removeEventListener('touchmove', touchNayte);
    globalThis.removeEventListener?.(VEDON_SEURANTA_TAPAHTUMA, seurantaVaihtui);
    if (ohjaimet.update?.name === 'pallonSyoteUpdate') ohjaimet.update = alkuperainenUpdate;
    kokovahti?.disconnect();
  };
  /*
   * IRROTUS LUETAAN DOKUMENTISTA (roikkuva kosketus, v1671): kotelosta
   * luettuna liuku jäi lähtemättä aina, kun sormi nousi kotelon
   * ulkopuolella — ja tartunta jäi voimaan. Liuku lähtee vasta, kun
   * VIIMEINEN sormi on noussut (nipistyksen ensimmäinen irtoava sormi
   * ei ole heitto).
   */
  const paasta = () => {
    syote.veto = null; // irrotuksen jälkeen ei enää sovelleta
    tartunta = null;
    if (sormet.alhaalla > 0) return;
    const seisahtunut = performance.now() - vauhti.aika > 150; // sormi pysähtyi ennen irrotusta
    if (!ui.reducedMotion && !seisahtunut && Math.hypot(vauhti.lat, vauhti.lng) > VAUHTI_KYNNYS) {
      pysaytaLiuku();
      vauhti.raf = requestAnimationFrame(() => liu(performance.now()));
    }
    vauhti.aika = 0;
  };
  kuuntele(doc, 'pointerup', paasta);
  kuuntele(doc, 'pointercancel', paasta);
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
    const kohta = rajaaKohta(
      Math.max(-PANOROINNIN_LEVEYSRAJA, Math.min(PANOROINNIN_LEVEYSRAJA, pov.lat + dLat)),
      pov.lng + dLng,
    );
    pallo.pointOfView({ lat: kohta.lat, lng: kohta.lng, altitude: pov.altitude }, 0);
    return kohta;
  };
  const rullanLiuku = (nyt) => {
    const dt = Math.max(1, Math.min(50, nyt - rulla.edellinen));
    rulla.edellinen = nyt;
    const osa = rulla.aikaa > dt ? dt / rulla.aikaa : 1;
    const dLat = rulla.lat * osa;
    const dLng = rulla.lng * osa;
    rulla.lat -= dLat; rulla.lng -= dLng; rulla.aikaa -= dt;
    const kohta = siirraPalloa(dLat, dLng);
    // Sama pehmeä pysäytys kuin sormen liu'ulla: seinään osunut suunta
    // ei jää painamaan rajaa vasten loppuliu'un ajaksi.
    if (kohta.latRajattu) rulla.lat = 0;
    if (kohta.lngRajattu) rulla.lng = 0;
    rulla.raf = rulla.aikaa > 0 && (rulla.lat || rulla.lng) ? requestAnimationFrame(rullanLiuku) : 0;
  };
  /* ---- zoom itse: rulla liukuu, nipistys seuraa sormia (E3) ---- */
  ohjaimet.enableZoom = false;
  const linssi = () => ({
    fov: kamera.fov, kuvasuhde: Math.max(1e-3, kotelo.clientWidth / Math.max(1, kotelo.clientHeight)),
    sade: pallo.getGlobeRadius(),
  });
  const korkeusrajat = () => {
    const R = pallo.getGlobeRadius();
    const min = Number.isFinite(ohjaimet.minDistance) ? ohjaimet.minDistance / R - 1 : ZOOMIN_KORKEUS_MIN;
    const max = Number.isFinite(ohjaimet.maxDistance) ? ohjaimet.maxDistance / R - 1 : ZOOMIN_KORKEUS_MAX;
    return {
      min: Math.max(ZOOMIN_KORKEUS_MIN, min),
      max: Math.min(ZOOMIN_KORKEUS_MAX, Number.isFinite(max) ? Math.max(max, min) : ZOOMIN_KORKEUS_MAX),
    };
  };
  /** Ruudun kohta (clientX/Y) normalisoituna ja sen alla oleva pinnan piste. */
  const ruudunKohta = (clientX, clientY) => {
    const { left, top, W, H } = mitat();
    const x = clientX - left;
    const y = clientY - top;
    return {
      sx: (2 * x) / W - 1,
      sy: 1 - (2 * y) / H,
      piste: pinnanPiste(pallo.camera(), x, y, W, H, pallo.getGlobeRadius()),
    };
  };
  /** Kamera uuteen korkeuteen ankkuri paikallaan; panoroinnin raja kuten vedossa. */
  const asetaZoomi = (altitude, ankkuri, sx, sy) => {
    const pov = pallo.pointOfView();
    const rajat = korkeusrajat();
    const alt = Math.max(rajat.min, Math.min(rajat.max, altitude));
    const uusi = kohdistaAnkkuri(pov, ankkuri, sx, sy, alt, linssi());
    const kohta = rajaaKohta(uusi.lat, uusi.lng);
    pallo.pointOfView({ lat: kohta.lat, lng: kohta.lng, altitude: alt }, 0);
    return alt;
  };
  const zoomi = { kohde: 0, ankkuri: null, sx: 0, sy: 0, raf: 0, edellinen: 0 };
  ui.pallonZoomi = zoomi; // mittausta varten (savukkeet)
  const pysaytaZoomi = () => { if (zoomi.raf) cancelAnimationFrame(zoomi.raf); zoomi.raf = 0; };
  const zoominLiuku = (nyt) => {
    const dt = Math.max(1, Math.min(50, nyt - zoomi.edellinen));
    zoomi.edellinen = nyt;
    const nykyinen = Math.log(Math.max(1e-6, pallo.pointOfView().altitude));
    const ero = zoomi.kohde - nykyinen;
    const osa = ui.reducedMotion ? 1 : 1 - Math.exp(-dt / ZOOMIN_LIUKU_MS);
    const seuraava = Math.abs(ero) <= ZOOMIN_KYNNYS ? zoomi.kohde : nykyinen + ero * osa;
    asetaZoomi(Math.exp(seuraava), zoomi.ankkuri, zoomi.sx, zoomi.sy);
    zoomi.raf = Math.abs(zoomi.kohde - seuraava) > ZOOMIN_KYNNYS ? requestAnimationFrame(zoominLiuku) : 0;
  };
  /*
   * NIPISTYS: kaksi sormea, korkeus etäisyyden suhteessa, ankkuri
   * keskipisteen alla. Sormien paikat kirjataan dokumentista
   * kaappausvaiheessa (sormi saa poistua kotelosta kesken eleen);
   * ele alkaa toisen sormen laskeutuessa ja päättyy, kun jompikumpi
   * nousee. Ankkuri luetaan kerran eleen alussa — sormien keskipisteen
   * siirto on silloin kahden sormen panorointia samaa kaavaa.
   */
  const paikat = new Map();
  const nipistys = { idt: null, etaisyys: 0, ankkuri: null };
  ui.pallonNipistys = nipistys; // mittausta varten (savukkeet)
  const keskipiste = () => {
    const a = paikat.get(nipistys.idt[0]);
    const b = paikat.get(nipistys.idt[1]);
    if (!a || !b) return null;
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, etaisyys: Math.hypot(a.x - b.x, a.y - b.y) };
  };
  const aloitaNipistys = () => {
    nipistys.idt = [...paikat.keys()].slice(0, 2);
    const k = keskipiste();
    if (!k) { nipistys.idt = null; return; }
    pysaytaZoomi(); pysaytaLiuku(); pysaytaRulla();
    vauhti.lat = 0; vauhti.lng = 0;
    syote.veto = null; syote.nipistys = false;
    lueKotelonMitat();
    nipistys.etaisyys = Math.max(1, k.etaisyys);
    nipistys.ankkuri = ruudunKohta(k.x, k.y).piste;
  };
  const lopetaNipistys = () => { nipistys.idt = null; nipistys.ankkuri = null; syote.nipistys = false; };
  kuuntele(doc, 'pointerdown', (e) => {
    if (!kotelo.contains(e.target)) return;
    paikat.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (paikat.size === 2 && !nipistys.idt) aloitaNipistys();
  }, true);
  /** Nipistyksen sovellus sormien nykyisistä paikoista (kerran kehyksessä). */
  const sovellaNipistys = () => {
    if (!nipistys.idt) return;
    const k = keskipiste();
    if (!k || !(k.etaisyys > 1)) return;
    const pov = pallo.pointOfView();
    const kohta = ruudunKohta(k.x, k.y);
    // Pinnan mittakaava ruudulla on kääntäen verrannollinen korkeuteen:
    // sormet 2× kauemmas toisistaan = korkeus puoleen.
    asetaZoomi(pov.altitude * (nipistys.etaisyys / k.etaisyys), nipistys.ankkuri, kohta.sx, kohta.sy);
    nipistys.etaisyys = k.etaisyys;
    syote.sovelluksia += 1;
  };
  kuuntele(doc, 'pointermove', (e) => {
    if (!paikat.has(e.pointerId)) return;
    paikat.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (!nipistys.idt || !nipistys.idt.includes(e.pointerId)) return;
    if (syote.vanha) sovellaNipistys();
    else syote.nipistys = true;
  }, true);
  const sormiPois = (e) => {
    if (!paikat.delete(e.pointerId)) return;
    if (nipistys.idt && nipistys.idt.includes(e.pointerId)) lopetaNipistys();
  };
  kuuntele(doc, 'pointerup', sormiPois, true);
  kuuntele(doc, 'pointercancel', sormiPois, true);
  kuuntele(doc, KOSKETUKSEN_VAPAUTUS, () => { paikat.clear(); lopetaNipistys(); });
  kuuntele(ikkuna, 'blur', () => { paikat.clear(); lopetaNipistys(); });

  kotelo.addEventListener('wheel', (e) => {
    // Rulla on eleen alku: kotelon mitat tuoreiksi (ks. KOTELON MITAT).
    if (!kotelonMitat) lueKotelonMitat();
    // Cmd (mac) tai ctrl (Windows ja trackpadin nipistys) = zoom (E3).
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      ohjaimet.autoRotate = false;
      pysaytaLiuku(); vauhti.lat = 0; vauhti.lng = 0;
      const pov = pallo.pointOfView();
      const rajat = korkeusrajat();
      if (!zoomi.raf) zoomi.kohde = Math.log(Math.max(1e-6, pov.altitude));
      zoomi.kohde = Math.max(Math.log(rajat.min), Math.min(Math.log(rajat.max),
        zoomi.kohde + zoominAskel(e.deltaY, e.deltaMode)));
      const kohta = ruudunKohta(e.clientX, e.clientY);
      zoomi.ankkuri = kohta.piste;
      zoomi.sx = kohta.sx;
      zoomi.sy = kohta.sy;
      if (!zoomi.raf) {
        zoomi.edellinen = performance.now();
        zoomi.raf = requestAnimationFrame(zoominLiuku);
      }
      return;
    }
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
  return { sormet, pura: () => { pysaytaLiuku(); pysaytaRulla(); pysaytaZoomi(); puraSormivahti(); puraSyote(); } };
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
