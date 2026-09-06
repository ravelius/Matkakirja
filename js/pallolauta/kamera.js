/*
 * PALLOLAUDAN KAMERA — Kartta.ajaKameran vastine karttapallolle.
 *
 * Raamattu (KARTTAPALLO ON PELILAUTA, omistaja 5.9.2026): pallo on
 * pelin lauta, ja kamera-ajot — ennakkozoomi, saatto, kohdesovitus,
 * sukellus kaupunkiin — kulkevat samaa rajapintaa kuin tasokartalla,
 * jotta js/ui.js:n koreografia ei tiedä laudasta mitään
 * (docs/moduulit/karttapallo.md luku 5). ui.kamera() valitsee tämän tai
 * js/kartta.js:n Kartta-olion sen mukaan, kumpi lauta on hereillä.
 *
 * SAMA ALLEKIRJOITUS: ajaKamera({ x, y, leveys | kerroin } | { bbox,
 * marginaali }, { kesto, pehmennys }), kameranTila, kameraAjossa,
 * pysaytaKameraAjo, siirtoZoomiKerroin ja nakyvaAlue — kaikki laudan
 * yksiköissä. Kumpikaan lauta ei kutsu toisen sisäisiä metodeja.
 *
 * ── YKSI TOTUUS: LAUDAN (x, y) ────────────────────────────────────
 *
 * Pallo ei tallenna omia koordinaatteja mihinkään: asteet lasketaan
 * laudan koordinaateista (js/fokusmitat.js laudaltaAsteiksi) ja takaisin
 * (projisoiLaudalle). Näin tallennus, moveOptions, pixelOf ja pelisäännöt
 * pysyvät lautayksiköissä, ja `?lauta=kartta` antaa täsmälleen saman
 * pelin.
 *
 * ── NÄKYVÄ LEVEYS ↔ KORKEUS ───────────────────────────────────────
 *
 * Kartan ajot pyytävät `leveys` (lautayksikköä ruudun leveydellä).
 * Pallolle (karttapallo.md luku 5):
 *
 *   korkeus(leveysYks) = (leveysYks · 360/12000) / (kuvasuhde · 2 · tan(fov/2) · 180/π)
 *
 * eli Globe.gl:n oletus-fovilla 50° ≈ leveysYks / (1780 · kuvasuhde). Kaava
 * on tasokuva, tarkka vain pienillä korkeuksilla; suurilla käytetään pallon
 * geometriaa (näkyvä kaari = 2·acos(1/(1+h)), eli h = 1/cos(kaari/2) − 1),
 * ja kummastakin otetaan se, joka vaatii korkeamman kameran — molemmat
 * ovat kasvavia, joten käänteinen on niiden käänteisten minimi.
 * Kaukaisin korkeus on 2,5 (koko pallo); lähin sidotaan laattojen
 * tarkkuuteen (Z8 182 px/aste, enintään 2× venytys → ~70 yksikköä).
 *
 * KUVASUHDE ON PAKOLLINEN OSA KAAVAA (korjattu 5.9.2026, omistajan
 * palaute *"kartan zoom taso heti aloituksessa lähemmäksi"*). Globe.gl:n
 * fov on PYSTYSUUNNAN avauskulma, joten ilman kuvasuhdetta kaava asetti
 * pyydetyn leveyden ruudun KORKEUDELLE: työpöydällä (1379 × 826) ruudulla
 * näkyi 1,67-kertainen kaista pyydettyyn nähden ja puhelimella (374 × 777)
 * vain 0,48-kertainen — sama pyyntö tarkoitti eri asiaa eri laitteella, ja
 * bbox-rajaus (kameranKohde) laski korkeusehdon täsmälleen väärinpäin.
 * `kuvasuhde` = kotelon leveys / korkeus; oletus 1 pitää yksikkötestien
 * ja apufunktioiden vanhan merkityksen (neliöruutu), ja laudan kamera
 * antaa aina kotelon oman suhteen. Mitatut seuraukset ja vakioiden
 * kalibrointi: docs/moduulit/karttapallo.md luku 10.3.
 *
 * ── TRAPETSI, EI CUBIC.INOUT ──────────────────────────────────────
 *
 * Globe.gl:n oma pointOfView-tween on Cubic.InOut eikä tunne SIIRRON
 * KOREOGRAFIAN trapetsia (js/siirtokoreografia.js siirtoajonPehmennys), eikä sitä voi
 * keskeyttää kirjaamalla välivaihe. Ajo lasketaan siksi itse kehys
 * kerrallaan requestAnimationFramessa ja kirjoitetaan pointOfView(pov, 0)
 * — sama koodi kuin pallon liuku (js/pallo.js). Korkeus interpoloidaan
 * logaritmisesti kuten kartan mittakaava (silmä lukee zoomista suhteen).
 * Ele keskeyttää: sormi koteloon pysäyttää ajon siihen, mihin se ehti.
 * Reduced motion: ajo on hyppy (kesto 0).
 */

import { laudaltaAsteiksi, projisoiLaudalle } from '../fokusmitat.js';
import { pixelOf } from '../rules.js';
/*
 * Ajon kesto ja pehmennys samasta koreografiasta kuin tasokartalla.
 * sovitaAjonKesto MUUTTI OSOITETTA 5.9.2026 (laiskoituserä 5b): se asui
 * js/kartta.js:ssä, ja tämä yksi tuonti olisi vetänyt koko tasokartan
 * (219 kt) muistiin heti pallolaudan avautuessa.
 */
import { siirtoajonPehmennys, sovitaAjonKesto } from '../siirtokoreografia.js';

/** Globe.gl:n kameran oletusavauskulma (astetta, pystysuunta). */
export const PALLO_FOV = 50;
/** Kaukaisin korkeus: koko pallo ruudulla. */
export const PALLO_KORKEUS_MAX = 2.5;
/**
 * Lähin korkeus OLETUKSENA: Z8-laatat enintään 2× venytettyinä 390 css-
 * pikselin ruudulla dpr 2:lla (≈ 2,1° ≈ 70 lautayksikköä). Laudan oma
 * kamera EI käytä tätä vaan laskee rajan laitteesta ja laattaluettelon
 * syvimmästä tasosta (lahinKorkeus alempana); tämä on kaavan vara, kun
 * kutsuja ei kerro laitetta (testit, apufunktiot).
 */
export const PALLO_KORKEUS_MIN = 0.04;
/** Laatan sivu pikseleinä (sw.js:n ja tee-pallolaatat.mjs:n LAATTA). */
export const LAATAN_PIKSELIT = 256;
/**
 * Rasterin terävyysraja: montako laitepikseliä yhtä laatan pikseliä
 * kohden maasto kestää ennen kuin se näyttää pehmeältä. 2 = laatan
 * pikseli kahtena (karttapallo.md luku 6). EI ENÄÄ ZOOMIN RAJA (v1649):
 * viivat ovat vektoreita, joten kamera saa mennä tämän ohi — luku jää
 * vertailukohdaksi mittauksiin (laattojenVenytys).
 */
export const PALLON_SALLITTU_VENYTYS = 2;
/** Maailmankartan laudan leveys lautayksikköinä (360°). */
export const PALLOLAUDAN_LEVEYS = 12000;
/** Pallon oma lauta: ainoa, jolla on maantieteellinen projektio. */
export const PALLOLAUDAN_LAUTA = 'maailmankartta';
/**
 * Saapumisen näkymä kaupungin yllä lautayksikköinä ruudun leveydellä.
 * Tasokartan saapumisporras on 58–88 yksikköä, mutta pallon Z8-laatat
 * ovat siinä jo venytettyjä; 240 näyttää kaupungin ympäristön
 * (~7°, ~1300 px Z8:aa) terävänä. Kalibroidaan omistajan laitteella.
 */
export const PALLOLAUDAN_SAAPUMISLEVEYS = 240;
/**
 * Siirtonäkymän lähin leveys (siirtoZoomiKerroin): ennakkozoomi vie
 * SIIRTOZOOMIN_LAHENNYS kertaa lähemmäs, mutta ei tämän alle. Puolet
 * saapumisleveydestä eli yksi lähennys saapumisnäkymästä (~3,6°, Z8 noin
 * 1,8× venytettynä iPhonen dpr 3:lla) — siitä eteenpäin laatat sumenevat.
 */
export const PALLOLAUDAN_SIIRTOLEVEYS = 120;
/** Sukellus kaupunkiin: sama kesto kuin valikkopallon sukelluksella. */
export const PALLOKAMERAN_AJO_MS = 1400;

/** Lautayksiköt asteiksi pituuspiirin suunnassa. */
export function asteetLeveydesta(leveysYks, laudanLeveys = PALLOLAUDAN_LEVEYS) {
  return (leveysYks * 360) / laudanLeveys;
}

/** Tasokuvan kerroin: astetta korkeusyksikköä kohti. */
function tasokuvanKerroin(fov) {
  return 2 * Math.tan((fov / 2) * (Math.PI / 180)) * (180 / Math.PI);
}

/**
 * Näkyvä leveys (lautayksikköä) → Globe.gl:n altitude.
 *
 * `kuvasuhde` = kotelon leveys / korkeus. Fov on pystysuunnan kulma,
 * joten pyydetty LEVEYS jaetaan kuvasuhteella ennen kuin se muutetaan
 * korkeudeksi; oletus 1 = neliöruutu (yksikkötestit, apufunktiot).
 */
export function korkeusLeveydesta(leveysYks, {
  fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, min = PALLO_KORKEUS_MIN, kuvasuhde = 1,
} = {}) {
  if (!(leveysYks > 0)) return PALLO_KORKEUS_MAX;
  const asteet = asteetLeveydesta(leveysYks, laudanLeveys);
  const taso = asteet / (Math.max(0.01, kuvasuhde) * tasokuvanKerroin(fov));
  // Pallon geometria: kaari mahtuu näkyviin vasta, kun horisontti on
  // sen takana. Yli 180° kaari ei mahdu koskaan → katto.
  const kaari = asteet < 180 ? 1 / Math.cos((asteet / 2) * (Math.PI / 180)) - 1 : Infinity;
  return Math.min(PALLO_KORKEUS_MAX, Math.max(min, Math.max(taso, kaari)));
}

/*
 * ── LÄHIN NÄKYVÄ LEVEYS ON VAKIO, EI LAATTOJEN TARKKUUS ───────────
 *
 * OMISTAJAN PALAUTE v1649 (sanatarkasti): *"Voisiko syvemmin zoomin
 * sallia jo nyt vaikka korkeusdataa ei ole mutta rajat varmaan
 * piirtyvät terävänä kun on vektori"*.
 *
 * MIKSI RAJA SAA SYVETÄ. v1649 toi pallolle vektoriviivat
 * (js/pallovektorit.js): rantaviiva ja rajat piirretään ruudun
 * pikseliksi millä tahansa korkeudella, eivät laatan pikseliksi. Kuvan
 * TERÄVYYS ei siis enää tule laattatasosta — laatta antaa vain maaston
 * värin, joka saa olla pehmeä. Aiemmin lähin leveys laskettiin
 * laattatarkkuudesta (venytys enintään PALLON_SALLITTU_VENYTYS = 2), ja
 * se on nyt väärä mitta: se rajasi zoomin sinne, missä RASTERI on
 * terävä, vaikka silmä katsoo viivaa.
 *
 * VAKIO EIKÄ LAITEKOHTAINEN LUKU. Vanha kaava antoi lähimmäksi
 * leveydeksi puhelimella 107 yksikköä ja isolla ruudulla katon
 * PALLOLAUDAN_SIIRTOLEVEYS 120 — sama ele vei eri laitteilla eri
 * syvyyteen. Uusi raja on yksi luku kaikille: PALLOLAUDAN_LAHIN_LEVEYS,
 * puolet vanhasta katosta (120 → 60 lautayksikköä ≈ 1,8°). Yksi
 * nipistys entisestä pohjasta vie siis vielä yhden portaan syvemmälle.
 *
 * VENYTYS uudessa rajassa (laattojenVenytys, mitattu 6.9.2026):
 * pyramidin syvin taso z8 antaa 480 px/aste, ja lähin näkymä on 1,8°
 * ruudun leveydellä. Puhelin 390 css × dpr 3 = 1170 px → 650 px/aste →
 * venytys 1,4×; iPad 834 × 2 = 1668 px → 1,9×; työpöytä 1440 × 2 =
 * 2880 px → 3,3×. Maasto on silloin pehmeä (PALLON_SALLITTU_VENYTYS 2
 * ylittyy isolla ruudulla), viivat teräviä — juuri se, mitä omistaja
 * pyysi. Kun korkeusdata ja syvempi pyramiditaso joskus tulevat, sama
 * vakio kestää: venytys pienenee itsestään.
 *
 * SIIRTONÄKYMÄ EI SYVENE: PALLOLAUDAN_SIIRTOLEVEYS (120) on yhä
 * siirtokoreografian ennakkozoomin katto (siirtoZoomiKerroin), joten
 * pelin oma koreografia pysyy täsmälleen ennallaan; vain pelaajan oma
 * nipistys pääsee syvemmälle. Tasokartan oma raja (js/kartta.js
 * ZOOMI_LAHIN 88) on eri vakio eikä muutu.
 */
/** Laattatason tarkkuus pikseleinä astetta kohden (Z8 = 182). */
export function laatanTarkkuus(taso, laatanPikselit = LAATAN_PIKSELIT) {
  return (laatanPikselit * 2 ** taso) / 360;
}

/**
 * LÄHIN SALLITTU NÄKYVÄ LEVEYS (lautayksikköä) — vakio kaikille
 * laitteille. Puolet siirtonäkymän katosta (PALLOLAUDAN_SIIRTOLEVEYS).
 */
export const PALLOLAUDAN_LAHIN_LEVEYS = PALLOLAUDAN_SIIRTOLEVEYS / 2;

/**
 * Laattapyramidin syvimmän tason tiheys pikseleinä astetta kohti
 * (pyramidi.json 2026-09-03a: z8 leveys 172 800 px / 360° = 480). Tämä
 * on se, mitä laattakerros (js/pallolaatat.js) pallolle piirtää — pallon
 * oma Mercator-sarja (laatanTarkkuus) on enää kirjaston pohja.
 */
export const PYRAMIDIN_SYVIN_PX_ASTE = 480;

/**
 * Laattojen venytys annetulla näkyvällä leveydellä: montako
 * laitepikseliä yhtä laatan pikseliä kohti. Mittaus ja testit — peli ei
 * enää rajaa zoomia tällä (ks. yllä).
 */
export function laattojenVenytys({
  leveysPx, dpr = 1, leveysYks = PALLOLAUDAN_LAHIN_LEVEYS,
  laudanLeveys = PALLOLAUDAN_LEVEYS, pxAste = PYRAMIDIN_SYVIN_PX_ASTE,
}) {
  const laitepikselit = Math.max(1, leveysPx) * Math.max(1, dpr);
  const asteet = asteetLeveydesta(Math.max(1e-6, leveysYks), laudanLeveys);
  return laitepikselit / (asteet * Math.max(1e-6, pxAste));
}

/** Lähin sallittu näkyvä leveys (lautayksikköä). */
export function lahinLeveys({ lahin = PALLOLAUDAN_LAHIN_LEVEYS } = {}) {
  return lahin;
}

/** Lähin sallittu korkeus (altitude) lähimmästä leveydestä. */
export function lahinKorkeus(valinnat = {}) {
  const { fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, kuvasuhde = 1 } = valinnat;
  return korkeusLeveydesta(lahinLeveys(valinnat), {
    fov, laudanLeveys, kuvasuhde, min: 0,
  });
}

/** Globe.gl:n altitude → näkyvä leveys lautayksikköinä (käänteinen). */
export function leveysKorkeudesta(korkeus, {
  fov = PALLO_FOV, laudanLeveys = PALLOLAUDAN_LEVEYS, kuvasuhde = 1,
} = {}) {
  const h = Math.max(1e-6, korkeus);
  const tasoAsteet = h * tasokuvanKerroin(fov) * Math.max(0.01, kuvasuhde);
  const kaariAsteet = 2 * Math.acos(1 / (1 + h)) * (180 / Math.PI);
  const asteet = Math.min(360, Math.min(tasoAsteet, kaariAsteet));
  return (asteet / 360) * laudanLeveys;
}

/** Lyhin kierto pituuspiirin suunnassa (−180…180). */
function lyhinLng(alusta, kohteeseen) {
  let d = kohteeseen - alusta;
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

/**
 * Pallolaudan kamera. `pallo` on Globe.gl-instanssi, `kotelo` sen
 * DOM-kotelo (eleiden keskeytys), `ui` pelin UI (reducedMotion, kuoleman
 * lippu, nykyinen kaupunki), `heraa` kutsutaan ennen ajoa (render-silmukka
 * pois tauolta, ks. js/pallolauta/lauta.js).
 */
export function luoPallokamera({
  pallo, kotelo, ui, lauta = PALLOLAUDAN_LAUTA, laudanLeveys = PALLOLAUDAN_LEVEYS, heraa = null,
  laattataso = 7, dpr = globalThis.devicePixelRatio || 1,
}) {
  let ajo = null; // { kehys, valmis, nyt } kesken olevalle ajolle

  const ruudunLeveys = () => kotelo?.clientWidth || 1;
  const ruudunKorkeus = () => kotelo?.clientHeight || 1;
  /*
   * KUVASUHDE LUETAAN KUTSUTTAESSA, ei kerran: ruutu kääntyy, ikkuna
   * muuttaa kokoa ja lehti avautuu kotelon päälle. Sama luku menee sekä
   * leveys → korkeus että korkeus → leveys -suuntaan, joten pyydetty
   * leveys on aina lautayksikköä RUUDUN LEVEYDELLÄ.
   */
  const kuvasuhde = () => ruudunLeveys() / ruudunKorkeus();

  /*
   * LÄHIN KORKEUS VAKIOLEVEYDESTÄ (v1649). Lasketaan kutsuttaessa eikä
   * kerran: kotelon KUVASUHDE vaihtuu kääntyvällä ruudulla, ja sama
   * lautayksikkömäärä ruudun leveydellä on silloin eri korkeus.
   */
  const korkeusMin = () => lahinKorkeus({ laudanLeveys, kuvasuhde: kuvasuhde() });
  /** Näkyvä leveys → korkeus laitteen tarkkuusrajalla. */
  const korkeus = (leveysYks) => korkeusLeveydesta(leveysYks, {
    laudanLeveys, kuvasuhde: kuvasuhde(), min: korkeusMin(),
  });
  /** Korkeus → näkyvä leveys samalla kuvasuhteella. */
  const leveys = (korkeusArvo) => leveysKorkeudesta(korkeusArvo, { laudanLeveys, kuvasuhde: kuvasuhde() });

  const pysaytaKameraAjo = () => {
    if (!ajo) return false;
    const kesken = ajo;
    ajo = null;
    cancelAnimationFrame(kesken.kehys);
    kesken.valmis(false);
    return true;
  };

  // ELE KESKEYTTÄÄ (Raamattu, KAMERA-AJOT): sormi tai rulla koteloon
  // pysäyttää ajon siihen, mihin se ehti — pallo ei nykäise takaisin.
  // Rulla KAAPPAUSVAIHEESSA: panorointi (js/pallo.js asennaPallonEleet)
  // katkaisee wheelin kotelon kaappauksessa, joten kuplintaan jäänyt
  // kuuntelija ei enää saisi tapahtumaa. Saman solmun kaappaajat ajetaan
  // kaikki (stopPropagation koskee vain seuraavaa solmua).
  kotelo?.addEventListener('pointerdown', () => pysaytaKameraAjo());
  kotelo?.addEventListener('wheel', () => pysaytaKameraAjo(), { passive: true, capture: true });

  /** Näkymän tila: keskipiste laudalla, näkyvä leveys, korkeus, asteet. */
  const kameranTila = () => {
    const pov = pallo.pointOfView();
    if (!pov || !Number.isFinite(pov.lat)) return null;
    const kohta = projisoiLaudalle(lauta, pov.lng, pov.lat);
    if (!kohta) return null;
    const nakyva = leveys(pov.altitude);
    return {
      x: kohta.x, y: kohta.y, leveys: nakyva, korkeus: pov.altitude, lat: pov.lat, lng: pov.lng,
      skaala: ruudunLeveys() / nakyva,
    };
  };

  /** ui.nakyvaAlue-vastine: laatikko laudan yksiköissä + mittakaava. */
  const nakyvaAlue = () => {
    const tila = kameranTila();
    if (!tila) return null;
    const w = tila.leveys;
    const h = w * (ruudunKorkeus() / ruudunLeveys());
    return { x: tila.x - w / 2, y: tila.y - h / 2, w, h, skaala: tila.skaala };
  };

  /** Kohteen asteet ja korkeus laudan yksiköistä (ks. Kartta.kameranKohde). */
  const kameranKohde = (kohde) => {
    if (!kohde) return null;
    const nyt = pallo.pointOfView();
    let x = kohde.x;
    let y = kohde.y;
    let leveys = kohde.leveys ?? null;
    if (kohde.bbox) {
      /*
       * LAATIKKO MAHTUU MOLEMPIIN SUUNTIIN. Korkeusehto muutetaan
       * leveydeksi kuvasuhteella (h · W/H), ja tiukempi voittaa. Tämä
       * kaava oli oikein jo ennen 5.9.2026, mutta korkeusLeveydesta
       * tulkitsi tuloksen ruudun KORKEUDEKSI (fov on pystykulma), joten
       * ehto meni käytännössä väärinpäin; nyt kamera saa kuvasuhteen ja
       * `leveys` tarkoittaa lautayksiköitä ruudun leveydellä.
       */
      const { bbox, marginaali = 0 } = kohde;
      x = bbox.x + bbox.w / 2;
      y = bbox.y + bbox.h / 2;
      const vara = 1 + 2 * marginaali;
      leveys = Math.max(bbox.w * vara, (bbox.h * vara * ruudunLeveys()) / ruudunKorkeus());
    } else if (kohde.kerroin > 0) {
      leveys = laudanLeveys / kohde.kerroin;
    }
    let lat = kohde.lat;
    let lng = kohde.lng;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      const asteet = laudaltaAsteiksi(lauta, x, y);
      if (!asteet) return null;
      lat = asteet.lat;
      lng = asteet.lon;
    }
    const pyydetty = kohde.korkeus ?? (leveys > 0 ? korkeus(leveys) : nyt.altitude);
    // Kamera ei mene laattojen tarkkuuden alle, ei myöskään suoraan
    // korkeutena annetulla kohteella.
    const altitude = Math.min(PALLO_KORKEUS_MAX, Math.max(korkeusMin(), pyydetty));
    return { lat: Math.max(-89.5, Math.min(89.5, lat)), lng, altitude };
  };

  /**
   * Ajaa kameran kohteeseen. Palauttaa lupauksen: true perillä, false jos
   * ajo keskeytyi tai ei lähtenyt.
   *
   * `sovita` (kartta.js sovitaAjonKesto, omistaja 3.9.2026: ajot
   * pehmeästi peräkkäin): kesto venyy liikkeen mukaan — +50 % per
   * zoomioktaavi ja +50 % per ruudullinen panorointi, katto 1800 ms —
   * täsmälleen samalla kaavalla kuin tasokartalla, jotta ennakkozoomi
   * ja kohdesovitus kestävät pallolla saman kuin kartalla.
   */
  const ajaKamera = (kohde, {
    kesto = PALLOKAMERAN_AJO_MS, pehmennys = siirtoajonPehmennys, sovita = false,
  } = {}) => {
    if (ui?.dead) return Promise.resolve(false);
    const maali = kameranKohde(kohde);
    if (!maali) return Promise.resolve(false);
    // Lähtö on se, missä kuva juuri nyt on — myös kesken ajon.
    const alku = ajo?.nyt ? { ...ajo.nyt } : pallo.pointOfView();
    pysaytaKameraAjo();
    heraa?.();
    const dLng = lyhinLng(alku.lng, maali.lng);
    if (ui?.reducedMotion || !(kesto > 0)) {
      pallo.pointOfView(maali, 0);
      return Promise.resolve(true);
    }
    // Ajo, joka ei liikuta mitään, on turha.
    const dLat = maali.lat - alku.lat;
    const suhde = Math.abs(Math.log(maali.altitude / alku.altitude));
    if (Math.hypot(dLat, dLng) < 0.01 && suhde < 0.005) {
      pallo.pointOfView(maali, 0);
      return Promise.resolve(true);
    }
    if (sovita) {
      // Panorointi ruudullisina: kulmamatka suhteessa lähtönäkymän
      // leveyteen asteina (sama mitta kuin kartan matka / paneW).
      const nakyvaAsteina = asteetLeveydesta(leveys(alku.altitude), laudanLeveys);
      kesto = sovitaAjonKesto(kesto, suhde, Math.hypot(dLat, dLng) / Math.max(1e-6, nakyvaAsteina));
    }
    return new Promise((valmis) => {
      const oma = { kehys: 0, valmis, nyt: { ...alku }, alkuhetki: performance.now(), kesto };
      ajo = oma;
      const askel = (hetki) => {
        if (ajo !== oma) return;
        if (ui?.dead) { pysaytaKameraAjo(); return; }
        const t = Math.min(1, (hetki - oma.alkuhetki) / kesto);
        const e = pehmennys(t);
        const nyt = {
          lat: alku.lat + dLat * e,
          lng: alku.lng + dLng * e,
          altitude: Math.exp(Math.log(alku.altitude) + (Math.log(maali.altitude) - Math.log(alku.altitude)) * e),
        };
        oma.nyt = nyt;
        pallo.pointOfView(nyt, 0);
        if (t < 1) {
          oma.kehys = requestAnimationFrame(askel);
          return;
        }
        ajo = null;
        valmis(true);
      };
      oma.kehys = requestAnimationFrame(askel);
    });
  };

  /**
   * Kerroin nykyisestä leveydestä: `lahennys` kertaa lähemmäs.
   *
   * KATTO ON ABSOLUUTTINEN, kuten tasokartalla (js/kartta.js
   * siirtoZoomiKerroin, SIIRTONAKYMAN_LAHIN_KERROIN): kerroin on
   * suhteellinen, joten ilman kattoa jokainen heitto veisi puolet
   * lähemmäs ja kolmen siirron jälkeen pallo olisi laattojen
   * tarkkuusrajassa. Siirtonäkymä ei mene PALLOLAUDAN_SIIRTOLEVEYTTÄ
   * lähemmäs — eikä koskaan ULOS pelaajan omasta lähikuvasta.
   */
  const siirtoZoomiKerroin = (lahennys = 1) => {
    const tila = kameranTila();
    const leveys = tila?.leveys ?? laudanLeveys;
    const katto = Math.max(leveys / Math.max(0.01, lahennys), PALLOLAUDAN_SIIRTOLEVEYS);
    return laudanLeveys / Math.min(leveys, katto);
  };

  /**
   * Pelaajan paikan ylle saapumisnäkymään (kesto 0 = heti). Paikka on
   * kaupunki tai reitin välipiste — sama pixelOf kuin tasokartalla.
   */
  const kotiin = ({ kesto = 0 } = {}) => {
    const { game } = ui ?? {};
    const pos = game?.player?.pos;
    if (!pos || !game.board) return Promise.resolve(false);
    const kohta = pixelOf(game.board, pos);
    if (!Number.isFinite(kohta?.x)) return Promise.resolve(false);
    return ajaKamera({ x: kohta.x, y: kohta.y, leveys: PALLOLAUDAN_SAAPUMISLEVEYS }, { kesto });
  };

  return {
    ajaKamera,
    kameranTila,
    nakyvaAlue,
    /** Lähin sallittu korkeus juuri nyt (OrbitControlsin minDistance). */
    korkeusMin,
    /** Lähin sallittu näkyvä leveys lautayksikköinä (savukkeet, vartijat). */
    lahinLeveys: () => leveys(korkeusMin()),
    /**
     * Laattojen venytys lähimmässä näkymässä (savukkeet ja mittarit;
     * ks. laattojenVenytys). Terävyys tulee vektoriviivoilta, joten
     * venytys saa ylittää PALLON_SALLITTU_VENYTYKSEN.
     *   `kerros` = laattakerroksen pyramidin syvin taso (se, mitä
     *              pallolle nyt piirretään),
     *   `pohja`  = kirjaston oman Mercator-sarjan syvin taso
     *              (perääntymistie ?laattakerros=0).
     */
    venytys: () => {
      const leveysYks = leveys(korkeusMin());
      return {
        leveys: leveysYks,
        kerros: laattojenVenytys({ leveysPx: ruudunLeveys(), dpr, laudanLeveys, leveysYks }),
        pohja: laattojenVenytys({
          leveysPx: ruudunLeveys(), dpr, laudanLeveys, leveysYks, pxAste: laatanTarkkuus(laattataso),
        }),
      };
    },
    kameraAjossa: () => Boolean(ajo),
    pysaytaKameraAjo,
    siirtoZoomiKerroin,
    kameranKohde,
    kotiin,
    /**
     * Kesken oleva ajo mittausta varten (savuke-siirtokoreografia
     * `--lauta pallo`): sama muoto kuin Kartta.kameraAjo — nykyinen
     * kehys laudan yksiköissä, kesto ja alkuhetki. Null, kun ajoa ei ole.
     */
    get kameraAjo() {
      if (!ajo?.nyt) return null;
      const kohta = projisoiLaudalle(lauta, ajo.nyt.lng, ajo.nyt.lat);
      return { nyt: { x: kohta?.x, y: kohta?.y }, kesto: ajo.kesto, alkuhetki: ajo.alkuhetki };
    },
  };
}
