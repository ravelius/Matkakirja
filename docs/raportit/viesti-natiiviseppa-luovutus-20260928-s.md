# Natiivisepän luovutus 28.9.2026 (s), klo 14.4x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, max, Macin käyttäjä koodaus). Syy: konteksti 70 % ennen v3f:n laitekuvausta. Edellinen: -r.md
(sen kohdat ovat voimassa, ellei tässä toisin sanota).

## Lue ensin

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2.
2. Tämä raportti ja aloituslennon raportti docs/raportit/aloituslento-v3-20260928.md (osiot v3e ja v3e2).
3. Muisti: natiiviseppa-tila-20260928-s, gpu-vaisto-kevyt-lippu (tools/gpu-vapaa.sh ennen simulaattoria), jaettu-kaannospalvelu-luokitin,
   natiiviseppa-oma-simulaattori (vain FBBD41D7).

## Tänään tehty

- **Aloituslento v3e** kuvattiin (käännös abcc1911). Silmä teki koukun ~270 km Ateenan eteläpuolelta, ja nousussa näkyi laattaraja.
- **v3e2** (proto natiiviseppa/aloitusrata **57bca5bb**):
  - Silmän sivumatka koneesta on enintään 110 km ja kapenee 15 km:iin 12,3–13,6 s (SivuEnintaanM).
  - Suunnan kääntö alkaa, kun A ≥ 0,30.
  - Nousussa ei ole karkeaa SSE:tä.
  - Saapuminen 12,6 s.
  - Kartta-testit 351/351, uusi testi SilmaKaartaaKohteenYlleIlmanKoukkua.
  - Kuvattu 13.25 (käännös 02bf1c9f). Video aloituslento-33/v3e2/aloituslento-v3e2.mp4, kuvaparit ja reittikuva samassa kansiossa.
  - Omistaja 13.4x: "OK, mergeen".
- **Jatkotestit** (varalaatta-uusinta-2 ja symbolit-erikoismalli/Kinderdijk) PASS v3e2-käännöksellä.
- **TF**:
  - BUILD 35 = proto master **13c82295** (juna 0cd85ecc: Pulun puhekeskustelu, xAI-koe, varalaatat, Kinderdijk). Fable ohitti sen.
  - **BUILD 36 = proto master b8bf6550** (juna/b13 877826ac): v3e2, Natiivi-UI:n erä (lukijan valikko, välkyntä, pelikello,
    Geysir) ja Pelikoodarin xAI-kanavan uudelleenkäynnistys a6edbd06. Julkaisija vie TF 1.0.36:n.
- **1.0.37-juna** (juna/b13 **8316cd10**): Linssisepän symbolit-lippu 6e5ccf55 ja iss-kyyti 411b0bc7 (omistajan OK 14.1x).
  Linssiseppä tuo vielä yhden rivin voimakkuuscommitin samaan haaraan; mergeä se, kun saat SHA:n.
  Junan taukolippu /tmp/matkakirja-juna-tauko oli päällä BUILD 36:een asti. Julkaisija poistaa sen.

## KÄRKI: v3f LAITEKUVAUS (natiiviseppa/aloitus-paivayo 2965ba2b)

**Sisältö** (c904d2c2 ja 2965ba2b, Kartta-testit 356/356, unity 0):
- Kartta/Paivanvalo.cs kirjoittaa _aurinko-arvon pelikellosta ja pitää yövalokerroksen rasteripaikassa, kun Pelikello.Valinnassa
  tai Pelikello.Lennossa on tosi. Perillä efekti häivytetään 1,2 s:ssa. Yövalojen voimakkuus on 2,0.
- Pelikello.Valinnassa: Natiivi-UI:n Pelikellonaytto kirjoittaa sen.
- Nappula pitää kellon odotuksesta perille: Tunnit = lähtö + LentoTunnit · AloituslennonRata.Kello(t).
- Esikääntö: Aloitusnakyma kirjaa valintanäkymän (Nappula.Valintanakyma). Jos pallo on pyöritetty pois, odotus kääntää kameran
  0,8–2 s valintanäkymään, ja rata alkaa siitä.
- Komennot: paivanvalo 0|1|auto|tila, paivanvalo voimakkuus x ja paivanvalo alku h. UI:n "ui pelikello alku" ei toimi
  komento.txt:n kautta.

**Laiteajo ce9c9b70 klo 14.30** (aloituslento-33/v3f/):
- Valinnassa yöpuoli, kello "01.00 / PÄIVÄ 1/80" ja "+6 h" näkyvät.
- Lennossa kello kiihtyy 01.01 → 07.01. Aamunkoitto tulee Thessaliaan 7,2–9 s (03.49 → 05.09), ja perillä on päivä. Häivytys
  ei tuota hyppyä.
- LÖYDÖS: kaupunkien valot jäivät himmeiksi pisteiksi (voimakkuus 0,85). Korjattu 2965ba2b:ssä (2,0), ei vielä todennettu.
- Esikääntö jäi testaamatta, koska kevyt tila alkoi 14.32 ja simulaattori sammutettiin.

**Käännös 2965ba2b** käynnistettiin 14.35 ILMAN asennusta (kevyt tila). .app kopioidaan kansioon
aloituslento-33/v3f2/Matkakirja3D.app. Jos kopiota ei ole, käännä uudelleen UDIDillä.

**Kuvaus laitevuorolla** (Julkaisija sanoo "laite NYT"; ensin tools/gpu-vapaa.sh = exit 0):
1. `xcrun simctl boot FBBD41D7-…; xcrun simctl install FBBD41D7-… aloituslento-33/v3f2/Matkakirja3D.app`, sitten
   `sessio-s/aloituslento-valmistele.sh aloituslento-33/v3f2`.
2. Uusi matka (201, 690) → 20 s → Valitse aloituskaupunki (201, 605) → 5 s.
3. `sessio-s/v3f-valinta-kuvat.sh aloituslento-33/v3f2 <konsoli> 1 3 22` ottaa valintanäkymän kuvat kolmella lähtökellonajalla.
4. `sessio-s/aloituslento-nauhoita.sh aloituslento-33/v3f2` taustalle → napauta Ateenaa (271, 326).
5. Esikääntö: käynnistä valmistele uudelleen → valinta → pyyhkäise (150, 550) → (300, 450) → käynnistä nauhoitus → napauta Tangeria
   (159, 212). Lokissa pitää näkyä "aloitusrata: esikääntö …".
6. F kehyseroista: sessio-s-skriptit, scratchpadin kehyserot.py-malli ja memory simulaattorivideo-igndts.
7. Kooste: `sessio-s/aloituslento-kooste.sh <kansio> <F> 1.0 17.8 aloituslento-v3f.mp4`, kaistana
   "NATIIVI v3f · aloitus-paivayo 2965ba2b · marssi A".
8. Päätoimittajalle ≤ 8 riviä: video, valintakuvat ja YKSI suositus lähtökellonajaksi.
   - Oma arvio: 01.00 (oletus). Aamunkoitto osuu ohitukseen ja perillä on täysi päivä, joten hyppyä ei tule.
   - Vaihtoehto 03.00: rajaviiva näkyy jo valinnassa idässä, mutta Ateena valaistuu jo ~4 s:ssa.
9. Omistajan OK:n jälkeen v3f junaan (juna-merge.sh natiiviseppa/aloitus-paivayo). Sitten v3g: muut aloituskaupungit.

## Avoimet ja huomiot

- **Omistajan päätös istunnossa odottaa:**
  - proto-kaanna.sh:n kuormaraja (lippu /tmp/matkakirja-kuormaraja: nice 15, xcodebuild -jobs 4 ja asennuksen
    1 simulaattori -odotus; vanha versio tyokalut/proto-kaanna.sh.ennen-kuormaraja-20260928).
  - NICE-OLETUS (#3527): renice ja kevyt tila proto-kaanna.sh:hon ja aja.sh:hon, ilman -b:tä.
  - Kuormaraja ei tunne kevyt-lippua (/tmp/matkakirja-kevyt; Julkaisijan havainto).
  - Lupaluokitin esti jaetun käännöspalvelun jatkotoimet sekä prosessien tappamisen, myös omien.
- **Vahdin tila:** käsin ajettu juna-ajo.sh kirjaa tilaksi sen kärjen, joka oli ajon alkaessa. Kesken ajon mergetyt commitit
  käännetään siksi vielä uudelleen.
- **Natiivi-UI:lle kerrottu:** kellopilleri peittää valinnassa Moskovan renkaan, ja ui-komennot eivät toimi komento.txt:n kautta.
- **Pelikoodarille kerrottu:** realtime-katkon juurisyy (AVAudioEngineConfigurationChange). Korjattu a6edbd06:ssa, joka on BUILD 36:ssa.
- **Raportit:** docs/raportit/aloituslento-v3-20260928.md (v3e- ja v3e2-osiot) ja tämä luovutus, haara selvittaja-3d-luovutus.
