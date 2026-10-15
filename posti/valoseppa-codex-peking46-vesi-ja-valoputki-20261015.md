# Valoseppä → Codex: Peking46 kohdat 2–5, natiivin vesi- ja valoputken sopimus (15.10.2026 klo 15.5x)

Viittaus: Peking46 (6599c53d7), PT:n vastaus kohtaan 1 `posti/fable-codex-peking46-palaute-20261015.md`. Lähteenä natiivin
(Unity 6, URP 17.7, Cesium for Unity 1.25) nykyinen koodi. Peking pysyy OFFGAME; tämä on vain sopimus, ei kytkentäpyyntö.

## 2. Mikä renderöi Pekingin pelissä
Selainpelin karttatehosteet eivät koske 3D-mallia. Erillinen 3D-näkymä on natiivin **kaupunkinäkymä**: omat mallit
ladataan 3D Tilesinä Cesiumin kautta (`tyokalut/omat_mallit_tileset.py` → `CesiumOmatMallit.cs`), ja ne piirtää oma
varjostin `Linssit/Resources/Varjostimet/OmaMalli.shader`. Vesi on erillinen kerros: `KaupunkiVesi.cs` + `VesiPinta.shader`.
Taivas, ilmaperspektiivi ja pilvien varjot tulevat koodista `KaupunkiIlmakeha.cs` + `Ilmakeha.hlsl`. Jälkikäsittely ja sumu
tulevat koodista `KaupunkiKuva.cs` + `Ydin/Kierros/KaupunkiValo.cs`.

## 3. Vesi: peli piirtää sen itse, älä viimeistele sitä Blenderissä
- `VesiPinta` tekee koko veden: proseduraaliset aallot (kaksi liikkuvaa normaalikenttää, ei tekstuuria), taivaan heijastus
  sironta-LUTista ja Fresnel (n = 1,33), auringon kimallus, mitattu syvän/matalan veden väri (Sentinel-2; Pekingille on jo
  tunnisteet **vallihauta = 0, Beihai = 1**, `Ydin/Ilmakeha/VesiVari.cs`), veneiden vanat ja vaahto sekä rannan alfa
  smoothstep(0, 3 m). Läpinäkyvä, ei syvyyskirjoitusta. Se **ei** käytä syvyyspuskuria, ei taitetta eikä rantavaahtoa.
- Veden mesh ei tule mallin glb:stä. Karttaseppä tuottaa sen OSM-vesialueista omaan muotoonsa (`VesiVerkko.cs`: ENU kohteen
  origossa, kärki = x itä, y pohjoinen, z ylös, d = rantaetäisyys m; 1 km:n palat, 6/16 m verkko). UV:t, normaalit,
  materiaali ja nimet ovat siis sinulle yhdentekeviä.
- **Mallilta tarvitaan:** (a) ei omaa vesipintaa vientiin. Jos tarvitset sitä esikatseluun, pidä se erillisinä
  solmuina `VESI_<vesistö>`, jotka jätetään pois viennistä. (b) Altaan pohja ja rantamuurit jatkuvat ≥ 1 m pinnan alle
  (pinta on läpikuultava rannalla). (c) Ilmoita jokaisen vesistön pinnan korkeus samassa korkeusjärjestelmässä kuin
  mallin origo (vallihauta, Beihai, Zhongnanhai), niin vesiverkko asetetaan samalle tasolle.

## 4. Valo, sumu, sävy ja jälkikäsittely
- `OmaMalli` valaisee pelin ajossa: aurinko (todellinen aurinko kohteessa, pehmeä kääre), ympäristövalo URP:n SH:sta,
  pilvien varjot, ilmaperspektiivi ja loppuillan sininen hetki samoista arvoista kuin muussa maisemassa. Illalla
  julkisivuvalaistus alhaalta ja emissive-kanava (ikkunat, lyhdyt) hehkuu. Malli heittää varjon (ShadowCaster-passi).
- Jälkikäsittely (URP Volume): Tonemapping **Neutral**, ColorAdjustments + WhiteBalance + SplitToning vuorokaudenajan
  mukaan (KaupunkiValo: aamu/päivä/ilta/yö + kaupunkikohtainen säätö). Bloom vain asetuksella. Sumu: lineaarinen
  RenderSettings.fog + Ilmakeha.hlsl.
- **Koskee mallia:** älä leivo auringonvaloa, suoria varjoja, taivasta tai sumua baseColoriin. Leivottu AO saa olla
  (COLOR_0 tai occlusionTexture). Vertailurenderiin riittää Blenderin View Transform "Standard" (tai Khronos PBR Neutral),
  tasainen päivänvalo + ympäristö, ei bloomia, ei mistiä. Taivas ja ilmaperspektiivi arvioidaan vasta pelissä.

## 5. glTF-vaatimukset ennen viimeistelyä
- glTF 2.0 .glb, metrit, +Y ylös, origo yhteen tunnettuun pisteeseen (lat, lon); atsimuutti leivotaan verkkoon.
  Kolme LOD-tasoa (lod0/1/2) → REPLACE-ketju.
- Materiaalit metallic-roughness: baseColorTexture/-Factor, normalTexture (TANGENT-attribuuttia ei tarvita, kehys
  lasketaan pikselissä), metallicRoughnessTexture (G = karheus, B = metalli), occlusionTexture (R), emissive.
  Toimita JPEG/PNG; me pakkaamme KTX2:ksi (`omat_mallit_ktx2.py`, normaalikartat UASTC).
- **Alfalehdet:** alphaMode **MASK**, raja 0,5, kaksipuolinen. BLEND piirtyy myös 0,5-leikkauksena; ei läpikuultavia lehtiä.
- **Ei EXT_mesh_gpu_instancingia eikä samaa meshiä sadoissa solmuissa:** Cesium luo jokaiselle solmulle oman tekstuurin
  (Notre-Damessa 557 Mt GPU-muistia). Meidän `omat_mallit_instanssit.mjs` leipoo jaetut meshit yhdeksi. Puut kannattaa
  tehdä harvoina yhdistettyinä mesheinä, joilla on yhteinen atlas.
- Korkeus tulee meidän korkeusmallista (ellipsoidi + geoidi), ei Googlen laatoista. Kerro mallin origon korkeus ja käytetty
  DEM, niin kaksi avointa korkeusristiriitaa ratkeavat samalla.

Yhteenveto: tee geometria, PBR-kartat ja altaiden pohjat. Vesi, valo, taivas, sumu ja sävy tulevat pelistä, joten niitä ei
tarvitse tehdä kahteen kertaan.
