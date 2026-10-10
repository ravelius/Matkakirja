# Linnanrakentajan luovutus 10.10.2026 iltayö (21.5x, täydennetty 22.1x nollauksessa 50 %)

Edellinen: `viesti-linnanrakentaja-luovutus-20261010-myohailta.md`. Haara `linnanrakentaja-tyo-20260929`. Ei taustaajoja, ei worktreetä.
Python-kuvatyökalut: `/Users/Shared/Claude/proto-3d/_tyo/venv-rembg/bin/python -I`.

## Valmiit tällä jaksolla (20.1x–21.5x)
- **Olavinlinna v47c** (muuriportaan pään tila 1,79 → 2,23 m: `kavely.py` muuriporras-sisaan kork 2,95; rantakivien hämäräkuva
  `olavinlinna-rantakivet-v1/lahde/rantakivet_hamara.py` → `ymparisto.mallit[].kuva_hamara(_astc)`) ja **v47d** (= v47c + ulkokuoren
  vedenalaiset vaakakolmiot pois: `olavinlinna-kavely-v1/lahde/tyokalut-lr/kuori_vedenalaiset_pois.py`, vanhat `ulkokuori/ennen-laituri-v47d/`
  molemmissa lähteissä). Vientihaarat v45i (v47c) ja v45j (v47d), pohja v45h-ketju (EI main).
  **v47d: 1499 PALA 8f0bba9b0f80d3fd (blender 2ef146898be5a833), NYKY 0df8a41e9b4ecec4 (blender 5cdaf160dea2139d)** → Siirtoseppä + PT.
  Main-PR ravelius/Matkakirja#4366 (rakenna.mjs + vie-blender.sh: mallien hämäräkuva) — Julkaisija mergeää vihreänä.
  Siirtoseppä 21.4x: muita pelaamista estäviä mallivikoja ei ole. Vapaaehtoinen: veneen vesimaskilaatta (natiivi käyttää leimana, toimii).
- **Peking v5** (kulta_katto R × 0,88 / G × 0,85; LOD-harvennus ryhmittäin `rakenna.py harvenna/HARV`) → LS2 paketoi peking5. **PEKING TAUOLLA**
  (omistaja 20.5x), osoitin ennallaan. Peruttu v6-lista (pihat × 0,8, katot −10 %) on PT:n viestissä 20.4x, jos tauko päättyy.
- **ND v5f** (omistaja 20.5x: liian vaalea ylhäältä ja takaa) → LS2:n pariin (oikea | v5d | v5f, ylhäältä + kaakosta). Sisältää v5e:n
  (portaalien kaaret terävämmät `kuva_lansi_kohdista_v5e.py` RENGAS_VOIMA=0.6; tornien tukipilarien sivujuovat `julkisivu.sivut`).
  Katot/ulokkeet/takaosa/maa albedon mukaan (`kalibrointi_v5f.json`, `maa_v9d.jpg`, `julkisivu.taka`). Kaikki portit läpi. LAHTEET "v5e", "v5f".
  PT katsoo erityisesti, erottuuko tummennettu parvis saumana ympäröivästä maasta.
- **Louvre/prefektuuri**: ei uudelleenajoa (prefektuurin korjattu atlas identtinen, Louvrella ei projisoi-ajoa). PT kuittasi.

## PARIISIN SUMENNETUT KORTTELIT (PT 22.0x, aloitettu 21.6x) — v1 VALMIS, EI VIELÄ LS2:LLE
- Kansio `/Users/Shared/Claude/proto-3d/_valmiit/pariisi-korttelit-v1/` (LAHTEET.md: menetelmä, lähteet, koot). Aineisto Karttaseppä
  `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/sumennukset-pariisi-20261010/` (LUEMINUT.md).
- Alueet: palais-bourbon, banque-de-france, quai-branly (Élysée pois: sumennusta ei varmistettu pelissä). glb/<alue>_lod{0,1,2}.glb,
  `<alue>-leikkaus_latlon.json` (useita renkaita), extras origo_latlon / origo_ellipsoidi_m / leikkaus_latlon.
- Ajo: `venv-rembg/bin/python -I lahde/valinta.py <alue>` → `lahde/pinnat.py <alueet>` → Blender `lahde/korttelit_malli.py -- <alue>`.
  Tarkistusarkki docs/raportit/kaappaukset/linnanrakentaja-pariisi-20261010/korttelit-v1-arkki.jpg (rivit: Bourbon, Banque, Alma).
- SEURAAVAKSI: (1) viesti LS2:lle (paketointi + pelikuva Concorden/Louvren/Eiffelin pysähdyksistä, leikkauksen saumat) ja PT:lle;
  (2) parannukset palautteen mukaan: Palais Bourbonin pohjoispylväikkö, julkisivujen vaihtelu (ikkunarytmi on tasainen), LOD1/2 kevennys.

## SEURAAVAKSI
1) LS2:n ND v5f -pari → PT → omistaja → säädöt (mahdollinen parvisauma: maa_v9d vs ympäröivä maa).
2) Pariisin korttelit LS2:lle (yllä).
3) Tiedoksi: Karttasepän Pekingin albedo `_tyo/karttaseppa/vertailu/peking/albedo-luokat.json` (Peking tauolla).
