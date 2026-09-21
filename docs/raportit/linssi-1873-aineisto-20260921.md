# Vuosi 1873 -linssin raja-aineisto — selvitys (Karttaseppä 21.9.2026)

Tilaus (Fable, omistajan päätös 21.9.2026): pohjakartan nimiötasolle vain
pysyvät nimet; vuoden 1873 poliittiset nimet ja rajat siirtyvät tulevaan
Vuosi 1873 -linssiin (ja aikajanalinssiin). Tämä on selvitys, ei toteutus.

## 1. Mitä linssi tarvitsee

- Valtioiden (ja Saksan/Itävalta-Unkarin/Osmanien osavaltioiden) rajat
  tilanteessa 1873: Saksan keisarikunta 1871 (Elsass-Lothringen Saksalla),
  yhdistynyt Italia (Rooma 1870), Itävalta-Unkari 1867, Romania/Serbia
  Osmanien vasallit (itsenäisiä vasta 1878), Bulgaria ei olemassa, Bosnia
  Osmanien, Kypros Osmanien, Suomi Venäjän suuriruhtinaskunta, Norja
  unionissa Ruotsin kanssa, Alaska jo USA:lla (1867), Kanada 1867.
- Nimet: `js/packs/nimisto-1873.js`, rivit `aika: '1873'` (Sisältökirjuri).
- Aikajanalinssi tarvitsee saman rakenteen useana vuosileikkauksena.

## 2. Ehdokkaat

| Aineisto | Kattavuus | Lisenssi | Muoto, koko | Tarkkuus | Arvio |
|---|---|---|---|---|---|
| **historical-basemaps** (aourednik, GitHub) | koko maailma, vuosileikkaukset mm. 1800, 1815, **1878**, 1880, 1900, 1914 — ei 1873 | **GPL-3.0** (data ja koodi samalla) | GeoJSON; world_1878 1,7 Mt, 239 piirrettä, 36 274 pistettä; kentät NAME, SUBJECTO, PARTOF, BORDERPRECISION (1–3) | karkea: Ranskan ulkorenkaan janan mediaani 0,165° (18 km), p90 0,35°; "work in progress, verify" | **Paras vektorilähtökohta.** 1878-leikkaus on Berliinin kongressin JÄLKEEN → 1873:een n. 6 muutosta käsin (Romania, Serbia, Montenegro vasalleiksi/pienemmiksi, Bulgaria pois, Bosnia ja Kypros Osmaneille). GPL-3.0 on datalle epätavallinen: johdannaisen aineiston jakelu vaatii saman lisenssin — pelin oma johdettu rajatiedosto ämpärissä GPL:llä on mahdollista (peli itse ei muutu GPL:ksi, data on erillinen tiedosto), mutta Fable/omistaja päättää. |
| **CShapes 2.0** (ETH Zürich) | 1886–2019, Euroopan laajennus 1816– | CC BY-NC-SA 4.0 | GeoJSON/Shapefile/R | valtiotaso, ei osavaltioita | Ei 1873:a maailmanlaajuisesti (vain Eurooppa); **NC** estää kaupallisen käytön → ei sovi jos peli myydään. |
| **Euratlas Periodis** | Eurooppa, 1800 ja 1900 (sadan vuoden välein) | vektoridata kaupallinen (maksullinen lisenssi), verkkokartat vain katseluun | Shapefile | hyvä | Ei 1873-leikkausta, maksullinen → ei. |
| **OpenHistoricalMap (OHM)** | maailma, aikaliuku; 1800-luvun Euroopan rajat osittain | **CC0** (tavoite; ODbL:ää vältetty) | OSM-muoto (PBF/API), vektoritiilet | vaihtelee alueittain; parhaat alueet metritarkkoja, isot alueet puuttuvat | Lupaava lisenssiltään; kattavuus 1873:lle tarkistettava alueittain (Overpass-kysely `end_date`/`start_date`). Sopii paikkaukseen (esim. Elsass-Lothringenin raja tarkkana), ei koko maailman rungoksi. |
| **Wikimedia Commons, PD-atlasskannit** | Stieler's Hand-Atlas 1875 (Europa No. 15: 15 742 × 12 896 px, 38 Mt; Ost-Europa 6 lehteä), Spruner-Menke 1880, Andrees 1881 | **Public domain** | JPG-skannit, 1,5–40 Mt/lehti | painetun kartan tarkkuus, mutta projektio ja paperin vääristymä → georeferointi (4–8 kontrollipistettä/lehti) | **Paras rasterilähde** "vanhan atlaksen" linssiin ja rajojen käsitarkistukseen. Ei suoraan vektoriksi. |
| **MPIDR Population History GIS** | Eurooppa, hallintorajat 1800-luku | vain tieteelliseen käyttöön | Shapefile | hyvä | Lisenssi estää. |
| **GeoHistoricalData (Cassini/Ranska)** | Ranskan kunnat ja departementit 1800–2000 | ODbL | Shapefile | hyvä | Vain Ranska; ODbL:n share-alike koskee johdannaista tietokantaa. Voi paikata Ranskan 1873-departementit. |
| **A Vision of Britain** | UK:n kreivikunnat 1800-luvulla | CC BY-SA / käyttöehdot tapauskohtaisesti | Shapefile | hyvä | Vain UK. |
| Natural Earth (nykyinen rajasettimme `nykyiset`) | nykyrajat | PD | jo pelissä (72 815 pistettä) | tarkka | **Runko sille, mikä ei ole muuttunut**: ks. hybridi alla. |

## 3. Suositus: hybridivektori, rasteri vain "atlas"-tunnelmaan

1. **Runko: historical-basemaps world_1878 → world_1873** käsin korjattuna
   (n. 6 muutosta Balkanilla ja Kyproksella; Saksan ja Itävalta-Unkarin sisäiset
   osavaltiot ovat 1878-tiedostossa `PARTOF`-kentällä). Kirjataan omaksi
   tiedostoksi `assets/data/rajat-1873.json` samaan int16-delta-muotoon kuin
   pallon vektorisolut, lisenssi GPL-3.0 kirjattuna luetteloon — **omistajan
   lisenssipäätös tarvitaan** (vaihtoehto: piirtää rajat itse PD-atlasskannien
   päältä → omaa PD/CC-aineistoa, työtä arviolta 2–3 päivää Euroopalle).
2. **Tarkkuus nykyrajoista siellä, missä raja ei ole muuttunut**: jokainen
   1873-rajajana, joka kulkee alle 0,2° päässä Natural Earthin nykyrajasta,
   korvataan sillä (sama naulaus-/ompeluperiaate kuin GSHHG-kehässä,
   `tools/generoi-maapolygonit.mjs`). Esim. Ranska–Espanja, Ranska–Sveitsi,
   Ranska–Belgia, Portugali–Espanja, Tanska–Saksa (1920 asti eri! → jää
   historialliseksi) saavat 72 k pisteen tarkkuuden; vain muuttuneet rajat
   (Elsass-Lothringen, Italia–Itävalta, Balkan, Puola, Suomi–Venäjä) jäävät
   18 km:n karkeuteen — ne paikataan OHM:stä tai piirtämällä atlasskannin
   päältä (Elsass-Lothringen: n. 300 km, tunti työtä).
3. **Piirto linssissä: vektorikerros**, ei rasteri. Sama moottori kuin
   pallon vektoriviivat (js/pallovektorit.js, LineSegments2, laji `rajat`
   omalla värillä/katkoviivalla ja omalla solusarjalla
   `pallo/vektorit/<versio>/rajat-1873/`), tasokartalla SVG kuten kehä.
   Koko: 36 k pistettä ≈ 150 kt gz koko maailma → yksi solu riittää
   (ei 378 solua). Nimet nimistöstä (`aika: '1873'`) samalla ladonnalla kuin
   nimiötaso mutta elävänä (ei polttoa), jotta linssi voi vaihtaa vuotta.
   Rasteri (Stieler 1875 georeferoituna, Miller-projektioon kääntäen) on
   erillinen "atlaslehti"-linssi, jos omistaja sitä haluaa: 1 lehti = 38 Mt
   skanni → 4–8 Mt webp-pyramidi z3–z6 Euroopalle; työ 1 päivä/lehti.
4. **Aikajanalinssi**: sama rakenne vuosileikkauksina (1815, 1848, 1873,
   1878, 1900, 1914 historical-basemapsista; 1886→ CShapesista ei NC:n
   takia). Muutokset leikkausten välillä ovat pieniä, joten tiedosto/vuosi
   ≈ 150 kt; 6 leikkausta < 1 Mt.

## 4. Avoimet päätökset Fablelle/omistajalle

- GPL-3.0-datan käyttö (historical-basemaps) vai omaksi piirretty PD-runko.
- Tuleeko rasterinen atlaslehti-linssi (Stieler 1875) vai vain vektori.
- Aikajanan vuosileikkaukset.

Lähteet: github.com/aourednik/historical-basemaps (README, geojson/),
icr.ethz.ch/data/cshapes, wiki.openstreetmap.org/wiki/OpenHistoricalMap/FAQ,
commons.wikimedia.org (Stieler's Hand-Atlas 1875, Spruner-Menke 1880).
