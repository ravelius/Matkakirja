# Isoisän linssi 1873 — erä 1 (rajat ja nimet pallolla), KESKEYTETTY 21.9.2026

Tila: toimiva välivaihe haarassa `karttaseppa-isoisan-linssi`; keskeytetty
omistajan päätöksellä "KARTAN SULAVUUS ENSIN" (21.9.2026). Jatketaan, kun
Fable sanoo. Kaappaukset (ennen keskeytystä, nimien kokoluokat vanhalla
jaolla): docs/raportit/kaappaukset/isoisa-1873-20260921/.

## Mitä on tehty

- **Rajaviivasto 1873**: `tools/tee-rajat-1873.mjs` → `assets/data/rajat-1873.json`
  (167 kt, gz 59 kt, 185 ketjua, 10 386 pistettä) ja viivatason rajasetti
  `tools/fokuskartta/rajat-1873.json.gz` (setti '1873', ei vielä RAJASETIT-
  taulussa — lisätään kun poltto päätetään). Lähde historical-basemaps
  world_1878 (GPL-3.0; johdettu aineisto samalla lisenssillä, kirjattu
  tiedoston `lisenssi`-kenttään). Rajat = polygonien yhteiset särmät;
  1878 → 1873: Bulgaria ja Bosnia-Hertsegovina Osmanien valtakuntaan,
  Romania/Serbia/Montenegro/Egypti vasalliluokkaan 2 (katkoviiva).
  **Naulaus nykyrajoihin**: 47,8 % näytteistä alle 0,2° NE-nykyrajasta →
  korvattu tarkalla geometrialla (Ranska–Espanja, Pyreneet, Alpit,
  Portugali …); muuttuneet rajat (Elsass-Lothringen, Saksa–Venäjä,
  Balkan, Italia–Itävalta) aineiston 18 km:n tarkkuudella.
- **Tunnetut poikkeamat 1873:sta** (aineisto on 1878): Romanian Pohjois-
  Dobrudža ja Etelä-Bessarabia, Serbian Nišin alue, Montenegron
  laajennus — jäävät 1878-muotoon, kunnes piirretään käsin (ehdotus:
  Stieler 1875 Balkan-lehden päältä samalla georeferointikaavalla kuin
  atlaslehti-vedos). Kypros ei ole aineistossa erillisenä (Osmanien ✓).
- **Vektorikerros**: `js/pallovektorit.js` soluton laji `historia`
  (`asetaHistoriarajat({ avain, viivat })`), luokat 1 (yhtenäinen, muste
  #4a3320, 1,0–1,7 px) ja 2 (katkoviiva, ohuempi). Linssin ajaksi nykyiset
  ja käytyjen maiden rajat sammuvat jaetun materiaalin peitolla
  (`paivitaRajapeitto`), joten solulogiikka ei muutu. 22 540 janaa,
  rakennus < 50 ms.
- **Linssi** `js/linssit/isoisa-1873.js` (rekisteri, manner null, kerros
  true, tasokartalla ei piirrä): rajat vektorikerrokseen, nimet
  `linssit.merkit`-CSS2D-merkkeinä: valtiot `js/packs/valtiot-1873.js`
  (106 nimeä suomeksi 1873-muodossa, luokat 1/2/3, koko suuri/keski/pieni,
  generaattori `tools/tee-valtiot-1873.mjs`; 60 pientä afrikkalaista ja
  tyynenmeren yksikköä ilman suomennosta jätetty pois — lista ajon
  tulosteessa) ja nimistön maakunnat `aika='1873'` (28). Näkyvyys
  kameran korkeuden mukaan (laudan katto 0,205: suuri+keski aina, pieni
  ≤ 0,13, maakunta ≤ 0,15) ja ruututörmäys arvojärjestyksessä (suuri >
  keski > pieni > maakunta; heikompi piiloon, ei siirtoa). CSS
  `.pallolauta-isoisa-nimi` (atlasantiikva, harvennetut kapiteelit).
- sw.js, tests/sw.test.mjs (NIPUTTAMATTOMAT) päivitetty. Testit 3781 pass /
  3 fail (tools/arabia, punaiset myös pohjassa).

## Kesken / seuraavaksi (kun jatketaan)

1. Kaappaukset uudelleen uusilla kokoluokilla (keski > 3,5°²: Sveitsi,
   Belgia, Serbia, Kreikka näkyvät uloimmalla zoomilla) ja laattojen
   latauksen odotus ennen kuvaa.
2. Sisältökirjurin tarkistus valtioiden nimille (js/packs/valtiot-1873.js);
   Fablen pistokoe kaanonia vasten.
3. Pelin merkit (nostoympyrät, kohteet) linssin ajaksi piiloon vai ei —
   Fablen päätös (topografia piilottaa; tässä peli jatkuu).
4. Erä 2: Horation reitti katkoviivana, seepiakalvo, selitekortti.
5. Poltto (viivataso ilman nykyrajoja tai 1873-rajoilla) vasta vedoksen
   jälkeen; rajasetti on valmis polttoon.
