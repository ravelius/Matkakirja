/*
 * PYRAMIDIN LUETTELON YHDISTÄMINEN — yksi funktio, oma tiedostonsa.
 *
 * `pyramidi.json` ei synny yhdestä ajosta. Pohja poltetaan erissä
 * (uloimmat tasot koko maailmasta, sisimmät alueittain parven kesken),
 * nosto-, viiva- ja rantataso omina ajoinaan ja jokainen väritasomaa
 * omanaan. Jokainen ajo tuntee vain oman osansa, ja luettelo on silti
 * yksi tiedosto — siksi UUSI LUETTELO TÄYDENTÄÄ VANHAN eikä korvaa
 * sitä (generoi-laattapyramidi.mjs, "LUETTELO TÄYDENTYY").
 *
 * === MIKSI TÄMÄ ON OMA MODUULINSA ==================================
 *
 * Yhdistämissääntö on se kohta, jossa KOKO LAATTAKERROS VOI SAMMUA.
 * js/pallolaatat.js `lepokerroksenKerrokset` vaatii, että pallon sarja
 * (laatat.json) ja pyramidi (pyramidi.json) ovat samaa versiota; jos
 * väriajo vaihtaa pohjan version, kartta muuttuu sumeaksi Mercator-
 * sarjaksi eikä mikään kerro miksi. Actions-ajo 34767567776 (FRA
 * tasoitus, 13.9.2026) pysähtyi juuri tähän: generointi onnistui, mutta
 * luettelon `versio`, `viivataso.versio` ja `nostotaso.versio` olivat
 * vaihtuneet ajopäivän päiväykseksi, koska väriajon oma luettelo
 * kirjoitti ne kentät pohjan päälle.
 *
 * Kun sääntö on funktiona eikä generaattorin lopun suoraviivaisena
 * koodina, se voidaan todentaa yksikkötestillä ilman selainta,
 * aineistoa ja tuntien polttoa (tests/varitaso-luettelo.test.mjs).
 */

/**
 * Yhdistä tämän ajon luettelo ämpäristä pohjustettuun vanhaan.
 *
 * @param {object} uusi   Tämän ajon luettelo (teeLuettelo()).
 * @param {object|null} vanha  Ajokansiossa ollut pohjaluettelo tai null.
 * @param {object} ehdot  { merkkitaso, varitaso, era }.
 * @returns {object} Luettelo, joka kirjoitetaan levylle.
 */
export function yhdistaLuettelo(uusi, vanha, ehdot = {}) {
  const { merkkitaso = false, varitaso = false, era = null } = ehdot;
  /*
   * ERI LAATTAKOKO TAI -MUOTO EI OLE SAMA PYRAMIDI. Silloin vanha
   * luettelo ei kuvaa näitä laattoja lainkaan, ja tuore kirjoitetaan
   * päälle — kuten ennenkin.
   */
  if (!vanha || vanha.laatta !== uusi.laatta || vanha.muoto !== uusi.muoto) return uusi;

  const eraKirjaus = era ?? {};

  /*
   * VÄRIAJO SAA MUUTTAA VAIN `varitasot`-TAULUA (ja eräkirjanpitoa).
   *
   * Tämä on ajon 34767567776 korjaus ja versioportin ehto luettuna
   * kirjoituspuolelta: väriajo ei polta yhtään pohja-, nosto-, viiva-
   * tai rantalaattaa, joten sillä ei ole mitään sanottavaa niiden
   * versioista. Aiemmin `nostotaso`- ja `viivataso`-oliot syntyivät
   * väriajossakin (ne rakentuvat pelkästä geometriasta) ja veivät
   * mukanaan ajopäivän version, ja juuritason `versio` tuli
   * `--versio`-valitsimen oletuksesta eli tämän päivän päiväyksestä.
   * Pohja on tässä ainoa totuus: kaikki muut kentät kopioituvat
   * vanhasta sellaisinaan, eikä uusi kenttä generaattorissa voi
   * vahingossa vuotaa väriajoon.
   */
  if (varitaso) {
    return {
      ...vanha,
      varitasot: { ...(vanha.varitasot ?? {}), ...(uusi.varitasot ?? {}) },
      // `...vanha` kantaa `nostotasot`-taulun eteenpäin: väriajo ei
      // polta yhtään nostolaattaa eikä sillä ole siitä sanottavaa.
      erat: [...(vanha.erat ?? []), eraKirjaus],
    };
  }

  const luettelo = { ...uusi };
  /*
   * MERKKITASOAJO EI KOSKE POHJAN TASOIHIN: se ei piirtänyt yhtään
   * pohjalaattaa, joten vanhan luettelon tasot (mahdollisine
   * laatastoineen) jäävät sellaisinaan. Vain oma taso-olio ja
   * eräkirjanpito päivittyvät.
   */
  if (merkkitaso && vanha.tasot?.length) {
    luettelo.tasot = vanha.tasot;
  } else {
    const omat = new Set(luettelo.tasot.map((t) => t.z));
    luettelo.tasot = [...(vanha.tasot ?? []).filter((t) => !omat.has(t.z)), ...luettelo.tasot]
      .sort((a, b) => a.z - b.z);
  }
  luettelo.erat = [...(vanha.erat ?? []), eraKirjaus];
  // Osa-ajo matalilla tasoilla (koeajo z0–z3) ei saa pyyhkiä
  // olemassa olevaa nostotasoa pois luettelosta.
  luettelo.nostotaso = luettelo.nostotaso ?? vanha.nostotaso ?? null;
  luettelo.viivataso = luettelo.viivataso ?? vanha.viivataso ?? null;
  luettelo.rantataso = luettelo.rantataso ?? vanha.rantataso ?? null;
  /*
   * VÄRITASOT YHDISTETÄÄN MAITTAIN eikä korvata: yhden maan ajo
   * tuntee vain oman avaimensa, ja ilman yhdistämistä Kreikan ajo
   * pyyhkisi Ranskan laatastot luettelosta (ne jäisivät ämpäriin
   * mutta peli ei löytäisi niitä).
   */
  luettelo.varitasot = (luettelo.varitasot || vanha.varitasot)
    ? { ...(vanha.varitasot ?? {}), ...(luettelo.varitasot ?? {}) } : null;
  /*
   * NOSTOTASOT YHDISTETÄÄN MAITTAIN, TÄSMÄLLEEN SAMASTA SYYSTÄ
   * (18.9.2026, Raamattu PAATOKSET 34 kohta 17 d). Nostotaso ajetaan
   * maa kerrallaan (`--nostotaso --nostomaa <ISO>`), ja ilman
   * yhdistämistä jokainen ajo pyyhkisi edellisen maan laataston
   * luettelosta. Ämpärissä laatat olisivat tallella, mutta peli ei
   * osaisi pyytää niitä — juuri se vika, joka väritasolla mitattiin
   * 13.9.2026.
   */
  luettelo.nostotasot = (luettelo.nostotasot || vanha.nostotasot)
    ? { ...(vanha.nostotasot ?? {}), ...(luettelo.nostotasot ?? {}) } : null;
  /*
   * MERISÄVY JA PYRAMIDIN ALA OVAT POHJA-AJON TIETOJA. Merkkitaso
   * ei karsi umpimerta eikä piirrä pohjaa, joten sen oma arvo on
   * aina null — ja null tarkoittaisi pelille, ettei puuttuvan
   * pohjalaatan tilalle maalata mitään (js/laattapyramidi.js
   * pyramidiPohja). Vanha arvo kannetaan siis eteenpäin.
   */
  if (merkkitaso) {
    luettelo.meriSavy = vanha.meriSavy ?? null;
    luettelo.alue = vanha.alue ?? null;
    /*
     * POHJAN RANTAVIIVA on POHJA-AJON tieto: vain se tietää, millä
     * lipulla laatat piirrettiin. Merkkitasojen ajot kantavat vanhan
     * kentän eteenpäin muuttumatta; pohja-ajo kirjoittaa sen aina
     * itse (myös pois, jos rantaviiva on taas mukana).
     */
    luettelo.pohja = vanha.pohja ?? luettelo.pohja;
  }
  /*
   * KORKEUSTARKKUUS TÄYDENTYY TASOITTAIN, kuten `tasot`. z7-shardi
   * ei tunne z0–z6:n tarkkuutta eikä päinvastoin, ja nostotaso- tai
   * viivatasoajo ei tunne kummankaan — se ei lue ruudukkoa
   * lainkaan, joten se kantaa vanhan kentän eteenpäin muuttumatta.
   */
  if (luettelo.korkeus && vanha.korkeus) {
    luettelo.korkeus = {
      ...luettelo.korkeus,
      kaariminuutit: { ...vanha.korkeus.kaariminuutit, ...luettelo.korkeus.kaariminuutit },
    };
  } else if (!luettelo.korkeus) {
    luettelo.korkeus = vanha.korkeus;
  }
  return luettelo;
}
