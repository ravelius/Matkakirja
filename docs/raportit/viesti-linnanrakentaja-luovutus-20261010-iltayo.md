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

## JATKO 22.1x–22.3x (nollauksen jälkeen)
- v1 lähetetty LS2:lle ja PT:lle 22.1x. Samalla jaksolla tehtiin **v2** (`_valmiit/pariisi-korttelit-v2/`, v1 koskematon), joka korvaa v1:n
  (LS2 ja PT tietävät): kolme julkisivua a/b/c (`pinnat.py julkisivu()`; nimetyt rakennukset c, muut a/b crc32(osm):n mukaan, rytmin
  alku siirtyy) ja Palais Bourbonin pohjoisportikko (`lahde/palais-bourbon/portikko.json`; `korttelit_malli.py portikko()`; pinnat.py
  jättää alueen pois porrastuksesta; maa_z painaa maan portaiden alle). Arkki `esikatselu/korttelit-v2-arkki.jpg`.
- Kuvaskriptit (scratchpad, emissio): lahikuvat.py (6 suuntaa), portikko_kuva.py (Concorden suunta), arkki.py.
- SEURAAVAKSI: LS2:n parit (ND v5f, Pariisi v2) → säädöt. Mahdollinen v3: LOD1/2-kevennys, tympanonin sävy, Banquen julkisivut (nyt lähes kaikki c).

## JATKO 22.3x–22.6x (PT 22.1x jono: museo → Olavinlinna → vertailu; PT 22.3x: Olavinlinnan laiturikivet ensin)
- **OLAVINLINNA v47e** (PT hyväksyi Blender-parin 22.5x; Siirtoseppä tekee pelikuvaparit laiturilta ja portilta ennen kuittausta):
  (1) rantakivet v2 `_valmiit/olavinlinna-rantakivet-v2/` (LAHTEET; pari docs/raportit/kaappaukset/linnanrakentaja-olavinlinna-20261010/
  rantakivet-v2-pari.jpg), asennettu molempien pakettien ymparisto/mallit/ (vanhat ennen-v47e/); (2) porttiaukon kivikasa = ranta-1499-täyttö
  (Siirtosepän l1/l2), tasoitettu `olavinlinna-kavely-v1/lahde/ranta1499_portti.py` (lähtö ranta1499_ennen_portti.json), kavely.py →
  v47e-tyo/ → v44/kavely (vanhat kavely/ennen-portti-v47e/), leivo_ranta_v25.zsh. Vienti: worktree wt/linnanrakentaja-linna-v45k (pohja v45j),
  skripti scratchpad vie_v47e.zsh (setsid), PALA-tunnukset lokissa → Siirtosepälle + PT:lle.
- **MUSEO v2g** `_valmiit/taidemuseo-alankomaat-v2g/` (LAHTEET "v2g"): 11 tyhjää seinää täytetty (LS2 22.2x), jalustat profiloitu +
  kivi_hiekka.jpg (taidemuseo-runko/lahde/sali_blender.py, vanha sali_blender_v2f.py). Tuotanto aja_tuotanto.zsh → LS2:lle kun valmis.
  LS2:n täysi läpipeluulista tulee junan 180 käännösvuoron jälkeen.
- **Kesken jonossa:** vertailuportti Olavinlinnan nykyasusta (VHR 2 m, kaytto vain sisäinen; malli ilman georeferenssiä glb:ssä →
  sijoitus selvitettävä, olavinlinna-blender-v44-nyky ei sisällä rakennus-sijoitettu.json:ia), raportti PT:lle.
- (23.1x) **v47e VIETY:** 1499 PALA b2fc8fe8b05a9e4f (blender 86fd4cb2ba69c81d), NYKY PALA 467a1fde69984be3 (blender e4f28ed81b9f0fc6),
  haara linnanrakentaja-linna-v45k (9b52e90a5, 266d94941) → Siirtoseppä + PT (pelikuvaparit laiturilta ja portilta odottavat).
- (23.0x) Vertailuportti Olavinlinna nyky tehty ja raportoitu PT:lle (json kaappaukset/linnanrakentaja-olavinlinna-20261010/); vertaa_orto.py:n
  --origo + --meta -siirtovirhe korjattu (vanha vertaa_orto_ennen_origo.py). Levysiivous 7,6 Gi (codex-ohje-v46t → T7 symlinkillä).
- ODOTTAA: Siirtosepän v47e-pelikuvat, LS2:n museo v2g -pelikuva + täysi läpipeluulista (junan 180 jälkeen), LS2:n Pariisi v2 ja ND v5f -parit.
- (23.4x) **v47e HYLÄTTY** Siirtosepän pelikuvissa (laiturin oikealle paljastui natiivin suorareunainen vesilaatta, kun jalusta 0,8 ×; portin
  −6,0-tasanne päättyi metrin jyrkänteeseen). **v47f VIETY (00.2x):** 1499 PALA b257fdf63e18f222 (blender d9e8157ba18d3b20), NYKY PALA
  695db038346095af (blender e1c6c2cd18dee278), v45k b9aacdf04 / ca0821cf6. Rantakivet v2b (jalusta täysleveä, 4–7 lohkopintaa; v2a tallessa
  glb-v2a/), portti loiva rantakallio (ranta1499_portti.py v47f; v47e-json ranta1499_v47e.json). Siirtosepän pelikuvapari odottaa.
- (00.4x 11.10.) **ND v5g** (PT 23.5x: v5f ylikorjasi, LS2 IGN-mittaus aukio −28 %, katto −22 %): notre-dame-v1/tekoaly-v5g/ (LAHTEET "v5g",
  kalibrointi_v5g.json, aja_tekseli_v5g.zsh). Katto v5d × 0,93, maa v5d:n maa_v9c, kalkkikivi 135/128/116. ktx2/reuna/kiviportti LÄPI,
  ortoportti hylkää katot −19 % (tunnettu harha) → LS2 mittaa pelissä samalla maskilla → PT.
