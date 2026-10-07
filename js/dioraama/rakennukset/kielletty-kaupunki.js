// KIELLETTY KAUPUNKI (Peking), pilotti (Linnanrakentaja 7.10.2026; omistajan poikkeus VAIN EUROOPPA -linjaan Päätoimittajan
// kautta 7.10. klo 01.3x: oma dioraama ilman Cesiumia, aikakausi Qing 1873, rakennukset nykyisessä 1695 jälkeisessä asussaan).
// Pilotti: Taihedian (太和殿) kolmitasoisella jalustallaan, edustan aukio, Taihemen (太和门), Jinshui-joki ja viisi siltaa,
// 体仁阁/弘义阁, galleriat, portit ja kulmatornit. Kaikki näkyvä on leivotussa ulkokuoressa (blender.json; proseduraalinen
// Blender-malli, _valmiit/kielletty-kaupunki-v1/lahde/, lähteet ja lisenssit LAHTEET.md). Tila 'aukio' on vain rakennuskoneen
// vaatima paikkamerkki (1 m²:n laatta aukion alla), ei kohdistettava.
// Koordinaatit kuten Olavinlinnassa: x itä, y ylös, z etelä; origo Taihedianin kivijalan keskellä aukion tasolla.
// Kehityksessä: natiivin kehittäjätilassa `poikki peili https://media.matkakirja.app/dioraama/kielletty-kaupunki/<hash>/`
// (Siirtoseppä 7.10.: linssi avaa muuten aina Olavinlinnan; oma rakennus-id vaatii natiiviin juurimuutoksen).

const TILA_AUKIO = {
  id: 'aukio',
  nimi: 'Korkeimman harmonian aukio',
  kohdistettava: false,
  rajat: { min: [-125, -3, -32], max: [125, 40, 372] },
  hahmot: [],
  palikat: [
    { resepti: 'laatta', paikka: [0, -1.5, 120], suunta: 0, leveys: 1, syvyys: 1, paksuus: 0.1, pinnat: { yla: 'kivi', sivu: 'kivi', ala: 'kivi' } },
  ],
};

export const RAKENNUS = {
  id: 'kielletty-kaupunki',
  nimi: 'Kielletty kaupunki',
  otsikko: 'Kielletty kaupunki – Korkeimman harmonian sali',
  // Nimiruudun alarivi (natiivissa vielä kovakoodattu "Savonlinna · 1475"; Siirtoseppä lukee tämän junan 156 jälkeen).
  alarivi: 'Peking · 1873',
  versio: 1,
  lahteet: [
    { nimi: 'Palatsimuseo: Taihedian', osoite: 'https://www.dpm.org.cn/explore/building/236465.html' },
    { nimi: 'Palatsimuseo: Taihemen', osoite: 'https://www.dpm.org.cn/explore/building/236439.html' },
  ],
  geoAnkkuri: { lat: 39.9163, lon: 116.3907, suuntima: 0 },
  aikakerros: { id: 'q1873', nimi: 'Qing-dynastia 1873 (rakennukset nykyasussaan)' },
  // Valaistus: korkea kaakkoisaurinko (leivonta päivä 160°/42°, hämärä 250°/6°), kirkas taivas.
  valaistus: {
    aurinko: { atsimuutti: 160, korkeus: 42, vari: '#fff0dc', voima: 1.5 },
    taivas: { yla: '#9db4d0', ala: '#6b5a48', voima: 0.6 },
    sisalla: { aurinko: 1, taivas: 1 },
    sumu: null,
  },
  yleiskamera: {
    vaaka: { kohde: [0, 10, 70], atsimuutti: 170, korkeus: 22, etaisyys: 280, fov: 40, aukko: 0.3 },
    pysty: { kohde: [0, 8, 90], atsimuutti: 168, korkeus: 32, etaisyys: 430, fov: 44, aukko: 0.3 },
  },
  nimilaput: false,
  // Natiivi piirtää kuoren alle 4 km:n tason tälle korkeudelle (Olavinlinnassa järvi −7); −3 jää Jinshui-joen veden (−2)
  // alle, joten uoma ei peity, ja mallin reunojen ulkopuolella se näkyy matalana maana kuten pilotin esikatseluissa.
  ulkokuoriVesi: -3,
  // Lähidetalji (natiivin kuorivarjostin, maski blender/ulkokuori/hybridi): R rappausseinät, G lasitetut tiilikatot,
  // B harmaa tiilikiveys, A ei käytössä (sama kuin B, maskissa 0). Järjestys = _valmiit/.../hybridi/kanavat.txt.
  detaljiKanavat: ['kalkkirappaus', 'lasitettu-tiilikatto', 'harmaa-tiilikiveys', 'harmaa-tiilikiveys'],
  // Saapuminen etelästä Taihemenin yli (kuin kulkueen suunta).
  saapuminen: { alku: { atsimuutti: 180, etaisyys: 700, korkeus: 10 }, kesto: 6, lyhyt: 6 },
  tilat: [TILA_AUKIO],
};
