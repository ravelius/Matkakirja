## 2026-10-09 — SISÄLTÖKIRJURI → CODEX: OLAVINLINNAN KUOREN SEINÄ 1, PILOTTI (1 kuva; uudelleenmaalaus vuoden 1499 asuun)

Pelin oma Olavinlinna-malli (kuori, fotogrammetriapohjainen) on suttuinen. Seinä 1 (porttikäytävän ja Linnantuvan väli, laiturin takamuuri; länteen katsova, 250,9 m² kohdealue, 160 px/m) on pahin. **Pilotti: vain tämä yksi kuva.** Päätoimittaja on antanut luvan; **generointilupa 1 kuva** (ei lisävariantteja). Muut seinät (2–5) tilataan vasta, kun Linnanrakentaja (LR) on kohdistanut pilotin.

**Tehtävä:** maalaa nykyinen fotogrammetriapinta **uudelleen terävänä vuoden 1499 asuun, vain magentan rajaaman kohdealueen sisälle** (`maski_kohde`: valkoinen = kohde). Kehys pysyy **pikselilleen samana**. Kuva projisoidaan takaisin 3D-malliin, joten kohdistus on tärkein.

### Liitteet (`posti/liitteet/olavinlinna-s1/`)
- **`olavinlinna_s1_ohje.jpg`** (3697 × 3411): ohjekuva. Magenta rajaus = uusittava alue; mittakaava 1 m = 160 px; korot ja mitat. Magenta rajaus ja merkinnät ovat vain ohje: **älä piirrä niitä tuloskuvaan.**
- **`olavinlinna_s1_nykyinen.jpg`** (3697 × 3411): nykyinen fotogrammetriapinta samassa kehyksessä (suttuinen; siinä on auringon luomia varjoja ja myöhempiä lisäyksiä, joita ei toisteta).
- **`olavinlinna_s1_maski_kohde.png`**: kohdemaski (255 = uusittava alue, 0 = ympäristö, joka jää ennalleen).
- `olavinlinna_s1_mitat.json`: kehys, korot, mitat.
- **Ei Googlen kuvia eikä Googlen 3D-laattoja.** Nykyinen kuva on pelin oma Olavinlinna-fotogrammetria (oma aineisto), ei Googlen.

### Ehdot
1. **Kehys pikselilleen sama** kuin `nykyinen`: sama kuvasuhde ja koko (vähintään 3697 × 3411 px; täsmälleen sama tai tarkka kokonaiskerroin), ei rajausta, zoomausta, kiertoa eikä perspektiiviä. **Kohdemaskin ulkopuolinen alue jätetään täsmälleen ennalleen** (kopioi nykyisestä); uusi maalaus vain maskin sisäpuolelle, reunat saumattomasti sulautettuna ympäristöön (sama kivijako ja sävy rajalla).
2. **Vuoden 1499 asu** (kartassa eletään nykyajassa, mutta Olavinlinna ympäristöineen esitetään 1499/n. 1500-asussa): keskiaikainen linnamuuri: **karkea harmaa ja punertava luonnonkivi (rapakivigraniitti, rosoiset lohkareet), kalkkilaastisaumat; tiilikehykset holveissa ja aukoissa; ei rappausta, ei maalattua pintaa, ei keltaista tai muuta nykyväriä; ei 1700-luvun tai myöhempiä ikkunoita.** Ikkunat ja aukot pidetään **nykyisillä paikoillaan** ja tehdään pieninä, syvinä keskiaikaisina aukkoina (kapeat ampuma- ja valoaukot, pienet kaarisyvennykset); uusia aukkoja ei keksitä. Älä kuvaa nykyaikaisia lisäyksiä (sähkö, putket, lamput, nykyiset kuistit ja kaiteet).
3. **Valo:** tasainen pilvipouta, **ei luotuja varjoja eikä aurinkoa** (nykyisen kuvan varjoja ei toisteta); syvennykset saavat tummua luonnollisesti.
4. **Ei toistuvaa kuviota:** jokainen kivi ainutkertainen, ei kopioliitettyjä alueita; kivikoot ja sävyt vaihtelevat kuten oikeassa kivimuurissa. Sammal ja pieni sääjälki (kuiva, ei vettä) sallittu hillitysti.
5. **Sisältö:** pelkkä seinä. Ei ihmisiä, ajoneuvoja, telineitä, kylttejä, lippuja eikä taivasta. Ei tekstiä, ruudukkoa, merkintöjä, vesileimaa eikä "havainnekuva"-merkintää kuvassa; merkintä kulkee tiedostonimessä ja metatiedossa ("Havainnekuva. Tekoälyllä tuotettu, ei valokuva.").
6. **Tarkkuus:** terävä, vähintään nykyisen tarkkuuden (160 px/m kohdealueella): kiven tekstuuri ja saumat selvästi luettavissa.

### Toimitus
- R2 `julisteet/omat-mallit-pinnat/20261009/olavinlinna_s1_codex_v1.png` (PNG, sRGB; tarkista julkinen URL `?t=`-parametrilla ennen latausta; älä ylikirjoita). Manifesti `posti/kuvatoimitus-olavinlinna-s1-pilotti-20261009.json` (url, sha256, mitat, generationPrompt) ja kuittaus `posti/codex-fable-olavinlinna-s1-pilotti-20261009.md`.
- **QA:ssa erikseen:** (1) kohdemaskin ulkopuolisen alueen poikkeama nykyiseen (pitää olla 0), (2) aukkojen paikkapoikkeama nykyisestä (% kuvan leveydestä), (3) saumattomuus maskin reunoilla, (4) ei rappausta/nykyväriä/varjoja/tekstiä/ihmisiä, (5) toisto.
- Ei main-mergeä, versionnostoa, pelikytkentää eikä julkaisua Codexilta. LR kohdistaa ja projisoi kuvan; hyväksyntä- ja kohdistusrajat LR:ltä.
