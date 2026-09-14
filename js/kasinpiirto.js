/*
 * KÄSINPIIRRETTY KEHYSVIIVA — MAAPANEELIN KARTUSSI
 * =====================================================================
 *
 * Raamattu, KARTTAUUDISTUKSEN PÄÄTÖKSET 7 (omistaja 14.9.2026,
 * sanatarkasti): *"maainfossa pitaa olla nelja kertaa pienempi ja saisi
 * olla vaalealla pohjalla kuten kasinpiirretyissa kartoissa. myos
 * aariviiva pitaisi olla kasinpiirretyn nakoinen. esim paksumpi ja
 * sitten ulompi ohuempi viiva tai minkalainen se vain oli vanhoissa
 * kartoissa. selvita tarkkaan ja toteuta"*.
 *
 * RAJAUS 14.9.2026 (omistaja, sanatarkasti): *"ei tehda maan
 * aariviivaan kaksoisviivaa. eli keskeyta koko maa aariviiva projekti.
 * pidetaan se vain sen maa infopalikan piirtamiseen."* — kaksoisviiva
 * on siis VAIN maapaneelin kehyksessä. Kartan punainen maan raja jää
 * täysin ennalleen, eikä tämä moduuli tiedä siitä mitään.
 *
 * === MISTÄ LUVUT OVAT (mittaukset, ei adjektiiveja) ==================
 *
 * Luvut on MITATTU aikakauden atlaslehdiltä pikselitasolla (David
 * Rumsey Map Collectionin IIIF-skannaukset, arkkien fyysinen koko
 * luettelotiedoista → px/mm). Työ ja lähdeviitteet:
 * docs/raportit/viesti-fable-kasinpiirto-20260914.md.
 *
 *   A. Stieler's Hand-Atlas No. 56, "Die Europäische Türkei",
 *      A. Petermann / H. Habenicht, Justus Perthes, Gotha 1874.
 *      Arkki 34 × 44 cm, skannaus 15996 × 12926 px → 36,35 px/mm.
 *      Arkin kehys (neatline), 404 mittausta 900 px:n matkalta:
 *        ULOMPI OHUT  7,78 px = 0,214 mm   (keskihajonta 0,51 px)
 *        VÄLI        21,56 px = 0,593 mm   (keskihajonta 0,73 px)
 *        SISEMPI PAKSU 30,14 px = 0,829 mm (keskihajonta 0,48 px)
 *      → paksu : väli : ohut = 1 : 0,72 : 0,26
 *
 *   B. Keith Johnston's General Atlas, "Europe", W. & A.K. Johnston,
 *      Edinburgh 1879. Arkki 48 × 58 cm, 11977 × 8648 px → 20,65 px/mm.
 *      Sama kehys, 399 mittausta 800 px:n matkalta:
 *        ULOMPI OHUT  1,89 px = 0,092 mm
 *        VÄLI         8,66 px = 0,419 mm
 *        SISEMPI PAKSU 12,93 px = 0,626 mm
 *      → paksu : väli : ohut = 1 : 0,67 : 0,15
 *
 * MOLEMMISSA OHUT VIIVA ON ULKONA JA PAKSU SISÄLLÄ — juuri niin kuin
 * omistaja arvasi. `VÄLI ≈ 0,7 × PAKSU` on kahden eri kaivertajan
 * yhteinen suhde, ja se on tämän moduulin kantoluku.
 *
 * === MIKÄ TEKEE JÄLJESTÄ KÄSINPIIRRETYN ==============================
 *
 * Sama mittaus kertoo, ettei "suora" viiva ole suora. Kehysviivan
 * KESKILINJA heittelee mitatulla matkalla:
 *   Stieler  keskihajonta 1,91 px = 0,053 mm, huipusta huippuun 6,8 px
 *   Johnston keskihajonta 1,24 px = 0,060 mm, huipusta huippuun 4,5 px
 * Absoluuttiluku ei siirry ruudulle, mutta SUHDE PAKSUN VIIVAN
 * LEVEYTEEN siirtyy: heitto huipusta huippuun on 0,23 × paksu viiva
 * (Stieler) ja 0,35 × paksu (Johnston) — ja aallonpituus noin 30 ×
 * paksu viiva. Nämä kaksi lukua ovat `KASI_HORJUNTA` ja
 * `KASI_AALLONPITUUS`: viiva vaeltaa vajaan kolmanneksen omasta
 * paksuudestaan, hyvin hitaasti.
 *
 * Viivan LEVEYS vaihtelee pituussuunnassa: ohut kehysviiva 0,51/7,78 =
 * 6,5 %, paksu 0,48/30,14 = 1,6 %. Siitä `KASI_LEVEYSHEITTO`.
 *
 * === MIKSI SIEMEN ON PAKKO OLLA =====================================
 *
 * Satunnaisuus on DETERMINISTINEN: aalto lasketaan maan ISO-koodista
 * kylvetystä siemenestä, joten sama maa näyttää aina samalta eikä
 * kehys värise, kun kortti rakennetaan uudelleen. Savukkeet toistuvat
 * samoina ajosta toiseen.
 */

/* ===================== MITATUT SUHDELUVUT ========================== */

/** Väli paksun ja ohuen viivan välissä, osuutena PAKSUSTA viivasta. */
export const KASI_VALI = 0.71;
/** Ulomman ohuen viivan leveys, osuutena paksusta viivasta. */
export const KASI_OHUT = 0.26;
/** Keskilinjan heitto huipusta huippuun, osuutena paksusta viivasta. */
export const KASI_HORJUNTA = 0.32;
/** Horjunnan aallonpituus, kerrannaisena paksusta viivasta. */
export const KASI_AALLONPITUUS = 30;
/** Viivan leveyden vaihtelu pituussuunnassa (osuus leveydestä). */
export const KASI_LEVEYSHEITTO = 0.065;
/**
 * KAKSI VIIVAA VAELTAVAT YHDESSÄ, EI ERIKSEEN.
 *
 * Kaivertaja veti molemmat viivat samaa viivainta pitkin, joten VÄLI
 * pysyy: Stielerin arkilla välin keskihajonta on 0,73 px eli 3,4 %
 * välin leveydestä, vaikka kumpikin viiva vaeltaa moninkertaisesti sen
 * verran. Siksi ulompi viiva saa saman aallon kuin sisempi ja tämän
 * verran omaa — täysin itsenäiset aallot leventäisivät ja kaventaisivat
 * väliä ±45 %, mikä ei näytä kaiverrukselta vaan vahingolta.
 */
export const KASI_OMA_OSUUS = 0.25;

/* ===================== DETERMINISTINEN ARPA ======================== */

/**
 * FNV-1a 32-bittisenä: merkkijono (esim. maan ISO-koodi) → siemenluku.
 * Sama teksti antaa aina saman luvun myös eri selaimissa.
 */
export function kasiSiemen(teksti) {
  let h = 0x811c9dc5;
  const s = String(teksti ?? '');
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Mulberry32 — pieni, nopea ja täysin toistettava arpa. Palauttaa
 * funktion, joka antaa luvun välillä [0, 1).
 */
export function kasiArpa(siemen) {
  let a = (siemen >>> 0) || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * KÄDEN AALTO: kolmen harmonisen summa, jonka jaksoluvut ovat
 * KOKONAISLUKUJA. Siitä seuraa kaksi asiaa, jotka molemmat ovat
 * välttämättömiä:
 *
 *   1. Aalto on jaksollinen välillä t ∈ [0, 1], joten kehyksen kierros
 *      sulkeutuu tarkalleen — ei saumaa.
 *   2. Matalin jaksoluku antaa mitatun hitaan vaelluksen, kaksi
 *      korkeampaa sen päälle kaivertajan pikkuepätasaisuuden.
 *
 * Palauttaa funktion t → [-1, 1] (huiput noin ±1; amplitudi kerrotaan
 * kutsujan puolella). `jaksot` on matalimman harmonisen jaksoluku
 * koko matkalla — kutsuja laskee sen mitatusta aallonpituudesta.
 */
export function kasiAalto(siemen, jaksot = 3) {
  const arpa = kasiArpa(siemen);
  const n1 = Math.max(1, Math.round(jaksot));
  const osat = [
    { n: n1, a: 0.62, v: arpa() * Math.PI * 2 },
    { n: n1 * 2 + 1, a: 0.26, v: arpa() * Math.PI * 2 },
    { n: n1 * 5 + 2, a: 0.12, v: arpa() * Math.PI * 2 },
  ];
  return (t) => {
    let summa = 0;
    for (const o of osat) summa += o.a * Math.sin(o.n * 2 * Math.PI * t + o.v);
    return summa;
  };
}

/**
 * Kaiverretun viivan leveys: perusleveys ± mitattu heitto. Käytetään
 * kehyksen kunkin sivun omaan leveyteen — yksikään aikakauden kehyksen
 * neljästä sivusta ei ole täsmälleen saman paksuinen.
 */
export function kasiLeveys(perus, arpa, heitto = KASI_LEVEYSHEITTO) {
  return perus * (1 + (arpa() * 2 - 1) * heitto);
}

/* ===================== KEHYS (SVG) ================================= */

/**
 * Kaksoisviivakehys suorakaiteelle — maapaneelin kartussi.
 *
 * MUOTO ON MITATTU (ks. tiedoston alku): ULKONA OHUT, SISÄLLÄ PAKSU,
 * välissä 0,71 × paksu. Kehys piirretään NELJÄNÄ SIVUNA viivaa kohti
 * eikä yhtenä suorakaiteena, koska:
 *
 *   - jokainen sivu saa oman leveytensä (`kasiLeveys`) kuten
 *     kaiverruksessa, ja
 *   - horjunta vaimennetaan nollaan sivun päissä (sin-verho), jolloin
 *     NURKAT OSUVAT TARKALLEEN yhteen. Aikakauden kehyksissä nurkka on
 *     terävä jiiri; horjuva nurkka näyttäisi rikkinäiseltä, ei
 *     käsintehdyltä.
 *
 * Palauttaa SVG:n path-kuvaukset; kutsuja tekee elementit (näin tämä
 * moduuli ei tunne DOMia eikä sitä tarvitse testata selaimessa).
 *
 * @param {object} p
 * @param {number} p.leveys  kortin leveys px (SVG:n viewBox)
 * @param {number} p.korkeus kortin korkeus px
 * @param {number} p.paksu   sisemmän paksun viivan leveys px
 * @param {number|string} p.siemen  maan ISO-koodi tai valmis siemen
 * @returns {{ paksu: Array, ohut: Array }} kummallekin viivalle neljä
 *          { d, leveys } -sivua
 */
export function kasikehys({
  leveys, korkeus, paksu = 1.9, siemen = 'kehys',
}) {
  const s0 = typeof siemen === 'number' ? siemen : kasiSiemen(siemen);
  const vali = paksu * KASI_VALI;
  const ohut = paksu * KASI_OHUT;
  // Ulompi viiva kortin reunaan kiinni, paksu sen sisäpuolelle.
  const ohutSisennys = ohut / 2;
  const paksuSisennys = ohut + vali + paksu / 2;
  const tee = (sisennys, viivanLeveys, siemenlisa) => {
    const arpa = kasiArpa((s0 + siemenlisa) >>> 0);
    // Aallon amplitudi on aina PAKSUN viivan mitta, ja aallon siemen on
    // sivukohtainen mutta MOLEMMILLE VIIVOILLE SAMA: pari vaeltaa
    // yhdessä kuten viivaimella vedetty (ks. KASI_OMA_OSUUS).
    const x0 = sisennys; const y0 = sisennys;
    const x1 = leveys - sisennys; const y1 = korkeus - sisennys;
    const nurkat = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
    const sivut = [];
    for (let i = 0; i < 4; i += 1) {
      const [ax, ay] = nurkat[i];
      const [bx, by] = nurkat[i + 1];
      const pit = Math.hypot(bx - ax, by - ay);
      const aalto = kasiAalto((s0 + i * 7) >>> 0,
        Math.max(1, Math.round(pit / (paksu * KASI_AALLONPITUUS))));
      const oma = kasiAalto((s0 + siemenlisa * 31 + i * 7) >>> 0,
        Math.max(1, Math.round(pit / (paksu * KASI_AALLONPITUUS))));
      // Normaali sivun suuntaan nähden (kumpi puoli, ei väliä — heitto
      // on symmetrinen); amplitudi on mitattu osuus viivan leveydestä.
      const nx = -(by - ay) / (pit || 1);
      const ny = (bx - ax) / (pit || 1);
      const amp = (paksu * KASI_HORJUNTA) / 2;
      const askelia = Math.max(4, Math.round(pit / 6));
      const osat = [];
      for (let k = 0; k <= askelia; k += 1) {
        const u = k / askelia;
        // sin-verho: horjunta on nolla päissä → nurkat kohtaavat.
        const d = amp * (aalto(u) + KASI_OMA_OSUUS * oma(u)) * Math.sin(Math.PI * u);
        const px = ax + (bx - ax) * u + nx * d;
        const py = ay + (by - ay) * u + ny * d;
        osat.push(`${k === 0 ? 'M' : 'L'}${px.toFixed(2)} ${py.toFixed(2)}`);
      }
      sivut.push({ d: osat.join(' '), leveys: +kasiLeveys(viivanLeveys, arpa).toFixed(3) });
    }
    return sivut;
  };
  return {
    ohut: tee(ohutSisennys, ohut, 11),
    paksu: tee(paksuSisennys, paksu, 97),
  };
}
