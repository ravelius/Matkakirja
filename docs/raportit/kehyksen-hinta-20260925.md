# Kehyksen hinta levossa: iPad Pro 13 (25.9.2026, Natiivisepän apuagentti)

Fablen erä KEHYKSEN HINTA LEVOSSA. Tässä erässä profiloitiin ja raportoitiin, korjauksia ei tehty. Kaikki luvut ovat
ennen muutoksia. Korjausehdotukset ovat lopussa, ja jokaisesta on arvioitu säästö ja kuvaparin tarve.

## Tiivistelmä

- Staattinen kehys on **GPU-sidonnainen**. Täydellä piirrolla kehysväli on 66,7 ms eli 15 fps. GPU on varattuna 97–98 % ajasta
  (Metal System Trace), pääsäie tekee työtä 7 ms kehyksessä, ja piirtosäie odottaa GPU:ta 50 ms kehyksessä.
- **70 % GPU-ajasta menee aloitusportin piilotettuun kerrokseen.** Etusivulennon (löydös 112) UI Toolkit -paneelissa on
  blur(6 pt)- ja opacity-suotimet, ja ne piirtyvät joka kehys, vaikka kerros on portin jälkeen `display: none`. Neljä koko
  ruudun sumennuspassia vievät yhteensä 46–50 ms kehyksessä.
- Kun suotimet poistetaan, kehys putoaa 66,7 ms:sta 16,9 ms:iin (60 fps). GPU-aika on silloin 18,6 ms, kun GPU ei ole
  kyllästynyt (30 fps:n katto). Development- ja Release-käännös antavat saman tuloksen.
- Seuraavaksi kallein on pallon laattojen varjostus, 14,3 ms. Siitä alpha-testi vie 4,5 ms, ja kuva pysyy pikselilleen
  samana, kun testi poistetaan. Matkakirjan lisäykset tileset-varjostimeen vievät 2,5–2,7 ms, ja niissä on 432 tavun
  rekisterivuoto.
- **Tavoite ≤ 16 ms iPadilla saavutetaan kahdella korjauksella** (suotimet ja alpha-testi): mitattu GPU-aika on 14,1 ms
  sekä Development- että Release-käännöksellä. **iPhonen tavoite ≤ 20 ms** saavutetaan arvion mukaan jo suodinkorjauksella,
  jolloin GPU-aika on noin 8 ms.
- **Kasvu 41 → 67 ms ei johdu laatoista, piirtokutsuista, muistista eikä välimuistista**, sillä ne pysyvät kiinteässä
  näkymässä vakioina. Kyllästetty GPU toimii Medium-suoritustasolla (kyllästymättömänä Maximum), ja vsync pyöristää
  kehysajan 8,33 ms:n portaisiin. Pieni osa kasvusta tulee näkymän vaihdosta.

## Laite, käännös ja näkymä

- **Laite:** iPad Pro 12,9" 5. sukupolvi (M1, iPad13,8, UDID 00008103-001819421413401E), iPadOS 26.4.1, kaapelissa ja
  latautuu. Ruutu 2732 × 2048 @ 120 Hz. URP:n renderScale 0,8 (Assets/Settings/Mobile_RPAsset.asset), joten pallo
  piirretään 2186 × 1638:aan (3,58 Mpx) ja UI ja loppuskaalaus natiiviresoluutiolla (5,6 Mpx).
- **Käännökset:** Unity 6000.3.24f1, il2cpp, URP 17.3.0, Cesium for Unity 1.25.1. Proto-gitin testihaara
  `testi/kehys-hinta` (ei mergetä):
  - ajot 1–2: c74f2363 ja 78e8836a = juna/b13 cb00ed9a + TestiKehysHinta
  - ajot 3–5: **ce89e17d = juna/b13 ac0aaadc (build 16 + Esilataaja 4) + TestiKehysHinta** (d068b936)
  - Ajot 1–4 ovat Development-käännöksiä (laite.sh, MATKAKIRJA_KEHITYS=1) ja ajo 5 Release-käännös (laite-release.sh).
    Testihaaran ainoat muutokset ovat Assets/Matkakirja/Kartta/TestiKehysHinta.cs (+ .meta) ja ProjectSettings-asetus
    `enableFrameTimingStats: 1`.
- **Näkymä:** `hiljaa`, `ui aloita ateena`, traileri, lehti ja puhe ohi, `ui sulje` ×2 (lampojakso.sh:n kaava), ja sen
  jälkeen Kreikan karttanäkymä levossa (kuva ajo1/documents/kehys-nakyma-alku.png). Kuvassa ovat väritaso GRC,
  maakunnat, rannikko- ja rajaviivat, kaupunkimerkit, alue- ja merinimet sekä pulu. Laattoja on 134 aktiivista
  (91 783 kolmiota) ja 848–897 ladattua, ja lataus on 100 %. Piirtokutsuja on noin 195, batcheja 187 ja kolmioita noin
  283 000 (Rajaviiva 117 000).
- **Täysi piirto:** TestiKehysHinta lisää ehdon `Ruudunpaivitys.Aktiivinen`, kun Documents/ruutu-taysi.txt on olemassa
  tai komennolla `taysi paalle` (build 16:ssa lepo piirtäisi muuten vain joka 60. kehyksen).

## Menetelmä

1. **FrameTimingManager** joka kehys: kehysväli, pääsäie (cpuMainThreadFrameTime ja sen present-odotus), piirtosäie ja
   gpuFrameTime. Tulokset p50/p95 180–300 kehyksen jaksoista (`mittaa`). Lisäksi piirto- ja muistilaskurit
   ProfilerRecorderilla.
2. **ProfilerRecorder**, kaikki 2 963 aikamerkkiä: pääsäie erikseen ja kaikki säikeet, 300 kehystä (`profiili`).
   Per-skriptimerkkejä (esim. `KaupunkiMerkit.LateUpdate`) ei ole saatavilla laitteen playerissa, joten skriptien
   erittely tehtiin **Instrumentsin Time Profilerilla** (xctrace, atos-symbolit UnityFrameworkista).
3. **Metal System Trace** (xctrace, 4–5 s): GPU-aika enkoodereittain ja kanavittain, GPU:n suoritustaso ja
   rekisterivuodot. Unityn Development-käännös nimeää passit (esim. `[R] RenderLoop.DrawSRPBatcher`).
   `SystemInfo.supportsGpuRecorder` on Metalilla false, joten Unityn omat GPU-näytteistäjät eivät toimi.
4. **A/B-kytkimet** samasta näkymästä, toteutettu testitiedoston komentoina (Documents/kehys-komento.txt). Tuotantokoodia
   ei muutettu. Kun GPU on kyllästynyt, FTM:n gpuFrameTime sisältää jonossa odotuksen, eikä se ole todellinen hinta.
   Siksi A/B-vertailut ajettiin **30 fps:n katolla** (`lampo kuuma` + `skaala 0.8`), jolloin GPU ei kyllästy ja
   gpuFrameTime on todellinen GPU-aika. Kyllästyneen tilan GPU-ajat luettiin Metal System Tracesta.

## CPU/GPU-jakauma

| Tila (renderScale 0,8, ellei toisin mainita) | Kehysväli p50 | GPU | Pääsäie (työ) | Piirtosäie | Sidonnaisuus |
|---|---|---|---|---|---|
| Build 16 -juna sellaisenaan (cb00ed9a ja ac0aaadc), täysi piirto (Dev, thermal 0) | **66,7 ms** (p95 66,8) | FTM 92–97 ms (jonoineen); Metal: 97–98 % varattu ≈ 65 ms | 7,1–7,9 ms (odotus 58–59 ms) | 51–54 ms, josta 50,5 ms "Wait for swapchain drawable" | **GPU** |
| Sama, Release (thermal 2, katto 30 fps, 0,7) | 65,7 ms | FTM 91 ms | 5,7 ms | 53,9 ms | GPU |
| Suotimet pois, täysi piirto (Dev) | **16,9 ms** (p95 33,1) | Metal: noin 19,3 ms/kehys, 98 % varattu, Medium | 4,2–4,7 ms | 8,4 ms | GPU (51–60 fps) |
| Suotimet pois, katto 30 fps (Dev) | 33,35 ms | **18,6 ms** (Metal 19,1 ms, 56 % varattu, Maximum) | 7,0–7,4 ms* | 2,3–2,6 ms | ei sidottu |
| Suotimet pois, katto 30 fps (**Release**) | 33,35 ms | **18,6 ms** | 5,8 ms | 2,5 ms | ei sidottu |
| Suotimet ja alpha-testi pois, katto 30 fps (Dev / Release) | 33,35 ms | **14,1 / 14,1 ms** | 7,7 / 6,1 ms | 2,5 ms | ei sidottu |
| Build 16:n lepo (PAIKALLAAN, Dev) | 33,4 ms (p95 52,7) | piirto noin 0,5 kertaa sekunnissa, piirretty kehys ≈ 75 ms | **5,0–5,3 ms / silmukkakehys** | – | CPU-silmukka 30 Hz |
| Lepo, Release, suotimet pois (thermal 2) | 33,35 ms | – | 5,2 ms | – | – |

\* 30 fps:n katolla pääsäikeen ms-luku on suurempi kuin 60 fps:llä, koska CPU:n kellotaajuus laskee kevyellä kuormalla
(sama työ, eri kello). Release-käännöksen pääsäie on noin 20 % kevyempi kuin Developmentin, GPU-aika sama.

## Viisi kalleinta kohtaa (iPad, staattinen kehys, ennen muutoksia)

| # | Kohde | ms / kehys | Mittaustapa | Lähde |
|---|---|---|---|---|
| 1 | **Aloitusportin piilotetun kerroksen UI Toolkit -suotimet** (Etusivulento: viivaEl blur 12 px + opacity, koneEl blur 12 px; neljä koko ruudun sumennuspassia 10,7–12,3 ms + sisältö- ja opacity-passit) | **46–50 ms GPU** (≈ 70 % GPU-ajasta) | Metal System Trace: enkooderit "Render Command 3/5/11/13" (ajot 1 ja 4, kolme jäljitystä). A/B `suotimet pois` ja `etusivu pois`: kehys 66,7 → 16,9 ms | Assets/Matkakirja/Kartta/Etusivulento.cs: `AsetaSuodin` asettaa suotimet, ja `LateUpdate` piilottaa portin jälkeen vain `kerros.style.display = None`. UI Toolkit 6.3 piirtää display:none-vanhemman alla olevien elementtien suodinpassit silti |
| 2 | **Pallon laattojen varjostus** (MatkakirjaTileset, 134 laattaa, 3,58 Mpx) | **14,3 ms GPU** | A/B `pallo pois` 18,6 → 4,3 ms. Metal: kamerapassi (DrawSRPBatcher) 17,8 ms | Shaders/Cesium/MatkakirjaTileset.shadergraph (+ Lahde~/tee_tileset.py), Materiaalit/Pallo.mat (Rakennus.TilesetMateriaali) |
| 2a | josta **alpha-testi** (`_ALPHATEST_ON`, AlphaTest-jono; Cesiumin oletusmateriaalin leikkaus) | **4,5 ms** | A/B `laattaclip pois` 18,6 → 14,1 ms (Dev ja Release). Kuvaero enintään 4/255, 0 pikseliä yli 8/255 | Cesiumin CesiumDefaultTilesetMaterial-kopio Pallo.mat:ssa |
| 2b | josta **Matkakirjan lisäykset** (varakartta, meren värjäys, radiohämärä ja yövalot, valokeila; 432 tavun rekisterivuoto joka kehys) | **2,5–2,7 ms** | A/B `laattavarjostin cesium`: 18,6 → 15,9 ms ja alpha-testi pois: 14,1 → 11,7 ms. Metal: graphics-compiler-spill-events 432 t DrawSRPBatcher-enkooderissa | tee_tileset.py: MatkakirjaSekoitus, RadioHamara (`float2 ytc[4]` dynaamisella indeksillä), Korkeusliioittelu |
| 2c | josta **Lit-valaistus** (Cesiumin URP Lit -pohja) | noin 7–9 ms | A/B `laattavarjostin unlit` 6,8 ms (kaikki yhteensä) | Cesiumin tileset-kaavio (PBR) |
| 3 | **Pääsäie (CPU)** | **7,0 ms** Dev / 5,8 ms Release (30 fps); 4,3 ms (60 fps) | FTM + ProfilerRecorder + Time Profiler | URP-piirron CPU 2,3, **Cesium3DTileset.Update 1,46**, UI Toolkit noin 1,2, **KaupunkiMerkit.LateUpdate 0,87**, Dev-profiloinnin laskurit 0,56 (vain Dev), NostoKerros 0,19, PeliOhjain 0,12, Nimikerros 0,12, Vektorikerros 0,11, UiKerros 0,10 ms |
| 4 | **Kamerapassin perushinta ilman laattoja ja loppuskaalaus natiiviresoluutioon** | **4,3 ms GPU** | A/B `pallo pois` 4,3 ms, `kamera pois` 2,1 ms. Metal: BlitFinalToBackBuffer 1,2–1,7 ms | HDR-välipuskuri (R11G11B10) + renderScale 0,8 → loppuskaalaus 2732 × 2048:aan; Rajaviiva 0,3, TMP-nimet 0,1, UI-paneelit 0,2, napakalotit, Pohjapallo ja MaaTaytto ≈ 0 |
| 5 | **Piirtosäie (CPU)** | **2,5 ms** | FTM (kyllästymättä) | URP/Metal-enkoodaus; Rajaviivan 117 000 kolmiota 0,4 ms (A/B) |

Kyllästetyssä tilassa (build 16 sellaisenaan) yksi kehys on GPU:lla noin 46–50 ms (suotimet) + 18–21 ms (kamerapassi,
Medium) + 1,7 ms (loppublit) + 0,2 ms (UI) ≈ 65 ms, mikä vastaa 66,7 ms:n (8 × 8,33 ms) kehysväliä.

## Kaikki A/B-tulokset

Pohja on suotimet pois, katto 30 fps, renderScale 0,8 ja GPU 18,6 ms (FTM p50, toistettu 12 kertaa: 18,5–18,7 ms).
Thermal 0 ja 2 antoivat saman pohjan.

| Kytkin | GPU (ms) | Muutos | Huom. |
|---|---|---|---|
| pallo pois (laattojen piirtäjät) | 4,3 | −14,3 | laattojen kokonaishinta |
| kamera pois | 2,1 | −16,5 | jäljelle jää UI ja loppukehys |
| laattojen alpha-testi pois | 14,1–14,2 | **−4,5** | kuva identtinen (kehys-clip-paalle/-pois.png) |
| Cesiumin oletusvarjostin | 15,9 | −2,7 | kuva eroaa (11 % pikseleistä): korkeusliioittelu ja rinnevalon tasaus puuttuvat |
| Cesiumin unlit-varjostin | 6,8 | −11,8 | alaraja, ulkoasu muuttuu |
| alpha-testi pois + Cesiumin oletus | 11,7 | −6,9 | |
| alpha-testi pois + renderScale 0,7 | 11,6 | −7,0 | Release 0,7 + alpha-testi pois: 11,5 |
| alpha-testi pois + SSE 24 | 13,7 | −4,9 | |
| renderScale 0,7 / 0,5 / 1,0 | 15,2 / 10,3 / 26,7 | −3,4 / −8,3 / +8,1 | noin 3,9 ms per Mpx + 4,7 ms kiinteä |
| SSE 24 / SSE 32 | 17,7 / 16,5 | −0,9 / −2,1 | laattoja 134 → 94 → 59, piirtokutsuja 191 → 152 → 116 |
| laattojen cull 2 (vain etupuoli) | 18,6 | 0 | ei takapintaylipiirtoa |
| UI pois (kaikki paneelit ja kankaat) | 18,4 | −0,2 | |
| HDR pois | 18,6 | 0,0 | ei hyötyä |
| Rajaviiva pois (rannikko, rajat, maaraja, aallot) | 18,3 | −0,3 | piirtosäie −0,4 ms |
| TMP-nimet pois / kaupungit, nimiöt ja aluenimet pois | 18,5 / 18,4 | −0,1 / −0,2 | |
| napakalotit / Pohjapallo / MaaTaytto pois | 18,6 / 18,6 / 18,5 | 0 / 0 / −0,1 | |
| väritaso (kerma) pois / pohjarasteri pois | 18,6 / 18,5 | 0 / −0,1 | rasterien näytteistys ei ole pullonkaula |
| maasto pois (ellipsoidi) | 18,9 | +0,3 | ellipsoidilaatoissa enemmän kolmioita (142 000) |
| Cesium seis (suspendUpdate) | 18,6 | 0 | pääsäie −0,8 ms |
| jälkikäsittely päälle (vain lennolla) | 19,8 | +1,2 | levossa pois; mitattu Kuuma-tilassa, joka sammuttaa bloomin. Bloom lisäsi kyllästetyssä ajossa 1 noin 2,6 ms (FTM, jonoineen) |
| varjot pois / SRP Batcher pois / MSAA | – | 0 | päävalolla ei varjoja (LightShadows.None), MSAA jo 1× |
| näkymä kamera-ajojen jälkeen / radiolinssi auki / linssin jälkeen | 19,2 / 20,0 / 19,2 | +0,6 / +1,4 / +0,6 | linssistä ei jää jäännöshintaa |

Kyllästetyssä tilassa (ajo 1, suotimet päällä) renderScale 0,5 laski kehyksen vain 58,3 ms:iin, koska suodinpassit
piirtyvät UI:n natiiviresoluutiolla eivätkä riipu renderScalesta.

## Build 16:n lepo (PAIKALLAAN)

- ac0aaadc:ssä UI rauhoittuu (`ui rauha`: rauhassa True). Ruudunpaivitys menee PAIKALLAAN-tilaan: 30 Hz silmukka, piirto
  2–3 kertaa viidessä sekunnissa (KehysMittarin tilat 150/150 paikallaan). Herätykset tulivat testikomennoista.
- Jokainen piirretty kehys maksaa silti suotimineen noin 65–75 ms GPU-aikaa. Lepokehys näkyy nykäyksenä (p95 52,7 ms), ja
  jokainen liike- tai LEPO-kehys rajoittuu 15 fps:iin GPU kyllästyneenä. Liikkeen ja kosketuksen aikana tämä on lämmön
  lähde.
- Silmukka maksaa CPU:lla 5,0–5,3 ms per kehys myös piirtämättä (Release, thermal 2: 5,2 ms). 30 Hz:llä se tekee noin
  150 ms CPU-aikaa sekunnissa (15 % yhdestä P-ytimestä). Suurimmat erät ovat Cesium3DTileset.Update 1,46 ms, UI Toolkitin
  päivitys noin 0,7 ms ja KaupunkiMerkit.LateUpdate 0,87 ms.

## Mistä kasvu 41 → 67 ms johtuu

- **Sisältö ei kasva.** Kiinteässä näkymässä 7 minuutin aikana (ajo 1, seuranta 20 s välein) aktiivisia laattoja oli 134,
  ladattuja 848, piirtokutsuja 198 ja kolmioita 228 000. Muisti pysyi samana (mono 113–117 Mt, gfx 929–934 Mt,
  tekstuurit 483 Mt), ja kehysväli oli koko ajan 66,7 ms. Laattojen, piirtokutsujen, muistin tai välimuistin kasvusta
  kehysaikaan ei synny yhteyttä.
- **Kyllästetty GPU toimii Medium-tasolla.** Kaikissa kyllästetyissä jäljityksissä (ajo 1 20.01, ajo 4 yhden ja kuuden
  minuutin kohdalla, korjattu täysi piirto 23.05) GPU:n suoritustaso oli 100 % Medium, vaikka thermalState oli 0.
  Kyllästymättömänä (30 fps:n katto) taso oli Maximum 98 %:sti. Ajossa 4 kehysväli nousi 58,4 → 66,7 ms alle puolessa minuutissa
  samassa näkymässä. Sama työ vei siis enemmän aikaa, ja nousu tapahtui kerran eikä jatkunut (yksi ja kuusi minuuttia
  antoivat saman tuloksen).
- **Vsync pyöristää kasvun portaiksi.** Kehys on aina 8,33 ms:n monikerta, joten muutaman ms:n hidastuminen näkyy
  kokonaisena portaana (41,7 → 50 → 58,3 → 66,7).
- **Näkymällä on pieni vaikutus.** Samat kamera-ajot kuin build 15:n jaksossa (lampojakso.sh) vaihtoivat näkymän
  tarkempaan (ajo 3: laattoja 66, kolmioita 131 000), mikä lisäsi 0,6 ms. Radiolinssi lisää auki 1,4 ms, mutta ei jätä jäännöstä. Aloituksen 41,7 ms mitattiin
  lennolla, jolloin pallo peittää vain osan ruudusta ja laattojen varjostus on halvempi. Tätä ei mitattu erikseen, se on
  päätelmä.
- **Johtopäätös:** kasvu johtuu siitä, että GPU on koko ajan täysin kuormitettu. Suodinkorjaus poistaa kyllästymisen
  levossa, ja alpha-testin korjaus poistaa sen myös täydellä taajuudella.

## Arvio iPhonesta (iPhone 17 Pro, A19 Pro; ei kytkettynä, laskennallinen)

- Ruutu 2622 × 1206 = 3,16 Mpx (56,5 % iPadista), Pistekerroin 3. Pallo piirretään 0,8:lla (2,02 Mpx), UI ja suotimet
  natiivina. A19 Pron GPU:n oletetaan olevan 1,1–1,5 × M1 (arvio 1,3 ×). Suotimen sumennussäde on iPhonella 18 px
  (iPadilla 12 px), joten näytteitä on pikseliä kohden noin 1,5-kertaisesti.
- **Nyt:** suotimet 46–50 ms × 0,565 × 1,5 / 1,3 ≈ **26–36 ms**, pallo 14,3 × 0,565 / 1,3 ≈ 6 ms ja muu noin 2 ms,
  yhteensä **≈ 35–45 ms** GPU-aikaa. Kehys jää siis 41,7 ms:iin (24 fps) ja voi lämmetessä kasvaa, koska iPhonen
  lämpövara on pienempi kuin iPadin.
- **Suodinkorjauksen jälkeen ≈ 8 ms** (tavoite ≤ 20 ms täyttyy). Alpha-testin korjauksen jälkeen noin 6 ms.
- **CPU:** pääsäie 5,8 ms (iPad, Release) / 1,5–1,7 (yhden ytimen ero) ≈ **3,5–4 ms**, ei pullonkaula. Lepo on
  vastaavasti noin 3 ms per 30 Hz:n silmukkakehys.

## Korjausehdotukset (ei tehty tässä erässä)

| # | Muutos | Tiedosto | Arvioitu säästö iPad (iPhone) | Kuvapari | Huom. |
|---|---|---|---|---|---|
| **1** | **Etusivulennon suotimet pois, kun kerros ei näy** (peitto = 0): `viivaEl/koneEl.style.filter = null` ja `asetettuSumennus = -1`, jotta portin avautuessa `AsetaSuodin` palauttaa ne. Vaihtoehtoisesti UIDocumentin tuhoaminen portin sulkeuduttua ja `Luo` seuraavassa portissa | Kartta/Etusivulento.cs | **46–50 ms GPU/kehys** (26–36 ms): staattinen kehys 66,7 → 16,9 ms, lepopiirron nykäys pois | kartta ennen/jälkeen (identtinen, kerros on display:none) + portti auki (sumennus ennallaan) | Pelkkä GameObjectin SetActive(false/true) ei kelpaa: UIDocument luo juuren uudelleen, ja Etusivulennon elementtiviitteet irtoavat (kone ja viiva katoaisivat portista). Tieto Natiivi-UI:lle: UI Toolkit 6.3 piirtää display:none-alipuun suotimet |
| **2** | **Laattamateriaalin alpha-testi pois**: `_AlphaClip 0`, `_ALPHATEST_ON` pois ja renderQueue 2000 Pallo.mat:iin (Rakennus.TilesetMateriaali) | Editor/Rakennus.cs → Materiaalit/Pallo.mat | **4,5 ms** (noin 2 ms) | kyllä (koepari jo olemassa: kuvaero ≤ 4/255) | Cesiumin leikkauspolygoneja (CesiumPolygonRasterOverlay) ei käytetä. Apple-GPU:n piilopintojen poisto ei toimi discard-varjostimella |
| **3** | **Tileset-varjostimen karsinta**: Matkakirjan lisäykset avainsanojen taakse (satelliittilento, radio, valokeila), jolloin kartan oletusvariantissa niitä ei ole. RadioHamaran `ytc[4]`-taulukon dynaaminen indeksointi pois (432 tavun rekisterivuoto) | Shaders/Cesium/Lahde~/tee_tileset.py → MatkakirjaTileset.shadergraph (+ avainsanojen kytkentä KarttaKerrokset/RadioMastot/Valokeila) | **2,5–2,7 ms** (noin 1,2 ms) | kyllä (kartta identtinen, lento, radio ja keila ennallaan) | Yläraja mitattu Cesiumin oletusvarjostimella; korkeusliioittelu ja tasaus säilyvät |
| 4 | Kevyempi valaistus laatoille (Lambert N·L + ambientti Karttavalon kaavoilla URP Litin PBR:n sijaan) | sama | 4–7 ms (2–3 ms) | kyllä (ulkoasu, rinnevalo) | Unlit-alaraja 6,8 ms koko kehykselle |
| 5 | renderScale 0,8 → 0,7 isolla iPadilla (tai dynaaminen: 0,7 liikkeessä) | Mobile_RPAsset / Ruudunpaivitys | 2,5–3,4 ms (1,5 ms) | kyllä (terävyys, viivat) | |
| 6 | SSE 16 → 24 | Rakennus (tileset) | 0,5–0,9 ms GPU, 0,2 ms CPU | kyllä (maaston yksityiskohdat) | |
| 7 | **CPU levossa**: Cesiumin `suspendUpdate`, kun PallonLepo kertoo levosta; KaupunkiMerkit.LateUpdate ohittaa työn, kun kamera ja tila eivät muutu; PAIKALLAAN-silmukka 10–15 fps:iin (kosketus herättää) | PallonLepo/Ruudunpaivitys, KaupunkiMerkit.cs | levon CPU 5,0–5,3 → noin 3 ms/kehys (Cesium 1,5 ja KaupunkiMerkit 0,9 ms pois), ja silmukan puolitus puolittaa vielä | ei (käytös); kosketusviive tarkistettava | |
| – | Ei hyötyä: HDR pois (0,0 ms), varjot (valossa ei varjoja), MSAA (jo 1×), SRP Batcher, UI-paneelit (0,2), vektoriviivat (0,3), nimet (0,1), napakalotit ja Pohjapallo (0) | | | | |

**Yhdistelmät (mitattu, katto 30 fps):** 1+2: 14,1 ms. 1+2+Cesiumin oletus (≈ 3): 11,7 ms. 1+2+renderScale 0,7: 11,6 ms
(Release 11,5). 1+2+3+5 arviolta noin 9–10 ms.

## Kolme parasta

1. **Etusivulennon piilotetut suotimet pois**: −46–50 ms/kehys iPadilla. Tämä on yksin 70 % GPU-ajasta, eikä kuva muutu.
2. **Laattojen alpha-testi pois**: −4,5 ms, kuva identtinen. Yhdessä kohdan 1 kanssa staattinen kehys on 14,1 ms, eli
   iPadin tavoite ≤ 16 ms täyttyy.
3. **Tileset-varjostimen karsinta** (avainsanat ja rekisterivuoto): −2,5 ms ilman kuvamuutosta. Vaihtoehto on renderScale
   0,7 (−2,5…3,4 ms), mutta se muuttaa terävyyttä.

## Huomiot ja rajaukset

- **Development vs. Release:** GPU-ajat ovat samat (18,6 / 18,6 ja 14,1 / 14,1 ms), ja Releasen pääsäie on noin 20 %
  kevyempi.
- **Lämpö:** ajot 1, 3 ja 4 mitattiin thermalState 0:ssa. Ajo 2 oli klo 20.25 alkaen tilassa 2, ja ajo 5 (Release) alkoi
  tilassa 2, koska laite oli kuuma edellisistä ajoista. Katon alla pohja oli sama tiloissa 0 ja 2 (18,6 ms).
- Ajo 1:n "pallo-pois"-rivi on virheellinen, koska ensimmäinen versio ei löytänyt piilotettuja laattaobjekteja. Tämä
  korjattiin, ja oikea arvo on 4,3 ms.
- `etusivu paalle` pois-kytkennän jälkeen ei palauta suotimia (UIDocument luo juuren uudelleen). Rivit "etusivu-takaisin"
  ja "s-suodin-katto" ovat siksi korjattua tilaa.
- Levon mittauksissa on testikomentojen aiheuttamia herätyksiä. KehysMittarin 5 sekunnin jaksot ilman komentoja
  näyttävät puhdasta PAIKALLAAN-tilaa.
- iPadille jäi testikäännös ce89e17d (Release) ja Documents/ruutu-taysi.txt (vain TestiKehysHinta lukee sen). Asenna oma
  käännös laite.sh:lla.

## Raakadata

Kaikki raakadata on kansiossa `/Users/Shared/Claude/proto-3d/lokit/kehys-hinta/`:

- `ajo1/` (19.56–20.15, c74f2363, Dev), `ajo2/` (20.21–20.41, 78e8836a), `ajo3/` (22.41–22.55, ce89e17d),
  `ajo4/` (22.56–23.10, ce89e17d; kasvujakso, yhdistelmät, Time Profiler) ja `ajo5/` (23.14–23.18, ce89e17d Release).
  Jokaisessa kansiossa on `konsoli.txt`, `vaiheet.txt` ja `documents/`, jossa ovat kehys-hinta.txt (`mittaa`-rivit
  jsonl-muodossa; ajo5:n kopio sisältää kaikkien ajojen rivit), kehys-seuranta.txt, kehys-profiili-*.txt,
  kehys-tila-*.txt, kehysajat.jsonl ja kuvat.
- Metal System Tracet: `ajo1/metal-perus.trace`, `ajo2/metal-korjattu.trace`, `ajo3/metal-korjattu.trace`,
  `ajo3/metal-suodin.trace`, `ajo4/metal-alkup-1.trace`, `ajo4/metal-alkup-2.trace` ja `ajo4/metal-korjattu-taysi.trace`.
  Niiden viennit ovat tiedostoissa `mst-*.xml`. Time Profiler on tiedostossa `ajo4/aikaprofiili-korjattu.trace`, ja sen
  pääsäikeen erittely tiedostossa `ajo4/aikaprofiili-paasaie.txt`.
- Yhteenvedot: `mittaukset-kaikki.txt` (kaikki mittaukset taulukkona), `gpu-enkooderit-yhteenveto.txt` ja
  `ajo4/kehys20-enkooderit.txt` (yhden kehyksen enkooderit järjestyksessä).
- Työkalut: `kh.sh` (käynnistys, aloitus, lähetys, odotus), `analysoi.py`, `xctrace_taulu.py`, `gpu_kooderit.py`,
  `kehys_kooderit.py` ja `aikaprofiili.py`. Komentoerät ovat tiedostoissa `erä*.txt`, `r3-*.txt`, `r4-*.txt` ja
  `r5-*.txt`, ja käännöslokit tiedostoissa `laite-dev*.log` ja `laite-release.log`.
- Testikoodi on proto-gitin haarassa `testi/kehys-hinta` (ei mergetä): Assets/Matkakirja/Kartta/TestiKehysHinta.cs.
  Sen komennot ovat `taysi`, `mittaa`, `profiili`, `gpu`, `tila`, `seuranta`, `skaala`, `hdr`, `msaa`, `jalki`,
  `bloom`, `varjot`, `srp`, `ui`, `kamera`, `pallo`, `varjostin`, `sse`, `cesium`, `kerros`, `etusivu`, `dokumentti`,
  `suotimet`, `laattavarjostin`, `laattacull`, `laattaclip`, `valinta` ja `palauta`.

## Toteutus build 17: natiiviseppa/kehys-hinta-1 (26.9.2026)

Korjaukset 1 ja 2 sekä Fablen lisäykset A (joutosyke jatkuvaksi) ja B (piilovartija). Haara `natiiviseppa/kehys-hinta-1`
(proto-git), pohja juna/b13 761cc096, **kärki 3c636115**:

- **04a3ff1c**
  - Korjaus 1: Kartta/Etusivulento.cs:n `PoistaSuotimet` poistaa suotimet, kun kerros ei näy (peitto 0).
    `asetettuSumennus = −1`, joten `AsetaSuodin` palauttaa ne samassa kehyksessä, jossa portti avautuu. Dokumenttia ja
    elementtejä ei tuhota, joten kone ja viiva eivät voi kadota. Tämä on raportin vaihtoehdoista turvallisin.
  - Korjaus 2: Editor/Rakennus.cs:n TilesetMateriaali ja Materiaalit/Pallo.mat saavat arvot `_AlphaClip 0`,
    `_AlphaToMask 0`, `_BUILTIN_AlphaClip 0`, avainsanat `_ALPHATEST_ON`, `_BUILTIN_ALPHATEST_ON` ja
    `_BUILTIN_AlphaClip` pois, renderQueue 2000 ja RenderType Opaque. Pallo.mat on muokattu käsin, joten GUID säilyy ja
    kohtauksen viite pysyy ennallaan. LuoPallo tuottaa saman.
  - A: Kartta/Lampopaatos.cs:n `SykeJaatyy = false`, ja kommentiksi Fablen teksti "Fablen 20.1x:n jäädytys oli
    väliaikainen; purettu, kun kehys ≤ 16 ms (kehyksen hinta -erä)". Myös Joutosyke.cs:n ja Komennot.cs:n
    dokumentaatio on päivitetty.
  - B: uusi Kartta/PiiloVartija.cs ja Komennot.cs:n komento `piilo tila|pois|paalle`.
- **bff5c031** PiiloVartija: taustakierros budjetilla, enintään 250 elementtiä kehyksessä.
- **3c636115** PiiloVartija: laskettu suodin tarkistetaan ensin (ei inline-tyyliolioita piilotetuille elementeille),
  kierrosväli 2 s, ja `piilo tila` kertoo huipun 20 s:n jälkeen.
- **Tarkistukset:** `tyokalut/tarkista.sh` (Unity-tarkistus) 0 virhettä. Kartta-testit 254/254, Peli-testit 278/278 ja
  Linssit-testit 255/255 läpi.
- **Mittaushaarat** (eivät mene junaan):
  - `testi/kehys-hinta` ad335603 = juna 761cc096 + TestiKehysHinta (ennen)
  - `testi/kehys-hinta-1` f10969c7 → 1b146e8d = kehys-hinta-1 + TestiKehysHinta (jälkeen)

### Laitemittaus ennen/jälkeen (iPad Pro 13, Release, thermal 0, sama menetelmä)

| Mittaus | Ennen (ad335603) | Jälkeen (f10969c7) |
|---|---|---|
| Täysi piirto, kehysväli p50 / p95 | 50,1 / 58,4 ms (≈ 20 fps) | **12,9 / 25,0 ms** (≈ 78 fps) |
| Metal System Trace, GPU kehyksessä (Medium) | suodinpassit 34,4 + pallo 20,4 + loppublit 1,5 ms | pallo 15,1 + loppublit 1,5 ms, suodinpassit 0 |
| 30 fps:n katto (`lampo kuuma` + `skaala 0.8`), GPU | katto ei täyty: kehys 51,4 ms, GPU kyllästynyt | **14,1 ms** (≤ 16 ms ✔), kehys 33,35 ms |
| Build 17:n lepo (`taysi pois`), kiinteä näkymä | PAIKALLAAN, pääsäie 2,8 ms/silmukkakehys | PAIKALLAAN, pääsäie 3,0 ms |
| Lepo, aloitusvalinnan renkaat näkyvissä (syke) | jäätyy 3 s:n jälkeen, sitten PAIKALLAAN | LEPO 30 fps: **GPU 14,1 ms/kehys (≈ 42 %)**, pääsäie 6,2 ms |

Ennen-rivin 50,1 ms on Release-käännös kylmällä laitteella. Raportin 66,7 ms mitattiin Development-käännöksellä
lämpimällä laitteella. Molemmat ovat GPU-sidonnaisia.

Jäljitykset: `kehys-hinta-1/mittaus-ennen/metal-taysi.trace` ja `mittaus-jalkeen/metal-taysi.trace`.
Rekisterivuoto (432 t) on yhä jäljellä (korjausehdotus 3, ei tässä erässä).

### A: joutosyke jatkuvaksi, ennen ja jälkeen

- **iPad (mitattu):** kun sykkivä elementti näkyy (aloitusvalinnan renkaat, siirtokohteiden halo tai avoin aarrepiste),
  pallo ei lepää (`pallo lepo`: "ei lepää (animaatio: kaupungit: huomiorenkaat)"). Ruudunpaivitys on silloin LEPO-tilassa
  30 fps:llä, GPU tekee 14,1 ms kehyksessä (≈ 42 % ajasta) ja pääsäie 6,2 ms.
  - Ennen korjauksia jatkuva syke olisi pitänyt GPU:n 100 %:ssa: kehys 51,4 ms eli noin 20 fps.
  - Kiinteässä Ateenan näkymässä ilman sykkiviä elementtejä pallo lepää yhä PAIKALLAAN-tilassa.
- **iPhone 17 Pro (ARVIO, ei mitattu):** simulaattorin GPU-aika ei kuvaa laitetta. Arvioin raportin kertoimilla:
  pikselisuhde 0,565 ja A19 Pro ≈ 1,3 × M1.
  - Jälkeen: staattinen kehys **≈ 6 ms GPU-aikaa** (pallo noin 4,3 ms ja muu noin 1,9 ms). Jatkuva syke 30 fps:llä
    vie **≈ 18 %** GPU-ajasta, ja pääsäie noin 3,5–4 ms kehyksessä.
  - Ennen: noin 35–45 ms. Jatkuva syke olisi pitänyt GPU:n 100 %:ssa.

### B: piilovartija (Kartta/PiiloVartija.cs)

- **Haku koodista:** UI Toolkitin suotimia (FilterFunction, `filter` USS:ssä) asettaa vain Etusivulento. UI/- ja
  Linssit/-kansioissa suotimia ei ole. Korjauksen 1 jälkeen piilotettuja suotimia ei siis ole. Vartija on varmistus
  tulevia tapauksia varten.
- **Katsaus laitteella:** `piilo tila` ajettiin kartalla, lehti auki ja kiinni, radiolinssi auki ja kiinni sekä
  portti päällä ja pois.
  - UI-elementtejä on 2 141–2 232 ja paneeleita 15–16.
  - Elementeistä 1 811–2 158 on display:none-alipuissa (suljetut lehti, linssipaneelit, valikot, kartussi jne.).
  - Niissä suotimia on 0, eikä vartija poistanut yhtään suodinta.
- **Piilossa mutta piirrettävät** (visibility hidden tai opacity 0, ei display:none): kaikki ovat pieniä, ja koko UI
  vie GPU:lla 0,2 ms. Niitä ei muutettu. Vaihtoehtoinen siivous Natiivi-UI:lle, jos ne ovat pysyvästi piilossa:
  - UI 10 `Matkakirja UI 10 > UI 10-container > VisualElement > PulunSiluetti`, opacity 0 (1 elementti), aina
  - UI 45 `ScrollView > … > unity-content-container > VisualElement > Label`, visibility hidden (2 × 1 elementti),
    kun lehti on auki
  - UI 20 `Matkakirja UI 20 > UI 20-container > turva > VisualElement`, visibility hidden (5 elementtiä), ja UI 15
    `Matkakirja UI 15 > UI 15-container > turva > VisualElement`, visibility hidden (1 ja 20 elementtiä), kun
    radiolinssi on auki
  - UI 12 `Matkakirja UI 12 > UI 12-container > VisualElement > VisualElement > Label`, opacity 0 (1 elementti),
    linssin jälkeen
- **Vartijan hinta (iPad, Release):**
  - v1 04a3ff1c kulki kaikki paneelit kerralla: kulku 1,9 ms (2 142 elementtiä) ja piikit jopa 7,4 ms. Thermal 2:ssa
    kulku kesti 6,8 ms.
  - v2 bff5c031 (thermal 2): keskimäärin 0,07 ms kehyksessä, huippu 8,6 ms käynnistyksessä (inline-tyyliolio 1 812
    piilotetulle elementille + GC).
  - **v3 3c636115 (lopullinen, thermal 0): keskimäärin 0,022–0,024 ms kehyksessä, huippu 1,40 ms.** Yli 1 ms:n kehyksiä
    oli 16–21 kappaletta 7 300–9 200:sta (0,2 %). Kierros käy 2 141–2 231 elementtiä 9 kehyksessä, yhteensä 3,9–4,4 ms,
    ja kierroksia on noin 2,5 s:n välein. `piilo tila` -katsaus (vain komennosta) kestää 1,1–3,2 ms.
  - Simulaattorissa (v2): keskimäärin 0,038 ms kehyksessä.

### Kuvaparit (simulaattori natiiviseppa-iPhone FBBD41D7)

Kuvaparit ovat kansiossa `/Users/Shared/Claude/proto-3d/lokit/kehys-hinta-1/kuvaparit/pari-*.png`. Vasemmalla on ennen,
oikealla jälkeen. Kuvat ovat iPhonen ruutu (1206 × 2622) 1600 px:n korkuiseksi skaalattuna, vierekkäin ilman
marginaaleja.

- **Ennen** = käännöspalvelun af0f883e (master + juna/b13 761cc096). Toinen ajo (`ennen-2`) tehtiin lämpimällä
  välimuistilla samaan tapaan kuin jälkeen-ajo.
- **Jälkeen** = bff5c031. Se käännettiin Unity-työkopiossa, koska käännöspalvelun jono ei vapautunut tunnissa ("VIKA
  jono: lukko ei vapautunut tunnissa (juna/b13 23:39)"). 3c636115 muuttaa vain vartijan sisäistä kulkua.

| Kuva | Ero > 8/255, ennen-2 vs jälkeen | Toistovaihtelu ennen vs ennen-2 |
|---|---|---|
| 1 portti auki (etusivun lento pysäytetty t = 20 s): viiva sumennettuna | 0,00 % | 0,00 % |
| 2a portista poistuminen (musta verho ja Ohita) | 3,32 % | 3,32 % |
| 2b portista poistuminen, aloituslento alkaa ("Kone nousee…") | 88,71 % | 97,29 % |
| 3 kartta levossa (Ateena) | 0,00 % | 0,00 % |
| 4 portti uudelleen auki: kone ja viiva sumennettuina ennallaan | 0,51 % | 0,41 % |
| 5 portti taas pois | 0,00 % | 0,00 % |

Kuvien 2a ja 2b erot ovat ajoitusta. Simulaattorin kuvakaappaus viivästyy 1–12 s, joten verhon häivytys ja lennon
kohta vaihtelevat ajosta toiseen. Kahden ennen-ajon välinen ero on yhtä suuri. Molemmissa versioissa portti sulkeutuu,
verho tulee ja aloituslento alkaa samalla tavalla. Kuvat 1, 3, 4 ja 5 ovat identtiset. Kuva 4 todentaa korjauksen 1:
portin avautuessa uudelleen kone ja viiva palaavat sumennettuina, eli suotimet palautuvat.

Laitteelta on lisäksi pysäytyskuva `kehys-hinta-1/mittaus-jalkeen/documents/kehys-renkaat.png` (iPad, renkaat sykkivät).
