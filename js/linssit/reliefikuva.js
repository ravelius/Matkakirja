/*
 * PALLON RELIEFIKUVA — KAKSI TARKKUUTTA, YKSI VALINTA.
 *
 * Kaksi linssiä piirtää saman reliefin pallon pinnalle: Astronautin
 * kamera (js/linssit/satelliitti-avaruus.js, avaruusnäkymän Maa) ja
 * topografialinssi (js/linssit/topografia.js, kartan oma kalvo).
 * Molemmat tarvitsevat SAMAN vastauksen kysymykseen "kumpi kuva tälle
 * ruudulle" — ja se vastaus on tässä yhtenä totuutena, ei kahtena
 * kopiona.
 *
 * Vakiot ja mittaukset ovat Astronautin kameran erästä 16.9.2026
 * (docs/raportit/viesti-fable-astro-pallo-20260916.md); ne siirrettiin
 * tänne sellaisinaan, kun topografialinssi otti saman valinnan
 * käyttöön (docs/raportit/viesti-fable-topografialinssi-20260916.md
 * luku 9). Satelliittilinssi vie nimet edelleen ulos omasta
 * moduulistaan, joten sen rajapinta ei muuttunut.
 *
 * TOPOGRAFIALINSSILLÄ ON TÄMÄN LISÄKSI TARKENNUSLAASTARI
 * (js/linssit/topografia-tarkennus.js): pohjakuva on koko pallolle,
 * laastari näkyvälle ikkunalle. Ne eivät kilpaile — pohja kertoo
 * yleiskuvan, laastari lähikuvan.
 */

/** Reliefikuvan osoite (js/packs/linssi-topografia-kuva.js). */
export const RELIEFIN_OSOITE = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-20260915.webp';

/**
 * Yhdistetyn tekstuurin mitat — LÄHDEKUVAN OMA TARKKUUS.
 *
 * MITATTU 12.9.2026 (kaappaus puhelimelta lähimmässä zoomissa):
 * 2048 px:n tekstuurilla Italia ja Etna olivat selvästi sumeat. Syy on
 * suoraa laskentaa: lähimmällä sallitulla korkeudella pallon halkaisija
 * on 1 518 px, joten sen kehä ruudulla on π · 1 518 ≈ 4 770 px 360
 * asteelle. 2048 px:n tekstuuri venyy siinä 2,3-kertaiseksi; 4096 px:n
 * venymä on 1,16 eli käytännössä pikselintarkka. Lähdekuva on juuri
 * 4096 × 2048, joten tätä suuremmasta ei saisi lisää tietoa.
 */
export const RELIEFIN_LEVEYS = 4096;
export const RELIEFIN_KORKEUS = 2048;

/*
 * ── TERÄVÄMPI RELIEFI, KAKSI VAKIOTA (16.9.2026) ──────────────────
 *
 * Macilla renderöitiin sama ETOPO1-reliefi kaksinkertaisella
 * tarkkuudella (topografia-pallo-8k-20260916.webp, 8192 × 4096,
 * 2,3 Mt). MITATTU 16.9.2026 (HEAD-kysely ja WebP-otsikko): kuva on
 * olemassa ämpärissä ja sen mitat ovat 8192 × 4096 — eivät 8192 × 2048,
 * joten se on TÄYSI kaksinkertaistus molempiin suuntiin.
 *
 * SE ON PUHELIMELLE LIIKAA, EIKÄ SE OLE MIELIPIDE VAAN LASKU:
 * 8192 × 4096 purkautuu 134 Mt:n RGBA-puskuriksi, ja tekstuurin
 * ladonta tarvitsee niitä KOLME (pohja, apukangas, tuloskangas) plus
 * PNG-pakkauksen 33,5 megapikselistä. iOS Safarin kangaskatto on
 * käytännössä 384 Mt eikä välilehti saa itse kuluttaa siitä kuin osan
 * — 4k-ketju on jo 100 Mt. Siksi kaksi vakiota ja valinta ruudun
 * koosta: 8k vain leveillä ruuduilla, 4k puhelimella.
 *
 * VALINTA ON CSS-LEVEYS × PIKSELISUHDE. Pelkkä laitepikselien määrä
 * ei kelpaa (kolminkertaisella pikselisuhteella puhelimen 430 px on
 * 1 290 laitepikseliä), joten kynnys on kaksiosainen: CSS-leveys
 * vähintään 1 024 (työpöytä tai iPad vaakatasossa) JA laitepikseleitä
 * vähintään 1 024. Puhelin putoaa aina ensimmäiseen ehtoon.
 */
/** Terävämpi reliefi (vain leveille ruuduille — ks. valitseReliefi). */
export const RELIEFIN_OSOITE_8K = 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-8k-20260916.webp';
export const RELIEFIN_8K_LEVEYS = 8192;
export const RELIEFIN_8K_KORKEUS = 4096;
/** Kynnykset: CSS-leveys ja laitepikselit, molemmat täytyttävä. */
export const RELIEFIN_8K_RAJA_CSS = 1024;
export const RELIEFIN_8K_RAJA_LAITEPX = 1024;
/**
 * PÄÄKYTKIN. `false` pitää kaikki ruudut 4k:ssa; yhden luvun vaihto
 * ottaa terävämmän kuvan käyttöön leveillä ruuduilla. Mittaukset ja
 * päätös: docs/raportit/viesti-fable-astro-pallo-20260916.md.
 */
export const RELIEFIN_8K_KAYTOSSA = true;

/*
 * ── KOKO PALLON RELIEFI: NAVAT MUKAAN (omistaja 16.9.2026) ─────────
 *
 * Sanatarkasti: *"onhan tarkemmassa topografia ajossa myos pohjois ja
 * etelanavat mukana, etta ei tule tyhjia kohtia niihin?"* — vastaus oli
 * ei, ja päätös oli *"Kyllä, koko pallo 1′-datasta."* (Raamattu,
 * ASTRONAUTIN KAMERA, LISÄYS 5.)
 *
 * Yllä olevat kaksi kuvaa (4k ja 8k) ovat kulkeneet PELIN LAUDAN
 * Millerin kautta, ja lauta ulottuu vain 76 °N…58 °S: navat ovat
 * niissä läpinäkyviä. Avaruusnäkymä maalaa reikiin generoidun
 * napajään (vyöhykeväri ilman rantaviivaa) ja topografialinssin alla
 * näkyy pallon oma pinta.
 *
 * tools/tee-pallotopografia-koko.mjs maalaa saman maailman SUORAAN
 * 1′-korkeusruudukosta navasta napaan — Etelämanner ja Jäämeri mukaan
 * lukien, ilman yhtään läpinäkyvää pikseliä. Kuvia on kaksi samoilla
 * mitoilla kuin yllä, joten RUUDUN VALINTA ON SAMA: 8k leveille
 * ruuduille, 4k puhelimelle.
 *
 * KYTKETTY 16.9.2026: Mac-ajo (tunniste 20260916) on valmis, kuvat
 * ovat ämpärissä (HEAD 200, mitat ja tavumäärät tarkistettu) ja
 * RELIEFI_KOKO_PALLO on käännetty todeksi. Ks.
 * docs/raportit/viesti-fable-pallo-navat-20260916.md, osio
 * "Kytketty 16.9.".
 *
 * KUN KOKO PALLON KUVA ON KÄYTÖSSÄ, NAPAJÄÄTÄ EI MAALATA PÄÄLLE. Jää
 * tulee kuvasta (tools/reliefivarit.mjs, jaapaino: korkeus +
 * leveysaste → jäävari), ja napojen häivytys söisi juuri sen
 * rantaviivan, jonka takia kuva tehtiin — ks.
 * js/linssit/satelliitti-avaruus.js napaLiuku.
 */

/** Onko koko pallon reliefi (navat mukaan) käytössä? Ks. yllä. */
export const RELIEFI_KOKO_PALLO = true;

/*
 * Koko pallon kuvat. Tunniste 20260916 on Mac-ajon syöte (tarkistettu
 * HEAD-kyselyllä 16.9.2026: 8k 2 872 604 tavua/8192×4096, 4k 770 066
 * tavua/4096×2048).
 *
 * TUNNISTE 20260919 (omistaja 19.9.2026 klo 15.40 Suomen aikaa): Jäämeren
 * merijää kevyemmäksi (tools/reliefivarit.mjs JAA.meriPohjoinen), jotta
 * Astronautin kameran pohjoisnapa ei ole tasainen vaalea levy. Mac-poltto
 * 19.9.: 8k 2 878 422 tavua/8192×4096, 4k 775 546 tavua/4096×2048;
 * etelä ja keskileveydet ennallaan. Ks. docs/raportit/
 * viesti-fable-jaameri-20260919.md.
 */
export const RELIEFIN_KOKO_4K = {
  osoite: 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-koko-4k-20260919.webp',
  leveys: RELIEFIN_LEVEYS,
  korkeus: RELIEFIN_KORKEUS,
};
export const RELIEFIN_KOKO_8K = {
  osoite: 'https://media.matkakirja.app/matkakirja/linssit/topografia-pallo-koko-8k-20260919.webp',
  leveys: RELIEFIN_8K_LEVEYS,
  korkeus: RELIEFIN_8K_KORKEUS,
};

/**
 * Kumpi reliefi tälle ruudulle? Puhdas funktio
 * (tests/satelliitti-avaruus.test.mjs).
 *
 * `tunnus` kertoo TARKKUUDEN ('8k' tai '4k') ja `kokoPallo` sen, onko
 * kuvassa navat. Tarkkuuden valinta on sama molemmilla kuvapareilla,
 * joten kytkin vaihtaa vain osoitteen — ei muistinkulutusta.
 *
 * @param {{ leveys?: number, dpr?: number, salli8k?: boolean,
 *   kokoPallo?: boolean }} ruutu
 */
export function valitseReliefi({
  leveys = 0, dpr = 1, salli8k = RELIEFIN_8K_KAYTOSSA, kokoPallo = RELIEFI_KOKO_PALLO,
} = {}) {
  const L = Number(leveys) || 0;
  const p = Number(dpr) > 0 ? Number(dpr) : 1;
  const iso = salli8k && L >= RELIEFIN_8K_RAJA_CSS && L * p >= RELIEFIN_8K_RAJA_LAITEPX;
  if (kokoPallo) {
    const k = iso ? RELIEFIN_KOKO_8K : RELIEFIN_KOKO_4K;
    return {
      tunnus: iso ? '8k' : '4k',
      osoite: k.osoite,
      leveys: k.leveys,
      korkeus: k.korkeus,
      kokoPallo: true,
    };
  }
  if (iso) {
    return {
      tunnus: '8k',
      osoite: RELIEFIN_OSOITE_8K,
      leveys: RELIEFIN_8K_LEVEYS,
      korkeus: RELIEFIN_8K_KORKEUS,
      kokoPallo: false,
    };
  }
  return {
    tunnus: '4k',
    osoite: RELIEFIN_OSOITE,
    leveys: RELIEFIN_LEVEYS,
    korkeus: RELIEFIN_KORKEUS,
    kokoPallo: false,
  };
}

/*
 * ── LADONTAKANGAS ON ERI ASIA KUIN LÄHDEKUVA (16.9.2026) ──────────
 *
 * Musta pallo iPhonessa (v1924, docs/raportit/viesti-fable-pallo-
 * musta-20260916.md) ei johtunut kuvasta vaan KANKAASTA. iOS Safari
 * ei heitä poikkeusta, kun kangas ylittää sen rajat: se antaa kankaan,
 * joka on TYHJÄ. Tyhjä kangas menee toBlobin läpi ongelmitta, ja
 * tuloksena on läpinäkyvä PNG — jonka three.js piirtää mustana.
 * Ketjun jokainen askel "onnistui", eikä yksikään virhehaara lauennut.
 *
 * Kaksi rajaa, molemmat mitattuja WebKitin lähteestä:
 *   1. YKSI KANGAS saa olla enintään 16 777 216 pikseliä (4096 × 4096).
 *      8192 × 4096 on 33,5 Mpx eli TÄSMÄLLEEN kaksi kertaa liikaa:
 *      8k-ladonta ei voi onnistua yhdelläkään iOS-laitteella, ja iPad
 *      vaakatasossa valitsee juuri 8k:n.
 *   2. KANKAIDEN YHTEISMÄÄRÄ on välilehteä kohti muutama sata
 *      megatavua. 4096 × 2048 on 33,5 Mt per kangas; vanha ketju piti
 *      niitä kahta yhtä aikaa plus puretun WebP:n plus PNG-pakkauksen.
 *
 * SIKSI LADONTAKANGAS VALITAAN RUUDUSTA EIKÄ KUVASTA. Lähdekuva
 * ladataan aina täytenä (selain purkaa sen kerran ja vapauttaa heti),
 * mutta se piirretään kankaalle, joka mahtuu laitteeseen. Puhelimella
 * 2048 × 1024 riittää: avaruusnäkymässä palloa näkyy vain puolikas,
 * joten 390 CSS-pikselin pallo (1 170 laitepikseliä kolminkertaisella
 * pikselisuhteella) saa noin 1 024 pikseliä tekstuuria näkyvälle
 * puoliskolleen. Hieman pehmeämpi kuin 4k — mutta ei musta.
 *
 * LEVEÄ RUUTU EI MENETÄ MITÄÄN: siellä katto on lähdekuvan oma koko.
 * Jos ladonta silti epäonnistuu (iPad), reliefiTekstuuri huomaa tyhjän
 * kankaan ja yrittää uudestaan puolikkaalla — ks. sen `tyhjaKangas`.
 */

/** Ladontakankaan katto puhelimella (CSS-leveys alle LADONNAN_RAJA_CSS). */
export const LADONNAN_KATTO_PUHELIN = 2048;
/** Kynnys, jonka yli ruutu saa ladota lähdekuvan täydessä koossa. */
export const LADONNAN_RAJA_CSS = RELIEFIN_8K_RAJA_CSS;

/*
 * ── LEVEÄ RUUTU EI OLE LUPA 33 MEGAPIKSELIIN (17.9.2026) ──────────
 *
 * MUSTA PALLO ASENNETUSSA macOS-WEBAPPISSA (Raamattu, ASTRONAUTIN
 * KAMERA LISÄYS 13 kohta 37; Codexin uusintatesti v1926, kotelo
 * 2539 × 1321 CSS, dpr 1): pallo ja 64 kohdepistettä näkyivät, mutta
 * karttatekstuuri oli KOKONAAN MUSTA — ja vartija sanoi `puute=ei`.
 *
 * Ketju oli mitattuna (Chromium, sama 2539 px:n kotelo, 17.9.2026):
 *   valitseReliefi → 8k (CSS-leveys ≥ 1024)
 *   valitseLadonta → 8192 × 4096 = 33,5 Mpx, koska leveä ruutu sai
 *                    ladota lähdekuvan OMASSA koossaan
 *   → PNG-blob 49 686 kt (48,5 Mt) → purettu tekstuuri 134 Mt GPU:lle.
 *
 * Kolme rajaa, joista jokainen kaataa ketjun HILJAA WebKitissä:
 *   1. iOS:n kangaskatto on 4096 × 4096 = 16,7 Mpx (WebKit
 *      HTMLCanvasElement maxCanvasArea); yli menevä kangas ei heitä
 *      poikkeusta vaan jää tyhjäksi.
 *   2. 48 megatavun PNG:n purku ei mahdu jokaisen WebKit-prosessin
 *      muistiin — <img> jää lataamatta, eikä three.js saa siitä tietoa.
 *   3. 134 Mt:n tekstuurin lataus GPU:lle voi epäonnistua ilman
 *      poikkeusta; silloin näytteenotto antaa MUSTAA.
 *
 * Yhtäkään näistä ei voi mitata luotettavasti etukäteen, joten katto
 * on sama kaikkialla: 4096 × 2048 (8,4 Mpx, PNG noin 12 Mt, tekstuuri
 * 33,5 Mt). Se on kuvan oma 4k-tarkkuus eikä näy pallolla, koska
 * avaruusnäkymässä palloa näkyy vain puolikas. LADONNAN_PIKSELIKATTO
 * on lisäksi ehdoton yläraja sille, mitä `katto`-parametrillakaan voi
 * pyytää — WebKitin oma raja, ei mielipide.
 *
 * KATON NOSTAMINEN VAATII MITATUN TUEN, ei arviota ruudun leveydestä.
 */
/** Ladontakankaan katto KAIKILLA laitteilla (ks. yllä). */
export const LADONNAN_KATTO = 4096;
/** Ehdoton pikselikatto: WebKitin kangasraja 4096 × 4096. */
export const LADONNAN_PIKSELIKATTO = 16 * 1024 * 1024;
/** WebKit-katto: Safari ja asennetut WebAppit eivät saa enempää. */
export const LADONNAN_KATTO_WEBKIT = 4096;

/**
 * Onko selain WebKit (Safari, iOS-selaimet, asennettu WebApp)?
 * Puhdas funktio (tests/satelliitti-avaruus.test.mjs).
 *
 * Tunnistus on tarkoituksella VAROVAINEN: Chrome ja Edge kantavat
 * merkkijonoa "Safari" omassa UA:ssaan, joten pelkkä "Safari" ei
 * kelpaa. Oikea kysymys on "onko tämä WebKit ILMAN Chromium-moottoria".
 */
export function webkitSelain(nav = globalThis.navigator) {
  try {
    if (nav?.standalone === true) return true;
    const ua = String(nav?.userAgent ?? '');
    if (!ua) return false;
    if (/Chrome|Chromium|CriOS|Edg\/|EdgiOS|OPR\//.test(ua)) return false;
    return /Safari|AppleWebKit|iPhone|iPad|iPod/.test(ua);
  } catch { return false; }
}

/**
 * Ladontakankaan mitat. Puhdas funktio (tests/pallolinssit.test.mjs).
 *
 * @param {{ leveys?: number, korkeus?: number, ruudunLeveys?: number,
 *   katto?: number, webkit?: boolean }} asetukset lähdekuvan mitat,
 *   ruudun CSS-leveys ja selainperhe
 * @returns {{ leveys: number, korkeus: number, katto: number,
 *   pienennetty: boolean }}
 */
export function valitseLadonta({
  leveys = RELIEFIN_LEVEYS, korkeus = RELIEFIN_KORKEUS, ruudunLeveys = 0, katto = 0,
  webkit = false,
} = {}) {
  const L = Math.max(1, Math.round(Number(leveys) || RELIEFIN_LEVEYS));
  const K = Math.max(1, Math.round(Number(korkeus) || RELIEFIN_KORKEUS));
  const ruutu = Number(ruudunLeveys) || 0;
  const pyydetty = Number(katto) > 0
    ? Math.round(Number(katto))
    : (ruutu >= LADONNAN_RAJA_CSS ? LADONNAN_KATTO : LADONNAN_KATTO_PUHELIN);
  /*
   * KOLME KATTOA, PIENIN VOITTAA: pyydetty, WebKitin oma ja ehdoton
   * pikselikatto. Viimeinen lasketaan kuvasuhteesta (2:1), jottei
   * kutsuja voi pyytää kangasta, joka ei voi mahtua.
   */
  const pikselikatto = Math.floor(Math.sqrt(LADONNAN_PIKSELIKATTO * 2));
  const raja = Math.max(1, Math.min(
    pyydetty, pikselikatto, webkit ? LADONNAN_KATTO_WEBKIT : Infinity,
  ));
  if (L <= raja) return { leveys: L, korkeus: K, katto: raja, pienennetty: false };
  /*
   * PUOLITUKSIN, EI VAPAALLA KERTOIMELLA. Tasavälisen kuvan leveyden
   * ja korkeuden suhteen on pysyttävä täsmälleen 2:1, tai maasto
   * venyy; puolitus säilyttää sen aina ja on selaimen halvin skaalaus.
   */
  let l = L;
  let k = K;
  while (l > raja && l > 1) { l = Math.round(l / 2); k = Math.max(1, Math.round(k / 2)); }
  return { leveys: l, korkeus: k, katto: raja, pienennetty: true };
}
