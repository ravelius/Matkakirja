/*
 * BERNN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri 15.10.2026, juna 193:
 * pääkaupunki laudan pysäkiksi, PT:n erä b, 3 kaupunkia).
 *
 * Sama muoto kuin js/packs/fokusvirta-luxemburg.js: matkakirja ja pulun
 * kupla. EI vielä kohtaamista eikä kohtamispistettä (laudan paikka tulee
 * Karttaseppä:ltä, kohtaaminen omana eränään) eikä luentaa/ääntä
 * (Äänittäjä). Rekisteröinti js/packs/fokusvirrat.js + KEVYET_FOKUSVIRRAT
 * on Pelikoodarin kytkentä. Lähteet ja huomiot:
 * proto-3d/_tyo/sisaltokirjuri/pysakit-193b/tulos-*.json.
 */
export const FOKUSVIRTA_BERN = {
  kaupunki: 'bern',

  matkakirja: {
    paikkarivi: 'Bern, syyskuussa 1873. Liittokaupunki, joka ei suostu olemaan '
          + 'pääkaupunki.',
    teksti: 'Bern, syyskuussa 1873. Kysyn, missä on Sveitsin pääkaupunki, '
          + 'ja saan korjauksen: Bern on Bundesstadt, liittokaupunki, sillä '
          + 'sveitsiläiset eivät halunneet yhtä ylivoimaista pääkaupunkia. '
          + 'Hallitus ja parlamentti istuvat saman katon alla '
          + 'Bundes-Rathausissa, joka valmistui kuusitoista vuotta sitten. '
          + 'Kuljen holvikäytävissä kuivin jaloin, ja tuomiokirkon torni on '
          + 'yhä vailla huippuaan.',
  },

  pollo: {
    kommentti: [
      'Isoisäsi näki palatsista vain länsisiiven. Kupolilla '
          + 'varustettu parlamenttirakennus valmistui vasta 1902.',
      'Tuomiokirkon torni valmistui 1893, ja nykyään sen '
          + 'näköalatasanteelle voi kiivetä. Isoisäsi katseli sitä '
          + 'keskeneräisenä.',
    ],
    tunne: { tunne: 'miettiva', voimakkuus: 0.4 },
    kuva: {
      tiedosto: 'Bern, Federal Palace, 1857.jpg',
      lyhyt: 'Ensimmäinen liittopalatsi valmistui 1857 kaupungin '
          + 'kustannuksella.',
      selite: 'Bundes-Rathaus, nykyinen Bundeshaus West, rakennettiin '
          + '1852–1857 Jakob Friedrich Studerin suunnitelmin. Isoisän '
          + 'matkavuonna 1873 se oli liittopalatsin ainoa siipi.',
      lahde: 'Carl Durheim, Commons (PD)',
    },
  },
};
